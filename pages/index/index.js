const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    STATUS_BAR_HEIGHT: app.globalData.STATUS_BAR_HEIGHT,
    CUSTOM_BAR_HEIGHT: app.globalData.CUSTOM_BAR_HEIGHT,
    dialogContent: "",
    currentMenuItemIndex: 1,
    stuNumber: "",
    menuItems: [
      {
        text: "个人信息",
        icon: "icon-account",
        color: "#F3A3A6"
      },
      {
        text: "了解小报",
        icon: "icon-collage",
        color: "#7AA4F4",
        content: "了解小报"
      },
      {
        text: "关于小程序",
        icon: "icon-information",
        color: "#61D1CB",
        content: "关于小程序"
      }
    ]
  },

  onOkTap() {
    this.setData({ visible: false });
  },

  onCardTap() {
    wx.navigateTo({
      url: '/pages/post/post',
    })
  },

  onMenuItemTap(event) {
    this.setData({ currentMenuItemIndex: event.detail, visible: true });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const stuNumber = wx.getStorageSync('stuNumber') || "";
    this.setData({ stuNumber });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})