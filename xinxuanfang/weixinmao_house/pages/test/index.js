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
        field: [ "name", "tel" ]
    },
    onLoad: function(e) {
        this.data.id = e.id, wx.setNavigationBarTitle({
            title: "申请入驻-" + wx.getStorageSync("companyinfo").name
        });
    },
    savepubinfo: function(a) {
        var t = wx.getStorageSync("userInfo");
        console.log(t);
        var r = a.detail.formId;
        console.log(r);
        var u = {
            form_id: r
        };
        e.util.request({
            url: "entry/wxapp/Sendmsg",
            data: u,
            success: function(e) {}
        });
    },
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(a, t) {
        var r = e.util.geturl({
            url: "entry/wxapp/upload"
        }), t = t;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var u = this;
        wx.uploadFile({
            url: r,
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
                if (200 == e.statusCode) for (var r = a.data.path, o = 0; o < u.data.uploadimagelist.length; o++) o + 1 == t && (u.data.uploadimagelist[o] = r); else wx.showModal({
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
        var r, u, o, i, s, n;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var d = e.tempFilePaths;
                switch (t) {
                  case 1:
                    if (r = d, console.log(a.data.true1), 0 == a.data.true1) return;
                    a.data.true1 = !1;
                    break;

                  case 2:
                    u = d, a.data.true2 = !1;
                    break;

                  case 3:
                    o = d, a.data.true3 = !1;
                    break;

                  case 4:
                    i = d, a.data.true4 = !1;
                    break;

                  case 5:
                    s = d, a.data.true5 = !1;
                    break;

                  case 6:
                    n = d, a.data.true6 = !1;
                }
                a.setData({
                    imgurl1: r,
                    imgurl2: u,
                    imgurl3: o,
                    imgurl4: i,
                    imgurl5: s,
                    imgurl6: n,
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
        for (var r = 0; r < this.data.uploadimagelist.length; r++) r + 1 == t && (this.data.uploadimagelist[r] = "");
        console.log(this.data.uploadimagelist);
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    checkuser: function(a) {
        var t = this, a = a, r = wx.getStorageSync("userInfo");
        return console.log(r), r ? r.memberInfo.uid ? void e.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: r.sessionid,
                uid: r.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? a.doServices() : 2 == e.data.data.error && a.doElseServices();
            }
        }) : (e.util.getUserInfo(), !1) : (e.util.getUserInfo(function(e) {
            t.getlethousedetail();
        }), !1);
    }
});