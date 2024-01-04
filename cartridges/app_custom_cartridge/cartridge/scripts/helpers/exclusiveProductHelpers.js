'use strict';

/**
 * Function to get content from the Content Asset Body with pid and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProduct() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-product');
    var exclusiveProductID = content.custom.body;
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var product = ProductFactory.get({
        pid: exclusiveProductID,
        pview: 'tile'
    });
    return product;
}

module.exports = {
    getExclusiveProduct: getExclusiveProduct
};
