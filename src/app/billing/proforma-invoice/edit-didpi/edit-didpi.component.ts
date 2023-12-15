import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-didpi',
  templateUrl: './edit-didpi.component.html',
  styleUrls: ['./edit-didpi.component.css']
})
export class EditDidpiComponent implements OnInit {

  public addDid_section1: FormGroup;
  public addDid_section3: FormGroup;
  public did_Invice_fixed_charges: FormGroup;
  public did_Invice_usage_Charges: FormGroup;
  public did_Invice_other_charges: FormGroup;

  public fixedAddresses: FormArray;
  public usageAddress: FormArray;
  public otherAddress: FormArray;
  isReadOnly: boolean = false;

  editbillerID: any;
  companyNameList: any
  currencyNameList: any;
  ShipByList: any;
  salesRepList: any;
  paymentviaList: any;
  BillCodeList: any;
  billerID: any;
  getCurrencyCode: any;
  CurrencyConversionRateDefault: any = 1;
  //auto complete
  searchResult: any;
  TaxDropdownList: any;
  customerName_Data: any;
  //search textbox
  customer_ID: any;
  customer_NAME: any;
  //checkbox group select-logo
  groupSelectCommonId_ExtraLogo: any;
  checkbox_value_ExtraLogo: any;
  salesRepDropDown_Textbox_Status: any;
  SalesRepList: any;

  //getProformaBillerDetails
  getProformaBillerDetails_BillerID: any;
  getProformaBillerDetails_tinName: any;
  getProformaBillerDetails_tinNo: any;
  getProformaBillerDetails_cstName: any;
  getProformaBillerDetails_cstNo: any;
  // DID disconut popup

  public FixedDiscountForm: FormGroup;
  public UsageDiscountForm: FormGroup;
  public OtherDiscountForm: FormGroup;
  public FinalDiscountForm: FormGroup;
  // DID Commission popup
  public DidCommissionForm: FormGroup;
  demo1='1900';
  //commision
  usersearchResult: any;
  //commission
  resellerName: any;
  resellerID: any;
  commissionType: any;
  commissionValue: any;
  commissionAmount: any;


  test: boolean[] = [];
  itre = 0;

  //calculation
  finalDiscount: any;
  finalDiscountType: any;
  finalDiscountVal: any;
  sub_dis_val: any;
  sub_dis_type: any;
  grandTotal: any;
  grossTotal: any;
  finalTax: any;
  tax_per_hd = 0;
  tax_per_mod: any;
  extraCharge = 0;
  bankingCharge: any;
  net_amt: any;
  shipping_amt: any;
  invocePriceKey: any;
  row_cnt_mod: any;
  sub_total_glb1: any;
  sub_total_glb2: any;

  //export state-check box
  export_state: any;
  radioSelectFooter: any = '1';
  export_state_Local: boolean = true;
  export_state_Export: any;
  export_state_ZeroValid: boolean = true;
  MSDisplay_Value: boolean = true;

  //extra logo
  ExtralogoValue: any;
  //checkbox
  mile_check_value: any;
  dynamicCheckboxwithKey: any;
  SelectExtraLogoCheckboxwithKey: any;
  //  quotationAddSignature
  quotationAddSignature_state: any;
  quotationAddSignature_filename: any;
  selectAdditionalSign: boolean = true;
  editDIDStateID: any;
  //dropdown
  CustomerBillCodeArray: any;
  //ngmodal-clear
  txtbox_percentPriceClear: string;
  txtbox_directPriceClear: string;
  FinalDiscount_percentPriceClear: string;
  FinalDiscount_directPriceClear: string;
  UsageSave_percentPriceClear: string;
  UsageSave_directPriceClear: string;
  OtherSave_percentPriceClear: string;
  OtherSave_directPriceClear: string;
  //edit
  did_bill_code: any;
  EditShippingAddress: boolean = false;
  billsLogo_value: any;
  radioID_Logo: any;
  radio_Value_SelectExtraLogo: any;
  exportState_Radio: any;
  exportState_value: any;
  radioID_Export: any;
  radio_Value_ExportState: any;
  //section-3

  chkTermsandcondition: boolean = false;
  chklogoAddressSignature: boolean = true;
  previousDue: boolean = true;
  chkReceivedAuthorizedSignature: boolean = true;
  cbk_previousDue: any;
  did_bill_code_section15: any;
  //  quotationAddSignature

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

  //section 3 select terms condition
  section3_Terms1: any;
  section3_Terms2: any;
  section3_Terms3: any;
  section3_Terms4: any;
  section3_Terms5: any;
  checkbox_selectReceivedSignature: any;

  checkbox_selectAdditionalSignature: any;

  selectReceivedSign: boolean = true;
  received_signature_state: any;
  print_logo_state: any;
  did_bill_code_section1: any;
  Jompay_Value: any;
  did_bill_code_value: any;
  //billco
  grossTotal_BeforeDiscount: any;
  taxValue: any;

  // did_bill_codexx: any;
  FinalDiscount_DiscountType: any;
  did_bill_code_section2: any;
  edit_Duplicate_ID: any;
  section1_billcode: any;
  getProformaBillerDetails_billerID: any;
  // subTotalForm
  subTotalForm: FormGroup;
  subTotalForm2: FormGroup;
  subTotalForm3: FormGroup;
  TaxValuEDIt: any;
  sub2Total_edit: any;
  usage_Overall_edit: any;
  selectedBillCode: any;
  UID: string;
  BillerID_CompanyName: any;
  taxIDGET: any;
  edit_flag: boolean;
  duplicate_flag: boolean;
  userID_Edit: any;
 
  fixedCharge_Flag: boolean=true;
  usageCharge_Flag: boolean=true;
  otherCharge_Flag: boolean=true;
  editCurrencyValue: any;
  editpaymentVIAValue: any;
  searchFlag: any;
  upd_flagName: any;
  upd_search_name: any;
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    // this.route.queryParams
    // .subscribe(params => {
    //   console.log("params output value", params);

    //   this.editbillerID = params['e_editBillID'];
    //   console.log("edit biller id", this.editbillerID);
    // });

    this.did_Invice_fixed_charges = this.fb.group({
      fixedAddresses: this.fb.array([this.fixedFormDid()])
    });

    this.did_Invice_usage_Charges = this.fb.group({
      usageAddress: this.fb.array([this.usageFormDid()])
    });

    this.did_Invice_other_charges = this.fb.group({
      otherAddress: this.fb.array([this.otherFormDid()])
    });
  }
  keywordUserName = 'reseller_name';

  ngOnInit(): void {
    

    this.did_bill_code = 1445;

    // this.did_bill_codexx = [
    //   { "customer_bill_code_id": 1445, "bill_code": -810 },

    // ];
   
    this.did_bill_code_value = '';

    this.route.queryParams
    .subscribe(params => {
      console.log("params output value", params);

      this.editbillerID = params['e_editBillID'];
      this.edit_Duplicate_ID = params['e_editDuplicateID'];
      this.editDIDStateID = params['e_editDIDState'];
      this.searchFlag = params['e_searchFlag'];
      
      console.log("edit biller id", this.editbillerID);
      console.log("edit Duplicate id", this.edit_Duplicate_ID);
      console.log("edit DID state id", this.editDIDStateID);
      console.log("edit searchFlag id", this.searchFlag);
      if(this.editbillerID==undefined){
        this.edit_flag=false;
        this.duplicate_flag=true;
        console.log("if part");
        console.log("this.edit_flag",this.edit_flag);
        console.log("this.duplicate_flag",this.duplicate_flag);
        //making duplicate
      }else{
        this.edit_flag=true;
        this.duplicate_flag=false;
        console.log("else part");
        console.log("this.edit_flag",this.edit_flag);
        console.log("this.duplicate_flag",this.duplicate_flag);
        // making edit
      }
   
      this.EditShippingAddress = true;

    }
    );
    this.addDidLoad();
     this.editDidInvice();
  
    // setTimeout(() => {
    
    //       this.editDidInvice();
          
    //     }, 2000)


    // this.addDidLoad();
    // this.editDidInvice();

    this.SelectExtraLogoCheckboxwithKey = [

      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: ' DID Sg  ', selected: false, id: 3 },
      { name: ' Callcloud  ', selected: false, id: 4 },
      { name: ' Mrvoip  ', selected: false, id: 5 },
      { name: ' None  ', selected: false, id: 0 },

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

    this.addDid_section1 = new FormGroup({
      'initial': new FormControl(),
      'billId_edit': new FormControl(),
      'companyName': new FormControl(null, [Validators.required]),
      'customer_name': new FormControl(),
      'invoiceNo': new FormControl(),
      'customer_id_hd': new FormControl(),
      'BillTo': new FormControl(),
      'cusInvoiceNo': new FormControl(),
      'tin': new FormControl(null, [Validators.required]),
      'cst': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      'Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo_edit': new FormControl(null),
      'Attn_1': new FormControl(),
      'Attn_2': new FormControl(),
      'ESA_Cbk': new FormControl(),
      'ship_to': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_1': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_2': new FormControl({ value: '', disabled: true }, Validators.required),
      'shipTo_3': new FormControl({ value: '', disabled: true }, Validators.required),
      'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'salesRep_id': new FormControl(null),
      'ShipBy': new FormControl(),
      // 'billCodev': new FormControl(null),
      'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'ship_attn': new FormControl(),
      'terms': new FormControl(),

      'CurrencyConversionRate': new FormControl(),
      'extraLogo': new FormControl(),
      'Currency': new FormControl(),
      'PaymentVia': new FormControl(),
      'export_state': new FormControl(),
      'ReferenceResellerName': new FormControl(),
      'ExtraLogo': new FormControl(),
      'Jompay_logo': new FormControl(),


    });
    this.subTotalForm = new FormGroup({
      'sub_total_1': new FormControl(),

    });
    this.subTotalForm2 = new FormGroup({

      'sub_total_2': new FormControl(),

    });
    this.subTotalForm3 = new FormGroup({

      'sub_total_3': new FormControl(),
    });

    this.addDid_section3 = new FormGroup({



      'section3_gross_total': new FormControl(null),
      'section3_gross_total_afterDiscount': new FormControl(null),
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
      'section3_previousDue': new FormControl(null),
      'section3_Terms1': new FormControl(null),
      'section3_Terms2': new FormControl(null),
      'section3_Terms3': new FormControl(null),
      'section3_Terms4': new FormControl(null),
      'section3_Terms5': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),
      'section3_select_additional_signature': new FormControl({ value: '', disabled: false }, Validators.required),
    });

    this.FixedDiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'FixedDiscountForm_Percentage': new FormControl(null),
      'FixedDiscountForm_Direct': new FormControl(null),
      'fix_DiscountTYpe': new FormControl(null),

    });
    this.OtherDiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'OtherDiscountForm_Percentage': new FormControl(null),
      'OtherDiscountForm_Direct': new FormControl(null),
      'oth_DiscountTYpe': new FormControl(null),

    });
    this.UsageDiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'UsageDiscountForm_Percentage': new FormControl(null),
      'UsageDiscountForm_Direct': new FormControl(null),
      'use_DiscountTYpe': new FormControl(null),

    });
    this.FinalDiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'FinalDiscountForm_Percentage': new FormControl(null),
      'FinalDiscountForm_Direct': new FormControl(null),
      'final_DiscountTYpe': new FormControl(null),

    });
    this.DidCommissionForm = new FormGroup({
      'ResellerName': new FormControl(null),
      'selectCommission': new FormControl(null),
      'CommissionValue': new FormControl(null),
      'CommissionAmount': new FormControl(null),

    });


    // $('#sub_total_2').val(this.sub2Total_edit);
  

 


  }


  // FIXED CHARGES

  get addressControls() {
    return this.did_Invice_fixed_charges.get('fixedAddresses') as FormArray
  }


  addInvoice() {

    this.fixedAddresses = this.did_Invice_fixed_charges.get('fixedAddresses') as FormArray;
    this.fixedAddresses.push(this.fixedFormDid());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  fixedFormDid(): FormGroup {
    return this.fb.group({
      billChildid1: '',
      particular1: '',
      fromdt1: '',
      todt1: '',
      md_chk1: '',
      did_diff_date1: '',
      productDesc1: '',
      amt1: '',
      call_duration1: '',



    });
  }
  // removeDid1(i: number) {
  //   this.fixedAddresses.removeAt(i);
  //   var addr = this.did_Invice_fixed_charges.value.fixedAddresses;
  //   var list_cnt = addr.length;
  //   this.totalCalculate_1();
  //   this.fixedSaveDiscount();
  // }
  removeDid1(i: number) {


    var pd_billchild_id = $('#billChildid1' + i).val();


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
        console.log("i", i)
        console.log("fixedAddresses", this.addressControls)
        this.addressControls.removeAt(i);
        var addr = this.did_Invice_fixed_charges.value.fixedAddresses;
        var list_cnt = addr.length;

        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "did";
        api_req.api_url = "did/delete_billing_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "delete_quotation_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.billchild_id = pd_billchild_id;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          console.log("response", response);

        });
        // $('#enablePerFinal_1').val('');
        // $('#enablePriceFinal_1').val('');

        setTimeout(() => {
          this.totalCalculate_1();
        }, 1500);


        setTimeout(() => {
          this.fixedSaveDiscount();
          this.getTaxCals_2();
        }, 1500);


      }
    })

  }

  // USAGE CHARGES

  get usageAddressControls() {
    return this.did_Invice_usage_Charges.get('usageAddress') as FormArray
  }


  usageCharges() {

    this.usageAddress = this.did_Invice_usage_Charges.get('usageAddress') as FormArray;
    this.usageAddress.push(this.usageFormDid());

    this.itre = this.itre + 1;
    this.usageAddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  usageFormDid(): FormGroup {
    return this.fb.group({
      billChildid2: '',
      particular2: '',
      fromdt2: '',
      todt2: '',
      md_chk2: '',
      did_diff_date2: '',
      productDesc2: '',
      amt2: '',
      call_duration2: '',
      did_bill_code_chd: '',

    });
  }
  // removeDid2(i: number) {

  //   this.usageAddress.removeAt(i);
  //   var addr = this.did_Invice_usage_Charges.value.usageAddress;
  //   var list_cnt = addr.length;
  //   this.totalCalculate_2();
  //   this.usageSaveDiscount();
  // }
  removeDid2(i: number) {

    var pd_usageChr_billchild = $('#billChildid2' + i).val();


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
        this.usageAddressControls.removeAt(i);
        var addr = this.did_Invice_usage_Charges.value.usageAddress;
        var list_cnt = addr.length;

        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "did";
        api_req.api_url = "did/delete_billing_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "delete_quotation_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.billchild_id = pd_usageChr_billchild;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          console.log("response", response);

        });

        setTimeout(() => {
          this.totalCalculate_2();
        }, 1500);


        setTimeout(() => {
          this.usageSaveDiscount();
          
        }, 1500);


      }
    })

  }


  get otherAddressControls() {
    return this.did_Invice_other_charges.get('otherAddress') as FormArray
  }


  otherCharges() {

    this.otherAddress = this.did_Invice_other_charges.get('otherAddress') as FormArray;
    this.otherAddress.push(this.otherFormDid());
    console.log("this.itre",this.itre);
    this.itre = this.itre + 1;
    this.otherAddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
    
  }
  otherCharges1() {
 
    this.otherAddress = this.did_Invice_other_charges.get('otherAddress') as FormArray;
    this.otherAddress.push(this.otherFormDid());
    console.log("this.itre-other charge1",this.itre);
    this.itre = this.itre;
    this.otherAddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
    
  }

  otherFormDid(): FormGroup {
    return this.fb.group({
      billChildid3: '',
      particular3: '',
      fromdt3: '',
      todt3: '',
      md_chk3: '',
      did_diff_date3: '',
      productDesc3: '',
      amt3: '',
      call_duration3: '',


    });
  }
  // removeDid3(i: number) {
  //   this.otherAddress.removeAt(i);
  //   var addr = this.did_Invice_other_charges.value.otherAddress;
  //   var list_cnt = addr.length;
  //   this.totalCalculate_3();
  //   this.otherSaveDiscount();
  // }

  removeDid3(i: number) {

    var pd_othChr_billchild = $('#billChildid3' + i).val();


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
        this.otherAddressControls.removeAt(i);
        var addr = this.did_Invice_usage_Charges.value.usageAddress;
        var list_cnt = addr.length;

        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "did";
        api_req.api_url = "did/delete_billing_child";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "delete_quotation_child";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.billchild_id = pd_othChr_billchild;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          console.log("response", response);

        });

        setTimeout(() => {
          this.totalCalculate_3();
        }, 1500);


        setTimeout(() => {
          this.otherSaveDiscount();
          this.getTaxCals_2();
          // this.getTaxCals_AfterDelete();
        }, 1500);


      }
    })

  }

  handleChangeLocal(event: any) {
    this.export_state_Local = event.target.value;
    this.export_state = 'Local';
    console.log(this.export_state_Local);

  }
  handleChangeExport(event: any) {
    this.export_state_Export = event.target.value;
    this.export_state = 'Export';
    console.log(this.export_state_Export);

  }
  handleChangeZeroValid(event: any) {
    this.export_state_ZeroValid = event.target.value;
    this.export_state = 'Zero Valid';
    console.log(this.export_state_ZeroValid);

  }
  handleChange_initial(id: any, evt: any) {
    var radioSelectInitial = evt.target.value;
    var abc = id;
    console.log("radio button value", radioSelectInitial);
    console.log("radio button id value", abc);
  }
  handleChange_Jompay(event: any) {
    this.Jompay_Value = false;
    this.Jompay_Value = event.target.checked;
    console.log(this.Jompay_Value);
  }
  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    // var xyz = id;
    console.log("radio button value", radioSelectFooter);
    // console.log("radio button id value", xyz);
  }
  handleChange_ExportState(data: any, evt: any) {

    this.radioID_Export = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_ExportState = evt.target.value;
    this.export_state = evt.target.value;
    console.log("radio button value", this.radio_Value_ExportState);

  }
  handleChangeExtraLogo(event: any) {
    this.ExtralogoValue = event.target.value;
    // var xyz = id;
    console.log("radio button value for Extra logo", this.ExtralogoValue);

  }
  eventCheckSelectReceivedSignature(e: any) {

    this.checkbox_selectReceivedSignature = e.target.checked;
    console.log(this.checkbox_selectReceivedSignature);
  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    console.log(this.mile_check_value);
  }
  handleChange_MSDisplay(event: any) {
    this.MSDisplay_Value = event.target.value;
    console.log(this.MSDisplay_Value);
  }
  cbk_fn_previousDue(event: any) {
    this.cbk_previousDue = event.target.checked;
    console.log(this.cbk_previousDue)
  }
  chklogoAddressSignatureEvent(event: any) {
    this.chklogoAddressSignature = event.target.checked;
    console.log(this.chklogoAddressSignature)
  }
  handleChange_SelectExtraLogo(data: any, evt: any) {

    this.radioID_Logo = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_SelectExtraLogo = evt.target.value;
    this.ExtralogoValue = evt.target.value;

    console.log("radio button value", this.radio_Value_SelectExtraLogo);

  }
  chkTermsandconditionEvent(event: any) {
    this.chkTermsandcondition = event.target.checked;
    console.log(this.chkTermsandcondition)
  }
  radioSelectCommissionType(event: any) {
    $('#CommissionValue').val('');
    $('#CommissionAmount').val('');
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

  billCodeChange(event: any) {

    this.did_bill_code = event.target.value;
  }
  billCodeChange_section1(event: any) {

    this.did_bill_code_section2 = event.target.value;
    this.selectedBillCode=this.did_bill_code_section2;
  }
  cbk_Fn_EditShipAddress(event: any) {
    this.EditShippingAddress = event.target.checked;
    console.log(this.EditShippingAddress)

    if (this.EditShippingAddress) {

      this.addDid_section1.get("ship_to").disable();
      this.addDid_section1.get("shipTo_1").disable();
      this.addDid_section1.get("shipTo_2").disable();
      this.addDid_section1.get("shipTo_3").disable();

    }
    else {

      this.addDid_section1.get("ship_to").enable();
      this.addDid_section1.get("shipTo_1").enable();
      this.addDid_section1.get("shipTo_2").enable();
      this.addDid_section1.get("shipTo_3").enable();


    }
    console.log(this.EditShippingAddress)
  }

  getCustomerInvoiceDetails(event: any) {
    this.billerID = event.target.value;
    this.BillerID_CompanyName=event.target.value;
    console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_customer_inv_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_customer_inv_details";
    api_getInvoiceDetails_req.user_id = localStorage.getItem('erp_c4c_user_id');
   // api_getInvoiceDetails_req.billerId = this.addDid_section1.value.companyName;
    api_getInvoiceDetails_req.billerId =  this.BillerID_CompanyName;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.addDid_section1.patchValue({
          // 'companyName':  this.billerID,
          'invoiceNo': response.invoice_no,
        //  'Currency': response.currency_id,


        });

      $('#curren_editdidpi').val(response.currency_id);
      $('#Payment_editdidpi').val(response.def_payment_via);
      $('#ccr_editdidpi').val(response.conversionRate.currency_live_val);
    
      }
      else {
        this.addDid_section1.patchValue({

          'invoiceNo': '',
          // 'Currency': '',
        });

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
    add_BillerDetails_req.billerId = this.BillerID_CompanyName;
    // add_BillerDetails_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = add_BillerDetails_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);


      if (response != '') {
        if(response.biller_details.length==0){

        }
        else if(response.biller_details.length>0){
          this.getProformaBillerDetails_tinName = response.biller_details[0].tinName;
          this.getProformaBillerDetails_tinNo = response.biller_details[0].tinNo;
          this.getProformaBillerDetails_cstName = response.biller_details[0].cstName;
          this.getProformaBillerDetails_cstNo = response.biller_details[0].cstNo;
          this.getProformaBillerDetails_billerID = response.biller_details[0].billerId;
          this.addDid_section1.patchValue({
            'tin': response.biller_details[0].tinNo,
            'cst': response.biller_details[0].cstNo,
            // 'Currency': response.def_currency_id,
            // 'PaymentVia': response.def_paymentvia_id,
  
          });
          // $('#curren_editdidpi').val(response.def_currency_id);
          // $('#Payment_editdidpi').val(response.def_paymentvia_id);
          
          

        }

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
    this.spinner.show();
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
    api_getInvoiceDetails_req.billerId = this.getProformaBillerDetails_billerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        $('#ccr_editdidpi').val(response.currency_live_val);
        // this.addDid_section1.patchValue({
        //   'CurrencyConversionRate': response.currency_live_val,
          
        // });
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }

    });
  }
  addDidLoad() {

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
        this.BillCodeList = response.billCode;
        this.salesRepDropDown_Textbox_Status = response.sales_rep_status.dropdown_status;

        if (response.sales_rep_status.dropdown_status == 0) {
          this.addDid_section1.patchValue({
            'salesRep_id': response.sales_rep.name,
            'salesRep': response.sales_rep.userid,
          });

        } else {
          this.SalesRepList = response.sales_rep;
          this.addDid_section1.patchValue({
            'salesRep': localStorage.getItem('erp_c4c_user_id'),
          });


        }


        this.addDid_section1.patchValue({
          // 'companyName': response.defaults_biller_id,
        });

        //   this.companyNameVal = response.defaults_biller_id;
        this.tax_per_mod = response.percent_val;
      
        this.TaxDropdown();
        // this.getCustomerInvoiceDetails()
        this.getCustomerInvoiceDetails(response.defaults_biller_id);
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
      console.log("vignesh-customer_name response", response);
      this.usersearchResult = response.reseller_list;

      if (response.status = true) {

      }

    });

  }

  searchUser_selectDropdownData(item: any) {


    this.resellerName = item.reseller_name;
    this.resellerID = item.reseller_id;

    console.log(item.reseller_name)
    console.log(item.reseller_id)


  }

  selectEventUser(item: any) {

    console.log(item)
    // do something with selected item
  }
  onFocusedUser(e: any) {
    // do something when input is focused
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
    // api_TaxDropdown_req.billerId = this.BillerID_CompanyName;
    api_TaxDropdown_req.billerId =   $('#cmp_name_didpi').val();
  
   // api_TaxDropdown_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
         this.TaxDropdownList = response.tax_list;
        // setTimeout(() => {
        //   this.addDid_section3.patchValue({
        //     'section3_gst_dropdown': response.default_tax_id,
        //   });

        // }, 500);
         $('#billerID').val(response.default_tax_id)
        // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
        console.log('response.default_tax_id', response.default_tax_id);



      }



    });
  }
  TaxDropdown1(b:any) {

    let api_req: any = new Object();
    let api_TaxDropdown_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/tax_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_TaxDropdown_req.action = "tax_dropdown";
    api_TaxDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_TaxDropdown_req.billerId = $('#cmp_name_didpi').val();
   // api_TaxDropdown_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
         this.TaxDropdownList = response.tax_list;
        // setTimeout(() => {
        //   this.addDid_section3.patchValue({
        //     'section3_gst_dropdown': response.default_tax_id,
        //   });

        // }, 500);
         $('#billerID').val(response.default_tax_id)
        // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
        console.log('response.default_tax_id', response.default_tax_id);



      }



    });
  }
  computeUsageCharge1() {
    const data = new FormData();
    for (let a = 0; a < this.did_Invice_usage_Charges.value.usageAddress.length; a++) {
      data.append("fromdt", $('#fromdt2_' + a).val());
      data.append("todt", $('#todt2_' + a).val());
    }

    data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
    data.append('customerId', this.customer_ID);
    data.append('did_bill_code', this.did_bill_code_value);
    data.append('action', "get_did_usage_charge");



    $.ajax({
      type: 'POST',
      url: 'https://dev.cal4care.com/erp/includes/modules/ajax/usage_charge_compute.php',
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST' },
      cache: false,
      crossDomain: true,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result != '') {
          // self.quotationList({});
          console.log(result);



        }
        else {



        }
      },
      error: function (err: any) {

        console.log("err", err)


      }

    })



  }
  computeUsageCharge(j: any) {
    console.log($('#billCode'+j).val());
    this.spinner.show();
    this.spinner.hide();
    let api_req: any = new Object();
    let api_computeUsage_req: any = new Object();
    api_req.moduleType = "did";
    api_req.api_url = "did/get_did_usage_charge";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_computeUsage_req.action = "get_did_usage_charge";
    api_computeUsage_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_computeUsage_req.customerId = this.customer_ID;
   // api_computeUsage_req.did_bill_code = this.did_bill_code_section2;
    api_computeUsage_req.did_bill_code = $('#billCode' + j).val();
    api_computeUsage_req.fromdt = $('#fromdt2_' + j).val();
    api_computeUsage_req.todt = $('#todt2_' + j).val();

    api_req.element_data = api_computeUsage_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {



      if (response != '') {
        this.spinner.hide();
        $('#amt2_' + j).val(response);
        this.totalCalculate_2();
        this.usageSaveDiscount();
        this.getTaxCals();
        this.extraFees();


      }
      else if (response == 0) {
        this.spinner.hide();
        $('#amt2_' + j).val(0);
        this.totalCalculate_2();
        this.usageSaveDiscount();
        this.getTaxCals();
        this.extraFees();


      }
      else {
        this.spinner.hide();
      }
    });

  }



  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {

    console.log(item)

  }
  onFocusedCustomer(e: any) {

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
    api_Search_req.billerId = this.BillerID_CompanyName;
    //api_Search_req.billerId = this.addDid_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;



      if (response.status = true) {
        this.addDid_section1.patchValue({
          "customer_id_hd": response.customer_list.customerId
        });
      }

    });

  }

  Customer_selectDropdownData(customerId: any) {
    this.spinner.show();
    this.customerName_Data = customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/customer_address_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = customerId;
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("customer_address_details---response", response)
      if (response.status == true) {
this.spinner.hide();


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



        // this.did_bill_codexx = response.customer_billcode_arr;
        // this.did_bill_code_section1 = response.customer_billcode_arr;
        // console.log('this.did_bill_code_section1',this.did_bill_code_section1);

        this.addDid_section1.patchValue({
          'address_1': response.customer_details[0].customerAddress1,
          'address_2': response.customer_details[0].customerAddress2,
          'address_3': address_3,
          'Attn_1': response.customer_details[0].companyName,
          'ship_to': ship_to_str,
          'shipTo_1': ship_address_str1,
          'shipTo_2': ship_address_str2,
          'shipTo_3': ship_address_str3,
          'ship_attn': response.customer_details[0].companyName,
        });
      }
      else {
        this.spinner.hide();
        this.addDid_section1.patchValue({
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


      if (response.status == true) {
        this.spinner.hide();
        // this.did_bill_code = response.customer_billcode_arr;
        // this.did_bill_code_section1 = response.customer_billcode_arr;
        this.FinalDiscount_DiscountType = response.billpardiscount[0].dis_type

        this.addDid_section1.patchValue({
          "customer_id_hd": response.customer_list.customerId,
          "b_name": response.customer_list.customerName,
          "customer_name": response.customer_list.customerName,
          "address_1": response.customer_list.customerAddress1,
          "address_2": response.customer_list.customerAddress2,
          "address_3": response.customer_list.customerAddress3,
          "Attn_1": response.customer_list.kind_Attention,
          "ship_to": response.customer_list.ship_to,
          "shipTo_1": response.customer_list.ship_customerAddress1,
          "shipTo_2": response.customer_list.ship_customerAddress2,
          "shipTo_3": response.customer_list.ship_customerAddress3,




        });
      }
      else {
        this.spinner.hide();
        this.addDid_section1.patchValue({


        });
      }
    });
  }
  getTaxCals() {


    this.taxValue = (8 * Number($('#section3_gross_total').val()) / 100).toFixed(2);
    // var tax_id = this.addDid_section3.value.section3_gst_dropdown;
    var tax_id = $('#billerIDs_didpi').val();
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    // this.taxIDGET=this.addDid_section3.value.section3_gst_dropdown;
    this.taxIDGET=$('#billerIDs_didpi').val();;


    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_tax_percent_val";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_data_req.action = "get_tax_percent_val";
    // api_data_req.tax_id = tax_id;
    api_data_req.tax_id = this.taxIDGET;

    api_req.element_data = api_data_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.tax_per_mod = response.percent_val;

      if ($('#section3_gross_total_afterDiscount').val() == '' || $('#section3_gross_total_afterDiscount').val() == 0) {
        tax = (Number(response.percent_val) * Number($('#section3_gross_total').val()) / 100).toFixed(2);
        $('#Tax_amt_id').val(tax);
        var s=$('#Tax_amt_id').val();
        console.log("s value",s);
        this.taxValue = tax;
        var taxadd = Number($('#section3_gross_total').val()) + Number(tax) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());

        $('#section3_grand_total').val(taxadd.toFixed(2));


      } else {
        tax = (Number(response.percent_val) * Number($('#section3_gross_total_afterDiscount').val()) / 100).toFixed(2);
        this.taxValue = tax;
        $('#Tax_amt_id').val(tax);
        var s=$('#Tax_amt_id').val();
        console.log("s value",s);
        var taxadd = Number($('#section3_gross_total_afterDiscount').val()) + Number(tax) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());

        $('#section3_grand_total').val(taxadd.toFixed(2));
       $('#section3_grand_total').val(taxadd.toFixed(2));
      }


    });

    console.log("this.taxValue", this.taxValue);

    //  this.extraFees();




  }
  getTaxCals_2() {


    this.taxValue = (8 * Number($('#section3_gross_total').val()) / 100).toFixed(2);
    // this.taxValue = (($('#billerIDs_didpi').val()) * Number($('#section3_gross_total').val()) / 100).toFixed(2);
    var tax_id = $('#billerIDs_didpi').val();
    //var tax_id = this.addDid_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();



    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_tax_percent_val";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_data_req.action = "get_tax_percent_val";
    api_data_req.tax_id = tax_id;

    api_req.element_data = api_data_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.tax_per_mod = response.percent_val;

      if ($('#section3_gross_total_afterDiscount').val() == '' || $('#section3_gross_total_afterDiscount').val() == 0) {
        tax = (response.percent_val) * $('#section3_gross_total').val() / 100;
        $('#Tax_amt_id').val(tax.toFixed(2));
        var s=$('#Tax_amt_id').val();
        console.log("s value",s);
       
        this.taxValue = tax;
        var taxadd = Number($('#section3_gross_total').val()) + Number(tax) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());

        $('#section3_grand_total').val(taxadd.toFixed(2));


      } else {
        tax = (response.percent_val) * $('#section3_gross_total_afterDiscount').val() / 100;
      
        this.taxValue = tax;
        $('#Tax_amt_id').val(tax.toFixed(2));
        var s=$('#Tax_amt_id').val();
        console.log("s value",s);
        var taxadd = Number($('#section3_gross_total_afterDiscount').val()) + Number(tax) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());

        $('#section3_grand_total').val(taxadd.toFixed(2));
       $('#section3_grand_total').val(taxadd.toFixed(2));
      }


    });

    console.log("this.taxValue", this.taxValue);

    //  this.extraFees();




  }

  
  getTaxCals_AfterDelete() {


    this.taxValue = (8 * Number($('#section3_gross_total').val()) / 100).toFixed(2);
    var tax_id = $('#billerIDs_didpi').val();
   // var tax_id = this.addDid_section3.value.section3_gst_dropdown;

    console.log("tax_id",tax_id)
    var grossTotal_aftDis=$('#section3_gross_total_afterDiscount').val();
    var taxValue1 = (tax_id/100)*grossTotal_aftDis;
    console.log("taxValue1",taxValue1)



 

    //  this.extraFees();




  }

  editDidInvice() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_editDid_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/edit_did_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editDid_req.action = "edit_did_proforma_invoice";
    api_editDid_req.user_id = localStorage.getItem('erp_c4c_user_id');
    if( this.edit_flag==false && this.duplicate_flag==true){
 
      api_editDid_req.billId = this.edit_Duplicate_ID;
    
      }
      else if (this.edit_flag==true && this.duplicate_flag==false){
        api_editDid_req.billId = this.editbillerID;
       
      
      }
      else{
      
      }
    // api_editDid_req.billId = this.editbillerID;
    api_req.element_data = api_editDid_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      console.log("response-load-pi", response)
      if (response != '') {
        console.log("response.bill_fixed_details.length", response.bill_fixed_details.length);
        this.billsLogo_value = response.billing_pararent_details[0].bills_logo_id;
        this.ExtralogoValue = response.billing_pararent_details[0].bills_logo_id;
        $("#section3_gross_total").val(response.billing_pararent_details[0].grossAmount);
        this.exportState_value = response.billing_pararent_details[0].export_state;

        this.customer_ID = response.billing_pararent_details[0].custId;
        // this.section1_billcode = response.billing_pararent_details[0].did_bill_code
        this.Jompay_Value = response.billing_pararent_details[0].jom_pay_logo;
        this.export_state = response.billing_pararent_details[0].export_state;
        this.TaxValuEDIt = response.billing_pararent_details[0].taxId;
        // this.did_bill_codexx= response.bill_code_arr[0].customer_bill_code_id;
        // this.sub2Total_edit= response.billusagechild_discount[0].usage_subtotal;
        this.usage_Overall_edit=response.bill_usage_details;
        this.did_bill_code_section15 = response.customer_billcode_arr;
        console.log(this.did_bill_code_section15);
        this.BillerID_CompanyName =response.billing_pararent_details[0].billerId;
        this.TaxDropdown1(response.billing_pararent_details[0].billerId);
        this.invoiceAddSignatureEdit(response.billing_pararent_details[0].signatureId);
       // alert(response.billing_pararent_details[0].did_bill_code)
        $('#sub_total_1').val(response.fixed_subtotal.toFixed(2));
        $('#sub_total_2').val(response.usage_subtotal.toFixed(2));
        $('#sub_total_3').val(response.other_subtotal.toFixed(2));
        
        this.addDid_section1.patchValue({
          'billId_edit': response.billing_pararent_details[0].billId,
          'companyName': response.billing_pararent_details[0].billerId,
          'BillTo': response.billing_pararent_details[0].b_name,
          'customer_name': response.billing_pararent_details[0].b_name,
          'customer_id_hd': response.billing_pararent_details[0].custId,
          'address_1': response.billing_pararent_details[0].b_address,
          'address_2': response.billing_pararent_details[0].b_address2,
          'address_3': response.billing_pararent_details[0].b_address3,
          'Attn_1': response.billing_pararent_details[0].b_attn,
          'ship_address_1': response.billing_pararent_details[0].s_address1,
          'ship_address_2': response.billing_pararent_details[0].s_address2,
          'shpi_address_3': response.billing_pararent_details[0].s_address3,
          'Attn_2': response.billing_pararent_details[0].s_attn,
          'Ref': response.billing_pararent_details[0].ref,
          'invoiceNo': response.billing_pararent_details[0].invoice_no,
          'cusInvoiceNo': response.billing_pararent_details[0].cus_invoice_no,
          'tin': response.billing_pararent_details[0].tinNo,
          'cst': response.billing_pararent_details[0].cstNo,
          'Date': response.billing_pararent_details[0].billDate,
          'PoNo_edit': response.billing_pararent_details[0].po_no,
          'PoDate': response.billing_pararent_details[0].po_date,
          'salesRep': response.billing_pararent_details[0].sales_rep,
          'ShipBy': response.billing_pararent_details[0].ship_by,
          // 'billCodev': response.bill_code_arr[0].customer_bill_code_id,
          'ShipDate': response.billing_pararent_details[0].ship_date,
          'terms': response.billing_pararent_details[0].terms,
         // 'Currency': response.billing_pararent_details[0].currency,
        //  'CurrencyConversionRate': response.billing_pararent_details[0].conversionRate,
         // 'PaymentVia': response.billing_pararent_details[0].paymentVIA,
          'ReferenceResellerName': response.billing_pararent_details[0].reference_reseller_name,
          'Jompay_logo': response.billing_pararent_details[0].jom_pay_logo,

        });
        this.userID_Edit = response.billing_pararent_details[0].billGeneratedBy;
        this.invoiceAddSignatureEdit(response.billing_pararent_details[0].signatureId);
        // $("#attn1").val(response.billing_pararent_details[0].b_attn);
       
       
        console.log('billchild_details.length' ,response.billing_pararent_details.length);
        this.Customer_selectDropdownData(response.billing_pararent_details[0].custId);
        this.editCurrencyValue=response.billing_pararent_details[0].currency;
        this.editpaymentVIAValue=response.billing_pararent_details[0].paymentVIA;

        // section-2

         // part-1

         const formArray1 = new FormArray([]);
         var bill_fixedDetail_TotalSUBAmount = 0;
         if (response.bill_fixed_details.length == 0) {
           $('#sub_total_1').val(0);
           console.log("response.bill_fixed_details.length", response.bill_fixed_details.length)
 
           //this.addInvoice();
         }
         else{
         
          for (let index = 0; index < response.bill_fixed_details.length; index++) {
            bill_fixedDetail_TotalSUBAmount = Number(bill_fixedDetail_TotalSUBAmount) + Number(response.bill_fixed_details[index].total_amt);
  
           // $('#sub_total_1').val(bill_fixedDetail_TotalSUBAmount);
            console.log('#sub_total_1', bill_fixedDetail_TotalSUBAmount);
  
            console.log('billchild_details++index' , index);
  
            formArray1.push(this.fb.group({
              "billChildid1": response.bill_fixed_details[index].billChildid,
              "particular1": response.bill_fixed_details[index].productName,
              "fromdt1": response.bill_fixed_details[index].fromDate,
              "todt1": response.bill_fixed_details[index].toDate,
              "md_chk1": response.bill_fixed_details[index].md_state,
              "did_diff_date1": response.bill_fixed_details[index].did_diff_date,
              "productDesc1": response.bill_fixed_details[index].productDesc,
              "amt1": response.bill_fixed_details[index].total_amt,
              "call_duration1": response.bill_fixed_details[index].call_duration_state,
  
  
            })
  
            );
          }
          console.log(formArray1)
          this.did_Invice_fixed_charges.setControl('fixedAddresses', formArray1);
          console.log(this.fixedAddresses);

         }
        
 
       


        // part-2
        console.log("response.bill_usage_details.length", response.bill_usage_details.length)
        const formArray2 = new FormArray([]);
        var bill_usage_TotalSUBAmount = 0;
        if (response.bill_usage_details.length == 0) {
          $('#sub_total_2').val(0);
          console.log("response.bill_usage_details.length", response.bill_usage_details.length)
         // this.usageCharges();

        } else {
        for (let index = 0; index < response.bill_usage_details.length; index++) {

          bill_usage_TotalSUBAmount = (bill_usage_TotalSUBAmount) + (response.bill_usage_details[index].total_amt);

       //   $('#sub_total_2').val(bill_usage_TotalSUBAmount);
          console.log('#sub_total_2', bill_usage_TotalSUBAmount);

          console.log('bill_usage_details++index' , index);

          formArray2.push(this.fb.group({
            "billChildid2": response.bill_usage_details[index].billChildid,
            "particular2": response.bill_usage_details[index].productName,
            "did_bill_code_chd": response.bill_usage_details[index].did_bill_code_chd,
            "fromdt2": response.bill_usage_details[index].fromDate,
            "todt2": response.bill_usage_details[index].toDate,
            "md_chk2": response.bill_usage_details[index].md_state,
            "did_diff_date2": response.bill_usage_details[index].did_diff_date,
            "productDesc2": response.bill_usage_details[index].productDesc,
            "amt2": response.bill_usage_details[index].total_amt,
            "call_duration2": response.bill_usage_details[index].call_duration_state,

          })

          );
        }
        console.log(formArray2)
        this.did_Invice_usage_Charges.setControl('usageAddress', formArray2);
        console.log(this.usageAddress);

      }
       


        // part-3

        const formArray3 = new FormArray([]);
        var bill_Other_TotalSUBAmount = 0;
        console.log("response.bill_other_details.length", response.bill_other_details.length)
        if (response.bill_other_details.length == 0) {
          $('#sub_total_3').val(0);
          this.totalCalculate_3();
        //  this.gross_total();
          console.log("otherAddressControls",this.otherAddressControls)
          // this.otherCharges1();
          // this.addInvoice();

        } else {
        for (let index = 0; index < response.bill_other_details.length; index++) {

          bill_Other_TotalSUBAmount = Number(bill_Other_TotalSUBAmount) + Number(response.bill_other_details[index].total_amt);

         // $('#sub_total_3').val(bill_Other_TotalSUBAmount);
          console.log('#sub_total_3', bill_Other_TotalSUBAmount);
          console.log('bill_other_details++index' , index);

          formArray3.push(this.fb.group({
            "billChildid3": response.bill_other_details[index].billChildid,
            "particular3": response.bill_other_details[index].productName,
            "fromdt3": response.bill_other_details[index].fromDate,
            "todt3": response.bill_other_details[index].toDate,
            "md_chk3": response.bill_other_details[index].md_state,
            "did_diff_date3": response.bill_other_details[index].did_diff_date,
            "productDesc3": response.bill_other_details[index].productDesc,
            "amt3": response.bill_other_details[index].total_amt,
            "call_duration3": response.bill_other_details[index].call_duration_state,
          })

          );
        }
        console.log(formArray3)
        this.did_Invice_other_charges.setControl('otherAddress', formArray3);
        console.log(this.otherAddress);
        this.grossTotal = bill_Other_TotalSUBAmount + bill_usage_TotalSUBAmount + bill_fixedDetail_TotalSUBAmount;
      }
        




        // section-3
        this.addDid_section3.patchValue({
          //row-1

          // 'section3_gross_total': response.billing_pararent_details[0].grossAmount,

          //row-3
          // 'section3_gst_dropdown': response.billing_pararent_details[0].taxId,
          'section3_taxAmt_txtbox': response.billing_pararent_details[0].taxAmt,
          'section3_tax_per_hd': response.billing_pararent_details[0].taxPer,
          
          //row-4
          'section3_shipping_amt_name_txtbox': response.billing_pararent_details[0].shippingName,
          'section3_shipping_amt_txtbox': response.billing_pararent_details[0].shippingAmt,
          'section3_bankingCharge_amt_txtbox': response.billing_pararent_details[0].add_amt,
          'section3_bankingCharge_amt_name_txtbox': response.billing_pararent_details[0].add_name,
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
         if(response.billing_pararent_details[0].terms_condition_optional==1){
            this.chkTermsandcondition=true;
            
          }else{
            this.chkTermsandcondition=false;
          }

          if (response.bill_fixed_details.length == 0) {
            console.log("bill_fixed_details-empty");
          } else if(response.bill_fixed_details.length > 0) {
            this.FixedDiscountForm.patchValue({
              'FixedDiscountForm_Percentage': response.billfixedchild_discount[0].dis_per,
              'FixedDiscountForm_Direct': response.billfixedchild_discount[0].dis_amt,
              'fix_DiscountTYpe': response.billfixedchild_discount[0].dis_type,
            });
          }
         
          if(response.bill_usage_details.length ==0){
            console.log("billusagechild_discount-empty");
          }else if(response.bill_usage_details.length>0){
            this.UsageDiscountForm.patchValue({
              'UsageDiscountForm_Percentage': response.billusagechild_discount[0].dis_per,
              'UsageDiscountForm_Direct': response.billusagechild_discount[0].dis_amt,
              'use_DiscountTYpe': response.billusagechild_discount[0].dis_type,
            });
          }
         
  
          if (response.bill_other_details.length == 0) {
            console.log("billotherchild_discount-empty");
          } else if(response.bill_other_details.length > 0) {
            this.OtherDiscountForm.patchValue({
              'OtherDiscountForm_Percentage': response.billotherchild_discount[0].dis_per,
              'OtherDiscountForm_Direct': response.billotherchild_discount[0].dis_amt,
              'oth_DiscountTYpe': response.billotherchild_discount[0].dis_type,
            });
          }
  

        this.FinalDiscountForm.patchValue({
          'FinalDiscountForm_Percentage': response.billpardiscount[0].dis_per,
          'FinalDiscountForm_Direct': response.billpardiscount[0].dis_amt,
          'final_DiscountTYpe': response.billpardiscount[0].dis_type,

        });

      }
      this.getProformaBillerDetails();
      $("#section3_gross_total").val(response.billing_pararent_details[0].grossAmount);
      $("#finalDiscount_amt").val(response.billing_pararent_details[0].discountAmount);
      $("#section3_gross_total_afterDiscount").val(response.billing_pararent_details[0].grossAfterDiscount);
     
      $("#curren_editdidpi").val(response.billing_pararent_details[0].currency);
      $("#ccr_editdidpi").val(response.billing_pararent_details[0].conversionRate);
      $('#Payment_editdidpi').val(response.billing_pararent_details[0].paymentVIA);
      $("#Tax_amt_id").val(response.billing_pararent_details[0].taxAmt);
      setTimeout(() => {
    
        $("#billerIDs_didpi").val(response.billing_pararent_details[0].taxId);
        $("#curren_editdidpi").val(response.billing_pararent_details[0].currency);
        $("#ccr_editdidpi").val(response.billing_pararent_details[0].conversionRate);
        $('#Payment_editdidpi').val(response.billing_pararent_details[0].paymentVIA);
       
          
        }, 2000)

    
     // this.getProformaBillerDetails();
     // this.finalSaveDiscount();
    //  this.grossTotalAfterDiscount();
     // 
    //  this.quotationAddSignature();
   //   this.gross_total();
    //  this.getTaxCals();
      // 
  //    this.fixedSaveDiscount();

    //  this.otherSaveDiscount();
      // this.totalCalculate_1();
     // this.totalCalculate_2();
     // this.usageSaveDiscount();
      // this.totalCalculate_3();
    });



   

    
    // $('#sub_total_2').val(this.sub2Total_edit);

    this.spinner.hide();

  }

  updateDidInvoice() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_updateDid_req: any = new Object();
    api_req.moduleType = "proforma";
    
    api_req.api_url = "proforma/update_did_proforma_invoice";

    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updateDid_req.action = "update_did_proforma_invoice";
    api_updateDid_req.user_id = localStorage.getItem('erp_c4c_user_id');

    console.log('this.addPI_section3.value.billId_edit' + this.addDid_section1.value.billId_edit);
    //section-1
    api_updateDid_req.billId = this.addDid_section1.value.billId_edit;
    // api_updateDid_req.company = this.addDid_section1.value.companyName;
    // api_updateDid_req.billerId = this.addDid_section1.value.companyName;
    api_updateDid_req.company = this.BillerID_CompanyName;
    api_updateDid_req.billerId = this.BillerID_CompanyName;
    api_updateDid_req.invoice_no = this.addDid_section1.value.invoiceNo;
    api_updateDid_req.customer_invoice_no = this.addDid_section1.value.cusInvoiceNo;
    api_updateDid_req.cus_invoice_no = this.addDid_section1.value.cusInvoiceNo;
    api_updateDid_req.customerId = this.addDid_section1.value.customer_id_hd;
    api_updateDid_req.customer_name = this.customerName_Data;
    api_updateDid_req.tinNo = this.addDid_section1.value.tin;
    api_updateDid_req.BillTo_customer_ID = this.customer_ID;
    api_updateDid_req.BillTo_customer_NAME = this.customer_NAME;
    api_updateDid_req.searchFlag =this.searchFlag;

    // api_updateDid_req.b_name = this.addDid_section1.value.BillTo;
    api_updateDid_req.b_name = this.addDid_section1.value.customer_name;
    api_updateDid_req.b_address1 = this.addDid_section1.value.address_1;
    api_updateDid_req.b_address2 = this.addDid_section1.value.address_2;
    api_updateDid_req.b_address3 = this.addDid_section1.value.address_3;

    api_updateDid_req.s_name = this.addDid_section1.value.ship_to;
    api_updateDid_req.s_address1 = this.addDid_section1.value.ship_address_1;
    api_updateDid_req.s_address2 = this.addDid_section1.value.ship_address_2;
    api_updateDid_req.s_address3 = this.addDid_section1.value.ship_address_3;

    api_updateDid_req.cstNo = this.addDid_section1.value.cst;
    api_updateDid_req.billDate = this.addDid_section1.value.Date;
    api_updateDid_req.b_attn = this.addDid_section1.value.Attn_1;
    // api_updateDid_req.did_bill_code = this.addDid_section1.value.billCodev;
    api_updateDid_req.po_no = this.addDid_section1.value.PoNo_edit;
    api_updateDid_req.po_date = this.addDid_section1.value.PoDate;
    api_updateDid_req.sales_rep = this.addDid_section1.value.salesRep;
    api_updateDid_req.ship_by = this.addDid_section1.value.ShipBy;
    api_updateDid_req.ship_date = this.addDid_section1.value.ShipDate;
    api_updateDid_req.s_attn = this.addDid_section1.value.Attn_2;
    api_updateDid_req.terms = this.addDid_section1.value.terms;
    // api_updateDid_req.currency = this.addDid_section1.value.Currency;
    api_updateDid_req.currency = $('#curren_editdidpi').val();
    
    // api_updateDid_req.conversionRate = this.addDid_section1.value.CurrencyConversionRate;
    api_updateDid_req.conversionRate = $('#ccr_editdidpi').val();
    // api_updateDid_req.paymentVIA = this.addDid_section1.value.PaymentVia;

    api_updateDid_req.paymentVIA = $('#Payment_editdidpi').val();
    api_updateDid_req.reference_reseller_name = this.addDid_section1.value.ReferenceResellerName;
    api_updateDid_req.bills_logo_id = this.ExtralogoValue;
    api_updateDid_req.export_state = this.export_state;
    api_updateDid_req.jom_pay_logo = this.Jompay_Value;

    if (this.addDid_section1.value.BillTo === null) {

      iziToast.warning({
        message: "Fill Customer Name",
        position: 'topRight'
      });
      return false;

    }

    //section-2


    if ($('#particular_1_').val() || $('#particular2_').val() || $('#particular3_').val() == '') {
      iziToast.warning({
        message: "Select Minimum 1 Product Details",
        position: 'topRight'
      });
      return false;

    }
    // fixed charge

    //  api_updateDid_req.fixed_value = this.did_Invice_fixed_charges.value.fixedAddresses;

    console.log('response........' + this.did_Invice_fixed_charges.value.particular1);

    var addr1 = this.did_Invice_fixed_charges.value.fixedAddresses;


    for (let i = 0; i < addr1.length; i++) {

      console.log(addr1)
      addr1[i].pd_billchild_id = $('#pd_billchild_id_' + i).val();
      addr1[i].particular1 = $('#particular_1_' + i).val();
      addr1[i].fromdt1 = $('#fromdt_1_' + i).val();
      addr1[i].todt1 = $('#todt_1_' + i).val();
      addr1[i].md_chk1 = $('#md_chk_1_' + i).val();
      addr1[i].did_diff_date1 = $('#did_diff_date_1_' + i).val();
      addr1[i].productDesc1 = $('#productDesc1_' + i).val();
      addr1[i].amt1 = $('#amt_1_' + i).val();
      addr1[i].call_duration1 = $('#call_duration_1_' + i).val();

      addr1[i].dis_per1 = $('#enablePerFinal_1' + i).val();
      addr1[i].dis_amt1 = $('#enablePriceFinal_1' + i).val();
      addr1[i].dis_type1 = $('#fix_DiscountTYpe' + i).val();
      if($('#particular_1_' + i).val()==''){
        this.fixedCharge_Flag=false;
      }

    }
    if(this.fixedCharge_Flag==true){
      
      api_updateDid_req.fixed_value = addr1;
      }else{
        // iziToast.error({
        //   message: "Product Details missing in Fixed Charge",
        //   position: 'topRight'
        // });
        
      }


   

    // usage charge

    //  api_updateDid_req.usage_values = this.did_Invice_usage_Charges.value.usageAddress;


    var addr2 = this.did_Invice_usage_Charges.value.usageAddress;

    // console.log('sandy addr2',addr2);
    
    for (let i = 0; i < addr2.length; i++) {

      // "billChildid2": response.bill_usage_details[index].billChildid,
      // "particular2": response.bill_usage_details[index].productName,
      // "did_bill_code_chd": response.bill_usage_details[index].did_bill_code_chd,
      // "fromdt2": response.bill_usage_details[index].fromDate,
      // "todt2": response.bill_usage_details[index].toDate,
      // "md_chk2": response.bill_usage_details[index].md_state,
      // "did_diff_date2": response.bill_usage_details[index].did_diff_date,
      // "productDesc2": response.bill_usage_details[index].productDesc,
      // "amt2": response.bill_usage_details[index].total_amt,
      // "call_duration2": response.bill_usage_details[index].call_duration_state,

         
      addr2[i].amt2 = $('#amt2_' + i).val();
      addr2[i].billChildid2 = $('#billChildid2' + i).val();
      addr2[i].call_duration2 = $('#call_duration2_' + i).val();
       addr2[i].did_bill_code_chd = $('#billCode'+i).val();
      // addr2[i].did_bill_code_chd = $('#billChildid2' + i).val();
      addr2[i].did_diff_date2 = $('#did_diff_date2_' + i).val();
     
      addr2[i].fromdt2 = $('#fromdt2_' + i).val();
      addr2[i].md_chk2 = $('#md_chk2_' + i).val();
     
      addr2[i].particular2 = $('#particular2_' + i).val();
      addr2[i].productDesc2 = $('#productDesc2_' + i).val();
      addr2[i].todt2 = $('#todt2_' + i).val();
 
      addr2[i].dis_per2 = $('#enablePerFinal_2' + i).val();
      addr2[i].dis_amt2 = $('#enablePriceFinal_2' + i).val();
      addr2[i].dis_type2 = $('#use_DiscountTYpe_per' + i).val();
      if($('#particular2_' + i).val()==''){
        this.usageCharge_Flag=false;
      }

    }
    if(this.usageCharge_Flag==true){
      
      api_updateDid_req.usage_value = addr2;
      }else{
        // iziToast.error({
        //   message: "Product Details missing in Usage Charge",
        //   position: 'topRight'
        // });
        
      }


    // other charge

    //  api_updateDid_req.other_values = this.did_Invice_other_charges.value.otherAddress;


    var addr3 = this.did_Invice_other_charges.value.otherAddress;


    for (let i = 0; i < addr3.length; i++) {



      addr3[i].pd_billchild_id = $('#pd_billchild_id_' + i).val();
      addr3[i].particular3 = $('#particular3_' + i).val();
      addr3[i].fromdt3 = $('#fromdt3_' + i).val();
      addr3[i].todt3 = $('#todt3_' + i).val();
      addr3[i].md_chk3 = $('#md_chk3_' + i).val();
      addr3[i].did_diff_date3 = $('#did_diff_date3_' + i).val();
      addr3[i].productDesc3 = $('#productDesc3_' + i).val();
      addr3[i].amt3 = $('#amt3_' + i).val();
      addr3[i].call_duration3 = $('#call_duration3_' + i).val();


      addr3[i].dis_per3 = $('#enablePerFinal_3' + i).val();
      addr3[i].dis_amt3 = $('#enablePriceFinal_3' + i).val();
      addr3[i].dis_type3 = $('#oth_DiscountTYpe_per' + i).val();
      if($('#particular3_' + i).val()==''){
        this.otherCharge_Flag=false;
      }

    }


    if(this.otherCharge_Flag==true){
      
      api_updateDid_req.other_values = addr3;
      }else{
        // iziToast.error({
        //   message: "Product Details missing in other charge",
        //   position: 'topRight'
        // });
        
      }

    api_updateDid_req.sub_total_1 = $('#sub_total_1').val();
    api_updateDid_req.sub_total_2 = $('#sub_total_2').val();
    api_updateDid_req.sub_total_3 = $('#sub_total_3').val();

    //section-3
    
   
    api_updateDid_req.grossTotal = $('#section3_gross_total').val();

    api_updateDid_req.discountAmount = $('#finalDiscount_amt').val();
    api_updateDid_req.grossAfterDiscount= $('#section3_gross_total_afterDiscount').val();
    // api_updateDid_req.taxId = this.addDid_section3.value.section3_gst_dropdown;
    api_updateDid_req.taxId = $('#billerIDs_didpi').val();
    api_updateDid_req.taxAmt = $('#Tax_amt_id').val();
    api_updateDid_req.final_dis_type = $('#final_discount_type').val();
    api_updateDid_req.shippingName = this.addDid_section3.value.section3_shipping_amt_name_txtbox;
    api_updateDid_req.addName = this.addDid_section3.value.section3_bankingCharge_amt_name_txtbox;
    api_updateDid_req.shippingAmt = $('#shipping_amt_id').val();
    api_updateDid_req.add_amt = $('#bankingCharge_amt_id').val();
    api_updateDid_req.netTotal = $('#section3_grand_total').val();
    api_updateDid_req.remarks = this.addDid_section3.value.section3_remarks;
    api_updateDid_req.previous_due_state = this.addDid_section3.value.section3_previousDue;
    api_updateDid_req.terms_cond_chk = this.addDid_section3.value.section3_termCondition;
    api_updateDid_req.terms_cond1 = this.addDid_section3.value.section3_Terms1;
    api_updateDid_req.terms_cond2 = this.addDid_section3.value.section3_Terms2;
    api_updateDid_req.terms_cond3 = this.addDid_section3.value.section3_Terms3;
    api_updateDid_req.terms_cond4 = this.addDid_section3.value.section3_Terms4;
    api_updateDid_req.terms_cond5 = this.addDid_section3.value.section3_Terms5;

    api_updateDid_req.signatureId = this.addDid_section3.value.section3_select_additional_signature;
    api_updateDid_req.received_signature = this.chkReceivedAuthorizedSignature;
    api_updateDid_req.logo = this.addDid_section3.value.section3_logo;

    // api_updateDid_req.grossTotal = $('#section3_gross_total').val();
    // api_updateDid_req.discountAmount =  $('#finalDiscount_amt').val();
    // api_updateDid_req.taxId = this.addDid_section3.value.section3_gst_dropdown;
    // api_updateDid_req.taxAmt = $('#Tax_amt_id').val();
    // api_updateDid_req.shippingAmt = $('#shipping_amt_id').val();
    // api_updateDid_req.add_amt = $('#bankingCharge_amt_id').val();
    // api_updateDid_req.netTotal = $('#section3_grand_total').val();
    // api_updateDid_req.remarks = this.addDid_section3.value.section3_remarks;
    // api_updateDid_req.terms_cond_chk = this.addDid_section3.value.section3_termCondition;
    // api_updateDid_req.received_signature = this.addDid_section3.value.section3_receivedAuthorizedSignature;
    // api_updateDid_req.logo = this.addDid_section3.value.section3_logo;
    // api_updateDid_req.signatureId = this.addDid_section3.value.section3_select_additional_signature;

    // Discount
    api_updateDid_req.dis_per1 = this.FixedDiscountForm.value.FixedDiscountForm_Percentage;
    api_updateDid_req.dis_amt1 = this.FixedDiscountForm.value.FixedDiscountForm_Direct;
    api_updateDid_req.dis_type1 = this.FixedDiscountForm.value.fix_DiscountTYpe;
    api_updateDid_req.dis_per2 = this.UsageDiscountForm.value.UsageDiscountForm_Percentage;
    api_updateDid_req.dis_amt2 = this.UsageDiscountForm.value.UsageDiscountForm_Direct;
    api_updateDid_req.dis_type2 = this.UsageDiscountForm.value.use_DiscountTYpe;
    api_updateDid_req.dis_per3 = this.OtherDiscountForm.value.OtherDiscountForm_Percentage;
    api_updateDid_req.dis_amt3 = this.OtherDiscountForm.value.OtherDiscountForm_Direct;
    api_updateDid_req.dis_type3 = this.OtherDiscountForm.value.oth_DiscountTYpe;
    api_updateDid_req.discountPer = this.FinalDiscountForm.value.FinalDiscountForm_Percentage;
    // api_updateDid_req.discountAmount = this.FinalDiscountForm.value.FinalDiscountForm_Direct;
    api_req.element_data = api_updateDid_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.upd_flagName=response.searchFlag;
        this.upd_search_name=response.search_name;
        iziToast.success({
          title: 'Updated',
          message: 'DID Invoice Updated Successfully !',
        });
        this.gotoDIDInvoiceList();
        this.router.navigate(['/ProformaInvoice'], {
          queryParams: {
            upd_searchFlag: this.upd_flagName,
            upd_search_name: this.upd_search_name
          }
        });
        this.spinner.hide();
        // this.redirecttoQuotation();
        // this.addDid_section1.reset();
        // this.did_Invice_fixed_charges.reset();
        // this.did_Invice_usage_Charges.reset();
        // this.did_Invice_other_charges.reset();

        // this.addDid_section3.reset();
      }
      else {
        iziToast.warning({
          message: "DID Invoice Not Updated Successfully",
          position: 'topRight'
        });
        this.gotoDIDInvoiceList();
        this.spinner.hide();
      }

    });

  }
  gotoDIDInvoiceList() {

    this.router.navigate(['/ProformaInvoice']);

  }

  addCommission() {

  }


  // increment and decrement

  addButton = 1;
  plus(v: any) {
    console.log(v)
    if (this.addButton != 50) {
      this.addButton++;
      $("#did_diff_date_1_" + v).val(this.addButton)
    }

  }

  minus(v: any) {
    if (this.addButton != -50) {
      this.addButton--;
      $("#did_diff_date_1_" + v).val(this.addButton)
    }
  }


  addButton2 = 1;
  plus2(v: any) {

    if (this.addButton2 != 50) {
      this.addButton2++;
      $("#did_diff_date2_" + v).val(this.addButton2)
    }

  }

  minus2(v: any) {
    if (this.addButton2 != -50) {
      this.addButton2--;
      $("#did_diff_date2_" + v).val(this.addButton2)
    }
  }


  addButton3 = 1;
  plus3(v: any) {

    if (this.addButton3 != 50) {
      this.addButton3++;
      $("#did_diff_date3_" + v).val(this.addButton3)
    }

  }

  minus3(v: any) {
    if (this.addButton3 != -50) {
      this.addButton3--;
      $("#did_diff_date3_" + v).val(this.addButton3)
    }
  }

  // Fixed Charges

  totalCalculate_1() {
    var total_amt: any;
    var addr = this.did_Invice_fixed_charges.value.fixedAddresses;
    var list_cnt = addr.length;
    var total_amt_tot = 0;

    for (let a = 0; a < list_cnt; a++) {
      total_amt = $('#amt_1_' + a).val();
      console.log('subtotal 1...' + total_amt);
      if (!isNaN(total_amt) && total_amt != '') {
        total_amt_tot += parseFloat(total_amt);
      }

      this.sub_total_glb1 = total_amt_tot;
      $('#sub_total_1').val(total_amt_tot);
      console.log('sub_total =' + total_amt_tot);

    }

  }
  percentPriceClear() {
    this.txtbox_percentPriceClear = '';

    $('#enablePriceFinal_1').val('');
  }
  directPriceClear() {
    this.txtbox_directPriceClear = '';
    $('#enablePerFinal_1').val('');
  }
  US_percentPriceClear() {
    this.UsageSave_directPriceClear = '';
    $('#enablePriceFinal_2').val('');
  }
  US_directPriceClear() {
    this.UsageSave_percentPriceClear = '';
    $('#enablePerFinal_2').val('');
  }
  OS_percentPriceClear() {
    this.OtherSave_directPriceClear = '';
    $('#enablePriceFinal_3').val('');
  }
  OS_directPriceClear() {
    this.OtherSave_percentPriceClear = '';
    $('#enablePerFinal_3').val('');
  }

  FD_percentPriceClear() {

    this.FinalDiscount_directPriceClear = '';
    $('#enablePriceFinal_4').val('');

  }
  FD_directPriceClear() {
    this.FinalDiscount_percentPriceClear = '';
    $('#enablePerFinal_4').val('');
  }

  fixedSaveDiscount() {

    var enablePerFinal_1 = $('#enablePerFinal_1').val()

    var disType = $('input:radio[name=fix_DiscountTYpe]:checked').val();

    var final_tot = $('#sub_total_1').val();
    console.log('final_tot', final_tot);
    $('#sub_discount_type_1').val(disType);
    var price: any;
    var fixedCharge_TotalAmount = 0;
    var enablePriceFinal_1 = $('#enablePriceFinal_1').val()
    if (disType == 'per') {
      $('#sub_total_1').val('');
      if (enablePerFinal_1 != '') {
        for (let a = 0; a < this.did_Invice_fixed_charges.value.fixedAddresses.length; a++) {


          fixedCharge_TotalAmount += parseFloat($('#amt_1_' + a).val());

          console.log("dummy inside", fixedCharge_TotalAmount)

        }
        console.log("dummy outside", fixedCharge_TotalAmount)


        price = (parseFloat(enablePerFinal_1) * (fixedCharge_TotalAmount) / 100);
        console.log(price);
        $('#sub_discount_1').val(price.toFixed(2));
        $('#sub_discount_val_1').val(enablePerFinal_1);
        price = fixedCharge_TotalAmount - price;
        console.log("sub_total", price);
        $('#sub_total_1').val(price.toFixed(2));
        this.gross_total();

      } else {
        $('#sub_discount_1').val('');
        $('#sub_discount_val_1').val('');

        price = final_tot;
        this.gross_total();

      }
    }
    else {
      for (let a = 0; a < this.did_Invice_fixed_charges.value.fixedAddresses.length; a++) {


        fixedCharge_TotalAmount +=parseFloat($('#amt_1_' + a).val());

        console.log("dummy inside", fixedCharge_TotalAmount)

      }
      price = fixedCharge_TotalAmount - enablePriceFinal_1;
      console.log('price_fin' + price);
      $('#sub_total_1').val(price.toFixed(2));
      $('#sub_discount_1').val(enablePriceFinal_1);
      $('#sub_discount_val_1').val(enablePriceFinal_1);
      this.gross_total();
    }

    $('#sub_total_1').val(price.toFixed(2))


    this.getTaxCals();
    this.extraFees();


    $('#fixedDiscountFormId').modal('hide');

  }


  // usage Charges


  totalCalculate_2() {
    var total_amt: any;
    var addr = this.did_Invice_usage_Charges.value.usageAddress;
    var list_cnt = addr.length;
    var total_amt_tot = 0;

    for (let a = 0; a < list_cnt; a++) {
      total_amt = $('#amt2_' + a).val();
      console.log('subtotal 2...' + total_amt);
      if (!isNaN(total_amt) && total_amt != '') {
        total_amt_tot += parseFloat(total_amt);
      }

      this.sub_total_glb1 = total_amt_tot;
      $('#sub_total_2').val(total_amt_tot.toFixed(2));
      console.log('sub_total =' + total_amt_tot);

    }


  }

  usageSaveDiscount() {

    var enablePerFinal_2 = $('#enablePerFinal_2').val()

    var disType = $('input:radio[name=use_DiscountTYpe]:checked').val();

    var final_tot = $('#sub_total_2').val();
    console.log('final_tot', final_tot);
    $('#sub_discount_type_2').val(disType);
    var usage_price: any;
    var usageCharge_TotalAmount = 0;
    var enablePriceFinal_2 = $('#enablePriceFinal_2').val()
    if (disType == 'per') {
      $('#sub_total_2').val('');
      if (enablePerFinal_2 != '') {
        for (let a = 0; a < this.did_Invice_usage_Charges.value.usageAddress.length; a++) {

          usageCharge_TotalAmount +=parseFloat($('#amt2_'+a).val());

          console.log("dummy inside", usageCharge_TotalAmount)

        }
        console.log("dummy outside", usageCharge_TotalAmount)


        usage_price = (parseFloat(enablePerFinal_2) * (usageCharge_TotalAmount) / 100);
        console.log(usage_price);
        $('#sub_discount_2').val(usage_price.toFixed(2));
        $('#sub_discount_val_2').val(enablePerFinal_2);
        usage_price = usageCharge_TotalAmount - usage_price;
        console.log("sub_total", usage_price);
        $('#sub_total_2').val(usage_price);
        this.gross_total();

      } else {
        $('#sub_discount_2').val('');
        $('#sub_discount_val_2').val('');

        usage_price = final_tot;
        this.gross_total();

      }
    }
    else {
      for (let a = 0; a < this.did_Invice_usage_Charges.value.usageAddress.length; a++) {

        // usageCharge_TotalAmount =Number((Number(usageCharge_TotalAmount) + Number($('#amt2_' + a).val())).toFixed(2));

         usageCharge_TotalAmount += parseFloat($('#amt2_' + a).val());

        console.log("dummy inside", usageCharge_TotalAmount)

      }
      usage_price = usageCharge_TotalAmount - enablePriceFinal_2;
      console.log('usage_price_fin' + usage_price);
      $('#sub_total_2').val(usage_price.toFixed(2));
      $('#sub_discount_2').val(enablePriceFinal_2);
      $('#sub_discount_val_2').val(enablePriceFinal_2);
      this.gross_total();
    }

    $('#sub_total_2').val(usage_price.toFixed(2));


    this.getTaxCals();
    this.extraFees();


    $('#usageDiscountFormId').modal('hide');

  }






  // other charges

  totalCalculate_3() {
    var total_amt: any;
    var addr = this.did_Invice_other_charges.value.otherAddress;
    var list_cnt = addr.length;
    var total_amt_tot = 0;

    for (let a = 0; a < list_cnt; a++) {
      total_amt = $('#amt3_' + a).val();
      console.log('subtotal 3...' + total_amt);
      if (!isNaN(total_amt) && total_amt != '') {
        total_amt_tot += parseFloat(total_amt);
      }

      this.sub_total_glb1 = total_amt_tot.toFixed(2);
      $('#sub_total_3').val(total_amt_tot);
      console.log('sub_total =' + total_amt_tot);

    }

  }


  otherSaveDiscount() {

    var enablePerFinal_3 = $('#enablePerFinal_3').val()

    var disType = $('input:radio[name=oth_DiscountTYpe]:checked').val();

    var final_tot = $('#sub_total_3').val();
    console.log('final_tot', final_tot);
    $('#sub_discount_type_3').val(disType);
    var other_price: any;
    var usageCharge_TotalAmount = 0;
    var enablePriceFinal_3 = $('#enablePriceFinal_3').val()
    if (disType == 'per') {
      $('#sub_total_3').val('');
      if (enablePerFinal_3 != '') {
        for (let a = 0; a < this.did_Invice_other_charges.value.otherAddress.length; a++) {


          usageCharge_TotalAmount +=parseFloat($('#amt3_' + a).val());

          console.log("dummy inside", usageCharge_TotalAmount)

        }
        console.log("dummy outside", usageCharge_TotalAmount)


        other_price = (parseFloat(enablePerFinal_3) * (usageCharge_TotalAmount) / 100);
       
        $('#sub_discount_3').val(other_price);
        $('#sub_discount_val_3').val(enablePerFinal_3);
        other_price = usageCharge_TotalAmount - other_price;
        console.log("sub_total", other_price);
        $('#sub_total_3').val(other_price);
        this.gross_total();

      } else {
        $('#sub_discount_3').val('');
        $('#sub_discount_val_3').val('');

        other_price = final_tot;
        this.gross_total();

      }
    }
    else {
      for (let a = 0; a < this.did_Invice_other_charges.value.otherAddress.length; a++) {
usageCharge_TotalAmount +=parseFloat($('#amt3_' + a).val());

        console.log("dummy inside", usageCharge_TotalAmount)

      }
      other_price = usageCharge_TotalAmount - enablePriceFinal_3;
      console.log('other_price_fin' + other_price);
      $('#sub_total_3').val(other_price.toFixed(2));
      $('#sub_discount_3').val(enablePriceFinal_3);
      $('#sub_discount_val_3').val(enablePriceFinal_3);
      this.gross_total();
    }

    $('#sub_total_3').val(other_price.toFixed(2))


    this.getTaxCals();
    this.extraFees();


    $('#otherDiscountFormId').modal('hide');

  }

  gross_total() {
    var total_amt: any = 0;
    var gross_tot = 0;

    var sub_total1, sub_total2, sub_total3: any = 0;

    sub_total1 = $('#sub_total_1').val();
    console.log("sub_total1", sub_total1);
    sub_total2 = $('#sub_total_2').val();
    console.log("sub_total2", sub_total2);
    sub_total3 = $('#sub_total_3').val();
    console.log("sub_total3", sub_total3);

    if (sub_total1 == '' && sub_total2 == '' && sub_total3 == '') {
      total_amt = 0;
      console.log("total amount 000", total_amt);
    } else if (sub_total1 == '' && sub_total2 == '' && sub_total3 !== '') {
      total_amt = (Number(sub_total3));
      console.log("total amount 001", total_amt);
    } else if (sub_total1 == '' && sub_total2 !== '' && sub_total3 == '') {
      total_amt = (Number(sub_total2));
      console.log("total amount 010", total_amt);
    } else if (sub_total1 == '' && sub_total2 !== '' && sub_total3 !== '') {
      total_amt = (parseFloat(sub_total2)) + (parseFloat(sub_total3));
      console.log("total amount 011", total_amt);
    } else if (sub_total1 !== '' && sub_total2 == '' && sub_total3 == '') {
      total_amt = (parseFloat(sub_total1))
      console.log("total amount 100", total_amt);
    } else if (sub_total1 !== '' && sub_total2 == '' && sub_total3 !== '') {
      total_amt = (parseFloat(sub_total1)) + (parseFloat(sub_total3));
      console.log("total amount 101", total_amt);
    } else if (sub_total1 !== '' && sub_total2 !== '' && sub_total3 == '') {
      total_amt = (parseFloat(sub_total1)) + (parseFloat(sub_total2));
      console.log("total amount 110", total_amt);
    } else {
      total_amt = (parseFloat(sub_total1)) + (parseFloat(sub_total2)) + (parseFloat(sub_total3));
    }
    // total_amt = (parseFloat(sub_total1)) + (parseFloat(sub_total2)) + (parseFloat(sub_total3));
    this.grossTotal_BeforeDiscount = total_amt.toFixed(2);
    console.log("total_amt-gross", total_amt.toFixed(2));
    gross_tot += parseFloat(total_amt);
    $('#section3_gross_total').val(gross_tot.toFixed(2));

    this.grossTotalAfterDiscount();
  }

  finalSaveDiscount() {

    var enablePerFinal_4 = $('#enablePerFinal_4').val()
    var enablePriceFinal_4 = $('#enablePriceFinal_4').val()
    var disType = $('input:radio[name=final_DiscountTYpe]:checked').val();
    var final_tot = $('#section3_gross_total').val();
    console.log('final_tot' + final_tot);
    $('#final_discount_type').val(disType);
    var price: any;
    var dis_etr: any;
    var directFinal: any;


    if (disType == 'per') {

      if (enablePerFinal_4 != '') {

        dis_etr = (parseFloat(enablePerFinal_4) * parseFloat(final_tot) / 100);

        $('#finalDiscount_amt').val(dis_etr.toFixed(2));

        price = final_tot - dis_etr;

        $('#section3_gross_total_afterDiscount').val(price.toFixed(2));



      }
    }
    else {
      directFinal = final_tot - enablePriceFinal_4;

      $('#finalDiscount_amt').val(enablePriceFinal_4);
      $('#section3_gross_total_afterDiscount').val(directFinal.toFixed(2));

    }

    this.getTaxCals();
    this.extraFees();



    $('#discountFormFinal').modal('hide');



  }

  grossTotalAfterDiscount() {
    var enablePerFinal_4_AD = $('#enablePerFinal_4').val()
    var enablePriceFinal_4_AD = $('#enablePriceFinal_4').val()
    var disType = $('input:radio[name=final_DiscountTYpe]:checked').val();
    var final_tot = $('#section3_gross_total').val();
    $('#final_discount_type').val(disType);
    var price: any;
    var getTax: any;
    var ept: any
    var directFinal: any;
    if (disType == 'per' && enablePerFinal_4_AD != "") {

      price = (parseFloat(enablePerFinal_4_AD) * parseFloat(final_tot) / 100);
      ept = final_tot - price;

      $('#finalDiscount_amt').val(price.toFixed(2));
      $('#section3_gross_total_afterDiscount').val(ept.toFixed(2));
      getTax = (parseFloat(ept) * parseFloat(this.tax_per_mod) / 100);
      $('#tax_amt_id').val(getTax.toFixed(2));

    }
    else if (disType == 'amt' && enablePriceFinal_4_AD != "") {
      directFinal = final_tot - enablePriceFinal_4_AD;

      $('#finalDiscount_amt').val(enablePriceFinal_4_AD);
      $('#section3_gross_total_afterDiscount').val(directFinal.toFixed(2));


    }else{

      $('#section3_gross_total_afterDiscount').val(final_tot);

    }

    // this.getTaxCals();
    //this.extraFees();
    $('#discountFormFinal').modal('hide');

  }

  extraFees() {

    var test;
    var getafterdiscountval;
   

    if ($('#section3_gross_total_afterDiscount').val() == '' || $('#section3_gross_total_afterDiscount').val() == 0) {
      getafterdiscountval = parseFloat($('#section3_gross_total').val());
      test = Number(getafterdiscountval) + Number($("#Tax_amt_id").val()) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());
      test = test.toFixed(2);
     $('#section3_grand_total').val(test);

    } else {
      getafterdiscountval = $('#section3_gross_total_afterDiscount').val();
      test = Number(getafterdiscountval) + Number($("#Tax_amt_id").val()) + Number($('#shipping_amt_id').val()) + Number($('#bankingCharge_amt_id').val());
      test = test.toFixed(2);
      $('#section3_grand_total').val(test);

    }

  }


  set_display_none(cnt: any) {
    //PN
    if ($('#pd_split_' + cnt).prop('checked') == true) {
      $('#particular_1' + cnt).fadeOut(1000);
      $('#fromdt_1' + cnt).fadeOut(1000);
      $('#todt_1' + cnt).fadeOut(1000);
      $('#md_chk_1' + cnt).fadeOut(1000);
      $('#did_diff_date_1' + cnt).fadeOut(1000);
      $('#productDesc_1' + cnt).fadeOut(1000);
      $('#amt_1' + cnt).fadeOut(1000);
      $('#call_duration_1' + cnt).fadeOut(1000);

      $('#particular_1' + cnt).val('');
      $('#fromdt_1' + cnt).val('');
      $('#todt_1' + cnt).val('');
      $('#md_chk_1' + cnt).val('');
      $('#did_diff_date_1' + cnt).val('');
      $('#productDesc_1' + cnt).val('');
      $('#amt_1' + cnt).val('');
      $('#call_duration_1' + cnt).val('');

    } else {
      $('#particular_1' + cnt).fadeIn(1000);
      $('#fromdt_1' + cnt).fadeIn(1000);
      $('#todt_1' + cnt).fadeIn(1000);
      $('#md_chk_1' + cnt).fadeIn(1000);
      $('#did_diff_date_1' + cnt).fadeIn(1000);
      $('#productDesc_1' + cnt).fadeIn(1000);
      $('#amt_1' + cnt).fadeIn(1000);
      $('#call_duration_1' + cnt).fadeIn(1000);
    }
  }

  goBack() {
    this.router.navigate(['/ProformaInvoice']);

  }
  quotationAddSignature() {
    let api_req: any = new Object();
    let api_quotationAddSignature_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_add_signature";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationAddSignature_req.action = "quotation_add_signature";
    api_quotationAddSignature_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationAddSignature_req.billerId = this.BillerID_CompanyName;
   // api_quotationAddSignature_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = api_quotationAddSignature_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {

        this.quotationAddSignature_state = response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        this.quotationAddSignature_filename = response.signature_filename;
      }
      else {

      }
    });
  }

  invoiceAddSignatureEdit(sign_val: any) {

    let api_req: any = new Object();
    let api_invoiceAddSignatureEdit_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_add_signature_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceAddSignatureEdit_req.action = "invoice_add_signature_edit";
    
    api_invoiceAddSignatureEdit_req.user_id =  this.userID_Edit;
   // api_invoiceAddSignatureEdit_req.user_id = this.addDid_section1.value.salesRep;
    api_invoiceAddSignatureEdit_req.billerId = this.BillerID_CompanyName;
   // api_invoiceAddSignatureEdit_req.billerId = this.addDid_section1.value.companyName;
   if(  this.edit_flag==false && this.duplicate_flag==true){
 
    api_invoiceAddSignatureEdit_req.billId = this.edit_Duplicate_ID;
    }
    else if (this.edit_flag==true && this.duplicate_flag==false){
      api_invoiceAddSignatureEdit_req.billId = this.editbillerID;
    
    }
    else{

    }
    // api_invoiceAddSignatureEdit_req.billId = this.editbillerID;
    api_req.element_data = api_invoiceAddSignatureEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {

        this.invoiceAddSignature_state = response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        if (sign_val == 0) {
          console.log('response.signature_filename' + response.signature_filename);
          this.invoiceAddSignature_filename = response.signature_filename;
        }else{
          this.invoiceAddSignature_filename = response.signature_filename;
        }
        if(this.invoiceAddSignature_filename==1){
          this.checkbox_selectAdditionalSignature=true;
        }else{
          this.checkbox_selectAdditionalSignature=false;
        }

        this.invoiceAddSignatureCHKShowState = response.invoice_signature_show_state;

        this.addDid_section3.patchValue({
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
