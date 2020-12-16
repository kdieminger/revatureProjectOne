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

### Independence
Unit tests should be independent from one another. If one test alters the state of the program in such a way that another test passes, we can't truly say that the second test passed.


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
4. Set up babel, create a file `.babelrc` and add the following:
```json
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
```
5. Add jest script to `package.json`
6. If it is a node project, add: 
   ```json
   "jest":{
    "testEnvironment": "jest-environment-node"
    },
    
    ```
   to `package.json`


### Jest Coverage Report
`npx jest --coverage`

### Definitions
* `expect` - Asserts that something is as we expect.
* `test` - A function that runs a test
* `beforeEach` - A function that runs before each test.
* `afterEach` - A function that runs after each test.
* `beforeAll` - A function tat runs before all tests.
* `afterAll` - A function that runs after all tests.