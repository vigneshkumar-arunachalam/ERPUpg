import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { COMMA, ENTER, } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;

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
  //view
  viewCustomerForm: FormGroup;
  isReadOnly: boolean = true;
  nx32TrueFalsePermission: any;
  nx32permissionStatus: any;
  //add & list
  companyCodeAddCustomer = 'D6387';
  addCustomer: any;
  allData: any;
  displayDynamicData: any;
  billList: any;
  customer_list: any;
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
  countryList: any;
  currencyList: any;
  billerName: any;
  searchResult: any;
  billerNameList: any;
  errMsg = true;
  emailErrMsg = true;
  checked: boolean = true;
  isDisabled: boolean;
 
  //edit
  editCustomerForm: FormGroup;
  get_cust_type: any = [];
  geting_biller: any = [];
  editId: any;
  radio: any;
  b_id: any = [];
  //special edit
  specialEditCustomerForm: FormGroup;
  specialEditId: any;
  //mconnect
  mconnectCustomerForm: FormGroup;
  mconnectParameter: any;
  image_mconnectLogo: any;
  mconnect_Address_add: any;
  checkbox_mconnectAddressShow:boolean;
  checkboxNumber_mconnectAddressShow:any;  
  partnerTypeMconn:any;
  //mrvoip
  mrvoipParameter: any;
  mrvoipCustomerForm: FormGroup;
  image_mrvoipLogo: any;
  mrvoip_Address_add: any;
  //call4tel
  Call4telParameter: any;
  Call4telCustomerForm: FormGroup;
  call4tel_Address_add: any;
  image_call4telLogo: any;
  //file attachment
  file: File;
  getResult: any;
  credit_attachment_id: any;
  fileAttachCustomerID:any;
  myFiles:string [] = [];
  myForm: FormGroup;
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
  //NX32 Share customer permission
  customerNX32SharePermissionForm: FormGroup;
  NX32SharePermissionParameter: any;
  checkbox_NX32Permission: boolean = false;
  checkbox_status_nx32Permission: any;
  //bill Code edit
  billCodeEditForm1: FormGroup;
  billCodeEditForm2: FormGroup;
  billCodeResponse: any = [];
  public billCodeFormArray: FormArray;
  checkbox_autoCredit:any;
  edit_a: any;
  edit_b: any;
  //quick email 
  landscapeEmailForm:FormGroup;
  landscapeEmail_Customer_ID:any;
  emailFrom:any;
  emailTo:any;
  subjectValue:any;
  emailTemplate:any;
  msg_id:any;
  From_List:any;
  Template_List:any;
  CRMTemplateID:any;

  constructor(private serverService: ServerService, private fb: FormBuilder) {
    this.billCodeEditForm1 = this.fb.group({
      billCodeFormArray: this.fb.array([this.createBillCode()])
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
    console.log(event.value)
    if (event.value.indexOf('@') > 0 && event.value.indexOf('.com') > 0 && event.value != '' || event.value == '') {
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

    console.log(event.value)
    if (event.value.indexOf('@') > 0 && event.value.indexOf('.com') > 0 && event.value != '' || event.value == '') {
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

    this.customerslist();
    this.getDynamicList();
    this.initTiny();
    this.radio = [{ "name": "New", "values": "N" }, { "name": "Permanent", "values": "P" }];
    this.allData = '[{ "bill_details": [ { "billerId": 3, "billerName": "Cal4Care Pte Ltd" }, { "billerId": 5, "billerName": "Marshal System Consultancy" }, { "billerId": 6, "billerName": "Cal4Care" }, { "billerId": 8, "billerName": "Dcare Technologies Pte Ltd" }, { "billerId": 9, "billerName": "DCARE Technologies India Pvt Ltd." }, { "billerId": 10, "billerName": "Cal4care Sdn.Bhd." }, { "billerId": 11, "billerName": "CalnCall" }, { "billerId": 12, "billerName": "IT Care - IT Solutions" }, { "billerId": 13, "billerName": "SeaTech Solutions International (S) Pte Ltd" }, { "billerId": 14, "billerName": "Cal4Care Japan Co., Ltd" }, { "billerId": 16, "billerName": "Callacloud" }, { "billerId": 17, "billerName": "HelpDesk.Guru" }, { "billerId": 18, "billerName": "Cal4care (Thailand) Co., Ltd." }, { "billerId": 19, "billerName": "1Msb IT Care Sdn. Bhd." }, { "billerId": 20, "billerName": "Mr VOIP" }, { "billerId": 21, "billerName": "Mconnects" }, { "billerId": 22, "billerName": "CloudNippon" }, { "billerId": 23, "billerName": "Callnclear" }, { "billerId": 24, "billerName": "Call4tel" }, { "billerId": 25, "billerName": "Cal4Care USA LLC" }, { "billerId": 26, "billerName": "Virdi" }, { "billerId": 27, "billerName": "Cal4care Telecommunication Services (I) PVT LTD" } ], "country_details": [ "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Zaire", "Zambia", "Zimbabwe" ], "terms_det": [ "100% Advance", "100% PT", "14 Days", "180 Days", "21 Days", "270 Days", "30 Days", "45 Days", "7 Days", "90 Days", "COD" ], "currency_det": [ { "currencyId": 11, "currency_name": "AUD" }, { "currencyId": 10, "currency_name": "BAHT" }, { "currencyId": 5, "currency_name": "EUR" }, { "currencyId": 4, "currency_name": "INR" }, { "currencyId": 9, "currency_name": "JPY" }, { "currencyId": 3, "currency_name": "MYR" }, { "currencyId": 8, "currency_name": "MYR-Marshal" }, { "currencyId": 1, "currency_name": "SGD" }, { "currencyId": 7, "currency_name": "SGD-Dcare" }, { "currencyId": 2, "currency_name": "USD" }, { "currencyId": 6, "currency_name": "USD-Paypal" } ], "payment_det": [ { "paymentvia_id": 1, "paymentvia_name": "SGD" }, { "paymentvia_id": 2, "paymentvia_name": "USD" }, { "paymentvia_id": 3, "paymentvia_name": "MYR" }, { "paymentvia_id": 4, "paymentvia_name": "INR" }, { "paymentvia_id": 5, "paymentvia_name": "EUR" }, { "paymentvia_id": 6, "paymentvia_name": "MYR-Marshal" }, { "paymentvia_id": 7, "paymentvia_name": "PayPal" }, { "paymentvia_id": 8, "paymentvia_name": "PayPal" }, { "paymentvia_id": 10, "paymentvia_name": "USD.I" }, { "paymentvia_id": 11, "paymentvia_name": "1MSB-MY" }, { "paymentvia_id": 12, "paymentvia_name": "BAHT" }, { "paymentvia_id": 13, "paymentvia_name": "SGD-DC" }, { "paymentvia_id": 14, "paymentvia_name": "USD-TH" }, { "paymentvia_id": 15, "paymentvia_name": "JPY" }, { "paymentvia_id": 16, "paymentvia_name": "TRANSFERWISE(USD)" }, { "paymentvia_id": 22, "paymentvia_name": "TRANSFERWISE(EUR)" }, { "paymentvia_id": 23, "paymentvia_name": "USD-u" } ] }]';
    this.displayDynamicData = JSON.parse(this.allData);
    console.log("test vignesh dynamic data", this.displayDynamicData)
    this.billList = this.displayDynamicData[0].bill_details;
    this.countryList = this.displayDynamicData[0].country_details;
    this.currencyList = this.displayDynamicData[0].currency_det;
    this.paymentList = this.displayDynamicData[0].payment_det;
    this.departmentData = '[{ "status": true, "result": { "status": true, "data": [ { "department_name": "Sales", "dept_id": "83", "alise_email": "isales@cal4care.com" }, { "department_name": "Activation", "dept_id": "89", "alise_email": "activation@cal4care.com" }, { "department_name": "WebSupport", "dept_id": "90", "alise_email": "Websupport@cal4care.com" }, { "department_name": "CloudNippon", "dept_id": "100", "alise_email": "cc@cloudnippon.com" }, { "department_name": "CallnClear", "dept_id": "97", "alise_email": "cc@callnclear.com" }, { "department_name": "CallaCloud", "dept_id": "99", "alise_email": "CC@callacloud.com" }, { "department_name": "Calncall", "dept_id": "98", "alise_email": "cc@calncall.com" }, { "department_name": "Connectviet", "dept_id": "101", "alise_email": "cc@connectviet.com" }, { "department_name": "Support IN", "dept_id": "102", "alise_email": "Support@dcare.net" }, { "department_name": "Support SG", "dept_id": "103", "alise_email": "Support@cal4care.com" }, { "department_name": "Support SG", "dept_id": "103", "alise_email": "support@cal4care.com.sg" }, { "department_name": "Calncall", "dept_id": "98", "alise_email": "support@calncall.com" }, { "department_name": "Support MY", "dept_id": "104", "alise_email": "support@cal4care.com.my" }, { "department_name": "Support MY", "dept_id": "104", "alise_email": "support@callacloud.com" }, { "department_name": "Support JP", "dept_id": "105", "alise_email": "support@cal4care.co.jp" }, { "department_name": "Support JP", "dept_id": "105", "alise_email": "support@cloudnippon.com" }, { "department_name": "Support TH", "dept_id": "106", "alise_email": "support@cal4care.co.th" }, { "department_name": "Support TH", "dept_id": "106", "alise_email": "support@callnclear.com" }, { "department_name": "Support Call4Tel", "dept_id": "107", "alise_email": "Support@call4tel.com" }, { "department_name": "ACN", "dept_id": "108", "alise_email": "v.support@acncomm.com" }, { "department_name": "Global Sales", "dept_id": "109", "alise_email": "globalsales@mconnectapps.com" }, { "department_name": "WebDev", "dept_id": "110", "alise_email": "webdav@cal4care.com" } ] } }]';
    this.departmentDataOut = JSON.parse(this.departmentData);
    this.cmsDepartmentList = this.departmentDataOut[0].result.data;
    this.customerClassificationValue = ['Calncall', 'Callacloud', 'Voip', 'ITCare', 'Support', 'Cloud Nippon', 'Mrvoip', 'Call4Tel'];
    this.permissionValue = ["Inv", "Credit Note", "License", "Phone", "Project", "Leads", "RMA Issues", "Call History", "IDD Price list", "User Mgt", "3CX Buy", "License Renewal Reminder", "Deal Registeration", "GCC Firewall", "Reseller Product Price", "Call4tel License", "mConnect Buy", "Phone Edit", "DNC", "Mrviop", "Call4tel Address Show", "Mconnect Address Show", "Generate Invoice", "VS Credit Report", "View Shared DO", "CMS Balance Show", "Min Balance Mail Alert", "NX32 Access", "NX32 Logo Update (OEM)", "CMS Ticket"];
    this.dcIPAllowCountries = ["Japan", "Singapore", "Thailand", "Malaysia"];
    this.termList = ["COD", "7 Days", "14 Days", "21 Days", "30 Days", "45 Days", "90 Days", "180 Days", "270 Days", "100% PT", "100% Advance"];
    this.editCustomerRaw = ['{ "bill_details": [ { "billerId": 3, "billerName": "Cal4Care Pte Ltd" }, { "billerId": 5, "billerName": "Marshal System Consultancy" }, { "billerId": 6, "billerName": "Cal4Care" }, { "billerId": 8, "billerName": "Dcare Technologies Pte Ltd" }, { "billerId": 9, "billerName": "DCARE Technologies India Pvt Ltd." }, { "billerId": 10, "billerName": "Cal4care Sdn.Bhd." }, { "billerId": 11, "billerName": "CalnCall" }, { "billerId": 12, "billerName": "IT Care - IT Solutions" }, { "billerId": 13, "billerName": "SeaTech Solutions International (S) Pte Ltd" }, { "billerId": 14, "billerName": "Cal4Care Japan Co. Ltd" }, { "billerId": 16, "billerName": "Callacloud" }, { "billerId": 17, "billerName": "HelpDesk.Guru" }, { "billerId": 18, "billerName": "Cal4care (Thailand) Co., Ltd." }, { "billerId": 19, "billerName": "1Msb IT Care Sdn. Bhd." }, { "billerId": 20, "billerName": "Mr VOIP" }, { "billerId": 21, "billerName": "Mconnects" }, { "billerId": 22, "billerName": "CloudNippon" }, { "billerId": 23, "billerName": "Callnclear" }, { "billerId": 24, "billerName": "Call4tel" }, { "billerId": 25, "billerName": "Cal4Care USA LLC" }, { "billerId": 26, "billerName": "Virdi" }, { "billerId": 27, "billerName": "Cal4care Telecommunication Services (I) PVT LTD" } ], "country_details": [ "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea-Democratic People-s Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People-s Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Zaire", "Zambia", "Zimbabwe" ], "terms_det": [ "100% Advance", "100% PT", "14 Days", "180 Days", "21 Days", "270 Days", "30 Days", "45 Days", "7 Days", "90 Days", "COD" ], "currency_det": [ { "currencyId": 11, "currency_name": "AUD" }, { "currencyId": 10, "currency_name": "BAHT" }, { "currencyId": 5, "currency_name": "EUR" }, { "currencyId": 4, "currency_name": "INR" }, { "currencyId": 9, "currency_name": "JPY" }, { "currencyId": 3, "currency_name": "MYR" }, { "currencyId": 8, "currency_name": "MYR-Marshal" }, { "currencyId": 1, "currency_name": "SGD" }, { "currencyId": 7, "currency_name": "SGD-Dcare" }, { "currencyId": 2, "currency_name": "USD" }, { "currencyId": 6, "currency_name": "USD-Paypal" } ], "payment_det": [ { "paymentvia_id": 1, "paymentvia_name": "SGD" }, { "paymentvia_id": 2, "paymentvia_name": "USD" }, { "paymentvia_id": 3, "paymentvia_name": "MYR" }, { "paymentvia_id": 4, "paymentvia_name": "INR" }, { "paymentvia_id": 5, "paymentvia_name": "EUR" }, { "paymentvia_id": 6, "paymentvia_name": "MYR-Marshal" }, { "paymentvia_id": 7, "paymentvia_name": "PayPal" }, { "paymentvia_id": 8, "paymentvia_name": "PayPal" }, { "paymentvia_id": 10, "paymentvia_name": "USD.I" }, { "paymentvia_id": 11, "paymentvia_name": "1MSB-MY" }, { "paymentvia_id": 12, "paymentvia_name": "BAHT" }, { "paymentvia_id": 13, "paymentvia_name": "SGD-DC" }, { "paymentvia_id": 14, "paymentvia_name": "USD-TH" }, { "paymentvia_id": 15, "paymentvia_name": "JPY" }, { "paymentvia_id": 16, "paymentvia_name": "TRANSFERWISE(USD)" }, { "paymentvia_id": 22, "paymentvia_name": "TRANSFERWISE(EUR)" }, { "paymentvia_id": 23, "paymentvia_name": "USD-u" } ], "customer_details": [ { "customerId": 3, "customerCode": "D0003", "customerName": "Mercantile Pacific Pte Ltd", "short_name": "", "customerAddress1": "11 Jalan Mesin3", "customerAddress2": "#06-00, Standard Industrial Building23", "city": "", "state": "", "zipCode": "", "country": "Singapore", "ship_to": "Mercantile Pacific Pte Ltd", "ship_companyName": "", "ship_customerName": "", "ship_customerAddress1": "11 Jalan Mesin, ", "ship_customerAddress2": "#06-00, Standard Industrial Building, ", "ship_city": "", "ship_state": "", "ship_zipCode": "", "ship_country": "Singapore", "ship_email_id": "", "ship_customerPhone": "", "ship_mobilePhone": "", "bill_attn": "", "ship_attn": "", "customerPhone": "93257799", "mobilePhone": "91401528", "fax": "", "email": "kunaln@mercantilepacific.com,ish@mercantilepacific.com", "finance_email": "kunaln@mercantilepacific.com,Accounts14@mercantilepacific.com,ish@mercantilepacific.com", "tin_no": "", "cust_username": "", "cust_password": "I1RwbDdXdHNTRw==", "cus_permission": "101,102,103,157", "cus_type": "Calncall", "def_currency_id": 3, "def_payment_via": 0, "app_status": 0, "billerId": ",3,9,10,", "def_biller_id": 3, "cms_default_department": 103, "reseller_def_billerId": 0, "billGeneratedBy": 0, "companyName": "Kunal Narula", "companyAddress": "", "bankAccountName": "", "bankAccountNo": "", "credit_amt": 0, "min_call_credit_amt": 0, "vs_provisioning_command": "", "terms_condition": "", "reseller_show_state": 0, "subdomain_name": "", "logo_filename": "", "reseller_id": "", "reseller_state": 0, "emp_state": 0, "partner_email": "", "partner_phone_no": "", "reseller_dis_per": 0, "system_discount_3cx": 0, "reseller_gst_state": 1, "send_invoice": 1, "cust_status": "P", "access_userid": ",30,", "excess_reseller_payment": 0, "cms_username_dispaly": 0, "extension_hosting": "", "cms_vs_pbx_dispaly": 0, "account_manager_id": 0, "changes_state": 0, "customer_dis_show": 1, "tax_for": "inter", "address_change_state": 0, "stripe_customerId": "", "stripe_recurring_state": 0, "premium_id": "", "premium_status": 0, "banking_charge": 0, "cus_banking_charge": 4.5, "licence_buy_override": 0, "invoice_access_userid": ",109,", "validate_access_dt": "2021-01-11", "vs_credit": 0, "vs_prepaid_values": "", "vs_prepaid_status": 0, "vs_credit_alert": null, "onlineshop_customerId": 0, "nx32_customer_status": 0, "nx32_customer_logo": null, "nx32_contact_us_url": null, "cms_product_stock": null, "company_logo": "", "created_dt": "0000-00-00 00:00:00", "qrcode": null, "device_token": null, "web_device_token": null, "cms_app_notification": "ref_add,pay_add,ren_lic,inv_gen,pay_made,support_reply", "profile_image": null, "website_name": "", "reseller_dashboard": 1, "layout": null, "theme_color": null, "dc_ip_country": null, "alise_email": "", "cms_department_name": "" } ] }'];
    this.editCustomerValue = JSON.parse(this.editCustomerRaw);
    this.specialEditCustomerRaw = ['[ { "email": "vasant@voicetel.co.th,chanakan@voicetel.co.th,siraswaya@voicetel.co.th", "finance_email": "vasant@voicetel.co.th,chanakan@voicetel.co.th,siraswaya@voicetel.co.th", "system_discount_3cx": 1, "stripe_recurring_state": 0, "licence_buy_override": 0 }, { "previous_invoice_bill": 7692.75 }, { "pending_bill_days": 20 } ]'];
    this.specialEditCustomerValue = JSON.parse(this.specialEditCustomerRaw);
    this.radioDynamic = [{ "name": "Reseller", "values": "prem" }, { "name": "Distributor", "values": "affi" }];

    this.dropdownSettings_billerName = {
      singleSelection: false,
      idField: 'billerId',
      textField: 'billerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
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
      allowSearchFilter: true
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
    //add modal
    this.addCustomer = new FormGroup({
      'company_Code': new FormControl(null),
      'company_Name': new FormControl(null, [Validators.required]),
      'companyCode': new FormControl(null),
      'defaultBillerName': new FormControl(null),
      'BA_countryname': new FormControl(null),
      'ESA_countryname': new FormControl(null),
      'bank_countryname': new FormControl(null),
      'countryname': new FormControl(null),
      'currencyname': new FormControl(null),
      'cmsdepartment': new FormControl(null),
      'payment_way': new FormControl(null),
      'permissiondisplay': new FormControl(null),
      'dcipcountryform': new FormControl(null),
      'addCustomerStatus': new FormControl(null),
      'billername_vignesh': new FormControl(null),
      'customerClassification_vignesh': new FormControl(null, [Validators.required]),
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
      'ESA_cntPerson': new FormControl(null, [Validators.required]),
      'ESA_shipto': new FormControl(null),
      'ESA_address1': new FormControl(null),
      'ESA_address2': new FormControl(null),
      'ESA_city': new FormControl(null),
      'ESA_state': new FormControl(null),
      'ESA_zipcode': new FormControl(null),
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


    });

    //edit
    this.editCustomerForm = new FormGroup({


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
      'e_ESA_cntPerson': new FormControl(null),
      'e_ESA_shipto': new FormControl(null),
      'e_ESA_address1': new FormControl(null),
      'e_ESA_address2': new FormControl(null),
      'e_ESA_city': new FormControl(null),
      'e_ESA_state': new FormControl(null),
      'e_ESA_zipcode': new FormControl(null),
      'e_ESA_countryname': new FormControl(null),
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

    });

    this.customerNX32SharePermissionForm = new FormGroup({
      'nx32CustomerPermission_checklist': new FormControl(null),

    });
    this.myForm = new FormGroup({
      'file': new FormControl(null),

    });


    this.billCodeEditForm2 = new FormGroup({


      'VS740_PbxCode': new FormControl(null),
      'VS740_RetailCode': new FormControl(null),
      'VS740_PbxLow': new FormControl(null),
      'VS740_PbxHigh': new FormControl(null),
      'VS740_RetailLow': new FormControl(null),
      'VS740_RetailHigh': new FormControl(null),
      'VS750_PbxCode': new FormControl(null),
      'VS750_RetailCode': new FormControl(null),
      'VS750_PbxLow': new FormControl(null),
      'VS750_PbxHigh': new FormControl(null),
      'VS750_RetailLow': new FormControl(null),
      'VS750_RetailHigh': new FormControl(null),
      'VSKL_PbxCode': new FormControl(null),
      'VSKL_RetailCode': new FormControl(null),
      'VSKL_PbxLow': new FormControl(null),
      'VSKL_PbxHigh': new FormControl(null),
      'VSKL_RetailLow': new FormControl(null),
      'VSKL_RetailHigh': new FormControl(null),
      'auto_Credit_checklist': new FormControl(null), 

    });
    this.landscapeEmailForm=new FormGroup({
        'landscapeEmail_From':new FormControl(null),
        'landscapeEmail_To':new FormControl(null),
        'landscapeEmail_Subject':new FormControl(null),
        'landscapeEmail_Template':new FormControl(null),
        'landscapeEmail_Message':new FormControl(null),
    });


  }

  onItemSelect(billerName: any) {
    console.log(billerName);
  }

  onSelectAll(billerNameAll: any) {
    console.log(billerNameAll);
  }
  onItemSelectCC(cc: any) {
    console.log(cc);
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

  checkbox_EditShippingAddress: any;
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
  checkbox_EdShippingAddress: any;
  edit_eventCheck(event: any) {
    this.checkbox_EdShippingAddress = event.target.checked;
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


  checkbox_C4TAddressShow: any;
  eventCheckC4TAddressShow(event: any) {
    this.checkbox_C4TAddressShow = event.target.checked;
    console.log(this.checkbox_C4TAddressShow)
  }

  checkbox_MrvoipAddressShow: any;
  eventCheckMrvoipAddressShow(event: any) {
    this.checkbox_MrvoipAddressShow = event.target.checked;
    console.log(this.checkbox_MrvoipAddressShow)
  }
 
  eventCheckmconnectAddressShow(event: any) {
    this.checkbox_mconnectAddressShow = event.target.checked;
    console.log(this.checkbox_mconnectAddressShow)
    this.checkboxNumber_mconnectAddressShow=Number(this.checkbox_mconnectAddressShow);
    console.log(" checkbox 1 or 0---:",this.checkboxNumber_mconnectAddressShow)
  }
  checkbox_RSsearch: any;
  eventCheckRSsearch(event: any) {
    this.checkbox_RSsearch = event.target.checked;
    console.log(this.checkbox_RSsearch)
  }
  checkbox_InvoiceShared: any;
  eventCheckInvoiceShared(event: any) {
    this.checkbox_InvoiceShared = event.target.checked;
    console.log(this.checkbox_InvoiceShared)
  }
 
  autoCreditPermission(event: any) {
    this.checkbox_autoCredit = event.target.checked;
    console.log( this.checkbox_autoCredit)
    if(this.checkbox_autoCredit) {
      this.billCodeEditForm2.get('VS740_RetailHigh')?.disable();
    }
  }

  


  eventCheckNX32Permission(event: any) {
    this.checkbox_NX32Permission = event.target.checked;
    console.log(this.checkbox_NX32Permission)
  }
  selectEventCustomer(item: any) {
    console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }

  handleChange(evt: any) {
    var xyz = evt.target.id;
    console.log(xyz, "target");
  }
  partnerTypehandleChange(evt: any) {
    this.partnerTypeMconn = evt.target.id;
    var abc=evt.target.value;
    console.log( "partner type mconnect radio", this.partnerTypeMconn);
    console.log( "partner type mconnect radio", abc);
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
  onFileChange(event:any) {
   
    for (var i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
}

  customerslist() {
    console.log("Customer List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_det"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "get_det";
    get_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("get response", response);
      console.log("Cust status response", response[0].cust_status);
      this.nx32TrueFalsePermission = response[0].nx32_state;
      if (response != '') {
        this.customer_list = response;
        console.log(this.customer_list)

      }
    })
  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/cal/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_status response", response);
      this.searchResult = response.customer_names;
      if (response.status = true) {
      }
    });
  }
  getDynamicList() {

    let api_req: any = new Object();
    let api_reqs_addCustomer: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/add_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqs_addCustomer.action = "add_customer";
    api_reqs_addCustomer.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_reqs_addCustomer;
    console.log("json data format", api_reqs_addCustomer)

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.billerNameList = response.bill_details;
        this.dropdownList_billerName = response.bill_details;
        console.log(this.dropdownList_billerName)

      }

    });

  }
  viewCustomer(id: any) {


    let api_req: any = new Object();
    let view_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/view_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    view_customer_req.action = "view_customer_details";
    view_customer_req.customerId = id;
    view_customer_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = view_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("view customer response", response);

      if (response != '') {
        console.log(response);

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


      }
    });

  }
  addCustomerown() {

    // finance email field condition
    console.log(this.financeemailList);
    let result_FinanceEmail_Field = this.financeemailList.map(o => o.financeemailParameterName).join(',');
    console.log(result_FinanceEmail_Field);

    //  email field condition
    let result_Email_Field = this.emailList.map(o => o.emailParameterName).join(',');
    console.log(result_Email_Field);


    let api_req: any = new Object();
    let add_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_customer_req.action = "customer_save";
    add_customer_req.user_id = localStorage.getItem('user_id');

    add_customer_req.customerName = this.addCustomer.value.company_Name;
    add_customer_req.cus_banking_charge = this.addCustomer.value.banking_charge;
    add_customer_req.customerAddress1 = this.addCustomer.value.billingAddress_address1;
    add_customer_req.customerAddress2 = this.addCustomer.value.billingAddress_address2;
    add_customer_req.city = this.addCustomer.value.billingAddress_city;
    add_customer_req.state = this.addCustomer.value.billingAddress_state;
    add_customer_req.zipCode = this.addCustomer.value.billingAddress_zipcode;
    add_customer_req.country = this.addCustomer.value.BA_countryname;
    add_customer_req.bill_attn = this.addCustomer.value.ESA_cntPerson;
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
    add_customer_req.tin_no = this.addCustomer.value.send_invoice;
    add_customer_req.website_name = this.addCustomer.value.ESA_websiteName;
    add_customer_req.email = result_Email_Field;
    add_customer_req.finance_email = result_FinanceEmail_Field;
    add_customer_req.cms_default_department = this.addCustomer.value.cmsdepartment;
    add_customer_req.credit_amt = this.addCustomer.value.ESA_customerLimit_add;
    add_customer_req.reseller_id = this.addCustomer.value.ESA_c3cxResellerId_add;
    add_customer_req.reseller_dis_per = this.addCustomer.value.discount_percentage;
    add_customer_req.banking_charge = this.addCustomer.value.banking_charge;
    add_customer_req.def_currency_id = this.addCustomer.value.currencyname;
    add_customer_req.stripe_customerId = this.addCustomer.value.stripe_customer_id;
    add_customer_req.stripe_recurring_state = this.addCustomer.value.stripe_recurr_payment;
    add_customer_req.system_discount_3cx = this.addCustomer.value.c3cx_system_discount;
    add_customer_req.reseller_gst_state = this.addCustomer.value.shopping_gst;
    add_customer_req.send_invoice = this.addCustomer.value.send_invoice;
    add_customer_req.bankAccountName = this.addCustomer.value.bank_acc_no;
    add_customer_req.bankAccountNo = this.addCustomer.value.bank_account_number;
    add_customer_req.cust_status = this.addCustomer.value.addCustomerStatus;
    add_customer_req.reseller_state = this.addCustomer.value.reseller_status;
    add_customer_req.vs_credit = this.addCustomer.value.voip_switch_credit;
    add_customer_req.def_payment_via = this.addCustomer.value.payment_way;
    api_req.element_data = add_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var add_result = response;
      console.log("add", add_result);
      if (response.status == true) {

        $('#addCustomerFormId').modal('hide');
        iziToast.success({
          message: "Customer Added successfully",
          position: 'topRight'
        });

        this.clear();

      }
      else {
        iziToast.warning({
          message: "Customer not updated. Please try again",
          position: 'topRight'
        });
      }
    });

  }

  editCustomer(id: any) {
    console.log("id", id)
    this.get_cust_type = [];
    this.editId = id;
    let api_req: any = new Object();
    let edit_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_customer_req.action = "customer_edit";
    edit_customer_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = edit_customer_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh", response);
      console.log("vignesh1", response.result.customer_details[0].city);

      if (response != '') {
        var biller_id = response.result.customer_details[0].billerId;
        console.log("dropdown billwer id", biller_id)
        this.b_id = biller_id.split(',');
        console.log(this.b_id)
        var newArray = this.b_id.map(function (item: any) {
          return { 'id': item }
        })

        console.log("just", newArray)
        console.log(response);
        console.log("cus classification", response.result.customer_details[0].cus_type);
        console.log("cus permission", response.result.customer_details[0].cus_permission);
        console.log("customer status", response.result.customer_details[0].cust_status);
        this.get_cust_type = response.result.customer_details[0].cus_type;
        this.geting_biller = response.result.billerId_det;
        console.log(this.geting_biller)

        this.editCustomerForm.patchValue({

          'edit_company_Name': response.result.customer_details[0].companyName,
          'edit_defaultBillerName': response.result.customer_details[0].def_biller_id,
          'edit_billernamelist': response.result.billerId_det,
          'editCustomerClassification': response.result.customer_details[0].cus_type,
          'e_billingAddress_contactPerson': response.result.customer_details[0].cus_banking_charge,
          'e_billingAddress_address1': response.result.customer_details[0].customerAddress1,
          'e_billingAddress_address2': response.result.customer_details[0].customerAddress2,
          'e_billingAddress_city': response.result.customer_details[0].city,
          'e_billingAddress_state': response.result.customer_details[0].state,
          'e_billingAddress_zipcode': response.result.customer_details[0].zipCode,
          'Edit_BA_countryname': response.result.customer_details[0].country,
          'e_edit_ship_address': response.result.customer_details[0].country,
          'e_ESA_cntPerson': response.result.customer_details[0].bill_attn,
          'e_ESA_shipto': response.result.customer_details[0].ship_to,
          'e_ESA_address1': response.result.customer_details[0].ship_customerAddress1,
          'e_ESA_address2': response.result.customer_details[0].ship_customerAddress2,
          'e_ESA_city': response.result.customer_details[0].ship_city,
          'e_ESA_state': response.result.customer_details[0].ship_state,
          'e_ESA_zipcode': response.result.customer_details[0].ship_zipCode,
          'e_ESA_countryname': response.result.customer_details[0].country,
          'e_ESA_premium': response.result.customer_details[0].premium_id,
          'e_ESA_premiumStatus': response.result.customer_details[0].premium_status,
          'e_ESA_phone': response.result.customer_details[0].customerPhone,
          'e_ESA_MobilePhone': response.result.customer_details[0].mobilePhone,
          'e_ESA_FAX': response.result.customer_details[0].fax,
          'e_ESA_GSTNO': response.result.customer_details[0].tin_no,
          'e_ESA_websiteName': response.result.customer_details[0].website_name,
          'e_ESA_FinanceEmail': response.result.customer_details[0].finance_email,
          'e_ESA_Email': response.result.customer_details[0].email,
          'edit_permission': response.result.customer_details[0].cus_permission,
          'edit_cmsdepartment': response.result.customer_details[0].cms_department_name,
          'e_ESA_customerLimit': response.result.customer_details[0].credit_amt,
          'e_ESA_c3cxResellerId': response.result.customer_details[0].reseller_id,
          'edit_currencyname': response.result.customer_details[0].def_currency_id,
          'e_stripe_customer_id': response.result.customer_details[0].stripe_customerId,
          'e_stripe_recurr_payment': response.result.customer_details[0].stripe_recurring_state,
          'e_c3cx_system_discount': response.result.customer_details[0].system_discount_3cx,
          'e_discount_percentage': response.result.customer_details[0].reseller_dis_per,
          'e_custBankingCharge': response.result.customer_details[0].cus_banking_charge,
          'e_banking_charge': response.result.customer_details[0].banking_charge,
          'e_shopping_gst': response.result.customer_details[0].reseller_gst_state,
          'e_send_invoice': response.result.customer_details[0].send_invoice,
          'e_contact_person_CP': response.result.customer_details[0].companyName,
          'e_bank_acc_name': response.result.customer_details[0].bankAccountName,
          'e_bank_acc_no': response.result.customer_details[0].bankAccountNo,
          'e_editCustomerStatus': response.result.customer_details[0].cust_status,
          'e_reseller_status': response.result.customer_details[0].reseller_state,
          'e_voip_switch_credit': response.result.customer_details[0].vs_credit,
          'e_custAddressUpdateState': response.result.customer_details[0].address_change_state,
          'edit_payment_way': response.result.customer_details[0].def_payment_via,
          'e_vsProvisionAttachment': response.result.customer_details[0].vs_provisioning_command,
          'DCIP_edit': response.result.customer_details[0].dc_ip_country,
        });

        console.log(this.editCustomerForm.value);
        $('#editCustomerFormId').modal('show');
        this.customerslist();
      } else {

      }
    })


  }

  update(id: any) {

    let Update_billerNameCheckListDisplay = this.editCustomerForm.value.edit_billernamelist.map((data: any) => data.billerId).join(',');
    console.log("billerName-in update", Update_billerNameCheckListDisplay);
    let api_req: any = new Object();
    let update_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    update_customer_req.action = "customer_update";
    update_customer_req.user_id = localStorage.getItem('user_id');
    update_customer_req.customerName = this.editCustomerForm.value.edit_company_Name;
    update_customer_req.billerId = Update_billerNameCheckListDisplay;
    update_customer_req.company_name = this.editCustomerForm.value.edit_defaultBillerName;
    update_customer_req.cus_type = this.editCustomerForm.value.editCustomerClassification;
    update_customer_req.cus_banking_charge = this.editCustomerForm.value.e_billingAddress_contactPerson;
    update_customer_req.customerAddress1 = this.editCustomerForm.value.e_billingAddress_address1;
    update_customer_req.customerAddress2 = this.editCustomerForm.value.e_billingAddress_address2;
    update_customer_req.city = this.editCustomerForm.value.e_billingAddress_city;
    update_customer_req.state = this.editCustomerForm.value.e_billingAddress_state;
    update_customer_req.zipCode = this.editCustomerForm.value.e_billingAddress_zipcode;
    update_customer_req.country = this.editCustomerForm.value.Edit_BA_countryname;
    update_customer_req.bill_attn = this.editCustomerForm.value.e_ESA_cntPerson;
    update_customer_req.ship_to = this.editCustomerForm.value.e_ESA_shipto;
    update_customer_req.ship_customerAddress1 = this.editCustomerForm.value.e_ESA_address1;
    update_customer_req.ship_customerAddress2 = this.editCustomerForm.value.e_ESA_address2;
    update_customer_req.ship_city = this.editCustomerForm.value.e_ESA_city;
    update_customer_req.ship_state = this.editCustomerForm.value.e_ESA_state;
    update_customer_req.ship_zipCode = this.editCustomerForm.value.e_ESA_zipcode;
    update_customer_req.ship_country = this.editCustomerForm.value.e_ESA_countryname;

    update_customer_req.premium_id = this.editCustomerForm.value.e_ESA_premium;
    update_customer_req.premium_status = this.editCustomerForm.value.e_ESA_premiumStatus;
    update_customer_req.customerPhone = this.editCustomerForm.value.e_ESA_phone;
    update_customer_req.mobilePhone = this.editCustomerForm.value.e_ESA_MobilePhone;
    update_customer_req.fax = this.editCustomerForm.value.e_ESA_FAX;
    update_customer_req.tin_no = this.editCustomerForm.value.e_ESA_GSTNO;
    update_customer_req.website_name = this.editCustomerForm.value.e_ESA_websiteName;
    update_customer_req.email = this.editCustomerForm.value.ESA_Email;
    update_customer_req.finance_email = this.editCustomerForm.value.ESA_FinanceEmail;
    update_customer_req.cms_default_department = this.editCustomerForm.value.edit_cmsdepartment;

    update_customer_req.credit_amt = this.editCustomerForm.value.e_ESA_customerLimit;
    update_customer_req.reseller_id = this.editCustomerForm.value.e_ESA_c3cxResellerId;
    update_customer_req.currency_name = this.editCustomerForm.value.edit_currencyname;
    update_customer_req.stripe_customerId = this.editCustomerForm.value.e_stripe_customer_id;
    update_customer_req.stripe_recurring_state = this.editCustomerForm.value.e_stripe_recurr_payment;
    update_customer_req.system_discount_3cx = this.editCustomerForm.value.e_c3cx_system_discount;
    update_customer_req.reseller_dis_per = this.editCustomerForm.value.e_discount_percentage;
    update_customer_req.cus_banking_charge = this.editCustomerForm.value.e_custBankingCharge;
    update_customer_req.banking_charge = this.editCustomerForm.value.e_banking_charge;
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
    api_req.element_data = update_customer_req;

    console.log(this.editCustomerForm.value);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var update_result = response;
      console.log("update", update_result);
      if (response != '') {

        iziToast.success({
          message: "Customer Updated successfully",
          position: 'topRight'
        });
        $('#editCustomerFormId').modal('hide');


      }
      else {

        iziToast.warning({
          message: "Customer not updated. Please try again",
          position: 'topRight'
        });
        $('#editCustomerFormId').modal('hide');
      }

    });




  }
  specialEditCustomer(id: any) {

    this.specialEditId = id;

    let api_req: any = new Object();
    let specialEdit_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/special_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    specialEdit_customer_req.action = "special_edit";
    specialEdit_customer_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = specialEdit_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("special edit response", response);

      if (response != '') {
        console.log(response);

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
        console.log(this.specialEditCustomerForm.value);



        if (response.customer_details[0].status == 1) {
          $('#status').prop('checked', true);
        } else {
          $('#status').prop('checked', false);
        }

        $('#specialEditCustomerFormId').modal('show');
        this.customerslist();
      } else {

        iziToast.warning({
          message: "Customer data could not retrive. Please try again",
          position: 'topRight'
        });

      }
    });
  }

  specialUpdate(id: any) {


    let api_req: any = new Object();
    let specialUpdate_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/special_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    specialUpdate_customer_req.action = "special_update";
    specialUpdate_customer_req.user_id = localStorage.getItem('user_id');
    specialUpdate_customer_req.email = this.specialEditCustomerForm.value.spedit_Email;
    specialUpdate_customer_req.finance_email = this.specialEditCustomerForm.value.spedit_FinanceEmail;
    specialUpdate_customer_req.terms_condition = this.specialEditCustomerForm.value.termconditionDD;
    specialUpdate_customer_req.credit_amt = this.specialEditCustomerForm.value.spedit_creditlimit;
    specialUpdate_customer_req.reseller_id = this.specialEditCustomerForm.value.spedit_C3CXResellerId;
    specialUpdate_customer_req.stripe_recurring_state = this.specialEditCustomerForm.value.spedit_stripe_recurr_payment;
    specialUpdate_customer_req.stripe_customerId = this.specialEditCustomerForm.value.spedit_stripe_customer_id;
    specialUpdate_customer_req.system_discount_3cx = this.specialEditCustomerForm.value.spedit_c3cx_system_discount;
    specialUpdate_customer_req.reseller_dis_per = this.specialEditCustomerForm.value.spedit_discount_percentage;


    api_req.element_data = specialUpdate_customer_req;
    console.log(this.specialEditCustomerForm.value);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      var update_result = response;
      console.log("special update", update_result);
      if (response != '') {

        iziToast.success({
          message: "Special Update of Customer Updated successfully",
          position: 'topRight'
        });


      }
      else {

        iziToast.warning({
          message: "Special Update of Customer not updated. Please try again",
          position: 'topRight'
        });

      }

    });



  }
  deleteCustomer(id: any) {
    alert("delete")
    let api_req: any = new Object();
    let delete_customer_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/customer_delete";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    delete_customer_req.action = "customer_delete";
    delete_customer_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = delete_customer_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("update", response);
      if (response != '') {

        iziToast.success({
          message: "Customer Deleted successfully",
          position: 'topRight'
        });

        this.customerslist();

      }
      else {

        iziToast.warning({
          message: "Customer not deleted. Please try again",
          position: 'topRight'
        });

      }

    });

  }
  fileAttachmentEdit(ID: any) {
    $("#fileAttachmentFormId").modal("show");
    // this.fileAttachContractID = fileAttachContractID;
    this.fileAttachCustomerID = ID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_file_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "get_file_attachment_details";
    fileattach_req.customerId = "" + ID + "";
    fileattach_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check  file attachment", response)
      this.getResult = response.result.attachment_details
      // this.firstResult = response.phone_provision_det;
      // this.secondResult=response.contract_attachment_arr;
      if (response.status==true) {
        
        this.myForm.patchValue({


          'file': response.result.attachment_details.org_file_name,
         


        });

      }


    });


  }
  fileAttachmentDelete(credit_attament_id: any) {
    this.credit_attachment_id = credit_attament_id;
    let api_req: any = new Object();
    let fileattachDelete_req: any = new Object();
    api_req.moduleType = "customer";
    // api_req.api_url = "customer/delete_file_attachment";
    api_req.api_url = "customer/customer_file_attachment_delete";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattachDelete_req.action = "customer_file_attachment_delete";
    fileattachDelete_req.credit_attach_id = "" + credit_attament_id + "";
    fileattachDelete_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = fileattachDelete_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
         
      if (response.status == true) {
        // this.myForm.reset();
          alert("deleted")
          $("#fileAttachmentFormId").modal("hide");
      }
      

    });

  }
  fileAttachmentUpdate() {
    this.myForm.reset();
//  var data = new FormData();

const data = new FormData();
 
for (var i = 0; i < this.myFiles.length; i++) { 
  data.append("cust_file[]", this.myFiles[i]);
}
data.append('customer_id',  this.fileAttachCustomerID ); 
data.append('action', "customer_file_attachment_save");


      var self = this;
      $.ajax({
          type: 'POST',
          url: 'https://erp1.cal4care.com/api/customer/customer_file_attachment_save',
          cache: false,
          contentType: false,
          processData: false,
          data : data,
          success: function(result:any){
            if(result.status==true){
              self.customerslist();
              console.log(result);
              $("#fileAttachmentFormId").modal("hide");
            }
          },
          error: function(err:any){
              console.log(err);
          }
        })

  }
  mconnect_address_getList(id: any) {
this.mconnectCustomerForm.reset();
    console.log("mconnect address getlist -UI Display Data after OnInit ")
    this.mconnectParameter = id;
    let api_req: any = new Object();
    let api_mconnectList:any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/mconnect_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mconnectList.action = "mconnect_address_details";
    api_mconnectList.customer_id=id;
    api_mconnectList.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_mconnectList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("get mconnect address response", response);
      if (response != '') {
        console.log(response);
        this.image_mconnectLogo = response.mconnect_company_logo;
        console.log(this.image_mconnectLogo)

        this.mconnectCustomerForm.patchValue({
          'a_mconnectPartnerEmail': response[0].partner_email,
          'a_mconnectPartnerPhoneNum': response[0].partner_phone_no,
          'a_mconnectPartnerType': response[0].partner_type,
          
          // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
        });
        iziToast.success({
          message: "mconnect",
          position: 'topRight'

        });

      }
      else {

        iziToast.warning({
          message: "mconnect not displayed. Please try again",
          position: 'topRight'
        });
      }
    });
  }
  mconnect_address_add(id: any) {
    console.log( "inside partner type mconnect radio", this.partnerTypeMconn);
    var partner_email_mcon= $("#partnerEmail").val();
    var partner_phone_mcon= $("#partnerPhone").val();
    // var address_show_mcon= $("#check_mconn").val();
 
    var data = new FormData();

    data.append('partner_email_mconnect', partner_email_mcon);
    data.append('partner_phone_no_mconnect', partner_phone_mcon);
    data.append('mconnect_address_show', this.checkboxNumber_mconnectAddressShow);
    data.append('customer_id', id); 
    data.append('mconnect_partner_type', this.partnerTypeMconn);
    data.append('mconnect_company_logo', $("#uploaded-mconnect")[0].files[0]);
    data.append('action', "mconnect_address_save");

      var self = this;
      $.ajax({
          type: 'POST',
          url: 'https://erp1.cal4care.com/api/customer/mconnect_address_save',
          cache: false,
          contentType: false,
          processData: false,
          data : data,
          success: function(result:any){
            if(result.status==true){
              self.customerslist();
              console.log(result);

            }
          },
          error: function(err:any){
              console.log(err);
          }
        })

    // let api_req: any = new Object();
    // let api_mconnectAdd: any = new Object();
    // api_req.moduleType = "customer";
    // api_req.api_url = "customer/" + id + "/mconnect_address_save";
    // api_req.api_type = "web";
    // api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    // api_mconnectAdd.action = "mconnect_address_save";
    // api_mconnectAdd.user_id = localStorage.getItem('user_id');
    // api_mconnectAdd.partner_email_mconnect = this.mconnectCustomerForm.value.a_mconnectPartnerEmail;
    // api_mconnectAdd.partner_phone_no_mconnect = this.mconnectCustomerForm.value.a_mconnectPartnerPhoneNum;
    // api_mconnectAdd.mconnect_address_show = this.mconnectCustomerForm.value.a_mconnectAddressShow;
    // api_mconnectAdd.mconnect_partner_type = this.mconnectCustomerForm.value.a_mconnectPartnerType;
    // api_mconnectAdd.customerId = id;
    // api_mconnectAdd.cus_permission_popup = this.mconnectCustomerForm.value.a_mconnectAddressShow;
    // api_mconnectAdd.mconnect_company_logo = this.mconnectCustomerForm.value.a_selectLogo_mconnect;
    // api_req.element_data = api_mconnectAdd;
    // console.log(api_req)
    // this.serverService.sendServer(api_req).subscribe((response: any) => {
    //   var result = response;
    //   console.log("get mconnect address response", result);
    //   if (result) {
    //     this.mconnect_Address_add = result;
    //     console.log(this.mconnect_Address_add)
    //     $('#addCustomerFormId').modal('hide');

    //   }

    // });
  }
  mrvoip_address_add(id: any) {
    var data = new FormData();
    $("#partnerEmail").val();
    data.append('partner_email_mrvoip', $("mv_partnerEmail").val());
    data.append('partner_phone_no_mrvoip', $("mv_partnerPhone").val());
    data.append('mrvoip_address_show', this.checkboxNumber_mconnectAddressShow);
    data.append('customer_id', id); 
    data.append('mrvoip_partner_type', this.partnerTypeMconn);
    data.append('mrvoip_company_logo', $("#uploaded-mconnect")[0].files[0]);
    data.append('action', "mrvoip_address_save");

    var self = this;
    $.ajax({
        type: 'POST',
        url: 'https://erp1.cal4care.com/api/customer_contract/mrvoip_address_save',
        cache: false,
        contentType: false,
        processData: false,
        data : data,
        success: function(result:any){
          if(result.status==true){
            self.customerslist();
            console.log(result);

          }
        },
        error: function(err:any){
            console.log(err);
        }
      })


    // let api_req: any = new Object();
    // let api_mrvoipAdd: any = new Object();
    // api_req.moduleType = "customer";
    // api_req.api_url = "customer/" + id + "/mrvoip_address_save";
    // api_req.api_type = "web";
    // api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    // api_mrvoipAdd.action = "mrvoip_address_save";
    // api_mrvoipAdd.user_id = localStorage.getItem('user_id');
    // api_mrvoipAdd.customerId = id;

    // api_mrvoipAdd.partner_email_mrvoip = this.mrvoipCustomerForm.value.a_MrvoipPartnerEmail;
    // api_mrvoipAdd.partner_phone_no_mrvoip = this.mrvoipCustomerForm.value.a_MrvoipPartnerPhoneNum;
    // api_mrvoipAdd.mrvoip_address_show = this.mrvoipCustomerForm.value.a_MrvoipAddressShow;
    // api_mrvoipAdd.mrvoip_partner_type = this.mrvoipCustomerForm.value.a_MrvoipPartnerType;

    // api_mrvoipAdd.cus_permission_popup = this.mrvoipCustomerForm.value.a_MrvoipAddressShow;
    // api_mrvoipAdd.mrvoip_company_logo = this.mrvoipCustomerForm.value.a_selectLogo_MrVoip;

    // api_req.element_data = api_mrvoipAdd;

    // this.serverService.sendServer(api_req).subscribe((response: any) => {
    //   var result = response;
    //   console.log("get mrvoip address response", result);
    //   if (result) {
    //     this.mrvoip_Address_add = result;
    //     console.log(this.mrvoip_Address_add)
    //     $('#addCustomerFormId').modal('hide');
    //     iziToast.success({
    //       message: "mrvoip address Added successfully",
    //       position: 'topRight'
    //     });
        
    //   }
    //   else {

    //     iziToast.warning({
    //       message: "mrvoip address not updated. Please try again",
    //       position: 'topRight'
    //     });

    //   }
    // });
  }
  mrvoip_address_getList(id: any) {
    this.mrvoipParameter = id;
    let api_req: any = new Object();
    let api_mrvoipList: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/mrvoip_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mrvoipList.action = "mrvoip_address_details";
    api_mrvoipList.customer_id=id;
    api_mrvoipList.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_mrvoipList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("get mrvoip address response", response);

      if (response.status==true) {
        this.image_mrvoipLogo = response[0].mrvoip_company_logo;
        this.mrvoipCustomerForm.patchValue({
          'a_MrvoipPartnerEmail': response[0].partner_email,
          'a_MrvoipPartnerPhoneNum': response[0].partner_phone_no,
          'a_MrvoipPartnerType': response[0].partner_type,
          // 'a_selectLogo_MrVoip': response[0].mrvoip_company_logo,
          // 'a_selectLogoImage_MrVoip': response[0].mrvoip_company_logo,

        });
        iziToast.success({
          message: "mrvoip_address ",
          position: 'topRight'
        });

      }
      else {

        iziToast.warning({
          message: "mrvoip_address not displayed. Please try again",
          position: 'topRight'
        });
      }
    });

  }
  call4tel_address_getList(id: any) {

    this.Call4telParameter = id;
    let api_req: any = new Object();
    let api_call4telList: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/call4tel_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_req.action = "call4tel_address_details";
    api_call4telList.user_id = localStorage.getItem('user_id');

    api_req.element_data = api_call4telList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("get  call4tel address response", response);
      if (response != '') {
        console.log(response);
        this.image_call4telLogo = response.call4tel_company_logo;
        console.log(this.image_call4telLogo)
        this.Call4telCustomerForm.patchValue({

          'a_C4TPartnerEmail': response[0].partner_email,
          'a_C4TPartnerPhoneNum': response[0].partner_phone_no,
          'a_C4TPartnerType': response[0].partner_type,
          'a_selectLogo_C4T': response[0].call4tel_company_logo,
        });
        iziToast.success({
          message: "call4tel address displayed successfully",
          position: 'topRight'
        });

      }
      else {

        iziToast.warning({
          message: "call4tel address not displayed. Please try again",
          position: 'topRight'
        });
      }
    });
  }
  call4tel_address_add(id: any) {
    let api_req: any = new Object();
    let api_call4telAdd: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/call4tel_address_save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_call4telAdd.action = "call4tel_address_save";
    api_call4telAdd.user_id = localStorage.getItem('user_id');

    api_call4telAdd.partner_email_call4tel = this.Call4telCustomerForm.value.a_C4TPartnerEmail;
    api_call4telAdd.partner_phone_no_call4tel = this.Call4telCustomerForm.value.a_C4TPartnerPhoneNum;
    api_call4telAdd.call4tel_address_show = this.Call4telCustomerForm.value.a_C4TAddressShow;
    api_call4telAdd.call4tel_partner_type = this.Call4telCustomerForm.value.a_C4TPartnerType;
    api_call4telAdd.customerId = id;
    api_call4telAdd.cus_permission_popup = this.Call4telCustomerForm.value.a_C4TAddressShow;
    api_call4telAdd.call4tel_company_logo = this.Call4telCustomerForm.value.a_selectLogo_C4T;

    api_req.element_data = api_call4telAdd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      var result = response;
      console.log("get call4tel address response", result);
      if (result) {
        this.call4tel_Address_add = result;
        console.log(this.call4tel_Address_add)

        iziToast.success({
          message: "call4tel address Added successfully",
          position: 'topRight'
        });

      }
      else {

        iziToast.warning({
          message: "call4tel address not updated. Please try again",
          position: 'topRight'
        });

      }
    });
  }
  invoiceShare_edit(id: any) {
    let api_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/invoice_share_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_req.action = "invoice_share_edit";
    api_req.user_id = localStorage.getItem('user_id');
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("invoice share response", response);
      if (response != '') {

        this.invoiceSharedEdit1 = [];
        this.invoiceSharedEdit1 = response.user_details;

        console.log(this.invoiceSharedEdit1)


        this.invoiceSharedCustomerForm.patchValue({

          'invShared_checklist': response.user_details,
        });
      }
    });


  }
  invoiceShare_update(id: any) {
    this.invoiceSharedParameter = id;

    let api_req: any = new Object();
    let invoiceShare_update_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/80/invoice_share_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    invoiceShare_update_req.action = "invoice_share_update";
    invoiceShare_update_req.user_id = localStorage.getItem('user_id');
    invoiceShare_update_req.firstName_salary = this.invoiceSharedCustomerForm.value.invShared_checklist;
    api_req.element_data = invoiceShare_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      console.log("invoice shared update", response);
      if (response != '') {

        iziToast.success({
          message: "Special Update of Customer Updated successfully",
          position: 'topRight'
        });
        //this.contactsList({});

      }
      else {

        iziToast.warning({
          message: "Special Update of Customer not updated. Please try again",
          position: 'topRight'
        });

      }
    });

  }
  shareCustomerPermission_edit(id: any) {
    
    let api_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/customer_share";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_req.action = "customer_share";
    api_req.user_id = localStorage.getItem('user_id');
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("customer share permission response", response);
      if (response != '') {

        this.SharedCustomerPermissionArray = [];
        this.SharedCustomerPermissionArray = response.access_user;

        console.log(this.SharedCustomerPermissionArray)


        this.ShareCustomerPermissionForm.patchValue({

          'shareCustomerPermission_checklist': response.access_user,
        });
      }
    });

  }
  shareCustomerPermission_update(id: any) {
    this.shareCustomerPermissionParameter = id;

    let api_req: any = new Object();
    let shareCustomerPermission_update_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/80/customer_share_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    shareCustomerPermission_update_req.action = "customer_share_update";
    shareCustomerPermission_update_req.user_id = localStorage.getItem('user_id');
    shareCustomerPermission_update_req.access_userid = this.ShareCustomerPermissionForm.value.shareCustomerPermission_checklist;
    api_req.element_data = shareCustomerPermission_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      console.log("shared customer permission update", response);
      if (response != '') {

      }

    });

  }
  customer_status(id: any, Status_variable: any) {

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
    api_req.api_url = "customer/" + id + "/customer_status_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_customerStatus_req.action = "customer_status_update";
    api_customerStatus_req.user_id = localStorage.getItem('user_id');
    api_customerStatus_req.cust_status = status;
    api_req.element_data = api_customerStatus_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_status response", response);
      if (response.status = true) {
        console.log("before change", this.isCustomerStatus)
        this.isCustomerStatus = !this.isCustomerStatus;
        console.log("after change", this.isCustomerStatus)
        this.customerslist();
      }

    });


  }
  employee_status(id: any) {

    let api_req: any = new Object();
    let api_empStatus_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/emp_status_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_empStatus_req.action = "emp_status_update";
    api_empStatus_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_empStatus_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status = true) {
        console.log("before change-employee status", this.isEmployeeStatus)
        this.isEmployeeStatus = !this.isEmployeeStatus;
        this.customerslist();
        console.log("after change-employee status", this.isEmployeeStatus)
      }
    });

  }
  reseller_statusMethod(id: any) {
    let api_req: any = new Object();
    let api_resellerStatus_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/" + id + "/reseller_status_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resellerStatus_req.action = "reseller_status_update";
    api_resellerStatus_req.user_id = localStorage.getItem('user_id');

    api_req.element_data = api_resellerStatus_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status = true) {
        console.log("before change-reseller status", this.isResllerStatus)
        this.isResllerStatus = !this.isResllerStatus;
        this.customerslist();
        console.log("after change-reseller status", this.isResllerStatus)
      }
    });


  }

  customer_NX32PermissionDisplay(id: any, nx32id: any) {

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
    api_nx32Permission_req.user_id = localStorage.getItem('user_id');

    api_req.element_data = api_nx32Permission_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("customer nx32 permission", response);
      this.checkbox_status_nx32Permission = response.status;
      console.log("customer nx32 permission response.status", response.status);
      if (response != '') {
        console.log("customer nx32 permission", response)
        // console.log("before change",this.checkbox_NX32Permission)
        // this.checkbox_NX32Permission = !this.checkbox_NX32Permission;
        // console.log("after change",this.checkbox_NX32Permission)

        this.customerNX32SharePermissionForm.patchValue({

          'nx32CustomerPermission_checklist': response.status,
        });
      }
    });


  }
  customer_NX32PermissionUpdate(id: any) {

    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_nx32_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_nx32_update";
    api_nx32PermissionUpdate_req.customerId = this.NX32SharePermissionParameter;
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('user_id');
    api_nx32PermissionUpdate_req.nx32_perm = this.checkbox_NX32Permission;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("customer nx32 permission", response);
      if (response != '') {
        console.log("customer nx32 permission", response)
        // console.log("customer nx32 permission", response)
        // console.log("before change",this.checkbox_NX32Permission)
        // this.checkbox_NX32Permission = !this.checkbox_NX32Permission;
        // console.log("after change",this.checkbox_NX32Permission)
      }
    });
    $('#customer_NX32PermissionFormId').modal('hide');
    this.customerslist();


  }
  billCodeAttachmentEdit(id: any) {
    this.billCodeEditForm2.reset();
    let api_req: any = new Object();
    let api_billCodeEdit_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_billcode_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_billCodeEdit_req.action = "get_billcode_details";
    api_billCodeEdit_req.customer_id = id;
    api_billCodeEdit_req.user_id = localStorage.getItem('user_id');

    api_req.element_data = api_billCodeEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("bill code edit", response);
      // console.log("bill code edit check other empty", response.primary_bill_code[0].customer_bill_code_id);

      this.billCodeResponse = response;
     
      if (response != '') {
        this.edit_a = response.customer_bill_code;
        this.edit_b=response.primary_bill_code;
        const formArray = new FormArray([]);
        for (let index = 0; index < response.customer_bill_code.length; index++) {

          formArray.push(this.fb.group({
            "billCode_Name": response.customer_bill_code[index].bill_code_name,
            " billCode_Server_VS1": response.customer_bill_code[index].bill_code_740,
            "billCode_Server_VSKL": response.customer_bill_code[index].bill_code_kl,
            "billCode_Server_VS2_32": response.customer_bill_code[index].bill_code_750,
            "billCode_Server_VS2_8": response.customer_bill_code[index].bill_code_750_8,
             "billCode_ID":response.customer_bill_code[index].customer_bill_code_id,

          })
          );


        }
        this.billCodeEditForm1.setControl('billCodeFormArray', formArray);
        if (response.primary_bill_code != '') {
          this.billCodeEditForm2.patchValue({


            'VS740_PbxCode': response.primary_bill_code[0].bill_code_740,
            'VS740_RetailCode': response.primary_bill_code[0].primary_code_retail_740,
            'VS740_PbxLow': response.primary_bill_code[0].low_credit_740,
            'VS740_PbxHigh': response.primary_bill_code[0].high_credit_740,
            'VS740_RetailLow': response.primary_bill_code[0].retail_low_credit_740,
            'VS740_RetailHigh': response.primary_bill_code[0].retail_high_credit_740,

            'VS750_PbxCode': response.primary_bill_code[0].bill_code_750,
            'VS750_RetailCode': response.primary_bill_code[0].primary_code_retail_750,
            'VS750_PbxLow': response.primary_bill_code[0].low_credit_750,
            'VS750_PbxHigh': response.primary_bill_code[0].high_credit_750,
            'VS750_RetailLow': response.primary_bill_code[0].retail_low_credit_750,
            'VS750_RetailHigh': response.primary_bill_code[0].retail_high_credit_750,

            'VSKL_PbxCode': response.primary_bill_code[0].bill_code_kl,
            'VSKL_RetailCode': response.primary_bill_code[0].primary_code_retail_kl,
            'VSKL_PbxLow': response.primary_bill_code[0].low_credit_kl,
            'VSKL_PbxHigh': response.primary_bill_code[0].high_credit_kl,
            'VSKL_RetailLow': response.primary_bill_code[0].retail_low_credit_kl,
            'VSKL_RetailHigh': response.primary_bill_code[0].retail_high_credit_kl,
          });

        }
        console.log("bill code edit form 2", this.billCodeEditForm2.value);

      }

    });



  }
  billCodeAttachmentUpdate() {
    // $("#editCustomerContractId").modal("hide");
    // console.log(this.editContractGroupForm.value)
    // console.log(this.billCodeEditForm1.value.billCodeGroupRow);
    // console.log(this.edit_a);
    let api_req: any = new Object();
    let updateBillCode_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/billcode_details_update"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    updateBillCode_req.action = "billcode_details_update";
    updateBillCode_req.user_id = localStorage.getItem('user_id');
    updateBillCode_req.customer_bill_code = this.edit_a;
    updateBillCode_req.primary_bill_code = this.edit_b;
    // updateBillCode_req.values2 = this.billCodeEditForm1.value.edit_addresses;

    updateBillCode_req.bill_code_740 = this.billCodeEditForm2.value.VS740_PbxCode;
    updateBillCode_req.primary_code_retail_740 = this.billCodeEditForm2.value.VS740_RetailCode;
    updateBillCode_req.low_credit_740 = this.billCodeEditForm2.value.VS740_PbxLow;
    updateBillCode_req.high_credit_740 = this.billCodeEditForm2.value.VS740_PbxHigh;
    updateBillCode_req.retail_low_credit_740 = this.billCodeEditForm2.value.VS740_RetailLow;
    updateBillCode_req.retail_high_credit_740 = this.billCodeEditForm2.value.VS740_RetailHigh;
    updateBillCode_req.bill_code_750 = this.billCodeEditForm2.value.VS750_PbxCode;
    updateBillCode_req.primary_code_retail_750 = this.billCodeEditForm2.value.VS750_RetailCode;
    updateBillCode_req.low_credit_750 = this.billCodeEditForm2.value.VS750_PbxLow;
    updateBillCode_req.high_credit_750 = this.billCodeEditForm2.value.VS750_PbxHigh;
    updateBillCode_req.retail_low_credit_750 = this.billCodeEditForm2.value.VS750_RetailLow;
    updateBillCode_req.retail_high_credit_750 = this.billCodeEditForm2.value.VS750_RetailHigh;
    updateBillCode_req.bill_code_kl = this.billCodeEditForm2.value.VSKL_PbxCode;
    updateBillCode_req.primary_code_retail_kl = this.billCodeEditForm2.value.VSKL_RetailCode;
    updateBillCode_req.low_credit_kl = this.billCodeEditForm2.value.VSKL_PbxLow;
    updateBillCode_req.high_credit_kl = this.billCodeEditForm2.value.VSKL_PbxHigh;
    updateBillCode_req.retail_low_credit_kl = this.billCodeEditForm2.value.VSKL_RetailLow;
    updateBillCode_req.retail_high_credit_kl= this.billCodeEditForm2.value.VSKL_RetailHigh;
  
    api_req.element_data = updateBillCode_req;

   
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      console.log("update response", response)

      if (response != '') {
        Swal.fire({
          icon: 'success',
          title: 'Bill Code has been updated',  
          showConfirmButton: false,  
          timer: 1200, 
        });
       
        this.customerslist();
      }
      else{
        Swal.fire({
          icon: 'success',
          title: 'Bill Code has not been updated',  
          showConfirmButton: false,  
          timer: 1200, 
        });
      }

    });


  }
  landscapeEmailEdit(id:any){
    this.landscapeEmailForm.reset();
    this.landscapeEmail_Customer_ID=id;
    let api_req: any = new Object();
    let api_mail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_email_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mail_req.action = "customer_email_template";
    api_mail_req.user_id = localStorage.getItem('user_id');
    api_mail_req.customer_id =  this.landscapeEmail_Customer_ID;
    api_req.element_data = api_mail_req;
  
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("Landscape Email Edit display", response)

      if (response!='') {
     this.From_List=response.email_from_det;
     this.Template_List=response.crm_template_det;
     console.log("Landscape  Email Template_List", this.Template_List);
    
     this.landscapeEmailForm.patchValue({
      'landscapeEmail_From': response.email_from_det,
      'landscapeEmail_To': response.email_id,
      // 'landscapeEmail_Subject': response.email_from_det,
      'landscapeEmail_Template': response.crm_template_det,
      // 'landscapeEmail_Message': response.email_id,
    });
    }
    

    });
  }
  // somethingChanged(event: any){
  //   console.log("event value",event.target.value)
  // }
  LandscapeEmailContentDropdown(event:any){
    // alert("hi")
    this.CRMTemplateID=event.target.value;
    console.log("template ID check",this.CRMTemplateID);
    let api_req: any = new Object();
    let api_mailContentDropdown_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_customer_authendication_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mailContentDropdown_req.action = "get_customer_authendication_details";
    api_mailContentDropdown_req.user_id = localStorage.getItem('user_id');
    api_mailContentDropdown_req.customer_id =  this.landscapeEmail_Customer_ID;
    api_mailContentDropdown_req.template_id =  this.CRMTemplateID;
    api_req.element_data = api_mailContentDropdown_req;
  
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("Landscape Email display after dropdown changes", response)

      if (response.status==true) {
        this.landscapeEmailForm.patchValue({
          
          'landscapeEmail_Subject': response.crm_subject_name,
         
          'landscapeEmail_Message': response.crm_template_content,
        });
   
      }
    

    });
  }
  sendLandscapeMail() {
    this.emailFrom = $('#emailFromLandscape').val();
    this.emailTo = $('#emailToLandscape').val();
    this.subjectValue = $('#subjLandscape').val();
    this.emailTemplate=$('#templateLandscape').val();
    this.msg_id = tinymce.get('tinyLandscapeEmailID').getContent();
    
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "sendemail/customer_landscape_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "customer_landscape_mail";
    api_email_req.user_id = localStorage.getItem('user_id');
    // api_email_req.customer_contract_id = this.EmailCustomerContractID;
    api_email_req.emailFrom = this.emailTo;
    api_email_req.emailTo = this.emailTo;
    api_email_req.emailSubject = this.subjectValue;
    api_email_req.emailTemplate =  this.emailTemplate
    api_email_req.emailContent = this.msg_id;

    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer Landscape email", response);

      if (response != 'null' && response != null) {
        $('#emailFromLandscape').val('');
        $('#emailToLandscape').val('');
        $('#subjLandscape').val('');
        $('#templateLandscape').val('');
        tinymce.activeEditor.setContent("");
        $("#TextEditorId").modal("hide");
      
        this.customerslist();
        Swal.fire({
          icon: 'error',
          title: 'Email Not Sent',
          showConfirmButton: false,
          timer: 1200,
        });
      }
      else {
        $('#emailFromLandscape').val('');
        $('#emailToLandscape').val('');
        $('#subjLandscape').val('');
        $('#templateLandscape').val('');
        tinymce.activeEditor.setContent("");
        $("#TextEditorId").modal("hide");

        this.customerslist();
        Swal.fire({
          icon: 'success',
          title: 'Email Notification Sent Successfully',
          showConfirmButton: false,
          timer: 1200,
        });
      }

      this.customerslist();
    });
  }
  clear() {
    alert("clear")
    this.addCustomer.vs_credit = '';
    this.addCustomer.def_payment_via = '';
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
