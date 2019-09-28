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
import Icon from "react-native-vector-icons/EvilIcons";
import CategoryCard from './CategoryCard';
import ServicePreview from '../../ServicePreview';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={st.container}>
          <View
            style={{
              height: this.startHeaderHeight,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 8,
                backgroundColor: "white",
                marginHorizontal: 20,
                borderColor: "lightgrey",
                borderWidth: 0.75,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 25 : null,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="search" size={40} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Try 'Lawn'"
                placeholderTextColor="lightgrey"
                style={{
                  flex: 1,
                  fontWeight: "300",
                  fontSize: 20,
                  backgroundColor: "white",
                  borderRadius: 30
                }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  paddingHorizontal: 20
                }}
              >
                What service are you looking for?
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <TouchableOpacity
                    onPress={this.props.selectServiceCategory}
                  >
                    <View
                      style={{
                        overflow: "hidden",
                        height: 130,
                        width: 130,
                        marginLeft: 20,
                        borderWidth: 0.5,
                        borderColor: "#dddddd",
                        borderRadius: 10,
                        borderBottomColor: "#43B14B",
                        borderBottomWidth: 3
                      }}
                    >
                      <CategoryCard
                        imageUri={require("../../../image/LawnMowing.jpg")}
                        name="Lawn Mowing"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.selectServiceCategory}
                  >
                    <View
                      style={{
                        overflow: "hidden",
                        height: 130,
                        width: 130,
                        marginLeft: 20,
                        borderWidth: 0.5,
                        borderColor: "#dddddd",
                        borderRadius: 10,
                        borderBottomColor: "#398FC7",
                        borderBottomWidth: 3
                      }}
                    >
                      <CategoryCard
                        imageUri={require("../../../image/SnowRemoval.jpg")}
                        name="Snow Removal"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.selectServiceCategory}
                  >
                    <View
                      style={{
                        overflow: "hidden",
                        height: 130,
                        width: 130,
                        marginLeft: 20,
                        borderWidth: 0.5,
                        borderColor: "#dddddd",
                        borderRadius: 10,
                        borderBottomColor: "#FFDB15",
                        borderBottomWidth: 3
                      }}
                    >
                      <CategoryCard
                        imageUri={require("../../../image/CleaningServices.jpg")}
                        name="Cleaning Services"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.selectServiceCategory}
                  >
                    <View
                      style={{
                        overflow: "hidden",
                        height: 130,
                        width: 130,
                        marginLeft: 20,
                        borderWidth: 0.5,
                        borderColor: "#dddddd",
                        borderRadius: 10,
                        borderBottomColor: "#AB202A",
                        borderBottomWidth: 3
                      }}
                    >
                      <CategoryCard
                        imageUri={require("../../../image/HandymanServices.jpg")}
                        name="Handyman"
                      />
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
           <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  paddingHorizontal: 20
                }}
              >
                Top services
              </Text>
              <View
                style={{ height: 230, marginTop: 10, flexDirection: "row" }}
              >
                <ScrollView
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1 }}
                >
                  <ServicePreview
                    style={{ flexDirection: "row" }}
                    navigation={this.props.navigation}
                  />
                </ScrollView>
              </View>
            </View>
          </ScrollView> 
        </View>
      </SafeAreaView>
    );
  }
}

const st = require("../../../styles/style.js");
export default HomeView;
