import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Bestellung } from 'app/shared/model/glservice/bestellung.model';
import { BestellungService } from './bestellung.service';
import { BestellungComponent } from './bestellung.component';
import { BestellungDetailComponent } from './bestellung-detail.component';
import { BestellungUpdateComponent } from './bestellung-update.component';
import { BestellungDeletePopupComponent } from './bestellung-delete-dialog.component';
import { IBestellung } from 'app/shared/model/glservice/bestellung.model';

@Injectable({ providedIn: 'root' })
export class BestellungResolve implements Resolve<IBestellung> {
  constructor(private service: BestellungService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBestellung> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Bestellung>) => response.ok),
        map((bestellung: HttpResponse<Bestellung>) => bestellung.body)
      );
    }
    return of(new Bestellung());
  }
}

export const bestellungRoute: Routes = [
  {
    path: '',
    component: BestellungComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceBestellung.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BestellungDetailComponent,
    resolve: {
      bestellung: BestellungResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceBestellung.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BestellungUpdateComponent,
    resolve: {
      bestellung: BestellungResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceBestellung.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BestellungUpdateComponent,
    resolve: {
      bestellung: BestellungResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceBestellung.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bestellungPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BestellungDeletePopupComponent,
    resolve: {
      bestellung: BestellungResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'euiApp.glserviceBestellung.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
