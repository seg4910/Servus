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
        type: 'users',
        accountExists: "",
        firstName: ""
      };
    };


    continueWithEmail = (email) => {
      fetch(`http://localhost:8080/api/getEmailExists/?email=${email}&type=${this.state.type}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            accountExists: responseJson.accountExists,
            firstName: responseJson.firstName
          },
          function() {
            if (this.state.accountExists) {
              this.props.navigation.navigate("SignIn", {
                firstName: this.state.firstName,
                email: email
              });
            } else {
              //navigate to Create Account
              this.props.navigation.navigate("Register", {
                firstName: this.state.firstName,
                email: email
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