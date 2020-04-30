var a = getApp(), app = a, $ = app.$, p = a.$.loadPage();

Page({
  data: {
    flag: 0,
    noteMaxLen: 300,
    info: "",
    noteNowLen: 0,
    score: 0,
    id: 0,
  },
  bindGetUserInfo: p.bindGetUserInfo,
  bindCancell: p.bindCancell,
  onLoad: function (t) {
    var o = this;
    if (t && t.id > 0) {
      this.data.id = t.id || 0;
      this.data.pid = t.pid || 0;
      this.data.fuid = t.fuid || 0;
    }
    app.showAuth();
     a.util.request({
      url: "entry/wxapp/GetSysInit",
      data: {},
      success: function (a) {
        a.data.message.errno || (wx.setStorageSync("companyinfo", a.data.data.intro), wx.setNavigationBarTitle({
          title: wx.getStorageSync("companyinfo").name
        }), a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"),
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.data.data.intro.maincolor,
            animation: {
              duration: 400,
              timingFunc: "easeIn"
            }
          }), o.setData({
            intro: a.data.data.intro
          }));
      },
      complete: function () {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
      }
    });
  },
  bindTextAreaChange: function (a) {
    var t = this, o = a.detail.value, n = parseInt(o.length);
    n > t.data.noteMaxLen || t.setData({
      info: o,
      noteNowLen: n
    });
  },
  bindSubmit: function (t) {
    var o = this, n = o.data.score, e = t.detail.value.content, i = o.data.id || 0, s = wx.getStorageSync("userInfo");
    if ("" != e) {
      var r = {
        sessionid: s.sessionid,
        uid: s.memberInfo.uid,
        pid: o.data.pid || 0,
        fuid: o.data.fuid || 0,
        type: "newhouse",
        houseid: i,
        score: n,
        content: e
      };
      a.util.request({
        url: "entry/wxapp/savecomment",
        data: r,
        success: function (a) {
          if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
            title: "失败",
            content: a.data.data.msg,
            showCancel: !1
          });
          wx.showToast({
            title: "发布成功",
            icon: "success",
            duration: 1500,
            mask: !1,
            success: function () {
              o.setData({
                info: "",
                noteNowLen: 0,
                flag: 0
              });
              try {
                var p = $.getPages(-1) || {};
                if ($.isFun(p.getCommentlist)) {
                  p.cpage = 1, p.getCommentlist();
                }
              } catch (e) { };
              wx.navigateBack();
            }
          });
        }
      });
    } else wx.showModal({
      title: "提示",
      content: "请输入评论内容",
      showCancel: !1
    });
  },
  changeColor1: function () {
    var a = this;
    a.data.score = 2, a.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var a = this;
    a.data.score = 4, a.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var a = this;
    a.data.score = 6, a.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var a = this;
    a.data.score = 8, a.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var a = this;
    a.data.score = 10, a.setData({
      flag: 5
    });
  }
});