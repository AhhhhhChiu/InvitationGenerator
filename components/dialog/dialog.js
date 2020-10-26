// pages/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuItem: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    stuNumber: {
      type: [Number, String],
      default: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animated: "fadeInUp"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOkTap() {
      this.setData({ animated: 'fadeOutDown' });
      setTimeout(() => {
        this.triggerEvent('onOkTap');
        this.setData({ animated: 'fadeInUp' });
      }, 400);
    },
    onPreviewTap() {
      wx.previewImage({
        urls: ['https://ahchiu.oss-cn-shenzhen.aliyuncs.com/myzhbit/QRCode.jpg']
      });
    }
  }
})