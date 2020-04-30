require("../../resource/js/htmlToWxml.js"), require("../../resource/wxParse/wxParse.js");

var a = getApp();

Page(function(a, t, n) {
    return t in a ? Object.defineProperty(a, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = n, a;
}({
    data: {
        id: 0,
        title: ""
    },
    onLoad: function(t) {
        var n = this;
        a.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(a) {
                if (!a.data.message.errno) {
                    a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: a.data.data.intro.maincolor,
                        animation: {
                            duration: 400,
                            timingFunc: "easeIn"
                        }
                    });
                    n.data.title = "房源发布协议-" + a.data.data.intro.name, wx.setNavigationBarTitle({
                        title: n.data.title
                    }), n.setData({
                        data: a.data.data.intro
                    });
                }
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/newsdetail/index?id=" + this.data.id
    };
}));