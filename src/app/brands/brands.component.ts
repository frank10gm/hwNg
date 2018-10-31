import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand';
import { BRANDS } from '../mock-brands';
import { BrandService } from '../brand.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import { LanguageService } from '../language.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brand: Brand = {
    id: 1,
    name: 'Honda',
    description: ''
  };

  // brands = BRANDS;
  brands: Brand[];

  selectedHero: Brand;

  constructor(private brandService: BrandService,
    private router: Router,
    public languageService: LanguageService
  ) { }

  onSelect(brand: Brand): void {
    // this.selectedHero = hero;
    // this.router.navigate(['/detail/' + brand.id]);
  }

  getBrands(): void {
    // this.brands = this.brandService.getBrands();
    this.brandService.getBrands().subscribe(brands => this.brands = brands);
  }

  ngOnInit() {
    this.getBrands();
    this.languageService.img = '../assets/logo-park.png';
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.brandService.addBrand({ name } as Brand).subscribe(brand => {
      this.brands.push(brand);
    });
  }

  delete(brand: Brand): void {
    this.brands = this.brands.filter(h => h !== brand);
    this.brandService.deleteBrand(brand).subscribe();
  }

}
