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
 
  edit_aval_action:FormGroup;
  pageLimit=50;
  offset_count = 0;
  recordNotFound = false;
  paginationData: any = { "info": "hide" };
  paginationData2: any = { "info": "hide" };
  paginationData3: any = { "info": "hide" };
  paginationData4: any = { "info": "hide" };
  paginationData5: any = { "info": "hide" };
  paginationData6: any = { "info": "hide" };
  did_inventory_data: any;
  did_approval_data: any;
  did_issued_data: any;
  did_demo_issued_data: any;
  did_number_entry_data: any;
  did_issues_history_data: any;
  currentPage: number = 1;
  totalItems: number = 0; 
  itemsPerPage: number = 10;
  totalPages: number = 0;
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
  constructor(private serverService: ServerService, public sanitizer: DomSanitizer,
    private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, private http: HttpClient) {
      this.recordForm = this.fb.group({
        rows: this.fb.array([this.createRow()]), // Initialize with one row
      });
  }

  ngOnInit(): void {
    this.did_inventory_List({});
    this.biller_list();
    this.did_trunkname_list();
    this.edit_aval_action = this.fb.group({
      Issue_Date: [''],
      customer_id: [''],
      Remarks: [''],
    });
    // this.did_approval_List();
   
  }
  createRow(): FormGroup {
    return this.fb.group({
      billerName: [''],
      trunkName: [''],
      didNumber: [''],
      nrs: [false],
      purDate: [''],
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
search_data(data:any){
  console.log(data);
  this.globle_seach = data.search_text;
  this.globle_billerid = data.search_text;

}
toggleSearchForm() {
  this.isSearchFormVisible = !this.isSearchFormVisible;
  $('#did_search').val('');
  $('#biller_name').val('');
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
  
  did_inventory_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.did_inventory_data = response.data;
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
  edit_did_avali_save(){
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
    get_req.billerId =  this.edit_biller_issue_id;
    get_req.remark =  formdata.Remarks;
    get_req.customer_id =  formdata.customer_id.customerId;
    get_req.issueDate =  formdata.issueDate;
    if ($('#Demo').prop('checked')){
      get_req.demo_type =  1;
    }else{
      get_req.demo_type =  0;
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
  did_approval_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_approval_data = response.data;
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
  did_issued_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_issued_data = response.data;
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
  issued_did(data:any){
    $('#issue_did').modal('show');
    this.issued_entity_id = data;
  }
  issued_did_demo(data:any){
    $('#issue_did_demo').modal('show');
    this.issued_entity_demo_id = data;
  }
  issued_nrs_did(data:any){
    $('#issue_did_nrs').modal('show');
    this.issued_entity_nrs_id = data;
  }
  issued_did_save(){
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
          message: response.message,
          position: 'topRight'
        });
        $('#issue_did').modal('hide');
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
  issued_nrs_did_save(){
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
    get_req.issue_nrs_pool_conv_hd_id = this.issued_entity_nrs_id;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: response.message,
          position: 'topRight'
        });
        $('#issue_did_nrs').modal('hide');
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
  issued_demo_did_save(){
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
  did_demo_issued_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_demo_issued_data = response.data;
        this.off_set = response.offset;
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
  did_number_entry_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_number_entry_data = response.data;
        this.off_set = response.offset;
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
  did_issues_history_List(data:any){
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
    get_req.search_text = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val =  list_data.limit;
    get_req.current_page =  1;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.did_issues_history_data = response.data;
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
  edit_available(data:any,billid:any){
    $('#available_did').modal('show');
    this.edit_entity_issue_id = data;
    this.edit_biller_issue_id = billid;
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
    api_postUPd.products = formdata.rows;
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
  resetForm() {
    this.recordForm.reset();
    this.rows.clear();
    this.rows.push(this.createRow());
  }
}
