import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView } from "react-native";

class ViewOrders extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: []
      }
    };

    componentDidMount() {
        AsyncStorage.getItem('userId', (err, result) => {        
            fetch('http://localhost:8080/api/getMyOrders?id=' + result)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.orders);
                this.setState({
                    orders: responseJson.orders
                });
            })
            .catch((error) =>{
                console.error(error);
            });
        });
    }
        
    retrieveOrders() {
        return this.state.orders.map(data => {
            return (
                <View style={{height:80, margin: 12, borderWidth: 2, borderRadius: 4}}>
                    <View style={{margin: 10}}>
                        <Text>{data.sellerName}</Text>
                        <Text>{data.serviceCategory}</Text>
                    </View>
                </View>
            );
        });
    }    


    render() {
        console.log(this.state.orders);
        return (
            <ScrollView>
                {this.retrieveOrders()}
            </ScrollView>
        )
    }
}
      
const st = require("./../styles/style.js");
export default ViewOrders;