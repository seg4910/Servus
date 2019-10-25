import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import EnterEmailView from '../components/views/authViews/EnterEmailView';
import RegisterView from '../components/views/authViews/RegisterView';
import SignInView from '../components/views/authViews/SignInView';

import EnterEmail from '../components/EnterEmail';
import SignIn from '../components/SignIn';
import Register from '../components/Register';

// UI Tests
it('UI Test: EnterEmailView: snapshot renders correctly', () => {
  const tree = renderer
    .create(<EnterEmailView/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('UI Test: RegisterView: snapshot renders correctly', () => {
  const tree = renderer
    .create(<RegisterView/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('UI Test: SignInView: snapshot renders correctly', () => {
  const tree = renderer
    .create(<SignInView/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});




// Component Tests
// Enter Email
it('Component Test: EnterEmail: renders correctly', () => {
  renderer.create(<EnterEmail/>);
});

describe("SignIn Test", () => {
  const navigation = {
    navigate: Function.prototype,
    setParams: Function.prototype,
    dispatch: Function.prototype,
    getParam: (param, defaultValue) => {
      return defaultValue
    },
  }
  it ('Component Test: SignIn: renders correctly', () => {
    renderer.create(<SignIn navigation={navigation} />);   // no compile-time error
  });
});


// Register
describe("Register Test", () => {
  const navigation = {
    navigate: Function.prototype,
    setParams: Function.prototype,
    dispatch: Function.prototype,
    getParam: (param, defaultValue) => {
      return defaultValue
    },
  }
  it ('Component Test: Register: renders correctly', () => {
    renderer.create(<Register navigation={navigation} />);   // no compile-time error
  });
});


// EnterEmail
describe("EnterEmail Test", () => {
  const navigation = {
    navigate: Function.prototype,
    setParams: Function.prototype,
    dispatch: Function.prototype,
    getParam: (param, defaultValue) => {
      return defaultValue
    },
  }
  it ('Component Test: EnterEmail: renders correctly', () => {
    renderer.create(<EnterEmail navigation={navigation} />);   // no compile-time error
  });
});