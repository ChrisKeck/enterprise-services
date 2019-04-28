import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EuiSharedModule } from 'app/shared';
import {
  FeelingComponent,
  FeelingDetailComponent,
  FeelingUpdateComponent,
  FeelingDeletePopupComponent,
  FeelingDeleteDialogComponent,
  feelingRoute,
  feelingPopupRoute
} from './';

const ENTITY_STATES = [...feelingRoute, ...feelingPopupRoute];

@NgModule({
  imports: [EuiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FeelingComponent,
    FeelingDetailComponent,
    FeelingUpdateComponent,
    FeelingDeleteDialogComponent,
    FeelingDeletePopupComponent
  ],
  entryComponents: [FeelingComponent, FeelingUpdateComponent, FeelingDeleteDialogComponent, FeelingDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EfwserviceFeelingModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
