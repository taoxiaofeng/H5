!function(a,b){b.attach(document.body);var c=this,d=window.wx,e=document.getElementById("phone_input"),f=document.getElementById("button_get"),g=document.getElementById("count"),h=document.getElementById("amount"),i=document.getElementById("get"),j=document.getElementById("result"),k=document.getElementById("openxmlife"),l=document.getElementById("openxm"),m=document.getElementById("pros"),n=document.getElementById("number"),o=document.getElementById("delivertime"),p=document.getElementById("scrolllayout"),q=document.getElementById("download"),r=document.getElementById("download_btn"),s=document.getElementById("down"),t=document.getElementById("mask"),u=document.getElementById("getintime"),v=document.getElementById("timedesc"),w=document.getElementById("desc_panel"),x=document.getElementById("success_msg"),y=document.getElementById("failure_msg"),z=document.getElementById("failure_title"),A=document.getElementById("failure_desc"),B=document.getElementById("input_modi"),C=document.getElementById("btn_modi"),D=document.getElementById("modi"),E=document.getElementsByClassName("curphone"),F=document.getElementsByClassName("modis"),G=document.getElementById("peisong"),H=document.getElementById("fenzhong"),I=document.getElementById("toast"),J=(document.getElementById("bg"),a.getParameterByName("dealId")),K="true"===a.getParameterByName("isShowProduct")?!0:!1,L="你的菜钱我出了！快来抢红包一起用~",M="蔬果生鲜，食品百货：超市代买，1小时速达！",N=window.location.href.split("#")[0],O=document.getElementById("logo").src,P=J%10,Q=/^[\d]{11}$/,R="@!hongbao",S=.14*(.87*document.body.offsetWidth-5)+"px",T="xiaomei.com",U=a.getParameterByName("code"),V=new Date((new Date).getFullYear()+1+""),W=[],X={818:["优惠券关闭","下次早点来喔~"],823:["领过啦","留点机会给别人吧~"],802:["您的卡券太多啦!","快去用掉一些吧~"],807:["您的卡券太多啦!","快去用掉一些吧~"],806:["今天领太多啦!","明天再来奋战喔~"],grabout:["领完啦","下次早点来喔~"],expired:["过期啦","下次早点来喔~"],other:["领完啦","下次早点来喔~"]},Y="cacheCouponPhone",Z=function(){var a=localStorage&&localStorage.getItem(Y);return a&&aa(a),a||""},_=function(a){aa(a),localStorage&&localStorage.setItem(Y,a)},aa=function(a){for(var b=0,c=E.length;c>b;b++)E[b].innerHTML=a},ba=function(b,c){var d=b||e,g=c||f;Q.test(d.value)?a.addClass(g,"active"):(a.removeClass(g,"active"),c&&c.f?c.text="修改":!1)},ca=function(){a.addClass(j,"hide"),a.removeClass(D,"hide")},da=function(a){var b='<div class="portrait-wrap"><img style="width:'+S+";height:"+S+'" class="portrait" src="{headimage}"><table style="float:left" width="80%" class="singleWinner"><tr><td><span class="userName">{name}</span><span class="timeStamp">{timeStamp}</span></td><td><span rowspan="2" class="money">{amount}元</span> </td></tr><tr><td><span class="comment">{comment}</span></td></tr></table></div>',c='<table width="100%" class="singleWinner"><tr><td><span class="userName">{name}</span><span class="timeStamp">{timeStamp}</span></td><td><span rowspan="2" class="money">{amount}元</span> </td></tr><tr><td><span class="comment">{comment}</span></td></tr></table>',d="",e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},f=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return e[a]})},g=["买蔬果生鲜，就用小美快购！","买菜购物不出门，棒极了！","红包这么大！今天加个菜〜","今天菜钱有了，棒棒嗒！","以后在家就能逛超市了！","以后柴米油盐再也不用自己扛了！","再不用小美就落伍了！","谢壕龙恩〜","天天发红包你妈知道吗？","用小美，新鲜肉菜天天有〜","向来人品好〜手气爆棚！","不出门，鲜菜照有！","新鲜水果，美味到家！","帅哥送货上门哦〜"],h=$(".winnersWrapper"),i=$.cookie("wc_openid")?!0:!1,j=i?b:c;$.each(a||[],function(a,b){var c=i?b.nick:b.phone,e=b.gmtCreate||(new Date).getTime(),h=new Date(e),k=b.headImg;h=h.getMonth()+1+"-"+h.getDate()+" "+h.getHours()+":"+h.getMinutes()||"",c&&b.amount&&(d+=j.replace(/\{name\}/,f(c)).replace(/\{timeStamp\}/,h).replace(/\{headimage\}/,k).replace(/\{amount\}/,b.amount/100).replace(/\{comment\}/,f(g[e%g.length])))}),d&&($("#winners").html(d),i?h.removeClass("notInWeChat"):h.addClass("notInWeChat"),h.removeClass("hide"))},ea=function(a){a&&(a.openId?$.cookie("wc_openid",a.openId,{domain:T,expires:V}):$.cookie("wc_openid",null,{domain:T,expires:-1}),$.cookie("wc_name",a.wcName,{domain:T,expires:V}),$.cookie("wc_img",a.wcImg,{domain:T,expires:V}))},fa=function(a,b,c){c?$(a).css(b,c):!1},ga=function(a,b){var c=new Image,d=instRes+b;c.onload=function(){$(a).attr("src",d)},c.onerror=function(){$(a).attr("src",this.data("src"))},c.src=d},ha=function(a,b,c,d){var e=$(a);b?e.removeClass("hide"):!1,c?e.html(c):!1,d?e.attr("href",d):!1},ia=function(a,b){b?$(a).removeClass("hide"):$(a).addClass("hide")},ja=function(a){a&&(fa("body","backgroundColor",a.backgroundColor),fa(f,"color",a.buttonTextColor),fa(f,"backgroundColor",a.buttonBackgroundColor),fa(l,"color",a.buttonTextColor),fa(l,"backgroundColor",a.buttonBackgroundColor),fa(".count-wrap","color",a.successColor),fa(g,"color",a.successColor),fa(h,"color",a.ticketAmountColor),fa(z,"color",a.failTitleColor),fa(A,"color",a.failSubTitleColor),fa(".desc-phone","color",a.accountTipColor),fa(".curphone","color",a.accountPhoneColor),fa(".curphone-wrap","color",a.updatedAccountColor),fa(".tip-wrap","color",a.updatedAccountColor),fa(".curphone-wrap .curphone","color",a.updatedPhoneColor),fa(C,"color",a.updatedSuccessColor),ga("#bgimage",a.topImg),ga(".coupon-unopen",a.drawImg),ga(".coupon-open",a.drawResultImg),ga(".modi-bg",a.changePhoneImg),ha("#flink",a.showLink1,a.linkName1,a.linkUrl1),ha("#slink",a.showLink2,a.linkName2,a.linkUrl2),ia("#middle",a.showDealProduct),ia(l,a.showDownloadButton))},ka=function(){var b="http://"+httpUrl+"/biz/rest/share/deal?dealId="+J,c=Z(),f={url:N,isShowProudct:K},l=function(b){var e,f,l,r=b.productPics,B=r?r.length:4,C=b.completeTime,D=b.deliverTime-b.completeTime,E=D>18e5?10+Math.ceil(P+20):D>=0&&18e5>=D?60-Math.round(D/6e4):Math.ceil(P+50),F=b.drawCouponRecordVO,J=b.h5SharePageConfigDB||{},Q=[];if(W=b.records,0===C?(a.addClass(u,"hide"),a.addClass(G,"hide"),a.addClass(o,"hide"),a.addClass(H,"hide")):0>D&&0!==C&&a.addClass(u,"hide"),4>B&&0!==B?a.addClass(m,"less-than-four"):(a.removeClass(m,"less-than-four"),p.style.width=25*B+"%",e=(100/B*.82).toFixed(2),f=(100/B*.07).toFixed(2)),0==b.shipfee&&0!==C&&(v.innerHTML="分钟，运费全免！"),J.showDealProduct){if(Q.push('<div class="dot-before"></div>'),K)for(l=0;B>l;l++)Q.push('<img src="'+imageRes+r[l]+R+'" style="width:'+e+"%;padding:"+f+'%">');else{for(l=0;B>l;l++)Q.push('<img class="img-default" src="static_images/cashcoupon/secret.png" style="width:'+e+"%;padding:"+f+'%">');a.addEvent(p,"touchend",function(){a.removeClass(I,"hide"),setTimeout(function(){a.addClass(I,"hide")},600)})}Q.push('<div class="dot-after"></div>'),p.innerHTML=Q.join("")}n.innerHTML=b.pnum,o.innerHTML=E,ea(b.wcUser),b.isValid?(F&&Z()&&(a.addClass(i,"hide"),a.removeClass(j,"hide"),a.removeClass(w,"hide"),F.drawSuccess?(g.innerHTML=Math.max(F.count,1),h.innerHTML=(F.amount/100).toFixed(2)+"元",a.removeClass(x,"hide")):(z.innerHTML=F.title,A.innerHTML=F.subTitle,a.removeClass(y,"hide")),da(W)),a.removeClass(s,"hide"),a.removeClass(k,"hide")):a.removeClass(q,"hide"),ja(J),(F||!Z())&&a.addClass(t,"fade"),a.weChartInit([b.appId,b.timestamp,b.nonceStr,b.signature],L,M,N,O,function(){d.hideOptionMenu()}),b.isValid&&!F&&c&&la()},r=function(b){window.alert("获取订单数据失败！"),ja(b.h5SharePageConfigDB),a.addClass(t,"fade")};c?f.phone=c:!1,U?f.code=U:!1,$.ajax({url:b,type:"GET",data:f,timeout:3e4,dataType:"jsonp",jsonp:"jsoncallback",success:l,error:r}),e.value=c,ba()},la=function(){var b="http://"+httpUrl+"/biz/rest/share/draw/webchat/service/account/coupon",c=e.value,d=$.cookie("wc_openid"),l=$.cookie("wc_name"),m=$.cookie("wc_img"),n={dealId:J,phone:c,wcOpenid:d,wcName:l,wcImg:m},o=function(b){var c=b.isPass,d=b.errorCode,e=X[d]?X[d]:X.other,f=b.couponErrorConfigVO;return a.addClass(i,"hide"),818==d?(a.addClass(s,"hide"),void a.removeClass(q,"hide")):(a.removeClass(j,"hide"),a.removeClass(w,"hide"),c?(g.innerHTML=Math.max(b.count,1),h.innerHTML=(b.totalDiscount/100).toFixed(2)+"元",a.addClass(w,"desc-success"),a.removeClass(x,"hide")):(f?(z.innerHTML=f.title,A.innerHTML=f.subTitle):(z.innerHTML=e[0],A.innerHTML=e[1]),a.addClass(w,"desc-failure"),a.removeClass(y,"hide")),a.removeClass(k,"hide"),da(W),void(a.hasClass(t,"fade")?a.removeClass(t,"loade"):a.addClass(t,"fade")))},p=function(){window.alert("获取失败！"),a.hasClass(t,"fade")?a.removeClass(t,"loade"):a.addClass(t,"fade")};a.hasClass(f,"active")&&(a.hasClass(t,"fade")&&a.addClass(t,"loade"),$.ajax({url:b,type:"GET",data:n,timeout:3e4,dataType:"jsonp",jsonp:"jsoncallback",success:o,error:p}))};a.addEvent(document.body,"touchstart",function(){});for(var ma=0,na=F.length;na>ma;ma++)b.attach(F[ma]),a.addEvent(F[ma],"click",function(){ca()});a.addEvent(e,"input",function(){ba()}),a.addEvent(f,"click",function(){var a=e.value;Q.test(a)&&(la(),_(a))}),a.addEvent(B,"input",function(){a.removeClass(C,"success"),ba(B,C)}),a.addEvent(C,"click",function(){var b=B.value;Q.test(b)&&(_(b),B.value="",a.addClass(C,"active"),a.addClass(C,"success"),C.text="修改成功",C.f="1")}),a.addEvent(l,"click",function(){a.openApp(a.Protocol+a.URI.coupon_URI)},c),a.addEvent(r,"click",function(){a.openApp(a.Protocol+a.URI.coupon_URI)},c),ka()}(window.XMLife,window.FastClick);