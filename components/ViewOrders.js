import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from 'moment';

const fetch = require("node-fetch");


class ViewOrders extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: null,
          refreshing: false,
          buyerNames: [],
      }
      this.viewOrder = this.viewOrder.bind(this);
    };

    componentDidMount() {
        this.retrieveOrderInfo();
    }

    retrieveOrderInfo = () => {
        function contains(a, obj) {
            var i = a.length;
            while (i--) {
               if (a[i].buyerId === obj.buyerId && a[i].buyerName === obj.buyerName) {
                   return true;
               }
            }
            return false;
        } 
        AsyncStorage.getItem('userId', (err, result) => {        
            fetch('http://localhost:8080/api/getMyOrders?id=' + result)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.orders);
                this.setState({
                    orders: responseJson.orders
                }, () => {
                    this.state.orders.map((order) => {
                    fetch(`http://localhost:8080/api/getAccountInfo?id=${order.buyerId}&type=users`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            const temporay_name = {
                                buyerId: responseJson.id,
                                buyerName: responseJson.name,
                            }
                            const newBuyerNames = contains(this.state.buyerNames, temporay_name) ? this.state.buyerNames : this.state.buyerNames.push(temporay_name);
                            this.setState({
                                buyernames: newBuyerNames,
                            })
                        })
                        .catch((error) =>{
                        console.error(error);
                        });
                    })     
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

      viewOrder(id) {
          this.props.navigation.navigate('Order', {
              id: id
          });
      }

      retrieveOrders = (status) => {
        if (this.state.orders) {
          return this.state.orders.map((data) => {
            if (data.serviceCategory == 'LM') {
                serviceCategory = 'Lawn Services'
            } else if (data.serviceCategory == 'SR') {
                serviceCategory = 'Snow Removal'
            } else if (data.serviceCategory == 'CL') {
                serviceCategory = 'Cleaning Services'
            } else if (data.serviceCategory == 'HM') {
                serviceCategory = 'Handy Man Services'
            }

            if(data.status == status) {

                if (data.size == 'SM') {
                    duration = '0-1 Hours'
                } else if (data.size == 'MD') {
                    duration = '1-2 Hours'
                } else if (data.size == 'LG') {
                    duration = '2-3 Hours'
                }

              return (
                <TouchableOpacity onPress={() => this.viewOrder(data.id)}key={data.id} elevation={2} style={{padding: 20, height:150, margin: 20, marginBottom:5, borderRadius:8, backgroundColor: '#fff',
                shadowColor:'black',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 5,
                }}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:20}}>{
                        this.state.buyerNames.map((name) => name.buyerId === data.buyerId ? name.buyerName : "")
                      }</Text>
                      <View style={{paddingTop:10, flexDirection:'row'}}>
                        <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="clock-outline" size={25} />
                        <Text style={{fontSize:16}}>{duration}</Text>                        
                      </View>
                      <View style={{paddingTop:0, flexDirection:'row'}}>
                        <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="map-marker" size={25} />
                        <Text style={{fontSize:16}}>300 Bank Street, Ottawa</Text>                        
                      </View>

                      {data.status=='PENDING' && (
                          <Text style={{marginTop:10,fontSize:16, color:'grey', paddingBottom:5}}>{data.status}</Text>  
                      )}
                      {data.status=='ACCEPTED' && (
                          <Text style={{marginTop:10,fontSize:16, color:'green', paddingBottom:5}}>{data.status}</Text>  
                      )}  
                      {data.status=='COMPLETE' && (
                          <Text style={{marginTop:10,fontSize:16, color:'green', paddingBottom:5}}>{data.status}</Text>  
                      )}   

                    </View>
                    <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:45, fontWeight:'bold', color:'#E88D72'}}>{Moment(data.dateScheduled).format('DD')}</Text>
                      <Text style={{fontSize:20, color: '#E88D72', marginTop:-13}}>{Moment(data.dateScheduled).format('MMMM')}</Text>
                      <Text style={{fontSize:16, color:'#7f8c8d', paddingTop:7}}>{Moment(data.dateScheduled).format('LT')}</Text>
                    </View>                   
                  </View>
                 </TouchableOpacity>
              );
            }
          })
        }
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
                    <Text style={{margin:20,marginBottom:10,fontWeight:'bold', fontSize:25}}>Requests</Text>
                    {this.retrieveOrders('PENDING')}
                    <Text style={{margin:20,marginBottom:10,fontWeight:'bold', fontSize:25}}>Upcoming Orders</Text>
                    {this.retrieveOrders('CONFIRMED')}
                    <Text style={{margin:20,marginBottom:10,fontWeight:'bold', fontSize:25}}>Past Orders</Text>
                    {this.retrieveOrders('COMPLETE')}                    
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