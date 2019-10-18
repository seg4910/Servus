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
it('Component Test: EnterEmail: renders correctly', () => {
  renderer.create(<EnterEmail/>);
});
it('Component Test: SignIn: renders correctly', () => {
  // TODO: Figure out how to pass navigation instance for testing
  //renderer.create(<SignIn/>);
});
it('Component Test: Regsiter: renders correctly', () => {
  // TODO: Figure out how to pass navigation instance for testing
  //renderer.create(<Register/>);
});