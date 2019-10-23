import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView, RefreshControl } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from 'moment';


class ViewOrders extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: null,
          refreshing: false
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
     

    _onRefresh = () => {
        this.setState({refreshing: true});
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
        this.setState({refreshing: false});
      }    

      retrieveOrders() {
        var serviceCategory = null;
        return this.state.orders.map(data => {
            if (data.serviceCategory == 'LM') {
                serviceCategory = 'Lawn Services'
            } else if (data.serviceCategory == 'SR') {
                serviceCategory = 'Snow Removal'
            } else if (data.serviceCategory == 'CL') {
                serviceCategory = 'Cleaning Services'
            } else if (data.serviceCategory == 'HM') {
                serviceCategory = 'Handy Man Services'
            }

            return (
                <View elevation={2} style={{height:150, margin: 20, marginBottom:5, borderRadius:8, backgroundColor: '#fff',
                shadowColor:'black',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 5,
                }}>
                    <View style={{marginLeft: 20, marginTop: 10}}>
                        <Text style={{fontWeight:'bold', fontSize:23}}>{data.sellerName}</Text>
                        <View style={{padding:5, marginLeft:20}}>
                            <View style={{flexDirection:'row'}}>
                                <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="clock-outline" size={25} />
                                <Text style={{fontSize:16, color:'#7f8c8d'}}>{Moment(data.dateScheduled).format('MMM Do LT')}</Text>
                            </View>
                            <Text style={{fontSize:16, color:'#7f8c8d', paddingBottom:5}}>{serviceCategory}</Text>                                   

                            <Text style={{marginTop:10,fontSize:16, color:'green', paddingBottom:5}}>ACTIVE</Text>                                   
                        </View>
                    </View>
                </View>
            );
        });
    }   

    render() {
        console.log(this.state.orders);
        if (this.state.orders) {
            return (
            <ScrollView refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
                {this.state.orders && (
                <ScrollView>
                    {this.retrieveOrders()}
                </ScrollView>
                )}
            </ScrollView>
        )} else {
            return (
                <ScrollView contentContainerStyle={{flex:1}} refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                    <View style={{flex:1,flexDirection:'column', justifyContent:'center', alignItems:'center', marginBottom:150}}>
                        <Icon2 style={{alignSelf:'center', color:'#E88D72'}} name="file-alert-outline" size={100} /> 
                        <Text style={{fontSize:22, paddingTop:15}}>NO ORDERS</Text>
                        <Text style={{fontSize: 16, paddingTop:10}}>You don't have any orders in your history</Text>
                    </View>
                </ScrollView>
            )
        }

    }
}
      
const st = require("./../styles/style.js");
export default ViewOrders;