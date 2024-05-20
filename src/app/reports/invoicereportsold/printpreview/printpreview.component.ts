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
  selector: 'app-printpreview',
  templateUrl: './printpreview.component.html',
  styleUrls: ['./printpreview.component.css']
})
export class PrintpreviewComponent implements OnInit {
  getInvoiceReportList: any;

  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
    this.getInvoiceReport();
  }
  getInvoiceReport() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getInvoiceReport"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getInvoiceReport";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = 3;
    api_mulInvpay.customerId ='';
    api_mulInvpay.billId ='';
    api_mulInvpay.invoiceType ='';
    api_mulInvpay.performaType ='';
    api_mulInvpay.currenyType ='';
    api_mulInvpay.export_state ='';
    api_mulInvpay.fromdt ='';
    api_mulInvpay.todt ='';
    api_mulInvpay.without_tax ='';
    api_mulInvpay.with_tax ='';
    api_mulInvpay.with_tax2 ='';
    api_mulInvpay.with_export ='';

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
        this.getInvoiceReportList=response;
       
    

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
    const popupWin = window.open('', '_blank', 'width=800,height=600');
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
