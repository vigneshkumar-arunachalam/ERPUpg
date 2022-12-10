import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-pi',
  templateUrl: './add-pi.component.html',
  styleUrls: ['./add-pi.component.css']
})
export class AddPIComponent implements OnInit {
  addPI_section1: FormGroup;
  addPI_section3: FormGroup;
  isReadOnly: boolean = false;
  //radio
  radio_Select: any;
  exportState_Radio:any;
  initial_Radio:any;
  //checkbox
  mile_check_value:any;
  dynamicCheckboxwithKey:any;
  SelectExtraLogoCheckboxwithKey:any;
   //checkbox group select-mile
   groupSelectCommonId_MileDiscount:any;
   checkbox_value_MileDiscount:any;
   edit_array_MileDiscount:any=[];
 
  //checkbox group select-logo
  groupSelectCommonId_ExtraLogo:any;
  checkbox_value_ExtraLogo:any;
  edit_array_ExtraLogo:any=[];


  constructor() { }

  ngOnInit(): void {
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
    this.initial_Radio=[
      { name: 'Proforma ', selected: false, id: 1 },
      { name: 'Quotation', selected: false, id: 2 },
      

  ];
    this.exportState_Radio=[
      { name: 'Local', selected: false, id: 1 },
      { name: 'Export', selected: false, id: 2 },
      { name: 'Zero Valid', selected: false, id: 3 },

  ];
    this.addPI_section1 = new FormGroup({
      'initial': new FormControl(),
      'companyName': new FormControl(),
      'invoiceNo': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      'Date': new FormControl(),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo': new FormControl(),
      'Attn_1': new FormControl(),
      'ShipTo_1': new FormControl(),
      'ShipTo_2': new FormControl(),
      'ShipTo_3': new FormControl(),
      'ShipTo_4': new FormControl(),
      'PoDate': new FormControl(),
      'salesRep': new FormControl(),
      'ShipBy': new FormControl(),
      'ShipDate': new FormControl(),
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
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'final_dis_type': new FormControl(null),
      'final_dis_val': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_shipping_amt_name_txtbox': new FormControl(null),
      'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_signature_dropdown': new FormControl(null),
      'section3_templateName': new FormControl(null),
      'section3_select_additional_signature': new FormControl(null),


    });

  }
  handleChange_initial(id:any,evt: any) {
    var radioSelectInitial = evt.target.value;
    var abc=id;
    console.log("radio button value", radioSelectInitial);
    console.log("radio button id value", abc);
  }
  handleChange(id:any,evt: any) {
    var radioSelectFooter = evt.target.value;
    var xyz=id;
    console.log("radio button value", radioSelectFooter);
    console.log("radio button id value", xyz);
  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    console.log(this.mile_check_value );
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

}
