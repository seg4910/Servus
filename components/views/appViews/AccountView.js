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
import Icon from "react-native-vector-icons/EvilIcons";
import CategoryCard from './CategoryCard';
import ServicePreview from '../../ServicePreview';

class AccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          edit: false,
          photo: null
        }      
    };

  render() {

    var style;
    
    if (this.state.edit) {
      style = {
        display: 'none'
      }
    } else {
      style = {
        display: 'flex'
      }
    }

    const { photo } = this.state;

    return (
        <View style={st.container}>
            <Text style={st.heading1}>Your Account</Text>
            <Text style={st.heading2}>{this.state.name}</Text>
            <TextInput style={style}></TextInput> 
            <Text style={st.heading2}>{this.state.email}</Text>
            <TextInput style={style}></TextInput>  
            <Button title='Edit Info' onPress={this.props.editAccountInfo}/>
            <Button title='Payment Info' onPress={this.props.paymentInfo}/> 

            {photo && (
            <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
            />
            )} 
            <Button title="Choose Photo" onPress={this.props.handleChoosePhoto} />  
        </View>
    );
  }
}

const st = require("../../../styles/style.js");
export default AccountView;
