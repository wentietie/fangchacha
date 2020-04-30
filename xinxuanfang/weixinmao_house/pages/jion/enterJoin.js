var f = getApp()

Page({
  data: {
    depList: [
      '法人',
      '股东',
      '经理'
    ],
    deparIndex: 0,
    curImg:'../../resource/images/pub.png'
  },

  chooseDepar(e) {
    console.log(e)
    this.setData({
      deparIndex: e.detail.value
    })
  },
  
  subForm(e) {
    var that = this
    f.util.request({
      url: 'entry/wxapp/Company',
      data: e.detail.value,
      success(res) {
        console.log(res.data)
        file = res.tempFilePaths[0]
      }
    })
  },
});