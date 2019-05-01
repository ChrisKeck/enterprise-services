import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';
import { FeelWheelService } from './feel-wheel.service';

@Component({
  selector: 'jhi-feel-wheel-delete-dialog',
  templateUrl: './feel-wheel-delete-dialog.component.html'
})
export class FeelWheelDeleteDialogComponent {
  feelWheel: IFeelWheel;

  constructor(protected feelWheelService: FeelWheelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.feelWheelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'feelWheelListModification',
        content: 'Deleted an feelWheel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-feel-wheel-delete-popup',
  template: ''
})
export class FeelWheelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ feelWheel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FeelWheelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.feelWheel = feelWheel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/feel-wheel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/feel-wheel', { outlets: { popup: null } }]);
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
