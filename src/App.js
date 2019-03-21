import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    currentTemp: '',
    currentHum: '',
    currentPrec: ''
  }

  callApi = async (city) => {
    const apiKey = '605fd8751dfa134aa2b8287ca0aa650e'
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    const currentParams = data.list[0]
    const currentTemp = currentParams.main.temp
    const currentHum = currentParams.main.humidity
    const currentPrec = currentParams.weather[0].description
    this.setState({currentTemp: currentTemp, currentHum: currentHum, currentPrec: currentPrec})
  }

  submitForm = (e) => {
    e.preventDefault()
    const city = e.target.name.value
    this.callApi(city)
  }


  render() {
    const currentParams = (this.state.currentTemp && 
      <h2>Current Temperature: {this.state.currentTemp}, Humidity: {this.state.currentHum}, Precipitation(mode): {this.state.currentPrec}</h2>)
    return (
      <div className="App">
      <form style={{margin: '10% 40%'}} onSubmit={this.submitForm}>
        <div className="input-field">
          <input name="name" type="text" id="name" required/>
          <label>Enter City Name Here:</label>
          <button className="buttonfx angleinleft bouncein" type="submit">Submit</button>
        </div>
      </form>
      {currentParams ? currentParams: <h2>Current Params will go Here...</h2>}
      </div>
    );
  }
}

export default App;
