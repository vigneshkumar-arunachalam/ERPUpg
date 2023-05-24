import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-add-transaction-new',
  templateUrl: './add-transaction-new.component.html',
  styleUrls: ['./add-transaction-new.component.css']
})
export class AddTransactionNewComponent implements OnInit {
  addTransaction_section1: FormGroup;
  VendorManagementForm: FormGroup;

  //file attachment
  file: File;
  getResult: any;
  credit_attachment_id: any;
  fileAttachCustomerID: any;
  myFiles: string[] = [];
  myForm: FormGroup;
  currencyDetails: any;
  billerDetails: any;
  vendorDetails: any;
  purchaseTypeDetails: any;
  taxProviderDetails: any;
  //others
  priorityList: any;
  cashTypeList: any;
  //tab
  Select_Transaction_Type = 'PurchaseEntry';
  //pe file
  PE_FileLength: any;
  //currency change
  getCurrencyCode: any
  billerID: any


  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.addLoad();
    this.priorityList = [
      { name: 'Low', selected: true, id: 1 },
      { name: 'High', selected: true, id: 2 },
    ];
    this.cashTypeList = [
      { name: 'Debit', selected: true, id: 1 },
      { name: 'Credit', selected: true, id: 2 },
    ];

    this.addTransaction_section1 = new FormGroup({
      'billerName': new FormControl(),
      'trans_Date': new FormControl(),
      'priority': new FormControl(),
      'PE_purchaseEntryNo': new FormControl(),
      'PE_vendorName': new FormControl(),
      'PE_purchaseType': new FormControl(),
      'PE_invoiceNo': new FormControl(),
      'PE_invoice_Date': new FormControl(),
      'PE_contentofPurchase': new FormControl(),
      'PE_poNumber': new FormControl(),
      'PE_Currency': new FormControl(),
      'PE_currencyConversionRate': new FormControl(),
      'PE_taxAmount': new FormControl(),
      'PE_TaxProvider': new FormControl(),
      'PE_FreightProvider': new FormControl(),
      'PE_FreightAmount': new FormControl(),
      'PE_invoiceAmount': new FormControl(),
      'CB_PE_AttachMobile': new FormControl(),
      'PE_FileAttachment': new FormControl(),
      'PC_Description': new FormControl(),
      'PC_Type': new FormControl(),
      'PC_Amount': new FormControl(),
      'CB_PC_AttachMobile': new FormControl(),
      'PC_FileAttachment': new FormControl(),

      'Log_Description': new FormControl(),
      'Log_Type': new FormControl(),
      'Log_Amount': new FormControl(),
      'CB_Log_AttachMobile': new FormControl(),
      'Log_FileAttachment': new FormControl(),
      'VendorOrder_Description': new FormControl(),
      'VendorOrder_FileAttachment': new FormControl(),
      'InvPayment_InvoiceNumber': new FormControl(),
      'InvPayment_Biller': new FormControl(),
      'InvPayment_Customer': new FormControl(),
      'InvPayment_Total': new FormControl(),
      'InvPayment_Paid': new FormControl(),
      'InvPayment_Owing': new FormControl(),
      'InvPayment_PaymentMethod': new FormControl(),
      'InvPayment_Amount': new FormControl(),
      'InvPayment_date': new FormControl(),
      'InvPayment_Notes': new FormControl(),
      'InvPayment_Details': new FormControl(),
      'InvPayment_FileAttachment': new FormControl(),


      'AddNewStock_vendorName': new FormControl(),
      'AddNewStock_PurDate': new FormControl(),
      'AddNewStock_CategoryName': new FormControl(),
      'AddNewStock_ProductName': new FormControl(),
      'AddNewStock_Qty': new FormControl(),
      'AddNewStock_SNo': new FormControl(),

      'StockIssued_categoryName': new FormControl(),
      'StockIssued_ProductName': new FormControl(),
      'StockIssued_serialMACNo': new FormControl(),
      'StockIssued_InvoiceNo': new FormControl(),
      'StockIssued_Demo': new FormControl(),
      'StockIssued_Qty': new FormControl(),
      'StockIssued_AQty': new FormControl(),

      'StockTransfer_categoryName': new FormControl(),
      'StockTransfer_ProductName': new FormControl(),
      'StockTransfer_serialMACNo': new FormControl(),
      'StockTransfer_Biller': new FormControl(),
      'StockTransfer_Qty': new FormControl(),
      'StockTransfer_AQty': new FormControl(),

      'others_Description': new FormControl(),
      'others_FileAttachment': new FormControl(),
    });

    this.VendorManagementForm=new FormGroup({

      'VM_CompanyCode': new FormControl(),
      'VM_CompanyName' : new FormControl(),
      'VM_VendorName': new FormControl(),
      'VM_Address1': new FormControl(),
      'VM_Address2': new FormControl(),
      'VM_City': new FormControl(),
      'VM_State': new FormControl(),
      'VM_Country': new FormControl(),
      'VM_Phone': new FormControl(),
      'VM_MobilePhone': new FormControl(),
      'VM_Fax': new FormControl(),
      'VM_Email': new FormControl(),
     

    });
  }
  CB_Fn_PE_AttachMobile(event: any) {

  }
  CB_Fn_PC_AttachMobile(event: any) {

  }
  CB_Fn_Log_AttachMobile(event: any) {

  }
  fileAttachmentEvent(event: any) {
    this.PE_FileLength = event.target.files.length
    // alert(event.target.files.length);
    this.file = event.target.files[0];
    for (let i = 0; i < event.target.files.length; i++) {

      if (event.target.files && event.target.files[i] && this.file.size > 2097152) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }


    }

    // if(this.file.size > 2097152){
    //   alert("maximum limit")

    // }

  }
  fileAttachmentEventPE1(event: any) {

    if (event.target.files.length < 4) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    }
    else {
      iziToast.error({
        message: "Sorry, Maximum you can choose 3 files only. Please contact admin",
        position: 'topRight'
      });
    }


  }

  addLoad() {


    let api_req: any = new Object();
    let api_loadAdd: any = new Object();
    api_req.moduleType = "purchase_entry_addnew";
    api_req.api_url = "transaction_entry/purchase_entry_addnew";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_loadAdd.action = "purchase_entry_addnew";


    api_loadAdd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadAdd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {

        this.currencyDetails = response.currency_det;
        this.billerDetails = response.biller_det;
        this.vendorDetails = response.vendor_det;
        this.purchaseTypeDetails = response.purchase_type_det;
        this.taxProviderDetails = response.tax_provider_det;

        this.addTransaction_section1.patchValue({
          // 'setInvoice': response.selected_invoice_type
        })



      } else {


        iziToast.warning({
          message: "Invoice Type Details not displayed. Please try again",
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

  getCurrencyValues(event: any) {
    console.log("event.target;", event.target);
    this.getCurrencyCode = event.target.value;
    console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    api_getInvoiceDetails_req.billerId = this.billerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.addTransaction_section1.patchValue({
          'PE_currencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }
  addVendorNameGo(){
    $('#VendorManagementId').modal('show');
  }
  BillerChange(event: any){
    this.billerID=event.target.value;;
  }

  saveVendorManagement(){

  }
  // saveTransaction() {

  //   let api_req: any = new Object();
  //   let api_saveTransaction_req: any = new Object();
  //   api_req.moduleType = "transaction_entry";
  //   api_req.api_url = "transaction_entry/insert_transaction";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_saveTransaction_req.action = "insert_transaction";
  //   api_saveTransaction_req.user_id = localStorage.getItem('erp_c4c_user_id');


  //   //section-1

  //   api_saveTransaction_req.cus_invoice_no = this.addTransaction_section1.value.cusInvoiceNo;

  //   api_saveTransaction_req.tinNo = this.addTransaction_section1.value.tin;



  //   api_saveTransaction_req.b_name = this.addTransaction_section1.value.BillTo;
  //   api_saveTransaction_req.b_address1 = this.addTransaction_section1.value.address_1;
  //   api_saveTransaction_req.b_address2 = this.addTransaction_section1.value.address_2;
  //   api_saveTransaction_req.b_address3 = this.addTransaction_section1.value.address_3;

  //   api_req.element_data = api_saveTransaction_req;


  //   this.serverService.sendServer(api_req).subscribe((response: any) => {


  //     if (response.status == true) {
  //       this.router.navigate(['/invoice']);
  //       iziToast.success({
  //         message: "Invoice saved successfully",
  //         position: 'topRight'
  //       });
  //       this.goBackTransaction();

  //     }

  //     else {
  //       alert("status == false")
  //       iziToast.warning({
  //         message: "Invoice not added Successfully",
  //         position: 'topRight'
  //       });
  //       this.goBackTransaction();
  //     }

  //   }),
  //     (error: any) => {
  //       ($event.target as HTMLButtonElement).disabled = false;
  //       alert(error)

  //       iziToast.error({
  //         message: "Sorry, some server issue occur. Please contact admin",
  //         position: 'topRight'
  //       });
  //       console.log("500",error);
  //     }

  //     this.goBackTransaction();
  //     // this.router.navigate(['/invoice']);


  // }
  saveTransaction() {
    alert("hi")

    var data = new FormData();

    data.append('company', this.addTransaction_section1.value.billerName);
    data.append('transaction_date', this.addTransaction_section1.value.trans_Date);
    data.append('priority', this.addTransaction_section1.value.priority);
    data.append('type_of_trans', this.Select_Transaction_Type);
    //purchase entry
    if(this.Select_Transaction_Type=='PurchaseEntry'){
          data.append('purchaseEntryNo', this.addTransaction_section1.value.PE_purchaseEntryNo);
          data.append('vendorId', this.addTransaction_section1.value.PE_vendorName);
          data.append('purchase_type_id', this.addTransaction_section1.value.PE_purchaseType);
          data.append('invoiceNo', this.addTransaction_section1.value.PE_invoiceNo);
          data.append('invoiceDate', this.addTransaction_section1.value.PE_invoice_Date);
          data.append('content_purchase', this.addTransaction_section1.value.PE_contentofPurchase);
          data.append('poNo', this.addTransaction_section1.value.PE_poNumber);
          data.append('currency', this.addTransaction_section1.value.PE_Currency);
          data.append('conversionRate', this.addTransaction_section1.value.PE_currencyConversionRate);
          data.append('taxAmount', this.addTransaction_section1.value.PE_taxAmount);
          data.append('tax_provider', this.addTransaction_section1.value.PE_TaxProvider);
          data.append('freight_provider', this.addTransaction_section1.value.PE_FreightProvider);
          data.append('freight_amt', this.addTransaction_section1.value.PE_FreightAmount);
          data.append('invoiceAmount', this.addTransaction_section1.value.PE_invoiceAmount);
          //data.append('pur_attach_mobile', this.addTransaction_section1.value.CB_PE_AttachMobile);
          // for(let i=0;i<this.PE_FileLength;i++){
          //   data.append('file_attachment_name[i]', $("#PE_FileAttachment")[i].files[i]);
          // }
      
          if (this.myFiles.length < 4) {
            for (var i = 0; i < this.myFiles.length; i++) {
      
              data.append("file[]", this.myFiles[i]);
            }
      
          }
    }
    if(this.Select_Transaction_Type=='PettyCash'){
      data.append('petty_description', this.addTransaction_section1.value.PC_Description);
      data.append('petty_type', this.addTransaction_section1.value.PC_Type);
      data.append('petty_amount', this.addTransaction_section1.value.PC_Amount);
      data.append('petty_attach_mobile', this.addTransaction_section1.value.CB_PC_AttachMobile);
      data.append('file_attachment_name', this.addTransaction_section1.value.PC_FileAttachment);

    }

    if(this.Select_Transaction_Type=='Logistics'){
      data.append('logistics_description', this.addTransaction_section1.value.Log_Description);
      data.append('logistics_type', this.addTransaction_section1.value.Log_Type);
      data.append('logistics_attach_mobile', this.addTransaction_section1.value.Log_Amount);
      data.append('logistics_amount', this.addTransaction_section1.value.CB_Log_AttachMobile);
      data.append('file_attachment_name', this.addTransaction_section1.value.Log_FileAttachment);

    }
    if(this.Select_Transaction_Type=='VendorOrder'){
      data.append('other_description', this.addTransaction_section1.value.VendorOrder_Description);
      data.append('file_attachment_name', this.addTransaction_section1.value.VendorOrder_FileAttachment);
    }

    if(this.Select_Transaction_Type=='InvoicePayment'){
      data.append('invoice_no', this.addTransaction_section1.value.InvPayment_InvoiceNumber);
      data.append('payment_nettotal', this.addTransaction_section1.value.InvPayment_Total);
      data.append('payment_billerName', this.addTransaction_section1.value.InvPayment_Biller);
      data.append('payment_amountPaid', this.addTransaction_section1.value.InvPayment_Paid);
      data.append('payment_customerName', this.addTransaction_section1.value.InvPayment_Customer);
      data.append('payment_owing', this.addTransaction_section1.value.InvPayment_Owing);
      data.append('paidAmount', this.addTransaction_section1.value.InvPayment_Amount);
      data.append('paymentDate', this.addTransaction_section1.value.InvPayment_date);
      data.append('payment_method', this.addTransaction_section1.value.InvPayment_PaymentMethod);
      data.append('note', this.addTransaction_section1.value.InvPayment_Notes);
      data.append('payment_paymentNote', this.addTransaction_section1.value.InvPayment_Details);
      data.append('file_attachment_name', this.addTransaction_section1.value.InvPayment_FileAttachment);
    }

    if(this.Select_Transaction_Type=='InvoicePayment'){
      data.append('other_description', this.addTransaction_section1.value.others_Description);
      data.append('file_attachment_name', this.addTransaction_section1.value.others_FileAttachment);
    }
 

    data.append('action', "insert_transaction");

    var self = this;
    $.ajax({
      type: 'POST',
      url: 'https://erp1.cal4care.com/api/transaction_entry/insert_transaction',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {

          self.goBackTransaction();
          console.log(result);


          iziToast.success({
            message: "Transaction details Saved successfully",
            position: 'topRight'
          });
        }
        else {


          iziToast.warning({
            message: "Transaction details not Saved",
            position: 'topRight'
          });
        }
      },
      error: function (err: any) {

        console.log("err", err)
        iziToast.error({
          message: "Server Side Error",
          position: 'topRight'
        });

      }

    })

  }
  SelectTransactionType_PE() {
    this.Select_Transaction_Type = 'PurchaseEntry'
  }
  SelectTransactionType_PC() {
    this.Select_Transaction_Type = 'PettyCash'
  }
  SelectTransactionType_Log() {
    this.Select_Transaction_Type = 'Logistics'
  }
  SelectTransactionType_VO() {
    this.Select_Transaction_Type = 'VendorOrder'
  }
  SelectTransactionType_IP() {
    this.Select_Transaction_Type = 'InvoicePayment'
  }
  SelectTransactionType_ANS() {
    this.Select_Transaction_Type = 'AddNewStock'
  }
  SelectTransactionType_SI() {
    this.Select_Transaction_Type = 'StockIssued'
  }
  SelectTransactionType_ST() {
    this.Select_Transaction_Type = 'StockTransfer'
  }
  SelectTransactionType_Others() {
    this.Select_Transaction_Type = 'Others'
  }
  goBackTransaction() {
    this.router.navigate(['/transactionnew']);
  }
  goBackADDTransaction(){
       this.router.navigate(['/AddTransactionNew']);
       window.location.reload();
  }

}
