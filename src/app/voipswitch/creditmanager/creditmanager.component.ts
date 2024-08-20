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
  selector: 'app-creditmanager',
  templateUrl: './creditmanager.component.html',
  styleUrls: ['./creditmanager.component.css']
})
export class CreditmanagerComponent implements OnInit {
  reseller_name_list:any;
 
  tableData: { serverName: string; noOfRecord: number; user: string; updatedOn: string; }[];
  voipSwitchAllListValue: any;
  
  SGVOIPSwitchChangeValue: boolean = false;
  getVoipDataListValues: any[] = [];
  variable: any;
  selectedCustomerId: any;
  filteredVoipData: any[] = [];
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
    this.spinner.show();
    this.creditManagerList();
    this.voipSwitchAllList();
  } 
  SGVOIPSwitchChange(event:any){
    this.SGVOIPSwitchChangeValue=event.target.checked;
  //  console.log("this.SGVOIPSwitchChangeValue",this.SGVOIPSwitchChangeValue)

  } 
  filterData(): void {
    if (this.selectedCustomerId) {
      this.filteredVoipData = this.getVoipDataListValues.filter((item: { customer_id: any; }) => item.customer_id === this.selectedCustomerId);
    } else {
      this.filteredVoipData = this.getVoipDataListValues;
    }
  }
  getResellerPaymentdetails(i:any,customerId:any){
    this.selectedCustomerId = customerId;
    this.filterData();
  }
  activate_vssg_client(clientID:any){

    this.spinner.show();

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "creditManager";
    api_req.api_url = "creditManager/activate_vssg_client";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "activate_vssg_client";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
   // api_year.client_id = clientID;
    api_year.client_id = 9;
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.data != '') {
        if(response.message==400){
          this.variable='DeActivate';
        }
        this.spinner.hide();
        this.creditManagerList();
       
      } else {

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
  Deactivate_vssg_client(clientID:any){

    this.spinner.show();

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "creditManager";
    api_req.api_url = "creditManager/deactivate_vssg_client";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "deactivate_vssg_client";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_year.client_id = clientID;
    api_year.client_id = 9;
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.data != '') {
        this.spinner.hide();
        if(response.message==200){
          this.variable='Activate';
        }
        this.creditManagerList();
       
      } else {

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
  creditManagerList() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "creditManager";
    api_req.api_url = "creditManager/getVoipDataList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "getVoipDataList";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    api_year.vs_config = "vs_sg_new";
    api_req.element_data = api_year;
    // this.spinner.show();
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.getVoipDataListValues=response.data;
        this.filteredVoipData = this.getVoipDataListValues;
       // console.log("this.getVoipDataListValues",   this.getVoipDataListValues)
       
      } else {

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
  voipSwitchAllList() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "creditManager";
    api_req.api_url = "creditManager/getCreditUpdateList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "getCreditUpdateList";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    api_year.action_data = "vs_all";
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
       
        this.spinner.hide();
        this.voipSwitchAllListValue=response.data;
      } else {

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
  addTopupBalanceVoipData() {
    // this.spinner.show();
    Swal.fire('Loading');
    Swal.showLoading();
    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "creditManager";
    api_req.api_url = "creditManager/addTopupBalanceVoipData";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "addTopupBalanceVoipData";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    if(this.SGVOIPSwitchChangeValue==undefined ){
      this.spinner.hide();

      iziToast.error({
        message:"Select SG VOIP Switch New Checkbox",
        position:'topRight'
      });
      return false;

    }else{
      api_year.checkStatus = this.SGVOIPSwitchChangeValue;
    }
 
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

     
      if (response != '') {
        this.spinner.hide();
        this.SGVOIPSwitchChangeValue = false;
        Swal.close();
        iziToast.success({
          message:"Topup added Successfully",
          position:'topRight'
        });
        setTimeout(() => {
     
          this.creditManagerList();
          this.voipSwitchAllList();
        }, 2000)
       
      } else {

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
