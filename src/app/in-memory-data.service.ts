import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const brands = [
      { id: 11, name: 'Aston Martin', description: '' },
      { id: 12, name: 'Audi', description: '' },
      { id: 13, name: 'BMW', description: '' },
      { id: 14, name: 'Fiat', description: '' },
      { id: 15, name: 'Honda', description: '' },
      { id: 16, name: 'Jaguar', description: '' },
      { id: 17, name: 'Mazda', description: '' },
      { id: 18, name: 'Peugeot', description: '' },
      { id: 19, name: 'Porsche', description: '' },
      { id: 20, name: 'Renault', description: '' }
    ];
    return {brands};
  }

  constructor() { }
}
