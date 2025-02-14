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
  selector: 'app-purchase-entry-yearly',
  templateUrl: './purchase-entry-yearly.component.html',
  styleUrls: ['./purchase-entry-yearly.component.css'],
  
})
export class PurchaseEntryYearlyComponent implements OnInit {

 
  isReadOnly: boolean = true;
  
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
  vendorListNull: boolean=false;
  
  vendorList: any[] = [];
  VendorData: any;
  vendorArray: any;
  attachments: any[] = [];
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
  vendorID_selected: any;
  purchaseTypeNames: any;
  taxProviderNames: any;
  vendorlistall: any;
  currencyList: any;
  monthNameVal: string;
  fetchStatus: boolean=false;;
  
 

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
    this.initialLoadForm.patchValue({
      'yearType': this.currentYearDefault,
      'monthType': this.currentMonthDefault,
      'billerType':  this.OverallBillerValue,
 

    });
    
  }
  onMouseMove(event: MouseEvent): void {
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        console.log('Mouse moved:', event.clientX, event.clientY);
      });
    });
  }

  
  
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress() {
    this.addressControls.push(this.createAddress());
  }
  removeAddress(i: number) {
   // this.addressControls.removeAt(i);
  }
 
 
  createAddress(): FormGroup {
    return this.fb.group({
      color_val:[''],
      purchaseEntryType: [''],
      invoiceNumber: [''],
      invoiceDate: [''],
      purchaseContent:[''],
      PONumber: [''],
      currency: [''],
      curConvRate: [''],
      taxAmount: [''],
      taxProvider: [''],
      frieghtAmount: [''],
      frieghtProvider: [''],
      invoiceAmount: [''],

      purchaseEntryTempId: [''],
      vendorId: [''],
      billerid: [''],
      year_val: [''],
      ven_id: [''],
      mon_val: [''],
      entry_row: [''],
      mon_val_title: [''],

  
      
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
    api_req.moduleType = "purchaseEntryYearly";
    api_req.api_url = "purchaseEntryYearly/purchase_entry_trendDetails_yearly";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "purchase_entry_trendDetails_yearly";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    // api_postUPd.month = this.currentMonthDefault;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      if (response) {

        this.spinner.hide();
     

        if(response.vendorList!=null){
          this.vendorList = response.vendorList;
          this.VendorData = response.vendorData;
          this.vendorListNull=false;
        }else{
          this.vendorListNull=true;
        }
       
 
        // this.extractVendorData();
        Array.isArray(this.vendorList);
        Array.isArray(this.VendorData);
       
        this.VendorData = response.vendorData;  
        

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

  sendToApproval() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntryYearly";
    api_req.api_url = "purchaseEntryYearly/sendToApproval";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "sendToApproval";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.purTempId = this.OverallBillerValue;
    api_postUPd.invoiceNo = this.currentYearDefault;
    api_postUPd.invoiceDate = this.OverallBillerValue;
    api_postUPd.pur_type = this.currentYearDefault;
    api_req.poNo = this.currentYearDefault;
    api_postUPd.content_purchase = this.OverallBillerValue;
    api_postUPd.currency = this.currentYearDefault;
    api_postUPd.conversionRate = this.OverallBillerValue;
    api_postUPd.taxAmount = this.currentYearDefault;

    api_postUPd.tax_provider = this.OverallBillerValue;
    api_postUPd.freight_amt = this.currentYearDefault;
    api_postUPd.freight_provider = this.OverallBillerValue;
    api_postUPd.invoiceAmount = this.currentYearDefault;
    api_postUPd.billerId = this.currentYearDefault;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      if (response) {

        this.spinner.hide();
     

        if(response.vendorList!=null){
          this.vendorList = response.vendorList;
          this.VendorData = response.vendorData;
          this.vendorListNull=false;
        }else{
          this.vendorListNull=true;
        }
       
 
        // this.extractVendorData();
        Array.isArray(this.vendorList);
        Array.isArray(this.VendorData);
       
        this.VendorData = response.vendorData;  
        

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
  getBackgroundColor(status: any): any {
    console.log("status",status);
    console.log("typeof-status",typeof(status));
    switch (status) {
      case 1: return '#008000';  // Green
      case 2: return '#FF0000';  // Yellow   
      case 3: return '#ff007f';  // Red
      default: return '#FF0000'; // 
    }
  }
  
  getMonthName(monthVal: number): string {
    console.log("monthVal",monthVal);
    const months = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthVal] || '';
  }

  fetchVendorDetails(vendorID:any) {
    this.spinner.show();
    this.fetchStatus=true;
    // return false;
    this.vendorID_selected=vendorID;
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntryYearly";
    api_req.api_url = "purchaseEntryYearly/getPurchasetrendDetails_yearly";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getPurchasetrendDetails_yearly";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    // api_postUPd.month = this.currentMonthDefault;
    api_postUPd.vendor_id = vendorID;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      if (response.status==true) {

        this.spinner.hide();
        this.purchaseTypeNames=response.purchaseTypeNames;
        this.taxProviderNames=response.taxProviderNames;
        this.currencyList=response.currencyList;
        this.vendorlistall=response.vendors;
        const vendorData = response.vendorTrendDetails;
  
        const formArray = new FormArray([]);

        // Loop through each month
        Object.keys(response.vendorTrendDetails.months).forEach((month) => {
          response.vendorTrendDetails.months[month].forEach((record: any) => {
            formArray.push(
              this.fb.group({

                purchaseEntryType: record.purchase_type_id || '',
                invoiceNumber: record.invoiceNo || '',
                invoiceDate: record.invoiceDate_show || '',
                purchaseContent: record.content_purchase || '',
                PONumber: record.poNo || '',
                currency: record.currency_id || '',
                curConvRate: record.conversionRate || '',
                taxAmount: record.taxAmount || '',
                taxProvider: record.tax_provider || '',
                frieghtAmount: record.freight_amt || '',
                frieghtProvider: record.freight_provider || '',
                invoiceAmount: record.invoiceAmount || '',
          
                purchaseEntryTempId: record.purchaseEntryTempId || '',
                vendorId: record.vendor_id || '',
                year_val: record.year || '',
                ven_id: record.vendor_id || '',

                entry_row: record.entryRow || '',
                billerid: this.OverallBillerValue,
                mon_val: record.month || '',
                color_val:record.approval_status
     
                // mon_val_title: monthName,

             
          
        
              })
            );
          });
        });
        
        this.addPI_section2.setControl('addresses', formArray);
        console.log('FormArray Data:', this.addressControls.value);
    


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
  increaseValue(index: number, controlName: string): void {
    const control = this.addressControls.at(index).get(controlName);
    if (control) {
      const currentValue = control.value || 0;
      control.setValue(currentValue + 1);
    }
  }
  
  decreaseValue(index: number, controlName: string): void {
    const control = this.addressControls.at(index).get(controlName);
    if (control) {
      const currentValue = control.value || 0;
      if (currentValue > 0) {
        control.setValue(currentValue - 1);
      }
    }
  }
  saveRow(index: number): void {

    Swal.fire({
      title: 'Are you sure to Save?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        const rowForm = this.addressControls.at(index);
        if (rowForm.valid) {
          const formData = rowForm.value;
        
          const purchaseEntryTempId_index = this.addressControls.at(index).get('purchaseEntryTempId').value;
       
          // Perform your save logic here, e.g., make an API call
          let api_req: any = new Object();
              let api_Search_req: any = new Object();
              api_req.moduleType = "purchaseEntryYearly";
              api_req.api_url = "purchaseEntryYearly/updatePurchaseTrendDetails_yearly";
              api_req.api_type = "web";
              api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
              api_Search_req.action = "updatePurchaseTrendDetails_yearly";
              api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
              api_Search_req.purchaseEntryTempId = this.addressControls.at(index).get('purchaseEntryTempId').value;
    
              api_Search_req.purTempId =this.addressControls.at(index).get('purchaseEntryTempId').value; 
              api_Search_req.invoiceNo = this.addressControls.at(index).get('invoiceNumber').value;
              api_Search_req.invoiceDate = this.addressControls.at(index).get('invoiceDate').value;
              api_Search_req.pur_type = this.addressControls.at(index).get('purchaseEntryType').value;
              api_Search_req.content_purchase = this.addressControls.at(index).get('purchaseContent').value;
              api_Search_req.poNo = this.addressControls.at(index).get('PONumber').value;
              api_Search_req.currency = this.addressControls.at(index).get('currency').value;
              api_Search_req.conversionRate = this.addressControls.at(index).get('curConvRate').value;
              api_Search_req.taxAmount = this.addressControls.at(index).get('taxAmount').value;
              api_Search_req.tax_provider = this.addressControls.at(index).get('taxProvider').value;
              api_Search_req.freight_amt = this.addressControls.at(index).get('frieghtAmount').value;
              api_Search_req.freight_provider = this.addressControls.at(index).get('frieghtProvider').value;
              
              api_Search_req.invoiceAmount = this.addressControls.at(index).get('invoiceAmount').value;


              api_Search_req.year_val = this.addressControls.at(index).get('year_val').value;
              api_Search_req.mon_val = this.addressControls.at(index).get('mon_val').value;
              api_Search_req.vendorId= this.addressControls.at(index).get('ven_id').value;
              api_Search_req.row_val = this.addressControls.at(index).get('entry_row').value;
              
              api_Search_req.billerid = this.OverallBillerValue;
              api_Search_req.sel_years = this.OverallYearValue;
            
    
              api_req.element_data = api_Search_req;
              this.serverService.sendServer(api_req).subscribe((response: any) => {
           
                if (response) {
                  this.spinner.hide();
                  iziToast.success({
                    message: "Updated Successfully",
                    position: 'topRight'
                  });
                 
    
                }
              });
        } else {
          console.log('Form is invalid for row:', index);
        }
      }
    })


  }
  sendtoApproval(index: number): void {

    Swal.fire({
      title: 'Are you sure to Send to Approval?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        const rowForm = this.addressControls.at(index);
        if (rowForm.valid) {
          const formData = rowForm.value;
        
          const purchaseEntryTempId_index = this.addressControls.at(index).get('purchaseEntryTempId').value;
       
          // Perform your save logic here, e.g., make an API call
          let api_req: any = new Object();
              let api_Search_req: any = new Object();
              api_req.moduleType = "purchaseEntryYearly";
              api_req.api_url = "purchaseEntryYearly/sendToApproval";
              api_req.api_type = "web";
              api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
              api_Search_req.action = "sendToApproval";
              api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');

    
              api_Search_req.purTempId =this.addressControls.at(index).get('purchaseEntryTempId').value; 
              api_Search_req.invoiceNo = this.addressControls.at(index).get('invoiceNumber').value;
              api_Search_req.invoiceDate = this.addressControls.at(index).get('invoiceDate').value;
              api_Search_req.pur_type = this.addressControls.at(index).get('purchaseEntryType').value;
              api_Search_req.content_purchase = this.addressControls.at(index).get('purchaseContent').value;
              api_Search_req.poNo = this.addressControls.at(index).get('PONumber').value;
              api_Search_req.currency = this.addressControls.at(index).get('currency').value;
              api_Search_req.conversionRate = this.addressControls.at(index).get('curConvRate').value;
              api_Search_req.taxAmount = this.addressControls.at(index).get('taxAmount').value;
              api_Search_req.tax_provider = this.addressControls.at(index).get('taxProvider').value;
              api_Search_req.freight_amt = this.addressControls.at(index).get('frieghtAmount').value;
              api_Search_req.freight_provider = this.addressControls.at(index).get('frieghtProvider').value;
              
              api_Search_req.invoiceAmount = this.addressControls.at(index).get('invoiceAmount').value;


              // api_Search_req.year_val = this.addressControls.at(index).get('year_val').value;
              // api_Search_req.mon_val = this.addressControls.at(index).get('mon_val').value;
              // api_Search_req.vendorId= this.addressControls.at(index).get('ven_id').value;
              // api_Search_req.row_val = this.addressControls.at(index).get('entry_row').value;
              
              api_Search_req.billerid = this.OverallBillerValue;
              // api_Search_req.sel_years = this.OverallYearValue;
            
    
              api_req.element_data = api_Search_req;
              this.serverService.sendServer(api_req).subscribe((response: any) => {
           
                if (response) {
                  this.spinner.hide();
                  iziToast.success({
                    message: "Send to Approval Successfully",
                    position: 'topRight'
                  });
                 
    
                }
              });
        } else {
          console.log('Form is invalid for row:', index);
        }
      }
    })


  }

  showAttachment(index: number): void {
    const rowForm = this.addressControls.at(index);
    console.log('Showing attachment for row:', index);
    const purchaseEntryTempId_index = this.addressControls.at(index).get('purchaseEntryTempId').value;
    console.log('get-purchase entry temp id values at each index', purchaseEntryTempId_index);
    // Implement logic to fetch and display the attachment, e.g., open a modal or redirect

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "purchaseEntryYearly";
    api_req.api_url = "purchase_entry_trendDetails_yearly/getPurchaseAttachments_yearly";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "purchaseEntryYearly";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.purchaseEntryTempId = purchaseEntryTempId_index;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
    //  console.log("vignesh-customer_status response", response);

     
     // console.log("vignesh-advanced search result", this.searchResult);
     this.attachments = response.attachments;
     if (this.attachments[0].status==true) {
     
      console.log("response.attachments.length", response.attachments?.length);
      $('#showPDFFormId').modal('show');
      // Check if the array is valid and contains non-null objects
      // const validAttachment = this.attachments?.find((attachment) => attachment && attachment.file_url);
    
      // if (validAttachment) {
      //   console.log("The attachments array contains a valid file_url:", validAttachment.file_url);
        
      // } else {
      //   console.log("The attachments array contains null or invalid values.");
      //   iziToast.warning({
      //     message: "No Record",
      //     position: 'topRight',
      //   });
      // }
    }else{
      iziToast.warning({
        message: "No Record",
        position: 'topRight',
      });

    }
    
    });
  }
    
  

}
