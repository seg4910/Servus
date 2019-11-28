import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import StarRating from "react-native-star-rating";
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import LottieView from 'lottie-react-native';


class ScheduleService extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo",
      "NO-SERVICE"
    );
    const selectedDay = this.props.navigation.getParam(
      "selectedDay", "NO-SERVICE"
    );
    const taskSize = this.props.navigation.getParam(
      "taskSize", "NO-SERVICE"
    );
    const availableDates = this.props.navigation.getParam(
      "availableDates", "NO-AVAILABLEDATES"
    );
    const sellerPhoto = JSON.parse(JSON.stringify(this.props.navigation.getParam('sellerPhoto', 'NO-NAME')));

    this.setState({
      serviceInfo: serviceInfo,
      selectedDay: selectedDay,
      taskSize: taskSize,
      shifts: [],
      availableDates: availableDates,
      selectedTime: availableDates[selectedDay.dateString],
      sellerPhoto: sellerPhoto
    });

  }

  // navigate to the final review order page
  reviewOrder = () => {
    this.props.navigation.navigate("ReviewOrder", {
      serviceInfo: this.state.serviceInfo,
      selectedTime: this.state.selectedTime,
      taskSize: this.state.taskSize,
      selectedDay: this.state.selectedDay,
      sellerPhoto: this.state.sellerPhoto
    });
  }

  formatTime = (shift) => {

    return `${Moment(shift.startHour).format("HH:mm")} - ${Moment(shift.endHour).format("HH:mm")}`;
  }

  getMarkedDates = () => {
    const markedDates = {}
    for (let date_key in this.state.availableDates) {
      if (date_key != this.state.selectedDay.dateString) {
        markedDates[date_key] = { marked: true }
      } else {
        markedDates[date_key] = { marked: true, selected: true }
      }
    }
    return markedDates;
  }

  render() {
    if (this.state) {
      const markedDates = this.getMarkedDates();
      const todaysShifts = this.state.availableDates[this.state.selectedDay.dateString];
      const selectedShifts = todaysShifts === undefined ?
        <Picker.Item key={'NA'} label="No available shifts" value="NA" />
        : todaysShifts.map((shift) =>
          <Picker.Item
            label={this.formatTime(shift)}
            value={this.formatTime(shift)} />
        );

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
                {this.state.serviceInfo[0].serviceName}
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
              source={{uri: this.state.sellerPhoto}}
              style={{
                width: 90,
                height: 90,
                borderRadius: 55
              }}
            />
          </View>

          <Calendar
            current={this.state.selectedDay.dateString}
            markedDates={markedDates}
            onDayPress={(day) => {
              this.setState({
                selectedDay: day,
                selectedTime: () => this.formatTime(todaysShifts[0]),
              });
            }}
          />

          <View style={{ alignItems: 'center', borderTopColor: '#dfe6e9', borderTopWidth: 2, paddingTop: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Available Times for {Moment(this.state.selectedDay.dateString).format("LL")}
            </Text>
            <View style={{ borderWidth: 1, borderColor: '#dfe6e9' }}>
              <Picker
                selectedValue={this.state.selectedTime}
                style={{ height: 50, width: 250 }}
                onValueChange={(selectedTime) => {
                  this.setState({ selectedTime: selectedTime })
                }
                }>
                {selectedShifts}
              </Picker>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.reviewOrder()}>
              <Text style={st.btnText}>Review Order</Text>
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

const st = require("./../styles/style.js");

export default ScheduleService;