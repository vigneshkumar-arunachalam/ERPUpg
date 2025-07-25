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

// charts

import { ViewChild } from '@angular/core';

// column

import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};


@Component({
  selector: 'app-purchase-entry-call4tel-trend',
  templateUrl: './purchase-entry-call4tel-trend.component.html',
  styleUrls: ['./purchase-entry-call4tel-trend.component.css']
})
export class PurchaseEntryCall4telTrendComponent implements OnInit {
 @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
 
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
  vendorListNull: boolean=false;

  table_data: any;
  sub_totals: any;
  pei_chart_data: any;
  month_pei_chart_data: any;
  chartOptionsArray: any;
  chartOptionsArrayMonth: any;
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
 

  
  // //////////////////////////////       Chart Start   ////////////////////////////////////////////////////////////////////////

  async purchaseEntryVoipTrend() {
    this.spinner.show();
    let user_id = localStorage.getItem('erp_c4c_user_id');
    let biller_id = this.initialLoadForm.value.billerType;
    let yearType = this.initialLoadForm.value.yearType;

    let api_req = `{
      "moduleType": "purchaseEntrycall4telTrend",
      "api_url": "purchaseEntrycall4telTrend/getVendormonthWiseChart_call4tel",
      "api_type": "web",
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI",
      "element_data": {
        "action": "getVendormonthWiseChart_call4tel",
        "user_id": "${user_id}",
        "biller_id": "${biller_id}",
        "year": "${yearType}"
      }
    }`;

    try {
      // Await API response
      let response: any = await this.serverService
        .sendServerpath(api_req)
        .toPromise();

      if (response.status === true) {
        this.table_data = response.table_data;
        this.sub_totals = response.sub_totals;
        this.pei_chart_data = response.pei_chart_data;
        this.month_pei_chart_data = response.month_pei_chart_data;

        // Process bar chart
        await this.processBarChart(this.table_data);

        // Process Pie Charts for Vendors
        await this.processPieCharts(this.pei_chart_data);

        // Process Pie Charts for Monthly Data
        await this.processPieChartsMonth(this.month_pei_chart_data);

        // Stop the spinner
        this.spinner.hide();

        // Open the modal popup
        setTimeout(() => {
          $('#graph_popup').modal('show');
        }, 500);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.spinner.hide();
    }
  }

  // Function to Process Bar Chart
  async processBarChart(tableData: any) {
    return new Promise((resolve) => {
      this.chartOptions = {
        series: [
          {
            name: 'Purchase Fix',
            data: tableData.map(
              (item: { purchase_fixed_amt_conv: any }) =>
                item.purchase_fixed_amt_conv
            ),
          },
          {
            name: 'Sale Fix',
            data: tableData.map(
              (item: { sales_fixed_amt_conv: any }) => item.sales_fixed_amt_conv
            ),
          },
          {
            name: 'Purchase Usage',
            data: tableData.map(
              (item: { purchase_usage_amt_conv: any }) =>
                item.purchase_usage_amt_conv
            ),
          },
          {
            name: 'Sale Usage',
            data: tableData.map(
              (item: { sales_usage_amt_conv: any }) => item.sales_usage_amt_conv
            ),
          },
        ],
        chart: { type: 'bar', height: 350 },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
          categories: tableData.map((item: { month: any }) => item.month),
        },
        yaxis: { title: { text: 'Purchase Entry' } },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: (val: any) => val } },
      };
      resolve(true);
    });
  }

  // Function to Process Vendor Pie Charts
  async processPieCharts(vendorData: any) {
    return new Promise((resolve) => {
      this.chartOptionsArray = vendorData.map(
        (vendor: { chartData: any[]; vendorName: any }) => {
          const series: number[] = vendor.chartData.map(
            ([_, amount]: [string, number]) => amount
          );
          const labels: string[] = vendor.chartData.map(
            ([category, _]: [string, number]) => category
          );
          return {
            series: series.length > 0 ? series : [],
            chart: {
              type: 'pie',
              height: 300,
              width: 300,
              toolbar: { show: false },
            },
            labels: labels,
            dataLabels: { enabled: false },
            tooltip: {
              enabled: true,
              y: {
                formatter: (val: number, opts: any) =>
                  `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(
                    1
                  )}%`,
              },
            },
            legend: { show: false },
            title: {
              text: vendor.vendorName,
              align: 'center',
              floating: false,
              style: {
                fontSize: '10px',
                fontWeight: 'bold',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
              },
              offsetY: 10,
              margin: 70,
            },
            noData: {
              text: 'No Data Found',
              align: 'center',
              verticalAlign: 'middle',
              style: { color: '#808080', fontSize: '16px', fontWeight: 'bold' },
            },
            responsive: [
              {
                breakpoint: 768,
                options: { chart: { height: 250, width: 250 } },
              },
            ],
          };
        }
      );
      resolve(true);
    });
  }

  // Function to Process Monthly Pie Charts

  async processPieChartsMonth(monthData: any) {
    return new Promise((resolve) => {
      this.chartOptionsArrayMonth = monthData.map(
        (vendor: { chartData: any[]; month: any }) => {
          const series: number[] = vendor.chartData.map(
            ([_, amount]: [string, number]) => amount
          );
          const labels: string[] = vendor.chartData.map(
            ([category, _]: [string, number]) => category
          );

          return {
            series: series.length > 0 ? series : [],
            chart: {
              type: 'pie',
              height: 300,
              width: 300,
              toolbar: { show: false },
            },
            labels: labels,
            dataLabels: { enabled: false },
            tooltip: {
              enabled: true,
              y: {
                formatter: (val: number, opts: any) =>
                  `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(
                    1
                  )}%`,
              },
            },
            legend: { show: false },
            title: {
              text: vendor.month,
              align: 'center',
              floating: false,
              style: {
                fontSize: '10px',
                fontWeight: 'bold',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
              },
              offsetY: 10,
              margin: 70,
            },
            noData: {
              text: 'No Data Found',
              align: 'center',
              verticalAlign: 'middle',
              style: { color: '#808080', fontSize: '16px', fontWeight: 'bold' },
            },
            responsive: [
              {
                breakpoint: 768,
                options: { chart: { height: 250, width: 250 } },
              },
            ],
          };
        }
      );
      resolve(true);
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
         status: [''],
      backgroundColor: [''],
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
    api_req.moduleType = "purchaseEntrycall4telTrend";
    api_req.api_url = "purchaseEntrycall4telTrend/purchase_entry_trendDetails_call4tel";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "purchase_entry_trendDetails_call4tel";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.biller_id = this.OverallBillerValue;
    api_postUPd.year = this.currentYearDefault;
    // api_postUPd.month = this.currentMonthDefault;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
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
   getMonthName(monthVal: number): string {
    const months = [
      '',
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
    return months[monthVal] || '';
  }
  fetchVendorDetails(vendorID:any) {
    this.vendorID_selected=vendorID;
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "purchaseEntrycall4telTrend";
    api_req.api_url = "purchaseEntrycall4telTrend/getPurchasetrendDetails_call4tel";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getPurchasetrendDetails_call4tel";

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
  

        // for (let index = 0; index < response.vendorTrendDetails.length; index++) {
      

        //   formArray.push(this.fb.group({
        //     "invoiceNo": response.vendorTrendDetails[index].invoice_no,
        //     "invoiceAmount1": response.vendorTrendDetails[index].invoice_amount,
        //     "invoiceAmount2": response.vendorTrendDetails[index].invoice_amount_converted,
        //     "currConvRate": response.vendorTrendDetails[index].conversionRate,
        //     "fixedAmount1": response.vendorTrendDetails[index].fixed_amount,
        //     "fixedAmount2": response.vendorTrendDetails[index].fixed_amount_converted,
        //     "usageAmount1": response.vendorTrendDetails[index].usage_amount,
        //     "usageAmount2": response.vendorTrendDetails[index].usage_amount_converted,
        //     "otherAmount1": response.vendorTrendDetails[index].other_amount,
        //     "otherAmount2": response.vendorTrendDetails[index].other_amount_converted,
        //     "IDDAmount1": response.vendorTrendDetails[index].idd_amount,
        //     "IDDAmount2": response.vendorTrendDetails[index].idd_amount_converted,
        //     "localAmount1": response.vendorTrendDetails[index].local_amount,
        //     "localAmount2": response.vendorTrendDetails[index].local_amount_converted,
        //     "purchase_trend_id": response.vendorTrendDetails[index].purchase_trend_id,
        //     "purchaseEntryTempId": response.vendorTrendDetails[index].purchaseEntryTempId,

        //     "vendorId": response.vendorTrendDetails[index].vendorId,
        //     "billerid": response.vendorTrendDetails[index].billerid,
        //     "year_val": response.vendorTrendDetails[index].year_val,
        //     "ven_id": response.vendorTrendDetails[index].ven_id,
        //     "mon_val": response.vendorTrendDetails[index].mon_val,
        //     "entry_row": response.vendorTrendDetails[index].entryRow,
        //   })
        //   );
        // }
              Object.keys(response.vendorTrendDetails.months).forEach((month) => {
          response.vendorTrendDetails.months[month].forEach((record: any) => {
            formArray.push(
              this.fb.group({
                status: [record.status], // Store the approval status
                backgroundColor: [this.getBackgroundColor(record.status)],

                invoiceNo: record.invoice_no,
                invoiceAmount1: record.invoice_amount_without_tax,
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
                purchase_trend_id: record.purchase_trend_id,
                purchaseEntryTempId: record.purchaseEntryTempId,

                vendorId: record.vendorId,
                billerid: record.billerid,
                year_val: record.year_val,
                ven_id: record.ven_id,

                entry_row: record.entryRow,
                mon_val: record.month_val,
                mon_val_title: record.month_val,
              })
            );
          });
        });
        
        this.addPI_section2.setControl('addresses', formArray);
        // console.log("this.editMulInvGroupForm", this.editMulInvGroupForm);
       
       

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
          api_req.moduleType = "purchaseEntrycall4telTrend";
          api_req.api_url = "purchaseEntrycall4telTrend/updatePurchaseTrendDetails_call4tel";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_Search_req.action = "updatePurchaseTrendDetails_call4tel";
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
    api_req.moduleType = "purchaseEntrycall4telTrend";
    api_req.api_url = "purchaseEntrycall4telTrend/getPurchaseAttachments_call4tel";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "getPurchaseAttachments_call4tel";
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
  getBackgroundColor(status: any): any {
    //  console.log("status",status);
    //  console.log("typeof-status",typeof(status));
    switch (status) {
      case 1:
        return '#84FD88'; // Green
      case 2:
        return '#FFFF5C'; // Yellow
      case 3:
        return '#FFFFFF'; // Red
      default:
        return '#FFFFFF'; //
    }
  }
    
  

}
