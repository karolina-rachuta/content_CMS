'use strict';

var decorators = require('*/cartridge/models/product/decorators/index');
var base = module.superModule;
/**
 * Decorate product with full product information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function fullProduct(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);
    decorators.shippingInfo(product, apiProduct);
    return product;
};
