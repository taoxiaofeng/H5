/**
 * Created by taoxiaofeng on 16/7/14.
 */
//本插件由www.swiper.com.cn提供
function swiperAnimateCache() {
    for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("swiper-animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
}
function swiperAnimate(a) {
    clearSwiperAnimate();
    var b = a.slides[a.activeIndex].querySelectorAll(".ani");
    for (i = 0; i < b.length; i++)b[i].style.visibility = "visible", effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value : "", b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
}
function clearSwiperAnimate() {
    for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
}

/**
 * http://www.imqiyu.com/web/38.html
 * author imqiyu
 * email hi@imqiyu.com
 * Released on: July 1, 2015
 */
function swiperAnimateCache() {
    for (ab = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < ab.length; i++) {
        ab[i].attributes["style"] ? ab[i].setAttribute("swiper-animate-style-cache", ab[i].attributes["style"].value) : ab[i].setAttribute("swiper-animate-style-cache", " ");
        ab[i].style.visibility = "hidden";
        var a = ab[i].attributes["data-slide-in"], slide_out = ab[i].attributes["data-slide-out"];
        if (a) {
            var b = a.value.split(' ');
            ab[i].setAttribute('in_at', parseInt(gp('at', b)));
            ab[i].setAttribute('in_from', gp('from', b));
            ab[i].setAttribute('in_use', gp('use', b));
            ab[i].setAttribute('in_during', parseInt(gp('during', b)));
            ab[i].setAttribute('in_plus', parseInt(gp('plus', b)));
            ab[i].setAttribute('in_force', gp('force', b))
        }
        if (slide_out) {
            var c = slide_out.value.split(' ');
            ab[i].setAttribute('out_at', parseInt(gp('at', c)));
            ab[i].setAttribute('out_to', gp('to', c));
            ab[i].setAttribute('out_use', gp('use', c));
            ab[i].setAttribute('out_during', parseInt(gp('during', c)));
            ab[i].setAttribute('out_plus', parseInt(gp('plus', c)));
            ab[i].setAttribute('out_force', gp('force', c))
        }
    }
}
var nt = '', cd = {}, er = new Array(), to = false, oi = '', p = {
    at: 0,
    from: 'left',
    to: 'right',
    use: 'swing',
    during: 1000,
    plus: 0,
    force: false
};
function swiperAnimate(a) {
    clearSwiperAnimate();
    var b = a.slides[a.activeIndex].querySelectorAll(".ani");
    nt = new Date().getTime();
    for (i = 0; i < b.length; i++) {
        b[i].style.visibility = "visible";
        var c = b[i].attributes["in_from"] ? b[i].attributes["in_from"].value : "";
        b[i].className = b[i].className + "  " + c + " " + "animated";
        var d = b[i].attributes["style"].value;
        var e = b[i].attributes["in_during"] ? parseInt(b[i].attributes["in_during"].value) : "";
        e && (d = d + "animation-duration:" + (e / 1000 + 's') + ";-webkit-animation-duration:" + (e / 1000 + 's') + ";");
        var f = b[i].attributes["in_at"] ? parseInt(b[i].attributes["in_at"].value) : "";
        f && (d = d + "animation-delay:" + (f / 1000 + 's') + ";-webkit-animation-delay:" + (f / 1000 + 's') + ";");
        var g = b[i].attributes["in_use"] ? b[i].attributes["in_use"].value : "";
        g && (d = d + "transition-timing-function:" + g + "; -webkit-transition-timing-function:" + g + ";");
        b[i].setAttribute("style", d);
        if (b[i].attributes["out_force"] && b[i].attributes["out_force"].value != 'false') {
            var h = parseInt(f) + parseInt(e) + parseInt(b[i].attributes["out_at"].value);
            if (cd[h]) {
                cd[h][i] = {element: b[i]}
            } else {
                cd[h] = {};
                cd[h][i] = {element: b[i]}
            }
        }
    }
    if (!isNullObj(cd)) {
        var j = 0;
        for (var i in cd) {
            er.push({time: parseInt(i) - j, element: cd[i]});
            j = parseInt(i)
        }
        cd = {}
    }
    if (er.length) {
        executionAnimate()
    }
}
function isNullObj(a) {
    for (var i in a) {
        if (a.hasOwnProperty(i)) {
            return false
        }
    }
    return true
}
function executionAnimate() {
    if (!to) {
        to = true;
        oi = setTimeout(executionAnimate, er[0].time);
        return true
    }
    var a = er.shift();
    if (a) {
        for (var i in a.element) {
            var b = a.element[i].element;
            b.className = b.className.replace(b.attributes["in_from"].value, "");
            var c = b.attributes["out_to"] ? b.attributes["out_to"].value : "";
            b.className = b.className + "  " + c + " ";
            var d = b.attributes["style"].value;
            var e = b.attributes["out_during"] ? parseInt(b.attributes["out_during"].value) : "";
            e && (d = d + "animation-duration:" + (e / 1000 + 's') + ";-webkit-animation-duration:" + (e / 1000 + 's') + ";");
            var f = b.attributes["out_at"] ? parseInt(b.attributes["out_at"].value) : "";
            f && (d = d + "animation-delay:" + (f / 1000 + 's') + ";-webkit-animation-delay:" + (f / 1000 + 's') + ";");
            var g = b.attributes["out_use"] ? b.attributes["out_use"].value : "";
            g && (d = d + "transition-timing-function:" + g + "; -webkit-transition-timing-function:" + g + ";");
            b.setAttribute("style", d)
        }
    }
    if (er.length) {
        oi = setTimeout(executionAnimate, er[0].time)
    }
}
function gp(a, b) {
    var c = b.indexOf(a);
    if (c < 0)return p[a];
    return b[c + 1] || !b[c + 1]
}
function clearSwiperAnimate() {
    nt = '', er = new Array(), clearInterval(oi), to = false;
    for (ab = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < ab.length; i++) {
        ab[i].attributes["swiper-animate-style-cache"] && ab[i].setAttribute("style", ab[i].attributes["swiper-animate-style-cache"].value);
        ab[i].style.visibility = "hidden";
        ab[i].className = ab[i].className.replace("animated", "");
        ab[i].attributes["in_from"] && (ab[i].className = ab[i].className.replace(ab[i].attributes["in_from"].value, ""));
        ab[i].attributes["out_to"] && (ab[i].className = ab[i].className.replace(ab[i].attributes["out_to"].value, ""))
    }
}