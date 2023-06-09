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
 
  // partner_list_1: any;
  // partner_list_2: any;
  // partner_list_3: any;
  // partner_list_dCare: any;
 

  //  SECTION  
  names:any;
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

   // 3 cal4care
   monthly_list_4_1: any;
   monthly_list_4_2: any;
   monthly_list_4_3: any;
   monthly_list_4_4: any;
   monthly_list_4_5: any;
   monthly_list_4_6: any;
   monthly_list_4_7: any;
   monthly_list_4_8: any;
   monthly_list_4_9: any;
   monthly_list_4_10: any;
   monthly_list_4_11: any;
   monthly_list_4_12: any;
   monthly_list_4_13: any;

  x: any;
  months: any;


  // dCare


  dCare:any;


  dCare_list1:any
  dCare_list2:any;
  dCare_list3:any;
  dCare_list4:any;
  dCare_list5:any;
  dCare_list6:any;
  dCare_list7:any;
  dCare_list8:any;
  dCare_list9:any;
  dCare_list10:any;
  dCare_list11:any;
  dCare_list12:any;
  dCare_list13:any;


  d_total_list_1: any;
  d_total_list_2: any;
  d_total_list_3: any;
  d_total_list_4: any;
  d_total_list_5: any;
  d_total_list_6: any;
  d_total_list_7: any;
  d_total_list_8: any;
  d_total_list_9: any;
  d_total_list_10: any;
  d_total_list_11: any;
  d_total_list_12: any;
  d_total_list_13: any;
 


  
 
  constructor(private serverService: ServerService, private router: Router) { }


  ngOnInit(): void {
    this.licenseList();
    this.overAllLicenseOnOff({});
    this.monthlyAmount();
    this.dCareAmount();
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
        
        // this.months = response.month;
        // this.names = response.name;
       
   

        // cal4acre - 1
       

        this.monthly_list1 = response.options.Cal4care1.Jan;
        this.monthly_list2 = response.options.Cal4care1.Feb;
        this.monthly_list3 = response.options.Cal4care1.Mar;
        this.monthly_list4 = response.options.Cal4care1.Apr;
        this.monthly_list5 = response.options.Cal4care1.May;
        this.monthly_list6 = response.options.Cal4care1.Jun;
        this.monthly_list7 = response.options.Cal4care1.Jul;
        this.monthly_list8 = response.options.Cal4care1.Aug;
        this.monthly_list9 = response.options.Cal4care1.Sep;
        this.monthly_list10 = response.options.Cal4care1.Oct;
        this.monthly_list11 = response.options.Cal4care1.Nov;
        this.monthly_list12 = response.options.Cal4care1.Dec;
        this.monthly_list13 = response.total.Cal4care1;


        // cal4care - 2

        this.monthly_list_2_1 = response.options.Cal4care2.Jan;
        this.monthly_list_2_2 = response.options.Cal4care2.Feb;
        this.monthly_list_2_3 = response.options.Cal4care2.Mar;
        this.monthly_list_2_4 = response.options.Cal4care2.Apr;
        this.monthly_list_2_5 = response.options.Cal4care2.May;
        this.monthly_list_2_6 = response.options.Cal4care2.Jun;
        this.monthly_list_2_7 = response.options.Cal4care2.Jul;
        this.monthly_list_2_8 = response.options.Cal4care2.Aug;
        this.monthly_list_2_9 = response.options.Cal4care2.Sep;
        this.monthly_list_2_10 = response.options.Cal4care2.Oct;
        this.monthly_list_2_11 = response.options.Cal4care2.Nov;
        this.monthly_list_2_12 = response.options.Cal4care2.Dec;
        this.monthly_list_2_13 = response.total.Cal4care2;

        // cal4care -3

        this.monthly_list_3_1 = response.options.Cal4care3.Jan;
        this.monthly_list_3_2 = response.options.Cal4care3.Feb;
        this.monthly_list_3_3 = response.options.Cal4care3.Mar;
        this.monthly_list_3_4 = response.options.Cal4care3.Apr;
        this.monthly_list_3_5 = response.options.Cal4care3.May;
        this.monthly_list_3_6 = response.options.Cal4care3.Jun;
        this.monthly_list_3_7 = response.options.Cal4care3.Jul;
        this.monthly_list_3_8 = response.options.Cal4care3.Aug;
        this.monthly_list_3_9 = response.options.Cal4care3.Sep;
        this.monthly_list_3_10 = response.options.Cal4care3.Oct;
        this.monthly_list_3_11 = response.options.Cal4care3.Nov;
        this.monthly_list_3_12 = response.options.Cal4care3.Dec;
        this.monthly_list_3_13 = response.total.Cal4care3;

         // cal4care -4

         this.monthly_list_4_1 = response.Total.Jan;
         this.monthly_list_4_2 = response.Total.Feb;
         this.monthly_list_4_3 = response.Total.Mar;
         this.monthly_list_4_4 = response.Total.Apr;
         this.monthly_list_4_5 = response.Total.May;
         this.monthly_list_4_6 = response.Total.Jun;
         this.monthly_list_4_7 = response.Total.Jul;
         this.monthly_list_4_8 = response.Total.Aug;
         this.monthly_list_4_9 = response.Total.Sep;
         this.monthly_list_4_10 = response.Total.Oct;
         this.monthly_list_4_11 = response.Total.Nov;
         this.monthly_list_4_12 = response.Total.Dec;
         this.monthly_list_4_13 = response.final;
      

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


  dCareAmount(){

    let api_req: any = new Object();
    let api_LicenseList: any = new Object();
    api_req.moduleType = "license";
    api_req.api_url = "license/dcare_credit_data_check"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenseList.action = "dcare_credit_data_check";
    api_LicenseList.userID = localStorage.getItem("user_id");

    api_req.element_data = api_LicenseList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response) {

        this.dCare = response.name;


        this.dCare_list1 = response.options.dCare.Jan;
        this.dCare_list2 = response.options.dCare.Feb;
        this.dCare_list3 = response.options.dCare.Mar;
        this.dCare_list4 = response.options.dCare.Apr;
        this.dCare_list5 = response.options.dCare.May;
        this.dCare_list6 = response.options.dCare.Jun;
        this.dCare_list7 = response.options.dCare.Jul;
        this.dCare_list8 = response.options.dCare.Aug;
        this.dCare_list9 = response.options.dCare.Sep;
        this.dCare_list10 = response.options.dCare.Oct;
        this.dCare_list11 = response.options.dCare.Nov;
        this.dCare_list12 = response.options.dCare.Dec;
        this.dCare_list13 = response.total.dCare;


        // Total

        this.d_total_list_1 = response.Total.dCare.Jan;
        this.d_total_list_2 = response.Total.dCare.Feb;
        this.d_total_list_3 = response.Total.dCare.Mar;
        this.d_total_list_4 = response.Total.dCare.Apr;
        this.d_total_list_5 = response.Total.dCare.May;
        this.d_total_list_6 = response.Total.dCare.Jun;
        this.d_total_list_7 = response.Total.dCare.Jul;
        this.d_total_list_8 = response.Total.dCare.Aug;
        this.d_total_list_9 = response.Total.dCare.Sep;
        this.d_total_list_10 = response.Total.dCare.Oct;
        this.d_total_list_11 = response.Total.dCare.Nov;
        this.d_total_list_12 = response.Total.dCare.Dec;
        this.d_total_list_13 = response.final;
      
        
        
      
      }

    })
  }


}

 // this.monthly_list1 = '[ {"key":"Jan","p_amt": 8411,"i_amt": 12940} ,  {"key":"Feb","p_amt": 238.5, "i_amt": 318 },  {"key":"Mar","p_amt": 671.25, "i_amt": 895}]';
      // this.monthly_list1 = JSON.parse(this.monthly_list1)
        // console.log(this.monthly_list1)