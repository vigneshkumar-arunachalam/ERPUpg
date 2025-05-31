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
  productSerialNoVal: boolean=false;

  // file attachment
  myFiles: string[] = [];
  getProductCode: any;
  imageShow: any;
  approval_status: any;
  viewEditStatus: any;
  productMasterApprovalForm: FormGroup;
  checked = true;
  Approval_Type_radiobox_Value: any = 'single';
   //approval
   approval_Show_hide: boolean = true;
   textarea_Show_hide: boolean;
   textarea1_Show_hide: boolean;
   approval_comments: any;
   approvalUserID_Radio: any;
   quotationApprovedBy: any;
  prodMasterApprovalResult: any;
  prodMasterApprovalEditID: any;
  editproductId: any;

  constructor(private serverService: ServerService, 
    private http: HttpClient,private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  
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
    this.productMasterApprovalForm = new FormGroup({
      'cm_chk': new FormControl(null),
      'cd_chk': new FormControl(null),
      'radio_approvalPermission': new FormControl(null),
      'approval_comments': new FormControl(null),
      'comments_approvedBy': new FormControl(null),
    
    });
    this.productCategoryList({});
    this.ProductCategoryNameList();
    this.http.get<any>(this.serverService.urlFinal +'product_master/getProductCode').subscribe((data: any) => {
    
        this.getProductCode = data.pcode;
      

       console.log("this.getProductCode", this.getProductCode)
    });


  }
  addProdCatGo() {
    this.addProductMaster.controls['add_ProductMasterCatName'].reset();
    this.addProductMaster.controls['add_ProductMasterName'].reset();
    this.addProductMaster.controls['add_ProductMasterDesc'].reset();
    this.addProductMaster.controls['add_ProductMasterAttachment'].reset();
    this.addProductMaster.controls['add_ProductMasterSerialNo'].reset();
  
    $('#addProductCategoryFormId').modal('show');
  }
  searchProdCatGo() {
    $('#searchProductCategoryFormId').modal('show');
  }
  ChangeProductCatName(event:any){
    this.productCatID=event.target.value;
    console.log("this.productCatID",this.productCatID);

  }
  handleChange(evt: any, userId: any) {

    this.approvalUserID_Radio = userId;
    var xyz = evt.target.id;
    this.quotationApprovedBy = this.approvalUserID_Radio;
   // console.log(xyz, "target");
    if (xyz == "0") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = true;
      this.textarea1_Show_hide = false;
    }
    else if (xyz == "1") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "2") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "3") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "4") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "5") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "6") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "7") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "8") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "9") {
      // console.log(xyz);
      // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
  }
  productSerialNo(event:any){
    this.productSerialNoVal=event.target.checked;
    console.log(" this.productSerialNoVal", this.productSerialNoVal);
  }
  checkbox_CM_ProdMgtPermission:any;
  checkbox_CD_ProdMgtPermission:any;
  eventCheck_CM_QuotPermission(event: any) {
    this.checkbox_CM_ProdMgtPermission = event.target.checked;
   // console.log(this.checkbox_CM_QuotPermission)
  }
  eventCheck_CD_QuotPermission(event: any) {
    this.checkbox_CD_ProdMgtPermission = event.target.checked;
   // console.log(this.checkbox_CM_QuotPermission)
  }
  fileAttachmentEvent(event:any){

  }
  onFileChange(event: any) {
    this.myFiles=[];
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  handle_radioChange(event: any) {
    this.Approval_Type_radiobox_Value = event.target.id;
    // console.log(this.Approval_Type_radiobox_Value);

    if (this.Approval_Type_radiobox_Value == "single") {
      this.approval_Show_hide = true;

    }
    else if (this.Approval_Type_radiobox_Value == "double") {
     // console.log(this.Approval_Type_radiobox_Value);
      this.approval_Show_hide = false;

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
    api_postUPd.search_text=this.searchProductCategory.value.search_ProductCategoryName;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.response_total_cnt=response.count
        this.productCategoryList1 = response.data;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      $('#searchProductCategoryFormId').modal('hide');
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
  prodMasterApprovalEdit(id: any,approval_status:any) {
 
    this.prodMasterApprovalEditID=id;
    //this.quotationApproval_ID = id;
    let api_req: any = new Object();
    let quot_approval_req: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_category/getUserS";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_approval_req.action = "product_category/getUserS";
    
    quot_approval_req.user_id = localStorage.getItem('erp_c4c_user_id');
    quot_approval_req.approval_status=approval_status;
    api_req.element_data = quot_approval_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    //  console.log("response status", response.status);
      if (response.status == true) {
        $("#prodMasterApprovalId").modal("show");
        this.prodMasterApprovalResult = response.data;

        // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)

      }
      else {
        $("#prodMasterApprovalId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
    //  console.log("final error", error);
    }

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
  edit(productId: any,value:any,approval_status:any,productCategoryId:any) {
    this.editproductId=productId;
    this.viewEditStatus=value;
    this.productCatID=productCategoryId;
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
    api_postUPd.approval_status=approval_status;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.imageShow=response.product_img;
        this.approval_status=response.approval_status;

        this.myFiles=[];
     
        this.spinner.hide();
       console.log('serial_no_state:', response.serial_no_state, typeof response.serial_no_state);
        
        
        this.editProductCategory.patchValue({
          'edit_ProductMasterCode': response.productCode,
          'edit_ProductMasterCatName': response.product_category_id,
          'edit_ProductMasterName': response.productName,
          'edit_ProductMasterSerialNo': response.serial_no_states,
          'edit_ProductMasterDesc': response.productDesc,
          // 'edit_ProductMasterAttachment': response.product_img,
         
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
  update() {
    
        const data = new FormData();
        data.append("product_img[]", this.myFiles[0]);
        data.append('edit_ProductMasterCode', this.editProductCategory.value.edit_ProductMasterCode);

        data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
        data.append('productCode',  this.getProductCode);
        data.append('productId',  this.editproductId);
        data.append('product_category_id', this.productCatID);
       
        if (this.editProductCategory.value.edit_ProductMasterDesc == null || this.editProductCategory.value.edit_ProductMasterDesc == '') {
          iziToast.error({
            message: "Product Description Missing",
            position: 'topRight'
          });
          this.spinner.hide();
          return false;
        } else {
          data.append('productDesc', this.editProductCategory.value.edit_ProductMasterDesc);
        }
        data.append('quantity', '0');
        data.append('unit', '0');
        data.append('rate', '0');
        data.append('approval_status', this.approval_status);
         data.append('serial_no_state', String(this.productSerialNoVal));

         if (this.editProductCategory.value.edit_ProductMasterName == null || this.editProductCategory.value.edit_ProductMasterName == '') {
          iziToast.error({
            message: "Product Name Missing",
            position: 'topRight'
          });
          this.spinner.hide();
          return false;
        } else {
          data.append('productName', this.editProductCategory.value.edit_ProductMasterName);
        }
       
        data.append('action', "updateProductDetails");
  
  
        var self = this;
        $.ajax({
          type: 'POST',
          url: this.serverService.urlFinal +'product_master/updateProductDetails',
          cache: false,
          contentType: false,
          processData: false,
          data: data,
          success: function (result: any) {
            if (result.status == true) {
              self.productCategoryList({});
            //  console.log(result);
              Swal.close();
              $("#editProductCategoryFormId").modal("hide");
              this.edit_array = [];
  
              iziToast.success({
                message: "Updated successfully",
                position: 'topRight'
              });
            }
            else {
              Swal.close();
              $("#editProductCategoryFormId").modal("hide");
  
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
     api_postUPd.search_text = this.searchProductCategory.value.search_ProductCategoryName;
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
  update44() {
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
    api_postUPd.status =  this.approval_status;
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
  delete(productId: any,approval_status:any) {

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
          api_singleDelete.approval_status = approval_status;
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
        // Swal.fire('File Updating');
        // Swal.showLoading();
    
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
          if (this.getProductCode == null || this.getProductCode == '') {
            iziToast.error({
              message: "Product Code Missing",
              position: 'topRight'
            });
            this.spinner.hide();
            return false;
          } else {
            data.append('productCode',  this.getProductCode);
          }

          if (this.productCatID == null || this.productCatID == '') {
            iziToast.error({
              message: "Product Category Missing",
              position: 'topRight'
            });
            this.spinner.hide();
            return false;
          } else {
            data.append('product_category_id', this.productCatID);
          }

          if (this.addProductMaster.value.add_ProductMasterDesc == null || this.addProductMaster.value.add_ProductMasterDesc == '') {
            iziToast.error({
              message: "Product Description Missing",
              position: 'topRight'
            });
            this.spinner.hide();
            return false;
          } else {
            data.append('productDesc', this.addProductMaster.value.add_ProductMasterDesc);
          }

         
         
          data.append('quantity', "");
          data.append('unit', "");
          data.append('rate', "");
           data.append('serial_no_state', String(this.productSerialNoVal));
           data.append('rate', "");
           if (this.addProductMaster.value.add_ProductMasterName == null || this.addProductMaster.value.add_ProductMasterName == '') {
            iziToast.error({
              message: "Product Name Missing",
              position: 'topRight'
            });
            this.spinner.hide();
            return false;
          } else {
            data.append('productName', this.addProductMaster.value.add_ProductMasterName);
          }
          
          data.append('action', "insertProductDetails");
    
    
          var self = this;
          $.ajax({
            type: 'POST',
            url:this.serverService.urlFinal + 'product_master/insertProductDetails',
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

     

        prodMgmtApprovalUpdate() {

          if (this.quotationApprovedBy == undefined || this.quotationApprovedBy == 'undefined' || this.quotationApprovedBy == '') {
            this.quotationApprovedBy = '';
          }
          this.spinner.show();
          let api_req: any = new Object();
          let quot_approvalUpdate_req: any = new Object();
          api_req.moduleType = "product_master";
          api_req.api_url = "product_master/sendProductCategoryApproval";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          quot_approvalUpdate_req.action = "product_master/sendProductCategoryApproval";
          quot_approvalUpdate_req.user_id = localStorage.getItem('erp_c4c_user_id');
          quot_approvalUpdate_req.product_category_hd_id = this.prodMasterApprovalEditID;
         
          quot_approvalUpdate_req.approval_type = this.Approval_Type_radiobox_Value;
          quot_approvalUpdate_req.quotation_comments = this.productMasterApprovalForm.value.comments_approvedBy;
          quot_approvalUpdate_req.approval_by_name = this.quotationApprovedBy;
          quot_approvalUpdate_req.email_to = "rm@corp.cal4care.com";
         // console.log("this.quotationApprovedBy", this.quotationApprovedBy);
          if (this.Approval_Type_radiobox_Value == "double" && this.quotationApprovedBy == '') {
      
            iziToast.warning({
              message: "Select Approval By for Double Approval",
              position: 'topRight'
            });
            return false;
      
          }
          quot_approvalUpdate_req.assigned_comments = this.productMasterApprovalForm.value.approval_comments;
      
          api_req.element_data = quot_approvalUpdate_req;
      
          $("#prodMasterApprovalId").attr("disabled", true);
          this.serverService.sendServer(api_req).subscribe((response: any) => {
            this.spinner.hide();
            $("#prodMasterApprovalId").removeAttr("disabled");
          //  console.log("response status", response.status);
            if (response.status == true) {
      
              iziToast.success({
                message: "Sent for Approval",
                position: 'topRight'
              });
              $("#prodMasterApprovalId").modal("hide");
              this.productCategoryList({});
      
            }
            else {
              $("#prodMasterApprovalId").modal("hide");
              iziToast.error({
                message: "Data Not Found",
                position: 'topRight'
              });
      
            }
          }), (error: any) => {
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          }
      
      
        }
  
}
