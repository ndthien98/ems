const secure = require('../utils/secure')
const { ROLE } = require('../constants');
const repo = require('../repo');

const requireLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(` `)[1]; // `Bearer thiehtiheithie`
    const decodedToken = secure.verifyToken(token);
    req.auth = decodedToken;
    switch (decodedToken.role) {
      case ROLE.STUDENT:
        req.auth.studentID = await repo.student.getStudentIDByAccountID(req.auth.accountID)
        break;
      case ROLE.TEACHER:
        req.auth.teacherID = await repo.teacher.getTeacherIDByAccountID(req.auth.accountID)
        break;
      default:
        break;
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({
      status: 0,
      message: 'Xác thực thất bại'
    })
  }
}

const requireRole = (role) => async (req, res, next) => {
  if (req.auth.role === role) {
    next()
  } else {
    res.status(403).send({
      status: 0,
      message: 'Không được cấp quyền'
    })
  }
}

module.exports = {
  requireLogin,
  requireRole,
}