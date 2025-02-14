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
  selector: 'app-stock-inventory-entry',
  templateUrl: './stock-inventory-entry.component.html',
  styleUrls: ['./stock-inventory-entry.component.css']
})
export class StockInventoryEntryComponent implements OnInit {
//pagination
recordNotFound = false;
pageLimit = 10;
paginationData: any = { "info": "hide" };
offset_count = 0;
//list
availableProdList:any;
  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.availableProductList({});
  }
  availableProductList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/available_product_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/available_product_list";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if(response.total_cnt==0){
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      console.log("response",response);
      if (response!='') {
        // this.biller_list = response.biller_details;
        this.availableProdList=response.data[0].product_details;
        
    


        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");
    

      }
    });
  }

  listDataInfo(list_data: any) {

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

}
