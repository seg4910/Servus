import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

class ServiceView extends Component {
  render() {
    return (
        <View style={st.container}>
        <Text style={st.heading1}>{this.state.serviceName}</Text>
        <Text style={st.heading2}>Seller: {this.state.sellerName}</Text>
        <Text style={st.heading2}>Description: {this.state.serviceDescription}</Text>
        <Text style={st.heading2}>Price Range: {this.state.minPrice} - {this.state.maxPrice}</Text>

        <Button title='Order Service' onPress={this.props.purchaseService}/>
    </View>
    );
  }
}

export default ServiceView;
