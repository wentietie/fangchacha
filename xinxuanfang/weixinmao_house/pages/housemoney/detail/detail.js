var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = require("../../../resource/js/calculatorForHouseLoan.js"), e = getApp();

Page({
    data: {
        tabs: [ "等额本息", "等额本金", "本息/本金" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        hiddenDetail: !0,
        parentActiveIndex: 0,
        commercialTotal: 0,
        gjjTotal: 0,
        interestRatePerMou0: 0,
        interestRatePerMou1: 0,
        totalMouths: 0,
        loanTotal: 0,
        totalInterestAi: 0,
        totalRepayAi: 0,
        repayPerMouAi: 0,
        totalInterestAp: 0,
        totalRepayPriceAp: 0,
        repayPerMouthAp: 0,
        decreasePerMouAp: 0,
        repayPerMouObjAi: {},
        repayPerMouObjAp: {}
    },
    showDetail: function() {
        this.data.hiddenDetail = !this.data.hiddenDetail, this.setData({
            hiddenDetail: this.data.hiddenDetail
        });
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "数据加载中...",
            mask: !0
        }), e.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(t) {
                t.data.message.errno || (wx.setStorageSync("companyinfo", t.data.data.intro), wx.setNavigationBarTitle({
                    title: "房贷计算器"
                }), console.log(t.data.data.intro), t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), d.setData({
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
        var i;
        if (0 == o.parentActiveIndex) i = a.calculate(+o.commercialTotal, +o.interestRatePerMou0 / 12, +o.totalMouths); else if (1 == o.parentActiveIndex) i = a.calculate(+o.gjjTotal, +o.interestRatePerMou1 / 12, +o.totalMouths); else {
            var n = a.calculate(+o.commercialTotal, +o.interestRatePerMou0 / 12, +o.totalMouths);
            i = a.calculate(+o.gjjTotal, +o.interestRatePerMou1 / 12, +o.totalMouths);
            for (var r in i) if (i.hasOwnProperty(r)) if ("string" == typeof i[r]) i[r] = (+i[r] + +n[r]).toFixed(2); else for (var s in i[r]) if (i[r].hasOwnProperty(s)) for (var l = 0; l < i[r][s].length; l++) i[r][s][l] = (+i[r][s][l] + +n[r][s][l]).toFixed(2);
        }
        console.log(i), this.setData(t({}, o, i), function() {
            wx.hideLoading();
        });
        var d = this;
        wx.getSystemInfo({
            success: function(t) {
                d.setData({
                    sliderLeft: (t.windowWidth / d.data.tabs.length - 96) / 2,
                    sliderOffset: t.windowWidth / d.data.tabs.length * d.data.activeIndex
                });
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
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
    }
});