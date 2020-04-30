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
        toplistinfo: null
    },
    onLoad: function(t) {
        var a = this;
        if (wx.setNavigationBarTitle({
            title: "维修申请"
        }), this.data.id > 0) this.data.id; else {
            t.id;
            this.data.id = t.id;
        }
        a.oldhouseinit();
    },
    oldhouseinit: function(a) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/getnewhousedetail",
            data: {
                id: i.data.id
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
                }), i.data.title = t.data.data.list.housename, i.data.address = t.data.data.list.houseaddress, 
                i.data.lat = t.data.data.list.lat, i.data.lng = t.data.data.list.lng, i.data.houseinfo = t.data.data.list, 
                i.data.houseplan = t.data.data.houseplan, wx.setNavigationBarTitle({
                    title: t.data.data.intro.name
                }), i.setData({
                    data: t.data.data.list,
                    toplist: t.data.data.houseplan,
                    showtip: i.data.showtip
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
        var a = this.data.toplist, i = this.data.houseplan;
        a && (this.data.toplistid = a[t.detail.value].id);
        for (var e = 0; e < i.length; e++) i[e].id == this.data.toplistid && (this.data.toplistinfo = i[e]);
        console.log(this.data.toplistinfo), 1 == this.data.paystatus ? this.data.showtip = "支付全款" + this.data.toplistinfo.money : 2 == this.data.paystatus ? this.data.showtip = "支付定金" + this.data.toplistinfo.dmoney : this.data.showtip = "提交预约", 
        this.setData({
            toplist: a,
            showtip: this.data.showtip,
            toplistidindex: t.detail.value
        });
    },
    savepubinfo: function(a) {
        var i = this, e = wx.getStorageSync("userInfo"), o = a.detail.value.name, s = a.detail.value.tel, n = a.detail.value.content;
        if ("" != o) if ("" != s) if ("" != n) {
            var d = {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid,
                id: i.data.id,
                name: o,
                tel: s,
                content: n
            };
            t.util.request({
                url: "entry/wxapp/savecomplain",
                data: d,
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
                                url: "/weixinmao_house/pages/agentdetail/index?id=" + i.data.id
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
            content: "请输入投诉内容",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入联系人",
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
    uploadimg: function(a, i) {
        var e = t.util.geturl({
            url: "entry/wxapp/upload"
        }), i = i;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: e,
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
                if (200 == t.statusCode) for (var e = a.data.path, s = 0; s < o.data.uploadimagelist.length; s++) s + 1 == i && (o.data.uploadimagelist[s] = e); else wx.showModal({
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
        var i = this, a = a, e = wx.getStorageSync("userInfo");
        return console.log(e), e ? e.memberInfo.uid ? void t.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(t) {
                console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
            }
        }) : (t.util.getUserInfo(), !1) : (t.util.getUserInfo(function(t) {
            i.getlethousedetail();
        }), !1);
    }
});