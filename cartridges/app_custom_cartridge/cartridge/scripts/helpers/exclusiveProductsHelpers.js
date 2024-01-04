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

    var newMap = new HashMap();

    if (content && content.online) {
        var exclusiveProductsIDs = content.custom.body.markup;
        var pattern = /\{([^}]+)\}/g;
        var products= [];
        var placeholders = exclusiveProductsIDs.match(pattern); //[{pid1},{pid2}}]
        placeholders.forEach((placeholder) => {
            var productID = placeholder.slice(1, -1)
            var product = ProductFactory.get({
                pid: productID,
                pview: 'tile'
            });

            // newMap.put(productID, product);
             newMap.product = JSON.stringify(product);

            var productTileTemplate = new Template('product/productTile').render(newMap).text;
            exclusiveProductsIDs = exclusiveProductsIDs.replace(placeholder, productTileTemplate);
        }); // [pid1, pid2]

    var eproducts = {
    products: products,
    exclusiveProductsIDs: exclusiveProductsIDs
    }
    return eproducts
    }

};


module.exports = {
    getExclusiveProducts: getExclusiveProducts
};

