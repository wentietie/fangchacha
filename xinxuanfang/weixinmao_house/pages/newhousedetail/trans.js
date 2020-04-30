var app=getApp(),$=app.$;
$.Page({
  data:{
    upimgs:[],
    selectplat:''
  },
  onLoad(e){
    if($.isObj(e)){
      this.id=e.id;
    }
    app.setIntro();
    app.showAuth();
    this.getData();
  },
  gethouse: function (a) {
    var plat = this.data.selectplat || '';
    $.toUrl('../jion/select?fromtype=' + plat);
  },
  setPlat: function (a) {
    var v = a.currentTarget.dataset.value;
    if (v != this.data.selectplat) {
      this.setData({ selectHouse: false, selectplat:v });
    }
  },
  getData:function(){
    var t = this; 
    var m = app.getM() || {};
    app.util.request({
      url: "entry/wxapp/trans",
      data:{
        uid:m.uid||0,
        op:'init',
        houseid:this.id
      },
      success(r){
        t.setData(r.data.data);
        t.setPage(r.data.data);
      }
    });
  }, 
  savepubinfo: function (a) {
    var e = this,msg, s = app.getM()||{};
    if (e.data.loadding) {
      return;
    }
    var d = {
      uid: s.uid,
      op: 'post',
    };
    delete a.detail.value.doagree
    var idesc=true;
    for (var i in a.detail.value) {
      d['d[' + i + ']'] = a.detail.value[i].toString().trim();
      if (idesc&&i.indexOf('f]')==0){
        idesc = d['d[' + i + ']']?false:idesc;
      }
    }
    if (idesc&&!d['d[desc]'] && !d['d[imgs]']) {
      msg = '请输入纠错信息';
    }
    if (!d['d[tel]']) {
      msg = '请输入联系方式';
    }
    if (!d['d[name]']) {
      msg = '请输入联系人姓名';
    }
    if(!d['d[houseid]']){
      msg='请选择纠错楼盘';
    }
    if (msg){
      return $.alert(msg);
    }
    e.data.loadding = true;
    wx.showLoading({ mask: true });
    app.util.request({
      url: "entry/wxapp/trans",
      data: d,
      success: function (t) {
        $.alert(t.data.message, function () {            
            if (!t.data.errno && t.data.errno != undefined) {
              e.data.upimgs=[];
              e.setData({
                upimgs: e.data.upimgs
              });
            } 
            wx.navigateBack();
          });
      }, complete: function () {
        wx.hideLoading(),e.data.loadding = false;
      }
    });
  },
  bindDelete(e) {
    var i = e.currentTarget.dataset.idx;
    var file = this.data.upimgs || [];
    var f = (file[i] || {}).s;
    this.data.upimgs.splice(i, 1);
    // this.data.upimgs.push([]);
    this.setData({
      upimgs: this.data.upimgs
    });
    app.delUpload({ data: { 'file': f } });
  },
  bindPickerChange: function (e) {
    var d = e.currentTarget.dataset;
    this.setData({
      [d.item]: d.data[e.detail.value]
    });
  }
});