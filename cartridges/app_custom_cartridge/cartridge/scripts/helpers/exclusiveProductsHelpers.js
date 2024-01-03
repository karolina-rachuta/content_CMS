'use strict';

/**
 * Function to get content from the Content Asset Body with pid and to get the product base on its id from Product Factory - productTiles.js
 */
function getExclusiveProducts() {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-product');
    var exclusiveProductID = content.custom.body;
    // var Product = require('dw/catalog/Product');
    // var getProduct = Product.getProduct(exclusiveProductID);
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var product = ProductFactory.get({
        pid: exclusiveProductID,
        pview: 'tile'
    });

    // var product = require('*/cartridge/models/product/productTile.js');
    // var StringUtils = require('dw/util/StringUtils');
    // var exclusiveProduct = StringUtils.format(content.custom.body.markup, product.id, product.productName, product.shortDescription);
    return product;
}

module.exports = {
    getExclusiveProducts: getExclusiveProducts
};
