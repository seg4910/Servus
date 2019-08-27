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

class ContinueWithPassword extends Component {
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
      <ImageBackground
        source={require("../image/back.jpg")}
        style={st.authContainer}
      >
        <View style={st.logoContainer}>
          <Image
            source={require("../image/React.js_logo-512.png")}
            style={st.logo}
          />
          <Text style={st.servus}>Welcome back, {firstName}!</Text>
        </View>
        <Text style={st.heading2}> To continue, please verify it's you </Text>

        <View style={st.inputContainer}>
          <Icon
            name={"lock-outline"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={st.inputIcon}
          />
          <TextInput
            style={st.input}
            type="text"
            placeholder="Password"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            onChangeText={text => this.setState({ password: text })}
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.showPass}
          />
          <TouchableOpacity
            style={st.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Icon2
              name={this.state.press == false ? "eye" : "eye-off"}
              size={28}
              color={"rgba(255,255,255,0.7)"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={st.btn} onPress={this.signIn.bind()}>
          <Text style={st.btnText}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const st = require("../styles/style.js");
export default ContinueWithPassword;
