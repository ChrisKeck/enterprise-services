import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBestellung, Bestellung } from 'app/shared/model/glservice/bestellung.model';
import { BestellungService } from './bestellung.service';
import { IKollege } from 'app/shared/model/glservice/kollege.model';
import { KollegeService } from 'app/entities/glservice/kollege';

@Component({
  selector: 'jhi-bestellung-update',
  templateUrl: './bestellung-update.component.html'
})
export class BestellungUpdateComponent implements OnInit {
  bestellung: IBestellung;
  isSaving: boolean;

  kolleges: IKollege[];

  editForm = this.fb.group({
    id: [],
    standort: [null, [Validators.required]],
    von: [null, [Validators.required]],
    bis: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bestellungService: BestellungService,
    protected kollegeService: KollegeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bestellung }) => {
      this.updateForm(bestellung);
      this.bestellung = bestellung;
    });
    this.kollegeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IKollege[]>) => mayBeOk.ok),
        map((response: HttpResponse<IKollege[]>) => response.body)
      )
      .subscribe((res: IKollege[]) => (this.kolleges = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bestellung: IBestellung) {
    this.editForm.patchValue({
      id: bestellung.id,
      standort: bestellung.standort,
      von: bestellung.von != null ? bestellung.von.format(DATE_TIME_FORMAT) : null,
      bis: bestellung.bis != null ? bestellung.bis.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bestellung = this.createFromForm();
    if (bestellung.id !== undefined) {
      this.subscribeToSaveResponse(this.bestellungService.update(bestellung));
    } else {
      this.subscribeToSaveResponse(this.bestellungService.create(bestellung));
    }
  }

  private createFromForm(): IBestellung {
    const entity = {
      ...new Bestellung(),
      id: this.editForm.get(['id']).value,
      standort: this.editForm.get(['standort']).value,
      von: this.editForm.get(['von']).value != null ? moment(this.editForm.get(['von']).value, DATE_TIME_FORMAT) : undefined,
      bis: this.editForm.get(['bis']).value != null ? moment(this.editForm.get(['bis']).value, DATE_TIME_FORMAT) : undefined
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBestellung>>) {
    result.subscribe((res: HttpResponse<IBestellung>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackKollegeById(index: number, item: IKollege) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
