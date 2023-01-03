import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
// import { QuotationnewComponent } from '../quotationnew/quotationnew.component';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-transaction-approval',
  templateUrl: './transaction-approval.component.html',
  styleUrls: ['./transaction-approval.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionApprovalComponent implements OnInit {
  //list
  transApprovalList: any;
  transactionApprovalViewForm: FormGroup;
  BeforeApprovaltransactionApprovalViewForm: FormGroup;
  transactionApprovalCommentsForm: FormGroup;
  BeforeApprovaltransactionApprovalCommentsForm: FormGroup;
  isReadOnly: boolean = true;
  checkboxCB_ToggleStatus: any;
  checkboxCB_BeforeApprovalToggleStatus: any;
  TransactionApprovalID: any;
  commentDisplayResult: any;
  //pagination
  recordNotFound = false;
  pageLimit = 10;
  paginationData: any = { "info": "hide" };
  paginationData1: any = { "info": "hide" };
  offset_count = 1;
  //checkbox group
  edit_array: any = [];
  groupSelectCommonId: any;
  checkbox_value: any;
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
  //other
  BeforeApprovalTransactionAproveView_TransactionApproveID:any;

  constructor(public serverService: ServerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getTransactionApprovalList({});
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
    this.BeforeApprovaltransactionApprovalCommentsForm = new FormGroup({
      'BeforeApprovalComments': new FormControl(null),
      'BeforeApprovaltoggleOff': new FormControl(null),

    });
  }
  CB_Toggle(event: any) {
    this.checkboxCB_ToggleStatus = event.target.checked;
    console.log("ToggleStatus", this.checkboxCB_ToggleStatus)
  }
  CB_BeforeApprovalToggle(event: any) {
    this.checkboxCB_BeforeApprovalToggleStatus = event.target.checked;
    console.log("before approval-ToggleStatus", this.checkboxCB_BeforeApprovalToggleStatus)
  }
  selectAll(event: any) {

    if (event.target.checked == true) {

      this.transApprovalList.forEach((element: any, index: any) => {
        $("#check-grp-" + index).prop('checked', true);
      });
    } else {
      this.transApprovalList.forEach((element: any, index: any) => {
        $("#check-grp-" + index).prop('checked', false);
      });

    }

  }

  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array.push(data);
      this.edit_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array);
    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }
  getSampleCSV() {
    console.log("test");
  }
  getTransactionApprovalList(data: any) {

    console.log("data value", data)
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "quotation_approval";
    api_transactionList.user_id = localStorage.getItem('user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList = response.trans_approve_list;
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
        console.log("this.quotationApprovalPendingCount", this.quotationApprovalPendingCount)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'on' });
        this.paginationData1 = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit, 'approval_status': 'off' });


      }
      else {

      }
    });

  }
  getTransactionApprovalList1(data: any) {

    console.log("data value", data)
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "quotation_approval";
    api_transactionList.user_id = localStorage.getItem('user_id');
    api_transactionList.off_set = list_data.offset;
    api_transactionList.limit_val = list_data.limit;
    api_transactionList.current_page = "";
    api_req.element_data = api_transactionList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response) {
        //  if(=='on'){
        //   this.transApprovalList = response.trans_approve_list;
        //  }
        this.transApprovalList = response.trans_approve_list;
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
    console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  BeforeApprovaltransactionApprovalView(billerName: any, transaction_date: any, priority: any) {

    console.log("before date", transaction_date)
    this.BeforeApprovaltransactionApprovalViewForm.setValue({
      'BeforeApprovalbillerName': billerName,
      'BeforeApprovalDate': transaction_date,
      'BeforeApprovalpriority': priority,

    });

  }
  transactionApprovalView(billerName: any, transaction_date: any, priority: any) {


    this.transactionApprovalViewForm.setValue({
      'billerName': billerName,
      'Date': transaction_date,
      'priority': priority,

    });

  }
  before( id:any){
this.BeforeApprovalTransactionAproveView_TransactionApproveID=id;
  }
  BeforeApprovalTransactionAproveViewFn(){
   
      let api_req: any = new Object();
      let BeforeApprovalTransactionAproveViewFn_req: any = new Object();
      api_req.moduleType = "transaction_approval";
      api_req.api_url = "transaction_approval/quotation_approved";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      BeforeApprovalTransactionAproveViewFn_req.action = "quotation_approved";
      BeforeApprovalTransactionAproveViewFn_req.user_id = localStorage.getItem('user_id');
      BeforeApprovalTransactionAproveViewFn_req.transaction_approval_id = this.BeforeApprovalTransactionAproveView_TransactionApproveID;
      api_req.element_data = BeforeApprovalTransactionAproveViewFn_req;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
  
        if (response.status == true) {
          
          $("#BeforeApprovaltransactionApprovalViewId").modal("hide");
          this.getTransactionApprovalList({});
          iziToast.success({
            message: "Success",
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
    this.TransactionApprovalID = id;

    let api_req: any = new Object();
    let transAproveComment_edit_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/get_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_edit_req.action = "get_quotation_comments";
    transAproveComment_edit_req.user_id = localStorage.getItem('user_id');
    transAproveComment_edit_req.transaction_approval_id = this.TransactionApprovalID;
    api_req.element_data = transAproveComment_edit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

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
  transactionApprovalCommentsUpdate() {


    let api_req: any = new Object();
    let transAproveComment_update_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/update_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_update_req.action = "update_quotation_comments";
    transAproveComment_update_req.user_id = localStorage.getItem('user_id');
    transAproveComment_update_req.transaction_approval_id = this.TransactionApprovalID;
    transAproveComment_update_req.comments = this.BeforeApprovaltransactionApprovalCommentsForm.value.BeforeApprovalComments;
    api_req.element_data = transAproveComment_update_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        // this.BeforeApprovaltransactionApprovalCommentsForm.reset();
        $("#BeforeApprovaltransactionApprovalCommentsId").modal("hide");
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
  transactionApprovalCommentsUpdateAfterApproval() {
    let api_req: any = new Object();
    let transAproveCommentAP_update_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/update_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveCommentAP_update_req.action = "update_quotation_comments";
    transAproveCommentAP_update_req.user_id = localStorage.getItem('user_id');
    transAproveCommentAP_update_req.transaction_approval_id = this.TransactionApprovalID;
    transAproveCommentAP_update_req.comments =
      this.transactionApprovalCommentsForm.value.Comments;
    api_req.element_data = transAproveCommentAP_update_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

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
  transactionApprovalQuotationApproved(id: any) {
    let api_req: any = new Object();
    let transAproveQuotAprove_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_approved";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveQuotAprove_req.action = "quotation_approved";
    transAproveQuotAprove_req.user_id = localStorage.getItem('user_id');
    transAproveQuotAprove_req.transaction_approval_id = id;
    api_req.element_data = transAproveQuotAprove_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.getTransactionApprovalList({});
        iziToast.success({
          message: "Success",
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
  transactionApprovalReject(id: any) {
    let api_req: any = new Object();
    let transAproveQuotReject_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/quotation_rejected";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveQuotReject_req.action = "quotation_rejected";
    transAproveQuotReject_req.user_id = localStorage.getItem('user_id');
    transAproveQuotReject_req.transaction_approval_id = id;
    api_req.element_data = transAproveQuotReject_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.getTransactionApprovalList({});
        iziToast.success({
          message: "Rejected Success",
          position: 'topRight'
        });
      }
      else {
        iziToast.warning({
          message: "Rejected Failed",
          position: 'topRight'
        });
      }
    });
  }
  transactionApprovalPDF(Id: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + Id + "";
    window.open(url, '_blank');
    console.log("url", url)
  }

  transactionApprovalQuotationEdit(link_approval_id: any, enquiry_from_id: any, enquiry_product_description: any, quotation_valid_day: any, duplicate_version: any) {
    console.log("this.quotationID", this.quotationID)
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


}
