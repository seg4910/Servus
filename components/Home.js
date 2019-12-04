import React, { Component } from "react";
import HomeView from './views/appViews/HomeView.js';
import firebase from 'react-native-firebase';
import {
  AsyncStorage
} from "react-native";
class Home extends Component {
    constructor(props) {
      super(props);
    };

    selectServiceCategory = (cat) => {
        console.log(cat);
        this.props.navigation.navigate("ServicePreview", {
          serviceCat: cat
        });
    };    

    componentDidMount() {
      this.loadData();
    }

    loadData = () => {
          // always update the users fcm token to the current device that they are using
          firebase.messaging().hasPermission()
          .then(enabled => {
            if (enabled) {
              firebase.messaging().getToken().then(token => {
                console.log("LOG: ", token);
                AsyncStorage.getItem('userId', (err, result) => {
                  fetch('http://localhost:8080/api/editField', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      type: "users",
                      userId: result,
                      fieldType: "fcmToken",
                      fieldValue: token,
                    }),
                  });
                });
              })
            }
          });
    }

    render() {
        return (
            <HomeView 
            navigation={this.props.navigation}
            selectServiceCategory = {this.selectServiceCategory}
            loadData = {this.loadData}
          />
        )
    }
}
      

export default Home;