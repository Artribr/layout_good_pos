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
			$otherCheck.prop('checked', false).trigger('change');
		}

	});
	// 擴大合併選取點擊範圍
	$(".js-order-card").click(function (e) {
		if ($(this).hasClass("merging")) {
			const $checkbox = $(this).find(".form-check-input");
			$checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
		}
	})

	//---------------------訂單次選單功能
	$(".js-order-dropdown a").click(function (e) {
		if ($(this).is(".js-cancel-dropdown")) {//如果是取消按鈕
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
	//-------------------會員搜尋綁定視窗---------------------
	function checkMemberActive() {
		var hasActive = $(".js-member-modal-list button.active").length > 0;
		var couponCount = $(".js-coupon-list button").length;

		// 沒選會員
		if (!hasActive) {
			$(".js-unselected").show();
			$(".js-coupon-list").hide();
			$(".js-nocoupon").hide();
			return;
		}

		// 有選會員
		$(".js-unselected").hide();

		if (couponCount === 0) {
			// 有會員但沒 coupon
			$(".js-coupon-list").hide();
			$(".js-nocoupon").show();
		} else {
			// 有會員且有 coupon
			$(".js-coupon-list").show();
			$(".js-nocoupon").hide();
		}
	}


	// 點會員
	$('.js-member-modal-list button').click(function () {
		$(this)
			.addClass("active")
			.siblings("button")
			.removeClass("active");

		checkMemberActive();
	})

	// 初始狀態
	checkMemberActive();

	//-------------------多選膠囊按鈕---------------------
	document.querySelectorAll('.segmented-control').forEach(group => {
		const radios = group.querySelectorAll('input[type="radio"]');
		const labels = group.querySelectorAll('label');
		const slider = group.querySelector('.slider');
		const count = labels.length;
		slider.style.width = `calc((100% - 8px) / ${count})`;

		function update() {
			const index = [...radios].findIndex(r => r.checked);
			const targetLabel = labels[index];
			slider.style.width = `${targetLabel.offsetWidth}px`;
			slider.style.transform = `translateX(${targetLabel.offsetLeft}px)`;
			labels.forEach((l, i) => {
				l.classList.toggle('active', i === index);
			});
		}

		labels.forEach((label, i) => {
			label.addEventListener('click', () => {
				radios[i].checked = true;
				update();
			});
		});

		update();
	});

	//toast通知功能
	jQuery(document).ready(function ($) {

		// --- 核心監聽事件 ---
		$(document).on("change", 'input[role="switch"]', function () {
			const $this = $(this);

			// 1. 檢查是否在 data-func="setting" 範圍內
			if (!$this.closest('[data-func="setting"]').length) return;

			const isChecked = $this.prop("checked");
			let itemName = "";

			// 2. 判斷是在「上方導覽列」還是在「下方商品列表」
			if ($this.closest('.top-nav-item').length) {
				// 上方導覽列：抓按鈕裡的 <p> 文字
				itemName = $this.closest('.top-nav-item').find('p').first().text().trim();
			} else if ($this.closest('.menu-edit-list').length) {
				// 下方商品列表：抓商品標題 <h4>
				itemName = $this.closest('.menu-edit-list').find('.order-list-title').text().trim();
			}

			// 3. 如果還是抓不到，抓 Label 的文字作為保險
			if (!itemName) {
				itemName = $this.closest('.form-check').find('label').text().replace('分類開關', '').replace('項目開關', '').trim();
			}

			// 4. 顯示 Toast
			const type = isChecked ? "success" : "inactive";
			const statusText = isChecked ? "已啟用" : "已關閉";
			showToast(`${statusText}「${itemName}」`, type);
		});

		// --- Toast 顯示函式 ---
		function showToast(message, type) {
			if ($("#toast-container").length === 0) {
				$("body").append('<div id="toast-container"></div>');
			}

			const $toast = $(`
				<div class="custom-toast ${type}">
					<span class="toast-text">${message}</span>
					<span class="close">&times;</span>
				</div>
			`);

			$("#toast-container").append($toast);
			$toast.fadeIn(200);

			let timer = setTimeout(() => removeToast($toast), 3000);

			$toast.find(".close").on("click", function () {
				clearTimeout(timer);
				removeToast($toast);
			});
		}

		// --- Toast 移除函式 (含平滑淡出動畫) ---
		function removeToast($el) {
			if (!$el || $el.data('removing')) return;
			$el.data('removing', true); // 防止重複觸發

			// 1. 觸發 CSS 向下飄落與淡出
			// 我們往下方移動 30px 並讓透明度歸零
			$el.css({
				"transform": "translateY(30px)",
				"opacity": "0",
				"pointer-events": "none"
			});

			// 2. 飄落的同時讓空間開始平滑收縮
			// 這樣下方的 Toast 會「順著」飄落的節奏慢慢推上來
			setTimeout(() => {
				$el.slideUp({
					duration: 300,
					easing: "swing",
					complete: function () {
						$(this).remove();
					}
				});
			});
		}
	});
})//JS尾端	