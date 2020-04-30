var p = { data: { upimgs:[]}},app=getApp(),$=app.$;
p.toUrl=function(e){
  app.toUrl(e);
}
p.bindUploads = function (e) {
  var l = e.currentTarget.dataset.idx||9;
  var th = this;
  var fun=function(list){
    if (list.length<=0)return;
    var i = th.data.upimgs.length, p = list.shift();
      app.doUpload({
        path: p,
        showLoading:list.length,
        success: function (e) {
          if (e.data.data.path) {
            th.data.upimgs.push({ p: p, s: e.data.data.path });
            th.setData({
              ['upimgs.[' + i + ']']: { p: p, s: e.data.data.path }
            });
          }
          if (list.length > 0) fun(list);
        }
    });
  }
  wx.chooseImage({
    count: l - th.data.upimgs.length,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      var p = res.tempFilePaths[0];
      fun(res.tempFilePaths);
    }
  })
}
p.bindUpload= function (e) {
  var i = e.currentTarget.dataset.idx;
  var th = this;
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      var p = res.tempFilePaths[0];
      app.doUpload({
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
}
p.bindDelete= function (e) {
  var i = e.currentTarget.dataset.idx;
  var file = this.data.upimgs || [];
  var f = (file[i] || {}).s;
  this.data.upimgs.splice(i, 1);
  this.data.upimgs.push([]);
  this.setData({
    upimgs: this.data.upimgs
  });
  app.delUpload({ data: { 'file': f } });
}
p.delUpImgs= function () {
    var file = this.data.upimgs || [];
    var f = [];
    for (var i in file) {
      file[i].s ? f.push(file[i].s) : '';
    }
    app.delUpload({ data: { 'file': f.toString() } });
}
p.clearImgs=function(t,s){
  if (!t || !$.isObj(t) || (!t.data.errno && t.data.errno != undefined)) {
    for (var i in this.data.upimgs) {
      this.data.upimgs[i] = [];
    }
  }
  if (!s||!t) {
    this.setData({ upimgs: this.data.upimgs});
  }
}
p.onUnload =function(){
  this.delUpImgs();
}
p.setPage=function(e){
  if (e.pagetitle) {
    wx.setNavigationBarTitle({
      title: e.pagetitle,
    });
  }
  app.setIntro(e.intro || '');
}
p.bindCancell=function(){
  $.toUrl('back:');
}
p.bindGetUserInfo= function(call) {
    var o = this,e=app;
    e.util.getUserInfo(function (a) {
      a.wxInfo = a.wxInfo || a.memberInfo || {};
      var t = a.memberInfo.uid, n = a.wxInfo.nickName || a.wxInfo.nickname, s = a.wxInfo.avatarUrl || a.wxInfo.avatar;
      o.data.isuser = !0, o.setData({
        userinfo: a,
        isuser: o.data.isuser
      }), e.util.request({
        url: "entry/wxapp/Updateuserinfo",
        data: {
          uid: t,
          nickname: n,
          avatarUrl: s
        },
        success: function (t) {
          t.data.errno || (e.globalData.isuser = !0, o.setData({
            userinfo: a,
            isuser: o.data.isuser
          }));
          if ($.isFun(call)){
            call(t);
          }
        }
      });
    }, $.isFun(call)?{}:call.detail);
}

module.exports = p;