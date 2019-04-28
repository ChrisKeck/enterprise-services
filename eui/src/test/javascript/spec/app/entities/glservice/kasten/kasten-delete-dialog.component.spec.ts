/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EuiTestModule } from '../../../../test.module';
import { KastenDeleteDialogComponent } from 'app/entities/glservice/kasten/kasten-delete-dialog.component';
import { KastenService } from 'app/entities/glservice/kasten/kasten.service';

describe('Component Tests', () => {
  describe('Kasten Management Delete Component', () => {
    let comp: KastenDeleteDialogComponent;
    let fixture: ComponentFixture<KastenDeleteDialogComponent>;
    let service: KastenService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KastenDeleteDialogComponent]
      })
        .overrideTemplate(KastenDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KastenDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KastenService);
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
