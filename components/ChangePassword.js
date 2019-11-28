import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
const fetch = require("node-fetch");


class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      passEdit: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getAccountInfo/?id=' + result + '&type=users')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          userId: result,
          password: responseJson.password,
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }



  editPassword = () => {
    if(this.state.passEdit){
      this.setState({
        passEdit: false
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
             fieldType: "password",
             fieldValue: this.state.password,
          }),
         });
       })
       this.props.navigation.state.params.updateInfo();

    }
    else{
      this.setState({
        passEdit: true
      }, () =>{
        this.refs._password.focus()
      });  
    }
  }


  render() {
    return (

      <View style={{flex:1}}>
      {/* <KeyboardAvoidingView KeyboardAvoidingView={-500}> */}
        <View style={{marginBottom:0, padding:20, borderBottomColor:'#dfe6e9', borderBottomWidth:2}}>       
          <Text style={{fontSize:25, fontWeight:'bold'}}>Change Password</Text>
        </View>   
            
        <View style={{borderBottomWidth:1,borderBottomColor:'#dfe6e9',padding:20}}>
          <Text style={{color:'#7f8c8d', fontSize:20}}>Password</Text>              
          <View style={{flexDirection:'row'}}>
            <View style={{flex:3}}>
              { this.state.passEdit && (
                <TextInput
                ref="_password"
                style={{fontSize:17, paddingLeft:10, color:'#000'}}
                onChangeText={(text) => this.setState({password: text})}
                editable = {this.state.passEdit}
                value={this.state.password}
                secureTextEntry={false}
                blurOnSubmit={false}
                />
              )}
              
              { !this.state.passEdit && (
                <TextInput
                ref="_password"
                style={{fontSize:17, paddingLeft:10, color:'#000'}}
                onChangeText={(text) => this.setState({password: text})}
                editable = {this.state.passEdit}
                value={this.state.password}
                secureTextEntry={true}
                blurOnSubmit={false}
                />
              )}

            </View>
            <View style={{flex:1}}>
              {
                !this.state.passEdit && <Button icon={{name: "edit", color: "#E88D72" }} type="outline" onPress={() => this.editPassword()}/>
              }
              {
                this.state.passEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editPassword()}/>
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
export default ChangePassword;
