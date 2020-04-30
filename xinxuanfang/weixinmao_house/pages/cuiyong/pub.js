var t = getApp(),app=t;

Page({
  data: {
    sq: { status: 1 },
    isuser: !0
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },toUrl:app.toUrl,
  onLoad: function () {
    var a = this;
    wx.setNavigationBarTitle({
      title: "追佣发布"
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
    for (var i in a.detail.value) {
      d['d[' + i + ']'] = a.detail.value[i].toString();
    }
    e.data.loadding=true;
    wx.showLoading({mask:true});
    t.util.request({
      url: "entry/wxapp/cuiyongdetail",
      data: d,
      success: function (t) {
        wx.hideLoading();
        wx.showModal({
          title: '',
          content: t.data.message
        });
        if (!t.data.errno && t.data.errno != undefined) {
          for (var i in e.data.upimgs) {
            e.data.upimgs[i] = [];
          }
          e.setData({
            upimgs: e.data.upimgs
          });
        }
      }
      ,complete: function () {
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
        uid: s.memberInfo.uid,
        pubtype: 'cuiyong'
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
          }), e.setData({
          arealist: t.data.data.arealist,
          intro: t.data.data.intro,
          upimgs: t.data.data.upimgs
          }));
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
  bindPickerChange: function (e) {
    var d = e.currentTarget.dataset;
    this.setData({
      [d.item]: d.data[e.detail.value]
    });
  },
  bindDateChange: function (e) {
    var d = e.currentTarget.dataset;
    this.setData({
      [d.item]: e.detail.value
    });
  },
  bindUpload: function (e) {
    var i = e.currentTarget.dataset.idx;
    var th = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var p = res.tempFilePaths[0];
        t.doUpload({
          path: p,
          success: function (e) {
            if (e.data.data.path) {
              th.setData({
                ['upimgs.[' + i + ']']: { p: p, s: e.data.data.path }
              });
            }
          }
        });
      }
    })
  },
  bindDelete: function (e) {
    var i = e.currentTarget.dataset.idx;
    var file = this.data.upimgs || [];
    var f = (file[i] || {}).s;
    this.data.upimgs.splice(i, 1);
    this.data.upimgs.push([]);
    this.setData({
      upimgs: this.data.upimgs
    });
    t.delUpload({ data: { 'file': f } });
  },
  toMessage: function (t) {
    wx.navigateTo({
      url: "apply"
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () {
    var file = this.data.upimgs || [];
    var f = [];
    for (var i in file) {
      file[i].s ? f.push(file[i].s) : '';
    }
    t.delUpload({ data: { 'file': f.toString() } });
   },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(), this.onLoad();
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