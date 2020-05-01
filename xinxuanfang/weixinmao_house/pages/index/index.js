function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var app,e, t, o = require("../../resource/js/qqmap-wx-jssdk.min.js"), n = (require("../../resource/js/config.js"), 
app=getApp()),$=app.$;

Page((e = {
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        swiperCurrent: 0,
        showmsg: !0,
        isshow: !0,
        isuser: !0,
        isphone: !0,
        moban: 0,
        uid: 0,
        indeximg: !0,
    },
    onLoad: function(a) {
        var e = this, n = wx.getStorageSync("userInfo");
        n && n.hasOwnProperty("wxInfo") ? e.data.isuser = !0 : e.data.isuser = !1, 
        e.setData({
            isuser: e.data.isuser
        });
       e.initPage();
  },
  goReport() {
    wx.navigateTo({
      // url: "/weixinmao_house/pages/jion/enterJoin", //企业入驻
      // url: "/weixinmao_house/pages/index/report/report", // 报备
      // url: "/weixinmao_house/pages/jion/jjCompanyJoin/jjCompanyJoin" // 经济公司入驻
      url: "/weixinmao_house/pages/index/reportList/reportList", // 报备列表
    })
  },
  toUrl:app.toUrl,
  onShow: function () {
    var a = this, e = wx.getStorageSync("cityinfo");
    var _cityid = a.data._cityid || 0;
    a.data._cityid = e.name; 
    var  n = wx.getStorageSync("userInfo"), isuser =false;
    n && n.hasOwnProperty("wxInfo") ? isuser = !0 : isuser = !1;
    if (!a.data.isuser && isuser){
      a.setData({
        isuser: isuser
      });
      wx.showNavigationBarLoading(), a.initPage();return;
    }
    if (_cityid && _cityid != e.name) {
      (wx.setStorageSync("city", e.name), wx.showNavigationBarLoading(), a.initPage());
    }
  },
    onPullDownRefresh: function() {
        var a = this, e = wx.getStorageSync("cityinfo");
      e && (wx.setStorageSync("city", e.name), wx.showNavigationBarLoading(), a.initPage());
  },
  toNewsDetail: function (a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/newsdetail/index?id=" + t
    });
  },
    initPage: function() {
      var a = this, e = wx.getStorageSync("cityinfo"),m=app.getM()||{};
         n.util.request({
            url: "entry/wxapp/GetIndex",
            data: {
                city: e.name,
                _cityid:e.id,
                uid:m.uid||0
            },
            success: function(e) {
                e.data.message.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setStorageSync("cityinfo", e.data.data.cityinfo), 
                wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), "" != e.data.data.intro.indexadv && (wx.getStorageSync("onimg") || (a.data.indeximg = !1, 
                a.setData({
                    indeximg: !1
                }))), a.setData({
                    newhouselist: e.data.data.newhouselist,
                    tjlist: e.data.data.tjlist || [],
                    flist: e.data.data.flist || [],
                    gwlist: e.data.data.gwlist || [],
                    salelist: e.data.data.salelist || [],
                    navlist: e.data.data.navlist||[],
                    banners: e.data.data.banner || [],
                    intro: e.data.data.intro || [],
                    isyjshow: e.data.data.isyjshow || 0,
                    ordertype: 1,
                    moban: e.data.data.intro.moban,
                    isshow: !1,
                    isoldhouse: e.data.data.intro.isoldhouse,
                    islethouse: e.data.data.intro.islethouse,
                    isbuyhouse: e.data.data.intro.isbuyhouse,
                    issalehouse: e.data.data.intro.issalehouse,
                    isagentlethouse: e.data.data.intro.isagentlethouse,
                    isagentoldhouse: e.data.data.intro.isagentoldhouse,
                    city: wx.getStorageSync("cityinfo").name,
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
        a.getLocation();
    },
  getLocation:function(){
    var t = this, i = wx.getStorageSync("cityinfo").id;
    $.getLocation(function (r) {
      var d = {
        cityid: i,
        latlng:r.latitude+','+r.longitude,
        type:'new'
      }
      // t.setData({ neardata: { r: r} });
      app.util.request({
        url: "entry/wxapp/getLocationNear",
        data: d,
        showLoading: false,
        success: function (rr) {
          if(rr&&rr.data&&rr.data.data){
            rr.data.data.latlng = r.latitude + ',' + r.longitude;
            t.setData({'neardata':rr.data.data});
          }
        }
      });
    },function(){
      t.setData({ 
        'neardata.r.formatted_addresses.recommend': '获取位置失败，请开启GPS服务',
      });
    });
  },
    swiperChange: function(a) {
        this.setData({
            swiperCurrent: a.detail.current
        });
    },
    chuangEvent: function(a) {
        this.setData({
            swiperCurrent: a.currentTarget.id
        });
    },
    closeIndeximg: function() {
        var a = this;
        a.data.indeximg = !0, wx.setStorageSync("onimg", !0), a.setData({
            indeximg: a.data.indeximg
        });
  },
  bindCancell:function(){
    this.setData({
      isuser:true
    });
  },
    getPhoneNumber: function(a) {
        var e = this;
        "getPhoneNumber:fail user deny" == a.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(a) {}
        }) : (e.setData({
            isphone: !0
        }), n.util.request({
            url: "entry/wxapp/Getphone",
            data: {
                iv: a.detail.iv,
                encryptedData: a.detail.encryptedData,
                uid: e.data.uid
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    isphone: !0
                });
            }
        }));
    },

    


    bindGetUserInfo: function(a) {
        var e = this;
        n.util.getUserInfo(function(a) {
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
                success: function(t) {
                    t.data.message.errno || (n.globalData.isuser = !0, e.setData({
                        userinfo: a,
                        isuser: e.data.isuser
                    }));
                }
            })); 
        }, a.detail);
    },
    toInnerUrl: function(a) {
        app.toUrl(a);
    },
    toMenuUrl: function(a) {
      app.toUrl(a);
    },
    toWxapp: function(a) {
        var e = a.currentTarget.dataset.url, t = a.currentTarget.dataset.appid;
        console.log(e), console.log(t), wx.navigateToMiniProgram({
            appId: t,
            path: e,
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(a) {}
        });
    },
    toHousemoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemoney/index"
        });
    },
    cancelUser: function(a) {
        this.data.isuser = !0, this.setData({
            isuser: this.data.isuser
        });
    },
    cancelPhone: function(a) {
        this.data.isphone = !0, this.setData({
            isphone: this.data.isphone
        });
    },
    toNagivate: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: e
        });
    },
    toSwitchtab: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.switchTab({
            url: e
        });
    }
}, a(e, "toWxapp", function(a) {
    var e = a.currentTarget.dataset.id, t = a.currentTarget.dataset.appid;
    console.log(e), console.log(t), wx.navigateToMiniProgram({
        appId: t,
        path: e,
        extraData: {
            foo: "bar"
        },
        envVersion: "develop",
        success: function(a) {}
    });
}), a(e, "toStorelist", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/storelist/index?id=" + e
    });
}), a(e, "toletHouseDetail", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/lethousedetail/index?id=" + e
    });
}), a(e, "toNewHouse", function(a) {
    var tab=a.currentTarget.dataset.tab||0;
    if (tab.length > 0) {
      wx.navigateTo({
        url: "/weixinmao_house/pages/newhouselist1/index?tab=" + tab
      });
    }else{
      wx.switchTab({
        url: "/weixinmao_house/pages/newhouselist/index?tab="+tab
      });
    }
}), a(e, "toOldHouse", function(a) {
    wx.switchTab({
        url: "/weixinmao_house/pages/oldhouselist/index"
    });
}), a(e, "toOldSaleHouse", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldsalehouselist/index"
    });
}), a(e, "toOldPayHouse", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldpayhouselist/index"
    });
}), a(e, "toLetBusinessHouse", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/letbusinesshouselist/index"
    });
}), a(e, "toShopHouse", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/shophouselist/index"
    });
}), a(e, "toShopLetHouse", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/shoplethouselist/index"
    });
}), a(e, "toAgentlist", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/agentlist/index"
    });
}), a(e, "toArticle", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/salelist/index"
    });
}), a(e, "toActive", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/active/index"
    });
}), a(e, "toBusinesshouselist", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/businesshouselist/index"
    });
}), a(e, "toNewHouseDetail", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/newhousedetail/index?id=" + e
    });
}), a(e, "toOldHouseDetail", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldhousedetail/index?id=" + e
    });
}), a(e, "toLethouse", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/lethouselist/index?id=" + e
    });
  }),
   a(e, "todahouse", function (a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/newhouselistdz/index?id=" + e
    });
  }),
  a(e, "tosidan", function (a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/sidan/index?id=" + e
    });
  }),
  a(e, "tocuiyong", function (a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/cuiyong/index?id=" + e
    });
  }),
  a(e, "toMessage", function(a) {
    var e = wx.getStorageSync("userInfo");
    a.currentTarget.dataset.tel;
    n.util.request({
        url: "entry/wxapp/Checkagent",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(a) {
            0 == a.data.data.error ? wx.navigateTo({
                url: "/weixinmao_house/pages/message/index"
            }) : wx.showModal({
                title: "提示",
                content: a.data.data.msg,
                showCancel: !1
            });
        }
    });
}), a(e, "toSearch", function(a) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/search/index"
    });
}), a(e, "PubOldhouse", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/pub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "PubLethouse", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/letpub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "toSaleOldPub", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/saleoldpub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "toSalePub", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/salepub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "toSaleBuyPub", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/salebuypub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "toSaleLetPub", function(a) {
    var e = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/saleletpub/index",
        success: function() {
            e.data.showmsg = !0, e.setData({
                showmsg: e.data.showmsg
            });
        }
    });
}), a(e, "tabClick", function(a) {
    var e = this, t = a.currentTarget.id;
    e.setData({
        ordertype: t
    });
}), a(e, "goPub", function(a) {
    this.data.showmsg = !1, this.setData({
        showmsg: this.data.showmsg
    });
}), a(e, "toAgentDetail", function(a) {
    var e = a.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/agentdetail/index?id=" + e
    });
}), a(e, "closemsg", function(a) {
    this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
    });
}), a(e, "goMap", function(a) {
    wx.openLocation({
        latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
        longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
        scale: 18,
        name: wx.getStorageSync("companyinfo").name,
        address: wx.getStorageSync("companyinfo").address
    });
}), a(e, "onReady", function() {}), a(e, "bindInput", function(a) {
    var e = this;
    this.setData({
        inputValue: a.detail.value
    }), e.onLoad();
}), a(e, "onHide", function() {}), a(e, "onUnload", function() {}), a(e, "onPullDownRefresh", function() {
    wx.showNavigationBarLoading(), this.onLoad();
}), a(e, "doCall", function() {
    var a = this.data.textData.shop_tel;
    wx.makePhoneCall({
        phoneNumber: a
    });
}), a(e, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/index/index"
    };
}), e));