import { RequestArgs } from "../@types";

// 将请求方式中的参数和调用方法时传入的参数合并
const MergeParams = (requestConfigArgs: RequestArgs, metaFuncArgs) => {
  let params = requestConfigArgs?.params || {};
  const metaFuncArgsLength = metaFuncArgs?.length || 0;
  if (metaFuncArgsLength > 0) {
    for (let i = 0; i < metaFuncArgsLength; i++) {
      let option = metaFuncArgs[i];
      // 字符串，即需要替换url中占位的参数, RESTful会用到
      if (typeof option === 'string') {
        option = formatQueryParams(option);
        requestConfigArgs.url = requestConfigArgs?.url?.replace(/\{(.*?)\}/g, (m, v) => {
          // m: '{匹配到的占位名称}', v: 匹配到的占位名称
          return option[v] || m;
        })
      } else {
        params = Object.assign({}, params, option);
      }
    }
  }
  return params;
}

// key=value -> { key: value }
const formatQueryParams = (query) => {
  const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  const obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

export default MergeParams;