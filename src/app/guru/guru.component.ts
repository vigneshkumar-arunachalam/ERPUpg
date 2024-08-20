import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
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
  selector: 'app-guru',
  templateUrl: './guru.component.html',
  styleUrls: ['./guru.component.css']
})
export class GuruComponent implements OnInit {
  guru_list: any;
  public addGuru_FormGroup: FormGroup;
  public addresses: FormArray;
  AccountType: any;
  billerDetails: any;
  searchResult_productName: any;
  searchResult_customerName: any;
  constructor(private serverService: ServerService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.addGuru_FormGroup = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }
  keyword_customerName = 'customerName';

  ngOnInit(): void {

    this.guruList();
    this.getGuruBillers();
  }
  get addressControls() {
    return this.addGuru_FormGroup.get('addresses') as FormArray
  }
  createAddress(): FormGroup {
    return this.fb.group({
      billerId: '',
      customer_id: '',
      description: '',
      account_type: '',
      pwd_username: '',
      pwd_guru: '',
      webpage_url: '',
      special_per: '',
    });

  }

  addGuruGo() {
    $('#addGuruDetailsFormId').modal('show');

  }
  searchGuruGo() {

  }

  addAddress() {

    this.addresses = this.addGuru_FormGroup.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  cancelAddress() {

  }
  guruList() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/guruDetailsList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guruDetailsList";
    api_getReseller.customerId = null;
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.guru_list = response.data;

        this.spinner.hide();


      } else {


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
  getGuruBillers() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/getGuruBillers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guru/getGuruBillers";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.AccountType = response.account_type;
        this.billerDetails = response.biller;

        this.spinner.hide();


      } else {


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
  onFocusedCustomer(event: any) {

  }
  searchCustomerName(data: any) {
    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "guru/getCustomerName";
    api_SearchProd_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_SearchProd_req.searchkey = data;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("quotation/product_name_auto response", response);
      this.searchResult_customerName = response.customerName;

      console.log("response.customerName", this.searchResult_customerName)

      if (response.status != '') {
        // this.productNameAutoFill();

      }

    });

  }
  selectEventCustomer(item: any, i: any) {
    console.log("item", item)
    console.log("item.customerName", item.customerName)
    console.log("item.customerId", item.customerId)
    //  $('#pd_customername_txtbox_' + i).val(item.customerName)
    $('#pd_customername_txtbox_' + i).val(item.customerId)

  }
  insertGuruDetails() {
    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/insert_guru_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "guru/insert_guru_details";
    api_SearchProd_req.user_id = localStorage.getItem('erp_c4c_user_id');

    for (let i = 0; i < this.addGuru_FormGroup.value.addresses.length; i++) {
      this.addGuru_FormGroup.value.addresses[i].billerId = $('#pd_billername_txtbox_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].customer_id = $('#pd_customername_txtbox_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].description = $('#pd_description_txtArea_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].account_type = $('#pd_accountType_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].pwd_username = $('#pd_username_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].pwd_guru = $('#pd_guru_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].webpage_url = $('#pd_url_' + i).val();
      this.addGuru_FormGroup.value.addresses[i].special_per = $('#pd_s_perm_' + i).prop('checked');
    }
    api_SearchProd_req.values = this.addGuru_FormGroup.value.addresses;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $('#addGuruDetailsFormId').modal('hide');

        iziToast.success({
          message: "Saveded Successfully",
          position: 'topRight'
        });
        this.guruList();

      } else {
        iziToast.error({
          message: "Save Failed",
          position: 'topRight'
        });

      }

    });

  }

}

