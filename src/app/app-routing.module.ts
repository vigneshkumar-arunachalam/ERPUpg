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
import { AddDoComponent } from './billing/delivery-order/add-do/add-do.component';
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

const routes: Routes = [
  {
    path: '', component: QuotationnewComponent
  },{
    path: 'attendance_report', component: AttendanceReportComponent
  },
  {
    path: 'didStock', component: DidStockComponent
  },{
    path: 'addcontributionmaster', component: AddcontributionmasterComponent
  },{
    path: 'editcontributionmaster', component: EditcontributionmasterComponent
  }, {
    path: 'contributionmaster', component: ContributionmasterComponent
  }, {
    path: 'editSalaryEntry', component: EditsalaryentryComponent
  }, {
    path: 'addSalaryEntry', component: AddsalaryentryComponent
  },{
    path: 'salaryEntry', component: SalaryentryComponent
  }, {
    path: 'calendarTemplate', component: CalendarTemplateComponent
  }, {
    path: 'prepaidnote', component: PrepaidnoteComponent
  }, {
    path: 'addprepaidnote', component: AddprepaidnoteComponent
  }, {
    path: 'editprepaidnote', component: EditprepaidnoteComponent
  }, {
    path: 'debitnote', component: DebitnoteComponent
  }, {
    path: 'adddebitnote', component: AdddebitnoteComponent
  }, {
    path: 'editdebitnote', component: EditdebitnoteComponent
  },
  {
    path: 'HRuserGroup', component: UsergroupComponent
  }, {
    path: 'HRUserMgmt', component: UsermanagementComponent
  }, {
    path: 'HRDesgTyMgmt', component: DesgTypeMgmtComponent
  }, {
    path: 'editcreditnote', component: EditcreditnoteComponent
  }, {
    path: 'addcreditnote', component: AddcreditnoteComponent
  }, {
    path: 'creditnote', component: CreditnoteComponent
  }, {
    path: 'publictask', component: PublictaskComponent
  }, {
    path: 'PEMrCall4telTrend', component: PurchaseEntryCall4telTrendComponent
  }, {
    path: 'PEMrVoipTrend', component: PurchaseEntryMrVoipTrendComponent
  }, {
    path: 'PEYearly', component: PurchaseEntryYearlyComponent
  }, {
    path: 'nx32', component: Nx3233Component
  }, {
    path: 'editDIDNumberCatalog', component: EditDIDNumCatStockComponent
  }, {
    path: 'addDIDNumberCatalog', component: AddDIDNumCatStockComponent
  }, {
    path: 'DIDNumberCatalog', component: DIDNumberCatalogComponent
  },
  {
    path: 'DIDProvider', component: DIDProviderComponent
  },
  {
    path: 'DIDTrunkName', component: DIDTrunkNameComponent
  }, {
    path: 'AddRateCatalog', component: AddRateCatalogComponent
  }, {
    path: 'EditRateCatalog', component: EditRateCatalogComponent
  }, {
    path: 'rateCatalog', component: RateCatelogMasterComponent
  }, {
    path: 'editCurrentStock', component: EditGenStockComponent
  }, {
    path: 'addCurrentStock', component: AddGenStockComponent
  }, {
    path: 'PEVoipTrend', component: PEVoipTrendComponent
  }, {
    path: 'ProductCategory', component: ProductCategoryComponent
  }, {
    path: 'CurrentStockMaster', component: CurrentStockMasterComponent
  }, {
    path: 'ProductMaster1', component: ProductMaster1Component
  }, {
    path: 'stock', component: StockComponent
  }, {
    path: 'stockproductmaster', component: ProductMasterComponent
  }, {
    path: 'stockDIDMaster', component: StockDIDMasterComponent
  }, {
    path: 'StockInventoryEntry', component: StockInventoryEntryComponent
  }, {
    path: 'StockDIDInventoryEntry', component: StockDIDInventoryEntryComponent
  }, {
    path: 'Currentstock', component: CurrentstockComponent
  }, {
    path: 'RateCatalog', component: RateCatalogComponent
  }, {
    path: 'RMAIssue', component: RMAIssueComponent
  }, {
    path: 'StockDIDNumberCatalog', component: StockDIDNumberCatalogComponent
  },

  {
    path: 'editMulInvPay', component: EditMulInvPayComponent
  }, {
    path: 'addMulInvPay', component: AddMulInvPayComponent
  }, {
    path: 'demotest', component: DemotestComponent
  }, {
    path: 'vsprovision', component: VsprovisionComponent
  },
  {
    path: 'sstreport', component: CstreportComponent
  }, {
    path: 'recurringReseller', component: RecurringResellerComponent
  }, {
    path: 'pettyCash', component: PettyCashComponent
  }, {
    path: 'creditmanager', component: CreditmanagerComponent
  }, {
    path: 'voipswitch', component: VoipswitchComponent
  }, {
    path: 'guru', component: GuruComponent
  },
  {
    path: 'gstreport', component: GstreportComponent
  },
  {
    path: 'purchaseentryreport', component: PurchaseentryreportComponent
  }, {
    path: 'printpreview', component: PrintpreviewComponent
  }, {
    path: 'reports', component: ReportsComponent
  }, {
    path: 'invoiceReportsOld', component: InvoicereportsoldComponent
  }, {
    path: 'ledgerPurchaseEntry', component: PurchaseEntryComponent
  }, {
    path: 'addquotationnewsdn', component: AddquotaionnewsdnComponent
  }, {
    path: 'multipleInvPayment', component: MultipleInvPaymentComponent
  }, {
    path: 'recurringChecker', component: RecurringCheckerComponent
  }, {
    path: 'recurringDateupdate', component: RecurringDateupdateComponent
  }, {
    path: 'dupAddQuotation', component: DupAddQuotationNewComponent
  }, {
    path: 'dupEditQuotation', component: DupEditQuotationNewComponent
  }, {
    path: 'dupCustomerNewAll', component: DupCustomerNewAllComponent
  }, {
    path: 'dupEditInvoiceDID', component: DupEditInvoiceDIDComponent
  }, {
    path: 'dupEditInvoice', component: DupEditInvoiceComponent
  }, {
    path: 'dupAddInvoice', component: DupAddInvoiceComponent
  }, {
    path: 'dupInvoiceList', component: DupInvoiceComponent
  }, {
    path: 'dupPIList', component: DupProformaInvoiceComponent
  }, {
    path: 'dupPIAdd', component: DupAddPIComponent
  }, {
    path: 'dupPIEdit', component: DupEditPIComponent
  }, {
    path: 'test2', component: DatetimeTestComponent
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
    path: 'masters', component: MastersComponent
  }
  ,
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'table', component: TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
