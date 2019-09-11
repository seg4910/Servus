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

class CheckoutServiceLawnMowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      lawnSize: null,
      serviceInfo: []
    };
    this.chooseLawnSize = this.chooseLawnSize.bind(this);
    this.continueToPayment = this.continueToPayment.bind(this);
  }

  componentDidMount() {
    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo",
      "NO-SERVICE"
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

  chooseLawnSize = size => {
    this.setState({
      lawnSize: size
    });
  };

  continueToPayment = () => {
    const serviceInfo = this.props.navigation.getParam(
      "serviceInfo",
      "NO-SERVICE"
    );
    this.props.navigation.navigate("PurchaseService", {
      serviceInfo: serviceInfo
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

        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={this._renderDotIndicator()}
        >
          <View>
            <View>
              <StepIndicator
                stepCount={3}
                // renderStepIndicator={this.renderStepIndicator}
                customStyles={secondIndicatorStyles}
                currentPosition={0}
                labels={[]}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 20 }}>Select your lawn size:</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", marginTop: 30 }}>
              <View style={{ flex: 1, height: 100 }}>
                <View
                  style={{
                    width: 110,
                    height: 110,
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../image/grass.png")}
                    style={{
                      width: 80,
                      height: 80
                    }}
                  />
                </View>
                <Button title="SM" onPress={() => this.chooseLawnSize("SM")} />
              </View>

              <View style={{ flex: 1, height: 100 }}>
                <View
                  style={{
                    width: 110,
                    height: 110,
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../image/grass.png")}
                    style={{
                      width: 100,
                      height: 100
                    }}
                  />
                </View>
                <Button title="MD" onPress={() => this.chooseLawnSize("MD")} />
              </View>

              <View style={{ flex: 1, height: 100 }}>
                <View
                  style={{
                    width: 110,
                    height: 110,
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../image/grass.png")}
                    style={{
                      width: 130,
                      height: 130
                    }}
                  />
                </View>
                <Button title="LG" onPress={() => this.chooseLawnSize("LG")} />
              </View>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={st.heading2}>
                Selected Size: {this.state.lawnSize}
              </Text>
              <TouchableOpacity
                style={st.btn}
                onPress={() => this.continueToPayment()}
              >
                <Text style={st.btnText}>Continue To Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </IndicatorViewPager>
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

const st = require("./../styles/style.js");
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
export default CheckoutServiceLawnMowing;