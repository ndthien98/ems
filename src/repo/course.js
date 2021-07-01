const db = require('../utils/mysqldb')

module.exports = {
  create: async (courseID, programID, courseName, credit, type, transaction) => {
    const createSQL = "INSERT INTO tbl_Course(courseID, programID, courseName, credit, type ) VALUE(?, ?, ?)";
    await db.queryNone(createSQL, [courseID, programID, courseName, credit, type], transaction)
  },
  getByID: async (courseID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Course WHERE courseID = ? AND is_delete = 0`
    const course = await db.queryOne(getByIDSQL, [courseID], transaction)
    return course
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Course WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const courses = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return courses
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(courseID) as count FROM tbl_Course WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (courseID, programID, courseName, credit, type, transaction) => {
    const updateSQL = `UPDATE tbl_Course 
    SET 
    programID = ?, 
    courseName = ?,
    credit = ?,
    type = ?
    WHERE courseID = ?
    `
    await db.queryNone(updateSQL, [programID, courseName, credit, type, courseID], transaction)
  },
  deleteByID: async (courseID, transaction) => {
    const deleteSQL = `UPDATE tbl_Course SET is_delete = 1 WHERE courseID = ?`
    await db.queryNone(deleteSQL, [courseID], transaction)
  }
}