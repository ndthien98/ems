const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')
const CRUD = require('../../middlewares/CRUD')


router.get('/',
  requireLogin,
  catchError(controller.getAll)
)

router.get('/:departmentID',
  requireLogin,
  catchError(controller.getByID)
)

router.post('/',
  requireLogin,
  catchError(controller.create)
)

router.put('/:departmentID',
  requireLogin,
  catchError(controller.updateByID)
)

router.delete('/:departmentID',
  requireLogin,
  catchError(controller.deleteByID)
)

module.exports = router;
