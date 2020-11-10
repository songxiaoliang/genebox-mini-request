import { RequestTree } from "../@types";

// 请求实例队列
const RequestTaskArray: RequestTree[] = [];

// 中断所有发送中请求
const abortAllRequest = () => {
  RequestTaskArray.forEach(request => {
    request.requestTask?.abort();
  });
}

// 中断某个请求
const abortRequest = (options: RequestTree) => {
  RequestTaskArray.forEach(request => {
    if (options?.url === request.url) {
      request.requestTask?.abort(); 
      return;
    }
  });
}

// 将 requestTask 入栈
const addRequest = (options: RequestTree) => {
  if(options) {
    RequestTaskArray.push(options);
  }
}

// 将 requestTask 出栈
const popRequest = (options: RequestTree) => {
  if(options) {
    for (let index = 0; index < RequestTaskArray.length; index++) {
      const request = RequestTaskArray[index];
      if (options?.url === request.url) {
        RequestTaskArray.splice(index, 1);
        return;
      }
    }
  }
}

export default {
  addRequest,
  popRequest,
  abortRequest,
  abortAllRequest,
}

