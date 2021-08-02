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
      locationDisplay: "",
      latitude: "",
      longitude: "",
      displayData: false,
      errorShow: false,
      errorWarning: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.CityName.value;

    try {
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_KEY}&q=${location}&format=json`
      );

      console.log("our axios response", response.data[0]);

      this.setState({
        locationDisplay: response.data[0].display_name,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
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
    <Form.Control name="CityName"
            type="text"
            placeholder="Enter your city name" />
    <Button type="submit" value="Explore!" class="btn btn-primary">Explore!</Button>
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
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MY_KEY}&center=${this.state.latitude},${this.state.longitude}`}
              
                  alt=""
                />
              </p>
            )}
          </div>
          <div>
            <p>{this.state.errorWarning}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
