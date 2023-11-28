import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-weathercard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weathercard.component.html',
  styleUrl: './weathercard.component.css'
})
export class WeathercardComponent {

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
      this.weather = data;
    });
  }

}
