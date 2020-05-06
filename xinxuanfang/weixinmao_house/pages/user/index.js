require("../../resource/js/htmlToWxml.js"), require("../../resource/js/images.js");

var e = getApp(),app=e,$=app.$;
var menu=[
  {
    title:'公司介绍',
    icon:'../../resource/images/u2.png',
    bind:'toUrl',
    url:'../about/index?type=content'
  }, {
    title: '商务合作',
    icon: '../../resource/images/u3.png',
    bind: 'toUrl',
    url: '../about/index?type=hezuo'
  }, {
    title: '法律顾问',
    icon: '../../resource/images/u4.png',
    bind: 'contact'
  }, {
    title: '公告',
    icon: '../../resource/images/u1.png',
    bind: 'toUrl',
    url: '../about/index?type=xiaotu'
  }, {
    title: '微信交流群',
    icon: '../../resource/images/u5.png',
    bind: 'toUrl',
    url: '../about/index?type=wx'
  }, {
    title: '使用指南',
    icon: '../../resource/images/u6.png',
    bind: 'toUrl',
    url: '../about/index?type=xinshou'
  }, {
    title: '申请入住',
    icon: '../../resource/icon/gw.png',
    bind: 'toUrl',
    url: '../jion/index?type=gw'
  }, {
    title: '入住列表',
    icon: '../../resource/icon/ok.png',
    bind: 'toUrl',
    url: '../jion/list'
  },  {
    title: '消息通知',
    icon: '../../resource/images/t5.png',
    bind: 'toUrl',
    url: ''
  }, {
    title: '发布房源',
    icon: '../../resource/images/t8.png',
    bind: 'goPub',
    url: ''
  }
];
Page({
    data: {
        showmsg: !0,
        isuser: !0,
        menu:[]
  },
  goPub:function(){
    this.data.showmsg = !1, this.setData({
      showmsg: this.data.showmsg
    });
  },
  bindCancell: function () {
    this.setData({
      isuser: true
    });
  },

  onShareAppMessage: function (res) {
    return {
      title: '测试',
      path: '/weixinmao_house/pages/index/report/report?id=123',
      // imageUrl: '****.png'
    }
  },
  onShow:function(){
    var a=this, n = wx.getStorageSync("userInfo"), isuser = false;
    n && n.hasOwnProperty("wxInfo") ? isuser = !0 : isuser = !1;
    if (!a.data.isuser && isuser) {
      this.onLoad();
    }
  },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "会员中心"
        });
      var o = this, t = app.getM(), cc = wx.getStorageSync("companyinfo")||{};
      cc.maincolor = cc.maincolor || '#3274e5';
         t ? (o.data.isuser = !0, o.setData({
            userinfo: t
        }), e.util.request({
            url: "entry/wxapp/Getuserinfo",
            data: {
              uid: (t||{}).uid
            },
            success: function(e) {
                e.data.errno || o.setData({
                    score: e.data.data.user.score||0
                });
              e.data.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setNavigationBarTitle({
                title: wx.getStorageSync("companyinfo").name
              }), e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"),
                wx.setNavigationBarColor({
                  frontColor: "#ffffff",
                  backgroundColor: e.data.data.intro.maincolor,
                  animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                  }
                }), o.setData({
                  intro: e.data.data.intro,
                  user: e.data.data.user,
                  menu:e.data.data.menu||o.data.menu
                }));
                
            },
           complete:function(){
            wx.hideNavigationBarLoading(),wx.stopPullDownRefresh();
           }
        })) : o.data.isuser = !1, o.setData({
            isuser: o.data.isuser,
            intro:cc
           }), wx.setNavigationBarColor({
             frontColor: "#ffffff",
             backgroundColor: cc.maincolor ||'#3274e5',
             animation: {
               duration: 400,
               timingFunc: "easeIn"
             }
           });
  },
  showimg: function (e) {
    var c = e.currentTarget.dataset.idx;
    var urls = e.currentTarget.dataset.list || []; 
    urls.length < 1 ? urls = [c] : '';
    wx.previewImage({
      current: c, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
    bindGetUserInfo: function(a) {
        var o = this;
        e.util.getUserInfo(function(a) {
       a.wxInfo=a.wxInfo||a.memberInfo||{};
      var t = a.memberInfo.uid, n = a.wxInfo.nickName||a.wxInfo.nickname, s = a.wxInfo.avatarUrl||a.wxInfo.avatar;
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
                success: function(t) {
                    t.data.errno || (e.globalData.isuser = !0, o.setData({
                        userinfo: a,
                        isuser: o.data.isuser,
                        score: t.data.data.userinfo.score
                    }));
                    o.onLoad();
                }
            });
        }, a.detail);
  },
  toUrl: function (a) {
    app.toUrl(a);
  },
  inviteEmp(){
    
  },
  toNagivate: function (a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: e
    });
  },
  toSwitchtab: function (a) {
    var e = a.currentTarget.dataset.id;
    wx.switchTab({
      url: e
    });
  },
    onReady: function() {},
    toOrderlist: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + a
        });
    },
    toMycomment: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mycomment/index"
        });
    },
    toMysave: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mysave/index"
        });
    },
    toMycomplain: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mycomplain/index"
        });
    },
    toFxuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxuser/index"
        });
    },
    toMyhousemsg: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhousemsg/index"
        });
    },
    toMypubs: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mypub/index"
        });
    },
    toBindUser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/binduser/index"
        });
    },
    toJoinuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/joinuser/index?id=0"
        });
    },
    toMyteam: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myteam/index"
        });
    },
    toPaymoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/paymoney/index"
        });
    },
    toMyspread: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myspread/index"
        });
    },
    toMyletpub: function(a) {
        a.currentTarget.dataset.id;
        var o = wx.getStorageSync("userInfo");
        e.util.request({
            url: "entry/wxapp/Checkagent",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                1 == e.data.data.error ? wx.navigateTo({
                    url: "/weixinmao_house/pages/agentcenter/index"
                }) : wx.showModal({
                    title: "提示",
                    content: e.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    toMysalepub: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/mysalepub/index?id=" + a
        });
    },
    toMyHouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhouse/index"
        });
    },
    toMoneyrecord: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/moneyrecord/index"
        });
    },
    onHide: function() {
      this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
      });
    },
    onUnload: function() {
      this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
      });
    },
    onPullDownRefresh: function() {
      this.onLoad();
    },
    binduserinfo: function(a) {
        var o = this;
        o.data.showmsg = !1;
        var t = wx.getStorageSync("userInfo");
        e.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                o.setData({
                    user: e.data.data,
                    showmsg: o.data.showmsg
                });
            }
        });
    },
    getusers: function() {
        e.util.getUserInfo(function(e) {
            console.log(e);
        });
    },
    saveuserinfo: function(a) {
        var o = this, t = a.detail.value.name, n = a.detail.value.tel;
        o.data.showmsg = !0;
        var s = wx.getStorageSync("userInfo");
        "" != t ? "" != n ? e.util.request({
            url: "entry/wxapp/saveuserinfo",
            data: {
                sessionid: s.sessionid,
                uid: s.memberInfo.uid,
                name: t,
                tel: n
            },
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "操作成功",
                    icon: "success",
                    duration: 2e3
                }), o.setData({
                    showmsg: o.data.showmsg
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的手机号",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的姓名",
            showCancel: !1
        });
    },
    closemsg: function(e) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    onReachBottom: function() {},
    toMycouponlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/couponlist/index"
        });
    },
    Puboldhouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        });
    },
    checkuser: function(a) {
        var o = this, a = a, t = wx.getStorageSync("userInfo");
        return t ? t.memberInfo.uid ? void e.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(a), a.doServices()) : 2 == e.data.data.error && a.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), e.util.getUserInfo(function(e) {
            o.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), e.util.getUserInfo(function(e) {
            o.setData({
                userinfo: e
            });
        }), !1);
    }
});