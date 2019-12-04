import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";

class ServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null
    }
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/getRatings?id=' + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          ratings: responseJson.ratingInfo
        })
      })
  }

  getSellerRating = () => {
    if (this.state.ratings !== null) {
      var totalRating = 0;
      var ratingCount = 0;
      (this.state.ratings.map((rating) => {
        totalRating += parseInt(rating.rating);
        ratingCount++;
      }))
      return (totalRating / ratingCount)
    } else {
      return 5
    }
  }

  render() {

      return (

        <View
        key={this.props.id}
        style={{
          //borderRightColor: "#43B14B",
          //borderRightWidth: 3,
          height: 200,
          margin: 10,
          marginBottom: 10,
          borderRadius: 5
        }}
      >
          
        <TouchableOpacity
          onPress={() => this.props.selectService(this.props.id)}
        >
          <View
            style={{
              overflow: "hidden",
              height: 200,
              flexDirection: "row",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#dddddd"
            }}
          >
            <View style={{ flex: 4 }}>


            {this.props.servicePhoto &&
                <Image
                    source={{uri: this.props.servicePhoto}}
                    style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                    }}
                />
            }              
              
            {!this.props.servicePhoto && this.props.serviceCat == 'LM' &&
                <Image
                    source={require("./../../../image/LawnMowing.jpg")}
                    style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                    }}
                />
            }
            {!this.props.servicePhoto && this.props.serviceCat == 'SR' &&
                <Image
                    source={require("./../../../image/SnowRemoval.jpg")}
                    style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                    }}
                />
            }
            {!this.props.servicePhoto && this.props.serviceCat == 'CL' &&
                <Image
                    source={require("./../../../image/CleaningServices.jpg")}
                    style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                    }}
                />
            }
            {!this.props.servicePhoto && this.props.serviceCat == 'HM' &&
                <Image
                    source={require("./../../../image/HandymanServices.jpg")}
                    style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                    }}
                />
            } 

            </View>
            <View
              style={{
                flex: 7,
                margin: 5,
                marginBottom: 0,
                flexDirection: "column"
              }}
            >

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingBottom: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: '#dfe6e9'
                }}
              >
                <View style={{flex: 2, flexDirection: "row"}}>
                  <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                    <Text style={{fontSize: 18}}>
                      {this.props.sellerName}
                    </Text>
                    <View style={{ width: 100}}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.getSellerRating()}
                        starSize={16}
                        fullStarColor="orange"
                        emptyStarColor="orange"
                        style={{ padding: 8 }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    overflow: "hidden",
                    textAlign: "center",
                    color: "#000"
                  }}
                >
                  {this.props.serviceName}
                </Text>
{/*                 <Text
                  style={{
                    fontSize: 15,
                    overflow: "hidden",
                    textAlign: "center",
                    marginTop: 3
                  }}
                >
                  {this.props.serviceDescription}
                </Text> */}
              </View>

            
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderTopWidth: 2,
                  borderTopColor: '#dfe6e9'
                }}
              >
                <View
                  style={{
                    width: 75,
                    height: 35,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Icon name="dollar" size={20} />
                  <Text style={{fontSize: 13}}>
                    {this.props.priceHr} / Hr
                  </Text>
                </View>
                <View
                  style={{
                    width: 82,
                    height: 35,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Icon2 name="map-marker-radius" size={25} />
                  <Text style={{fontSize: 13}}>
                    Ottawa
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      </View>
      );
   
  }
}

const st = require("./../../../styles/style.js");

export default ServiceCard;
