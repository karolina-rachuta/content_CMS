'use strict';



function getShippingInformation(productID) {
    var ContentMgr = require('dw/content/ContentMgr');
    var shippingContentAsset = 'shipping-info-' + productID;
    var genericContentAsset = 'shipping-info-generic';
    var shippingContent = ContentMgr.getContent(shippingContentAsset);
    if (shippingContentAsset && shippingContentAsset.online) {
        return shippingContent.custom.body;
    } else {
        return genericContentAsset.custom.body;
    }
 // checks: if shipping conent.online if custom.body then asignt to variable // not avaiable get generiv conetn asset and aisgn it to shipping content
}

module.exports = function (object, apiProduct) {
    var productID = apiProduct.master ? apiProduct.ID : apiProduct.masterProduct.ID;
    Object.defineProperty(object, 'shippingInfo', {
        enumerable: true,
        value: getShippingInformation(productID)
    });
};
