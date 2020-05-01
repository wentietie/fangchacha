// weixinmao_house/pages/index/reportDetail/reportDetail.js
var f = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payDis: false,
    over:false,
    imgList: false,
    payList: [],
    overList:[],
    curInfo:[]
  },

  getDetail(id){
    var that = this
    f.util.request({
      url: 'entry/wxapp/ReserveDetail',
      data: {
        id: id
      },
      success(res) {
       that.setData({
         curInfo: res.data.data
       })
      }
    })
  },

  closeAdd(){
    this.setData({
      imgList: false,
      over: false,
      payDis: false
    })
  },

  addPayImg() { 
    this.setData({
      imgList: true,
      payDis: true
    })
  },
  addOverImg() { 
    this.setData({
      imgList: true,
      over: true
    })
  },
  addPay() { 
    var th = this
    if (this.data.payList.length == 10) {
      wx.showToast({
        title: '最多上传两张',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.chooseImage({
      success: function(res) {
        var p = res.tempFilePaths[0];
        t.doUpload({
          path: p,
          success: function (e) {
            if (e.data.data.path) {
              var payList = this.data.payList
              payList.push(e.data.data.path)
              th.setData({
                payList: payList
              });
            }
          }
        });
      },
    })
  },
  addOver(){
    var th = this
    if(this.data.overList.length == 2){
      wx.showToast({
        title: '最多上传两张',
        icon:'none',
        duration:1500
      })
      return
    }
    wx.chooseImage({
      success: function (res) {
        var p = res.tempFilePaths[0];
        t.doUpload({
          path: p,
          success: function (e) {
            if (e.data.data.path) {
              var overList = this.data.payList
              overList.push(e.data.data.path)
              th.setData({
                overList: overList
              });
            }
          }
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
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