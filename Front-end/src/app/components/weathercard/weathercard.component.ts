import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faCloudSun, faCloudSunRain, faCloudShowersHeavy, faCloudMoonRain, faCloudMoon, faSmog, faMoon, faSnowflake, faWind, faCloudBolt, faDroplet, faTemperatureArrowUp, faTemperatureArrowDown, faTemperatureHalf, faLocationArrow} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weathercard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './weathercard.component.html',
  styleUrl: './weathercard.component.css'
})
export class WeathercardComponent {
  faSun = faSun;
  faCloudSun = faCloudSun;
  faCloudSunRain = faCloudSunRain;
  faMoon = faMoon;
  faCloudMoon = faCloudMoon;
  FaCloudMoonRain = faCloudMoonRain;
  faCloudBolt = faCloudBolt;
  faCloudShowersHeavy = faCloudShowersHeavy;
  faSmog = faSmog;
  faSnowflake = faSnowflake;
  faWind = faWind;
  faDroplet = faDroplet;
  faTemperatureArrowUp = faTemperatureArrowUp;
  faTemperatureArrowDown = faTemperatureArrowDown;
  faTemperature = faTemperatureHalf;
  faLocationArrow = faLocationArrow;

  @Input() city: string = ''; 

  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if (this.city) {
      this.getWeatherData(this.city);  // Call the method to fetch weather data when the component is initialized
    }
  }

  getWeatherData(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weather = this.mapIcons(data);
      this.weather.dayOfWeek = this.getDayOfWeek();
    });
  }

  // https://openweathermap.org/weather-conditions
  private mapIcons(weatherData: any): any {
    //console.log(weatherData);
    const weatherCode = weatherData.weatherCode.toString();
  
    const sunrise = new Date(weatherData.sunrise * 1000); // Convert sunrise timestamp to Date
    const sunset = new Date(weatherData.sunset * 1000);   // Convert sunset timestamp to Date
    //console.log(sunset)
    const currentTime = new Date();
  
    const isDayTime = currentTime > sunrise && currentTime < sunset;
  
    switch (weatherCode.charAt(0)) {
      case '2':
        // Handle Thunderstorm icons
        return { ...weatherData, icon: this.faCloudBolt };
  
      case '3':
        // Handle Drizzle icons
        return { ...weatherData, icon: this.faCloudShowersHeavy };
  
      case '5':
        // Handle Rain icons
        if (isDayTime) {
          return { ...weatherData, icon: this.faCloudSunRain };
        } else {
          return { ...weatherData, icon: this.FaCloudMoonRain };
        }
  
      case '6':
        // Handle Snow icons
        return { ...weatherData, icon: this.faSnowflake };
  
      case '7':
        // Handle Atmosphere icons
        return { ...weatherData, icon: this.faSmog };
  
      case '8':
        // Handle Clear and Clouds icons
        if (weatherCode === '800') {
          return { ...weatherData, icon: isDayTime ? this.faSun : this.faMoon };
        } else {
          return { ...weatherData, icon: isDayTime ? this.faCloudSun : this.faCloudMoon };
        }
  
      default:
        return { ...weatherData, icon: null }; // No matching icon
    }
  }
  
  // Function to get the day of the week from a date string
  getDayOfWeek(): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    return daysOfWeek[date.getDay()];
  }
}
