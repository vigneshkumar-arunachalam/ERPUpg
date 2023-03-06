import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-license-credit',
  templateUrl: './license-credit.component.html',
  styleUrls: ['./license-credit.component.css']
})
export class LicenseCreditComponent implements OnInit {

  // list

  license_list: any;
 
  partner_list_1: any;
  partner_list_2: any;
  partner_list_3: any;
  partner_list_dCare: any;
 

  //  SECTION  2

  name1: any;
  name2: any;
  name3: any;
  //  1 cal4care
  monthly_list1: any;
  monthly_list2: any;
  monthly_list3: any;
  monthly_list4: any;
  monthly_list5: any;
  monthly_list6: any;
  monthly_list7: any;
  monthly_list8: any;
  monthly_list9: any;
  monthly_list10: any;
  monthly_list11: any;
  monthly_list12: any;
  monthly_list13: any;
  monthly_list14: any;

  // 2 cal4care

  monthly_list_2_1: any;
  monthly_list_2_2: any;
  monthly_list_2_3: any;
  monthly_list_2_4: any;
  monthly_list_2_5: any;
  monthly_list_2_6: any;
  monthly_list_2_7: any;
  monthly_list_2_8: any;
  monthly_list_2_9: any;
  monthly_list_2_10: any;
  monthly_list_2_11: any;
  monthly_list_2_12: any;
  monthly_list_2_13: any;

  // 3 cal4care
  monthly_list_3_1: any;
  monthly_list_3_2: any;
  monthly_list_3_3: any;
  monthly_list_3_4: any;
  monthly_list_3_5: any;
  monthly_list_3_6: any;
  monthly_list_3_7: any;
  monthly_list_3_8: any;
  monthly_list_3_9: any;
  monthly_list_3_10: any;
  monthly_list_3_11: any;
  monthly_list_3_12: any;
  monthly_list_3_13: any;

  x: any;
 
  constructor(private serverService: ServerService, private router: Router) { }


  ngOnInit(): void {
    this.licenseList();
    this.overAllLicenseOnOff({});
    this.monthlyAmount();
  }


  licenseList() {
    let api_req: any = new Object();
    let api_DidList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/api_key_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_DidList.action = "api_key_list";
    api_DidList.userID = localStorage.getItem("user_id");
   
    api_req.element_data = api_DidList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response) {
        this.license_list = response.options;
       
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  LicenseListEdit(id: any, event: any) {

    confirm("Are you sure, you want to change the api status?")
    let api_req: any = new Object();
    let api_LicenseList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/apikey_status_change"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenseList.action = "apikey_status_change";
    api_LicenseList.userID = localStorage.getItem("user_id");
    api_LicenseList.api_id = id;
    api_req.element_data = api_LicenseList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {
        iziToast.success({
          message: "Changed",
          position: 'topRight'
        });

      } else {
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
      }
    });

  }

  overAllLicenseOnOff(event: any) {

    let api_req: any = new Object();
    let api_LicenseList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/overall_apikey_status"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenseList.action = "overall_apikey_status";
    api_LicenseList.userID = localStorage.getItem("user_id");
    api_req.element_data = api_LicenseList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.x = response.value
      console.log("response status", response.status);
      if (response.status == true) {
        iziToast.success({
          message: "Changed",
          position: 'topRight'
        });
        this.licenseList();

      } else {
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
      }
    });

  }
  updateOverAllLicenseOnOff(event: any) {

    var value = event.target.checked;
    var idVal = Number(value)
    let api_req: any = new Object();
    let api_LicenseList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/update_overall_apikey_status"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenseList.action = "update_overall_apikey_status";
    api_LicenseList.userID = localStorage.getItem("user_id");
    api_LicenseList.value = idVal;
    api_req.element_data = api_LicenseList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {


        iziToast.success({
          message: "Changed",
          position: 'topRight'
        });

      } else {
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
      }
    });

  }


  monthlyAmount() {

    let api_req: any = new Object();
    let api_LicenseList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/credit_data_check"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenseList.action = "credit_data_check";
    api_LicenseList.userID = localStorage.getItem("user_id");

    api_req.element_data = api_LicenseList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response) {


        this.name1 = response.name[0];
        this.name2 = response.name[1];
        this.name3 = response.name[2];




        // cal4acre - 1


        this.monthly_list1 = response.credit_data.Cal4care1.Jan;
        this.monthly_list2 = response.credit_data.Cal4care1.Feb;
        this.monthly_list3 = response.credit_data.Cal4care1.Mar;
        this.monthly_list4 = response.credit_data.Cal4care1.Apr;
        this.monthly_list5 = response.credit_data.Cal4care1.May;
        this.monthly_list6 = response.credit_data.Cal4care1.Jun;
        this.monthly_list7 = response.credit_data.Cal4care1.Jul;
        this.monthly_list8 = response.credit_data.Cal4care1.Aug;
        this.monthly_list9 = response.credit_data.Cal4care1.Sep;
        this.monthly_list10 = response.credit_data.Cal4care1.Oct;
        this.monthly_list11 = response.credit_data.Cal4care1.Nov;
        this.monthly_list12 = response.credit_data.Cal4care1.Dec;
        this.monthly_list13 = response.total.Cal4care1;


        // cal4care - 2

        this.monthly_list_2_1 = response.credit_data.Cal4care2.Jan;
        this.monthly_list_2_2 = response.credit_data.Cal4care2.Feb;
        this.monthly_list_2_3 = response.credit_data.Cal4care2.Mar;
        this.monthly_list_2_4 = response.credit_data.Cal4care2.Apr;
        this.monthly_list_2_5 = response.credit_data.Cal4care2.May;
        this.monthly_list_2_6 = response.credit_data.Cal4care2.Jun;
        this.monthly_list_2_7 = response.credit_data.Cal4care2.Jul;
        this.monthly_list_2_8 = response.credit_data.Cal4care2.Aug;
        this.monthly_list_2_9 = response.credit_data.Cal4care2.Sep;
        this.monthly_list_2_10 = response.credit_data.Cal4care2.Oct;
        this.monthly_list_2_11 = response.credit_data.Cal4care2.Nov;
        this.monthly_list_2_12 = response.credit_data.Cal4care2.Dec;
        this.monthly_list_2_13 = response.total.Cal4care2;

        // cal4care -3

        this.monthly_list_3_1 = response.credit_data.Cal4care3.Jan;
        this.monthly_list_3_2 = response.credit_data.Cal4care3.Feb;
        this.monthly_list_3_3 = response.credit_data.Cal4care3.Mar;
        this.monthly_list_3_4 = response.credit_data.Cal4care3.Apr;
        this.monthly_list_3_5 = response.credit_data.Cal4care3.May;
        this.monthly_list_3_6 = response.credit_data.Cal4care3.Jun;
        this.monthly_list_3_7 = response.credit_data.Cal4care3.Jul;
        this.monthly_list_3_8 = response.credit_data.Cal4care3.Aug;
        this.monthly_list_3_9 = response.credit_data.Cal4care3.Sep;
        this.monthly_list_3_10 = response.credit_data.Cal4care3.Oct;
        this.monthly_list_3_11 = response.credit_data.Cal4care3.Nov;
        this.monthly_list_3_12 = response.credit_data.Cal4care3.Dec;
        this.monthly_list_3_13 = response.total.Cal4care3;
      

        // iziToast.success({
        //   message: "Changed",
        //   position: 'topRight'
        // });

      } else {
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
      }
    });

  }

}
