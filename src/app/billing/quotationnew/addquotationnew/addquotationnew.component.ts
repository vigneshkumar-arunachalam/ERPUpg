import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,FormArray } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
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
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  ExtraLogoList: any;
  billerList: any;
  quotation_template_id: any;
  terms_condition_id:any;
  billerID:any;
  FooterDetails:any;
  searchResult:any;
  billerIDUpdate:any;
  customerName_Data:any;
  additionalSignatureList:any;
  TaxDropdownList:any;

  constructor(private serverService: ServerService,private fb: FormBuilder) { 
    this.addQuotationInvoice_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.valueFromComponent();
    this.TaxDropdown();
    this.addQuotationInvoice_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'quotationNumber': new FormControl(null),
      'selectFooter': new FormControl(null),
      'quotationDate': new FormControl(null),
      'customerName': new FormControl(null),
      
      'cust_address1':new FormControl(null),
      'cust_address2':new FormControl(null),
      'cust_city':new FormControl(null),
      'cust_state':new FormControl(null),
      'cust_zipcode':new FormControl(null),
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
    this.addQuotationInvoice_section3 = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_txtboxRow3': new FormControl(null),
      'section3_txtbox1Row4': new FormControl(null),
      'section3_txtbox2Row4': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_signature_dropdown': new FormControl(null),
      'section3_templateName': new FormControl(null),
    

    });
    this.DiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
     
    

    });
  }

  changeProductName_partNO(e:any) {
    console.log(e.target.value);
  }
  checkbox_productDetails_Split: any;
  productDetails_Split_eventCheck(e:any){
    this.checkbox_productDetails_Split=e.target.checked
    console.log(this.checkbox_productDetails_Split);
  }
  checkbox_productDetails_GPTotal: any;
  productDetails_GPTotal_eventCheck(e:any){
    this.checkbox_productDetails_GPTotal=e.target.checked
    console.log(this.checkbox_productDetails_GPTotal);
  }
  checkbox_productDetails_selectTax: any;
  productDetails_selectTax_eventCheck(e:any){
    this.checkbox_productDetails_selectTax=e.target.checked
    console.log(this.checkbox_productDetails_selectTax);
  }

  checkbox_GrantTotalShow: any;
  eventCheckGrantTotalShows(e:any){
    this.checkbox_GrantTotalShow=e.target.checked
    console.log(this.checkbox_GrantTotalShow);
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
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({
     
      pd_productName_txtbox1: '',
      pd_productName_txtArea:'',
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
  calculateDiscount(){

  }
  saveDiscount(){

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
        this.additionalSignatureList=response.additional_signature_list;

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
   
    console.log("radio button value",radioSelectFooter);
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
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange':response.terms_condition_details,
         
         
        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange':'',
       
          
        });
      }


    });
  }
  dynamicChange(event: any){
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
    api_req.element_data =api_dynamicDropdown_req;
   

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails=response.footer_details;
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
      this.billerIDUpdate=response.footer_details[index].billerId;
      if (response.status == true) {
        this.addQuotationInvoice_section1.patchValue({
          'quotationNumber':response.quotation_no,
          'selectFooter':response.footer_details[index].pdf_footer_id,
          'selectCurrency':response.currency_id,
          'termConditionContentChange': response.quotation_terms_cond,
          'DescriptionText': response.quotation_desp_det,
        });
      

      }
      else {
        this.addQuotationInvoice_section1.patchValue({
          'quotationNumber':'',
          'selectFooter':'',
          'selectCurrency':'',
          'termConditionContentChange': '',
          'DescriptionText': '',

        });
      }
    }


    });
  }
  TaxDropdown(){
  
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
       this.TaxDropdownList=response.tax_list;

      }
      


    });
  }
  saveQuotationEnquiry(){

    let api_req: any = new Object();
    let api_saveEnquiry_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/insert_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveEnquiry_req.action = "insert_quotation";
    api_saveEnquiry_req.user_id = "2";
    
    api_saveEnquiry_req.quotation_no=this.addQuotationInvoice_section1.value.quotationNumber;
    api_saveEnquiry_req.quotation_date= this.addQuotationInvoice_section1.value.quotationDate;
    api_saveEnquiry_req.quotation_date_time= "2";
    api_saveEnquiry_req.quotation_biller_no= "2";
   
    api_saveEnquiry_req.customerName= this.addQuotationInvoice_section1.value.customerName;
    api_saveEnquiry_req.customerAddress1=this.addQuotationInvoice_section1.value.cust_address1;
    api_saveEnquiry_req.customerAddress2= this.addQuotationInvoice_section1.value.cust_address2;
    api_saveEnquiry_req.customerAddress3= this.addQuotationInvoice_section1.value.cust_address3;
    api_saveEnquiry_req.kind_Attention= this.addQuotationInvoice_section1.value.attention;
    api_saveEnquiry_req.quotation_template_id= "2";
    api_saveEnquiry_req.main_content= "2";
    api_saveEnquiry_req.terms_conditions= "2";
    api_saveEnquiry_req.terms_condition_id= "2";
    api_saveEnquiry_req.terms_conditions_show_state= "2";
    
    api_saveEnquiry_req.description_details= "2";
    api_saveEnquiry_req.description_details_show_state= "2";
    api_saveEnquiry_req.reseller_id= "2";
    api_saveEnquiry_req.remarks= "2";
    api_saveEnquiry_req.billGeneratedBy= "2";

    api_saveEnquiry_req.currencyId= "2";
    api_saveEnquiry_req.signatureId= "2";
    api_saveEnquiry_req.bills_logo_id= "2";
    api_saveEnquiry_req.pdf_footer_id= "2";
    api_saveEnquiry_req.gross_total= "2";
    api_saveEnquiry_req.par_dis_per= "2";
    api_saveEnquiry_req.par_dis_amt= "2";



    if (this.addQuotationInvoice_section2.value.addresses.length <= 1) {
      api_saveEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;

    } else {
      api_saveEnquiry_req.values = this.addresses.value;
    }
    
    api_req.element_data =api_saveEnquiry_req;

  }
  searchCustomer_selectDropdownData(data: any) {
 
    console.log("search data in dropdown",data)
    console.log("search data-customer Id",data.customerId)
    this.customerName_Data=data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = "2";
    api_SearchCUST_req.customerId= this.customerName_Data
    api_req.element_data =api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
     
      if (response.status = true) {

        this.addQuotationInvoice_section1.patchValue({
         
   
          'cust_address1':response.customer_list[0].customerAddress1,
          'cust_address2':response.customer_list[0].customerAddress2,
          'cust_city':response.customer_list[0].city,
          'cust_state':response.customer_list[0].state,
          'cust_zipcode':response.customer_list[0].zipCode,
          'attention':response.customer_list[0].companyName,
        });
      }
      else{
        this.addQuotationInvoice_section1.patchValue({
         
   
          'cust_address1':'',
          'cust_address2':'',
          'cust_city':'',
          'cust_state':'',
          'cust_zipcode':'',
          'attention':'',
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
    api_Search_req.billerId=this.billerIDUpdate;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;
      // for (let index = 0; index < response.footer_details.length; index++) {
      if (response.status = true) {

        // this.addQuotationInvoice_section1.patchValue({
         
   
        //   'cust_address1':response.customer_list[index].customerAddress1,
        //   'cust_address2':response.customer_list[index].customerAddress2,
        //   'cust_city':response.customer_list[index].city,
        //   'cust_state':response.customer_list[index].state,
        //   'cust_zipcode':response.customer_list[index].zipCode,
        //   'attention':response.customer_list[index].companyName,
          
        // });
      }
    // }
    });
    
  }
  searchCustomerDataMouse(data: any){
    console.log("search data afer mouse click",data)
  }
}
