require("../../resource/js/htmlToWxml.js"), require("../../resource/js/images.js");

var e = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "客户预约"
        });
        var t = this, a = wx.getStorageSync("companyinfo");
        "" == a.maincolor && (a.maincolor = "#3274e5"), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.maincolor,
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("userInfo");
        console.log(o), o ? (t.data.isuser = !0, t.initpage(), t.setData({
            userinfo: o
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser
        });
    },
    toPayOrder: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/payhouse/index?id=" + t
        });
    },
    initpage: function() {
        var t = this, a = wx.getStorageSync("userInfo"), o = t.data.ordertype;
        e.util.request({
            url: "entry/wxapp/myguestmsg",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid,
                ordertype: o
            },
            success: function(e) {
                e.data.message.errno || (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    list: e.data.data.list,
                    ordertype: o
                }));
            }
        });
    },
    bindGetUserInfo: function(t) {
        var a = this;
        e.util.getUserInfo(function(e) {
            console.log(e), a.data.isuser = !0, a.setData({
                userinfo: e,
                isuser: a.data.isuser
            });
        }, t.detail);
    },
    onReady: function() {},
    tabClick: function(e) {
        var t = this;
        t.data.ordertype = e.currentTarget.id, t.initpage();
    },
    delOrder: function(t) {
        var a = this, o = t.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单取消",
            content: "确认取消订单？",
            success: function(t) {
                t.confirm && e.util.request({
                    url: "entry/wxapp/delOrder",
                    data: {
                        id: o,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        console.log(e), a.onLoad();
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    payOrder: function(t) {
        var a = this, o = t.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单支付",
            content: "是否确认订单？",
            success: function(t) {
                t.confirm && e.util.request({
                    url: "entry/wxapp/repay",
                    data: {
                        id: o,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        e.data && e.data.data && wx.requestPayment({
                            timeStamp: e.data.data.timeStamp,
                            nonceStr: e.data.data.nonceStr,
                            package: e.data.data.package,
                            signType: "MD5",
                            paySign: e.data.data.paySign,
                            success: function(e) {
                                a.onLoad();
                            },
                            fail: function(e) {}
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    onShow: function() {},
    toComment: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/comment/index?id=" + t
        });
    },
    doCall: function(e) {
        console.log(e.currentTarget);
        var t = e.currentTarget.dataset.tel;
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
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        var t = t, a = wx.getStorageSync("userInfo");
        return a && a.memberInfo.uid ? void e.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(t), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (e.util.getUserInfo(), !1);
    }
});