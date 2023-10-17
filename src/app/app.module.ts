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
import { DupCustomerNewAllComponent } from './masters/customer/dup-customer-new-all/dup-customer-new-all.component';
import { DupQuotationNewComponent } from './billing/dup-quotation-new/dup-quotation-new.component';
import { DupAddQuotationNewComponent } from './billing/dup-quotation-new/dup-add-quotation-new/dup-add-quotation-new.component';
import { DupEditQuotationNewComponent } from './billing/dup-quotation-new/dup-edit-quotation-new/dup-edit-quotation-new.component';




// import { BsDropdownModule} from 'ngx-bootstrap/dropdown'; 

@NgModule({
  declarations: [
    AppComponent,
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
     DupEditQuotationNewComponent
     
    
  ],
  imports: [
    BrowserModule,CanvasJSAngularChartsModule,
    FormsModule,MatTabsModule,NgxSpinnerModule,
    ReactiveFormsModule,QRCodeModule,
    AppRoutingModule,MatChipsModule,EditorModule, DragDropModule,
    HttpClientModule,MatIconModule, NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatSliderModule,
    AutocompleteLibModule,PdfViewerModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [    [DatePipe],  [BnNgIdleService], { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
