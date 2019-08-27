import React, { Component } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";

class ViewService extends Component {
    constructor(props) {
      super(props);
      this.state = {
        serviceInfo: [],
        serviceName: '',
        serviceDescription: '',
        sellerName: '',
        minPrice: 0,
        maxPrice: 0,
        serviceCategory: '',
      }      
    };

    componentDidMount() {
        const { navigation } = this.props;
        const id = JSON.parse(JSON.stringify(navigation.getParam('selectedService', 'NO-NAME')));
        AsyncStorage.getItem('userId', (err, result) => {        
            fetch('http://localhost:8080/api/getServiceInfo?service=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                serviceInfo: responseJson.serviceInfo
            }, function(){
                if(this.state.serviceInfo){
                this.setState({serviceId: this.state.serviceInfo[0].id});
                this.setState({serllerId: this.state.serviceInfo[0].sellerId});
                this.setState({serviceName: this.state.serviceInfo[0].serviceName});
                this.setState({serviceDescription: this.state.serviceInfo[0].serviceDescription});
                this.setState({sellerName: this.state.serviceInfo[0].sellerName});
                this.setState({minPrice: this.state.serviceInfo[0].minPrice});
                this.setState({maxPrice: this.state.serviceInfo[0].maxPrice});
                this.setState({serviceCategory: this.state.serviceInfo[0].serviceCategory});
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
    purchaseService = () => {
        var serviceCategory = 'CheckoutService'+this.state.serviceCategory;
        this.props.navigation.navigate(serviceCategory, {
        serviceInfo: this.state.serviceInfo
        });
    }

    render() {
        const { navigation } = this.props;
        return (
          <View style={st.container}>
              <Text style={st.heading1}>{this.state.serviceName}</Text>
              <Text style={st.heading2}>Seller: {this.state.sellerName}</Text>
              <Text style={st.heading2}>Description: {this.state.serviceDescription}</Text>
              <Text style={st.heading2}>Price Range: {this.state.minPrice} - {this.state.maxPrice}</Text>
    
              <Button title='Order Service' onPress={() => this.purchaseService()}/>
          </View>
        );
      }
}
      
const st = require('../styles/style.js');
export default ViewService;