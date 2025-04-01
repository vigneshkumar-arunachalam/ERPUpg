import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-transaction-new',
  templateUrl: './edit-transaction-new.component.html',
  styleUrls: ['./edit-transaction-new.component.css'],
})
export class EditTransactionNewComponent implements OnInit {
  addTransaction_section1: FormGroup;
  VendorManagementForm: FormGroup;

  //file attachment
  file: File;
  getResult: any;
  credit_attachment_id: any;
  fileAttachCustomerID: any;
  myFiles: string[] = [];
  myFilesUpdate: string[] = [];
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
  updateVariable: any;
  //pe file
  PE_FileLength: any;
  //currency change
  getCurrencyCode: any;
  billerID: any;
  userID: any;
  TransactionApprovalID: any;
  isReadOnly: boolean = false;
  //file attachment
  getFileAttachmentResult: any;
  //transaction type
  Transaction_Type_List: any;
  Transaction_Type_Variable: any;
  fileIterationVariable: any;
  edit_TransactionTpeID: any;
  //petty cash
  PC_edit_TypeValue: any;
  processDate: any;
  //inv payment
  DefaultBillerIDValue: any;
  InvoicePaymentList: any;
  InvPayment_biller: any;
  InvPayment_customer: any;
  InvPayment_total: any;
  InvPayment_owing: any;
  InvPayment_paid: any;

  amountPaid: any;
  balance: any;
  billerName: any;
  customerName: any;
  netPayment: any;
  paymentNote: any;
  paymentTypeDetails: any;
  purchaseType: any;
  categoryDetails: any;
  productDetails: any;
  prodResult: any;
  Clicked: boolean = false;
  add_billerNameID: any;
  PC_billerDetails: any;
  fileAttachment: any;

  constructor(
    private serverService: ServerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // console.log("params output value", params);

      this.TransactionApprovalID = params['e_transaction_approval_id'];
      this.edit_TransactionTpeID = params['e_Transaction_Type_id'];

      // console.log("Transactional approval ID", this.TransactionApprovalID);
      console.log('e_Transaction_Type_id', this.edit_TransactionTpeID);
      console.log(
        'e_Transaction_Type_id:',
        this.edit_TransactionTpeID,
        'Type:',
        typeof this.edit_TransactionTpeID
      );
    });

    this.addLoad();

    // if(this.edit_TransactionTpeID==5){
    //   $('#PurchaseEntry').removeClass('active');
    //   $('#PurchaseEntry').addClass('fade');
    //   $('#PettyCash').removeClass('fade');

    //   $('#PettyCash').addClass('active');
    //     this.editPettyCash();
    // }
    // if(this.edit_TransactionTpeID==7){
    //   $('#PurchaseEntry').removeClass('active');

    //   $('#InvoicePayment').addClass('active');
    //     this.Logistics();
    // }
    // this.editPurchaseEntry();
    $('#PurchaseEntry_link').removeClass('active');
    switch (this.edit_TransactionTpeID) {
      case '3':
        $('#PurchaseEntry_link').addClass('active');
        this.editPurchaseEntry();
        // setTimeout(() => {

        // }, 2000)

        break;
      case '5':
        $('#PurchaseEntry').addClass('fade');
        $('#PurchaseEntry').removeClass('active');
        $('#PettyCash_link').addClass('active');
        $('#PettyCash').removeClass('fade');
        $('#PettyCash').addClass('active');
        this.editPettyCash();
        break;

      case '6':
        $('#VendorOrder_link').addClass('active');
        this.editVendorOrder();
        break;

      case '7':
        $('#PurchaseEntry').removeClass('active');
        $('#PurchaseEntry').addClass('fade');
        $('#InvoicePayment_link').addClass('active');
        $('#InvoicePayment').removeClass('fade');
        $('#InvoicePayment').addClass('active');
        this.editInvoicePayment();
        break;
      case '8':
        $('#Others_link').addClass('active');
        this.editOthers();
        break;
      case '15':
        $('#PurchaseEntry').addClass('fade');
        $('#PurchaseEntry').removeClass('active');
        $('#AddNewStock_link').addClass('active');
        $('#AddNewStock').removeClass('fade');
        $('#AddNewStock').addClass('active');
        this.editNewStock();

        break;
      case '51':
        $('#PurchaseEntry').removeClass('active');
        $('#PurchaseEntry').addClass('fade');
        $('#Logistics_link').addClass('active');
        $('#Logistics_link').removeClass('fade');
        $('#Logistics_link').addClass('active');

        this.editlogistics();

        break;
      case '56':
        $('#StockIssued_link').addClass('active');
        break;
      case '58':
        $('#StockTransfer_link').addClass('active');
        break;

      default:
        $('#PurchaseEntry_link').addClass('active');
        break;
    }

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
      {
        name: 'Product Issues - Waiting for Pre Approval',
        selected: true,
        id: 56,
      },
      {
        name: ' Demo Product Issues - Waiting for Pre Approval',
        selected: true,
        id: 57,
      },
      {
        name: 'Product Transfer - Waiting for Pre Approval',
        selected: true,
        id: 58,
      },
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
      billerName: new FormControl(null),
      trans_Date: new FormControl(null),
      // 'trans_Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      priority: new FormControl(null),
      PE_purchaseEntryNo: new FormControl(null),
      PE_vendorName: new FormControl(null),
      PE_purchaseType: new FormControl(null),
      PE_invoiceNo: new FormControl(null),
      PE_invoice_Date: new FormControl(null),
      PE_contentofPurchase: new FormControl(null),
      PE_poNumber: new FormControl(null),
      PE_Currency: new FormControl(null),
      PE_currencyConversionRate: new FormControl(null),
      PE_taxAmount: new FormControl(null),
      PE_TaxProvider: new FormControl(null),
      PE_FreightProvider: new FormControl(null),
      PE_FreightAmount: new FormControl(null),
      PE_invoiceAmount: new FormControl(null),
      CB_PE_AttachMobile: new FormControl(null),
      PE_FileAttachment: new FormControl(null),

      PC_Description: new FormControl(null),
      PC_Type: new FormControl(null),
      PC_Amount: new FormControl(null),
      CB_PC_AttachMobile: new FormControl(null),
      PC_FileAttachment: new FormControl(null),

      Log_Description: new FormControl(null),
      Log_Type: new FormControl(null),
      Log_Amount: new FormControl(null),
      CB_Log_AttachMobile: new FormControl(null),
      Log_FileAttachment: new FormControl(null),

      VendorOrder_Description: new FormControl(null),
      VendorOrder_FileAttachment: new FormControl(null),

      InvPayment_InvoiceNumber: new FormControl(null),
      InvPayment_Biller: new FormControl(null),
      InvPayment_Customer: new FormControl(null),
      InvPayment_Total: new FormControl(null),
      InvPayment_Paid: new FormControl(null),
      InvPayment_Owing: new FormControl(null),
      InvPayment_PaymentMethod: new FormControl(null),
      InvPayment_Amount: new FormControl(null),
      InvPayment_date: new FormControl(null),
      InvPayment_Notes: new FormControl(null),
      InvPayment_Details: new FormControl(null),
      InvPayment_FileAttachment: new FormControl(null),

      AddNewStock_vendorName: new FormControl(null),
      AddNewStock_PurDate: new FormControl(null),
      AddNewStock_CategoryName: new FormControl(null),
      AddNewStock_ProductName: new FormControl(null),
      AddNewStock_Qty: new FormControl(null),
      AddNewStock_SNo: new FormControl(null),

      StockIssued_categoryName: new FormControl(null),
      StockIssued_ProductName: new FormControl(null),
      StockIssued_serialMACNo: new FormControl(null),
      StockIssued_InvoiceNo: new FormControl(null),
      StockIssued_Demo: new FormControl(null),
      StockIssued_Qty: new FormControl(null),
      StockIssued_AQty: new FormControl(null),

      StockTransfer_categoryName: new FormControl(null),
      StockTransfer_ProductName: new FormControl(null),
      StockTransfer_serialMACNo: new FormControl(null),
      StockTransfer_Biller: new FormControl(null),
      StockTransfer_Qty: new FormControl(null),
      StockTransfer_AQty: new FormControl(null),

      others_Description: new FormControl(null),
      others_FileAttachment: new FormControl(null),

      e_Description: new FormControl(null),
      e_Type: new FormControl(null),
      e_Amount: new FormControl(null),
      e_VendorName: new FormControl(null),
      e_purchase_Date: new FormControl(null),
      e_CategoryName: new FormControl(null),
      e_ProductName: new FormControl(null),
      e_Quantity: new FormControl(null),
      e_FileAttachment: new FormControl(null),
    });

    this.VendorManagementForm = new FormGroup({
      VM_CompanyCode: new FormControl(null),
      VM_CompanyName: new FormControl(null),
      VM_VendorName: new FormControl(null),
      VM_Address1: new FormControl(null),
      VM_Address2: new FormControl(null),
      VM_City: new FormControl(null),
      VM_State: new FormControl(null),
      VM_Country: new FormControl(null),
      VM_Phone: new FormControl(null),
      VM_MobilePhone: new FormControl(null),
      VM_Fax: new FormControl(null),
      VM_Email: new FormControl(null),
    });
    // if(this.edit_TransactionTpeID==5){
    //   $('#PurchaseEntry').removeClass('active');
    //   $('#PettyCash').addClass('active');

    //   setTimeout(() => {
    //     this.editPettyCash();
    //   }, 5000)
    // }
  }
  CB_Fn_PE_AttachMobile(event: any) {}
  CB_Fn_PC_AttachMobile(event: any) {}
  CB_Fn_Log_AttachMobile(event: any) {}
  fileAttachmentEvent(event: any) {
    this.PE_FileLength = event.target.files.length;
    // alert(event.target.files.length);
    this.file = event.target.files[0];
    for (let i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files &&
        event.target.files[i] &&
        this.file.size > 2097152
      ) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // this.localUrl = event.target.result;
        };
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
    } else {
      //  console.log('kavin', $("#PE_FileAttachment_new").val(''))
      $('#PE_FileAttachment_new').val('');
      iziToast.error({
        message:
          'Sorry, Maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
    }
  }
  fileAttachmentEventPE2(event: any) {
    if (event.target.files.length < 4) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    } else {
      iziToast.error({
        message:
          'Sorry, Maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
    }
  }
  fileAttachmentEventUpdate(event: any) {
    //  console.log(this.getFileAttachmentResult.length)
    this.fileIterationVariable =
      this.getFileAttachmentResult.length + event.target.files.length;
    if (this.fileIterationVariable < 4) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFilesUpdate.push(event.target.files[i]);
        // console.log("this.myFilesUpdate.length", this.myFilesUpdate.length)
      }
    } else {
      // console.log('kavin', $("#PE_FileAttachment_new").val(''))
      $('#PE_FileAttachment_new').val('');
      iziToast.error({
        message:
          'Sorry, Maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
    }
  }

  addLoad() {
    let api_req: any = new Object();
    let api_loadAdd: any = new Object();
    api_req.moduleType = 'purchase_entry_addnew';
    api_req.api_url = 'transaction_entry/purchase_entry_addnew';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadAdd.action = 'purchase_entry_addnew';
    if (
      this.add_billerNameID != 'undefined' ||
      this.add_billerNameID != undefined
    ) {
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
        this.DefaultBillerIDValue = response.defaults_biller_id;
        this.categoryDetails = response.category_det;
        let defaultCurrencyIdString = response.default_currency_id;
        let currencyID: number = parseInt(defaultCurrencyIdString);
        console.log('currencyID', currencyID);
        this.getPaymentInvoice();
        this.addTransaction_section1.patchValue({
          // 'setInvoice': response.selected_invoice_type
        });
        // setTimeout(() => {
        //   $('#biller_name9').val(response.defaults_biller_id);
        //  $('#Currency9').val(currencyID);
        // }, 1000)
        this.addTransaction_section1.patchValue({
          billerName: this.DefaultBillerIDValue,
          PE_purchaseEntryNo: response.purchase_entry_no,
          PE_Currency: currencyID,
          PE_currencyConversionRate: response.currency_converstion,
          PE_vendorName: 815,
        });
      } else {
        iziToast.warning({
          message: 'Invoice Type Details not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }
  InvoiceChangeValue(event: any) {
    var id_b = event.target.value;

    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/payment_entry_payment_details';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getPaymentDetails_req.action = 'payment_entry_payment_details';
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

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,
        });
      } else {
      }
    });
  }
  getPaymentInvoice() {
    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/payment_entry_invoice_no';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getPaymentDetails_req.action = 'payment_entry_invoice_no';
    api_getPaymentDetails_req.billerId = this.DefaultBillerIDValue;
    api_getPaymentDetails_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getPaymentDetails_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.InvoicePaymentList = response.invoice_list;

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,
        });
      } else {
      }
    });
  }

  editPurchaseEntry() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/purchase_entry_edit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'purchase_entry_edit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.billerID = response.transaction_details[0].billerId;
        this.PC_billerDetails = response.billerDetails;
        this.currencyDetails = response.currency_det;
        this.vendorDetails = response.vendor_det;
        this.purchaseTypeDetails = response.purchase_type_det;
        this.taxProviderDetails = response.tax_provider_det;
        this.categoryDetails = response.category_det;
        this.addTransaction_section1.patchValue({
          billerName: response.transaction_details[0].billerId,
          trans_Date: response.transaction_details[0].transaction_date,
          priority: response.transaction_details[0].priority,
          PE_purchaseEntryNo: response.purchaseentry_details[0].purchaseEntryNo,
          PE_vendorName: response.purchaseentry_details[0].vendorId,
          PE_purchaseType: response.purchaseentry_details[0].purchase_type_id,
          PE_invoiceNo: response.purchaseentry_details[0].invoiceNo,
          PE_invoice_Date: response.purchaseentry_details[0].invoiceDate,
          PE_contentofPurchase:
            response.purchaseentry_details[0].content_purchase,
          PE_poNumber: response.purchaseentry_details[0].poNo,
          PE_Currency: response.purchaseentry_details[0].currencyId,
          PE_currencyConversionRate:
            response.purchaseentry_details[0].conversionRate,
          PE_taxAmount: response.purchaseentry_details[0].taxAmount,
          PE_TaxProvider: response.purchaseentry_details[0].tax_provider,
          PE_FreightProvider:
            response.purchaseentry_details[0].freight_provider,
          PE_FreightAmount: response.purchaseentry_details[0].freight_amt,
          PE_invoiceAmount: response.purchaseentry_details[0].invoiceAmount,
          PE_FileAttachment:
            response.transaction_details[0].trans_attachment_filename,
          //  'e_VendorName': response.purchaseentry_details[0].billerId,
          //  'e_purchase_Date': response.purchaseentry_details[0].billerId,
          //  'e_CategoryName': response.purchaseentry_details[0].billerId,
          //  'e_ProductName': response.purchaseentry_details[0].billerId,
          //  'e_Quantity': response.purchaseentry_details[0].billerId,
        });

        if (response.trans_file == null) {
          this.spinner.hide();
          this.getFileAttachmentResult = [];
        } else {
          this.spinner.hide();
          this.getFileAttachmentResult = response.trans_file;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable =
          response.transaction_details[0].type_of_trans;
        //  console.log(" this.Transaction_Type_Variable - purchase entry", this.Transaction_Type_Variable)

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        this.spinner.hide();
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }
  editPettyCash() {
    // alert(this.TransactionApprovalID)
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/petty_cash_edit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'petty_cash_edit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        (this.PC_edit_TypeValue = response.pettycash_details[0].type),
          (this.PC_billerDetails = response.billerDetails);

        this.addTransaction_section1.patchValue({
          billerName: response.transaction_details[0].billerId,
          trans_Date: response.transaction_details[0].transaction_date,
          priority: response.transaction_details[0].priority,

          PC_Description: response.pettycash_details[0].description,
          PC_Type: response.pettycash_details[0].type,
          PC_Amount: response.pettycash_details[0].amount,
          CB_PC_AttachMobile: response.pettycash_details[0].mobile_type,
        });

        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.trans_file;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable =
          response.transaction_details[0].type_of_trans;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }

  formatDate(dateString: string): string {
    // console.log('dateString', dateString);

    if (!dateString) return '';

    // Split the date manually (assuming DD/MM/YYYY format)
    let [day, month, year] = dateString.split('/').map(Number);

    // Create a new Date object
    let dateObj = new Date(year, month - 1, day);

    // Ensure the date is valid
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date received from API:', dateString);
      return '';
    }

    // Format date as YYYY-MM-DD using Intl
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(dateObj)
      .split('/')
      .reverse()
      .join('-');
  }

  editlogistics() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'edit/transactionedit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'edit/transactionedit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.type_of_trans = this.edit_TransactionTpeID;
    api_loadEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      
      if (response != '') {
        let transDate = this.formatDate(response.data.Date);
        this.fileAttachment = response.data.attachment_filename1;

        this.addTransaction_section1.patchValue({
          billerName: response.data.billerId,
          trans_Date: transDate,
          priority: response.data.priority,

          Log_Description: response.data.logistics_description,
          Log_Type: response.data.logistics_type,
          Log_Amount: response.data.logistics_amount,
          CB_Log_AttachMobile: response.data.attachment_filename1,
        });

        this.spinner.hide();
        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.attachment_filename1;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable = this.edit_TransactionTpeID;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }
  editVendorOrder() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'edit/transactionedit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'edit/transactionedit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.type_of_trans = this.edit_TransactionTpeID;
    api_loadEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        let transDate = this.formatDate(response.data.Date);
        this.fileAttachment = response.data.attachment_filename1;
        this.addTransaction_section1.patchValue({
          billerName: response.data.billerId,
          trans_Date: transDate,
          priority: response.data.priority,

          VendorOrder_Description: response.data.other_description,
        });

        this.spinner.hide();

        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.attachment_filename1;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable = this.edit_TransactionTpeID;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }
  editOthers() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'edit/transactionedit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'edit/transactionedit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.type_of_trans = this.edit_TransactionTpeID;
    api_loadEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        let transDate = this.formatDate(response.data.Date);
        this.fileAttachment = response.data.attachment_filename1;
        this.addTransaction_section1.patchValue({
          billerName: response.data.billerId,
          trans_Date: transDate,
          priority: response.data.priority,

          others_Description: response.data.other_description,
        });
        this.spinner.hide();
        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.attachment_filename1;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable = this.edit_TransactionTpeID;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }

  InvoiceChangeValue123(selectedBillId: any) {
    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/payment_entry_payment_details';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getPaymentDetails_req.action = 'payment_entry_payment_details';
    api_getPaymentDetails_req.billId = selectedBillId;
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

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,
        });
      } else {
      }
    });
  }

  editInvoicePayment() {
    // alert('hi')
    this.spinner.show();
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'edit/transactionedit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'edit/transactionedit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_loadEdit.type_of_trans = this.edit_TransactionTpeID;
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.InvoiceChangeValue123(response.data.invoice_no);
        let transDate = this.formatDate(response.data.Date);
        let payment_date = this.formatDate(response.data.processDate);
        this.fileAttachment = response.data.attachment_filename1;
        this.addTransaction_section1.patchValue({
          billerName: response.data.billerId,
          trans_Date: transDate,
          priority: response.data.priority,

          InvPayment_InvoiceNumber: response.data.invoice_no,
          // 'InvPayment_Biller': response.data.billerId,
          // 'InvPayment_Customer': response.data.customerName,
          // 'InvPayment_Total': response.data.netPayment,

          // 'InvPayment_Paid': response.data.mobile_type,
          // 'InvPayment_Owing': response.data.netPayment,
          InvPayment_Amount: response.data.paidAmount,
          InvPayment_date: payment_date,
          InvPayment_PaymentMethod: response.data.paymentMode,
          InvPayment_Notes: response.data.notes,
          InvPayment_Details: response.data.mobile_type,

          InvPayment_FileAttachment: response.data.trans_attachment_filename,

          // 'PE_FileAttachment': response.data.trans_attachment_filename,
        });

        this.spinner.hide();
        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.trans_file;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable =
          response.transaction_details[0].type_of_trans;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }
  editInvoicePayment123() {
    // alert('hi')

    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/invoice_payment_edit';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'invoice_payment_edit';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.amountPaid = response.amountPaid;
        this.balance = response.balance;
        this.billerName = response.billerName;
        this.customerName = response.customerName;
        this.netPayment = response.netPayment;
        this.paymentNote = response.paymentNote;
        this.paymentTypeDetails = response.payment_type_det;

        // this.PC_edit_TypeValue=response.pettycash_details[0].type,
        this.processDate = response.paymentprocess_details[0].processDate;
        this.billerName = response.paymentprocess_details[0].billerName;
        this.customerName = response.paymentprocess_details[0].customerName;
        this.netPayment = response.paymentprocess_details[0].netPayment;
        this.paymentNote = response.paymentprocess_details[0].netPayment;
        this.balance = response.paymentprocess_details[0].netPayment;
        this.purchaseType = response.purchase_type;

        this.addTransaction_section1.patchValue({
          billerName: response.transaction_details[0].billerId,
          trans_Date: response.transaction_details[0].transaction_date,
          priority: response.transaction_details[0].priority,

          InvPayment_InvoiceNumber: response.paymentprocess_details[0].billId,
          InvPayment_Biller: response.paymentprocess_details[0].billerId,
          InvPayment_Customer: response.paymentprocess_details[0].customerName,
          InvPayment_Total: response.paymentprocess_details[0].netPayment,

          // 'InvPayment_Paid': response.paymentprocess_details[0].mobile_type,
          InvPayment_Owing: response.paymentprocess_details[0].netPayment,
          InvPayment_Amount: response.paymentprocess_details[0].paidAmount,
          InvPayment_date: response.paymentprocess_details[0].processDate,
          InvPayment_PaymentMethod:
            response.paymentprocess_details[0].paymentMode,
          InvPayment_Notes: response.paymentprocess_details[0].notes,
          InvPayment_Details: response.paymentprocess_details[0].mobile_type,

          InvPayment_FileAttachment:
            response.transaction_details[0].trans_attachment_filename,

          // 'PE_FileAttachment': response.transaction_details[0].trans_attachment_filename,
        });

        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.trans_file;
        }

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable =
          response.transaction_details[0].type_of_trans;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }

  editNewStock() {
    let api_req: any = new Object();
    let api_loadEdit: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/editNewStock';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_loadEdit.action = 'editNewStock';
    api_loadEdit.transaction_approval_id = this.TransactionApprovalID;
    api_req.element_data = api_loadEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        //  console.log("response.editData.product_category_id",response.editData.product_category_id)

        this.changeCategory(response.editData.product_category_id);
        setTimeout(() => {
          // <<<---using ()=> syntax
          this.changeCategory(response.editData.product_category_id);
        }, 3000);

        this.addTransaction_section1.patchValue({
          billerName: response.editData.billerId,
          trans_Date: response.editData.date,
          priority: response.editData.priority,

          AddNewStock_vendorName: response.editData.vendorId_edit,
          AddNewStock_PurDate: response.editData.lic_pur_date,
          AddNewStock_CategoryName: response.editData.product_category_id,
          AddNewStock_ProductName: response.editData.productId,
          AddNewStock_Qty: response.editData.qty,
        });

        if (response.trans_file == null) {
          this.getFileAttachmentResult = [];
        } else {
          this.getFileAttachmentResult = response.trans_file;
        }
        this.prodResult = response.editData.productList;

        //  switching between tabs

        $('#PurchaseEntry_link').removeClass('active');
        this.Transaction_Type_Variable = response.editData.type_of_trans;

        // console.log(" this.Transaction_Type_Variable -- petty cash", this.Transaction_Type_Variable);

        switch (this.Transaction_Type_Variable) {
          case 3:
            $('#PurchaseEntry_link').addClass('active');
            break;
          case 5:
            $('#PettyCash_link').addClass('active');
            break;

          case 6:
            $('#VendorOrder_link').addClass('active');
            break;
          case 7:
            $('#InvoicePayment_link').addClass('active');
            break;
          case 8:
            $('#Others_link').addClass('active');
            break;
          case 15:
            $('#AddNewStock_link').addClass('active');
            break;
          case 51:
            $('#Logistics_link').addClass('active');
            break;
          case 56:
            $('#StockIssued_link').addClass('active');
            break;
          case 58:
            $('#StockTransfer_link').addClass('active');
            break;

          default:
            $('#PurchaseEntry_link').addClass('active');
            break;
        }
      } else {
        iziToast.warning({
          message:
            'Edit Value of Transaction entry not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }

  changeCategory(id: any) {
    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = 'get_prodoct_entry_stock_name';
    api_req.api_url = 'addproduct_stock/get_prodoct_entry_stock_name';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getInvoiceDetails_req.action = 'get_prodoct_entry_stock_name';
    api_getInvoiceDetails_req.category_id = id;

    api_req.element_data = api_getInvoiceDetails_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.productDetails = response.product_det;
        this.addTransaction_section1.patchValue({
          // 'AddNewStock_ProductName': response.product_det,
        });
      } else {
      }
    });
  }
  fileAttachmentDelete(file_id: any, file_index: any) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result: any) => {
      if (result.value) {
        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = 'transaction_entry';

        api_req.api_url = 'transaction_entry/edit_file_atttachment_delete';
        api_req.api_type = 'web';
        api_req.access_token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
        fileattachDelete_req.action = 'edit_file_atttachment_delete';
        fileattachDelete_req.file_id = file_id;
        fileattachDelete_req.file_index = file_index;

        fileattachDelete_req.transaction_approval_id =
          this.TransactionApprovalID;

        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.editPurchaseEntry();
            this.editPettyCash();
            iziToast.success({
              message: 'File Attachment Deleted successfully',
              position: 'topRight',
            });
            this.editPurchaseEntry();
          } else {
            iziToast.warning({
              message: 'File Attachment not deleted. Please try again',
              position: 'topRight',
            });
            // this.editPurchaseEntry();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    });
  }
  getCurrencyConversion(event: any) {
    this.getCurrencyCode = event.target.value;
  }
  getCurrencyValues(event: any) {
    // console.log("event.target;", event.target);
    this.getCurrencyCode = event.target.value;
    // console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = 'proforma';
    api_req.api_url = 'proforma/get_currency_values';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getInvoiceDetails_req.action = 'get_currency_values';
    api_getInvoiceDetails_req.billerId = this.billerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.addTransaction_section1.patchValue({
          PE_currencyConversionRate: response.currency_live_val,
        });
      } else {
      }
    });
  }

  addVendorNameGo() {
    $('#VendorManagementId').modal('show');
  }
  BillerChange(event: any) {
    this.billerID = event.target.value;
    this.add_billerNameID = event.target.value;
    // this.addLoad();
    this.getPurchaseDetails();
  }
  getPurchaseDetails() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = 'transaction_entry';
    api_req.api_url = 'transaction_entry/getPurchaseDetails';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_recurring.action = 'getPurchaseDetails';
    api_recurring.user_id = localStorage.getItem('erp_c4c_user_id');
    api_recurring.biller_id = this.add_billerNameID;
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if ((response.status = true)) {
        this.spinner.hide();

        this.addTransaction_section1.patchValue({
          billerName: response.defaults_biller_id,
          PE_Currency: response.default_currency_id,
          PE_currencyConversionRate:
            response.currency_converstion[0].currency_live_val,
          PE_purchaseEntryNo: response.purchase_entry_no,
        });
      }
    });
  }

  saveVendorManagement() {}

  UpdateTransaction(event: any) {
    // console.log("mouse event", event.pointerType)
    if (event.pointerType == 'mouse' || event.pointerType == '') {
      // this variable is used to find button click as mouse or kyboard enter
      this.Clicked = true;
    }
    var data = new FormData();

    data.append('company', this.addTransaction_section1.value.billerName);
    data.append(
      'transaction_date',
      this.addTransaction_section1.value.trans_Date
    );
    data.append('priority', this.addTransaction_section1.value.priority);
    data.append('type_of_trans', this.edit_TransactionTpeID);
    data.append('user_id', this.userID);
    //purchase entry
    if (this.edit_TransactionTpeID == 3) {
      this.updateVariable = 'purchase_entry_update';
      data.append('transaction_approval_id', this.TransactionApprovalID);

      var PENO = this.addTransaction_section1.value.PE_purchaseEntryNo;
      if (PENO === null || PENO === undefined || PENO === 'undefined') {
        iziToast.error({
          message: 'Fill Purchase Entry Number  ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'purchaseEntryNo',
          this.addTransaction_section1.value.PE_purchaseEntryNo
        );
      }

      var vendorid = this.addTransaction_section1.value.PE_vendorName;
      if (
        vendorid === null ||
        vendorid === undefined ||
        vendorid === 'undefined'
      ) {
        iziToast.error({
          message: 'Fill Vendor Name  ',
          position: 'topRight',
        });

        this.spinner.hide();
        return false;
      } else {
        data.append(
          'vendorId',
          this.addTransaction_section1.value.PE_vendorName
        );
      }

      var purchasetype = this.addTransaction_section1.value.PE_purchaseType;
      if (
        purchasetype === null ||
        purchasetype === undefined ||
        purchasetype === 'undefined'
      ) {
        iziToast.error({
          message: 'Fill Purchase Type  ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'purchase_type_id',
          this.addTransaction_section1.value.PE_purchaseType
        );
      }

      var invoiceNUm = this.addTransaction_section1.value.PE_invoiceNo;
      if (
        invoiceNUm === null ||
        invoiceNUm === '' ||
        invoiceNUm === undefined ||
        invoiceNUm === 'undefined'
      ) {
        iziToast.error({
          message: 'Fill Invoice Number  ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'invoiceNo',
          this.addTransaction_section1.value.PE_invoiceNo
        );
      }
      var invoiceDate = this.addTransaction_section1.value.PE_invoice_Date;
      if (
        invoiceDate === null ||
        invoiceDate === undefined ||
        invoiceDate === 'undefined'
      ) {
        iziToast.error({
          message: 'Fill Invoice Date  ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'invoiceDate',
          this.addTransaction_section1.value.PE_invoice_Date
        );
      }

      data.append(
        'content_purchase',
        this.addTransaction_section1.value.PE_contentofPurchase
      );
      data.append('poNo', this.addTransaction_section1.value.PE_poNumber);
      data.append('currency', this.addTransaction_section1.value.PE_Currency);
      data.append(
        'conversionRate',
        this.addTransaction_section1.value.PE_currencyConversionRate
      );
      data.append('taxAmount', this.addTransaction_section1.value.PE_taxAmount);
      data.append(
        'tax_provider',
        this.addTransaction_section1.value.PE_TaxProvider
      );
      data.append(
        'freight_provider',
        this.addTransaction_section1.value.PE_FreightProvider
      );
      data.append(
        'freight_amt',
        this.addTransaction_section1.value.PE_FreightAmount
      );
      var invoiceAmount = this.addTransaction_section1.value.PE_invoiceAmount;
      if (
        invoiceAmount === null ||
        invoiceAmount === undefined ||
        invoiceAmount === 'undefined'
      ) {
        iziToast.error({
          message: 'Fill Invoice Amount  ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'invoiceAmount',
          this.addTransaction_section1.value.PE_invoiceAmount
        );
      }

      //data.append('pur_attach_mobile', this.addTransaction_section1.value.CB_PE_AttachMobile);
      // for(let i=0;i<this.PE_FileLength;i++){
      //   data.append('file_attachment_name[i]', $("#PE_FileAttachment")[i].files[i]);
      // }
      // console.log("this.getFileAttachmentResult", this.getFileAttachmentResult);
      // console.log("this.getFileAttachmentResult", this.myFilesUpdate.length);
      if (this.myFilesUpdate.length < 4 && this.myFilesUpdate.length != 0) {
        if (this.getFileAttachmentResult.length > 0) {
          // alert(this.myFilesUpdate.length)
          //  console.log(this.myFilesUpdate)
          for (var i = 0; i <= this.fileIterationVariable - 1; i++) {
            if (
              this.myFilesUpdate[i] != undefined &&
              this.myFilesUpdate[i] != null
            ) {
              // console.log(this.myFilesUpdate[i])
              data.append('trans_file[]', this.myFilesUpdate[i]);
            }
            if (
              this.getFileAttachmentResult[i] != '' &&
              this.getFileAttachmentResult[i] != undefined &&
              this.getFileAttachmentResult[i] != 'undefined' &&
              this.getFileAttachmentResult[i] != 'null' &&
              this.getFileAttachmentResult[i] != null
            ) {
              data.append(
                'trans_file[]',
                this.getFileAttachmentResult[i].file_name
              );
            }
          }
        } else {
          if (this.getFileAttachmentResult.length > 0) {
            for (var i = 0; i < this.getFileAttachmentResult.length; i++) {
              data.append(
                'trans_file[]',
                this.getFileAttachmentResult[i].file_name
              );
            }
          } else {
            for (var i = 0; i < this.myFilesUpdate.length; i++) {
              data.append('trans_file[]', this.myFilesUpdate[i]);
            }
          }
        }
      } else {
        if (this.getFileAttachmentResult.length > 0) {
          for (var i = 0; i < this.getFileAttachmentResult.length; i++) {
            data.append(
              'trans_file[]',
              this.getFileAttachmentResult[i].file_name
            );
          }
        } else {
          for (var i = 0; i < this.myFilesUpdate.length; i++) {
            data.append('trans_file[]', this.myFilesUpdate[i]);
          }
        }
      }
    }
    // petty cash

    if (this.edit_TransactionTpeID == 5) {
      this.updateVariable = 'petty_cash_update';
      data.append('transaction_approval_id', this.TransactionApprovalID);
      const pcDescription = this.addTransaction_section1.value.PC_Description;
      if (pcDescription === null || pcDescription == '') {
        iziToast.error({
          message: 'Give Description of Petty Cash ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'petty_description',
          this.addTransaction_section1.value.PC_Description
        );
      }
      const pcType = this.addTransaction_section1.value.PC_Type;
      if (pcType === null) {
        iziToast.error({
          message: 'Give Type of Petty Cash ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append('petty_type', this.addTransaction_section1.value.PC_Type);
      }
      const pcAmount = this.addTransaction_section1.value.PC_Amount;
      if (pcAmount === null || pcAmount == '') {
        iziToast.error({
          message: 'Give Amount of Petty Cash ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append(
          'petty_amount',
          this.addTransaction_section1.value.PC_Amount
        );
      }

      // console.log("this.getFileAttachmentResult", this.getFileAttachmentResult);
      // console.log("this.getFileAttachmentResult", this.myFilesUpdate.length);
      if (this.myFilesUpdate.length < 4 && this.myFilesUpdate.length != 0) {
        if (this.getFileAttachmentResult.length > 0) {
          // alert(this.myFilesUpdate.length)
          // console.log(this.myFilesUpdate)
          for (var i = 0; i <= this.fileIterationVariable - 1; i++) {
            if (
              this.myFilesUpdate[i] != undefined &&
              this.myFilesUpdate[i] != null
            ) {
              // console.log(this.myFilesUpdate[i])
              data.append('trans_file[]', this.myFilesUpdate[i]);
            }
            if (
              this.getFileAttachmentResult[i] != '' &&
              this.getFileAttachmentResult[i] != undefined &&
              this.getFileAttachmentResult[i] != 'undefined' &&
              this.getFileAttachmentResult[i] != 'null' &&
              this.getFileAttachmentResult[i] != null
            ) {
              data.append(
                'trans_file[]',
                this.getFileAttachmentResult[i].file_name
              );
            }
          }
        } else {
          if (this.getFileAttachmentResult.length > 0) {
            for (var i = 0; i < this.getFileAttachmentResult.length; i++) {
              data.append(
                'trans_file[]',
                this.getFileAttachmentResult[i].file_name
              );
            }
          } else {
            for (var i = 0; i < this.myFilesUpdate.length; i++) {
              data.append('trans_file[]', this.myFilesUpdate[i]);
            }
          }
        }
      } else {
        if (this.getFileAttachmentResult.length > 0) {
          for (var i = 0; i < this.getFileAttachmentResult.length; i++) {
            data.append(
              'trans_file[]',
              this.getFileAttachmentResult[i].file_name
            );
          }
        } else {
          for (var i = 0; i < this.myFilesUpdate.length; i++) {
            data.append('trans_file[]', this.myFilesUpdate[i]);
          }
        }
      }
    }

    // LOgistics

    if (this.edit_TransactionTpeID == 51) {
      this.spinner.show();
      this.updateVariable = 'logistics_update';
      data.append('transaction_approval_id_hd', this.TransactionApprovalID);
      data.append(
        'logistics_description',
        this.addTransaction_section1.value.Log_Description
      );
      data.append(
        'logistics_type',
        this.addTransaction_section1.value.Log_Type
      );
      // data.append(
      //   'logistics_attach_mobile',
      //   this.addTransaction_section1.value.Log_Amount
      // );
      data.append(
        'logistics_amount',
        this.addTransaction_section1.value.Log_Amount
      );
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {
          data.append('attachment_filename_1', this.myFiles[i]);
        }
      }
    }

    // vendororder

    if (this.edit_TransactionTpeID == 6) {
      this.spinner.show();
      this.updateVariable = 'vendor_update';
      data.append('transaction_approval_id_hd', this.TransactionApprovalID);
      data.append(
        'other_description',
        this.addTransaction_section1.value.VendorOrder_Description
      );
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {
          data.append('attachment_filename_1', this.myFiles[i]);
        }
      }
    }

    // Invoicepayment

    if (this.edit_TransactionTpeID == 7) {
      this.spinner.show();
      this.updateVariable = 'invoicepayment_update';
      data.append('transaction_approval_id_hd', this.TransactionApprovalID);
      data.append(
        'invoice_no',
        this.addTransaction_section1.value.InvPayment_InvoiceNumber
      );
      // data.append('payment_nettotal', this.addTransaction_section1.value.InvPayment_Total);
      // data.append('payment_billerName', this.addTransaction_section1.value.InvPayment_Biller);
      // data.append('payment_amountPaid', this.addTransaction_section1.value.InvPayment_Paid);
      // data.append('payment_customerName', this.addTransaction_section1.value.InvPayment_Customer);
      // data.append('payment_owing', this.addTransaction_section1.value.InvPayment_Owing);
      data.append(
        'paidAmount',
        this.addTransaction_section1.value.InvPayment_Amount
      );
      data.append(
        'paymentDate',
        this.addTransaction_section1.value.InvPayment_date
      );
      data.append(
        'payment_method',
        this.addTransaction_section1.value.InvPayment_PaymentMethod
      );
      data.append('note', this.addTransaction_section1.value.InvPayment_Notes);
      data.append(
        'payment_paymentNote',
        this.addTransaction_section1.value.InvPayment_Details
      );
      // data.append('file_attachment_name', this.addTransaction_section1.value.InvPayment_FileAttachment);
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {
          data.append('attachment_filename_1', this.myFiles[i]);
        }
      }
    }

    // others

    if (this.edit_TransactionTpeID == 8) {
      this.spinner.show();
      this.updateVariable = 'others_update';
      data.append('transaction_approval_id_hd', this.TransactionApprovalID);
      data.append(
        'other_description',
        this.addTransaction_section1.value.others_Description
      );
      if (this.myFiles.length < 4) {
        for (var i = 0; i < this.myFiles.length; i++) {
          data.append('attachment_filename_1', this.myFiles[i]);
        }
      }
    }

    if (this.edit_TransactionTpeID == 15) {
      this.updateVariable = 'product_entry_update';
      data.append(
        'vendorId',
        this.addTransaction_section1.value.AddNewStock_vendorName
      );
      data.append(
        'lic_pur_date',
        this.addTransaction_section1.value.AddNewStock_PurDate
      );
      data.append(
        'entry_product_category_id',
        this.addTransaction_section1.value.AddNewStock_CategoryName
      );
      data.append(
        'entry_product_id',
        this.addTransaction_section1.value.AddNewStock_ProductName
      );
      data.append(
        'entry_quantity',
        this.addTransaction_section1.value.AddNewStock_Qty
      );
    }

   

    if(this.edit_TransactionTpeID == 51 || this.edit_TransactionTpeID == 6 || this.edit_TransactionTpeID == 7 || this.edit_TransactionTpeID == 8){
   
      data.append('action', `edit/${this.updateVariable}`);
      var self = this;

    
    $.ajax({
      type: 'POST',
      url:
        'https://laravelapi.erp1.cal4care.com/api/edit/' +
        this.updateVariable +
        '',
      // url: 'https://erp1.cal4care.com/api/transaction_entry/' + this.updateVariable + '',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          self.goBackTransaction();
          // console.log(result);
          this.spinner.hide();
          iziToast.success({
            message: 'Transaction details Updated successfully',
            position: 'topRight',
          });
        } else {
          iziToast.warning({
            message: 'Transaction details not Saved',
            position: 'topRight',
          });
        }
      },
      error: function (err: any) {
        // console.log("err", err)
        iziToast.error({
          message: 'Server Side Error',
          position: 'topRight',
        });
      },
    });
  }


    if(this.edit_TransactionTpeID == 3 || this.edit_TransactionTpeID == 5|| this.edit_TransactionTpeID == 15){
      data.append('action', this.updateVariable);
    var self = this;
    $.ajax({
      type: 'POST',
      url:
        'https://erp1.cal4care.com/api/transaction_entry/' +
        this.updateVariable +
        '',
      // url: 'https://erp1.cal4care.com/api/transaction_entry/' + this.updateVariable + '',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          self.goBackTransaction();
          // console.log(result);

          iziToast.success({
            message: 'Transaction details Updated successfully',
            position: 'topRight',
          });
        } else {
          iziToast.warning({
            message: 'Transaction details not Saved',
            position: 'topRight',
          });
        }
      },
      error: function (err: any) {
        // console.log("err", err)
        iziToast.error({
          message: 'Server Side Error',
          position: 'topRight',
        });
      },
    });
  }


  }
  SelectTransactionType_PE() {
    this.Select_Transaction_Type = 'PurchaseEntry';
  }
  SelectTransactionType_PC() {
    this.Select_Transaction_Type = 'PettyCash';
  }
  SelectTransactionType_Log() {
    this.Select_Transaction_Type = 'Logistics';
  }

  SelectTransactionType_VO() {
    this.Select_Transaction_Type = 'VendorOrder';
  }
  SelectTransactionType_IP() {
    this.Select_Transaction_Type = 'InvoicePayment';
  }
  SelectTransactionType_ANS() {
    this.Select_Transaction_Type = 'AddNewStock';
  }
  SelectTransactionType_SI() {
    this.Select_Transaction_Type = 'StockIssued';
  }
  SelectTransactionType_ST() {
    this.Select_Transaction_Type = 'StockTransfer';
  }
  SelectTransactionType_Others() {
    this.Select_Transaction_Type = 'Others';
  }
  goBackTransaction() {
    this.router.navigate(['/transactionnew']);
  }
  goBackADDTransaction() {
    this.router.navigate(['/AddTransactionNew']);
    window.location.reload();
  }
  Logistics() {}
}
