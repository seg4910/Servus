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
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: "row",
          padding: 10,
          paddingBottom: 5,
          borderBottomColor: "#dfe6e9",
          borderBottomWidth: 2,
        }}>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 20,
              paddingBottom: 10
            }}
          >
            <Text style={{ fontSize: 30, color: "#000" }}>
              {this.props.sellerName}
            </Text>
            <Text style={{ fontSize: 15 }}>
              {this.props.serviceCategory} Service
                </Text>
            <View style={{ width: 100, paddingTop: 10 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={4.5}
                starSize={16}
                fullStarColor="orange"
                emptyStarColor="orange"
                style={{}}
              />
            </View>
          </View>
          <Image
            source={require("./../../../image/LawnMowing.jpg")}
            style={{
              width: 90,
              height: 90,
              borderRadius: 55
            }}
          />
        </View>

        <View style={{ margin: 20 }}>
          <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 25 }}>{this.props.serviceName}</Text>
          <Text style={st.heading2}>Seller: {this.props.sellerName}</Text>
          <Text style={st.heading2}>Description: {this.props.serviceDescription}</Text>
          <Text style={st.heading2}>Price Range: {this.props.minPrice} - {this.props.maxPrice}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
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
