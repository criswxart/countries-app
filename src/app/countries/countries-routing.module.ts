import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';


const routes: Routes = [
    {
        path: 'region',
        component: ByRegionPageComponent
    },
    {
        path: 'country',
        component: ByCountryPageComponent
    },
    {
        path: 'capital',
        component:  ByCapitalPageComponent
    },
    {
        path: 'country/id',
        component: CountryPageComponent
    },
    {
      path: '**',
      redirectTo: 'capital'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class CountriesRoutingModule { }
