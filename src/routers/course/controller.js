const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const courses = await repo.course.getAll(limit, offset)
    const totalData = await repo.course.count()
    res.send_list(courses, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { courseID } = req.params
    const course = await repo.course.getByID(courseID)
    res.send_obj(course)
  },
  create: async (req, res, next) => {
    const { programID, courseName, credit, type } = validators.valid_body(req.body, ['programID', 'courseName', 'credit', 'type'])
    const courseID = uuid()
    await repo.course.create(courseID, programID, courseName, credit, type)
    res.send_ok()
  },
  updateByID: async (req, res, next) => {
    const { courseID } = req.params
    const { programID, courseName, credit, type } = validators.valid_body(req.body, ['programID', 'courseName', 'credit', 'type'])
    await repo.course.updateByID(courseID, programID, courseName, credit, type)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { courseID } = req.params
    await repo.course.deleteByID(courseID)
    res.send_ok()
  }
}