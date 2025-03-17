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
  selector: 'app-editdebitnote',
  templateUrl: './editdebitnote.component.html',
  styleUrls: ['./editdebitnote.component.css']
})
export class EditdebitnoteComponent implements OnInit {
  public addDo_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  edit_creditNoteID: any;
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
        this.edit_creditNoteID = params['e_credit_note_id'];
        console.log("edit purchase order id", this.edit_creditNoteID);
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

      'e_DocNo': new FormControl(null),
      'e_DocDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'e_customer_name': new FormControl(null),
      'e_customerAddress1': new FormControl(null),
      'e_customerAddress2': new FormControl(null),
      'e_customerAddress3': new FormControl(null),
      'e_reference': new FormControl(null),
      'e_vendor_name': new FormControl(null),
      'e_companyNameDropdown': new FormControl(null),
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
        api_req.moduleType = "debitNote";
        api_req.api_url = "debitNote/delete_debitnote_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "debitNote/delete_debitnote_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.child_id = purchaseOrderChildId;
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
      this.currencyList = response.currency_list;
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
    addBillerChangeAPI.billerId =$('#e_companyName').val();
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

  billerChangeDetails(event:any) {
    
    this.billerChangeID = event.target.value;
    console.log("this.billerChangeID",this.billerChangeID);

   let api_req: any = new Object();
   let addBillerChangeAPI: any = new Object();

   api_req.moduleType = "creditNote";
   api_req.api_url = "creditNote/getBillerAddress";
   api_req.api_type = "web";
   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
   addBillerChangeAPI.action = "debitNote";
   addBillerChangeAPI.billerId=this.billerChangeID;
   addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
  
   api_req.element_data = addBillerChangeAPI;
   this.serverService.sendServer(api_req).subscribe((response: any) => {
 
     // this.companyNameList = response.biller_details;
     this.addDo_section1.patchValue({
       'DocNo': response.creditNo,
     });
   });
 }

  keywordvendorName = 'customerName';
  onFocusedVendor(e: any) {
    // do something when input is focused
    console.log(e);
  }
  searchVendor_selectDropdownData(data: any) {
    this.spinner.show();


    this.vendor_ID = data.customerId;
    this.vendor_Name = data.customerName;

    this.e_vendor_name = data.vendorName;
    console.log("search data in dropdown", data)
    console.log("search data-vendor Id", data.vendorId)
    console.log("search data- vendor name", data.vendorName)

    let api_req: any = new Object();
    let api_SearchVendor_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchVendor_req.action = "customer_address_details";
    api_SearchVendor_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchVendor_req.customerId = this.vendor_ID;
    api_req.element_data = api_SearchVendor_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status = true) {

        this.spinner.hide();
        
        $("#vend_company").val(response.vendorName);
        $("#vend_address").val(response.vendor_address);
        
        

        this.e_vendor_name = response.vendorName;
        this.e_vendor_company_name = response.vendorName;
        this.e_vendor_company_address=response.vendor_address;
        this.addDo_section1.patchValue({
          'e_customerAddress1': response.customer_details.customerAddress1,
          'e_customerAddress2': response.customer_details.customerAddress2,
          'e_customerAddress3': response.customer_details.customerAddress3,
       
          'e_vendor_name': response.customer_details.customerName,
          'e_companyNameDropdown': response.customer_details.kind_Attention,
     
          'e_currency': response.def_currency_id,
       
        

        });
      }

    });
  }
  searchVendorData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "quot_customer_name";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_Search_req.billerId = this.addDo_section1.value.companyName;
    api_Search_req.billerId = this.addDo_section1.value.e_companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-vendor_name response", response);
      this.searchResult_vendor = response.customer_list;

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
    api_req.moduleType = "debitNote";
    api_req.api_url = "debitNote/getDebitNoteedit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPODetails.action = "debitNote/getDebitNoteedit";
    api_editPODetails.debit_note_id = this.edit_creditNoteID;
    api_editPODetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_editPODetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        // this.purchaseOrderDetails=response.purchaseorderparent_details;
        // this.currencyList = response.currency_details;
        // this.customernameID = response.purchaseorderparent_details[0].billerId;
        // console.log("  this.customernameID", this.customernameID);
      
        // this.e_vendor_name = response.purchaseorderparent_details[0].vendorName,
        // this.e_vendor_company_name= response.purchaseorderparent_details[0].vendorCompany,
        // this.e_vendor_company_address= response.purchaseorderparent_details[0].vendorAddress1,
        this.vendor_ID=response.data.debit_note_parent.billerId;

        this.addDo_section1.patchValue({          
          'e_companyName': response.data.debit_note_parent.billerId,
          'e_DocNo': response.data.debit_note_parent.debit_note_no,
          'e_DocDate': response.data.debit_note_parent.debit_note_date,
          'e_companyNameDropdown': response.data.debit_note_parent.kind_Attention,


          'e_customerAddress1': response.data.debit_note_parent.b_address1,
          'e_customerAddress2': response.data.debit_note_parent.b_address2,
          'e_customerAddress3': response.data.debit_note_parent.b_address3,
          'e_currency': response.data.debit_note_parent.currency_id,
          'e_reference': response.data.debit_note_parent.reference,
         
           
          'e_vendor_name': response.data.debit_note_parent.customerName,

          'e_customer_name': response.data.debit_note_parent.customerName,
                 

        });
        this.addPI_section3.patchValue({
          'poId':response.data.debit_note_parent.customerName,
          'section3_gross_total': response.data.debit_note_parent.total_amt,
          'section3_gst_dropdown': response.data.debit_note_parent.taxId,
          'section3_tax_per_hd': response.data.debit_note_parent.taxPer,
          'section3_taxAmt_txtbox': response.data.debit_note_parent.taxAmt,
          'section3_grand_total': response.data.debit_note_parent.net_total_amt,
        });
      //  this.vendor_Name = response.purchaseorderparent_details[0].vendorName;
        
        const formArray = new FormArray([]);
        for (let index = 0; index < response.data.debit_note_child.length; index++) {

       


          formArray.push(this.fb.group({

            "pd_PurchaseOrderChildId": response.data.debit_note_child[index].debit_note_child_id,
            "prodName": response.data.debit_note_child[index].description,
            "quantity": response.data.debit_note_child[index].qty,
            "desc": response.data.debit_note_child[index].description,
            "price": response.data.debit_note_child[index].price,
            "total": response.data.debit_note_child[index].total_price,


          })
            
          );
        }
        console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        console.log(this.addresses)
        this.editAddress();
        this.removeAddresstest(response.data.debit_note_child.length);
       
        this.getTaxCals();
       
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
    this.router.navigate(['/debitnote'])

  }
  keyUpText(event: any){
    this.e_vendor_name=event.target.value;
  }
  clearInput(event:any){
    this.addDo_section1.patchValue({
      'e_customerAddress1': '',
      'e_customerAddress2':'',
      'e_customerAddress3': '',
   
      'e_vendor_name': '',
      'e_companyNameDropdown': '',
 
      // 'e_currency': 0,
   
    

    });

  }


  updatePurchaseOrder() {

    let api_req: any = new Object();
    let api_updatePO_req: any = new Object();
    api_req.moduleType = "debitNote";
    api_req.api_url = "debitNote/getDebitNoteupdate";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updatePO_req.action = "debitNote/getDebitNoteupdate";
    api_updatePO_req.user_id = localStorage.getItem('erp_c4c_user_id');

              //section 1
              api_updatePO_req.billerId = this.addDo_section1.value.e_companyName;
              api_updatePO_req.debit_note_id =this.edit_creditNoteID;
              api_updatePO_req.debit_note_no = this.addDo_section1.value.e_DocNo;
              api_updatePO_req.date = this.addDo_section1.value.e_DocDate
          
              api_updatePO_req.customer_id =    this.vendor_ID  ;
          
              if(this.addDo_section1.value.e_vendor_name==undefined || this.addDo_section1.value.e_vendor_name=='' || this.addDo_section1.value.e_vendor_name=='undefined'){

                iziToast.error({
                  message: "Customer Data Missing",
                  position: 'topRight'
                });
                return false;
              }else{
                
                api_updatePO_req.customerCompany = this.addDo_section1.value.e_vendor_name;
              }
              api_updatePO_req.b_address1 = this.addDo_section1.value.e_customerAddress1;
              api_updatePO_req.b_address2 = this.addDo_section1.value.e_customerAddress2;
              api_updatePO_req.b_address3 = this.addDo_section1.value.e_customerAddress3;
              api_updatePO_req.currency_id = this.addDo_section1.value.e_currency;
              api_updatePO_req.reference = this.addDo_section1.value.e_reference;

    //section 2
    var addr = this.addPI_section2.value.addresses;

    for (let i = 0; i < addr.length; i++) {

      addr[i].prodName = $('#prodName_' + i).val();
      addr[i].quantity = $('#quantity_' + i).val();
      addr[i].desc = $('#desc_' + i).val();
      addr[i].price = $('#price_' + i).val();
      addr[i].total = $('#total_' + i).val();
      addr[i].debit_note_id = this.edit_creditNoteID;
      addr[i].debit_note_child_id = $('#pd_purchaseOrderChildId_' + i).val();
      
    }

    api_updatePO_req.prodName = addr;
    //section 3

    api_updatePO_req.total_amt = this.addPI_section3.value.section3_gross_total;
    api_updatePO_req.taxId = this.addPI_section3.value.section3_gst_dropdown;
    api_updatePO_req.taxPer = this.addPI_section3.value.section3_tax_per_hd;
    api_updatePO_req.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
    api_updatePO_req.net_total_amt = this.addPI_section3.value.section3_grand_total;
    api_req.element_data = api_updatePO_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

        iziToast.success({
          title: 'Updated',
          message: 'Debit Note Updated Successfully !',
        });
        this.gotoPurchaseOrderList();

      }
      else {


        iziToast.warning({
          message: "Debit Note Not Updated",
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
  totalCalculate1() {

  

    var tax_amt_tot = 0;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;

   
  
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
    console.log("tax percentage in value",this.tax_per_mod);
    var tax_amount = tax_amt_tot * tax_val/100;
    this.finalTax = tax_amount;
    this.grossTotal = tax_amt_tot;
    this.grandTotal = tax_amt_tot+tax_amount+this.addPI_section3.value.section3_bankingCharge_amt_txtbox+this.addPI_section3.value.section3_shipping_amt_txtbox;

    
  }

  
  totalCalculate() {

   

    var tax_amt_tot = 0;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;

    this.finalTax = 0;

    var addr = this.addPI_section2.value.addresses;
    for (let a = 0; a < addr.length; a++) {   
    }

    for (let a = 0; a < list_cnt; a++) {

      var  total_amt = $('#quantity_' + a).val() * $('#price_' + a).val();
      $('#total_' + a).val(total_amt);

      tax_amt_tot += total_amt;
   
    }
    console.log('product total in array',tax_amt_tot);
    var tax_val = this.tax_per_mod;
    console.log("tax percentage in value",this.tax_per_mod);
    var tax_amount = tax_amt_tot * tax_val/100;
    this.finalTax = tax_amount;
    console.log('final tax amount',this.finalTax);
    this.grossTotal = tax_amt_tot;
    console.log('final gross total',this.grossTotal);
    this.grandTotal = tax_amt_tot+tax_amount;
    console.log('final grand total',this.grandTotal);

    
  }

  getTaxCals() {
    var tax_id = this.addPI_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.finalTax = $('#finalDiscount_amt').val();

    
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
      console.log("initial final tax",this.finalTax)

    });


    setTimeout(() => {
      this.totalCalculate();
    }, 1000)

    

  }
  

}
