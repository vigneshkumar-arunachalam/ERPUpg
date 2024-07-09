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
  data: { id: number; companyCurrency: string; login: string; currentBalance: number; minBalance: number; maxBalance: number; accountType: string; action: string; }[];
  tableData: { serverName: string; noOfRecord: number; user: string; updatedOn: string; }[];
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
    this.creditManagerList();
    this.data = [
      { id: 1955, companyCurrency: 'SGD', login: 'sip656589', currentBalance: 0.00, minBalance: 850.55, maxBalance: 500.60, accountType: 'Retail', action: 'Deactivate' }
      ,  { id: 1969, companyCurrency: 'SGD', login: 'sip87342', currentBalance: 2.00, minBalance: 17.72, maxBalance: 70.20, accountType: 'PBX', action: 'Activate' }
      // Add more data objects as needed
    ];
    this.tableData = [
      { serverName: 'KL Voip Switch', noOfRecord: 68, user: 'vk', updatedOn: '05-07-2024 00:30:44' },
      { serverName: 'Sg Voip Switch 2 - 7_50', noOfRecord: 57, user: 'vk', updatedOn: '05-07-2024 00:30:38' },
      { serverName: 'Sg Voip Switch 1 - 7_141', noOfRecord: 0, user: 'vk', updatedOn: '05-07-2024 00:30:31' },
      { serverName: 'Sg Voip Switch 1 - 7_141', noOfRecord: 0, user: 'vk', updatedOn: '04-07-2024 01:53:41' },
      { serverName: 'Sg Voip Switch 1 - 7_141', noOfRecord: 0, user: 'vk', updatedOn: '03-07-2024 23:35:33' },
      { serverName: 'KL Voip Switch', noOfRecord: 65, user: 'vk', updatedOn: '03-07-2024 23:35:25' },
      { serverName: 'Sg Voip Switch 2 - 7_50', noOfRecord: 55, user: 'vk', updatedOn: '03-07-2024 23:35:13' },
      { serverName: 'Sg Voip Switch 1 - 7_141', noOfRecord: 0, user: 'vk', updatedOn: '03-07-2024 23:35:01' },
      { serverName: 'KL Voip Switch', noOfRecord: 61, user: 'vk', updatedOn: '02-07-2024 23:35:04' },
      { serverName: 'Sg Voip Switch 2 - 7_50', noOfRecord: 54, user: 'vk', updatedOn: '02-07-2024 23:34:58' }
    ];


  }  
  getResellerPaymentdetails(i:any,b:any){

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

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.reseller_name_list=response.data;
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
