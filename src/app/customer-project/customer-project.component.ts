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
  viewDescr: any;
  getCustPhoneProvList: any;
  getSubCustomerList: any;
  // add attachment
  AddAttachmentForm: FormGroup;
  addWorkDetailsID: any;
  // edit attachment
  editAttachmentForm: FormGroup;
  billerDataList: any;
  customerWorkDetails: any;
  OwnerDataList: any;
  projectFollower: any;
  groupSelect_emailCCId: any;
  edit_array_emailCC_Checkbox: any = [];
  checkbox_value: any;
  //file attachment
  myFiles: string[] = [];
  work_details_id: any;
  // view comments
  viewDescrcomments: any;
  viewDescrdatetime: any;
  viewDescrCommentID: any;
  //edit sub form
  editSubAttachmentForm: FormGroup;
  //credentials:FormGroup;
  credentialsForm: FormGroup;
  editCrediProDetID: any;
  viewProjID: any;
  //GoogleAuthentication
  GoogleAuthenticationForm: FormGroup;
  googleAuthentication_status: boolean = false;
  project_details_idEmail: any;
  //email
  emailForm: FormGroup;
  crmTemplateList: any;
  emailFromList: any;
  FromEmailValue: any;
  emailTo: any;
  subjectValue: any;
  msg_id: any;
  Email_BillId: any;
  Select_To_Type_radiobox_Value: any;
  SelectType_finance: any;
  SelectType_company: any;
  quotation_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  FileAttachmentForm: FormGroup;
  myFiles1: string[] = [];
  edit_array1: any = [];
  commonAttachmentID1: any;
  fileAttach_workDetailsID: any;
  getFileAttachmentResult: any;
  getLicensekeyDetailsList: any;
  addCustomerProjectForm: FormGroup;
  addBillerData: any;
  addDepartment: any;
  addOwnerData: any;
  //add
  selectedDepartment: any;
  deptValue: any;
  addFollowersData: any = [];
  groupSelect_emailCCId1: any;
  edit_array_emailCC_Checkbox1: any = [];
  checkbox_value1: any;
  selectedList: any = [];
  followersId: any;
  keywordCompanyName = 'customerName';
  searchResult: any;
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  //search
  searchCustomerProjectForm:FormGroup;
  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.GoogleAuthenticationForm = new FormGroup({
      'google_AuthenticationCode': new FormControl(null),
    });
     this.searchCustomerProjectForm = new FormGroup({
      'addc_selectCustomer': new FormControl(null),
      'searchText': new FormControl(null),

    });
    // $('#GoogleAuthenticationGuruFormId').modal('show');
    this.getTransactionNewList({});
    this.addBasicDetails();

    this.viewCustomerPjctMgmtForm = new FormGroup({
      'view_comments': new FormControl(null),
      'viewDescription': new FormControl(null),
    });
    this.AddAttachmentForm = new FormGroup({
      'add_cusName': new FormControl(null),
      'add_cusNameDropdown': new FormControl(null),
      'add_projName': new FormControl(null),
      'add_projDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'add_subjName': new FormControl(null),
      'add_description': new FormControl(null),

      'file': new FormControl(null),


    });
    this.editSubAttachmentForm = new FormGroup({

      'edit_cusName': new FormControl(null),
      'edit_cusNameDropdown': new FormControl(null),
      'edit_projName': new FormControl(null),
      'edit_projDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'edit_subjName': new FormControl(null),
      'edit_description': new FormControl(null),
      'file': new FormControl(null),


    });
    this.editAttachmentForm = new FormGroup({
      'edit_billerName': new FormControl(null),
      'edit_selectCustomer': new FormControl(null),
      'edit_owner': new FormControl(null),
      'edit_pjctFollower': new FormControl(null),
    });
    this.addCustomerProjectForm = new FormGroup({
      'addc_billerName': new FormControl(null),
      'addc_selectCustomer': new FormControl(null),
      'addc_owner': new FormControl(null),
      'addc_pjctFollower': new FormControl(null),
      'department': new FormControl(null),
    });
    this.FileAttachmentForm = new FormGroup({
      'file': new FormControl(null),
    });
    this.credentialsForm = new FormGroup({
      'teamviewer': new FormControl(null),
      'window': new FormControl(null),

    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),


    });
    this.Select_To_Type_radiobox_Value = 'finance';
    this.deptValue = 'Sales';

    this.addProjectFollowers();
  }
  departmentChange(event: any, id: any) {
    this.deptValue = id;
    console.log("this.deptValue", this.deptValue);
    this.addProjectFollowers();

  }
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);


    if (this.Select_To_Type_radiobox_Value == 'finance') {
      this.emailForm.patchValue({
        'email_to': this.SelectType_finance,
      })
    } else {
      this.emailForm.patchValue({
        'email_to': this.SelectType_company,
      })
    }
  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  addAttachmentUpdate() {

    // this.FileAttachmentForm.reset();
    //  var data = new FormData();
    // Swal.fire('File Updating');
    Swal.showLoading();

    if (this.myFiles.length == 0) {
      Swal.close();
      iziToast.warning({
        message: "Attachment File Missing",
        position: 'topRight'
      });
    }

    if (this.myFiles.length > 0) {

      const data = new FormData();

      for (var i = 0; i < this.myFiles.length; i++) {
        data.append("myfile[]", this.myFiles[i]);
      }


      data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
      data.append('work_details_id', this.addWorkDetailsID);
      data.append('project_name', this.AddAttachmentForm.value.add_projName);
      data.append('sub_customer_name', this.AddAttachmentForm.value.add_cusName);
      data.append('sub_customer_name_cbo', this.AddAttachmentForm.value.add_cusNameDropdown);
      data.append('project_date', this.AddAttachmentForm.value.add_projDate);
      data.append('subject_name', this.AddAttachmentForm.value.add_subjName);
      data.append('project_description', tinymce.get('tinyID_addCP').getContent());

      // data.append('quotation_pdf_add[]',this.edit_array ); 
      data.append('action', "customer_projects/customer_projects_update");


      var self = this;
      $.ajax({
        type: 'POST',
        url: this.serverService.urlFinal + 'customer_projects/customer_projects_update',


        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {

            self.getTransactionNewList({});

            console.log(result);
            Swal.close();
            $("#AddAttachmentID").modal("hide");
            this.edit_array = [];

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#AddAttachmentID").modal("hide");

            iziToast.warning({
              message: "File Attachment Update Failed",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#fileAttachCusFormId_CP").modal("hide");
        }

      })


    }
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

    TNapi_req.search_txt = this.searchCustomerProjectForm.value.searchText;

    TNapi_req.current_page = "";
    TNapi_req.cus_pro_customer_name =  this.searchResult_CustomerID ;
    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {


        this.Transaction_list = response.data;
         this.searchResult_CustomerID ='';
        // console.table(this.Transaction_list);
       // console.dir(this.Transaction_list);
       $('#searchCustProjFormId').modal('hide');
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });


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
    this.viewProjID = project_details_id;

    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
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
        this.viewDescr = response.description;
        this.viewDescrcomments = response.comments;
        // this.viewDescrdatetime=response.comments[0].create_datetime;
        // this.viewDescrCommentID=response.comments[0].projects_comments_id;



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
  viewUpdate() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/updatecomments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/updatecomments";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.project_details_id = this.viewProjID;
    api_nx32PermissionUpdate_req.comments = this.viewCustomerPjctMgmtForm.value.view_comments;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#viewCustomerPjctMgmtID').modal('hide');

        // this.customerslist({});

        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.getTransactionNewList({});;

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


      if (response.status == true) {
        this.spinner.hide();
        //   $('#getCustPhoneProvID').modal('show');
        $('#callFormId_CP').modal('show');
        this.getCustPhoneProvList = response.customerData;

        // this.customerslist({});

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  getLicensekeyDetails(customer_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/getLicensekeyDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/getLicensekeyDetails";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.customer_id = customer_id;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status == true) {
        this.spinner.hide();
        //   $('#getCustPhoneProvID').modal('show');
        $('#licenceKeyDetFormId_CP').modal('show');
        this.getLicensekeyDetailsList = response.data;

        // this.customerslist({});

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
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
        this.getSubCustomerList = response.subCustomers;



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
  openAdd(work_details_id: any) {
    this.addWorkDetailsID = work_details_id;
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


  openEdit(work_details_id: any) {
    this.work_details_id = work_details_id;
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "customer_projects/customer_projects_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/customer_projects_details";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.work_details_id = work_details_id;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#CustPjctMgmtEdit').modal('show');
        this.billerDataList = response.billerData;
        this.customerWorkDetails = response.customer_work_details;
        this.OwnerDataList = response.ourOwnerData;
        this.projectFollower = response.project_follower;
        this.edit_array_emailCC_Checkbox = response.customer_work_details.project_follower_id.split(',').map(Number);;
        // this.getSubCustomerList=response.subCustomers;
        this.editAttachmentForm.patchValue({
          'edit_billerName': response.customer_work_details.billerId,
          'edit_selectCustomer': response.customer_work_details.customerName,
          'edit_owner': response.customer_work_details.owner_id,
          'edit_pjctFollower': response.customer_work_details.project_follower_id,
        });


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
  openEditUpdate() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/customer_projects_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/customer_projects_details_update";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.work_details_id = this.work_details_id;
    api_nx32PermissionUpdate_req.description = tinymce.get('tinyID_editCP').getContent();
    api_nx32PermissionUpdate_req.owner_id = this.editAttachmentForm.value.edit_owner;
    api_nx32PermissionUpdate_req.project_follower_id = this.edit_array_emailCC_Checkbox;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#CustPjctMgmtEdit').modal('show');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });


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
  openEditSubUpdate() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/customer_projects_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/customer_projects_details_update";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.work_details_id = this.work_details_id;
    api_nx32PermissionUpdate_req.description = tinymce.get('tinyID_editCP').getContent();
    api_nx32PermissionUpdate_req.owner_id = this.editAttachmentForm.value.edit_owner;
    api_nx32PermissionUpdate_req.project_follower_id = this.edit_array_emailCC_Checkbox;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#CustPjctMgmtEdit').modal('show');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });


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
  EditCHK_emailCC(data: any, event: any) {
    // console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  EditCHK_emailCC2(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    console.log("event", event)
    this.groupSelect_emailCCId1 = data;
    this.checkbox_value1 = isChecked;
    console.log(this.checkbox_value1);
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox1.push(data);
      this.edit_array_emailCC_Checkbox1.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox1.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox1.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox1)

    }
  }
  EditCHK_emailCC1(data: any, event: Event) {
    console.log("List - CheckBox ID", data);
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    console.log("Checkbox checked?", isChecked);

    this.groupSelect_emailCCId1 = data;
    this.checkbox_value1 = isChecked;

    console.log("Final Checkbox Value", this.checkbox_value1);

    // Example: update selected list
    if (isChecked) {
      this.selectedList.push(data);
      this.selectedList.join(',');
    } else {
      // this.selectedList = this.selectedList.filter((id: any) => id !== data);
      const index = this.selectedList.findIndex((el: any) => el === data)
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    }
    console.log("Final Checkbox After Deselected selected list", this.selectedList);
  }



  openDelete(work_details_id: any) {

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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "customer_projects";
        api_req.api_url = "customer_projects/customerProjectDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "customer_projects/customerProjectDelete";
        del_req.work_details_id = work_details_id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.getTransactionNewList({});;
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.getTransactionNewList({});;
            iziToast.warning({
              message: "Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.getTransactionNewList({});;
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }

  subDelete(project_details_id: any) {

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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "customer_projects";
        api_req.api_url = "customer_projects/projectDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "customer_projects/projectDelete";
        del_req.project_details_id = project_details_id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.getTransactionNewList({});
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.getTransactionNewList({});
            iziToast.warning({
              message: "Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.getTransactionNewList({});;
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }


  openCredentials(project_details_id: any) {
    this.editCrediProDetID = project_details_id;
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/viewcredentials";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/viewcredentials";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.project_details_id = project_details_id;


    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {

        $('#CredentialsEdit').modal('show');
        this.credentialsForm.patchValue({
          'teamviewer': response.teamviewer_details,
          'window': response.windows_details,
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

  openCredentialsUpdate() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/update_credentials";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/update_credentials";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.project_details_id = this.editCrediProDetID;
    api_nx32PermissionUpdate_req.teamviewer_details = this.credentialsForm.value.teamviewer;
    api_nx32PermissionUpdate_req.windows_details = this.credentialsForm.value.window;


    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {

        $('#CredentialsEdit').modal('hide');

        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.getTransactionNewList({});


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


  GoogleAuthenticationValidation() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_googleAuthVali: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/google_auth_check";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_googleAuthVali.action = "guru/google_auth_check";
    api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');

    api_googleAuthVali.auth_code = this.GoogleAuthenticationForm.value.google_AuthenticationCode;
    api_req.element_data = api_googleAuthVali;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $(document).ready(function () {
          $("#showhide").show();
        });
        this.googleAuthentication_status = response.status;
        console.log(" this.googleAuthentication_status", this.googleAuthentication_status);
        if (this.googleAuthentication_status == true) {
          this.getTransactionNewList({});
        }


        iziToast.success({
          message: "Google Authentication Success",
          position: 'topRight'

        });
        $('#GoogleAuthenticationGuruFormId').modal("hide");


      } else {

        // $('#GoogleAuthenticationGuruFormId').modal("hide");
        iziToast.warning({
          message: "Invalid Google Authentication. Please try again",
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

  openEmail(project_details_id: any) {
    this.project_details_idEmail = project_details_id;
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/getAttachemntMail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/getAttachemntMail";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.project_details_id = project_details_id;

    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response) {
        $('#emailFormId_cusproj').modal('show');
        this.crmTemplateList = response.crm_template;
        this.emailFromList = response.email_from_str;
        this.SelectType_finance = response.finance_email;
        this.SelectType_company = response.company_email;
        this.messageContent = response.description;
        // 'Subject_Content': new FormControl(null, Validators.required),
        // 'email_to': new FormControl(null, Validators.required),
        // 'radio_ApprovalBy': new FormControl(null, Validators.required),
        // 'email_From': new FormControl(null, Validators.required),

        // 'email_template': new FormControl(null, Validators.required),
        // 'email_cc': new FormControl(null, Validators.required),
        // 'formControlName="radio_ApprovalBy': new FormControl(null),

        // this.getSubCustomerList=response.subCustomers;
        this.mailContent = tinymce.get('tinyID1_cuspjct').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({
          'email_to': response.toEmail,
          // 'edit_selectCustomer': response.document_preparation_data,
          // 'edit_owner': response.description,
          // 'edit_pjctFollower': response.customerName,
          'email_cc': response.cc_email,
          'Subject_Content': response.subject,
          'tinyID1_cuspjct': this.mailContent,
          'radio_ApprovalBy': this.Select_To_Type_radiobox_Value
        });


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

  templateContentEmailDropdown(event: any) {
    this.quotation_Emailtemplate_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/getEmailTemplateDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "customer_projects/getEmailTemplateDetails";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_quotationTemplateDropdown_req.customer_project_id = this.project_details_idEmail;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content;
      this.mailContent = tinymce.get('tinyID1_cuspjct').setContent("<p>" + this.messageContent + "</p>");
      $('#subject').val(response.crm_subject_name);
      $('#tinyID1_cuspjct').val(this.mailContent);
      if (response != '') {
        this.emailForm.patchValue({



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

    // this.FromEmailValue = $('#emailFrom').val();
    this.FromEmailValue = this.emailForm.value.email_From;

    //  this.emailTo = $('#emailto').val();
    this.emailTo = this.emailForm.value.email_to;
    // this.subjectValue = $('#subject').val();
    this.subjectValue = this.emailForm.value.Subject_Content;
    this.msg_id = tinymce.get('tinyID1_cuspjct').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)



    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_details_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "invoice_details_sendmail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.ccEmailId = this.edit_array_emailCC_Checkbox;
    api_email_req.billId = this.Email_BillId;

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.emailForm.value.email_From === null || this.emailForm.value.email_From === '' || this.emailForm.value.email_From === 'undefined' || this.emailForm.value.email_From === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.toEmailId = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;

    api_email_req.subject = this.subjectValue;
    this.emailForm.value.Subject_Content

    if (this.emailForm.value.Subject_Content === null || this.emailForm.value.Subject_Content === '' || this.emailForm.value.Subject_Content === 'undefined' || this.emailForm.value.Subject_Content === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }

    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

        $("#emailFormId_inv").modal("hide");
        this.getTransactionNewList({});

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#emailFormId_inv").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        this.getTransactionNewList({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        this.getTransactionNewList({});

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
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.getTransactionNewList({});
    tinymce.activeEditor.setContent("");
  }
  viewAttachFile(uploaded_file_name: any) {
    window.open(uploaded_file_name, '_blank');

  }
  backupAttachment(work_details_id: any) {

    this.fileAttach_workDetailsID = work_details_id;
    $('#fileAttachCusFormId_CP').modal('show');

    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/getBackupDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "customer_projects/getBackupDetails";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.work_details_id = this.fileAttach_workDetailsID;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.getFileAttachmentResult = response.data;

      }
      else {
        this.emailForm.patchValue({

          'email_template': '',

        });
      }


    });
  }

  fileAttachmentUpdate() {
    Swal.fire({
      title: 'File Updating...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (this.myFiles1.length === 0) {
      Swal.close();
      iziToast.warning({
        message: "Attachment File Missing",
        position: 'topRight'
      });
      return;
    }

    const data = new FormData();
    for (let i = 0; i < this.myFiles1.length; i++) {
      data.append("myfile[]", this.myFiles1[i]);
    }

    data.append('user_id', localStorage.getItem('erp_c4c_user_id') || '');
    data.append('work_details_id', this.fileAttach_workDetailsID);
    data.append('action', 'customer_projects/backupdetails');

    // ✅ Actual endpoint used here
    const fullUrl = 'https://laravelapi.erp1.cal4care.com/api/customer_projects/backupdetails';

    this.serverService.uploadFileAttachment(fullUrl, data).subscribe(
      (result) => {
        Swal.close();
        if (result.status === true) {
          this.myFiles1 = [];
          this.getTransactionNewList({});
          $('#callFormId_CP').modal('hide');
          iziToast.success({
            message: "File uploaded successfully",
            position: 'topRight'
          });
        } else {
          iziToast.error({
            message: "File upload failed",
            position: 'topRight'
          });
        }
      },
      (error) => {
        Swal.close();
        iziToast.error({
          message: "Upload error occurred",
          position: 'topRight'
        });
        console.error('Upload Error:', error);
      }
    );
  }



  onFileChange1(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles1.push(event.target.files[i]);
    }
  }
  fileAttachmentClear() {
    this.FileAttachmentForm.reset();
  }
  fileAttachmentDelete(work_details_id: any) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {


        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = "customer_projects";
        // api_req.api_url = "customer/delete_file_attachment";
        api_req.api_url = "customer_projects/customerProjectDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        fileattachDelete_req.action = "customer_projects/customerProjectDelete";
        fileattachDelete_req.work_details_id = work_details_id;
        fileattachDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');

        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "File Attachment Deleted successfully",
              position: 'topRight'
            });

            //  $("#fileAttachCusFormId_CP").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            // console.log(error);
          };
      }
    })


  }
  addBasicDetails() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/get_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/get_customer_details";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        this.addBillerData = response.billerData;
        this.addDepartment = response.department;
        this.addOwnerData = response.ourOwnerData;




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
  addProjectFollowers() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/getDepartmentUsers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/getDepartmentUsers";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_nx32PermissionUpdate_req.department = this.deptValue;
    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        this.addFollowersData = response.data;
        this.selectedList = response.userId_val;

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
  addALLSaveUpdate() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_nx32PermissionUpdate_req: any = new Object();
    api_req.moduleType = "customer_projects";
    api_req.api_url = "customer_projects/customer_projects_details_create";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_nx32PermissionUpdate_req.action = "customer_projects/customer_projects_details_create";
    api_nx32PermissionUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
     if (this.addCustomerProjectForm.value.addc_billerName) {
      api_nx32PermissionUpdate_req.billerId = this.addCustomerProjectForm.value.addc_billerName;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Biller Details Missing",
        position: 'topRight'
      });
      return false;

    }
    if (this.searchResult_CustomerID) {
      api_nx32PermissionUpdate_req.customer_id = this.searchResult_CustomerID;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Customer Details Missing",
        position: 'topRight'
      });
      return false;

    }

    api_nx32PermissionUpdate_req.description = tinymce.get('tinyID_addAllCP').getContent();
   
     if (this.addCustomerProjectForm.value.addc_owner) {
        api_nx32PermissionUpdate_req.owner_id = this.addCustomerProjectForm.value.addc_owner;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Owner Details Missing",
        position: 'topRight'
      });
      return false;

    }

  
    api_nx32PermissionUpdate_req.project_follower_id = this.selectedList;
    api_req.element_data = api_nx32PermissionUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        $('#addFirstCustPrjctMgmt').modal('hide');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.searchResult_CustomerID = '';
        this.searchResult_CustomerName = '';


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
  selectEventCustomer(item: any) {


    //  console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;

  }
  clearSelection(event: any) {

    this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';

  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      //  console.log("vignesh-customer_status response", response);



      // console.log("vignesh-advanced search result", this.searchResult);
      if (response.customer_names) {
        this.searchResult = response.customer_names;
      }
    });
  }


}
