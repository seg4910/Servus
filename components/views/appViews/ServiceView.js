import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import StarRating from "react-native-star-rating";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

class ServiceView extends Component {
  constructor(props) {
    super(props);
  };

  getSellerRating = () => {
    if (this.props.ratings !== null) {
      var totalRating = 0;
      var ratingCount = 0;
      (this.props.ratings.map((rating) => {
        totalRating += parseInt(rating.rating);
        ratingCount++;
      }))
      return (totalRating / ratingCount)
    } else {
      return 5
    }
  }

  getServiceCategory = () => {
    if (this.props.serviceCategory == 'LM') {
      return "Lawn Services"
    } else if (this.props.serviceCategory == 'SR') {
      return "Snow Removal Services"
    } else if (this.props.serviceCategory == 'CL') {
      return "Cleaning Services"
    } else if (this.props.serviceCategory == 'HM') {
      return "Handyman Services"
    }
  }

  getRatings = () => {
    if (this.props.ratings !== null) {
      return (this.props.ratings.map((rating) => {
        return (
          <View style={{ backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <View style={{ width: 100 }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={rating.rating}
                starSize={16}
                fullStarColor="orange"
                emptyStarColor="orange"
                style={{}}
              />
            </View>
            <Text>{rating.comment}</Text>
          </View>);
      }))
    } else {
      return null;
    }

  }


  render() {
    if (this.props.ratings !== undefined) {
      console.log(this.props)
      return (
        <ScrollView>
          <View style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
              marginRight: 20,
            }}>
            <View style={{
              flexDirection: "row",
              padding: 10,
            }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  paddingBottom: 10
                }}
              >
                <Text style={{ fontSize: 30, color: "#000" }}>
                  {this.props.serviceName}
                </Text>
                <Text style={{ fontSize: 15, color: '#7f8c8d' }}>
                  {this.getServiceCategory()}
                  </Text>
                <View style={{ width: 100, paddingTop: 10 }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.getSellerRating()}
                    starSize={16}
                    fullStarColor="orange"
                    emptyStarColor="orange"
                    style={{}}
                  />
                </View>
              </View>
            </View>

            <View style={{
              paddingTop: 5,
              borderTopColor: "#dfe6e9",
              borderTopWidth: 2,              
              paddingBottom: 15,
              borderBottomColor: "#dfe6e9",
              borderBottomWidth: 2,
            }}>
              <View style={{ alignItems: "center", paddingTop: 15 }}>
                  {
                    this.props.servicePhoto ?
                      <Image
                        source={{ uri: this.props.servicePhoto }}
                        style={{
                          height: 150,
                          width: 250,
                        }}
                          />
                    : null
                  }
              </View>
              <View style={{
                  paddingTop:20,
                  marginLeft: 10,
                  marginRight: 30,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon2 color='#E88D72' name="map-marker-radius" size={45} />
                    <Text style={{ fontSize: 20 }}>{this.props.city}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Icon color='#E88D72' name="dollar" size={40} />
                    <Text style={{ fontSize: 20 }}>{this.props.price} / Hr</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "column",  marginTop: 20 }}>
              <Text style={{ fontSize: 22, paddingBottom: 10, fontWeight: 'bold' }}>Description</Text>
              <View style={{ marginLeft: 10, marginBottom: 20 }}>
                <Text style={{ marginLeft: 5, fontSize: 18 }}>{this.props.serviceDescription}</Text>
              </View>
            </View>
            <View style={{
              paddingTop: 5,
              borderTopColor: "#dfe6e9",
              borderTopWidth: 2,              
              paddingBottom: 15,
              borderBottomColor: "#dfe6e9",
              borderBottomWidth: 2,              
            }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  source={{uri: this.props.sellerPhoto}}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 55,
                    alignSelf: "center"
                  }}
                />
                
                <View style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                  paddingLeft: 30,
                }}>
                    <Text style={{ fontSize:18, color: "#000", fontWeight: "bold" }}>{this.props.sellerName}</Text>
                    <Text style={{ fontSize:14, color: "#000" }}>Servus seller</Text>
                    <Text style={{ fontSize:12, color: '#7f8c8d' }}>{this.props.sellerEmail}</Text>
                    <Text style={{ fontSize:12, color: '#7f8c8d' }}>{this.props.sellerPhone}</Text>
                </View>
              </View>
            </View>

            <Text style={{ fontSize: 22, paddingTop: 20, paddingBottom: 15, fontWeight: 'bold' }}>Reviews</Text>
                <ScrollView style={{ marginLeft: 10 }}>{this.getRatings()}</ScrollView>

            <View style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
              <TouchableOpacity
                style={st.btnPrimary}
                onPress={this.props.viewAvailability}>
                <Text style={st.btnText}>VIEW AVAILABILITY</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <LottieView style={{ flex: 1 }} source={require('../../../image/loading.json')} autoPlay loop={true} />
        </View>
      )
    }

  }
}

const st = require("./../../../styles/style.js");

export default ServiceView;
