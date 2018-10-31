import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  lang = '';
  img = '../assets/logo.png';
  url = 'http://localhost:8087/hackweb/api/?v=3';
  it = '';
  en = '';

  constructor(private http: HttpClient) { }

  getTranslation(lang: string[]): Observable<JSON> {        
    const data = JSON.stringify({'action': 'getTranslation', 'version': '3', 'data': { 'lang': lang } });
    return this.http.post(this.url, data, httpOptions).pipe(
      // tap(data => console.log('res: ' + JSON.stringify(data))),
      catchError(err => of(null))
    );
  }
}
