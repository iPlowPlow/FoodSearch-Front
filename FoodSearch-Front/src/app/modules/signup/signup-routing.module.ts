import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSignupComponent } from './page-signup/page-signup.component';


const routes: Routes = [
  { path : '', component: PageSignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
