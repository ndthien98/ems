const db = require('../utils/mysqldb')
const uuid = require('uuid').v4
const errors = require('../utils/errors')
const project = require('./project')

module.exports = {
  create: async (teacherID, accountID, transaction) => {
    const createSQL = "INSERT INTO tbl_Teacher(teacherID, accountID) VALUE(?, ?)";
    await db.queryNone(createSQL, [teacherID, accountID], transaction)
  },
  getByID: async (teacherID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Teacher WHERE teacherID = ? AND is_delete = 0`
    const teacher = await db.queryOne(getByIDSQL, [teacherID], transaction)
    return teacher
  },
  getByAccountID: async (accountID, transaction) => {
    const getByAccountIDSQL = `SELECT * FROM tbl_Teacher WHERE accountID = ? AND is_delete = 0`
    const teacher = await db.queryOne(getByAccountIDSQL, [accountID], transaction)
    return teacher
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Teacher WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const teachers = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return teachers
  },
  getTeacherIDByAccountID: async (accountID, transaction) => {
    const getTeacherIDSQL = `SELECT teacherID FROM tbl_Teacher WHERE accountID = ? AND is_delete = 0`
    const { teacherID } = await db.queryOne(getTeacherIDSQL, [accountID], transaction)
    return teacherID
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(teacherID) as count FROM tbl_Teacher WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (teacherID, departmentID, teacherName, teacherNumber, transaction) => {
    const updateSQL = `UPDATE tbl_Teacher 
    SET 
    departmentID = ?, 
    teacherName = ?,
    teacherNumber = ?
    WHERE
    teacherID = ?
    `
    await db.queryNone(updateSQL, [departmentID, teacherName, teacherNumber, teacherID], transaction)
  },
  deleteByID: async (teacherID, transaction) => {
    const deleteSQL = `UPDATE tbl_Teacher SET is_delete = 1 WHERE programID = ?`
    await db.queryNone(deleteSQL, [teacherID], transaction)
  },
  acceptRequest: async (teacherID, requestID, transaction) => {
    const sql1 = `
    SELECT R.requestID, R.status, R.studentID, T.topicID
    FROM tbl_Request as R, tbl_Topic as T
    WHERE 
    T.topicID = (
      CASE
        WHEN R.status='WAIT1' THEN R.topicID1
        WHEN R.status='WAIT2' THEN R.topicID2
        WHEN R.status='WAIT3' THEN R.topicID3
      END
    )
    AND R.requestID = ?
    AND T.teacherID = ?
    AND R.is_delete = 0
    `
    const request = await db.queryOne(sql1, [requestID, teacherID], transaction)
    if (request) {
      request.status = request.status.replace('WAIT', 'ACCEPT')
      const sqlAccept = `
      UPDATE tbl_Request
      SET status='${request.status}'
      WHERE requestID = ?
      AND is_delete = 0
      `
      await db.queryNone(sqlAccept, [requestID], transaction)
      const newID = await project.createProject(request.studentID, request.topicID, transaction)
      return {
        projectID: newID,
        studentID: request.studentID,
        topicID: request.topicID,
        teacherID,
        requestID
      }
    } else {
      console.log(requestID, teacherID)
      throw errors.CREATE_BAD_REQUEST('Không tìm thấy nguyện vọng')
    }
  },
  rejectRequest: async (teacherID, requestID, transaction) => {
    const sql1 = `
    SELECT R.requestID, R.status, R.studentID, T.topicID
    FROM tbl_Request as R, tbl_Topic as T
    WHERE 
    T.topicID = (
      CASE
        WHEN R.status='WAIT1' THEN R.topicID1
        WHEN R.status='WAIT2' THEN R.topicID2
        WHEN R.status='WAIT3' THEN R.topicID3
      END
    )
    AND R.requestID = ?
    AND T.teacherID = ?
    AND R.is_delete = 0
    `
    const request = await db.queryOne(sql1, [requestID, teacherID], transaction)
    console.log(request)
    if (request) {
      const status = request.status === 'WAIT1' ? 'WAIT2' : (request.status === 'WAIT2' ? 'WAIT3' : 'REJECT')
      const sqlReject = `
      UPDATE tbl_Request
      SET status='${status}'
      WHERE requestID = ?
      AND is_delete = 0
      `
      await db.queryNone(sqlReject, [requestID], transaction)
    } else {
      throw errors.CREATE_BAD_REQUEST('Không tìm thấy nguyện vọng')
    }
  }
}
