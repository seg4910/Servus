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
            sellerPhone: '',
            sellerEmail: '',
            price: 0,
            serviceCategory: '',
            ratings: undefined,
            city: '',
            servicePhoto: '',
            sellerPhoto: null
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
                    }, function () {
                        if (this.state.serviceInfo) {
                            this.setState({
                                serviceId: this.state.serviceInfo[0].id,
                                sellerId: this.state.serviceInfo[0].sellerID,
                                serviceName: this.state.serviceInfo[0].serviceName,
                                serviceDescription: this.state.serviceInfo[0].serviceDescription,
                                sellerName: this.state.serviceInfo[0].sellerName,
                                price: this.state.serviceInfo[0].priceHr,
                                serviceCategory: this.state.serviceInfo[0].serviceCategory,
                                locationId: this.state.serviceInfo[0].locationId,
                                servicePhoto: this.state.serviceInfo[0].photo,
                            });
                            fetch(`http://localhost:8080/api/getAccountInfo?type=${'sellers'}&id=${this.state.serviceInfo[0].sellerID}`)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        sellerPhoto: responseJson.photo,
                                        sellerPhone: responseJson.phone,
                                        sellerEmail: responseJson.email,
                                    })
                                })
                            fetch('http://localhost:8080/api/getRatings?id=' + this.state.serviceInfo[0].id)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        ratings: responseJson.ratingInfo
                                    })
                                })

                            fetch('http://localhost:8080/api/getLocation?id=' + this.state.serviceInfo[0].locationId)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        city: responseJson.locationInfo[0].city
                                    })
                                })

                        } else {
                            //navigate to Create Account
                            alert("Something went wrong");
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    //navigate to purchase service screen
    viewAvailability = () => {
        //alert('sellerid: ' + this.state.sellerId)
        this.props.navigation.navigate('ServiceAvailability', {
            serviceInfo: this.state.serviceInfo,
            sellerPhoto: this.state.sellerPhoto
        });
    }

    render() {
        return (
            <ServiceView
                viewAvailability={this.viewAvailability}
                serviceName={this.state.serviceName}
                sellerName={this.state.sellerName}
                serviceDescription={this.state.serviceDescription}
                minPrice={this.state.minPrice}
                maxPrice={this.state.maxPrice}
                serviceCategory={this.state.serviceCategory}
                ratings={this.state.ratings}
                city={this.state.city}
                price={this.state.price}
                sellerPhoto={this.state.sellerPhoto}
                servicePhoto={this.state.servicePhoto}
                sellerEmail={this.state.sellerEmail}
                sellerPhone={this.state.sellerPhone}
            />
        );
    }
}

const st = require('../styles/style.js');
export default Service;