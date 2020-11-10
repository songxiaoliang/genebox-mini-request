import { Chain, RequestTask } from "@tarojs/taro";

type RequestConfig = {
  url?: string;
  // 请求方式
  method?: string;
  // 请求头
  header?: any;
  // 请求参数
  data?: any;
  // 返回值类型
  dataType?: string;
  // 超时时长
  timeout?: number;
  // 响应类型
  responseType?: string;
  // 请求Loading
  showLoading?: boolean;
};

type RequestArgs = {
  url: string;
  params: any;
  method: string;
}

type InterceptorType = (chain: Chain) => any

type RequestTree = { url: string, requestTask?: RequestTask<any>};

export {
  RequestArgs,
  RequestTree,
  RequestConfig,
  InterceptorType
}