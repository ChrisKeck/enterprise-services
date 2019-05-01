/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { FeelingDetailComponent } from 'app/entities/efwservice/feeling/feeling-detail.component';
import { Feeling } from 'app/shared/model/efwservice/feeling.model';

describe('Component Tests', () => {
  describe('Feeling Management Detail Component', () => {
    let comp: FeelingDetailComponent;
    let fixture: ComponentFixture<FeelingDetailComponent>;
    const route = ({ data: of({ feeling: new Feeling(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FeelingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FeelingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.feeling).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
