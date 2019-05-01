import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKollege, Kollege } from 'app/shared/model/glservice/kollege.model';
import { KollegeService } from './kollege.service';
import { IBestellung } from 'app/shared/model/glservice/bestellung.model';
import { BestellungService } from 'app/entities/glservice/bestellung';

@Component({
  selector: 'jhi-kollege-update',
  templateUrl: './kollege-update.component.html'
})
export class KollegeUpdateComponent implements OnInit {
  kollege: IKollege;
  isSaving: boolean;

  bestellungs: IBestellung[];

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required]],
    bestellungs: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected kollegeService: KollegeService,
    protected bestellungService: BestellungService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ kollege }) => {
      this.updateForm(kollege);
      this.kollege = kollege;
    });
    this.bestellungService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBestellung[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBestellung[]>) => response.body)
      )
      .subscribe((res: IBestellung[]) => (this.bestellungs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(kollege: IKollege) {
    this.editForm.patchValue({
      id: kollege.id,
      email: kollege.email,
      bestellungs: kollege.bestellungs
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const kollege = this.createFromForm();
    if (kollege.id !== undefined) {
      this.subscribeToSaveResponse(this.kollegeService.update(kollege));
    } else {
      this.subscribeToSaveResponse(this.kollegeService.create(kollege));
    }
  }

  private createFromForm(): IKollege {
    const entity = {
      ...new Kollege(),
      id: this.editForm.get(['id']).value,
      email: this.editForm.get(['email']).value,
      bestellungs: this.editForm.get(['bestellungs']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKollege>>) {
    result.subscribe((res: HttpResponse<IKollege>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackBestellungById(index: number, item: IBestellung) {
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
