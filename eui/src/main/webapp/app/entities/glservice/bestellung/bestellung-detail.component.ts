import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBestellung } from 'app/shared/model/glservice/bestellung.model';

@Component({
  selector: 'jhi-bestellung-detail',
  templateUrl: './bestellung-detail.component.html'
})
export class BestellungDetailComponent implements OnInit {
  bestellung: IBestellung;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bestellung }) => {
      this.bestellung = bestellung;
    });
  }

  previousState() {
    window.history.back();
  }
}
