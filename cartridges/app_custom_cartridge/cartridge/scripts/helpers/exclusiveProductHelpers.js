'use strict';

/**
 * Function to get content from the Content Asset Body with pid and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProduct() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-product');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var URLUtils = require('dw/web/URLUtils');
    
    if (content && content.online) {
        var exclusiveProductID = content.custom.body;
        var product = ProductFactory.get({
            pid: exclusiveProductID,
            pview: 'tile'
        });
        var productUrl = URLUtils.url('Product-Show', 'pid', exclusiveProductID).relative().toString();
        var context = {
            product: product,
            productUrl: productUrl
        };
        return context;
    }
}

module.exports = {
    getExclusiveProduct: getExclusiveProduct
};
