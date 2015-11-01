// Configuration and some usefull methods

/**
 * Debug/Verbose
 * ----------------------------------------------------------------------------
 */
var debug_mode = !!casper.cli.get('verbose');
if (debug_mode) {
    debug_mode = true;
    casper.options.verbose = true;
    casper.options.logLevel = 'debug';
}
var colorizer = require('colorizer').create('Colorizer');

/**
 * The view
 * ----------------------------------------------------------------------------
 */

// The viewport size
casper.options.viewportSize = {
    width: 1200,
    height: 900
};
casper.options.waitTimeout = 15000;
/**
 * The HTTP responses
 * ----------------------------------------------------------------------------
 */
casper.options.httpStatusHandlers = {
    200:  function(self, resource) {
        this.echo(resource.url + " is OK (200)", "INFO");
    },
    400:  function(self, resource) {
        this.echo(resource.url + " is nok (400)", "INFO");
    },
    404: function(self, resource) {
        this.echo("Resource at " + resource.url + " not found (404)", "COMMENT");
    },
    302: function(self, resource) {
        this.echo(resource.url + " has been redirected (302)", "INFO");
    }
};

/**
 * Login credentials
 * ----------------------------------------------------------------------------
 */
var login_user_firstname    = 'FirstName';
var login_user_lastname     = 'LastName';
var login_user_middlename   = 'MiddleName';
var login_user_username     = casper.cli.get("email");
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login_user_username))
{
    login_user_username
}
else{
    casper.die('Please enter valid email or add email to command line  --email="yourmail@example.com" ');
}

var login_user_password     = 'PassWord';
var login_user_password_bad = "badpassword";

var user_address_company    = 'Atwix';
var user_address_street     = '16243 Ivy Lake Dr.';
var user_address_city       = 'Odessa';
var user_address_region     = 'Florida';
var user_address_postcode   = '33556';
var user_address_telephone  = '1234567890';
var user_address_fax        = '12345678';
var user_address_coundry    = 'United States';

/**
 * Product credentials
 * ----------------------------------------------------------------------------
 */
var prod_url_simple = 'madison-overear-headphones.html';
var prod_name_simple = 'Madison Overear Headphones';
var prod_url_conf ='men/new-arrivals/chelsea-tee.html';
var prod_name_conf = 'Chelsea Tee';


 /* Utils, XPath, FileSystem
 * ----------------------------------------------------------------------------
 */
var utils   = require('utils');
var x       = casper.selectXPath;
var fs      = require('fs');


/**
 * URLs
 * ----------------------------------------------------------------------------
 */
var base_url = casper.cli.get("base_url");
if (!/\/$/.test(base_url)) {
    // We haven't trailing slash: add it
    base_url = base_url + '/';
}


// Done for the test file
// ----------------------------------------------------------------------------
casper.test.done();

/**
 * Tear down and set up
 * ----------------------------------------------------------------------------
 */

// Tear down:
// - clear cookies
// - reset captures counter
casper.test.tearDown(function () {

/*    // Clear cookies
    casper.clearCookies();*/

    // Reset captures counter
    captures_counter = 0;
});

// Set up: nothing
casper.test.setUp(function () {});

/**
 * Steps
 * ----------------------------------------------------------------------------
 */

casper.on("load.failed", function() {
    casper.capturePage();
});

casper.on("load.finished", function() {
    casper.printTitle();
    casper.capturePage();
});

casper.on("fill", function() {
    casper.capturePage();
});

casper.on("mouse.down", function() {
    casper.capturePage();
});

casper.on("mouse.move", function() {
    casper.capturePage();
});

casper.on("mouse.move", function() {
    casper.capturePage();
});

casper.on("step.complete", function() {
    casper.capturePage();
});

casper.on("step.error", function() {
    casper.capturePage('error');
});

casper.on("http.status.500", function() {
    casper.capturePage('500');
});

casper.on("http.status.404", function() {
    casper.capturePage('404');
});

/**
 * Tools and cool methods :')
 * ----------------------------------------------------------------------------
 */

// Clear cookies
casper.clearCookies = function () {
    casper.test.info("Clear cookies");
    casper.page.clearCookies();
};


// Print the current page title
casper.printTitle = function () {
    this.echo('### ' + casper.getTitle() + ' ###', 'INFO_BAR');
};

// Capture the current test page
var captures_counter = 0;
casper.capturePage = function (debug_name) {
    var directory = 'captures/' + casper.test.currentSuite.name;
    if (captures_counter > 0) {
        var previous = directory + '/step-' + (captures_counter-1) + '.jpg';
        if (debug_name) {
            var current = directory + '/step-' + captures_counter + '-' + debug_name + '.jpg';
        } else {
            var current = directory + '/step-' + captures_counter + '.jpg';
        }
        casper.capture(current);

        // If previous is same as current (and no debug_name), remove current
        if (!debug_name && fs.isFile(previous) && fs.read(current) === fs.read(previous) && fs.isFile(current)) {
            fs.remove(current);
            captures_counter--;
            casper.log('Capture removed because same as previous', 'warning');
        }
    } else {
        // We remove the directory to cleanup
        fs.removeTree(directory);
    }
    captures_counter++;
};