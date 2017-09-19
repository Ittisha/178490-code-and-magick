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

  /**
   * Fill svg
   * @param {Node} element
   * @param {string} color
   */
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  /**
   * Change background
   * @param {Node} element
   * @param {string} color
   */
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  /**
   * Change input value
   * @param {Node} element
   * @param {string} color
   */
  var changeInputValue = function (element, color) {
    element.value = color;
  };

  /**
   * Change wizard coat color by order on click
   * @param {Object} evt
   */
  var onUserWizardCoatClick = function (evt) {
    window.colorizeElement.colorize(evt.target, window.data.wizardsColors.coat,
        fillElement);
    window.colorizeElement.fillColorInput(wizardCoatInput, window.data.wizardsColors.coat,
        changeInputValue);
  };

  /**
   * Change wizard eyes color by order on click
   * @param {Object} evt
   */
  var onUserWizardEyesClick = function (evt) {
    window.colorizeElement.colorize(evt.target, window.data.wizardsColors.eyes,
        fillElement);
    window.colorizeElement.fillColorInput(wizardEyesInput, window.data.wizardsColors.eyes,
        changeInputValue);
  };

  /**
   * Change wizard fireball color by order on click
   * @param {Object} evt
   */
  var onUserWizardFireballClick = function (evt) {

    window.colorizeElement.colorize(evt.target, window.data.wizardsColors.fireball,
        changeElementBackground);
    window.colorizeElement.fillColorInput(wizardFireballInput, window.data.wizardsColors.fireball,
        changeInputValue);

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
