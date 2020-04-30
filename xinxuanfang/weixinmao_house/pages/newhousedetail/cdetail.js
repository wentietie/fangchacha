var app=getApp(),$=app.$;
$.Page({
  data:{
    cpage:0,
    _page:'index'
  },
  onLoad(e){
    var t = this;
    app.setIntro();
    if ($.isObj(e)) {
      this.data.id = e.id || 0;
      this.data._page = e._page || this.data._page;
    }
    var ee = app.getM();
    ee ? (t.data.isuser = !0, t.setData({
      user: ee
    })) : t.data.isuser = !1, t.setData({
      isuser: t.data.isuser,
      _page: this.data._page
    });
    this.get_list();
  },
  get_list(){
    var i = app, t = this;
    var ee = app.getM();
    i.util.request({
      url: "entry/wxapp/getcommentdetail",
      data: {
        id: t.data.id,
        fuid: t.data.fuid || 0,
        uid: ee.uid || 0,
        _page: t.data._page || 'index'
      },
      success: function (a) {
        a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"),
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.data.data.intro.maincolor,
            animation: {
              duration: 400,
              timingFunc: "easeIn"
            }
          }),wx.setNavigationBarTitle({
            title: a.data.data.intro.name
          }), t.setData({
            intro: a.data.data.intro,
            item: a.data.data.list || [],
            commentlist: a.data.data.commentlist || [],
            commenttotal: a.data.data.commenttotal || 0,
            cpage: a.data.data.cpage || 0
          }));
      },
      complete: function () {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
      }
    });
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(), this.onLoad();
  },
  onReachBottom: function () {
    if (this.data.cpage < 0) return;
    this.data.cpage++;
    this.getCommentlist();
  },
  getCommentlist: function () {
    var e = this,i=app;
    if (e.data.cpage <= 0) return;
    if (e.data.cpage==1)return this.get_list();
    i.util.request({
      url: "entry/wxapp/Getcommentlist",
      data: {
        id: e.data.item.hid,
        pid:e.data.id,
        page: e.data.cpage,
        type: e.data.item.ctype
      },
      success: function (t) {
        t.data.errno || $.append(e, 'commentlist', t.data.data, e.data.cpage);
        !t.data.data || t.data.data.length <= 0 ? e.data.cpage = -1 : '';
      },
      complete: function () {
        e.setData({
          loadMore: ""
        });
      }
    });
  },
  toAgent: app.toAgent
});