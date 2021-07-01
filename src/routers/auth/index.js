const router = require('express').Router();

const controller = require('./controller')
const { requireLogin, requireAdminPermission } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const { ROLE } = require('../../constants')

router.get('/',
  requireLogin,
  catchError(controller.getCurrentAuth));

router.post('/register',
  catchError(controller.register(ROLE.NORMAL)));

router.post('/register-admin',
  // requireLogin,
  // requireAdminPermission,
  catchError(controller.register(ROLE.ADMIN)));

router.post('/register-student',
  // requireLogin,
  catchError(controller.register(ROLE.STUDENT)));

router.post('/register-teacher',
  // requireLogin,
  catchError(controller.register(ROLE.TEACHER)));

router.post('/login',
  catchError(controller.login));

router.get('/verify',
  requireLogin,
  catchError(controller.verify));

router.put('/change-password',
  requireLogin,
  catchError(controller.changePassword)
)

module.exports = router;
