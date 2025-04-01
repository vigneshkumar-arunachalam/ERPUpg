import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
})
export class VendorComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 20;
  paginationData: any = { info: 'hide' };
  offset_count = 0;

  // List

  userId: any;
  searchResult: any;
  vendor_list: any;

  // ADD
  addVendorForm: FormGroup;

  // edit

  editVedorForm: FormGroup;
  vendor_id: any;
  countryCode: any;
  edit_company_code: any;
  edit_company_name: any;
  edit_vendor_name: any;
  edit_address_1: any;
  edit_address_2: any;
  edit_city: any;
  edit_state: any;
  edit_country: any;
  edit_phone: any;
  edit_mobile_phone: any;
  edit_fax: any;
  edit_e_mail: any;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('erp_c4c_user_id');

    this.getVendorListData({});

    this.addVendorForm = new FormGroup({
      company_code: new FormControl(null),
      company_name: new FormControl(null),
      vendor_name: new FormControl(null),
      address_1: new FormControl(null),
      address_2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      phone: new FormControl(null),
      mobile_phone: new FormControl(null),
      fax: new FormControl(null),
      e_mail: new FormControl(null),
    });
    this.editVedorForm = new FormGroup({
      edit_company_code: new FormControl(null),
      edit_company_name: new FormControl(null),
      edit_vendor_name: new FormControl(null),
      edit_address_1: new FormControl(null),
      edit_address_2: new FormControl(null),
      edit_city: new FormControl(null),
      edit_state: new FormControl(null),
      edit_country: new FormControl(null),
      edit_phone: new FormControl(null),
      edit_mobile_phone: new FormControl(null),
      edit_fax: new FormControl(null),
      edit_e_mail: new FormControl(null),
    });
  }

  searchCustomerData(data: any) {
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = 'customer';
    api_req.api_url = 'customer/customer_name_search';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_Search_req.action = 'customer_name_search';
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.searchResult = response.customer_names;
      if ((response.status = true)) {
      }
    });
  }

  listDataInfo(list_data: any) {
    // console.log(list_data)
    list_data.search_text =
      list_data.search_text == undefined ? '' : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type =
      list_data.order_by_type == undefined ? 'desc' : list_data.order_by_type;
    list_data.limit =
      list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  getVendorListData(data: any) {
    this.spinner.show();

    var list_data = this.listDataInfo(data);
    let requestObj = {
      moduleType: 'vendor',
      api_url: 'vendor/vendorlist',
      api_type: 'web',
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'vendor/vendorlist',
        user_id: this.userId,
        offset: list_data.offset,
        limit: list_data.limit,
        search_txt: list_data.search_text,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.vendor_list = response.total_cnt;
        this.paginationData = this.serverService.pagination({
          offset: response.off_set,
          total: response.total,
          page_limit: this.pageLimit,
        });

        this.recordNotFound = this.vendor_list.length == 0 ? true : false;

        this.spinner.hide();
      }
    });
  }

  getCountryCode() {
    let api_req =
      '{"moduleType":"vendor","api_url":"vendor/companycode","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"vendor/companycode","user_id":"39"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.countryCode = response.companycode;
      } else {
      }
    });
  }

  open_Vendor_popup() {
    this.getCountryCode();
    $('#vendorNewManagement').modal('show');
  }

  AddVendor() {
    let company_code = this.addVendorForm.value.company_code;
    let company_name = this.addVendorForm.value.company_name;
    let vendor_name = this.addVendorForm.value.vendor_name;
    let address_1 = this.addVendorForm.value.address_1;
    let address_2 = this.addVendorForm.value.address_2;
    let city = this.addVendorForm.value.city;
    let state = this.addVendorForm.value.state;
    let country = this.addVendorForm.value.country;
    let phone = this.addVendorForm.value.phone;
    let mobile_phone = this.addVendorForm.value.mobile_phone;
    let fax = this.addVendorForm.value.company_name;
    let e_mail = this.addVendorForm.value.e_mail;

    if (
      company_code == '' ||
      company_code == null ||
      company_code == undefined
    ) {
      iziToast.warning({
        message: 'please Enter Company Code',
        position: 'topRight',
      });
      return false;
    }
    if (
      company_name == '' ||
      company_name == null ||
      company_name == undefined
    ) {
      iziToast.warning({
        message: 'please Enter Company Name',
        position: 'topRight',
      });
      return false;
    }
    if (vendor_name == '' || vendor_name == null || vendor_name == undefined) {
      iziToast.warning({
        message: 'please Enter Vendor Name',
        position: 'topRight',
      });
      return false;
    }

    let api_req =
      '{"moduleType":"vendor","api_url":"vendor/vendoradd","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"vendor/vendoradd","user_id":"39","vendorName":"' +
      vendor_name +
      '","vendorCode":"' +
      company_code +
      '","vendorAddress1":"' +
      address_1 +
      '","vendorAddress2":"' +
      address_2 +
      '","city":"' +
      city +
      '","state":"' +
      state +
      '","zipCode":"","country":"' +
      country +
      '","phone":"' +
      phone +
      '","mobilePhone":"' +
      mobile_phone +
      '","fax":"' +
      fax +
      '","email":"' +
      e_mail +
      '","companyName":"' +
      company_name +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == 'true') {
        this.getVendorListData({});
        $('#vendorNewManagement').modal('hide');
        this.addVendorForm.reset();
        iziToast.success({
          message: response.data,
          position: 'topRight',
        });
      } else {
        // this.spinner.hide();
        iziToast.warning({
          message: 'Vendor Save Failed',
          position: 'topRight',
        });
      }
    });
  }

  viewVendor(id: any) {
    let api_req =
      '{"moduleType":"vendor","api_url":"vendor/vendoredit","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"vendor/vendoredit","user_id":"39","vendorid":"' +
      id +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.edit_company_code = response.vendorCode;
        this.edit_company_name = response.companyName;
        this.edit_vendor_name = response.vendorName;
        this.edit_address_1 = response.vendorAddress1;
        this.edit_address_2 = response.vendorAddress2;
        this.edit_city = response.city;
        this.edit_state = response.state;
        this.edit_country = response.country;
        this.edit_phone = response.phone;
        this.edit_mobile_phone = response.mobilePhone;
        this.edit_fax = response.fax;
        this.edit_e_mail = response.email;

        this.vendor_id = response.vendorId;
        $('#ViewvendorNewManagement').modal('show');
      } else {
      }
    });
  }

  EditVendor(id: any) {
    let api_req =
      '{"moduleType":"vendor","api_url":"vendor/vendoredit","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"vendor/vendoredit","user_id":"39","vendorid":"' +
      id +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.editVedorForm.patchValue({
          edit_company_code: response.vendorCode,
          edit_company_name: response.companyName,
          edit_vendor_name: response.vendorName,
          edit_address_1: response.vendorAddress1,
          edit_address_2: response.vendorAddress2,
          edit_city: response.city,
          edit_state: response.state,
          edit_country: response.country,
          edit_phone: response.phone,
          edit_mobile_phone: response.mobilePhone,
          edit_fax: response.fax,
          edit_e_mail: response.email,
        });
        this.vendor_id = response.vendorId;
        $('#EditvendorNewManagement').modal('show');
      } else {
      }
    });
  }

  updateVendor() {
    let company_code = this.editVedorForm.value.edit_company_code;
    let company_name = this.editVedorForm.value.edit_company_name;
    let vendor_name = this.editVedorForm.value.edit_vendor_name;
    let address_1 = this.editVedorForm.value.edit_address_1;
    let address_2 = this.editVedorForm.value.edit_address_2;
    let city = this.editVedorForm.value.edit_city;
    let state = this.editVedorForm.value.edit_state;
    let country = this.editVedorForm.value.edit_country;
    let phone = this.editVedorForm.value.edit_phone;
    let mobile_phone = this.editVedorForm.value.edit_mobile_phone;
    let fax = this.editVedorForm.value.edit_company_name;
    let e_mail = this.editVedorForm.value.edit_e_mail;

    if (
      company_code == '' ||
      company_code == null ||
      company_code == undefined
    ) {
      iziToast.warning({
        message: 'please Enter Company Code',
        position: 'topRight',
      });
      return false;
    }
    if (
      company_name == '' ||
      company_name == null ||
      company_name == undefined
    ) {
      iziToast.warning({
        message: 'please Enter Company Name',
        position: 'topRight',
      });
      return false;
    }
    if (vendor_name == '' || vendor_name == null || vendor_name == undefined) {
      iziToast.warning({
        message: 'please Enter Vendor Name',
        position: 'topRight',
      });
      return false;
    }

    let api_req =
      '{"moduleType":"vendor","api_url":"vendor/vendorupdate","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"vendor/vendorupdate","user_id":"39","vendorName":"' +
      vendor_name +
      '","vendorCode":"' +
      company_code +
      '","vendorAddress1":"' +
      address_1 +
      '","vendorAddress2":"' +
      address_2 +
      '","city":"' +
      city +
      '","state":"' +
      state +
      '","zipCode":"","country":"' +
      country +
      '","phone":"' +
      phone +
      '","mobilePhone":"' +
      mobile_phone +
      '","fax":"' +
      fax +
      '","email":"' +
      e_mail +
      '","companyName":"' +
      company_name +
      '","vendorid":"' +
      this.vendor_id +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == 'true') {
        this.getVendorListData({});
        $('#EditvendorNewManagement').modal('hide');
        iziToast.success({
          message: response.data,
          position: 'topRight',
        });
      } else {
        // this.spinner.hide();
        iziToast.warning({
          message: 'Vendor Save Failed',
          position: 'topRight',
        });
      }
    });
  }

  deleteVendor(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        let requestObj = {
          moduleType: 'vendor',
          api_url: 'vendor/vendordelete',
          api_type: 'web',
          element_data: {
            action: 'vendor/vendordelete',
            user_id: this.userId,
            vendorid: id,
          },
        };

        let api_req: any = JSON.parse(JSON.stringify(requestObj));

        this.serverService
          .sendServerpath(api_req)
          .subscribe((response: any) => {
            //console.log(response);
            if (response.status == 'true') {
              iziToast.success({
                message: 'Vendor deleted successfully',
                position: 'topRight',
              });
              this.getVendorListData({});
            } else {
              iziToast.warning({
                message: 'Vendor not deleted, Please try again!',
                position: 'topRight',
              });
            }
          });
      }
    });
  }
}
