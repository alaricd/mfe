import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {loadRemoteModule} from '@angular-architects/native-federation';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'flights',
    loadComponent: () =>
      loadRemoteModule({
  remoteName: 'remote-1', exposedModule: './Flights'})
      .then((m) => {
        console.log('Remote module loaded successfully');
        return m.FlightsComponent;
      })
      .catch((err) => {
        console.error('Error loading remote module:', err);
        throw err;
      }),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },

  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
