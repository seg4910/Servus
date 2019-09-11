import React, { Component } from "react";
import { View, Text, ScrollView, AsyncStorage } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const fetch = require("node-fetch");

class ServicePreview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        servicePreviews: [],
        username: "",
        selectedService: 0
      };
    };

    componentDidMount() {
        AsyncStorage.getItem('userId', (err, result) => {        
            fetch("http://localhost:8080/api/getServicePreviews")
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                {
                    servicePreviews: responseJson.servicePreviews
                },
                function() {
                    if (this.state.servicePreviews) {
                    var serviceCount = Object.keys(this.state.servicePreviews);
                    } else {
                    //navigate to Create Account
                    alert("Something went wrong");
                    }
                }
                );
            })
            .catch(error => {
                console.error(error);
            });
        });
    }    

      selectService = (id) => {
        if (id !== 0) {
          this.props.navigation.navigate("Service", {
            selectedService: id
          });
        }
      };
    
      servicePreviewList() {
        return this.state.servicePreviews.map(data => {
          return (
            <Card style={{ height: 30, width: 30 }} key={data.id}>
              <Text style={{ fontSize: 30 }}>{data.serviceName}</Text>
              <Text style={{ marginBottom: 10 }}>{data.serviceDescription}</Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title="VIEW NOW"
                onPress={() => this.selectService(data.id)}
              />
            </Card>
          );
        });
      }
    
      render() {
        const { navigation } = this.props;
        return (
          <ScrollView contentContainerStyle={st.container}>{this.servicePreviewList()}</ScrollView>
        );
      }
}
      
const st = require("./../styles/style.js");
export default ServicePreview;