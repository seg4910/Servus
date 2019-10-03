import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      name: "",
      password: ""
    }
  }

  render() {

    return (
    // create a new account
    <ImageBackground
    source={require("./../../../image/back.jpg")}
    style={st.authContainer}
    >
    <View style={st.logoContainer}>
    <Image
        source={require("./../../../image/React.js_logo-512.png")}
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
        placeholder={this.props.email}
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
        onChangeText={text => this.setState({ name: text })}
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
        secureTextEntry={this.props.showPass}
    />
    <TouchableOpacity style={st.btnEye} onPress={this.props.showPass}>
        <Icon2
        name={this.props.press == false ? "eye" : "eye-off"}
        size={28}
        color={"rgba(255,255,255,0.7)"}
        />
    </TouchableOpacity>
    </View>

    <TouchableOpacity 
      style={st.btn} 
      onPress={() => this.props.createAccount(this.state.email, this.state.name, this.state.password)}>
      <Text style={st.btnText2}>SUBMIT</Text>
    </TouchableOpacity>
    </ImageBackground>
    );
  }
}

const st = require("./../../../styles/style.js");
export default Register;
