import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, TextInput} from 'react-native';

import {Button} from 'react-native-elements';


class EditAccountInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      email: '',
      password: '',
      nameEdit: false,
      emailEdit: false,
      passEdit: false,
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
      }, () =>{
        fetch('http://localhost:8080/api/editField', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
          <Text style={st.heading1}>Login & Security</Text>
          <Text style={styles.heading}>Name:</Text>
          <TextInput
            ref="_name"
            style={styles.subHeading}
            onChangeText={(text) => this.setState({name: text})}
            editable = {this.state.nameEdit}
            value={this.state.name}
            blurOnSubmit={false}
          />
          {
            !this.state.nameEdit && <Button title="Edit" type="outline" onPress={() => this.editName()}/>
          }
          {
            this.state.nameEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editName()}/>
          }


          <Text style={styles.heading}>E-mail:</Text>
          <TextInput
            ref="_email"
            style={styles.subHeading}
            onChangeText={(text) => this.setState({email: text})}
            editable = {this.state.emailEdit}
            value={this.state.email}
            blurOnSubmit={false}
          />
          {
            !this.state.emailEdit && <Button title="Edit" type="outline" onPress={() => this.editEmail()}/>
          }
          {
            this.state.emailEdit && <Button icon={{name: "check", color: "white"}} onPress={() => this.editEmail()}/>
          }

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
export default EditAccountInfo;
