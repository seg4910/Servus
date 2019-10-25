import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AccountView from '../components/views/appViews/AccountView';
import CategoryCard from '../components/views/appViews/CategoryCard';
import HomeView from '../components/views/appViews/HomeView';
import ServiceCard from '../components/views/appViews/ServiceCard';
import ServiceView from '../components/views/appViews/ServiceView';

import Account from '../components/Account';
import ChangePassword from '../components/ChangePassword';
import EditAccountInfo from '../components/EditAccountInfo';
import OrderDetails from '../components/OrderDetails';
import ReviewOrder from '../components/ReviewOrder';
import ScheduleService from '../components/ScheduleService';
import Service from '../components/Service';
import ServiceAvailability from '../components/ServiceAvailability';
import ServiceOrdered from '../components/ServiceOrdered';
import ServicePreview from '../components/ServicePreview';
import SignIn from '../components/SignIn';
import ViewOrders from '../components/ViewOrders';

const navigation = {
  navigate: Function.prototype,
  setParams: Function.prototype,
  dispatch: Function.prototype,
  getParam: (param, defaultValue) => {
    return defaultValue
  },
}

// UI Tests
it('UI Test: AccountView: snapshot renders correctly', () => {
  // TODO: react-native-image-picker is making this fail
       const tree = renderer
      .create(<AccountView/>)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
}); 

it('UI Test: CategoryCard: snapshot renders correctly', () => {
    const tree = renderer
      .create(<CategoryCard/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
it('UI Test: HomeView: snapshot renders correctly', () => {
  // TODO: Figure out how to pass navigation instance for testing
    const tree = renderer
      .create(<HomeView navigation={navigation}/>)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
});
it('UI Test: ServiceCard: snapshot renders correctly', () => {
    const tree = renderer
      .create(<ServiceCard/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
it('UI Test: ServiceView: snapshot renders correctly', () => {
    const tree = renderer
      .create(<ServiceView/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});

// COMPONENT Tests
describe("Account Test", () => {
  it ('Component Test: SignIn: renders correctly', () => {
    renderer.create(<Account navigation={navigation} />);   // no compile-time error
  }); 
});

describe("Change Password", () => {
  it ('Component Test: SignIn: renders correctly', () => {
    renderer.create(<ChangePassword />); 
  });
});

describe("Edit Account Info", () => {
  it ('Component Test: SignIn: renders correctly', () => {
    renderer.create(<EditAccountInfo />); 
  });
});

describe("Order Details", () => {
  it ('Component Test: OrderDetails: renders correctly', () => {
    renderer.create(<OrderDetails navigation={navigation}/>); 
  });
});

describe("Review Order", () => {
   it ('Component Test: ReviewOrder: renders correctly', () => {
    renderer.create(<ReviewOrder navigation={navigation}/>); 
  }); 
});

describe("Schedule Service", () => {
  it ('Component Test: ScheduleService: renders correctly', () => {
   renderer.create(<ScheduleService navigation={navigation}/>); 
 }); 
});

describe("Service", () => {
  it ('Component Test: Service: renders correctly', () => {
   renderer.create(<Service navigation={navigation}/>); 
 }); 
});

describe("ServiceAvailability", () => {
  it ('Component Test: ServiceAvailability: renders correctly', () => {
   renderer.create(<ServiceAvailability navigation={navigation}/>); 
 }); 
});

describe("ServiceOrdered", () => {
  it ('Component Test: ServiceOrdered: renders correctly', () => {
   renderer.create(<ServiceOrdered navigation={navigation}/>); 
 }); 
});

describe("ServicePreview", () => {
  it ('Component Test: ServicePreview: renders correctly', () => {
   renderer.create(<ServicePreview navigation={navigation}/>); 
 }); 
});

describe("SignIn", () => {
  it ('Component Test: SignIn: renders correctly', () => {
   renderer.create(<SignIn navigation={navigation}/>); 
 }); 
});

describe("ViewOrders", () => {
  it ('Component Test: View Orders: renders correctly', () => {
   renderer.create(<ViewOrders navigation={navigation}/>); 
 }); 
});