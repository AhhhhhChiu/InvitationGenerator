const QR = require('../../utils/wxqrcode.js');
const app = getApp();

Page({
  data: {
    STATUS_BAR_HEIGHT: app.globalData.STATUS_BAR_HEIGHT,
    CUSTOM_BAR_HEIGHT: app.globalData.CUSTOM_BAR_HEIGHT,
    TOP: parseInt(app.globalData.STATUS_BAR_HEIGHT) + parseInt(app.globalData.CUSTOM_BAR_HEIGHT),
    text: '',
    qrcode: '',
    canvasImagePath: "",
    stuNumber: '',
  },
  onLoad() {
    const stuNumber = wx.getStorageSync('stuNumber') || "";
    this.setData({
      stuNumber
    });
    if (stuNumber) {
      this.createCanvasBefore();
    }
  },
  onBackTap() {
    wx.navigateBack({
      complete: (res) => { },
    })
  },
  createCanvasBefore() {
    // TODO: canvas有坑 第一次生成出来的是空的
    this.createCanvas(false);
    setTimeout(() => {
      this.createCanvas(true);
    });
  },
  createCanvas(isShowToast) {
    const that = this;
    const stuNumber = that.data.stuNumber;
    if (!stuNumber) {
      wx.showToast({
        title: '请输入学号',
        duration: 800,
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '生成中',
    })
    const qrcode = QR.createQrCodeImg(stuNumber, { size: 300 });
    const ctx = wx.createCanvasContext('postCanvas');
    this.getBackgroundImage().then(path => {
      ctx.drawImage(path, 0, 0, 640, 1008);
      ctx.restore();
      that.base64ToFilePath(qrcode).then((qrcodeImg) => {
        ctx.drawImage(qrcodeImg, 270, 865, 95, 95);
        ctx.save();
        ctx.draw(false, this.saveToPhotosAlbum(isShowToast));
      })
    })
  },
  stuNumberInput(event) {
    this.setData({
      stuNumber: event.detail.value
    })
  },
  onPreviewTap() {
    wx.previewImage({
      urls: [this.data.canvasImagePath],
    })
  },
  getBackgroundImage() {
    return new Promise((resolve) => {
      wx.getImageInfo({
        src: 'https://ahchiu.oss-cn-shenzhen.aliyuncs.com/myzhbit/post.jpg',
        success(res) {
          resolve(res.path);
        }
      })
    })
  },
  saveToPhotosAlbum(isShowToast ) {
    const that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 640,
      height: 1008,
      destWidth: 640,
      destHeight: 1008,
      canvasId: 'postCanvas',
      success(res) {
        wx.hideLoading({
          complete: () => {
            wx.setStorage({
              data: that.data.stuNumber,
              key: 'stuNumber',
            });
            that.setData({
              canvasImagePath: res.tempFilePath
            });
            if (isShowToast) {
              wx.showModal({
                showCancel: false,
                content: "生成邀请函成功, 请保存到本地~"
              })
            }
          },
        })
      }
    }, that)
  },
  base64ToFilePath(code) {
    return new Promise(resolve => {
      const fs = wx.getFileSystemManager();
      const times = new Date().getTime();
      const codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
      fs.writeFile({
        filePath: codeimg,
        data: code.slice(22),
        encoding: 'base64',
        success: () => {
          resolve(codeimg);
        }
      });
    })
  }
}); 