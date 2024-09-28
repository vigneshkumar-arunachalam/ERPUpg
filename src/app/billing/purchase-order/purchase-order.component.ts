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
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
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
//permission
PO_Permission_add:any;
PO_Permission_delete:any;
PO_Permission_edit:any;
PO_Permission_mail:any;
PO_Permission_pdf:any;
PO_Permission_search:any;
PO_Permission_view:any;
  //for error
  edit_array_SearchBiller_Checkbox: any;
  biller_list: any;
  Purchase_Order: any;

  // EMAIL 
  emailForm: FormGroup;
  EmailQuotationID: any;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  Select_To_Type_radiobox_Value: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  email_groupMailList: any;

  edit_array_emailCC_Checkbox: any = [];
  quotation_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  FromEmailValue: any;
  Email_BillId: any;
  CBV_TemplateSelection: any;
  CBV_PDFLink: any;
  CBV_PaymentLink: any;
  Email_poId: any;

  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { }

  keywordCustomerName = 'vendorName';
  ngOnInit(): void {
    this.PurchaseOrderList({});
    this.searchPurchaseOrderForm = new FormGroup({
      'company_Name': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'emailFrom': new FormControl(null, Validators.required),
    });
  }
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }

  PurchaseOrderList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/purchase_order_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "purchase_order_list";
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
        this.Purchase_Order = response.po_details;
        this.PO_Permission_add=response.po_permission_arr.add;
        this.PO_Permission_delete=response.po_permission_arr.delete;
        this.PO_Permission_edit=response.po_permission_arr.edit;
        this.PO_Permission_mail=response.po_permission_arr.mail;
        this.PO_Permission_pdf=response.po_permission_arr.pdf;
        this.PO_Permission_search=response.po_permission_arr.search;
        console.log("this.PO_Permission_add",this.PO_Permission_add);
        console.log("this.PO_Permission_delete",this.PO_Permission_delete);
        console.log("this.PO_Permission_edit",this.PO_Permission_edit);
        console.log("this.PO_Permission_pdf",this.PO_Permission_pdf);


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
  goAddDeliveryOrder() {
    this.router.navigate(['/addPurchaseOrder'])
  }

 
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  AdvanceSearchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/vendor_name_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "vendor_name_details";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_Search_req.billerId = this.addDeliveryOrderForm.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.AdvanceSearchResult = response.vendor_list;

      if (response.status = true) {

      }

    });

  }
  selectEventCustomer(item: any) {
    console.log(item)
    this.searchResult1_CustomerID = item.vendorId;
    this.searchResult1_CustomerName = item.vendorName;
    console.log("AutoComplete-customer ID", this.searchResult1_CustomerID)
    console.log("AutoComplete-customer Name", this.searchResult1_CustomerName)

  }
  CustomerListQuickSearch(id:any){

  }
  deletePurchaseOrder(id: any) {
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
        api_req.moduleType = "purchaseorder";
        api_req.api_url = "purchaseorder/delete_purchase_order";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "delete_purchase_order";
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        del_req.poId = id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Purchase Order Deleted Successfully",
              position: 'topRight'
            });
            this.PurchaseOrderList({});

          } else {
            Swal.close();
            iziToast.warning({
              message: "Purchase Order Delete Failed",
              position: 'topRight'
            });
            this.PurchaseOrderList({});
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }
 
  getEmailDetails(poid: any) {
    this.spinner.show();
    this.Email_poId = poid;
    let api_req: any = new Object();
    let api_emailDetails: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/getMailDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_emailDetails.action = "getMailDetails";

    api_emailDetails.poId = poid;
    api_emailDetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_emailDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.messageContent = response.content;
        this.FromEmailValue=response.fromEmail;
        this.subjectValue =response.subject;
        this.mailContent = tinymce.get('tinyID_po').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({

          'tinyID_po': this.mailContent,
          'Subject_Content': response.subject,
          'emailFrom': response.fromEmail,


        })
    
        this.PurchaseOrderList({});
      } else {

        $('#emailFormId_po').modal("hide");
        iziToast.warning({
          message: "Email Details not displayed. Please try again",
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
  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

 
    this.emailTo = this.emailForm.value.email_to;
  
    this.msg_id = tinymce.get('tinyID_po').getContent();
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
    api_email_req.poId =this.Email_poId;
 

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.FromEmailValue === null || this.FromEmailValue === '' || this.FromEmailValue === 'undefined' || this.FromEmailValue === undefined) {

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
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;

    api_email_req.subject = this.subjectValue;
    if (this.subjectValue === null || this.subjectValue === '' || this.subjectValue === 'undefined' || this.subjectValue === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      return false;

    }

    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#emailFormId").modal("hide");
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
      Swal.close();
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  pdf(purchaseOrderId: any) {
    var url = "https://laravelapi.erp1.cal4care.com/api/purchaseorder/getPurchaseOrderPdfShow?poId=" + purchaseOrderId + "";
    window.open(url, '_blank');
    console.log("url", url)

  }
  editPurchaseOrder(po_id: any) {

    var purchaseOrder_ID = po_id;
    this.router.navigate(['/editPurchaseOrder'])
    this.router.navigate(['/editPurchaseOrder'], {
      queryParams: {
        e_purchaseOrder_Id: purchaseOrder_ID,
      }
    });

  }
  
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.PurchaseOrderList({});
    tinymce.activeEditor.setContent("");
  }


  sendtoApproval(poId:any) {
    Swal.fire({
      title: 'Are you sure to send to Approve?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!'
    }).then((result: any) => {
      if (result.value) {

        let api_req:any=new Object();
        let api_reqSharePerm:any=new Object();
        api_req.moduleType="purchaseorder";
        api_req.api_url="purchaseorder/po_send_to_approval";
        api_req.api_type="web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqSharePerm.action="po_send_to_approval";
        api_reqSharePerm.user_id=localStorage.getItem('erp_c4c_user_id');
        api_reqSharePerm.PoId=poId;
        api_req.element_data=api_reqSharePerm;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            
      
            iziToast.success({
              message: "Approval success",
              position: 'topRight'
            });
            this.PurchaseOrderList({});
          } else {
            iziToast.warning({
              message: "Approval not done. Please try again",
              position: 'topRight'
            });
            this.PurchaseOrderList({});
          }
        }),
          (error: any) => {
            this.PurchaseOrderList({});
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })


  }
}
