const router = require('express').Router();

const controller = require('./controller')
const { requireLogin } = require('../../middlewares/auth');
const { catchError } = require('../../middlewares/catchError')

router.get('/all-company-id',
  requireLogin,
  catchError(controller.getListCompanyID)
)

router.get('/all-course-id',
  requireLogin,
  catchError(controller.getListCourseID)
)

router.get('/all-department-id',
  requireLogin,
  catchError(controller.getListDepartmentID)
)

router.get('/all-program-id',
  requireLogin,
  catchError(controller.getListProgramID)
)

router.get('/all-topic-id',
  requireLogin,
  catchError(controller.getListTopicID)
)

module.exports = router;
