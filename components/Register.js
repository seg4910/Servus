import React, { Component } from "react";
import { Text, View, TouchableOpacity, ImageBackground, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Register extends Component {
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
            <ImageBackground
            source={require("../image/back.jpg")}
            style={st.authContainer}
          >
            <View style={st.logoContainer}>
              <Image
                source={require("../image/React.js_logo-512.png")}
                style={st.logo}
              />
              <Text style={st.servus}>SERVUS</Text>
            </View>
    
            <View style={st.inputContainer}>
              <Icon
                name={"email-outline"}
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={st.inputIcon}
              />
              <TextInput
                style={st.input}
                type="text"
                placeholder="E-mail"
                placeholderTextColor={"rgba(255,255,255,0.7)"}
                onChangeText={text => this.setState({ email: text })}
                underlineColorAndroid="transparent"
              />
            </View>
    
            <TouchableOpacity
              style={st.btn}
              onPress={this.continueWithEmail.bind()}
            >
              <Text style={st.btnText}>CONTINUE</Text>
            </TouchableOpacity>
          </ImageBackground>
        )
    }
}
      
const st = require("../styles/style.js");
export default Register;