
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import RegisterView from './views/authViews/RegisterView.js';

const fetch = require("node-fetch");

class Register extends Component {
  constructor(props) {
    super(props);
    const email = this.props.navigation.getParam("email", "NO-EMAIL");
    this.state = {
      email: email,
      name: "",
      password: "",
      type: 0,
      showPass: true,
      press: false
    };
  }

  createAccount = (email, name, password) => {
    fetch(
      "http://localhost:8080/api/createUser/?email=" +
        email +
        "&name=" +
        name +
        "&password=" +
        password +
        "&type=" +
        this.state.type.toString()
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            userId: responseJson.userId
          },
          function() {
            AsyncStorage.setItem("userId", "" + this.state.userId);
            this.props.navigation.navigate("CreateLocation");
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  render() {
    const { navigation } = this.props;
    const email = JSON.parse(JSON.stringify(navigation.getParam('email', 'NO-EMAIL')));

    return (
      // create a new account
      <RegisterView 
        showPass = {this.showPass}
        createAccount = {this.createAccount}
        press = {this.state.press}
        email = {email}
      />
    );
  }
}

const st = require("../styles/style.js");
export default Register;
