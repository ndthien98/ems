const db = require('../utils/mysqldb')

module.exports = {
  create: async (requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID, transaction) => {
    const createSQL = "INSERT INTO tbl_Request(requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.queryNone(createSQL, [requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID], transaction)
  },
  getByID: async (requestID, transaction) => {
    const getByIDSQL = `
    SELECT tbl_Request.*, tbl_Course.*
    FROM tbl_Request
    LEFT JOIN tbl_Course ON tbl_Course.courseID = tbl_Request.courseID
    WHERE requestID = ? AND tbl_Request.is_delete = 0`
    const request = await db.queryOne(getByIDSQL, [requestID], transaction)
    return request
  },
  getAll: async (limit, offset, transaction) => {
    const getByIDSQL = `
    SELECT tbl_Request.*, tbl_Course.*
    FROM tbl_Request
    LEFT JOIN tbl_Course ON tbl_Course.courseID = tbl_Request.courseID
    WHERE is_delete = 0 LIMIT ? OFFSET ?`
    const requests = await db.queryMulti(getByIDSQL, [limit, offset], transaction)
    return requests
  },
  count: async (transaction) => {
    const countSQL = `SELECT count(requestID) as count FROM tbl_Request WHERE is_delete = 0`
    const { count } = await db.queryOne(countSQL, [], transaction)
    return count
  },
  updateByID: async (requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID, transaction) => {
    const updateSQL = `UPDATE tbl_Request 
    SET 
      studentID = ?, 
      note = ?, 
      topicID1 = ?, 
      topicID2 = ?, 
      topicID3 = ?, 
      timeType = ?, 
      SIS_status = ?, 
      englishScore = ?, 
      creditDebt = ?, 
      semester = ?,
      courseID = ?
    WHERE requestID = ?
    `
    await db.queryNone(updateSQL, [studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, requestID, courseID], transaction)
  },
  deleteByID: async (requestID, transaction) => {
    const deleteSQL = `UPDATE tbl_Request SET is_delete = 1 WHERE requestID = ?`
    await db.queryNone(deleteSQL, [requestID], transaction)
  },
  getRequestsByTeacherID: async (teacherID, status, transaction) => {
    const getRequestsByTeacherIDSQL = `
    SELECT * 
    FROM tbl_Request as R INNER JOIN tbl_Course ON R.courseID = tbl_Course.courseID , tbl_Topic as T, tbl_Student as S
    WHERE T.teacherID = ? 
    AND (
      R.topicID1 = T.topicID OR R.topicID2 = T.topicID OR R.topicID3 = T.topicID
    ) 
    AND R.is_delete = 0
    AND R.status LIKE ?
    AND S.studentID = R.studentID
    `
    const requests = await db.queryMulti(getRequestsByTeacherIDSQL, [teacherID, `%${status}%`], transaction)
    return requests
  },
  getRequestByTeacherIDByLevel: async (teacherID, level, status, transaction) => {
    const getRequestsByTeacherIDSQL = `
    SELECT * 
    FROM tbl_Request as R INNER JOIN tbl_Course ON R.courseID = tbl_Course.courseID, tbl_Topic as T, tbl_Student as S
    WHERE T.teacherID = ? 
    AND R.topicID${level} = T.topicID
    AND R.is_delete = 0
    AND R.status LIKE ?
    AND S.studentID = R.studentID
    `
    const requests = await db.queryMulti(getRequestsByTeacherIDSQL, [teacherID, `%${status}%`], transaction)
    return requests
  },
  getRequestsByStudentID: async (studentID, transaction) => {
    const getRequestsByStudentIDSQL = `
    SELECT * 
    FROM tbl_Request as R INNER JOIN tbl_Course ON R.courseID = tbl_Course.courseID, tbl_Topic as T, tbl_Teacher as Tc
    WHERE R.studentID = ? 
    AND (
      R.topicID1 = T.topicID OR R.topicID2 = T.topicID OR R.topicID3 = T.topicID
    ) 
    AND R.is_delete = 0
    AND Tc.teacherID = T.teacherID
    `
    const requests = await db.queryMulti(getRequestsByStudentIDSQL, [studentID], transaction)
    return requests
  },
}