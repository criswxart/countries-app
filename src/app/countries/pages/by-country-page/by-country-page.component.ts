import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit{

  countries: Country[] = [];
  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }
  constructor(private countriesService: CountriesService) {}
  searchByCountry(term: string){
    this.countriesService.searchPais(term)
      .subscribe( country => this.countries = country );
  }
}
