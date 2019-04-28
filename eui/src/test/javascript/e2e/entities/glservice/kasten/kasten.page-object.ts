import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class KastenComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-kasten div table .btn-danger'));
  title = element.all(by.css('jhi-kasten div h2#page-heading span')).first();

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

export class KastenUpdatePage {
  pageTitle = element(by.id('jhi-kasten-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  sorteSelect = element(by.id('field_sorte'));
  bestellungSelect = element(by.id('field_bestellung'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSorteSelect(sorte) {
    await this.sorteSelect.sendKeys(sorte);
  }

  async getSorteSelect() {
    return await this.sorteSelect.element(by.css('option:checked')).getText();
  }

  async sorteSelectLastOption(timeout?: number) {
    await this.sorteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bestellungSelectLastOption(timeout?: number) {
    await this.bestellungSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async bestellungSelectOption(option) {
    await this.bestellungSelect.sendKeys(option);
  }

  getBestellungSelect(): ElementFinder {
    return this.bestellungSelect;
  }

  async getBestellungSelectedOption() {
    return await this.bestellungSelect.element(by.css('option:checked')).getText();
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

export class KastenDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-kasten-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-kasten'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
