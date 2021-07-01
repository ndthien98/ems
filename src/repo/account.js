const db = require('../utils/mysqldb')

module.exports = {
  create: async (newID, username, hashPassword, role, transaction) => {
    const createSQL = `INSERT INTO tbl_Account(accountID, username, password, role) VALUE(?,?,?,?)`;
    await db.queryNone(createSQL, [newID, username, hashPassword, role], transaction)
    return true
  },
  getByID: async (accountID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Account WHERE accountID = ? and is_delete = 0`
    const account = await db.queryOne(getByIDSQL, [accountID], transaction)
    return account
  },
  getByUsername: async (username, transaction) => {
    const getByUsernameSQL = `SELECT * FROM tbl_Account WHERE username = ? AND is_delete = 0`
    const account = await db.queryOne(getByUsernameSQL, [username], transaction)
    return account
  },
  checkExistUsename: async (username, transaction) => {
    const getByUsernameSQL = `SELECT username FROM tbl_Account WHERE username = ? AND is_delete = 0`
    const account = await db.queryMulti(getByUsernameSQL, [username], transaction)
    return account.length > 0
  },
  getAll: async (limit, offset, transaction) => {
    const getAllSQL = `SELECT * FROM tbl_Account WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const accounts = await db.queryMulti(getAllSQL, [limit, offset], transaction)
    return accounts
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(accountID) as count FROM tbl_Account WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (email, phone, accountID, transaction) => {
    const updateSQL = "UPDATE tbl_Account SET email = ?, phone = ? WHERE accountID = ? AND is_delete = 0"
    await db.queryNone(updateSQL, [email, phone, accountID], transaction)
    return true
  },
  changePassword: async (accountID, password, transaction) => {
    const sql = "UPDATE tbl_Account SET password = ? WHERE accountID = ?;"
    await db.queryNone(sql, [password, accountID], transaction)
  }
}