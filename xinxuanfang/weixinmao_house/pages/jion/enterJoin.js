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

  upImg(){
    var th = this
    wx.chooseImage({
      success: function(res) {
        let file = res.tempFilePaths[0]
        f.doUpload({
          path: file,
          success: function (e) {
            console.log(e)
            if (e.data.data.path) {
              th.setData({
                curImg: e.data.data.path 
              });
            }
          },
          fail(err){
            console.log(err)
          }
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  chooseDepar(e) {
    console.log(e)
    this.setData({
      deparIndex: e.detail.value
    })
  },
  
  subForm(e) {
    var that = this
    e.detail.value.thumb = this.data.curImg
    f.util.request({
      url: 'entry/wxapp/Company',
      data: e.detail.value,
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:1500
        })
      }
    })
  },
});