import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";

class OrderView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    if (this.props.orderInfo) {
      if (this.props.orderInfo[0].size == 'SM') {
          duration = '0 - 1 Hours'
      } else if (this.props.orderInfo[0].size == 'MD') {
          duration = '1 - 2 Hours'
      } else if (this.props.orderInfo[0].size == 'LG') {
          duration = '2 - 3 Hours'
      }
  }

    return (
       <View>
           <Text>Test:</Text>
       </View>

    );
  }
}

const st = require("../../../styles/style.js");
export default OrderView;
