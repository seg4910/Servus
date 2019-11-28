/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
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
import EnterEmail from './components/EnterEmail.js';
import Service from './components/Service.js';
import SignIn from './components/SignIn.js';
import NavigationService from './components/NavigationService.js';
import Register from './components/Register.js';
import CreateLocation from './components/CreateLocation.js';
import PaymentInfo from './components/PaymentInfo.js';
import AuthLoadingScreen from './components/AuthLoadingScreen.js';
import EditAccountInfo from './components/EditAccountInfo.js';
import OrderDetails from './components/OrderDetails';
import ScheduleService from './components/ScheduleService.js';
import ServiceAvailability from './components/ServiceAvailability.js';
import ReviewOrder from './components/ReviewOrder.js';
import AddNewCard from './components/AddNewCard.js';
import ServiceOrdered from './components/ServiceOrdered.js';
import firebase from 'react-native-firebase';
import Order from './components/Order.js';
import ChangePassword from './components/ChangePassword.js';
import RateSeller from './components/RateSeller.js';

class NavigationDrawerStructure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: null
    }
  }

  //Structure for the navigation Drawer
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  signOut = () => {
    this.props.navigationProps.navigate("Auth");
  };

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(`http://localhost:8080/api/getAccountInfo?type=users&id=${result}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ photo: responseJson.photo });
          AsyncStorage.setItem('photo', responseJson.photo);
        })
    })
  }

  getPhoto = () => {
    return this.state.photo;
  }

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


class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: null
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(`http://localhost:8080/api/getAccountInfo?type=users&id=${result}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ photo: responseJson.photo });
          AsyncStorage.setItem('photo', responseJson.photo);
        })
    })
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
          <Image
            source={{uri: this.state.photo}}
            style={{ height: 120, width: 120, borderRadius: 60 }}
          />
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

          <Avatar/>

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
                AsyncStorage.removeItem('userId');
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
  EnterEmail: {
    screen: EnterEmail,
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
  },
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
  PaymentInfo: {
    screen: PaymentInfo,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  EditAccountInfo: {
    screen: EditAccountInfo,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ScheduleService: {
    screen: ScheduleService,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ServiceAvailability: {
    screen: ServiceAvailability,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ReviewOrder: {
    screen: ReviewOrder,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ServiceOrdered: {
    screen: ServiceOrdered,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  Order: {
    screen: Order,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  RateSeller: {
    screen: RateSeller,
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
    initialRouteName: "AuthLoading"
  }
);


// create the overall application container utilizing the switch navigator
const AppContainer = createAppContainer(switchNavigator);

const st = require("./styles/style.js");

// export the app using the AppContainer
export default class App extends React.Component {

  componentDidMount() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase.messaging().getToken().then(token => {
            console.log("LOG: ", token);
          })
          // user has permissions
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              alert("User Now Has Permission")
            })
            .catch(error => {
              alert("Error", error)
              // User has rejected permissions  
            });
        }
      });
    this.createNotificationListeners();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

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

