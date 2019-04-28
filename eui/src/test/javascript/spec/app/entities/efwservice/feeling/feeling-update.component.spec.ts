/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { FeelingUpdateComponent } from 'app/entities/efwservice/feeling/feeling-update.component';
import { FeelingService } from 'app/entities/efwservice/feeling/feeling.service';
import { Feeling } from 'app/shared/model/efwservice/feeling.model';

describe('Component Tests', () => {
  describe('Feeling Management Update Component', () => {
    let comp: FeelingUpdateComponent;
    let fixture: ComponentFixture<FeelingUpdateComponent>;
    let service: FeelingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FeelingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FeelingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeelingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Feeling(123);
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
        const entity = new Feeling();
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
