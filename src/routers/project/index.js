const router = require('express').Router();

const controller = require('./controller')
const { requireLogin, requireRole } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const CRUD = require('../../middlewares/CRUD');
const { ROLE } = require('../../constants');

router.get('/student',
  requireLogin,
  requireRole(ROLE.STUDENT),
  catchError(controller.getStudentProject)
)

router.get('/teacher',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.getTeacherProject)
)

router.put('/student/:projectID',
  requireLogin,
  requireRole(ROLE.STUDENT),
  catchError(controller.updateStudentProjectByID)
)

router.put('/teacher/:projectID',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.updateTeacherProjectByID)
)

router.put('/close/:projectID',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.closeProject)
)

router.get('/:projectID',
  requireLogin,
  catchError(controller.getByID)
)


module.exports = router;
