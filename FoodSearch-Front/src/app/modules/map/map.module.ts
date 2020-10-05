import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { PageMapComponent } from './page-map/page-map.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [PageMapComponent, MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey,
      libraries: ['places']
    })
  ]
})
export class MapModule { }
