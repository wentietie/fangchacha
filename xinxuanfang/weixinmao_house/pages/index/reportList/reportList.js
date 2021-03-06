// weixinmao_house/pages/index/reportList/reportList.js
var  f = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repostList:[],
    pageIndex:0,
    pageSize:'10'
  },

  getDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/weixinmao_house/pages/index/reportDetail/reportDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  getList(){
    var that = this
    f.util.request({
      url: 'entry/wxapp/ReserveList',
      data:{
        page:this.data.pageIndex,
        psize: this.data.pageSize
      },
      success(res) {
        that.setData({
          repostList: res.data.data.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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