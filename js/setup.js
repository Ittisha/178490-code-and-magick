'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var userWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var userWizard = userWizardAppearance.querySelector('.setup-wizard');
  var userWizardCoat = userWizard.querySelector('.wizard-coat');
  var userWizardEyes = userWizard.querySelector('.wizard-eyes');
  var userWizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizardCoatInput = userWizardAppearance.querySelector('input[name=coat-color]');
  var wizardEyesInput = userWizardAppearance.querySelector('input[name=eyes-color]');
  var wizardFireballInput = userWizardFireball.querySelector('input[name=fireball-color]');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');


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

  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });


  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = 'none';
    if (!evt.target.children.length && evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.appendChild(draggedItem);
    }
    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    if (!evt.target.children.length && evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style.backgroundColor = 'yellow';
      evt.target.style.outline = '2px solid red';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = 'none';
    evt.preventDefault();
  });
})();
