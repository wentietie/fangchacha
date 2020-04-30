var t = getApp();

Page({
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
        buildarea: ""
    },
    onLoad: function(t) {
        var e = this, a = [ {
            name: "0-100㎡",
            id: 1
        }, {
            name: "100-200㎡",
            id: 2
        }, {
            name: "200-300㎡",
            id: 3
        }, {
            name: "300-500㎡",
            id: 4
        }, {
            name: "500㎡-1000㎡",
            id: 5
        }, {
            name: "1000㎡以上",
            id: 6
        } ], i = [ {
            name: "仓库",
            id: 1
        }, {
            name: "商铺",
            id: 2
        }, {
            name: "公寓",
            id: 3
        }, {
            name: "写字楼",
            id: 4
        }, {
            name: "厂房",
            id: 5
        }, {
            name: "车位",
            id: 6
        } ];
        this.setData({
            housetypelist: a,
            carid: 0,
            priceid: 0,
            typeid: 0,
            selectid: 0,
            housewaylist: i
        }), wx.setNavigationBarTitle({
            title: "商业出租-" + wx.getStorageSync("companyinfo").name
        });
        var s = wx.getStorageSync("cityinfo");
        s ? (console.log(s.name), wx.setStorageSync("city", s.name), e.initpage()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(t) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: t.latitude,
                        longitude: t.longitude
                    },
                    success: function(t) {
                        var a = t.result.address_component.city, i = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", i), e.initpage();
                    }
                });
            },
            fail: function() {
                e.initpage();
            },
            complete: function() {}
        }));
    },
    initpage: function() {
        var e = this, e = this, a = wx.getStorageSync("city");
        t.util.request({
            url: "entry/wxapp/getinitletinfo",
            data: {
                city: a
            },
            success: function(t) {
                t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), e.gethouselist(), e.data.buildarea = t.data.data.buildarea, 
                e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: e.data.title,
                    price: e.data.price,
                    typetitle: e.data.typetitle,
                    selecttitle: e.data.selecttitle,
                    intro: t.data.data.intro
                }));
            },
            complete: function() {}
        });
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/letbusinesshousedetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    gethouselist: function(e) {
        var a = this, i = wx.getStorageSync("cityinfo").id;
        t.util.request({
            url: "entry/wxapp/getletbusinesshouselist",
            data: {
                cityid: i,
                page: a.data.page,
                houseareaid: a.data.houseareaid,
                housepriceid: a.data.housepriceid,
                housetype: a.data.housetype,
                letway: a.data.letway
            },
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), a.setData({
                    houselist: t.data.data
                }));
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
        this.data.title = i, this.data.houseareaid = a, 0 == a ? (this.setData({
            carid: a,
            isCars: !0,
            title: i
        }), this.gethouselist()) : this.setData({
            carid: a,
            title: i,
            isTaps: !1,
            buildarealist: e[a]
        });
    },
    selectbuilditem: function(t) {
        this.data.buildarea;
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
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
        this.data.price = a, this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.typetitle = a, console.log(t.currentTarget), this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
    },
    selectwayitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.selecttitle = a, console.log(t.currentTarget), this.setData({
            selectid: e,
            isSelect: !0,
            selecttitle: a
        }), this.data.letway = e, this.gethouselist();
    },
    onReachBottom: function(t) {
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
            title: "房屋出租-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/lethouselist/index"
        };
    }
});