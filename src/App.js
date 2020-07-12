import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/weather-icons/css/weather-icons.min.css";
import "../node_modules/weather-icons/css/weather-icons-wind.min.css";
import Weather from "./Components/weather.component";
import "./App.css";

import Form from "./Components/form.component.jsx";
const apiKEY = "f802993b7ebf5c7e0bab17609e0b3bdf";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      clouds: undefined,
      celsius : undefined,
      fahren: undefined,
      temp_max : undefined,
      temp_min : undefined,
      pressure: undefined,
      humidity: undefined,
      description: "",
      error: false,
      time: undefined,
      weatherIcon : undefined,
      wind: undefined,
      wind_direction : undefined
    };
    this.getWeather = this.getWeather.bind(this);
     
    this.weatherIcon = {
      Thunderstorm : "wi-thunderstorm",
      Drizzle :"wi-sleet",
      Rain: "wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere: "wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
    

  }
  get_WeatherIcon(icons,rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <=232:
        this.setState({
          icon:this.weatherIcon.Thunderstorm
        });
        break;
      case rangeID >= 300 && rangeID <=321:
        this.setState({
          icon:this.weatherIcon.Drizzle
        });
        break;
      case rangeID >= 500 && rangeID <=532:
        this.setState({
          icon:this.weatherIcon.Rain
        });
        break;
      case rangeID >= 600 && rangeID <=622:
        this.setState({
          icon:this.weatherIcon.Snow
        });
        break;
      case rangeID >= 701 && rangeID <=781:
        this.setState({
          icon:this.weatherIcon.Atmosphere
        });
        break;
      case rangeID >= 801 && rangeID <=804:
        this.setState({
          icon:this.weatherIcon.Clouds
        });
        break;
      default:
        this.setState({
          icon:this.weatherIcon.Clouds
        });
    }
  }
  


  calCel(temp) {
    return Math.floor(temp-273.15);
  }
  calFahren(temp) {
    //(0K − 273.15) × 9/5 + 32 formula
    return Math.floor((temp -273.15)*9/5 +32);

  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKEY}`);
      const response  = await api_call.json();
      console.log(response);
      this.setState({
      city: response.name,
      country: response.sys.country,
      time: new Date(response.timezone * 1000).toISOString().substr(11, 8),
      clouds: response.clouds.all,
      celsius :this.calCel(response.main.temp),
      fahren:this.calFahren(response.main.temp),
      temp_max : this.calCel(response.main.temp_max),
      temp_min : this.calCel(response.main.temp_min),
      pressure: Math.floor(response.main.pressure * 0.02953),
      humidity: response.main.humidity,
      description: response.weather[0].description,
      wind: response.wind.speed,
      wind_direction : response.wind.deg,
      
     });
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    }else{
      this.setState({
        error : true
      })
    }
    

  };
  render(){
    return (
      <div className="App">

        <Form loadWeather={this.getWeather} error = {this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        time={this.state.time}
        temp_celsius={this.state.celsius}
        temp_fahren = {this.state.fahren}
        temp_max={this.state.temp_max} 
        temp_min={this.state.temp_min}
        pressure = {this.state.pressure}
        humidity = {this.state.humidity}
        description={this.state.description}
        wind ={this.state.wind}
        wind_direction = {this.state.wind_direction}
        icon= {this.state.icon}
        clouds={this.state.clouds}
        />
    </div>

    )
  }
}


export default App;
