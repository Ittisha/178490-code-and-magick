'use strict';
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

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarWizardContent = similarWizardTemplate ? similarWizardTemplate.content : similarWizardTemplate;
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
 * Creates wizards
 * @return {Array}
 */
var createWizards = function () {
  var i;
  var wizardsList = [];

  if (WIZARDS_NUMBER > Math.min(NAMES.length, SURNAMES.length, COAT_COLORS.length, EYES_COLORS.length)) {
    for (i = 0; i < WIZARDS_NUMBER; i++) {
      wizardsList[i] = {
        name: NAMES[getRandomInteger(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomInteger(0, SURNAMES.length - 1)],
        coatColor: COAT_COLORS[getRandomInteger(0, COAT_COLORS.length - 1)],
        eyesColor: EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)]
      };
    }
  } else {
    var WIZARDS_NAMES = NAMES.slice(0);
    var WIZARDS_SURNAMES = SURNAMES.slice(0);
    var WIZARDS_COAT_COLORS = COAT_COLORS.slice(0);
    var WIZARDS_EYES_COLORS = EYES_COLORS.slice(0);

    // Random name and surname change
    var wizardsNames = getRandomArrayItem([WIZARDS_NAMES, WIZARDS_SURNAMES]);
    var wizardsSurnames = wizardsNames === WIZARDS_NAMES ? WIZARDS_SURNAMES : WIZARDS_NAMES;

    for (i = 0; i < WIZARDS_NUMBER; i++) {
      wizardsList[i] = {
        name: getUniqueArrayItem(wizardsNames) + ' ' + getUniqueArrayItem(wizardsSurnames),
        coatColor: getUniqueArrayItem(WIZARDS_COAT_COLORS),
        eyesColor: getUniqueArrayItem(WIZARDS_EYES_COLORS)
      };
    }
  }
  return wizardsList;
};
/**
 * Return a wizard
 * @param {Object} wizard
 * @return {Node}
 */
var renderWizard = function (wizard) {
  var wizardItem = similarWizardContent.querySelector('.setup-similar-item').cloneNode(true);
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


