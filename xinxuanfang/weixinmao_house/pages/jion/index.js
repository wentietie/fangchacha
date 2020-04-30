var e = getApp(),app=e,$=app.$,p=$.loadPage();

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
        isuser: !0,
        type:'gw',
        ptitle:'置业顾问',
        f:{
          plat:[]
        },
        selectHouse:false,
        selectplat:'',
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  }, toUrl: app.toUrl, clearImgs: p.clearImgs,
  toTap:function(e){
    var type=e.currentTarget.dataset.url||'';
    if (type==this.data.type)return;
    this.data.ptitle = type == 'sale' ? '渠道驻场' :'置业顾问';
    this.setData({ type: type, ptitle: this.data.ptitle });
    wx.setNavigationBarTitle({
      title: this.data.ptitle + "入驻" + "-" + wx.getStorageSync("companyinfo").name
    });
  },
    onLoad: function(e) {
        var a = this;
      if ($.isObj(e) && e.type =='sale'){
        this.data.type=e.type;this.data.ptitle='销售平台';
      }
        a.data.id = e.id, wx.setNavigationBarTitle({
          title: this.data.ptitle + "入驻" +"-" + wx.getStorageSync("companyinfo").name
        });
        var t = wx.getStorageSync("userInfo");
         t ? (a.data.isuser = !0, a.init(), a.setData({
            userinfo: t,
        })) : a.data.isuser = !1, a.setData({
           isuser: a.data.isuser,
           type: a.data.type,
           ptitle: a.data.ptitle,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    onShow:function(){
    },
    init: function(a) {
        var t = this, o = wx.getStorageSync("userInfo");
        e.util.request({
            url: "entry/wxapp/Getplatinit",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid,
                type:t.data.type
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
                    'f.plat': e.data.data.plat || [],
                    upimgs: e.data.data.upimgs || [],
                    uptitle: e.data.data.uptitle || [],
                    jionmsg: e.data.data.jionmsg ||{}
                }), 1 == e.data.data.error) {
                    a = e.data.data.msg;
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                } else if (2 == e.data.data.error) {
                  var a = e.data.data.msg;
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                }
            }
        });
    },
    gethouse:function(a){
      var plat = this.data.selectplat||'';
      $.toUrl('select?fromtype=' + plat+'&ext_select='+this.data.type);
    },
    setPlat:function(a){
      var v = a.currentTarget.dataset.value;
      if(v!=this.data.selectplat){
        this.setData({ selectHouse:false});
      }
      this.data.selectplat=v;
    },
    bindGetUserInfo: function(a) {
        var t = this;
        e.util.getUserInfo(function(e) {
            t.data.isuser = !0, t.setData({
                userinfo: e,
                isuser: t.data.isuser
            }), t.init();
        }, a.detail);
    },
    savepubinfo: function(a) {
      var t = this, msg=false, o = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo"), s = a.detail.value.name, r = (t.data.sex, 
        a.detail.value.tel), n = a.detail.value.qq, u = a.detail.value.address, dd = a.detail.value.content,cn=a.detail.value.cname;
       var d=a.detail.value,plat=d.plat,house=d.house,imgs=[];
       for(var _i in t.data.upimgs){
         imgs.push(t.data.upimgs[_i].s||'');
       }
       imgs=imgs.toString();
      if(t.data.type=='sale'&&!d.money){
        msg='请输入佣金';
      }
      if (!house){
        msg='请选择入驻楼盘';
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
      if(!d.check.length){
        msg='请阅读入驻规则';
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
          ptel: d.ptel||'',
          address: u||'',
          content: dd||'',
          cityid: i.id,
          platform:cn,
          plat:plat||'',
          type:t.data.type,
          house:house,
          money:d.money||'',
          imgs:imgs||'',
          wechat:d.wechat||''
      };
      e.util.request({
          url: "entry/wxapp/Saveplat",
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
                     // t.clearImgs();
                      wx.redirectTo({
                          url: "/weixinmao_house/pages/done/index?m=恭喜您提交成功，我们会尽快审核！"
                      });
                  }
              });
          }
      });
        
  },
  bindUpload: function (e) {
    var t=app,i = e.currentTarget.dataset.idx;
    var th = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var p = res.tempFilePaths[0];
        t.doUpload({
          path: p,
          success: function (e) {
            if (e.data.data.path) {
              th.setData({
                ['upimgs.[' + i + ']']: { p: p, s: e.data.data.path }
              });
            }
          }
        });
      }
    })
  },
  bindDelete: function (e) {
    var t=app, i = e.currentTarget.dataset.idx;
    var file = this.data.upimgs || [];
    var f = (file[i] || {}).s;
    this.data.upimgs[i] = [];
    this.setData({
      upimgs: this.data.upimgs
    });
    t.delUpload({ data: { 'file': f } });
  },
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
  onHide: function () { },
  onUnload: function () {
    var t=app, file = this.data.upimgs || [];
    var f = [];
    for (var i in file) {
      file[i].s ? f.push(file[i].s) : '';
    }
   // t.delUpload({ data: { 'file': f.toString() } });
  },
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