var _this = this;

/* global document*/

const Particle = options => {
  const that = _this;
  const MAXRADIUS = 6;

  const getOption = options => {
    that.options = {
      count: 100,
      color: '#fff',
      selectorId: 'canvas',
      isMove: true
    };
  };

  // get random
  const getRandom = () => {
    return Math.random();
  };

  // draw one particle
  const draw = (cxt, maxX, maxY, count) => {
    for (let i = 0; i < count; i++) {
      const radius = getRandom() * MAXRADIUS;
      const x = getRandom() * maxX;
      const y = getRandom() * maxY;
      cxt.beginPath();
      cxt.arc(x, y, radius, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
    }
  };

  const init = () => {
    getOption(options);

    // all particle

    const { count, color, selectorId, isMove } = that.options;

    const ele = document.getElementById(selectorId);
    const maxX = ele.width;
    const maxY = ele.height;

    const cxt = ele.getContext('2d');
    cxt.fillStyle = color;

    draw(cxt, maxX, maxY, count);

    while (isMove) {
      draw(cxt, maxX, maxY, count);
    }
  };

  init();
};

export default Particle;

// 得到绘制区域
// 绘画粒子 大小？ 位置？
// 粒子移动 位置？ 移动频率
