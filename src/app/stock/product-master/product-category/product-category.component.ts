import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  //pagination
  recordNotFound = false;
  pageLimit = 20;
  paginationData: any = { "info": "hide" };
  offset_count = 0;


  productCategoryList1: any;
  viewProductCategory: FormGroup;
  editProductCategory: FormGroup;
  addProductCategory: FormGroup;
  searchProductCategory: FormGroup;
  response_total_cnt: any;
  editApprovalStatus: any;
  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.productCategoryList({});
    this.viewProductCategory = new FormGroup({
      'view_ProductCategoryCode': new FormControl(null),
      'view_ProductCategoryName': new FormControl(null),
    });
    this.editProductCategory = new FormGroup({
      'edit_ProductCategoryCode': new FormControl(null),
      'edit_ProductCategoryName': new FormControl(null),
      'edit_PurchasePrice': new FormControl(null),
    });
    this.addProductCategory = new FormGroup({
      'add_ProductCategoryCode': new FormControl(null),
      'add_ProductCategoryName': new FormControl(null),
      'add_PurchasePrice': new FormControl(null),
    });
    this.searchProductCategory = new FormGroup({
      'search_ProductCategoryName': new FormControl(null),
    });

  }
  addProdCatGo() {
   
    this.getProductCategoryCode();
  
  }
  searchProdCatGo() {
    $('#searchProductCategoryFormId').modal('show');
  }


  productCategoryList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_category_management";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_category_management";
    api_postUPd.off_set = list_data.offset;
    api_postUPd.limit_val = list_data.limit;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.current_page = '';
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.response_total_cnt=response.count
        this.productCategoryList1 = response.data;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      } else {
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
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
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  getProductCategoryCode() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_master/getProductCategoryCode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getProductCategoryCode";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#addProductCategoryFormId').modal('show');
        this.spinner.hide();
        this.addProductCategory.patchValue({
          'add_ProductCategoryCode': response.product_category_code,
          
        });

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
  view(productId: any) {
    this.spinner.show();
    $('#viewProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_master";
    api_req.api_url = "product_master/viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_master/viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.productId = productId;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.viewProductCategory.patchValue({
          'view_ProductCategoryCode': response.data.productCode,
          'view_ProductCategoryName': response.data.productName,
        });

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
  edit(product_category_id: any) {
    this.spinner.show();
    $('#editProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_category_id = product_category_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.editApprovalStatus=response.data.status;
        this.editProductCategory.patchValue({
          'edit_ProductCategoryCode': response.data.product_category_code,
          'edit_ProductCategoryName': response.data.product_category_name,
          'edit_PurchasePrice': response.data.purchase_rate_per,
        });

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
  Add() {
    this.spinner.show();
    $('#addProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "insertProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "insertProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.addProductCategory.value.add_ProductCategoryCode == null || this.addProductCategory.value.add_ProductCategoryCode == '') {
      iziToast.error({
        message: "Category Code Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.product_category_code = this.addProductCategory.value.add_ProductCategoryCode;
    }

    if (this.addProductCategory.value.add_ProductCategoryName == null || this.addProductCategory.value.add_ProductCategoryName == '') {
      iziToast.error({
        message: "Category Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.product_category_name = this.addProductCategory.value.add_ProductCategoryName;
    }
   

    if (this.addProductCategory.value.add_PurchasePrice == null || this.addProductCategory.value.add_PurchasePrice == '') {
      iziToast.error({
        message: "Purchase Price Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.purchase_rate_per = this.addProductCategory.value.add_PurchasePrice;
    }
   
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#addProductCategoryFormId').modal('hide');

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
  search() {
    this.spinner.show();
    $('#searchProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_postUPd.product_category_id = product_category_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#searchProductCategoryFormId').modal('hide');

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
  update() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "updateProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "updateProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_postUPd.product_category_id = product_category_id;
    api_postUPd.product_category_code = this.editProductCategory.value.edit_ProductCategoryCode;
    api_postUPd.product_category_name = this.editProductCategory.value.edit_ProductCategoryName;
    api_postUPd.purchase_rate_per = this.editProductCategory.value.edit_PurchasePrice;
    api_postUPd.product_category_id = this.editProductCategory.value.edit_ProductCategoryCode;
    api_postUPd.status =   this.editApprovalStatus;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#editProductCategoryFormId').modal('hide');
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

  }
  delete(product_category_id: any) {

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
          let api_singleDelete: any = new Object();
          api_req.moduleType = "product_category";
          api_req.api_url = "deleteProductDetails";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_singleDelete.action = "deleteProductDetails";
          api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');

          api_singleDelete.product_category_id = product_category_id;
          api_req.element_data = api_singleDelete;

          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == "true") {
            
              // console.log("array content after delete", this.edit_array)
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
            } else {
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
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


  


}
