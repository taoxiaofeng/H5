!function(a){function b(){$.when($.ajax({url:"http://"+httpUrl+"/biz/rest/share/wechat/token",type:"GET",data:{url:window.location.href.split("#")[0]},dataType:"jsonp",jsonp:"jsoncallback"}),$.ajax({url:"http://"+httpUrl+"/biz/rest/share/shareConfig",type:"GET",dataType:"jsonp",jsonp:"jsoncallback"})).done(function(b,c){var d=b[0].appId,e=b[0].timestamp,f=b[0].nonceStr,g=b[0].signature,h=function(){wx.hideOptionMenu()},i=c[0].configs[3],j=[];j.push(i[1].title),j.push(i[2].title),j.push(i[3].title);var k=i[1].content||"",l=i[1].icon?i[1].icon:document.getElementById("share_logo").src,m=window.location.href.split("#")[0];a.weChartInit([d,e,f,g],j,k,l,h,null),a.xmShareInit(j,k,m,l)}).fail(function(){window.alert("分享初始化失败！")})}function c(){$.ajax({url:"http://"+httpUrl+"/biz/rest/share/shareConfig",type:"GET",dataType:"jsonp",jsonp:"jsoncallback",success:function(b){var c=b.configs[3],d=[];d.push(c[1].title),d.push(c[2].title),d.push(c[3].title);var e=c[1].content||"",f=c[1].icon?c[1].icon:document.getElementById("share_logo").src,g=window.location.href.split("#")[0];a.xmShareInit(d,e,g,f)},error:function(){window.alert("分享初始化失败！")}})}function d(){var b=a.getParameterByName("cid"),c="http://"+httpUrl+"/biz/rest/share/consume",d=document.getElementById("next"),f=function(a){var b=a.userName,c=a.totalDays,d=a.totalDeals,e=a.totalAmount,f=a.totalProducts,g=a.phone;""===b?document.getElementById("name").innerHTML=g:document.getElementById("name").innerHTML=b,document.getElementById("day").innerHTML=c,document.getElementById("deal").innerHTML=d,document.getElementById("count").innerHTML=f,document.getElementById("money").innerHTML=(e/100).toFixed(2)},g=function(a){};$.ajax({url:c,type:"GET",data:{cid:b},dataType:"jsonp",jsonp:"jsoncallback",success:f,error:g}),a.addEvent(d,"touchend",function(){e.slideNext()})}var e=new Swiper(".swiper-container",{initialSlide:0,direction:"vertical",height:window.innerHeight,width:window.innerWidth,observer:!0,observeParents:!0});if(a.isXMLife()){var f=document.getElementById("downloadpage"),g=document.getElementById("arrow");$(f).remove(),a.addClass(g,"hide"),c()}else{var h=document.getElementById("btn");a.addEvent(h,"touchend",function(){window.open(a.downloadURL)}),b()}d()}(window.XMLife);