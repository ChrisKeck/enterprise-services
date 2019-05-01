/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EuiTestModule } from '../../../../test.module';
import { FeelWheelDeleteDialogComponent } from 'app/entities/efwservice/feel-wheel/feel-wheel-delete-dialog.component';
import { FeelWheelService } from 'app/entities/efwservice/feel-wheel/feel-wheel.service';

describe('Component Tests', () => {
  describe('FeelWheel Management Delete Component', () => {
    let comp: FeelWheelDeleteDialogComponent;
    let fixture: ComponentFixture<FeelWheelDeleteDialogComponent>;
    let service: FeelWheelService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [FeelWheelDeleteDialogComponent]
      })
        .overrideTemplate(FeelWheelDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FeelWheelDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeelWheelService);
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
