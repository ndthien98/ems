const db = require('../utils/mysqldb')

module.exports = {
  create: async (programID, schoolName, duration, degree, transaction) => {
    const createSQL = "INSERT INTO tbl_Program(programID, schoolName, duration, degree) VALUE(?, ?, ?, ?)";
    await db.queryNone(createSQL, [programID, schoolName, duration, degree], transaction)
  },
  getByID: async (programID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Program WHERE programID = ? AND is_delete = 0`
    const program = await db.queryOne(getByIDSQL, [programID], transaction)
    return program
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Program WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const programs = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return programs
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(programID) as count FROM tbl_Program WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (programID, schoolName, duration, degree, transaction) => {
    const updateSQL = `UPDATE tbl_Program 
    SET 
    schoolName = ?, 
    duration = ?,
    degree = ? 
    WHERE programID = ?
    `
    await db.queryNone(updateSQL, [schoolName, duration, degree, programID], transaction)
  },
  deleteByID: async (programID, transaction) => {
    const deleteSQL = `UPDATE tbl_Program SET is_delete = 1 WHERE programID = ?`
    await db.queryNone(deleteSQL, [programID], transaction)
  }
}