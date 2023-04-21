import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, pipe, tap } from 'rxjs';
import { Country } from '../interface/country';
import { CacheStore } from '../interface/cache-store.interface';
import { Region } from '../interface/region-type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital : { term : '' , countries : [] },
        byCountry : { term : '' , countries : [] },
        byRegion : { region : '' , countries : [] }
    }

    constructor(private http: HttpClient) {
        this.loadFromLocalStorage();
     }

    private saveToLocalStore(){
        localStorage.setItem( 'CacheStore', JSON.stringify(this.cacheStore) )
    }

    private loadFromLocalStorage(){
        if( !localStorage.getItem('CacheStore')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('CacheStore')!);
    }

    private getCountryHttp( url: string ): Observable<Country[]>{
        return this.http.get<Country[]>( url )
        .pipe(
            // delay(2000),
            //regresa un nuevo observable con el arreglo vacío
            catchError( error => of([]) )
        );
    }

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        const url = `${ this.apiUrl }/alpha/${ code }`;
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null ),
                //regresa un nuevo observable con el arreglo vacío
                catchError( () => of( null ) )
            );
    }
    

    searchCapital( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/capital/${ term }`;
        return this.getCountryHttp( url )
        .pipe(
            tap( countries => { this.cacheStore.byCapital = { term, countries } } ),
            tap( () =>this.saveToLocalStore() )
        )
    }
    
    searchPais( term: string ): Observable<Country[]> {
        const url = `${ this.apiUrl }/name/${ term }`;
        return this.getCountryHttp( url )
        .pipe(
            tap( countries => { this.cacheStore.byCountry = { term, countries } } ),
            tap( () =>this.saveToLocalStore() )
        )
    }

    searchRegion( region: Region ): Observable<Country[]> {
        const url = `${ this.apiUrl }/region/${ region }`;
        return this.getCountryHttp( url )
        .pipe(
            tap( countries => { this.cacheStore.byRegion = { region, countries } } ),
            tap( () =>this.saveToLocalStore() )
        )
    }
}