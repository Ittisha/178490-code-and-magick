'use strict';

window.setup = (function () {
  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarSetup = setup.querySelector('.setup-similar');

  var wizardsList = window.data.createAvailableWizards();
  window.wizard.renderAllWizards(wizardsList, similarList);
  window.util.makeVisible(similarSetup);

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

  var setupClose = setup.querySelector('.setup-close');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var userNameInput = setupForm.querySelector('.setup-user-name');


  /**
   * Close popup on ESC press if name input isn't focused
   * @param {Object} evt
   */
  var onPopupEscPress = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };
  /**
   * Open popup
   */
  var openPopup = function () {
    window.util.makeVisible(setup);
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
    window.util.isEnterEvent(evt, openPopup);
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
    window.util.isEnterEvent(evt, closePopup);
  };


  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpenIcon.addEventListener('keydown', onSetupOpenEnterPress);

  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);

  return {
    closePopup: closePopup
  };
})();

