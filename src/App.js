import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      locationDisplay: "",
      lat: "",
      lon: "",
      displayData: false,
      errorShow: false,
      errorWarning: "",
      weatherData: [],
      // moiveData:[],
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.CityName.value;
    try {
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_KEY}&q=${location}&format=json`
      );
      console.log(response);
      const locationData = response.data[0];
      const locationName = locationData.display_name.split(",")[0];
      const weatherResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND}/weather?lat=${locationData.lat}&lon=${locationData.lon}`
      );

      // console.log(weatherResponse);
      const moiveResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND}/moive?api_key=${process.env.REACT_APP_MOIVE_KEY}&query=${locationName}`
      );
      this.setState({
        locationData: locationData,
        locationDisplay: locationName,
        lat: locationData.lat,
        lon: locationData.lon,
        weatherData: weatherResponse.data,
        moiveData: moiveResponse.data,

        displayData: true,
        errorShow: true,
        mapShown: true,
      });
    } catch (fault) {
      this.setState({
        errorShow: true,
        errorWarning: `${fault.response.status} ${fault.response.data.error}`,
      });
    }
  };

  render() {
    return (
      <div class="main">
        <Form onSubmit={this.submitForm}>
          <Row className="align-items-center my-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City Name:</Form.Label>
              <Form.Control
                name="CityName"
                type="text"
                placeholder="Enter your city name"
              />
              <Button type="submit" value="Explore!" class="btn btn-primary">
                Explore!
              </Button>
            </Form.Group>
          </Row>
        </Form>

        <div>
          <h1>Location information</h1>
          {this.state.locationDisplay && <p>{this.state.locationDisplay}</p>}
          <div>
            {this.state.mapShown && (
              <p>
                <img
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MY_KEY}&center=${this.state.lat},${this.state.lon}`}
                  alt=""
                />
              </p>
            )}
          </div>
          <div>
            <p>{this.state.errorWarning}</p>
          </div>
          <div>
            {this.state.weatherData &&
              this.state.weatherData.map((weather) => {
                return (
                  <div>
                    <p>{weather.valid_date}</p>
                    <p>{weather.description} </p>
                  </div>
                );
              })}
          </div>
          <div>
            {this.state.moiveData &&
              this.state.moiveData.map((moive) => {
                return (
                  <div>
                    <p>{moive.title}</p>
                    <p>{moive.overview}</p>
                    <p>{moive.average_votes}</p>
                    <p>{moive.total_votes}</p>
                    <img  src={moive.image_url} />
                    <p>{moive.popularity}</p>
                    <p>{moive.released_on}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
