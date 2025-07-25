import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { COMMA, ENTER, } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import { NgxSpinnerService } from 'ngx-spinner';
export interface EmailArray {
  emailParameterName: string;
}
export interface FinanceEmailArray {
  financeemailParameterName: string;
}

@Component({
  selector: 'app-customernewall',
  templateUrl: './customernewall.component.html',
  styleUrls: ['./customernewall.component.css']
})
export class CustomernewallComponent implements OnInit {
  @Input() customerList: any[] = [];
  @Input() revenueList: any[] = [];
  @Input() selectedPages: any[] = [];
  @Input() searchDataGlobal: any = '';
  @Input() globalSearchStatus: boolean = false;
  submitted = true;
  //view
  viewCustomerForm: FormGroup;
  isReadOnly: boolean = true;
  nx32TrueFalsePermission: any;
  nx32permissionStatus: any;
  //pagination
  recordNotFound = false;
  pageLimit = 100;
  paginationData: any = { "info": "hide" };
  offset_count = 0;

  //checkbox group
  // checkAll_GroupID_Array=[];
  checkAll_GroupID_Array = Array();
  edit_array: any = [];
  groupSelectCommonId: any;
  checkbox_value: any;
  //add & list
  companyCodeAddCustomer: any;
  CompanyName: any;
  addCustomer: any;
  revenue_list: any;
  allData: any;
  customerType_list: any;
  customerType_listEdit: any;
  displayDynamicData: any;
  customerPermissionList: any;
  billList: any;
  customer_list: any = [];
  paymentList: any;
  departmentData: any;
  departmentDataOut: any;
  cmsDepartmentList: any;
  customerClassificationValue: any;
  permissionValue: any;
  dcIPAllowCountries: any;
  termList: any;
  editCustomerValue: any;
  editCustomerRaw: any;
  specialEditCustomerValue: any;
  specialEditCustomerRaw: any;
  radioDynamic: any;
  radioDynamic_Call4tel: any;
  countryList: any;
  currencyList: any;
  billerName: any;
  searchResult: any;
  searchResultTest: any;
  billerNameList: any;
  errMsg = false;
  //errMsg = true;
  // emailErrMsg = true;
  emailErrMsg = false;
  email_alert: boolean = false;
  finance_email_alert: boolean = false;
  checked: boolean = true;
  isDisabled: boolean = true;
  customerStatus_radiobox_Value: any = '';
  primary_billcode_array: any = [];
  customerStatusEdit: any;
  // customerStatus_radiobox_Value: any = 'New';

  checkbox_EditShippingAddress: boolean = false;
  checkbox_EdShippingAddress: boolean = false;

  // checkbox-customer classification-add
  addCustomerClassificationBillerId: any;
  addCustomerClassificationBiller: any;
  addCustomerClassificationBillerCheckboxID_array: any = [];
  // checkbox-customer classification-edit
  editCustomerClassificationBillerId: any;
  editCustomerClassificationBiller: any;
  editCustomerClassificationBillerCheckboxID_array: any = [];
  //checkbox-add biller name
  addBillerNameBillerId: any;
  addBillerNameBiller: any;
  addBillerNameCheckboxID_array: any = [];
  //checkbox-add biller name
  editBillerNameBillerId: any;
  editBillerNameBiller: any;
  editBillerNameCheckboxID_array: any = [];
  typeConvertionString_editBillName: any;
  typeConvertionString_editCustomerClass: any;
  //checkbox-add -permission
  addPermissionId: any;
  addPermission: any;
  addPermissionCheckboxID_array: any = [];
  //search
  searchCustomerForm: FormGroup;
  CustomerSearchTextValue: any;
  revenueCheckListvalue: any = '';
  //Quick search
  values = '';
  search_CustomerListName: any;
  QuickSearchResultList: any;
  //edit
  editCustomerForm: any;
  customer_primary_code_arr: any;

  get_cust_type: any = [];
  geting_biller: any = [];
  editId: any;
  radio: any;
  b_id: any = [];
  geting_biller_edit: any;
  get_PermissionallList: any;
  get_PermissionEdit: any;
  editPermissionId: any;
  editPermission: any;
  editPermissionCheckboxID_array: any = [];
  //edit checkbox-resellerid
  cal4care1_sg: boolean = false;
  cal4care2_sdn: boolean = false;
  cal4care3_jp: boolean = false;
  cal4care4_none: boolean = false;
  //edit checkbox-resellerid
  cal4care1_sg_add: boolean = false;
  cal4care2_sdn_add: boolean = false;
  cal4care3_jp_add: boolean = false;
  cal4care4_none_add: boolean = false;


  //special edit
  specialEditCustomerForm: FormGroup;
  specialEditId: any;
  //mconnect
  mconnectCustomerForm: FormGroup;
  mconnectParameter: any;
  image_mconnectLogo: any;
  mconnect_Address_add: any;

  checkboxNumber_mconnectAddressShow: any;
  partnerTypeMconn: any;
  //mconnect-new
  mconnect_PartnerEmail_Value: any;
  mconnect_PartnerPhoneNumber_Value: any;
  mconnect_PartnerType_Value_Radio: any;
  mconnect_AddressShowState_Value: any;
  mconnect_Logo_Image: any;
  //mrvoip
  mrvoipParameter: any;
  mrvoipCustomerForm: FormGroup;
  image_mrvoipLogo: any;
  mrvoip_Address_add: any;
  //mrvoip-new
  mrvoip_PartnerEmail_Value: any;
  mrvoip_PartnerPhoneNumber_Value: any;
  mrvoip_PartnerType_Value_Radio: any;
  mrvoip_AddressShowState_Value: any;
  mrvoip_Logo_Image: any;


  //C4T Partner details
  Call4telParameter: any;
  Call4telCustomerForm: FormGroup;
  call4tel_Address_add: any;
  C4T_PartnerEmail_Value: any;
  C4T_PartnerPhoneNumber_Value: any;
  C4T_PartnerType_Value_Radio: any;
  C4T_Logo_Image: any;
  C4T_AddressShowState_Value: any;

  //file attachment
  file: File;
  getResult: any;
  credit_attachment_id: any;
  fileAttachCustomerID: any;
  myFiles: string[] = [];
  myForm: FormGroup;
  //customer share permission
  groupSelect_SharedCustomerPermission: any;
  checkbox_value_SharedCustomerPermission: any;
  edit_array_SharedCustomerPermission_Checkbox: any = [];
  sharedassignVariable: any;

  //invoice
  invoiceSharedEdit1: any = [];
  invoiceSharedCustomerForm: FormGroup;
  invoiceSharedParameter: any;
  //customer status
  isCustomerStatus: boolean = false;
  //employee status
  isEmployeeStatus: boolean = false;
  //reseller status
  isResllerStatus: boolean = false;
  //share customer permission
  ShareCustomerPermissionForm: FormGroup;
  SharedCustomerPermissionArray: any = [];
  shareCustomerPermissionParameter: any;
  shareCustomerPermission_ID: any;

  checkbox_InvoiceShared: boolean = false;
  //NX32 Share customer permission
  customerNX32SharePermissionForm: FormGroup;
  NX32SharePermissionParameter: any;
  checkbox_NX32Permission: boolean = false;
  checkbox_status_nx32Permission: any;
  cms_default_department: any;
  //bill Code edit
  billCodeEditForm1: FormGroup;
  billCodeEditForm2: FormGroup;
  billCodeEditForm3: FormGroup;
  popupBillCodeForm3: FormGroup;
  popupBillCodeForm2: FormGroup;
  billCodeEditForm4: FormGroup;
  public popupBillCode1: FormArray;
  public editBillCodeFormArray: FormGroup;
  public addresses: FormArray;
  public TestPrimary: FormArray;
  test: boolean[] = [];
  itre = 0;
  billCodeResponse: any = [];
  public billCodeFormArray: FormArray;
  primary_code_auto_credit: boolean = true;
  primary_code_manual_credit: boolean = true;
  auto_credit_checkbox_list: boolean = false;
  // isDisabled : boolean;
  edit_a: any;
  edit_b: any;
  //quick email 
  landscapeEmailForm: FormGroup;
  landscapeEmail_Customer_ID: any;
  emailFrom: any;
  emailTo: any;
  subjectValue: any;
  emailTemplate: any;
  msg_id: any;
  From_List: any;
  Template_List: any;
  CRMTemplateID: any;
  cus_type_edit: any;
  addUser: any;
  addUserId: any;
  addUserId_array: any = [];
  addCreditEditId: any;
  //AssignAccountManagerForm
  AssignAccountManagerForm: FormGroup;
  radiobuttonValue_AccountManager: any;
  AssignAccountManager_List: any;
  AssignAccountManager_SelectedUserID: any;
  AssignAccountManager_CustomerID: any;
  //GoogleAuthentication
  GoogleAuthenticationForm: FormGroup;
  googleAuthent_CustomerId: any;
  googleAuthentication_status: any;
  googleAuthentication_customerName: any;
  googleAuthentication_userDetails: any;
  googleAuthentication_customerCode: any;
  googleAuthentication_password: any;
  //cms add
  cmslistadd: any;

  //radio-mconnect,mrvoip,cal4tel
  Partnertype_C4T_radiobox_Value: any;
  //checkbox-shared customer permission-new
  checkbox_ID_SingleParameter_Value: any;
  Checkbox_value: any;
  CheckBox_DynamicArrayList_shareCustomerPermission: any = [];
  shareCustomerPermission_EditOnLoad_Values: any;
  SharedCustomerPermission_List: any;
  typeConvertionString_Shared_Permission: any;
  typeConvertionString_addCustomerClass: any;
  //checkbox-invoice_shared customer permission-new
  invoice_shareCustomerPermission_ID: any;
  checkbox_ID_SingleParameter_invoice_Value: any;
  Checkbox_value_invoice: any;
  CheckBox_DynamicArrayList_invoice_shareCustomerPermission: any = [];
  Invoice_shareCustomerPermission_EditOnLoad_Values: any;
  Invoice_SharedCustomerPermission_List: any;
  typeConvertionString_invoice_Shared_Permission: any;
  // selectedValues
  selectedValues: any;
  customer_list_billerDetails: any;
  customer_list_billercode: any;
  customer_list_colorcode: any;
  test123: any;
  //mail to button
  vig_emailList: any;
  vig_emailList_Array: any = [];
  cmsdepartmentADD_val: any;
  cmsdepartmentEdit_ID: any;
  cmsdepartmentEdit_val: any;
  existing_email: number;

  testing = false;
  customerIDBillCode: any;
  chkAllStatus: any;
  submit_status: boolean = false;
  Clicked: boolean = false;
  defaultBillerID_edit: any;
  dcare: boolean = true;
  response_total_cnt: any;


  constructor(private http: HttpClient, private serverService: ServerService, private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.serverService.global_search_customer.subscribe((val: any) => {
      console.log("before parse", val)
      var k = JSON.parse(val);
      console.log("after parse", k)
      this.customer_list = k;
      console.log(k.type)
      console.log(k.proformalist)
      if (k.type == "hello") {
        this.testing = true;
      } else {
        this.testing = false;
      }
      console.log(this.testing)
    });

    this.billCodeEditForm3 = this.fb.group({
      addresses: this.fb.array([this.editBillCode_FormControl()])
    });

    this.popupBillCodeForm3 = this.fb.group({
      popupBillCode1: this.fb.array([this.popupBillCode_FormControl()])
    });


  }

  dropdownList_billerName: any = [];
  dropdownSettings_billerName = {};

  dropdownList_customerClassification: any = [];
  dropdownSettings_customerClassification = {};

  dropdownList_permissionAdd: any = [];
  permissionDefaultSelect: any = [];
  dropdownSettings_permissionAdd = {};

  dropdownList_DCIP: any = [];
  dropdownSettings_DCIP = {};

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  emailList: EmailArray[] = [];
  financeemailList: FinanceEmailArray[] = [];


  keywordCompanyName = 'customerName';
  data = [
    {
      id: 1,
      name: 'Dakota Gaylord PhD',
      address: '14554 Smith Mews'
    },
    {
      id: 2,
      name: 'Maria Legros',
      address: '002 Pagac Drives'
    },
    {
      id: 3,
      name: 'Brandyn Fritsch',
      address: '8542 Lowe Mountain'
    },
    {
      id: 4,
      name: 'Glenna Ward V',
      address: '1260 Oda Summit'
    },
    {
      id: 5,
      name: 'Jamie Veum',
      address: '5017 Lowe Route'
    }
  ];
  addEmail(event: MatChipInputEvent): void {
    this.email_alert = true;
    console.log(event.value);

    let api_req: any = new Object();
    let email_Validation: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_email_validation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    email_Validation.action = "customer_email_validation";
    email_Validation.user_id = localStorage.getItem('erp_c4c_user_id');
    email_Validation.email = event.value;
    api_req.element_data = email_Validation;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.existing_email = response.email_count;

        if (this.existing_email >= 1) {
          iziToast.error({
            message: "Email exists",
            position: 'topRight'
          });
          Swal.close();
          return 0;

        }
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


    if (event.value.indexOf('@') > 0) {
      var value: any = (event.value || '').trim();

      this.emailErrMsg = true;
    }
    else {
      this.emailErrMsg = false;
    }
    if (value) {

      this.emailList.push({ emailParameterName: value });
    }

    event.chipInput!.clear();
  }

  editEmail(event: MatChipInputEvent): void {
    console.log(event.value)
    if (event.value.indexOf('@') > 0) {
      var value: any = (event.value || '').trim();

      this.emailErrMsg = true;
    }
    else {
      this.emailErrMsg = false;
    }
    if (value) {
      this.emailList.push({ emailParameterName: value });
    }

    event.chipInput!.clear();
  }
  addFinanceEmail(event: MatChipInputEvent): void {
    this.finance_email_alert = true;
    console.log(event.value)

    let api_req: any = new Object();
    let email_Validation: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_email_validation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    email_Validation.action = "customer_email_validation";
    email_Validation.user_id = localStorage.getItem('erp_c4c_user_id');
    email_Validation.email = event.value;
    api_req.element_data = email_Validation;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.existing_email = response.email_count;

        if (this.existing_email >= 1) {
          iziToast.error({
            message: "Email already exists",
            position: 'topRight'
          });
          Swal.close();
          return 0;

        }
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

    if (event.value.indexOf('@') > 0) {
      var value: any = (event.value || '').trim();

      this.errMsg = true;

    }
    else {
      this.errMsg = false;
    }
    if (value) {
      this.financeemailList.push({ financeemailParameterName: value });


    }

    event.chipInput!.clear();
  }
  editFinanceEmail(event: MatChipInputEvent): void {
    // if (event.value.indexOf('@') > 0 && event.value.indexOf('.com') > 0 && event.value != '' || event.value == '' ||   event.value.indexOf('.co.th') > 0 ||   event.value.indexOf('.global') > 0)
    console.log(event.value)
    if (event.value.indexOf('@') > 0) {
      var value: any = (event.value || '').trim();

      this.errMsg = true;

    }
    else {
      this.errMsg = false;
    }
    if (value) {
      this.financeemailList.push({ financeemailParameterName: value });


    }

    event.chipInput!.clear();
  }

  removeEmail(emailDisplay: EmailArray): void {
    const index = this.emailList.indexOf(emailDisplay);

    if (index >= 0) {
      this.emailList.splice(index, 1);
    }
  }
  removeFinanceEmail(financeemailDisplay: FinanceEmailArray): void {
    const index = this.financeemailList.indexOf(financeemailDisplay);
    console.log(index)
    if (index >= 0) {
      this.financeemailList.splice(index, 1);
    }
  }




  ngOnInit(): void {
    if (this.globalSearchStatus == true) {
      console.log("into global search");
      console.log("this.searchDataGlobal", this.globalSearchStatus)

    } else {
      console.log("out of global search");
      console.log("this.searchDataGlobal", this.globalSearchStatus)

    }
    //  this.searchResultTest = this.searchDataGlobal;
    this.customer_list = this.customerList;

    const searchParams = this.serverService.getSearchParams();
    if (searchParams && searchParams.companyName && this.selectedPages.includes('Customer New')) {
      this.searchResultTest = searchParams.companyName;

    } else {
      this.searchResultTest = '';
    }
    console.log("this.searchResultTest-from global search", this.searchResultTest);
    this.customerslist({});
    this.getDynamicList();
    this.cmsDepartmentList1();
    this.getCustomerCode();
    this.cmsDepartmentList1();
    this.initTiny();
    // this.edit_eventCheck_auto_deselect();
    this.checkbox_EditShippingAddress = true;
    this.checkbox_EdShippingAddress = true;
    this.radio = [{ "name": "New", "values1": "N" }, { "name": "Permanent", "values1": "P" }];



    this.departmentData = '[{ "status": true, "result": { "status": true, "data": [ { "department_name": "Sales", "dept_id": "83", "alise_email": "isales@cal4care.com" }, { "department_name": "Activation", "dept_id": "89", "alise_email": "activation@cal4care.com" }, { "department_name": "WebSupport", "dept_id": "90", "alise_email": "Websupport@cal4care.com" }, { "department_name": "CloudNippon", "dept_id": "100", "alise_email": "cc@cloudnippon.com" }, { "department_name": "CallnClear", "dept_id": "97", "alise_email": "cc@callnclear.com" }, { "department_name": "CallaCloud", "dept_id": "99", "alise_email": "CC@callacloud.com" }, { "department_name": "Calncall", "dept_id": "98", "alise_email": "cc@calncall.com" }, { "department_name": "Connectviet", "dept_id": "101", "alise_email": "cc@connectviet.com" }, { "department_name": "Support IN", "dept_id": "102", "alise_email": "Support@dcare.net" }, { "department_name": "Support SG", "dept_id": "103", "alise_email": "Support@cal4care.com" }, { "department_name": "Support SG", "dept_id": "103", "alise_email": "support@cal4care.com.sg" }, { "department_name": "Calncall", "dept_id": "98", "alise_email": "support@calncall.com" }, { "department_name": "Support MY", "dept_id": "104", "alise_email": "support@cal4care.com.my" }, { "department_name": "Support MY", "dept_id": "104", "alise_email": "support@callacloud.com" }, { "department_name": "Support JP", "dept_id": "105", "alise_email": "support@cal4care.co.jp" }, { "department_name": "Support JP", "dept_id": "105", "alise_email": "support@cloudnippon.com" }, { "department_name": "Support TH", "dept_id": "106", "alise_email": "support@cal4care.co.th" }, { "department_name": "Support TH", "dept_id": "106", "alise_email": "support@callnclear.com" }, { "department_name": "Support Call4Tel", "dept_id": "107", "alise_email": "Support@call4tel.com" }, { "department_name": "ACN", "dept_id": "108", "alise_email": "v.support@acncomm.com" }, { "department_name": "Global Sales", "dept_id": "109", "alise_email": "globalsales@mconnectapps.com" }, { "department_name": "WebDev", "dept_id": "110", "alise_email": "webdav@cal4care.com" } ] } }]';
    this.departmentDataOut = JSON.parse(this.departmentData);

    this.specialEditCustomerRaw = ['[ { "email": "vasant@voicetel.co.th,chanakan@voicetel.co.th,siraswaya@voicetel.co.th", "finance_email": "vasant@voicetel.co.th,chanakan@voicetel.co.th,siraswaya@voicetel.co.th", "system_discount_3cx": 1, "stripe_recurring_state": 0, "licence_buy_override": 0 }, { "previous_invoice_bill": 7692.75 }, { "pending_bill_days": 20 } ]'];
    this.specialEditCustomerValue = JSON.parse(this.specialEditCustomerRaw);
    this.radioDynamic = [{ "name": "Distributor", "alicename": "PremiumPartner", "values": "prem" }, { "name": "Reseller", "alicename": "AffiliatePartner", "values": "affi" }];
    this.radioDynamic_Call4tel = [{ "nameCT": "Reseller", "valuesCT": "prem" }, { "nameCT": "Distributor", "valuesCT": "affi" }];
    this.dropdownSettings_billerName = {
      singleSelection: false,
      idField: 'billerId',
      textField: 'billerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
    // if(localStorage.getItem('login_status')=='1'){
    //   localStorage.setItem('login_status','0');

    //   window.location.reload();


    // }
    this.dropdownSettings_customerClassification = {
      singleSelection: false,
      idField: 'customerClassificationId',
      textField: 'customerClassificationName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.dropdownList_customerClassification = [
      { customerClassificationId: 1, customerClassificationName: 'Calncall' },
      { customerClassificationId: 2, customerClassificationName: 'Callacloud' },
      { customerClassificationId: 3, customerClassificationName: 'Voip' },
      { customerClassificationId: 4, customerClassificationName: 'ITCare' },
      { customerClassificationId: 5, customerClassificationName: 'Support' },
      { customerClassificationId: 6, customerClassificationName: 'Cloud Nippon' },
      { customerClassificationId: 7, customerClassificationName: 'Mrvoip' },
      { customerClassificationId: 8, customerClassificationName: 'Call4Tel' }
    ];

    this.dropdownList_permissionAdd = [

      { permissionId: 101, permissionName: 'Inv' },
      { permissionId: 102, permissionName: 'Credit Note' },
      { permissionId: 103, permissionName: 'License' },
      { permissionId: 105, permissionName: 'Phone' },
      { permissionId: 104, permissionName: 'Project' },
      { permissionId: 107, permissionName: 'Leads' },
      { permissionId: 108, permissionName: 'RMA Issues' },
      { permissionId: 109, permissionName: 'Call History' },
      { permissionId: 134, permissionName: 'IDD Price list' },
      { permissionId: 110, permissionName: 'User Mgt' },
      { permissionId: 118, permissionName: '3CX Buy' },
      { permissionId: 158, permissionName: 'License Renewal Reminder' },
      { permissionId: 159, permissionName: 'Deal Registeration' },
      { permissionId: 160, permissionName: 'GCC Firewall' },
      { permissionId: 131, permissionName: 'Reseller Product Price' },
      { permissionId: 138, permissionName: 'Call4tel License' },
      { permissionId: 124, permissionName: 'mConnect Buy' },
      { permissionId: 106, permissionName: 'Phone Edit' },
      { permissionId: 114, permissionName: 'DNC' },
      { permissionId: 115, permissionName: 'Mrviop' },
      { permissionId: 117, permissionName: 'Call4tel Address Show' },
      { permissionId: 161, permissionName: 'Mconnect Address Show' },
      { permissionId: 130, permissionName: 'Generate Invoice' },
      { permissionId: 132, permissionName: 'VS Credit Report' },
      { permissionId: 133, permissionName: 'View Shared DO' },
      { permissionId: 136, permissionName: 'CMS Balance Show' },
      { permissionId: 137, permissionName: 'Min Balance Mail Alert' },
      { permissionId: 156, permissionName: 'NX32 Access' },
      { permissionId: 155, permissionName: 'NX32 Logo Update (OEM)' },
      { permissionId: 157, permissionName: 'CMS Ticket' },

    ];
    this.permissionDefaultSelect = [

      { permissionId: 101, permissionName: 'Inv' },
      { permissionId: 102, permissionName: 'Credit Note' },
      { permissionId: 103, permissionName: 'License' },
      { permissionId: 109, permissionName: 'Call History' },
      { permissionId: 134, permissionName: 'IDD Price list' },

    ];

    this.dropdownSettings_permissionAdd = {
      singleSelection: false,
      idField: 'permissionId',
      textField: 'permissionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };

    //view
    this.viewCustomerForm = new FormGroup({
      'view_company_Name': new FormControl(null),
      'v_billingAddress_address1': new FormControl(null),
      'v_billingAddress_address2': new FormControl(null),
      'v_billingAddress_city': new FormControl(null),
      'v_billingAddress_state': new FormControl(null),
      'view_BA_countryname': new FormControl(null),
      'v_ESA_phone': new FormControl(null),
      'v_ESA_MobilePhone': new FormControl(null),
      'v_ESA_GSTNO': new FormControl(null),
      'v_ESA_FAX': new FormControl(null),
      'v_ESA_Email': new FormControl(null),
      'v_contact_person_CP': new FormControl(null),
      'v_bank_acc_name': new FormControl(null),
      'v_bank_acc_number': new FormControl(null),
      'v_reseller_status': new FormControl(null),
    });
    this.searchCustomerForm = new FormGroup({
      'searchtext': new FormControl(null),
      'RevenueTypeWiseShow': new FormControl(null),
    });
    //add modal
    this.addCustomer = new FormGroup({
      'company_Code': new FormControl(null),
      'company_Name': new FormControl(null, [Validators.required]),
      'companyCode': new FormControl(null),
      'defaultBillerName': new FormControl(null, [Validators.required]),
      'BA_countryname': new FormControl(null),
      // 'ESA_countryname': new FormControl(null),
      'bank_countryname': new FormControl(null),
      'countryname': new FormControl(null),
      'currencyname': new FormControl(null),
      'cmsdepartment_add': new FormControl(null),
      'payment_way': new FormControl(null),
      'permissiondisplay': new FormControl(null),
      'dcipcountryform': new FormControl(null),
      'addCustomerStatus': new FormControl(null),
      'billername_vignesh': new FormControl(null),
      'add_billerName': new FormControl(null, [Validators.required]),
      'add_customerClassification': new FormControl(null, [Validators.required]),
      'permissionFCAdd': new FormControl(null),
      'permission_vignesh': new FormControl(null),
      'customerClassificationn': new FormControl(null),
      'billingAddress_contactPerson': new FormControl(null, [Validators.required]),
      'billingAddress_address1': new FormControl(null),
      'billingAddress_address2': new FormControl(null),
      'billingAddress_city': new FormControl(null),
      'billingAddress_state': new FormControl(null),
      'billingAddress_zipcode': new FormControl(null),
      'edit_ship_address': new FormControl(null),
      'ESA_cntPerson': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_shipto': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_address1': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_address2': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_city': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_state': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_zipcode': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_countryname': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_premium': new FormControl(null),
      'ESA_premiumStatus': new FormControl(null),
      'ESA_phone': new FormControl(null),
      'ESA_MobilePhone': new FormControl(null),
      'ESA_FAX': new FormControl(null),
      'ESA_GSTNO': new FormControl(null),
      'ESA_websiteName': new FormControl(null),
      'ESA_Email': new FormControl(null),
      'ESA_FinanceEmail': new FormControl(null),
      'ESA_customerLimit_add': new FormControl(null),
      'ESA_c3cxResellerId_add': new FormControl(null),
      'discount_percentage': new FormControl(null),
      'banking_charge': new FormControl(null),
      'stripe_customer_id': new FormControl(null),
      'stripe_recurr_payment': new FormControl(null),
      'c3cx_system_discount': new FormControl(null),
      'shopping_gst': new FormControl(null),
      'send_invoice': new FormControl(null),
      'contact_person_CP': new FormControl(null, [Validators.required]),
      'bank_acc_no': new FormControl(null),
      'bank_account_number': new FormControl(null),
      'customer_status': new FormControl(null),
      'reseller_status': new FormControl(null),
      'voip_switch_credit': new FormControl(null),
      'common_group_name': new FormControl(null),
      'ESA_email': new FormControl(null, [Validators.email]),



    });

    //edit
    this.editCustomerForm = new FormGroup({

      'e_company_Code': new FormControl(null),
      'edit_company_Name': new FormControl(null),
      'edit_defaultBillerName': new FormControl(null),
      'edit_billernamelist': new FormControl(null),
      'editCustomerClassification': new FormControl(null),

      'e_billingAddress_contactPerson': new FormControl(null),
      'e_billingAddress_address1': new FormControl(null),
      'e_billingAddress_address2': new FormControl(null),
      'e_billingAddress_city': new FormControl(null),
      'e_billingAddress_state': new FormControl(null),
      'e_billingAddress_zipcode': new FormControl(null),
      'Edit_BA_countryname': new FormControl(null),
      'e_edit_ship_address': new FormControl(null),
      'e_ESA_cbk': new FormControl(null),
      'e_ESA_cntPerson': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_shipto': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_address1': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_address2': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_city': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_state': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_zipcode': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_countryname': new FormControl({ value: '', disabled: true }, Validators.required),
      'e_ESA_premium': new FormControl(null),
      'e_ESA_premiumStatus': new FormControl(null),
      'e_ESA_phone': new FormControl(null),
      'e_ESA_MobilePhone': new FormControl(null),
      'e_ESA_FAX': new FormControl(null),
      'e_ESA_GSTNO': new FormControl(null),
      'e_ESA_websiteName': new FormControl(null),
      'e_ESA_Email': new FormControl(null),
      'e_ESA_FinanceEmail': new FormControl(null),
      'edit_permission': new FormControl(null),
      'edit_cmsdepartment': new FormControl(null),
      'update_cmsDepartment': new FormControl(null),
      'e_ESA_customerLimit': new FormControl(null),
      'e_ESA_c3cxResellerId': new FormControl(null),
      'edit_currencyname': new FormControl(null),
      'e_stripe_customer_id': new FormControl(null),
      'e_stripe_recurr_payment': new FormControl(null),
      'e_c3cx_system_discount': new FormControl(null),
      'e_discount_percentage': new FormControl(null),
      'e_custBankingCharge': new FormControl(null),
      'e_banking_charge': new FormControl(null),
      'e_shopping_gst': new FormControl(null),
      'e_send_invoice': new FormControl(null),
      'e_contact_person_CP': new FormControl(null),
      'e_bank_acc_name': new FormControl(null),
      'e_bank_acc_no': new FormControl(null),
      'e_editCustomerStatus': new FormControl(null),
      'e_reseller_status': new FormControl(null),
      'e_voip_switch_credit': new FormControl(null),
      'e_custAddressUpdateState': new FormControl(null),
      'edit_payment_way': new FormControl(null),
      'e_vsProvisionAttachment': new FormControl(null),
      'DCIP_edit': new FormControl(null),

    });
    this.specialEditCustomerForm = new FormGroup({

      'spedit_Email': new FormControl(null),
      'spedit_FinanceEmail': new FormControl(null),
      'termconditionDD': new FormControl(null),
      'spedit_creditlimit': new FormControl(null),
      'spedit_stripe_customer_id': new FormControl(null),
      'spedit_C3CXResellerId': new FormControl(null),
      'spedit_stripe_recurr_payment': new FormControl(null),
      'spedit_c3cx_system_discount': new FormControl(null),
      'spedit_discount_percentage': new FormControl(null),
      'spedit_C3CXLicencepurchase': new FormControl(null),
      'spedit_3cx_BuySpecial': new FormControl(null)
    });
    this.mconnectCustomerForm = new FormGroup({
      'a_mconnectAddressShow': new FormControl(null),
      'a_mconnectPartnerEmail': new FormControl(null),
      'a_mconnectPartnerPhoneNum': new FormControl(null),
      'a_mconnectPartnerType': new FormControl(null),
      'a_selectLogo_mconnect': new FormControl(null),
      'a_selectLogoImage_MrVoip': new FormControl(null),

    });
    this.mrvoipCustomerForm = new FormGroup({
      'a_MrvoipAddressShow': new FormControl(null),
      'a_MrvoipPartnerEmail': new FormControl(null),
      'a_MrvoipPartnerPhoneNum': new FormControl(null),
      'a_MrvoipPartnerType': new FormControl(null),
      // 'a_selectLogo_MrVoip': new FormControl(null),
    });
    this.Call4telCustomerForm = new FormGroup({
      'a_C4TAddressShow': new FormControl(null),
      'a_C4TPartnerEmail': new FormControl(null),
      'a_C4TPartnerPhoneNum': new FormControl(null),
      'a_C4TPartnerType': new FormControl(null),
      'a_selectLogo_C4T': new FormControl(null),
    });
    this.invoiceSharedCustomerForm = new FormGroup({
      'invShared_checklist': new FormControl(null),
      'check1': new FormControl(null),
    });

    this.ShareCustomerPermissionForm = new FormGroup({
      'shareCustomerPermission_checklist': new FormControl(null),
      'oneInputControl': new FormControl(null),

    });

    this.customerNX32SharePermissionForm = new FormGroup({
      'nx32CustomerPermission_checklist': new FormControl(null),

    });
    this.myForm = new FormGroup({
      'file': new FormControl(null),

    });
    this.AssignAccountManagerForm = new FormGroup({
      'radio_AssignAccountManager': new FormControl(null),

    });
    this.GoogleAuthenticationForm = new FormGroup({
      'google_AuthenticationCode': new FormControl(null),
      'GA_customerName': new FormControl(null),
      'GA_userDetails': new FormControl(null),
      'GA_password': new FormControl(null),

    });


    this.billCodeEditForm2 = new FormGroup({


      'primary_customer_bill_code_id': new FormControl(null),
      'primary_code_740': new FormControl(null),
      'primary_code_retail_740': new FormControl(null),
      'low_credit_740': new FormControl(null),
      'high_credit_740': new FormControl(null),
      'retail_low_credit_740': new FormControl(null),
      'retail_high_credit_740': new FormControl(null),


      'primary_code_750': new FormControl(null),
      'primary_code_retail_750': new FormControl(null),
      'low_credit_750': new FormControl(null),
      'high_credit_750': new FormControl(null),
      'retail_low_credit_750': new FormControl(null),
      'retail_high_credit_750': new FormControl(null),


      'primary_code_kl': new FormControl(null),
      'primary_code_retail_kl': new FormControl(null),
      'low_credit_kl': new FormControl(null),
      'high_credit_kl': new FormControl(null),
      'retail_low_credit_kl': new FormControl(null),
      'retail_high_credit_kl': new FormControl(null),

      'primary_code_sg': new FormControl(null),
      'primary_code_retail_sg': new FormControl(null),
      'low_credit_sg': new FormControl(null),
      'high_credit_sg': new FormControl(null),
      'retail_low_credit_sg': new FormControl(null),
      'retail_high_credit_sg': new FormControl(null),

      'primary_code_auto_credit': new FormControl(null),


      'server_name_740': new FormControl(null),
      'pbx_threshold_limit_740': new FormControl(null),
      'retail_threshold_limit_740': new FormControl(null),

      'server_name_750': new FormControl(null),
      'pbx_threshold_limit_750': new FormControl(null),
      'retail_threshold_limit_750': new FormControl(null),

      'server_name_kl': new FormControl(null),
      'pbx_threshold_limit_kl': new FormControl(null),
      'retail_threshold_limit_kl': new FormControl(null),

      'server_name_sg': new FormControl(null),
      'pbx_threshold_limit_sg': new FormControl(null),
      'retail_threshold_limit_sg': new FormControl(null),

      'manual_credit': new FormControl(null),

    });


    this.popupBillCodeForm2 = new FormGroup({

      'popup_primary_customer_bill_code_id': new FormControl(null),
      'popup_primary_code_740': new FormControl(null),
      'popup_low_credit_740': new FormControl(null),
      'popup_high_credit_740': new FormControl(null),
      'popup_retail_low_credit_740': new FormControl(null),
      'popup_retail_high_credit_740': new FormControl(null),


      'popup_primary_code_750': new FormControl(null),
      'popu_primary_code_retail_750': new FormControl(null),
      'popup_low_credit_750': new FormControl(null),
      'popup_high_credit_750': new FormControl(null),
      'popup_retail_low_credit_750': new FormControl(null),
      'popup_retail_high_credit_750': new FormControl(null),


      'popup_primary_code_kl': new FormControl(null),
      'popup_primary_code_retail_kl': new FormControl(null),
      'popup_low_credit_kl': new FormControl(null),
      'popup_high_credit_kl': new FormControl(null),
      'popup_retail_low_credit_kl': new FormControl(null),
      'popup_retail_high_credit_kl': new FormControl(null),

      'popup_primary_code_sg': new FormControl(null),
      'popup_primary_code_retail_sg': new FormControl(null),
      'popup_low_credit_sg': new FormControl(null),
      'popup_high_credit_sg': new FormControl(null),
      'popup_retail_low_credit_sg': new FormControl(null),
      'popup_retail_high_credit_sg': new FormControl(null),

      'popup_primary_code_auto_credit': new FormControl(null),


      'popup_server_name_740': new FormControl(null),
      'popup_pbx_threshold_limit_740': new FormControl(null),
      'popup_retail_threshold_limit_740': new FormControl(null),

      'popup_server_name_750': new FormControl(null),
      'popup_primary_code_retail_750': new FormControl(null),
      'popup_pbx_threshold_limit_750': new FormControl(null),
      'popup_retail_threshold_limit_750': new FormControl(null),

      'popup_server_name_kl': new FormControl(null),
      'popup_pbx_threshold_limit_kl': new FormControl(null),
      'popup_retail_threshold_limit_kl': new FormControl(null),

      'popup_server_name_sg': new FormControl(null),
      'popup_pbx_threshold_limit_sg': new FormControl(null),
      'popup_retail_threshold_limit_sg': new FormControl(null),

      'popup_customerId': new FormControl(null),
      'popup_manual_credit': new FormControl(null),

    });

    this.billCodeEditForm4 = new FormGroup({

      'add_pbx_or_retail': new FormControl(null),
      'add_credit_value_for_740': new FormControl(null),
      'add_credit_value_for_750': new FormControl(null),
      'add_credit_value_for_KL': new FormControl(null),
    });

    this.landscapeEmailForm = new FormGroup({
      'landscapeEmail_From': new FormControl(null),
      'landscapeEmail_To': new FormControl(null),
      'landscapeEmail_Subject': new FormControl(null),
      'landscapeEmail_Template': new FormControl(null),
      'landscapeEmail_Message': new FormControl(null),
    });
    this.customer_list = this.customerList;
    console.log("this.customerList", this.customerList);

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['customerList'] && changes['customerList'].currentValue && this.selectedPages.includes('Customer New')) {
  //     this.customer_list = changes['customerList'].currentValue;
  //   }
  // }
  ngOnChanges(changes: SimpleChanges): void {
    const isCustomerNew = this.selectedPages.includes('Customer New');

    if (
      isCustomerNew &&
      changes['customerList'] &&
      changes['customerList'].currentValue &&
      this.globalSearchStatus // ✅ only assign if searchData is not empty
    ) {
      this.customer_list = changes['customerList'].currentValue;
    }

    // Optional: clear data if modal is closed and searchData is cleared
    if (
      isCustomerNew &&
      changes['searchDataGlobal'] &&
      changes['searchDataGlobal'].currentValue === ''
    ) {
      this.customer_list = [];
    }
  }

  closeModalView() {

    $('#viewCustomerFormId_CM').modal('hide');
  }


  get addressControls() {
    return this.billCodeEditForm3.get('addresses') as FormArray
  }




  editBillCode(): void {

    this.addresses = this.billCodeEditForm3.get('addresses') as FormArray;
    this.addresses.push(this.editBillCode_FormControl());

    this.itre = this.itre + 1;
    console.log(this.addresses);
    console.log(this.itre);
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      console.log(this.test[index]);


    });
  }

  editBillCode_FormControl(): FormGroup {
    return this.fb.group({

      billCodeName: '',
      bill_code_740: '',
      bill_code_kl: '',
      bill_code_750: '',
      bill_code_750_8: '',
      bill_code_sg: '',
      customer_bill_code_id: '',
      conn_state: '',
      customer_id: '',
    });

  }
  // removeAddress1(i: number) {

  //   this.addresses.removeAt(i);


  // }


  removeAddress1(i: number) {

    console.log('iiii--' + i)
    console.log(this.addresses)
    console.log("this.billCodeEditForm3.value.addresses", this.billCodeEditForm3.value.addresses)
    var customer_bill_code_id = $('#customer_bill_code_id' + i).val();
    var cust_id = $('#customer_id' + i).val();
    // console.log('pd_billchild_id'+pd_billchild_id);

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
        // this.billCodeEditForm3.value.addresses.splice(i, 1);


        const addressesArray = this.billCodeEditForm3.get('addresses') as FormArray;
        addressesArray.removeAt(i);

        // this.billCodeEditForm3.value.addresses.removeAt(i);
        // var addr = this.addPI_section2.value.addresses;
        // var list_cnt = addr.length;



        let api_req: any = new Object();
        let api_billCoDel_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_billcodeDeleteRow";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_billCoDel_req.action = "customer_billcodeDeleteRow";
        api_billCoDel_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_billCoDel_req.customer_id = cust_id;
        api_billCoDel_req.customer_bill_code_id = customer_bill_code_id;
        api_req.element_data = api_billCoDel_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          console.log("response", response);


        });





      }
    })


  }

  get popupaddressControls() {
    return this.popupBillCodeForm3.get('popupBillCode1') as FormArray
  }



  popupBillCode(): void {

    this.popupBillCode1 = this.popupBillCodeForm3.get('popupBillCode1') as FormArray;
    this.popupBillCode1.push(this.popupBillCode_FormControl());

    this.itre = this.itre + 1;
    console.log(this.popupBillCode1);
    console.log(this.itre);
    this.popupaddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      console.log(this.test[index]);


    });
  }

  popupBillCode_FormControl(): FormGroup {
    return this.fb.group({

      popup_billCodeName: '',
      popup_bill_code_740: '',
      popup_bill_code_kl: '',
      popup_bill_code_750: '',
      popup_bill_code_750_8: '',
      popup_bill_code_sg: '',

      popup_customer_bill_code_id: '',
      popup_conn_state: '',
      popup_customer_id: '',

    });

  }
  removeAddress2(i: number) {

    this.popupBillCode1.removeAt(i);
  }


  onItemSelect(billerName: any) {
    console.log(billerName);
  }

  onSelectAll(billerNameAll: any) {
    console.log(billerNameAll);
  }
  onItemSelectCC(cc: any) {
    console.log("1 check", cc);
  }
  onSelectAllCC(ccAll: any) {
    console.log(ccAll);
  }
  onItemSelectPA(PAname: any) {
    console.log(PAname);
  }
  onSelectAllPA(PAnameAll: any) {
    console.log(PAnameAll);
  }


  autoCreditCheckList() {

    this.auto_credit_checkbox_list = !this.auto_credit_checkbox_list
  }

  // checkbox_EditShippingAddress: any;
  eventCheck(event: any) {
    this.checkbox_EditShippingAddress = event.target.checked;
    console.log(this.eventCheck)

    if (this.checkbox_EditShippingAddress) {

      this.addCustomer.get("ESA_shipto").disable();
      this.addCustomer.get("ESA_address1").disable();
      this.addCustomer.get("ESA_address2").disable();
      this.addCustomer.get("ESA_city").disable();
      this.addCustomer.get("ESA_state").disable();
      this.addCustomer.get("ESA_cntPerson").disable();
      this.addCustomer.get("ESA_zipcode").disable();
      this.addCustomer.get("ESA_countryname").disable();
    }
    else {

      this.addCustomer.get("ESA_shipto").enable();
      this.addCustomer.get("ESA_address1").enable();
      this.addCustomer.get("ESA_address2").enable();
      this.addCustomer.get("ESA_city").enable();
      this.addCustomer.get("ESA_state").enable();
      this.addCustomer.get("ESA_cntPerson").enable();
      this.addCustomer.get("ESA_zipcode").enable();
      this.addCustomer.get("ESA_countryname").enable();

    }
    console.log(this.checkbox_EditShippingAddress)
  }


  // checkbox_EdShippingAddress: any;
  edit_eventCheck(event: any) {
    this.checkbox_EdShippingAddress = event.target.checked;
    console.log(this.checkbox_EdShippingAddress)

    if (this.checkbox_EdShippingAddress) {
      // console.log(this.editCustomerForm.get('e_ESA_cntPerson').disable())
      this.editCustomerForm.get("e_ESA_cntPerson").disable();
      this.editCustomerForm.get("e_ESA_address1").disable();
      this.editCustomerForm.get("e_ESA_address2").disable();
      this.editCustomerForm.get("e_ESA_city").disable();
      this.editCustomerForm.get("e_ESA_state").disable();
      this.editCustomerForm.get("e_ESA_shipto").disable();
      this.editCustomerForm.get("e_ESA_zipcode").disable();
      this.editCustomerForm.get("e_ESA_countryname").disable();
    }
    else {
      // console.log(this.editCustomerForm.get('DCIP_edit'))
      this.editCustomerForm.get("e_ESA_cntPerson").enable();
      this.editCustomerForm.get("e_ESA_address1").enable();
      this.editCustomerForm.get("e_ESA_address2").enable();
      this.editCustomerForm.get("e_ESA_city").enable();
      this.editCustomerForm.get("e_ESA_state").enable();
      this.editCustomerForm.get("e_ESA_shipto").enable();
      this.editCustomerForm.get("e_ESA_zipcode").enable();
      this.editCustomerForm.get("e_ESA_countryname").enable();

    }
    console.log(this.checkbox_EdShippingAddress)

  }
  // checkbox_EdShippingAddress: any---default auto deselect;
  edit_eventCheck_auto_deselect() {

    this.checkbox_EditShippingAddress = true;
    if (this.checkbox_EdShippingAddress == true) {

      this.editCustomerForm.controls['e_ESA_cntPerson'].disable();
      this.editCustomerForm.controls['e_ESA_address1'].disable();
      this.editCustomerForm.controls['e_ESA_address2'].disable();
      this.editCustomerForm.controls['e_ESA_city'].disable();
      this.editCustomerForm.controls['e_ESA_state'].disable();
      this.editCustomerForm.controls['e_ESA_shipto'].disable();
      this.editCustomerForm.controls['e_ESA_zipcode'].disable();
      this.editCustomerForm.controls['e_ESA_countryname'].disable();
    }
    else {

      this.editCustomerForm.controls['e_ESA_cntPerson'].enable();
      this.editCustomerForm.controls['e_ESA_address1'].enable();
      this.editCustomerForm.controls['e_ESA_address2'].enable();
      this.editCustomerForm.controls['e_ESA_city'].enable();
      this.editCustomerForm.controls['e_ESA_state'].enable();
      this.editCustomerForm.controls['e_ESA_shipto'].enable();
      this.editCustomerForm.controls['e_ESA_zipcode'].enable();
      this.editCustomerForm.controls['e_ESA_countryname'].enable();


    }
    console.log(this.checkbox_EdShippingAddress)

  }




  createBillCode(): FormGroup {
    return this.fb.group({
      billCode_Name: '',
      billCode_Server_VS1: '',
      billCode_Server_VSKL: '',
      billCode_Server_VS2_32: '',
      billCode_Server_VS2_8: '',



    });
  }
  get billCodeEditControls() {
    return this.billCodeEditForm1.get('billCodeGroupRow') as FormArray
  }
  addBillCodeGroup(): void {
    this.billCodeFormArray = this.billCodeEditForm1.get('billCodeFormArray') as FormArray;
    this.billCodeFormArray.push(this.createBillCode());
  }

  removeAddress(i: number) {
    this.billCodeFormArray.removeAt(i);
  }
  checkbox_premiumStatus: any;
  eventCheckPremiumStatus(event: any) {
    this.checkbox_premiumStatus = event.target.checked;
    console.log(this.checkbox_premiumStatus)
  }
  checkbox_SRP: any;
  eventCheckSRP(event: any) {
    this.checkbox_SRP = event.target.checked;
    console.log(this.checkbox_SRP)
  }
  checkbox_3CXSD: any;
  eventCheck3CXSD(event: any) {
    this.checkbox_3CXSD = event.target.checked;
    console.log(this.checkbox_3CXSD)
  }
  checkbox_shopGST: any;
  eventCheckshoppingGST(event: any) {
    this.checkbox_shopGST = event.target.checked;
    console.log(this.checkbox_shopGST)
  }
  checkbox_invoice: any;
  eventCheckIncoice(event: any) {
    this.checkbox_invoice = event.target.checked;
    console.log(this.checkbox_invoice)
  }
  checkbox_resellerStatus: any;
  eventCheckRS(event: any) {
    this.checkbox_resellerStatus = event.target.checked;
    console.log(this.checkbox_resellerStatus)
  }
  checkbox_voipSwitchCredit: any;
  eventCheckVSC(event: any) {
    this.checkbox_voipSwitchCredit = event.target.checked;
    console.log(this.checkbox_voipSwitchCredit)
  }
  checkbox_specialEditSRP: any;
  eventCheck_spedit_SRP(event: any) {
    this.checkbox_specialEditSRP = event.target.checked;
    console.log(this.checkbox_specialEditSRP)
  }

  checkbox_specialEditSystemDiscount: any;
  eventCheck_spedit_systemDiscount(event: any) {
    this.checkbox_specialEditSystemDiscount = event.target.checked;
    console.log(this.checkbox_specialEditSystemDiscount)
  }

  checkbox_specialEdit3cxSpecialOption: any;
  eventCheck_spedit_3cxspecialOption(event: any) {
    this.checkbox_specialEdit3cxSpecialOption = event.target.checked;
    console.log(this.checkbox_specialEdit3cxSpecialOption)
  }

  checkbox_custBankingCharge: any;
  eventCheck_CustBankingCharge(event: any) {
    this.checkbox_custBankingCharge = event.target.checked;
    console.log(this.checkbox_custBankingCharge)
  }

  checkbox_CAUS: any;
  eventCheckCAUS(event: any) {
    this.checkbox_CAUS = event.target.checked;
    console.log(this.checkbox_CAUS)
  }
  cmsdepartmentADD_ID: any;
  cmsdepartmentADD_Value: any;

  cmsdepartmentADD(event: any) {

    console.log("cms event", event)
    var test = event.target.value;
    var test2: any = [];
    test2 = test.split(',');
    console.log("test2", test2)
    this.cmsdepartmentADD_ID = test2[0];
    this.cmsdepartmentADD_val = test2[1];

    console.log("this.cmsdepartmentADD_ID", this.cmsdepartmentADD_ID);
    console.log("this.cmsdepartmentADD_ID", this.cmsdepartmentADD_val);

  }
  cmsdepartmentEdit(event: any) {

    console.log("cms event", event)
    var testf = event.target.value;
    var test21: any = [];
    test21 = testf.split(',');
    console.log("test21", test21)
    this.cmsdepartmentEdit_ID = test21[0];
    this.cmsdepartmentEdit_val = test21[1];

    console.log("this.cmsdepartmentEdit_ID", this.cmsdepartmentEdit_ID);
    console.log("this.cmsdepartmentEdit_val", this.cmsdepartmentEdit_val);

  }


  eventCheckC4TAddressShow(event: any) {
    this.C4T_AddressShowState_Value = event.target.checked;
    console.log("this.checkbox_C4TAddressShow", this.C4T_AddressShowState_Value)
  }


  eventCheckMrvoipAddressShow(event: any) {
    this.mrvoip_AddressShowState_Value = event.target.checked;
    console.log(this.mrvoip_AddressShowState_Value)
  }

  eventCheckmconnectAddressShow(event: any) {
    this.mconnect_AddressShowState_Value = event.target.checked;
    console.log(this.mconnect_AddressShowState_Value)
    // this.checkboxNumber_mconnectAddressShow = Number(this.checkbox_mconnectAddressShow);
    // console.log(" checkbox 1 or 0---:", this.checkboxNumber_mconnectAddressShow)
  }
  checkbox_RSsearch: any;
  eventCheckRSsearch(event: any) {
    this.checkbox_RSsearch = event.target.checked;
    console.log(this.checkbox_RSsearch)
  }


  eventCheckSharedCustomerPermission(data: any, event: any) {

    this.groupSelect_SharedCustomerPermission = data;
    this.checkbox_value_SharedCustomerPermission = event.target.checked;
    console.log(this.checkbox_value_SharedCustomerPermission)
    if (this.checkbox_value_SharedCustomerPermission) {

      this.edit_array_SharedCustomerPermission_Checkbox.push(data);
      console.log("Final Checkbox After checkbox selected list", this.edit_array_SharedCustomerPermission_Checkbox);
    }
    else {
      const index = this.edit_array_SharedCustomerPermission_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_SharedCustomerPermission_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_SharedCustomerPermission_Checkbox)

    }
  }

  autoCreditPermission(event: any) {
    this.primary_code_auto_credit = event.target.checked;

    console.log(this.primary_code_auto_credit)
    if (this.primary_code_auto_credit) {

      this.billCodeEditForm2.get('low_credit_740')?.enable();
      this.billCodeEditForm2.get('high_credit_740')?.enable();
      this.billCodeEditForm2.get('retail_low_credit_740')?.enable();
      this.billCodeEditForm2.get('retail_high_credit_740')?.enable();

      this.billCodeEditForm2.get('low_credit_750')?.enable();
      this.billCodeEditForm2.get('high_credit_750')?.enable();
      this.billCodeEditForm2.get('retail_low_credit_750')?.enable();
      this.billCodeEditForm2.get('retail_high_credit_750')?.enable();

      this.billCodeEditForm2.get('low_credit_kl')?.enable();
      this.billCodeEditForm2.get('high_credit_kl')?.enable();
      this.billCodeEditForm2.get('retail_low_credit_kl')?.enable();
      this.billCodeEditForm2.get('retail_high_credit_kl')?.enable();



      this.popupBillCodeForm2.get('popup_low_credit_740')?.enable();
      this.popupBillCodeForm2.get('popup_high_credit_740')?.enable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_740')?.enable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_740')?.enable();

      this.popupBillCodeForm2.get('popup_low_credit_750')?.enable();
      this.popupBillCodeForm2.get('popup_high_credit_750')?.enable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_750')?.enable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_750')?.enable();

      this.popupBillCodeForm2.get('popup_low_credit_kl')?.enable();
      this.popupBillCodeForm2.get('popup_high_credit_kl')?.enable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_kl')?.enable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_kl')?.enable();

    }

    else {

      this.billCodeEditForm2.get('low_credit_740')?.disable();
      this.billCodeEditForm2.get('high_credit_740')?.disable();
      this.billCodeEditForm2.get('retail_low_credit_740')?.disable();
      this.billCodeEditForm2.get('retail_high_credit_740')?.disable();

      this.billCodeEditForm2.get('low_credit_750')?.disable();
      this.billCodeEditForm2.get('high_credit_750')?.disable();
      this.billCodeEditForm2.get('retail_low_credit_750')?.disable();
      this.billCodeEditForm2.get('retail_high_credit_750')?.disable();

      this.billCodeEditForm2.get('low_credit_kl')?.disable();
      this.billCodeEditForm2.get('high_credit_kl')?.disable();
      this.billCodeEditForm2.get('retail_low_credit_kl')?.disable();
      this.billCodeEditForm2.get('retail_high_credit_kl')?.disable();


      this.popupBillCodeForm2.get('popup_low_credit_740')?.disable();
      this.popupBillCodeForm2.get('popup_high_credit_740')?.disable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_740')?.disable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_740')?.disable();

      this.popupBillCodeForm2.get('popup_low_credit_750')?.disable();
      this.popupBillCodeForm2.get('popup_high_credit_750')?.disable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_750')?.disable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_750')?.disable();

      this.popupBillCodeForm2.get('popup_low_credit_kl')?.disable();
      this.popupBillCodeForm2.get('popup_high_credit_kl')?.disable();
      this.popupBillCodeForm2.get('popup_retail_low_credit_kl')?.disable();
      this.popupBillCodeForm2.get('popup_retail_high_credit_kl')?.disable();

    }
  }

  manualCreditPermission(event: any) {
    this.primary_code_manual_credit = event.target.checked;
    // this.primary_code_manual_credit = event.target.checked;
    console.log(this.primary_code_manual_credit)
    if (this.primary_code_manual_credit = event.target.checked) {


      this.billCodeEditForm2.get('server_name_750')?.enable();
      this.billCodeEditForm2.get('pbx_threshold_limit_750')?.enable();
      this.billCodeEditForm2.get('retail_threshold_limit_750')?.enable();


      this.billCodeEditForm2.get('server_name_740')?.enable();
      this.billCodeEditForm2.get('pbx_threshold_limit_740')?.enable();
      this.billCodeEditForm2.get('retail_threshold_limit_740')?.enable();

      this.billCodeEditForm2.get('server_name_kl')?.enable();
      this.billCodeEditForm2.get('pbx_threshold_limit_kl')?.enable();
      this.billCodeEditForm2.get('retail_threshold_limit_kl')?.enable();

      // billcode popup


      this.popupBillCodeForm2.get('popup_server_name_750')?.enable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_750')?.enable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_750')?.enable();


      this.popupBillCodeForm2.get('popup_server_name_740')?.enable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_740')?.enable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_740')?.enable();

      this.popupBillCodeForm2.get('popup_server_name_kl')?.enable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_kl')?.enable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_kl')?.enable();


    }

    else {
      this.billCodeEditForm2.get('server_name_750')?.disable();
      this.billCodeEditForm2.get('pbx_threshold_limit_750')?.disable();
      this.billCodeEditForm2.get('retail_threshold_limit_750')?.disable();


      this.billCodeEditForm2.get('server_name_740')?.disable();
      this.billCodeEditForm2.get('pbx_threshold_limit_740')?.disable();
      this.billCodeEditForm2.get('retail_threshold_limit_740')?.disable();

      this.billCodeEditForm2.get('server_name_kl')?.disable();
      this.billCodeEditForm2.get('pbx_threshold_limit_kl')?.disable();
      this.billCodeEditForm2.get('retail_threshold_limit_kl')?.disable();


      // billcode popup

      this.popupBillCodeForm2.get('popup_server_name_750')?.disable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_750')?.disable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_750')?.disable();


      this.popupBillCodeForm2.get('popup_server_name_740')?.disable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_740')?.disable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_740')?.disable();

      this.popupBillCodeForm2.get('popup_server_name_kl')?.disable();
      this.popupBillCodeForm2.get('popup_pbx_threshold_limit_kl')?.disable();
      this.popupBillCodeForm2.get('popup_retail_threshold_limit_kl')?.disable();


    }
  }


  eventCheckNX32Permission(event: any) {
    this.checkbox_NX32Permission = event.target.checked;
    console.log(this.checkbox_NX32Permission)
  }
  selectEventCustomer(item: any) {
    this.searchResultTest = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)

    this.CompanyName = item.customerName;
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
    console.log(e)
  }
  checkCustomerName() {

    if (this.addCustomer.value.company_Name == '' || this.addCustomer.value.company_Name == 'null' || this.addCustomer.value.company_Name == null) {
      iziToast.error({
        message: "Company Name Missing",
        position: 'topRight'
      });
    }
  }
  CustomerStatus_RadioEvent(evt: any) {
    this.customerStatus_radiobox_Value = evt.target.id;
    if (evt.target.id == 'P1') {
      this.customerStatus_radiobox_Value = 'P';
    } else if (evt.target.id == 'N1') {
      this.customerStatus_radiobox_Value = 'N';
    } else {
      this.customerStatus_radiobox_Value = evt.target.id;
    }
    console.log("this.customerStatus_radiobox_Value", this.customerStatus_radiobox_Value);
  }
  handleChange(evt: any) {
    if (evt.target.id == 'N') {
      this.customerStatus_radiobox_Value = "New";
    } else {
      this.customerStatus_radiobox_Value = "Permanent";
    }

    console.log("this.customerStatus_radiobox_Value", this.customerStatus_radiobox_Value);
  }
  Radio_Partnertype_C4T(evt: any) {
    this.Partnertype_C4T_radiobox_Value = evt.target.id;
    console.log("this.Partnertype_C4T_radiobox_Value", this.Partnertype_C4T_radiobox_Value);
  }
  partnerTypehandleChange(evt: any) {
    this.partnerTypeMconn = evt.target.id;
    var abc = evt.target.value;
    console.log("partner type mconnect radio", this.partnerTypeMconn);
    console.log("partner type mconnect radio", abc);
  }
  fileAttachmentEvent(event: any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  clearCustomerAdd() {

    this.addCustomer.reset();

    // this.addCustomer.patchValue({
    //   'company_Code': 'D6387',
    // });

  }
  CustomerSearchtext(event: any) {
    console.log("event", event)
    // this.CustomerSearchTextValue = event.target.value;
    this.CustomerSearchTextValue = event;



  }
  selectAll(event: any) {

    if (event.target.checked == true) {

      this.checkAll_GroupID_Array = [];//clear the selected array
      this.customer_list.forEach((element: any, index: any) => {
        $("#check-grp-cusmas-" + index).prop('checked', true);
        console.log("this.customer_list", element.customerId)
        this.checkAll_GroupID_Array.push(element.customerId)
        console.log(" this.checkAll_GroupID_Array", this.checkAll_GroupID_Array)
      });
    } else {
      this.customer_list.forEach((element: any, index: any) => {
        $("#check-grp-cusmas-" + index).prop('checked', false);
        this.checkAll_GroupID_Array = [];//empties the array
        console.log(" this.checkAll_GroupID_Array", this.checkAll_GroupID_Array)
      });

    }
    console.log("Final SelectAll/DeSelect All Checkbox array Values", this.checkAll_GroupID_Array)
    this.edit_array = this.checkAll_GroupID_Array
  }

  EditCHK(data: any, event: any) {

    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;

    if (this.checkbox_value) {

      this.edit_array.push(data);
      this.edit_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array);
    }
    else {

      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }

  pageLoad() {

    this.checkbox_EditShippingAddress = true;
    if (this.checkbox_EditShippingAddress) {


      this.addCustomer.get("ESA_shipto").disable();
      this.addCustomer.get("ESA_address1").disable();
      this.addCustomer.get("ESA_address2").disable();
      this.addCustomer.get("ESA_city").disable();
      this.addCustomer.get("ESA_state").disable();
      this.addCustomer.get("ESA_cntPerson").disable();
      this.addCustomer.get("ESA_zipcode").disable();
      this.addCustomer.get("ESA_countryname").disable();
    }
    else {

      this.addCustomer.get("ESA_shipto").enable();
      this.addCustomer.get("ESA_address1").enable();
      this.addCustomer.get("ESA_address2").enable();
      this.addCustomer.get("ESA_city").enable();
      this.addCustomer.get("ESA_state").enable();
      this.addCustomer.get("ESA_cntPerson").enable();
      this.addCustomer.get("ESA_zipcode").enable();
      this.addCustomer.get("ESA_countryname").enable();

    }



  }

  pageEditLoad() {
    this.checkbox_EdShippingAddress = true;
    if (this.checkbox_EdShippingAddress) {

      this.editCustomerForm.get("e_ESA_cntPerson").disable();
      this.editCustomerForm.get("e_ESA_address1").disable();
      this.editCustomerForm.get("e_ESA_address2").disable();
      this.editCustomerForm.get("e_ESA_city").disable();
      this.editCustomerForm.get("e_ESA_state").disable();
      this.editCustomerForm.get("e_ESA_shipto").disable();
      this.editCustomerForm.get("e_ESA_zipcode").disable();
      this.editCustomerForm.get("e_ESA_countryname").disable();

    }
    else {

      this.editCustomerForm.get("e_ESA_cntPerson").enable();
      this.editCustomerForm.get("e_ESA_address1").enable();
      this.editCustomerForm.get("e_ESA_address2").enable();
      this.editCustomerForm.get("e_ESA_city").enable();
      this.editCustomerForm.get("e_ESA_state").enable();
      this.editCustomerForm.get("e_ESA_shipto").enable();
      this.editCustomerForm.get("e_ESA_zipcode").enable();
      this.editCustomerForm.get("e_ESA_countryname").enable();

    }

  }
  openSearch1() {
    (document.activeElement as HTMLElement)?.blur();
    $('.modal.show').modal('hide');
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");

    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop.show') as HTMLElement;
      if (backdrop) {
        backdrop.style.opacity = '0'; // Or any other value
      }
    }, 100);

    $('.modal.show').on('hidden.bs.modal', function () {
      $('#searchCustomerFormId').modal('show');
    });
    $('.modal.show').modal('hide');
    $('#searchCustomerFormId').modal('show');

  }
   openSearch() {
    (document.activeElement as HTMLElement)?.blur();
  
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");

    $('#searchCustomerFormId').modal('show');

  }
  searchCustomerList() {
    (document.activeElement as HTMLElement)?.blur();
    $('#searchCustomerFormId').modal('hide');
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
    this.revenueCheckListvalue = this.searchCustomerForm.value.RevenueTypeWiseShow;


  }
  CustomerListQuickSearch(data: any) {
    // Swal.fire('Searching');
    // Swal.showLoading();
    // this.spinner.show();
    if (data == '') {
      this.customerslist({});
    }
    var list_data = this.listDataInfo(data);
    this.values = data.target.value;
    console.log("this.values", this.values)


    console.log("You entered: ", data.target.value);
    this.CustomerSearchTextValue = data.target.value;

    let api_req: any = new Object();
    let quick_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_det";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quick_Search_req.action = "get_det";
    quick_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    quick_Search_req.off_set = list_data.offset;
    quick_Search_req.limit_val = list_data.limit;
    quick_Search_req.revenue_check = '';
    quick_Search_req.search_txt = this.CustomerSearchTextValue;
    api_req.element_data = quick_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.spinner.hide();
      console.log('12345678')
      $('#searchCustomerFormId').modal('hide');
      $('.modal-backdrop').remove();
      $("body").removeClass("modal-open");
      this.response_total_cnt = response.total_cnt;
      if (response.total_cnt == 0) {
        this.response_total_cnt = response.total_cnt;

        // iziToast.warning({
        //   message: "No Matching Records",
        //   position: 'topRight'
        // });
      }
      console.log("search username ", response)
      if (response.status != '') {
        Swal.close();
        this.QuickSearchResultList = response.user_list;
        this.customer_list = response.customer_details;
        console.log("customer_list", this.customer_list);


        this.revenue_list = response.revenue_list;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $('#searchCustomerFormId').modal('hide');
        $('.modal-backdrop').remove();
        $("body").removeClass("modal-open");

        this.response_total_cnt = response.total_cnt;
      }
      else {
        iziToast.warning({
          message: "No Matching Records",
          position: 'topRight'
        });

      }
    });
  }

  clearSelection(event: any) {

    this.searchResultTest = '';

  }
  customerslist(data: any) {

    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_det"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "get_det";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.revenue_check = this.revenueCheckListvalue;
    get_req.search_txt = this.searchResultTest;
    api_req.element_data = get_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      //console.log('hgyrdrrd')
      $('#searchCustomerFormId').modal('hide');
      $('.modal-backdrop').remove();
      $("body").removeClass("modal-open");
      this.spinner.hide();

      if (response.total_cnt == 0) {
        this.response_total_cnt = response.total_cnt;
        // iziToast.warning({
        //   message: "No Matching Records",
        //   position: 'topRight'
        // });
      }
      if (response != '') {

        this.customer_list = response.customer_details;
        // this.customer_list_colorcode=response.customer_details.biller_details[0].colorCodes;
        this.revenue_list = response.revenue_list;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });

      }

      else {
        iziToast.warning({
          message: "No API Response",
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
  listDataInfo(list_data: any) {

    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  searchCustomerData(data: any) {


    this.searchResultTest = data
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_name_search";
    // api_req.api_url = "customer/cal/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
        this.searchResult = response.customer_names;
        console.log(" this.searchResult", this.searchResult)
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
        console.log("final error", error);
      };
  }
  getDynamicList() {

    let api_req: any = new Object();
    let api_reqs_addCustomer: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/add_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqs_addCustomer.action = "add_customer";
    api_reqs_addCustomer.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_reqs_addCustomer;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.billerNameList = response.bill_details;
        this.billList = response.bill_details;
        this.currencyList = response.currency_det;
        this.countryList = response.country_details;
        this.paymentList = response.payment_det;
        this.customerType_list = response.cus_type;
        this.customerClassificationValue = response.cus_type;
        this.customerPermissionList = response.cus_permission;
        this.permissionValue = response.cus_permission;
        this.termList = response.terms_det;
        this.dcIPAllowCountries = response.dc_ip_allow_countries;
        this.addPermissionCheckboxID_array = response.cus_permission_selected;
        this.dropdownList_billerName = response.bill_details;


      }

    });

  }
  addBillerNameCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    this.addBillerNameBillerId = data;
    this.addBillerNameBiller = event.target.checked;


    if (this.addBillerNameBiller) {

      this.addBillerNameCheckboxID_array.push(Number(data));
      this.addBillerNameCheckboxID_array.join(',');
      console.log("Final BillerName Checkbox After checkbox selected list", this.addBillerNameCheckboxID_array);
    }
    else {
      const index = this.addBillerNameCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.addBillerNameCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list", this.addBillerNameCheckboxID_array)

    }

  }
  editBillerNameCHK(data: any, event: any) {

    this.editBillerNameBillerId = data;
    this.editBillerNameBiller = event.target.checked;
    console.log('editBillerNameBiller' + this.editBillerNameBiller);
    console.log('editBillerNameBillerId' + this.editBillerNameBillerId);

    if (this.editBillerNameBiller) {

      this.editBillerNameCheckboxID_array.push(Number(data));
      this.editBillerNameCheckboxID_array.join(',');
      this.editBillerNameCheckboxID_array.sort();
      console.log("Final BillerName Checkbox After checkbox selected list", this.editBillerNameCheckboxID_array);
    }
    else {

      const index = this.editBillerNameCheckboxID_array.findIndex((event: any) => { return event == data; });

      if (index > -1) {
        this.editBillerNameCheckboxID_array.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.editBillerNameCheckboxID_array)

      console.log("Final BillerName Checkbox After Deselected selected list", this.editBillerNameCheckboxID_array)

    }
    this.typeConvertionString_editBillName = this.editBillerNameCheckboxID_array.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_editBillName)
    if (this.typeConvertionString_editBillName.includes(9)) {
      this.dcare = false;
      console.log("dcare", this.dcare)
    } else {
      this.dcare = true;
      console.log("dcare", this.dcare)
    }
  }

  editPermissionCHK(data: any, event: any) {

    this.editPermissionId = data;
    this.editPermission = event.target.checked;
    console.log('editBillerNameBiller' + this.editPermission)

    if (this.editPermission) {

      this.editPermissionCheckboxID_array.push(Number(data));
      this.editPermissionCheckboxID_array.join(',');

      console.log("Final BillerName Checkbox After checkbox selected list--1", this.editPermissionCheckboxID_array);
    }
    else {

      const index = this.editPermissionCheckboxID_array.findIndex((event: any) => { return event == data; });

      //   const index = this.editPermissionCheckboxID_array.findIndex((el:any) => return el == data);
      console.log("Final index", index);

      if (index > -1) {
        this.editPermissionCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list--2", this.editPermissionCheckboxID_array)

    }

  }

  addPermissionCHK(data: any, event: any) {
    this.addPermissionId = data;
    this.addPermission = event.target.checked;
    console.log('addPermission' + this.addPermission)

    if (this.addPermission) {

      this.addPermissionCheckboxID_array.push(data);
      this.addPermissionCheckboxID_array.join(',');
      console.log("Final BillerName Checkbox After checkbox selected list", this.addPermissionCheckboxID_array);
    }
    else {
      const index = this.addPermissionCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.addPermissionCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list", this.addPermissionCheckboxID_array)

    }
  }


  // addCustomerClassificationCHK(data: any, event: any) {

  //   this.addCustomerClassificationBillerId = data;
  //   this.addCustomerClassificationBiller = event.target.checked;
  //   console.log(this.addCustomerClassificationBiller)

  //   if (this.addCustomerClassificationBiller) {

  //     this.addCustomerClassificationBillerCheckboxID_array.push(data);
  //     this.addCustomerClassificationBillerCheckboxID_array.join(',');
  //     console.log("Final customer classification Checkbox After checkbox selected list", this.addCustomerClassificationBillerCheckboxID_array);
  //   }
  //   else {
  //     const index = this.addCustomerClassificationBillerCheckboxID_array.findIndex((el: any) => el === data)
  //     if (index > -1) {
  //       this.addCustomerClassificationBillerCheckboxID_array.splice(index, 1);
  //     }
  //     console.log("Final customer classification Checkbox After Deselected selected list", this.addCustomerClassificationBillerCheckboxID_array)

  //   }

  // }

  addCustomerClassificationCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    this.addCustomerClassificationBillerId = data;
    this.addCustomerClassificationBiller = event.target.checked;
    console.log(this.addCustomerClassificationBiller)

    if (this.addCustomerClassificationBiller) {

      this.addCustomerClassificationBillerCheckboxID_array.push(data);
      this.addCustomerClassificationBillerCheckboxID_array.join(',');
      this.addCustomerClassificationBillerCheckboxID_array.sort();
      console.log("Final customer classification Checkbox After checkbox selected list", this.addCustomerClassificationBillerCheckboxID_array);
    }
    else {
      const index: number = this.addCustomerClassificationBillerCheckboxID_array.indexOf(data);
      if (index == -1) {
        this.addCustomerClassificationBillerCheckboxID_array.splice(index, 1);
      } else {
        this.addCustomerClassificationBillerCheckboxID_array.splice(index, 1);
      }

      console.log("Final check After  de-selected list", this.addCustomerClassificationBillerCheckboxID_array)

      console.log("Final BillerName Checkbox After Deselected selected list", this.addCustomerClassificationBillerCheckboxID_array)


    }
    this.typeConvertionString_addCustomerClass = this.editCustomerClassificationBillerCheckboxID_array.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_addCustomerClass)

  }

  editCustomerClassificationCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    this.editCustomerClassificationBillerId = data;
    this.editCustomerClassificationBiller = event.target.checked;
    console.log(this.editCustomerClassificationBiller)

    if (this.editCustomerClassificationBiller) {

      this.editCustomerClassificationBillerCheckboxID_array.push(data);
      this.editCustomerClassificationBillerCheckboxID_array.join(',');
      //  this.editCustomerClassificationBillerCheckboxID_array.sort();
      //  alert(this.editCustomerClassificationBillerCheckboxID_array)
      console.log("Final customer classification(edit) Checkbox After checkbox selected list", this.editCustomerClassificationBillerCheckboxID_array);
    }
    else {
      // const index: number = this.editCustomerClassificationBillerCheckboxID_array.indexOf(data);

      const index = this.editCustomerClassificationBillerCheckboxID_array.findIndex((event: any) => { return event == data; });

      if (index > -1) {
        this.editCustomerClassificationBillerCheckboxID_array.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.editCustomerClassificationBillerCheckboxID_array)

      console.log("Final BillerName Checkbox After Deselected selected list", this.editCustomerClassificationBillerCheckboxID_array)


    }
    this.typeConvertionString_editCustomerClass = this.editCustomerClassificationBillerCheckboxID_array.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_editCustomerClass)

  }
  handle_radioChange_AccountManager(event: any) {
    this.radiobuttonValue_AccountManager = event.target.id;
    console.log(this.radiobuttonValue_AccountManager);
  }

  CHKAll_BillerNameSelectAll(event: any) {

    this.chkAllStatus = event.target.checked;
    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      console.log("this.billerNameList", this.billerNameList)

      this.billerNameList.forEach((element: any, index: any) => {
        $("#check1-cus-grp-" + index).prop('checked', true);
        checkAll_ID.push(element.billerId);
      });
      this.addBillerNameCheckboxID_array = [];
      this.addBillerNameCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.addBillerNameCheckboxID_array-Select All", this.addBillerNameCheckboxID_array)
    } else {
      this.billerNameList.forEach((element: any, index: any) => {
        $("#check1-cus-grp-" + index).prop('checked', false);

      });
      this.addBillerNameCheckboxID_array = [];
      console.log("this.addBillerNameCheckboxID_array-De Select All", this.addBillerNameCheckboxID_array)

    }

  }

  CHKAll_BillerNameSelectAll_Edit(event: any) {
    // check2-grp-{{i}}

    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      console.log("this.billerNameList", this.geting_biller)

      this.geting_biller.forEach((element: any, index: any) => {
        $("#check-4" + index).prop('checked', true);
        checkAll_ID.push(element.billerId);
      });
      this.editBillerNameCheckboxID_array = [];
      this.editBillerNameCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.editBillerNameCheckboxID_array-Select All", this.editBillerNameCheckboxID_array)
    } else {
      this.geting_biller.forEach((element: any, index: any) => {
        $("#check2-grp-" + index).prop('checked', false);

      });
      this.editBillerNameCheckboxID_array = [];
      console.log("this.editBillerNameCheckboxID_array-De Select All", this.editBillerNameCheckboxID_array)

    }

  }

  CHKAll_PermissionSelectAll(event: any) {


    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      console.log("permission array list", this.customerPermissionList)

      this.customerPermissionList.forEach((element: any, index: any) => {
        $("#check-grpPerm-" + index).prop('checked', true);
        checkAll_ID.push(element.id);
      });
      this.addPermissionCheckboxID_array = [];
      this.addPermissionCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.addPermissionCheckboxID_array-Select All", this.addPermissionCheckboxID_array)
    } else {
      this.customerPermissionList.forEach((element: any, index: any) => {
        $("#check-grpPerm-" + index).prop('checked', false);

      });
      this.addPermissionCheckboxID_array = [];
      console.log("this.addPermissionCheckboxID_array-De Select All", this.addPermissionCheckboxID_array)

    }

  }
  kk() {
    console.log('oishfih')
  }
  CHKAll_CustomerClassifSelectAll(event: any) {


    if (event.target.checked == true) {
      var checkAllCC_ID: any = [];
      console.log("CHKAll_CustomerClassifSelectAll", this.customerType_list)

      this.customerType_list.forEach((element: any) => {

        checkAllCC_ID.push(element);
      });
      this.addCustomerClassificationBillerCheckboxID_array = [];
      this.addCustomerClassificationBillerCheckboxID_array = checkAllCC_ID;
      console.log("checkedID", checkAllCC_ID)
      console.log("this.addCustomerClassificationBillerCheckboxID_array-Select All", this.addCustomerClassificationBillerCheckboxID_array)
    } else {
      this.customerType_list.forEach((element: any, index: any) => {
        $("#check-grp-cusmas-" + index).prop('checked', false);

      });
      this.addCustomerClassificationBillerCheckboxID_array = [];
      console.log("this.addCustomerClassificationBillerCheckboxID_array-De Select All", this.addCustomerClassificationBillerCheckboxID_array)

    }

  }


  // CheckboxValueChanges_shareCustomerPermission(data: any, event: any) {
  //   console.log("List - Checkbox ID", data);
  //   this.checkbox_ID_SingleParameter_Value = data;
  //   this.Checkbox_value = event.target.checked;
  //   console.log(this.Checkbox_value)
  //   if (this.Checkbox_value) {

  //     this.CheckBox_DynamicArrayList_shareCustomerPermission.push(data);
  //     this.CheckBox_DynamicArrayList_shareCustomerPermission.join(',');
  //     console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_shareCustomerPermission);
  //   }
  //   else {

  //     const index: number = this.CheckBox_DynamicArrayList_shareCustomerPermission.indexOf(data);
  //     console.log(index)
  //     if (index == -1) {
  //       this.CheckBox_DynamicArrayList_shareCustomerPermission.splice(index, 1);
  //     }
  //     console.log("Final check After Deselected selected list", this.CheckBox_DynamicArrayList_shareCustomerPermission)

  //   }
  // }

  CheckboxValueChanges_shareCustomerPermission(data: any, event: any) {
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_Value = data;
    this.Checkbox_value = event.target.checked;
    console.log(this.Checkbox_value)
    if (this.Checkbox_value) {

      this.CheckBox_DynamicArrayList_shareCustomerPermission.push(Number(data));
      this.CheckBox_DynamicArrayList_shareCustomerPermission.join(',');
      this.CheckBox_DynamicArrayList_shareCustomerPermission.sort();
      console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_shareCustomerPermission);

    }
    else {

      const index: number = this.CheckBox_DynamicArrayList_shareCustomerPermission.indexOf(data);
      console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_shareCustomerPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_shareCustomerPermission.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_shareCustomerPermission)

    }
    this.typeConvertionString_Shared_Permission = this.CheckBox_DynamicArrayList_shareCustomerPermission.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_Shared_Permission)
  }

  CheckboxValueChanges_invoice_shareCustomerPermission(data: any, event: any) {

    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_invoice_Value = data;
    this.Checkbox_value_invoice = event.target.checked;
    console.log(this.Checkbox_value_invoice)

    if (this.Checkbox_value_invoice) {

      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.push(Number(data));
      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.join(',');
      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.sort();
      console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.indexOf(data);
      console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)
    }
    this.typeConvertionString_invoice_Shared_Permission = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoice_Shared_Permission)

  }
  // CheckboxValueChanges_invoice_shareCustomerPermission(data: any, event: any) {

  //   console.log("List - Checkbox ID", data);
  //   this.checkbox_ID_SingleParameter_invoice_Value = data;
  //   this.Checkbox_value_invoice = event.target.checked;
  //   console.log(this.Checkbox_value_invoice)

  //   if (this.Checkbox_value_invoice) {

  //     if (this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.indexOf(data) < 0) {
  //       this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.push(data);
  //     }
  //     else {

  //     }
  //     console.log("Final check After  selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)

  //   }
  //   else {
  //     const index: number = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.indexOf(data);
  //     console.log(index)
  //     if (index == -1) {
  //       this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
  //     } else {
  //       this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
  //     }
  //     console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)
  //   }
  //   this.typeConvertionString_invoice_Shared_Permission = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.toString();

  //   console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoice_Shared_Permission)

  // }

  viewCustomer(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.spinner.show();
    let api_req: any = new Object();
    let view_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/view_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    view_customer_req.action = "view_customer_details";
    view_customer_req.customerId = id;
    view_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = view_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.viewCustomerForm.patchValue({
          'view_company_Name': response.result.customer_details[0].customerName,
          'v_billingAddress_address1': response.result.customer_details[0].customerAddress1,
          'v_billingAddress_address2': response.result.customer_details[0].customerAddress2,
          'v_billingAddress_city': response.result.customer_details[0].city,
          'v_billingAddress_state': response.result.customer_details[0].ship_state,
          'view_BA_countryname': response.result.customer_details[0].country,
          'v_ESA_phone': response.result.customer_details[0].customerPhone,
          'v_ESA_MobilePhone': response.result.customer_details[0].mobilePhone,
          'v_ESA_GSTNO': response.result.customer_details[0].reseller_gst_state,
          'v_ESA_FAX': response.result.customer_details[0].fax,
          'v_ESA_Email': response.result.customer_details[0].email,
          'v_contact_person_CP': response.result.customer_details[0].ship_customerName,
          'v_bank_acc_name': response.result.customer_details[0].bankAccountName,
          'v_bank_acc_number': response.result.customer_details[0].bankAccountNo,
          'v_reseller_status': response.result.customer_details[0].cust_status,
        });

      } else {
        iziToast.warning({
          message: "No API Response",
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

  clearcustomer() {
    // this.submitted=false;
    $('#addCustomerFormId').modal('hide');
    this.addCustomer.reset();
    // this.addCustomer.patchValue({
    //   'company_Code': 'D6387',
    // });
  }
  cancelAddCustomer() {
    $('#addCustomerFormId').modal('hide');
  }
  clearEditCustomer() {
    $('#editCustomerFormId_CM').modal('hide');
  }
  clearSpecialEdit() {
    $('#specialEditCustomerFormId_CM').modal('hide');
  }
  clearMConnect() {
    $('#mconnectPartnerDetailsFormId_CM').modal('hide');
  }
  clearMrVoip() {
    $('#MrvoipPartnerDetailsFormId_CM').modal('hide');
  }
  clearCal4tellPartner() {
    $('#call4tellPartnerDetailsFormId_CM').modal('hide');
  }
  clearInvoiceShare() {
    $('#invoiceSharedCustomerFormId_CM').modal('hide');
  }
  clearShareCusPerm() {
    $('#SharedCustomerPermissionFormId_CM').modal('hide');
  }
  clearNX32Perm() {
    $('#customer_NX32PermissionFormId_CM').modal('hide');
  }
  clearFileAtt() {
    $('#fileAttachmentFormId_CM').modal('hide');
  }
  clearBillCode() {
    $('#billCodeFormId_CM').modal('hide');
  }
  clearLandscapeEmail() {
    $('#landscapeEmailFormId_CM').modal('hide');
  }
  clearSearchCust() {
    (document.activeElement as HTMLElement)?.blur();
    $('#searchCustomerFormId').modal('hide');
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");

  }
  clearAssignAcc() {
    $('#AssignAccountManager_CM').modal('hide');
  }
  clearGoogAuth() {
    $('#GoogleAuthentication_CM').modal('hide');
  }



  get f() {
    return this.addCustomer.controls;
  }


  addCustomerown(event: any) {
    console.log("mouse event", event.pointerType)
    if (event.pointerType == "mouse" || event.pointerType == "") {
      // this variable is used to find button click as mouse or kyboard enter
      this.Clicked = true;
    }

    this.submitted = true;
    if (this.addCustomer.valid) {
      this.submit_status = true;
    } else {
      this.submit_status = false;
      $("#company_Name").focus();


    }
    // if (this.addCustomer.invalid) {
    //   return;
    // }

    Swal.fire('Saving Customer Data');
    Swal.showLoading();

    // finance email field condition
    console.log(this.financeemailList);
    let result_FinanceEmail_Field = this.financeemailList.map(o => o.financeemailParameterName).join(',');
    console.log(result_FinanceEmail_Field);

    //  email field condition
    let result_Email_Field = this.emailList.map(o => o.emailParameterName).join(',');
    console.log(result_Email_Field);

    // this.searchResultTest='';
    let api_req: any = new Object();
    let add_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_customer_req.action = "customer_save";
    add_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');



    if ($('#companyCode1').val() == null || $('#companyCode1').val() == '') {

      iziToast.warning({
        message: "Company Code Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.customerCode = $('#companyCode1').val();
    }

    if (this.searchResultTest === null || this.searchResultTest === undefined) {

      iziToast.warning({
        message: "Company Name Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.customerName = this.searchResultTest;
    }
    if (this.addCustomer.value.defaultBillerName === null || this.addCustomer.value.defaultBillerName == '' || this.addCustomer.value.defaultBillerName === undefined) {

      iziToast.warning({
        message: "Default Biller Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.def_biller_id = this.addCustomer.value.defaultBillerName;
    }

    if (this.addBillerNameCheckboxID_array === null || this.addBillerNameCheckboxID_array == '' || this.addBillerNameCheckboxID_array === undefined) {

      iziToast.warning({
        message: " Biller Name Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.company_name = this.addBillerNameCheckboxID_array;
    }




    if (this.addCustomerClassificationBillerCheckboxID_array === null || this.addCustomerClassificationBillerCheckboxID_array == '' || this.addCustomerClassificationBillerCheckboxID_array === undefined) {

      iziToast.warning({
        message: "Customer Classification Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.cus_type = this.addCustomerClassificationBillerCheckboxID_array;
    }


    if (this.addCustomer.value.billingAddress_contactPerson === null) {
      iziToast.warning({
        message: "Contact Person(Billing Address) Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {
      add_customer_req.bill_attn = this.addCustomer.value.billingAddress_contactPerson;
    }

    add_customer_req.customerAddress1 = this.addCustomer.value.billingAddress_address1;
    add_customer_req.customerAddress2 = this.addCustomer.value.billingAddress_address2;
    add_customer_req.city = this.addCustomer.value.billingAddress_city;
    add_customer_req.state = this.addCustomer.value.billingAddress_state;
    add_customer_req.zipCode = this.addCustomer.value.billingAddress_zipcode;
    add_customer_req.country = this.addCustomer.value.BA_countryname;

    // add_customer_req.e_shippping = this.addCustomer.value.edit_ship_address;


    // add_customer_req.ship_attn = this.addCustomer.value.ESA_cntPerson;
    if (this.checkbox_EditShippingAddress == false && this.addCustomer.value.ESA_cntPerson === null) {


      iziToast.warning({
        message: "Contact Person(Edit Shipping Address) Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    } else {

      add_customer_req.ship_attn = this.addCustomer.value.ESA_cntPerson;
    }

    if (this.checkbox_EditShippingAddress == true) {
      add_customer_req.ship_attn = this.checkbox_EditShippingAddress;

    }
    add_customer_req.ship_to = this.addCustomer.value.ESA_shipto;
    add_customer_req.ship_customerAddress1 = this.addCustomer.value.ESA_address1;
    add_customer_req.ship_customerAddress2 = this.addCustomer.value.ESA_address2;
    add_customer_req.ship_city = this.addCustomer.value.ESA_city;
    add_customer_req.ship_state = this.addCustomer.value.ESA_state;
    add_customer_req.ship_zipCode = this.addCustomer.value.ESA_zipcode;
    add_customer_req.ship_country = this.addCustomer.value.ESA_countryname;
    add_customer_req.premium_id = this.addCustomer.value.ESA_premium;
    add_customer_req.premium_status = this.addCustomer.value.ESA_premiumStatus;
    add_customer_req.customerPhone = this.addCustomer.value.ESA_phone;
    add_customer_req.mobilePhone = this.addCustomer.value.ESA_MobilePhone;
    add_customer_req.fax = this.addCustomer.value.ESA_FAX;
    add_customer_req.tin_no = this.addCustomer.value.ESA_GSTNO;
    add_customer_req.website_name = this.addCustomer.value.ESA_websiteName;
    add_customer_req.email = result_Email_Field;
    if (!result_Email_Field) {
      iziToast.warning({
        message: "Email Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    }
    add_customer_req.finance_email = result_FinanceEmail_Field;
    if (!result_FinanceEmail_Field) {
      iziToast.warning({
        message: "Finance Email Missing",
        position: 'topRight'
      });
      Swal.close();
      return false;
    }
    // add_customer_req.cus_permission = this.addCustomer.value.permissionFCAdd;
    add_customer_req.cus_permission = this.addPermissionCheckboxID_array;
    if (this.cmsdepartmentADD_ID == '' || this.cmsdepartmentADD_ID == null || this.cmsdepartmentADD_ID == undefined) {
      // iziToast.warning({
      //   message: "CMS Department Missing",
      //   position: 'topRight'
      // });
      // Swal.close();
      // return false;
      add_customer_req.cms_default_department = this.cmsdepartmentADD_ID;
      add_customer_req.cms_department_name = this.cmsdepartmentADD_val;

    } else {

      add_customer_req.cms_default_department = this.cmsdepartmentADD_ID;
      add_customer_req.cms_department_name = this.cmsdepartmentADD_val;

    }

    add_customer_req.credit_amt = this.addCustomer.value.ESA_customerLimit_add;
    add_customer_req.reseller_id = this.addCustomer.value.ESA_c3cxResellerId_add;

    if (this.addCustomer.value.ESA_c3cxResellerId_add != null) {

      if (this.addCustomer.value.defaultBillerName != 9 && this.cal4care1_sg_add == false && this.cal4care3_jp_add == false && this.cal4care2_sdn_add == false) {
        iziToast.error({
          message: "3CX Reseller License API Checkbox value Missing",
          position: 'topRight'
        });
        Swal.close();
        return false;
      } else {
        add_customer_req.cal4care_sg = this.cal4care1_sg_add;
        add_customer_req.cal4care_sdn = this.cal4care2_sdn_add;
        add_customer_req.cal4care_jp = this.cal4care3_jp_add;
        add_customer_req.cal4care_none = this.cal4care4_none_add;

      }
    }


    add_customer_req.def_currency_id = this.addCustomer.value.currencyname;
    add_customer_req.reseller_dis_per = this.addCustomer.value.discount_percentage;
    add_customer_req.cus_banking_charge = this.addCustomer.value.banking_charge;
    add_customer_req.stripe_customerId = this.addCustomer.value.stripe_customer_id;
    add_customer_req.stripe_recurring_state = this.addCustomer.value.stripe_recurr_payment;
    add_customer_req.system_discount_3cx = this.addCustomer.value.c3cx_system_discount;
    add_customer_req.reseller_gst_state = this.addCustomer.value.shopping_gst;
    add_customer_req.send_invoice = this.addCustomer.value.send_invoice;
    add_customer_req.companyName = this.addCustomer.value.contact_person_CP;
    add_customer_req.bankAccountName = this.addCustomer.value.bank_acc_no;
    add_customer_req.bankAccountNo = this.addCustomer.value.bank_account_number;
    add_customer_req.cust_status = this.customerStatus_radiobox_Value;
    add_customer_req.reseller_state = this.addCustomer.value.reseller_status;
    add_customer_req.vs_credit = this.addCustomer.value.voip_switch_credit;
    add_customer_req.def_payment_via = this.addCustomer.value.payment_way;
    this.searchResultTest = '';
    api_req.element_data = add_customer_req;

    $("#addCustomerSave").attr("disabled", true);

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var add_result = response;
      console.log("add", add_result);
      $("#addCustomerSave").removeAttr("disabled");

      if (response.status == true) {
        this.submitted = false;
        this.customerslist({});
        Swal.close();
        $('#addCustomerFormId').modal('hide');

        iziToast.success({
          message: "Customer Added successfully,Send to Approval",
          position: 'topRight'
        });

        this.clear();
        this.customerslist({});
        window.location.reload();

      } else {
        Swal.close();
        iziToast.warning({
          message: "Customer not updated. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        Swal.close();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }


  editCustomer(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.pageEditLoad();
    console.log("id", id)
    this.get_cust_type = [];
    this.editId = id;
    let api_req: any = new Object();
    let edit_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_customer_req.action = "customer_edit";
    edit_customer_req.customerId = id;
    edit_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = edit_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh", response);
      console.log("vignesh1", response.result.customer_details[0].city);

      if (response.status == true) {
        var biller_id = response.result.customer_details[0].billerId;
        console.log("dropdown billwer id", biller_id)
        this.b_id = biller_id.split(',');
        console.log(this.b_id)
        var newArray = this.b_id.map(function (item: any) {
          return { 'id': item }
        })
        // Parse response properties as integers before comparison


        // Check if the parsed values are equal to 1 and assign boolean values accordingly
        this.cal4care1_sg = response.partnerID.cal4care1_sg;
        this.cal4care2_sdn = response.partnerID.cal4care2_sdn;
        this.cal4care3_jp = response.partnerID.cal4care3_jp;
        this.cal4care4_none = false;

        console.log(" this.cal4care1_sg", this.cal4care1_sg);
        console.log("this.cal4care2_sdn", this.cal4care2_sdn);
        console.log("this.cal4care2_sdn", this.cal4care2_sdn);


        this.emailList = response.result.customer_email;
        console.log(this.emailList)
        this.financeemailList = response.result.customer_finance_email;
        console.log("just", newArray)
        console.log(response);
        console.log("cus classification", response.result.customer_details[0].cus_type);
        console.log("cus permission", response.result.customer_details[0].cus_permission);
        console.log("customer status", response.result.customer_details[0].cust_status);
        console.log("billerId_det", response.result.customer_details[0].billerId);
        this.get_cust_type = response.result.customer_details[0].cus_type;
        this.geting_biller = response.result.bill_details;

        this.geting_biller_edit = response.result.billerId_det;
        this.geting_biller_edit = response.result.billerId_det;
        // this.editBillerNameCheckboxID_array = response.result.billerId_det;

        this.editBillerNameCheckboxID_array = response.result.customer_details[0].billerId.split(',').map(Number);

        this.editPermissionCheckboxID_array = response.result.customer_details[0].cus_permission.split(',').map(Number);
        this.get_PermissionallList = response.result.cus_permission;
        this.get_PermissionEdit = response.result.cus_permission_id;
        //   this.cus_type_edit = response.result.customer_details[0].cus_type;
        this.editCustomerClassificationBillerCheckboxID_array = response.result.customer_details[0].cus_type.split(',');
        this.customerType_listEdit = response.result.cus_class_type;
        this.customerStatusEdit = response.result.customer_details[0].cust_status;
        this.customerIDBillCode = response.result.customer_details[0].customerId;
        this.defaultBillerID_edit = response.result.customer_details[0].def_biller_id;
        if (this.defaultBillerID_edit == 9) {
          this.dcare = false;
        } else {
          this.dcare = true;
        }
        // console.log('selected_biller', response.result.billerId_det);
        // console.log('customer_bill_code_arr', response.result.customer_bill_code_arr[0].bill_code_name);

        this.cmsDepartmentList = response.result.depart_data;
        var dpt_id: any;
        // alert(response.result.cms_dep_value)
        dpt_id = (response.result.cms_dep_value.toString());
        setTimeout(() => {
          $("#cmsdepartment_name_edit").val(dpt_id)
        }, 3000);

        this.editCustomerForm.patchValue({

          'e_company_Code': response.result.customer_details[0].customerCode,

          'edit_company_Name': response.result.customer_details[0].customerName,
          'edit_defaultBillerName': response.result.customer_details[0].def_biller_id,
          // 'edit_billernamelist': response.result.billerId_det,
          'editCustomerClassification': response.result.customer_details[0].cus_type,

          'e_billingAddress_contactPerson': response.result.customer_details[0].bill_attn,
          'e_billingAddress_address1': response.result.customer_details[0].customerAddress1,
          'e_billingAddress_address2': response.result.customer_details[0].customerAddress2,
          'e_billingAddress_city': response.result.customer_details[0].city,
          'e_billingAddress_state': response.result.customer_details[0].state,
          'e_billingAddress_zipcode': response.result.customer_details[0].zipCode,
          'Edit_BA_countryname': response.result.customer_details[0].country,

          // 'e_edit_ship_address': response.result.customer_details[0].e_shippping,

          'e_ESA_cntPerson': response.result.customer_details[0].ship_attn,
          'e_ESA_shipto': response.result.customer_details[0].ship_to,
          'e_ESA_address1': response.result.customer_details[0].ship_customerAddress1,
          'e_ESA_address2': response.result.customer_details[0].ship_customerAddress2,
          'e_ESA_city': response.result.customer_details[0].ship_city,
          'e_ESA_state': response.result.customer_details[0].ship_state,
          'e_ESA_zipcode': response.result.customer_details[0].ship_zipCode,
          'e_ESA_countryname': response.result.customer_details[0].ship_country,


          'e_ESA_premium': response.result.customer_details[0].premium_id,
          'e_ESA_premiumStatus': response.result.customer_details[0].premium_status,
          'e_ESA_phone': response.result.customer_details[0].customerPhone,
          'e_ESA_MobilePhone': response.result.customer_details[0].mobilePhone,
          'e_ESA_FAX': response.result.customer_details[0].fax,
          'e_ESA_GSTNO': response.result.customer_details[0].tin_no,

          'e_ESA_websiteName': response.result.customer_details[0].website_name,
          // 'e_ESA_FinanceEmail': response.result.customer_details[0].finance_email,
          // 'e_ESA_Email': response.result.customer_details[0].email,
          'edit_permission': response.result.customer_details[0].cus_permission,


          'edit_cmsdepartment': response.result.cms_dep_value,
          'update_cmsDepartment': response.result.customer_details[0].cms_default_department,
          'e_ESA_customerLimit': response.result.customer_details[0].credit_amt,
          'e_ESA_c3cxResellerId': response.result.customer_details[0].reseller_id,
          'edit_currencyname': response.result.customer_details[0].def_currency_id,
          'e_discount_percentage': response.result.customer_details[0].reseller_dis_per,
          // cus_banking_charge
          'e_banking_charge': response.result.customer_details[0].cus_banking_charge,
          'e_stripe_customer_id': response.result.customer_details[0].stripe_customerId,
          'e_stripe_recurr_payment': response.result.customer_details[0].stripe_recurring_state,
          'e_c3cx_system_discount': response.result.customer_details[0].system_discount_3cx,
          'e_shopping_gst': response.result.customer_details[0].reseller_gst_state,
          'e_send_invoice': response.result.customer_details[0].send_invoice,
          'e_contact_person_CP': response.result.customer_details[0].companyName,
          'e_bank_acc_name': response.result.customer_details[0].bankAccountName,
          'e_bank_acc_no': response.result.customer_details[0].bankAccountNo,
          'e_editCustomerStatus': response.result.customer_details[0].cust_status,
          'e_reseller_status': response.result.customer_details[0].reseller_state,
          'e_voip_switch_credit': response.result.customer_details[0].vs_credit,
          'edit_payment_way': response.result.customer_details[0].def_payment_via,

          'e_custBankingCharge': response.result.customer_details[0].banking_charge,
          'e_custAddressUpdateState': response.result.customer_details[0].address_change_state,
          'e_vsProvisionAttachment': response.result.customer_details[0].vs_provisioning_command,
          'DCIP_edit': response.result.customer_details[0].dc_ip_country,
        });

        const formArray = new FormArray([]);
        var bill_code_length = response.result.customer_bill_code_arr.length <= 1 ? 1 : response.result.customer_bill_code_arr.length;
        for (let index = 0; index < bill_code_length; index++) {

          formArray.push(this.fb.group({

            "billCodeName": response.result.customer_bill_code_arr[index].bill_code_name,
            "bill_code_740": response.result.customer_bill_code_arr[index].bill_code_740,
            "bill_code_kl": response.result.customer_bill_code_arr[index].bill_code_kl,
            "bill_code_750": response.result.customer_bill_code_arr[index].bill_code_750,
            "bill_code_750_8": response.result.customer_bill_code_arr[index].bill_code_750_8,
            "bill_code_sg": response.result.customer_bill_code_arr[index].bill_code_sg,
            "customer_bill_code_id": response.result.customer_bill_code_arr[index].customer_bill_code_id,
            "conn_state": response.result.customer_bill_code_arr[index].conn_state,
            "customer_id": response.result.customer_bill_code_arr[index].customer_id,
          })
          );
        }

        console.log(formArray)
        this.billCodeEditForm3.setControl('addresses', formArray);
        console.log(this.addresses)



        this.billCodeEditForm2.patchValue({

          'primary_customer_bill_code_id': response.result.customer_primary_code_arr[0].customer_bill_code_id,
          'primary_code_740': response.result.customer_primary_code_arr[0].bill_code_740,
          'primary_code_retail_740': response.result.customer_primary_code_arr[0].primary_code_retail_740,
          'low_credit_740': response.result.customer_primary_code_arr[0].low_credit_740,
          'high_credit_740': response.result.customer_primary_code_arr[0].high_credit_740,
          'retail_low_credit_740': response.result.customer_primary_code_arr[0].retail_low_credit_740,
          'retail_high_credit_740': response.result.customer_primary_code_arr[0].retail_high_credit_740,


          'primary_code_750': response.result.customer_primary_code_arr[0].bill_code_750,
          'primary_code_retail_750': response.result.customer_primary_code_arr[0].primary_code_retail_750,
          'low_credit_750': response.result.customer_primary_code_arr[0].low_credit_750,
          'high_credit_750': response.result.customer_primary_code_arr[0].high_credit_750,
          'retail_low_credit_750': response.result.customer_primary_code_arr[0].retail_low_credit_750,
          'retail_high_credit_750': response.result.customer_primary_code_arr[0].retail_high_credit_750,


          'primary_code_kl': response.result.customer_primary_code_arr[0].bill_code_kl,
          'primary_code_retail_kl': response.result.customer_primary_code_arr[0].primary_code_retail_kl,
          'low_credit_kl': response.result.customer_primary_code_arr[0].low_credit_kl,
          'high_credit_kl': response.result.customer_primary_code_arr[0].high_credit_kl,
          'retail_low_credit_kl': response.result.customer_primary_code_arr[0].retail_low_credit_kl,
          'retail_high_credit_kl': response.result.customer_primary_code_arr[0].retail_high_credit_kl,

          'primary_code_auto_credit': response.result.customer_primary_code_arr[0].auto_credit,


          'server_name_740': response.result.customer_primary_code_arr[0].server_name_740,
          'pbx_threshold_limit_740': response.result.customer_primary_code_arr[0].pbx_threshold_limit_740,
          'retail_threshold_limit_740': response.result.customer_primary_code_arr[0].retail_threshold_limit_740,

          'server_name_750': response.result.customer_primary_code_arr[0].server_name_750,
          'pbx_threshold_limit_750': response.result.customer_primary_code_arr[0].pbx_threshold_limit_750,
          'retail_threshold_limit_750': response.result.customer_primary_code_arr[0].retail_threshold_limit_750,

          'server_name_kl': response.result.customer_primary_code_arr[0].server_name_kl,
          'pbx_threshold_limit_kl': response.result.customer_primary_code_arr[0].pbx_threshold_limit_kl,
          'retail_threshold_limit_kl': response.result.customer_primary_code_arr[0].retail_threshold_limit_kl,

          'manual_credit': response.result.customer_primary_code_arr[0].manual_credit,




          'primary_code_sg': response.result.customer_primary_code_arr[0].primary_code_sg,
          'primary_code_retail_sg': response.result.customer_primary_code_arr[0].primary_code_retail_sg,
          'low_credit_sg': response.result.customer_primary_code_arr[0].low_credit_sg,
          'high_credit_sg': response.result.customer_primary_code_arr[0].high_credit_sg,
          'retail_low_credit_sg': response.result.customer_primary_code_arr[0].retail_low_credit_sg,
          'retail_high_credit_sg': response.result.customer_primary_code_arr[0].retail_high_credit_sg,


          'server_name_sg': response.result.customer_primary_code_arr[0].server_name_sg,
          'pbx_threshold_limit_sg': response.result.customer_primary_code_arr[0].pbx_threshold_limit_sg,
          'retail_threshold_limit_sg': response.result.customer_primary_code_arr[0].retail_threshold_limit_sg,


        })
        console.log(this.editCustomerForm.value);
        $('#editCustomerFormId_CM').modal('show');
        //    this.customerslist({});
      } else {
        iziToast.warning({
          message: "No API Response",
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
  update(id: any) {

    // let Update_billerNameCheckListDisplay = this.editCustomerForm.value.edit_billernamelist.map((data: any) => data.billerId).join(',');
    // console.log("billerName-in update", Update_billerNameCheckListDisplay);
    // console.log("billerName-in update", this.editBillerNameCheckboxID_array);
    //  email field condition
    let result_Email_Field = this.emailList.map(o => o.emailParameterName).join(',');
    console.log(result_Email_Field);
    let result_FinanceEmail_Field = this.financeemailList.map(o => o.financeemailParameterName).join(',');
    console.log(result_FinanceEmail_Field);

    let api_req: any = new Object();
    let update_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    update_customer_req.action = "customer_update";
    update_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    update_customer_req.customerId = id;
    update_customer_req.customerName = this.editCustomerForm.value.edit_company_Name;
    update_customer_req.billerId = this.editBillerNameCheckboxID_array;
    update_customer_req.def_biller_id = this.editCustomerForm.value.edit_defaultBillerName;
    // alert(this.editBillerNameCheckboxID_array)
    // alert(this.typeConvertionString_editBillName)

    update_customer_req.company_name = this.typeConvertionString_editCustomerClass;
    // update_customer_req.cus_type = this.editCustomerForm.value.editCustomerClassification;
    update_customer_req.cus_type = this.editCustomerClassificationBillerCheckboxID_array;
    // update_customer_req.cus_banking_charge = this.editCustomerForm.value.e_billingAddress_contactPerson;
    update_customer_req.bill_attn = this.editCustomerForm.value.e_billingAddress_contactPerson;
    update_customer_req.customerAddress1 = this.editCustomerForm.value.e_billingAddress_address1;
    update_customer_req.customerAddress2 = this.editCustomerForm.value.e_billingAddress_address2;
    update_customer_req.city = this.editCustomerForm.value.e_billingAddress_city;
    update_customer_req.state = this.editCustomerForm.value.e_billingAddress_state;
    update_customer_req.zipCode = this.editCustomerForm.value.e_billingAddress_zipcode;
    update_customer_req.country = this.editCustomerForm.value.Edit_BA_countryname;
    update_customer_req.ship_attn = this.editCustomerForm.value.e_ESA_cntPerson;
    update_customer_req.ship_to = this.editCustomerForm.value.e_ESA_shipto;
    update_customer_req.ship_customerAddress1 = this.editCustomerForm.value.e_ESA_address1;
    update_customer_req.ship_customerAddress2 = this.editCustomerForm.value.e_ESA_address2;
    update_customer_req.ship_city = this.editCustomerForm.value.e_ESA_city;
    update_customer_req.ship_state = this.editCustomerForm.value.e_ESA_state;
    update_customer_req.ship_zipCode = this.editCustomerForm.value.e_ESA_zipcode;

    update_customer_req.ship_country = this.editCustomerForm.value.e_ESA_countryname;
    update_customer_req.cus_permission = this.editPermissionCheckboxID_array;

    update_customer_req.premium_id = this.editCustomerForm.value.e_ESA_premium;
    update_customer_req.premium_status = this.editCustomerForm.value.e_ESA_premiumStatus;
    update_customer_req.customerPhone = this.editCustomerForm.value.e_ESA_phone;
    update_customer_req.mobilePhone = this.editCustomerForm.value.e_ESA_MobilePhone;
    update_customer_req.fax = this.editCustomerForm.value.e_ESA_FAX;
    update_customer_req.tin_no = this.editCustomerForm.value.e_ESA_GSTNO;
    update_customer_req.website_name = this.editCustomerForm.value.e_ESA_websiteName;
    // update_customer_req.email = this.editCustomerForm.value.ESA_Email;
    update_customer_req.email = result_Email_Field;
    // if (!result_Email_Field) {
    //   iziToast.warning({
    //     message: "Email Missing",
    //     position: 'topRight'
    //   });
    //   return false;
    // }

    update_customer_req.finance_email = result_FinanceEmail_Field;
    if (this.cmsdepartmentEdit_ID == '' || this.cmsdepartmentEdit_ID == null || this.cmsdepartmentEdit_ID == undefined) {
      // iziToast.warning({
      //   message: "CMS Department Missing",
      //   position: 'topRight'
      // });
      // Swal.close();
      // return false;
      update_customer_req.cms_default_department = this.cmsdepartmentEdit_ID;
      update_customer_req.cms_department_name = this.cmsdepartmentEdit_val;
    } else {

      update_customer_req.cms_default_department = this.cmsdepartmentEdit_ID;
      update_customer_req.cms_department_name = this.cmsdepartmentEdit_val;

    }

    // update_customer_req.cms_default_department = this.editCustomerForm.value.edit_cmsdepartment;

    update_customer_req.credit_amt = this.editCustomerForm.value.e_ESA_customerLimit;
    update_customer_req.reseller_id = this.editCustomerForm.value.e_ESA_c3cxResellerId;

    // if(this.editCustomerForm.value.e_ESA_c3cxResellerId !=null || this.editCustomerForm.value.e_ESA_c3cxResellerId !=''){

    //   if( this.editCustomerForm.value.edit_defaultBillerName!=9 && this.cal4care1_sg==false && this.cal4care3_jp==false && this.cal4care2_sdn==false){
    //     iziToast.error({
    //       message: "3CX Reseller License API Checkbox value Missing",
    //       position: 'topRight'
    //     });
    //     Swal.close();
    //     return false;
    //   }else{
    //     update_customer_req.cal4care_sg = this.cal4care1_sg;
    //     update_customer_req.cal4care_sdn = this.cal4care2_sdn;
    //     update_customer_req.cal4care_jp = this.cal4care3_jp;
    //   }
    // }
    if (!this.editCustomerForm.value.e_ESA_c3cxResellerId || this.editCustomerForm.value.e_ESA_c3cxResellerId == 0 || this.editCustomerForm.value.e_ESA_c3cxResellerId == '0') {
      console.log(1)
      // Condition 1: If 3CX Reseller Id is empty, null, or undefined, no error message is shown
      update_customer_req.cal4care_sg = this.cal4care1_sg;
      update_customer_req.cal4care_sdn = this.cal4care2_sdn;
      update_customer_req.cal4care_jp = this.cal4care3_jp;
      update_customer_req.cal4care_none = this.cal4care4_none;
      // added by vignesh for dcare
      if ((!this.editCustomerForm.value.e_ESA_c3cxResellerId || this.editCustomerForm.value.e_ESA_c3cxResellerId == 0 || this.editCustomerForm.value.e_ESA_c3cxResellerId == '0') && (this.addCustomer.value.defaultBillerName == 9)) {
        update_customer_req.cal4care_sg = this.cal4care1_sg;
        update_customer_req.cal4care_sdn = this.cal4care2_sdn;
        update_customer_req.cal4care_jp = this.cal4care3_jp;
        update_customer_req.cal4care_none = this.cal4care4_none;
      }
    } else {
      console.log(2)
      console.log("this.cal4care1_sg", this.cal4care1_sg)
      console.log("!this.cal4care1_sg", !this.cal4care1_sg)
      console.log("this.cal4care2_sdn", this.cal4care2_sdn)
      console.log("!this.cal4care2_sdn", !this.cal4care2_sdn)
      console.log("this.cal4care3_jp", this.cal4care3_jp)
      console.log("!this.cal4care3_jp", !this.cal4care3_jp)
      console.log("this.cal4care4_none", this.cal4care4_none)
      console.log("!this.cal4care4_none", !this.cal4care4_none)

      if (this.editCustomerForm.value.e_ESA_c3cxResellerId != '' && (this.addCustomer.value.defaultBillerName == 9)) {
        update_customer_req.cal4care_sg = this.cal4care1_sg;
        update_customer_req.cal4care_sdn = this.cal4care2_sdn;
        update_customer_req.cal4care_jp = this.cal4care3_jp;
        update_customer_req.cal4care_none = this.cal4care4_none;

      } else if (!this.cal4care1_sg && !this.cal4care2_sdn && !this.cal4care3_jp && !this.cal4care4_none && this.dcare == true) {
        console.log("2.1")
        // Condition 2: If there is any value for 3CX Reseller Id, but no radio button is selected
        iziToast.error({
          message: "Please select a 3CX Reseller License API option.",
          position: 'topRight'
        });
        Swal.close();
        console.log(2)
        return false;
      }
      else {
        // If conditions 1 and 2 are met, proceed with assigning values
        console.log(3)
        console.log("2.2")
        update_customer_req.cal4care_sg = this.cal4care1_sg;
        update_customer_req.cal4care_sdn = this.cal4care2_sdn;
        update_customer_req.cal4care_jp = this.cal4care3_jp;
        update_customer_req.cal4care_none = this.cal4care4_none;

      }
    }

    update_customer_req.def_currency_id = this.editCustomerForm.value.edit_currencyname;
    update_customer_req.stripe_customerId = this.editCustomerForm.value.e_stripe_customer_id;
    update_customer_req.stripe_recurring_state = this.editCustomerForm.value.e_stripe_recurr_payment;
    update_customer_req.system_discount_3cx = this.editCustomerForm.value.e_c3cx_system_discount;
    update_customer_req.reseller_dis_per = this.editCustomerForm.value.e_discount_percentage;
    update_customer_req.cus_banking_charge = this.editCustomerForm.value.e_banking_charge;
    update_customer_req.banking_charge = this.editCustomerForm.value.e_custBankingCharge;
    update_customer_req.reseller_gst_state = this.editCustomerForm.value.e_shopping_gst;
    update_customer_req.send_invoice = this.editCustomerForm.value.e_send_invoice;

    update_customer_req.companyName = this.editCustomerForm.value.e_contact_person_CP;
    update_customer_req.bankAccountName = this.editCustomerForm.value.e_bank_acc_name;
    update_customer_req.bankAccountNo = this.editCustomerForm.value.e_bank_acc_no;
    update_customer_req.cust_status = this.editCustomerForm.value.e_editCustomerStatus;
    update_customer_req.reseller_state = this.editCustomerForm.value.e_reseller_status;

    update_customer_req.vs_credit = this.editCustomerForm.value.e_voip_switch_credit;
    update_customer_req.address_change_state = this.editCustomerForm.value.e_custAddressUpdateState;
    update_customer_req.def_payment_via = this.editCustomerForm.value.edit_payment_way;
    update_customer_req.vs_provisioning_command = this.editCustomerForm.value.e_vsProvisionAttachment;
    update_customer_req.dc_ip_country = this.editCustomerForm.value.DCIP_edit;

    // section - 2

    var addr23 = this.billCodeEditForm3.value.addresses;
    for (let i = 1; i < addr23.length; i++) {

      addr23[i].bill_code_name = $('#billCodeName' + i).val();
      console.log("$('#billCodeName' + i).val()", $('#billCodeName' + i).val());
      addr23[i].bill_code_740 = $('#bill_code_740_' + i).val();
      console.log("$('#bill_code_740_' + i).val()", $('#bill_code_740_' + i).val());
      addr23[i].bill_code_kl = $('#bill_code_kl_' + i).val();
      console.log("$('#bill_code_kl_' + i).val()", $('#bill_code_kl_' + i).val());
      addr23[i].bill_code_sg = $('#bill_code_sg_' + i).val();
      console.log("$('#bill_code_sg_' + i).val()", $('#bill_code_sg_' + i).val());
      addr23[i].bill_code_750 = $('#bill_code_750_' + i).val();
      console.log("$('#bill_code_750_' + i).val()", $('#bill_code_750_' + i).val());
      addr23[i].bill_code_750_8 = $('#bill_code_750_8_' + i).val();
      console.log("$('#bill_code_750_8_' + i).val()", $('#bill_code_750_8_' + i).val());
      addr23[i].customer_bill_code_id = $('#customer_bill_code_id' + i).val();
      console.log("$('#customer_bill_code_id' + i).val()", $('#customer_bill_code_id' + i).val());
      addr23[i].conn_state = $('#conn_state' + i).val();
      console.log("$('#conn_state' + i).val()", $('#conn_state' + i).val());
      addr23[i].customer_id = $('#customer_id' + i).val();
      console.log("$('#customer_id' + i).val()", $('#customer_id' + i).val());
    }
    update_customer_req.billcode_value = addr23;

    // section - 3
    var primary = this.billCodeEditForm2.value;
    console.log(primary);

    update_customer_req.primary_billcode_details = primary
    update_customer_req.bill_code_740 = this.billCodeEditForm2.value.primary_code_740;
    update_customer_req.primary_code_retail_740 = this.billCodeEditForm2.value.primary_code_retail_740;
    update_customer_req.low_credit_740 = this.billCodeEditForm2.value.low_credit_740;
    update_customer_req.high_credit_740 = this.billCodeEditForm2.value.high_credit_740;
    update_customer_req.retail_low_credit_740 = this.billCodeEditForm2.value.retail_low_credit_740;
    update_customer_req.retail_high_credit_740 = this.billCodeEditForm2.value.retail_high_credit_740;



    update_customer_req.bill_code_750 = this.billCodeEditForm2.value.primary_code_750;
    update_customer_req.primary_code_retail_750 = this.billCodeEditForm2.value.primary_code_retail_750;
    update_customer_req.low_credit_750 = this.billCodeEditForm2.value.low_credit_750;
    update_customer_req.high_credit_750 = this.billCodeEditForm2.value.high_credit_750;
    update_customer_req.retail_low_credit_750 = this.billCodeEditForm2.value.retail_low_credit_750;
    update_customer_req.retail_high_credit_750 = this.billCodeEditForm2.value.retail_high_credit_750;


    update_customer_req.bill_code_sg = this.billCodeEditForm2.value.primary_code_sg;
    update_customer_req.primary_code_retail_sg = this.billCodeEditForm2.value.primary_code_retail_sg;
    update_customer_req.low_credit_sg = this.billCodeEditForm2.value.low_credit_sg;
    update_customer_req.high_credit_sg = this.billCodeEditForm2.value.high_credit_sg;
    update_customer_req.retail_low_credit_sg = this.billCodeEditForm2.value.retail_low_credit_sg;
    update_customer_req.retail_high_credit_sg = this.billCodeEditForm2.value.retail_high_credit_sg;

    update_customer_req.bill_code_kl = this.billCodeEditForm2.value.primary_code_kl;
    update_customer_req.primary_code_retail_kl = this.billCodeEditForm2.value.primary_code_retail_kl;
    update_customer_req.low_credit_kl = this.billCodeEditForm2.value.low_credit_kl;
    update_customer_req.high_credit_kl = this.billCodeEditForm2.value.high_credit_kl;
    update_customer_req.retail_low_credit_kl = this.billCodeEditForm2.value.retail_low_credit_kl;
    update_customer_req.retail_high_credit_kl = this.billCodeEditForm2.value.retail_high_credit_kl;


    update_customer_req.auto_credit = this.billCodeEditForm2.value.primary_code_auto_credit;

    update_customer_req.server_name_740 = this.billCodeEditForm2.value.server_name_740;
    update_customer_req.pbx_threshold_limit_740 = this.billCodeEditForm2.value.pbx_threshold_limit_740;
    update_customer_req.retail_threshold_limit_740 = this.billCodeEditForm2.value.retail_threshold_limit_740;


    update_customer_req.server_name_750 = this.billCodeEditForm2.value.server_name_750;
    update_customer_req.pbx_threshold_limit_750 = this.billCodeEditForm2.value.pbx_threshold_limit_750;
    update_customer_req.retail_threshold_limit_750 = this.billCodeEditForm2.value.retail_threshold_limit_750;


    update_customer_req.server_name_kl = this.billCodeEditForm2.value.server_name_kl;
    update_customer_req.pbx_threshold_limit_kl = this.billCodeEditForm2.value.pbx_threshold_limit_kl;
    update_customer_req.retail_threshold_limit_kl = this.billCodeEditForm2.value.retail_threshold_limit_kl;

    update_customer_req.manual_credit = this.billCodeEditForm2.value.manual_credit;


    api_req.element_data = update_customer_req;

    // section 2

    //     var addr = this.billCodeEditForm3.value.addresses;
    // for (let i = 0; i < addr.length; i++){
    //   console.log(addr[i].bill_code_740)

    //   addr[i].billCodeName = $('#bill_code_name_' + i).val();
    //   addr[i].bill_code_740 = $('#bill_code_740_' + i).val();
    //   addr[i].bill_code_kl = $('#bill_code_kl_' + i).val();
    //   addr[i].bill_code_750 = $('#bill_code_750_' + i).val();
    //   addr[i].bill_code_750_8 = $('#bill_code_750_8_' + i).val();
    //   addr[i].customer_bill_code_id = $('#customer_bill_code_id'+ i).val(); 
    //   addr[i].conn_state = $('#conn_state'+ i).val();
    //   addr[i].customer_id = $('#customer_id'+ i).val();

    // }
    // update_customer_req.value = addr; 
    // console.log(api_req);


    //     api_req.element_data = update_customer_req;

    console.log(this.editCustomerForm.value);

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var update_result = response;
      console.log("update", update_result);

      if (response.status == true) {
        iziToast.success({
          message: "Customer Updated successfully",
          position: 'topRight'
        });
        $('#editCustomerFormId_CM').modal('hide');
        this.customerslist({});

      } else {
        iziToast.warning({
          message: "Customer not updated. Please try again",
          position: 'topRight'
        });
        $('#editCustomerFormId_CM').modal('hide');
        this.customerslist({});
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

  addCreditAmount(id: any) {
    this.addCreditEditId = id;
    let api_req: any = new Object();
    let addCredit_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/threshold_amount_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addCredit_customer_req.action = "add_call_credit_amt";
    addCredit_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    addCredit_customer_req.customerId = id;
    api_req.element_data = addCredit_customer_req;


    addCredit_customer_req.primary_customer_bill_code_id = this.billCodeEditForm2.value.primary_customer_bill_code_id;
    addCredit_customer_req.bill_code_740 = this.billCodeEditForm2.value.primary_code_740;
    addCredit_customer_req.primary_code_retail_740 = this.billCodeEditForm2.value.primary_code_retail_740;
    addCredit_customer_req.bill_code_750 = this.billCodeEditForm2.value.primary_code_750;
    addCredit_customer_req.bill_code_retail_750 = this.billCodeEditForm2.value.primary_code_retail_750;
    addCredit_customer_req.bill_code_kl = this.billCodeEditForm2.value.primary_code_kl;
    addCredit_customer_req.bill_code_vs_sg = this.billCodeEditForm2.value.primary_code_sg;
    addCredit_customer_req.bill_code_retail_kl = this.billCodeEditForm2.value.primary_code_retail_kl;


    addCredit_customer_req.add_pbx_or_retail = this.billCodeEditForm4.value.add_pbx_or_retail;
    addCredit_customer_req.add_credit_value_for_740 = this.billCodeEditForm4.value.add_credit_value_for_740;
    addCredit_customer_req.add_credit_value_for_750 = this.billCodeEditForm4.value.add_credit_value_for_750;
    addCredit_customer_req.add_credit_value_for_KL = this.billCodeEditForm4.value.add_credit_value_for_KL;

    api_req.element_data = addCredit_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var update_result = response;
      console.log("update", update_result);

      if (response.status == true) {
        iziToast.success({
          message: "Customer Updated successfully",
          position: 'topRight'
        });
        $('#editCustomerFormId_CM').modal('hide');

      } else {
        iziToast.warning({
          message: "Customer not updated. Please try again",
          position: 'topRight'
        });
        $('#editCustomerFormId_CM').modal('hide');
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


  specialEditCustomer(id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    this.specialEditId = id;
    let api_req: any = new Object();
    let specialEdit_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/special_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    specialEdit_customer_req.action = "special_edit";
    specialEdit_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    specialEdit_customer_req.customerId = id;
    api_req.element_data = specialEdit_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        console.log(response);
        this.checkbox_specialEdit3cxSpecialOption = response[0].licence_buy_override
        this.specialEditCustomerForm.patchValue({
          'spedit_Email': response[0].email,
          'spedit_FinanceEmail': response[0].finance_email,
          'termconditionDD': response[0].terms_condition,
          'spedit_creditlimit': response[0].credit_amt,
          'spedit_C3CXResellerId': response[0].reseller_id,
          'spedit_stripe_recurr_payment': response[0].stripe_recurring_state,
          'spedit_stripe_customer_id': response[0].stripe_customerId,
          'spedit_c3cx_system_discount': response[0].system_discount_3cx,
          'spedit_discount_percentage': response[0].reseller_dis_per,
          'spedit_3cx_BuySpecial': response[0].licence_buy_override,
          'spedit_C3CXLicencepurchase': response[0].payment_chk,
        });
        // console.log(this.specialEditCustomerForm.value);
        // if (response.customer_details[0].status == 1) {
        //   $('#status').prop('checked', true);
        // } else {
        //   $('#status').prop('checked', false);
        // }
        $('#specialEditCustomerFormId_CM').modal('show');
        this.customerslist({});

      } else {
        iziToast.warning({
          message: "No API Response",
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

  specialUpdate(id: any) {

    this.spinner.show();
    let api_req: any = new Object();
    let specialUpdate_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/special_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    specialUpdate_customer_req.action = "special_update";
    specialUpdate_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
    specialUpdate_customer_req.customerId = id;
    specialUpdate_customer_req.email = this.specialEditCustomerForm.value.spedit_Email;
    specialUpdate_customer_req.finance_email = this.specialEditCustomerForm.value.spedit_FinanceEmail;
    specialUpdate_customer_req.terms_condition = this.specialEditCustomerForm.value.termconditionDD;
    specialUpdate_customer_req.credit_amt = this.specialEditCustomerForm.value.spedit_creditlimit;
    specialUpdate_customer_req.reseller_id = this.specialEditCustomerForm.value.spedit_C3CXResellerId;
    specialUpdate_customer_req.stripe_recurring_state = this.specialEditCustomerForm.value.spedit_stripe_recurr_payment;
    specialUpdate_customer_req.stripe_customerId = this.specialEditCustomerForm.value.spedit_stripe_customer_id;
    specialUpdate_customer_req.system_discount_3cx = this.specialEditCustomerForm.value.spedit_c3cx_system_discount;
    specialUpdate_customer_req.reseller_dis_per = this.specialEditCustomerForm.value.spedit_discount_percentage;
    specialUpdate_customer_req.licence_buy_override = this.checkbox_specialEdit3cxSpecialOption;

    api_req.element_data = specialUpdate_customer_req;
    console.log(this.specialEditCustomerForm.value);

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#specialEditCustomerFormId_CM").modal("hide");
      this.spinner.hide();
      console.log(response);
      var update_result = response;
      console.log("special update", update_result);
      if (response != '') {
        this.spinner.hide();
        $("#specialEditCustomerFormId_CM").modal("hide");
        iziToast.success({
          message: "Special Update of Customer Updated successfully",
          position: 'topRight'
        });

      } else {
        this.spinner.hide();
        $("#specialEditCustomerFormId_CM").modal("hide");
        iziToast.warning({
          message: "Special Update of Customer not updated. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        $("#specialEditCustomerFormId_CM").modal("hide");
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  deleteCustomer(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let delete_customer_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_customer_req.action = "customer_delete";
        delete_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
        delete_customer_req.customerId = id;
        api_req.element_data = delete_customer_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            iziToast.success({
              message: "Customer Deleted successfully",
              position: 'topRight'
            });
            this.customerslist({});
          } else {
            iziToast.warning({
              message: "Customer not deleted. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }


  fileAttachmentEdit(ID: any, i: any) {
    $("#ActionId" + i).modal("hide");

    this.myFiles = [];
    $("#fileAttachmentFormId_CM").modal("show");
    $("#file1").val('')
    // this.fileAttachContractID = fileAttachContractID;
    this.fileAttachCustomerID = ID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_file_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "get_file_attachment_details";
    fileattach_req.customerId = ID;
    fileattach_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.getResult = response.result.attachment_details

        this.myForm.patchValue({
          'file': response.result.attachment_details.org_file_name,
        });
      } else {
        iziToast.warning({
          message: "No API Response",
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
  fileAttachmentDelete(credit_attament_id: any) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        this.credit_attachment_id = credit_attament_id;
        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = "customer";

        api_req.api_url = "customer/customer_file_attachment_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        fileattachDelete_req.action = "customer_file_attachment_delete";
        fileattachDelete_req.credit_attach_id = "" + credit_attament_id + "";
        fileattachDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            iziToast.success({
              message: "File Attachment Deleted successfully",
              position: 'topRight'
            });
            $("#fileAttachmentFormId_CM").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
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
    })


  }
  fileAttachmentUpdate() {

    this.myForm.reset();
    //  var data = new FormData();
    Swal.fire('File Updating');
    Swal.showLoading();

    if (this.myFiles.length == 0) {
      Swal.close();
      iziToast.warning({
        message: "Attachment File Missing",
        position: 'topRight'
      });
    }
    if (this.myFiles.length > 0) {
      const data = new FormData();

      for (var i = 0; i < this.myFiles.length; i++) {
        data.append("cust_file[]", this.myFiles[i]);
      }
      data.append('customerId', this.fileAttachCustomerID);
      data.append('action', "customer_file_attachment_save");


      var self = this;
      $.ajax({
        type: 'POST',
        url: this.serverService.urlFinal + 'customer/customer_file_attachment_save',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {
            this.myFiles = [];

            self.customerslist({});
            console.log(result);
            Swal.close();
            $("#fileAttachmentFormId_CM").modal("hide");

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#fileAttachmentFormId_CM").modal("hide");
            iziToast.warning({
              message: "File Attachment not Saved",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#fileAttachmentFormId_CM").modal("hide");
        }

      })


    }
  }
  mconnect_address_getList(id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    this.mconnectCustomerForm.reset();
    this.mconnect_Logo_Image = '';
    this.mconnectParameter = id;
    let api_req: any = new Object();
    let api_mconnectList: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/mconnect_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mconnectList.action = "mconnect_address_details";
    api_mconnectList.customerId = id;
    api_mconnectList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_mconnectList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        // this.image_mconnectLogo = response.mconnect_company_logo;
        // console.log(this.image_mconnectLogo)

        this.mconnect_PartnerEmail_Value = response[0].partner_email;
        this.mconnect_PartnerPhoneNumber_Value = response[0].partner_phone_no;
        this.mconnect_PartnerType_Value_Radio = response[0].partner_type;
        this.mconnect_AddressShowState_Value = response.mconnect_show_state == 1 ? true : false;
        console.log("response.mconnect_company_logo", response.mconnect_company_logo)
        this.mconnect_Logo_Image = response.mconnect_company_logo;


        this.mconnectCustomerForm.patchValue({
          'a_mconnectPartnerEmail': response[0].partner_email,
          'a_mconnectPartnerPhoneNum': response[0].partner_phone_no,
          'a_mconnectPartnerType': response[0].partner_type,
          'a_mconnectAddressShow': response.mconnect_show_state == 1 ? true : false,

          // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
        });
        iziToast.success({
          message: "Mconnect Partner Details displayed successfully",
          position: 'topRight'

        });

      } else {
        iziToast.warning({
          message: "Mconnect Partner details not available for this Customer",
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
  onCal4careAddChange(selection: string) {
    if (selection === 'cal4care1_sg_add') {
      this.cal4care1_sg_add = true;
      this.cal4care2_sdn_add = false;
      this.cal4care3_jp_add = false;
      this.cal4care4_none_add = false;

    } else if (selection === 'cal4care2_sdn_add') {
      this.cal4care1_sg_add = false;
      this.cal4care2_sdn_add = true;
      this.cal4care3_jp_add = false;
      this.cal4care4_none_add = false;
    } else if (selection === 'cal4care3_jp_add') {
      this.cal4care1_sg_add = false;
      this.cal4care2_sdn_add = false;
      this.cal4care3_jp_add = true;
      this.cal4care4_none_add = false;
    } else if (selection === 'cal4care4_none_add') {
      this.cal4care1_sg_add = false;
      this.cal4care2_sdn_add = false;
      this.cal4care3_jp_add = false;
      this.cal4care4_none_add = false;
    }
    console.log("selection", selection);
    console.log("this.cal4care1_sg_add", this.cal4care1_sg_add)
    console.log("this.cal4care2_sdn_add", this.cal4care2_sdn_add)
    console.log("this.cal4care3_jp_add", this.cal4care3_jp_add)
    console.log("this.cal4care4_none_add", this.cal4care4_none_add)
  }
  onCal4careChange(selection: string) {

    if (selection === 'cal4care1_sg') {
      this.cal4care1_sg = true;
      this.cal4care2_sdn = false;
      this.cal4care3_jp = false;
      this.cal4care4_none = false;
    } else if (selection === 'cal4care2_sdn') {
      this.cal4care1_sg = false;
      this.cal4care2_sdn = true;
      this.cal4care3_jp = false;
      this.cal4care4_none = false;
    } else if (selection === 'cal4care3_jp') {
      this.cal4care1_sg = false;
      this.cal4care2_sdn = false;
      this.cal4care3_jp = true;
      this.cal4care4_none = false;
    } else if (selection === 'cal4care4_none') {
      this.cal4care1_sg = false;
      this.cal4care2_sdn = false;
      this.cal4care3_jp = false;
      this.cal4care4_none = false;
    }
    console.log("selection", selection);
    console.log("this.cal4care1_sg", this.cal4care1_sg)
    console.log("this.cal4care2_sdn", this.cal4care2_sdn)
    console.log("this.cal4care3_jp", this.cal4care3_jp)
    console.log("this.cal4care4_none", this.cal4care4_none)
  }

  mconnect_address_add(id: any) {
    Swal.fire('MConnect Partner Details Updating');
    Swal.showLoading();
    var data = new FormData();

    data.append('partner_email_mconnect', this.mconnectCustomerForm.value.a_mconnectPartnerEmail);
    data.append('partner_phone_no_mconnect', this.mconnectCustomerForm.value.a_mconnectPartnerPhoneNum);
    // data.append('mconnect_address_show', this.mconnect_AddressShowState_Value);
    data.append('mconnect_address_show', this.mconnectCustomerForm.controls['a_mconnectAddressShow'].value);
    data.append('customerId', id);
    data.append('mconnect_partner_type', this.mconnectCustomerForm.value.a_mconnectPartnerType);
    data.append('mconnect_company_logo', $("#uploaded-mconnect")[0].files[0]);
    data.append('action', "mconnect_address_save");

    var self = this;
    $.ajax({
      type: 'POST',
      url: this.serverService.urlFinal + 'customer/mconnect_address_save',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          Swal.close();

          console.log(result);
          $("#mconnectPartnerDetailsFormId_CM").modal("hide")

          iziToast.success({
            message: "mconnect details Saved successfully",
            position: 'topRight'
          });

          self.customerslist({});
        }
        else {
          Swal.close();
          $("#mconnectPartnerDetailsFormId_CM").modal("hide")
          iziToast.warning({
            message: "mconnect details not Saved",
            position: 'topRight'
          });
        }
      },
      error: function (err: any) {

        console.log("err", err)
        iziToast.error({
          message: "500 Error",
          position: 'topRight'
        });
        Swal.close();
        $("#mconnectPartnerDetailsFormId_CM").modal("hide")
      }

    })



  }

  mrvoip_address_getList(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.mrvoipCustomerForm.reset();
    this.mrvoip_Logo_Image = '';
    this.mrvoipParameter = id;
    let api_req: any = new Object();
    let api_mrvoipList: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/mrvoip_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mrvoipList.action = "mrvoip_address_details";
    api_mrvoipList.customerId = id;
    api_mrvoipList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_mrvoipList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.image_mrvoipLogo = response[0].mrvoip_company_logo;

        this.mrvoip_PartnerEmail_Value = response[0].partner_email;
        this.mrvoip_PartnerPhoneNumber_Value = response[0].partner_phone_no;
        this.mrvoip_PartnerType_Value_Radio = response[0].partner_type;
        //  this.mrvoip_AddressShowState_Value = response.mconnect_show_state==1?true:false;
        console.log("0 to false, 1 to true response.call4tel_show_state ", this.mrvoip_AddressShowState_Value)
        // console.log("mrvoip_company_logo ", response.mrvoip_company_logo);
        this.mrvoip_Logo_Image = response.mrvoip_company_logo;


        this.mrvoipCustomerForm.patchValue({
          'a_MrvoipPartnerEmail': response[0].partner_email,
          'a_MrvoipPartnerPhoneNum': response[0].partner_phone_no,
          'a_MrvoipPartnerType': response[0].partner_type,
          'a_MrvoipAddressShow': response.mrvoip_show_state == 1 ? true : false,


        });
        iziToast.success({
          message: "Mrvoip Partner Details displayed successfully ",
          position: 'topRight'
        });

      } else {
        iziToast.warning({
          message: "Mrvoip Partner details not available for this Customer",
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
  mrvoip_address_add(id: any) {
    Swal.fire('Mrvoip Partner Details Updating');
    Swal.showLoading();
    var data = new FormData();

    data.append('partner_email_mrvoip', this.mrvoipCustomerForm.value.a_MrvoipPartnerEmail);
    data.append('partner_phone_no_mrvoip', this.mrvoipCustomerForm.value.a_MrvoipPartnerPhoneNum);
    data.append('mrvoip_address_show', this.mrvoipCustomerForm.controls['a_MrvoipAddressShow'].value);
    data.append('customerId', id);
    data.append('mrvoip_partner_type', this.mrvoipCustomerForm.value.a_MrvoipPartnerType);
    data.append('mrvoip_company_logo', $("#uploaded-mrvoip")[0].files[0]);
    data.append('action', "mrvoip_address_save");

    var self = this;
    $.ajax({
      type: 'POST',
      url: this.serverService.urlFinal + 'customer/mrvoip_address_save',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          Swal.close();

          console.log(result);
          $("#MrvoipPartnerDetailsFormId_CM").modal("hide")

          iziToast.success({
            message: "MrVoip details Saved successfully",
            position: 'topRight'
          });

          self.customerslist({});
        }
        else {
          Swal.close();
          $("#MrvoipPartnerDetailsFormId_CM").modal("hide")
          iziToast.warning({
            message: "MrVoip details not Saved",
            position: 'topRight'
          });
        }
      },
      error: function (err: any) {

        console.log("err", err)
        iziToast.error({
          message: "500 Error",
          position: 'topRight'
        });
        Swal.close();
        $("#MrvoipPartnerDetailsFormId_CM").modal("hide")
      }

    })
  }

  call4tel_address_getList(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.Call4telCustomerForm.reset();
    this.C4T_Logo_Image = '';
    this.Call4telParameter = id;
    let api_req: any = new Object();
    let api_call4telList: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/call4tel_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_req.action = "call4tel_address_details";
    api_call4telList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_call4telList.customerId = id;
    api_req.element_data = api_call4telList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.C4T_PartnerEmail_Value = response[0].partner_email;
        this.C4T_PartnerPhoneNumber_Value = response[0].partner_phone_no;
        this.C4T_PartnerType_Value_Radio = response[0].partner_type;
        this.C4T_AddressShowState_Value = Boolean(response.call4tel_show_state);
        console.log("0 to false, 1 to true response.call4tel_show_state ", this.C4T_AddressShowState_Value)
        this.C4T_Logo_Image = response.call4tel_company_logo;
        // console.log("response[0].partner_type",response[0].partner_type);
        this.Call4telCustomerForm.patchValue({

          'a_C4TPartnerEmail': response[0].partner_email,
          'a_C4TPartnerPhoneNum': response[0].partner_phone_no,
          'a_C4TPartnerType': response[0].partner_type,
          'a_selectLogo_C4T': response[0].call4tel_company_logo,
          'a_C4TAddressShow': response.call4tel_show_state,
        });
        iziToast.success({
          message: "Call4tel Partner Details displayed successfully",
          position: 'topRight'
        });

      } else {
        iziToast.warning({
          message: "Call4tel Partner details not available for this Customer",
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
  call4tel_address_add(id: any) {
    Swal.fire('Call4tel Partner Details Updating');
    Swal.showLoading();
    var data = new FormData();

    data.append('partner_email_call4tel', this.Call4telCustomerForm.value.a_C4TPartnerEmail);
    data.append('partner_phone_no_call4tel', this.Call4telCustomerForm.value.a_C4TPartnerPhoneNum);
    data.append('call4tel_address_show', this.C4T_AddressShowState_Value);
    data.append('cus_permission_popup', this.C4T_AddressShowState_Value);
    data.append('customerId', id);
    data.append('call4tel_partner_type', this.Call4telCustomerForm.value.a_C4TPartnerType);
    data.append('call4tel_company_logo', $("#uploaded-C4T")[0].files[0]);
    data.append('action', "call4tel_address_save");

    var self = this;
    $.ajax({
      type: 'POST',
      url: this.serverService.urlFinal + 'customer/call4tel_address_save',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          Swal.close();

          console.log(result);
          $("#call4tellPartnerDetailsFormId_CM").modal("hide")

          iziToast.success({
            message: "call4tell details Saved successfully",
            position: 'topRight'
          });
          self.customerslist({});
        }
        else {
          Swal.close();
          $("#call4tellPartnerDetailsFormId_CM").modal("hide")
          iziToast.warning({
            message: "call4tell details not Saved",
            position: 'topRight'
          });
        }
      },
      error: function (err: any) {

        console.log("err", err)
        iziToast.error({
          message: "500 Error",
          position: 'topRight'
        });
        Swal.close();
        $("#call4tellPartnerDetailsFormId_CM").modal("hide")
      }

    })



  }

  nx32CustomerCreate(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to create NX32 Customer?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result: any) => {
      if (result.value) {

        Swal.fire('Email Sending');
        Swal.showLoading();
        let api_req: any = new Object();
        let nx32Create_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/nx32_customer_create";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        nx32Create_req.action = "nx32_customer_create";
        nx32Create_req.user_id = localStorage.getItem('erp_c4c_user_id');
        nx32Create_req.customerId = id;
        api_req.element_data = nx32Create_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            Swal.close();
            iziToast.success({
              message: "NX32 Customer Created Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            iziToast.warning({
              message: "Duplicate",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }


  invoiceShare_edit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");


    this.invoice_shareCustomerPermission_ID = id;

    let api_req: any = new Object();
    let invoiceShare_edit_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/invoice_share_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    invoiceShare_edit_req.action = "invoice_share_edit";
    invoiceShare_edit_req.user_id = localStorage.getItem('erp_c4c_user_id');
    invoiceShare_edit_req.customerId = id;
    api_req.element_data = invoiceShare_edit_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        // this.selectedValues = response.customer_invoice_arr.invoice_access_userid;
        this.Invoice_shareCustomerPermission_EditOnLoad_Values =
          response.customer_invoice_arr.invoice_access_userid;
        this.Invoice_SharedCustomerPermission_List = response.user_details;
        this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission = response.customer_invoice_arr.invoice_access_userid.split(',').map(Number);;
        // this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission = response.customer_invoice_arr.invoice_access_userid.split(',');
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)
      } else {
        iziToast.warning({
          message: "No API Response",
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
  // invoiceShare_edit(id: any) {
  //   let api_req: any = new Object();
  //   let invoiceShare_edit_req: any = new Object();
  //   api_req.moduleType = "customer";
  //   api_req.api_url = "customer/invoice_share_edit";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   invoiceShare_edit_req.action = "invoice_share_edit";
  //   invoiceShare_edit_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   invoiceShare_edit_req.customerId = id;
  //   api_req.element_data = invoiceShare_edit_req;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {

  //     console.log("invoice share response", response);
  //     if (response != '') {

  //       this.invoiceSharedEdit1 = [];
  //       this.invoiceSharedEdit1 = response.user_details;

  //       console.log(this.invoiceSharedEdit1)


  //       this.invoiceSharedCustomerForm.patchValue({

  //         'invShared_checklist': response.user_details,
  //       });
  //     }
  //   });


  // }

  invoiceShare_update() {
    this.spinner.show();
    let api_req: any = new Object();
    let invoiceShare_update_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/invoice_share_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    invoiceShare_update_req.action = "invoice_share_update";
    invoiceShare_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    invoiceShare_update_req.customerId = this.invoice_shareCustomerPermission_ID;
    invoiceShare_update_req.invoice_share_user = this.typeConvertionString_invoice_Shared_Permission;
    api_req.element_data = invoiceShare_update_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        iziToast.success({
          message: "Share Customer Permission Updated successfully",
          position: 'topRight'
        });

        $('#invoiceSharedCustomerFormId_CM').modal('hide');
        $("#sel_check").val('');
        this.typeConvertionString_invoice_Shared_Permission = [];
      } else {
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

  // invoiceShare_update(id: any) {
  //   this.invoiceSharedParameter = id;

  //   let api_req: any = new Object();
  //   let invoiceShare_update_req: any = new Object();
  //   api_req.moduleType = "customer";
  //   api_req.api_url = "customer/invoice_share_update";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   invoiceShare_update_req.action = "invoice_share_update";
  //   invoiceShare_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   invoiceShare_update_req.customerId = id;
  //   invoiceShare_update_req.firstName_salary = this.invoiceSharedCustomerForm.value.invShared_checklist;
  //   api_req.element_data = invoiceShare_update_req;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     console.log(response);
  //     console.log("invoice shared update", response);
  //     if (response != '') {

  //       iziToast.success({
  //         message: "Special Update of Customer Updated successfully",
  //         position: 'topRight'
  //       });


  //     }
  //     else {

  //       iziToast.warning({
  //         message: "Special Update of Customer not updated. Please try again",
  //         position: 'topRight'
  //       });

  //     }
  //   });

  // }
  quickMail(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to Send Quick Mail?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!'
    }).then((result: any) => {
      if (result.value) {

        Swal.fire('Email Sending');
        Swal.showLoading();
        let api_req: any = new Object();
        let qckMail_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_quick_mail";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        qckMail_req.action = "customer_quick_mail";
        qckMail_req.user_id = localStorage.getItem('erp_c4c_user_id');
        qckMail_req.customerId = id;
        api_req.element_data = qckMail_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Quick Mail Sent Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            iziToast.warning({
              message: "Sending Quick Mail Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }
  shareCustomerPermission_edit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    this.shareCustomerPermission_ID = id;
    let api_req: any = new Object();
    let shareCustomerPermission_edit: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_share";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    shareCustomerPermission_edit.action = "customer_share";
    shareCustomerPermission_edit.user_id = localStorage.getItem('erp_c4c_user_id');
    shareCustomerPermission_edit.customerId = id;
    api_req.element_data = shareCustomerPermission_edit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.shareCustomerPermission_EditOnLoad_Values = response.access_user[0].access_userid;
        this.SharedCustomerPermission_List = response.user_details;
        this.CheckBox_DynamicArrayList_shareCustomerPermission = response.access_user[0].access_userid.split(',').map(Number);
        console.log("access_userid", this.CheckBox_DynamicArrayList_shareCustomerPermission);

        //  this.CheckBox_DynamicArrayList_shareCustomerPermission =  response.access_user[0].access_userid.split(',');
        // const chk_arr = response.access_user[0].access_userid.split(',');
        // for (var i = 0; i < chk_arr.length; i++) {
        //   this.CheckBox_DynamicArrayList_shareCustomerPermission.push(Number(chk_arr[i]));
        //   this.CheckBox_DynamicArrayList_shareCustomerPermission.join(',');
        // }


        //this.CheckBox_DynamicArrayList_shareCustomerPermission =   response.access_user[0].access_userid.split(',');


      } else {
        iziToast.warning({
          message: "No API Response",
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
  shareCustomerPermission_update(id: any) {
    this.spinner.show();
    this.shareCustomerPermissionParameter = id;

    let api_req: any = new Object();
    let shareCustomerPermission_update_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_share_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    shareCustomerPermission_update_req.action = "customer_share_update";
    shareCustomerPermission_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    shareCustomerPermission_update_req.customerId = this.shareCustomerPermission_ID;
    shareCustomerPermission_update_req.access_userid = this.CheckBox_DynamicArrayList_shareCustomerPermission;
    api_req.element_data = shareCustomerPermission_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        iziToast.success({
          message: "Share Customer Permission Updated successfully",
          position: 'topRight'
        });

        $('#SharedCustomerPermissionFormId_CM').modal('hide');
        $("#sel_check").val('');
        this.CheckBox_DynamicArrayList_shareCustomerPermission = [];
      }
      else {
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


  customer_status(id: any, Status_variable: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to change Customer status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();

        console.log("id", id)
        var status;
        if (Status_variable == 'P') {
          status = 'N'
        } else {
          status = 'P'
        }
        let api_req: any = new Object();
        let api_customerStatus_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_status_update";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_customerStatus_req.action = "customer_status_update";
        api_customerStatus_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_customerStatus_req.customerId = id;
        api_customerStatus_req.cust_status = status;
        api_req.element_data = api_customerStatus_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            console.log("before change", this.isCustomerStatus)
            this.isCustomerStatus = !this.isCustomerStatus;
            console.log("after change", this.isCustomerStatus)

            iziToast.success({
              message: "Customer Status changed successfully",
              position: 'topRight'
            });
            this.customerslist({});
          } else {
            iziToast.warning({
              message: "Customer Status not changed. Please try again",
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
    })


  }
  employee_status(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to change Employee status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let api_empStatus_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/emp_status_update";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_empStatus_req.action = "emp_status_update";
        api_empStatus_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_empStatus_req.customerId = id;
        api_req.element_data = api_empStatus_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            console.log("before change-employee status", this.isEmployeeStatus)
            this.isEmployeeStatus = !this.isEmployeeStatus;
            console.log("after change-employee status", this.isEmployeeStatus)
            iziToast.success({
              message: "Employee Status changed successfully",
              position: 'topRight'
            });
            this.customerslist({});
          } else {
            iziToast.warning({
              message: "Employee Status not changed. Please try again",
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
    })


  }
  reseller_statusMethod(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to change Reseller status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let api_resellerStatus_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/reseller_status_update";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_resellerStatus_req.action = "reseller_status_update";
        api_resellerStatus_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_resellerStatus_req.customerId = id;
        api_req.element_data = api_resellerStatus_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            console.log("before change-reseller status", this.isResllerStatus)
            this.isResllerStatus = !this.isResllerStatus;
            console.log("after change-reseller status", this.isResllerStatus)
            iziToast.success({
              message: "Reseller Status changed successfully",
              position: 'topRight'
            });
            this.customerslist({});
          } else {
            iziToast.warning({
              message: "Reseller Status not changed. Please try again",
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
    })


  }
  customer_NX32PermissionDisplay(id: any, nx32id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    console.log("checkbox result", this.checkbox_NX32Permission)
    this.NX32SharePermissionParameter = id;
    this.nx32permissionStatus = nx32id;
    let api_req: any = new Object();
    let api_nx32Permission_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_customer_nx32_permission";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32Permission_req.action = "get_customer_nx32_permission";
    api_nx32Permission_req.customerId = id;
    api_nx32Permission_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_nx32Permission_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.checkbox_status_nx32Permission = response.status;
      console.log("customer nx32 permission response.status", response.status);
      if (response != '') {
        this.customerNX32SharePermissionForm.patchValue({

          'nx32CustomerPermission_checklist': response.status,
        });

        iziToast.success({
          message: "Customer NX32 Permission Displayed successfully",
          position: 'topRight'
        });


      } else {
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

  customer_NX32PermissionUpdate(id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_nx32_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_nx32_update";
    api_nx32PermissionUpdate_req.customerId = this.NX32SharePermissionParameter;
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.nx32_perm = this.checkbox_NX32Permission;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      this.checkbox_status_nx32Permission = response.status;
      console.log("customer nx32 permission response.status", response.status);
      if (response.status == true) {
        $('#customer_NX32PermissionFormId_CM').modal('hide');
        this.customerslist({});

        iziToast.success({
          message: "Customer NX32 Permission Updated successfully",
          position: 'topRight'
        });


      } else {
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
  billCodeAttachmentEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    // this.billCodeEditForm2.reset();
    let api_req: any = new Object();
    let api_billCodeEdit_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/bill_code_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_billCodeEdit_req.action = "bill_code_details";
    api_billCodeEdit_req.customerId = id;
    api_billCodeEdit_req.user_id = localStorage.getItem('erp_c4c_user_id');

    this.popupBillCodeForm2.patchValue({
      'popup_customerId': id,
    });

    api_req.element_data = api_billCodeEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("bill code edit", response);
      // console.log("bill code edit check other empty", response.primary_bill_code[0].customer_bill_code_id);

      this.billCodeResponse = response;

      if (response != '') {
        // this.edit_a = response.customer_bill_code;
        // this.edit_b = response.primary_bill_code;

        const formArray = new FormArray([]);
        var bill_code_length = response.customer_bill_code_arr.length <= 1 ? 1 : response.customer_bill_code_arr.length;
        for (let index = 0; index < bill_code_length; index++) {
          formArray.push(this.fb.group({

            "popup_billCodeName": response.customer_bill_code_arr[index].bill_code_name,
            "popup_bill_code_740": response.customer_bill_code_arr[index].bill_code_740,
            "popup_bill_code_kl": response.customer_bill_code_arr[index].bill_code_kl,
            "popup_bill_code_sg": response.customer_bill_code_arr[index].bill_code_vs_sg,
            "popup_bill_code_750": response.customer_bill_code_arr[index].bill_code_750,
            "popup_bill_code_750_8": response.customer_bill_code_arr[index].bill_code_750_8,
            "popup_conn_state": response.customer_bill_code_arr[index].conn_state,
            "popup_customer_bill_code_id": response.customer_bill_code_arr[index].customer_bill_code_id,
            "popup_customer_id": response.customer_bill_code_arr[index].customer_id,
          })
          );
        }
        console.log(formArray)
        this.popupBillCodeForm3.setControl('popupBillCode1', formArray);
        console.log(this.popupBillCode1)

      }
      // if (response.primary_bill_code != '') {
      this.popupBillCodeForm2.patchValue({


        'popup_primary_customer_bill_code_id': response.customer_primary_code_arr[0].customer_bill_code_id,
        'popup_primary_code_740': response.customer_primary_code_arr[0].bill_code_740,
        'popu_primary_code_retail_750': response.customer_primary_code_arr[0].primary_code_retail_740,
        'popup_low_credit_740': response.customer_primary_code_arr[0].low_credit_740,
        'popup_high_credit_740': response.customer_primary_code_arr[0].high_credit_740,
        'popup_retail_low_credit_740': response.customer_primary_code_arr[0].retail_low_credit_740,
        'popup_retail_high_credit_740': response.customer_primary_code_arr[0].retail_high_credit_740,


        'popup_primary_code_750': response.customer_primary_code_arr[0].bill_code_750,
        'popup_primary_code_retail_750': response.customer_primary_code_arr[0].primary_code_retail_750,
        'popup_low_credit_750': response.customer_primary_code_arr[0].low_credit_750,
        'popup_high_credit_750': response.customer_primary_code_arr[0].high_credit_750,
        'popup_retail_low_credit_750': response.customer_primary_code_arr[0].retail_low_credit_750,
        'popup_retail_high_credit_750': response.customer_primary_code_arr[0].retail_high_credit_750,


        'popup_primary_code_kl': response.customer_primary_code_arr[0].bill_code_kl,
        'popup_primary_code_retail_kl': response.customer_primary_code_arr[0].primary_code_retail_kl,
        'popup_low_credit_kl': response.customer_primary_code_arr[0].low_credit_kl,
        'popup_high_credit_kl': response.customer_primary_code_arr[0].high_credit_kl,
        'popup_retail_low_credit_kl': response.customer_primary_code_arr[0].retail_low_credit_kl,
        'popup_retail_high_credit_kl': response.customer_primary_code_arr[0].retail_high_credit_kl,

        'popup_primary_code_sg': response.customer_primary_code_arr[0].bill_code_vs_sg,
        'popup_primary_code_retail_sg': response.customer_primary_code_arr[0].primary_code_retail_sg,
        'popup_low_credit_sg': response.customer_primary_code_arr[0].low_credit_sg,
        'popup_high_credit_sg': response.customer_primary_code_arr[0].high_credit_sg,
        'popup_retail_low_credit_sg': response.customer_primary_code_arr[0].retail_low_credit_sg,
        'popup_retail_high_credit_sg': response.customer_primary_code_arr[0].retail_high_credit_sg,

        'popup_primary_code_auto_credit': response.customer_primary_code_arr[0].auto_credit,

        'popup_server_name_740': response.customer_primary_code_arr[0].server_name_740,
        'popup_pbx_threshold_limit_740': response.customer_primary_code_arr[0].pbx_threshold_limit_740,
        'popup_retail_threshold_limit_740': response.customer_primary_code_arr[0].retail_threshold_limit_740,

        'popup_server_name_750': response.customer_primary_code_arr[0].server_name_750,
        'popup_pbx_threshold_limit_750': response.customer_primary_code_arr[0].pbx_threshold_limit_750,
        'popup_retail_threshold_limit_750': response.customer_primary_code_arr[0].retail_threshold_limit_750,

        'popup_server_name_kl': response.customer_primary_code_arr[0].server_name_kl,
        'popup_pbx_threshold_limit_kl': response.customer_primary_code_arr[0].pbx_threshold_limit_kl,
        'popup_retail_threshold_limit_kl': response.customer_primary_code_arr[0].retail_threshold_limit_kl,

        'manual_credit': response.customer_primary_code_arr[0].manual_credit,

      });

      // }
      console.log("bill code edit form 2", this.billCodeEditForm2.value);

      // }

    });



  }
  billCodeAttachmentUpdate() {
    // $("#editCustomerContractId").modal("hide");
    // console.log(this.editContractGroupForm.value)
    // console.log(this.billCodeEditForm1.value.billCodeGroupRow);
    // console.log(this.edit_a);
    this.spinner.show();
    let api_req: any = new Object();
    let updateBillCode_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/billcode_details_update"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    updateBillCode_req.action = "billcode_details_update";
    updateBillCode_req.user_id = localStorage.getItem('erp_c4c_user_id');
    updateBillCode_req.customer_bill_code = this.edit_a;
    updateBillCode_req.primary_bill_code = this.edit_b;
    // updateBillCode_req.values2 = this.billCodeEditForm1.value.edit_addresses;

    // section - 2
    updateBillCode_req.customerId = this.popupBillCodeForm2.value.popup_customerId;
    var addr = this.popupBillCodeForm3.value.popupBillCode1;
    for (let i = 0; i < addr.length; i++) {
      console.log(addr[i].bill_code_740)

      addr[i].billCodeName = $('#bill_code_name_' + i).val();
      addr[i].bill_code_740 = $('#bill_code_740_' + i).val();
      addr[i].bill_code_kl = $('#bill_code_kl_' + i).val();
      addr[i].bill_code_750 = $('#bill_code_750_' + i).val();
      addr[i].bill_code_750_8 = $('#bill_code_750_8_' + i).val();
      addr[i].bill_code_sg = $('#bill_code_sg_' + i).val();
      addr[i].conn_state = $('#conn_state' + i).val();
      addr[i].customer_bill_code_id = $('#customer_bill_code_id' + i).val();
      addr[i].customer_id = $('#customer_id' + i).val();

    }
    updateBillCode_req.billcode_value = addr;

    // section - 3  



    var popup_primary_code_arr = this.popupBillCodeForm2.value
    console.log(popup_primary_code_arr);
    updateBillCode_req.primary_billcode_details = popup_primary_code_arr;


    updateBillCode_req.bill_code_740 = this.popupBillCodeForm2.value.primary_code_740;
    updateBillCode_req.primary_code_retail_740 = this.popupBillCodeForm2.value.popup_primary_code_retail_740;
    updateBillCode_req.low_credit_740 = this.popupBillCodeForm2.value.popup_low_credit_740;
    updateBillCode_req.high_credit_740 = this.popupBillCodeForm2.value.popup_high_credit_740;
    updateBillCode_req.retail_low_credit_740 = this.popupBillCodeForm2.value.popup_retail_low_credit_740;
    updateBillCode_req.retail_high_credit_740 = this.popupBillCodeForm2.value.popup_retail_high_credit_740;



    updateBillCode_req.bill_code_750 = this.popupBillCodeForm2.value.popup_primary_code_750;
    updateBillCode_req.primary_code_retail_750 = this.popupBillCodeForm2.value.popup_primary_code_retail_750;
    updateBillCode_req.low_credit_750 = this.popupBillCodeForm2.value.popup_low_credit_750;
    updateBillCode_req.high_credit_750 = this.popupBillCodeForm2.value.popup_high_credit_750;
    updateBillCode_req.retail_low_credit_750 = this.popupBillCodeForm2.value.popup_retail_low_credit_750;
    updateBillCode_req.retail_high_credit_750 = this.popupBillCodeForm2.value.popup_retail_high_credit_750;


    updateBillCode_req.bill_code_kl = this.popupBillCodeForm2.value.popup_primary_code_kl;
    updateBillCode_req.primary_code_retail_kl = this.popupBillCodeForm2.value.popup_primary_code_retail_kl;
    updateBillCode_req.low_credit_kl = this.popupBillCodeForm2.value.popup_low_credit_kl;
    updateBillCode_req.high_credit_kl = this.popupBillCodeForm2.value.popup_high_credit_kl;
    updateBillCode_req.retail_low_credit_kl = this.popupBillCodeForm2.value.popup_retail_low_credit_kl;
    updateBillCode_req.retail_high_credit_kl = this.popupBillCodeForm2.value.popup_retail_high_credit_kl;

    updateBillCode_req.bill_code_vs_sg = this.popupBillCodeForm2.value.popup_primary_code_sg;
    updateBillCode_req.primary_code_retail_sg = this.popupBillCodeForm2.value.popup_primary_code_retail_sg;
    updateBillCode_req.low_credit_sg = this.popupBillCodeForm2.value.popup_low_credit_sg;
    updateBillCode_req.high_credit_sg = this.popupBillCodeForm2.value.popup_high_credit_sg;
    updateBillCode_req.retail_low_credit_sg = this.popupBillCodeForm2.value.popup_retail_low_credit_sg;
    updateBillCode_req.retail_high_credit_sg = this.popupBillCodeForm2.value.popup_retail_high_credit_sg;

    updateBillCode_req.auto_credit = this.popupBillCodeForm2.value.popup_primary_code_auto_credit;

    updateBillCode_req.server_name_740 = this.popupBillCodeForm2.value.popup_server_name_740;
    updateBillCode_req.pbx_threshold_limit_740 = this.popupBillCodeForm2.value.popup_pbx_threshold_limit_740;
    updateBillCode_req.retail_threshold_limit_740 = this.popupBillCodeForm2.value.popup_retail_threshold_limit_740;


    updateBillCode_req.server_name_750 = this.popupBillCodeForm2.value.popup_server_name_750;
    updateBillCode_req.pbx_threshold_limit_750 = this.popupBillCodeForm2.value.popup_pbx_threshold_limit_750;
    updateBillCode_req.retail_threshold_limit_750 = this.popupBillCodeForm2.value.popup_retail_threshold_limit_750;


    updateBillCode_req.server_name_kl = this.popupBillCodeForm2.value.popup_server_name_kl;
    updateBillCode_req.pbx_threshold_limit_kl = this.popupBillCodeForm2.value.popup_pbx_threshold_limit_kl;
    updateBillCode_req.retail_threshold_limit_kl = this.popupBillCodeForm2.value.popup_retail_threshold_limit_kl;

    updateBillCode_req.manual_credit = this.popupBillCodeForm2.value.popup_manual_credit;

    api_req.element_data = updateBillCode_req;

    //     var addr = this.popupBillCodeForm3.value.popupBillCode1;
    // for (let i = 0; i < addr.length; i++){
    //   console.log(addr[i].bill_code_740)

    //   addr[i].billCodeName = $('#bill_code_name_' + i).val();
    //   addr[i].bill_code_740 = $('#bill_code_740_' + i).val();
    //   addr[i].bill_code_kl = $('#bill_code_kl_' + i).val();
    //   addr[i].bill_code_750 = $('#bill_code_750_' + i).val();
    //   addr[i].bill_code_750_8 = $('#bill_code_750_8_' + i).val();
    //   addr[i].conn_state = $('#conn_state' + i).val();
    //   addr[i].customer_bill_code_id = $('#customer_bill_code_id' + i).val();
    //   addr[i].customer_id = $('#customer_id' + i).val();

    // }

    // updateBillCode_req.value =addr;
    // console.log(api_req);

    //     api_req.element_data = updateBillCode_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      console.log("update response", response);
      var updateBillCode = response;
      console.log('uadate', updateBillCode);


      if (response != '') {
        Swal.fire({
          icon: 'success',
          title: 'Bill Code has been updated',
          showConfirmButton: false,
          timer: 1200,
        });
        $("#billCodeFormId_CM").modal("hide");

        this.customerslist({});
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Bill Code has not been updated',
          showConfirmButton: false,
          timer: 1200,
        });
        $("#billCodeFormId_CM").modal("hide");
      }

    });


  }
  cmsDepartmentList1() {

    let api_req: any = new Object();
    let cms_edit: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/getCmsDepartment";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    cms_edit.action = "getCmsDepartment";
    cms_edit.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = cms_edit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.cmslistadd = response.cmsDep;
        console.log("this.cmslistadd", this.cmslistadd);


      } else {
        iziToast.warning({
          message: "No API Response",
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
  // getCustomerCode() {


  //   $.ajax({
  //     url: "https://laravelapi.erp1.cal4care.com/api/customer/getCustomerCode",
  //     type: 'GET',
  //     success: function(response:any) {
  //        this.companyCodeAddCustomer=response;
  //       $('#companyCode1').val(response);     
  //       this.companyCodeAddCustomer=$('#companyCode1').val(response);

  //     }
  // });

  // }
  getCustomerCode() {

    let api_req: any = new Object();
    let cms_edit: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/getCustomerCode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    cms_edit.action = "getCustomerCode";
    cms_edit.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = cms_edit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.cuscode) {

        this.companyCodeAddCustomer = response.cuscode;
        $('#companyCode1').val(response.cuscode);
        this.companyCodeAddCustomer = $('#companyCode1').val(response.cuscode);

      } else {
        iziToast.warning({
          message: "No API Response",
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
  AssignAccountManager_edit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    this.AssignAccountManager_CustomerID = id;
    let api_req: any = new Object();
    let accManager_edit: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/account_manager_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    accManager_edit.action = "account_manager_edit";
    accManager_edit.user_id = localStorage.getItem('erp_c4c_user_id');
    accManager_edit.customerId = id;
    api_req.element_data = accManager_edit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.AssignAccountManager_List = response.user_list;
        this.AssignAccountManager_SelectedUserID = response.account_manager_id;
        this.AssignAccountManagerForm.patchValue({
          'radio_AssignAccountManager': response.account_manager_id,
        }
        )
      } else {
        iziToast.warning({
          message: "No API Response",
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
  AssignAccountManagerUpdate() {
    Swal.fire('Updating');
    Swal.showLoading();
    let api_req: any = new Object();
    let accManager_update: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/account_manager_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    accManager_update.action = "account_manager_update";
    accManager_update.user_id = localStorage.getItem('erp_c4c_user_id');
    accManager_update.customerId = this.AssignAccountManager_CustomerID;
    accManager_update.account_manager_id = this.radiobuttonValue_AccountManager;
    api_req.element_data = accManager_update;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $("#AssignAccountManager_CM").modal("hide");
        Swal.close();
        iziToast.success({
          message: "Account Manager Updated Successfully",
          position: 'topRight'
        });


      } else {
        iziToast.warning({
          message: "Failed API Response",
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
  landscapeEmailEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.landscapeEmailForm.reset();
    this.landscapeEmail_Customer_ID = id;
    let api_req: any = new Object();
    let api_mail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_email_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mail_req.action = "customer_email_template";
    api_mail_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_mail_req.customerId = this.landscapeEmail_Customer_ID;
    api_req.element_data = api_mail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.From_List = response.email_from_det;
        this.Template_List = response.crm_template_det;
        console.log("Landscape  Email Template_List", this.Template_List);

        this.landscapeEmailForm.patchValue({
          'landscapeEmail_From': response.email_from_det,
          'landscapeEmail_To': response.email_id,
          'landscapeEmail_Template': response.crm_template_det,
        });

        iziToast.success({
          message: "Email Details Displayed Successfully",
          position: 'topRight'
        });


      } else {
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
  // somethingChanged(event: any){
  //   console.log("event value",event.target.value)
  // }
  LandscapeEmailContentDropdown(event: any) {
    this.spinner.show();
    this.CRMTemplateID = event.target.value;
    console.log("template ID check", this.CRMTemplateID);
    let api_req: any = new Object();
    let api_mailContentDropdown_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_customer_authendication_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mailContentDropdown_req.action = "get_customer_authendication_details";
    api_mailContentDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_mailContentDropdown_req.customerId = this.landscapeEmail_Customer_ID;
    api_mailContentDropdown_req.template_id = this.CRMTemplateID;
    api_req.element_data = api_mailContentDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.landscapeEmailForm.patchValue({

          'landscapeEmail_Subject': response.crm_subject_name,
          'landscapeEmail_Message': response.crm_template_content,
        });


      } else {
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
  sendLandscapeMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.emailFrom = $('#emailFromLandscape').val();
    this.emailTo = $('#emailToLandscape').val();
    this.subjectValue = $('#subjLandscape').val();
    this.emailTemplate = $('#templateLandscape').val();
    this.msg_id = tinymce.get('tinyLandscapeEmailID9').getContent();

    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_landscape_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "customer_landscape_mail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_email_req.customer_id = this.EmailCustomerContractID;
    api_email_req.emailFrom = this.emailFrom;
    if (this.emailFrom === null || this.emailFrom === '' || this.emailFrom === 'undefined' || this.emailFrom === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.emailTo = this.emailTo;
    if (this.emailTo === null || this.emailTo === '' || this.emailTo === 'undefined' || this.emailTo === undefined) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.emailSubject = this.subjectValue;
    api_email_req.emailTemplate = this.emailTemplate;
    if (this.emailTemplate === null || this.emailTemplate === '' || this.emailTemplate === 'undefined' || this.emailTemplate === undefined) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }

    api_email_req.emailContent = this.msg_id;
    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        $('#emailFromLandscape').val('');
        $('#emailToLandscape').val('');
        $('#subjLandscape').val('');
        $('#templateLandscape').val('');
        tinymce.activeEditor.setContent("");
        $("#landscapeEmailFormId_CM").modal("hide");
        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });
        this.customerslist({});


      } else {
        $('#emailFromLandscape').val('');
        $('#emailToLandscape').val('');
        $('#subjLandscape').val('');
        $('#templateLandscape').val('');
        tinymce.activeEditor.setContent("");
        $("#landscapeEmailFormId_CM").modal("hide");
        Swal.close();
        iziToast.success({
          message: "Email Notification not Sent !!!!",
          position: 'topRight'
        });
        this.customerslist({});
      }
      this.customerslist({});
    }),
      (error: any) => {
        Swal.close();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  clear() {

    this.addCustomer.vs_credit = '';
    this.addCustomer.def_payment_via = '';
  }
  GoogleAuthenticationId(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.GoogleAuthenticationForm.reset();
    $('#GoogleAuthentication_CM').modal("show");

    this.googleAuthent_CustomerId = id;

    $(document).ready(function () {
      $("#showhide").hide();
    });
  }
  GoogleAuthenticationValidation() {
    this.spinner.show();
    // this.GoogleAuthenticationForm.reset();
    let api_req: any = new Object();
    let api_googleAuthVali: any = new Object();
    api_req.moduleType = "common";
    api_req.api_url = "common/google_auth_check";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_googleAuthVali.action = "google_auth_check";
    api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');
    api_googleAuthVali.customerId = this.googleAuthent_CustomerId;
    api_googleAuthVali.auth_code = this.GoogleAuthenticationForm.value.google_AuthenticationCode;
    api_req.element_data = api_googleAuthVali;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $(document).ready(function () {
          $("#showhide").show();
        });
        this.googleAuthentication_status = response.status;
        this.googleAuthentication_customerName = response.customer_details.customerName;
        this.googleAuthentication_customerCode = response.customer_details.customerCode
        this.googleAuthentication_userDetails = response.customer_details.user_details;
        this.googleAuthentication_password = response.customer_details.user_password;

        this.GoogleAuthenticationForm.patchValue({
          'GA_customerName': response.customer_details.customerName,
          'GA_userDetails': response.customer_details.user_details,
          'GA_password': response.customer_details.user_password,
        })

        iziToast.success({
          message: "Google Authentication Success",
          position: 'topRight'

        });

      } else {

        $('#GoogleAuthentication_CM').modal("hide");
        iziToast.warning({
          message: "Invalid Google Authentication. Please try again",
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
  clearAction(i: any) {
    $("#ActionId" + i).modal("hide");
  }
  gotoCustomerMasterList() {
    this.customerslist({});
  }
  initTiny() {

    var richTextArea_id = 'richTextAreacreated';
    tinymce.init({
      selector: '#richTextAreacreated',

      height: 500,

      plugins: 'advlist autolink textcolor formatpainter lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste  wordcount autolink lists media table',
      toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | autoresize',
      paste_data_images: true,
      images_upload_url: 'upload.php',
      automatic_uploads: false,
      default_link_target: "_blank",
      extended_valid_elements: "a[href|target=_blank]",
      link_assume_external_targets: true,
      images_upload_handler: function (blobInfo: any, success: any, failure: any) {
        var xhr: any, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'upload.php');

        xhr.onload = function () {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.file_path != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.file_path);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
    });
    if (tinymce.editors.length > 0) {
      //  tinymce.execCommand('mceFocus', true, richTextArea_id );       
      tinymce.execCommand('mceRemoveEditor', true, richTextArea_id);
      tinymce.execCommand('mceAddEditor', true, richTextArea_id);
    }
  }
}
