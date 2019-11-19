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
    console.log('handle choose photo');

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
          console.log('here' + response.uri);
          console.log('path ' + response.path);
          console.log('img base64: ' + response.data);

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
  }

  uploadImage = (image) => {
          //const ext = this.state.imageUri.split('.').pop(); // Extract image extension
          //const filename = `${uuid()}.${ext}`; // Generate unique name
          this.setState({ uploading: true });
    
          var imgRef = firebase.storage().ref('/images/user/');
          try {
            imgRef.putFile(image.path).then((file) => {
              console.log('here');
              imgRef.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL);
                this.setState({downloadUrl: downloadURL});
                this.savePhotoUrl();
              })
            });
          } catch {
            console.log('yeerp');
            
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
          source={require("../../../image/avatar1.jpg")}
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
