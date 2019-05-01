import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        loadChildren: './efwservice/employee/employee.module#EfwserviceEmployeeModule'
      },
      {
        path: 'feeling',
        loadChildren: './efwservice/feeling/feeling.module#EfwserviceFeelingModule'
      },
      {
        path: 'feel-wheel',
        loadChildren: './efwservice/feel-wheel/feel-wheel.module#EfwserviceFeelWheelModule'
      },
      {
        path: 'kollege',
        loadChildren: './glservice/kollege/kollege.module#GlserviceKollegeModule'
      },
      {
        path: 'bestellung',
        loadChildren: './glservice/bestellung/bestellung.module#GlserviceBestellungModule'
      },
      {
        path: 'kasten',
        loadChildren: './glservice/kasten/kasten.module#GlserviceKastenModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EuiEntityModule {}
