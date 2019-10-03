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
import PaymentInfo from "./PaymentInfo";
import Moment from 'moment';

class ReviewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: [],
      selectedDay: '',
      paymentInfo: ''
    };
  }

  componentDidMount() {
    // is there a better way to do this when there is more than one item
    // being passed through navigation?
    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo", "NO-SERVICE"
    );
    const selectedTime = this.props.navigation.getParam(
        "selectedTime", "NO-TIMESELECTED"
    );
    const taskSize = this.props.navigation.getParam(
        "taskSize", "NO-TASKSIZE"
    );
    const selectedDay = this.props.navigation.getParam(
        "selectedDay", "NO-SELECTEDDAY"
    );    

    let taskSizeHr = 0;
    if (taskSize == 'SM') {
        taskSizeHr = 1;
    } else if (taskSize == 'MD') {
        taskSizeHr = 2;
    } else if (taskSize == 'LG') {
        taskSizeHr = 3;
    } else if (taskSize == 'XL') {
      taskSizeHr = 4;
    }

    this.setState({
        serviceInfo: serviceInfo,
        selectedTime: selectedTime,
        taskSize: taskSizeHr,
        serviceName: serviceInfo[0].serviceName,
        sellerName: serviceInfo[0].sellerName,
        serviceCategory: serviceInfo[0].serviceCategory,
        minPrice: serviceInfo[0].minPrice,
        maxPrice: serviceInfo[0].maxPrice,
        selectedDay: selectedDay,  
    });
  }

  setPaymentInfo(paymentInfo) {
    this.setState({paymentInfo: paymentInfo});
  }  

  getPaymentInfo() {
    this.props.navigation.navigate("PaymentInfo", {
      setPaymentInfo: this.setPaymentInfo.bind(this)
    });
  }

  placeOrder() {
    // place stripe order
    // figure out where to navigate and what to do
    AsyncStorage.getItem("userId", (err, result) => {
      fetch('http://localhost:8080/api/purchaseService?id=' + result, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            serviceId: this.state.serviceInfo[0].id,
            sellerId: this.state.serviceInfo[0].sellerID,
            sellerName: this.state.serviceInfo[0].sellerName,
            serviceCategory: this.state.serviceInfo[0].serviceCategory,
            serviceName: this.state.serviceInfo[0].serviceName,
            serviceDescription: this.state.serviceInfo[0].serviceDescription,
            minPrice: this.state.serviceInfo[0].minPrice,
            maxPrice: this.state.serviceInfo[0].maxPrice,
         }),
      });
    });
    
    // do a check to make sure the order was processed?
    this.props.navigation.navigate('ServiceOrdered');


  }

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


        <View>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Review Your Order</Text>

          <View style={{marginLeft:20}}>

            <View style={{paddingBottom:15,borderBottomWidth:2,borderBottomColor:'#dfe6e9'}}>
              <Text style={{fontSize:20}}>SERVICE</Text>
              <View style={{marginLeft:30}}>
                <Text style={{fontSize:18}}>{this.state.serviceName}</Text>
                <Text style={{fontSize:18}}>{this.state.serviceCategory}</Text>
              </View>
            </View>

            <View style={{paddingBottom:15,borderBottomWidth:2,borderBottomColor:'#dfe6e9'}}>
              <Text style={{fontSize:20}}>DATE</Text>
              <View style={{marginLeft:30}}>
                <Text style={{fontSize:18}}>{Moment(this.state.selectedDay.dateString).format('LL')}</Text>
                <Text style={{fontSize:18}}>{this.state.selectedTime}</Text>
              </View>
            </View>

            <View style={{paddingBottom:15,borderBottomWidth:2,borderBottomColor:'#dfe6e9'}}>
              <Text style={{fontSize:20}}>PAYMENT</Text>
              <View style={{marginLeft:30}}>
              {this.state.paymentInfo != '' &&<Text style={{fontSize:18}}>{this.state.paymentInfo.brand}</Text>}
              {this.state.paymentInfo == '' &&<Text onPress={() => this.getPaymentInfo()}style={{fontSize:18}}>Select Payment Info</Text>}
              </View>
            </View>

            <View style={{marginTop:40,paddingBottom:15}}>
              <Text style={{fontSize:20}}>Estimated Duration: {this.state.taskSize} hours</Text>
              <Text style={{fontSize:20}}>Estimated Cost: {this.state.taskSize}</Text>
            </View>
          </View>

        </View>


        <View style={{flex:1,justifyContent:'flex-end', alignItems:'center', marginBottom:10}}>
          <TouchableOpacity
              style={st.btn}
              onPress={() => this.placeOrder()}>
                  <Text style={st.btnText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      


      </View>
    );
  }



}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});

export default ReviewOrder;