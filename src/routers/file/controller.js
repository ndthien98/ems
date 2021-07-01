const uploadImage = async (req, res, next) => {
  res.send({
    status: 1,
    link: '/uploads/' + req.file.filename
  })
}
module.exports = {
  uploadImage
}