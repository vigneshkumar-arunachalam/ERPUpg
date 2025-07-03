import { Component, OnInit } from '@angular/core';

import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;
@Component({
  selector: 'app-did-stock',
  templateUrl: './did-stock.component.html',
  styleUrls: ['./did-stock.component.css']
})
export class DidStockComponent implements OnInit {

  edit_aval_action: FormGroup;
  pageLimit = 50;
  offset_count = 0;
  recordNotFound = false;
  paginationData: any = { "info": "hide" };
  paginationData2: any = { "info": "hide" };
  paginationData3: any = { "info": "hide" };
  paginationData4: any = { "info": "hide" };
  paginationData5: any = { "info": "hide" };
  paginationData6: any = { "info": "hide" };
  // did_inventory_data: any;
  did_approval_data: any;

  did_demo_issued_data: any;
  did_number_entry_data: any;
  did_issues_history_data: any;
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchText: string = '';
  off_set: any;
  customer_data: any;
  keywordCompanyName = 'customerName';
  edit_entity_issue_id: any;
  edit_biller_issue_id: any;
  issued_entity_id: any;
  issued_entity_nrs_id: any;
  issued_entity_demo_id: any;
  recordForm: FormGroup;
  showAddModal = false;
  biller_data: any;
  trunk_name_data: any;
  isSearchFormVisible = false; // Controls visibility of the search form
  globle_seach: any;
  globle_billerid: any;
  nrs_status: any;
  //select all
  did_inventory_data: any[] = [];
  selectedDIDs: number[] = []; // use string[] if your ID is string
  getNRSList: any;
  nrs_did_issueStatus: any;
  SelectedCustomerID: any;
  today: string;
  LinkDIDNumValue: any;
  //select all-did issued
  did_issued_data: any[] = [];
  selectedDIDs_issued: number[] = []; // use string[] if your ID is string
  search1_data: any;
  //search
  edit_array_SearchBiller_Checkbox: any = [];
  CBV_BillerName_All: any;
  searchBILLERID: any;
  searchDIDStockForm: FormGroup;
  searchResult: any;
  searchResult_CustomerName: any;
  did_tabName: string;
  search_text: any;
  search_customer: any;
  SelectedIssueCustomerID: any;
  issueDIDStockForm: FormGroup;


  constructor(private serverService: ServerService, public sanitizer: DomSanitizer,
    private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, private http: HttpClient) {
    this.recordForm = this.fb.group({
      rows: this.fb.array([this.createRow()]), // Initialize with one row
    });
    this.today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  ngOnInit(): void {
    this.did_tabName = 'did_inventory_List';
    this.search_text = '';
    this.search_customer = '';
    this.did_inventory_List({});
    this.biller_list();
    this.did_trunkname_list();

    this.edit_aval_action = this.fb.group({
      Issue_Date: [this.today],
      Demo:[false],
      customer_id: [''],
      Remarks: [''],
      linkDID: [null]
    });
    // this.did_approval_List();
    this.searchDIDStockForm = new FormGroup({
      'company_Name': new FormControl(null),
      'searchDIDNo': new FormControl(null)
    });
    this.issueDIDStockForm = new FormGroup({
      'company_Name_iss': new FormControl(null),
    });
    this.search_list();

  }
  keysearch(event: any) {
    this.searchResult_CustomerName = event.target.value
  }
  searchCustomerData(data: any) {

    if (data.length > 0) {
      // this.spinner.show();
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

        //   console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.customer_names;
        //  console.log("vignesh-advanced search result", this.searchResult);
        if (response! = null) {
          this.searchResult = response.customer_names;
          this.spinner.hide();
        }
        else {
          // iziToast.warning({
          //   message: "Sorry, No Matching Data",
          //   position: 'topRight'
          // });

        }
      });

    }


  }
  clearSelection(event: any) {

    // this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';
    this.SelectedCustomerID = '';
    this.search_customer = '';
    this.SelectedIssueCustomerID = '';
  }
   customerClearlist(event: any) {
    this.LinkDIDNumValue = '';
    this.SelectedCustomerID = '';
  }
  clear(){
     this.SelectedCustomerID = '';
        this.customer_data='';
            this.LinkDIDNumValue = '';
   //  this.edit_aval_action.value.customer_id.reset();
     this.edit_aval_action.controls['customer_id'].reset();
      this.edit_aval_action.controls['Demo'].reset();
       this.edit_aval_action.controls['Remarks'].reset();
  }
  

  LinkDIDNumbChange(eve: any) {
    this.LinkDIDNumValue = eve.target.value;
    console.log("this.LinkDIDNumValue", this.LinkDIDNumValue);

  }
 
  // currentDate34:any;
  currentDate34 = new Date().toISOString().substring(0, 10);
  createRow(): FormGroup {
    return this.fb.group({
      billerName: [null],
      trunkName: [null],
      didNumber: [''],
      nrs: [false],
      purDate: [this.currentDate34],
    });
  }
  get rows(): FormArray {
    return this.recordForm.get('rows') as FormArray;
  }
  addRow(): void {
    this.rows.push(this.createRow());
  }

  removeRow(index: number): void {
    if (this.rows.length > 1) {
      this.rows.removeAt(index);
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.did_inventory_List({});
  }
  selectEventCustomer(event: any) {
    console.log('Selected Customer:', event.customerId);
    this.SelectedCustomerID = event.customerId;
    this.get_nrs_customer_id_valueList();
  }
  selectEventCustomer1(event: any) {
    console.log('Selected Customer:', event.customerId);
    this.SelectedIssueCustomerID = event.customerId;

  }
  onFocusedCustomer(event: any) {
    console.log('Input Focused:', event);
  }
  openAddModal() {
    $('#add_new_modal').modal('show')
    console.log('hhdhd')
  }
  closeAddModal() {
    $('#add_new_modal').modal('hide')
  }
  opensearchModal() {
    $('#open_search_modal').modal('show')
    console.log('hhdhd')
  }
  closesearchModal() {
    $('#open_search_modal').modal('hide')
  }
  search_data(data: any) {
    console.log(data);
    this.globle_seach = data.search_text;
    this.globle_billerid = data.search_text;

  }
  toggleSearchForm() {
    // this.isSearchFormVisible = !this.isSearchFormVisible;
    // $('#did_search').val('');
    // $('#biller_name').val('');
    $('#searchDIDStockFormId').modal('show')

  }

  searchDIDStock() {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "did_inventory/saveBiller"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/saveBiller";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.billerId = this.edit_array_SearchBiller_Checkbox;
    get_req.did_tabName = this.did_tabName;
    get_req.search_customer = this.SelectedCustomerID;
    get_req.search_text = this.searchDIDStockForm.value.searchDIDNo;

    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.did_tabName = response.did_tabName;
        this.search_text = response.search_text;
        this.search_customer = response.search_customer;
        $('#searchDIDStockFormId').modal('hide');

        if (this.did_tabName == 'did_inventory_List') {
          this.did_inventory_List({});
        } else if (this.did_tabName == 'did_approval_List') {
          this.did_approval_List({});
        }
        else if (this.did_tabName == 'did_issued_List') {
          this.did_issued_List({});
        }
        else if (this.did_tabName == 'did_demo_issued_List') {
          this.did_demo_issued_List({});
        }
        else if (this.did_tabName == 'did_number_entry_List') {
          this.did_number_entry_List({});
        }
        else if (this.did_tabName == 'did_issues_history_List') {
          this.did_issues_history_List({});
        } else {
          this.did_inventory_List({});
        }


      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  customerlist(data: any) {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "base";
    api_req.api_url = "base/getCustomerList"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getCustomerList";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.keyword = data;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.customer_data = response.data;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    // console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      if (!this.edit_array_SearchBiller_Checkbox) {
        this.edit_array_SearchBiller_Checkbox = [];
      }


      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_SearchBiller_Checkbox)) {
        this.edit_array_SearchBiller_Checkbox = [];
      }
      // const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data);
      const index = this.edit_array_SearchBiller_Checkbox.indexOf(data);
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  search_list() {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/searchBiller"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/searchBiller";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.search1_data = response.billerDatas;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  biller_list() {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/getBillers"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getBillers";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.biller_data = response.data;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  get_nrs_customer_id_valueList() {
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/get_nrs_customer_id_value"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/get_nrs_customer_id_value";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.customerId = this.SelectedCustomerID;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        if (response.data) {
          this.getNRSList = response.data;
          this.spinner.hide();
        }


        this.spinner.hide();

      } else {
        this.spinner.hide();

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  did_trunkname_list() {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/getTrunkNames"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getTrunkNames";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.trunk_name_data = response.data;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  listDataInfo(list_data: any) {

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    list_data.order_by_name = list_data.order_by_name == undefined ? "contact.contact_id" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  did_inventory_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_inventory_List"
    api_req.api_type = "web"
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_inventory_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');

    get_req.off_set = list_data.offset;
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.did_inventory_data = response.data;
        this.did_tabName = response.did_tabName;
        this.off_set = response.offset;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        this.paginationData = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
      } else {
        this.spinner.hide();

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  edit_did_avali_save() {
    var formdata = this.edit_aval_action.value;
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/edit_available_issue"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/edit_available_issue";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // get_req.search_text = list_data.search_text;
    get_req.did_entry_hd_id = this.edit_entity_issue_id;
    get_req.billerId = this.edit_biller_issue_id;
    get_req.remark = formdata.Remarks;
    // get_req.customer_id = formdata.customer_id.customerId;
    get_req.customer_id = this.SelectedCustomerID;
    get_req.issueDate = formdata.issueDate;
    if ($('#Demo').prop('checked')) {
      get_req.demo_type = 1;
    } else {
      get_req.demo_type = 0;
    }
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: response.message,
          position: 'topRight'
        });
        this.spinner.hide();
        $('#available_did').modal('hide');
        this.did_approval_List({});
      } else {
        this.spinner.hide();
        // $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  edit_nrs_did_avali_save() {
  //  console.log("1",1);
    var formdata = this.edit_aval_action.value;
   //  console.log("formdata",formdata);
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/nrs_didnumber_issue_customer_update"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/nrs_didnumber_issue_customer_update";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // get_req.search_text = list_data.search_text;
    get_req.did_entry_hd_id = this.edit_entity_issue_id;
    get_req.billerId = this.edit_biller_issue_id;
    get_req.remark = formdata.Remarks;
    // get_req.customer_id = formdata.customer_id.customerId;
    if (this.SelectedCustomerID) {
      get_req.customer_id = this.SelectedCustomerID;
    } else {
      iziToast.error({
        message: "Customer ID Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }

    get_req.issueDate = formdata.Issue_Date;
    if (this.LinkDIDNumValue) {
      get_req.link_didnumber = this.LinkDIDNumValue;
    } else {
      iziToast.error({
        message: "Link DID Number Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }

    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: 'success',
          position: 'topRight'
        });
        this.spinner.hide();
        $('#available_did').modal('hide');
        this.did_approval_List({});
      } else {
        this.spinner.hide();
        // $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  did_approval_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_approval_List"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_approval_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_approval_data = response.data;
        this.did_tabName = response.did_tabName;
        this.off_set = response.offset;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        this.spinner.hide();
        this.paginationData2 = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  did_issued_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_issued_List"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_issued_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_issued_data = response.data;
        this.did_tabName = response.did_tabName;
        this.off_set = response.offset;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginationData3 = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
        // this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  issued_did(did_entry_id: any, nrs_status: any) {

    this.issued_entity_id = did_entry_id;
    this.nrs_status = nrs_status;
    if (nrs_status == 2) {
      $('#issue_did_nrs').modal('show');
    } else {
      $('#issue_did').modal('show');
    }
  }
  issued_did_demo(data: any) {
    $('#issue_did_demo').modal('show');
    this.issued_entity_demo_id = data;
  }
  issued_nrs_did(data: any, issued_nrs_did: any) {
    $('#issue_did_nrs').modal('show');
    this.issued_entity_nrs_id = data;
  }
  issued_did_save() {
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/updateDidNumber"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/updateDidNumber";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // get_req.search_text = list_data.search_text;
    get_req.issue_pool_conv_hd_id = this.issued_entity_id;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });
        $('#issue_did').modal('hide');
        this.did_issued_List({});
        this.spinner.hide();
      } else {
        this.spinner.hide();
        // $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
    // $('#issue_did').modal('show');
  }
  issued_nrs_did_save() {
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/issue_nrs_pool_conv_update_didnumber"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/issue_nrs_pool_conv_update_didnumber";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // get_req.search_text = list_data.search_text;
    get_req.did_entry_id = this.issued_entity_id;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#issue_did_nrs').modal('hide');
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

        this.did_issued_List({});
        this.spinner.hide();
      } else {
        this.spinner.hide();
        // $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
    // $('#issue_did').modal('show');
  }
  issued_demo_did_save() {
    this.spinner.show();
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/updateDidNRSNumber"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/updateDidNRSNumber";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // get_req.search_text = list_data.search_text;
    get_req.demo_reverse_hd_id = this.issued_entity_demo_id;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: response.message,
          position: 'topRight'
        });
        $('#issue_did_demo').modal('hide');
        this.did_demo_issued_List({});
        this.spinner.hide();
      } else {
        this.spinner.hide();
        // $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
    // $('#issue_did').modal('show');
  }
  did_demo_issued_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_demo_issued_List"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_demo_issued_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_demo_issued_data = response.data;
        this.off_set = response.offset;
        this.did_tabName = response.did_tabName;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginationData4 = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
        // this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  did_number_entry_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_number_entry_List"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_number_entry_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_number_entry_data = response.data;
        this.off_set = response.offset;
        this.did_tabName = response.did_tabName;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginationData5 = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
        // this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  did_issues_history_List(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/did_issues_history_List"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/did_issues_history_List";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_text = this.search_text;
    get_req.search_customer = this.search_customer;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    get_req.current_page = 1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_issues_history_data = response.data;
        this.did_tabName = response.did_tabName;
        this.off_set = response.offset;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginationData6 = this.serverService.pagination({ 'offset': response.offset, 'total': response.count, 'page_limit': this.pageLimit });
        this.spinner.hide();
        // this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  edit_available(data: any, billid: any, nrs_did_issue_status: any) {
    $('#available_did').modal('show');
    this.edit_entity_issue_id = data;
    this.edit_biller_issue_id = billid;
    this.nrs_did_issueStatus = nrs_did_issue_status;
  }
  onSubmit() {
    console.log(this.recordForm.value);
    var formdata = this.recordForm.value;
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/insertdid";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "insertdid";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    const rowsArray = this.recordForm.get('rows') as FormArray;
    const firstRow = rowsArray.at(0) as FormGroup;
    if (!firstRow.get('billerName')?.value) {
      // console.log("111");
      this.spinner.hide();
      iziToast.error({
        message: "Billername Missing",
        position: 'topRight'
      });
      return false;

    } else if (!firstRow.get('trunkName')?.value) {
      // console.log("222");
      this.spinner.hide();
      iziToast.error({
        message: "Trunkname Missing",
        position: 'topRight'
      });
      return false;

    } else if (!firstRow.get('didNumber')?.value) {
      // console.log("333");
      this.spinner.hide();
      iziToast.error({
        message: "DIDNumber Missing",
        position: 'topRight'
      });
      return false;

    }
    else {
      // console.log("444");
      api_postUPd.products = formdata.rows;
    }

    api_req.element_data = api_postUPd;
    console.log("api_req", api_req);
    // return false
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        iziToast.success({
          message: response.message,
          position: 'topRight'
        });
        $('#add_new_modal').modal('hide');
        this.did_inventory_List({});
        rowsArray.clear();
        this.addRow();
        // rowsArray.controls.forEach((row: any) => {
        //   row.billerName.reset();
        //   row.trunkName.reset();
        //   row.didNumber.reset();
        //   row.nrs.reset();
        // });


        this.spinner.hide();
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
    // alert('Form submitted successfully!');
  }
  didNumEntDelete(did_entry_id: any) {

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
        api_req.moduleType = "did_inventory";
        api_req.api_url = "did_inventory/didDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "did_inventory/didDelete";
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        del_req.did_entry_id = did_entry_id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.did_number_entry_List({});;
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.did_number_entry_List({});;
            iziToast.warning({
              message: "Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.did_number_entry_List({});;
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }
  resetForm() {
    this.recordForm.reset();
    this.rows.clear();
    this.rows.push(this.createRow());
  }

  toggleSelection(didEntryId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.selectedDIDs.includes(didEntryId)) {
        this.selectedDIDs.push(didEntryId);
      }
    } else {
      this.selectedDIDs = this.selectedDIDs.filter(id => id !== didEntryId);
    }

    console.log('Selected:', this.selectedDIDs);
  }
  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedDIDs = this.did_inventory_data.map(item => item.did_entry_id);
    } else {
      this.selectedDIDs = [];
    }

    console.log('All Selected:', this.selectedDIDs);
  }

  isChecked(didEntryId: number): boolean {
    return this.selectedDIDs.includes(didEntryId);
  }

  get isAllSelected(): boolean {
    return this.did_inventory_data?.length > 0 &&
      this.selectedDIDs.length === this.did_inventory_data.length;
  }


  toggleSelection_issued(didEntryId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.selectedDIDs_issued.includes(didEntryId)) {
        this.selectedDIDs_issued.push(didEntryId);
      }
    } else {
      this.selectedDIDs_issued = this.selectedDIDs_issued.filter(id => id !== didEntryId);
    }

    console.log('Selected:', this.selectedDIDs_issued);
  }
  toggleSelectAll_issued(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedDIDs_issued = this.did_issued_data.map(item => item.did_entry_id);
    } else {
      this.selectedDIDs_issued = [];
    }

    console.log('All Selected:', this.selectedDIDs_issued);
  }

  isChecked_issued(didEntryId: number): boolean {
    return this.selectedDIDs_issued.includes(didEntryId);
  }

  get isAllSelected_issued(): boolean {
    return this.did_issued_data?.length > 0 &&
      this.selectedDIDs_issued.length === this.did_issued_data.length;
  }

  saveAllDIDInv() {
    this.spinner.show();


    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/available_saveAll"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/available_saveAll";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.SelectedIssueCustomerID) {
      get_req.issue_customer_id = this.SelectedIssueCustomerID;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Issue Customer ID Missing",
        position: 'bottomRight'
      });
      return false;


    }
    if (this.selectedDIDs) {
      get_req.did_entry_id = this.selectedDIDs;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "DID Entry ID Missing",
        position: 'bottomRight'
      });
      return false;


    }


    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        this.SelectedIssueCustomerID = '';
        this.selectedDIDs = [];
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        this.did_inventory_List({});



      } else {
        this.spinner.hide();

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }
  saveAllIssuedDIDInv() {
    this.spinner.show();


    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "did_inventory";
    api_req.api_url = "did_inventory/issueDID_saveAll"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "did_inventory/issueDID_saveAll";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');

    if (this.selectedDIDs_issued) {
      get_req.did_entry_id = this.selectedDIDs_issued;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "DID Entry ID Missing",
        position: 'bottomRight'
      });
      return false;


    }


    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        this.SelectedIssueCustomerID = '';
        this.selectedDIDs = [];
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        this.did_inventory_List({});



      } else {
        this.spinner.hide();

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };
  }

}




