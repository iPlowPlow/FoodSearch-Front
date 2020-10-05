import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  markers: Marker[] = [];


  // google maps zoom level
  zoom = 15;

  // initial center position for the map
  lat = 1;
  lng = 1;

  constructor(private mapsAPILoader: MapsAPILoader, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getPosition().then(result => {
      this.lat = result.lat;
      this.lng = result.lng;
    });

  }

  mapClicked($event: MouseEvent) {

  }

  mapReady($event: any) {

    this.displayRestaurant($event);
  }

  displayRestaurant(map: any) {
    const myLocalisation = new google.maps.LatLng(this.lat, this.lng);
    const request = {
      location: myLocalisation,
      radius: '5000',
      type: ['restaurant']
    };
    let service;
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const result of  results) {
          this.markers.push({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            label: result.name,
            address: result.vicinity,
            star: result.rating,
            photo: []
          });
        }
      }
    });

  }


}


// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label: string;
  address: string;
  star: number;
  photo: string[];

}
