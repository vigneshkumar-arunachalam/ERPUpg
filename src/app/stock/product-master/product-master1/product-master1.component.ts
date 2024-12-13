import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;
@Component({
  selector: 'app-product-master1',
  templateUrl: './product-master1.component.html',
  styleUrls: ['./product-master1.component.css']
})
export class ProductMaster1Component implements OnInit {

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
  productCatID: any;
  productSerialNoVal: any;

  // file attachment
  myFiles: string[] = [];
  getProductCode: any;
  imageShow: any;

  constructor(private serverService: ServerService, 
    private http: HttpClient,private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.productCategoryList({});
    this.ProductCategoryNameList();
    this.viewProductCategory = new FormGroup({
      'view_ProductCategoryCode': new FormControl(null),
      'view_ProductCategoryName': new FormControl(null),
    });
    this.editProductCategory = new FormGroup({
      'edit_ProductMasterCode': new FormControl(null),
      'edit_ProductMasterCatName': new FormControl(null),
      'edit_ProductMasterName': new FormControl(null),
      'edit_ProductMasterDesc': new FormControl(null),
      'edit_ProductMasterAttachment': new FormControl(null),
      'edit_ProductMasterSerialNo': new FormControl(null),
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
    this.http.get<any>('https://laravelapi.erp1.cal4care.com/api/product_master/getProductCode').subscribe((data: any) => {
    
        this.getProductCode = data.pcode;
      

       console.log("this.getProductCode", this.getProductCode)
    });


  }
  addProdCatGo() {
    $('#addProductCategoryFormId').modal('show');
  }
  searchProdCatGo() {
   // $('#searchProductCategoryFormId').modal('show');
  }
  ChangeProductCatName(event:any){
    this.productCatID=event.target.value;
    console.log("this.productCatID",this.productCatID);

  }
  productSerialNo(event:any){
    this.productSerialNoVal=event.target.checked;
    console.log(" this.productSerialNoVal", this.productSerialNoVal);
  }
  fileAttachmentEvent(event:any){

  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  productCategoryList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_master";
    api_req.api_url = "product_master/product_master_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_master/product_master_list";
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
  view(product_category_id: any) {
    this.spinner.show();
    $('#viewProductCategoryFormId').modal('show');
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
        this.viewProductCategory.patchValue({
          'view_ProductCategoryCode': response.data.product_category_code,
          'view_ProductCategoryName': response.data.product_category_name,
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
  edit(productId: any) {
    this.spinner.show();
    $('#editProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_master";
    api_req.api_url = "product_master/editProduct";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "editProduct";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_id = productId;
    api_postUPd.temp = productId;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.imageShow=response.product_img;

        this.spinner.hide();
       
        
        this.editProductCategory.patchValue({
          'edit_ProductMasterCode': response.productCode,
          'edit_ProductMasterCatName': response.product_category_id,
          'edit_ProductMasterName': response.productName,

          'edit_ProductMasterDesc': response.productDesc,
          'edit_ProductMasterAttachment': response.product_img,
          'edit_ProductMasterSerialNo': response.serial_no_state,
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
  Add1() {
    this.spinner.show();
    $('#addProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "insertProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "insertProductDetails";
    // 'add_ProductMasterCode': new FormControl(null),
    // 'add_ProductMasterCatName': new FormControl(null),
    // 'add_ProductMasterName': new FormControl(null),
    // 'add_ProductMasterDesc': new FormControl(null),
    // 'add_ProductMasterAttachment': new FormControl(null),
    // 'add_ProductMasterSerialNo': new FormControl(null),
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.productCode = this.addProductMaster.value.add_ProductMasterCode;
    api_postUPd.product_category_id =  this.productCatID;
    api_postUPd.productDesc = this.addProductMaster.value.add_ProductMasterDesc;
    api_postUPd.quantity = "";
    api_postUPd.unit = "";
    api_postUPd.rate = "";
    api_postUPd.serial_no_state = this.productSerialNoVal;
    api_postUPd.productName = this.addProductMaster.value.add_ProductMasterName;
    api_postUPd.product_img = this.addProductMaster.value.add_ProductMasterAttachment;
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
  delete(productId: any) {

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

          api_singleDelete.productId = productId;
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

    Add() {
    
      //  this.addProductMaster.reset();
        //  var data = new FormData();
        Swal.fire('File Updating');
        Swal.showLoading();
    
        if (this.myFiles.length == 0) {
          Swal.close();
          iziToast.warning({
            message: "Attachment File Missing",
            position: 'topRight'
          });
        }
    
        if (this.myFiles.length > 0) {
    
          const data = new FormData();
    
          for (var i = 0; i < this.myFiles.length; i++) {
            data.append("product_img[]", this.myFiles[i]);
          }
          // for (var j = 0; j < this.edit_array.length; j++) {
          //   data.append("quotation_pdf_add[]", this.edit_array[j]);
          // }
    
          data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
          data.append('productCode',  this.getProductCode);
          data.append('product_category_id', this.productCatID);
          data.append('productDesc', this.addProductMaster.value.add_ProductMasterDesc);
          data.append('quantity', "");
          data.append('unit', "");
          data.append('rate', "");
           data.append('serial_no_state', this.productSerialNoVal);
           data.append('rate', "");
           data.append('productName', this.addProductMaster.value.add_ProductMasterName);
          data.append('action', "insertProductDetails");
    
    
          var self = this;
          $.ajax({
            type: 'POST',
            url: 'https://laravelapi.erp1.cal4care.com/api/product_master/insertProductDetails',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (result: any) {
              if (result.status == true) {
                self.productCategoryList({});
              //  console.log(result);
                Swal.close();
                $("#addProductCategoryFormId").modal("hide");
                this.edit_array = [];
    
                iziToast.success({
                  message: "File Attachment Saved successfully",
                  position: 'topRight'
                });
              }
              else {
                Swal.close();
                $("#addProductCategoryFormId").modal("hide");
    
                iziToast.warning({
                  message: "File Attachment Update Failed",
                  position: 'topRight'
                });
              }
            },
            error: function (err: any) {
    
              console.log("err", err)
              iziToast.error({
                message: "Server Side Error",
                position: 'topRight'
              });
              Swal.close();
              $("#addProductCategoryFormId").modal("hide");
            }
    
          })
    
    
        }
      }
}
