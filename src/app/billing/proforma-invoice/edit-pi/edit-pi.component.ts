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
  selector: 'app-edit-pi',
  templateUrl: './edit-pi.component.html',
  styleUrls: ['./edit-pi.component.css']
})
export class EditPIComponent implements OnInit {


  public addPI_section1: FormGroup;
  public addPI_section2: FormGroup;
  public addPI_section3: FormGroup;
  public addresses: FormArray;
  public DiscountForm: FormGroup;
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
  exportState_value: any;

  bills_logo_id_radio: any
  billsLogo_value: any;
  radioID_Logo: any;

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
  chkReceivedAuthorizedSignature: boolean = true;

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
  invoicePriceKey: any;
  //mile
  radioID_Mile: any;
  radio_Value_Mile: any
  radio_Value_Export_edit:any;
   //export state-check box
   export_state: any;
   radioSelectFooter: any = '1';

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
  mileDetails: any;
  MSDisplay_Value: boolean = true;
  mileDiscountState_value: any;
  mile_discount_state_radio: any;
  MSDisplayDetails:any;
  ckeck_value_MileDisplay:any;
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
  net_amt: any;
  shipping_amt: any;
  invocePriceKey: any;
  row_cnt_mod: any;
  checkbox_selectReceivedSignature: any;

  radio_Value_Export_logo:any;
  //  quotationAddSignature
  quotationAddSignature_state: any;
  quotationAddSignature_filename: any;
  selectAdditionalSign: boolean = true;
  selectReceivedSign: boolean = true;
  sign_state: number;
  invoiceAddSignature_state: any;
  invoiceAddSignature_filename: any;
  invoiceAddSignatureCHKShowState: any;
  received_signature_state: any;
  print_logo_state: any;
  bankingCharge: any;
  salesRepDropDown_Textbox_Status: any;

  //read only fields
  isReadonly: boolean = true;
  input1: string;
  input2: string;
  input3: string;
  input4: string;

  // input1: any;
  // input2: any;
 radio_Value_InvoiceType:any;
  radio_Value_ExportState:any;
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {

    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });


  }

  ngOnInit(): void {

    this.mileDetails = [{ "name": "Local", "id": 1 }, { "name": "Export  ", "id": 2 }, { "name": "Zero Valid", "id": 3 }];


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

    this.mile_discount_state_radio = [

      { name: 'Discount', selected: false, id: 1 },
      { name: 'Mile Stone', selected: false, id: 2 },


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

    this.bills_logo_id_radio = [
      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: 'DID Sg', selected: false, id: 3 },
      { name: 'Callcloud', selected: false, id: 4 },
      { name: 'Mrvoip', selected: false, id: 5 },
      { name: 'None', selected: false, id: 0 },
    ];
    this.MSDisplayDetails = [
      { name: 'MSDisplay', selected: false, id: 1 },
      { name: 'MSDisplay', selected: false, id: 2 },
    
    ];


    this.addPI_section1 = new FormGroup({
      'initial': new FormControl(),
      'billId_edit': new FormControl(),
      'companyName': new FormControl(null, [Validators.required]),
      'customer_name': new FormControl(),
      'invoiceNo': new FormControl(),
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
      'ship_to': new FormControl(),
      'shipTo_1': new FormControl(),
      'shipTo_2': new FormControl(),
      'shipTo_3': new FormControl(),
      'shipTo_4': new FormControl(),
      'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'salesRep_id': new FormControl(null),
      'ShipBy': new FormControl(),
      'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'Attn_2': new FormControl(),
      'terms': new FormControl(),
      'Ref': new FormControl(),
      'Currency': new FormControl(),
      'CurrencyConversionRate': new FormControl(),
      'PaymentVia': new FormControl(),
      'e_export_state': new FormControl(),
      'bills_logo_id': new FormControl(),
      'mile_discount_state': new FormControl(),
      'mile_MSDisplay': new FormControl(),
      'msDisplayFC': new FormControl(),
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
      'banking_charge_name': new FormControl(null),
      'banking_charge_amt': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_termCondition': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),
      'section3_select_additional_signature': new FormControl({ value: '', disabled: false }, Validators.required),
    });
    this.DiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),

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
      pd_billchild_id: '',
      pd_nextPage_checkbox: '',
      pd_productName_txtbox1: '',
      // pd_productName_txtArea: '',
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

  removeAddresstest_test(i: number) {

    console.log(i)
    console.log(this.addresses)
    this.addresses.removeAt(i);
    var addr = this.addPI_section2.value.addresses;
    var list_cnt = addr.length;
    this.totalCalculate();
    setTimeout(() => {      
       this.saveGrossDiscount();
    }, 500);

  }

  // removeAddresstest(i: number) {
  

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value) {
     

  //       console.log(i)
  //       console.log(this.addresses)
  //       this.addresses.removeAt(i);
  //       var addr = this.addPI_section2.value.addresses;
  //       var list_cnt = addr.length;
  //       this.totalCalculate();
  //       setTimeout(() => {      
  //          this.saveGrossDiscount();
  //       }, 500);
       




  //     }
  //   })


  // }
  // logo......

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





  removeParticular(i: number) {
   
    console.log('iiii--' + i)
    console.log(this.addresses)

    var pd_billchild_id = $('#pd_billchild_id_' + i).val();
    console.log('pd_billchild_id'+pd_billchild_id);

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
        this.totalCalculate();


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
          console.log("response", response)


        });





      }
    })


  }
  checkbox_selectAdditionalSignature: any;

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


  eventCheckSelectReceivedSignature(e: any) {
    this.checkbox_selectReceivedSignature = e.target.checked
   // console.log(this.checkbox_selectAdditionalSignature);
  }


  handleChange_ExportState(data: any, evt: any) {

    this.radioID_Export = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_ExportState = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radio_Value_ExportState);
    // console.log("radio button id value", xyz);
  }


  handleChange_mileSate_InvoiceType(data: any, evt: any) {

    this.radioID_Logo = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_InvoiceType = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radio_Value_InvoiceType);
    // console.log("radio button id value", xyz);
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

  
 
  handleChange_MSDisplay(event: any) {
    this.MSDisplay_Value = event.target.checked;
    // this.MSDisplay_Value = id;
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
  getProformaBillerDetails() {
    //  this.getProformaBillerDetails_BillerID = event.target.value;
    this.spinner.show();
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
      this.spinner.hide();
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
    addAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      this.currencyNameList = response.currency_list;
      this.ShipByList = response.ship_by;
      // this.salesRepList = response.sales_rep;
      this.paymentviaList = response.paymentvia;
     // console.log("Status", response.sales_rep_status.dropdown_status+'---'+response.sales_rep.name+'---'+response.sales_rep.userid);
      this.salesRepDropDown_Textbox_Status=response.sales_rep_status.dropdown_status;
      if (response.sales_rep_status.dropdown_status == 0) {
        this.addPI_section1.patchValue({
          'salesRep_id': response.sales_rep.name,
          'salesRep': response.sales_rep.userid,
        });

      } else {        
        this.salesRepList = response.sales_rep;
        this.addPI_section1.patchValue({
          'salesRep': localStorage.getItem('erp_c4c_user_id'),
        });


      }

      //  this.TaxDropdown();
      console.log("response-load-pi", response)
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

        }, 1000);
        // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
        console.log('response.default_tax_id' + response.default_tax_id);



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
      console.log("vignesh-customer_name response", response.customer_list.customerId);
      this.searchResult = response.customer_list;

      if (response.status = true) {

        this.addPI_section1.patchValue({
          "customer_id_hd": response.customer_list.customerId
        })

      }

    });

  }
  searchCustomer_selectDropdownData(data: any) {
    this.spinner.show();

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
    api_SearchCUST_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {

        this.addPI_section1.patchValue({
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
          "Attn_2": response.customer_list.ship_attn,
        });


      }
      else {

      }

    });
  }



  PIUpdate() {

    this.updatePI();

  }




  getCustomerInvoiceDetails(event: any) {
    this.spinner.show();
    this.billerID = event.target.value;
    console.log("billerID check", this.billerID);

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
          // 'companyName':  this.billerID,
          'invoiceNo': response.invoice_no,
          'Currency': response.currency_id,


        });

        setTimeout(() => {
          this.addPI_section3.patchValue({
            'section3_gst_dropdown': response.default_tax_id,
          });

        }, 1000);

        
      }
      else {
        this.addPI_section1.patchValue({

          'invoiceNo': '',
          'Currency': '',
        });
      }

    });

  }
  editPI() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_editPI_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/edit_profoma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPI_req.action = "edit_profoma_invoice";
    api_editPI_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_editPI_req.billId = this.editbillerID;
    api_req.element_data = api_editPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
        this.spinner.hide();
        this.exportState_value = response.billing_pararent_details[0].export_state;
        this.mileDiscountState_value = response.billing_pararent_details[0].mile_discount_state;
        console.log(" this.mileDiscountState_value", this.mileDiscountState_value)
        this.billsLogo_value = response.billing_pararent_details[0].bills_logo_id;
        // this.getCustomerInvoiceDetails(response.billing_pararent_details[0].billerId);


       this.radio_Value_Export_logo= response.billing_pararent_details[0].bills_logo_id;
       this.radio_Value_ExportState= response.billing_pararent_details[0].export_state;;
       this.radio_Value_InvoiceType= response.billing_pararent_details[0].mile_discount_state;
       this.ckeck_value_MileDisplay=response.billing_pararent_details[0].mile_discount_display_state;
       
        this.addPI_section1.patchValue({
          'billId_edit': response.billing_pararent_details[0].billId,
          'companyName': response.billing_pararent_details[0].billerId,
          'BillTo': response.billing_pararent_details[0].b_name,
          'customer_name': response.billing_pararent_details[0].b_name,
          'customer_id_hd': response.billing_pararent_details[0].custId,
          'address_1': response.billing_pararent_details[0].b_address,
          // 'address_2': response.billing_pararent_details[0].b_address2,
          // 'address_3': response.billing_pararent_details[0].b_address3,
          'Attn_1': response.billing_pararent_details[0].b_attn,
          // 'shpi_address_1': response.billing_pararent_details[0].b.ship_address_1,
          // 'shpi_address_2': response.billing_pararent_details[0].b.ship_address_3,
          // 'shpi_address_3': response.billing_pararent_details[0].b.ship_address_1,
          'Attn_2': response.billing_pararent_details[0].s_attn,
          'Ref': response.billing_pararent_details[0].ref,

          'invoiceNo': response.billing_pararent_details[0].invoice_no,
          'tin': response.billing_pararent_details[0].tinNo,
          'cst': response.billing_pararent_details[0].cstNo,
          'Date': response.billing_pararent_details[0].billDate,
          'PoNo': response.billing_pararent_details[0].po_no,
          'PoDate': response.billing_pararent_details[0].po_date,
          // 'salesRep': response.billing_pararent_details[0].sales_rep,
          'ShipBy': response.billing_pararent_details[0].ship_by,
          'ShipDate': response.billing_pararent_details[0].ship_date,
          'terms': response.billing_pararent_details[0].terms,
          'Currency': response.billing_pararent_details[0].currency,
          'CurrencyConversionRate': response.billing_pararent_details[0].conversionRate,
          'PaymentVia': response.billing_pararent_details[0].paymentVIA,
          'e_export_state': response.billing_pararent_details[0].export_state,
          'mile_discount_state': response.billing_pararent_details[0].mile_discount_state,
          'ReferenceResellerName': response.billing_pararent_details[0].reference_reseller_name,
          'ExtraLogo': response.billing_pararent_details[0].bills_logo_id,
          'msDisplayFC':response.billing_pararent_details[0].mile_discount_display_state,

        });

        this.radio_Value_Mile=response.billing_pararent_details[0].mile_discount_state
        this.addPI_section1.controls['e_export_state'].setValue('response.billing_pararent_details[0].export_state');
        this.TaxDropdown();

        console.log('billchild_details.length' + response.billchild_details.length);
        this.Customer_selectDropdownData(response.billing_pararent_details[0].custId);
        // this.getProformaBillerDetails();
        const formArray = new FormArray([]);
        for (let index = 0; index < response.billchild_details.length; index++) {







          formArray.push(this.fb.group({
            "pd_billchild_id": response.billchild_details[index].billChildid,
            "pd_nextPage_checkbox": response.billchild_details[index].to_next_page,
            "pd_productName_txtbox1": response.billchild_details[index].productName,
            "pd_productName_txtArea": response.billchild_details[index].productDesc,
            "pd_quantity_txtbox1": response.billchild_details[index].quantity,
            "pd_unit": response.billchild_details[index].unit,
            "pd_sellingPrice": response.billchild_details[index].rate,
            "pd_Total": response.billchild_details[index].total_amt,
            "pd_netPrice": response.billchild_details[index].net_amt,
            "pd_OutCall": response.billchild_details[index].out_call_state== 1 ? true : false,
            "sub_dis_amt": response.billchild_details[index].dis_amt,
            "sub_dis_type": response.billchild_details[index].dis_type,
            "sub_dis_val": response.billchild_details[index].dis_per,
            "pd_CMon": response.billchild_details[index].current_month== 1 ? true : false,
            "pd_selectTax": response.billchild_details[index].exc_tax_state == 1 ? true : false,

          })

          );
        }


        console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        console.log(this.addresses)

        this.finalDiscountType = '';
        this.finalDiscountVal='';
        // this.finalDiscount='';
        console.log('response.signature_filename'+response.billing_pararent_details[0].signature_filename);
       
        if(response.billing_pararent_details[0].signature_filename!=''){
          this.sign_state=1;
        }
        this.quotationAddSignature_filename=response.billing_pararent_details[0].signature_filename;
  
        if(response.billing_pararent_details[0].discountPer!=''){
          this.finalDiscountType = 'per';
          this.finalDiscountVal=response.billing_pararent_details[0].discountPer; 
        
          // this.finalDiscount=response.billing_pararent_details[0].discountAmount;
        }
        else if(response.billing_pararent_details[0].discountAmount!=''){
          this.finalDiscountType = 'amt';
          this.finalDiscountVal=response.billing_pararent_details[0].discountAmount;
          
        }




        this.addPI_section3.patchValue({



          //row-1

          'section3_gross_total': response.billing_pararent_details[0].grossAmount,
          //row-2
          //  'section3_discount_txtbox': this.finalDiscount,
          'section3_discount_txtbox': response.billing_pararent_details[0].discountAmount,
           'final_dis_val': this.finalDiscountVal,
           'final_dis_type': this.finalDiscountType,
          // +2 hidden fields
          //taxAmt
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

          //row-8
          'section3_termCondition': response.billing_pararent_details[0].terms_cond_chk,
          //row-9
          'section3_receivedAuthorizedSignature': response.billing_pararent_details[0].received_signature,
          //row-10
          'section3_logo': response.billing_pararent_details[0].logo,
        });

       this.received_signature_state = response.billing_pararent_details[0].received_signature;
       this.print_logo_state = response.billing_pararent_details[0].print_logo;

        // this.addPI_section3.patchValue({
        //   //row-1

        //   'section3_gross_total': response.quotation_details[0].gross_total,
        //   //row-2
        //   //  'section3_discount_txtbox': this.finalDiscount,
        //   //  'final_dis_val': this.finalDiscountVal,
        //   //  'final_dis_type': this.finalDiscountType,
        //   // +2 hidden fields
        //   //row-3
        //   'section3_gst_dropdown': response.billing_pararent_details[0].tax_id1,
        //   'section3_taxAmt_txtbox': response.billing_pararent_details[0].tax_amt1,
        //   'section3_tax_per_hd': response.billing_pararent_details[0].tax_per1,
        //   //row-4
        //   'section3_shipping_amt_name_txtbox': response.billing_pararent_details[0].shippingName,
        //   'section3_shipping_amt_txtbox': response.billing_pararent_details[0].shipping_amt,
        //   //row-5
        //   'section3_grand_total': response.billing_pararent_details[0].grand_total,
        //   //row-7
        //   'section3_remarks': response.billing_pararent_details[0].remarks,

        //   //row-8
        //   'section3_termCondition': response.billing_pararent_details[0].terms_cond_chk,
        //   //row-9
        //   'section3_receivedAuthorizedSignature': response.billing_pararent_details[0].received_signature,
        //   //row-10
        //   'section3_logo': response.billing_pararent_details[0].logo,
        // });
        // this.loadADD();
         this.editAddress();
         this.removeAddresstest_test(response.billchild_details.length);
        // console.log(response.billchild_details.length);
        for (let index = 0; index < response.billchild_details.length; index++) {

          if (response.billchild_details[index].header_split == 1) {

            $('#pd_split_' + [index]).prop('checked', false);
            setTimeout(() => {
              $('#pd_split_' + [index]).click();
            }, 1000);


          }
        }
        this.getProformaBillerDetails();
        this.invoiceAddSignatureEdit(response.billing_pararent_details[0].signtureId);

    
       
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


  Customer_selectDropdownData(customerId: any) {
    //   this.customer_ID=customerId;
    //   this.customer_NAME=data.customerName;
    //    console.log("search data in dropdown", data)
    //    console.log("search data-customer Id", data.customerId)
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


        console.log("ship_address_str1---response", ship_address_str1);
        console.log("ship_address_str2---response", ship_address_str2)
        console.log("ship_address_str3---response", ship_address_str3)


        this.addPI_section1.patchValue({
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



  updatePI() {

    let api_req: any = new Object();
    let api_updatePI_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/update_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_updatePI_req.action = "update_proforma_invoice";
    api_updatePI_req.user_id = localStorage.getItem('erp_c4c_user_id');

    console.log('this.addPI_section3.value.billId_edit' + this.addPI_section1.value.billId_edit);
    api_updatePI_req.billId = this.addPI_section1.value.billId_edit;
    api_updatePI_req.billerId = this.addPI_section1.value.companyName;
    api_updatePI_req.invoice_no = this.addPI_section1.value.invoiceNo;
    api_updatePI_req.customerId = this.addPI_section1.value.customer_id_hd;
    api_updatePI_req.b_name = this.addPI_section1.value.customer_name;
    api_updatePI_req.tinNo = this.addPI_section1.value.tin;
    api_updatePI_req.b_address1 = this.addPI_section1.value.address_1;
    api_updatePI_req.b_address2 = this.addPI_section1.value.address_2;
    api_updatePI_req.b_address3 = this.addPI_section1.value.address_3;
    api_updatePI_req.cstNo = this.addPI_section1.value.cst;
    api_updatePI_req.billDate = this.addPI_section1.value.Date;
    api_updatePI_req.b_attn = this.addPI_section1.value.Attn_1;
    api_updatePI_req.s_name = this.addPI_section1.value.ship_to;
    // console.log('ship_address_1'+this.addPI_section1.value.shipTo_1);
    api_updatePI_req.ship_address_1 = this.addPI_section1.value.shipTo_1,
      api_updatePI_req.ship_address_2 = this.addPI_section1.value.shipTo_2,
      api_updatePI_req.ship_address_3 = this.addPI_section1.value.shipTo_3,
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
    api_updatePI_req.bills_logo_id = this.radio_Value_Export_logo;
    api_updatePI_req.export_state = this.radio_Value_ExportState;
    api_updatePI_req.mile_discount_state = this.radio_Value_InvoiceType;
    api_updatePI_req.mile_discount_display_state = this.MSDisplay_Value;
   

    //section-2
    // api_UpdateEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;



    //section-3

    //row-1

    api_updatePI_req.grossAmount = this.addPI_section3.value.section3_gross_total;
    //row-2
   

    api_updatePI_req.discountAmount = this.addPI_section3.value.section3_discount_txtbox;
    api_updatePI_req.final_dis_type = this.addPI_section3.value.final_dis_type;
    api_updatePI_req.discountPer = this.addPI_section3.value.final_dis_val;
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
    //other row

    api_updatePI_req.terms_cond_chk = this.addPI_section3.value.section3_termCondition;
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

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          message: 'PI Updated Successfully !',
          position: 'topRight'
        });

        this.gotoPIList();
        this.addPI_section1.reset();
        this.addPI_section2.reset();
        this.addPI_section3.reset();

      }
      else {


        iziToast.warning({
          message: "PI Not Saved Successfully",
          position: 'topRight'
        });
        this.gotoPIList();

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
    var netAmt=0;
    // alert(tax_per);
    for (let a = 0; a < list_cnt; a++) {

      total_amt = $('#pd_qty_' + a).val() * $('#pd_SP_' + a).val();
      $('#pd_Total_' + a).val(total_amt);


      discount_type = $('#sub_discount_type_' + a).val();
      console.log('discount_type' + discount_type);
      if (discount_type == 'per') {
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        console.log('discount_type1111' + this.sub_dis_val);
        dis_amt_val = (parseFloat(this.sub_dis_val) * parseFloat(total_amt) / 100).toFixed(2);
        console.log('dis_amt_val' + dis_amt_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(dis_amt_val)
        $('#pd_netPrice_' + a).val(sub_total_amt);
        $('#sub_discount_' + a).val(dis_amt_val);
      } else if (discount_type == 'amt') {
        // console.log('discount_type222'+discount_type);

        this.sub_dis_val = $('#sub_discount_' + a).val();
         console.log('sub_discount_valppp'+this.sub_dis_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(this.sub_dis_val);
        $('#pd_netPrice_' + a).val(sub_total_amt);
      } else {
        $('#pd_netPrice_' + a).val(total_amt);
        sub_total_amt = total_amt;
      }

      if ($('#pd_selectTax_' + a).prop('checked') == true && this.tax_per_mod != null) {
        this.net_amt = $('#pd_netPrice_' + a).val();
        netAmt = parseFloat($('#pd_netPrice_' + a).val());
        console.log('-this.finalDiscount---'+this.finalDiscount);
       // tax_amt = (parseFloat(this.tax_per_mod) * parseFloat(this.net_amt) / 100);
      //  tax_amt = (parseFloat(this.tax_per_mod) * (parseFloat(this.net_amt)-parseFloat(this.finalDiscount)) / 100);
      //  tax_amt_tot += tax_amt;
         tax_amt_tot += netAmt;

      }


      // sub_total_amt = total_amt - $('#sub_discount_' + a).val();
      // $('#pd_netPrice_' + a).val(sub_total_amt);
      //  alert('total_amt'+total_amt);
      grs_amt += sub_total_amt;


      //  alert('Net_Amt'+tax_amt_tot+'---'+this.net_amt);
      //   alert(grs_amt);
    }

    this.grossTotalTax = tax_amt_tot;
    this.grossTotal = grs_amt;
   // console.log('this.tax_per_mod--'+this.tax_per_mod+'--this.net_amt--' + this.grossTotal+'---this.finalDiscount---'+this.finalDiscount);
   if(tax_amt_tot>0){
    tax_amt_tot = (parseFloat(this.tax_per_mod) * (parseFloat(this.grossTotalTax)-parseFloat(this.finalDiscount)) / 100);
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

    //console.log('tax_per'+this.tax_per_mod+'grossTotal'+this.grossTotal+'this.finalTax'+this.finalTax+'shipping_amt'+this.shipping_amt+'finalDiscount'+this.finalDiscount);
    this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(this.finalTax) + parseFloat(this.shipping_amt)+ parseFloat(this.bankingCharge)) - parseFloat(this.finalDiscount)).toFixed(2);
  }
  keyPress(event: any, i: any) {
    this.invocePriceKey = i;
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
      // const formArray = new FormArray([]);
      console.log($('#pd_Total_' + j).val())
      console.log($('#pd_netPrice_' + j).val())
      // formArray.push(this.fb.group({
      //   "pd_Total": $('#pd_Total_' + j).val(),
      //   "pd_netPrice":$('#pd_netPrice_' + j).val(),
      // })
      // );
      // this.addQuotationInvoice_section2.setControl('addresses', formArray);
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
    //var disType = $('sub_discount_type_'+this.quotationPriceKey).val();
    //console.log('quotationPriceKey'+this.quotationPriceKey);
    //console.log('disType'+disType);
    var final_tot = $('#pd_Total_' + this.invocePriceKey).val();
    console.log('final_ tot',final_tot);
    
    $('#sub_discount_type_' + this.invocePriceKey).val(disType);
    var price: any;
    if (disType == 'per') {
      // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePerFinal != '') {
        console.log('3333' + final_tot);
        price = (parseFloat(enablePerFinal) * parseFloat(final_tot) / 100).toFixed(2);

        console.log('1...price...',price);
        

        $('#sub_discount_' + this.invocePriceKey).val(price);
        $('#sub_discount_val_' + this.invocePriceKey).val(enablePerFinal);
        price = final_tot - price;
      } else {
        $('#sub_discount_' + this.invocePriceKey).val('');
        $('#sub_discount_val_' + this.invocePriceKey).val('');
       
        price = final_tot;
        console.log('final_tot....',final_tot);
        console.log('price....',price);
        

      }
      //   console.log(price);

    } else {
      price = final_tot - enablePriceFinal;
      console.log('price...',price);
      
      $('#sub_discount_' + this.invocePriceKey).val(enablePriceFinal);
      $('#sub_discount_val_' + this.invocePriceKey).val(enablePriceFinal);

      // console.log(price);
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
    if (this.grandTotal > 0) {
      this.grandTotal = this.grossTotal;
    }
    if (this.finalTax > 0) {
      this.grandTotal = this.grandTotal + this.finalTax;
    }
    if (this.finalDiscount > 0) {
      this.grandTotal = this.grandTotal - this.finalDiscount;
    }
    if (this.extraCharge > 0) {
      this.grandTotal = this.grandTotal + this.extraCharge;
    }
    $('#discountFormId').modal('hide');
    this.DiscountForm.reset();
    this.totalCalculate();

  }
  calculateDiscount(val: any) {
    this.invocePriceKey = val;
    this.row_cnt_mod = val;
    var row_cnt = val;
    var sub_dis_val = 0;
    // var sub_dis_amt_val =0;
    console.log('row_cnt' + row_cnt);
    $('#enablePerFinal').val('');
    $('#enablePriceFinal').val('');
    // $('input:radio[name=discountTYpe]').prop('checked', true).val('per');
    var disType = $('#sub_discount_type_' + row_cnt).val();

    if (disType == 'per') {
      $('#discountTYpe_per').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();

      $('#enablePerFinal').val(sub_dis_val);
      
      //   console.log('22'+disType);
    } else if (disType == 'amt') {
      $('#discountTYpe_amt').prop('checked', true);
      sub_dis_val = $('#sub_discount_' + row_cnt).val();
      $('#enablePriceFinal').val(sub_dis_val);
     
      //  console.log('33'+disType);
    } else {
      //  console.log('44'+disType);
      $('#discountTYpe_per').prop('checked', false);
      $('#discountTYpe_amt').prop('checked', false);
    }
  }

  saveGrossDiscount() {
    var enablePercentabeDiscont = $('#enableFinalPercent').val()
    var enablePriceDiscont = $('#enableFinalDiscount').val()
    var tax_amt = $('#tax_amt_id').val()
    var disType = $('input:radio[name=finaldiscountTYpe]:checked').val();
    var final_tot = this.grossTotal;
    var price: any;
    // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'disType'+disType+'--'+final_tot);
    $('#final_discount_type').val(disType);
    this.finalDiscountType = disType;

    console.log('disType' + disType+'final_tot'+final_tot);

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
      console.log('999' + price);
    }

    if (this.grandTotal > 0) {
      this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(tax_amt)) - parseFloat(price)).toFixed(2);
    }

    console.log('grandTotal' + this.grandTotal);
    this.finalDiscount = price
    $('#discountFormFinal').modal('hide');
    setTimeout(() => {
      this.totalCalculate();
    }, 1500)


  }

  discount_dynamic_cal(){
    var final_discount_type = $('#final_discount_type').val();
    var final_discount_val = $('#final_discount_val').val();
    var finalDiscount_amt = $('#finalDiscount_amt').val();

    if(final_discount_type=='per'){
      this.finalDiscount = (parseFloat(this.grossTotal)* parseFloat(final_discount_val) / 100).toFixed(2);
    }
    setTimeout(() => {
      this.totalCalculate();
    }, 1500);

  }

  calFinalDiscount() {
    $('#enableFinalPercent').val('');
    $('#enableFinalDiscount').val('');
    var final_dis_val = 0;
    var disType = $('#final_discount_type').val();
    console.log('111' + disType);
    if (disType == 'per') {
      $('#finaldiscountType_per').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();

      $('#enableFinalPercent').val(final_dis_val);
      console.log('22' + disType);
    } else if (disType == 'amt') {
      $('#finaldiscountType_amt').prop('checked', true);
      final_dis_val = $('#finalDiscount_amt').val();
      $('#enableFinalDiscount').val(final_dis_val);
      console.log('33' + disType);
    } else {
      console.log('44' + disType);
      $('#finaldiscountTYpe_per').prop('checked', false);
      $('#finaldiscountTYpe_amt').prop('checked', false);
    }


  }
  getTaxCals() {
    var tax_id = this.addPI_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.finalTax = $('#finalDiscount_amt').val();
    this.extraCharge = 0;
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

    // this.totalCalculate();
    setTimeout(() => {
      this.totalCalculate();
    }, 1000)
    this.saveGrossDiscount();
  }
  extraFees() {
    var fee = this.addPI_section3.value.section3_shipping_amt_txtbox;
    this.grandTotal = this.grandTotal + parseFloat(fee);
    this.extraCharge = parseFloat(fee);
    this.totalCalculate();
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
    this.router.navigate(['/ProformaInvoice']);

  }

  

  invoiceAddSignatureEdit(sign_val: any) {
    //alert('sign_state'+sign_state);
    let api_req: any = new Object();
    let api_invoiceAddSignatureEdit_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_add_signature_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceAddSignatureEdit_req.action = "invoice_add_signature_edit";
    //api_quotationAddSignatureEdit_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_invoiceAddSignatureEdit_req.user_id = this.addPI_section1.value.salesRep;
    // api_quotationAddSignatureEdit_req.billerId = this.billerID ;
    api_invoiceAddSignatureEdit_req.billerId = this.addPI_section1.value.companyName;
    api_invoiceAddSignatureEdit_req.billId = this.editbillerID;
    api_req.element_data = api_invoiceAddSignatureEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {

        this.invoiceAddSignature_state = response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        if (sign_val == 0) {
          console.log('response.signature_filename' + response.signature_filename);
          this.invoiceAddSignature_filename = response.signature_filename;
        }

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
  gotoPIList() {

    this.router.navigate(['/ProformaInvoice']);
  }

  clearInput1() {
    this.input2 = '';
    $("#enablePriceFinal").val('')
  }
  
  clearInput2() {
    this.input1 ='';
    $("#enablePerFinal").val('');
  }

  
}
