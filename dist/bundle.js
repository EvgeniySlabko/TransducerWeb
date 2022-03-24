/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/chart.js":
/*!*********************!*\
  !*** ./js/chart.js ***!
  \*********************/
/***/ (() => {


var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    //var result = GetBytes(1);
	//var b = new Buffer(1);
	//var value = torqueBuff.pop();
	var value = null;
	if (value != null)
	{
		var now = Date.now();
		chart.data.datasets.forEach(function(dataset) {
			dataset.data.push({
				x: now,
				y: value
			});
		});
	}
}

var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Dataset 2 (cubic interpolation)',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Line chart (hotizontal scroll) sample'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 10,
					delay: 2000,
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'value'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('myChart').getContext('2d');
	window.myChart = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
	config.data.datasets.forEach(function(dataset) {
		dataset.data.forEach(function(dataObj) {
			dataObj.y = randomScalingFactor();
		});
	});
	window.myChart.update();
});

var colorNames = Object.keys(chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
	var colorName = colorNames[config.data.datasets.length % colorNames.length];
	var newColor = chartColors[colorName];
	var newDataset = {
		label: 'Dataset ' + (config.data.datasets.length + 1),
		backgroundColor: color(newColor).alpha(0.5).rgbString(),
		borderColor: newColor,
		fill: false,
		lineTension: 0,
		data: []
	};

	config.data.datasets.push(newDataset);
	window.myChart.update();
});

document.getElementById('removeDataset').addEventListener('click', function() {
	config.data.datasets.pop();
	window.myChart.update();
});

document.getElementById('addData').addEventListener('click', function() {
	onRefresh(window.myChart);
	window.myChart.update();
});



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\r\n\r\n# BEM (BLOCK, ELEMENT, MODIFIER) METHEDOLOGY\r\n\r\n<div class=\"card card--show\">\r\n  <div class=\"card__title\"></div>\r\n  <div class=\"card__container\">\r\n\r\n  </div>\r\n</div>\r\n\r\n.card - BLOCK\r\n\r\n.card__title - ELEMENT\r\n\r\n.card--show - MODIFIER\r\n\r\n*/\r\n\r\n/* RESET styles */\r\n\r\n*,\r\n*::after,\r\n*::before {\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.chart {\r\n\tmin-width: 100px;\r\n    margin-left: 0;\r\n    margin-right: 20px;\r\n\tmargin-bottom: 30px;\r\n}\r\n\r\nhtml,\r\nbody,\r\np {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\na {\r\n\tcolor: #546e7a;\r\n}\r\n\r\nul,\r\nli {\r\n\tlist-style: none;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\n.no--select {\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\t-webkit-user-select: none;\r\n\tuser-select: none;\r\n}\r\n\r\nh3 {\r\n\ttext-align: left;\r\n\tmargin-top: 20px;\r\n\tmargin-bottom: 30px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n/* MAIN styles */\r\n\r\nbody {\r\n\tfont-family: Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n\tfont-size: 14px;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-webkit-text-size-adjust: 100%;\r\n\tscroll-behavior: smooth;\r\n}\r\n\r\n.app-layout {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\nheader {\r\n\tposition: fixed;\r\n\twidth: 100%;\r\n\theight: 56px;\r\n\ttop: 0;\r\n\tbackground-color: #546e7a;\r\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.19);\r\n\tdisplay: flex;\r\n\toverflow: hidden;\r\n\tz-index: 1;\r\n\tcolor: #fff;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\ttransition: background-color 250ms linear;\r\n}\r\n\r\n.app__offline {\r\n\tbackground-color: #6b6b6b;\r\n}\r\n\r\n.header__icon {\r\n\twidth: 48px;\r\n\theight: 48px;\r\n\tmargin: 4px;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tcursor: pointer;\r\n}\r\n\r\n.header__icon:active {\r\n\topacity: 0.8;\r\n\toutline: 1px solid #fff;\r\n}\r\n\r\n.header__title {\r\n\tcolor: #fff;\r\n\tfont-size: 20px;\r\n\t-ms-grid-row-align: center;\r\n\talign-self: center;\r\n\tmargin-left: 10px;\r\n}\r\n\r\n.menu {\r\n\twidth: 280px;\r\n\theight: 100%;\r\n\tbackground: #fff;\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tbox-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);\r\n\tz-index: 1;\r\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\r\n\ttransform: translateX(-110%);\r\n\twill-change: transform;\r\n\tz-index: 2;\r\n}\r\n\r\n.menu--show {\r\n\ttransform: translateX(0);\r\n}\r\n\r\n.menu__overlay {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tbackground: rgba(0, 0, 0, 0.3);\r\n\ttransition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);\r\n\tvisibility: hidden;\r\n\topacity: 0;\r\n\tz-index: 1;\r\n}\r\n\r\n.menu__overlay--show {\r\n\tvisibility: visible;\r\n\topacity: 1;\r\n}\r\n\r\n.menu__header {\r\n\theight: 150px;\r\n\tbackground: #546e7a;\r\n\tcolor: #fff;\r\n\tborder-bottom: 1px solid #ddd;\r\n}\r\n\r\n.menu__list {\r\n\twidth: inherit;\r\n\theight: inherit;\r\n\toverflow: auto;\r\n\toverflow-x: hidden;\r\n\t-webkit-overflow-scrolling: touch;\r\n\tbackground-color: #f5f5f6;\r\n}\r\n\r\n.menu__list li {\r\n\tborder: 0;\r\n\tpadding: 0;\r\n\tbox-shadow: none;\r\n\tborder-radius: 0;\r\n}\r\n\r\n.menu__list li a {\r\n\tpadding: 20px;\r\n\tcolor: rgba(0, 0, 0, 0.87);\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n}\r\n\r\n.menu__list li a:active,\r\n.menu__list li a:hover {\r\n\tbackground: #e7e7e7;\r\n}\r\n\r\n.app__content {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tmargin: 10px ;\r\n\tmargin-top: 56px;\r\n\tpadding-top: 10px;\r\n}\r\n\r\n.toast__msg {\r\n\tmax-width: 290px;\r\n\tmin-height: 50px;\r\n\tline-height: 50px;\r\n\tcolor: #fff;\r\n\tpadding-left: 10px;\r\n\tpadding-right: 10px;\r\n\ttext-transform: initial;\r\n\tmargin-bottom: 10px;\r\n\tbackground-color: #404040;\r\n\tborder-radius: 3px;\r\n\tbox-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\r\n\tword-break: break-all;\r\n\tfont-size: 15px;\r\n\tfont-weight: 400;\r\n\topacity: 0;\r\n\ttransform: translateY(20px);\r\n\twill-change: transform;\r\n\tposition: fixed;\r\n\tbottom: 20px;\r\n\tleft: 20px;\r\n}\r\n\r\n.toast__msg--show {\r\n\topacity: 1;\r\n\ttransform: translateY(0);\r\n}\r\n\r\nbutton {\r\n\tmin-width: 90px;\r\n\theight: 35px;\r\n\tfont-size: 14px;\r\n\tborder: 0;\r\n\tbackground: #4f8efa;\r\n\tcolor: #fff;\r\n\tmargin: 0 auto -5px;\r\n\tdisplay: inline-block;\r\n\tcursor: pointer;\r\n\toutline: 0;\r\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-moz-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-o-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t    -ms-user-select: none;\r\n\t        user-select: none;\r\n\tborder-radius: 4px;\r\n}\r\n\r\nbutton:active {\r\n\tbox-shadow: none;\r\n}\r\n\r\nbutton:disabled {\r\n\tbackground: #ccc;\r\n\tcolor: #000;\r\n\tcursor: not-allowed;\r\n}\r\n\r\n.custom__button p {\r\n\tposition: initial;\r\n\tmargin: 0;\r\n\tpadding-left: 10px;\r\n}\r\n\r\n.custom__button {\r\n\tpadding: 10px 15px;\r\n\tfont-family: \"Roboto\", arial, sans-serif;\r\n\ttext-align: left;\r\n}\r\n\r\n.turn-on-sync {\r\n\tmin-width: 75px;\r\n\theight: 30px;\r\n\tmargin-left: 10px;\r\n}\r\n\r\n.custom__input:checked + .custom__checkbox {\r\n\tbackground: rgb(195, 195, 195);\r\n}\r\n\r\n.custom__input:checked + .custom__checkbox::before {\r\n\tleft: 25px;\r\n\tbackground: #0288d1;\r\n}\r\n\r\n.card__container {\r\n\tmargin-top: 10px;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n\r\n.card {\r\n\twidth: 320px;\r\n\tmin-height: 280px;\r\n\tbackground: #fff;\r\n\tmargin: 20px auto;\r\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n\tborder-radius: 8px;\r\n\tposition: relative;\r\n\tborder: 1px solid #e6e6e6;\r\n}\r\n\r\n.card__title,\r\n.card__desc {\r\n\tdisplay: block;\r\n\tfont-size: 14px;\r\n\ttext-align: center;\r\n}\r\n\r\n.card__title {\r\n\tmargin-left: 5px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.card__temp {\r\n\tpadding: 20px;\r\n\tpadding-bottom: 10px;\r\n}\r\n\r\n.card__temp span {\r\n\tfont-size: 14px;\r\n}\r\n\r\n.card__following,\r\n.card__followers {\r\n\tpadding: 10px 20px 5px;\r\n}\r\n\r\n.card__desc {\r\n\tpadding: 12px 15px;\r\n\tvertical-align: top;\r\n}\r\n\r\n.card__img {\r\n\twidth: 60px;\r\n\theight: 60px;\r\n\tdisplay: block;\r\n\tmargin: 20px auto 10px;\r\n\tborder-radius: 50%;\r\n}\r\n\r\nb {\r\n\tfont-family: inherit;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.card b {\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.card__temp,\r\n.card__followers,\r\n.card__following {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tmargin-bottom: 5px;\r\n}\r\n\r\n.card__followers {\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n.fab {\r\n\twidth: 56px;\r\n\theight: 56px;\r\n\tbackground: #546e7a;\r\n\tborder-radius: 50%;\r\n\tbox-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);\r\n\tcolor: #fff;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n\tposition: fixed;\r\n\tbottom: 0;\r\n\tright: 0;\r\n\tmargin: 25px;\r\n\t-webkit-tap-highlight-color: transparent;\r\n\t-webkit-backface-visibility: hidden;\r\n\tbackface-visibility: hidden;\r\n\toverflow: hidden;\r\n}\r\n\r\n.fab.active {\r\n\tbackground: #faab1a;\r\n}\r\n\r\n.fab__ripple {\r\n\tposition: absolute;\r\n\tleft: -17px;\r\n\tbottom: -12px;\r\n\twidth: 56px;\r\n\theight: 56px;\r\n\ttransform: scale(0.5);\r\n\tbackground: #fff;\r\n\tborder-radius: 50%;\r\n\ttransform-origin: 50%;\r\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\r\n\t-webkit-backface-visibility: hidden;\r\n\tbackface-visibility: hidden;\r\n\twill-change: transform;\r\n\tz-index: 2;\r\n\topacity: 0;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n}\r\n\r\n.fab:active .fab__ripple {\r\n\topacity: 0.2;\r\n\ttransform: scale(1) translate(31%, -22%);\r\n}\r\n\r\n.fab__image {\r\n\toverflow: hidden;\r\n\tz-index: 3;\r\n}\r\n\r\n.add__card {\r\n\tmargin: 40px auto;\r\n\ttext-align: center;\r\n}\r\n\r\n.add__input {\r\n\twidth: 210px;\r\n\theight: 35px;\r\n\tborder: 1px solid #ccc;\r\n\tpadding-left: 10px;\r\n\tfont-size: 14px;\r\n\tdisplay: block;\r\n\tmargin: 10px auto;\r\n\tborder-radius: 4px;\r\n}\r\n\r\n.add__btn {\r\n\theight: 34px;\r\n\tmin-width: 70px;\r\n\tmargin-top: 10px;\r\n\tdisplay: block;\r\n\tmargin-left: 0;\r\n}\r\n\r\n.add__card ul,\r\n.add__card li,\r\n.share__container li {\r\n\twidth: 320px;\r\n\ttext-align: left;\r\n\tmargin: 15px auto;\r\n}\r\n\r\n.add__card p {\r\n\tfont-weight: 500;\r\n\tfont-size: 18px;\r\n\tmargin-top: 40px;\r\n}\r\n\r\n.card span {\r\n\tdisplay: block;\r\n}\r\n\r\n.add__to-card {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n.bg-sync__text {\r\n\tfont-size: 12px;\r\n\tpadding-left: 5px;\r\n\tcolor: #008000;\r\n}\r\n\r\n.custom__button.custom__button-bg {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.custom__button.custom__button-bg.hide {\r\n\tdisplay: none;\r\n}\r\n\r\nb i a {\r\n\ttext-decoration: underline;\r\n\tcolor: #546e7a;\r\n}\r\n\r\n.add__card ul + p {\r\n\tmargin-top: 20px;\r\n}\r\n\r\n.card__spinner {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\ttop: 0;\r\n\tmargin: auto;\r\n\tbackground: rgba(0, 0, 0, 0.16);\r\n\tdisplay: none;\r\n}\r\n\r\n.card__spinner::after {\r\n\tcontent: \"Loading...\";\r\n\tcolor: #546e7a;\r\n\tbackground: #fff;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\ttop: 0;\r\n\tmargin: auto;\r\n\ttext-align: center;\r\n\tline-height: 380px;\r\n\tfont-size: 18px;\r\n}\r\n\r\n.card__spinner.show {\r\n\tdisplay: block;\r\n}\r\n\r\n.share__container a {\r\n\ttext-decoration: underline;\r\n\tcolor: #546e7a;\r\n}\r\n\r\n.share__container {\r\n\tmargin-bottom: 50px;\r\n}\r\n\r\n.share {\r\n\tmargin: 20px auto;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n}\r\n\r\nli {\r\n\tborder: 1px solid #e6e6e6;\r\n\tpadding: 10px;\r\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n\tborder-radius: 8px;\r\n}\r\n\r\nh4 {\r\n\ttext-align: left;\r\n\tmargin-bottom: 30px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,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QUE7QUFQQTs7QUFFQTtDQVlBLGNBQUE7QUFWQTs7QUFFQTtDQVNDLGFBQUE7Q0FDQSxtQkFBQTtDQUlELG1CQUFBO0FBVkE7O0FBRUE7Q0FTQyxlQUFBO0NBQ0EsaUJBQUE7Q0FJRCxjQUFBO0FBVkE7O0FBRUE7Q0FZQSxVQUFBO0NBVkMsU0FBUztDQVNWLHFCQUFBO0FBUEE7O0FBYUE7Q0FWQyxhQUFhO0FBU2Q7O0FBS0E7Q0FWQywwQkFBMEI7Q0FTM0IsY0FBQTtBQVBBOztBQUVBO0NBU0MsZ0JBQUE7QUFQRDs7QUFFQTtDQVNDLGtCQUFBO0NBSUQsT0FBQTtDQVZDLFFBQVE7Q0FTVCxTQUFBO0NBQ0MsTUFBQTtDQUNBLFlBQUE7Q0FDQSwrQkFBQTtDQUNBLGFBQUE7QUFQRDs7QUFFQTtDQVNDLHFCQUFBO0NBQ0EsY0FBQTtDQUNBLGdCQUFBO0NBQ0Esa0JBQUE7Q0FDQSxPQUFBO0NBSUQsUUFBQTtDQVZDLFNBQVM7Q0FTVixNQUFBO0NBQ0MsWUFBQTtDQUlELGtCQUFBO0NBVkMsa0JBQWtCO0NBU25CLGVBQUE7QUFQQTs7QUFhQTtDQVZDLGNBQWM7QUFTZjs7QUFLQTtDQVZDLDBCQUEwQjtDQVMzQixjQUFBO0FBUEE7O0FBRUE7Q0FZQSxtQkFBQTtBQVZBOztBQUVBO0NBU0MsaUJBQUE7Q0FDQSxrQkFBQTtDQUNBLGNBQUE7QUFJRDs7QUFEQTtDQUNDLHlCQUFBO0NBQ0EsYUFBQTtDQUlELHdDQUFBO0NBVkMsa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsZ0JBQWdCO0NBQ2hCLG1CQUFtQjtBQUNwQiIsImZpbGUiOiJzdHlsZXMuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblxuIyBCRU0gKEJMT0NLLCBFTEVNRU5ULCBNT0RJRklFUikgTUVUSEVET0xPR1lcblxuPGRpdiBjbGFzcz1cImNhcmQgY2FyZC0tc2hvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZF9fdGl0bGVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRfX2NvbnRhaW5lclwiPlxuXG4gIDwvZGl2PlxuPC9kaXY+XG5cbi5jYXJkIC0gQkxPQ0tcblxuLmNhcmRfX3RpdGxlIC0gRUxFTUVOVFxuXG4uY2FyZC0tc2hvdyAtIE1PRElGSUVSXG5cbiovXG5cbi8qIFJFU0VUIHN0eWxlcyAqL1xuXG4qLFxuKjo6YWZ0ZXIsXG4qOjpiZWZvcmUge1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sLFxuYm9keSxcbnAge1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG59XG5cbmEge1xuXHRjb2xvcjogIzU0NmU3YTtcbn1cblxudWwsXG5saSB7XG5cdGxpc3Qtc3R5bGU6IG5vbmU7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcbn1cblxuLm5vLS1zZWxlY3Qge1xuXHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xuXHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5oMyB7XG5cdHRleHQtYWxpZ246IGxlZnQ7XG5cdG1hcmdpbi10b3A6IDIwcHg7XG5cdG1hcmdpbi1ib3R0b206IDMwcHg7XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi8qIE1BSU4gc3R5bGVzICovXG5cbmJvZHkge1xuXHRmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG5cdC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcblx0c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG5cbi5hcHAtbGF5b3V0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdHdpZHRoOiAxMDAlO1xuXHRoZWlnaHQ6IDEwMCU7XG59XG5cbmhlYWRlciB7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogNTZweDtcblx0dG9wOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNTQ2ZTdhO1xuXHRib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR6LWluZGV4OiAxO1xuXHRjb2xvcjogI2ZmZjtcblx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xuXHR1c2VyLXNlbGVjdDogbm9uZTtcblx0dHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAyNTBtcyBsaW5lYXI7XG59XG5cbi5hcHBfX29mZmxpbmUge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNmI2YjZiO1xufVxuXG4uaGVhZGVyX19pY29uIHtcblx0d2lkdGg6IDQ4cHg7XG5cdGhlaWdodDogNDhweDtcblx0bWFyZ2luOiA0cHg7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oZWFkZXJfX2ljb246YWN0aXZlIHtcblx0b3BhY2l0eTogMC44O1xuXHRvdXRsaW5lOiAxcHggc29saWQgI2ZmZjtcbn1cblxuLmhlYWRlcl9fdGl0bGUge1xuXHRjb2xvcjogI2ZmZjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHQtbXMtZ3JpZC1yb3ctYWxpZ246IGNlbnRlcjtcblx0YWxpZ24tc2VsZjogY2VudGVyO1xuXHRtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuLm1lbnUge1xuXHR3aWR0aDogMjgwcHg7XG5cdGhlaWdodDogMTAwJTtcblx0YmFja2dyb3VuZDogI2ZmZjtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGJvdHRvbTogMDtcblx0Ym94LXNoYWRvdzogMHB4IDBweCAxMXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG5cdHotaW5kZXg6IDE7XG5cdHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpO1xuXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKTtcblx0LXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTExMCUpO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTExMCUpO1xuXHR3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuXHR6LWluZGV4OiAyO1xufVxuXG4ubWVudS0tc2hvdyB7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG59XG5cbi5tZW51X19vdmVybGF5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4zKTtcblx0dHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKTtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xuXHRvcGFjaXR5OiAwO1xuXHR6LWluZGV4OiAxO1xufVxuXG4ubWVudV9fb3ZlcmxheS0tc2hvdyB7XG5cdHZpc2liaWxpdHk6IHZpc2libGU7XG5cdG9wYWNpdHk6IDE7XG59XG5cbi5tZW51X19oZWFkZXIge1xuXHRoZWlnaHQ6IDE1MHB4O1xuXHRiYWNrZ3JvdW5kOiAjNTQ2ZTdhO1xuXHRjb2xvcjogI2ZmZjtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG59XG5cbi5tZW51X19saXN0IHtcblx0d2lkdGg6IGluaGVyaXQ7XG5cdGhlaWdodDogaW5oZXJpdDtcblx0b3ZlcmZsb3c6IGF1dG87XG5cdG92ZXJmbG93LXg6IGhpZGRlbjtcblx0LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY2O1xufVxuXG4ubWVudV9fbGlzdCBsaSB7XG5cdGJvcmRlcjogMDtcblx0cGFkZGluZzogMDtcblx0Ym94LXNoYWRvdzogbm9uZTtcblx0Ym9yZGVyLXJhZGl1czogMDtcbn1cblxuLm1lbnVfX2xpc3QgbGkgYSB7XG5cdHBhZGRpbmc6IDIwcHg7XG5cdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuXG4ubWVudV9fbGlzdCBsaSBhOmFjdGl2ZSxcbi5tZW51X19saXN0IGxpIGE6aG92ZXIge1xuXHRiYWNrZ3JvdW5kOiAjZTdlN2U3O1xufVxuXG4uYXBwX19jb250ZW50IHtcblx0d2lkdGg6IDMyMHB4O1xuXHRoZWlnaHQ6IDEwMCU7XG5cdG1hcmdpbjogMCBhdXRvO1xuXHRtYXJnaW4tdG9wOiA1NnB4O1xuXHRwYWRkaW5nLXRvcDogMTBweDtcbn1cblxuLnRvYXN0X19tc2cge1xuXHRtYXgtd2lkdGg6IDI5MHB4O1xuXHRtaW4taGVpZ2h0OiA1MHB4O1xuXHRsaW5lLWhlaWdodDogNTBweDtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcblx0cGFkZGluZy1yaWdodDogMTBweDtcblx0dGV4dC10cmFuc2Zvcm06IGluaXRpYWw7XG5cdG1hcmdpbi1ib3R0b206IDEwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICM0MDQwNDA7XG5cdGJvcmRlci1yYWRpdXM6IDNweDtcblx0Ym94LXNoYWRvdzogMCAwIDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcblx0d29yZC1icmVhazogYnJlYWstYWxsO1xuXHRmb250LXNpemU6IDE1cHg7XG5cdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdG9wYWNpdHk6IDA7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG5cdHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0Ym90dG9tOiAyMHB4O1xuXHRsZWZ0OiAyMHB4O1xufVxuXG4udG9hc3RfX21zZy0tc2hvdyB7XG5cdG9wYWNpdHk6IDE7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG5cbmJ1dHRvbiB7XG5cdG1pbi13aWR0aDogOTBweDtcblx0aGVpZ2h0OiAzNXB4O1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGJvcmRlcjogMDtcblx0YmFja2dyb3VuZDogIzRmOGVmYTtcblx0Y29sb3I6ICNmZmY7XG5cdG1hcmdpbjogMCBhdXRvIC01cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRvdXRsaW5lOiAwO1xuXHRib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMzgpO1xuXHQtd2Via2l0LWJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zOCk7XG5cdC1tb3otYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjM4KTtcblx0LW8tYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjM4KTtcblx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuYnV0dG9uOmFjdGl2ZSB7XG5cdGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbmJ1dHRvbjpkaXNhYmxlZCB7XG5cdGJhY2tncm91bmQ6ICNjY2M7XG5cdGNvbG9yOiAjMDAwO1xuXHRjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uY3VzdG9tX19idXR0b24gcCB7XG5cdHBvc2l0aW9uOiBpbml0aWFsO1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuLmN1c3RvbV9fYnV0dG9uIHtcblx0cGFkZGluZzogMTBweCAxNXB4O1xuXHRmb250LWZhbWlseTogXCJSb2JvdG9cIiwgYXJpYWwsIHNhbnMtc2VyaWY7XG5cdHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi50dXJuLW9uLXN5bmMge1xuXHRtaW4td2lkdGg6IDc1cHg7XG5cdGhlaWdodDogMzBweDtcblx0bWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5jdXN0b21fX2lucHV0OmNoZWNrZWQgKyAuY3VzdG9tX19jaGVja2JveCB7XG5cdGJhY2tncm91bmQ6IHJnYigxOTUsIDE5NSwgMTk1KTtcbn1cblxuLmN1c3RvbV9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b21fX2NoZWNrYm94OjpiZWZvcmUge1xuXHRsZWZ0OiAyNXB4O1xuXHRiYWNrZ3JvdW5kOiAjMDI4OGQxO1xufVxuXG4uY2FyZF9fY29udGFpbmVyIHtcblx0bWFyZ2luLXRvcDogMTBweDtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNhcmQge1xuXHR3aWR0aDogMzIwcHg7XG5cdG1pbi1oZWlnaHQ6IDI4MHB4O1xuXHRiYWNrZ3JvdW5kOiAjZmZmO1xuXHRtYXJnaW46IDIwcHggYXV0bztcblx0Ym94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xKTtcblx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNlNmU2ZTY7XG59XG5cbi5jYXJkX190aXRsZSxcbi5jYXJkX19kZXNjIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2FyZF9fdGl0bGUge1xuXHRtYXJnaW4tbGVmdDogNXB4O1xuXHRmb250LXdlaWdodDogNTAwO1xufVxuXG4uY2FyZF9fdGVtcCB7XG5cdHBhZGRpbmc6IDIwcHg7XG5cdHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uY2FyZF9fdGVtcCBzcGFuIHtcblx0Zm9udC1zaXplOiAxNHB4O1xufVxuXG4uY2FyZF9fZm9sbG93aW5nLFxuLmNhcmRfX2ZvbGxvd2VycyB7XG5cdHBhZGRpbmc6IDEwcHggMjBweCA1cHg7XG59XG5cbi5jYXJkX19kZXNjIHtcblx0cGFkZGluZzogMTJweCAxNXB4O1xuXHR2ZXJ0aWNhbC1hbGlnbjogdG9wO1xufVxuXG4uY2FyZF9faW1nIHtcblx0d2lkdGg6IDYwcHg7XG5cdGhlaWdodDogNjBweDtcblx0ZGlzcGxheTogYmxvY2s7XG5cdG1hcmdpbjogMjBweCBhdXRvIDEwcHg7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuYiB7XG5cdGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuXHRmb250LXdlaWdodDogNTAwO1xufVxuXG4uY2FyZCBiIHtcblx0bWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbi5jYXJkX190ZW1wLFxuLmNhcmRfX2ZvbGxvd2Vycyxcbi5jYXJkX19mb2xsb3dpbmcge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jYXJkX19mb2xsb3dlcnMge1xuXHRtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZmFiIHtcblx0d2lkdGg6IDU2cHg7XG5cdGhlaWdodDogNTZweDtcblx0YmFja2dyb3VuZDogIzU0NmU3YTtcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xuXHRib3gtc2hhZG93OiAwIDAgNHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMjgpO1xuXHRjb2xvcjogI2ZmZjtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0cG9zaXRpb246IGZpeGVkO1xuXHRib3R0b206IDA7XG5cdHJpZ2h0OiAwO1xuXHRtYXJnaW46IDI1cHg7XG5cdC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuXHRiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG5cdG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5mYWIuYWN0aXZlIHtcblx0YmFja2dyb3VuZDogI2ZhYWIxYTtcbn1cblxuLmZhYl9fcmlwcGxlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMTdweDtcblx0Ym90dG9tOiAtMTJweDtcblx0d2lkdGg6IDU2cHg7XG5cdGhlaWdodDogNTZweDtcblx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG5cdHRyYW5zZm9ybTogc2NhbGUoMC41KTtcblx0YmFja2dyb3VuZDogI2ZmZjtcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xuXHQtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJTtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlO1xuXHR0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXM7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXM7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXMsIC13ZWJraXQtdHJhbnNmb3JtIDAuMzVzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpIDBtcztcblx0LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG5cdGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcblx0d2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcblx0ei1pbmRleDogMjtcblx0b3BhY2l0eTogMDtcblx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xuXHR1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLmZhYjphY3RpdmUgLmZhYl9fcmlwcGxlIHtcblx0b3BhY2l0eTogMC4yO1xuXHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlKDMxJSwgLTIyJSk7XG5cdHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlKDMxJSwgLTIyJSk7XG59XG5cbi5mYWJfX2ltYWdlIHtcblx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0ei1pbmRleDogMztcbn1cblxuLmFkZF9fY2FyZCB7XG5cdG1hcmdpbjogNDBweCBhdXRvO1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hZGRfX2lucHV0IHtcblx0d2lkdGg6IDIxMHB4O1xuXHRoZWlnaHQ6IDM1cHg7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luOiAxMHB4IGF1dG87XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmFkZF9fYnRuIHtcblx0aGVpZ2h0OiAzNHB4O1xuXHRtaW4td2lkdGg6IDcwcHg7XG5cdG1hcmdpbi10b3A6IDEwcHg7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXJnaW4tbGVmdDogMDtcbn1cblxuLmFkZF9fY2FyZCB1bCxcbi5hZGRfX2NhcmQgbGksXG4uc2hhcmVfX2NvbnRhaW5lciBsaSB7XG5cdHdpZHRoOiAzMjBweDtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0bWFyZ2luOiAxNXB4IGF1dG87XG59XG5cbi5hZGRfX2NhcmQgcCB7XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG5cdGZvbnQtc2l6ZTogMThweDtcblx0bWFyZ2luLXRvcDogNDBweDtcbn1cblxuLmNhcmQgc3BhbiB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uYWRkX190by1jYXJkIHtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0bWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmJnLXN5bmNfX3RleHQge1xuXHRmb250LXNpemU6IDEycHg7XG5cdHBhZGRpbmctbGVmdDogNXB4O1xuXHRjb2xvcjogIzAwODAwMDtcbn1cblxuLmN1c3RvbV9fYnV0dG9uLmN1c3RvbV9fYnV0dG9uLWJnIHtcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5jdXN0b21fX2J1dHRvbi5jdXN0b21fX2J1dHRvbi1iZy5oaWRlIHtcblx0ZGlzcGxheTogbm9uZTtcbn1cblxuYiBpIGEge1xuXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0Y29sb3I6ICM1NDZlN2E7XG59XG5cbi5hZGRfX2NhcmQgdWwgKyBwIHtcblx0bWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmNhcmRfX3NwaW5uZXIge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdHRvcDogMDtcblx0bWFyZ2luOiBhdXRvO1xuXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuXHRkaXNwbGF5OiBub25lO1xufVxuXG4uY2FyZF9fc3Bpbm5lcjo6YWZ0ZXIge1xuXHRjb250ZW50OiBcIkxvYWRpbmcuLi5cIjtcblx0Y29sb3I6ICM1NDZlN2E7XG5cdGJhY2tncm91bmQ6ICNmZmY7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0cmlnaHQ6IDA7XG5cdGJvdHRvbTogMDtcblx0dG9wOiAwO1xuXHRtYXJnaW46IGF1dG87XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0bGluZS1oZWlnaHQ6IDM4MHB4O1xuXHRmb250LXNpemU6IDE4cHg7XG59XG5cbi5jYXJkX19zcGlubmVyLnNob3cge1xuXHRkaXNwbGF5OiBibG9jaztcbn1cblxuLnNoYXJlX19jb250YWluZXIgYSB7XG5cdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuXHRjb2xvcjogIzU0NmU3YTtcbn1cblxuLnNoYXJlX19jb250YWluZXIge1xuXHRtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuXG4uc2hhcmUge1xuXHRtYXJnaW46IDIwcHggYXV0bztcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRkaXNwbGF5OiBibG9jaztcbn1cblxubGkge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZTZlNmU2O1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuXHRib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbmg0IHtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0bWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbiJdfQ== */", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["/*\n\n# BEM (BLOCK, ELEMENT, MODIFIER) METHEDOLOGY\n\n<div class=\"card card--show\">\n  <div class=\"card__title\"></div>\n  <div class=\"card__container\">\n\n  </div>\n</div>\n\n.card - BLOCK\n\n.card__title - ELEMENT\n\n.card--show - MODIFIER\n\n*/\n\n/* RESET styles */\n\n*,\n*::after,\n*::before {\n\tbox-sizing: border-box;\n}\n\nhtml,\nbody,\np {\n\tmargin: 0;\n\tpadding: 0;\n}\n\na {\n\tcolor: #546e7a;\n}\n\nul,\nli {\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.no--select {\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\t-webkit-user-select: none;\n\tuser-select: none;\n}\n\nh3 {\n\ttext-align: left;\n\tmargin-top: 20px;\n\tmargin-bottom: 30px;\n\tfont-weight: 500;\n}\n\n/* MAIN styles */\n\nbody {\n\tfont-family: Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n\tfont-size: 14px;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-size-adjust: 100%;\n\tscroll-behavior: smooth;\n}\n\n.app-layout {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\nheader {\n\tposition: fixed;\n\twidth: 100%;\n\theight: 56px;\n\ttop: 0;\n\tbackground-color: #546e7a;\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.19);\n\tdisplay: flex;\n\toverflow: hidden;\n\tz-index: 1;\n\tcolor: #fff;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\ttransition: background-color 250ms linear;\n}\n\n.app__offline {\n\tbackground-color: #6b6b6b;\n}\n\n.header__icon {\n\twidth: 48px;\n\theight: 48px;\n\tmargin: 4px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tcursor: pointer;\n}\n\n.header__icon:active {\n\topacity: 0.8;\n\toutline: 1px solid #fff;\n}\n\n.header__title {\n\tcolor: #fff;\n\tfont-size: 20px;\n\t-ms-grid-row-align: center;\n\talign-self: center;\n\tmargin-left: 10px;\n}\n\n.menu {\n\twidth: 280px;\n\theight: 100%;\n\tbackground: #fff;\n\tposition: fixed;\n\ttop: 0;\n\tbottom: 0;\n\tbox-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);\n\tz-index: 1;\n\ttransition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\t-webkit-transform: translateX(-110%);\n\ttransform: translateX(-110%);\n\twill-change: transform;\n\tz-index: 2;\n}\n\n.menu--show {\n\t-webkit-transform: translateX(0);\n\ttransform: translateX(0);\n}\n\n.menu__overlay {\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground: rgba(0, 0, 0, 0.3);\n\ttransition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);\n\tvisibility: hidden;\n\topacity: 0;\n\tz-index: 1;\n}\n\n.menu__overlay--show {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n.menu__header {\n\theight: 150px;\n\tbackground: #546e7a;\n\tcolor: #fff;\n\tborder-bottom: 1px solid #ddd;\n}\n\n.menu__list {\n\twidth: inherit;\n\theight: inherit;\n\toverflow: auto;\n\toverflow-x: hidden;\n\t-webkit-overflow-scrolling: touch;\n\tbackground-color: #f5f5f6;\n}\n\n.menu__list li {\n\tborder: 0;\n\tpadding: 0;\n\tbox-shadow: none;\n\tborder-radius: 0;\n}\n\n.menu__list li a {\n\tpadding: 20px;\n\tcolor: rgba(0, 0, 0, 0.87);\n\tcursor: pointer;\n\tdisplay: block;\n}\n\n.menu__list li a:active,\n.menu__list li a:hover {\n\tbackground: #e7e7e7;\n}\n\n.app__content {\n\twidth: 320px;\n\theight: 100%;\n\tmargin: 0 auto;\n\tmargin-top: 56px;\n\tpadding-top: 10px;\n}\n\n.toast__msg {\n\tmax-width: 290px;\n\tmin-height: 50px;\n\tline-height: 50px;\n\tcolor: #fff;\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n\ttext-transform: initial;\n\tmargin-bottom: 10px;\n\tbackground-color: #404040;\n\tborder-radius: 3px;\n\tbox-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\n\tword-break: break-all;\n\tfont-size: 15px;\n\tfont-weight: 400;\n\topacity: 0;\n\t-webkit-transform: translateY(20px);\n\ttransform: translateY(20px);\n\twill-change: transform;\n\tposition: fixed;\n\tbottom: 20px;\n\tleft: 20px;\n}\n\n.toast__msg--show {\n\topacity: 1;\n\t-webkit-transform: translateY(0);\n\ttransform: translateY(0);\n}\n\nbutton {\n\tmin-width: 90px;\n\theight: 35px;\n\tfont-size: 14px;\n\tborder: 0;\n\tbackground: #4f8efa;\n\tcolor: #fff;\n\tmargin: 0 auto -5px;\n\tdisplay: inline-block;\n\tcursor: pointer;\n\toutline: 0;\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-moz-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-o-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\tuser-select: none;\n\tborder-radius: 4px;\n}\n\nbutton:active {\n\tbox-shadow: none;\n}\n\nbutton:disabled {\n\tbackground: #ccc;\n\tcolor: #000;\n\tcursor: not-allowed;\n}\n\n.custom__button p {\n\tposition: initial;\n\tmargin: 0;\n\tpadding-left: 10px;\n}\n\n.custom__button {\n\tpadding: 10px 15px;\n\tfont-family: \"Roboto\", arial, sans-serif;\n\ttext-align: left;\n}\n\n.turn-on-sync {\n\tmin-width: 75px;\n\theight: 30px;\n\tmargin-left: 10px;\n}\n\n.custom__input:checked + .custom__checkbox {\n\tbackground: rgb(195, 195, 195);\n}\n\n.custom__input:checked + .custom__checkbox::before {\n\tleft: 25px;\n\tbackground: #0288d1;\n}\n\n.card__container {\n\tmargin-top: 10px;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.card {\n\twidth: 320px;\n\tmin-height: 280px;\n\tbackground: #fff;\n\tmargin: 20px auto;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n\tborder-radius: 8px;\n\tposition: relative;\n\tborder: 1px solid #e6e6e6;\n}\n\n.card__title,\n.card__desc {\n\tdisplay: block;\n\tfont-size: 14px;\n\ttext-align: center;\n}\n\n.card__title {\n\tmargin-left: 5px;\n\tfont-weight: 500;\n}\n\n.card__temp {\n\tpadding: 20px;\n\tpadding-bottom: 10px;\n}\n\n.card__temp span {\n\tfont-size: 14px;\n}\n\n.card__following,\n.card__followers {\n\tpadding: 10px 20px 5px;\n}\n\n.card__desc {\n\tpadding: 12px 15px;\n\tvertical-align: top;\n}\n\n.card__img {\n\twidth: 60px;\n\theight: 60px;\n\tdisplay: block;\n\tmargin: 20px auto 10px;\n\tborder-radius: 50%;\n}\n\nb {\n\tfont-family: inherit;\n\tfont-weight: 500;\n}\n\n.card b {\n\tmargin-right: 5px;\n}\n\n.card__temp,\n.card__followers,\n.card__following {\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin-bottom: 5px;\n}\n\n.card__followers {\n\tmargin-bottom: 20px;\n}\n\n.fab {\n\twidth: 56px;\n\theight: 56px;\n\tbackground: #546e7a;\n\tborder-radius: 50%;\n\tbox-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);\n\tcolor: #fff;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcursor: pointer;\n\tposition: fixed;\n\tbottom: 0;\n\tright: 0;\n\tmargin: 25px;\n\t-webkit-tap-highlight-color: transparent;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n\toverflow: hidden;\n}\n\n.fab.active {\n\tbackground: #faab1a;\n}\n\n.fab__ripple {\n\tposition: absolute;\n\tleft: -17px;\n\tbottom: -12px;\n\twidth: 56px;\n\theight: 56px;\n\t-webkit-transform: scale(0.5);\n\ttransform: scale(0.5);\n\tbackground: #fff;\n\tborder-radius: 50%;\n\t-webkit-transform-origin: 50%;\n\ttransform-origin: 50%;\n\ttransition: -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms, -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n\twill-change: transform;\n\tz-index: 2;\n\topacity: 0;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.fab:active .fab__ripple {\n\topacity: 0.2;\n\t-webkit-transform: scale(1) translate(31%, -22%);\n\ttransform: scale(1) translate(31%, -22%);\n}\n\n.fab__image {\n\toverflow: hidden;\n\tz-index: 3;\n}\n\n.add__card {\n\tmargin: 40px auto;\n\ttext-align: center;\n}\n\n.add__input {\n\twidth: 210px;\n\theight: 35px;\n\tborder: 1px solid #ccc;\n\tpadding-left: 10px;\n\tfont-size: 14px;\n\tdisplay: block;\n\tmargin: 10px auto;\n\tborder-radius: 4px;\n}\n\n.add__btn {\n\theight: 34px;\n\tmin-width: 70px;\n\tmargin-top: 10px;\n\tdisplay: block;\n\tmargin-left: 0;\n}\n\n.add__card ul,\n.add__card li,\n.share__container li {\n\twidth: 320px;\n\ttext-align: left;\n\tmargin: 15px auto;\n}\n\n.add__card p {\n\tfont-weight: 500;\n\tfont-size: 18px;\n\tmargin-top: 40px;\n}\n\n.card span {\n\tdisplay: block;\n}\n\n.add__to-card {\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin-bottom: 20px;\n}\n\n.bg-sync__text {\n\tfont-size: 12px;\n\tpadding-left: 5px;\n\tcolor: #008000;\n}\n\n.custom__button.custom__button-bg {\n\tpadding: 0;\n\tmargin: 0;\n\tdisplay: inline-block;\n}\n\n.custom__button.custom__button-bg.hide {\n\tdisplay: none;\n}\n\nb i a {\n\ttext-decoration: underline;\n\tcolor: #546e7a;\n}\n\n.add__card ul + p {\n\tmargin-top: 20px;\n}\n\n.card__spinner {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\tmargin: auto;\n\tbackground: rgba(0, 0, 0, 0.16);\n\tdisplay: none;\n}\n\n.card__spinner::after {\n\tcontent: \"Loading...\";\n\tcolor: #546e7a;\n\tbackground: #fff;\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\tmargin: auto;\n\ttext-align: center;\n\tline-height: 380px;\n\tfont-size: 18px;\n}\n\n.card__spinner.show {\n\tdisplay: block;\n}\n\n.share__container a {\n\ttext-decoration: underline;\n\tcolor: #546e7a;\n}\n\n.share__container {\n\tmargin-bottom: 50px;\n}\n\n.share {\n\tmargin: 20px auto;\n\ttext-align: center;\n\tdisplay: block;\n}\n\nli {\n\tborder: 1px solid #e6e6e6;\n\tpadding: 10px;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n\tborder-radius: 8px;\n}\n\nh4 {\n\ttext-align: left;\n\tmargin-bottom: 30px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/Buffer.ts":
/*!***********************!*\
  !*** ./src/Buffer.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class RingBuffer {
    constructor(size) {
        this.pushIndex = 0;
        this.popIndex = 0;
        this.dataBytes = 0;
        if (size < 1) {
            throw "Неверный размер очереди";
        }
        this.size = size;
        this.buff = new Array(size);
        this.popIndex = 0;
        this.pushIndex = 0;
        this.dataBytes = 0;
    }
    push(value) {
        var newIndex = this.incrementIndex(this.pushIndex);
        this.buff[this.pushIndex] = value;
        this.pushIndex = newIndex;
        this.dataBytes++;
        if (newIndex == this.popIndex) {
            console.log("Buffer owerflow!!!!!!!!");
            this.dataBytes = 0;
        }
    }
    pop() {
        if (this.pushIndex == this.popIndex) {
            return 0;
        }
        else {
            var value = this.buff[this.popIndex];
            this.popIndex = this.incrementIndex(this.popIndex);
            this.dataBytes--;
            return value;
        }
    }
    incrementIndex(index) {
        if (index == this.size - 1)
            return 0;
        return ++index;
    }
    clear() {
        this.popIndex = 0;
        this.pushIndex = 0;
    }
    dataCount() {
        return this.dataBytes;
    }
}
exports["default"] = RingBuffer;


/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
__webpack_require__(/*! ../js/chart */ "./js/chart.js");
const Buffer_1 = __importDefault(__webpack_require__(/*! ./Buffer */ "./src/Buffer.ts"));
//import a from "./tss"
const person = {};
console.log(person.speak());
var a = new Buffer_1.default(5);
console.log(a.size);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map