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

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: []
    };
    this.chooseTaskSize = this.chooseTaskSize.bind(this);
    this.continueToPayment = this.continueToPayment.bind(this);
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

  chooseTaskSize = size => {
    this.setState({
      taskSize: size
    });
  };

  continueToPayment = () => {
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
            borderBottomColor: "#E88D72",
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 20
          }}
        />

          <View>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 20 }}>Estimated task length:</Text>
            </View>

            <View>
              <TouchableOpacity
                style={st.btn}
                onPress={() => this.chooseTaskSize("SM")}>
                <Text style={st.btnText}>1 Hour</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={st.btn}
                onPress={() => this.chooseTaskSize("MD")}>
                <Text style={st.btnText}>2-3 Hours</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={st.btn}
                onPress={() => this.chooseTaskSize("LG")}>
                <Text style={st.btnText}>4+ Hours</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={st.heading2}>
                Selected Size: {this.state.taskSize}
              </Text>
              <TouchableOpacity
                style={st.btn}
                onPress={() => this.continueToPayment()}
              >
                <Text style={st.btnText}>Continue To Payment</Text>
              </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} style={{ paddingBottom: 3 }} />;
  }

  renderViewPagerPage = data => {
    return (
      <View style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );
}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});
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