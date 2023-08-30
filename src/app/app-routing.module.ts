import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters/masters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';
import { CombinationComponent } from './combination/combination.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { CustomerComponent } from './masters/customer/customer.component';
import { CustomernewallComponent } from './masters/customer/customernewall/customernewall.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ContractComponent } from './contract/contract.component';
import { AddComponent } from './contract/add/add.component';
import { MenutestComponent } from './menutest/menutest.component';
import { AlertCheckComponent } from './alert-check/alert-check.component';
import { ContractmasterfileComponent } from './contract/contractmasterfile/contractmasterfile.component';
import { ContractclassificationComponent } from './contract/contractclassification/contractclassification.component';
import { ContractnameComponent } from './contract/contractname/contractname.component';
import { BillingComponent } from './billing/billing.component';
import { QuotationnewComponent } from './billing/quotationnew/quotationnew.component';
import { AddquotationnewComponent } from './billing/quotationnew/addquotationnew/addquotationnew.component';
import { CheckComponent } from './check/check.component';
import { ContractliveComponent } from './contractlive/contractlive.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditquotationnewComponent } from './billing/quotationnew/editquotationnew/editquotationnew.component';
import { ProformaInvoiceComponent } from './billing/proforma-invoice/proforma-invoice.component';
import { AddPIComponent } from './billing/proforma-invoice/add-pi/add-pi.component';
import { EditPIComponent } from './billing/proforma-invoice/edit-pi/edit-pi.component';
import { TransactionApprovalComponent } from './billing/transaction-approval/transaction-approval.component';
import { FormarrayComponent } from './formarray/formarray.component';
import { ProfiledetailsComponent } from './settings/profiledetails/profiledetails.component';
import { InvoiceComponent } from './billing/invoice/invoice.component';
import { AddInvoiceComponent } from './billing/invoice/add-invoice/add-invoice.component';
import { DidinvoiceComponent } from './billing/didinvoice/didinvoice.component';
import { AddDidInvoiceComponent } from './billing/didinvoice/add-did-invoice/add-did-invoice.component';
import { EditInvoiceComponent } from './billing/invoice/edit-invoice/edit-invoice.component';
import { EditDidInvoiceComponent } from './billing/didinvoice/edit-did-invoice/edit-did-invoice.component';
import { LicenseCreditComponent } from './license-credit/license-credit.component';
import { AddDidpiComponent } from './billing/proforma-invoice/add-didpi/add-didpi.component';
import { EditDidpiComponent } from './billing/proforma-invoice/edit-didpi/edit-didpi.component';

import { DeliveryOrderComponent } from './billing/delivery-order/delivery-order.component'; 
import { EditDoComponent } from './billing/delivery-order/edit-do/edit-do.component'; 
import {AddDoComponent} from './billing/delivery-order/add-do/add-do.component'; 
import { PurchaseOrderComponent } from './billing/purchase-order/purchase-order.component'; 
import { AddPurchaseOrderComponent } from './billing/purchase-order/add-purchase-order/add-purchase-order.component'; 
import { EditPurchaseOrderComponent } from './billing/purchase-order/edit-purchase-order/edit-purchase-order.component'; 
import { LedgerComponent } from './ledger/ledger.component'; 
import { TransactionnewComponent } from './ledger/transactionnew/transactionnew.component';
import { AddTransactionNewComponent } from './ledger/transactionnew/add-transaction-new/add-transaction-new.component'; 
import { EditTransactionNewComponent } from './ledger/transactionnew/edit-transaction-new/edit-transaction-new.component'; 
import { ResellerManagementComponent } from './masters/reseller-management/reseller-management.component'; 
import { PipeComponent } from './pipe/pipe.component';
import { CrmComponent } from './crm/crm.component';
import { EnquirynewComponent } from './crm/enquirynew/enquirynew.component'; 
import { AddNewEnquiryComponent } from './crm/enquirynew/add-new-enquiry/add-new-enquiry.component'; 
import { DuplicateDOComponent } from './billing/delivery-order/duplicate-do/duplicate-do.component'; 
import { EditNewEnquiryComponent } from './crm/enquirynew/edit-new-enquiry/edit-new-enquiry.component'; 
import { ResellerPaymentComponent } from './billing/reseller-payment/reseller-payment.component';
import { EditinvoiceDIDComponent } from './billing/invoice/editinvoice-did/editinvoice-did.component';
const routes: Routes = [
  {
    path: '', component: QuotationnewComponent
  },
  {
    path: 'InvoiceEditDID', component: EditinvoiceDIDComponent
  },
  {
    path: 'resellerPayment', component: ResellerPaymentComponent
  },
  {
    path: 'editNewEnquiry', component: EditNewEnquiryComponent
  },
  {
    path: 'duplicateDo', component: DuplicateDOComponent
  },
  {
    path: 'addNewEnquiry', component: AddNewEnquiryComponent
  },
  {
    path: 'crm', component: CrmComponent
  },
  {
    path: 'enquirynew', component: EnquirynewComponent
  },
  {
    path: 'pipe', component: PipeComponent
  },
  {
    path: 'ResellerManagement', component: ResellerManagementComponent
  },
  {
    path: 'EditTransactionNew', component: EditTransactionNewComponent
  },
  {
    path: 'AddTransactionNew', component: AddTransactionNewComponent
  },
  {
    path: 'transactionnew', component: TransactionnewComponent
  },
  {
    path: 'editPurchaseOrder', component: EditPurchaseOrderComponent
  },
  {
    path: 'addPurchaseOrder', component: AddPurchaseOrderComponent
  },
  {
    path: 'purchaseorder', component: PurchaseOrderComponent
  },
  {
    path: 'addDeliveryOrder', component: AddDoComponent
  },
  {
    path: 'editDeliveryOrder', component: EditDoComponent
  },
  {
    path: 'deliveryorder', component: DeliveryOrderComponent
  },
  {
    path: 'EditDidPI', component: EditDidpiComponent
  },
  {
    path: 'AddDidPI', component: AddDidpiComponent
  },
  {
    path: 'licenseCredit', component: LicenseCreditComponent
  },
  {
    path: 'editDidInvoice', component: EditDidInvoiceComponent
  },
  {
    path: 'EditInvoice', component: EditInvoiceComponent
  },
  {
    path: 'addDidInvoice', component: AddDidInvoiceComponent
  },
  {
    path: 'didInvoice', component: DidinvoiceComponent
  },
  {
    path: 'AddInvoice', component: AddInvoiceComponent
  },
  {
    path: 'invoice', component: InvoiceComponent
  },
  {
    path: 'profiledetails', component: ProfiledetailsComponent
  },
  {
    path: 'Formarray', component: FormarrayComponent
  },
  {
    path: 'TransactionApproval', component: TransactionApprovalComponent
  },
  {
    path: 'AddPI', component: AddPIComponent
  },
  {
    path: 'EditPI', component: EditPIComponent
  },
  
  {
    path: 'ProformaInvoice', component: ProformaInvoiceComponent
  },
  {
    path: 'editquotationnew', component: EditquotationnewComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: 'contractlive', component: ContractliveComponent
  },
  {
    path: 'check', component: CheckComponent
  },
  {
    path: 'addquotationnew', component: AddquotationnewComponent
  },
  {
    path: 'billing', component: BillingComponent
  },
  {
    path: 'quotationnew', component: QuotationnewComponent
  },
  {
    path: 'contractname', component: ContractnameComponent
  },
  {
    path: 'Contractclassification', component: ContractclassificationComponent 
  },
  {
    path: 'contractmasterfile', component: ContractmasterfileComponent 
  },

  {
    path: 'alertcheck', component: AlertCheckComponent
  },
  {
    path: 'menutest', component: MenutestComponent
  },
  {
    path: 'addcontract', component: AddComponent
  },
  
  {
    path: 'contract', component: ContractComponent
  },
  
  {
    path: 'first', component: FirstComponent
  },
  {
    path: 'second', component: SecondComponent
  },
  {
    path: 'customer', component: CustomerComponent
  },
  {
    path: 'customernewall', component: CustomernewallComponent
  },
  {
    path: 'combination', component: CombinationComponent
  },
  {
    path: 'header', component: HeaderComponent
  },
  {
    path: 'footer', component: FooterComponent
  },
  {
    path: 'navbar', component: NavbarComponent
  },
  {
    path: 'sidebar', component: SidebarComponent
  }, 
  {
    path: 'sidebar2', component: Sidebar2Component
  },
  {
    path:'masters',component:MastersComponent
  }
  ,
  {
    path:'test',component:TestComponent
  },
  {
    path:'table',component:TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
