import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";
import Moment from 'moment';
import OrderView from './views/appViews/OrderView';
import Modal from "react-native-modal";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const fetch = require("node-fetch");


class Order extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      taskSize: null,
      serviceInfo: [],
      selectedDay: '',
      paymentInfo: '',
      orderInfo: null,
      buyerInfo: null,
      isCancelModalVisible: false,
      orderId: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const orderId = JSON.parse(JSON.stringify(navigation.getParam('id', 'NO-ORDER')));
    this.setState({orderId: orderId});
    fetch('http://localhost:8080/api/viewOrder?id=' + orderId)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('Orders: ' + responseJson.order);
        this.setState({
            orderInfo: responseJson.order
        }, () => {
          fetch('http://localhost:8080/api/getAccountInfo?type=users&id=' + this.state.orderInfo[0].buyerId)
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                  buyerInfo: responseJson
              })
          })
        });
    })
    .catch((error) =>{
        console.error(error);
    });
  }

  toggleRequestModal(resp) {
    if (resp == 'CANCEL') {
      this.setState({ isCancelModalVisible : !this.state.isCancelModalVisible});
    }
  }

  respondToRequest(resp) {
    if (resp == 'CANCEL') {
       
        this.setState({ isCancelModalVisible: !this.state.isCancelModalVisible });
         
        fetch('http://localhost:8080/api/respondToRequest?resp=CANCELLED&id=' + this.state.orderId, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
           },          
        })
        .catch((error) =>{
          console.error(error);
       });
       
       this.props.navigation.state.params.onGoBack();
       this.props.navigation.goBack();

    }
}  

  render() {
    const { navigation } = this.props;

    if (this.state.orderInfo) {
      if (this.state.orderInfo[0].size == 'SM') {
          duration = '0 - 1 Hours'
      } else if (this.state.orderInfo[0].size == 'MD') {
          duration = '1 - 2 Hours'
      } else if (this.state.orderInfo[0].size == 'LG') {
          duration = '2 - 3 Hours'
      }
  }

    return (
      <View style={{flex:1}}>
          {this.state.buyerInfo && (
              <View style={{flex:1, padding: 20}}>     
                  <View style={{marginBottom:40,padding:10, borderBottomColor:'#dfe6e9', borderBottomWidth:2}}>       
                     
                  {this.state.orderInfo[0].status=='PENDING' && (
                            <Text style={{fontSize:25, fontWeight:'bold'}}>Order Request</Text>
                  )}

                  {this.state.orderInfo[0].status=='ACCEPTED' && (
                      <Text style={{fontSize:25, fontWeight:'bold'}}>Upcoming Order</Text>
                  )}

                  {this.state.orderInfo[0].status=='COMPLETE' && (
                      <Text style={{fontSize:25, fontWeight:'bold'}}>Completed Service</Text>
                  )}

                  </View> 

                  <View style={{paddingBottom: 25, borderBottomColor:'#dfe6e9', borderBottomWidth:2}}>
                      <View style={{marginBottom:10}}>       
                          <Text style={{fontSize:24}}>{this.state.buyerInfo.name}</Text>
                      </View>   
                      <View style={{flexDirection:'row', paddingTop: 10}}>      
                          <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="calendar" size={25} />
                          <Text style={{fontSize:20}}>{Moment(this.state.orderInfo[0].dateScheduled).format('MMMM Do YYYY')}</Text>
                      </View>    
                      <View style={{flexDirection:'row', paddingTop: 10}}>    
                          <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="clock-outline" size={25} />
                          <Text style={{fontSize:20}}>{Moment(this.state.orderInfo[0].dateScheduled).format('hh:mm a')}</Text>
                      </View>  
                      <View style={{flexDirection:'row', paddingTop: 10}}>    
                          <Icon2 style={{paddingRight:10, color:'#7f8c8d'}} name="map-marker" size={25} />
                          <Text style={{fontSize:20}}>Location goes here</Text>
                      </View> 

                      <View style={{marginTop: 30}}>
                          <Text style={{fontSize:20}}>{this.state.buyerInfo.email}</Text>
                          <Text style={{fontSize:20}}>{this.state.buyerInfo.phone}</Text>
                      </View>
                  </View>

                  <View style={{marginLeft:20, marginTop:20}}>
                      <Text style={{fontSize:20}}>Duration: {duration}</Text>
                  </View>

              {this.state.orderInfo[0].status == 'PENDING' && (
                  <View style={{flex:1, flexDirection:'row', alignItems:'flex-end'}}>
                      <TouchableOpacity onPress={() => this.toggleRequestModal('CANCEL')} style={{borderRadius:5, backgroundColor:'#e74c3c', flex:1, height:50, margin:10, justifyContent:'center', alignItems:'center'}}>
                          <Text style={{fontWeight:'bold'}}>CANCEL</Text>
                      </TouchableOpacity>
                  </View>
              )}

              {this.state.orderInfo[0].status == 'ACCEPTED' && (
                  <View style={{flex:1, flexDirection:'row', alignItems:'flex-end'}}>
                      <TouchableOpacity onPress={() => this.toggleRequestModal('CANCEL')} style={{borderRadius:5, backgroundColor:'#e74c3c', flex:1, height:50, margin:10, justifyContent:'center', alignItems:'center'}}>
                          <Text style={{fontWeight:'bold'}}>CANCEL</Text>
                      </TouchableOpacity>
                  </View>
              )}
              </View>    
          )}


          <Modal isVisible={this.state.isCancelModalVisible}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{height:200, width: 350, backgroundColor:'#fff', borderRadius:20, padding:10}}>
                      <Icon2 onPress={() => this.toggleRequestModal('CANCEL')} style={{alignSelf:'flex-end', paddingRight:10, color:'#7f8c8d'}} name="close" size={30} />
                      <View style={{flex:1, flexDirection:'column', padding:10}}>
                          <Text style={{fontSize:20}}>Are you sure that you would like to cancel this service?</Text>
                          <View style={{flex:1, flexDirection:'row', alignItems:'flex-end'}}>
                              <TouchableOpacity
                                  style={{flex: 1, backgroundColor:'#E88D72', justifyContent:'center', alignItems:'center', height:45, borderRadius: 25, }}
                                  onPress={() => this.respondToRequest('CANCEL')}>
                                  <Text style={{textAlign:'center', fontSize:19, fontWeight:'bold', color:'#543855'}}>CANCEL</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
              </View>
          </Modal>    
      </View>
      );
  }



}

const st = require("../styles/style.js");
const styles = StyleSheet.create({});

export default Order;