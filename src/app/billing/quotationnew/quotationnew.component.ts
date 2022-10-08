import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-quotationnew',
  templateUrl: './quotationnew.component.html',
  styleUrls: ['./quotationnew.component.css']
})
export class QuotationnewComponent implements OnInit {
  //add modal
  quotation_list: any;
  addNewQuotationPopUpForm: FormGroup;
  EnquiryFrom: FormGroup;
  enquiryFromList: any;
  templateNameList: any;
  //edit modal
  editNewQuotationPopUpForm: FormGroup;
  edit_enquiryFromList:any;
  edit_quotationValidityList:any;
  edit_templateNameList:any;
  edit_quotationID:any;
  // quotation_list:any=[];
  quotationValidityList: any = [];
  //quotation-shared
  quotationSharedPersonForm: FormGroup;
  quotationSharedResult:any;
  groupselectQuotationId:any;
  checkbox_quotationShare_value:any;
  quotationSharedCheckboxID_array: any = [];
  sharePermissionQuotationId:any;
  //quotation-approval
  quotationApproval_ID:any;
  quotationApprovalForm: FormGroup;
  quotationApprovalResult:any;
  checked = true;
  Approval_Type_radiobox_Value:any;
  //set template name
  setTemplateNameForm:FormGroup;
  template_quotationID:any;
  TemplateNameList:any;
  //set actual cost
  setActualCostForm:FormGroup;
  actualCost_quotationID:any;
  actualCost_ProductList:any;
  //file attachment
  fileAttach_quotationID:any;
  FileAttachmentForm:FormGroup;
  getFileAttachmentResult:any;
  myFiles:string [] = [];
  edit_array: any = [];
  checkbox_value:any;
  groupSelectCommonId:any;
  commonAttachmentID:any;
  checkboxAdding:any=[];

  constructor(public serverService: ServerService, private router: Router) { }

  ngOnInit(): void {


    this.addNewQuotationPopUpForm = new FormGroup({
      'enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'enquirySubject_addPopUP': new FormControl(null, [Validators.required]),
      'quotationValidity_addPopUP': new FormControl(null, [Validators.required]),
      'version_enqForm_addPopUP': new FormControl(null, [Validators.required]),
      'templateName_addPopUP': new FormControl(null),
    });
    this.editNewQuotationPopUpForm = new FormGroup({
      'e_enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'e_enquirySubject_addPopUP': new FormControl(null),
      'e_quotationValidity_addPopUP': new FormControl(null),
      'e_version_enqForm_addPopUP': new FormControl(null),
      'e_templateName_addPopUP': new FormControl(null),
    });
    this.EnquiryFrom = new FormGroup({
      'enquiryForm': new FormControl(null),
      'enquirySubject': new FormControl(null),
      'quotationValidity': new FormControl(null),
      'version_enqForm': new FormControl(null),
      'templateName': new FormControl(null),
    });
    this.quotationSharedPersonForm= new FormGroup({
      'enquiryForm': new FormControl(null),
      
    });
    this.quotationApprovalForm=new FormGroup({
      'cm_chk': new FormControl(null),
      'cd_chk': new FormControl(null),
      'radio_approvalPermission': new FormControl(null),
    });
    this.setTemplateNameForm=new FormGroup({
      'txt_templateName': new FormControl(null),
      
    });
    this.setActualCostForm=new FormGroup({
      'txt_templateName': new FormControl(null),
      
    });
    this.FileAttachmentForm=new FormGroup({
      'file': new FormControl(null),
      
    });
    this.quotationList()
  }
  checkbox_CM_QuotPermission: any;
  eventCheck_CM_QuotPermission(event: any) {
    this.checkbox_CM_QuotPermission = event.target.checked;
    console.log(this.checkbox_CM_QuotPermission)
  }

  checkbox_CD_QuotPermission: any;
  eventCheck_CD_QuotPermission(event: any) {
    this.checkbox_CD_QuotPermission = event.target.checked;
    console.log(this.checkbox_CD_QuotPermission)
  }
  handleChange(evt: any) {
    var xyz = evt.target.id;
    console.log(xyz, "target");
  }
  handle_radioChange(event: any){
   this.Approval_Type_radiobox_Value = event.target.id;
    console.log(this.Approval_Type_radiobox_Value);
    if(this.Approval_Type_radiobox_Value='singleApproval'){
      // this.quotationApprovalForm.get("ESA_shipto").disable();

    }
  }
  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value)
    for(let i=0;i<=this.getFileAttachmentResult.length;i++){
      console.log(this.getFileAttachmentResult[i].quotation_pdf_add)
      // console.log(this.checkboxAdding)
      if(this.getFileAttachmentResult[i].quotation_pdf_add=='1'){
        this.checkboxAdding=this.getFileAttachmentResult[i].common_attachmentId;
        // console.log(this.checkboxAdding)
      }
       
    }
    console.log(this.checkboxAdding)
    if (this.checkbox_value) {
      this.checkboxAdding.push(data);
      console.log(this.checkboxAdding)
      this.edit_array.push(data);
      // this.edit_array.join(',');
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
  onFileChange(event:any) {
   
    for (var i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
}
  quotationList() {
    console.log("Quotation List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = "2";
    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("qoutation list", response);
      if (response) {
        this.quotation_list = response.customer_list;
        console.log(this.quotation_list)
        // Swal.fire("Have a nice day!");  
        // Swal.fire({  
        //   position: 'top-end',  
        //   icon: 'success',  
        //   title: 'Your work has been saved',  
        //   showConfirmButton: false,  
        //   timer: 1500  
        // })
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  addQuotationNew() {
    let api_req: any = new Object();
    let add_newQuotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/create_popup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotation_req.action = "create_popup";
    add_newQuotation_req.user_id = "2";
    add_newQuotation_req.enquiry_from_id = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    add_newQuotation_req.quot_validity = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    add_newQuotation_req.quotationId = this.addNewQuotationPopUpForm.value.templateName_addPopUP;
    api_req.element_data = add_newQuotation_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("pop up for add quotation", response);
      if (response != '') {
        this.enquiryFromList = response.enquiry_from;
        this.quotationValidityList = response.quot_validity;
        this.templateNameList = response.template_name_arr;
        console.log("hi", this.enquiryFromList)

        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  editQuotationPopUP(QuotationId: any){
    this.edit_quotationID=QuotationId;
    let api_req: any = new Object();
    let edit_popup_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/edit_enquiry_popup_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_popup_req.action = "edit_enquiry_popup_quotation";
    edit_popup_req.user_id = "2";
    edit_popup_req.quotation_id =this.edit_quotationID;
    api_req.element_data = edit_popup_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("pop up for edit quotation", response);
      if (response != '') {
        this.edit_enquiryFromList = response.enquiry_from;
        this.edit_quotationValidityList = response.quot_validity;
        this.edit_templateNameList = response.template_name_arr;
        this.editNewQuotationPopUpForm.patchValue({
       
          'e_enquiryFrom_addPopUP': response.quotation_arr_popup.enquiry_from_id,
          'e_enquirySubject_addPopUP': response.quotation_arr_popup.enquiry_product_description,
          'e_quotationValidity_addPopUP': response.quotation_arr_popup.quotation_valid_day,
          'e_version_enqForm_addPopUP': response.quotation_arr_popup.duplicate_version,
          // 'e_templateName_addPopUP': response.template_name_arr,
          
          
        });
       

        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  
  quotationSharedPersonEdit(QuotationId: any) {
    this.sharePermissionQuotationId=QuotationId
    // this.quotationSharedResult=[];
    // this.invoiceResult=[];  //for refreshing we are emptying the variable
    // this.invoiceCheckboxID_array=[];
    //for refreshing we are emptying the variable
    // this.invoiceContractID = CustomerContractid;
    // this.invoiceCustomerID = customerID;


    let api_req: any = new Object();
    let quot_share_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_shared_person";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_req.action = "quotation_shared_person";
 
    quot_share_req.quotationId = this.sharePermissionQuotationId;
    quot_share_req.user_id = "2";
    api_req.element_data = quot_share_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status",response.status);     
        if (response.status == true) {
         
          this.quotationSharedResult = response.user_list;
          
            // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)
           
        }
        else {
          $("#quotationSharedPersonId").modal("hide");
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
quotationSharedPersonUpdate(){
  // this.invoiceCheckboxID_array=[];
  console.log("Quotation Shared checkbox array-on update click",this.quotationSharedCheckboxID_array)
  let api_req: any = new Object();
  let quot_share_update_req: any = new Object();
  api_req.moduleType = "quotation";
  api_req.api_url = "quotation/quotation_shared_user_update";
  api_req.api_type = "web";
  api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  quot_share_update_req.action = "quotation_shared_user_update";
  quot_share_update_req.quotationId = this.sharePermissionQuotationId;
  quot_share_update_req.user_id = "2";
  quot_share_update_req.follower_user_id = this.quotationSharedCheckboxID_array.join(',');
  api_req.element_data = quot_share_update_req;

  this.serverService.sendServer(api_req).subscribe((response: any) => {
    console.log("check invoice update", response)
    if (response.status==true) {
      this.quotationSharedResult = response.customer_invoice_details;
      window.location.reload();
      $("#quotationSharedPersonId").modal("hide");
      console.log("Quotation Shared checkbox array-after update click",this.quotationSharedCheckboxID_array)
      iziToast.success({
        message: "Quotation Shared has been Updated",
        position: 'topRight'
    });

    }
    else{
     
      iziToast.error({
        message: "Quotation Shared has not been Updated",
        position: 'topRight'
    });
    }
  
   
    // this.contractList()

  });


}

QuotationSharedCHK(data: any, event: any) {
  // this.invoiceCheckboxID_array=[];
  console.log("Shared Quotation List - CheckBox ID", data);
  this.groupselectQuotationId=data;

  this.checkbox_quotationShare_value= event.target.checked;
 
  console.log(this.checkbox_quotationShare_value)

  if (this.checkbox_quotationShare_value) {
    

    this.quotationSharedCheckboxID_array.push(data);
    this.quotationSharedCheckboxID_array.join(',');
    console.log("Final Shared Quotation Person Checkbox After checkbox selected list", this.quotationSharedCheckboxID_array);
  }
  else {
    const index = this.quotationSharedCheckboxID_array.findIndex((el: any) => el === data)
    if (index > -1) {
      this.quotationSharedCheckboxID_array.splice(index, 1);
    }
    console.log("Final Shared Quotation Person Checkbox After Deselected selected list", this.quotationSharedCheckboxID_array)

  }

}
quotationApprovalEdit(id:any){
  this.quotationApproval_ID=id;
  let api_req: any = new Object();
    let quot_approval_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_permission_user";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_approval_req.action = "quotation_permission_user";
    quot_approval_req.quotationId = this.quotationApproval_ID;
    quot_approval_req.user_id = "2";
    api_req.element_data = quot_approval_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status",response.status);     
        if (response.status == true) {
         
          this.quotationApprovalResult = response.user_list;
          
            // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)
           
        }
        else {
          $("#quotationApprovalId").modal("hide");
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
quotationApprovalUpdate(){

}
  deleteQuotation(id: any) {
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

        let api_req: any = new Object();
        let delete_quotation_req: any = new Object();
        api_req.moduleType = "quotation";
        api_req.api_url = "quotation/delete_quotation";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_quotation_req.action = "delete_quotation";
        delete_quotation_req.quotationId = id;
        delete_quotation_req.user_id = "2";
        api_req.element_data = delete_quotation_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            window.location.reload();
            this.quotationList()
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Quotation Deleted successfully",
              position: 'topRight'
            });
            this.quotationList()
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  setTemplateName(quotationId:any){

    this.template_quotationID=quotationId;
    let api_req: any = new Object();
    let templateName_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_template_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    templateName_req.action = "get_template_name";
    templateName_req.user_id = "2";
    templateName_req.quotationId =this.template_quotationID;
    api_req.element_data = templateName_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("set template name", response);
      if (response.status=true) {
        this.TemplateNameList = response.template_name;
       
        this.setTemplateNameForm.patchValue({
                 'txt_templateName': response.template_name,  
        });
      }

    });

  }
  templateNameUpdate(){
   
    let api_req: any = new Object();
    let templateNameUpdate_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/temaplete_name_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    templateNameUpdate_req.action = "temaplete_name_update";
    templateNameUpdate_req.user_id = "2";
    templateNameUpdate_req.quotationId =this.template_quotationID;
    templateNameUpdate_req.template_name =this.setTemplateNameForm.value.txt_templateName;
    api_req.element_data = templateNameUpdate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      

      console.log("set template name update", response);
      if (response!='') {
        $("#setTemplateNameId").modal("hide");
      }
      // $("#setTemplateNameId").modal("hide");
    });

  }
  setActualCost(quotationId:any){
    this.actualCost_quotationID=quotationId;
    let api_req: any = new Object();
    let actualCost_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_actualcost_quotation_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    actualCost_req.action = "get_actualcost_quotation_details";
    actualCost_req.user_id = "2";
    actualCost_req.quotationId = this.actualCost_quotationID;
    api_req.element_data = actualCost_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("set actual cost response", response);
      if (response.status=true) {
        this.actualCost_ProductList = response.product_details;
       
    
      }

    });


  }
  fileAttachmentEdit(ID: any) {
    $("#fileAttachmentFormId").modal("show");
    // this.fileAttachContractID = fileAttachContractID;
    this.fileAttach_quotationID = ID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "quotation_attachment_details";
    fileattach_req.quotationId =  this.fileAttach_quotationID;
    fileattach_req.user_id = "2";
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check  file attachment", response)
      this.getFileAttachmentResult = response.attachment_list
      // this.firstResult = response.phone_provision_det;
      // this.secondResult=response.contract_attachment_arr;
      if (response.status==true) { 
        this.FileAttachmentForm.patchValue({
          'file': response.attachment_list.uploadFileName,
        });
      }
    });


  }
  fileAttachmentDelete(common_attachmentId: any) {
    this.commonAttachmentID = common_attachmentId;
    let api_req: any = new Object();
    let fileattachDelete_req: any = new Object();
    api_req.moduleType = "quotation";
    // api_req.api_url = "customer/delete_file_attachment";
    api_req.api_url = "quotation/quotation_attachment_delete";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattachDelete_req.action = "quotation_attachment_delete";
    fileattachDelete_req.common_attachmentId = this.commonAttachmentID;
    fileattachDelete_req.user_id = "2";
    fileattachDelete_req.quotationId =  this.fileAttach_quotationID;
    api_req.element_data = fileattachDelete_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
         
      if (response.status == true) {
        // this.myForm.reset();
          alert("deleted")
          $("#fileAttachmentFormId").modal("hide");
      }
      

    });

  }
  fileAttachmentUpdate() {
    this.FileAttachmentForm.reset();
//  var data = new FormData();

const data = new FormData();
 
for (var i = 0; i < this.myFiles.length; i++) { 
  data.append("cust_file[]", this.myFiles[i]);
}
for (var j = 0; j < this.edit_array.length; j++) { 
  data.append("quotation_pdf_add[]", this.edit_array[j]);
}
data.append('user_id', "2" ); 
data.append('quotationId',this.fileAttach_quotationID ); 
// data.append('quotation_pdf_add[]',this.edit_array ); 
data.append('action', "quotation_attachment_save");


      var self = this;
      $.ajax({
          type: 'POST',
          url: 'https://erp1.cal4care.com/api/quotation/quotation_attachment_save',
          cache: false,
          contentType: false,
          processData: false,
          data : data,
          success: function(result:any){
            if(result.status==true){
              self.quotationList();
              console.log(result);
              $("#fileAttachmentFormId").modal("hide");
              this.edit_array=[];
            }
          },
          error: function(err:any){
              console.log(err);
          }
        })

  }
  

  AddQuotationGo() {
var enq_formID = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
var enq_subject = this.addNewQuotationPopUpForm.value.enquirySubject_addPopUP;
var enq_quotation_valid_day = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
var enq_duplicate_version = this.addNewQuotationPopUpForm.value.version_enqForm_addPopUP;


    this.router.navigate(['/addquotationnew'],{ queryParams: { formID: enq_formID,subject:enq_subject,validity:enq_quotation_valid_day,version:enq_duplicate_version}});

    $('#addNewQuotationFormId').modal('hide');
  }
  EditQuotationGo(){
    var editQuotID= this.edit_quotationID;
    var enq_formID = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    var enq_subject = this.addNewQuotationPopUpForm.value.enquirySubject_addPopUP;
    var enq_quotation_valid_day = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    var enq_duplicate_version = this.addNewQuotationPopUpForm.value.version_enqForm_addPopUP;
    this.router.navigate(['/editquotationnew'],{ queryParams: { e_quotID: editQuotID,formID: enq_formID,subject:enq_subject,validity:enq_quotation_valid_day,version:enq_duplicate_version}});
    $('#editNewQuotationFormId').modal('hide');

  
  }
}

