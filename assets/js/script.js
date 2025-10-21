$(function () {//JS開頭

	//---------------------訂單點擊出現選單
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
	//---------------------訂單點擊時
	$('.js-slidetoleft').click(function () {
		$(this).parents("li").siblings("li").find(".js-order-dropdown-item").slideUp(200);
		$(this).parents("li").siblings("li").find(".js-order-dropdown").removeClass("show");
	})
	//---------------------訂單選單功能
	$(".js-order-card-function button").click(function (e) {
		const $btn = $(this);
		const $li = $btn.closest("li");
		const $otherLi = $li.siblings("li");
		const $otherCards = $otherLi.find(".js-order-card");
		const $otherCheck = $otherLi.find(".form-check-input:checked");//已選取的選取框
		const $allDropdownItem = $(".js-order-dropdown-item");//所有次選單
		const $dropdownBox = $li.find(".js-order-dropdown");//我的次選單框架
		const $order = $(".js-order");//訂單容器

		if ($btn.hasClass("js-dropdown-toggler")) { // 含次選單按鈕
			const target = $btn.data("target"); 
			const $dropdown = $li.find(".js-order-dropdown-item[data-con='" + target + "']");

			// 先關掉同一個訂單下其他 dropdown
			$li.find(".js-order-dropdown-item").not($dropdown).slideUp(200);
			$dropdownBox.removeClass("show");
			// 切換目前 dropdown
			$dropdown.slideDown(200);
			$dropdownBox.addClass("show");

			if ($li.is(":last-child")) {//確保最後一個次選單露出
				setTimeout(() => {
					$order.animate({
						scrollTop:
							$dropdownBox.position().top + $order.scrollTop() - 200
					}, 100);
				}, 100);
			}

			if ($btn.hasClass("js-merge-btn")) {//若為合併按鈕
				$otherCards.addClass("merging");
			} else {
				$otherCards.removeClass("merging");
			}


		} else { // 不含次選單按鈕
			$allDropdownItem.slideUp(200);
			$dropdownBox.removeClass("show");
			$otherCards.removeClass("merging");
			$otherCheck.addClass("god")
			$otherCheck.trigger('click').trigger('change');
		}
		
	});
//擴大合併選取點擊範圍
	$(".js-order-card").click(function (e) {
		if($(this).hasClass("merging")){
			$(this).find(".form-check-input").trigger('click').trigger('change');;
		}
	})

	//---------------------訂單次選單功能
	$(".js-order-dropdown a").click(function (e) {
		if ($(this).is(".js-cancel-dropdown")){//如果是取消按鈕
			const $dropdownItem = $(this).closest(".js-order-dropdown-item");//我的次選單
			const $dropdownBox = $(this).closest(".js-order-dropdown");//我的次選單框架
			const $otherCheck = $(this).closest(".js-order-dropdown").closest("li").siblings("li").find(".form-check-input:checked");//已選取的選取框
			$dropdownItem.slideUp(200);
			$dropdownBox.removeClass("show");
			$(".js-order-card").removeClass("merging");
			$otherCheck.trigger('click').trigger('change');
		}
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
