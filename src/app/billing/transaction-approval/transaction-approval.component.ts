import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
// import { QuotationnewComponent } from '../quotationnew/quotationnew.component';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;
@Component({
  selector: 'app-transaction-approval',
  templateUrl: './transaction-approval.component.html',
  styleUrls: ['./transaction-approval.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionApprovalComponent implements OnInit {
  //list
  transApprovalList: any;
  transApprovalList_Main: any;
  transactionApprovalViewForm: FormGroup;
  BeforeApprovaltransactionApprovalViewForm: FormGroup;
  transactionApprovalCommentsForm: FormGroup;
  transactionApprovalCommentsForm_main: FormGroup;
  BeforeApprovaltransactionApprovalCommentsForm: FormGroup;
  BeforeApprovaltransactionApprovalCommentsForm_main: FormGroup;
  isReadOnly: boolean = true;
  checkboxCB_ToggleStatus: any;
  checkboxCB_BeforeApprovalToggleStatus: any;
  TransactionApprovalID: any;
  commentDisplayResult: any;
  tabValue: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  paginationData1: any = { "info": "hide" };
  offset_count = 1;
  //checkbox group
  edit_array: any = [];
  groupSelectCommonId: any;
  checkbox_value: any;
  //checkbox group-main
  edit_arrayMain: any = [];
  groupSelectCommonIdMain: any;
  checkbox_valueMain: any;
  //checkbox group-DID Number
  edit_arrayDIDNum: any = [];
  groupSelectCommonIdDIDNum: any;
  checkbox_valueDIDNum: any;
  //checkbox group-DID Demo
  edit_arrayDIDdemo: any = [];
  groupSelectCommonIdDIDdemo: any;
  checkbox_valueDIDdemo: any;
  //checkbox group-product issue
  edit_arrayProductIssue: any = [];
  groupSelectCommonIdProductIssue: any;
  checkbox_valueProductIssue: any;

  // quotationNew: any;
  quotationID: any;
  FromID: any;
  Subject: any;
  validDay: any;
  version: any;
  duplicateVersion: any;
  productDescription: any;
  //view
  BillerName: any;
  Priority: any;
  date: any;
  //count
  quotationApprovalPendingCount: any;
  mainApprovalPendingCount: any;
  //other
  BeforeApprovalTransactionAproveView_TransactionApproveID: any;
  transactionTypeNumber: any;
  purchaseEntryNo: any;
  vendorName: any;
  invoiceNo: any;
  contentOfPurchase: any;
  poNumber: any;
  currency: any;
  currencyConversionRate: any;
  taxAmount: any;
  invoiceAmount: any;
  comments: any;
  PC_Description: any;
  PC_Type: any;
  PC_Amount: any;
  PC_CustomerName: any;
  PC_BIllerName: any;
  PC_Address1: any;
  PC_Address2: any;
  PC_City: any;
  PC_State: any;
  PC_ZipCode: any;
  PC_Phone: any;
  PC_Country: any;
  PC_MobilePhone: any;
  PC_Fax: any;
  PC_Email: any;
  PC_FinanceEmail: any;
  PC_ContactPerson: any;
  //view customer
  Cus_CustomerName: any;
  Cus_billerName: any;
  Cus_address1: any;
  Cus_address2: any;
  Cus_City: any;
  Cus_state: any;
  Cus_zipcode: any;
  Cus_country: any;
  Cus_phone: any;
  Cus_mobilephone: any;
  Cus_fax: any;
  Cus_email: any;
  Cus_financeemail: any;
  Cus_Contactperson: any;
  productList_Main: any;
  ProdIss_Customer: any;
  ProdIss_productname: any;
  ProdIss_quantity: any;
  productIssuesQuantityForm: FormGroup;
  producttransaction_approval_id: any;
  DIDNumberLst: any;
  DemoProdLst: any;
  transApprovalList_InvPay: any;
  transApprovalList_OnlineShop: any;
  transApprovalList_DIDDemoList: any;
  transApprovalList_RMAIssueList: any;
  transApprovalList_OthersList: any;
  //RMA Group Check
  selectAll_RMACK = false;
  selectedTransactionIds_RMA: number[] = [];
  customerAppCnt: any;
  //count
  dataCenterCnt: any;
  demoProductCnt: any;
  didAppCnt: any;
  didDemoAppCnt: any;
  invPaymentCnt: any;
  leaveAppCnt: any;
  mainAppCnt: any;
  onlineShopCnt: any;
  productAppCnt: any;
  quotationAppCnt: any;
  rmaIssuesCnt: any;
  //HRA
  transApprovalList_HRAList: any;
  //data center
  transApprovalList_DataCenterList: any;
  //Others Group Check
  selectAll_OthersCK = false;
  selectedTransactionIds_Others: number[] = [];
  //HRA Group Check
  selectAll_HRACK = false;
  selectedTransactionIds_HRA: number[] = [];
  //Data Center
  selectAll_DataCenCK = false;
  selectedTransactionIds_DataCen: number[] = [];
  //Main Group Check
  selectAll_MainCK = false;
  selectedTransactionIds_Main: number[] = [];
  //Quotation Group Check
  selectAll_QuotCK = false;
  selectedTransactionIds_Quot: number[] = [];
  //Product Group Check
  selectAll_ProductCK = false;
  selectedTransactionIds_Product: number[] = [];
  //DID Number Group Check
  selectAll_DIDNumberCK = false;
  selectedTransactionIds_DIDNumber: number[] = [];
  //Demo Product Group Check
  selectAll_DemoProductCK = false;
  selectedTransactionIds_DemoProduct: number[] = [];
  //Trans Approval List Group Check
  selectAll_InvTransAppCK = false;
  selectedTransactionIds_InvTransApp: number[] = [];
  //DID Demo List Group Check
  selectAll_DIDDemoCK = false;
  selectedTransactionIds_DIDDemo: number[] = [];
  //share Permission-Main
  sharePermission_Main_ID:any;
  sharePermissionList_Main:any;
   quotationApprovalForm: FormGroup;
   quotationApprovalResult: any;
   checked = true;
   Approval_Type_radiobox_Value: any = 'single';
   quotationApprovedBy: any;
   approvalUserID_Radio: any;
   approval_Show_hide: boolean = true;
  textarea_Show_hide: boolean;
  textarea1_Show_hide: boolean;
  approval_comments: any;
  //email
  emailForm: FormGroup;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  Select_To_Type_radiobox_Value: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  groupSelect_emailCCId: any;
  Rma_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  rma_issue_id: any;
  emailbillerName: any;
  getCustomerEmail: any;
  getCustomerEmailCompany: any;
  userId: any;
  fileUrl: any;

  constructor(public serverService: ServerService, private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('erp_c4c_user_id');
    this.getMainList({});
    this.getTransactionCounts();
    // this.getTransactionApprovalList({});

    this.transactionApprovalViewForm = new FormGroup({
      'billerName': new FormControl(null),
      'Date': new FormControl(null),
      'priority': new FormControl(null),

    });
    this.BeforeApprovaltransactionApprovalViewForm = new FormGroup({
      'BeforeApprovalbillerName': new FormControl(null),
      'BeforeApprovalDate': new FormControl(null),
      'BeforeApprovalpriority': new FormControl(null),

    });
    this.transactionApprovalCommentsForm = new FormGroup({
      'Comments': new FormControl(null),
      'toggleOff': new FormControl(null),

    });
    this.productIssuesQuantityForm = new FormGroup({
      'productQty': new FormControl(null),

    });

    this.transactionApprovalCommentsForm_main = new FormGroup({
      'Comments': new FormControl(null),
      'toggleOff': new FormControl(null),

    });
    this.BeforeApprovaltransactionApprovalCommentsForm = new FormGroup({
      'BeforeApprovalComments': new FormControl(null),
      'BeforeApprovaltoggleOff': new FormControl(null),

    });
    this.BeforeApprovaltransactionApprovalCommentsForm_main = new FormGroup({
      'BeforeApprovalComments': new FormControl(null),
      'BeforeApprovaltoggleOff': new FormControl(null),

    });
    this.quotationApprovalForm = new FormGroup({
      'cm_chk': new FormControl(null),
      'cd_chk': new FormControl(null),
      'radio_approvalPermission': new FormControl(null),
      'approval_comments': new FormControl(null),
      'comments_approvedBy': new FormControl(null),
    
    });
    this.emailForm = new FormGroup({
     
      'email_From': new FormControl(null, [Validators.required]),
      'email_to': new FormControl('', Validators.required),
      'email_template': new FormControl(null, [Validators.required]),
      'Subject_Content': new FormControl('', Validators.required),

      // 'email_pdfType': new FormControl(null, Validators.required),
    });
  }




  toggleSelectAll() {
    this.transApprovalList_RMAIssueList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_RMACK;
      this.updateSelectedTransactions(item);
    });
  }
  updateSelectAllState() {
    this.selectAll_RMACK = this.transApprovalList_RMAIssueList.every((item: { checked: boolean; }) => item.checked);
  }

  updateSelectedTransactions(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_RMA.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_RMA.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_RMA = this.selectedTransactionIds_RMA.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_RMA);
  }

  toggleSelectAll_Main() {
    this.transApprovalList_Main.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_MainCK;
      this.updateSelectedTransactions_Main(item);
    });
  }

  updateSelectedTransactions_Main(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_Main.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_Main.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_Main = this.selectedTransactionIds_Main.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_Main);

  }

  toggleSelectAll_Quot() {
    this.transApprovalList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_QuotCK;
      this.updateSelectedTransactions_Quot(item);
    });
  }

  updateSelectedTransactions_Quot(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_Quot.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_Quot.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_Quot = this.selectedTransactionIds_Quot.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_Quot);

  }
  toggleSelectAll_Product() {
    this.productList_Main.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_ProductCK;
      this.updateSelectedTransactions_Product(item);
    });
  }

  updateSelectedTransactions_Product(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_Product.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_Product.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_Product = this.selectedTransactionIds_Product.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_Product);

  }
  toggleSelectAll_DIDNumber() {
    this.DIDNumberLst.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_DIDNumberCK;
      this.updateSelectedTransactions_DIDNumber(item);
    });
  }
  toggleSelectAll_DemoProduct() {
    this.DemoProdLst.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_DemoProductCK;
      this.updateSelectedTransactions_DemoProduct(item);
    });
  }

  updateSelectedTransactions_DemoProduct(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_DemoProduct.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_DemoProduct.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_DemoProduct = this.selectedTransactionIds_DemoProduct.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_DemoProduct);

  }

  updateSelectedTransactions_DIDNumber(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_DIDNumber.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_DIDNumber.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_DIDNumber = this.selectedTransactionIds_DIDNumber.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_DIDNumber);

  }
  toggleSelectAll_InvTransApp() {
    this.transApprovalList_InvPay.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_InvTransAppCK;
      this.updateSelectedTransactions_InvTransApp(item);
    });
  }

  updateSelectedTransactions_InvTransApp(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_InvTransApp.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_InvTransApp.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_InvTransApp = this.selectedTransactionIds_InvTransApp.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_InvTransApp);

  }

  toggleSelectAll_DIDDemo() {
    this.transApprovalList_DIDDemoList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_DIDDemoCK;
      this.updateSelectedTransactions_DIDDemo(item);
    });
  }

  updateSelectedTransactions_DIDDemo(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_DIDDemo.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_DIDDemo.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_DIDDemo = this.selectedTransactionIds_DIDDemo.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_DIDDemo);

  }

  CB_Toggle(event: any) {
    this.checkboxCB_ToggleStatus = event.target.checked;

  }
  CB_BeforeApprovalToggle(event: any) {
    this.checkboxCB_BeforeApprovalToggleStatus = event.target.checked;

  }
  selectAll(event: any) {

    if (event.target.checked == true) {

      this.transApprovalList.forEach((element: any, index: any) => {
        $("#check-transapp-grp-" + index).prop('checked', true);
      });
    } else {
      this.transApprovalList.forEach((element: any, index: any) => {
        $("#check-transapp-grp-" + index).prop('checked', false);
      });
    }
  }

  selectAll_Main(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.transApprovalList_Main.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (!this.edit_arrayMain.includes(list.transaction_approval_id)) {
          this.edit_arrayMain.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayMain.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayMain.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayMain);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayMain);
  }
  selectAll_RMA(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.transApprovalList_RMAIssueList.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (!this.edit_arrayMain.includes(list.transaction_approval_id)) {
          this.edit_arrayMain.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayMain.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayMain.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayMain);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayMain);
  }

  selectAll_DIDNumber(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.DIDNumberLst.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (list.approval_staus === 0 && !this.edit_arrayDIDNum.includes(list.transaction_approval_id)) {
          this.edit_arrayDIDNum.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayDIDNum.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayDIDNum.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayDIDNum);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayDIDNum);
  }
  selectAll_DIDDemo(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.transApprovalList_DIDDemoList.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (list.approval_staus === 0 && !this.edit_arrayDIDdemo.includes(list.transaction_approval_id)) {
          this.edit_arrayDIDdemo.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayDIDdemo.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayDIDdemo.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayDIDdemo);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayDIDdemo);
  }

  selectAll_OnlineShop(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.transApprovalList_OnlineShop.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (list.approval_staus === 0 && !this.edit_arrayMain.includes(list.transaction_approval_id)) {
          this.edit_arrayMain.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayMain.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayMain.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayMain);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayMain);
  }


  selectAll_ProductIssue(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.productList_Main.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add transaction_approval_id to the edit_array
      if (isChecked) {
        if (list.approval_staus === 0 && !this.edit_arrayProductIssue.includes(list.transaction_approval_id)) {
          this.edit_arrayProductIssue.push(list.transaction_approval_id);
        }
      } else {
        // If it's unchecked, remove transaction_approval_id from the edit_array
        const index = this.edit_arrayProductIssue.findIndex((el: any) => el === list.transaction_approval_id);
        if (index > -1) {
          this.edit_arrayProductIssue.splice(index, 1);
        }
      }
    });
    //  console.log("Checkbox-all", this.edit_arrayProductIssue);
    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_arrayProductIssue);
  }


  EditCHK(transaction_approval_id: any, event: any, approval_staus: any) {

    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonIdMain = transaction_approval_id;
    this.checkbox_valueMain = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (transaction_approval_id !== undefined) {
      if (this.checkbox_valueMain) {
        // Check if data is not already in the array and is not undefined
        if (approval_staus === 0 && !this.edit_arrayMain.includes(transaction_approval_id)) {
          this.edit_arrayMain.push(transaction_approval_id);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_arrayMain);
      } else {
        const index = this.edit_arrayMain.findIndex((el: any) => el === transaction_approval_id);
        if (index > -1) {
          this.edit_arrayMain.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_arrayMain);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_arrayMain);
  }

  EditCHK_DIDNum(transaction_approval_id: any, approval_staus: any, event: any) {

    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonIdDIDNum = transaction_approval_id;
    this.checkbox_valueDIDNum = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (transaction_approval_id !== undefined) {
      if (this.checkbox_valueDIDNum) {
        // Check if data is not already in the array and is not undefined
        if (approval_staus === 0 && !this.edit_arrayDIDNum.includes(transaction_approval_id)) {
          this.edit_arrayDIDNum.push(transaction_approval_id);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_arrayDIDNum);
      } else {
        const index = this.edit_arrayDIDNum.findIndex((el: any) => el === transaction_approval_id);
        if (index > -1) {
          this.edit_arrayDIDNum.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_arrayDIDNum);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_arrayDIDNum);
  }
  EditCHK_DIDDemo(transaction_approval_id: any, approval_staus: any, event: any) {

    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonIdDIDdemo = transaction_approval_id;
    this.checkbox_valueDIDdemo = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (transaction_approval_id !== undefined) {
      if (this.checkbox_valueDIDdemo) {
        // Check if data is not already in the array and is not undefined
        if (approval_staus === 0 && !this.edit_arrayDIDdemo.includes(transaction_approval_id)) {
          this.edit_arrayDIDdemo.push(transaction_approval_id);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_arrayDIDdemo);
      } else {
        const index = this.edit_arrayDIDdemo.findIndex((el: any) => el === transaction_approval_id);
        if (index > -1) {
          this.edit_arrayDIDdemo.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_arrayDIDdemo);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_arrayDIDdemo);
  }


  EditCHK_ProdIssue(transaction_approval_id: any, event: any, approval_staus: any) {

    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonIdProductIssue = transaction_approval_id;
    this.checkbox_valueProductIssue = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (transaction_approval_id !== undefined) {
      if (this.checkbox_valueProductIssue) {
        // Check if data is not already in the array and is not undefined
        if (approval_staus === 0 && !this.edit_arrayProductIssue.includes(transaction_approval_id)) {
          this.edit_arrayProductIssue.push(transaction_approval_id);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_arrayProductIssue);
      } else {
        const index = this.edit_arrayProductIssue.findIndex((el: any) => el === transaction_approval_id);
        if (index > -1) {
          this.edit_arrayProductIssue.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_arrayProductIssue);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_arrayProductIssue);
  }

  productIssue(data: any) {
    this.edit_arrayMain = [];
    console.log("test");
    // this.tabValue = response.tab_name;
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/product_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "product_approval";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.productList_Main = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  DIDNumberList(data: any) {
    console.log("DID number test");
    this.edit_arrayMain = [];
    // this.tabValue = response.tab_name;
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/didNumberList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "didNumberList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.DIDNumberLst = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  DemoProductList(data: any) {

    // this.tabValue = response.tab_name;
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/demoProductList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "demoProductList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.DemoProdLst = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  getMainList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/main_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "main_approval";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_Main = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  onlineShopList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/onlineShopList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "onlineShopList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_OnlineShop = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  DIDDemoList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/didDemoList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "didDemoList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_DIDDemoList = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  DataCenterList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/dataCenterList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "transaction_approval/dataCenterList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_DataCenterList = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  HRAList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/hraList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "transaction_approval/hraList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_HRAList = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  OthersList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/othersList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "transaction_approval/othersList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_OthersList = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  RMAIssueList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/rmaIssuesList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "transaction_approval/rmaIssuesList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_RMAIssueList = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  invoicePaymentList(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/invPaymentList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "invPaymentList";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_InvPay = response.trans_approve_list;
        this.tabValue = response.tab_name;


        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  getMainList1(data: any) {
    this.edit_arrayMain = [];
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/main_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "main_approval";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList_Main = response.trans_approve_list;
        this.tabValue = response.tab_name;
        this.mainApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });
  }
  getTransactionApprovalList(data: any) {

    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "quotation_approval";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList = response.trans_approve_list;
        this.tabValue = response.tab_name;
        this.quotationID = response.link_approval_id;
        this.FromID = response.enquiry_from_id;
        this.Subject = response.enquiry_product_description;
        this.validDay = response.quotation_valid_day;
        this.version = response.duplicate_version;
        this.duplicateVersion = response.duplicate_version;
        this.productDescription = response.enquiry_product_description;

        this.BillerName = response.billerName;
        this.Priority = response.priority;
        this.date = response.transaction_date;
        this.quotationApprovalPendingCount = response.trans_approve_pending_cnt;
        // console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });

  }
  getTransactionApprovalList1(data: any) {

    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "quotation_approval";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList = response.trans_approve_list;
        this.tabValue = response.tab_name;
        this.quotationID = response.link_approval_id;
        this.FromID = response.enquiry_from_id;
        this.Subject = response.enquiry_product_description;
        this.validDay = response.quotation_valid_day;
        this.version = response.duplicate_version;
        this.duplicateVersion = response.duplicate_version;
        this.productDescription = response.enquiry_product_description;


        this.BillerName = response.billerName;
        this.Priority = response.priority;
        this.date = response.transaction_date;

        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });

  }
  listDataInfo(list_data: any) {


    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  BeforeApprovaltransactionApprovalView(billerName: any, transaction_date: any, priority: any) {


    this.BeforeApprovaltransactionApprovalViewForm.setValue({
      'BeforeApprovalbillerName': billerName,
      'BeforeApprovalDate': transaction_date,
      'BeforeApprovalpriority': priority,

    });

  }


  BeforeApprovaltransactionApprovalView_Main(transaction_approval_id: any, type_of_trans: any) {
    this.spinner.show();

    let api_req: any = new Object();
    let BeforeApprovalTransactionAproveViewFn_req: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/viewApprovalDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    BeforeApprovalTransactionAproveViewFn_req.action = "viewApprovalDetails";
    BeforeApprovalTransactionAproveViewFn_req.user_id = localStorage.getItem('erp_c4c_user_id');
    BeforeApprovalTransactionAproveViewFn_req.trans_id = transaction_approval_id;
    api_req.element_data = BeforeApprovalTransactionAproveViewFn_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.transactionTypeNumber = type_of_trans;
        //purchase entry
        if (this.transactionTypeNumber == 3) {
          this.purchaseEntryNo = response.transData[0].purchaseEntryNo;
          this.vendorName = response.transData[0].vendorId;
          this.invoiceNo = response.transData[0].invoiceNo;
          this.contentOfPurchase = response.transData[0].content_purchase;
          this.poNumber = response.transData[0].poNo;
          this.currency = response.transData[0].currencyId;
          this.currencyConversionRate = response.transData[0].conversionRate;
          this.taxAmount = response.transData[0].taxAmount;
          this.invoiceAmount = response.transData[0].invoiceAmount;
        } else if (this.transactionTypeNumber == 5) { //petty cash
          this.comments = response.data.commands;
          this.PC_Description = response.transData[0].petty_description;
          this.PC_Type = response.transData[0].petty_type;
          this.PC_Amount = response.transData[0].petty_amount;
        } else if (this.transactionTypeNumber == 13) { //product issue
          this.ProdIss_Customer = response.transData[0].customerName;
          this.ProdIss_productname = response.transData[0].productName;
          this.ProdIss_quantity = response.transData[0].qty;

        } else if (this.transactionTypeNumber == 64) {
          this.Cus_CustomerName = response.transData[0].companyName;
          this.Cus_billerName = response.transData[0].billerId;
          this.Cus_address1 = response.transData[0].customerAddress1;
          this.Cus_address2 = response.transData[0].customerAddress2;
          this.Cus_City = response.transData[0].city;
          this.Cus_state = response.transData[0].state;
          this.Cus_zipcode = response.transData[0].zipCode;

          this.Cus_country = response.transData[0].country;
          this.Cus_phone = response.transData[0].customerPhone;
          this.Cus_mobilephone = response.transData[0].mobilePhone;
          this.Cus_fax = response.transData[0].fax;
          this.Cus_email = response.transData[0].email;
          this.Cus_financeemail = response.transData[0].finance_email;
          this.Cus_Contactperson = response.transData[0].customerName;
        }
        this.BeforeApprovaltransactionApprovalViewForm.setValue({
          'BeforeApprovalbillerName': response.data.billerId,
          'BeforeApprovalDate': response.data.transaction_date,
          'BeforeApprovalpriority': response.data.priority,
        });


        // this.getTransactionApprovalList({});
        iziToast.success({
          message: "View Details Displayed",
          position: 'topRight'
        });
      }
      else {
        iziToast.warning({
          message: "Not Ok",
          position: 'topRight'
        });
      }
    });


  }
  transactionApprovalView(billerName: any, transaction_date: any, priority: any) {


    this.transactionApprovalViewForm.setValue({
      'billerName': billerName,
      'Date': transaction_date,
      'priority': priority,

    });

  }
  transactionApprovalView_Main(billerName: any, transaction_date: any, priority: any) {


    this.transactionApprovalViewForm.setValue({
      'billerName': billerName,
      'Date': transaction_date,
      'priority': priority,

    });

  }
  before(id: any) {
    this.BeforeApprovalTransactionAproveView_TransactionApproveID = id;
  }
  BeforeApprovalTransactionAproveViewFn() {
    this.spinner.show();

    let api_req: any = new Object();
    let BeforeApprovalTransactionAproveViewFn_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/main_approved";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    BeforeApprovalTransactionAproveViewFn_req.action = "main_approved";
    BeforeApprovalTransactionAproveViewFn_req.user_id = localStorage.getItem('erp_c4c_user_id');
    BeforeApprovalTransactionAproveViewFn_req.transaction_approval_id = this.BeforeApprovalTransactionAproveView_TransactionApproveID;
    api_req.element_data = BeforeApprovalTransactionAproveViewFn_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        $("#BeforeApprovaltransactionApprovalViewId").modal("hide");
        this.getTransactionApprovalList({});
        iziToast.success({
          message: "Approved",
          position: 'topRight'
        });
      }
      else {
        iziToast.warning({
          message: "Not Ok",
          position: 'topRight'
        });
      }
    });


  }
  transactionApprovalCommentEdit(id: any) {
    this.spinner.show();
    this.TransactionApprovalID = id;

    let api_req: any = new Object();
    let transAproveComment_edit_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/get_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_edit_req.action = "get_quotation_comments";
    transAproveComment_edit_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_edit_req.transaction_approval_id = this.TransactionApprovalID;
    api_req.element_data = transAproveComment_edit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.commentDisplayResult = response.comments;

        // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)

      }
      else {
        $("#transactionApprovalCommentsId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  transactionApprovalCommentEdit_Main(id: any) {


    this.TransactionApprovalID = id;

    let api_req: any = new Object();
    let transAproveComment_edit_req: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/getCommands";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_edit_req.action = "getCommands";
    transAproveComment_edit_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_edit_req.trans_id = this.TransactionApprovalID;
    api_req.element_data = transAproveComment_edit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {

        this.commentDisplayResult = response.commands;

        // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)

      }
      else {
        $("#transactionApprovalCommentsId").modal("hide");
        // iziToast.error({
        //   message: "Data Not Found",
        //   position: 'topRight'
        // });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      this.spinner.hide();
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  transactionApprovalCommentsUpdate($event: MouseEvent) {

    this.spinner.show();
    let api_req: any = new Object();
    let transAproveComment_update_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/update_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_update_req.action = "update_quotation_comments";
    transAproveComment_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_update_req.transaction_approval_id = this.TransactionApprovalID;
    transAproveComment_update_req.comments = this.BeforeApprovaltransactionApprovalCommentsForm.value.BeforeApprovalComments;
    api_req.element_data = transAproveComment_update_req;

    ($event.target as HTMLButtonElement).disabled = true;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {
        // this.BeforeApprovaltransactionApprovalCommentsForm.reset();
        $("#BeforeApprovaltransactionApprovalCommentsIdMain").modal("hide");
        this.getTransactionApprovalList({});


        iziToast.success({
          message: "Transaction Approval Comments has been Updated",
          position: 'topRight'
        });
      }
      else {
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });

  }
  transactionApprovalCommentsUpdate_Main(event: any) {

    this.spinner.show();
    let api_req: any = new Object();
    let transAproveComment_update_req: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/updatecommands";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_update_req.action = "updatecommands";
    transAproveComment_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_update_req.trans_id = this.TransactionApprovalID;
    transAproveComment_update_req.checkbox = this.checkboxCB_BeforeApprovalToggleStatus;
    transAproveComment_update_req.commands = this.BeforeApprovaltransactionApprovalCommentsForm_main.value.BeforeApprovalComments;
    api_req.element_data = transAproveComment_update_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        // this.BeforeApprovaltransactionApprovalCommentsForm.reset();
        $("#BeforeApprovaltransactionApprovalCommentsIdMain").modal("hide");
        this.getMainList({});


        iziToast.success({
          message: "Transaction Approval Comments has been Updated",
          position: 'topRight'
        });
      }
      else {
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });

  }
  transactionApprovalCommentsUpdateAfterApproval($event: MouseEvent) {
    this.spinner.show();

    let api_req: any = new Object();
    let transAproveCommentAP_update_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/update_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveCommentAP_update_req.action = "update_quotation_comments";
    transAproveCommentAP_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveCommentAP_update_req.transaction_approval_id = this.TransactionApprovalID;
    transAproveCommentAP_update_req.comments =
      this.transactionApprovalCommentsForm.value.Comments;
    api_req.element_data = transAproveCommentAP_update_req;

    ($event.target as HTMLButtonElement).disabled = true;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {

        $("#transactionApprovalCommentsId").modal("hide");
        iziToast.success({
          message: "Transaction Approval Comments has been Updated",
          position: 'topRight'
        });
      }
      else {
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });
  }
  transactionApprovalCommentsUpdateAfterApproval_Main($event: MouseEvent) {
    this.spinner.show();
    let api_req: any = new Object();
    let transAproveCommentAP_update_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/update_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveCommentAP_update_req.action = "update_quotation_comments";
    transAproveCommentAP_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveCommentAP_update_req.transaction_approval_id = this.TransactionApprovalID;
    transAproveCommentAP_update_req.comments =
      this.transactionApprovalCommentsForm_main.value.Comments;
    api_req.element_data = transAproveCommentAP_update_req;

    ($event.target as HTMLButtonElement).disabled = true;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {

        $("#transactionApprovalCommentsIdMain").modal("hide");
        iziToast.success({
          message: "Transaction Approval Comments has been Updated",
          position: 'topRight'
        });
      }
      else {
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });
  }

  transactionApprovalQuotationApproved(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotAprove_req: any = new Object();
        api_req.moduleType = "transaction_approval";
        api_req.api_url = "transaction_approval/quotation_approved";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotAprove_req.action = "quotation_approved";
        transAproveQuotAprove_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotAprove_req.transaction_approval_id = id;
        api_req.element_data = transAproveQuotAprove_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            iziToast.success({
              message: "Approval Success",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Not Ok",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  transactionApprovalQuotationApproved_Main(id: any, approveType: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotAprove_req: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/approvalData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotAprove_req.action = "approvalData";
        transAproveQuotAprove_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotAprove_req.trans_id = id;
        api_req.element_data = transAproveQuotAprove_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            if (approveType == 'Product Issues') {
              this.productIssue({});
            } else if (approveType == 'OnlineShop') {
              this.getMainList({});
            } else if (approveType == 'InvTransApp') {
              this.invoicePaymentList({});
            } else if (approveType == 'DIDNumber') {
              this.DIDNumberList({});
            } else if (approveType == 'DemoProduct') {
              this.DemoProductList({});
            }
            else {
              this.getMainList({});
            }

            iziToast.success({
              message: "Approval Success",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Not Ok",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }


  transactionApprovalReject(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotReject_req: any = new Object();
        api_req.moduleType = "transaction_approval";
        api_req.api_url = "transaction_approval/quotation_rejected";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotReject_req.action = "quotation_rejected";
        transAproveQuotReject_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotReject_req.transaction_approval_id = id;
        api_req.element_data = transAproveQuotReject_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            iziToast.success({
              message: "Approval Rejected ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Rejected Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  transactionApprovalReject_Others(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotReject_req: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/OthersDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotReject_req.action = "transaction_approval/OthersDelete";
        transAproveQuotReject_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotReject_req.transaction_approval_id = id;
        api_req.element_data = transAproveQuotReject_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();

          if (response.status == true) {
            this.OthersList({});

            iziToast.success({
              message: "Others Approval Rejected ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Others Rejected Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  transactionApprovalReject_Main(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotReject_req: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/rejectData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotReject_req.action = "rejectData";
        transAproveQuotReject_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotReject_req.trans_id = id;
        api_req.element_data = transAproveQuotReject_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();

          if (response.status == true) {
            this.getMainList({});
            iziToast.success({
              message: "Main Approval Rejected ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Main Rejected Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  transactionApprovalDelete_Main(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let transAproveQuotReject_req: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/transaction_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        transAproveQuotReject_req.action = "transaction_delete";
        transAproveQuotReject_req.user_id = localStorage.getItem('erp_c4c_user_id');
        transAproveQuotReject_req.trans_id = id;
        api_req.element_data = transAproveQuotReject_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();

          if (response.status == true) {
            this.getMainList({});
            iziToast.success({
              message: "Main Approval Rejected ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Main Rejected Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  transactionApprovalMainApprovalList(data: any) {
    var list_data = this.listDataInfo(data);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let mainappr: any = new Object();
        api_req.moduleType = "transaction_approval";
        api_req.api_url = "transaction_approval/main_approval";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        mainappr.action = "main_approval";
        mainappr.user_id = localStorage.getItem('erp_c4c_user_id');

        mainappr.off_set = list_data.offset;
        mainappr.current_page = "";
        mainappr.limit_val = list_data.limit;
        api_req.element_data = mainappr;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            iziToast.success({
              message: "Main Approval Success ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Rejected Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }
  transactionApprovalPDF(Id: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + Id + "";
    window.open(url, '_blank');

  }

  transactionApprovalQuotationEdit(link_approval_id: any, enquiry_from_id: any, enquiry_product_description: any, quotation_valid_day: any, duplicate_version: any) {

    var x1 = link_approval_id;
    var x2 = enquiry_from_id;
    var x3 = enquiry_product_description;
    var x4 = quotation_valid_day;
    var x5 = duplicate_version;
    // e_quotID: '16323', 
    // e_formID:'4', 
    // e_subject: 'Test', 
    // e_validity: '3', 
    // e_version: '1.0', 
    // this is for redirecting to another url
    var url = 'http://localhost:4200/#/editquotationnew?e_quotID=' + x1 + '&e_formID=' + x2 + '&e_subject=' + x3 + '&e_validity=' + x4 + '&e_version=' + x5 + '';
    window.open(url, '_blank');

    //   this.router.navigate(['/editquotationnew'],{ queryParams: { 


    //     e_quotID: x1, 
    //     e_formID:x2, 
    //     e_subject: x3, 
    //     e_validity: x4, 
    //     e_version: x5, 
    //   } 
    // });

    // window.open(url, '_blank');
  }
  approveAllRMA() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve All!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let mainappr: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/approvalAllData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        mainappr.action = "approvalAllData";
        mainappr.user_id = localStorage.getItem('erp_c4c_user_id');
        mainappr.trans_id = this.selectedTransactionIds_RMA;

        api_req.element_data = mainappr;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            this.edit_arrayMain = [];
            iziToast.success({
              message: "RMA Approval Success ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "RMA Approval Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }

  approveAllMain() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve All!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let mainappr: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/approvalAllData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        mainappr.action = "approvalAllData";
        mainappr.user_id = localStorage.getItem('erp_c4c_user_id');

        if (this.tabValue == 'main') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'quotation') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Product') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDNumber') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Demoproduct....') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'InvTransApp') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'OnlineShop') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDDemo') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'RMAIssues') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Others') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'HRA') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DataCenter') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        }



        api_req.element_data = mainappr;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            this.edit_arrayMain = [];
            iziToast.success({
              message: "Main Approval Success ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Main Approval Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }
  approveAllProductIssue() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve All!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let mainappr: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/approvalAllData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        mainappr.action = "approvalAllData";
        mainappr.user_id = localStorage.getItem('erp_c4c_user_id');
        if (this.tabValue == 'main') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'quotation') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Product') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDNumber') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Demoproduct....') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'InvTransApp') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'OnlineShop') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDDemo') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'RMAIssues') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Others') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'HRA') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DataCenter') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        }
        // mainappr.trans_id = this.edit_arrayProductIssue;

        api_req.element_data = mainappr;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.productIssue({});
            // this.getTransactionApprovalList({});
            this.edit_arrayProductIssue = [];
            iziToast.success({
              message: "Product Issue Approval Success ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Product Issue Approval Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }

  rejectAllMain() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject All!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let mainappr: any = new Object();
        api_req.moduleType = "transactionApprovalList";
        api_req.api_url = "transaction_approval/rejectAllData";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        mainappr.action = "rejectAllData";
        mainappr.user_id = localStorage.getItem('erp_c4c_user_id');
        // mainappr.trans_id = this.edit_arrayMain;
        if (this.tabValue == 'main') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'quotation') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Product') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDNumber') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Demoproduct....') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'InvTransApp') {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'OnlineShop') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DIDDemo') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'RMAIssues') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'Others') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'HRA') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else if (this.tabValue == 'DataCenter') {

          mainappr.trans_id = this.selectedTransactionIds_Main;
        } else {
          mainappr.trans_id = this.selectedTransactionIds_Main;
        }

        api_req.element_data = mainappr;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            this.getTransactionApprovalList({});
            this.edit_arrayMain = [];
            iziToast.success({
              message: "Main Approval Rejection Success ",
              position: 'topRight'
            });
          } else {
            iziToast.warning({
              message: "Main Approval Rejection Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }
  productQuantityUpdate() {
    this.spinner.show();
    $("#productIssuesQuantity").modal("show");
    let api_req: any = new Object();
    let transAproveComment_update_req: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/updateProductQty";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_update_req.action = "updateProductQty";
    transAproveComment_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_update_req.trans_id = this.producttransaction_approval_id;
    transAproveComment_update_req.product_qty = this.productIssuesQuantityForm.value.productQty;
    api_req.element_data = transAproveComment_update_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();

        $("#productIssuesQuantity").modal("hide");
        this.productIssue({});
        iziToast.success({
          message: "Product Quantity Updated Successfully",
          position: 'topRight'
        });


      }
      else {
        this.spinner.hide();
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });

  }





  productQuantityChangesEdit(transaction_approval_id: any) {
    this.producttransaction_approval_id = transaction_approval_id;

    this.spinner.show();
    $("#productIssuesQuantity").modal("show");
    let api_req: any = new Object();
    let transAproveComment_update_req: any = new Object();
    api_req.moduleType = "transactionApprovalList";
    api_req.api_url = "transaction_approval/getProductQty";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_update_req.action = "getProductQty";
    transAproveComment_update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    transAproveComment_update_req.trans_id = transaction_approval_id;

    api_req.element_data = transAproveComment_update_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();

        $("#productIssuesQuantity").modal("show");
        this.productIssuesQuantityForm.patchValue({
          'productQty': response.qty
        })

      }
      else {
        this.spinner.hide();
        iziToast.error({
          message: "Transaction Approval Comments has not been Updated",
          position: 'topRight'
        });
      }
    });

  }

  getTransactionCounts() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transactionApproval";
    api_req.api_url = "transaction_approval/transaction_counts"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "transaction_counts";
    api_transactionList.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_transactionList;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.customerAppCnt = response.customerAppCnt;
        this.dataCenterCnt = response.dataCenterCnt;
        this.demoProductCnt = response.demoProductCnt;
        this.didAppCnt = response.didAppCnt;
        this.didDemoAppCnt = response.didDemoAppCnt;
        this.invPaymentCnt = response.invPaymentCnt;
        this.leaveAppCnt = response.leaveAppCnt;
        this.mainAppCnt = response.mainAppCnt;
        this.onlineShopCnt = response.onlineShopCnt;
        this.productAppCnt = response.productAppCnt;
        this.quotationAppCnt = response.quotationAppCnt;
        this.rmaIssuesCnt = response.rmaIssuesCnt;


      }
      else {

      }
    });
  }
  toggleSelectAll_Others() {
    this.transApprovalList_OthersList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_OthersCK;
      this.updateSelectedTransactions(item);
    });
  }

  updateSelectedTransactions_Others(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_Others.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_Others.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_Others = this.selectedTransactionIds_Others.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_Others);
  }
  toggleSelectAll_HRA() {
    this.transApprovalList_HRAList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_HRACK;
      this.updateSelectedTransactions_HRA(item);
    });
  }

  updateSelectedTransactions_HRA(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_HRA.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_HRA.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_HRA = this.selectedTransactionIds_HRA.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_HRA);
  }
  toggleSelectAll_DataCen() {
    this.transApprovalList_DataCenterList.forEach((item: { checked: boolean; }) => {
      item.checked = this.selectAll_DataCenCK;
      this.updateSelectedTransactions_DataCen(item);
    });
  }

  updateSelectedTransactions_DataCen(item: any) {
    if (item.checked) {
      if (!this.selectedTransactionIds_DataCen.includes(item.transaction_approval_id)) {
        this.selectedTransactionIds_DataCen.push(item.transaction_approval_id);
      }
    } else {
      this.selectedTransactionIds_DataCen = this.selectedTransactionIds_DataCen.filter(id => id !== item.transaction_approval_id);
    }
    console.log('Selected Transaction IDs:', this.selectedTransactionIds_DataCen);
  }
  sharePermission_Main(id: any) {
    $("#sharePermission_Main").modal("show");
    this.spinner.show();
   
    this.sharePermission_Main_ID = id;
    let api_req: any = new Object();
    let quot_approval_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_permission_user";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_approval_req.action = "quotation_permission_user";
    quot_approval_req.quotationId = id;
    quot_approval_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = quot_approval_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    //  console.log("response status", response.status);
      if (response.status == true) {
        this.spinner.hide();
        this.sharePermissionList_Main = response.user_list;
        this.quotationApprovalResult = response.user_list;

        // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)

      }
      else {
        $("#sharePermission_Main").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
    //  console.log("final error", error);
    }

  }
  handle_radioChange(event: any) {
    this.Approval_Type_radiobox_Value = event.target.id;
    // console.log(this.Approval_Type_radiobox_Value);

    if (this.Approval_Type_radiobox_Value == "single") {
      this.approval_Show_hide = true;

    }
    else if (this.Approval_Type_radiobox_Value == "double") {
     // console.log(this.Approval_Type_radiobox_Value);
      this.approval_Show_hide = false;

    }
  }
  checkbox_CM_QuotPermission: any;
  eventCheck_CM_QuotPermission(event: any) {
    this.checkbox_CM_QuotPermission = event.target.checked;
   // console.log(this.checkbox_CM_QuotPermission)
  }

  checkbox_CD_QuotPermission: any;
  eventCheck_CD_QuotPermission(event: any) {
    this.checkbox_CD_QuotPermission = event.target.checked;
   // console.log(this.checkbox_CD_QuotPermission)
  }
  handleChange(evt: any, userId: any) {

    this.approvalUserID_Radio = userId;
    var xyz = evt.target.id;
    this.quotationApprovedBy = this.approvalUserID_Radio;
   // console.log(xyz, "target");
    if (xyz == "0") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = true;
      this.textarea1_Show_hide = false;
    }
    else if (xyz == "1") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "2") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "3") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "4") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "5") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "6") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "7") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "8") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "9") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
  }
  quotationApprovalUpdate() {}
  
  Email(id: any) {
    // this.emailForm.reset();
    $('#emailFrom').val('');
    $('#template').val('');
    $('#subject').val('');
    this.msg_id = '';
    tinymce.activeEditor.setContent('');
    $('#TextEditorId_TM').modal('show');

    this.rma_issue_id = id;

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getEmailDatas',
      api_type: 'web',
      element_data: {
        action: 'getEmailDatas',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
        
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
       
        if (response.fromEmails !== null && response.fromEmails !== undefined) {
          this.email_fromList = response.fromEmails;
        }
        if (response.rmaTemplateList !== null && response.rmaTemplateList !== undefined) {
          this.email_crmTemplateList = response.rmaTemplateList;
        }
        if (response.billerName !== null && response.billerName !== undefined) {
          this.emailbillerName = response.billerName;
        }
        if (response.getCustomerEmail !== null && response.getCustomerEmail !== undefined) {
          this.getCustomerEmail = response.getCustomerEmail;
        }
        if (response.getCustomerEmail.email !== null && response.getCustomerEmail.email !== undefined) {
          this.getCustomerEmailCompany = response.getCustomerEmail.email;
        }
        if (response.attachment !== null && response.attachment !== undefined) {
          this.fileUrl = response.attachment;
        }
 
      }
    });
  }
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    if (this.Select_To_Type_radiobox_Value === 'company') {
      this.emailForm.patchValue({ email_to: this.getCustomerEmail.email });
    } else if (this.Select_To_Type_radiobox_Value === 'finance') {
      this.emailForm.patchValue({
        email_to: this.getCustomerEmail.finance_email,
      });
    }
  }
  templateContentEmailDropdown(event: any) {
    this.spinner.show();
    this.Rma_Emailtemplate_id = event.target.value;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getTemplateData',
      api_type: 'web',
      element_data: {
        action: 'getTemplateData',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
        template_id: this.Rma_Emailtemplate_id,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      //  console.log("quotation-template Dropdown response", response)

      if ((response.status = true)) {
        this.spinner.hide();
        this.messageContent = response.crm_template_content;
        this.mailContent = tinymce
          .get('tinyID_RMA1')
          .setContent('<p>' + this.messageContent + '</p>');

        this.emailForm.patchValue({
          Subject_Content: response.crm_subject_name,

          tinyID_RMA1: this.mailContent,
        });
      } else {
        this.spinner.hide();
        this.emailForm.patchValue({
          email_template: '',
        });
      }
    });
  }
  sendMail() {
    let email_From = this.emailForm.value.email_From;
    let Subject_Content = this.emailForm.value.Subject_Content;
    let email_template = this.emailForm.value.email_template;
    let email_to_string = this.emailForm.value.email_to;
    let email_to = email_to_string.split(',');
    var message_contend = tinymce.get('tinyID_RMA1').getContent();

    if (
      email_From === '' ||
      email_From === null ||
      email_From === undefined ||
      email_From === 'undefined'
    ) {
      iziToast.warning({
        message: `please Select From )`,
        position: 'topRight',
      });

      return false;
    }
    if (
      email_to_string === '' ||
      email_to_string === null ||
      email_to_string === undefined ||
      email_to_string === 'undefined'
    ) {
      iziToast.warning({
        message: `please Enter To email )`,
        position: 'topRight',
      });

      return false;
    }
    if (
      email_template === '' ||
      email_template === null ||
      email_template === undefined ||
      email_template === 'undefined'
    ) {
      iziToast.warning({
        message: `please Select Template )`,
        position: 'topRight',
      });

      return false;
    }

    this.spinner.show();

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/sendRmaEmail',
      api_type: 'web',
      element_data: {
        action: 'sendRmaEmail',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
        template_id: email_template,
        crm_subject_name: Subject_Content,
        email_from: email_From,
        to_email: email_to,
        crm_template_content: message_contend,
        billerName: this.emailbillerName,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        iziToast.success({
          message: response.message,
          position: 'topRight',
        });
        $('#TextEditorId_TM').modal('hide');
        this.RMAIssueList({});
        this.spinner.hide();
      }
    });
  }
  emailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.RMAIssueList({});
    tinymce.activeEditor.setContent('');
  }




}
