import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKollege } from 'app/shared/model/glservice/kollege.model';

@Component({
  selector: 'jhi-kollege-detail',
  templateUrl: './kollege-detail.component.html'
})
export class KollegeDetailComponent implements OnInit {
  kollege: IKollege;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kollege }) => {
      this.kollege = kollege;
    });
  }

  previousState() {
    window.history.back();
  }
}
