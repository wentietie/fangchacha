var t = getApp(),jsons=require('indexjs.js');
var json = JSON.parse(JSON.stringify(jsons));
for (var i in jsons){
  if(json[i]===undefined){
    json[i]=jsons[i];
  }
}
json.data.type='new';
Page(json);