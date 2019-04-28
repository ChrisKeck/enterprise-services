/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { FeelWheelUpdateComponent } from 'app/entities/efwservice/feel-wheel/feel-wheel-update.component';
import { FeelWheelService } from 'app/entities/efwservice/feel-wheel/feel-wheel.service';
import { FeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';

describe('Component Tests', () => {
  describe('FeelWheel Management Update Component', () => {
    let comp: FeelWheelUpdateComponent;
    let fixture: ComponentFixture<FeelWheelUpdateComponent>;
    let service: FeelWheelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelWheelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FeelWheelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FeelWheelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeelWheelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FeelWheel(123);
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
        const entity = new FeelWheel();
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
