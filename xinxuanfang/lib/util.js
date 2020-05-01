var util = {};
util._toUrlJson = function(e, isTab) {
  var j = {}
  if (typeof e === 'object') {
    j = e;
  } else {
    j.url = e || '';
  }
  if (isTab && j.fail === undefined && j.url && j.url != '') {
    var url = j.url;
    j.fail = function(r) {
      var errMsg = r.errMsg.toLowerCase();
      if (errMsg.indexOf(':fail can not ') == -1 && errMsg.indexOf(':fail:can not ') == -1) return;
      if (errMsg.indexOf(' a tabbar page') > -1 || errMsg.indexOf(' a tab bar page') > -1) {
        wx.switchTab({
          url: url
        });
      } else if (errMsg.indexOf(' no-tabbar page') > -1 || errMsg.indexOf(' no-tab bar page') > -1) {
        var method = 'navigateTo',
          s = ',' + j.switch+',';
        if (':,navigateTo,navigate,nav,'.indexOf(s)) method = 'navigateTo';
        else if (':,redirectTo,redirect,rdt,'.indexOf(s)) method = 'redirectTo';
        else if (':,reLaunch,rel,'.indexOf(s)) method = 'reLaunch';
        wx[method]({
          url: url
        });
      }
    }
  }
  if (j.url) {
    j.url = this.trim(j.url) + '';
    if (j.url.toLowerCase().indexOf('http:') === 0 ||
      j.url.toLowerCase().indexOf('https:') === 0) {
      j.url = '/lib/pages/web?url=' + j.url;
    };
  }
  return j;
}
util.toUrl = function(e, t) {
  var i = this;
  var map = {
    rdt: 'redirectTo',
    redirect: 'redirectTo',
    rel: 'reLaunch',
    tab: 'switchTab',
    back: 'navigateBack',
    map: 'openLocation',
    miniapp: 'navigateToMiniProgram',
    alert: 'showModal',
    toast: 'showToast',
    nav: 'navigateTo',
    navigate: 'navigateTo',
    tel: 'makePhoneCall',
    showImg: 'previewImage',
    saveImg: 'saveImageToPhotosAlbum',
    saveVideo: 'saveVideoToPhotosAlbum',
    copy: 'setClipboardData'
  };
  if (typeof e === 'object') {
    t == e.t || 'nav';
  }
  if (t !== undefined) {
    t = t == '' ? 'nav' : t;
    for (var k in map) {
      if (k == t || t == map[k]) {
        return i[map[k]](e);
      }
    }
  } else {
    e = this.trim(e) + '';
    if (!e || e == '' || e == 'undefined') return;
    var str = e.toLowerCase(),
      sk = '';
    for (var t in map) {
      if (e.indexOf(sk = map[t] + ':') === 0 ||
        e.indexOf(sk = t + ':') === 0 ||
        str.indexOf(sk = t.toLowerCase() + ':') === 0 ||
        str.indexOf(sk = map[t].toLowerCase() + ':') === 0) {
        return i[map[t]](e.substring(sk.length).trim());
      }
    }
  }
  return this.navigateTo(e);
}
util.trim = function(e) {
  if (e === undefined || e === null || e === NaN) {
    return '';
  }
  return e.toString().trim();
}
util.toTab = util.switchTab = function(e, tab) {
  if (typeof e !== 'object') {
    e = {
      url: e || ''
    };
  }
  e.switch = e.switch || tab || '';
  var j = this._toUrlJson(e, 'tab');
  if (j.url == '' || !j.url) {
    console.info('no url');
    return
  };
  wx.switchTab(j);
}
util.toRel = util.reLaunch = function(e) {
  var j = this._toUrlJson(e);
  if (j.url == '' || !j.url) {
    console.info('no url');
    return
  };
  wx.reLaunch(j);
}
util.toRdt = util.redirectTo = function(e) {
  var j = this._toUrlJson(e, 'rdt');
  if (j.url == '' || !j.url) {
    console.info('no url');
    return
  };
  wx.redirectTo(j);
}
util.toNav = util.navigateTo = function(e) {
  var j = this._toUrlJson(e, 'nav');
  if (j.url == '' || !j.url) {
    console.info('no url');
    return
  };
  wx.navigateTo(j);
}
util.toBack = util.navigateBack = function(e) {
  var j = {},
    $ = this;
  j = this._s2qe(e, 'delta', 'delta,data', 'data_,data') || {};
  var delta = j.delta || 1;
  j.delta = Math.max(1, parseInt(j.delta || 0) || 0);
  var p = $.getPages(j.delta * -1);
  if ((j.delta == 1 || delta == 'auto' || j.url) && !p) {
    return j.url ? this.toUrl(j.url) : this.toTab('/weixinmao_house/pages/index/index');
  }
  if (p && j.data && $.isObj(j.data) && !$.isEmptyObj(j.data)) {
    p.pageForResult ? p.pageForResult(j.data) : p.setData(j.data);
  }
  delete j.data;
  wx.navigateBack(j);
}
util.calltel = util.makePhoneCall = function(e) {
  var j = {};
  if (typeof e === 'object') {
    j = e;
  } else {
    j.phoneNumber = e;
  }
  if (!j.phoneNumber) {
    console.info('no phone');
    return
  };
  wx.makePhoneCall(j);
}
util.toMiniApp = util.navigateToMiniProgram = function(e) {
  var j = {};
  var t = this._s2qe(e, 'appid', 'miniapp', 'ext_,extData');
  if (!t || !t.appid) {
    console.info('no appid');
    return
  };
  j = this.extend(j, t);
  return wx.navigateToMiniProgram(s);
}
util.toMap = util.openLocation = function(e) {
  var j = {};
  var t = this._s2qe(e, 'latlng,lat,lng,latitude,longitude');
  if (!t) {
    console.info('no latlng');
    return
  };
  j = this.extend(j, t);
  if (j.latlng) {
    j.latlng = (latlng + ',').split(',');
    j.latitude = j.latlng[0];
    j.longitude = j.latlng[1];
  }
  if (j.latitude == undefined && j.lat != undefined) {
    j.latitude = j.lat;
  }
  if (j.latitude == undefined && j.lat != undefined) {
    j.longitude = j.lng;
  }
  if (j.latitude != undefined) {
    j.latitude = parseFloat(j.latitude);
  }
  if (j.longitude != undefined) {
    j.longitude = parseFloat(j.longitude);
  }
  j = this.objdel(obj, 'lat,lng,latlng');
  return wx.openLocation(j);
}
util.objdel = function(e, keys) {
  if (this.isStr(keys)) {
    keys = keys.split(',');
  }
  for (var i in keys) {
    i = keys[i];
    delete obj[i];
  }
  return obj;
}
util._s2q = function(s, arg, ext) {
  if (typeof s === 'object') {
    return s;
  }
  if (typeof s !== 'string' && typeof s !== 'number') {
    return {};
  }
  s = s.toString();
  if (s.trim().indexOf('{') === 0) {
    var j = JSON.parse(s.trim());
    if (typeof j == 'object') {
      return j;
    }
  }
  var j = s.toString().split(';');
  var e = {},
    args = {
      'miniapp': ['appId', 'path', 'envVersion']
    };
  var extk = 'extData';
  if (ext && this.isStr(ext)) {
    var exts = (ext + ',').split(','),
      extk = exts[1].trim(),
      ext = exts[0].trim();
    !extk || extk == '' ? extk = 'extData' : '';
    ext = {
      [ext]: extk
    };
  }
  if (!this.isObj(ext) || !this.isEmptyObj(ext)) {
    ext = false;
  }
  if (typeof arg === 'string') {
    arg = arg.indexOf(',') ? arg.split(',') : args[arg] || false;
  }
  if (!this.isArr(arg) || arg.length < 1) {
    arg = false;
  }
  for (var i in j) {
    var v = (j[i].trim() + ':').split(':');
    var k = v[0].trim();
    v.shift(), v.pop(), v = v.join(':');
    if (v == 'false') {
      v = false;
    }
    if (v == 'true') {
      v = true;
    }
    if (arg && arg.indexOf(k) > -1) {
      e[k] = v;
    } else {
      var kkk = false;
      if (ext) {
        for (var kk in ext) {
          var extk = ext[kk];
          if (k.indexOf(kk) === 0) {
            e[extk] === undefined ? e[extk] = {} : '';
            e[extk][k.substring(kk.length)] = v;
            kkk = true;
            break;
          }
        }
      }
      if (!arg && !kkk) {
        e[k] = v;
      }
    }
  }
  return e;
}
util._s2qe = function(e, f, arg, ext) {
  var j = {};
  var t = this.type(e);
  if (!this.isArr(f)) {
    f = this.trim(f);
    f = f == '' ? [] : f.split(',');
  }
  if (t == 'object') {
    j = this.extend(true, j, e);
  } else if (t == 'string' || t == 'number') {
    e = e.toString();
    t = e.toLowerCase().trim();
    if (t.indexOf('{') === 0) {
      j = this.extend(true, j, this._s2q(e, arg, ext));
    } else {
      var fv = false,
        ff = '';
      for (var fk in f) {
        fk = this.trim(f[fk]);
        ff = ff == '' ? fk : ff;
        if (fk != '' && t.indexOf(fk + ':') > -1) {
          fv = true;
          break;
        }
      }
      if (fv) {
        j = this.extend(true, j, this._s2q(e, arg, ext));
      } else if (ff != '') {
        j[ff] = e.trim();
      } else {
        j = false;
      }
    }
  } else {
    return false;
  }
  return j;
}
util.wx = function(method, e) {
  var j = this._s2q(e);
  return wx[method](e);
}
util.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    //target = this;
    //i--;
  }

  for (; i < length; i++) {

    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name];
        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === "__proto__" || target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (this.isObject(copy) ||
            (copyIsArray = this.isArray(copy)))) {
          src = target[name];
          // Ensure proper type for the source value
          if (copyIsArray && !this.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !this.isObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;
          // Never move original objects, clone them
          target[name] = this.extend(deep, clone, copy);
          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  // Return the modified object
  return target;
}
util.isObj = util.isObject = function(e, isArr) {
  isArr == undefined ? isArr = false : '';
  isArr == '' ? isArr = false : '';
  var t = this.type(e);
  return t == 'object' || (isArr && t == 'array');
}
util.isEmptyObj = function(e) {
  for (var i in e) {
    return false;
  }
  return true;
}
util.isFun = util.isFunction = function(e) {
  return typeof e == 'function';
}
util.isArr = util.isArray = function(e) {
  return e instanceof Array;
}
util.inArr = util.inArray = function(v, e, i) {
  if (!this.isArray(e)) return -1;
  i = Math.max(0, parseInt(i || 0) || 0);
  return e.indexOf(v, i);
}
util.isBool = function(e) {
  return typeof e === 'boolean';
}
util.isStr = function(e) {
  return typeof e === 'string';
}
util.isNumber = function(e) {
  return typeof e === 'number';
}
util.isNumeric = function(obj) {
  return !this.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}
util.type = function(e) {
  if (e === undefined || e === null || e === NaN) {
    return e;
  }
  var r = Object.prototype.toString.call(e);
  return r.split(' ')[1].replace(']', '').toLowerCase();
}
util.alert = function(e, fok) {
  this.showModal(e, false, fok);
}
util.confirm = function(e, fok, fcancel) {
  this.showModal(e, true, fok, fcancel);
}
util.showModal = function(e, confirm, fok, fcancel) {
  var j = {},
    $ = this;
  if ($.isFun(confirm)) {
    fcancel = fok, fok = confirm, confirm = $.isFun(fcancel);
  } else confirm = confirm ? true : false;
  var t = {};
  if ($.isArr(e)) {
    t.content = e[0];
    e.length > 1 ? (e.title = e[0], t.content = e[1]) : '';
    e.length > 2 ? (confirm = e[2] ? true : false) : '';
  } else t = this._s2qe(e, 'content,title');
  if (!t) return;
  j = this.extend(j, t);
  if ($.isFun(j.ok)) fok = j.ok;
  if ($.isFun(j.cancel)) fcancel = j.cancel;
  //if ($.isFun(fok) && $.isFun(fcancel)) confirm = true;
  if (j.showCancel != undefined) {
    confirm = j.showCancel ? true : false;
  }
  j.showCancel = confirm;
  if (j.btn != undefined) {
    if (this.type(j.btn) == 'string') {
      j.btn = j.btn.split(',');
    }
    if (j.confirmText == undefined) {
      j.confirmText = j.btn[0] || '';
    }
    if (this.isBool(j.confirmText) || !j.confirmText || j.confirmText == '') {
      delete j.confirmText;
    }
    if (j.btn[1] != undefined) {
      j.showCancel = true;
      if (j.cancelText == undefined) {
        j.cancelText = j.btn[1] || '';
      }
      if (this.isBool(j.cancelText) || !j.cancelText || j.cancelText == '') {
        j.cancelText ? '' : j.showCancel = false;
        j.cancelText == '' ? j.showCancel = confirm : '';
        delete j.cancelText;
      }
    }
  }
  if (j.color != undefined) {
    if (this.type(j.color) == 'string') {
      j.color = j.color.split(',');
    }
    if (j.confirmColor == undefined) {
      j.confirmColor = j.color[0] || '';
    }
    if (this.isBool(j.confirmColor) || !j.confirmColor || j.confirmColor == '') {
      delete j.confirmColor;
    }
    if (j.color[1] !== undefined) {
      if (j.cancelColor == undefined) {
        j.cancelColor = j.color[1] || '';
      }
      if (this.isBool(j.cancelColor) || !j.cancelColor || j.cancelColor == '') {
        delete j.cancelColor;
      }
    }
  }
  if (!j.success || !$.isFun(j.success)) {
    j.success = function(r) {
      if (r.confirm && $.isFun(fok)) fok();
      else if (r.cancel && $.isFun(fcancel)) fcancel();
    }
  }
  delete j.btn;
  delete j.color;
  delete j.ok;
  delete j.cancel;
  return wx.showModal(j);
}
util.toast = util.showToast = function(e, t, s) {
  var j = {
    icon: 'none'
  };
  if (s && this.isNumber(s)) {
    j.duration = s;
  }
  if (t && this.isNumber(t)) {
    j.duration = t;
  }
  t == 'succ' ? t == 'success' : '';
  t == 'load' ? t == 'loading' : '';
  t == 'err' ? t == 'error' : '';
  var icons = {
    'error': "\f05c"
  }
  if (icons[t] != undefined) {
    t = j.icon = icons[t];
  }
  if (t && this.inArray(t, ['loading', 'success'])) {
    j.icon = t;
  }
  var t = this._s2qe(e, 'title');
  if (!t) return;
  j = this.extend(j, t);
  return wx.showToast(j);
}
util.showLoading = function(e, s) {
  var j = {
    icon: 'loading',
    duration: 600000
  };
  if (s && this.isNumber(s)) {
    j.duration = s;
  }
  var t = this.isBool(e) ? {
    mask: e
  } : this._s2qe(e, 'title,mask,duration');
  if (!t) t = {};
  if (this.isBool(t.title)) {
    if (t.mask == undefined) {
      t.mask = t.title;
      delete t.title;
    }
  }
  t.title == undefined ? t.title = '加载中' : '';
  j = this.extend(j, t, {
    icon: 'loading'
  });
  return this.showToast(j);
}
util.hideLoading = util.hideToast = function() {
  return wx.showToast();
}
util.copy = util.clip = util.setClipboardData = function(e) {
  var j = {
      success: false
    },
    i = this;
  var t = this._s2qe(e, 'data', 'data,success', 'succ_,success');
  if (!t) return;
  j = this.extend(j, t);
  if (this.isStr(j.success) || this.isObj(j.success)) {
    var s = this.isObj(j.success) ? this.extend(true, {}, j.success) : j.success;
    j.success = function() {
      i.toUrl(s);
    }
  }
  if (!this.isFun(j.success)) {
    delete j.success;
  }
  return wx.setClipboardData(j);
}
util.showImg = util.previewImage = function(e, urls) {
  var j = {
      urls: []
    },
    t;
  if (urls && this.isArr(urls) && (this.isNumeric(e) || this.isStr(e))) {
    t = {
      urls: urls,
      current: e
    };
  } else {
    t = this.isArr(e) ? {
      urls: e
    } : this._s2qe(e, t = 'urls,current,curr', t);
  }
  if (!this.isObj(t)) return;
  j = this.extend(j, t);
  if (!this.isArr(j.urls)) {
    j.urls = j.urls.split(',');
  }
  if (!j.current && j.curr) {
    j.current = j.curr;
  }
  if (j.current == '') {
    delete j.current;
  }
  if (j.current != undefined && this.isNumeric(j.current)) {
    j.current = parseInt(j.current);
    if (j.urls[j.current]) {
      j.current = j.urls[j.current];
    } else {
      delete j.current;
    }
  }
  if (j.current && j.urls.indexOf(j.current) < 0) {
    j.urls.unshift(j.current);
  }
  delete j.curr;
  return wx.previewImage(j);
}
util.saveImg = util.saveImageToPhotosAlbum = function(e) {
  return this.saveFiles(e, 'img');
}
util.saveVideo = util.saveVideoToPhotosAlbum = function(e) {
  return this.saveFiles(e, 'video');
}
util.saveFile = util.saveFiles = function(e, type) {
  var j = {},
    t, urls, i, $ = this;

  t = this.isArr(e) ? {
    urls: e
  } : this._s2qe(e, t = 'urls,filePath', t);
  if (!t) return;
  j = this.extend(j, t);
  type = type || j.type || 'file';
  type = ['img', 'video', 'file'].indexOf(type.toLowerCase()) >= 0 ? type : 'file';
  var method = 'saveFile',
    tmsg = '文件',
    dw = '个';
  var tempFilePath = 'filePath';
  if (type == 'img') {
    method = 'saveImageToPhotosAlbum', tmsg = '图片', dw = '张';
  } else if (type == 'video') {
    method = 'saveVideoToPhotosAlbum', tmsg = '视频', dw = '个';
  } else {
    tempFilePath = 'tempFilePath';
  }
  urls = j.urls || [];
  delete j.urls;
  if ($.isStr(urls)) {
    urls = urls.split(',');
  }
  if (!$.isArr(urls)) {
    urls = [];
  }
  if (j.filePath) {
    urls.push(j.filePath);
    if (type == 'file') {
      j.tempFilePath = j.filePath;
      delete j.filePath;
    }
  }
  if (!urls.length) return;
  var succ, fail, complete, com, l = urls.length,
    s = 0,
    er = 0;
  com = function(r, t) {
    if (s + er < l) return;
    var msg = '保存成功';
    if (s <= 0) return fail ? fail(r) : $.toast('保存失败', 'err');
    if (s < l) msg += ' ' + s + ' ' + dw + tmsg;
    return succ ? succ(r, s, l - s) : $.toast(msg, 'succ');
  }
  if (j.success && $.isFun(j.success)) {
    succ = j.success;
  }
  if (j.fail && $.isFun(j.fail)) {
    fail = j.fail;
  }
  if (j.complete && $.isFun(j.complete)) {
    complete = j.complete;
  }
  j.success = function(r) {
    s++, com(r, true);
  }
  j.fail = function(r) {
    er++, com(r, false);
  }
  j.complete = function(r) {
    if (s + er + 1 < l || !complete) return;
    complete(r);
  }
  var run = function() {
    if (j.showLoading === undefined || j.showLoading) {
      $.showLoading('下载中');
    }
    for (var i in urls) {
      if (!urls[i]) {
        l--;
        continue;
      }
      wx.downloadFile({
        url: urls[i],
        success: function(r) {
          if (r.statusCode === 200) {
            var jj = $.extend(true, {}, j, {
              [tempFilePath]: r.tempFilePath
            });
            wx[method](jj);
          } else {
            j.fail(r);
          }
        },
        fail: function(r) {
          j.fail(r);
        }
      });
      // if (type == 'video') {l=1;return};
    }
  }
  if (type == 'file') {
    return run();
  }
  return wx.authorize({
    scope: 'scope.writePhotosAlbum',
    fail() {
      $.toast('您已拒绝授权保存' + tmsg);
    },
    success: function() {
      run();
    }
  });
}
util.scan = util.scanCode = function() {
  var i = 0,
    j = {},
    e = {},
    arg = arguments,
    l = arg.length - 1;
  do {
    if (l < i) return;
    if ($.isBool(arg[i])) {
      j.onlyFromCamera = arg[i++];
    }
    if (l < i) break;
    if ($.isArr(arg[i])) {
      j.scanType = arg[i++];
    } else if ($.isStr(arg[i])) {
      j.scanType = arg[i++].split(',');
    }
    var fun = ['success', 'fail', 'complete'];
    for (var k in fun) {
      if (l < i) break;
      if ($.isFun(arg[i])) {
        j[fun[k]] = arg[i++];
      }
    }
  } while (false);
  wx.scanCode(j);
}
util.authorize = function(e, succ, fail, complete) {
  var j = {},
    $ = this;
  if (this.isObj(e)) j = e;
  else j.scope = e;
  if (!this.isFun(j.success) && this.isFun(succ)) j.success = succ;
  if (!this.isFun(j.fail) && this.isFun(fail)) j.fail = fail;
  if (!this.isFun(j.complete) && this.isFun(complete)) j.complete = complete;
  if (fail === true && !this.isFun(j.fail)) j.fail = function(r) {
    $.alert('您已拒绝使用位置信息，若需位置服务请打开设置界面（「右上角」 - 「设置」）开启位置服务授权');
  };
  if ((this.isObj(fail) || this.isStr(fail)) && !this.isFun(j.fail)) j.fail = function() {
    $.toUrl(fail);
  }
  return wx.authorize(j);
}
util.getLocation = function(e, succ, fail, complete) {
  var j = {},
    $ = this;
  if (this.isFun(e)) j.success = e, complete = fail, fail = succ, succ = '';
  else if (this.isObj(e)) j = e;
  else j.type = e;
  if (j.type != 'wgs84') j.type = 'gcj02';
  if (!this.isFun(j.success) && this.isFun(succ)) j.success = succ;
  if (!this.isFun(j.fail) && this.isFun(fail)) j.fail = fail;
  if (!this.isFun(j.complete) && this.isFun(complete)) j.complete = complete;
  if (!this.isFun(j.fail)) j.fail = function(r) {
    $.alert('获取位置失败，请开启GPS服务');
  };
  if ((this.isObj(fail) || this.isStr(fail)) && !this.isFun(j.fail)) j.fail = function() {
    $.toUrl(fail);
  }
  return this.authorize('scope.userLocation', function() {
    wx.getLocation(j)
  }, true);
}
util.chooseLocation = function(e, succ, fail, complete) {
  var j = {},
    $ = this;
  if (this.isFun(e)) j.success = e, complete = fail, fail = succ, succ = '';
  else if (this.isArr(e)) j.latitude = e[0], j.longitude = e[1];
  else if (this.isObj(e)) j = e;
  if (!this.isFun(j.success) && this.isFun(succ)) j.success = succ;
  if (!this.isFun(j.fail) && this.isFun(fail)) j.fail = fail;
  if (!this.isFun(j.complete) && this.isFun(complete)) j.complete = complete;
  if ((this.isObj(fail) || this.isStr(fail)) && !this.isFun(j.fail)) j.fail = function() {
    $.toUrl(fail);
  }
  if (j.latitude == undefined && j.lat != undefined) j.latitude = j.lat;
  if (j.longitude == undefined && j.lng != undefined) j.longitude = j.lng;
  return this.authorize('scope.userLocation', function() {
    wx.chooseLocation(j)
  }, true);
}
util.loadPage = function(e) {
  var app = getApp(),
    e = this.isObj(e) ? e : {};
  e = this.extend(true, e, app.load('/lib/page.js'), this.extend(true, {}, e));
  return e;
}
util.Page = function(e) {
  Page(this.loadPage(e));
}
util.getPages = function(e) {
  var pages = getCurrentPages();
  e === undefined ? e = pages.length - 1 : '';
  if (e === true) return pages;
  e < 0 ? e += pages.length - 1 : '';
  e = e || 0;
  return pages[e];
}
util.append = function(p, key, append, page, data) {
  if (!p || !key) return;
  data = data === undefined ? ((p.data || {})[key] || []) : data;
  var d = this.isArr(data) ? this.extend(true, [], data) : [],
    a = this.isArr(append) ? this.extend(true, [], append) : [];
  if (!(page > 1)) return p.setData({
    [key]: a
  });
  if (a.length <= 0) return;
  var sets = {},
    l = parseInt(d.length);
  for (var i in a) {
    i = parseInt(i);
    sets[key + '[' + (i + l) + ']'] = a[i];
  }
  p.setData(sets);
}
module.exports = util;