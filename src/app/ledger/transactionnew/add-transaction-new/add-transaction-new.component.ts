import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { el } from '@fullcalendar/core/internal-common';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-add-transaction-new',
  templateUrl: './add-transaction-new.component.html',
  styleUrls: ['./add-transaction-new.component.css'],
})
export class AddTransactionNewComponent implements OnInit {
  addTransaction_section1: FormGroup;
  VendorManagementForm: FormGroup;
  addStock_section2: FormGroup;
  public addresses: FormArray;
  PE_VendorManagementForm: FormGroup;

  //file attachment
  file: File;
  getResult: any;
  credit_attachment_id: any;
  fileAttachCustomerID: any;
  myFiles: any[] = [];
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
  isReadOnly: boolean = true;
  //tab
  Select_Transaction_Type: any = 3;
  //pe file
  PE_FileLength: any;
  //currency change
  getCurrencyCode: any;
  billerID: any;
  userID: any;
  Transaction_Type_List: any;
  saveVariable: any;
  paymentTypeDetails: any;
  categoryDetails: any;
  //add stock -form array
  itre = 0;
  test: boolean[] = [];
  // productDetails: any;
  productDetails: any[] = [];
  valuw: any;
  serial_no_state: any;
  payment_details: any;
  add_billerNameID: any;
  getVendorCode: any;
  stockIssueForm: FormGroup;
  public addresses_issueStock: FormArray;
  StockTransferForm: FormGroup;
  public addresses_stocktransfer: FormArray;

  productCategoryList: any;
  productNameList: any;
  invoiceNumber: { [key: number]: any[] } = {};
  transfer_biller: any;
  Category_Id: any;
  productNameLists: { [key: number]: any[] } = {};
  available_quantiy: { [key: number]: any[] } = {};
  serial_no: { [key: number]: any[] } = {};
  available_quantiy_transfer: { [key: number]: any[] } = {};
  serial_no_transfer: { [key: number]: any[] } = {};
  search_customer_name: any;
  filteredCustomers: { [key: number]: any[] } = {};
  selectedCustomer: any;
  selectedCustomerId: any;
  selectedcustomerName: any;
  purchase_tab: any;
  pettycash_tab: any;
  logistics_tab: any;
  vendor_tab: any;
  invoice_tab: any;
  add_stock_tab: any;
  stock_issue_tab: any;
  stock_transfer_tab: any;
  others_tab: any;

  constructor(
    private serverService: ServerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.addStock_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()]),
    });
    this.stockIssueForm = this.fb.group({
      addresses_issueStock: this.fb.array([this.createAddress_issueStock()]),
    });
    this.StockTransferForm = this.fb.group({
      addresses_stocktransfer: this.fb.array([
        this.createAddress_stocktransfer(),
      ]),
    });
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('erp_c4c_user_id');
    this.addLoad();
    // this.addLoad_2();
    this.gettransactionPermissionList();
    this.getProductCategory();
    this.getTransferBiller();
    this.http
      .get<any>(this.serverService.urlFinal + '/vendor/getVendorCode')
      .subscribe((data: any) => {
        this.getVendorCode = data.vendorCode;
        // console.log("this.getVendorCode", this.getVendorCode)
      });

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

    this.addTransaction_section1 = new FormGroup({
      billerName: new FormControl(null),
      trans_Date: new FormControl(new Date().toISOString().substring(0, 10)),
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

      vendorId: new FormControl(null),
      lic_pur_date: new FormControl(new Date().toISOString().substring(0, 10)),
      entry_product_category_id: new FormControl(null),
      entry_product_id: new FormControl(null),
      entry_quantity: new FormControl(null),
      entry_serail_no_str: new FormControl(null),

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
    this.PE_VendorManagementForm = new FormGroup({
      PE_VM_CompanyCode: new FormControl(null),
      PE_VM_CompanyName: new FormControl(null),
      PE_VM_VendorName: new FormControl(null),
      PE_VM_Address1: new FormControl(null),
      PE_VM_Address2: new FormControl(null),
      PE_VM_City: new FormControl(null),
      PE_VM_State: new FormControl(null),
      PE_VM_Country: new FormControl(null),
      PE_VM_ZipCode: new FormControl(null),
      PE_VM_Phone: new FormControl(null),
      PE_VM_MobilePhone: new FormControl(null),
      PE_VM_Fax: new FormControl(null),
      PE_VM_Email: new FormControl(null, [Validators.email]),
    });
    // this.addStock_section2 = new FormGroup({

    //   'vendorId': new FormControl(null),
    //   'lic_pur_date': new FormControl(null),
    //   'entry_product_category_id': new FormControl(null),
    //   'entry_product_id': new FormControl(null),
    //   'entry_quantity': new FormControl(null),
    //   'entry_serail_no_str': new FormControl(null)
    // });
  }

  ////////////////  Add New Stock ////////////
  get addressControls() {
    return this.addStock_section2.get('addresses') as FormArray;
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
      lic_pur_date: new Date().toISOString().substring(0, 10),
      entry_product_category_id: '',
      entry_product_id: '',
      entry_quantity: '1',
      entry_serail_no_str: false,
    });
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  // //////////////// Stock Issued ///////////////
  get addressControls_issueStock() {
    return this.stockIssueForm.get('addresses_issueStock') as FormArray;
  }

  addAddress_issueStock(): void {
    this.addresses_issueStock = this.stockIssueForm.get(
      'addresses_issueStock'
    ) as FormArray;
    this.addresses_issueStock.push(this.createAddress_issueStock());

    this.itre = this.itre + 1;
    this.addressControls_issueStock.controls.forEach((elt, index) => {
      this.test[index] = true;
    });
  }

  createAddress_issueStock(): FormGroup {
    return this.fb.group({
      product_category_id: '',
      product_id: '',
      serial_no: '',
      customer_id_hd: '',
      customer_id: '',
      number_type: '1',
      invoice_number: '',
      demo_type: '',
      quantity: '1',
      A_quantity: '',
    });
  }

  removeAddress_issueStock(i: number) {
    this.addresses_issueStock.removeAt(i);
  }
  // //////////////// Stock Transfer ///////////////
  get addressControls_stocktransfer() {
    return this.StockTransferForm.get('addresses_stocktransfer') as FormArray;
  }

  addAddress_stocktransfer(): void {
    this.addresses_stocktransfer = this.StockTransferForm.get(
      'addresses_stocktransfer'
    ) as FormArray;
    this.addresses_stocktransfer.push(this.createAddress_stocktransfer());

    this.itre = this.itre + 1;
    this.addressControls_stocktransfer.controls.forEach((elt, index) => {
      this.test[index] = true;
    });
  }

  createAddress_stocktransfer(): FormGroup {
    return this.fb.group({
      trans_product_category_id: '',
      trans_product_id: '',
      trans_serial_no: '',
      transfer_billerId: '',
      trans_quantity: '1',
      StockTransfer_AQty: '',
    });
  }

  removeAddress_stocktransfer(i: number) {
    this.addresses_stocktransfer.removeAt(i);
  }

  addTextBox(k: any) {
    $('#serial_mac_no').html('');
    var val = $('#AddNewStock_Qty' + k).val();
    //this.valuw=val;
    var ser_str = '';
    var addr = this.addStock_section2.value.addresses;
    console.log('total addr', addr);
    // console.log(addr)
    for (let i = 0; i < val; i++) {
      // $("#serial_mac_no"+i).append('<input type="text " name="text">');

      //$("#serial_mac_no"+k).append('<input type="text" name="Quantity" id="serial_mac_no'+i+'" /><br>');

      ser_str =
        ser_str +
        '<input type="text" name="Quantity" class="form-control" id="qty' +
        i +
        '" /><br>';
    }

    $('#serial_mac_no' + k).html(ser_str);
  }
  CB_Fn_PE_AttachMobile(event: any) { }
  CB_Fn_PC_AttachMobile(event: any) { }
  CB_Fn_Log_AttachMobile(event: any) { }
  VendorAPIList() {
    this.http
      .get<any>(this.serverService.urlFinal + '/base/getVendorList')
      .subscribe((data: any) => {
        this.vendorDetails = data.vendorList;
        // console.log("this.getVendorCode", this.getVendorCode)
      });
  }

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
      for (var i = 0; i < 1; i++) {
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


  addLoad() {
    this.spinner.show();
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
        this.spinner.hide();
        this.currencyDetails = response.currency_det;
        this.billerDetails = response.biller_det;
        this.vendorDetails = response.vendor_det;
        this.purchaseTypeDetails = response.purchase_type_det;
        this.taxProviderDetails = response.tax_provider_det;
        this.categoryDetails = response.category_det;
        //added below newly
        this.add_billerNameID = response.defaults_biller_id;
        this.DefaultBillerIDValue = response.defaults_biller_id;
        this.getPaymentInvoice();
        let defaultCurrencyIdString = response.default_currency_id;
        let currencyID: number = parseInt(defaultCurrencyIdString);
        console.log('currencyID', currencyID);
        setTimeout(() => {
          $('#biller_name8').val(response.defaults_biller_id);
          $('#Currency90').val(currencyID);
        }, 1000);

        this.addTransaction_section1.patchValue({
          billerName: this.DefaultBillerIDValue,
          PE_purchaseEntryNo: response.purchase_entry_no,
          PE_Currency: currencyID,
          PE_currencyConversionRate:
            response.conversionRate[0].currency_live_val,
        });

        $('#InvPayment_Biller').val('');
        $('#InvPayment_Customer').val('');
        $('#InvPayment_Total').val('');
        $('#InvPayment_Paid').val('');
        $('#InvPayment_Owing').val('');
        $('#InvPayment_Details').val('');
      } else {
        this.spinner.hide();

        iziToast.warning({
          message: 'Invoice Type Details not displayed. Please try again',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
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
          // 'PE_currencyConversionRate': response.currency_live_val,
        });
      } else {
      }
    });
  }

  changeCategory1(id: any, index: any) {
    let api_req: any = {};
    let api_getInvoiceDetails_req: any = {};

    api_req.moduleType = 'get_prodoct_entry_stock_name';
    api_req.api_url = 'addproduct_stock/get_prodoct_entry_stock_name';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';

    api_getInvoiceDetails_req.action = 'get_prodoct_entry_stock_name';
    api_getInvoiceDetails_req.category_id = id;

    api_req.element_data = api_getInvoiceDetails_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response && response.product_det) {
        // const row = this.addressControls_issueStock.at(index);
        // if (row) {
        //     row.patchValue({
        //         product_id: null, // Reset product selection
        //         serial_no: null  // Reset Serial/MAC No
        //     });
        //     row.get('productDetails')?.setValue(response.product_det); // Store products in FormGroup
        // }
        this.productDetails = response.product_det;
      }
    });

    // Update category ID
    const row = this.addressControls_issueStock.at(index);
    if (row) {
      row.patchValue({
        product_category_id: id,
        product_id: null, // Reset product selection
        serial_no: null, // Reset Serial/MAC No
      });
    }
  }

  BillerChange(event: any) {
    // alert(event.target.value)
    console.log('event', event);

    this.DefaultBillerIDValue = event.target.value;
    this.add_billerNameID = event.target.value;
    this.addLoad();
  }

  getCurrencyValues(event: any) {
    // alert(this.DefaultBillerIDValue)
    console.log('event.target;', event);
    this.getCurrencyCode = event.target.value;

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = 'proforma';
    api_req.api_url = 'proforma/get_currency_values';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getInvoiceDetails_req.action = 'get_currency_values';
    api_getInvoiceDetails_req.billerId = this.DefaultBillerIDValue;
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
  getProductserialState(event: any) {
    var productID = event.target.value;

    let api_req: any = new Object();
    let api_getPaymentDetails_req: any = new Object();
    api_req.moduleType = 'get_product_serial_state';
    api_req.api_url = 'product_stock/get_product_serial_state';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_getPaymentDetails_req.action = 'get_product_serial_state';
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
      } else {
      }
    });
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

        if (response.payment_details != null) {
          this.payment_details = response.payment_details.paidAmount;
        } else {
          this.payment_details = 0;
        }

        this.addTransaction_section1.patchValue({
          // 'PE_currencyConversionRate': response.currency_live_val,
        });
      } else {
      }
    });
  }

  addVendorNameGo() {
    $('#VendorManagementId').modal('show');
  }

  saveVendorManagement() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = 'vendor';
    api_req.api_url = 'vendor/saveVendor';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_mulInvpay.action = 'saveVendor';
    api_mulInvpay.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.PE_VendorManagementForm.value.PE_VM_CompanyName == null) {
      iziToast.error({
        message: 'Company Name Missing',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.companyName =
        this.PE_VendorManagementForm.value.PE_VM_CompanyName;
    }
    if (this.PE_VendorManagementForm.value.PE_VM_VendorName == null) {
      iziToast.error({
        message: 'Vendor Name Missing',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      api_mulInvpay.vendorName =
        this.PE_VendorManagementForm.value.PE_VM_VendorName;
    }

    api_mulInvpay.vendorCode =
      this.PE_VendorManagementForm.value.PE_VM_CompanyCode;
    api_mulInvpay.vendorAddress1 =
      this.PE_VendorManagementForm.value.PE_VM_Address1;
    api_mulInvpay.vendorAddress2 =
      this.PE_VendorManagementForm.value.PE_VM_Address2;
    api_mulInvpay.city = this.PE_VendorManagementForm.value.PE_VM_City;

    api_mulInvpay.state = this.PE_VendorManagementForm.value.PE_VM_State;
    api_mulInvpay.zipCode = this.PE_VendorManagementForm.value.PE_VM_ZipCode;
    api_mulInvpay.country = this.PE_VendorManagementForm.value.PE_VM_Country;
    api_mulInvpay.phone = this.PE_VendorManagementForm.value.PE_VM_Phone;
    api_mulInvpay.mobilePhone =
      this.PE_VendorManagementForm.value.PE_VM_MobilePhone;

    api_mulInvpay.fax = this.PE_VendorManagementForm.value.PE_VM_Fax;
    api_mulInvpay.email = this.PE_VendorManagementForm.value.PE_VM_Email;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        this.spinner.hide();
        iziToast.success({
          message: 'Vendor Saved Successfully',
          position: 'topRight',
        });

        this.VendorAPIList();
        window.location.reload();

        $('#VendorManagementId').modal('hide');

        $('#PurchaseEntry').modal('hide');

        $('#PurchaseEntry').modal('show');

        $('#RecurringFormId').modal('hide');
      } else {
        this.spinner.hide();
        iziToast.warning({
          message: 'Vendor Save Failed',
          position: 'topRight',
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message:
              'Sorry, a server error(500) occurred. Please try again later.',
            position: 'topRight',
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: 'Sorry, some server issue occur. Please contact admin',
          position: 'topRight',
        });
        console.log('final error', error);
      };
  }

  handleChangeissueStock_numType(event: any, index: number) {
    const selectedValue = event.target.value;

    // Update only the selected row's radio button value
    this.addressControls_issueStock.at(index).patchValue({
      number_type: selectedValue,
    });

    this.getInvoiceNumber(event, index);
  }
  updateCheckbox(isChecked: any, index: any) {
    this.addressControls_issueStock.at(index).patchValue({
      demo_type: isChecked ? 1 : 0,
    });
  }

  getProductCategory() {
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getproduct_category","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getproduct_category","user_id":"' +
      this.userID +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.data.length != 0) {
        this.productCategoryList = response.data;

        // console.log('this.productCategoryList', this.productCategoryList);
      } else {
      }
    });
  }
  getProductName(event: any, index: any) {
    this.Category_Id = event.target.value;
    var billerName = this.addTransaction_section1.value.billerName;
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getproduct_name","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getproduct_name","user_id":"' +
      this.userID +
      '","category_id":"' +
      this.Category_Id +
      '","billerId":"' +
      billerName +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.data.length != 0) {
        // this.productNameList = response.data;
        // console.log('this.productNameList',this.productNameList);
        this.productNameLists[index] = response.data;
      } else {
        this.productNameLists[index] = [];
      }
    });
  }

  customer_issue(event: any, index: any) {
    var searchkey = event.target.value;
    var billerName = this.addTransaction_section1.value.billerName;
    if (searchkey.length < 1) {
      this.filteredCustomers[index] = [];
      return;
    }
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getCustomerName","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getCustomerName","user_id":"' +
      this.userID +
      '","searchkey":"' +
      searchkey +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.customerName && Array.isArray(response.customerName)) {
        this.filteredCustomers[index] = response.customerName.filter(
          (customer: { customerName: any }) =>
            customer.customerName
              .toLowerCase()
              .includes(searchkey.toLowerCase())
        );
      } else {
        this.filteredCustomers[index] = [];
      }
    });
  }

  selectCustomer(customer: any, index: number) {
    this.selectedCustomer = customer;
    this.selectedCustomerId = customer.customerId;
    this.selectedcustomerName = customer.customerName;
    const addressControl = this.addressControls_issueStock.at(index);

    if (addressControl) {
      addressControl.patchValue({
        customer_id_hd: customer.customerId, // patch customer name
        customer_id: customer.customerName.toString(), // patch customer ID as a string (or as a number)
      });
    } else {
      console.error(`Form control at index ${index} is undefined`);
    }

    this.filteredCustomers[index] = [];
    var numberType =
      this.addressControls_issueStock.at(index).value.number_type;
    this.getInvoiceNumber(numberType, index);
  }

  getserial_A_quantity(event: any, index: any) {
    var Product_Id = event.target.value;
    var billerName = this.addTransaction_section1.value.billerName;
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getproduct_stock_qty","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getproduct_stock_qty","user_id":"' +
      this.userID +
      '","productId":"' +
      Product_Id +
      '","billerId":"' +
      billerName +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.available_quantiy[index] = response.qty;
        this.serial_no[index] = response.serial_no_state;
      } else {
        this.available_quantiy[index] = [];
        this.serial_no[index] = [];
      }
    });
  }
  getserial_A_quantity_transfer(event: any, index: any) {
    var Product_Id = event.target.value;
    var billerName = this.addTransaction_section1.value.billerName;
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getproduct_stock_qty","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getproduct_stock_qty","user_id":"' +
      this.userID +
      '","productId":"' +
      Product_Id +
      '","billerId":"' +
      billerName +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.available_quantiy_transfer[index] = response.qty;
        this.serial_no_transfer[index] = response.serial_no_state;
      } else {
        this.available_quantiy_transfer[index] = [];
        this.serial_no_transfer[index] = [];
      }
    });
  }

  getInvoiceNumber(event: any, index: any) {
    if (event === '1') {
      id = 'Invoice';
    } else {
      var id = event.target.value;
      if (id === '1' || id === '') {
        id = 'Invoice';
      } else {
        id = 'Do';
      }
    }

    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getCustomerInvoiceNumber","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getCustomerInvoiceNumber","user_id":"' +
      this.userID +
      '","customerId":"' +
      this.selectedCustomerId +
      '","num_type":"' +
      id +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = 'true')) {
        this.invoiceNumber[index] = response.data;
      } else {
        this.invoiceNumber[index] = [];
      }
    });
  }
  getTransferBiller() {
    let api_req: any =
      '{"moduleType":"transaction_entry","api_url":"transaction_entry/getStockBillers","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transaction_entry/getStockBillers","user_id":"' +
      this.userID +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        this.transfer_biller = response.biller;
      } else {
      }
    });
  }



  saveTransaction() {
    this.spinner.show();
    var data = new FormData();
    if (this.addTransaction_section1.value.billerName === null) {
      iziToast.error({
        message: 'Select Biller',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      data.append('company', this.addTransaction_section1.value.billerName);
    }

    if (this.addTransaction_section1.value.trans_Date === null) {
      iziToast.error({
        message: 'Select Date',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      data.append(
        'transaction_date',
        this.addTransaction_section1.value.trans_Date
      );
    }

    if (this.addTransaction_section1.value.priority === null) {
      iziToast.error({
        message: 'Select Priority',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      data.append('priority', this.addTransaction_section1.value.priority);
    }

    if (this.Select_Transaction_Type === null) {
      iziToast.error({
        message: 'Select Type of Transaction ',
        position: 'topRight',
      });
      this.spinner.hide();
      return false;
    } else {
      data.append('type_of_trans', this.Select_Transaction_Type);
    }

    data.append('user_id', this.userID);

    //purchase entry
    if (this.Select_Transaction_Type == 3) {
      this.saveVariable = 'purchase_entry_save';

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

      //data.append('pur_attach_mobile', this.addTransaction_section1.value.CB_PE_AttachMobile);
      // for(let i=0;i<this.PE_FileLength;i++){
      //   data.append('file_attachment_name[i]', $("#PE_FileAttachment")[i].files[i]);
      // }

      if (this.myPurchaseEntryFiles[0]) {
        data.append('trans_attachment_filename1', this.myPurchaseEntryFiles[0]);
      }
      if (this.myPurchaseEntryFiles[1]) {
        data.append('trans_attachment_filename2', this.myPurchaseEntryFiles[1]);
      }
      if (this.myPurchaseEntryFiles[2]) {
        data.append('trans_attachment_filename3', this.myPurchaseEntryFiles[2]);
      }
      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_file[]', this.myFiles[i]);
      //   }
      // }
      // data.append('action', "purchase_entry_save");
    }

    // petty_cash

    if (this.Select_Transaction_Type == 5) {
      this.saveVariable = 'petty_cash_save';
      const pcDescription = this.addTransaction_section1.value.PC_Description;
      if (pcDescription === null || pcDescription == '') {
        iziToast.error({
          message: 'Give Description of Petty Cash ',
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      } else {
        data.append('petty_description', pcDescription);
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

      data.append(
        'petty_attach_mobile',
        this.addTransaction_section1.value.CB_PC_AttachMobile
      );
      // data.append('file_attachment_name', this.addTransaction_section1.value.PC_FileAttachment);

      if (this.myPettyCashFiles[0]) {
        data.append('trans_attachment_filename1', this.myPettyCashFiles[0]);
      }
      if (this.myPettyCashFiles[1]) {
        data.append('trans_attachment_filename2', this.myPettyCashFiles[1]);
      }
      if (this.myPettyCashFiles[2]) {
        data.append('trans_attachment_filename3', this.myPettyCashFiles[2]);
      }

      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_file[]', this.myFiles[i]);
      //   }
      // }
      // data.append('action', "petty_cash_save");
    }

    // logistics_save

    if (this.Select_Transaction_Type == 51) {
      this.saveVariable = 'logistics';

      let description = this.addTransaction_section1.value.Log_Description;
      let log_type = this.addTransaction_section1.value.Log_Type;
      let Log_Amount = this.addTransaction_section1.value.Log_Amount;

      if (
        description === '' ||
        description === null ||
        description === undefined ||
        description === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Description`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        log_type === '' ||
        log_type === null ||
        log_type === undefined ||
        log_type === 'undefined'
      ) {
        iziToast.warning({
          message: `please Select Type`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        Log_Amount === '' ||
        Log_Amount === null ||
        Log_Amount === undefined ||
        Log_Amount === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Amount`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }

      data.append(
        'logistics_description',
        this.addTransaction_section1.value.Log_Description
      );
      data.append(
        'logistics_type',
        this.addTransaction_section1.value.Log_Type
      );
      data.append(
        'logistics_amount',
        this.addTransaction_section1.value.Log_Amount
      );

      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_attachment_filename', this.myFiles[0]);
      //     data.append('trans_attachment_filename_2', this.myFiles[1]);
      //     data.append('trans_attachment_filename_3', this.myFiles[2]);
      //   }
      // }

      // Append first 3 files individually if they exist
      if (this.myLogisticsFiles[0]) {
        data.append('trans_attachment_filename1', this.myLogisticsFiles[0]);
      }
      if (this.myLogisticsFiles[1]) {
        data.append('trans_attachment_filename2', this.myLogisticsFiles[1]);
      }
      if (this.myLogisticsFiles[2]) {
        data.append('trans_attachment_filename3', this.myLogisticsFiles[2]);
      }
    }

    // vendor_order

    if (this.Select_Transaction_Type == 6) {
      this.saveVariable = 'vendor_order';

      let description =
        this.addTransaction_section1.value.VendorOrder_Description;

      if (
        description === '' ||
        description === null ||
        description === undefined ||
        description === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Description `,
          position: 'topRight',
        });

        this.spinner.hide();
        return false;
      } else {
        data.append(
          'other_description',
          this.addTransaction_section1.value.VendorOrder_Description
        );
      }

      // data.append('file_attachment_name', this.addTransaction_section1.value.VendorOrder_FileAttachment);
      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_attachment_filename', this.myFiles[i]);
      //   }
      // }

      if (this.myVenderOrderFiles[0]) {
        data.append('trans_attachment_filename1', this.myVenderOrderFiles[0]);
      }
      if (this.myVenderOrderFiles[1]) {
        data.append('trans_attachment_filename2', this.myVenderOrderFiles[1]);
      }
      if (this.myVenderOrderFiles[2]) {
        data.append('trans_attachment_filename3', this.myVenderOrderFiles[2]);
      }
    }

    // invoice_payment_save

    if (this.Select_Transaction_Type == 7) {
      this.saveVariable = 'Invoice_payment';

      let invoice_no =
        this.addTransaction_section1.value.InvPayment_InvoiceNumber;
      let amount = this.addTransaction_section1.value.InvPayment_Amount;
      let date = this.addTransaction_section1.value.InvPayment_date;
      let payment_type =
        this.addTransaction_section1.value.InvPayment_PaymentMethod;
      let note = this.addTransaction_section1.value.InvPayment_Notes;

      if (
        invoice_no === '' ||
        invoice_no === null ||
        invoice_no === undefined ||
        invoice_no === 'undefined'
      ) {
        iziToast.warning({
          message: `please Select Invoice No )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        amount === '' ||
        amount === null ||
        amount === undefined ||
        amount === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Amount )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        date === '' ||
        date === null ||
        date === undefined ||
        date === 'undefined'
      ) {
        iziToast.warning({
          message: `please Select Date )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        payment_type === '' ||
        payment_type === null ||
        payment_type === undefined ||
        payment_type === 'undefined'
      ) {
        iziToast.warning({
          message: `please Select Payment Type/Method )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }
      if (
        note === '' ||
        note === null ||
        note === undefined ||
        note === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Note )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }

      data.append(
        'invoice_no',
        this.addTransaction_section1.value.InvPayment_InvoiceNumber
      );
      data.append('payment_nettotal', this.netPayment);
      data.append('payment_billerName', this.billerName);
      data.append('payment_amountPaid', this.amountPaid);
      data.append('payment_customerName', this.customerName);
      data.append('payment_owing', this.balance);
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
      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_attachment_filename', this.myFiles[i]);
      //   }
      // }

      if (this.myInvoicePaymentFiles[0]) {
        data.append('trans_attachment_filename1', this.myInvoicePaymentFiles[0]);
      }
      if (this.myInvoicePaymentFiles[1]) {
        data.append('trans_attachment_filename2', this.myInvoicePaymentFiles[1]);
      }
      if (this.myInvoicePaymentFiles[2]) {
        data.append('trans_attachment_filename3', this.myInvoicePaymentFiles[2]);
      }
    }

    // others_save

    if (this.Select_Transaction_Type == 8) {
      this.saveVariable = 'others';

      let description = this.addTransaction_section1.value.others_Description;

      if (
        description === '' ||
        description === null ||
        description === undefined ||
        description === 'undefined'
      ) {
        iziToast.warning({
          message: `please Enter Description )`,
          position: 'topRight',
        });
        this.spinner.hide();
        return false;
      }

      data.append(
        'other_description',
        this.addTransaction_section1.value.others_Description
      );

      // if (this.myFiles.length < 4) {
      //   for (var i = 0; i < this.myFiles.length; i++) {
      //     data.append('trans_attachment_filename', this.myFiles[i]);
      //   }
      // }

      if (this.myOthersFiles[0]) {
        data.append('trans_attachment_filename1', this.myOthersFiles[0]);
      }
      if (this.myOthersFiles[1]) {
        data.append('trans_attachment_filename2', this.myOthersFiles[1]);
      }
      if (this.myOthersFiles[2]) {
        data.append('trans_attachment_filename3', this.myOthersFiles[2]);
      }
    }
    // add_new_stock_save

    if (this.Select_Transaction_Type == 15) {
      var addr: any = this.addStock_section2.value.addresses;
      var billerName = this.addTransaction_section1.value.billerName;
      var priority = this.addTransaction_section1.value.priority;

      for (let i = 0; i < addr.length; i++) {
        let vendorId = this.addStock_section2.get([
          'addresses',
          i,
          'vendorId',
        ]).value;
        let lic_pur_date = this.addStock_section2.get([
          'addresses',
          i,
          'lic_pur_date',
        ]).value;
        let entry_product_category_id = this.addStock_section2.get([
          'addresses',
          i,
          'entry_product_category_id',
        ]).value;
        let entry_product_id = this.addStock_section2.get([
          'addresses',
          i,
          'entry_product_id',
        ]).value;
        let entry_quantity = this.addStock_section2.get([
          'addresses',
          i,
          'entry_quantity',
        ]).value;
        let entry_serail_no_str = this.addStock_section2.get([
          'addresses',
          i,
          'entry_serail_no_str',
        ]).value;

        if (
          vendorId === '' ||
          vendorId === null ||
          vendorId === undefined ||
          vendorId === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Vendor Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          lic_pur_date === '' ||
          lic_pur_date === null ||
          lic_pur_date === undefined ||
          lic_pur_date === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Pur Date ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          entry_product_category_id === '' ||
          entry_product_category_id === null ||
          entry_product_category_id === undefined ||
          entry_product_category_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Category Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          entry_product_id === '' ||
          entry_product_id === null ||
          entry_product_id === undefined ||
          entry_product_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Product Name Serial / MAC No ( section - ${i + 1
              } )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          entry_quantity === '' ||
          entry_quantity === null ||
          entry_quantity === undefined ||
          entry_quantity === 'undefined'
        ) {
          iziToast.warning({
            message: `please Enter Qty ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }

        addr[i].vendorId = vendorId;
        addr[i].lic_pur_date = lic_pur_date;
        addr[i].entry_product_category_id = entry_product_category_id;
        addr[i].entry_product_id = entry_product_id;
        addr[i].entry_quantity = entry_quantity;
        addr[i].entry_serail_no_str = entry_serail_no_str;
      }

      // Check if there are warnings

      var x = JSON.stringify(addr);
      console.log(x); // Proceed with your logic
      this.spinner.show();

      let api_req: any =
        '{"moduleType":"stock","api_url":"stock/addstock","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"stock/addstock","user_id":"' +
        this.userID +
        '","company":"' +
        billerName +
        '","priority":"' +
        priority +
        '","entry_product_cnt":' +
        x +
        '}}';

      this.serverService.sendServerpath(api_req).subscribe((response: any) => {
        if (response.status === true) {
          this.goBackTransaction();
          iziToast.success({
            message: 'Transaction details Saved successfully',
            position: 'topRight',
          });
          this.spinner.hide();
        } else {
        }
      });
    }

    // stock issued

    if (this.Select_Transaction_Type == 56) {
      // var addr: any = this.stockIssueForm.value.addresses_issueStock;
      var billerName = this.addTransaction_section1.value.billerName;
      var priority = this.addTransaction_section1.value.priority;
      var addr: any = this.stockIssueForm.value.addresses_issueStock;

      for (let i = 0; i < addr.length; i++) {
        let product_category_id = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'product_category_id',
        ]).value;
        let product_id = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'product_id',
        ]).value;
        let serial_no = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'serial_no',
        ]).value;
        let customer_id_hd = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'customer_id_hd',
        ]).value;
        let number_type = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'number_type',
        ]).value;
        let invoice_number = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'invoice_number',
        ]).value;
        let demo_type = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'demo_type',
        ]).value;
        let quantity = this.stockIssueForm.get([
          'addresses_issueStock',
          i,
          'quantity',
        ]).value;

        if (
          product_category_id === '' ||
          product_category_id === null ||
          product_category_id === undefined ||
          product_category_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Category Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          product_id === '' ||
          product_id === null ||
          product_id === undefined ||
          product_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Product Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        // if(serial_no === '' ||serial_no === null || serial_no === undefined || serial_no==='undefined'){

        //   iziToast.warning({

        //     message: `please Select Serial/MAC No ( section - ${i + 1} )`,
        //     position: 'topRight',
        //   });

        //   return false;
        // }
        if (
          customer_id_hd === '' ||
          customer_id_hd === null ||
          customer_id_hd === undefined ||
          customer_id_hd === 'undefined'
        ) {
          iziToast.warning({
            message: `please Enter Issue Customer ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          invoice_number === '' ||
          invoice_number === null ||
          invoice_number === undefined ||
          invoice_number === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Invoice Number ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          quantity === '' ||
          quantity === null ||
          quantity === undefined ||
          quantity === 'undefined'
        ) {
          iziToast.warning({
            message: `please Enter Qty ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }

        addr[i] = {
          product_category_id,
          product_id,
          serial_no,
          customer_id_hd,
          number_type,
          invoice_number,
          demo_type,
          quantity,
        };
      }

      var x = JSON.stringify(addr);
      console.log(x);
      this.spinner.show();
      let api_req: any =
        '{"moduleType":"stock","api_url":"stock/stockissued","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"stock/stockissued","user_id":"' +
        this.userID +
        '","company":"' +
        billerName +
        '","priority":"' +
        priority +
        '","entry_product_cnt":' +
        x +
        '}}';

      this.serverService.sendServerpath(api_req).subscribe((response: any) => {
        if (response.status === true) {
          this.goBackTransaction();
          iziToast.success({
            message: 'Transaction details Saved successfully',
            position: 'topRight',
          });
          this.spinner.hide();
        } else {
        }
      });
    }

    // stoack transfered

    if (this.Select_Transaction_Type == 58) {
      var addr: any = this.StockTransferForm.value.addresses_stocktransfer;
      var billerName = this.addTransaction_section1.value.billerName;
      var priority = this.addTransaction_section1.value.priority;

      for (let i = 0; i < addr.length; i++) {
        let trans_product_category_id = this.StockTransferForm.get([
          'addresses_stocktransfer',
          i,
          'trans_product_category_id',
        ]).value;
        let trans_product_id = this.StockTransferForm.get([
          'addresses_stocktransfer',
          i,
          'trans_product_id',
        ]).value;
        let trans_serial_no = this.StockTransferForm.get([
          'addresses_stocktransfer',
          i,
          'trans_serial_no',
        ]).value;
        let transfer_billerId = this.StockTransferForm.get([
          'addresses_stocktransfer',
          i,
          'transfer_billerId',
        ]).value;
        let trans_quantity = this.StockTransferForm.get([
          'addresses_stocktransfer',
          i,
          'trans_quantity',
        ]).value;

        if (
          trans_product_category_id === '' ||
          trans_product_category_id === null ||
          trans_product_category_id === undefined ||
          trans_product_category_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Category Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          trans_product_id === '' ||
          trans_product_id === null ||
          trans_product_id === undefined ||
          trans_product_id === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Product Name ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        // if(trans_serial_no === '' ||trans_serial_no === null || trans_serial_no === undefined || trans_serial_no==='undefined'){

        //   iziToast.warning({

        //     message: `please Enter Serial/MAC No ( section - ${i + 1} )`,
        //     position: 'topRight',
        //   });

        //   return false;
        // }
        if (
          transfer_billerId === '' ||
          transfer_billerId === null ||
          transfer_billerId === undefined ||
          transfer_billerId === 'undefined'
        ) {
          iziToast.warning({
            message: `please Select Transfer Biller ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }
        if (
          trans_quantity === '' ||
          trans_quantity === null ||
          trans_quantity === undefined ||
          trans_quantity === 'undefined'
        ) {
          iziToast.warning({
            message: `please Enter Qty ( section - ${i + 1} )`,
            position: 'topRight',
          });
          this.spinner.hide();
          return false;
        }

        addr[i] = {
          trans_product_category_id,
          trans_product_id,
          trans_serial_no,
          transfer_billerId,
          trans_quantity,
        };
      }
      var x = JSON.stringify(addr);
      console.log(x);

      this.spinner.show();
      let api_req: any =
        '{"moduleType":"stock","api_url":"stock/stocktransfer","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"stock/stocktransfer","user_id":"' +
        this.userID +
        '","company":"' +
        billerName +
        '","priority":"' +
        priority +
        '","entry_product_cnt":' +
        x +
        '}}';

      this.serverService.sendServerpath(api_req).subscribe((response: any) => {
        if (response.status === true) {
          this.goBackTransaction();
          iziToast.success({
            message: 'Transaction details Saved successfully',
            position: 'topRight',
          });
          this.spinner.hide();
        } else {
        }
      });
    }

    if (
      this.saveVariable === 'logistics' ||
      this.saveVariable === 'vendor_order' ||
      this.saveVariable === 'Invoice_payment' ||
      this.saveVariable === 'others'
    ) {
      this.spinner.show();
      var self = this;
      $.ajax({
        type: 'POST',

        url: this.serverService.urlFinal + 'stock/' + this.saveVariable + '',
   
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          //  alert(result)
          console.log('result', result);
          // this.spinner.hide();
          // self.goBackTransaction();
          if (result.status == true || result.status == 'true') {
            // this.spinner.hide();
            // this.router.navigate(['/transactionnew']);
            self.goBackTransaction();
            console.log(result);

            iziToast.success({
              message: 'Transaction details Saved successfully',
              position: 'topRight',
            });
            this.spinner.hide();
          } else {
            this.spinner.hide();

            iziToast.warning({
              message: 'Transaction details not Saved',
              position: 'topRight',
            });
          }
        },
        error: function (err: any) {
          this.spinner.hide();
          console.log('err', err);
          iziToast.error({
            message: 'Server Side Error',
            position: 'topRight',
          });
        },
      });
    }
    if (
      this.saveVariable === 'purchase_entry_save' ||
      this.saveVariable === 'petty_cash_save'
    ) {
      this.spinner.show();
      var self = this;
      $.ajax({
        type: 'POST',

        url: this.serverService.urlFinal + 'transaction_entry/' + this.saveVariable + '',


        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          //  alert(result)
          console.log('result', result);
          // this.spinner.hide();
          // self.goBackTransaction();
          if (result.status == true || result.status == 'true') {
            // this.spinner.hide();
            // this.router.navigate(['/transactionnew']);
            self.goBackTransaction();
            console.log(result);

            iziToast.success({
              message: 'Transaction details Saved successfully',
              position: 'topRight',
            });
            this.spinner.hide();
          } else {
            this.spinner.hide();

            iziToast.warning({
              message: 'Transaction details not Saved',
              position: 'topRight',
            });
          }
        },
        error: function (err: any) {
          this.spinner.hide();
          console.log('err', err);
          iziToast.error({
            message: 'Server Side Error',
            position: 'topRight',
          });
        },
      });
    }

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
  cancelVendor() {
    $('#VendorManagementId').modal('hide');
    // this.PE_VendorManagementForm.reset();

    this.PE_VendorManagementForm.controls['PE_VM_CompanyName'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_VendorName'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_Address1'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_Address2'].reset();

    this.PE_VendorManagementForm.controls['PE_VM_City'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_State'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_Country'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_ZipCode'].reset();

    this.PE_VendorManagementForm.controls['PE_VM_Phone'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_MobilePhone'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_Fax'].reset();
    this.PE_VendorManagementForm.controls['PE_VM_Email'].reset();
  }

  activeTab: string = ''; // default selected tab

  gettransactionPermissionList() {
    let api_req: any = '{"moduleType":"transaction_entry","api_url":"transaction_entry/transactionPermissionList","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"transactionPermissionList","user_id":"' + this.userID + '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        this.purchase_tab = response.trans_permissions.purchase_tab;
        this.pettycash_tab = response.trans_permissions.pettycash_tab;
        this.logistics_tab = response.trans_permissions.logistics_tab;
        this.vendor_tab = response.trans_permissions.vendor_tab;
        this.invoice_tab = response.trans_permissions.invoice_tab;
        this.add_stock_tab = response.trans_permissions.add_stock_tab;
        this.stock_issue_tab = response.trans_permissions.stock_issue_tab;
        this.stock_transfer_tab = response.trans_permissions.stock_transfer_tab;
        this.others_tab = response.trans_permissions.others_tab;

        this.setFirstAvailableTab();
      } else {
      }
    });
  }

  setFirstAvailableTab() {
    const permission = [
      { name: 'PurchaseEntry', value: this.purchase_tab },
      { name: 'PettyCash', value: this.pettycash_tab },
      { name: 'Logistics', value: this.logistics_tab },
      { name: 'VendorOrder', value: this.vendor_tab },
      { name: 'InvoicePayment', value: this.invoice_tab },
      { name: 'AddNewStock', value: this.add_stock_tab },
      { name: 'StockIssued', value: this.stock_issue_tab },
      { name: 'StockTransfer', value: this.stock_transfer_tab },
      { name: 'Others', value: this.others_tab }
    ];

    const firstAllowedPermission = permission.find(p => p.value === "1")?.name;

    if (firstAllowedPermission) {
      this.selectTransactionType(firstAllowedPermission);
    }
  }

  selectTransactionType(tab: string) {

    this.myPurchaseEntryFiles = [];
    this.myPettyCashFiles = [];
    this.myLogisticsFiles = [];
    this.myVenderOrderFiles = [];
    this.myInvoicePaymentFiles = [];
    this.myOthersFiles = [];

    // this.addTransaction_section1.reset();

    this.addTransaction_section1.reset({
      trans_Date: this.addTransaction_section1.get('trans_Date')?.value,
      billerName: this.addTransaction_section1.get('billerName')?.value,
      PE_purchaseEntryNo: this.addTransaction_section1.get('PE_purchaseEntryNo')?.value,
      PE_Currency: this.addTransaction_section1.get('PE_Currency')?.value,
      PE_currencyConversionRate: this.addTransaction_section1.get('PE_currencyConversionRate')?.value
    });


    // this.addLoad();

    this.activeTab = tab;
    if (tab === 'PurchaseEntry') {

      this.Select_Transaction_Type = 3;
      this.activeTab = tab;
    }
    if (tab === 'PettyCash') {
      this.Select_Transaction_Type = 5;
      this.activeTab = tab;
    }
    if (tab === 'Logistics') {
      this.Select_Transaction_Type = 51;
      this.activeTab = tab;
    }
    if (tab === 'VendorOrder') {
      this.Select_Transaction_Type = 6;
      this.activeTab = tab;
    }
    if (tab === 'InvoicePayment') {
      this.Select_Transaction_Type = 7;
      this.activeTab = tab;
    }
    if (tab === 'AddNewStock') {
      this.Select_Transaction_Type = 15;
      this.activeTab = tab;
    }
    if (tab === 'StockIssued') {
      this.Select_Transaction_Type = 56;
      this.activeTab = tab;
    }
    if (tab === 'StockTransfer') {
      this.Select_Transaction_Type = 58;
      this.activeTab = tab;
    }
    if (tab === 'Others') {
      this.Select_Transaction_Type = 8;
      this.activeTab = tab;
    }
  }


  // Separate arrays for each section
  myPurchaseEntryFiles: any = [];
  myPettyCashFiles: any = [];
  myLogisticsFiles: any = [];
  myVenderOrderFiles: any = [];
  myInvoicePaymentFiles: any = [];
  myOthersFiles: any = [];


  // Purchase entry :

  fileAttachmentEventPurchaseEntry(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myPurchaseEntryFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }

    // Check for duplicate filenames
    const existingFileNames = this.myPurchaseEntryFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myPurchaseEntryFiles.push(...selectedFiles);

    event.target.value = '';

  }

  removePurchaseEntryile(index: number) {
    this.myPurchaseEntryFiles.splice(index, 1);
  }


  // pettycase :

  fileAttachmentEventPettyCash(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myPettyCashFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }

    // Check for duplicate filenames
    const existingFileNames = this.myPettyCashFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myPettyCashFiles.push(...selectedFiles);

    event.target.value = '';

  }

  removePettyCashFile(index: number) {
    this.myPettyCashFiles.splice(index, 1);
  }

  // Logistics : 
  fileAttachmentEventLogistics(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myLogisticsFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }


    // Check for duplicate filenames
    const existingFileNames = this.myLogisticsFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myLogisticsFiles.push(...selectedFiles);

    event.target.value = '';
  }

  removeLogisticsFile(index: number) {
    this.myLogisticsFiles.splice(index, 1);
  }

  // Vendor order :

  fileAttachmentEventVenderOrder(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myVenderOrderFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }


    // Check for duplicate filenames
    const existingFileNames = this.myVenderOrderFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myVenderOrderFiles.push(...selectedFiles);

    event.target.value = '';
  }

  removeVenderOrderFile(index: number) {
    this.myVenderOrderFiles.splice(index, 1);
  }

  // Invoice payment


  fileAttachmentEventInvoicePayment(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myInvoicePaymentFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }


    // Check for duplicate filenames
    const existingFileNames = this.myInvoicePaymentFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myInvoicePaymentFiles.push(...selectedFiles);

    event.target.value = '';
  }

  removeInvoicePaymentFile(index: number) {
    this.myInvoicePaymentFiles.splice(index, 1);
  }


  // Others


  fileAttachmentEventOthers(event: any) {

    const selectedFiles: any = Array.from(event.target.files) as File[];

    if (this.myOthersFiles.length + selectedFiles.length > 3) {
      iziToast.error({
        message:
          'Sorry, maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
      event.target.value = ''; // Clear the input value
      return;
    }


    // Check for duplicate filenames
    const existingFileNames = this.myOthersFiles.map((f: { name: any; }) => f.name);
    const duplicateFiles = selectedFiles.filter((f: { name: any; }) => existingFileNames.includes(f.name));

    if (duplicateFiles.length > 0) {
      iziToast.error({
        message: 'Duplicate file(s) not allowed: ' + duplicateFiles.map((f: { name: any; }) => f.name).join(', '),
        position: 'topRight',
      });
      event.target.value = '';
      return;
    }

    this.myOthersFiles.push(...selectedFiles);

    event.target.value = '';
  }

  removeOthersFile(index: number) {
    this.myOthersFiles.splice(index, 1);
  }







}
