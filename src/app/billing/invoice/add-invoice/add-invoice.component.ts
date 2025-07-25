import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';

import { CommonModule } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  public addInvoice_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  public addresses: FormArray;
  public DiscountForm: FormGroup;
  public CommissionForm: FormGroup;
  isReadOnly: boolean = false;

  //load add 
  companyNameList: any;
  companyNameVal: any;
  currencyNameList: any;
  ShipByList: any;
  salesRepList: any;
  paymentviaList: any;
  billerID: any;
  //radio
  radio_Select: any;
  exportState_Radio: any;
  initial_Radio: any;
  //extra logo
  ExtralogoValue: any;
  //auto complete
  searchResult: any;
  TaxDropdownList: any;
  //search textbox
  customer_ID: any;
  customer_NAME: any;
  //EditShipAdd-checkbox
  cbk_ESA_Value: any;
  EditShippingAddress: boolean = false;
  //checkbox
  mile_check_value: boolean = true;
  dynamicCheckboxwithKey: any;
  SelectExtraLogoCheckboxwithKey: any;
  cbk_conversionAmtShow_value: any;
  cbk_deductWithholdingTax: any;
  cbk_previousDue: any;
  //checkbox group select-mile
  groupSelectCommonId_MileDiscount: any;
  checkbox_value_MileDiscount: any;
  edit_array_MileDiscount: any = [];
  //warranty
  warrantyValue: any;
  //checkbox group select-logo
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
  // bankingCharge=0;
  shipping_amt: any;
  bankingCharge: any;
  tax_per_mod: any;
  net_amt: any;
  sub_dis_val: any;
  edit_array_ExtraLogo: any = [];

  // tax_amt_tot=0;  

  test: boolean[] = [];
  test_outcall: boolean[] = [];
  test_CMon: boolean[] = [];
  itre = 0;
  //others
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  invoicePriceKey: any;
  row_cnt_mod: any;
  //autocomplete
  customerName_Data: any;
  //getProformaBillerDetails
  getProformaBillerDetails_BillerID: any;
  getProformaBillerDetails_tinName: any;
  getProformaBillerDetails_tinNo: any;
  getProformaBillerDetails_cstName: any;
  getProformaBillerDetails_cstNo: any;
  //section-3 checkbox
  chkTermsandcondition: boolean = false;
  previousDue: boolean = true;
  chkReceivedAuthorizedSignature: boolean = true;
  chklogoAddressSignature: boolean = true;
  //export state-check box
  export_state: any;
  radioSelectFooter: any = '1';
  export_state_Local: boolean = true;
  export_state_Export: any;
  export_state_ZeroValid: boolean = true;
  MSDisplay_Value: boolean = true;
  //commision
  usersearchResult: any;
  //shipping address
  shipAddress1: any;
  shipAddress2: any;
  shipAddress3: any;
  //commission
  resellerName: any;
  resellerID: any;
  commissionType: any;
  commissionValue: any;
  commissionAmount: any;
  //read only fields
  isReadonly: boolean = true;

  invoiceAddSignature_state: any;
  invoiceAddSignature_filename: any;
  checkbox_selectAdditionalSignature: any;
  selectAdditionalSign: boolean = true;
  //section 3 select terms condition
  section3_Terms1: any;
  section3_Terms2: any;
  section3_Terms3: any;
  section3_Terms4: any;
  section3_Terms5: any;
  // singapore date & time
  formattedDate: string;
  formattedDate_FormArray: string;
  billerIdCurrencyConv: any;
  //validation
  submitted = true;
  custAdr1: any;
  ShipAdr2: any;
  ShipAdr1: any;
  custAdr2: any;
  ShipAdr3: any;
  custAdr3: any;
  shipAddress1_Final: any;
  shipAddress2_Final: any;
  shipAddress3_Final: any;
  ship_to_str_Final: any;
  sstCheckbox: boolean=false;
  constructor(private serverService: ServerService, private fb: FormBuilder,
    @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe,
    private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }
  keywordCompanyName = 'customerName';
  keywordUserName = 'reseller_name';
  ngOnInit(): void {
    const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.formattedDate_FormArray = this.datePipe.transform(currentDate, 'MMM yyyy');


    // console.log("this.chkTermsandcondition", this.chkTermsandcondition)
    this.loadADD();
    this.EditShippingAddress = true;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
    });

    this.dynamicCheckboxwithKey = [

      { name: 'Discount', selected: false, id: 1 },
      { name: 'Mile Stone', selected: false, id: 2 },
      { name: ' M S Display ', selected: false, id: 3 },

    ];
    this.section3_Terms1 = "Price Term: EXW SINGAPORE";
    this.section3_Terms2 = "Payment Term: 50% IN ADVANCE, 50% ON DELIVERY BY T/T";
    this.section3_Terms3 = "Port of Discharge:";
    this.section3_Terms4 = "Port of Loading: SINGAPORE";
    this.section3_Terms5 = "Lead Time: 21 - 30 DAYS";

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
    this.addInvoice_section1 = new FormGroup({
      'initial': new FormControl(),
      'companyName': new FormControl(),
      'invoiceNo': new FormControl(),   
      'BillTo': new FormControl(null,[Validators.required]),
      'cusInvoiceNo': new FormControl(),
      'tin': new FormControl(),
      'cst': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      // 'Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo': new FormControl(),
      'Attn_1': new FormControl(),
      'ESA_cntPerson': new FormControl({ value: '', disabled: true }, Validators.required),
      'ESA_Cbk': new FormControl(),
      'ship_to': new FormControl({ value: '', disabled: true }, Validators.required),
      'ship_address_1': new FormControl({ value: '', disabled: true }, Validators.required),
      'ship_address_2': new FormControl({ value: '', disabled: true }, Validators.required),
      'ship_address_3': new FormControl({ value: '', disabled: true }, Validators.required),
      // 'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'salesRep_id': new FormControl(null),
      'ShipBy': new FormControl(),
      // 'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'ship_attn': new FormControl(),
      'terms': new FormControl(),
      'extraLogo': new FormControl(),
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

      'CAS_Cbk': new FormControl(),
      'DWT_Cbk': new FormControl(),
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
      'section3_Terms1': new FormControl(null),
      'section3_Terms2': new FormControl(null),
      'section3_Terms3': new FormControl(null),
      'section3_Terms4': new FormControl(null),
      'section3_Terms5': new FormControl(null),
      'section3_previousDue': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),
      'section3_select_additional_signature': new FormControl({ value: '', disabled: false }, Validators.required),

    });

    this.DiscountForm = new FormGroup({
      'ResellerName': new FormControl(null),
      'section3_gross_total': new FormControl(null),
    });

    this.CommissionForm = new FormGroup({
      'section3_gross_total': new FormControl(null),
      'ResellerName': new FormControl(null),
      'selectCommission': new FormControl(null),
      'CommissionValue': new FormControl(null),
      'CommissionAmount': new FormControl(null),
    });
    setTimeout(() => {

      $('#datee').val(this.formattedDate);
      $('#podatee').val(this.formattedDate);
      $('#Ship_Date').val(this.formattedDate);

    }, 2000);



  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  handleChange_SSTax(event:any){
    this.sstCheckbox=event.target.checked;
   // console.log("this.sstCheckbox",this.sstCheckbox);

  }


  addAddress(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      this.test_CMon[index] = true;

    });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      pd_nextPage_checkbox: '',
      pd_productName_txtbox1: '',
      pd_current_month_str: '',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_OutCall: '',
      pd_CMon: '',
      pd_selectTax: '',

      pd_billchild_id: '',

      sub_dis_type: '',
      sub_dis_val: '',
      sub_discount: '',

    });


  }

  // removeAddress(i: number) {
  //   this.addresses.removeAt(i);
  //   var addr = this.addPI_section2.value.addresses;
  //   var list_cnt = addr.length;

  //   this.totalCalculate();

  // }

  removeAddress(i: number) {


    var pd_billchild_id = $('#pd_billchild_id_' + i).val();
    //console.log('quotationChildId'+quotationChildId);

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
        this.addresses.removeAt(i);
        var addr = this.addPI_section2.value.addresses;
        var list_cnt = addr.length;






        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "proforma";
        api_req.api_url = "proforma/delete_billing_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "delete_quotation_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.billchild_id = pd_billchild_id;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
        //  console.log("response", response);

        });

        setTimeout(() => {
          this.totalCalculate();
        }, 1500);


        setTimeout(() => {
          this.totalCalculate();
        }, 1500);


      }
    })
  }


  handleChange_initial(id: any, evt: any) {
    var radioSelectInitial = evt.target.value;
    var abc = id;
    // console.log("radio button value", radioSelectInitial);
    // console.log("radio button id value", abc);
  }
  handleChange(evt: any) {
    this.radioSelectFooter = evt.target.value;
    // var xyz = id;
    // console.log("radio button value", this.radioSelectFooter);
    // console.log("radio button id value", xyz);
  }
  handleChangeExtraLogo(event: any) {
    this.ExtralogoValue = event.target.value;
    // var xyz = id;
    // console.log("radio button value for Extra logo", this.ExtralogoValue);

  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    // console.log("mile",this.mile_check_value);
  }
  handleChange_MSDisplay(event: any) {
    this.MSDisplay_Value = event.target.checked;
    // console.log(this.MSDisplay_Value);
  }
  radioSelectCommissionType(event: any) {
    $('#CommissionValue').val('');
    $('#CommissionAmount').val('');
  }
  getCurrMonth() {
    for (let a = 0; a < this.addPI_section2.value.addresses.length; a++) {
      $('#pd_CMon_' + a).val(this.formattedDate_FormArray);
    }
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
    // console.log(this.chkTermsandcondition)
  }
  chkReceivedAuthorizedSignatureEvent(event: any) {
    this.chkReceivedAuthorizedSignature = event.target.checked;
    // console.log(this.chkReceivedAuthorizedSignature)
  }
  chklogoAddressSignatureEvent(event: any) {
    this.chklogoAddressSignature = event.target.checked;
    // console.log(this.chklogoAddressSignature)
  }
  // cbk_Fn_EditShipAddress(event: any){
  //   this.cbk_ESA_Value=event.target.checked;
  //   console.log(this.cbk_ESA_Value)

  // }
  cbk_Fn_EditShipAddress(event: any) {
    this.EditShippingAddress = event.target.checked;
    // console.log(this.EditShippingAddress)

    if (this.EditShippingAddress) {

      this.addInvoice_section1.get("ship_to").disable();
      this.addInvoice_section1.get("ship_address_1").disable();
      this.addInvoice_section1.get("ship_address_2").disable();
      this.addInvoice_section1.get("ship_address_3").disable();

    }
    else {

      this.addInvoice_section1.get("ship_to").enable();
      this.addInvoice_section1.get("ship_address_1").enable();
      this.addInvoice_section1.get("ship_address_2").enable();
      this.addInvoice_section1.get("ship_address_3").enable();


    }
    // console.log(this.EditShippingAddress)
  }
  cbk_fn_conversionAmtShow(event: any) {
    this.cbk_conversionAmtShow_value = event.target.checked;
    // console.log(this.cbk_conversionAmtShow_value)

  }
  cbk_fn_deductWithholdingTax(event: any) {
    this.cbk_deductWithholdingTax = event.target.checked;
    // console.log(this.cbk_deductWithholdingTax)

  }
  cbk_fn_previousDue(event: any) {
    this.cbk_previousDue = event.target.checked;
    // console.log(this.cbk_previousDue)
  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {

    // console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }



  selectEventUser(item: any) {

    // console.log(item)
    // do something with selected item
  }
  onFocusedUser(e: any) {
    // do something when input is focused
  }

  get f() {
    return this.addInvoice_section1.controls;
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
      if (response.status == true) {
        this.companyNameList = response.biller_details;
        this.currencyNameList = response.currency_list;
        this.ShipByList = response.ship_by;
        // this.salesRepList = response.sales_rep;
        this.paymentviaList = response.paymentvia;
        this.salesRepDropDown_Textbox_Status = response.sales_rep_status.dropdown_status;

        if (response.sales_rep_status.dropdown_status == 0) {
          this.addInvoice_section1.patchValue({
            'salesRep_id': response.sales_rep.name,
            'salesRep': response.sales_rep.userid,
          });

        } else {
          this.SalesRepList = response.sales_rep;
          this.addInvoice_section1.patchValue({
            'salesRep': localStorage.getItem('erp_c4c_user_id'),
          });


        }


        this.addInvoice_section1.patchValue({
          'companyName': response.defaults_biller_id,
        });

        // alert('Test--00'+response.defaults_biller_id);
        this.companyNameVal = response.defaults_biller_id;
        this.billerIdCurrencyConv = response.defaults_biller_id;
        this.tax_per_mod = response.percent_val;
        this.getProformaBillerDetails();
        this.TaxDropdown();
        this.getCustomerInvoiceDetails()
        // this.getCustomerInvoiceDetails(response.defaults_biller_id);
      }
    });
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
    api_TaxDropdown_req.billerId = this.addInvoice_section1.value.companyName;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;
        this.tax_per_mod = response.percent_val;
        $('#tax_per_hd_id').val(response.percent_val);
        setTimeout(() => {
          this.addPI_section3.patchValue({
            'section3_gst_dropdown': response.default_tax_id,
            'section3_Terms1': "Price Term: EXW SINGAPORE",
            'section3_Terms2': "Payment Term: 50% IN ADVANCE, 50% ON DELIVERY BY T/T",
            'section3_Terms3': "Port of Discharge:",
            'section3_Terms4': "Port of Loading: SINGAPORE",
            'section3_Terms5': "Lead Time: 21 - 30 DAYS",

          });

        }, 500);
        // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
        // console.log('response.default_tax_id' + response.default_tax_id);



      }



    });
  }

  keyPress(event: any, i: any) {

    this.invoicePriceKey = i;
    this.row_cnt_mod = i;
    var key = event.target.value;
    var addr = this.addPI_section2.value.addresses;


    var v = addr[i].pd_quantity_txtbox1 * $('#pd_SP_' + i);
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
      // console.log($('#pd_Total_' + j).val())
      // console.log($('#pd_netPrice_' + j).val())

    }

    this.grossTotal = gtotel;
  //  console.log("this.grossTotal", this.grossTotal)
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




  calculateDiscount(val: any) {
    this.invoicePriceKey = val;
    this.row_cnt_mod = val;
    var row_cnt = val;
    var sub_dis_val = 0;
    // var sub_dis_amt_val =0;
    // console.log('row_cnt' + row_cnt);
    $('#enablePercentabeDiscont').val('');
    $('#enablePriceDiscont').val('');
    // $('input:radio[name=discountTYpe]').prop('checked', true).val('per');
    var disType = $('#sub_discount_type_' + row_cnt).val();

    if (disType == 'per') {
      $('#discountTYpe_per').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();

      $('#enablePercentabeDiscont').val(sub_dis_val);
      //   console.log('22'+disType);
    } else if (disType == 'amt') {
      $('#discountTYpe_amt').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();
      $('#enablePriceDiscont').val(sub_dis_val);
      //  console.log('33'+disType);
    } else {

      $('#discountTYpe_per').prop('checked', false);
      $('#discountTYpe_amt').prop('checked', false);
    }
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
    api_Search_req.billerId = this.addInvoice_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {

      }

    });

  }
  searchUserData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/inv_reseller_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "inv_reseller_name";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.usersearchResult = response.reseller_list;

      if (response.status = true) {

      }

    });

  }
  searchCustomer_selectDropdownData(data: any) {
    this.spinner.show();


    this.customer_ID = data.customerId;
    this.customer_NAME = data.customerName;
    // console.log("search data in dropdown", data)
    // console.log("search data-customer Id", data.customerId)
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data;
    api_SearchCUST_req.billerId = this.addInvoice_section1.value.companyName;
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response.status == true) {
        this.custAdr1=response.customer_details.customerAddress1;
        this.custAdr2=response.customer_details.customerAddress2;
        this.custAdr3=response.customer_details.city;
        this.ShipAdr1=response.customer_details.ship_customerAddress1;
        this.ShipAdr2=response.customer_details.ship_customerAddress2;
        this.ShipAdr3=response.customer_details.ship_city;

        if(this.ShipAdr1==null || this.ShipAdr1=='' || this.ShipAdr1=='undefined' || this.ShipAdr1==undefined){
          this.shipAddress1_Final=this.custAdr1
        }else{
          this.shipAddress1_Final=this.ShipAdr1
        }
       
        if(this.ShipAdr2==null || this.ShipAdr2=='' || this.ShipAdr2=='undefined' || this.ShipAdr2==undefined){
          this.shipAddress2_Final=this.custAdr2
        }else{
          this.shipAddress2_Final=this.ShipAdr2
        }
        if(this.ShipAdr3==null || this.ShipAdr3=='' || this.ShipAdr3=='undefined' || this.ShipAdr3==undefined){
          this.shipAddress3_Final=this.custAdr3
        }else{
          this.shipAddress3_Final=this.ShipAdr3
        }
        if (response.customer_details.ship_to == '' || response.customer_details.ship_to == null || response.customer_details.ship_to == undefined ) {
          this.ship_to_str_Final= response.customer_details.customerName; 
       
        } else {
          this.ship_to_str_Final = response.customer_details.ship_to;
        }
        // console.log("shipAddress1",this.shipAddress1_Final)
        // console.log("shipAddress2",this.shipAddress2_Final)
        // console.log("shipAddress3", this.shipAddress3_Final)
        // console.log("ship to",  this.ship_to_str_Final)
      
        this.addInvoice_section1.patchValue({
          'address_1': response.customer_details.customerAddress1,
          'address_2': response.customer_details.customerAddress2,
          'address_3': response.customer_details.customerAddress3,
          'cusInvoiceNo': response.customer_invoice_no,
          'invoiceNo': response.invoice_no,
          'Attn_1': response.customer_details.kind_Attention,
          'ship_to':   response.customer_details.ship_to,
          'ship_address_1':  response.customer_details.ship_customerAddress1,
          'ship_address_2': response.customer_details.ship_customerAddress2,
          'ship_address_3': response.customer_details.ship_customerAddress3,
          'ship_attn': response.customer_details.ship_attn,
          'terms': response.terms_condition,
          'Currency': response.def_currency_id,
          'PaymentVia': response.def_payment_via,
          'CurrencyConversionRate': response.currencyValue,
        });
      }
      else {
        this.addInvoice_section1.patchValue({
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

          'Currency': '',
          'PaymentVia': '',
        });
      }

    });
  }
  searchUser_selectDropdownData(item: any) {


    this.resellerName = item.reseller_name;
    this.resellerID = item.reseller_id;

    // console.log(item.reseller_name)
    // console.log(item.reseller_id)


  }
  gotoInvoiceList() {

    this.router.navigate(['/invoice']);
  }
  save($event: MouseEvent) {

    let api_req: any = new Object();
    let api_saveInvoice_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/insert_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveInvoice_req.action = "insert_invoice";
    api_saveInvoice_req.user_id = localStorage.getItem('erp_c4c_user_id');


    //section-1

    if (this.addInvoice_section1.value.companyName === null || this.addInvoice_section1.value.companyName === undefined) {

      iziToast.warning({
        message: "Select Company Name",
        position: 'topRight'
      });
      return false;

    } else {
      api_saveInvoice_req.company = this.addInvoice_section1.value.companyName;
    }
    api_saveInvoice_req.invoice_no = this.addInvoice_section1.value.invoiceNo;

    if (this.customerName_Data === null || this.customerName_Data === undefined) {

      iziToast.warning({
        message: "Select Bill",
        position: 'topRight'
      });
      return false;

    } else {
      api_saveInvoice_req.customer_name = this.customerName_Data;
    }



    api_saveInvoice_req.cus_invoice_no = this.addInvoice_section1.value.cusInvoiceNo;

    api_saveInvoice_req.tinNo = this.addInvoice_section1.value.tin;
    // api_saveInvoice_req.BillTo_customer_ID = this.customer_ID;
    api_saveInvoice_req.customer_name = this.customer_ID;
    api_saveInvoice_req.BillTo_customer_NAME = this.customer_NAME;

    api_saveInvoice_req.b_name = this.addInvoice_section1.value.BillTo;
    api_saveInvoice_req.b_address1 = this.addInvoice_section1.value.address_1;
    api_saveInvoice_req.b_address2 = this.addInvoice_section1.value.address_2;
    api_saveInvoice_req.b_address3 = this.addInvoice_section1.value.address_3;
   
  
    if (this.addInvoice_section1.value.ship_to == undefined) {
      api_saveInvoice_req.s_name =  this.ship_to_str_Final;

    }
    else {
      api_saveInvoice_req.s_name = this.addInvoice_section1.value.ship_to;
    }
    if (this.addInvoice_section1.value.ship_address_1 == undefined) {
      api_saveInvoice_req.s_address1 = this.shipAddress1_Final;

    }
    else {
      api_saveInvoice_req.s_address1 = this.addInvoice_section1.value.ship_address_1;
    }

    if (this.addInvoice_section1.value.ship_address_2 == undefined) {
      api_saveInvoice_req.s_address2 = this.shipAddress2_Final;

    }
    else {
      api_saveInvoice_req.s_address2 = this.addInvoice_section1.value.ship_address_2;
    }

    if (this.addInvoice_section1.value.ship_address_3 == undefined) {
      api_saveInvoice_req.s_address3 = this.shipAddress3_Final;

    }
    else {
      api_saveInvoice_req.s_address3 = this.addInvoice_section1.value.ship_address_3;
    }






    api_saveInvoice_req.cstNo = this.addInvoice_section1.value.cst;
    api_saveInvoice_req.billDate = $('#datee').val();
    // api_saveInvoice_req.billDate = this.addInvoice_section1.value.Date;
    api_saveInvoice_req.b_attn = this.addInvoice_section1.value.Attn_1;
    api_saveInvoice_req.po_no = this.addInvoice_section1.value.PoNo;
    api_saveInvoice_req.po_date = $('#podatee').val();
    // api_saveInvoice_req.po_date = this.addInvoice_section1.value.PoDate;
    api_saveInvoice_req.sales_rep = this.addInvoice_section1.value.salesRep;
    api_saveInvoice_req.ship_by = this.addInvoice_section1.value.ShipBy;
    api_saveInvoice_req.ship_date = $('#Ship_Date').val();
    // api_saveInvoice_req.ship_date = this.addInvoice_section1.value.ShipDate;
    api_saveInvoice_req.s_attn = this.addInvoice_section1.value.ship_attn;
    api_saveInvoice_req.ref = this.addInvoice_section1.value.Ref;
    api_saveInvoice_req.terms = this.addInvoice_section1.value.terms;
    api_saveInvoice_req.currency = this.addInvoice_section1.value.Currency;
    api_saveInvoice_req.conversionRate = this.addInvoice_section1.value.CurrencyConversionRate;
    api_saveInvoice_req.paymentVIA = this.addInvoice_section1.value.PaymentVia;
    api_saveInvoice_req.reference_reseller_name = this.addInvoice_section1.value.ReferenceResellerName;
    api_saveInvoice_req.bills_logo_id = this.ExtralogoValue;
    api_saveInvoice_req.mile_discount_state = this.mile_check_value;
    api_saveInvoice_req.mile_discount_display_state = this.MSDisplay_Value;
    api_saveInvoice_req.export_state = this.radioSelectFooter;
    api_saveInvoice_req.add_exchange_rate_state = this.cbk_conversionAmtShow_value;
    api_saveInvoice_req.dw_tax_state = this.cbk_deductWithholdingTax;
    api_saveInvoice_req.sst_tax = this.sstCheckbox;

    //section-2
    //  api_saveInvoice_req.values = this.addPI_section2.value.addresses;


    var addr = this.addPI_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      if ($('#pd_productName_txtbox_' + i).val() == '') {
        iziToast.warning({
          message: "Select Minimum 1 Product Details",
          position: 'topRight'
        });
        return false;

      }

      // console.log(addr[i].pd_quantity_txtbox1)
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_unit = $('#pd_unit_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].pd_current_month_str = $('#pd_current_month_str_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
      // addr[i].pd_selectTax = $('#pd_selectTax_' + i).val();

    }


    api_saveInvoice_req.values = addr;


    //section-3 
    api_saveInvoice_req.grossTotal = this.addPI_section3.value.section3_gross_total;


    // api_saveInvoice_req.discountAmount = this.addPI_section3.value.section3_discount_txtbox;
    // api_saveInvoice_req.final_dis_type = this.addPI_section3.value.final_dis_type;
    // api_saveInvoice_req.final_dis_val = this.addPI_section3.value.final_dis_val;


    api_saveInvoice_req.discountAmount = $('#finalDiscount_amt').val();
    api_saveInvoice_req.final_dis_type = $('#final_discount_type').val();
    api_saveInvoice_req.discountPer = $('#final_discount_val').val();

    api_saveInvoice_req.taxId = this.addPI_section3.value.section3_gst_dropdown;
    api_saveInvoice_req.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
    api_saveInvoice_req.taxPer = this.tax_per_mod;
    api_saveInvoice_req.shippingAmt = this.addPI_section3.value.section3_shipping_amt_txtbox;
    api_saveInvoice_req.shippingName = this.addPI_section3.value.section3_shipping_amt_name_txtbox;
    api_saveInvoice_req.add_name = this.addPI_section3.value.section3_bankingCharge_amt_name_txtbox;
    api_saveInvoice_req.add_amt = this.addPI_section3.value.section3_bankingCharge_amt_txtbox;
    api_saveInvoice_req.netTotal = this.addPI_section3.value.section3_grand_total;
    api_saveInvoice_req.remarks = this.addPI_section3.value.section3_remarks;
    api_saveInvoice_req.previous_due_state = this.addPI_section3.value.section3_previousDue;
    api_saveInvoice_req.terms_cond_chk = this.addPI_section3.value.section3_termCondition;
    api_saveInvoice_req.terms_cond1 = this.addPI_section3.value.section3_Terms1;
    api_saveInvoice_req.terms_cond2 = this.addPI_section3.value.section3_Terms2;
    api_saveInvoice_req.terms_cond3 = this.addPI_section3.value.section3_Terms3;
    api_saveInvoice_req.terms_cond4 = this.addPI_section3.value.section3_Terms4;
    api_saveInvoice_req.terms_cond5 = this.addPI_section3.value.section3_Terms5;

    api_saveInvoice_req.signatureId = this.addPI_section3.value.section3_select_additional_signature;
    api_saveInvoice_req.received_signature = this.chkReceivedAuthorizedSignature;
    api_saveInvoice_req.logo = this.addPI_section3.value.section3_logo;


    //commission popup
    api_saveInvoice_req.resellerName = this.resellerName;

    api_saveInvoice_req.resellerID = this.resellerID;

    api_saveInvoice_req.commissionType = this.CommissionForm.value.selectCommission;
    if (this.CommissionForm.value.selectCommission == 'Fixed') {
      api_saveInvoice_req.commissionValue = this.CommissionForm.value.CommissionValue;

      api_saveInvoice_req.commissionAmount = this.CommissionForm.value.CommissionValue;
    }
    else {
      api_saveInvoice_req.commissionValue = this.CommissionForm.value.CommissionValue;

      api_saveInvoice_req.commissionAmount = $('#CommissionAmount').val();;
    }



    api_req.element_data = api_saveInvoice_req;
    ($event.target as HTMLButtonElement).disabled = true;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {
        this.router.navigate(['/invoice']);
        iziToast.success({
          message: "Invoice saved successfully",
          position: 'topRight'
        });
        this.gotoInvoiceList();

      }
      else if (response.status === 500) {
        // alert("status == 500")
        iziToast.error({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.gotoInvoiceList();
      }
      else {
        // alert("status == false")
        iziToast.warning({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.gotoInvoiceList();
      }

    }),
      (error: any) => {
        ($event.target as HTMLButtonElement).disabled = false;
        // alert(error)

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("500",error);
      }

    this.gotoInvoiceList();
    this.router.navigate(['/invoice']);


  }
  getCustomerInvoiceDetails() {
    // this.billerID = event.target.value;
    // console.log("billerID check", this.billerID);
    this.spinner.show();
    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_customer_inv_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_customer_inv_details";
    api_getInvoiceDetails_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getInvoiceDetails_req.billerId = this.addInvoice_section1.value.companyName;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.addInvoice_section1.patchValue({
          'invoiceNo': response.invoice_no,
          // 'Currency': response.currency_id,
          'CurrencyConversionRate': response.currencyValue



        });


      }
      else {

      }

    });

  }

  getProformaBillerDetails() {

    let api_req: any = new Object();
    let add_BillerDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_proforma_biller_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_BillerDetails_req.action = "get_proforma_biller_details";
    add_BillerDetails_req.billerId = this.addInvoice_section1.value.companyName;
    api_req.element_data = add_BillerDetails_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log(response);


      if (response != '') {
        this.getProformaBillerDetails_tinName = response.biller_details[0].tinName;
        this.getProformaBillerDetails_tinNo = response.biller_details[0].tinNo;
        this.getProformaBillerDetails_cstName = response.biller_details[0].cstName;
        this.getProformaBillerDetails_cstNo = response.biller_details[0].cstNo;
        this.addInvoice_section1.patchValue({
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
        // console.log(error);
      }




  }
  getEvent(event: any) {

    this.billerIdCurrencyConv = event.target.value;
   // console.log("this.billerIdCurrencyConv",this.billerIdCurrencyConv);
  }
  getCurrencyValues(event: any) {
    // console.log("event.target;", event.target);
    this.getCurrencyCode = event.target.value;
    // console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    // api_getInvoiceDetails_req.billerId = this.addInvoice_section1.value.companyName;
    api_getInvoiceDetails_req.billerId = this.billerIdCurrencyConv;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.addInvoice_section1.patchValue({
          'CurrencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }



  totalCalculate() {

    // var grs_amt=0;
    // var net_amt =0;
    var tax_amt = 0;
    var tax_amt_tot = 0;
    var grs_amt = 0;
    var sub_total_amt = 0;

    let discount_type: any;
    var total_amt: any;
    var dis_amt_val: any;

    var total_amt: any;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;
    //  alert(list_cnt);
    // var tax_per = $('#tax_per_hd_id').val();
    //var tax_per = $('#tax_per_hd_id').val();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.shipping_amt = $('#shipping_amt_id').val();
    this.bankingCharge = $('#bankingCharge_amt_id').val();
    this.finalTax = 0;
    // alert(tax_per);
    for (let a = 0; a < list_cnt; a++) {

      total_amt = $('#pd_qty_' + a).val() * $('#pd_SP_' + a).val();
      $('#pd_Total_' + a).val((total_amt).toFixed(2));


      discount_type = $('#sub_discount_type_' + a).val();
      // console.log('discount_type' + discount_type);
      if (discount_type == 'per') {
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        // console.log('discount_type1111' + this.sub_dis_val);
        if (this.sub_dis_val == '') {
          this.sub_dis_val = 0;
        }
        dis_amt_val = (parseFloat(this.sub_dis_val) * parseFloat(total_amt) / 100).toFixed(2);
        // console.log('dis_amt_val' + dis_amt_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(dis_amt_val)
        $('#pd_netPrice_' + a).val((sub_total_amt).toFixed(2));
        $('#sub_discount_' + a).val(dis_amt_val);
      } else if (discount_type == 'amt') {
        // console.log('discount_type222'+discount_type);

        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        if (this.sub_dis_val == '') {
          this.sub_dis_val = 0;
        }
        // console.log('sub_discount_valppp'+this.sub_dis_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(this.sub_dis_val);
        $('#pd_netPrice_' + a).val((sub_total_amt).toFixed(2));
      } else {
        $('#pd_netPrice_' + a).val((total_amt).toFixed(2));
        sub_total_amt = total_amt;
      }

      if ($('#pd_selectTax_' + a).prop('checked') == true && this.tax_per_mod != null) {
        this.net_amt = $('#pd_netPrice_' + a).val();

        tax_amt = (parseFloat(this.tax_per_mod) * parseFloat(this.net_amt) / 100);
        tax_amt_tot += tax_amt;

      }

      grs_amt += sub_total_amt;

    }

    this.grossTotal = grs_amt.toFixed(2);
   // console.log("this.grossTotal", this.grossTotal);

    if (tax_amt_tot > 0) {
      tax_amt_tot = (parseFloat(this.tax_per_mod) * (parseFloat(this.grossTotal) - parseFloat(this.finalDiscount)) / 100);
    }


    this.finalTax = tax_amt_tot.toFixed(2);
    if (this.shipping_amt == '') {
      this.shipping_amt = 0;
    }
    if (this.finalDiscount == '') {
      this.finalDiscount = 0;
    }
    if (this.finalTax == '') {
      this.finalTax = 0;
    }
    if (this.bankingCharge == '') {
      this.bankingCharge = 0;
    }
    this.finalDiscountCalc();
    // console.log('grs_amt' + grs_amt);
    // console.log('tax_per' + this.tax_per_mod + 'grossTotal' + this.grossTotal + 'this.finalTax' + this.finalTax + 'shipping_amt' + this.shipping_amt + 'finalDiscount' + this.finalDiscount);
    this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(this.finalTax) + parseFloat(this.shipping_amt) + parseFloat(this.bankingCharge)) - parseFloat(this.finalDiscount)).toFixed(2);
  }


  saveDiscount() {
    var enablePercentabeDiscont = $('#enablePercentabeDiscont').val()
    var enablePriceDiscont = $('#enablePriceDiscont').val()
    var disType = $('input:radio[name=discountTYpe]:checked').val();
    var final_tot = $('#pd_Total_' + this.invoicePriceKey).val();
    $('#sub_discount_type_' + this.invoicePriceKey).val(disType);
    var price: any;
    if (disType == 'per') {
      // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
        //   console.log('3333'+final_tot);
        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);


        $('#sub_discount_' + this.invoicePriceKey).val(price);
        $('#sub_discount_val_' + this.invoicePriceKey).val(enablePercentabeDiscont);
        price = final_tot - price;
      } else {
        $('#sub_discount_' + this.invoicePriceKey).val('');
        $('#sub_discount_val_' + this.invoicePriceKey).val('');
        //   console.log('222'+final_tot);
        price = final_tot;

      }
      //   console.log(price);

    } else {
      price = final_tot - enablePriceDiscont;
      $('#sub_discount_' + this.invoicePriceKey).val(enablePriceDiscont);
      $('#sub_discount_val_' + this.invoicePriceKey).val(enablePriceDiscont);

      // console.log(price);
    }
    $('#pd_netPrice_' + this.invoicePriceKey).val(price)

    var gtotel = 0;
    if (this.itre == 0) {
      gtotel = price;
    } else {
      for (let k = 0; k <= this.itre; k++) {
        gtotel += parseFloat($('#pd_netPrice_' + k).val());
      }
    }
    this.grossTotal = gtotel.toFixed(2);

  //  console.log("this.grossTotal", this.grossTotal);



    $('#discountFormId').modal('hide');
    this.DiscountForm.reset();
    this.totalCalculate();

  }

  finalDiscountCalc() {
    var enablePercentabeDiscont = $('#enablePerFinal').val()
    var enablePriceDiscont = $('#enablePriceFinal').val()
    var tax_amt = $('#tax_amt_id').val()
    var disType = $('input:radio[name=finaldiscountTYpe]:checked').val();
    var final_tot = this.grossTotal;
    var price: any;
    // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'disType'+disType+'--'+final_tot);
    $('#final_discount_type').val(disType);
    this.finalDiscountType = disType;

    if (disType == 'per') {
      // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
        //  console.log('3333'+final_tot);
        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
        $('#final_discount').val(price);
        $('#final_discount_val').val(enablePercentabeDiscont);
        this.finalDiscountVal = enablePercentabeDiscont;
        //     price = final_tot - price;
      } else {
        $('#final_discount').val('');
        $('#final_discount_val').val('');
        this.finalDiscountVal = '';
        //   console.log('222'+final_tot);
        price = 0;

      }
      //   console.log(price);
    } else {
      if (enablePriceDiscont == '') {
        enablePriceDiscont = 0;
      }
      price = enablePriceDiscont;
      $('#final_discount').val(enablePriceDiscont);
      $('#final_discount_val').val(enablePriceDiscont);
      this.finalDiscountVal = enablePercentabeDiscont;
      // console.log('999' + price);
    }

    if (this.grandTotal > 0) {
      this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(tax_amt)) - parseFloat(price)).toFixed(2);
    }
    this.finalDiscount = price

    setTimeout(() => {
      this.totalCalculate();
    }, 1500)

  }

  saveGrossDiscount() {
    this.finalDiscountCalc();
    $('#discountFormFinal').modal('hide');

  }

  CommissionFormOpen() {
    $('#CommissionValue').val('')
    $('#CommissionAmount').val('')
    $('#CommissionFormId').modal('show');
  }
  saveCommission() {
    var tax_amt = 0;
    var total_amt: any;
    var com_amt_val: any;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;

    for (let a = 0; a < list_cnt; a++) {
      total_amt = $('#pd_qty_' + a).val() * $('#pd_SP_' + a).val();
      $('#pd_Total_' + a).val(total_amt);

      var commissionType3 = $('input:radio[name=selectCommission]:checked').val();

      this.commissionType = commissionType3;
      // console.log("before if-  commissionType3", commissionType3)
      // console.log("before if-  this.commissionValue", this.commissionType)
      var commissionValue3 = $('#CommissionValue').val()
      // console.log("in if-  commissionValue3", commissionValue3)
      this.commissionValue = commissionValue3;
      if (commissionType3 == "Fixed") {

        this.commissionValue = commissionValue3;
        this.commissionAmount = commissionValue3;
        // console.log("if-fixed  this.commissionValue", this.commissionValue)
        // console.log("if-fixed  this.commissionAmount", this.commissionAmount)
        var abc = $('#CommissionAmount').val(commissionValue3);
        this.commissionAmount = abc;
      }
      else {

        com_amt_val = (parseFloat(commissionValue3) * parseFloat(total_amt) / 100).toFixed(2);
        var abc = $('#CommissionAmount').val(com_amt_val);
        this.commissionAmount = abc;
      }
    }
    $('#CommissionFormId').modal('hide');
    // this.CommissionForm.reset();


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

    this.finalDiscountCalc();

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



  calFinalDiscount() {
    $('#enablePerFinal').val('');
    $('#enablePriceFinal').val('');
    var final_dis_val = 0;
    var disType = $('#final_discount_type').val();
    // console.log('111' + disType);
    if (disType == 'per') {
      $('#finaldiscountTYpe_per').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();

      $('#enablePerFinal').val(final_dis_val);
      // console.log('22' + disType);
    } else if (disType == 'amt') {
      $('#finaldiscountTYpe_amt').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();
      $('#enablePriceFinal').val(final_dis_val);
      // console.log('33' + disType);
    } else {
      // console.log('44' + disType);
      $('#finaldiscountTYpe_per').prop('checked', false);
      $('#finaldiscountTYpe_amt').prop('checked', false);
    }


  }
  goBackInvoice() {
    this.router.navigate(['/invoice'])
  }

  eventCheckSelectAdditionalSignature(e: any) {
    this.checkbox_selectAdditionalSignature = e.target.checked
    // console.log(this.checkbox_selectAdditionalSignature );
  }
  invoiceAddSignature() {
    let api_req: any = new Object();
    let api_invoiceAddSignature_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_add_signature";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceAddSignature_req.action = "invoice_add_signature";
    api_invoiceAddSignature_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_invoiceAddSignature_req.billerId = this.addInvoice_section1.value.companyName;
    api_req.element_data = api_invoiceAddSignature_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("invoice_add_signature response", response)

      if (response.status == true) {

        this.invoiceAddSignature_state = response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        this.invoiceAddSignature_filename = response.signature_filename;
      }
    });
  }
    clearSaveCommission(){
      $('#CommissionFormId').modal('hide');
  }
    clearSaveGrossDiscount(){
      $('#discountFormFinal').modal('hide');
  }
    clearSaveDiscount(){
      $('#discountFormId').modal('hide');
  }
   

}

