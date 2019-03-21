import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    currentTemp: '',
    currentHum: '',
    currentPrec: '',
    temps: []
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
    return data
  }

  submitForm = async (e) => {
    e.preventDefault()
    const city = e.target.name.value
    const data = await this.callApi(city)
    for (let i=0; i<data.list.length; i+=8) {
      this.setState({temps: [...this.state.temps, data.list[i].main.temp]})
    }
  }


  render() {
    const currentParams = (this.state.currentTemp && 
      <h2>
        Current Temperature: <b>{this.state.currentTemp}</b>, Humidity: <b>{this.state.currentHum}</b>, Precipitation(mode): <b>{this.state.currentPrec}</b> <br/>
        Temperatures for the Next Five Days: {this.state.temps.map(temp => <span style={{color: '#f00'}}>{temp}, </span>)}
      </h2>
      )
    return (
      <div className="App">
        <p>Click the Input line to see the Animation</p>
        <form style={{margin: '5% 40%'}} onSubmit={this.submitForm}>
          <div className="input-field">
            <input name="name" type="text" id="name" required/>
            <label>Enter City Name Here:</label>
            <button className="buttonfx angleinleft bouncein" type="submit">Submit</button>
          </div>
        </form>
        <div style={{margin: '10%'}}>
          {currentParams ? currentParams: <h2>Params will go Here...</h2>}
          <h2></h2>
        </div>
      </div>
    );
  }
}

export default App;
