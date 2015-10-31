## Default command to run EDM functional tests
casperjs --pre=config.js test --base_url="http://store.url" tests/main_functionality/

## Correct order of the tests
To tests were run in the correct order, it should be named in the following order: 001_some_first_test.js, 002_some_second_test.js, etc.

