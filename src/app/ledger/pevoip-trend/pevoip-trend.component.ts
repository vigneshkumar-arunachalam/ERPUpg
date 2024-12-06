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
  styleUrls: ['./pevoip-trend.component.css'],


})
export class PEVoipTrendComponent implements OnInit {
 

  yearsList: any;
  monthList: any;
  billerList: any;
  OverallBillerValue: any;
  OverallMonthValue: any;
  OverallYearValue: any;
  currentYearDefault: number;
  currentMonthDefault: number;
  initialLoadForm: FormGroup;
  public addPI_section2: FormGroup;
  public addresses: FormArray;

  public vendorList: any[];
  VendorData: any;
  vendorArray: any;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {

    const currentDate = new Date();
    this.currentYearDefault = currentDate.getFullYear(); // Get the current year
    this.currentMonthDefault = currentDate.getMonth() + 1;

    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
      
    });
  }

  ngOnInit(): void {


    this.OverallBillerValue = 3;
    this.OverallYearValue = '';
    this.OverallMonthValue = '';
    // console.log("this.currentYearDefault", this.currentYearDefault);
    // console.log("this.currentMonthDefault", this.currentMonthDefault);
    this.trendDetails();
    this.initialLoadForm = new FormGroup({
      'yearType': new FormControl(null),
      'monthType': new FormControl(null),
      'billerType': new FormControl(null),
    });
    this.monthYearCall();
  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      invoiceNo: '',
      invoiceAmount1: '',
      invoiceAmount2: '',
      currConvRate: '',
      fixedAmount1: '',
      fixedAmount2: '',
      usageAmount1: '',
      usageAmount2: '',
      otherAmount1: '',
      otherAmount2: '',
      IDDAmount1: '',
      IDDAmount2: '',
      localAmount1: '',
      localAmount2: '',


    });
  }

  billerChange(event: any) {
    this.OverallBillerValue = event.target.value;
   // console.log(" this.OverallBillerValue", this.OverallBillerValue);
    this.trendDetails();

  }

  monthChange(event: any) {
    this.OverallMonthValue = event.target.value;
  //  console.log(" this.OverallMonthValue", this.OverallMonthValue);
    this.currentMonthDefault = this.OverallMonthValue;
    //  this.trendDetails();

  }
  yearChange(event: any) {
    this.OverallYearValue = event.target.value;
  //  console.log(" this.OverallYearValue", this.OverallYearValue);
    this.currentYearDefault = this.OverallYearValue;
    this.trendDetails();

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
        this.billerList = response.billerList;
       // console.log("this.billerList", this.billerList);
        this.monthList = response.months;
       // console.log("this.monthList", this.monthList);
        this.yearsList = response.years;
       // console.log(" this.yearsList", this.yearsList);

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

  trendDetails() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntryVoipTrend";
    api_req.api_url = "purchaseEntryVoipTrend/purchase_entry_trendDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "purchase_entry_trendDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    api_postUPd.month = this.currentMonthDefault;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {

        this.spinner.hide();
        this.vendorList = response.vendorList;
        this.VendorData = response.vendorData;
 
        // this.extractVendorData();
        Array.isArray(this.vendorList);
        Array.isArray(this.VendorData);
        const vendorData = response.vendorList;
        vendorData.forEach((vendor: { data: any[]; }) => {
          vendor.data.forEach((record, index) => {
            // Ensure that there are enough form groups in the FormArray
            if (this.addressControls.length <= index) {
              this.addressControls.push(this.createAddress());
            }
    
            // Patch the form group with values
            this.addressControls.at(index).patchValue({
              invoiceNo: record.invoice_no,
              invoiceAmount1: record.invoice_amount,
              invoiceAmount2: record.invoice_amount_converted,
              currConvRate: record.conversionRate,
              fixedAmount1: record.fixed_amount,
              fixedAmount2: record.fixed_amount_converted,
              usageAmount1: record.usage_amount,
              usageAmount2: record.usage_amount_converted,
              otherAmount1: record.other_amount,
              otherAmount2: record.other_amount_converted,
              IDDAmount1: record.idd_amount,
              IDDAmount2: record.idd_amount_converted,
              localAmount1: record.local_amount,
              localAmount2: record.local_amount_converted,
            });
          });
        });
      
      

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Warning",
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
  getEntriesForMonthAndVendor(data: any[], month: number): any[] {
    return data.filter(entry => entry.month === month);
  }

}
