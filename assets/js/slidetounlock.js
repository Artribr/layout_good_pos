$(function () {
	var sliders = document.querySelectorAll('.js-slidetounlock-slider');

	Array.prototype.forEach.call(sliders, function (slider) {
		var hammertime = new Hammer(slider, {});

		hammertime.on('pan', function (ev) {
			if (ev.deltaX > 180) {
				var txt = slider.nextElementSibling;
				$(txt).fadeOut(200);
				console.log(txt);
				setTimeout(function () {
					var offcanvas = slider.closest('.offcanvas-bottom');
					$(offcanvas).find("button").click();
					$(txt).fadeIn(200);
					slider.style.transform = 'translateX(' + 0 + 'px)';
				}, 500);
			} else {
				slider.style.transform = 'translateX(' + ev.deltaX + 'px)';
			}
		});

		hammertime.on('panend', function (ev) {
			if (ev.deltaX < 150) {
				slider.style.transform = 'translateX(' + 0 + 'px)';
			}
		});
	});
});