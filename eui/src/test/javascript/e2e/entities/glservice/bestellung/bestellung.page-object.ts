import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class BestellungComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bestellung div table .btn-danger'));
  title = element.all(by.css('jhi-bestellung div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BestellungUpdatePage {
  pageTitle = element(by.id('jhi-bestellung-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  standortSelect = element(by.id('field_standort'));
  vonInput = element(by.id('field_von'));
  bisInput = element(by.id('field_bis'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStandortSelect(standort) {
    await this.standortSelect.sendKeys(standort);
  }

  async getStandortSelect() {
    return await this.standortSelect.element(by.css('option:checked')).getText();
  }

  async standortSelectLastOption(timeout?: number) {
    await this.standortSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setVonInput(von) {
    await this.vonInput.sendKeys(von);
  }

  async getVonInput() {
    return await this.vonInput.getAttribute('value');
  }

  async setBisInput(bis) {
    await this.bisInput.sendKeys(bis);
  }

  async getBisInput() {
    return await this.bisInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BestellungDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bestellung-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bestellung'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
