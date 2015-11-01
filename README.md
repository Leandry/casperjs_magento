## Default command to run EDM functional tests
casperjs --pre=config.js test --base_url="http://magento-store.url" --email="your@email.com" tests/main_functionality/test-name.js

## Correct order of the tests
To tests were run in the correct order, it should be named in the following order: 001_some_first_test.js, 002_some_second_test.js, etc.

## Magento version
Magento ver. 1.9.2.2 with sample data