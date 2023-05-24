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
  selector: 'app-transactionnew',
  templateUrl: './transactionnew.component.html',
  styleUrls: ['./transactionnew.component.css']
})
export class TransactionnewComponent implements OnInit {
  Transaction_list:any;
  TransactionManagementViewForm:FormGroup;
    //pagination
    recordNotFound = false;
    pageLimit = 100;
    paginationData: any = { "info": "hide" };
    offset_count = 0;
  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTransactionNewList({});
    this.TransactionManagementViewForm=new FormGroup({
      'view_billerName':new FormControl(),
      'view_Date':new FormControl(),
      'view_priority':new FormControl(),
      'view_PurchaseEntryNo':new FormControl(),
      'view_VendorName':new FormControl(),
      'view_InvoiceNo':new FormControl(),
      'view_ContentofPurchase':new FormControl(),
      'view_PONumber':new FormControl(),
      'view_Currency':new FormControl(),
      'view_CurrencyConversionRate':new FormControl(),
      'view_TaxAmount':new FormControl(),
      'view_InvoiceAmount':new FormControl(),
      'view_Comments':new FormControl(),
    
    });
  }
  addtransactionGo(){
    this.router.navigate(['/AddTransactionNew'])

  }

  getTransactionNewList(data: any){
    var list_data = this.listDataInfo(data);
    let api_req:any=new Object();
    let TNapi_req:any=new Object();
    api_req.moduleType="transaction_entry";
    api_req.api_url="transaction_entry/transaction_entry_list";
    api_req.api_type="web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    TNapi_req.action="transaction_entry_list";
    TNapi_req.user_id=localStorage.getItem('erp_c4c_user_id');

    TNapi_req.off_set=list_data.offset;;
    TNapi_req.limit_val=list_data.limit;
    TNapi_req.current_page="";

    api_req.element_data = TNapi_req;

    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response!=''){
        this.Transaction_list=response.trans_details;
        console.log(this.Transaction_list);
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });


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

}
