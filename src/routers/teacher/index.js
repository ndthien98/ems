const router = require('express').Router();

const controller = require('./controller')
const { requireLogin, requireRole } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError');
const { ROLE } = require('../../constants');

router.put('/accept',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.acceptRequest)
)

router.put('/reject',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.rejectRequest)
)

router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:teacherID',
  requireLogin,
  catchError(controller.getByID)
)

router.put('/:teacherID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:teacherID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
