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
    //console.log('ORDER INFO: '+ JSON.stringify(this.props.orderInfo));
    //console.log('ORDER INFO: '+ this.props.orderInfo[0]);    
    return (
       <View>
           <Text>Test</Text>
       </View>

    );
  }
}

const st = require("../../../styles/style.js");
export default OrderView;
