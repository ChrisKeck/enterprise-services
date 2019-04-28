import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class KollegeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-kollege div table .btn-danger'));
  title = element.all(by.css('jhi-kollege div h2#page-heading span')).first();

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

export class KollegeUpdatePage {
  pageTitle = element(by.id('jhi-kollege-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  emailInput = element(by.id('field_email'));
  bestellungSelect = element(by.id('field_bestellung'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
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

export class KollegeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-kollege-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-kollege'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
