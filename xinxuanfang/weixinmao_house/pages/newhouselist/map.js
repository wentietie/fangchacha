var t = getApp(), app = t, $ = app.$, jsons = require('../newhouselist/indexjs.js');
var json = $.extend(true, {}, jsons);
var _markers = false, _center = false, _fromtype=false;
json.data.pretitle = '地图找房-';
json.data.plattype='';
json.ismap=true;
delete json.onReachBottom;
json.initlatlng = function (distancetips){
  var latlng=this.data.latlng||'',t=this;
  latlng = $.trim(latlng);
  if (latlng == ',') latlng='';
  _center.type='center';
  if (latlng){
    latlng = latlng.split(',');
    _center.latitude=latlng[0] = parseFloat(latlng[0]);
    _center.longitude=latlng[1] = parseFloat(latlng[1]);
    t.setData({center: _center });
    t.gethouselist();
  }else{
    $.getLocation(function (r) {
      latlng = t.data.latlng= r.latitude + ',' + r.longitude;
      _center.latitude = r.latitude, _center.longitude=r.longitude;
      t.setData({latlng:latlng,center:_center});
      t.gethouselist();
    });
  }
  if (distancetips){
    setTimeout(function(){
      $.alert(distancetips);
    },1000);
    //wx.setStorageSync("distancetips", true);
  }
}
json.maptap=function(e){
  var id = e.markerId,t=this;
  var center = this.setMarkers(id);
  if (center.type=='center'){
    $.chooseLocation([center.latitude, center.longitude], function (r) {
      var latlng=t.data.latlng = r.latitude + ',' + r.longitude;
      _center.latitude = r.latitude, _center.longitude = r.longitude;
      t.setData({ latlng: latlng, center: _center });
      t.gethouselist();
    });
  }
  else if(center.type=='house'){
    $.toUrl('../newhousedetail/index?id='+id);
  }else{
    this.selectcarsitem(center);
  }
}
json.setMarkers=function(id){
  var list = this.data.houselist;
  if (_center == false||id===true) _center = $.extend(true, {}, this.data.center);
  if (_markers == false||id === true) _markers = $.extend(true, [], this.data.houselist);
  if (id === undefined || id === true)return false;
  for(var i in list){
    if(list[i]&&list[i].id==id)return $.extend(true,{},list[i]);
  }
  return false;
}
json.selectcarsitem= function(t) {
    var a = this.data.buildarea, e, i, center ;
    if (t.currentTarget==undefined){
      e = t.id, i = t.title, center=t;
    }else{
      e = t.currentTarget.id, i = t.currentTarget.dataset.title;
      center = this.setMarkers(e); 
    }
    this.data.page = 1;
    this.data.title = i, this.data.houseareaid = e, 0 == e ? this.data.bid = 0:'';
    var d={};
  if (e == 0) {
    d = { carid: e, isCars: !0, title: '', center: _center, houselist: [] }
    if (_fromtype != this.data.fromtype && _fromtype !== false) {
        this.setData(d),this.initpage();
        return;
    }
    d.houselist = _markers;
    }else{
      d = {
        carid: e,title: i,isCars: !0,isTaps: !1,buildarealist: a[e] || [],center: center || _center,
      }
      this.gethouselist();
  }
    this.setData(d);
};
json.bindSearch=function(e) {
    var kw = e.detail.value.trim();
    var carid=this.data.carid||0,houselist=this.data.houselist||[];
  if (this.ismap && kw.length < 1 
  && carid == 0) {
      this.selectcarsitem({ id: 0, title:''});
      return;
    }
    this.data.keyword = kw;
    this.data.page = 1;
    this.gethouselist();
}
json.toTap= function (e) {
    var type = e.currentTarget.dataset.url || '';
    if (type == this.data.fromtype) return;
    _fromtype=this.data.fromtype;
    this.setData({ fromtype: type });
    if(this.data.carid==0){
      return this.initpage();
    }
    var kw=this.data.keyword;
    this.bindSearch({detail:{value:kw}});
}
json.selectdistanceitem= function(t) {
  var a = this.data.buildarea, e = t.currentTarget.id, i = t.currentTarget.dataset.title;
  this.data.page = 1;
  this.data.title = i, 0 == e ? this.setData({
    distance: e,
    isCars: !0,
    title: i
  }) : this.setData({
      distance: e,
    title: i,
    isCars: !0,
    isTaps: !1,
  }), this.gethouselist();
}
Page(json);