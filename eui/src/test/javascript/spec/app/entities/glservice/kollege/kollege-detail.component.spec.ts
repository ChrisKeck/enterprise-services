/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { KollegeDetailComponent } from 'app/entities/glservice/kollege/kollege-detail.component';
import { Kollege } from 'app/shared/model/glservice/kollege.model';

describe('Component Tests', () => {
  describe('Kollege Management Detail Component', () => {
    let comp: KollegeDetailComponent;
    let fixture: ComponentFixture<KollegeDetailComponent>;
    const route = ({ data: of({ kollege: new Kollege(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KollegeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KollegeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KollegeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.kollege).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
