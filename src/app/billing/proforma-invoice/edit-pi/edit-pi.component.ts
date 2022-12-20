import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
    companyNameList:any;
    currencyNameList:any;
    ShipByList:any;
    salesRepList:any;
    paymentviaList:any;
    billerID:any;
    //edit
    editbillerID:any;
    editResult:any;
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
  
    // tax_amt_tot=0;  
  
    test: boolean[] = [];
    itre = 0;
  
  
   
    
    constructor(private serverService: ServerService, private fb: FormBuilder,private router: Router, private route: ActivatedRoute) {
   
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
    handleChange_initial(id: any, evt: any) {
      var radioSelectInitial = evt.target.value;
      var abc = id;
      console.log("radio button value", radioSelectInitial);
      console.log("radio button id value", abc);
    }
    handleChange(id: any, evt: any) {
      var radioSelectFooter = evt.target.value;
      var xyz = id;
      console.log("radio button value", radioSelectFooter);
      console.log("radio button id value", xyz);
    }
    mile(e: any) {
      this.mile_check_value = e.target.value;
      console.log(this.mile_check_value);
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
      this.serverService.sendServer(api_req).subscribe((response:any)=> {
        this.companyNameList=response.biller_details;
        this.currencyNameList=response.currency_list;
        this.ShipByList=response.ship_by;
        this.salesRepList=response.sales_rep;
        this.paymentviaList=response.paymentvia;
        console.log("response-load-pi",response)
      });
    }
    save(){
      let api_req: any = new Object();
      let api_savePI_req: any = new Object();
      api_req.moduleType = "proforma";
      api_req.api_url = "proforma/add_profoma_invoice";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_savePI_req.action = "add_profoma_invoice";
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
    getCustomerInvoiceDetails(event: any){
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
            'Currency': response.currency_id,
          
           
          });
  
  
        }
        else {
         
        }
  
      });
  
    }
    editPI(){
      
        let api_req: any = new Object();
        let api_editPI_req: any = new Object();
        api_req.moduleType = "proforma";
        api_req.api_url = "proforma/edit_profoma_invoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_editPI_req.action = "edit_profoma_invoice";
        api_editPI_req.user_id = localStorage.getItem('user_id');
    
        api_editPI_req.quotation_id = this.editbillerID;
        api_req.element_data = api_editPI_req;
 
       
    
    
        this.serverService.sendServer(api_req).subscribe((response: any) => {
    
          if (response!='') {
            this.editResult=response.billing_pararent_details;
            this.addPI_section1.patchValue({
              'invoiceNo': response.billing_pararent_details.invoice_no,
              'ReferenceResellerName': response.billing_pararent_details.reference_reseller_name,
              'Ref': response.billing_pararent_details.ref,
              'Date': response.billing_pararent_details.billDate,
              'PoNo': response.billing_pararent_details.po_no,
              'PoDate': response.billing_pararent_details.po_date,
              'salesRep': response.billing_pararent_details.sales_rep,
              'ShipBy': response.billing_pararent_details.ship_by,
              'ShipDate': response.billing_pararent_details.ship_date,
              'terms': response.billing_pararent_details.terms,
              'Currency': response.billing_pararent_details.currency,
              'PaymentVia': response.billing_pararent_details.paymentVIA,
              'address_1': response.billing_pararent_details.b_address,
              'Attn_1': response.billing_pararent_details.b_attn,
              'CurrencyConversionRate': response.billing_pararent_details.conversionRate,
              'section3_receivedAuthorizedSignature': response.billing_pararent_details.received_signature,


              // '': response.billing_pararent_details.billId,
              // '': response.billing_pararent_details.billCode,
              // '': response.billing_pararent_details.custId,
              // '': response.billing_pararent_details.billerId,
              // '': response.billing_pararent_details.billGeneratedBy,
              // '': response.billing_pararent_details.actual_cost_billGeneratedBy,
              // '': response.billing_pararent_details.grossAmount,
              // '': response.billing_pararent_details.netPayment,
              // '': response.billing_pararent_details.remarks,
              // '': response.billing_pararent_details.grossAmountHd,
              // '': response.billing_pararent_details.discountPer,
              // '': response.billing_pararent_details.discountAmount,
          
              // '': response.billing_pararent_details.cus_invoice_no,
              // '': response.billing_pararent_details.ref_invoice_no,
              // '': response.billing_pararent_details.his_invoice_no,
   
              // '': response.billing_pararent_details.cart_state,
             
              // '': response.billing_pararent_details.s_name,
              // '': response.billing_pararent_details.s_address,
              // '': response.billing_pararent_details.s_attn,
            
              // '': response.billing_pararent_details.do_no,
            
              // '': response.billing_pararent_details.b_name,
         
              // '': response.billing_pararent_details.shippingName,
              // '': response.billing_pararent_details.shippingAmt,
              // '': response.billing_pararent_details.taxId,
              // '': response.billing_pararent_details.taxPer,
              // '': response.billing_pararent_details.taxAmt,
              // '': response.billing_pararent_details.taxId2,
              // '': response.billing_pararent_details.taxPer2,
              // '': response.billing_pararent_details.taxAmt2,
              // '': response.billing_pararent_details.sbc_amt,
              // '': response.billing_pararent_details.kkc_amt,
              // '': response.billing_pararent_details.coupon_id,
              // '': response.billing_pararent_details.add_name,
              // '': response.billing_pararent_details.add_amt,

              // '': response.billing_pararent_details.reseller_3cx_discount_per,
              // '': response.billing_pararent_details.terms_cond1,
              // '': response.billing_pararent_details.terms_cond2,
              // '': response.billing_pararent_details.terms_cond3,
              // '': response.billing_pararent_details.terms_cond4,
              // '': response.billing_pararent_details.terms_cond5,
          
              // '': response.billing_pararent_details.suspend,
              // '': response.billing_pararent_details.billStatus,
              // '': response.billing_pararent_details.signatureId,
              // '': response.billing_pararent_details.bills_logo_id,
              // '': response.billing_pararent_details.mailAlert,
              // '': response.billing_pararent_details.print_logo,
              // '': response.billing_pararent_details.jom_pay_logo,
             

            
             
            });
    
          }
          else {
           
          }
    
        });
    
      
    }
  
  }
