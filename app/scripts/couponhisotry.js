    (function(XMLife) {
        var url = 'http://' + httpUrl + '/biz/rest/share/receive/history';
        var userId = XMLife.getParameterByName('userId') || XMLife.getParameterByName('uid');
        var succ = function(res) {
            var totalget = res.usedCouponNum;
            var totalcheap = (res.usedCouponAmount / 100).toFixed(0);
            var get = (res.totalCouponAmount / 100).toFixed(0);
            var miss = ((res.totalCouponAmount - res.usedCouponAmount) / 100).toFixed(0);
            document.getElementById('totalget').innerHTML = totalget;
            document.getElementById('totalcheap').innerHTML = totalcheap;
            document.getElementById('get').innerHTML = '历史领券总额￥' + get;
            document.getElementById('miss').innerHTML = '曾因过期错过￥' + (miss >= 0 ? miss : 0);
        };
        var error = function() {
            window.alert('获取记录失败!');
        };
        $.ajax({
            url: url,
            type: 'GET',
            data: {
                uid: userId
            },
            timeout: 30000,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: succ,
            error: error
        });
    }(window.XMLife));
