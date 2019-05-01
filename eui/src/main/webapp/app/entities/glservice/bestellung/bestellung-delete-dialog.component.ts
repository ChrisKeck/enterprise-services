import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBestellung } from 'app/shared/model/glservice/bestellung.model';
import { BestellungService } from './bestellung.service';

@Component({
  selector: 'jhi-bestellung-delete-dialog',
  templateUrl: './bestellung-delete-dialog.component.html'
})
export class BestellungDeleteDialogComponent {
  bestellung: IBestellung;

  constructor(
    protected bestellungService: BestellungService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bestellungService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bestellungListModification',
        content: 'Deleted an bestellung'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-bestellung-delete-popup',
  template: ''
})
export class BestellungDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bestellung }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BestellungDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bestellung = bestellung;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/bestellung', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/bestellung', { outlets: { popup: null } }]);
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
