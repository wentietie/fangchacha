function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e, s = require("../../resource/wxParse/wxParse.js"), i = getApp();

Page((e = {
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
    }, a(t, "title", ""), a(t, "showmsg", !0), a(t, "isuser", !0), a(t, "hdimg", []), 
    a(t, "circular", !0), a(t, "indicatorDots", !1), a(t, "indicatorcolor", "#000"), 
    a(t, "vertical", !1), a(t, "imgheights", []), a(t, "imgwidth", 750), a(t, "current", 0), 
    a(t, "showpay", !0), a(t, "paytype", 0), t),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (s = a.detail.height);
        console.log(t, s);
        var s = 750 / e, i = this.data.imgheights;
        i.push(s), this.setData({
            imgheights: i
        });
    },
    bindchange: function(a) {
        console.log(a.detail.current), this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var t = this;
        if (t.data.id > 0) t.data.id; else {
            a.id;
            t.data.id = a.id;
        }
        var e = wx.getStorageSync("userInfo");
        console.log(e), e ? (t.data.isuser = !0, t.setData({
            userinfo: e
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser,
            showpay: t.data.showpay
        }), t.getlethousedetail();
    },
    toletHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/letbusinesshousedetail/index?id=" + t
        });
    },
    selectPaytype: function(a) {
        var t = this;
        t.data.paytype = a.detail.value, console.log(t.data.paytype);
    },
    goMessage: function(a) {
        var t = this.data.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
        });
    },
    savehouse: function(a) {
        var t = this, e = wx.getStorageSync("userInfo"), s = t.data.id;
        i.util.request({
            url: "entry/wxapp/savehouse",
            data: {
                housetype: "lethouse",
                pid: s,
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
    toAgentDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        0 == t ? wx.navigateTo({
            url: "/weixinmao_house/pages/lethouselist/index"
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/agentdetail/index?id=" + t
        });
    },
    showpay: function() {
        var a = this;
        a.data.showpay = !1, a.setData({
            showpay: a.data.showpay
        });
    },
    bindGetUserInfo: function(a) {
        var t = this;
        i.util.getUserInfo(function(a) {
            console.log(a), t.data.isuser = !0, t.setData({
                userinfo: a,
                isuser: t.data.isuser
            }), t.getlethousedetail();
        }, a.detail);
    },
    goMap: function(a) {
        var t = this;
        console.log("ffffff"), wx.openLocation({
            latitude: Number(t.data.lat),
            longitude: Number(t.data.lng),
            scale: 18,
            name: t.data.title,
            address: t.data.address
        });
    },
    doCall: function(a) {
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function(a) {
                console.log("拨打电话成功！");
            },
            fail: function(a) {
                console.log(a), console.log("拨打电话失败！");
            }
        });
    },
    closePay: function() {
        var a = this;
        a.data.showpay = !0, a.setData({
            showpay: a.data.showpay
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
    onShareAppMessage: function() {},
    getlethousedetail: function() {
        var a = this, t = wx.getStorageSync("userInfo");
        if (t) e = {
            id: a.data.id,
            sessionid: t.sessionid,
            uid: t.memberInfo.uid
        }; else var e = {
            id: a.data.id
        };
        i.util.request({
            url: "entry/wxapp/getletbusinesshousedetail",
            data: e,
            success: function(t) {
                t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), a.data.title = t.data.data.list.title, a.data.address = t.data.data.list.address, 
                a.data.lat = t.data.data.list.lat, a.data.lng = t.data.data.list.lng, wx.setNavigationBarTitle({
                    title: a.data.title + "-" + wx.getStorageSync("companyinfo").name
                }), a.setData({
                    data: t.data.data.list,
                    piclist: t.data.data.piclist,
                    housepic: t.data.data.housepic,
                    houseplan: t.data.data.houseplan,
                    agentinfo: t.data.data.agentinfo,
                    lethouselist: t.data.data.lethouselist,
                    content: s.wxParse("article", "html", t.data.data.list.content, a, 5),
                    ispay: t.data.data.ispay
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    }
}, a(e, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/lethousedetail/index?id=" + this.data.id
    };
}), a(e, "checkuser", function(a) {
    var t = this, a = a, e = wx.getStorageSync("userInfo");
    return console.log(e), e ? e.memberInfo.uid ? void i.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(t) {
            console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
        }
    }) : (i.util.getUserInfo(), !1) : (i.util.getUserInfo(function(a) {
        t.getlethousedetail();
    }), !1);
}), a(e, "pay", function(a) {
    var t = this, e = t.data.paytype, s = t.data.id, o = wx.getStorageSync("userInfo");
    if (0 == e) {
        wx.showModal({
            title: "确认支付",
            content: "确认支付？",
            success: function(a) {
                a.confirm && i.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        ordertype: "lethouse",
                        pid: s,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                console.log(a), t.data.showpay = !0, t.setData({
                                    ispay: 1,
                                    showpay: t.data.showpay
                                });
                            },
                            fail: function(a) {}
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    } else i.util.request({
        url: "entry/wxapp/Paylookhouse",
        data: {
            pid: s,
            sessionid: o.sessionid,
            uid: o.memberInfo.uid
        },
        success: function(a) {
            if (!a.data.message.errno) {
                if (0 != a.data.data.error) return void wx.showModal({
                    title: "提示",
                    content: a.data.data.msg,
                    showCancel: !1
                });
                t.data.showpay = !0, t.setData({
                    ispay: 1,
                    showpay: t.data.showpay
                });
            }
        }
    });
}), a(e, "saveuserinfo", function(a) {
    var t = this, e = a.detail.value.name, s = a.detail.value.tel;
    t.data.showmsg = !0;
    var o = wx.getStorageSync("userInfo");
    "" != e ? "" != s ? i.util.request({
        url: "entry/wxapp/saveuserinfo",
        data: {
            sessionid: o.sessionid,
            uid: o.memberInfo.uid,
            name: e,
            tel: s
        },
        success: function(a) {
            if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                title: "失败",
                content: a.data.msg,
                showCancel: !1
            });
            wx.showToast({
                title: "操作成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                showmsg: t.data.showmsg
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
}), a(e, "closemsg", function(a) {
    this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
    });
}), e));