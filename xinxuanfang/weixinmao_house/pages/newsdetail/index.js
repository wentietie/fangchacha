require("../../resource/js/htmlToWxml.js");

var a = require("../../resource/wxParse/wxParse.js"), t = getApp();

Page(function(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}({
    data: {
        id: 0,
        title: ""
    },toUrl:t.toUrl,
    onLoad: function(e) {
        if (this.data.id > 0) n = this.data.id; else {
            var n = e.id;
            this.data.id = e.id;
        }
        console.log(n);
        var i = this,_c;
        t.util.request({
            url: "entry/wxapp/getnewsdetail",
            data: {
                id: n
            },
            success: function(t) {
                if (!t.data.message.errno) {
                    t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: t.data.data.intro.maincolor,
                        animation: {
                            duration: 400,
                            timingFunc: "easeIn"
                        }
                    });
                  _c = t.data.data.content; delete t.data.data.content;
                    i.data.title = t.data.data.title + "-" + t.data.data.intro.name, wx.setNavigationBarTitle({
                        title: i.data.title
                    }), i.setData({
                        data: t.data.data
                      }), a.wxParse("article", "html", _c, i, 5);
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