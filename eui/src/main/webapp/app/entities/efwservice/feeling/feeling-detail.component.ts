import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeeling } from 'app/shared/model/efwservice/feeling.model';

@Component({
  selector: 'jhi-feeling-detail',
  templateUrl: './feeling-detail.component.html'
})
export class FeelingDetailComponent implements OnInit {
  feeling: IFeeling;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ feeling }) => {
      this.feeling = feeling;
    });
  }

  previousState() {
    window.history.back();
  }
}
