import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-editquotationnew',
  templateUrl: './editquotationnew.component.html',
  styleUrls: ['./editquotationnew.component.css']
})
export class EditquotationnewComponent implements OnInit {
  public editQuotationInvoice_section1: FormGroup;
  public addQuotationInvoice_section2: FormGroup;
  public addQuotationInvoice_section3: FormGroup;
  public DiscountForm: FormGroup;

  public addresses: FormArray;
  editQuotationID: any;
  SalesRepList: any;
  salesRepDropDown_Textbox_Status:any;
  SalesResellerList: any;
  SelectTemplateList: any;
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  additionalSignatureList: any;
  quotation_template_id: any;
  terms_condition_id: any;
  billerID: any;
  FooterDetails: any;
  TaxDropdownList: any;
  billerIDUpdate: any;
  ExtraLogoList: any;
  searchResult: any;
  customerName_Data: any;
  billerList: any;
  testVariable: any;
  quotationPriceKey: any;
  grossTotal: any;
  itre = 0;
  finalDiscount = 0;
  grandTotal = 0;
  finalTax = 0;
  extraCharge = 0;
  selectedTax = true;
  test: boolean[] = [];
  isReadOnly:boolean=true;

  //auto-complete customer name
  autocomplete_CustomerID:any;
  autocomplete_CustomerName:any;
  //auto-complete product details
  searchResult_productName:any;
  product_name_AutoComplete:any;


    //enquiry from details pop up
    FormID_enquiryFromDetails: any;
    subject_enquiryFromDetails: any;
    validity_enquiryFromDetails: any;
    version_enquiryFromDetails: any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.addQuotationInvoice_section2 = this.fb.group({
      addresses: this.fb.array([this.EditAddress_FormControl()])
    });

  }
  keywordpd_productName_autocomplete = 'partNo';
  ngOnInit(): void {
    // this.editQuotation();
    this.TaxDropdown();
    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);

        this.editQuotationID = params['e_quotID'];
        this.FormID_enquiryFromDetails=params['e_formID'];
        this.subject_enquiryFromDetails=params['e_subject'];
        this.validity_enquiryFromDetails=params['e_validity'];
        this.version_enquiryFromDetails=params['e_version'];

        console.log("quotationId for edit", this.editQuotationID);
        console.log("formid",this.FormID_enquiryFromDetails); 
        console.log("subject", this.subject_enquiryFromDetails); 
        console.log("validity", this.validity_enquiryFromDetails); 
        console.log("version", this.version_enquiryFromDetails); 

        console.log(this.editQuotationID);
        console.log(this.FormID_enquiryFromDetails); 
        console.log(this.subject_enquiryFromDetails); 
        console.log(this.validity_enquiryFromDetails); 
        console.log(this.version_enquiryFromDetails); 
        this.testVariable = this.editQuotationID;
        this.editQuotation();
      }
      );
    this.editQuotationInvoice_section1 = new FormGroup({
      'e_companyName': new FormControl(null),
      'e_quotationNumber': new FormControl(null),
      'e_selectFooter':  new FormControl(null, [Validators.required]),
      'e_quotationDate': new FormControl(null),
      'e_customerName': new FormControl(null),

      'e_cust_address1': new FormControl(null),
      'e_cust_address2': new FormControl(null),
      'e_zipcode': new FormControl(null),
      'e_attention': new FormControl(null),
      'e_salesRep': new FormControl(null),
      'e_selectTemplate': new FormControl(null),
      'e_selectReseller': new FormControl(null),
      'e_selectCurrency': new FormControl(null),
      'e_extraLogo': new FormControl(null),
      'e_selectPDFTemplate': new FormControl(null),
      'e_selectTermsConditions': new FormControl(null),
      'e_termsCondition_DontShow': new FormControl(null),
      'e_DescriptionText': new FormControl(null),
      'e_descriptionDetails_DontShow': new FormControl(null),
      'e_termConditionContentChange': new FormControl(null),
      'e_templateContent_Dropdown': new FormControl(null),

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
  onDrop(event: CdkDragDrop<string[]>){
    console.log("event drag drop",event)
    moveItemInArray( this.addressControls.controls, event.previousIndex, event.currentIndex);

  }

  selectEventProduct(item: any) {
    
    console.log("product item selected",item)
    this.product_name_AutoComplete=item.partNo;
    console.log("product item.partNo selected",item.partNo)
    if(this.product_name_AutoComplete!=''){
      this.productNameAutoFill()
    }
  }
  onFocusedProduct(e: any) {
    // do something when input is focused
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

  editAddress(): void {

    this.addresses = this.addQuotationInvoice_section2.get('addresses') as FormArray;
    this.addresses.push(this.EditAddress_FormControl());
    
    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      
    });
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  EditAddress_FormControl(): FormGroup {
    return this.fb.group({

      pd_productName_txtbox1: '',
      pd_productName_autocomplete:'',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_quotationChildId:'',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_split: '',
      pd_GPTotal: '',
      pd_selectTax: '',


    });

  }



  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;

    console.log("radio button value", radioSelectFooter);
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
    api_SearchCUST_req.user_id = localStorage.getItem('user_id');
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
        this.autocomplete_CustomerID=response.customer_list[0].customerId;
        this.autocomplete_CustomerName=response.customer_list[0].customerName;
        this.editQuotationInvoice_section1.patchValue({


          'e_cust_address1': response.customer_list[0].customerAddress1,
          'e_cust_address2': response.customer_list[0].customerAddress2,
          'e_cust_address3': response.customer_list[0].customerAddress3,
          'e_customerName': response.customer_list[0].customerName,
          'e_attention':response.customer_list[0].kind_Attention,
        });


      }
      else {
        this.editQuotationInvoice_section1.patchValue({


          'e_cust_address1': '',
          'e_cust_address2': '',
          'e_cust_address3': '',
          'e_customerName': '',
          'e_attention': '',
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
    api_Search_req.user_id = localStorage.getItem('user_id');
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
  searchProductName(data: any) {

    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/product_name_auto";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "product_name_auto";
    api_SearchProd_req.user_id = localStorage.getItem('user_id');
  
    api_SearchProd_req.part_no = data;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult_productName = response.products_list;
      console.log("response.partNo",response.products_list)
      // console.log("response.partNo",response.partNo)

      if (response.status !='') {

      }

    });

  }
  productNameAutoFill(){
   
   
    let api_req: any = new Object();
    let api_ProdAutoFill_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/product_name_auto_fill";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_ProdAutoFill_req.action = "product_name_auto_fill";
    api_ProdAutoFill_req.user_id = localStorage.getItem('user_id');
    api_ProdAutoFill_req.product_name = this.product_name_AutoComplete;
    api_req.element_data = api_ProdAutoFill_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response.length",response.length)
      console.log("partNo by auto fill",response[0].partNo);
        console.log("productName by auto fill",response[0].productName);
        console.log("productDesc by auto fill",response[0].productDesc);
        console.log("rate by auto fill",response[0].rate);
     
      for (let index = 0; index < response.length; index++) {
       
        if (response.status != '') {
          this.addQuotationInvoice_section2.patchValue({
            'pd_productName_autocomplete': response[index].partNo,
            'pd_productName_txtbox1':response[index].productName,
            'pd_productName_txtArea':response[index].productDesc,
          });


        }
        else {
          this.addQuotationInvoice_section2.patchValue({
            'pd_productName_autocomplete': '',
            'pd_productName_txtbox1': '',
            'pd_productName_txtArea': '',
           

          });
        }
      }
	  
    });
  }

  searchCustomerDataMouse(data: any) {
    console.log("search data afer mouse click", data)
  }

  editQuotation() {
    // window.location.reload();
    console.log("quotation id check for edit", this.editQuotationID)
    let api_req: any = new Object();
    let edit_Quotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/edit_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_Quotation_req.action = "edit_quotation";
    edit_Quotation_req.user_id = localStorage.getItem('user_id');
    edit_Quotation_req.quotation_id = this.editQuotationID;
    api_req.element_data = edit_Quotation_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("edit quotation response", response);
      if (response != '') {
        // this.dynamicChange_edit(response.quotation_details[0].billerId);
        console.log("test dynamic change", this.dynamicChange_edit(response.quotation_details[0].billerId))
        this.SalesRepList = response.sales_rep;
        this.SalesResellerList = response.sales_reseller;
        this.SelectTemplateList = response.quotation_template;
        this.CurrencyList = response.currency;
        this.TermsConditionList = response.quotation_terms;
        this.PDFTemplateList = response.default_quotation_temp;
        this.ExtraLogoList=response.extra_bills;
        this.billerList = response.bill_details;
        this.additionalSignatureList = response.additional_signature_list;
        this.editQuotationInvoice_section1.patchValue({

          'e_companyName': response.quotation_details[0].billerId,
          'e_quotationNumber': response.quotation_details[0].quotation_no,
          'e_selectFooter': response.quotation_details[0].pdf_footer_id,
          'e_quotationDate': response.quotation_details[0].quotation_date,
          'e_customerName': response.quotation_details[0].customerName,
          'e_cust_address1': response.quotation_details[0].customerAddress1,
          'e_cust_address2': response.quotation_details[0].customerAddress2,
          'e_cust_address3': response.quotation_details[0].customerAddress3,
          'e_attention': response.quotation_details[0].kind_Attention,
          'e_salesRep': response.quotation_details[0].billGeneratedBy,
          'e_selectTemplate': response.quotation_details[0].quotation_template_id,
          'e_selectReseller': response.quotation_details[0].reseller_id,
          'e_selectCurrency': response.quotation_details[0].currencyId,
          'e_extraLogo': response.quotation_details[0].bills_logo_id,
          'e_selectPDFTemplate': response.quotation_details[0].default_quotation_pdf_temp,

          'e_selectTermsConditions': response.quotation_details[0].terms_condition_id,
          'e_termsCondition_DontShow': response.quotation_details[0].terms_conditions_show_state,
          'e_DescriptionText': response.quotation_details[0].description_details,
          'e_descriptionDetails_DontShow': response.quotation_details[0].description_details_show_state,
          'e_termConditionContentChange': response.quotation_details[0].terms_conditions,
          'e_templateContent_Dropdown': response.quotation_details[0].main_content,


        });
        console.log("edit quotation section1", this.editQuotationInvoice_section1.value);

        const formArray = new FormArray([]);
        for (let index = 0; index < response.quotation_child_det.length; index++) {

          formArray.push(this.fb.group({


            "pd_productName_txtbox1": response.quotation_child_det[index].productName,
            "pd_productName_txtArea": response.quotation_child_det[index].productDesc,
            "pd_quantity_txtbox1": response.quotation_child_det[index].qty,
            "pd_quotationChildId":response.quotation_child_det[index].quotationChildId,
            "pd_unit": response.quotation_child_det[index].unit,
            "pd_sellingPrice": response.quotation_child_det[index].price,
            "pd_Total": response.quotation_child_det[index].total_bf_amt,
            "pd_netPrice": response.quotation_child_det[index].actual_net_tot,
            "pd_split": response.quotation_child_det[index].header_split==1?true:false,
            "pd_GPTotal": response.quotation_child_det[index].group_total_display_status==1?true:false,
            "pd_selectTax": response.quotation_child_det[index].tax_state==1?true:false,
           

          })
          );


        }
        this.addQuotationInvoice_section2.setControl('addresses', formArray);

        this.addQuotationInvoice_section3.patchValue({
          //section-3

          //row-1
          'section3_grant_total_show': response.quotation_details[0].total_display_status,
          'section3_gross_total': response.quotation_details[0].gross_total,
          //row-2
          'section3_discount_txtbox': response.quotation_details[0].discount_amt_tot,
          //row-3
          'section3_gst_dropdown': response.quotation_details[0].taxId,
          'section3_taxAmt_txtbox': response.quotation_details[0].taxAmt,
          //row-4
          'section3_shipping_amt_name_txtbox': response.quotation_details[0].shipping_amt_name,
          'section3_shipping_amt_txtbox': response.quotation_details[0].shipping_amt,
          //row-5
          'section3_grand_total': response.quotation_details[0].grand_total,
          //row-6
          'section3_remarks': response.quotation_details[0].remarks,

          //row-7
          'section3_signature_dropdown': response.quotation_details[0].additional_signature_id,
          //row-8
          'section3_templateName': response.quotation_details[0].template_name,



        });



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
  updateQuotationEnquiry() {
    let api_req: any = new Object();
    let api_UpdateEnquiry_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/update_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_UpdateEnquiry_req.action = "update_quotation";
    api_UpdateEnquiry_req.user_id = localStorage.getItem('user_id');

    api_UpdateEnquiry_req.enquiry_from_id = this.FormID_enquiryFromDetails;
    api_UpdateEnquiry_req.enquiry_subject = this.subject_enquiryFromDetails;
    api_UpdateEnquiry_req.quotation_valid_day = this.validity_enquiryFromDetails;
    api_UpdateEnquiry_req.duplicate_version = this.version_enquiryFromDetails;

    api_UpdateEnquiry_req.quotationId=this.editQuotationID
    api_UpdateEnquiry_req.billerId = this.editQuotationInvoice_section1.value.e_companyName;
    api_UpdateEnquiry_req.quotation_no = this.editQuotationInvoice_section1.value.e_quotationNumber;
    api_UpdateEnquiry_req.pdf_footer_id = this.editQuotationInvoice_section1.value.e_selectFooter;
    api_UpdateEnquiry_req.quotation_date = this.editQuotationInvoice_section1.value.e_quotationDate;
    api_UpdateEnquiry_req.customer_id = this.autocomplete_CustomerID; 
    api_UpdateEnquiry_req.customerName = this.editQuotationInvoice_section1.value.e_customerName;
   
    // api_UpdateEnquiry_req.customer_id = this.editQuotationInvoice_section1.value.customer_id;
    api_UpdateEnquiry_req.customerAddress1 = this.editQuotationInvoice_section1.value.e_cust_address1;
    api_UpdateEnquiry_req.customerAddress2 = this.editQuotationInvoice_section1.value.e_cust_address2;
    api_UpdateEnquiry_req.customerAddress3  = this.editQuotationInvoice_section1.value.e_cust_address3;
    api_UpdateEnquiry_req.kind_Attention = this.editQuotationInvoice_section1.value.e_attention;
    api_UpdateEnquiry_req.billGeneratedBy = this.editQuotationInvoice_section1.value.e_salesRep;
     api_UpdateEnquiry_req.reseller_id = this.editQuotationInvoice_section1.value.e_selectTemplate;
    api_UpdateEnquiry_req.quotation_template_id = this.editQuotationInvoice_section1.value.e_selectReseller;
    api_UpdateEnquiry_req.main_content = this.editQuotationInvoice_section1.value.e_templateContent_Dropdown;
    api_UpdateEnquiry_req.currencyId = this.editQuotationInvoice_section1.value.e_selectCurrency;
    api_UpdateEnquiry_req.bills_logo_id = this.editQuotationInvoice_section1.value.e_extraLogo;
    api_UpdateEnquiry_req.default_quotation_pdf_temp = this.editQuotationInvoice_section1.value.e_selectPDFTemplate;
    api_UpdateEnquiry_req.terms_condition_id = this.editQuotationInvoice_section1.value.e_selectTermsConditions;
    api_UpdateEnquiry_req.terms_conditions_show_state = this.checkbox_termsCondition_DontShow;
    api_UpdateEnquiry_req.terms_conditions = this.editQuotationInvoice_section1.value.e_termConditionContentChange;
    api_UpdateEnquiry_req.description_details = this.editQuotationInvoice_section1.value.e_DescriptionText;
    api_UpdateEnquiry_req.description_details_show_state = this.checkbox_descriptionDetails_DontShow;
    
    //section-2
    // api_UpdateEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;

    var addr = this.addQuotationInvoice_section2.value.addresses;
    for(let i=0; i < addr.length; i++){
        console.log(addr[i].pd_quantity_txtbox1)
        addr[i].pd_netPrice=$('#pd_netPrice_' + i).val();
        addr[i].pd_Total=$('#pd_Total_' + i).val();
    }
    api_UpdateEnquiry_req.values = addr;
   
    //section-3

    //row-1
    api_UpdateEnquiry_req.total_display_status = this.addQuotationInvoice_section3.value.section3_grant_total_show;
    api_UpdateEnquiry_req.gross_total = this.addQuotationInvoice_section3.value.section3_gross_total;
    //row-2
    api_UpdateEnquiry_req.discount_amt_tot = this.addQuotationInvoice_section3.value.section3_discount_txtbox;
    //row-3
    api_UpdateEnquiry_req.taxId = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    api_UpdateEnquiry_req.taxAmt = this.addQuotationInvoice_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_UpdateEnquiry_req.shipping_amt_name = this.addQuotationInvoice_section3.value.section3_shipping_amt_name_txtbox;
    api_UpdateEnquiry_req.shipping_amt = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    //row-5
    api_UpdateEnquiry_req.grand_total = this.addQuotationInvoice_section3.value.section3_grand_total;
    //row-6
    api_UpdateEnquiry_req.remarks = this.addQuotationInvoice_section3.value.section3_remarks;
    //row-7
    api_UpdateEnquiry_req.additional_signature_id = this.addQuotationInvoice_section3.value.section3_signature_dropdown;
    //row-8
    api_UpdateEnquiry_req.template_name = this.addQuotationInvoice_section3.value.section3_templateName;

    api_req.element_data = api_UpdateEnquiry_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("add quotation new save", response);
      if (response.status = true) {

        iziToast.success({
          title: 'Saved',
          message: 'Quotation Saved Successfully !',
        });
         this.redirecttoQuotation();
        this.editQuotationInvoice_section1.reset();
        this.addQuotationInvoice_section2.reset();
        this.addQuotationInvoice_section3.reset();

      }
      else {
       
        iziToast.error({
          title: 'Not Saved',
          message: 'Quotation not Saved !',
        });
        // this.redirecttoQuotation();
        
      }


    });


    

  }
 redirecttoQuotation(){
    
    this.router.navigate(['/quotationnew']);
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
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('user_id');
    api_quotationTemplateDropdown_req.quotation_template_id = this.quotation_template_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.editQuotationInvoice_section1.patchValue({

          // 'resellerMainContent_Dropdown': response.terms_condition_details,
          'e_templateContent_Dropdown': response.main_content,
          'e_DescriptionText': response.description_details,
        });

      }
      else {
        this.editQuotationInvoice_section1.patchValue({

          'e_templateContent_Dropdown': '',
          'e_DescriptionText': '',
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
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('user_id');
    api_quotationTemplateDropdown_req.terms_condition_id = this.terms_condition_id;
    api_req.element_data = api_quotationTemplateDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': response.terms_condition_details,


        });

      }
      else {
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': '',


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
    api_dynamicDropdown_req.user_id = localStorage.getItem('user_id');
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data = api_dynamicDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails = response.footer_details;
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': response.quotation_no,
            'e_selectFooter': response.footer_details[index].pdf_footer_id,
            'e_selectCurrency': response.currency_id,
            'e_termConditionContentChange': response.quotation_terms_cond,
            // 'e_DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': '',
            'e_selectFooter': '',
            'e_selectCurrency': '',
            'e_termConditionContentChange': '',
            // 'e_DescriptionText': '',

          });
        }
      }


    });
  }


  dynamicChange_edit(val: any) {
    this.billerID = val;
    console.log("billerID check", this.billerID);
    this.TaxDropdown();
    let api_req: any = new Object();
    let api_dynamicDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_customercbo_quat_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dynamicDropdown_req.action = "get_customercbo_quat_no";
    api_dynamicDropdown_req.user_id = localStorage.getItem('user_id');
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data = api_dynamicDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails = response.footer_details;
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': response.quotation_no,
            'e_selectFooter': response.footer_details[index].pdf_footer_id,
            'e_selectCurrency': response.currency_id,
            'e_termConditionContentChange': response.quotation_terms_cond,
            // 'e_DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': '',
            'e_selectFooter': '',
            'e_selectCurrency': '',
            'e_termConditionContentChange': '',
            // 'e_DescriptionText': '',

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
    api_TaxDropdown_req.user_id = localStorage.getItem('user_id');
    api_TaxDropdown_req.billerId = this.billerID;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Tax Dropdown response", response)

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;

      }



    });
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
  goBack(){
    this.router.navigate(['/quotationnew']);
  }

}
