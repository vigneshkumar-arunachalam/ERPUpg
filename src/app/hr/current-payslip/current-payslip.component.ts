import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl, FormGroupName } from '@angular/forms';
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


import { ExcelExportService } from 'src/app/reports/invoicereportsold/excel-export.service';
import { FileDownloadService } from 'src/app/reports/invoicereportsold/file-download.service';

@Component({
  selector: 'app-current-payslip',
  templateUrl: './current-payslip.component.html',
  styleUrls: ['./current-payslip.component.css']
})
export class CurrentPayslipComponent implements OnInit {
  user_ids: any;
  monthList: any;
  yearList: any;
  currentPayslip:FormGroup;
  CurrentMonth: any;
  CurrentYear: any;
  pdfUrl: SafeResourceUrl;
  clickStatus=false;
  constructor(public serverService: ServerService,private fileDownloadService: FileDownloadService,
    private excelExportService: ExcelExportService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
   // this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.user_ids = 9;
    this.currentPayslip = new FormGroup({
      'year': new FormControl(null),
      'month': new FormControl(null),
    });
    this.countryDropDownList();
  }
  yearChange(event:any){
    this.CurrentYear=event.target.value;
   

  }
  monthChange(event:any){
   
    this.CurrentMonth=event.target.value;
  }
  showPDF(){
    this.clickStatus=true;
    const url = `https://laravelapi.erp1.cal4care.com/api/hr/viewSalarySlipDetails?userId=${this.user_ids}&month=${this.CurrentMonth}&year=${this.CurrentYear}`;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  countryDropDownList() {
    this.spinner.show();
        let api_req: any = new Object();
        let api_postUPd: any = new Object();
        api_req.moduleType = "hr";
        api_req.api_url = "hr/getMonthYears";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_postUPd.action = "hr/getMonthYears";
        api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
        
        api_req.element_data = api_postUPd;
    
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
    
            this.spinner.hide();
        
            this.monthList = response.month;
            this.yearList = response.years;
  
          } else {
            iziToast.warning({
              message: "View List Loading Failed. Please try again",
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


}
