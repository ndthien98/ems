const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const companies = await repo.department.getAll(limit, offset)
    const totalData = await repo.department.count()
    res.send_list(companies, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { departmentID } = req.params
    const department = await repo.department.getByID(departmentID)
    res.send_obj(department)
  },
  create: async (req, res, next) => {
    const { departmentName, address } = validators.valid_body(req.body, ['departmentName', 'address'])
    const departmentID = uuid()
    await repo.department.create(departmentID, departmentName, address)
    res.send_ok()
  },
  updateByID: async (req, res, next) => {
    const { departmentID } = req.params
    const { departmentName, address } = validators.valid_body(req.body, ['departmentName', 'address'])
    await repo.department.updateByID(departmentID, departmentName, address)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { departmentID } = req.params
    await repo.department.deleteByID(departmentID)
    res.send_ok()
  }
}