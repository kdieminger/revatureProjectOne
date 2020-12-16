# Testing
Writing code is fine right up until you throw it production and a user puts in something you didn't think of and everything goes down.

Test early, test often.
In fact test before you write your code
## Test Driven Development (TDD)
1. Write a test
2. Run the test. Test fails.
3. Write code.
4. Run the test. If it succeeds, hooray, otherwise, go to 3.

You know what a function or class needs to be capable of, so in TDD, you write the function stubs or method stubs and then you go and write the test that, if it passes, signifies that the code is correct.

## Unit Testing

Testing the smallest "unit" or section of code to ensure that it works correctly. Generally this means every function in JavaScript. A larger unit might be a module, which is more difficult to test.

### Expectations
We expect the code to behave in a specific way under certain conditions. If the code does not behave in that way, the test fails.

### Assertions
We can assert that the code behaves in a specific manner. If it does not, the test fails.


### Test Coverage
Many ways to measure coverage:
* Function coverage: Every function is tested
* Line Coverage: Every line of code is tested
* Statements coverage: Every code statemnet is tested

## Jest
A unit-testing framework that attempts to be as human-readable as possible. As such many of it's functions are named in such a way, that when chained together, they form sentences.

### Setup
1. Navigate to the project we wish to test.
2. Install Jest: `npm install --save-dev jest`
3. Install Babel Plugin to allow Jest to use import: `npm install --save-dev @babel/plugin-transform-modules-commonjs`
4. 