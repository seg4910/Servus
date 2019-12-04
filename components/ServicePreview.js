import React, { Component } from "react";
import { View, Text, ScrollView, AsyncStorage, TouchableOpacity, Image } from "react-native";
import { Button, Card } from "react-native-elements";

import ServiceCard from './views/appViews/ServiceCard.js';

const fetch = require("node-fetch");

class ServicePreview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        servicePreviews: [],
        username: '',
        selectedService: 0,
        serviceCat: ''
      };
    };

    componentWillReceiveProps(props) {
      this.loadData();
    }

    componentDidMount() {
      this.loadData()
    }
    
    loadData = () => {
      const serviceCat = this.props.navigation.getParam("serviceCat","ALL");
      this.setState({serviceCat: serviceCat});

        AsyncStorage.getItem('userId', (err, result) => {        
            fetch(`http://localhost:8080/api/getServicePreviews/?serviceCat=${serviceCat}`)
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
           <ServiceCard 
              id = {data.id}
              sellerName = {data.sellerName}
              serviceName = {data.serviceName}
              serviceDescription = {data.serviceDescription}
              priceHr = {data.priceHr}
              selectService = {this.selectService}
              serviceCat = {data.serviceCategory}
              servicePhoto = {data.photo}
           />
          );
        });
      }
    
      render() {
        const { navigation } = this.props;
        return (
          <ScrollView contentContainerStyle={st.container}><View>{this.servicePreviewList()}</View></ScrollView>
        );
      }
}
      
const st = require("./../styles/style.js");
export default ServicePreview;