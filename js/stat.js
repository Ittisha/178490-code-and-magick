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
  var maxTime = -1;
  var minLength = Math.min(names.length, times.length);

  for (i = 0; i <= minLength; i++) {
    var time = times[i];
    if (time > maxTime) {
      maxTime = time;
    }
  }

  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var histogram = {
    barWidth: 40,
    height: 150,
    step: function () {
      return this.height / maxTime;
    },
    indent: 50,
    textIndent: 20,
    initialX: 150,
    initialY: 240,
    youColor: 'rgb(255, 0, 0)',
    getOtherPlayerColor: function () {
      var randomOpacity = getRandomNumber(0.1, 1);
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
    var timeInteger = Math.round(times[i]);
    var barInitialX = histogram.initialX + histogram.barWidth * i + histogram.indent * i;
    var barHeight = times[i] * histogram.step();

    ctx.fillRect(barInitialX, histogram.initialY, histogram.barWidth, -barHeight);

    ctx.fillStyle = histogram.textStyle;
    ctx.font = histogram.textFont;
    ctx.fillText(names[i], barInitialX, histogram.initialY + histogram.textIndent);
    ctx.fillText(timeInteger.toString(), barInitialX, histogram.initialY - barHeight - histogram.textIndent / 2);
  }
};
