import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import LoginApi from '../../services/LoginApi';
import './index.scss'
import { RequestFactory, RequestBuilder } from '../../new';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    LoginApi.logout();
  }

  init() {
    const request: RequestFactory = new RequestBuilder()
      .baseUrl("http://beta.genebox.cn/") // BaseUrl
      .timeOut(666666)                     // 超时时长
      .headers({                           // Header
        platform: 3,  
      })
      .addInterceptor(() => {})            // 拦截器
      .addInterceptor(() => {})
      .enableLogInterceptor(true)          // 开启Log日志拦截器，默认关闭
      .enableTimeoutInterceptor(true)      // 开启请求超时拦截器，默认关闭
      .build();

      // setter
      request.setBaseUrl("");
      request.setHeaders({});
      request.setTimeout(6666);
  }

  decrement = () => {
    // LoginApi.login('topicId=5433d5e4e737cbe96dcef312', {
    //   limit: 20
    // });
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  render () {
    const { counterStore: { counter } } = this.props.store
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index
