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

class EnterEmail extends Component {
  constructor(props) {
    super(props);
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
        onPress={this.props.continueWithEmail}
        >
        <Text style={st.btnText}>CONTINUE</Text>
        </TouchableOpacity>
        </ImageBackground>
    );
  }
}

const st = require("../../../styles/style.js");
export default EnterEmail;
