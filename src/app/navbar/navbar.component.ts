import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

interface Page {
  menu_name: string;
  pageId: number;
  checked: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  //others
  userName: any
  userId: any;
  role_Permission: any;
  user_ProfileImage: any;
  // Global search
  GlobalSearch: FormGroup;
  pagesNameList: any;

  live: boolean = true;
  SelectPageListId: any;
  //autocomplete-customer name
  searchResultTest: any;
  CompanyName: any;
  searchResult: any;
  // Contract Details
  ContractDetailsForm: FormGroup;
  user_ids: any;
  searchResult_code: any;
  searchResult_DIDNumber: any;
  searchResult_LicenseNumber: any;
  PG_customerId: any;
  PG_customerName: any;
  PG_CustomerCode: any;
  PG_LicenseNum: any;
  PG_DIDNumber: any;

  proformaList: any;
  PI_list: any;
  dashboard = false;
  PI_list_send: any;
  customerContractlist: any;
  resellerList: any;
  resellerList_CurrencyName: any;
  resellerList_ResellerDiscount: any;
  resellerList_ResellerId: any;
  customercontractForm: FormGroup;
  testVariable: { id: number; name: string; }[];
  PageIDs: any;
  SelectPageList: any = [];
  addSelectPageListCheckboxID_array: any = [];
  pageList: any;
  selectAllCheckbox: any;
  deselectAllCheckbox: any;
  Quotation_list_send: any;
  Customer_list_send: any;
  Invoice_list_send: any;
  contract_filter = false;
  PG_LicenseKey: any;
  PG_DIDNumbers: any;
  componentDynamic: any;
  PI_UI_Show: any;
  Quot_UI_Show: any;
  Cust_UI_Show: any;
  Invoice_UI_Show: any;
  show: boolean = true;
  Quotation_per_send: any;
  PI_per_send: any;
  Invoice_per_send: any;
  Invoice_biller_send: any;
  Invoice_revenue_send: any;
  isColorInputDisabled = false;
  Customer_revenue_send: any;
  roles: string;
  GlobalSearchPermission: any;
  payment_transaction_reports_Permission: string;
  currencyConvertorForm: FormGroup;
  getCurrencyList: any;

  currencyConvOutput: any;
  getCurrencyDetails: any;
  convetValue: any;
  convetcurrencyFrom: any;
  convetcurrencyTo: any;
  currencyData: any;
  currencies: any[];
  //send to post
  sendtoPostForm: FormGroup;
  actualCost_ProductList: any[];
  postalInvoiceDetails: any;
  getTaskList: any;
  overduePaymentsBillerList: any;
  dropdownVisible = false;
  overduePaymentForm: FormGroup;
  overduePaymentsBillerWise: any;

  colorCodes: any;
  billerNameDisplay: any;
  //group checkbox
  selectedBillIds_overdue: { [customerId: number]: Set<number> } = {};
  billBalances_overdue: { [billId: number]: number } = {};
  balamt: number = 0;
  list: any;
  //checkbox
  //payment followers
  paymentFollowers_List: any;
  PaymentFoll_billid: any;
  checkbox_ID_SingleParameter_invoiceShow_Value: any;
  Checkbox_value_invoiceShow: any;
  CheckBox_DynamicArrayList_invoiceShowPermission: any;
  typeConvertionString_invoiceShowPermission: any;

  //process payment
  billID_processPayment: any;
  invoiceDetails_payment: any;
  paymentType_payment: any;
  paymentDetails_payment: any;
  paymentDetails_paymentLength: any;
  paymentNotes: any;
  PP_paymentMethod: any;
  processPaymentForm: FormGroup;
  isReadOnly: boolean = true;
  PP_PaymentProcessID: any;
  owingAmt: any;
  datePipe: DatePipe = new DatePipe('en-US');
  transformDate: any;
  flg: boolean = false;
  changePrepaidNoteValue: any;
  creditShowFlag: boolean = false;
  prepaidShowFlag: boolean = false;
  creditResponse: any;
  credit_note_id: any = 0;
  prepaid_id: any = 0;
  changeCreditNoteValue: any;
  //multiple process payment
  multipleprocessPaymentForm: FormGroup;

  //email-landscape
  emailForm: FormGroup;
  Select_To_Type_radiobox_Value: any;
  email_TemplateSelection: boolean = false;
  Email_BillId: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  email_groupMailList: any;
  messageContent: any;
  mailContent: any;
  FromEmailValue: any;
  SelectType_finance: any;
  SelectType_company: any;
  CBV_TemplateSelection: any;
  CBV_PDFLink: any;
  CBV_PaymentLink: any;
  //Select All email-overdue
  SA_groupSelect_emailCCId: any;
  SA_checkbox_value: any;
  SA_edit_array_emailCC_Checkbox: any = [];

  //email-checkbox
  email_array_emailCC_Checkbox: any = [];
  edit_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId: any;
  email_checkbox_value: any;
  checkbox_value: any;
  quotation_Emailtemplate_id: any;
  multipleBillIDPaymentP: number[];
  invoiceDetails_payment_m: any;
  paymentType_payment_m: any;
  paymentDetails_payment_m: any;
  paymentDetails_paymentLength_m: any;
  multipleBalAmount: any[];
  multipleBillIDPaymentcust: any;
  emailTo_overdue: any;
  subjectValue_overdue: any;
  msg_id_overdue: any;
  Email_BillId_overdue: any;
  types: any;
  overdue_PaymentURL_result: any;
  clickFlag: boolean = false;
  overdue_selectedCustomerId: any;
  selectAll_emailForm: FormGroup;
  cbk_paymentLink_value: any;
  cbk_demandLetterPDF_value: any;
  SA_email_fromList: any;
  SA_email_groupMailList: any;
  SA_email_crmTemplateList: any;
  SA_email_cc_userList: any;
  SA_messageContent: any;
  SA_SelectType_finance: any;
  SA_SelectType_company: any;
  SA_types: any;
  SA_mailContent: any;
  SA_Select_To_Type_radiobox_Value: any;
  SA_quotation_Emailtemplate_id: any;
  SA_Email_BillId_overdue: any;
  SA_cbkpaymentLink_value: any;
  SA_cbkDemandLetter_value: any;
  SA_FromEmailValue: any;
  SA_emailTo_overdue: any;
  SA_subjectValue_overdue: any;
  SA_msg_id_overdue: any;
  //overdueSearchForm search
  overdueSearchForm: FormGroup;
  billerIDDisplay: any;
  overdue_Customerlist: any;
  overdue_CustomerIDSearch: any;
  monthlyRecurInvCount:any;

  //global search---new

  menuList: any[] = [];
  allSelected: boolean = false;
  selectedPageIds: any[] = [];
  selectedPageNames: any[] = [];
  OS_searchResult: any;
  OS_search_CustID: any;
  OS_search_CustName: any;
  postalInvoiceCount: any;
  sendtoPostalPermission: any;
  SA_Email_BillerId_overdue: any;
  SA_Email_customerid_overdue: any;
  getRecurredListValue: any;
  ResellerRecuringApprovalList: any;
  getRecuringInvoiceList: any[] = [];
  getRecuringInvoiceTitleList: any[] = [];
  combinedData: { title: any, invoices: any[] }[] = [];
  selectedBillIds_RecurringInvoice: number[] = [];
  deselectedBillIds_RecurringInvoice: number[] = [];

  //reseller recurring
  arrayRecurringReseller: any[] = [];
  overdueResponse: any;
  getRevenueDataList: any;
  Email_BillerId_overdue: any;
  billidArray: any[] = [];
  billeridArray: any[] = [];
  mailCustomerID: any;
  uniqueBillerIds: any[] = [];
  recurringDemoList: any;
  //reseller Demo
  arrayRecurringDemo: any[] = [];
  //recurring loader
  isLoading = false;
  RecurredInvoiceCount: any;
  ResellerInvoiceCount: any;
  recuringApInvCount: any;
 

  constructor(private router: Router, private serverService: ServerService,
    private http: HttpClient, private fb: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.serverService.reload_profile.subscribe((res: any) => {
      // console.log(res);
      var kk = JSON.parse(res);
      //  console.log(kk)
      if (kk.data == 'reload_profile_data') {
        this.userName = localStorage.getItem('user_name');
        this.userId = localStorage.getItem('erp_c4c_user_id');
        this.role_Permission = localStorage.getItem('role');
        this.user_ProfileImage = localStorage.getItem('profile_image');
      }
    });
    this.serverService.closemodal.subscribe((res: any) => {
      // console.log('val.type', res.type);
      this.PageList();
      setTimeout(() => {
        this.functionclose();
      }, 1000);
    });
    this.serverService.callbackfun.subscribe((val: any) => {
      // console.log('val.type', val.type);
      if (val.type == 'quotation_list') {
        // console.log(this.Quotation_list_send);
        let api_reqs: any = {
          Quotation_list_send: this.Quotation_list_send,
          Quotation_per_send: this.Quotation_per_send
        };
        this.serverService.global_search_quotation.next(api_reqs);
      } else if (val.type == 'pi_list') {
        let api_reqs: any = {
          PI_list_send: this.PI_list_send,
          PI_per_send: this.PI_per_send
        };
        this.serverService.global_search.next(api_reqs);
      } else if (val.type == 'invoice_list') {
        let api_reqs: any = {
          Invoice_list_send: this.Invoice_list_send,
          Invoice_per_send: this.Invoice_per_send,
          Invoice_biller_send: this.Invoice_biller_send,
          Invoice_revenue_send: this.Invoice_revenue_send,
        };
        this.serverService.global_search_invoice.next(api_reqs);
      } else if (val.type == 'customer_list') {
        let api_reqs: any = {
          Customer_list_send: this.Customer_list_send,
          Customer_revenue_send: this.Customer_revenue_send
        };
        this.serverService.global_search_customer.next(api_reqs);
      }

    })

  }
  keywordCompanyName = 'customerName';
  keywordCompanyCode = 'customerCode';
  keywordDIDNumber = 'did_numbers';
  keywordLicenseNumber = 'license_key';
  OS_keywordCustomerName = 'customerName';
  ngOnInit(): void {
    this.show = true;
    this.Select_To_Type_radiobox_Value = 'finance';
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.resellerList_CurrencyName = 'SGD';
    this.resellerList_ResellerDiscount = 0;
    this.resellerList_ResellerId = 'Empty';
    this.addSelectPageListCheckboxID_array = ["Customer New"];
    // console.log("addSelectPageListCheckboxID_array----initial on load", this.addSelectPageListCheckboxID_array);
    setTimeout(() => {
      this.userName = localStorage.getItem('user_name');
      this.userId = localStorage.getItem('erp_c4c_user_id');
      this.role_Permission = localStorage.getItem('role');
      this.user_ProfileImage = localStorage.getItem('profile_image');
      this.payment_transaction_reports_Permission = localStorage.getItem('payment_transaction_reports');

    }, 2000);
    this.PageList();
    this.searchGlobalList();
    this.roles = localStorage.getItem("role");
    this.get_permission();
    this.testVariable = [{ "id": 1, "name": "Credit Note" }, { "id": 2, "name": "Customer New" }, { "id": 3, "name": "Customer Project" }, { "id": 4, "name": " DID Number" }]
    //  console.log(this.testVariable)
    this.GlobalSearch = new FormGroup({

      'GS_CustomerCode': new FormControl(null),
      'GS_CustomerName': new FormControl(null),
      'GS_DIDNumber': new FormControl(null),
      'GS_LicenseNumber': new FormControl(null),
      'SelectAll_menuName': new FormControl(null),

    });
    this.overduePaymentForm = new FormGroup({

    })
    this.customercontractForm = new FormGroup({
      'colorCU': new FormControl(null),
    });
    this.ContractDetailsForm = new FormGroup({
      'contractColor': new FormControl(null),
    });
    this.overdueSearchForm = new FormGroup({
      'OS_customer': new FormControl(null),
      'OS_fromDate': new FormControl(null),
      'OS_toDate': new FormControl(null),

    })

    this.processPaymentForm = new FormGroup({
      'invoiceID': new FormControl(null),
      'toal': new FormControl(null),
      'biller': new FormControl(null),
      'paid': new FormControl(null),
      'customer': new FormControl(null),
      'owing': new FormControl(null),
      'amount': new FormControl(null),
      'date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'paymenttype': new FormControl(null),
      'paymenttype1': new FormControl(null),
      'paymenttype2': new FormControl(null),
      'note': new FormControl(null),
      'paymentDetails': new FormControl(null),

    });
    this.multipleprocessPaymentForm = new FormGroup({
      'm_invoiceID': new FormControl(null),
      'm_toal': new FormControl(null),
      'm_biller': new FormControl(null),
      'm_paid': new FormControl(null),
      'm_customer': new FormControl(null),
      'm_owing': new FormControl(null),
      'm_amount': new FormControl(null),
      'm_date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'm_paymenttype': new FormControl(null),
      'm_paymenttype1': new FormControl(null),
      'm_paymenttype2': new FormControl(null),
      'm_note': new FormControl(null),
      'm_paymentDetails': new FormControl(null),

    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),
      'formControlName="radio_ApprovalBy': new FormControl(null),
      'cbk_paymentLink': new FormControl(null),
      'cbk_demandLetterPDF': new FormControl(null),

    });
    this.selectAll_emailForm = new FormGroup({
      'SA_email_From': new FormControl(null, Validators.required),
      'SA_radio_ApprovalBy': new FormControl(null),
      'SA_emailto': new FormControl(null, Validators.required),
      'SA_email_cc': new FormControl(null),
      'SA_Subject_Content': new FormControl(null, Validators.required),
      'SA_email_template': new FormControl(null, Validators.required),
      'SA_cbk_paymentLink': new FormControl(null),
      'SA_cbk_demandLetterPDF': new FormControl(null),

    });
    this.currencyConvertorForm = new FormGroup({
      'convertValue': new FormControl(null),
      'CurrencyFrom': new FormControl(null),
      'CurrencyTo': new FormControl(null),
      'outputValue': new FormControl(null),
    });
    var date = new Date();
    this.transformDate = this.datePipe.transform(date, 'MM/dd/yyyy');

    this.http.get<any>('https://erp1.cal4care.com/api/getCurrencyList').subscribe((data: any) => {
      if (data != '') {
        this.getCurrencyList = data.currency_data;
      }

      // console.log("this.getCurrencyList", this.getCurrencyList)
    });
    this.http.get<any>('https://erp1.cal4care.com/api/getCurrencyDetails').subscribe((data: any) => {
      if (data != '') {
        this.getCurrencyDetails = data.currency_data;
        this.currencyData = data.currency_data;
      }

      this.currencies = ["SGD", "USD", "INR", "MYR", "EUR", "JPY", "THB", "AUD", "NZD", "IDR", "PHP"];
      // console.log("this.getCurrencyDetails", this.getCurrencyDetails)
    });

    this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoice').subscribe((data: any) => {

      if (data != '') {
        this.postalInvoiceDetails = data;
      }
      //  console.log("this.postalInvoiceDetails", this.postalInvoiceDetails)
    });
    this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoiceCount').subscribe((data: any) => {

      if (data != '') {
        this.postalInvoiceCount = data.count;
      }
      //  console.log("this.postalInvoiceDetails", this.postalInvoiceDetails)
    });
    this.http.get<any>('https://erp1.cal4care.com/api/base/getTaskList').subscribe((data: any) => {

      if (data != '') {
        this.getTaskList = data.taskList;
      }
      // console.log("this.getTaskList", this.getTaskList)
    });
    this.http.get<any>('https://erp1.cal4care.com/api/soa/overduePaymentsBillerList?user_id=' + localStorage.getItem('erp_c4c_user_id')).subscribe((data: any) => {

      if (data != '') {
        this.overduePaymentsBillerList = data.dataList;
      }
      console.log("this.overduePaymentsBillerList", this.overduePaymentsBillerList)
    });
    this.getRecurringCountList();

  }
  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuVisible = !this.isMenuVisible;
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  PP_PaymentMethod(event: any) {
    this.PP_paymentMethod = event.target.value;
    if (event.target.value == 7 || event.target.value == 8) {
      this.flg = true;
    }
    console.log("this.PP_paymentMethod", this.PP_paymentMethod)
    this.PP_PaymentMethodDropdown();
  }
  handle_cbk_paymentLink(event: any) {
    this.cbk_paymentLink_value = event.target.checked
  }
  handle_cbk_demandLetterPDF(event: any) {
    this.cbk_demandLetterPDF_value = event.target.checked
  }


  handle_radioChange_email(event: any, id: any) {
    console.log("event", event)
    this.Select_To_Type_radiobox_Value = id;
    console.log("this.Select_To_Type_radiobox_Value", this.Select_To_Type_radiobox_Value)
    console.log(this.Select_To_Type_radiobox_Value);


    if (this.Select_To_Type_radiobox_Value == 'finance') {
      this.emailForm.patchValue({
        'email_to': this.SelectType_finance,
      })
    } else {
      this.emailForm.patchValue({
        'email_to': this.SelectType_company,
      })
    }
  }
  SA_handle_radioChange_email(event: any, id: any) {
    console.log("event", event)
    this.SA_Select_To_Type_radiobox_Value = id;
    console.log("this.Select_To_Type_radiobox_Value", this.SA_Select_To_Type_radiobox_Value)
    console.log(this.SA_Select_To_Type_radiobox_Value);


    if (this.SA_Select_To_Type_radiobox_Value == 'finance') {
      this.selectAll_emailForm.patchValue({
        'SA_emailto': this.SA_Select_To_Type_radiobox_Value,
      })
    } else {
      // this.selectAll_emailForm.patchValue({
      //   'SA_emailto': this.SA_Select_To_Type_radiobox_Value,
      // })
    }
  }

  getConversionRate(fromCurrency: string, toCurrency: string): number {
    const rate = this.currencyData.find((data: { from_curr: string; to_curr: string; }) => data.from_curr === fromCurrency && data.to_curr === toCurrency);
    return rate ? rate.price : 1; // Return 1 if fromCurrency equals toCurrency
  }
  get_permission() {
    // console.log("this.roles", this.roles)
    var k: any = this.roles.split(',');
    for (var i = 0; i <= k.length; i++) {
      if (k[i] == 1148) {
        this.GlobalSearchPermission = k[i]
      }
      if (k[i] == 1129) {
        this.sendtoPostalPermission = k[i]
      }

    }
    // console.log(this.GlobalSearchPermission);
  }
  // Inside your component class
  selectedBillIds: number[] = [];

  // Inside your component class
  toggleSelection(event: any, billId: number) {
    const target = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
    const checked = target.checked;

    if (checked) {
      // Add billId to the selectedBillIds array if it's not already there
      if (!this.selectedBillIds.includes(billId)) {
        this.selectedBillIds.push(billId);
      }
    } else {
      // Remove billId from the selectedBillIds array
      const index = this.selectedBillIds.indexOf(billId);
      if (index !== -1) {
        this.selectedBillIds.splice(index, 1);
      }
    }
    // Log the selectedBillIds array to the console
    // console.log("Selected Bill IDs:", this.selectedBillIds);
  }


  isSelected(billId: number): boolean {
    // Check if the billId is in the selectedBillIds array
    return this.selectedBillIds.includes(billId);
  }


  selectEventCustomer(item: any) {

    this.searchResultTest = item.customerName;
    this.PG_customerId = item.customerId;
    this.PG_customerName = item.customerName;
    // console.log(" this.PG_customerName-customer select change", this.PG_customerName);
    // console.log(item.customerId)
    // console.log(item.customerName)

    this.CompanyName = item.customerName;

    this.onFocusedCustomer({});
    // this.spinner.show();
    // do something with selected item
  }
  showFunction() {
    this.show = true;
  }
  onFocusedCustomer(e: any) {

    this.show = false;
    this.spinner.show();

    let api_req: any = new Object();
    let api_contract_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_contract";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_contract_req.action = "get_contract";
    api_contract_req.user_id = this.user_ids;
    api_contract_req.customer_id = this.PG_customerId;
    api_req.element_data = api_contract_req;
    if (this.PG_customerId == undefined) {
      this.spinner.hide();
      return false;
    }
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response != '') {

        this.spinner.hide();
        this.contract_filter = true;
        // console.log("response.customer_contract.color", response.customer_contract.color)

        this.customerContractlist = response.customer_contract;
        this.resellerList = response.reseller_info;
        this.resellerList_CurrencyName = response.reseller_info.currency_name;
        this.resellerList_ResellerDiscount = response.reseller_info.reseller_discount;
        this.resellerList_ResellerId = response.reseller_info.reseller_id;



        // this.ContractDetailsForm.patchValue({
        //   for(let i=0;i<response.customer_contract.length;i++){
        //     'contractColor': response.customer_contract[i].color
        //   }

        // })

      } else {

        this.contract_filter = false;
        Swal.close();
        this.spinner.hide();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  CHKAll_BillerNameSelectAll(a: any) {

  }
  toggleColorInput() {
    this.isColorInputDisabled = !this.isColorInputDisabled;
  }
  CHKAll_SelectPageSelectAll(event: any) {


    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      // console.log("this.SelectPageList", this.SelectPageList)

      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', true);
        //checkAll_ID.push(element.pageId); if id needs to be send or below line if u want to send names
        checkAll_ID.push(element.menu_name);

      });
      this.addSelectPageListCheckboxID_array = [];
      this.addSelectPageListCheckboxID_array = checkAll_ID;
      // console.log("checkedID", checkAll_ID)
      // console.log("this.addSelectPageListCheckboxID_array-Select All", this.addSelectPageListCheckboxID_array)
      this.PageIDs = this.addSelectPageListCheckboxID_array;
      // console.log("this.PageIDs-Select All", this.PageIDs);
    } else {
      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', false);
      });
      this.addSelectPageListCheckboxID_array = [];
      // console.log("this.addSelectPageListCheckboxID_array-De Select All", this.addSelectPageListCheckboxID_array);
      this.PageIDs = this.addSelectPageListCheckboxID_array;
      // console.log("this.PageIDs-De Select All", this.PageIDs);
    }

  }




  addSelectPageCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    this.SelectPageListId = data;

    if (event.target.checked == true) {

      this.addSelectPageListCheckboxID_array.push(data);
      // console.log("Final BillerName Checkbox After checkbox selected list", this.addSelectPageListCheckboxID_array);
    }
    else {
      const index = this.addSelectPageListCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.addSelectPageListCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list", this.addSelectPageListCheckboxID_array)

    }
    this.addSelectPageListCheckboxID_array.join(',');
    console.log("addSelectPageListCheckboxID_array----after join", this.addSelectPageListCheckboxID_array);

  }



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);


  } QuickMail_Customer() {
    Swal.fire({
      title: 'Are you sure to Send?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let api_reqD1: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_quick_mail";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqD1.action = "customer_quick_mail";
        api_reqD1.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqD1.customerId = this.PG_customerId;
        api_req.element_data = api_reqD1;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.spinner.hide();
            iziToast.success({
              message: "Quick Mail Sent Successfully",
              position: 'topRight'
            });

          } else {
            this.spinner.hide();
            iziToast.warning({
              message: "Quick Mail not Sent. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            this.spinner.hide();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error)
          };
      }
    })
  }
  clearPostalInvoice() {
    this.selectedBillIds = [];

  }
  postalinv_sendMail(billId: any) {
    Swal.fire({
      title: 'Are you sure to Send?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let api_reqD1: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "mailPostalInvoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqD1.action = "mailPostalInvoice";
        api_reqD1.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqD1.billId = billId;
        api_reqD1.email_state = 'yes';
        api_req.element_data = api_reqD1;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoice').subscribe((data: any) => {

              if (data != '') {
                this.postalInvoiceDetails = data;
              }
              //  console.log("this.postalInvoiceDetails", this.postalInvoiceDetails)
            });
            this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoiceCount').subscribe((data: any) => {

              if (data != '') {
                this.postalInvoiceCount = data.count;
              }
              //  console.log("this.postalInvoiceDetails", this.postalInvoiceDetails)
            });
            this.spinner.hide();
            iziToast.success({
              message: "Mail Sent Successfully",
              position: 'topRight'
            });

          } else {
            this.spinner.hide();
            iziToast.warning({
              message: "Mail not Sent. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            this.spinner.hide();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error)
          };
      }
    })
  }

  PaymentTransactionReports() {
    var userid = localStorage.getItem('erp_c4c_user_id');
    var username = localStorage.getItem('user_name');
    var payment_transaction_reports = localStorage.getItem('payment_transaction_reports');
    // console.log("userid", userid);
    // console.log("username", username);
    // console.log("userid+username", userid + username);
    // console.log("payment_transaction_reports", payment_transaction_reports);
    var userDetails = btoa(userid + username)
    // console.log("userDetails", userDetails)
    var url = "https://paymentinbound.cal4care.com/verify?uid=" + btoa(userid) + "&authToken=" + btoa(userid + username);
    window.open(url, '_blank');
  }
  searchGlobalList() {
    this.spinner.show();
    this.onFocusedCustomer({});
    // $('#ActionIdxx3').modal('show');
    if (this.PG_customerId == '' || this.PG_customerId == 'undefined' || this.PG_customerId == undefined) {

    }

    let api_req: any = new Object();
    let api_schGlo_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/globalSearchAll";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_schGlo_req.action = "globalSearchAll";
    api_schGlo_req.user_id = this.user_ids;
    if ((this.PG_customerId == '' || this.PG_customerId == 'undefined' || this.PG_customerId == undefined) &&
      (this.PG_customerName == '' || this.PG_customerName == 'undefined' || this.PG_customerName == undefined) &&
      (this.PG_LicenseNum == '' || this.PG_LicenseNum == 'undefined' || this.PG_LicenseNum == undefined) &&
      (this.PG_DIDNumber == '' || this.PG_DIDNumber == 'undefined' || this.PG_DIDNumber == undefined)
    ) {
      this.spinner.hide();
      // iziToast.error({
      //   message: "Select Customer or license or DID or company",
      //   position: 'topRight'
      // });
      return false;

    } else {
      api_schGlo_req.customer_id = this.PG_customerId;
    }

    // console.log(" this.PG_customerName-inside search global list", this.PG_customerName);
    api_schGlo_req.customer_name = this.PG_customerName;
    api_schGlo_req.customer_code = this.PG_CustomerCode;

    api_schGlo_req.license_number = this.PG_LicenseNum;
    api_schGlo_req.did_number = this.PG_DIDNumber;

    if (!this.selectedPageNames) {
      this.spinner.hide();
      iziToast.error({
        message: "Select Page ",
        position: 'topRight'
      });
      return false;
    } else {
      //  console.log("addSelectPageListCheckboxID_array----in search global list api-pagename", this.addSelectPageListCheckboxID_array)
      api_schGlo_req.pagename = this.selectedPageNames;
    }


    api_req.element_data = api_schGlo_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      // $('#ActionIdxx2').modal('hide');
      // console.log(" response--pagelist", response)
      if (response != '') {
        //  console.log("playboy", response.quotation_list)

        this.SelectPageList = response.menuList;

        this.componentDynamic = response.selected_menu;
        if (response.quotation_list != 0 || response.quotation_list != '0') {
          this.Quot_UI_Show = response.quotation_list;
          this.Quotation_list_send = response.quotation_list.quotation_details;
          this.Quotation_per_send = response.quotation_list.quotation_permission_arr;
          // console.log("quotation-global-before send", JSON.stringify(this.Quotation_list_send));
          // console.log("this.Customer_list_send-before send", JSON.stringify(this.Customer_list_send));


          let api_reqs: any = {
            Quotation_list_send: this.Quotation_list_send,
            Quotation_per_send: this.Quotation_per_send
          };
          this.serverService.global_search_quotation.next(api_reqs);
        } else {
          this.Quot_UI_Show = response.quotation_list;
          //   console.log("Quotation Skipped")
        }
        if (response.proforma_invoice_list != 0 || response.proforma_invoice_list != '0') {
          this.PI_list = response.proforma_details;
          this.PI_list_send = response.proforma_invoice_list.proforma_details;
          this.PI_list_send = response.proforma_invoice_list.proforma_details;
          this.PI_per_send = response.proforma_invoice_list.biller_details;
          this.PI_UI_Show = response.proforma_invoice_list;

          let api_reqs: any = {
            PI_list_send: this.PI_list_send,
            PI_per_send: this.PI_per_send
          };
          this.serverService.global_search.next(api_reqs);
        } else {
          this.PI_UI_Show = response.proforma_invoice_list;

          //  console.log("Performa invoice Skipped")
        }

        if (response.customer_list != 0 || response.customer_list != '0') {
          this.Customer_list_send = response.customer_list.customer_details;
          this.Customer_revenue_send = response.customer_list.revenue_list;
          this.Customer_list_send = response.customer_list.customer_details;
          this.Cust_UI_Show = response.customer_list;
          let api_reqs: any = {
            Customer_list_send: this.Customer_list_send,
            Customer_revenue_send: this.Customer_revenue_send
          };
          this.serverService.global_search_customer.next(api_reqs);
        } else {
          this.Cust_UI_Show = response.customer_list;
          // console.log("Customer List Skipped")
        }


        if (response.invoice_list != 0 || response.invoice_list != '0') {
          this.Invoice_list_send = response.invoice_list.proforma_details;
          this.Invoice_UI_Show = response.invoice_list;
          this.Invoice_list_send = response.invoice_list.proforma_details;
          this.Invoice_per_send = response.invoice_list.invoice_permission_arr;
          this.Invoice_biller_send = response.invoice_list.biller_details;
          this.Invoice_revenue_send = response.invoice_list.revenue_list;
          //  console.log("this.Invoice_list_send---before send", this.Invoice_list_send);
          let api_reqs: any = {
            Invoice_list_send: this.Invoice_list_send,
            Invoice_per_send: this.Invoice_per_send,
            Invoice_biller_send: this.Invoice_biller_send,
            Invoice_revenue_send: this.Invoice_revenue_send
          };
          this.serverService.global_search_invoice.next(api_reqs);
        } else {
          this.Invoice_UI_Show = response.invoice_list;
          // console.log("Invoice List Skipped")
        }
        // console.log(this.Quotation_list_send);

        // console.log("without json stringfy,this.Customer_list_send", this.Customer_list_send);
        // console.log("with json stringfy,this.Customer_list_send", JSON.stringify(this.Customer_list_send));
        this.dashboard = true;
        var api_req: any = '{"type":"hello","proformalist":this.PI_list_send}';
        $('#ActionIdOutput').modal('show');
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  gotoRoot() {

    $('#ActionIdxx2').modal('hide');
    // this.router.navigate(['/customernewall']);
    // window.location.reload();
  }
  functionclose() {
    //  console.log("haiiyvgfuisghfadfabvginadsivfulksziadhkisfzlaisv");
    for (let i = 0; i < this.addSelectPageListCheckboxID_array.length; i++) {
      //  console.log("this.SelectPageList", this.addSelectPageListCheckboxID_array[i])
      if (this.addSelectPageListCheckboxID_array[i] == "Credit Note") {
        $("#check-grp-SelectPage-0").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Customer New") {
        $("#check-grp-SelectPage-1").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Customer Project") {
        $("#check-grp-SelectPage-2").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "DID Number") {
        $("#check-grp-SelectPage-3").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Invoice") {
        $("#check-grp-SelectPage-4").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "License Key New") {
        $("#check-grp-SelectPage-5").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Prepaid Note") {
        $("#check-grp-SelectPage-6").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Proforma Invoice") {
        $("#check-grp-SelectPage-7").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Quotation New") {
        $("#check-grp-SelectPage-8").prop('checked', true);
      }
      else if (this.addSelectPageListCheckboxID_array[i] == "Vs Provisioning") {
        $("#check-grp-SelectPage-9").prop('checked', true);
      }
    }
  }
  closeModal() {
    this.PageList();
    $('#ActionIdOutput').modal('hide');
    setTimeout(() => {
      this.functionclose();
    }, 1000);

    // let api_reqs:any = JSON.stringify(this.Quotation_list_send);;
    // this.serverService.callbackfun.next(api_reqs);

  }
  gotoCustomerMaster() {
    $('#ActionIdxx3').modal('hide');
    this.router.navigate(['/customernewall']);


  }

  PageList() {


    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getMenuList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "getMenuList";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      //  console.log(" response--pagelist", response)
      if (response != '') {
        this.SelectPageList = response.menuList;
        this.menuList = response.menuList;
        this.logSelectedCheckboxIds();
        console.log('this.selectedPageIds with customer New only', this.selectedPageIds);


      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  LicenseOverDue() {


    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/getOverdueOwingAmount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "soa/getOverdueOwingAmount";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      //  console.log(" response--pagelist", response)
      if (response != '') {
        this.overdueResponse = response;
        this.overduePaymentsBillerWise = response.overduePayments;
        console.log("this.overdueResponse", this.overdueResponse)
        if (Array.isArray(this.overdueResponse)) {
          console.log('overdueResponse is an array:', this.overdueResponse);
        } else {
          console.log('overdueResponse is not an array');
        }

      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  revenueAmountCountOverDue() {
    $('#overduePaymentFormId').modal('hide');
    this.spinner.show();
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/getRevenueData";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "soa/getRevenueData";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      //  console.log(" response--pagelist", response)
      if (response != '') {

        $('#getRevenueDataListFormId').modal('show');
        this.getRevenueDataList = response.data;


      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  overduePayments(billerID: any, name: any) {
    this.isMenuVisible = false;
    if (name === 'license') {
      $('#overduePaymentFormId').modal('show');
      this.LicenseOverDue();
    } else if (name === 'revenue_amount_count') {
      $('#overduePaymentFormId').modal('hide');

      this.revenueAmountCountOverDue();

    } else {

      this.spinner.show();

      let api_req: any = new Object();
      let api_page_req: any = new Object();
      api_req.moduleType = "soa";
      api_req.api_url = "soa/overduePaymentsBillerWise";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_page_req.action = "overduePaymentsBillerWise";
      api_page_req.user_id = this.user_ids;
      api_page_req.billerId = billerID;
      api_page_req.customer_id = "";
      api_page_req.from_dt = "";
      api_page_req.to_dt = "";

      api_req.element_data = api_page_req;

      this.serverService.sendServer(api_req).subscribe((response: any) => {

        this.spinner.hide();
        if (response != '') {
          this.spinner.hide();
          this.multipleBillIDPaymentP = [];
          this.overduePaymentsBillerWise = '';
          this.overduePaymentsBillerWise = [];
          this.selectedBillIds_overdue = {}
          this.overduePaymentsBillerWise = response[0].overduePayments;
          this.colorCodes = response.colorCodes;

          // if (Array.isArray(this.overdueResponse)) {
          //   console.log('overdueResponse is an array:', this.overdueResponse);
          // } else {
          //   console.log('overdueResponse is not an array');
          // }


          // this.getCustomers_Search();
          this.searchCustomerData_OS({});
          this.overdueResponse = '';
          this.overdueResponse = response;
          this.billerNameDisplay = response[0].billerName;
          this.billerIDDisplay = response[0].billerId;
          $('#overduePaymentFormId').modal('hide');
          $('#overduePaymentFormId').modal('show');

          if (Array.isArray(this.overduePaymentsBillerWise)) {
            console.log('this.overduePaymentsBillerWise is an array');
          } else {
            this.spinner.hide();
            console.log('this.overduePaymentsBillerWise is not an array');
          }

        } else {
          this.spinner.hide();
          Swal.close();
          iziToast.warning({
            message: "Response Failed",
            position: 'topRight'
          });

        }

      }),
        (error: any) => {
          // console.log("error",error)

          iziToast.error({
            message: "Sorry, some server issue occur. Please contact admin",
            position: 'topRight'
          });

        };

    }

  }
  multipleMailPostalInvoice() {
    console.log("this.selectedBillIds", this.selectedBillIds)
    if (this.selectedBillIds.length === 0) {
      iziToast.error({
        message: "Select atleast 1",
        position: 'topRight'
      });
      return false;
    } else {
      this.spinner.show();
      let api_req: any = new Object();
      let api_page_req: any = new Object();
      api_req.moduleType = "invoice";
      api_req.api_url = "multipleMailPostalInvoice";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_page_req.action = "multipleMailPostalInvoice";
      api_page_req.user_id = this.user_ids;
      api_page_req.with_logo = 'yes';
      api_page_req.billId = this.selectedBillIds;
      api_page_req.email_state = 'yes';

      api_req.element_data = api_page_req;

      this.serverService.sendServer(api_req).subscribe((response: any) => {
        this.spinner.hide();
        if (response.status == true) {
          this.spinner.hide();
          $('#sendtoPostFormId').modal('hide');
          iziToast.success({
            message: "Mail Sent Successfully",
            position: 'topRight'
          });
          this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoice').subscribe((data: any) => {

            if (data != '') {
              this.postalInvoiceDetails = data;
            }
          });
          this.http.get<any>('https://erp1.cal4care.com/api/sendPostalInvoiceCount').subscribe((data: any) => {

            if (data != '') {
              this.postalInvoiceCount = data.count;
            }
            //  console.log("this.postalInvoiceDetails", this.postalInvoiceDetails)
          });
          $('#sendtoPostFormId').modal('show');

        } else {
          this.spinner.hide();
          iziToast.error({
            message: "Mail Sent Failed",
            position: 'topRight'
          });

        }
      }),
        (error: any) => {
          // console.log("error",error)
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, some server issue occur. Please contact admin",
            position: 'topRight'
          });

        };
    }

  }
  multiPrintPostalWithLogo() {
    if (this.selectedBillIds.length === 0) {
      iziToast.error({
        message: "Select atleast 1",
        position: 'topRight'
      });
      return false;
    } else {
      var url = "https://erp1.cal4care.com/api/multiPrintPostal?billId=" + this.selectedBillIds + "&with_logo=yes";
      window.open(url, '_blank');
    }

  }
  multiPrintPostalWithoutLogo() {

    if (this.selectedBillIds.length === 0) {
      iziToast.error({
        message: "Select atleast 1",
        position: 'topRight'
      });
      return false;
    } else {
      var url = "https://erp1.cal4care.com/api/multiPrintPostal?billId=" + this.selectedBillIds + "&with_logo=no";
      window.open(url, '_blank');
    }
  }
  postalinv_sendPDF(billerID: any) {
    var url = "https://erp1.cal4care.com/api/postalPrint?billId=" + billerID;
    window.open(url, '_blank');
  }
  postalinvwithoutLogo_sendPDF(billerID: any) {
    var url = "https://erp1.cal4care.com/api/postalPrintWithoutLogo?billId=" + billerID;
    window.open(url, '_blank');
  }
  demandLetterPDF(billerID: any, customerID: any) {
   // var url = "https://laravelapi.erp1.cal4care.com/api/soa/generatePDF?billerId=" + billerID + "&customerId=" + customerID;
    var url = "https://erp1.cal4care.com/api/soa/generatePDF?billerId=" + billerID + "&customerId=" + customerID;
    window.open(url, '_blank');
  }
  ConsolidatePDF(billId: any, customerID: any) {

     var url = "https://erp1.cal4care.com/api/soa/generateStatement?billerId=" + billId + "&customerId=" + customerID;
    //  var url = "https://laravelapi.erp1.cal4care.com/api/soa/generateStatement?billerId=" + billId + "&customerId=" + customerID;

    window.open(url, '_blank');
    console.log("url", url)
  }

  landscapePDF(billId: any) {

    var url = "https://erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
   //  var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }
  overduePaymentLink(billId: any, customerID: any) {
    this.clickFlag = !this.clickFlag;
    this.overdue_PaymentURL_result = '';
    this.overdue_selectedCustomerId = customerID;
    let api_req: any = new Object();
    let api_quickMail_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "soa/getPaymentLink";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quickMail_req.action = "getPaymentLink";
    api_quickMail_req.user_id = this.user_ids;
    api_quickMail_req.customerId = customerID;
    api_quickMail_req.billerId = billId;
    api_req.element_data = api_quickMail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.overdue_PaymentURL_result = response.payment_url;
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  customerQuickMail() {
    let api_req: any = new Object();
    let api_quickMail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_quick_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quickMail_req.action = "customer_quick_mail";
    api_quickMail_req.user_id = this.user_ids;
    api_quickMail_req.customerId = this.PG_customerId;
    api_req.element_data = api_quickMail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  clearOverdue() {
    this.OS_search_CustID = '';
    this.OS_search_CustName = '';
    this.overdueSearchForm.controls['OS_customer'].reset();
    this.multipleBillIDPaymentP = [];
    this.searchCustomerData_OS({});

  }
  searchCustomer_selectDropdownData_OS(item: any) {
    this.OS_searchResult = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)
    this.OS_search_CustID = item.customerId;
    this.OS_search_CustName = item.customerName;


    // do something with selected item
  }
  searchCustomerData_OS(data: any) {

    if (data.length > 3) {
      this.spinner.show();
      this.OS_searchResult = data
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "soa";
      api_req.api_url = "soa/getCustomers";
      // api_req.api_url = "customer/cal/customer_name_search";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "getCustomers";
      api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
      api_Search_req.billerId = this.billerIDDisplay;
      api_Search_req.customerName = data;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        this.spinner.hide();
        if (response != '') {
          this.spinner.hide();
          this.OS_searchResult = response.customer_names;
          console.log(" this.OS_searchResult", this.OS_searchResult)
        } else {
          Swal.close();
          this.spinner.hide();
          iziToast.warning({
            message: "Response Failed",
            position: 'topRight'
          });

        }

      }),
        (error: any) => {

          iziToast.error({
            message: "Sorry, some server issue occur. Please contact admin",
            position: 'topRight'
          });
          console.log("final error", error);
        };
    }
  }
  clearSelection_OS(event: any) {
    this.clearOverdue();

  }
  onFocusedCustomer_OS(event: any) {

  }
  handle_overdue_CustomerChange(event: any) {
    this.overdue_CustomerIDSearch = event.target.value;
  }
  clearGlobalCustomerName() {

    this.GlobalSearch.controls['GS_CustomerName'].reset();

  }
  overdueSearch() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_quickMail_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/overduePaymentsBillerWise";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quickMail_req.action = "overduePaymentsBillerWise";
    api_quickMail_req.user_id = this.user_ids;
    // api_quickMail_req.custId = this.overdue_CustomerIDSearch;
    api_quickMail_req.custId = this.OS_search_CustID;

    api_quickMail_req.billerId = this.billerIDDisplay;
    api_quickMail_req.from_date = this.overdueSearchForm.value.OS_fromDate;
    api_quickMail_req.to_date = this.overdueSearchForm.value.OS_toDate;
    api_req.element_data = api_quickMail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {

        this.spinner.hide();
        this.overdueResponse = '';
        this.selectedBillIds_overdue = {};
        this.overdueResponse = response;
        this.overduePaymentsBillerWise = '';
        this.overduePaymentsBillerWise = response.overduePayments;

      } else {
        Swal.close();
        this.spinner.hide();
        iziToast.warning({
          message: "Search Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
      };
  }
  approveResellerRecurring() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "recurring/resellerRecuringApproval";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "recurring/resellerRecuringApproval";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.resellerCommId = this.arrayRecurringReseller;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.spinner.hide();
        this.arrayRecurringReseller = [];
        this.getResellerRecuringApprovalList();
        Swal.close();
        iziToast.success({
          message: "Approved",
          position: 'topRight'
        });
      } else {
        Swal.close();
        this.spinner.hide();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
      };

  }
  searchCustomerData(data: any) {
    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getCustomerName";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.searchResult = response.customerName;
        // console.log(" this.searchResult", this.searchResult)
        this.onFocusedCustomer({});
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };
  }

  inpChanged_CodeData(data: any) {

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getCustomerCode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getCustomerCode";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("vignesh-customer code_status response", response);

      this.searchResult_code = response.customerCode;
      // console.log("vignesh-advanced search result", this.searchResult_code);

    });
  }

  onFocused_CustomerCode(e: any) {
    // do something when input is focused
  }

  selected_CustomerCode(item: any) {
    this.PG_CustomerCode = item.customerCode;
    this.PG_customerId = item.customerId;
    // console.log(" this.PG_CustomerCode-code", this.PG_CustomerCode)
    // console.log(item)
  }

  inpChanged_DIDNumber(data: any) {

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getDidNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getDidNumber";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      //  console.log("vignesh-customer code_status response", response);

      this.searchResult_DIDNumber = response.did_numbers;
      // console.log("vignesh-advanced search result", this.searchResult_DIDNumber);
      this.onout_DIDNumber();
    });
  }

  onFocused_DIDNumber(e: any) {
    // do something when input is focused
    this.onout_DIDNumber();
  }

  selected_DIDNumber(item: any) {
    // console.log("DID Number,item", item);
    this.PG_DIDNumber = item.did_numbers;
    // console.log("this.PG_DIDNumber", this.PG_DIDNumber);
    // console.log(item)
    this.onout_DIDNumber();

  }

  inpChanged_LicenseNumber(data: any) {

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getLicenseNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getLicenseNumber";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("vignesh-customer code_status response", response);

      this.searchResult_LicenseNumber = response.license_key;
      // console.log("vignesh-advanced search result", this.searchResult_LicenseNumber);
      this.onout_LicenseNumber();

    });
  }

  onFocused_LicenseNumber(e: any) {
    // do something when input is focused
    this.onout_LicenseNumber();
  }
  onout_LicenseNumber() {

    let api_req: any = new Object();
    let api_LicenCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_license_number_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenCode_req.action = "get_license_number_customer";
    api_LicenCode_req.user_id = this.user_ids;
    api_LicenCode_req.license_number = this.PG_LicenseNum;
    api_req.element_data = api_LicenCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.PG_customerId = response.customer_id;
      this.PG_customerName = response.customerName;
      // console.log(" this.PG_customerName-license number", this.PG_customerName);
      this.PG_LicenseKey = response.license_key;

    });
  }
  onout_DIDNumber() {
    // console.log("DIDnumber check ip", this.PG_DIDNumber)
    let api_req: any = new Object();
    let api_DIDCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_did_number_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_DIDCode_req.action = "get_did_number_customer";
    api_DIDCode_req.user_id = this.user_ids;
    api_DIDCode_req.did_number = this.PG_DIDNumber;
    api_req.element_data = api_DIDCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.PG_customerId = response.customer_id;
      this.PG_customerName = response.customerName;
      // console.log(" this.PG_customerName-DID number", this.PG_customerName);
      this.PG_DIDNumbers = response.did_numbers;

    });
  }


  selected_LicenseNumber(item: any) {
    this.PG_LicenseNum = item;
    // console.log(item)
    this.onout_LicenseNumber();

  }

  EditCHK(i: any, k: any) {

  }
  handle_convertValue(event: any) {
    this.convetValue = event.target.value;
    // if(event.target.value.length>2){
    //   this.currencyConvert();

    // }
  }
  handle_currencyFrom(event: any) {
    this.convetcurrencyFrom = event.target.value;
  }


  handle_currencyTo(event: any) {
    this.convetcurrencyTo = event.target.value;
  }
  clearCurrencyConvert() {
    this.currencyConvertorForm.reset();
    this.convetcurrencyFrom = '';
    this.convetcurrencyTo = '';
    this.convetValue = '';


  }
  currencyConvert() {
    if (this.convetcurrencyFrom && this.convetcurrencyTo && this.currencyConvertorForm.value.convertValue.length > 3) {
      this.spinner.show();
    }
    // this.spinner.show();

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getCurrencyConvert";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "getCurrencyConvert";
    // api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.currencyConvertorForm.value.CurrencyFrom == null) {
      api_year.currency_from_val = this.currencyConvertorForm.value.CurrencyFrom;
    } else {
      api_year.currency_from_val = this.convetcurrencyFrom;
    }

    if (this.currencyConvertorForm.value.CurrencyTo == null) {
      api_year.currency_to_val = this.currencyConvertorForm.value.CurrencyTo;
    } else {
      api_year.currency_to_val = this.convetcurrencyTo;
    }

    if (this.currencyConvertorForm.value.convertValue == null) {
      api_year.convert_val = this.currencyConvertorForm.value.convertValue;
    } else {
      api_year.convertValue = this.convetValue;
    }

    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();


        this.currencyConvertorForm.patchValue({
          'outputValue': response.convert_data.convert_vals,
        })

      } else {
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };


  }
  check(event: any, item: any, custId: any) {
    console.log("event", event);
    console.log("item", item);
    console.log("custId", custId);
  }
  // toggleSelection_overdue1(event: any, billId: number, balAmount: string, customerId: number): void {
  //   console.log("toggle selection");
  //   console.log("billId",billId);
  //   console.log("balAmount",balAmount);
  //   console.log("customerId",customerId);

  // }
  toggleSelection_overdue(event: any, billId: number, balAmount: string, customerId: number): void {
    //  console.log("toggle selection");
    //  console.log("billId",billId);
    //  console.log("balAmount",balAmount);
    //  console.log("customerId",customerId);



    const checked = event.target.checked;
    const balance = parseFloat(balAmount);

    // Ensure the Set exists for the customer
    if (!this.selectedBillIds_overdue[customerId]) {
      this.selectedBillIds_overdue[customerId] = new Set<number>();
    }

    // Ensure the balance map exists for the customer
    if (!this.billBalances_overdue) {
      this.billBalances_overdue = {};
    }

    // Check if any other customer's checkboxes are already selected
    let otherCustomerSelected = false;
    for (const custId in this.selectedBillIds_overdue) {
      if (parseInt(custId) !== customerId && this.selectedBillIds_overdue[custId].size > 0) {
        otherCustomerSelected = true;
        break;
      }
    }

    // If another customer's checkboxes are selected, alert and return
    if (otherCustomerSelected) {
      // alert("Don't select multiple customer");
      iziToast.warning({
        message: "Don't select multiple customer",
        position: 'topRight'
      });
      event.target.checked = false; // Uncheck the checkbox
      return;
    }

    // Proceed with selecting/deselecting the checkbox
    if (checked) {
      this.selectedBillIds_overdue[customerId].add(billId);
      this.billBalances_overdue[billId] = balance;
      this.balamt += balance;
    } else {
      if (this.selectedBillIds_overdue[customerId].has(billId)) {
        this.selectedBillIds_overdue[customerId].delete(billId);
        delete this.billBalances_overdue[billId];
        this.balamt -= balance;
      }
    }

    console.log("checkbox-overdue", this.selectedBillIds_overdue);
    console.log("checkbox-overdue-balamt", this.balamt);
    console.log("selected billIds for customer", customerId, Array.from(this.selectedBillIds_overdue[customerId]));

    this.multipleBillIDPaymentP = Array.from(this.selectedBillIds_overdue[customerId]);
    this.multipleBillIDPaymentcust = customerId;

    this.multipleBalAmount = this.multipleBillIDPaymentP.map(billId => this.billBalances_overdue[billId]);

    console.log("this.multipleBillIDPaymentP", this.multipleBillIDPaymentP);
    console.log("this.multipleBillIDPaymentcust", this.multipleBillIDPaymentcust);
    console.log("this.multipleBalAmount", this.multipleBalAmount);

    console.log("Selected Bills for Customer:", this.selectedBillIds_overdue[customerId]);
    console.log("this.multipleBillIDPaymentP", this.multipleBillIDPaymentP);
    console.log("Bill Balances:", this.billBalances_overdue);
  }



  isSelected_overdue(billId: number, customerId: number): boolean {
    // console.log("billid",billId);
    // console.log("customerId",customerId);

    // console.log("selectedBillIds_overdue",this.selectedBillIds_overdue)
    return this.selectedBillIds_overdue[customerId]?.has(billId) || false;
  }
  // calculateSelectedTotals(customerId: number): number {

  //   let total = 0;
  //   if (this.selectedBillIds_overdue[customerId]) {
  //     this.selectedBillIds_overdue[customerId].forEach(billId => {
  //       const bill = this.overduePaymentsBillerWise
  //         .find((cust: { title: { cus_id: number; }; }) => cust.title.cus_id === customerId)
  //         ?.data.find((item: { billId: number; }) => item.billId === billId);
  //       if (bill) {
  //         total += parseFloat(bill.balanceAmount);
  //       }
  //     });
  //   }

  //   return total;
  // }
  calculateSelectedTotals(customerId: number): number {
    let total = 0;

    // Ensure this.selectedBillIds_overdue and billBalances_overdue are defined
    const selectedBills = this.selectedBillIds_overdue[customerId];
    if (!selectedBills) {
      // console.error(`No bills selected for customer ${customerId}`);
      return 0;
    }

    // Iterate through selected bills and sum their balances
    selectedBills.forEach(billId => {
      const balance = this.billBalances_overdue[billId];
      if (balance === undefined) {
        console.error(`Balance not found for bill ID ${billId}`);
      } else {
        total += balance;

      }
    });

    return parseFloat(total.toFixed(2));

  }



  getPaymentFollowers(billid: any) {
    this.spinner.show();
    this.PaymentFoll_billid = billid;
    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/getPaymentFollowers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getPaymentFollowers";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.billId = this.PaymentFoll_billid;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      // console.log(" response", response)
      if (response != '') {
        this.spinner.hide();
        this.paymentFollowers_List = response.data.followers;
        console.log(" this.paymentFollowers_List", this.paymentFollowers_List);
        let idsArray = response.data.paymentFollowerIds.filter((id: string) => id !== '').map(Number);
        this.CheckBox_DynamicArrayList_invoiceShowPermission = idsArray;
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_invoiceShowPermission);

      } else {
        this.spinner.hide();
        Swal.close();
        iziToast.warning({
          message: "Payment Followers Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  paymentFollowersUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/updatePaymentFollowers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "updatePaymentFollowers";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.billId = this.PaymentFoll_billid;
    api_comCode_req.follower_user_id = this.CheckBox_DynamicArrayList_invoiceShowPermission;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      // console.log(" response", response)
      if (response != '') {
        this.spinner.hide();
        $('#paymentFollowersId').modal('hide');
        Swal.close();
        iziToast.success({
          message: "Payment Followers Updated Successfully",
          position: 'topRight'
        });

      } else {
        this.spinner.hide();
        Swal.close();
        iziToast.warning({
          message: "Payment Followers Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  paymentFollowersCheck(data: any, event: any) {
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_invoiceShow_Value = data;
    this.Checkbox_value_invoiceShow = event.target.checked;
    console.log(this.Checkbox_value_invoiceShow)
    if (this.Checkbox_value_invoiceShow) {

      this.CheckBox_DynamicArrayList_invoiceShowPermission.push(Number(data));
      this.CheckBox_DynamicArrayList_invoiceShowPermission.join(',');
      this.CheckBox_DynamicArrayList_invoiceShowPermission.sort();
      console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_invoiceShowPermission.indexOf(data);
      console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission)
    }


  }
  clearPayProcess() {

  }

  processPaymentEdit(id: any) {
    this.spinner.show();
    this.billID_processPayment = id;
    let api_req: any = new Object();
    let api_processpaymentEdit: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "invoice/invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentEdit.action = "invoice_payment_details";

    api_processpaymentEdit.billId = id;
    api_processpaymentEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_processpaymentEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.invoiceDetails_payment = response.invoice_details;
        this.paymentType_payment = response.payment_type;
        this.paymentDetails_payment = response.payment_details;
        this.paymentDetails_paymentLength = response.payment_details.length;



        if (response.payment_details != '') {

          this.paymentNotes = response.payment_details[0].notes;
          this.PP_PaymentProcessID = response.payment_details[0].processId;
          this.owingAmt = response.owing_amount;

        }



        const date = new Date();
        const transformDate1 = this.datePipe.transform(date, 'yyyy-MM-dd');
        console.log("current date time", transformDate1)
        this.processPaymentForm.patchValue({
          'date': transformDate1,
          'invoiceID': response.invoice_details[0].invoice_no,
          'toal': response.invoice_details[0].netPayment,
          'biller': response.invoice_details[0].billerName,
          'paid': response.paid_amount,
          'customer': response.invoice_details[0].customerName,
          'owing': response.owing_amount,
          'amount': response.owing_amount,


        });

        this.spinner.hide();

        // this.getInvoice1({});
      } else {

        $('#processPaymentId_inv').modal("hide");

        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }

    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  processPaymentEdit_multiple(id: any) {
    //alert(this.multipleBillIDPaymentcust)

    this.spinner.show();
    // this.multipleprocessPaymentForm.reset();
    if (this.multipleBillIDPaymentcust == '' || this.multipleBillIDPaymentcust == undefined) {
      // alert("Don't Choose From Multiple Customer");
      iziToast.warning({
        message: "Customer atleast one customer",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else if (this.multipleBillIDPaymentcust != id) {
      iziToast.warning({

        message: "Don't Choose From Multiple Customer",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {

    }
    let api_req: any = new Object();
    let api_processpaymentEdit: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentEdit.action = "invoice_payment_details";

    api_processpaymentEdit.billId = this.multipleBillIDPaymentP;
    api_processpaymentEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_processpaymentEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $('#overdue_processPaymentIdMultiple').modal("show");
      this.spinner.hide();
      if (response != '') {
        this.invoiceDetails_payment = response.invoice_details;
        this.invoiceDetails_payment_m = response.invoice_details;
        this.paymentType_payment_m = response.payment_type;
        this.paymentDetails_payment_m = response.payment_details;
        this.paymentDetails_paymentLength_m = response.payment_details.length;



        if (response.payment_details != '') {

          this.paymentNotes = response.payment_details[0].notes;
          // this.PP_PaymentProcessID = response.payment_details[0].processId;
          // this.owingAmt = response.owing_amount;

        }

        const date = new Date();
        const transformDate1 = this.datePipe.transform(date, 'yyyy-MM-dd');
        console.log("current date time", transformDate1)
        this.multipleprocessPaymentForm.patchValue({
          'm_date': transformDate1,
          'm_invoiceID': response.invoice_details[0].cus_invoice_no,
          'm_customer': response.invoice_details[0].customerName,
          'm_biller': response.invoice_details[0].billerName,
          'm_paid': response.paidAmount,
          'm_toal': response.net_amount,
          'm_owing': response.owing_amount,
          'm_amount': response.owing_amount,


        });

        this.spinner.hide();

        // this.getInvoice1({});
      } else {

        $('#overdue_processPaymentIdMultiple').modal("hide");

        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }

    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  changeCreditNote(event: any) {
    this.changeCreditNoteValue = event.target.value;
    this.creditShowFlag = true;

    this.spinner.show();
    let api_req: any = new Object();
    let credit_changeApi: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_credit_note_amount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    credit_changeApi.action = "get_credit_note_amount";
    credit_changeApi.user_id = localStorage.getItem('erp_c4c_user_id');
    credit_changeApi.credit_note_id = this.changeCreditNoteValue;
    api_req.element_data = credit_changeApi;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        var res = response;
        var ow = $('#Owing').val();
        if (parseFloat(ow) < parseFloat(res)) {
          // console.log("this.owingAmt",ow);
          // console.log("res",res);
          // console.log("if this.owingAmt < res=amount value=this.owingAmt",ow)

          this.processPaymentForm.patchValue({

            'amount': ow,

          });

          // $('#amount').val(this.owingAmt);
        } else {
          // console.log("this.owingAmt",ow);
          // console.log("res",res);
          // console.log("if this.owingAmt >= res=amount value=res",res)
          this.processPaymentForm.patchValue({

            'amount': $('#Owing').val(),


          });
          // $('#amount').val(res);
        }
        this.spinner.hide();




      } else {

        this.spinner.hide();



      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);

      };
  }
  paymentProcessEditShow(i: any) {

    this.spinner.show();
    let api_req: any = new Object();
    let api_payprocessEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_edit_payment_process";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_payprocessEdit.action = "get_edit_payment_process";
    api_payprocessEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_payprocessEdit.processId = i;

    api_req.element_data = api_payprocessEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        // $('#note').val(response.payment_edit[0].notes);
        // $('#Paid').val(response.payment_edit[0].paidAmount);
        // $('#paytype').val(response.payment_edit[0].paymentMode);
        // $('#dateee').val(response.payment_edit[0].processDate_show);

        this.processPaymentForm.patchValue({
          'date': response.payment_edit[0].processDate_show,
          'amount': response.payment_edit[0].paidAmount,
          'paymenttype': response.payment_edit[0].paymentMode,
          'note': response.payment_edit[0].notes,
        });

      } else {
        this.spinner.hide();

        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };

  }
  changePrepaidNote(event: any) {
    this.changePrepaidNoteValue = event.target.value;
    this.prepaidShowFlag = true;
    this.spinner.show();
    let api_req: any = new Object();
    let prepaid_changeApi: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_prepaid_note_amount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    prepaid_changeApi.action = "get_prepaid_note_amount";
    prepaid_changeApi.user_id = localStorage.getItem('erp_c4c_user_id');
    prepaid_changeApi.prepaid_id = this.changePrepaidNoteValue;
    api_req.element_data = prepaid_changeApi;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        var res = response;
        var ow = $('#Owing').val();
        if (parseFloat(ow) < parseFloat(res)) {




          this.processPaymentForm.patchValue({

            'amount': ow,


          });
          // $('#amount').val(this.owingAmt);
        } else {
          // console.log("this.owingAmt",ow);
          // console.log("res",res);
          // console.log("if this.owingAmt >= res=amount value=res",res)
          this.processPaymentForm.patchValue({

            'amount': res,


          });
          // $('#amount').val(res);
        }
        this.spinner.hide();

      } else {

        this.spinner.hide();
      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);

      };
  }
  PP_PaymentMethodDropdown() {

    let api_req: any = new Object();
    let api_pay_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "invoice/get_credit_note_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_pay_req.action = "get_credit_note_details";
    api_pay_req.user_id = this.user_ids;
    api_pay_req.billId = this.billID_processPayment;

    api_pay_req.paytype_id = this.PP_paymentMethod;
    api_req.element_data = api_pay_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {



      if (response.status == true) {

        this.creditResponse = response.credit_note;
        if (response.credit_note.length > 0) {
          this.credit_note_id = response.credit_note[0].credit_note_id;
          this.prepaid_id = response.credit_note[0].prepaid_id;
        }



        console.log("this.creditResponse", this.creditResponse)
        this.spinner.hide();
      }
      else {
        var bal_amt = $('#Owing').val()
        var vh = $('#amount').val();
        // alert(vh)
        var ff = this.processPaymentForm.value.amount;
        // alert(ff)
        // this.processPaymentForm.patchValue({
        //   'amount': $('#Owing').val(),

        // })
        this.processPaymentForm.patchValue({
          'amount': this.processPaymentForm.value.amount,

        })


      }
    });




  }
  processPaymentUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_processpaymentUpdate: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_payment_process";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentUpdate.action = "update_payment_process";
    api_processpaymentUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_processpaymentUpdate.bill_payment_process_id = this.billID_processPayment;
    if (this.processPaymentForm.value.paymenttype === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      return false;
    } else {
      api_processpaymentUpdate.payment_method = this.processPaymentForm.value.paymenttype;
    }
    api_processpaymentUpdate.paymentDate = this.processPaymentForm.value.date;



    if (this.processPaymentForm.value.amount === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Amount Value missing",
        position: 'topRight'
      });

      return false;
    } else {
      api_processpaymentUpdate.amount = this.processPaymentForm.value.amount;
    }

    api_processpaymentUpdate.total_bal_amount = 0;

    api_processpaymentUpdate.balAmt = this.processPaymentForm.value.owing;
    api_processpaymentUpdate.note = this.processPaymentForm.value.note;
    api_processpaymentUpdate.prepaid_id = this.prepaid_id;
    api_processpaymentUpdate.credit_note_id = this.credit_note_id;

    api_req.element_data = api_processpaymentUpdate;

    $("#overdue_processPaymentId").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#overdue_processPaymentId").removeAttr("disabled");
      if (response.status == true) {

        this.spinner.hide();
        $('#overdue_processPaymentId').modal("hide");
        $('#amount').val('');
        this.processPaymentForm.reset();
        // this.getInvoice1({});
        iziToast.success({
          message: "Payment Process Updated Successfully",
          position: 'topRight'

        });
        // this.getInvoice1({});

      } else {
        this.spinner.hide();
        $('#overdue_processPaymentId').modal("hide");
        iziToast.warning({
          message: "Payment Process not displayed. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);

      };
  }
  multipleprocessPaymentUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_processpaymentUpdate: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/update_payment_process";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentUpdate.action = "update_payment_process";
    api_processpaymentUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_processpaymentUpdate.bill_payment_process_id = this.multipleBillIDPaymentP;;
    if (this.multipleprocessPaymentForm.value.m_paymenttype === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      return false;
    } else {
      api_processpaymentUpdate.payment_method = this.multipleprocessPaymentForm.value.m_paymenttype;
    }
    api_processpaymentUpdate.paymentDate = this.multipleprocessPaymentForm.value.m_date;



    if (this.multipleBalAmount === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Amount Value missing",
        position: 'topRight'
      });

      return false;
    } else {
      api_processpaymentUpdate.amount = this.multipleBalAmount;
    }

    api_processpaymentUpdate.total_bal_amount = 0;

    api_processpaymentUpdate.balAmt = this.multipleprocessPaymentForm.value.m_owing;
    api_processpaymentUpdate.note = this.multipleprocessPaymentForm.value.m_note;
    // api_processpaymentUpdate.prepaid_id = this.prepaid_id;
    // api_processpaymentUpdate.credit_note_id = this.credit_note_id;

    api_req.element_data = api_processpaymentUpdate;

    $("#overdue_processPaymentIdMultiple").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#overdue_processPaymentIdMultiple").removeAttr("disabled");
      if (response.status == true) {

        this.spinner.hide();
        $('#overdue_processPaymentIdMultiple').modal("hide");
        $('#amount').val('');
        this.processPaymentForm.reset();
        // this.getInvoice1({});
        iziToast.success({
          message: "Payment Process Updated Successfully",
          position: 'topRight'

        });
        // this.getInvoice1({});

      } else {
        this.spinner.hide();
        $('#overdue_processPaymentIdMultiple').modal("hide");
        iziToast.warning({
          message: "Payment Process not displayed. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);

      };
  }
  getEmailDetails(billid: any, billerId: any) {
   

    this.email_TemplateSelection = false;
    $('#temp').val('');

    $('input:checkbox').removeAttr('checked');
    this.emailForm.reset();
    this.spinner.show();
    this.Email_BillId_overdue = billid;
    this.Email_BillerId_overdue = billerId;
    console.log("this.Email_BillId_overdue", this.Email_BillId_overdue)
    let api_req: any = new Object();
    let api_emailDetails: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/send_invoice_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_emailDetails.action = "send_invoice_details";
    console.log("billid-09",billid)
    if (billid != undefined) {
      api_emailDetails.billId = billid;
    } else {
      api_emailDetails.billId = '';
    }


    api_emailDetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_emailDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.email_fromList = response.email_from_arr;
        this.email_groupMailList = response.group_mail;
        this.email_crmTemplateList = response.crm_template_list;
        this.email_cc_userList = response.cc_user;
        this.messageContent = response.invoice_content;
        this.SelectType_finance = response.finance_email;
        this.SelectType_company = response.company_email;
        this.types = response.type;
        this.setDefaultRadio();
        this.mailContent = tinymce.get('tinyID_overdue_in').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({

          'tinyID_overdue_in': this.mailContent,
          'Subject_Content': response.subject,
          'cbk_paymentLink': response.payment_link,
          'cbk_demandLetterPDF': response.demend_letter_pdf,
        })
        if (this.Select_To_Type_radiobox_Value == 'finance') {
          this.emailForm.patchValue({
            'email_to': response.finance_email,
            'tinyID_overdue_in': this.mailContent,
          })
        }
        else {
          this.emailForm.patchValue({
            'email_to': response.company_email,
            'tinyID_overdue_in': this.mailContent,
          })
        }



        //this.getInvoice1({});
      } else {

        $('#processPaymentId_inv').modal("hide");
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  setDefaultRadio() {
    const defaultType = this.types.find((type: { check_status: string; }) => type.check_status === 'Yes');
    if (defaultType) {
      this.emailForm.patchValue({ radio_ApprovalBy: defaultType.type_id.toString() });
    }
  }
  SA_setDefaultRadio() {
    const SA_defaultType = this.SA_types.find((type: { check_status: string; }) => type.check_status === 'Yes');
    if (SA_defaultType) {
      this.selectAll_emailForm.patchValue({ SA_radio_ApprovalBy: SA_defaultType.type_id.toString() });
    }
  }
  EditCHK_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  SA_EditCHK_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.SA_groupSelect_emailCCId = data;
    this.SA_checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.SA_edit_array_emailCC_Checkbox.push(data);
      this.SA_edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.SA_edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.SA_edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.SA_edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.SA_edit_array_emailCC_Checkbox)

    }
  }
  templateContentEmailDropdown_single(event: any) {
   // alert("double")
    this.spinner.show();
    //alert("hi")
    this.quotation_Emailtemplate_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    console.log("this.multipleBillIDPaymentP", this.multipleBillIDPaymentP);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/get_email_invoice_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_email_invoice_template";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
  
    // api_quotationTemplateDropdown_req.billerId = this.Email_BillerId_overdue;
    // api_quotationTemplateDropdown_req.billId = this.Email_BillId_overdue;
    api_quotationTemplateDropdown_req.billerId = this.Email_BillerId_overdue;
    //api_quotationTemplateDropdown_req.billId = this.multipleBillIDPaymentP;
    api_quotationTemplateDropdown_req.billId =this.Email_BillId_overdue;
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content;
      this.mailContent = tinymce.get('tinyID_overdue_in').setContent("<p>" + this.messageContent + "</p>");
      $('#subject').val(response.crm_subject_name);
      $('#tinyID_overdue_in').val(this.mailContent);
      if (response != '') {
        this.spinner.hide();
        this.emailForm.patchValue({

          // 'Subject_Content': response.crm_subject_name,

          // 'tinyID1_inv': this.mailContent,

        });
      }
      else {
        this.spinner.hide();
        this.emailForm.patchValue({

          'email_template': '',

        });
      }
    });
  }
  SA_templateContentEmailDropdown(event: any) {
    this.spinner.show();
    // alert("single")
   //  alert("hi")
    this.SA_quotation_Emailtemplate_id = event.target.value;
    console.log("quotation dropdown ID check", this.SA_quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/get_email_invoice_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_email_invoice_template";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // if (this.multipleBillIDPaymentP.length === 0) {
    //   iziToast.warning({
    //     message: "Choose atleast one customer invoice",
    //     position: 'topRight'
    //   });
    //   this.spinner.hide();
    //   return false;
    // }
    if (this.multipleBillIDPaymentP.length === 0){
    console.log("check1")
      api_quotationTemplateDropdown_req.billerId = this.uniqueBillerIds;
      api_quotationTemplateDropdown_req.billId = this.billidArray;
    }else{
      console.log("check2")
      api_quotationTemplateDropdown_req.billerId = this.Email_BillerId_overdue;
      // api_quotationTemplateDropdown_req.billId = this.Email_BillId_overdue;
      api_quotationTemplateDropdown_req.billId = this.multipleBillIDPaymentP;
    }
    // api_quotationTemplateDropdown_req.billId = this.multipleBillIDPaymentP;
    api_quotationTemplateDropdown_req.template_id = this.SA_quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.SA_messageContent = response.crm_template_content;
      this.SA_mailContent = tinymce.get('tinyID_overdue_SA').setContent("<p>" + this.SA_messageContent + "</p>");

      /*----------------start------28/08/24----------------------------*/
      this.selectAll_emailForm.controls['SA_Subject_Content'].setValue(response.crm_subject_name || '');
      this.selectAll_emailForm.controls['SA_Subject_Content'].markAsDirty(); // Trigger validation
      this.selectAll_emailForm.controls['SA_Subject_Content'].updateValueAndValidity(); // Update validation status
      /*------------------end----28/08/24----------------------------*/

      $('#SA_Subject_Content').val(response.crm_subject_name);
      $('#tinyID_overdue_SA').val(this.SA_mailContent);
      if (response != '') {
        this.spinner.hide();
        this.selectAll_emailForm.patchValue({

          // 'Subject_Content': response.crm_subject_name,

          // 'tinyID1_inv': this.mailContent,

        });
      }
      else {
        this.spinner.hide();
        this.selectAll_emailForm.patchValue({

          'SA_email_template': '',

        });
      }
    });
  }

  sendMail_overdue() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.FromEmailValue = this.emailForm.value.email_From;

    //  this.emailTo = $('#emailto').val();
    this.emailTo_overdue = this.emailForm.value.email_to;
    // this.subjectValue = $('#subject').val();
    this.subjectValue_overdue = this.emailForm.value.Subject_Content;
    this.msg_id_overdue = tinymce.get('tinyID_overdue_in').getContent();
    console.log("msgid", this.msg_id_overdue)
    console.log("email to", this.emailTo_overdue)
    console.log("subject", this.subjectValue_overdue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "soa/paymentRemainderMail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "paymentRemainderMail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.ccEmailId = this.edit_array_emailCC_Checkbox;
    api_email_req.billId = this.Email_BillId_overdue;
    api_email_req.payment_link = this.cbk_paymentLink_value;
    api_email_req.demend_letter_pdf = this.cbk_demandLetterPDF_value;

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.emailForm.value.email_From === null || this.emailForm.value.email_From === '' || this.emailForm.value.email_From === 'undefined' || this.emailForm.value.email_From === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.toEmailId = this.emailTo_overdue;
    if (this.emailTo_overdue === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    // api_email_req.pdf_state = pdf_state;
    api_email_req.pdf_state = 0;
    api_email_req.subject = this.subjectValue_overdue;
    this.emailForm.value.Subject_Content

    if (this.emailForm.value.Subject_Content === null || this.emailForm.value.Subject_Content === '' || this.emailForm.value.Subject_Content === 'undefined' || this.emailForm.value.Subject_Content === undefined) {
      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      Swal.close();
      return false;
    }
    api_email_req.message = this.msg_id_overdue;
    if (this.msg_id_overdue === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }

    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

        $("#paymentReminderMailId").modal("hide");
        // this.getInvoice1({});

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#paymentReminderMailId").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        //  this.getInvoice1({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        // this.getInvoice1({});

      }
      Swal.close();
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  handle_SAcbkpaymentLink(event: any) {
    this.SA_cbkpaymentLink_value = event.target.checked;
  }
  handle_SAcbkDemandLetter(event: any) {
    this.SA_cbkDemandLetter_value = event.target.checked;
  }
  selectAll_getEmail(customerid: any, billerId: any, billId: any, list: any) {
   
    // console.log("customerid", customerid)
    // console.log("list data", list)
    // console.log("billid data", billId)
    // alert("email")

    if (this.multipleBillIDPaymentP.length === 0) {
      const customerId = customerid;
      this.mailCustomerID=customerid;
      this.billidArray = list
        .filter((list: { custId: any; }) => list.custId === customerId)
        .map((list: { billId: any; }) => list.billId);
        
        this.billeridArray = list
        .filter((list: { custId: any; }) => list.custId === customerId)
        .map((list: { billerId: any; }) => list.billerId);
        this.uniqueBillerIds = [...new Set(list.map((bill: { billerId: any; }) => bill.billerId))];


      // console.log(this.billidArray);
      
      // console.log(this.billeridArray);
      // console.log(this.uniqueBillerIds);

    }
    $('#payment_selectAllReminderMailId').modal('show');
    this.spinner.show();
    this.SA_Email_BillId_overdue = billId;
    this.SA_Email_BillerId_overdue = billerId;
    this.SA_Email_customerid_overdue = customerid;
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "soa/send_invoice_data";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "send_invoice_data";
    api_page_req.user_id = this.user_ids;
    if (this.multipleBillIDPaymentP.length === 0) {
      api_page_req.billId = this.billidArray;
    } else {
      api_page_req.billId = this.multipleBillIDPaymentP;
    }

    api_page_req.custId = customerid;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.SA_email_fromList = response.email_from_arr;
        this.SA_email_groupMailList = response.group_mail;
        this.SA_email_crmTemplateList = response.crm_template_list;
        this.SA_email_cc_userList = response.cc_user;
        this.SA_messageContent = response.invoice_content;
        this.SA_SelectType_finance = response.finance_email;
        this.SA_SelectType_company = response.company_email;
        this.SA_types = response.type;
        this.SA_setDefaultRadio();
        this.SA_mailContent = tinymce.get('tinyID_overdue_SA').setContent("<p>" + this.SA_messageContent + "</p>");
        this.selectAll_emailForm.patchValue({

          'tinyID_overdue_SA': this.mailContent,
          'SA_Subject_Content': response.subject,
          'SA_cbk_paymentLink': response.payment_link,
          'SA_cbk_demandLetterPDF': response.demend_letter_pdf,
        })
        if (this.Select_To_Type_radiobox_Value == 'finance') {
          this.selectAll_emailForm.patchValue({
            'SA_emailto': response.finance_email,
            'tinyID_overdue_SA': this.mailContent,
          })
        }
        else {
          this.spinner.hide();
          this.selectAll_emailForm.patchValue({
            'SA_emailto': response.company_email,
            'tinyID_overdue_SA': this.mailContent,
          })
        }
      } else {
        this.spinner.hide();
      }
    }),
      (error: any) => {
        this.spinner.hide();
        // console.log("error",error)

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
      };


  }
  SA_sendMail_overdue() {
   
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.SA_FromEmailValue = this.selectAll_emailForm.value.SA_email_From;

    //  this.emailTo = $('#emailto').val();
    this.SA_emailTo_overdue = this.selectAll_emailForm.value.SA_emailto;
    // this.subjectValue = $('#subject').val();
    this.SA_subjectValue_overdue = this.selectAll_emailForm.value.SA_Subject_Content;
    this.SA_msg_id_overdue = tinymce.get('tinyID_overdue_SA').getContent();
    console.log("msgid", this.msg_id_overdue)
    console.log("email to", this.emailTo_overdue)
    console.log("subject", this.subjectValue_overdue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "soa/paymentRemainderMailStatement";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "paymentRemainderMailStatement";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.ccEmailId = this.SA_edit_array_emailCC_Checkbox;
    // api_email_req.billId = this.SA_Email_BillId_overdue;
    // api_email_req.custId = this.SA_Email_BillId_overdue;
    // api_email_req.billerId = this.SA_Email_BillId_overdue;
    

    if (this.multipleBillIDPaymentP.length === 0) {
  
      api_email_req.billId = this.billidArray;
      api_email_req.billerId = this.uniqueBillerIds;
      api_email_req.custId = this.mailCustomerID;

    } else {

      api_email_req.billId = this.multipleBillIDPaymentP;
      api_email_req.billerId = this.SA_Email_BillerId_overdue;
      api_email_req.custId = this.SA_Email_customerid_overdue;
    }
    api_email_req.payment_link = this.SA_cbkpaymentLink_value;
    api_email_req.demend_letter_pdf = this.SA_cbkDemandLetter_value;

    api_email_req.fromEmailId = this.SA_FromEmailValue;
    if (this.selectAll_emailForm.value.SA_email_From === null || this.selectAll_emailForm.value.SA_email_From === '' || this.selectAll_emailForm.value.SA_email_From === 'undefined' || this.selectAll_emailForm.value.SA_email_From === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.toEmailId = this.SA_emailTo_overdue;
    if (this.SA_emailTo_overdue === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    // api_email_req.pdf_state = pdf_state;
    api_email_req.pdf_state = 0;
    api_email_req.subject = this.SA_subjectValue_overdue;


    if (this.selectAll_emailForm.value.SA_Subject_Content === null || this.selectAll_emailForm.value.SA_Subject_Content === '' || this.selectAll_emailForm.value.SA_Subject_Content === 'undefined' || this.selectAll_emailForm.value.SA_Subject_Content === undefined) {
      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      Swal.close();
      return false;
    }
    api_email_req.message = this.SA_msg_id_overdue;
    if (this.SA_msg_id_overdue === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }

    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

        $("#payment_selectAllReminderMailId").modal("hide");
        // this.getInvoice1({});

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#payment_selectAllReminderMailId").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        //  this.getInvoice1({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        // this.getInvoice1({});

      }
      Swal.close();
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  PIEmailClear() {

  }

  

  getRecurredList() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "recurring/getRecurredList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/getRecurredList";
    api_page_req.user_id = this.user_ids;

    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();

        this.getRecurredListValue = response.data;


      } else {
        this.spinner.hide();


      }
    }),
      (error: any) => {
        this.spinner.hide();
        // console.log("error",error)

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });

      };
  }

  getResellerRecuringApprovalList() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "recurring/getResellerRecuringApprovalList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/getResellerRecuringApprovalList";
    api_page_req.user_id = this.user_ids;

    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.ResellerRecuringApprovalList = response.data;


      } else {
        this.spinner.hide();

      }
    }),
      (error: any) => {
        // console.log("error",error)
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });

      };
  }


  getRecurringInvoice() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "recurring/recuringApprovalInvoiceList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/recuringApprovalInvoiceList";
    api_page_req.user_id = this.user_ids;

    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();


        this.combinedData = response.data.map((item: { title: any[]; dataList: any; }) => ({
          title: item.title[0],  // Assuming only one title per group
          invoices: item.dataList
        }));

      } else {
        this.spinner.hide();


      }
    }),
      (error: any) => {
        this.spinner.hide();
        // console.log("error",error)

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });

      };
  }

  onCheckboxChange(menuItem: any, event: any) {
    menuItem.checked = event.target.checked ? 'true' : 'false';
    this.logSelectedCheckboxIds();
  }

  selectAll_menuList(event: any) {
    const checked = event.target.checked;
    this.allSelected = checked;
    this.menuList.forEach(menuItem => menuItem.checked = checked ? 'true' : 'false');
    this.logSelectedCheckboxIds();
  }

  logSelectedCheckboxIds() {
    this.selectedPageIds = this.menuList
      .filter(menuItem => menuItem.checked === 'true')
      .map(menuItem => menuItem.pageId);
    // console.log('Selected Checkbox IDs:', this.selectedPageIds);
    this.selectedPageNames = this.menuList
      .filter(menuItem => menuItem.checked === 'true')
      .map(menuItem => menuItem.menu_name);
    // console.log('Selected Checkbox Names:', this.selectedPageNames);
  }

  // Toggle all checkboxes
  toggleAll_RecurringInvoice(event: any) {
    const checked = event.target.checked;
    this.combinedData.forEach(group => {
      group.invoices.forEach(invoice => {
        invoice.selected = checked;
      });
    });
    this.logOverallSelection_RecurringInvoice();
  }

  // Check if all checkboxes are selected
  isAllChecked_RecurringInvoice(): boolean {
    return this.combinedData.every(group =>
      group.invoices.every(invoice => invoice.selected)
    );
  }

  // Update Check All checkbox state based on individual checkboxes
  updateCheckAllState_RecurringInvoice() {
    const allChecked = this.isAllChecked_RecurringInvoice();
    const checkAllElement = document.getElementById('check-all-RI') as HTMLInputElement;
    if (checkAllElement) {
      checkAllElement.checked = allChecked;
    }
    this.logOverallSelection_RecurringInvoice();
  }

  // Log individual checkbox selection/deselection
  logIndividualSelection_RecurringInvoice(item: any) {
    if (item.selected) {
      console.log(`Selected Bill ID: ${item.billId}`);
    } else {
      console.log(`Deselected Bill ID: ${item.billId}`);
    }
    this.updateCheckAllState_RecurringInvoice(); // Update Check All checkbox state
  }

  // Log overall selection state
  logOverallSelection_RecurringInvoice() {
    const selectedSet = new Set<number>();
    const deselectedSet = new Set<number>();

    this.combinedData.forEach(group => {
      group.invoices.forEach(invoice => {
        if (invoice.selected) {
          selectedSet.add(invoice.billId);
        } else {
          deselectedSet.add(invoice.billId);
        }
      });
    });

    // Convert Sets to arrays
    this.selectedBillIds_RecurringInvoice = [...selectedSet];
    this.deselectedBillIds_RecurringInvoice = [...deselectedSet];

    // Log the results
    console.log(`Selected Bill IDs: ${this.selectedBillIds_RecurringInvoice.join(', ')}`);
    console.log(`Deselected Bill IDs: ${this.deselectedBillIds_RecurringInvoice.join(', ')}`);
  }

  selectAll_RecurringReseller(event: any) {

    const isChecked = event.target.checked;
    this.ResellerRecuringApprovalList.forEach((list: any) => {

      list.isChecked = isChecked;
      if (isChecked) {
        if (!this.arrayRecurringReseller.includes(list.reseller_comm_id)) {
          this.arrayRecurringReseller.push(list.reseller_comm_id);
        }
      } else {

        const index = this.arrayRecurringReseller.findIndex((el: any) => el === list.reseller_comm_id);
        if (index > -1) {
          this.arrayRecurringReseller.splice(index, 1);
        }
      }
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single1 input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.arrayRecurringReseller);
  }


  EditChk_RecurringReseller(reseller_comm_id: any, event: any) {


    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (reseller_comm_id !== undefined) {
      if (this.checkbox_value) {
        // Check if data is not already in the array and is not undefined
        if (!this.arrayRecurringReseller.includes(reseller_comm_id)) {
          this.arrayRecurringReseller.push(reseller_comm_id);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_array);
      } else {
        const index = this.arrayRecurringReseller.findIndex((el: any) => el === reseller_comm_id);
        if (index > -1) {
          this.arrayRecurringReseller.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_array);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.arrayRecurringReseller);
  }
  selectAll_RecurringDemo(event: any) {

    const isChecked = event.target.checked;
    this.recurringDemoList.forEach((list: any) => {

      list.isChecked = isChecked;
      if (isChecked) {
        if (!this.arrayRecurringDemo.includes(list.billId)) {
          this.arrayRecurringDemo.push(list.billId);
        }
      } else {

        const index = this.arrayRecurringDemo.findIndex((el: any) => el === list.billId);
        if (index > -1) {
          this.arrayRecurringDemo.splice(index, 1);
        }
      }
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single1 input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all-billId", this.arrayRecurringDemo);
  }


  EditChk_RecurringDemo(billId: any, event: any) {


    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (billId !== undefined) {
      if (this.checkbox_value) {
        // Check if data is not already in the array and is not undefined
        if (!this.arrayRecurringDemo.includes(billId)) {
          this.arrayRecurringDemo.push(billId);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_array);
      } else {
        const index = this.arrayRecurringDemo.findIndex((el: any) => el === billId);
        if (index > -1) {
          this.arrayRecurringDemo.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_array);
      }
    }
    console.log("Final Checkbox After checkbox selected list-billId", this.arrayRecurringDemo);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isClickInsideDropdown(event)) {
      this.isMenuVisible = false;
    }

  }
  private isClickInsideDropdown(event: Event): boolean {
    const dropdownElement = document.querySelector('.dropdown-container');
    return dropdownElement?.contains(event.target as Node) || false;
  }


  getRecurringDemo() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "recurring";
    api_req.api_url = "recurring/newRecuringApprovalInvoiceList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/newRecuringApprovalInvoiceList";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

    
      if (response != '') {
        this.spinner.hide();
        this.recurringDemoList=response.data;
        
       

      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  getRecurringDemoApproval(value:any) {

    this.spinner.show();
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "recurring";
    api_req.api_url = "recurring/recuringApprovalInvoiceNew";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/recuringApprovalInvoiceNew";
    api_page_req.user_id = this.user_ids;
    api_page_req.actval = value;
    api_page_req.approval_id = this.arrayRecurringDemo;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

    
      if (response.status== true) {
        this.spinner.hide();
       // location.reload();
        
       

      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  getRecurringCountList() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "recurring";
    api_req.api_url = "recurring/getRecurringCountList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/getRecurringCountList";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

    
      if (response.status== true) {
        this.spinner.hide();
     this.RecurredInvoiceCount=response.RecurredInvoiceCount;
     this.ResellerInvoiceCount=response.ResellerInvoiceCount;
     this.monthlyRecurInvCount=response.monthlyRecurringInvoiceCount;
     this.recuringApInvCount=response.recuringApprovalInvoiceCount;
        
       

      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }
  loadRecurring() {

   // this.spinner.show();
    this.isLoading = true;
    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "recurring";
    api_req.api_url = "recurring/get_queueing";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "recurring/get_queueing";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

    
      if (response.status== true) {
        this.isLoading = false;
        iziToast.success({
          
          message: 'Recurring Success!',
          position: 'center', // Centers the toast
          timeout: false,
          progressBar: true,
          close: true,
         
          theme: 'light', // Optional: dark theme
         
          titleSize: '50px', // Increase title size
          messageSize: '100px', // Increase message size
          onOpened: function (instance: any, toast: { querySelector: (arg0: string) => { (): any; new(): any; style: { (): any; new(): any; lineHeight: string; }; }; }) {
            // Apply custom line height
            toast.querySelector('.iziToast-message').style.lineHeight = '250px';
        }
        });
        this.spinner.hide();
      //  location.reload();
        
       

      } else {
        // Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };
  }


}
