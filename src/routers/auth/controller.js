const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const secure = require('../../utils/secure')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const { ROLE } = require('../../constants')
const repo = require('../../repo')

const getCurrentAuth = async (req, res, next) => {
  const auth = req.auth;
  const user = await repo.account.getByID(auth.accountID)
  delete user.password
  res.send({
    status: true,
    user
  })
}

const register = (role) => async (req, res, next) => {
  // get params, body, query
  const { username, password, rePassword } = req.body;

  // validate data
  validators.username(username)
  validators.password(password)
  validators.repass(password, rePassword)

  const trans = await db.beginTransaction()
  let newID

  const check = await repo.account.checkExistUsename(username, trans)
  if (check) {
    console.log('check', check)
    next(errors.CREATE_BAD_REQUEST("Tài khoản đã tồn tại"))
    await db.rollbackTransaction(trans)
  } else {
    newID = uuid();
    const hashPassword = await secure.generatePassword(password)
    await repo.account.create(newID, username, hashPassword, role, trans)
    switch (role) {
      case ROLE.STUDENT:
        const newID_student = uuid();
        await repo.student.create(newID_student, newID, trans)
        break;
      case ROLE.TEACHER:
        const newID_teacher = uuid();
        await repo.teacher.create(newID_teacher, newID, trans)
        break;
      case ROLE.ADMIN:
      case ROLE.NORMAL:
      default: break
    }
    res.send({
      status: true,
      accountID: newID
    })
  }
  await db.commitTransaction(trans)
}

const login = async (req, res, next) => {
  const { username, password } = req.body;

  validators.username(username)
  validators.password(password)

  const check = await repo.account.checkExistUsename(username)

  if (!check) {
    throw errors.CREATE_BAD_REQUEST("Đăng nhập thất bại")
  } else {
    const auth = await repo.account.getByUsername(username)

    const validPassword = await secure.verifyPassword(password, auth.password)
    if (!validPassword) throw errors.CREATE_BAD_REQUEST("Đăng nhập thất bại")
    delete auth.password
    const token = secure.generateToken({
      accountID: auth.accountID,
      username: auth.username,
      role: auth.role,
    });
    let student
    let teacher
    switch (auth.role) {
      case ROLE.STUDENT:
        student = await repo.student.getByAccountID(auth.accountID)
        break;
      case ROLE.TEACHER:
        teacher = await repo.teacher.getByAccountID(auth.accountID)
        break;
      default:
        break;
    }

    res.send({
      status: true,
      accountID: auth.accountID,
      username: auth.username,
      phone: auth.phone,
      email: auth.email,
      role: auth.role,
      token,
      student: student || undefined,
      teacher: teacher || undefined
    })
  }

}

const verify = (req, res, next) => {
  res.send({
    ...req.auth,
    status: true,
  })
}

const changePassword = async (req, res, next) => {

  const accountID = req.auth.accountID
  const { oldPassword, newPassword, rePassword } = req.body;

  const result1 = await repo.account.getByID(accountID)
  const check = await secure.verifyPassword(oldPassword, result1.password)
  if (!check) next(errors.CREATE_BAD_REQUEST('Mật khẩu sai'))

  validators.password(newPassword)
  validators.repass(newPassword, rePassword)

  const password = await secure.generatePassword(newPassword)
  await repo.account.changePassword(accountID, password)
  res.send({
    status: 1
  })
}

module.exports = {
  getCurrentAuth,
  register,
  login,
  verify,
  changePassword
}