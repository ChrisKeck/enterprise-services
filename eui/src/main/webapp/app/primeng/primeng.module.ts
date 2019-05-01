import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EuiButtonDemoModule } from './buttons/button/buttondemo.module';
import { EuiSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { EuiDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { EuiConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { EuiLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { EuiTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { EuiOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { EuiSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { EuiKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { EuiInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { EuiInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { EuiInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { EuiCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { EuiCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { EuiChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { EuiColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { EuiInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { EuiInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { EuiPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { EuiAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { EuiSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { EuiSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { EuiRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { EuiSelectDemoModule } from './inputs/select/selectdemo.module';
import { EuiSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { EuiListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { EuiRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { EuiToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { EuiEditorDemoModule } from './inputs/editor/editordemo.module';

import { EuiMessagesDemoModule } from './messages/messages/messagesdemo.module';
import { EuiToastDemoModule } from './messages/toast/toastdemo.module';
import { EuiGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { EuiFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { EuiAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { EuiPanelDemoModule } from './panel/panel/paneldemo.module';
import { EuiTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { EuiFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { EuiToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { EuiScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { EuiCardDemoModule } from './panel/card/carddemo.module';
import { EuiFlexGridDemoModule } from './panel/flexgrid/flexgriddemo.module';

import { EuiTableDemoModule } from './data/table/tabledemo.module';
import { EuiVirtualScrollerDemoModule } from './data/virtualscroller/virtualscrollerdemo.module';
import { EuiPickListDemoModule } from './data/picklist/picklistdemo.module';
import { EuiOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { EuiFullCalendarDemoModule } from './data/fullcalendar/fullcalendardemo.module';
import { EuiTreeDemoModule } from './data/tree/treedemo.module';
import { EuiTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { EuiPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { EuiGmapDemoModule } from './data/gmap/gmapdemo.module';
import { EuiOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { EuiCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { EuiDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { EuiBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { EuiDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { EuiLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { EuiPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { EuiPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { EuiRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { EuiDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { EuiMenuDemoModule } from './menu/menu/menudemo.module';
import { EuiContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { EuiPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { EuiStepsDemoModule } from './menu/steps/stepsdemo.module';
import { EuiTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { EuiBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { EuiMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { EuiMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { EuiSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { EuiTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { EuiBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { EuiCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { EuiDeferDemoModule } from './misc/defer/deferdemo.module';
import { EuiInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { EuiProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { EuiRTLDemoModule } from './misc/rtl/rtldemo.module';
import { EuiTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { EuiValidationDemoModule } from './misc/validation/validationdemo.module';
import { EuiProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
  imports: [
    EuiMenuDemoModule,
    EuiContextMenuDemoModule,
    EuiPanelMenuDemoModule,
    EuiStepsDemoModule,
    EuiTieredMenuDemoModule,
    EuiBreadcrumbDemoModule,
    EuiMegaMenuDemoModule,
    EuiMenuBarDemoModule,
    EuiSlideMenuDemoModule,
    EuiTabMenuDemoModule,

    EuiBlockUIDemoModule,
    EuiCaptchaDemoModule,
    EuiDeferDemoModule,
    EuiInplaceDemoModule,
    EuiProgressBarDemoModule,
    EuiInputMaskDemoModule,
    EuiRTLDemoModule,
    EuiTerminalDemoModule,
    EuiValidationDemoModule,

    EuiButtonDemoModule,
    EuiSplitbuttonDemoModule,

    EuiInputTextDemoModule,
    EuiInputTextAreaDemoModule,
    EuiInputGroupDemoModule,
    EuiCalendarDemoModule,
    EuiChipsDemoModule,
    EuiInputMaskDemoModule,
    EuiInputSwitchDemoModule,
    EuiPasswordIndicatorDemoModule,
    EuiAutoCompleteDemoModule,
    EuiSliderDemoModule,
    EuiSpinnerDemoModule,
    EuiRatingDemoModule,
    EuiSelectDemoModule,
    EuiSelectButtonDemoModule,
    EuiListboxDemoModule,
    EuiRadioButtonDemoModule,
    EuiToggleButtonDemoModule,
    EuiEditorDemoModule,
    EuiColorPickerDemoModule,
    EuiCheckboxDemoModule,
    EuiKeyFilterDemoModule,

    EuiMessagesDemoModule,
    EuiToastDemoModule,
    EuiGalleriaDemoModule,

    EuiFileUploadDemoModule,

    EuiAccordionDemoModule,
    EuiPanelDemoModule,
    EuiTabViewDemoModule,
    EuiFieldsetDemoModule,
    EuiToolbarDemoModule,
    EuiScrollPanelDemoModule,
    EuiCardDemoModule,
    EuiFlexGridDemoModule,

    EuiBarchartDemoModule,
    EuiDoughnutchartDemoModule,
    EuiLinechartDemoModule,
    EuiPiechartDemoModule,
    EuiPolarareachartDemoModule,
    EuiRadarchartDemoModule,

    EuiDragDropDemoModule,

    EuiDialogDemoModule,
    EuiConfirmDialogDemoModule,
    EuiLightboxDemoModule,
    EuiTooltipDemoModule,
    EuiOverlayPanelDemoModule,
    EuiSideBarDemoModule,

    EuiTableDemoModule,
    EuiDataViewDemoModule,
    EuiVirtualScrollerDemoModule,
    EuiFullCalendarDemoModule,
    EuiOrderListDemoModule,
    EuiPickListDemoModule,
    EuiTreeDemoModule,
    EuiTreeTableDemoModule,
    EuiPaginatorDemoModule,
    EuiOrgChartDemoModule,
    EuiGmapDemoModule,
    EuiCarouselDemoModule,
    EuiProgressSpinnerDemoModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EuiprimengModule {}
