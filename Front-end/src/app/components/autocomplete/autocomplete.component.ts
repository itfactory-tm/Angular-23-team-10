import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Output() citySelected = new EventEmitter<any>();

  cities: any[] = [];
  cityInput = '';

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {}

  onCityInput() {
    if (this.cityInput.trim() !== '') {
      this.locationService.getCities(this.cityInput).subscribe(data => {
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }

  selectCity(city: any) {
    this.cityInput = `${city.name}, ${city.country} (${city.adminName})`;
    this.cities = []; // Clear dropdown
    this.citySelected.emit(city); // Emit selected city
  }
}
