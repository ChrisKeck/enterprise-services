import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';

type EntityResponseType = HttpResponse<IFeelWheel>;
type EntityArrayResponseType = HttpResponse<IFeelWheel[]>;

@Injectable({ providedIn: 'root' })
export class FeelWheelService {
  public resourceUrl = SERVER_API_URL + 'services/efwservice/api/feel-wheels';

  constructor(protected http: HttpClient) {}

  create(feelWheel: IFeelWheel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feelWheel);
    return this.http
      .post<IFeelWheel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(feelWheel: IFeelWheel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feelWheel);
    return this.http
      .put<IFeelWheel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFeelWheel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFeelWheel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(feelWheel: IFeelWheel): IFeelWheel {
    const copy: IFeelWheel = Object.assign({}, feelWheel, {
      from: feelWheel.from != null && feelWheel.from.isValid() ? feelWheel.from.toJSON() : null,
      to: feelWheel.to != null && feelWheel.to.isValid() ? feelWheel.to.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.from = res.body.from != null ? moment(res.body.from) : null;
      res.body.to = res.body.to != null ? moment(res.body.to) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((feelWheel: IFeelWheel) => {
        feelWheel.from = feelWheel.from != null ? moment(feelWheel.from) : null;
        feelWheel.to = feelWheel.to != null ? moment(feelWheel.to) : null;
      });
    }
    return res;
  }
}
