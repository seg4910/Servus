import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  AsyncStorage
} from "react-native";
import {Agenda} from 'react-native-calendars';
import Moment from 'moment';

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
  
    AsyncStorage.getItem('userId', (err, result) => {        
        fetch('http://localhost:8080/api/getSellerAvailability?seller=' + serviceInfo[0].sellerID)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                shiftInfo: responseJson.shiftInfo,
                serviceInfo: serviceInfo
            }, function(){
                if (this.state.shiftInfo){
                    this.setState({sellerId: serviceInfo[0].sellerID});
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
        .catch((error) =>{
            console.error(error);
        });
    });
}

// navigate to OrderDetails where we get information about order request
bookService = () => {
    this.props.navigation.navigate('OrderDetails', {
        serviceInfo: this.state.serviceInfo,
        availableDates: this.state.availableDates,
        selectedDay: this.state.selectedDay,
        shiftDays: this.state.shiftDays
    });
}

// save the selected day for ScheduleService component
selectDay = (day) => {
    this.setState({
        selectedDay: day
    })
}

  render() {
    return (
        <View style={{height: 600}}>
            <Agenda
            items={this.state.availableDates}
            loadItemsForMonth={this.getDailyShifts.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            // callback that gets called on day press
            onDayPress={(day)=>{this.selectDay(day)}}
            // callback that gets called when day changed while scrolling through agenda
            onDayChange={(day)=>{this.selectDay(day)}}
            />
        <Button title='Book Service' onPress={this.bookService}/>
        </View>
    );  
  }

    // TODO: If there is no agenda items for the current day, create an empty one so
    // so that future ones will show up and agenda doesnt get stuck loading

    // set all the items for the Agenda based on the days and shifts on those days
    getDailyShifts() {
        let availableDates = {};
        this.state.shiftDays.forEach((day) => {
            availableDates[day] = 
                this.getShiftsForDay(day)
        });
        this.setState({availableDates: availableDates}); 
    }

    // for each day the seller is available, push all the shifts for that day to an array
    getShiftsForDay(day) {
        let shifts = [];
        this.state.shiftInfo.map((si) => {
            let siDay = Moment(si.day).format('YYYY-MM-DD');
            if (siDay == day) {
                shifts.push({startHour: si.startHour, endHour: si.endHour});
            }
        });
        return shifts;        
    }
    
    // the view that each agenda card will take
    renderItem(item) {
        return (
            <View style={[styles.item, {height: 80}]}><Text>{item.startHour}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
        <View><Text>No Availabilities</Text></View>
        );
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }


}
const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }
  });
const st = require("./../styles/style.js");

export default ServiceAvailability;
