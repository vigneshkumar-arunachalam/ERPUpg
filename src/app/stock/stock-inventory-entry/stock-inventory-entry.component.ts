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
  pageLimit = 15;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //list
  availableProdList: any;
  issueProductListt: any;
  productApprovallist: any;
  demoIssProdlist: any;
  rmaReissuedProductList: any;
  prodEntrHisList: any;
  issueHistoryList: any;
  transferProdList: any;
  ProductInventoryIssueForm: FormGroup;
  ProductPriceUpdateForm: FormGroup;
  PPU_product_stock_id: any;
  //read only fields
  isReadonly: boolean = true;
  RMAReissueForm: FormGroup;
  vendorLList: any;
  rmaproduct_stock_id: any;
  ProductQtyResetForm: FormGroup;
  pqrproduct_stock_id: any;
  ProductInventoryTransferForm: FormGroup;
  petproduct_stock_id: any;
  billerList: any;
  constructor(private serverService: ServerService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.transferProductList();
    $('#transferProductDetailsID').modal('show');
    this.availableProductList({});
    this.productApprovalList({});
    this.issueProductList({});
    this.demoIssueProduct({});
    this.rmaReissueProd({});
    this.prodEntrHis({});
    this.issueHistory({});
    this.getVendor();
    this.getBiller();
    this.ProductInventoryIssueForm = new FormGroup({
      'PIE_IssueDate': new FormControl(null),
      'PIE_IssueCustomer': new FormControl(null),
      'PIE_NumberType': new FormControl(null),
      'PIE_InvoiceNumber': new FormControl(null),
      'PIE_Demo': new FormControl(null),
      'PIE_Quantity': new FormControl(null),
    });
    this.ProductPriceUpdateForm = new FormGroup({
      'PPU_ProductName': new FormControl(null),
      'PPU_Category': new FormControl(null),
      'PPU_SalesPrice': new FormControl(null),
      'PPU_EntryPrice': new FormControl(null),

    });
    this.RMAReissueForm = new FormGroup({
      'RMA_VendorName': new FormControl(null),
      'RMA_Quantity': new FormControl(null),
    });
    this.ProductQtyResetForm = new FormGroup({
      'PQR_Quantity': new FormControl(null),
    });
    this.ProductInventoryTransferForm = new FormGroup({
      'PIT_issueDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'PIT_TransferBiller': new FormControl(null),
      'PIT_Quantity': new FormControl(null),
    });
  }
  PIE_Add() {

  }
  getInvoiceNumber() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/getInvoiceNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/getInvoiceNumber";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.customerName = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.num_type = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

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
  getBiller() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/getBiller";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/getBiller";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.billerList = response.billerData;

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
  productInventoryTransfer() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productInventoryTransfer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productInventoryTransfer";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_hd_id = '';
    api_postUPd.issueDate = '';
    api_postUPd.billerId = '';
    api_postUPd.quantity = '';
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

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
  productQtyReset() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productQtyReset";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productQtyReset";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = '';
    api_postUPd.quantity = '';
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

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
  getVendor() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/getVendor";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/getVendor";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.vendorLList = response.billerData;


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
  ProductEntryTransfer(product_stock_id: any) {
    this.petproduct_stock_id = product_stock_id;
    $('#ProductInventoryTransferFormId').modal('show');

  }
  ProductEntryTransferUpdate() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productInventoryTransfer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productInventoryTransfer";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');


    var pqrQuant = this.ProductInventoryTransferForm.value.PIT_Quantity;
    if (pqrQuant) {
      api_postUPd.quantity = this.ProductInventoryTransferForm.value.PIT_Quantity;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Quantity Missing",
        position: 'topRight'
      });

    }
    api_postUPd.issueDate = this.ProductInventoryTransferForm.value.PIT_issueDate;
    api_postUPd.billerId = this.ProductInventoryTransferForm.value.PIT_TransferBiller;
    api_postUPd.product_hd_id = this.petproduct_stock_id;


    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        $('#ProductInventoryTransferFormId').modal('hide');


      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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
  ProductQtyReset(product_stock_id: any) {
    this.pqrproduct_stock_id = product_stock_id;
    $('#ProductQtyResetFormId').modal('show');

  }
  ProductQtyResetUpdate() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productQtyReset";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productQtyReset";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = this.pqrproduct_stock_id;

    var pqrQuant = this.ProductQtyResetForm.value.PQR_Quantity;
    if (pqrQuant) {
      api_postUPd.quantity = this.ProductQtyResetForm.value.PQR_Quantity;
    } else {
      iziToast.error({
        message: "Quantity Missing",
        position: 'topRight'
      });

    }


    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        $('#ProductQtyResetFormId').modal('hide');


      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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
  rmaIssueEdit(product_stock_id: any) {
    this.rmaproduct_stock_id = product_stock_id;

  }
  RMAReissue() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/RMAReissue";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/RMAReissue";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = this.rmaproduct_stock_id;
    var VendorName = this.RMAReissueForm.value.RMA_VendorName;
    if (VendorName) {
      api_postUPd.vendorId = this.RMAReissueForm.value.RMA_VendorName;
    } else {
      iziToast.error({
        message: "Venor ID Missing",
        position: 'topRight'
      });

    }
    var RMAQuant = this.RMAReissueForm.value.RMA_Quantity;
    if (RMAQuant) {
      api_postUPd.quantity = this.RMAReissueForm.value.RMA_Quantity;
    } else {
      iziToast.error({
        message: "Quantity Missing",
        position: 'topRight'
      });

    }


    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        $('#RMAReissueFormId').modal('hide');


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
  getProductNamePrice(product_stock_id: any) {
    this.PPU_product_stock_id = product_stock_id;

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/getProductNamePrice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/getProductNamePrice";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = product_stock_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#ProductPriceUpdateFormId').modal('show');
        this.ProductPriceUpdateForm.patchValue({
          'PPU_ProductName': response.productName,
          'PPU_Category': response.purchase_rate_per,
          'PPU_SalesPrice': response.sales_rate,

        });
        // this.ProductPriceUpdateForm.get('PPU_ProductName')?.disable();
        //   this.ProductPriceUpdateForm.get('PPU_Category')?.disable();
        //     this.ProductPriceUpdateForm.get('PPU_SalesPrice')?.disable();


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
  productPriceUpdate() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productPriceUpdate";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productPriceUpdate";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = this.PPU_product_stock_id;
    var PPU_EntryPrice = this.ProductPriceUpdateForm.value.PPU_EntryPrice;
    if (PPU_EntryPrice) {
      api_postUPd.product_price = this.ProductPriceUpdateForm.value.PPU_EntryPrice;
    } else {
      iziToast.error({
        message: "Give Entry Price",
        position: 'topRight'
      });

    }

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#ProductPriceUpdateFormId').modal('hide');
        this.spinner.hide();
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.availableProductList({});

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
  productIssueCustomerUpdate() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/product_issue_customer_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/product_issue_customer_update";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_hd_id = '';
    api_postUPd.customer_id_hd = '';

    api_postUPd.invoice_number = '';
    api_postUPd.quantity = '';
    api_postUPd.number_type = '';
    api_postUPd.issueDate = '';
    api_postUPd.demo_type = '';

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

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
  transferProductList() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/transfer_product_details"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/transfer_product_details";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        this.transferProdList = response.data;

      }
    });
  }
  transferProductApproval(transaction_approval_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/product_stock_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/product_stock_approval";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.transaction_approval_id = transaction_approval_id;
    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      this.transferProductList();

    });
  }
  transferProductReject(transaction_approval_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/product_stock_reject"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/product_stock_reject";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.transaction_approval_id = transaction_approval_id;
    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      this.transferProductList();

    });
  }
  transferProductDelete(transaction_approval_id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/product_stock_approval"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/product_stock_approval";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.transaction_approval_id = transaction_approval_id;
    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        this.transferProdList = response.data;

      }
    });
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
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }

      //  console.log("response", response);
      if (response != '') {
        this.availableProdList = response.data[0].product_details;
        //  this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      }
    });
  }

  listDataInfo(list_data: any) {

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  issueProductList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/issueProductList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/issueProductList";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      // console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        this.issueProductListt = response.data;




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }
  productApprovalList(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productApprovalList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/productApprovalList";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        this.productApprovallist = response.data;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      }
    });
  }
  demoIssueProduct(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/demoIssuedList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/demoIssuedList";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        //  this.availableProdList=response.data[0].product_details;
        this.demoIssProdlist = response.data;




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }
  rmaReissueProd(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/rmaReissuedProducts"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/rmaReissuedProducts";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //   console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        //  this.availableProdList=response.data[0].product_details;
        this.rmaReissuedProductList = response.data;




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }
  prodEntrHis(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productEntryHistory"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/productEntryHistory";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        //  this.availableProdList=response.data[0].product_details;
        this.prodEntrHisList = response.data;




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }
  issueHistory(data: any) {


    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_deliveryOrder: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/issueHistory"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_deliveryOrder.action = "product_stock_mgnt/issueHistory";
    api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
    api_deliveryOrder.off_set = list_data.offset;
    api_deliveryOrder.limit_val = list_data.limit;
    api_deliveryOrder.search_txt = "";

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.total_cnt == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        //  this.availableProdList=response.data[0].product_details;
        this.issueHistoryList = response.data;




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }

}
