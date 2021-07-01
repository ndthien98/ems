const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const students = await repo.student.getAll(limit, offset)
    const totalData = await repo.student.count()
    res.send_list(students, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { studentID } = req.params
    const student = await repo.student.getByID(studentID)
    res.send_obj(student)
  },
  updateByID: async (req, res, next) => {
    const { studentID } = req.params
    const { programID, studentName, studentNumber, gender, schoolEmail, facebookLink, cvLink, country, province, address } = validators.valid_body(req.body, ['programID', 'studentName', 'studentNumber', 'gender', 'schoolEmail', 'facebookLink', 'cvLink', 'country', 'province', 'address'])
    await repo.student.updateByID(studentID, programID, studentName, studentNumber, gender, schoolEmail, facebookLink, cvLink, country, province, address)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { studentID } = req.params
    await repo.student.deleteByID(studentID)
    res.send_ok()
  }
}