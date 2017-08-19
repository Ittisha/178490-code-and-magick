'use strict';
var WISARDS_NUMBER = 4;
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

var userDialog = document.querySelector('.setup');
var similarWisardTempate = document.querySelector('#similar-wizard-template');
var similarWisardContent = similarWisardTempate ? similarWisardTempate.content : similarWisardTempate;
var similarList = userDialog.querySelector('.setup-similar-list');
var similarSetup = userDialog.querySelector('.setup-similar');

/**
 * Remove class .hidden
 * @param {Node} hiddenNode
 */
var makeVisible = function (hiddenNode) {
  hiddenNode.classList.remove('hidden');
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
/**
 * Return unique random array item
 * @param {Array} array
 * @return {*}
 */
var getUniqueArrayItem = function (array) {
  return array.splice(getRandomInteger(0, array.length - 1), 1)[0];
};
/**
 * Creates WIZARD_NUMBER unique wizards
 * WIZARDS_NUMBER must be <= arrays with properties length
 * @return {Array}
 */
var createWizards = function () {
  var wizardsList = [];
  var WIZARDS_NAMES = NAMES.slice(0);
  var WIZARDS_SURNAMES = SURNAMES.slice(0);
  var WIZARDS_COAT_COLORS = COAT_COLORS.slice(0);
  var WIZARDS_EYES_COLORS = EYES_COLORS.slice(0);
  for (var i = 0; i < WISARDS_NUMBER; i++) {
    wizardsList[i] = {
      name: getUniqueArrayItem(WIZARDS_NAMES) + ' ' + getUniqueArrayItem(WIZARDS_SURNAMES),
      coatColor: getUniqueArrayItem(WIZARDS_COAT_COLORS),
      eyesColor: getUniqueArrayItem(WIZARDS_EYES_COLORS)
    };
  }
  return wizardsList;
};
/**
 * Return a wizard
 * @param {Object} wizard
 * @return {Node}
 */
var renderWizard = function (wizard) {
  var wizardItem = similarWisardContent.querySelector('.setup-similar-item').cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardItem;
};
/**
 * Append Wizards in target node
 * @param {Array} wizards
 * @param {Node} targetNode
 */
var renderAllWizards = function (wizards, targetNode) {
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (element) {
    fragment.appendChild(renderWizard(element));
  });
  targetNode.appendChild(fragment);
};

makeVisible(userDialog);
var wizardsList = createWizards();
renderAllWizards(wizardsList, similarList);
makeVisible(similarSetup);


