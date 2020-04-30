function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e, s = require("../../resource/wxParse/wxParse.js"), i = getApp(),app=i,$=app.$;

Page((e = {
    data: (t = {
        images: {},
        current: 0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0,
      showtype: 'content',
      _page: 'index'
    }, a(t, "title", ""), a(t, "showmsg", !0), a(t, "isuser", !0), a(t, "hdimg", []), 
    a(t, "circular", !0), a(t, "indicatorDots", !1), a(t, "indicatorcolor", "#000"), 
    a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), a(t, "current", 0), 
    a(t, "showpay", !0), a(t, "paytype", 0), t),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (s = a.detail.height);
        var s = 750 / e, i = this.data.imgheights;
        i.push(s), this.setData({
            imgheights: i
        });
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  toUrl:i.toUrl,
  bindshowtype: function (e) {
    this.setData({
      showtype: e.currentTarget.dataset.type
    });
  },
    bindchange: function(a) {
        console.log(a.detail.current), this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
      var t = this, _url;
      if (!(this.data.id > 0)) {
        this.data.id = a.id || 0;
        this.data.fuid = a.fuid || 0;
        this.data._page = a._page || this.data._page
      }
      var _page = this.data._page;
      i.setIntro();
      _url = "/" + this.route + "?id=" + this.data.id;
        var e = wx.getStorageSync("userInfo");
        e ? (t.data.isuser = !0, t.setData({
          userinfo: e,
          _url: _url
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser,
          showpay: t.data.showpay,
          _url: _url,
          id: this.data.id,
          _page: this.data._page,
          showtype: this.data._page == 'imgs' ? 'thumbs_0' : this.data._page
        }), t.getlethousedetail();
    },
    toletHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
        });
  },
    toMessage: function () {
      i.toAgent();
    },
    goMessage: function(a) {
        var t = this.data.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
        });
    },
    bindGetUserInfo: function(a) {
        var t = this,o=t;
      i.util.getUserInfo(function (a) {
        a.wxInfo = a.wxInfo || a.memberInfo || {};
        var uid = a.memberInfo.uid, n = a.wxInfo.nickName || a.wxInfo.nickname, s = a.wxInfo.avatarUrl || a.wxInfo.avatar;
           t.data.isuser = !0, t.setData({
                userinfo: a,
                isuser: t.data.isuser
           }), i.util.request({
             url: "entry/wxapp/Updateuserinfo",
             data: {
               uid: uid,
               nickname: n,
               avatarUrl: s
             },
             success: function (t) {
               t.data.errno || (e.globalData.isuser = !0, o.setData({
                 userinfo: a,
                 isuser: o.data.isuser,
               }));
               t.getlethousedetail();
             }
           });
        }, a.detail);
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
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function(a) {
                console.log("拨打电话成功！");
            },
            fail: function(a) {
                console.log(a), console.log("拨打电话失败！");
            }
        });
    },
    closePay: function() {
        var a = this;
        a.data.showpay = !0, a.setData({
            showpay: a.data.showpay
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
  },
  onReachBottom: function () {
    if (this.data._page != 'commentlist') return;
    if (this.data.cpage < 0) return;
    this.data.cpage++;
    this.getCommentlist();
  },
  getCommentlist: function () {
    var e = this;
    if (e.data.cpage <= 0) return;
    i.util.request({
      url: "entry/wxapp/Getcommentlist",
      data: {
        id: e.data.id,
        page: e.data.cpage,
        type: 'lethouse'
      },
      success: function (t) {
        t.data.errno || $.append(e, 'commentlist', t.data.data, e.data.cpage);
        !t.data.data || t.data.data.length <= 0 ? e.data.cpage = -1 : '';
      },
      complete: function () {
        e.setData({
          loadMore: ""
        });
      }
    });
  },
  onShareAppMessage: function () { 
    var i = this.data.data || {}, uid = i._isplat || this.data.fuid || 0;
    return {
      title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
      path: "/" + this.route + "?id=" + i.id + '&fuid=' + uid || 0
    };
  },
  showimg: function (e) {
    var c = e.currentTarget.dataset.idx;
    var urls = e.currentTarget.dataset.list;
    wx.previewImage({
      current: c, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
    getlethousedetail: function() {
      var a = this, t = wx.getStorageSync("userInfo"), _c;
      t = i.getM() || {};
        var e = {
            id: a.data.id,
            uid: t.uid||0,
            _page: a.data._page || 'index'
      };
      var _page = this.data._page = this.data._page || 'index';
        i.util.request({
            url: "entry/wxapp/getlethousedetail",
            data: e,
            success: function(t) {
                t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), a.data.title = t.data.data.list.title, a.data.address = t.data.data.list.address, 
                  _c = t.data.data.list.content || '', t.data.data.list.content = _c ? 1 : 0,
                a.data.lat = t.data.data.list.lat, a.data.lng = t.data.data.list.lng, wx.setNavigationBarTitle({
                   title: a.data.title + "-" + t.data.data.intro.name
                }), a.setData({
                    data: t.data.data.list,
                    intro: t.data.data.intro,
                    isyjshow: t.data.data.isyjshow || 0,
                    commentlist: t.data.data.commentlist || [],
                    cpage: t.data.data.cpage || 0
                  }), _page == 'detail' || _page == 'content' ? s.wxParse("article", "html", _c, a, 5):'');
              if (t.data.data.intro.tips && t.data._page == 'index') {
                wx.showModal({
                  title: '早报',
                  content: t.data.data.intro.tips,
                  showCancel: false
                })
              }
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    }
}, a(e, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/lethousedetail/index?id=" + this.data.id
    };
}), a(e, "checkuser", function(a) {
    var t = this, a = a, e = wx.getStorageSync("userInfo");
    return  e ? e.memberInfo.uid ? void i.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(t) {
            console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
        }
    }) : (i.util.getUserInfo(), !1) : (i.util.getUserInfo(function(a) {
        t.getlethousedetail();
    }), !1);
}),  
 e));