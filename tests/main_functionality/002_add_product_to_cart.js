casper.test.begin('002 Add product to cart and check shopping cart', function suite() {


    casper.start(function () {
        this.open(base_url);
        this.test.assertHttpStatus(200);
        this.test.comment('Open home page');
    });

    casper.thenOpen(base_url + prod_url_simple, function(){
        this.test.assertHttpStatus(200);
        this.test.comment('Open simple product page ('+ prod_name_simple + ')');
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.test.assertSelectorExist('div.add-to-cart-buttons button.btn-cart', 'Add to cart btn - exist');
        this.test.assertSelectorHasText('div.product-shop div.product-name span.h1', prod_name_simple, 'Product name - exist');
        this.test.assertSelectorExist('div.product-shop div.price-box span.price', 'Product price - exist');
        this.test.assertSelectorExist('#qty', 'Qty input field - exist');
        this.test.pass('Product page have been opened successfully');
    });
    casper.thenClick('div.add-to-cart-buttons button.btn-cart', function(){
        this.waitForUrl(base_url + 'checkout/cart/');
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.test.assertHttpStatus(200);
        this.test.assertSelectorHasText('ul.messages li.success-msg', prod_name_simple +' was added to your shopping cart.', 'Success msg - exist');
        this.test.assertElementCount('#shopping-cart-table tbody tr', 1, '1 expected products have found ');
        this.test.assertExist('div.page  div.cart-totals-wrapper button.button.btn-proceed-checkout.btn-checkout', 'Checkout button - exist');
        this.test.assertExist('#discount-coupon-form', 'Discount coupon form - exist');
        this.test.assertExist('div.cart-forms div.shipping', 'ESTIMATE SHIPPING AND TAX form - exist');
        this.test.assertExist('#shopping-cart-totals-table', 'Totals table exist');
        this.test.pass('Shopping cart opened successfully')
    });

    casper.thenOpen(base_url + prod_url_conf, function(){
        this.test.assertHttpStatus(200);
        this.test.comment('Open configurable product page ('+ prod_url_conf + ')');
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.test.assertSelectorExist('div.add-to-cart-buttons button.btn-cart', 'Add to cart btn - exist');
        this.test.assertSelectorHasText('div.product-shop div.product-name span.h1', prod_name_conf, 'Product name - exist');
        this.test.assertSelectorExist('div.product-shop div.price-box span.price', 'Product price - exist');
        this.test.assertSelectorExist('#qty', 'Qty input field - exist');
        this.test.comment('Set options and add product to the cart');
        this.test.assertExist('#product-options-wrapper', 'Product options - exist');
        //              Click on white color swatch
        this.test.assertExist('#configurable_swatch_color', 'Color swatch - exist');
        this.click('#configurable_swatch_color li.option-white a span.swatch-label');
        this.test.assertSelectorExist('#configurable_swatch_color li.option-white.selected', 'Color swatch has been selected');
        //              Click on L size
        this.test.assertExist('#configurable_swatch_size', 'Side swatch - exist');
        this.test.assertSelectorExist('#configurable_swatch_size li.option-s.not-available', 'S size is not available for the white color swatch');
        this.click('#configurable_swatch_size li.option-l a span.swatch-label');
        this.test.assertSelectorExist('#configurable_swatch_size li.option-l.selected');
        //fill monogram field
        this.sendKeys('#options_3_text', 'Atwix test');
        var test_msg = this.evaluate(function() {
            return jQuery("#options_3_text").val();
        });

        this.test.assertEqual(test_msg, "Atwix test", "Found expected text within the textarea");

        //select test custom option
        this.evaluate(function(){
            //jQuery('#select_2').val(1);
            document.querySelector('#select_2').selectedValue = 1; //Value - 1 = model 1 +$59.00
        });
    });
    casper.thenClick('div.add-to-cart-buttons button.btn-cart', function(){
        this.waitForUrl(base_url + 'checkout/cart/');
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.test.assertHttpStatus(200);
        this.test.assertSelectorHasText('ul.messages li.success-msg', prod_name_conf +' was added to your shopping cart.', 'Success msg - exist');
        this.test.assertElementCount('#shopping-cart-table tbody tr', 2, '2 expected products have found ');
        this.test.assertExist('div.page  div.cart-totals-wrapper button.button.btn-proceed-checkout.btn-checkout', 'Checkout button - exist');
        this.test.assertExist('#discount-coupon-form', 'Discount coupon form - exist');
        this.test.assertExist('div.cart-forms div.shipping', 'ESTIMATE SHIPPING AND TAX form - exist');
        this.test.assertExist('#shopping-cart-totals-table', 'Totals table exist');
        this.test.pass('Shopping cart opened successfully')
    });
    casper.thenClick('#empty_cart_button', function(){
       this.test.comment('Click empty cart button');
        this.test.assertSelectorHasText('div.page div.page-title  h1', 'Shopping Cart is Empty', 'Shopping Cart is Empty');
        this.test.assertSelectorHasText('div.page div.cart-empty', 'You have no items in your shopping cart.', 'You have no items in your shopping cart.');
    });

    casper.run(function () {
            this.test.done();
        }
    )
});