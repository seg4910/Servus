import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";
import Moment from 'moment';
import OrderView from './views/appViews/OrderView';

const fetch = require("node-fetch");


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: [],
      selectedDay: '',
      paymentInfo: ''
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const orderId = JSON.parse(JSON.stringify(navigation.getParam('id', 'NO-ORDER')));
    console.log(orderId);
    fetch('http://localhost:8080/api/viewOrder?id=' + orderId)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('Orders: ' + responseJson.order);
        this.setState({
            orderInfo: responseJson.order
        });
    })
    .catch((error) =>{
        console.error(error);
    });
  }


  render() {
    const { navigation } = this.props;

    return (
      <OrderView orderInfo={this.state.orderInfo}/>
    );
  }



}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});

export default Order;