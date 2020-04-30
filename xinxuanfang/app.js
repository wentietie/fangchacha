var site = require("siteinfo.js"), $ = require("lib/util.js"), util = require("we7/resource/js/util.js");
App({
    onLaunch: function() {
    var t=this, n = wx.getStorageSync("userInfo")||{};
        if (!n && n.hasOwnProperty("memberInfo")){
          wx.removeStorageSync("userInfo");
        }
      wx.removeStorageSync("onimg");
      setTimeout(function(e){
        t.login();
      },1000);
    },
    onShow: function() {
        var o, n = this, t = wx.getStorageSync("userInfo");
         t && t.hasOwnProperty("wxInfo") ? (o = !0, n.globalData.userinfo = t) : o = !1, 
        this.globalData.isuser = o;
    },
    login:function(){
      var m = this.getM() || {}, p = this.$.getPages();
      if(!m.uid)return;
      this.util.request({
        url: "entry/wxapp/login",
        showLoading: false,
        hideLoading: false,
        data: {
          uid: m.uid,
          m:'weixinmao_house'
        },success:function(r){
          if (r && r.data && $.isObj(r.data) && r.data.data!==undefined && (!r.data.data || !r.data.data.uid)){
            wx.removeStorageSync("userInfo");
            p&&p.setData&&p.setData({ isuser: false });
          }
        }
       });
    },
    showAuth:function(){
      var p = this.$.getPages(), m = this.getM(), isuser =(m && m.uid)?true:false;
      if (!p.data._isuser && (p.data.isuser != isuser)) {
        p.setData({ isuser: isuser });
      }
    },
    onHide: function() {},
    onError: function(o) {},
    util: util,
    $: $,
    load: require,
    use:function(){},
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: []
    },
    getLocationInfo: function(o) {
        var n = this;
        this.globalData.locationInfo ? o(this.globalData.locationInfo) : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                n.globalData.locationInfo = t, o(n.globalData.locationInfo);
            },
            fail: function() {},
            complete: function() {}
        });
    },
    globalData: {
        userInfo: null,
        isuser: !1
    },
    siteInfo: site,
  doUpload: function (c) {
    var t=this;
    var s = t.util.geturl({
      url: "entry/wxapp/upload"
    });
    var i = this;
    wx.showToast({ icon: "loading", title: "正在上传", mask: true, duration: 5e6 });
    wx.uploadFile({
      url: s,
      filePath: c.path,
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        session_token: wx.getStorageSync("session_token")
      },
      success: function (t) {
        t.data = JSON.parse(t.data);
        if (t.data.errno || t.data.errno == undefined) {
          wx.hideToast();
          wx.showModal({ title: "提示", content: t.data.message || "上传失败", showCancel: !1 });
        } else{
          c.success && "function" == typeof c.success && c.success(t);
        }
      },
      fail: function (t) {
        wx.hideToast();
        wx.showModal({ title: "提示", content: "上传失败", showCancel: !1 });
      },
      complete: function () {
        c.showLoading?'':wx.hideToast();
      }
    });
  },
  delUpload:function(c){
    var t=this;
    if (!c || !c.data||!c.data.file)return;
    t.util.request({
      url: "entry/wxapp/deleteimg",
      data:c.data,
      showLoading:false
    });
  },
  setIntro:function(e,t){
    var cc = wx.getStorageSync("companyinfo")||{};
    if(this.$.isObj(e)){
      cc=this.$.extend(true,cc,e);
      wx.setStorageSync("companyinfo", cc);
    }
    if(t||e===true){
      return cc;
    }
    cc.maincolor = cc.maincolor || '#3274e5';
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: cc.maincolor || '#3274e5',
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
    return cc;
  },
  getM:function(){
    return (wx.getStorageSync("userInfo") || {}).memberInfo
  },
  toUrl: function (a) {
    var e = a.currentTarget.dataset.url||'';
    this.$.toUrl(e);
  },
  toAgent: function () {
    wx.navigateTo({
      url: "/weixinmao_house/pages/message/index"
    });
  },
});