import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Agenda } from 'react-native-calendars';
import Moment from 'moment';
import StarRating from "react-native-star-rating";

const fetch = require("node-fetch");

class ServiceAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: '',
      shiftInfo: [],
      shiftDays: [],
      availableDates: {},
      serviceInfo: [],
      selectedDay: ''
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const serviceInfo = JSON.parse(JSON.stringify(navigation.getParam('serviceInfo', 'NO-NAME')));
    const sellerPhoto = JSON.parse(JSON.stringify(navigation.getParam('sellerPhoto', 'NO-NAME')));

    AsyncStorage.getItem('userId', (err, result) => {
      fetch(`http://localhost:8080/api/getSellerAvailability?sellerId=${serviceInfo[0].sellerID}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            shiftInfo: responseJson.shiftInfo,
            serviceInfo: serviceInfo,
            sellerPhoto: sellerPhoto
          }, function () {
            if (this.state.shiftInfo) {
              this.setState({ sellerId: serviceInfo[0].sellerID });
              this.state.shiftInfo.map((s) => {
                let day = Moment(s.day).format('YYYY-MM-DD');

                // push all unqiue days that the seller is available to an array
                this.state.shiftDays.indexOf(day) === -1 ? this.state.shiftDays.push(day) : console.log('Day already exists');
              });

              // get all the shifts, for all the unique days
              this.getDailyShifts();

            } else {
              alert("Something went wrong");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  // navigate to OrderDetails where we get information about order request
  bookService = () => {
    this.props.navigation.navigate('OrderDetails', {
      serviceInfo: this.state.serviceInfo,
      sellerPhoto: this.state.sellerPhoto,
      availableDates: this.state.availableDates,
      selectedDay: this.state.selectedDay,
    });
  }

  // save the selected day for ScheduleService component
  selectDay = (day) => {
    this.setState({
      selectedDay: day
    })
  }

  render() {
    const { navigation } = this.props;
    const serviceInfo = JSON.parse(JSON.stringify(navigation.getParam('serviceInfo', 'NO-NAME')));

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
              {serviceInfo[0].serviceName}
            </Text>
            <Text style={{ fontSize: 15 }}>
              {serviceInfo[0].serviceCategory} Service
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
          {
            this.state.sellerPhoto ?
              <Image
                source={{uri: this.state.sellerPhoto}}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 55
                }}
              />
            : <Icon name="user-circle" size={83} />
          }
        </View>

          <Agenda
            items={this.state.availableDates}
            loadItemsForMonth={this.getDailyShifts.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            // callback that gets called on day press
            onDayPress={(day) => { this.selectDay(day) }}
            // callback that gets called when day changed while scrolling through agenda
            onDayChange={(day) => { this.selectDay(day) }}
          />

        <View style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10, marginTop:10 }}>
          <TouchableOpacity
            style={st.btnPrimary}
            onPress={this.bookService}>
            <Text style={st.btnText}>BOOK SERVICE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // set all the items for the Agenda based on the days and shifts on those days
  getDailyShifts() {
    let availableDates = {};
    this.state.shiftDays.forEach((day) => {
      availableDates[day] =
        this.getShiftsForDay(day)
    });
    this.setState({ availableDates: availableDates });
  }

  // for each day the seller is available, push all the shifts for that day to an array
  getShiftsForDay(day) {
    let shifts = [];
    this.state.shiftInfo.map((si) => {
      let siDay = Moment(si.day).format('YYYY-MM-DD');
      if (siDay == day) {
        shifts.push({ startHour: si.startHour, endHour: si.endHour });
      }
    });
    return shifts;
  }

  // the view that each agenda card will take
  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 15 }}>{this.state.serviceInfo[0].serviceName}</Text>
        <Text style={{ justifyContent: 'center', fontSize: 27, fontWeight: '200', color: '#636e72' }}>
          {Moment(item.startHour).format('hh:mm A')} - {Moment(item.endHour).format('hh:mm A')}
        </Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={{ fontSize: 20 }}> No Availabilities </Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }


}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }
});
const st = require("./../styles/style.js");

export default ServiceAvailability;
