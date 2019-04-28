/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { KastenDetailComponent } from 'app/entities/glservice/kasten/kasten-detail.component';
import { Kasten } from 'app/shared/model/glservice/kasten.model';

describe('Component Tests', () => {
  describe('Kasten Management Detail Component', () => {
    let comp: KastenDetailComponent;
    let fixture: ComponentFixture<KastenDetailComponent>;
    const route = ({ data: of({ kasten: new Kasten(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KastenDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KastenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KastenDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.kasten).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
