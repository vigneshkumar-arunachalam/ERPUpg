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
  selector: 'app-creditnote',
  templateUrl: './creditnote.component.html',
  styleUrls: ['./creditnote.component.css']
})
export class CreditnoteComponent implements OnInit {
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
  isReadOnly:boolean=false;
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
  customerIDCredit:any='';
  searchResultTest: string;
  Transaction_list_Permiss:any;
  Transaction_list_PermissAdd: any;
  Transaction_list_PermissEdit:any; 
  Transaction_list_PermissDelete:any;
  Transaction_list_PermissSearch:any;
  Transaction_list_PermissPDF:any;
  Transaction_list_PermissList:any;
  Transaction_list_PermissEmail:any;
  countDetails: any;

        

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
    this.searchTransactionForm = new FormGroup({
      'search_billerName1': new FormControl(null),
      'company_Name6': new FormControl(null),
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
    this.router.navigate(['/addcreditnote'])

  }

  editCreditNoteGo(id: any, ) {
    var creditNoteID = id;
   
    this.router.navigate(['/editcreditnote'])

    this.router.navigate(['/editcreditnote'], {
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
  getTransactionNewList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = "creditNote";
    api_req.api_url = "creditNote/getCreditNoteList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action = "creditNote/getCreditNoteList";
    TNapi_req.user_id = localStorage.getItem('erp_c4c_user_id');
    TNapi_req.off_set = list_data.offset;
    TNapi_req.customer_id = this.customerIDCredit;
    TNapi_req.limit_val = list_data.limit;
    
    TNapi_req.search_txt=this.searchResult_CustomerID ;
  
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
        this.countDetails=response.totalCount;
  
        

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
        api_req.moduleType = "creditNote";
        api_req.api_url = "creditNote/getCreditNotedelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "creditNote/getCreditNotedelete";
        del_req.credit_note_id = id;
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == 'true') {

            Swal.close();
            iziToast.success({
              message: "Credit Note Deleted Successfully",
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

  }


}
