import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from 'src/app/services/location/location.service';
import { AutocompleteComponent } from "../autocomplete/autocomplete.component";

@Component({
    selector: 'app-public-api-test',
    standalone: true,
    templateUrl: './public-api-test.component.html',
    styleUrl: './public-api-test.component.css',
    imports: [CommonModule, AutocompleteComponent]
})
export class PublicApiTestComponent {

  cities: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getCities('leuve').subscribe(data => {
      this.cities = data;
    })
  }
}
