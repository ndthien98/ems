const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getAll: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const topics = await repo.topic.getAll(limit, offset)
    const totalData = await repo.topic.count()
    res.send_list(topics, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getByID: async (req, res, next) => {
    const { topicID } = req.params
    const topic = await repo.topic.getByID(topicID)
    res.send_obj(topic)
  },
  create: async (req, res, next) => {
    const { teacherID } = req.auth
    const { topicName, companyID, description, maxStudent } = validators.valid_body(req.body, ['topicName', 'companyID', 'description', 'maxStudent'])
    const topicID = uuid()
    await repo.topic.create(topicID, teacherID, companyID, topicName, description, maxStudent)
    res.send_ok()
  },
  updateByID: async (req, res, next) => {
    const { teacherID } = req.auth
    const { topicID } = req.params
    const { topicName, companyID, description, maxStudent } = validators.valid_body(req.body, ['topicName', 'companyID', 'description', 'maxStudent'])
    await repo.topic.updateByID(topicID, teacherID, companyID, topicName, description, maxStudent)
    res.send_ok()
  },
  deleteByID: async (req, res, next) => {
    const { topicID } = req.params
    await repo.topic.deleteByID(topicID)
    res.send_ok()
  },
  getTopicByTeacherID: async (req, res, next) => {
    const { teacherID } = req.auth
    const topics = await repo.topic.getByTeacherID(teacherID)
    res.send_list(topics)
  }
}