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
  selector: 'app-recurring-checker',
  templateUrl: './recurring-checker.component.html',
  styleUrls: ['./recurring-checker.component.css']
})
export class RecurringCheckerComponent implements OnInit {
  recurringCheckList: any;
  InvoiceSendingMethodForm:FormGroup;
  InvoiceSendingValue: any;
  billId_InvoicePost: any;
    //list-checkbox all
    checkbox_value: any;
    ckbx_array: any = [];
  user_Ids: string;
  //multipleRecurrDateUpdateForm
  multipleRecurrDateUpdateForm:FormGroup;
  date: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.user_Ids=localStorage.getItem('erp_c4c_user_id');
    this.recurringCheckerList();
    this.user_Ids=localStorage.getItem('erp_c4c_user_id');
    this.InvoiceSendingMethodForm=new FormGroup({
      'InvoiceSendingInput': new FormControl(null, [Validators.required]),
    });
    this.multipleRecurrDateUpdateForm=new FormGroup({
      'mr_date':new FormControl(null,[Validators.required]),

    })
  }
  multipleRecurring(){
    $('#RC_multipleRecurrDateUpdate').modal("show");
    $("body").removeClass("modal-open");

  }
  radio_InvoiceSendingInput(event: any) {
    this.InvoiceSendingValue = event.target.value;
    console.log("this.InvoiceSendingValue",this.InvoiceSendingValue)
  }
  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    // this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.ckbx_array.push(data);
      console.log("Final Checkbox After checkbox selected list", this.ckbx_array);

    }
    else {
      const index = this.ckbx_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.ckbx_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.ckbx_array)

    }
  }
  recurringCheckerList() {
    this.spinner.show();
    let api_req: any = new Object();
    let rc_api: any = new Object();
    api_req.moduleType = "recurring_date_update";
    api_req.api_url = "recurring_date_update/recurring_date_updateList";
    api_req.access_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    rc_api.action = "recurring_date_updateList";
    rc_api.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = rc_api;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.recurringCheckList=response.recurring_list;
        console.log(" this.recurringCheckerList", this.recurringCheckerList)

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "update failed",
          position: 'topRight'
        });
      }

    }), (error: any) => {
      this.spinner.hide();
      iziToast.error({
        message: "Error",
        position: 'topRight'
      });
      console.log("error",error)

    };

  }
  set_multipleRecurrDate() {
    let api_req: any = new Object();
    let rc_api: any = new Object();
    api_req.moduleType = "recurring_date_update";
    api_req.api_url = "recurring_date_update/multiple_recurring_date_update";
    api_req.access_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    rc_api.action = "multiple_recurring_date_update";
    rc_api.user_id = localStorage.getItem('erp_c4c_user_id');
    rc_api.recurring_bill_id = this.ckbx_array;
    this.date=this.multipleRecurrDateUpdateForm.value.mr_date;
    rc_api.next_recuring_date_all = this.datePipe.transform(this.date, 'd-M-y');;
    api_req.element_data = rc_api;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.recurringCheckList=response.recurring_list;
        console.log(" this.recurringCheckerList", this.recurringCheckerList)
        $('#RC_multipleRecurrDateUpdate').modal("hide");
        this.recurringCheckerList();
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

      } else {
        iziToast.warning({
          message: "update failed",
          position: 'topRight'
        });
      }

    }), (error: any) => {
      iziToast.error({
        message: "Error",
        position: 'topRight'
      });
      console.log("error",error)

    };

  }
  multipleAddressPrint(){
    var url = " https://laravelapi.erp1.cal4care.com/api/recurring_date_update/getaddresspdfShow?billId=" +  btoa(this.ckbx_array) + "";
    // var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)


   
  }
  // multipleAddressPrint(){
  //   this.spinner.show();
  //   let api_req: any = new Object();
  //   let rc1_api: any = new Object();
  //   api_req.moduleType = "recurring_date_update";
  //   api_req.api_url = "recurring_date_update/getaddresspdfShow";
  //   api_req.access_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   rc1_api.action = "getaddresspdfShow";
  //   rc1_api.user_id = localStorage.getItem('erp_c4c_user_id');
  //   if(this.ckbx_array==undefined || this.ckbx_array==''|| this.ckbx_array=='undefined'){
  //     iziToast.error({
  //       message: "Choose Bill Id",
  //       position: 'topRight'
  //     });
  //   }else{
  //     rc1_api.billId = this.ckbx_array;
  //   }
   
  //   api_req.element_data = rc1_api;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //    console.log("response--print",response)
  //     if (response != '') {

  //       this.spinner.hide();
  //       var url = "https://erp1.cal4care.com/api/invoice/getBillpdf?billId=" + 62723 + "";
  //       window.open(url, '_blank');
  //       iziToast.success({
  //         message: "Success",
  //         position: 'topRight'
  //       });

  //     } else {
  //       this.spinner.hide();
  //       iziToast.warning({
  //         message: "update failed",
  //         position: 'topRight'
  //       });
  //     }

  //   }), (error: any) => {
  //     this.spinner.hide();
  //     iziToast.error({
      
  //       message: "Error",
  //       position: 'topRight'
  //     });
  //     console.log("error",error)

  //   };

  // }
  recurringStatusChecked(billid: any,chk_state:any) {
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
        rcMult_req.chk_state = chk_state+1;
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
  get_invSendPost(billid:any){
    this.billId_InvoicePost=billid;
    this.spinner.show();
    let api_req:any=new Object();
    let getInvPost:any=new Object();
    api_req.moduleType="recurring_date_update";
    api_req.api_url="recurring_date_update/get_invoice_send_details_update";
    api_req.api_type="web";
    api_req.access_token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    getInvPost.action="get_invoice_send_details_update";
    getInvPost.user_id=localStorage.getItem('erp_c4c_user_id');
    getInvPost.billid=this.billId_InvoicePost;
    api_req.element_data=getInvPost;

    this.serverService.sendServer(api_req).subscribe((response:any)=>{
        if(response!=''){
          console.log("response",response.sending_type)
          this.spinner.hide();
          
          this.InvoiceSendingMethodForm.patchValue({
             InvoiceSendingInput: response.sending_type
          });
          // $('#RC_invoiceSendtoPost').modal('hide');
          
        }else{
          this.spinner.hide();
          iziToast.warning({
            message:"Failed",
            position:'topRight'
          });
        }
    }),
   (error:any)=>{
    this.spinner.hide();
        iziToast.error({
          message:"Error",
          position:'topRight'
        });
        console.log("error message",error)
   };
  }

  set_invPost() {
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "recurring_date_update";
    api_req.api_url = "recurring_date_update/invoice_send_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "invoice_send_details_update";
    api_postUPd.billid = this.billId_InvoicePost;
    api_postUPd.post_send_status = this.InvoiceSendingValue;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        iziToast.success({
          message: "Invoice Send to post details Successful. ",
          position: 'topRight'
        });
        $('#RC_invoiceSendtoPost').modal('hide');

      } else {


        iziToast.warning({
          message: "Invoice Send to post details not Updated. Please try again",
          position: 'topRight'
        });
        $('#RC_invoiceSendtoPost').modal('hide');
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
 
  pdf(billId: any) {

    var url = "https://erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
   // var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }

}
