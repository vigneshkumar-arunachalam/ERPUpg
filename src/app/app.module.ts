import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MastersComponent } from './masters/masters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { NgxSpinnerModule } from 'ngx-spinner';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { TestComponent } from './test/test.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CombinationComponent } from './combination/combination.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import {MatIconModule} from '@angular/material/icon';
import { CustomerComponent } from './masters/customer/customer.component';
import { CustomernewallComponent } from './masters/customer/customernewall/customernewall.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ContractComponent } from './contract/contract.component';
import { AddComponent } from './contract/add/add.component';
import { MenutestComponent } from './menutest/menutest.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { AlertCheckComponent } from './alert-check/alert-check.component';
import { ContractmasterfileComponent } from './contract/contractmasterfile/contractmasterfile.component';
import { ContractclassificationComponent } from './contract/contractclassification/contractclassification.component';
import { ContractnameComponent } from './contract/contractname/contractname.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BillingComponent } from './billing/billing.component';
import { QuotationnewComponent } from './billing/quotationnew/quotationnew.component';
import { AddquotationnewComponent } from './billing/quotationnew/addquotationnew/addquotationnew.component';
import { CheckComponent } from './check/check.component';
import { ContractliveComponent } from './contractlive/contractlive.component';
import { LiveComponent } from './live/live.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditquotationnewComponent } from './billing/quotationnew/editquotationnew/editquotationnew.component';
import { ProformaInvoiceComponent } from './billing/proforma-invoice/proforma-invoice.component';
import { AddPIComponent } from './billing/proforma-invoice/add-pi/add-pi.component';
import { EditPIComponent } from './billing/proforma-invoice/edit-pi/edit-pi.component';
import { TransactionApprovalComponent } from './billing/transaction-approval/transaction-approval.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormarrayComponent } from './formarray/formarray.component';
import { QRCodeModule } from 'angular2-qrcode';
import { SettingsComponent } from './settings/settings.component';
import { ProfiledetailsComponent } from './settings/profiledetails/profiledetails.component';
import { InvoiceComponent } from './billing/invoice/invoice.component';
import { AddInvoiceComponent } from './billing/invoice/add-invoice/add-invoice.component';
import { DidinvoiceComponent } from './billing/didinvoice/didinvoice.component';
import { AddDidInvoiceComponent } from './billing/didinvoice/add-did-invoice/add-did-invoice.component';
import { EditDidInvoiceComponent } from './billing/didinvoice/edit-did-invoice/edit-did-invoice.component';
import { EditInvoiceComponent } from './billing/invoice/edit-invoice/edit-invoice.component';
import { LicenseCreditComponent } from './license-credit/license-credit.component';
import { AddDidpiComponent } from './billing/proforma-invoice/add-didpi/add-didpi.component';
import { EditDidpiComponent } from './billing/proforma-invoice/edit-didpi/edit-didpi.component';
import { DeliveryOrderComponent } from './billing/delivery-order/delivery-order.component'; 
import { EditDoComponent } from './billing/delivery-order/edit-do/edit-do.component'; 
import {AddDoComponent} from './billing/delivery-order/add-do/add-do.component';
import { PurchaseOrderComponent } from './billing/purchase-order/purchase-order.component';
import { AddPurchaseOrderComponent } from './billing/purchase-order/add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './billing/purchase-order/edit-purchase-order/edit-purchase-order.component';
import { TransactionnewComponent } from './ledger/transactionnew/transactionnew.component';
import { LedgerComponent } from './ledger/ledger.component';
import { AddTransactionNewComponent } from './ledger/transactionnew/add-transaction-new/add-transaction-new.component';
import { EditTransactionNewComponent } from './ledger/transactionnew/edit-transaction-new/edit-transaction-new.component';
import { ResellerManagementComponent } from './masters/reseller-management/reseller-management.component';
import { PipeComponent } from './pipe/pipe.component';
import { CrmComponent } from './crm/crm.component';
import { EnquirynewComponent } from './crm/enquirynew/enquirynew.component';
import { AddNewEnquiryComponent } from './crm/enquirynew/add-new-enquiry/add-new-enquiry.component';
import { DuplicateDOComponent } from './billing/delivery-order/duplicate-do/duplicate-do.component';
import { EditNewEnquiryComponent } from './crm/enquirynew/edit-new-enquiry/edit-new-enquiry.component'; 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ResellerPaymentComponent } from './billing/reseller-payment/reseller-payment.component';
import { EditinvoiceDIDComponent } from './billing/invoice/editinvoice-did/editinvoice-did.component';
import { DatetimeTestComponent } from './datetime-test/datetime-test.component';
import { DupProformaInvoiceComponent } from './billing/dup-proforma-invoice/dup-proforma-invoice.component';
import { DupAddPIComponent } from './billing/dup-proforma-invoice/dup-add-pi/dup-add-pi.component';
import { DupEditPIComponent } from './billing/dup-proforma-invoice/dup-edit-pi/dup-edit-pi.component';
import { DupInvoiceComponent } from './billing/dup-invoice/dup-invoice.component';
import { DupAddInvoiceComponent } from './billing/dup-invoice/dup-add-invoice/dup-add-invoice.component';
import { DupEditInvoiceComponent } from './billing/dup-invoice/dup-edit-invoice/dup-edit-invoice.component';
import { DupEditInvoiceDIDComponent } from './billing/dup-invoice/dup-edit-invoice-did/dup-edit-invoice-did.component';
import { DupCustomerNewAllComponent } from './masters/dup-customer-new-all/dup-customer-new-all.component';
import { DupQuotationNewComponent } from './billing/dup-quotation-new/dup-quotation-new.component';
import { DupAddQuotationNewComponent } from './billing/dup-quotation-new/dup-add-quotation-new/dup-add-quotation-new.component';
import { DupEditQuotationNewComponent } from './billing/dup-quotation-new/dup-edit-quotation-new/dup-edit-quotation-new.component';
import { RecurringCheckerComponent } from './billing/recurring-checker/recurring-checker.component';
import { RecurringDateupdateComponent } from './billing/recurring-dateupdate/recurring-dateupdate.component';
import { MultipleInvPaymentComponent } from './billing/multiple-inv-payment/multiple-inv-payment.component';
import { AddquotaionnewsdnComponent } from './billing/quotationnew/addquotaionnewsdn/addquotaionnewsdn.component';
import { PurchaseEntryComponent } from './ledger/purchase-entry/purchase-entry.component';
import { ReportsComponent } from './reports/reports.component';
import { InvoicereportsoldComponent } from './reports/invoicereportsold/invoicereportsold.component';
import { PrintpreviewComponent } from './reports/invoicereportsold/printpreview/printpreview.component';
import { PurchaseentryreportComponent } from './reports/purchaseentryreport/purchaseentryreport.component';
import { GstreportComponent } from './reports/gstreport/gstreport.component';
import { GuruComponent } from './guru/guru.component';
import { VoipswitchComponent } from './voipswitch/voipswitch.component';
import { CreditmanagerComponent } from './voipswitch/creditmanager/creditmanager.component';
import { PettyCashComponent } from './ledger/petty-cash/petty-cash.component';
import { RecurringResellerComponent } from './billing/recurring-reseller/recurring-reseller.component';
import { CstreportComponent } from './reports/cstreport/cstreport.component';
import { VsprovisionComponent } from './vsprovision/vsprovision.component';
import { DemotestComponent } from './demotest/demotest.component';
import { AddressPipe } from './pipe1/address.pipe';
import { AddMulInvPayComponent } from './billing/multiple-inv-payment/add-mul-inv-pay/add-mul-inv-pay.component';
import { EditMulInvPayComponent } from './billing/multiple-inv-payment/edit-mul-inv-pay/edit-mul-inv-pay.component';
import { StockComponent } from './stock/stock.component';
import { ProductMasterComponent } from './stock/product-master/product-master.component';
import { StockDIDMasterComponent } from './stock/stock-didmaster/stock-didmaster.component';
import { StockInventoryEntryComponent } from './stock/stock-inventory-entry/stock-inventory-entry.component';
import { StockDIDInventoryEntryComponent } from './stock/stock-didinventory-entry/stock-didinventory-entry.component';
import { StockDIDNumberCatalogComponent } from './stock/stock-didnumber-catalog/stock-didnumber-catalog.component';
import { CurrentstockComponent } from './stock/currentstock/currentstock.component';
import { RateCatalogComponent } from './stock/rate-catalog/rate-catalog.component';
import { RMAIssueComponent } from './stock/rmaissue/rmaissue.component';
import { ProductCategoryComponent } from './stock/product-master/product-category/product-category.component';
import { CurrentStockMasterComponent } from './stock/product-master/current-stock-master/current-stock-master.component';

import { ProductMaster1Component } from './stock/product-master/product-master1/product-master1.component';
import { PEVoipTrendComponent } from './ledger/pevoip-trend/pevoip-trend.component';
import { AddGenStockComponent } from './stock/currentstock/add-gen-stock/add-gen-stock.component';
import { EditGenStockComponent } from './stock/currentstock/edit-gen-stock/edit-gen-stock.component';
import { RateCatelogMasterComponent } from './stock/product-master/rate-catelog-master/rate-catelog-master.component';
import { AddRateCatalogComponent } from './stock/rate-catalog/add-rate-catalog/add-rate-catalog.component';
import { EditRateCatalogComponent } from './stock/rate-catalog/edit-rate-catalog/edit-rate-catalog.component';
import { DIDNumberCatalogComponent } from './stock/stock-didmaster/didnumber-catalog/didnumber-catalog.component';
import { DIDProviderComponent } from './stock/stock-didmaster/didprovider/didprovider.component';
import { DIDTrunkNameComponent } from './stock/stock-didmaster/didtrunk-name/didtrunk-name.component';
import { AddDIDNumCatStockComponent } from './stock/stock-didmaster/didnumber-catalog/add-didnum-cat-stock/add-didnum-cat-stock.component';
import { EditDIDNumCatStockComponent } from './stock/stock-didmaster/didnumber-catalog/edit-didnum-cat-stock/edit-didnum-cat-stock.component';
import { Nx3233Component } from './nx3233/nx3233.component';
import { PurchaseEntryYearlyComponent } from './ledger/purchase-entry-yearly/purchase-entry-yearly.component';
import { PurchaseEntryMrVoipTrendComponent } from './ledger/purchase-entry-mr-voip-trend/purchase-entry-mr-voip-trend.component';
import { PurchaseEntryCall4telTrendComponent } from './ledger/purchase-entry-call4tel-trend/purchase-entry-call4tel-trend.component';
import { PublictaskComponent } from './publictask/publictask.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreditnoteComponent } from './billing/creditnote/creditnote.component';
import { AddcreditnoteComponent } from './billing/creditnote/addcreditnote/addcreditnote.component';
import { EditcreditnoteComponent } from './billing/creditnote/editcreditnote/editcreditnote.component';
import { HRComponent } from './hr/hr.component';
import { DesgTypeMgmtComponent } from './hr/desg-type-mgmt/desg-type-mgmt.component';

import { UsergroupComponent } from './hr/usergroup/usergroup.component';
import { UsermanagementComponent } from './hr/usermanagement/usermanagement.component';
import { DebitnoteComponent } from './billing/debitnote/debitnote.component';
import { AdddebitnoteComponent } from './billing/debitnote/adddebitnote/adddebitnote.component';
import { EditdebitnoteComponent } from './billing/debitnote/editdebitnote/editdebitnote.component';
import { PrepaidnoteComponent } from './billing/prepaidnote/prepaidnote.component';
import { AddprepaidnoteComponent } from './billing/prepaidnote/addprepaidnote/addprepaidnote.component';
import { EditprepaidnoteComponent } from './billing/prepaidnote/editprepaidnote/editprepaidnote.component';
import { CalendarTemplateComponent } from './calendar-template/calendar-template.component';
import { SalaryentryComponent } from './hr/salaryentry/salaryentry.component';
import { AddsalaryentryComponent } from './hr/salaryentry/addsalaryentry/addsalaryentry.component';
import { EditsalaryentryComponent } from './hr/salaryentry/editsalaryentry/editsalaryentry.component';
import { ContributionmasterComponent } from './hr/contributionmaster/contributionmaster.component';
import { AddcontributionmasterComponent } from './hr/contributionmaster/addcontributionmaster/addcontributionmaster.component';
import { EditcontributionmasterComponent } from './hr/contributionmaster/editcontributionmaster/editcontributionmaster.component';
import { DidStockComponent } from './hr/did-stock/did-stock.component';
import { AttendanceReportComponent } from './hr/attendance-report/attendance-report.component';
import { StaffpermissionreportComponent } from './hr/staffpermissionreport/staffpermissionreport.component';
import { MonthlycontributionComponent } from './hr/monthlycontribution/monthlycontribution.component';
import { AddcontmasterComponent } from './hr/monthlycontribution/addcontmaster/addcontmaster.component';
import { EditcontmasterComponent } from './hr/monthlycontribution/editcontmaster/editcontmaster.component';
import { LeaverequestComponent } from './hr/leaverequest/leaverequest.component';
import { LeavereqFinalComponent } from './hr/leavereq-final/leavereq-final.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErpAppPermissionComponent } from './erp-app-permission/erp-app-permission.component';
import { LeaveapprovalComponent } from './hr/leaveapproval/leaveapproval.component';
import { LicenseKeyManagementComponent } from './license-key-management/license-key-management.component';
// import { BsDropdownModule} from 'ngx-bootstrap/dropdown'; 
import { AddDecarepiComponent } from './billing/dcare-proforma-invoice/add-decarepi/add-decarepi.component'; 
import { EditDecarepiComponent } from './billing/dcare-proforma-invoice/edit-decarepi/edit-decarepi.component'; 
import { DcareProformaInvoiceComponent } from './billing/dcare-proforma-invoice/dcare-proforma-invoice.component';
import { DcareInvoiceComponent } from './billing/dcare-invoice/dcare-invoice.component';
import { DcareAddInvoiceComponent } from './billing/dcare-invoice/dcare-add-invoice/dcare-add-invoice.component';
import { DcareEditInvoiceComponent } from './billing/dcare-invoice/dcare-edit-invoice/dcare-edit-invoice.component';
import { DcareQuotationComponent } from './billing/dcare-quotation/dcare-quotation.component';
import { DcareAddQuotationComponent } from './billing/dcare-quotation/dcare-add-quotation/dcare-add-quotation.component';
import { DcareEditQuotationComponent } from './billing/dcare-quotation/dcare-edit-quotation/dcare-edit-quotation.component';
import { ToolsComponent } from './tools/tools.component';
import { MconnectComponent } from './mconnect/mconnect.component';
import { MyVOIPLicenceKeyComponent } from './mconnect/my-voiplicence-key/my-voiplicence-key.component';
import { CurrentPayslipComponent } from './hr/current-payslip/current-payslip.component';


@NgModule({
  declarations: [
    AppComponent,ErpAppPermissionComponent,
 
    MastersComponent,
    HeaderComponent,
    FooterComponent,

    NavbarComponent,
     SidebarComponent,
     TableComponent,
     TestComponent,
     CombinationComponent,
     Sidebar2Component,
     CustomerComponent,
     CustomernewallComponent,
     FirstComponent,
     SecondComponent,
     ContractComponent,
     AddComponent,
     MenutestComponent,
     AlertCheckComponent,
     ContractmasterfileComponent,
     ContractclassificationComponent,
     ContractnameComponent,
     BillingComponent,
     QuotationnewComponent,
     AddquotationnewComponent,
     CheckComponent,
     ContractliveComponent,
     LiveComponent,
     LoginComponent,
     LogoutComponent,
     EditquotationnewComponent,
     ProformaInvoiceComponent,
     AddPIComponent,
     EditPIComponent,
     TransactionApprovalComponent,
     FormarrayComponent,
     SettingsComponent,
     ProfiledetailsComponent,
     InvoiceComponent,
     AddInvoiceComponent,
     DidinvoiceComponent,
     AddDidInvoiceComponent,
     EditInvoiceComponent,
     EditDidInvoiceComponent,
     LicenseCreditComponent,
     AddDidpiComponent,
     EditDidpiComponent,
     DeliveryOrderComponent,
     EditDoComponent,
     AddDoComponent,
     PurchaseOrderComponent,
     AddPurchaseOrderComponent,
     EditPurchaseOrderComponent,
     TransactionnewComponent,
     LedgerComponent,
     AddTransactionNewComponent,
     EditTransactionNewComponent,
     ResellerManagementComponent,
     PipeComponent,
     CrmComponent,
     EnquirynewComponent,
     AddNewEnquiryComponent,
     DuplicateDOComponent,
     EditNewEnquiryComponent,
     ResellerPaymentComponent,
     EditinvoiceDIDComponent,
     DatetimeTestComponent,
     DupProformaInvoiceComponent,
     DupAddPIComponent,
     DupEditPIComponent,
     DupInvoiceComponent,
     DupAddInvoiceComponent,
     DupEditInvoiceComponent,
     DupEditInvoiceDIDComponent,
     DupCustomerNewAllComponent,
     DupQuotationNewComponent,
     DupAddQuotationNewComponent,
     DupEditQuotationNewComponent,
     RecurringCheckerComponent,
     RecurringDateupdateComponent,
     MultipleInvPaymentComponent,
     AddquotaionnewsdnComponent,
     PurchaseEntryComponent,
     ReportsComponent,
     InvoicereportsoldComponent,
     PrintpreviewComponent,
     PurchaseentryreportComponent,
     GstreportComponent,
     GuruComponent,
     VoipswitchComponent,
     CreditmanagerComponent,
     PettyCashComponent,
     RecurringResellerComponent,
     CstreportComponent,
     VsprovisionComponent,
     DemotestComponent,
     AddressPipe,
     AddMulInvPayComponent,
     EditMulInvPayComponent,
     StockComponent,
     ProductMasterComponent,
     StockDIDMasterComponent,
     StockInventoryEntryComponent,
     StockDIDInventoryEntryComponent,
     StockDIDNumberCatalogComponent,
     CurrentstockComponent,
     RateCatalogComponent,
     RMAIssueComponent,
     ProductCategoryComponent,
     CurrentStockMasterComponent,
   
     ProductMaster1Component,
     PEVoipTrendComponent,
     AddGenStockComponent,
     EditGenStockComponent,
     RateCatelogMasterComponent,
     AddRateCatalogComponent,
     EditRateCatalogComponent,
     DIDNumberCatalogComponent,
     DIDProviderComponent,
     DIDTrunkNameComponent,
     AddDIDNumCatStockComponent,
     EditDIDNumCatStockComponent,
     Nx3233Component,
     PurchaseEntryYearlyComponent,
     PurchaseEntryMrVoipTrendComponent,
     PurchaseEntryCall4telTrendComponent,
     PublictaskComponent,
     CreditnoteComponent,
     AddcreditnoteComponent,
     EditcreditnoteComponent,
     HRComponent,
     DesgTypeMgmtComponent,
     UsergroupComponent,
     UsermanagementComponent,
     DebitnoteComponent,
     AdddebitnoteComponent,
     EditdebitnoteComponent,
     PrepaidnoteComponent,
     AddprepaidnoteComponent,
     EditprepaidnoteComponent,
     CalendarTemplateComponent,
     SalaryentryComponent,
     AddsalaryentryComponent,
     EditsalaryentryComponent,
     ContributionmasterComponent,
     AddcontributionmasterComponent,
     EditcontributionmasterComponent,
     DidStockComponent,
     AttendanceReportComponent,
     StaffpermissionreportComponent,
     MonthlycontributionComponent,
     AddcontmasterComponent,
     EditcontmasterComponent,
     LeaverequestComponent,
     LeavereqFinalComponent,
     LeaveapprovalComponent,
     LicenseKeyManagementComponent,
     AddDecarepiComponent,
     EditDecarepiComponent,
     DcareProformaInvoiceComponent,
     DcareInvoiceComponent,
     DcareAddInvoiceComponent,
     DcareEditInvoiceComponent,
     DcareQuotationComponent,
     DcareAddQuotationComponent,
     DcareEditQuotationComponent,
     ToolsComponent,
     MconnectComponent,
     MyVOIPLicenceKeyComponent,
     CurrentPayslipComponent 
     
 
  ],
  imports: [
    BrowserModule,CanvasJSAngularChartsModule,MatProgressSpinnerModule,  
    FormsModule,MatTabsModule,NgxSpinnerModule,
    ReactiveFormsModule,QRCodeModule,
    AppRoutingModule,MatChipsModule,EditorModule, DragDropModule,
    HttpClientModule,MatIconModule, NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatSliderModule,
    AutocompleteLibModule,PdfViewerModule,FullCalendarModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [    [DatePipe],  [BnNgIdleService], { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
