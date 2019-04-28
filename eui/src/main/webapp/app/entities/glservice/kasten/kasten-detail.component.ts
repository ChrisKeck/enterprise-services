import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKasten } from 'app/shared/model/glservice/kasten.model';

@Component({
  selector: 'jhi-kasten-detail',
  templateUrl: './kasten-detail.component.html'
})
export class KastenDetailComponent implements OnInit {
  kasten: IKasten;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kasten }) => {
      this.kasten = kasten;
    });
  }

  previousState() {
    window.history.back();
  }
}
