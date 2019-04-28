import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EuiSharedModule } from 'app/shared';
import {
  FeelWheelComponent,
  FeelWheelDetailComponent,
  FeelWheelUpdateComponent,
  FeelWheelDeletePopupComponent,
  FeelWheelDeleteDialogComponent,
  feelWheelRoute,
  feelWheelPopupRoute
} from './';

const ENTITY_STATES = [...feelWheelRoute, ...feelWheelPopupRoute];

@NgModule({
  imports: [EuiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FeelWheelComponent,
    FeelWheelDetailComponent,
    FeelWheelUpdateComponent,
    FeelWheelDeleteDialogComponent,
    FeelWheelDeletePopupComponent
  ],
  entryComponents: [FeelWheelComponent, FeelWheelUpdateComponent, FeelWheelDeleteDialogComponent, FeelWheelDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EfwserviceFeelWheelModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
