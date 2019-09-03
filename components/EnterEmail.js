import React, { Component } from "react";
import { Text, View, TouchableOpacity, ImageBackground, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EnterEmailView from "./views/authViews/EnterEmailView.js";

const fetch = require("node-fetch");

class EnterEmail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        email: "",
        type: 0,
        accountExists: "",
        firstName: ""
      };      
    };

    continueWithEmail = () => {
      fetch("http://localhost:8080/api/getEmailExists/?email=" + this.state.email)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            accountExists: responseJson.accountExists,
            firstName: responseJson.firstName
          },
          function() {
            if (this.state.accountExists) {
              this.props.navigation.navigate("ContinueWithPassword", {
                firstName: this.state.firstName,
                email: this.state.email
              });
            } else {
              //navigate to Create Account
              this.props.navigation.navigate("CreateAccount", {
                firstName: this.state.firstName,
                email: this.state.email
              });
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
    };   

    render() {
        return (
            // enter email (sign in/regsiter)
            <EnterEmailView
              continueWithEmail = {this.continueWithEmail} 
            />
        )
    }
}
      
const st = require("../styles/style.js");
export default EnterEmail;