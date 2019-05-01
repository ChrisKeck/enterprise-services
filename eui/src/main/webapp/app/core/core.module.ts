import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/de';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'app/core/in-memory-data.service';
import { BUILD_PROFILE } from 'app/app.constants';

@NgModule({
  imports: [
    HttpClientModule,
    BUILD_PROFILE === 'standalone'
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500, passThruUnknownUrl: true, put204: false, post204: false })
      : []
  ],
  exports: [],
  declarations: [],
  providers: [
    Title,
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
    DatePipe
  ]
})
export class EuiCoreModule {
  constructor() {
    registerLocaleData(locale);
  }
}
