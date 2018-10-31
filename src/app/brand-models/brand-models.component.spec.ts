import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModelsComponent } from './brand-models.component';

describe('BrandModelsComponent', () => {
  let component: BrandModelsComponent;
  let fixture: ComponentFixture<BrandModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
