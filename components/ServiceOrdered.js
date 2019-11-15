import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native';

class ServiceOrdered extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  backToHome = () => {
    this.props.navigation.navigate('Home');
  }

  render() {

    const { photo } = this.state;
    return (
      <View style={{
        flex: 1,
        // justifyContent: 'flex-start',
        backgroundColor: '#E88D72',
        alignItems: 'center'

      }}>

        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#f2f2f2', marginTop: 200 }}>Your Order Has Been Placed!</Text>
          <LottieView style={{ flex: 1, width:50, height:50 }} source={require('../image/orderComplete.json')} autoPlay loop={false} />
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            style={st.btn}
            onPress={() => this.backToHome()}
          >
            <Text style={st.btnText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const st = require('./../styles/style.js');
const styles = StyleSheet.create({
});
export default ServiceOrdered;
