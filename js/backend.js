'use strict';

window.backend = (function () {
  var SERVER_URL = 'https://js.dump.academy/code-and-magick';
  var DATA_URL_ENDING = '/data';
  var REQUEST_TIMEOUT = 10000;

  /**
   *Set up new xhr options
   * @param {Function} onLoad
   * @param {Function}onError
   * @return {XMLHttpRequest}
   */
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Внутренняя ошибка сервера';
          break;

        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    return xhr;
  };

  /**
   * Get data from server
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var load = function (onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('GET', SERVER_URL + DATA_URL_ENDING);
    xhr.send();
  };

  /**
   * Post data to server
   * @param {Object} data
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var save = function (data, onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  /**
   * Show error in new div
   * @param {string} errorMessage
   */
  var showError = function (errorMessage) {
    var errorContainer = document.createElement('div');
    errorContainer.classList.add('error-message');
    errorContainer.textContent = errorMessage;

    var containerClose = document.createElement('a');
    containerClose.href = '#';
    containerClose.classList.add('error-message__close');

    var closeButton = document.createElement('span');
    closeButton.textContent = '×';
    containerClose.appendChild(closeButton);
    errorContainer.appendChild(containerClose);
    document.body.appendChild(errorContainer);

    var closeErrorContainer = function (evt) {
      evt.preventDefault();
      document.body.removeChild(errorContainer);

      containerClose.removeEventListener('click', onContainerCloseButtonClick);
      containerClose.removeEventListener('keydown', onContainerCloseButtonEnterPress);
    };

    var onContainerCloseButtonClick = function (evt) {
      closeErrorContainer(evt);
    };

    var onContainerCloseButtonEnterPress = function (evt) {
      window.util.isEnterEvent(evt, closeErrorContainer, evt);
    };

    containerClose.addEventListener('click', onContainerCloseButtonClick);
    containerClose.addEventListener('keydown', onContainerCloseButtonEnterPress);
  };

  return {
    load: load,
    save: save,
    showError: showError
  };
})();
