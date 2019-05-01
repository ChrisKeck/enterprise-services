/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { FeelWheelDetailComponent } from 'app/entities/efwservice/feel-wheel/feel-wheel-detail.component';
import { FeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';

describe('Component Tests', () => {
  describe('FeelWheel Management Detail Component', () => {
    let comp: FeelWheelDetailComponent;
    let fixture: ComponentFixture<FeelWheelDetailComponent>;
    const route = ({ data: of({ feelWheel: new FeelWheel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelWheelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FeelWheelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FeelWheelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.feelWheel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
