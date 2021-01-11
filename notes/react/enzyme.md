# Enzyme
Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

## Setup
* `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17 @types/enzyme`
* Add the following to `setupTests.ts`
```JavaScript
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter() })
```

## Testing
Enzyme works with many testing libraries, including Chai, Jasmine, and Jest.