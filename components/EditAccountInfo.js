import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, TextInput, KeyboardAvoidingView} from 'react-native';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import {Button} from 'react-native-elements';

const fetch = require("node-fetch");


class EditAccountInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      email: '',
      phone: '',
      nameEdit: false,
      emailEdit: false,
      phoneEdit: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch(`http://localhost:8080/api/getAccountInfo/?id=${result}&type=${"users"}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          userId: result,
          name: responseJson.name,
          email: responseJson.email,
          password: responseJson.password,
          phone: responseJson.phone
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }

  editName = () => {
    if(this.state.nameEdit){
      this.setState({
        nameEdit: false
      }, () => {
        fetch('http://localhost:8080/api/editField', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             type: "users",
             userId: this.state.userId,
             fieldType: "name",
             fieldValue: this.state.name,
          }),
         });
       })
    }
    else{
      this.setState({
        nameEdit: true
      }, () =>{
        this.refs._name.focus()
      });  
    }
  }

  editEmail = () => {
    if(this.state.emailEdit){
      this.setState({
        emailEdit: false
      }, () =>{
        fetch('http://localhost:8080/api/editField', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             type: "users",
             userId: this.state.userId,
             fieldType: "email",
             fieldValue: this.state.email,
          }),
         });
       })
    }
    else{
      this.setState({
        emailEdit: true
      }, () =>{
        this.refs._email.focus()
      });  
    }
  }

  editPhone = () => {
    if(this.state.phoneEdit){
      this.setState({
        phoneEdit: false
      }, () =>{
        fetch('http://localhost:8080/api/editField', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             type: "users",
             userId: this.state.userId,
             fieldType: "phone",
             fieldValue: this.state.phone,
          }),
         });
       })
    }
    else{
      this.setState({
        phoneEdit: true
      }, () =>{
        this.refs._phone.focus()
      });  
    }
  }


  render() {
    return (
      <View style={{flex:1}}>
        {/* <KeyboardAvoidingView KeyboardAvoidingView={-500}> */}
          <View style={{marginBottom:0, padding:20, borderBottomColor:'#dfe6e9', borderBottomWidth:2}}>       
            <Text style={{fontSize:25, fontWeight:'bold'}}>Edit Info</Text>
          </View>   
              
          <View style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20}}>
            <Text style={{color:'#7f8c8d', fontSize:20}}>Name</Text>              
            <View style={{flexDirection:'row'}}>
              <View style={{flex:3}}>
                  <TextInput
                  ref="_name"
                  style={{fontSize:17, paddingLeft:10, color:'#000'}}
                  onChangeText={(text) => this.setState({name: text})}
                  editable = {this.state.nameEdit}
                  value={this.state.name}
                  blurOnSubmit={false}
                />
              </View>
              <View style={{flex:1}}>
                {
                  !this.state.nameEdit && <Button icon={{name: "edit", color: "#E88D72" }} type="outline" onPress={() => this.editName()}/>
                }
                {
                  this.state.nameEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editName()}/>
                }
              </View>
            </View>
          </View>

          <View style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20}}>
            <Text style={{color:'#7f8c8d', fontSize:20}}>E-mail:</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:3}}>
                <TextInput
                  ref="_email"
                  style={{fontSize:17, paddingLeft:10, color:'#000'}}
                  onChangeText={(text) => this.setState({email: text})}
                  editable = {this.state.emailEdit}
                  value={this.state.email}
                  blurOnSubmit={false}
                />
              </View>
              <View style={{flex:1}}>                
                {
                  !this.state.emailEdit && <Button icon={{name: "edit", color: "#E88D72" }} type="outline" onPress={() => this.editEmail()}/>
                }
                {
                  this.state.emailEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editEmail()}/>
                }
              </View>
            </View>
          </View>

          <View style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20}}>
           <Text style={{color:'#7f8c8d', fontSize:20}}>Phone:</Text>              
            <View style={{flexDirection:'row'}}>
              <View style={{flex:3}}>
                <TextInput
                  ref="_phone"
                  style={{fontSize:17, paddingLeft:10, color: '#000'}}
                  onChangeText={(text) => this.setState({phone: text})}
                  editable = {this.state.phoneEdit}
                  value={this.state.phone}
                  blurOnSubmit={false}
                />
              </View>
              <View style={{flex:1}}>  
                {
                  !this.state.phoneEdit && <Button icon={{name: "edit", color: "#E88D72" }} type="outline" onPress={() => this.editPhone()}/>
                }
                {
                  this.state.phoneEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editPhone()}/>
                }
              </View>
            </View>
         </View>

        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const st = require('./../styles/style.js');
const styles = StyleSheet.create({
  heading: {
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
    color: "#000000",
    paddingLeft: 5
  },
  subHeading:{
    fontFamily: "Arial",
    fontSize: 15,
    textAlign: "left",
    color: "#000000",
    paddingLeft: 5,
    paddingBottom:5
  },
  subContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

});
export default EditAccountInfo;
