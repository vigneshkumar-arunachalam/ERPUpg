import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.css']
})
export class EditPurchaseOrderComponent implements OnInit {
  public addDo_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  edit_purchaseOrderID: any;
  billerChangeID: any;
  purchaseorder_tinName: any;
  purchaseorder_tinNo: any;
  purchaseorder_cstName: any;
  purchaseorder_cstNo: any;
  companyNameList: any;

  
  isReadonly: boolean=true;
  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;
  //others
  vendor_ID: any;
  e_vendor_name: any;
  vendor_Name: any;
  searchResult_vendor: any;
  currencyList: any;
  customernameID: any;
  // product details

  public addresses: FormArray;

  itre = 0;
  test: boolean[] = [];

  //others-2
  grossTotal: any;
  grandTotal: any;
  finalTax: any;
  finalDiscount: any;
  finalDiscountType: any;
  finalDiscountVal: any;
  extraCharge = 0;
  //tax
  TaxDropdownList: any;
  shipping_amt: any;
  bankingCharge: any;
  tax_per_mod: any;
  net_amt: any;
  sub_dis_val: any;
  edit_array_ExtraLogo: any = [];
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  invoicePriceKey: any;
  row_cnt_mod: any;
  e_vendor_company_name:any;
  e_vendor_company_address:any;
  
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });
  }

  ngOnInit(): void {
    this.ADDLoadDO();

    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.edit_purchaseOrderID = params['e_purchaseOrder_Id'];
        console.log("edit purchase order id", this.edit_purchaseOrderID);
        setTimeout(() => {
          this.editPurchaseOrder();
        }, 1000);


        setTimeout(() => {
          this.totalCalculate();
        }, 2000);
       
       

        

      }
      );
      

    this.addDo_section1 = new FormGroup({
      'e_companyName': new FormControl(null),

      'e_PONo': new FormControl(null),
      'e_PODate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'e_customer_name': new FormControl(null),
      'e_customerAddress1': new FormControl(null),
      'e_vendor_name': new FormControl(null),
      'e_vendorCompany': new FormControl(null),
      'e_kind_Attention': new FormControl(null),
      'e_currency': new FormControl(null),
      'e_despatchThrough': new FormControl(null),
      'e_payment': new FormControl(null),
      'e_exchangeRate': new FormControl(null),
      'e_department': new FormControl(null),
      'e_location': new FormControl(null),
      'e_pgsubsidiary': new FormControl(null),
      'attn_name_bill': new FormControl(null),
      'e_tin': new FormControl(null),
      'e_cst': new FormControl(null),
      'e_attn_name_bill': new FormControl(null),
      'e_companyName_bill': new FormControl(null),
      'e_address_bill': new FormControl(null),
      'e_attn_name_ship': new FormControl(null),
      'e_companyName_ship': new FormControl(null),
      'e_address_ship': new FormControl(null),
      'e_comm_inform_left_1': new FormControl(null),
      'e_comm_inform_left_2': new FormControl(null),
      'e_comm_inform_left_3': new FormControl(null),
      'e_comm_inform_left_4': new FormControl(null),
      'e_comm_inform_left_5': new FormControl(null),
      'e_comm_inform_right_1': new FormControl(null),
      'e_comm_inform_right_2': new FormControl(null),
      'e_comm_inform_right_3': new FormControl(null),
      'e_comm_inform_right_4': new FormControl(null),
      'e_comm_inform_right_5': new FormControl(null),
    });

    this.addPI_section3 = new FormGroup({
      'poId': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_shipping_amt_name_txtbox': new FormControl(null),
      'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_name_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),

    });
  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }

  editAddress(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.editAddress_FormControl());

    this.itre = this.itre + 1;
    console.log(this.addresses);
    console.log(this.itre);
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      console.log(this.test[index]);


    });
  }

  editAddress_FormControl(): FormGroup {
    return this.fb.group({
      pd_PurchaseOrderChildId: '',
      prodName: '',
      desc: '',
      quantity: '',
      price: '',
      total: '',


    });
  }

  addAddress(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.editAddress_FormControl());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  removeAddress(i: number) {
    console.log(i)
    console.log(this.addresses)
    var purchaseOrderChildId = $('#pd_purchaseOrderChildId_' + i).val();
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


        console.log(i)
        console.log(this.addresses)
        this.addresses.removeAt(i);
        var addr = this.addPI_section2.value.addresses;
        var list_cnt = addr.length;
	
	      this.totalCalculate();

        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "purchaseorder";
        api_req.api_url = "purchaseorder/delete_purchase_order_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "delete_purchase_order_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.poChildId = purchaseOrderChildId;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          console.log("response", response);
          location.reload();


        });

      }
    });

  }
  ADDLoadDO() {
    let api_req: any = new Object();
    let addLoadAPI: any = new Object();

    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/add_purchase_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addLoadAPI.action = "add_purchase_order";
    addLoadAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addLoadAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;

      this.TaxDropdownList = response.tax_details;
      console.log("response-load-pi", response)
      // this.addDo_section1.patchValue({
      //   'PONo': response.delivery_no,
      // });
    });
    // this.tax_details_cbo();
  }
  tax_details_cbo(){
    this.billerChangeID = this.addDo_section1.value.companyName;

    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/tax_details_cbo";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "tax_details_cbo";
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addBillerChangeAPI.billerId = this.billerChangeID;
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.companyNameList = response.biller_details;
      this.addPI_section3.patchValue({
        'section3_gst_dropdown': response.default_tax_id,
        'section3_tax_per_hd':response.percent_val,
      });
      this.tax_per_mod = response.percent_val;
    });

    this.totalCalculate();
  }

  billerChangeDetails(event: any) {
    this.billerChangeID = event.target.value;

    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/biller_change_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "biller_change_details";
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addBillerChangeAPI.billerId = this.billerChangeID;
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.companyNameList = response.biller_details;

      this.purchaseorder_tinName = response.addres_arr.tinName;
      this.purchaseorder_tinNo = response.addres_arr.tinNo;
      this.purchaseorder_cstName = response.addres_arr.cstName;
      this.purchaseorder_cstNo = response.addres_arr.cstNo;

      var address1_company = response.addres_arr.address1;
      var address2_company = response.addres_arr.address2;
      var city_company = response.addres_arr.city;
      var country_company = response.addres_arr.country;

      var arr = [address1_company, address2_company, city_company, country_company];

      var companyAddress = arr.join(" ");
   

      this.addDo_section1.patchValue({
        'e_PONo': response.poNo,
        'e_tin': response.addres_arr.tinNo,
        'e_cst': response.addres_arr.cstNo,
        'kind_Attention': response.kind_attn,
        'e_attn_name_bill': response.kind_attn,
        'e_companyName_bill': response.addres_arr.billerName,
        'e_address_bill': companyAddress,
        'e_attn_name_ship': response.kind_attn,
        'e_companyName_ship': response.addres_arr.billerName,
        'e_address_ship': companyAddress,


      });
    });
  }
  billerChangeDetails1(id: any) {


    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/biller_change_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "biller_change_details";
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addBillerChangeAPI.billerId = id;
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.companyNameList = response.biller_details;

      this.purchaseorder_tinName = response.addres_arr.tinName;
      this.purchaseorder_tinNo = response.addres_arr.tinNo;
      this.purchaseorder_cstName = response.addres_arr.cstName;
      this.purchaseorder_cstNo = response.addres_arr.cstNo;

      var address1_company = response.addres_arr.address1;
      var address2_company = response.addres_arr.address2;
      var city_company = response.addres_arr.city;
      var country_company = response.addres_arr.country;

      var arr = [address1_company, address2_company, city_company, country_company];

      var companyAddress = arr.join(" ");


      this.addDo_section1.patchValue({
        'PONo': response.poNo,
        'e_tin': response.addres_arr.tinNo,
        'e_cst': response.addres_arr.cstNo,
        // 'kind_Attention': response.kind_attn,
        'e_attn_name_bill': response.kind_attn,
        'e_companyName_bill': response.addres_arr.billerName,
        'e_address_bill': companyAddress,
        'e_attn_name_ship': response.kind_attn,
        'e_companyName_ship': response.addres_arr.billerName,
        'e_address_ship': companyAddress,


      });
    });
  }
  keywordvendorName = 'vendorName';
  onFocusedVendor(e: any) {
    // do something when input is focused
    console.log(e);
  }
  searchVendor_selectDropdownData(data: any) {
    this.spinner.show();


    this.vendor_ID = data.vendorId;
    this.vendor_Name = data.vendorName;

    this.e_vendor_name = data.vendorName;
    console.log("search data in dropdown", data)
    console.log("search data-vendor Id", data.vendorId)
    console.log("search data- vendor name", data.vendorName)

    let api_req: any = new Object();
    let api_SearchVendor_req: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/vendor_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchVendor_req.action = "vendor_address_details";
    api_SearchVendor_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchVendor_req.vendorId = this.vendor_ID;
    api_req.element_data = api_SearchVendor_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status = true) {

        this.spinner.hide();
        
        $("#vend_company").val(response.vendorName);
        $("#vend_address").val(response.vendor_address);
        
        

        this.e_vendor_name = response.vendorName;
        this.e_vendor_company_name = response.vendorName;
        this.e_vendor_company_address=response.vendor_address;
        // this.addDo_section1.patchValue({

        //   'e_vendorCompany': response.vendorName,
        //   'customerAddress1': response.vendor_address,

        // });
      }

    });
  }
  searchVendorData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/vendor_name_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "vendor_name_details";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_Search_req.billerId = this.addDo_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-vendor_name response", response);
      this.searchResult_vendor = response.vendor_list;

      if (response!='') {
       

      }

    });

  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "quot_customer_name";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.billerId = this.addDo_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {


      }

    });

  }

  searchCustomer_selectDropdownData(data: any) {
    this.spinner.show();
    this.customer_ID = data.customerId;
    this.customer_NAME = data.customerName;
    console.log("search data in dropdown", data)
    console.log("search data-customer Id", data.customerId)
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      console.log("customer_address_details---response", response)
      if (response.status == true) {
        // console.log('address'+response.customer_details[0].customerAddress1);


        var address_3;
        var ship_to_str, ship_address_str1, ship_address_str2, ship_address_str3;

        if (response.customer_details[0].city != '') {
          address_3 = response.customer_details[0].city;
        }
        if (address_3 != '' && response.customer_details[0].state != '') {
          address_3 = address_3 + ' ,' + response.customer_details[0].state;
        } else {
          address_3 = response.customer_details[0].state;
        }
        if (address_3 != '' && response.customer_details[0].country != '') {
          address_3 = address_3 + ' ,' + response.customer_details[0].country;
        } else {
          address_3 = response.customer_details[0].country;
        }




        if (response.customer_details[0].ship_to == '' || response.customer_details[0].ship_to == null) {

          ship_to_str = response.customer_details[0].customerName;

        } else {
          ship_to_str = response.customer_details[0].ship_to;
        }

        if (response.customer_details[0].ship_customerAddress1 == '' || response.customer_details[0].ship_customerAddress1 == null) {
          ship_address_str1 = response.customer_details[0].customerAddress1;
        } else {
          ship_address_str1 = response.customer_details[0].ship_customerAddress1;

        }

        if (response.customer_details[0].ship_customerAddress2 == '' || response.customer_details[0].ship_customerAddress2 == null) {
          ship_address_str2 = response.customer_details[0].customerAddress2;
        } else {
          ship_address_str2 = response.customer_details[0].ship_customerAddress2;
        }


        if (response.customer_details[0].ship_city != '') {
          ship_address_str3 = response.customer_details[0].city;
        }
        if (ship_address_str3 != '' && response.customer_details[0].ship_state != '' && response.customer_details[0].ship_state != null) {
          ship_address_str3 = ship_address_str3 + ' ,' + response.customer_details[0].ship_state;
        } else if (ship_address_str3 != '' && response.customer_details[0].ship_state == null) {
          ship_address_str3 = ship_address_str3;
        } else {
          ship_address_str3 = response.customer_details[0].ship_state;
        }
        if (ship_address_str3 != '' && response.customer_details[0].ship_country != '' && response.customer_details[0].ship_country != null) {
          ship_address_str3 = ship_address_str3 + ' ,' + response.customer_details[0].ship_country;
        } else if (ship_address_str3 != '' && response.customer_details[0].ship_country == null) {
          ship_address_str3 = ship_address_str3;
        } else {
          ship_address_str3 = response.customer_details[0].ship_country;
        }

        if (response.customer_details[0].ship_to == '') {
          ship_address_str1 = response.customer_details[0].customerAddress1;
          ship_address_str2 = response.customer_details[0].customerAddress2;
          ship_address_str3 = address_3;
        }

        var address1_company = response.customer_details[0].customerAddress1;
        var address2_company = response.customer_details[0].customerAddress2;
        var city_company = response.customer_details[0].city;
        var State_company = response.customer_details[0].ship_state
        var country_company = response.customer_details[0].ship_country;

        var arr = [address1_company, address2_company, city_company, State_company, country_company];

        var companyAddress = arr.join(" ");

        this.addDo_section1.patchValue({
          'customerAddress1': companyAddress,
          // 'customerAddress1': response.customer_details[0].customerAddress1,
          'customerAddress2': response.customer_details[0].customerAddress2,
          'customerAddress3': address_3,
          'kind_Attention': response.customer_details[0].bill_attn,
          'ship_to': ship_to_str,
          'ship_address_1': ship_address_str1,
          'ship_address_2': ship_address_str2,
          'ship_address_3': ship_address_str3,
          'ship_attn': response.customer_details[0].companyName,
          'terms': response.customer_details[0].terms_condition,
        });
      }
      else {
        this.addDo_section1.patchValue({
          'customerAddress1': '',
          'customerAddress2': '',
          'customerAddress3': '',
          'kind_Attention': '',
          'ship_to': '',
          'ship_address_1': '',
          'ship_address_2': '',
          'ship_address_3': '',
          'ship_attn': '',
          'terms': '',
        });
      }

    });
  }

  keywordCustomerName = 'customerName';
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }


  editPurchaseOrder() {
   
    let api_req: any = new Object();
    let api_editPODetails: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/edit_purchase_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPODetails.action = "edit_purchase_order";
    api_editPODetails.poId = this.edit_purchaseOrderID;
    api_editPODetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_editPODetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        // this.purchaseOrderDetails=response.purchaseorderparent_details;
        this.currencyList = response.currency_details;
        this.customernameID = response.purchaseorderparent_details[0].billerId;
        console.log("  this.customernameID", this.customernameID);
      
        this.e_vendor_name = response.purchaseorderparent_details[0].vendorName,
        this.e_vendor_company_name= response.purchaseorderparent_details[0].vendorCompany,
        this.e_vendor_company_address= response.purchaseorderparent_details[0].vendorAddress1,

        this.addDo_section1.patchValue({          
          'e_companyName': response.purchaseorderparent_details[0].billerId,
          'e_PONo': response.purchaseorderparent_details[0].poNo,
          'e_PODate': response.purchaseorderparent_details[0].poDate,
          'e_customer_name': response.purchaseorderparent_details[0].customerName,
          'e_vendor_name': response.purchaseorderparent_details[0].vendorName,
          'e_vendorCompany': response.purchaseorderparent_details[0].vendorCompany,
          'e_customerAddress1': response.purchaseorderparent_details[0].vendorAddress1,
          'e_currency': response.purchaseorderparent_details[0].currency,
          'e_despatchThrough': response.purchaseorderparent_details[0].shipVia,
          'e_payment': response.purchaseorderparent_details[0].payment_terms,
          'e_exchangeRate': response.purchaseorderparent_details[0].exchange_rate,
          'e_department': response.purchaseorderparent_details[0].department,
          'e_location': response.purchaseorderparent_details[0].location,
          'e_pgsubsidiary': response.purchaseorderparent_details[0].pg_subsidiary,
          'e_attn_name_bill': response.purchaseorderparent_details[0].billName,
          'e_companyName_bill': response.purchaseorderparent_details[0].billCompany,
          'e_address_bill': response.purchaseorderparent_details[0].billAddress1,
          'e_attn_name_ship': response.purchaseorderparent_details[0].shipName,
          'e_companyName_ship': response.purchaseorderparent_details[0].shipCompany,
          'e_address_ship': response.purchaseorderparent_details[0].shipAddress1,
          'e_comm_inform_left_1': response.purchaseorderparent_details[0].comm_inform_left_1,
          'e_comm_inform_left_2': response.purchaseorderparent_details[0].comm_inform_left_2,
          'e_comm_inform_left_3': response.purchaseorderparent_details[0].comm_inform_left_3,
          'e_comm_inform_left_4': response.purchaseorderparent_details[0].comm_inform_left_4,
          'e_comm_inform_left_5': response.purchaseorderparent_details[0].comm_inform_left_5,
          'e_comm_inform_right_1': response.purchaseorderparent_details[0].comm_inform_right_1,
          'e_comm_inform_right_2': response.purchaseorderparent_details[0].comm_inform_right_2,
          'e_comm_inform_right_3': response.purchaseorderparent_details[0].comm_inform_right_3,
          'e_comm_inform_right_4': response.purchaseorderparent_details[0].comm_inform_right_4,
          'e_comm_inform_right_5': response.purchaseorderparent_details[0].comm_inform_right_5,   
                 

        });
        this.addPI_section3.patchValue({
          'poId':response.purchaseorderparent_details[0].poId,
          'section3_gross_total': response.purchaseorderparent_details[0].grsTotal,
          'section3_gst_dropdown': response.purchaseorderparent_details[0].taxId,
          'section3_tax_per_hd': response.purchaseorderparent_details[0].taxPer,
          'section3_taxAmt_txtbox': response.purchaseorderparent_details[0].taxAmt,
          'section3_shipping_amt_name_txtbox': response.purchaseorderparent_details[0].addName1,
          'section3_shipping_amt_txtbox': response.purchaseorderparent_details[0].addAmount1,
          'section3_bankingCharge_amt_name_txtbox': response.purchaseorderparent_details[0].addName2,
          'section3_bankingCharge_amt_txtbox': response.purchaseorderparent_details[0].addAmount2,
          'section3_grand_total': response.purchaseorderparent_details[0].grdTotal,
          'section3_remarks': response.purchaseorderparent_details[0].remarks,

        });
        this.vendor_Name = response.purchaseorderparent_details[0].vendorName;
        
        const formArray = new FormArray([]);
        for (let index = 0; index < response.purchaseorderchild_details.length; index++) {

          console.log('purchaseorderchild_details++index' + index);


          formArray.push(this.fb.group({

            "pd_PurchaseOrderChildId": response.purchaseorderchild_details[index].poChildId,
            "prodName": response.purchaseorderchild_details[index].productName,
            "quantity": response.purchaseorderchild_details[index].qty,
            "desc": response.purchaseorderchild_details[index].productDesc,
            "price": response.purchaseorderchild_details[index].rate,
            "total": response.purchaseorderchild_details[index].amt,


          })
            
          );
        }
        console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        console.log(this.addresses)
        this.editAddress();
        this.removeAddresstest(response.purchaseorderchild_details.length);
        this.billerChangeDetails1(this.customernameID);
        this.getTaxCals();
        this.totalCalculate();
        // this.getInvoice({});
      } else {


        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  removeAddresstest(i: number) {
    console.log(i)
    console.log(this.addresses)
    this.addresses.removeAt(i);
   

  }
  gotoPurchaseOrderList() {
    this.router.navigate(['/purchaseorder'])

  }
  keyUpText(event: any){
    this.e_vendor_name=event.target.value;
  }


  updatePurchaseOrder() {

    let api_req: any = new Object();
    let api_updatePO_req: any = new Object();
    api_req.moduleType = "purchaseorder";
    api_req.api_url = "purchaseorder/update_purchase_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updatePO_req.action = "update_purchase_order";
    api_updatePO_req.user_id = localStorage.getItem('erp_c4c_user_id');


//     'e_customer_name': new FormControl(null),
//       'e_vendor_name': new FormControl(null),
//         'e_vendorCompany': new FormControl(null),
//           'e_kind_Attention': new FormControl(null),

// 'attn_name_bill': new FormControl(null),



              //section 1
    api_updatePO_req.poId = this.addPI_section3.value.poId;
    api_updatePO_req.company = this.addDo_section1.value.e_companyName;
    api_updatePO_req.poNo = this.addDo_section1.value.e_PONo;
    api_updatePO_req.poDate = this.addDo_section1.value.e_PODate;
    // api_updatePO_req.vendorID =  this.vendor_ID ;
    // if(this.e_vendor_name!=''){
    //   api_updatePO_req.vendorName = this.e_vendor_name;
    // }else{
    //   this.e_vendor_name=this.addDo_section1.value.e_vendor_name
    //   api_updatePO_req.vendorName = this.e_vendor_name;      
    // }

    api_updatePO_req.vendorName =this.e_vendor_name;
    api_updatePO_req.vendorCompany = this.e_vendor_company_name;
    api_updatePO_req.vendorAddress1 = this.e_vendor_company_address;
    api_updatePO_req.currency = this.addDo_section1.value.e_currency;
    api_updatePO_req.shipVia = this.addDo_section1.value.e_despatchThrough;
    api_updatePO_req.payment_terms = this.addDo_section1.value.e_payment;
    api_updatePO_req.exchange_rate = this.addDo_section1.value.e_exchangeRate;
    api_updatePO_req.department = this.addDo_section1.value.e_department;
    api_updatePO_req.location = this.addDo_section1.value.e_location;
    api_updatePO_req.pg_subsidiary = this.addDo_section1.value.e_pgsubsidiary;


    api_updatePO_req.tinNo = this.addDo_section1.value.e_tin;
    api_updatePO_req.cstNo = this.addDo_section1.value.e_cst;
    api_updatePO_req.billName = this.addDo_section1.value.e_attn_name_bill;
    api_updatePO_req.billCompany = this.addDo_section1.value.e_companyName_bill;
    api_updatePO_req.billAddress1 = this.addDo_section1.value.e_address_bill;
    api_updatePO_req.shipName = this.addDo_section1.value.e_attn_name_ship;
    api_updatePO_req.shipCompany = this.addDo_section1.value.e_companyName_ship;
    api_updatePO_req.shipAddress1 = this.addDo_section1.value.e_address_ship;

    api_updatePO_req.comm_inform_left_1 = this.addDo_section1.value.e_comm_inform_left_1;
    api_updatePO_req.comm_inform_left_2 = this.addDo_section1.value.e_comm_inform_left_2;
    api_updatePO_req.comm_inform_left_3 = this.addDo_section1.value.e_comm_inform_left_3;
    api_updatePO_req.comm_inform_left_4 = this.addDo_section1.value.e_comm_inform_left_4;
    api_updatePO_req.comm_inform_left_5 = this.addDo_section1.value.e_comm_inform_left_5;

    api_updatePO_req.comm_inform_right_1 = this.addDo_section1.value.e_comm_inform_right_1;
    api_updatePO_req.comm_inform_right_2 = this.addDo_section1.value.e_comm_inform_right_2;
    api_updatePO_req.comm_inform_right_3 = this.addDo_section1.value.e_comm_inform_right_3;
    api_updatePO_req.comm_inform_right_4 = this.addDo_section1.value.e_comm_inform_right_4;
    api_updatePO_req.comm_inform_right_5 = this.addDo_section1.value.e_comm_inform_right_5;

    //section 2
    var addr = this.addPI_section2.value.addresses;

    for (let i = 0; i < addr.length; i++) {

      addr[i].prodName = $('#prodName_' + i).val();
      addr[i].quantity = $('#quantity_' + i).val();
      addr[i].desc = $('#desc_' + i).val();
      addr[i].price = $('#price_' + i).val();
      addr[i].total = $('#total_' + i).val();
    }

    api_updatePO_req.purchaseorderchild_details = addr;
    //section 3
    

     //section3
     api_updatePO_req.grossTotal = this.addPI_section3.value.section3_gross_total;
     api_updatePO_req.taxId = this.addPI_section3.value.section3_gst_dropdown;
     api_updatePO_req.taxPer = this.addPI_section3.value.section3_tax_per_hd;
     api_updatePO_req.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
     api_updatePO_req.addName1 = this.addPI_section3.value.section3_shipping_amt_name_txtbox;
     api_updatePO_req.addAmount1 = this.addPI_section3.value.section3_shipping_amt_txtbox;
     api_updatePO_req.addName2 = this.addPI_section3.value.section3_bankingCharge_amt_name_txtbox;
     api_updatePO_req.addAmount2 = this.addPI_section3.value.section3_bankingCharge_amt_txtbox;
     api_updatePO_req.netTotal = this.addPI_section3.value.section3_grand_total;
     api_updatePO_req.remarks = this.addPI_section3.value.section3_remarks;




    api_req.element_data = api_updatePO_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          title: 'Updated',
          message: 'Purchase Order Updated Successfully !',
        });
        this.gotoPurchaseOrderList();

      }
      else {


        iziToast.warning({
          message: "Purchase Order Not Saved Successfully",
          position: 'topRight'
        });
        this.gotoPurchaseOrderList();

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
    // this.gotoPurchaseOrderList();
  }


  TaxDropdown() {

    let api_req: any = new Object();
    let api_TaxDropdown_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/tax_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_TaxDropdown_req.action = "tax_dropdown";
    api_TaxDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_TaxDropdown_req.billerId = this.addDo_section1.value.companyName;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;
        this.tax_per_mod = response.percent_val;
        $('#tax_per_hd_id').val(response.percent_val);
        setTimeout(() => {
          this.addPI_section3.patchValue({
            'section3_gst_dropdown': response.default_tax_id,
          });

        }, 500);
        // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
        console.log('response.default_tax_id' + response.default_tax_id);



      }



    });
  }

  keyPress(event: any, i: any) {
    
    this.invoicePriceKey = i;
    this.row_cnt_mod = i;
    var key = event.target.value;
    var addr = this.addPI_section2.value.addresses;
    for (let a = 0; a < addr.length; a++) {
      // alert("h")
      var total_amt = $('#quantity_' + a).val() * $('#price_' + a).val();
      $('#total_' + a).val(total_amt);
    }

    var v = $('#quantity_' + i) * $('#price_' + i);
   
    $('#pd_Total_' + i).val(v);
    $('#pd_netPrice_' + i).val(v);
    var gtotel = 0;
    if (this.itre == 0) {
      gtotel = v;
    } else {
      for (let k = 0; k <= this.itre; k++) {
        if ($('#pd_netPrice_' + k).val() > 0) {
          gtotel += parseFloat($('#pd_netPrice_' + k).val());
        }

      }
    }
    for (let j = 0; j <= this.itre; j++) {
      console.log($('#pd_Total_' + j).val())
      console.log($('#pd_netPrice_' + j).val())

    }

    this.grossTotal = gtotel;
    this.grandTotal = gtotel;
    if (this.finalDiscount > 0) {
      this.grandTotal = gtotel - this.finalDiscount;
    }
    if (this.finalTax > 0) {
      var tax = this.addPI_section3.value.section3_gst_dropdown;
      tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);
      if (this.grandTotal > 0) {
        this.grandTotal = this.grandTotal + parseFloat(tax);
      }
      this.finalTax = parseFloat(tax);
    }
  }

  
  totalCalculate() {

    // var grs_amt=0;
    // var net_amt =0;
    var tax_amt = 0;
    var grs_amt = 0;
    var sub_total_amt = 0;
    let discount_type: any;
     var dis_amt_val: any;

    var tax_amt_tot = 0;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;
    //  alert(list_cnt);
    // var tax_per = $('#tax_per_hd_id').val();
    //var tax_per = $('#tax_per_hd_id').val();
   
    this.shipping_amt = $('#shipping_amt_id').val();
    this.bankingCharge = $('#bankingCharge_amt_id').val();
    this.finalTax = 0;

    var addr = this.addPI_section2.value.addresses;
    for (let a = 0; a < addr.length; a++) {   
    }

    for (let a = 0; a < list_cnt; a++) {

      var  total_amt = $('#quantity_' + a).val() * $('#price_' + a).val();
      $('#total_' + a).val(total_amt);

      tax_amt_tot += total_amt;
   
    }
    console.log('t',tax_amt_tot);
    var tax_val = this.tax_per_mod;
    var tax_amount = tax_amt_tot * tax_val/100;
    this.finalTax = tax_amount;
    this.grossTotal = tax_amt_tot;
    this.grandTotal = tax_amt_tot+tax_amount+this.addPI_section3.value.section3_bankingCharge_amt_txtbox+this.addPI_section3.value.section3_shipping_amt_txtbox;

    
  }

  getTaxCals() {
    var tax_id = this.addPI_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.finalTax = $('#finalDiscount_amt').val();

    this.extraCharge = 0;
    this.bankingCharge = 0;
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_tax_percent_val";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_data_req.action = "get_tax_percent_val";
    api_data_req.tax_id = tax_id;

    api_req.element_data = api_data_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.tax_per_mod = response.percent_val;
      $('#tax_per_hd_id').val(response.percent_val);

      tax = response.percent_val;
      tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);

      this.finalTax = parseFloat(tax);
      // if (this.grossTotal > 0) {
      //   this.grandTotal = (this.grossTotal + this.finalTax + this.finalDiscount + this.extraCharge).toFixed(2);
      // }
      this.finalTax = parseFloat(tax).toFixed(2);

    });


    setTimeout(() => {
      this.totalCalculate();
    }, 1000)

    

  }
  extraFees() {
    // var fee = this.addPI_section3.value.section3_shipping_amt_txtbox;
    // var bankingFee = this.addPI_section3.value.section3_bankingCharge_amt_txtbox;
    // // this.grandTotal = this.grandTotal + parseFloat(fee) + parseFloat(bankingCharge);
    // this.extraCharge = parseFloat(fee);
    // this.bankingCharge = parseFloat(bankingFee);
    // console.log('bankingCharge'+this.bankingCharge);
    this.totalCalculate();
  }

}
