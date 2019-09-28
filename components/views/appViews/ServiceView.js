import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from "react-native";

class ServiceView extends Component {
  constructor(props) {
    super(props);
  };

  render() {

      return (
          <View style={st.container}>
          <Text style={st.heading1}>{this.props.serviceName}</Text>
          <Text style={st.heading2}>Seller: {this.props.sellerName}</Text>
          <Text style={st.heading2}>Description: {this.props.serviceDescription}</Text>
          <Text style={st.heading2}>Price Range: {this.props.minPrice} - {this.props.maxPrice}</Text>

          <Button title='View Availability' onPress={this.props.viewAvailability}/>
      </View>
      );
   
  }
}

const st = require("./../../../styles/style.js");

export default ServiceView;
