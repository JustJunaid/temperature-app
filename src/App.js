import React, { Component } from 'react';
import './App.css';

class App extends Component {

  callApi = async () => {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=605fd8751dfa134aa2b8287ca0aa650e'
    const response = await fetch(url)
    const body = await response.json()
    console.log(body)
  }

  submitForm = (e) => {
    e.preventDefault()
    const city = e.target.name.value
  }


  render() {
    return (
      <div className="App">
      <form style={{margin: '10% 40%'}} onSubmit={this.submitForm}>
        <div className="input-field">
          <input name="name" type="text" id="name" />
          <label for="name">Your name:</label>
          <button className="buttonfx angleinleft bouncein" type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  }
}

export default App;
