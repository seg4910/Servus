import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const fetch = require("node-fetch");

class CreateLocation extends Component{
    constructor(props) {
        super(props);

        this.state = {
          userId: '',
          streetNumber: '',
          streetName: '',
          city: '',
          province: '',
          postalCode: '',
        }
      }

    createLocation = () => {
      alert("here!");
  
    }

    render(){
        return(
            <GooglePlacesAutocomplete
            placeholder='Search for location'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              this.state.streetNumber = details.address_components[0].short_name;
              this.state.streetName = details.address_components[1].short_name;
              this.state.city = details.address_components[3].short_name;
              this.state.province = details.address_components[5].short_name;
              this.state.postalCode = details.address_components[7].short_name;
              AsyncStorage.getItem('userId', (err, result) => {
                this.state.userId = result;
                var cmd = 'http://localhost:8080/api/createLocation/?userId=' + this.state.userId + '&streetNumber=' + this.state.streetNumber + '&streetName=' + this.state.streetName + '&city=' + this.state.city + '&province=' + this.state.province + '&postalCode=' + this.state.postalCode
                fetch(cmd)
                .then((response) => response.json())
                .then((responseJson) => {
                  alert("Location Added!");
                })
                .catch((error) =>{
                  console.error(error);
                });
              });
              this.props.navigation.navigate('Home')
        
            }}
      
            getDefaultValue={() => ''}
      
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyCvOPzSIVWupZFZt98IMDDDe4UKPkj7cz0',
              language: 'en', // language of the results
              types: 'address' // default: 'geocode'
            }}
      
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
      
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
      
      
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
            //renderRightButton={() => <Text>Custom text after the input</Text>}
          />      
        );
    }
}

export default CreateLocation;