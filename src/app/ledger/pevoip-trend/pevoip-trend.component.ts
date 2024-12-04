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
interface Trend {
  purchase_trend_id: number;
  vendorName: string;
  entryRow: number;
  month: number;
}
interface VendorDataEntry {
  entryRow: number;
  month: number;
  status: number;
  purchase_trend_id: string | number;
}

interface VendorData {
  [vendorName: string]: {
    [monthIndex: number]: {
      entries: VendorDataEntry[];
    };
  };
}

interface Vendor {
  purchase_trend_id: number;
  month_val: number;
  year_val: number;
  entryRow: number;
  vendorName: string;
  // Add any other properties you need
}

interface VendorList {
  vendorList: Vendor[];
}
interface ResellerData {
  [key: string]: { [key: number]: VendorList };
}
// type VendorData = Record<string, Trend[]>;
@Component({
  selector: 'app-pevoip-trend',
  templateUrl: './pevoip-trend.component.html',
  styleUrls: ['./pevoip-trend.component.css'],


})
export class PEVoipTrendComponent implements OnInit {
  monthContentList: { vendorName: string; monthlyData: (Trend | null)[] }[] = [];

  yearsList: any;
  monthList: any;

  monthWordList: any;
  billerList: any;
  OverallBillerValue: any;
  OverallMonthValue: any;
  OverallYearValue: any;
  currentYearDefault: number;
  currentMonthDefault: number;
  initialLoadForm: FormGroup;
  VendorData: any;
  vendorArray: any;
  VendorKeys: string[];
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
  monthIndices: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  vendors: any;
  // vendorData: any = {};
  vendorData: VendorData = {};
  Object: any;
  reseller_name_list: any;

  resellerData: any = {};
  resellerKeys: string[] = [];
  public addPI_section2: FormGroup;
  public addresses: FormArray;
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
    console.log("this.currentYearDefault", this.currentYearDefault);
    console.log("this.currentMonthDefault", this.currentMonthDefault);
    this.trendDetails();
    this.initialLoadForm = new FormGroup({
      'yearType': new FormControl(null),
      'monthType': new FormControl(null),
      'billerType': new FormControl(null),
    });
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
      { id: 'February' },
      { id: 'March' },
      { id: 'April' },
      { id: 'May' },
      { id: 'June' },
      { id: 'July' },
      { id: 'Augest' },
      { id: 'September' },
      { id: 'October' },
      { id: 'November' },
      { id: 'December' }
    ];


  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    // $('.date-value').val(this.currentDate);
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
      IDDAmount1:'',
      IDDAmount2:'',
      localAmount1:'',
      localAmount2:'',
  
  
    });
  }

  billerChange(event: any) {
    this.OverallBillerValue = event.target.value;
    console.log(" this.OverallBillerValue", this.OverallBillerValue);
    this.trendDetails();

  }

  monthChange(event: any) {
    this.OverallMonthValue = event.target.value;
    console.log(" this.OverallMonthValue", this.OverallMonthValue);
    this.currentMonthDefault = this.OverallMonthValue;
  //  this.trendDetails();

  }
  yearChange(event: any) {
    this.OverallYearValue = event.target.value;
    console.log(" this.OverallYearValue", this.OverallYearValue);
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
        console.log("this.billerList", this.billerList);
        this.monthList = response.months;
        console.log("this.monthList", this.monthList);
        this.yearsList = response.years;
        console.log(" this.yearsList", this.yearsList);

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

        this.reseller_name_list = response.data;
        console.log("check response-1",response.data);
        this.resellerData = response.data; // Replace with your API response
        this.resellerKeys = Object.keys(this.resellerData); // Extract the keys
        console.log("check response-2",this.resellerKeys);
       // this.extractVendorData();
       Array.isArray(response.data);
       console.log("Array.isArray(response.data)",Array.isArray(response.data))



        this.VendorData = response.vendorData;
        this.vendors = this.VendorData;
        this.vendorData = response.vendorData;

        // this.vendors = Object.values(response.vendorData).map((vendorGroup: any) => ({
        //   vendorName: vendorGroup[0]?.vendorName, // Assuming all items in the group have the same name
        //   data: vendorGroup.map((item: any) => ({
        //     month: item.month,
        //     status: item.status,
        //     entryRow: item.entryRow,
        //     purchase_trend_id: item.purchase_trend_id,
        //     vendorName: item.vendorName,

        //   })),
        // }));

        Object.keys(this.VendorData).forEach(vendorKey => {
          const vendorArray = this.VendorData[vendorKey]; // Get the array for each vendor
          this.VendorKeys = Object.keys(this.VendorData);
          // Iterate through the array of objects for each vendor
          // vendorArray.forEach((item: { entryRow: any; month: any; purchase_trend_id: any; status: any; vendorName: any }) => {
          //   console.log("item.entryRow:", item.entryRow);
          //   console.log("item.month:", item.month);
          //   console.log("item.purchase_trend_id:", item.purchase_trend_id);
          //   console.log("item.status:", item.status);
          //   console.log("item.vendorName:", item.vendorName);
          // });
        });

 
     
       // this.populateFormArray(response.data);
        // this.monthContentList = Object.entries(vendorData).map(([vendorName, trends]) => {
        //   const monthlyData = Array(12).fill(null);
        //   trends.forEach((trend) => {
        //     monthlyData[trend.month - 1] = trend;
        //   });
        //   return { vendorName, monthlyData };
        // });

      //   const formArray = new FormArray([]);
                   
      //   formArray.push(this.fb.group({
      //       "invoiceNo": response.data.category_id_1,
      //      "invoiceAmount1": response.data.category_color_1,
      //      "invoiceAmount2": response.data.category_fontsize_1,
      //      "currConvRate": response.data.qty_color_1,
      //      "fixedAmount1": response.data.qty_fontsize_1,
      //       "fixedAmount2": response.data.category_id_2,
      //      "usageAmount1": response.data.category_color_2,
      //      "usageAmount2": response.data.category_fontsize_2,
      //      "otherAmount1": response.data.qty_color_2,
      //      "otherAmount2": response.data.qty_fontsize_2,
      //       "IDDAmount1": response.data.category_id_3,
      //      "IDDAmount2": response.data.category_color_3,
      //      "localAmount1": response.data.category_fontsize_3,
      //      "localAmount2": response.data.qty_color_3,

      //   })

      //   );  

      // this.addPI_section2.setControl('addresses', formArray);
      const data = response.data;
      console.log("datavalue",data);
      console.log("datavaluelegth",data.length);

      // Iterate over keys in the data object
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const records = data[key]; // Array of objects for the current key
      
          // Iterate over the array of records
          for (let i = 0; i < records.length; i++) {
            const record = records[i];
      
            // Patch the corresponding form group in the FormArray
            this.addressControls.at(i).patchValue({
              invoiceNo: record.entryRow,
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
          }
        }
      }
      



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
  extractVendorData(): void {
    for (const key of this.resellerKeys) {
      const resellerEntries = this.resellerData[key]; // Access data for "Newwave-USD", "58VOIP-SGD", etc.

      // Iterate over numbered entries (e.g., 1, 2, 3)
      for (const entryKey in resellerEntries) {
        if (resellerEntries.hasOwnProperty(entryKey)) {
          const entry = resellerEntries[entryKey]; // Access each entry object

          if (entry && entry.vendorList) {
            entry.vendorList.forEach((vendor: any) => {
              console.log(`Vendor Data from ${key}, Entry ${entryKey}:`);
              console.log('  Entry Row:', vendor.entryRow);
              console.log('  Fixed Amount:', vendor.fixed_amount);
              console.log('  Invoice No:', vendor.invoice_no);
              console.log('  Vendor Name:', vendor.vendorName);
              console.log('  Year:', vendor.year_val);


            
            });
            
          }
        }
      }
    }
  }
  populateFormArray(data: any): void {
    console.log("comingggggg")
    
    // Iterate through keys (e.g., "Newwave-USD", "58VOIP-SGD")
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const resellerEntries = data[key]; // Access data for each reseller

        // Iterate through each entry (e.g., 1, 2)
        for (const entryKey in resellerEntries) {
          if (resellerEntries[entryKey]?.vendorList) {
            // Iterate through vendorList array
            resellerEntries[entryKey].vendorList.forEach((vendor: any) => {
              // Push a new FormGroup to the FormArray
              const formArray = new FormArray([]);
              this.addresses.push(
                this.fb.group({
                  invoiceNo: vendor.invoice_no,
                  fixedAmount: vendor.fixed_amount,
                  entryRow: vendor.entryRow,
                  vendorName: vendor.vendorName,
                })
              );
            });
          }
        }
      }
      console.log('FormArray:', this.addresses.value);
  }
}
  getEntryRowForMonth(data: any[], monthIndex: number): number | null {
    const monthData = data.find((item) => item.month === monthIndex);
    return monthData ? monthData.entryRow : null;
  }
  getStatusSymbol(entryRow: number): string {
    if (entryRow == 1) return '*';
    if (entryRow == 2) return '#';
    if (entryRow == 3) return '-';
    return '';
  }
  getStatusForMonth(data: any[], monthIndex: number): number | null {
    const monthData = data.find((item) => item.month === monthIndex);
    return monthData ? monthData.status : null;
  }
  getColor(status: number): string {
    switch (status) {
      case 1: return 'green';
      case 2: return 'yellow';
      case 3: return 'red';
      default: return 'gray';
    }
  }
  getStatusColor(status: number): string {
    if (status === 1) return 'green';
    if (status === 2) return 'yellow';
    if (status === 3) return 'red';
    return 'gray';
  }


}
