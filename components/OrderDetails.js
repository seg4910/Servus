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
import { IndicatorViewPager, PagerDotIndicator} from "rn-viewpager";
import StepIndicator from "react-native-step-indicator";
import SmoothPicker from 'react-native-smooth-picker';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: [],
    }
    this.selectSize = this.selectSize.bind(this);
    this.scheduleService = this.scheduleService.bind(this);
  }

  componentDidMount() {
    // is there a better way to do this when there is more than one item
    // being passed through navigation?
    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo", "NO-SERVICE"
    );


    this.setState({
      sellerName: serviceInfo[0].sellerName,
      serviceCategory: serviceInfo[0].serviceCategory,
      minPrice: serviceInfo[0].minPrice,
      maxPrice: serviceInfo[0].maxPrice
    });

    AsyncStorage.getItem("userId", (err, result) => {
      const { navigation } = this.props;
      var encodedID = encodeURIComponent(result);

      //alert(this.state.stripeCustomer);
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
        flex:.5,backgroundColor:'#E88D72',margin:10, height:100, borderRadius:15,borderWidth:2,borderColor:'#f1b8a7',
        alignItems:'center', justifyContent:'center'
      }
    } else {
      return {
        flex:.5,backgroundColor:'white',margin:10, height:100, borderRadius:15,borderWidth:2,borderColor:'#E88D72',
        alignItems:'center', justifyContent:'center', elevation:1
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
    const shiftDays = this.props.navigation.getParam(
      "shiftDays", "NO-SHIFTDAYS"
    );    


    this.props.navigation.navigate("ScheduleService", {
      serviceInfo: serviceInfo,
      selectedDay: selectedDay,
      availableDates: availableDates,
      taskSize: this.state.taskSize,
      shiftDays: shiftDays
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../image/LawnMowing.jpg")}
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
              {this.state.sellerName}
            </Text>
            <Text style={{ fontSize: 15 }}>
              {this.state.serviceCategory} Service
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

        <Text style={{fontSize:25,marginLeft:10}}>Task Size:</Text>
        <View>
          <View style={{flexDirection:'row', marginTop:20}}>
            <TouchableOpacity
              style={this.getSelectedSize('SM')}
              onPress={() => this.selectSize('SM')}
            >
              <Text style={{margin:10,fontSize:20,fontWeight:'bold',alignSelf:'flex-start'}}>SMALL</Text>
              <Text style={{margin:10,fontSize:18,alignSelf:'flex-start'}}>0-1 Hour</Text>              
            </TouchableOpacity>
            <TouchableOpacity
              style={this.getSelectedSize('MD')}
              onPress={() => this.selectSize('MD')}
            >
              <Text style={{margin:10,fontSize:20,fontWeight:'bold',alignSelf:'flex-start'}}>MEDIUM</Text>
              <Text style={{margin:10,fontSize:18,alignSelf:'flex-start'}}>1-2 Hours</Text>              
            </TouchableOpacity>       
          </View>
          <View style={{flexDirection:'row', marginTop:20}}>
          <TouchableOpacity
              style={this.getSelectedSize('LG')}
              onPress={() => this.selectSize('LG')}
            >
              <Text style={{margin:10,fontSize:20,fontWeight:'bold',alignSelf:'flex-start'}}>LARGE</Text>
              <Text style={{margin:10,fontSize:18,alignSelf:'flex-start'}}>2-3 Hours</Text>              
            </TouchableOpacity>
            <TouchableOpacity
              style={this.getSelectedSize('XL')}
              onPress={() => this.selectSize('XL')}
            >
              <Text style={{margin:10,fontSize:20,fontWeight:'bold',alignSelf:'flex-start'}}>X-LARGE</Text>
              <Text style={{margin:10,fontSize:18,alignSelf:'flex-start'}}>4+ Hours</Text>              
            </TouchableOpacity>     
          </View>          
          <View>

          </View>
        </View>

        <View style={{flex:1,justifyContent:'flex-end', alignItems:'center', marginBottom:10}}>
          <TouchableOpacity
            style={st.btn}
            onPress={() => this.scheduleService()}
          >
            <Text style={st.btnText}>SCHEDULE SERVICE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const st = require("../styles/style.js");

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};
export default OrderDetails;