/* global document requestAnimationFrame */

const MAXRADIUS = 4;
var MAXX = 0;
var MAXY = 0;

// 得到一个随机数
const getRandom = () => {
  return Math.random();
};

// 合并参数
const extend = (destination,source) => {
  for(let property in source) {
    destination[property] = source[property];
  }
  return destination;
};

// 得到一个随机方向(1 或 -1)
const getDirect = () => {
  return Math.pow(-1, Math.ceil(getRandom() * 10));
};

// 点对象(x坐标 y坐标 r半径)
const Point = function(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sx = getDirect() * getRandom();
  this.sy = getDirect() * getRandom();
  const that = this;

  // 绘制点
  this.draw = (cxt) => {
    cxt.beginPath();
    cxt.arc(that.x, that.y, that.r, 0, Math.PI*2, true);
    cxt.closePath();
    cxt.fill();
  };

  // 点移动
  this.move = () => {
    const { sx, sy } = that;
    that.x += sx;
    that.y += sy;
    if(that.x > MAXX) that.x = that.x - MAXX;
    if(that.x < 0) that.x = that.x + MAXX;

    if(that.y > MAXX) that.y = that.y - MAXY;
    if(that.y < 0) that.y = that.y + MAXY;
  };
};

// 例子对象
const Particle = function(options) {
  const that = this;
  that.moveLength = 10;

  // 得到配置参数
  const getOption = options => {
    const defaults = {
      count: 100,
      color: '#fff',
      selectorId: 'canvas'
    };

    that.options = extend(defaults, options);
  };

  // 初始化
  const init = () => {
    getOption(options);

    const {color, selectorId, count} = that.options;

    const ele = document.getElementById(selectorId);
    MAXX = ele.width;
    MAXY = ele.height;
    that.cxt = ele.getContext('2d');
    that.cxt.fillStyle = color;

    that.points = [];

    // 生成粒子
    for(let i = 0; i < count; i++) {
      const radius = getRandom() * MAXRADIUS;
      const x = getRandom() * MAXX;
      const y = getRandom() * MAXY;
      that.points.push(new Point(x, y, radius));
    }
  };

  // 绘制
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
