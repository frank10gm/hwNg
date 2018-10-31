import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Brand } from './brand';
import { BRANDS } from './mock-brands';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  // private brandsUrl = 'api/brands';  // URL to web api
  // private brandsUrl = 'https://www.hackweb.it/api/?v=3';  // URL to web api
  private brandsUrl = 'http://localhost:8087/hackweb/api/?v=3';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // getBrands(): Brand[] {
  //   return BRANDS;
  // }

  getBrands(): Observable<Brand[]> {
    // this.messageService.add('ho caricato i brand');
    // return of(BRANDS);

    // return this.http.get<Brand[]>(this.brandsUrl, httpOptions)
    //   .pipe(
    //     tap(brands => this.log(`fetched brands`)),
    //     catchError(this.handleError('getBrands', []))
    //   );

    const data = JSON.stringify({'action': 'getBrands', 'version': '3', 'data': {  } });

    return this.http.post<Brand[]>(this.brandsUrl, data, httpOptions).pipe(
      tap(_ => this.log('added brand')),
      // catchError(this.handleError<Brand[]>('add Brand'))
      catchError(err => of(null))
    );
  }

  // getBrand(id: number): Observable<Brand> {
  //   // this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   // return of(BRANDS.find(brand => brand.id === id));
  //   const url = `${this.brandsUrl}/${id}`;
  //   return this.http.get<Brand>(url)
  //     .pipe(
  //       tap(_ => this.log(`fetched brand id=${id}`)),
  //       catchError(this.handleError<Brand>(`getHero id=${id}`))
  //     );
  // }

  getBrand(id: number): Observable<Brand> {
    // const url = this.brandsUrl + '/?id=' + id;
    // return this.http.get<Brand[]>(url)
    //   .pipe(
    //     map(brands => brands[0]),
    //     tap(h => this.log('fetching')),
    //     catchError(this.handleError('getbrand'))
    //   );

    const data = JSON.stringify({'action': 'test', 'version': '3', 'data': { 'name': 'stocazzo' } });

    return this.http.post<Brand>(this.brandsUrl, data, httpOptions).pipe(
      tap(_ => this.log('added brand')),
      catchError(this.handleError<Brand>('add Brand'))
    );

  }

  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateBrand (brand: Brand): Observable<any> {
    return this.http.put(this.brandsUrl, brand, httpOptions).pipe(
      tap(_ => this.log('update')),
      catchError(this.handleError<any>('updateBrand'))
    );
  }

  addBrand (brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.brandsUrl, brand, httpOptions).pipe(
      tap(_ => this.log('added brand')),
      // catchError((err, caught) => {
      //   return of(null);
      // })
      catchError(this.handleError<Brand>('add Brand'))
    );
  }

  deleteBrand (brand: Brand): Observable<Brand> {
    const id = typeof brand === 'number' ? brand : brand.id;
    const url = this.brandsUrl + '/' + id;
    return this.http.delete<Brand>(url, httpOptions).pipe(
      tap(_ => this.log('delete')),
      catchError(err => of(null))
    );
  }

  searchBrands (term: string): Observable<Brand[]> {
    if (!term.trim()) { return of([]); }
    const url = this.brandsUrl + '/?name=' + term;
    return this.http.get<Brand[]>(url).pipe(
      tap(_ => this.log('searching for brands')),
      catchError(err => of(null))
    );
  }

}
