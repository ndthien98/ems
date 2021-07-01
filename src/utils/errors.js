const httpError = require('http-errors')

module.exports = {
  LOGIN_FAIL: httpError.BadRequest('Login fail!'),
  REFRESH_TOKEN_FAIL: httpError.BadRequest('Refresh token fail!'),
  VERIFY_TOKEN_FAIL: httpError.BadRequest('Verify token fail!'),
  REGISTER_FAIL: httpError.BadRequest('Already existed!'),
  UNAUTHORIZED: httpError.Unauthorized('Không được cấp quyền'),
  // Custom Errors
  CREATE_BAD_REQUEST: httpError.BadRequest,
  DATABASE_ERROR: httpError.InternalServerError('Lỗi cơ sở dữ liệu')
}