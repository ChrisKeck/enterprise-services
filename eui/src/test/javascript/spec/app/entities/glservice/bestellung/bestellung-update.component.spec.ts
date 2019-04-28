/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { BestellungUpdateComponent } from 'app/entities/glservice/bestellung/bestellung-update.component';
import { BestellungService } from 'app/entities/glservice/bestellung/bestellung.service';
import { Bestellung } from 'app/shared/model/glservice/bestellung.model';

describe('Component Tests', () => {
  describe('Bestellung Management Update Component', () => {
    let comp: BestellungUpdateComponent;
    let fixture: ComponentFixture<BestellungUpdateComponent>;
    let service: BestellungService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [BestellungUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BestellungUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BestellungUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BestellungService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bestellung(123);
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
        const entity = new Bestellung();
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
