import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
                {
                    this.state.photo ?
                        <Image
                            source={{ uri: this.state.photo }}
                            style={{ height: 120, width: 120, borderRadius: 60 }}
                        />
                    :
                        <Icon
                            name="user-circle"
                            size={83}
                        />
                }
            </View>
        );
    }
}

export default Avatar;