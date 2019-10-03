import React, { Component } from "react";
import HomeView from './views/appViews/HomeView.js';

class Home extends Component {
    constructor(props) {
      super(props);
    };

    selectServiceCategory = (cat) => {
        console.log(cat);
        this.props.navigation.navigate("ServicePreview", {
          serviceCat: cat
        });
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