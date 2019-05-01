import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { CookieModule } from 'ngx-cookie';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [NgbModule, InfiniteScrollModule, CookieModule.forRoot(), FontAwesomeModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule,
    NgJhipsterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class EuiSharedLibsModule {
  static forRoot() {
    return {
      ngModule: EuiSharedLibsModule
    };
  }
}
