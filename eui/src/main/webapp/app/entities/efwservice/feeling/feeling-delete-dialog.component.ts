import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFeeling } from 'app/shared/model/efwservice/feeling.model';
import { FeelingService } from './feeling.service';

@Component({
  selector: 'jhi-feeling-delete-dialog',
  templateUrl: './feeling-delete-dialog.component.html'
})
export class FeelingDeleteDialogComponent {
  feeling: IFeeling;

  constructor(protected feelingService: FeelingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.feelingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'feelingListModification',
        content: 'Deleted an feeling'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-feeling-delete-popup',
  template: ''
})
export class FeelingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ feeling }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FeelingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.feeling = feeling;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/feeling', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/feeling', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
