import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";
import StarRating from "react-native-star-rating";
import Moment from 'moment';
const fetch = require("node-fetch");


class ReviewOrder extends Component {
  constructor(props) {
    super(props);

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
    this.state = {
      taskSize: taskSizeHr,
      selectedTime: selectedTime[0],
      serviceInfo: serviceInfo,
      selectedDay: selectedDay,
      paymentInfo: '',
      noteToSeller: null
    };
  }

  formatTime(shift){
    return `${Moment(shift.startHour).format("HH:mm")} - ${Moment(shift.endHour).format("HH:mm")}`;
  }

  setPaymentInfo(paymentInfo) {
    this.setState({ paymentInfo: paymentInfo });
  }

  getPaymentInfo() {
    this.props.navigation.navigate("PaymentInfo", {
      setPaymentInfo: this.setPaymentInfo.bind(this)
    });
  }

  sendNotificationToSeller(orderId) {
    fetch(`https://fcm.googleapis.com/fcm/send`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAHyv-GIg:APA91bFcrY4DEMCl5SyfH4V8kjehp20BVYo7Ly5CQj5D5IJUSEQ6TKOl0cvlywN5wFdxgXBCTfCkxrR0z0iBCyhrdMnjYurwcAyu2MJU5Eq-BuX7gHojKCMb1TsQlJIYfx8_oDI5YND5'
      },
      body: JSON.stringify({
        "to": "eS0ItdmSsSs:APA91bEwkBvvHY_a_ed4pfA2cnVRpzXl--ld8QbLpSrdP1lJyoE7lRmOjmmJqymRag9K4YBP3JwWXgNmmAkiLkk6_G8PM21-0F65dh0OylWSGlK0WUeNIJD1V8qmTyrxlQKQXbSf-V0W",
        "notification": {
          "title": "You have a new order request!",
          "body": "Head to your orders to review it",
          "content_available": true,
          "priority": "high"
        },
        "data": {
          "title": "You have a new order request!",
          "body": "Head to your orders to review it",
          "orderId": orderId,
          "content_available": true,
          "priority": "high"
        }
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
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
          selectedTime: this.state.selectedTime,
          note: this.state.noteToSeller
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.sendNotificationToSeller(responseJson.orderId);
        })
        .catch(error => {
          console.log(error);
        });;
    });

    // do a check to make sure the order was processed?
    this.props.navigation.navigate('ServiceOrdered');


  }

  render() {
    const { navigation } = this.props;

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


        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Review Your Order</Text>

          <View style={{ marginLeft: 20 }}>

            <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#dfe6e9' }}>
              <Text style={{ fontSize: 20 }}>SERVICE</Text>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 18 }}>{this.state.serviceInfo[0].serviceName}</Text>
                <Text style={{ fontSize: 18 }}>{this.state.serviceInfo[0].serviceCategory}</Text>
              </View>
            </View>

            <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#dfe6e9' }}>
              <Text style={{ fontSize: 20 }}>DATE</Text>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontSize: 18 }}>{Moment(this.state.selectedDay.dateString).format('LL')}</Text>
                <Text style={{ fontSize: 18 }}>{this.formatTime(this.state.selectedTime)}</Text>
              </View>
            </View>

            <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#dfe6e9' }}>
              <Text style={{ fontSize: 20 }}>PAYMENT</Text>
              <View style={{ marginLeft: 30 }}>
                {this.state.paymentInfo != '' && <Text style={{ fontSize: 18 }}>{this.state.paymentInfo.brand}</Text>}
                {this.state.paymentInfo == '' && <Text onPress={() => this.getPaymentInfo()} style={{ fontSize: 18 }}>Select Payment Info</Text>}
              </View>
            </View>

            <View style={{ marginTop: 40, paddingBottom: 15 }}>
              <Text style={{ fontSize: 20 }}>Estimated Duration: {this.state.taskSize} hours</Text>
              <Text style={{ fontSize: 20 }}>Estimated Cost: {this.state.taskSize}</Text>
            </View>

            <TextInput onChangeText={(text) => this.setState({noteToSeller: text})} placeholder="Add a note.."/>
          </View>

        </View>


        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
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