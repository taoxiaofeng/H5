var XMLife = {};

XMLife.Protocol = 'com.paitao.xmlife://';
XMLife.downloadURL = 'http://d.xiaomei.com';
XMLife.URI = {
    shop_URI: 'view/shop/',
    product_URI: 'view/product/',
    template_URI: 'view/template/',
    coupon_URI: 'qrcode/coupon/',
    charge_URI: 'qrcode/charge/',
    count_URI: 'charge/detail/', //95折扣特权
    shelf_URI: 'view/shelf?' //shopType=?&shelfName=?
};
XMLife.alertMsg = {
    shareFailure: '分享初始化失败！'
};
/*
 *@author ljlong
 *@param
 *@return
 */
XMLife.system = {
    versions: (function() {
        var u = navigator.userAgent;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
        };
    }())
};
//字符串判断操作
XMLife.getSubStringByByte = function(str, start, Byte) {
    var len = 0;
    for (var i = 0, length = str.length; i < length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
        if (len >= Byte) {
            return str.substring(start, i + 1);
        }
    }
    return str;
};
XMLife.isArray = function(a) {
    return Object.prototype.toString.call(a) == '[object Array]';
};
XMLife.strByteLength = function(str) {
    var len = 0;
    for (var i = 0, length = str.length; i < length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
};
//元素相对于窗口的坐标
XMLife.getTop = function(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) {
        offset += XMLife.getTop(e.offsetParent);
    }
    return offset;
};
XMLife.getLeft = function(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) {
        offset += XMLife.getLeft(e.offsetParent);
    }
    return offset;
};

XMLife.hasClass = function(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
XMLife.addClass = function(obj, cls) {
    if (!XMLife.hasClass(obj, cls)) {
        obj.className += " " + cls;
    }
};
XMLife.removeClass = function(obj, cls) {
    if (XMLife.hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
};
XMLife.isWeChat = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

XMLife.isQQ = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/QQ/i) == "qq";
};
XMLife.isXMLife = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/Xl_c/i) == "xl_c";
};
XMLife.isPC = function() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
XMLife.addEvent = function(elm, evType, fn, useCapture) {

    if (elm.addEventListener) {

        elm.addEventListener(evType, fn, useCapture); //DOM2.0

        return true;
    } else if (elm.attachEvent) {

        var r = elm.attachEvent('on' + evType, fn); //IE5+

        return r;
    } else {

        elm['on' + evType] = fn; //DOM 0

    }
};
XMLife.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
XMLife.styleToggle = function(dms, orClasses, clClasses) {
    var doms = dms || [];
    var originClasses = orClasses || [];
    var clickClasses = clClasses || [];

    for (var i = 0, len = doms.length; i < len; i++) {
        (function(i) {
            XMLife.addEvent(doms[i], 'touchstart', function() {
                if (XMLife.hasClass(doms[i], originClasses[i])) {
                    XMLife.removeClass(doms[i], originClasses[i]);
                    XMLife.addClass(doms[i], clickClasses[i]);
                }
            }, false);
            XMLife.addEvent(doms[i], 'touchend', function() {
                if (XMLife.hasClass(doms[i], clickClasses[i])) {
                    XMLife.removeClass(doms[i], clickClasses[i]);
                    XMLife.addClass(doms[i], originClasses[i]);
                }
            }, false);
        }(i));
    }
};

/*
 ** @param types: shop,product,coupon,template,charge 跳转类型
 ** @param doms :跳转绑定节点
 ** @param ids :跳转的id
 ** @param fn :跳转失败后，响应函数
 ** @param args:响应函数参数
 ** @param areaId :跳转的商圈id
 */

XMLife.clickBind = function(types, doms, ids, fn, args, areaId) {
    var type = types || 'product';
    var doms = doms || [];
    var ids = ids || [];
    var originImgs = originImgs || [];
    var clickImgs = clickImgs || [];
    for (var i = 0, len = doms.length; i < len; i++) {
        (function(i) {
            var preurl = '';
            preurl = XMLife.Protocol + XMLife.URI[type + '_URI'];
            XMLife.addEvent(doms[i], 'click', function() {
                var jumpUrl;
                if (areaId !== undefined) {
                    jumpUrl = preurl + ids[i][areaId];
                } else {
                    jumpUrl = preurl + ids[i];
                }
                XMLife.openApp(jumpUrl, fn, args);
            });
        }(i));
    }
};
XMLife.openApp = function(jumpUrl, fn, args) {
    if (XMLife.system.versions.ios) {
        if (XMLife.isWeChat()) {
            window.location.href = jumpUrl;
            setTimeout(function() {
                window.location.href = XMLife.downloadURL;
            }, 500);
        } else if (XMLife.isQQ()) {
            // $('#iosTip').show();
        } else if (XMLife.isXMLife()) {
            window.location.href = jumpUrl;
        } else {
            //系统会根据下载来源，自动跳转到appstore，或者弹出系统提示，询问是否下载企业证书版的app
            window.location.href = jumpUrl;
            setTimeout(function() {
                fn ? fn.call(this, args) : null;
                window.location = XMLife.downloadURL; //切换按钮
            }, 1500);
        }
    } else {
        if (XMLife.isWeChat()) {
            window.location.href = jumpUrl;
            setTimeout(function() {
                window.location.href = XMLife.downloadURL;
            }, 500);
        } else if (XMLife.isQQ()) {
            // $('#iosTip').show();
        } else if (XMLife.isXMLife()) {
            window.location.href = jumpUrl;
        } else {
            window.location.href = jumpUrl;
            setTimeout(function() {
                fn ? fn.call(this, args) : null;
                window.location = XMLife.downloadURL; //切换按钮
            }, 1500);
        }
    }
};
XMLife.xmShareInit = function(title, desc, link, logoSrc) {
    var meta_title = document.createElement('meta');
    var meta_desc = document.createElement('meta');
    var meta_icon = document.createElement('meta');
    var meta_link = document.createElement('meta');
    meta_title.name = 'share-title';
    meta_desc.name = 'share-desc';
    meta_icon.name = 'share-icon';
    meta_link.name = 'share-link';
    meta_title.content = XMLife.isArray(title) ? title[0] : title;
    meta_desc.content = desc;
    meta_icon.content = logoSrc;
    meta_link.content = link;
    document.head.appendChild(meta_title);
    document.head.appendChild(meta_desc);
    document.head.appendChild(meta_icon);
    document.head.appendChild(meta_link);
};
//regists[appId, timestamp, nonceStr, signature]
//title可以是数组
//args为数组
XMLife.weChartInit = function(regists, title, desc, link, logoSrc, callback, args) {
    var wx = window.wx;
    var appId = regists[0];
    var timestamp = regists[1];
    var nonceStr = regists[2];
    var signature = regists[3];
    var titles = [];
    wx.config({
        debug: false,
        appId: appId,
        nonceStr: nonceStr,
        timestamp: timestamp,
        signature: signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]
    });

    if (XMLife.isArray(title)) {
        for (var i = 0; i < 4; i++) {
            titles.push(title[i] ? title[i] : title[title.length - 1]);
        }
    } else {
        for (var j = 0; j < 4; j++) {
            titles.push(title);
        }
    }
    wx.ready(function() {
        //分享朋友
        wx.onMenuShareAppMessage({
            title: titles[0],
            desc: desc,
            link: link,
            imgUrl: logoSrc,
            type: '',
            dataUrl: ''
        });
        //分享朋友圈
        wx.onMenuShareTimeline({
            title: titles[1],
            link: link,
            imgUrl: logoSrc
        });
        //分享微博
        wx.onMenuShareWeibo({
            title: titles[2],
            desc: desc,
            link: link,
            imgUrl: logoSrc
        });
        //分享QQ
        wx.onMenuShareQQ({
            title: titles[3],
            desc: desc,
            link: link,
            imgUrl: logoSrc
        });
        callback ? callback.apply(this, args) : null;
    });
};
XMLife.HtmlShareInit = function(title, desc, link, logoSrc, callback, args) {
    var httpUrl = window.httpUrl;
    XMLife.xmShareInit(title, desc, link, logoSrc);
    if ($ && httpUrl) {
        $.ajax({
            url: 'http://' + httpUrl + '/biz/rest/share/wechat/token',
            type: 'GET',
            data: {
                url: link
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 30000,
            success: function(res) {
                XMLife.weChartInit([res.appId, res.timestamp, res.nonceStr, res.signature], title, desc, link, logoSrc, callback, args);
            },
            error: function() {
                window.alert(XMLife.alertMsg.shareFailure);
            }
        });
    } else {
        window.alert(XMLife.alertMsg.shareFailure);
    }
};
XMLife.initUserFont = function(className) {
    var doms = document.getElementsByClassName(className);
    var len = doms.length || 0;
    var clientWidth = parseFloat((document.body.clientWidth / 100).toFixed(2));
    var i;
    for (i = 0; i < len; i++) {
        doms[i].style.fontSize = (parseInt(doms[i].getAttribute('size')) * clientWidth).toFixed(2) + 'px';
    }
};
/*
 *shareToWechatFriends
 *shareToWechatMoments
 *shareToSina
 *shareToOpenPlatform
 */
XMLife.shareInXM = function(type, title, desc, url, icon) {
    var params = {
        title: title,
        desc: desc,
        url: url,
        icon: icon
    };
    var method = window.ShareBridge ? window.ShareBridge[type] : false;
    if (method) {
        method.call(this, params);
    }
};
