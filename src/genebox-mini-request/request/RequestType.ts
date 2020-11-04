/**
 * 请求方式
 */
import { ParamsParse } from "../utils";
import RequestTaskService from "./RequestTaskService";

const GET = (...args) => RequestType('GET', args);
const POST = (...args) => RequestType('POST', args);
const PUT = (...args) => RequestType('PUT', args);
const DELETE = (...args) => RequestType('DELETE', args);

const RequestType = (method, args) => {
  const params = ParamsParse(args);
  const req = Object.assign({}, { method }, params);
  return RequestTaskService(req);
}

export { GET, POST, PUT, DELETE };