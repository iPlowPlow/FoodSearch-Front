import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { FormSignupComponent } from './form-signup/form-signup.component';
import { PageSignupComponent } from './page-signup/page-signup.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [FormSignupComponent, PageSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SharedModule,
  ],
  entryComponents: [FormSignupComponent, PageSignupComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class SignupModule { }
