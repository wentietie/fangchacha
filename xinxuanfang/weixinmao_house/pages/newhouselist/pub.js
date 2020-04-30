var t = getApp(),app=t;

Page({
    data: {
      ismaster:1,
      isuser:1,
  },
  bindCancell: function () {
    wx.navigateBack({
      delta: 1
    });
  },
    onLoad: function(t) {
        var a = this;
        if(t){
          a.data.pubtype=t.pubtype;
        }
        wx.setNavigationBarTitle({
            title: "发布"+(a.data.pubtype=='dazong'?'大宗物业':'楼盘')+"-" + wx.getStorageSync("companyinfo").name
      }); app.setIntro();
        var e = wx.getStorageSync("userInfo");
         e ? (a.data.isuser = !0, a.oldhouseinit(), a.setData({
            userinfo: e
        })) : a.data.isuser = !1, a.setData({
            isuser: a.data.isuser
        }), a.setData({
            isuser: a.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(a) {
        var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
        t.util.request({
            url: "entry/wxapp/Getpubinit",
            data: {
                cityid: i.id,
                sessionid: s.sessionid,
                uid: s.memberInfo.uid,
                pubtype:e.data.pubtype||'new'
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
                }), 0 == t.data.data.ismaster && (e.data.ismaster = !1, e.setData({
                    ismaster: e.data.ismaster
                  })), e.data.buildareainfo = t.data.data.buildareainfo, e.setData(t.data.data));
              if (t.data.data.intro.tips) {
                wx.showModal({
                  title: '早报',
                  content: t.data.data.intro.tips,
                  showCancel: false
                })
              }
            }
        });/* t.getLocationInfo(function(t) {
            e.setData({
                longitude: t.longitude,
                latitude: t.latitude,
                markers: [ {
                    id: 0,
                    iconPath: "../../resource/images/marker_checked.png",
                    longitude: t.longitude,
                    latitude: t.latitude,
                    width: 30,
                    height: 30
                } ]
            });
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    map_width: t.windowWidth,
                    map_height: t.windowWidth,
                    controls: [ {
                        id: 1,
                        iconPath: "../../resource/images/marker_checked.png",
                        position: {
                            left: t.windowWidth / 2 - 8,
                            top: t.windowWidth / 2 - 16,
                            width: 30,
                            height: 30
                        },
                        clickable: !0
                    } ]
                });
            }
        });*/
    }, 
    bindPickerChange:function(e){
        var d=e.currentTarget.dataset;
        this.setData({
          [d.item]:d.data[e.detail.value]
        });
    },
    bindGetUserInfo: function(a) {
        var e = this;
        t.util.getUserInfo(function(t) {
            console.log(t), e.data.isuser = !0, e.setData({
                userinfo: t,
                isuser: e.data.isuser
            }), e.oldhouseinit();
        }, a.detail);
    },
    toMessage: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/message/index"
        });
    },
    savepubinfo: function(a) {
      var e = this, s = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
      if (e.data.loadding) {
        return;
      }
      var d = {
        cityid: i.id,
        sessionid: s.sessionid,
        method: 'post',
        uid: s.memberInfo.uid,
        op: 'post',
        'd[cityid]':i.id,
        'd[channel]': e.data.pubtype || 'new'
      };
      if (!a.detail.value.doagree.length) {
        wx.showModal({
          title: '',
          content: '请同意房屋委托协议'
        });
         return;
      }
      delete a.detail.value.doagree
      for (var i in a.detail.value) {
        d['d[' + i + ']'] = a.detail.value[i].toString();
      }
      e.data.loadding = true;
      wx.showLoading({ mask: true });
      t.util.request({
        url: "entry/wxapp/NewhousePub",
        data: d,
        success: function (t) {
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: t.data.message,
            showCancel:false,
            success:function(){
              if (!t.data.errno && t.data.errno != undefined) {
                for (var i in e.data.upimgs) {
                  e.data.upimgs[i] = [];
                }
                e.setData({
                  upimgs: e.data.upimgs
                });
              }
              wx.navigateBack({ delta: 1 });
            }
          });
        }, complete: function () {
          e.data.loadding = false;
        }
      });
  },
  bindUpload: function (e) {
    var i = e.currentTarget.dataset.idx;
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
    var i = e.currentTarget.dataset.idx;
    var file = this.data.upimgs || [];
    var f = (file[i] || {}).s;
    this.data.upimgs.splice(i, 1);
    this.data.upimgs.push([]);
    this.setData({
      upimgs: this.data.upimgs
    });
    t.delUpload({ data: { 'file': f } });
  },
    bindMap:function(){
      var t=this;
      wx.chooseLocation({
        success:function(r){
          t.setData({map:r});
        }
      });
    },
    onPullDownRefresh:function(){
      this.onLoad();
    },
    onReady: function() {},
    onShow: function() {},
  onHide: function () { },
  onUnload: function () {
    var file = this.data.upimgs || [];
    var f = [];
    for (var i in file) {
      file[i].s ? f.push(file[i].s) : '';
    }
    t.delUpload({ data: { 'file': f.toString() } });
  },
    checkuser: function(a) {
        var e = this, a = a, s = wx.getStorageSync("userInfo");
        return console.log(s), s ? s.memberInfo.uid ? void t.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: s.sessionid,
                uid: s.memberInfo.uid
            },
            success: function(t) {
                console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
            }
        }) : (t.util.getUserInfo(), !1) : (t.util.getUserInfo(function(t) {
            e.getlethousedetail();
        }), !1);
    }
});