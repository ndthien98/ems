const uuid = require('uuid').v4
const db = require('../utils/mysqldb')
const topicRepo = require('./topic')
const teacherRepo = require('./teacher')
const companyRepo = require('./company')

module.exports = {
  getByID: async (projectID, transaction) => {
    const getByIDSQL = `SELECT * FROM tbl_Project WHERE projectID = ? AND is_delete = 0`
    const project = await db.queryOne(getByIDSQL, [projectID], transaction)
    return project
  },
  createProject: async (studentID, topicID, transaction) => {
    const newID = uuid()
    const sqlCreateProject = `
      INSERT INTO tbl_Project(projectID, studentID, topicID) VALUE(?,?,?)
      `
    await db.queryNone(sqlCreateProject, [newID, studentID, topicID], transaction)
    return newID
  },
  getStudentProject: async (studentID, transaction) => {
    const sql = `
    SELECT * 
    FROM tbl_Project
    WHERE studentID = ? `
    const projects = await db.queryMulti(sql, [studentID], transaction)
    console.log(projects)
    const projectwithdata = projects.map(async (e,i)=>{
      const topic = await topicRepo.getByID(e.topicID)
      const teacher = await teacherRepo.getByID(topic.teacherID)
      const company = await companyRepo.getByID(topic.companyID)
      return {
        ...e,
        topic, teacher, company
      }
    })
    console.log(projectwithdata)
    return await Promise.all(projectwithdata)
  },
  getTeacherProject: async (teacherID, transaction) => {
    const sql = `
    SELECT * 
    FROM tbl_Project as P, tbl_Topic as T
    WHERE P.topicID = T.topicID
    AND T.teacherID = ?`
    const projects = await db.queryMulti(sql, [teacherID], transaction)
    return projects
  },
  updateStudentProjectByID: async (studentID, projectID, reportFile, transaction) => {
    const sql = `
    UPDATE tbl_Project 
    SET 
      reportFile = ? 
    WHERE projectID = ? 
    AND studentID = ? 
    AND status='ACTIVATE' 
    AND is_delete = 0`
    await db.queryNone(sql, [reportFile, projectID, studentID], transaction)
  },
  updateTeacherProjectByID: async (teacherID, projectID, teacherComment, score, transaction) => {
    const sql = `
    UPDATE tbl_Project as P, tbl_Topic as T
    SET 
      P.teacherComment = ? ,
      P.score = ?
    WHERE P.projectID = ? 
    AND T.teacherID = ? 
    AND T.topicID = P.topicID
    AND P.status='ACTIVATE' 
    AND P.is_delete = 0`
    await db.queryNone(sql, [teacherComment, score, projectID, teacherID], transaction)
  },
  closeProject: async (teacherID, projectID, transaction) => {
    const sql = `
    UPDATE tbl_Project as P, tbl_Topic as T
    SET 
      P.status = 'DONE'
    WHERE P.projectID = ? 
    AND T.teacherID = ? 
    AND T.topicID = P.topicID
    AND P.status='ACTIVATE' 
    AND P.is_delete = 0`
    await db.queryNone(sql, [projectID, teacherID], transaction)
  }
}