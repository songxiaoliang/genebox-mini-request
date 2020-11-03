const axios = {};

export const GET = (...args) => request('get', args);

export const POST = (...args) => request('post', args);

export const PUT = (...args) => request('put', args);

export const DELETE = (...args) => request('delete', args);

export const HTTP = args => typeof args === 'object' && _Request(args);

const request = (_method, args) => {
  const params = _ParamsParse(args);
  const req = Object.assign({}, { method: _method }, params);
  return _Request(req)
}

const _Merge = (args = {}, options) => {
  // { url, params, method }  
  let params = args.params || args.data || {};
    
    if (options && options.length > 0) {
        for (let i = 0, len = options.length; i < len; i++) {
            let _option = options[i];
            if (typeof _option === 'string') {
                _option = parseQuery(_option); // string -> object
            }

            args.url = args.url.replace(/\{(.*?)\}/g, (m, v) => {
                return _option[v] || m;
            })
            params = Object.assign({}, params, _option);
        }
    }
    return params;
}

// 获取 { url, params }
const _ParamsParse = (args) => {
    if (!args || args.length === 0) {
        return;
    }

    let _url = args[0], _params;
    if (args.length === 1) {
        // 只有一个参数
        if (typeof _url === 'object') {
            // 参数是对象
            _params = _url.params || _url.data;
            _url = _url.url
        }
    } else {
        // 多个参数
        // 取到第二个
        let _args = Array.prototype.slice.call(args, 1);
        _url = _url.replace(/\{(\d+)\}/g, (m, i) => {
            return _args[i];
        });
    }

    return {
        url: _url,
        params: _params
    }
}

const _Request = (args) => (target, property, descriptor) => {
  // args: { url, params, method }
    if (!descriptor) {
        process.env.NODE_ENV !== 'production' && console.warn(`http options only works on methods`);
        return;
    }

    // 拿到方法原型
    let oldVal = descriptor.value;
    
    descriptor.value = function (..._args) {
        // 从target上获取 axios 实例子，这个是在@Create中注入的
        let instance = target.axios || this.axios || axios;

        // 获取 @Header配置的请求头
        let _headers = oldVal._headers || descriptor.value._headers;

        // 获取 @Config 配置
        let _config = oldVal._config || descriptor.value._config;

        // 请求参数
        let _params = _Merge(args, _args);

        let config = {
            method: args.method,
            url: args.url
        }

        // 请求头
        if (_headers) {
            config.headers = _headers;
        }

        // 请求参数
        if (_params) {
            if (args.method == 'get') {
                config.params = _params;
            } else if (args.method == 'put' || args.method == 'post' || args.method == 'patch') {
                config.data = _params;
            } else if (args.method == 'delete') {
                config.params = _params;
                config.data = _params;
            }
        }

        // 创建请求实例
        const req = instance(Object.assign({}, config, _config));

        // 发起请求
        req.then((res) => {
          // 请求结束，调用元方法
            oldVal.call(this, res.data);
        }).catch((err) => {
          // 请求结束，调用元方法
            oldVal.call(this, {}, err);
        })
    };
}

const parseQuery = query => {
    const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    const obj = {};
    while (reg.exec(query)) {
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}