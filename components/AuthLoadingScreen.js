import React, {Fragment, Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    AsyncStorage.getItem('userId', (err, result) => {
        if(result == null){
            this.props.navigation.navigate('Auth');
        }
        else{
            this.props.navigation.navigate('App');
        }
    })

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default AuthLoadingScreen;