/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { BestellungDetailComponent } from 'app/entities/glservice/bestellung/bestellung-detail.component';
import { Bestellung } from 'app/shared/model/glservice/bestellung.model';

describe('Component Tests', () => {
  describe('Bestellung Management Detail Component', () => {
    let comp: BestellungDetailComponent;
    let fixture: ComponentFixture<BestellungDetailComponent>;
    const route = ({ data: of({ bestellung: new Bestellung(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [BestellungDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BestellungDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BestellungDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bestellung).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
