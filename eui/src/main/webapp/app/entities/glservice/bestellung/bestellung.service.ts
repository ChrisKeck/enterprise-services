import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBestellung } from 'app/shared/model/glservice/bestellung.model';

type EntityResponseType = HttpResponse<IBestellung>;
type EntityArrayResponseType = HttpResponse<IBestellung[]>;

@Injectable({ providedIn: 'root' })
export class BestellungService {
  public resourceUrl = SERVER_API_URL + 'services/glservice/api/bestellungs';

  constructor(protected http: HttpClient) {}

  create(bestellung: IBestellung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bestellung);
    return this.http
      .post<IBestellung>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bestellung: IBestellung): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bestellung);
    return this.http
      .put<IBestellung>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBestellung>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBestellung[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(bestellung: IBestellung): IBestellung {
    const copy: IBestellung = Object.assign({}, bestellung, {
      von: bestellung.von != null && bestellung.von.isValid() ? bestellung.von.toJSON() : null,
      bis: bestellung.bis != null && bestellung.bis.isValid() ? bestellung.bis.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.von = res.body.von != null ? moment(res.body.von) : null;
      res.body.bis = res.body.bis != null ? moment(res.body.bis) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bestellung: IBestellung) => {
        bestellung.von = bestellung.von != null ? moment(bestellung.von) : null;
        bestellung.bis = bestellung.bis != null ? moment(bestellung.bis) : null;
      });
    }
    return res;
  }
}
