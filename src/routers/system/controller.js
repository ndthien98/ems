const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getListCompanyID: async (req, res, next) => {
    const allID = await repo.system.getListCompanyID()
    res.send_list(allID)
  },
  getListCourseID: async (req, res, next) => {
    const allID = await repo.system.getListCourseID()
    res.send_list(allID)
  },
  getListDepartmentID: async (req, res, next) => {
    const allID = await repo.system.getListDepartmentID()
    res.send_list(allID)
  },
  getListProgramID: async (req, res, next) => {
    const allID = await repo.system.getListProgramID()
    res.send_list(allID)
  },
  getListTopicID: async (req, res, next) => {
    const allID = await repo.system.getListTopicID()
    res.send_list(allID)
  },

}