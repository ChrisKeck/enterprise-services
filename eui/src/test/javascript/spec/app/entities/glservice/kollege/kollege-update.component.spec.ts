/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { KollegeUpdateComponent } from 'app/entities/glservice/kollege/kollege-update.component';
import { KollegeService } from 'app/entities/glservice/kollege/kollege.service';
import { Kollege } from 'app/shared/model/glservice/kollege.model';

describe('Component Tests', () => {
  describe('Kollege Management Update Component', () => {
    let comp: KollegeUpdateComponent;
    let fixture: ComponentFixture<KollegeUpdateComponent>;
    let service: KollegeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KollegeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KollegeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KollegeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KollegeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Kollege(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Kollege();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
