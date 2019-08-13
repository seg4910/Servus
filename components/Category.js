import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

class Category extends Component {
  render() {
    return (
      <View
        style={{
          overflow: "hidden",
          height: 130,
          width: 130,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          borderRadius: 10
        }}
      >
        <View style={{ flex: 3 }}>
          <Image
            source={this.props.imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover"
            }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

export default Category;
