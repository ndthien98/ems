const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const companies = await repo.company.getAll(limit, offset)
    const totalData = await repo.company.count()
    const countTopic = await repo.company.getAllCompanyIDWithCountTopic()
    const countProject = await repo.company.getAllCompanyIDWithCountProject()
    companies.forEach((e, i) => {
      countTopic.forEach(ec => {
        if (ec.companyID === e.companyID) {
          Object.assign(companies[i], ec)  
        }
      });
      countProject.forEach(ec => {
        if (ec.companyID === e.companyID) {
          Object.assign(companies[i], ec)  
        }
      });
      if(!companies[i].countTopic){
        companies[i].countTopic = 0
      }
      if(!companies[i].countProject){
        companies[i].countProject = 0
      }
    });
    res.send_list(companies, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { companyID } = req.params
    const company = await repo.company.getByID(companyID)
    res.send_obj(company)
  },
  create: async (req, res, next) => {
    const { companyName, address, website, phone, email, contactName } = validators.valid_body(req.body, ['companyName', 'address', 'website', 'phone', 'email', 'contactName'])
    const companyId = uuid()
    await repo.company.create(companyId, companyName, address, website, phone, email, contactName)
    res.send_ok()
  },
  updateByID: async (req, res, next) => {
    const { companyID } = req.params
    const { companyName, address, website, phone, email, contactName } = validators.valid_body(req.body, ['companyName', 'address', 'website', 'phone', 'email', 'contactName'])
    await repo.company.updateByID(companyID, companyName, address, website, phone, email, contactName)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { companyID } = req.params
    await repo.company.deleteByID(companyID)
    res.send_ok()
  }
}