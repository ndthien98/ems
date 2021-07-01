const db = require('../utils/mysqldb')

module.exports = {
  create: async (topicID, teacherID, companyID, topicName, description, maxStudent, transaction) => {
    const createSQL = "INSERT INTO tbl_Topic(topicID, teacherID, companyID, topicName, description, maxStudent) VALUE(?, ?, ?, ?, ?, ?)";
    await db.queryNone(createSQL, [topicID, teacherID, companyID, topicName, description, maxStudent], transaction)
  },
  getByID: async (topicID, transaction) => {
    const getByIDSQL = `
    SELECT * 
    FROM tbl_Topic, tbl_Teacher, tbl_Department, tbl_Account
    WHERE tbl_Topic.teacherID = tbl_Teacher.teacherID 
    AND tbl_Teacher.departmentID = tbl_Department.departmentID 
    AND tbl_Teacher.accountID = tbl_Account.accountID 
    AND tbl_Topic.topicID = ? 
    AND tbl_Topic.is_delete = 0 
    AND tbl_Teacher.is_delete = 0
    `
    const topic = await db.queryOne(getByIDSQL, [topicID], transaction)
    delete topic.password
    
    return topic
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `
    SELECT * 
    FROM tbl_Topic, tbl_Teacher, tbl_Department, tbl_Account
    WHERE tbl_Topic.teacherID = tbl_Teacher.teacherID 
    AND tbl_Teacher.departmentID = tbl_Department.departmentID 
    AND tbl_Teacher.accountID = tbl_Account.accountID 
    AND tbl_Topic.is_delete = 0 
    AND tbl_Teacher.is_delete = 0 
    LIMIT ? OFFSET ?`
    const topics = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return topics
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(topicID) as count FROM tbl_Topic WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (topicID, teacherID, companyID, topicName, description, maxStudent, transaction) => {
    const updateSQL = `UPDATE tbl_Topic 
    SET 
    companyID = ?, 
    topicName = ?, 
    description = ?,
    maxStudent = ?
    WHERE topicID = ? AND teacherID = ?
    `
    await db.queryNone(updateSQL, [companyID, topicName, description, maxStudent, topicID, teacherID], transaction)
  },
  deleteByID: async (topicID, transaction) => {
    const deleteSQL = `UPDATE tbl_Topic SET is_delete = 1 WHERE topicID = ?`
    await db.queryNone(deleteSQL, [topicID], transaction)
  },
  getByTeacherID: async (teacherID, transaction) => {
    const sql = `SELECT * FROM tbl_Topic WHERE teacherID = ? AND is_delete = 0`
    const topics = await db.queryMulti(sql, [teacherID], transaction)
    return topics
  }
}