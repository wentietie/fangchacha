var app = getApp(), $ = app.$, json = $.loadPage();
json.data = {
  flag: 0,
  noteMaxLen: 300,
  info: "",
  noteNowLen: 0,
  score: 0,
  id: 0,
}
json.onLoad = function (e) {
  if (e && e.id > 0) {
    this.data.id = e.id || 0;
    this.data.pid = e.pid || 0;
    this.data.fuid = e.fuid || 0;
  }
  app.showAuth();
  var intro = app.setIntro() || {};
  wx.setNavigationBarTitle({
    title: intro.name,
  });
}
json.bindTextAreaChange = function (a) {
  var t = this, o = a.detail.value, n = parseInt(o.length);
  n > t.data.noteMaxLen || t.setData({
    info: o,
    noteNowLen: n
  });
}
json.bindSubmit = function (t) {
  var o = this, n = o.data.score, e = t.detail.value.content, i = o.data.id || 0, s = app.getM() || {};
  if (e == '') {
    wx.showModal({
      title: "提示",
      content: "请输入评论内容",
      showCancel: !1
    });
    return;
  }
  var r = {
    uid: s.uid || 0,
    pid: o.data.pid || 0,
    fuid: o.data.fuid || 0,
    type: "cuiyong",
    fid: i,
    score: n,
    content: e
  };
  app.util.request({
    url: "entry/wxapp/Savecuiyongcomment",
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
};

json.setstars = function (e) {
  var a = this, i = e.currentTarget.dataset.i || 0;
  a.data.score = i, a.setData({
    flag: i
  });
}
Page(json)