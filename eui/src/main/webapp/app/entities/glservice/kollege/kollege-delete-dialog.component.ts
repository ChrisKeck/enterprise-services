import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKollege } from 'app/shared/model/glservice/kollege.model';
import { KollegeService } from './kollege.service';

@Component({
  selector: 'jhi-kollege-delete-dialog',
  templateUrl: './kollege-delete-dialog.component.html'
})
export class KollegeDeleteDialogComponent {
  kollege: IKollege;

  constructor(protected kollegeService: KollegeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.kollegeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'kollegeListModification',
        content: 'Deleted an kollege'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-kollege-delete-popup',
  template: ''
})
export class KollegeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kollege }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KollegeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.kollege = kollege;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/kollege', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/kollege', { outlets: { popup: null } }]);
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
