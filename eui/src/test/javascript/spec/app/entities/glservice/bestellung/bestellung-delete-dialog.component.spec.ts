/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EuiTestModule } from '../../../../test.module';
import { BestellungDeleteDialogComponent } from 'app/entities/glservice/bestellung/bestellung-delete-dialog.component';
import { BestellungService } from 'app/entities/glservice/bestellung/bestellung.service';

describe('Component Tests', () => {
  describe('Bestellung Management Delete Component', () => {
    let comp: BestellungDeleteDialogComponent;
    let fixture: ComponentFixture<BestellungDeleteDialogComponent>;
    let service: BestellungService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [BestellungDeleteDialogComponent]
      })
        .overrideTemplate(BestellungDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BestellungDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BestellungService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
