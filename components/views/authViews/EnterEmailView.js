import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import CategoryCard from '../appViews/CategoryCard';
import ServicePreview from '../../ServicePreview.js';
import IconFA from "react-native-vector-icons/FontAwesome";

class EnterEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };    
  }

  render() {

    return (
        // enter email (sign in/regsiter)
        <ImageBackground
        source={require("../../../image/back.jpg")}
        style={st.authContainer}
        >
        <View style={st.logoContainer}>
        <Image
            source={require("../../../image/React.js_logo-512.png")}
            style={st.logo}
        />
        <Text style={st.servus}>SERVUS</Text>
        </View>

        <View style={st.inputContainer}>
        <IconFA
            name={"at"}
            size={25}
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
        onPress={() => this.props.continueWithEmail(this.state.email)}
        >
        <Text style={st.btnText2}>CONTINUE</Text>
        </TouchableOpacity>
        </ImageBackground>
    );
  }
}

const st = require("../../../styles/style.js");
export default EnterEmail;
