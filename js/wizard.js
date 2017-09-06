'use strict';

window.wizard = (function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarWizardContent = similarWizardTemplate.content ? similarWizardTemplate.content : similarWizardTemplate;

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

  var setup = document.querySelector('.setup');
  var userWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var userWizard = userWizardAppearance.querySelector('.setup-wizard');
  var userWizardCoat = userWizard.querySelector('.wizard-coat');
  var userWizardEyes = userWizard.querySelector('.wizard-eyes');
  var userWizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizardCoatInput = userWizardAppearance.querySelector('input[name=coat-color]');
  var wizardEyesInput = userWizardAppearance.querySelector('input[name=eyes-color]');
  var wizardFireballInput = userWizardFireball.querySelector('input[name=fireball-color]');

  // for click count
  var coatColorClick = 0;
  var eyesColorClick = 0;
  var fireballColorClick = 0;
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

    coatColorClick = countCalls(coatColorClick, window.data.wizardsColors.coat);
    coatColor = window.data.wizardsColors.coat[coatColorClick];
    evt.target.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  };
  /**
   * Change wizard eyes color by order on click
   * @param {Object} evt
   */
  var onUserWizardEyesClick = function (evt) {
    var eyesColor;

    eyesColorClick = countCalls(eyesColorClick, window.data.wizardsColors.eyes);
    eyesColor = window.data.wizardsColors.eyes[eyesColorClick];
    evt.target.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  };
  /**
   * Change wizard fireball color by order on click
   * @param {Object} evt
   */
  var onUserWizardFireballClick = function (evt) {
    var fireballColor;

    fireballColorClick = countCalls(fireballColorClick, window.data.wizardsColors.fireball);
    fireballColor = window.data.wizardsColors.fireball[fireballColorClick];
    evt.target.style.backgroundColor = fireballColor;
    wizardFireballInput.value = fireballColor;
  };

  userWizardCoat.addEventListener('click', onUserWizardCoatClick);
  userWizardEyes.addEventListener('click', onUserWizardEyesClick);
  userWizardFireball.addEventListener('click', onUserWizardFireballClick);

  return {
    renderAllWizards: renderAllWizards
  };
})();
