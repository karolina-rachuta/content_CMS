'use strict';

/**
 * Get list price for a product
 * @param {string} productID- Product ID
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @property {string} apiProduct.ID - Variables passed
 * @property {string} apiProduct.masterProduct.ID - Variables passed
 * @return {string} - Content Asset Body
 */
function getShippingInformation(productID) {
    var ContentMgr = require('dw/content/ContentMgr');
    var shippingContentAsset = 'shipping-info-' + productID;
    var shippingContent = ContentMgr.getContent(shippingContentAsset);
    if (shippingContent && shippingContent.online) {
        return shippingContent.custom.body;
    } else {
        var genericContentAsset = 'shipping-info-generic';
        var genericContent = ContentMgr.getContent(genericContentAsset);
        return genericContent.custom.body;
    }
}

module.exports = function (object, apiProduct) {
    var productID = apiProduct.master ? apiProduct.ID : apiProduct.masterProduct.ID;
    Object.defineProperty(object, 'shippingInfo', {
        enumerable: true,
        value: getShippingInformation(productID)
    });
};
