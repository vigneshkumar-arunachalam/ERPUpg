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
  selector: 'app-edit-do',
  templateUrl: './edit-do.component.html',
  styleUrls: ['./edit-do.component.css']
})
export class EditDoComponent implements OnInit {

  public editDo_section1 :FormGroup;
  public editDo_section2 :FormGroup;
  public editDo_section3 :FormGroup;

  // company name list

  companyNameList:any;
  editDeliveryID:any;
  editQuotationID: any;
  // select footer 
  billerChangeID:any;
  FooterDetails:any;
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
  radio_Value_Export_logo:any;
  selected_pdf_footer: any;

  // warranty

  warranty_id_radio: any;
  warranty_value: any;
  warranty_Logo: any;
  radio_Value_warranty:any;

  description_details_show_state: boolean = false;


  // auto complete search
  searchResult_CustomerName: any;
  searchResult:any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;

  // product details

  public addresses: FormArray;

  itre = 0;
  test: boolean[] = [];

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) 
  {
    this.editDo_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });

   }

  ngOnInit(): void {

    this.loadADD();
 
    this.route.queryParams
    .subscribe(params => {
      console.log("params output value", params);

      this.editDeliveryID = params['e_editBillID'];



      console.log("edit biller id", this.editDeliveryID);



      this.editDo();
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

    this.editDo_section1 = new FormGroup({
      'companyName' : new FormControl(null),
      'e_selectFooter' : new FormControl(null),
      'dcNo' : new FormControl(null),
      'dcDate' : new FormControl((new Date()).toISOString().substring(0, 10)),
      'customer_name' : new FormControl(null),
      'customerAddress1' : new FormControl(null),
      'customerAddress2' : new FormControl(null),
      'customerAddress3' : new FormControl(null),
      'kind_Attention' : new FormControl(null),
      'bills_logo_id' : new FormControl(null),
      'warranty_id' : new FormControl(null),
      'description_details_show_state' : new FormControl(null),
      'description_details' : new FormControl(null),
    });
    
    this.editDo_section3 = new FormGroup({
      'remarks' : new FormControl(null),
    })

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

  handleChange_warranty(data: any, evt: any) {

    // this.radioID_Logo = data;
    // console.log("evt", evt.target.checked)
    // console.log("evt-value", evt.target.value)
    // console.log("evt-id", evt.target.id)
    // this.radio_Value_warranty = evt.target.value;
   
    // console.log("radio button value", this.radio_Value_warranty);
  var Nowarranty = "NO WARRANTY";
  var Onewarranty = "Above items are One year warranty from the date of delivery";
  var Twowarranty = "Above items are Two year warranty from the date of delivery";
    this.radioID_Logo = data;
    this.radio_Value_warranty = evt.target.value;
    if(this.radio_Value_warranty==1){

       $('#description_details').val(Nowarranty);
console.log( $('#description_details').val());

    }
    if(this.radio_Value_warranty==2){

      $('#description_details').val(Onewarranty);
console.log( $('#description_details').val());

   }
   if(this.radio_Value_warranty==3){

    $('#description_details').val(Twowarranty);
console.log( $('#description_details').val());

 }
   
  }


  get addressControls() {
    return this.editDo_section2.get('addresses') as FormArray
  }

  editAddress(): void {
    this.addresses = this.editDo_section2.get('addresses') as FormArray;
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
        var addr = this.editDo_section2.value.addresses;
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
  



  // SELECT FOOTER

  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked=evt.target.checked;
    console.log("event only",evt)
    console.log("evt.target",evt.target)
    console.log("evt.target.checked",evt.target.checked)
    console.log("evt.target.checked global variable",this.radioSelectFooterChecked)
    console.log(" evt.target.value radioSelectFooter",evt.target.value)

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
  //         this.editDo_section1.patchValue({
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
  //         this.editDo_section1.patchValue({
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
  //         this.editDo_section1.patchValue({
  //           'quotationNumber': response.quotation_no,
  //           'selectFooter': response.footer_details[index].pdf_footer_id,
  //           'selectCurrency': response.currency_id,
  //           'termConditionContentChange': response.quotation_terms_cond,
  //           // 'DescriptionText': response.quotation_desp_det,
  //         });


  //       }
  //       else {
  //         this.editDo_section1.patchValue({
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
        }else if (ship_address_str3 != '' && response.customer_details[0].ship_state == null) {
          ship_address_str3 = ship_address_str3;        
        }else {
          ship_address_str3 = response.customer_details[0].ship_state;
        }
        if (ship_address_str3 != '' && response.customer_details[0].ship_country != '' && response.customer_details[0].ship_country != null) {
          ship_address_str3 = ship_address_str3 + ' ,' + response.customer_details[0].ship_country;      
        }else if (ship_address_str3 != ''  && response.customer_details[0].ship_country == null) {
          ship_address_str3 = ship_address_str3;      
        } else {
          ship_address_str3 = response.customer_details[0].ship_country;
        }

        if(response.customer_details[0].ship_to==''){
          ship_address_str1= response.customer_details[0].customerAddress1;
          ship_address_str2= response.customer_details[0].customerAddress2;
          ship_address_str3= address_3;
        }



        this.editDo_section1.patchValue({
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
        this.editDo_section1.patchValue({
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
    api_Search_req.billerId = this.editDo_section1.value.companyName;
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




  editDo(){
    let api_req: any = new Object();
    let edit_DO_req: any = new Object();
    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/edit_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_DO_req.action = "edit_delivery_order";
    edit_DO_req.user_id = localStorage.getItem('erp_c4c_user_id');
    edit_DO_req.deliveryId = this.editDeliveryID;
    api_req.element_data = edit_DO_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        // this.dynamicChange1(response.delivery_pararent_details[0].billerId);


        this.editDo_section1.patchValue({

          'companyName': response.delivery_pararent_details[0].billerId,
      
          //       'e_selectFooter': response.delivery_pararent_details[0].pdf_footer_id,
          'dcNo': response.delivery_pararent_details[0].delivery_no,
          'dcDate': response.delivery_pararent_details[0].delivery_date,
          'customer_name': response.delivery_pararent_details[0].customerName,
          'customerAddress1': response.delivery_pararent_details[0].customerAddress1,
          'customerAddress2': response.delivery_pararent_details[0].customerAddress2,
          'customerAddress3': response.delivery_pararent_details[0].customerAddress3,
          'kind_Attention': response.delivery_pararent_details[0].kind_Attention,
          'bills_logo_id': response.delivery_pararent_details[0].bills_logo_id,
          'warranty_id': response.delivery_pararent_details[0].warranty_type,
          'description_details_show_state': response.delivery_pararent_details[0].description_details_show_state,
          'description_details': response.delivery_pararent_details[0].description_details,
          'remarks': response.delivery_pararent_details[0].remarks,


        });
        this.editDo_section3.patchValue({
          'remarks': response.delivery_pararent_details[0].remarks,


        });
        // this.selected_pdf_footer = response.delivery_pararent_details[0].pdf_footer_id;



        const formArray = new FormArray([]);
        for (let index = 0; index < response.delivery_details.length; index++) {

          console.log('delivery_details++index' + index);


          formArray.push(this.fb.group({
            "prodName": response.delivery_details[index].productName,
            "quantity": response.delivery_details[index].qty,
            "desc": response.delivery_details[index].productDesc,

          })

          );
        }


        console.log(formArray)
        this.editDo_section2.setControl('addresses', formArray);
        console.log(this.addresses)

      }
    });
  }


  descriptionPermission(event:any){
    
    this.description_details_show_state = event.target.checked;
    console.log(this.description_details_show_state);
   
   
    if(this.description_details_show_state = event.target.checked){
      this.editDo_section1.get('description_details')?.disable();
    }
    else{
      this.editDo_section1.get('description_details')?.enable();
    }

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
         this.editDo_section1.patchValue({
           'dcNo':response.delivery_no,
         });
       });
   
   
     }
  updateDO(){

    let api_req: any = new Object();
    let api_updateDO_req: any = new Object();
    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/update_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updateDO_req.action = "update_delivery_order";
    api_updateDO_req.user_id = localStorage.getItem('erp_c4c_user_id');


    api_updateDO_req.company = this.editDo_section1.value.companyName;
    api_updateDO_req.do_no = this.editDo_section1.value.dcNo;
    api_updateDO_req.pdf_footer_id = this.editDo_section1.value.e_selectFooter;
    api_updateDO_req.dcDate = this.editDo_section1.value.dcDate;


    api_updateDO_req.customer_name = this.customer_NAME;
    api_updateDO_req.customer_id=this.customer_ID;
    api_updateDO_req.BillTo_customer_NAME = this.customer_NAME;
    api_updateDO_req.customerAddress1 = this.editDo_section1.value.customerAddress1;
    api_updateDO_req.customerAddress2 = this.editDo_section1.value.customerAddress2;
    api_updateDO_req.customerAddress3 = this.editDo_section1.value.customerAddress3;
    api_updateDO_req.kind_Attention = this.editDo_section1.value.kind_Attention;


    api_updateDO_req.bills_logo_id = this.radio_Value_Export_logo;
    // api_updateDO_req.warranty_type = this.radioSelectWarranty;

    api_updateDO_req.description_details = this.editDo_section1.value.description_details;
    api_updateDO_req.description_details_show_state=this.description_details_show_state;
    //section 2
    var addr = this.editDo_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
      
     
      addr[i].productName = $('#prodName_' + i).val();
      addr[i].qty = $('#quantity_' + i).val();
      addr[i].productDesc = $('#desc_' + i).val();
     
    }
    api_updateDO_req.deliverychild_values = addr;
//section 3
    api_updateDO_req.remarks = this.editDo_section1.value.remarks;

   


    api_req.element_data = api_updateDO_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          title: 'Updated',
          message: 'Delivery Order Updated Successfully !',
        });

      }
      else {


        iziToast.warning({
          message: "Delivery Order Not Saved Successfully",
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
    this.goBack();
  }


  goBack(){
    this.router.navigate(['/deliveryOrder']);
  }
}
