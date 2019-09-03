import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const fetch = require("node-fetch");

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      id: "",
      showPass: true,
      press: false,
      email: "",
      firstName: ""
    };
  }
  static navigationOptions = {
    title: "Servus"
  };

  

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  signIn = () => {
    const email = this.props.navigation.getParam("email", "NO-EMAIL");
    fetch(
      "http://localhost:8080/api/signIn/?email=" +
        email +
        "&password=" +
        this.state.password
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            accountExists: responseJson.accountExists,
            type: responseJson.type,
            firstName: responseJson.firstName,
            id: responseJson.id
          },
          function() {
            if (this.state.accountExists) {
              //alert(this.state.id);
              AsyncStorage.clear();
              AsyncStorage.setItem("userId", "" + this.state.id);
              this.props.navigation.navigate("Home", {
                firstName: this.state.firstName,
                id: this.state.id
              });
            } else {
              alert("Account not found!");
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { navigation } = this.props;
    const firstName = JSON.parse(
      JSON.stringify(navigation.getParam("firstName", "NO-NAME"))
    );
    return (
      // continue with password (sing in)
      <SignInView
        signIn = {this.signIn}
        showPass = {this.showPass}
      />
    );
  }
}

const st = require("../styles/style.js");
export default SignIn;
