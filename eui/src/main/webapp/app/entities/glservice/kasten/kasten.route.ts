import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Kasten } from 'app/shared/model/glservice/kasten.model';
import { KastenService } from './kasten.service';
import { KastenComponent } from './kasten.component';
import { KastenDetailComponent } from './kasten-detail.component';
import { KastenUpdateComponent } from './kasten-update.component';
import { KastenDeletePopupComponent } from './kasten-delete-dialog.component';
import { IKasten } from 'app/shared/model/glservice/kasten.model';

@Injectable({ providedIn: 'root' })
export class KastenResolve implements Resolve<IKasten> {
  constructor(private service: KastenService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKasten> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Kasten>) => response.ok),
        map((kasten: HttpResponse<Kasten>) => kasten.body)
      );
    }
    return of(new Kasten());
  }
}

export const kastenRoute: Routes = [
  {
    path: '',
    component: KastenComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKasten.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KastenDetailComponent,
    resolve: {
      kasten: KastenResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKasten.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KastenUpdateComponent,
    resolve: {
      kasten: KastenResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKasten.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KastenUpdateComponent,
    resolve: {
      kasten: KastenResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKasten.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const kastenPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KastenDeletePopupComponent,
    resolve: {
      kasten: KastenResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKasten.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
