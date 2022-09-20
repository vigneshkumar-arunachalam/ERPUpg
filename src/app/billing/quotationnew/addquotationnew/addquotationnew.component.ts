import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-addquotationnew',
  templateUrl: './addquotationnew.component.html',
  styleUrls: ['./addquotationnew.component.css']
})
export class AddquotationnewComponent implements OnInit {
  addQuotationInvoice: FormGroup;
  SalesRepList: any;
  SalesResellerList: any;
  SelectTemplateList: any;
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  ExtraLogoList: any;
  billerList: any;
  quotation_template_id: any;
  terms_condition_id:any;
  billerID:any;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.valueFromComponent();
    this.addQuotationInvoice = new FormGroup({
      'companyName': new FormControl(null),
      'quotationNumber': new FormControl(null),
      'selectFooter': new FormControl(null),
      'quotationDate': new FormControl(null),
      'customerName': new FormControl(null),
      'address': new FormControl(null),
      'attention': new FormControl(null),
      'salesRep': new FormControl(null),
      'selectTemplate': new FormControl(null),
      'selectReseller': new FormControl(null),
      'selectCurrency': new FormControl(null),
      'extraLogo': new FormControl(null),
      'selectPDFTemplate': new FormControl(null),
      'selectTermsConditions': new FormControl(null),
      'DescriptionText': new FormControl(null),
      'termConditionContentChange': new FormControl(null),
      'templateContent_Dropdown': new FormControl(null),

    });
  }
  valueFromComponent() {

    let api_req: any = new Object();
    let add_newQuotationNextPage_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/add_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotationNextPage_req.action = "add_quotation";
    add_newQuotationNextPage_req.user_id = "2";
    api_req.element_data = add_newQuotationNextPage_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("add new quotation response", response);
      if (response != '') {


        //  this.enquiryFromList=response.enquiry_from;
        //  this.quotationValidityList= response.quot_validity;
        //  this.templateNameList=response.template_name_arr;
        this.SalesRepList = response.sales_rep;
        this.SalesResellerList = response.sales_reseller;
        this.SelectTemplateList = response.quotation_template;
        this.CurrencyList = response.currency;
        this.TermsConditionList = response.quotation_terms;
        this.PDFTemplateList = response.default_quotation_temp;
        this.billerList = response.biller_details;
        console.log("add new quotation response-customer name", this.PDFTemplateList);
        // $('#addNewQuotationFormId').modal('hide');
        iziToast.success({
          message: "Quotation Added successfully",
          position: 'topRight'
        });
        //this.contactsList({});


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
  handleChange(evt: any) {
    var xyz = evt.target.id;
    console.log(xyz, "target");
  }

  chk_grantTotal: any;
  chkGrandTotalEvent(event: any) {
    this.chk_grantTotal = event.target.checked;
    console.log(this.chk_grantTotal)
  }

  templateContentDropdown(event: any){
    this.quotation_template_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_template_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_template_maincontent";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_template_maincontent";
    api_quotationTemplateDropdown_req.user_id = "2";
    api_quotationTemplateDropdown_req.quotation_template_id = this.quotation_template_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.addQuotationInvoice.patchValue({

          // 'resellerMainContent_Dropdown': response.terms_condition_details,
          'templateContent_Dropdown': response.main_content,
          'DescriptionText': response.description_details,
        });

      }
      else {
        this.addQuotationInvoice.patchValue({

          'templateContent_Dropdown': '',
           'DescriptionText': '',
        });
      }


    });
  }
  TermsConditionsContentDropdown(event: any) {
    this.terms_condition_id = event.target.value;
    console.log("template terms_condition ID check",  this.terms_condition_id );
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_quotation_terms_condition";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_quotation_terms_condition";
    api_quotationTemplateDropdown_req.user_id = "2";
    api_quotationTemplateDropdown_req.terms_condition_id = this.terms_condition_id;
    api_req.element_data = api_quotationTemplateDropdown_req;
   

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.addQuotationInvoice.patchValue({

          'termConditionContentChange':response.terms_condition_details,
         
         
        });

      }
      else {
        this.addQuotationInvoice.patchValue({

          'termConditionContentChange':'',
       
          
        });
      }


    });
  }
  dynamicChange(event: any){
    this.billerID = event.target.value;
    console.log("billerID check", this.billerID);
    let api_req: any = new Object();
    let api_dynamicDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_customercbo_quat_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dynamicDropdown_req.action = "get_customercbo_quat_no";
    api_dynamicDropdown_req.user_id = "2";
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data =api_dynamicDropdown_req;
   

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("dynamic Dropdown change response", response)

      if (response.status == true) {
        this.addQuotationInvoice.patchValue({
          'quotationNumber':response.quotationCode,
          'selectCurrency':response.currency_name,
        });

      }
      else {
        this.addQuotationInvoice.patchValue({
          'quotationNumber':'',
          'selectCurrency':'',
        });
      }


    });
  }
}
