'use strict';

$(function() {

	var mask = $('#mask'),
		bigMapContainer = mask.children('.bigMapContainer'),
		bigMap = bigMapContainer.children('.bigMap'),
		btnBar = mask.children('.btnBar'),
		fit2HeightBtn = btnBar.children('.fit2height');

	function showMask() {
		btnBar.css('margin-left', $('#mainframe').css('margin-left'));
		mask.fadeIn({complete: function() {
			// 由初始状态及hideMask()逻辑决定，打开mask时fit2HeightBtn一定是关闭的，且没有附加'isFit'class
			// 重新判断bigMap的高度是否超出了视图边界
			if (bigMapContainer.height() < bigMap.height()) {
				fit2HeightBtn.show();
			}
		}});
	}

	function hideMask() {
		mask.fadeOut({complete: function() {
			// 清理是否可以fit to height以及fit to height状态
			bigMap.css('height', 'auto');
			fit2HeightBtn.hide();
			fit2HeightBtn.removeClass('isFit');
		}});
	}

	// Resize 事件有效覆盖了移动端设备旋转的情况。在这种情况下‘大地图’元素的尺寸和位置
	// 不能很好的重新适配，所有自动关掉遮罩层。
	$(window).resize(function() {
		hideMask();
	});

	bigMap.load(function() {
		showMask();
	});

	btnBar.children('.close').click(function(event) {
		event.stopPropagation();
		hideMask();
	});

	fit2HeightBtn.click(function() {
		var isFit = fit2HeightBtn.hasClass('isFit');
		fit2HeightBtn.toggleClass('isFit');
		bigMap.css('height', isFit ? 'auto' : bigMapContainer.height());
	});

	$('#mapHotArea').click(function() {
		event.preventDefault();
		var imgsReady = (bigMap.attr('src') !== '');
		if (imgsReady) {
			showMask();
		} else {
			bigMap.attr('src', '/static_images/welcome_new_hire/map.png');
		}		
	});
});
