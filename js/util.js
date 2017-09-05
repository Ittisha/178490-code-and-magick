'use strict';

window.util = (function () {
  var KEY_CODES = {
    esc: 27,
    enter: 13
  };

  /**
   * Do action if Esc pressed
   * @param {Object} evt
   * @param {Function} action
   */
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODES.esc) {
      action();
    }
  };
  /**
   * Do action if Enter pressed
   * @param {Object} evt
   * @param {Function} action
   * @param {*} param - of callback
   */
  var isEnterEvent = function (evt, action, param) {
    if (evt.keyCode === KEY_CODES.enter) {
      action(param);
    }
  };
  /**
   * Return random integer between min and max inclusive
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };
  /** Returns random array item
   * @param {Array} array
   * @return {*}
   */
  var getRandomArrayItem = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };
  /**
   * Return unique random array item
   * @param {Array} array
   * @return {*}
   */
  var getUniqueArrayItem = function (array) {
    return array.splice(getRandomInteger(0, array.length - 1), 1)[0];
  };

  /**
   * Remove class .hidden
   * @param {Node} hiddenNode
   */
  var makeVisible = function (hiddenNode) {
    hiddenNode.classList.remove('hidden');
  };

  return {
    getRandomInteger: getRandomInteger,
    getRandomArrayItem: getRandomArrayItem,
    getUniqueArrayItem: getUniqueArrayItem,
    makeVisible: makeVisible,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
