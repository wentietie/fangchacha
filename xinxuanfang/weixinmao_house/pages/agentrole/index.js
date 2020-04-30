var a = getApp(), t = 0, n = 0, e = 0;

Page({
    data: {
        id: 0,
        mymoney: 0,
        disabled: !1,
        curNav: 1,
        curIndex: 0,
        cart: [],
        cartTotal: 0,
        lockhidden: !0,
        yajinhidden: !0,
        sucmoney: 424,
        color: "limegreen",
        nocancel: !1,
        tajinmodaltitle: "押金充值",
        yajinmodaltxt: "去充值",
        yajinmoney: 0,
        yajintxt: "您是否确定充值押金299元？押金充值后可以在摩拜单车App全额退款"
    },
    selectNav: function(a) {
        var t = this, n = a.target.dataset.id;
        t.data.id = n;
        var e = parseInt(a.target.dataset.index);
        parseInt(a.target.dataset.money);
        self = this, this.setData({
            curNav: n,
            curIndex: e
        });
    },
    onLoad: function() {
        n = 424, wx.setNavigationBarTitle({
            title: "升级套餐"
        });
        var e = this, i = wx.getStorageSync("userInfo");
        a.util.request({
            url: "entry/wxapp/GetAgentrole",
            data: {
                sessionid: i.sessionid,
                uid: i.memberInfo.uid
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
                }), console.log(a.data.data.moneylist), e.setData({
                    navList: a.data.data.moneylist
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        }), this.setData({
            mymoney: t
        });
    },
    buttonEventHandle: function(a) {},
    pay: function(t) {
        var n = this, e = n.data.id, i = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "确认支付",
            content: "确认支付金额？",
            success: function(t) {
                t.confirm && a.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        ordertype: "payagentrole",
                        pid: e,
                        sessionid: i.sessionid,
                        uid: i.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                console.log(a), n.setData({
                                    ispay: 1
                                }), wx.redirectTo({
                                    url: "/weixinmao_zp/pages/companylogin/index"
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
    },
    goblance: function(a) {
        t += n, this.setData({
            lockhidden: !1,
            mymoney: t,
            sucmoney: n
        });
    },
    confirm: function() {
        this.setData({
            lockhidden: !0
        });
    },
    yajin: function(a) {
        this.setData({
            yajinhidden: !1
        });
    },
    yajincancel: function(a) {
        this.setData({
            yajinhidden: !0
        });
    },
    yajinconfirm: function(a) {
        0 == e ? (e = 1, this.setData({
            nocancel: !0,
            yajintxt: "您已成功充值押金299元",
            tajinmodaltitle: "充值成功",
            yajinmodaltxt: "完成"
        })) : (e = 0, this.setData({
            nocancel: !1,
            yajinhidden: !0,
            yajinmoney: 299
        })), this.setData({
            nocancel: !0
        });
    }
});