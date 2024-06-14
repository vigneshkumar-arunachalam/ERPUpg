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
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {


  public addPI_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  public addresses: FormArray;
  public Discount1Form: FormGroup;
  public Discount2Form: FormGroup;
  isReadOnly: boolean = false;

  //load add 
  companyNameList: any;
  currencyNameList: any;
  ShipByList: any;
  salesRepList: any;
  paymentviaList: any;
  billerID: any;
  edit_Duplicate_ID: any;
  //edit
  editbillerID: any;
  editResult: any;
  exportState_value: any;
  editDIDStateID: any;


  TaxDropdownList: any;
  grossTotalTax: any;
  //radio
  radio_Select: any;
  exportState_Radio: any;
  initial_Radio: any;
  radioID_Export: any;
  radio_Value_Export: any;
  //checkbox
  mile_check_value: any;
  dynamicCheckboxwithKey: any;
  SelectExtraLogoCheckboxwithKey: any;
  //checkbox group select-mile
  groupSelectCommonId_MileDiscount: any;
  checkbox_value_MileDiscount: any;
  edit_array_MileDiscount: any = [];

  // section-3
  chkTermsandcondition: boolean = false;
  chklogoAddressSignature: boolean = true;
  previousDue: boolean = true;
  chkReceivedAuthorizedSignature: boolean = true;

  //checkbox group select-logo
  groupSelectCommonId_ExtraLogo: any;
  checkbox_value_ExtraLogo: any;
  edit_array_ExtraLogo: any = [];
  //autocomplete
  customerName_Data: any;
  //EditShipAdd-checkbox
  cbk_ESA_Value: any;
  EditShippingAddress: boolean = false;
  //checkbox
  cbk_conversionAmtShow_value: any;
  cbk_deductWithholdingTax: any;
  cbk_previousDue: any;
  //others
  dynamicChangeText: any;
  CurrencyConversionRateDefault: any = 1;
  getCurrencyCode: any;
  invoicePriceKey: any;
  mileDiscountState_value: any;
  billsLogo_value: any;
  radioID_Logo: any;
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
  //calculation
  finalDiscount: any;
  finalDiscountType: any;
  finalDiscountType_model: any;
  finalDiscountVal: any;
  sub_dis_val: any;
  sub_dis_type: any;
  grandTotal: any;
  grossTotal: any;
  finalTax: any;
  tax_per_hd = 0;
  tax_per_mod: any;
  extraCharge = 0;
  net_amt: any;
  shipping_amt: any;
  bankingCharge: any;
  invocePriceKey: any;
  row_cnt_mod: any;
  cbk_JomPAYLogo: any;
  //radio button value
  radio_Value_ExportState: any;
  radio_Value_SelectExtraLogo: any;
  radio_Value_mileSate_InvoiceType: any;

  //  quotationAddSignature
  quotationAddSignature_state: any;
  quotationAddSignature_filename: any;
  selectAdditionalSign: boolean = true;
  sign_state: number;
  invoiceAddSignature_state: any;
  invoiceAddSignature_filename: any;
  invoiceAddSignatureCHKShowState: any;
  input1: string;
  input2: string;
  input4: string;
  input3: string;
  input5: string;
  input6: string;


  checkbox_selectReceivedSignature: any;

  checkbox_selectAdditionalSignature: any;

  selectReceivedSign: boolean = true;
  received_signature_state: any;
  print_logo_state: any;
  //section 3 select terms condition
  section3_Terms1: any;
  section3_Terms2: any;
  section3_Terms3: any;
  section3_Terms4: any;
  section3_Terms5: any;

  // singapore date & time
  formattedDate: string;
  TaxValuEDIt: any;
  BillerAttention: any;
  billID_Edit: any;
  billerID_Edit: any;
  userID_Edit: any;
  TaxAmtEDIt: any;
  search_values:any
  searchFlag: any;
  upd_flagName: any;
  upd_search_name: any;
  //validation
  submitted = true;
  shipAdd_Edit: any;
  custAdr1: any;
  custAdr2: any;
  custAdr3: any;
  ShipAdr1: any;
  ShipAdr2: any;
  ShipAdr3: any;
  shipAddress1_Final: any;
  shipAddress2_Final: any;
  shipAddress3_Final: any;
  ship_to_str_Final: any;
  customerID_value: any;
  customerName_Change: any;
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });
    this.serverService.invoice_search.subscribe((val: any) => {
      // alert("hi")
    
     // console.log("before parse-invoice search-kavin", val.type) 
      if(val.type=="search girlfriend"){
        this.search_values = val;
      //  console.log("invoice_search-val--------poda",val)
      }
      // var k = JSON.parse(val);
      // console.log("kavin",k);
    // console.log(val['type'])
    // console.log(val.type)

    });


  }

  ngOnInit(): void {

    this.EditShippingAddress = true;


    this.route.queryParams
      .subscribe(params => {
       // console.log("params output value", params);

        this.editbillerID = params['e_editBillID'];
        this.editDIDStateID = params['e_editDIDState'];
        this.edit_Duplicate_ID = params['e_editDuplicateID'];
        this.searchFlag = params['e_searchFlag'];
       

        // console.log("edit biller id", this.editbillerID);
        // console.log("edit DID state id", this.editDIDStateID);
        // console.log("edit duplicate id", this.edit_Duplicate_ID);
        // console.log("edit searchFlag id", this.searchFlag);
        this.editInvoice();

      }
      );
     

    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log("params output value", params);

        
    //     this.editDIDStateID = params['e_editDIDState'];




     
    //     console.log("edit DID state id", this.editDIDStateID);



       
    //   }
    //   );
    this.loadADD();

    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      
    });

    this.dynamicCheckboxwithKey = [

      { name: 'Discount', selected: false, id: 1 },
      { name: 'Mile Stone', selected: false, id: 2 },


    ];
    this.SelectExtraLogoCheckboxwithKey = [

      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: ' DID Sg  ', selected: false, id: 3 },
      { name: ' Callcloud  ', selected: false, id: 4 },
      { name: ' Mrvoip  ', selected: false, id: 5 },
      { name: ' None  ', selected: false, id: 0 },

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

    this.section3_Terms1 = "Price Term: EXW SINGAPORE";
    this.section3_Terms2 = "Payment Term: 50% IN ADVANCE, 50% ON DELIVERY BY T/T";
    this.section3_Terms3 = "Port of Discharge:";
    this.section3_Terms4 = "Port of Loading: SINGAPORE";
    this.section3_Terms5 = "Lead Time: 21 - 30 DAYS";

    this.addPI_section1 = new FormGroup({
      'initial': new FormControl(),
      'billId_edit': new FormControl(),
      'companyName': new FormControl(null, [Validators.required]),
      'customer_name': new FormControl(),
      'invoiceNo': new FormControl(),
      'cusInvoiceNo': new FormControl(),
      'customer_id_hd': new FormControl(),
      'BillTo': new FormControl(null, [Validators.required]),
      'tin': new FormControl(null, [Validators.required]),
      'cst': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      'Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo': new FormControl(),
      'Attn_1': new FormControl(),
      'ESA_Cbk': new FormControl(),
      'ESA_cntPerson': new FormControl({ value: '', disabled: true }, Validators.required),
      'ship_to': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_1': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_2': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_3': new FormControl({ value: '', disabled: true }, Validators.required),

      'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'ShipBy': new FormControl(),
      'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'Attn_2': new FormControl(),
      'terms': new FormControl(),
      'Ref': new FormControl(),
      'billCode': new FormControl(),
      'Currency': new FormControl(),
      'CurrencyConversionRate': new FormControl(),
      'PaymentVia': new FormControl(),
      'export_state': new FormControl(),
      'mile_Discount': new FormControl(),
      'mile_MileStone': new FormControl(),
      'mile_MSDisplay': new FormControl(),
      'ReferenceResellerName': new FormControl(),
      'ExtraLogo': new FormControl(),
      'CASJomPAYLogo_Cbk_Cbk': new FormControl(),
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
      'banking_charge_name': new FormControl(null),
      'banking_charge_amt': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_previousDue': new FormControl(null),
      'section3_termCondition': new FormControl(null),
      'section3_Terms1': new FormControl(null),
      'section3_Terms2': new FormControl(null),
      'section3_Terms3': new FormControl(null),
      'section3_Terms4': new FormControl(null),
      'section3_Terms5': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),
      'section3_select_additional_signature': new FormControl({ value: '', disabled: false }, Validators.required),
    });
    this.Discount1Form = new FormGroup({
      'enablePerFinal': new FormControl(null),
      'enablePriceFinal': new FormControl(null),

    });

    this.Discount2Form = new FormGroup({
      'enablePerFinal': new FormControl(null),
      'finaldiscountTYpe_amt': new FormControl(null),

    });


  }
  get f() {
    return this.addPI_section1.controls;
  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }


  editAddress(): void {
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.editAddress_FormControl());

    this.itre = this.itre + 1;
    // console.log(this.addresses);
    // console.log(this.itre);
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = false;
     // console.log(this.test[index]);


    });
  }

  editAddress_FormControl(): FormGroup {
    return this.fb.group({
      pd_billchild_id: '',
      pd_nextPage_checkbox: '',
      pd_productName_txtbox1: '',
      pd_productName_txtArea: '',
      pd_current_month_str: '',
      pd_quantity_txtbox1: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_OutCall: '',
      pd_CMon: '',
      pd_selectTax: '',
      sub_dis_type: '',
      sub_dis_val: '',
      sub_dis_amt: '',


    });


  }

  removeAddresstest(i: number) {

    // console.log(i)
    // console.log(this.addresses)
    this.addresses.removeAt(i);
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;
    // this.totalCalculate();

  }
  // logo......

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

  removeAddress(i: number) {

    this.addresses.removeAt(i);
    this.totalCalculate();
    // setTimeout(() => {

    //   this.finalDiscountCalc()
    // }, 500);


  }

  removeParticular(i: number) {
  
  //   console.log('Attempting to remove address at index', i);
  // console.log('Form array:', this.addresses); 

    // var pd_billchild_id = $('#pd_billchild_id_' + i).val();
    // console.log("pd_billchild_id-non formarray",pd_billchild_id)
   // alert(pd_billchild_id)  
   
   const othersAddressesArray = this.addPI_section2.get('addresses') as FormArray;
   
   
   const billId_others = othersAddressesArray.at(i).get('pd_billchild_id').value;
  
   // console.log("pd_billchild_id-formarray",billId_others)

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
       // api_ProdAutoFill_req.billchild_id = pd_billchild_id;
        api_ProdAutoFill_req.billchild_id = billId_others;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
         // console.log("response", response);

        });

        setTimeout(() => {
          this.calFinalDiscountCalc();
        }, 1500);


        setTimeout(() => {
          this.totalCalculate();
        }, 1500);


      }
    })

  }


  calFinalDiscountCalc() {

    var final_tot = this.grossTotal;
    var price;
    var fin_disType = $('#final_discount_type').val();
    var fin_dis_val = $('#final_discount_val').val();
    if (fin_disType == 'per') {
      price = (parseFloat(fin_dis_val) * parseFloat(final_tot) / 100).toFixed(2);
      $('#finalDiscount_amt').val(price);

    } else if (fin_disType == 'amt') {
      price = fin_dis_val;
      $('#finalDiscount_amt').val(price);
    }


  }
  finalDiscountCalc() {
    console.log("-----------------------------------------------------")
    var enablePercentabeDiscont = $('#enablePerFinal1').val()
    console.log("enablePercentabeDiscont", enablePercentabeDiscont)
    var enablePriceDiscont = $('#finaldiscountTYpe_amt').val()
    console.log("enablePriceDiscont", enablePriceDiscont)
    var tax_amt = $('#tax_amt_id').val()
    console.log("tax_amt", tax_amt)
    var disType = $('input:radio[name=finaldiscountTYpe]:checked').val();
    console.log("disType", disType)
    var final_tot = this.grossTotal;
    console.log("final_tot-grosstotal", this.grossTotal)

    var price: any;

    $('#final_discount_type').val(disType);
    this.finalDiscountType = disType;

    console.log('disType' + disType + 'final_tot' + final_tot);

    if (disType == 'per') {

      if (enablePercentabeDiscont != '') {

        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
        $('#final_discount').val(price);
        $('#final_discount_val').val(enablePercentabeDiscont);
        this.finalDiscountVal = enablePercentabeDiscont;

      } else {
        $('#final_discount').val('');
        $('#final_discount_val').val('');
        this.finalDiscountVal = '';

        price = 0;

      }

    } else {
      // if (enablePriceDiscont) {
      //   enablePriceDiscont = 0;
      // }

      price = enablePriceDiscont;
      $('#final_discount').val(enablePriceDiscont);
      $('#final_discount_val').val(enablePriceDiscont);
      this.finalDiscountVal = enablePriceDiscont;

    }

    if (this.grandTotal > 0) {
      this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(tax_amt)) - parseFloat(price)).toFixed(2);
    }

   // console.log('grandTotal' + this.grandTotal);
    this.finalDiscount = price

    setTimeout(() => {
      this.totalCalculate();
    }, 1500)


  }


  saveGrossDiscount() {

    $('#discountFormFinal').modal('hide');
    this.finalDiscountCalc();
  }

  totalCalculate() {

    var tax_amt = 0;
    var tax_amt_tot = 0;
    var grs_amt = 0;
    var sub_total_amt = 0;

    let discount_type: any;
    var total_amt: any;
    var dis_amt_val: any;
    var price;
    var total_amt: any;
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;


    this.finalDiscount = $('#finalDiscount_amt').val();


    this.shipping_amt = $('#shipping_amt_id').val();
    this.bankingCharge = $('#bankingCharge_amt_id').val();
    this.finalTax = 0;
    var netAmt = 0;

    for (let a = 0; a < list_cnt; a++) {

      total_amt = $('#pd_qty_' + a).val() * $('#pd_SP_' + a).val();
      $('#pd_Total_' + a).val((total_amt).toFixed(2));


      discount_type = $('#sub_discount_type_' + a).val();
    //  console.log('discount_type' + discount_type);
      if (discount_type == 'per') {
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
      //  console.log('discount_type1111' + this.sub_dis_val);
        if (this.sub_dis_val == '') {
          this.sub_dis_val = 0;
        }
        dis_amt_val = (parseFloat(this.sub_dis_val) * parseFloat(total_amt) / 100).toFixed(2);
       // console.log('dis_amt_val' + dis_amt_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(dis_amt_val);
        
        $('#pd_netPrice_'+a).val((sub_total_amt).toFixed(2));
        $('#sub_discount_'+a).val(dis_amt_val);
      } else if (discount_type == 'amt') {


        this.sub_dis_val = $('#sub_discount_' + a).val();
        if (this.sub_dis_val == '') {
          this.sub_dis_val = 0;
        }

        sub_total_amt = parseFloat(total_amt) - parseFloat(this.sub_dis_val);
        $('#pd_netPrice_' + a).val((sub_total_amt).toFixed(2));
      } else {
        $('#pd_netPrice_' + a).val((total_amt).toFixed(2));
        sub_total_amt = total_amt;
      }

      if ($('#pd_selectTax_' + a).prop('checked') == true && this.tax_per_mod != null) {
        this.net_amt = $('#pd_netPrice_' + a).val();
        netAmt = parseFloat($('#pd_netPrice_' + a).val());
      //  console.log('-this.finalDiscount---' + this.finalDiscount);

        tax_amt_tot += netAmt;

      }

      grs_amt += sub_total_amt;
    }

    this.grossTotalTax = tax_amt_tot;
    this.grossTotal = (grs_amt.toFixed(2));

    var fin_disType = $('#final_discount_type').val();
    var fin_dis_val = $('#final_discount_val').val();
    if (fin_disType == 'per') {
      this.finalDiscount = (parseFloat(fin_dis_val) * parseFloat(this.grossTotalTax) / 100).toFixed(2);


    } else if (fin_disType == 'amt') {
      this.finalDiscount = fin_dis_val;
    }

    // if(this.finalDiscountType_model=='per'){
    //   console.log('new-finalDiscountVal',this.finalDiscountVal);
    //   console.log('new-grossTotal',this.grossTotal);
    //   this.finalDiscount = (((this.grossTotal* this.finalDiscountVal)/100)).toFixed(2);
    //   console.log('new-finalDiscount',this.finalDiscount);

    //  }else if(this.finalDiscountType_model=='amt'){
    //    this.finalDiscount = (this.grossTotal- this.finalDiscountVal);
    //  }

    if (tax_amt_tot > 0) {
      tax_amt_tot = (parseFloat(this.tax_per_mod) * (parseFloat(this.grossTotalTax) - parseFloat(this.finalDiscount)) / 100);
    }

    this.finalTax = tax_amt_tot.toFixed(2);
    if (this.shipping_amt == '') {
      this.shipping_amt = 0;
    }
    if (this.finalDiscount == '') {
      this.finalDiscount = 0;
    }
    if (this.finalTax == '' || isNaN(this.finalTax)) {
      this.finalTax = 0;
    }

    if (this.bankingCharge == '') {
      this.bankingCharge = 0;
    }


    this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(this.finalTax) + parseFloat(this.shipping_amt) + parseFloat(this.bankingCharge)) - parseFloat(this.finalDiscount)).toFixed(2);
    // console.log("this.grossTotal", this.grossTotal);
    // console.log("this.finalTax", this.finalTax);
    // console.log("this.shipping_amt", this.shipping_amt);
    // console.log("this.bankingCharge", this.bankingCharge);
    // console.log("this.finalDiscount", this.finalDiscount);
    // console.log("this.grandTotal", this.grandTotal);

  }



  handleChange_ExportState(data: any, evt: any) {

    this.radioID_Export = data;
    // console.log("evt", evt.target.checked)
    // console.log("evt-value", evt.target.value)
    // console.log("evt-id", evt.target.id)
    this.radio_Value_ExportState = evt.target.value;

   // console.log("radio button value", this.radio_Value_ExportState);

  }
  handleChange_SelectExtraLogo(data: any, evt: any) {

    this.radioID_Logo = data;
    // console.log("evt", evt.target.checked)
    // console.log("evt-value", evt.target.value)
    // console.log("evt-id", evt.target.id)
    this.radio_Value_SelectExtraLogo = evt.target.value;

   // console.log("radio button value", this.radio_Value_SelectExtraLogo);

  }
  handleChange_mileSate_InvoiceType(data: any, evt: any) {

    this.radioID_Logo = data;
    // console.log("evt", evt.target.checked)
    // console.log("evt-value", evt.target.value)
    // console.log("evt-id", evt.target.id)
    this.radio_Value_mileSate_InvoiceType = evt.target.value;

   // console.log("radio button value", this.radio_Value_mileSate_InvoiceType);

  }


  handleChange_MSDisplay(event: any) {
    this.MSDisplay_Value = event.target.checked;
    // console.log(this.MSDisplay_Value);
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
  //  console.log(this.cbk_previousDue)
  }
  cbk_fn_JomPAYLogo(event: any) {
    this.cbk_JomPAYLogo = event.target.checked;
   // console.log(this.cbk_JomPAYLogo)
  }

  cbk_Fn_EditShipAddress(event: any) {
    this.EditShippingAddress = event.target.checked;
  //  console.log(this.EditShippingAddress)

    if (this.EditShippingAddress) {

      this.addPI_section1.get("ship_to").disable();
      this.addPI_section1.get("shipTo_1").disable();
      this.addPI_section1.get("shipTo_2").disable();
      this.addPI_section1.get("shipTo_3").disable();

    }
    else {

      this.addPI_section1.get("ship_to").enable();
      this.addPI_section1.get("shipTo_1").enable();
      this.addPI_section1.get("shipTo_2").enable();
      this.addPI_section1.get("shipTo_3").enable();


    }
    // console.log(this.EditShippingAddress)
  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {

   // console.log(item)

  }
  onFocusedCustomer(e: any) {

  }
  EditCHK_MileDiscount(data: any, event: any) {
   // console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_MileDiscount = data;
    this.checkbox_value_MileDiscount = event.target.checked;
   // console.log(this.checkbox_value_MileDiscount)
    if (this.checkbox_value_MileDiscount) {

      this.edit_array_MileDiscount.push(data);
      this.edit_array_MileDiscount.join(',');
     // console.log("Final Checkbox After checkbox selected list", this.edit_array_MileDiscount);
    }
    else {
      const index = this.edit_array_MileDiscount.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_MileDiscount.splice(index, 1);
      }
     // console.log("Final Checkbox After Deselected selected list", this.edit_array_MileDiscount)

    }
  }
  EditCHK_ExtraLogo(data: any, event: any) {
   // console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_ExtraLogo = data;
    this.checkbox_value_ExtraLogo = event.target.checked;
    // console.log(this.checkbox_value_ExtraLogo)
    if (this.checkbox_value_ExtraLogo) {

      this.edit_array_ExtraLogo.push(data);
      this.edit_array_ExtraLogo.join(',');
     //  console.log("Final Checkbox After checkbox selected list", this.edit_array_ExtraLogo);
    }
    else {
      const index = this.edit_array_ExtraLogo.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_ExtraLogo.splice(index, 1);
      }
    //  console.log("Final Checkbox After Deselected selected list", this.edit_array_ExtraLogo)

    }
  }
  getProformaBillerDetails() {

    let api_req: any = new Object();
    let add_BillerDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_proforma_biller_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_BillerDetails_req.action = "get_proforma_biller_details";
    add_BillerDetails_req.billerId = this.addPI_section1.value.companyName;
    api_req.element_data = add_BillerDetails_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     // console.log(response);


      if (response != '') {
        this.getProformaBillerDetails_tinName = response.biller_details[0].tinName;
        this.getProformaBillerDetails_tinNo = response.biller_details[0].tinNo;
        this.getProformaBillerDetails_cstName = response.biller_details[0].cstName;
        this.getProformaBillerDetails_cstNo = response.biller_details[0].cstNo;
        this.addPI_section1.patchValue({
          'tin': response.biller_details[0].tinNo,
          'cst': response.biller_details[0].cstNo,


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
    addAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      this.currencyNameList = response.currency_list;
      this.ShipByList = response.ship_by;
      this.salesRepList = response.sales_rep;
      this.paymentviaList = response.paymentvia;


   //   console.log("response-load-pi", response)
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
    api_TaxDropdown_req.billerId = this.addPI_section1.value.companyName;
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

       // console.log('response.default_tax_id' + response.default_tax_id);



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
    api_Search_req.billerId = this.addPI_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
    //  console.log("vignesh-customer_name response", response.customer_list.customerId);
      this.searchResult = response.customer_list;

      if (response.status = true) {

        this.addPI_section1.patchValue({
          "customer_id_hd": response.customer_list.customerId
        })

      }

    });

  }
  searchCustomer_selectDropdownData(data: any) {
    // alert(2)
    this.spinner.show();
    // console.log("search data in dropdown", data)
    // console.log("search data-customer Id", data.customerId)
    this.customerName_Data = data.customerId;
    this.customerName_Change = data.customerName;
    // console.log("this.customerName_Data",this.customerName_Data);
    // console.log("this.customerName_Change",this.customerName_Change);

    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "customer_address_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.billerId = this.addPI_section1.value.companyName;
    api_SearchCUST_req.customerId = this.customerName_Data
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

        this.addPI_section1.patchValue({
          'address_1': response.customer_details.customerAddress1,
          'address_2': response.customer_details.customerAddress2,
          'address_3': response.customer_details.customerAddress3,
          'Attn_1': response.customer_details.kind_Attention,
          'ship_to':  response.customer_details.ship_to,
          'shipTo_1': response.customer_details.ship_customerAddress1,
          'shipTo_2': response.customer_details.ship_customerAddress2,
          'shipTo_3': response.customer_details.ship_customerAddress3,
          'ship_attn': response.customer_details.ship_attn,
          'cusInvoiceNo': response.customer_invoice_no,
        });
        // console.log(this.addPI_section1);

      }
      else {

      }

    });
  }


  getCustomerInvoiceDetails(event: any) {
    this.spinner.show();
    this.billerID = event.target.value;
  //  console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_customer_inv_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_customer_inv_details";
    api_getInvoiceDetails_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getInvoiceDetails_req.billerId = this.billerID;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.addPI_section1.patchValue({

          'invoiceNo': response.invoice_no,
          'Currency': response.currency_id,
          'CurrencyConversionRate':response.currencyValue

        });


      }
      else {
        this.addPI_section1.patchValue({

          'invoiceNo': '',
          'Currency': '',
        });
      }

    });

  }
  editInvoice() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_editPI_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/edit_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPI_req.action = "edit_invoice";
    api_editPI_req.user_id = localStorage.getItem('erp_c4c_user_id');


    if (this.edit_Duplicate_ID == 'undefined' || this.edit_Duplicate_ID == undefined) {

      api_editPI_req.duplicateState = 0;

      api_editPI_req.billId = this.editbillerID;

    } else {


      api_editPI_req.duplicateState = 1;
      api_editPI_req.billId = this.edit_Duplicate_ID;
    }

    api_req.element_data = api_editPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.spinner.hide();
        this.shipAdd_Edit = response.billing_pararent_details[0].s_address
        this.userID_Edit = response.billing_pararent_details[0].billGeneratedBy
        this.billID_Edit = response.billing_pararent_details[0].billId;
        this.billerID_Edit = response.billing_pararent_details[0].billerId;
        this.exportState_value = response.billing_pararent_details[0].export_state;
        this.mileDiscountState_value = response.billing_pararent_details[0].mile_discount_state;
        this.billsLogo_value = response.billing_pararent_details[0].bills_logo_id;
        this.customerID_value =response.billing_pararent_details[0].custId
        this.radio_Value_ExportState = response.billing_pararent_details[0].export_state;
        this.radio_Value_SelectExtraLogo = response.billing_pararent_details[0].bills_logo_id;
        this.radio_Value_mileSate_InvoiceType = response.billing_pararent_details[0].mile_discount_state;
       // console.log(response.billing_pararent_details[0].currency)
        $('#curren').val(response.billing_pararent_details[0].currency);
        this.invoiceAddSignatureEdit(response.billing_pararent_details[0].signatureId);


        this.customerName_Data = response.billing_pararent_details[0].custId;
        this.customerName_Change = response.billing_pararent_details[0].b_name;

        this.addPI_section1.patchValue({
          'billId_edit': response.billing_pararent_details[0].billId,
          'companyName': response.billing_pararent_details[0].billerId,
          'BillTo': response.billing_pararent_details[0].b_name,
          'customer_name': response.billing_pararent_details[0].b_name,
          'customer_id_hd': response.billing_pararent_details[0].custId,
          'address_1': response.billing_pararent_details[0].b_address,

          'Attn_1': response.billing_pararent_details[0].b_attn,

          'Attn_2': response.billing_pararent_details[0].s_attn,
          'Ref': response.billing_pararent_details[0].ref,

          'invoiceNo': response.billing_pararent_details[0].invoice_no,
          'cusInvoiceNo': response.billing_pararent_details[0].cus_invoice_no,
          'tin': response.billing_pararent_details[0].tinNo,
          'cst': response.billing_pararent_details[0].cstNo,
          'Date': response.billing_pararent_details[0].billDate,
          'PoNo': response.billing_pararent_details[0].po_no,
          'PoDate': response.billing_pararent_details[0].po_date,
          'salesRep': response.billing_pararent_details[0].sales_rep,
          'ShipBy': response.billing_pararent_details[0].ship_by,
          'ShipDate': response.billing_pararent_details[0].ship_date,
          'terms': response.billing_pararent_details[0].terms,
          'Currency': response.billing_pararent_details[0].currency,
          'CurrencyConversionRate': response.billing_pararent_details[0].conversionRate,
          'PaymentVia': response.billing_pararent_details[0].paymentVIA,
          'ReferenceResellerName': response.billing_pararent_details[0].reference_reseller_name,
          'ExtraLogo': response.billing_pararent_details[0].bills_logo_id,
          'CAS_Cbk': response.billing_pararent_details[0].add_exchange_rate_state,
          'DWT_Cbk': response.billing_pararent_details[0].dw_tax_state,

        });

      //  console.log('billchild_details.length' + response.billchild_details.length);
        this.Customer_selectDropdownData(response.billing_pararent_details[0].custId);

        this.TaxDropdown();


        const formArray = new FormArray([]);
        for (let index = 0; index < response.billchild_details.length; index++) {

        //  console.log('billchild_details++index' + index);


          formArray.push(this.fb.group({
            "pd_billchild_id": response.billchild_details[index].billChildid,
            "pd_nextPage_checkbox": response.billchild_details[index].to_next_page == 1 ? true : false,

            "pd_productName_txtbox1": response.billchild_details[index].productName,
            "pd_productName_txtArea": response.billchild_details[index].productDesc,
            "pd_quantity_txtbox1": response.billchild_details[index].quantity,
            "pd_current_month_str": response.billchild_details[index].current_month_str,
            "pd_unit": response.billchild_details[index].unit,
            "pd_sellingPrice": response.billchild_details[index].rate,
            "pd_Total": response.billchild_details[index].total_amt,
            "pd_netPrice": response.billchild_details[index].net_amt,
            "pd_OutCall": response.billchild_details[index].out_call_state == 1 ? true : false,
            "sub_dis_amt": response.billchild_details[index].dis_amt,
            "sub_dis_type": response.billchild_details[index].dis_type,
            "sub_dis_val": response.billchild_details[index].dis_per,
            "pd_CMon": response.billchild_details[index].current_month == 1 ? true : false,
            "pd_selectTax": response.billchild_details[index].exc_tax_state == 1 ? true : false,


          })

          );
        }


      //  console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
      //  console.log(this.addresses)


        this.finalDiscountType = '';
        this.finalDiscountVal = '';


        if (response.billing_pararent_details[0].discountPer != '') {
          this.finalDiscountType = 'per';
          this.finalDiscountVal = response.billing_pararent_details[0].discountPer;

        }
        else if (response.billing_pararent_details[0].discountAmount != '') {
          this.finalDiscountType = 'amt';
          this.finalDiscountVal = response.billing_pararent_details[0].discountAmount;

        }

        this.addPI_section3.patchValue({
          //row-1

          'section3_gross_total': response.billing_pararent_details[0].grossAmount,
          //row-2

          'section3_discount_txtbox': response.billing_pararent_details[0].discountAmount,
          'final_dis_val': this.finalDiscountVal,
          'final_dis_type': this.finalDiscountType,

          //row-3
          'section3_gst_dropdown': response.billing_pararent_details[0].taxId,
          'section3_taxAmt_txtbox': response.billing_pararent_details[0].taxAmt,
          'section3_tax_per_hd': response.billing_pararent_details[0].taxPer,
          //row-4
          'section3_shipping_amt_name_txtbox': response.billing_pararent_details[0].shippingName,
          'section3_shipping_amt_txtbox': response.billing_pararent_details[0].shippingAmt,
          'banking_charge_name': response.billing_pararent_details[0].add_name,

          'banking_charge_amt': response.billing_pararent_details[0].add_amt,
          //row-5
          'section3_grand_total': response.billing_pararent_details[0].netPayment,
          //row-7
          'section3_remarks': response.billing_pararent_details[0].remarks,
          'section3_previousDue': response.billing_pararent_details[0].previous_due_state,

          //row-8
          'section3_termCondition': response.billing_pararent_details[0].terms_condition_optional,
          'section3_Terms1': response.billing_pararent_details[0].terms_cond1,
          'section3_Terms2': response.billing_pararent_details[0].terms_cond2,
          'section3_Terms3': response.billing_pararent_details[0].terms_cond3,
          'section3_Terms4': response.billing_pararent_details[0].terms_cond4,
          'section3_Terms5': response.billing_pararent_details[0].terms_cond5,
          //row-9
          'section3_receivedAuthorizedSignature': response.billing_pararent_details[0].received_signature,
          //row-10
          'section3_logo': response.billing_pararent_details[0].print_logo,
          'section3_select_additional_signature': response.quot_signature_show_state,
        });

       // console.log('==finalDiscountVal==' + this.finalDiscountVal);
        this.received_signature_state = response.billing_pararent_details[0].received_signature;
        this.print_logo_state = response.billing_pararent_details[0].print_logo;


        this.editAddress();
        this.removeAddresstest(response.billchild_details.length);

        for (let index = 0; index < response.billchild_details.length; index++) {

          if (response.billchild_details[index].header_split == 1) {

            $('#pd_split_' + [index]).prop('checked', false);
            setTimeout(() => {
              $('#pd_split_' + [index]).click();
            }, 1000);


          }
        }

        this.getProformaBillerDetails();

        // setTimeout(() => {

        //   this.totalCalculate()
        // }, 1500);

        // setTimeout(() => {

        //   $('#billerIDs').val(this.TaxValuEDIt);
        //   $('#tax_amt_id').val(this.TaxAmtEDIt);
          
          
        // }, 3000);

        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        iziToast.warning({
          message: "Quotation not updated. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        }); this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      }

    this.spinner.hide();

  }



  Customer_selectDropdownData(customerId: any) {
  
  
  this.spinner.show();
    this.customerName_Data = customerId;
    // console.log("this.customerName_Data",this.customerName_Data)
    // console.log("this.customerName_Change",this.customerName_Change)
 
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
        
    api_SearchCUST_req.billerId = this.addPI_section1.value.companyName;
    api_SearchCUST_req.customerId = customerId;
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

    //  console.log("customer_address_details---response", response)
      if (response.status == true) {

        this.spinner.hide();

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
        this.addPI_section1.patchValue({

          'address_1': response.customer_details.customerAddress1,
          'address_2': response.customer_details.customerAddress2,
          'address_3': response.customer_details.customerAddress3,
          'Attn_1': response.customer_details.kind_Attention,
          'ship_to':  response.customer_details.ship_to,
          'shipTo_1': response.customer_details.ship_customerAddress1,
          'shipTo_2': response.customer_details.ship_customerAddress2,
          'shipTo_3': response.customer_details.ship_customerAddress3,
          'ship_attn': response.customer_details.ship_attn,

        //  'cusInvoiceNo': response.customer_invoice_no,
        });
      }
      else {
        this.spinner.hide();
        this.addPI_section1.patchValue({
          'address_1': '',
          'address_2': '',
          'address_3': '',
          'Attn_1': '',
          'ship_to': '',
          'shipTo_1': '',
          'shipTo_2': '',
          'shipTo_3': '',
          'ship_attn': '',
        });
      }

    });
  }

  clearSelection(event:any){
    this.customerName_Data='';
    this.customerName_Change='';
  }

  updateInvoice() {
 
  
    console.log("alert(this.customerName_Change)",this.customerName_Change)
    console.log("alert(this.customerName_Data)",this.customerName_Data)
    var vv = this.addPI_section1.value.shipTo_3;
    this.spinner.show();
    this.addPI_section1.get("ship_to").enable();
    this.addPI_section1.get("shipTo_1").enable();
    this.addPI_section1.get("shipTo_2").enable();
    this.addPI_section1.get("shipTo_3").enable();

    let api_req: any = new Object();
    let api_updatePI_req: any = new Object();
    api_req.moduleType = "invoice";
    // if(this.edit_Duplicate_ID=='undefined'  ){

    //   api_req.api_url = "invoice/update_invoice";

    // }else{

    //   api_req.api_url = "invoice/insert_invoice";

    // }

    if (this.edit_Duplicate_ID == 'undefined' || this.edit_Duplicate_ID == undefined) {
      api_req.api_url = "invoice/update_invoice";

    } else {

      api_req.api_url = "invoice/duplicate_invoice";

    }

    // api_req.api_url = "invoice/update_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updatePI_req.action = "update_proforma_invoice";
    api_updatePI_req.user_id = localStorage.getItem('erp_c4c_user_id');

    console.log('this.addPI_section3.value.billId_edit' + this.addPI_section1.value.billId_edit);
    api_updatePI_req.billId = this.addPI_section1.value.billId_edit;
    api_updatePI_req.billerId = this.addPI_section1.value.companyName;
    api_updatePI_req.invoice_no = this.addPI_section1.value.invoiceNo;
   
    api_updatePI_req.cus_invoice_no = $('#cusInvNo').val();
  
    if(this.customerName_Data==null || this.customerName_Data==''){
      this.spinner.hide();
      iziToast.error({
        message: "Bill To is empty",
        position: 'topRight'
      });
      return false;
    }else{
     
      api_updatePI_req.customerId = this.customerName_Data;
    }
    
    if(this.customerName_Change==null || this.customerName_Change==''){
      this.spinner.hide();
      iziToast.error({
        message: "Bill To is empty",
        position: 'topRight'
      });
      return false;
    }else{
     
      api_updatePI_req.b_name = this.customerName_Change;
    }

   // api_updatePI_req.b_name = this.customerName_Change;
    api_updatePI_req.tinNo = this.addPI_section1.value.tin;
    api_updatePI_req.b_address1 = this.addPI_section1.value.address_1;
    api_updatePI_req.b_address2 = this.addPI_section1.value.address_2;
    api_updatePI_req.b_address3 = this.addPI_section1.value.address_3;
    api_updatePI_req.cstNo = this.addPI_section1.value.cst;
    api_updatePI_req.billDate = this.addPI_section1.value.Date;
    api_updatePI_req.b_attn = this.addPI_section1.value.Attn_1;
   // api_updatePI_req.s_name = this.addPI_section1.value.ship_to;
    api_updatePI_req.searchFlag =this.searchFlag;

    if(this.addPI_section1.value.shipTo_1==null){
      api_updatePI_req.ship_address_1 =this.shipAddress1_Final 
    }else{
      api_updatePI_req.ship_address_1 = this.addPI_section1.value.shipTo_1
    }
    if(this.addPI_section1.value.shipTo_2==null){
      api_updatePI_req.ship_address_2 =this.shipAddress2_Final 
    }else{
      api_updatePI_req.ship_address_2 = this.addPI_section1.value.shipTo_2
    }

    if(this.addPI_section1.value.shipTo_3==null){
      api_updatePI_req.ship_address_3 =this.shipAddress3_Final 
    }else{
      api_updatePI_req.ship_address_3 = this.addPI_section1.value.shipTo_3
    }

    if (this.addPI_section1.value.ship_to == undefined) {
      api_updatePI_req.s_name =  this.ship_to_str_Final;

    }
    else {
      api_updatePI_req.s_name = this.addPI_section1.value.ship_to;
    }

      api_updatePI_req.po_no = this.addPI_section1.value.PoNo;

    api_updatePI_req.po_date = this.addPI_section1.value.PoDate;
    api_updatePI_req.sales_rep = this.addPI_section1.value.salesRep;
    api_updatePI_req.ship_by = this.addPI_section1.value.ShipBy;
    api_updatePI_req.ship_date = this.addPI_section1.value.ShipDate;
    api_updatePI_req.s_attn = this.addPI_section1.value.Attn_2;
    api_updatePI_req.ref = this.addPI_section1.value.Ref;
    api_updatePI_req.terms = this.addPI_section1.value.terms;
    api_updatePI_req.currency = this.addPI_section1.value.Currency;
    api_updatePI_req.paymentVIA = this.addPI_section1.value.PaymentVia;
    api_updatePI_req.conversionRate = this.addPI_section1.value.CurrencyConversionRate;

    api_updatePI_req.reference_reseller_name = this.addPI_section1.value.ReferenceResellerName;

    api_updatePI_req.bills_logo_id = this.addPI_section1.value.ExtraLogo;


    api_updatePI_req.bills_logo_id = this.radio_Value_SelectExtraLogo;
    api_updatePI_req.export_state = this.radio_Value_ExportState;
    api_updatePI_req.mile_discount_state = this.radio_Value_mileSate_InvoiceType;
    api_updatePI_req.mile_discount_display_state = this.MSDisplay_Value;

    api_updatePI_req.add_exchange_rate_state = this.addPI_section1.value.CAS_Cbk;
    api_updatePI_req.dw_tax_state = this.addPI_section1.value.DWT_Cbk;


    //section-2
    // api_UpdateEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;



    //section-3

    //row-1

    api_updatePI_req.grossAmount = this.addPI_section3.value.section3_gross_total;
    //row-2


    // api_updatePI_req.discountAmount = this.addPI_section3.value.section3_discount_txtbox;
    // api_updatePI_req.final_dis_type = $('#final_discount_type').val();
    // api_updatePI_req.discountPer = this.addPI_section3.value.final_dis_val;

    api_updatePI_req.discountAmount = $('#finalDiscount_amt').val();
    api_updatePI_req.final_dis_type = $('#final_discount_type').val();
    api_updatePI_req.discountPer = $('#final_discount_val').val();
    //row-3
    api_updatePI_req.taxId = this.addPI_section3.value.section3_gst_dropdown;
    api_updatePI_req.taxPer = $('#tax_per_hd_id').val();

    api_updatePI_req.taxAmt = this.addPI_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_updatePI_req.shippingName = this.addPI_section3.value.section3_shipping_amt_name_txtbox;
    api_updatePI_req.shippingAmt = this.addPI_section3.value.section3_shipping_amt_txtbox;

    api_updatePI_req.add_name = this.addPI_section3.value.banking_charge_name;
    api_updatePI_req.add_amt = this.addPI_section3.value.banking_charge_amt;


    //row-5
    api_updatePI_req.netPayment = this.addPI_section3.value.section3_grand_total;
    //row-6
    api_updatePI_req.remarks = this.addPI_section3.value.section3_remarks;
    api_updatePI_req.previous_due_state = this.addPI_section3.value.section3_previousDue;
    //other row

    api_updatePI_req.terms_cond_chk = this.addPI_section3.value.section3_termCondition;
    api_updatePI_req.terms_cond1 = this.addPI_section3.value.section3_Terms1;
    api_updatePI_req.terms_cond2 = this.addPI_section3.value.section3_Terms2;
    api_updatePI_req.terms_cond3 = this.addPI_section3.value.section3_Terms3;
    api_updatePI_req.terms_cond4 = this.addPI_section3.value.section3_Terms4;
    api_updatePI_req.terms_cond5 = this.addPI_section3.value.section3_Terms5;


    api_updatePI_req.received_signature = this.checkbox_selectReceivedSignature;
    api_updatePI_req.logo = this.addPI_section3.value.section3_logo;
    api_updatePI_req.signatureId = this.addPI_section3.value.section3_select_additional_signature;


    var addr = this.addPI_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
      console.log('pd_billchild_id_' + $('#pd_billchild_id_' + i).val())
      addr[i].pd_billchild_id = $('#pd_billchild_id_' + i).val();
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_current_month_str = $('#pd_current_month_str_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_dis_amt = $('#sub_discount_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
      addr[i].pd_split = $('#pd_split_' + i).prop('checked');
      addr[i].to_next_page = $('#to_next_page_' + i).prop('checked');
      addr[i].pd_selectTax = $('#pd_selectTax_' + i).prop('checked');
      addr[i].pd_GPTotal = $('#pd_GPTotal_' + i).prop('checked');
    }
    api_updatePI_req.billchild_values = addr;


    api_req.element_data = api_updatePI_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      console.log("add quotation new save", response);
      if (response.status == true) {
        this.upd_flagName=response.searchFlag;
        this.upd_search_name=response.search_name;
        this.spinner.hide();
        this.goBack();
        iziToast.success({
          title: 'Updated',
          position: 'topRight',
          message: 'Invoice Updated Successfully !',
        });
        setTimeout(() => {
         
          console.log("search_values",this.search_values)
          this.serverService.invoice_search1.next(this.search_values);
        }, 1000);

        setTimeout(() => {
         
          this.router.navigate(['/invoice'], {
            queryParams: {
              upd_searchFlag: this.upd_flagName,
              upd_search_name: this.upd_search_name
            }
          });
        }, 2000);
        
        this.goBack();
      

      }else if(response.status == false){
        this.spinner.hide();
        iziToast.error({
          title: 'Not Updated',
          position: 'topRight',
          message: 'Invoice not Updated  !',
        });
      }
      else {
        this.spinner.hide();

        iziToast.warning({
          message: "Invoice Not Saved Successfully",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      this.spinner.hide();
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
    this.goBack();
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
    api_getInvoiceDetails_req.billerId = this.addPI_section1.value.companyName;
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

      this.finalTax = parseFloat(tax).toFixed(2);

    });

    // this.totalCalculate();
    setTimeout(() => {

      this.totalCalculate();
    }, 1000)
    // this.finalDiscountCalc();

  }



  keyPress(event: any, i: any) {
    this.invocePriceKey = i;
    // alert(this.invocePriceKey)
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


  saveDiscount() {


    var enablePerFinal = $('#enablePerFinal').val()
    var enablePriceFinal = $('#enablePriceFinal').val()
    var disType = $('input:radio[name=discountTYpe]:checked').val();
    var final_tot = $('#pd_Total_' + this.invocePriceKey).val();
    console.log('final_ tot', final_tot);

    $('#sub_discount_type_' + this.invocePriceKey).val(disType);
    var price: any;
    if (disType == 'per') {

      if (enablePerFinal != '') {
        console.log('3333' + final_tot);
        price = (parseFloat(enablePerFinal) * parseFloat(final_tot) / 100).toFixed(2);

        console.log('1...price...', price);


        $('#sub_discount_' + this.invocePriceKey).val(price);
        $('#sub_discount_val_' + this.invocePriceKey).val(enablePerFinal);
        price = final_tot - price;
      } else {
        $('#sub_discount_' + this.invocePriceKey).val('');
        $('#sub_discount_val_' + this.invocePriceKey).val('');

        price = final_tot;
        console.log('final_tot....', final_tot);
        console.log('price....', price);
      }


    } else {
      price = final_tot - enablePriceFinal;
      console.log('price...', price);

      $('#sub_discount_' + this.invocePriceKey).val(enablePriceFinal);
      $('#sub_discount_val_' + this.invocePriceKey).val(enablePriceFinal);


    }
    $('#pd_netPrice_' + this.invocePriceKey).val(price)

    var gtotel = 0;
    if (this.itre == 0) {
      gtotel = price;
    } else {
      for (let k = 0; k <= this.itre; k++) {
        gtotel += parseFloat($('#pd_netPrice_' + k).val());
      }
    }
    this.grossTotal = gtotel;

    $('#discountFormId').modal('hide');
    this.Discount1Form.reset();

    this.totalCalculate();

  }
  calculateDiscount(val: any) {
    this.invocePriceKey = val;
    this.row_cnt_mod = val;
    var row_cnt = val;
    var sub_dis_val = 0;

    console.log('row_cnt' + row_cnt);
    $('#enablePerFinal').val('');
    $('#enablePriceFinal').val('');

    var disType = $('#sub_discount_type_' + row_cnt).val();

    if (disType == 'per') {
      $('#discountTYpe_per').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();

      $('#enablePerFinal').val(sub_dis_val);


    } else if (disType == 'amt') {
      $('#discountTYpe_amt').prop('checked', true);
      sub_dis_val = $('#sub_discount_' + row_cnt).val();
      $('#enablePriceFinal').val(sub_dis_val);


    } else {

      $('#discountTYpe_per').prop('checked', false);
      $('#discountTYpe_amt').prop('checked', false);
    }
  }



  discount_dynamic_cal() {
    var final_discount_type = $('#final_discount_type').val();
    var final_discount_val = $('#final_discount_val').val();
    var finalDiscount_amt = $('#finalDiscount_amt').val();

    if (final_discount_type == 'per') {
      this.finalDiscount = (parseFloat(this.grossTotal) * parseFloat(final_discount_val) / 100).toFixed(2);
    }
    setTimeout(() => {
      this.totalCalculate();
    }, 1500);

  }


  calFinalDiscount() {

    $('#enablePerFinal1').val('');
    $('#finaldiscountTYpe_amt').val('');
    var final_dis_val = 0;
    var disType = $('#final_discount_type').val();
    console.log('111' + disType);
    if (disType == 'per') {
      $('#finaldiscountType_per').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();

      $('#enablePerFinal1').val(final_dis_val);
      console.log('22' + disType);
    } else if (disType == 'amt') {
      $('#finaldiscountType_amt').prop('checked', true);
      final_dis_val = $('#finalDiscount_amt').val();
      $('#finaldiscountTYpe_amt').val(final_dis_val);
      console.log('33' + disType);
    } else {
      console.log('44' + disType);
      $('#finaldiscountTYpe_per').prop('checked', false);
      $('#finaldiscountTYpe_amt').prop('checked', false);
    }


  }




  set_display_none(cnt: any) {
    //PN
    if ($('#pd_split_' + cnt).prop('checked') == true) {
      $('#pd_productName_txtArea_' + cnt).fadeOut(1000);
      $('#pd_qty_' + cnt).fadeOut(1000);
      $('#pd_unit_' + cnt).fadeOut(1000);
      $('#pd_SP_' + cnt).fadeOut(1000);
      $('#discount_btn_' + cnt).fadeOut(1000);
      $('#pd_Total_' + cnt).fadeOut(1000);
      $('#sub_discount_' + cnt).fadeOut(1000);
      $('#pd_netPrice_' + cnt).fadeOut(1000);

      $('#pd_productName_txtArea_' + cnt).val('');
      $('#pd_qty_' + cnt).val('');
      $('#pd_unit_' + cnt).val('');
      $('#pd_SP_' + cnt).val('');
      $('#discount_btn_' + cnt).val('');
      $('#pd_Total_' + cnt).val('');
      $('#sub_discount_' + cnt).val('');
      $('#pd_netPrice_' + cnt).val('');

    } else {
      $('#pd_productName_txtArea_' + cnt).fadeIn(1000);
      $('#pd_qty_' + cnt).fadeIn(1000);
      $('#pd_unit_' + cnt).fadeIn(1000);
      $('#pd_SP_' + cnt).fadeIn(1000);
      $('#discount_btn_' + cnt).fadeIn(1000);
      $('#pd_Total_' + cnt).fadeIn(1000);
      $('#sub_discount_' + cnt).fadeIn(1000);
      $('#pd_netPrice_' + cnt).fadeIn(1000);
    }
  }

  goBack() {
    this.router.navigate(['/invoice']);

  }

  clearInput1() {
    this.input2 = '';
    $("#enablePriceFinal").val('')
  }

  clearInput2() {
    this.input1 = '';
    $("#enablePerFinal1").val('');
  }

  clearInput3() {
    this.input4 = '';
    $("#finaldiscountTYpe_amt").valueOf('');
  }
  clearInput4() {
    this.input3 = '';
    $("#enablePerFinal1").val('');
  }

  clearInput5() {
    this.input6 = '';
    $("#finaldiscountTYpe_amt").val('');
  }
  clearInput6() {
    this.input5 = '';
    $("#enablePerFinal1").val('');
  }





  eventCheckSelectReceivedSignature(e: any) {
    this.checkbox_selectReceivedSignature = e.target.checked
    console.log(this.checkbox_selectAdditionalSignature);
  }

  eventCheckSelectAdditionalSignature(e: any) {
    if (this.invoiceAddSignature_state == 1) {
      if (e.target.checked == true) {
        $('#signature_img_id').css("display", "block");
      } else {
        $('#signature_img_id').css("display", "none");
      }
    } else {
      $('#signature_message_id').css("display", "block");
    }
    this.checkbox_selectAdditionalSignature = e.target.checked
    console.log(this.checkbox_selectAdditionalSignature);
  }

  invoiceAddSignatureEdit(sign_val: any) {

    let api_req: any = new Object();
    let api_invoiceAddSignatureEdit_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_add_signature_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceAddSignatureEdit_req.action = "invoice_add_signature_edit";

    api_invoiceAddSignatureEdit_req.user_id = this.userID_Edit;

    api_invoiceAddSignatureEdit_req.billerId =    this.billerID_Edit;
    api_invoiceAddSignatureEdit_req.billId = this.billID_Edit;
    api_req.element_data = api_invoiceAddSignatureEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    //  console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {

        this.invoiceAddSignature_state = response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        if (sign_val == 0) {
         // console.log('response.signature_filename' + response.signature_filename);
          this.invoiceAddSignature_filename = response.signature_filename;
        }
        this.invoiceAddSignature_filename = response.signature_filename;

        this.invoiceAddSignatureCHKShowState = response.invoice_signature_show_state;

        this.addPI_section3.patchValue({
          //section-3

          //row-9
          //     'section3_select_additional_signature': response.quot_signature_show_state,

        });
      }
      else {

      }


    });


  }


}
