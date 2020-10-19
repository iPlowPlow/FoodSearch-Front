import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { FoodService } from 'src/app/shared/services/food.service';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AbstractComponent } from 'src/app/core/components/abstract/abstract.component';
import { ConfigService } from 'src/app/core/services/service-config/config.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends AbstractComponent implements OnInit {

  foodForm = new FormControl();

  myPositionMarker: Marker;
  markers: Marker[] = [];
  map: any;

  foodList: string[];

  // google maps zoom level
  zoom = 15;

  // initial center position for the map
  lat = 1;
  lng = 1;

  constructor(public configService: ConfigService, private locationService: LocationService, private foodService: FoodService) {
    super(configService);
  }

  ngOnInit(): void {
    this.locationService.getPosition().then(result => {
      this.lat = result.lat;
      this.lng = result.lng;
      this.myPositionMarker = {
        lat: this.lat,
        lng: this.lng,
        label:"",
        address: "",
        star: 0,
        photo: []
      }
    });

    this.foodService.getFood().pipe(
      map(x => x.map(y => y.libelle))
    ).subscribe(
      result => {
        this.foodList = result;
      }
    )

  }

  initMap(map: any) {
    this.map = map;
    const myLocalisation = new google.maps.LatLng(this.lat, this.lng);
    const request = {
      location: myLocalisation,
      radius: '5000',
      type: ['restaurant']
    };
    this.placesService(request);

  }



  filter(value: string) {

    const myLocalisation = new google.maps.LatLng(this.lat, this.lng);
    let request;
    if (value !== 'all') {
      request = {
        location: myLocalisation,
        radius: '5000',
        type: ['restaurant'],
        keyword: value
      };

    } else {
      request = {
        location: myLocalisation,
        radius: '5000',
        type: ['restaurant']
      };
    }
    this.placesService(request);


  }

  placesService(request) {
    let service;
    service = new google.maps.places.PlacesService(this.map);
    this.markers = [];

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        
        for (const result of results) {
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
