
const db = require('../utils/mysqldb')

module.exports = {
  getListCompanyID: async (transaction) => {
    const allIDSQL = `SELECT companyID, companyName FROM tbl_Company WHERE is_delete = 0`
    const allIDs = await db.queryMulti(allIDSQL, [], transaction)
    return allIDs
  },
  getListCourseID: async (transaction) => {
    const allIDSQL = `SELECT courseID, courseName FROM tbl_Course WHERE is_delete = 0`
    const allIDs = await db.queryMulti(allIDSQL, [], transaction)
    return allIDs
  },
  getListDepartmentID: async (transaction) => {
    const allIDSQL = `SELECT departmentID, departmentName FROM tbl_Department WHERE is_delete = 0`
    const allIDs = await db.queryMulti(allIDSQL, [], transaction)
    return allIDs
  },
  getListProgramID: async (transaction) => {
    const allIDSQL = `SELECT programID, schoolName FROM tbl_Program WHERE is_delete = 0`
    const allIDs = await db.queryMulti(allIDSQL, [], transaction)
    return allIDs
  },
  getListTopicID: async (transaction) => {
    const allIDSQL = `SELECT topicID, topicName FROM tbl_Topic WHERE is_delete = 0`
    const allIDs = await db.queryMulti(allIDSQL, [], transaction)
    return allIDs
  },
}
