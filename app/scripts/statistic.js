;
// SHARE_APP = 1
// SHARE_DEAL = 2
// SHARE_ALL_DEAL = 3
// WEIXIN_FRIEND = 1
// WEIXIN_FRIEND_CIRCLE = 2
// SINA_WEIBO = 3
(function(XMLife) {
    var mySwipe = new Swiper('.swiper-container', {
        initialSlide: 0,
        direction: 'vertical',
        height: window.innerHeight,
        width: window.innerWidth,
        observer: true,
        observeParents: true
    });
    //内部分享隐藏下载页
    if (XMLife.isXMLife()) {
        var downloadpage = document.getElementById('downloadpage');
        var arrow = document.getElementById('arrow');
        $(downloadpage).remove();
        //XMLife.addClass(downloadpage, 'hide');
        XMLife.addClass(arrow, 'hide');
        shareInAPPInit();
        //mySwipe.update();
    } else { //外部初始化微信分享
        var download = document.getElementById('btn');
        XMLife.addEvent(download, 'touchend', function() {
            window.open(XMLife.downloadURL);
        });
        shareInWechatInit();
    }

    function shareInWechatInit() {
        $.when($.ajax({
            url: 'http://' + httpUrl + '/biz/rest/share/wechat/token',
            type: 'GET',
            data: {
                url: window.location.href.split('#')[0]
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        }), $.ajax({
            url: 'http://' + httpUrl + '/biz/rest/share/shareConfig',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        })).done(function(res1, res2) {
            var appId = res1[0].appId;
            var timestamp = res1[0].timestamp;
            var nonceStr = res1[0].nonceStr;
            var signature = res1[0].signature;
            var callback = function() {
                wx.hideOptionMenu();
            };
            var config = res2[0].configs[3];
            var titles = [];
            titles.push(config[1].title);
            titles.push(config[2].title);
            titles.push(config[3].title);
            var desc = config[1].content || '';
            var logoSrc = config[1].icon ? config[1].icon : document.getElementById('share_logo').src;
            var link = window.location.href.split('#')[0];
            XMLife.weChartInit([appId, timestamp, nonceStr, signature], titles, desc, logoSrc, callback, null);
            XMLife.xmShareInit(titles, desc, link, logoSrc);
        }).fail(function() {
            window.alert('分享初始化失败！');
        });
    }

    function shareInAPPInit() {
        $.ajax({
            url: 'http://' + httpUrl + '/biz/rest/share/shareConfig',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function(res) {
                var config = res.configs[3];
                var titles = [];
                titles.push(config[1].title);
                titles.push(config[2].title);
                titles.push(config[3].title);
                var desc = config[1].content || '';
                var logoSrc = config[1].icon ? config[1].icon: document.getElementById('share_logo').src;
                var link = window.location.href.split('#')[0];
                XMLife.xmShareInit(titles, desc, link, logoSrc);
            },
            error: function() {
                window.alert('分享初始化失败！');
            }
        });
    }

    function init() {
        var cid = XMLife.getParameterByName('cid');
        var url = 'http://' + httpUrl + '/biz/rest/share/consume';
        //初始化事件绑定
        var nextpage = document.getElementById('next');
        var succ = function(res) {
            var userName = res.userName;
            var totalDays = res.totalDays;
            var totalDeals = res.totalDeals;
            var totalAmount = res.totalAmount;
            var totalProducts = res.totalProducts;
            var phone = res.phone;
            if (userName === "") {
                document.getElementById('name').innerHTML = phone;
            } else {
                document.getElementById('name').innerHTML = userName;
            }
            document.getElementById('day').innerHTML = totalDays;
            document.getElementById('deal').innerHTML = totalDeals;
            document.getElementById('count').innerHTML = totalProducts;
            document.getElementById('money').innerHTML = (totalAmount / 100).toFixed(2);
        };
        var error = function(res) {};
        $.ajax({
            url: url,
            type: 'GET',
            data: {
                cid: cid
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: succ,
            error: error
        });
        XMLife.addEvent(nextpage, 'touchend', function() {
            mySwipe.slideNext();
        });
    }
    init();
    //mySwipe.update();

}(window.XMLife));
