import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/country';
import { Region } from '../../interface/region-type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {

  countries: Country[] = [];
  public regions: Region[] = ['Africa','America','Asia','Europe','Oceania'];
  public selectedRegion?: Region;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }


  constructor(private countriesService: CountriesService) {}
  searchByRegion(region: Region){
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
      .subscribe( country => this.countries = country );
  }
}
