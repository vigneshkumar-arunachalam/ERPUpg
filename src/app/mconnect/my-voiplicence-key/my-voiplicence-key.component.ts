import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-my-voiplicence-key',
  templateUrl: './my-voiplicence-key.component.html',
  styleUrls: ['./my-voiplicence-key.component.css']
})
export class MyVOIPLicenceKeyComponent implements OnInit {
  Transaction_list: any;


  searchTransactionForm: FormGroup;
  //pagination
  recordNotFound = false;
  pageLimit = 20;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //search
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  searchResult: any;
  Transaction_Type_List: any;
  searchBILLERID: any;
  CBV_BillerName_All: any;
  edit_array_SearchBiller_Checkbox: any = [];
  searchResult1_CustomerID: any;
  searchResult1_CustomerName: any;
  AdvanceSearchResult: any;
  isReadOnly: boolean = false;
  commentTransactionID: any;
  transactionTypeNumber: any;
  PC_Description: any;
  PC_Type: any;
  PC_Amount: any;
  PC_Comments: any;
  Cus_CustomerName: any;
  Cus_billerName: any;
  Cus_address1: any;
  Cus_address2: any;
  Cus_City: any;
  Cus_state: any;
  Cus_zipcode: any;
  Cus_country: any;
  Cus_phone: any;
  Cus_mobilephone: any;
  Cus_fax: any;
  Cus_email: any;
  Cus_financeemail: any;
  Cus_Contactperson: any;
  customerIDCredit: any = '';
  searchResultTest: string;
  Transaction_list_Permiss: any;
  Transaction_list_PermissAdd: any;
  Transaction_list_PermissEdit: any;
  Transaction_list_PermissDelete: any;
  Transaction_list_PermissSearch: any;
  Transaction_list_PermissPDF: any;
  Transaction_list_PermissList: any;
  Transaction_list_PermissEmail: any;
  countDetails: any;
  //email
  emailForm: FormGroup;
  email_TemplateSelection: boolean = false;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  email_groupMailList: any;
  edit_array_emailCC_Checkbox: any = [];
  quotation_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  FromEmailValue: any;
  Email_BillId: any;
  CBV_TemplateSelection: any;
  CBV_PDFLink: any;
  CBV_PaymentLink: any;
  SelectType_finance: any;
  SelectType_company: any;
  Select_To_Type_radiobox_Value: any;
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId: any;
  email_checkbox_value: any;
  checkbox_value: any;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  emailBillerName: any;
  // Select All checkbox binding
  selectAll = false;
  showAddModal = false;
  isSubmitting: boolean = false;
  customerSerialNo: any;
  customerLicenseForm:FormGroup;
  setKeyPeriodSerialNo: any;
  setKeyPeriodForm:FormGroup;
  periodList: any;
  concList: any;

  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }
  keywordCompanyName = 'customerName';
  // Declare dynamic variables
  purchaseEntryNo: string;
  vendorName: string;
  invoiceNo: string;
  contentOfPurchase: string;
  poNumber: string;
  currency: string;
  currencyConversionRate: string;
  taxAmount: string;
  invoiceAmount: string;
  comments: string;

  licenseKeyCount: number = 1;
  productCode: string = '';
  productName: string = '';
  hiddenLicenseKeys: string[] = [];
  hiddenProductCodes: string[] = [];
  hiddenProductNames: string[] = [];
  hiddenFieldsVisible: boolean = false;

  ngOnInit(): void {
    this.Select_To_Type_radiobox_Value = 'finance';
    this.periodList=[{periodid:1,name:"14 Days"},{periodid:2,name:"30 Days"},{periodid:3,name:"Perpetual"}];
    this.concList=[{concurrentid:1,name:"4 SC"},{concurrentid:2,name:"8 SC"},{concurrentid:3,name:"16 SC"},{concurrentid:4,name:"32 SC"},{concurrentid:5,name:"64 SC"},{concurrentid:6,name:"128 SC"},{concurrentid:7,name:"256 SC"},{concurrentid:8,name:"512 SC"},{concurrentid:9,name:"1024 SC"}];
    this.concurrent_list();
    this.set_period_list();
    this.searchTransactionForm = new FormGroup({
      'search_billerName1': new FormControl(null),
      'company_Name6': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),
      'formControlName="radio_ApprovalBy': new FormControl(null),

    });
    this.customerLicenseForm=new FormGroup({
      'customerName': new FormControl(null, Validators.required),
    });
    this.setKeyPeriodForm=new FormGroup({
      'SetPeriod': new FormControl(null, Validators.required),
      'Concurrent': new FormControl(null, Validators.required),
      'licenseKeyUpdate': new FormControl(null, Validators.required),
    });

    this.getTransactionNewList({});

  }
  resetForm() {
    this.licenseKeyCount = 1;
    this.productCode = '';
    this.productName = '';
    this.hiddenLicenseKeys = [];
    this.hiddenProductCodes = [];
    this.hiddenProductNames = [];
    this.hiddenFieldsVisible = false;
  }


  openAddModal() {
    this.showAddModal = true;
    $('#add_licenceKeyGr').modal('show');
    this.resetForm();
  }
  closeAddModal() {
    this.showAddModal = false;
    $('#add_licenceKeyGr').modal('hide');
    $('#setKeyPeriodSerialNo_Gr').modal('hide');
    $('#customerLicenseForm_Gr').modal('hide');
  
    this.resetForm();
  }
  getTransactionNewList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "key";
    api_req.api_url = "key/key_management_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "key/key_management_list";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.offset = list_data.offset;
    TNapi_req.limit = list_data.limit;
    TNapi_req.search_txt = this.searchResult_CustomerID;
    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {


        this.Transaction_list = response.data;
        this.Transaction_list_PermissAdd = response.permission_arr.add;
        this.Transaction_list_PermissEdit = response.permission_arr.edit;
        this.Transaction_list_PermissDelete = response.permission_arr.delete;
        this.Transaction_list_PermissSearch = response.permission_arr.search;
        this.Transaction_list_PermissPDF = response.permission_arr.pdf;
        this.Transaction_list_PermissList = response.permission_arr.list;
        this.Transaction_list_PermissEmail = response.permission_arr.email;
        this.countDetails = response.totalCount;



        // console.log(this.Transaction_list);
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total, 'page_limit': this.pageLimit });

        $('#searchTransactionFormId').modal('hide');
      }

    });

  }
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  setKeyPeriodUpdate(){
    this.spinner.show();
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "set_period_list";
    api_req.api_url = "key/license_key_period_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "key/license_key_period_update";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.period_value = this.setKeyPeriodForm.value.SetPeriod;
    TNapi_req.sno_hd =  this.setKeyPeriodSerialNo;
    TNapi_req.concurrent = this.setKeyPeriodForm.value.Concurrent;
     TNapi_req.license_date_update =  this.setKeyPeriodForm.value.licenseKeyUpdate;
    TNapi_req.from_dt = '';
    TNapi_req.to_dt = '';
    api_req.element_data = TNapi_req;
  
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status== true) {
        $('#setKeyPeriodSerialNo_Gr').modal('hide');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
  
      }else{
    
      
      }
  
    });

  }
  set_period_list(){
  let api_req: any = new Object();
  let TNapi_req: any = new Object();
  api_req.moduleType = "set_period_list";
  api_req.api_url = "key/set_period_list";
  api_req.api_type = "web";
  api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  TNapi_req.action = "key/set_period_list";
  TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
  api_req.element_data = TNapi_req;

  this.serverService.sendServer(api_req).subscribe((response: any) => {
    this.spinner.hide();
    if (response.status== true) {
     // this.periodList=response.data;

    }else{
  
    
    }

  });

  }
  concurrent_list(){
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "concurrent_list";
    api_req.api_url = "key/concurrent_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "key/concurrent_list";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = TNapi_req;
  
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status== true) {
       // this.concList=response.data;
  
      }else{
    
      
      }
  
    });
  
    }
  
  onSubmit() {
    const apiRequestGet = {
      moduleType: 'key',
      api_url: 'key/get_license_key',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'key/get_license_key',
        user_id: localStorage.getItem('erp_c4c_user_id'), 
        cnt_val: this.licenseKeyCount,
        p_code: this.productCode,
        p_name: this.productName
      }
    };
    this.serverService.sendServer(apiRequestGet).subscribe(
  
      (response: any) => {
        this.hiddenLicenseKeys = response.data.map((item: { license_key: any; }) => item.license_key);
        this.hiddenProductCodes = response.data.map((item: { product_code: any; }) => item.product_code);
        this.hiddenProductNames = response.data.map((item: { product_name: any; }) => item.product_name);
  
        // Make the hidden fields visible
        this.hiddenFieldsVisible = true;
        this.isSubmitting = true;
      },
      (error) => {
        console.error('Error fetching license key:', error);
      }
    );
  }

  saveLicensekey() {
  
    // Prepare the license key data from hidden fields
    const licenseKeyData = this.hiddenLicenseKeys.map((key, i) => ({
      license_key: key,
      product_code: this.hiddenProductCodes[i],
      product_name: this.hiddenProductNames[i]
    }));
  
    // API request to save the data
    const apiRequestAdd = {
      moduleType: 'key',
      api_url: 'key/license_key_group_addtion',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'key/license_key_group_addtion',
        user_id: localStorage.getItem('erp_c4c_user_id'), 
        license_key_cnt: licenseKeyData
      }
    };
  
      this.serverService.sendServer(apiRequestAdd).subscribe(
      (response: any) => {
        console.log("License Key Added Successfully:", response);
        this.resetForm();
        this.showAddModal = false;
        this.getTransactionNewList({});
        $('#add_licenceKeyGr').modal('hide');      
      },
    );
  }
  
  
    getRepeatedFields() {
      return new Array(this.licenseKeyCount);
    }
    setKeyPeriod(sno:any){
      this.setKeyPeriodSerialNo=sno;
      $('#setKeyPeriodSerialNo_Gr').modal('show');
      this.spinner.show();
  
     
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "key";
    api_req.api_url = "key/get_license_key_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "key/get_license_key_update";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.sno_hd = this.setKeyPeriodSerialNo;
  
    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status== true) {

        $("#setKeyPeriodSerialNo_Gr").modal("show");
        this.setKeyPeriodForm.patchValue({
          'SetPeriod': response.data.key_type,
          'Concurrent': response.data.concurrent,
          'licenseKeyUpdate':1
        })
   
    
      }else{
    
      
      }

    });

    }
    customer(sno:any){
      this.customerSerialNo=sno;
      $('#customerLicenseForm_Gr').modal('show');
    }
    customerUpdate(){
      this.spinner.show();
  
     
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "key";
    api_req.api_url = "key/customer_name_updation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "key/customer_name_updation";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.customer_update_sno_hd = this.customerSerialNo;
    TNapi_req.customer_name = this.customerLicenseForm.value.customerName;
    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status== true) {


        $('#customerLicenseForm_Gr').modal('hide');

        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
         this.customerLicenseForm.reset();
        this.getTransactionNewList({});
       
      }else{
        $('#customerLicenseForm_Gr').modal('hide');
        iziToast.error({
          message: "Updated Failed",
          position: 'topRight'
        });

      }

    });


    }

  
  flushTransaction(sno: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Flush it!'
    }).then((result) => {
      if (result.value) {

       
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "key";
        api_req.api_url = "key/set_license_key_flush";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "key/set_license_key_flush";
        del_req.sno = sno;
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Flushed Successfully",
              position: 'topRight'
            });
            // this.getTransactionNewList({});

          } else {
            Swal.close();
            iziToast.warning({
              message: " Failed",
              position: 'topRight'
            });
            // this.getTransactionNewList({});
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error);
          };
      }
    })
  }
  statusChange(sno: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.value) {

       
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "key";
        api_req.api_url = "key/license_key_status_change";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "key/license_key_status_change";
        del_req.sno = sno;
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Status Changed Successfully",
              position: 'topRight'
            });
            this.getTransactionNewList({});

          } else {
            Swal.close();
            iziToast.warning({
              message: "Status Changed Failed",
              position: 'topRight'
            });
            this.getTransactionNewList({});
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error);
          };
      }
    })
  }
  delete(sno: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {

       
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "deleteLicense";
        api_req.api_url = "key/deleteLicense";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "key/deleteLicense";
        del_req.licenseId = sno;
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.getTransactionNewList({});

          } else {
            Swal.close();
            iziToast.warning({
              message: "Delete Failed",
              position: 'topRight'
            });
            this.getTransactionNewList({});
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error);
          };
      }
    })
  }

}
