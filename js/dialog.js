'use strict';

window.dialog = (function () {
  var setup = document.querySelector('.setup');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarSetup = setup.querySelector('.setup-similar');
  var dialogHandle = setup.querySelector('.upload');

  var showSimilarWizards = function (data) {
    var fourUniqueWizards = [];
    var wizardsCopy = data.slice();

    for (var i = 0; i < 4; i++) {
      fourUniqueWizards.push(window.util.getUniqueArrayItem(wizardsCopy));
    }

    window.wizard.renderAllWizards(fourUniqueWizards, similarList);
  };
  window.backend.load(showSimilarWizards, window.backend.showError);
  window.util.makeVisible(similarSetup);

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

  var setupClose = setup.querySelector('.setup-close');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var userNameInput = setupForm.querySelector('.setup-user-name');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /**
   * Reset setup dialog position
   */
  var resetDialogPosition = function () {
    setup.style.top = '';
    setup.style.left = '';
  };

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
    resetDialogPosition();
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

