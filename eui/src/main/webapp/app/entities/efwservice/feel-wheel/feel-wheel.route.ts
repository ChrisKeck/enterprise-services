import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';
import { FeelWheelService } from './feel-wheel.service';
import { FeelWheelComponent } from './feel-wheel.component';
import { FeelWheelDetailComponent } from './feel-wheel-detail.component';
import { FeelWheelUpdateComponent } from './feel-wheel-update.component';
import { FeelWheelDeletePopupComponent } from './feel-wheel-delete-dialog.component';
import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';

@Injectable({ providedIn: 'root' })
export class FeelWheelResolve implements Resolve<IFeelWheel> {
  constructor(private service: FeelWheelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFeelWheel> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FeelWheel>) => response.ok),
        map((feelWheel: HttpResponse<FeelWheel>) => feelWheel.body)
      );
    }
    return of(new FeelWheel());
  }
}

export const feelWheelRoute: Routes = [
  {
    path: '',
    component: FeelWheelComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeelWheel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FeelWheelDetailComponent,
    resolve: {
      feelWheel: FeelWheelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeelWheel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FeelWheelUpdateComponent,
    resolve: {
      feelWheel: FeelWheelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeelWheel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FeelWheelUpdateComponent,
    resolve: {
      feelWheel: FeelWheelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeelWheel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const feelWheelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FeelWheelDeletePopupComponent,
    resolve: {
      feelWheel: FeelWheelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.efwserviceFeelWheel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
