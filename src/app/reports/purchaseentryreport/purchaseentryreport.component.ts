import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ExcelExportService } from './excel-export.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-purchaseentryreport',
  templateUrl: './purchaseentryreport.component.html',
  styleUrls: ['./purchaseentryreport.component.css']
})
export class PurchaseentryreportComponent implements OnInit {
  isReadOnly:boolean=false;
  purchaseEntryReport:FormGroup;
  getPurchaseEntryReportList:any;
  invoice_noList:any;
  billerList:any;
  vendorsList: any;
  purchaseTypeList: any;
  fromDate: string;
  toDate: string;
  noTaxValue: any;
  PurchaseEntryPrintList: any;
  go:boolean=false;
  printPreview:boolean=true;
  getPurchaseEntryReportTotal: any;
  getPurchaseEntryPrintTotal: any;
  ExcelReportList: any;
  ExcelReportList1: any;
  params_all: any;
  Fromdt: any;
  Todt: any;
  billerId: any;
  invoiceType: any;
  performaType: any;
  redirect_status: any;
 
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector,private route: ActivatedRoute, 
    private http: HttpClient,private excelExportService: ExcelExportService) { }

  ngOnInit(): void {
    this.purchaseEntryReport=new FormGroup({
      'IR_From': new FormControl(),
      'IR_To': new FormControl(),
      'IR_BillerName': new FormControl(null),
      'IR_vendorName': new FormControl(null),
      'IR_purchaseType': new FormControl(null),
   

      'IR_InvoiceNumber': new FormControl(null),
      'IR_InvoiceType': new FormControl(null),
      'IR_Tax': new FormControl(null),
    });
    this.getPurchaseSearchData();
    this.route.queryParams
    .subscribe(params => {

      this.Fromdt = params['Fromdt'];
      this.Todt = params['Todt'];
      this.billerId = params['billerId'];
      this.invoiceType = params['invoiceType'];
      this.performaType = params['performaType'];
      this.redirect_status =params['redirect_status'];
      console.log("this.Fromdt inside onInit", this.Fromdt);
      console.log("this.Todt inside onInit", this.Todt);
      console.log("this.billerId inside onInit", this.billerId);
      console.log("this.invoiceType inside onInit", this.invoiceType);
      console.log("this.performaType inside onInit", this.performaType);
      console.log("this.redirect_status inside onInit", this.redirect_status);
    //  this.getInvoiceReport();
    }
    );
    this.getPurchaseEntryReport();
    setTimeout(() => {
      this.function1();
    }, 6000);
    
  }
  NoTax(event:any){
    this.noTaxValue=event.target.checked;

  }
  getCustomer(event:any){}
  getPurchaseEntryReport() {
    this.spinner.show();
    this.printPreview=false;
    this.go=true;

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getPurchaseReports"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getPurchaseReports";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");


    if (this.redirect_status==0 || this.redirect_status=='0') {

      api_mulInvpay.billerId = this.billerId;

    } else {
      api_mulInvpay.billerId = this.purchaseEntryReport.value.IR_BillerName;
    }

    api_mulInvpay.vendorId =this.purchaseEntryReport.value.IR_vendorName;

    api_mulInvpay.invoiceNo =this.purchaseEntryReport.value.IR_InvoiceNumber;
    api_mulInvpay.purchase_type_id =this.purchaseEntryReport.value.IR_purchaseType;
 
   
    if (this.redirect_status==0 || this.redirect_status=='0') {

      api_mulInvpay.fromdt =this.Fromdt;

    } else {
      api_mulInvpay.fromdt =this.purchaseEntryReport.value.IR_From;
    }

    if (this.redirect_status==0 || this.redirect_status=='0') {

      api_mulInvpay.todt =this.Todt;

    } else {
      api_mulInvpay.todt =this.purchaseEntryReport.value.IR_To;
    }


 
    api_mulInvpay.no_tax =this.noTaxValue;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.getPurchaseEntryReportList=response.reports.reportsData;
        this.getPurchaseEntryReportTotal=response.reports.totals;
       
    

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  getPurchaseEntryReportPrint() {
    this.spinner.show();
    this.printPreview=true;
    this.go=false;
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "reports";
    api_req.api_url = "PurchaseReportsPrint"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "PurchaseReportsPrint";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.purchaseEntryReport.value.IR_BillerName;
    api_mulInvpay.vendorId =this.purchaseEntryReport.value.IR_vendorName;

    api_mulInvpay.invoiceNo =this.purchaseEntryReport.value.IR_InvoiceNumber;
    api_mulInvpay.purchase_type_id =this.purchaseEntryReport.value.IR_purchaseType;
 
    api_mulInvpay.fromdt =this.purchaseEntryReport.value.IR_From;
    api_mulInvpay.todt =this.purchaseEntryReport.value.IR_To;
 
    api_mulInvpay.no_tax =this.noTaxValue;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.PurchaseEntryPrintList=response.reports.reportsData;
        this.getPurchaseEntryPrintTotal=response.reports.totals;
       
    

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  function1() {
 
    if (this.redirect_status == 0 || this.redirect_status == '0') {
    
        this.purchaseEntryReport.patchValue({
        'IR_From': this.Fromdt,
        'IR_To': this.Todt,
        'IR_BillerName': this.billerId,
        'IR_InvoiceType': this.invoiceType,
        'IR_InvoiceTypePerformaSales': this.performaType,
      });
    }
  }
  ExportReport() {
    this.spinner.show();
    this.printPreview=true;
    this.go=false;
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "reports";
    api_req.api_url = "PurchaseReportsExcel"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "PurchaseReportsExcel";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.purchaseEntryReport.value.IR_BillerName;
    api_mulInvpay.vendorId =this.purchaseEntryReport.value.IR_vendorName;

    api_mulInvpay.invoiceNo =this.purchaseEntryReport.value.IR_InvoiceNumber;
    api_mulInvpay.purchase_type_id =this.purchaseEntryReport.value.IR_purchaseType;
 
    api_mulInvpay.fromdt =this.purchaseEntryReport.value.IR_From;
    api_mulInvpay.todt =this.purchaseEntryReport.value.IR_To;
 
    api_mulInvpay.no_tax =this.noTaxValue;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.PurchaseEntryPrintList=response.reports.reportsData;
        this.getPurchaseEntryPrintTotal=response.reports.totals;
       
        this.ExcelReportList1=response.reports;
        console.log("this.ExcelReportList1",this.ExcelReportList1)
        this.excelExportService.exportAsExcelFile( this.ExcelReportList1, 'PurchaseEntryReport');

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  printTable() {
    const printContents = document.querySelector('#cc')?.innerHTML;
    const popupWin = window.open();
   // const popupWin = window.open('', '_blank', 'width=800,height=600');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            .print-container {
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            .table-responsive {
                width: 100%;
                overflow-x: auto;
                overflow-y: auto;
                border: 1px solid #ddd;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                table-layout: auto;
            }
            thead th {
                background-color: #f2f2f2;
                position: sticky;
                top: 0;
                z-index: 2;
                text-align: left;
                border: 1px solid #ddd;
                padding: 8px;
            }
            tbody td {
                border: 1px solid #C5D9E0;
                padding: 8px;
                text-align: left;
            }
            tbody tr td{
              border:1px solid green;
            }
            tbody tr:nth-child(even) {
                background-color: #f9f9f9;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="print-container">
            ${printContents}
          </div>
        </body>
      </html>`
    );
    popupWin!.document.close();
  }

  printPreviewGo(){

  }
  getPurchaseSearchData(){

    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "reports";
    api_req.api_url = "getPurchaseSearchData"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getPurchaseSearchData";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        console.log("response",response)
        this.invoice_noList=response.invoiceNo;

        this.billerList=response.reportsData.biller;
        this.vendorsList=response.reportsData.vendors;
        console.log("this.vendorsList",this.vendorsList)
        this.purchaseTypeList=response.reportsData.purchase_type;
        const date = new Date(response.reportsData.date[0].fromdt);
        this.fromDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        console.log("this.fromDate",this.fromDate)
        const date2 = new Date(response.reportsData.date[0].todt);
        this.toDate = this.datePipe.transform(date2, 'yyyy-MM-dd');
        console.log("this.toDate",this.toDate)
        this.purchaseEntryReport.patchValue({
          'IR_From':this.fromDate ,
          'IR_To':  this.toDate,
        })

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };

  }

 


}
