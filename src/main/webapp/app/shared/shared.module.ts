import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EuiSharedLibsModule, EuiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [EuiSharedLibsModule, EuiSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [EuiSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EuiSharedModule {
  static forRoot() {
    return {
      ngModule: EuiSharedModule
    };
  }
}
