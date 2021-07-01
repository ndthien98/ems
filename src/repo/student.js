const db = require('../utils/mysqldb')

module.exports = {
  create: async (studentID, accountID, transaction) => {
    const createSQL = "INSERT INTO tbl_Student(studentID, accountID) VALUE(?, ?)";
    await db.queryNone(createSQL, [studentID, accountID], transaction)
  },
  getByID: async (studentID, transaction) => {
    const getByIDSQL = `
    SELECT * 
    FROM tbl_Student, tbl_Account
    WHERE studentID = ? 
    AND tbl_Student.accountID = tbl_Account.accountID
    AND tbl_Student.is_delete = 0`
    const student = await db.queryOne(getByIDSQL, [studentID], transaction)
    return student
  },
  getByAccountID: async (accountID, transaction) => {
    const getByAccountIDSQL = `SELECT * FROM tbl_Student WHERE accountID = ? AND is_delete = 0`
    const teacher = await db.queryOne(getByAccountIDSQL, [accountID], transaction)
    return teacher
  },
  getAll: async (limit, offset, transaction) => {
    const getAllSQL = `
    SELECT * 
    FROM tbl_Student, tbl_Account
    WHERE tbl_Student.is_delete = 0 
    AND tbl_Student.accountID = tbl_Account.accountID
    LIMIT ? OFFSET ?`
    const students = await db.queryMulti(getAllSQL, [limit, offset], transaction)
    return students
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(studentID) as count FROM tbl_Student WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  getStudentIDByAccountID: async (accountID, transaction) => {
    const getStudentIDSQL = `SELECT studentID FROM tbl_Student WHERE accountID = ? AND is_delete = 0`
    const { studentID } = await db.queryOne(getStudentIDSQL, [accountID], transaction)
    return studentID
  },
  updateByID: async (studentID, programID, studentName, studentNumber, gender, schoolEmail, facebookLink, cvLink, country, province, address, transaction) => {
    const updateSQL = `UPDATE tbl_Student 
    SET 
    programID = ?, 
    studentName = ?,
    studentNumber = ?,
    gender = ?,
    schoolEmail = ?,
    facebookLink = ?,
    cvLink = ?,
    country = ?,
    province = ?,
    address = ?
    WHERE
    studentID = ?
    `
    await db.queryNone(updateSQL, [programID, studentName, studentNumber, gender, schoolEmail, facebookLink, cvLink, country, province, address, studentID], transaction)
  },
  deleteByID: async (studentID, transaction) => {
    const deleteSQL = `UPDATE tbl_Student SET is_delete = 1 WHERE programID = ?`
    await db.queryNone(deleteSQL, [studentID], transaction)
  }

}