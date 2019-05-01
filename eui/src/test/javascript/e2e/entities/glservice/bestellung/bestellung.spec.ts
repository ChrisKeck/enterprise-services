/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BestellungComponentsPage, BestellungDeleteDialog, BestellungUpdatePage } from './bestellung.page-object';

const expect = chai.expect;

describe('Bestellung e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bestellungUpdatePage: BestellungUpdatePage;
  let bestellungComponentsPage: BestellungComponentsPage;
  let bestellungDeleteDialog: BestellungDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bestellungs', async () => {
    await navBarPage.goToEntity('bestellung');
    bestellungComponentsPage = new BestellungComponentsPage();
    await browser.wait(ec.visibilityOf(bestellungComponentsPage.title), 5000);
    expect(await bestellungComponentsPage.getTitle()).to.eq('euiApp.glserviceBestellung.home.title');
  });

  it('should load create Bestellung page', async () => {
    await bestellungComponentsPage.clickOnCreateButton();
    bestellungUpdatePage = new BestellungUpdatePage();
    expect(await bestellungUpdatePage.getPageTitle()).to.eq('euiApp.glserviceBestellung.home.createOrEditLabel');
    await bestellungUpdatePage.cancel();
  });

  it('should create and save Bestellungs', async () => {
    const nbButtonsBeforeCreate = await bestellungComponentsPage.countDeleteButtons();

    await bestellungComponentsPage.clickOnCreateButton();
    await promise.all([
      bestellungUpdatePage.standortSelectLastOption(),
      bestellungUpdatePage.setVonInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      bestellungUpdatePage.setBisInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await bestellungUpdatePage.getVonInput()).to.contain('2001-01-01T02:30', 'Expected von value to be equals to 2000-12-31');
    expect(await bestellungUpdatePage.getBisInput()).to.contain('2001-01-01T02:30', 'Expected bis value to be equals to 2000-12-31');
    await bestellungUpdatePage.save();
    expect(await bestellungUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bestellungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bestellung', async () => {
    const nbButtonsBeforeDelete = await bestellungComponentsPage.countDeleteButtons();
    await bestellungComponentsPage.clickOnLastDeleteButton();

    bestellungDeleteDialog = new BestellungDeleteDialog();
    expect(await bestellungDeleteDialog.getDialogTitle()).to.eq('euiApp.glserviceBestellung.delete.question');
    await bestellungDeleteDialog.clickOnConfirmButton();

    expect(await bestellungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
