var a = getApp(),app=a,$=app.$;

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
        selectPay:0,
        id: 0,
        showtip: "立即支付",
        paystatus: 0,
        houseinfo: [],
        houseplan: [],
        toplistinfo: null
    },
    bindpay:function(e){
       this.setData({
         selectPay: e.currentTarget.dataset.idx
       });
  },
  bindCancell: function () {
    $.toBack();
  },
    onLoad: function(a) {
      app.setIntro();
        var t = this;
      var ee = wx.getStorageSync("userInfo");
      ee ? (t.data.isuser = !0, t.setData({
        userinfo: ee
      })) : t.data.isuser = !1, t.setData({
        isuser: t.data.isuser
      });
        t.oldhouseinit();
    },
    oldhouseinit: function(t) {
        var e = this; var ee = wx.getStorageSync("userInfo")||{};
        //a.util.showLoading();
        a.util.request({
            url: "entry/wxapp/getinitinfo",
            // showLoading:false,
            data: {
                id: e.data.id,
                uid: (ee.memberInfo||{}).uid,
                type:'paymember'
            },
            success: function(a) {
                if (a.data.message.errno){
                  return;
                }
                (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5")); 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                });
                 wx.setNavigationBarTitle({
                    title: a.data.data.intro.name
                });
                e.setData(a.data.data);
            },
            complete: function() {
                wx.hideNavigationBarLoading(),wx.hideLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindAreaChange: function(a) {
        var t = this.data.arealist;
        t && (this.data.areaid = t[a.detail.value].id), this.setData({
            arealist: t,
            areaidindex: a.detail.value
        });
    },
    bindToplistChange: function(a) {
        var t = this.data.toplist, e = this.data.houseplan;
        t && (this.data.toplistid = t[a.detail.value].id);
        for (var i = 0; i < e.length; i++) e[i].id == this.data.toplistid && (this.data.toplistinfo = e[i]);
        console.log(this.data.toplistinfo), 1 == this.data.paystatus ? this.data.showtip = "支付全款" + this.data.toplistinfo.money : 2 == this.data.paystatus ? this.data.showtip = "支付定金" + this.data.toplistinfo.dmoney : this.data.showtip = "立即支付", 
        this.setData({
            toplist: t,
            showtip: this.data.showtip,
            toplistidindex: a.detail.value
        });
    },
    savepubinfo: function(t) {
        var e = this, i = wx.getStorageSync("userInfo");
        var d=t.detail.value;
         d.uid = i.memberInfo.uid;
            wx.showModal({
                title: "支付提示",
                content: "是否支付？",
                success: function(t) {
                    t.confirm && a.util.request({
                        url: "entry/wxapp/paymember",
                        data: d,
                        success: function(a) {
                            a.data && a.data.data && wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                   wx.switchTab({
                                     url: '../index/index',
                                   })
                                },
                                fail: function(a) {
                                  console.log(a);
                                }
                            });
                        }
                    });
                }
            });
  },
  bindGetUserInfo: function (aq) {
    var e = this, n = a;
    n.util.getUserInfo(function (a) {
       e.data.isuser = !0;a.wxInfo=a.wxInfo||a.memberInfo||{};
      var t = a.memberInfo.uid, o = a.wxInfo.nickName||a.wxInfo.nickname, i = a.wxInfo.avatarUrl||a.wxInfo.avatar;
      e.data.uid = t, t > 0 && (n.util.request({
        url: "entry/wxapp/Updateuserinfo",
        data: {
          uid: t,
          nickname: o,
          avatarUrl: i
        },
        success: function (t) {
          if (t && t.data && t.data.data && t.data.data.userinfo){
            var m = t.data.data.userinfo;
            if (m.ism){
             return $.toBack();
            }
          }
          t.data.message.errno || (n.globalData.isuser = !0, e.setData({
            userinfo: a,
            isuser: e.data.isuser
          }));
          e.onLoad();
        }
      }));
    }, aq.detail);
  },
    radioChange: function(a) {
        var t = this;
        t.data.paystatus = a.detail.value, console.log(t.data.toplistid), console.log(t.data.houseplan), 
        t.data.houseplan && (1 == t.data.paystatus ? t.data.showtip = "支付全款" + t.data.houseplan.money : 2 == t.data.paystatus ? t.data.showtip = "支付定金" + t.data.houseplan.dmoney : t.data.showtip = "立即支付"), 
        t.setData({
            showtip: t.data.showtip
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    bindDateChange: function(a) {
        this.data.date = a.detail.value, console.log(a.detail.value), this.setData({
            dates: a.detail.value
        });
    },
    bindTimeChange: function(a) {
        this.data.datetime = a.detail.value, console.log(a.detail.value), this.setData({
            datetime: a.detail.value
        });
    },
    uploadimg: function(t, e) {
        var i = a.util.geturl({
            url: "entry/wxapp/upload"
        }), e = e;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: i,
            filePath: t[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(a) {
                var t = JSON.parse(a.data);
                if (200 == a.statusCode) for (var i = t.data.path, s = 0; s < o.data.uploadimagelist.length; s++) s + 1 == e && (o.data.uploadimagelist[s] = i); else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(a) {
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
    checkboxChange: function(a) {
        var t = a.detail.value;
        this.data.special = t.join(",");
    },
    checkuser: function(t) {
        var e = this, t = t, i = wx.getStorageSync("userInfo");
        return console.log(i), i ? i.memberInfo.uid ? void a.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: i.sessionid,
                uid: i.memberInfo.uid
            },
            success: function(a) {
                console.log("payyyy"), 0 == a.data.data.error ? t.doServices() : 2 == a.data.data.error && t.doElseServices();
            }
        }) : (a.util.getUserInfo(), !1) : (a.util.getUserInfo(function(a) {
            e.getlethousedetail();
        }), !1);
    }
});