import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { PageAuthComponent } from './page-auth/page-auth.component';
import { FormAuthComponent } from './form-auth/form-auth.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';


@NgModule({
  declarations: [PageAuthComponent, FormAuthComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer)
  ]
})
export class AuthentificationModule { }
