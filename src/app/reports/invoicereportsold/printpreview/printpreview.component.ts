import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-printpreview',
  templateUrl: './printpreview.component.html',
  styleUrls: ['./printpreview.component.css']
})
export class PrintpreviewComponent implements OnInit {
  getInvoiceReportList: any;
  billerId: any;
  customerId: any;
  billId: any;
  invoiceType: any;
  performaType: any;
  currenyType: any;
  export_state: any;
  fromdt: any;
  todt: any;
  without_tax: boolean;
  with_tax: boolean;
  with_tax2: boolean;
  with_export: boolean;
  tax: any;
  printPreviewList: any;
  printPreviewSubTotals: any;
  printPreviewTotals: any;
  response_total_cnt: any;

  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private route: ActivatedRoute, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
   // this.getInvoiceReport();
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.billerId = params['billerId'];
        this.customerId = params['customerId'];
        this.billId = params['billId'];
        this.invoiceType = params['invoiceType'];
        this.performaType = params['performaType'];
        this.currenyType = params['currenyType'];
        this.export_state = params['export_state'];
        this.fromdt = params['fromdt'];
        this.todt = params['todt'];
        this.without_tax = JSON.parse(params['without_tax']);
        this.with_tax = JSON.parse(params['with_tax']);
        this.with_tax2 = JSON.parse(params['with_tax2']);
        this.with_export = JSON.parse(params['with_export']);
        this.tax = params['tax'];
      }
      );
      console.log("this.customerId", this.customerId)
      this.getInvoiceReportPrintPreview();
      console.log("this.without_tax", this.without_tax)
  }
  getInvoiceReportPrintPreview() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/invoiceReportPrint"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "reports/invoiceReportPrint";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.billerId;
    api_mulInvpay.customerId =this.customerId;
    api_mulInvpay.billId =this.billId;
    api_mulInvpay.invoiceType =this.invoiceType;
    api_mulInvpay.performaType =this.performaType;
    api_mulInvpay.currenyType =this.currenyType;
    api_mulInvpay.export_state =this.export_state;
    api_mulInvpay.fromdt =this.fromdt;
    api_mulInvpay.todt =this.todt;
    api_mulInvpay.without_tax = this.without_tax;
    api_mulInvpay.with_tax = this.with_tax;
    api_mulInvpay.with_tax2 =this.with_tax2;
    api_mulInvpay.with_export =this.with_export;
    api_mulInvpay.tax =this.tax;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.printPreviewList=response.reportsData.reports;
        this.printPreviewSubTotals=response.reportsData.subtotals;
        this.printPreviewTotals=response.reportsData.totals;
        this.response_total_cnt=response.total_cnt;
        console.log("this.printPreviewList",this.printPreviewList)
        console.log("this.printPreviewSubTotals",this.printPreviewSubTotals)
        console.log("this.printPreviewTotals",this.printPreviewTotals)
       
    

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
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
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
