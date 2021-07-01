const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const requests = await repo.request.getAll(limit, offset)
    const totalData = await repo.request.count()
    res.send_list(requests, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { requestID } = req.params
    const request = await repo.request.getByID(requestID)
    res.send_obj(request)
  },
  create: async (req, res, next) => {
    const { studentID } = req.auth
    const { note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID } = validators.valid_body(req.body, ['note', 'topicID1', 'topicID2', 'topicID3', 'timeType', 'SIS_status', 'englishScore', 'creditDebt', 'semester', 'courseID'])
    if (topicID1 === topicID2 || topicID2 === topicID3 || topicID3 === topicID1) {
      res.send_fail("Không được trùng đề tài")
    } else {
      const requestID = uuid()
      await repo.request.create(requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID)
      res.send_ok()
    }
  },
  updateByID: async (req, res, next) => {
    const { requestID } = req.params
    const { studentID } = req.auth
    const { note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID } = validators.valid_body(req.body, ['note', 'topicID1', 'topicID2', 'topicID3', 'timeType', 'SIS_status', 'englishScore', 'creditDebt', 'semester', 'courseID'])
    await repo.request.updateByID(requestID, studentID, note, topicID1, topicID2, topicID3, timeType, SIS_status, englishScore, creditDebt, semester, courseID)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { requestID } = req.params
    await repo.request.deleteByID(requestID)
    res.send_ok()
  },
  getTeacherRequest: async (req, res, next) => {
    const { teacherID } = req.auth
    const { level } = req.query
    const status = req.query.status || ''
    if (level === 1 || level === 2 || level === 3) {
      const requests = await repo.request.getRequestByTeacherIDByLevel(teacherID, level, status)
      res.send_list(requests)
    } else {
      const requests = await repo.request.getRequestsByTeacherID(teacherID, status)
      res.send_list(requests)
    }
  },
  getStudentRequest: async (req, res, next) => {
    const { studentID } = req.auth
    const requests = await repo.request.getRequestsByStudentID(studentID)
    res.send_list(requests)
  },

}