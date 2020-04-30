var t = getApp(), app=t,$=app.$;

Page({
  data: {
    sq:{status:1},
    isuser:1,
    title: "私单人员",
    cpage:0,
  },toUrl:app.toUrl,
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad: function (t) {
    var a = this;
    wx.setNavigationBarTitle({
      title: "私单人员"
    }); app.setIntro();
    var e = app.getM();
    a.data.id = t.id;
    e ? (a.data.isuser = !0, a.oldhouseinit(t.id), a.setData({
      userinfo: e
    })) : a.data.isuser = !1, a.setData({
      isuser: a.data.isuser
    }), a.setData({
      isuser: a.data.isuser,
      companyinfo: wx.getStorageSync("companyinfo")
    });
  },
  oldhouseinit: function (id) {
    var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
    t.util.request({
      url: "entry/wxapp/Sidandetail",
      data: {
        id: id,
        sessionid: s.sessionid,
        uid: s.memberInfo.uid
      },
      success: function (t) {
        t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"),
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.data.data.intro.maincolor,
            animation: {
              duration: 400,
              timingFunc: "easeIn"
            }
          }), e.setData(t.data.data));
      },
      complete: function () {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
      }
    });
  },

  onReachBottom: function () {
    if (this.data.cpage < 0) return;
    this.data.cpage++;
    this.getCommentlist();
  },
  getCommentlist: function () {
    var e = this;
    if (e.data.cpage <=0) return;
    app.util.request({
      url: "entry/wxapp/Getsidancommentlist",
      data: {
        id: e.data.id,
        page: e.data.cpage,
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
  bindGetUserInfo: function (a) {
    var e = this;
    t.util.getUserInfo(function (t) {
      e.data.isuser = !0, e.setData({
        userinfo: t,
        isuser: e.data.isuser
      });
    }, a.detail);
  },
  toMessage: function (t) {
    wx.navigateTo({
      url: "apply"
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.oldhouseinit(this.data.id);
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
      path: "/weixinmao_house/pages/sidan/detail?id=" + this.data.id
    };
  },

  checkuser: function (a) {
    var e = this, a = a, s = wx.getStorageSync("userInfo");
    return console.log(s), s ? s.memberInfo.uid ? void t.util.request({
      url: "entry/wxapp/checkuserinfo",
      data: {
        sessionid: s.sessionid,
        uid: s.memberInfo.uid
      },
      success: function (t) {
        console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
      }
    }) : (t.util.getUserInfo(), !1) : (t.util.getUserInfo(function (t) {
      e.getlethousedetail();
    }), !1);
  }
});