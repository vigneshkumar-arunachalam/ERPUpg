import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-dcipallow',
  templateUrl: './dcipallow.component.html',
  styleUrls: ['./dcipallow.component.css']
})
export class DcipallowComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  //pagination
  recordNotFound = false;
  pageLimit = 100;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //
  vsprovision_list: any;
  googleAuthentication_status: boolean = false;
  vsView: boolean;
  viewConnectionType: any;
  viewDate: any;
  viewTypeofPhone: any;
  viewMacAddress: any;
  viewDIDNO: any;
  viewLabelName: any;
  viewAccountName: any;
  viewUsername: any;
  viewPassword: any;
  //edit
  editVSProvisionForm: FormGroup;
  //add
  addVSProvisionForm: FormGroup;
  isReadOnly: boolean = false;
  radioSelected: boolean = false;
  DIDNoList: any;
  phoneTypeList: any;
  companyList: any;
  billerList: any;
  phoneEntryTypes: any;
  customerStatusEdit: number;
  phoneEntryType_ChangeValue: any;
  DIDNoSelect_ChangeValue: any;
  DIDNoList1: any;




  //GoogleAuthentication
  GoogleAuthenticationForm: FormGroup;
  //comment
  commentFormGroup: FormGroup;
  customerIdComment: any;
  //file attachment
  fileAttach_quotationID: any;
  FileAttachmentForm: FormGroup;
  getFileAttachmentResult: any;
  myFiles: string[] = [];
  edit_array: any = [];
  checkbox_value_file: any;
  groupSelectCommonId: any;
  commonAttachmentID: any;
  checkboxAdding: any = [];
  customerIdFile: any;
  editDIDNoSelect: any;
  customerIdy: any;
  DIDNoSelect_EditValue: any;
  statusEdit: any;
  DIDStatusValue: any;
  //billcode edit
  public billcodeSection: FormGroup;
  public addresses1: FormArray;
  //primary edit
  public primaryEditSection: FormGroup;
  public addresses5: FormArray;
  // Search
  searchVSForm: FormGroup;
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  searchResult: any;
  searchText_ID: any;
  searchText_Name: any;
  searchTextResult: any;
  countryList: any;
  addressList: any;
  countryChange: any;
  PG_customerId: any;
  PG_customerName: string;
  e_addPI_section2: FormGroup;
  PG_customerIdEdit: string;
  PG_customerNameEdit: string;
  sendOTPList: any;
  sendOTP_id: any;
  sendOTP_otp: any;




  constructor(private serverService: ServerService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private fb: FormBuilder) {

  }
  keywordCompanyName = 'customerName';
  keywordSearchText = 'search_name';
  ngOnInit(): void {
    this.sendOTP();

    this.GoogleAuthenticationForm = new FormGroup({
      'google_AuthenticationCode': new FormControl(null),
    });
    this.addPI_section2 = new FormGroup({
      'Country': new FormControl(null),
      'CustomerName': new FormControl(null),
      'ShortName': new FormControl(null),
      'AddressGroup': new FormControl(null),
      'IPAddress': new FormControl(null),
      'Temporary': new FormControl(false),
    });
    this.e_addPI_section2 = new FormGroup({
      'e_Country': new FormControl(null),
      'e_CustomerName': new FormControl(null),
      'e_ShortName': new FormControl(null),
      'e_AddressGroup': new FormControl(null),
      'e_IPAddress': new FormControl(null),
      'e_Temporary': new FormControl(false),
    });

    const authDataRaw = localStorage.getItem('google_auth');
    if (authDataRaw) {
      const authData = JSON.parse(authDataRaw);
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - authData.timestamp) / 1000; // in seconds

      if (authData.status && elapsedTime < 600) {
        this.googleAuthentication_status = true;
        this.spinner.show();
        // Optional: if you want to preload data on reload
        this.vsprovisionList({}, {});      // Optional: preload VSP list
      } else {
        this.spinner.show();
        localStorage.removeItem('google_auth');
        this.googleAuthentication_status = false;

      }
    }
    // $('#GoogleAuthenticationVSPFormId').modal('show');

    this.vsprovisionList({}, {});
    this.searchVSForm = new FormGroup({
      'Vs_company_Name': new FormControl(null),
      'VS_searchText': new FormControl(null)

    });

    this.getCountry();
  }






  addVSProvisionGo() {
    $('#addDCIPAllowFormId').modal('show');

  }
  searchVSProvisionGo() {
    $('#searchVSProvisionFormId').modal('show');
  }

  edit(id: any) {

    let api_req: any = new Object();
    let api_pay_req: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "AllowIP/dcIPEdit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_pay_req.action = "AllowIP/dcIPEdit";
    api_pay_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_pay_req.id = id;
    api_req.element_data = api_pay_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {



      if (response.status == true) {
        $('#editDCIPAllowFormId').modal('show');
        this.PG_customerIdEdit = response.customer_id;
        this.PG_customerNameEdit = response.customer_name;


        this.e_addPI_section2.patchValue({
          'e_Country': response.country_id,
          'e_CustomerName': response.customer_name,
          'e_ShortName': response.short_name,
          'e_AddressGroup': response.grpname,
          'e_IPAddress': response.ip_data_from,
          'e_Temporary': response.temp,

        })



        // console.log("this.creditResponse", this.creditResponse)
        this.spinner.hide();
      }
      else {




      }
    });




  }
  delete(data: any) {

  }
  countryChange1(data: any) {

    this.countryChange = data.target.value;
    console.log(" this.countryChange", this.countryChange);
    this.forti_group();

  }


  vsprovisionList(data: any, value: any) {
    $('#GoogleAuthenticationGuruFormId').modal('hide');
    $('#searchGuruFormId').modal('hide');

    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "pettycash";
    if (value == 0) {
      api_req.api_url = "AllowIP/DcIPList"
    } else if (value == 2) {
      api_req.api_url = "AllowIP/DcIPListRequested"
    } else {
      api_req.api_url = "AllowIP/DcIPListTemporary"
    }

    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";

    if (value == 0) {
      api_req.action = "AllowIP/DcIPList"
    } else if (value == 2) {
      api_req.action = "AllowIP/DcIPListRequested"
    } else {
      api_req.action = "AllowIP/DcIPListTemporary"
    }
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = "";
    get_req.search_txt = this.searchText_Name;
    api_req.element_data = get_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.vsprovision_list = response.data;
        if (response.data.length == 0) {
          this.vsView = true;
        }
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
        $('#searchVSProvisionFormId').modal('hide');

      } else {


        iziToast.warning({
          message: "Details not displayed. Please try again",
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

  GoogleAuthenticationValidation() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_googleAuthVali: any = new Object();
    api_req.moduleType = "AllowIP";
    api_req.api_url = "AllowIP/DcIPOTPVerify";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_googleAuthVali.action = "AllowIP/DcIPOTPVerify";
    api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');
    api_googleAuthVali.id = this.sendOTP_id;
    api_googleAuthVali.otp = this.sendOTP_otp;

    api_req.element_data = api_googleAuthVali;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $(document).ready(function () {
          $("#showhide").show();
        });

        this.googleAuthentication_status = response.status;
        // Store status and timestamp in localStorage
        const authData = {
          status: true,
          timestamp: new Date().getTime()
        };
        localStorage.setItem('google_auth', JSON.stringify(authData));
        console.log(" this.googleAuthentication_status", this.googleAuthentication_status);
        if (this.googleAuthentication_status == true) {

          this.vsprovisionList({}, {});
        }


        iziToast.success({
          message: "Google Authentication Success",
          position: 'topRight'

        });
        $('#GoogleAuthenticationVSPFormId').modal("hide");


      } else {

        // $('#GoogleAuthenticationVSPFormId').modal("hide");
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
  sendOTP() {
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = 'AllowIP';
    api_req.api_url = 'AllowIP/sendOtp';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_Search_req.action = 'AllowIP/sendOtp';
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if ((response.status = true)) {
        this.sendOTP_id = response.id;
        this.sendOTP_otp = response.otp;

      }
    });
  }
  getCountry() {
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = 'pettycash';
    api_req.api_url = 'AllowIP/forti_master';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_Search_req.action = 'AllowIP/forti_master';
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if ((response.status = true)) {
        this.countryList = response.data;

      }
    });
  }
  forti_group() {
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = 'pettycash';
    api_req.api_url = 'AllowIP/forti_group';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_Search_req.action = 'AllowIP/forti_group';
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.country = this.countryChange;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if ((response.status = true)) {
        this.addressList = response.data;

      }
    });
  }
  selectEventCustomer(item: any) {

    this.PG_customerId = item.customerId;
    this.PG_customerName = item.customerName;


  }
  selectEventCustomerEdit(item: any) {

    this.PG_customerIdEdit = item.customerId;
    this.PG_customerNameEdit = item.customerName;


  }
  selectEventCustomerEditClear(item: any) {

    this.PG_customerIdEdit = '';
    this.PG_customerNameEdit = '';


  }
  selectEventCustomerClear(e: any) {
    this.PG_customerName = '';
    this.PG_customerId = '';
  }
  onFocusedCustomer(e: any) {

  }
  searchCustomerData(data: any) {
    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getCustomerName";
    api_comCode_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.customerName) {
        this.searchResult = response.customerName;

        // console.log(" this.searchResult", this.searchResult)

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

  addDCIP() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "AllowIP/DcIPInsert"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "AllowIP/DcIPInsert";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.country = this.addPI_section2.value.Country;
    api_mulInvpay.customer_id = this.PG_customerId;
    api_mulInvpay.customer_name = this.PG_customerName;
    api_mulInvpay.short_name = this.addPI_section2.value.ShortName;

    api_mulInvpay.ip_data_from = this.addPI_section2.value.IPAddress;
    api_mulInvpay.temp = this.addPI_section2.value.Temporary;
    api_mulInvpay.grpname = this.addPI_section2.value.AddressGroup;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        $('#addDCIPAllowFormId').modal("hide");

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Data Already Saved",
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
  updateDCIP() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "AllowIP/dcIPUpdate"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "AllowIP/dcIPUpdate";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.country = this.e_addPI_section2.value.e_Country;

    api_mulInvpay.customer_id = this.PG_customerIdEdit;
    api_mulInvpay.customer_name = this.PG_customerNameEdit;
    api_mulInvpay.short_name = this.e_addPI_section2.value.e_ShortName;

    api_mulInvpay.ip_data_from = this.e_addPI_section2.value.e_IPAddress;
    api_mulInvpay.temp = this.e_addPI_section2.value.e_Temporary;
    api_mulInvpay.grpname = this.e_addPI_section2.value.e_AddressGroup;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        $('#editDCIPAllowFormId').modal("hide");

        this.spinner.hide();
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Data Already Saved",
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


}
