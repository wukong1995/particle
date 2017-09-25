/* global document requestAnimationFrame */

const MAXRADIUS = 4;
var MAXX = 0;
var MAXY = 0;

// get random
const getRandom = () => {
  return Math.random();
};

// extend
const extend = (destination,source) => {
  for(let property in source) {
    destination[property] = source[property];
  }
  return destination;
};

const getDirect = () => {
  return Math.pow(-1, Math.ceil(getRandom() * 10));
};

const Point = function(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sx = getDirect() * getRandom() * 2;
  this.sy = getDirect() * getRandom() * 2;
  const that = this;

  this.draw = function(cxt) {
    cxt.beginPath();
    cxt.arc(that.x, that.y, that.r, 0, Math.PI*2, true);
    cxt.closePath();
    cxt.fill();
  };

  this.move = () => {
    const { sx, sy } = that;
    that.x += sx;
    that.y += sy;
    if(that.x > MAXX || that.x < 0) that.sx = -sx;
    if(that.y > MAXY || that.y < 0) that.sy = -sy;
  };
};

const Particle = function(options) {
  const that = this;
  that.moveLength = 10;

  const getOption = options => {
    const defaults = {
      count: 100,
      color: '#fff',
      selectorId: 'canvas'
    };

    that.options = extend(defaults, options);
  };

  const init = () => {
    getOption(options);

    // all particle
    const {color, selectorId, count} = that.options;

    const ele = document.getElementById(selectorId);
    MAXX = ele.width;
    MAXY = ele.height;
    that.cxt = ele.getContext('2d');
    that.cxt.fillStyle = color;

    that.points = [];

    for(let i = 0; i < count; i++) {
      const radius = getRandom() * MAXRADIUS;
      const x = getRandom() * MAXX;
      const y = getRandom() * MAXY;
      that.points.push(new Point(x, y, radius));
    }
  };

  const print = () => {
    const { count } = that.options;
    const { cxt, points } = that;
    cxt.clearRect(0, 0, MAXX, MAXY);

    for(let i = 0; i < count; i++) {
      points[i].move();
      points[i].draw(cxt);
    }
  };

  const loop = () => {
    requestAnimationFrame(loop);
    print();
  };

  init();
  loop();
};

export default Particle;

// 得到绘制区域
// 绘画粒子 大小？ 位置？
// 粒子移动 位置？ 移动频率
