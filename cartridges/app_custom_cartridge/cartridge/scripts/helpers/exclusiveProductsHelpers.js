'use strict';

/**
 * Function to get content from the Content Asset Body with pids and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProducts() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-products');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    
    if (content && content.online) {
        var exclusiveProductsIDs = content.custom.body.markup;
        var pattern = /\{([^}]+)\}/g;
        var products= [];
        var matches = exclusiveProductsIDs.match(pattern);
        var productIDs = matches.map((match) => match.slice(1, -1));
        var productID;
        var products = [];
        for (var i = 0; i < productIDs.length; i++) {
            productID = productIDs[i];
            var product = ProductFactory.get({
                pid: productID,
                pview: 'tile'
            });
            products.push(product);
        }
    }

    return products;
}


module.exports = {
    getExclusiveProducts: getExclusiveProducts
};
