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
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

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
            sellerInfo: null,
            isCancelModalVisible: false,
            isCompleteModalVisible: false,
            orderId: null,
            orderDuration: null,
            totalCost: null
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const orderId = JSON.parse(JSON.stringify(navigation.getParam('id', 'NO-ORDER')));
        this.setState({ orderId: orderId });
        fetch('http://localhost:8080/api/viewOrder?id=' + orderId)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Orders: ' + responseJson.order);
                this.setState({
                    orderInfo: responseJson.order
                }, () => {

                    var orderDuration = Moment.utc(Moment(this.state.orderInfo[0].timeCompleted, "YYYY-MM-DD HH:mm:ss").diff(Moment(this.state.orderInfo[0].timeStarted, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss");
                    var totalCost = Math.round((this.state.orderInfo[0].price * Moment.duration(orderDuration).asHours()) * 100) / 100;
                    this.setState({ orderDuration: orderDuration, totalCost: totalCost })

                    fetch('http://localhost:8080/api/getAccountInfo?type=sellers&id=' + this.state.orderInfo[0].sellerId)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                sellerInfo: responseJson
                            })

                            fetch('http://localhost:8080/api/getLocation?id=' + responseJson.locationId)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    var fullAddress = responseJson.locationInfo[0].streetNumber + ' ' + responseJson.locationInfo[0].streetName + ', ' + responseJson.locationInfo[0].city
                                    var shortAddress = responseJson.locationInfo[0].city + ', ' + responseJson.locationInfo[0].postalCode
                                    this.setState({
                                        fullAddress: fullAddress,
                                        shortAddress: shortAddress
                                    })

                                });

                        })
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    toggleRequestModal(resp) {
        if (resp == 'CANCEL') {
            this.setState({ isCancelModalVisible: !this.state.isCancelModalVisible });
        } else if (resp == 'COMPLETE') {
            this.setState({ isCompleteModalVisible: !this.state.isCompleteModalVisible });
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
                .catch((error) => {
                    console.error(error);
                });

            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();

        } else if (resp == 'COMPLETE') {
            this.setState({ isCompleteModalVisible: !this.state.isCompleteModalVisible });

            fetch(`http://localhost:8080/api/respondToRequestCompleted?resp=COMPLETE&id=${this.state.orderId}&cost=${this.state.totalCost}&duration=${this.state.orderDuration}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .catch((error) => {
                    console.error(error);
                });


            // go to review seller page
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.navigate('RateSeller', {
                orderId: this.state.orderId
            });
        }
    }

    render() {
        const { navigation } = this.props;
        let duration = null;
        let estCost = null;
        let complete = false;
        if (this.state.orderInfo) {
            if (this.state.orderInfo[0].size == 'SM') {
                duration = '0 - 1 Hours'
                estCost = 1 * this.state.orderInfo[0].price;
            } else if (this.state.orderInfo[0].size == 'MD') {
                duration = '1 - 2 Hours'
                estCost = 1.5 * this.state.orderInfo[0].price;
            } else if (this.state.orderInfo[0].size == 'LG') {
                duration = '2 - 3 Hours'
                estCost = 2.5 * this.state.orderInfo[0].price;
            } else if (this.state.orderInfo[0].size == 'XL') {
                duration = '4+ Hours'
                estCost = 4 * this.state.orderInfo[0].price;
            }
            if (this.state.orderInfo[0].status == 'COMPLETE' || this.state.orderInfo[0].status == 'COMPLETEP') {
                complete = true;
            }            
        }


        return (
            <View style={{ flex: 1 }}>
                {this.state.sellerInfo && (
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginBottom: 15, padding: 17, borderBottomColor: '#dfe6e9', borderBottomWidth: 2 }}>

                                {this.state.orderInfo[0].status == 'PENDING' && (
                                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Order Request</Text>
                                )}

                                {this.state.orderInfo[0].status == 'ACCEPTED' && (
                                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Upcoming Order</Text>
                                )}

                                {this.state.orderInfo[0].status == 'COMPLETE' && (
                                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Completed Service</Text>
                                )}

                                {this.state.orderInfo[0].status == 'ACTIVE' && (
                                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Active</Text>
                                )}

                                {this.state.orderInfo[0].status == 'COMPLETEP' && (
                                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Pending Completion</Text>
                                )}

                            </View>

                            <View style={{ padding: 20, paddingTop: 0, marginBottom: 10 }}>


                                <Text style={{ fontSize: 14, color: '#7f8c8d', paddingBottom: 10 }}>Seller Info</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 30, marginLeft: 20 }}>
                                    <View style={{ flex: .7 }}>
                                        <Image source={{ uri: this.state.sellerInfo.photo }} style={{ height: 85, width: 85, borderRadius: 50 }} />
                                    </View>

                                    <View style={{}}>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20 }}>{this.state.sellerInfo.name}</Text>
                                        </View>

                                        <View style={{}}>
                                            <Text style={{ fontSize: 17, color: '#7f8c8d' }}>{this.state.sellerInfo.email}</Text>
                                            <Text style={{ fontSize: 17, color: '#7f8c8d' }}>{this.state.sellerInfo.phone}</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={{ fontSize: 14, color: '#7f8c8d', paddingBottom: 10 }}>Service Name</Text>
                                <View style={{ marginLeft: 20, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 18 }}>{this.state.orderInfo[0].serviceName}</Text>
                                </View>

                                <Text style={{ fontSize: 14, color: '#7f8c8d', paddingBottom: 10 }}>Service Info</Text>
                                <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', marginHorizontal: 20, marginBottom:15 }}>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon2 style={{ marginRight: 10, color: '#E88D72' }} name="map-marker" size={25} />
                                        {this.state.orderInfo[0].status == 'ACTIVE' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.fullAddress}</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'COMPLETEP' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.fullAddress}</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'ACCEPTED' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.fullAddress}</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'PENDING' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.shortAddress}</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'COMPLETE' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.shortAddress}</Text>
                                        )}
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon2 style={{ paddingRight: 10, color: '#E88D72' }} name="calendar" size={25} />
                                        <Text style={{ fontSize: 17 }}>{Moment(this.state.orderInfo[0].dateScheduled).format('MMMM Do YYYY')}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon2 style={{ paddingRight: 10, color: '#E88D72' }} name="clock-outline" size={25} />
                                        <Text style={{ fontSize: 17 }}>{this.state.orderInfo[0].shiftTime}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon2 style={{ paddingRight: 10, color: '#E88D72' }} name="timer-sand" size={25} />
                                        {!complete && (
                                            <Text style={{ fontSize: 17 }}>Expected: {duration}</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'COMPLETE' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.orderInfo[0].actualDuration}</Text>
                                        )}  
                                        {this.state.orderInfo[0].status == 'COMPLETEP' && (
                                            <Text style={{ fontSize: 17 }}>{this.state.orderDuration}</Text>
                                        )}                                                                             
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon2 style={{ paddingRight: 10, color: '#E88D72' }} name="currency-usd" size={25} />
                                        {!complete && (
                                            <Text style={{ fontSize: 17 }}>Expected: ${estCost} (${this.state.orderInfo[0].price} / Hr)</Text>
                                        )}
                                        {this.state.orderInfo[0].status == 'COMPLETE' && this.state.orderInfo[0].tip !== null && (
                                            <Text style={{ fontSize: 17 }}>${this.state.orderInfo[0].totalCost} + ${this.state.orderInfo[0].tip} (Tip)</Text>
                                        )} 
                                        {this.state.orderInfo[0].status == 'COMPLETE' && this.state.orderInfo[0].tip == null && (
                                            <Text style={{ fontSize: 17 }}>${this.state.orderInfo[0].totalCost}</Text>
                                        )}                                         
                                        {this.state.orderInfo[0].status == 'COMPLETEP' && (
                                            <Text style={{ fontSize: 17 }}>${this.state.totalCost}</Text>
                                        )}                                                                                     
                                    </View>
                                </View>

                                <Text style={{ fontSize: 14, color: '#7f8c8d', paddingBottom: 10 }}>Your Comment</Text>
                                <View style={{ marginLeft: 20, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 18 }}>{this.state.orderInfo[0].note}</Text>
                                </View>

                            </View>

                            {this.state.orderInfo[0].status == 'PENDING' && (
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => this.toggleRequestModal('CANCEL')} style={st.btnPrimary}>
                                        <Text style={st.btnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {this.state.orderInfo[0].status == 'ACCEPTED' && (
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => this.toggleRequestModal('CANCEL')} style={st.btnPrimary}>
                                        <Text style={st.btnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {this.state.orderInfo[0].status == 'COMPLETEP' && (
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => this.toggleRequestModal('COMPLETE')} style={st.btnPrimary}>
                                        <Text style={st.btnText}>CONFIRM COMPLETION</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                )}


                <Modal isVisible={this.state.isCancelModalVisible}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 200, width: 350, backgroundColor: '#fff', borderRadius: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, paddingHorizontal: 20, paddingTop: 30 }}>Cancel Order Request</Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, padding: 20 }}>Are you sure?</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <TouchableOpacity
                                        style={{ flex: 1, backgroundColor: '#bf745e', justifyContent: 'center', alignItems: 'center', height: 55, borderBottomLeftRadius: 20 }}
                                        onPress={() => this.toggleRequestModal('CANCEL')}>
                                        <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: '#fff' }}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1, backgroundColor: '#E88D72', justifyContent: 'center', alignItems: 'center', height: 55, borderBottomRightRadius: 20 }}
                                        onPress={() => this.respondToRequest('CANCEL')}>
                                        <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: '#fff' }}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.isCompleteModalVisible}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 200, width: 350, backgroundColor: '#fff', borderRadius: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, paddingHorizontal: 20, paddingTop: 30 }}>Confirm Order Completion</Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, padding: 20 }}>Are you sure?</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <TouchableOpacity
                                        style={{ flex: 1, backgroundColor: '#bf745e', justifyContent: 'center', alignItems: 'center', height: 55, borderBottomLeftRadius: 20 }}
                                        onPress={() => this.toggleRequestModal('COMPLETE')}>
                                        <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: '#fff' }}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ flex: 1, backgroundColor: '#E88D72', justifyContent: 'center', alignItems: 'center', height: 55, borderBottomRightRadius: 20, }}
                                        onPress={() => this.respondToRequest('COMPLETE')}>
                                        <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: '#fff' }}>YES</Text>
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