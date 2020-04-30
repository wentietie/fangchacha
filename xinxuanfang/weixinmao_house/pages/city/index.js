var t = getApp();

Page({
    data: {
        scrollHeight: "",
        toView: "#",
        type: 0
    },
    onLoad: function(a) {
        var e = this;

      if ((a || {}).tab) {
        this.data.tab = a.tab || '';
      }
        console.log(a.id), e.data.type = a.id, wx.setNavigationBarTitle({
            title: "切换城市"
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), t.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(t) {
                t.data.message.errno || (wx.setStorageSync("companyinfo", t.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(t.data.data.intro), t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), e.setData({
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        }), t.util.request({
            url: "entry/wxapp/getcitylist",
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data.firstnamelist), e.setData({
                    hotlist: t.data.data.hotlist,
                    firstnamelist: t.data.data.firstnamelist
                }));
            }
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectcity: function(t) {
      var a = this, e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.name, o = {};
       o.name = i, o.id = e, wx.setStorageSync("cityinfo", o);
        if (1 == a.data.type ){
          if (a.data.tab =='dazong'){
            wx.reLaunch({
              url: "/weixinmao_house/pages/newhouselistdz/index"
            });return;
          }
        }
      if (7 == a.data.type) {
        var pages=getCurrentPages();
        pages[pages.length-2].data.chgcity=true;
        wx.navigateBack({
          delta:1
        }); return;
      }
        1 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/newhouselist/index"
        }) : 2 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/lethouselist/index"
        }) : 0 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/index/index"
          }) : 4 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/salelist/index"
            }) : 5 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/agentlist/index"
              }) : 6 == a.data.type ? wx.reLaunch({
            url: "/weixinmao_house/pages/active/index"
                }) : wx.reLaunch({
                url: "/weixinmao_house/pages/index/index"
        });
    },
    choiceWordindex: function(t) {
        var a = t.target.dataset.wordindex;
        this.setData({
            toView: a
        });
    }
});