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

// Arrays copies for unique wizards creation
var WIZARDS_NAMES = NAMES.slice(0);
var WIZARDS_SURNAMES = SURNAMES.slice(0);
var WIZARDS_COAT_COLORS = COAT_COLORS.slice(0);
var WIZARDS_EYES_COLORS = EYES_COLORS.slice(0);

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarWizardContent = similarWizardTemplate.content ? similarWizardTemplate.content : similarWizardTemplate;
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
 * Create unique wizard
 * @return {Object}
 */
var createUniqueWizard = function () {
  // Random name and surname change
  var wizardsNames = getRandomArrayItem([WIZARDS_NAMES, WIZARDS_SURNAMES]);
  var wizardsSurnames = wizardsNames === WIZARDS_NAMES ? WIZARDS_SURNAMES : WIZARDS_NAMES;

  return {
    name: getUniqueArrayItem(wizardsNames) + ' ' + getUniqueArrayItem(wizardsSurnames),
    coatColor: getUniqueArrayItem(WIZARDS_COAT_COLORS),
    eyesColor: getUniqueArrayItem(WIZARDS_EYES_COLORS)
  };
};
/**
 * Create random wizard
 * @return {Object}
 */
var createRandomWizard = function () {
  return {
    name: NAMES[getRandomInteger(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomInteger(0, SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandomInteger(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)]
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
var wizardsList = createAvailableWizards();
renderAllWizards(wizardsList, similarList);
makeVisible(similarSetup);

// Module4-task1
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');

var setupClose = setup.querySelector('.setup-close');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupUserName = setupForm.querySelector('.setup-user-name');
var setupButton = setupForm.querySelector('.setup-submit');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  makeVisible(setup);
  document.addEventListener('keydown', onPopupEscPress);
};

var onSetupOpenClick = function () {
  openPopup();
};

var onSetupOpenEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var onSetupCloseClick = function () {
  closePopup();
};
var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};
var onSetupButtonClick = function (evt) {
  evt.preventDefault();
  closePopup();
};
var onSetupButtonEnterPress = function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpenIcon.addEventListener('keydown', onSetupOpenEnterPress);

setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseEnterPress);

setupButton.addEventListener('click', onSetupButtonClick);
setupButton.addEventListener('keydown', onSetupButtonEnterPress);

