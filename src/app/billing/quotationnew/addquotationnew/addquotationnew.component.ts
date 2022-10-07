import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-addquotationnew',
  templateUrl: './addquotationnew.component.html',
  styleUrls: ['./addquotationnew.component.css']
})
export class AddquotationnewComponent implements OnInit {
  public addQuotationInvoice_section1: FormGroup;
  public addQuotationInvoice_section2: FormGroup;
  public addQuotationInvoice_section3: FormGroup;
  public DiscountForm: FormGroup;
  public addresses: FormArray;
  SalesRepList: any;
  SalesResellerList: any;
  SelectTemplateList: any;
  LogoList:any;
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  ExtraLogoList: any;
  billerList: any;
  quotation_template_id: any;
  terms_condition_id: any;
  billerID: any;
  FooterDetails: any;
  searchResult: any;
  billerIDUpdate: any;
  customerName_Data: any;
  additionalSignatureList: any;
  TaxDropdownList: any;
  quotationPriceKey: any;
  grossTotal: any;
  itre = 0;
  finalDiscount = 0;
  grandTotal = 0;
  finalTax = 0;
  extraCharge = 0;
  selectedTax = true;
  test: boolean[] = [];
 
  //enquiry from details pop up
  FormID_enquiryFromDetails: any;
  subject_enquiryFromDetails: any;
  validity_enquiryFromDetails: any;
  version_enquiryFromDetails: any;

  constructor(private serverService: ServerService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute) {
    this.addQuotationInvoice_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value",params); 
        this.FormID_enquiryFromDetails=params['formID'];
        this.subject_enquiryFromDetails=params['subject'];
        this.validity_enquiryFromDetails=params['validity'];
        this.version_enquiryFromDetails=params['version'];
      
        console.log("formid",this.FormID_enquiryFromDetails); 
        console.log("subject", this.subject_enquiryFromDetails); 
        console.log("validity", this.validity_enquiryFromDetails); 
        console.log("version", this.version_enquiryFromDetails); 

        console.log(this.FormID_enquiryFromDetails); 
        console.log(this.subject_enquiryFromDetails); 
        console.log(this.validity_enquiryFromDetails); 
        console.log(this.version_enquiryFromDetails); 
      }
    );

    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.addQuotation();
    this.TaxDropdown();
    this.addQuotationInvoice_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'quotationNumber': new FormControl(null),
      'selectFooter': new FormControl(null),
      'quotationDate': new FormControl(null),
      'customerName': new FormControl(null),

      'cust_address1': new FormControl(null),
      'cust_address2': new FormControl(null),
      'cust_address3': new FormControl(null),
      'attention': new FormControl(null),
      'salesRep': new FormControl(null),
      'selectTemplate': new FormControl(null),
      'selectReseller': new FormControl(null),
      'selectCurrency': new FormControl(null),
      'extraLogo': new FormControl(null),
      'selectPDFTemplate': new FormControl(null),
      'selectTermsConditions': new FormControl(null),
      'termsCondition_DontShow': new FormControl(null),
      'DescriptionText': new FormControl(null),
      'descriptionDetails_DontShow': new FormControl(null),
      'termConditionContentChange': new FormControl(null),
      'templateContent_Dropdown': new FormControl(null),

    });
    this.addQuotationInvoice_section3 = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
     'section3_shipping_amt_name_txtbox': new FormControl(null),
     'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_signature_dropdown': new FormControl(null),
      'section3_templateName': new FormControl(null),


    });
    this.DiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),



    });

    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      
    });


  }

  changeProductName_partNO(e: any) {
    console.log(e.target.value);
  }
  checkbox_productDetails_Split: any;
  productDetails_Split_eventCheck(e: any) {
    this.checkbox_productDetails_Split = e.target.checked
    console.log(this.checkbox_productDetails_Split);
  }
  checkbox_productDetails_GPTotal: any;
  productDetails_GPTotal_eventCheck(e: any) {
    this.checkbox_productDetails_GPTotal = e.target.checked
    console.log(this.checkbox_productDetails_GPTotal);
  }
  checkbox_productDetails_selectTax: any;


  checkbox_GrantTotalShow: any;
  eventCheckGrantTotalShows(e: any) {
    this.checkbox_GrantTotalShow = e.target.checked
    console.log(this.checkbox_GrantTotalShow);
  }
  checkbox_termsCondition_DontShow: any;
  termsCondition_DontShow_eventCheck(e: any) {
    this.checkbox_termsCondition_DontShow = e.target.checked;
    console.log(this.checkbox_termsCondition_DontShow);
  }

  checkbox_descriptionDetails_DontShow: any;
  descriptionDetails_DontShow_eventCheck(e: any) {
    this.checkbox_descriptionDetails_DontShow = e.target.checked
    console.log(this.checkbox_descriptionDetails_DontShow);
  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {
    console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }

  get addressControls() {
    return this.addQuotationInvoice_section2.get('addresses') as FormArray
  }

  addAddress(): void {
    this.addresses = this.addQuotationInvoice_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      
    });
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({

      pd_productName_txtbox1: '',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_split: '',
      pd_GPTotal: '',
      pd_selectTax: '',

    });

  }

  addQuotation() {

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
        this.additionalSignatureList = response.additional_signature_list;
        this.LogoList=response.extra_bills;

        console.log("add new quotation response-customer name", this.PDFTemplateList);
        // $('#addNewQuotationFormId').modal('hide');
        // iziToast.success({
        //   message: "Quotation Added successfully",
        //   position: 'topRight'
        // });
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
    var radioSelectFooter = evt.target.value;

    console.log("radio button value", radioSelectFooter);
  }

  chk_grantTotal: any;
  chkGrandTotalEvent(event: any) {
    this.chk_grantTotal = event.target.checked;
    console.log(this.chk_grantTotal)
  }

  templateContentDropdown(event: any) {
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
        this.addQuotationInvoice_section1.patchValue({

          // 'resellerMainContent_Dropdown': response.terms_condition_details,
          'templateContent_Dropdown': response.main_content,
          'DescriptionText': response.description_details,
        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'templateContent_Dropdown': '',
          'DescriptionText': '',
        });
      }


    });
  }
  TermsConditionsContentDropdown(event: any) {
    this.terms_condition_id = event.target.value;
    console.log("template terms_condition ID check", this.terms_condition_id);
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
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': response.terms_condition_details,


        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': '',


        });
      }


    });
  }
  dynamicChange(event: any) {
    this.billerID = event.target.value;
    console.log("billerID check", this.billerID);
    this.TaxDropdown();
    let api_req: any = new Object();
    let api_dynamicDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_customercbo_quat_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dynamicDropdown_req.action = "get_customercbo_quat_no";
    api_dynamicDropdown_req.user_id = "2";
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data = api_dynamicDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails = response.footer_details;
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': response.quotation_no,
            'selectFooter': response.footer_details[index].pdf_footer_id,
            'selectCurrency': response.currency_id,
            'termConditionContentChange': response.quotation_terms_cond,
            'DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': '',
            'selectFooter': '',
            'selectCurrency': '',
            'termConditionContentChange': '',
            'DescriptionText': '',

          });
        }
      }


    });
  }
  TaxDropdown() {

    let api_req: any = new Object();
    let api_TaxDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_tax_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_TaxDropdown_req.action = "quot_tax_dropdown";
    api_TaxDropdown_req.user_id = "2";
    api_TaxDropdown_req.billerId = this.billerID;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Tax Dropdown response", response)

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;

      }



    });
  }
  saveQuotationEnquiry() {
 console.log(this.addQuotationInvoice_section2.value)
    alert(this.addQuotationInvoice_section1.value.selectCurrency)
    console.log("this.addQuotationInvoice_section1.value.selectPDFTemplate", this.addQuotationInvoice_section1.value.selectPDFTemplate)
    let api_req: any = new Object();
    let api_saveEnquiry_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/insert_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveEnquiry_req.action = "insert_quotation";
    api_saveEnquiry_req.user_id = "2";


    api_saveEnquiry_req.enquiry_from_id = this.FormID_enquiryFromDetails;
    api_saveEnquiry_req.enquiry_subject = this.subject_enquiryFromDetails;
    api_saveEnquiry_req.quotation_valid_day = this.validity_enquiryFromDetails;
    api_saveEnquiry_req.duplicate_version = this.version_enquiryFromDetails;

    api_saveEnquiry_req.billerId = this.addQuotationInvoice_section1.value.companyName;
    api_saveEnquiry_req.quotation_no = this.addQuotationInvoice_section1.value.quotationNumber;
    api_saveEnquiry_req.pdf_footer_id = this.addQuotationInvoice_section1.value.selectFooter;
    api_saveEnquiry_req.quotation_date = this.addQuotationInvoice_section1.value.quotationDate;
    api_saveEnquiry_req.customer_id = this.addQuotationInvoice_section1.value.customerName;
    api_saveEnquiry_req.customerAddress1 = this.addQuotationInvoice_section1.value.cust_address1;
    api_saveEnquiry_req.customerAddress2 = this.addQuotationInvoice_section1.value.cust_address2;
    api_saveEnquiry_req.customerAddress3 = this.addQuotationInvoice_section1.value.cust_address3;
    // api_saveEnquiry_req.quotation_no=Address3;
    api_saveEnquiry_req.kind_Attention = this.addQuotationInvoice_section1.value.attention;
    api_saveEnquiry_req.billGeneratedBy = this.addQuotationInvoice_section1.value.salesRep;
    api_saveEnquiry_req.reseller_id = this.addQuotationInvoice_section1.value.selectReseller;
    api_saveEnquiry_req.quotation_template_id = this.addQuotationInvoice_section1.value.selectTemplate;
    api_saveEnquiry_req.main_content = this.addQuotationInvoice_section1.value.templateContent_Dropdown;
    api_saveEnquiry_req.currencyId = this.addQuotationInvoice_section1.value.selectCurrency;
    api_saveEnquiry_req.bills_logo_id = this.addQuotationInvoice_section1.value.extraLogo;

    api_saveEnquiry_req.default_quotation_pdf_temp = this.addQuotationInvoice_section1.value.selectPDFTemplate;
    api_saveEnquiry_req.terms_condition_id = this.addQuotationInvoice_section1.value.selectTermsConditions;
    api_saveEnquiry_req.terms_conditions_show_state = this.checkbox_termsCondition_DontShow;
    api_saveEnquiry_req.terms_conditions = this.addQuotationInvoice_section1.value.termConditionContentChange;
    api_saveEnquiry_req.description_details = this.addQuotationInvoice_section1.value.DescriptionText;
    api_saveEnquiry_req.description_details_show_state = this.checkbox_descriptionDetails_DontShow;
    
    //section-2
    api_saveEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;
   
    //section-3

    //row-1
    api_saveEnquiry_req.total_display_status = this.addQuotationInvoice_section3.value.section3_grant_total_show;
    api_saveEnquiry_req.gross_total = this.addQuotationInvoice_section3.value.section3_gross_total;
    //row-2
    api_saveEnquiry_req.discount_amt_tot = this.addQuotationInvoice_section3.value.section3_discount_txtbox;
    //row-3
    api_saveEnquiry_req.taxId = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    api_saveEnquiry_req.taxAmt = this.addQuotationInvoice_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_saveEnquiry_req.shipping_amt_name = this.addQuotationInvoice_section3.value.section3_shipping_amt_name_txtbox;
    api_saveEnquiry_req.shipping_amt = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    //row-5
    api_saveEnquiry_req.grand_total = this.addQuotationInvoice_section3.value.section3_grand_total;
    //row-6
    api_saveEnquiry_req.remarks = this.addQuotationInvoice_section3.value.section3_remarks;
    //row-7
    api_saveEnquiry_req.additional_signature_id = this.addQuotationInvoice_section3.value.section3_signature_dropdown;
    //row-8
    api_saveEnquiry_req.template_name = this.addQuotationInvoice_section3.value.section3_templateName;

    api_req.element_data = api_saveEnquiry_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("add quotation new save", response);
      if (response.status = true) {

        iziToast.success({
          title: 'Saved',
          message: 'Quotation Saved Successfully !',
        });
        this.redirecttoQuotation();
        this.addQuotationInvoice_section1.reset();
        this.addQuotationInvoice_section2.reset();
        this.addQuotationInvoice_section3.reset();
      }
      else {
       
        iziToast.error({
          title: 'Not Saved',
          message: 'Quotation not Saved !',
        });
        this.redirecttoQuotation();
        
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
    api_SearchCUST_req.user_id = "2";
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status = true) {

        this.addQuotationInvoice_section1.patchValue({


          'cust_address1': response.customer_list[0].customerAddress1,
          'cust_address2': response.customer_list[0].customerAddress2,
          'cust_city': response.customer_list[0].city,
          'cust_state': response.customer_list[0].state,
          'cust_zipcode': response.customer_list[0].zipCode,
          'attention': response.customer_list[0].companyName,
        });
      }
      else {
        this.addQuotationInvoice_section1.patchValue({


          'cust_address1': '',
          'cust_address2': '',
          'cust_city': '',
          'cust_state': '',
          'cust_zipcode': '',
          'attention': '',
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
    api_Search_req.user_id = "2";
    api_Search_req.billerId = this.billerIDUpdate;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {

      }

    });

  }
  searchCustomerDataMouse(data: any) {
    console.log("search data afer mouse click", data)
  }


  saveDiscount() {
    var enablePercentabeDiscont = $('#enablePercentabeDiscont').val()
    var enablePriceDiscont = $('#enablePriceDiscont').val()
    var disType = $('input:radio[name=discountTYpe]:checked').val();
    var final_tot = $('#pd_Total_' + this.quotationPriceKey).val();
    var price: any;
    if (disType == 'per') {
      price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
      price = final_tot - price
      console.log(price);
    } else {
      price = final_tot - enablePriceDiscont;
      console.log(price);
    }
    $('#pd_netPrice_' + this.quotationPriceKey).val(price)

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

  }
  clearAddress() {
    var t = this.addQuotationInvoice_section2.value;
    console.log(t)
  }

  keyPress(event: any, i: any) {
    this.quotationPriceKey = i;
    var key = event.target.value;
    var addr = this.addQuotationInvoice_section2.value.addresses;
    var v = addr[i].pd_quantity_txtbox1 * addr[i].pd_sellingPrice;
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
    for(let j = 0; j<=this.itre; j++){
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
      var tax = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
      tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);
      if (this.grandTotal > 0) {
        this.grandTotal = this.grandTotal + parseFloat(tax);
      }
      this.finalTax = parseFloat(tax);
    }
  }

  calculateDiscount(val: any) {
    this.quotationPriceKey = val;
  }
  saveGrossDiscount() {
    var enablePercentabeDiscont = $('#enablePerFinal').val()
    var enablePriceDiscont = $('#enablePriceFinal').val()
    var disType = $('input:radio[name=finaldiscountTYpe]:checked').val();
    var final_tot = this.grossTotal;
    var price: any;

    if (disType == 'per') {
      price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
    } else {
      price = enablePriceDiscont
      console.log(price);
    }
    if (this.grandTotal > 0) {
      this.grandTotal = this.grandTotal - price;
    }
    this.finalDiscount = price
  }
  getTaxCals() {
    var tax = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);

    this.finalTax = parseFloat(tax);
    if (this.grandTotal > 0) {
      this.grandTotal = this.grossTotal + this.finalTax + this.finalDiscount + this.extraCharge;
    }
    this.finalTax = parseFloat(tax);

  }
  extraFees() {
    var fee = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    this.grandTotal = this.grandTotal + parseFloat(fee);
    this.extraCharge = parseFloat(fee);
  }
  productDetails_selectTax_eventCheck(e: any, i: any) {
    this.checkbox_productDetails_selectTax = e.target.checked
    console.log(this.checkbox_productDetails_selectTax);
    var actualPrice = $('#pd_netPrice_' + i).val();
    if (this.addQuotationInvoice_section3.value.section3_gst_dropdown) {
      var tax = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
      tax = (parseFloat(tax) * parseFloat(actualPrice) / 100).toFixed(2);
      if (this.checkbox_productDetails_selectTax == true) {
        this.grandTotal = this.grandTotal + parseFloat(tax);
        this.finalTax = this.finalTax + parseFloat(tax)
      } else {
        this.grandTotal = this.grandTotal - tax;
        this.finalTax = this.finalTax - parseFloat(tax)
      }
    }
  }
  redirecttoQuotation(){
    
    this.router.navigate(['/quotationnew']);
  }
}
