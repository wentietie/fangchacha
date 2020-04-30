var t = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        page: 1,
        title: "",
        price: "",
        typetitle: ""
    },
    onShow: function() {
        var t = this, e = [ {
            name: "商铺",
            id: 1
        }, {
            name: "写字楼",
            id: 2
        }, {
            name: "酒店",
            id: 3
        }, {
            name: "厂房",
            id: 4
        } ];
        wx.setNavigationBarTitle({
            title: "商业地产-" + wx.getStorageSync("companyinfo").name
        });
        this.setData({
            housetypelist: e,
            typeid: 0,
            carid: 0,
            priceid: 0
        });
        var a = wx.getStorageSync("cityinfo");
        a ? (console.log(a.name), wx.setStorageSync("city", a.name), t.initpage()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(e) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        var a = e.result.address_component.city, i = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", i), t.initpage();
                    }
                });
            },
            fail: function() {},
            complete: function() {}
        }));
    },
    initpage: function() {
        var e = this, a = wx.getStorageSync("city");
        t.util.request({
            url: "entry/wxapp/getinitoldinfo",
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
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), console.log(wx.getStorageSync("cityinfo")), 
                e.gethouselist(), e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: e.data.title,
                    price: e.data.price,
                    typetitle: e.data.typetitle,
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/businesshousedetail/index?id=" + e
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
            url: "entry/wxapp/getbusinesshouselist",
            data: {
                cityid: i,
                page: a.data.page,
                houseareaid: a.data.houseareaid,
                housepriceid: a.data.housepriceid,
                housetype: a.data.housetype
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
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        console.log(t.currentTarget), this.data.title = a, this.setData({
            carid: e,
            isCars: !0,
            title: a
        }), this.data.houseareaid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.price = a, console.log(t.currentTarget), this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.typetitle = a, console.log(t.currentTarget), this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
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
            isCars: !e.data.isCars
        });
    },
    selectPrice: function() {
        var t = this;
        t.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isPrice: !t.data.isPrice
        });
    },
    selectType: function() {
        var t = this;
        t.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !t.data.isType
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
        wx.showNavigationBarLoading(), this.onShow();
    },
    onShareAppMessage: function() {
        return {
            title: "商业地产-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/businesshouselist/index"
        };
    }
});