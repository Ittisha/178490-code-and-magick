'use strict';
window.colorizeElement = (function () {
  var colorClickIndex = 0;

  /**
   * Set new value of color index
   * @param {Array} colors
   */
  var setColorIndex = function (colors) {
    colorClickIndex++;
    if (colorClickIndex > colors.length - 1) {
      colorClickIndex = 0;
    }
  };

  /**
   * Call callback function with new color
   * @param {Node} element
   * @param {Array} colors
   * @param {Function} callback
   */
  var colorize = function (element, colors, callback) {
    setColorIndex(colors);
    callback(element, colors[colorClickIndex]);
  };

  /**
   * Get color for filling input value
   * @param {Node} element
   * @param {Array} colors
   * @param {Function} callback
   */
  var fillColorInput = function (element, colors, callback) {
    callback(element, colors[colorClickIndex]);
  };

  return {
    colorize: colorize,
    fillColorInput: fillColorInput
  };
})();

