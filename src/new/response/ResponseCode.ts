
// 请求状态码
enum ResponseCode {
  SUCCESS = 200,
  AUTHENTICATE = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502
}

export default ResponseCode;