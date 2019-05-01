/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { KollegeComponentsPage, KollegeDeleteDialog, KollegeUpdatePage } from './kollege.page-object';

const expect = chai.expect;

describe('Kollege e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let kollegeUpdatePage: KollegeUpdatePage;
  let kollegeComponentsPage: KollegeComponentsPage;
  let kollegeDeleteDialog: KollegeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Kolleges', async () => {
    await navBarPage.goToEntity('kollege');
    kollegeComponentsPage = new KollegeComponentsPage();
    await browser.wait(ec.visibilityOf(kollegeComponentsPage.title), 5000);
    expect(await kollegeComponentsPage.getTitle()).to.eq('euiApp.glserviceKollege.home.title');
  });

  it('should load create Kollege page', async () => {
    await kollegeComponentsPage.clickOnCreateButton();
    kollegeUpdatePage = new KollegeUpdatePage();
    expect(await kollegeUpdatePage.getPageTitle()).to.eq('euiApp.glserviceKollege.home.createOrEditLabel');
    await kollegeUpdatePage.cancel();
  });

  it('should create and save Kolleges', async () => {
    const nbButtonsBeforeCreate = await kollegeComponentsPage.countDeleteButtons();

    await kollegeComponentsPage.clickOnCreateButton();
    await promise.all([
      kollegeUpdatePage.setEmailInput('email')
      // kollegeUpdatePage.bestellungSelectLastOption(),
    ]);
    expect(await kollegeUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    await kollegeUpdatePage.save();
    expect(await kollegeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await kollegeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Kollege', async () => {
    const nbButtonsBeforeDelete = await kollegeComponentsPage.countDeleteButtons();
    await kollegeComponentsPage.clickOnLastDeleteButton();

    kollegeDeleteDialog = new KollegeDeleteDialog();
    expect(await kollegeDeleteDialog.getDialogTitle()).to.eq('euiApp.glserviceKollege.delete.question');
    await kollegeDeleteDialog.clickOnConfirmButton();

    expect(await kollegeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
