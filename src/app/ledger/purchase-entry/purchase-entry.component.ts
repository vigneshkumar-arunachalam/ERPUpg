import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.css']

})
export class PurchaseEntryComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  user_ids: any;
  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;
  //advance search
  searchResult1_CustomerID: any;
  searchResult1_CustomerName: any;
  AdvanceSearchResult: any;
  searchPurchaseOrderForm: FormGroup;

  // to delete
  edit_array_SearchBiller_Checkbox: any;
  biller_list: any;
  Purchase_Order: any;

  //ML-View
  viewEnquiryForm: FormGroup;
  addEnquiryForm: FormGroup;
  editEnquiryForm: FormGroup;
  isReadOnly: boolean = true;
  //ML-Enquiry Comment Entry
  EnquiryCommentsEntryForm: FormGroup;
  //EnquiryFollowForm
  EnquiryFollowForm: FormGroup;
  purchasePaymentForm: FormGroup;
  //Create Ticket with Assign
  TicketAssignForm: FormGroup;
  //Create Multiple Ticket with Assign
  MultipleTicketAssignForm: FormGroup;
  //email
  emailForm: FormGroup;
  RecurringForm: FormGroup;
  EmailEnquiryID: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  groupSelect_emailCCId: any;
  checkbox_value: any;
  edit_array_emailCC_Checkbox: any = [];
  messageContent: any;
  mailContent: any;
  enquiry_Emailtemplate_id: any;
  FromEmailValue: any;
  emailTo: any;
  subjectValue: any;
  msg_id: any;
  Select_To_Type_radiobox_Value: any;
  purchaseEntryList: any;
  purchaseEntryView_list: any;
  purchaseEntryDetails_get: any;
  getMonthValues: any;
  durationMonths: any;
  RecurringStatus: { id: number; name: string; }[];
  resultRecurring: any;
  recurringDate: string;
  recurringGroups: any;
  selectedGroupIds: number[] = []; // Array to hold selected group IDs
  purchaseEntryNo: any;
  recurringState: any;
  billerDetailsList: any;
  currencyDetailsList: any;
  vendorDetailsList: any;
  purchaseTypeList: any;
  recurringEditVendorID: any;
  recurringEditBillerID: any;
  recurringEditCurrencyID: any;
  recurringEditPurchaseTypeID: any;
  editpurchaseEntryID: any;
  getCurrencyCode: any;
  paymentDetails_payment: any;
  paymentType_payment: any;
  PP_paymentMethod: any;
  paymentNotes: any;
  paymentProcessPurchaseID: any;
  add_billerNameID: any;
  add_vendorID: any;
  add_PurchasetypeID: any;
  add_currencyID: any;
  currencyDetails: any;
  vendorDetails: any;
  billerDetails: any;
  purchaseTypeDetails: any;
  //purchaseTypeDetails: any;
  taxProviderDetails: any;
  DefaultBillerIDValue: any;
  categoryDetails: any;
  PE_VendorManagementForm: FormGroup;
  //file
  myFiles: string[] = [];

  getVendorCode: any;
  //advanced search
  searchPEForm: FormGroup;
  searchBILLERID: any;
  CBV_BillerName_All: any;
  searchResult_CustomerID: any;
  //SEARCH-YEARS
  yearsList: any;
  CBV_Years_All: any;
  yearsID: any;
  edit_array_Years_Checkbox: any = [];
  getVendorList: any;
  notPaidEntries: any;
  paidEntries: any;
  partialPaidEntries: any;
  searchVendorResult: any;
  searchResult_vendorId: any;
  searchResult_vendorName: any;

  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }
  keywordCompanyName = 'companyName';
  keywordVendorName='vendorName'
  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');

    this.getUserCommonDetails();
    this.addLoad();
    this.yearsAPI();

    this.http.get<any>('https://erp1.cal4care.com/api/purchaseEntry/getMonthValues').subscribe((data: any) => {
      this.getMonthValues = data.months;
     // console.log("this.getMonthValues", this.getMonthValues)
    })

    this.http.get<any>('https://erp1.cal4care.com/api/vendor/getVendorCode').subscribe((data: any) => {
      this.getVendorCode = data.vendorCode;
     // console.log("this.getVendorCode", this.getVendorCode)
    });
    this.http.get<any>('https://erp1.cal4care.com/api/base/getVendorList').subscribe((data: any) => {
      this.getVendorList = data.vendorList;
     // console.log("this.getVendorCode", this.getVendorCode)
    })
    this.PurchaseEntryList({});

    this.EnquiryCommentsEntryForm = new FormGroup({
      'ML_CE_toDoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'ML_CE_followUpStatus': new FormControl(null),
      'ML_CE_comments': new FormControl(null),
      'ML_CE_followUpPerson': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),

    });
    this.viewEnquiryForm = new FormGroup({
      'view_billerName': new FormControl(null),
      'view_InvoiceNo': new FormControl(null),
      'view_InvoiceDate': new FormControl(null),
      'view_purchaseContent': new FormControl(null),
      'view_PurchaseType': new FormControl(null),
      'view_PurchaseEntryNo': new FormControl(null),
      'view_PurchaseEntryDate': new FormControl(null),
      'view_PaidDate': new FormControl(null),
      'view_VendorName': new FormControl(null),
      'view_taxAmount': new FormControl(null),
      'view_amount': new FormControl(null),
      'view_convAmount': new FormControl(null),
      'view_balAmount': new FormControl(null),
      'view_Currency': new FormControl(null),
    });
    this.purchasePaymentForm = new FormGroup({
      'pay_date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'pay_Total': new FormControl(null),
      'pay_paidAmount': new FormControl(null),
      'pay_balance': new FormControl(null),
      'pay_rdAmount': new FormControl(null),
      'pay_paymentType': new FormControl(null),
      'pay_description': new FormControl(null),

    });

    this.editEnquiryForm = new FormGroup({
      'edit_billerName': new FormControl(null),
      'edit_PurchaseEntryNo': new FormControl(null),
      'edit_PurchaseEntryDate': new FormControl(null),
      'edit_VendorName': new FormControl(null),
      'edit_PurchaseType': new FormControl(null),
      'edit_InvoiceNo': new FormControl(null),
      'edit_purchaseContent': new FormControl(null),
      'edit_PONo': new FormControl(null),
      'edit_Currency': new FormControl(null),
      'edit_convAmount': new FormControl(null),
      'edit_taxAmount': new FormControl(null),
      'edit_amount': new FormControl(null),

    });
    const currentDate = new Date().toISOString().split('T')[0];
    this.addEnquiryForm = new FormGroup({
      'add_billerName1': new FormControl(null),
      'add_PurchaseEntryNo': new FormControl(null),
      'add_PurchaseEntryDate': new FormControl(currentDate),
      'add_VendorName': new FormControl(null),
      'add_PurchaseType': new FormControl(null),
      'add_InvoiceNo': new FormControl(null),
      'add_purchaseContent': new FormControl(null),
      'add_PONo': new FormControl(null),
      'add_Currency': new FormControl(null),
      'add_convAmount': new FormControl(null),
      'add_taxAmount': new FormControl(null),
      'add_amount': new FormControl(null),

    });
    this.PE_VendorManagementForm = new FormGroup({

      'PE_VM_CompanyCode': new FormControl(null),
      'PE_VM_CompanyName': new FormControl(null),
      'PE_VM_VendorName': new FormControl(null),
      'PE_VM_Address1': new FormControl(null),
      'PE_VM_Address2': new FormControl(null),
      'PE_VM_City': new FormControl(null),
      'PE_VM_State': new FormControl(null),
      'PE_VM_Country': new FormControl(null),
      'PE_VM_ZipCode': new FormControl(null),
      'PE_VM_Phone': new FormControl(null),
      'PE_VM_MobilePhone': new FormControl(null),
      'PE_VM_Fax': new FormControl(null),
      'PE_VM_Email': new FormControl(null, [Validators.email]),
    });

    this.RecurringForm = new FormGroup({
      // 'Rec_date': new FormControl(this.getCurrentDate()),
      'Rec_date': new FormControl(null),
      'Rec_recurring': new FormControl(null),
      'Rec_Duration': new FormControl(null),

    });
    this.searchPEForm = new FormGroup({

      'company_Name': new FormControl(null),



    });
    this.RecurringStatus = [{ id: 0, name: 'Inactive' },
    { id: 1, name: 'Active' },]
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  SelectTransactionType_ALL() {

  }
  SelectTransactionType_NotPaid() {

  }
  SelectTransactionType_PartialPaid() {

  }
  SelectTransactionType_Paid() {

  }

  getMonthsValueDropdown(event: any) {
    this.durationMonths = event;

  }
  handleChange_Recurring(id: any, event: any) {

    this.recurringState = event.target.value;

  }
  handle_vendor(event: any) {
    this.recurringEditVendorID = event.target.value;
  }
  handle_company(event: any) {
 
    this.recurringEditBillerID = event.target.value;
    this.getPurchaseDetails();
  }

  handle_purchaseType(event: any) {
    this.recurringEditPurchaseTypeID = event.target.value;
  }
  handleChange_RecurringGroup(event: any, groupId: any) {
    if (event.target.checked) {
      // Add group ID to the array if checkbox is checked
      this.selectedGroupIds.push(groupId);
    } else {
      // Remove group ID from the array if checkbox is unchecked
      const index = this.selectedGroupIds.indexOf(groupId);
      if (index !== -1) {
        this.selectedGroupIds.splice(index, 1);
      }
    }
  //  console.log(this.selectedGroupIds); // Log the array for testing

  }
  handle_company_add(event: any) {
    this.add_billerNameID = event.target.value;
    this.addLoad();
    this.getPurchaseEntryNo();
  }
  handle_vendor_add(event: any) {
    this.add_vendorID = event.target.value;
  }
  handle_purchaseType_add(event: any) {
    this.add_PurchasetypeID = event.target.value;
  }
  getCurrencyValues_add(event: any) {
    this.add_currencyID = event.target.value;
    this.changeCurrency();
  }
  changeCurrency(){
    this.spinner.show();
  
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "base";
    api_req.api_url = "base/get_currency_values"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "get_currency_values";
    api_recurring.user_id = localStorage.getItem("erp_c4c_user_id");
    api_recurring.billerId=$('#add_billerName1').val();

    api_recurring.currency_code = this.add_currencyID;
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status = true) {
  
        this.addEnquiryForm.patchValue({
          'add_convAmount': response.currency_live_val,
        });
      }
    });


  }
  getPurchaseDetails(){
    this.spinner.show();
  
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "transaction_entry";
    api_req.api_url = "transaction_entry/getPurchaseDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "getPurchaseDetails";
    api_recurring.user_id = localStorage.getItem("erp_c4c_user_id");
    api_recurring.biller_id=this.recurringEditBillerID ;
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status = true) {
        this.spinner.hide();
        this.recurringEditCurrencyID= response.default_currency_id;
        this.editEnquiryForm.patchValue({
          'edit_billerName': response.defaults_biller_id,
          'edit_Currency': response.default_currency_id,
          'edit_convAmount': response.currency_converstion[0].currency_live_val,
          'edit_PurchaseEntryNo': response.purchase_entry_no,
        });
      }
    });


  }

  goBackADDTransaction() {

  }
  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    // console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      if (!this.edit_array_SearchBiller_Checkbox) {
        this.edit_array_SearchBiller_Checkbox = [];
      }


      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
     // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_SearchBiller_Checkbox)) {
        this.edit_array_SearchBiller_Checkbox = [];
      }
      // const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data);
      const index = this.edit_array_SearchBiller_Checkbox.indexOf(data);
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
     // console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  selectEventCustomer(item: any) {
   // console.log(item)
    this.searchResult_CustomerID = item.vendorId;
    this.searchResult_CustomerName = item.vendorName.trim();;
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

  }
  keysearch(event: any) {
    this.searchResult_CustomerName = event.target.value;
  }
  clearSelection(event: any) {
   // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName)
  }
  searchCustomerData(data: any) {


    if (data.length > 0) {
      // this.spinner.show();
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "base";
      api_req.api_url = "base/getVendorSearchList";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "getVendorSearchList";
      api_Search_req.user_id = this.user_ids;
      api_Search_req.vendorName = data;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

       // console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.vendorName;
        // console.log("vignesh-advanced search result", this.searchResult);
        if (response! = null) {
          this.searchResult = response.vendorName;
          this.spinner.hide();
        }
        else {
          // iziToast.warning({
          //   message: "Sorry, No Matching Data",
          //   position: 'topRight'
          // });

        }
      });

    }


  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  yearsAPI() {

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/yearValueFilter";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "yearValueFilter";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {

        this.yearsList = response;

      } else {




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

  yearsCHK(data: any, event: any) {
    this.CBV_Years_All = event.target.checked;
    this.yearsID = data;
    // console.log("this.edit_array_Years_Checkbox", this.edit_array_Years_Checkbox)
    // console.log("this.CBV_Years_All", this.CBV_Years_All)
    if (this.CBV_Years_All) {
      if (!this.edit_array_Years_Checkbox) {
        this.edit_array_Years_Checkbox = [];
      }
      this.edit_array_Years_Checkbox.push(data);
      this.edit_array_Years_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_Years_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_Years_Checkbox)) {
        this.edit_array_Years_Checkbox = [];
      }
      const index = this.edit_array_Years_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_Years_Checkbox.splice(index, 1);
      }
    //  console.log("Final Checkbox After Deselected selected list", this.edit_array_Years_Checkbox)

    }

  }
  saveVendorManagement() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "vendor";
    api_req.api_url = "vendor/saveVendor"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "saveVendor";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    if (this.PE_VendorManagementForm.value.PE_VM_CompanyName == null) {
      iziToast.error({
        message: "Company Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.companyName = this.PE_VendorManagementForm.value.PE_VM_CompanyName;
    }
    if (this.PE_VendorManagementForm.value.PE_VM_VendorName == null) {
      iziToast.error({
        message: "Vendor Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.vendorName = this.PE_VendorManagementForm.value.PE_VM_VendorName;
    }

    api_mulInvpay.vendorCode = this.PE_VendorManagementForm.value.PE_VM_CompanyCode;
    api_mulInvpay.vendorAddress1 = this.PE_VendorManagementForm.value.PE_VM_Address1;
    api_mulInvpay.vendorAddress2 = this.PE_VendorManagementForm.value.PE_VM_Address2;
    api_mulInvpay.city = this.PE_VendorManagementForm.value.PE_VM_City;

    api_mulInvpay.state = this.PE_VendorManagementForm.value.PE_VM_State;
    api_mulInvpay.zipCode = this.PE_VendorManagementForm.value.PE_VM_ZipCode;
    api_mulInvpay.country = this.PE_VendorManagementForm.value.PE_VM_Country;
    api_mulInvpay.phone = this.PE_VendorManagementForm.value.PE_VM_Phone;
    api_mulInvpay.mobilePhone = this.PE_VendorManagementForm.value.PE_VM_MobilePhone;

    api_mulInvpay.fax = this.PE_VendorManagementForm.value.PE_VM_Fax;
    api_mulInvpay.email = this.PE_VendorManagementForm.value.PE_VM_Email;


    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();
        $('#PE_VendorManagementId').modal('hide')
        iziToast.success({
          message: "Vendor Saved Successfully",
          position: 'topRight'
        });
        this.PE_VendorManagementForm.controls['PE_VM_CompanyName'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_VendorName'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_Address1'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_Address2'].reset();
    
        this.PE_VendorManagementForm.controls['PE_VM_City'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_State'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_Country'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_ZipCode'].reset();
    
        this.PE_VendorManagementForm.controls['PE_VM_Phone'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_MobilePhone'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_Fax'].reset();
        this.PE_VendorManagementForm.controls['PE_VM_Email'].reset();
        this.getUserCommonDetails();
        $("#RecurringFormId").modal("hide");

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Vendor Save Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  addPurchaseEntry() {
    this.addLoad();
  }
  fileAttachmentEventPE1(event: any) {

    if (event.target.files.length < 4) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    }
    else {
      iziToast.error({
        message: "Sorry, Maximum you can choose 3 files only. Please contact admin",
        position: 'topRight'
      });
    }


  }
  getPurchaseEntryNo() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/getPurchaseEntryNo";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "getPurchaseEntryNo";
    api_getInvoiceDetails_req.user_id = localStorage.getItem("erp_c4c_user_id");
    api_getInvoiceDetails_req.billerId = this.add_billerNameID;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.editEnquiryForm.patchValue({
          'add_convAmount': response.currency_live_val,
          'add_Currency': response.currency_id,
          'add_PurchaseEntryNo': response.purchaseEntryNo,

        });

      }
      else {

      }

    });
  }
  getCurrencyValues(event: any) {
    this.spinner.show();
    this.getCurrencyCode = event.target.value;
    this.recurringEditCurrencyID= event.target.value;
    alert( this.recurringEditCurrencyID);
    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "base";
    api_req.api_url = "base/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    // api_getInvoiceDetails_req.billerId = this.addInvoice_section1.value.companyName;
    api_getInvoiceDetails_req.billerId = this.recurringEditBillerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.editEnquiryForm.patchValue({
          'edit_convAmount': response.currency_live_val,

        });

      }
      else {

      }

    });
  }
  getUserCommonDetails() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "base";
    api_req.api_url = "base/getUserCommonDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "getUserCommonDetails";
    api_recurring.user_id = localStorage.getItem("erp_c4c_user_id");

    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status = true) {
        this.billerDetailsList = response.biller_details;
        this.currencyDetailsList = response.currency_list;
        this.vendorDetailsList = response.vendorList;
        this.purchaseTypeList = response.purchaseType;


      }
    });

  }
  Recurring(purchaseEntryNo: any) {

    this.spinner.show();
    this.purchaseEntryNo = purchaseEntryNo;
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/getPurchaseRecurring"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "getPurchaseRecurring";
    api_recurring.user_id = localStorage.getItem("erp_c4c_user_id");
    api_recurring.billparent_id = purchaseEntryNo;
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status = true) {
        this.selectedGroupIds = [];
        this.resultRecurring = response[0].recuring_activechk;
        this.recurringGroups = response[0].recurringGroups
        this.selectedGroupIds = response[0].recuring_group_str.split(',').map(Number);
       // console.log("this.selectedGroupIds", this.selectedGroupIds)
        const dateParts = response[0].recured_date_show.split('/');
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[0], 10);
        const parsedDate = new Date(year, month - 1, day); // Note: month - 1 becau

        this.recurringDate = this.datePipe.transform(parsedDate, 'yyyy-MM-dd');
        this.RecurringForm.patchValue({
          'Rec_date': this.recurringDate,
          'Rec_Duration': response[0].rec_duration,

        });

      }
    });

  }
  updateRecurring() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/purchase_recurringUpdate"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "purchase_recurringUpdate";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.bill_parent_recuring_id = this.purchaseEntryNo;
    api_mulInvpay.recuring_rdo = this.recurringState;
    api_mulInvpay.rec_duration = this.RecurringForm.value.Rec_Duration;
    api_mulInvpay.recured_date = this.RecurringForm.value.Rec_date;
    api_mulInvpay.follower_group_id = this.selectedGroupIds;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });

        $("#RecurringFormId").modal("hide");

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Update Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  savePurchaseEntry() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/savePurchaseEntry"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "savePurchaseEntry";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

 
    var billername=this.addEnquiryForm.value.add_billerName1;
    if (billername=== null || billername=== undefined || billername=== 'undefined') {
      iziToast.error({
        message: "Fill Biller Name  ",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }else{
      api_mulInvpay.company = this.addEnquiryForm.value.add_billerName1;
    }

    var vendorname=this.searchResult_vendorId;
    if (vendorname=== null || vendorname=== undefined || vendorname=== 'undefined') {
    
      iziToast.error({
        message: "Fill Vendor Name  ",
        position: 'topRight'
      });
     this.spinner.hide();
      return false;
    }else{
      
      api_mulInvpay.vendorId = this.searchResult_vendorId;
    }
   
    var purchaseentrynumber=this.addEnquiryForm.value.add_PurchaseEntryNo;
    if (purchaseentrynumber=== null || purchaseentrynumber=== undefined || purchaseentrynumber=== 'undefined') {
      iziToast.error({
        message: "Fill Purchase Entry Number  ",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }else{
      api_mulInvpay.purchaseEntryNo = this.addEnquiryForm.value.add_PurchaseEntryNo;
    }
    
    api_mulInvpay.purchaseEntryDate = this.addEnquiryForm.value.add_PurchaseEntryDate;


    var purchasetype=this.addEnquiryForm.value.add_PurchaseType;
    if (purchasetype=== null || purchasetype=== undefined || purchasetype=== 'undefined') {
      iziToast.error({
        message: "Fill Purchase Type  ",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }else{
      api_mulInvpay.purchase_type_id = this.addEnquiryForm.value.add_PurchaseType;
    }

    var invoiceNumb=this.addEnquiryForm.value.add_InvoiceNo;
    if (invoiceNumb=== null || invoiceNumb=== undefined || invoiceNumb=== 'undefined') {
      iziToast.error({
        message: "Fill Invoice Number  ",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }else{
      api_mulInvpay.invoiceNo = this.addEnquiryForm.value.add_InvoiceNo;
    }
 
 
    api_mulInvpay.content_purchase = this.addEnquiryForm.value.add_purchaseContent;
    api_mulInvpay.poNo = this.addEnquiryForm.value.add_PONo;
    api_mulInvpay.currency = this.addEnquiryForm.value.add_Currency;
    api_mulInvpay.conversionRate = this.addEnquiryForm.value.add_convAmount;
    api_mulInvpay.taxAmount = this.addEnquiryForm.value.add_taxAmount;

    
    var invoiceamount=this.addEnquiryForm.value.add_amount;
    if (invoiceamount=== null || invoiceamount=== undefined || invoiceamount=== 'undefined') {
      iziToast.error({
        message: "Fill Invoice Amount  ",
        position: 'topRight'
      });
      this.spinner.hide();
     return false;
    }else{
      api_mulInvpay.invoiceAmount = this.addEnquiryForm.value.add_amount;
    }
   

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == "true" || response.status == true ) {
        this.spinner.hide();
        $("#addPurchaseEntryFormId").modal("hide");
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        this.addEnquiryForm.reset();
        this.PurchaseEntryList({});
        this.addEnquiryForm.value.reset();
       
       
      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Save Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  viewEnquiry(purchaseEntryID: any) {

    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/getPurchaseEntryDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getPurchaseEntryDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.purchaseEntryID = purchaseEntryID;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();


        this.viewEnquiryForm.patchValue({
          'view_billerName': response.billerName,
          'view_InvoiceNo': response.invoiceNo,
          'view_InvoiceDate': response.invoiceDate,
          'view_purchaseContent': response.content_purchase,
          'view_PurchaseType': response.purchaseType,
          'view_PurchaseEntryNo': response.purchaseEntryNo,
          'view_PurchaseEntryDate': response.purchaseEntryDate,
          'view_PaidDate': response.paidDate,
          'view_VendorName': response.vendorName,
          'view_taxAmount': response.taxAmount,
          'view_amount': response.invoiceAmount,
          'view_convAmount': response.convAmount,
          'view_balAmount': response.balAmount,
          'view_Currency': response.currency,
        })

      //  $("#viewPurchaseEntryFormId").modal("hide");

      } else {
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

  editEnquiry_ML(purchaseEntryID: any) {
    this.spinner.show();
    this.editpurchaseEntryID = purchaseEntryID;
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/getPurchaseEntryDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getPurchaseEntryDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.purchaseEntryID = purchaseEntryID;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();
        this.recurringEditBillerID = response.billerId;
        this.recurringEditVendorID = response.vendorId;
        this.recurringEditPurchaseTypeID = response.purchase_type_id;
        this.recurringEditCurrencyID = response.currencyId;

        this.editEnquiryForm.patchValue({
          'edit_billerName': response.billerId,
          'edit_PurchaseEntryNo': response.purchaseEntryNo,
          'edit_PurchaseEntryDate': response.purchaseEntryDate,
          'edit_VendorName': response.vendorName,
          'edit_PurchaseType': response.purchase_type_id,
          'edit_InvoiceNo': response.invoiceNo,
          'edit_purchaseContent': response.content_purchase,
          'edit_PONo': response.poNo,
          'edit_Currency': response.currencyId,
          'edit_convAmount': response.convAmount,
          'edit_taxAmount': response.taxAmount,
          'edit_amount': response.invoiceAmount,

        })

        // $("#editPurchaseEntryFormId").modal("hide");

      } else {
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

  // updatePurchaseEntry() {
  //   this.spinner.show();

  //   let api_req: any = new Object();
  //   let api_mulInvpay: any = new Object();
  //   api_req.moduleType = "purchaseEntry";
  //   api_req.api_url = "purchaseEntry/updatePurchaseEntry"
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_mulInvpay.action = "updatePurchaseEntry";
  //   api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

  //   var purchaseentrynumber=this.editEnquiryForm.value.edit_PurchaseEntryNo;
 
  //   if (purchaseentrynumber=== null || purchaseentrynumber=== '' || purchaseentrynumber=== undefined || purchaseentrynumber=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Purchase Entry Number  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //     return false;
  //   }else{
      
  //     api_mulInvpay.purchaseEntryNo = this.editEnquiryForm.value.edit_PurchaseEntryNo;
  //   }

  //   var purchaseentrydate=this.editEnquiryForm.value.edit_PurchaseEntryDate;
  //   if (purchaseentrydate=== null || purchaseentrydate=== '' || purchaseentrydate=== undefined || purchaseentrydate=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Purchase Entry Date  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //     return false;
  //   }else{
      
  //     api_mulInvpay.purchaseEntryDate = this.editEnquiryForm.value.edit_PurchaseEntryDate;
  //   }
 

  //   var invoiceNumb=this.editEnquiryForm.value.edit_InvoiceNo;
  //   if (invoiceNumb=== null || invoiceNumb=== ''|| invoiceNumb=== undefined || invoiceNumb=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Invoice Number  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //     return false;
  //   }else{
      
  //     api_mulInvpay.invoiceNo = this.editEnquiryForm.value.edit_InvoiceNo;
  //   }
  //   api_mulInvpay.content_purchase = this.editEnquiryForm.value.edit_purchaseContent;
  //   api_mulInvpay.poNo = this.editEnquiryForm.value.edit_PONo;
  //   var invoiceamount=this.editEnquiryForm.value.edit_amount;
  //   if (invoiceamount=== null || invoiceamount=== '' ||invoiceamount=== undefined || invoiceamount=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Invoice Amount  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //    return false;
  //   }else{
     
  //     api_mulInvpay.invoiceAmount = this.editEnquiryForm.value.edit_amount;
  //   }
  //   api_mulInvpay.company = this.recurringEditBillerID;
  //   api_mulInvpay.conversionRate = this.editEnquiryForm.value.edit_convAmount;

  //   api_mulInvpay.currency = this.recurringEditCurrencyID;
  //   api_mulInvpay.taxAmount = this.editEnquiryForm.value.edit_taxAmount;
   
  //   var vendor= this.recurringEditVendorID;
  //   if (vendor=== null || vendor=== '' ||vendor=== undefined || vendor=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Vendor Details  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //     return false;
  //   }else{
      
  //     api_mulInvpay.vendorId = this.recurringEditVendorID;
  //   }

  //   var purchaseType= this.recurringEditVendorID;
  //   if (purchaseType=== null || purchaseType=== '' ||purchaseType=== undefined || purchaseType=== 'undefined') {
  //     iziToast.error({
  //       message: "Fill Purchase Type  ",
  //       position: 'topRight'
  //     });
  //     this.spinner.hide();
  //     return false;
  //   }else{
      
  //     api_mulInvpay.purchase_type_id = this.recurringEditPurchaseTypeID;
  //   }

 
  //   api_mulInvpay.purchaseEntryId = this.editpurchaseEntryID;


  //   api_req.element_data = api_mulInvpay;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     if (response.status = true) {
  //       this.spinner.hide();
  //       this.PurchaseEntryList({});
  //       iziToast.success({
  //         message: "Purchase Entry Values Updated Successfully",
  //         position: 'topRight'
  //       });

  //       $("#editPurchaseEntryFormId").modal("hide");


  //     } else {
  //       this.spinner.hide();
  //       iziToast.warning({
  //         message: "Update Failed",
  //         position: 'topRight'
  //       });
  //     }
  //   }),
  //     (error: any) => {
  //       this.spinner.hide();
  //       iziToast.error({
  //         message: "Sorry, some server issue occur. Please contact admin",
  //         position: 'topRight'
  //       });
  //       console.log("final error", error);
  //     };
  // }
  updatePurchaseEntry() {
    this.spinner.show();

    let api_req: any = {};
    let api_mulInvpay: any = {};
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/updatePurchaseEntry";
    api_req.api_type = "web";
    api_req.access_token = "your_access_token_here"; // Replace with actual token
    api_mulInvpay.action = "updatePurchaseEntry";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    const purchaseEntryNumber = this.editEnquiryForm.value.edit_PurchaseEntryNo;
    if (!purchaseEntryNumber) {
        iziToast.error({
            message: "Fill Purchase Entry Number",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.purchaseEntryNo = purchaseEntryNumber;

    const purchaseEntryDate = this.editEnquiryForm.value.edit_PurchaseEntryDate;
    if (!purchaseEntryDate) {
        iziToast.error({
            message: "Fill Purchase Entry Date",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.purchaseEntryDate = purchaseEntryDate;

    const invoiceNo = this.editEnquiryForm.value.edit_InvoiceNo;
    if (!invoiceNo) {
        iziToast.error({
            message: "Fill Invoice Number",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.invoiceNo = invoiceNo;

    const invoiceAmount = this.editEnquiryForm.value.edit_amount;
    if (!invoiceAmount) {
        iziToast.error({
            message: "Fill Invoice Amount",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.invoiceAmount = invoiceAmount;

    const vendorId = this.recurringEditVendorID;
    if (!vendorId) {
        iziToast.error({
            message: "Fill Vendor Details",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.vendorId = vendorId;

    const purchaseTypeId = this.recurringEditPurchaseTypeID;
    if (!purchaseTypeId) {
        iziToast.error({
            message: "Fill Purchase Type",
            position: 'topRight'
        });
        this.spinner.hide();
        return false;
    }
    api_mulInvpay.purchase_type_id = purchaseTypeId;

    api_mulInvpay.content_purchase = this.editEnquiryForm.value.edit_purchaseContent;
    api_mulInvpay.poNo = this.editEnquiryForm.value.edit_PONo;
    api_mulInvpay.company = this.recurringEditBillerID;
    api_mulInvpay.conversionRate = this.editEnquiryForm.value.edit_convAmount;
    
    api_mulInvpay.currency = this.recurringEditCurrencyID;
    api_mulInvpay.taxAmount = this.editEnquiryForm.value.edit_taxAmount;
    api_mulInvpay.purchaseEntryId = this.editpurchaseEntryID;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe({
        next: (response: any) => {
            this.spinner.hide();
            if (response.status) {
                this.PurchaseEntryList({});
                iziToast.success({
                    message: "Purchase Entry Values Updated Successfully",
                    position: 'topRight'
                });
                $("#editPurchaseEntryFormId").modal("hide");
            } else {
                iziToast.warning({
                    message: "Update Failed",
                    position: 'topRight'
                });
            }
        },
        error: (error: any) => {
            this.spinner.hide();
            iziToast.error({
                message: "Sorry, some server issue occurred. Please contact admin",
                position: 'topRight'
            });
            console.log("Error:", error);
        },
        complete: () => {
            console.log("Update purchase entry completed.");
        }
    });
}


  PP_PaymentMethod(event: any) {
    this.PP_paymentMethod = event.target.value;

  }
  paymentProcess(purchaseEntryID: any) {
    this.spinner.show();
    this.paymentProcessPurchaseID = purchaseEntryID;
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/getPurchasePaymentDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getPurchasePaymentDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.purchase_type_id = this.recurringEditPurchaseTypeID;
    api_mulInvpay.purchase_id = purchaseEntryID;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();
        this.paymentDetails_payment = response.payment_details;
        this.paymentType_payment = response.paymentType;
        this.paymentNotes = response.paymentNote;

        this.purchasePaymentForm.patchValue({
         // 'pay_date': response.billerId,
          'pay_Total': response.invoiceAmount,
          'pay_paidAmount': response.paid_amt,
          'pay_balance': response.bal_amt,
          'pay_rdAmount': response.bal_amt,
          'pay_paymentType': 'null',
          // 'pay_description':  response.content_purchase,
        })


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Update Failed",
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
  paymentProcessUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/processPurchasePayment"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "processPurchasePayment";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.purchase_id = this.paymentProcessPurchaseID;
    var desc=this.purchasePaymentForm.value.pay_description;
    if(desc==null ||desc==undefined || desc=='undefined'){
      iziToast.error({
        message: "Description Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }else{
      api_mulInvpay.payment_details = this.purchasePaymentForm.value.pay_description;
    }
 
    api_mulInvpay.payment_method = this.purchasePaymentForm.value.pay_paymentType;
    api_mulInvpay.purchase_paid_amt = this.purchasePaymentForm.value.pay_rdAmount;
    api_mulInvpay.bal_amt = this.purchasePaymentForm.value.pay_balance;

    if (this.purchasePaymentForm.value.pay_date == undefined) {
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.paymentDate = this.purchasePaymentForm.value.pay_date;
    }
    if (this.purchasePaymentForm.value.pay_paymentType == null || this.purchasePaymentForm.value.pay_paymentType == 'null') {
      iziToast.error({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.payment_method = this.purchasePaymentForm.value.pay_paymentType;
    }
  //  console.log("batter", this.purchasePaymentForm.value.pay_paymentType)
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        this.spinner.hide();
        this.purchasePaymentForm.controls['pay_description'].reset();
        $('#paymentProcessFormId').modal('hide');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.PurchaseEntryList({});



      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Update Failed",
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

  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;

  }
  goAddNewEnquiry() {
    // this.router.navigate(['/addNewEnquiry'])
  }
  addVendorNameGo() {
    // $('#addPurchaseEntryFormId').modal('hide');
    
    this.http.get<any>('https://erp1.cal4care.com/api/vendor/getVendorCode').subscribe((data: any) => {
      this.getVendorCode = data.vendorCode;
    //  console.log("this.getVendorCode", this.getVendorCode)
    });

    $('#PE_VendorManagementId').modal('show');
  }
  addLoad() {


    let api_req: any = new Object();
    let api_loadAdd: any = new Object();
    api_req.moduleType = "purchase_entry_addnew";
    api_req.api_url = "purchaseEntry/purchase_entry_addnew";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_loadAdd.action = "purchase_entry_addnew";


    api_loadAdd.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.add_billerNameID != 'undefined' || this.add_billerNameID != undefined) {
      api_loadAdd.billerId = this.add_billerNameID;
    } else {
      api_loadAdd.billerId = '';
    }

    api_req.element_data = api_loadAdd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {

        this.currencyDetails = response.currency_det;
        this.billerDetails = response.biller_det;
        this.vendorDetails = response.vendor_det;
        this.purchaseTypeDetails = response.purchase_type_det;
        this.taxProviderDetails = response.tax_provider_det;
        this.categoryDetails = response.category_det;
        this.DefaultBillerIDValue = response.defaults_biller_id;
        setTimeout(() => {
          $('#add_billerName1').val(response.defaults_biller_id);
        }, 1000)


        // this.getPaymentInvoice();
        this.addEnquiryForm.patchValue({
          'add_billerName1': this.DefaultBillerIDValue,
          'add_PurchaseEntryNo': response.purchase_entry_no,
          'add_Currency': response.default_currency_id,
          'add_convAmount': response.conversionRate[0].currency_live_val,

        });



      } else {


        iziToast.warning({
          message: "Invoice Type Details not displayed. Please try again",
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
 
  PurchaseEntryList(data: any) {


    this.spinner.show();
    // console.log("this.searchResult_CustomerName", this.searchResult_CustomerName)
    // console.log("this.edit_array_Years_Checkbox", this.edit_array_Years_Checkbox)
    // console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "purchaseEntry";
    api_req.api_url = "purchaseEntry/purchaseEntrylist"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "purchaseEntrylist";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    if (this.searchResult_CustomerName == undefined) {
      api_deliveryOrder.search_txt = [];
    } else {
      api_deliveryOrder.search_txt = this.searchResult_CustomerName;
    }
    
    // api_deliveryOrder.search_biller_str = this.searchResult1_CustomerName;
    if (this.edit_array_SearchBiller_Checkbox == undefined) {
      api_deliveryOrder.billerID = [];
    } else {
      api_deliveryOrder.billerID = this.edit_array_SearchBiller_Checkbox;
    }
    api_deliveryOrder.year_filter = this.edit_array_Years_Checkbox;


    // api_deliveryOrder.search_txt = '';
    // api_deliveryOrder.search_biller_str = '';
    // api_deliveryOrder.year_filter = '';
    // api_deliveryOrder.billerID = '';
    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.edit_array_SearchBiller_Checkbox = []
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "No Matching Records",
          position: 'topRight'
        });
        $('#searchPEFormId').modal("hide");
      }

      if (response.status = true) {
        this.biller_list = response.biller_details;
        this.purchaseEntryList = response.purchaseEntryList;

        this.notPaidEntries = this.purchaseEntryList.filter((entry: { paymentStatus: string; }) => entry.paymentStatus === 'notpaid');
        this.paidEntries = this.purchaseEntryList.filter((entry: { paymentStatus: string; }) => entry.paymentStatus === 'paid');
        this.partialPaidEntries = this.purchaseEntryList.filter((entry: { paymentStatus: string; }) => entry.paymentStatus === 'paritialypaid');

        // console.log("this.notPaidEntries",this.notPaidEntries)
        // console.log("this.notPaidEntries.length",this.notPaidEntries.length)
        // console.log("this.paidEntries",this.paidEntries)
        // console.log("this.partialPaidEntries",this.partialPaidEntries)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
       
        $('#searchDeliveryOrderFormId').modal("hide");
        $('#searchPurchaseOrderFormId').modal("hide");
        $('#searchPEFormId').modal("hide");
        // this.searchDeliveryOrderForm.reset();

      }
    });
  }

  listDataInfo(list_data: any) {

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  deleteEnquiry_ML(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let delete_enquiryML_req: any = new Object();
        api_req.moduleType = "purchaseEntry";
        api_req.api_url = "purchaseEntry/deletePurchaseEntry";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_enquiryML_req.action = "deletePurchaseEntry";
        delete_enquiryML_req.purchasEntryId = id;
        delete_enquiryML_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = delete_enquiryML_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            this.PurchaseEntryList({});
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Purchase Entry Deleted Successfully",
              position: 'topRight'
            });
            this.PurchaseEntryList({});
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })
  }
 
  clearVendorSelection(event: any) {
    console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_vendorId = '';
    this.searchResult_vendorName = '';
    this.recurringEditVendorID='';
    console.log("AutoComplete-vendor ID", this.searchResult_vendorId)
    console.log("AutoComplete-vendor Name", this.searchResult_vendorName)
  }
  selectEventVendor(item: any) {
    console.log(item)
    this.searchResult_vendorId = item.vendorId;
    this.recurringEditVendorID=this.searchResult_vendorId;
    this.searchResult_vendorName = item.vendorName;
    console.log("AutoComplete-vendor ID", this.searchResult_vendorId)
    console.log("AutoComplete-vendor Name", this.searchResult_vendorName)

  }
  searchVendorData(data: any) {

    if (data.length > 0) {
      // this.spinner.show();
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "base";
      api_req.api_url = "base/getVendorSearchList";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "getVendorSearchList";
      api_Search_req.user_id = this.user_ids;
      api_Search_req.vendorName = data;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

        console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchVendorResult = response.vendorName;
        console.log("vignesh-advanced search result", this.searchVendorResult);
        if (response! = null) {
          this.searchVendorResult = response.vendorName;
          this.spinner.hide();
        }
        else {
          // iziToast.warning({
          //   message: "Sorry, No Matching Data",
          //   position: 'topRight'
          // });

        }
      });

    }


  }
  onFocusedVendor(e: any) {
    // do something when input is focused
  }
 


}

