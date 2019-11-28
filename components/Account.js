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
    this.loadData();
  }

  loadData = () => {
    var type = 'users'
    AsyncStorage.getItem('userId', (err, result) => {

      fetch(`http://localhost:8080/api/getAccountInfo/?id=${result}&type=${type}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            id: responseJson.id,
            name: responseJson.name,
            email: responseJson.email,
            password: responseJson.password,
            img: responseJson.img,
            phone: responseJson.phone,
            photo: responseJson.photo
          });
        })
        .catch((error) => {
          console.error(error);
        });

    });
  }

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
        navigation={this.props.navigation}
        paymentInfo={this.paymentInfo}
        name={this.state.name}
        email={this.state.email}
        handleUploadPhoto={this.handleUploadPhoto}
        phone={this.state.phone}
        photo={this.state.photo}
        id={this.state.id}
        loadData={this.loadData}
      />
    );
  }
}

const st = require("../styles/style.js");
export default Account;