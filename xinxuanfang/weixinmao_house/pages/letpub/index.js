var t = getApp(),app=t;

Page({
  data: {
    ismaster: 1
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad: function (t) {
    var a = this;
    if (t) {
      a.data.pubtype = t.pubtype;
    } app.setIntro();
    wx.setNavigationBarTitle({
      title: "发布租售-" + wx.getStorageSync("companyinfo").name
    });
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
  oldhouseinit: function (a) {
    var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
    t.util.request({
      url: "entry/wxapp/Getpubinit",
      data: {
        cityid: i.id,
        sessionid: s.sessionid,
        uid: s.memberInfo.uid,
        pubtype:'let'
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
          }), 0 == t.data.data.ismaster && (e.data.ismaster = !1, e.setData({
            ismaster: e.data.ismaster
          })), e.data.buildareainfo = t.data.data.buildareainfo, e.setData(t.data.data));

        if (t.data.data.intro.tips) {
          wx.showModal({
            title: '早报',
            content: t.data.data.intro.tips,
            showCancel: false
          })
        }
      }
    }), t.getLocationInfo(function (t) {
      e.setData({
        longitude: t.longitude,
        latitude: t.latitude,
        markers: [{
          id: 0,
          iconPath: "../../resource/images/marker_checked.png",
          longitude: t.longitude,
          latitude: t.latitude,
          width: 30,
          height: 30
        }]
      });
    }), wx.getSystemInfo({
      success: function (t) {
        e.setData({
          map_width: t.windowWidth,
          map_height: t.windowWidth,
          controls: [{
            id: 1,
            iconPath: "../../resource/images/marker_checked.png",
            position: {
              left: t.windowWidth / 2 - 8,
              top: t.windowWidth / 2 - 16,
              width: 30,
              height: 30
            },
            clickable: !0
          }]
        });
      }
    });
  },
  bindPickerChange: function (e) {
    var d = e.currentTarget.dataset;
    this.setData({
      [d.item]: d.data[e.detail.value]
    });
  },
  bindGetUserInfo: function (a) {
    var e = this;
    t.util.getUserInfo(function (t) {
      console.log(t), e.data.isuser = !0, e.setData({
        userinfo: t,
        isuser: e.data.isuser
      }), e.oldhouseinit();
    }, a.detail);
  },
  toMessage: function (t) {
    app.toAgent();
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
      op: 'post',
      'd[cityid]': i.id,
    };
    if (!a.detail.value.doagree.length) {
      wx.showModal({
        title: '',
        content: '请同意房屋委托协议'
      });
      return;
    }
    delete a.detail.value.doagree
    for (var i in a.detail.value) {
      d['d[' + i + ']'] = a.detail.value[i].toString();
    }
    e.data.loadding = true;
    wx.showLoading({ mask: true });
    t.util.request({
      url: "entry/wxapp/saveletpubinfo",
      data: d,
      success: function (t) {
        wx.hideLoading();
        wx.showModal({
          title: '',
          content: t.data.message,
          showCancel: false,
          success: function () {
            wx.navigateBack({delta: 1});
          }
        });
      }, complete: function () {
        e.data.loadding = false;
      }
    });
  },
  bindMap: function () {
    var t = this;
    wx.chooseLocation({
      success: function (r) {
        t.setData({ map: r });
      }
    });
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
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