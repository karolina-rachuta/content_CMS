'use strict';

var Resource = require('dw/web/Resource');
var Site = require('dw/system/Site');
var base = module.superModule;


/**
 * Sends a confirmation to the current user
 * @param {dw.order.Order} order - The current user's order
 * @param {string} locale - the current request's locale id
 * @returns {void}
 */
function sendConfirmationEmail(order, locale) {
    var OrderModel = require('*/cartridge/models/order');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Locale = require('dw/util/Locale');
    var product = require('*/cartridge/scripts/helpers/exclusiveProductHelpers');
    var products = require('*/cartridge/scripts/helpers/exclusiveProductsHelpers');

    var currentLocale = Locale.getLocale(locale);

    var orderModel = new OrderModel(order, { countryCode: currentLocale.country, containerView: 'order' });

    var orderObject = {
        order: orderModel,
        product: product.getExclusiveProduct(),
        products: products.getExclusiveProducts()
    };

    var emailObj = {
        to: order.customerEmail,
        subject: Resource.msg('subject.order.confirmation.email', 'order', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.orderConfirmation
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/confirmationEmail', orderObject);
}


base.sendConfirmationEmail = sendConfirmationEmail;

module.exports = base;
