var a = getApp(),app=a,$=app.$;

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        page: 1,
        loadMore: "",
        pid: 0
  },
  swiperChange: function (a) {
    this.setData({
      swiperCurrent: a.detail.current
    });
  }, 
    toUrl:a.toUrl,
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "房产资讯-" + wx.getStorageSync("companyinfo").name
        });
        var e = this;
        a.util.request({
            url: "entry/wxapp/getbanner",
            success: function(a) {
                a.data.message.errno || e.setData({
                    banners: a.data.data
                });
            }
        }), e.getnewslist();
    },
    getnewslist: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/getarticle",
            data: {
                page: t.data.page
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
                }), t.setData({
                    category: a.data.data.category,
                    article: a.data.data.article,
                    activeCategoryId: a.data.data.activeCategoryId
                }));
            },
            complete: function() {
                t.setData({
                    loadMore: ""
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    getsecondlist: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: t.data.pid,
                page: t.data.page
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    article: a.data.data,
                    activeCategoryId: t.data.pid
                });
            },
            complete: function() {
                t.setData({
                    loadMore: ""
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(t) {
        var e = this, n = t.currentTarget.id;
        e.data.pid = n, e.data.page = 1, a.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: n,
                page: e.data.page
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    article: a.data.data,
                    activeCategoryId: n
                });
            }
        });
    },
    toNewsDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/newsdetail/index?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getnewslist();
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, this.data.pid > 0 ? this.getsecondlist() : this.getnewslist();
    },
    onShareAppMessage: function() {
        return {
            title: "房产资讯-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/article/index"
        };
    }
});