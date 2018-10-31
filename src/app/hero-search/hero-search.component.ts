import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {
  brands$: Observable<Brand[]>;
  private searchTerms = new Subject<string>();
  @ViewChild('searchModal') modal: ElementRef;

  constructor(private brandService: BrandService) { }

  search(term: string) {
    this.searchTerms.next(term);  
  }

  ngOnInit() {
    this.brands$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.brandService.searchBrands(term))
    );
  }

}
