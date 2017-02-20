var ANIMATION_DURATION = 300;

function gotoiOS() {
    window.location.href = iphoneUrl;
}

function gotoAndroid() {
    window.location.href = androidUrl;
}

$(function() {
    // 上面菜单导航
    $('#topMenu').on('click', 'span', function() {
        var index = $(this).index() + 2;
        if (index <= 4) {
            $('html, body').animate({
                'scrollTop': $('#page' + index).offset().top
            }, ANIMATION_DURATION);
        } else if (index == 5) {
            window.location.href = './contact.html';
        } else if (index == 6) {
            window.location.href = './about.html';
        }
    });

    // 右侧导航
    var siderNav = $('.navContainer');

    // $(window).scroll(function() {
    //     var ratio = $('body').width() / 1265;
    //     siderNav.css('top', 120 * ratio + $(window).scrollTop());
    // }).trigger('scroll');

    siderNav.on('click', 'a', function() {
        var index = $(this).index() + 1;
        $('body').animate({
            'scrollTop': $('#page' + index).offset().top
        }, ANIMATION_DURATION);
    });

})
