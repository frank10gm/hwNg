import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { MessageService } from '../message.service';
import { LanguageService } from '../language.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  brands: Brand[] = [];
  lang = '';

  constructor(private brandService: BrandService, private messageService: MessageService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getBrands();
    this.lang = this.languageService.lang;
    this.languageService.img = '../assets/logo.png';
  }

  getBrands(): void {
    this.brandService.getBrands()
      .subscribe(brands => this.brands = brands.slice(1, 5));
  }

}
