import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apikey = '2a444fca590795d3b6b2810d869290f5';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response.main && response.weather) {
          return {
            mintemp: this.formatTemperature(response.main.temp_min),
            maxtemp: this.formatTemperature(response.main.temp_max),
            humidity: response.main.humidity,
            weather: response.weather[0].main,
            description: response.weather[0].description,
          };
        }
        return null;
      })
    );
  }

  private formatTemperature(temperature: number): string {
    const roundedTemperature = Math.floor(temperature);

    return `${roundedTemperature}`;
  }
}
