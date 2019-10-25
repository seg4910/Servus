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

      fetch('http://localhost:8080/api/getAccountInfo/?id=' + result)
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
             userId: this.state.userId,
             fieldType: "password",
             fieldValue: this.state.password,
          }),
         });
       })
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
      <View style={st.container}>
          <Text style={st.heading1}>Change Password</Text>
          <Text style={styles.heading}>Password:</Text>
          <TextInput
            ref="_password"
            style={styles.subHeading}
            onChangeText={(text) => this.setState({password: text})}
            editable = {this.state.passEdit}
            value={this.state.password}
            blurOnSubmit={false}
          />
          {
            !this.state.passEdit && <Button title="Edit" type="outline" onPress={() => this.editPassword()}/>
          }
          {
            this.state.passEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editPassword()}/>
          }

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
