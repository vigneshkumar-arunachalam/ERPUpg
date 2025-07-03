import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
declare var tinymce: any;

@Component({
  selector: 'app-stock-inventory-entry',
  templateUrl: './stock-inventory-entry.component.html',
  styleUrls: ['./stock-inventory-entry.component.css']
})
export class StockInventoryEntryComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
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
  pisproduct_stock_id: any;
  searchResult: any;
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  getInvTypeData: any;
  invoicetypeSelected: any;
  invList: any[] = [];
  PIEIssueProdAvForm: any;
  PIEproduct_stock_movement_id: any;
  move_qty: any;
  productName: any;
  DIPDempProdRevForm: FormGroup;
  DIP_product_stock_movement_id: any;
  issue_pool_convertlinkPerm: any;
  demoIssProdlistPerm: any;
  productStockDropdownsList: any;
  PSDBillerList: any
  PSDCurrencyList: any
  PSDProductCategoryList: any
  PSDvendorsList: any
  PSDEditForm: FormGroup;
  PSD_productCategID: any;
  PSDProductNameList: any;
  PSD_product_stock_id: any;
  editPermPEH: any;
  deletePermPEH: any;
  searchPIEMForm: any;
  search1PIEMForm: any;
  getbillerDatas: any;
  //search
  CBV_BillerName_All: any;
  edit_array_SearchBiller_Checkbox: any = [];
  searchBILLERID: any;
  product_tabName: any;
  searchTextValue: any = '';
  issue_pool_convertlink_IPL: any;
  rma_convertlink_IPL: any;
  statusFlag: boolean = false;
  PIEbillerId: any;
  PIEproductId: any;
  constructor(
    private serverService: ServerService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    this.product_tabName = 'available_list';
    // console.log("1", this.product_tabName);
    this.search1PIEMForm = new FormGroup({
      'searchText': new FormControl(null),

    });
    this.statusFlag = false;
    this.invoicetypeSelected = 'Inv';
    this.transferProductList();
    $('#transferProductDetailsID').modal('show');
    this.availableProductList({});
    // this.productApprovalList({});
    // this.issueProductList({});
    // this.demoIssueProduct({});
    // this.rmaReissueProd({});
    // this.prodEntrHis({});
    // this.issueHistory({});
    this.getVendor();
    this.getBiller();
    // this.getInvoiceNumber();
    this.getInvoiceType();
    this.getProductStockDropdowns();
    this.searchBiller();
    this.product_tabName = 'available_list';
    this.ProductInventoryIssueForm = new FormGroup({
      'PIE_IssueDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'PIE_IssueCustomer': new FormControl(null),
      'PIE_NumberType': new FormControl('Inv'),
      'PIE_InvoiceNumber': new FormControl(null),
      'PIE_Demo': new FormControl(false),
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
    this.DIPDempProdRevForm = new FormGroup({
      'DIP_quantity': new FormControl(null),
    });
    this.ProductInventoryTransferForm = new FormGroup({
      'PIT_issueDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'PIT_TransferBiller': new FormControl(null),
      'PIT_Quantity': new FormControl(null),
    });
    this.PIEIssueProdAvForm = new FormGroup({
      'PIEIss_Quantity': new FormControl(null),
    });
    this.PSDEditForm = new FormGroup({
      'PSD_Biller': new FormControl(null),
      'PSD_Vendor': new FormControl(null),
      'PSD_Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'PSD_category': new FormControl(null),
      'PSD_ProdName': new FormControl(null),
      'PSD_qty': new FormControl(null),
      'PSD_Rate': new FormControl(null),
      'PSD_Currency': new FormControl(null)
    });
    this.searchPIEMForm = new FormGroup({
      'PSD_Biller': new FormControl(null),
      'PSD_Biller1': new FormControl(null),
    });
  }
  ProductCategoryChange(event: any) {
    this.PSD_productCategID = event.target.value;
    this.getPSDProductNameList();

  }
  ProductCategoryChange1(id: any) {
    this.PSD_productCategID = id;
    this.getPSDProductNameList();

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    // $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  populateAddressesBasedOnQty(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;

    // Clear any existing addresses (optional, based on use case)
    this.addresses.clear();

    // Loop based on this.move_qty
    for (let i = 0; i < this.move_qty; i++) {
      this.addresses.push(this.createAddress());
    }
  }
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      serial_number: '',
      commands: '',
      approval_status: false,
    });
  }

  handleChange(event: any, name: any) {
    var ev = event;
    this.invoicetypeSelected = name;
    this.getInvoiceNumber();

  }
  selectEventCustomer(item: any) {
    this.statusFlag = true;

    //  console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    this.getInvoiceNumber();
  }
  clearSelection(event: any) {

    this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';

  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      //  console.log("vignesh-customer_status response", response);



      // console.log("vignesh-advanced search result", this.searchResult);
      if (response.customer_names) {
        this.searchResult = response.customer_names;
      }
    });
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  PIE_Add() {

  }
  searchBiller() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/searchBiller";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/searchBiller";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id')
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status === true && response.billerDatas) {
        this.getbillerDatas = response.billerDatas;

        this.spinner.hide();


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }

  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    // console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      if (!this.edit_array_SearchBiller_Checkbox) {
        this.edit_array_SearchBiller_Checkbox = [];
      }


      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_SearchBiller_Checkbox)) {
        this.edit_array_SearchBiller_Checkbox = [];
      }
      // const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data);
      const index = this.edit_array_SearchBiller_Checkbox.indexOf(data);
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  getInvoiceType() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/getInvType";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/getInvType";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id')
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status === true && response.data) {
        this.getInvTypeData = response.data;

        this.spinner.hide();


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }
  searchAll() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/saveBiller";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/saveBiller";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.billerId = this.edit_array_SearchBiller_Checkbox;
    api_postUPd.product_tabName = this.product_tabName;
    api_postUPd.search_txt = $('#search7vc').val();
    this.searchTextValue = $('#search7vc').val();
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#searchPIEMFormId').modal('hide');
           $('#searchPIEMFormId').on('hidden.bs.modal', () => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
      });

        this.product_tabName = response.product_tabName;
        this.search1PIEMForm.controls['searchText'].reset();
        // console.log("searchall-function", this.product_tabName);
        if (this.product_tabName == 'approval_list') {
          this.productApprovalList({});
          this.spinner.hide();

        } else if (this.product_tabName == 'available_list') {
          this.availableProductList({});
          this.spinner.hide();
        } else if (this.product_tabName == 'issue_list') {
          this.issueProductList({});
          this.spinner.hide();
        }
        else if (this.product_tabName == 'demo_issue_list') {
          this.demoIssueProduct({});
          this.spinner.hide();
        } else if (this.product_tabName == 'rma_list') {
          this.rmaReissueProd({});
          this.spinner.hide();
        } else if (this.product_tabName == 'history_list') {
          this.prodEntrHis({});
          this.spinner.hide();
        } else if (this.product_tabName == 'issue_history_list') {
          this.issueHistory({});
          this.spinner.hide();
        }
        else {
          this.availableProductList({});
          this.spinner.hide();
        }

      }

    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

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
    api_postUPd.customerName = this.searchResult_CustomerName;
    api_postUPd.num_type = this.invoicetypeSelected;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      // console.log("response", response)
      if (response.status === true && Array.isArray(response.data)) {
        this.invList = response.data;
        this.spinner.hide();


      } else {
        this.spinner.hide();
        this.invList = [];
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
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
      if (response.status === true && response.billerData) {
        this.billerList = response.billerData;

        this.spinner.hide();


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }
  getProductStockDropdowns() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productStockDropdowns";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productStockDropdowns";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response) {
        this.PSDBillerList = response.billerData;
        this.PSDCurrencyList = response.currency;
        this.PSDProductCategoryList = response.productCategory;
        this.PSDvendorsList = response.vendors;

        this.spinner.hide();


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }
  getPSDProductNameList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productDetails";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_category_id = this.PSD_productCategID;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.PSDProductNameList = response.productDetails;


        this.spinner.hide();


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }

  editHis(product_stock_id: any) {
    $('#PSDEditFormId').modal('show');
    this.PSD_product_stock_id = product_stock_id;

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productStockEdit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productStockEdit";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = product_stock_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.PSD_productCategID = response.product_category_id;
        this.ProductCategoryChange1(response.product_category_id);
        this.spinner.hide();

        setTimeout(() => {
          $('#PSDEditFormId').modal('show');
          this.PSDEditForm.patchValue({
            'PSD_Biller': response.billerId,
            'PSD_Vendor': response.vendorId,
            'PSD_category': response.product_category_id,
            'PSD_ProdName': response.productId,
            'PSD_qty': response.qty,
            'PSD_Rate': response.his_rate,
            'PSD_Currency': response.his_currencyId,
          });
        }, 2000);

      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }

  updateHis() {


    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/productStocUpdate";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/productStocUpdate";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_id = this.PSD_product_stock_id;

    api_postUPd.billerId = this.PSDEditForm.value.PSD_Biller;
    api_postUPd.vendorId = this.PSDEditForm.value.PSD_Vendor;
    api_postUPd.product_category_id = this.PSDEditForm.value.PSD_category;
    api_postUPd.productId = this.PSDEditForm.value.PSD_ProdName;

    api_postUPd.qty = this.PSDEditForm.value.PSD_qty;
    api_postUPd.his_rate = this.PSDEditForm.value.PSD_Rate;
    api_postUPd.his_currencyId = this.PSDEditForm.value.PSD_Currency;
    api_postUPd.entry_dt = this.PSDEditForm.value.PSD_Date;


    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#PSDEditFormId').modal('hide');
        this.prodEntrHis({})
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });

      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }
  deleteHis(product_stock_id: any) {

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
        api_req.moduleType = "product_stock_mgnt";
        api_req.api_url = "product_stock_mgnt/productStockDelete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "product_stock_mgnt/productStockDelete";
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        del_req.product_stock_id = product_stock_id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.prodEntrHis({});

          } else {
            Swal.close();
            iziToast.warning({
              message: "Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            //  console.log("final error", error);
          };
      }
    })
  }
  DIPdemoProduct(product_stock_movement_id: any) {
    this.DIP_product_stock_movement_id = product_stock_movement_id;

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/get_demo_product_reverse";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/get_demo_product_reverse";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_movement_id = product_stock_movement_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#DIPDempProdRevFormId').modal('show');
        this.DIPDempProdRevForm.patchValue({
          'DIP_quantity': response.demo_qty,
        });
      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }
  DIPdemoProductUpdate() {

    //  const reverseQty1 = this.DIPDempProdRevForm.value.DIP_quantity;
    //   console.log("reverseQty",reverseQty1);
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/get_demo_product_reverse";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/get_demo_product_reverse";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_movement_id = this.DIP_product_stock_movement_id;
    const reverseQty = this.DIPDempProdRevForm.value.DIP_quantity;
    //  console.log("reverseQty", reverseQty);
    if (this.DIPDempProdRevForm.value.DIP_quantity) {
      api_postUPd.demo_reverse_qty = this.DIPDempProdRevForm.value.DIP_quantity;
    } else {
      this.spinner.hide();
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
        $('#DIPDempProdRevFormId').modal('hide');
        this.demoIssueProduct({});


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }
  PIERMAReplace(product_stock_movement_id: any, billerId: any, productId: any) {
    this.PIEproduct_stock_movement_id = product_stock_movement_id;
    this.PIEbillerId = billerId;
    this.PIEproductId = productId;
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/get_rma_entry_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/get_rma_entry_details";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_movement_id = product_stock_movement_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.move_qty = response.move_qty;
        this.productName = response.productName;
        this.populateAddressesBasedOnQty();

        this.spinner.hide();
        $('#PIERMAReplaceFormId').modal('show');
        // this.PIEIssueProdAvForm.patchValue({
        //   'PIEIss_Quantity': response.productName,
        // });


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }
  DOPDF(product_stock_movement_id: any) {
    var url = this.serverService.urlFinal + "invoice/getBillpdf?billId=" + product_stock_movement_id + "";

    window.open(url, '_blank');
  }
  invoicePDF(product_stock_movement_id: any) {
    var url = this.serverService.urlFinal + "invoice/getBillpdf?billId=" + product_stock_movement_id + "";

    window.open(url, '_blank');
  }
  PIERMAReplaceUpdate() {

    let api_req: any = new Object();
    let api_saveEnquiry_req: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/rma_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveEnquiry_req.action = "product_stock_mgnt/rma_details_update";
    api_saveEnquiry_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_saveEnquiry_req.product_stock_movement_id = this.PIEproduct_stock_movement_id;
    api_saveEnquiry_req.productId = this.PIEproductId;
    api_saveEnquiry_req.billerId = this.PIEbillerId;


    //section-2
    // var addr1 = this.addPI_section2.value.addresses;


    // for (let i = 0; i < addr.length; i++) {
    //   const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    //   addr[i].serial_number = $('#pd_SerialNumber' + i).val();
    //   addr[i].commands = $('#pd_Comments' + i).val();
    //   addr[i].approval_status = $('#pd_replacement' + i).val();

    // }


    // api_saveEnquiry_req.rma = addr;


    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addr = addressesArray.value; // This will already contain all form values

    for (let i = 0; i < addressesArray.length; i++) {
      const group = addressesArray.at(i) as FormGroup;

      addr[i].serial_number = group.get('serial_number')?.value;
      addr[i].commands = group.get('commands')?.value;
      addr[i].approval_status = group.get('approval_status')?.value;
    }

    api_saveEnquiry_req.rma = addr;
    api_req.element_data = api_saveEnquiry_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status == true) {
        $('#PIERMAReplaceFormId').modal('hide');

        iziToast.success({
          title: 'Updated',
          message: 'RMA Replace Updated Successfully !',
        });
        this.availableProductList({});


      }
      else {

        iziToast.warning({
          message: "RMA Replace Not Updated",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      //  console.log("final error", error);
    }


  }
  PIEIssueProdAv(product_stock_movement_id: any) {
    this.PIEproduct_stock_movement_id = product_stock_movement_id;
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/get_issue_pool_conv";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/get_issue_pool_conv";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_movement_id = product_stock_movement_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {


        this.spinner.hide();
        $('#PIEIssueProdAvFormId').modal('show');
        this.PIEIssueProdAvForm.patchValue({
          'PIEIss_Quantity': response.demo_qty,
        });


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };

  }
  PIEIssueProdAvUpdate() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/issue_pool_conv_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/issue_pool_conv_update";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_stock_movement_id = this.PIEproduct_stock_movement_id;
    var issueQty = this.PIEIssueProdAvForm.value.PIEIss_Quantity;
    if (issueQty) {
      api_postUPd.issue_qty = this.PIEIssueProdAvForm.value.PIEIss_Quantity;
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
        $('#PIEIssueProdAvFormId').modal('hide');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });

        this.issueProductList({});

      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
      };

  }
  ProductInventoryIssue(product_stock_id: any) {
    this.getInvTypeData = '';
    // this.ProductInventoryIssueForm.reset();
    this.getInvoiceType();
    this.pisproduct_stock_id = product_stock_id;
    $('#ProductInventoryIssueFormId').modal('show');


  }
  productIssueCustomerUpdate() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_stock_mgnt";
    api_req.api_url = "product_stock_mgnt/product_issue_customer_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "product_stock_mgnt/product_issue_customer_update";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_hd_id = this.pisproduct_stock_id;
    if (this.searchResult_CustomerID) {
      api_postUPd.customer_id_hd = this.searchResult_CustomerID;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Customer Missing",
        position: 'topRight'
      });
      return false;

    }
    api_postUPd.invoice_number = this.ProductInventoryIssueForm.value.PIE_InvoiceNumber;
    if (this.ProductInventoryIssueForm.value.PIE_Quantity) {
      api_postUPd.quantity = this.ProductInventoryIssueForm.value.PIE_Quantity;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Quantity Missing",
        position: 'topRight'
      });
      return false;
    }
    if (this.invoicetypeSelected) {
      api_postUPd.number_type = this.invoicetypeSelected;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Number Type Missing",
        position: 'topRight'
      });
      return false;
    }
    if (this.ProductInventoryIssueForm.value.PIE_IssueDate) {
      api_postUPd.issueDate = this.ProductInventoryIssueForm.value.PIE_IssueDate;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      return false;
    }
    api_postUPd.demo_type = this.ProductInventoryIssueForm.value.PIE_Demo;

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });

        $('#ProductInventoryIssueFormId').modal('hide');

        this.ProductInventoryIssueForm.controls['PIE_IssueCustomer'].reset();
        this.ProductInventoryIssueForm.controls['PIE_InvoiceNumber'].reset();
        this.ProductInventoryIssueForm.controls['PIE_Demo'].reset();
        this.ProductInventoryIssueForm.controls['PIE_Quantity'].reset();
        this.invList = [];

        // this.ProductInventoryIssueForm.reset();
        this.availableProductList({});


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
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
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
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
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
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
    var billerID = this.ProductInventoryTransferForm.value.PIT_TransferBiller;
    if (billerID) {
      api_postUPd.billerId = this.ProductInventoryTransferForm.value.PIT_TransferBiller;
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "BillerID Missing",
        position: 'topRight'
      });

    }

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

        this.ProductInventoryTransferForm.controls['PIT_TransferBiller'].reset();
        this.ProductInventoryTransferForm.controls['PIT_Quantity'].reset();
        this.availableProductList({});


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
        //  console.log("final error", error);
      };

  }
  ProductQtyReset(product_stock_id: any) {
    this.ProductQtyResetForm.reset();
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
        this.availableProductList({});


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
        // console.log("final error", error);
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
        this.RMAReissueForm.reset();
        $('#RMAReissueFormId').modal('hide');


      } else {
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("final error", error);
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
        // iziToast.warning({
        //   message: "View List Loading Failed. Please try again",
        //   position: 'topRight'
        // });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
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
        this.ProductPriceUpdateForm.reset();
        this.availableProductList({});

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
        //  console.log("final error", error);
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
      if (response.count == 0) {
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
  // transferProductApproval(transaction_approval_id: any) {
  //   this.spinner.show();
  //   let api_req: any = new Object();
  //   let api_deliveryOrder: any = new Object();
  //   api_req.moduleType = "product_stock_mgnt";
  //   api_req.api_url = "product_stock_mgnt/product_stock_approval"
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_deliveryOrder.action = "product_stock_mgnt/product_stock_approval";
  //   api_deliveryOrder.user_id = localStorage.getItem("erp_c4c_user_id");
  //   api_deliveryOrder.transaction_approval_id = transaction_approval_id;
  //   api_req.element_data = api_deliveryOrder;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     this.transferProductList();

  //   });
  // }
  transferProductReject1(transaction_approval_id: any) {
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
  transferProductReject(transaction_approval_id: any) {

    Swal.fire({
      title: 'Are you sure to Reject?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!'
    }).then((result: any) => {
      if (result.value) {

        this.spinner.show();
        Swal.showLoading();
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
          if (response.status == true) {

            Swal.close();
            this.spinner.hide();
            iziToast.success({
              message: "Rejected Successfully",
              position: 'topRight'
            });
            this.transferProductList();
          } else {
            Swal.close();
            this.spinner.hide();
            iziToast.warning({
              message: "Reject Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            //   console.log("final error", error);
          };
      }
    })
  }
  transferProductApproval(transaction_approval_id: any) {

    Swal.fire({
      title: 'Are you sure to Approve?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result: any) => {
      if (result.value) {

        this.spinner.show();
        Swal.showLoading();
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
          if (response.status == true) {
            this.spinner.hide();
            Swal.close();
            iziToast.success({
              message: "Approved Successfully",
              position: 'topRight'
            });
            this.transferProductList();
          } else {
            Swal.close();
            this.spinner.hide();
            iziToast.warning({
              message: "Approve Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            //   console.log("final error", error);
          };
      }
    })
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

    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.count == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        }); this.spinner.hide();

      }

      //  console.log("response", response);
      if (response != '') {
        this.spinner.hide();
        if (response.data) {
          this.availableProdList = response.data;
        } else {
          this.spinner.hide();

        }

        this.product_tabName = response.product_tabName;
        // console.log("available pdt list-fn", this.product_tabName);

        //  this.availableProdList = response.data[0].product_details;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      // console.log("response", response);
      if (response != '') {
        // this.biller_list = response.biller_details;
        this.issueProductListt = response.data;
        this.issue_pool_convertlink_IPL = response.permission_arr.issue_pool_convertlink;
        this.rma_convertlink_IPL = response.permission_arr.rma_convertlink;
        this.product_tabName = response.product_tabName;
        // console.log("issue-pdct-fn", this.product_tabName);




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }
  clear_PII() {
    // this.ProductInventoryIssueForm.reset();
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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
        iziToast.warning({
          message: "Sorry,No Matching Data",
          position: 'topRight'
        });

      }
      //  console.log("response", response);
      if (response != '') {
        if (response.data) {
          this.productApprovallist = response.data;
        }

        this.product_tabName = response.product_tabName;
        // console.log("prod-app-list-fn", this.product_tabName);
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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
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
        this.product_tabName = response.product_tabName;
        //  console.log("demo-iss-prd-fn", this.product_tabName);
        this.issue_pool_convertlinkPerm = response.permission_arr.issue_pool_convertlink;
        this.demoIssProdlistPerm = response.permission_arr.list;




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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
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
        this.product_tabName = response.product_tabName;
        // console.log("rma-reiss-fn", this.product_tabName);




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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
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
        this.product_tabName = response.product_tabName;
        //  console.log("prod entry his-fn", this.product_tabName);
        this.editPermPEH = response.permission_arr.editProductStockLink;
        this.deletePermPEH = response.permission_arr.deleteProductStockLink;



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
    api_deliveryOrder.search_txt = this.searchTextValue;

    api_deliveryOrder.current_page = "";

    api_req.element_data = api_deliveryOrder;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.count == 0) {
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
        this.product_tabName = response.product_tabName;
        // console.log("issue his-fn", this.product_tabName);




        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        // $('#searchDeliveryOrderFormId').modal("hide");


      }
    });
  }

}
