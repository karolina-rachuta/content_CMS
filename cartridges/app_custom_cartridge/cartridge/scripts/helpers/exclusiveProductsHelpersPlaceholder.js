'use strict';

/**
 * Function to get content from the Content Asset Body with pid and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProductsPlaceholder() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-product-placeholder');
    var exclusiveProductID = '25594785M';

    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var product = ProductFactory.get({
        pid: exclusiveProductID,
        pview: 'tile'
    });

    var StringUtils = require('dw/util/StringUtils');
    var exclusiveProduct = StringUtils.format(content.custom.body.markup, product.productName, product.shortDescription, product.price.sales.formatted);
    return exclusiveProduct;
}

module.exports = {
    getExclusiveProductsPlaceholder: getExclusiveProductsPlaceholder
};
