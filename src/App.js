import React, { Component } from 'react'
import axios from 'axios';

export class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
    }
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.CityName.value;
    const response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_KEY}&q=${location}&format=json`);

    console.log('our axios response', response.data[0]);

    this.setState({
      locationData: response.data[0]
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>
            City Name:
          </label>
          <input name="CityName" type="text" placeholder="Enter your city name" />
          <input type="submit" value="Explore!" />
        </form>
        <div>
          <h1>
            Location information
          </h1>
          {
            this.state.locationData.display_name &&
            <p>
              {this.state.locationData.display_name}
            </p>
          }
        </div>
      </div>
    )
  }
}

export default App