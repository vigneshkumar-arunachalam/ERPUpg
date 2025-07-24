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
  selector: 'app-add-do',
  templateUrl: './add-do.component.html',
  styleUrls: ['./add-do.component.css']
})
export class AddDoComponent implements OnInit {

  public addDo_section1: FormGroup;
  public addDo_section2: FormGroup;
  public addDo_section3: FormGroup;
  // company name list

  companyNameList: any;
  billerChangeID: any;
  editQuotationID: any;
  //get add quotation
  billerList: any;
  // select footer 

  FooterDetails: any;
  radioSelectFooterChecked: boolean = false;
  billerID: any;
  currencyOld_RadioValue: any;
  dynamicTermsConditions_Currency: any;
  billerIDUpdate: any;

  currencyNew_RadioValue: any;

  // select extra logo

  bills_logo_id_radio: any;
  billsLogo_value: any;
  radioID_Logo: any;
  radio_Value_Export_logo: any;
  selected_pdf_footer: any;
  isReadonly: boolean = true;
  //shipping address
  shipAddress1: any;
  shipAddress2: any;
  shipAddress3: any;

  // warranty
  radioSelectWarranty: any;
  warranty_id_radio: any = [];
  warranty_value: any;
  warranty_Logo: any;
  radio_Value_warranty: any;

  description_details_show_state: boolean = false;


  // auto complete search
  searchResult_CustomerName: any;
  searchResult: any;
  customer_ID: any;
  customer_NAME: any;
  customerName_Data: any;

  // product details

  public addresses: FormArray;

  itre = 0;
  test: boolean[] = [];

  //add pop up query params value

  customerID_Add_DO: any;
  customerName_Add_DO: any;
  invoice_Add_DO: any;
  warranty_Add_DO: any;
  customerid_do: any;
  customername_do: any;
  invoiceNumber_do: any;
  warrantyID_do: any;
  InvoiceList_PopUp: any;
  invoiceValue_PopUp1: any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.addDo_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });

  }

  ngOnInit(): void {
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
    // this.loadADD();
    // this.ADDLoadDO();
    this.radioSelectWarranty == 'no';
    $('#description_details').val("No Warranty");


    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.customerID_Add_DO = params['customerID_P'];
        this.customerName_Add_DO = params['customerName_P'];
        this.invoice_Add_DO = params['invoice_p'];
        this.warranty_Add_DO = params['warranty_p'];
        this.customerid_do = params['customerID_P'];
        this.customername_do = params['customerName_P'];
        this.invoiceNumber_do = params['invoice_p'];
        this.warrantyID_do = params['warranty_p'];

        console.log("this.customerID_Add_DO-1", this.customerID_Add_DO);
        console.log(" this.customerName_Add_DO-1", this.customerName_Add_DO);
        console.log(" this.invoice_Add_DO-1", this.invoice_Add_DO);
        console.log(" this.warranty_Add_DO-1", this.warranty_Add_DO);


      }
      );
    this.Get_add_delivery_order();
    this.bills_logo_id_radio = [
      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: 'DID Sg', selected: false, id: 3 },
      { name: 'Callcloud', selected: false, id: 4 },
      { name: 'Mrvoip', selected: false, id: 5 },
        { name: 'None', selected: false, id: 6 }
    ];

    this.warranty_id_radio = [
      { name: 'No Warranty', selected: true, id: 1 },
      { name: 'One Year Warranty ', selected: false, id: 2 },
      { name: 'Two Year Warranty', selected: false, id: 3 },
      { name: 'None', selected: false, id: 4 },

    ];


    this.addDo_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'e_selectFooter': new FormControl(null),
      'dcNo': new FormControl(null),

      'dcDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'customer_name': new FormControl(null),
      'invoice_number': new FormControl(null),
      'customerAddress1': new FormControl(null),
      'customerAddress2': new FormControl(null),
      'customerAddress3': new FormControl(null),
      'kind_Attention': new FormControl(null),
      'bills_logo_id': new FormControl(null),
      'warranty_id': new FormControl(null),
      'description_details_show_state': new FormControl(null),
      'description_details': new FormControl(null),
    });
    this.addDo_section3 = new FormGroup({
      'remarks': new FormControl(null),

    });

  }

  handleChange_EXTRALogo(data: any, evt: any) {

    this.radioID_Logo = data;
    // console.log("evt", evt.target.checked)
    // console.log("evt-value", evt.target.value)
    // console.log("evt-id", evt.target.id)
    this.radio_Value_Export_logo = evt.target.value;
    // var xyz = id;
    // console.log("radio button value", this.radio_Value_Export_logo);
    // console.log("radio button id value", xyz);
  }
  descrWarrenty() {
    var Nowarranty = "No Warranty";
    var Onewarranty = "Above items are One year warranty from the date of delivery";
    var Twowarranty = "Above items are Two year warranty from the date of delivery";
    var nonewarranty = '';
    if (this.warranty_value == 1) {

      $('#description_details').val(Nowarranty);

      // console.log($('#description_details').val());

    }
    if (this.warranty_value == 2) {

      $('#description_details').val(Onewarranty);
      // console.log($('#description_details').val());

    }
    if (this.warranty_value == 3) {

      $('#description_details').val(Twowarranty);
      // console.log($('#description_details').val());

    }
    if (this.warranty_value == 4) {

      $('#description_details').val(nonewarranty);
      // console.log($('#description_details').val());

    }

  }
  handleChange_warrantyImp(evt: any) {

    this.radioSelectWarranty = evt.target.value;
    //  console.log("radio button value", this.radioSelectWarranty);

    var Nowarranty = "No Warranty";
    var Onewarranty = "Above items are One year warranty from the date of delivery";
    var Twowarranty = "Above items are Two year warranty from the date of delivery";
    var nonewarranty = '';

    if (this.radioSelectWarranty == 'no') {

      $('#description_details').val(Nowarranty);

      // console.log($('#description_details').val());

    }
    if (this.radioSelectWarranty == 'one') {

      $('#description_details').val(Onewarranty);
      // console.log($('#description_details').val());

    }
    if (this.radioSelectWarranty == 'two') {

      $('#description_details').val(Twowarranty);
      // console.log($('#description_details').val());

    }
    if (this.radioSelectWarranty == 'none') {

      $('#description_details').val(nonewarranty);
      // console.log($('#description_details').val());

    }


  }




  get addressControls() {
    return this.addDo_section2.get('addresses') as FormArray
  }

  editAddress(): void {
    this.addresses = this.addDo_section2.get('addresses') as FormArray;
    this.addresses.push(this.editAddress_FormControl());

    this.itre = this.itre + 1;
    // console.log(this.addresses);
    // console.log(this.itre);
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      // console.log(this.test[index]);


    });
  }

  editAddress_FormControl(): FormGroup {
    return this.fb.group({
      prodName: '',
      quantity: '',
      desc: '',
      pd_deliveryChildId: ''

    });
  }


  removeParticular(i: number) {


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


        // console.log(i)
        // console.log(this.addresses)
        this.addresses.removeAt(i);
        var addr = this.addDo_section2.value.addresses;
        var list_cnt = addr.length;
      }
    });
  }

  loadADD() {

    $('#description_details').val('None');
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
      // console.log("response-load-pi", response)
    });

  }
  handle_invoice(event: any) {
    this.invoiceValue_PopUp1 = event.target.value;
    console.log("this.invoiceValue_PopUp", this.invoiceValue_PopUp1);
    this.changeInvCust();
  }
  changeInvCust() {
    let api_req: any = new Object();
    let addAPI: any = new Object();

    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/getBillDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "getBillDetails";
    addAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addAPI.billId = this.invoiceValue_PopUp1;
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if(response.billData){
          //  this.companyNameList = response.biller_details;
      const formArray = new FormArray([]);

      for (let index = 0; index < response.billData.length; index++) {

        // console.log('delivery_details++index' + index);


        formArray.push(this.fb.group({

          "pd_deliveryChildId": response.billData[index].billChildid,
          "prodName": response.billData[index].productName,
          "quantity": response.billData[index].quantity,
          "desc": response.billData[index].productDesc,

        })

        );
      }


      // console.log(formArray)
      this.addDo_section2.setControl('addresses', formArray);
      console.log('FormArray value:', formArray.value);

      }
    
    });

  }
  ADDLoadDO() {
    console.log("this.customerID_Add_DO", this.customerID_Add_DO);
    console.log(" this.customerName_Add_DO", this.customerName_Add_DO);
    console.log(" this.invoice_Add_DO", this.invoice_Add_DO);
    console.log(" this.warranty_Add_DO", this.warranty_Add_DO);

    let api_req: any = new Object();
    let addLoadAPI: any = new Object();

    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/add_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addLoadAPI.action = "add_delivery_order";
    addLoadAPI.user_id = localStorage.getItem('erp_c4c_user_id');


    addLoadAPI.customerId = this.customerid_do;
    addLoadAPI.billId = this.invoiceNumber_do;
    addLoadAPI.warranty = this.warrantyID_do;
    api_req.element_data = addLoadAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.companyNameList = response.biller_details;
      this.FooterDetails = response.footer_list_details;
      //  console.log("response-load-pi", response)
      this.addDo_section1.patchValue({
        'dcNo': response.delivery_no,
        'companyName': response.defaults_biller_id,
        'customer_name': response.customerData.customerName,
        'customerAddress1': response.customerData.customerAddress1,
        'customerAddress2': response.customerData.customerAddress2,
        'customerAddress3': response.customerData.city,
          
        'kind_Attention': response.customerData.kind_Attention,


      });
    });

  }
  billerChangeDetails(event: any) {
    this.billerChangeID = event.target.value;

    let api_req: any = new Object();
    let addBillerChangeAPI: any = new Object();

    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/biller_change_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addBillerChangeAPI.action = "biller_change_details";
    addBillerChangeAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addBillerChangeAPI.billerId = this.billerChangeID;
    api_req.element_data = addBillerChangeAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.companyNameList = response.biller_details;
      this.FooterDetails = response.footer_list_details;
      // console.log("response-load-pi", response)
      this.addDo_section1.patchValue({
        'dcNo': response.delivery_no,
      });
    });


  }
  handleChange_warranty(id: number, event: Event) {
    console.log('Selected warranty ID:', id);
    this.warranty_value = id;
    console.log("this.warranty_value", this.warranty_value);
    this.descrWarrenty();
  }
  Get_add_delivery_order() {
    console.log("this.customerID_Add_DO", this.customerID_Add_DO);
    console.log(" this.customerName_Add_DO", this.customerName_Add_DO);
    console.log(" this.invoice_Add_DO", this.invoice_Add_DO);
    console.log(" this.warranty_Add_DO", this.warranty_Add_DO);


    let api_req: any = new Object();
    let quot_getDeliOrder_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "deliveryorder/add_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_getDeliOrder_req.action = "add_delivery_order";

    quot_getDeliOrder_req.user_id = localStorage.getItem('erp_c4c_user_id');
    quot_getDeliOrder_req.customerId = this.customerid_do;
    quot_getDeliOrder_req.billId = this.invoiceNumber_do;
    quot_getDeliOrder_req.warranty = this.warrantyID_do;

    api_req.element_data = quot_getDeliOrder_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

        this.billerList = response.biller_details;
        this.companyNameList = response.biller_details;
        this.FooterDetails = response.footer_list_details;
        this.warranty_id_radio = response.warranty_id_radio;
        this.customerName_Data = response.customerData.customerName;
        this.customer_ID = response.customerData.customerId;
        this.customer_NAME= response.customerData.customerName;
        this.InvoiceList_PopUp = response.invoice_det;
        const selectedOption = this.warranty_id_radio.find((item: { selected: any; }) => item.selected);
        this.warranty_value = selectedOption ? selectedOption.id : null;
        const selected = this.warranty_id_radio.find((item: { selected: any; }) => item.selected);
        this.addDo_section1.get('warranty_id')?.setValue(selected?.id || null);
        console.log("warranty_value", this.warranty_value);
        console.log("hhh", this.addDo_section1.get('warranty_id')?.value);
        this.addDo_section1.patchValue({
          'dcNo': response.delivery_no,
          'companyName': response.defaults_biller_id,
          'customer_name': response.customerData.customerName,
          'customerAddress1': response.customerData.customerAddress1,
          'customerAddress2': response.customerData.customerAddress2,
          'customerAddress3': response.customerData.city,
          'kind_Attention': response.customerData.kind_Attention,
          'invoice_number': response.billId,
        });
        this.descrWarrenty();
        const formArray = new FormArray([]);

        for (let index = 0; index < response.billData.length; index++) {

          // console.log('delivery_details++index' + index);


          formArray.push(this.fb.group({

            "pd_deliveryChildId": response.billData[index].billChildid,
            "prodName": response.billData[index].productName,
            "quantity": response.billData[index].quantity,
            "desc": response.billData[index].productDesc,

          })

          );
        }


        // console.log(formArray)
        this.addDo_section2.setControl('addresses', formArray);
        console.log('FormArray value:', formArray.value);



      }
      else {
        $("#showPerissionFormId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      // console.log("final error", error);
    }


  }


  // SELECT FOOTER

  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked = evt.target.checked;
    // console.log("event only", evt)
    // console.log("evt.target", evt.target)
    // console.log("evt.target.checked", evt.target.checked)
    // console.log("evt.target.checked global variable", this.radioSelectFooterChecked)
    // console.log(" evt.target.value radioSelectFooter", evt.target.value)
    // console.log("radio button value", radioSelectFooter);
  }

  radioCurrencyChange(event: any) {

    this.currencyNew_RadioValue = event.target.value;
    // console.log("this.currencyNew_RadioValue", this.currencyNew_RadioValue)


  }
  // dynamicChange(event: any) {
  //   this.spinner.show();
  //   this.billerID = event.target.value;
  //   console.log("billerID check", this.billerID);
  //   // this.TaxDropdown();
  //   let api_req: any = new Object();
  //   let api_dynamicDropdown_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/get_customercbo_quat_no";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_dynamicDropdown_req.action = "get_customercbo_quat_no";
  //   api_dynamicDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   api_dynamicDropdown_req.billerId = this.billerID;
  //   api_req.element_data = api_dynamicDropdown_req;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     this.FooterDetails = response.footer_details;
  //     console.log("dynamic Dropdown change response", response)
  //     this.currencyOld_RadioValue = response.currency_id;
  //     this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
  //     console.log("dynamic term condition change response", response.quotation_terms_cond)
  //     for (let index = 0; index < response.footer_details.length; index++) {
  //       this.billerIDUpdate = response.footer_details[index].billerId;
  //       if (response.status == true) {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': response.quotation_no,
  //           'selectFooter': response.footer_details[index].pdf_footer_id,
  //           'selectCurrency': response.currency_id,
  //           'termConditionContentChange': response.quotation_terms_cond,
  //           // 'DescriptionText': response.quotation_desp_det,
  //         });

  //         this.currencyNew_RadioValue = response.currency_id;         
  //         //this.currencyQuotationTermChange();


  //       }
  //       else {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': '',
  //           'selectFooter': '',
  //           'selectCurrency': '',
  //           'termConditionContentChange': '',
  //           // 'DescriptionText': '',

  //         });
  //       }
  //     }


  //   });
  // }
  // dynamicChange1() {
  //   this.spinner.show();
  //   console.log("billerID check", this.billerID);

  //   let api_req: any = new Object();
  //   let api_dynamicDropdown_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/get_customercbo_quat_no";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_dynamicDropdown_req.action = "get_customercbo_quat_no";
  //   api_dynamicDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
  //   api_dynamicDropdown_req.billerId = this.billerID;
  //   api_req.element_data = api_dynamicDropdown_req;


  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     this.spinner.hide();
  //     this.FooterDetails = response.footer_details;
  //     this.currencyOld_RadioValue = response.currency_id;
  //     this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
  //     console.log("dynamic Dropdown change response", response)
  //     console.log("dynamic term condition change response", response.quotation_terms_cond)
  //     for (let index = 0; index < response.footer_details.length; index++) {
  //       this.billerIDUpdate = response.footer_details[index].billerId;
  //       if (response.status == true) {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': response.quotation_no,
  //           'selectFooter': response.footer_details[index].pdf_footer_id,
  //           'selectCurrency': response.currency_id,
  //           'termConditionContentChange': response.quotation_terms_cond,
  //           // 'DescriptionText': response.quotation_desp_det,
  //         });


  //       }
  //       else {
  //         this.addDo_section1.patchValue({
  //           'quotationNumber': '',
  //           'selectFooter': '',
  //           'selectCurrency': '',
  //           'termConditionContentChange': '',
  //           // 'DescriptionText': '',

  //         });
  //       }
  //     }


  //   });
  // }


  // CUSTOMER AUTO COMPLETE

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
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      // console.log("customer_address_details---response", response)
      if (response.status == true) {
        // console.log('address'+response.customer_details[0].customerAddress1);

        this.addDo_section1.patchValue({
          'customerAddress1': response.customer_details.customerAddress1,
          'customerAddress2': response.customer_details.customerAddress2,
          'customerAddress3': response.customer_details.customerAddress3,
          'kind_Attention': response.customer_details.kind_Attention,
          'ship_to': response.customer_details.ship_to,
          'ship_address_1': response.customer_details.ship_customerAddress1,
          'ship_address_2': response.customer_details.ship_customerAddress2,
          'ship_address_3': response.customer_details.ship_customerAddress3,
          'ship_attn': response.customer_details.ship_attn,
          'terms': response.customer_details.terms_condition,
        });
      }
      else {
        this.addDo_section1.patchValue({
          'customerAddress1': '',
          'customerAddress2': '',
          'customerAddress3': '',
          'kind_Attention': '',
          'ship_to': '',
          'ship_address_1': '',
          'ship_address_2': '',
          'ship_address_3': '',
          'ship_attn': '',
          'terms': '',
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
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.billerId = this.addDo_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {


      }

    });

  }
  keywordCustomerName = 'customerName';
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }




  descriptionPermission(event: any) {

    this.description_details_show_state = event.target.checked;
    // console.log(this.description_details_show_state);


    if (this.description_details_show_state = event.target.checked) {
      this.addDo_section1.get('description_details')?.disable();
    }
    else {
      this.addDo_section1.get('description_details')?.enable();
    }

  }



  AddDO($event: MouseEvent) {
    this.spinner.show();

    let api_req: any = new Object();
    let api_saveDO_req: any = new Object();
    api_req.moduleType = "deliveryorder";
    api_req.api_url = "deliveryorder/insert_delivery_order";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveDO_req.action = "insert_delivery_order";
    api_saveDO_req.user_id = localStorage.getItem('erp_c4c_user_id');


    //section-1

    if (this.addDo_section1.value.companyName === null || this.addDo_section1.value.companyName === undefined) {

      iziToast.warning({
        message: "Select Company Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;


    } else {
      api_saveDO_req.company = this.addDo_section1.value.companyName;
    }

    api_saveDO_req.do_no = this.addDo_section1.value.dcNo;
    if (this.addDo_section1.value.e_selectFooter === null || this.addDo_section1.value.e_selectFooter === undefined) {

      iziToast.warning({
        message: "Select Footer",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_saveDO_req.pdf_footer_id = this.addDo_section1.value.e_selectFooter;
    }

    api_saveDO_req.dcDate = this.addDo_section1.value.dcDate;

    if (this.customerName_Data === null || this.customerName_Data === undefined) {

      iziToast.warning({
        message: "Select Customer Name / Bill",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_saveDO_req.customer_name = this.customerName_Data;
    }

    // api_saveDO_req.BillTo_customer_ID = this.customer_ID;
    api_saveDO_req.customer_name = this.customer_NAME;
 
    if (!this.customer_ID) {

      iziToast.error({
        message: "Select Customer",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_saveDO_req.customer_id = this.customer_ID;
    }
      if (!this.customer_NAME) {

      iziToast.error({
        message: "Select Customer",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_saveDO_req.customerName = this.customer_NAME;
    }
   // api_saveDO_req.BillTo_customer_NAME = this.customer_NAME;
    api_saveDO_req.customerAddress1 = this.addDo_section1.value.customerAddress1;
    api_saveDO_req.customerAddress2 = this.addDo_section1.value.customerAddress2;
    api_saveDO_req.customerAddress3 = this.addDo_section1.value.customerAddress3;
    api_saveDO_req.kind_Attention = this.addDo_section1.value.kind_Attention;
     api_saveDO_req.billId = this.addDo_section1.value.invoice_number;

    api_saveDO_req.bills_logo_id = this.radio_Value_Export_logo;

    if (this.warranty_value === null || this.warranty_value === undefined || this.warranty_value === 'undefined') {

      iziToast.error({
        message: "Select Warranty",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_saveDO_req.warranty_type = this.warranty_value;
    }




    // api_saveDO_req.description_details = this.addDo_section1.value.description_details;
    api_saveDO_req.description_details = $('#description_details').val();
    api_saveDO_req.description_details_show_state = this.description_details_show_state;



    //section-2
    //  api_saveDO_req.values = this.addPI_section2.value.addresses;


    var addr = this.addDo_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      if ($('#pd_productName_txtbox_' + i).val() == '') {
        iziToast.warning({
          message: "Select Minimum 1 Product Details",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      }


      addr[i].prodName = $('#prodName_' + i).val();
      addr[i].quantity = $('#quantity_' + i).val();
      addr[i].desc = $('#desc_' + i).val();


    }
    if (addr.length > 0) {
      api_saveDO_req.values = addr;
    } else {
      iziToast.warning({
        message: "Select Minimum 1 Product Details",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }





    //section-3 
    api_saveDO_req.remarks = this.addDo_section3.value.remarks;

    api_req.element_data = api_saveDO_req;
    ($event.target as HTMLButtonElement).disabled = true;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      ($event.target as HTMLButtonElement).disabled = false;
      if (response.status == true) {
        this.router.navigate(['/deliveryorder']);
        iziToast.success({
          message: "Delivery Order saved successfully",
          position: 'topRight'
        });
        this.gotoDOList();
        this.spinner.hide();
        // window.location.reload();
        this.router.navigate(['/deliveryorder']);

      }
      else if (response.status === 500) {

        iziToast.error({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.spinner.hide();
        this.gotoDOList();
      }
      else {

        iziToast.warning({
          message: "Invoice not added Successfully",
          position: 'topRight'
        });
        this.gotoDOList();
      }

    }),
      (error: any) => {
        ($event.target as HTMLButtonElement).disabled = false;

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        // console.log("500", error);
      }

    this.gotoDOList();
    // this.router.navigate(['/invoice']);


  }


  goBack() {
    this.router.navigate(['/deliveryorder']);
  }
  gotoDOList() {
    this.router.navigate(['/deliveryorder']);
  }
}
