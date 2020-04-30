var o = getApp();

Page({
    data: {
        msg: ""
    },
    onLoad: function(n) {
        this.data.msg = n.m;
        this.data.type = n.t;
        var a = wx.getStorageSync("companyinfo");
        this.setData({
            msg: this.data.msg,
            companyinfo: a
        }), wx.setNavigationBarTitle({
            title: n.title||"提交成功"
        });
        o.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(o) {
                o.data.message.errno || (wx.setStorageSync("companyinfo", o.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(o.data.data.intro), o.data.data.intro.maincolor || (o.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    doCall: function(o) {
        var n = o.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: n,
            success: function(o) {
                console.log("拨打电话成功！");
            },
            fail: function(o) {
                console.log(o), console.log("拨打电话失败！");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    goIndex: function(o) {
        wx.switchTab({
            url: "/weixinmao_house/pages/index/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});