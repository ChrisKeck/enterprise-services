import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFeeling, Feeling } from 'app/shared/model/efwservice/feeling.model';
import { FeelingService } from './feeling.service';
import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';
import { FeelWheelService } from 'app/entities/efwservice/feel-wheel';

@Component({
  selector: 'jhi-feeling-update',
  templateUrl: './feeling-update.component.html'
})
export class FeelingUpdateComponent implements OnInit {
  feeling: IFeeling;
  isSaving: boolean;

  feelwheels: IFeelWheel[];

  editForm = this.fb.group({
    id: [],
    feeltype: [null, [Validators.required]],
    capacity: [null, [Validators.required]],
    isSpeechable: [],
    feelwheelId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected feelingService: FeelingService,
    protected feelWheelService: FeelWheelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ feeling }) => {
      this.updateForm(feeling);
      this.feeling = feeling;
    });
    this.feelWheelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFeelWheel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFeelWheel[]>) => response.body)
      )
      .subscribe((res: IFeelWheel[]) => (this.feelwheels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(feeling: IFeeling) {
    this.editForm.patchValue({
      id: feeling.id,
      feeltype: feeling.feeltype,
      capacity: feeling.capacity,
      isSpeechable: feeling.isSpeechable,
      feelwheelId: feeling.feelwheelId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const feeling = this.createFromForm();
    if (feeling.id !== undefined) {
      this.subscribeToSaveResponse(this.feelingService.update(feeling));
    } else {
      this.subscribeToSaveResponse(this.feelingService.create(feeling));
    }
  }

  private createFromForm(): IFeeling {
    const entity = {
      ...new Feeling(),
      id: this.editForm.get(['id']).value,
      feeltype: this.editForm.get(['feeltype']).value,
      capacity: this.editForm.get(['capacity']).value,
      isSpeechable: this.editForm.get(['isSpeechable']).value,
      feelwheelId: this.editForm.get(['feelwheelId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeeling>>) {
    result.subscribe((res: HttpResponse<IFeeling>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackFeelWheelById(index: number, item: IFeelWheel) {
    return item.id;
  }
}
