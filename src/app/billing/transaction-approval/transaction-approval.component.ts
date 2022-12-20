import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ServerService } from 'src/app/services/server.service';
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
  isReadOnly: boolean=true;
  checkboxCB_ToggleStatus:any;
  TransactionApprovalID:any;
  commentDisplayResult:any;
  //checkbox group
  edit_array: any = [];
  groupSelectCommonId: any;
  checkbox_value: any;

  constructor(public serverService: ServerService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTransactionApprovalList();
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
  }
  CB_Toggle(event: any) {
    this.checkboxCB_ToggleStatus = event.target.checked;
    console.log("ToggleStatus", this.checkboxCB_ToggleStatus)
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
  getTransactionApprovalList() {



    let api_req: any = new Object();
    let api_transactionList: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "transaction_approval/quotation_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_transactionList.action = "quotation_approval";
    api_transactionList.user_id = localStorage.getItem('user_id');

    api_req.element_data = api_transactionList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("approval list", response);
      this.transApprovalList = response.trans_approve_list;
      if (response) {


        console.log(response)

      }
      else {

      }
    });

  }
  transactionApprovalCommentEdit(id:any){
    this.TransactionApprovalID=id;

    let api_req: any = new Object();
    let transAproveComment_edit_req: any = new Object();
    api_req.moduleType = "transaction_approval";
    api_req.api_url = "transaction_approval/get_quotation_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transAproveComment_edit_req.action = "get_quotation_comments";
    transAproveComment_edit_req.user_id = localStorage.getItem('user_id');
    transAproveComment_edit_req.transaction_approval_id =  this.TransactionApprovalID;
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
    transAproveComment_update_req.transaction_approval_id =  this.TransactionApprovalID;
    transAproveComment_update_req.comments = this.transactionApprovalCommentsForm.value.Comments;
    api_req.element_data = transAproveComment_update_req;

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

}
