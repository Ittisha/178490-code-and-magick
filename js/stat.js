'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    xPoint: 100,
    yPoint: 10,
    width: 420,
    height: 270,
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

  ctx.fillStyle = cloud.shadowStyle;
  ctx.strokeRect(cloud.xPoint + cloud.shadowIndentX, cloud.yPoint + cloud.shadowIndentY, cloud.width, cloud.height);
  ctx.fillRect(cloud.xPoint + cloud.shadowIndentX, cloud.yPoint + cloud.shadowIndentY, cloud.width, cloud.height);

  ctx.fillStyle = cloud.style;
  ctx.strokeRect(cloud.xPoint, cloud.yPoint, cloud.width, cloud.height);
  ctx.fillRect(cloud.xPoint, cloud.yPoint, cloud.width, cloud.height);

  ctx.fillStyle = cloud.textStyle;
  ctx.font = cloud.textFont;

  ctx.fillText('Ура вы победили!', cloud.textInitialX, cloud.textInitialY);
  ctx.fillText('Список результатов!', cloud.textInitialX, cloud.textInitialY + cloud.textIndentY);

  var i;
  var max = -1;
  var minLength = Math.min(names.length, times.length);

  for (i = 0; i <= minLength; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  var histogram = {
    barWidth: 40,
    height: 150,
    step: function () {
      return this.height / max;
    },
    indent: 50,
    initialX: 140,
    initialY: 240,
    youColor: 'rgba(255, 0, 0, 1)',
    getOtherPlayerColor: function () {
      var randomOpacity = Math.random().toFixed(2).toString();
      return 'rgba(0, 0, 255, ' + randomOpacity + ')';
    },
    textStyle: '#000000',
    textFont: '16px PT Mono'
  };

  for (i = 0; i < minLength; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = histogram.youColor;
    } else {
      ctx.fillStyle = histogram.getOtherPlayerColor();
    }
    ctx.fillRect(histogram.initialX + histogram.barWidth * i + histogram.indent * i, histogram.initialY, histogram.barWidth, -times[i] * histogram.step());

    ctx.fillStyle = histogram.textStyle;
    ctx.font = histogram.textFont;
    ctx.fillText(names[i], histogram.initialX + histogram.barWidth * i + histogram.indent * i, histogram.initialY + 20);
    ctx.fillText(Math.round(times[i]).toString(), histogram.initialX + histogram.barWidth * i + histogram.indent * i, histogram.initialY - times[i] * histogram.step() - 10);
  }
};
