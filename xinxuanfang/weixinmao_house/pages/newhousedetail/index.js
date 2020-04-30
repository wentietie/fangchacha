function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../resource/wxParse/wxParse.js"), i = getApp(),$=i.$;

Page({
    data: (t = {
        images: {},
        current:0,
        autoplay: !0,
        interval: 3e3,
        isuser:1,
        duration: 1e3,
        title: "",
        commenttitle:'',
        address: "",
        showtype:'content',
        lat: 0,
        lng: 0,
        id: 0,
        cpage:1,
        _page:'index'
    }, a(t, "title", ""), a(t, "hdimg", []), a(t, "circular", !0), a(t, "indicatorDots", !1), 
    a(t, "indicatorcolor", "#000"), a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), 
    a(t, "current", 0), t),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (i = a.detail.height);
        var i = 750 / e, n = this.data.imgheights;
        n.push(i), this.setData({
            imgheights: n
        });
  },toUrl:i.toUrl,
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
  bindshowtype:function(e){
    this.setData({
      showtype:e.currentTarget.dataset.type
    });
  },
    bindzan:function(e){
      var t = this, d = e.currentTarget.dataset, u = wx.getStorageSync("userInfo");
      if (t.data.loadding){
        return;
      }
      t.data.loadding=true;
      i.util.request({
        url: "entry/wxapp/plat_zan",
        data: {
          id: d.data.id,
          uid: u.memberInfo.uid ? u.memberInfo.uid : 0,
          type:d.type
        },
        success: function (a) {
           var dd=t.data.data.plat[d.data.type];
          if (a.data.data && a.data.data.id){
             var k = 'data.plat.' + d.data.type+'['+d.idx+']';
             t.setData({
               [k]: $.extend(dd[d.idx], a.data.data)
             })
           }
        },complete:function(){
          t.data.loadding=false;
        }
        });
    },
    onLoad: function(a) {
        var t = this,_c,_url;
        if (!(this.data.id > 0)) {
            this.data.id = a.id||0;
            this.data.fpid = a.fpid||0;
            this.data._page = a._page || this.data._page
      } 
      var _page=this.data._page;
      _page=='index'?this.data.commenttitle='楼盘问问':'';
      i.setIntro();
        _url = "/"+this.route+"?id=" + this.data.id;
        var ee = i.getM()||{};
         ee.uid ? (t.data.isuser = !0, t.setData({
            userinfo: ee,
        })) : t.data.isuser = !1, t.setData({
           isuser: t.data.isuser,
           _url: _url,
           id: this.data.id,
           _page:this.data._page,
           showtype: this.data._page == 'imgs' ? 'thumbs_0' : this.data._page,
           commenttitle: this.data.commenttitle
        });
        i.util.request({
            url: "entry/wxapp/getnewhousedetail",
            data: {
                id: t.data.id,
                fpid: t.data.fpid||0,
                uid:ee.uid||0,
                _page:t.data._page||'index'
            },
            success: function(a) {
                a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                  }), t.data.title = a.data.data.list.housename, t.data.address = a.data.data.list.houseaddress,
                  _c = a.data.data.list.content || '', a.data.data.list.content = _c?1:0,
                t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
                    title: t.data.title + "-" + a.data.data.intro.name
                }), t.setData({
                    intro: a.data.data.intro,
                    data: a.data.data.list||[],
                    tjlist: a.data.data.tjlist || [],
                    gwlist: a.data.data.gwlist || [],
                    salelist: a.data.data.salelist || [],
                    isyjshow: a.data.data.isyjshow || 0,
                    commentlist: a.data.data.commentlist || [],
                    commenttotal: a.data.data.commenttotal || 0,
                    cpage:a.data.data.cpage||0
                  }), _page == 'detail' || _page == 'content'? e.wxParse("article", "html", _c, t, 5):'');
              if (a.data.data.intro.tips&&t.data._page=='index') {
                wx.showModal({
                  title: '早报',
                  content: a.data.data.intro.tips,
                  showCancel: false
                });
              }
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
toUrl:function(a){
  i.toUrl(a);
},
toInnerUrl:function(a){
  i.toUrl(a);
},
onReady: function() {},
onShow: function() {},
onHide: function() {},
onUnload: function () { },
onPullDownRefresh: function () {
wx.showNavigationBarLoading(), this.onLoad();
},
onReachBottom: function() {
  if (this.data._page != 'commentlist') return;
  if (this.data.cpage < 0) return;
  this.data.cpage++;
  this.getCommentlist();
},
  getCommentlist:function(){
    var e=this;
    if (e.data.cpage<=0)return;
    i.util.request({
      url: "entry/wxapp/Getcommentlist",
      data: {
        id: e.data.id,
        page: e.data.cpage,
        type:'newhouse'
      },
      success: function (t) {
        t.data.errno || $.append(e, 'commentlist', t.data.data, e.data.cpage);
        !t.data.data || t.data.data.length<=0?e.data.cpage=-1:'';
      },
      complete: function () {
        e.setData({
          loadMore: ""
        });
      }
    });
  },
  toAgent: i.toAgent,
  toMessage:function(){
    i.toAgent();
  },
  onShareAppMessage: function () {
    var i = this.data.data||{}, uid = i._isplat||this.data.fpid||0;
    var title = i.housename +' — 房源纸-点击免费查看详情';
  return {
    title:title,
    path: "/" + this.route + "?id=" + i.id + '&fpid=' + uid || 0
  };
}
});