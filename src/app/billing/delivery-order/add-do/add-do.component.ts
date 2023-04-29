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
  selector: 'app-add-do',
  templateUrl: './add-do.component.html',
  styleUrls: ['./add-do.component.css']
})
export class AddDoComponent implements OnInit {

  public addDo_section1: FormGroup;
  public addDo_section2: FormGroup;
  public addDo_section3: FormGroup;
  // company name list

  companyNameList: any;
  billerChangeID:any;
  editQuotationID: any;
  //get add quotation
  billerList: any;
  // select footer 

  FooterDetails: any;
  radioSelectFooterChecked: boolean = false;
  billerID: any;
  currencyOld_RadioValue: any;
  dynamicTermsConditions_Currency: any;
  billerIDUpdate: any;

  currencyNew_RadioValue: any;

  // select extra logo

  bills_logo_id_radio: any;
  billsLogo_value: any;
  radioID_Logo: any;
  radio_Value_Export_logo: any;
  selected_pdf_footer: any;

  //shipping address
  shipAddress1: any;
  shipAddress2: any;
  shipAddress3: any;

  // warranty
  radioSelectWarranty: any;
  warranty_id_radio: any;
  warranty_value: any;
  warranty_Logo: any;
  radio_Value_warranty: any;

  description_details_show_state: boolean = false;


  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;

  // product details

  public addresses: FormArray;

  itre = 0;
  test: boolean[] = [];

  //add pop up query params value

  customerID_Add_DO: any;
  customerName_Add_DO: any;
  invoice_Add_DO: any;
  warranty_Add_DO: any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addDo_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });

  }

  ngOnInit(): void {

    this.loadADD();
    this.ADDLoadDO();
    
    this.Get_add_delivery_order();
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.customerID_Add_DO = params['customerID_P'];
        this.customerName_Add_DO = params['customerName_P'];
        this.invoice_Add_DO = params['invoice_p'];
        this.warranty_Add_DO = params['warranty_p'];

        console.log("this.customerID_Add_DO", this.customerID_Add_DO);
        console.log(" this.customerName_Add_DO", this.customerName_Add_DO);
        console.log(" this.invoice_Add_DO", this.invoice_Add_DO);
        console.log(" this.warranty_Add_DO", this.warranty_Add_DO);


      }
      );
    this.bills_logo_id_radio = [
      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: 'DID Sg', selected: false, id: 3 },
      { name: 'Callcloud', selected: false, id: 4 },
      { name: 'Mrvoip', selected: false, id: 5 }
    ];

    this.warranty_id_radio = [
      { name: 'No Warranty', selected: false, id: 1 },
      { name: 'One Warranty ', selected: false, id: 2 },
      { name: 'Two Warranty', selected: false, id: 3 },

    ];


    this.addDo_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'e_selectFooter': new FormControl(null),
      'dcNo': new FormControl(null),
     
      'dcDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'customer_name': new FormControl(null),
      'customerAddress1': new FormControl(null),
      'customerAddress2': new FormControl(null),
      'customerAddress3': new FormControl(null),
      'kind_Attention': new FormControl(null),
      'bills_logo_id': new FormControl(null),
      'warranty_id': new FormControl(null),
      'description_details_show_state': new FormControl(null),
      'description_details': new FormControl(null),
    });
    this.addDo_section3 = new FormGroup({
      'remarks': new FormControl(null),

    });

  }

  handleChange_EXTRALogo(data: any, evt: any) {

    this.radioID_Logo = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_Export_logo = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radio_Value_Export_logo);
    // console.log("radio button id value", xyz);
  }
  handleChange_warrantyImp(evt: any) {
    this.radioSelectWarranty = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radioSelectWarranty);
  }




  get addressControls() {
    return this.addDo_section2.get('addresses') as FormArray
  }

  editAddress(): void {
    this.addresses = this.addDo_section2.get('addresses') as FormArray;
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
      prodName: '',
      quantity: '',
      desc: '',

    });
  }


  removeParticular(i: number) {


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
        var addr = this.addDo_section2.value.addresses;
        var list_cnt = addr.length;
      }
    });
  }

  loadADD() {


    let api_req: any = new Object();
    let addAPI: any = new Object();

    api_req.moduleType = "quotation";
    api_req.api_url = "proforma/add_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "add_proforma_invoice";
    addAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      console.log("response-load-pi", response)
    });

  }
  ADDLoadDO(){
    let api_req: any = new Object();
    let addLoadAPI: any = new Object();

    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/add_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addLoadAPI.action = "add_delivery_order";
    addLoadAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addLoadAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      this.FooterDetails= response.footer_list_details;
      console.log("response-load-pi", response)
      this.addDo_section1.patchValue({
        'dcNo':response.delivery_no,
      });
    });

  }
  billerChangeDetails(event:any){
 this.billerChangeID=event.target.value;
 
    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/biller_change_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "biller_change_details";
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addBillerChangeAPI.billerId = this.billerChangeID;
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.companyNameList = response.biller_details;
      this.FooterDetails= response.footer_list_details;
      console.log("response-load-pi", response)
      this.addDo_section1.patchValue({
        'dcNo':response.delivery_no,
      });
    });


  }
  Get_add_delivery_order() {


    let api_req: any = new Object();
    let quot_getDeliOrder_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "deliveryorder/add_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_getDeliOrder_req.action = "add_delivery_order";

    quot_getDeliOrder_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = quot_getDeliOrder_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

        this.billerList = response.biller_details;


      }
      else {
        $("#showPerissionFormId").modal("hide");
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

  radioCurrencyChange(event: any) {

    this.currencyNew_RadioValue = event.target.value;
    console.log("this.currencyNew_RadioValue", this.currencyNew_RadioValue)


  }
  // dynamicChange(event: any) {
  //   this.spinner.show();
  //   this.billerID = event.target.value;
  //   console.log("billerID check", this.billerID);
  //   // this.TaxDropdown();
  //   let api_req: any = new Object();
  //   let api_dynamicDropdown_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/get_customercbo_quat_no";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_dynamicDropdown_req.action = "get_customercbo_quat_no";
  //   api_dynamicDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   api_dynamicDropdown_req.billerId = this.billerID;
  //   api_req.element_data = api_dynamicDropdown_req;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     this.FooterDetails = response.footer_details;
  //     console.log("dynamic Dropdown change response", response)
  //     this.currencyOld_RadioValue = response.currency_id;
  //     this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
  //     console.log("dynamic term condition change response", response.quotation_terms_cond)
  //     for (let index = 0; index < response.footer_details.length; index++) {
  //       this.billerIDUpdate = response.footer_details[index].billerId;
  //       if (response.status == true) {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': response.quotation_no,
  //           'selectFooter': response.footer_details[index].pdf_footer_id,
  //           'selectCurrency': response.currency_id,
  //           'termConditionContentChange': response.quotation_terms_cond,
  //           // 'DescriptionText': response.quotation_desp_det,
  //         });

  //         this.currencyNew_RadioValue = response.currency_id;         
  //         //this.currencyQuotationTermChange();


  //       }
  //       else {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': '',
  //           'selectFooter': '',
  //           'selectCurrency': '',
  //           'termConditionContentChange': '',
  //           // 'DescriptionText': '',

  //         });
  //       }
  //     }


  //   });
  // }
  // dynamicChange1() {
  //   this.spinner.show();
  //   console.log("billerID check", this.billerID);

  //   let api_req: any = new Object();
  //   let api_dynamicDropdown_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/get_customercbo_quat_no";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_dynamicDropdown_req.action = "get_customercbo_quat_no";
  //   api_dynamicDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   api_dynamicDropdown_req.billerId = this.billerID;
  //   api_req.element_data = api_dynamicDropdown_req;


  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     this.FooterDetails = response.footer_details;
  //     this.currencyOld_RadioValue = response.currency_id;
  //     this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
  //     console.log("dynamic Dropdown change response", response)
  //     console.log("dynamic term condition change response", response.quotation_terms_cond)
  //     for (let index = 0; index < response.footer_details.length; index++) {
  //       this.billerIDUpdate = response.footer_details[index].billerId;
  //       if (response.status == true) {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': response.quotation_no,
  //           'selectFooter': response.footer_details[index].pdf_footer_id,
  //           'selectCurrency': response.currency_id,
  //           'termConditionContentChange': response.quotation_terms_cond,
  //           // 'DescriptionText': response.quotation_desp_det,
  //         });


  //       }
  //       else {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': '',
  //           'selectFooter': '',
  //           'selectCurrency': '',
  //           'termConditionContentChange': '',
  //           // 'DescriptionText': '',

  //         });
  //       }
  //     }


  //   });
  // }


  // CUSTOMER AUTO COMPLETE

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



        this.addDo_section1.patchValue({
          'address_1': response.customer_details[0].customerAddress1,
          'address_2': response.customer_details[0].customerAddress2,
          'address_3': address_3,
          'Attn_1': response.customer_details[0].companyName,
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
          'address_1': '',
          'address_2': '',
          'address_3': '',
          'Attn_1': '',
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
  keywordCustomerName = 'customerName';
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }




  descriptionPermission(event: any) {

    this.description_details_show_state = event.target.checked;
    console.log(this.description_details_show_state);


    if (this.description_details_show_state = event.target.checked) {
      this.addDo_section1.get('description_details')?.disable();
    }
    else {
      this.addDo_section1.get('description_details')?.enable();
    }

  }



  AddDO($event: MouseEvent) {

    let api_req: any = new Object();
    let api_saveDO_req: any = new Object();
    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/insert_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveDO_req.action = "insert_delivery_order";
    api_saveDO_req.user_id = localStorage.getItem('erp_c4c_user_id');


    //section-1

    if (this.addDo_section1.value.companyName === null || this.addDo_section1.value.companyName === undefined) {

      iziToast.warning({
        message: "Select Company Name",
        position: 'topRight'
      });
      return false;

    } else {
      api_saveDO_req.company = this.addDo_section1.value.companyName;
    }

    api_saveDO_req.do_no = this.addDo_section1.value.dcNo;
    api_saveDO_req.pdf_footer_id = this.addDo_section1.value.e_selectFooter;
    api_saveDO_req.dcDate = this.addDo_section1.value.dcDate;

    if (this.customerName_Data === null || this.customerName_Data === undefined) {

      iziToast.warning({
        message: "Select Bill",
        position: 'topRight'
      });
      return false;

    } else {
      api_saveDO_req.customer_name = this.customerName_Data;
    }

    // api_saveDO_req.BillTo_customer_ID = this.customer_ID;
    api_saveDO_req.customer_name = this.customer_NAME;
    api_saveDO_req.customer_id=this.customer_ID;
    api_saveDO_req.BillTo_customer_NAME = this.customer_NAME;
    api_saveDO_req.customerAddress1 = this.addDo_section1.value.customerAddress1;
    api_saveDO_req.customerAddress2 = this.addDo_section1.value.customerAddress2;
    api_saveDO_req.customerAddress3 = this.addDo_section1.value.customerAddress3;
    api_saveDO_req.kind_Attention = this.addDo_section1.value.kind_Attention;

    api_saveDO_req.bills_logo_id = this.radio_Value_Export_logo;
    api_saveDO_req.warranty_type = this.radioSelectWarranty;

    api_saveDO_req.description_details = this.addDo_section1.value.description_details;
    api_saveDO_req.description_details_show_state=this.description_details_show_state;



    //section-2
    //  api_saveDO_req.values = this.addPI_section2.value.addresses;


    var addr = this.addDo_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      if ($('#pd_productName_txtbox_' + i).val() == '') {
        iziToast.warning({
          message: "Select Minimum 1 Product Details",
          position: 'topRight'
        });
        return false;

      }


      addr[i].prodName = $('#prodName_' + i).val();
      addr[i].quantity = $('#quantity_' + i).val();
      addr[i].desc = $('#desc_' + i).val();
  

    }


    api_saveDO_req.values = addr;


    //section-3 
    api_saveDO_req.remarks = this.addDo_section3.value.remarks;

    api_req.element_data = api_saveDO_req;
    ($event.target as HTMLButtonElement).disabled = true;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {
        this.router.navigate(['/deliveryOrder']);
        iziToast.success({
          message: "Delivery Order saved successfully",
          position: 'topRight'
        });
        this.gotoDOList();

      }
      else if (response.status === 500) {
        alert("status == 500")
        iziToast.error({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.gotoDOList();
      }
      else {
        alert("status == false")
        iziToast.warning({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.gotoDOList();
      }

    }),
      (error: any) => {
        ($event.target as HTMLButtonElement).disabled = false;
        alert(error)

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("500", error);
      }

    this.gotoDOList();
    // this.router.navigate(['/invoice']);


  }


  goBack() {
    this.router.navigate(['/deliveryOrder']);
  }
  gotoDOList() {
    this.router.navigate(['/deliveryOrder']);
  }
}
