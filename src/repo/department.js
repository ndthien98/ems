const db = require('../utils/mysqldb')

module.exports = {
  create: async (departmentID, departmentName, address, transaction) => {
    const createSQL = "INSERT INTO tbl_Department(departmentID, departmentName, address) VALUE(?, ?, ?)";
    await db.queryNone(createSQL, [departmentID, departmentName, address], transaction)
  },
  getByID: async (departmentID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Department WHERE departmentID = ? AND is_delete = 0`
    const department = await db.queryOne(getByIDSQL, [departmentID], transaction)
    return department
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Department WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const departments = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return departments
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(departmentID) as count FROM tbl_Department WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (departmentID, departmentName, address, transaction) => {
    const updateSQL = `UPDATE tbl_Department 
    SET 
    departmentName = ?, 
    address = ?
    WHERE departmentID = ?
    `
    await db.queryNone(updateSQL, [departmentName, address, departmentID], transaction)
  },
  deleteByID: async (departmentID, transaction) => {
    const deleteSQL = `UPDATE tbl_Department SET is_delete = 1 WHERE departmentID = ?`
    await db.queryNone(deleteSQL, [departmentID], transaction)
  }
}