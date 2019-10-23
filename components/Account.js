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
        photo: '',
        imgPath: '',
        img: '',
        phone: ''
      }      
    };

    componentDidMount() {
        AsyncStorage.getItem('userId', (err, result) => {
    
          fetch(`http://localhost:8080/api/getAccountInfo/?id=${result}&type=${"users"}`)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              name: responseJson.name,
              email: responseJson.email,
              password: responseJson.password,
              img: responseJson.img,
              phone: responseJson.phone
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    
        });
      }    
    
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
        AsyncStorage.getItem('userId', (err, result) => {

          fetch(`http://localhost:8080/api/uploadImage?id=${encodeURIComponent(result)}`, {
            method: "POST",
            body: this.createFormData(this.state.photo, { userId: 52 })
          })
            .then(response => response.json())
            .then(responseJson => {
              this.setState({ 
                img: responseJson.imgPath
               });
            })
            .catch(error => {
              alert("Upload failed!");
            });
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
    


        return (
          <AccountView
            navigation = {this.props.navigation}
            paymentInfo = {this.paymentInfo}
            name = {this.state.name}
            email = {this.state.email}
            handleUploadPhoto = {this.handleUploadPhoto}
            phone = {this.state.phone}
            //img = {`./../../../../ServusBackend/images/${this.state.img}`}
          />
        );
    }
}
      
const st = require("../styles/style.js");
export default Account;