import LoadingManager from './src/genebox-mini-request/loading';
import { ResponseCode, ResponseBody } from './src/genebox-mini-request/response';
import RequestFactory, { RequestBuilder } from './src/genebox-mini-request/factory/RequestFactory';

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
} from './src/genebox-mini-request/request';

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

