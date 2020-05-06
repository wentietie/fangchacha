var f = getApp()

Page({
  data: {
    depList: [
      '法人',
      '股东',
      '经理'
    ],
    deparIndex: 0,
    curImg: '../../../resource/images/pub.png',
    curTab:0,
    depList_e: [
      '法人',
      '股东',
      '经理'
    ],
    deparIndex_e: 0,
    typeList_e: [
      '公寓',
      '商铺',
      '二手房'
    ],
    typeIndex_e: 0,
    curImg_e: '../../../resource/images/pub.png'
  },

  chooseTab(e){
    console.log(e)
    this.setData({
      curTab: e.currentTarget.dataset.i
    })
  },

  chooseDepar(e) {
    console.log(e)
    this.setData({
      deparIndex: e.detail.value
    })
  },
  subForm_e(e) {
    var that = this
    if (this.data.curImg_e == '../../../resource/images/pub.png') {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none',
        duration: 1500
      })
      return
    }
    e.detail.value.thumb = this.data.curImg_e
    for (let input in e.detail.value) {
      if (input == 'check') {
        if (e.detail.value['check'].length == 0) {
          wx.showToast({
            title: '请勾选同意入驻规则',
            icon: 'none',
            duration: 1500
          })
          return
        }
      } else {
        if (e.detail.value[input] == '') {
          wx.showToast({
            title: '表单填写不完整',
            icon: 'none',
            duration: 1500
          })
          return
        }
      }

    }
    f.util.request({
      url: 'entry/wxapp/Company',
      data: e.detail.value,
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  chooseType_e(e) {
    this.setData({
      typeIndex_e: e.detail.value
    })
  },

  upImg_e() {
    var th = this
    wx.chooseImage({
      success: function (res) {
        let file = res.tempFilePaths[0]
        f.doUpload({
          path: file,
          success: function (e) {
            console.log(e)
            if (e.data.data.path) {
              th.setData({
                curImg_e: e.data.data.path
              });
            }
          },
          fail(err) {
            console.log(err)
          }
        });
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  chooseDepar_e(e) {
    console.log(e)
    this.setData({
      deparIndex_e: e.detail.value
    })
  },


  subForm(e) {
    var that = this
    if (this.data.curImg == '../../../resource/images/pub.png') {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none',
        duration: 1500
      })
      return
    }
    e.detail.value.thumb = this.data.curImg
    for (let input in e.detail.value) {
      if (input == 'check') {
        if (e.detail.value['check'].length == 0) {
          wx.showToast({
            title: '请勾选同意入驻规则',
            icon: 'none',
            duration: 1500
          })
          return
        }
      } else {
        if (e.detail.value[input] == '') {
          wx.showToast({
            title: '表单填写不完整',
            icon: 'none',
            duration: 1500
          })
          return
        }
      }

    }
    f.util.request({
      url: 'entry/wxapp/Company',
      data: e.detail.value,
      success(res) {
        console.log(res.data)
      }
    })
  },
  addImg(){
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        file = res.tempFilePaths[0]
      },
    })
  }
});
