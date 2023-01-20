import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-edit-pi',
  templateUrl: './edit-pi.component.html',
  styleUrls: ['./edit-pi.component.css']
})
export class EditPIComponent implements OnInit {


  public addPI_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  public addresses: FormArray;
  isReadOnly: boolean = false;

  //load add 
  companyNameList: any;
  currencyNameList: any;
  ShipByList: any;
  salesRepList: any;
  paymentviaList: any;
  billerID: any;
  //edit
  editbillerID: any;
  editResult: any;
  //radio
  radio_Select: any;
  exportState_Radio: any;
  initial_Radio: any;
  //checkbox
  mile_check_value: any;
  dynamicCheckboxwithKey: any;
  SelectExtraLogoCheckboxwithKey: any;
  //checkbox group select-mile
  groupSelectCommonId_MileDiscount: any;
  checkbox_value_MileDiscount: any;
  edit_array_MileDiscount: any = [];

  //checkbox group select-logo
  groupSelectCommonId_ExtraLogo: any;
  checkbox_value_ExtraLogo: any;
  edit_array_ExtraLogo: any = [];
  //autocomplete
  customerName_Data: any;
  //others
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  // tax_amt_tot=0;  

  test: boolean[] = [];
  itre = 0;
  //auto complete
  searchResult: any;
  //getProformaBillerDetails
  getProformaBillerDetails_BillerID: any;
  getProformaBillerDetails_tinName: any;
  getProformaBillerDetails_tinNo: any;
  getProformaBillerDetails_cstName: any;
  getProformaBillerDetails_cstNo: any;
  //export state-check box
  export_state_Local: boolean = true;
  export_state_Export: any;
  export_state_ZeroValid: boolean = true;
  MSDisplay_Value: boolean = true;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {


    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);

        this.editbillerID = params['e_editBillID'];



        console.log("edit biller id", this.editbillerID);



        this.editPI();
      }
      );
    this.loadADD();
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
    });

    this.dynamicCheckboxwithKey = [

      { name: 'Discount', selected: false, id: 1 },
      { name: 'Mile Stone', selected: false, id: 2 },
      { name: ' M S Display ', selected: false, id: 3 },

    ];
    this.SelectExtraLogoCheckboxwithKey = [

      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: ' DID Sg  ', selected: false, id: 3 },
      { name: ' Callcloud  ', selected: false, id: 4 },
      { name: ' Mrvoip  ', selected: false, id: 5 },

    ];
    this.initial_Radio = [
      { name: 'Proforma ', selected: false, id: 1 },
      { name: 'Quotation', selected: false, id: 2 },


    ];
    this.exportState_Radio = [
      { name: 'Local', selected: false, id: 1 },
      { name: 'Export', selected: false, id: 2 },
      { name: 'Zero Valid', selected: false, id: 3 },

    ];
    this.addPI_section1 = new FormGroup({
      'initial': new FormControl(),
      'companyName': new FormControl(),
      'invoiceNo': new FormControl(),
      'BillTo': new FormControl(),
      'tin': new FormControl(),
      'cst': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      'Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo': new FormControl(),
      'Attn_1': new FormControl(),
      'ShipTo_1': new FormControl(),
      'ShipTo_2': new FormControl(),
      'ShipTo_3': new FormControl(),
      'ShipTo_4': new FormControl(),
      'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'ShipBy': new FormControl(),
      'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'Attn_2': new FormControl(),
      'terms': new FormControl(),
      'Ref': new FormControl(),
      'Currency': new FormControl(),
      'CurrencyConversionRate': new FormControl(),
      'PaymentVia': new FormControl(),
      'export_state': new FormControl(),
      'mile_Discount': new FormControl(),
      'mile_MileStone': new FormControl(),
      'mile_MSDisplay': new FormControl(),
      'ReferenceResellerName': new FormControl(),
      'ExtraLogo': new FormControl(),
    });

    this.addPI_section3 = new FormGroup({



      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'final_dis_type': new FormControl(null),
      'final_dis_val': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
      'section3_shipping_amt_name_txtbox': new FormControl(null),
      'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_name_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_termCondition': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),

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
      pd_nextPage_checkbox: '',
      pd_productName_txtbox1: '',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_OutCall: '',
      pd_CMon: '',
      pd_selectTax: '',


    });

  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);


  }
  handleChangeLocal(event: any) {
    this.export_state_Local = event.target.value;
    console.log(this.export_state_Local);

  }
  handleChangeExport(event: any) {
    this.export_state_Export = event.target.value;
    console.log(this.export_state_Export);

  }
  handleChangeZeroValid(event: any) {
    this.export_state_ZeroValid = event.target.value;
    console.log(this.export_state_ZeroValid);

  }
  handleChange_initial(id: any, evt: any) {
    var radioSelectInitial = evt.target.value;
    var abc = id;
    console.log("radio button value", radioSelectInitial);
    console.log("radio button id value", abc);
  }
  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    // var xyz = id;
    console.log("radio button value", radioSelectFooter);
    // console.log("radio button id value", xyz);
  }
  handleChangeExtraLogo(event: any) {
    var Extralogo = event.target.value;
    // var xyz = id;
    console.log("radio button value", Extralogo);

  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    console.log(this.mile_check_value);
  }
  handleChange_MSDisplay(event: any) {
    this.MSDisplay_Value = event.target.value;
    console.log(this.MSDisplay_Value);
  }
  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {

    console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  EditCHK_MileDiscount(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_MileDiscount = data;
    this.checkbox_value_MileDiscount = event.target.checked;
    console.log(this.checkbox_value_MileDiscount)
    if (this.checkbox_value_MileDiscount) {

      this.edit_array_MileDiscount.push(data);
      this.edit_array_MileDiscount.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_MileDiscount);
    }
    else {
      const index = this.edit_array_MileDiscount.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_MileDiscount.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_MileDiscount)

    }
  }
  EditCHK_ExtraLogo(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_ExtraLogo = data;
    this.checkbox_value_ExtraLogo = event.target.checked;
    console.log(this.checkbox_value_ExtraLogo)
    if (this.checkbox_value_ExtraLogo) {

      this.edit_array_ExtraLogo.push(data);
      this.edit_array_ExtraLogo.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_ExtraLogo);
    }
    else {
      const index = this.edit_array_ExtraLogo.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_ExtraLogo.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_ExtraLogo)

    }
  }
  getProformaBillerDetails(event: any) {
    this.getProformaBillerDetails_BillerID = event.target.value;
    let api_req: any = new Object();
    let add_BillerDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_proforma_biller_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_BillerDetails_req.action = "get_proforma_biller_details";
    add_BillerDetails_req.billerId = this.getProformaBillerDetails_BillerID;
    api_req.element_data = add_BillerDetails_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);


      if (response != '') {
        this.getProformaBillerDetails_tinName = response.biller_details[0].tinName;
        this.getProformaBillerDetails_tinNo = response.biller_details[0].tinNo;
        this.getProformaBillerDetails_cstName = response.biller_details[0].cstName;
        this.getProformaBillerDetails_cstNo = response.biller_details[0].cstNo;
        this.addPI_section1.patchValue({
          'tin': response.biller_details[0].tinNo,
          'cst': response.biller_details[0].cstNo,
          'Currency': response.def_currency_id,
          'PaymentVia': response.def_paymentvia_id,

        });

      }
      else {

        iziToast.warning({
          message: "GetProformaBillerDetails API error. Please try again",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      }




  }
  loadADD() {
    let api_req: any = new Object();
    let addAPI: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "proforma/add_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "add_proforma_invoice";
    addAPI.user_id = localStorage.getItem('user_id');
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      this.currencyNameList = response.currency_list;
      this.ShipByList = response.ship_by;
      this.salesRepList = response.sales_rep;
      this.paymentviaList = response.paymentvia;
      console.log("response-load-pi", response)
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
    api_Search_req.user_id = localStorage.getItem('user_id');
    api_Search_req.billerId = this.addPI_section1.value.companyName;
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

    console.log("search data in dropdown", data)
    console.log("search data-customer Id", data.customerId)
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = localStorage.getItem('user_id');
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status == true) {

        this.addPI_section1.patchValue({



        });
      }
      else {
        this.addPI_section1.patchValue({


        });
      }

    });
  }
  PIUpdate() {

  }
  getCustomerInvoiceDetails(event: any) {
    this.billerID = event.target.value;
    console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_customer_inv_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_customer_inv_details";
    api_getInvoiceDetails_req.user_id = localStorage.getItem('user_id');
    api_getInvoiceDetails_req.billerId = this.billerID;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.addPI_section1.patchValue({
          // 'companyName':  this.billerID,
          'invoiceNo': response.invoice_no,
          'Currency': response.currency_id,


        });


      }
      else {

      }

    });

  }
  editPI() {

    let api_req: any = new Object();
    let api_editPI_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/edit_profoma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPI_req.action = "edit_profoma_invoice";
    api_editPI_req.user_id = localStorage.getItem('user_id');

    api_editPI_req.billId = this.editbillerID;
    api_req.element_data = api_editPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        // this.getCustomerInvoiceDetails(response.billing_pararent_details[0].billerId);
        this.addPI_section1.patchValue({
          'company': response.billing_pararent_details[0].billerId,
          'invoiceNo': response.billing_pararent_details[0].invoice_no,
          'BillTo': response.billing_pararent_details[0].b_name,
          'Reg': response.billing_pararent_details[0].tinNo,
          'address_1': response.billing_pararent_details[0].b_address1,
          'address_2': response.billing_pararent_details[0].b_address2,
          'address_3': response.billing_pararent_details[0].b_address3,
          'GST': response.billing_pararent_details[0].cstNo,
          'Date': response.billing_pararent_details[0].billDate,
          'Attn_1': response.billing_pararent_details[0].b_attn,
          'PoNo': response.billing_pararent_details[0].po_no,
          'PoDate': response.billing_pararent_details[0].po_date,
          'salesRep': response.billing_pararent_details[0].sales_rep,
          'ShipBy': response.billing_pararent_details[0].ship_by,
          'ShipDate': response.billing_pararent_details[0].ship_date,
          'Attn_2': response.billing_pararent_details[0].s_attn,
          'Ref': response.billing_pararent_details[0].ref,
          'terms': response.billing_pararent_details[0].terms,
          'Currency': response.billing_pararent_details[0].currency,
          'CurrencyConversionRate': response.billing_pararent_details[0].conversionRate,
          'PaymentVia': response.billing_pararent_details[0].paymentVIA,
          'ReferenceResellerName': response.billing_pararent_details[0].reference_reseller_name,
          'ExtraLogo': response.billing_pararent_details[0].bills_logo_id,

        });

        const formArray = new FormArray([]);
        for (let index = 0; index < response.billchild_details.length; index++) {

          formArray.push(this.fb.group({

            "pd_nextPage_checkbox": response.billchild_details[index].to_next_page,
            "pd_productName_txtbox1": response.billchild_details[index].productName,
            "pd_productName_txtArea": response.billchild_details[index].productDesc,
            "pd_quantity_txtbox1": response.billchild_details[index].quantity,
            "pd_unit": response.billchild_details[index].unit,
            "pd_sellingPrice": response.billchild_details[index].rate,
            "pd_Total": response.billchild_details[index].total_amt,
            "pd_netPrice": response.billchild_details[index].net_amt,
            "pd_OutCall": response.billchild_details[index].out_call_state,

            "pd_CMon": response.billchild_details[index].current_month_str,
            "pd_selectTax": response.billchild_details[index].exc_tax_state == 1 ? true : false,

          })

          );
        }

        console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        console.log(this.addresses)

        this.addPI_section3.patchValue({
          //row-1

          'section3_gross_total': response.quotation_details[0].gross_total,
          //row-2
          //  'section3_discount_txtbox': this.finalDiscount,
          //  'final_dis_val': this.finalDiscountVal,
          //  'final_dis_type': this.finalDiscountType,
          // +2 hidden fields
          //row-3
          'section3_gst_dropdown': response.quotation_details[0].tax_id1,
          'section3_taxAmt_txtbox': response.quotation_details[0].tax_amt1,
          'section3_tax_per_hd': response.quotation_details[0].tax_per1,
          //row-4
          'section3_shipping_amt_name_txtbox': response.quotation_details[0].shipping_amt_name,
          'section3_shipping_amt_txtbox': response.quotation_details[0].shipping_amt,
          //row-5
          'section3_grand_total': response.quotation_details[0].grand_total,
          //row-7
          'section3_remarks': response.quotation_details[0].remarks,

          //row-8
          'section3_termCondition': response.quotation_details[0].terms_cond_chk,
          //row-9
          'section3_receivedAuthorizedSignature': response.quotation_details[0].received_signature,
          //row-10
          'section3_logo': response.quotation_details[0].logo,
        });

      }
      else {

        iziToast.warning({
          message: "Quotation not updated. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      }

  }


  updatePI() {

    let api_req: any = new Object();
    let api_updatePI_req: any = new Object();
    // api_req.moduleType = "quotation";
    // api_req.api_url = "quotation/update_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    // api_UpdateEnquiry_req.action = "update_quotation";
    api_updatePI_req.user_id = localStorage.getItem('user_id');



    api_updatePI_req.company = this.addPI_section1.value.company
    api_updatePI_req.invoice_no = this.addPI_section1.value.invoiceNo;
    api_updatePI_req.customer_name = this.addPI_section1.value.BillTo;
    api_updatePI_req.tinNo = this.addPI_section1.value.Reg;
    api_updatePI_req.b_address1 = this.addPI_section1.value.address_1;
    api_updatePI_req.b_address2 = this.addPI_section1.value.address_2;
    api_updatePI_req.b_address3 = this.addPI_section1.value.address_3;
    api_updatePI_req.cstNo = this.addPI_section1.value.GST;
    api_updatePI_req.billDate = this.addPI_section1.value.Date;
    api_updatePI_req.b_attn = this.addPI_section1.value.Attn_1;
    api_updatePI_req.po_no = this.addPI_section1.value.PoNo;
    api_updatePI_req.po_date = this.addPI_section1.value.PoDate;
    api_updatePI_req.sales_rep = this.addPI_section1.value.salesRep;
    api_updatePI_req.ship_by = this.addPI_section1.value.ShipBy;
    api_updatePI_req.ship_date = this.addPI_section1.value.ShipDate;
    api_updatePI_req.s_attn = this.addPI_section1.value.Attn_2;
    api_updatePI_req.ref = this.addPI_section1.value.Ref;
    api_updatePI_req.terms = this.addPI_section1.value.terms;
    api_updatePI_req.currency = this.addPI_section1.value.Currency;
    api_updatePI_req.conversionRate = this.addPI_section1.value.CurrencyConversionRate;
    api_updatePI_req.paymentVIA = this.addPI_section1.value.PaymentVia;
    api_updatePI_req.reference_reseller_name = this.addPI_section1.value.ReferenceResellerName;
    api_updatePI_req.bills_logo_id = this.addPI_section1.value.ExtraLogo;

    //section-2
    // api_UpdateEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;

    var addr = this.addPI_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
      console.log(addr[i].pd_quantity_txtbox1)
      addr[i].pd_quotationChildId = $('#pd_quotationChildId_' + i).val();
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
      addr[i].pd_split = $('#pd_split_' + i).prop('checked');
      addr[i].to_next_page = $('#to_next_page_' + i).prop('checked');
      addr[i].pd_selectTax = $('#pd_selectTax_' + i).prop('checked');
      addr[i].pd_GPTotal = $('#pd_GPTotal_' + i).prop('checked');
    }
    api_updatePI_req.values = addr;

    //section-3

    //row-1

    api_updatePI_req.gross_total = this.addPI_section3.value.section3_gross_total;
    //row-2
    api_updatePI_req.discount_amt_tot = this.addPI_section3.value.section3_discount_txtbox;
    api_updatePI_req.final_dis_type = this.addPI_section3.value.final_dis_type;
    api_updatePI_req.final_dis_val = this.addPI_section3.value.final_dis_val;
    //row-3
    api_updatePI_req.taxId = this.addPI_section3.value.section3_gst_dropdown;
    api_updatePI_req.taxPer = this.addPI_section3.value.section3_tax_per_hd;
    api_updatePI_req.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_updatePI_req.shipping_amt_name = this.addPI_section3.value.section3_shipping_amt_name_txtbox;
    api_updatePI_req.shipping_amt = this.addPI_section3.value.section3_shipping_amt_txtbox;
    //row-5
    api_updatePI_req.grand_total = this.addPI_section3.value.section3_grand_total;
    //row-6
    api_updatePI_req.remarks = this.addPI_section3.value.section3_remarks;
    //other row

    api_updatePI_req.terms_cond_chk = this.addPI_section3.value.section3_termCondition;
    api_updatePI_req.received_signature = this.addPI_section3.value.section3_receivedAuthorizedSignature;
    api_updatePI_req.logo = this.addPI_section3.value.section3_logo;


    api_req.element_data = api_updatePI_req;

    //section-2
    var addr = this.addPI_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
      console.log(addr[i].pd_quantity_txtbox1)
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
    }
    api_updatePI_req.values = addr;
    console.log(api_req);
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          title: 'Updated',
          message: 'Quotation Updated Successfully !',
        });

        this.addPI_section1.reset();
        this.addPI_section2.reset();
        this.addPI_section3.reset();

      }
      else {


        iziToast.warning({
          message: "Quotation Not Saved Successfully",
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

  getCurrencyValues(event: any) {
    console.log("event.target;", event.target);
    this.getCurrencyCode = event.target.value;
    console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    api_getInvoiceDetails_req.billerId = this.getProformaBillerDetails_BillerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.addPI_section1.patchValue({
          'CurrencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }

}
