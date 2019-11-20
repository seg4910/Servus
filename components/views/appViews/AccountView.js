import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import firebase from 'react-native-firebase';
import Svg, {
  Path,
  Circle
} from 'react-native-svg';
import RNFetchBlob from 'react-native-fetch-blob';

const WIDTH = Dimensions.get('screen').width;


class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      imgSource: '',
      uploading: false,
      progress: 0,
      images: [],
      imageUri: '',
      imgBase: '',
      imgPath: '',
      downloadUrl: null,
    }
  };

  editAccountInfo = () => {
    this.props.navigation.navigate("EditAccountInfo");
  }

  changePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  }

  handleChoosePhoto = () => {

    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.uri) {

          var imgPath = ('file://' + response.path).toString();

          const image ={
            image: response.uri.toString(),
            path: imgPath
          }
          this.uploadImage(image);

          this.setState({
            photo: response,
            imageUri: response.uri,
            imgBase: response.data,
            imgPath: imgPath
          });
        }
      }
    });
  };

  testNotification = () => {
    this.props.navigation.navigate('RateSeller');
  }

  savePhotoUrl = () => {
    // fetch post image url
    console.log('saving photo');
    console.log('SAVING PHOTO' + this.state.downloadUrl);
    AsyncStorage.getItem('userId', (err, result) => {
      fetch('http://localhost:8080/api/editField', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           type: "users",
           userId: result,
           fieldType: "photo",
           fieldValue: this.state.downloadUrl,
        }),
       });
    })
  }

  uploadImage = (image) => {
          let fileName = 'users'+this.props.id+this.props.email;

          this.setState({ uploading: true });
    
          var imgRef = firebase.storage().ref('images').child('/users').child(fileName);
          try {
            imgRef.putFile(image.path).then((file) => {

              imgRef.getDownloadURL().then((downloadURL) => {
                console.log('here');
                this.setState({downloadUrl: downloadURL});
                console.log('here');
                this.savePhotoUrl();
              })
            });
          } catch {
            // something going wrong here, error being thrown but upload works fine
          }

        this.setState({uploading: false});
  };

  render() {


    return (
      <ScrollView style={{ flex: 1 }}>

        <Svg height={110} width={WIDTH}>
          <Circle
            cx={WIDTH / 2}
            cy={`-${898 - 90 + 2}`}
            r="898.5"
            fill="#E88D72"
            stroke="#dfe6e9"
            strokeWidth="2"
          />
        </Svg>
        <Image
          source={{uri: this.props.photo}}
          style={{
            position: 'absolute',
            top: 20,
            left: WIDTH / 2 - 60,
            width: 120,
            height: 120,
            borderRadius: 75,
            borderWidth: 2,
            borderColor: '#E88D72'

          }}
        />

        <View style={{ marginBottom: 40, padding: 20, borderBottomColor: '#dfe6e9', borderBottomWidth: 2 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{this.props.name}</Text>
          <Text style={{ color: '#7f8c8d' }}>{this.props.phone}</Text>
          <Text style={{ color: '#7f8c8d' }}>{this.props.email}</Text>
        </View>

        <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9', padding: 20, flexDirection: 'row' }}
          onPress={() => this.editAccountInfo()}>
          <View style={{ flexDirection: 'row', flex: 1, marginLeft: 15 }}>
            <Icon style={{ alignSelf: 'center' }} name="edit" size={23} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Edit Account</Text>
          </View>
          <Icon style={{ alignSelf: 'center', paddingRight: 20 }} name="chevron-right" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9', padding: 20, flexDirection: 'row' }}
          onPress={() => this.changePassword()}>
          <View style={{ flexDirection: 'row', flex: 1, marginLeft: 17 }}>
            <Icon style={{ alignSelf: 'center' }} name="unlock-alt" size={23} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Change Password</Text>
          </View>
          <Icon style={{ alignSelf: 'center', paddingRight: 20 }} name="chevron-right" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9', padding: 20, flexDirection: 'row' }}
          onPress={this.props.paymentInfo}>
          <View style={{ flexDirection: 'row', flex: 1, marginLeft: 12 }}>
            <Icon style={{ alignSelf: 'center' }} name="credit-card" size={23} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Payment Info</Text>
          </View>
          <Icon style={{ alignSelf: 'center', paddingRight: 20 }} name="chevron-right" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9', padding: 20, flexDirection: 'row' }}
          onPress={this.handleChoosePhoto}>
          <View style={{ flexDirection: 'row', flex: 1, marginLeft: 17 }}>
            <Icon style={{ alignSelf: 'center' }} name="user" size={23} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Account Photo</Text>
          </View>
          <Icon style={{ alignSelf: 'center', paddingRight: 20 }} name="chevron-right" size={18} />
        </TouchableOpacity>

{/*         <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: '#dfe6e9', padding: 20, flexDirection: 'row' }}
          onPress={this.testNotification}>
          <View style={{ flexDirection: 'row', flex: 1, marginLeft: 17 }}>
            <Icon style={{ alignSelf: 'center' }} name="user" size={23} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Test</Text>
          </View>
          <Icon style={{ alignSelf: 'center', paddingRight: 20 }} name="chevron-right" size={18} />
        </TouchableOpacity> */}


      </ScrollView>
    );
  }
}

const st = require("../../../styles/style.js");
export default AccountView;
