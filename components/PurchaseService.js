import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  RefreshControl
} from "react-native";
import { SelectPayment } from 'react-native-checkout';

const fetch = require("node-fetch");

class PurchaseService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      serviceInfo: []
    };
  }

  componentWillReceiveProps(props) {}

  componentWillMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      if (this.props.navigation.getParam("serviceInfo", "NO-SERVICE")) {
        this.setState({serviceInfo: this.props.navigation.getParam("serviceInfo", "NO-SERVICE")});
      }

      var encodedID = encodeURIComponent(result);
      fetch(`http://localhost:8080/api/getStripeCustomer?id=${encodeURIComponent(encodedID)}`, {
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
      fetch(`http://localhost:8080/api/getStripeCustomer?id=${encodeURIComponent(encodedID)}`, {
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
  confirmPurchase = () => {

    this.props.navigation.navigate('ConfirmPurchase', {
      serviceInfo: this.state.serviceInfo
    });
  }

  render() {
    const { navigation } = this.props;

    AsyncStorage.getItem("userId", (err, result) => {

    });

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
          selectPaymentHandler={() => this.confirmPurchase()}
        /> 
      </ScrollView>
    );
  }
}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});
export default PurchaseService;
