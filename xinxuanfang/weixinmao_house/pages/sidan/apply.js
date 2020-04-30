var t = getApp(),app=t;

Page({
  data: {
  },
  bindCancell: function () {
    wx.navigateBack({
      delta:1
    });
  },toUrl:app.toUrl,
  onLoad: function () {
    var a = this;
    wx.setNavigationBarTitle({
      title: "私单申请"
    }); t.setIntro();
    var e = wx.getStorageSync("userInfo");
    e ? (a.data.isuser = !0, a.oldhouseinit(), a.setData({
      userinfo: e
    })) : a.data.isuser = !1, a.setData({
      isuser: a.data.isuser
    }), a.setData({
      isuser: a.data.isuser,
      companyinfo: wx.getStorageSync("companyinfo")
    });
  },
  savepubinfo: function (a) {
    var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
    if (e.data.loadding) {
      return;
    }
    var d = {
      cityid: i.id,
      sessionid: s.sessionid,
      method: 'post',
      uid: s.memberInfo.uid,
      op: 'post'
    };
    for(var i in a.detail.value){
      d['d['+i+']']=a.detail.value[i];
    }
    e.data.loadding = true;
    wx.showLoading({ mask: true });
    t.util.request({
      url: "entry/wxapp/Sidansq",
      data: d,
      success: function (t) {
        wx.hideLoading();
        wx.showModal({
          title:'',
          content:t.data.message
        });
        if (!t.data.errno) {
          e.setData({ sq: a.detail.value });
        }
      }, complete: function () {
        e.data.loadding = false;
      }
    });
  },
  oldhouseinit: function (a) {
    var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
    t.util.request({
      url: "entry/wxapp/Sidansq",
      data: {
        cityid: i.id,
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
      }
    });
  },
  bindGetUserInfo: function (a) {
    var e = this;
    t.util.getUserInfo(function (t) {
      console.log(t), e.data.isuser = !0, e.setData({
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
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

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