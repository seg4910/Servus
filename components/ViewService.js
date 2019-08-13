import React, { Component } from "react";
import { View, Text } from "react-native";

class ViewService extends Component {
    constructor(props) {
      super(props);
    };


    render() {
        return (
            <View>
                <Text>Service; Hello World</Text>
            </View>
        )
    }
}
      

export default ViewService;