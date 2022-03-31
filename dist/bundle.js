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

/***/ "./node_modules/chart.js/dist/chart.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/chart.js/dist/chart.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation),
/* harmony export */   "Animations": () => (/* binding */ Animations),
/* harmony export */   "ArcElement": () => (/* binding */ ArcElement),
/* harmony export */   "BarController": () => (/* binding */ BarController),
/* harmony export */   "BarElement": () => (/* binding */ BarElement),
/* harmony export */   "BasePlatform": () => (/* binding */ BasePlatform),
/* harmony export */   "BasicPlatform": () => (/* binding */ BasicPlatform),
/* harmony export */   "BubbleController": () => (/* binding */ BubbleController),
/* harmony export */   "CategoryScale": () => (/* binding */ CategoryScale),
/* harmony export */   "Chart": () => (/* binding */ Chart),
/* harmony export */   "DatasetController": () => (/* binding */ DatasetController),
/* harmony export */   "Decimation": () => (/* binding */ plugin_decimation),
/* harmony export */   "DomPlatform": () => (/* binding */ DomPlatform),
/* harmony export */   "DoughnutController": () => (/* binding */ DoughnutController),
/* harmony export */   "Element": () => (/* binding */ Element),
/* harmony export */   "Filler": () => (/* binding */ plugin_filler),
/* harmony export */   "Interaction": () => (/* binding */ Interaction),
/* harmony export */   "Legend": () => (/* binding */ plugin_legend),
/* harmony export */   "LineController": () => (/* binding */ LineController),
/* harmony export */   "LineElement": () => (/* binding */ LineElement),
/* harmony export */   "LinearScale": () => (/* binding */ LinearScale),
/* harmony export */   "LogarithmicScale": () => (/* binding */ LogarithmicScale),
/* harmony export */   "PieController": () => (/* binding */ PieController),
/* harmony export */   "PointElement": () => (/* binding */ PointElement),
/* harmony export */   "PolarAreaController": () => (/* binding */ PolarAreaController),
/* harmony export */   "RadarController": () => (/* binding */ RadarController),
/* harmony export */   "RadialLinearScale": () => (/* binding */ RadialLinearScale),
/* harmony export */   "Scale": () => (/* binding */ Scale),
/* harmony export */   "ScatterController": () => (/* binding */ ScatterController),
/* harmony export */   "SubTitle": () => (/* binding */ plugin_subtitle),
/* harmony export */   "Ticks": () => (/* binding */ Ticks),
/* harmony export */   "TimeScale": () => (/* binding */ TimeScale),
/* harmony export */   "TimeSeriesScale": () => (/* binding */ TimeSeriesScale),
/* harmony export */   "Title": () => (/* binding */ plugin_title),
/* harmony export */   "Tooltip": () => (/* binding */ plugin_tooltip),
/* harmony export */   "_adapters": () => (/* binding */ adapters),
/* harmony export */   "_detectPlatform": () => (/* binding */ _detectPlatform),
/* harmony export */   "animator": () => (/* binding */ animator),
/* harmony export */   "controllers": () => (/* binding */ controllers),
/* harmony export */   "defaults": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d),
/* harmony export */   "elements": () => (/* binding */ elements),
/* harmony export */   "layouts": () => (/* binding */ layouts),
/* harmony export */   "plugins": () => (/* binding */ plugins),
/* harmony export */   "registerables": () => (/* binding */ registerables),
/* harmony export */   "registry": () => (/* binding */ registry),
/* harmony export */   "scales": () => (/* binding */ scales)
/* harmony export */ });
/* harmony import */ var _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks/helpers.segment.js */ "./node_modules/chart.js/dist/chunks/helpers.segment.js");
/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */



class Animator {
  constructor() {
    this._request = null;
    this._charts = new Map();
    this._running = false;
    this._lastDate = undefined;
  }
  _notify(chart, anims, date, type) {
    const callbacks = anims.listeners[type];
    const numSteps = anims.duration;
    callbacks.forEach(fn => fn({
      chart,
      initial: anims.initial,
      numSteps,
      currentStep: Math.min(date - anims.start, numSteps)
    }));
  }
  _refresh() {
    if (this._request) {
      return;
    }
    this._running = true;
    this._request = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.r.call(window, () => {
      this._update();
      this._request = null;
      if (this._running) {
        this._refresh();
      }
    });
  }
  _update(date = Date.now()) {
    let remaining = 0;
    this._charts.forEach((anims, chart) => {
      if (!anims.running || !anims.items.length) {
        return;
      }
      const items = anims.items;
      let i = items.length - 1;
      let draw = false;
      let item;
      for (; i >= 0; --i) {
        item = items[i];
        if (item._active) {
          if (item._total > anims.duration) {
            anims.duration = item._total;
          }
          item.tick(date);
          draw = true;
        } else {
          items[i] = items[items.length - 1];
          items.pop();
        }
      }
      if (draw) {
        chart.draw();
        this._notify(chart, anims, date, 'progress');
      }
      if (!items.length) {
        anims.running = false;
        this._notify(chart, anims, date, 'complete');
        anims.initial = false;
      }
      remaining += items.length;
    });
    this._lastDate = date;
    if (remaining === 0) {
      this._running = false;
    }
  }
  _getAnims(chart) {
    const charts = this._charts;
    let anims = charts.get(chart);
    if (!anims) {
      anims = {
        running: false,
        initial: true,
        items: [],
        listeners: {
          complete: [],
          progress: []
        }
      };
      charts.set(chart, anims);
    }
    return anims;
  }
  listen(chart, event, cb) {
    this._getAnims(chart).listeners[event].push(cb);
  }
  add(chart, items) {
    if (!items || !items.length) {
      return;
    }
    this._getAnims(chart).items.push(...items);
  }
  has(chart) {
    return this._getAnims(chart).items.length > 0;
  }
  start(chart) {
    const anims = this._charts.get(chart);
    if (!anims) {
      return;
    }
    anims.running = true;
    anims.start = Date.now();
    anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
    this._refresh();
  }
  running(chart) {
    if (!this._running) {
      return false;
    }
    const anims = this._charts.get(chart);
    if (!anims || !anims.running || !anims.items.length) {
      return false;
    }
    return true;
  }
  stop(chart) {
    const anims = this._charts.get(chart);
    if (!anims || !anims.items.length) {
      return;
    }
    const items = anims.items;
    let i = items.length - 1;
    for (; i >= 0; --i) {
      items[i].cancel();
    }
    anims.items = [];
    this._notify(chart, anims, Date.now(), 'complete');
  }
  remove(chart) {
    return this._charts.delete(chart);
  }
}
var animator = new Animator();

const transparent = 'transparent';
const interpolators = {
  boolean(from, to, factor) {
    return factor > 0.5 ? to : from;
  },
  color(from, to, factor) {
    const c0 = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.c)(from || transparent);
    const c1 = c0.valid && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.c)(to || transparent);
    return c1 && c1.valid
      ? c1.mix(c0, factor).hexString()
      : to;
  },
  number(from, to, factor) {
    return from + (to - from) * factor;
  }
};
class Animation {
  constructor(cfg, target, prop, to) {
    const currentValue = target[prop];
    to = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a)([cfg.to, to, currentValue, cfg.from]);
    const from = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a)([cfg.from, currentValue, to]);
    this._active = true;
    this._fn = cfg.fn || interpolators[cfg.type || typeof from];
    this._easing = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.e[cfg.easing] || _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.e.linear;
    this._start = Math.floor(Date.now() + (cfg.delay || 0));
    this._duration = this._total = Math.floor(cfg.duration);
    this._loop = !!cfg.loop;
    this._target = target;
    this._prop = prop;
    this._from = from;
    this._to = to;
    this._promises = undefined;
  }
  active() {
    return this._active;
  }
  update(cfg, to, date) {
    if (this._active) {
      this._notify(false);
      const currentValue = this._target[this._prop];
      const elapsed = date - this._start;
      const remain = this._duration - elapsed;
      this._start = date;
      this._duration = Math.floor(Math.max(remain, cfg.duration));
      this._total += elapsed;
      this._loop = !!cfg.loop;
      this._to = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a)([cfg.to, to, currentValue, cfg.from]);
      this._from = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a)([cfg.from, currentValue, to]);
    }
  }
  cancel() {
    if (this._active) {
      this.tick(Date.now());
      this._active = false;
      this._notify(false);
    }
  }
  tick(date) {
    const elapsed = date - this._start;
    const duration = this._duration;
    const prop = this._prop;
    const from = this._from;
    const loop = this._loop;
    const to = this._to;
    let factor;
    this._active = from !== to && (loop || (elapsed < duration));
    if (!this._active) {
      this._target[prop] = to;
      this._notify(true);
      return;
    }
    if (elapsed < 0) {
      this._target[prop] = from;
      return;
    }
    factor = (elapsed / duration) % 2;
    factor = loop && factor > 1 ? 2 - factor : factor;
    factor = this._easing(Math.min(1, Math.max(0, factor)));
    this._target[prop] = this._fn(from, to, factor);
  }
  wait() {
    const promises = this._promises || (this._promises = []);
    return new Promise((res, rej) => {
      promises.push({res, rej});
    });
  }
  _notify(resolved) {
    const method = resolved ? 'res' : 'rej';
    const promises = this._promises || [];
    for (let i = 0; i < promises.length; i++) {
      promises[i][method]();
    }
  }
}

const numbers = ['x', 'y', 'borderWidth', 'radius', 'tension'];
const colors = ['color', 'borderColor', 'backgroundColor'];
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set('animation', {
  delay: undefined,
  duration: 1000,
  easing: 'easeOutQuart',
  fn: undefined,
  from: undefined,
  loop: undefined,
  to: undefined,
  type: undefined,
});
const animationOptions = Object.keys(_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.animation);
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe('animation', {
  _fallback: false,
  _indexable: false,
  _scriptable: (name) => name !== 'onProgress' && name !== 'onComplete' && name !== 'fn',
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set('animations', {
  colors: {
    type: 'color',
    properties: colors
  },
  numbers: {
    type: 'number',
    properties: numbers
  },
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe('animations', {
  _fallback: 'animation',
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set('transitions', {
  active: {
    animation: {
      duration: 400
    }
  },
  resize: {
    animation: {
      duration: 0
    }
  },
  show: {
    animations: {
      colors: {
        from: 'transparent'
      },
      visible: {
        type: 'boolean',
        duration: 0
      },
    }
  },
  hide: {
    animations: {
      colors: {
        to: 'transparent'
      },
      visible: {
        type: 'boolean',
        easing: 'linear',
        fn: v => v | 0
      },
    }
  }
});
class Animations {
  constructor(chart, config) {
    this._chart = chart;
    this._properties = new Map();
    this.configure(config);
  }
  configure(config) {
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(config)) {
      return;
    }
    const animatedProps = this._properties;
    Object.getOwnPropertyNames(config).forEach(key => {
      const cfg = config[key];
      if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(cfg)) {
        return;
      }
      const resolved = {};
      for (const option of animationOptions) {
        resolved[option] = cfg[option];
      }
      ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(cfg.properties) && cfg.properties || [key]).forEach((prop) => {
        if (prop === key || !animatedProps.has(prop)) {
          animatedProps.set(prop, resolved);
        }
      });
    });
  }
  _animateOptions(target, values) {
    const newOptions = values.options;
    const options = resolveTargetOptions(target, newOptions);
    if (!options) {
      return [];
    }
    const animations = this._createAnimations(options, newOptions);
    if (newOptions.$shared) {
      awaitAll(target.options.$animations, newOptions).then(() => {
        target.options = newOptions;
      }, () => {
      });
    }
    return animations;
  }
  _createAnimations(target, values) {
    const animatedProps = this._properties;
    const animations = [];
    const running = target.$animations || (target.$animations = {});
    const props = Object.keys(values);
    const date = Date.now();
    let i;
    for (i = props.length - 1; i >= 0; --i) {
      const prop = props[i];
      if (prop.charAt(0) === '$') {
        continue;
      }
      if (prop === 'options') {
        animations.push(...this._animateOptions(target, values));
        continue;
      }
      const value = values[prop];
      let animation = running[prop];
      const cfg = animatedProps.get(prop);
      if (animation) {
        if (cfg && animation.active()) {
          animation.update(cfg, value, date);
          continue;
        } else {
          animation.cancel();
        }
      }
      if (!cfg || !cfg.duration) {
        target[prop] = value;
        continue;
      }
      running[prop] = animation = new Animation(cfg, target, prop, value);
      animations.push(animation);
    }
    return animations;
  }
  update(target, values) {
    if (this._properties.size === 0) {
      Object.assign(target, values);
      return;
    }
    const animations = this._createAnimations(target, values);
    if (animations.length) {
      animator.add(this._chart, animations);
      return true;
    }
  }
}
function awaitAll(animations, properties) {
  const running = [];
  const keys = Object.keys(properties);
  for (let i = 0; i < keys.length; i++) {
    const anim = animations[keys[i]];
    if (anim && anim.active()) {
      running.push(anim.wait());
    }
  }
  return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options = target.options;
  if (!options) {
    target.options = newOptions;
    return;
  }
  if (options.$shared) {
    target.options = options = Object.assign({}, options, {$shared: false, $animations: {}});
  }
  return options;
}

function scaleClip(scale, allowedOverflow) {
  const opts = scale && scale.options || {};
  const reverse = opts.reverse;
  const min = opts.min === undefined ? allowedOverflow : 0;
  const max = opts.max === undefined ? allowedOverflow : 0;
  return {
    start: reverse ? max : min,
    end: reverse ? min : max
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x = scaleClip(xScale, allowedOverflow);
  const y = scaleClip(yScale, allowedOverflow);
  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}
function toClip(value) {
  let t, r, b, l;
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(value)) {
    t = value.top;
    r = value.right;
    b = value.bottom;
    l = value.left;
  } else {
    t = r = b = l = value;
  }
  return {
    top: t,
    right: r,
    bottom: b,
    left: l,
    disabled: value === false
  };
}
function getSortedDatasetIndices(chart, filterVisible) {
  const keys = [];
  const metasets = chart._getSortedDatasetMetas(filterVisible);
  let i, ilen;
  for (i = 0, ilen = metasets.length; i < ilen; ++i) {
    keys.push(metasets[i].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
  const keys = stack.keys;
  const singleMode = options.mode === 'single';
  let i, ilen, datasetIndex, otherValue;
  if (value === null) {
    return;
  }
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    datasetIndex = +keys[i];
    if (datasetIndex === dsIndex) {
      if (options.all) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(otherValue) && (singleMode || (value === 0 || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(value) === (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(otherValue)))) {
      value += otherValue;
    }
  }
  return value;
}
function convertObjectDataToArray(data) {
  const keys = Object.keys(data);
  const adata = new Array(keys.length);
  let i, ilen, key;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    key = keys[i];
    adata[i] = {
      x: key,
      y: data[key]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  const stacked = scale && scale.options.stacked;
  return stacked || (stacked === undefined && meta.stack !== undefined);
}
function getStackKey(indexScale, valueScale, meta) {
  return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
  const {min, max, minDefined, maxDefined} = scale.getUserBounds();
  return {
    min: minDefined ? min : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  const subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
  for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
    const value = stack[meta.index];
    if ((positive && value > 0) || (!positive && value < 0)) {
      return meta.index;
    }
  }
  return null;
}
function updateStacks(controller, parsed) {
  const {chart, _cachedMeta: meta} = controller;
  const stacks = chart._stacks || (chart._stacks = {});
  const {iScale, vScale, index: datasetIndex} = meta;
  const iAxis = iScale.axis;
  const vAxis = vScale.axis;
  const key = getStackKey(iScale, vScale, meta);
  const ilen = parsed.length;
  let stack;
  for (let i = 0; i < ilen; ++i) {
    const item = parsed[i];
    const {[iAxis]: index, [vAxis]: value} = item;
    const itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
    stack[datasetIndex] = value;
    stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
    stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
  }
}
function getFirstScaleId(chart, axis) {
  const scales = chart.scales;
  return Object.keys(scales).filter(key => scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent,
    {
      active: false,
      dataset: undefined,
      datasetIndex: index,
      index,
      mode: 'default',
      type: 'dataset'
    }
  );
}
function createDataContext(parent, index, element) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent, {
    active: false,
    dataIndex: index,
    parsed: undefined,
    raw: undefined,
    element,
    index,
    mode: 'default',
    type: 'data'
  });
}
function clearStacks(meta, items) {
  const datasetIndex = meta.controller.index;
  const axis = meta.vScale && meta.vScale.axis;
  if (!axis) {
    return;
  }
  items = items || meta._parsed;
  for (const parsed of items) {
    const stacks = parsed._stacks;
    if (!stacks || stacks[axis] === undefined || stacks[axis][datasetIndex] === undefined) {
      return;
    }
    delete stacks[axis][datasetIndex];
  }
}
const isDirectUpdateMode = (mode) => mode === 'reset' || mode === 'none';
const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked
  && {keys: getSortedDatasetIndices(chart, true), values: null};
class DatasetController {
  constructor(chart, datasetIndex) {
    this.chart = chart;
    this._ctx = chart.ctx;
    this.index = datasetIndex;
    this._cachedDataOpts = {};
    this._cachedMeta = this.getMeta();
    this._type = this._cachedMeta.type;
    this.options = undefined;
    this._parsing = false;
    this._data = undefined;
    this._objectData = undefined;
    this._sharedOptions = undefined;
    this._drawStart = undefined;
    this._drawCount = undefined;
    this.enableOptionSharing = false;
    this.$context = undefined;
    this._syncList = [];
    this.initialize();
  }
  initialize() {
    const meta = this._cachedMeta;
    this.configure();
    this.linkScales();
    meta._stacked = isStacked(meta.vScale, meta);
    this.addElements();
  }
  updateIndex(datasetIndex) {
    if (this.index !== datasetIndex) {
      clearStacks(this._cachedMeta);
    }
    this.index = datasetIndex;
  }
  linkScales() {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    const chooseId = (axis, x, y, r) => axis === 'x' ? x : axis === 'r' ? r : y;
    const xid = meta.xAxisID = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.xAxisID, getFirstScaleId(chart, 'x'));
    const yid = meta.yAxisID = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.yAxisID, getFirstScaleId(chart, 'y'));
    const rid = meta.rAxisID = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(dataset.rAxisID, getFirstScaleId(chart, 'r'));
    const indexAxis = meta.indexAxis;
    const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
    const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
    meta.xScale = this.getScaleForId(xid);
    meta.yScale = this.getScaleForId(yid);
    meta.rScale = this.getScaleForId(rid);
    meta.iScale = this.getScaleForId(iid);
    meta.vScale = this.getScaleForId(vid);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(scaleID) {
    return this.chart.scales[scaleID];
  }
  _getOtherScale(scale) {
    const meta = this._cachedMeta;
    return scale === meta.iScale
      ? meta.vScale
      : meta.iScale;
  }
  reset() {
    this._update('reset');
  }
  _destroy() {
    const meta = this._cachedMeta;
    if (this._data) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.u)(this._data, this);
    }
    if (meta._stacked) {
      clearStacks(meta);
    }
  }
  _dataCheck() {
    const dataset = this.getDataset();
    const data = dataset.data || (dataset.data = []);
    const _data = this._data;
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(data)) {
      this._data = convertObjectDataToArray(data);
    } else if (_data !== data) {
      if (_data) {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.u)(_data, this);
        const meta = this._cachedMeta;
        clearStacks(meta);
        meta._parsed = [];
      }
      if (data && Object.isExtensible(data)) {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.l)(data, this);
      }
      this._syncList = [];
      this._data = data;
    }
  }
  addElements() {
    const meta = this._cachedMeta;
    this._dataCheck();
    if (this.datasetElementType) {
      meta.dataset = new this.datasetElementType();
    }
  }
  buildOrUpdateElements(resetNewElements) {
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    let stackChanged = false;
    this._dataCheck();
    const oldStacked = meta._stacked;
    meta._stacked = isStacked(meta.vScale, meta);
    if (meta.stack !== dataset.stack) {
      stackChanged = true;
      clearStacks(meta);
      meta.stack = dataset.stack;
    }
    this._resyncElements(resetNewElements);
    if (stackChanged || oldStacked !== meta._stacked) {
      updateStacks(this, meta._parsed);
    }
  }
  configure() {
    const config = this.chart.config;
    const scopeKeys = config.datasetScopeKeys(this._type);
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
    this.options = config.createResolver(scopes, this.getContext());
    this._parsing = this.options.parsing;
    this._cachedDataOpts = {};
  }
  parse(start, count) {
    const {_cachedMeta: meta, _data: data} = this;
    const {iScale, _stacked} = meta;
    const iAxis = iScale.axis;
    let sorted = start === 0 && count === data.length ? true : meta._sorted;
    let prev = start > 0 && meta._parsed[start - 1];
    let i, cur, parsed;
    if (this._parsing === false) {
      meta._parsed = data;
      meta._sorted = true;
      parsed = data;
    } else {
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(data[start])) {
        parsed = this.parseArrayData(meta, data, start, count);
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(data[start])) {
        parsed = this.parseObjectData(meta, data, start, count);
      } else {
        parsed = this.parsePrimitiveData(meta, data, start, count);
      }
      const isNotInOrderComparedToPrev = () => cur[iAxis] === null || (prev && cur[iAxis] < prev[iAxis]);
      for (i = 0; i < count; ++i) {
        meta._parsed[i + start] = cur = parsed[i];
        if (sorted) {
          if (isNotInOrderComparedToPrev()) {
            sorted = false;
          }
          prev = cur;
        }
      }
      meta._sorted = sorted;
    }
    if (_stacked) {
      updateStacks(this, parsed);
    }
  }
  parsePrimitiveData(meta, data, start, count) {
    const {iScale, vScale} = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = new Array(count);
    let i, ilen, index;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      parsed[i] = {
        [iAxis]: singleScale || iScale.parse(labels[index], index),
        [vAxis]: vScale.parse(data[index], index)
      };
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const {xScale, yScale} = meta;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(item[0], index),
        y: yScale.parse(item[1], index)
      };
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const {xScale, yScale} = meta;
    const {xAxisKey = 'x', yAxisKey = 'y'} = this._parsing;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(item, xAxisKey), index),
        y: yScale.parse((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(item, yAxisKey), index)
      };
    }
    return parsed;
  }
  getParsed(index) {
    return this._cachedMeta._parsed[index];
  }
  getDataElement(index) {
    return this._cachedMeta.data[index];
  }
  applyStack(scale, parsed, mode) {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const value = parsed[scale.axis];
    const stack = {
      keys: getSortedDatasetIndices(chart, true),
      values: parsed._stacks[scale.axis]
    };
    return applyStack(stack, value, meta.index, {mode});
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    const parsedValue = parsed[scale.axis];
    let value = parsedValue === null ? NaN : parsedValue;
    const values = stack && parsed._stacks[scale.axis];
    if (stack && values) {
      stack.values = values;
      value = applyStack(stack, parsedValue, this._cachedMeta.index);
    }
    range.min = Math.min(range.min, value);
    range.max = Math.max(range.max, value);
  }
  getMinMax(scale, canStack) {
    const meta = this._cachedMeta;
    const _parsed = meta._parsed;
    const sorted = meta._sorted && scale === meta.iScale;
    const ilen = _parsed.length;
    const otherScale = this._getOtherScale(scale);
    const stack = createStack(canStack, meta, this.chart);
    const range = {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY};
    const {min: otherMin, max: otherMax} = getUserBounds(otherScale);
    let i, parsed;
    function _skip() {
      parsed = _parsed[i];
      const otherValue = parsed[otherScale.axis];
      return !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
    }
    for (i = 0; i < ilen; ++i) {
      if (_skip()) {
        continue;
      }
      this.updateRangeFromParsed(range, scale, parsed, stack);
      if (sorted) {
        break;
      }
    }
    if (sorted) {
      for (i = ilen - 1; i >= 0; --i) {
        if (_skip()) {
          continue;
        }
        this.updateRangeFromParsed(range, scale, parsed, stack);
        break;
      }
    }
    return range;
  }
  getAllParsedValues(scale) {
    const parsed = this._cachedMeta._parsed;
    const values = [];
    let i, ilen, value;
    for (i = 0, ilen = parsed.length; i < ilen; ++i) {
      value = parsed[i][scale.axis];
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(value)) {
        values.push(value);
      }
    }
    return values;
  }
  getMaxOverflow() {
    return false;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const parsed = this.getParsed(index);
    return {
      label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
      value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
    };
  }
  _update(mode) {
    const meta = this._cachedMeta;
    this.update(mode || 'default');
    meta._clip = toClip((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
  }
  update(mode) {}
  draw() {
    const ctx = this._ctx;
    const chart = this.chart;
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    const area = chart.chartArea;
    const active = [];
    const start = this._drawStart || 0;
    const count = this._drawCount || (elements.length - start);
    const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
    let i;
    if (meta.dataset) {
      meta.dataset.draw(ctx, area, start, count);
    }
    for (i = start; i < start + count; ++i) {
      const element = elements[i];
      if (element.hidden) {
        continue;
      }
      if (element.active && drawActiveElementsOnTop) {
        active.push(element);
      } else {
        element.draw(ctx, area);
      }
    }
    for (i = 0; i < active.length; ++i) {
      active[i].draw(ctx, area);
    }
  }
  getStyle(index, active) {
    const mode = active ? 'active' : 'default';
    return index === undefined && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(mode)
      : this.resolveDataElementOptions(index || 0, mode);
  }
  getContext(index, active, mode) {
    const dataset = this.getDataset();
    let context;
    if (index >= 0 && index < this._cachedMeta.data.length) {
      const element = this._cachedMeta.data[index];
      context = element.$context ||
        (element.$context = createDataContext(this.getContext(), index, element));
      context.parsed = this.getParsed(index);
      context.raw = dataset.data[index];
      context.index = context.dataIndex = index;
    } else {
      context = this.$context ||
        (this.$context = createDatasetContext(this.chart.getContext(), this.index));
      context.dataset = dataset;
      context.index = context.datasetIndex = this.index;
    }
    context.active = !!active;
    context.mode = mode;
    return context;
  }
  resolveDatasetElementOptions(mode) {
    return this._resolveElementOptions(this.datasetElementType.id, mode);
  }
  resolveDataElementOptions(index, mode) {
    return this._resolveElementOptions(this.dataElementType.id, mode, index);
  }
  _resolveElementOptions(elementType, mode = 'default', index) {
    const active = mode === 'active';
    const cache = this._cachedDataOpts;
    const cacheKey = elementType + '-' + mode;
    const cached = cache[cacheKey];
    const sharing = this.enableOptionSharing && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j)(index);
    if (cached) {
      return cloneIfNotShared(cached, sharing);
    }
    const config = this.chart.config;
    const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
    const prefixes = active ? [`${elementType}Hover`, 'hover', elementType, ''] : [elementType, ''];
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
    const names = Object.keys(_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.elements[elementType]);
    const context = () => this.getContext(index, active);
    const values = config.resolveNamedOptions(scopes, names, context, prefixes);
    if (values.$shared) {
      values.$shared = sharing;
      cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
    }
    return values;
  }
  _resolveAnimations(index, transition, active) {
    const chart = this.chart;
    const cache = this._cachedDataOpts;
    const cacheKey = `animation-${transition}`;
    const cached = cache[cacheKey];
    if (cached) {
      return cached;
    }
    let options;
    if (chart.options.animation !== false) {
      const config = this.chart.config;
      const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
      const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
      options = config.createResolver(scopes, this.getContext(index, active, transition));
    }
    const animations = new Animations(chart, options && options.animations);
    if (options && options._cacheable) {
      cache[cacheKey] = Object.freeze(animations);
    }
    return animations;
  }
  getSharedOptions(options) {
    if (!options.$shared) {
      return;
    }
    return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
  }
  includeOptions(mode, sharedOptions) {
    return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
  }
  updateElement(element, index, properties, mode) {
    if (isDirectUpdateMode(mode)) {
      Object.assign(element, properties);
    } else {
      this._resolveAnimations(index, mode).update(element, properties);
    }
  }
  updateSharedOptions(sharedOptions, mode, newOptions) {
    if (sharedOptions && !isDirectUpdateMode(mode)) {
      this._resolveAnimations(undefined, mode).update(sharedOptions, newOptions);
    }
  }
  _setStyle(element, index, mode, active) {
    element.active = active;
    const options = this.getStyle(index, active);
    this._resolveAnimations(index, mode, active).update(element, {
      options: (!active && this.getSharedOptions(options)) || options
    });
  }
  removeHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, 'active', false);
  }
  setHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, 'active', true);
  }
  _removeDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, undefined, 'active', false);
    }
  }
  _setDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, undefined, 'active', true);
    }
  }
  _resyncElements(resetNewElements) {
    const data = this._data;
    const elements = this._cachedMeta.data;
    for (const [method, arg1, arg2] of this._syncList) {
      this[method](arg1, arg2);
    }
    this._syncList = [];
    const numMeta = elements.length;
    const numData = data.length;
    const count = Math.min(numData, numMeta);
    if (count) {
      this.parse(0, count);
    }
    if (numData > numMeta) {
      this._insertElements(numMeta, numData - numMeta, resetNewElements);
    } else if (numData < numMeta) {
      this._removeElements(numData, numMeta - numData);
    }
  }
  _insertElements(start, count, resetNewElements = true) {
    const meta = this._cachedMeta;
    const data = meta.data;
    const end = start + count;
    let i;
    const move = (arr) => {
      arr.length += count;
      for (i = arr.length - 1; i >= end; i--) {
        arr[i] = arr[i - count];
      }
    };
    move(data);
    for (i = start; i < end; ++i) {
      data[i] = new this.dataElementType();
    }
    if (this._parsing) {
      move(meta._parsed);
    }
    this.parse(start, count);
    if (resetNewElements) {
      this.updateElements(data, start, count, 'reset');
    }
  }
  updateElements(element, start, count, mode) {}
  _removeElements(start, count) {
    const meta = this._cachedMeta;
    if (this._parsing) {
      const removed = meta._parsed.splice(start, count);
      if (meta._stacked) {
        clearStacks(meta, removed);
      }
    }
    meta.data.splice(start, count);
  }
  _sync(args) {
    if (this._parsing) {
      this._syncList.push(args);
    } else {
      const [method, arg1, arg2] = args;
      this[method](arg1, arg2);
    }
    this.chart._dataChanges.push([this.index, ...args]);
  }
  _onDataPush() {
    const count = arguments.length;
    this._sync(['_insertElements', this.getDataset().data.length - count, count]);
  }
  _onDataPop() {
    this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(['_removeElements', 0, 1]);
  }
  _onDataSplice(start, count) {
    if (count) {
      this._sync(['_removeElements', start, count]);
    }
    const newCount = arguments.length - 2;
    if (newCount) {
      this._sync(['_insertElements', start, newCount]);
    }
  }
  _onDataUnshift() {
    this._sync(['_insertElements', 0, arguments.length]);
  }
}
DatasetController.defaults = {};
DatasetController.prototype.datasetElementType = null;
DatasetController.prototype.dataElementType = null;

function getAllScaleValues(scale, type) {
  if (!scale._cache.$bar) {
    const visibleMetas = scale.getMatchingVisibleMetas(type);
    let values = [];
    for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) {
      values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
    }
    scale._cache.$bar = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__._)(values.sort((a, b) => a - b));
  }
  return scale._cache.$bar;
}
function computeMinSampleSize(meta) {
  const scale = meta.iScale;
  const values = getAllScaleValues(scale, meta.type);
  let min = scale._length;
  let i, ilen, curr, prev;
  const updateMinAndPrev = () => {
    if (curr === 32767 || curr === -32768) {
      return;
    }
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j)(prev)) {
      min = Math.min(min, Math.abs(curr - prev) || min);
    }
    prev = curr;
  };
  for (i = 0, ilen = values.length; i < ilen; ++i) {
    curr = scale.getPixelForValue(values[i]);
    updateMinAndPrev();
  }
  prev = undefined;
  for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
    curr = scale.getPixelForTick(i);
    updateMinAndPrev();
  }
  return min;
}
function computeFitCategoryTraits(index, ruler, options, stackCount) {
  const thickness = options.barThickness;
  let size, ratio;
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(thickness)) {
    size = ruler.min * options.categoryPercentage;
    ratio = options.barPercentage;
  } else {
    size = thickness * stackCount;
    ratio = 1;
  }
  return {
    chunk: size / stackCount,
    ratio,
    start: ruler.pixels[index] - (size / 2)
  };
}
function computeFlexCategoryTraits(index, ruler, options, stackCount) {
  const pixels = ruler.pixels;
  const curr = pixels[index];
  let prev = index > 0 ? pixels[index - 1] : null;
  let next = index < pixels.length - 1 ? pixels[index + 1] : null;
  const percent = options.categoryPercentage;
  if (prev === null) {
    prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
  }
  if (next === null) {
    next = curr + curr - prev;
  }
  const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
  const size = Math.abs(next - prev) / 2 * percent;
  return {
    chunk: size / stackCount,
    ratio: options.barPercentage,
    start
  };
}
function parseFloatBar(entry, item, vScale, i) {
  const startValue = vScale.parse(entry[0], i);
  const endValue = vScale.parse(entry[1], i);
  const min = Math.min(startValue, endValue);
  const max = Math.max(startValue, endValue);
  let barStart = min;
  let barEnd = max;
  if (Math.abs(min) > Math.abs(max)) {
    barStart = max;
    barEnd = min;
  }
  item[vScale.axis] = barEnd;
  item._custom = {
    barStart,
    barEnd,
    start: startValue,
    end: endValue,
    min,
    max
  };
}
function parseValue(entry, item, vScale, i) {
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(entry)) {
    parseFloatBar(entry, item, vScale, i);
  } else {
    item[vScale.axis] = vScale.parse(entry, i);
  }
  return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
  const iScale = meta.iScale;
  const vScale = meta.vScale;
  const labels = iScale.getLabels();
  const singleScale = iScale === vScale;
  const parsed = [];
  let i, ilen, item, entry;
  for (i = start, ilen = start + count; i < ilen; ++i) {
    entry = data[i];
    item = {};
    item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
    parsed.push(parseValue(entry, item, vScale, i));
  }
  return parsed;
}
function isFloatBar(custom) {
  return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
}
function barSign(size, vScale, actualBase) {
  if (size !== 0) {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(size);
  }
  return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
  let reverse, start, end, top, bottom;
  if (properties.horizontal) {
    reverse = properties.base > properties.x;
    start = 'left';
    end = 'right';
  } else {
    reverse = properties.base < properties.y;
    start = 'bottom';
    end = 'top';
  }
  if (reverse) {
    top = 'end';
    bottom = 'start';
  } else {
    top = 'start';
    bottom = 'end';
  }
  return {start, end, reverse, top, bottom};
}
function setBorderSkipped(properties, options, stack, index) {
  let edge = options.borderSkipped;
  const res = {};
  if (!edge) {
    properties.borderSkipped = res;
    return;
  }
  const {start, end, reverse, top, bottom} = borderProps(properties);
  if (edge === 'middle' && stack) {
    properties.enableBorderRadius = true;
    if ((stack._top || 0) === index) {
      edge = top;
    } else if ((stack._bottom || 0) === index) {
      edge = bottom;
    } else {
      res[parseEdge(bottom, start, end, reverse)] = true;
      edge = top;
    }
  }
  res[parseEdge(edge, start, end, reverse)] = true;
  properties.borderSkipped = res;
}
function parseEdge(edge, a, b, reverse) {
  if (reverse) {
    edge = swap(edge, a, b);
    edge = startEnd(edge, b, a);
  } else {
    edge = startEnd(edge, a, b);
  }
  return edge;
}
function swap(orig, v1, v2) {
  return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function startEnd(v, start, end) {
  return v === 'start' ? start : v === 'end' ? end : v;
}
function setInflateAmount(properties, {inflateAmount}, ratio) {
  properties.inflateAmount = inflateAmount === 'auto'
    ? ratio === 1 ? 0.33 : 0
    : inflateAmount;
}
class BarController extends DatasetController {
  parsePrimitiveData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseArrayData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseObjectData(meta, data, start, count) {
    const {iScale, vScale} = meta;
    const {xAxisKey = 'x', yAxisKey = 'y'} = this._parsing;
    const iAxisKey = iScale.axis === 'x' ? xAxisKey : yAxisKey;
    const vAxisKey = vScale.axis === 'x' ? xAxisKey : yAxisKey;
    const parsed = [];
    let i, ilen, item, obj;
    for (i = start, ilen = start + count; i < ilen; ++i) {
      obj = data[i];
      item = {};
      item[iScale.axis] = iScale.parse((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, iAxisKey), i);
      parsed.push(parseValue((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, vAxisKey), item, vScale, i));
    }
    return parsed;
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    super.updateRangeFromParsed(range, scale, parsed, stack);
    const custom = parsed._custom;
    if (custom && scale === this._cachedMeta.vScale) {
      range.min = Math.min(range.min, custom.min);
      range.max = Math.max(range.max, custom.max);
    }
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const {iScale, vScale} = meta;
    const parsed = this.getParsed(index);
    const custom = parsed._custom;
    const value = isFloatBar(custom)
      ? '[' + custom.start + ', ' + custom.end + ']'
      : '' + vScale.getLabelForValue(parsed[vScale.axis]);
    return {
      label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
      value
    };
  }
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
    const meta = this._cachedMeta;
    meta.stack = this.getDataset().stack;
  }
  update(mode) {
    const meta = this._cachedMeta;
    this.updateElements(meta.data, 0, meta.data.length, mode);
  }
  updateElements(bars, start, count, mode) {
    const reset = mode === 'reset';
    const {index, _cachedMeta: {vScale}} = this;
    const base = vScale.getBasePixel();
    const horizontal = vScale.isHorizontal();
    const ruler = this._getRuler();
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions);
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
    for (let i = start; i < start + count; i++) {
      const parsed = this.getParsed(i);
      const vpixels = reset || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(parsed[vScale.axis]) ? {base, head: base} : this._calculateBarValuePixels(i);
      const ipixels = this._calculateBarIndexPixels(i, ruler);
      const stack = (parsed._stacks || {})[vScale.axis];
      const properties = {
        horizontal,
        base: vpixels.base,
        enableBorderRadius: !stack || isFloatBar(parsed._custom) || (index === stack._top || index === stack._bottom),
        x: horizontal ? vpixels.head : ipixels.center,
        y: horizontal ? ipixels.center : vpixels.head,
        height: horizontal ? ipixels.size : Math.abs(vpixels.size),
        width: horizontal ? Math.abs(vpixels.size) : ipixels.size
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? 'active' : mode);
      }
      const options = properties.options || bars[i].options;
      setBorderSkipped(properties, options, stack, index);
      setInflateAmount(properties, options, ruler.ratio);
      this.updateElement(bars[i], i, properties, mode);
    }
  }
  _getStacks(last, dataIndex) {
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const metasets = iScale.getMatchingVisibleMetas(this._type);
    const stacked = iScale.options.stacked;
    const ilen = metasets.length;
    const stacks = [];
    let i, item;
    for (i = 0; i < ilen; ++i) {
      item = metasets[i];
      if (!item.controller.options.grouped) {
        continue;
      }
      if (typeof dataIndex !== 'undefined') {
        const val = item.controller.getParsed(dataIndex)[
          item.controller._cachedMeta.vScale.axis
        ];
        if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(val) || isNaN(val)) {
          continue;
        }
      }
      if (stacked === false || stacks.indexOf(item.stack) === -1 ||
				(stacked === undefined && item.stack === undefined)) {
        stacks.push(item.stack);
      }
      if (item.index === last) {
        break;
      }
    }
    if (!stacks.length) {
      stacks.push(undefined);
    }
    return stacks;
  }
  _getStackCount(index) {
    return this._getStacks(undefined, index).length;
  }
  _getStackIndex(datasetIndex, name, dataIndex) {
    const stacks = this._getStacks(datasetIndex, dataIndex);
    const index = (name !== undefined)
      ? stacks.indexOf(name)
      : -1;
    return (index === -1)
      ? stacks.length - 1
      : index;
  }
  _getRuler() {
    const opts = this.options;
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const pixels = [];
    let i, ilen;
    for (i = 0, ilen = meta.data.length; i < ilen; ++i) {
      pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
    }
    const barThickness = opts.barThickness;
    const min = barThickness || computeMinSampleSize(meta);
    return {
      min,
      pixels,
      start: iScale._startPixel,
      end: iScale._endPixel,
      stackCount: this._getStackCount(),
      scale: iScale,
      grouped: opts.grouped,
      ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
    };
  }
  _calculateBarValuePixels(index) {
    const {_cachedMeta: {vScale, _stacked}, options: {base: baseValue, minBarLength}} = this;
    const actualBase = baseValue || 0;
    const parsed = this.getParsed(index);
    const custom = parsed._custom;
    const floating = isFloatBar(custom);
    let value = parsed[vScale.axis];
    let start = 0;
    let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
    let head, size;
    if (length !== value) {
      start = length - value;
      length = value;
    }
    if (floating) {
      value = custom.barStart;
      length = custom.barEnd - custom.barStart;
      if (value !== 0 && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(value) !== (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(custom.barEnd)) {
        start = 0;
      }
      start += value;
    }
    const startValue = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(baseValue) && !floating ? baseValue : start;
    let base = vScale.getPixelForValue(startValue);
    if (this.chart.getDataVisibility(index)) {
      head = vScale.getPixelForValue(start + length);
    } else {
      head = base;
    }
    size = head - base;
    if (Math.abs(size) < minBarLength) {
      size = barSign(size, vScale, actualBase) * minBarLength;
      if (value === actualBase) {
        base -= size / 2;
      }
      head = base + size;
    }
    if (base === vScale.getPixelForValue(actualBase)) {
      const halfGrid = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(size) * vScale.getLineWidthForValue(actualBase) / 2;
      base += halfGrid;
      size -= halfGrid;
    }
    return {
      size,
      base,
      head,
      center: head + size / 2
    };
  }
  _calculateBarIndexPixels(index, ruler) {
    const scale = ruler.scale;
    const options = this.options;
    const skipNull = options.skipNull;
    const maxBarThickness = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.maxBarThickness, Infinity);
    let center, size;
    if (ruler.grouped) {
      const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
      const range = options.barThickness === 'flex'
        ? computeFlexCategoryTraits(index, ruler, options, stackCount)
        : computeFitCategoryTraits(index, ruler, options, stackCount);
      const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : undefined);
      center = range.start + (range.chunk * stackIndex) + (range.chunk / 2);
      size = Math.min(maxBarThickness, range.chunk * range.ratio);
    } else {
      center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
      size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
    }
    return {
      base: center - size / 2,
      head: center + size / 2,
      center,
      size
    };
  }
  draw() {
    const meta = this._cachedMeta;
    const vScale = meta.vScale;
    const rects = meta.data;
    const ilen = rects.length;
    let i = 0;
    for (; i < ilen; ++i) {
      if (this.getParsed(i)[vScale.axis] !== null) {
        rects[i].draw(this._ctx);
      }
    }
  }
}
BarController.id = 'bar';
BarController.defaults = {
  datasetElementType: false,
  dataElementType: 'bar',
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: true,
  animations: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'base', 'width', 'height']
    }
  }
};
BarController.overrides = {
  scales: {
    _index_: {
      type: 'category',
      offset: true,
      grid: {
        offset: true
      }
    },
    _value_: {
      type: 'linear',
      beginAtZero: true,
    }
  }
};

class BubbleController extends DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
  }
  parsePrimitiveData(meta, data, start, count) {
    const parsed = super.parsePrimitiveData(meta, data, start, count);
    for (let i = 0; i < parsed.length; i++) {
      parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const parsed = super.parseArrayData(meta, data, start, count);
    for (let i = 0; i < parsed.length; i++) {
      const item = data[start + i];
      parsed[i]._custom = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(item[2], this.resolveDataElementOptions(i + start).radius);
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const parsed = super.parseObjectData(meta, data, start, count);
    for (let i = 0; i < parsed.length; i++) {
      const item = data[start + i];
      parsed[i]._custom = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
    }
    return parsed;
  }
  getMaxOverflow() {
    const data = this._cachedMeta.data;
    let max = 0;
    for (let i = data.length - 1; i >= 0; --i) {
      max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
    }
    return max > 0 && max;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const {xScale, yScale} = meta;
    const parsed = this.getParsed(index);
    const x = xScale.getLabelForValue(parsed.x);
    const y = yScale.getLabelForValue(parsed.y);
    const r = parsed._custom;
    return {
      label: meta.label,
      value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
    };
  }
  update(mode) {
    const points = this._cachedMeta.data;
    this.updateElements(points, 0, points.length, mode);
  }
  updateElements(points, start, count, mode) {
    const reset = mode === 'reset';
    const {iScale, vScale} = this._cachedMeta;
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    for (let i = start; i < start + count; i++) {
      const point = points[i];
      const parsed = !reset && this.getParsed(i);
      const properties = {};
      const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
      const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
      properties.skip = isNaN(iPixel) || isNaN(vPixel);
      if (includeOptions) {
        properties.options = this.resolveDataElementOptions(i, point.active ? 'active' : mode);
        if (reset) {
          properties.options.radius = 0;
        }
      }
      this.updateElement(point, i, properties, mode);
    }
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
  }
  resolveDataElementOptions(index, mode) {
    const parsed = this.getParsed(index);
    let values = super.resolveDataElementOptions(index, mode);
    if (values.$shared) {
      values = Object.assign({}, values, {$shared: false});
    }
    const radius = values.radius;
    if (mode !== 'active') {
      values.radius = 0;
    }
    values.radius += (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(parsed && parsed._custom, radius);
    return values;
  }
}
BubbleController.id = 'bubble';
BubbleController.defaults = {
  datasetElementType: false,
  dataElementType: 'point',
  animations: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'borderWidth', 'radius']
    }
  }
};
BubbleController.overrides = {
  scales: {
    x: {
      type: 'linear'
    },
    y: {
      type: 'linear'
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return '';
        }
      }
    }
  }
};

function getRatioAndOffset(rotation, circumference, cutout) {
  let ratioX = 1;
  let ratioY = 1;
  let offsetX = 0;
  let offsetY = 0;
  if (circumference < _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T) {
    const startAngle = rotation;
    const endAngle = startAngle + circumference;
    const startX = Math.cos(startAngle);
    const startY = Math.sin(startAngle);
    const endX = Math.cos(endAngle);
    const endY = Math.sin(endAngle);
    const calcMax = (angle, a, b) => (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
    const calcMin = (angle, a, b) => (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
    const maxX = calcMax(0, startX, endX);
    const maxY = calcMax(_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H, startY, endY);
    const minX = calcMin(_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P, startX, endX);
    const minY = calcMin(_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H, startY, endY);
    ratioX = (maxX - minX) / 2;
    ratioY = (maxY - minY) / 2;
    offsetX = -(maxX + minX) / 2;
    offsetY = -(maxY + minY) / 2;
  }
  return {ratioX, ratioY, offsetX, offsetY};
}
class DoughnutController extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.enableOptionSharing = true;
    this.innerRadius = undefined;
    this.outerRadius = undefined;
    this.offsetX = undefined;
    this.offsetY = undefined;
  }
  linkScales() {}
  parse(start, count) {
    const data = this.getDataset().data;
    const meta = this._cachedMeta;
    if (this._parsing === false) {
      meta._parsed = data;
    } else {
      let getter = (i) => +data[i];
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(data[start])) {
        const {key = 'value'} = this._parsing;
        getter = (i) => +(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(data[i], key);
      }
      let i, ilen;
      for (i = start, ilen = start + count; i < ilen; ++i) {
        meta._parsed[i] = getter(i);
      }
    }
  }
  _getRotation() {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.rotation - 90);
  }
  _getCircumference() {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.circumference);
  }
  _getRotationExtents() {
    let min = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T;
    let max = -_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T;
    for (let i = 0; i < this.chart.data.datasets.length; ++i) {
      if (this.chart.isDatasetVisible(i)) {
        const controller = this.chart.getDatasetMeta(i).controller;
        const rotation = controller._getRotation();
        const circumference = controller._getCircumference();
        min = Math.min(min, rotation);
        max = Math.max(max, rotation + circumference);
      }
    }
    return {
      rotation: min,
      circumference: max - min,
    };
  }
  update(mode) {
    const chart = this.chart;
    const {chartArea} = chart;
    const meta = this._cachedMeta;
    const arcs = meta.data;
    const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
    const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
    const cutout = Math.min((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.m)(this.options.cutout, maxSize), 1);
    const chartWeight = this._getRingWeight(this.index);
    const {circumference, rotation} = this._getRotationExtents();
    const {ratioX, ratioY, offsetX, offsetY} = getRatioAndOffset(rotation, circumference, cutout);
    const maxWidth = (chartArea.width - spacing) / ratioX;
    const maxHeight = (chartArea.height - spacing) / ratioY;
    const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
    const outerRadius = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.n)(this.options.radius, maxRadius);
    const innerRadius = Math.max(outerRadius * cutout, 0);
    const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
    this.offsetX = offsetX * outerRadius;
    this.offsetY = offsetY * outerRadius;
    meta.total = this.calculateTotal();
    this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
    this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
    this.updateElements(arcs, 0, arcs.length, mode);
  }
  _circumference(i, reset) {
    const opts = this.options;
    const meta = this._cachedMeta;
    const circumference = this._getCircumference();
    if ((reset && opts.animation.animateRotate) || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
      return 0;
    }
    return this.calculateCircumference(meta._parsed[i] * circumference / _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T);
  }
  updateElements(arcs, start, count, mode) {
    const reset = mode === 'reset';
    const chart = this.chart;
    const chartArea = chart.chartArea;
    const opts = chart.options;
    const animationOpts = opts.animation;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const animateScale = reset && animationOpts.animateScale;
    const innerRadius = animateScale ? 0 : this.innerRadius;
    const outerRadius = animateScale ? 0 : this.outerRadius;
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions);
    let startAngle = this._getRotation();
    let i;
    for (i = 0; i < start; ++i) {
      startAngle += this._circumference(i, reset);
    }
    for (i = start; i < start + count; ++i) {
      const circumference = this._circumference(i, reset);
      const arc = arcs[i];
      const properties = {
        x: centerX + this.offsetX,
        y: centerY + this.offsetY,
        startAngle,
        endAngle: startAngle + circumference,
        circumference,
        outerRadius,
        innerRadius
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? 'active' : mode);
      }
      startAngle += circumference;
      this.updateElement(arc, i, properties, mode);
    }
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
  }
  calculateTotal() {
    const meta = this._cachedMeta;
    const metaData = meta.data;
    let total = 0;
    let i;
    for (i = 0; i < metaData.length; i++) {
      const value = meta._parsed[i];
      if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
        total += Math.abs(value);
      }
    }
    return total;
  }
  calculateCircumference(value) {
    const total = this._cachedMeta.total;
    if (total > 0 && !isNaN(value)) {
      return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T * (Math.abs(value) / total);
    }
    return 0;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const chart = this.chart;
    const labels = chart.data.labels || [];
    const value = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o)(meta._parsed[index], chart.options.locale);
    return {
      label: labels[index] || '',
      value,
    };
  }
  getMaxBorderWidth(arcs) {
    let max = 0;
    const chart = this.chart;
    let i, ilen, meta, controller, options;
    if (!arcs) {
      for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
        if (chart.isDatasetVisible(i)) {
          meta = chart.getDatasetMeta(i);
          arcs = meta.data;
          controller = meta.controller;
          break;
        }
      }
    }
    if (!arcs) {
      return 0;
    }
    for (i = 0, ilen = arcs.length; i < ilen; ++i) {
      options = controller.resolveDataElementOptions(i);
      if (options.borderAlign !== 'inner') {
        max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
      }
    }
    return max;
  }
  getMaxOffset(arcs) {
    let max = 0;
    for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
      const options = this.resolveDataElementOptions(i);
      max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
    }
    return max;
  }
  _getRingWeightOffset(datasetIndex) {
    let ringWeightOffset = 0;
    for (let i = 0; i < datasetIndex; ++i) {
      if (this.chart.isDatasetVisible(i)) {
        ringWeightOffset += this._getRingWeight(i);
      }
    }
    return ringWeightOffset;
  }
  _getRingWeight(datasetIndex) {
    return Math.max((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(this.chart.data.datasets[datasetIndex].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
DoughnutController.id = 'doughnut';
DoughnutController.defaults = {
  datasetElementType: false,
  dataElementType: 'arc',
  animation: {
    animateRotate: true,
    animateScale: false
  },
  animations: {
    numbers: {
      type: 'number',
      properties: ['circumference', 'endAngle', 'innerRadius', 'outerRadius', 'startAngle', 'x', 'y', 'offset', 'borderWidth', 'spacing']
    },
  },
  cutout: '50%',
  rotation: 0,
  circumference: 360,
  radius: '100%',
  spacing: 0,
  indexAxis: 'r',
};
DoughnutController.descriptors = {
  _scriptable: (name) => name !== 'spacing',
  _indexable: (name) => name !== 'spacing',
};
DoughnutController.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const {labels: {pointStyle}} = chart.legend.options;
            return data.labels.map((label, i) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,
                pointStyle: pointStyle,
                hidden: !chart.getDataVisibility(i),
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick(e, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index);
        legend.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return '';
        },
        label(tooltipItem) {
          let dataLabel = tooltipItem.label;
          const value = ': ' + tooltipItem.formattedValue;
          if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(dataLabel)) {
            dataLabel = dataLabel.slice();
            dataLabel[0] += value;
          } else {
            dataLabel += value;
          }
          return dataLabel;
        }
      }
    }
  }
};

class LineController extends DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
  }
  update(mode) {
    const meta = this._cachedMeta;
    const {dataset: line, data: points = [], _dataset} = meta;
    const animationsDisabled = this.chart._animationsDisabled;
    let {start, count} = getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
    this._drawStart = start;
    this._drawCount = count;
    if (scaleRangesChanged(meta)) {
      start = 0;
      count = points.length;
    }
    line._chart = this.chart;
    line._datasetIndex = this.index;
    line._decimated = !!_dataset._decimated;
    line.points = points;
    const options = this.resolveDatasetElementOptions(mode);
    if (!this.options.showLine) {
      options.borderWidth = 0;
    }
    options.segment = this.options.segment;
    this.updateElement(line, undefined, {
      animated: !animationsDisabled,
      options
    }, mode);
    this.updateElements(points, start, count, mode);
  }
  updateElements(points, start, count, mode) {
    const reset = mode === 'reset';
    const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const {spanGaps, segment} = this.options;
    const maxGapLength = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q)(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
    const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
    let prevParsed = start > 0 && this.getParsed(start - 1);
    for (let i = start; i < start + count; ++i) {
      const point = points[i];
      const parsed = this.getParsed(i);
      const properties = directUpdate ? point : {};
      const nullData = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(parsed[vAxis]);
      const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
      const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
      properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
      properties.stop = i > 0 && (parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
      if (segment) {
        properties.parsed = parsed;
        properties.raw = _dataset.data[i];
      }
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
      }
      if (!directUpdate) {
        this.updateElement(point, i, properties, mode);
      }
      prevParsed = parsed;
    }
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
  }
  getMaxOverflow() {
    const meta = this._cachedMeta;
    const dataset = meta.dataset;
    const border = dataset.options && dataset.options.borderWidth || 0;
    const data = meta.data || [];
    if (!data.length) {
      return border;
    }
    const firstPoint = data[0].size(this.resolveDataElementOptions(0));
    const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
    return Math.max(border, firstPoint, lastPoint) / 2;
  }
  draw() {
    const meta = this._cachedMeta;
    meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
    super.draw();
  }
}
LineController.id = 'line';
LineController.defaults = {
  datasetElementType: 'line',
  dataElementType: 'point',
  showLine: true,
  spanGaps: false,
};
LineController.overrides = {
  scales: {
    _index_: {
      type: 'category',
    },
    _value_: {
      type: 'linear',
    },
  }
};
function getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
  const pointCount = points.length;
  let start = 0;
  let count = pointCount;
  if (meta._sorted) {
    const {iScale, _parsed} = meta;
    const axis = iScale.axis;
    const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
    if (minDefined) {
      start = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(Math.min(
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(_parsed, iScale.axis, min).lo,
        animationsDisabled ? pointCount : (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(points, axis, iScale.getPixelForValue(min)).lo),
      0, pointCount - 1);
    }
    if (maxDefined) {
      count = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(Math.max(
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(_parsed, iScale.axis, max).hi + 1,
        animationsDisabled ? 0 : (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(points, axis, iScale.getPixelForValue(max)).hi + 1),
      start, pointCount) - start;
    } else {
      count = pointCount - start;
    }
  }
  return {start, count};
}
function scaleRangesChanged(meta) {
  const {xScale, yScale, _scaleRanges} = meta;
  const newRanges = {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max
  };
  if (!_scaleRanges) {
    meta._scaleRanges = newRanges;
    return true;
  }
  const changed = _scaleRanges.xmin !== xScale.min
		|| _scaleRanges.xmax !== xScale.max
		|| _scaleRanges.ymin !== yScale.min
		|| _scaleRanges.ymax !== yScale.max;
  Object.assign(_scaleRanges, newRanges);
  return changed;
}

class PolarAreaController extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.innerRadius = undefined;
    this.outerRadius = undefined;
  }
  getLabelAndValue(index) {
    const meta = this._cachedMeta;
    const chart = this.chart;
    const labels = chart.data.labels || [];
    const value = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o)(meta._parsed[index].r, chart.options.locale);
    return {
      label: labels[index] || '',
      value,
    };
  }
  update(mode) {
    const arcs = this._cachedMeta.data;
    this._updateRadius();
    this.updateElements(arcs, 0, arcs.length, mode);
  }
  _updateRadius() {
    const chart = this.chart;
    const chartArea = chart.chartArea;
    const opts = chart.options;
    const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    const outerRadius = Math.max(minSize / 2, 0);
    const innerRadius = Math.max(opts.cutoutPercentage ? (outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
    const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
    this.outerRadius = outerRadius - (radiusLength * this.index);
    this.innerRadius = this.outerRadius - radiusLength;
  }
  updateElements(arcs, start, count, mode) {
    const reset = mode === 'reset';
    const chart = this.chart;
    const dataset = this.getDataset();
    const opts = chart.options;
    const animationOpts = opts.animation;
    const scale = this._cachedMeta.rScale;
    const centerX = scale.xCenter;
    const centerY = scale.yCenter;
    const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P;
    let angle = datasetStartAngle;
    let i;
    const defaultAngle = 360 / this.countVisibleElements();
    for (i = 0; i < start; ++i) {
      angle += this._computeAngle(i, mode, defaultAngle);
    }
    for (i = start; i < start + count; i++) {
      const arc = arcs[i];
      let startAngle = angle;
      let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
      let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(dataset.data[i]) : 0;
      angle = endAngle;
      if (reset) {
        if (animationOpts.animateScale) {
          outerRadius = 0;
        }
        if (animationOpts.animateRotate) {
          startAngle = endAngle = datasetStartAngle;
        }
      }
      const properties = {
        x: centerX,
        y: centerY,
        innerRadius: 0,
        outerRadius,
        startAngle,
        endAngle,
        options: this.resolveDataElementOptions(i, arc.active ? 'active' : mode)
      };
      this.updateElement(arc, i, properties, mode);
    }
  }
  countVisibleElements() {
    const dataset = this.getDataset();
    const meta = this._cachedMeta;
    let count = 0;
    meta.data.forEach((element, index) => {
      if (!isNaN(dataset.data[index]) && this.chart.getDataVisibility(index)) {
        count++;
      }
    });
    return count;
  }
  _computeAngle(index, mode, defaultAngle) {
    return this.chart.getDataVisibility(index)
      ? (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.resolveDataElementOptions(index, mode).angle || defaultAngle)
      : 0;
  }
}
PolarAreaController.id = 'polarArea';
PolarAreaController.defaults = {
  dataElementType: 'arc',
  animation: {
    animateRotate: true,
    animateScale: true
  },
  animations: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius']
    },
  },
  indexAxis: 'r',
  startAngle: 0,
};
PolarAreaController.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const {labels: {pointStyle}} = chart.legend.options;
            return data.labels.map((label, i) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,
                pointStyle: pointStyle,
                hidden: !chart.getDataVisibility(i),
                index: i
              };
            });
          }
          return [];
        }
      },
      onClick(e, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index);
        legend.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        title() {
          return '';
        },
        label(context) {
          return context.chart.data.labels[context.dataIndex] + ': ' + context.formattedValue;
        }
      }
    }
  },
  scales: {
    r: {
      type: 'radialLinear',
      angleLines: {
        display: false
      },
      beginAtZero: true,
      grid: {
        circular: true
      },
      pointLabels: {
        display: false
      },
      startAngle: 0
    }
  }
};

class PieController extends DoughnutController {
}
PieController.id = 'pie';
PieController.defaults = {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: '100%'
};

class RadarController extends DatasetController {
  getLabelAndValue(index) {
    const vScale = this._cachedMeta.vScale;
    const parsed = this.getParsed(index);
    return {
      label: vScale.getLabels()[index],
      value: '' + vScale.getLabelForValue(parsed[vScale.axis])
    };
  }
  update(mode) {
    const meta = this._cachedMeta;
    const line = meta.dataset;
    const points = meta.data || [];
    const labels = meta.iScale.getLabels();
    line.points = points;
    if (mode !== 'resize') {
      const options = this.resolveDatasetElementOptions(mode);
      if (!this.options.showLine) {
        options.borderWidth = 0;
      }
      const properties = {
        _loop: true,
        _fullLoop: labels.length === points.length,
        options
      };
      this.updateElement(line, undefined, properties, mode);
    }
    this.updateElements(points, 0, points.length, mode);
  }
  updateElements(points, start, count, mode) {
    const dataset = this.getDataset();
    const scale = this._cachedMeta.rScale;
    const reset = mode === 'reset';
    for (let i = start; i < start + count; i++) {
      const point = points[i];
      const options = this.resolveDataElementOptions(i, point.active ? 'active' : mode);
      const pointPosition = scale.getPointPositionForValue(i, dataset.data[i]);
      const x = reset ? scale.xCenter : pointPosition.x;
      const y = reset ? scale.yCenter : pointPosition.y;
      const properties = {
        x,
        y,
        angle: pointPosition.angle,
        skip: isNaN(x) || isNaN(y),
        options
      };
      this.updateElement(point, i, properties, mode);
    }
  }
}
RadarController.id = 'radar';
RadarController.defaults = {
  datasetElementType: 'line',
  dataElementType: 'point',
  indexAxis: 'r',
  showLine: true,
  elements: {
    line: {
      fill: 'start'
    }
  },
};
RadarController.overrides = {
  aspectRatio: 1,
  scales: {
    r: {
      type: 'radialLinear',
    }
  }
};

class ScatterController extends LineController {
}
ScatterController.id = 'scatter';
ScatterController.defaults = {
  showLine: false,
  fill: false
};
ScatterController.overrides = {
  interaction: {
    mode: 'point'
  },
  plugins: {
    tooltip: {
      callbacks: {
        title() {
          return '';
        },
        label(item) {
          return '(' + item.label + ', ' + item.formattedValue + ')';
        }
      }
    }
  },
  scales: {
    x: {
      type: 'linear'
    },
    y: {
      type: 'linear'
    }
  }
};

var controllers = /*#__PURE__*/Object.freeze({
__proto__: null,
BarController: BarController,
BubbleController: BubbleController,
DoughnutController: DoughnutController,
LineController: LineController,
PolarAreaController: PolarAreaController,
PieController: PieController,
RadarController: RadarController,
ScatterController: ScatterController
});

function abstract() {
  throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
}
class DateAdapter {
  constructor(options) {
    this.options = options || {};
  }
  formats() {
    return abstract();
  }
  parse(value, format) {
    return abstract();
  }
  format(timestamp, format) {
    return abstract();
  }
  add(timestamp, amount, unit) {
    return abstract();
  }
  diff(a, b, unit) {
    return abstract();
  }
  startOf(timestamp, unit, weekday) {
    return abstract();
  }
  endOf(timestamp, unit) {
    return abstract();
  }
}
DateAdapter.override = function(members) {
  Object.assign(DateAdapter.prototype, members);
};
var adapters = {
  _date: DateAdapter
};

function getRelativePosition(e, chart) {
  if ('native' in e) {
    return {
      x: e.x,
      y: e.y
    };
  }
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.y)(e, chart);
}
function evaluateAllVisibleItems(chart, handler) {
  const metasets = chart.getSortedVisibleDatasetMetas();
  let index, data, element;
  for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
    ({index, data} = metasets[i]);
    for (let j = 0, jlen = data.length; j < jlen; ++j) {
      element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function binarySearch(metaset, axis, value, intersect) {
  const {controller, data, _sorted} = metaset;
  const iScale = controller._cachedMeta.iScale;
  if (iScale && axis === iScale.axis && axis !== 'r' && _sorted && data.length) {
    const lookupMethod = iScale._reversePixels ? _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.A : _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x;
    if (!intersect) {
      return lookupMethod(data, axis, value);
    } else if (controller._sharedOptions) {
      const el = data[0];
      const range = typeof el.getRange === 'function' && el.getRange(axis);
      if (range) {
        const start = lookupMethod(data, axis, value - range);
        const end = lookupMethod(data, axis, value + range);
        return {lo: start.lo, hi: end.hi};
      }
    }
  }
  return {lo: 0, hi: data.length - 1};
}
function optimizedEvaluateItems(chart, axis, position, handler, intersect) {
  const metasets = chart.getSortedVisibleDatasetMetas();
  const value = position[axis];
  for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
    const {index, data} = metasets[i];
    const {lo, hi} = binarySearch(metasets[i], axis, value, intersect);
    for (let j = lo; j <= hi; ++j) {
      const element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  const useX = axis.indexOf('x') !== -1;
  const useY = axis.indexOf('y') !== -1;
  return function(pt1, pt2) {
    const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart, position, axis, useFinalPosition) {
  const items = [];
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z)(position, chart.chartArea, chart._minPadding)) {
    return items;
  }
  const evaluationFunc = function(element, datasetIndex, index) {
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({element, datasetIndex, index});
    }
  };
  optimizedEvaluateItems(chart, axis, position, evaluationFunc, true);
  return items;
}
function getNearestRadialItems(chart, position, axis, useFinalPosition) {
  let items = [];
  function evaluationFunc(element, datasetIndex, index) {
    const {startAngle, endAngle} = element.getProps(['startAngle', 'endAngle'], useFinalPosition);
    const {angle} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.B)(element, {x: position.x, y: position.y});
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle)) {
      items.push({element, datasetIndex, index});
    }
  }
  optimizedEvaluateItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition) {
  let items = [];
  const distanceMetric = getDistanceMetricForAxis(axis);
  let minDistance = Number.POSITIVE_INFINITY;
  function evaluationFunc(element, datasetIndex, index) {
    const inRange = element.inRange(position.x, position.y, useFinalPosition);
    if (intersect && !inRange) {
      return;
    }
    const center = element.getCenterPoint(useFinalPosition);
    const pointInArea = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z)(center, chart.chartArea, chart._minPadding);
    if (!pointInArea && !inRange) {
      return;
    }
    const distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [{element, datasetIndex, index}];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({element, datasetIndex, index});
    }
  }
  optimizedEvaluateItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition) {
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z)(position, chart.chartArea, chart._minPadding)) {
    return [];
  }
  return axis === 'r' && !intersect
    ? getNearestRadialItems(chart, position, axis, useFinalPosition)
    : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition);
}
function getAxisItems(chart, e, options, useFinalPosition) {
  const position = getRelativePosition(e, chart);
  const items = [];
  const axis = options.axis;
  const rangeMethod = axis === 'x' ? 'inXRange' : 'inYRange';
  let intersectsItem = false;
  evaluateAllVisibleItems(chart, (element, datasetIndex, index) => {
    if (element[rangeMethod](position[axis], useFinalPosition)) {
      items.push({element, datasetIndex, index});
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      intersectsItem = true;
    }
  });
  if (options.intersect && !intersectsItem) {
    return [];
  }
  return items;
}
var Interaction = {
  modes: {
    index(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || 'x';
      const items = options.intersect
        ? getIntersectItems(chart, position, axis, useFinalPosition)
        : getNearestItems(chart, position, axis, false, useFinalPosition);
      const elements = [];
      if (!items.length) {
        return [];
      }
      chart.getSortedVisibleDatasetMetas().forEach((meta) => {
        const index = items[0].index;
        const element = meta.data[index];
        if (element && !element.skip) {
          elements.push({element, datasetIndex: meta.index, index});
        }
      });
      return elements;
    },
    dataset(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || 'xy';
      let items = options.intersect
        ? getIntersectItems(chart, position, axis, useFinalPosition) :
        getNearestItems(chart, position, axis, false, useFinalPosition);
      if (items.length > 0) {
        const datasetIndex = items[0].datasetIndex;
        const data = chart.getDatasetMeta(datasetIndex).data;
        items = [];
        for (let i = 0; i < data.length; ++i) {
          items.push({element: data[i], datasetIndex, index: i});
        }
      }
      return items;
    },
    point(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || 'xy';
      return getIntersectItems(chart, position, axis, useFinalPosition);
    },
    nearest(chart, e, options, useFinalPosition) {
      const position = getRelativePosition(e, chart);
      const axis = options.axis || 'xy';
      return getNearestItems(chart, position, axis, options.intersect, useFinalPosition);
    },
    x(chart, e, options, useFinalPosition) {
      return getAxisItems(chart, e, {axis: 'x', intersect: options.intersect}, useFinalPosition);
    },
    y(chart, e, options, useFinalPosition) {
      return getAxisItems(chart, e, {axis: 'y', intersect: options.intersect}, useFinalPosition);
    }
  }
};

const STATIC_POSITIONS = ['left', 'top', 'right', 'bottom'];
function filterByPosition(array, position) {
  return array.filter(v => v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
  return array.filter(v => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
  return array.sort((a, b) => {
    const v0 = reverse ? b : a;
    const v1 = reverse ? a : b;
    return v0.weight === v1.weight ?
      v0.index - v1.index :
      v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  const layoutBoxes = [];
  let i, ilen, box, pos, stack, stackWeight;
  for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
    box = boxes[i];
    ({position: pos, options: {stack, stackWeight = 1}} = box);
    layoutBoxes.push({
      index: i,
      box,
      pos,
      horizontal: box.isHorizontal(),
      weight: box.weight,
      stack: stack && (pos + stack),
      stackWeight
    });
  }
  return layoutBoxes;
}
function buildStacks(layouts) {
  const stacks = {};
  for (const wrap of layouts) {
    const {stack, pos, stackWeight} = wrap;
    if (!stack || !STATIC_POSITIONS.includes(pos)) {
      continue;
    }
    const _stack = stacks[stack] || (stacks[stack] = {count: 0, placed: 0, weight: 0, size: 0});
    _stack.count++;
    _stack.weight += stackWeight;
  }
  return stacks;
}
function setLayoutDims(layouts, params) {
  const stacks = buildStacks(layouts);
  const {vBoxMaxWidth, hBoxMaxHeight} = params;
  let i, ilen, layout;
  for (i = 0, ilen = layouts.length; i < ilen; ++i) {
    layout = layouts[i];
    const {fullSize} = layout.box;
    const stack = stacks[layout.stack];
    const factor = stack && layout.stackWeight / stack.weight;
    if (layout.horizontal) {
      layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
      layout.height = hBoxMaxHeight;
    } else {
      layout.width = vBoxMaxWidth;
      layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
    }
  }
  return stacks;
}
function buildLayoutBoxes(boxes) {
  const layoutBoxes = wrapBoxes(boxes);
  const fullSize = sortByWeight(layoutBoxes.filter(wrap => wrap.box.fullSize), true);
  const left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
  const right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
  const top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
  const bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
  const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
  const centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
  return {
    fullSize,
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, 'chartArea'),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
  return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
  maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
  maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
  maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
  maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
  const {pos, box} = layout;
  const maxPadding = chartArea.maxPadding;
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(pos)) {
    if (layout.size) {
      chartArea[pos] -= layout.size;
    }
    const stack = stacks[layout.stack] || {size: 0, count: 1};
    stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
    layout.size = stack.size / stack.count;
    chartArea[pos] += layout.size;
  }
  if (box.getPadding) {
    updateMaxPadding(maxPadding, box.getPadding());
  }
  const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right'));
  const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom'));
  const widthChanged = newWidth !== chartArea.w;
  const heightChanged = newHeight !== chartArea.h;
  chartArea.w = newWidth;
  chartArea.h = newHeight;
  return layout.horizontal
    ? {same: widthChanged, other: heightChanged}
    : {same: heightChanged, other: widthChanged};
}
function handleMaxPadding(chartArea) {
  const maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos('top');
  chartArea.x += updatePos('left');
  updatePos('right');
  updatePos('bottom');
}
function getMargins(horizontal, chartArea) {
  const maxPadding = chartArea.maxPadding;
  function marginForPositions(positions) {
    const margin = {left: 0, top: 0, right: 0, bottom: 0};
    positions.forEach((pos) => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal
    ? marginForPositions(['left', 'right'])
    : marginForPositions(['top', 'bottom']);
}
function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i, ilen, layout, box, refit, changed;
  for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    box.update(
      layout.width || chartArea.w,
      layout.height || chartArea.h,
      getMargins(layout.horizontal, chartArea)
    );
    const {same, other} = updateDims(chartArea, params, layout, stacks);
    refit |= same && refitBoxes.length;
    changed = changed || other;
    if (!box.fullSize) {
      refitBoxes.push(layout);
    }
  }
  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
  box.top = top;
  box.left = left;
  box.right = left + width;
  box.bottom = top + height;
  box.width = width;
  box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
  const userPadding = params.padding;
  let {x, y} = chartArea;
  for (const layout of boxes) {
    const box = layout.box;
    const stack = stacks[layout.stack] || {count: 1, placed: 0, weight: 1};
    const weight = (layout.stackWeight / stack.weight) || 1;
    if (layout.horizontal) {
      const width = chartArea.w * weight;
      const height = stack.size || box.height;
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j)(stack.start)) {
        y = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
      } else {
        setBoxDims(box, chartArea.left + stack.placed, y, width, height);
      }
      stack.start = y;
      stack.placed += width;
      y = box.bottom;
    } else {
      const height = chartArea.h * weight;
      const width = stack.size || box.width;
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j)(stack.start)) {
        x = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
      } else {
        setBoxDims(box, x, chartArea.top + stack.placed, width, height);
      }
      stack.start = x;
      stack.placed += height;
      x = box.right;
    }
  }
  chartArea.x = x;
  chartArea.y = y;
}
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set('layout', {
  autoPadding: true,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
var layouts = {
  addBox(chart, item) {
    if (!chart.boxes) {
      chart.boxes = [];
    }
    item.fullSize = item.fullSize || false;
    item.position = item.position || 'top';
    item.weight = item.weight || 0;
    item._layers = item._layers || function() {
      return [{
        z: 0,
        draw(chartArea) {
          item.draw(chartArea);
        }
      }];
    };
    chart.boxes.push(item);
  },
  removeBox(chart, layoutItem) {
    const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
    if (index !== -1) {
      chart.boxes.splice(index, 1);
    }
  },
  configure(chart, item, options) {
    item.fullSize = options.fullSize;
    item.position = options.position;
    item.weight = options.weight;
  },
  update(chart, width, height, minPadding) {
    if (!chart) {
      return;
    }
    const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(chart.options.layout.padding);
    const availableWidth = Math.max(width - padding.width, 0);
    const availableHeight = Math.max(height - padding.height, 0);
    const boxes = buildLayoutBoxes(chart.boxes);
    const verticalBoxes = boxes.vertical;
    const horizontalBoxes = boxes.horizontal;
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(chart.boxes, box => {
      if (typeof box.beforeLayout === 'function') {
        box.beforeLayout();
      }
    });
    const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) =>
      wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
    const params = Object.freeze({
      outerWidth: width,
      outerHeight: height,
      padding,
      availableWidth,
      availableHeight,
      vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
      hBoxMaxHeight: availableHeight / 2
    });
    const maxPadding = Object.assign({}, padding);
    updateMaxPadding(maxPadding, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(minPadding));
    const chartArea = Object.assign({
      maxPadding,
      w: availableWidth,
      h: availableHeight,
      x: padding.left,
      y: padding.top
    }, padding);
    const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
    fitBoxes(boxes.fullSize, chartArea, params, stacks);
    fitBoxes(verticalBoxes, chartArea, params, stacks);
    if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
      fitBoxes(verticalBoxes, chartArea, params, stacks);
    }
    handleMaxPadding(chartArea);
    placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
    chartArea.x += chartArea.w;
    chartArea.y += chartArea.h;
    placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
    chart.chartArea = {
      left: chartArea.left,
      top: chartArea.top,
      right: chartArea.left + chartArea.w,
      bottom: chartArea.top + chartArea.h,
      height: chartArea.h,
      width: chartArea.w,
    };
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(boxes.chartArea, (layout) => {
      const box = layout.box;
      Object.assign(box, chart.chartArea);
      box.update(chartArea.w, chartArea.h, {left: 0, top: 0, right: 0, bottom: 0});
    });
  }
};

class BasePlatform {
  acquireContext(canvas, aspectRatio) {}
  releaseContext(context) {
    return false;
  }
  addEventListener(chart, type, listener) {}
  removeEventListener(chart, type, listener) {}
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(element, width, height, aspectRatio) {
    width = Math.max(0, width || element.width);
    height = height || element.height;
    return {
      width,
      height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
    };
  }
  isAttached(canvas) {
    return true;
  }
  updateConfig(config) {
  }
}

class BasicPlatform extends BasePlatform {
  acquireContext(item) {
    return item && item.getContext && item.getContext('2d') || null;
  }
  updateConfig(config) {
    config.options.animation = false;
  }
}

const EXPANDO_KEY = '$chartjs';
const EVENT_TYPES = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup',
  pointerenter: 'mouseenter',
  pointerdown: 'mousedown',
  pointermove: 'mousemove',
  pointerup: 'mouseup',
  pointerleave: 'mouseout',
  pointerout: 'mouseout'
};
const isNullOrEmpty = value => value === null || value === '';
function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;
  const renderHeight = canvas.getAttribute('height');
  const renderWidth = canvas.getAttribute('width');
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || 'block';
  style.boxSizing = style.boxSizing || 'border-box';
  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.G)(canvas, 'width');
    if (displayWidth !== undefined) {
      canvas.width = displayWidth;
    }
  }
  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === '') {
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.G)(canvas, 'height');
      if (displayHeight !== undefined) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
const eventListenerOptions = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.J ? {passive: true} : false;
function addListener(node, type, listener) {
  node.addEventListener(type, listener, eventListenerOptions);
}
function removeListener(chart, type, listener) {
  chart.canvas.removeEventListener(type, listener, eventListenerOptions);
}
function fromNativeEvent(event, chart) {
  const type = EVENT_TYPES[event.type] || event.type;
  const {x, y} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.y)(event, chart);
  return {
    type,
    chart,
    native: event,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null,
  };
}
function nodeListContains(nodeList, canvas) {
  for (const node of nodeList) {
    if (node === canvas || node.contains(canvas)) {
      return true;
    }
  }
}
function createAttachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver(entries => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.addedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {childList: true, subtree: true});
  return observer;
}
function createDetachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver(entries => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.removedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {childList: true, subtree: true});
  return observer;
}
const drpListeningCharts = new Map();
let oldDevicePixelRatio = 0;
function onWindowResize() {
  const dpr = window.devicePixelRatio;
  if (dpr === oldDevicePixelRatio) {
    return;
  }
  oldDevicePixelRatio = dpr;
  drpListeningCharts.forEach((resize, chart) => {
    if (chart.currentDevicePixelRatio !== dpr) {
      resize();
    }
  });
}
function listenDevicePixelRatioChanges(chart, resize) {
  if (!drpListeningCharts.size) {
    window.addEventListener('resize', onWindowResize);
  }
  drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
  drpListeningCharts.delete(chart);
  if (!drpListeningCharts.size) {
    window.removeEventListener('resize', onWindowResize);
  }
}
function createResizeObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const container = canvas && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.F)(canvas);
  if (!container) {
    return;
  }
  const resize = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.I)((width, height) => {
    const w = container.clientWidth;
    listener(width, height);
    if (w < container.clientWidth) {
      listener();
    }
  }, window);
  const observer = new ResizeObserver(entries => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    if (width === 0 && height === 0) {
      return;
    }
    resize(width, height);
  });
  observer.observe(container);
  listenDevicePixelRatioChanges(chart, resize);
  return observer;
}
function releaseObserver(chart, type, observer) {
  if (observer) {
    observer.disconnect();
  }
  if (type === 'resize') {
    unlistenDevicePixelRatioChanges(chart);
  }
}
function createProxyAndListen(chart, type, listener) {
  const canvas = chart.canvas;
  const proxy = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.I)((event) => {
    if (chart.ctx !== null) {
      listener(fromNativeEvent(event, chart));
    }
  }, chart, (args) => {
    const event = args[0];
    return [event, event.offsetX, event.offsetY];
  });
  addListener(canvas, type, proxy);
  return proxy;
}
class DomPlatform extends BasePlatform {
  acquireContext(canvas, aspectRatio) {
    const context = canvas && canvas.getContext && canvas.getContext('2d');
    if (context && context.canvas === canvas) {
      initCanvas(canvas, aspectRatio);
      return context;
    }
    return null;
  }
  releaseContext(context) {
    const canvas = context.canvas;
    if (!canvas[EXPANDO_KEY]) {
      return false;
    }
    const initial = canvas[EXPANDO_KEY].initial;
    ['height', 'width'].forEach((prop) => {
      const value = initial[prop];
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
        canvas.removeAttribute(prop);
      } else {
        canvas.setAttribute(prop, value);
      }
    });
    const style = initial.style || {};
    Object.keys(style).forEach((key) => {
      canvas.style[key] = style[key];
    });
    canvas.width = canvas.width;
    delete canvas[EXPANDO_KEY];
    return true;
  }
  addEventListener(chart, type, listener) {
    this.removeEventListener(chart, type);
    const proxies = chart.$proxies || (chart.$proxies = {});
    const handlers = {
      attach: createAttachObserver,
      detach: createDetachObserver,
      resize: createResizeObserver
    };
    const handler = handlers[type] || createProxyAndListen;
    proxies[type] = handler(chart, type, listener);
  }
  removeEventListener(chart, type) {
    const proxies = chart.$proxies || (chart.$proxies = {});
    const proxy = proxies[type];
    if (!proxy) {
      return;
    }
    const handlers = {
      attach: releaseObserver,
      detach: releaseObserver,
      resize: releaseObserver
    };
    const handler = handlers[type] || removeListener;
    handler(chart, type, proxy);
    proxies[type] = undefined;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(canvas, width, height, aspectRatio) {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.E)(canvas, width, height, aspectRatio);
  }
  isAttached(canvas) {
    const container = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.F)(canvas);
    return !!(container && container.isConnected);
  }
}

function _detectPlatform(canvas) {
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.K)() || (typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas)) {
    return BasicPlatform;
  }
  return DomPlatform;
}

class Element {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.active = false;
    this.options = undefined;
    this.$animations = undefined;
  }
  tooltipPosition(useFinalPosition) {
    const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
    return {x, y};
  }
  hasValue() {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q)(this.x) && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q)(this.y);
  }
  getProps(props, final) {
    const anims = this.$animations;
    if (!final || !anims) {
      return this;
    }
    const ret = {};
    props.forEach(prop => {
      ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
    });
    return ret;
  }
}
Element.defaults = {};
Element.defaultRoutes = undefined;

const formatters = {
  values(value) {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(value) ? value : '' + value;
  },
  numeric(tickValue, index, ticks) {
    if (tickValue === 0) {
      return '0';
    }
    const locale = this.chart.options.locale;
    let notation;
    let delta = tickValue;
    if (ticks.length > 1) {
      const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
      if (maxTick < 1e-4 || maxTick > 1e+15) {
        notation = 'scientific';
      }
      delta = calculateDelta(tickValue, ticks);
    }
    const logDelta = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(Math.abs(delta));
    const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
    const options = {notation, minimumFractionDigits: numDecimal, maximumFractionDigits: numDecimal};
    Object.assign(options, this.options.ticks.format);
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o)(tickValue, locale, options);
  },
  logarithmic(tickValue, index, ticks) {
    if (tickValue === 0) {
      return '0';
    }
    const remain = tickValue / (Math.pow(10, Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(tickValue))));
    if (remain === 1 || remain === 2 || remain === 5) {
      return formatters.numeric.call(this, tickValue, index, ticks);
    }
    return '';
  }
};
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
var Ticks = {formatters};

_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set('scale', {
  display: true,
  offset: false,
  reverse: false,
  beginAtZero: false,
  bounds: 'ticks',
  grace: 0,
  grid: {
    display: true,
    lineWidth: 1,
    drawBorder: true,
    drawOnChartArea: true,
    drawTicks: true,
    tickLength: 8,
    tickWidth: (_ctx, options) => options.lineWidth,
    tickColor: (_ctx, options) => options.color,
    offset: false,
    borderDash: [],
    borderDashOffset: 0.0,
    borderWidth: 1
  },
  title: {
    display: false,
    text: '',
    padding: {
      top: 4,
      bottom: 4
    }
  },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: false,
    textStrokeWidth: 0,
    textStrokeColor: '',
    padding: 3,
    display: true,
    autoSkip: true,
    autoSkipPadding: 3,
    labelOffset: 0,
    callback: Ticks.formatters.values,
    minor: {},
    major: {},
    align: 'center',
    crossAlign: 'near',
    showLabelBackdrop: false,
    backdropColor: 'rgba(255, 255, 255, 0.75)',
    backdropPadding: 2,
  }
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.route('scale.ticks', 'color', '', 'color');
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.route('scale.grid', 'color', '', 'borderColor');
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.route('scale.grid', 'borderColor', '', 'borderColor');
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.route('scale.title', 'color', '', 'color');
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe('scale', {
  _fallback: false,
  _scriptable: (name) => !name.startsWith('before') && !name.startsWith('after') && name !== 'callback' && name !== 'parser',
  _indexable: (name) => name !== 'borderDash' && name !== 'tickBorderDash',
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe('scales', {
  _fallback: 'scale',
});
_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe('scale.ticks', {
  _scriptable: (name) => name !== 'backdropPadding' && name !== 'callback',
  _indexable: (name) => name !== 'backdropPadding',
});

function autoSkip(scale, ticks) {
  const tickOpts = scale.options.ticks;
  const ticksLimit = tickOpts.maxTicksLimit || determineMaxTicks(scale);
  const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
  const numMajorIndices = majorIndices.length;
  const first = majorIndices[0];
  const last = majorIndices[numMajorIndices - 1];
  const newTicks = [];
  if (numMajorIndices > ticksLimit) {
    skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
    return newTicks;
  }
  const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
  if (numMajorIndices > 0) {
    let i, ilen;
    const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
    skip(ticks, newTicks, spacing, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
    for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
      skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
    }
    skip(ticks, newTicks, spacing, last, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
    return newTicks;
  }
  skip(ticks, newTicks, spacing);
  return newTicks;
}
function determineMaxTicks(scale) {
  const offset = scale.options.offset;
  const tickLength = scale._tickSize();
  const maxScale = scale._length / tickLength + (offset ? 0 : 1);
  const maxChart = scale._maxLength / tickLength;
  return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  const evenMajorSpacing = getEvenSpacing(majorIndices);
  const spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  const factors = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.M)(evenMajorSpacing);
  for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
    const factor = factors[i];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  const result = [];
  let i, ilen;
  for (i = 0, ilen = ticks.length; i < ilen; i++) {
    if (ticks[i].major) {
      result.push(i);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  let count = 0;
  let next = majorIndices[0];
  let i;
  spacing = Math.ceil(spacing);
  for (i = 0; i < ticks.length; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  const start = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(majorStart, 0);
  const end = Math.min((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(majorEnd, ticks.length), ticks.length);
  let count = 0;
  let length, i, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i = Math.max(start, 0); i < end; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
function getEvenSpacing(arr) {
  const len = arr.length;
  let i, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i = 1; i < len; ++i) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return diff;
}

const reverseAlign = (align) => align === 'left' ? 'right' : align === 'right' ? 'left' : align;
const offsetFromEdge = (scale, edge, offset) => edge === 'top' || edge === 'left' ? scale[edge] + offset : scale[edge] - offset;
function sample(arr, numItems) {
  const result = [];
  const increment = arr.length / numItems;
  const len = arr.length;
  let i = 0;
  for (; i < len; i += increment) {
    result.push(arr[Math.floor(i)]);
  }
  return result;
}
function getPixelForGridLine(scale, index, offsetGridLines) {
  const length = scale.ticks.length;
  const validIndex = Math.min(index, length - 1);
  const start = scale._startPixel;
  const end = scale._endPixel;
  const epsilon = 1e-6;
  let lineValue = scale.getPixelForTick(validIndex);
  let offset;
  if (offsetGridLines) {
    if (length === 1) {
      offset = Math.max(lineValue - start, end - lineValue);
    } else if (index === 0) {
      offset = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
    }
    lineValue += validIndex < index ? offset : -offset;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches, length) {
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(caches, (cache) => {
    const gc = cache.gc;
    const gcLen = gc.length / 2;
    let i;
    if (gcLen > length) {
      for (i = 0; i < gcLen; ++i) {
        delete cache.data[gc[i]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options) {
  return options.drawTicks ? options.tickLength : 0;
}
function getTitleHeight(options, fallback) {
  if (!options.display) {
    return 0;
  }
  const font = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.font, fallback);
  const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(options.padding);
  const lines = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(options.text) ? options.text.length : 1;
  return (lines * font.lineHeight) + padding.height;
}
function createScaleContext(parent, scale) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent, {
    scale,
    type: 'scale'
  });
}
function createTickContext(parent, index, tick) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent, {
    tick,
    index,
    type: 'tick'
  });
}
function titleAlign(align, position, reverse) {
  let ret = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.$)(align);
  if ((reverse && position !== 'right') || (!reverse && position === 'right')) {
    ret = reverseAlign(ret);
  }
  return ret;
}
function titleArgs(scale, offset, position, align) {
  const {top, left, bottom, right, chart} = scale;
  const {chartArea, scales} = chart;
  let rotation = 0;
  let maxWidth, titleX, titleY;
  const height = bottom - top;
  const width = right - left;
  if (scale.isHorizontal()) {
    titleX = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, left, right);
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
    } else if (position === 'center') {
      titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
    } else {
      titleY = offsetFromEdge(scale, position, offset);
    }
    maxWidth = right - left;
  } else {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
    } else if (position === 'center') {
      titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
    } else {
      titleX = offsetFromEdge(scale, position, offset);
    }
    titleY = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, bottom, top);
    rotation = position === 'left' ? -_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H : _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H;
  }
  return {titleX, titleY, maxWidth, rotation};
}
class Scale extends Element {
  constructor(cfg) {
    super();
    this.id = cfg.id;
    this.type = cfg.type;
    this.options = undefined;
    this.ctx = cfg.ctx;
    this.chart = cfg.chart;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.width = undefined;
    this.height = undefined;
    this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.maxWidth = undefined;
    this.maxHeight = undefined;
    this.paddingTop = undefined;
    this.paddingBottom = undefined;
    this.paddingLeft = undefined;
    this.paddingRight = undefined;
    this.axis = undefined;
    this.labelRotation = undefined;
    this.min = undefined;
    this.max = undefined;
    this._range = undefined;
    this.ticks = [];
    this._gridLineItems = null;
    this._labelItems = null;
    this._labelSizes = null;
    this._length = 0;
    this._maxLength = 0;
    this._longestTextCache = {};
    this._startPixel = undefined;
    this._endPixel = undefined;
    this._reversePixels = false;
    this._userMax = undefined;
    this._userMin = undefined;
    this._suggestedMax = undefined;
    this._suggestedMin = undefined;
    this._ticksLength = 0;
    this._borderValue = 0;
    this._cache = {};
    this._dataLimitsCached = false;
    this.$context = undefined;
  }
  init(options) {
    this.options = options.setContext(this.getContext());
    this.axis = options.axis;
    this._userMin = this.parse(options.min);
    this._userMax = this.parse(options.max);
    this._suggestedMin = this.parse(options.suggestedMin);
    this._suggestedMax = this.parse(options.suggestedMax);
  }
  parse(raw, index) {
    return raw;
  }
  getUserBounds() {
    let {_userMin, _userMax, _suggestedMin, _suggestedMax} = this;
    _userMin = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_userMin, Number.POSITIVE_INFINITY);
    _userMax = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_userMax, Number.NEGATIVE_INFINITY);
    _suggestedMin = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_suggestedMin, Number.POSITIVE_INFINITY);
    _suggestedMax = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_suggestedMax, Number.NEGATIVE_INFINITY);
    return {
      min: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_userMin, _suggestedMin),
      max: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(_userMax, _suggestedMax),
      minDefined: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(_userMin),
      maxDefined: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(_userMax)
    };
  }
  getMinMax(canStack) {
    let {min, max, minDefined, maxDefined} = this.getUserBounds();
    let range;
    if (minDefined && maxDefined) {
      return {min, max};
    }
    const metas = this.getMatchingVisibleMetas();
    for (let i = 0, ilen = metas.length; i < ilen; ++i) {
      range = metas[i].controller.getMinMax(this, canStack);
      if (!minDefined) {
        min = Math.min(min, range.min);
      }
      if (!maxDefined) {
        max = Math.max(max, range.max);
      }
    }
    min = maxDefined && min > max ? max : min;
    max = minDefined && min > max ? min : max;
    return {
      min: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(min, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(max, min)),
      max: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(max, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(min, max))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const data = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
  }
  beforeLayout() {
    this._cache = {};
    this._dataLimitsCached = false;
  }
  beforeUpdate() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.beforeUpdate, [this]);
  }
  update(maxWidth, maxHeight, margins) {
    const {beginAtZero, grace, ticks: tickOpts} = this.options;
    const sampleSize = tickOpts.sampleSize;
    this.beforeUpdate();
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, margins);
    this.ticks = null;
    this._labelSizes = null;
    this._gridLineItems = null;
    this._labelItems = null;
    this.beforeSetDimensions();
    this.setDimensions();
    this.afterSetDimensions();
    this._maxLength = this.isHorizontal()
      ? this.width + margins.left + margins.right
      : this.height + margins.top + margins.bottom;
    if (!this._dataLimitsCached) {
      this.beforeDataLimits();
      this.determineDataLimits();
      this.afterDataLimits();
      this._range = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Q)(this, grace, beginAtZero);
      this._dataLimitsCached = true;
    }
    this.beforeBuildTicks();
    this.ticks = this.buildTicks() || [];
    this.afterBuildTicks();
    const samplingEnabled = sampleSize < this.ticks.length;
    this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
    this.configure();
    this.beforeCalculateLabelRotation();
    this.calculateLabelRotation();
    this.afterCalculateLabelRotation();
    if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto')) {
      this.ticks = autoSkip(this, this.ticks);
      this._labelSizes = null;
    }
    if (samplingEnabled) {
      this._convertTicksToLabels(this.ticks);
    }
    this.beforeFit();
    this.fit();
    this.afterFit();
    this.afterUpdate();
  }
  configure() {
    let reversePixels = this.options.reverse;
    let startPixel, endPixel;
    if (this.isHorizontal()) {
      startPixel = this.left;
      endPixel = this.right;
    } else {
      startPixel = this.top;
      endPixel = this.bottom;
      reversePixels = !reversePixels;
    }
    this._startPixel = startPixel;
    this._endPixel = endPixel;
    this._reversePixels = reversePixels;
    this._length = endPixel - startPixel;
    this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = 0;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = 0;
      this.bottom = this.height;
    }
    this.paddingLeft = 0;
    this.paddingTop = 0;
    this.paddingRight = 0;
    this.paddingBottom = 0;
  }
  afterSetDimensions() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.afterSetDimensions, [this]);
  }
  _callHooks(name) {
    this.chart.notifyPlugins(name, this.getContext());
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options[name], [this]);
  }
  beforeDataLimits() {
    this._callHooks('beforeDataLimits');
  }
  determineDataLimits() {}
  afterDataLimits() {
    this._callHooks('afterDataLimits');
  }
  beforeBuildTicks() {
    this._callHooks('beforeBuildTicks');
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks('afterBuildTicks');
  }
  beforeTickToLabelConversion() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(ticks) {
    const tickOpts = this.options.ticks;
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      tick = ticks[i];
      tick.label = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(tickOpts.callback, [tick.value, i, ticks], this);
    }
  }
  afterTickToLabelConversion() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const options = this.options;
    const tickOpts = options.ticks;
    const numTicks = this.ticks.length;
    const minRotation = tickOpts.minRotation || 0;
    const maxRotation = tickOpts.maxRotation;
    let labelRotation = minRotation;
    let tickWidth, maxHeight, maxLabelDiagonal;
    if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
      this.labelRotation = minRotation;
      return;
    }
    const labelSizes = this._getLabelSizes();
    const maxLabelWidth = labelSizes.widest.width;
    const maxLabelHeight = labelSizes.highest.height;
    const maxWidth = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(this.chart.width - maxLabelWidth, 0, this.maxWidth);
    tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
    if (maxLabelWidth + 6 > tickWidth) {
      tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
      maxHeight = this.maxHeight - getTickMarkLength(options.grid)
				- tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
      maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
      labelRotation = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.R)(Math.min(
        Math.asin((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)((labelSizes.highest.height + 6) / tickWidth, -1, 1)),
        Math.asin((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(maxLabelHeight / maxLabelDiagonal, -1, 1))
      ));
      labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
    }
    this.labelRotation = labelRotation;
  }
  afterCalculateLabelRotation() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.afterCalculateLabelRotation, [this]);
  }
  beforeFit() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.beforeFit, [this]);
  }
  fit() {
    const minSize = {
      width: 0,
      height: 0
    };
    const {chart, options: {ticks: tickOpts, title: titleOpts, grid: gridOpts}} = this;
    const display = this._isVisible();
    const isHorizontal = this.isHorizontal();
    if (display) {
      const titleHeight = getTitleHeight(titleOpts, chart.options.font);
      if (isHorizontal) {
        minSize.width = this.maxWidth;
        minSize.height = getTickMarkLength(gridOpts) + titleHeight;
      } else {
        minSize.height = this.maxHeight;
        minSize.width = getTickMarkLength(gridOpts) + titleHeight;
      }
      if (tickOpts.display && this.ticks.length) {
        const {first, last, widest, highest} = this._getLabelSizes();
        const tickPadding = tickOpts.padding * 2;
        const angleRadians = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
        const cos = Math.cos(angleRadians);
        const sin = Math.sin(angleRadians);
        if (isHorizontal) {
          const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
          minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
        } else {
          const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
          minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
        }
        this._calculatePadding(first, last, sin, cos);
      }
    }
    this._handleMargins();
    if (isHorizontal) {
      this.width = this._length = chart.width - this._margins.left - this._margins.right;
      this.height = minSize.height;
    } else {
      this.width = minSize.width;
      this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
    }
  }
  _calculatePadding(first, last, sin, cos) {
    const {ticks: {align, padding}, position} = this.options;
    const isRotated = this.labelRotation !== 0;
    const labelsBelowTicks = position !== 'top' && this.axis === 'x';
    if (this.isHorizontal()) {
      const offsetLeft = this.getPixelForTick(0) - this.left;
      const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
      let paddingLeft = 0;
      let paddingRight = 0;
      if (isRotated) {
        if (labelsBelowTicks) {
          paddingLeft = cos * first.width;
          paddingRight = sin * last.height;
        } else {
          paddingLeft = sin * first.height;
          paddingRight = cos * last.width;
        }
      } else if (align === 'start') {
        paddingRight = last.width;
      } else if (align === 'end') {
        paddingLeft = first.width;
      } else {
        paddingLeft = first.width / 2;
        paddingRight = last.width / 2;
      }
      this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
      this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
    } else {
      let paddingTop = last.height / 2;
      let paddingBottom = first.height / 2;
      if (align === 'start') {
        paddingTop = 0;
        paddingBottom = first.height;
      } else if (align === 'end') {
        paddingTop = last.height;
        paddingBottom = 0;
      }
      this.paddingTop = paddingTop + padding;
      this.paddingBottom = paddingBottom + padding;
    }
  }
  _handleMargins() {
    if (this._margins) {
      this._margins.left = Math.max(this.paddingLeft, this._margins.left);
      this._margins.top = Math.max(this.paddingTop, this._margins.top);
      this._margins.right = Math.max(this.paddingRight, this._margins.right);
      this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
    }
  }
  afterFit() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const {axis, position} = this.options;
    return position === 'top' || position === 'bottom' || axis === 'x';
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(ticks) {
    this.beforeTickToLabelConversion();
    this.generateTickLabels(ticks);
    let i, ilen;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(ticks[i].label)) {
        ticks.splice(i, 1);
        ilen--;
        i--;
      }
    }
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let labelSizes = this._labelSizes;
    if (!labelSizes) {
      const sampleSize = this.options.ticks.sampleSize;
      let ticks = this.ticks;
      if (sampleSize < ticks.length) {
        ticks = sample(ticks, sampleSize);
      }
      this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length);
    }
    return labelSizes;
  }
  _computeLabelSizes(ticks, length) {
    const {ctx, _longestTextCache: caches} = this;
    const widths = [];
    const heights = [];
    let widestLabelSize = 0;
    let highestLabelSize = 0;
    let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
    for (i = 0; i < length; ++i) {
      label = ticks[i].label;
      tickFont = this._resolveTickFontOptions(i);
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {data: {}, gc: []};
      lineHeight = tickFont.lineHeight;
      width = height = 0;
      if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(label) && !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(label)) {
        width = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.S)(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(label)) {
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          nestedLabel = label[j];
          if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(nestedLabel) && !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(nestedLabel)) {
            width = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.S)(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }
      widths.push(width);
      heights.push(height);
      widestLabelSize = Math.max(width, widestLabelSize);
      highestLabelSize = Math.max(height, highestLabelSize);
    }
    garbageCollect(caches, length);
    const widest = widths.indexOf(widestLabelSize);
    const highest = heights.indexOf(highestLabelSize);
    const valueAt = (idx) => ({width: widths[idx] || 0, height: heights[idx] || 0});
    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest),
      widths,
      heights,
    };
  }
  getLabelForValue(value) {
    return value;
  }
  getPixelForValue(value, index) {
    return NaN;
  }
  getValueForPixel(pixel) {}
  getPixelForTick(index) {
    const ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getPixelForDecimal(decimal) {
    if (this._reversePixels) {
      decimal = 1 - decimal;
    }
    const pixel = this._startPixel + decimal * this._length;
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.U)(this._alignToPixels ? (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(this.chart, pixel, 0) : pixel);
  }
  getDecimalForPixel(pixel) {
    const decimal = (pixel - this._startPixel) / this._length;
    return this._reversePixels ? 1 - decimal : decimal;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const {min, max} = this;
    return min < 0 && max < 0 ? max :
      min > 0 && max > 0 ? min :
      0;
  }
  getContext(index) {
    const ticks = this.ticks || [];
    if (index >= 0 && index < ticks.length) {
      const tick = ticks[index];
      return tick.$context ||
				(tick.$context = createTickContext(this.getContext(), index, tick));
    }
    return this.$context ||
			(this.$context = createScaleContext(this.chart.getContext(), this));
  }
  _tickSize() {
    const optionTicks = this.options.ticks;
    const rot = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
    const cos = Math.abs(Math.cos(rot));
    const sin = Math.abs(Math.sin(rot));
    const labelSizes = this._getLabelSizes();
    const padding = optionTicks.autoSkipPadding || 0;
    const w = labelSizes ? labelSizes.widest.width + padding : 0;
    const h = labelSizes ? labelSizes.highest.height + padding : 0;
    return this.isHorizontal()
      ? h * cos > w * sin ? w / cos : h / sin
      : h * sin < w * cos ? h / cos : w / sin;
  }
  _isVisible() {
    const display = this.options.display;
    if (display !== 'auto') {
      return !!display;
    }
    return this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(chartArea) {
    const axis = this.axis;
    const chart = this.chart;
    const options = this.options;
    const {grid, position} = options;
    const offset = grid.offset;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const ticksLength = ticks.length + (offset ? 1 : 0);
    const tl = getTickMarkLength(grid);
    const items = [];
    const borderOpts = grid.setContext(this.getContext());
    const axisWidth = borderOpts.drawBorder ? borderOpts.borderWidth : 0;
    const axisHalfWidth = axisWidth / 2;
    const alignBorderValue = function(pixel) {
      return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, pixel, axisWidth);
    };
    let borderValue, i, lineValue, alignedLineValue;
    let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
    if (position === 'top') {
      borderValue = alignBorderValue(this.bottom);
      ty1 = this.bottom - tl;
      ty2 = borderValue - axisHalfWidth;
      y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
      y2 = chartArea.bottom;
    } else if (position === 'bottom') {
      borderValue = alignBorderValue(this.top);
      y1 = chartArea.top;
      y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
      ty1 = borderValue + axisHalfWidth;
      ty2 = this.top + tl;
    } else if (position === 'left') {
      borderValue = alignBorderValue(this.right);
      tx1 = this.right - tl;
      tx2 = borderValue - axisHalfWidth;
      x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
      x2 = chartArea.right;
    } else if (position === 'right') {
      borderValue = alignBorderValue(this.left);
      x1 = chartArea.left;
      x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
      tx1 = borderValue + axisHalfWidth;
      tx2 = this.left + tl;
    } else if (axis === 'x') {
      if (position === 'center') {
        borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      y1 = chartArea.top;
      y2 = chartArea.bottom;
      ty1 = borderValue + axisHalfWidth;
      ty2 = ty1 + tl;
    } else if (axis === 'y') {
      if (position === 'center') {
        borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      tx1 = borderValue - axisHalfWidth;
      tx2 = tx1 - tl;
      x1 = chartArea.left;
      x2 = chartArea.right;
    }
    const limit = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.ticks.maxTicksLimit, ticksLength);
    const step = Math.max(1, Math.ceil(ticksLength / limit));
    for (i = 0; i < ticksLength; i += step) {
      const optsAtIndex = grid.setContext(this.getContext(i));
      const lineWidth = optsAtIndex.lineWidth;
      const lineColor = optsAtIndex.color;
      const borderDash = grid.borderDash || [];
      const borderDashOffset = optsAtIndex.borderDashOffset;
      const tickWidth = optsAtIndex.tickWidth;
      const tickColor = optsAtIndex.tickColor;
      const tickBorderDash = optsAtIndex.tickBorderDash || [];
      const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
      lineValue = getPixelForGridLine(this, i, offset);
      if (lineValue === undefined) {
        continue;
      }
      alignedLineValue = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, lineValue, lineWidth);
      if (isHorizontal) {
        tx1 = tx2 = x1 = x2 = alignedLineValue;
      } else {
        ty1 = ty2 = y1 = y2 = alignedLineValue;
      }
      items.push({
        tx1,
        ty1,
        tx2,
        ty2,
        x1,
        y1,
        x2,
        y2,
        width: lineWidth,
        color: lineColor,
        borderDash,
        borderDashOffset,
        tickWidth,
        tickColor,
        tickBorderDash,
        tickBorderDashOffset,
      });
    }
    this._ticksLength = ticksLength;
    this._borderValue = borderValue;
    return items;
  }
  _computeLabelItems(chartArea) {
    const axis = this.axis;
    const options = this.options;
    const {position, ticks: optionTicks} = options;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const {align, crossAlign, padding, mirror} = optionTicks;
    const tl = getTickMarkLength(options.grid);
    const tickAndPadding = tl + padding;
    const hTickAndPadding = mirror ? -padding : tickAndPadding;
    const rotation = -(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
    const items = [];
    let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
    let textBaseline = 'middle';
    if (position === 'top') {
      y = this.bottom - hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === 'bottom') {
      y = this.top + hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === 'left') {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (position === 'right') {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x = ret.x;
    } else if (axis === 'x') {
      if (position === 'center') {
        y = ((chartArea.top + chartArea.bottom) / 2) + tickAndPadding;
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
      }
      textAlign = this._getXAxisLabelAlignment();
    } else if (axis === 'y') {
      if (position === 'center') {
        x = ((chartArea.left + chartArea.right) / 2) - tickAndPadding;
      } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        x = this.chart.scales[positionAxisID].getPixelForValue(value);
      }
      textAlign = this._getYAxisLabelAlignment(tl).textAlign;
    }
    if (axis === 'y') {
      if (align === 'start') {
        textBaseline = 'top';
      } else if (align === 'end') {
        textBaseline = 'bottom';
      }
    }
    const labelSizes = this._getLabelSizes();
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      label = tick.label;
      const optsAtIndex = optionTicks.setContext(this.getContext(i));
      pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
      font = this._resolveTickFontOptions(i);
      lineHeight = font.lineHeight;
      lineCount = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(label) ? label.length : 1;
      const halfCount = lineCount / 2;
      const color = optsAtIndex.color;
      const strokeColor = optsAtIndex.textStrokeColor;
      const strokeWidth = optsAtIndex.textStrokeWidth;
      if (isHorizontal) {
        x = pixel;
        if (position === 'top') {
          if (crossAlign === 'near' || rotation !== 0) {
            textOffset = -lineCount * lineHeight + lineHeight / 2;
          } else if (crossAlign === 'center') {
            textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
          } else {
            textOffset = -labelSizes.highest.height + lineHeight / 2;
          }
        } else {
          if (crossAlign === 'near' || rotation !== 0) {
            textOffset = lineHeight / 2;
          } else if (crossAlign === 'center') {
            textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
          } else {
            textOffset = labelSizes.highest.height - lineCount * lineHeight;
          }
        }
        if (mirror) {
          textOffset *= -1;
        }
      } else {
        y = pixel;
        textOffset = (1 - lineCount) * lineHeight / 2;
      }
      let backdrop;
      if (optsAtIndex.showLabelBackdrop) {
        const labelPadding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(optsAtIndex.backdropPadding);
        const height = labelSizes.heights[i];
        const width = labelSizes.widths[i];
        let top = y + textOffset - labelPadding.top;
        let left = x - labelPadding.left;
        switch (textBaseline) {
        case 'middle':
          top -= height / 2;
          break;
        case 'bottom':
          top -= height;
          break;
        }
        switch (textAlign) {
        case 'center':
          left -= width / 2;
          break;
        case 'right':
          left -= width;
          break;
        }
        backdrop = {
          left,
          top,
          width: width + labelPadding.width,
          height: height + labelPadding.height,
          color: optsAtIndex.backdropColor,
        };
      }
      items.push({
        rotation,
        label,
        font,
        color,
        strokeColor,
        strokeWidth,
        textOffset,
        textAlign,
        textBaseline,
        translation: [x, y],
        backdrop,
      });
    }
    return items;
  }
  _getXAxisLabelAlignment() {
    const {position, ticks} = this.options;
    const rotation = -(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.labelRotation);
    if (rotation) {
      return position === 'top' ? 'left' : 'right';
    }
    let align = 'center';
    if (ticks.align === 'start') {
      align = 'left';
    } else if (ticks.align === 'end') {
      align = 'right';
    }
    return align;
  }
  _getYAxisLabelAlignment(tl) {
    const {position, ticks: {crossAlign, mirror, padding}} = this.options;
    const labelSizes = this._getLabelSizes();
    const tickAndPadding = tl + padding;
    const widest = labelSizes.widest.width;
    let textAlign;
    let x;
    if (position === 'left') {
      if (mirror) {
        x = this.right + padding;
        if (crossAlign === 'near') {
          textAlign = 'left';
        } else if (crossAlign === 'center') {
          textAlign = 'center';
          x += (widest / 2);
        } else {
          textAlign = 'right';
          x += widest;
        }
      } else {
        x = this.right - tickAndPadding;
        if (crossAlign === 'near') {
          textAlign = 'right';
        } else if (crossAlign === 'center') {
          textAlign = 'center';
          x -= (widest / 2);
        } else {
          textAlign = 'left';
          x = this.left;
        }
      }
    } else if (position === 'right') {
      if (mirror) {
        x = this.left + padding;
        if (crossAlign === 'near') {
          textAlign = 'right';
        } else if (crossAlign === 'center') {
          textAlign = 'center';
          x -= (widest / 2);
        } else {
          textAlign = 'left';
          x -= widest;
        }
      } else {
        x = this.left + tickAndPadding;
        if (crossAlign === 'near') {
          textAlign = 'left';
        } else if (crossAlign === 'center') {
          textAlign = 'center';
          x += widest / 2;
        } else {
          textAlign = 'right';
          x = this.right;
        }
      }
    } else {
      textAlign = 'right';
    }
    return {textAlign, x};
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) {
      return;
    }
    const chart = this.chart;
    const position = this.options.position;
    if (position === 'left' || position === 'right') {
      return {top: 0, left: this.left, bottom: chart.height, right: this.right};
    } if (position === 'top' || position === 'bottom') {
      return {top: this.top, left: 0, bottom: this.bottom, right: chart.width};
    }
  }
  drawBackground() {
    const {ctx, options: {backgroundColor}, left, top, width, height} = this;
    if (backgroundColor) {
      ctx.save();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    }
  }
  getLineWidthForValue(value) {
    const grid = this.options.grid;
    if (!this._isVisible() || !grid.display) {
      return 0;
    }
    const ticks = this.ticks;
    const index = ticks.findIndex(t => t.value === value);
    if (index >= 0) {
      const opts = grid.setContext(this.getContext(index));
      return opts.lineWidth;
    }
    return 0;
  }
  drawGrid(chartArea) {
    const grid = this.options.grid;
    const ctx = this.ctx;
    const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
    let i, ilen;
    const drawLine = (p1, p2, style) => {
      if (!style.width || !style.color) {
        return;
      }
      ctx.save();
      ctx.lineWidth = style.width;
      ctx.strokeStyle = style.color;
      ctx.setLineDash(style.borderDash || []);
      ctx.lineDashOffset = style.borderDashOffset;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    };
    if (grid.display) {
      for (i = 0, ilen = items.length; i < ilen; ++i) {
        const item = items[i];
        if (grid.drawOnChartArea) {
          drawLine(
            {x: item.x1, y: item.y1},
            {x: item.x2, y: item.y2},
            item
          );
        }
        if (grid.drawTicks) {
          drawLine(
            {x: item.tx1, y: item.ty1},
            {x: item.tx2, y: item.ty2},
            {
              color: item.tickColor,
              width: item.tickWidth,
              borderDash: item.tickBorderDash,
              borderDashOffset: item.tickBorderDashOffset
            }
          );
        }
      }
    }
  }
  drawBorder() {
    const {chart, ctx, options: {grid}} = this;
    const borderOpts = grid.setContext(this.getContext());
    const axisWidth = grid.drawBorder ? borderOpts.borderWidth : 0;
    if (!axisWidth) {
      return;
    }
    const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
    const borderValue = this._borderValue;
    let x1, x2, y1, y2;
    if (this.isHorizontal()) {
      x1 = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, this.left, axisWidth) - axisWidth / 2;
      x2 = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, this.right, lastLineWidth) + lastLineWidth / 2;
      y1 = y2 = borderValue;
    } else {
      y1 = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, this.top, axisWidth) - axisWidth / 2;
      y2 = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V)(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
      x1 = x2 = borderValue;
    }
    ctx.save();
    ctx.lineWidth = borderOpts.borderWidth;
    ctx.strokeStyle = borderOpts.borderColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }
  drawLabels(chartArea) {
    const optionTicks = this.options.ticks;
    if (!optionTicks.display) {
      return;
    }
    const ctx = this.ctx;
    const area = this._computeLabelArea();
    if (area) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.W)(ctx, area);
    }
    const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
    let i, ilen;
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      const item = items[i];
      const tickFont = item.font;
      const label = item.label;
      if (item.backdrop) {
        ctx.fillStyle = item.backdrop.color;
        ctx.fillRect(item.backdrop.left, item.backdrop.top, item.backdrop.width, item.backdrop.height);
      }
      let y = item.textOffset;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, label, 0, y, tickFont, item);
    }
    if (area) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx);
    }
  }
  drawTitle() {
    const {ctx, options: {position, title, reverse}} = this;
    if (!title.display) {
      return;
    }
    const font = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(title.font);
    const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(title.padding);
    const align = title.align;
    let offset = font.lineHeight / 2;
    if (position === 'bottom' || position === 'center' || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(position)) {
      offset += padding.bottom;
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(title.text)) {
        offset += font.lineHeight * (title.text.length - 1);
      }
    } else {
      offset += padding.top;
    }
    const {titleX, titleY, maxWidth, rotation} = titleArgs(this, offset, position, align);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, title.text, 0, 0, font, {
      color: title.color,
      maxWidth,
      rotation,
      textAlign: titleAlign(align, position, reverse),
      textBaseline: 'middle',
      translation: [titleX, titleY],
    });
  }
  draw(chartArea) {
    if (!this._isVisible()) {
      return;
    }
    this.drawBackground();
    this.drawGrid(chartArea);
    this.drawBorder();
    this.drawTitle();
    this.drawLabels(chartArea);
  }
  _layers() {
    const opts = this.options;
    const tz = opts.ticks && opts.ticks.z || 0;
    const gz = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(opts.grid && opts.grid.z, -1);
    if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
      return [{
        z: tz,
        draw: (chartArea) => {
          this.draw(chartArea);
        }
      }];
    }
    return [{
      z: gz,
      draw: (chartArea) => {
        this.drawBackground();
        this.drawGrid(chartArea);
        this.drawTitle();
      }
    }, {
      z: gz + 1,
      draw: () => {
        this.drawBorder();
      }
    }, {
      z: tz,
      draw: (chartArea) => {
        this.drawLabels(chartArea);
      }
    }];
  }
  getMatchingVisibleMetas(type) {
    const metas = this.chart.getSortedVisibleDatasetMetas();
    const axisID = this.axis + 'AxisID';
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      const meta = metas[i];
      if (meta[axisID] === this.id && (!type || meta.type === type)) {
        result.push(meta);
      }
    }
    return result;
  }
  _resolveTickFontOptions(index) {
    const opts = this.options.ticks.setContext(this.getContext(index));
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(opts.font);
  }
  _maxDigits() {
    const fontSize = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / fontSize;
  }
}

class TypedRegistry {
  constructor(type, scope, override) {
    this.type = type;
    this.scope = scope;
    this.override = override;
    this.items = Object.create(null);
  }
  isForType(type) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
  }
  register(item) {
    const proto = Object.getPrototypeOf(item);
    let parentScope;
    if (isIChartComponent(proto)) {
      parentScope = this.register(proto);
    }
    const items = this.items;
    const id = item.id;
    const scope = this.scope + '.' + id;
    if (!id) {
      throw new Error('class does not have id: ' + item);
    }
    if (id in items) {
      return scope;
    }
    items[id] = item;
    registerDefaults(item, scope, parentScope);
    if (this.override) {
      _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.override(item.id, item.overrides);
    }
    return scope;
  }
  get(id) {
    return this.items[id];
  }
  unregister(item) {
    const items = this.items;
    const id = item.id;
    const scope = this.scope;
    if (id in items) {
      delete items[id];
    }
    if (scope && id in _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d[scope]) {
      delete _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d[scope][id];
      if (this.override) {
        delete _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1[id];
      }
    }
  }
}
function registerDefaults(item, scope, parentScope) {
  const itemDefaults = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a2)(Object.create(null), [
    parentScope ? _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.get(parentScope) : {},
    _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.get(scope),
    item.defaults
  ]);
  _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.set(scope, itemDefaults);
  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }
  if (item.descriptors) {
    _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.describe(scope, item.descriptors);
  }
}
function routeDefaults(scope, routes) {
  Object.keys(routes).forEach(property => {
    const propertyParts = property.split('.');
    const sourceName = propertyParts.pop();
    const sourceScope = [scope].concat(propertyParts).join('.');
    const parts = routes[property].split('.');
    const targetName = parts.pop();
    const targetScope = parts.join('.');
    _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.route(sourceScope, sourceName, targetScope, targetName);
  });
}
function isIChartComponent(proto) {
  return 'id' in proto && 'defaults' in proto;
}

class Registry {
  constructor() {
    this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
    this.elements = new TypedRegistry(Element, 'elements');
    this.plugins = new TypedRegistry(Object, 'plugins');
    this.scales = new TypedRegistry(Scale, 'scales');
    this._typedRegistries = [this.controllers, this.scales, this.elements];
  }
  add(...args) {
    this._each('register', args);
  }
  remove(...args) {
    this._each('unregister', args);
  }
  addControllers(...args) {
    this._each('register', args, this.controllers);
  }
  addElements(...args) {
    this._each('register', args, this.elements);
  }
  addPlugins(...args) {
    this._each('register', args, this.plugins);
  }
  addScales(...args) {
    this._each('register', args, this.scales);
  }
  getController(id) {
    return this._get(id, this.controllers, 'controller');
  }
  getElement(id) {
    return this._get(id, this.elements, 'element');
  }
  getPlugin(id) {
    return this._get(id, this.plugins, 'plugin');
  }
  getScale(id) {
    return this._get(id, this.scales, 'scale');
  }
  removeControllers(...args) {
    this._each('unregister', args, this.controllers);
  }
  removeElements(...args) {
    this._each('unregister', args, this.elements);
  }
  removePlugins(...args) {
    this._each('unregister', args, this.plugins);
  }
  removeScales(...args) {
    this._each('unregister', args, this.scales);
  }
  _each(method, args, typedRegistry) {
    [...args].forEach(arg => {
      const reg = typedRegistry || this._getRegistryForType(arg);
      if (typedRegistry || reg.isForType(arg) || (reg === this.plugins && arg.id)) {
        this._exec(method, reg, arg);
      } else {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(arg, item => {
          const itemReg = typedRegistry || this._getRegistryForType(item);
          this._exec(method, itemReg, item);
        });
      }
    });
  }
  _exec(method, registry, component) {
    const camelMethod = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a3)(method);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(component['before' + camelMethod], [], component);
    registry[method](component);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(component['after' + camelMethod], [], component);
  }
  _getRegistryForType(type) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const reg = this._typedRegistries[i];
      if (reg.isForType(type)) {
        return reg;
      }
    }
    return this.plugins;
  }
  _get(id, typedRegistry, type) {
    const item = typedRegistry.get(id);
    if (item === undefined) {
      throw new Error('"' + id + '" is not a registered ' + type + '.');
    }
    return item;
  }
}
var registry = new Registry();

class PluginService {
  constructor() {
    this._init = [];
  }
  notify(chart, hook, args, filter) {
    if (hook === 'beforeInit') {
      this._init = this._createDescriptors(chart, true);
      this._notify(this._init, chart, 'install');
    }
    const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
    const result = this._notify(descriptors, chart, hook, args);
    if (hook === 'afterDestroy') {
      this._notify(descriptors, chart, 'stop');
      this._notify(this._init, chart, 'uninstall');
    }
    return result;
  }
  _notify(descriptors, chart, hook, args) {
    args = args || {};
    for (const descriptor of descriptors) {
      const plugin = descriptor.plugin;
      const method = plugin[hook];
      const params = [chart, args, descriptor.options];
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(method, params, plugin) === false && args.cancelable) {
        return false;
      }
    }
    return true;
  }
  invalidate() {
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(this._cache)) {
      this._oldCache = this._cache;
      this._cache = undefined;
    }
  }
  _descriptors(chart) {
    if (this._cache) {
      return this._cache;
    }
    const descriptors = this._cache = this._createDescriptors(chart);
    this._notifyStateChanges(chart);
    return descriptors;
  }
  _createDescriptors(chart, all) {
    const config = chart && chart.config;
    const options = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(config.options && config.options.plugins, {});
    const plugins = allPlugins(config);
    return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
  }
  _notifyStateChanges(chart) {
    const previousDescriptors = this._oldCache || [];
    const descriptors = this._cache;
    const diff = (a, b) => a.filter(x => !b.some(y => x.plugin.id === y.plugin.id));
    this._notify(diff(previousDescriptors, descriptors), chart, 'stop');
    this._notify(diff(descriptors, previousDescriptors), chart, 'start');
  }
}
function allPlugins(config) {
  const plugins = [];
  const keys = Object.keys(registry.plugins.items);
  for (let i = 0; i < keys.length; i++) {
    plugins.push(registry.getPlugin(keys[i]));
  }
  const local = config.plugins || [];
  for (let i = 0; i < local.length; i++) {
    const plugin = local[i];
    if (plugins.indexOf(plugin) === -1) {
      plugins.push(plugin);
    }
  }
  return plugins;
}
function getOpts(options, all) {
  if (!all && options === false) {
    return null;
  }
  if (options === true) {
    return {};
  }
  return options;
}
function createDescriptors(chart, plugins, options, all) {
  const result = [];
  const context = chart.getContext();
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    const id = plugin.id;
    const opts = getOpts(options[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart.config, plugin, opts, context)
    });
  }
  return result;
}
function pluginOpts(config, plugin, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  return config.createResolver(scopes, context, [''], {scriptable: false, indexable: false, allKeys: true});
}

function getIndexAxis(type, options) {
  const datasetDefaults = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type] || {};
  const datasetOptions = (options.datasets || {})[type] || {};
  return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || 'x';
}
function getAxisFromDefaultScaleID(id, indexAxis) {
  let axis = id;
  if (id === '_index_') {
    axis = indexAxis;
  } else if (id === '_value_') {
    axis = indexAxis === 'x' ? 'y' : 'x';
  }
  return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
  return axis === indexAxis ? '_index_' : '_value_';
}
function axisFromPosition(position) {
  if (position === 'top' || position === 'bottom') {
    return 'x';
  }
  if (position === 'left' || position === 'right') {
    return 'y';
  }
}
function determineAxis(id, scaleOptions) {
  if (id === 'x' || id === 'y') {
    return id;
  }
  return scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.charAt(0).toLowerCase();
}
function mergeScaleConfig(config, options) {
  const chartDefaults = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1[config.type] || {scales: {}};
  const configScales = options.scales || {};
  const chartIndexAxis = getIndexAxis(config.type, options);
  const firstIDs = Object.create(null);
  const scales = Object.create(null);
  Object.keys(configScales).forEach(id => {
    const scaleConf = configScales[id];
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(scaleConf)) {
      return console.error(`Invalid scale configuration for scale: ${id}`);
    }
    if (scaleConf._proxy) {
      return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
    }
    const axis = determineAxis(id, scaleConf);
    const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
    const defaultScaleOptions = chartDefaults.scales || {};
    firstIDs[axis] = firstIDs[axis] || id;
    scales[id] = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a9)(Object.create(null), [{axis}, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId]]);
  });
  config.data.datasets.forEach(dataset => {
    const type = dataset.type || config.type;
    const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
    const datasetDefaults = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1[type] || {};
    const defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach(defaultID => {
      const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
      const id = dataset[axis + 'AxisID'] || firstIDs[axis] || axis;
      scales[id] = scales[id] || Object.create(null);
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a9)(scales[id], [{axis}, configScales[id], defaultScaleOptions[defaultID]]);
    });
  });
  Object.keys(scales).forEach(key => {
    const scale = scales[key];
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a9)(scale, [_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.scales[scale.type], _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.scale]);
  });
  return scales;
}
function initOptions(config) {
  const options = config.options || (config.options = {});
  options.plugins = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(options.plugins, {});
  options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
  data = data || {};
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  return data;
}
function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);
  initOptions(config);
  return config;
}
const keyCache = new Map();
const keysCached = new Set();
function cachedKeys(cacheKey, generate) {
  let keys = keyCache.get(cacheKey);
  if (!keys) {
    keys = generate();
    keyCache.set(cacheKey, keys);
    keysCached.add(keys);
  }
  return keys;
}
const addIfFound = (set, obj, key) => {
  const opts = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f)(obj, key);
  if (opts !== undefined) {
    set.add(opts);
  }
};
class Config {
  constructor(config) {
    this._config = initConfig(config);
    this._scopeCache = new Map();
    this._resolverCache = new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(type) {
    this._config.type = type;
  }
  get data() {
    return this._config.data;
  }
  set data(data) {
    this._config.data = initData(data);
  }
  get options() {
    return this._config.options;
  }
  set options(options) {
    this._config.options = options;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const config = this._config;
    this.clearCache();
    initOptions(config);
  }
  clearCache() {
    this._scopeCache.clear();
    this._resolverCache.clear();
  }
  datasetScopeKeys(datasetType) {
    return cachedKeys(datasetType,
      () => [[
        `datasets.${datasetType}`,
        ''
      ]]);
  }
  datasetAnimationScopeKeys(datasetType, transition) {
    return cachedKeys(`${datasetType}.transition.${transition}`,
      () => [
        [
          `datasets.${datasetType}.transitions.${transition}`,
          `transitions.${transition}`,
        ],
        [
          `datasets.${datasetType}`,
          ''
        ]
      ]);
  }
  datasetElementScopeKeys(datasetType, elementType) {
    return cachedKeys(`${datasetType}-${elementType}`,
      () => [[
        `datasets.${datasetType}.elements.${elementType}`,
        `datasets.${datasetType}`,
        `elements.${elementType}`,
        ''
      ]]);
  }
  pluginScopeKeys(plugin) {
    const id = plugin.id;
    const type = this.type;
    return cachedKeys(`${type}-plugin-${id}`,
      () => [[
        `plugins.${id}`,
        ...plugin.additionalOptionScopes || [],
      ]]);
  }
  _cachedScopes(mainScope, resetCache) {
    const _scopeCache = this._scopeCache;
    let cache = _scopeCache.get(mainScope);
    if (!cache || resetCache) {
      cache = new Map();
      _scopeCache.set(mainScope, cache);
    }
    return cache;
  }
  getOptionScopes(mainScope, keyLists, resetCache) {
    const {options, type} = this;
    const cache = this._cachedScopes(mainScope, resetCache);
    const cached = cache.get(keyLists);
    if (cached) {
      return cached;
    }
    const scopes = new Set();
    keyLists.forEach(keys => {
      if (mainScope) {
        scopes.add(mainScope);
        keys.forEach(key => addIfFound(scopes, mainScope, key));
      }
      keys.forEach(key => addIfFound(scopes, options, key));
      keys.forEach(key => addIfFound(scopes, _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1[type] || {}, key));
      keys.forEach(key => addIfFound(scopes, _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d, key));
      keys.forEach(key => addIfFound(scopes, _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a4, key));
    });
    const array = Array.from(scopes);
    if (array.length === 0) {
      array.push(Object.create(null));
    }
    if (keysCached.has(keyLists)) {
      cache.set(keyLists, array);
    }
    return array;
  }
  chartOptionScopes() {
    const {options, type} = this;
    return [
      options,
      _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1[type] || {},
      _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type] || {},
      {type},
      _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d,
      _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a4
    ];
  }
  resolveNamedOptions(scopes, names, context, prefixes = ['']) {
    const result = {$shared: true};
    const {resolver, subPrefixes} = getResolver(this._resolverCache, scopes, prefixes);
    let options = resolver;
    if (needContext(resolver, names)) {
      result.$shared = false;
      context = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a5)(context) ? context() : context;
      const subResolver = this.createResolver(scopes, context, subPrefixes);
      options = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a6)(resolver, context, subResolver);
    }
    for (const prop of names) {
      result[prop] = options[prop];
    }
    return result;
  }
  createResolver(scopes, context, prefixes = [''], descriptorDefaults) {
    const {resolver} = getResolver(this._resolverCache, scopes, prefixes);
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(context)
      ? (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a6)(resolver, context, undefined, descriptorDefaults)
      : resolver;
  }
}
function getResolver(resolverCache, scopes, prefixes) {
  let cache = resolverCache.get(scopes);
  if (!cache) {
    cache = new Map();
    resolverCache.set(scopes, cache);
  }
  const cacheKey = prefixes.join();
  let cached = cache.get(cacheKey);
  if (!cached) {
    const resolver = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a7)(scopes, prefixes);
    cached = {
      resolver,
      subPrefixes: prefixes.filter(p => !p.toLowerCase().includes('hover'))
    };
    cache.set(cacheKey, cached);
  }
  return cached;
}
const hasFunction = value => (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(value)
  && Object.getOwnPropertyNames(value).reduce((acc, key) => acc || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a5)(value[key]), false);
function needContext(proxy, names) {
  const {isScriptable, isIndexable} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a8)(proxy);
  for (const prop of names) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if ((scriptable && ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a5)(value) || hasFunction(value)))
      || (indexable && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(value))) {
      return true;
    }
  }
  return false;
}

var version = "3.7.1";

const KNOWN_POSITIONS = ['top', 'bottom', 'left', 'right', 'chartArea'];
function positionIsHorizontal(position, axis) {
  return position === 'top' || position === 'bottom' || (KNOWN_POSITIONS.indexOf(position) === -1 && axis === 'x');
}
function compare2Level(l1, l2) {
  return function(a, b) {
    return a[l1] === b[l1]
      ? a[l2] - b[l2]
      : a[l1] - b[l1];
  };
}
function onAnimationsComplete(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  chart.notifyPlugins('afterRender');
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(animationOptions && animationOptions.onComplete, [context], chart);
}
function onAnimationProgress(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(animationOptions && animationOptions.onProgress, [context], chart);
}
function getCanvas(item) {
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.K)() && typeof item === 'string') {
    item = document.getElementById(item);
  } else if (item && item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
const instances = {};
const getChart = (key) => {
  const canvas = getCanvas(key);
  return Object.values(instances).filter((c) => c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const intKey = +key;
    if (intKey >= start) {
      const value = obj[key];
      delete obj[key];
      if (move > 0 || intKey > start) {
        obj[intKey + move] = value;
      }
    }
  }
}
function determineLastEvent(e, lastEvent, inChartArea, isClick) {
  if (!inChartArea || e.type === 'mouseout') {
    return null;
  }
  if (isClick) {
    return lastEvent;
  }
  return e;
}
class Chart {
  constructor(item, userConfig) {
    const config = this.config = new Config(userConfig);
    const initialCanvas = getCanvas(item);
    const existingChart = getChart(initialCanvas);
    if (existingChart) {
      throw new Error(
        'Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' +
				' must be destroyed before the canvas can be reused.'
      );
    }
    const options = config.createResolver(config.chartOptionScopes(), this.getContext());
    this.platform = new (config.platform || _detectPlatform(initialCanvas))();
    this.platform.updateConfig(config);
    const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
    const canvas = context && context.canvas;
    const height = canvas && canvas.height;
    const width = canvas && canvas.width;
    this.id = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aa)();
    this.ctx = context;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this._options = options;
    this._aspectRatio = this.aspectRatio;
    this._layers = [];
    this._metasets = [];
    this._stacks = undefined;
    this.boxes = [];
    this.currentDevicePixelRatio = undefined;
    this.chartArea = undefined;
    this._active = [];
    this._lastEvent = undefined;
    this._listeners = {};
    this._responsiveListeners = undefined;
    this._sortedMetasets = [];
    this.scales = {};
    this._plugins = new PluginService();
    this.$proxies = {};
    this._hiddenIndices = {};
    this.attached = false;
    this._animationsDisabled = undefined;
    this.$context = undefined;
    this._doResize = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ab)(mode => this.update(mode), options.resizeDelay || 0);
    this._dataChanges = [];
    instances[this.id] = this;
    if (!context || !canvas) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    animator.listen(this, 'complete', onAnimationsComplete);
    animator.listen(this, 'progress', onAnimationProgress);
    this._initialize();
    if (this.attached) {
      this.update();
    }
  }
  get aspectRatio() {
    const {options: {aspectRatio, maintainAspectRatio}, width, height, _aspectRatio} = this;
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(aspectRatio)) {
      return aspectRatio;
    }
    if (maintainAspectRatio && _aspectRatio) {
      return _aspectRatio;
    }
    return height ? width / height : null;
  }
  get data() {
    return this.config.data;
  }
  set data(data) {
    this.config.data = data;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    this.config.options = options;
  }
  _initialize() {
    this.notifyPlugins('beforeInit');
    if (this.options.responsive) {
      this.resize();
    } else {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ac)(this, this.options.devicePixelRatio);
    }
    this.bindEvents();
    this.notifyPlugins('afterInit');
    return this;
  }
  clear() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ad)(this.canvas, this.ctx);
    return this;
  }
  stop() {
    animator.stop(this);
    return this;
  }
  resize(width, height) {
    if (!animator.running(this)) {
      this._resize(width, height);
    } else {
      this._resizeBeforeDraw = {width, height};
    }
  }
  _resize(width, height) {
    const options = this.options;
    const canvas = this.canvas;
    const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
    const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
    const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
    const mode = this.width ? 'resize' : 'attach';
    this.width = newSize.width;
    this.height = newSize.height;
    this._aspectRatio = this.aspectRatio;
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ac)(this, newRatio, true)) {
      return;
    }
    this.notifyPlugins('resize', {size: newSize});
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(options.onResize, [this, newSize], this);
    if (this.attached) {
      if (this._doResize(mode)) {
        this.render();
      }
    }
  }
  ensureScalesHaveIDs() {
    const options = this.options;
    const scalesOptions = options.scales || {};
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(scalesOptions, (axisOptions, axisID) => {
      axisOptions.id = axisID;
    });
  }
  buildOrUpdateScales() {
    const options = this.options;
    const scaleOpts = options.scales;
    const scales = this.scales;
    const updated = Object.keys(scales).reduce((obj, id) => {
      obj[id] = false;
      return obj;
    }, {});
    let items = [];
    if (scaleOpts) {
      items = items.concat(
        Object.keys(scaleOpts).map((id) => {
          const scaleOptions = scaleOpts[id];
          const axis = determineAxis(id, scaleOptions);
          const isRadial = axis === 'r';
          const isHorizontal = axis === 'x';
          return {
            options: scaleOptions,
            dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
            dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
          };
        })
      );
    }
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(items, (item) => {
      const scaleOptions = item.options;
      const id = scaleOptions.id;
      const axis = determineAxis(id, scaleOptions);
      const scaleType = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(scaleOptions.type, item.dtype);
      if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
        scaleOptions.position = item.dposition;
      }
      updated[id] = true;
      let scale = null;
      if (id in scales && scales[id].type === scaleType) {
        scale = scales[id];
      } else {
        const scaleClass = registry.getScale(scaleType);
        scale = new scaleClass({
          id,
          type: scaleType,
          ctx: this.ctx,
          chart: this
        });
        scales[scale.id] = scale;
      }
      scale.init(scaleOptions, options);
    });
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(updated, (hasUpdated, id) => {
      if (!hasUpdated) {
        delete scales[id];
      }
    });
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(scales, (scale) => {
      layouts.configure(this, scale, scale.options);
      layouts.addBox(this, scale);
    });
  }
  _updateMetasets() {
    const metasets = this._metasets;
    const numData = this.data.datasets.length;
    const numMeta = metasets.length;
    metasets.sort((a, b) => a.index - b.index);
    if (numMeta > numData) {
      for (let i = numData; i < numMeta; ++i) {
        this._destroyDatasetMeta(i);
      }
      metasets.splice(numData, numMeta - numData);
    }
    this._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
  }
  _removeUnreferencedMetasets() {
    const {_metasets: metasets, data: {datasets}} = this;
    if (metasets.length > datasets.length) {
      delete this._stacks;
    }
    metasets.forEach((meta, index) => {
      if (datasets.filter(x => x === meta._dataset).length === 0) {
        this._destroyDatasetMeta(index);
      }
    });
  }
  buildOrUpdateControllers() {
    const newControllers = [];
    const datasets = this.data.datasets;
    let i, ilen;
    this._removeUnreferencedMetasets();
    for (i = 0, ilen = datasets.length; i < ilen; i++) {
      const dataset = datasets[i];
      let meta = this.getDatasetMeta(i);
      const type = dataset.type || this.config.type;
      if (meta.type && meta.type !== type) {
        this._destroyDatasetMeta(i);
        meta = this.getDatasetMeta(i);
      }
      meta.type = type;
      meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
      meta.order = dataset.order || 0;
      meta.index = i;
      meta.label = '' + dataset.label;
      meta.visible = this.isDatasetVisible(i);
      if (meta.controller) {
        meta.controller.updateIndex(i);
        meta.controller.linkScales();
      } else {
        const ControllerClass = registry.getController(type);
        const {datasetElementType, dataElementType} = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.datasets[type];
        Object.assign(ControllerClass.prototype, {
          dataElementType: registry.getElement(dataElementType),
          datasetElementType: datasetElementType && registry.getElement(datasetElementType)
        });
        meta.controller = new ControllerClass(this, i);
        newControllers.push(meta.controller);
      }
    }
    this._updateMetasets();
    return newControllers;
  }
  _resetElements() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.data.datasets, (dataset, datasetIndex) => {
      this.getDatasetMeta(datasetIndex).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements();
    this.notifyPlugins('reset');
  }
  update(mode) {
    const config = this.config;
    config.update();
    const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
    const animsDisabled = this._animationsDisabled = !options.animation;
    this._updateScales();
    this._checkEventBindings();
    this._updateHiddenIndices();
    this._plugins.invalidate();
    if (this.notifyPlugins('beforeUpdate', {mode, cancelable: true}) === false) {
      return;
    }
    const newControllers = this.buildOrUpdateControllers();
    this.notifyPlugins('beforeElementsUpdate');
    let minPadding = 0;
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
      const {controller} = this.getDatasetMeta(i);
      const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
      controller.buildOrUpdateElements(reset);
      minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
    }
    minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
    this._updateLayout(minPadding);
    if (!animsDisabled) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(newControllers, (controller) => {
        controller.reset();
      });
    }
    this._updateDatasets(mode);
    this.notifyPlugins('afterUpdate', {mode});
    this._layers.sort(compare2Level('z', '_idx'));
    const {_active, _lastEvent} = this;
    if (_lastEvent) {
      this._eventHandler(_lastEvent, true);
    } else if (_active.length) {
      this._updateHoverStyles(_active, _active, true);
    }
    this.render();
  }
  _updateScales() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.scales, (scale) => {
      layouts.removeBox(this, scale);
    });
    this.ensureScalesHaveIDs();
    this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const options = this.options;
    const existingEvents = new Set(Object.keys(this._listeners));
    const newEvents = new Set(options.events);
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ae)(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
      this.unbindEvents();
      this.bindEvents();
    }
  }
  _updateHiddenIndices() {
    const {_hiddenIndices} = this;
    const changes = this._getUniformDataChanges() || [];
    for (const {method, start, count} of changes) {
      const move = method === '_removeElements' ? -count : count;
      moveNumericKeys(_hiddenIndices, start, move);
    }
  }
  _getUniformDataChanges() {
    const _dataChanges = this._dataChanges;
    if (!_dataChanges || !_dataChanges.length) {
      return;
    }
    this._dataChanges = [];
    const datasetCount = this.data.datasets.length;
    const makeSet = (idx) => new Set(
      _dataChanges
        .filter(c => c[0] === idx)
        .map((c, i) => i + ',' + c.splice(1).join(','))
    );
    const changeSet = makeSet(0);
    for (let i = 1; i < datasetCount; i++) {
      if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ae)(changeSet, makeSet(i))) {
        return;
      }
    }
    return Array.from(changeSet)
      .map(c => c.split(','))
      .map(a => ({method: a[1], start: +a[2], count: +a[3]}));
  }
  _updateLayout(minPadding) {
    if (this.notifyPlugins('beforeLayout', {cancelable: true}) === false) {
      return;
    }
    layouts.update(this, this.width, this.height, minPadding);
    const area = this.chartArea;
    const noArea = area.width <= 0 || area.height <= 0;
    this._layers = [];
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.boxes, (box) => {
      if (noArea && box.position === 'chartArea') {
        return;
      }
      if (box.configure) {
        box.configure();
      }
      this._layers.push(...box._layers());
    }, this);
    this._layers.forEach((item, index) => {
      item._idx = index;
    });
    this.notifyPlugins('afterLayout');
  }
  _updateDatasets(mode) {
    if (this.notifyPlugins('beforeDatasetsUpdate', {mode, cancelable: true}) === false) {
      return;
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this.getDatasetMeta(i).controller.configure();
    }
    for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._updateDataset(i, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a5)(mode) ? mode({datasetIndex: i}) : mode);
    }
    this.notifyPlugins('afterDatasetsUpdate', {mode});
  }
  _updateDataset(index, mode) {
    const meta = this.getDatasetMeta(index);
    const args = {meta, index, mode, cancelable: true};
    if (this.notifyPlugins('beforeDatasetUpdate', args) === false) {
      return;
    }
    meta.controller._update(mode);
    args.cancelable = false;
    this.notifyPlugins('afterDatasetUpdate', args);
  }
  render() {
    if (this.notifyPlugins('beforeRender', {cancelable: true}) === false) {
      return;
    }
    if (animator.has(this)) {
      if (this.attached && !animator.running(this)) {
        animator.start(this);
      }
    } else {
      this.draw();
      onAnimationsComplete({chart: this});
    }
  }
  draw() {
    let i;
    if (this._resizeBeforeDraw) {
      const {width, height} = this._resizeBeforeDraw;
      this._resize(width, height);
      this._resizeBeforeDraw = null;
    }
    this.clear();
    if (this.width <= 0 || this.height <= 0) {
      return;
    }
    if (this.notifyPlugins('beforeDraw', {cancelable: true}) === false) {
      return;
    }
    const layers = this._layers;
    for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
      layers[i].draw(this.chartArea);
    }
    this._drawDatasets();
    for (; i < layers.length; ++i) {
      layers[i].draw(this.chartArea);
    }
    this.notifyPlugins('afterDraw');
  }
  _getSortedDatasetMetas(filterVisible) {
    const metasets = this._sortedMetasets;
    const result = [];
    let i, ilen;
    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      const meta = metasets[i];
      if (!filterVisible || meta.visible) {
        result.push(meta);
      }
    }
    return result;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(true);
  }
  _drawDatasets() {
    if (this.notifyPlugins('beforeDatasetsDraw', {cancelable: true}) === false) {
      return;
    }
    const metasets = this.getSortedVisibleDatasetMetas();
    for (let i = metasets.length - 1; i >= 0; --i) {
      this._drawDataset(metasets[i]);
    }
    this.notifyPlugins('afterDatasetsDraw');
  }
  _drawDataset(meta) {
    const ctx = this.ctx;
    const clip = meta._clip;
    const useClip = !clip.disabled;
    const area = this.chartArea;
    const args = {
      meta,
      index: meta.index,
      cancelable: true
    };
    if (this.notifyPlugins('beforeDatasetDraw', args) === false) {
      return;
    }
    if (useClip) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.W)(ctx, {
        left: clip.left === false ? 0 : area.left - clip.left,
        right: clip.right === false ? this.width : area.right + clip.right,
        top: clip.top === false ? 0 : area.top - clip.top,
        bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
      });
    }
    meta.controller.draw();
    if (useClip) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx);
    }
    args.cancelable = false;
    this.notifyPlugins('afterDatasetDraw', args);
  }
  getElementsAtEventForMode(e, mode, options, useFinalPosition) {
    const method = Interaction.modes[mode];
    if (typeof method === 'function') {
      return method(this, e, options, useFinalPosition);
    }
    return [];
  }
  getDatasetMeta(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    const metasets = this._metasets;
    let meta = metasets.filter(x => x && x._dataset === dataset).pop();
    if (!meta) {
      meta = {
        type: null,
        data: [],
        dataset: null,
        controller: null,
        hidden: null,
        xAxisID: null,
        yAxisID: null,
        order: dataset && dataset.order || 0,
        index: datasetIndex,
        _dataset: dataset,
        _parsed: [],
        _sorted: false
      };
      metasets.push(meta);
    }
    return meta;
  }
  getContext() {
    return this.$context || (this.$context = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(null, {chart: this, type: 'chart'}));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    if (!dataset) {
      return false;
    }
    const meta = this.getDatasetMeta(datasetIndex);
    return typeof meta.hidden === 'boolean' ? !meta.hidden : !dataset.hidden;
  }
  setDatasetVisibility(datasetIndex, visible) {
    const meta = this.getDatasetMeta(datasetIndex);
    meta.hidden = !visible;
  }
  toggleDataVisibility(index) {
    this._hiddenIndices[index] = !this._hiddenIndices[index];
  }
  getDataVisibility(index) {
    return !this._hiddenIndices[index];
  }
  _updateVisibility(datasetIndex, dataIndex, visible) {
    const mode = visible ? 'show' : 'hide';
    const meta = this.getDatasetMeta(datasetIndex);
    const anims = meta.controller._resolveAnimations(undefined, mode);
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j)(dataIndex)) {
      meta.data[dataIndex].hidden = !visible;
      this.update();
    } else {
      this.setDatasetVisibility(datasetIndex, visible);
      anims.update(meta, {visible});
      this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : undefined);
    }
  }
  hide(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, false);
  }
  show(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, true);
  }
  _destroyDatasetMeta(datasetIndex) {
    const meta = this._metasets[datasetIndex];
    if (meta && meta.controller) {
      meta.controller._destroy();
    }
    delete this._metasets[datasetIndex];
  }
  _stop() {
    let i, ilen;
    this.stop();
    animator.remove(this);
    for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
      this._destroyDatasetMeta(i);
    }
  }
  destroy() {
    this.notifyPlugins('beforeDestroy');
    const {canvas, ctx} = this;
    this._stop();
    this.config.clearCache();
    if (canvas) {
      this.unbindEvents();
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ad)(canvas, ctx);
      this.platform.releaseContext(ctx);
      this.canvas = null;
      this.ctx = null;
    }
    this.notifyPlugins('destroy');
    delete instances[this.id];
    this.notifyPlugins('afterDestroy');
  }
  toBase64Image(...args) {
    return this.canvas.toDataURL(...args);
  }
  bindEvents() {
    this.bindUserEvents();
    if (this.options.responsive) {
      this.bindResponsiveEvents();
    } else {
      this.attached = true;
    }
  }
  bindUserEvents() {
    const listeners = this._listeners;
    const platform = this.platform;
    const _add = (type, listener) => {
      platform.addEventListener(this, type, listener);
      listeners[type] = listener;
    };
    const listener = (e, x, y) => {
      e.offsetX = x;
      e.offsetY = y;
      this._eventHandler(e);
    };
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.options.events, (type) => _add(type, listener));
  }
  bindResponsiveEvents() {
    if (!this._responsiveListeners) {
      this._responsiveListeners = {};
    }
    const listeners = this._responsiveListeners;
    const platform = this.platform;
    const _add = (type, listener) => {
      platform.addEventListener(this, type, listener);
      listeners[type] = listener;
    };
    const _remove = (type, listener) => {
      if (listeners[type]) {
        platform.removeEventListener(this, type, listener);
        delete listeners[type];
      }
    };
    const listener = (width, height) => {
      if (this.canvas) {
        this.resize(width, height);
      }
    };
    let detached;
    const attached = () => {
      _remove('attach', attached);
      this.attached = true;
      this.resize();
      _add('resize', listener);
      _add('detach', detached);
    };
    detached = () => {
      this.attached = false;
      _remove('resize', listener);
      this._stop();
      this._resize(0, 0);
      _add('attach', attached);
    };
    if (platform.isAttached(this.canvas)) {
      attached();
    } else {
      detached();
    }
  }
  unbindEvents() {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this._listeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._listeners = {};
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this._responsiveListeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._responsiveListeners = undefined;
  }
  updateHoverStyle(items, mode, enabled) {
    const prefix = enabled ? 'set' : 'remove';
    let meta, item, i, ilen;
    if (mode === 'dataset') {
      meta = this.getDatasetMeta(items[0].datasetIndex);
      meta.controller['_' + prefix + 'DatasetHoverStyle']();
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      item = items[i];
      const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
      if (controller) {
        controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
      }
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements) {
    const lastActive = this._active || [];
    const active = activeElements.map(({datasetIndex, index}) => {
      const meta = this.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error('No dataset found at index ' + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index],
        index,
      };
    });
    const changed = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.af)(active, lastActive);
    if (changed) {
      this._active = active;
      this._lastEvent = null;
      this._updateHoverStyles(active, lastActive);
    }
  }
  notifyPlugins(hook, args, filter) {
    return this._plugins.notify(this, hook, args, filter);
  }
  _updateHoverStyles(active, lastActive, replay) {
    const hoverOptions = this.options.hover;
    const diff = (a, b) => a.filter(x => !b.some(y => x.datasetIndex === y.datasetIndex && x.index === y.index));
    const deactivated = diff(lastActive, active);
    const activated = replay ? active : diff(active, lastActive);
    if (deactivated.length) {
      this.updateHoverStyle(deactivated, hoverOptions.mode, false);
    }
    if (activated.length && hoverOptions.mode) {
      this.updateHoverStyle(activated, hoverOptions.mode, true);
    }
  }
  _eventHandler(e, replay) {
    const args = {
      event: e,
      replay,
      cancelable: true,
      inChartArea: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z)(e, this.chartArea, this._minPadding)
    };
    const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins('beforeEvent', args, eventFilter) === false) {
      return;
    }
    const changed = this._handleEvent(e, replay, args.inChartArea);
    args.cancelable = false;
    this.notifyPlugins('afterEvent', args, eventFilter);
    if (changed || args.changed) {
      this.render();
    }
    return this;
  }
  _handleEvent(e, replay, inChartArea) {
    const {_active: lastActive = [], options} = this;
    const useFinalPosition = replay;
    const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
    const isClick = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ag)(e);
    const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
    if (inChartArea) {
      this._lastEvent = null;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(options.onHover, [e, active, this], this);
      if (isClick) {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(options.onClick, [e, active, this], this);
      }
    }
    const changed = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.af)(active, lastActive);
    if (changed || replay) {
      this._active = active;
      this._updateHoverStyles(active, lastActive, replay);
    }
    this._lastEvent = lastEvent;
    return changed;
  }
  _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
    if (e.type === 'mouseout') {
      return [];
    }
    if (!inChartArea) {
      return lastActive;
    }
    const hoverOptions = this.options.hover;
    return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
  }
}
const invalidatePlugins = () => (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(Chart.instances, (chart) => chart._plugins.invalidate());
const enumerable = true;
Object.defineProperties(Chart, {
  defaults: {
    enumerable,
    value: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d
  },
  instances: {
    enumerable,
    value: instances
  },
  overrides: {
    enumerable,
    value: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a1
  },
  registry: {
    enumerable,
    value: registry
  },
  version: {
    enumerable,
    value: version
  },
  getChart: {
    enumerable,
    value: getChart
  },
  register: {
    enumerable,
    value: (...items) => {
      registry.add(...items);
      invalidatePlugins();
    }
  },
  unregister: {
    enumerable,
    value: (...items) => {
      registry.remove(...items);
      invalidatePlugins();
    }
  }
});

function clipArc(ctx, element, endAngle) {
  const {startAngle, pixelMargin, x, y, outerRadius, innerRadius} = element;
  let angleMargin = pixelMargin / outerRadius;
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
  if (innerRadius > pixelMargin) {
    angleMargin = pixelMargin / innerRadius;
    ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
  } else {
    ctx.arc(x, y, pixelMargin, endAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H, startAngle - _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H);
  }
  ctx.closePath();
  ctx.clip();
}
function toRadiusCorners(value) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ai)(value, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd']);
}
function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
  const o = toRadiusCorners(arc.options.borderRadius);
  const halfThickness = (outerRadius - innerRadius) / 2;
  const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
  const computeOuterLimit = (val) => {
    const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(val, 0, Math.min(halfThickness, outerArcLimit));
  };
  return {
    outerStart: computeOuterLimit(o.outerStart),
    outerEnd: computeOuterLimit(o.outerEnd),
    innerStart: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(o.innerStart, 0, innerLimit),
    innerEnd: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(o.innerEnd, 0, innerLimit),
  };
}
function rThetaToXY(r, theta, x, y) {
  return {
    x: x + r * Math.cos(theta),
    y: y + r * Math.sin(theta),
  };
}
function pathArc(ctx, element, offset, spacing, end) {
  const {x, y, startAngle: start, pixelMargin, innerRadius: innerR} = element;
  const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
  const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
  let spacingOffset = 0;
  const alpha = end - start;
  if (spacing) {
    const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
    const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
    const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
    const adjustedAngle = avNogSpacingRadius !== 0 ? (alpha * avNogSpacingRadius) / (avNogSpacingRadius + spacing) : alpha;
    spacingOffset = (alpha - adjustedAngle) / 2;
  }
  const beta = Math.max(0.001, alpha * outerRadius - offset / _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P) / outerRadius;
  const angleOffset = (alpha - beta) / 2;
  const startAngle = start + angleOffset + spacingOffset;
  const endAngle = end - angleOffset - spacingOffset;
  const {outerStart, outerEnd, innerStart, innerEnd} = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
  const outerStartAdjustedRadius = outerRadius - outerStart;
  const outerEndAdjustedRadius = outerRadius - outerEnd;
  const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
  const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
  const innerStartAdjustedRadius = innerRadius + innerStart;
  const innerEndAdjustedRadius = innerRadius + innerEnd;
  const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
  const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerEndAdjustedAngle);
  if (outerEnd > 0) {
    const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
    ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H);
  }
  const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
  ctx.lineTo(p4.x, p4.y);
  if (innerEnd > 0) {
    const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
    ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H, innerEndAdjustedAngle + Math.PI);
  }
  ctx.arc(x, y, innerRadius, endAngle - (innerEnd / innerRadius), startAngle + (innerStart / innerRadius), true);
  if (innerStart > 0) {
    const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
    ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H);
  }
  const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
  ctx.lineTo(p8.x, p8.y);
  if (outerStart > 0) {
    const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
    ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H, outerStartAdjustedAngle);
  }
  ctx.closePath();
}
function drawArc(ctx, element, offset, spacing) {
  const {fullCircles, startAngle, circumference} = element;
  let endAngle = element.endAngle;
  if (fullCircles) {
    pathArc(ctx, element, offset, spacing, startAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T);
    for (let i = 0; i < fullCircles; ++i) {
      ctx.fill();
    }
    if (!isNaN(circumference)) {
      endAngle = startAngle + circumference % _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T;
      if (circumference % _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T === 0) {
        endAngle += _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T;
      }
    }
  }
  pathArc(ctx, element, offset, spacing, endAngle);
  ctx.fill();
  return endAngle;
}
function drawFullCircleBorders(ctx, element, inner) {
  const {x, y, startAngle, pixelMargin, fullCircles} = element;
  const outerRadius = Math.max(element.outerRadius - pixelMargin, 0);
  const innerRadius = element.innerRadius + pixelMargin;
  let i;
  if (inner) {
    clipArc(ctx, element, startAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T);
  }
  ctx.beginPath();
  ctx.arc(x, y, innerRadius, startAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T, startAngle, true);
  for (i = 0; i < fullCircles; ++i) {
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, startAngle, startAngle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T);
  for (i = 0; i < fullCircles; ++i) {
    ctx.stroke();
  }
}
function drawBorder(ctx, element, offset, spacing, endAngle) {
  const {options} = element;
  const {borderWidth, borderJoinStyle} = options;
  const inner = options.borderAlign === 'inner';
  if (!borderWidth) {
    return;
  }
  if (inner) {
    ctx.lineWidth = borderWidth * 2;
    ctx.lineJoin = borderJoinStyle || 'round';
  } else {
    ctx.lineWidth = borderWidth;
    ctx.lineJoin = borderJoinStyle || 'bevel';
  }
  if (element.fullCircles) {
    drawFullCircleBorders(ctx, element, inner);
  }
  if (inner) {
    clipArc(ctx, element, endAngle);
  }
  pathArc(ctx, element, offset, spacing, endAngle);
  ctx.stroke();
}
class ArcElement extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.circumference = undefined;
    this.startAngle = undefined;
    this.endAngle = undefined;
    this.innerRadius = undefined;
    this.outerRadius = undefined;
    this.pixelMargin = 0;
    this.fullCircles = 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  inRange(chartX, chartY, useFinalPosition) {
    const point = this.getProps(['x', 'y'], useFinalPosition);
    const {angle, distance} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.B)(point, {x: chartX, y: chartY});
    const {startAngle, endAngle, innerRadius, outerRadius, circumference} = this.getProps([
      'startAngle',
      'endAngle',
      'innerRadius',
      'outerRadius',
      'circumference'
    ], useFinalPosition);
    const rAdjust = this.options.spacing / 2;
    const _circumference = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(circumference, endAngle - startAngle);
    const betweenAngles = _circumference >= _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.p)(angle, startAngle, endAngle);
    const withinRadius = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(distance, innerRadius + rAdjust, outerRadius + rAdjust);
    return (betweenAngles && withinRadius);
  }
  getCenterPoint(useFinalPosition) {
    const {x, y, startAngle, endAngle, innerRadius, outerRadius} = this.getProps([
      'x',
      'y',
      'startAngle',
      'endAngle',
      'innerRadius',
      'outerRadius',
      'circumference',
    ], useFinalPosition);
    const {offset, spacing} = this.options;
    const halfAngle = (startAngle + endAngle) / 2;
    const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
    return {
      x: x + Math.cos(halfAngle) * halfRadius,
      y: y + Math.sin(halfAngle) * halfRadius
    };
  }
  tooltipPosition(useFinalPosition) {
    return this.getCenterPoint(useFinalPosition);
  }
  draw(ctx) {
    const {options, circumference} = this;
    const offset = (options.offset || 0) / 2;
    const spacing = (options.spacing || 0) / 2;
    this.pixelMargin = (options.borderAlign === 'inner') ? 0.33 : 0;
    this.fullCircles = circumference > _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T ? Math.floor(circumference / _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T) : 0;
    if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
      return;
    }
    ctx.save();
    let radiusOffset = 0;
    if (offset) {
      radiusOffset = offset / 2;
      const halfAngle = (this.startAngle + this.endAngle) / 2;
      ctx.translate(Math.cos(halfAngle) * radiusOffset, Math.sin(halfAngle) * radiusOffset);
      if (this.circumference >= _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P) {
        radiusOffset = offset;
      }
    }
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    const endAngle = drawArc(ctx, this, radiusOffset, spacing);
    drawBorder(ctx, this, radiusOffset, spacing, endAngle);
    ctx.restore();
  }
}
ArcElement.id = 'arc';
ArcElement.defaults = {
  borderAlign: 'center',
  borderColor: '#fff',
  borderJoinStyle: undefined,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: undefined,
};
ArcElement.defaultRoutes = {
  backgroundColor: 'backgroundColor'
};

function setStyle(ctx, options, style = options) {
  ctx.lineCap = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderCapStyle, options.borderCapStyle);
  ctx.setLineDash((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderDash, options.borderDash));
  ctx.lineDashOffset = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderDashOffset, options.borderDashOffset);
  ctx.lineJoin = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderJoinStyle, options.borderJoinStyle);
  ctx.lineWidth = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderWidth, options.borderWidth);
  ctx.strokeStyle = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
  ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
  if (options.stepped) {
    return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ap;
  }
  if (options.tension || options.cubicInterpolationMode === 'monotone') {
    return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aq;
  }
  return lineTo;
}
function pathVars(points, segment, params = {}) {
  const count = points.length;
  const {start: paramsStart = 0, end: paramsEnd = count - 1} = params;
  const {start: segmentStart, end: segmentEnd} = segment;
  const start = Math.max(paramsStart, segmentStart);
  const end = Math.min(paramsEnd, segmentEnd);
  const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
  return {
    count,
    start,
    loop: segment.loop,
    ilen: end < start && !outside ? count + end - start : end - start
  };
}
function pathSegment(ctx, line, segment, params) {
  const {points, options} = line;
  const {count, start, loop, ilen} = pathVars(points, segment, params);
  const lineMethod = getLineMethod(options);
  let {move = true, reverse} = params || {};
  let i, point, prev;
  for (i = 0; i <= ilen; ++i) {
    point = points[(start + (reverse ? ilen - i : i)) % count];
    if (point.skip) {
      continue;
    } else if (move) {
      ctx.moveTo(point.x, point.y);
      move = false;
    } else {
      lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    prev = point;
  }
  if (loop) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    lineMethod(ctx, prev, point, reverse, options.stepped);
  }
  return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
  const points = line.points;
  const {count, start, ilen} = pathVars(points, segment, params);
  const {move = true, reverse} = params || {};
  let avgX = 0;
  let countX = 0;
  let i, point, prevX, minY, maxY, lastY;
  const pointIndex = (index) => (start + (reverse ? ilen - index : index)) % count;
  const drawX = () => {
    if (minY !== maxY) {
      ctx.lineTo(avgX, maxY);
      ctx.lineTo(avgX, minY);
      ctx.lineTo(avgX, lastY);
    }
  };
  if (move) {
    point = points[pointIndex(0)];
    ctx.moveTo(point.x, point.y);
  }
  for (i = 0; i <= ilen; ++i) {
    point = points[pointIndex(i)];
    if (point.skip) {
      continue;
    }
    const x = point.x;
    const y = point.y;
    const truncX = x | 0;
    if (truncX === prevX) {
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
      avgX = (countX * avgX + x) / ++countX;
    } else {
      drawX();
      ctx.lineTo(x, y);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
    }
    lastY = y;
  }
  drawX();
}
function _getSegmentMethod(line) {
  const opts = line.options;
  const borderDash = opts.borderDash && opts.borderDash.length;
  const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== 'monotone' && !opts.stepped && !borderDash;
  return useFastPath ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options) {
  if (options.stepped) {
    return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.am;
  }
  if (options.tension || options.cubicInterpolationMode === 'monotone') {
    return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.an;
  }
  return _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ao;
}
function strokePathWithCache(ctx, line, start, count) {
  let path = line._path;
  if (!path) {
    path = line._path = new Path2D();
    if (line.path(path, start, count)) {
      path.closePath();
    }
  }
  setStyle(ctx, line.options);
  ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
  const {segments, options} = line;
  const segmentMethod = _getSegmentMethod(line);
  for (const segment of segments) {
    setStyle(ctx, options, segment.style);
    ctx.beginPath();
    if (segmentMethod(ctx, line, segment, {start, end: start + count - 1})) {
      ctx.closePath();
    }
    ctx.stroke();
  }
}
const usePath2D = typeof Path2D === 'function';
function draw(ctx, line, start, count) {
  if (usePath2D && !line.options.segment) {
    strokePathWithCache(ctx, line, start, count);
  } else {
    strokePathDirect(ctx, line, start, count);
  }
}
class LineElement extends Element {
  constructor(cfg) {
    super();
    this.animated = true;
    this.options = undefined;
    this._chart = undefined;
    this._loop = undefined;
    this._fullLoop = undefined;
    this._path = undefined;
    this._points = undefined;
    this._segments = undefined;
    this._decimated = false;
    this._pointsUpdated = false;
    this._datasetIndex = undefined;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  updateControlPoints(chartArea, indexAxis) {
    const options = this.options;
    if ((options.tension || options.cubicInterpolationMode === 'monotone') && !options.stepped && !this._pointsUpdated) {
      const loop = options.spanGaps ? this._loop : this._fullLoop;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aj)(this._points, options, chartArea, loop, indexAxis);
      this._pointsUpdated = true;
    }
  }
  set points(points) {
    this._points = points;
    delete this._segments;
    delete this._path;
    this._pointsUpdated = false;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ak)(this, this.options.segment));
  }
  first() {
    const segments = this.segments;
    const points = this.points;
    return segments.length && points[segments[0].start];
  }
  last() {
    const segments = this.segments;
    const points = this.points;
    const count = segments.length;
    return count && points[segments[count - 1].end];
  }
  interpolate(point, property) {
    const options = this.options;
    const value = point[property];
    const points = this.points;
    const segments = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.al)(this, {property, start: value, end: value});
    if (!segments.length) {
      return;
    }
    const result = [];
    const _interpolate = _getInterpolationMethod(options);
    let i, ilen;
    for (i = 0, ilen = segments.length; i < ilen; ++i) {
      const {start, end} = segments[i];
      const p1 = points[start];
      const p2 = points[end];
      if (p1 === p2) {
        result.push(p1);
        continue;
      }
      const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
      const interpolated = _interpolate(p1, p2, t, options.stepped);
      interpolated[property] = point[property];
      result.push(interpolated);
    }
    return result.length === 1 ? result[0] : result;
  }
  pathSegment(ctx, segment, params) {
    const segmentMethod = _getSegmentMethod(this);
    return segmentMethod(ctx, this, segment, params);
  }
  path(ctx, start, count) {
    const segments = this.segments;
    const segmentMethod = _getSegmentMethod(this);
    let loop = this._loop;
    start = start || 0;
    count = count || (this.points.length - start);
    for (const segment of segments) {
      loop &= segmentMethod(ctx, this, segment, {start, end: start + count - 1});
    }
    return !!loop;
  }
  draw(ctx, chartArea, start, count) {
    const options = this.options || {};
    const points = this.points || [];
    if (points.length && options.borderWidth) {
      ctx.save();
      draw(ctx, this, start, count);
      ctx.restore();
    }
    if (this.animated) {
      this._pointsUpdated = false;
      this._path = undefined;
    }
  }
}
LineElement.id = 'line';
LineElement.defaults = {
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 3,
  capBezierPoints: true,
  cubicInterpolationMode: 'default',
  fill: false,
  spanGaps: false,
  stepped: false,
  tension: 0,
};
LineElement.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
};
LineElement.descriptors = {
  _scriptable: true,
  _indexable: (name) => name !== 'borderDash' && name !== 'fill',
};

function inRange$1(el, pos, axis, useFinalPosition) {
  const options = el.options;
  const {[axis]: value} = el.getProps([axis], useFinalPosition);
  return (Math.abs(pos - value) < options.radius + options.hitRadius);
}
class PointElement extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.parsed = undefined;
    this.skip = undefined;
    this.stop = undefined;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    const options = this.options;
    const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
    return ((Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) < Math.pow(options.hitRadius + options.radius, 2));
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange$1(this, mouseX, 'x', useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange$1(this, mouseY, 'y', useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
    return {x, y};
  }
  size(options) {
    options = options || this.options || {};
    let radius = options.radius || 0;
    radius = Math.max(radius, radius && options.hoverRadius || 0);
    const borderWidth = radius && options.borderWidth || 0;
    return (radius + borderWidth) * 2;
  }
  draw(ctx, area) {
    const options = this.options;
    if (this.skip || options.radius < 0.1 || !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z)(this, area, this.size(options) / 2)) {
      return;
    }
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.fillStyle = options.backgroundColor;
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ar)(ctx, options, this.x, this.y);
  }
  getRange() {
    const options = this.options || {};
    return options.radius + options.hitRadius;
  }
}
PointElement.id = 'point';
PointElement.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: 'circle',
  radius: 3,
  rotation: 0
};
PointElement.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
};

function getBarBounds(bar, useFinalPosition) {
  const {x, y, base, width, height} = bar.getProps(['x', 'y', 'base', 'width', 'height'], useFinalPosition);
  let left, right, top, bottom, half;
  if (bar.horizontal) {
    half = height / 2;
    left = Math.min(x, base);
    right = Math.max(x, base);
    top = y - half;
    bottom = y + half;
  } else {
    half = width / 2;
    left = x - half;
    right = x + half;
    top = Math.min(y, base);
    bottom = Math.max(y, base);
  }
  return {left, top, right, bottom};
}
function skipOrLimit(skip, value, min, max) {
  return skip ? 0 : (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
  const value = bar.options.borderWidth;
  const skip = bar.borderSkipped;
  const o = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.at)(value);
  return {
    t: skipOrLimit(skip.top, o.top, 0, maxH),
    r: skipOrLimit(skip.right, o.right, 0, maxW),
    b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
    l: skipOrLimit(skip.left, o.left, 0, maxW)
  };
}
function parseBorderRadius(bar, maxW, maxH) {
  const {enableBorderRadius} = bar.getProps(['enableBorderRadius']);
  const value = bar.options.borderRadius;
  const o = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(value);
  const maxR = Math.min(maxW, maxH);
  const skip = bar.borderSkipped;
  const enableBorder = enableBorderRadius || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(value);
  return {
    topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
    topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
    bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
    bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
  };
}
function boundingRects(bar) {
  const bounds = getBarBounds(bar);
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const border = parseBorderWidth(bar, width / 2, height / 2);
  const radius = parseBorderRadius(bar, width / 2, height / 2);
  return {
    outer: {
      x: bounds.left,
      y: bounds.top,
      w: width,
      h: height,
      radius
    },
    inner: {
      x: bounds.left + border.l,
      y: bounds.top + border.t,
      w: width - border.l - border.r,
      h: height - border.t - border.b,
      radius: {
        topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
        topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
        bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
        bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r)),
      }
    }
  };
}
function inRange(bar, x, y, useFinalPosition) {
  const skipX = x === null;
  const skipY = y === null;
  const skipBoth = skipX && skipY;
  const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
  return bounds
		&& (skipX || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(x, bounds.left, bounds.right))
		&& (skipY || (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(y, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
  return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
function addNormalRectPath(ctx, rect) {
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
  const x = rect.x !== refRect.x ? -amount : 0;
  const y = rect.y !== refRect.y ? -amount : 0;
  const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
  const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
  return {
    x: rect.x + x,
    y: rect.y + y,
    w: rect.w + w,
    h: rect.h + h,
    radius: rect.radius
  };
}
class BarElement extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.horizontal = undefined;
    this.base = undefined;
    this.width = undefined;
    this.height = undefined;
    this.inflateAmount = undefined;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  draw(ctx) {
    const {inflateAmount, options: {borderColor, backgroundColor}} = this;
    const {inner, outer} = boundingRects(this);
    const addRectPath = hasRadius(outer.radius) ? _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.as : addNormalRectPath;
    ctx.save();
    if (outer.w !== inner.w || outer.h !== inner.h) {
      ctx.beginPath();
      addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
      ctx.clip();
      addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
      ctx.fillStyle = borderColor;
      ctx.fill('evenodd');
    }
    ctx.beginPath();
    addRectPath(ctx, inflateRect(inner, inflateAmount));
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.restore();
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    return inRange(this, mouseX, mouseY, useFinalPosition);
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange(this, mouseX, null, useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange(this, null, mouseY, useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    const {x, y, base, horizontal} = this.getProps(['x', 'y', 'base', 'horizontal'], useFinalPosition);
    return {
      x: horizontal ? (x + base) / 2 : x,
      y: horizontal ? y : (y + base) / 2
    };
  }
  getRange(axis) {
    return axis === 'x' ? this.width / 2 : this.height / 2;
  }
}
BarElement.id = 'bar';
BarElement.defaults = {
  borderSkipped: 'start',
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: 'auto',
  pointStyle: undefined
};
BarElement.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
};

var elements = /*#__PURE__*/Object.freeze({
__proto__: null,
ArcElement: ArcElement,
LineElement: LineElement,
PointElement: PointElement,
BarElement: BarElement
});

function lttbDecimation(data, start, count, availableWidth, options) {
  const samples = options.samples || availableWidth;
  if (samples >= count) {
    return data.slice(start, start + count);
  }
  const decimated = [];
  const bucketWidth = (count - 2) / (samples - 2);
  let sampledIndex = 0;
  const endIndex = start + count - 1;
  let a = start;
  let i, maxAreaPoint, maxArea, area, nextA;
  decimated[sampledIndex++] = data[a];
  for (i = 0; i < samples - 2; i++) {
    let avgX = 0;
    let avgY = 0;
    let j;
    const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
    const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
    const avgRangeLength = avgRangeEnd - avgRangeStart;
    for (j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;
    const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
    const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
    const {x: pointAx, y: pointAy} = data[a];
    maxArea = area = -1;
    for (j = rangeOffs; j < rangeTo; j++) {
      area = 0.5 * Math.abs(
        (pointAx - avgX) * (data[j].y - pointAy) -
        (pointAx - data[j].x) * (avgY - pointAy)
      );
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j];
        nextA = j;
      }
    }
    decimated[sampledIndex++] = maxAreaPoint;
    a = nextA;
  }
  decimated[sampledIndex++] = data[endIndex];
  return decimated;
}
function minMaxDecimation(data, start, count, availableWidth) {
  let avgX = 0;
  let countX = 0;
  let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
  const decimated = [];
  const endIndex = start + count - 1;
  const xMin = data[start].x;
  const xMax = data[endIndex].x;
  const dx = xMax - xMin;
  for (i = start; i < start + count; ++i) {
    point = data[i];
    x = (point.x - xMin) / dx * availableWidth;
    y = point.y;
    const truncX = x | 0;
    if (truncX === prevX) {
      if (y < minY) {
        minY = y;
        minIndex = i;
      } else if (y > maxY) {
        maxY = y;
        maxIndex = i;
      }
      avgX = (countX * avgX + point.x) / ++countX;
    } else {
      const lastIndex = i - 1;
      if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(minIndex) && !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(maxIndex)) {
        const intermediateIndex1 = Math.min(minIndex, maxIndex);
        const intermediateIndex2 = Math.max(minIndex, maxIndex);
        if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex1],
            x: avgX,
          });
        }
        if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex2],
            x: avgX
          });
        }
      }
      if (i > 0 && lastIndex !== startIndex) {
        decimated.push(data[lastIndex]);
      }
      decimated.push(point);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
      minIndex = maxIndex = startIndex = i;
    }
  }
  return decimated;
}
function cleanDecimatedDataset(dataset) {
  if (dataset._decimated) {
    const data = dataset._data;
    delete dataset._decimated;
    delete dataset._data;
    Object.defineProperty(dataset, 'data', {value: data});
  }
}
function cleanDecimatedData(chart) {
  chart.data.datasets.forEach((dataset) => {
    cleanDecimatedDataset(dataset);
  });
}
function getStartAndCountOfVisiblePointsSimplified(meta, points) {
  const pointCount = points.length;
  let start = 0;
  let count;
  const {iScale} = meta;
  const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
  if (minDefined) {
    start = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(points, iScale.axis, min).lo, 0, pointCount - 1);
  }
  if (maxDefined) {
    count = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(points, iScale.axis, max).hi + 1, start, pointCount) - start;
  } else {
    count = pointCount - start;
  }
  return {start, count};
}
var plugin_decimation = {
  id: 'decimation',
  defaults: {
    algorithm: 'min-max',
    enabled: false,
  },
  beforeElementsUpdate: (chart, args, options) => {
    if (!options.enabled) {
      cleanDecimatedData(chart);
      return;
    }
    const availableWidth = chart.width;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const {_data, indexAxis} = dataset;
      const meta = chart.getDatasetMeta(datasetIndex);
      const data = _data || dataset.data;
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a)([indexAxis, chart.options.indexAxis]) === 'y') {
        return;
      }
      if (meta.type !== 'line') {
        return;
      }
      const xAxis = chart.scales[meta.xAxisID];
      if (xAxis.type !== 'linear' && xAxis.type !== 'time') {
        return;
      }
      if (chart.options.parsing) {
        return;
      }
      let {start, count} = getStartAndCountOfVisiblePointsSimplified(meta, data);
      const threshold = options.threshold || 4 * availableWidth;
      if (count <= threshold) {
        cleanDecimatedDataset(dataset);
        return;
      }
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(_data)) {
        dataset._data = data;
        delete dataset.data;
        Object.defineProperty(dataset, 'data', {
          configurable: true,
          enumerable: true,
          get: function() {
            return this._decimated;
          },
          set: function(d) {
            this._data = d;
          }
        });
      }
      let decimated;
      switch (options.algorithm) {
      case 'lttb':
        decimated = lttbDecimation(data, start, count, availableWidth, options);
        break;
      case 'min-max':
        decimated = minMaxDecimation(data, start, count, availableWidth);
        break;
      default:
        throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
      }
      dataset._decimated = decimated;
    });
  },
  destroy(chart) {
    cleanDecimatedData(chart);
  }
};

function getLineByIndex(chart, index) {
  const meta = chart.getDatasetMeta(index);
  const visible = meta && chart.isDatasetVisible(index);
  return visible ? meta.dataset : null;
}
function parseFillOption(line) {
  const options = line.options;
  const fillOption = options.fill;
  let fill = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(fillOption && fillOption.target, fillOption);
  if (fill === undefined) {
    fill = !!options.backgroundColor;
  }
  if (fill === false || fill === null) {
    return false;
  }
  if (fill === true) {
    return 'origin';
  }
  return fill;
}
function decodeFill(line, index, count) {
  const fill = parseFillOption(line);
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
    return isNaN(fill.value) ? false : fill;
  }
  let target = parseFloat(fill);
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(target) && Math.floor(target) === target) {
    if (fill[0] === '-' || fill[0] === '+') {
      target = index + target;
    }
    if (target === index || target < 0 || target >= count) {
      return false;
    }
    return target;
  }
  return ['origin', 'start', 'end', 'stack', 'shape'].indexOf(fill) >= 0 && fill;
}
function computeLinearBoundary(source) {
  const {scale = {}, fill} = source;
  let target = null;
  let horizontal;
  if (fill === 'start') {
    target = scale.bottom;
  } else if (fill === 'end') {
    target = scale.top;
  } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
    target = scale.getPixelForValue(fill.value);
  } else if (scale.getBasePixel) {
    target = scale.getBasePixel();
  }
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(target)) {
    horizontal = scale.isHorizontal();
    return {
      x: horizontal ? target : null,
      y: horizontal ? null : target
    };
  }
  return null;
}
class simpleArc {
  constructor(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.radius = opts.radius;
  }
  pathSegment(ctx, bounds, opts) {
    const {x, y, radius} = this;
    bounds = bounds || {start: 0, end: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T};
    ctx.arc(x, y, radius, bounds.end, bounds.start, true);
    return !opts.bounds;
  }
  interpolate(point) {
    const {x, y, radius} = this;
    const angle = point.angle;
    return {
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
      angle
    };
  }
}
function computeCircularBoundary(source) {
  const {scale, fill} = source;
  const options = scale.options;
  const length = scale.getLabels().length;
  const target = [];
  const start = options.reverse ? scale.max : scale.min;
  const end = options.reverse ? scale.min : scale.max;
  let i, center, value;
  if (fill === 'start') {
    value = start;
  } else if (fill === 'end') {
    value = end;
  } else if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i)(fill)) {
    value = fill.value;
  } else {
    value = scale.getBaseValue();
  }
  if (options.grid.circular) {
    center = scale.getPointPositionForValue(0, start);
    return new simpleArc({
      x: center.x,
      y: center.y,
      radius: scale.getDistanceFromCenterForValue(value)
    });
  }
  for (i = 0; i < length; ++i) {
    target.push(scale.getPointPositionForValue(i, value));
  }
  return target;
}
function computeBoundary(source) {
  const scale = source.scale || {};
  if (scale.getPointPositionForValue) {
    return computeCircularBoundary(source);
  }
  return computeLinearBoundary(source);
}
function findSegmentEnd(start, end, points) {
  for (;end > start; end--) {
    const point = points[end];
    if (!isNaN(point.x) && !isNaN(point.y)) {
      break;
    }
  }
  return end;
}
function pointsFromSegments(boundary, line) {
  const {x = null, y = null} = boundary || {};
  const linePoints = line.points;
  const points = [];
  line.segments.forEach(({start, end}) => {
    end = findSegmentEnd(start, end, linePoints);
    const first = linePoints[start];
    const last = linePoints[end];
    if (y !== null) {
      points.push({x: first.x, y});
      points.push({x: last.x, y});
    } else if (x !== null) {
      points.push({x, y: first.y});
      points.push({x, y: last.y});
    }
  });
  return points;
}
function buildStackLine(source) {
  const {scale, index, line} = source;
  const points = [];
  const segments = line.segments;
  const sourcePoints = line.points;
  const linesBelow = getLinesBelow(scale, index);
  linesBelow.push(createBoundaryLine({x: null, y: scale.bottom}, line));
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    for (let j = segment.start; j <= segment.end; j++) {
      addPointsBelow(points, sourcePoints[j], linesBelow);
    }
  }
  return new LineElement({points, options: {}});
}
function getLinesBelow(scale, index) {
  const below = [];
  const metas = scale.getMatchingVisibleMetas('line');
  for (let i = 0; i < metas.length; i++) {
    const meta = metas[i];
    if (meta.index === index) {
      break;
    }
    if (!meta.hidden) {
      below.unshift(meta.dataset);
    }
  }
  return below;
}
function addPointsBelow(points, sourcePoint, linesBelow) {
  const postponed = [];
  for (let j = 0; j < linesBelow.length; j++) {
    const line = linesBelow[j];
    const {first, last, point} = findPoint(line, sourcePoint, 'x');
    if (!point || (first && last)) {
      continue;
    }
    if (first) {
      postponed.unshift(point);
    } else {
      points.push(point);
      if (!last) {
        break;
      }
    }
  }
  points.push(...postponed);
}
function findPoint(line, sourcePoint, property) {
  const point = line.interpolate(sourcePoint, property);
  if (!point) {
    return {};
  }
  const pointValue = point[property];
  const segments = line.segments;
  const linePoints = line.points;
  let first = false;
  let last = false;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const firstValue = linePoints[segment.start][property];
    const lastValue = linePoints[segment.end][property];
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(pointValue, firstValue, lastValue)) {
      first = pointValue === firstValue;
      last = pointValue === lastValue;
      break;
    }
  }
  return {first, last, point};
}
function getTarget(source) {
  const {chart, fill, line} = source;
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(fill)) {
    return getLineByIndex(chart, fill);
  }
  if (fill === 'stack') {
    return buildStackLine(source);
  }
  if (fill === 'shape') {
    return true;
  }
  const boundary = computeBoundary(source);
  if (boundary instanceof simpleArc) {
    return boundary;
  }
  return createBoundaryLine(boundary, line);
}
function createBoundaryLine(boundary, line) {
  let points = [];
  let _loop = false;
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(boundary)) {
    _loop = true;
    points = boundary;
  } else {
    points = pointsFromSegments(boundary, line);
  }
  return points.length ? new LineElement({
    points,
    options: {tension: 0},
    _loop,
    _fullLoop: _loop
  }) : null;
}
function resolveTarget(sources, index, propagate) {
  const source = sources[index];
  let fill = source.fill;
  const visited = [index];
  let target;
  if (!propagate) {
    return fill;
  }
  while (fill !== false && visited.indexOf(fill) === -1) {
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(fill)) {
      return fill;
    }
    target = sources[fill];
    if (!target) {
      return false;
    }
    if (target.visible) {
      return fill;
    }
    visited.push(fill);
    fill = target.fill;
  }
  return false;
}
function _clip(ctx, target, clipY) {
  const {segments, points} = target;
  let first = true;
  let lineLoop = false;
  ctx.beginPath();
  for (const segment of segments) {
    const {start, end} = segment;
    const firstPoint = points[start];
    const lastPoint = points[findSegmentEnd(start, end, points)];
    if (first) {
      ctx.moveTo(firstPoint.x, firstPoint.y);
      first = false;
    } else {
      ctx.lineTo(firstPoint.x, clipY);
      ctx.lineTo(firstPoint.x, firstPoint.y);
    }
    lineLoop = !!target.pathSegment(ctx, segment, {move: lineLoop});
    if (lineLoop) {
      ctx.closePath();
    } else {
      ctx.lineTo(lastPoint.x, clipY);
    }
  }
  ctx.lineTo(target.first().x, clipY);
  ctx.closePath();
  ctx.clip();
}
function getBounds(property, first, last, loop) {
  if (loop) {
    return;
  }
  let start = first[property];
  let end = last[property];
  if (property === 'angle') {
    start = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw)(start);
    end = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw)(end);
  }
  return {property, start, end};
}
function _getEdge(a, b, prop, fn) {
  if (a && b) {
    return fn(a[prop], b[prop]);
  }
  return a ? a[prop] : b ? b[prop] : 0;
}
function _segments(line, target, property) {
  const segments = line.segments;
  const points = line.points;
  const tpoints = target.points;
  const parts = [];
  for (const segment of segments) {
    let {start, end} = segment;
    end = findSegmentEnd(start, end, points);
    const bounds = getBounds(property, points[start], points[end], segment.loop);
    if (!target.segments) {
      parts.push({
        source: segment,
        target: bounds,
        start: points[start],
        end: points[end]
      });
      continue;
    }
    const targetSegments = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.al)(target, bounds);
    for (const tgt of targetSegments) {
      const subBounds = getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
      const fillSources = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.av)(segment, points, subBounds);
      for (const fillSource of fillSources) {
        parts.push({
          source: fillSource,
          target: tgt,
          start: {
            [property]: _getEdge(bounds, subBounds, 'start', Math.max)
          },
          end: {
            [property]: _getEdge(bounds, subBounds, 'end', Math.min)
          }
        });
      }
    }
  }
  return parts;
}
function clipBounds(ctx, scale, bounds) {
  const {top, bottom} = scale.chart.chartArea;
  const {property, start, end} = bounds || {};
  if (property === 'x') {
    ctx.beginPath();
    ctx.rect(start, top, end - start, bottom - top);
    ctx.clip();
  }
}
function interpolatedLineTo(ctx, target, point, property) {
  const interpolatedPoint = target.interpolate(point, property);
  if (interpolatedPoint) {
    ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
  }
}
function _fill(ctx, cfg) {
  const {line, target, property, color, scale} = cfg;
  const segments = _segments(line, target, property);
  for (const {source: src, target: tgt, start, end} of segments) {
    const {style: {backgroundColor = color} = {}} = src;
    const notShape = target !== true;
    ctx.save();
    ctx.fillStyle = backgroundColor;
    clipBounds(ctx, scale, notShape && getBounds(property, start, end));
    ctx.beginPath();
    const lineLoop = !!line.pathSegment(ctx, src);
    let loop;
    if (notShape) {
      if (lineLoop) {
        ctx.closePath();
      } else {
        interpolatedLineTo(ctx, target, end, property);
      }
      const targetLoop = !!target.pathSegment(ctx, tgt, {move: lineLoop, reverse: true});
      loop = lineLoop && targetLoop;
      if (!loop) {
        interpolatedLineTo(ctx, target, start, property);
      }
    }
    ctx.closePath();
    ctx.fill(loop ? 'evenodd' : 'nonzero');
    ctx.restore();
  }
}
function doFill(ctx, cfg) {
  const {line, target, above, below, area, scale} = cfg;
  const property = line._loop ? 'angle' : cfg.axis;
  ctx.save();
  if (property === 'x' && below !== above) {
    _clip(ctx, target, area.top);
    _fill(ctx, {line, target, color: above, scale, property});
    ctx.restore();
    ctx.save();
    _clip(ctx, target, area.bottom);
  }
  _fill(ctx, {line, target, color: below, scale, property});
  ctx.restore();
}
function drawfill(ctx, source, area) {
  const target = getTarget(source);
  const {line, scale, axis} = source;
  const lineOpts = line.options;
  const fillOption = lineOpts.fill;
  const color = lineOpts.backgroundColor;
  const {above = color, below = color} = fillOption || {};
  if (target && line.points.length) {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.W)(ctx, area);
    doFill(ctx, {line, target, above, below, area, scale, axis});
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx);
  }
}
var plugin_filler = {
  id: 'filler',
  afterDatasetsUpdate(chart, _args, options) {
    const count = (chart.data.datasets || []).length;
    const sources = [];
    let meta, i, line, source;
    for (i = 0; i < count; ++i) {
      meta = chart.getDatasetMeta(i);
      line = meta.dataset;
      source = null;
      if (line && line.options && line instanceof LineElement) {
        source = {
          visible: chart.isDatasetVisible(i),
          index: i,
          fill: decodeFill(line, i, count),
          chart,
          axis: meta.controller.options.indexAxis,
          scale: meta.vScale,
          line,
        };
      }
      meta.$filler = source;
      sources.push(source);
    }
    for (i = 0; i < count; ++i) {
      source = sources[i];
      if (!source || source.fill === false) {
        continue;
      }
      source.fill = resolveTarget(sources, i, options.propagate);
    }
  },
  beforeDraw(chart, _args, options) {
    const draw = options.drawTime === 'beforeDraw';
    const metasets = chart.getSortedVisibleDatasetMetas();
    const area = chart.chartArea;
    for (let i = metasets.length - 1; i >= 0; --i) {
      const source = metasets[i].$filler;
      if (!source) {
        continue;
      }
      source.line.updateControlPoints(area, source.axis);
      if (draw) {
        drawfill(chart.ctx, source, area);
      }
    }
  },
  beforeDatasetsDraw(chart, _args, options) {
    if (options.drawTime !== 'beforeDatasetsDraw') {
      return;
    }
    const metasets = chart.getSortedVisibleDatasetMetas();
    for (let i = metasets.length - 1; i >= 0; --i) {
      const source = metasets[i].$filler;
      if (source) {
        drawfill(chart.ctx, source, chart.chartArea);
      }
    }
  },
  beforeDatasetDraw(chart, args, options) {
    const source = args.meta.$filler;
    if (!source || source.fill === false || options.drawTime !== 'beforeDatasetDraw') {
      return;
    }
    drawfill(chart.ctx, source, chart.chartArea);
  },
  defaults: {
    propagate: true,
    drawTime: 'beforeDatasetDraw'
  }
};

const getBoxSize = (labelOpts, fontSize) => {
  let {boxHeight = fontSize, boxWidth = fontSize} = labelOpts;
  if (labelOpts.usePointStyle) {
    boxHeight = Math.min(boxHeight, fontSize);
    boxWidth = Math.min(boxWidth, fontSize);
  }
  return {
    boxWidth,
    boxHeight,
    itemHeight: Math.max(fontSize, boxHeight)
  };
};
const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
class Legend extends Element {
  constructor(config) {
    super();
    this._added = false;
    this.legendHitBoxes = [];
    this._hoveredItem = null;
    this.doughnutMode = false;
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this.legendItems = undefined;
    this.columnSizes = undefined;
    this.lineWidths = undefined;
    this.maxHeight = undefined;
    this.maxWidth = undefined;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.height = undefined;
    this.width = undefined;
    this._margins = undefined;
    this.position = undefined;
    this.weight = undefined;
    this.fullSize = undefined;
  }
  update(maxWidth, maxHeight, margins) {
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins;
    this.setDimensions();
    this.buildLabels();
    this.fit();
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = this._margins.left;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = this._margins.top;
      this.bottom = this.height;
    }
  }
  buildLabels() {
    const labelOpts = this.options.labels || {};
    let legendItems = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(labelOpts.generateLabels, [this.chart], this) || [];
    if (labelOpts.filter) {
      legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
    }
    if (labelOpts.sort) {
      legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
    }
    if (this.options.reverse) {
      legendItems.reverse();
    }
    this.legendItems = legendItems;
  }
  fit() {
    const {options, ctx} = this;
    if (!options.display) {
      this.width = this.height = 0;
      return;
    }
    const labelOpts = options.labels;
    const labelFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(labelOpts.font);
    const fontSize = labelFont.size;
    const titleHeight = this._computeTitleHeight();
    const {boxWidth, itemHeight} = getBoxSize(labelOpts, fontSize);
    let width, height;
    ctx.font = labelFont.string;
    if (this.isHorizontal()) {
      width = this.maxWidth;
      height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
    } else {
      height = this.maxHeight;
      width = this._fitCols(titleHeight, fontSize, boxWidth, itemHeight) + 10;
    }
    this.width = Math.min(width, options.maxWidth || this.maxWidth);
    this.height = Math.min(height, options.maxHeight || this.maxHeight);
  }
  _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
    const {ctx, maxWidth, options: {labels: {padding}}} = this;
    const hitboxes = this.legendHitBoxes = [];
    const lineWidths = this.lineWidths = [0];
    const lineHeight = itemHeight + padding;
    let totalHeight = titleHeight;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    let row = -1;
    let top = -lineHeight;
    this.legendItems.forEach((legendItem, i) => {
      const itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
      if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
        totalHeight += lineHeight;
        lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
        top += lineHeight;
        row++;
      }
      hitboxes[i] = {left: 0, top, row, width: itemWidth, height: itemHeight};
      lineWidths[lineWidths.length - 1] += itemWidth + padding;
    });
    return totalHeight;
  }
  _fitCols(titleHeight, fontSize, boxWidth, itemHeight) {
    const {ctx, maxHeight, options: {labels: {padding}}} = this;
    const hitboxes = this.legendHitBoxes = [];
    const columnSizes = this.columnSizes = [];
    const heightLimit = maxHeight - titleHeight;
    let totalWidth = padding;
    let currentColWidth = 0;
    let currentColHeight = 0;
    let left = 0;
    let col = 0;
    this.legendItems.forEach((legendItem, i) => {
      const itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
      if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
        totalWidth += currentColWidth + padding;
        columnSizes.push({width: currentColWidth, height: currentColHeight});
        left += currentColWidth + padding;
        col++;
        currentColWidth = currentColHeight = 0;
      }
      hitboxes[i] = {left, top: currentColHeight, col, width: itemWidth, height: itemHeight};
      currentColWidth = Math.max(currentColWidth, itemWidth);
      currentColHeight += itemHeight + padding;
    });
    totalWidth += currentColWidth;
    columnSizes.push({width: currentColWidth, height: currentColHeight});
    return totalWidth;
  }
  adjustHitBoxes() {
    if (!this.options.display) {
      return;
    }
    const titleHeight = this._computeTitleHeight();
    const {legendHitBoxes: hitboxes, options: {align, labels: {padding}, rtl}} = this;
    const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(rtl, this.left, this.width);
    if (this.isHorizontal()) {
      let row = 0;
      let left = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.left + padding, this.right - this.lineWidths[row]);
      for (const hitbox of hitboxes) {
        if (row !== hitbox.row) {
          row = hitbox.row;
          left = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.left + padding, this.right - this.lineWidths[row]);
        }
        hitbox.top += this.top + titleHeight + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
        left += hitbox.width + padding;
      }
    } else {
      let col = 0;
      let top = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
      for (const hitbox of hitboxes) {
        if (hitbox.col !== col) {
          col = hitbox.col;
          top = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
        }
        hitbox.top = top;
        hitbox.left += this.left + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
        top += hitbox.height + padding;
      }
    }
  }
  isHorizontal() {
    return this.options.position === 'top' || this.options.position === 'bottom';
  }
  draw() {
    if (this.options.display) {
      const ctx = this.ctx;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.W)(ctx, this);
      this._draw();
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Y)(ctx);
    }
  }
  _draw() {
    const {options: opts, columnSizes, lineWidths, ctx} = this;
    const {align, labels: labelOpts} = opts;
    const defaultColor = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.color;
    const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(opts.rtl, this.left, this.width);
    const labelFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(labelOpts.font);
    const {color: fontColor, padding} = labelOpts;
    const fontSize = labelFont.size;
    const halfFontSize = fontSize / 2;
    let cursor;
    this.drawTitle();
    ctx.textAlign = rtlHelper.textAlign('left');
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 0.5;
    ctx.font = labelFont.string;
    const {boxWidth, boxHeight, itemHeight} = getBoxSize(labelOpts, fontSize);
    const drawLegendBox = function(x, y, legendItem) {
      if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
        return;
      }
      ctx.save();
      const lineWidth = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineWidth, 1);
      ctx.fillStyle = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.fillStyle, defaultColor);
      ctx.lineCap = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineCap, 'butt');
      ctx.lineDashOffset = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineDashOffset, 0);
      ctx.lineJoin = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineJoin, 'miter');
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.strokeStyle, defaultColor);
      ctx.setLineDash((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(legendItem.lineDash, []));
      if (labelOpts.usePointStyle) {
        const drawOptions = {
          radius: boxWidth * Math.SQRT2 / 2,
          pointStyle: legendItem.pointStyle,
          rotation: legendItem.rotation,
          borderWidth: lineWidth
        };
        const centerX = rtlHelper.xPlus(x, boxWidth / 2);
        const centerY = y + halfFontSize;
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ar)(ctx, drawOptions, centerX, centerY);
      } else {
        const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
        const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
        const borderRadius = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(legendItem.borderRadius);
        ctx.beginPath();
        if (Object.values(borderRadius).some(v => v !== 0)) {
          (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.as)(ctx, {
            x: xBoxLeft,
            y: yBoxTop,
            w: boxWidth,
            h: boxHeight,
            radius: borderRadius,
          });
        } else {
          ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
        }
        ctx.fill();
        if (lineWidth !== 0) {
          ctx.stroke();
        }
      }
      ctx.restore();
    };
    const fillText = function(x, y, legendItem) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, legendItem.text, x, y + (itemHeight / 2), labelFont, {
        strikethrough: legendItem.hidden,
        textAlign: rtlHelper.textAlign(legendItem.textAlign)
      });
    };
    const isHorizontal = this.isHorizontal();
    const titleHeight = this._computeTitleHeight();
    if (isHorizontal) {
      cursor = {
        x: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.left + padding, this.right - lineWidths[0]),
        y: this.top + padding + titleHeight,
        line: 0
      };
    } else {
      cursor = {
        x: this.left + padding,
        y: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
        line: 0
      };
    }
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ay)(this.ctx, opts.textDirection);
    const lineHeight = itemHeight + padding;
    this.legendItems.forEach((legendItem, i) => {
      ctx.strokeStyle = legendItem.fontColor || fontColor;
      ctx.fillStyle = legendItem.fontColor || fontColor;
      const textWidth = ctx.measureText(legendItem.text).width;
      const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
      const width = boxWidth + halfFontSize + textWidth;
      let x = cursor.x;
      let y = cursor.y;
      rtlHelper.setWidth(this.width);
      if (isHorizontal) {
        if (i > 0 && x + width + padding > this.right) {
          y = cursor.y += lineHeight;
          cursor.line++;
          x = cursor.x = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.left + padding, this.right - lineWidths[cursor.line]);
        }
      } else if (i > 0 && y + lineHeight > this.bottom) {
        x = cursor.x = x + columnSizes[cursor.line].width + padding;
        cursor.line++;
        y = cursor.y = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
      }
      const realX = rtlHelper.x(x);
      drawLegendBox(realX, y, legendItem);
      x = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.az)(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
      fillText(rtlHelper.x(x), y, legendItem);
      if (isHorizontal) {
        cursor.x += width + padding;
      } else {
        cursor.y += lineHeight;
      }
    });
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aA)(this.ctx, opts.textDirection);
  }
  drawTitle() {
    const opts = this.options;
    const titleOpts = opts.title;
    const titleFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(titleOpts.font);
    const titlePadding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(titleOpts.padding);
    if (!titleOpts.display) {
      return;
    }
    const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(opts.rtl, this.left, this.width);
    const ctx = this.ctx;
    const position = titleOpts.position;
    const halfFontSize = titleFont.size / 2;
    const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
    let y;
    let left = this.left;
    let maxWidth = this.width;
    if (this.isHorizontal()) {
      maxWidth = Math.max(...this.lineWidths);
      y = this.top + topPaddingPlusHalfFontSize;
      left = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.align, left, this.right - maxWidth);
    } else {
      const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
      y = topPaddingPlusHalfFontSize + (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
    }
    const x = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(position, left, left + maxWidth);
    ctx.textAlign = rtlHelper.textAlign((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.$)(position));
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = titleOpts.color;
    ctx.fillStyle = titleOpts.color;
    ctx.font = titleFont.string;
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, titleOpts.text, x, y, titleFont);
  }
  _computeTitleHeight() {
    const titleOpts = this.options.title;
    const titleFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(titleOpts.font);
    const titlePadding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(titleOpts.padding);
    return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
  }
  _getLegendItemAt(x, y) {
    let i, hitBox, lh;
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(x, this.left, this.right)
      && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(y, this.top, this.bottom)) {
      lh = this.legendHitBoxes;
      for (i = 0; i < lh.length; ++i) {
        hitBox = lh[i];
        if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(x, hitBox.left, hitBox.left + hitBox.width)
          && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah)(y, hitBox.top, hitBox.top + hitBox.height)) {
          return this.legendItems[i];
        }
      }
    }
    return null;
  }
  handleEvent(e) {
    const opts = this.options;
    if (!isListened(e.type, opts)) {
      return;
    }
    const hoveredItem = this._getLegendItemAt(e.x, e.y);
    if (e.type === 'mousemove') {
      const previous = this._hoveredItem;
      const sameItem = itemsEqual(previous, hoveredItem);
      if (previous && !sameItem) {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(opts.onLeave, [e, previous, this], this);
      }
      this._hoveredItem = hoveredItem;
      if (hoveredItem && !sameItem) {
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(opts.onHover, [e, hoveredItem, this], this);
      }
    } else if (hoveredItem) {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(opts.onClick, [e, hoveredItem, this], this);
    }
  }
}
function isListened(type, opts) {
  if (type === 'mousemove' && (opts.onHover || opts.onLeave)) {
    return true;
  }
  if (opts.onClick && (type === 'click' || type === 'mouseup')) {
    return true;
  }
  return false;
}
var plugin_legend = {
  id: 'legend',
  _element: Legend,
  start(chart, _args, options) {
    const legend = chart.legend = new Legend({ctx: chart.ctx, options, chart});
    layouts.configure(chart, legend, options);
    layouts.addBox(chart, legend);
  },
  stop(chart) {
    layouts.removeBox(chart, chart.legend);
    delete chart.legend;
  },
  beforeUpdate(chart, _args, options) {
    const legend = chart.legend;
    layouts.configure(chart, legend, options);
    legend.options = options;
  },
  afterUpdate(chart) {
    const legend = chart.legend;
    legend.buildLabels();
    legend.adjustHitBoxes();
  },
  afterEvent(chart, args) {
    if (!args.replay) {
      chart.legend.handleEvent(args.event);
    }
  },
  defaults: {
    display: true,
    position: 'top',
    align: 'center',
    fullSize: true,
    reverse: false,
    weight: 1000,
    onClick(e, legendItem, legend) {
      const index = legendItem.datasetIndex;
      const ci = legend.chart;
      if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        legendItem.hidden = true;
      } else {
        ci.show(index);
        legendItem.hidden = false;
      }
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (ctx) => ctx.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(chart) {
        const datasets = chart.data.datasets;
        const {labels: {usePointStyle, pointStyle, textAlign, color}} = chart.legend.options;
        return chart._getSortedDatasetMetas().map((meta) => {
          const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
          const borderWidth = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(style.borderWidth);
          return {
            text: datasets[meta.index].label,
            fillStyle: style.backgroundColor,
            fontColor: color,
            hidden: !meta.visible,
            lineCap: style.borderCapStyle,
            lineDash: style.borderDash,
            lineDashOffset: style.borderDashOffset,
            lineJoin: style.borderJoinStyle,
            lineWidth: (borderWidth.width + borderWidth.height) / 4,
            strokeStyle: style.borderColor,
            pointStyle: pointStyle || style.pointStyle,
            rotation: style.rotation,
            textAlign: textAlign || style.textAlign,
            borderRadius: 0,
            datasetIndex: meta.index
          };
        }, this);
      }
    },
    title: {
      color: (ctx) => ctx.chart.options.color,
      display: false,
      position: 'center',
      text: '',
    }
  },
  descriptors: {
    _scriptable: (name) => !name.startsWith('on'),
    labels: {
      _scriptable: (name) => !['generateLabels', 'filter', 'sort'].includes(name),
    }
  },
};

class Title extends Element {
  constructor(config) {
    super();
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this._padding = undefined;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.width = undefined;
    this.height = undefined;
    this.position = undefined;
    this.weight = undefined;
    this.fullSize = undefined;
  }
  update(maxWidth, maxHeight) {
    const opts = this.options;
    this.left = 0;
    this.top = 0;
    if (!opts.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = maxWidth;
    this.height = this.bottom = maxHeight;
    const lineCount = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(opts.text) ? opts.text.length : 1;
    this._padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(opts.padding);
    const textSize = lineCount * (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(opts.font).lineHeight + this._padding.height;
    if (this.isHorizontal()) {
      this.height = textSize;
    } else {
      this.width = textSize;
    }
  }
  isHorizontal() {
    const pos = this.options.position;
    return pos === 'top' || pos === 'bottom';
  }
  _drawArgs(offset) {
    const {top, left, bottom, right, options} = this;
    const align = options.align;
    let rotation = 0;
    let maxWidth, titleX, titleY;
    if (this.isHorizontal()) {
      titleX = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, left, right);
      titleY = top + offset;
      maxWidth = right - left;
    } else {
      if (options.position === 'left') {
        titleX = left + offset;
        titleY = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, bottom, top);
        rotation = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P * -0.5;
      } else {
        titleX = right - offset;
        titleY = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0)(align, top, bottom);
        rotation = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P * 0.5;
      }
      maxWidth = bottom - top;
    }
    return {titleX, titleY, maxWidth, rotation};
  }
  draw() {
    const ctx = this.ctx;
    const opts = this.options;
    if (!opts.display) {
      return;
    }
    const fontOpts = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(opts.font);
    const lineHeight = fontOpts.lineHeight;
    const offset = lineHeight / 2 + this._padding.top;
    const {titleX, titleY, maxWidth, rotation} = this._drawArgs(offset);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, opts.text, 0, 0, fontOpts, {
      color: opts.color,
      maxWidth,
      rotation,
      textAlign: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.$)(opts.align),
      textBaseline: 'middle',
      translation: [titleX, titleY],
    });
  }
}
function createTitle(chart, titleOpts) {
  const title = new Title({
    ctx: chart.ctx,
    options: titleOpts,
    chart
  });
  layouts.configure(chart, title, titleOpts);
  layouts.addBox(chart, title);
  chart.titleBlock = title;
}
var plugin_title = {
  id: 'title',
  _element: Title,
  start(chart, _args, options) {
    createTitle(chart, options);
  },
  stop(chart) {
    const titleBlock = chart.titleBlock;
    layouts.removeBox(chart, titleBlock);
    delete chart.titleBlock;
  },
  beforeUpdate(chart, _args, options) {
    const title = chart.titleBlock;
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: 'center',
    display: false,
    font: {
      weight: 'bold',
    },
    fullSize: true,
    padding: 10,
    position: 'top',
    text: '',
    weight: 2000
  },
  defaultRoutes: {
    color: 'color'
  },
  descriptors: {
    _scriptable: true,
    _indexable: false,
  },
};

const map = new WeakMap();
var plugin_subtitle = {
  id: 'subtitle',
  start(chart, _args, options) {
    const title = new Title({
      ctx: chart.ctx,
      options,
      chart
    });
    layouts.configure(chart, title, options);
    layouts.addBox(chart, title);
    map.set(chart, title);
  },
  stop(chart) {
    layouts.removeBox(chart, map.get(chart));
    map.delete(chart);
  },
  beforeUpdate(chart, _args, options) {
    const title = map.get(chart);
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: 'center',
    display: false,
    font: {
      weight: 'normal',
    },
    fullSize: true,
    padding: 0,
    position: 'top',
    text: '',
    weight: 1500
  },
  defaultRoutes: {
    color: 'color'
  },
  descriptors: {
    _scriptable: true,
    _indexable: false,
  },
};

const positioners = {
  average(items) {
    if (!items.length) {
      return false;
    }
    let i, len;
    let x = 0;
    let y = 0;
    let count = 0;
    for (i = 0, len = items.length; i < len; ++i) {
      const el = items[i].element;
      if (el && el.hasValue()) {
        const pos = el.tooltipPosition();
        x += pos.x;
        y += pos.y;
        ++count;
      }
    }
    return {
      x: x / count,
      y: y / count
    };
  },
  nearest(items, eventPosition) {
    if (!items.length) {
      return false;
    }
    let x = eventPosition.x;
    let y = eventPosition.y;
    let minDistance = Number.POSITIVE_INFINITY;
    let i, len, nearestElement;
    for (i = 0, len = items.length; i < len; ++i) {
      const el = items[i].element;
      if (el && el.hasValue()) {
        const center = el.getCenterPoint();
        const d = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aC)(eventPosition, center);
        if (d < minDistance) {
          minDistance = d;
          nearestElement = el;
        }
      }
    }
    if (nearestElement) {
      const tp = nearestElement.tooltipPosition();
      x = tp.x;
      y = tp.y;
    }
    return {
      x,
      y
    };
  }
};
function pushOrConcat(base, toPush) {
  if (toPush) {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(toPush)) {
      Array.prototype.push.apply(base, toPush);
    } else {
      base.push(toPush);
    }
  }
  return base;
}
function splitNewlines(str) {
  if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
    return str.split('\n');
  }
  return str;
}
function createTooltipItem(chart, item) {
  const {element, datasetIndex, index} = item;
  const controller = chart.getDatasetMeta(datasetIndex).controller;
  const {label, value} = controller.getLabelAndValue(index);
  return {
    chart,
    label,
    parsed: controller.getParsed(index),
    raw: chart.data.datasets[datasetIndex].data[index],
    formattedValue: value,
    dataset: controller.getDataset(),
    dataIndex: index,
    datasetIndex,
    element
  };
}
function getTooltipSize(tooltip, options) {
  const ctx = tooltip.chart.ctx;
  const {body, footer, title} = tooltip;
  const {boxWidth, boxHeight} = options;
  const bodyFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.bodyFont);
  const titleFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.titleFont);
  const footerFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.footerFont);
  const titleLineCount = title.length;
  const footerLineCount = footer.length;
  const bodyLineItemCount = body.length;
  const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(options.padding);
  let height = padding.height;
  let width = 0;
  let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
  combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
  if (titleLineCount) {
    height += titleLineCount * titleFont.lineHeight
			+ (titleLineCount - 1) * options.titleSpacing
			+ options.titleMarginBottom;
  }
  if (combinedBodyLength) {
    const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
    height += bodyLineItemCount * bodyLineHeight
			+ (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight
			+ (combinedBodyLength - 1) * options.bodySpacing;
  }
  if (footerLineCount) {
    height += options.footerMarginTop
			+ footerLineCount * footerFont.lineHeight
			+ (footerLineCount - 1) * options.footerSpacing;
  }
  let widthPadding = 0;
  const maxLineWidth = function(line) {
    width = Math.max(width, ctx.measureText(line).width + widthPadding);
  };
  ctx.save();
  ctx.font = titleFont.string;
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(tooltip.title, maxLineWidth);
  ctx.font = bodyFont.string;
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
  widthPadding = options.displayColors ? (boxWidth + 2 + options.boxPadding) : 0;
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(body, (bodyItem) => {
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(bodyItem.before, maxLineWidth);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(bodyItem.lines, maxLineWidth);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(bodyItem.after, maxLineWidth);
  });
  widthPadding = 0;
  ctx.font = footerFont.string;
  (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(tooltip.footer, maxLineWidth);
  ctx.restore();
  width += padding.width;
  return {width, height};
}
function determineYAlign(chart, size) {
  const {y, height} = size;
  if (y < height / 2) {
    return 'top';
  } else if (y > (chart.height - height / 2)) {
    return 'bottom';
  }
  return 'center';
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
  const {x, width} = size;
  const caret = options.caretSize + options.caretPadding;
  if (xAlign === 'left' && x + width + caret > chart.width) {
    return true;
  }
  if (xAlign === 'right' && x - width - caret < 0) {
    return true;
  }
}
function determineXAlign(chart, options, size, yAlign) {
  const {x, width} = size;
  const {width: chartWidth, chartArea: {left, right}} = chart;
  let xAlign = 'center';
  if (yAlign === 'center') {
    xAlign = x <= (left + right) / 2 ? 'left' : 'right';
  } else if (x <= width / 2) {
    xAlign = 'left';
  } else if (x >= chartWidth - width / 2) {
    xAlign = 'right';
  }
  if (doesNotFitWithAlign(xAlign, chart, options, size)) {
    xAlign = 'center';
  }
  return xAlign;
}
function determineAlignment(chart, options, size) {
  const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
  return {
    xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
    yAlign
  };
}
function alignX(size, xAlign) {
  let {x, width} = size;
  if (xAlign === 'right') {
    x -= width;
  } else if (xAlign === 'center') {
    x -= (width / 2);
  }
  return x;
}
function alignY(size, yAlign, paddingAndSize) {
  let {y, height} = size;
  if (yAlign === 'top') {
    y += paddingAndSize;
  } else if (yAlign === 'bottom') {
    y -= height + paddingAndSize;
  } else {
    y -= (height / 2);
  }
  return y;
}
function getBackgroundPoint(options, size, alignment, chart) {
  const {caretSize, caretPadding, cornerRadius} = options;
  const {xAlign, yAlign} = alignment;
  const paddingAndSize = caretSize + caretPadding;
  const {topLeft, topRight, bottomLeft, bottomRight} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(cornerRadius);
  let x = alignX(size, xAlign);
  const y = alignY(size, yAlign, paddingAndSize);
  if (yAlign === 'center') {
    if (xAlign === 'left') {
      x += paddingAndSize;
    } else if (xAlign === 'right') {
      x -= paddingAndSize;
    }
  } else if (xAlign === 'left') {
    x -= Math.max(topLeft, bottomLeft) + caretSize;
  } else if (xAlign === 'right') {
    x += Math.max(topRight, bottomRight) + caretSize;
  }
  return {
    x: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(x, 0, chart.width - size.width),
    y: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(y, 0, chart.height - size.height)
  };
}
function getAlignedX(tooltip, align, options) {
  const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(options.padding);
  return align === 'center'
    ? tooltip.x + tooltip.width / 2
    : align === 'right'
      ? tooltip.x + tooltip.width - padding.right
      : tooltip.x + padding.left;
}
function getBeforeAfterBodyLines(callback) {
  return pushOrConcat([], splitNewlines(callback));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent, {
    tooltip,
    tooltipItems,
    type: 'tooltip'
  });
}
function overrideCallbacks(callbacks, context) {
  const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
  return override ? callbacks.override(override) : callbacks;
}
class Tooltip extends Element {
  constructor(config) {
    super();
    this.opacity = 0;
    this._active = [];
    this._eventPosition = undefined;
    this._size = undefined;
    this._cachedAnimations = undefined;
    this._tooltipItems = [];
    this.$animations = undefined;
    this.$context = undefined;
    this.chart = config.chart || config._chart;
    this._chart = this.chart;
    this.options = config.options;
    this.dataPoints = undefined;
    this.title = undefined;
    this.beforeBody = undefined;
    this.body = undefined;
    this.afterBody = undefined;
    this.footer = undefined;
    this.xAlign = undefined;
    this.yAlign = undefined;
    this.x = undefined;
    this.y = undefined;
    this.height = undefined;
    this.width = undefined;
    this.caretX = undefined;
    this.caretY = undefined;
    this.labelColors = undefined;
    this.labelPointStyles = undefined;
    this.labelTextColors = undefined;
  }
  initialize(options) {
    this.options = options;
    this._cachedAnimations = undefined;
    this.$context = undefined;
  }
  _resolveAnimations() {
    const cached = this._cachedAnimations;
    if (cached) {
      return cached;
    }
    const chart = this.chart;
    const options = this.options.setContext(this.getContext());
    const opts = options.enabled && chart.options.animation && options.animations;
    const animations = new Animations(this.chart, opts);
    if (opts._cacheable) {
      this._cachedAnimations = Object.freeze(animations);
    }
    return animations;
  }
  getContext() {
    return this.$context ||
			(this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(context, options) {
    const {callbacks} = options;
    const beforeTitle = callbacks.beforeTitle.apply(this, [context]);
    const title = callbacks.title.apply(this, [context]);
    const afterTitle = callbacks.afterTitle.apply(this, [context]);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeTitle));
    lines = pushOrConcat(lines, splitNewlines(title));
    lines = pushOrConcat(lines, splitNewlines(afterTitle));
    return lines;
  }
  getBeforeBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(options.callbacks.beforeBody.apply(this, [tooltipItems]));
  }
  getBody(tooltipItems, options) {
    const {callbacks} = options;
    const bodyItems = [];
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(tooltipItems, (context) => {
      const bodyItem = {
        before: [],
        lines: [],
        after: []
      };
      const scoped = overrideCallbacks(callbacks, context);
      pushOrConcat(bodyItem.before, splitNewlines(scoped.beforeLabel.call(this, context)));
      pushOrConcat(bodyItem.lines, scoped.label.call(this, context));
      pushOrConcat(bodyItem.after, splitNewlines(scoped.afterLabel.call(this, context)));
      bodyItems.push(bodyItem);
    });
    return bodyItems;
  }
  getAfterBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(options.callbacks.afterBody.apply(this, [tooltipItems]));
  }
  getFooter(tooltipItems, options) {
    const {callbacks} = options;
    const beforeFooter = callbacks.beforeFooter.apply(this, [tooltipItems]);
    const footer = callbacks.footer.apply(this, [tooltipItems]);
    const afterFooter = callbacks.afterFooter.apply(this, [tooltipItems]);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeFooter));
    lines = pushOrConcat(lines, splitNewlines(footer));
    lines = pushOrConcat(lines, splitNewlines(afterFooter));
    return lines;
  }
  _createItems(options) {
    const active = this._active;
    const data = this.chart.data;
    const labelColors = [];
    const labelPointStyles = [];
    const labelTextColors = [];
    let tooltipItems = [];
    let i, len;
    for (i = 0, len = active.length; i < len; ++i) {
      tooltipItems.push(createTooltipItem(this.chart, active[i]));
    }
    if (options.filter) {
      tooltipItems = tooltipItems.filter((element, index, array) => options.filter(element, index, array, data));
    }
    if (options.itemSort) {
      tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
    }
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(tooltipItems, (context) => {
      const scoped = overrideCallbacks(options.callbacks, context);
      labelColors.push(scoped.labelColor.call(this, context));
      labelPointStyles.push(scoped.labelPointStyle.call(this, context));
      labelTextColors.push(scoped.labelTextColor.call(this, context));
    });
    this.labelColors = labelColors;
    this.labelPointStyles = labelPointStyles;
    this.labelTextColors = labelTextColors;
    this.dataPoints = tooltipItems;
    return tooltipItems;
  }
  update(changed, replay) {
    const options = this.options.setContext(this.getContext());
    const active = this._active;
    let properties;
    let tooltipItems = [];
    if (!active.length) {
      if (this.opacity !== 0) {
        properties = {
          opacity: 0
        };
      }
    } else {
      const position = positioners[options.position].call(this, active, this._eventPosition);
      tooltipItems = this._createItems(options);
      this.title = this.getTitle(tooltipItems, options);
      this.beforeBody = this.getBeforeBody(tooltipItems, options);
      this.body = this.getBody(tooltipItems, options);
      this.afterBody = this.getAfterBody(tooltipItems, options);
      this.footer = this.getFooter(tooltipItems, options);
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, size);
      const alignment = determineAlignment(this.chart, options, positionAndSize);
      const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
      this.xAlign = alignment.xAlign;
      this.yAlign = alignment.yAlign;
      properties = {
        opacity: 1,
        x: backgroundPoint.x,
        y: backgroundPoint.y,
        width: size.width,
        height: size.height,
        caretX: position.x,
        caretY: position.y
      };
    }
    this._tooltipItems = tooltipItems;
    this.$context = undefined;
    if (properties) {
      this._resolveAnimations().update(this, properties);
    }
    if (changed && options.external) {
      options.external.call(this, {chart: this.chart, tooltip: this, replay});
    }
  }
  drawCaret(tooltipPoint, ctx, size, options) {
    const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
    ctx.lineTo(caretPosition.x1, caretPosition.y1);
    ctx.lineTo(caretPosition.x2, caretPosition.y2);
    ctx.lineTo(caretPosition.x3, caretPosition.y3);
  }
  getCaretPosition(tooltipPoint, size, options) {
    const {xAlign, yAlign} = this;
    const {caretSize, cornerRadius} = options;
    const {topLeft, topRight, bottomLeft, bottomRight} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(cornerRadius);
    const {x: ptX, y: ptY} = tooltipPoint;
    const {width, height} = size;
    let x1, x2, x3, y1, y2, y3;
    if (yAlign === 'center') {
      y2 = ptY + (height / 2);
      if (xAlign === 'left') {
        x1 = ptX;
        x2 = x1 - caretSize;
        y1 = y2 + caretSize;
        y3 = y2 - caretSize;
      } else {
        x1 = ptX + width;
        x2 = x1 + caretSize;
        y1 = y2 - caretSize;
        y3 = y2 + caretSize;
      }
      x3 = x1;
    } else {
      if (xAlign === 'left') {
        x2 = ptX + Math.max(topLeft, bottomLeft) + (caretSize);
      } else if (xAlign === 'right') {
        x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
      } else {
        x2 = this.caretX;
      }
      if (yAlign === 'top') {
        y1 = ptY;
        y2 = y1 - caretSize;
        x1 = x2 - caretSize;
        x3 = x2 + caretSize;
      } else {
        y1 = ptY + height;
        y2 = y1 + caretSize;
        x1 = x2 + caretSize;
        x3 = x2 - caretSize;
      }
      y3 = y1;
    }
    return {x1, x2, x3, y1, y2, y3};
  }
  drawTitle(pt, ctx, options) {
    const title = this.title;
    const length = title.length;
    let titleFont, titleSpacing, i;
    if (length) {
      const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.titleAlign, options);
      ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
      ctx.textBaseline = 'middle';
      titleFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.titleFont);
      titleSpacing = options.titleSpacing;
      ctx.fillStyle = options.titleColor;
      ctx.font = titleFont.string;
      for (i = 0; i < length; ++i) {
        ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
        pt.y += titleFont.lineHeight + titleSpacing;
        if (i + 1 === length) {
          pt.y += options.titleMarginBottom - titleSpacing;
        }
      }
    }
  }
  _drawColorBox(ctx, pt, i, rtlHelper, options) {
    const labelColors = this.labelColors[i];
    const labelPointStyle = this.labelPointStyles[i];
    const {boxHeight, boxWidth, boxPadding} = options;
    const bodyFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.bodyFont);
    const colorX = getAlignedX(this, 'left', options);
    const rtlColorX = rtlHelper.x(colorX);
    const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
    const colorY = pt.y + yOffSet;
    if (options.usePointStyle) {
      const drawOptions = {
        radius: Math.min(boxWidth, boxHeight) / 2,
        pointStyle: labelPointStyle.pointStyle,
        rotation: labelPointStyle.rotation,
        borderWidth: 1
      };
      const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
      const centerY = colorY + boxHeight / 2;
      ctx.strokeStyle = options.multiKeyBackground;
      ctx.fillStyle = options.multiKeyBackground;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ar)(ctx, drawOptions, centerX, centerY);
      ctx.strokeStyle = labelColors.borderColor;
      ctx.fillStyle = labelColors.backgroundColor;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ar)(ctx, drawOptions, centerX, centerY);
    } else {
      ctx.lineWidth = labelColors.borderWidth || 1;
      ctx.strokeStyle = labelColors.borderColor;
      ctx.setLineDash(labelColors.borderDash || []);
      ctx.lineDashOffset = labelColors.borderDashOffset || 0;
      const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth - boxPadding);
      const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - boxPadding - 2);
      const borderRadius = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(labelColors.borderRadius);
      if (Object.values(borderRadius).some(v => v !== 0)) {
        ctx.beginPath();
        ctx.fillStyle = options.multiKeyBackground;
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.as)(ctx, {
          x: outerX,
          y: colorY,
          w: boxWidth,
          h: boxHeight,
          radius: borderRadius,
        });
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = labelColors.backgroundColor;
        ctx.beginPath();
        (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.as)(ctx, {
          x: innerX,
          y: colorY + 1,
          w: boxWidth - 2,
          h: boxHeight - 2,
          radius: borderRadius,
        });
        ctx.fill();
      } else {
        ctx.fillStyle = options.multiKeyBackground;
        ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
        ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
        ctx.fillStyle = labelColors.backgroundColor;
        ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
      }
    }
    ctx.fillStyle = this.labelTextColors[i];
  }
  drawBody(pt, ctx, options) {
    const {body} = this;
    const {bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding} = options;
    const bodyFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.bodyFont);
    let bodyLineHeight = bodyFont.lineHeight;
    let xLinePadding = 0;
    const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(options.rtl, this.x, this.width);
    const fillLineOfText = function(line) {
      ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
      pt.y += bodyLineHeight + bodySpacing;
    };
    const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
    let bodyItem, textColor, lines, i, j, ilen, jlen;
    ctx.textAlign = bodyAlign;
    ctx.textBaseline = 'middle';
    ctx.font = bodyFont.string;
    pt.x = getAlignedX(this, bodyAlignForCalculation, options);
    ctx.fillStyle = options.bodyColor;
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.beforeBody, fillLineOfText);
    xLinePadding = displayColors && bodyAlignForCalculation !== 'right'
      ? bodyAlign === 'center' ? (boxWidth / 2 + boxPadding) : (boxWidth + 2 + boxPadding)
      : 0;
    for (i = 0, ilen = body.length; i < ilen; ++i) {
      bodyItem = body[i];
      textColor = this.labelTextColors[i];
      ctx.fillStyle = textColor;
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(bodyItem.before, fillLineOfText);
      lines = bodyItem.lines;
      if (displayColors && lines.length) {
        this._drawColorBox(ctx, pt, i, rtlHelper, options);
        bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
      }
      for (j = 0, jlen = lines.length; j < jlen; ++j) {
        fillLineOfText(lines[j]);
        bodyLineHeight = bodyFont.lineHeight;
      }
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(bodyItem.after, fillLineOfText);
    }
    xLinePadding = 0;
    bodyLineHeight = bodyFont.lineHeight;
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D)(this.afterBody, fillLineOfText);
    pt.y -= bodySpacing;
  }
  drawFooter(pt, ctx, options) {
    const footer = this.footer;
    const length = footer.length;
    let footerFont, i;
    if (length) {
      const rtlHelper = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax)(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.footerAlign, options);
      pt.y += options.footerMarginTop;
      ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
      ctx.textBaseline = 'middle';
      footerFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(options.footerFont);
      ctx.fillStyle = options.footerColor;
      ctx.font = footerFont.string;
      for (i = 0; i < length; ++i) {
        ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
        pt.y += footerFont.lineHeight + options.footerSpacing;
      }
    }
  }
  drawBackground(pt, ctx, tooltipSize, options) {
    const {xAlign, yAlign} = this;
    const {x, y} = pt;
    const {width, height} = tooltipSize;
    const {topLeft, topRight, bottomLeft, bottomRight} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au)(options.cornerRadius);
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.beginPath();
    ctx.moveTo(x + topLeft, y);
    if (yAlign === 'top') {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + width - topRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
    if (yAlign === 'center' && xAlign === 'right') {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + width, y + height - bottomRight);
    ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
    if (yAlign === 'bottom') {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x + bottomLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
    if (yAlign === 'center' && xAlign === 'left') {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x, y + topLeft);
    ctx.quadraticCurveTo(x, y, x + topLeft, y);
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth > 0) {
      ctx.stroke();
    }
  }
  _updateAnimationTarget(options) {
    const chart = this.chart;
    const anims = this.$animations;
    const animX = anims && anims.x;
    const animY = anims && anims.y;
    if (animX || animY) {
      const position = positioners[options.position].call(this, this._active, this._eventPosition);
      if (!position) {
        return;
      }
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, this._size);
      const alignment = determineAlignment(chart, options, positionAndSize);
      const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
      if (animX._to !== point.x || animY._to !== point.y) {
        this.xAlign = alignment.xAlign;
        this.yAlign = alignment.yAlign;
        this.width = size.width;
        this.height = size.height;
        this.caretX = position.x;
        this.caretY = position.y;
        this._resolveAnimations().update(this, point);
      }
    }
  }
  draw(ctx) {
    const options = this.options.setContext(this.getContext());
    let opacity = this.opacity;
    if (!opacity) {
      return;
    }
    this._updateAnimationTarget(options);
    const tooltipSize = {
      width: this.width,
      height: this.height
    };
    const pt = {
      x: this.x,
      y: this.y
    };
    opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
    const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(options.padding);
    const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    if (options.enabled && hasTooltipContent) {
      ctx.save();
      ctx.globalAlpha = opacity;
      this.drawBackground(pt, ctx, tooltipSize, options);
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ay)(ctx, options.textDirection);
      pt.y += padding.top;
      this.drawTitle(pt, ctx, options);
      this.drawBody(pt, ctx, options);
      this.drawFooter(pt, ctx, options);
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aA)(ctx, options.textDirection);
      ctx.restore();
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements, eventPosition) {
    const lastActive = this._active;
    const active = activeElements.map(({datasetIndex, index}) => {
      const meta = this.chart.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error('Cannot find a dataset at index ' + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index],
        index,
      };
    });
    const changed = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.af)(lastActive, active);
    const positionChanged = this._positionChanged(active, eventPosition);
    if (changed || positionChanged) {
      this._active = active;
      this._eventPosition = eventPosition;
      this._ignoreReplayEvents = true;
      this.update(true);
    }
  }
  handleEvent(e, replay, inChartArea = true) {
    if (replay && this._ignoreReplayEvents) {
      return false;
    }
    this._ignoreReplayEvents = false;
    const options = this.options;
    const lastActive = this._active || [];
    const active = this._getActiveElements(e, lastActive, replay, inChartArea);
    const positionChanged = this._positionChanged(active, e);
    const changed = replay || !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.af)(active, lastActive) || positionChanged;
    if (changed) {
      this._active = active;
      if (options.enabled || options.external) {
        this._eventPosition = {
          x: e.x,
          y: e.y
        };
        this.update(true, replay);
      }
    }
    return changed;
  }
  _getActiveElements(e, lastActive, replay, inChartArea) {
    const options = this.options;
    if (e.type === 'mouseout') {
      return [];
    }
    if (!inChartArea) {
      return lastActive;
    }
    const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
    if (options.reverse) {
      active.reverse();
    }
    return active;
  }
  _positionChanged(active, e) {
    const {caretX, caretY, options} = this;
    const position = positioners[options.position].call(this, active, e);
    return position !== false && (caretX !== position.x || caretY !== position.y);
  }
}
Tooltip.positioners = positioners;
var plugin_tooltip = {
  id: 'tooltip',
  _element: Tooltip,
  positioners,
  afterInit(chart, _args, options) {
    if (options) {
      chart.tooltip = new Tooltip({chart, options});
    }
  },
  beforeUpdate(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  reset(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  afterDraw(chart) {
    const tooltip = chart.tooltip;
    const args = {
      tooltip
    };
    if (chart.notifyPlugins('beforeTooltipDraw', args) === false) {
      return;
    }
    if (tooltip) {
      tooltip.draw(chart.ctx);
    }
    chart.notifyPlugins('afterTooltipDraw', args);
  },
  afterEvent(chart, args) {
    if (chart.tooltip) {
      const useFinalPosition = args.replay;
      if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
        args.changed = true;
      }
    }
  },
  defaults: {
    enabled: true,
    external: null,
    position: 'average',
    backgroundColor: 'rgba(0,0,0,0.8)',
    titleColor: '#fff',
    titleFont: {
      weight: 'bold',
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: 'left',
    bodyColor: '#fff',
    bodySpacing: 2,
    bodyFont: {
    },
    bodyAlign: 'left',
    footerColor: '#fff',
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: 'bold',
    },
    footerAlign: 'left',
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (ctx, opts) => opts.bodyFont.size,
    boxWidth: (ctx, opts) => opts.bodyFont.size,
    multiKeyBackground: '#fff',
    displayColors: true,
    boxPadding: 0,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: 'easeOutQuart',
    },
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY'],
      },
      opacity: {
        easing: 'linear',
        duration: 200
      }
    },
    callbacks: {
      beforeTitle: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      title(tooltipItems) {
        if (tooltipItems.length > 0) {
          const item = tooltipItems[0];
          const labels = item.chart.data.labels;
          const labelCount = labels ? labels.length : 0;
          if (this && this.options && this.options.mode === 'dataset') {
            return item.dataset.label || '';
          } else if (item.label) {
            return item.label;
          } else if (labelCount > 0 && item.dataIndex < labelCount) {
            return labels[item.dataIndex];
          }
        }
        return '';
      },
      afterTitle: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      beforeBody: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      beforeLabel: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      label(tooltipItem) {
        if (this && this.options && this.options.mode === 'dataset') {
          return tooltipItem.label + ': ' + tooltipItem.formattedValue || tooltipItem.formattedValue;
        }
        let label = tooltipItem.dataset.label || '';
        if (label) {
          label += ': ';
        }
        const value = tooltipItem.formattedValue;
        if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
          label += value;
        }
        return label;
      },
      labelColor(tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
          borderColor: options.borderColor,
          backgroundColor: options.backgroundColor,
          borderWidth: options.borderWidth,
          borderDash: options.borderDash,
          borderDashOffset: options.borderDashOffset,
          borderRadius: 0,
        };
      },
      labelTextColor() {
        return this.options.bodyColor;
      },
      labelPointStyle(tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
          pointStyle: options.pointStyle,
          rotation: options.rotation,
        };
      },
      afterLabel: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      afterBody: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      beforeFooter: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      footer: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB,
      afterFooter: _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB
    }
  },
  defaultRoutes: {
    bodyFont: 'font',
    footerFont: 'font',
    titleFont: 'font'
  },
  descriptors: {
    _scriptable: (name) => name !== 'filter' && name !== 'itemSort' && name !== 'external',
    _indexable: false,
    callbacks: {
      _scriptable: false,
      _indexable: false,
    },
    animation: {
      _fallback: false
    },
    animations: {
      _fallback: 'animation'
    }
  },
  additionalOptionScopes: ['interaction']
};

var plugins = /*#__PURE__*/Object.freeze({
__proto__: null,
Decimation: plugin_decimation,
Filler: plugin_filler,
Legend: plugin_legend,
SubTitle: plugin_subtitle,
Title: plugin_title,
Tooltip: plugin_tooltip
});

const addIfString = (labels, raw, index, addedLabels) => {
  if (typeof raw === 'string') {
    index = labels.push(raw) - 1;
    addedLabels.unshift({index, label: raw});
  } else if (isNaN(raw)) {
    index = null;
  }
  return index;
};
function findOrAddLabel(labels, raw, index, addedLabels) {
  const first = labels.indexOf(raw);
  if (first === -1) {
    return addIfString(labels, raw, index, addedLabels);
  }
  const last = labels.lastIndexOf(raw);
  return first !== last ? index : first;
}
const validIndex = (index, max) => index === null ? null : (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(Math.round(index), 0, max);
class CategoryScale extends Scale {
  constructor(cfg) {
    super(cfg);
    this._startValue = undefined;
    this._valueRange = 0;
    this._addedLabels = [];
  }
  init(scaleOptions) {
    const added = this._addedLabels;
    if (added.length) {
      const labels = this.getLabels();
      for (const {index, label} of added) {
        if (labels[index] === label) {
          labels.splice(index, 1);
        }
      }
      this._addedLabels = [];
    }
    super.init(scaleOptions);
  }
  parse(raw, index) {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(raw)) {
      return null;
    }
    const labels = this.getLabels();
    index = isFinite(index) && labels[index] === raw ? index
      : findOrAddLabel(labels, raw, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(index, raw), this._addedLabels);
    return validIndex(index, labels.length - 1);
  }
  determineDataLimits() {
    const {minDefined, maxDefined} = this.getUserBounds();
    let {min, max} = this.getMinMax(true);
    if (this.options.bounds === 'ticks') {
      if (!minDefined) {
        min = 0;
      }
      if (!maxDefined) {
        max = this.getLabels().length - 1;
      }
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const min = this.min;
    const max = this.max;
    const offset = this.options.offset;
    const ticks = [];
    let labels = this.getLabels();
    labels = (min === 0 && max === labels.length - 1) ? labels : labels.slice(min, max + 1);
    this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
    this._startValue = this.min - (offset ? 0.5 : 0);
    for (let value = min; value <= max; value++) {
      ticks.push({value});
    }
    return ticks;
  }
  getLabelForValue(value) {
    const labels = this.getLabels();
    if (value >= 0 && value < labels.length) {
      return labels[value];
    }
    return value;
  }
  configure() {
    super.configure();
    if (!this.isHorizontal()) {
      this._reversePixels = !this._reversePixels;
    }
  }
  getPixelForValue(value) {
    if (typeof value !== 'number') {
      value = this.parse(value);
    }
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getPixelForTick(index) {
    const ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getValueForPixel(pixel) {
    return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
CategoryScale.id = 'category';
CategoryScale.defaults = {
  ticks: {
    callback: CategoryScale.prototype.getLabelForValue
  }
};

function generateTicks$1(generationOptions, dataRange) {
  const ticks = [];
  const MIN_SPACING = 1e-14;
  const {bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds} = generationOptions;
  const unit = step || 1;
  const maxSpaces = maxTicks - 1;
  const {min: rmin, max: rmax} = dataRange;
  const minDefined = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(min);
  const maxDefined = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(max);
  const countDefined = !(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(count);
  const minSpacing = (rmax - rmin) / (maxDigits + 1);
  let spacing = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aE)((rmax - rmin) / maxSpaces / unit) * unit;
  let factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
    return [{value: rmin}, {value: rmax}];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxSpaces) {
    spacing = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aE)(numSpaces * spacing / maxSpaces / unit) * unit;
  }
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(precision)) {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  if (bounds === 'ticks') {
    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing;
  } else {
    niceMin = rmin;
    niceMax = rmax;
  }
  if (minDefined && maxDefined && step && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aF)((max - min) / step, spacing / 1000)) {
    numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
    spacing = (max - min) / numSpaces;
    niceMin = min;
    niceMax = max;
  } else if (countDefined) {
    niceMin = minDefined ? min : niceMin;
    niceMax = maxDefined ? max : niceMax;
    numSpaces = count - 1;
    spacing = (niceMax - niceMin) / numSpaces;
  } else {
    numSpaces = (niceMax - niceMin) / spacing;
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aG)(numSpaces, Math.round(numSpaces), spacing / 1000)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }
  }
  const decimalPlaces = Math.max(
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aH)(spacing),
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aH)(niceMin)
  );
  factor = Math.pow(10, (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(precision) ? decimalPlaces : precision);
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  let j = 0;
  if (minDefined) {
    if (includeBounds && niceMin !== min) {
      ticks.push({value: min});
      if (niceMin < min) {
        j++;
      }
      if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aG)(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
        j++;
      }
    } else if (niceMin < min) {
      j++;
    }
  }
  for (; j < numSpaces; ++j) {
    ticks.push({value: Math.round((niceMin + j * spacing) * factor) / factor});
  }
  if (maxDefined && includeBounds && niceMax !== max) {
    if (ticks.length && (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aG)(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
      ticks[ticks.length - 1].value = max;
    } else {
      ticks.push({value: max});
    }
  } else if (!maxDefined || niceMax === max) {
    ticks.push({value: niceMax});
  }
  return ticks;
}
function relativeLabelSize(value, minSpacing, {horizontal, minRotation}) {
  const rad = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(minRotation);
  const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 0.001;
  const length = 0.75 * minSpacing * ('' + value).length;
  return Math.min(minSpacing / ratio, length);
}
class LinearScaleBase extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = undefined;
    this.end = undefined;
    this._startValue = undefined;
    this._endValue = undefined;
    this._valueRange = 0;
  }
  parse(raw, index) {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(raw)) {
      return null;
    }
    if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
      return null;
    }
    return +raw;
  }
  handleTickRangeOptions() {
    const {beginAtZero} = this.options;
    const {minDefined, maxDefined} = this.getUserBounds();
    let {min, max} = this;
    const setMin = v => (min = minDefined ? min : v);
    const setMax = v => (max = maxDefined ? max : v);
    if (beginAtZero) {
      const minSign = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(min);
      const maxSign = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s)(max);
      if (minSign < 0 && maxSign < 0) {
        setMax(0);
      } else if (minSign > 0 && maxSign > 0) {
        setMin(0);
      }
    }
    if (min === max) {
      let offset = 1;
      if (max >= Number.MAX_SAFE_INTEGER || min <= Number.MIN_SAFE_INTEGER) {
        offset = Math.abs(max * 0.05);
      }
      setMax(max + offset);
      if (!beginAtZero) {
        setMin(min - offset);
      }
    }
    this.min = min;
    this.max = max;
  }
  getTickLimit() {
    const tickOpts = this.options.ticks;
    let {maxTicksLimit, stepSize} = tickOpts;
    let maxTicks;
    if (stepSize) {
      maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
      if (maxTicks > 1000) {
        console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
        maxTicks = 1000;
      }
    } else {
      maxTicks = this.computeTickLimit();
      maxTicksLimit = maxTicksLimit || 11;
    }
    if (maxTicksLimit) {
      maxTicks = Math.min(maxTicksLimit, maxTicks);
    }
    return maxTicks;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const opts = this.options;
    const tickOpts = opts.ticks;
    let maxTicks = this.getTickLimit();
    maxTicks = Math.max(2, maxTicks);
    const numericGeneratorOptions = {
      maxTicks,
      bounds: opts.bounds,
      min: opts.min,
      max: opts.max,
      precision: tickOpts.precision,
      step: tickOpts.stepSize,
      count: tickOpts.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: tickOpts.minRotation || 0,
      includeBounds: tickOpts.includeBounds !== false
    };
    const dataRange = this._range || this;
    const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
    if (opts.bounds === 'ticks') {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aD)(ticks, this, 'value');
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  configure() {
    const ticks = this.ticks;
    let start = this.min;
    let end = this.max;
    super.configure();
    if (this.options.offset && ticks.length) {
      const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
      start -= offset;
      end += offset;
    }
    this._startValue = start;
    this._endValue = end;
    this._valueRange = end - start;
  }
  getLabelForValue(value) {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o)(value, this.chart.options.locale, this.options.ticks.format);
  }
}

class LinearScale extends LinearScaleBase {
  determineDataLimits() {
    const {min, max} = this.getMinMax(true);
    this.min = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) ? min : 0;
    this.max = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) ? max : 1;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const horizontal = this.isHorizontal();
    const length = horizontal ? this.width : this.height;
    const minRotation = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.options.ticks.minRotation);
    const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 0.001;
    const tickFont = this._resolveTickFontOptions(0);
    return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
  }
  getPixelForValue(value) {
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
  }
}
LinearScale.id = 'linear';
LinearScale.defaults = {
  ticks: {
    callback: Ticks.formatters.numeric
  }
};

function isMajor(tickVal) {
  const remain = tickVal / (Math.pow(10, Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(tickVal))));
  return remain === 1;
}
function generateTicks(generationOptions, dataRange) {
  const endExp = Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(dataRange.max));
  const endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
  const ticks = [];
  let tickVal = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(generationOptions.min, Math.pow(10, Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(dataRange.min))));
  let exp = Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(tickVal));
  let significand = Math.floor(tickVal / Math.pow(10, exp));
  let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  do {
    ticks.push({value: tickVal, major: isMajor(tickVal)});
    ++significand;
    if (significand === 10) {
      significand = 1;
      ++exp;
      precision = exp >= 0 ? 1 : precision;
    }
    tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
  } while (exp < endExp || (exp === endExp && significand < endSignificand));
  const lastTick = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N)(generationOptions.max, tickVal);
  ticks.push({value: lastTick, major: isMajor(tickVal)});
  return ticks;
}
class LogarithmicScale extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = undefined;
    this.end = undefined;
    this._startValue = undefined;
    this._valueRange = 0;
  }
  parse(raw, index) {
    const value = LinearScaleBase.prototype.parse.apply(this, [raw, index]);
    if (value === 0) {
      this._zero = true;
      return undefined;
    }
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(value) && value > 0 ? value : null;
  }
  determineDataLimits() {
    const {min, max} = this.getMinMax(true);
    this.min = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) ? Math.max(0, min) : null;
    this.max = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) ? Math.max(0, max) : null;
    if (this.options.beginAtZero) {
      this._zero = true;
    }
    this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const {minDefined, maxDefined} = this.getUserBounds();
    let min = this.min;
    let max = this.max;
    const setMin = v => (min = minDefined ? min : v);
    const setMax = v => (max = maxDefined ? max : v);
    const exp = (v, m) => Math.pow(10, Math.floor((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(v)) + m);
    if (min === max) {
      if (min <= 0) {
        setMin(1);
        setMax(10);
      } else {
        setMin(exp(min, -1));
        setMax(exp(max, +1));
      }
    }
    if (min <= 0) {
      setMin(exp(max, -1));
    }
    if (max <= 0) {
      setMax(exp(min, +1));
    }
    if (this._zero && this.min !== this._suggestedMin && min === exp(this.min, 0)) {
      setMin(exp(min, -1));
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const opts = this.options;
    const generationOptions = {
      min: this._userMin,
      max: this._userMax
    };
    const ticks = generateTicks(generationOptions, this);
    if (opts.bounds === 'ticks') {
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aD)(ticks, this, 'value');
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  getLabelForValue(value) {
    return value === undefined
      ? '0'
      : (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o)(value, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const start = this.min;
    super.configure();
    this._startValue = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(start);
    this._valueRange = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(this.max) - (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(start);
  }
  getPixelForValue(value) {
    if (value === undefined || value === 0) {
      value = this.min;
    }
    if (value === null || isNaN(value)) {
      return NaN;
    }
    return this.getPixelForDecimal(value === this.min
      ? 0
      : ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L)(value) - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    const decimal = this.getDecimalForPixel(pixel);
    return Math.pow(10, this._startValue + decimal * this._valueRange);
  }
}
LogarithmicScale.id = 'logarithmic';
LogarithmicScale.defaults = {
  ticks: {
    callback: Ticks.formatters.logarithmic,
    major: {
      enabled: true
    }
  }
};

function getTickBackdropHeight(opts) {
  const tickOpts = opts.ticks;
  if (tickOpts.display && opts.display) {
    const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(tickOpts.backdropPadding);
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(tickOpts.font && tickOpts.font.size, _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.d.font.size) + padding.height;
  }
  return 0;
}
function measureLabelSize(ctx, font, label) {
  label = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b)(label) ? label : [label];
  return {
    w: (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aI)(ctx, font.string, label),
    h: label.length * font.lineHeight
  };
}
function determineLimits(angle, pos, size, min, max) {
  if (angle === min || angle === max) {
    return {
      start: pos - (size / 2),
      end: pos + (size / 2)
    };
  } else if (angle < min || angle > max) {
    return {
      start: pos - size,
      end: pos
    };
  }
  return {
    start: pos,
    end: pos + size
  };
}
function fitWithPointLabels(scale) {
  const orig = {
    l: scale.left + scale._padding.left,
    r: scale.right - scale._padding.right,
    t: scale.top + scale._padding.top,
    b: scale.bottom - scale._padding.bottom
  };
  const limits = Object.assign({}, orig);
  const labelSizes = [];
  const padding = [];
  const valueCount = scale._pointLabels.length;
  const pointLabelOpts = scale.options.pointLabels;
  const additionalAngle = pointLabelOpts.centerPointLabels ? _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P / valueCount : 0;
  for (let i = 0; i < valueCount; i++) {
    const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
    padding[i] = opts.padding;
    const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
    const plFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(opts.font);
    const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
    labelSizes[i] = textSize;
    const angleRadians = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw)(scale.getIndexAngle(i) + additionalAngle);
    const angle = Math.round((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.R)(angleRadians));
    const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
    const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
    updateLimits(limits, orig, angleRadians, hLimits, vLimits);
  }
  scale.setCenterPoint(
    orig.l - limits.l,
    limits.r - orig.r,
    orig.t - limits.t,
    limits.b - orig.b
  );
  scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
  const sin = Math.abs(Math.sin(angle));
  const cos = Math.abs(Math.cos(angle));
  let x = 0;
  let y = 0;
  if (hLimits.start < orig.l) {
    x = (orig.l - hLimits.start) / sin;
    limits.l = Math.min(limits.l, orig.l - x);
  } else if (hLimits.end > orig.r) {
    x = (hLimits.end - orig.r) / sin;
    limits.r = Math.max(limits.r, orig.r + x);
  }
  if (vLimits.start < orig.t) {
    y = (orig.t - vLimits.start) / cos;
    limits.t = Math.min(limits.t, orig.t - y);
  } else if (vLimits.end > orig.b) {
    y = (vLimits.end - orig.b) / cos;
    limits.b = Math.max(limits.b, orig.b + y);
  }
}
function buildPointLabelItems(scale, labelSizes, padding) {
  const items = [];
  const valueCount = scale._pointLabels.length;
  const opts = scale.options;
  const extra = getTickBackdropHeight(opts) / 2;
  const outerDistance = scale.drawingArea;
  const additionalAngle = opts.pointLabels.centerPointLabels ? _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P / valueCount : 0;
  for (let i = 0; i < valueCount; i++) {
    const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + padding[i], additionalAngle);
    const angle = Math.round((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.R)((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw)(pointLabelPosition.angle + _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H)));
    const size = labelSizes[i];
    const y = yForAngle(pointLabelPosition.y, size.h, angle);
    const textAlign = getTextAlignForAngle(angle);
    const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
    items.push({
      x: pointLabelPosition.x,
      y,
      textAlign,
      left,
      top: y,
      right: left + size.w,
      bottom: y + size.h
    });
  }
  return items;
}
function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return 'center';
  } else if (angle < 180) {
    return 'left';
  }
  return 'right';
}
function leftForTextAlign(x, w, align) {
  if (align === 'right') {
    x -= w;
  } else if (align === 'center') {
    x -= (w / 2);
  }
  return x;
}
function yForAngle(y, h, angle) {
  if (angle === 90 || angle === 270) {
    y -= (h / 2);
  } else if (angle > 270 || angle < 90) {
    y -= h;
  }
  return y;
}
function drawPointLabels(scale, labelCount) {
  const {ctx, options: {pointLabels}} = scale;
  for (let i = labelCount - 1; i >= 0; i--) {
    const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
    const plFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(optsAtIndex.font);
    const {x, y, textAlign, left, top, right, bottom} = scale._pointLabelItems[i];
    const {backdropColor} = optsAtIndex;
    if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(backdropColor)) {
      const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(optsAtIndex.backdropPadding);
      ctx.fillStyle = backdropColor;
      ctx.fillRect(left - padding.left, top - padding.top, right - left + padding.width, bottom - top + padding.height);
    }
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(
      ctx,
      scale._pointLabels[i],
      x,
      y + (plFont.lineHeight / 2),
      plFont,
      {
        color: optsAtIndex.color,
        textAlign: textAlign,
        textBaseline: 'middle'
      }
    );
  }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
  const {ctx} = scale;
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T);
  } else {
    let pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);
    for (let i = 1; i < labelCount; i++) {
      pointPosition = scale.getPointPosition(i, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount) {
  const ctx = scale.ctx;
  const circular = gridLineOpts.circular;
  const {color, lineWidth} = gridLineOpts;
  if ((!circular && !labelCount) || !color || !lineWidth || radius < 0) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(gridLineOpts.borderDash);
  ctx.lineDashOffset = gridLineOpts.borderDashOffset;
  ctx.beginPath();
  pathRadiusLine(scale, radius, circular, labelCount);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function createPointLabelContext(parent, index, label) {
  return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h)(parent, {
    label,
    index,
    type: 'pointLabel'
  });
}
class RadialLinearScale extends LinearScaleBase {
  constructor(cfg) {
    super(cfg);
    this.xCenter = undefined;
    this.yCenter = undefined;
    this.drawingArea = undefined;
    this._pointLabels = [];
    this._pointLabelItems = [];
  }
  setDimensions() {
    const padding = this._padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(getTickBackdropHeight(this.options) / 2);
    const w = this.width = this.maxWidth - padding.width;
    const h = this.height = this.maxHeight - padding.height;
    this.xCenter = Math.floor(this.left + w / 2 + padding.left);
    this.yCenter = Math.floor(this.top + h / 2 + padding.top);
    this.drawingArea = Math.floor(Math.min(w, h) / 2);
  }
  determineDataLimits() {
    const {min, max} = this.getMinMax(false);
    this.min = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) && !isNaN(min) ? min : 0;
    this.max = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) && !isNaN(max) ? max : 0;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
  }
  generateTickLabels(ticks) {
    LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
    this._pointLabels = this.getLabels()
      .map((value, index) => {
        const label = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(this.options.pointLabels.callback, [value, index], this);
        return label || label === 0 ? label : '';
      })
      .filter((v, i) => this.chart.getDataVisibility(i));
  }
  fit() {
    const opts = this.options;
    if (opts.display && opts.pointLabels.display) {
      fitWithPointLabels(this);
    } else {
      this.setCenterPoint(0, 0, 0, 0);
    }
  }
  setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
    this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
    this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
    this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
  }
  getIndexAngle(index) {
    const angleMultiplier = _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T / (this._pointLabels.length || 1);
    const startAngle = this.options.startAngle || 0;
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw)(index * angleMultiplier + (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(startAngle));
  }
  getDistanceFromCenterForValue(value) {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(value)) {
      return NaN;
    }
    const scalingFactor = this.drawingArea / (this.max - this.min);
    if (this.options.reverse) {
      return (this.max - value) * scalingFactor;
    }
    return (value - this.min) * scalingFactor;
  }
  getValueForDistanceFromCenter(distance) {
    if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(distance)) {
      return NaN;
    }
    const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
  }
  getPointLabelContext(index) {
    const pointLabels = this._pointLabels || [];
    if (index >= 0 && index < pointLabels.length) {
      const pointLabel = pointLabels[index];
      return createPointLabelContext(this.getContext(), index, pointLabel);
    }
  }
  getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
    const angle = this.getIndexAngle(index) - _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H + additionalAngle;
    return {
      x: Math.cos(angle) * distanceFromCenter + this.xCenter,
      y: Math.sin(angle) * distanceFromCenter + this.yCenter,
      angle
    };
  }
  getPointPositionForValue(index, value) {
    return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
  }
  getBasePosition(index) {
    return this.getPointPositionForValue(index || 0, this.getBaseValue());
  }
  getPointLabelPosition(index) {
    const {left, top, right, bottom} = this._pointLabelItems[index];
    return {
      left,
      top,
      right,
      bottom,
    };
  }
  drawBackground() {
    const {backgroundColor, grid: {circular}} = this.options;
    if (backgroundColor) {
      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
      ctx.closePath();
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.restore();
    }
  }
  drawGrid() {
    const ctx = this.ctx;
    const opts = this.options;
    const {angleLines, grid} = opts;
    const labelCount = this._pointLabels.length;
    let i, offset, position;
    if (opts.pointLabels.display) {
      drawPointLabels(this, labelCount);
    }
    if (grid.display) {
      this.ticks.forEach((tick, index) => {
        if (index !== 0) {
          offset = this.getDistanceFromCenterForValue(tick.value);
          const optsAtIndex = grid.setContext(this.getContext(index - 1));
          drawRadiusLine(this, optsAtIndex, offset, labelCount);
        }
      });
    }
    if (angleLines.display) {
      ctx.save();
      for (i = labelCount - 1; i >= 0; i--) {
        const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
        const {color, lineWidth} = optsAtIndex;
        if (!lineWidth || !color) {
          continue;
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.setLineDash(optsAtIndex.borderDash);
        ctx.lineDashOffset = optsAtIndex.borderDashOffset;
        offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
        position = this.getPointPosition(i, offset);
        ctx.beginPath();
        ctx.moveTo(this.xCenter, this.yCenter);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  drawBorder() {}
  drawLabels() {
    const ctx = this.ctx;
    const opts = this.options;
    const tickOpts = opts.ticks;
    if (!tickOpts.display) {
      return;
    }
    const startAngle = this.getIndexAngle(0);
    let offset, width;
    ctx.save();
    ctx.translate(this.xCenter, this.yCenter);
    ctx.rotate(startAngle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.ticks.forEach((tick, index) => {
      if (index === 0 && !opts.reverse) {
        return;
      }
      const optsAtIndex = tickOpts.setContext(this.getContext(index));
      const tickFont = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z)(optsAtIndex.font);
      offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
      if (optsAtIndex.showLabelBackdrop) {
        ctx.font = tickFont.string;
        width = ctx.measureText(tick.label).width;
        ctx.fillStyle = optsAtIndex.backdropColor;
        const padding = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C)(optsAtIndex.backdropPadding);
        ctx.fillRect(
          -width / 2 - padding.left,
          -offset - tickFont.size / 2 - padding.top,
          width + padding.width,
          tickFont.size + padding.height
        );
      }
      (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X)(ctx, tick.label, 0, -offset, tickFont, {
        color: optsAtIndex.color,
      });
    });
    ctx.restore();
  }
  drawTitle() {}
}
RadialLinearScale.id = 'radialLinear';
RadialLinearScale.defaults = {
  display: true,
  animate: true,
  position: 'chartArea',
  angleLines: {
    display: true,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0.0
  },
  grid: {
    circular: false
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: true,
    callback: Ticks.formatters.numeric
  },
  pointLabels: {
    backdropColor: undefined,
    backdropPadding: 2,
    display: true,
    font: {
      size: 10
    },
    callback(label) {
      return label;
    },
    padding: 5,
    centerPointLabels: false
  }
};
RadialLinearScale.defaultRoutes = {
  'angleLines.color': 'borderColor',
  'pointLabels.color': 'color',
  'ticks.color': 'color'
};
RadialLinearScale.descriptors = {
  angleLines: {
    _fallback: 'grid'
  }
};

const INTERVALS = {
  millisecond: {common: true, size: 1, steps: 1000},
  second: {common: true, size: 1000, steps: 60},
  minute: {common: true, size: 60000, steps: 60},
  hour: {common: true, size: 3600000, steps: 24},
  day: {common: true, size: 86400000, steps: 30},
  week: {common: false, size: 604800000, steps: 4},
  month: {common: true, size: 2.628e9, steps: 12},
  quarter: {common: false, size: 7.884e9, steps: 4},
  year: {common: true, size: 3.154e10}
};
const UNITS = (Object.keys(INTERVALS));
function sorter(a, b) {
  return a - b;
}
function parse(scale, input) {
  if ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k)(input)) {
    return null;
  }
  const adapter = scale._adapter;
  const {parser, round, isoWeekday} = scale._parseOpts;
  let value = input;
  if (typeof parser === 'function') {
    value = parser(value);
  }
  if (!(0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(value)) {
    value = typeof parser === 'string'
      ? adapter.parse(value, parser)
      : adapter.parse(value);
  }
  if (value === null) {
    return null;
  }
  if (round) {
    value = round === 'week' && ((0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q)(isoWeekday) || isoWeekday === true)
      ? adapter.startOf(value, 'isoWeek', isoWeekday)
      : adapter.startOf(value, round);
  }
  return +value;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const ilen = UNITS.length;
  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const interval = INTERVALS[UNITS[i]];
    const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
    if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
  for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
    const unit = UNITS[i];
    if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const {lo, hi} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aK)(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
function setMajorTicks(scale, ticks, map, majorUnit) {
  const adapter = scale._adapter;
  const first = +adapter.startOf(ticks[0].value, majorUnit);
  const last = ticks[ticks.length - 1].value;
  let major, index;
  for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index = map[major];
    if (index >= 0) {
      ticks[index].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  const map = {};
  const ilen = values.length;
  let i, value;
  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map[value] = i;
    ticks.push({
      value,
      major: false
    });
  }
  return (ilen === 0 || !majorUnit) ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}
class TimeScale extends Scale {
  constructor(props) {
    super(props);
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
    this._unit = 'day';
    this._majorUnit = undefined;
    this._offsets = {};
    this._normalized = false;
    this._parseOpts = undefined;
  }
  init(scaleOpts, opts) {
    const time = scaleOpts.time || (scaleOpts.time = {});
    const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
    (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a9)(time.displayFormats, adapter.formats());
    this._parseOpts = {
      parser: time.parser,
      round: time.round,
      isoWeekday: time.isoWeekday
    };
    super.init(scaleOpts);
    this._normalized = opts.normalized;
  }
  parse(raw, index) {
    if (raw === undefined) {
      return null;
    }
    return parse(this, raw);
  }
  beforeLayout() {
    super.beforeLayout();
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const options = this.options;
    const adapter = this._adapter;
    const unit = options.time.unit || 'day';
    let {min, max, minDefined, maxDefined} = this.getUserBounds();
    function _applyBounds(bounds) {
      if (!minDefined && !isNaN(bounds.min)) {
        min = Math.min(min, bounds.min);
      }
      if (!maxDefined && !isNaN(bounds.max)) {
        max = Math.max(max, bounds.max);
      }
    }
    if (!minDefined || !maxDefined) {
      _applyBounds(this._getLabelBounds());
      if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
        _applyBounds(this.getMinMax(false));
      }
    }
    min = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
    max = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g)(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
    this.min = Math.min(min, max - 1);
    this.max = Math.max(min + 1, max);
  }
  _getLabelBounds() {
    const arr = this.getLabelTimestamps();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    if (arr.length) {
      min = arr[0];
      max = arr[arr.length - 1];
    }
    return {min, max};
  }
  buildTicks() {
    const options = this.options;
    const timeOpts = options.time;
    const tickOpts = options.ticks;
    const timestamps = tickOpts.source === 'labels' ? this.getLabelTimestamps() : this._generate();
    if (options.bounds === 'ticks' && timestamps.length) {
      this.min = this._userMin || timestamps[0];
      this.max = this._userMax || timestamps[timestamps.length - 1];
    }
    const min = this.min;
    const max = this.max;
    const ticks = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aJ)(timestamps, min, max);
    this._unit = timeOpts.unit || (tickOpts.autoSkip
      ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min))
      : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
    this._majorUnit = !tickOpts.major.enabled || this._unit === 'year' ? undefined
      : determineMajorUnit(this._unit);
    this.initOffsets(timestamps);
    if (options.reverse) {
      ticks.reverse();
    }
    return ticksFromTimestamps(this, ticks, this._majorUnit);
  }
  initOffsets(timestamps) {
    let start = 0;
    let end = 0;
    let first, last;
    if (this.options.offset && timestamps.length) {
      first = this.getDecimalForValue(timestamps[0]);
      if (timestamps.length === 1) {
        start = 1 - first;
      } else {
        start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
      }
      last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
      if (timestamps.length === 1) {
        end = last;
      } else {
        end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
      }
    }
    const limit = timestamps.length < 3 ? 0.5 : 0.25;
    start = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(start, 0, limit);
    end = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w)(end, 0, limit);
    this._offsets = {start, end, factor: 1 / (start + 1 + end)};
  }
  _generate() {
    const adapter = this._adapter;
    const min = this.min;
    const max = this.max;
    const options = this.options;
    const timeOpts = options.time;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
    const stepSize = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)(timeOpts.stepSize, 1);
    const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
    const hasWeekday = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q)(weekday) || weekday === true;
    const ticks = {};
    let first = min;
    let time, count;
    if (hasWeekday) {
      first = +adapter.startOf(first, 'isoWeek', weekday);
    }
    first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
    if (adapter.diff(max, min, minor) > 100000 * stepSize) {
      throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
    }
    const timestamps = options.ticks.source === 'data' && this.getDataTimestamps();
    for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }
    if (time === max || options.bounds === 'ticks' || count === 1) {
      addTick(ticks, time, timestamps);
    }
    return Object.keys(ticks).sort((a, b) => a - b).map(x => +x);
  }
  getLabelForValue(value) {
    const adapter = this._adapter;
    const timeOpts = this.options.time;
    if (timeOpts.tooltipFormat) {
      return adapter.format(value, timeOpts.tooltipFormat);
    }
    return adapter.format(value, timeOpts.displayFormats.datetime);
  }
  _tickFormatFunction(time, index, ticks, format) {
    const options = this.options;
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const majorUnit = this._majorUnit;
    const minorFormat = unit && formats[unit];
    const majorFormat = majorUnit && formats[majorUnit];
    const tick = ticks[index];
    const major = majorUnit && majorFormat && tick && tick.major;
    const label = this._adapter.format(time, format || (major ? majorFormat : minorFormat));
    const formatter = options.ticks.callback;
    return formatter ? (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O)(formatter, [label, index, ticks], this) : label;
  }
  generateTickLabels(ticks) {
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      tick.label = this._tickFormatFunction(tick.value, i, ticks);
    }
  }
  getDecimalForValue(value) {
    return value === null ? NaN : (value - this.min) / (this.max - this.min);
  }
  getPixelForValue(value) {
    const offsets = this._offsets;
    const pos = this.getDecimalForValue(value);
    return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return this.min + pos * (this.max - this.min);
  }
  _getLabelSize(label) {
    const ticksOpts = this.options.ticks;
    const tickLabelWidth = this.ctx.measureText(label).width;
    const angle = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t)(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
    const cosRotation = Math.cos(angle);
    const sinRotation = Math.sin(angle);
    const tickFontSize = this._resolveTickFontOptions(0).size;
    return {
      w: (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation),
      h: (tickLabelWidth * sinRotation) + (tickFontSize * cosRotation)
    };
  }
  _getLabelCapacity(exampleTime) {
    const timeOpts = this.options.time;
    const displayFormats = timeOpts.displayFormats;
    const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
    const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [exampleTime], this._majorUnit), format);
    const size = this._getLabelSize(exampleLabel);
    const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
    return capacity > 0 ? capacity : 1;
  }
  getDataTimestamps() {
    let timestamps = this._cache.data || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const metas = this.getMatchingVisibleMetas();
    if (this._normalized && metas.length) {
      return (this._cache.data = metas[0].controller.getAllParsedValues(this));
    }
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
    }
    return (this._cache.data = this.normalize(timestamps));
  }
  getLabelTimestamps() {
    const timestamps = this._cache.labels || [];
    let i, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const labels = this.getLabels();
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      timestamps.push(parse(this, labels[i]));
    }
    return (this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps));
  }
  normalize(values) {
    return (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__._)(values.sort(sorter));
  }
}
TimeScale.id = 'time';
TimeScale.defaults = {
  bounds: 'data',
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: 'millisecond',
    displayFormats: {}
  },
  ticks: {
    source: 'auto',
    major: {
      enabled: false
    }
  }
};

function interpolate(table, val, reverse) {
  let lo = 0;
  let hi = table.length - 1;
  let prevSource, nextSource, prevTarget, nextTarget;
  if (reverse) {
    if (val >= table[lo].pos && val <= table[hi].pos) {
      ({lo, hi} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(table, 'pos', val));
    }
    ({pos: prevSource, time: prevTarget} = table[lo]);
    ({pos: nextSource, time: nextTarget} = table[hi]);
  } else {
    if (val >= table[lo].time && val <= table[hi].time) {
      ({lo, hi} = (0,_chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x)(table, 'time', val));
    }
    ({time: prevSource, pos: prevTarget} = table[lo]);
    ({time: nextSource, pos: nextTarget} = table[hi]);
  }
  const span = nextSource - prevSource;
  return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
class TimeSeriesScale extends TimeScale {
  constructor(props) {
    super(props);
    this._table = [];
    this._minPos = undefined;
    this._tableRange = undefined;
  }
  initOffsets() {
    const timestamps = this._getTimestampsForTable();
    const table = this._table = this.buildLookupTable(timestamps);
    this._minPos = interpolate(table, this.min);
    this._tableRange = interpolate(table, this.max) - this._minPos;
    super.initOffsets(timestamps);
  }
  buildLookupTable(timestamps) {
    const {min, max} = this;
    const items = [];
    const table = [];
    let i, ilen, prev, curr, next;
    for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
      curr = timestamps[i];
      if (curr >= min && curr <= max) {
        items.push(curr);
      }
    }
    if (items.length < 2) {
      return [
        {time: min, pos: 0},
        {time: max, pos: 1}
      ];
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      next = items[i + 1];
      prev = items[i - 1];
      curr = items[i];
      if (Math.round((next + prev) / 2) !== curr) {
        table.push({time: curr, pos: i / (ilen - 1)});
      }
    }
    return table;
  }
  _getTimestampsForTable() {
    let timestamps = this._cache.all || [];
    if (timestamps.length) {
      return timestamps;
    }
    const data = this.getDataTimestamps();
    const label = this.getLabelTimestamps();
    if (data.length && label.length) {
      timestamps = this.normalize(data.concat(label));
    } else {
      timestamps = data.length ? data : label;
    }
    timestamps = this._cache.all = timestamps;
    return timestamps;
  }
  getDecimalForValue(value) {
    return (interpolate(this._table, value) - this._minPos) / this._tableRange;
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
  }
}
TimeSeriesScale.id = 'timeseries';
TimeSeriesScale.defaults = TimeScale.defaults;

var scales = /*#__PURE__*/Object.freeze({
__proto__: null,
CategoryScale: CategoryScale,
LinearScale: LinearScale,
LogarithmicScale: LogarithmicScale,
RadialLinearScale: RadialLinearScale,
TimeScale: TimeScale,
TimeSeriesScale: TimeSeriesScale
});

const registerables = [
  controllers,
  elements,
  plugins,
  scales,
];




/***/ }),

/***/ "./node_modules/chart.js/dist/chunks/helpers.segment.js":
/*!**************************************************************!*\
  !*** ./node_modules/chart.js/dist/chunks/helpers.segment.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ _toLeftRightCenter),
/* harmony export */   "A": () => (/* binding */ _rlookupByKey),
/* harmony export */   "B": () => (/* binding */ getAngleFromPoint),
/* harmony export */   "C": () => (/* binding */ toPadding),
/* harmony export */   "D": () => (/* binding */ each),
/* harmony export */   "E": () => (/* binding */ getMaximumSize),
/* harmony export */   "F": () => (/* binding */ _getParentNode),
/* harmony export */   "G": () => (/* binding */ readUsedSize),
/* harmony export */   "H": () => (/* binding */ HALF_PI),
/* harmony export */   "I": () => (/* binding */ throttled),
/* harmony export */   "J": () => (/* binding */ supportsEventListenerOptions),
/* harmony export */   "K": () => (/* binding */ _isDomSupported),
/* harmony export */   "L": () => (/* binding */ log10),
/* harmony export */   "M": () => (/* binding */ _factorize),
/* harmony export */   "N": () => (/* binding */ finiteOrDefault),
/* harmony export */   "O": () => (/* binding */ callback),
/* harmony export */   "P": () => (/* binding */ PI),
/* harmony export */   "Q": () => (/* binding */ _addGrace),
/* harmony export */   "R": () => (/* binding */ toDegrees),
/* harmony export */   "S": () => (/* binding */ _measureText),
/* harmony export */   "T": () => (/* binding */ TAU),
/* harmony export */   "U": () => (/* binding */ _int16Range),
/* harmony export */   "V": () => (/* binding */ _alignPixel),
/* harmony export */   "W": () => (/* binding */ clipArea),
/* harmony export */   "X": () => (/* binding */ renderText),
/* harmony export */   "Y": () => (/* binding */ unclipArea),
/* harmony export */   "Z": () => (/* binding */ toFont),
/* harmony export */   "_": () => (/* binding */ _arrayUnique),
/* harmony export */   "a": () => (/* binding */ resolve),
/* harmony export */   "a$": () => (/* binding */ _angleDiff),
/* harmony export */   "a0": () => (/* binding */ _alignStartEnd),
/* harmony export */   "a1": () => (/* binding */ overrides),
/* harmony export */   "a2": () => (/* binding */ merge),
/* harmony export */   "a3": () => (/* binding */ _capitalize),
/* harmony export */   "a4": () => (/* binding */ descriptors),
/* harmony export */   "a5": () => (/* binding */ isFunction),
/* harmony export */   "a6": () => (/* binding */ _attachContext),
/* harmony export */   "a7": () => (/* binding */ _createResolver),
/* harmony export */   "a8": () => (/* binding */ _descriptors),
/* harmony export */   "a9": () => (/* binding */ mergeIf),
/* harmony export */   "aA": () => (/* binding */ restoreTextDirection),
/* harmony export */   "aB": () => (/* binding */ noop),
/* harmony export */   "aC": () => (/* binding */ distanceBetweenPoints),
/* harmony export */   "aD": () => (/* binding */ _setMinAndMaxByKey),
/* harmony export */   "aE": () => (/* binding */ niceNum),
/* harmony export */   "aF": () => (/* binding */ almostWhole),
/* harmony export */   "aG": () => (/* binding */ almostEquals),
/* harmony export */   "aH": () => (/* binding */ _decimalPlaces),
/* harmony export */   "aI": () => (/* binding */ _longestText),
/* harmony export */   "aJ": () => (/* binding */ _filterBetween),
/* harmony export */   "aK": () => (/* binding */ _lookup),
/* harmony export */   "aL": () => (/* binding */ getHoverColor),
/* harmony export */   "aM": () => (/* binding */ clone$1),
/* harmony export */   "aN": () => (/* binding */ _merger),
/* harmony export */   "aO": () => (/* binding */ _mergerIf),
/* harmony export */   "aP": () => (/* binding */ _deprecated),
/* harmony export */   "aQ": () => (/* binding */ toFontString),
/* harmony export */   "aR": () => (/* binding */ splineCurve),
/* harmony export */   "aS": () => (/* binding */ splineCurveMonotone),
/* harmony export */   "aT": () => (/* binding */ getStyle),
/* harmony export */   "aU": () => (/* binding */ fontString),
/* harmony export */   "aV": () => (/* binding */ toLineHeight),
/* harmony export */   "aW": () => (/* binding */ PITAU),
/* harmony export */   "aX": () => (/* binding */ INFINITY),
/* harmony export */   "aY": () => (/* binding */ RAD_PER_DEG),
/* harmony export */   "aZ": () => (/* binding */ QUARTER_PI),
/* harmony export */   "a_": () => (/* binding */ TWO_THIRDS_PI),
/* harmony export */   "aa": () => (/* binding */ uid),
/* harmony export */   "ab": () => (/* binding */ debounce),
/* harmony export */   "ac": () => (/* binding */ retinaScale),
/* harmony export */   "ad": () => (/* binding */ clearCanvas),
/* harmony export */   "ae": () => (/* binding */ setsEqual),
/* harmony export */   "af": () => (/* binding */ _elementsEqual),
/* harmony export */   "ag": () => (/* binding */ _isClickEvent),
/* harmony export */   "ah": () => (/* binding */ _isBetween),
/* harmony export */   "ai": () => (/* binding */ _readValueToProps),
/* harmony export */   "aj": () => (/* binding */ _updateBezierControlPoints),
/* harmony export */   "ak": () => (/* binding */ _computeSegments),
/* harmony export */   "al": () => (/* binding */ _boundSegments),
/* harmony export */   "am": () => (/* binding */ _steppedInterpolation),
/* harmony export */   "an": () => (/* binding */ _bezierInterpolation),
/* harmony export */   "ao": () => (/* binding */ _pointInLine),
/* harmony export */   "ap": () => (/* binding */ _steppedLineTo),
/* harmony export */   "aq": () => (/* binding */ _bezierCurveTo),
/* harmony export */   "ar": () => (/* binding */ drawPoint),
/* harmony export */   "as": () => (/* binding */ addRoundedRectPath),
/* harmony export */   "at": () => (/* binding */ toTRBL),
/* harmony export */   "au": () => (/* binding */ toTRBLCorners),
/* harmony export */   "av": () => (/* binding */ _boundSegment),
/* harmony export */   "aw": () => (/* binding */ _normalizeAngle),
/* harmony export */   "ax": () => (/* binding */ getRtlAdapter),
/* harmony export */   "ay": () => (/* binding */ overrideTextDirection),
/* harmony export */   "az": () => (/* binding */ _textX),
/* harmony export */   "b": () => (/* binding */ isArray),
/* harmony export */   "c": () => (/* binding */ color),
/* harmony export */   "d": () => (/* binding */ defaults),
/* harmony export */   "e": () => (/* binding */ effects),
/* harmony export */   "f": () => (/* binding */ resolveObjectKey),
/* harmony export */   "g": () => (/* binding */ isNumberFinite),
/* harmony export */   "h": () => (/* binding */ createContext),
/* harmony export */   "i": () => (/* binding */ isObject),
/* harmony export */   "j": () => (/* binding */ defined),
/* harmony export */   "k": () => (/* binding */ isNullOrUndef),
/* harmony export */   "l": () => (/* binding */ listenArrayEvents),
/* harmony export */   "m": () => (/* binding */ toPercentage),
/* harmony export */   "n": () => (/* binding */ toDimension),
/* harmony export */   "o": () => (/* binding */ formatNumber),
/* harmony export */   "p": () => (/* binding */ _angleBetween),
/* harmony export */   "q": () => (/* binding */ isNumber),
/* harmony export */   "r": () => (/* binding */ requestAnimFrame),
/* harmony export */   "s": () => (/* binding */ sign),
/* harmony export */   "t": () => (/* binding */ toRadians),
/* harmony export */   "u": () => (/* binding */ unlistenArrayEvents),
/* harmony export */   "v": () => (/* binding */ valueOrDefault),
/* harmony export */   "w": () => (/* binding */ _limitValue),
/* harmony export */   "x": () => (/* binding */ _lookupByKey),
/* harmony export */   "y": () => (/* binding */ getRelativePosition),
/* harmony export */   "z": () => (/* binding */ _isPointInArea)
/* harmony export */ });
/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
function fontString(pixelSize, fontStyle, fontFamily) {
  return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
}
const requestAnimFrame = (function() {
  if (typeof window === 'undefined') {
    return function(callback) {
      return callback();
    };
  }
  return window.requestAnimationFrame;
}());
function throttled(fn, thisArg, updateFn) {
  const updateArgs = updateFn || ((args) => Array.prototype.slice.call(args));
  let ticking = false;
  let args = [];
  return function(...rest) {
    args = updateArgs(rest);
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, args);
      });
    }
  };
}
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay, args);
    } else {
      fn.apply(this, args);
    }
    return delay;
  };
}
const _toLeftRightCenter = (align) => align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
const _alignStartEnd = (align, start, end) => align === 'start' ? start : align === 'end' ? end : (start + end) / 2;
const _textX = (align, left, right, rtl) => {
  const check = rtl ? 'left' : 'right';
  return align === check ? right : align === 'center' ? (left + right) / 2 : left;
};

function noop() {}
const uid = (function() {
  let id = 0;
  return function() {
    return id++;
  };
}());
function isNullOrUndef(value) {
  return value === null || typeof value === 'undefined';
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
const isNumberFinite = (value) => (typeof value === 'number' || value instanceof Number) && isFinite(+value);
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}
const toPercentage = (value, dimension) =>
  typeof value === 'string' && value.endsWith('%') ?
    parseFloat(value) / 100
    : value / dimension;
const toDimension = (value, dimension) =>
  typeof value === 'string' && value.endsWith('%') ?
    parseFloat(value) / 100 * dimension
    : +value;
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === 'function') {
    return fn.apply(thisArg, args);
  }
}
function each(loopable, fn, thisArg, reverse) {
  let i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    if (reverse) {
      for (i = len - 1; i >= 0; i--) {
        fn.call(thisArg, loopable[i], i);
      }
    } else {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone$1(source) {
  if (isArray(source)) {
    return source.map(clone$1);
  }
  if (isObject(source)) {
    const target = Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone$1(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key) {
  return ['__proto__', 'prototype', 'constructor'].indexOf(key) === -1;
}
function _merger(key, target, source, options) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone$1(sval);
  }
}
function merge(target, source, options) {
  const sources = isArray(source) ? source : [source];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  const merger = options.merger || _merger;
  for (let i = 0; i < ilen; ++i) {
    source = sources[i];
    if (!isObject(source)) {
      continue;
    }
    const keys = Object.keys(source);
    for (let k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, source, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {merger: _mergerIf});
}
function _mergerIf(key, target, source) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone$1(sval);
  }
}
function _deprecated(scope, value, previous, current) {
  if (value !== undefined) {
    console.warn(scope + ': "' + previous +
			'" is deprecated. Please use "' + current + '" instead');
  }
}
const emptyString = '';
const dot = '.';
function indexOfDotOrLength(key, start) {
  const idx = key.indexOf(dot, start);
  return idx === -1 ? key.length : idx;
}
function resolveObjectKey(obj, key) {
  if (key === emptyString) {
    return obj;
  }
  let pos = 0;
  let idx = indexOfDotOrLength(key, pos);
  while (obj && idx > pos) {
    obj = obj[key.substr(pos, idx - pos)];
    pos = idx + 1;
    idx = indexOfDotOrLength(key, pos);
  }
  return obj;
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const defined = (value) => typeof value !== 'undefined';
const isFunction = (value) => typeof value === 'function';
const setsEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
};
function _isClickEvent(e) {
  return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
}

const PI = Math.PI;
const TAU = 2 * PI;
const PITAU = TAU + PI;
const INFINITY = Number.POSITIVE_INFINITY;
const RAD_PER_DEG = PI / 180;
const HALF_PI = PI / 2;
const QUARTER_PI = PI / 4;
const TWO_THIRDS_PI = PI * 2 / 3;
const log10 = Math.log10;
const sign = Math.sign;
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1000) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function almostWhole(x, epsilon) {
  const rounded = Math.round(x);
  return ((rounded - epsilon) <= x) && ((rounded + epsilon) >= x);
}
function _setMinAndMaxByKey(array, target, property) {
  let i, ilen, value;
  for (i = 0, ilen = array.length; i < ilen; i++) {
    value = array[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < (-0.5 * PI)) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a, b) {
  return (a - b + PITAU) % TAU - PI;
}
function _normalizeAngle(a) {
  return (a % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a = _normalizeAngle(angle);
  const s = _normalizeAngle(start);
  const e = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s - a);
  const angleToEnd = _normalizeAngle(e - a);
  const startToAngle = _normalizeAngle(a - s);
  const endToAngle = _normalizeAngle(a - e);
  return a === s || a === e || (sameAngleIsFullCircle && s === e)
    || (angleToStart > angleToEnd && startToAngle < endToAngle);
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}

const atEdge = (t) => t === 0 || t === 1;
const elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
const effects = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => -t * (t - 2),
  easeInOutQuad: t => ((t /= 0.5) < 1)
    ? 0.5 * t * t
    : -0.5 * ((--t) * (t - 2) - 1),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (t -= 1) * t * t + 1,
  easeInOutCubic: t => ((t /= 0.5) < 1)
    ? 0.5 * t * t * t
    : 0.5 * ((t -= 2) * t * t + 2),
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: t => ((t /= 0.5) < 1)
    ? 0.5 * t * t * t * t
    : -0.5 * ((t -= 2) * t * t * t - 2),
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: t => ((t /= 0.5) < 1)
    ? 0.5 * t * t * t * t * t
    : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: t => -Math.cos(t * HALF_PI) + 1,
  easeOutSine: t => Math.sin(t * HALF_PI),
  easeInOutSine: t => -0.5 * (Math.cos(PI * t) - 1),
  easeInExpo: t => (t === 0) ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => (t === 1) ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: t => atEdge(t) ? t : t < 0.5
    ? 0.5 * Math.pow(2, 10 * (t * 2 - 1))
    : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: t => (t >= 1) ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: t => ((t /= 0.5) < 1)
    ? -0.5 * (Math.sqrt(1 - t * t) - 1)
    : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: t => atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
  easeOutElastic: t => atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
  easeInOutElastic(t) {
    const s = 0.1125;
    const p = 0.45;
    return atEdge(t) ? t :
      t < 0.5
        ? 0.5 * elasticIn(t * 2, s, p)
        : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
  },
  easeInBack(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    const s = 1.70158;
    return (t -= 1) * t * ((s + 1) * t + s) + 1;
  },
  easeInOutBack(t) {
    let s = 1.70158;
    if ((t /= 0.5) < 1) {
      return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
  },
  easeInBounce: t => 1 - effects.easeOutBounce(1 - t),
  easeOutBounce(t) {
    const m = 7.5625;
    const d = 2.75;
    if (t < (1 / d)) {
      return m * t * t;
    }
    if (t < (2 / d)) {
      return m * (t -= (1.5 / d)) * t + 0.75;
    }
    if (t < (2.5 / d)) {
      return m * (t -= (2.25 / d)) * t + 0.9375;
    }
    return m * (t -= (2.625 / d)) * t + 0.984375;
  },
  easeInOutBounce: t => (t < 0.5)
    ? effects.easeInBounce(t * 2) * 0.5
    : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5,
};

/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
const map = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
const hex = '0123456789ABCDEF';
const h1 = (b) => hex[b & 0xF];
const h2 = (b) => hex[(b & 0xF0) >> 4] + hex[b & 0xF];
const eq = (b) => (((b & 0xF0) >> 4) === (b & 0xF));
function isShort(v) {
	return eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
}
function hexParse(str) {
	var len = str.length;
	var ret;
	if (str[0] === '#') {
		if (len === 4 || len === 5) {
			ret = {
				r: 255 & map[str[1]] * 17,
				g: 255 & map[str[2]] * 17,
				b: 255 & map[str[3]] * 17,
				a: len === 5 ? map[str[4]] * 17 : 255
			};
		} else if (len === 7 || len === 9) {
			ret = {
				r: map[str[1]] << 4 | map[str[2]],
				g: map[str[3]] << 4 | map[str[4]],
				b: map[str[5]] << 4 | map[str[6]],
				a: len === 9 ? (map[str[7]] << 4 | map[str[8]]) : 255
			};
		}
	}
	return ret;
}
function hexString(v) {
	var f = isShort(v) ? h1 : h2;
	return v
		? '#' + f(v.r) + f(v.g) + f(v.b) + (v.a < 255 ? f(v.a) : '')
		: v;
}
function round(v) {
	return v + 0.5 | 0;
}
const lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
	return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
	return lim(round(v * 255), 0, 255);
}
function b2n(v) {
	return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
	return lim(round(v * 100), 0, 100);
}
const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
	const m = RGB_RE.exec(str);
	let a = 255;
	let r, g, b;
	if (!m) {
		return;
	}
	if (m[7] !== r) {
		const v = +m[7];
		a = 255 & (m[8] ? p2b(v) : v * 255);
	}
	r = +m[1];
	g = +m[3];
	b = +m[5];
	r = 255 & (m[2] ? p2b(r) : r);
	g = 255 & (m[4] ? p2b(g) : g);
	b = 255 & (m[6] ? p2b(b) : b);
	return {
		r: r,
		g: g,
		b: b,
		a: a
	};
}
function rgbString(v) {
	return v && (
		v.a < 255
			? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})`
			: `rgb(${v.r}, ${v.g}, ${v.b})`
	);
}
const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
	const a = s * Math.min(l, 1 - l);
	const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s, v) {
	const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
	const rgb = hsl2rgbn(h, 1, 0.5);
	let i;
	if (w + b > 1) {
		i = 1 / (w + b);
		w *= i;
		b *= i;
	}
	for (i = 0; i < 3; i++) {
		rgb[i] *= 1 - w - b;
		rgb[i] += w;
	}
	return rgb;
}
function rgb2hsl(v) {
	const range = 255;
	const r = v.r / range;
	const g = v.g / range;
	const b = v.b / range;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h, s, d;
	if (max !== min) {
		d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		h = max === r
			? ((g - b) / d) + (g < b ? 6 : 0)
			: max === g
				? (b - r) / d + 2
				: (r - g) / d + 4;
		h = h * 60 + 0.5;
	}
	return [h | 0, s || 0, l];
}
function calln(f, a, b, c) {
	return (
		Array.isArray(a)
			? f(a[0], a[1], a[2])
			: f(a, b, c)
	).map(n2b);
}
function hsl2rgb(h, s, l) {
	return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
	return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
	return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
	return (h % 360 + 360) % 360;
}
function hueParse(str) {
	const m = HUE_RE.exec(str);
	let a = 255;
	let v;
	if (!m) {
		return;
	}
	if (m[5] !== v) {
		a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
	}
	const h = hue(+m[2]);
	const p1 = +m[3] / 100;
	const p2 = +m[4] / 100;
	if (m[1] === 'hwb') {
		v = hwb2rgb(h, p1, p2);
	} else if (m[1] === 'hsv') {
		v = hsv2rgb(h, p1, p2);
	} else {
		v = hsl2rgb(h, p1, p2);
	}
	return {
		r: v[0],
		g: v[1],
		b: v[2],
		a: a
	};
}
function rotate(v, deg) {
	var h = rgb2hsl(v);
	h[0] = hue(h[0] + deg);
	h = hsl2rgb(h);
	v.r = h[0];
	v.g = h[1];
	v.b = h[2];
}
function hslString(v) {
	if (!v) {
		return;
	}
	const a = rgb2hsl(v);
	const h = a[0];
	const s = n2p(a[1]);
	const l = n2p(a[2]);
	return v.a < 255
		? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})`
		: `hsl(${h}, ${s}%, ${l}%)`;
}
const map$1 = {
	x: 'dark',
	Z: 'light',
	Y: 're',
	X: 'blu',
	W: 'gr',
	V: 'medium',
	U: 'slate',
	A: 'ee',
	T: 'ol',
	S: 'or',
	B: 'ra',
	C: 'lateg',
	D: 'ights',
	R: 'in',
	Q: 'turquois',
	E: 'hi',
	P: 'ro',
	O: 'al',
	N: 'le',
	M: 'de',
	L: 'yello',
	F: 'en',
	K: 'ch',
	G: 'arks',
	H: 'ea',
	I: 'ightg',
	J: 'wh'
};
const names = {
	OiceXe: 'f0f8ff',
	antiquewEte: 'faebd7',
	aqua: 'ffff',
	aquamarRe: '7fffd4',
	azuY: 'f0ffff',
	beige: 'f5f5dc',
	bisque: 'ffe4c4',
	black: '0',
	blanKedOmond: 'ffebcd',
	Xe: 'ff',
	XeviTet: '8a2be2',
	bPwn: 'a52a2a',
	burlywood: 'deb887',
	caMtXe: '5f9ea0',
	KartYuse: '7fff00',
	KocTate: 'd2691e',
	cSO: 'ff7f50',
	cSnflowerXe: '6495ed',
	cSnsilk: 'fff8dc',
	crimson: 'dc143c',
	cyan: 'ffff',
	xXe: '8b',
	xcyan: '8b8b',
	xgTMnPd: 'b8860b',
	xWay: 'a9a9a9',
	xgYF: '6400',
	xgYy: 'a9a9a9',
	xkhaki: 'bdb76b',
	xmagFta: '8b008b',
	xTivegYF: '556b2f',
	xSange: 'ff8c00',
	xScEd: '9932cc',
	xYd: '8b0000',
	xsOmon: 'e9967a',
	xsHgYF: '8fbc8f',
	xUXe: '483d8b',
	xUWay: '2f4f4f',
	xUgYy: '2f4f4f',
	xQe: 'ced1',
	xviTet: '9400d3',
	dAppRk: 'ff1493',
	dApskyXe: 'bfff',
	dimWay: '696969',
	dimgYy: '696969',
	dodgerXe: '1e90ff',
	fiYbrick: 'b22222',
	flSOwEte: 'fffaf0',
	foYstWAn: '228b22',
	fuKsia: 'ff00ff',
	gaRsbSo: 'dcdcdc',
	ghostwEte: 'f8f8ff',
	gTd: 'ffd700',
	gTMnPd: 'daa520',
	Way: '808080',
	gYF: '8000',
	gYFLw: 'adff2f',
	gYy: '808080',
	honeyMw: 'f0fff0',
	hotpRk: 'ff69b4',
	RdianYd: 'cd5c5c',
	Rdigo: '4b0082',
	ivSy: 'fffff0',
	khaki: 'f0e68c',
	lavFMr: 'e6e6fa',
	lavFMrXsh: 'fff0f5',
	lawngYF: '7cfc00',
	NmoncEffon: 'fffacd',
	ZXe: 'add8e6',
	ZcSO: 'f08080',
	Zcyan: 'e0ffff',
	ZgTMnPdLw: 'fafad2',
	ZWay: 'd3d3d3',
	ZgYF: '90ee90',
	ZgYy: 'd3d3d3',
	ZpRk: 'ffb6c1',
	ZsOmon: 'ffa07a',
	ZsHgYF: '20b2aa',
	ZskyXe: '87cefa',
	ZUWay: '778899',
	ZUgYy: '778899',
	ZstAlXe: 'b0c4de',
	ZLw: 'ffffe0',
	lime: 'ff00',
	limegYF: '32cd32',
	lRF: 'faf0e6',
	magFta: 'ff00ff',
	maPon: '800000',
	VaquamarRe: '66cdaa',
	VXe: 'cd',
	VScEd: 'ba55d3',
	VpurpN: '9370db',
	VsHgYF: '3cb371',
	VUXe: '7b68ee',
	VsprRggYF: 'fa9a',
	VQe: '48d1cc',
	VviTetYd: 'c71585',
	midnightXe: '191970',
	mRtcYam: 'f5fffa',
	mistyPse: 'ffe4e1',
	moccasR: 'ffe4b5',
	navajowEte: 'ffdead',
	navy: '80',
	Tdlace: 'fdf5e6',
	Tive: '808000',
	TivedBb: '6b8e23',
	Sange: 'ffa500',
	SangeYd: 'ff4500',
	ScEd: 'da70d6',
	pOegTMnPd: 'eee8aa',
	pOegYF: '98fb98',
	pOeQe: 'afeeee',
	pOeviTetYd: 'db7093',
	papayawEp: 'ffefd5',
	pHKpuff: 'ffdab9',
	peru: 'cd853f',
	pRk: 'ffc0cb',
	plum: 'dda0dd',
	powMrXe: 'b0e0e6',
	purpN: '800080',
	YbeccapurpN: '663399',
	Yd: 'ff0000',
	Psybrown: 'bc8f8f',
	PyOXe: '4169e1',
	saddNbPwn: '8b4513',
	sOmon: 'fa8072',
	sandybPwn: 'f4a460',
	sHgYF: '2e8b57',
	sHshell: 'fff5ee',
	siFna: 'a0522d',
	silver: 'c0c0c0',
	skyXe: '87ceeb',
	UXe: '6a5acd',
	UWay: '708090',
	UgYy: '708090',
	snow: 'fffafa',
	sprRggYF: 'ff7f',
	stAlXe: '4682b4',
	tan: 'd2b48c',
	teO: '8080',
	tEstN: 'd8bfd8',
	tomato: 'ff6347',
	Qe: '40e0d0',
	viTet: 'ee82ee',
	JHt: 'f5deb3',
	wEte: 'ffffff',
	wEtesmoke: 'f5f5f5',
	Lw: 'ffff00',
	LwgYF: '9acd32'
};
function unpack() {
	const unpacked = {};
	const keys = Object.keys(names);
	const tkeys = Object.keys(map$1);
	let i, j, k, ok, nk;
	for (i = 0; i < keys.length; i++) {
		ok = nk = keys[i];
		for (j = 0; j < tkeys.length; j++) {
			k = tkeys[j];
			nk = nk.replace(k, map$1[k]);
		}
		k = parseInt(names[ok], 16);
		unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
	}
	return unpacked;
}
let names$1;
function nameParse(str) {
	if (!names$1) {
		names$1 = unpack();
		names$1.transparent = [0, 0, 0, 0];
	}
	const a = names$1[str.toLowerCase()];
	return a && {
		r: a[0],
		g: a[1],
		b: a[2],
		a: a.length === 4 ? a[3] : 255
	};
}
function modHSL(v, i, ratio) {
	if (v) {
		let tmp = rgb2hsl(v);
		tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
		tmp = hsl2rgb(tmp);
		v.r = tmp[0];
		v.g = tmp[1];
		v.b = tmp[2];
	}
}
function clone(v, proto) {
	return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
	var v = {r: 0, g: 0, b: 0, a: 255};
	if (Array.isArray(input)) {
		if (input.length >= 3) {
			v = {r: input[0], g: input[1], b: input[2], a: 255};
			if (input.length > 3) {
				v.a = n2b(input[3]);
			}
		}
	} else {
		v = clone(input, {r: 0, g: 0, b: 0, a: 1});
		v.a = n2b(v.a);
	}
	return v;
}
function functionParse(str) {
	if (str.charAt(0) === 'r') {
		return rgbParse(str);
	}
	return hueParse(str);
}
class Color {
	constructor(input) {
		if (input instanceof Color) {
			return input;
		}
		const type = typeof input;
		let v;
		if (type === 'object') {
			v = fromObject(input);
		} else if (type === 'string') {
			v = hexParse(input) || nameParse(input) || functionParse(input);
		}
		this._rgb = v;
		this._valid = !!v;
	}
	get valid() {
		return this._valid;
	}
	get rgb() {
		var v = clone(this._rgb);
		if (v) {
			v.a = b2n(v.a);
		}
		return v;
	}
	set rgb(obj) {
		this._rgb = fromObject(obj);
	}
	rgbString() {
		return this._valid ? rgbString(this._rgb) : this._rgb;
	}
	hexString() {
		return this._valid ? hexString(this._rgb) : this._rgb;
	}
	hslString() {
		return this._valid ? hslString(this._rgb) : this._rgb;
	}
	mix(color, weight) {
		const me = this;
		if (color) {
			const c1 = me.rgb;
			const c2 = color.rgb;
			let w2;
			const p = weight === w2 ? 0.5 : weight;
			const w = 2 * p - 1;
			const a = c1.a - c2.a;
			const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			w2 = 1 - w1;
			c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
			c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
			c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
			c1.a = p * c1.a + (1 - p) * c2.a;
			me.rgb = c1;
		}
		return me;
	}
	clone() {
		return new Color(this.rgb);
	}
	alpha(a) {
		this._rgb.a = n2b(a);
		return this;
	}
	clearer(ratio) {
		const rgb = this._rgb;
		rgb.a *= 1 - ratio;
		return this;
	}
	greyscale() {
		const rgb = this._rgb;
		const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
		rgb.r = rgb.g = rgb.b = val;
		return this;
	}
	opaquer(ratio) {
		const rgb = this._rgb;
		rgb.a *= 1 + ratio;
		return this;
	}
	negate() {
		const v = this._rgb;
		v.r = 255 - v.r;
		v.g = 255 - v.g;
		v.b = 255 - v.b;
		return this;
	}
	lighten(ratio) {
		modHSL(this._rgb, 2, ratio);
		return this;
	}
	darken(ratio) {
		modHSL(this._rgb, 2, -ratio);
		return this;
	}
	saturate(ratio) {
		modHSL(this._rgb, 1, ratio);
		return this;
	}
	desaturate(ratio) {
		modHSL(this._rgb, 1, -ratio);
		return this;
	}
	rotate(deg) {
		rotate(this._rgb, deg);
		return this;
	}
}
function index_esm(input) {
	return new Color(input);
}

const isPatternOrGradient = (value) => value instanceof CanvasGradient || value instanceof CanvasPattern;
function color(value) {
  return isPatternOrGradient(value) ? value : index_esm(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value)
    ? value
    : index_esm(value).saturate(0.5).darken(0.1).hexString();
}

const overrides = Object.create(null);
const descriptors = Object.create(null);
function getScope$1(node, key) {
  if (!key) {
    return node;
  }
  const keys = key.split('.');
  for (let i = 0, n = keys.length; i < n; ++i) {
    const k = keys[i];
    node = node[k] || (node[k] = Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === 'string') {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ''), scope);
}
class Defaults {
  constructor(_descriptors) {
    this.animation = undefined;
    this.backgroundColor = 'rgba(0,0,0,0.1)';
    this.borderColor = 'rgba(0,0,0,0.1)';
    this.color = '#666';
    this.datasets = {};
    this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
    this.elements = {};
    this.events = [
      'mousemove',
      'mouseout',
      'click',
      'touchstart',
      'touchmove'
    ];
    this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: 'normal',
      lineHeight: 1.2,
      weight: null
    };
    this.hover = {};
    this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
    this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
    this.hoverColor = (ctx, options) => getHoverColor(options.color);
    this.indexAxis = 'x';
    this.interaction = {
      mode: 'nearest',
      intersect: true
    };
    this.maintainAspectRatio = true;
    this.onHover = null;
    this.onClick = null;
    this.parsing = true;
    this.plugins = {};
    this.responsive = true;
    this.scale = undefined;
    this.scales = {};
    this.showLine = true;
    this.drawActiveElementsOnTop = true;
    this.describe(_descriptors);
  }
  set(scope, values) {
    return set(this, scope, values);
  }
  get(scope) {
    return getScope$1(this, scope);
  }
  describe(scope, values) {
    return set(descriptors, scope, values);
  }
  override(scope, values) {
    return set(overrides, scope, values);
  }
  route(scope, name, targetScope, targetName) {
    const scopeObject = getScope$1(this, scope);
    const targetScopeObject = getScope$1(this, targetScope);
    const privateName = '_' + name;
    Object.defineProperties(scopeObject, {
      [privateName]: {
        value: scopeObject[name],
        writable: true
      },
      [name]: {
        enumerable: true,
        get() {
          const local = this[privateName];
          const target = targetScopeObject[targetName];
          if (isObject(local)) {
            return Object.assign({}, target, local);
          }
          return valueOrDefault(local, target);
        },
        set(value) {
          this[privateName] = value;
        }
      }
    });
  }
}
var defaults = new Defaults({
  _scriptable: (name) => !name.startsWith('on'),
  _indexable: (name) => name !== 'events',
  hover: {
    _fallback: 'interaction'
  },
  interaction: {
    _scriptable: false,
    _indexable: false,
  }
});

function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + ' ' : '')
		+ (font.weight ? font.weight + ' ' : '')
		+ font.size + 'px '
		+ font.family;
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _longestText(ctx, font, arrayOfThings, cache) {
  cache = cache || {};
  let data = cache.data = cache.data || {};
  let gc = cache.garbageCollect = cache.garbageCollect || [];
  if (cache.font !== font) {
    data = cache.data = {};
    gc = cache.garbageCollect = [];
    cache.font = font;
  }
  ctx.save();
  ctx.font = font;
  let longest = 0;
  const ilen = arrayOfThings.length;
  let i, j, jlen, thing, nestedThing;
  for (i = 0; i < ilen; i++) {
    thing = arrayOfThings[i];
    if (thing !== undefined && thing !== null && isArray(thing) !== true) {
      longest = _measureText(ctx, data, gc, longest, thing);
    } else if (isArray(thing)) {
      for (j = 0, jlen = thing.length; j < jlen; j++) {
        nestedThing = thing[j];
        if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
          longest = _measureText(ctx, data, gc, longest, nestedThing);
        }
      }
    }
  }
  ctx.restore();
  const gcLen = gc.length / 2;
  if (gcLen > arrayOfThings.length) {
    for (i = 0; i < gcLen; i++) {
      delete data[gc[i]];
    }
    gc.splice(0, gcLen);
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  const devicePixelRatio = chart.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  ctx = ctx || canvas.getContext('2d');
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function drawPoint(ctx, options, x, y) {
  let type, xOffset, yOffset, size, cornerRadius;
  const style = options.pointStyle;
  const rotation = options.rotation;
  const radius = options.radius;
  let rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === 'object') {
    type = style.toString();
    if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
  default:
    ctx.arc(x, y, radius, 0, TAU);
    ctx.closePath();
    break;
  case 'triangle':
    ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
    rad += TWO_THIRDS_PI;
    ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
    rad += TWO_THIRDS_PI;
    ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
    ctx.closePath();
    break;
  case 'rectRounded':
    cornerRadius = radius * 0.516;
    size = radius - cornerRadius;
    xOffset = Math.cos(rad + QUARTER_PI) * size;
    yOffset = Math.sin(rad + QUARTER_PI) * size;
    ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
    ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
    ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
    ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
    ctx.closePath();
    break;
  case 'rect':
    if (!rotation) {
      size = Math.SQRT1_2 * radius;
      ctx.rect(x - size, y - size, 2 * size, 2 * size);
      break;
    }
    rad += QUARTER_PI;
  case 'rectRot':
    xOffset = Math.cos(rad) * radius;
    yOffset = Math.sin(rad) * radius;
    ctx.moveTo(x - xOffset, y - yOffset);
    ctx.lineTo(x + yOffset, y - xOffset);
    ctx.lineTo(x + xOffset, y + yOffset);
    ctx.lineTo(x - yOffset, y + xOffset);
    ctx.closePath();
    break;
  case 'crossRot':
    rad += QUARTER_PI;
  case 'cross':
    xOffset = Math.cos(rad) * radius;
    yOffset = Math.sin(rad) * radius;
    ctx.moveTo(x - xOffset, y - yOffset);
    ctx.lineTo(x + xOffset, y + yOffset);
    ctx.moveTo(x + yOffset, y - xOffset);
    ctx.lineTo(x - yOffset, y + xOffset);
    break;
  case 'star':
    xOffset = Math.cos(rad) * radius;
    yOffset = Math.sin(rad) * radius;
    ctx.moveTo(x - xOffset, y - yOffset);
    ctx.lineTo(x + xOffset, y + yOffset);
    ctx.moveTo(x + yOffset, y - xOffset);
    ctx.lineTo(x - yOffset, y + xOffset);
    rad += QUARTER_PI;
    xOffset = Math.cos(rad) * radius;
    yOffset = Math.sin(rad) * radius;
    ctx.moveTo(x - xOffset, y - yOffset);
    ctx.lineTo(x + xOffset, y + yOffset);
    ctx.moveTo(x + yOffset, y - xOffset);
    ctx.lineTo(x - yOffset, y + xOffset);
    break;
  case 'line':
    xOffset = Math.cos(rad) * radius;
    yOffset = Math.sin(rad) * radius;
    ctx.moveTo(x - xOffset, y - yOffset);
    ctx.lineTo(x + xOffset, y + yOffset);
    break;
  case 'dash':
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
    break;
  }
  ctx.fill();
  if (options.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return !area || (point && point.x > area.left - margin && point.x < area.right + margin &&
		point.y > area.top - margin && point.y < area.bottom + margin);
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === 'middle') {
    const midpoint = (previous.x + target.x) / 2.0;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if (mode === 'after' !== !!flip) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(
    flip ? previous.cp1x : previous.cp2x,
    flip ? previous.cp1y : previous.cp2y,
    flip ? target.cp2x : target.cp1x,
    flip ? target.cp2y : target.cp1y,
    target.x,
    target.y);
}
function renderText(ctx, text, x, y, font, opts = {}) {
  const lines = isArray(text) ? text : [text];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
  let i, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i = 0; i < lines.length; ++i) {
    line = lines[i];
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x, y, opts.maxWidth);
    }
    ctx.fillText(line, x, y, opts.maxWidth);
    decorateText(ctx, x, y, line, opts);
    y += font.lineHeight;
  }
  ctx.restore();
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x, y, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x - metrics.actualBoundingBoxLeft;
    const right = x + metrics.actualBoundingBoxRight;
    const top = y - metrics.actualBoundingBoxAscent;
    const bottom = y + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function addRoundedRectPath(ctx, rect) {
  const {x, y, w, h, radius} = rect;
  ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
  ctx.lineTo(x, y + h - radius.bottomLeft);
  ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
  ctx.lineTo(x + w - radius.bottomRight, y + h);
  ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
  ctx.lineTo(x + w, y + radius.topRight);
  ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
  ctx.lineTo(x + radius.topLeft, y);
}

const LINE_HEIGHT = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
const FONT_STYLE = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
function toLineHeight(value, size) {
  const matches = ('' + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === 'normal') {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
  case 'px':
    return value;
  case '%':
    value /= 100;
    break;
  }
  return size * value;
}
const numberOrZero = v => +v || 0;
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value)
    ? objProps
      ? prop => valueOrDefault(value[prop], value[props[prop]])
      : prop => value[prop]
    : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {top: 'y', right: 'x', bottom: 'y', left: 'x'});
}
function toTRBLCorners(value) {
  return _readValueToProps(value, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options, fallback) {
  options = options || {};
  fallback = fallback || defaults.font;
  let size = valueOrDefault(options.size, fallback.size);
  if (typeof size === 'string') {
    size = parseInt(size, 10);
  }
  let style = valueOrDefault(options.style, fallback.style);
  if (style && !('' + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = '';
  }
  const font = {
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    size,
    style,
    weight: valueOrDefault(options.weight, fallback.weight),
    string: ''
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index, info) {
  let cacheable = true;
  let i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === undefined) {
      continue;
    }
    if (context !== undefined && typeof value === 'function') {
      value = value(context);
      cacheable = false;
    }
    if (index !== undefined && isArray(value)) {
      value = value[index % value.length];
      cacheable = false;
    }
    if (value !== undefined) {
      if (info && !cacheable) {
        info.cacheable = false;
      }
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const {min, max} = minmax;
  const change = toDimension(grace, (max - min) / 2);
  const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
  return {
    min: keepZero(min, -Math.abs(change)),
    max: keepZero(max, change)
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}

function _lookup(table, value, cmp) {
  cmp = cmp || ((index) => table[index] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = (lo + hi) >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {lo, hi};
}
const _lookupByKey = (table, key, value) =>
  _lookup(table, value, index => table[index][key] < value);
const _rlookupByKey = (table, key, value) =>
  _lookup(table, value, index => table[index][key] >= value);
function _filterBetween(values, min, max) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length
    ? values.slice(start, end)
    : values;
}
const arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, '_chartjs', {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [listener]
    }
  });
  arrayEvents.forEach((key) => {
    const method = '_onData' + _capitalize(key);
    const base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base.apply(this, args);
        array._chartjs.listeners.forEach((object) => {
          if (typeof object[method] === 'function') {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function unlistenArrayEvents(array, listener) {
  const stub = array._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach((key) => {
    delete array[key];
  });
  delete array._chartjs;
}
function _arrayUnique(items) {
  const set = new Set();
  let i, ilen;
  for (i = 0, ilen = items.length; i < ilen; ++i) {
    set.add(items[i]);
  }
  if (set.size === ilen) {
    return items;
  }
  return Array.from(set);
}

function _createResolver(scopes, prefixes = [''], rootScopes = scopes, fallback, getTarget = () => scopes[0]) {
  if (!defined(fallback)) {
    fallback = _resolve('_fallback', scopes);
  }
  const cache = {
    [Symbol.toStringTag]: 'Object',
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: rootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: (scope) => _createResolver([scope, ...scopes], prefixes, rootScopes, fallback),
  };
  return new Proxy(cache, {
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    get(target, prop) {
      return _cached(target, prop,
        () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    }
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
  };
  return new Proxy(cache, {
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    get(target, prop, receiver) {
      return _cached(target, prop,
        () => _resolveWithContext(target, prop, receiver));
    },
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys
        ? Reflect.has(proxy, prop) ? {enumerable: true, configurable: true} : undefined
        : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    }
  });
}
function _descriptors(proxy, defaults = {scriptable: true, indexable: true}) {
  const {_scriptable = defaults.scriptable, _indexable = defaults.indexable, _allKeys = defaults.allKeys} = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
  };
}
const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
const needsSubResolver = (prop, value) => isObject(value) && prop !== 'adapters' &&
  (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve) {
  if (Object.prototype.hasOwnProperty.call(target, prop)) {
    return target[prop];
  }
  const value = resolve();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
  }
  return value;
}
function _resolveScriptable(prop, value, target, receiver) {
  const {_proxy, _context, _subProxy, _stack} = target;
  if (_stack.has(prop)) {
    throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
  }
  _stack.add(prop);
  value = value(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
  if (defined(_context.index) && isIndexable(prop)) {
    value = value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter(s => s !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
const getScope = (key, parent) => key === true ? parent
  : typeof key === 'string' ? resolveObjectKey(parent, key) : undefined;
function addScopes(set, parentScopes, key, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key, parent);
    if (scope) {
      set.add(scope);
      const fallback = resolveFallback(scope._fallback, key, value);
      if (defined(fallback) && fallback !== key && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && defined(parentFallback) && key !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [...parentScopes, ...rootScopes];
  const set = new Set();
  set.add(value);
  let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
  if (key === null) {
    return false;
  }
  if (defined(fallback) && fallback !== prop) {
    key = addScopesFromKey(set, allScopes, fallback, key, value);
    if (key === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set), [''], rootScopes, fallback,
    () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set, allScopes, key, fallback, item) {
  while (key) {
    key = addScopes(set, allScopes, key, fallback, item);
  }
  return key;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target;
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (defined(value)) {
      return needsSubResolver(prop, value)
        ? createSubResolver(scopes, proxy, prop, value)
        : value;
    }
  }
}
function _resolve(key, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key];
    if (defined(value)) {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set = new Set();
  for (const scope of scopes) {
    for (const key of Object.keys(scope).filter(k => !k.startsWith('_'))) {
      set.add(key);
    }
  }
  return Array.from(set);
}

const EPSILON = Number.EPSILON || 1e-14;
const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
const getValueAxis = (indexAxis) => indexAxis === 'x' ? 'y' : 'x';
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;
  const d01 = distanceBetweenPoints(current, previous);
  const d12 = distanceBetweenPoints(next, current);
  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  const fa = t * s01;
  const fb = t * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y)
    }
  };
}
function monotoneAdjust(points, deltaK, mK) {
  const pointsLen = points.length;
  let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen - 1; ++i) {
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent || !pointAfter) {
      continue;
    }
    if (almostEquals(deltaK[i], 0, EPSILON)) {
      mK[i] = mK[i + 1] = 0;
      continue;
    }
    alphaK = mK[i] / deltaK[i];
    betaK = mK[i + 1] / deltaK[i];
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    mK[i] = alphaK * tauK * deltaK[i];
    mK[i + 1] = betaK * tauK * deltaK[i];
  }
}
function monotoneCompute(points, mK, indexAxis = 'x') {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  let delta, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    const iPixel = pointCurrent[indexAxis];
    const vPixel = pointCurrent[valueAxis];
    if (pointBefore) {
      delta = (iPixel - pointBefore[indexAxis]) / 3;
      pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
      pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
    }
    if (pointAfter) {
      delta = (pointAfter[indexAxis] - iPixel) / 3;
      pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
      pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
    }
  }
}
function splineCurveMonotone(points, indexAxis = 'x') {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  const deltaK = Array(pointsLen).fill(0);
  const mK = Array(pointsLen);
  let i, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    if (pointAfter) {
      const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
      deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
    }
    mK[i] = !pointBefore ? deltaK[i]
      : !pointAfter ? deltaK[i - 1]
      : (sign(deltaK[i - 1]) !== sign(deltaK[i])) ? 0
      : (deltaK[i - 1] + deltaK[i]) / 2;
  }
  monotoneAdjust(points, deltaK, mK);
  monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
  let i, ilen, point, inArea, inAreaPrev;
  let inAreaNext = _isPointInArea(points[0], area);
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    inAreaPrev = inArea;
    inArea = inAreaNext;
    inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
    if (!inArea) {
      continue;
    }
    point = points[i];
    if (inAreaPrev) {
      point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
      point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
    }
    if (inAreaNext) {
      point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
      point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
  let i, ilen, point, controlPoints;
  if (options.spanGaps) {
    points = points.filter((pt) => !pt.skip);
  }
  if (options.cubicInterpolationMode === 'monotone') {
    splineCurveMonotone(points, indexAxis);
  } else {
    let prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
      point = points[i];
      controlPoints = splineCurve(
        prev,
        point,
        points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
        options.tension
      );
      point.cp1x = controlPoints.previous.x;
      point.cp1y = controlPoints.previous.y;
      point.cp2x = controlPoints.next.x;
      point.cp2y = controlPoints.next.y;
      prev = point;
    }
  }
  if (options.capBezierPoints) {
    capBezierPoints(points, area);
  }
}

function _isDomSupported() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === '[object ShadowRoot]') {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === 'string') {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf('%') !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
const getComputedStyle = (element) => window.getComputedStyle(element, null);
function getStyle(el, property) {
  return getComputedStyle(el).getPropertyValue(property);
}
const positions = ['top', 'right', 'bottom', 'left'];
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? '-' + suffix : '';
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];
    result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
function getCanvasPosition(evt, canvas) {
  const e = evt.native || evt;
  const touches = e.touches;
  const source = touches && touches.length ? touches[0] : e;
  const {offsetX, offsetY} = source;
  let box = false;
  let x, y;
  if (useOffsetPos(offsetX, offsetY, e.target)) {
    x = offsetX;
    y = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x = source.clientX - rect.left;
    y = source.clientY - rect.top;
    box = true;
  }
  return {x, y, box};
}
function getRelativePosition(evt, chart) {
  const {canvas, currentDevicePixelRatio} = chart;
  const style = getComputedStyle(canvas);
  const borderBox = style.boxSizing === 'border-box';
  const paddings = getPositionedStyle(style, 'padding');
  const borders = getPositionedStyle(style, 'border', 'width');
  const {x, y, box} = getCanvasPosition(evt, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let {width, height} = chart;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
    y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === undefined || height === undefined) {
    const container = _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle(container);
      const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
      const containerPadding = getPositionedStyle(containerStyle, 'padding');
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY
  };
}
const round1 = v => Math.round(v * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle(canvas);
  const margins = getPositionedStyle(style, 'margin');
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let {width, height} = containerSize;
  if (style.boxSizing === 'content-box') {
    const borders = getPositionedStyle(style, 'border', 'width');
    const paddings = getPositionedStyle(style, 'padding');
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  return {
    width,
    height
  };
}
function retinaScale(chart, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = Math.floor(chart.height * pixelRatio);
  const deviceWidth = Math.floor(chart.width * pixelRatio);
  chart.height = deviceHeight / pixelRatio;
  chart.width = deviceWidth / pixelRatio;
  const canvas = chart.canvas;
  if (canvas.style && (forceStyle || (!canvas.style.height && !canvas.style.width))) {
    canvas.style.height = `${chart.height}px`;
    canvas.style.width = `${chart.width}px`;
  }
  if (chart.currentDevicePixelRatio !== pixelRatio
      || canvas.height !== deviceHeight
      || canvas.width !== deviceWidth) {
    chart.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
const supportsEventListenerOptions = (function() {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (e) {
  }
  return passiveSupported;
}());
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : undefined;
}

function _pointInLine(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y)
  };
}
function _steppedInterpolation(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y
    : mode === 'after' ? t < 1 ? p1.y : p2.y
    : t > 0 ? p2.y : p1.y
  };
}
function _bezierInterpolation(p1, p2, t, mode) {
  const cp1 = {x: p1.cp2x, y: p1.cp2y};
  const cp2 = {x: p2.cp1x, y: p2.cp1y};
  const a = _pointInLine(p1, cp1, t);
  const b = _pointInLine(cp1, cp2, t);
  const c = _pointInLine(cp2, p2, t);
  const d = _pointInLine(a, b, t);
  const e = _pointInLine(b, c, t);
  return _pointInLine(d, e, t);
}

const intlCache = new Map();
function getNumberFormat(locale, options) {
  options = options || {};
  const cacheKey = locale + JSON.stringify(options);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale, options) {
  return getNumberFormat(locale, options).format(num);
}

const getRightToLeftAdapter = function(rectX, width) {
  return {
    x(x) {
      return rectX + rectX + width - x;
    },
    setWidth(w) {
      width = w;
    },
    textAlign(align) {
      if (align === 'center') {
        return align;
      }
      return align === 'right' ? 'left' : 'right';
    },
    xPlus(x, value) {
      return x - value;
    },
    leftForLtr(x, itemWidth) {
      return x - itemWidth;
    },
  };
};
const getLeftToRightAdapter = function() {
  return {
    x(x) {
      return x;
    },
    setWidth(w) {
    },
    textAlign(align) {
      return align;
    },
    xPlus(x, value) {
      return x + value;
    },
    leftForLtr(x, _itemWidth) {
      return x;
    },
  };
};
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  let style, original;
  if (direction === 'ltr' || direction === 'rtl') {
    style = ctx.canvas.style;
    original = [
      style.getPropertyValue('direction'),
      style.getPropertyPriority('direction'),
    ];
    style.setProperty('direction', direction, 'important');
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== undefined) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty('direction', original[0], original[1]);
  }
}

function propertyFn(property) {
  if (property === 'angle') {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle,
    };
  }
  return {
    between: _isBetween,
    compare: (a, b) => a - b,
    normalize: x => x
  };
}
function normalizeSegment({start, end, count, loop, style}) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0,
    style
  };
}
function getSegment(segment, points, bounds) {
  const {property, start: startBound, end: endBound} = bounds;
  const {between, normalize} = propertyFn(property);
  const count = points.length;
  let {start, end, loop} = segment;
  let i, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {start, end, loop, style: segment.style};
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [segment];
  }
  const {property, start: startBound, end: endBound} = bounds;
  const count = points.length;
  const {compare, between, normalize} = propertyFn(property);
  const {start, end, loop, style} = getSegment(segment, points, bounds);
  const result = [];
  let inside = false;
  let subStart = null;
  let value, point, prevValue;
  const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
  const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
  const shouldStart = () => inside || startIsBefore();
  const shouldStop = () => !inside || endIsBefore();
  for (let i = start, prev = start; i <= end; ++i) {
    point = points[i % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    if (value === prevValue) {
      continue;
    }
    inside = between(value, startBound, endBound);
    if (subStart === null && shouldStart()) {
      subStart = compare(value, startBound) === 0 ? i : prev;
    }
    if (subStart !== null && shouldStop()) {
      result.push(normalizeSegment({start: subStart, end: i, loop, count, style}));
      subStart = null;
    }
    prev = i;
    prevValue = value;
  }
  if (subStart !== null) {
    result.push(normalizeSegment({start: subStart, end, loop, count, style}));
  }
  return result;
}
function _boundSegments(line, bounds) {
  const result = [];
  const segments = line.segments;
  for (let i = 0; i < segments.length; i++) {
    const sub = _boundSegment(segments[i], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {start, end};
}
function solidSegments(points, start, max, loop) {
  const count = points.length;
  const result = [];
  let last = start;
  let prev = points[start];
  let end;
  for (end = start + 1; end <= max; ++end) {
    const cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({start: start % count, end: (end - 1) % count, loop});
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({start: start % count, end: last % count, loop});
  }
  return result;
}
function _computeSegments(line, segmentOptions) {
  const points = line.points;
  const spanGaps = line.options.spanGaps;
  const count = points.length;
  if (!count) {
    return [];
  }
  const loop = !!line._loop;
  const {start, end} = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return splitByStyles(line, [{start, end, loop}], points, segmentOptions);
  }
  const max = end < start ? end + count : end;
  const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
}
function splitByStyles(line, segments, points, segmentOptions) {
  if (!segmentOptions || !segmentOptions.setContext || !points) {
    return segments;
  }
  return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
  const chartContext = line._chart.getContext();
  const baseStyle = readStyle(line.options);
  const {_datasetIndex: datasetIndex, options: {spanGaps}} = line;
  const count = points.length;
  const result = [];
  let prevStyle = baseStyle;
  let start = segments[0].start;
  let i = start;
  function addStyle(s, e, l, st) {
    const dir = spanGaps ? -1 : 1;
    if (s === e) {
      return;
    }
    s += count;
    while (points[s % count].skip) {
      s -= dir;
    }
    while (points[e % count].skip) {
      e += dir;
    }
    if (s % count !== e % count) {
      result.push({start: s % count, end: e % count, loop: l, style: st});
      prevStyle = st;
      start = e % count;
    }
  }
  for (const segment of segments) {
    start = spanGaps ? start : segment.start;
    let prev = points[start % count];
    let style;
    for (i = start + 1; i <= segment.end; i++) {
      const pt = points[i % count];
      style = readStyle(segmentOptions.setContext(createContext(chartContext, {
        type: 'segment',
        p0: prev,
        p1: pt,
        p0DataIndex: (i - 1) % count,
        p1DataIndex: i % count,
        datasetIndex
      })));
      if (styleChanged(style, prevStyle)) {
        addStyle(start, i - 1, segment.loop, prevStyle);
      }
      prev = pt;
      prevStyle = style;
    }
    if (start < i - 1) {
      addStyle(start, i - 1, segment.loop, prevStyle);
    }
  }
  return result;
}
function readStyle(options) {
  return {
    backgroundColor: options.backgroundColor,
    borderCapStyle: options.borderCapStyle,
    borderDash: options.borderDash,
    borderDashOffset: options.borderDashOffset,
    borderJoinStyle: options.borderJoinStyle,
    borderWidth: options.borderWidth,
    borderColor: options.borderColor
  };
}
function styleChanged(style, prevStyle) {
  return prevStyle && JSON.stringify(style) !== JSON.stringify(prevStyle);
}




/***/ }),

/***/ "./node_modules/chart.js/dist/helpers.esm.js":
/*!***************************************************!*\
  !*** ./node_modules/chart.js/dist/helpers.esm.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HALF_PI": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.H),
/* harmony export */   "INFINITY": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aX),
/* harmony export */   "PI": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.P),
/* harmony export */   "PITAU": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aW),
/* harmony export */   "QUARTER_PI": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aZ),
/* harmony export */   "RAD_PER_DEG": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aY),
/* harmony export */   "TAU": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.T),
/* harmony export */   "TWO_THIRDS_PI": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a_),
/* harmony export */   "_addGrace": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Q),
/* harmony export */   "_alignPixel": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.V),
/* harmony export */   "_alignStartEnd": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a0),
/* harmony export */   "_angleBetween": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.p),
/* harmony export */   "_angleDiff": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a$),
/* harmony export */   "_arrayUnique": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__._),
/* harmony export */   "_attachContext": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a6),
/* harmony export */   "_bezierCurveTo": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aq),
/* harmony export */   "_bezierInterpolation": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.an),
/* harmony export */   "_boundSegment": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.av),
/* harmony export */   "_boundSegments": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.al),
/* harmony export */   "_capitalize": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a3),
/* harmony export */   "_computeSegments": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ak),
/* harmony export */   "_createResolver": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a7),
/* harmony export */   "_decimalPlaces": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aH),
/* harmony export */   "_deprecated": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aP),
/* harmony export */   "_descriptors": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a8),
/* harmony export */   "_elementsEqual": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.af),
/* harmony export */   "_factorize": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.M),
/* harmony export */   "_filterBetween": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aJ),
/* harmony export */   "_getParentNode": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.F),
/* harmony export */   "_int16Range": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.U),
/* harmony export */   "_isBetween": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ah),
/* harmony export */   "_isClickEvent": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ag),
/* harmony export */   "_isDomSupported": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.K),
/* harmony export */   "_isPointInArea": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.z),
/* harmony export */   "_limitValue": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.w),
/* harmony export */   "_longestText": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aI),
/* harmony export */   "_lookup": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aK),
/* harmony export */   "_lookupByKey": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.x),
/* harmony export */   "_measureText": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.S),
/* harmony export */   "_merger": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aN),
/* harmony export */   "_mergerIf": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aO),
/* harmony export */   "_normalizeAngle": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aw),
/* harmony export */   "_pointInLine": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ao),
/* harmony export */   "_readValueToProps": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ai),
/* harmony export */   "_rlookupByKey": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.A),
/* harmony export */   "_setMinAndMaxByKey": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aD),
/* harmony export */   "_steppedInterpolation": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.am),
/* harmony export */   "_steppedLineTo": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ap),
/* harmony export */   "_textX": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.az),
/* harmony export */   "_toLeftRightCenter": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.$),
/* harmony export */   "_updateBezierControlPoints": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aj),
/* harmony export */   "addRoundedRectPath": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.as),
/* harmony export */   "almostEquals": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aG),
/* harmony export */   "almostWhole": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aF),
/* harmony export */   "callback": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.O),
/* harmony export */   "clearCanvas": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ad),
/* harmony export */   "clipArea": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.W),
/* harmony export */   "clone": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aM),
/* harmony export */   "color": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.c),
/* harmony export */   "createContext": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   "debounce": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ab),
/* harmony export */   "defined": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.j),
/* harmony export */   "distanceBetweenPoints": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aC),
/* harmony export */   "drawPoint": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ar),
/* harmony export */   "each": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.D),
/* harmony export */   "easingEffects": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.e),
/* harmony export */   "finiteOrDefault": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.N),
/* harmony export */   "fontString": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aU),
/* harmony export */   "formatNumber": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.o),
/* harmony export */   "getAngleFromPoint": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.B),
/* harmony export */   "getHoverColor": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aL),
/* harmony export */   "getMaximumSize": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.E),
/* harmony export */   "getRelativePosition": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.y),
/* harmony export */   "getRtlAdapter": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ax),
/* harmony export */   "getStyle": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aT),
/* harmony export */   "isArray": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.b),
/* harmony export */   "isFinite": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.g),
/* harmony export */   "isFunction": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a5),
/* harmony export */   "isNullOrUndef": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.k),
/* harmony export */   "isNumber": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.q),
/* harmony export */   "isObject": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.i),
/* harmony export */   "listenArrayEvents": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.l),
/* harmony export */   "log10": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.L),
/* harmony export */   "merge": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a2),
/* harmony export */   "mergeIf": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a9),
/* harmony export */   "niceNum": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aE),
/* harmony export */   "noop": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aB),
/* harmony export */   "overrideTextDirection": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ay),
/* harmony export */   "readUsedSize": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.G),
/* harmony export */   "renderText": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.X),
/* harmony export */   "requestAnimFrame": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.r),
/* harmony export */   "resolve": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.a),
/* harmony export */   "resolveObjectKey": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.f),
/* harmony export */   "restoreTextDirection": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aA),
/* harmony export */   "retinaScale": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ac),
/* harmony export */   "setsEqual": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.ae),
/* harmony export */   "sign": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.s),
/* harmony export */   "splineCurve": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aR),
/* harmony export */   "splineCurveMonotone": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aS),
/* harmony export */   "supportsEventListenerOptions": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.J),
/* harmony export */   "throttled": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.I),
/* harmony export */   "toDegrees": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.R),
/* harmony export */   "toDimension": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.n),
/* harmony export */   "toFont": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Z),
/* harmony export */   "toFontString": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aQ),
/* harmony export */   "toLineHeight": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aV),
/* harmony export */   "toPadding": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.C),
/* harmony export */   "toPercentage": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.m),
/* harmony export */   "toRadians": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.t),
/* harmony export */   "toTRBL": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.at),
/* harmony export */   "toTRBLCorners": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.au),
/* harmony export */   "uid": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.aa),
/* harmony export */   "unclipArea": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.Y),
/* harmony export */   "unlistenArrayEvents": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.u),
/* harmony export */   "valueOrDefault": () => (/* reexport safe */ _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__.v)
/* harmony export */ });
/* harmony import */ var _chunks_helpers_segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks/helpers.segment.js */ "./node_modules/chart.js/dist/chunks/helpers.segment.js");
/*!
 * Chart.js v3.7.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */



/***/ }),

/***/ "./node_modules/chart.js/helpers/helpers.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/chart.js/helpers/helpers.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HALF_PI": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.HALF_PI),
/* harmony export */   "INFINITY": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.INFINITY),
/* harmony export */   "PI": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.PI),
/* harmony export */   "PITAU": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.PITAU),
/* harmony export */   "QUARTER_PI": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.QUARTER_PI),
/* harmony export */   "RAD_PER_DEG": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.RAD_PER_DEG),
/* harmony export */   "TAU": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.TAU),
/* harmony export */   "TWO_THIRDS_PI": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.TWO_THIRDS_PI),
/* harmony export */   "_addGrace": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._addGrace),
/* harmony export */   "_alignPixel": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._alignPixel),
/* harmony export */   "_alignStartEnd": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._alignStartEnd),
/* harmony export */   "_angleBetween": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._angleBetween),
/* harmony export */   "_angleDiff": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._angleDiff),
/* harmony export */   "_arrayUnique": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._arrayUnique),
/* harmony export */   "_attachContext": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._attachContext),
/* harmony export */   "_bezierCurveTo": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._bezierCurveTo),
/* harmony export */   "_bezierInterpolation": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._bezierInterpolation),
/* harmony export */   "_boundSegment": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._boundSegment),
/* harmony export */   "_boundSegments": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._boundSegments),
/* harmony export */   "_capitalize": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._capitalize),
/* harmony export */   "_computeSegments": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._computeSegments),
/* harmony export */   "_createResolver": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._createResolver),
/* harmony export */   "_decimalPlaces": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._decimalPlaces),
/* harmony export */   "_deprecated": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._deprecated),
/* harmony export */   "_descriptors": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._descriptors),
/* harmony export */   "_elementsEqual": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._elementsEqual),
/* harmony export */   "_factorize": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._factorize),
/* harmony export */   "_filterBetween": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._filterBetween),
/* harmony export */   "_getParentNode": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._getParentNode),
/* harmony export */   "_int16Range": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._int16Range),
/* harmony export */   "_isBetween": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._isBetween),
/* harmony export */   "_isClickEvent": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._isClickEvent),
/* harmony export */   "_isDomSupported": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._isDomSupported),
/* harmony export */   "_isPointInArea": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._isPointInArea),
/* harmony export */   "_limitValue": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._limitValue),
/* harmony export */   "_longestText": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._longestText),
/* harmony export */   "_lookup": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._lookup),
/* harmony export */   "_lookupByKey": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._lookupByKey),
/* harmony export */   "_measureText": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._measureText),
/* harmony export */   "_merger": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._merger),
/* harmony export */   "_mergerIf": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._mergerIf),
/* harmony export */   "_normalizeAngle": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._normalizeAngle),
/* harmony export */   "_pointInLine": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._pointInLine),
/* harmony export */   "_readValueToProps": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._readValueToProps),
/* harmony export */   "_rlookupByKey": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._rlookupByKey),
/* harmony export */   "_setMinAndMaxByKey": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._setMinAndMaxByKey),
/* harmony export */   "_steppedInterpolation": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._steppedInterpolation),
/* harmony export */   "_steppedLineTo": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._steppedLineTo),
/* harmony export */   "_textX": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._textX),
/* harmony export */   "_toLeftRightCenter": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._toLeftRightCenter),
/* harmony export */   "_updateBezierControlPoints": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__._updateBezierControlPoints),
/* harmony export */   "addRoundedRectPath": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.addRoundedRectPath),
/* harmony export */   "almostEquals": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.almostEquals),
/* harmony export */   "almostWhole": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.almostWhole),
/* harmony export */   "callback": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.callback),
/* harmony export */   "clearCanvas": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.clearCanvas),
/* harmony export */   "clipArea": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.clipArea),
/* harmony export */   "clone": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   "color": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.color),
/* harmony export */   "createContext": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   "debounce": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.debounce),
/* harmony export */   "defined": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.defined),
/* harmony export */   "distanceBetweenPoints": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.distanceBetweenPoints),
/* harmony export */   "drawPoint": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.drawPoint),
/* harmony export */   "each": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.each),
/* harmony export */   "easingEffects": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.easingEffects),
/* harmony export */   "finiteOrDefault": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.finiteOrDefault),
/* harmony export */   "fontString": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.fontString),
/* harmony export */   "formatNumber": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.formatNumber),
/* harmony export */   "getAngleFromPoint": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getAngleFromPoint),
/* harmony export */   "getHoverColor": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getHoverColor),
/* harmony export */   "getMaximumSize": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getMaximumSize),
/* harmony export */   "getRelativePosition": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getRelativePosition),
/* harmony export */   "getRtlAdapter": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getRtlAdapter),
/* harmony export */   "getStyle": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.getStyle),
/* harmony export */   "isArray": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isArray),
/* harmony export */   "isFinite": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isFinite),
/* harmony export */   "isFunction": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isFunction),
/* harmony export */   "isNullOrUndef": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndef),
/* harmony export */   "isNumber": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isNumber),
/* harmony export */   "isObject": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.isObject),
/* harmony export */   "listenArrayEvents": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.listenArrayEvents),
/* harmony export */   "log10": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.log10),
/* harmony export */   "merge": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.merge),
/* harmony export */   "mergeIf": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.mergeIf),
/* harmony export */   "niceNum": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.niceNum),
/* harmony export */   "noop": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.noop),
/* harmony export */   "overrideTextDirection": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.overrideTextDirection),
/* harmony export */   "readUsedSize": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.readUsedSize),
/* harmony export */   "renderText": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.renderText),
/* harmony export */   "requestAnimFrame": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.requestAnimFrame),
/* harmony export */   "resolve": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.resolve),
/* harmony export */   "resolveObjectKey": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.resolveObjectKey),
/* harmony export */   "restoreTextDirection": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.restoreTextDirection),
/* harmony export */   "retinaScale": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.retinaScale),
/* harmony export */   "setsEqual": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.setsEqual),
/* harmony export */   "sign": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.sign),
/* harmony export */   "splineCurve": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.splineCurve),
/* harmony export */   "splineCurveMonotone": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.splineCurveMonotone),
/* harmony export */   "supportsEventListenerOptions": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.supportsEventListenerOptions),
/* harmony export */   "throttled": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.throttled),
/* harmony export */   "toDegrees": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toDegrees),
/* harmony export */   "toDimension": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toDimension),
/* harmony export */   "toFont": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toFont),
/* harmony export */   "toFontString": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toFontString),
/* harmony export */   "toLineHeight": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toLineHeight),
/* harmony export */   "toPadding": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toPadding),
/* harmony export */   "toPercentage": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toPercentage),
/* harmony export */   "toRadians": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toRadians),
/* harmony export */   "toTRBL": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toTRBL),
/* harmony export */   "toTRBLCorners": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.toTRBLCorners),
/* harmony export */   "uid": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.uid),
/* harmony export */   "unclipArea": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.unclipArea),
/* harmony export */   "unlistenArrayEvents": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.unlistenArrayEvents),
/* harmony export */   "valueOrDefault": () => (/* reexport safe */ _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__.valueOrDefault)
/* harmony export */ });
/* harmony import */ var _dist_helpers_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/helpers.esm */ "./node_modules/chart.js/dist/helpers.esm.js");



/***/ }),

/***/ "./node_modules/chartjs-adapter-luxon/dist/chartjs-adapter-luxon.esm.js":
/*!******************************************************************************!*\
  !*** ./node_modules/chartjs-adapter-luxon/dist/chartjs-adapter-luxon.esm.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! luxon */ "./node_modules/luxon/build/cjs-browser/luxon.js");
/*!
 * chartjs-adapter-luxon v1.1.0
 * https://www.chartjs.org
 * (c) 2021 chartjs-adapter-luxon Contributors
 * Released under the MIT license
 */



const FORMATS = {
  datetime: luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.DATETIME_MED_WITH_SECONDS,
  millisecond: 'h:mm:ss.SSS a',
  second: luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.TIME_WITH_SECONDS,
  minute: luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.TIME_SIMPLE,
  hour: {hour: 'numeric'},
  day: {day: 'numeric', month: 'short'},
  week: 'DD',
  month: {month: 'short', year: 'numeric'},
  quarter: "'Q'q - yyyy",
  year: {year: 'numeric'}
};

chart_js__WEBPACK_IMPORTED_MODULE_0__._adapters._date.override({
  _id: 'luxon', // DEBUG

  /**
   * @private
   */
  _create: function(time) {
    return luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromMillis(time, this.options);
  },

  formats: function() {
    return FORMATS;
  },

  parse: function(value, format) {
    const options = this.options;

    if (value === null || typeof value === 'undefined') {
      return null;
    }

    const type = typeof value;
    if (type === 'number') {
      value = this._create(value);
    } else if (type === 'string') {
      if (typeof format === 'string') {
        value = luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromFormat(value, format, options);
      } else {
        value = luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromISO(value, options);
      }
    } else if (value instanceof Date) {
      value = luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromJSDate(value, options);
    } else if (type === 'object' && !(value instanceof luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime)) {
      value = luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromObject(value);
    }

    return value.isValid ? value.valueOf() : null;
  },

  format: function(time, format) {
    const datetime = this._create(time);
    return typeof format === 'string'
      ? datetime.toFormat(format, this.options)
      : datetime.toLocaleString(format);
  },

  add: function(time, amount, unit) {
    const args = {};
    args[unit] = amount;
    return this._create(time).plus(args).valueOf();
  },

  diff: function(max, min, unit) {
    return this._create(max).diff(this._create(min)).as(unit).valueOf();
  },

  startOf: function(time, unit, weekday) {
    if (unit === 'isoWeek') {
      weekday = Math.trunc(Math.min(Math.max(0, weekday), 6));
      const dateTime = this._create(time);
      return dateTime.minus({days: (dateTime.weekday - weekday + 7) % 7}).startOf('day').valueOf();
    }
    return unit ? this._create(time).startOf(unit).valueOf() : time;
  },

  endOf: function(time, unit) {
    return this._create(time).endOf(unit).valueOf();
  }
});


/***/ }),

/***/ "./node_modules/chartjs-plugin-streaming/dist/chartjs-plugin-streaming.esm.js":
/*!************************************************************************************!*\
  !*** ./node_modules/chartjs-plugin-streaming/dist/chartjs-plugin-streaming.esm.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RealTimeScale": () => (/* binding */ RealTimeScale),
/* harmony export */   "StreamingPlugin": () => (/* binding */ StreamingPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");
/* harmony import */ var chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chart.js/helpers */ "./node_modules/chart.js/helpers/helpers.esm.js");
/*!
 * chartjs-plugin-streaming v2.0.0
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2017-2021 Akihiko Kusanagi
 * Released under the MIT license
 */



function clamp(value, lower, upper) {
  return Math.min(Math.max(value, lower), upper);
}
function resolveOption(scale, key) {
  const realtimeOpts = scale.options.realtime;
  const streamingOpts = scale.chart.options.plugins.streaming;
  return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.valueOrDefault)(realtimeOpts[key], streamingOpts[key]);
}
function getAxisMap(element, {x, y}, {xAxisID, yAxisID}) {
  const axisMap = {};
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(x, key => {
    axisMap[key] = {axisId: xAxisID};
  });
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(y, key => {
    axisMap[key] = {axisId: yAxisID};
  });
  return axisMap;
}
const cancelAnimFrame = (function() {
  if (typeof window === 'undefined') {
    return chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.noop;
  }
  return window.cancelAnimationFrame;
}());
function startFrameRefreshTimer(context, func) {
  if (!context.frameRequestID) {
    const refresh = () => {
      const nextRefresh = context.nextRefresh || 0;
      const now = Date.now();
      if (nextRefresh <= now) {
        const newFrameRate = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(func);
        const frameDuration = 1000 / (Math.max(newFrameRate, 0) || 30);
        const newNextRefresh = context.nextRefresh + frameDuration || 0;
        context.nextRefresh = newNextRefresh > now ? newNextRefresh : now + frameDuration;
      }
      context.frameRequestID = chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame.call(window, refresh);
    };
    context.frameRequestID = chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.requestAnimFrame.call(window, refresh);
  }
}
function stopFrameRefreshTimer(context) {
  const frameRequestID = context.frameRequestID;
  if (frameRequestID) {
    cancelAnimFrame.call(window, frameRequestID);
    delete context.frameRequestID;
  }
}
function stopDataRefreshTimer(context) {
  const refreshTimerID = context.refreshTimerID;
  if (refreshTimerID) {
    clearInterval(refreshTimerID);
    delete context.refreshTimerID;
    delete context.refreshInterval;
  }
}
function startDataRefreshTimer(context, func, interval) {
  if (!context.refreshTimerID) {
    context.refreshTimerID = setInterval(() => {
      const newInterval = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(func);
      if (context.refreshInterval !== newInterval && !isNaN(newInterval)) {
        stopDataRefreshTimer(context);
        startDataRefreshTimer(context, func, newInterval);
      }
    }, interval || 0);
    context.refreshInterval = interval || 0;
  }
}

function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.isFinite)(value) ?
    {value: scale.getPixelForValue(value), transitionable: true} :
    {value: fallback};
}
function updateBoxAnnotation(element, chart, options) {
  const {scales, chartArea} = chart;
  const {xScaleID, yScaleID, xMin, xMax, yMin, yMax} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const {top, left, bottom, right} = chartArea;
  const streaming = element.$streaming = {};
  if (xScale) {
    const min = scaleValue(xScale, xMin, left);
    const max = scaleValue(xScale, xMax, right);
    const reverse = min.value > max.value;
    if (min.transitionable) {
      streaming[reverse ? 'x2' : 'x'] = {axisId: xScaleID};
    }
    if (max.transitionable) {
      streaming[reverse ? 'x' : 'x2'] = {axisId: xScaleID};
    }
    if (min.transitionable !== max.transitionable) {
      streaming.width = {axisId: xScaleID, reverse: min.transitionable};
    }
  }
  if (yScale) {
    const min = scaleValue(yScale, yMin, top);
    const max = scaleValue(yScale, yMax, bottom);
    const reverse = min.value > max.value;
    if (min.transitionable) {
      streaming[reverse ? 'y2' : 'y'] = {axisId: yScaleID};
    }
    if (max.transitionable) {
      streaming[reverse ? 'y' : 'y2'] = {axisId: yScaleID};
    }
    if (min.transitionable !== max.transitionable) {
      streaming.height = {axisId: yScaleID, reverse: min.transitionable};
    }
  }
}
function updateLineAnnotation(element, chart, options) {
  const {scales, chartArea} = chart;
  const {scaleID, value} = options;
  const scale = scales[scaleID];
  const {top, left, bottom, right} = chartArea;
  const streaming = element.$streaming = {};
  if (scale) {
    const isHorizontal = scale.isHorizontal();
    const pixel = scaleValue(scale, value);
    if (pixel.transitionable) {
      streaming[isHorizontal ? 'x' : 'y'] = {axisId: scaleID};
      streaming[isHorizontal ? 'x2' : 'y2'] = {axisId: scaleID};
    }
    return isHorizontal ? {top, bottom} : {left, right};
  }
  const {xScaleID, yScaleID, xMin, xMax, yMin, yMax} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const clip = {};
  if (xScale) {
    const min = scaleValue(xScale, xMin);
    const max = scaleValue(xScale, xMax);
    if (min.transitionable) {
      streaming.x = {axisId: xScaleID};
    } else {
      clip.left = left;
    }
    if (max.transitionable) {
      streaming.x2 = {axisId: xScaleID};
    } else {
      clip.right = right;
    }
  }
  if (yScale) {
    const min = scaleValue(yScale, yMin);
    const max = scaleValue(yScale, yMax);
    if (min.transitionable) {
      streaming.y = {axisId: yScaleID};
    } else {
      clip.top = top;
    }
    if (max.transitionable) {
      streaming.y2 = {axisId: yScaleID};
    } else {
      clip.bottom = bottom;
    }
  }
  return clip;
}
function updatePointAnnotation(element, chart, options) {
  const scales = chart.scales;
  const {xScaleID, yScaleID, xValue, yValue} = options;
  const xScale = scales[xScaleID];
  const yScale = scales[yScaleID];
  const streaming = element.$streaming = {};
  if (xScale) {
    const x = scaleValue(xScale, xValue);
    if (x.transitionable) {
      streaming.x = {axisId: xScaleID};
    }
  }
  if (yScale) {
    const y = scaleValue(yScale, yValue);
    if (y.transitionable) {
      streaming.y = {axisId: yScaleID};
    }
  }
}
function initAnnotationPlugin() {
  const BoxAnnotation = chart_js__WEBPACK_IMPORTED_MODULE_0__.registry.getElement('boxAnnotation');
  const LineAnnotation = chart_js__WEBPACK_IMPORTED_MODULE_0__.registry.getElement('lineAnnotation');
  const PointAnnotation = chart_js__WEBPACK_IMPORTED_MODULE_0__.registry.getElement('pointAnnotation');
  const resolveBoxAnnotationProperties = BoxAnnotation.prototype.resolveElementProperties;
  const resolveLineAnnotationProperties = LineAnnotation.prototype.resolveElementProperties;
  const resolvePointAnnotationProperties = PointAnnotation.prototype.resolveElementProperties;
  BoxAnnotation.prototype.resolveElementProperties = function(chart, options) {
    updateBoxAnnotation(this, chart, options);
    return resolveBoxAnnotationProperties.call(this, chart, options);
  };
  LineAnnotation.prototype.resolveElementProperties = function(chart, options) {
    const chartArea = chart.chartArea;
    chart.chartArea = updateLineAnnotation(this, chart, options);
    const properties = resolveLineAnnotationProperties.call(this, chart, options);
    chart.chartArea = chartArea;
    return properties;
  };
  PointAnnotation.prototype.resolveElementProperties = function(chart, options) {
    updatePointAnnotation(this, chart, options);
    return resolvePointAnnotationProperties.call(this, chart, options);
  };
}
function attachChart$1(plugin, chart) {
  const streaming = chart.$streaming;
  if (streaming.annotationPlugin !== plugin) {
    const afterUpdate = plugin.afterUpdate;
    initAnnotationPlugin();
    streaming.annotationPlugin = plugin;
    plugin.afterUpdate = (_chart, args, options) => {
      const mode = args.mode;
      const animationOpts = options.animation;
      if (mode === 'quiet') {
        options.animation = false;
      }
      afterUpdate.call(this, _chart, args, options);
      if (mode === 'quiet') {
        options.animation = animationOpts;
      }
    };
  }
}
function getElements(chart) {
  const plugin = chart.$streaming.annotationPlugin;
  if (plugin) {
    const state = plugin._getState(chart);
    return state && state.elements || [];
  }
  return [];
}
function detachChart$1(chart) {
  delete chart.$streaming.annotationPlugin;
}

const transitionKeys$1 = {x: ['x', 'caretX'], y: ['y', 'caretY']};
function update$1(...args) {
  const me = this;
  const element = me.getActiveElements()[0];
  if (element) {
    const meta = me._chart.getDatasetMeta(element.datasetIndex);
    me.$streaming = getAxisMap(me, transitionKeys$1, meta);
  } else {
    me.$streaming = {};
  }
  me.constructor.prototype.update.call(me, ...args);
}

const chartStates = new WeakMap();
function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {originalScaleOptions: {}};
    chartStates.set(chart, state);
  }
  return state;
}
function removeState(chart) {
  chartStates.delete(chart);
}
function storeOriginalScaleOptions(chart) {
  const {originalScaleOptions} = getState(chart);
  const scales = chart.scales;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(scales, scale => {
    const id = scale.id;
    if (!originalScaleOptions[id]) {
      originalScaleOptions[id] = {
        duration: resolveOption(scale, 'duration'),
        delay: resolveOption(scale, 'delay')
      };
    }
  });
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(originalScaleOptions, (opt, key) => {
    if (!scales[key]) {
      delete originalScaleOptions[key];
    }
  });
  return originalScaleOptions;
}
function zoomRealTimeScale(scale, zoom, center, limits) {
  const {chart, axis} = scale;
  const {minDuration = 0, maxDuration = Infinity, minDelay = -Infinity, maxDelay = Infinity} = limits && limits[axis] || {};
  const realtimeOpts = scale.options.realtime;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const newDuration = clamp(duration * (2 - zoom), minDuration, maxDuration);
  let maxPercent, newDelay;
  storeOriginalScaleOptions(chart);
  if (scale.isHorizontal()) {
    maxPercent = (scale.right - center.x) / (scale.right - scale.left);
  } else {
    maxPercent = (scale.bottom - center.y) / (scale.bottom - scale.top);
  }
  newDelay = delay + maxPercent * (duration - newDuration);
  realtimeOpts.duration = newDuration;
  realtimeOpts.delay = clamp(newDelay, minDelay, maxDelay);
  return newDuration !== scale.max - scale.min;
}
function panRealTimeScale(scale, delta, limits) {
  const {chart, axis} = scale;
  const {minDelay = -Infinity, maxDelay = Infinity} = limits && limits[axis] || {};
  const delay = resolveOption(scale, 'delay');
  const newDelay = delay + (scale.getValueForPixel(delta) - scale.getValueForPixel(0));
  storeOriginalScaleOptions(chart);
  scale.options.realtime.delay = clamp(newDelay, minDelay, maxDelay);
  return true;
}
function resetRealTimeScaleOptions(chart) {
  const originalScaleOptions = storeOriginalScaleOptions(chart);
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.scales, scale => {
    const realtimeOptions = scale.options.realtime;
    if (realtimeOptions) {
      const original = originalScaleOptions[scale.id];
      if (original) {
        realtimeOptions.duration = original.duration;
        realtimeOptions.delay = original.delay;
      } else {
        delete realtimeOptions.duration;
        delete realtimeOptions.delay;
      }
    }
  });
}
function initZoomPlugin(plugin) {
  plugin.zoomFunctions.realtime = zoomRealTimeScale;
  plugin.panFunctions.realtime = panRealTimeScale;
}
function attachChart(plugin, chart) {
  const streaming = chart.$streaming;
  if (streaming.zoomPlugin !== plugin) {
    const resetZoom = streaming.resetZoom = chart.resetZoom;
    initZoomPlugin(plugin);
    chart.resetZoom = transition => {
      resetRealTimeScaleOptions(chart);
      resetZoom(transition);
    };
    streaming.zoomPlugin = plugin;
  }
}
function detachChart(chart) {
  const streaming = chart.$streaming;
  if (streaming.zoomPlugin) {
    chart.resetZoom = streaming.resetZoom;
    removeState(chart);
    delete streaming.resetZoom;
    delete streaming.zoomPlugin;
  }
}

const INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
  },
  second: {
    common: true,
    size: 1000,
    steps: [1, 2, 5, 10, 15, 30]
  },
  minute: {
    common: true,
    size: 60000,
    steps: [1, 2, 5, 10, 15, 30]
  },
  hour: {
    common: true,
    size: 3600000,
    steps: [1, 2, 3, 6, 12]
  },
  day: {
    common: true,
    size: 86400000,
    steps: [1, 2, 5]
  },
  week: {
    common: false,
    size: 604800000,
    steps: [1, 2, 3, 4]
  },
  month: {
    common: true,
    size: 2.628e9,
    steps: [1, 2, 3]
  },
  quarter: {
    common: false,
    size: 7.884e9,
    steps: [1, 2, 3, 4]
  },
  year: {
    common: true,
    size: 3.154e10
  }
};
const UNITS = Object.keys(INTERVALS);
function determineStepSize(min, max, unit, capacity) {
  const range = max - min;
  const {size: milliseconds, steps} = INTERVALS[unit];
  let factor;
  if (!steps) {
    return Math.ceil(range / (capacity * milliseconds));
  }
  for (let i = 0, ilen = steps.length; i < ilen; ++i) {
    factor = steps[i];
    if (Math.ceil(range / (milliseconds * factor)) <= capacity) {
      break;
    }
  }
  return factor;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const range = max - min;
  const ilen = UNITS.length;
  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const {common, size, steps} = INTERVALS[UNITS[i]];
    const factor = steps ? steps[steps.length - 1] : Number.MAX_SAFE_INTEGER;
    if (common && Math.ceil(range / (factor * size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const {lo, hi} = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__._lookup)(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
const datasetPropertyKeys = [
  'pointBackgroundColor',
  'pointBorderColor',
  'pointBorderWidth',
  'pointRadius',
  'pointRotation',
  'pointStyle',
  'pointHitRadius',
  'pointHoverBackgroundColor',
  'pointHoverBorderColor',
  'pointHoverBorderWidth',
  'pointHoverRadius',
  'backgroundColor',
  'borderColor',
  'borderSkipped',
  'borderWidth',
  'hoverBackgroundColor',
  'hoverBorderColor',
  'hoverBorderWidth',
  'hoverRadius',
  'hitRadius',
  'radius',
  'rotation'
];
function clean(scale) {
  const {chart, id, max} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const ttl = resolveOption(scale, 'ttl');
  const pause = resolveOption(scale, 'pause');
  const min = Date.now() - (isNaN(ttl) ? duration + delay : ttl);
  let i, start, count, removalRange;
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.data.datasets, (dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);
    const axis = id === meta.xAxisID && 'x' || id === meta.yAxisID && 'y';
    if (axis) {
      const controller = meta.controller;
      const data = dataset.data;
      const length = data.length;
      if (pause) {
        for (i = 0; i < length; ++i) {
          const point = controller.getParsed(i);
          if (point && !(point[axis] < max)) {
            break;
          }
        }
        start = i + 2;
      } else {
        start = 0;
      }
      for (i = start; i < length; ++i) {
        const point = controller.getParsed(i);
        if (!point || !(point[axis] <= min)) {
          break;
        }
      }
      count = i - start;
      if (isNaN(ttl)) {
        count = Math.max(count - 2, 0);
      }
      data.splice(start, count);
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(datasetPropertyKeys, key => {
        if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.isArray)(dataset[key])) {
          dataset[key].splice(start, count);
        }
      });
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(dataset.datalabels, value => {
        if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
          value.splice(start, count);
        }
      });
      if (typeof data[0] !== 'object') {
        removalRange = {
          start: start,
          count: count
        };
      }
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart._active, (item, index) => {
        if (item.datasetIndex === datasetIndex && item.index >= start) {
          if (item.index >= start + count) {
            item.index -= count;
          } else {
            chart._active.splice(index, 1);
          }
        }
      }, null, true);
    }
  });
  if (removalRange) {
    chart.data.labels.splice(removalRange.start, removalRange.count);
  }
}
function transition(element, id, translate) {
  const animations = element.$animations || {};
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(element.$streaming, (item, key) => {
    if (item.axisId === id) {
      const delta = item.reverse ? -translate : translate;
      const animation = animations[key];
      if ((0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.isFinite)(element[key])) {
        element[key] -= delta;
      }
      if (animation) {
        animation._from -= delta;
        animation._to -= delta;
      }
    }
  });
}
function scroll(scale) {
  const {chart, id, $realtime: realtime} = scale;
  const duration = resolveOption(scale, 'duration');
  const delay = resolveOption(scale, 'delay');
  const isHorizontal = scale.isHorizontal();
  const length = isHorizontal ? scale.width : scale.height;
  const now = Date.now();
  const tooltip = chart.tooltip;
  const annotations = getElements(chart);
  let offset = length * (now - realtime.head) / duration;
  if (isHorizontal === !!scale.options.reverse) {
    offset = -offset;
  }
  (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(chart.data.datasets, (dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);
    const {data: elements = [], dataset: element} = meta;
    for (let i = 0, ilen = elements.length; i < ilen; ++i) {
      transition(elements[i], id, offset);
    }
    if (element) {
      transition(element, id, offset);
      delete element._path;
    }
  });
  for (let i = 0, ilen = annotations.length; i < ilen; ++i) {
    transition(annotations[i], id, offset);
  }
  if (tooltip) {
    transition(tooltip, id, offset);
  }
  scale.max = now - delay;
  scale.min = scale.max - duration;
  realtime.head = now;
}
class RealTimeScale extends chart_js__WEBPACK_IMPORTED_MODULE_0__.TimeScale {
  constructor(props) {
    super(props);
    this.$realtime = this.$realtime || {};
  }
  init(scaleOpts, opts) {
    const me = this;
    super.init(scaleOpts, opts);
    startDataRefreshTimer(me.$realtime, () => {
      const chart = me.chart;
      const onRefresh = resolveOption(me, 'onRefresh');
      (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(onRefresh, [chart], me);
      clean(me);
      chart.update('quiet');
      return resolveOption(me, 'refresh');
    });
  }
  update(maxWidth, maxHeight, margins) {
    const me = this;
    const {$realtime: realtime, options} = me;
    const {bounds, offset, ticks: ticksOpts} = options;
    const {autoSkip, source, major: majorTicksOpts} = ticksOpts;
    const majorEnabled = majorTicksOpts.enabled;
    if (resolveOption(me, 'pause')) {
      stopFrameRefreshTimer(realtime);
    } else {
      if (!realtime.frameRequestID) {
        realtime.head = Date.now();
      }
      startFrameRefreshTimer(realtime, () => {
        const chart = me.chart;
        const streaming = chart.$streaming;
        scroll(me);
        if (streaming) {
          (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.callback)(streaming.render, [chart]);
        }
        return resolveOption(me, 'frameRate');
      });
    }
    options.bounds = undefined;
    options.offset = false;
    ticksOpts.autoSkip = false;
    ticksOpts.source = source === 'auto' ? '' : source;
    majorTicksOpts.enabled = true;
    super.update(maxWidth, maxHeight, margins);
    options.bounds = bounds;
    options.offset = offset;
    ticksOpts.autoSkip = autoSkip;
    ticksOpts.source = source;
    majorTicksOpts.enabled = majorEnabled;
  }
  buildTicks() {
    const me = this;
    const duration = resolveOption(me, 'duration');
    const delay = resolveOption(me, 'delay');
    const max = me.$realtime.head - delay;
    const min = max - duration;
    const maxArray = [1e15, max];
    const minArray = [-1e15, min];
    Object.defineProperty(me, 'min', {
      get: () => minArray.shift(),
      set: chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.noop
    });
    Object.defineProperty(me, 'max', {
      get: () => maxArray.shift(),
      set: chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.noop
    });
    const ticks = super.buildTicks();
    delete me.min;
    delete me.max;
    me.min = min;
    me.max = max;
    return ticks;
  }
  calculateLabelRotation() {
    const ticksOpts = this.options.ticks;
    const maxRotation = ticksOpts.maxRotation;
    ticksOpts.maxRotation = ticksOpts.minRotation || 0;
    super.calculateLabelRotation();
    ticksOpts.maxRotation = maxRotation;
  }
  fit() {
    const me = this;
    const options = me.options;
    super.fit();
    if (options.ticks.display && options.display && me.isHorizontal()) {
      me.paddingLeft = 3;
      me.paddingRight = 3;
      me._handleMargins();
    }
  }
  draw(chartArea) {
    const me = this;
    const {chart, ctx} = me;
    const area = me.isHorizontal() ?
      {
        left: chartArea.left,
        top: 0,
        right: chartArea.right,
        bottom: chart.height
      } : {
        left: 0,
        top: chartArea.top,
        right: chart.width,
        bottom: chartArea.bottom
      };
    me._gridLineItems = null;
    me._labelItems = null;
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.clipArea)(ctx, area);
    super.draw(chartArea);
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.unclipArea)(ctx);
  }
  destroy() {
    const realtime = this.$realtime;
    stopFrameRefreshTimer(realtime);
    stopDataRefreshTimer(realtime);
  }
  _generate() {
    const me = this;
    const adapter = me._adapter;
    const duration = resolveOption(me, 'duration');
    const delay = resolveOption(me, 'delay');
    const refresh = resolveOption(me, 'refresh');
    const max = me.$realtime.head - delay;
    const min = max - duration;
    const capacity = me._getLabelCapacity(min);
    const {time: timeOpts, ticks: ticksOpts} = me.options;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
    const major = determineMajorUnit(minor);
    const stepSize = timeOpts.stepSize || determineStepSize(min, max, minor, capacity);
    const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
    const majorTicksEnabled = ticksOpts.major.enabled;
    const hasWeekday = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.isNumber)(weekday) || weekday === true;
    const interval = INTERVALS[minor];
    const ticks = {};
    let first = min;
    let time, count;
    if (hasWeekday) {
      first = +adapter.startOf(first, 'isoWeek', weekday);
    }
    first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
    if (adapter.diff(max, min, minor) > 100000 * stepSize) {
      throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
    }
    time = first;
    if (majorTicksEnabled && major && !hasWeekday && !timeOpts.round) {
      time = +adapter.startOf(time, major);
      time = +adapter.add(time, ~~((first - time) / (interval.size * stepSize)) * stepSize, minor);
    }
    const timestamps = ticksOpts.source === 'data' && me.getDataTimestamps();
    for (count = 0; time < max + refresh; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }
    if (time === max + refresh || count === 1) {
      addTick(ticks, time, timestamps);
    }
    return Object.keys(ticks).sort((a, b) => a - b).map(x => +x);
  }
}
RealTimeScale.id = 'realtime';
RealTimeScale.defaults = {
  bounds: 'data',
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: 'millisecond',
    displayFormats: {}
  },
  realtime: {},
  ticks: {
    autoSkip: false,
    source: 'auto',
    major: {
      enabled: true
    }
  }
};
chart_js__WEBPACK_IMPORTED_MODULE_0__.defaults.describe('scale.realtime', {
  _scriptable: name => name !== 'onRefresh'
});

var version = "2.0.0";

chart_js__WEBPACK_IMPORTED_MODULE_0__.defaults.set('transitions', {
  quiet: {
    animation: {
      duration: 0
    }
  }
});
const transitionKeys = {x: ['x', 'cp1x', 'cp2x'], y: ['y', 'cp1y', 'cp2y']};
function update(mode) {
  const me = this;
  if (mode === 'quiet') {
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(me.data.datasets, (dataset, datasetIndex) => {
      const controller = me.getDatasetMeta(datasetIndex).controller;
      controller._setStyle = function(element, index, _mode, active) {
        chart_js__WEBPACK_IMPORTED_MODULE_0__.DatasetController.prototype._setStyle.call(this, element, index, 'quiet', active);
      };
    });
  }
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.prototype.update.call(me, mode);
  if (mode === 'quiet') {
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(me.data.datasets, (dataset, datasetIndex) => {
      delete me.getDatasetMeta(datasetIndex).controller._setStyle;
    });
  }
}
function render(chart) {
  const streaming = chart.$streaming;
  chart.render();
  if (streaming.lastMouseEvent) {
    setTimeout(() => {
      const lastMouseEvent = streaming.lastMouseEvent;
      if (lastMouseEvent) {
        chart._eventHandler(lastMouseEvent);
      }
    }, 0);
  }
}
var StreamingPlugin = {
  id: 'streaming',
  version,
  beforeInit(chart) {
    const streaming = chart.$streaming = chart.$streaming || {render};
    const canvas = streaming.canvas = chart.canvas;
    const mouseEventListener = streaming.mouseEventListener = event => {
      const pos = (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.getRelativePosition)(event, chart);
      streaming.lastMouseEvent = {
        type: 'mousemove',
        chart: chart,
        native: event,
        x: pos.x,
        y: pos.y
      };
    };
    canvas.addEventListener('mousedown', mouseEventListener);
    canvas.addEventListener('mouseup', mouseEventListener);
  },
  afterInit(chart) {
    chart.update = update;
  },
  beforeUpdate(chart) {
    const {scales, elements} = chart.options;
    const tooltip = chart.tooltip;
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(scales, ({type}) => {
      if (type === 'realtime') {
        elements.line.capBezierPoints = false;
      }
    });
    if (tooltip) {
      tooltip.update = update$1;
    }
    try {
      const plugin = chart_js__WEBPACK_IMPORTED_MODULE_0__.registry.getPlugin('annotation');
      attachChart$1(plugin, chart);
    } catch (e) {
      detachChart$1(chart);
    }
    try {
      const plugin = chart_js__WEBPACK_IMPORTED_MODULE_0__.registry.getPlugin('zoom');
      attachChart(plugin, chart);
    } catch (e) {
      detachChart(chart);
    }
  },
  beforeDatasetUpdate(chart, args) {
    const {meta, mode} = args;
    if (mode === 'quiet') {
      const {controller, $animations} = meta;
      if ($animations && $animations.visible && $animations.visible._active) {
        controller.updateElement = chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.noop;
        controller.updateSharedOptions = chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.noop;
      }
    }
  },
  afterDatasetUpdate(chart, args) {
    const {meta, mode} = args;
    const {data: elements = [], dataset: element, controller} = meta;
    for (let i = 0, ilen = elements.length; i < ilen; ++i) {
      elements[i].$streaming = getAxisMap(elements[i], transitionKeys, meta);
    }
    if (element) {
      element.$streaming = getAxisMap(element, transitionKeys, meta);
    }
    if (mode === 'quiet') {
      delete controller.updateElement;
      delete controller.updateSharedOptions;
    }
  },
  beforeDatasetDraw(chart, args) {
    const {ctx, chartArea, width, height} = chart;
    const {xAxisID, yAxisID, controller} = args.meta;
    const area = {
      left: 0,
      top: 0,
      right: width,
      bottom: height
    };
    if (xAxisID && controller.getScaleForId(xAxisID) instanceof RealTimeScale) {
      area.left = chartArea.left;
      area.right = chartArea.right;
    }
    if (yAxisID && controller.getScaleForId(yAxisID) instanceof RealTimeScale) {
      area.top = chartArea.top;
      area.bottom = chartArea.bottom;
    }
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.clipArea)(ctx, area);
  },
  afterDatasetDraw(chart) {
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.unclipArea)(chart.ctx);
  },
  beforeEvent(chart, args) {
    const streaming = chart.$streaming;
    const event = args.event;
    if (event.type === 'mousemove') {
      streaming.lastMouseEvent = event;
    } else if (event.type === 'mouseout') {
      delete streaming.lastMouseEvent;
    }
  },
  destroy(chart) {
    const {scales, $streaming: streaming, tooltip} = chart;
    const {canvas, mouseEventListener} = streaming;
    delete chart.update;
    if (tooltip) {
      delete tooltip.update;
    }
    canvas.removeEventListener('mousedown', mouseEventListener);
    canvas.removeEventListener('mouseup', mouseEventListener);
    (0,chart_js_helpers__WEBPACK_IMPORTED_MODULE_1__.each)(scales, scale => {
      if (scale instanceof RealTimeScale) {
        scale.destroy();
      }
    });
  },
  defaults: {
    duration: 10000,
    delay: 0,
    frameRate: 30,
    refresh: 1000,
    onRefresh: null,
    pause: false,
    ttl: undefined
  },
  descriptors: {
    _scriptable: name => name !== 'onRefresh'
  }
};

const registerables = [StreamingPlugin, RealTimeScale];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerables);



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
___CSS_LOADER_EXPORT___.push([module.id, "/*\r\n\r\n# BEM (BLOCK, ELEMENT, MODIFIER) METHEDOLOGY\r\n\r\n<div class=\"card card--show\">\r\n  <div class=\"card__title\"></div>\r\n  <div class=\"card__container\">\r\n\r\n  </div>\r\n</div>\r\n\r\n.card - BLOCK\r\n\r\n.card__title - ELEMENT\r\n\r\n.card--show - MODIFIER\r\n\r\n*/\r\n\r\n/* RESET styles */\r\n\r\n*,\r\n*::after,\r\n*::before {\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.chart {\r\n\tmin-width: 100px;\r\n    margin-left: 0;\r\n    margin-right: 20px;\r\n\tmargin-bottom: 30px;\r\n}\r\n\r\nhtml,\r\nbody,\r\np {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\na {\r\n\tcolor: #546e7a;\r\n}\r\n\r\nul,\r\nli {\r\n\tlist-style: none;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\n.no--select {\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\t-webkit-user-select: none;\r\n\tuser-select: none;\r\n}\r\n\r\nh3 {\r\n\ttext-align: left;\r\n\tmargin-top: 20px;\r\n\tmargin-bottom: 30px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n/* MAIN styles */\r\n\r\nbody {\r\n\tfont-family: Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n\tfont-size: 14px;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-webkit-text-size-adjust: 100%;\r\n\tscroll-behavior: smooth;\r\n}\r\n\r\n.app-layout {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\nheader {\r\n\tposition: fixed;\r\n\twidth: 100%;\r\n\theight: 56px;\r\n\ttop: 0;\r\n\tbackground-color: #546e7a;\r\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.19);\r\n\tdisplay: flex;\r\n\toverflow: hidden;\r\n\tz-index: 1;\r\n\tcolor: #fff;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n\ttransition: background-color 250ms linear;\r\n}\r\n\r\n.app__offline {\r\n\tbackground-color: #6b6b6b;\r\n}\r\n\r\n.header__icon {\r\n\twidth: 48px;\r\n\theight: 48px;\r\n\tmargin: 4px;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tcursor: pointer;\r\n}\r\n\r\n.header__icon:active {\r\n\topacity: 0.8;\r\n\toutline: 1px solid #fff;\r\n}\r\n\r\n.header__title {\r\n\tcolor: #fff;\r\n\tfont-size: 20px;\r\n\t-ms-grid-row-align: center;\r\n\talign-self: center;\r\n\tmargin-left: 10px;\r\n}\r\n\r\n.menu {\r\n\twidth: 280px;\r\n\theight: 100%;\r\n\tbackground: #fff;\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tbox-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);\r\n\tz-index: 1;\r\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\r\n\ttransform: translateX(-110%);\r\n\twill-change: transform;\r\n\tz-index: 2;\r\n}\r\n\r\n.menu--show {\r\n\ttransform: translateX(0);\r\n}\r\n\r\n.menu__overlay {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tbackground: rgba(0, 0, 0, 0.3);\r\n\ttransition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);\r\n\tvisibility: hidden;\r\n\topacity: 0;\r\n\tz-index: 1;\r\n}\r\n\r\n.menu__overlay--show {\r\n\tvisibility: visible;\r\n\topacity: 1;\r\n}\r\n\r\n.menu__header {\r\n\theight: 150px;\r\n\tbackground: #546e7a;\r\n\tcolor: #fff;\r\n\tborder-bottom: 1px solid #ddd;\r\n}\r\n\r\n.menu__list {\r\n\twidth: inherit;\r\n\theight: inherit;\r\n\toverflow: auto;\r\n\toverflow-x: hidden;\r\n\t-webkit-overflow-scrolling: touch;\r\n\tbackground-color: #f5f5f6;\r\n}\r\n\r\n.menu__list li {\r\n\tborder: 0;\r\n\tpadding: 0;\r\n\tbox-shadow: none;\r\n\tborder-radius: 0;\r\n}\r\n\r\n.menu__list li a {\r\n\tpadding: 20px;\r\n\tcolor: rgba(0, 0, 0, 0.87);\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n}\r\n\r\n.menu__list li a:active,\r\n.menu__list li a:hover {\r\n\tbackground: #e7e7e7;\r\n}\r\n\r\n.app__content {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tmargin: 10px ;\r\n\tmargin-top: 56px;\r\n\tpadding-top: 10px;\r\n}\r\n\r\n.toast__msg {\r\n\tmax-width: 290px;\r\n\tmin-height: 50px;\r\n\tline-height: 50px;\r\n\tcolor: #fff;\r\n\tpadding-left: 10px;\r\n\tpadding-right: 10px;\r\n\ttext-transform: initial;\r\n\tmargin-bottom: 10px;\r\n\tbackground-color: #404040;\r\n\tborder-radius: 3px;\r\n\tbox-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\r\n\tword-break: break-all;\r\n\tfont-size: 15px;\r\n\tfont-weight: 400;\r\n\topacity: 0;\r\n\ttransform: translateY(20px);\r\n\twill-change: transform;\r\n\tposition: fixed;\r\n\tbottom: 20px;\r\n\tleft: 20px;\r\n}\r\n\r\n.toast__msg--show {\r\n\topacity: 1;\r\n\ttransform: translateY(0);\r\n}\r\n\r\nbutton {\r\n\tmin-width: 90px;\r\n\theight: 35px;\r\n\tfont-size: 14px;\r\n\tborder: 0;\r\n\tbackground: #4f8efa;\r\n\tcolor: #fff;\r\n\tmargin: 0 auto -5px;\r\n\tdisplay: inline-block;\r\n\tcursor: pointer;\r\n\toutline: 0;\r\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-moz-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-o-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t    -ms-user-select: none;\r\n\t        user-select: none;\r\n\tborder-radius: 4px;\r\n}\r\n\r\nbutton:active {\r\n\tbox-shadow: none;\r\n}\r\n\r\nbutton:disabled {\r\n\tbackground: #ccc;\r\n\tcolor: #000;\r\n\tcursor: not-allowed;\r\n}\r\n\r\n.custom__button p {\r\n\tposition: initial;\r\n\tmargin: 0;\r\n\tpadding-left: 10px;\r\n}\r\n\r\n.custom__button {\r\n\tpadding: 10px 15px;\r\n\tfont-family: \"Roboto\", arial, sans-serif;\r\n\ttext-align: left;\r\n}\r\n\r\n.turn-on-sync {\r\n\tmin-width: 75px;\r\n\theight: 30px;\r\n\tmargin-left: 10px;\r\n}\r\n\r\n.custom__input:checked + .custom__checkbox {\r\n\tbackground: rgb(195, 195, 195);\r\n}\r\n\r\n.custom__input:checked + .custom__checkbox::before {\r\n\tleft: 25px;\r\n\tbackground: #0288d1;\r\n}\r\n\r\n.card__container {\r\n\tmargin-top: 10px;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n}\r\n\r\n.card {\r\n\twidth: 320px;\r\n\tmin-height: 280px;\r\n\tbackground: #fff;\r\n\tmargin: 20px auto;\r\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n\tborder-radius: 8px;\r\n\tposition: relative;\r\n\tborder: 1px solid #e6e6e6;\r\n}\r\n\r\n.card__title,\r\n.card__desc {\r\n\tdisplay: block;\r\n\tfont-size: 14px;\r\n\ttext-align: center;\r\n}\r\n\r\n.card__title {\r\n\tmargin-left: 5px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.card__temp {\r\n\tpadding: 20px;\r\n\tpadding-bottom: 10px;\r\n}\r\n\r\n.card__temp span {\r\n\tfont-size: 14px;\r\n}\r\n\r\n.card__following,\r\n.card__followers {\r\n\tpadding: 10px 20px 5px;\r\n}\r\n\r\n.card__desc {\r\n\tpadding: 12px 15px;\r\n\tvertical-align: top;\r\n}\r\n\r\n.card__img {\r\n\twidth: 60px;\r\n\theight: 60px;\r\n\tdisplay: block;\r\n\tmargin: 20px auto 10px;\r\n\tborder-radius: 50%;\r\n}\r\n\r\nb {\r\n\tfont-family: inherit;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.card b {\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.card__temp,\r\n.card__followers,\r\n.card__following {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tmargin-bottom: 5px;\r\n}\r\n\r\n.card__followers {\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n.fab {\r\n\twidth: 56px;\r\n\theight: 56px;\r\n\tbackground: #546e7a;\r\n\tborder-radius: 50%;\r\n\tbox-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);\r\n\tcolor: #fff;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n\tposition: fixed;\r\n\tbottom: 0;\r\n\tright: 0;\r\n\tmargin: 25px;\r\n\t-webkit-tap-highlight-color: transparent;\r\n\t-webkit-backface-visibility: hidden;\r\n\tbackface-visibility: hidden;\r\n\toverflow: hidden;\r\n}\r\n\r\n.fab.active {\r\n\tbackground: #faab1a;\r\n}\r\n\r\n.fab__ripple {\r\n\tposition: absolute;\r\n\tleft: -17px;\r\n\tbottom: -12px;\r\n\twidth: 56px;\r\n\theight: 56px;\r\n\ttransform: scale(0.5);\r\n\tbackground: #fff;\r\n\tborder-radius: 50%;\r\n\ttransform-origin: 50%;\r\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\r\n\t-webkit-backface-visibility: hidden;\r\n\tbackface-visibility: hidden;\r\n\twill-change: transform;\r\n\tz-index: 2;\r\n\topacity: 0;\r\n\t-webkit-user-select: none;\r\n\t-moz-user-select: none;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n}\r\n\r\n.fab:active .fab__ripple {\r\n\topacity: 0.2;\r\n\ttransform: scale(1) translate(31%, -22%);\r\n}\r\n\r\n.fab__image {\r\n\toverflow: hidden;\r\n\tz-index: 3;\r\n}\r\n\r\n.add__card {\r\n\tmargin: 40px auto;\r\n\ttext-align: center;\r\n}\r\n\r\n.add__input {\r\n\twidth: 210px;\r\n\theight: 35px;\r\n\tborder: 1px solid #ccc;\r\n\tpadding-left: 10px;\r\n\tfont-size: 14px;\r\n\tdisplay: block;\r\n\tmargin: 10px auto;\r\n\tborder-radius: 4px;\r\n}\r\n\r\n.add__btn {\r\n\theight: 34px;\r\n\tmin-width: 70px;\r\n\tmargin-top: 10px;\r\n\tdisplay: block;\r\n\tmargin-left: 0;\r\n}\r\n\r\n.add__card ul,\r\n.add__card li,\r\n.share__container li {\r\n\twidth: 320px;\r\n\ttext-align: left;\r\n\tmargin: 15px auto;\r\n}\r\n\r\n.add__card p {\r\n\tfont-weight: 500;\r\n\tfont-size: 18px;\r\n\tmargin-top: 40px;\r\n}\r\n\r\n.card span {\r\n\tdisplay: block;\r\n}\r\n\r\n.add__to-card {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n.bg-sync__text {\r\n\tfont-size: 12px;\r\n\tpadding-left: 5px;\r\n\tcolor: #008000;\r\n}\r\n\r\n.custom__button.custom__button-bg {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.custom__button.custom__button-bg.hide {\r\n\tdisplay: none;\r\n}\r\n\r\nb i a {\r\n\ttext-decoration: underline;\r\n\tcolor: #546e7a;\r\n}\r\n\r\n.add__card ul + p {\r\n\tmargin-top: 20px;\r\n}\r\n\r\n.card__spinner {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\ttop: 0;\r\n\tmargin: auto;\r\n\tbackground: rgba(0, 0, 0, 0.16);\r\n\tdisplay: none;\r\n}\r\n\r\n.card__spinner::after {\r\n\tcontent: \"Loading...\";\r\n\tcolor: #546e7a;\r\n\tbackground: #fff;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\ttop: 0;\r\n\tmargin: auto;\r\n\ttext-align: center;\r\n\tline-height: 380px;\r\n\tfont-size: 18px;\r\n}\r\n\r\n.card__spinner.show {\r\n\tdisplay: block;\r\n}\r\n\r\n.share__container a {\r\n\ttext-decoration: underline;\r\n\tcolor: #546e7a;\r\n}\r\n\r\n.share__container {\r\n\tmargin-bottom: 50px;\r\n}\r\n\r\n.share {\r\n\tmargin: 20px auto;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n}\r\n\r\nli {\r\n\tborder: 1px solid #e6e6e6;\r\n\tpadding: 10px;\r\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\r\n\tborder-radius: 8px;\r\n}\r\n\r\nh4 {\r\n\ttext-align: left;\r\n\tmargin-bottom: 30px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUJDOztBQUVELGlCQUFBOztBQUVBOzs7Q0FHQyxzQkFBQTtBQUNEOztBQUVBO0NBQ0MsZ0JBQWdCO0lBQ2IsY0FBYztJQUNqQixrQkFBQTtDQUNBLG1CQUFBO0FBQ0Q7O0FBRUE7OztDQUdDLFNBQVM7Q0FDVixVQUFBO0FBQ0E7O0FBRUE7Q0FDQyxjQUFBO0FBQ0Q7O0FBRUE7O0NBRUMsZ0JBQUE7Q0FDQSxVQUFBO0NBQ0EsU0FBQTtBQUNEOztBQUVBO0NBQ0Msc0JBQUE7Q0FDQSxxQkFBQTtDQUNBLHlCQUFBO0NBQ0EsaUJBQUE7QUFDRDs7QUFFQTtDQUNDLGdCQUFnQjtDQUNqQixnQkFBQTtDQUNDLG1CQUFBO0NBQ0EsZ0JBQUE7QUFDRDs7QUFFQSxnQkFBQzs7QUFFRDtDQUNBLG1FQUFBO0NBQ0MsZUFBQTtDQUNBLG1DQUFBO0NBQ0EsOEJBQUE7Q0FDQSx1QkFBQTtBQUNEOztBQUVBO0NBQ0Esa0JBQUE7Q0FDQyxNQUFNO0NBQ1AsT0FBQTtDQUNDLFFBQUE7Q0FDQSxTQUFBO0NBQ0EsV0FBQTtDQUNBLFlBQUE7QUFDRDs7QUFFQTtDQUNDLGVBQUE7Q0FDQSxXQUFBO0NBQ0EsWUFBQTtDQUNBLE1BQUE7Q0FDQSx5QkFBQTtDQUNBLDJDQUFBO0NBQ0EsYUFBQTtDQUNBLGdCQUFBO0NBQ0QsVUFBQTtDQUNDLFdBQVc7Q0FDWix5QkFBQTtDQUNDLHNCQUFBO0NBQ0QscUJBQUE7Q0FDQyxpQkFBaUI7Q0FDbEIseUNBQUE7QUFDQTs7QUFFQTtDQUNDLHlCQUFBO0FBQ0Q7O0FBRUE7Q0FDQSxXQUFBO0NBQ0MsWUFBWTtDQUNiLFdBQUE7Q0FDQyxhQUFBO0NBQ0EsbUJBQUE7Q0FDRCx1QkFBQTtDQUNDLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxZQUFBO0NBQ0EsdUJBQUE7QUFDRDs7QUFFQTtDQUNBLFdBQUE7Q0FDQyxlQUFBO0NBQ0EsMEJBQUE7Q0FDQSxrQkFBQTtDQUNBLGlCQUFBO0FBQ0Q7O0FBRUE7Q0FDQyxZQUFBO0NBRUEsWUFBQTtDQUdBLGdCQUFBO0NBQ0EsZUFBQTtDQUNBLE1BQUE7Q0FDRCxTQUFBO0NBRkMsK0NBQStDO0NBSWhELFVBQUE7Q0FFQyxxREFBQTtDQUNELDRCQUFBO0NBSEMsc0JBQXNCO0NBS3ZCLFVBQUE7QUFIQTs7QUFFQTtDQUtDLHdCQUFBO0FBSEQ7O0FBRUE7Q0FLQyxXQUFBO0NBQ0EsWUFBQTtDQUNBLGVBQUE7Q0FDQSxNQUFBO0NBQ0EsT0FBQTtDQUNELFFBQUE7Q0FIQyxTQUFTO0NBS1YsOEJBQUE7Q0FDQyxvREFBQTtDQUNBLGtCQUFBO0NBQ0QsVUFBQTtDQUhDLFVBQVU7QUFLWDs7QUFGQTtDQUtDLG1CQUFBO0NBQ0EsVUFBQTtBQUNEOztBQUVBO0NBQ0MsYUFBQTtDQUNBLG1CQUFBO0NBQ0EsV0FBQTtDQUNBLDZCQUFBO0FBSEQ7O0FBTUE7Q0FIQyxjQUFjO0NBS2YsZUFBQTtDQUNDLGNBQUE7Q0FDQSxrQkFBQTtDQUNBLGlDQUFBO0NBQ0EseUJBQUE7QUFDRDs7QUFFQTtDQUNDLFNBQUE7Q0FDQSxVQUFBO0NBQ0EsZ0JBQUE7Q0FDQSxnQkFBQTtBQUNEOztBQUVBO0NBSEMsYUFBYTtDQUtiLDBCQUFBO0NBQ0QsZUFBQTtDQUhDLGNBQWM7QUFLZjs7QUFGQTs7Q0FNQyxtQkFBQTtBQUhEOztBQUVBO0NBS0EsV0FBQTtDQUNDLFlBQUE7Q0FDQSxhQUFBO0NBQ0EsZ0JBQUE7Q0FDQSxpQkFBQTtBQUhEOztBQUVBO0NBS0MsZ0JBQUE7Q0FDQSxnQkFBQTtDQUNBLGlCQUFBO0NBQ0EsV0FBQTtDQUNBLGtCQUFBO0NBQ0EsbUJBQUE7Q0FDQSx1QkFBQTtDQUNBLG1CQUFBO0NBRUEseUJBQUE7Q0FDQSxrQkFBQTtDQUNBLHNFQUFBO0NBQ0EscUJBQUE7Q0FDQSxlQUFBO0NBQ0QsZ0JBQUE7Q0FKQyxVQUFVO0NBTVgsMkJBQUE7Q0FDQyxzQkFBQTtDQUVBLGVBQUE7Q0FDRCxZQUFBO0NBTEMsVUFBVTtBQU9YOztBQUpBO0NBT0MsVUFBQTtDQUNBLHdCQUFBO0FBTEQ7O0FBRUE7Q0FPQyxlQUFBO0NBQ0EsWUFBQTtDQUNBLGVBQUE7Q0FDQSxTQUFBO0NBQ0EsbUJBQUE7Q0FDQSxXQUFBO0NBQ0EsbUJBQUE7Q0FDQSxxQkFBQTtDQUxBLGVBS0E7Q0FKQSxVQUlBO0NBSEEsMkNBR0E7Q0FDQSxtREFBQTtDQUlELGdEQUFBO0NBTEMsOENBQThDO0NBSS9DLHlCQUFBO0lBQ0Msc0JBQUE7S0FJRCxxQkFBQTtTQUxTLGlCQUFpQjtDQUkxQixrQkFBQTtBQUZBOztBQUVBO0NBT0EsZ0JBQUE7QUFMQTs7QUFFQTtDQUlDLGdCQUFBO0NBQ0EsV0FBQTtDQUlELG1CQUFBO0FBTEE7O0FBRUE7Q0FJQyxpQkFBQTtDQUNBLFNBQUE7Q0FJRCxrQkFBQTtBQUxBOztBQUVBO0NBSUMsa0JBQUE7Q0FDQSx3Q0FBQTtDQUlELGdCQUFBO0FBTEE7O0FBRUE7Q0FPQSxlQUFBO0NBTEMsWUFBWTtDQUliLGlCQUFBO0FBRkE7O0FBUUE7Q0FMQyw4QkFBOEI7QUFJL0I7O0FBREE7Q0FJQyxVQUFBO0NBSUQsbUJBQUE7QUFMQTs7QUFFQTtDQUlDLGdCQUFBO0NBQ0EsYUFBQTtDQUNBLHNCQUFBO0FBRkQ7O0FBRUE7Q0FJQyxZQUFBO0NBSUQsaUJBQUE7Q0FMQyxnQkFBZ0I7Q0FJakIsaUJBQUE7Q0FGQyx3Q0FBd0M7Q0FJeEMsa0JBQUE7Q0FDQSxrQkFBQTtDQUNBLHlCQUFBO0FBSUQ7O0FBREE7O0NBRUMsY0FBQTtDQUlELGVBQUE7Q0FMQyxrQkFBa0I7QUFJbkI7O0FBREE7Q0FPQSxnQkFBQTtDQUxDLGdCQUFnQjtBQUlqQjs7QUFLQTtDQUxDLGFBQWE7Q0FJZCxvQkFBQTtBQUZBOztBQVFBO0NBTEMsZUFBZTtBQUloQjs7QUFEQTs7Q0FFQyxzQkFBc0I7QUFJdkI7O0FBREE7Q0FJQyxrQkFBQTtDQUNBLG1CQUFBO0FBRkQ7O0FBRUE7Q0FJQSxXQUFBO0NBQ0MsWUFBQTtDQUNBLGNBQUE7Q0FJRCxzQkFBQTtDQUxDLGtCQUFrQjtBQUluQjs7QUFLQTtDQUxDLG9CQUFvQjtDQUlyQixnQkFBQTtBQUZBOztBQUVBO0NBSUMsaUJBQUE7QUFGRDs7QUFFQTs7O0NBU0EsYUFBQTtDQUxDLG1CQUFtQjtDQUlwQixrQkFBQTtBQUZBOztBQUVBO0NBSUMsbUJBQUE7QUFGRDs7QUFFQTtDQUlDLFdBQUE7Q0FDQSxZQUFBO0NBQ0EsbUJBQUE7Q0FDQSxrQkFBQTtDQUNBLHNFQUFBO0NBQ0EsV0FBQTtDQUNBLGFBQUE7Q0FDQSx1QkFBQTtDQUNBLG1CQUFBO0NBQ0EsZUFBQTtDQUNBLGVBQUE7Q0FJRCxTQUFBO0NBTEMsUUFBUTtDQUlULFlBQUE7Q0FDQyx3Q0FBQTtDQUlELG1DQUFBO0NBTEMsMkJBQTJCO0NBSTVCLGdCQUFBO0FBRkE7O0FBRUE7Q0FJQyxtQkFBQTtBQUZEOztBQUVBO0NBS0Msa0JBQUE7Q0FFQSxXQUFBO0NBRUEsYUFBQTtDQUVBLFdBQUE7Q0FDQSxZQUFBO0NBQ0EscUJBQUE7Q0FDQSxnQkFBQTtDQUNBLGtCQUFBO0NBQ0EscUJBQUE7Q0FDQSwwREFBQTtDQUNBLG1DQUFBO0NBQ0EsMkJBQUE7Q0FJRCxzQkFBQTtDQVRDLFVBQVU7Q0FRWCxVQUFBO0NBQ0MseUJBQUE7Q0FFQSxzQkFBQTtDQUlELHFCQUFBO0NBVkMsaUJBQWlCO0FBU2xCOztBQU5BO0NBWUEsWUFBQTtDQVZDLHdDQUF3QztBQVN6Qzs7QUFOQTtDQVlBLGdCQUFBO0NBVkMsVUFBVTtBQVNYOztBQU5BO0NBU0MsaUJBQUE7Q0FDQSxrQkFBQTtBQVBEOztBQUVBO0NBU0MsWUFBQTtDQUlELFlBQUE7Q0FWQyxzQkFBc0I7Q0FTdkIsa0JBQUE7Q0FDQyxlQUFBO0NBQ0EsY0FBQTtDQUNBLGlCQUFBO0NBQ0Esa0JBQUE7QUFQRDs7QUFFQTtDQVNBLFlBQUE7Q0FQQyxlQUFlO0NBQ2YsZ0JBQWdCO0NBU2hCLGNBQUE7Q0FDQSxjQUFBO0FBUEQ7O0FBRUE7OztDQVdDLFlBQUE7Q0FDQSxnQkFBQTtDQUlELGlCQUFBO0FBVkE7O0FBRUE7Q0FZQSxnQkFBQTtDQVZDLGVBQWU7Q0FTaEIsZ0JBQUE7QUFQQTs7QUFFQTtDQVlBLGNBQUE7QUFWQTs7QUFFQTtDQVNDLGFBQUE7Q0FDQSxtQkFBQTtDQUlELG1CQUFBO0FBVkE7O0FBRUE7Q0FTQyxlQUFBO0NBQ0EsaUJBQUE7Q0FJRCxjQUFBO0FBVkE7O0FBRUE7Q0FZQSxVQUFBO0NBVkMsU0FBUztDQVNWLHFCQUFBO0FBUEE7O0FBYUE7Q0FWQyxhQUFhO0FBU2Q7O0FBS0E7Q0FWQywwQkFBMEI7Q0FTM0IsY0FBQTtBQVBBOztBQUVBO0NBU0MsZ0JBQUE7QUFQRDs7QUFFQTtDQVNDLGtCQUFBO0NBSUQsT0FBQTtDQVZDLFFBQVE7Q0FTVCxTQUFBO0NBQ0MsTUFBQTtDQUNBLFlBQUE7Q0FDQSwrQkFBQTtDQUNBLGFBQUE7QUFQRDs7QUFFQTtDQVNDLHFCQUFBO0NBQ0EsY0FBQTtDQUNBLGdCQUFBO0NBQ0Esa0JBQUE7Q0FDQSxPQUFBO0NBSUQsUUFBQTtDQVZDLFNBQVM7Q0FTVixNQUFBO0NBQ0MsWUFBQTtDQUlELGtCQUFBO0NBVkMsa0JBQWtCO0NBU25CLGVBQUE7QUFQQTs7QUFhQTtDQVZDLGNBQWM7QUFTZjs7QUFLQTtDQVZDLDBCQUEwQjtDQVMzQixjQUFBO0FBUEE7O0FBRUE7Q0FZQSxtQkFBQTtBQVZBOztBQUVBO0NBU0MsaUJBQUE7Q0FDQSxrQkFBQTtDQUNBLGNBQUE7QUFJRDs7QUFEQTtDQUNDLHlCQUFBO0NBQ0EsYUFBQTtDQUlELHdDQUFBO0NBVkMsa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsZ0JBQWdCO0NBQ2hCLG1CQUFtQjtBQUNwQiIsImZpbGUiOiJzdHlsZXMuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblxuIyBCRU0gKEJMT0NLLCBFTEVNRU5ULCBNT0RJRklFUikgTUVUSEVET0xPR1lcblxuPGRpdiBjbGFzcz1cImNhcmQgY2FyZC0tc2hvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZF9fdGl0bGVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRfX2NvbnRhaW5lclwiPlxuXG4gIDwvZGl2PlxuPC9kaXY+XG5cbi5jYXJkIC0gQkxPQ0tcblxuLmNhcmRfX3RpdGxlIC0gRUxFTUVOVFxuXG4uY2FyZC0tc2hvdyAtIE1PRElGSUVSXG5cbiovXG5cbi8qIFJFU0VUIHN0eWxlcyAqL1xuXG4qLFxuKjo6YWZ0ZXIsXG4qOjpiZWZvcmUge1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5odG1sLFxuYm9keSxcbnAge1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG59XG5cbmEge1xuXHRjb2xvcjogIzU0NmU3YTtcbn1cblxudWwsXG5saSB7XG5cdGxpc3Qtc3R5bGU6IG5vbmU7XG5cdHBhZGRpbmc6IDA7XG5cdG1hcmdpbjogMDtcbn1cblxuLm5vLS1zZWxlY3Qge1xuXHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xuXHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5oMyB7XG5cdHRleHQtYWxpZ246IGxlZnQ7XG5cdG1hcmdpbi10b3A6IDIwcHg7XG5cdG1hcmdpbi1ib3R0b206IDMwcHg7XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi8qIE1BSU4gc3R5bGVzICovXG5cbmJvZHkge1xuXHRmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG5cdC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcblx0c2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG5cbi5hcHAtbGF5b3V0IHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHR0b3A6IDA7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdHdpZHRoOiAxMDAlO1xuXHRoZWlnaHQ6IDEwMCU7XG59XG5cbmhlYWRlciB7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogNTZweDtcblx0dG9wOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNTQ2ZTdhO1xuXHRib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR6LWluZGV4OiAxO1xuXHRjb2xvcjogI2ZmZjtcblx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xuXHR1c2VyLXNlbGVjdDogbm9uZTtcblx0dHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAyNTBtcyBsaW5lYXI7XG59XG5cbi5hcHBfX29mZmxpbmUge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNmI2YjZiO1xufVxuXG4uaGVhZGVyX19pY29uIHtcblx0d2lkdGg6IDQ4cHg7XG5cdGhlaWdodDogNDhweDtcblx0bWFyZ2luOiA0cHg7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oZWFkZXJfX2ljb246YWN0aXZlIHtcblx0b3BhY2l0eTogMC44O1xuXHRvdXRsaW5lOiAxcHggc29saWQgI2ZmZjtcbn1cblxuLmhlYWRlcl9fdGl0bGUge1xuXHRjb2xvcjogI2ZmZjtcblx0Zm9udC1zaXplOiAyMHB4O1xuXHQtbXMtZ3JpZC1yb3ctYWxpZ246IGNlbnRlcjtcblx0YWxpZ24tc2VsZjogY2VudGVyO1xuXHRtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuLm1lbnUge1xuXHR3aWR0aDogMjgwcHg7XG5cdGhlaWdodDogMTAwJTtcblx0YmFja2dyb3VuZDogI2ZmZjtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGJvdHRvbTogMDtcblx0Ym94LXNoYWRvdzogMHB4IDBweCAxMXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG5cdHotaW5kZXg6IDE7XG5cdHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMywgMSk7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpO1xuXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKTtcblx0LXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTExMCUpO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTExMCUpO1xuXHR3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuXHR6LWluZGV4OiAyO1xufVxuXG4ubWVudS0tc2hvdyB7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG59XG5cbi5tZW51X19vdmVybGF5IHtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogMTAwJTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4zKTtcblx0dHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKTtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xuXHRvcGFjaXR5OiAwO1xuXHR6LWluZGV4OiAxO1xufVxuXG4ubWVudV9fb3ZlcmxheS0tc2hvdyB7XG5cdHZpc2liaWxpdHk6IHZpc2libGU7XG5cdG9wYWNpdHk6IDE7XG59XG5cbi5tZW51X19oZWFkZXIge1xuXHRoZWlnaHQ6IDE1MHB4O1xuXHRiYWNrZ3JvdW5kOiAjNTQ2ZTdhO1xuXHRjb2xvcjogI2ZmZjtcblx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG59XG5cbi5tZW51X19saXN0IHtcblx0d2lkdGg6IGluaGVyaXQ7XG5cdGhlaWdodDogaW5oZXJpdDtcblx0b3ZlcmZsb3c6IGF1dG87XG5cdG92ZXJmbG93LXg6IGhpZGRlbjtcblx0LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY2O1xufVxuXG4ubWVudV9fbGlzdCBsaSB7XG5cdGJvcmRlcjogMDtcblx0cGFkZGluZzogMDtcblx0Ym94LXNoYWRvdzogbm9uZTtcblx0Ym9yZGVyLXJhZGl1czogMDtcbn1cblxuLm1lbnVfX2xpc3QgbGkgYSB7XG5cdHBhZGRpbmc6IDIwcHg7XG5cdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuXG4ubWVudV9fbGlzdCBsaSBhOmFjdGl2ZSxcbi5tZW51X19saXN0IGxpIGE6aG92ZXIge1xuXHRiYWNrZ3JvdW5kOiAjZTdlN2U3O1xufVxuXG4uYXBwX19jb250ZW50IHtcblx0d2lkdGg6IDMyMHB4O1xuXHRoZWlnaHQ6IDEwMCU7XG5cdG1hcmdpbjogMCBhdXRvO1xuXHRtYXJnaW4tdG9wOiA1NnB4O1xuXHRwYWRkaW5nLXRvcDogMTBweDtcbn1cblxuLnRvYXN0X19tc2cge1xuXHRtYXgtd2lkdGg6IDI5MHB4O1xuXHRtaW4taGVpZ2h0OiA1MHB4O1xuXHRsaW5lLWhlaWdodDogNTBweDtcblx0Y29sb3I6ICNmZmY7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcblx0cGFkZGluZy1yaWdodDogMTBweDtcblx0dGV4dC10cmFuc2Zvcm06IGluaXRpYWw7XG5cdG1hcmdpbi1ib3R0b206IDEwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICM0MDQwNDA7XG5cdGJvcmRlci1yYWRpdXM6IDNweDtcblx0Ym94LXNoYWRvdzogMCAwIDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcblx0d29yZC1icmVhazogYnJlYWstYWxsO1xuXHRmb250LXNpemU6IDE1cHg7XG5cdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdG9wYWNpdHk6IDA7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG5cdHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0Ym90dG9tOiAyMHB4O1xuXHRsZWZ0OiAyMHB4O1xufVxuXG4udG9hc3RfX21zZy0tc2hvdyB7XG5cdG9wYWNpdHk6IDE7XG5cdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG59XG5cbmJ1dHRvbiB7XG5cdG1pbi13aWR0aDogOTBweDtcblx0aGVpZ2h0OiAzNXB4O1xuXHRmb250LXNpemU6IDE0cHg7XG5cdGJvcmRlcjogMDtcblx0YmFja2dyb3VuZDogIzRmOGVmYTtcblx0Y29sb3I6ICNmZmY7XG5cdG1hcmdpbjogMCBhdXRvIC01cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRvdXRsaW5lOiAwO1xuXHRib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMzgpO1xuXHQtd2Via2l0LWJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zOCk7XG5cdC1tb3otYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjM4KTtcblx0LW8tYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjM4KTtcblx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuYnV0dG9uOmFjdGl2ZSB7XG5cdGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbmJ1dHRvbjpkaXNhYmxlZCB7XG5cdGJhY2tncm91bmQ6ICNjY2M7XG5cdGNvbG9yOiAjMDAwO1xuXHRjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uY3VzdG9tX19idXR0b24gcCB7XG5cdHBvc2l0aW9uOiBpbml0aWFsO1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuLmN1c3RvbV9fYnV0dG9uIHtcblx0cGFkZGluZzogMTBweCAxNXB4O1xuXHRmb250LWZhbWlseTogXCJSb2JvdG9cIiwgYXJpYWwsIHNhbnMtc2VyaWY7XG5cdHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi50dXJuLW9uLXN5bmMge1xuXHRtaW4td2lkdGg6IDc1cHg7XG5cdGhlaWdodDogMzBweDtcblx0bWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5jdXN0b21fX2lucHV0OmNoZWNrZWQgKyAuY3VzdG9tX19jaGVja2JveCB7XG5cdGJhY2tncm91bmQ6IHJnYigxOTUsIDE5NSwgMTk1KTtcbn1cblxuLmN1c3RvbV9faW5wdXQ6Y2hlY2tlZCArIC5jdXN0b21fX2NoZWNrYm94OjpiZWZvcmUge1xuXHRsZWZ0OiAyNXB4O1xuXHRiYWNrZ3JvdW5kOiAjMDI4OGQxO1xufVxuXG4uY2FyZF9fY29udGFpbmVyIHtcblx0bWFyZ2luLXRvcDogMTBweDtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNhcmQge1xuXHR3aWR0aDogMzIwcHg7XG5cdG1pbi1oZWlnaHQ6IDI4MHB4O1xuXHRiYWNrZ3JvdW5kOiAjZmZmO1xuXHRtYXJnaW46IDIwcHggYXV0bztcblx0Ym94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xKTtcblx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNlNmU2ZTY7XG59XG5cbi5jYXJkX190aXRsZSxcbi5jYXJkX19kZXNjIHtcblx0ZGlzcGxheTogYmxvY2s7XG5cdGZvbnQtc2l6ZTogMTRweDtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2FyZF9fdGl0bGUge1xuXHRtYXJnaW4tbGVmdDogNXB4O1xuXHRmb250LXdlaWdodDogNTAwO1xufVxuXG4uY2FyZF9fdGVtcCB7XG5cdHBhZGRpbmc6IDIwcHg7XG5cdHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uY2FyZF9fdGVtcCBzcGFuIHtcblx0Zm9udC1zaXplOiAxNHB4O1xufVxuXG4uY2FyZF9fZm9sbG93aW5nLFxuLmNhcmRfX2ZvbGxvd2VycyB7XG5cdHBhZGRpbmc6IDEwcHggMjBweCA1cHg7XG59XG5cbi5jYXJkX19kZXNjIHtcblx0cGFkZGluZzogMTJweCAxNXB4O1xuXHR2ZXJ0aWNhbC1hbGlnbjogdG9wO1xufVxuXG4uY2FyZF9faW1nIHtcblx0d2lkdGg6IDYwcHg7XG5cdGhlaWdodDogNjBweDtcblx0ZGlzcGxheTogYmxvY2s7XG5cdG1hcmdpbjogMjBweCBhdXRvIDEwcHg7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuYiB7XG5cdGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuXHRmb250LXdlaWdodDogNTAwO1xufVxuXG4uY2FyZCBiIHtcblx0bWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbi5jYXJkX190ZW1wLFxuLmNhcmRfX2ZvbGxvd2Vycyxcbi5jYXJkX19mb2xsb3dpbmcge1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5jYXJkX19mb2xsb3dlcnMge1xuXHRtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZmFiIHtcblx0d2lkdGg6IDU2cHg7XG5cdGhlaWdodDogNTZweDtcblx0YmFja2dyb3VuZDogIzU0NmU3YTtcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xuXHRib3gtc2hhZG93OiAwIDAgNHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMjgpO1xuXHRjb2xvcjogI2ZmZjtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0cG9zaXRpb246IGZpeGVkO1xuXHRib3R0b206IDA7XG5cdHJpZ2h0OiAwO1xuXHRtYXJnaW46IDI1cHg7XG5cdC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuXHRiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG5cdG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5mYWIuYWN0aXZlIHtcblx0YmFja2dyb3VuZDogI2ZhYWIxYTtcbn1cblxuLmZhYl9fcmlwcGxlIHtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAtMTdweDtcblx0Ym90dG9tOiAtMTJweDtcblx0d2lkdGg6IDU2cHg7XG5cdGhlaWdodDogNTZweDtcblx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG5cdHRyYW5zZm9ybTogc2NhbGUoMC41KTtcblx0YmFja2dyb3VuZDogI2ZmZjtcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xuXHQtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJTtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlO1xuXHR0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXM7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXM7XG5cdHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjM1cyBjdWJpYy1iZXppZXIoMCwgMCwgMC4zLCAxKSAwbXMsIC13ZWJraXQtdHJhbnNmb3JtIDAuMzVzIGN1YmljLWJlemllcigwLCAwLCAwLjMsIDEpIDBtcztcblx0LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG5cdGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcblx0d2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcblx0ei1pbmRleDogMjtcblx0b3BhY2l0eTogMDtcblx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcblx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xuXHR1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLmZhYjphY3RpdmUgLmZhYl9fcmlwcGxlIHtcblx0b3BhY2l0eTogMC4yO1xuXHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlKDMxJSwgLTIyJSk7XG5cdHRyYW5zZm9ybTogc2NhbGUoMSkgdHJhbnNsYXRlKDMxJSwgLTIyJSk7XG59XG5cbi5mYWJfX2ltYWdlIHtcblx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0ei1pbmRleDogMztcbn1cblxuLmFkZF9fY2FyZCB7XG5cdG1hcmdpbjogNDBweCBhdXRvO1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hZGRfX2lucHV0IHtcblx0d2lkdGg6IDIxMHB4O1xuXHRoZWlnaHQ6IDM1cHg7XG5cdGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG5cdHBhZGRpbmctbGVmdDogMTBweDtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luOiAxMHB4IGF1dG87XG5cdGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmFkZF9fYnRuIHtcblx0aGVpZ2h0OiAzNHB4O1xuXHRtaW4td2lkdGg6IDcwcHg7XG5cdG1hcmdpbi10b3A6IDEwcHg7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXJnaW4tbGVmdDogMDtcbn1cblxuLmFkZF9fY2FyZCB1bCxcbi5hZGRfX2NhcmQgbGksXG4uc2hhcmVfX2NvbnRhaW5lciBsaSB7XG5cdHdpZHRoOiAzMjBweDtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0bWFyZ2luOiAxNXB4IGF1dG87XG59XG5cbi5hZGRfX2NhcmQgcCB7XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG5cdGZvbnQtc2l6ZTogMThweDtcblx0bWFyZ2luLXRvcDogNDBweDtcbn1cblxuLmNhcmQgc3BhbiB7XG5cdGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uYWRkX190by1jYXJkIHtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0bWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmJnLXN5bmNfX3RleHQge1xuXHRmb250LXNpemU6IDEycHg7XG5cdHBhZGRpbmctbGVmdDogNXB4O1xuXHRjb2xvcjogIzAwODAwMDtcbn1cblxuLmN1c3RvbV9fYnV0dG9uLmN1c3RvbV9fYnV0dG9uLWJnIHtcblx0cGFkZGluZzogMDtcblx0bWFyZ2luOiAwO1xuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5jdXN0b21fX2J1dHRvbi5jdXN0b21fX2J1dHRvbi1iZy5oaWRlIHtcblx0ZGlzcGxheTogbm9uZTtcbn1cblxuYiBpIGEge1xuXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblx0Y29sb3I6ICM1NDZlN2E7XG59XG5cbi5hZGRfX2NhcmQgdWwgKyBwIHtcblx0bWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmNhcmRfX3NwaW5uZXIge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHRib3R0b206IDA7XG5cdHRvcDogMDtcblx0bWFyZ2luOiBhdXRvO1xuXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuXHRkaXNwbGF5OiBub25lO1xufVxuXG4uY2FyZF9fc3Bpbm5lcjo6YWZ0ZXIge1xuXHRjb250ZW50OiBcIkxvYWRpbmcuLi5cIjtcblx0Y29sb3I6ICM1NDZlN2E7XG5cdGJhY2tncm91bmQ6ICNmZmY7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0cmlnaHQ6IDA7XG5cdGJvdHRvbTogMDtcblx0dG9wOiAwO1xuXHRtYXJnaW46IGF1dG87XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0bGluZS1oZWlnaHQ6IDM4MHB4O1xuXHRmb250LXNpemU6IDE4cHg7XG59XG5cbi5jYXJkX19zcGlubmVyLnNob3cge1xuXHRkaXNwbGF5OiBibG9jaztcbn1cblxuLnNoYXJlX19jb250YWluZXIgYSB7XG5cdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuXHRjb2xvcjogIzU0NmU3YTtcbn1cblxuLnNoYXJlX19jb250YWluZXIge1xuXHRtYXJnaW4tYm90dG9tOiA1MHB4O1xufVxuXG4uc2hhcmUge1xuXHRtYXJnaW46IDIwcHggYXV0bztcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRkaXNwbGF5OiBibG9jaztcbn1cblxubGkge1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZTZlNmU2O1xuXHRwYWRkaW5nOiAxMHB4O1xuXHRib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuXHRib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbmg0IHtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0bWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbiJdfQ== */", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;CAiBC;;AAED,iBAAA;;AAEA;;;CAGC,sBAAA;AACD;;AAEA;CACC,gBAAgB;IACb,cAAc;IACjB,kBAAA;CACA,mBAAA;AACD;;AAEA;;;CAGC,SAAS;CACV,UAAA;AACA;;AAEA;CACC,cAAA;AACD;;AAEA;;CAEC,gBAAA;CACA,UAAA;CACA,SAAA;AACD;;AAEA;CACC,sBAAA;CACA,qBAAA;CACA,yBAAA;CACA,iBAAA;AACD;;AAEA;CACC,gBAAgB;CACjB,gBAAA;CACC,mBAAA;CACA,gBAAA;AACD;;AAEA,gBAAC;;AAED;CACA,mEAAA;CACC,eAAA;CACA,mCAAA;CACA,8BAAA;CACA,uBAAA;AACD;;AAEA;CACA,kBAAA;CACC,MAAM;CACP,OAAA;CACC,QAAA;CACA,SAAA;CACA,WAAA;CACA,YAAA;AACD;;AAEA;CACC,eAAA;CACA,WAAA;CACA,YAAA;CACA,MAAA;CACA,yBAAA;CACA,2CAAA;CACA,aAAA;CACA,gBAAA;CACD,UAAA;CACC,WAAW;CACZ,yBAAA;CACC,sBAAA;CACD,qBAAA;CACC,iBAAiB;CAClB,yCAAA;AACA;;AAEA;CACC,yBAAA;AACD;;AAEA;CACA,WAAA;CACC,YAAY;CACb,WAAA;CACC,aAAA;CACA,mBAAA;CACD,uBAAA;CACC,eAAe;AAChB;;AAEA;CACC,YAAA;CACA,uBAAA;AACD;;AAEA;CACA,WAAA;CACC,eAAA;CACA,0BAAA;CACA,kBAAA;CACA,iBAAA;AACD;;AAEA;CACC,YAAA;CAEA,YAAA;CAGA,gBAAA;CACA,eAAA;CACA,MAAA;CACD,SAAA;CAFC,+CAA+C;CAIhD,UAAA;CAEC,qDAAA;CACD,4BAAA;CAHC,sBAAsB;CAKvB,UAAA;AAHA;;AAEA;CAKC,wBAAA;AAHD;;AAEA;CAKC,WAAA;CACA,YAAA;CACA,eAAA;CACA,MAAA;CACA,OAAA;CACD,QAAA;CAHC,SAAS;CAKV,8BAAA;CACC,oDAAA;CACA,kBAAA;CACD,UAAA;CAHC,UAAU;AAKX;;AAFA;CAKC,mBAAA;CACA,UAAA;AACD;;AAEA;CACC,aAAA;CACA,mBAAA;CACA,WAAA;CACA,6BAAA;AAHD;;AAMA;CAHC,cAAc;CAKf,eAAA;CACC,cAAA;CACA,kBAAA;CACA,iCAAA;CACA,yBAAA;AACD;;AAEA;CACC,SAAA;CACA,UAAA;CACA,gBAAA;CACA,gBAAA;AACD;;AAEA;CAHC,aAAa;CAKb,0BAAA;CACD,eAAA;CAHC,cAAc;AAKf;;AAFA;;CAMC,mBAAA;AAHD;;AAEA;CAKA,WAAA;CACC,YAAA;CACA,aAAA;CACA,gBAAA;CACA,iBAAA;AAHD;;AAEA;CAKC,gBAAA;CACA,gBAAA;CACA,iBAAA;CACA,WAAA;CACA,kBAAA;CACA,mBAAA;CACA,uBAAA;CACA,mBAAA;CAEA,yBAAA;CACA,kBAAA;CACA,sEAAA;CACA,qBAAA;CACA,eAAA;CACD,gBAAA;CAJC,UAAU;CAMX,2BAAA;CACC,sBAAA;CAEA,eAAA;CACD,YAAA;CALC,UAAU;AAOX;;AAJA;CAOC,UAAA;CACA,wBAAA;AALD;;AAEA;CAOC,eAAA;CACA,YAAA;CACA,eAAA;CACA,SAAA;CACA,mBAAA;CACA,WAAA;CACA,mBAAA;CACA,qBAAA;CALA,eAKA;CAJA,UAIA;CAHA,2CAGA;CACA,mDAAA;CAID,gDAAA;CALC,8CAA8C;CAI/C,yBAAA;IACC,sBAAA;KAID,qBAAA;SALS,iBAAiB;CAI1B,kBAAA;AAFA;;AAEA;CAOA,gBAAA;AALA;;AAEA;CAIC,gBAAA;CACA,WAAA;CAID,mBAAA;AALA;;AAEA;CAIC,iBAAA;CACA,SAAA;CAID,kBAAA;AALA;;AAEA;CAIC,kBAAA;CACA,wCAAA;CAID,gBAAA;AALA;;AAEA;CAOA,eAAA;CALC,YAAY;CAIb,iBAAA;AAFA;;AAQA;CALC,8BAA8B;AAI/B;;AADA;CAIC,UAAA;CAID,mBAAA;AALA;;AAEA;CAIC,gBAAA;CACA,aAAA;CACA,sBAAA;AAFD;;AAEA;CAIC,YAAA;CAID,iBAAA;CALC,gBAAgB;CAIjB,iBAAA;CAFC,wCAAwC;CAIxC,kBAAA;CACA,kBAAA;CACA,yBAAA;AAID;;AADA;;CAEC,cAAA;CAID,eAAA;CALC,kBAAkB;AAInB;;AADA;CAOA,gBAAA;CALC,gBAAgB;AAIjB;;AAKA;CALC,aAAa;CAId,oBAAA;AAFA;;AAQA;CALC,eAAe;AAIhB;;AADA;;CAEC,sBAAsB;AAIvB;;AADA;CAIC,kBAAA;CACA,mBAAA;AAFD;;AAEA;CAIA,WAAA;CACC,YAAA;CACA,cAAA;CAID,sBAAA;CALC,kBAAkB;AAInB;;AAKA;CALC,oBAAoB;CAIrB,gBAAA;AAFA;;AAEA;CAIC,iBAAA;AAFD;;AAEA;;;CASA,aAAA;CALC,mBAAmB;CAIpB,kBAAA;AAFA;;AAEA;CAIC,mBAAA;AAFD;;AAEA;CAIC,WAAA;CACA,YAAA;CACA,mBAAA;CACA,kBAAA;CACA,sEAAA;CACA,WAAA;CACA,aAAA;CACA,uBAAA;CACA,mBAAA;CACA,eAAA;CACA,eAAA;CAID,SAAA;CALC,QAAQ;CAIT,YAAA;CACC,wCAAA;CAID,mCAAA;CALC,2BAA2B;CAI5B,gBAAA;AAFA;;AAEA;CAIC,mBAAA;AAFD;;AAEA;CAKC,kBAAA;CAEA,WAAA;CAEA,aAAA;CAEA,WAAA;CACA,YAAA;CACA,qBAAA;CACA,gBAAA;CACA,kBAAA;CACA,qBAAA;CACA,0DAAA;CACA,mCAAA;CACA,2BAAA;CAID,sBAAA;CATC,UAAU;CAQX,UAAA;CACC,yBAAA;CAEA,sBAAA;CAID,qBAAA;CAVC,iBAAiB;AASlB;;AANA;CAYA,YAAA;CAVC,wCAAwC;AASzC;;AANA;CAYA,gBAAA;CAVC,UAAU;AASX;;AANA;CASC,iBAAA;CACA,kBAAA;AAPD;;AAEA;CASC,YAAA;CAID,YAAA;CAVC,sBAAsB;CASvB,kBAAA;CACC,eAAA;CACA,cAAA;CACA,iBAAA;CACA,kBAAA;AAPD;;AAEA;CASA,YAAA;CAPC,eAAe;CACf,gBAAgB;CAShB,cAAA;CACA,cAAA;AAPD;;AAEA;;;CAWC,YAAA;CACA,gBAAA;CAID,iBAAA;AAVA;;AAEA;CAYA,gBAAA;CAVC,eAAe;CAShB,gBAAA;AAPA;;AAEA;CAYA,cAAA;AAVA;;AAEA;CASC,aAAA;CACA,mBAAA;CAID,mBAAA;AAVA;;AAEA;CASC,eAAA;CACA,iBAAA;CAID,cAAA;AAVA;;AAEA;CAYA,UAAA;CAVC,SAAS;CASV,qBAAA;AAPA;;AAaA;CAVC,aAAa;AASd;;AAKA;CAVC,0BAA0B;CAS3B,cAAA;AAPA;;AAEA;CASC,gBAAA;AAPD;;AAEA;CASC,kBAAA;CAID,OAAA;CAVC,QAAQ;CAST,SAAA;CACC,MAAA;CACA,YAAA;CACA,+BAAA;CACA,aAAA;AAPD;;AAEA;CASC,qBAAA;CACA,cAAA;CACA,gBAAA;CACA,kBAAA;CACA,OAAA;CAID,QAAA;CAVC,SAAS;CASV,MAAA;CACC,YAAA;CAID,kBAAA;CAVC,kBAAkB;CASnB,eAAA;AAPA;;AAaA;CAVC,cAAc;AASf;;AAKA;CAVC,0BAA0B;CAS3B,cAAA;AAPA;;AAEA;CAYA,mBAAA;AAVA;;AAEA;CASC,iBAAA;CACA,kBAAA;CACA,cAAA;AAID;;AADA;CACC,yBAAA;CACA,aAAA;CAID,wCAAA;CAVC,kBAAkB;AACnB;;AAEA;CACC,gBAAgB;CAChB,mBAAmB;AACpB;AACA,o2kBAAo2kB","sourcesContent":["/*\n\n# BEM (BLOCK, ELEMENT, MODIFIER) METHEDOLOGY\n\n<div class=\"card card--show\">\n  <div class=\"card__title\"></div>\n  <div class=\"card__container\">\n\n  </div>\n</div>\n\n.card - BLOCK\n\n.card__title - ELEMENT\n\n.card--show - MODIFIER\n\n*/\n\n/* RESET styles */\n\n*,\n*::after,\n*::before {\n\tbox-sizing: border-box;\n}\n\nhtml,\nbody,\np {\n\tmargin: 0;\n\tpadding: 0;\n}\n\na {\n\tcolor: #546e7a;\n}\n\nul,\nli {\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.no--select {\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\t-webkit-user-select: none;\n\tuser-select: none;\n}\n\nh3 {\n\ttext-align: left;\n\tmargin-top: 20px;\n\tmargin-bottom: 30px;\n\tfont-weight: 500;\n}\n\n/* MAIN styles */\n\nbody {\n\tfont-family: Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n\tfont-size: 14px;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-size-adjust: 100%;\n\tscroll-behavior: smooth;\n}\n\n.app-layout {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\nheader {\n\tposition: fixed;\n\twidth: 100%;\n\theight: 56px;\n\ttop: 0;\n\tbackground-color: #546e7a;\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.19);\n\tdisplay: flex;\n\toverflow: hidden;\n\tz-index: 1;\n\tcolor: #fff;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\ttransition: background-color 250ms linear;\n}\n\n.app__offline {\n\tbackground-color: #6b6b6b;\n}\n\n.header__icon {\n\twidth: 48px;\n\theight: 48px;\n\tmargin: 4px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tcursor: pointer;\n}\n\n.header__icon:active {\n\topacity: 0.8;\n\toutline: 1px solid #fff;\n}\n\n.header__title {\n\tcolor: #fff;\n\tfont-size: 20px;\n\t-ms-grid-row-align: center;\n\talign-self: center;\n\tmargin-left: 10px;\n}\n\n.menu {\n\twidth: 280px;\n\theight: 100%;\n\tbackground: #fff;\n\tposition: fixed;\n\ttop: 0;\n\tbottom: 0;\n\tbox-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);\n\tz-index: 1;\n\ttransition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\ttransition: transform 0.3s cubic-bezier(0, 0, 0.3, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n\t-webkit-transform: translateX(-110%);\n\ttransform: translateX(-110%);\n\twill-change: transform;\n\tz-index: 2;\n}\n\n.menu--show {\n\t-webkit-transform: translateX(0);\n\ttransform: translateX(0);\n}\n\n.menu__overlay {\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground: rgba(0, 0, 0, 0.3);\n\ttransition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);\n\tvisibility: hidden;\n\topacity: 0;\n\tz-index: 1;\n}\n\n.menu__overlay--show {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n.menu__header {\n\theight: 150px;\n\tbackground: #546e7a;\n\tcolor: #fff;\n\tborder-bottom: 1px solid #ddd;\n}\n\n.menu__list {\n\twidth: inherit;\n\theight: inherit;\n\toverflow: auto;\n\toverflow-x: hidden;\n\t-webkit-overflow-scrolling: touch;\n\tbackground-color: #f5f5f6;\n}\n\n.menu__list li {\n\tborder: 0;\n\tpadding: 0;\n\tbox-shadow: none;\n\tborder-radius: 0;\n}\n\n.menu__list li a {\n\tpadding: 20px;\n\tcolor: rgba(0, 0, 0, 0.87);\n\tcursor: pointer;\n\tdisplay: block;\n}\n\n.menu__list li a:active,\n.menu__list li a:hover {\n\tbackground: #e7e7e7;\n}\n\n.app__content {\n\twidth: 320px;\n\theight: 100%;\n\tmargin: 0 auto;\n\tmargin-top: 56px;\n\tpadding-top: 10px;\n}\n\n.toast__msg {\n\tmax-width: 290px;\n\tmin-height: 50px;\n\tline-height: 50px;\n\tcolor: #fff;\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n\ttext-transform: initial;\n\tmargin-bottom: 10px;\n\tbackground-color: #404040;\n\tborder-radius: 3px;\n\tbox-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\n\tword-break: break-all;\n\tfont-size: 15px;\n\tfont-weight: 400;\n\topacity: 0;\n\t-webkit-transform: translateY(20px);\n\ttransform: translateY(20px);\n\twill-change: transform;\n\tposition: fixed;\n\tbottom: 20px;\n\tleft: 20px;\n}\n\n.toast__msg--show {\n\topacity: 1;\n\t-webkit-transform: translateY(0);\n\ttransform: translateY(0);\n}\n\nbutton {\n\tmin-width: 90px;\n\theight: 35px;\n\tfont-size: 14px;\n\tborder: 0;\n\tbackground: #4f8efa;\n\tcolor: #fff;\n\tmargin: 0 auto -5px;\n\tdisplay: inline-block;\n\tcursor: pointer;\n\toutline: 0;\n\tbox-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-moz-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\t-o-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.38);\n\tuser-select: none;\n\tborder-radius: 4px;\n}\n\nbutton:active {\n\tbox-shadow: none;\n}\n\nbutton:disabled {\n\tbackground: #ccc;\n\tcolor: #000;\n\tcursor: not-allowed;\n}\n\n.custom__button p {\n\tposition: initial;\n\tmargin: 0;\n\tpadding-left: 10px;\n}\n\n.custom__button {\n\tpadding: 10px 15px;\n\tfont-family: \"Roboto\", arial, sans-serif;\n\ttext-align: left;\n}\n\n.turn-on-sync {\n\tmin-width: 75px;\n\theight: 30px;\n\tmargin-left: 10px;\n}\n\n.custom__input:checked + .custom__checkbox {\n\tbackground: rgb(195, 195, 195);\n}\n\n.custom__input:checked + .custom__checkbox::before {\n\tleft: 25px;\n\tbackground: #0288d1;\n}\n\n.card__container {\n\tmargin-top: 10px;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.card {\n\twidth: 320px;\n\tmin-height: 280px;\n\tbackground: #fff;\n\tmargin: 20px auto;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n\tborder-radius: 8px;\n\tposition: relative;\n\tborder: 1px solid #e6e6e6;\n}\n\n.card__title,\n.card__desc {\n\tdisplay: block;\n\tfont-size: 14px;\n\ttext-align: center;\n}\n\n.card__title {\n\tmargin-left: 5px;\n\tfont-weight: 500;\n}\n\n.card__temp {\n\tpadding: 20px;\n\tpadding-bottom: 10px;\n}\n\n.card__temp span {\n\tfont-size: 14px;\n}\n\n.card__following,\n.card__followers {\n\tpadding: 10px 20px 5px;\n}\n\n.card__desc {\n\tpadding: 12px 15px;\n\tvertical-align: top;\n}\n\n.card__img {\n\twidth: 60px;\n\theight: 60px;\n\tdisplay: block;\n\tmargin: 20px auto 10px;\n\tborder-radius: 50%;\n}\n\nb {\n\tfont-family: inherit;\n\tfont-weight: 500;\n}\n\n.card b {\n\tmargin-right: 5px;\n}\n\n.card__temp,\n.card__followers,\n.card__following {\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin-bottom: 5px;\n}\n\n.card__followers {\n\tmargin-bottom: 20px;\n}\n\n.fab {\n\twidth: 56px;\n\theight: 56px;\n\tbackground: #546e7a;\n\tborder-radius: 50%;\n\tbox-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);\n\tcolor: #fff;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcursor: pointer;\n\tposition: fixed;\n\tbottom: 0;\n\tright: 0;\n\tmargin: 25px;\n\t-webkit-tap-highlight-color: transparent;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n\toverflow: hidden;\n}\n\n.fab.active {\n\tbackground: #faab1a;\n}\n\n.fab__ripple {\n\tposition: absolute;\n\tleft: -17px;\n\tbottom: -12px;\n\twidth: 56px;\n\theight: 56px;\n\t-webkit-transform: scale(0.5);\n\ttransform: scale(0.5);\n\tbackground: #fff;\n\tborder-radius: 50%;\n\t-webkit-transform-origin: 50%;\n\ttransform-origin: 50%;\n\ttransition: -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\ttransition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms, -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n\twill-change: transform;\n\tz-index: 2;\n\topacity: 0;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.fab:active .fab__ripple {\n\topacity: 0.2;\n\t-webkit-transform: scale(1) translate(31%, -22%);\n\ttransform: scale(1) translate(31%, -22%);\n}\n\n.fab__image {\n\toverflow: hidden;\n\tz-index: 3;\n}\n\n.add__card {\n\tmargin: 40px auto;\n\ttext-align: center;\n}\n\n.add__input {\n\twidth: 210px;\n\theight: 35px;\n\tborder: 1px solid #ccc;\n\tpadding-left: 10px;\n\tfont-size: 14px;\n\tdisplay: block;\n\tmargin: 10px auto;\n\tborder-radius: 4px;\n}\n\n.add__btn {\n\theight: 34px;\n\tmin-width: 70px;\n\tmargin-top: 10px;\n\tdisplay: block;\n\tmargin-left: 0;\n}\n\n.add__card ul,\n.add__card li,\n.share__container li {\n\twidth: 320px;\n\ttext-align: left;\n\tmargin: 15px auto;\n}\n\n.add__card p {\n\tfont-weight: 500;\n\tfont-size: 18px;\n\tmargin-top: 40px;\n}\n\n.card span {\n\tdisplay: block;\n}\n\n.add__to-card {\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin-bottom: 20px;\n}\n\n.bg-sync__text {\n\tfont-size: 12px;\n\tpadding-left: 5px;\n\tcolor: #008000;\n}\n\n.custom__button.custom__button-bg {\n\tpadding: 0;\n\tmargin: 0;\n\tdisplay: inline-block;\n}\n\n.custom__button.custom__button-bg.hide {\n\tdisplay: none;\n}\n\nb i a {\n\ttext-decoration: underline;\n\tcolor: #546e7a;\n}\n\n.add__card ul + p {\n\tmargin-top: 20px;\n}\n\n.card__spinner {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\tmargin: auto;\n\tbackground: rgba(0, 0, 0, 0.16);\n\tdisplay: none;\n}\n\n.card__spinner::after {\n\tcontent: \"Loading...\";\n\tcolor: #546e7a;\n\tbackground: #fff;\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\ttop: 0;\n\tmargin: auto;\n\ttext-align: center;\n\tline-height: 380px;\n\tfont-size: 18px;\n}\n\n.card__spinner.show {\n\tdisplay: block;\n}\n\n.share__container a {\n\ttext-decoration: underline;\n\tcolor: #546e7a;\n}\n\n.share__container {\n\tmargin-bottom: 50px;\n}\n\n.share {\n\tmargin: 20px auto;\n\ttext-align: center;\n\tdisplay: block;\n}\n\nli {\n\tborder: 1px solid #e6e6e6;\n\tpadding: 10px;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n\tborder-radius: 8px;\n}\n\nh4 {\n\ttext-align: left;\n\tmargin-bottom: 30px;\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/linked-list-typescript/lib/src/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/linked-list-typescript/lib/src/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class LinkedList {
    constructor(...values) {
        this._head = this._tail = null;
        this._length = 0;
        if (values.length > 0) {
            values.forEach((value) => {
                this.append(value);
            });
        }
    }
    *iterator() {
        let currentItem = this._head;
        while (currentItem) {
            yield currentItem.value;
            currentItem = currentItem.next;
        }
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
    get head() {
        return this._head ? this._head.value : null;
    }
    get tail() {
        return this._tail ? this._tail.value : null;
    }
    get length() {
        return this._length;
    }
    // Adds the element at a specific position inside the linked list
    insert(val, previousItem, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        let currentItem = this._head;
        if (!currentItem) {
            return false;
        }
        else {
            while (true) {
                if (currentItem.value === previousItem) {
                    newItem.next = currentItem.next;
                    newItem.prev = currentItem;
                    currentItem.next = newItem;
                    if (newItem.next) {
                        newItem.next.prev = newItem;
                    }
                    else {
                        this._tail = newItem;
                    }
                    this._length++;
                    return true;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        // can't locate previousItem
                        return false;
                    }
                }
            }
        }
    }
    // Adds the element at the end of the linked list
    append(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._tail) {
            this._head = this._tail = newItem;
        }
        else {
            this._tail.next = newItem;
            newItem.prev = this._tail;
            this._tail = newItem;
        }
        this._length++;
        return true;
    }
    // Add the element at the beginning of the linked list
    prepend(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
            return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._head) {
            this._head = this._tail = newItem;
        }
        else {
            newItem.next = this._head;
            this._head.prev = newItem;
            this._head = newItem;
        }
        this._length++;
        return true;
    }
    remove(val) {
        let currentItem = this._head;
        if (!currentItem) {
            return;
        }
        if (currentItem.value === val) {
            this._head = currentItem.next;
            this._head.prev = null;
            currentItem.next = currentItem.prev = null;
            this._length--;
            return currentItem.value;
        }
        else {
            while (true) {
                if (currentItem.value === val) {
                    if (currentItem.next) { // special case for last element
                        currentItem.prev.next = currentItem.next;
                        currentItem.next.prev = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    else {
                        currentItem.prev.next = null;
                        this._tail = currentItem.prev;
                        currentItem.next = currentItem.prev = null;
                    }
                    this._length--;
                    return currentItem.value;
                }
                else {
                    if (currentItem.next) {
                        currentItem = currentItem.next;
                    }
                    else {
                        return;
                    }
                }
            }
        }
    }
    removeHead() {
        let currentItem = this._head;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._head.next) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._head.next.prev = null;
            this._head = this._head.next;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    removeTail() {
        let currentItem = this._tail;
        // empty list
        if (!currentItem) {
            return;
        }
        // single item list
        if (!this._tail.prev) {
            this._head = null;
            this._tail = null;
            // full list
        }
        else {
            this._tail.prev.next = null;
            this._tail = this._tail.prev;
            currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
    }
    first(num) {
        let iter = this.iterator();
        let result = [];
        let n = Math.min(num, this.length);
        for (let i = 0; i < n; i++) {
            let val = iter.next();
            result.push(val.value);
        }
        return result;
    }
    toArray() {
        return [...this];
    }
    isDuplicate(val) {
        let set = new Set(this.toArray());
        return set.has(val);
    }
}
exports.LinkedList = LinkedList;
class LinkedListItem {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}
exports.LinkedListItem = LinkedListItem;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/luxon/build/cjs-browser/luxon.js":
/*!*******************************************************!*\
  !*** ./node_modules/luxon/build/cjs-browser/luxon.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
var LuxonError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(LuxonError, _Error);

  function LuxonError() {
    return _Error.apply(this, arguments) || this;
  }

  return LuxonError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * @private
 */


var InvalidDateTimeError = /*#__PURE__*/function (_LuxonError) {
  _inheritsLoose(InvalidDateTimeError, _LuxonError);

  function InvalidDateTimeError(reason) {
    return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
  }

  return InvalidDateTimeError;
}(LuxonError);
/**
 * @private
 */

var InvalidIntervalError = /*#__PURE__*/function (_LuxonError2) {
  _inheritsLoose(InvalidIntervalError, _LuxonError2);

  function InvalidIntervalError(reason) {
    return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
  }

  return InvalidIntervalError;
}(LuxonError);
/**
 * @private
 */

var InvalidDurationError = /*#__PURE__*/function (_LuxonError3) {
  _inheritsLoose(InvalidDurationError, _LuxonError3);

  function InvalidDurationError(reason) {
    return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
  }

  return InvalidDurationError;
}(LuxonError);
/**
 * @private
 */

var ConflictingSpecificationError = /*#__PURE__*/function (_LuxonError4) {
  _inheritsLoose(ConflictingSpecificationError, _LuxonError4);

  function ConflictingSpecificationError() {
    return _LuxonError4.apply(this, arguments) || this;
  }

  return ConflictingSpecificationError;
}(LuxonError);
/**
 * @private
 */

var InvalidUnitError = /*#__PURE__*/function (_LuxonError5) {
  _inheritsLoose(InvalidUnitError, _LuxonError5);

  function InvalidUnitError(unit) {
    return _LuxonError5.call(this, "Invalid unit " + unit) || this;
  }

  return InvalidUnitError;
}(LuxonError);
/**
 * @private
 */

var InvalidArgumentError = /*#__PURE__*/function (_LuxonError6) {
  _inheritsLoose(InvalidArgumentError, _LuxonError6);

  function InvalidArgumentError() {
    return _LuxonError6.apply(this, arguments) || this;
  }

  return InvalidArgumentError;
}(LuxonError);
/**
 * @private
 */

var ZoneIsAbstractError = /*#__PURE__*/function (_LuxonError7) {
  _inheritsLoose(ZoneIsAbstractError, _LuxonError7);

  function ZoneIsAbstractError() {
    return _LuxonError7.call(this, "Zone is an abstract class") || this;
  }

  return ZoneIsAbstractError;
}(LuxonError);

/**
 * @private
 */
var n = "numeric",
    s = "short",
    l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};

/**
 * @private
 */
// TYPES

function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
} // CAPABILITIES

function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
} // OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce(function (best, next) {
    var pair = [by(next), next];

    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce(function (a, k) {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
} // NUMBERS AND STRINGS

function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
} // x % n but takes the sign of n instead of x

function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}
function padStart(input, n) {
  if (n === void 0) {
    n = 2;
  }

  var isNeg = input < 0;
  var padded;

  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n, "0");
  } else {
    padded = ("" + input).padStart(n, "0");
  }

  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  // Return undefined (instead of 0) in these cases, where fraction is not set
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return undefined;
  } else {
    var f = parseFloat("0." + fraction) * 1000;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero) {
  if (towardZero === void 0) {
    towardZero = false;
  }

  var factor = Math.pow(10, digits),
      rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
} // DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  var modMonth = floorMod(month - 1, 12) + 1,
      modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)

function objToLocalTS(obj) {
  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that

  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }

  return +d;
}
function weeksInWeekYear(weekYear) {
  var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7,
      last = weekYear - 1,
      p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
} // PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
  if (timeZone === void 0) {
    timeZone = null;
  }

  var date = new Date(ts),
      intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  var modified = _extends({
    timeZoneName: offsetFormat
  }, intlOpts);

  var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function (m) {
    return m.type.toLowerCase() === "timezonename";
  });
  return parsed ? parsed.value : null;
} // signedOffset('-5', '30') -> -330

function signedOffset(offHourStr, offMinuteStr) {
  var offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0

  if (Number.isNaN(offHour)) {
    offHour = 0;
  }

  var offMin = parseInt(offMinuteStr, 10) || 0,
      offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
} // COERCION

function asNumber(value) {
  var numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError("Invalid unit value " + value);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  var normalized = {};

  for (var u in obj) {
    if (hasOwnProperty(obj, u)) {
      var v = obj[u];
      if (v === undefined || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }

  return normalized;
}
function formatOffset(offset, format) {
  var hours = Math.trunc(Math.abs(offset / 60)),
      minutes = Math.trunc(Math.abs(offset % 60)),
      sign = offset >= 0 ? "+" : "-";

  switch (format) {
    case "short":
      return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);

    case "narrow":
      return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");

    case "techie":
      return "" + sign + padStart(hours, 2) + padStart(minutes, 2);

    default:
      throw new RangeError("Value format " + format + " is out of range for property format");
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
var ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z0-9_+-]{1,256}(\/[A-Za-z0-9_+-]{1,256})?)?/;

/**
 * @private
 */


var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [].concat(monthsNarrow);

    case "short":
      return [].concat(monthsShort);

    case "long":
      return [].concat(monthsLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    default:
      return null;
  }
}
var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [].concat(weekdaysNarrow);

    case "short":
      return [].concat(weekdaysShort);

    case "long":
      return [].concat(weekdaysLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];

    default:
      return null;
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [].concat(erasNarrow);

    case "short":
      return [].concat(erasShort);

    case "long":
      return [].concat(erasLong);

    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric, narrow) {
  if (numeric === void 0) {
    numeric = "always";
  }

  if (narrow === void 0) {
    narrow = false;
  }

  var units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

  if (numeric === "auto" && lastable) {
    var isDay = unit === "days";

    switch (count) {
      case 1:
        return isDay ? "tomorrow" : "next " + units[unit][0];

      case -1:
        return isDay ? "yesterday" : "last " + units[unit][0];

      case 0:
        return isDay ? "today" : "this " + units[unit][0];

    }
  }

  var isInPast = Object.is(count, -0) || count < 0,
      fmtValue = Math.abs(count),
      singular = fmtValue === 1,
      lilUnits = units[unit],
      fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
}

function stringifyTokens(splits, tokenToString) {
  var s = "";

  for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }

  return s;
}

var _macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
/**
 * @private
 */

var Formatter = /*#__PURE__*/function () {
  Formatter.create = function create(locale, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new Formatter(locale, opts);
  };

  Formatter.parseFormat = function parseFormat(fmt) {
    var current = null,
        currentFull = "",
        bracketed = false;
    var splits = [];

    for (var i = 0; i < fmt.length; i++) {
      var c = fmt.charAt(i);

      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed,
            val: currentFull
          });
        }

        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({
            literal: false,
            val: currentFull
          });
        }

        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({
        literal: bracketed,
        val: currentFull
      });
    }

    return splits;
  };

  Formatter.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
    return _macroTokenToFormatOpts[token];
  };

  function Formatter(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  var _proto = Formatter.prototype;

  _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }

    var df = this.systemLoc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTime = function formatDateTime(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.formatToParts();
  };

  _proto.resolvedOptions = function resolvedOptions(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.resolvedOptions();
  };

  _proto.num = function num(n, p) {
    if (p === void 0) {
      p = 0;
    }

    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return padStart(n, p);
    }

    var opts = _extends({}, this.opts);

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  };

  _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
    var _this = this;

    var knownEnglish = this.loc.listingMode() === "en",
        useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
        string = function string(opts, extract) {
      return _this.loc.extract(dt, opts, extract);
    },
        formatOffset = function formatOffset(opts) {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }

      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    },
        meridiem = function meridiem() {
      return knownEnglish ? meridiemForDateTime(dt) : string({
        hour: "numeric",
        hourCycle: "h12"
      }, "dayperiod");
    },
        month = function month(length, standalone) {
      return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
        month: length
      } : {
        month: length,
        day: "numeric"
      }, "month");
    },
        weekday = function weekday(length, standalone) {
      return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
        weekday: length
      } : {
        weekday: length,
        month: "long",
        day: "numeric"
      }, "weekday");
    },
        maybeMacro = function maybeMacro(token) {
      var formatOpts = Formatter.macroTokenToFormatOpts(token);

      if (formatOpts) {
        return _this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    },
        era = function era(length) {
      return knownEnglish ? eraForDateTime(dt, length) : string({
        era: length
      }, "era");
    },
        tokenToString = function tokenToString(token) {
      // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
      switch (token) {
        // ms
        case "S":
          return _this.num(dt.millisecond);

        case "u": // falls through

        case "SSS":
          return _this.num(dt.millisecond, 3);
        // seconds

        case "s":
          return _this.num(dt.second);

        case "ss":
          return _this.num(dt.second, 2);
        // fractional seconds

        case "uu":
          return _this.num(Math.floor(dt.millisecond / 10), 2);

        case "uuu":
          return _this.num(Math.floor(dt.millisecond / 100));
        // minutes

        case "m":
          return _this.num(dt.minute);

        case "mm":
          return _this.num(dt.minute, 2);
        // hours

        case "h":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);

        case "hh":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);

        case "H":
          return _this.num(dt.hour);

        case "HH":
          return _this.num(dt.hour, 2);
        // offset

        case "Z":
          // like +6
          return formatOffset({
            format: "narrow",
            allowZ: _this.opts.allowZ
          });

        case "ZZ":
          // like +06:00
          return formatOffset({
            format: "short",
            allowZ: _this.opts.allowZ
          });

        case "ZZZ":
          // like +0600
          return formatOffset({
            format: "techie",
            allowZ: _this.opts.allowZ
          });

        case "ZZZZ":
          // like EST
          return dt.zone.offsetName(dt.ts, {
            format: "short",
            locale: _this.loc.locale
          });

        case "ZZZZZ":
          // like Eastern Standard Time
          return dt.zone.offsetName(dt.ts, {
            format: "long",
            locale: _this.loc.locale
          });
        // zone

        case "z":
          // like America/New_York
          return dt.zoneName;
        // meridiems

        case "a":
          return meridiem();
        // dates

        case "d":
          return useDateTimeFormatter ? string({
            day: "numeric"
          }, "day") : _this.num(dt.day);

        case "dd":
          return useDateTimeFormatter ? string({
            day: "2-digit"
          }, "day") : _this.num(dt.day, 2);
        // weekdays - standalone

        case "c":
          // like 1
          return _this.num(dt.weekday);

        case "ccc":
          // like 'Tues'
          return weekday("short", true);

        case "cccc":
          // like 'Tuesday'
          return weekday("long", true);

        case "ccccc":
          // like 'T'
          return weekday("narrow", true);
        // weekdays - format

        case "E":
          // like 1
          return _this.num(dt.weekday);

        case "EEE":
          // like 'Tues'
          return weekday("short", false);

        case "EEEE":
          // like 'Tuesday'
          return weekday("long", false);

        case "EEEEE":
          // like 'T'
          return weekday("narrow", false);
        // months - standalone

        case "L":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric",
            day: "numeric"
          }, "month") : _this.num(dt.month);

        case "LL":
          // like 01, doesn't seem to work
          return useDateTimeFormatter ? string({
            month: "2-digit",
            day: "numeric"
          }, "month") : _this.num(dt.month, 2);

        case "LLL":
          // like Jan
          return month("short", true);

        case "LLLL":
          // like January
          return month("long", true);

        case "LLLLL":
          // like J
          return month("narrow", true);
        // months - format

        case "M":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric"
          }, "month") : _this.num(dt.month);

        case "MM":
          // like 01
          return useDateTimeFormatter ? string({
            month: "2-digit"
          }, "month") : _this.num(dt.month, 2);

        case "MMM":
          // like Jan
          return month("short", false);

        case "MMMM":
          // like January
          return month("long", false);

        case "MMMMM":
          // like J
          return month("narrow", false);
        // years

        case "y":
          // like 2014
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year);

        case "yy":
          // like 14
          return useDateTimeFormatter ? string({
            year: "2-digit"
          }, "year") : _this.num(dt.year.toString().slice(-2), 2);

        case "yyyy":
          // like 0012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 4);

        case "yyyyyy":
          // like 000012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 6);
        // eras

        case "G":
          // like AD
          return era("short");

        case "GG":
          // like Anno Domini
          return era("long");

        case "GGGGG":
          return era("narrow");

        case "kk":
          return _this.num(dt.weekYear.toString().slice(-2), 2);

        case "kkkk":
          return _this.num(dt.weekYear, 4);

        case "W":
          return _this.num(dt.weekNumber);

        case "WW":
          return _this.num(dt.weekNumber, 2);

        case "o":
          return _this.num(dt.ordinal);

        case "ooo":
          return _this.num(dt.ordinal, 3);

        case "q":
          // like 1
          return _this.num(dt.quarter);

        case "qq":
          // like 01
          return _this.num(dt.quarter, 2);

        case "X":
          return _this.num(Math.floor(dt.ts / 1000));

        case "x":
          return _this.num(dt.ts);

        default:
          return maybeMacro(token);
      }
    };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  };

  _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
    var _this2 = this;

    var tokenToField = function tokenToField(token) {
      switch (token[0]) {
        case "S":
          return "millisecond";

        case "s":
          return "second";

        case "m":
          return "minute";

        case "h":
          return "hour";

        case "d":
          return "day";

        case "M":
          return "month";

        case "y":
          return "year";

        default:
          return null;
      }
    },
        tokenToString = function tokenToString(lildur) {
      return function (token) {
        var mapped = tokenToField(token);

        if (mapped) {
          return _this2.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      };
    },
        tokens = Formatter.parseFormat(fmt),
        realTokens = tokens.reduce(function (found, _ref) {
      var literal = _ref.literal,
          val = _ref.val;
      return literal ? found : found.concat(val);
    }, []),
        collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function (t) {
      return t;
    }));

    return stringifyTokens(tokens, tokenToString(collapsed));
  };

  return Formatter;
}();

var Invalid = /*#__PURE__*/function () {
  function Invalid(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }

  var _proto = Invalid.prototype;

  _proto.toMessage = function toMessage() {
    if (this.explanation) {
      return this.reason + ": " + this.explanation;
    } else {
      return this.reason;
    }
  };

  return Invalid;
}();

/**
 * @interface
 */

var Zone = /*#__PURE__*/function () {
  function Zone() {}

  var _proto = Zone.prototype;

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  _proto.offsetName = function offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  ;

  _proto.formatOffset = function formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  ;

  _proto.offset = function offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  ;

  _createClass(Zone, [{
    key: "type",
    get:
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */

  }, {
    key: "name",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */

  }, {
    key: "isUniversal",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "isValid",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }]);

  return Zone;
}();

var singleton$1 = null;
/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */

var SystemZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(SystemZone, _Zone);

  function SystemZone() {
    return _Zone.apply(this, arguments) || this;
  }

  var _proto = SystemZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  ;

  _createClass(SystemZone, [{
    key: "type",
    get:
    /** @override **/
    function get() {
      return "system";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "instance",
    get:
    /**
     * Get a singleton instance of the local zone
     * @return {SystemZone}
     */
    function get() {
      if (singleton$1 === null) {
        singleton$1 = new SystemZone();
      }

      return singleton$1;
    }
  }]);

  return SystemZone;
}(Zone);

RegExp("^" + ianaRegex.source + "$");
var dtfCache = {};

function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  return dtfCache[zone];
}

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, ""),
      parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
      fMonth = parsed[1],
      fDay = parsed[2],
      fYear = parsed[3],
      fHour = parsed[4],
      fMinute = parsed[5],
      fSecond = parsed[6];
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date),
      filled = [];

  for (var i = 0; i < formatted.length; i++) {
    var _formatted$i = formatted[i],
        type = _formatted$i.type,
        value = _formatted$i.value,
        pos = typeToPos[type];

    if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }

  return filled;
}

var ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */

var IANAZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(IANAZone, _Zone);

  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  IANAZone.create = function create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }

    return ianaZoneCache[name];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  ;

  IANAZone.resetCache = function resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false some valid IANA names. Use isValidZone instead
   * @return {boolean}
   */
  ;

  IANAZone.isValidSpecifier = function isValidSpecifier(s) {
    return this.isValidZone(s);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  ;

  IANAZone.isValidZone = function isValidZone(zone) {
    if (!zone) {
      return false;
    }

    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone
      }).format();
      return true;
    } catch (e) {
      return false;
    }
  };

  function IANAZone(name) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.zoneName = name;
    /** @private **/

    _this.valid = IANAZone.isValidZone(name);
    return _this;
  }
  /** @override **/


  var _proto = IANAZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    var date = new Date(ts);
    if (isNaN(date)) return NaN;

    var dtf = makeDTF(this.name),
        _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date),
        year = _ref2[0],
        month = _ref2[1],
        day = _ref2[2],
        hour = _ref2[3],
        minute = _ref2[4],
        second = _ref2[5]; // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat


    var adjustedHour = hour === 24 ? 0 : hour;
    var asUTC = objToLocalTS({
      year: year,
      month: month,
      day: day,
      hour: adjustedHour,
      minute: minute,
      second: second,
      millisecond: 0
    });
    var asTS = +date;
    var over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return (asUTC - asTS) / (60 * 1000);
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /** @override **/
  ;

  _createClass(IANAZone, [{
    key: "type",
    get: function get() {
      return "iana";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.valid;
    }
  }]);

  return IANAZone;
}(Zone);

var singleton = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */

var FixedOffsetZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(FixedOffsetZone, _Zone);

  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  FixedOffsetZone.instance = function instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  ;

  FixedOffsetZone.parseSpecifier = function parseSpecifier(s) {
    if (s) {
      var r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);

      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }

    return null;
  };

  function FixedOffsetZone(offset) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.fixed = offset;
    return _this;
  }
  /** @override **/


  var _proto = FixedOffsetZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return this.name;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /** @override **/
  ;

  /** @override **/
  _proto.offset = function offset() {
    return this.fixed;
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /** @override **/
  ;

  _createClass(FixedOffsetZone, [{
    key: "type",
    get: function get() {
      return "fixed";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return true;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "utcInstance",
    get:
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    function get() {
      if (singleton === null) {
        singleton = new FixedOffsetZone(0);
      }

      return singleton;
    }
  }]);

  return FixedOffsetZone;
}(Zone);

/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */

var InvalidZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(InvalidZone, _Zone);

  function InvalidZone(zoneName) {
    var _this;

    _this = _Zone.call(this) || this;
    /**  @private */

    _this.zoneName = zoneName;
    return _this;
  }
  /** @override **/


  var _proto = InvalidZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return null;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset() {
    return "";
  }
  /** @override **/
  ;

  _proto.offset = function offset() {
    return NaN;
  }
  /** @override **/
  ;

  _proto.equals = function equals() {
    return false;
  }
  /** @override **/
  ;

  _createClass(InvalidZone, [{
    key: "type",
    get: function get() {
      return "invalid";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return false;
    }
  }]);

  return InvalidZone;
}(Zone);

/**
 * @private
 */
function normalizeZone(input, defaultZone) {

  if (isUndefined(input) || input === null) {
    return defaultZone;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    var lowered = input.toLowerCase();
    if (lowered === "local" || lowered === "system") return defaultZone;else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return new InvalidZone(input);
  }
}

var now = function now() {
  return Date.now();
},
    defaultZone = "system",
    defaultLocale = null,
    defaultNumberingSystem = null,
    defaultOutputCalendar = null,
    throwOnInvalid;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */


var Settings = /*#__PURE__*/function () {
  function Settings() {}

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  Settings.resetCaches = function resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  };

  _createClass(Settings, null, [{
    key: "now",
    get:
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    function get() {
      return now;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    ,
    set: function set(n) {
      now = n;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * Use the value "system" to reset this value to the system's time zone.
     * @type {string}
     */

  }, {
    key: "defaultZone",
    get:
    /**
     * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
     * The default value is the system's time zone (the one set on the machine that runs this code).
     * @type {Zone}
     */
    function get() {
      return normalizeZone(defaultZone, SystemZone.instance);
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(zone) {
      defaultZone = zone;
    }
  }, {
    key: "defaultLocale",
    get: function get() {
      return defaultLocale;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(locale) {
      defaultLocale = locale;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultNumberingSystem",
    get: function get() {
      return defaultNumberingSystem;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(numberingSystem) {
      defaultNumberingSystem = numberingSystem;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultOutputCalendar",
    get: function get() {
      return defaultOutputCalendar;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(outputCalendar) {
      defaultOutputCalendar = outputCalendar;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */

  }, {
    key: "throwOnInvalid",
    get: function get() {
      return throwOnInvalid;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    ,
    set: function set(t) {
      throwOnInvalid = t;
    }
  }]);

  return Settings;
}();

var _excluded = ["base"],
    _excluded2 = ["padTo", "floor"];

var intlLFCache = {};

function getCachedLF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var dtf = intlLFCache[key];

  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }

  return dtf;
}

var intlDTCache = {};

function getCachedDTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var dtf = intlDTCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }

  return dtf;
}

var intlNumCache = {};

function getCachedINF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var inf = intlNumCache[key];

  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }

  return inf;
}

var intlRelCache = {};

function getCachedRTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts;
      _opts.base;
      var cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, _excluded); // exclude `base` from the options


  var key = JSON.stringify([locString, cacheKeyOpts]);
  var inf = intlRelCache[key];

  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }

  return inf;
}

var sysLocaleCache = null;

function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}

function parseLocaleString(localeStr) {
  // I really want to avoid writing a BCP 47 parser
  // see, e.g. https://github.com/wooorm/bcp-47
  // Instead, we'll do this:
  // a) if the string has no -u extensions, just leave it alone
  // b) if it does, use Intl to resolve everything
  // c) if Intl fails, try again without the -u
  var uIndex = localeStr.indexOf("-u-");

  if (uIndex === -1) {
    return [localeStr];
  } else {
    var options;
    var smaller = localeStr.substring(0, uIndex);

    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }

    var _options = options,
        numberingSystem = _options.numberingSystem,
        calendar = _options.calendar; // return the smaller one so that we can append the calendar and numbering overrides to it

    return [smaller, numberingSystem, calendar];
  }
}

function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    localeStr += "-u";

    if (outputCalendar) {
      localeStr += "-ca-" + outputCalendar;
    }

    if (numberingSystem) {
      localeStr += "-nu-" + numberingSystem;
    }

    return localeStr;
  } else {
    return localeStr;
  }
}

function mapMonths(f) {
  var ms = [];

  for (var i = 1; i <= 12; i++) {
    var dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }

  return ms;
}

function mapWeekdays(f) {
  var ms = [];

  for (var i = 1; i <= 7; i++) {
    var dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }

  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  var mode = loc.listingMode(defaultOK);

  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
/**
 * @private
 */


var PolyNumberFormatter = /*#__PURE__*/function () {
  function PolyNumberFormatter(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;

    opts.padTo;
        opts.floor;
        var otherOpts = _objectWithoutPropertiesLoose(opts, _excluded2);

    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      var intlOpts = _extends({
        useGrouping: false
      }, opts);

      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }

  var _proto = PolyNumberFormatter.prototype;

  _proto.format = function format(i) {
    if (this.inf) {
      var fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      // to match the browser's numberformatter defaults
      var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);

      return padStart(_fixed, this.padTo);
    }
  };

  return PolyNumberFormatter;
}();
/**
 * @private
 */


var PolyDateFormatter = /*#__PURE__*/function () {
  function PolyDateFormatter(dt, intl, opts) {
    this.opts = opts;
    var z;

    if (dt.zone.isUniversal) {
      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
      // That is why fixed-offset TZ is set to that unless it is:
      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
      // 2. Unsupported by the browser:
      //    - some do not support Etc/
      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
      var gmtOffset = -1 * (dt.offset / 60);
      var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;

      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
        // So we have to make do. Two cases:
        // 1. The format options tell us to show the zone. We can't do that, so the best
        // we can do is format the date in UTC.
        // 2. The format options don't tell us to show the zone. Then we can adjust them
        // the time and tell the formatter to show it to us in UTC, so that the time is right
        // and the bad zone doesn't show up.
        z = "UTC";

        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
        }
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    var intlOpts = _extends({}, this.opts);

    if (z) {
      intlOpts.timeZone = z;
    }

    this.dtf = getCachedDTF(intl, intlOpts);
  }

  var _proto2 = PolyDateFormatter.prototype;

  _proto2.format = function format() {
    return this.dtf.format(this.dt.toJSDate());
  };

  _proto2.formatToParts = function formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  };

  _proto2.resolvedOptions = function resolvedOptions() {
    return this.dtf.resolvedOptions();
  };

  return PolyDateFormatter;
}();
/**
 * @private
 */


var PolyRelFormatter = /*#__PURE__*/function () {
  function PolyRelFormatter(intl, isEnglish, opts) {
    this.opts = _extends({
      style: "long"
    }, opts);

    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }

  var _proto3 = PolyRelFormatter.prototype;

  _proto3.format = function format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  };

  _proto3.formatToParts = function formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  };

  return PolyRelFormatter;
}();
/**
 * @private
 */


var Locale = /*#__PURE__*/function () {
  Locale.fromOpts = function fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  };

  Locale.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
    if (defaultToEN === void 0) {
      defaultToEN = false;
    }

    var specifiedLocale = locale || Settings.defaultLocale; // the system locale is useful for human readable strings but annoying for parsing/formatting known formats

    var localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    var numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    var outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  };

  Locale.resetCache = function resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  };

  Locale.fromObject = function fromObject(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        outputCalendar = _ref.outputCalendar;

    return Locale.create(locale, numberingSystem, outputCalendar);
  };

  function Locale(locale, numbering, outputCalendar, specifiedLocale) {
    var _parseLocaleString = parseLocaleString(locale),
        parsedLocale = _parseLocaleString[0],
        parsedNumberingSystem = _parseLocaleString[1],
        parsedOutputCalendar = _parseLocaleString[2];

    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = {
      format: {},
      standalone: {}
    };
    this.monthsCache = {
      format: {},
      standalone: {}
    };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }

  var _proto4 = Locale.prototype;

  _proto4.listingMode = function listingMode() {
    var isActuallyEn = this.isEnglish();
    var hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  };

  _proto4.clone = function clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  };

  _proto4.redefaultToEN = function redefaultToEN(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(_extends({}, alts, {
      defaultToEN: true
    }));
  };

  _proto4.redefaultToSystem = function redefaultToSystem(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(_extends({}, alts, {
      defaultToEN: false
    }));
  };

  _proto4.months = function months$1(length, format, defaultOK) {
    var _this = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, months, function () {
      var intl = format ? {
        month: length,
        day: "numeric"
      } : {
        month: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this.monthsCache[formatStr][length]) {
        _this.monthsCache[formatStr][length] = mapMonths(function (dt) {
          return _this.extract(dt, intl, "month");
        });
      }

      return _this.monthsCache[formatStr][length];
    });
  };

  _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
    var _this2 = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, weekdays, function () {
      var intl = format ? {
        weekday: length,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this2.weekdaysCache[formatStr][length]) {
        _this2.weekdaysCache[formatStr][length] = mapWeekdays(function (dt) {
          return _this2.extract(dt, intl, "weekday");
        });
      }

      return _this2.weekdaysCache[formatStr][length];
    });
  };

  _proto4.meridiems = function meridiems$1(defaultOK) {
    var _this3 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, undefined, defaultOK, function () {
      return meridiems;
    }, function () {
      // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
      // for AM and PM. This is probably wrong, but it's makes parsing way easier.
      if (!_this3.meridiemCache) {
        var intl = {
          hour: "numeric",
          hourCycle: "h12"
        };
        _this3.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(function (dt) {
          return _this3.extract(dt, intl, "dayperiod");
        });
      }

      return _this3.meridiemCache;
    });
  };

  _proto4.eras = function eras$1(length, defaultOK) {
    var _this4 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, eras, function () {
      var intl = {
        era: length
      }; // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.

      if (!_this4.eraCache[length]) {
        _this4.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(function (dt) {
          return _this4.extract(dt, intl, "era");
        });
      }

      return _this4.eraCache[length];
    });
  };

  _proto4.extract = function extract(dt, intlOpts, field) {
    var df = this.dtFormatter(dt, intlOpts),
        results = df.formatToParts(),
        matching = results.find(function (m) {
      return m.type.toLowerCase() === field;
    });
    return matching ? matching.value : null;
  };

  _proto4.numberFormatter = function numberFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the rest of the condition is used heavily)
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  };

  _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
    if (intlOpts === void 0) {
      intlOpts = {};
    }

    return new PolyDateFormatter(dt, this.intl, intlOpts);
  };

  _proto4.relFormatter = function relFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  };

  _proto4.listFormatter = function listFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return getCachedLF(this.intl, opts);
  };

  _proto4.isEnglish = function isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  };

  _proto4.equals = function equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  };

  _createClass(Locale, [{
    key: "fastNumbers",
    get: function get() {
      if (this.fastNumbersCached == null) {
        this.fastNumbersCached = supportsFastNumbers(this);
      }

      return this.fastNumbersCached;
    }
  }]);

  return Locale;
}();

/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes() {
  for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
    regexes[_key] = arguments[_key];
  }

  var full = regexes.reduce(function (f, r) {
    return f + r.source;
  }, "");
  return RegExp("^" + full + "$");
}

function combineExtractors() {
  for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    extractors[_key2] = arguments[_key2];
  }

  return function (m) {
    return extractors.reduce(function (_ref, ex) {
      var mergedVals = _ref[0],
          mergedZone = _ref[1],
          cursor = _ref[2];

      var _ex = ex(m, cursor),
          val = _ex[0],
          zone = _ex[1],
          next = _ex[2];

      return [_extends({}, mergedVals, val), mergedZone || zone, next];
    }, [{}, null, 1]).slice(0, 2);
  };
}

function parse(s) {
  if (s == null) {
    return [null, null];
  }

  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    patterns[_key3 - 1] = arguments[_key3];
  }

  for (var _i = 0, _patterns = patterns; _i < _patterns.length; _i++) {
    var _patterns$_i = _patterns[_i],
        regex = _patterns$_i[0],
        extractor = _patterns$_i[1];
    var m = regex.exec(s);

    if (m) {
      return extractor(m);
    }
  }

  return [null, null];
}

function simpleParse() {
  for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  return function (match, cursor) {
    var ret = {};
    var i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match[cursor + i]);
    }

    return [ret, null, cursor + i];
  };
} // ISO and SQL parsing


var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + offsetRegex.source + "?"),
    isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?"),
    isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
    isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
    isoOrdinalRegex = /(\d{4})-?(\d{3})/,
    extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
    extractISOOrdinalData = simpleParse("year", "ordinal"),
    sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/,
    // dumbed-down version of the ISO one
sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?"),
    sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");

function int(match, pos, fallback) {
  var m = match[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}

function extractISOYmd(match, cursor) {
  var item = {
    year: int(match, cursor),
    month: int(match, cursor + 1, 1),
    day: int(match, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  var item = {
    hours: int(match, cursor, 0),
    minutes: int(match, cursor + 1, 0),
    seconds: int(match, cursor + 2, 0),
    milliseconds: parseMillis(match[cursor + 3])
  };
  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  var local = !match[cursor] && !match[cursor + 1],
      fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
      zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  var zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
  return [{}, zone, cursor + 1];
} // ISO time parsing


var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$"); // ISO duration parsing

var isoDuration = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function extractISODuration(match) {
  var s = match[0],
      yearStr = match[1],
      monthStr = match[2],
      weekStr = match[3],
      dayStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      millisecondsStr = match[8];
  var hasNegativePrefix = s[0] === "-";
  var negativeSeconds = secondStr && secondStr[0] === "-";

  var maybeNegate = function maybeNegate(num, force) {
    if (force === void 0) {
      force = false;
    }

    return num !== undefined && (force || num && hasNegativePrefix) ? -num : num;
  };

  return [{
    years: maybeNegate(parseFloating(yearStr)),
    months: maybeNegate(parseFloating(monthStr)),
    weeks: maybeNegate(parseFloating(weekStr)),
    days: maybeNegate(parseFloating(dayStr)),
    hours: maybeNegate(parseFloating(hourStr)),
    minutes: maybeNegate(parseFloating(minuteStr)),
    seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
  }];
} // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that


var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr) result.second = parseInteger(secondStr);

  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }

  return result;
} // RFC 2822/5322


var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      obsOffset = match[8],
      milOffset = match[9],
      offHourStr = match[10],
      offMinuteStr = match[11],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  var offset;

  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = signedOffset(offHourStr, offMinuteStr);
  }

  return [result, new FixedOffsetZone(offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
} // http date


var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

function extractASCII(match) {
  var weekdayStr = match[1],
      monthStr = match[2],
      dayStr = match[3],
      hourStr = match[4],
      minuteStr = match[5],
      secondStr = match[6],
      yearStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
/**
 * @private
 */

function parseISODate(s) {
  return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s) {
  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s) {
  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s) {
  return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}

var INVALID$2 = "Invalid Duration"; // unit conversion constants

var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1000
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1000
  },
  hours: {
    minutes: 60,
    seconds: 60 * 60,
    milliseconds: 60 * 60 * 1000
  },
  minutes: {
    seconds: 60,
    milliseconds: 60 * 1000
  },
  seconds: {
    milliseconds: 1000
  }
},
    casualMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1000
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix),
    daysInYearAccurate = 146097.0 / 400,
    daysInMonthAccurate = 146097.0 / 4800,
    accurateMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix); // units ordered by size

var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
var reverseUnits = orderedUnits$1.slice(0).reverse(); // clone really means "create another instance just like this one, but with these changes"

function clone$1(dur, alts, clear) {
  if (clear === void 0) {
    clear = false;
  }

  // deep merge for vals
  var conf = {
    values: clear ? alts.values : _extends({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}

function antiTrunc(n) {
  return n < 0 ? Math.floor(n) : Math.ceil(n);
} // NB: mutates parameters


function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  var conv = matrix[toUnit][fromUnit],
      raw = fromMap[fromUnit] / conv,
      sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
      // ok, so this is wild, but see the matrix in the tests
  added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
} // NB: mutates parameters


function normalizeValues(matrix, vals) {
  reverseUnits.reduce(function (previous, current) {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }

      return current;
    } else {
      return previous;
    }
  }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration#fromMillis}, {@link Duration#fromObject}, or {@link Duration#fromISO}.
 * * **Unit values** See the {@link Duration#years}, {@link Duration.months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */


var Duration = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Duration(config) {
    var accurate = config.conversionAccuracy === "longterm" || false;
    /**
     * @access private
     */

    this.values = config.values;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.conversionAccuracy = accurate ? "longterm" : "casual";
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.matrix = accurate ? accurateMatrix : casualMatrix;
    /**
     * @access private
     */

    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */


  Duration.fromMillis = function fromMillis(count, opts) {
    return Duration.fromObject({
      milliseconds: count
    }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  Duration.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
    }

    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  ;

  Duration.fromDurationLike = function fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration.fromMillis(durationLike);
    } else if (Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError("Unknown duration argument " + durationLike + " of type " + typeof durationLike);
    }
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  ;

  Duration.fromISO = function fromISO(text, opts) {
    var _parseISODuration = parseISODuration(text),
        parsed = _parseISODuration[0];

    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  ;

  Duration.fromISOTime = function fromISOTime(text, opts) {
    var _parseISOTimeOnly = parseISOTimeOnly(text),
        parsed = _parseISOTimeOnly[0];

    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  ;

  Duration.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({
        invalid: invalid
      });
    }
  }
  /**
   * @private
   */
  ;

  Duration.normalizeUnit = function normalizeUnit(unit) {
    var normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Duration.isDuration = function isDuration(o) {
    return o && o.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  ;

  var _proto = Duration.prototype;

  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
    var fmtOpts = _extends({}, opts, {
      floor: opts.round !== false && opts.floor !== false
    });

    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  }
  /**
   * Returns a string representation of a Duration with all units included
   * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant. See {@link Intl.NumberFormat}.
   * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  ;

  _proto.toHuman = function toHuman(opts) {
    var _this = this;

    if (opts === void 0) {
      opts = {};
    }

    var l = orderedUnits$1.map(function (unit) {
      var val = _this.values[unit];

      if (isUndefined(val)) {
        return null;
      }

      return _this.loc.numberFormatter(_extends({
        style: "unit",
        unitDisplay: "long"
      }, opts, {
        unit: unit.slice(0, -1)
      })).format(val);
    }).filter(function (n) {
      return n;
    });
    return this.loc.listFormatter(_extends({
      type: "conjunction",
      style: opts.listStyle || "narrow"
    }, opts)).format(l);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject() {
    if (!this.isValid) return {};
    return _extends({}, this.values);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;
    var s = "P";
    if (this.years !== 0) s += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s += this.weeks + "W";
    if (this.days !== 0) s += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s += "T";
    if (this.hours !== 0) s += this.hours + "H";
    if (this.minutes !== 0) s += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0) // this will handle "floating point madness" by removing extra decimal places
      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
    if (s === "P") s += "T0S";
    return s;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return null;
    var millis = this.toMillis();
    if (millis < 0 || millis >= 86400000) return null;
    opts = _extends({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts);
    var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";

    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";

      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }

    var str = value.toFormat(fmt);

    if (opts.includePrefix) {
      str = "T" + str;
    }

    return str;
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.toISO();
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.as("milliseconds");
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = Duration.fromDurationLike(duration),
        result = {};

    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done;) {
      var k = _step.value;

      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }

    return clone$1(this, {
      values: result
    }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  ;

  _proto.mapUnits = function mapUnits(fn) {
    if (!this.isValid) return this;
    var result = {};

    for (var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      result[k] = asNumber(fn(this.values[k], k));
    }

    return clone$1(this, {
      values: result
    }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  ;

  _proto.get = function get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;

    var mixed = _extends({}, this.values, normalizeObject(values, Duration.normalizeUnit));

    return clone$1(this, {
      values: mixed
    });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        conversionAccuracy = _ref.conversionAccuracy;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem
    }),
        opts = {
      loc: loc
    };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone$1(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  ;

  _proto.as = function as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  ;

  _proto.normalize = function normalize() {
    if (!this.isValid) return this;
    var vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, {
      values: vals
    }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  ;

  _proto.shiftTo = function shiftTo() {
    for (var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++) {
      units[_key] = arguments[_key];
    }

    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map(function (u) {
      return Duration.normalizeUnit(u);
    });
    var built = {},
        accumulated = {},
        vals = this.toObject();
    var lastUnit;

    for (var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits$1), _step2; !(_step2 = _iterator2()).done;) {
      var k = _step2.value;

      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        var own = 0; // anything we haven't boiled down yet should get boiled to this unit

        for (var ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        } // plus anything that's already in this unit


        if (isNumber(vals[k])) {
          own += vals[k];
        }

        var i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1000 - i * 1000) / 1000; // plus anything further down the chain that should be rolled up in to this

        for (var down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        } // otherwise, keep it in the wings to boil it later

      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    } // anything leftover becomes the decimal for the last unit
    // lastUnit must be defined since units is not empty


    for (var key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }

    return clone$1(this, {
      values: built
    }, true).normalize();
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  ;

  _proto.negate = function negate() {
    if (!this.isValid) return this;
    var negated = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++) {
      var k = _Object$keys2[_i2];
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }

    return clone$1(this, {
      values: negated
    }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  ;

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    function eq(v1, v2) {
      // Consider 0 and undefined as equal
      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
      return v1 === v2;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits$1), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;

      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }

    return true;
  };

  _createClass(Duration, [{
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "years",
    get: function get() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */

  }, {
    key: "quarters",
    get: function get() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */

  }, {
    key: "months",
    get: function get() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */

  }, {
    key: "weeks",
    get: function get() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */

  }, {
    key: "days",
    get: function get() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */

  }, {
    key: "hours",
    get: function get() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */

  }, {
    key: "minutes",
    get: function get() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */

  }, {
    key: "seconds",
    get: function get() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */

  }, {
    key: "milliseconds",
    get: function get() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Duration;
}();

var INVALID$1 = "Invalid Interval"; // checks if the start is equal to or before the end

function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
  } else {
    return null;
  }
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link Interval#fromDateTimes}, {@link Interval#after}, {@link Interval#before}, or {@link Interval#fromISO}.
 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval#merge}, {@link Interval#xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
 */


var Interval = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Interval(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */

    this.e = config.end;
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */


  Interval.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({
        invalid: invalid
      });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  ;

  Interval.fromDateTimes = function fromDateTimes(start, end) {
    var builtStart = friendlyDateTime(start),
        builtEnd = friendlyDateTime(end);
    var validateError = validateStartEnd(builtStart, builtEnd);

    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.after = function after(start, duration) {
    var dur = Duration.fromDurationLike(duration),
        dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.before = function before(end, duration) {
    var dur = Duration.fromDurationLike(duration),
        dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  ;

  Interval.fromISO = function fromISO(text, opts) {
    var _split = (text || "").split("/", 2),
        s = _split[0],
        e = _split[1];

    if (s && e) {
      var start, startIsValid;

      try {
        start = DateTime.fromISO(s, opts);
        startIsValid = start.isValid;
      } catch (e) {
        startIsValid = false;
      }

      var end, endIsValid;

      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e) {
        endIsValid = false;
      }

      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (startIsValid) {
        var dur = Duration.fromISO(e, opts);

        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        var _dur = Duration.fromISO(s, opts);

        if (_dur.isValid) {
          return Interval.before(end, _dur);
        }
      }
    }

    return Interval.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Interval.isInterval = function isInterval(o) {
    return o && o.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  ;

  var _proto = Interval.prototype;

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  _proto.length = function length(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    return this.isValid ? this.toDuration.apply(this, [unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  ;

  _proto.count = function count(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (!this.isValid) return NaN;
    var start = this.start.startOf(unit),
        end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  ;

  _proto.isEmpty = function isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isAfter = function isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isBefore = function isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.contains = function contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  ;

  _proto.set = function set(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        start = _ref.start,
        end = _ref.end;

    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  ;

  _proto.splitAt = function splitAt() {
    var _this = this;

    if (!this.isValid) return [];

    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    var sorted = dateTimes.map(friendlyDateTime).filter(function (d) {
      return _this.contains(d);
    }).sort(),
        results = [];
    var s = this.s,
        i = 0;

    while (s < this.e) {
      var added = sorted[i] || this.e,
          next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  ;

  _proto.splitBy = function splitBy(duration) {
    var dur = Duration.fromDurationLike(duration);

    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }

    var s = this.s,
        idx = 1,
        next;
    var results = [];

    while (s < this.e) {
      var added = this.start.plus(dur.mapUnits(function (x) {
        return x * idx;
      }));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      idx += 1;
    }

    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  ;

  _proto.divideEqually = function divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.overlaps = function overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsStart = function abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsEnd = function abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.engulfs = function engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.intersection = function intersection(other) {
    if (!this.isValid) return this;
    var s = this.s > other.s ? this.s : other.s,
        e = this.e < other.e ? this.e : other.e;

    if (s >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.union = function union(other) {
    if (!this.isValid) return this;
    var s = this.s < other.s ? this.s : other.s,
        e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  ;

  Interval.merge = function merge(intervals) {
    var _intervals$sort$reduc = intervals.sort(function (a, b) {
      return a.s - b.s;
    }).reduce(function (_ref2, item) {
      var sofar = _ref2[0],
          current = _ref2[1];

      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]),
        found = _intervals$sort$reduc[0],
        final = _intervals$sort$reduc[1];

    if (final) {
      found.push(final);
    }

    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  ;

  Interval.xor = function xor(intervals) {
    var _Array$prototype;

    var start = null,
        currentCount = 0;

    var results = [],
        ends = intervals.map(function (i) {
      return [{
        time: i.s,
        type: "s"
      }, {
        time: i.e,
        type: "e"
      }];
    }),
        flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends),
        arr = flattened.sort(function (a, b) {
      return a.time - b.time;
    });

    for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done;) {
      var i = _step.value;
      currentCount += i.type === "s" ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  ;

  _proto.difference = function difference() {
    var _this2 = this;

    for (var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      intervals[_key2] = arguments[_key2];
    }

    return Interval.xor([this].concat(intervals)).map(function (i) {
      return _this2.intersection(i);
    }).filter(function (i) {
      return i && !i.isEmpty();
    });
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    if (!this.isValid) return INVALID$1;
    return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISO(opts) + "/" + this.e.toISO(opts);
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate() {
    if (!this.isValid) return INVALID$1;
    return this.s.toISODate() + "/" + this.e.toISODate();
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime#toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(dateFormat, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2,
        _ref3$separator = _ref3.separator,
        separator = _ref3$separator === void 0 ? " – " : _ref3$separator;

    if (!this.isValid) return INVALID$1;
    return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  ;

  _proto.toDuration = function toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }

    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  ;

  _proto.mapEndpoints = function mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  };

  _createClass(Interval, [{
    key: "start",
    get: function get() {
      return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */

  }, {
    key: "end",
    get: function get() {
      return this.isValid ? this.e : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Interval;
}();

/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */

var Info = /*#__PURE__*/function () {
  function Info() {}

  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  Info.hasDST = function hasDST(zone) {
    if (zone === void 0) {
      zone = Settings.defaultZone;
    }

    var proto = DateTime.now().setZone(zone).set({
      month: 12
    });
    return !zone.isUniversal && proto.offset !== proto.set({
      month: 6
    }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  ;

  Info.isValidIANAZone = function isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  ;

  Info.normalizeZone = function normalizeZone$1(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  ;

  Info.months = function months(length, _temp) {
    if (length === void 0) {
      length = "long";
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$locale = _ref.locale,
        locale = _ref$locale === void 0 ? null : _ref$locale,
        _ref$numberingSystem = _ref.numberingSystem,
        numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem,
        _ref$locObj = _ref.locObj,
        locObj = _ref$locObj === void 0 ? null : _ref$locObj,
        _ref$outputCalendar = _ref.outputCalendar,
        outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  ;

  Info.monthsFormat = function monthsFormat(length, _temp2) {
    if (length === void 0) {
      length = "long";
    }

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$locale = _ref2.locale,
        locale = _ref2$locale === void 0 ? null : _ref2$locale,
        _ref2$numberingSystem = _ref2.numberingSystem,
        numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem,
        _ref2$locObj = _ref2.locObj,
        locObj = _ref2$locObj === void 0 ? null : _ref2$locObj,
        _ref2$outputCalendar = _ref2.outputCalendar,
        outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  ;

  Info.weekdays = function weekdays(length, _temp3) {
    if (length === void 0) {
      length = "long";
    }

    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$locale = _ref3.locale,
        locale = _ref3$locale === void 0 ? null : _ref3$locale,
        _ref3$numberingSystem = _ref3.numberingSystem,
        numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem,
        _ref3$locObj = _ref3.locObj,
        locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  ;

  Info.weekdaysFormat = function weekdaysFormat(length, _temp4) {
    if (length === void 0) {
      length = "long";
    }

    var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$locale = _ref4.locale,
        locale = _ref4$locale === void 0 ? null : _ref4$locale,
        _ref4$numberingSystem = _ref4.numberingSystem,
        numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem,
        _ref4$locObj = _ref4.locObj,
        locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  ;

  Info.meridiems = function meridiems(_temp5) {
    var _ref5 = _temp5 === void 0 ? {} : _temp5,
        _ref5$locale = _ref5.locale,
        locale = _ref5$locale === void 0 ? null : _ref5$locale;

    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  ;

  Info.eras = function eras(length, _temp6) {
    if (length === void 0) {
      length = "short";
    }

    var _ref6 = _temp6 === void 0 ? {} : _temp6,
        _ref6$locale = _ref6.locale,
        locale = _ref6$locale === void 0 ? null : _ref6$locale;

    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { relative: false }
   * @return {Object}
   */
  ;

  Info.features = function features() {
    return {
      relative: hasRelative()
    };
  };

  return Info;
}();

function dayDiff(earlier, later) {
  var utcDayStart = function utcDayStart(dt) {
    return dt.toUTC(0, {
      keepLocalTime: true
    }).startOf("day").valueOf();
  },
      ms = utcDayStart(later) - utcDayStart(earlier);

  return Math.floor(Duration.fromMillis(ms).as("days"));
}

function highOrderDiffs(cursor, later, units) {
  var differs = [["years", function (a, b) {
    return b.year - a.year;
  }], ["quarters", function (a, b) {
    return b.quarter - a.quarter;
  }], ["months", function (a, b) {
    return b.month - a.month + (b.year - a.year) * 12;
  }], ["weeks", function (a, b) {
    var days = dayDiff(a, b);
    return (days - days % 7) / 7;
  }], ["days", dayDiff]];
  var results = {};
  var lowestOrder, highWater;

  for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
    var _differs$_i = _differs[_i],
        unit = _differs$_i[0],
        differ = _differs$_i[1];

    if (units.indexOf(unit) >= 0) {
      var _cursor$plus;

      lowestOrder = unit;
      var delta = differ(cursor, later);
      highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));

      if (highWater > later) {
        var _cursor$plus2;

        cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
        delta -= 1;
      } else {
        cursor = highWater;
      }

      results[unit] = delta;
    }
  }

  return [cursor, results, highWater, lowestOrder];
}

function _diff (earlier, later, units, opts) {
  var _highOrderDiffs = highOrderDiffs(earlier, later, units),
      cursor = _highOrderDiffs[0],
      results = _highOrderDiffs[1],
      highWater = _highOrderDiffs[2],
      lowestOrder = _highOrderDiffs[3];

  var remainingMillis = later - cursor;
  var lowerOrderUnits = units.filter(function (u) {
    return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
  });

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      var _cursor$plus3;

      highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  var duration = Duration.fromObject(results, opts);

  if (lowerOrderUnits.length > 0) {
    var _Duration$fromMillis;

    return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}

var numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  var value = parseInt(str, 10);

  if (isNaN(value)) {
    value = "";

    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);

      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (var key in numberingSystemsUTF16) {
          var _numberingSystemsUTF = numberingSystemsUTF16[key],
              min = _numberingSystemsUTF[0],
              max = _numberingSystemsUTF[1];

          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }

    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex(_ref, append) {
  var numberingSystem = _ref.numberingSystem;

  if (append === void 0) {
    append = "";
  }

  return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append);
}

var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

function intUnit(regex, post) {
  if (post === void 0) {
    post = function post(i) {
      return i;
    };
  }

  return {
    regex: regex,
    deser: function deser(_ref) {
      var s = _ref[0];
      return post(parseDigits(s));
    }
  };
}

var NBSP = String.fromCharCode(160);
var spaceOrNBSP = "( |" + NBSP + ")";
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

function fixListRegex(s) {
  // make dots optional and also make them literal
  // make space and non breakable space characters interchangeable
  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}

function stripInsensitivities(s) {
  return s.replace(/\./g, "") // ignore dots that were made optional
  .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
  .toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: function deser(_ref2) {
        var s = _ref2[0];
        return strings.findIndex(function (i) {
          return stripInsensitivities(s) === stripInsensitivities(i);
        }) + startIndex;
      }
    };
  }
}

function offset(regex, groups) {
  return {
    regex: regex,
    deser: function deser(_ref3) {
      var h = _ref3[1],
          m = _ref3[2];
      return signedOffset(h, m);
    },
    groups: groups
  };
}

function simple(regex) {
  return {
    regex: regex,
    deser: function deser(_ref4) {
      var s = _ref4[0];
      return s;
    }
  };
}

function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function unitForToken(token, loc) {
  var one = digitRegex(loc),
      two = digitRegex(loc, "{2}"),
      three = digitRegex(loc, "{3}"),
      four = digitRegex(loc, "{4}"),
      six = digitRegex(loc, "{6}"),
      oneOrTwo = digitRegex(loc, "{1,2}"),
      oneToThree = digitRegex(loc, "{1,3}"),
      oneToSix = digitRegex(loc, "{1,6}"),
      oneToNine = digitRegex(loc, "{1,9}"),
      twoToFour = digitRegex(loc, "{2,4}"),
      fourToSix = digitRegex(loc, "{4,6}"),
      literal = function literal(t) {
    return {
      regex: RegExp(escapeToken(t.val)),
      deser: function deser(_ref5) {
        var s = _ref5[0];
        return s;
      },
      literal: true
    };
  },
      unitate = function unitate(t) {
    if (token.literal) {
      return literal(t);
    }

    switch (t.val) {
      // era
      case "G":
        return oneOf(loc.eras("short", false), 0);

      case "GG":
        return oneOf(loc.eras("long", false), 0);
      // years

      case "y":
        return intUnit(oneToSix);

      case "yy":
        return intUnit(twoToFour, untruncateYear);

      case "yyyy":
        return intUnit(four);

      case "yyyyy":
        return intUnit(fourToSix);

      case "yyyyyy":
        return intUnit(six);
      // months

      case "M":
        return intUnit(oneOrTwo);

      case "MM":
        return intUnit(two);

      case "MMM":
        return oneOf(loc.months("short", true, false), 1);

      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);

      case "L":
        return intUnit(oneOrTwo);

      case "LL":
        return intUnit(two);

      case "LLL":
        return oneOf(loc.months("short", false, false), 1);

      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      // dates

      case "d":
        return intUnit(oneOrTwo);

      case "dd":
        return intUnit(two);
      // ordinals

      case "o":
        return intUnit(oneToThree);

      case "ooo":
        return intUnit(three);
      // time

      case "HH":
        return intUnit(two);

      case "H":
        return intUnit(oneOrTwo);

      case "hh":
        return intUnit(two);

      case "h":
        return intUnit(oneOrTwo);

      case "mm":
        return intUnit(two);

      case "m":
        return intUnit(oneOrTwo);

      case "q":
        return intUnit(oneOrTwo);

      case "qq":
        return intUnit(two);

      case "s":
        return intUnit(oneOrTwo);

      case "ss":
        return intUnit(two);

      case "S":
        return intUnit(oneToThree);

      case "SSS":
        return intUnit(three);

      case "u":
        return simple(oneToNine);

      case "uu":
        return simple(oneOrTwo);

      case "uuu":
        return intUnit(one);
      // meridiem

      case "a":
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)

      case "kkkk":
        return intUnit(four);

      case "kk":
        return intUnit(twoToFour, untruncateYear);
      // weekNumber (W)

      case "W":
        return intUnit(oneOrTwo);

      case "WW":
        return intUnit(two);
      // weekdays

      case "E":
      case "c":
        return intUnit(one);

      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);

      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);

      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);

      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      // offset/zone

      case "Z":
      case "ZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);

      case "ZZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are

      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);

      default:
        return literal(t);
    }
  };

  var unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}

var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};

function tokenForPart(part, locale, formatOpts) {
  var type = part.type,
      value = part.value;

  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }

  var style = formatOpts[type];
  var val = partTypeStyleToTokenVal[type];

  if (typeof val === "object") {
    val = val[style];
  }

  if (val) {
    return {
      literal: false,
      val: val
    };
  }

  return undefined;
}

function buildRegex(units) {
  var re = units.map(function (u) {
    return u.regex;
  }).reduce(function (f, r) {
    return f + "(" + r.source + ")";
  }, "");
  return ["^" + re + "$", units];
}

function match(input, regex, handlers) {
  var matches = input.match(regex);

  if (matches) {
    var all = {};
    var matchIndex = 1;

    for (var i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        var h = handlers[i],
            groups = h.groups ? h.groups + 1 : 1;

        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }

        matchIndex += groups;
      }
    }

    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  var toField = function toField(token) {
    switch (token) {
      case "S":
        return "millisecond";

      case "s":
        return "second";

      case "m":
        return "minute";

      case "h":
      case "H":
        return "hour";

      case "d":
        return "day";

      case "o":
        return "ordinal";

      case "L":
      case "M":
        return "month";

      case "y":
        return "year";

      case "E":
      case "c":
        return "weekday";

      case "W":
        return "weekNumber";

      case "k":
        return "weekYear";

      case "q":
        return "quarter";

      default:
        return null;
    }
  };

  var zone = null;
  var specificOffset;

  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }

  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }

    specificOffset = matches.Z;
  }

  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }

  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }

  var vals = Object.keys(matches).reduce(function (r, k) {
    var f = toField(k);

    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});
  return [vals, zone, specificOffset];
}

var dummyDateTimeCache = null;

function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }

  return dummyDateTimeCache;
}

function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }

  var formatOpts = Formatter.macroTokenToFormatOpts(token.val);

  if (!formatOpts) {
    return token;
  }

  var formatter = Formatter.create(locale, formatOpts);
  var parts = formatter.formatDateTimeParts(getDummyDateTime());
  var tokens = parts.map(function (p) {
    return tokenForPart(p, locale, formatOpts);
  });

  if (tokens.includes(undefined)) {
    return token;
  }

  return tokens;
}

function expandMacroTokens(tokens, locale) {
  var _Array$prototype;

  return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function (t) {
    return maybeExpandMacroToken(t, locale);
  }));
}
/**
 * @private
 */


function explainFromTokens(locale, input, format) {
  var tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
      units = tokens.map(function (t) {
    return unitForToken(t, locale);
  }),
      disqualifyingUnit = units.find(function (t) {
    return t.invalidReason;
  });

  if (disqualifyingUnit) {
    return {
      input: input,
      tokens: tokens,
      invalidReason: disqualifyingUnit.invalidReason
    };
  } else {
    var _buildRegex = buildRegex(units),
        regexString = _buildRegex[0],
        handlers = _buildRegex[1],
        regex = RegExp(regexString, "i"),
        _match = match(input, regex, handlers),
        rawMatches = _match[0],
        matches = _match[1],
        _ref6 = matches ? dateTimeFromMatches(matches) : [null, null, undefined],
        result = _ref6[0],
        zone = _ref6[1],
        specificOffset = _ref6[2];

    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
    }

    return {
      input: input,
      tokens: tokens,
      regex: regex,
      rawMatches: rawMatches,
      matches: matches,
      result: result,
      zone: zone,
      specificOffset: specificOffset
    };
  }
}
function parseFromTokens(locale, input, format) {
  var _explainFromTokens = explainFromTokens(locale, input, format),
      result = _explainFromTokens.result,
      zone = _explainFromTokens.zone,
      specificOffset = _explainFromTokens.specificOffset,
      invalidReason = _explainFromTokens.invalidReason;

  return [result, zone, specificOffset, invalidReason];
}

var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
}

function dayOfWeek(year, month, day) {
  var js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  var table = isLeapYear(year) ? leapLadder : nonLeapLadder,
      month0 = table.findIndex(function (i) {
    return i < ordinal;
  }),
      day = ordinal - table[month0];
  return {
    month: month0 + 1,
    day: day
  };
}
/**
 * @private
 */


function gregorianToWeek(gregObj) {
  var year = gregObj.year,
      month = gregObj.month,
      day = gregObj.day,
      ordinal = computeOrdinal(year, month, day),
      weekday = dayOfWeek(year, month, day);
  var weekNumber = Math.floor((ordinal - weekday + 10) / 7),
      weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return _extends({
    weekYear: weekYear,
    weekNumber: weekNumber,
    weekday: weekday
  }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
  var weekYear = weekData.weekYear,
      weekNumber = weekData.weekNumber,
      weekday = weekData.weekday,
      weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
      yearInDays = daysInYear(weekYear);
  var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
      year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }

  var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal.month,
      day = _uncomputeOrdinal.day;

  return _extends({
    year: year,
    month: month,
    day: day
  }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  var year = gregData.year,
      month = gregData.month,
      day = gregData.day;
  var ordinal = computeOrdinal(year, month, day);
  return _extends({
    year: year,
    ordinal: ordinal
  }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  var year = ordinalData.year,
      ordinal = ordinalData.ordinal;

  var _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal2.month,
      day = _uncomputeOrdinal2.day;

  return _extends({
    year: year,
    month: month,
    day: day
  }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
  var validYear = isInteger(obj.weekYear),
      validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
      validWeekday = integerBetween(obj.weekday, 1, 7);

  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}
function hasInvalidOrdinalData(obj) {
  var validYear = isInteger(obj.year),
      validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}
function hasInvalidGregorianData(obj) {
  var validYear = isInteger(obj.year),
      validMonth = integerBetween(obj.month, 1, 12),
      validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}
function hasInvalidTimeData(obj) {
  var hour = obj.hour,
      minute = obj.minute,
      second = obj.second,
      millisecond = obj.millisecond;
  var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0,
      validMinute = integerBetween(minute, 0, 59),
      validSecond = integerBetween(second, 0, 59),
      validMillisecond = integerBetween(millisecond, 0, 999);

  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}

var INVALID = "Invalid DateTime";
var MAX_DATE = 8.64e15;

function unsupportedZone(zone) {
  return new Invalid("unsupported zone", "the zone \"" + zone.name + "\" is not supported");
} // we cache week data on the DT object and this intermediates the cache


function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }

  return dt.weekData;
} // clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties


function clone(inst, alts) {
  var current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(_extends({}, current, alts, {
    old: current
  }));
} // find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)


function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  var utcGuess = localTS - o * 60 * 1000; // Test whether the zone matches the offset for this ts

  var o2 = tz.offset(utcGuess); // If so, offset didn't change and we're done

  if (o === o2) {
    return [utcGuess, o];
  } // If not, change the ts by the difference in the offset


  utcGuess -= (o2 - o) * 60 * 1000; // If that gives us the local time we want, we're done

  var o3 = tz.offset(utcGuess);

  if (o2 === o3) {
    return [utcGuess, o2];
  } // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time


  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
} // convert an epoch timestamp into a calendar object with the given offset


function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;
  var d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
} // convert a calendar object to a epoch timestamp


function objToTS(obj, offset, zone) {
  return fixOffset(objToLocalTS(obj), offset, zone);
} // create a new DT instance by adding a duration, adjusting for DSTs


function adjustTime(inst, dur) {
  var oPre = inst.o,
      year = inst.c.year + Math.trunc(dur.years),
      month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
      c = _extends({}, inst.c, {
    year: year,
    month: month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }),
      millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"),
      localTS = objToLocalTS(c);

  var _fixOffset = fixOffset(localTS, oPre, inst.zone),
      ts = _fixOffset[0],
      o = _fixOffset[1];

  if (millisToAdd !== 0) {
    ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same

    o = inst.zone.offset(ts);
  }

  return {
    ts: ts,
    o: o
  };
} // helper useful in turning the results of parsing into real dates
// by handling the zone options


function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  var setZone = opts.setZone,
      zone = opts.zone;

  if (parsed && Object.keys(parsed).length !== 0) {
    var interpretationZone = parsedZone || zone,
        inst = DateTime.fromObject(parsed, _extends({}, opts, {
      zone: interpretationZone,
      specificOffset: specificOffset
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", "the input \"" + text + "\" can't be parsed as " + format));
  }
} // if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details


function toTechFormat(dt, format, allowZ) {
  if (allowZ === void 0) {
    allowZ = true;
  }

  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ: allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}

function _toISODate(o, extended) {
  var longFormat = o.c.year > 9999 || o.c.year < 0;
  var c = "";
  if (longFormat && o.c.year >= 0) c += "+";
  c += padStart(o.c.year, longFormat ? 6 : 4);

  if (extended) {
    c += "-";
    c += padStart(o.c.month);
    c += "-";
    c += padStart(o.c.day);
  } else {
    c += padStart(o.c.month);
    c += padStart(o.c.day);
  }

  return c;
}

function _toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset) {
  var c = padStart(o.c.hour);

  if (extended) {
    c += ":";
    c += padStart(o.c.minute);

    if (o.c.second !== 0 || !suppressSeconds) {
      c += ":";
    }
  } else {
    c += padStart(o.c.minute);
  }

  if (o.c.second !== 0 || !suppressSeconds) {
    c += padStart(o.c.second);

    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
      c += ".";
      c += padStart(o.c.millisecond, 3);
    }
  }

  if (includeOffset) {
    if (o.isOffsetFixed && o.offset === 0) {
      c += "Z";
    } else if (o.o < 0) {
      c += "-";
      c += padStart(Math.trunc(-o.o / 60));
      c += ":";
      c += padStart(Math.trunc(-o.o % 60));
    } else {
      c += "+";
      c += padStart(Math.trunc(o.o / 60));
      c += ":";
      c += padStart(Math.trunc(o.o % 60));
    }
  }

  return c;
} // defaults for unspecified units in the supported calendars


var defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}; // Units in the supported calendars, sorted by bigness

var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"],
    orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"]; // standardize case and plurality in units

function normalizeUnit(unit) {
  var normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized) throw new InvalidUnitError(unit);
  return normalized;
} // this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.


function quickDT(obj, opts) {
  var zone = normalizeZone(opts.zone, Settings.defaultZone),
      loc = Locale.fromObject(opts),
      tsNow = Settings.now();
  var ts, o; // assume we have the higher-order units

  if (!isUndefined(obj.year)) {
    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done;) {
      var u = _step.value;

      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }

    var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);

    if (invalid) {
      return DateTime.invalid(invalid);
    }

    var offsetProvis = zone.offset(tsNow);

    var _objToTS = objToTS(obj, offsetProvis, zone);

    ts = _objToTS[0];
    o = _objToTS[1];
  } else {
    ts = tsNow;
  }

  return new DateTime({
    ts: ts,
    zone: zone,
    loc: loc,
    o: o
  });
}

function diffRelative(start, end, opts) {
  var round = isUndefined(opts.round) ? true : opts.round,
      format = function format(c, unit) {
    c = roundTo(c, round || opts.calendary ? 0 : 2, true);
    var formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit);
  },
      differ = function differ(unit) {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };

  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }

  for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done;) {
    var unit = _step2.value;
    var count = differ(unit);

    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }

  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}

function lastOpts(argList) {
  var opts = {},
      args;

  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }

  return [opts, args];
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime#local}, {@link DateTime#utc}, and (most flexibly) {@link DateTime#fromObject}. To create one from a standard string format, use {@link DateTime#fromISO}, {@link DateTime#fromHTTP}, and {@link DateTime#fromRFC2822}. To create one from a custom string format, use {@link DateTime#fromFormat}. To create one from a native JS date, use {@link DateTime#fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */


var DateTime = /*#__PURE__*/function () {
  /**
   * @access private
   */
  function DateTime(config) {
    var zone = config.zone || Settings.defaultZone;
    var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    /**
     * @access private
     */

    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    var c = null,
        o = null;

    if (!invalid) {
      var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

      if (unchanged) {
        var _ref = [config.old.c, config.old.o];
        c = _ref[0];
        o = _ref[1];
      } else {
        var ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }
    /**
     * @access private
     */


    this._zone = zone;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.invalid = invalid;
    /**
     * @access private
     */

    this.weekData = null;
    /**
     * @access private
     */

    this.c = c;
    /**
     * @access private
     */

    this.o = o;
    /**
     * @access private
     */

    this.isLuxonDateTime = true;
  } // CONSTRUCT

  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */


  DateTime.now = function now() {
    return new DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  ;

  DateTime.local = function local() {
    var _lastOpts = lastOpts(arguments),
        opts = _lastOpts[0],
        args = _lastOpts[1],
        year = args[0],
        month = args[1],
        day = args[2],
        hour = args[3],
        minute = args[4],
        second = args[5],
        millisecond = args[6];

    return quickDT({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond
    }, opts);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  ;

  DateTime.utc = function utc() {
    var _lastOpts2 = lastOpts(arguments),
        opts = _lastOpts2[0],
        args = _lastOpts2[1],
        year = args[0],
        month = args[1],
        day = args[2],
        hour = args[3],
        minute = args[4],
        second = args[5],
        millisecond = args[6];

    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond
    }, opts);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  ;

  DateTime.fromJSDate = function fromJSDate(date, options) {
    if (options === void 0) {
      options = {};
    }

    var ts = isDate(date) ? date.valueOf() : NaN;

    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }

    var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    return new DateTime({
      ts: ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromMillis = function fromMillis(milliseconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromSeconds = function fromSeconds(seconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1000,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  ;

  DateTime.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }

    obj = obj || {};
    var zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    var tsNow = Settings.now(),
        offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow),
        normalized = normalizeObject(obj, normalizeUnit),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber,
        loc = Locale.fromObject(opts); // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor; // configure ourselves to deal with gregorian dates or week stuff

    var units,
        defaultValues,
        objNow = tsToObj(tsNow, offsetProvis);

    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    } // set default values for missing stuff


    var foundFirst = false;

    for (var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;
      var v = normalized[u];

      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    } // make sure the values we have are in range


    var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized),
        invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

    if (invalid) {
      return DateTime.invalid(invalid);
    } // compute the actual time


    var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized,
        _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse),
        tsFinal = _objToTS2[0],
        offsetFinal = _objToTS2[1],
        inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc: loc
    }); // gregorian data + weekday serves only to validate


    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
    }

    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  ;

  DateTime.fromISO = function fromISO(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseISODate = parseISODate(text),
        vals = _parseISODate[0],
        parsedZone = _parseISODate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  ;

  DateTime.fromRFC2822 = function fromRFC2822(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseRFC2822Date = parseRFC2822Date(text),
        vals = _parseRFC2822Date[0],
        parsedZone = _parseRFC2822Date[1];

    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  ;

  DateTime.fromHTTP = function fromHTTP(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseHTTPDate = parseHTTPDate(text),
        vals = _parseHTTPDate[0],
        parsedZone = _parseHTTPDate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromFormat = function fromFormat(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }

    var _opts = opts,
        _opts$locale = _opts.locale,
        locale = _opts$locale === void 0 ? null : _opts$locale,
        _opts$numberingSystem = _opts.numberingSystem,
        numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    }),
        _parseFromTokens = parseFromTokens(localeToUse, text, fmt),
        vals = _parseFromTokens[0],
        parsedZone = _parseFromTokens[1],
        specificOffset = _parseFromTokens[2],
        invalid = _parseFromTokens[3];

    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text, specificOffset);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  ;

  DateTime.fromString = function fromString(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  ;

  DateTime.fromSQL = function fromSQL(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseSQL = parseSQL(text),
        vals = _parseSQL[0],
        parsedZone = _parseSQL[1];

    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  ;

  DateTime.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({
        invalid: invalid
      });
    }
  }
  /**
   * Check if an object is a DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  DateTime.isDateTime = function isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  } // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  ;

  var _proto = DateTime.prototype;

  _proto.get = function get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  ;

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  _proto.resolvedLocaleOptions = function resolvedLocaleOptions(opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this),
        locale = _Formatter$create$res.locale,
        numberingSystem = _Formatter$create$res.numberingSystem,
        calendar = _Formatter$create$res.calendar;

    return {
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: calendar
    };
  } // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  ;

  _proto.toUTC = function toUTC(offset, opts) {
    if (offset === void 0) {
      offset = 0;
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.setZone(FixedOffsetZone.instance(offset), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  ;

  _proto.toLocal = function toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  ;

  _proto.setZone = function setZone(zone, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$keepLocalTime = _ref2.keepLocalTime,
        keepLocalTime = _ref2$keepLocalTime === void 0 ? false : _ref2$keepLocalTime,
        _ref2$keepCalendarTim = _ref2.keepCalendarTime,
        keepCalendarTime = _ref2$keepCalendarTim === void 0 ? false : _ref2$keepCalendarTim;

    zone = normalizeZone(zone, Settings.defaultZone);

    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      var newTS = this.ts;

      if (keepLocalTime || keepCalendarTime) {
        var offsetGuess = zone.offset(this.ts);
        var asObj = this.toObject();

        var _objToTS3 = objToTS(asObj, offsetGuess, zone);

        newTS = _objToTS3[0];
      }

      return clone(this, {
        ts: newTS,
        zone: zone
      });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2,
        locale = _ref3.locale,
        numberingSystem = _ref3.numberingSystem,
        outputCalendar = _ref3.outputCalendar;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: outputCalendar
    });
    return clone(this, {
      loc: loc
    });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  ;

  _proto.setLocale = function setLocale(locale) {
    return this.reconfigure({
      locale: locale
    });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;
    var normalized = normalizeObject(values, normalizeUnit),
        settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber;

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var mixed;

    if (settingWeekStuff) {
      mixed = weekToGregorian(_extends({}, gregorianToWeek(this.c), normalized));
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(_extends({}, gregorianToOrdinal(this.c), normalized));
    } else {
      mixed = _extends({}, this.toObject(), normalized); // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month

      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }

    var _objToTS4 = objToTS(mixed, this.o, this.zone),
        ts = _objToTS4[0],
        o = _objToTS4[1];

    return clone(this, {
      ts: ts,
      o: o
    });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  ;

  _proto.startOf = function startOf(unit) {
    if (!this.isValid) return this;
    var o = {},
        normalizedUnit = Duration.normalizeUnit(unit);

    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through

      case "quarters":
      case "months":
        o.day = 1;
      // falls through

      case "weeks":
      case "days":
        o.hour = 0;
      // falls through

      case "hours":
        o.minute = 0;
      // falls through

      case "minutes":
        o.second = 0;
      // falls through

      case "seconds":
        o.millisecond = 0;
        break;
      // no default, invalid units throw in normalizeUnit()
    }

    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }

    if (normalizedUnit === "quarters") {
      var q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  ;

  _proto.endOf = function endOf(unit) {
    var _this$plus;

    return this.isValid ? this.plus((_this$plus = {}, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
  } // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  ;

  _proto.toLocaleString = function toLocaleString(formatOpts, opts) {
    if (formatOpts === void 0) {
      formatOpts = DATE_SHORT;
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  ;

  _proto.toLocaleParts = function toLocaleParts(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(_temp3) {
    var _ref4 = _temp3 === void 0 ? {} : _temp3,
        _ref4$format = _ref4.format,
        format = _ref4$format === void 0 ? "extended" : _ref4$format,
        _ref4$suppressSeconds = _ref4.suppressSeconds,
        suppressSeconds = _ref4$suppressSeconds === void 0 ? false : _ref4$suppressSeconds,
        _ref4$suppressMillise = _ref4.suppressMilliseconds,
        suppressMilliseconds = _ref4$suppressMillise === void 0 ? false : _ref4$suppressMillise,
        _ref4$includeOffset = _ref4.includeOffset,
        includeOffset = _ref4$includeOffset === void 0 ? true : _ref4$includeOffset;

    if (!this.isValid) {
      return null;
    }

    var ext = format === "extended";

    var c = _toISODate(this, ext);

    c += "T";
    c += _toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset);
    return c;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate(_temp4) {
    var _ref5 = _temp4 === void 0 ? {} : _temp4,
        _ref5$format = _ref5.format,
        format = _ref5$format === void 0 ? "extended" : _ref5$format;

    if (!this.isValid) {
      return null;
    }

    return _toISODate(this, format === "extended");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  ;

  _proto.toISOWeekDate = function toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(_temp5) {
    var _ref6 = _temp5 === void 0 ? {} : _temp5,
        _ref6$suppressMillise = _ref6.suppressMilliseconds,
        suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise,
        _ref6$suppressSeconds = _ref6.suppressSeconds,
        suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds,
        _ref6$includeOffset = _ref6.includeOffset,
        includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset,
        _ref6$includePrefix = _ref6.includePrefix,
        includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix,
        _ref6$format = _ref6.format,
        format = _ref6$format === void 0 ? "extended" : _ref6$format;

    if (!this.isValid) {
      return null;
    }

    var c = includePrefix ? "T" : "";
    return c + _toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset);
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  ;

  _proto.toRFC2822 = function toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  ;

  _proto.toHTTP = function toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  ;

  _proto.toSQLDate = function toSQLDate() {
    if (!this.isValid) {
      return null;
    }

    return _toISODate(this, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQLTime = function toSQLTime(_temp6) {
    var _ref7 = _temp6 === void 0 ? {} : _temp6,
        _ref7$includeOffset = _ref7.includeOffset,
        includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset,
        _ref7$includeZone = _ref7.includeZone,
        includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone,
        _ref7$includeOffsetSp = _ref7.includeOffsetSpace,
        includeOffsetSpace = _ref7$includeOffsetSp === void 0 ? true : _ref7$includeOffsetSp;

    var fmt = "HH:mm:ss.SSS";

    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }

      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }

    return toTechFormat(this, fmt, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQL = function toSQL(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) {
      return null;
    }

    return this.toSQLDate() + " " + this.toSQLTime(opts);
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toSeconds = function toSeconds() {
    return this.isValid ? this.ts / 1000 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  ;

  _proto.toUnixInteger = function toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1000) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toBSON = function toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return {};

    var base = _extends({}, this.c);

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }

    return base;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toJSDate = function toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  } // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  ;

  _proto.diff = function diff(otherDateTime, unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }

    var durOpts = _extends({
      locale: this.locale,
      numberingSystem: this.numberingSystem
    }, opts);

    var units = maybeArray(unit).map(Duration.normalizeUnit),
        otherIsLater = otherDateTime.valueOf() > this.valueOf(),
        earlier = otherIsLater ? this : otherDateTime,
        later = otherIsLater ? otherDateTime : this,
        diffed = _diff(earlier, later, units, durOpts);

    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  _proto.diffNow = function diffNow(unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.diff(DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  ;

  _proto.until = function until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;
    var inputMs = otherDateTime.valueOf();
    var adjustedToZone = this.setZone(otherDateTime.zone, {
      keepLocalTime: true
    });
    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
  }
  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  ;

  _proto.toRelative = function toRelative(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    var base = options.base || DateTime.fromObject({}, {
      zone: this.zone
    }),
        padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    var units = ["years", "months", "days", "hours", "minutes", "seconds"];
    var unit = options.unit;

    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = undefined;
    }

    return diffRelative(base, this.plus(padding), _extends({}, options, {
      numeric: "always",
      units: units,
      unit: unit
    }));
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  ;

  _proto.toRelativeCalendar = function toRelativeCalendar(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    return diffRelative(options.base || DateTime.fromObject({}, {
      zone: this.zone
    }), this, _extends({}, options, {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  ;

  DateTime.min = function min() {
    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  ;

  DateTime.max = function max() {
    for (var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      dateTimes[_key2] = arguments[_key2];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.max);
  } // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  ;

  DateTime.fromFormatExplain = function fromFormatExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$locale = _options.locale,
        locale = _options$locale === void 0 ? null : _options$locale,
        _options$numberingSys = _options.numberingSystem,
        numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  ;

  DateTime.fromStringExplain = function fromStringExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    return DateTime.fromFormatExplain(text, fmt, options);
  } // FORMAT PRESETS

  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  ;

  _createClass(DateTime, [{
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "outputCalendar",
    get: function get() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */

  }, {
    key: "zone",
    get: function get() {
      return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */

  }, {
    key: "zoneName",
    get: function get() {
      return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */

  }, {
    key: "year",
    get: function get() {
      return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */

  }, {
    key: "quarter",
    get: function get() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */

  }, {
    key: "month",
    get: function get() {
      return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */

  }, {
    key: "day",
    get: function get() {
      return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */

  }, {
    key: "hour",
    get: function get() {
      return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */

  }, {
    key: "minute",
    get: function get() {
      return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */

  }, {
    key: "second",
    get: function get() {
      return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */

  }, {
    key: "millisecond",
    get: function get() {
      return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */

  }, {
    key: "weekYear",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */

  }, {
    key: "weekNumber",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */

  }, {
    key: "weekday",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */

  }, {
    key: "ordinal",
    get: function get() {
      return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */

  }, {
    key: "monthShort",
    get: function get() {
      return this.isValid ? Info.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */

  }, {
    key: "monthLong",
    get: function get() {
      return this.isValid ? Info.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */

  }, {
    key: "weekdayShort",
    get: function get() {
      return this.isValid ? Info.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */

  }, {
    key: "weekdayLong",
    get: function get() {
      return this.isValid ? Info.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */

  }, {
    key: "offset",
    get: function get() {
      return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameShort",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "short",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameLong",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "long",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */

  }, {
    key: "isOffsetFixed",
    get: function get() {
      return this.isValid ? this.zone.isUniversal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */

  }, {
    key: "isInDST",
    get: function get() {
      if (this.isOffsetFixed) {
        return false;
      } else {
        return this.offset > this.set({
          month: 1
        }).offset || this.offset > this.set({
          month: 5
        }).offset;
      }
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */

  }, {
    key: "isInLeapYear",
    get: function get() {
      return isLeapYear(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */

  }, {
    key: "daysInMonth",
    get: function get() {
      return daysInMonth(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */

  }, {
    key: "daysInYear",
    get: function get() {
      return this.isValid ? daysInYear(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */

  }, {
    key: "weeksInWeekYear",
    get: function get() {
      return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
  }], [{
    key: "DATE_SHORT",
    get: function get() {
      return DATE_SHORT;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED",
    get: function get() {
      return DATE_MED;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED_WITH_WEEKDAY",
    get: function get() {
      return DATE_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_FULL",
    get: function get() {
      return DATE_FULL;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_HUGE",
    get: function get() {
      return DATE_HUGE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_SIMPLE",
    get: function get() {
      return TIME_SIMPLE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SECONDS",
    get: function get() {
      return TIME_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_SIMPLE",
    get: function get() {
      return TIME_24_SIMPLE;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SECONDS",
    get: function get() {
      return TIME_24_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_24_WITH_SHORT_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_24_WITH_LONG_OFFSET;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT",
    get: function get() {
      return DATETIME_SHORT;
    }
    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT_WITH_SECONDS",
    get: function get() {
      return DATETIME_SHORT_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED",
    get: function get() {
      return DATETIME_MED;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_SECONDS",
    get: function get() {
      return DATETIME_MED_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_WEEKDAY",
    get: function get() {
      return DATETIME_MED_WITH_WEEKDAY;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL",
    get: function get() {
      return DATETIME_FULL;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL_WITH_SECONDS",
    get: function get() {
      return DATETIME_FULL_WITH_SECONDS;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE",
    get: function get() {
      return DATETIME_HUGE;
    }
    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE_WITH_SECONDS",
    get: function get() {
      return DATETIME_HUGE_WITH_SECONDS;
    }
  }]);

  return DateTime;
}();
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
  }
}

var VERSION = "2.3.1";

exports.DateTime = DateTime;
exports.Duration = Duration;
exports.FixedOffsetZone = FixedOffsetZone;
exports.IANAZone = IANAZone;
exports.Info = Info;
exports.Interval = Interval;
exports.InvalidZone = InvalidZone;
exports.Settings = Settings;
exports.SystemZone = SystemZone;
exports.VERSION = VERSION;
exports.Zone = Zone;
//# sourceMappingURL=luxon.js.map


/***/ }),

/***/ "./node_modules/queue-typescript/lib/src/index.js":
/*!********************************************************!*\
  !*** ./node_modules/queue-typescript/lib/src/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const linked_list_typescript_1 = __webpack_require__(/*! linked-list-typescript */ "./node_modules/linked-list-typescript/lib/src/index.js");
class Queue extends linked_list_typescript_1.LinkedList {
    constructor(...values) {
        super(...values);
    }
    get front() {
        return this.head;
    }
    enqueue(val) {
        this.append(val);
    }
    dequeue() {
        return this.removeHead();
    }
}
exports.Queue = Queue;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ste-core/dist/dispatching/DispatchError.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ste-core/dist/dispatching/DispatchError.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatchError = void 0;
/**
 * Indicates an error with dispatching.
 *
 * @export
 * @class DispatchError
 * @extends {Error}
 */
class DispatchError extends Error {
    /**
     * Creates an instance of DispatchError.
     * @param {string} message The message.
     *
     * @memberOf DispatchError
     */
    constructor(message) {
        super(message);
    }
}
exports.DispatchError = DispatchError;


/***/ }),

/***/ "./node_modules/ste-core/dist/dispatching/DispatcherBase.js":
/*!******************************************************************!*\
  !*** ./node_modules/ste-core/dist/dispatching/DispatcherBase.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionChangeEventDispatcher = exports.DispatcherBase = void 0;
const DispatcherWrapper_1 = __webpack_require__(/*! ./DispatcherWrapper */ "./node_modules/ste-core/dist/dispatching/DispatcherWrapper.js");
const Subscription_1 = __webpack_require__(/*! ../events/Subscription */ "./node_modules/ste-core/dist/events/Subscription.js");
const EventManagement_1 = __webpack_require__(/*! ../management/EventManagement */ "./node_modules/ste-core/dist/management/EventManagement.js");
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 *
 * @export
 * @abstract
 * @class DispatcherBase
 * @implements {ISubscribable<TEventHandler>}
 * @template TEventHandler The type of event handler.
 */
class DispatcherBase {
    constructor() {
        /**
         * The subscriptions.
         *
         * @protected
         *
         * @memberOf DispatcherBase
         */
        this._subscriptions = new Array();
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherBase
     */
    get count() {
        return this._subscriptions.length;
    }
    /**
     * Triggered when subscriptions are changed (added or removed).
     *
     * @readonly
     * @type {ISubscribable<SubscriptionChangeEventHandler>}
     * @memberOf DispatcherBase
     */
    get onSubscriptionChange() {
        if (this._onSubscriptionChange == null) {
            this._onSubscriptionChange = new SubscriptionChangeEventDispatcher();
        }
        return this._onSubscriptionChange.asEvent();
    }
    /**
     * Subscribe to the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherBase
     */
    subscribe(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, false));
            this.triggerSubscriptionChange();
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Subscribe to the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherBase
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherBase
     */
    one(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, true));
            this.triggerSubscriptionChange();
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     *
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf DispatcherBase
     */
    has(fn) {
        if (!fn)
            return false;
        return this._subscriptions.some((sub) => sub.handler == fn);
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     *
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf DispatcherBase
     */
    unsubscribe(fn) {
        if (!fn)
            return;
        let changes = false;
        for (let i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                changes = true;
                break;
            }
        }
        if (changes) {
            this.triggerSubscriptionChange();
        }
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     *
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf DispatcherBase
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    _dispatch(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new EventManagement_1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let s = sub;
            s.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
    /**
     * Creates a subscription.
     *
     * @protected
     * @param {TEventHandler} handler The handler.
     * @param {boolean} isOnce True if the handler should run only one.
     * @returns {ISubscription<TEventHandler>} The subscription.
     *
     * @memberOf DispatcherBase
     */
    createSubscription(handler, isOnce) {
        return new Subscription_1.Subscription(handler, isOnce);
    }
    /**
     * Cleans up subs that ran and should run only once.
     *
     * @protected
     * @param {ISubscription<TEventHandler>} sub The subscription.
     *
     * @memberOf DispatcherBase
     */
    cleanup(sub) {
        let changes = false;
        if (sub.isOnce && sub.isExecuted) {
            let i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
                changes = true;
            }
        }
        if (changes) {
            this.triggerSubscriptionChange();
        }
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISubscribable<TEventHandler>}
     *
     * @memberOf DispatcherBase
     */
    asEvent() {
        if (this._wrap == null) {
            this._wrap = new DispatcherWrapper_1.DispatcherWrapper(this);
        }
        return this._wrap;
    }
    /**
     * Clears the subscriptions.
     *
     * @memberOf DispatcherBase
     */
    clear() {
        if (this._subscriptions.length != 0) {
            this._subscriptions.splice(0, this._subscriptions.length);
            this.triggerSubscriptionChange();
        }
    }
    /**
     * Triggers the subscription change event.
     *
     * @private
     *
     * @memberOf DispatcherBase
     */
    triggerSubscriptionChange() {
        if (this._onSubscriptionChange != null) {
            this._onSubscriptionChange.dispatch(this.count);
        }
    }
}
exports.DispatcherBase = DispatcherBase;
/**
 * Dispatcher for subscription changes.
 *
 * @export
 * @class SubscriptionChangeEventDispatcher
 * @extends {DispatcherBase<SubscriptionChangeEventHandler>}
 */
class SubscriptionChangeEventDispatcher extends DispatcherBase {
    /**
     * Dispatches the event.
     *
     * @param {number} count The currrent number of subscriptions.
     *
     * @memberOf SubscriptionChangeEventDispatcher
     */
    dispatch(count) {
        this._dispatch(false, this, arguments);
    }
}
exports.SubscriptionChangeEventDispatcher = SubscriptionChangeEventDispatcher;


/***/ }),

/***/ "./node_modules/ste-core/dist/dispatching/DispatcherWrapper.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ste-core/dist/dispatching/DispatcherWrapper.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatcherWrapper = void 0;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 *
 * @export
 * @class DispatcherWrapper
 * @implements {ISubscribable<TEventHandler>}
 * @template TEventHandler The type of event handler.
 */
class DispatcherWrapper {
    /**
     * Creates an instance of DispatcherWrapper.
     * @param {ISubscribable<TEventHandler>} dispatcher
     *
     * @memberOf DispatcherWrapper
     */
    constructor(dispatcher) {
        this._subscribe = (fn) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn) => dispatcher.unsubscribe(fn);
        this._one = (fn) => dispatcher.one(fn);
        this._has = (fn) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
        this._count = () => dispatcher.count;
        this._onSubscriptionChange = () => dispatcher.onSubscriptionChange;
    }
    /**
     * Triggered when subscriptions are changed (added or removed).
     *
     * @readonly
     * @type {ISubscribable<SubscriptionChangeEventHandler>}
     * @memberOf DispatcherWrapper
     */
    get onSubscriptionChange() {
        return this._onSubscriptionChange();
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherWrapper
     */
    get count() {
        return this._count();
    }
    /**
     * Subscribe to the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherWrapper
     */
    subscribe(fn) {
        return this._subscribe(fn);
    }
    /**
     * Subscribe to the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherWrapper
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     *
     * @memberOf DispatcherWrapper
     */
    unsubscribe(fn) {
        this._unsubscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     *
     * @memberOf DispatcherWrapper
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     *
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherWrapper
     */
    one(fn) {
        return this._one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     *
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     *
     * @memberOf DispatcherWrapper
     */
    has(fn) {
        return this._has(fn);
    }
    /**
     * Clears all the subscriptions.
     *
     * @memberOf DispatcherWrapper
     */
    clear() {
        this._clear();
    }
}
exports.DispatcherWrapper = DispatcherWrapper;


/***/ }),

/***/ "./node_modules/ste-core/dist/dispatching/EventListBase.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ste-core/dist/dispatching/EventListBase.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventListBase = void 0;
/**
 * Base class for event lists classes. Implements the get and remove.
 *
 * @export
 * @abstract
 * @class EventListBaset
 * @template TEventDispatcher The type of event dispatcher.
 */
class EventListBase {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     *
     * @param {string} name The name of the event.
     * @returns {TEventDispatcher} The disptacher.
     *
     * @memberOf EventListBase
     */
    get(name) {
        let event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     *
     * @param {string} name
     *
     * @memberOf EventListBase
     */
    remove(name) {
        delete this._events[name];
    }
}
exports.EventListBase = EventListBase;


/***/ }),

/***/ "./node_modules/ste-core/dist/dispatching/PromiseDispatcherBase.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ste-core/dist/dispatching/PromiseDispatcherBase.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseDispatcherBase = void 0;
const PromiseSubscription_1 = __webpack_require__(/*! ../events/PromiseSubscription */ "./node_modules/ste-core/dist/events/PromiseSubscription.js");
const EventManagement_1 = __webpack_require__(/*! ../management/EventManagement */ "./node_modules/ste-core/dist/management/EventManagement.js");
const DispatcherBase_1 = __webpack_require__(/*! ./DispatcherBase */ "./node_modules/ste-core/dist/dispatching/DispatcherBase.js");
const DispatchError_1 = __webpack_require__(/*! ./DispatchError */ "./node_modules/ste-core/dist/dispatching/DispatchError.js");
/**
 * Dispatcher base for dispatchers that use promises. Each promise
 * is awaited before the next is dispatched, unless the event is
 * dispatched with the executeAsync flag.
 *
 * @export
 * @abstract
 * @class PromiseDispatcherBase
 * @extends {DispatcherBase<TEventHandler>}
 * @template TEventHandler The type of event handler.
 */
class PromiseDispatcherBase extends DispatcherBase_1.DispatcherBase {
    /**
     * The normal dispatch cannot be used in this class.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    _dispatch(executeAsync, scope, args) {
        throw new DispatchError_1.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
    }
    /**
     * Crates a new subscription.
     *
     * @protected
     * @param {TEventHandler} handler The handler.
     * @param {boolean} isOnce Indicates if the handler should only run once.
     * @returns {ISubscription<TEventHandler>} The subscription.
     *
     * @memberOf PromiseDispatcherBase
     */
    createSubscription(handler, isOnce) {
        return new PromiseSubscription_1.PromiseSubscription(handler, isOnce);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    async _dispatchAsPromise(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new EventManagement_1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let ps = sub;
            await ps.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
}
exports.PromiseDispatcherBase = PromiseDispatcherBase;


/***/ }),

/***/ "./node_modules/ste-core/dist/events/PromiseSubscription.js":
/*!******************************************************************!*\
  !*** ./node_modules/ste-core/dist/events/PromiseSubscription.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSubscription = void 0;
/**
 * Subscription implementation for events with promises.
 *
 * @export
 * @class PromiseSubscription
 * @implements {ISubscription<TEventHandler>}
 * @template TEventHandler The type of event handler.
 */
class PromiseSubscription {
    /**
     * Creates an instance of PromiseSubscription.
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     *
     * @memberOf PromiseSubscription
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         *
         * @memberOf PromiseSubscription
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     *
     * @memberOf PromiseSubscription
     */
    async execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            //TODO: do we need to cast to any -- seems yuck
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
                return;
            }
            let result = fn.apply(scope, args);
            await result;
        }
    }
}
exports.PromiseSubscription = PromiseSubscription;


/***/ }),

/***/ "./node_modules/ste-core/dist/events/Subscription.js":
/*!***********************************************************!*\
  !*** ./node_modules/ste-core/dist/events/Subscription.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subscription = void 0;
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
class Subscription {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    }
}
exports.Subscription = Subscription;


/***/ }),

/***/ "./node_modules/ste-core/dist/handling/HandlingBase.js":
/*!*************************************************************!*\
  !*** ./node_modules/ste-core/dist/handling/HandlingBase.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HandlingBase = void 0;
/**
 * Base class that implements event handling. With a an
 * event list this base class will expose events that can be
 * subscribed to. This will give your class generic events.
 *
 * @export
 * @abstract
 * @class HandlingBase
 * @template TEventHandler The type of event handler.
 * @template TDispatcher The type of dispatcher.
 * @template TList The type of event list.
 */
class HandlingBase {
    /**
     * Creates an instance of HandlingBase.
     * @param {TList} events The event list. Used for event management.
     *
     * @memberOf HandlingBase
     */
    constructor(events) {
        this.events = events;
    }
    /**
     * Subscribes once to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    one(name, fn) {
        this.events.get(name).one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    has(name, fn) {
        return this.events.get(name).has(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    subscribe(name, fn) {
        this.events.get(name).subscribe(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    sub(name, fn) {
        this.subscribe(name, fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    unsubscribe(name, fn) {
        this.events.get(name).unsubscribe(fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     *
     * @memberOf HandlingBase
     */
    unsub(name, fn) {
        this.unsubscribe(name, fn);
    }
}
exports.HandlingBase = HandlingBase;


/***/ }),

/***/ "./node_modules/ste-core/dist/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ste-core/dist/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionChangeEventDispatcher = exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
const DispatcherBase_1 = __webpack_require__(/*! ./dispatching/DispatcherBase */ "./node_modules/ste-core/dist/dispatching/DispatcherBase.js");
Object.defineProperty(exports, "DispatcherBase", ({ enumerable: true, get: function () { return DispatcherBase_1.DispatcherBase; } }));
Object.defineProperty(exports, "SubscriptionChangeEventDispatcher", ({ enumerable: true, get: function () { return DispatcherBase_1.SubscriptionChangeEventDispatcher; } }));
const DispatchError_1 = __webpack_require__(/*! ./dispatching/DispatchError */ "./node_modules/ste-core/dist/dispatching/DispatchError.js");
Object.defineProperty(exports, "DispatchError", ({ enumerable: true, get: function () { return DispatchError_1.DispatchError; } }));
const DispatcherWrapper_1 = __webpack_require__(/*! ./dispatching/DispatcherWrapper */ "./node_modules/ste-core/dist/dispatching/DispatcherWrapper.js");
Object.defineProperty(exports, "DispatcherWrapper", ({ enumerable: true, get: function () { return DispatcherWrapper_1.DispatcherWrapper; } }));
const EventListBase_1 = __webpack_require__(/*! ./dispatching/EventListBase */ "./node_modules/ste-core/dist/dispatching/EventListBase.js");
Object.defineProperty(exports, "EventListBase", ({ enumerable: true, get: function () { return EventListBase_1.EventListBase; } }));
const EventManagement_1 = __webpack_require__(/*! ./management/EventManagement */ "./node_modules/ste-core/dist/management/EventManagement.js");
Object.defineProperty(exports, "EventManagement", ({ enumerable: true, get: function () { return EventManagement_1.EventManagement; } }));
const HandlingBase_1 = __webpack_require__(/*! ./handling/HandlingBase */ "./node_modules/ste-core/dist/handling/HandlingBase.js");
Object.defineProperty(exports, "HandlingBase", ({ enumerable: true, get: function () { return HandlingBase_1.HandlingBase; } }));
const PromiseDispatcherBase_1 = __webpack_require__(/*! ./dispatching/PromiseDispatcherBase */ "./node_modules/ste-core/dist/dispatching/PromiseDispatcherBase.js");
Object.defineProperty(exports, "PromiseDispatcherBase", ({ enumerable: true, get: function () { return PromiseDispatcherBase_1.PromiseDispatcherBase; } }));
const PromiseSubscription_1 = __webpack_require__(/*! ./events/PromiseSubscription */ "./node_modules/ste-core/dist/events/PromiseSubscription.js");
Object.defineProperty(exports, "PromiseSubscription", ({ enumerable: true, get: function () { return PromiseSubscription_1.PromiseSubscription; } }));
const Subscription_1 = __webpack_require__(/*! ./events/Subscription */ "./node_modules/ste-core/dist/events/Subscription.js");
Object.defineProperty(exports, "Subscription", ({ enumerable: true, get: function () { return Subscription_1.Subscription; } }));


/***/ }),

/***/ "./node_modules/ste-core/dist/management/EventManagement.js":
/*!******************************************************************!*\
  !*** ./node_modules/ste-core/dist/management/EventManagement.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventManagement = void 0;
/**
 * Allows the user to interact with the event.
 *
 * @export
 * @class EventManagement
 * @implements {IEventManagement}
 */
class EventManagement {
    /**
     * Creates an instance of EventManagement.
     * @param {() => void} unsub An unsubscribe handler.
     *
     * @memberOf EventManagement
     */
    constructor(unsub) {
        this.unsub = unsub;
        this.propagationStopped = false;
    }
    /**
     * Stops the propagation of the event.
     * Cannot be used when async dispatch is done.
     *
     * @memberOf EventManagement
     */
    stopPropagation() {
        this.propagationStopped = true;
    }
}
exports.EventManagement = EventManagement;


/***/ }),

/***/ "./node_modules/ste-events/dist/EventDispatcher.js":
/*!*********************************************************!*\
  !*** ./node_modules/ste-events/dist/EventDispatcher.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class EventDispatcher
 * @extends {DispatcherBase<IEventHandler<TSender, TArgs>>}
 * @implements {IEvent<TSender, TArgs>}
 * @template TSender The sender type.
 * @template TArgs The event arguments type.
 */
class EventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of EventDispatcher.
     *
     * @memberOf EventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender.
     * @param {TArgs} args The arguments.
     * @returns {IPropagationStatus} The propagation status to interact with the event
     *
     * @memberOf EventDispatcher
     */
    dispatch(sender, args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event in an async way. Does not support event interaction.
     *
     * @param {TSender} sender The sender.
     * @param {TArgs} args The arguments.
     *
     * @memberOf EventDispatcher
     */
    dispatchAsync(sender, args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {IEvent<TSender, TArgs>} The event.
     *
     * @memberOf EventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.EventDispatcher = EventDispatcher;


/***/ }),

/***/ "./node_modules/ste-events/dist/EventHandlingBase.js":
/*!***********************************************************!*\
  !*** ./node_modules/ste-events/dist/EventHandlingBase.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const EventList_1 = __webpack_require__(/*! ./EventList */ "./node_modules/ste-events/dist/EventList.js");
/**
 * Extends objects with signal event handling capabilities.
 */
class EventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new EventList_1.EventList());
    }
}
exports.EventHandlingBase = EventHandlingBase;


/***/ }),

/***/ "./node_modules/ste-events/dist/EventList.js":
/*!***************************************************!*\
  !*** ./node_modules/ste-events/dist/EventList.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./node_modules/ste-events/dist/EventDispatcher.js");
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class EventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.EventList = EventList;


/***/ }),

/***/ "./node_modules/ste-events/dist/NonUniformEventList.js":
/*!*************************************************************!*\
  !*** ./node_modules/ste-events/dist/NonUniformEventList.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformEventList = void 0;
const EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./node_modules/ste-events/dist/EventDispatcher.js");
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.NonUniformEventList = NonUniformEventList;


/***/ }),

/***/ "./node_modules/ste-events/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ste-events/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformEventList = exports.EventList = exports.EventHandlingBase = exports.EventDispatcher = void 0;
const EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./node_modules/ste-events/dist/EventDispatcher.js");
Object.defineProperty(exports, "EventDispatcher", ({ enumerable: true, get: function () { return EventDispatcher_1.EventDispatcher; } }));
const EventHandlingBase_1 = __webpack_require__(/*! ./EventHandlingBase */ "./node_modules/ste-events/dist/EventHandlingBase.js");
Object.defineProperty(exports, "EventHandlingBase", ({ enumerable: true, get: function () { return EventHandlingBase_1.EventHandlingBase; } }));
const EventList_1 = __webpack_require__(/*! ./EventList */ "./node_modules/ste-events/dist/EventList.js");
Object.defineProperty(exports, "EventList", ({ enumerable: true, get: function () { return EventList_1.EventList; } }));
const NonUniformEventList_1 = __webpack_require__(/*! ./NonUniformEventList */ "./node_modules/ste-events/dist/NonUniformEventList.js");
Object.defineProperty(exports, "NonUniformEventList", ({ enumerable: true, get: function () { return NonUniformEventList_1.NonUniformEventList; } }));


/***/ }),

/***/ "./node_modules/ste-promise-events/dist/NonUniformPromiseEventList.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ste-promise-events/dist/NonUniformPromiseEventList.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseEventList = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(/*! ./PromiseEventDispatcher */ "./node_modules/ste-promise-events/dist/PromiseEventDispatcher.js");
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.NonUniformPromiseEventList = NonUniformPromiseEventList;


/***/ }),

/***/ "./node_modules/ste-promise-events/dist/PromiseEventDispatcher.js":
/*!************************************************************************!*\
  !*** ./node_modules/ste-promise-events/dist/PromiseEventDispatcher.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class PromiseEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseEventHandler<TSender, TArgs>>}
 * @implements {IPromiseEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
class PromiseEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     * @returns {Promise<IPropagationStatus>} The status.
     *
     * @memberOf PromiseEventDispatcher
     */
    async dispatch(sender, args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     *
     * @memberOf PromiseEventDispatcher
     */
    dispatchAsync(sender, args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseEventDispatcher = PromiseEventDispatcher;


/***/ }),

/***/ "./node_modules/ste-promise-events/dist/PromiseEventHandlingBase.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ste-promise-events/dist/PromiseEventHandlingBase.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseEventList_1 = __webpack_require__(/*! ./PromiseEventList */ "./node_modules/ste-promise-events/dist/PromiseEventList.js");
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseEventList_1.PromiseEventList());
    }
}
exports.PromiseEventHandlingBase = PromiseEventHandlingBase;


/***/ }),

/***/ "./node_modules/ste-promise-events/dist/PromiseEventList.js":
/*!******************************************************************!*\
  !*** ./node_modules/ste-promise-events/dist/PromiseEventList.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseEventDispatcher_1 = __webpack_require__(/*! ./PromiseEventDispatcher */ "./node_modules/ste-promise-events/dist/PromiseEventDispatcher.js");
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.PromiseEventList = PromiseEventList;


/***/ }),

/***/ "./node_modules/ste-promise-events/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/ste-promise-events/dist/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseEventList = exports.PromiseEventList = exports.PromiseEventHandlingBase = exports.PromiseEventDispatcher = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(/*! ./PromiseEventDispatcher */ "./node_modules/ste-promise-events/dist/PromiseEventDispatcher.js");
Object.defineProperty(exports, "PromiseEventDispatcher", ({ enumerable: true, get: function () { return PromiseEventDispatcher_1.PromiseEventDispatcher; } }));
const PromiseEventHandlingBase_1 = __webpack_require__(/*! ./PromiseEventHandlingBase */ "./node_modules/ste-promise-events/dist/PromiseEventHandlingBase.js");
Object.defineProperty(exports, "PromiseEventHandlingBase", ({ enumerable: true, get: function () { return PromiseEventHandlingBase_1.PromiseEventHandlingBase; } }));
const PromiseEventList_1 = __webpack_require__(/*! ./PromiseEventList */ "./node_modules/ste-promise-events/dist/PromiseEventList.js");
Object.defineProperty(exports, "PromiseEventList", ({ enumerable: true, get: function () { return PromiseEventList_1.PromiseEventList; } }));
const NonUniformPromiseEventList_1 = __webpack_require__(/*! ./NonUniformPromiseEventList */ "./node_modules/ste-promise-events/dist/NonUniformPromiseEventList.js");
Object.defineProperty(exports, "NonUniformPromiseEventList", ({ enumerable: true, get: function () { return NonUniformPromiseEventList_1.NonUniformPromiseEventList; } }));


/***/ }),

/***/ "./node_modules/ste-promise-signals/dist/PromiseSignalDispatcher.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ste-promise-signals/dist/PromiseSignalDispatcher.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
class PromiseSignalDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the dispatch.
     *
     * @memberOf SignalDispatcher
     */
    async dispatch() {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync() {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSignalDispatcher = PromiseSignalDispatcher;


/***/ }),

/***/ "./node_modules/ste-promise-signals/dist/PromiseSignalHandlingBase.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ste-promise-signals/dist/PromiseSignalHandlingBase.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseSignalList_1 = __webpack_require__(/*! ./PromiseSignalList */ "./node_modules/ste-promise-signals/dist/PromiseSignalList.js");
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSignalHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSignalList_1.PromiseSignalList());
    }
}
exports.PromiseSignalHandlingBase = PromiseSignalHandlingBase;


/***/ }),

/***/ "./node_modules/ste-promise-signals/dist/PromiseSignalList.js":
/*!********************************************************************!*\
  !*** ./node_modules/ste-promise-signals/dist/PromiseSignalList.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseSignalDispatcher_1 = __webpack_require__(/*! ./PromiseSignalDispatcher */ "./node_modules/ste-promise-signals/dist/PromiseSignalDispatcher.js");
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSignalList extends ste_core_1.EventListBase {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSignalDispatcher_1.PromiseSignalDispatcher();
    }
}
exports.PromiseSignalList = PromiseSignalList;


/***/ }),

/***/ "./node_modules/ste-promise-signals/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ste-promise-signals/dist/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalList = exports.PromiseSignalHandlingBase = exports.PromiseSignalDispatcher = void 0;
const PromiseSignalDispatcher_1 = __webpack_require__(/*! ./PromiseSignalDispatcher */ "./node_modules/ste-promise-signals/dist/PromiseSignalDispatcher.js");
Object.defineProperty(exports, "PromiseSignalDispatcher", ({ enumerable: true, get: function () { return PromiseSignalDispatcher_1.PromiseSignalDispatcher; } }));
const PromiseSignalHandlingBase_1 = __webpack_require__(/*! ./PromiseSignalHandlingBase */ "./node_modules/ste-promise-signals/dist/PromiseSignalHandlingBase.js");
Object.defineProperty(exports, "PromiseSignalHandlingBase", ({ enumerable: true, get: function () { return PromiseSignalHandlingBase_1.PromiseSignalHandlingBase; } }));
const PromiseSignalList_1 = __webpack_require__(/*! ./PromiseSignalList */ "./node_modules/ste-promise-signals/dist/PromiseSignalList.js");
Object.defineProperty(exports, "PromiseSignalList", ({ enumerable: true, get: function () { return PromiseSignalList_1.PromiseSignalList; } }));


/***/ }),

/***/ "./node_modules/ste-promise-simple-events/dist/NonUniformPromiseSimpleEventList.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/ste-promise-simple-events/dist/NonUniformPromiseSimpleEventList.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseSimpleEventList = void 0;
const PromiseSimpleEventDispatcher_1 = __webpack_require__(/*! ./PromiseSimpleEventDispatcher */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventDispatcher.js");
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.NonUniformPromiseSimpleEventList = NonUniformPromiseSimpleEventList;


/***/ }),

/***/ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventDispatcher.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventDispatcher.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class PromiseSimpleEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseSimpleEventHandler<TArgs>>}
 * @implements {IPromiseSimpleEvent<TArgs>}
 * @template TArgs
 */
class PromiseSimpleEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     * @param args The arguments object.
     * @returns {IPropagationStatus} The status of the dispatch.
     * @memberOf PromiseSimpleEventDispatcher
     */
    async dispatch(args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for it to complete.
     * @param args The argument object.
     * @memberOf PromiseSimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSimpleEventDispatcher = PromiseSimpleEventDispatcher;


/***/ }),

/***/ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventHandlingBase.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventHandlingBase.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseSimpleEventList_1 = __webpack_require__(/*! ./PromiseSimpleEventList */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventList.js");
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSimpleEventList_1.PromiseSimpleEventList());
    }
}
exports.PromiseSimpleEventHandlingBase = PromiseSimpleEventHandlingBase;


/***/ }),

/***/ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventList.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventList.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const PromiseSimpleEventDispatcher_1 = __webpack_require__(/*! ./PromiseSimpleEventDispatcher */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventDispatcher.js");
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.PromiseSimpleEventList = PromiseSimpleEventList;


/***/ }),

/***/ "./node_modules/ste-promise-simple-events/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/ste-promise-simple-events/dist/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseSimpleEventList = exports.PromiseSimpleEventList = exports.PromiseSimpleEventHandlingBase = exports.PromiseSimpleEventDispatcher = void 0;
const NonUniformPromiseSimpleEventList_1 = __webpack_require__(/*! ./NonUniformPromiseSimpleEventList */ "./node_modules/ste-promise-simple-events/dist/NonUniformPromiseSimpleEventList.js");
Object.defineProperty(exports, "NonUniformPromiseSimpleEventList", ({ enumerable: true, get: function () { return NonUniformPromiseSimpleEventList_1.NonUniformPromiseSimpleEventList; } }));
const PromiseSimpleEventDispatcher_1 = __webpack_require__(/*! ./PromiseSimpleEventDispatcher */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventDispatcher.js");
Object.defineProperty(exports, "PromiseSimpleEventDispatcher", ({ enumerable: true, get: function () { return PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher; } }));
const PromiseSimpleEventHandlingBase_1 = __webpack_require__(/*! ./PromiseSimpleEventHandlingBase */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventHandlingBase.js");
Object.defineProperty(exports, "PromiseSimpleEventHandlingBase", ({ enumerable: true, get: function () { return PromiseSimpleEventHandlingBase_1.PromiseSimpleEventHandlingBase; } }));
const PromiseSimpleEventList_1 = __webpack_require__(/*! ./PromiseSimpleEventList */ "./node_modules/ste-promise-simple-events/dist/PromiseSimpleEventList.js");
Object.defineProperty(exports, "PromiseSimpleEventList", ({ enumerable: true, get: function () { return PromiseSimpleEventList_1.PromiseSimpleEventList; } }));


/***/ }),

/***/ "./node_modules/ste-signals/dist/SignalDispatcher.js":
/*!***********************************************************!*\
  !*** ./node_modules/ste-signals/dist/SignalDispatcher.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 *
 * @export
 * @class SignalDispatcher
 * @extends {DispatcherBase<ISignalHandler>}
 * @implements {ISignal}
 */
class SignalDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the signal.
     *
     * @memberOf SignalDispatcher
     */
    dispatch() {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal without waiting for the result.
     *
     * @memberOf SignalDispatcher
     */
    dispatchAsync() {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISignal} The signal.
     *
     * @memberOf SignalDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SignalDispatcher = SignalDispatcher;


/***/ }),

/***/ "./node_modules/ste-signals/dist/SignalHandlingBase.js":
/*!*************************************************************!*\
  !*** ./node_modules/ste-signals/dist/SignalHandlingBase.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const SignalList_1 = __webpack_require__(/*! ./SignalList */ "./node_modules/ste-signals/dist/SignalList.js");
/**
 * Extends objects with signal event handling capabilities.
 *
 * @export
 * @abstract
 * @class SignalHandlingBase
 * @extends {HandlingBase<ISignalHandler, SignalDispatcher, SignalList>}
 * @implements {ISignalHandling}
 */
class SignalHandlingBase extends ste_core_1.HandlingBase {
    /**
     * Creates an instance of SignalHandlingBase.
     *
     * @memberOf SignalHandlingBase
     */
    constructor() {
        super(new SignalList_1.SignalList());
    }
}
exports.SignalHandlingBase = SignalHandlingBase;


/***/ }),

/***/ "./node_modules/ste-signals/dist/SignalList.js":
/*!*****************************************************!*\
  !*** ./node_modules/ste-signals/dist/SignalList.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const SignalDispatcher_1 = __webpack_require__(/*! ./SignalDispatcher */ "./node_modules/ste-signals/dist/SignalDispatcher.js");
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 *
 * @export
 * @class SignalList
 * @extends {EventListBase<SignalDispatcher>}
 */
class SignalList extends ste_core_1.EventListBase {
    /**
     * Creates an instance of SignalList.
     *
     * @memberOf SignalList
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     *
     * @protected
     * @returns {SignalDispatcher}
     *
     * @memberOf SignalList
     */
    createDispatcher() {
        return new SignalDispatcher_1.SignalDispatcher();
    }
}
exports.SignalList = SignalList;


/***/ }),

/***/ "./node_modules/ste-signals/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/ste-signals/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = void 0;
const SignalDispatcher_1 = __webpack_require__(/*! ./SignalDispatcher */ "./node_modules/ste-signals/dist/SignalDispatcher.js");
Object.defineProperty(exports, "SignalDispatcher", ({ enumerable: true, get: function () { return SignalDispatcher_1.SignalDispatcher; } }));
const SignalHandlingBase_1 = __webpack_require__(/*! ./SignalHandlingBase */ "./node_modules/ste-signals/dist/SignalHandlingBase.js");
Object.defineProperty(exports, "SignalHandlingBase", ({ enumerable: true, get: function () { return SignalHandlingBase_1.SignalHandlingBase; } }));
const SignalList_1 = __webpack_require__(/*! ./SignalList */ "./node_modules/ste-signals/dist/SignalList.js");
Object.defineProperty(exports, "SignalList", ({ enumerable: true, get: function () { return SignalList_1.SignalList; } }));


/***/ }),

/***/ "./node_modules/ste-simple-events/dist/NonUniformSimpleEventList.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ste-simple-events/dist/NonUniformSimpleEventList.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformSimpleEventList = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(/*! ./SimpleEventDispatcher */ "./node_modules/ste-simple-events/dist/SimpleEventDispatcher.js");
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.NonUniformSimpleEventList = NonUniformSimpleEventList;


/***/ }),

/***/ "./node_modules/ste-simple-events/dist/SimpleEventDispatcher.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ste-simple-events/dist/SimpleEventDispatcher.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class SimpleEventDispatcher
 * @extends {DispatcherBase<ISimpleEventHandler<TArgs>>}
 * @implements {ISimpleEvent<TArgs>}
 * @template TArgs
 */
class SimpleEventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of SimpleEventDispatcher.
     *
     * @memberOf SimpleEventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The status of the event.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatch(args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TArgs} args The arguments object.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISimpleEvent<TArgs>} The event.
     *
     * @memberOf SimpleEventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SimpleEventDispatcher = SimpleEventDispatcher;


/***/ }),

/***/ "./node_modules/ste-simple-events/dist/SimpleEventHandlingBase.js":
/*!************************************************************************!*\
  !*** ./node_modules/ste-simple-events/dist/SimpleEventHandlingBase.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const SimpleEventList_1 = __webpack_require__(/*! ./SimpleEventList */ "./node_modules/ste-simple-events/dist/SimpleEventList.js");
/**
 * Extends objects with signal event handling capabilities.
 */
class SimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new SimpleEventList_1.SimpleEventList());
    }
}
exports.SimpleEventHandlingBase = SimpleEventHandlingBase;


/***/ }),

/***/ "./node_modules/ste-simple-events/dist/SimpleEventList.js":
/*!****************************************************************!*\
  !*** ./node_modules/ste-simple-events/dist/SimpleEventList.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventList = void 0;
const ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
const SimpleEventDispatcher_1 = __webpack_require__(/*! ./SimpleEventDispatcher */ "./node_modules/ste-simple-events/dist/SimpleEventDispatcher.js");
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.SimpleEventList = SimpleEventList;


/***/ }),

/***/ "./node_modules/ste-simple-events/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/ste-simple-events/dist/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(/*! ./SimpleEventDispatcher */ "./node_modules/ste-simple-events/dist/SimpleEventDispatcher.js");
Object.defineProperty(exports, "SimpleEventDispatcher", ({ enumerable: true, get: function () { return SimpleEventDispatcher_1.SimpleEventDispatcher; } }));
const SimpleEventHandlingBase_1 = __webpack_require__(/*! ./SimpleEventHandlingBase */ "./node_modules/ste-simple-events/dist/SimpleEventHandlingBase.js");
Object.defineProperty(exports, "SimpleEventHandlingBase", ({ enumerable: true, get: function () { return SimpleEventHandlingBase_1.SimpleEventHandlingBase; } }));
const NonUniformSimpleEventList_1 = __webpack_require__(/*! ./NonUniformSimpleEventList */ "./node_modules/ste-simple-events/dist/NonUniformSimpleEventList.js");
Object.defineProperty(exports, "NonUniformSimpleEventList", ({ enumerable: true, get: function () { return NonUniformSimpleEventList_1.NonUniformSimpleEventList; } }));
const SimpleEventList_1 = __webpack_require__(/*! ./SimpleEventList */ "./node_modules/ste-simple-events/dist/SimpleEventList.js");
Object.defineProperty(exports, "SimpleEventList", ({ enumerable: true, get: function () { return SimpleEventList_1.SimpleEventList; } }));


/***/ }),

/***/ "./node_modules/strongly-typed-events/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/strongly-typed-events/dist/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseSimpleEventList = exports.PromiseSimpleEventList = exports.PromiseSimpleEventHandlingBase = exports.PromiseSimpleEventDispatcher = exports.PromiseSignalList = exports.PromiseSignalHandlingBase = exports.PromiseSignalDispatcher = exports.NonUniformPromiseEventList = exports.PromiseEventList = exports.PromiseEventHandlingBase = exports.PromiseEventDispatcher = exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = exports.NonUniformEventList = exports.EventList = exports.EventHandlingBase = exports.EventDispatcher = exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
var ste_core_1 = __webpack_require__(/*! ste-core */ "./node_modules/ste-core/dist/index.js");
Object.defineProperty(exports, "Subscription", ({ enumerable: true, get: function () { return ste_core_1.Subscription; } }));
Object.defineProperty(exports, "DispatcherBase", ({ enumerable: true, get: function () { return ste_core_1.DispatcherBase; } }));
Object.defineProperty(exports, "DispatcherWrapper", ({ enumerable: true, get: function () { return ste_core_1.DispatcherWrapper; } }));
Object.defineProperty(exports, "EventListBase", ({ enumerable: true, get: function () { return ste_core_1.EventListBase; } }));
Object.defineProperty(exports, "EventManagement", ({ enumerable: true, get: function () { return ste_core_1.EventManagement; } }));
Object.defineProperty(exports, "DispatchError", ({ enumerable: true, get: function () { return ste_core_1.DispatchError; } }));
Object.defineProperty(exports, "PromiseSubscription", ({ enumerable: true, get: function () { return ste_core_1.PromiseSubscription; } }));
Object.defineProperty(exports, "PromiseDispatcherBase", ({ enumerable: true, get: function () { return ste_core_1.PromiseDispatcherBase; } }));
Object.defineProperty(exports, "HandlingBase", ({ enumerable: true, get: function () { return ste_core_1.HandlingBase; } }));
var ste_events_1 = __webpack_require__(/*! ste-events */ "./node_modules/ste-events/dist/index.js");
Object.defineProperty(exports, "EventDispatcher", ({ enumerable: true, get: function () { return ste_events_1.EventDispatcher; } }));
Object.defineProperty(exports, "EventHandlingBase", ({ enumerable: true, get: function () { return ste_events_1.EventHandlingBase; } }));
Object.defineProperty(exports, "EventList", ({ enumerable: true, get: function () { return ste_events_1.EventList; } }));
Object.defineProperty(exports, "NonUniformEventList", ({ enumerable: true, get: function () { return ste_events_1.NonUniformEventList; } }));
var ste_simple_events_1 = __webpack_require__(/*! ste-simple-events */ "./node_modules/ste-simple-events/dist/index.js");
Object.defineProperty(exports, "SimpleEventDispatcher", ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventDispatcher; } }));
Object.defineProperty(exports, "SimpleEventHandlingBase", ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventHandlingBase; } }));
Object.defineProperty(exports, "SimpleEventList", ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventList; } }));
Object.defineProperty(exports, "NonUniformSimpleEventList", ({ enumerable: true, get: function () { return ste_simple_events_1.NonUniformSimpleEventList; } }));
var ste_signals_1 = __webpack_require__(/*! ste-signals */ "./node_modules/ste-signals/dist/index.js");
Object.defineProperty(exports, "SignalDispatcher", ({ enumerable: true, get: function () { return ste_signals_1.SignalDispatcher; } }));
Object.defineProperty(exports, "SignalHandlingBase", ({ enumerable: true, get: function () { return ste_signals_1.SignalHandlingBase; } }));
Object.defineProperty(exports, "SignalList", ({ enumerable: true, get: function () { return ste_signals_1.SignalList; } }));
var ste_promise_events_1 = __webpack_require__(/*! ste-promise-events */ "./node_modules/ste-promise-events/dist/index.js");
Object.defineProperty(exports, "PromiseEventDispatcher", ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventDispatcher; } }));
Object.defineProperty(exports, "PromiseEventHandlingBase", ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventHandlingBase; } }));
Object.defineProperty(exports, "PromiseEventList", ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventList; } }));
Object.defineProperty(exports, "NonUniformPromiseEventList", ({ enumerable: true, get: function () { return ste_promise_events_1.NonUniformPromiseEventList; } }));
var ste_promise_signals_1 = __webpack_require__(/*! ste-promise-signals */ "./node_modules/ste-promise-signals/dist/index.js");
Object.defineProperty(exports, "PromiseSignalDispatcher", ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalDispatcher; } }));
Object.defineProperty(exports, "PromiseSignalHandlingBase", ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalHandlingBase; } }));
Object.defineProperty(exports, "PromiseSignalList", ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalList; } }));
var ste_promise_simple_events_1 = __webpack_require__(/*! ste-promise-simple-events */ "./node_modules/ste-promise-simple-events/dist/index.js");
Object.defineProperty(exports, "PromiseSimpleEventDispatcher", ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventDispatcher; } }));
Object.defineProperty(exports, "PromiseSimpleEventHandlingBase", ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventHandlingBase; } }));
Object.defineProperty(exports, "PromiseSimpleEventList", ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventList; } }));
Object.defineProperty(exports, "NonUniformPromiseSimpleEventList", ({ enumerable: true, get: function () { return ste_promise_simple_events_1.NonUniformPromiseSimpleEventList; } }));


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

/***/ "./src/chart.ts":
/*!**********************!*\
  !*** ./src/chart.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

//import * as moment from 'moment';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! chartjs-adapter-luxon */ "./node_modules/chartjs-adapter-luxon/dist/chartjs-adapter-luxon.esm.js");
const chartjs_plugin_streaming_1 = __importDefault(__webpack_require__(/*! chartjs-plugin-streaming */ "./node_modules/chartjs-plugin-streaming/dist/chartjs-plugin-streaming.esm.js"));
const chart_js_1 = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");
chart_js_1.Chart.register(chartjs_plugin_streaming_1.default);
chart_js_1.Chart.register(...chart_js_1.registerables);
chart_js_1.Chart.defaults.set('plugins.streaming', {
    duration: 20000
});
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
class myChart2 {
    constructor(canvas) {
        var config = {
            type: 'line',
            data: {
                datasets: [{
                        label: 'Dataset 2 (cubic interpolation)',
                        backgroundColor: '#000000',
                        //backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
                        borderColor: chartColors.blue,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        data: []
                    }]
            },
            pointStyle: 'line',
            options: {
                title: {
                    display: true,
                    text: 'Line chart (hotizontal scroll) sample'
                },
                scales: {
                    xAxes: {
                        type: 'realtime',
                        realtime: {
                            duration: 20000,
                            refresh: 10,
                            delay: 2000,
                            //onRefresh: 
                        }
                    },
                    yAxes: {
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }
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
        //var ctx = canvas.getContext("2d");
        this.stremingChart = new chart_js_1.Chart(canvas, config);
        window.myChart = this.stremingChart;
    }
    PushData(value) {
        //var d = this.stremingChart.data.datasets[0].data;
        let valuePbj = {
            x: Date.now(),
            y: value,
        };
        //var time1 = performance.now();
        //this.stremingChart.data.datasets[0].data.push(valuePbj);
        //var time2 = performance.now();
        //this.stremingChart.update('quiet');
        //console.log(time2 - time1);
    }
}
exports["default"] = myChart2;
function onRefresh(chart) {
    //var result = GetBytes(1);
    //var b = new Buffer(1);
    //var value = torqueBuff.pop();
    var value = randomScalingFactor();
    if (value != null) {
        var now = Date.now();
        chart.data.datasets.forEach(function (dataset) {
            dataset.data.push({
                x: now,
                y: value
            });
        });
    }
}
/*
var color = Chart.helpers.color;


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

*/ 


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
__webpack_require__(/*! ../js/chart */ "./js/chart.js");
const Buffer_1 = __importDefault(__webpack_require__(/*! ./Buffer */ "./src/Buffer.ts"));
const serial_1 = __webpack_require__(/*! ./serial */ "./src/serial.ts");
const sensor_1 = __webpack_require__(/*! ./sensor */ "./src/sensor.ts");
const chart_1 = __importDefault(__webpack_require__(/*! ./chart */ "./src/chart.ts"));
const serialBuffer_1 = __importDefault(__webpack_require__(/*! ./serialBuffer */ "./src/serialBuffer.ts"));
//import a from "./tss"
var chart;
var a = new Buffer_1.default(5);
console.log(a.size);
(_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (navigator.serial) {
        var serialWorker = yield (0, serial_1.connectSerial)();
        if (serialWorker != null) {
            let bufferedWorker = new serialBuffer_1.default(serialWorker, 100);
            var sensor = new sensor_1.Sensor(bufferedWorker);
            sensor.onTick.sub((value) => {
                if (chart != null) {
                    chart.PushData(value);
                }
                //console.log(value);
            });
            yield sensor.StartReading();
        }
        else {
            alert('Web Serial API not supported.');
        }
    }
}));
window.onload = function () {
    var element = document.getElementById('myChart');
    chart = new chart_1.default(element);
    //window.myChart = new Chart(ctx, config);
};


/***/ }),

/***/ "./src/sensor.ts":
/*!***********************!*\
  !*** ./src/sensor.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sensor = void 0;
const strongly_typed_events_1 = __webpack_require__(/*! strongly-typed-events */ "./node_modules/strongly-typed-events/dist/index.js");
const READ_HOLDING_REGISTERS = 3; // чтение значений из нескольких регистров хранения;
const READ_INPUT_REGISTERS = 4; // чтение значений из нескольких регистров ввода;
const FORCE_SINGLE_COIL = 5; // запись значения одного флага;
const PRESET_SINGLE_REGISTER = 6; // запись значения в один регистр хранения;
const PRESET_MULTIPLE_REGISTERS = 16; // запись значений в несколько регистров хранения;
const REPORT_SLAVE_ID = 17; // чтение служебной информации об устройстве.
const START_MEASURING = 0;
const START_STREAMING = 1;
const COIL_ON_VALUE = 0x00FF;
const COIL_OFF_VALUE = 0x0000;
var packageType;
(function (packageType) {
    packageType[packageType["torque"] = 100] = "torque";
    packageType[packageType["speed"] = 101] = "speed";
    packageType[packageType["temperatue"] = 102] = "temperatue";
    packageType[packageType["msg"] = 103] = "msg";
})(packageType || (packageType = {}));
;
//declare function handler(data: Uint8Array): void;
//const packageType = { torque: 100, speed: 101, temperatue: 102, msg: 103 };
class Sensor {
    constructor(worker) {
        this.started = false;
        //handler: (data: Uint8Array) =>  void;
        this._onTorqueData = new strongly_typed_events_1.SimpleEventDispatcher();
        this.worker = worker;
    }
    //Events 
    get onTick() {
        return this._onTorqueData.asEvent();
    }
    StopReading() {
        return __awaiter(this, void 0, void 0, function* () {
            /// Send comand to decoder.
            this.started = false;
        });
    }
    StartReading() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.started)
                throw "Already started";
            this.SendMessage(FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);
            var response1 = yield this.worker.Read(5);
            this.SendMessage(FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
            var response2 = yield this.worker.Read(5);
            this.processbytes();
            this.started = true;
        });
    }
    addTorqueListener(handler) {
        //this.handler = handler;
    }
    processbytes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var size, dataType, timeL, timeH;
                let commonData = yield this.worker.Read(7);
                const view = new DataView(commonData.buffer);
                dataType = view.getUint8(0);
                size = view.getUint16(1, true);
                timeL = view.getUint16(3, true);
                timeH = view.getUint16(5, true);
                //console.log("Process: ",commonData);
                switch (dataType) {
                    case packageType.torque:
                        var datatorque = yield this.worker.Read(size - 4);
                        //console.log("Process: ", datatorque);
                        const torqView = new DataView(datatorque.buffer);
                        var bufferCount = torqView.getUint8(0);
                        var dataCount = torqView.getUint8(1);
                        for (let i = 0; i < dataCount; i++) {
                            var value = torqView.getFloat32((2 + (i * 4)), true);
                            this._onTorqueData.dispatch(value);
                            //torqueBuff.push(value);
                        }
                        break;
                    case packageType.speed:
                        var dataSpeed = yield this.worker.Read(size - 4);
                        //console.log("Process: ", dataSpeed);
                        const speedView = new DataView(dataSpeed.buffer);
                        var speed = speedView.getFloat32(0, true);
                        //console.log(dataSpeed);
                        break;
                    case packageType.temperatue:
                        var dataTemperature = yield this.worker.Read(size - 4);
                        const temperatureView = new DataView(dataTemperature.buffer);
                        var temperature = temperatureView.getFloat32(0, true);
                        //console.log("Process: ",dataTemperature);
                        break;
                    case packageType.msg:
                        var dataMsg = yield this.worker.Read(size - 4);
                        const msgView = new DataView(dataMsg.buffer);
                        var msgCount = msgView.getUint16(0, true);
                        //console.log("Process: ",dataMsg);
                        for (let i = 0; i < msgCount; i++) {
                            var msg = msgView.getUint16(2 + (i * 2));
                        }
                        break;
                    default:
                        console.log('Error');
                    //break;
                }
                setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.processbytes(); }), 5);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SendMessage(command, addres, value) {
        var reqest = new Uint8Array(5);
        reqest[0] = command;
        reqest[1] = addres & 0xFF;
        reqest[2] = (addres >> 8) & 0xFF;
        reqest[3] = value & 0xFF;
        reqest[4] = (value >> 8) & 0xFF;
        this.worker.Write(reqest);
        //console.log("reqest: ", reqest);
    }
}
exports.Sensor = Sensor;
exports["default"] = Sensor;
/*

export var torqueBuff = new exports.RingBuffer(100);

var intervalId;

export async function InitDevice(getBytes, writeBytes)
{
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);
    var response1 = await getBytes(5);
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
    var response2 = await getBytes(5);

    intervalId =  setInterval(() => processbytes(processbytes), 10);
    getter = getBytes;
    await processbytes();
}



export function SendMessage(command, addres, value)
{
    var reqest = new Uint8Array(5);
    reqest[0] = command;
    reqest[1] = addres & 0xFF;
    reqest[2] = (addres >> 8) & 0xFF;
    reqest[3] = value & 0xFF;
    reqest[4] = (value >> 8) & 0xFF;

    writeBytes(reqest);
    //console.log("reqest: ", reqest);
}

function isValidResponse(req, res)
{
    if (req.length != res.length)
    {
        return false;
    }

    for (var i = 0; i < res.length; i++)
    {
        if (req[i] != res[i])
        {
            return false;
        }
    }

    return true;
}

//const state = { torque: 100, speed: 101, temperature: 102, message: 103, none: -1};
*/


/***/ }),

/***/ "./src/serial.ts":
/*!***********************!*\
  !*** ./src/serial.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectSerial = exports.SerialWorker = void 0;
class SerialWorker {
    constructor(reader, writer) {
        this.readAttempts = 10;
        this.delaybetweenAttempts = 10;
        this.reader = reader;
        this.writer = writer;
    }
    GetChunk() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.GetChunkRecursive(this.readAttempts, 0);
            if (result == null) {
                throw new Error('ReadingError');
            }
            return result;
        });
    }
    GetChunkRecursive(totalAttempts, currentAttempt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (totalAttempts == currentAttempt)
                return null;
            var result = yield this.reader.read();
            if (!result.done) {
                return result.value;
            }
            else {
                yield this.timeout();
                return yield this.GetChunkRecursive(totalAttempts, currentAttempt + 1);
            }
        });
    }
    timeout() {
        return new Promise(resolve => setTimeout(resolve, this.delaybetweenAttempts));
    }
    write(bytes) {
        this.writer.write(bytes);
    }
}
exports.SerialWorker = SerialWorker;
function connectSerial() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let port = yield navigator.serial.requestPort();
            yield port.open({
                baudRate: 115200,
                bufferSize: 1024,
                dataBits: 8,
                flowControl: "none",
                parity: "none",
                stopBits: 1,
            });
            if (port.readable != null && port.writable != null) {
                var worker = new SerialWorker(port.readable.getReader(), port.writable.getWriter());
                return worker;
            }
            return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.connectSerial = connectSerial;


/***/ }),

/***/ "./src/serialBuffer.ts":
/*!*****************************!*\
  !*** ./src/serialBuffer.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const queue_typescript_1 = __webpack_require__(/*! queue-typescript */ "./node_modules/queue-typescript/lib/src/index.js");
class SerialBufferedWorker {
    constructor(worker, size) {
        this.worker = worker;
        this.size = size;
        this.queue = new queue_typescript_1.Queue();
    }
    Read(count) {
        return __awaiter(this, void 0, void 0, function* () {
            if (count > this.size)
                throw "Too large count!";
            var result = new Uint8Array(count);
            var currentCount = 0;
            while (true) {
                if (this.queue.length >= count) {
                    for (let i = 0; i < count; i++) {
                        result[currentCount++] = this.queue.dequeue();
                    }
                    return result;
                }
                else {
                    var values = yield this.worker.GetChunk();
                    for (let i = 0; i < values.length; i++) {
                        this.queue.append(values[i]);
                    }
                }
            }
        });
    }
    Write(data) {
        this.worker.write(data);
    }
}
exports["default"] = SerialBufferedWorker;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map