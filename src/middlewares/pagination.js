const errors = require("../utils/errors")

const pagination = (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1
  const size = parseInt(req.query.size) || 10
  req.pagination = {
    limit: size ? size : 10,
    offset: size ? (page > 0 ? ((page - 1) * size) : 0) : 0,
    keyword: req.query.keyword || '',
    page,
    size
  }

  res.send_list = (data, metadata) => {
    res.send({
      status: 1,
      metadata: { ...metadata, length: data.length },
      data: [...data.map(e => {
        delete e.is_delete
        delete e.status
        delete e.password
        return e
      })]
    })
  }

  res.send_obj = (data, metadata) => {
    if(data.password) delete data.password
    res.send({
      status: 1,
      metadata: { ...metadata },
      data: { ...data }
    })
  }

  res.send_ok = () => {
    res.send({
      status: 1,
      message: "Thành công!"
    })
  }

  res.send_fail = (message) => {
    res.status(400).send({
      status: 0,
      message: message || "Thất bại!"
    })
  }

  next()
}
module.exports = pagination