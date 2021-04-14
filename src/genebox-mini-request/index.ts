import LoadingManager from './loading';
import { ResponseCode, ResponseBody } from './response';
import RequestFactory, { RequestBuilder } from './factory/RequestFactory';

import {
  GET,
  POST,
  PUT,
  DELETE,
  BaseUrl,
  Headers,
  Timeout,
  DataType,
  Loading,
  ResponseType
} from './request';

export {
  // request type
  GET,
  POST,
  PUT,
  DELETE,

  // request config
  BaseUrl,
  Headers,
  Timeout,
  DataType,
  Loading,
  ResponseType,

  // factory
  RequestFactory,
  RequestBuilder,

  // response
  ResponseCode,
  ResponseBody,

  // loading
  LoadingManager
}

