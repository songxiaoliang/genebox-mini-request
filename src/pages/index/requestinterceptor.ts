import { ResponseCode } from "../../genebox-mini-request"
const RequestInterceptor = (chain) => {
  const requestParams = chain.requestParams

  // 只要请求成功，不管返回什么状态码，都走这个回调
  return chain.proceed(requestParams).then(res => {
    if (res.statusCode === ResponseCode.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === ResponseCode.BAD_GATEWAY) {
      return Promise.reject("服务端出现问题");
    } else if (res.statusCode === ResponseCode.FORBIDDEN) {
      // TODO go to login
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === ResponseCode.AUTHENTICATE) {
      // TODO go to login
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === ResponseCode.SUCCESS) {
      return res.data
    }
  })
}

export default RequestInterceptor;
