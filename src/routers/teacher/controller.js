const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const teachers = await repo.teacher.getAll(limit, offset)
    const totalData = await repo.teacher.count()
    res.send_list(teachers, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { teacherID } = req.params
    const teacher = await repo.teacher.getByID(teacherID)
    res.send_obj(teacher)
  },
  updateByID: async (req, res, next) => {
    const { teacherID } = req.params
    const { departmentID, teacherName, teacherNumber } = validators.valid_body(req.body, ['departmentID', 'teacherName', 'teacherNumber'])
    await repo.teacher.updateByID(teacherID, departmentID, teacherName, teacherNumber)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { teacherID } = req.params
    await repo.teacher.deleteByID(teacherID)
    res.send_ok()
  },
  
  acceptRequest: async (req, res, next) => {
    const { teacherID } = req.auth
    const { requestID } = validators.valid_query(req.query, ['requestID'])
    const trans = await db.beginTransaction()
    try {
      const project = await repo.teacher.acceptRequest(teacherID, requestID, trans)
      res.send_obj(project)
      await db.commitTransaction(trans)
    } catch (error) {
      await db.rollbackTransaction(trans)
      next(error)
    }
  },
  rejectRequest: async (req, res, next) => {
    const { teacherID } = req.auth
    const { requestID } = validators.valid_query(req.query, ['requestID'])
    const trans = await db.beginTransaction()
    try {
      await repo.teacher.rejectRequest(teacherID, requestID)
      res.send_ok()
      await db.commitTransaction(trans)
    } catch (error) {
      await db.rollbackTransaction(trans)
      next(error)
    }
  },
}