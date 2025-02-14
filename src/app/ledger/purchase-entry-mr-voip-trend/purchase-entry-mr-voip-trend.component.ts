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
  selector: 'app-purchase-entry-mr-voip-trend',
  templateUrl: './purchase-entry-mr-voip-trend.component.html',
  styleUrls: ['./purchase-entry-mr-voip-trend.component.css']
})
export class PurchaseEntryMrVoipTrendComponent implements OnInit {

 
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
      purchase_trend_id: [''],
      purchaseEntryTempId: [''],
      invoiceNo: [''],
      invoiceAmount1: [''],
      invoiceAmount2: [''],
      currConvRate: [''],
      fixedAmount1: [''],
      fixedAmount2: [''],
      usageAmount1: [''],
      usageAmount2: [''],
      otherAmount1: [''],
      otherAmount2: [''],
      IDDAmount1: [''],
      IDDAmount2: [''],
      localAmount1: [''],
      localAmount2: [''],

      vendorId: [''],
      billerid: [''],
      year_val: [''],
      ven_id: [''],
      mon_val: [''],
      entry_row: [''],
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
    api_req.moduleType = "purchaseEntryMrVoipTrend";
    api_req.api_url = "purchaseEntryMrVoipTrend/purchase_entry_trendDetails_mrvoip";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "purchase_entry_trendDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    // api_postUPd.month = this.currentMonthDefault;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {

        this.spinner.hide();
        // this.vendorList = response.vendorList;
        // this.VendorData = response.vendorData;
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
  getMonthName(monthVal: number): string {
    const months = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthVal] || '';
  }
  fetchVendorDetails(vendorID:any) {
    this.vendorID_selected=vendorID;
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntryMrVoipTrend";
    api_req.api_url = "purchaseEntryMrVoipTrend/getPurchasetrendDetails_mrvoip";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getPurchasetrendDetails_mrvoip";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    // api_postUPd.month = this.currentMonthDefault;
    api_postUPd.vendor_id = vendorID;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {

        this.spinner.hide();
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
                // mon_val_title: monthName,
          
        
              })
            );
          });
        });
        
        this.addPI_section2.setControl('addresses', formArray);
    
		   

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
  onCurrConvRateChangeFixed(index: number): void {
    const row = this.addressControls.at(index);
    const fixedAmount1 = row.get('fixedAmount1')?.value || 0;
    const currConvRate = row.get('currConvRate')?.value || 1;
    const fixedAmount2 = fixedAmount1 * currConvRate;

    row.get('fixedAmount2')?.setValue(fixedAmount2);
    const fixedAmount2_final = this.addressControls.at(index).get('fixedAmount2');
    console.log("fixedAmount2_final",fixedAmount2_final);
  }
  onCurrConvRateChangeUsage(index: number): void {
    const row = this.addressControls.at(index);
    const usageAmount1 = row.get('usageAmount1')?.value || 0;
    const currConvRate = row.get('currConvRate')?.value || 1;
    const usageAmount2 = usageAmount1 * currConvRate;

    row.get('usageAmount2')?.setValue(usageAmount2);
    // const fixedAmount2_final = this.addressControls.at(index).get('fixedAmount2');
    // console.log("fixedAmount2_final",fixedAmount2_final);
  }
  onCurrConvRateChangeOther(index: number): void {
    const row = this.addressControls.at(index);
    const otherAmount1 = row.get('otherAmount1')?.value || 0;
    const currConvRate = row.get('currConvRate')?.value || 1;
    const otherAmount2 = otherAmount1 * currConvRate;

    row.get('otherAmount2')?.setValue(otherAmount2);
  }
  onCurrConvRateChangeIDD(index: number): void {
    const row = this.addressControls.at(index);
    const IDDAmount1 = row.get('IDDAmount1')?.value || 0;
    const currConvRate = row.get('currConvRate')?.value || 1;
    const IDDAmount2 = IDDAmount1 * currConvRate;

    row.get('IDDAmount2')?.setValue(IDDAmount2);
  }
  onCurrConvRateChangeLocal(index: number): void {
    const row = this.addressControls.at(index);
    const localAmount1 = row.get('localAmount1')?.value || 0;
    const currConvRate = row.get('currConvRate')?.value || 1;
    const localAmount2 = localAmount1 * currConvRate;

    row.get('localAmount2')?.setValue(localAmount2);
  }
  saveRow(index: number): void {
    this.spinner.show();
    const rowForm = this.addressControls.at(index);
    if (rowForm.valid) {
      const formData = rowForm.value;
      console.log('Saving row:', index, formData);
      const purchase_trend_id_index = this.addressControls.at(index).get('purchase_trend_id').value;
    console.log('get-purchase trend id values at each index', purchase_trend_id_index);
      // Perform your save logic here, e.g., make an API call
      let api_req: any = new Object();
          let api_Search_req: any = new Object();
          api_req.moduleType = "purchaseEntryMrVoipTrend";
          api_req.api_url = "purchaseEntryMrVoipTrend/updatePurchaseTrendDetails_mrvoip";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_Search_req.action = "updatePurchaseTrendDetails_mrvoip";
          api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
          api_Search_req.purchase_trend_id = this.addressControls.at(index).get('purchase_trend_id').value;

          

          api_Search_req.invoice_amt = this.addressControls.at(index).get('invoiceAmount1').value;
          api_Search_req.fixed_amt = this.addressControls.at(index).get('fixedAmount1').value;
          api_Search_req.usage_amt = this.addressControls.at(index).get('usageAmount1').value;
          api_Search_req.other_amt = this.addressControls.at(index).get('otherAmount1').value;
          api_Search_req.idd_amt = this.addressControls.at(index).get('IDDAmount1').value;
          api_Search_req.local_amt = this.addressControls.at(index).get('localAmount1').value;
          api_Search_req.fixed_amt_conv = this.addressControls.at(index).get('fixedAmount2').value;
          api_Search_req.usage_amt_conv = this.addressControls.at(index).get('usageAmount2').value;
          api_Search_req.other_amt_conv = this.addressControls.at(index).get('otherAmount2').value;
          api_Search_req.idd_amt_conv = this.addressControls.at(index).get('IDDAmount2').value;
          api_Search_req.local_amt_conv = this.addressControls.at(index).get('localAmount2').value;
          api_Search_req.invoiceNo = this.addressControls.at(index).get('invoiceNo').value;

          api_Search_req.vendorId = this.vendorID_selected;
          api_Search_req.billerid = this.OverallBillerValue;
          api_Search_req.year_val = this.currentYearDefault;
        
          api_Search_req.mon_val = this.currentMonthDefault;
          api_Search_req.entry_row = this.addressControls.at(index).get('entry_row').value;


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
  showAttachment(index: number): void {
    const rowForm = this.addressControls.at(index);
    console.log('Showing attachment for row:', index);
    const purchaseEntryTempId_index = this.addressControls.at(index).get('purchaseEntryTempId').value;
    console.log('get-purchase entry temp id values at each index', purchaseEntryTempId_index);
    // Implement logic to fetch and display the attachment, e.g., open a modal or redirect

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "purchaseEntryMrVoipTrend";
    api_req.api_url = "purchaseEntryMrVoipTrend/getPurchaseAttachments_mrvoip";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "getPurchaseAttachments_mrvoip";
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
