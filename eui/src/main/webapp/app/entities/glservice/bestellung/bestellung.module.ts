import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EuiSharedModule } from 'app/shared';
import {
  BestellungComponent,
  BestellungDetailComponent,
  BestellungUpdateComponent,
  BestellungDeletePopupComponent,
  BestellungDeleteDialogComponent,
  bestellungRoute,
  bestellungPopupRoute
} from './';

const ENTITY_STATES = [...bestellungRoute, ...bestellungPopupRoute];

@NgModule({
  imports: [EuiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BestellungComponent,
    BestellungDetailComponent,
    BestellungUpdateComponent,
    BestellungDeleteDialogComponent,
    BestellungDeletePopupComponent
  ],
  entryComponents: [BestellungComponent, BestellungUpdateComponent, BestellungDeleteDialogComponent, BestellungDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlserviceBestellungModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
