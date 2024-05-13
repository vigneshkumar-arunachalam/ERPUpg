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
  addStock_section2: FormGroup;
  public addresses: FormArray;

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
  DefaultBillerIDValue: any;
  InvoicePaymentList: any;
  amountPaid: any;
  balance: any;
  billerName: any;
  customerName: any;
  netPayment: any;
  paymentNote: any;

  //tab
  Select_Transaction_Type: any = 3;
  //pe file
  PE_FileLength: any;
  //currency change
  getCurrencyCode: any
  billerID: any
  userID: any;
  Transaction_Type_List: any;
  saveVariable: any;
  paymentTypeDetails: any;
  categoryDetails: any;
  //add stock -form array
  itre = 0;
  test: boolean[] = [];
  productDetails: any;
  valuw: any;
  serial_no_state: any;
  payment_details: any;
  add_billerNameID: any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addStock_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()]),

    });
  }

  ngOnInit(): void {
    this.addLoad();
    // this.addLoad_2();

    this.Transaction_Type_List = [
      { name: 'Deposit', selected: true, id: 1 },
      { name: 'Withdrawal', selected: true, id: 2 },
      { name: 'Purchase Entry', selected: true, id: 3 },
      { name: 'Salary', selected: true, id: 4 },
      { name: 'Pettycash', selected: true, id: 5 },
      { name: 'Logistics', selected: true, id: 51 },
      { name: 'Vendor Order', selected: true, id: 6 },
      { name: 'Invoice Payment', selected: true, id: 7 },
      { name: 'Others', selected: true, id: 8 },
      { name: 'Commission', selected: true, id: 9 },
      { name: 'Quotation Approval', selected: true, id: 10 },
      { name: 'Task Report', selected: true, id: 11 },
      { name: 'Phone Package', selected: true, id: 12 },
      { name: 'Product Issues', selected: true, id: 13 },
      { name: 'Product Entry/Add New Stack', selected: true, id: 15 },
      { name: 'DID Number Entry', selected: true, id: 21 },
      { name: 'DID Number Issues', selected: true, id: 22 },
      { name: 'Demo DID Number Issues', selected: true, id: 23 },
      { name: 'Issued DID Number Reverse', selected: true, id: 24 },
      { name: 'Demo DID Number Reverse', selected: true, id: 25 },
      { name: 'DID Number Issues', selected: true, id: 26 },
      { name: 'DID (NRS) Number Reverse', selected: true, id: 27 },
      { name: 'Offline - Reseller Shopping', selected: true, id: 41 },
      { name: 'Purchase Order', selected: true, id: 35 },
      { name: 'Purchase Entry Waiting', selected: true, id: 36 },
      { name: 'Yearly Product Entry', selected: true, id: 55 },
      { name: 'Product Issues - Waiting for Pre Approval', selected: true, id: 56 },
      { name: ' Demo Product Issues - Waiting for Pre Approval', selected: true, id: 57 },
      { name: 'Product Transfer - Waiting for Pre Approval', selected: true, id: 58 },
    ];

    this.priorityList = [
      { name: 'Low', selected: true, id: 1 },
      { name: 'High', selected: true, id: 2 },
    ];

    this.cashTypeList = [
      { name: 'Debit', selected: true, id: 'D', aliasname: 'D' },
      { name: 'Credit', selected: true, id: 'C', aliasname: 'C' },
    ];
    this.userID = localStorage.getItem('erp_c4c_user_id');

    this.addTransaction_section1 = new FormGroup({
      'billerName': new FormControl(null),
      'trans_Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'priority': new FormControl(null),
      'PE_purchaseEntryNo': new FormControl(null),
      'PE_vendorName': new FormControl(null),
      'PE_purchaseType': new FormControl(null),
      'PE_invoiceNo': new FormControl(null),
      'PE_invoice_Date': new FormControl(null),
      'PE_contentofPurchase': new FormControl(null),
      'PE_poNumber': new FormControl(null),
      'PE_Currency': new FormControl(null),
      'PE_currencyConversionRate': new FormControl(null),
      'PE_taxAmount': new FormControl(null),
      'PE_TaxProvider': new FormControl(null),
      'PE_FreightProvider': new FormControl(null),
      'PE_FreightAmount': new FormControl(null),
      'PE_invoiceAmount': new FormControl(null),
      'CB_PE_AttachMobile': new FormControl(null),
      'PE_FileAttachment': new FormControl(null),
      'PC_Description': new FormControl(null),
      'PC_Type': new FormControl(null),
      'PC_Amount': new FormControl(null),
      'CB_PC_AttachMobile': new FormControl(null),
      'PC_FileAttachment': new FormControl(null),

      'Log_Description': new FormControl(null),
      'Log_Type': new FormControl(null),
      'Log_Amount': new FormControl(null),
      'CB_Log_AttachMobile': new FormControl(null),
      'Log_FileAttachment': new FormControl(null),
      'VendorOrder_Description': new FormControl(null),
      'VendorOrder_FileAttachment': new FormControl(null),
      'InvPayment_InvoiceNumber': new FormControl(null),
      'InvPayment_Biller': new FormControl(null),
      'InvPayment_Customer': new FormControl(null),
      'InvPayment_Total': new FormControl(null),
      'InvPayment_Paid': new FormControl(null),
      'InvPayment_Owing': new FormControl(null),
      'InvPayment_PaymentMethod': new FormControl(null),
      'InvPayment_Amount': new FormControl(null),
      'InvPayment_date': new FormControl(null),
      'InvPayment_Notes': new FormControl(null),
      'InvPayment_Details': new FormControl(null),
      'InvPayment_FileAttachment': new FormControl(null),


      'vendorId': new FormControl(null),
      'lic_pur_date': new FormControl(null),
      'entry_product_category_id': new FormControl(null),
      'entry_product_id': new FormControl(null),
      'entry_quantity': new FormControl(null),
      'entry_serail_no_str': new FormControl(null),

      'StockIssued_categoryName': new FormControl(null),
      'StockIssued_ProductName': new FormControl(null),
      'StockIssued_serialMACNo': new FormControl(null),
      'StockIssued_InvoiceNo': new FormControl(null),
      'StockIssued_Demo': new FormControl(null),
      'StockIssued_Qty': new FormControl(null),
      'StockIssued_AQty': new FormControl(null),

      'StockTransfer_categoryName': new FormControl(null),
      'StockTransfer_ProductName': new FormControl(null),
      'StockTransfer_serialMACNo': new FormControl(null),
      'StockTransfer_Biller': new FormControl(null),
      'StockTransfer_Qty': new FormControl(null),
      'StockTransfer_AQty': new FormControl(null),

      'others_Description': new FormControl(null),
      'others_FileAttachment': new FormControl(null),
    });

    this.VendorManagementForm = new FormGroup({

      'VM_CompanyCode': new FormControl(null),
      'VM_CompanyName': new FormControl(null),
      'VM_VendorName': new FormControl(null),
      'VM_Address1': new FormControl(null),
      'VM_Address2': new FormControl(null),
      'VM_City': new FormControl(null),
      'VM_State': new FormControl(null),
      'VM_Country': new FormControl(null),
      'VM_Phone': new FormControl(null),
      'VM_MobilePhone': new FormControl(null),
      'VM_Fax': new FormControl(null),
      'VM_Email': new FormControl(null),


    });
  }
  get addressControls() {
    return this.addStock_section2.get('addresses') as FormArray
  }


  addAddress(): void {
    this.addresses = this.addStock_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  createAddress(): FormGroup {
    return this.fb.group({

      vendorId: '',
      lic_pur_date: '',
      entry_product_category_id: '',
      entry_product_id: '',
      entry_quantity: '',
      entry_serail_no_str: '',
      mac_no: '',



    });

  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);

  }
  addTextBox(k: any) {

    $("#serial_mac_no").html('');
    var val = $("#AddNewStock_Qty" + k).val();
    //this.valuw=val;
    var ser_str = '';
    var addr = this.addStock_section2.value.addresses;
    console.log("total addr", addr)
    // console.log(addr)
    for (let i = 0; i < val; i++) {

      // $("#serial_mac_no"+i).append('<input type="text " name="text">');

      //$("#serial_mac_no"+k).append('<input type="text" name="Quantity" id="serial_mac_no'+i+'" /><br>');

      ser_str = ser_str + '<input type="text" name="Quantity" class="form-control" id="qty' + i + '" /><br>';

    }

    $('#serial_mac_no' + k).html(ser_str);

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

    if (this.add_billerNameID != 'undefined' || this.add_billerNameID != undefined) {
      api_loadAdd.billerId = this.add_billerNameID;
    } else {
      api_loadAdd.billerId = '';
    }
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
        this.categoryDetails = response.category_det;
        this.DefaultBillerIDValue = response.defaults_biller_id;
        this.getPaymentInvoice();
        let defaultCurrencyIdString =response.default_currency_id;
        let currencyID: number = parseInt(defaultCurrencyIdString);
        setTimeout(() => {
                  $('#biller_name8').val(response.defaults_biller_id);
                 $('#PE_Currency').val(currencyID);
                }, 1000)
        
        this.addTransaction_section1.patchValue({
          'billerName': this.DefaultBillerIDValue,
          'PE_purchaseEntryNo': response.purchase_entry_no,
          'PE_Currency': currencyID,
          'PE_currencyConversionRate': response.currency_converstion,

        });



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
  // addLoad_2() {


  //   let api_req: any = new Object();
  //   let api_loadAdd: any = new Object();
  //   api_req.moduleType = "purchase_entry_addnew";
  //   api_req.api_url = "transaction_entry/purchase_entry_addnew";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_loadAdd.action = "purchase_entry_addnew";


  //   api_loadAdd.user_id = localStorage.getItem('erp_c4c_user_id');
  //   if (this.add_billerNameID != 'undefined' || this.add_billerNameID != undefined) {
  //     api_loadAdd.billerId = this.add_billerNameID;
  //   } else {
  //     api_loadAdd.billerId = '';
  //   }

  //   api_req.element_data = api_loadAdd;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     if (response != '') {

  //       this.currencyDetails = response.currency_det;
  //       this.billerDetails = response.biller_det;
  //       this.vendorDetails = response.vendor_det;
  //       this.purchaseTypeDetails = response.purchase_type_det;
  //       this.taxProviderDetails = response.tax_provider_det;
  //       this.categoryDetails = response.category_det;
  //       this.DefaultBillerIDValue = response.defaults_biller_id;
  //       setTimeout(() => {
  //         $('#add_billerName1').val(response.defaults_biller_id);
  //       }, 1000)


  //       // this.getPaymentInvoice();
  //       this.addEnquiryForm.patchValue({
  //         'add_billerName1': this.DefaultBillerIDValue,
  //         'add_PurchaseEntryNo': response.purchase_entry_no,
  //         'add_Currency': response.default_currency_id,
  //         'add_convAmount': response.currency_converstion,

  //       });



  //     } else {


  //       iziToast.warning({
  //         message: "Invoice Type Details not displayed. Please try again",
  //         position: 'topRight'
  //       });
  //     }
  //   }),
  //     (error: any) => {
  //       iziToast.error({
  //         message: "Sorry, some server issue occur. Please contact admin",
  //         position: 'topRight'
  //       });
  //       console.log("final error", error);
  //     };
  // }
  changeCategory(id: any) {

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "get_prodoct_entry_stock_name";
    api_req.api_url = "addproduct_stock/get_prodoct_entry_stock_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_prodoct_entry_stock_name";
    api_getInvoiceDetails_req.category_id = id;

    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.productDetails = response.product_det;
        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });

  }
  BillerChange(event: any) {
    // alert(event.target.value)
    console.log("event", event)

    this.DefaultBillerIDValue = event.target.value;
    this.add_billerNameID = event.target.value;
    this.addLoad();
  }

  getCurrencyValues(event: any) {
    // alert(this.DefaultBillerIDValue)
    console.log("event.target;", event);
    this.getCurrencyCode = event.target.value;


    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    api_getInvoiceDetails_req.billerId = this.DefaultBillerIDValue;
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

  getPaymentInvoice() {

    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = "transaction_entry";
    api_req.api_url = "transaction_entry/payment_entry_invoice_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getPaymentDetails_req.action = "payment_entry_invoice_no";
    api_getPaymentDetails_req.billerId = this.DefaultBillerIDValue;
    api_req.element_data = api_getPaymentDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {

        this.InvoicePaymentList = response.invoice_list;

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }
  getProductserialState(event: any) {
    var productID = event.target.value;

    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = "get_product_serial_state";
    api_req.api_url = "product_stock/get_product_serial_state";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getPaymentDetails_req.action = "get_product_serial_state";
    api_getPaymentDetails_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getPaymentDetails_req.product_id = productID;
    api_req.element_data = api_getPaymentDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {

        this.serial_no_state = response.serial_state[0].serial_no_state;
        // alert(this.serial_no_state)

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }
  InvoiceChangeValue(event: any) {
    var id_b = event.target.value;

    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = "transaction_entry";
    api_req.api_url = "transaction_entry/payment_entry_payment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getPaymentDetails_req.action = "payment_entry_payment_details";
    api_getPaymentDetails_req.billId = id_b;
    api_req.element_data = api_getPaymentDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {

        this.amountPaid = response.amountPaid;
        this.balance = response.balance;
        this.billerName = response.billerName;
        this.customerName = response.customerName;
        this.netPayment = response.netPayment;
        this.paymentNote = response.paymentNote;
        this.paymentTypeDetails = response.payment_type_det;
        this.payment_details = response.payment_details;

        alert(this.payment_details)
        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }

  addVendorNameGo() {
    $('#VendorManagementId').modal('show');
  }


  saveVendorManagement() {

  }

  saveTransaction() {
    this.spinner.show();
    var data = new FormData();
    if (this.addTransaction_section1.value.billerName === null) {

      iziToast.error({
        message: "Select Biller",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }
    else {
      data.append('company', this.addTransaction_section1.value.billerName);
    }

    if (this.addTransaction_section1.value.trans_Date === null) {

      iziToast.error({
        message: "Select Date",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }
    else {
      data.append('transaction_date', this.addTransaction_section1.value.trans_Date);
    }

    if (this.addTransaction_section1.value.priority === null) {

      iziToast.error({
        message: "Select Priority",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }
    else {
      data.append('priority', this.addTransaction_section1.value.priority);
    }

    if (this.Select_Transaction_Type === null) {

      iziToast.error({
        message: "Select Type of Transaction ",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }
    else {
      data.append('type_of_trans', this.Select_Transaction_Type);
    }


    data.append('user_id', this.userID);
    //purchase entry
    if (this.Select_Transaction_Type == 3) {
      this.saveVariable = "purchase_entry_save";
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

          data.append("trans_file[]", this.myFiles[i]);
        }

      }
      // data.append('action', "purchase_entry_save");
    }
    if (this.Select_Transaction_Type == 5) {
      this.saveVariable = "petty_cash_save";
      data.append('petty_description', this.addTransaction_section1.value.PC_Description);
      data.append('petty_type', this.addTransaction_section1.value.PC_Type);
      data.append('petty_amount', this.addTransaction_section1.value.PC_Amount);
      data.append('petty_attach_mobile', this.addTransaction_section1.value.CB_PC_AttachMobile);
      // data.append('file_attachment_name', this.addTransaction_section1.value.PC_FileAttachment);
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {

          data.append("trans_file[]", this.myFiles[i]);
        }

      }
      // data.append('action', "petty_cash_save");

    }

    if (this.Select_Transaction_Type == 51) {
      this.saveVariable = "logistics_save";
      data.append('logistics_description', this.addTransaction_section1.value.Log_Description);
      data.append('logistics_type', this.addTransaction_section1.value.Log_Type);
      data.append('logistics_amount', this.addTransaction_section1.value.Log_Amount);
      // data.append('logistics_attach_mobile', this.addTransaction_section1.value.CB_Log_AttachMobile);

      // data.append('file_attachment_name', this.addTransaction_section1.value.Log_FileAttachment);
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {

          data.append("trans_file[]" + i, this.myFiles[i]);
        }

      }

    }
    if (this.Select_Transaction_Type == 6) {
      this.saveVariable = "vendor_order_save";
      data.append('other_description', this.addTransaction_section1.value.VendorOrder_Description);
      // data.append('file_attachment_name', this.addTransaction_section1.value.VendorOrder_FileAttachment);
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {

          data.append("trans_file[]", this.myFiles[i]);
        }

      }
    }

    if (this.Select_Transaction_Type == 7) {
      this.saveVariable = "invoice_payment_save";
      data.append('invoice_no', this.addTransaction_section1.value.InvPayment_InvoiceNumber);
      data.append('payment_nettotal', this.netPayment);
      data.append('payment_billerName', this.billerName);
      data.append('payment_amountPaid', this.amountPaid);
      data.append('payment_customerName', this.customerName);
      data.append('payment_owing', this.balance);
      data.append('paidAmount', this.addTransaction_section1.value.InvPayment_Amount);
      data.append('paymentDate', this.addTransaction_section1.value.InvPayment_date);
      data.append('payment_method', this.addTransaction_section1.value.InvPayment_PaymentMethod);
      data.append('note', this.addTransaction_section1.value.InvPayment_Notes);
      data.append('payment_paymentNote', this.addTransaction_section1.value.InvPayment_Details);
      // data.append('file_attachment_name', this.addTransaction_section1.value.InvPayment_FileAttachment);
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {

          data.append("trans_file[]", this.myFiles[i]);
        }

      }
    }

    if (this.Select_Transaction_Type == 8) {
      this.saveVariable = "others_save";
      data.append('other_description', this.addTransaction_section1.value.others_Description);
      data.append('file_attachment_name', this.addTransaction_section1.value.others_FileAttachment);
    }
    if (this.Select_Transaction_Type == 15) {
      this.saveVariable = "add_new_stock_save";

      var addr = this.addStock_section2.value.addresses;


      // for (let i = 0; i < addr.length; i++) {

      //  var x=JSON.stringify(addr);
      //   addr[i].vendorId = $('#vendorId' + i).val();
      //   addr[i].lic_pur_date = $('#lic_pur_date' + i).val();
      //   addr[i].entry_product_category_id = $('#entry_product_category_id' + i).val();
      //   addr[i].entry_product_id = $('#entry_product_id' + i).val();
      //   addr[i].entry_quantity = $('#entry_quantity' + i).val();
      //   addr[i].entry_serail_no_str = $('#entry_serail_no_str' + i).val();


      // }

      data.append('values', JSON.stringify(addr));

    }



    // data.append('action', "purchase_entry_save");

    var self = this;
    $.ajax({
      type: 'POST',

      url: 'https://laravelapi.erp1.cal4care.com/api/transaction_entry/' + this.saveVariable + '',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        this.spinner.hide();
        self.goBackTransaction();
        if (result.status == true) {
          this.spinner.hide();
          this.router.navigate(['/transactionnew']);
          self.goBackTransaction();
          console.log(result);


          iziToast.success({
            message: "Transaction details Saved successfully",
            position: 'topRight'
          });
          this.spinner.hide();
        }
        else {
          this.spinner.hide();

          iziToast.warning({
            message: "Transaction details not Saved",
            position: 'topRight'
          });
        }
      },
      error: function (err: any) {
        this.spinner.hide();
        console.log("err", err)
        iziToast.error({
          message: "Server Side Error",
          position: 'topRight'
        });

      }

    })
    this.spinner.hide();

  }
  SelectTransactionType_PE() {
    this.Select_Transaction_Type = 3;
  }
  SelectTransactionType_PC() {
    this.Select_Transaction_Type = 5;
  }
  SelectTransactionType_Log() {
    this.Select_Transaction_Type = 51;
  }
  SelectTransactionType_VO() {
    this.Select_Transaction_Type = 6;
  }
  SelectTransactionType_IP() {
    this.Select_Transaction_Type = 7;
  }
  SelectTransactionType_ANS() {
    this.Select_Transaction_Type = 15;
  }
  SelectTransactionType_SI() {
    this.Select_Transaction_Type = 56;
  }
  SelectTransactionType_ST() {
    this.Select_Transaction_Type = 58;
  }
  SelectTransactionType_Others() {
    this.Select_Transaction_Type = 8;
  }


  goBackTransaction() {
    this.router.navigate(['/transactionnew']);
  }
  goBackADDTransaction() {
    this.router.navigate(['/AddTransactionNew']);
    window.location.reload();
  }

}
