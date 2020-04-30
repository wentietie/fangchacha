var e = getApp();

Page({
    data: {
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        sex: -1,
        id: 0,
        isuser: !0
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
    onLoad: function(e) {
        var a = this;
        a.data.id = e.id, wx.setNavigationBarTitle({
            title: "申请入驻-" + wx.getStorageSync("companyinfo").name
        });
        var t = wx.getStorageSync("userInfo");
         t ? (a.data.isuser = !0, a.oldhouseinit(), a.setData({
            userinfo: t
        })) : a.data.isuser = !1, a.setData({
            isuser: a.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(a) {
        var t = this, o = wx.getStorageSync("userInfo");
        e.util.request({
            url: "entry/wxapp/Getagentinit",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno) if (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    intro: e.data.data.intro,
                    msg:e.data.data.msg
                }), 1 == e.data.data.error) {
                    a = "您已申请过发布信息，并已审核通过！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                } else if (2 == e.data.data.error) {
                  var a = "正在审核,请耐心等待！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                }
            }
        });
    },
    bindGetUserInfo: function(a) {
        var t = this;
        e.util.getUserInfo(function(e) {
            t.data.isuser = !0, t.setData({
                userinfo: e,
                isuser: t.data.isuser
            }), t.oldhouseinit();
        }, a.detail);
    },
    savepubinfo: function(a) {
      var t = this, msg=false, o = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo"), s = a.detail.value.name, r = (t.data.sex, 
        a.detail.value.tel), n = a.detail.value.qq, u = a.detail.value.address, d = a.detail.value.content,cn=a.detail.value.cname;
      if (!u) {
        msg = '请填写地址';
      } 
      if (!r) {
        msg = '请填写手机号码';
      }
      if (!s) {
        msg='请填写姓名';
      }
      if (!cn) {
        msg = '请填写公司名称';
      }
      if(msg){
        wx.showModal({
          title: "提示",
          content: msg,
          showCancel: !1
        });
        return false;
      }           
      var  f = {
          sessionid: o.sessionid,
          uid: o.memberInfo.uid,
          name: s,
          tel: r,
          address: u,
          content: d,
          cityid: i.id,
          companyname:cn
      };
      e.util.request({
          url: "entry/wxapp/Saveagent",
          data: f,
          success: function(e) {
              if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                  title: "失败",
                  content: e.data.data.msg,
                  showCancel: !1
              });
              wx.showToast({
                  title: "提交成功",
                  icon: "success",
                  duration: 2e3,
                  success: function(e) {
                      wx.redirectTo({
                          url: "/weixinmao_house/pages/done/index?m=恭喜您提交成功，我们会尽快审核！"
                      });
                  }
              });
          }
      });
        
    },
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    uploadimg: function(a, t) {
        var o = e.util.geturl({
            url: "entry/wxapp/upload"
        }), t = t;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var i = this;
        wx.uploadFile({
            url: o,
            filePath: a[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var a = JSON.parse(e.data);
                if (200 == e.statusCode) for (var o = a.data.path, s = 0; s < i.data.uploadimagelist.length; s++) s + 1 == t && (i.data.uploadimagelist[s] = o); else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
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
    upload: function(e) {
        var a = this, e = e;
        a.checkuser({
            doServices: function() {
                a.doupload(e);
            },
            doElseServices: function() {
                a.doupload(e);
            }
        });
    },
    doupload: function(e) {
        var a = this, t = parseInt(e.currentTarget.dataset.id);
        switch (t) {
          case 1:
            if (0 == a.data.true1) return;
            break;

          case 2:
            if (0 == a.data.true2) return;
            break;

          case 3:
            if (0 == a.data.true3) return;
            break;

          case 4:
            if (0 == a.data.true4) return;
            break;

          case 5:
            if (0 == a.data.true5) return;
            break;

          case 6:
            if (0 == a.data.true6) return;
        }
        var o, i, s, r, n, u;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var d = e.tempFilePaths;
                switch (t) {
                  case 1:
                    if (o = d, console.log(a.data.true1), 0 == a.data.true1) return;
                    a.data.true1 = !1;
                    break;

                  case 2:
                    i = d, a.data.true2 = !1;
                    break;

                  case 3:
                    s = d, a.data.true3 = !1;
                    break;

                  case 4:
                    r = d, a.data.true4 = !1;
                    break;

                  case 5:
                    n = d, a.data.true5 = !1;
                    break;

                  case 6:
                    u = d, a.data.true6 = !1;
                }
                a.setData({
                    imgurl1: o,
                    imgurl2: i,
                    imgurl3: s,
                    imgurl4: r,
                    imgurl5: n,
                    imgurl6: u,
                    true1: a.data.true1,
                    true2: a.data.true2,
                    true3: a.data.true3,
                    true4: a.data.true4,
                    true5: a.data.true5,
                    true6: a.data.true6
                }), a.data.imagelist.push(d), a.uploadimg(d, t);
            }
        });
    },
    delupload: function(e) {
        var a = this, t = parseInt(e.currentTarget.dataset.id);
        switch (t) {
          case 1:
            a.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            a.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            a.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            a.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            a.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            a.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var o = 0; o < this.data.uploadimagelist.length; o++) o + 1 == t && (this.data.uploadimagelist[o] = "");
        console.log(this.data.uploadimagelist);
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    checkuser: function(a) {
        var t = this, a = a, o = wx.getStorageSync("userInfo");
        return console.log(o), o ? o.memberInfo.uid ? void e.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? a.doServices() : 2 == e.data.data.error && a.doElseServices();
            }
        }) : (e.util.getUserInfo(), !1) : (e.util.getUserInfo(function(e) {
            t.getlethousedetail();
        }), !1);
    }
});