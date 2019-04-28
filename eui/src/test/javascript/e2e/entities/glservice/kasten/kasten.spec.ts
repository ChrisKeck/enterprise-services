/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { KastenComponentsPage, KastenDeleteDialog, KastenUpdatePage } from './kasten.page-object';

const expect = chai.expect;

describe('Kasten e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let kastenUpdatePage: KastenUpdatePage;
  let kastenComponentsPage: KastenComponentsPage;
  let kastenDeleteDialog: KastenDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Kastens', async () => {
    await navBarPage.goToEntity('kasten');
    kastenComponentsPage = new KastenComponentsPage();
    await browser.wait(ec.visibilityOf(kastenComponentsPage.title), 5000);
    expect(await kastenComponentsPage.getTitle()).to.eq('euiApp.glserviceKasten.home.title');
  });

  it('should load create Kasten page', async () => {
    await kastenComponentsPage.clickOnCreateButton();
    kastenUpdatePage = new KastenUpdatePage();
    expect(await kastenUpdatePage.getPageTitle()).to.eq('euiApp.glserviceKasten.home.createOrEditLabel');
    await kastenUpdatePage.cancel();
  });

  it('should create and save Kastens', async () => {
    const nbButtonsBeforeCreate = await kastenComponentsPage.countDeleteButtons();

    await kastenComponentsPage.clickOnCreateButton();
    await promise.all([kastenUpdatePage.sorteSelectLastOption(), kastenUpdatePage.bestellungSelectLastOption()]);
    await kastenUpdatePage.save();
    expect(await kastenUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await kastenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Kasten', async () => {
    const nbButtonsBeforeDelete = await kastenComponentsPage.countDeleteButtons();
    await kastenComponentsPage.clickOnLastDeleteButton();

    kastenDeleteDialog = new KastenDeleteDialog();
    expect(await kastenDeleteDialog.getDialogTitle()).to.eq('euiApp.glserviceKasten.delete.question');
    await kastenDeleteDialog.clickOnConfirmButton();

    expect(await kastenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
