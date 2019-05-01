/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { EuiTestModule } from '../../../../test.module';
import { KastenUpdateComponent } from 'app/entities/glservice/kasten/kasten-update.component';
import { KastenService } from 'app/entities/glservice/kasten/kasten.service';
import { Kasten } from 'app/shared/model/glservice/kasten.model';

describe('Component Tests', () => {
  describe('Kasten Management Update Component', () => {
    let comp: KastenUpdateComponent;
    let fixture: ComponentFixture<KastenUpdateComponent>;
    let service: KastenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KastenUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KastenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KastenUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KastenService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Kasten(123);
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
        const entity = new Kasten();
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
