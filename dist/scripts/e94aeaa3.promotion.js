!function(a){var b=this,c="http://"+httpUrl+"/biz/rest/share/draw/promoter/coupon",d="http://"+httpUrl+"/biz/rest/share/wechat/token",e=document.getElementById("phone_input"),f=document.getElementById("button_get"),g=document.getElementById("openxmlife"),h=document.getElementById("download_btn"),i=document.getElementById("mask"),j=a.getParameterByName("code"),k=/^[\d]{11}$/,l=window.wx,m=function(){var b=function(b,c,d,e){var f=document.getElementById("logo").src,g="你的菜钱我出了！快来抢红包一起用~",h="蔬果生鲜，食品百货：超市代买，1小时速达！";l.config({debug:!1,appId:b,nonceStr:d,timestamp:c,signature:e,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),l.ready(function(){l.onMenuShareTimeline({title:g,link:"",imgUrl:f}),l.onMenuShareAppMessage({title:g,desc:h,link:"",imgUrl:f,type:"",dataUrl:""}),l.onMenuShareQQ({title:g,desc:h,link:"",imgUrl:f}),l.onMenuShareWeibo({title:g,desc:h,link:"",imgUrl:f})}),a.addClass(i,"fade")},c=function(a){var c=a.appId,d=a.timestamp,e=a.nonceStr,f=a.signature;b(c,d,e,f)},e=function(){};$.ajax({url:d,type:"GET",data:{url:window.location.href.split("#")[0]},dataType:"jsonp",jsonp:"jsoncallback",success:c,error:e})};m();var n=function(){var b=e.value,d=function(c){var d=c.isPass,e=document.getElementById("get"),f=document.getElementById("count"),h=document.getElementById("amount"),j=document.getElementById("phone"),k=document.getElementById("result"),l=document.getElementById("coupon_open"),m=document.getElementById("failure_msg"),n=document.getElementById("success_msg"),o=document.getElementById("failure_title"),p=document.getElementById("failure_desc"),q=document.getElementById("desc_panel"),r={802:["您的卡券太多啦!","赶紧去花掉一些~"],806:["今天领了很多啦!","明天再接再厉哦~"],823:["领过了!","留点机会给别人吧~"],820:["过期了!","下次早点来哦~"],821:["过期了!","下次早点来哦~"],isOld:["领取失败!","抱歉，该优惠仅限新手用户领取"],expired:["过期了!","下次早点来哦~"],other:["领完啦!","下次早点来哦~"]},s="",t="";a.addClass(e,"hide"),a.removeClass(k,"hide"),a.removeClass(l,"hide"),d?(f.innerHTML=c.count,h.innerHTML=(c.totalDiscount/100).toFixed(2)+"元",j.innerHTML=b,a.addClass(q,"desc-success"),a.removeClass(n,"hide")):(s=r.isOld[0],t=r.isOld[1],o.innerHTML=s,p.innerHTML=t,a.addClass(q,"desc-failure"),a.removeClass(m,"hide")),a.removeClass(g,"hide"),a.addClass(i,"fade")},h=function(){window.alert("获取失败！"),a.removeClass(i,"fade")};a.hasClass(f,"active")&&(a.addClass(i,"fade"),$.ajax({url:c,type:"GET",data:{phone:b,code:j},dataType:"jsonp",jsonp:"jsoncallback",success:d,failure:h}))};a.addEvent(e,"input",function(){k.test(e.value)?a.addClass(f,"active"):a.removeClass(f,"active")}),a.addEvent(f,"touchstart",function(){k.test(e.value)&&(a.hasClass(f,"active")?a.removeClass(f,"active"):null)},b),a.addEvent(f,"touchend",function(){k.test(e.value)&&(a.hasClass(f,"active")?null:a.addClass(f,"active"),n())}),a.addEvent(g,"touchstart",function(){a.hasClass(g,"active")?null:a.addClass(g,"active")},b),a.addEvent(g,"touchend",function(){a.hasClass(g,"active")?a.removeClass(g,"active"):null,window.location.href=a.downloadURL},b),a.addEvent(h,"touchstart",function(){a.hasClass(h,"active")?null:a.addClass(h,"active")},b),a.addEvent(h,"touchend",function(){a.hasClass(h,"active")?a.removeClass(h,"active"):null,window.location.href=a.downloadURL},b)}(XMLife);