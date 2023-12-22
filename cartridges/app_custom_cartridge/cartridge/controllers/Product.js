'use strict';

/**
 * @namespace Product
 */

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.extend(module.superModule);
/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

  /**
  * Product-Show : This endpoint is called to show the details of the selected product
  * @name Base/Product-Show
  * @function
  * @memberof Product
  * @param {middleware} - cache.applyPromotionSensitiveCache
  * @param {middleware} - consentTracking.consent
  * @param {querystringparameter} - pid - Product ID
  * @param {category} - non-sensitive
  * @param {renders} - isml
  * @param {serverfunction} - get
  */
server.append('Show', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var shippingContent = ContentMgr.getContent('unique-info-shipping');
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
    var productID = showProductPageHelperResult.product.id;
    var product = dw.catalog.ProductMgr.getProduct(productID);
    var shippingModel = dw.order.ShippingMgr.getProductShippingModel(product);
    var applicableShippingMethods = shippingModel.getApplicableShippingMethods();

    var iterator = applicableShippingMethods.iterator();
    var item;
    var items = [];
    while (iterator.hasNext()) {
        item = iterator.next();
        items.push(item.description);
    }

    // var item;
    // var items = [];
    // for (var i = 0; i < applicableShippingMethods.length; i++) {
    //     item = applicableShippingMethods[i];
    //     items.push(item.description);
    // }
    var shippingDescription = item.description;
    

    res.render('product/productDetails', {
        shippingContent: shippingContent,
        shippingDescription: shippingDescription,
        items: items
    });

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
