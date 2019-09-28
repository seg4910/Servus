import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Button,
  TouchableOpacity,
  Picker
} from "react-native";
import StarRating from "react-native-star-rating";
import { IndicatorViewPager, PagerDotIndicator} from "rn-viewpager";
import StepIndicator from "react-native-step-indicator";
import DatePicker from 'react-native-datepicker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Moment from 'moment';

class ScheduleService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      lawnSize: null,
      serviceInfo: [],
      selectedDay: '',
      selectedDayAvailableTimes: [],
      taskSize: '',
      shifts: [],
      availableDates: {}
    };
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
    console.log(availableDates);

    this.getShiftsSelectedDay(selectedDay, availableDates);

    this.setState({
      serviceInfo: serviceInfo,
      sellerName: serviceInfo[0].sellerName,
      serviceCategory: serviceInfo[0].serviceCategory,
      minPrice: serviceInfo[0].minPrice,
      maxPrice: serviceInfo[0].maxPrice,
      selectedDay: selectedDay,
      taskSize: taskSize,
      availableDates: availableDates,
    });

   
  }

  // navigate to the final review order page
  reviewOrder() {
    this.props.navigation.navigate("ReviewOrder", {
      serviceInfo: this.state.serviceInfo,
      selectedTime: this.state.selectedTime,
      taskSize: this.state.taskSize,
      selectedDay: this.state.selectedDay
    });
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

          <Calendar
            markedDates={{[this.state.selectedDay.dateString]: {selected: true}}}
            onDayPress={(day) => {this.getShiftsSelectedDay(day, this.state.availableDates)}}
            onDayLongPress={(day) => {this.getShiftsSelectedDay(day)}}            
          />
          
          <Text>Available Times for {this.state.selectedDay.dateString}</Text>
          <Picker
            selectedTime={this.state.selectedTime}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedTime: itemValue})
            }>
            {this.state.shifts}
          </Picker>

          <TouchableOpacity
                style={st.btn}
                onPress={() => this.reviewOrder()}>
                <Text style={st.btnText}>Review Order</Text>
          </TouchableOpacity>

      </View>
    );
  }


  getShiftsSelectedDay = (day, availableDates) => {

    this.setState({selectedDay: day});

    // loop through the days the seller is available and find the shift information for the day
    // that the buyer has selected
    let todaysShifts = null;

    Object.keys(availableDates).map(function(key) {
      if (key == day.dateString) {
        todaysShifts = availableDates[key];
      }
    });

    // loop through all the shifts for the selected day and add them to an array
    // which will be used for drop down (this can be optimized)
    this.state.shifts = [];
    if (todaysShifts != null) {
      todaysShifts.map((shift) => {
        //this.state.selectedDayAvailableTimes.push(shift);
        this.state.shifts.push(<Picker.Item label={Moment(shift.startHour).format("HH:mm")} value={Moment(shift.startHour).format("HH:mm")} />);      
      });
    } else {
      this.state.shifts.push(<Picker.Item label="No available shifts" value="java" />);
    }
  }


}

const st = require("./../styles/style.js");
const styles = StyleSheet.create({});

export default ScheduleService;