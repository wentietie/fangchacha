var t = getApp(), jsons = require('../newhouselist/indexjs.js');
var json = JSON.parse(JSON.stringify(jsons));
for (var i in jsons) {
  if (json[i] === undefined) {
    json[i] = jsons[i];
  }
}
json.data.pretitle='推荐楼盘-';
Page(json);