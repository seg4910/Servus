import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from "react-native";
import Svg, {
    Circle
} from 'react-native-svg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from 'lottie-react-native';

const WIDTH = Dimensions.get('screen').width;

class RateSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: null,
            tip: 3,
            rating: 3,
            comment: null
        }
    };

    componentDidMount() {
        const { navigation } = this.props;
        const orderId = JSON.parse(JSON.stringify(navigation.getParam('orderId', 'NO-ORDER')));

        fetch(`http://localhost:8080/api/viewOrder?id=${orderId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ orderInfo: responseJson.order[0] })
                console.log(responseJson.order[0])

                fetch(`http://localhost:8080/api/getAccountInfo?type=${'sellers'}&id=${this.state.orderInfo.sellerId}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('FCM ' + responseJson.fcmToken);
                        this.setState({
                            fcmToken: responseJson.fcmToken,
                            sellerPhoto: responseJson.photo
                        })

                    })

            })
    }

    ratingCompleted = (rating) => {
        console.log(rating);
        this.setState({ rating: rating });
    }

    selectTip = (tip) => {

        this.setState({ tip: parseFloat(tip, 10) });
    }

    getSelectedTip = (tip) => {
        if (parseFloat(tip, 10) == this.state.tip) {
            return {
                marginLeft: 20, width: 35, height: 35, borderRadius: 35, backgroundColor: '#E88D72', justifyContent: 'center', alignItems: 'center', shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 10,
                borderWidth: 4,
                borderColor: '#d17f66',
                flex: 1
            }
        } else {
            return {
                flex: 1, marginLeft: 20, width: 35, height: 35, borderRadius: 35, backgroundColor: '#E88D72', justifyContent: 'center', alignItems: 'center'
            }
        }
    }

    sendNotificationToSeller = () => {
        console.log('here ' + this.state.orderInfo.sellerId);

        fetch(`https://fcm.googleapis.com/fcm/send`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAHyv-GIg:APA91bFcrY4DEMCl5SyfH4V8kjehp20BVYo7Ly5CQj5D5IJUSEQ6TKOl0cvlywN5wFdxgXBCTfCkxrR0z0iBCyhrdMnjYurwcAyu2MJU5Eq-BuX7gHojKCMb1TsQlJIYfx8_oDI5YND5'
            },
            body: JSON.stringify({
                "to": this.state.fcmToken,
                "notification": {
                    "title": "Your service is now complete",
                    "body": "",
                    "content_available": true,
                    "priority": "high"
                },
                "data": {
                    "title": "Your service is now complete",
                    "body": "",
                    "orderId": this.state.orderInfo.id,
                    "content_available": true,
                    "priority": "high"
                }
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
        })
        .catch(error => {
            console.log(error);
        });



    }

    completeService = () => {

        //update ratings table
        fetch(`http://localhost:8080/api/addRating?sellerId=${this.state.orderInfo.sellerId}&serviceId=${this.state.orderInfo.serviceId}&orderId=${this.state.orderInfo.id}&buyerId=${this.state.orderInfo.buyerId}&rating=${this.state.rating}&comment=${this.state.comment}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .catch((error) => {
                console.error(error);
            });
        
        fetch('http://localhost:8080/api/editField', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             type: "orders",
             userId: this.state.orderInfo.id,
             fieldType: "tip",
             fieldValue: this.state.tip,
          }),
         });        

        this.sendNotificationToSeller();
        this.props.navigation.navigate('Home');
    }

    render() {
        if (this.state.orderInfo) {
            return (
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10}>

                    <View>
                        <Svg height={220} width={WIDTH}>
                            <Circle
                                cx={WIDTH / 2}
                                cy={`-${898 - 150 + 2}`}
                                r="898.5"
                                fill="#E88D72"
                                stroke="#dfe6e9"
                                strokeWidth="2"
                            />
                        </Svg>
                        {
                            this.state.sellerPhoto ? 
                            <Image
                                source={{uri: this.state.sellerPhoto}}
                                style={{
                                    position: 'absolute',
                                    top: 80,
                                    left: WIDTH / 2 - 60,
                                    width: 120,
                                    height: 120,
                                    borderRadius: 75,
                                    borderWidth: 2,
                                    borderColor: '#E88D72'
                                }}
                            />
                            : <Icon name="user-circle" size={83} />
                        }
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 30, color: "#000", textAlign: 'center' }}>
                                {this.state.orderInfo.sellerName}
                            </Text>
                            <Text>
                                {this.state.orderInfo.service}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ marginLeft: 20, fontWeight: 'bold', paddingBottom: 10 }}>Rate your seller</Text>

                            <View style={{ alignItems: 'flex-start', paddingLeft: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <AirbnbRating
                                    count={5}
                                    reviews={["1 - Terrible", "2 - Bad", "3 - Okay", "4 - Good", "5 - Great"]}
                                    defaultRating={3}
                                    size={30}
                                    onFinishRating={this.ratingCompleted}
                                    showRating={false}
                                />
                                <View style={{ marginRight: 80, paddingTop: 3 }}><Text style={{ fontSize: 20 }}>{this.state.rating} / 5</Text></View>
                            </View>
                            <View style={{ marginLeft: 20, width: WIDTH - 40 }}>
                                <TextInput onChangeText={(text) => this.setState({ comment: text })} style={{ backgroundColor: '#f2f2f2', borderRadius: 10, marginTop: 20 }} placeholder='Leave a comment..' />
                            </View>
                        </View>

                        <View style={{ marginTop: 20, marginBottom: 20, borderBottomColor: "#dfe6e9", borderBottomWidth: 2, }} />

                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 15 }}>Add a tip (optional)</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.selectTip(2)} style={this.getSelectedTip(2)}>
                                    <Text style={{ color: '#fff', fontSize: 22 }}>$2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectTip(4)} style={this.getSelectedTip(4)}>
                                    <Text style={{ color: '#fff', fontSize: 21 }}>$4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectTip(6)} style={this.getSelectedTip(6)}>
                                    <Text style={{ color: '#fff', fontSize: 22 }}>$6</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 20, flex: 2, marginTop: -17 }}>
                                    <TextInput keyboardType='numeric' onChangeText={text => this.selectTip(text)} placeholder='Other' style={{ width: 100, fontSize: 20, borderColor: '#E88D72', borderBottomWidth: 2 }}></TextInput>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 25, marginBottom: 20, borderBottomColor: "#dfe6e9", borderBottomWidth: 2, }} />

                        <View style={{ marginLeft: 80 }}>
                            <View style={{ width: 250, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20 }}>Service:</Text>
                                    <Text style={{ fontSize: 20 }}>Tip:</Text>
                                    <Text style={{ fontSize: 20 }}>Total:</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20 }}>${this.state.orderInfo.totalCost}</Text>
                                    <Text style={{ fontSize: 20 }}>${this.state.tip}</Text>
                                    <Text style={{ fontSize: 20 }}>${this.state.orderInfo.totalCost + this.state.tip}</Text>
                                </View>
                            </View>

                        </View>


                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity
                                style={st.btnPrimary}
                                onPress={() => this.completeService()}
                            >
                                <Text style={st.btnText}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>

            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <LottieView style={{ flex: 1 }} source={require('../image/loading.json')} autoPlay loop={true} />
                </View>
            )
        }
    }
}

const st = require("../styles/style.js");


export default RateSeller;