/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BestellungService } from 'app/entities/glservice/bestellung/bestellung.service';
import { IBestellung, Bestellung, Standort } from 'app/shared/model/glservice/bestellung.model';

describe('Service Tests', () => {
  describe('Bestellung Service', () => {
    let injector: TestBed;
    let service: BestellungService;
    let httpMock: HttpTestingController;
    let elemDefault: IBestellung;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(BestellungService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Bestellung(0, Standort.KUG, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            von: currentDate.format(DATE_TIME_FORMAT),
            bis: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Bestellung', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            von: currentDate.format(DATE_TIME_FORMAT),
            bis: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            von: currentDate,
            bis: currentDate
          },
          returnedFromService
        );
        service
          .create(new Bestellung(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Bestellung', async () => {
        const returnedFromService = Object.assign(
          {
            standort: 'BBBBBB',
            von: currentDate.format(DATE_TIME_FORMAT),
            bis: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            von: currentDate,
            bis: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Bestellung', async () => {
        const returnedFromService = Object.assign(
          {
            standort: 'BBBBBB',
            von: currentDate.format(DATE_TIME_FORMAT),
            bis: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            von: currentDate,
            bis: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Bestellung', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
