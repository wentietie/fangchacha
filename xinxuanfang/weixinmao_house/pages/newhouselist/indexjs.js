var t = getApp(),app=t,$=app.$;
var json={
    query:false,
    ismap: false,
    isselect:false,
    klist:[],
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isnear: false,
        isuser:1,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isTaps: !0,
        loadMore: "",
        list: [],
        houselist: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        bid: 0,
        housetype: 0,
        page: 1,
        title: "",
        price: "",
        typetitle: "",
        buildarea: "",
        tab:'',
        type:'new',
        pretitle:'新楼盘-',
        carid:0,
        priceid:0,
        ext:{}
    },
  onLoad: function (e) {
    if (this.query === false&&$.isObj(e)) this.query = $.extend(true, {}, e);
    var _d = {
          housetypelist: [],
        };
      if ((e||{}).tab){
        _d.tab = e.tab || '';
      }
      if ($.isObj(e)){
        if(e.channel){
          this.data.type=e.channel||'new';
        }
        _d.distance = parseInt(e.distance||0)||0;
        _d.isnear=_d.distance?true:this.data.isnear;
        _d.latlng=e.latlng||'';
        if (e.isnear!==undefined){
          e.isnear = parseInt(e.isnear||0)||0;
          _d.isnear=e.isnear?true:false;
        }
        for(var i in e){
          var fk='ext_';
          if(i.indexOf(fk)>-1){
            this.data.ext[i.substring(fk.length)]=e[i];
          }
        }     
      }
      _d.type=this.data.type == 'dazong' ? 'dazong' : 'new';
      if(typeof e =='object'){
        this.data.pretitle = e.pretitle || this.data.pretitle;
        _d.typeid = _d.housetype = e.housetype || 0;
        _d.fromtype = e.fromtype || '';
        _d.carid=_d.houseareaid = e.houseareaid || '';
        _d.priceid=_d.housepriceid = e.housepriceid || '';
        _d.keyword = e.keyword || '';
      }
        var t = this, a = [];
        t.data.keyword='';
      this.setData(_d), wx.setNavigationBarTitle({
            title: this.data.pretitle + wx.getStorageSync("companyinfo").name
      });
    var ee = wx.getStorageSync("userInfo");
    ee ? (t.data.isuser = !0, t.setData({
      userinfo: ee
    })) : t.data.isuser = !1, t.setData({
      isuser: t.data.isuser
    });
    t.initpage();
  },
  bindCancell: function () {
    this.setData({
      isuser: true
    });
  },
  onShow: function () {
    var a = this, e = wx.getStorageSync("cityinfo");
    var _cityid = a.data._cityid||0;
    a.data._cityid = e.name;
    var n = wx.getStorageSync("userInfo"), isuser = false;
    n && n.hasOwnProperty("wxInfo") ? isuser = !0 : isuser = !1;
    if ((_cityid && _cityid != e.name) || (!a.data.isuser && isuser)) {
      this.setData({
        isCars: !0,
        isuser: isuser,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isTaps: !0,
        loadMore: "",
        list: [],
        houselist: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        bid: 0,
        housetype: 0,
        page: 1,
        price: "",
        typetitle: "",
        buildarea: "",
        keyword: '',
        title:'',
        def:{
          title: '区域',
          price: '价格',
          type: '户型',
        }
      });
      (wx.setStorageSync("city", e.name), wx.showNavigationBarLoading(), a.initpage());
    }
  },
initpage: function() {
   var a = this, e = wx.getStorageSync("cityinfo"), u = wx.getStorageSync("userInfo")||{};a.data.page=1;
      t.util.request({
          url: "entry/wxapp/getinitinfo",
          data: {
              city: e.name,
              uid: (u.memberInfo||{}).uid ? u.memberInfo.uid:0,
              pubtype:a.data.type,
              ismap:a.ismap?1:0,
              isnear:a.data.isnear?1:0,
              distance: a.data.distance,
              latlng: a.data.latlng,
              isselect: a.isselect?1:0,
              fromtype:a.data.fromtype,
              type:'list'
          },
          success: function(t) {
              if(t.data.errno){
                return;
              }
              (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"));
              wx.setNavigationBarColor({
                  frontColor: "#ffffff",
                  backgroundColor: t.data.data.intro.maincolor,
                  animation: {
                      duration: 400,
                      timingFunc: "easeIn"
                  }
              }), wx.setStorageSync("cityinfo", t.data.data.cityinfo);
              var ismoney =0,ism=0,ispay=0;
              if (t.data.data.intro){
                  a.data.type != 'dazong' ? ismoney = parseInt(t.data.data.intro.isnewhouse || 0) : '';
                  a.data.type == 'dazong' ? ismoney = parseInt(t.data.data.intro.isdazonghouse || 0) : '';
                  ispay = parseFloat(t.data.data.intro.mmoney || 0);
              }
              if (t.data.data.member && t.data.data.member.ism) {
                ism=parseInt(t.data.data.member.ism || 0);
              }
              if (ispay&&ismoney && !ism){
                wx.redirectTo({
                  url: '../pay/index'
                })
                return ;
              }
              a.ismap?'':a.gethouselist();
              a.data.buildarea = t.data.data.buildarea;
            var d = {
              city: wx.getStorageSync("cityinfo").name,
              arealist: t.data.data.arealist,
              housepricelist: t.data.data.housepricelist,
              'def.title': t.data.data.addresstitle || a.data.title,
              'def.price': t.data.data.pricetitle || a.data.price,
              'def.type': t.data.data.typetitle || a.data.typetitle,
              placeholder: t.data.data.placeholder || a.data.placeholder || '',
              intro: t.data.data.intro,
              isyjshow: t.data.data.isyjshow || 0,
              housetypelist: t.data.data.housetypelist||[],
              distancelist: t.data.data.distancelist||[],
              distance: t.data.data.distance||0
            }
            if (a.ismap){
              a.data.center = t.data.data.center || a.data.center || {}
              a.data.isnear&&a.data.latlng ? '' : d['center'] = a.data.center || {};
              a.data.houselist = d['houselist'] = t.data.data.markers || {};
              a.data.platlist = d['platlist'] = t.data.data.platlist || {};
              $.isFun(a.setMarkers) ? a.setMarkers(true):'';
            }
            a.setData(d);
            a.klist=t.data.data.klist||[];
            if (a.data.isnear && $.isFun(a.initlatlng)) {
              a.initlatlng(t.data.data.distancetips||'');
            }
          },
          complete: function() {
              wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
          }
      });
  },
gethouselist: function(a) {
   var e = this, i = wx.getStorageSync("cityinfo").id, o = wx.getStorageSync("userInfo"), uid = ((o || {}).memberInfo||{}).uid||0;
   var d = {
     cityid: i,
     uid: uid,
     page: e.data.page,
     houseareaid: e.data.houseareaid,
     housepriceid: e.data.housepriceid,
     housetype: e.data.housetype,
     bid: e.data.bid,
     type: e.data.type,
     tab: e.data.tab,
     keyword: e.data.keyword || '',
     fromtype: e.data.fromtype || '',
     ismap: e.ismap ? 1 : 0,
     distance: e.data.distance,
     isnear:e.data.isnear?1:0,
     latlng: e.data.latlng,
     isselect: e.isselect ? 1 : 0,
   }
   if($.isObj(e.data.ext)){
     for (var fk in e.data.ext){
       if (e.data.ext[fk] != undefined 
       && e.data.ext[fk] != null 
       && e.data.ext[fk]!=NaN){
         d['ext['+fk+']'] = e.data.ext[fk];
       }
     }
   }
    t.util.request({
        url: "entry/wxapp/getnewhouselist",
        data: d,
        success: function(t) {
          if (e.data.page <= 1&&e.ismap&&e.data.isnear
            && t.data.data && $.isArr(t.data.data)
            && e.data.center&& $.isObj(e.data.center)
          ){
            t.data.data.unshift(e.data.center);
          }
          t.data.errno || $.append(e, 'houselist', t.data.data,e.data.page);
          !t.data.data || t.data.data.length<=0?e.data.page=-1:'';
          if (e.data.klist && e.data.klist.length>0)e.setData({klist:[]});
        },
        complete: function() {
            e.setData({
                loadMore: ""
            });
        }
    });
},

bindSearch:function(e){
   var kw=e.detail.value.trim();
   this.data.keyword=kw;
   this.data.page=1;
   this.gethouselist();
},
bindblur: function (e) {
  var slist = this.data.klist || [], klist = [];
  if (slist.length > 0) this.setData({ klist: klist });
},
ksearch:function(e){
  var kw= e.detail.value;
  var slist=this.data.klist||[],klist=[];
  var list=this.klist;
  if(kw.length>0){
    for(var i in list){
      var row=list[i];
      if(row.housename.indexOf(kw)>-1)klist.push(row);
      if(klist.length>10)break;
    }
  }
  if (slist.length > 0 || klist.length > 0) this.setData({ klist: klist, isCars: !0, isPrice: !0, isType: !0 });
},
bindGetUserInfo: function (a) {
    var e = this,n=t;
    n.util.getUserInfo(function (a) {
       e.data.isuser = !0;a.wxInfo=a.wxInfo||a.memberInfo||{};
      var t = a.memberInfo.uid, o = a.wxInfo.nickName||a.wxInfo.nickname, i = a.wxInfo.avatarUrl||a.wxInfo.avatar;
      e.data.uid = t, t > 0 && (e.setData({
        userinfo: a,
        isuser: e.data.isuser
      }), n.util.request({
        url: "entry/wxapp/Updateuserinfo",
        data: {
          uid: t,
          nickname: o,
          avatarUrl: i
        },
        success: function (t) {
          t.data.message.errno || (n.globalData.isuser = !0, e.setData({
            userinfo: a,
            isuser: e.data.isuser
          }));
          e.onLoad();
        }
      }));
    }, a.detail);
},
toHouseDetail: function(t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/newhousedetail/index?id=" + a
    });
},
toSearch: function(t) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/search/index"
    });
},
selectcarsitem: function(t) {
  var a = this.data.buildarea, e = t.currentTarget.id, i = t.currentTarget.dataset.title;
  this.data.page = 1;
    this.data.title = i, this.data.houseareaid = e, 0 == e ? (this.data.bid = 0, this.setData({
        carid: e,
        isCars: !0,
        title: i
    })) : this.setData({
        carid: e,
        title: i,
        isCars: !0,
        isTaps: !1,
        buildarealist: a[e]||[]
      }), this.gethouselist();
},
selectbuilditem: function(t) {
    this.data.buildarea;
  var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
  this.data.page = 1;
    this.data.title = e, this.setData({
        bid: a,
        isTaps: !0,
        isCars: !0,
        title: e
    }), this.data.bid = a, this.gethouselist();
},
selectpriceitem: function(t) {
  var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
  this.data.page = 1;
    this.data.price = e, this.setData({
        priceid: a,
        isPrice: !0,
        price: e
    }), this.data.housepriceid = a, this.gethouselist();
},
selecttypeitem: function(t) {
  var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
  this.data.page = 1;
    this.data.typetitle = e, this.setData({
        typeid: a,
        isType: !0,
        typetitle: e
    }), this.data.housetype = a, this.gethouselist();
},
onReachBottom: function(t) {
    if(this.data.page<0)return;
    this.setData({
        loadMore: "正在加载中..."
    }), this.data.page = this.data.page + 1, this.gethouselist();
},
clickSearch: function(t) {
    wx.switchTab({
        url: "/pages/search/search"
    });
},
clickList: function() {
    wx.navigateTo({
        url: "../cars/cars"
    });
},
selectCars: function(t) {
    var a = this;
    a.setData({
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isTaps: !0,
        isCars: !a.data.isCars
    });
},
selectPrice: function() {
    var t = this;
    t.setData({
        isSort: !0,
        isCars: !0,
        isType: !0,
        isPrice: !t.data.isPrice
    });
},
selectType: function() {
    var t = this;
    t.setData({
        isSort: !0,
        isCars: !0,
        isPrice: !0,
        isType: !t.data.isType
    });
},
selectSort: function() {
    var t = this;
    t.setData({
        isCars: !0,
        isPrice: !0,
        isType: !0,
        isSort: !t.data.isSort
    });
},
selectBrand: function() {
    wx.navigateTo({
        url: "../brand/brand"
    });
},
onPullDownRefresh: function() {
    wx.showNavigationBarLoading(), this.onLoad();
},
onShareAppMessage: function() {
  var t = this, q = '', query = this.query, l = ['tab', 'pretitle','fromtype'];
  $.isObj(query) ? '' : query={};
  for (var i in query){
    if(l.indexOf(i)===-1){continue;}
    q += i + '=' + query[i]+'&';
  }
    return {
        title: t.data.pretitle + wx.getStorageSync("companyinfo").name,
        path: "/" + this.route+'?'+q
    };
}
}
json.toUrl=app.toUrl;
module.exports=json;