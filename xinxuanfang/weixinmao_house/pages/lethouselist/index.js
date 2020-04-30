var t = getApp(),app=t,$=app.$;

Page({
    klist:[],
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isSelect: !0,
        isTaps: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        letway: 0,
        page: 1,
        title: "",
        price: "",
        typetitle: "",
        selecttitle: "",
        bid: 0,
        buildarea: "",
        keyword:'',
        isuser:1,
        def: {
          title: '区域',
          price: '租金',
          type: '业态',
        }
    },
    onLoad: function(t) {
        var e = this, a = [], i = [];
        this.setData({
            housetypelist: a,
            carid: 0,
            priceid: 0,
            typeid: 0,
            selectid: 0,
            housewaylist: i
        }), wx.setNavigationBarTitle({
            title: "房屋租售-" + wx.getStorageSync("companyinfo").name
        });
      var ee = wx.getStorageSync("userInfo");
      ee ? (e.data.isuser = !0, e.setData({
        userinfo: ee
      })) : e.data.isuser = !1, e.setData({
        isuser: e.data.isuser
      });
      e.initpage();
  },
  bindCancell: function () {
    this.setData({
      isuser: true
    });
  },
  onShow: function () {
    var a = this, e = wx.getStorageSync("cityinfo");
    var _cityid = a.data._cityid || 0;
    a.data._cityid = e.name;
    var n = wx.getStorageSync("userInfo"), isuser = false;
    n && n.hasOwnProperty("wxInfo") ? isuser = !0 : isuser = !1;
    if ((_cityid && _cityid != e.name) || (!a.data.isuser && isuser)) {
      this.setData({
        isCars: !0,
        isSort: !0,
        isuser: isuser,
        isPrice: !0,
        isType: !0,
        isSelect: !0,
        isTaps: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        letway: 0,
        page: 1,
        price: "",
        typetitle: "",
        selecttitle: "",
        bid: 0,
        buildarea: "",
        keyword: '',
        title: '',
        def: {
          title: '区域',
          price: '租金',
          type: '业态',
        }
      });
      (wx.setStorageSync("city", e.name), wx.showNavigationBarLoading(), a.initpage());
    }
  },
    initpage: function() {
        var e = this, a = wx.getStorageSync("city"), u = wx.getStorageSync("userInfo")||{};
        t.util.request({
            url: "entry/wxapp/getinitletinfo",
            data: {
                city: a,
                uid: (u.memberInfo || {}).uid ? u.memberInfo.uid : 0,
                islist:1
            }, 
          success: function (t) {
              if (t.data.message.errno) {
                return;
              }
              (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"));
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
            }), wx.setStorageSync("cityinfo", t.data.data.cityinfo);
                var ismoney = 0, ism = 0, ispay = 0;
                if (t.data.data.intro) {
                  ismoney = parseInt(t.data.data.intro.islethouses || 0);
                  ispay = parseFloat(t.data.data.intro.mmoney || 0);
                }
                if (t.data.data.member && t.data.data.member.ism) {
                  ism = parseInt(t.data.data.member.ism || 0);
                }
                if (ispay && ismoney && !ism) {
                  wx.redirectTo({
                    url: '../pay/index'
                  })
                  return;
                }
                 e.gethouselist(), e.data.buildarea = t.data.data.buildarea, 
                e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    'def.title': t.data.data.addresstitle || e.data.title,
                    'def.price': t.data.data.pricetitle || e.data.price,
                    'def.type': t.data.data.typetitle || e.data.typetitle,
                    placeholder: t.data.data.placeholder || e.data.placeholder || '',
                    'def.select': t.data.data.selecttitle || e.data.selecttitle,
                    intro: t.data.data.intro,
                    isyjshow: t.data.data.isyjshow || 0,
                    housewaylist: t.data.data.housewaylist,
                    housetypelist: t.data.data.housetypelist,
              });
              e.klist = t.data.data.klist || [];
            },
            complete: function() {
              wx.stopPullDownRefresh();
            }
        });
  },
  bindSearch: function (e) {
    var kw = e.detail.value;
    this.data.keyword = kw;
    this.data.page = 1;
    this.gethouselist();
  },
  bindblur: function (e) {
    var slist = this.data.klist || [], klist = [];
    if (slist.length > 0) this.setData({ klist: klist });
  },
  ksearch: function (e) {
    var kw = e.detail.value;
    var slist = this.data.klist || [], klist = [];
    var list = this.klist;
    if (kw.length > 0) {
      for (var i in list) {
        var row = list[i];
        if (row.title.indexOf(kw) > -1) klist.push(row);
        if (klist.length > 10) break;
      }
    }
    if (slist.length > 0 || klist.length > 0) this.setData({ klist: klist, isCars: !0, isPrice: !0, isType: !0, isSelect:!0 });
  },
  bindGetUserInfo: function (a) {
    var e = this, n = t;
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
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
  },
  toMessage: function () {
    t.toAgent();
  },
    gethouselist: function(e) {
        var a = this, i = wx.getStorageSync("cityinfo").id;
        t.util.request({
            url: "entry/wxapp/getlethouselist",
            data: {
                cityid: i,
                page: a.data.page,
                houseareaid: a.data.houseareaid,
                housepriceid: a.data.housepriceid,
                housetype: a.data.housetype,
                bid:a.data.bid,
                letway: a.data.letway,
                keyword: a.data.keyword
            },
            success: function(t) {
              t.data.message.errno || $.append(a, 'houselist', t.data.data, a.data.page);
              !t.data.data || t.data.data.length <= 0 ? a.data.page = -1 : '';
              if (a.data.klist && a.data.klist.length > 0) a.setData({ klist: [] });
            },
            complete: function() {
                a.setData({
                    loadMore: ""
                });
            }
        });
    },
    selectcarsitem: function(t) {
      var e = this.data.buildarea, a = t.currentTarget.id, i = t.currentTarget.dataset.title;
      this.data.page = 1;
        this.data.title = i, this.data.houseareaid = a, 0 == a ? (this.setData({
            carid: a,
            isCars: !0,
            title: i
        })) : this.setData({
            carid: a,
            title: i,
            isCars: !0,
            isTaps: !1,
            buildarealist: e[a]
          }), this.gethouselist();
    },
    selectbuilditem: function(t) {
        this.data.buildarea;
      var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
      this.data.page = 1;
        this.data.title = a, this.setData({
            bid: e,
            isTaps: !0,
            isCars: !0,
            title: a
        }), this.data.bid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        console.log(t.currentTarget.id);
      var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
      this.data.page = 1;
        this.data.price = a, this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
      var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
      this.data.page = 1;
        this.data.typetitle = a, this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
    },
    selectwayitem: function(t) {
        console.log(t.currentTarget.id);
      var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
      this.data.page = 1;
        this.data.selecttitle = a, this.setData({
            selectid: e,
            isSelect: !0,
            selecttitle: a
        }), this.data.letway = e, this.gethouselist();
    },
    onReachBottom: function(t) {
      if (this.data.page<0)return;
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, this.gethouselist();
    },
    clickSearch: function(t) {
        wx.switchTab({
            url: "/pages/search/search"
        });
    },
    clickList: function() {
        wx.navigateTo({
            url: "../cars/cars"
        });
    },
    selectCars: function(t) {
        var e = this;
        e.setData({
            isSort: !0,
            isPrice: !0,
            isType: !0,
            isTaps: !0,
            isSelect: !0,
            isCars: !e.data.isCars
        });
    },
    selectPrice: function() {
        var t = this;
        console.log("aaa"), t.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isSelect: !0,
            isPrice: !t.data.isPrice
        });
    },
    selectType: function() {
        var t = this;
        t.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isSelect: !0,
            isType: !t.data.isType
        });
    },
    selectWay: function() {
        var t = this;
        t.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSelect: !t.data.isSelect
        });
    },
    selectSort: function() {
        var t = this;
        t.setData({
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSort: !t.data.isSort
        });
    },
    selectBrand: function() {
        wx.navigateTo({
            url: "../brand/brand"
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: "房屋租售-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/lethouselist/index"
        };
    }
});