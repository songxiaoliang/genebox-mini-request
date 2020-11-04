
// 基地址
const BaseUrl = (baseUrl) => (target, p, descriptor) => {
  if (typeof baseUrl === 'string') {
    if (descriptor) {
      descriptor.value.baseUrl = baseUrl;
    }
  }
}

// 请求头配置
const Headers = (headers) => (target, p, descriptor) => {
  if (typeof headers === 'object') {
      if (descriptor) {
        descriptor.value.headers = Object.assign({}, descriptor.value.headers, headers);
      }
  }
}

// formdata, 一般用于上传文件
export const Multipart = (target, p, descriptor) => {
  if (descriptor) {
    descriptor.value.headers = {
      ...descriptor.value.headers,
      'Content-Type': 'multipart/form-data'
    };
  }
}

// 表单提交方式
export const FormUrlEncoded = (target, p, descriptor) => {
  if (descriptor) {
    descriptor.value.headers = {
      ...descriptor.value.headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }
}

// 超时时长
const Timeout = (times) => (target, p, descriptor) => {
  if (typeof times === 'number') {
    if (descriptor) {
      descriptor.value.timeout = times;
    }
  }
}

// "json" | "其他"
const DataType = (type) => (target, p, descriptor) => {
  if (typeof type === 'string') {
    if (descriptor) {
      descriptor.value.dataType = type;
    }
  }
}

// 响应的数据类型: "text" | "arraybuffer"
const ResponseType = (resType) => (target, p, descriptor) => {
  if (typeof resType === 'string') {
    if (descriptor) {
      descriptor.value.resType = resType;
    }
  }
}

// 显示请求Loading
const Loading = () => (target, p, descriptor) => {
  if (descriptor) {
    descriptor.value.showLoading = true;
  }
}

export {
  BaseUrl,
  Headers,
  Timeout,
  DataType,
  Loading,
  ResponseType
}