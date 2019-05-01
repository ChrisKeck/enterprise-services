import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKollege } from 'app/shared/model/glservice/kollege.model';

type EntityResponseType = HttpResponse<IKollege>;
type EntityArrayResponseType = HttpResponse<IKollege[]>;

@Injectable({ providedIn: 'root' })
export class KollegeService {
  public resourceUrl = SERVER_API_URL + 'services/glservice/api/kolleges';

  constructor(protected http: HttpClient) {}

  create(kollege: IKollege): Observable<EntityResponseType> {
    return this.http.post<IKollege>(this.resourceUrl, kollege, { observe: 'response' });
  }

  update(kollege: IKollege): Observable<EntityResponseType> {
    return this.http.put<IKollege>(this.resourceUrl, kollege, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKollege>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKollege[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
