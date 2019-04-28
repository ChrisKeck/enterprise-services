import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKasten } from 'app/shared/model/glservice/kasten.model';
import { KastenService } from './kasten.service';

@Component({
  selector: 'jhi-kasten-delete-dialog',
  templateUrl: './kasten-delete-dialog.component.html'
})
export class KastenDeleteDialogComponent {
  kasten: IKasten;

  constructor(protected kastenService: KastenService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.kastenService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'kastenListModification',
        content: 'Deleted an kasten'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-kasten-delete-popup',
  template: ''
})
export class KastenDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kasten }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(KastenDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.kasten = kasten;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/kasten', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/kasten', { outlets: { popup: null } }]);
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
