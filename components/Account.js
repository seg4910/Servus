import React, { Component } from "react";
import { View, Text, TextInput, Button, Image, AsyncStorage } from "react-native";
import AccountView from "./views/appViews/AccountView.js";
import ImagePicker from 'react-native-image-picker';
const fetch = require("node-fetch");

class Account extends Component {
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

    componentDidMount() {
        AsyncStorage.getItem('userId', (err, result) => {
    
          fetch('http://localhost:8080/api/getAccountInfo/?id=' + result)
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              name: responseJson.name,
              email: responseJson.email,
              password: responseJson.password,
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    
        });
      }    

      handleChoosePhoto = () => {
        console.log('handle choose photo');

        const options = {
          noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };          
          }
          if (response.uri) {
            this.setState({ photo: response });
          }
        });
      };
  
    
      createFormData = (photo, body) => {
        const data = new FormData();
    
        data.append("photo", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
    
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
    
        return data;
      };
    

      handleUploadPhoto = () => {

        console.log('handle upload  photo');

        fetch("http://localhost:8080/api/uploadImage", {
          method: "POST",
          body: this.createFormData(this.state.photo, { userId: 52 })
        })
          .then(response => response.json())
          .then(response => {
            alert("Upload success!");
            this.setState({ photo: null });
          })
          .catch(error => {
            alert("Upload failed!");
          });
      };
    
      paymentInfo = () => {
        this.props.navigation.navigate('PaymentInfo');
      }      



      render() { 
        const { navigation } = this.props;
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
          <AccountView
            navigation = {this.props.navigation}
            paymentInfo = {this.paymentInfo}
            handleChoosePhoto = {this.handleChoosePhoto}
            name = {this.state.name}
            email = {this.state.email}
            handleUploadPhoto = {this.handleUploadPhoto}
          />
        );
    }
}
      
const st = require("../styles/style.js");
export default Account;