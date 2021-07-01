const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')

router.get('/',
  requireLogin,
  catchError(controller.getAllAccount)
)

router.get('/current',
  requireLogin,
  catchError(controller.getCurrentAccount)
)

router.put('/',
  requireLogin,
  catchError(controller.updateCurrentAccount)
)


module.exports = router;
