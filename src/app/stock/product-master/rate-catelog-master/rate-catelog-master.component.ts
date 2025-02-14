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
  selector: 'app-rate-catelog-master',
  templateUrl: './rate-catelog-master.component.html',
  styleUrls: ['./rate-catelog-master.component.css']
})
export class RateCatelogMasterComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  //pagination
  recordNotFound = false;
  pageLimit = 20;
  paginationData: any = { "info": "hide" };
  offset_count = 0;


  productCategoryList1: any;
  viewProductCategory: FormGroup;
  editProductCategory: FormGroup;
  addProductMaster: FormGroup;
  searchProductCategory: FormGroup;
  response_total_cnt: any;
  editApprovalStatus: any;
  productCategoryNameList: any;
  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
   }

  ngOnInit(): void {
 
    this.viewProductCategory = new FormGroup({
      'view_Category1': new FormControl(null),
      'view_ProductColor1': new FormControl('#ffffff'),
      'view_ProductFontsize1': new FormControl(null),
      'view_ActColor1': new FormControl('#ffffff'),
      'view_Fontsize1': new FormControl(null),
      'view_ConvColor1': new FormControl('#ffffff'),
      'view_10Color1': new FormControl('#ffffff'),
      'view_20Color1': new FormControl('#ffffff'),
      'view_30Color1': new FormControl('#ffffff'),
      'view_40Color1': new FormControl('#ffffff'),
      'view_50Color1': new FormControl('#ffffff'),

      'view_Category2': new FormControl(null),
      'view_ProductColor2': new FormControl(null),
      'view_ProductFontsize2': new FormControl(null),
      'view_ActColor2': new FormControl(null),
      'view_Fontsize2': new FormControl(null),
      'view_ConvColor2': new FormControl(null),
      'view_10Color2': new FormControl(null),
      'view_20Color2': new FormControl(null),
      'view_30Color2': new FormControl(null),
      'view_40Color2': new FormControl(null),
      'view_50Color2': new FormControl(null),


      'view_Category3': new FormControl(null),
      'view_ProductColor3': new FormControl(null),
      'view_ProductFontsize3': new FormControl(null),
      'view_ActColor3': new FormControl(null),
      'view_Fontsize3': new FormControl(null),
      'view_ConvColor3': new FormControl(null),
      'view_10Color3': new FormControl(null),
      'view_20Color3': new FormControl(null),
      'view_30Color3': new FormControl(null),
      'view_40Color3': new FormControl(null),
      'view_50Color3': new FormControl(null),
    });
    this.editProductCategory = new FormGroup({
      'edit_ProductCategoryCode': new FormControl(null),
      'edit_ProductCategoryName': new FormControl(null),
      'edit_PurchasePrice': new FormControl(null),
    });
    this.addProductMaster = new FormGroup({
      'add_ProductMasterCode': new FormControl(null),
      'add_ProductMasterCatName': new FormControl(null),
      'add_ProductMasterName': new FormControl(null),
      'add_ProductMasterDesc': new FormControl(null),
      'add_ProductMasterAttachment': new FormControl(null),
      'add_ProductMasterSerialNo': new FormControl(null),
    });
    this.searchProductCategory = new FormGroup({
      'search_ProductCategoryName': new FormControl(null),

    });
    this.productCategoryList({});
    this.ProductCategoryNameList();

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

     this.addresses = this.addPI_section2.get('addresses') as FormArray;
     this.addresses.push(this.createAddress());
   }
   createAddress(): FormGroup {
     return this.fb.group({
       // customer_id:'',
       productcategory1: '',
       productcategory2: '',
       productcategory3: '',
       productColor1: '',
       productColor2: '',
       productColor3: '',
       productFontSize1: '',
       productFontSize2: '',
       productFontSize3:'',
       productQtyColor1: '',
       productQtyColor2: '',
       productQtyColor3:'',
       productQtyFontSize1: '',
       productQtyFontSize2: '',
       productQtyFontSize3:'',
     });
   }
  addProdCatGo() {
    this.router.navigate(['/AddRateCatalog']);
  }
  edit(stock_inv_catelog_id: any) {
    console.log("before sending to edit",stock_inv_catelog_id)
    this.router.navigate(['/EditRateCatalog'], {
      queryParams: {
        stock_inv_catelog_id: stock_inv_catelog_id,
        editviewstatus:1
      }
    });

  }
  view(stock_inv_catelog_id: any) {
    console.log("before sending to edit",stock_inv_catelog_id)
    this.router.navigate(['/EditRateCatalog'], {
      queryParams: {
        stock_inv_catelog_id: stock_inv_catelog_id,
        editviewstatus:0
      }
    });

  }
  searchProdCatGo() {
    $('#searchProductCategoryFormId').modal('show');
  }
  ChangeProductCatName(event:any){

  }
  fileAttachmentEvent(event:any){

  }


  productCategoryList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
   
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "inventory_catelog_stock";
    api_req.api_url = "inventory_catelog_stock/inventory_catelog_List";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "inventory_catelog_stock/inventory_catelog_List";
    api_postUPd.off_set = list_data.offset;
    api_postUPd.limit_val = list_data.limit;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.current_page = '';
    api_postUPd.search_text='';
    api_postUPd.search_text = this.searchProductCategory.value.search_ProductCategoryName;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == 'success') {

        this.spinner.hide();
        this.response_total_cnt=response.count
        this.productCategoryList1 = response.data;
        $('#searchProductCategoryFormId').modal('hide');
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
    api_postUPd.product_category_code = this.addProductMaster.value.add_ProductCategoryCode;
    api_postUPd.product_category_name = this.addProductMaster.value.add_ProductCategoryName;
    api_postUPd.purchase_rate_per = this.addProductMaster.value.add_PurchasePrice;
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
  delete(stock_inv_catelog_id: any) {

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
          api_req.moduleType = "product_current_stock";
          api_req.api_url = "inventory_catelog_stock/delete";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_singleDelete.action = "inventory_catelog_stock/delete";
          api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');

          api_singleDelete.stock_inv_catelog_id = stock_inv_catelog_id;
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
    ProductCategoryNameList() {
     
      let api_req: any = new Object();
      let api_postUPd: any = new Object();
      api_req.moduleType = "product_category";
      api_req.api_url = "product_master/getProductCategory";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_postUPd.action = "getProductCategory";
      api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
      api_req.element_data = api_postUPd;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        this.spinner.hide();
        if (response.status == true) {
  
          this.spinner.hide();
          this.productCategoryNameList=response.product_category;
  
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
}
