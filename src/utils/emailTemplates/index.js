/**
 * Exportación centralizada de todos los templates de email
 */

const paymentConfirmationTemplate = require('./paymentConfirmationTemplate');
const paymentLinkTemplate = require('./paymentLinkTemplate');

module.exports = {
  paymentConfirmationTemplate,
  paymentLinkTemplate
};