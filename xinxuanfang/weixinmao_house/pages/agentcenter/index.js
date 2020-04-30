function e(e, o, t) {
    return o in e ? Object.defineProperty(e, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = t, e;
}

require("../../resource/js/htmlToWxml.js"), require("../../resource/js/images.js");

var o, t = getApp();

Page((o = {
    data: {
        showmsg: !0,
        agentinfo: []
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "经纪人中心"
        });
        var o = this, n = wx.getStorageSync("userInfo");
        t.util.request({
            url: "entry/wxapp/GetSysAgentInit",
            data: {
                sessionid: n.sessionid,
                uid: n.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(e.data.data.intro), e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), o.data.agentinfo = e.data.data.agentinfo, o.setData({
                    intro: e.data.data.intro,
                    agentinfo: e.data.data.agentinfo,
                    housemsg: e.data.data.housemsg,
                    agentrole: e.data.data.agentrole
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    toOrderlist: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + o
        });
    },
    toPubold: function(e) {
        this.data.agentinfo.lethousenum > 0 ? wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        }) : wx.showModal({
            title: "提示",
            content: "发布数量不足，请先升级套餐",
            showCancel: !1
        });
    },
    toPublet: function() {
        this.data.agentinfo.lethousenum > 0 ? wx.navigateTo({
            url: "/weixinmao_house/pages/letpub/index"
        }) : wx.showModal({
            title: "提示",
            content: "发布数量不足，请先升级套餐",
            showCancel: !1
        });
    },
    toBindUser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/binduser/index"
        });
    },
    toFxhouse: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxhouse/index"
        });
    },
    toMoneyrecord: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/moneyrecord/index"
        });
    },
    toJoinuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myletpub/index?id=0"
        });
    },
    toMyteam: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/guestmsg/index"
        });
    },
    toMyspread: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myspread/index"
        });
    },
    toMyletpub: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/myletpub/index?id=" + o
        });
    },
    toMysalepub: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/mysalepub/index?id=" + o
        });
    },
    toMyHouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhouse/index"
        });
    }
}, e(o, "toMoneyrecord", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/moneyrecord/index"
    });
}), e(o, "toAgentrole", function() {
    wx.navigateTo({
        url: "/weixinmao_house/pages/agentrole/index"
    });
}), e(o, "onShow", function() {}), e(o, "onHide", function() {}), e(o, "onUnload", function() {}), 
e(o, "onPullDownRefresh", function() {}), e(o, "binduserinfo", function(e) {
    var o = this;
    o.data.showmsg = !1;
    var n = wx.getStorageSync("userInfo");
    t.util.request({
        url: "entry/wxapp/getuserinfo",
        data: {
            sessionid: n.sessionid,
            uid: n.memberInfo.uid
        },
        success: function(e) {
            o.setData({
                user: e.data.data,
                showmsg: o.data.showmsg
            });
        }
    });
}), e(o, "saveuserinfo", function(e) {
    var o = this, n = e.detail.value.name, a = e.detail.value.tel;
    o.data.showmsg = !0;
    var i = wx.getStorageSync("userInfo");
    "" != n ? "" != a ? t.util.request({
        url: "entry/wxapp/saveuserinfo",
        data: {
            sessionid: i.sessionid,
            uid: i.memberInfo.uid,
            name: n,
            tel: a
        },
        success: function(e) {
            if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                title: "失败",
                content: e.data.msg,
                showCancel: !1
            });
            wx.showToast({
                title: "操作成功",
                icon: "success",
                duration: 2e3
            }), o.setData({
                showmsg: o.data.showmsg
            });
        }
    }) : wx.showModal({
        title: "提示",
        content: "请填写您的手机号",
        showCancel: !1
    }) : wx.showModal({
        title: "提示",
        content: "请填写您的姓名",
        showCancel: !1
    });
}), e(o, "closemsg", function(e) {
    this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
    });
}), e(o, "onReachBottom", function() {}), e(o, "toMycouponlist", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/couponlist/index"
    });
}), e(o, "Puboldhouse", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/pub/index"
    });
}), e(o, "onShareAppMessage", function() {}), e(o, "checkuser", function(e) {
    var o = this, e = e, n = wx.getStorageSync("userInfo");
    return n ? n.memberInfo.uid ? void t.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: n.sessionid,
            uid: n.memberInfo.uid
        },
        success: function(o) {
            0 == o.data.data.error ? (console.log(e), e.doServices()) : 2 == o.data.data.error && e.doServices();
        }
    }) : (console.log("tmddddsssssqqqqs1111"), t.util.getUserInfo(function(e) {
        o.setData({
            userinfo: e
        });
    }), !1) : (console.log("tmddddssssss222222"), t.util.getUserInfo(function(e) {
        o.setData({
            userinfo: e
        });
    }), !1);
}), o));