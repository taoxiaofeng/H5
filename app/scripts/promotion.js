(function(XMLife) {
    var me = this;
    var url = 'http://' + httpUrl + '/biz/rest/share/draw/promoter/coupon';
    var signatureUrl = 'http://' + httpUrl + '/biz/rest/share/wechat/token';
    var phone_input = document.getElementById('phone_input');
    var button_get = document.getElementById('button_get');
    var openxmlife = document.getElementById('openxmlife');
    var download_btn = document.getElementById('download_btn');
    var mask = document.getElementById('mask');
    var code = XMLife.getParameterByName('code');
    var pattern = /^[\d]{11}$/;
    var wx = window.wx;


    var init = function() {
        var weChatInit = function(appId, timestamp, nonceStr, signature) {
            var logoSrc = document.getElementById('logo').src;
            var title = '你的菜钱我出了！快来抢红包一起用~';
            var desc = '蔬果生鲜，食品百货：超市代买，1小时速达！';
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
            wx.ready(function() {
                //分享朋友圈
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: '', // 分享链接
                    imgUrl: logoSrc // 分享图标
                });
                //分享朋友
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: '', // 分享链接
                    imgUrl: logoSrc, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                });
                //分享QQ
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: '', // 分享链接
                    imgUrl: logoSrc // 分享图标
                });
                //分享微博
                wx.onMenuShareWeibo({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: '', // 分享链接
                    imgUrl: logoSrc // 分享图标
                });
                //wx.hideOptionMenu();
            });
            XMLife.addClass(mask, 'fade');
        };
        var succ = function(res) {
            var appId = res.appId;
            var timestamp = res.timestamp;
            var nonceStr = res.nonceStr;
            var signature = res.signature;
            weChatInit(appId, timestamp, nonceStr, signature);
        };
        var error = function() {};
        $.ajax({
            url: signatureUrl,
            type: 'GET',
            data: {
                url: window.location.href.split('#')[0]
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: succ,
            error: error
        });
    };
    init();
    var grabred = function() {
        var numb = phone_input.value;
        var succ = function(res) {
            var pass = res.isPass;
            var get = document.getElementById('get');
            var count = document.getElementById('count');
            var amount = document.getElementById('amount');
            var phone = document.getElementById('phone');
            var result = document.getElementById('result');
            var coupon_open = document.getElementById('coupon_open');
            var failure_msg = document.getElementById('failure_msg');
            var success_msg = document.getElementById('success_msg');
            var failure_title = document.getElementById('failure_title');
            var failure_desc = document.getElementById('failure_desc');
            var desc_panel = document.getElementById('desc_panel');
            var idx = {
                802: ['您的卡券太多啦!', '赶紧去花掉一些~'],
                806: ['今天领了很多啦!', '明天再接再厉哦~'],
                823: ['领过了!', '留点机会给别人吧~'],
                820: ['过期了!', '下次早点来哦~'],
                821: ['过期了!', '下次早点来哦~'],
                isOld:['领取失败!','抱歉，该优惠仅限新手用户领取'],
                expired: ['过期了!', '下次早点来哦~'],
                other: ['领完啦!', '下次早点来哦~']
            };
            var title = '';
            var desc = '';
            XMLife.addClass(get, 'hide');
            XMLife.removeClass(result, 'hide');
            XMLife.removeClass(coupon_open, 'hide');

            if (pass) { //获取到了
                count.innerHTML = res.count;
                amount.innerHTML = (res.totalDiscount / 100).toFixed(2) + '元';
                phone.innerHTML = numb;
                XMLife.addClass(desc_panel, 'desc-success');
                XMLife.removeClass(success_msg, 'hide');
            } else { //未获取 
                title = idx['isOld'][0];
                desc = idx['isOld'][1];
                failure_title.innerHTML = title;
                failure_desc.innerHTML = desc;
                XMLife.addClass(desc_panel, 'desc-failure');
                XMLife.removeClass(failure_msg, 'hide');
            }

            XMLife.removeClass(openxmlife, 'hide');
            XMLife.addClass(mask, 'fade');
        };
        var fail = function() {
            window.alert('获取失败！');
            XMLife.removeClass(mask, 'fade');
        };
        if (XMLife.hasClass(button_get, 'active')) {
            XMLife.addClass(mask, 'fade');
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    phone: numb,
                    code: code
                },
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: succ,
                failure: fail
            });
        }
    };

    XMLife.addEvent(phone_input, 'input', function() {
        if (pattern.test(phone_input.value)) {
            XMLife.addClass(button_get, 'active');
        } else {
            XMLife.removeClass(button_get, 'active');
        }
    });
    XMLife.addEvent(button_get, 'touchstart', function() {
        if (pattern.test(phone_input.value)) {
            XMLife.hasClass(button_get, 'active') ? XMLife.removeClass(button_get, 'active') : null;
        }
    }, me);
    XMLife.addEvent(button_get, 'touchend', function() {
        if (pattern.test(phone_input.value)) {
            XMLife.hasClass(button_get, 'active') ? null : XMLife.addClass(button_get, 'active');
            grabred();
        }
    });
    XMLife.addEvent(openxmlife, 'touchstart', function() {
        XMLife.hasClass(openxmlife, 'active') ? null : XMLife.addClass(openxmlife, 'active');
    }, me);
    XMLife.addEvent(openxmlife, 'touchend', function() {
        XMLife.hasClass(openxmlife, 'active') ? XMLife.removeClass(openxmlife, 'active') : null;
        window.location.href = XMLife.downloadURL;
    }, me);
    XMLife.addEvent(download_btn, 'touchstart', function() {
        XMLife.hasClass(download_btn, 'active') ? null : XMLife.addClass(download_btn, 'active');
    }, me);
    XMLife.addEvent(download_btn, 'touchend', function() {
        XMLife.hasClass(download_btn, 'active') ? XMLife.removeClass(download_btn, 'active') : null;
        window.location.href = XMLife.downloadURL;
    }, me);
}(XMLife));
