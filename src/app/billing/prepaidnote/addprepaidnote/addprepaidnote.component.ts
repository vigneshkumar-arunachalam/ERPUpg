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
  selector: 'app-addprepaidnote',
  templateUrl: './addprepaidnote.component.html',
  styleUrls: ['./addprepaidnote.component.css']
})
export class AddprepaidnoteComponent implements OnInit {
  public addDo_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  public addresses: FormArray;
  public DiscountForm: FormGroup;
  public CommissionForm: FormGroup;
  // company name list
  companyNameList: any;
  billerChangeID: any='';
  editQuotationID: any;
  //get add quotation
  billerList: any;
  //currency
  currencyList: any;
  // select footer 
  FooterDetails: any;
  radioSelectFooterChecked: boolean = false;
  billerID: any;
  currencyOld_RadioValue: any;
  dynamicTermsConditions_Currency: any;
  billerIDUpdate: any;
  currencyNew_RadioValue: any;
  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;
  // auto complete vendor
  searchResult_vendor: any;
  vendor_ID: any;
  vendor_Name: any;
  //cst,tin
  purchaseorder_tinName: any;
  purchaseorder_tinNo: any;
  purchaseorder_cstName: any;
  purchaseorder_cstNo: any;
  isReadOnly: boolean;
  //read only fields
  isReadonly: boolean = true;
  // tax_amt_tot=0;  

  test: boolean[] = [];
  itre = 0;
  //section-3

  groupSelectCommonId_ExtraLogo: any;
  checkbox_value_ExtraLogo: any;
  salesRepDropDown_Textbox_Status: any;
  SalesRepList: any;
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
  total_amt:any;
  sub_dis_val: any;
  edit_array_ExtraLogo: any = [];
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  invoicePriceKey: any;
  row_cnt_mod: any;
  getCurrencyCodeChange: any;
  cusID: any;
  CurID: any;
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.ADDLoadDO();
    
    this.addDo_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'e_selectFooter': new FormControl(null),
      'DocNo': new FormControl(null),
      'DocDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'customer_name': new FormControl(null),
      'customerAddress1': new FormControl(null),
      'customerAddress2': new FormControl(null),
      'customerAddress3': new FormControl(null),
      'vendor_name': new FormControl(null),
      'companyNameDropdown': new FormControl(null),
      'kind_Attention': new FormControl(null),
      'currency': new FormControl(null),
      'attn_name_bill': new FormControl(null),
      
      'companyName_bill': new FormControl(null),
      'address_bill': new FormControl(null),
      'address1_bill': new FormControl(null),
      'address2_bill': new FormControl(null),
      'address3_bill': new FormControl(null),
      'reference': new FormControl(null),
    
    });
    this.billerChangeDetails_initial();
    this.addPI_section3 = new FormGroup({
      'section3_gross_total': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
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


  addAddress(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      prodName: '',
      desc: '',
      quantity: '',
      price: '',
      total: '',
    });

  }

  removeAddress(i: number) {
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
        setTimeout(() => {
          this.totalCalculate();
        }, 1000)
    

     
      }
    });

  }


  // SELECT FOOTER

  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked = evt.target.checked;
    console.log("event only", evt)
    console.log("evt.target", evt.target)
    console.log("evt.target.checked", evt.target.checked)
    console.log("evt.target.checked global variable", this.radioSelectFooterChecked)
    console.log(" evt.target.value radioSelectFooter", evt.target.value)

    console.log("radio button value", radioSelectFooter);
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
  billerChangeDetails_initial() {
var xft='';
   let api_req: any = new Object();
   let addBillerChangeAPI: any = new Object();

   api_req.moduleType = "creditNote";
   api_req.api_url = "creditNote/getBillerAddress";
   api_req.api_type = "web";
   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
   addBillerChangeAPI.action = "prepaidNote";
   addBillerChangeAPI.billerId=xft;
   addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
  
   api_req.element_data = addBillerChangeAPI;
   this.serverService.sendServer(api_req).subscribe((response: any) => {
     
     // this.companyNameList = response.biller_details;
     this.addDo_section1.patchValue({
       'DocNo': response.creditNo,
       'attn_name_bill': response.userName,
       'companyName_bill': response.billerName,
       'address1_bill': response.address1,
       'address2_bill': response.address2,
       'address3_bill': response.address3,
       


     });
   });
 }
  billerChangeDetails(event:any) {
    
     this.billerChangeID = event.target.value;

    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "creditNote";
    api_req.api_url = "creditNote/getBillerAddress";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "creditNote";
    addBillerChangeAPI.billerId=this.billerChangeID;
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
   
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
  
      // this.companyNameList = response.biller_details;
      this.addDo_section1.patchValue({
        'DocNo': response.creditNo,
      });
      this.totalCalculate();
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
      this.FooterDetails = response.addres_arr;
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
       // 'DocNo': response.poNo,
        'tin': response.addres_arr.tinNo,
        'cst': response.addres_arr.cstNo,
        'kind_Attention': response.addres_arr.abc,
        'attn_name_bill': response.kind_attn,
        'companyName_bill': response.addres_arr.billerName,
        'address_bill': companyAddress,
       


      });
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
      this.FooterDetails = response.footer_list_details;
      this.TaxDropdownList = response.tax_details;
      this.currencyList = response.currency_list;
      console.log("response-load-pi", response)
      this.addDo_section1.patchValue({
       // 'DocNo': response.delivery_no,
        'companyName':response.defaults_biller_id,
      });
      this.billerChangeDetails1(response.defaults_biller_id);
      this.tax_details_cbo();
    });
  }
  searchCustomer_selectDropdownData(data: any) {
    this.spinner.show();
    this.customer_ID = data.customerId;
    this.customer_NAME = data.customerName;
  
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "customer_address_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data;
    api_SearchCUST_req.billerId = this.addDo_section1.value.companyName;
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
  searchVendor_selectDropdownData(data: any) {
    
    this.spinner.show();
    this.customer_ID = data.customerId;
    this.customer_NAME = data.customerName;
    // console.log("this.customer_ID", this.customer_ID)
    // console.log("this.customer_NAME", this.customer_NAME)
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "customer_address_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data;
    api_SearchCUST_req.billerId = this.addDo_section1.value.companyName;
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
    //  console.log("customer_address_details---response", response)
      if (response.status == true) {
        // console.log('address'+response.customer_details[0].customerAddress1);
   
        this.cusID=response.customer_details.customerId;
       
        this.CurID=response.customer_details.def_currency_id;

        var address_3;
        var ship_to_str, ship_address_str1, ship_address_str2, ship_address_str3;

        if (response.customer_details.city != '') {
          address_3 = response.customer_details.city;
        }
        if (address_3 != '' && response.customer_details.state != '') {
          address_3 = address_3 + ' ,' + response.customer_details.state;
        } else {
          address_3 = response.customer_details.state;
        }
        if (address_3 != '' && response.customer_details.country != '') {
          address_3 = address_3 + ' ,' + response.customer_details.country;
        } else {
          address_3 = response.customer_details.country;
        }




        if (response.customer_details.ship_to == '' || response.customer_details.ship_to == null) {

          ship_to_str = response.customer_details.customerName;

        } else {
          ship_to_str = response.customer_details.ship_to;
        }

        if (response.customer_details.ship_customerAddress1 == '' || response.customer_details.ship_customerAddress1 == null) {
          ship_address_str1 = response.customer_details.customerAddress1;
        } else {
          ship_address_str1 = response.customer_details.ship_customerAddress1;

        }

        if (response.customer_details.ship_customerAddress2 == '' || response.customer_details.ship_customerAddress2 == null) {
          ship_address_str2 = response.customer_details.customerAddress2;
        } else {
          ship_address_str2 = response.customer_details.ship_customerAddress2;
        }


        if (response.customer_details.ship_city != '') {
          ship_address_str3 = response.customer_details.city;
        }
        if (ship_address_str3 != '' && response.customer_details.ship_state != '' && response.customer_details.ship_state != null) {
          ship_address_str3 = ship_address_str3 + ' ,' + response.customer_details.ship_state;
        } else if (ship_address_str3 != '' && response.customer_details.ship_state == null) {
          ship_address_str3 = ship_address_str3;
        } else {
          ship_address_str3 = response.customer_details.ship_state;
        }
        if (ship_address_str3 != '' && response.customer_details.ship_country != '' && response.customer_details.ship_country != null) {
          ship_address_str3 = ship_address_str3 + ' ,' + response.customer_details.ship_country;
        } else if (ship_address_str3 != '' && response.customer_details.ship_country == null) {
          ship_address_str3 = ship_address_str3;
        } else {
          ship_address_str3 = response.customer_details.ship_country;
        }

        if (response.customer_details.ship_to == '') {
          ship_address_str1 = response.customer_details.customerAddress1;
          ship_address_str2 = response.customer_details.customerAddress2;
          ship_address_str3 = address_3;
        }
        this.getCurrencyCodeChange=response.customer_details.def_currency_id;
       // console.log("response.customer_details[0].def_currency_id",response.customer_details[0].def_currency_id)


        this.addDo_section1.patchValue({
          'customerAddress1': response.customer_details.customerAddress1,
          'customerAddress2': response.customer_details.customerAddress2,
          'customerAddress3': response.customer_details.customerAddress3,
          'companyNameDropdown': response.customer_details.kind_Attention,
     
          'currency': response.def_currency_id,
       
        

        });
      }
      else {
        this.spinner.hide();


        this.addDo_section1.patchValue({
          'address_1': '',
          'address_2': '',
          'address_3': '',
          'Attn_1': '',
          'ship_to': '',
          'ship_address_1': '',
          'ship_address_2': '',
          'ship_address_3': '',
          'ship_attn': '',
      
          'Currency': '',
         
        });
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
  searchVendorData(data: any) {
  
    

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
    //  console.log("vignesh-customer_name response", response);
      this.searchResult_vendor = response.customer_list;

      if (response.status = true) {

      }

    });

  }
  keywordCustomerName = 'customerName';
  keywordvendorName = 'customerName';
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  onFocusedVendor(e: any) {
    // do something when input is focused
    console.log(e);
  }
  AddPurchaseOrder($event: MouseEvent) {
   
    let api_req: any = new Object();
    let api_req_addPO: any = new Object();
    api_req.moduleType = "prepaidNote";
    api_req.api_url = "prepaidNote/getPrepaidNoteInsert";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_req_addPO.action = "prepaidNote/getPrepaidNoteInsert";
    api_req_addPO.user_id = localStorage.getItem('erp_c4c_user_id');
    //section 1
 
    api_req_addPO.billerId = this.addDo_section1.value.companyName;
    api_req_addPO.credit_note_no = this.addDo_section1.value.DocNo;
    api_req_addPO.date = this.addDo_section1.value.DocDate;
    api_req_addPO.billGeneratedBy=localStorage.getItem('erp_c4c_user_id');
    
  
    api_req_addPO.customer_id = this.customer_ID;
    api_req_addPO.customerCompany =     this.customer_NAME;
    api_req_addPO.b_address1 = this.addDo_section1.value.customerAddress1;
    api_req_addPO.b_address2 = this.addDo_section1.value.customerAddress2;
    api_req_addPO.b_address3 = this.addDo_section1.value.customerAddress3;
    api_req_addPO.currency_id = this.addDo_section1.value.currency;
    api_req_addPO.reference = this.addDo_section1.value.reference;
    


    //section2

    var addr = this.addPI_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      if ($('#prodName_' + i).val() == '') {
        iziToast.warning({
          message: "Select Minimum 1 Product Details",
          position: 'topRight'
        });
        return false;

      }


      addr[i].prodName = $('#prodName_' + i).val();
      addr[i].quantity = $('#quantity_' + i).val();
      addr[i].desc = $('#desc_' + i).val();
      addr[i].price = $('#price_' + i).val();
      addr[i].total = $('#total_' + i).val();


    }


    api_req_addPO.prodName = addr;


    //section3
    api_req_addPO.total_amt = this.addPI_section3.value.section3_gross_total;
    api_req_addPO.taxId = this.addPI_section3.value.section3_gst_dropdown;
    api_req_addPO.taxPer = this.addPI_section3.value.section3_tax_per_hd;
    api_req_addPO.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
    api_req_addPO.net_total_amt = this.addPI_section3.value.section3_grand_total;
 

    api_req.element_data = api_req_addPO;
    ($event.target as HTMLButtonElement).disabled = true;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

       ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == 'true') {
        this.gotoPurchaseOrderList();
        this.router.navigate(['/prepaidnote']);
        iziToast.success({
          message: "Prepaid Note Saved Successfully",
          position: 'topRight'
        });
        this.gotoPurchaseOrderList();

      }
      else if (response.status === 500) {
      
        iziToast.error({
          message: "Prepaid Note not added Successfully",
          position: 'topRight'
        });
        this.gotoPurchaseOrderList();
      }
      else {

        iziToast.warning({
          message: "Prepaid Note not added Successfully",
          position: 'topRight'
        });
        this.gotoPurchaseOrderList();
      }

    }),
      (error: any) => {
        // ($event.target as HTMLButtonElement).disabled = false;


        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("500", error);
      }

    this.gotoPurchaseOrderList();
    // this.router.navigate(['/invoice']);


  }

  goBack() {
    this.router.navigate(['/prepaidnote']);

  }
  gotoPurchaseOrderList() {
    this.router.navigate(['/prepaidnote']);

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
      alert("h")
     var  total_amt = $('#quantity_' + a).val() * $('#price_' + a).val();
      $('#total_' + a).val(total_amt);
    }

    var v = $('#quantity_' + i) * $('#price_' + i);
    alert(v)
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
    var tax_amt_tot = 0;
    var grs_amt = 0;
    var sub_total_amt = 0;

    let discount_type: any;
 
    var dis_amt_val: any;

 
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
