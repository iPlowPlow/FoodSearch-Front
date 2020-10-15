import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'map' ,  loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule), canActivate: [AuthGuard]},
  { path: 'signup' ,  loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)},
  { path: '' ,  loadChildren: () => import('./modules/authentification/authentification.module').then(m => m.AuthentificationModule)},
  { path: '**',  redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
