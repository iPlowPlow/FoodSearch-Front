import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMapComponent } from './page-map/page-map.component';


const routes: Routes = [
  { path : '', component: PageMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
