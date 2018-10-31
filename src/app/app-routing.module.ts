import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandModelsComponent } from './brand-models/brand-models.component';
// import { LocalizeRouterModule, LocalizeParser, ManualParserLoader, LocalizeRouterSettings } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  { path: ':lang/brands', component: BrandsComponent },
  { path: ':lang/dashboard', component: DashboardComponent },
  { path: ':lang', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: BrandModelsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // LocalizeRouterModule.forRoot(routes, {
    //   parser: {
    //     provide: LocalizeParser,
    //     useFactory: (translate, location, settings) =>
    //       new ManualParserLoader(translate, location, settings, ['en', 'it'], 'hw'),
    //     deps: [TranslateService, Location, LocalizeRouterSettings]
    //   }
    // })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
