const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')

router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:studentID',
  requireLogin,
  catchError(controller.getByID)
)

router.put('/:studentID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:studentID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
