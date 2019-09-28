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

    let taskSizeH = "";
    if (taskSize == 'SM') {
        taskSizeH = "1";
    } else if (taskSize == 'MD') {
        taskSizeH = "2-3";
    } else if (taskSize == 'LG') {
        taskSizeH = "4+";
    }

    this.setState({
        serviceInfo: serviceInfo,
        selectedTime: selectedTime,
        taskSize: taskSizeH,
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
            borderBottomColor: "#E88D72",
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 20
          }}
        />  


        <View>

            <Text>Review Your Order</Text>
            <View>
                <Text>Your Task Request</Text>
                <Text>{this.state.serviceCategory}</Text>
                <Text>{this.state.selectedDay.dateString} at {this.state.selectedTime}</Text>
                <Text>Estimated: {this.state.taskSize} hours</Text>
            </View>
            <View>
                <Text>Payment Method: {this.state.paymentInfo.brand}</Text>
                <TouchableOpacity
                style={st.btn}
                onPress={() => this.getPaymentInfo()}>
                    <Text style={st.btnText}>Select Payment Method</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={st.btn}
                onPress={() => this.placeOrder()}>
                    <Text style={st.btnText}>Place Order</Text>
            </TouchableOpacity>

        </View>


      </View>
    );
  }



}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});

export default ReviewOrder;