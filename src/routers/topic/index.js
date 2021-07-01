const router = require('express').Router();

const controller = require('./controller')
const { requireLogin, requireRole } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const { ROLE } = require('../../constants')


router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/current-teacher',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.getTopicByTeacherID)
)

router.get('/:topicID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.create)
)

router.put('/:topicID',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.updateByID)
)

router.delete('/:topicID',
  requireLogin,
  requireRole(ROLE.TEACHER),
  catchError(controller.deleteByID)
)

module.exports = router;
