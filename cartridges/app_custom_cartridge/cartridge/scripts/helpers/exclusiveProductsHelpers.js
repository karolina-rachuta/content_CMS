'use strict';

/**
 * Function to get content from the Content Asset Body with pids and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProducts() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-products');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var URLUtils = require('dw/web/URLUtils');
    var newMap = new HashMap();

    if (content && content.online) {
        var exclusiveProductsIDs = content.custom.body.markup;
        var pattern = /\{([^}]+)\}/g;
        var products= [];
        var placeholders = exclusiveProductsIDs.match(pattern);
        placeholders.forEach((placeholder) => {
            var productID = placeholder.slice(1, -1)
            var product = ProductFactory.get({
                pid: productID,
                pview: 'tile'
            });
   
            newMap.product = product;
            newMap.productUrl = URLUtils.abs('Product-Show', 'pid', productID).toString();
            var productTileTemplate = new Template('product/emailProductTile').render(newMap).text;
            exclusiveProductsIDs = exclusiveProductsIDs.replace(placeholder, productTileTemplate);
        });

    return exclusiveProductsIDs
    }

};


module.exports = {
    getExclusiveProducts: getExclusiveProducts
};

