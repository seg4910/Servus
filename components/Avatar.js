import React, { Component } from "react";
import { View, Text, TextInput, Button, Image, AsyncStorage } from "react-native";
class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: null
        }
    }
    componentDidMount() {
        this.loadPhoto();
    }

    loadPhoto = () => {
        AsyncStorage.getItem('userId', (err, result) => {
            fetch(`http://localhost:8080/api/getAccountInfo?type=users&id=${result}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ photo: responseJson.photo });
                })
        })
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <Image
                    source={{ uri: this.state.photo }}
                    style={{ height: 120, width: 120, borderRadius: 60 }}
                />
            </View>
        );
    }
}

export default Avatar;