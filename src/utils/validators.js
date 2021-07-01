const errors = require('./errors')

module.exports = {
  password: (password) => {
    if (password.length < 5) {
      throw errors.CREATE_BAD_REQUEST("Tài khoản mật khẩu không hợp lệ")
    }
  },
  username: (username) => {
    if (username.length < 5) {
      throw errors.CREATE_BAD_REQUEST("Tài khoản mật khẩu không hợp lệ")
    }
  },
  repass: (password, repass) => {
    if (password !== repass) {
      throw errors.CREATE_BAD_REQUEST("Nhập lại mật khẩu không khớp")
    }
  },
  valid_body: (body, listParams) => {
    const missing_params = []
    listParams.forEach(param => {
      if (!body[param]) {
        missing_params.push(param)
      }
    });
    if (missing_params.length > 0)
      throw errors.CREATE_BAD_REQUEST("Body thiếu dữ liệu: " + missing_params)
    else
      return body
  },
  valid_query: (query, listParams) => {
    const missing_params = []
    listParams.forEach(param => {
      if (!query[param]) {
        missing_params.push(param)
      }
    });
    if (missing_params.length > 0)
      throw errors.CREATE_BAD_REQUEST("Query thiếu dữ liệu: " + missing_params)
    else
      return query
  }
}