const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const programs = await repo.program.getAll(limit, offset)
    const totalData = await repo.program.count()
    res.send_list(programs, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { programID } = req.params
    const program = await repo.program.getByID(programID)
    res.send_obj(program)
  },
  create: async (req, res, next) => {
    const { schoolName, duration, degree } = validators.valid_body(req.body, ['schoolName', 'duration', 'degree'])
    const programID = uuid()
    await repo.program.create(programID, schoolName, duration, degree)
    res.send_ok()
  },
  updateByID: async (req, res, next) => {
    const { programID } = req.params
    const { schoolName, duration, degree } = validators.valid_body(req.body, ['schoolName', 'duration', 'degree'])
    await repo.program.updateByID(programID, schoolName, duration, degree)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { programID } = req.params
    await repo.program.deleteByID(programID)
    res.send_ok()
  }
}