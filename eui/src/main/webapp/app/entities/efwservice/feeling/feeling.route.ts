import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Feeling } from 'app/shared/model/efwservice/feeling.model';
import { FeelingService } from './feeling.service';
import { FeelingComponent } from './feeling.component';
import { FeelingDetailComponent } from './feeling-detail.component';
import { FeelingUpdateComponent } from './feeling-update.component';
import { FeelingDeletePopupComponent } from './feeling-delete-dialog.component';
import { IFeeling } from 'app/shared/model/efwservice/feeling.model';

@Injectable({ providedIn: 'root' })
export class FeelingResolve implements Resolve<IFeeling> {
  constructor(private service: FeelingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFeeling> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Feeling>) => response.ok),
        map((feeling: HttpResponse<Feeling>) => feeling.body)
      );
    }
    return of(new Feeling());
  }
}

export const feelingRoute: Routes = [
  {
    path: '',
    component: FeelingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeeling.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FeelingDetailComponent,
    resolve: {
      feeling: FeelingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeeling.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FeelingUpdateComponent,
    resolve: {
      feeling: FeelingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeeling.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FeelingUpdateComponent,
    resolve: {
      feeling: FeelingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeeling.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const feelingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FeelingDeletePopupComponent,
    resolve: {
      feeling: FeelingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeeling.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
