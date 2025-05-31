import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;
@Component({
  selector: 'app-prepaidnote',
  templateUrl: './prepaidnote.component.html',
  styleUrls: ['./prepaidnote.component.css']
})
export class PrepaidnoteComponent implements OnInit {


  Transaction_list: any;


  searchTransactionForm: FormGroup;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //search
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  searchResult: any;
  Transaction_Type_List: any;
  searchBILLERID: any;
  CBV_BillerName_All: any;
  edit_array_SearchBiller_Checkbox: any = [];
  searchResult1_CustomerID: any;
  searchResult1_CustomerName: any;
  AdvanceSearchResult: any;
  isReadOnly: boolean = false;
  commentTransactionID: any;
  transactionTypeNumber: any;
  PC_Description: any;
  PC_Type: any;
  PC_Amount: any;
  PC_Comments: any;
  Cus_CustomerName: any;
  Cus_billerName: any;
  Cus_address1: any;
  Cus_address2: any;
  Cus_City: any;
  Cus_state: any;
  Cus_zipcode: any;
  Cus_country: any;
  Cus_phone: any;
  Cus_mobilephone: any;
  Cus_fax: any;
  Cus_email: any;
  Cus_financeemail: any;
  Cus_Contactperson: any;
  customerIDCredit: any = '';
  searchResultTest: string;
  Transaction_list_Permiss: any;
  Transaction_list_PermissAdd: any;
  Transaction_list_PermissEdit: any;
  Transaction_list_PermissDelete: any;
  Transaction_list_PermissSearch: any;
  Transaction_list_PermissPDF: any;
  Transaction_list_PermissList: any;
  Transaction_list_PermissEmail: any;
  countDetails: any;

  //email
  emailForm: FormGroup;
  email_TemplateSelection: boolean = false;
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
  SelectType_finance: any;
  SelectType_company: any;
  Select_To_Type_radiobox_Value: any;
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId: any;
  email_checkbox_value: any;
  checkbox_value: any;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  emailBillerName: any;



  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }
  keywordCompanyName = 'customerName';
  // Declare dynamic variables
  purchaseEntryNo: string;
  vendorName: string;
  invoiceNo: string;
  contentOfPurchase: string;
  poNumber: string;
  currency: string;
  currencyConversionRate: string;
  taxAmount: string;
  invoiceAmount: string;
  comments: string;
  ngOnInit(): void {
    this.Select_To_Type_radiobox_Value = 'finance';
    this.searchTransactionForm = new FormGroup({
      'search_billerName1': new FormControl(null),
      'company_Name6': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),
      'formControlName="radio_ApprovalBy': new FormControl(null),

    });
    this.getTransactionNewList({});

    this.Transaction_Type_List = [
      { name: 'Deposit', selected: true, id: 1 },
      { name: 'Commission', selected: true, id: 9 },
      { name: 'Withdrawal', selected: true, id: 2 },
      { name: 'Purchase Entry', selected: true, id: 3 },
      { name: 'Salary', selected: true, id: 4 },
      { name: 'Pettycash', selected: true, id: 5 },
      { name: 'Logistics', selected: true, id: 51 },
      { name: 'Vendor Order', selected: true, id: 6 },
      { name: 'Invoice Payment', selected: true, id: 7 },
      { name: 'Others', selected: true, id: 8 },


    ];

    // Initialize dynamic variables with default values
    // this.purchaseEntryNo = '12345';
    // this.vendorName = 'Vendor Inc.';
    // this.invoiceNo = 'INV001';
    // this.contentOfPurchase = 'Office Supplies';
    // this.poNumber = 'PO123';
    // this.currency = 'USD';
    // this.currencyConversionRate = '1.0';
    // this.taxAmount = '100';
    // this.invoiceAmount = '1100';
    // this.comments = 'N/A';
  }
  addCreditNoteGo() {
    this.router.navigate(['/addprepaidnote'])

  }

  editCreditNoteGo(id: any,) {
    var creditNoteID = id;

    this.router.navigate(['/editprepaidnote'])

    this.router.navigate(['/editprepaidnote'], {
      queryParams: {
        e_credit_note_id: creditNoteID,

      }
    });

  }
  selectEventCustomer(item: any) {
    // console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {

      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      // console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

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

      this.searchResult = response.customer_names;
      // console.log("vignesh-advanced search result", this.searchResult);
      if (response.status = true) {
      }
    });
  }
  clearSearch() {

  }
  getEmailDetails(credit_note_id: any, customer_id: any) {

    this.email_TemplateSelection = false;
    $('#temp').val('');

    $('input:checkbox').removeAttr('checked');
    this.emailForm.reset();
    this.spinner.show();
    this.Email_BillId = credit_note_id;
    let api_req: any = new Object();
    let api_emailDetails: any = new Object();
    api_req.moduleType = "prepaidNote";
    api_req.api_url = "prepaidNote/getEmailDatas";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_emailDetails.action = "getEmailDatas";
    if (credit_note_id != undefined) {
      api_emailDetails.credit_note_id = credit_note_id;
    } else {
      api_emailDetails.credit_note_id = '';
    }
    api_emailDetails.customer_id = customer_id;

    api_emailDetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_emailDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.email_fromList = response.fromEmails;
        this.email_groupMailList = response.group_mail;
        this.email_crmTemplateList = response.creditTemplateList;
        this.email_cc_userList = response.cc_user;
        this.messageContent = response.invoice_content;
        this.SelectType_finance = response.getCustomerEmail.finance_email;
        this.SelectType_company = response.getCustomerEmail.email;
        this.emailBillerName = response.billerName;

        this.mailContent = tinymce.get('tinyID1_prepaidnote').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({

          'tinyID1_prepaidnote': this.mailContent,
          'Subject_Content': response.subject,


        })
        if (this.Select_To_Type_radiobox_Value == 'finance') {
          this.emailForm.patchValue({
            'email_to': response.getCustomerEmail.finance_email,
            'tinyID1_prepaidnote': this.mailContent,
          })
        }
        else {
          this.emailForm.patchValue({
            'email_to': response.getCustomerEmail.email,
            'tinyID1_prepaidnote': this.mailContent,
          })
        }




      } else {
        this.spinner.hide();

        $('#processPaymentId_inv').modal("hide");
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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

  getTransactionNewList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "prepaidNote";
    api_req.api_url = "prepaidNote/getPrepaidNoteList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "prepaidNote/getPrepaidNoteList";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.off_set = list_data.offset;
    TNapi_req.customer_id = this.customerIDCredit;
    TNapi_req.limit_val = list_data.limit;

    TNapi_req.search_txt = this.searchResult_CustomerID;

    TNapi_req.current_page = "";

    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {


        this.Transaction_list = response.data;
        this.Transaction_list_PermissAdd = response.permission_arr.add;
        this.Transaction_list_PermissEdit = response.permission_arr.edit;
        this.Transaction_list_PermissDelete = response.permission_arr.delete;
        this.Transaction_list_PermissSearch = response.permission_arr.search;
        this.Transaction_list_PermissPDF = response.permission_arr.pdf;
        this.Transaction_list_PermissList = response.permission_arr.list;
        this.Transaction_list_PermissEmail = response.permission_arr.email;
        this.countDetails = response.count;

        // console.log(this.Transaction_list);
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

        $('#searchTransactionFormId').modal('hide');
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

  deleteTransaction(id: any) {
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
        api_req.moduleType = "prepaidNote";
        api_req.api_url = "prepaidNote/getPrepaidNotedelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "prepaidNote/getPrepaidNotedelete";
        del_req.prepaid_id = id;
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == 'true') {

            Swal.close();
            iziToast.success({
              message: "Prepaid Note Deleted Successfully",
              position: 'topRight'
            });
            this.getTransactionNewList({});

          } else {
            Swal.close();
            iziToast.warning({
              message: "Transaction Entry  Delete Failed",
              position: 'topRight'
            });
            this.getTransactionNewList({});
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            // console.log("final error", error);
          };
      }
    })
  }


  clearSelection(event: any) {

    this.searchResultTest = '';
    this.searchResult_CustomerID='';


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
  templateContentEmailDropdown(event: any) {
    this.quotation_Emailtemplate_id = event.target.value;
    // console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "prepaidNote";
    api_req.api_url = "prepaidNote/getTemplateData";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "getTemplateData";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.credit_note_id = this.Email_BillId;
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.messageContent = response.crm_template_content;
      this.mailContent = tinymce.get('tinyID1_prepaidnote').setContent("<p>" + this.messageContent + "</p>");
      $('#subject9').val(response.crm_subject_name);
      $('#tinyID1_prepaidnote').val(this.mailContent);
      if (response != '') {
        this.emailForm.patchValue({

          // 'Subject_Content': response.crm_subject_name,

          // 'tinyID1_prepaidnote': this.mailContent,

        });

      }
      else {
        this.emailForm.patchValue({

          'email_template': '',

        });
      }


    });
  }
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    // this.getInvoice1({});
    tinymce.activeEditor.setContent("");
  }
  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    // this.FromEmailValue = $('#emailFrom').val();
    this.FromEmailValue = this.emailForm.value.email_From;

    //  this.emailTo = $('#emailto').val();
    this.emailTo = this.emailForm.value.email_to;
    // this.subjectValue = $('#subject').val();
    // this.subjectValue = this.emailForm.value.Subject_Content;
    this.subjectValue = $('#subject9').val();
    this.msg_id = tinymce.get('tinyID1_prepaidnote').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)


    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "prepaidNote";
    api_req.api_url = "prepaidNote/sendCreditEmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "sendCreditEmail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.credit_note_id = this.Email_BillId;
    api_email_req.template_id = this.quotation_Emailtemplate_id;
    api_email_req.billerName = this.emailBillerName;

    api_email_req.email_from = this.FromEmailValue;
    if (this.emailForm.value.email_From === null || this.emailForm.value.email_From === '' || this.emailForm.value.email_From === 'undefined' || this.emailForm.value.email_From === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.to_email = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;




    if ($('#subject9').val() === null || $('#subject9').val() === '' || $('#subject9').val() === 'undefined' || $('#subject9').val() === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      Swal.close();
      return false;

    } else {
      api_email_req.crm_subject_name = this.subjectValue;
    }
    api_email_req.crm_template_content = this.msg_id;
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
        $('#subject9').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

        $("#emailFormId_prepaidNote").modal("hide");
        // this.getInvoice1({});

      }
      else {
        $('#subject9').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#emailFormId_prepaidNote").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        // this.getInvoice1({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        // this.getInvoice1({});

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
  PDF(id:any){
    var url =this.serverService.urlFinal + "prepaidNote/generatePrepaidNote/" + btoa(id)  + "";
    window.open(url, '_blank');
  }





}
