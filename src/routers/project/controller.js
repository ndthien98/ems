const db = require('../../utils/mysqldb')
const validators = require('../../utils/validators')
const uuid = require('uuid').v4
const errors = require('../../utils/errors')
const repo = require('../../repo')

module.exports = {
  getStudentProject: async (req, res, next) => {
    const { studentID } = req.auth
    const projects = await repo.project.getStudentProject(studentID)
    res.send_list(projects)
  },
  getTeacherProject: async (req, res, next) => {
    const { teacherID } = req.auth
    const projects = await repo.project.getTeacherProject(teacherID)
    res.send_list(projects)
  },
  updateStudentProjectByID: async (req, res, next) => {
    const { studentID } = req.auth
    const { projectID } = req.params
    const { reportFile } = validators.valid_body(req.body, ['reportFile'])
    await repo.project.updateStudentProjectByID(studentID, projectID, reportFile)
    res.send_ok()
  },
  updateTeacherProjectByID: async (req, res, next) => {
    const { teacherID } = req.auth
    const { projectID } = req.params
    const { teacherComment, score } = validators.valid_body(req.body, ['teacherComment', 'score'])
    await repo.project.updateTeacherProjectByID(teacherID, projectID, teacherComment, score)
    res.send_ok()
  },
  closeProject: async (req, res, next) => {
    const { teacherID } = req.auth
    const { projectID } = req.params
    await repo.project.closeProject(teacherID, projectID)
    res.send_ok()
  },
  getByID: async (req, res, next) => {
    const { projectID } = req.params
    const project = await repo.project.getByID(projectID)
    res.send_obj(project)
  }
}