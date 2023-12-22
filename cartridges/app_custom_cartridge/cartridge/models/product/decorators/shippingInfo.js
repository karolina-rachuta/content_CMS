'use strict';



function getShippingInformation(productID) {
    var ContentMgr = require('dw/content/ContentMgr');
    var shippingContentAsset = 'shipping-info-' + productID;
    var shippingContent = ContentMgr.getContent(shippingContentAsset);
 // checks: if shipping conent.online if custom.body then asignt to variable // not avaiable get generiv conetn asset and aisgn it to shipping content

    return shippingContent.custom.body;
}
module.exports = function (object, apiProduct) {
    var productID = apiProduct.master ? apiProduct.ID : apiProduct.masterProduct.ID;
    Object.defineProperty(object, 'shippingInfo', {
        enumerable: true,
        value: getShippingInformation(productID)
    });
};
