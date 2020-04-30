var app=getApp(),$=app.$;
$.Page({
  data:{
    list:[],
    taps: [],
    showtype:'tap_0',
    page:0
  },
  onLoad:function (e) {
    app.setIntro(), this.get_list();
  },
  get_list:function(){
    var t=app.getM()||{},th=this;
    app.util.request({
      url: "entry/wxapp/getMsgList",
      data: {
        uid: (t || {}).uid,
        type: th.data.showtype||1,
        page:th.data.page
      },
      success: function(e){
        if(e.data.data){
          th.data.page > 1 ? $.append(th, 'list', e.data.data.list, th.data.page):th.setData(e.data.data);
          e.data.data.list.length<=0?th.data.page=-1:'';
        }
      },
      complete:function(){
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
      }
    });
  },
  toUrl: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var i = this.data.list[idx];
    this.msgread(idx, i); wx.hideNavigationBarLoading();
    app.toUrl(e);
  },
  msgread:function(idx,i){
    var t = app.getM() || {}, th = this;
    if(i.isread)return;
    var d = { ['list[' + idx + '].isread']: true };
    for (var ii in this.data.taps){
      if(this.data.taps[ii].key==this.data.showtype){
        d['taps[' + ii + '].tips'] = Math.max(0, this.data.taps[ii].tips-1);
      }
    }
    try {
      var p = $.getPages(-1);
      if (p.route =='weixinmao_house/pages/user/index'
        && p&&p.data && p.data.menu
      ){
        for (var ii in p.data.menu){
          if (p.data.menu[ii].key=='msg'){
            p.setData({ ['menu[' + ii + '].tips']: Math.max(0, p.data.menu[ii].tips - 1)});
          }
        }
      }
    }catch(e){}

    this.setData(d);
    app.util.request({
      url: "entry/wxapp/MsgRead",
      showLoading:false,
      data:{
        id:i.id,
        uid:t.uid
      }
    });
  },
  changeclamp:function(e){
    var idx = e.currentTarget.dataset.idx;
    var i=this.data.list[idx];
    this.setData({ ['list[' + idx + '].nclamp']: !i.nclamp});
    this.msgread(idx,i);
  },
  bindshowtype: function (e) {
    var type = e.currentTarget.dataset.type;
    if(type==this.data.showtype)return;
    this.setData({
      showtype: type
    }), this.data.page = 0, this.get_list();
  },
  onReachBottom:function(){
    if(this.data.page<1)return;
    this.data.page++ , this.get_list();
  },
  onPullDownRefresh:function(){
    this.get_list();
  }
});