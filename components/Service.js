import React, { Component } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import ServiceView from "./views/appViews/ServiceView.js";

const fetch = require("node-fetch");

class Service extends Component {
    constructor(props) {
      super(props);
      this.state = {
        serviceInfo: [],
        sellerId: '',
        serviceName: '',
        serviceDescription: '',
        sellerName: '',
        price: 0,
        serviceCategory: '',
        ratings: undefined,
        city: ''
      }      
    };

    componentDidMount() {
        const { navigation } = this.props;
        const id = JSON.parse(JSON.stringify(navigation.getParam('selectedService', 'NO-NAME')));
        
        AsyncStorage.getItem('userId', (err, result) => {   
            // retrieve the current service based on the id that was passed from ServicePreview     
            fetch('http://localhost:8080/api/getServiceInfo?id=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                serviceInfo: responseJson.serviceInfo
            }, function(){
                if(this.state.serviceInfo){
                this.setState({serviceId: this.state.serviceInfo[0].id});
                this.setState({sellerId: this.state.serviceInfo[0].sellerID});
                this.setState({serviceName: this.state.serviceInfo[0].serviceName});
                this.setState({serviceDescription: this.state.serviceInfo[0].serviceDescription});
                this.setState({sellerName: this.state.serviceInfo[0].sellerName});
                this.setState({price: this.state.serviceInfo[0].priceHr});
                this.setState({serviceCategory: this.state.serviceInfo[0].serviceCategory});
                this.setState({city: this.state.serviceInfo[0].city})

                fetch('http://localhost:8080/api/getRatings?id=' + this.state.serviceInfo[0].id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        ratings: responseJson.ratingInfo
                    })
                })                

                } else {
                //navigate to Create Account
                alert("Something went wrong");
        
                }
            });
            })
            .catch((error) =>{
            console.error(error);
            });
        });
    }    

    //navigate to purchase service screen
    viewAvailability = () => {
      //alert('sellerid: ' + this.state.sellerId)
      this.props.navigation.navigate('ServiceAvailability', {
          serviceInfo: this.state.serviceInfo
        });
    }

    render() {
        const { navigation } = this.props;
        return (
          <ServiceView
            viewAvailability = {this.viewAvailability}
            serviceName = {this.state.serviceName}
            sellerName = {this.state.sellerName}
            serviceDescription = {this.state.serviceDescription}
            minPrice = {this.state.minPrice}
            maxPrice = {this.state.maxPrice}
            serviceCategory = {this.state.serviceCategory}
            ratings = {this.state.ratings}
            city = {this.state.city}
            price = {this.state.price}
          />
        );
    }
}
      
const st = require('../styles/style.js');
export default Service;