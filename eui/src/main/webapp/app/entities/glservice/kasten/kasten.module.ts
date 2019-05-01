import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EuiSharedModule } from 'app/shared';
import {
  KastenComponent,
  KastenDetailComponent,
  KastenUpdateComponent,
  KastenDeletePopupComponent,
  KastenDeleteDialogComponent,
  kastenRoute,
  kastenPopupRoute
} from './';

const ENTITY_STATES = [...kastenRoute, ...kastenPopupRoute];

@NgModule({
  imports: [EuiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [KastenComponent, KastenDetailComponent, KastenUpdateComponent, KastenDeleteDialogComponent, KastenDeletePopupComponent],
  entryComponents: [KastenComponent, KastenUpdateComponent, KastenDeleteDialogComponent, KastenDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlserviceKastenModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
