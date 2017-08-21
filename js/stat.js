'use strict';
/**
 * Returns random number
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};
/**
 * Returns string with rgba blue color of different opacity
 * @return {string}
 */
var getOtherPlayerColor = function () {
  var randomOpacity = getRandomNumber(0.1, 1);
  return 'rgba(0, 0, 255, ' + randomOpacity + ')';
};
/**
 * Render cloud using cloud or default params
 * @param {Object} ctx
 * @param {Object} cloudParams
 */
var renderCloud = function (ctx, cloudParams) {
  ctx.beginPath();
  ctx.moveTo(cloudParams.xPoint, cloudParams.yPoint);

  ctx.bezierCurveTo(164, -3, 243, 3, 274, 14);
  ctx.bezierCurveTo(317, -2, 392, 2, 412, 19);
  ctx.bezierCurveTo(493, 0, 609, 6, 546, 37);
  ctx.bezierCurveTo(615, 58, 608, 142, 547, 150);
  ctx.bezierCurveTo(514, 200, 596, 260, 534, 266);
  ctx.bezierCurveTo(464, 300, 501, 272, 423, 267);
  ctx.bezierCurveTo(384, 307, 351, 274, 310, 269);
  ctx.bezierCurveTo(318, 291, 195, 285, 170, 278);
  ctx.bezierCurveTo(147, 295, 92, 283, 67, 247);
  ctx.bezierCurveTo(79, 189, 30, 224, 39, 169);
  ctx.bezierCurveTo(112, 125, 28, 106, 43, 65);
  ctx.bezierCurveTo(83, 12, 45, 29, 100, 10);

  ctx.closePath();
  ctx.stroke();

  ctx.shadowColor = cloudParams.shadowStyle;
  ctx.shadowOffsetX = cloudParams.shadowIndentX;
  ctx.shadowOffsetY = cloudParams.shadowIndentY;

  ctx.fillStyle = cloudParams.style;
  ctx.fill();

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

};
/**
 * Render histogram bar using histogram or default params
 * @param {Object} ctx
 * @param {Object} bar
 * @param {Array}names
 * @param  {Array}times
 * @return {boolean}
 */
var renderBar = function (ctx, bar, names, times) {
  if (times.length !== names.length) {
    return false;
  }
  var maxTime = Math.max.apply(null, times);
  var step = (bar.height) / maxTime;

  names.forEach(function (element, index) {
    if (element === 'Вы') {
      ctx.fillStyle = bar.youColor;
    } else {
      ctx.fillStyle = getOtherPlayerColor();
    }

    var timeInteger = Math.round(times[index]);
    var barInitialX = (bar.initialX) + (bar.barWidth) * index + (bar.indent) * index;
    var barHeight = times[index] * step;

    ctx.fillRect(barInitialX, bar.initialY, bar.barWidth, -barHeight);

    ctx.fillStyle = bar.textStyle;
    ctx.font = bar.textFont;
    ctx.fillText(element, barInitialX, (bar.initialY) + (bar.textIndent));
    ctx.fillText(timeInteger.toString(), barInitialX, (bar.initialY) - barHeight - (bar.textIndent) / 2);
  });
  return true;
};
/**
 * Render cloud with players' statistics
 * @param {Object} ctx
 * @param {Array} names
 * @param {Array} times
 */
window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    xPoint: 100,
    yPoint: 10,
    style: 'white',
    shadowIndentX: 10,
    shadowIndentY: 10,
    shadowStyle: 'rgba(0, 0, 0, 0.7)',
    textInitialX: 120,
    textInitialY: 40,
    textIndentY: 20,
    textStyle: '#000000',
    textFont: '16px PT Mono'
  };
  var histogram = {
    barWidth: 40,
    height: 150,
    indent: 50,
    textIndent: 20,
    initialX: 150,
    initialY: 240,
    youColor: 'rgb(255, 0, 0)',
    textStyle: '#000000',
    textFont: '16px PT Mono'
  };

  renderCloud(ctx, cloud);

  ctx.fillStyle = cloud.textStyle;
  ctx.font = cloud.textFont;
  ctx.fillText('Ура вы победили!', cloud.textInitialX, cloud.textInitialY);
  ctx.fillText('Список результатов!', cloud.textInitialX, cloud.textInitialY + cloud.textIndentY);

  renderBar(ctx, histogram, names, times);
};
