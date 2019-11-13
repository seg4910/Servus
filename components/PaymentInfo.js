import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text
} from "react-native";
import { SelectPayment } from 'react-native-checkout';


const fetch = require("node-fetch");

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      serviceInfo: [],
      isAvailable: null,
      text: ''
    };
  }

  componentWillReceiveProps(props) {}

  componentWillMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      if (this.props.navigation.getParam("serviceInfo", "NO-SERVICE")) {
        this.setState({serviceInfo: this.props.navigation.getParam("serviceInfo", "NO-SERVICE")});
      }

      var encodedID = encodeURIComponent(result);
      fetch(`http://localhost:8080/api/getStripeCustomer?type=users&id=${encodeURIComponent(encodedID)}`, {
        method: "GET",
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson.stripeCustomer.id);
        this.setState({
          stripeCustomer: responseJson.stripeCustomerCards
        })
      })
      //alert(this.state.stripeCustomer);
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    AsyncStorage.getItem('userId', (err, result) => {
      var encodedID = encodeURIComponent(result);
      fetch(`http://localhost:8080/api/getStripeCustomer?type=usersid=${encodeURIComponent(encodedID)}`, {
        method: "GET",
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson.stripeCustomer.id);
        this.setState({
          stripeCustomer: responseJson.stripeCustomerCards
        })
      })
      //alert(this.state.stripeCustomer);
    });
    this.setState({refreshing: false});

  }

  addNewCard = () => {
    this.props.navigation.navigate('AddNewCard');
  }
  selectPayment = (paymentInfo) => {
    this.props.navigation.state.params.setPaymentInfo(paymentInfo);
    this.props.navigation.goBack();
  }
  


  render() {
    return (
      <ScrollView style={{flex: 1, marginTop: 20}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>

      <SelectPayment
        enableApplePay={true} // optional, default: false
        applePayHandler={() => console.log('apple pay happened')} // optional
        paymentSources={this.state.stripeCustomer} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
        addCardHandler={() => this.addNewCard()}
        selectPaymentHandler={(paymentSource) => this.selectPayment(paymentSource)}
      />


      </ScrollView>
    );
  }
}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});
export default PaymentInfo;
