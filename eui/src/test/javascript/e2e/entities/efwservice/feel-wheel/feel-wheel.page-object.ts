import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FeelWheelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-feel-wheel div table .btn-danger'));
  title = element.all(by.css('jhi-feel-wheel div h2#page-heading span')).first();

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

export class FeelWheelUpdatePage {
  pageTitle = element(by.id('jhi-feel-wheel-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  subjectInput = element(by.id('field_subject'));
  fromInput = element(by.id('field_from'));
  toInput = element(by.id('field_to'));
  employeeSelect = element(by.id('field_employee'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSubjectInput(subject) {
    await this.subjectInput.sendKeys(subject);
  }

  async getSubjectInput() {
    return await this.subjectInput.getAttribute('value');
  }

  async setFromInput(from) {
    await this.fromInput.sendKeys(from);
  }

  async getFromInput() {
    return await this.fromInput.getAttribute('value');
  }

  async setToInput(to) {
    await this.toInput.sendKeys(to);
  }

  async getToInput() {
    return await this.toInput.getAttribute('value');
  }

  async employeeSelectLastOption(timeout?: number) {
    await this.employeeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect(): ElementFinder {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return await this.employeeSelect.element(by.css('option:checked')).getText();
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

export class FeelWheelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-feelWheel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-feelWheel'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
