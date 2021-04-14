import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import LoginApi from '../../services/LoginApi';
import './index.scss'
import { RequestFactory } from '../../genebox-mini-request';
import RequestTaskManager from '@/genebox-mini-request/request/RequestTaskManager';

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

  componentDidHide () {
    RequestTaskManager.abortRequest({ url: ''});
  }

  increment = () => {
    LoginApi.logout();
  }

  decrement = () => {
    LoginApi.login('topicId=5433d5e4e737cbe96dcef312', {
      limit: 20
    });
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
