/**
 * Taro request
 * @class RequestTask
 */
import Taro from '@tarojs/taro';
import { RequestConfig } from '../@types';
import { ResponseBody, ResponseCode } from '../response';

const RequestTask = (config: RequestConfig) => {
  return new Promise((resolve, reject) => {
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
        const { status, msg, data } = res;
        resolve(new ResponseBody(status, msg, data))
      },
      fail: (err) => reject(err)
    })

    if (config.timeout &&
      typeof config.timeout === 'number' &&
      config.timeout > 1000
    ) {
      const abortTimer = setTimeout(() => {
        clearTimeout(abortTimer);
        requestTask.abort();
        resolve(new ResponseBody(ResponseCode.TIMEOUT, "网络请求超时", {}));
      }, config.timeout)
    }
  });
}

export default RequestTask;