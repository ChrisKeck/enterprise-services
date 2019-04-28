/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EuiTestModule } from '../../../../test.module';
import { KollegeDeleteDialogComponent } from 'app/entities/glservice/kollege/kollege-delete-dialog.component';
import { KollegeService } from 'app/entities/glservice/kollege/kollege.service';

describe('Component Tests', () => {
  describe('Kollege Management Delete Component', () => {
    let comp: KollegeDeleteDialogComponent;
    let fixture: ComponentFixture<KollegeDeleteDialogComponent>;
    let service: KollegeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EuiTestModule],
        declarations: [KollegeDeleteDialogComponent]
      })
        .overrideTemplate(KollegeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KollegeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KollegeService);
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
