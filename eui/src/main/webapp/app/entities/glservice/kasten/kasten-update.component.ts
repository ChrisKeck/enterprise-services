import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKasten, Kasten } from 'app/shared/model/glservice/kasten.model';
import { KastenService } from './kasten.service';
import { IBestellung } from 'app/shared/model/glservice/bestellung.model';
import { BestellungService } from 'app/entities/glservice/bestellung';

@Component({
  selector: 'jhi-kasten-update',
  templateUrl: './kasten-update.component.html'
})
export class KastenUpdateComponent implements OnInit {
  kasten: IKasten;
  isSaving: boolean;

  bestellungs: IBestellung[];

  editForm = this.fb.group({
    id: [],
    sorte: [null, [Validators.required]],
    bestellungId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected kastenService: KastenService,
    protected bestellungService: BestellungService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ kasten }) => {
      this.updateForm(kasten);
      this.kasten = kasten;
    });
    this.bestellungService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBestellung[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBestellung[]>) => response.body)
      )
      .subscribe((res: IBestellung[]) => (this.bestellungs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(kasten: IKasten) {
    this.editForm.patchValue({
      id: kasten.id,
      sorte: kasten.sorte,
      bestellungId: kasten.bestellungId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const kasten = this.createFromForm();
    if (kasten.id !== undefined) {
      this.subscribeToSaveResponse(this.kastenService.update(kasten));
    } else {
      this.subscribeToSaveResponse(this.kastenService.create(kasten));
    }
  }

  private createFromForm(): IKasten {
    const entity = {
      ...new Kasten(),
      id: this.editForm.get(['id']).value,
      sorte: this.editForm.get(['sorte']).value,
      bestellungId: this.editForm.get(['bestellungId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKasten>>) {
    result.subscribe((res: HttpResponse<IKasten>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
