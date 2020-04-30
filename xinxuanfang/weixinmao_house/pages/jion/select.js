var t = getApp(),app=t,$=app.$, jsons = require('../newhouselist/indexjs.js');
var json = $.extend(true,{},jsons);
json.isselect=true;
json.data.pretitle = '选择楼盘-';
json._toHouseDetail = json.toHouseDetail;
json.toHouseDetail=function(a){
  var id = a.currentTarget.dataset.id;
  var pages=getCurrentPages();
  for (var i in this.data.houselist){
    var row = this.data.houselist[i];
    if(id==row.id){
      pages[pages.length-2].setData({
        selectHouse:row
      });
      $.toBack();
      break;
    }
  }
}
delete json.onShareAppMessage;
Page(json);