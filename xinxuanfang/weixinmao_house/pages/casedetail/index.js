var o = require("../../resource/js/htmlToWxml.js"), a = getApp();

Page(function(o, a, n) {
    return a in o ? Object.defineProperty(o, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[a] = n, o;
}({
    data: {},
    onLoad: function(n) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var t = n.id;
        console.log(t);
        var e = this;
        a.util.request({
            url: "entry/wxapp/getcasedetail",
            data: {
                id: t
            },
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
                    var n;
                    n = o.html2json(a.data.data.content), e.setData({
                        data: a.data.data,
                        content: n
                    });
                }
            },
            complete: function() {
                console.log("ok"), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/index/index"
    };
}));