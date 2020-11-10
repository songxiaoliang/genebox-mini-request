import Taro from '@tarojs/taro';

class LoadingManager {

  static routerMap = {};

  static show() {
    const currentRoute = this.getCurrentPage();
    if(LoadingManager.routerMap.hasOwnProperty(currentRoute)) {
      LoadingManager.routerMap[currentRoute] = 1;
    } else {
      LoadingManager.routerMap[currentRoute]++;
    }
    LoadingManager.handleLoading();
  }

  static hide() {
    const currentRoute = LoadingManager.getCurrentPage();
    if(LoadingManager.routerMap.hasOwnProperty(currentRoute)) {
      LoadingManager.routerMap[currentRoute]--;
    }
    LoadingManager.handleLoading();
  }

  static getCurrentPage() {
    return Taro.getCurrentPages().slice(-1, 1).route;
  }

  static handleLoading() {
    if(LoadingManager.routerMap[LoadingManager.getCurrentPage()] > 0) {
      Taro.showLoading();
    } else {
      Taro.hideLoading();
    }
  }
}

export default LoadingManager;
