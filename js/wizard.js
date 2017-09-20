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
    wizardItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
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

  return {
    renderAllWizards: renderAllWizards
  };
})();
