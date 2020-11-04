/**
 * Taro request
 * @class RequestTask
 */
import Taro from '@tarojs/taro';
import { ResponseBody } from '../response';

const RequestTask = (config) => {
  return new Promise((resolve, reject) => {
    const requestTask = Taro.request({
        url: config.url,
        data: config.data,
        header: {
          'content-type': 'application/json',
          ...config.headers,
        },
        method: config.method,
        dataType: config.dataType,
        success: (res) => {
          resolve(new ResponseBody())
        },
        fail: (err) => reject(err),
        complete: () => config.complete && config.complete()
    })

    if (config.timeout && 
        typeof config.timeout === 'number' && 
        config.timeout > 1000
    ) {
      const abortTimer = setTimeout(() => {
          clearTimeout(abortTimer);
          requestTask.abort();
          resolve({
            status: 'canceled'
          });
      }, config.timeout)
    }
  });
}

export default RequestTask;