/**
 * Taro request
 * @class RequestTask
 */
import Taro from '@tarojs/taro';
import { RequestConfig } from '../@types';
import { ResponseBody, ResponseCode } from '../response';
import RequestTaskManager from './RequestTaskManager';

const RequestTask = (config: RequestConfig) => {
  return new Promise((resolve, reject) => {
    if (config.showLoading) {
      Taro.showLoading();
    }
    // 支持多种请求，中断某个
    const requestTask = Taro.request({
      url: config.url!,
      data: config.data,
      header: {
        'content-type': 'application/json',
        ...config.header,
      },
      method: config.method as any,
      dataType: config.dataType,
      success: (res: any) => {
        if (config.showLoading) {
          Taro.hideLoading();
        }
        RequestTaskManager.popRequest({ url: config.url! });
        const { status, msg, data } = res;
        resolve(new ResponseBody(status, msg, data))
      },
      fail: (err) => {
        if (config.showLoading) {
          Taro.hideLoading();
        }
        RequestTaskManager.popRequest({ url: config.url! });
        reject(err)
      }
    })
    RequestTaskManager.addRequest({
      url: config.url!,
      requestTask,
    });
    if (config.timeout &&
      typeof config.timeout === 'number' &&
      config.timeout > 1000
    ) {
      const abortTimer = setTimeout(() => {
        clearTimeout(abortTimer);
        if (config.showLoading) {
          Taro.hideLoading();
        }
        requestTask.abort();
        RequestTaskManager.popRequest({ url: config.url! });
        resolve(new ResponseBody(ResponseCode.TIMEOUT, "网络请求超时", {}));
      }, config.timeout)
    }
  });
}

export default RequestTask;