'use strict';

window.data = (function () {
  var WIZARDS_NUMBER = 4;
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // Arrays copies for unique wizards creation
  var WIZARDS_NAMES = NAMES.slice(0);
  var WIZARDS_SURNAMES = SURNAMES.slice(0);
  var WIZARDS_COAT_COLORS = COAT_COLORS.slice(0);
  var WIZARDS_EYES_COLORS = EYES_COLORS.slice(0);

  /**
   * Create unique wizard
   * @return {Object}
   */
  var createUniqueWizard = function () {
    // Random name and surname change
    var wizardsNames = window.util.getRandomArrayItem([WIZARDS_NAMES, WIZARDS_SURNAMES]);
    var wizardsSurnames = wizardsNames === WIZARDS_NAMES ? WIZARDS_SURNAMES : WIZARDS_NAMES;

    return {
      name: window.util.getUniqueArrayItem(wizardsNames) + ' ' + window.util.getUniqueArrayItem(wizardsSurnames),
      coatColor: window.util.getUniqueArrayItem(WIZARDS_COAT_COLORS),
      eyesColor: window.util.getUniqueArrayItem(WIZARDS_EYES_COLORS)
    };
  };

  /**
   * Create random wizard
   * @return {Object}
   */
  var createRandomWizard = function () {
    return {
      name: NAMES[window.util.getRandomInteger(0, NAMES.length - 1)] + ' ' + SURNAMES[window.util.getRandomInteger(0, SURNAMES.length - 1)],
      coatColor: COAT_COLORS[window.util.getRandomInteger(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[window.util.getRandomInteger(0, EYES_COLORS.length - 1)]
    };
  };
  /**
   * Choose and return unique or random wizard
   * @return {Object}
   */
  var chooseCreationMethod = function () {
    if (WIZARDS_NUMBER > Math.min(NAMES.length, SURNAMES.length, COAT_COLORS.length, EYES_COLORS.length)) {
      return createRandomWizard();
    }
    return createUniqueWizard();
  };

  /**
   * Create an array with wizards objects
   * @return {Array}
   */
  var createAvailableWizards = function () {
    var wizardsGroup = [];
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      wizardsGroup.push(chooseCreationMethod());
    }
    return wizardsGroup;
  };

  return {
    createAvailableWizards: createAvailableWizards,
    wizardsColors: {
      coat: COAT_COLORS,
      eyes: EYES_COLORS,
      fireball: FIREBALL_COLORS
    }
  };
})();
