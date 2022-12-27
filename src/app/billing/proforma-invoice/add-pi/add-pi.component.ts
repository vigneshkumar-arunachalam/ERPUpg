import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-add-pi',
  templateUrl: './add-pi.component.html',
  styleUrls: ['./add-pi.component.css'],

})
export class AddPIComponent implements OnInit {
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
  //radio
  radio_Select: any;
  exportState_Radio: any;
  initial_Radio: any;
  //auto complete
  searchResult: any;

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

  // tax_amt_tot=0;  

  test: boolean[] = [];
  itre = 0;
  //others
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  //getProformaBillerDetails
  getProformaBillerDetails_BillerID: any;
  getProformaBillerDetails_tinName: any;
  getProformaBillerDetails_tinNo: any;
  getProformaBillerDetails_cstName: any;
  getProformaBillerDetails_cstNo: any;
  //section-3 checkbox
  chkTermsandcondition: boolean = false;
  chkReceivedAuthorizedSignature: boolean = true;
  chklogoAddressSignature: boolean = true;
//export state-check box
export_state_Local: boolean = true;
export_state_Export:any;
export_state_ZeroValid: boolean = true;


  constructor(private serverService: ServerService, private fb: FormBuilder) {

    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    console.log("this.chkTermsandcondition", this.chkTermsandcondition)
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
      { name: 'Local', selected: true, id: 1 },
      { name: 'Export', selected: false, id: 2 },
      { name: 'Zero Valid', selected: false, id: 3 },

    ];

    this.dynamicChangeText = [
      { name: 'Reg #', id: "1074305-H" },
      { name: 'SST #', id: "J31-1808-31016512 81100" },


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
      'export_state1': new FormControl(),
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
  handleChangeLocal(event:any){
    this.export_state_Local = event.target.value;
    console.log( this.export_state_Local);

  }
  handleChangeExport(event:any){
    this.export_state_Export = event.target.value;
    console.log(this.export_state_Export);

  }
  handleChangeZeroValid(event:any){
    this.export_state_ZeroValid = event.target.value;
    console.log(this.export_state_ZeroValid );

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
  handleChangeExtraLogo(event:any){
    var Extralogo = event.target.value;
    // var xyz = id;
    console.log("radio button value", Extralogo);

  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    console.log(this.mile_check_value);
  }
  // EditCHK_MileDiscount(data: any, event: any) {
  //   console.log("List - CheckBox ID", data);
  //   this.groupSelectCommonId_MileDiscount = data;
  //   this.checkbox_value_MileDiscount = event.target.checked;
  //   console.log(this.checkbox_value_MileDiscount)
  //   if (this.checkbox_value_MileDiscount) {

  //     this.edit_array_MileDiscount.push(data);
  //     this.edit_array_MileDiscount.join(',');
  //     console.log("Final Checkbox After checkbox selected list", this.edit_array_MileDiscount);
  //   }
  //   else {
  //     const index = this.edit_array_MileDiscount.findIndex((el: any) => el === data)
  //     if (index > -1) {
  //       this.edit_array_MileDiscount.splice(index, 1);
  //     }
  //     console.log("Final Checkbox After Deselected selected list", this.edit_array_MileDiscount)

  //   }
  // }
  // EditCHK_ExtraLogo(data: any, event: any) {
  //   console.log("List - CheckBox ID", data);
  //   this.groupSelectCommonId_ExtraLogo = data;
  //   this.checkbox_value_ExtraLogo = event.target.checked;
  //   console.log(this.checkbox_value_ExtraLogo)
  //   if (this.checkbox_value_ExtraLogo) {

  //     this.edit_array_ExtraLogo.push(data);
  //     this.edit_array_ExtraLogo.join(',');
  //     console.log("Final Checkbox After checkbox selected list", this.edit_array_ExtraLogo);
  //   }
  //   else {
  //     const index = this.edit_array_ExtraLogo.findIndex((el: any) => el === data)
  //     if (index > -1) {
  //       this.edit_array_ExtraLogo.splice(index, 1);
  //     }
  //     console.log("Final Checkbox After Deselected selected list", this.edit_array_ExtraLogo)

  //   }
  // }
  chkTermsandconditionEvent(event: any) {
    this.chkTermsandcondition = event.target.checked;
    console.log(this.chkTermsandcondition)
  }
  chkReceivedAuthorizedSignatureEvent(event: any) {
    this.chkReceivedAuthorizedSignature = event.target.checked;
    console.log(this.chkReceivedAuthorizedSignature)
  }
  chklogoAddressSignatureEvent(event: any) {
    this.chklogoAddressSignature = event.target.checked;
    console.log(this.chklogoAddressSignature)
  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {
    console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  // gj(j: any) {
  //   for (var i = 0; i >= this.exportState_Radio.length; i++) {

  //     if (this.exportState_Radio[i].selected == true && this.exportState_Radio[i].id == j) {
  //       $("#export_state" + j).val(this.exportState_Radio[i].id);
  //       // return true;

  //     }
  //   }

  // }
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
  save() {
    let api_req: any = new Object();
    let api_savePI_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/insert_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_savePI_req.action = "insert_quotation";
    api_savePI_req.user_id = localStorage.getItem('user_id');

    api_savePI_req.company = this.addPI_section1.value.company;
    api_savePI_req.invoice_no = this.addPI_section1.value.invoiceNo;
    api_savePI_req.customer_name = this.addPI_section1.value.BillTo;
    api_savePI_req.tinNo = this.addPI_section1.value.Reg;
    api_savePI_req.b_address1 = this.addPI_section1.value.address_1;
    api_savePI_req.b_address2 = this.addPI_section1.value.address_2;
    api_savePI_req.b_address3 = this.addPI_section1.value.address_3;
    api_savePI_req.cstNo = this.addPI_section1.value.GST;
    api_savePI_req.billDate = this.addPI_section1.value.Date;
    api_savePI_req.b_attn = this.addPI_section1.value.Attn_1;
    api_savePI_req.po_no = this.addPI_section1.value.PoNo;
    api_savePI_req.po_date = this.addPI_section1.value.PoDate;
    api_savePI_req.sales_rep = this.addPI_section1.value.salesRep;
    api_savePI_req.ship_by = this.addPI_section1.value.ShipBy;
    api_savePI_req.ship_date = this.addPI_section1.value.ShipDate;
    api_savePI_req.s_attn = this.addPI_section1.value.Attn_2;
    api_savePI_req.ref = this.addPI_section1.value.Ref;
    api_savePI_req.terms = this.addPI_section1.value.terms;
    api_savePI_req.currency = this.addPI_section1.value.Currency;
    api_savePI_req.conversionRate = this.addPI_section1.value.CurrencyConversionRate;
    api_savePI_req.paymentVIA = this.addPI_section1.value.PaymentVia;
    api_savePI_req.reference_reseller_name = this.addPI_section1.value.ReferenceResellerName;
    api_savePI_req.bills_logo_id = this.addPI_section1.value.ExtraLogo;

    api_savePI_req.grossTotal = this.addPI_section1.value.section3_gross_total;
    api_savePI_req.discountAmount = this.addPI_section1.value.final_dis_val;
    api_savePI_req.taxId = this.addPI_section1.value.section3_gst_dropdown;
    api_savePI_req.taxAmt = this.addPI_section1.value.section3_taxAmt_txtbox;
    api_savePI_req.shippingAmt = this.addPI_section1.value.section3_shipping_amt_name_txtbox;
    api_savePI_req.addAmt = this.addPI_section1.value.section3_bankingCharge_amt_txtbox;
    api_savePI_req.netTotal = this.addPI_section1.value.section3_grand_total;
    api_savePI_req.remarks = this.addPI_section1.value.section3_remarks;
    api_savePI_req.terms_cond_chk = this.addPI_section1.value.section3_termCondition;
    api_savePI_req.received_signature = this.addPI_section1.value.section3_receivedAuthorizedSignature;
    api_savePI_req.logo = this.addPI_section1.value.section3_logo;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

      }
      else {

      }

    });

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
          'invoiceNo': response.invoice_no,
          // 'Currency': response.currency_id,


        });


      }
      else {

      }

    });

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
