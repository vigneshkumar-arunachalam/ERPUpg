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

//for error
edit_array_SearchBiller_Checkbox:any;
biller_list:any;
Purchase_Order:any;

  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.PurchaseOrderList({});
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
    api_deliveryOrder.search_txt = this.searchResult_CustomerName;
    api_deliveryOrder.billerID = this.edit_array_SearchBiller_Checkbox;
    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response) {
        this.biller_list = response.biller_details;
        this.Purchase_Order = response.po_details;
       
     
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $('#searchDeliveryOrderFormId').modal("hide");
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
  goAddDeliveryOrder(){
    this.router.navigate(['/addPurchaseOrder'])
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
  getEmailDetails(e:any){

  }
  pdf(purchaseOrderId:any){
    var url="https://laravelapi.erp1.cal4care.com/api/purchaseorder/getPurchaseOrderPdfShow?poId="+purchaseOrderId+ "";
    window.open(url, '_blank');
    console.log("url", url)


  }
  editPurchaseOrder(po_id:any){

    var purchaseOrder_ID=po_id;
    this.router.navigate(['/editPurchaseOrder'])
    this.router.navigate(['/editPurchaseOrder'], {
      queryParams: {
       e_purchaseOrder_Id: purchaseOrder_ID,
      }
    });

  }
}
