$(function () {//JS開頭

	var WINDOW = $(window).width();//視窗寬度
	var WINDOWH = $(window).height();//視窗高度

	//---------------------訂單點擊出現選單設定------------------------
	var mailList = $('.js-slidetoleft').each(function () {
		var listItem = $(this);
		var hammer = new Hammer(this);
		var minX = -275; // 右側按鈕寬度
		var maxX = 0;
		var lastPosX;

		hammer.on('tap', function (e) {
			listItem.animate({ left: maxX + "px" }, 100);
			listItem.addClass('active');
			resetOtherItems(listItem);
		});

		function resetOtherItems(activeItem) {
			$('.js-slidetoleft').not(activeItem).each(function () {
				var item = $(this);
				item.animate({ left: "0px" }, 100);
				item.removeClass('active');
			});
		}
	});
	$('.js-slidetoleft').click(function () {//關閉其他補印選單
		$(this).parent(".js-order-card-wrapper").siblings(".js-order-card-wrapper").find(".collapse").collapse("hide");
	})
	$(".js-order-card-function").find("button:not(.order-card-function-menu button)").click(function () {
		$(this).closest(".js-order-card-wrapper").find(".collapse").collapse("hide");
	});
	//---------------------切換按鈕設定------------------------
	$('.js-select-list-btn').click(function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			var parentToggleBtnList = $(this).closest(".js-radio-btn-list");
			parentToggleBtnList.find(".js-select-list-btn").removeClass('active');
			$(this).addClass('active');
		}
	});
	//---------------------優惠按鈕設定---------------------------
	$('.js-checkout-coupon-toggler').click(function () {
		if ($(this).hasClass("using")) {
			$('.js-checkout-coupon-toggler').removeClass('using');
			$('.js-checkout-coupon-toggler p').html('使用優惠');
		} else {
			$(this).toggleClass('active');
			$('.js-checkout-coupon').toggleClass('active');
			$('.js-checkout-coupon-list').toggleClass('active');
		}
	})
	$(".js-checkout-coupon-list-btn").click(function () {
		$('.js-checkout-coupon-toggler').removeClass('active');
		$('.js-checkout-coupon').removeClass('active');
		$('.js-checkout-coupon-toggler').addClass('using');
		$('.js-checkout-coupon-toggler p').html('取消優惠');
		$('.js-checkout-coupon-list').removeClass('active');
	})
	//---------------------filter按鈕設定------------------------
	$('.js-filter button').click(function () {
		$(this).toggleClass('active');
	})
	//
	$('[data-status="notice"]').find("img").attr('src', './assets/images/ic-online-notice.svg')
	//---------------------多項目選單按鈕設定------------------------
	$(".js-top-nav-toggle-btn").click(function () {
		$(this).toggleClass('active');
		$(".js-top-nav-toggle").toggleClass('active');
		$(".js-top-nav").toggleClass('show');
	})
	//----------主選單active設定------------

	function moveActiveBar($item) {
		const offsetTop = $item.position().top;
		const height = $item.outerHeight();
		$('.nav-active').css({
			top: offsetTop + 'px',
			height: height + 'px'
		});
	}

	// 初始設定 active 樣式與 nav-active 位置
	const $initial = $('.js-nav-link.active').closest('.nav-item');
	if ($initial.length) {
		moveActiveBar($initial);
	}

	// 點擊時更新 active 樣式與 nav-active 位置
	$(".js-nav-link").click(function () {
		$('.js-nav-link').removeClass('active');
		$(this).addClass('active');
		const $item = $(this).closest('.nav-item');
		moveActiveBar($item);
	});

	//點餐視窗設定
	/*const myOffcanvas = new bootstrap.Offcanvas('#order-btnlist', {
		backdrop: false,   // 不顯示背景遮罩
		scroll: true       // 讓背景可滾動與點擊
	  });
	$('.menu-card-item').click(function () {
		offcanvas.show(); // 不會因重複點擊而關閉
	});*/

	//---------------------點餐左滑刪除設定------------------------
	var mailList = $('.js-slidedelete').each(function () {
		var hammer = new Hammer(this);
		var direction;
		var minX = -88//右側按鈕寬度
		var maxX = 0;
		var buying = false;
		var lastPosX;
		var listItem;

		hammer.on('panleft panright panend', function (e) {
			e.preventDefault();
			listItem = $(e.target).parents('.js-slidedelete');
			var positionX = e.deltaX;
			positionX = positionX + lastPosX;
			if (e.type == 'panleft' && positionX >= -90 && positionX <= 0) {
				direction = e.type;
				listItem.css('left', positionX);
			} else if (e.type == 'panright' && positionX <= 30 && positionX >= -50) {
				direction = e.type;
				listItem.css('left', positionX);
			} else if (e.type == 'panend') {
				snap(direction, listItem);
			}
		});

		function snap(direction, listItem) {
			lastPosX = direction == 'panleft' ? minX : maxX;
			buying = lastPosX == minX ? true : false;
			console.log(buying);
			listItem.animate({
				left: lastPosX + "px"
			}, 100);
			listItem.addClass('active');
			resetOtherItems(listItem);
		}

		hammer.on('panstart', function (e) {
			listItem = $(e.target).parents('.js-slidedelete');
			listItem.addClass('active');
			resetOtherItems(listItem);
		});

		function resetOtherItems(activeItem) {
			$('.js-slidedelete').not(activeItem).each(function () {
				var item = $(this);
				item.animate({ left: "0px" }, 100);
				item.removeClass('active');
			});
		}

		hammer.on('tap', function (e) {
			var listItem = $(e.target).parents('.js-slidedelete');
			listItem.addClass('active');
			resetOtherItems(listItem);
		});
	});

	//---------------------桌號設定------------------------
	$(".js-box-list-wrapper").find("button").click(function () {
		$(this).toggleClass("active");
	})
	//----------------列數切換-----------------
	$(".js-grid3").click(function () {
		$(".js-menu-card").find("li").removeClass("col-3").addClass("col-4");
	})
	$(".js-grid4").click(function () {
		$(".js-menu-card").find("li").removeClass("col-4").addClass("col-3");
	})
	//----------------搜尋按鈕-----------------
	$(".js-backdrop").click(function () {
		$(".js-search-dropdown").removeClass("active");
		$(".js-backdrop").removeClass("show");
	})
	$(".js-search-input").click(function () {
		$(".js-search-dropdown").toggleClass("active");
		$(".js-backdrop").toggleClass("show");
	})
	$(".js-search-btn").click(function () {
		$(".js-search-dropdown").removeClass("active");
		$(".js-backdrop").removeClass("show");
	})
	//----------------搜尋按鈕-----------------
	$('[data-bs-target="#checkout"]').click(function () {
		$(".side-tab").find("li").eq(0).find(".side-tab-item").click();
	})
	//----------------電子發票設定-----------------
	$('[data-bs-toggle="tab"]').click(function () {
		var target = $(this).data('bs-target'); // 取得要顯示的 tab-pane id
		// 1. 移除所有 tablist 裡的 active
		$('[role="tablist"] .active').removeClass('active');
		// 2. 給當前點擊的按鈕加上 active
		$(this).addClass('active');
		// 3. 隱藏所有 tab-pane（可跨容器）
		$('.tab-content .tab-pane').removeClass('show active');
		// 4. 顯示對應的 tab-pane
		$(target).addClass('show active');
	});
	
})//JS尾端	

//-------------------備註判斷---------------------
function checkInput() {
	var input = document.getElementById('note-number');
	var inputValue = input.value.trim(); // 获取输入框的值，并去除前后的空格
	if (inputValue !== '') {
		$(".js-note-show").removeClass("d-none");
		$(".js-note-btn").addClass("d-none");
	} else {
		$(".js-note-show").addClass("d-none");
		$(".js-note-btn").removeClass("d-none");
	}
}
