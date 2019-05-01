import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EuiSharedLibsModule, EuiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { JhMaterialModule } from 'app/shared/jh-material.module';
@NgModule({
  imports: [JhMaterialModule, EuiSharedLibsModule, EuiSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhMaterialModule, EuiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EuiSharedModule {
  static forRoot() {
    return {
      ngModule: EuiSharedModule
    };
  }
}
