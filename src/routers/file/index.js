const router = require('express').Router()
const mediaService = require('./controller')

const { requireLogin } = require('../../middlewares/auth')

const upload = require('../../middlewares/upload')
const { catchError } = require('../../middlewares/catchError')

router.put('/upload',
  requireLogin,
  upload.single('file'),
  catchError(mediaService.uploadImage)
);


module.exports = router
