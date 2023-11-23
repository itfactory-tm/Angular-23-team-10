import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-public-api-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-api-test.component.html',
  styleUrl: './public-api-test.component.css'
})
export class PublicApiTestComponent {

  cities: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getCities().subscribe(data => {
      this.cities = data.geonames;
    })
  }
}
