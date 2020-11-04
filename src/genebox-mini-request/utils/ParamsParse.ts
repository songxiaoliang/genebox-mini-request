// 获取 { url, params }
const ParamsParse = (args) => {
  if (!args || args?.length === 0) {
    return;
  }

  let url = args[0];
  let params;
  if (args.length === 1) {
    // 只有一个参数
    if (typeof url === 'object') {
      // 参数是对象
      params = url.params || url.data;
      url = url.url
    }
  } else {
    // 多个参数, 第一个为url, 所以从第二个取到最后， 
    // eg @GET('v1/{0}/{1}', 'arg1', 'arg2') => v1/arg1/arg2
    let _args = Array.prototype.slice.call(args, 1);
    url = url.replace(/\{(\d+)\}/g, (m, i) => {
      return _args[i];
    });
  }

  return {
    url,
    params
  }
}

export default ParamsParse;