import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKasten } from 'app/shared/model/glservice/kasten.model';

type EntityResponseType = HttpResponse<IKasten>;
type EntityArrayResponseType = HttpResponse<IKasten[]>;

@Injectable({ providedIn: 'root' })
export class KastenService {
  public resourceUrl = SERVER_API_URL + 'services/glservice/api/kastens';

  constructor(protected http: HttpClient) {}

  create(kasten: IKasten): Observable<EntityResponseType> {
    return this.http.post<IKasten>(this.resourceUrl, kasten, { observe: 'response' });
  }

  update(kasten: IKasten): Observable<EntityResponseType> {
    return this.http.put<IKasten>(this.resourceUrl, kasten, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKasten>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKasten[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
