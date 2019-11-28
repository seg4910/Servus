import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";
import LottieView from 'lottie-react-native';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: null,
    }
  }

  componentDidMount() {
    console.log('ORDER DETAILS CDM');
    // is there a better way to do this when there is more than one item
    // being passed through navigation?
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
    this.setState({
      serviceInfo: serviceInfo
    });
  }

  selectSize = size => {
    this.setState({
      taskSize: size
    });
  };

  getSelectedSize = size => {
    if (size == this.state.taskSize) {
      return {
        flex: .5, backgroundColor: '#E88D72', margin: 10, height: 100, borderRadius: 15, borderWidth: 2, borderColor: '#f1b8a7',
        alignItems: 'center', justifyContent: 'center', shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, shadowOpacity: 1.0, elevation: 5,
      }
    } else {
      return {
        flex: .5, backgroundColor: 'white', margin: 10, height: 100, borderRadius: 15, borderWidth: 2, borderColor: '#E88D72',
        alignItems: 'center', justifyContent: 'center', elevation: 1
      }
    }
  }

  scheduleService = () => {
    // we have this above... should only need to get info once
    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo", "NO-SERVICE"
    );
    const selectedDay = this.props.navigation.getParam(
      "selectedDay", "NO-SELECTEDDAY"
    );
    const availableDates = this.props.navigation.getParam(
      "availableDates", "NO-AVAILABLEDATES"
    );

    console.log('LEAVING ORDER DETAILS');
    this.props.navigation.navigate("ScheduleService", {
      serviceInfo: serviceInfo,
      selectedDay: selectedDay,
      availableDates: availableDates,
      taskSize: this.state.taskSize,
    });
  };

  render() {
    if (this.state.serviceInfo) {
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
                {this.state.serviceInfo[0].sellerName}
              </Text>
              <Text style={{ fontSize: 15 }}>
                {this.state.serviceInfo[0].serviceCategory} Service
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
              source={require("../image/LawnMowing.jpg")}
              style={{
                width: 90,
                height: 90,
                borderRadius: 55
              }}
            />
          </View>

          <View style={{ margin: 20, marginTop: 50 }}>

            <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 25 }}>Task Size</Text>

            <View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                  style={this.getSelectedSize('SM')}
                  onPress={() => this.selectSize('SM')}
                >
                  <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start' }}>SMALL</Text>
                  <Text style={{ margin: 10, fontSize: 18, alignSelf: 'flex-start' }}>0-1 Hour</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={this.getSelectedSize('MD')}
                  onPress={() => this.selectSize('MD')}
                >
                  <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start' }}>MEDIUM</Text>
                  <Text style={{ margin: 10, fontSize: 18, alignSelf: 'flex-start' }}>1-2 Hours</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                  style={this.getSelectedSize('LG')}
                  onPress={() => this.selectSize('LG')}
                >
                  <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start' }}>LARGE</Text>
                  <Text style={{ margin: 10, fontSize: 18, alignSelf: 'flex-start' }}>2-3 Hours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={this.getSelectedSize('XL')}
                  onPress={() => this.selectSize('XL')}
                >
                  <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start' }}>X-LARGE</Text>
                  <Text style={{ margin: 10, fontSize: 18, alignSelf: 'flex-start' }}>4+ Hours</Text>
                </TouchableOpacity>
              </View>
              <View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.scheduleService()}
            >
              <Text style={st.btnText}>SCHEDULE SERVICE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <LottieView style={{ flex: 1 }} source={require('../image/loading.json')} autoPlay loop={true} />
        </View>
      )
    }
  }
}

const st = require("../styles/style.js");
export default OrderDetails;