    (function(XMLife, FastClick) {
        FastClick.attach(document.body);
        var me = this;
        var wx = window.wx;
        var phone_input = document.getElementById('phone_input');
        var button_get = document.getElementById('button_get');
        var count = document.getElementById('count');
        var amount = document.getElementById('amount');
        var get = document.getElementById('get');
        var result = document.getElementById('result');
        var openxmlife = document.getElementById('openxmlife');
        var openxmbtn = document.getElementById('openxm');
        // var coupon_open = document.getElementById('coupon_open');
        var pros = document.getElementById('pros');
        var number = document.getElementById('number');
        var delivertime = document.getElementById('delivertime');
        var scrolllayout = document.getElementById('scrolllayout');
        var download = document.getElementById('download');
        var download_btn = document.getElementById('download_btn');
        var down = document.getElementById('down');
        var mask = document.getElementById('mask');
        var getintime = document.getElementById('getintime');
        var timedesc = document.getElementById('timedesc');
        var desc_panel = document.getElementById('desc_panel');
        var success_msg = document.getElementById('success_msg');
        var failure_msg = document.getElementById('failure_msg');
        var failure_title = document.getElementById('failure_title');
        var failure_desc = document.getElementById('failure_desc');
        var input_modi = document.getElementById('input_modi');
        var btn_modi = document.getElementById('btn_modi');
        var modi = document.getElementById('modi');
        var curphones = document.getElementsByClassName('curphone');
        var modis = document.getElementsByClassName('modis');
        var peisong = document.getElementById('peisong');
        var fenzhong = document.getElementById('fenzhong');
        var toast = document.getElementById('toast');
        var bg = document.getElementById('bg');
        var dealId = XMLife.getParameterByName('dealId');
        var isShowProudct = XMLife.getParameterByName('isShowProduct') === 'true' ? true : false;
        var title = '你的菜钱我出了！快来抢红包一起用~';
        var desc = '蔬果生鲜，食品百货：超市代买，1小时速达！';
        var link = window.location.href.split('#')[0];
        var logoSrc = document.getElementById('logo').src;
        var mo = dealId % 10;
        var pattern = /^[\d]{11}$/;
        var pro_size = '@!hongbao';
        var portrait_size = (document.body.offsetWidth * 0.87 - 5) * 0.14 + 'px';
        var domain = 'xiaomei.com';
        var usercode = XMLife.getParameterByName('code');
        var expires = new Date(new Date().getFullYear() + 1 + '');
        var userRecords = [];
        var msgs = {
            '818': ['优惠券关闭', '下次早点来喔~'],
            '823': ['领过啦', '留点机会给别人吧~'],
            '802': ['您的卡券太多啦!', '快去用掉一些吧~'],
            '807': ['您的卡券太多啦!', '快去用掉一些吧~'],
            '806': ['今天领太多啦!', '明天再来奋战喔~'],
            grabout: ['领完啦', '下次早点来喔~'],
            expired: ['过期啦', '下次早点来喔~'],
            other: ['领完啦', '下次早点来喔~']
        };
        var cookieId = 'cacheCouponPhone';
        //TODO: fall back to use cookie if no localstorage. Use a lib, say modernizer.
        var getPhone = function() {
            var phone = localStorage && localStorage.getItem(cookieId);
            if (phone) {
                setCurPhones(phone);
            }
            return phone || '';
        };
        var setPhone = function(phone) {
            setCurPhones(phone);
            if (localStorage) {
                localStorage.setItem(cookieId, phone);
            }
        };
        var setCurPhones = function(phone) {
            for (var i = 0, len = curphones.length; i < len; i++) {
                curphones[i].innerHTML = phone;
            }
        };
        var updateGetBtn = function(input, btn) {
            var ipt = input || phone_input;
            var bt = btn || button_get;
            if (pattern.test(ipt.value)) {
                XMLife.addClass(bt, 'active');
            } else {
                XMLife.removeClass(bt, 'active');
                btn && btn.f ? btn.text = '修改' : false;
            }
        };
        var modiPhone = function() {
            XMLife.addClass(result, 'hide');
            XMLife.removeClass(modi, 'hide');
        };
        var populateWinners = function(data) {
            var template_wechat = '<div class="portrait-wrap"><img style="width:' + portrait_size + ';height:' + portrait_size + '" class="portrait" src="{headimage}"><table style="float:left" width="80%" class="singleWinner">' +
                '<tr>' +
                '<td>' +
                '<span class="userName">' +
                '{name}' +
                '</span>' +
                '<span class="timeStamp">' +
                '{timeStamp}' +
                '</span>' +
                '</td>' +
                '<td>' +
                '<span rowspan="2" class="money">' +
                '{amount}元' +
                '</span>' +
                ' </td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<span class="comment">' +
                '{comment}' +
                '</span>' +
                '</td>' +
                '</tr>' +
                '</table></div>',
                template_pc = '<table width="100%" class="singleWinner">' +
                '<tr>' +
                '<td>' +
                '<span class="userName">' +
                '{name}' +
                '</span>' +
                '<span class="timeStamp">' +
                '{timeStamp}' +
                '</span>' +
                '</td>' +
                '<td>' +
                '<span rowspan="2" class="money">' +
                '{amount}元' +
                '</span>' +
                ' </td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<span class="comment">' +
                '{comment}' +
                '</span>' +
                '</td>' +
                '</tr>' +
                '</table>',
                result = "",

                entityMap = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': '&quot;',
                    "'": '&#39;',
                    "/": '&#x2F;'
                },
                escapeHtml = function(string) {
                    return String(string).replace(/[&<>"'\/]/g, function(s) {
                        return entityMap[s];
                    });
                },
                comments = [
                    '买蔬果生鲜，就用小美快购！',
                    '买菜购物不出门，棒极了！',
                    '红包这么大！今天加个菜〜',
                    '今天菜钱有了，棒棒嗒！',
                    '以后在家就能逛超市了！',
                    '以后柴米油盐再也不用自己扛了！',
                    '再不用小美就落伍了！',
                    '谢壕龙恩〜',
                    '天天发红包你妈知道吗？',
                    '用小美，新鲜肉菜天天有〜',
                    '向来人品好〜手气爆棚！',
                    '不出门，鲜菜照有！',
                    '新鲜水果，美味到家！',
                    '帅哥送货上门哦〜'
                ];

            var $winnersWrap = $('.winnersWrapper');
            var isInWeChat = $.cookie('wc_openid') ? true : false;
            var template = isInWeChat ? template_wechat : template_pc;

            $.each(data || [], function(idx, item) {

                var name = isInWeChat ? item.nick : item.phone,
                    time = item.gmtCreate || new Date().getTime(),
                    timeStr = new Date(time),
                    headImg = item.headImg;
                timeStr = (timeStr.getMonth() + 1) + '-' + timeStr.getDate() + ' ' + timeStr.getHours() + ':' + timeStr.getMinutes() || '';

                if (name && item.amount) {
                    result += template.replace(/\{name\}/, escapeHtml(name))
                        .replace(/\{timeStamp\}/, timeStr)
                        .replace(/\{headimage\}/, headImg)
                        .replace(/\{amount\}/, item.amount / 100)
                        .replace(/\{comment\}/, escapeHtml(comments[time % comments.length]));
                }
            });
            if (result) {
                $('#winners').html(result);
                isInWeChat ? $winnersWrap.removeClass('notInWeChat') : $winnersWrap.addClass('notInWeChat');
                $winnersWrap.removeClass('hide');
            }
        };
        var setCookie = function(res) {
            if (res) {
                res.openId ? $.cookie('wc_openid', res.openId, {
                    domain: domain,
                    expires: expires
                }) : $.cookie('wc_openid', null, {
                    domain: domain,
                    expires: -1
                });
                $.cookie('wc_name', res.wcName, {
                    domain: domain,
                    expires: expires
                });
                $.cookie('wc_img', res.wcImg, {
                    domain: domain,
                    expires: expires
                });
            }
        };
        var setAttr = function(selector, str, value) {
            value ? $(selector).css(str, value) : false;
        };
        var setSrc = function(selector, href) {
            var img = new Image();
            var src = instRes + href;
            img.onload = function() {
                $(selector).attr('src', src);
            };
            img.onerror = function() {
                $(selector).attr('src', this.data('src'));;
            };
            img.src = src;
        };
        var setLink = function(selector, isShow, name, url) {
            var $dom = $(selector);
            isShow ? $dom.removeClass('hide') : false;
            name ? $dom.html(name) : false;
            url ? $dom.attr('href', url) : false;
        };
        var setDisplay = function(selector, isShow) {
            isShow ? $(selector).removeClass('hide') : $(selector).addClass('hide');
        };
        var initUI = function(config) {
            if (!config) {
                return;
            }
            setAttr('body', 'backgroundColor', config.backgroundColor); //整体背景色
            setAttr(button_get, 'color', config.buttonTextColor); //按钮抢红包字色
            setAttr(button_get, 'backgroundColor', config.buttonBackgroundColor); //按钮抢红包背景色
            setAttr(openxmbtn, 'color', config.buttonTextColor); //按钮字色
            setAttr(openxmbtn, 'backgroundColor', config.buttonBackgroundColor); //按钮背景色



            setAttr('.count-wrap', 'color', config.successColor); //成功提示色
            setAttr(count, 'color', config.successColor); //成功提示色
            setAttr(amount, 'color', config.ticketAmountColor); //券面金额色
            setAttr(failure_title, 'color', config.failTitleColor); //失败标题色
            setAttr(failure_desc, 'color', config.failSubTitleColor); //失败副标色
            setAttr('.desc-phone', 'color', config.accountTipColor); //账户提示色
            setAttr('.curphone', 'color', config.accountPhoneColor); //账户手机色

            setAttr('.curphone-wrap', 'color', config.updatedAccountColor); //修改账户提示色
            setAttr('.tip-wrap', 'color', config.updatedAccountColor); //修改成功提示色
            setAttr('.curphone-wrap .curphone', 'color', config.updatedPhoneColor); //修改账户手机色
            setAttr(btn_modi, 'color', config.updatedSuccessColor); //修改成功色 

            setSrc('#bgimage', config.topImg); //顶部插图
            setSrc('.coupon-unopen', config.drawImg); //红包领取插图
            setSrc('.coupon-open', config.drawResultImg); //领取结果插图
            setSrc('.modi-bg', config.changePhoneImg); //修改手机插图

            setLink('#flink', config.showLink1, config.linkName1, config.linkUrl1);
            setLink('#slink', config.showLink2, config.linkName2, config.linkUrl2);

            setDisplay('#middle', config.showDealProduct);
            setDisplay(openxmbtn, config.showDownloadButton);

        };
        //获取订单信息
        var init = function() {
            var url = 'http://' + httpUrl + '/biz/rest/share/deal?dealId=' + dealId;
            var phone = getPhone();
            var param = {
                url: link,
                isShowProudct: isShowProudct
            };
            var succ = function(res) {
                var width, pading, i;
                var pics = res.productPics;
                var len = pics ? pics.length : 4;
                var completeTime = res.completeTime;
                var t = res.deliverTime - res.completeTime;
                var time = t > 1800000 ? 10 + Math.ceil(mo + 20) : ((t >= 0 && t <= 1800000 ? 60 - Math.round(t / 60000) : Math.ceil(mo + 50)));
                var drawCouponRecordVO = res.drawCouponRecordVO;
                var h5SharePageConfigDB = res.h5SharePageConfigDB||{};
                var arry = [];
                userRecords = res.records;
                //订单数据展示
                if (completeTime === 0) { //未完成
                    XMLife.addClass(getintime, 'hide');
                    XMLife.addClass(peisong, 'hide');
                    XMLife.addClass(delivertime, 'hide');
                    XMLife.addClass(fenzhong, 'hide');
                } else if (t < 0 && completeTime !== 0) { //完成后，未准时送达
                    XMLife.addClass(getintime, 'hide');
                }
                if (len < 4 && len !== 0) {
                    XMLife.addClass(pros, 'less-than-four');
                } else { //商品>=4
                    XMLife.removeClass(pros, 'less-than-four');
                    scrolllayout.style.width = len * 25 + '%';
                    width = (100 / len * 0.82).toFixed(2);
                    pading = (100 / len * 0.07).toFixed(2);
                }
                if (res.shipfee == 0 && completeTime !== 0) {
                    timedesc.innerHTML = '分钟，运费全免！';
                }
                //显示加载商品
                if (h5SharePageConfigDB.showDealProduct) {
                    arry.push('<div class="dot-before"></div>');
                    if (isShowProudct) {
                        for (i = 0; i < len; i++) {
                            arry.push('<img src="' + imageRes + pics[i] + pro_size + '" style="width:' + width + '%;padding:' + pading + '%">');
                        }
                    } else {
                        for (i = 0; i < len; i++) {
                            arry.push('<img class="img-default" src="static_images/cashcoupon/secret.png" style="width:' + width + '%;padding:' + pading + '%">');
                        }
                        XMLife.addEvent(scrolllayout, 'touchend', function() {
                            XMLife.removeClass(toast, 'hide');
                            setTimeout(function() {
                                XMLife.addClass(toast, 'hide');
                            }, 600);
                        });
                    }
                    arry.push('<div class="dot-after"></div>');
                    scrolllayout.innerHTML = arry.join('');
                }

                number.innerHTML = res.pnum;
                delivertime.innerHTML = time;
                setCookie(res.wcUser);
                if (res.isValid) {
                    if (drawCouponRecordVO && getPhone()) {
                        XMLife.addClass(get, 'hide');
                        XMLife.removeClass(result, 'hide');
                        XMLife.removeClass(desc_panel, 'hide');

                        if (drawCouponRecordVO.drawSuccess) {
                            count.innerHTML = Math.max(drawCouponRecordVO.count, 1);
                            amount.innerHTML = (drawCouponRecordVO.amount / 100).toFixed(2) + '元';
                            XMLife.removeClass(success_msg, 'hide');
                        } else {
                            failure_title.innerHTML = drawCouponRecordVO.title;
                            failure_desc.innerHTML = drawCouponRecordVO.subTitle;
                            XMLife.removeClass(failure_msg, 'hide');
                        }
                        populateWinners(userRecords);
                    }
                    XMLife.removeClass(down, 'hide');
                    XMLife.removeClass(openxmlife, 'hide');
                } else {
                    XMLife.removeClass(download, 'hide');
                }
                initUI(h5SharePageConfigDB);
                if (!(!drawCouponRecordVO && getPhone())) {
                    XMLife.addClass(mask, 'fade');
                }
                XMLife.weChartInit([res.appId, res.timestamp, res.nonceStr, res.signature], title, desc, link, logoSrc, function() {
                    wx.hideOptionMenu();
                });
                //直接领取红包
                if (res.isValid && !drawCouponRecordVO && phone) {
                    getCashCoupon();
                }
            };
            var fail = function(res) {
                window.alert('获取订单数据失败！');
                initUI(res.h5SharePageConfigDB);
                XMLife.addClass(mask, 'fade');
            };
            //存在phone，非首次抢红包
            phone ? param.phone = phone : false;
            //存在code，第一次授权，保存code
            usercode ? param.code = usercode : false;
            //红包置底
            /*            $('#down').css('bottom', function() {
                            var d = document.body.scrollHeight - document.body.scrollWidth;
                            var s = parseInt(0.71 * document.body.scrollWidth);
                            var bottom = Math.min(-d, 0);
                            // if (d < s) {
                            //     bottom = 'auto';
                            // }
                            return bottom;
                        });*/
            //请求红包
            $.ajax({
                url: url,
                type: 'GET',
                data: param,
                timeout: 30000,
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                success: succ,
                error: fail
            });
            phone_input.value = phone;
            updateGetBtn();
        };
        var getCashCoupon = function() {
            var url = 'http://' + httpUrl + '/biz/rest/share/draw/webchat/service/account/coupon';
            var numb = phone_input.value;
            var wcOpenid = $.cookie('wc_openid');
            var wcName = $.cookie('wc_name');
            var wcImg = $.cookie('wc_img');
            var param = {
                dealId: dealId,
                phone: numb,
                wcOpenid: wcOpenid,
                wcName: wcName,
                wcImg: wcImg
            };

            var succ = function(res) {
                var pass = res.isPass;
                var errorCode = res.errorCode;
                var msg = msgs[errorCode] ? msgs[errorCode] : msgs['other'];
                var couponErrorConfigVO = res.couponErrorConfigVO;
                XMLife.addClass(get, 'hide');

                if (errorCode == 818) {
                    XMLife.addClass(down, 'hide');
                    XMLife.removeClass(download, 'hide');
                    return;
                } else {
                    XMLife.removeClass(result, 'hide');
                    XMLife.removeClass(desc_panel, 'hide');
                }
                if (pass) { //领券成功
                    count.innerHTML = Math.max(res.count, 1);
                    amount.innerHTML = (res.totalDiscount / 100).toFixed(2) + '元';
                    XMLife.addClass(desc_panel, 'desc-success');
                    XMLife.removeClass(success_msg, 'hide');
                } else { //领券失败
                    if (couponErrorConfigVO) {
                        failure_title.innerHTML = couponErrorConfigVO.title;
                        failure_desc.innerHTML = couponErrorConfigVO.subTitle;
                    } else {
                        failure_title.innerHTML = msg[0];
                        failure_desc.innerHTML = msg[1];
                    }
                    XMLife.addClass(desc_panel, 'desc-failure');
                    XMLife.removeClass(failure_msg, 'hide');
                }
                XMLife.removeClass(openxmlife, 'hide');
                populateWinners(userRecords);

                if (!XMLife.hasClass(mask, 'fade')) {
                    XMLife.addClass(mask, 'fade');
                } else {
                    XMLife.removeClass(mask, 'loade');
                }
            };
            var fail = function() {
                window.alert('获取失败！');
                if (!XMLife.hasClass(mask, 'fade')) {
                    XMLife.addClass(mask, 'fade');
                } else {
                    XMLife.removeClass(mask, 'loade');
                }
            };
            if (XMLife.hasClass(button_get, 'active')) {
                if (XMLife.hasClass(mask, 'fade')) {
                    XMLife.addClass(mask, 'loade');
                }
                $.ajax({
                    url: url,
                    type: 'GET',
                    data: param,
                    timeout: 30000,
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback',
                    success: succ,
                    error: fail
                });
            }
        };


        XMLife.addEvent(document.body, 'touchstart', function() {});
        for (var i = 0, len = modis.length; i < len; i++) {
            FastClick.attach(modis[i]);
            XMLife.addEvent(modis[i], 'click', function() {
                modiPhone();
            });
        }
        XMLife.addEvent(phone_input, 'input', function() {
            updateGetBtn();
        });
        XMLife.addEvent(button_get, 'click', function() {
            var phone = phone_input.value;
            if (pattern.test(phone)) {
                getCashCoupon();
                setPhone(phone);
            }
        });
        XMLife.addEvent(input_modi, 'input', function() {
            XMLife.removeClass(btn_modi, 'success');
            updateGetBtn(input_modi, btn_modi);
        });
        XMLife.addEvent(btn_modi, 'click', function() {
            var phone = input_modi.value;
            if (pattern.test(phone)) {
                setPhone(phone);
                input_modi.value = '';
                XMLife.addClass(btn_modi, 'active');
                XMLife.addClass(btn_modi, 'success');
                btn_modi.text = '修改成功';
                btn_modi.f = '1';
            }
        });
        XMLife.addEvent(openxmbtn, 'click', function() {
            XMLife.openApp(XMLife.Protocol + XMLife.URI.coupon_URI);
        }, me);
        XMLife.addEvent(download_btn, 'click', function() {
            XMLife.openApp(XMLife.Protocol + XMLife.URI.coupon_URI);
        }, me);
        init();
    })(window.XMLife, window.FastClick);
