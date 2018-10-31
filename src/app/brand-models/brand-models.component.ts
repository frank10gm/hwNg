import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-models',
  templateUrl: './brand-models.component.html',
  styleUrls: ['./brand-models.component.css']
})

export class BrandModelsComponent implements OnInit {

  @Input() brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private location: Location
  ) {
    
  }

  ngOnInit() {
    this.getBrand();
  }

  getBrand(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.brandService.getBrand(id)
      .subscribe(brand => this.brand = brand);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.brandService.updateBrand(this.brand)
      .subscribe(() => this.goBack());
  }

}
