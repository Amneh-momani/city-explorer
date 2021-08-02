import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.CityName.value;
    // zoom=${value}
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_KEY}&q=${location}&format=json`
    );
    // const cityMap = await axios.get(
    //   `https://maps.locationiq.com/v3/staticmap?key=${
    //     process.env.REACT_APP_MY_KEY
    //   }&center=${(location.lat+location.lon)}&zoom=18`
    // );

    console.log("our axios response", response.data[0]);

    this.setState({
      locationData: response.data[0],
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>City Name:</label>
          <input
            name="CityName"
            type="text"
            placeholder="Enter your city name"
          />
          <input type="submit" value="Explore!" />
        </form>
        <div>
          <h1>Location information</h1>
          {this.state.locationData.display_name && (
            <p>{this.state.locationData.display_name}</p>
          )}
        </div>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13526.838241227573!2d36.05671945!3d32.05005204999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65a9288214cf%3A0x119057935f196a90!2z2LbYp9it2YrYqSDZhdmD2Kk!5e0!3m2!1sar!2sjo!4v1627874902269!5m2!1sar!2sjo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
      </div>
    );
  }
}

export default App;
