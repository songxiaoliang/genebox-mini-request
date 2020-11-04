import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'

import './app.scss'
import { RequestBuilder, RequestFactory } from './genebox-mini-request'
import RequestInterceptor from './pages/index/requestinterceptor'

const store = {
  counterStore
}

class App extends Component {
  constructor(props) {
    super(props);
    const request: RequestFactory = new RequestBuilder()
      .baseUrl("https://static.genebox.cn") // BaseUrl
      .timeOut(666666)                      // 超时时长
      .headers({                            // Header
        platform: 3,
      })
      .enableLoading(false)                 // 是否开启Loading
      .addInterceptor(RequestInterceptor)   // 拦截器
      .enableLogInterceptor(true)           // 开启Log日志拦截器，默认关闭
      .enableTimeoutInterceptor(true)       // 开启请求超时拦截器，默认关闭
      .build();

      // setter
      // request.setBaseUrl("");
      // request.setHeaders({});
      // request.setTimeout(6666);
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
