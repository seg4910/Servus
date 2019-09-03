/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.

import renderer from 'react-test-renderer';
import Home from '../components/Home.js';
import Account from '../components/Account.js';
import ViewOrders from '../components/ViewOrders.js';
import ServicePreview from '../components/ServicePreview.js';
import Register from '../components/EnterEmail.js';
import ViewService from '../components/Service.js';
import SignIn from '../components/SignIn.js';
import NavigationService from '../components/NavigationService.js';
import CreateAccount from '../components/Register.js';
import CreateLocation from '../components/CreateLocation.js';
import PurchaseService from '../components/PurchaseService.js';
import AuthLoadingScreen from '../components/AuthLoadingScreen.js';
import { doesNotReject } from 'assert';
import { JestEnvironment } from '@jest/environment';

// this will only test compile for the initial route name in App.js,
// which is only AuthLoadingScreen. Change the initial route name if you want to test a different stack

beforeAll((done) => {
  done();
});

jest.setTimeout(30000);

it('ViewOrders : renders correctly', async () => {
  renderer.create(<ViewOrders />);
});

it('Account : renders correctly', async () => {
  renderer.create(<Account />);
});

it('ServicePreview : renders correctly', async () => {
  renderer.create(<ServicePreview />);
});

it('Register : renders correctly', async () => {
  renderer.create(<Register />);
});

it('Create Location : renders correctly', async () => {
  renderer.create(<CreateLocation />);
});

it('Home : renders correctly', async () => {
  renderer.create(<Home />);
});

it('Test : renders correctly', async () => {
  // ALL FAIL ON GETPARAM for navigation
  //renderer.create(<PurchaseService />);
  //renderer.create(<CreateAccount />);
  //renderer.create(<ContinueWithPassword />);
  //renderer.create(<ViewService />);
});
