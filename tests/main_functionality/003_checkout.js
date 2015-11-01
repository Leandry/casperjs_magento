casper.test.begin('003 Checkout - Guest - One Page checkout ', function suite() {


    casper.start(function () {
        this.open(base_url);
        this.test.assertHttpStatus(200);
        this.test.comment('Open home page');
    });
    //fast add simple product to the cart without check any additional functionality
    casper.thenOpen(base_url + 'madison-8gb-digital-media-player.html', function(){
        this.test.comment('fast add simple product to the cart without check any additional functionality');
        this.test.assertHttpStatus(200);
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.click('div.add-to-cart-buttons button.btn-cart');
        this.waitForUrl(base_url + 'checkout/cart/');

    });
    //Checkout Method
    casper.thenClick('div.cart div.cart-totals button.btn-proceed-checkout.btn-checkout', function(){
        this.test.comment('check Checkout Method step');
        this.test.assertUrlMatch(base_url+'checkout/onepage/');
        this.test.assertExist('#checkout-step-login',               'Checkout method step -                     is present');
        this.test.assertExist('#login-email',                       'E-mail in;ut field -                       is present');
        this.test.assertExist('#login-password',                    'Password input field -                     is present');
        this.test.assertExist('#login-form a.f-left',               'Forgot Pass link -                         is present');
        this.test.assertExist('#checkout-step-login button.button', 'Login submit button -                      is present');
        this.test.assertExist('input[value="guest"]',               'Checkout as Guest radio button -           is present');
        this.test.assertExist('input[value="register"]',            'Registration and Checkout radio btn -      is present');
        this.test.assertExist('#onepage-guest-register-button',     'Continue button -                          is present');
        this.evaluate(function() {
            document.getElementById('login:guest').checked = true;
            checkout.setMethod();
        });
    });
    casper.thenClick('#onepage-guest-register-button', function(){
        this.test.comment('Submit Continue as a Guest ');
        this.test.assertExist('#checkout-progress-wrapper',             'Progress bar -                             is present');
        this.waitUntilVisible('li#opc-billing', function(){
            this.test.assertExists('input[name="billing[firstname]"]',  'First name input -                         is present');
            this.test.assertExists('input[name="billing[middlename]"]', 'Middle name input -                        is present');
            this.test.assertExists('input[name="billing[lastname]"]',   'Last name input -                          is present');
            this.test.assertExists('input[name="billing[company]"]',    'Company input -                            is present');
            this.test.assertExists('input[name="billing[email]"]',      'E-mail input -                             is present');
            this.test.assertExists('input[name="billing[street][]"]',   'Street input -                             is present');
            this.test.assertExists('input[name="billing[city]"]',       'City input -                               is present');
            this.test.assertExists('select[name="billing[region_id]"]', 'State select -                             is present');
            this.test.assertExists('input[name="billing[postcode]"]',   'Zip code input -                           is present');
            this.test.assertExists('select[name="billing[country_id]"]','Country select input -                     is present');
            this.test.assertExists('input[name="billing[telephone]"]',  'Phone input -                              is present');
            this.test.assertExists('input[name="billing[fax]"]',        'Fax input -                                is present');
            this.test.assertExists('input[name="billing[use_for_shipping]"]','Ship to radio btn  -                       is present');
            this.fill('form#co-billing-form', {
                'billing[firstname]'    : login_user_firstname,
                'billing[middlename]'   : login_user_middlename,
                'billing[lastname]'     : login_user_lastname,
                'billing[company]'      : user_address_company,
                'billing[email]'        : login_user_username,
                'billing[street][]'     : user_address_street,
                'billing[city]'         : user_address_city,
                'billing[postcode]'     : user_address_postcode,
                'billing[telephone]'    : user_address_telephone,
                'billing[fax]'          : user_address_fax
            }, false);
            this.evaluate(function(){
                document.querySelector('select[name="billing[country_id]"]').selectedValue = 'US'; //value  - us = USA
                document.querySelector('select[name="billing[region_id]"]').selectedIndex = 18;//id = 18 = florida
                document.getElementById('billing:use_for_shipping_yes').checked = true;
            });
        });
    });
    casper.thenClick('#billing-buttons-container button.button', function(){
        this.test.comment('Submit Billing informationt');
        this.waitUntilVisible('#checkout-step-shipping_method', function () {
            this.test.assertExist('#s_method_flatrate_flatrate', 'Flat Rate shipping is available');
            this.evaluate(function(){
                document.getElementById('s_method_flatrate_flatrate').checked = true;
            });
        })
    });
    casper.thenClick('#shipping-method-buttons-container button.button', function () {
       this.test.comment('Submit Shipping method');
        this.waitUntilVisible('#checkout-step-payment', function(){
            this.test.assertExist('#dt_method_cashondelivery');
            //this.test.click('#payment-buttons-container > button.button');
        })
    });
    casper.thenClick('#payment-buttons-container > button.button', function () {
       this.test.comment('Submit Payment');
        this.waitUntilVisible('#checkout-step-review', function () {
            this.test.assertExists('#checkout-review-table');
            this.test.pass('Order Grand total -> ' + this.getElementInfo('#checkout-review-table tr.last td.a-right.last span.price').text);
            this.click('#review-buttons-container button.btn-checkout');
        });
    });
    casper.waitForUrl(base_url + 'checkout/onepage/success', function () {
        this.test.assertHttpStatus(200);
        this.test.assertExists('.checkout-onepage-success', 'Success page is present');
        this.test.pass('The order has been placed successfully');
        this.test.comment(this.getElementInfo('div.page > div.main-container.col1-layout  p:nth-child(4)').text)
    });


    casper.run(function () {
            this.test.done();
        }
    )
});