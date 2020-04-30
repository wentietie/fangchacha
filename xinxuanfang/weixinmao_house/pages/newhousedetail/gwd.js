var app = getApp(), $ = app.$, json = $.extend(true, {}, app.load('/lib/page.js'));
json.data._page='index';
json.data.vidx=-1;
json.onLoad = function (e) {
  var t=this;
  app.setIntro();
  if($.isObj(e)){
    this.data.id=e.id||0;
    this.data._page=e._page||this.data._page;
    this.data.fuid=e.fuid||0;
  }
  var ee = app.getM();
  ee ? (t.data.isuser = !0, t.setData({
    user: ee
  })) : t.data.isuser = !1, t.setData({
    isuser: t.data.isuser,
    _page:this.data._page
  });
  this.get_list();
}
json.get_list=function(){
  var t = this,m=app.getM()||{};
 app.util.request({
    url: "entry/wxapp/Getplatdetail",
    data: {
      id: t.data.id || '',
      uid: m.uid||0,
      fuid:t.data.fuid||0
    },
    success: function (a) {
      t.setData(a.data.data);
      t.setPage(a.data.data);
      wx.setNavigationBarTitle({
        title: a.data.data.pagetitle
      });
    },
    complete: function () {
      wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    }
  });
}
json.onShareAppMessage=function() {
    var i = this.data.item, m = app.getM() || {},uid=m.uid;
    if(this.data.fuid>0&&uid!=i.uid){
      uid=this.data.fuid;
    }
    //(i.name || i.platform) + "-" + wx.getStorageSync("companyinfo").name
    var title='我是【'+i.housename+'】'+(i.type=='sale'?'驻场':'顾问')+'，欢迎咨询';
    return {
      title:title ,
      path: "/" + this.route + "?id=" + i.id + '&fuid=' + (uid || 0)+'&_page='+(this.data._page||'')
    };
}
json.bindzan= function(e) {
    var t = this, d = e.currentTarget.dataset, u = app.getM()||{};
    if (t.data.loadding) {
      return;
    }
    t.data.loadding = true;
    app.util.request({
      url: "entry/wxapp/plat_zan",
      data: {
        id: d.data.id,
        uid: u.uid|| 0,
        type: d.type
      },
      showLoading:false,
      success: function (a) {
        if (!a.data.data)return;
        t.setData({ item: $.extend(t.data.item, a.data.data)});
      }, complete: function () {
        t.data.loadding = false;
      }
    });
}
json.showvideo=function(e){
  var idx=e.currentTarget.dataset.idx;
  this.setData({
    vidx:idx
  });
}
json.toAgent=app.toAgent;
Page(json);