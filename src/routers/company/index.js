const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')

router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:companyID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  catchError(controller.create)
)

router.put('/:companyID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:companyID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
