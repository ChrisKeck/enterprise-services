import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFeelWheel, FeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';
import { FeelWheelService } from './feel-wheel.service';
import { IEmployee } from 'app/shared/model/efwservice/employee.model';
import { EmployeeService } from 'app/entities/efwservice/employee';

@Component({
  selector: 'jhi-feel-wheel-update',
  templateUrl: './feel-wheel-update.component.html'
})
export class FeelWheelUpdateComponent implements OnInit {
  feelWheel: IFeelWheel;
  isSaving: boolean;

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    subject: [null, [Validators.required]],
    from: [],
    to: [],
    employeeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected feelWheelService: FeelWheelService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ feelWheel }) => {
      this.updateForm(feelWheel);
      this.feelWheel = feelWheel;
    });
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(feelWheel: IFeelWheel) {
    this.editForm.patchValue({
      id: feelWheel.id,
      subject: feelWheel.subject,
      from: feelWheel.from != null ? feelWheel.from.format(DATE_TIME_FORMAT) : null,
      to: feelWheel.to != null ? feelWheel.to.format(DATE_TIME_FORMAT) : null,
      employeeId: feelWheel.employeeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const feelWheel = this.createFromForm();
    if (feelWheel.id !== undefined) {
      this.subscribeToSaveResponse(this.feelWheelService.update(feelWheel));
    } else {
      this.subscribeToSaveResponse(this.feelWheelService.create(feelWheel));
    }
  }

  private createFromForm(): IFeelWheel {
    const entity = {
      ...new FeelWheel(),
      id: this.editForm.get(['id']).value,
      subject: this.editForm.get(['subject']).value,
      from: this.editForm.get(['from']).value != null ? moment(this.editForm.get(['from']).value, DATE_TIME_FORMAT) : undefined,
      to: this.editForm.get(['to']).value != null ? moment(this.editForm.get(['to']).value, DATE_TIME_FORMAT) : undefined,
      employeeId: this.editForm.get(['employeeId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeelWheel>>) {
    result.subscribe((res: HttpResponse<IFeelWheel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
