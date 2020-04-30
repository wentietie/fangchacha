var t = getApp();

Page({
    data: {
        title: "",
        special: "",
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        arealist: [],
        toplist: [],
        areaid: 0,
        toplistid: 0,
        date: "",
        datetime: "",
        id: 0,
        showtip: "提交预约",
        paystatus: 0,
        houseinfo: [],
        houseplan: [],
        toplistinfo: null,
        typeid: 0
    },
    onLoad: function(t) {
        var a = this;
        if (wx.setNavigationBarTitle({
            title: "预约看房"
        }), this.data.id > 0) this.data.id; else {
            t.id;
            this.data.id = t.id;
        }
        a.data.typeid = t.typeid, a.oldhouseinit();
    },
    oldhouseinit: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/gethousedetail",
            data: {
                id: e.data.id,
                typeid: e.data.typeid
            },
            success: function(t) {
                t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), e.data.houseplan = t.data.data.houseplan, e.setData({
                    typeid: e.data.typeid,
                    data: t.data.data.list,
                    toplist: t.data.data.houseplan,
                    showtip: e.data.showtip
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindAreaChange: function(t) {
        var a = this.data.arealist;
        a && (this.data.areaid = a[t.detail.value].id), this.setData({
            arealist: a,
            areaidindex: t.detail.value
        });
    },
    bindToplistChange: function(t) {
        var a = this.data.toplist, e = this.data.houseplan;
        a && (this.data.toplistid = a[t.detail.value].id);
        for (var i = 0; i < e.length; i++) e[i].id == this.data.toplistid && (this.data.toplistinfo = e[i]);
        console.log(this.data.toplistinfo), 1 == this.data.paystatus ? this.data.showtip = "支付全款" + this.data.toplistinfo.money : 2 == this.data.paystatus ? this.data.showtip = "支付定金" + this.data.toplistinfo.dmoney : this.data.showtip = "提交预约", 
        this.setData({
            toplist: a,
            showtip: this.data.showtip,
            toplistidindex: t.detail.value
        });
    },
    savepubinfo: function(a) {
        var e, i = this, o = wx.getStorageSync("userInfo"), s = i.data.id, n = i.data.typeid, d = i.data.toplistid, l = a.detail.value.name, u = a.detail.value.tel, h = a.detail.value.content;
        if ("" != s) if (0 != n || 0 != d) if (e = 0 == n ? "newhouse" : 1 == n ? "oldhouse" : "lethouse", 
        "" != l) if ("" != u) {
            var r = {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid,
                houseid: s,
                toplistid: d,
                typeid: n,
                name: l,
                tel: u,
                content: h,
                type: e
            };
            t.util.request({
                url: "entry/wxapp/savehousemessage",
                data: r,
                success: function(t) {
                    if (0 != t.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                    0 == t.data.data.error ? wx.showToast({
                        title: t.data.data.msg,
                        icon: "success",
                        duration: 2e3,
                        success: function(t) {
                            console.log(t), wx.navigateTo({
                                url: "/weixinmao_house/pages/myhousemsg/index"
                            });
                        }
                    }) : wx.showModal({
                        title: "失败",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入联系人",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择户型",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "楼盘不存在",
            showCancel: !1
        });
    },
    radioChange: function(t) {
        var a = this;
        a.data.paystatus = t.detail.value, console.log(a.data.toplistid), console.log(a.data.houseplan), 
        a.data.toplistinfo && (1 == a.data.paystatus ? a.data.showtip = "支付全款" + a.data.toplistinfo.money : 2 == a.data.paystatus ? a.data.showtip = "支付定金" + a.data.toplistinfo.dmoney : a.data.showtip = "提交预约"), 
        a.setData({
            showtip: a.data.showtip
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindDateChange: function(t) {
        this.data.date = t.detail.value, console.log(t.detail.value), this.setData({
            dates: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.data.datetime = t.detail.value, console.log(t.detail.value), this.setData({
            datetime: t.detail.value
        });
    },
    uploadimg: function(a, e) {
        var i = t.util.geturl({
            url: "entry/wxapp/upload"
        }), e = e;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: i,
            filePath: a[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(t) {
                var a = JSON.parse(t.data);
                if (200 == t.statusCode) for (var i = a.data.path, s = 0; s < o.data.uploadimagelist.length; s++) s + 1 == e && (o.data.uploadimagelist[s] = i); else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    checkboxChange: function(t) {
        var a = t.detail.value;
        this.data.special = a.join(",");
    },
    checkuser: function(a) {
        var e = this, a = a, i = wx.getStorageSync("userInfo");
        return console.log(i), i ? i.memberInfo.uid ? void t.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: i.sessionid,
                uid: i.memberInfo.uid
            },
            success: function(t) {
                console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
            }
        }) : (t.util.getUserInfo(), !1) : (t.util.getUserInfo(function(t) {
            e.getlethousedetail();
        }), !1);
    }
});