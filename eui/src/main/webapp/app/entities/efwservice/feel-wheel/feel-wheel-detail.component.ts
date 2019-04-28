import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';

@Component({
  selector: 'jhi-feel-wheel-detail',
  templateUrl: './feel-wheel-detail.component.html'
})
export class FeelWheelDetailComponent implements OnInit {
  feelWheel: IFeelWheel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ feelWheel }) => {
      this.feelWheel = feelWheel;
    });
  }

  previousState() {
    window.history.back();
  }
}
