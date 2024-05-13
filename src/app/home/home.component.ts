import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
 housingLocationList: Housinglocation[] = [];
 housingService: HousingService = inject(HousingService);
 filteredLocationList: Housinglocation[] = [];

 constructor() {
  this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[]) => {
    this.housingLocationList = housingLocationList;
    // filteredLocationList starts off with all results since filter input starts empty
    this.filteredLocationList = housingLocationList;
  });
 }

 filterResults(text: string) {
  // get all results if search button is clicked with no input
  if (!text) this.filteredLocationList = this.housingLocationList;
  
  this.filteredLocationList = this.housingLocationList.filter(
    housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
  );
 }
}
