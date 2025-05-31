import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recurring-dateupdate',
  templateUrl: './recurring-dateupdate.component.html',
  styleUrls: ['./recurring-dateupdate.component.css']
})
export class RecurringDateupdateComponent implements OnInit {
  recurringCheckList: any;
  InvoiceSendingMethodForm: FormGroup;
  InvoiceSendingValue: any;
  billId_InvoicePost: any;
  //list-checkbox all
  checkbox_value: any;
  ckbx_array: any = [];
  user_Ids: string;
  //multipleRecurrDateUpdateForm
  multipleRecurrDateUpdateForm: FormGroup;
  date: any;
  //recurring
  RecurringForm: FormGroup;
  recurringState: any;
  recurring_State_value: any;
  CBV_FixedChargeDt: any;
  CBV_UsageChargeDt: any;
  recurringDetails: any;
  reccuringDuration: any;
  recurringDetails_fixed_next_dt: any;
  recurringDetails_usage_next_dt: any;
  recuringStatus: any;
  recurring_BillerID: any;
  TermDetailsList: any;
  recurringTypeValue: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.recurringTypeValue='';
    this.user_Ids = localStorage.getItem('erp_c4c_user_id');
    this.recurringState = [{ "id": 1, "name": "Active" }, { "id": 0, "name": "Inactive" }];
    this.recurringCheckerList();
    this.RecurringForm = new FormGroup({
      'date': new FormControl(null),
      'recurring_state': new FormControl(null),
      'fixedChargeDtCBX': new FormControl(null),
      'usageChargeDuration': new FormControl(null),
      'fixedChargeDuration': new FormControl(null),
      'fixedChargeDt_value': new FormControl(null),
      'usageChargeDtCBX': new FormControl(null),
      'usageChargeDt_value': new FormControl(null),

    });

  }
  radio_recurring(event: any) {
    this.recurring_State_value = event.target.id;
   // console.log(this.recurring_State_value)

  }
  CBF_FixedChargeDtFn(event: any) {
    this.CBV_FixedChargeDt = event.target.checked;
   // console.log(this.CBV_FixedChargeDt);

  }
  CBF_UsageChargeDtFn(event: any) {
    this.CBV_UsageChargeDt = event.target.checked;
   // console.log(this.CBV_UsageChargeDt);

  }
  recurringCheckerList() {
   this.spinner.show();
    let api_req: any = new Object();
    let RDL_api_url: any = new Object();
    api_req.moduleType = "recurring_checker_date_update";
    api_req.api_url = "recurring_checker_date_update/get_recurring_listData";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    RDL_api_url.action = "get_recurring_listData";
    RDL_api_url.user_id = localStorage.getItem('erp_c4c_user_id');
    RDL_api_url.recurringType=this.recurringTypeValue;
    api_req.element_data = RDL_api_url;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.recurringCheckList = response.data;
      } else {
        this.spinner.hide();
      }

    }), (error: any) => {
      this.spinner.hide();
      iziToast.error({

        message: "Error",
        position: "topRight"
      })
      console.log("error", error)


    }



  }
  EditCHK(data: any, event: any) {
   // console.log("List - CheckBox ID", data);
    // this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.ckbx_array.push(data);
     // console.log("Final Checkbox After checkbox selected list", this.ckbx_array);

    }
    else {
      const index = this.ckbx_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.ckbx_array.splice(index, 1);
      }
     // console.log("Final Checkbox After Deselected selected list", this.ckbx_array)

    }
  }

  recurringStatusChecked(billid: any, chk_state: any) {
    Swal.fire({
      title: 'Are you sure to Update to next level?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result: any) => {
      if (result.value) {


        let api_req: any = new Object();
        let rcMult_req: any = new Object();
        api_req.moduleType = "recurring_date_update";

        api_req.api_url = "recurring_date_update/recurring_status_checked";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        rcMult_req.action = "recurring_status_checked";

        rcMult_req.user_id = localStorage.getItem('erp_c4c_user_id');
        rcMult_req.billId = billid;
        rcMult_req.chk_state = chk_state + 1;
        api_req.element_data = rcMult_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "Recurring Status updated successfully",
              position: 'topRight'
            });

            this.recurringCheckerList();

          } else {
            iziToast.warning({
              message: "Recurring Status updated. Please try again",
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
  NewRecurringList(){
    this.recurringTypeValue='new';
    this.recurringCheckerList();
  }
  NewRecurringTempList(){
    this.recurringTypeValue='temp';
    this.recurringCheckerList();
  }
 
  skip(billid: any) {
    Swal.fire({
      title: 'Are you sure to Skip?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Skip it!'
    }).then((result: any) => {
      if (result.value) {


        let api_req: any = new Object();
        let rcMult2_req: any = new Object();
        api_req.moduleType = "recurring_checker_date_update";

        api_req.api_url = "recurring_checker_date_update/skipRecurring";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        rcMult2_req.action = "skipRecurring";

        rcMult2_req.user_id = localStorage.getItem('erp_c4c_user_id');
        rcMult2_req.billId = billid;

        api_req.element_data = rcMult2_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "Skipped Successfully",
              position: 'topRight'
            });

            this.recurringCheckerList();

          } else {
            iziToast.warning({
              message: "Skip Failed",
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

  get_invSendPost(billid: any) {
    this.billId_InvoicePost = billid;
    this.spinner.show();
    let api_req: any = new Object();
    let getInvPost: any = new Object();
    api_req.moduleType = "recurring_date_update";
    api_req.api_url = "recurring_date_update/get_invoice_send_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    getInvPost.action = "get_invoice_send_details_update";
    getInvPost.user_id = localStorage.getItem('erp_c4c_user_id');
    getInvPost.billid = this.billId_InvoicePost;
    api_req.element_data = getInvPost;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
      //  console.log("response", response.sending_type)
        this.spinner.hide();
          // if(response.sending_type){
          //   this.InvoiceSendingMethodForm.patchValue({
          //     InvoiceSendingInput: response.sending_type
          //   });
          // }
        
        // $('#RC_invoiceSendtoPost').modal('hide');

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Error",
          position: 'topRight'
        });
        console.log("error message", error)
      };
  }
  pdf(billId: any) {

    var url =this.serverService.urlFinal + "invoice/getBillpdf?billId=" + billId + "";

    window.open(url, '_blank');
  
  }
  RecurringEdit(id: any) {

    this.spinner.show();
    this.recurring_BillerID = id;
   this.recurringCheckerList();
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reccuring_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "reccuring_details";

    api_recurring.billId = id;
    api_recurring.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        var date = response.reccuring_details.recured_date_show;
      //  console.log("date check", date)
        // $('#date123').val('01/01/1970');
        this.recurringDetails = response.reccuring_details;
        this.recurringDetails_fixed_next_dt = response.reccuring_details.fixed_next_dt;
        this.recurringDetails_usage_next_dt = response.reccuring_details.usage_next_dt;
        this.recuringStatus = response.reccuring_details.recuring_status;
        this.recurring_State_value = response.reccuring_details.recuring_status;

        this.reccuringDuration = response.reccuring_duration;
        this.TermDetailsList = response.terms_details;
        this.RecurringForm.patchValue({

          'date': response.reccuring_details.recured_date_show,
          'fixedChargeDuration': response.reccuring_details.fixed_duration,
          'fixedChargeDt_value': response.reccuring_details.fixed_next_dt,

          'usageChargeDuration': response.reccuring_details.usage_duration,
          'usageChargeDt_value': response.reccuring_details.usage_next_dt,

        })

        // $('#RecurringFormId_rd').modal("hide");
        this.recurringCheckerList();

      } else {


        iziToast.warning({
          message: "Recurring Details not displayed. Please try again",
          position: 'topRight'
        });
        $('#RecurringFormId_rd').modal("hide");
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
  RecurringUpdate() {


    this.spinner.show();


    let api_req: any = new Object();
    let api_recurringUpd: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reccuring_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurringUpd.action = "update_reccuring_details";

    api_recurringUpd.billId = this.recurring_BillerID;

    api_recurringUpd.recured_date_new = this.RecurringForm.value.date;
    api_recurringUpd.recuring_new_rdo = this.recurring_State_value;
    api_recurringUpd.fixed_charge_chk = this.CBV_FixedChargeDt;
    api_recurringUpd.fixed_charge_dt = this.RecurringForm.value.fixedChargeDt_value;
    api_recurringUpd.rec_duration_fixed = this.RecurringForm.value.fixedChargeDuration;
    api_recurringUpd.usage_charge_chk = this.CBV_UsageChargeDt;
    api_recurringUpd.usage_charge_dt = this.RecurringForm.value.usageChargeDt_value;
    api_recurringUpd.rec_duration_monthly = this.RecurringForm.value.usageChargeDuration;

    api_req.element_data = api_recurringUpd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#RecurringFormId_inv').modal('hide');

      if (response.status == true) {
        iziToast.success({
          message: "Recurring Details Updated Successfully",
          position: 'topRight'
        });
        this.recurringCheckerList();
      } else {
        iziToast.warning({
          message: "Check Response",
          position: 'topRight'
        });
        this.recurringCheckerList();

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        this.recurringCheckerList();
        console.log("final error", error);
      };


  }

}
