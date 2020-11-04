
import { MergeParams } from '../utils';
import RequestTask from './RequestTask';
import { RequestFactory } from '../../new';
import { RequestArgs, RequestConfig } from '../@types';

/**
 * RequestTaskService
 * @param {*} args: { url, params, method }
 * @param {*} target
 * @param {*} property
 * @param {*} descriptor
 */
const RequestTaskService = (args: RequestArgs) => (target, p, descriptor) => {
  if (!descriptor) {
    return;
  }
  const metaFunc: any = descriptor.value;

  let config: RequestConfig;
  let BaseUrl: string = metaFunc.baseUrl
    || RequestFactory.instance.getBaseUrl();

  descriptor.value = (...metaArgs: any): void => {
    // 请求地址
    config.url = `${BaseUrl}${args.url}`;
    // 请求方式
    config.method = args.method;
    // 请求头
    config.header = {
      ...RequestFactory.instance.getHeaders(),
      ...(metaFunc.headers || descriptor.value.headers)
    };
    // 请求参数
    config.data = MergeParams(args, metaArgs);
    // 请求Loading
    config.showLoading = metaFunc.hideLoading || true;
    // 超时时长
    config.timeout = (metaFunc.timeout || descriptor.value.timeout) 
    || RequestFactory.instance.getBaseUrl();
    // 返回值类型
    config.dataType = metaFunc.dataType || descriptor.value.dataType;
    // 响应类型
    config.responseType = metaFunc.resType || descriptor.value.resType;

    // 发起请求，将结果作为参数回传给原方法
    RequestTask(config).then((res) => {
      metaFunc.apply(target, res);
    }).catch((err) => {
      metaFunc.apply(target, {}, err);
    });
  }
}

export default RequestTaskService;