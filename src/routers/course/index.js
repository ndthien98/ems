const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')

router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:courseID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  catchError(controller.create)
)

router.put('/:courseID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:courseID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
