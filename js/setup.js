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

var setup = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var similarWizardContent = similarWizardTemplate.content ? similarWizardTemplate.content : similarWizardTemplate;
var similarList = setup.querySelector('.setup-similar-list');
var similarSetup = setup.querySelector('.setup-similar');

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

var wizardsList = createAvailableWizards();
renderAllWizards(wizardsList, similarList);
makeVisible(similarSetup);

// Module4-task1

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// for click count
var coatColorClick = 0;
var eyesColorClick = 0;
var fireballColorClick = 0;

var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');

var setupClose = setup.querySelector('.setup-close');
var setupForm = setup.querySelector('.setup-wizard-form');
var userNameInput = setupForm.querySelector('.setup-user-name');
var submitButton = setupForm.querySelector('.setup-submit');

var userWizardAppearance = setup.querySelector('.setup-wizard-appearance');
var userWizard = userWizardAppearance.querySelector('.setup-wizard');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = setup.querySelector('.setup-fireball-wrap');

var wizardCoatInput = userWizardAppearance.querySelector('input[name=coat-color]');
var wizardEyesInput = userWizardAppearance.querySelector('input[name=eyes-color]');
var wizardFireballInput = userWizardFireball.querySelector('input[name=fireball-color]');

/**
 * Close popup on ESC press if name input isn't focused
 * @param {Object} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};
/**
 * Open popup
 */
var openPopup = function () {
  makeVisible(setup);
  document.addEventListener('keydown', onPopupEscPress);
};
/**
 * Open popup on avatar click
 */
var onSetupOpenClick = function () {
  openPopup();
};
/**
 * Open popup on Enter press on user avatar
 * @param {Object} evt
 */
var onSetupOpenEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};
/**
 * CLose popup
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
/**
 * Close popup on cross click
 */
var onSetupCloseClick = function () {
  closePopup();
};
/**
 * Close popup on cross Enter press
 * @param {Object} evt
 */
var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};
/**
 * Check validation of name input, if valid - submit and close popup
 * @param {Object} evt
 */
var checkValidationSubmit = function (evt) {
  userNameInput.reportValidity();

  if (userNameInput.checkValidity() === false) {
    evt.preventDefault();
  } else {
    setupForm.submit();
    closePopup();
  }

};
/**
 * Close popup on submit button click
 * @param {Object} evt
 */
var onSetupButtonClick = function (evt) {
  checkValidationSubmit(evt);
};
/**
 * Close popup on submit button Enter press
 * @param {Object} evt
 */
var onSetupButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    checkValidationSubmit();
  }
};

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpenIcon.addEventListener('keydown', onSetupOpenEnterPress);

setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseEnterPress);

submitButton.addEventListener('click', onSetupButtonClick);
submitButton.addEventListener('keydown', onSetupButtonEnterPress);

/**
 * Rewrite validation messages in russian
 * @param {Node} inputNode
 */
var rewriteValidationMessages = function (inputNode) {
  var minLength = inputNode.getAttribute('minlength');
  var maxLength = inputNode.getAttribute('maxlength');

  if (inputNode.validity.tooShort) {
    inputNode.setCustomValidity('Имя должно состоять минимум из ' + minLength + ' символов');
  } else if (inputNode.validity.tooLong) {
    inputNode.setCustomValidity('Имя не должно превышать ' + maxLength + 'символов');
  } else if (inputNode.validity.valueMissing) {
    inputNode.setCustomValidity('Обязательное поле');
  }
};
/**
 * Validation for min length for Edge
 * @param {Object} evt
 */
var onUserNameInput = function (evt) {
  var minLength = evt.target.getAttribute('minlength');
  var target = evt.target;
  if (target.value.length < minLength) {
    target.setCustomValidity('Имя должно состоять минимум из ' + minLength + ' символов');
  } else {
    target.setCustomValidity('');
  }
};
/**
 * Call new validation messages if input invalid
 */
var onUserNameInputInvalid = function () {
  if (!userNameInput.validity.valid) {
    rewriteValidationMessages(userNameInput);
  } else {
    userNameInput.setCustomValidity('');
  }
};

userNameInput.addEventListener('input', onUserNameInput);
userNameInput.addEventListener('invalid', onUserNameInputInvalid);

/**
 * Count function calls, not more than array length
 * @param {number} count
 * @param {Array} array
 * @return {number}
 */
var countCalls = function (count, array) {
  count++;
  if (count > array.length - 1) {
    count = 0;
  }
  return count;
};
/**
 * Change wizard coat color by order on click
 * @param {Object} evt
 */
var onUserWizardCoatClick = function (evt) {
  var coatColor;

  coatColorClick = countCalls(coatColorClick, COAT_COLORS);
  coatColor = COAT_COLORS[coatColorClick];
  evt.target.style.fill = coatColor;
  wizardCoatInput.value = coatColor;
};
/**
 * Change wizard eyes color by order on click
 * @param {Object} evt
 */
var onUserWizardEyesClick = function (evt) {
  var eyesColor;

  eyesColorClick = countCalls(eyesColorClick, EYES_COLORS);
  eyesColor = EYES_COLORS[eyesColorClick];
  evt.target.style.fill = eyesColor;
  wizardEyesInput.value = eyesColor;
};
/**
 * Change wizard fireball color by order on click
 * @param {Object} evt
 */
var onUserWizardFireballClick = function (evt) {
  var fireballColor;

  fireballColorClick = countCalls(fireballColorClick, FIREBALL_COLORS);
  fireballColor = FIREBALL_COLORS[fireballColorClick];
  evt.target.style.backgroundColor = fireballColor;
  wizardFireballInput.value = fireballColor;
};

userWizardCoat.addEventListener('click', onUserWizardCoatClick);
userWizardEyes.addEventListener('click', onUserWizardEyesClick);
userWizardFireball.addEventListener('click', onUserWizardFireballClick);
