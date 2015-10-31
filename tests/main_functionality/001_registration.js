casper.test.begin('001 Registration new customer ', function suite() {


    casper.start(function () {
        this.open(base_url);
        this.test.assertHttpStatus(200);
        this.test.comment('Open home page');
    });
    casper.thenOpen(base_url +'customer/account/create/', function(){
        this.test.comment('Open and check registration customer page');
        this.test.assertHttpStatus(200);
        this.test.assertUrlMatch(base_url +'customer/account/create/', 'You on the registration page');
        this.test.assertSelectorHasText('div.page-title', 'Create an Account', 'Page title - exist');
        this.test.comment('Check form input fields');
        this.test.assertExist('#firstname', 'First name input - exist');
        this.test.assertExist('#lastname', 'Last name input - exist');
        this.test.assertExist('#middlename', 'Middle name input - exist');
        this.test.assertExist('#password', 'Password input - exist');
        this.test.assertExist('#confirmation', 'Password confirmation name input - exist');
        this.test.assertExist('#email_address', 'E-mail input - exist');
        this.test.assertExist('#is_subscribed', 'Subscription checkbox - exist');
        this.test.assertExist('#form-validate div.buttons-set button.button', 'Submit button - exist');
        this.test.pass('Opened and checked registration customer page')
    });
    casper.then(function(){
        this.test.comment('Fill and submit registration form');
        this.fill('form#form-validate', {
            'firstname': login_user_firstname,
            'middlename': login_user_middlename,
            'lastname': login_user_lastname,
            'email': login_user_username,
            'password': login_user_password,
            'confirmation': login_user_password,
            'is_subscribed': true
        }, false);
        this.click('#form-validate div.buttons-set button.button');
        this.wait(400);
    });
    casper.then(function(){
        try {

            this.test.assertSelectorDoesntHaveText('li.error-msg span', 'There is already an account with this email address. If you are sure that it is your email address, ');

        }
        catch(e){
            casper.die(this.getElementInfo('li.error-msg span').text);
        }
        this.waitForUrl(base_url + 'customer/account/index/');
        this.test.pass('Fill and submit registration form');
    });

    casper.then(function(){
        this.test.comment('Check successful registration and Logout');
        this.test.assertHttpStatus(200);
        this.test.assertUrlMatch(base_url + 'customer/account/index/', 'You on the My account page');
        this.test.assertSelectorHasText('div.dashboard li.success-msg', 'Thank you for registering with Madison Island.', 'Success msg - exist');
        this.test.pass('Registration successful')
    });

    casper.then(function(){
        this.test.comment('Check customer logout');
        this.test.assertSelectorHasText('#header-account div.links', 'Log Out', 'Log Out link - exist');
        this.clickLabel('Log Out', 'a');
        this.waitForUrl(base_url + 'customer/account/logoutSuccess/');
    });
    casper.then(function(){
        this.test.assertHttpStatus(200);
        this.test.assertUrlMatch(base_url + 'customer/account/logoutSuccess/', 'You on the logout success page');
        this.test.assertSelectorHasText('div.col-main div.page-title', 'You are now logged out', 'You are now logged out');
        this.test.assertSelectorHasText('div.col-main p','You have logged out and will be redirected to our homepage in 5 seconds.', 'You have logged out and will be redirected to our homepage in 5 seconds.')
        this.test.pass('You have successfully logged out')
    });



    casper.run(function () {
            this.test.done();
        }
    )
});