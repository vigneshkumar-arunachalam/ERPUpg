import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'
import { ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-pevoip-trend',
  templateUrl: './pevoip-trend.component.html',
  styleUrls: ['./pevoip-trend.component.css']
})
export class PEVoipTrendComponent implements OnInit {

  yearsList:any;
  monthList:any;
  monthContentList: any;
  monthWordList:any;
  billerList: any;
  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.monthYearCall();
 
  //   this.yearsList = [
  //     { id: 2024 },
  //     { id: 2023 },
  //     { id: 2022 },
  //     { id: 2021 },
  //     { id: 2020 },
  //     { id: 2019 }
  // ];
//   this.monthList = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 }
// ];
this.monthWordList = [
  { id: 'January' },
  { id: 'February'},
  { id: 'March' },
  { id: 'April' },
  { id: 'May' },
  { id: 'June' },
  { id: 'July' },
  { id: 'Augest'},
  { id: 'September' },
  { id: 'October' },
  { id: 'November' },
  { id: 'December' }
];
this.monthContentList = [
  { id: 'Newwave - USD' },
  { id: '58 VOIP - SGD' },
  { id: 'PT Jasnita Telekomindo, Tbk - SGD' },
  { id: 'Telnyx - AUD' },
  { id: 'FPT INTERNATIONAL TELECOMMUNICATION ONE MEMBER COM - SGD' },
  { id: 'MyRepublic Ltd - SGD' },
  { id: 'DigitalOcean LLC - SGD' },
  { id: 'StarHub Voip Termination - USD' },
  { id: 'VIVA TELESERVICES PVT LTD - SGD' },
  { id: 'Voxbone - USD' },
  { id: 'MultiTEL LLC - USD' },
  { id: 'DCSG 7000 AMK Pte. Ltd. - SGD' }
];

  }



  monthYearCall() {
    this.spinner.show();
   
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntryVoipTrend";
    api_req.api_url = "purchaseEntryVoipTrend/getYearMonthList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getYearMonthList";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {

        this.spinner.hide();
        this.billerList=response.billerList;
        this.monthList =response.months;
        this.yearsList =response.years;

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
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
