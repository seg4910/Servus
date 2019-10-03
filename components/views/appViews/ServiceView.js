import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";

class ServiceView extends Component {
  constructor(props) {
    super(props);
  };

  render() {

      return (
        <View style={{flex:1, padding: 10}}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("./../../../image/LawnMowing.jpg")}
              style={{
                width: 110,
                height: 110,
                borderRadius: 55
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 20,
                marginTop: 20
              }}
            >
              <Text style={{ fontSize: 30, color: "#000" }}>
                {this.props.sellerName}
              </Text>
              <Text style={{ fontSize: 15 }}>
                {this.props.serviceCategory} Service
              </Text>
            </View>
            <View style={{ marginTop: 15, marginRight: 15 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={4.5}
                starSize={16}
                fullStarColor="orange"
                emptyStarColor="orange"
                style={{ padding: 8 }}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "#dfe6e9",
              borderBottomWidth: 2,
              marginTop: 20,
              marginBottom: 20
            }}
          />
     
          <Text style={st.heading1}>{this.props.serviceName}</Text>
          <Text style={st.heading2}>Seller: {this.props.sellerName}</Text>
          <Text style={st.heading2}>Description: {this.props.serviceDescription}</Text>
          <Text style={st.heading2}>Price Range: {this.props.minPrice} - {this.props.maxPrice}</Text>
          <View style={{flex:1,justifyContent:'flex-end', alignItems:'center', marginBottom:10}}>
            <TouchableOpacity
                  style={st.btn}
                  onPress={this.props.viewAvailability}>
                  <Text style={st.btnText}>VIEW AVAILABILITY</Text>
            </TouchableOpacity>
          </View>
      
      </View>
      );
   
  }
}

const st = require("./../../../styles/style.js");

export default ServiceView;
