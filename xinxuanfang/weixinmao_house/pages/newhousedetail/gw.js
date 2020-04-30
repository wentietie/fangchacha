function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../resource/wxParse/wxParse.js"), i = getApp(),app=i,$=app.$;

Page(a({
    data: (t = {
        images: {},
        autoplay: !0,
        interval: 3e3,
        isuser:1,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0,
        page:1
    }, a(t, "title", ""), a(t, "hdimg", []), a(t, "circular", !0), a(t, "indicatorDots", !1), 
    a(t, "indicatorcolor", "#000"), a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), 
    a(t, "current", 0), t),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (i = a.detail.height);
        console.log(t, i);
        var i = 750 / e, n = this.data.imgheights;
        n.push(i), this.setData({
            imgheights: n
        });
  },
  toUrl: i.toUrl,
  toAgent: i.toAgent,
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
    bindchange: function(a) {
        this.setData({
            current: a.detail.current
        });
    },
    bindzan:function(e){
      var t = this, d = e.currentTarget.dataset, m = app.getM() || {};;
      if (t.data.loadding){
        return;
      }
      t.data.loadding=true;
      i.util.request({
        url: "entry/wxapp/plat_zan",
        data: {
          id: d.data.id,
          uid: m.uid ? m.uid : 0,
          type:d.type
        },
        success: function (a) {
           var dd=t.data.data.plat[d.data.type];
          if (a.data.data && a.data.data.id){
             var k = 'data.plat.' + d.data.type+'['+d.idx+']';
             t.setData({
               [k]:a.data.data
             })
           }
        },complete:function(){
          t.data.loadding=false;
        }
        });
    },
    onLoad: function(a) {
        var t = this;
        if (!(this.data.id > 0)){
            this.data.id = a.id||0;
            this.data.type=a.type||'';
            this.data.isjion = a.isjion || 0;
            this.data.status = a.status || 0;
      }
      wx.setNavigationBarTitle({
        title: (this.data.type == 'sale' ? '渠道驻场' : '置业顾问')+'-' + wx.getStorageSync("companyinfo").name,
      });
      i.setIntro();
        var ee = i.getM();
        ee ? (t.data.isuser = !0, t.setData({
            user: ee
        })) : t.data.isuser = !1, t.setData({
            isuser:t.data.isuser,
            isjion:this.data.isjion||0
        });
        this.get_list();
  }, get_list: function () {
    var t = this, m = app.getM() || {};
      if (t.data.page<0)return;
      i.util.request({
        url: "entry/wxapp/getplatlist",
        data: {
          id: t.data.id||'',
          uid:m.uid||0,
          page:t.data.page||1,
          type: t.data.type || '',
          isjion: t.data.isjion || 0,
          status: t.data.status || 0
        },
        success: function (a) {
          
          if (!(t.data.page > 1)) {
            var d = {
              list: a.data.data.data
            }
            d.isyjshow= a.data.data.isyjshow;
            d.intro =a.data.data.intro;
            i.setIntro(d.intro);          
            t.setData(d);
          }else{
            $.append(t, 'list', a.data.data.data, t.data.page);
          }
          if (a.data.data.data.length<=0)t.data.page=-1;
        },
        complete: function () {
          wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }
      });
  },
bindGetUserInfo: function (a) {
  var e = this, n = i;
  n.util.getUserInfo(function (a) {
       e.data.isuser = !0;a.wxInfo=a.wxInfo||a.memberInfo||{};
      var t = a.memberInfo.uid, o = a.wxInfo.nickName||a.wxInfo.nickname, i = a.wxInfo.avatarUrl||a.wxInfo.avatar;
    e.data.uid = t, t > 0 && (e.setData({
      userinfo: a,
      isuser: e.data.isuser
    }), n.util.request({
      url: "entry/wxapp/Updateuserinfo",
      data: {
        uid: t,
        nickname: o,
        avatarUrl: i
      },
      success: function (t) {
        t.data.message.errno || (n.globalData.isuser = !0, e.setData({
          userinfo: a,
          isuser: e.data.isuser
        }));
        e.onLoad();
      }
    }));
  }, a.detail);
},

showimg:function(e){
  var c=e.currentTarget.dataset.idx;
  var urls=e.currentTarget.dataset.list;
  wx.previewImage({
    current: c, // 当前显示图片的http链接
    urls: urls // 需要预览的图片http链接列表
  })
},
toHousemoney: function() {
    wx.navigateTo({
        url: "/weixinmao_house/pages/housemoney/index"
    });
},
toComment: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/comment/index?id=" + t
    });
},
savehouse: function(a) {
    var t = this, e = wx.getStorageSync("userInfo"), n = t.data.id;
    i.util.request({
        url: "entry/wxapp/savehouse",
        data: {
            housetype: "newhouse",
            pid: n,
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(a) {
            a.data.message.errno || t.setData({
                issave: a.data.data.issave
            });
        }
    });
},
toActiveDetail: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/activedetail/index?id=" + t
    });
},
goMessage: function(a) {        
    wx.navigateBack({
      delta:1
    });
},
toPicDetail: function(a) {
    var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.typeid;
    wx.navigateTo({
        url: "/weixinmao_house/pages/picdetail/index?id=" + t + "&typeid=" + e
    });
},
goMap: function(a) {
    var t = this;
    wx.openLocation({
        latitude: Number(t.data.lat),
        longitude: Number(t.data.lng),
        scale: 18,
        name: t.data.title,
        address: t.data.address
    });
},
doCall: function(a) {
    console.log(a.currentTarget);
    var t = a.currentTarget.dataset.tel;
    wx.makePhoneCall({
        phoneNumber: t,
        success: function() {
            console.log("拨打电话成功！");
        },
        fail: function() {
            console.log("拨打电话失败！");
        }
    });
},
jumpTo: function(a) {
    var t = a.currentTarget.dataset.opt;
    console.log(t), this.setData({
        toView: t
    });
},
onReady: function() {},
onShow: function() {},
onHide: function() {},
onUnload: function() {},
onPullDownRefresh: function() {
  wx.showNavigationBarLoading(), this.data.page=1 , this.get_list();
},
onReachBottom: function() {
  if (this.data.page < 0) return;
  wx.showNavigationBarLoading(), this.data.page++,this.get_list();
}
}));