/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.

import renderer from 'react-test-renderer';
import Home from '../components/Home.js';
import ViewAccount from '../components/ViewAccount.js';
import ViewOrders from '../components/ViewOrders.js';
import ServicePreview from '../components/ServicePreview.js';
import Register from '../components/Register.js';
import ViewService from '../components/ViewService.js';
import ContinueWithPassword from '../components/ContinueWithPassword.js';
import NavigationService from '../components/NavigationService.js';
import CreateAccount from '../components/CreateAccount.js';
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

it('ViewAccount : renders correctly', async () => {
  renderer.create(<ViewAccount />);
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