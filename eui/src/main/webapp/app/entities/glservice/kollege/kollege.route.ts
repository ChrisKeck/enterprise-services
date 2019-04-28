import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Kollege } from 'app/shared/model/glservice/kollege.model';
import { KollegeService } from './kollege.service';
import { KollegeComponent } from './kollege.component';
import { KollegeDetailComponent } from './kollege-detail.component';
import { KollegeUpdateComponent } from './kollege-update.component';
import { KollegeDeletePopupComponent } from './kollege-delete-dialog.component';
import { IKollege } from 'app/shared/model/glservice/kollege.model';

@Injectable({ providedIn: 'root' })
export class KollegeResolve implements Resolve<IKollege> {
  constructor(private service: KollegeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKollege> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Kollege>) => response.ok),
        map((kollege: HttpResponse<Kollege>) => kollege.body)
      );
    }
    return of(new Kollege());
  }
}

export const kollegeRoute: Routes = [
  {
    path: '',
    component: KollegeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKollege.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KollegeDetailComponent,
    resolve: {
      kollege: KollegeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKollege.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KollegeUpdateComponent,
    resolve: {
      kollege: KollegeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKollege.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KollegeUpdateComponent,
    resolve: {
      kollege: KollegeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKollege.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const kollegePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KollegeDeletePopupComponent,
    resolve: {
      kollege: KollegeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceKollege.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
