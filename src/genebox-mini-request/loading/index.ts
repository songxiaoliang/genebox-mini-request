import Taro from '@tarojs/taro';

class LoadingManager {

  static routerMap = new Map<String, number>();

  static show() {
    const currentRoute = this.getCurrentPage();
    let currentShowCount = LoadingManager.routerMap.get(currentRoute);
    if(!currentShowCount) {
        currentShowCount = 1;
    } else {
        currentShowCount += 1;
    }
    LoadingManager.routerMap.set(currentRoute, currentShowCount);
    LoadingManager.handleLoading();
  }

  static hide() {
    const currentRoute = LoadingManager.getCurrentPage();
    let currentShowCount = LoadingManager.routerMap.get(currentRoute);
    if(currentShowCount) {
        currentShowCount -= 1;
        LoadingManager.routerMap.set(currentRoute, currentShowCount);
    }
    LoadingManager.handleLoading();
  }

  static getCurrentPage(): string {
    return Taro.getCurrentPages().slice(-1, 1)[0].route;
  }

  static handleLoading(): void {
    if(LoadingManager.routerMap[LoadingManager.getCurrentPage()] > 0) {
      Taro.showLoading();
    } else {
      Taro.hideLoading();
    }
  }
}

export default LoadingManager;
