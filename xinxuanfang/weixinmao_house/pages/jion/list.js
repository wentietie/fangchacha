var app = getApp(), $ = app.$, json = $.extend(true, {}, app.load('lib/page.js'));
var url ="../newhouselist1/index?tab=new&pretitle=入驻楼盘";
url ='../newhousedetail/gw?isjion=1';
var nav={
  '1':'已入驻',
  '0':'审核中',
  '-1':'未通过'
}
json.data = { ext_data:'&fromtype='};
var list=[
  {
    title:'置业顾问入驻',
    list:'gw'
  }, {
    title: '渠道驻场入驻',
    list: 'sale'
  }
]
for(var i in list){
  var r = list[i].list; list[i].list=[];
  for(var j in nav){
    list[i].list.push({
      title:nav[j],
      url: url + '&type=' + r+'&status='+j
    });
  }
}
json.data.list=list;
json.toTap=function(e){
  this.setData({
    ext_data: '&fromtype=' + e.currentTarget.dataset.value
  });
}
json.onLoad=function(a){
  var t = this,e=app, o = wx.getStorageSync("userInfo");
  e.util.request({
    url: "entry/wxapp/Getplat",
    data: {},
    success: function (e) {
       if (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"),
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: e.data.data.intro.maincolor,
          animation: {
            duration: 400,
            timingFunc: "easeIn"
          }
        }), t.setData({
          intro: e.data.data.intro,
          tab: e.data.data.plat || []
        })){
      }
    }
  });
}
Page(json)