const getDeviceCustomBarHeight = require("./utils/util.js").getDeviceCustomBarHeight;
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.STATUS_BAR_HEIGHT = res.statusBarHeight;
        this.globalData.CUSTOM_BAR_HEIGHT = getDeviceCustomBarHeight(res.system).height;
      }
    })
  },
  globalData: {
    userInfo: null
  }
})