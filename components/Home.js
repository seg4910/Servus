import React, { Component } from "react";
import HomeView from './views/HomeView.js';
import ViewService from './ViewService.js';

class Home extends Component {
    constructor(props) {
      super(props);
    };

    selectServiceCategory = () => {
        this.props.navigation.navigate("ViewService");
    };    

    render() {
        return (
            <HomeView 
            navigation={this.props.navigation}
            selectServiceCategory = {this.selectServiceCategory}
          />
        )
    }
}
      

export default Home;