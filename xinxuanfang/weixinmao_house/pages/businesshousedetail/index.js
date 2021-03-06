function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../resource/wxParse/wxParse.js"), i = getApp();

Page(a({
    data: (t = {
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0
    }, a(t, "title", ""), a(t, "hdimg", []), a(t, "circular", !0), a(t, "indicatorDots", !1), 
    a(t, "indicatorcolor", "#000"), a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), 
    a(t, "current", 0), t),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (i = a.detail.height);
        console.log(t, i);
        var i = 750 / e, o = this.data.imgheights;
        o.push(i), this.setData({
            imgheights: o
        });
    },
    bindchange: function(a) {
        console.log(a.detail.current), this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        var t = this;
        if (this.data.id > 0) o = this.data.id; else {
            var o = a.id;
            this.data.id = a.id;
        }
        i.util.request({
            url: "entry/wxapp/getbusinesshousedetail",
            data: {
                id: o
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
                }), t.data.title = a.data.data.list.title, t.data.address = a.data.data.list.address, 
                t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
                    title: t.data.title + "-" + a.data.data.intro.name
                }), t.setData({
                    data: a.data.data.list,
                    piclist: a.data.data.piclist,
                    housepic: a.data.data.housepic,
                    houseplan: a.data.data.houseplan,
                    agentinfo: a.data.data.agentinfo,
                    issave: a.data.data.issave,
                    oldhouselist: a.data.data.houselist,
                    content: e.wxParse("article", "html", a.data.data.list.content, t, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toOldHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + t
        });
    },
    goMessage: function(a) {
        var t = this.data.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
        });
    },
    toHousemoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemoney/index"
        });
    },
    toAgentDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        0 == t ? wx.switchTab({
            url: "/weixinmao_house/pages/oldhouselist/index"
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/agentdetail/index?id=" + t
        });
    },
    goMap: function(a) {
        var t = this;
        console.log(t.data.lat), console.log(t.data.lng), wx.openLocation({
            latitude: Number(t.data.lat),
            longitude: Number(t.data.lng),
            scale: 28,
            name: t.data.title,
            address: t.data.address
        });
    },
    savehouse: function(a) {
        var t = this, e = wx.getStorageSync("userInfo"), o = t.data.id;
        i.util.request({
            url: "entry/wxapp/savehouse",
            data: {
                housetype: "oldhouse",
                pid: o,
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return console.log(this.data.id), {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/oldhousedetail/index?id=" + this.data.id
    };
}));