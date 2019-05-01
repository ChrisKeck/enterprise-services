import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFeeling } from 'app/shared/model/efwservice/feeling.model';

type EntityResponseType = HttpResponse<IFeeling>;
type EntityArrayResponseType = HttpResponse<IFeeling[]>;

@Injectable({ providedIn: 'root' })
export class FeelingService {
  public resourceUrl = SERVER_API_URL + 'services/efwservice/api/feelings';

  constructor(protected http: HttpClient) {}

  create(feeling: IFeeling): Observable<EntityResponseType> {
    return this.http.post<IFeeling>(this.resourceUrl, feeling, { observe: 'response' });
  }

  update(feeling: IFeeling): Observable<EntityResponseType> {
    return this.http.put<IFeeling>(this.resourceUrl, feeling, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFeeling>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFeeling[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
