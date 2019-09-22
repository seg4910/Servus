import React, { Component } from "react";
import {
  AsyncStorage,
} from "react-native";
import SignInView from "./views/authViews/SignInView.js";

const fetch = require("node-fetch");

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      type: 'users',
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

  signIn = (password) => {
    const email = this.props.navigation.getParam("email", "NO-EMAIL");
    fetch(
      `http://localhost:8080/api/signIn/?email=${email}&password=${password}&type=${this.state.type}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            accountExists: responseJson.accountExists,
            firstName: responseJson.firstName,
            id: responseJson.id
          },
          function() {
            if (this.state.accountExists) {
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
        press = {this.state.press}
        firstName = {firstName}   // this is being passed from jsonResponse from EnterEmail
      />
    );
  }
}

const st = require("../styles/style.js");
export default SignIn;
