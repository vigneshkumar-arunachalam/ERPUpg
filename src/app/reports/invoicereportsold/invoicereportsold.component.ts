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
  billerList: any;
  currencyList: any;
  customerList: any;
  export_stateList: any;
  invoice_noList: any;
  invoice_statusList: any;
  performaTypeList: any;
  getInvoiceReportList:any;
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient) { }

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.invoiceReportOld=new FormGroup({
      'IR_From': new FormControl(currentDate),
      'IR_To': new FormControl(currentDate),
      'IR_BillerName': new FormControl(null),
      'IR_CustomerName': new FormControl(null),

      'IR_InvoiceNumber': new FormControl(null),
      'IR_InvoiceType': new FormControl(null),
      'IR_InvoiceTypePerformaSales': new FormControl(null),
      'IR_CurrencyType': new FormControl(null),

      'IR_SalesType': new FormControl(null),
      'IR_ShowRecords': new FormControl(null),
      'IR_Tax': new FormControl(null),
   
    });
    this.invoiceReportDetails();
    this.getInvoiceReport();
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
        this.getInvoiceReportList=response.invoice_list;
       
    

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
