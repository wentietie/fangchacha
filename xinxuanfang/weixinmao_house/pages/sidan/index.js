var t = getApp(),app=t,$=app.$;

Page({
  data: {
      city: wx.getStorageSync("cityinfo").name,
      isCars: !0,
      isuser: 1,
      isSort: !0,
      isPrice: !0,
      isType: !0,
      isTaps: !0,
      title: "",
      price: "",
      typetitle: "",
      buildarea: "",
      search:{
        keyword: '',
        page: 1,
        month:0,
      },
      sq:{status:1},
      ftime:0,
      sidanlist:true
  },
  bindCancell: function () {
    this.setData({
      isuser: true
    });
  },toUrl:app.toUrl,
    onLoad: function() {
        var a = this;
        wx.setNavigationBarTitle({
            title: "私单人员"
      }); t.setIntro();
      a.setData({
        city: wx.getStorageSync("cityinfo").name,
      }); t.setIntro();
        var e = wx.getStorageSync("userInfo");
         e ? (a.data.isuser = !0, a.setData({
            userinfo: e
         })) :a.data.isuser = !1, a.oldhouseinit(), a.setData({
            isuser: a.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(a) {
        var e = this, s = wx.getStorageSync("userInfo")||{}, i = wx.getStorageSync("cityinfo");
        t.util.request({
            url: "entry/wxapp/Sidansq",
            data: {
                cityid: i.id,
                sessionid: s.sessionid,
                uid: (s.memberInfo || {}).uid
            },
          success: function (t) {
            if (t.data.message.errno) {
              return;
            }
               (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }),e.setData({
                    intro: t.data.data.intro,
                    sqmsg: t.data.data.sqmsg,
                    sq: t.data.data.sq,
                    arealist: t.data.data.arealist,
                    timelist: t.data.data.timelist
                }));
            if (t.data.data.sq && t.data.data.sq.status == 1) {
                var ismoney = 0, ism = 0, ispay = 0;
                if (t.data.data.intro) {
                  ismoney = parseInt(t.data.data.intro.iscuiyong || 0);
                  ispay = parseInt(t.data.data.intro.mmoney || 0);
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
                  e.getlist();
                }
          },
          complete: function () {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
          }
        });
  }, 
  selectcarsitem: function (t) {
    var e = t.currentTarget.id, i = t.currentTarget.dataset.title;
    this.data.title = i, this.data.search.areaid = e, 0 == e ? (this.data.bid = 0, this.setData({
      carid: e,
      isCars: !0,
      title: i
    })) : this.setData({
      carid: e,
      title: i,
      isCars: !0,
      isTaps: !1,
    }), this.getlist();
  },
  selecttypeitem: function (t) {
    var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
    this.data.search.month = e, this.setData({
      typeid: a,
      isType: !0,
      'search.month': e
    }), this.getlist();
  },
  selectCars: function (t) {
    var a = this;
    a.setData({
      isSort: !0,
      isPrice: !0,
      isType: !0,
      isTaps: !0,
      isCars: !a.data.isCars
    });
  },
    selectType: function () {
      var t = this;
      t.setData({
        isSort: !0,
        isCars: !0,
        isPrice: !0,
        isType: !t.data.isType
      });
    },
    bindGetUserInfo: function(a) {
        var e = this;
        t.util.getUserInfo(function(t) {
            console.log(t), e.data.isuser = !0, e.setData({
                userinfo: t,
                isuser: e.data.isuser
            });
        }, a.detail);
    },
    toMessage: function(t) {
        wx.navigateTo({
            url: "apply"
        });
    },
    getlist:function(){
      var e=this;
      e.data.search.cityid = wx.getStorageSync("cityinfo").id;
      t.util.request({
        url: "entry/wxapp/Sidanlist",
        data: e.data.search,
        success: function (t) {
          t.data.errno || $.append(e, 'list', t.data.data, e.data.search.page);
          !t.data.data || t.data.data.length <= 0 ? e.data.search.page = -1 : '';
        },
        complete: function () {
          e.setData({
            loadMore: ""
          });
        }
      });
    }, 
  bindSearch:function(e){
      var o = e.detail.value;
      if ("" == o){
        //return;
      }
     this.data.search.keyword=e.detail.value;
     this.data.search.page=1;
     this.getlist();
  }, 
  bindPickerChange:function(e){
      this.data.search.month=e.detail.value;
      this.data.search.page = 1;
      this.setData({search:this.data.search}),this.getlist();
  },
    toNagivate: function (a) {
      var e = a.currentTarget.dataset.id;
      wx.navigateTo({
        url: e
      });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
      this.data.search={keyword:'',page:1,month:0};
      wx.showNavigationBarLoading(), this.onLoad();
    },
  onShareAppMessage: function () {},
  onShow: function () {
    var a = this, e = wx.getStorageSync("cityinfo");
    var _cityid = a.data._cityid || 0;
    a.data._cityid = e.name;
    if (_cityid && _cityid != e.name) {
         this.data.chgcity=false;
         this.setData({
           isCars: !0,
           isuser: 1,
           isSort: !0,
           isPrice: !0,
           isType: !0,
           isTaps: !0,
           title: '',
           price: "",
           typetitle: "",
           buildarea: "",
           search: {
             keyword: '',
             page: 1,
             month: 0,
           },
           sq: { status: 1 },
           ftime: 0
         });
         this.onPullDownRefresh();
       }
    },
    onReachBottom: function() {
      if(this.data.search.page<0)return;
      this.setData({
        loadMore: "正在加载中..."
      }), this.data.search.page = this.data.search.page + 1, this.getist();
    },    
    checkuser: function(a) {
        var e = this, a = a, s = wx.getStorageSync("userInfo");
        return console.log(s), s ? s.memberInfo.uid ? void t.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: s.sessionid,
                uid: s.memberInfo.uid
            },
            success: function(t) {
                console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
            }
        }) : (t.util.getUserInfo(), !1) : (t.util.getUserInfo(function(t) {
            e.getlethousedetail();
        }), !1);
    }
});