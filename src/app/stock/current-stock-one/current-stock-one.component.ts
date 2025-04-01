import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-current-stock-one',
  templateUrl: './current-stock-one.component.html',
  styleUrls: ['./current-stock-one.component.css'],
})
export class CurrentStockOneComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 100;
  paginationData: any = { info: 'hide' };
  offset_count = 0;

  searchTransactionForm: FormGroup;

  biller_list: any;
  searchText = '';
  userID: any;
  searchBILLERID: any;
  CBV_BillerName_All: any;
  edit_array_SearchBiller_Checkbox: any;
  grandstream_list: any;
  polycom_list: any;
  stockData: any;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchTransactionForm = new FormGroup({
      search_billerName1: new FormControl(null),
      company_Name6: new FormControl(null),
    });
    this.userID = localStorage.getItem('erp_c4c_user_id');
    this.userBillerList();
    this.inventory_list({});
  }

  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type =
      list_data.order_by_type == undefined ? 'desc' : list_data.order_by_type;
    list_data.limit =
      list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  userBillerList() {
    let api_req: any =
      '{"moduleType":"inventory","api_url":"inventory/getbillerList","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"getbillerList","user_id":"39"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        this.biller_list = response.billerList;
      }
    });
  }

  inventory_list(data: any) {
    let search_txt = this.searchTransactionForm.value.company_Name6;
    let search_billerName1 =
      this.searchTransactionForm.value.search_billerName1;

      if(search_billerName1==null){
        search_billerName1=''
      }
      if(search_txt==null){
        search_txt=''
      }

    let api_req: any =
      '{"moduleType":"inventory","api_url":"inventory/nonezerolist","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"inventory/nonezerolist","user_id":"'+this.userID+'","biller_ids":"' +
      search_billerName1 +
      '","search_txt":"' +
      search_txt +
      '"}}';

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        let overallResponseData = response.data;

        this.stockData = overallResponseData.map((category: { product_category_name: any; report_details: any[]; }) => ({
          brand: category.product_category_name,
          color: category.report_details.length > 0 ? category.report_details[0].category_color_1 : '#FFFFFF',
          items: category.report_details.map((product: { productName: any; STK_qty: any; RMA_qty: any; DEMO_qty: any; STK_color: any; RMA_color: any; DEMO_color: any; }) => ({
              name: product.productName,
              stkQty: product.STK_qty,
              rmaQty: product.RMA_qty,
              demoQty: product.DEMO_qty,
              stkColor: product.STK_color,
              rmaColor: product.RMA_color,
              demoColor: product.DEMO_color
          }))
      }));

        // this.paginationData = this.serverService.pagination({
        //   offset: response.off_set,
        //   total: response.total_cnt,
        //   page_limit: this.pageLimit,
        // });

        $('#searchTransactionFormId').modal('hide');
      }
    });
  }

  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    } else {
      const index = this.edit_array_SearchBiller_Checkbox.findIndex(
        (el: any) => el === data
      );
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      // console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)
    }
  }
}
