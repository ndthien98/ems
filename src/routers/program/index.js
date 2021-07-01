const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const CRUD = require('../../middlewares/CRUD')


router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:programID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  catchError(controller.create)
)

router.put('/:programID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:programID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
