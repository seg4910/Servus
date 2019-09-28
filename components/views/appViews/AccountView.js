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
  Button
} from "react-native";

class AccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false,
          photo: null
        }      
    };

    editAccountInfo = () => {
      this.props.navigation.navigate("EditAccountInfo");   
    }

  render() {

    const { photo } = this.state;

    return (
        <View style={st.container}>
            <Text style={st.heading1}>Your Account</Text>
            <Text style={st.heading2}>{this.props.name}</Text>
            <Text style={st.heading2}>{this.props.email}</Text>
            <Button title='Edit Info' onPress={() => this.editAccountInfo()}/>
            <Button title='Payment Info' onPress={this.props.paymentInfo}/> 

            {photo && (
            <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
            />
            )} 
            <Button title="Choose Photo" onPress={this.props.handleChoosePhoto} />  
            <Button title="Upload Photo" onPress={this.props.handleUploadPhoto} />             
        </View>
    );
  }
}

const st = require("../../../styles/style.js");
export default AccountView;
