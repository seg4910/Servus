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

class CreateAccount extends Component {
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

  createAccount = () => {
    fetch(
      "http://localhost:8080/api/createUser/?email=" +
        this.state.email +
        "&name=" +
        this.state.name +
        "&password=" +
        this.state.password +
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
          <Text style={st.servus}>Welome to Servus!</Text>
        </View>

        <View style={st.inputContainer}>
          <Icon2
            name={"email-outline"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={st.inputIcon}
          />
          <TextInput
            style={st.input}
            type="text"
            placeholder="Email"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={st.inputContainer}>
          <Icon
            name={"user"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={st.inputIcon}
          />
          <TextInput
            style={st.input}
            type="text"
            placeholder="Name"
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            onChangeText={text => this.setState({ username: text })}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={st.inputContainer}>
          <Icon1
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
          <TouchableOpacity style={st.btnEye} onPress={this.showPass.bind()}>
            <Icon2
              name={this.state.press == false ? "eye" : "eye-off"}
              size={28}
              color={"rgba(255,255,255,0.7)"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={st.btn} onPress={this.createAccount.bind()}>
          <Text style={st.btnText}>SUBMIT</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const st = require("../styles/style.js");
export default CreateAccount;
