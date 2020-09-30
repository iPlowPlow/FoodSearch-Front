import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  markers: marker[] = []


  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 1;
  lng: number = 1;

  constructor(private mapsAPILoader: MapsAPILoader, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getPosition().then(result => {
      this.lat = result.lat;
      this.lng = result.lng;
    })

  }

  mapClicked($event: MouseEvent) {

  }

  mapReady($event: any) {

    this.displayRestaurant($event);
  }

  displayRestaurant(map: any) {
    var myLocalisation = new google.maps.LatLng(this.lat, this.lng);
    var request = {
      location: myLocalisation,
      radius: '5000',
      type: ['restaurant']
    };
    var service;
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.markers.push({
            lat: results[i].geometry.location.lat(),
            lng: results[i].geometry.location.lng(),
            label: results[i].name,
            address: results[i].vicinity,
            star: results[i].rating,
            photo: []
          })
        }
      }
    });

  }


}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label: string;
  address: string;
  star: number;
  photo: string[]; 

}
