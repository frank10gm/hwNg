import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';

// import * as $ from 'jquery';

import { MessageService } from './message.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Park // by hackweb';
  lang = '';
  it = '';
  langVal = false;

  constructor(
    private messageService: MessageService,
    public translate: TranslateService,
    route: ActivatedRoute,
    router: Router,
    private location: Location,
    public languageSercice: LanguageService
  ) {

    // translate.setTranslation('en', {
    //   HELLO: 'hello {{value}}'
    // });
    // translate.setTranslation('it', {
    //   HELLO: 'ciao {{value}}'
    // });

    translate.setDefaultLang('it');
    languageSercice.lang = this.lang;

    router.events.subscribe((e) => {
      if (e instanceof RoutesRecognized) {
        if (typeof e.state.root.firstChild.params.lang !== 'undefined') {
          this.lang = e.state.root.firstChild.params.lang;
          translate.use(this.lang);
          this.langVal = true;
          languageSercice.lang = this.lang;
        } else {
          this.lang = 'it';
          translate.use(this.lang);
          languageSercice.lang = this.lang;
          // this.langVal = false;
        }
      }
    });

  }

  ngOnInit() {
    setTimeout(() => {
      this.messageService.add('Benvenuto su hackweb');
      setTimeout(() => {
        this.messageService.remove();
      }, 5000);
    }, 2000);

    //traduzioni
    this.languageSercice.getTranslation(['it','en']).subscribe(json => {
      // Object.keys(json).forEach(function(k){
      //   console.log(k + ' - ' + JSON.stringify(json[k]));
      // });      
      
      for (var k in json) {
        if (json.hasOwnProperty(k)) {          
          this.translate.setTranslation(k, json[k]);
        }
      }
     
    });
  }

}
