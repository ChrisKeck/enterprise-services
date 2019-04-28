/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EuiTestModule } from '../../../../test.module';
import { FeelingDeleteDialogComponent } from 'app/entities/efwservice/feeling/feeling-delete-dialog.component';
import { FeelingService } from 'app/entities/efwservice/feeling/feeling.service';

describe('Component Tests', () => {
  describe('Feeling Management Delete Component', () => {
    let comp: FeelingDeleteDialogComponent;
    let fixture: ComponentFixture<FeelingDeleteDialogComponent>;
    let service: FeelingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelingDeleteDialogComponent]
      })
        .overrideTemplate(FeelingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FeelingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeelingService);
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
