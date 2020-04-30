function e(e, o, n) {
    return o in e ? Object.defineProperty(e, o, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = n, e;
}

require("../../resource/js/htmlToWxml.js"), require("../../resource/js/images.js");

var o, n = getApp();

Page((o = {
    data: {
        showmsg: !0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "经纪人中心"
        });
        var o = this;
        n.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
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
                }), o.setData({
                    intro: e.data.data.intro
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
    toMypubs: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mypub/index"
        });
    },
    toFxrecord: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxrecord/index"
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
}), e(o, "onShow", function() {
    var e = this;
    this.checkuser({
        doServices: function() {
            var o = wx.getStorageSync("userInfo");
            console.log(o.wxInfo), e.setData({
                userinfo: o
            });
        }
    });
}), e(o, "onHide", function() {}), e(o, "onUnload", function() {}), e(o, "onPullDownRefresh", function() {}), 
e(o, "binduserinfo", function(e) {
    var o = this;
    o.data.showmsg = !1;
    var t = wx.getStorageSync("userInfo");
    n.util.request({
        url: "entry/wxapp/getuserinfo",
        data: {
            sessionid: t.sessionid,
            uid: t.memberInfo.uid
        },
        success: function(e) {
            o.setData({
                user: e.data.data,
                showmsg: o.data.showmsg
            });
        }
    });
}), e(o, "saveuserinfo", function(e) {
    var o = this, t = e.detail.value.name, a = e.detail.value.tel;
    o.data.showmsg = !0;
    var i = wx.getStorageSync("userInfo");
    "" != t ? "" != a ? n.util.request({
        url: "entry/wxapp/saveuserinfo",
        data: {
            sessionid: i.sessionid,
            uid: i.memberInfo.uid,
            name: t,
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
    var o = this, e = e, t = wx.getStorageSync("userInfo");
    return t ? t.memberInfo.uid ? void n.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: t.sessionid,
            uid: t.memberInfo.uid
        },
        success: function(o) {
            0 == o.data.data.error ? (console.log(e), e.doServices()) : 2 == o.data.data.error && e.doServices();
        }
    }) : (console.log("tmddddsssssqqqqs1111"), n.util.getUserInfo(function(e) {
        o.setData({
            userinfo: e
        });
    }), !1) : (console.log("tmddddssssss222222"), n.util.getUserInfo(function(e) {
        o.setData({
            userinfo: e
        });
    }), !1);
}), o));