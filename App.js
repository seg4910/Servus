/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";

import Home from './components/Home.js';
import Account from './components/Account.js';
import ViewOrders from './components/ViewOrders.js';
import ServicePreview from './components/ServicePreview.js';
import Register from './components/EnterEmail.js';
import Service from './components/Service.js';
import SignIn from './components/SignIn.js';
import NavigationService from './components/NavigationService.js';
import CreateAccount from './components/Register.js';
import CreateLocation from './components/CreateLocation.js';
import PurchaseService from './components/PurchaseService.js';
import AuthLoadingScreen from './components/AuthLoadingScreen.js';

class NavigationDrawerStructure extends Component {
  //Structure for the navigation Drawer
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  signOut = () => {
    this.props.navigationProps.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require("./image/drawer.png")}
            style={{ width: 35, height: 35, marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// stack of components accessible through side drawer navigation
const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Options and indexing

    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: "Home"
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        drawerLabel: "My Account"
      }
    },
    ViewOrders: {
      screen: ViewOrders,
      navigationOptions: {
        drawerLabel: "My Orders"
      }
    }        
  },
  {
    contentComponent: props => (
      <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("./image/avatar1.jpg")}
            style={{ height: 120, width: 120, borderRadius: 60 }}
          />
        </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
          }}
        >

          <TouchableOpacity
            style={st.btnSignOut}
            onPress={async () => {
              try {
                NavigationService.navigate("Auth");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={st.btnText}>SIGN OUT</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    ),
    contentOptions: { activeTintColor: "#E88D72" }
  }
);


// stack of components for authentication navigation
const AuthStack = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },  
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },  
  CreateLocation: {
    screen: CreateLocation,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  }  
});

// stack of components for core application navigation
const AppStack = createStackNavigator({
  Home: {
    screen: DrawerNavigatorExample,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  } ,
  ServicePreview: {
    screen: ServicePreview,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  Account: {
    screen: Account,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ViewOrders: {
    screen: ViewOrders,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  Service: {
    screen: Service,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  PurchaseService: {
    screen: PurchaseService,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },   
});



// switch navigator for swapping between navigation stacks
const switchNavigator = createSwitchNavigator(
  {
    //AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: "Auth"
  }
);


// create the overall application container utilizing the switch navigator
const AppContainer = createAppContainer(switchNavigator);

const st = require("./styles/style.js");

// export the app using the AppContainer
export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

