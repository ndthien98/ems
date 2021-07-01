const db = require('../utils/mysqldb')

module.exports = {
  create: async (companyID, companyName, address, website, phone, email, contactName, transaction) => {
    const createSQL = "INSERT INTO tbl_Company(companyID, companyName, address, website, phone, email, contactName) VALUE(?, ?, ?, ?, ?, ?, ?)";
    await db.queryNone(createSQL, [companyID, companyName, address, website, phone, email, contactName], transaction)
  },
  getByID: async (companyID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Company WHERE companyID = ? AND is_delete = 0`
    const company = await db.queryOne(getByIDSQL, [companyID], transaction)
    return company
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `
      SELECT * FROM tbl_Company WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const companies = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return companies
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(companyID) as count FROM tbl_Company WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (companyID, companyName, address, website, phone, email, contactName, transaction) => {
    const updateSQL = `UPDATE tbl_Company 
    SET 
    companyName = ?, 
    address = ?,
    website = ?,
    phone = ?,
    email = ?,
    contactName = ?
    WHERE companyID = ?
    `
    await db.queryNone(updateSQL, [companyName, address, website, phone, email, contactName, companyID], transaction)
  },
  deleteByID: async (companyID, transaction) => {
    const deleteSQL = `UPDATE tbl_Company SET is_delete = 1 WHERE companyID = ?`
    await db.queryNone(deleteSQL, [companyID], transaction)
  },
  getAllCompanyIDWithCountTopic: async (transaction) => {
    const sql = `
    SELECT C.companyID, count(T.topicID) as countTopic
    FROM tbl_Company as C, tbl_Topic as T
    WHERE
    C.companyID = T.companyID
    GROUP BY C.companyID
    `
    const data = await db.queryMulti(sql,[],transaction)
    return data
  },
  getAllCompanyIDWithCountProject: async (transaction) => {
    const sql = `
    SELECT C.companyID, count(P.projectID) as countProject
    FROM tbl_Company as C, tbl_Topic as T, tbl_Project as P
    WHERE
    C.companyID = T.companyID AND
    T.topicID = P.topicID
    GROUP BY C.companyID
    `
    const data = await db.queryMulti(sql,[],transaction)
    return data
  },
  
}