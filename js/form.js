'use strict';

window.form = (function () {
  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var userNameInput = setupForm.querySelector('.setup-user-name');
  var submitButton = setupForm.querySelector('.setup-submit');

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
      window.dialog.closePopup();
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
    window.util.isEnterEvent(evt, checkValidationSubmit);
  };

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
})();
