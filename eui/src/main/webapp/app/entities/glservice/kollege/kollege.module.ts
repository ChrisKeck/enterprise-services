import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EuiSharedModule } from 'app/shared';
import {
  KollegeComponent,
  KollegeDetailComponent,
  KollegeUpdateComponent,
  KollegeDeletePopupComponent,
  KollegeDeleteDialogComponent,
  kollegeRoute,
  kollegePopupRoute
} from './';

const ENTITY_STATES = [...kollegeRoute, ...kollegePopupRoute];

@NgModule({
  imports: [EuiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    KollegeComponent,
    KollegeDetailComponent,
    KollegeUpdateComponent,
    KollegeDeleteDialogComponent,
    KollegeDeletePopupComponent
  ],
  entryComponents: [KollegeComponent, KollegeUpdateComponent, KollegeDeleteDialogComponent, KollegeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlserviceKollegeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
