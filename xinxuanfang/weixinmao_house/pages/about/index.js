function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../resource/wxParse/wxParse.js"), i = getApp();

Page({
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
        id: 0
    }, a(t, "title", ""), a(t, "hdimg", []), a(t, "circular", !0), a(t, "indicatorDots", !1), 
    a(t, "indicatorcolor", "#000"), a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), 
    a(t, "current", 0), t),
    toUrl:i.toUrl,
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (i = a.detail.height);
        console.log(t, i);
        var i = 750 / e, n = this.data.imgheights;
        n.push(i), this.setData({
            imgheights: n
        });
    },
    bindchange: function(a) {
        this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        var t = this,pt='content',_title='',_content='';
        if(a){
          pt=t.data.pt=a.type;
        }
        pt = t.data.pt
        var ee = wx.getStorageSync("userInfo");
         ee ? (t.data.isuser = !0, t.setData({
            userinfo: ee
        })) : t.data.isuser = !1, t.setData({
            isuser:t.data.isuser
        });
        i.util.request({
            url: "entry/wxapp/GetAbout",
            data: {},
            success: function(a) {
                a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), _title = a.data.data.title && a.data.data.title[pt] ? a.data.data.title[pt]+'-':'',
                  _content = a.data.data.intro && a.data.data.intro._editor && a.data.data.intro._editor[pt] ? a.data.data.intro._editor[pt] : '', delete a.data.data.intro._editor,
                wx.setNavigationBarTitle({
                  title:t.data.title= _title+ a.data.data.intro.name
                }), t.setData({
                    data: a.data.data.intro
                  }),
                  e.wxParse("article", "html", _content, t));
            },
            complete: function() {
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
goMessage: function(a) {
    var t = this.data.id, url = a.currentTarget.dataset.url;
    wx.navigateTo({
        url: url
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
onUnload: function () { },
onPullDownRefresh: function () {
wx.showNavigationBarLoading(), this.onLoad();
},
onReachBottom: function() {},
onShareAppMessage: function() {
  return {
    title: this.data.title,
    path: "/weixinmao_house/pages/about/index?type="+this.data.pt
  };
}
});