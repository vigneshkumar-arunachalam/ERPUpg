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
  selector: 'app-invoicereportsold',
  templateUrl: './invoicereportsold.component.html',
  styleUrls: ['./invoicereportsold.component.css']
})
export class InvoicereportsoldComponent implements OnInit {
  isReadOnly:boolean=false;
  invoiceReportOld:FormGroup;
  go:boolean=false;
  printPreview:boolean=true;
  billerList: any;
  currencyList: any;
  customerList: any;
  export_stateList: any;
  invoice_noList: any;
  invoice_statusList: any;
  performaTypeList: any;
  getInvoiceReportList:any;
  fromDate: string;
  toDate: string;
  withoutTaxValue: boolean=false;
  withTaxValue: boolean=false;
  without2TaxValue: boolean=false;
  exportTaxValue: boolean=false;
  sdnTaxValue: any;
  Taxnew: any;
  printPreviewList: any;
  default_status_id: any;
  performa_type_id: any;
  sdn: any;
  printPreviewSubTotals: any;
  printPreviewTotals: any;
  getInvoiceReportTotals: any;
  outputTax: any;
  outputTaxPrint: any;
 
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.invoiceReportOld=new FormGroup({
      'IR_From': new FormControl(),
      'IR_To': new FormControl(),
      'IR_BillerName': new FormControl(null),
      'IR_CustomerName': new FormControl(null),

      'IR_InvoiceNumber': new FormControl(null),
      'IR_InvoiceType': new FormControl(null),
      'IR_InvoiceTypePerformaSales': new FormControl(null),
      'IR_CurrencyType': new FormControl(null),

      'IR_SalesType': new FormControl(null),
      'IR_ShowRecords': new FormControl(null),
      'IR_Tax': new FormControl(null),
      'IR_Tax_withoutTax': new FormControl(null),
      'IR_Tax_withTax': new FormControl(null),
      'IR_Tax_withTax2': new FormControl(null),
      'IR_Tax_export': new FormControl(null),
      'IR_taxssn': new FormControl(null),
   
    });
    this.invoiceReportDetails();
    this.getInvoiceReport();
  }
  withoutTax(event:any)
  {
    this.withoutTaxValue=event.target.checked;
  }
  withTax(event:any)
  {
    this.withTaxValue=event.target.checked;
  }
  withoutTax2(event:any)
  {
    this.without2TaxValue=event.target.checked;
  }
  exportTax(event:any)
  {
    this.exportTaxValue=event.target.checked;
  }
  tax_sdn(event:any)
  {
    this.sdnTaxValue=event.target.value;
    console.log(" this.sdnTaxValue", this.sdnTaxValue)
  }
 
  invoiceReportDetails() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getInvoiceSearchData"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getInvoiceSearchData";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    // api_mulInvpay.billerId = 3;
    // api_mulInvpay.customerId ='';
  

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    
      if (response !='') {
        this.spinner.hide();
        this.billerList=response.biller;
        this.currencyList=response.currency;
        this.customerList=response.customer;
        this.export_stateList=response.export_state;
        this.invoice_noList=response.invoice_no;
        this.invoice_statusList=response.invoice_status;
        this.performaTypeList=response.performaType;
        const date = new Date(response.date.fromdt);
        this.fromDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        const date2 = new Date(response.date.todt);
        this.toDate = this.datePipe.transform(date2, 'yyyy-MM-dd');
        this.default_status_id=response.default_status_id;
        this.performa_type_id=response.performa_type_id;
        this.sdn==response.default_biller_id;

        this.invoiceReportOld.patchValue({
          'IR_From':this.fromDate,
          'IR_To':this.toDate,
          'IR_BillerName':response.default_biller_id,
          'IR_InvoiceType':response.default_status_id,
          'IR_InvoiceTypePerformaSales':response.performa_type_id,
      });

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "No Data Found",
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
  getCustomer(event:any) {
    this.spinner.show();
    var billerId=event.target.value;
    this.sdn=event.target.value;
  

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/getCustomer"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "reports/getCustomer";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.billerId = billerId;

    // api_mulInvpay.customerId ='';
  

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.customerList=response.customer_data;
        this.Taxnew=response.taxes;
        this.invoiceReportOld.controls['IR_CustomerName'].reset();

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
  getInvoiceno(event:any) {
    var customerId=event.target.value
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/getInvoiceno"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "reports/getInvoiceno";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.customerId = customerId;

    // api_mulInvpay.customerId ='';
  

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.invoice_noList=response.invoice_data;
    

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
  getInvoiceReport() {
    this.spinner.show();
    this.printPreview=false;
    this.go=true;
   // alert(this.go);

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getInvoiceReport"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getInvoiceReport";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.invoiceReportOld.value.IR_BillerName;
    api_mulInvpay.customerId =this.invoiceReportOld.value.IR_CustomerName;
    api_mulInvpay.billId =this.invoiceReportOld.value.IR_InvoiceNumber;
    api_mulInvpay.invoiceType =this.invoiceReportOld.value.IR_InvoiceType;
    api_mulInvpay.performaType =this.invoiceReportOld.value.IR_InvoiceTypePerformaSales;
    api_mulInvpay.currenyType =this.invoiceReportOld.value.IR_CurrencyType;
    api_mulInvpay.export_state =this.invoiceReportOld.value.IR_SalesType;
    api_mulInvpay.fromdt =this.invoiceReportOld.value.IR_From;
    api_mulInvpay.todt =this.invoiceReportOld.value.IR_To;
    api_mulInvpay.without_tax = this.withoutTaxValue;
    api_mulInvpay.with_tax = this.withTaxValue;
    api_mulInvpay.with_tax2 =this.without2TaxValue;
    api_mulInvpay.with_export =this.exportTaxValue;
    api_mulInvpay.tax =this.sdnTaxValue;


    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.getInvoiceReportList=response.reportsData.reports;
        this.getInvoiceReportTotals=response.reportsData.totals;
        this.outputTax=response.tax;

        // this.withoutTaxValue=false;
        // this.without2TaxValue=false;
        // this.withTaxValue=false;
        // this.exportTaxValue=false;
       // this.sdnTaxValue='';
      //  this.invoiceReportOld.controls['IR_CustomerName'].reset();
       
    

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
 
  printPreviewGo(){
 
   

    this.router.navigate(['/printpreview'], {
      queryParams: {
       
        billerId:  this.invoiceReportOld.value.IR_BillerName,
        customerId :this.invoiceReportOld.value.IR_CustomerName,
        billId:this.invoiceReportOld.value.IR_InvoiceNumber,
        invoiceType :this.invoiceReportOld.value.IR_InvoiceType,
        performaType :this.invoiceReportOld.value.IR_InvoiceTypePerformaSales,
        currenyType :this.invoiceReportOld.value.IR_CurrencyType,
        export_state :this.invoiceReportOld.value.IR_SalesType,
        fromdt :this.invoiceReportOld.value.IR_From,
        todt :this.invoiceReportOld.value.IR_To,
        without_tax : this.withoutTaxValue,
        with_tax : this.withTaxValue,
        with_tax2 :this.without2TaxValue,
        with_export :this.exportTaxValue,
        tax :this.sdnTaxValue,

     
      }
    });
  }

  printPreviewGo2() {
 
    this.printPreview=true;
    this.go=false;
// alert(this.go)
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/invoiceReportPrint"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "reports/invoiceReportPrint";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.invoiceReportOld.value.IR_BillerName;
    api_mulInvpay.customerId =this.invoiceReportOld.value.IR_CustomerName;
    api_mulInvpay.billId =this.invoiceReportOld.value.IR_InvoiceNumber;
    api_mulInvpay.invoiceType =this.invoiceReportOld.value.IR_InvoiceType;
    api_mulInvpay.performaType =this.invoiceReportOld.value.IR_InvoiceTypePerformaSales;
    api_mulInvpay.currenyType =this.invoiceReportOld.value.IR_CurrencyType;
    api_mulInvpay.export_state =this.invoiceReportOld.value.IR_SalesType;
    api_mulInvpay.fromdt =this.invoiceReportOld.value.IR_From;
    api_mulInvpay.todt =this.invoiceReportOld.value.IR_To;
    api_mulInvpay.without_tax = this.withoutTaxValue;
    api_mulInvpay.with_tax = this.withTaxValue;
    api_mulInvpay.with_tax2 =this.without2TaxValue;
    api_mulInvpay.with_export =this.exportTaxValue;
    api_mulInvpay.tax =this.sdnTaxValue;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.printPreviewList=response.reportsData.reports;
        this.printPreviewSubTotals=response.reportsData.subtotals;
        this.printPreviewTotals=response.reportsData.totals;
        this.outputTaxPrint=response.tax;

        // this.withoutTaxValue=false;
        // this.without2TaxValue=false;
        // this.withTaxValue=false;
        // this.exportTaxValue=false;
       // this.sdnTaxValue='';
      
    

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
    const printContents = document.querySelector('#bb')?.innerHTML;
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




}
