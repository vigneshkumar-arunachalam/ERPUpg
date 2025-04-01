import { Component, OnInit } from '@angular/core';

import { ServerService } from '../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;


@Component({
  selector: 'app-customer-project',
  templateUrl: './customer-project.component.html',
  styleUrls: ['./customer-project.component.css']
})
export class CustomerProjectComponent implements OnInit {
  Transaction_list: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  Object: any;
  //view Customer PjctMgmtForm
  viewCustomerPjctMgmtForm: FormGroup;
  viewDescr:any;
  getCustPhoneProvList:any;
  getSubCustomerList:any;
  // add attachment
  AddAttachmentForm:FormGroup;
  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTransactionNewList({});

    this.viewCustomerPjctMgmtForm = new FormGroup({
      'view_comments': new FormControl(null),
      'viewDescription': new FormControl(null),
    });
    this.AddAttachmentForm=new FormGroup({
      'add_cusName':new FormControl(null),
      'add_cusNameDropdown':new FormControl(null),
      'add_projName':new FormControl(null),
      'add_projDate':new FormControl(null),
      'add_subjName':new FormControl(null), 
      'add_description':new FormControl(null),
      

    });
  }


  editTransaction(transaction: any) {

  }
  deleteTransaction(transaction: any) {

  }
  getTransactionNewList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/CustomerProjectsList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "customer_projects/CustomerProjectsList";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.off_set = list_data.offset;

    TNapi_req.limit_val = list_data.limit;

    TNapi_req.search_txt = '';

    TNapi_req.current_page = "";
    TNapi_req.cus_pro_customer_name = '';
    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {


        this.Transaction_list = response;


      }

    });

  }
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  viewCustomerPrjMgmt(project_details_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/viewComments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/viewComments";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.project_details_id = project_details_id;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#viewCustomerPjctMgmtID').modal('show');
        this.viewDescr=response.description;
        this.viewCustomerPjctMgmtForm.patchValue({
          'view_comments': response.comments,
          'viewDescription': response.description,
        })
        // this.customerslist({});

      } else {
        iziToast.warning({
          message: "Response Failed",
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
  getCustomerPhoneProvision(customer_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/getting_customer_phone_provision";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/getting_customer_phone_provision";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.customer_id = customer_id;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#getCustPhoneProvID').modal('show');
        this.getCustPhoneProvList=response.customerData;
       
        // this.customerslist({});

      } else {
        iziToast.warning({
          message: "Response Failed",
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
  getSubCustomer() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/getSubCustomer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/getSubCustomer";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        this.getSubCustomerList=response.subCustomers;
      
      
       
        // this.customerslist({});

      } else {
        iziToast.warning({
          message: "Response Failed",
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
  openAdd(){
    $('#AddAttachmentID').modal('show');
    this.getSubCustomer();

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


}
