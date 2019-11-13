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
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import firebase from 'react-native-firebase';

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
          imgBase: ''
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
            console.log('img base64: ' + response.data);
            this.setState({
              photo: response,
              imageUri: response.uri,
              imgBase: response.data
            });  
          }      
        }
      });
    };

    testNotification = () => {
      fetch(`https://fcm.googleapis.com/fcm/send`, {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
          'Authorization':'key=AAAAHyv-GIg:APA91bFcrY4DEMCl5SyfH4V8kjehp20BVYo7Ly5CQj5D5IJUSEQ6TKOl0cvlywN5wFdxgXBCTfCkxrR0z0iBCyhrdMnjYurwcAyu2MJU5Eq-BuX7gHojKCMb1TsQlJIYfx8_oDI5YND5'
        },
        body: JSON.stringify({
          "to" : "eRQTvuQsmlQ:APA91bFtUeZe0qmfrfaFHqsYdiSUASd4OrZiPrvtwu9OnJ9iAa75eUQh6HhIdax2n_hNBTUzc6n-xeQTb4Egfy_B3JschMSOeW651NWlFpvGc3zz4eziJZrr_hzj1jb-ip85DJ9zaYBZ",
           "notification" : {
              "body" : "The message from the React Native and Firebase",
              "title" : "React Native Firebase",
              "content_available" : true,
              "priority" : "high"
          }, 
          "data" : {
              "body" : "The first message from the React Native and Firebase",
              "title" : "React Native Firebase",
              "orderId" : "yeet",
              "content_available" : true,
              "priority" : "high"
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


    uploadImage = () => {
/*       const ext = this.state.imageUri.split('.').pop(); // Extract image extension
      const filename = `${uuid()}.${ext}`; // Generate unique name
      this.setState({ uploading: true });

      console.log('imgUri: ' + this.state.imageUri);
      console.log('filename: ' + filename);

      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;

      let uploadBlob = null;

      var imgRef = firebase.storage().ref().child('images/photo.jpg');
    //  imgRef.putString('nothing');

      let mime = 'image/jpg';

      let blobby = Blob.build(this.state.imgBase, {type: `${mime};BASE64`});
      console.log(blobby);

      imgRef.put(blobby, {contentType:'image/jpeg'}).then((snapshot)=>{
        blobby.close();
        console.log('yeet');
      }).catch((error)=>{
        console.log(error);
      }); */

/*       console.log(this.state.imgBase);
      imageRef.putString(this.state.imgBase, 'base64')
      .then(function(snapshot) {
        console.log('Uploaded a base64 string!');
        })
        .catch((error) => {
          console.log(error);
        }); */

      //var fileUri = RNFetchBlob.fs.stat(this.state.imageUri);
/*       RNGRP.getRealPathFromURI(this.state.imageUri).then(path => {
        console.log('here');
        console.log(filePath);
      }) */

 //     console.log(fileUri);
//      console.log(fileUri.path);

      /* 
      imageRef.putFile(fileUri.path)
      .catch((error) => {
        console.log(error);
      }); */


/*       fs.readFile(this.state.imageUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`})
        })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob._ref, blob, {contentType: mime})
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);
        
      })
      .catch((error) => {
        console.log(error);

      })   */
   

    };

  render() {

    const {photo} = this.state;

    return (
        <View style={{flex:1}}>
          <View style={{marginBottom:40, padding:20, borderBottomColor:'#dfe6e9', borderBottomWidth:2}}>       
            <Text style={{fontSize:25, fontWeight:'bold'}}>{this.props.name}</Text>
            <Text style={{color:'#7f8c8d'}}>{this.props.phone}</Text>
            <Text style={{color:'#7f8c8d'}}>{this.props.email}</Text>
          </View>

          <TouchableOpacity
                  style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20, flexDirection:'row'}}
                  onPress={() => this.editAccountInfo()}>
                  <View style={{flexDirection:'row', flex:1, marginLeft:15}}>
                    <Icon style={{alignSelf:'center'}} name="edit" size={23} />                  
                    <Text style={{fontSize:20,paddingLeft:20}}>Edit Account</Text>
                  </View>
                  <Icon style={{alignSelf:'center', paddingRight:20}} name="chevron-right" size={18} />                  
          </TouchableOpacity>

          <TouchableOpacity
                  style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20, flexDirection:'row'}}
                  onPress={() => this.changePassword()}>
                  <View style={{flexDirection:'row', flex:1, marginLeft:17}}>
                    <Icon style={{alignSelf:'center'}} name="unlock-alt" size={23} />                  
                    <Text style={{fontSize:20,paddingLeft:20}}>Change Password</Text>
                  </View>
                  <Icon style={{alignSelf:'center', paddingRight:20}} name="chevron-right" size={18} />                  
          </TouchableOpacity>   

          <TouchableOpacity
                  style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20, flexDirection:'row'}}
                  onPress={this.props.paymentInfo}>
                  <View style={{flexDirection:'row', flex:1, marginLeft:12}}>
                    <Icon style={{alignSelf:'center'}} name="credit-card" size={23} />                  
                    <Text style={{fontSize:20,paddingLeft:20}}>Payment Info</Text>
                  </View>
                  <Icon style={{alignSelf:'center', paddingRight:20}} name="chevron-right" size={18} />                  
          </TouchableOpacity>                   

          <TouchableOpacity
                  style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20, flexDirection:'row'}}
                  onPress={this.handleChoosePhoto}>
                  <View style={{flexDirection:'row', flex:1, marginLeft:17}}>
                    <Icon style={{alignSelf:'center'}} name="user" size={23} />                  
                    <Text style={{fontSize:20,paddingLeft:20}}>Account Photo</Text>
                  </View>
                  <Icon style={{alignSelf:'center', paddingRight:20}} name="chevron-right" size={18} />                  
          </TouchableOpacity>  

          <TouchableOpacity
                  style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20, flexDirection:'row'}}
                  onPress={this.testNotification}>
                  <View style={{flexDirection:'row', flex:1, marginLeft:17}}>
                    <Icon style={{alignSelf:'center'}} name="user" size={23} />                  
                    <Text style={{fontSize:20,paddingLeft:20}}>NotificationTest</Text>
                  </View>
                  <Icon style={{alignSelf:'center', paddingRight:20}} name="chevron-right" size={18} />                  
          </TouchableOpacity>                           
          
           {photo && (
             <View><Image source={{uri: photo.uri}} style={{width:200,height:100}}/> 
             <Button title="Upload Photo" onPress={this.uploadImage}/></View>
          )} 

          {/* <Button title="Upload Photo" onPress={this.props.handleUploadPhoto} />      */}


        </View>
    );
  }
}

const st = require("../../../styles/style.js");
export default AccountView;
