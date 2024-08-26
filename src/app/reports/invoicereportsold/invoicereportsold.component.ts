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
import { ExcelExportService } from './excel-export.service';
import { FileDownloadService } from './file-download.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoicereportsold',
  templateUrl: './invoicereportsold.component.html',
  styleUrls: ['./invoicereportsold.component.css']
})
export class InvoicereportsoldComponent implements OnInit {
  isReadOnly: boolean = false;
  invoiceReportOld: FormGroup;
  go: boolean = false;
  printPreview: boolean = true;
  billerList: any;
  currencyList: any;
  customerList: any;
  export_stateList: any;
  invoice_noList: any;
  invoice_statusList: any;
  performaTypeList: any;
  getInvoiceReportList: any;
  fromDate: string;
  toDate: string;
  withoutTaxValue: boolean = false;
  withTaxValue: boolean = false;
  without2TaxValue: boolean = false;
  exportTaxValue: boolean = false;
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
  dataList: { name: string; age: number; email: string; }[];
  title = 'excel-export-demo';
  exportURL: any;
  ExcelReportList: any;
  params_all: any;
  Fromdt: any;
  Todt: any;
  billerId: any;
  invoiceType: any;
  performaType: any;
  redirect_status: any;
  fromDate1: string;
  Todt1: string;
  IR_searchResult: any;
  IR_CustomerName: any;
  IR_CustomerID: any;
  response_total_cnt: any;
  response_total_cnt_print: any;
  tax: any;
  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private injector: Injector, private http: HttpClient,
    private route: ActivatedRoute,
    private excelExportService: ExcelExportService, private fileDownloadService: FileDownloadService) { }
    IR_keywordCompanyName = 'customerName';
  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.invoiceReportOld = new FormGroup({
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
    this.route.queryParams
      .subscribe(params => {
console.log("params",params)
        this.Fromdt = params['Fromdt'];
        this.Todt = params['Todt'];
        this.billerId = params['billerId'];
        this.sdn=params['billerId'];
        this.invoiceType = params['invoiceType'];
        this.performaType = params['performaType'];
        this.redirect_status = params['redirect_status'];
        this.tax=params['tax'];
         this.sdnTaxValue=params['tax'];
        // console.log("this.Fromdt inside onInit", this.Fromdt);
        // console.log("this.Todt inside onInit", this.Todt);
        // console.log("this.billerId inside onInit", this.billerId);
        // console.log("this.invoiceType inside onInit", this.invoiceType);
        // console.log("this.performaType inside onInit", this.performaType);
        // console.log("this.redirect_status inside onInit", this.redirect_status);
        //  this.getInvoiceReport();
      }
      );
      this.getCustomer_initial(this.sdn);
    this.getInvoiceReport();
   
    this.dataList = [
      { name: 'John', age: 30, email: 'john@example.com' },
      { name: 'Jane', age: 25, email: 'jane@example.com' },
      { name: 'Doe', age: 22, email: 'doe@example.com' }
    ];
    setTimeout(() => {
      this.function1();
    }, 6000);
    if(!this.tax){
  
      setTimeout(() => {
     
        this.invoiceReportOld.patchValue({
          'IR_taxssn':this.tax
        });
      }, 7000);
    }
  }
  exportToExcel(): void {
    this.excelExportService.exportAsExcelFile(this.getInvoiceReportList, 'Sample');
  }
  withoutTax(event: any) {
    this.withoutTaxValue = event.target.checked;
  }
  withTax(event: any) {
    this.withTaxValue = event.target.checked;
  }
  withoutTax2(event: any) {
    this.without2TaxValue = event.target.checked;
  }
  exportTax(event: any) {
    this.exportTaxValue = event.target.checked;
  }
  tax_sdn(event: any) {
    this.sdnTaxValue = event.target.value;
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

      if (response != '') {
        this.spinner.hide();
        this.billerList = response.biller;
        this.currencyList = response.currency;
        this.customerList = response.customer;
        this.export_stateList = response.export_state;
        this.invoice_noList = response.invoice_no;
        this.invoice_statusList = response.invoice_status;
        this.performaTypeList = response.performaType;
        const date = new Date(response.date.fromdt);
        this.fromDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        const date2 = new Date(response.date.todt);
        this.toDate = this.datePipe.transform(date2, 'yyyy-MM-dd');
        this.default_status_id = response.default_status_id;
        this.performa_type_id = response.performa_type_id;
        this.sdn = response.default_biller_id;
      
        this.invoiceReportOld.patchValue({
          'IR_From': this.fromDate,
          'IR_To': this.toDate,
          'IR_BillerName': response.default_biller_id,
          'IR_InvoiceType': response.default_status_id,
          'IR_InvoiceTypePerformaSales': response.performa_type_id,
          'IR_taxssn':this.tax
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
  getCustomer_initial(billerId: any) {
    this.spinner.show();
    
    this.sdn = billerId;


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
      if (response != '') {
        this.spinner.hide();
        this.customerList = response.customer_data;
        this.Taxnew = response.taxes;
       // this.invoiceReportOld.controls['IR_CustomerName'].reset();

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
  getCustomer(event: any) {
    this.spinner.show();
    var billerId = event.target.value;
    this.sdn = event.target.value;


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
      if (response != '') {
        this.spinner.hide();
        this.customerList = response.customer_data;
        this.Taxnew = response.taxes;
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
  getInvoiceno(event: any) {
    var customerId = event.target.value
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
      if (response != '') {
        this.spinner.hide();
        this.invoice_noList = response.invoice_data;


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
  // function() {
  //   if (this.redirect_status == 0 || this.redirect_status == '0') {
  //     const date = new Date(this.Fromdt);
  //     this.fromDate1 = this.datePipe.transform(date, 'yyyy-MM-dd');
  //     const date1 = new Date(this.Todt);
  //     this.Todt1 = this.datePipe.transform(date1, 'yyyy-MM-dd');
  //     $('#invoiceReportOld_IR_From').val(this.fromDate1);
  //     $('#invoiceReportOld_IR_To').val(this.Todt1);

  //     this.invoiceReportOld.patchValue({
  //       'IR_From': this.fromDate1,
  //       'IR_To': this.Todt1,
  //       'IR_BillerName': this.billerId,
  //       'IR_InvoiceType': this.invoiceType,
  //       'IR_InvoiceTypePerformaSales': this.performaType,
  //     });
  //   }
  // }
  function1() {
 
    if (this.redirect_status == 0 || this.redirect_status == '0') {
    
        this.invoiceReportOld.patchValue({
        'IR_From': this.Fromdt,
        'IR_To': this.Todt,
        'IR_BillerName': this.billerId,
        'IR_InvoiceType': this.invoiceType,
        'IR_InvoiceTypePerformaSales': this.performaType,
        'IR_taxssn':this.tax
      });
      this.sdn=this.billerId;
    }
  }
  

  getInvoiceReport() {
    this.spinner.show();
    this.printPreview = false;
    this.go = true;
    // alert(this.go);

    console.log("this.Fromdt-inside list report", this.Fromdt);
    console.log("this.Todt-inside list report", this.Todt);
    console.log("this.billerId-inside list report", this.billerId);
    console.log("this.invoiceType-inside list report", this.invoiceType);
    console.log("this.performaType-inside list report", this.performaType);
    console.log("this.tax-inside list report", this.tax);
    console.log("this.sdnTaxValue-inside list report", this.sdnTaxValue);
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getInvoiceReport"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getInvoiceReport";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    if (this.redirect_status == 0 || this.redirect_status == '0') {

      api_mulInvpay.billerId = this.billerId;

    } else {

      api_mulInvpay.billerId = this.invoiceReportOld.value.IR_BillerName;
    }

   // api_mulInvpay.customerId = this.invoiceReportOld.value.IR_CustomerName;
    api_mulInvpay.customerId =  this.IR_CustomerID;
    api_mulInvpay.billId = this.invoiceReportOld.value.IR_InvoiceNumber;
    if (this.redirect_status == 0 || this.redirect_status == '0') {
      api_mulInvpay.invoiceType = this.invoiceType;
    } else {

      api_mulInvpay.invoiceType = this.invoiceReportOld.value.IR_InvoiceType;
    }
    if (this.redirect_status == 0 || this.redirect_status == '0') {
      api_mulInvpay.performaType = this.performaType;
    } else {
      api_mulInvpay.performaType = this.invoiceReportOld.value.IR_InvoiceTypePerformaSales;

    }

    api_mulInvpay.currenyType = this.invoiceReportOld.value.IR_CurrencyType;
    api_mulInvpay.export_state = this.invoiceReportOld.value.IR_SalesType;
    if (this.redirect_status == 0 || this.redirect_status == '0') {
      api_mulInvpay.fromdt = this.Fromdt;


    } else {
      api_mulInvpay.fromdt = this.invoiceReportOld.value.IR_From;

    }
    if (this.redirect_status == 0 || this.redirect_status == '0') {
      api_mulInvpay.todt = this.Todt;

    } else {

      api_mulInvpay.todt = this.invoiceReportOld.value.IR_To;
    }

    api_mulInvpay.without_tax = this.withoutTaxValue;
    api_mulInvpay.with_tax = this.withTaxValue;
    api_mulInvpay.with_tax2 = this.without2TaxValue;
    api_mulInvpay.with_export = this.exportTaxValue;
    api_mulInvpay.tax = this.sdnTaxValue;


    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.getInvoiceReportList = response.reportsData.reports;
        this.getInvoiceReportTotals = response.reportsData.totals;
        this.response_total_cnt=response.total_cnt;

        this.outputTax = response.tax;

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

  printPreviewGo() {



    this.router.navigate(['/printpreview'], {
      queryParams: {

        billerId: this.invoiceReportOld.value.IR_BillerName,
        customerId:this.IR_CustomerID ,
        billId: this.invoiceReportOld.value.IR_InvoiceNumber,
        invoiceType: this.invoiceReportOld.value.IR_InvoiceType,
        performaType: this.invoiceReportOld.value.IR_InvoiceTypePerformaSales,
        currenyType: this.invoiceReportOld.value.IR_CurrencyType,
        export_state: this.invoiceReportOld.value.IR_SalesType,
        fromdt: this.invoiceReportOld.value.IR_From,
        todt: this.invoiceReportOld.value.IR_To,
        without_tax: this.withoutTaxValue,
        with_tax: this.withTaxValue,
        with_tax2: this.without2TaxValue,
        with_export: this.exportTaxValue,
        tax: this.sdnTaxValue,


      }
    });
  }

  printPreviewGo2() {

    this.printPreview = true;
    this.go = false;
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
    // api_mulInvpay.customerId = this.invoiceReportOld.value.IR_CustomerName;this.IR_CustomerID
    api_mulInvpay.customerId = this.IR_CustomerID;
    api_mulInvpay.billId = this.invoiceReportOld.value.IR_InvoiceNumber;
    api_mulInvpay.invoiceType = this.invoiceReportOld.value.IR_InvoiceType;
    api_mulInvpay.performaType = this.invoiceReportOld.value.IR_InvoiceTypePerformaSales;
    api_mulInvpay.currenyType = this.invoiceReportOld.value.IR_CurrencyType;
    api_mulInvpay.export_state = this.invoiceReportOld.value.IR_SalesType;
    api_mulInvpay.fromdt = this.invoiceReportOld.value.IR_From;
    api_mulInvpay.todt = this.invoiceReportOld.value.IR_To;
    api_mulInvpay.without_tax = this.withoutTaxValue;
    api_mulInvpay.with_tax = this.withTaxValue;
    api_mulInvpay.with_tax2 = this.without2TaxValue;
    api_mulInvpay.with_export = this.exportTaxValue;
    api_mulInvpay.tax = this.sdnTaxValue;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.printPreviewList = response.reportsData.reports;
        this.printPreviewSubTotals = response.reportsData.subtotals;
        this.printPreviewTotals = response.reportsData.totals;
        this.outputTaxPrint = response.tax;
        this.sdnTaxValue=response.tax;
        this.response_total_cnt_print=response.total_cnt;

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

  ExportInvoiceReport() {
    this.spinner.show();



    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/InvoiceReportExcel"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "reports/InvoiceReportExcel";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    api_mulInvpay.billerId = this.invoiceReportOld.value.IR_BillerName;
    //api_mulInvpay.customerId = this.invoiceReportOld.value.IR_CustomerName;
    api_mulInvpay.customerId = this.IR_CustomerID;
    api_mulInvpay.billId = this.invoiceReportOld.value.IR_InvoiceNumber;
    api_mulInvpay.invoiceType = this.invoiceReportOld.value.IR_InvoiceType;
    api_mulInvpay.performaType = this.invoiceReportOld.value.IR_InvoiceTypePerformaSales;
    api_mulInvpay.currenyType = this.invoiceReportOld.value.IR_CurrencyType;
    api_mulInvpay.export_state = this.invoiceReportOld.value.IR_SalesType;
    api_mulInvpay.fromdt = this.invoiceReportOld.value.IR_From;
    api_mulInvpay.todt = this.invoiceReportOld.value.IR_To;
    api_mulInvpay.without_tax = this.withoutTaxValue;
    api_mulInvpay.with_tax = this.withTaxValue;
    api_mulInvpay.with_tax2 = this.without2TaxValue;
    api_mulInvpay.with_export = this.exportTaxValue;
    api_mulInvpay.tax = this.sdnTaxValue;


    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();

        this.ExcelReportList = response.reportsData;
        this.excelExportService.exportAsExcelFile(this.ExcelReportList, 'InvoiceReport');

        // this.exportURL=response.path;
        // window.open(this.exportURL,'_blank')
        // const url = response.path;
        // const filename = 'filename.xlsx'; // Replace with the desired filename
        // this.fileDownloadService.downloadFile(url, filename);


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Excel Loading Failed",
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
  IR_searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reports/getCustomer";
    // api_req.api_url = "customer/cal/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "reports/getCustomer";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_Search_req.billerId= this.sdn;
    api_req.element_data = api_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
        this.IR_searchResult = response.customer_data;
        console.log(" this.searchResult", this.IR_searchResult)
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  IR_selectEventCustomer(item: any) {
    this.IR_searchResult = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)

    this.IR_CustomerName = item.customerName;
    this.IR_CustomerID = item.customerId;
    // do something with selected item
  }

  IR_onFocusedCustomer(e: any) {
    // do something when input is focused
    console.log(e)
  }
  IR_clearSelection(e:any){
    this.IR_searchResult = '';
    this.IR_CustomerName = '';
    this.IR_CustomerID = '';
  }




}
