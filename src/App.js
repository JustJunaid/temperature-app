import React, { Component } from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';

class App extends Component {

  state = {
    currentTemp: '',
    currentHum: '',
    currentPrec: '',
    temps: [],
    humids: []
  }

  callApi = async (city) => {
    const apiKey = '605fd8751dfa134aa2b8287ca0aa650e'
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    const currentParams = data.list[0]
    const currentTemp = currentParams.main.temp
    const currentHum = currentParams.main.humidity
    const currentPrec = currentParams.weather[0].description
    this.setState({currentTemp: currentTemp, currentHum: currentHum, currentPrec: currentPrec})
    return data
  }

  callApiGraph = async (city) => {
    const apiKey = 'e1d0dac6f6be4d57b0c192458192103'
    const startDate = '2019-03-17'
    const endDate = '2019-03-13'
    const url = `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${apiKey}&q=${city}&format=json&date=${startDate}&endate=${endDate}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }

  submitForm = async (e) => {
    e.preventDefault()
    this.setState({ temps: [], humids: [] })
    const city = e.target.name.value
    const data = await this.callApi(city)
    console.log(data)
    for (let i = 0; i < data.list.length; i += 8) {
      this.setState({ temps: [...this.state.temps, data.list[i].main.temp], humids: [...this.state.humids, data.list[i].main.humidity] })
    }
  }

  getDay = (number) => {
    let day = ''
    switch (number) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
         day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break
      default:
        day = "Sunday"
    }
    return day
  }

  render() {
    let currentDayNumber = new Date().getDay()
    const data = {
      labels: [this.getDay(currentDayNumber), this.getDay(currentDayNumber+=1), this.getDay(currentDayNumber+=1), this.getDay(currentDayNumber+=1), this.getDay(currentDayNumber+=1)],
      datasets: [{
        type: 'line',
        label: 'Temperature',
        borderColor: '#2196F3',
        borderWidth: 2,
        fill: false,
        data: this.state.temps.map(temp => parseInt(temp))
      }, {
        type: 'line',
        label: 'Humidity',
        borderColor: '#797979',
        borderWidth: 2,
        fill: false,
        data: this.state.humids.map(humidity => parseInt(humidity)),
      }, {
        type: 'line',
        label: 'Precipitation',
        borderColor: '#c2c2c2',
        borderWidth: 2,
        fill: false,
        data: [
          41,
          52,
          24,
          74,
          23,
          21,
          32
        ]
      }]
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Graph showing variations of the above Params for the next five days.'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    };
    return (
      <div className="App">
        <q style={{fontWeight: '400', fontFamily: 'courier', fontSize: '28px'}}>Smart, accurate weather has always been the number one goal of Funny Or Die, despite what you might have thought</q>
        <h2 style={{fontWeight: '400', textAlign: 'center'}}>Want to check the weather? Here you go!</h2>
        <form onSubmit={this.submitForm}>
          <div className="input-field">
          <InputText placeholder="Enter City Name" autoFocus="true" style={{ padding: '1em 1.2em' }} name="name" id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
            <button style={{marginLeft: '2rem'}} className="buttonfx angleinleft bouncein" type="submit">Check</button>
          </div>
        </form>

        <div class="p-datatable p-component">
        <div class="p-datatable-wrapper">
            <table>
              <thead class="p-datatable-thead">
                  <tr>
                    <th class=""><span class="p-column-title">Current Params</span></th>
                    <th class=""><span class="p-column-title">Values</span></th>
                  </tr>
              </thead>
              <tbody class="p-datatable-tbody">
                  <tr class="p-datatable-emptymessage">
                    <td>Temperature</td>
                    <td>{this.state.currentTemp}</td>
                  </tr>
                  <tr class="p-datatable-emptymessage">
                    <td>Humidity</td>
                    <td>{this.state.currentHum}</td>
                  </tr>
                  <tr class="p-datatable-emptymessage">
                    <td>Precipitation(mode)</td>
                    <td>{this.state.currentPrec}</td>
                  </tr>
                  <tr class="p-datatable-emptymessage">
                    <td>Temperature for the next Five days</td>
                    <td>{this.state.temps.map(temp => <span>{temp}, </span>)}</td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>

      
        <div className="content-section introduction" style={{marginTop: '4rem'}}>
          <div className="feature-intro">
          </div>
        </div>

        <div className="content-section implementation" style={{marginBottom: '4rem'}}>
          <Chart type="bar" data={data} options={options} />
        </div>
      </div>
    );
  }
}

export default App;
