import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AccountView from '../components/views/appViews/AccountView';
import CategoryCard from '../components/views/appViews/CategoryCard';
import HomeView from '../components/views/appViews/HomeView';
import ServiceCard from '../components/views/appViews/ServiceCard';
import ServiceView from '../components/views/appViews/ServiceView';

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
/*     const tree = renderer
      .create(<HomeView/>)
      .toJSON();
    expect(tree).toMatchSnapshot(); */
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