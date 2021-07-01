const router = require('express').Router();

const controller = require('./controller')
const { requireLogin, requireRole } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const { ROLE } = require('../../constants')
const CRUD = require('../../middlewares/CRUD');

router.get('/teacher',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.getTeacherRequest)
)
router.get('/student',
  requireLogin,
  requireRole(ROLE.STUDENT),
  catchError(controller.getStudentRequest)
)

router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:requestID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  requireRole(ROLE.STUDENT),
  catchError(controller.create)
)

router.put('/:requestID',
  requireLogin,
  requireRole(ROLE.STUDENT),
  catchError(controller.updateByID)
)

router.delete('/:requestID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
