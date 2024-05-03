import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-enquirynew',
  templateUrl: './enquirynew.component.html',
  styleUrls: ['./enquirynew.component.css']
})
export class EnquirynewComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  user_ids: any;
  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;
  //advance search
  searchResult1_CustomerID: any;
  searchResult1_CustomerName: any;
  AdvanceSearchResult: any;
  searchPurchaseOrderForm: FormGroup;

  // to delete
  edit_array_SearchBiller_Checkbox: any;
  biller_list: any;
  Purchase_Order: any;

  //ML-View
  viewEnquiryForm: FormGroup;
  isReadOnly: boolean = true;
  //ML-Enquiry Comment Entry
  EnquiryCommentsEntryForm: FormGroup;
  //EnquiryFollowForm
  EnquiryFollowForm: FormGroup;
  //Create Ticket with Assign
  TicketAssignForm:FormGroup;
    //Create Multiple Ticket with Assign
    MultipleTicketAssignForm:FormGroup;
  //email
  emailForm: FormGroup;
  EmailEnquiryID: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  groupSelect_emailCCId: any;
  checkbox_value: any;
  edit_array_emailCC_Checkbox: any = [];
  messageContent: any;
  mailContent: any;
  enquiry_Emailtemplate_id: any;
  FromEmailValue: any;
  emailTo: any;
  subjectValue: any;
  msg_id: any;
  Select_To_Type_radiobox_Value:any;



  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.PurchaseOrderList({});
    this.EnquiryCommentsEntryForm = new FormGroup({
      'ML_CE_toDoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'ML_CE_followUpStatus': new FormControl(null),
      'ML_CE_comments': new FormControl(null),
      'ML_CE_followUpPerson': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),
      'message':new FormControl(null),

    });
    this.TicketAssignForm=new FormGroup({
      'ML_ST_EnquiryNo':new FormControl(null),
      'ML_ST_CustomerName':new FormControl(null),
      'ML_ST_selectDepartment':new FormControl(null),
      'ML_ST_selectAgent':new FormControl(null),
    });
    this.viewEnquiryForm=new FormGroup({
      'view_ML_ContactInfo':new FormControl(null),
      'view_ML_Email':new FormControl(null),
      'view_ML_PhoneNumber':new FormControl(null),
      'view_ML_Company':new FormControl(null),

      'view_ML_Country':new FormControl(null),
      'view_ML_SalesCloud':new FormControl(null),
      'view_ML_ProductName':new FormControl(null),
      'view_ML_Comments':new FormControl(null),
      'view_ML_EnquiryFollowers':new FormControl(null),
    });
    this.MultipleTicketAssignForm=new FormGroup({
      'ML_MT_EnquiryNo':new FormControl(null),
      'ML_MT_CustomerName':new FormControl(null),
      'ML_MT_TicketNumber':new FormControl(null),

    });
  }
  SelectTransactionType_PE() {

  }
  SelectTransactionType_PC() {

  }
  SelectTransactionType_Log() {

  }
  SelectTransactionType_VO() {

  }
  SelectTransactionType_IP() {

  }
  SelectTransactionType_ANS() {

  }
  SelectTransactionType_SI() {

  }
  SelectTransactionType_ST() {

  }
  SelectTransactionType_Others() {

  }
  viewEnquiry(id: any) {

  }
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    
  }
  goAddNewEnquiry() {
    this.router.navigate(['/addNewEnquiry'])
  }
  editEnquiry_ML(id: any) {

    // this.router.navigate(['/editNewEnquiry'])
    var abc = id;

    this.router.navigate(
      ['/editNewEnquiry'],
      { queryParams: { id: abc } }
    );
  }
  pdf(enquiryId: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + enquiryId + "";
    window.open(url, '_blank');
    console.log("url", url)
    $('#pdfFormId').modal('hide');
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  PurchaseOrderList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "enquiry";
    api_req.api_url = "enquiry/enquiryList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "enquiryList";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = this.searchResult1_CustomerName;
    api_deliveryOrder.billerID = this.edit_array_SearchBiller_Checkbox;
    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "No Matching Records",
          position: 'topRight'
        });
      }

      if (response) {
        this.biller_list = response.biller_details;
        this.Purchase_Order = response.enquiry_details;


        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $('#searchDeliveryOrderFormId').modal("hide");
        $('#searchPurchaseOrderFormId').modal("hide");
        // this.searchDeliveryOrderForm.reset();

      }
    });
  }

  listDataInfo(list_data: any) {

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  deleteEnquiry_ML(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let delete_enquiryML_req: any = new Object();
        api_req.moduleType = "quotation";
        api_req.api_url = "quotation/delete_quotation";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_enquiryML_req.action = "delete_quotation";
        delete_enquiryML_req.quotationId = id;
        delete_enquiryML_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = delete_enquiryML_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {
            window.location.reload();
            this.PurchaseOrderList({});
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Quotation Deleted Successfully",
              position: 'topRight'
            });
            this.PurchaseOrderList({});
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })
  }
  Email(enquiryID: any) {
    this.emailForm.reset();
    this.EmailEnquiryID = enquiryID;


    let api_req: any = new Object();
    let emailPage_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/sendmail_popup_quot";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    emailPage_req.action = "sendmail_popup_quot";
    emailPage_req.user_id = this.user_ids;
    emailPage_req.enquiry_id = this.EmailEnquiryID;
    api_req.element_data = emailPage_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("emailpagecontent", response)
      if (response != true) {
        // this.myForm.reset();
        console.log("emailpagecontent", response)
        // $("#fileAttachmentFormId").modal("hide");
        this.email_fromList = response.email_from;
        this.email_crmTemplateList = response.crm_template;
        this.email_cc_userList = response.cc_user;
        this.emailForm.patchValue({

          'email_to': response.to_email,

        });

      }


    });

  }
  EditCHK_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  templateContentEmailDropdown(event: any) {
    this.enquiry_Emailtemplate_id = event.target.value;

    let api_req: any = new Object();
    let api_enquiryTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_email_quotation_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_enquiryTemplateDropdown_req.action = "get_email_quotation_template";
    api_enquiryTemplateDropdown_req.user_id = this.user_ids;
    api_enquiryTemplateDropdown_req.enquiry_id = this.EmailEnquiryID;
    api_enquiryTemplateDropdown_req.template_id = this.enquiry_Emailtemplate_id;
    api_req.element_data = api_enquiryTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content
      this.mailContent = tinymce.get('tinyID').setContent("<p>" + this.messageContent + "</p>");
      if (response != '') {
        this.emailForm.patchValue({
          'Subject_Content': response.crm_subject_name,
          'tinyID': this.mailContent,
        });

      }
      else {
        this.emailForm.patchValue({
          'email_template': '',
        });
      }


    });
  }
  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.FromEmailValue = $('#emailFrom').val();
    this.emailTo = $('#emailto').val();
    this.subjectValue = $('#subject').val();
    this.msg_id = tinymce.get('tinyID').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "sendemail/quotation_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "quotation_sendmail";
    api_email_req.user_id = this.user_ids;
    // api_email_req.customer_contract_id = this.EmailCustomerContractID;

    api_email_req.from_email = this.FromEmailValue;
    if (this.FromEmailValue === null || this.FromEmailValue === '' || this.FromEmailValue === 'undefined' || this.FromEmailValue === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.to_email = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    api_email_req.subject = this.subjectValue;
    if (this.subjectValue === null || this.subjectValue === '' || this.subjectValue === 'undefined' || this.subjectValue === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.mail_message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.enquiry_id = this.EmailEnquiryID;
    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        this.PurchaseOrderList({});
        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        this.PurchaseOrderList({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        this.PurchaseOrderList({});

      }
      Swal.close();
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  initTiny() {
    var richTextArea_id = 'richTextAreacreated';
    tinymce.init({
      selector: '#richTextAreacreated',
      height: 500,
      plugins: 'advlist autolink textcolor formatpainter lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste  wordcount autolink lists media table',
      toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | autoresize',
      paste_data_images: true,
      images_upload_url: 'upload.php',
      automatic_uploads: false,
      default_link_target: "_blank",
      extended_valid_elements: "a[href|target=_blank]",
      link_assume_external_targets: true,
      images_upload_handler: function (blobInfo: any, success: any, failure: any) {
        var xhr: any, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'upload.php');

        xhr.onload = function () {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.file_path != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.file_path);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
    });
    if (tinymce.editors.length > 0) {
      //  tinymce.execCommand('mceFocus', true, richTextArea_id );       
      tinymce.execCommand('mceRemoveEditor', true, richTextArea_id);
      tinymce.execCommand('mceAddEditor', true, richTextArea_id);
    }
  }

  enquiryEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.PurchaseOrderList({});
    tinymce.activeEditor.setContent("");
  }


}

