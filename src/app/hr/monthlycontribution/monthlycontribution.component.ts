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
  selector: 'app-monthlycontribution',
  templateUrl: './monthlycontribution.component.html',
  styleUrls: ['./monthlycontribution.component.css']
})
export class MonthlycontributionComponent implements OnInit {


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
  //group select
  selectAllCheckbox = false;
  selectedResellerCommIds_unpaid_all: any[] = [];
  selectedResellerCommIds_unpaid: any[] = [];
  //view
  viewSalaryForm:FormGroup;
  isReadOnly:boolean=true;
  rowDeleteStatus: boolean=false;
  groupDeleteStatus: boolean=false;
  rowSalaryID: any;
  //search 
  searchSalaryForm:FormGroup;
  monthList: any;
  yearList: any;
  billerList: any;
  userList:any;
  user_ids: string;
  billerNameDefault: any;
  staffNameDefault: any;
  salaryMonthDefault: any;
  salaryYearDefault: any;

  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { 
    this.salaryDropDownList();
  }

  keywordCustomerName = 'vendorName';
  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.salaryDropDownList();
    this.PurchaseOrderList({});
    this.searchPurchaseOrderForm = new FormGroup({
      'company_Name': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'emailFrom': new FormControl(null, Validators.required),
    });
    this.viewSalaryForm=new FormGroup({
      'view_billerName':new FormControl(null,Validators.required),
      'view_SalaryEntryDate':new FormControl(null,Validators.required),
      'view_StaffName':new FormControl(null,Validators.required),
      'view_SalaryMonth':new FormControl(null,Validators.required),
      'view_BasicWages':new FormControl(null,Validators.required),
      'view_CPFWages':new FormControl(null,Validators.required),
      'view_EmployeeContribution':new FormControl(null,Validators.required),
      'view_EmployerContribution':new FormControl(null,Validators.required),
      'view_OtherContribution':new FormControl(null,Validators.required),
    });
    this.searchSalaryForm=new FormGroup({
      'billname':new FormControl(this.billerNameDefault),
      'staffname':new FormControl(this.staffNameDefault),
      'salarymonth':new FormControl(this.salaryMonthDefault),
      'salaryyear':new FormControl(this.salaryYearDefault),

    });
  }
 
  selectAll_assignLicense() {
    this.selectedResellerCommIds_unpaid_all = [];
    this.selectedResellerCommIds_unpaid = [];

  
console.log("this.tempVariable",this.Purchase_Order);
    this.Purchase_Order.forEach((item: { selected: boolean; id: any;  }) => {
      item.selected = this.selectAllCheckbox; // Update each item's selected state

      if (item.selected) {
        this.selectedResellerCommIds_unpaid.push(item.id);
     
      }
    });

    console.log('Select All/Deselect All:', this.selectedResellerCommIds_unpaid);
  }
  updateSelected_assignLicense(item: any) {
    if (item.selected) {
      // Add to selected arrays
      this.selectedResellerCommIds_unpaid.push(item.id);
    
    } else {
      // Remove from selected arrays
      const index = this.selectedResellerCommIds_unpaid.indexOf(item.id);
      if (index > -1) {
        this.selectedResellerCommIds_unpaid.splice(index, 1);
    
      }
    }

    // Update master checkbox state
    this.selectAllCheckbox = this.Purchase_Order.every(
      (item: { selected: any; }) => item.selected
    );

    console.log('Updated Selection:', this.selectedResellerCommIds_unpaid);
  }
 

  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  salaryDropDownList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/salaryDropDownList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/salaryDropDownList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.monthList=response.Month;
        this.yearList=response.Year;
        this.userList=response.user;
        this.billerList=response.biller;
        this.billerNameDefault=response.default_biller;
        this.staffNameDefault=response.default_user;
        this.salaryMonthDefault=response.default_month;
        this.salaryYearDefault=response.default_year;

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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

  PurchaseOrderList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/monthlyContributionList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "hr/monthlyContributionList";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
     

      if (response.status==true) {

       
        this.Purchase_Order = response.data;
    

        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
  
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
  goAddSalary() {
    this.router.navigate(['/addmonthlycontribution'])
  }
  editSalaryEntry(id:any){
    this.router.navigate(['/editmonthlycontribution'], {
      queryParams: {
        salaryId: id,
      }
    });
    
  }
  editSalaryEntryMultiple(){
    if(this.selectedResellerCommIds_unpaid.length>1){
      const formattedIds= this.selectedResellerCommIds_unpaid.join(',');
      console.log("selectedResellerCommIds_unpaid-multiple edit",formattedIds);
      this.router.navigate(['/editmonthlycontribution'], {
        queryParams: {
          salaryId:formattedIds
        }
      });
    }else{
      iziToast.error({
        message: "Select Atleast 1 ",
        position: 'topRight'
      });

    }
  
  }
  rowDelete(id: any) {
    this.rowSalaryID=id;
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
            this.spinner.show();
            let api_req: any = new Object();
            let api_deliveryOrder: any = new Object();
            api_req.moduleType = "hr";
            api_req.api_url = "hr/deleteMonthlyContributionDetails"
            api_req.api_type = "web";
            api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
            api_deliveryOrder.action = "hr/deleteMonthlyContributionDetails";
            api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
            api_deliveryOrder.contribution_id = this.rowSalaryID;
            api_req.element_data = api_deliveryOrder;
  
            this.serverService.sendServer(api_req).subscribe((response: any) => {
              if (response.status == true) {
              
                // console.log("array content after delete", this.edit_array)
                this.spinner.hide();
                iziToast.success({
                  message: "Deleted Successfully",
                  position: 'topRight'
                });
                this.PurchaseOrderList({});
              } else {
                this.spinner.hide();
                iziToast.success({
                  message: "Deleted Successfully",
                  position: 'topRight'
                });
                this.PurchaseOrderList({});
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
        })
  
      }
  groupDeleteSalary(){
  
    if(this.selectedResellerCommIds_unpaid.length>0  ){
   
      const formattedIds= this.selectedResellerCommIds_unpaid.join(',');
      console.log("selectedResellerCommIds_unpaid-multiple edit",formattedIds);
     
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
          this.spinner.show();
          let api_req: any = new Object();
          let api_deliveryOrder: any = new Object();
          api_req.moduleType = "hr";
          api_req.api_url = "hr/deleteMonthlyContributionDetails"
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_deliveryOrder.action = "hr/deleteMonthlyContributionDetails";
          api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
          api_deliveryOrder.contribution_id = formattedIds;
          api_req.element_data = api_deliveryOrder;

          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == true) {
              this.spinner.hide();
              // console.log("array content after delete", this.edit_array)
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.PurchaseOrderList({});
            } else {
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.PurchaseOrderList({});
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
      })
    
      
     
    }else{
     
      iziToast.error({
        message: "Select Atleast 1 ",
        position: 'topRight'
      });

    }
  
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
  editPurchaseOrder(id: any) {

    var purchaseOrder_ID = id;
    this.router.navigate(['/editmonthlycontribution'])
    this.router.navigate(['/editmonthlycontribution'], {
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

  viewSalaryEntry(salaryId:any){
    this.spinner.show();
  
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/view_salaryDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "hr/view_salaryDetails";
    api_recurring.user_id = localStorage.getItem("erp_c4c_user_id");
    api_recurring.salaryId=salaryId;
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status = true) {
        $('#viewsalaryFormId').modal('show');
       
        this.viewSalaryForm.patchValue({
          'view_billerName':response.data.billerName,
          'view_SalaryEntryDate':response.data.salaryDate,
          'view_StaffName':response.data.salaryName,
          'view_SalaryMonth':response.data.salaryMonthYear,
          'view_BasicWages':response.data.grossAmount,
          'view_CPFWages':response.data.cpf_wages,
          'view_EmployeeContribution':response.data.empEAmount,
          'view_EmployerContribution':response.data.empRAmount,
          'view_OtherContribution':response.data.otherAmount,

        })
  
        
      }
    });


  }

  pdfSalaryEntry(salaryId: any) {

   // var url = "https://erp1.cal4care.com/api/hr/salarySlipDetails?salaryId=" + salaryId + "";
    var url = "https://laravelapi.erp1.cal4care.com/api/hr/salarySlipDetails?salaryId=" + salaryId + "";
    // var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }
}
