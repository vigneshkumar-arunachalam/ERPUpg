import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reseller-payment',
  templateUrl: './reseller-payment.component.html',
  styleUrls: ['./reseller-payment.component.css']
})
export class ResellerPaymentComponent implements OnInit {
  PI_list: any;
  user_ids: any;
  resellerCommission_list: any;
  resellerCommission_list1: any;
  reseller_name_list: any;
  doubleArray: any;
  //pagination
  recordNotFound = false;
  pageLimit = 40;
  paginationData: any = { "info": "hide" };
  offset_count = 0;

  addr: any = []
  // trial checkall
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  referallAmountDetails: any;
  payoutAmountDetails: any;
  payCurrencyName: any;
  resellerList: any;
  CurrencyTotalList: any;
  CurrencyTotalAll: any;
  YearTotalList: any;
  //Reseller Payment update
  resellerPaymentForm: FormGroup;
  //add reseller form
  resellerPayment_addForm: FormGroup;
  RPBiller_list: any;
  RP_currencyList: any;
  // search reseller form
  resellerPayment_searchForm: FormGroup;
  //Reseller Just Payment
  resellerProcessPaymentIIForm: FormGroup;
  edit_resellercomm_list: any;
  reseller_comm_id: any;
  reseller_id: any;
  cust_password: any;
  reseller_email: any;
  unpaid_amount: any;
  filterCommissionList: { id: number; value: string; }[];
  RP_SharePermissionForm: FormGroup;
  getResellerPermissionList: any;
  //Show Permission
  showPerissionForm: FormGroup;
  checkbox_ID_SingleParameter_invoiceShow_Value: any;
  Checkbox_value_invoiceShow: any;
  CheckBox_DynamicArrayList_invoiceShowPermission: any;
  typeConvertionString_invoiceShowPermission: any;
  invoiceShowPermission_EditOnLoad_Values: any;
  invoiceShowPermission_List: any;
  invoiceShowPermission_List1: any;
  invoiceShowResult: any;
  ShowPermission_BillID: any;
  //quick email 
  landscapeEmailForm: FormGroup;
  landscapeEmail_Customer_ID: any;
  emailFrom: any;
  emailTo: any;
  subjectValue: any;
  emailTemplate: any;
  msg_id: any;
  From_List: any;
  Template_List: any;
  CRMTemplateID: any;
  cus_type_edit: any;
  addUser: any;
  addUserId: any;
  addUserId_array: any = [];
  addCreditEditId: any;
  billId_ResellerCommissionId: any;
  resellerCommissionForm: any;
  commissionGrossAmount: any;
  CommissionType: any = [];
  //reseller commission details
  resellerCommissionList: any;
  resellercommissiontype: any;
  commissionType_value: any;
  commissionAmount_WFA: any;
  CBV_PdfShow: any;
  ResellerName_Customer: any;
  ResellerId_Customer: any;
  searchResult: any;
  public addresses: FormArray;
  data_value: any;
  commissionType_values: any;
  resellercommissiontype1: any = [];
  resellercommissiontype2: any;
  CommissionType1: any = [];
  custID: any;
  InvSearch_off_set: any;
  InvSearch_limit_val: any;
  items: any = [];

  selectAllCheckbox = false;
  selectAllCheckbox_paid = false;
  filterCommission_value: any;
  filterCommission_color: any = 35;
  unpaidCheckAll_status: any;
  paidCheckAll_status: any;
  RP_paymentNameList: any;
  resellerID_search: any;
  commission_amt: any;
  //multiple reseller form
  multipleResellerPaymentForm: FormGroup;
  paymentType_payment: any;
  //read only
  readValue: boolean = false;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService) {
    this.resellerCommissionForm = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }
  keywordResellerName = 'customerName';
  ngOnInit(): void {
    this.spinner.show();
    this.ResellerPaymentDefaultLoad();
    this.PaymentMethodDefaultLoad();
    this.getResellerNames();
    this.user_ids = localStorage.getItem('erp_c4c_user_id');

    this.PI_list = [{
      "apr": 2022, "may": 2022, "june": 2022, "july": 2022, "aug": 2022, "sep": 2022, "oct": 2022,
      "nov": 2022, "dec": 2022, "jan": 2022, "feb": 2022, "march": 2022
    }]
    // this.reseller_name_list=[{
    //   "customerName": 2022, "may": 2022, "june": 2022, "july": 2022, "aug": 2022, "sep": 2022, "oct": 2022,
    //   "nov": 2022, "dec": 2022, "jan": 2022, "feb": 2022, "march": 2022
    // }]
    this.resellerPaymentList({});

    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: 'Elenor Anderson', isSelected: false },
      { id: 2, value: 'Caden Kunze', isSelected: true },
      { id: 3, value: 'Ms. Hortense Zulauf', isSelected: true },
      { id: 4, value: 'Grady Reichert', isSelected: false },
      { id: 5, value: 'Dejon Olson', isSelected: false },
      { id: 6, value: 'Jamir Pfannerstill', isSelected: false },
      { id: 7, value: 'Aracely Renner DVM', isSelected: false },
      { id: 8, value: 'Genoveva Luettgen', isSelected: false }
    ];
    this.filterCommissionList = [
      { id: 1, value: '0-10' },
      { id: 2, value: '10-15' },
      { id: 3, value: '15-20' },
      { id: 4, value: '20-25' },
      { id: 5, value: '25-30' },
      { id: 6, value: 'Above 30' },

    ];
    // this.resellercommissiontype = [{ "id": 1, "name": "Fixed", "selected": "false" }, { "id": 2, "name": "%", "selected": "true" },{ "id": 3, "name": "Itemwise", "selected": "false" }, { "id": 0, "name": "None", "selected": "false" }];
    this.getCheckedItemList();

    this.resellerPaymentForm = new FormGroup({
      'RP_billerName': new FormControl(null, [Validators.required]),
      'RP_resellerName': new FormControl(null, [Validators.required]),
      'RP_currencyName': new FormControl(null, [Validators.required]),
      'RP_commissionAmount': new FormControl(null),
      'RP_remarks': new FormControl(null),

    });
    this.resellerPayment_addForm = new FormGroup({
      'RP_add_billerName': new FormControl(null, [Validators.required]),
      'RP_add_resellerName': new FormControl(null, [Validators.required]),
      'RP_add_currencyName': new FormControl(null, [Validators.required]),
      'RP_add_commissionAmount': new FormControl(null),
      'RP_add_remarks': new FormControl(null),

    });
    this.resellerPayment_searchForm = new FormGroup({
      'RP_search_res_paymentName': new FormControl(null, [Validators.required]),
    });

    this.resellerProcessPaymentIIForm = new FormGroup({
      'RP_pay_date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'RP_pay_total': new FormControl(null),
      'RP_pay_paidAmount': new FormControl(null),
      'RP_pay_balance': new FormControl(null),
      'RP_pay_amount': new FormControl(null),
      'RP_pay_paymenttype': new FormControl(null),
      'RP_pay_descr': new FormControl(null),
    });
    this.landscapeEmailForm = new FormGroup({
      'landscapeEmail_From': new FormControl(null),
      'landscapeEmail_To': new FormControl(null),
      'landscapeEmail_Subject': new FormControl(null),
      'landscapeEmail_Template': new FormControl(null),
      'landscapeEmail_Message': new FormControl(null),
    });
    this.multipleResellerPaymentForm = new FormGroup({
      'RP_multiple_date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'RP_multiple_amount': new FormControl(null),
      'RP_multiple_paymentType': new FormControl(null),
      'RP_multiple_Description': new FormControl(null),

    });
    this.RP_SharePermissionForm = new FormGroup({

    });

    this.doubleArray = [
      [{ id: 1, value: 'Elenor Anderson', isSelected: false },
      { id: 2, value: 'Caden Kunze', isSelected: true }],
      [{ id: 3, value: 'Ms. Hortense Zulauf', isSelected: true },
      { id: 4, value: 'Grady Reichert', isSelected: false }],
      [{ id: 5, value: 'Dejon Olson', isSelected: false },
      { id: 6, value: 'Jamir Pfannerstill', isSelected: false }]
    ];
    this.items = [
      { id: 1, name: 'Item 1', selected: false },
      { id: 2, name: 'Item 2', selected: false },
      { id: 3, name: 'Item 3', selected: false },
      // Add more items as needed
    ];


  }

  addResellerPayment() {
    $('#RP_AddResellerPaymentID').modal('show');
  }
  searchResellerPayment() {
    $('#RP_searchResellerPaymentID').modal('show');
  }

  radio_commission(selectedId: number, index: number) {
    this.CommissionType[index] = selectedId;
  }

  get addressControls() {
    return this.resellerCommissionForm.get('addresses') as FormArray
  }

  addAddress(): void {
    this.addresses = this.resellerCommissionForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  createAddress(): FormGroup {

    return this.fb.group({
      reseller_name: '',
      commission_type: '',
      commission_value: '',
      commission_amt: '',
      pdf_show: '',
      reseller_comm_id: '',
      reseller_id: '',
      billId: '',
      grossAmount: '',

    });
  }
  checkUncheckAll(i: any) {
    for (var k = 0; i < this.checklist.length; k++) {
      this.checklist[k].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  CBF_PdfShow(event: any) {
    this.CBV_PdfShow = event.target.checked;
    console.log(this.CBV_PdfShow)

  }
  unpaidCheckAll(event: any) {
    this.unpaidCheckAll_status = event.target.checked;
    console.log("this.unpaidCheckAll_status", this.unpaidCheckAll_status)
  }
  paidCheckAll(event: any) {
    this.paidCheckAll_status = event.target.checked;
    console.log("this.paidCheckAll_status", this.paidCheckAll_status)
  }
  filterCommissionListDropdown(event: any, custId: any) {
    alert(event.target.value)
    this.filterCommission_value = event.target.value;
    console.log("this.filterCommission_value", this.filterCommission_value)

    if (this.filterCommission_value == 1) {
      this.filterCommission_color = 10;
      this.getResellerPaymentdetails({}, custId);
    } else if (this.filterCommission_value == 2) {
      this.filterCommission_color = 15;
      this.getResellerPaymentdetails({}, custId);
    } else if (this.filterCommission_value == 3) {
      this.filterCommission_color = 20;
      this.getResellerPaymentdetails({}, custId);
    } else if (this.filterCommission_value == 4) {
      this.filterCommission_color = 25;
      this.getResellerPaymentdetails({}, custId);
    } else if (this.filterCommission_value == 5) {
      this.filterCommission_color = 30;
      this.getResellerPaymentdetails({}, custId);
    } else {
      this.filterCommission_color = 35;
      this.getResellerPaymentdetails({}, custId);
    }
    // switch(this.filterCommission_value){
    //   case 1: 
    //     console.log("values between 1-10"); 
    //     this.filterCommission_color=10;
    //     this.getResellerPaymentdetails({},custId);
    //     break;
    //   
    //   case 2:
    //     console.log("values between 10-15");
    //     this.filterCommission_color=15;
    //     this.getResellerPaymentdetails({},custId);
    //     break;
    //   
    //   case 3:
    //     console.log("value between 15-20");
    //     this.filterCommission_color=20;
    //     this.getResellerPaymentdetails({},custId);
    //     break;
    //   
    //   case 4:
    //     console.log("value between 20-25");
    //     this.filterCommission_color=25;
    //     this.getResellerPaymentdetails({},custId);
    //     break;
    //   
    //   case 5:
    //     console.log("value between 25-30");
    //     this.filterCommission_color=30;
    //     this.getResellerPaymentdetails({},custId);
    //     break;
    //   
    //  default:
    //     console.log("value above 35");
    //     this.filterCommission_color=35;

    //     break;
    //   


    // }
  }
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i].id);
      this.checkedList.join(',');
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    console.log("this.checkedList", this.checkedList)
  }
  // selectAll() {
  //   const allSelected = this.items.every((item: { selected: any; }) => item.selected);

  //   this.items.forEach((item: { selected: boolean; }) => (item.selected = !allSelected));
  //   console.log("items select/deselect",this.items)
  // }

  selectAll() {
    // Iterate through resellerList and set selected property based on selectAllCheckbox
    this.resellerList.forEach((reseller: any) => {
      if (reseller.checkbox === 1) {
        reseller.selected = this.selectAllCheckbox;
      }
    });
    console.log("this.selectAllCheckbox", this.selectAllCheckbox)
  }
  selectAll_paid() {
    // Iterate through resellerList and set selected property based on selectAllCheckbox
    this.resellerList.forEach((reseller: any) => {
      if (reseller.checkbox === 1 && reseller.paid_status === 'Paid') {
        reseller.selected = this.selectAllCheckbox_paid;
      }
    });
    console.log("this.selectAllCheckbox_paid", this.selectAllCheckbox_paid)
  }


  radio_commissionType(event: any, index: any) {

    this.commissionType_value = event.target.value;
    const indexToUpdate = index; // Change this index according to your needs
    console.log(indexToUpdate);
    console.log("this.commissionType_value", this.commissionType_value);
    this.resellerCommissionForm.value.addresses[indexToUpdate].commission_type = this.commissionType_value;
    this.addr = this.resellerCommissionForm.value.addresses;
    console.log("this.commissionType_value", this.addr);

    if (this.commissionType_value == 1) {
      var commvalue = $('#CommissionValue_WFA_ID').val();
      $('#CommissionAmount_WFA_ID').val(commvalue);
    }
    if (this.commissionType_value == 2) {
      var commvalue = $('#CommissionValue_WFA_ID').val();
      var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(this.commissionGrossAmount) / 100).toFixed(2);

      $('#CommissionAmount_WFA_ID').val(commvalue_Percentage);
      this.commissionAmount_WFA = $('#CommissionAmount_WFA_ID').val();

    }
    if (this.commissionType_value == 4) {
      $('#CommissionValue_WFA_ID').val('');
      $('#CommissionAmount_WFA_ID').val('');

    }
  }

  commissionValueAutoFill() {
    if (this.commissionType_value == 1) {
      var commvalue = $('#CommissionValue_WFA_ID').val();
      $('#CommissionAmount_WFA_ID').val(commvalue);
    }
    if (this.commissionType_value == 2) {
      // alert(this.commissionType_value)
      var commvalue = $('#CommissionValue_WFA_ID').val();
      // alert(commvalue)

      var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(this.commissionGrossAmount) / 100).toFixed(2);
      // alert(commvalue_Percentage)

      $('#CommissionAmount_WFA_ID').val(commvalue_Percentage);
    }

  }
  selectEventReseller(item: any) {
    this.ResellerName_Customer = item.customerName;
    this.ResellerId_Customer = item.customerId
    console.log(item.customerId)
    console.log(item.customerName)


    // do something with selected item
  }
  onFocusedReseller(e: any) {
    // do something when input is focused
    console.log(e)
  }
  searchResellerData(data: any) {

    if (data.length > 4) {
      this.spinner.show();
    }
    let api_req: any = new Object();
    let api_searchReseData: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reseller_name_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_searchReseData.action = "reseller_name_details";
    api_searchReseData.reseller_name = data;
    api_searchReseData.user_id = localStorage.getItem('erp_c4c_user_id');

    // api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_searchReseData;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.searchResult = response.reseller_list;


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };

  }

  resellerPaymentList(data: any) {

    this.spinner.show();


    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "reseller/resellercomm_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "resellercomm_list";
    api_quotationList.user_id = this.user_ids;

    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      if (response) {


        this.spinner.hide();
        this.commission_amt = response.commission_amt;
        this.resellerCommission_list = response.reseller_list;
        this.reseller_name_list = response.reseller_name;
        console.log(response)

        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
      }
      else {
        this.spinner.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
    this.spinner.hide();

  }

  ResellerPayRemark(remarks: any, i: any) {

    $("#faqhead" + i).modal("hide");
    // iziToast.success({
    //   message:remarks ,
    //   position: 'topRight'
    // });

    Swal.fire({
      position: 'top-end',
      title: remarks,
      showConfirmButton: false,
      timer: 5500
    })
  }

  ResellerPaymentDefaultLoad() {
    let api_req: any = new Object();
    let addRPAPI: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "proforma/add_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addRPAPI.action = "add_proforma_invoice";
    addRPAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addRPAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.RPBiller_list = response.biller_details;
        this.RP_currencyList = response.currency_list;
      }
    });
  }
  PaymentMethodDefaultLoad() {
    let api_req: any = new Object();
    let addRPAPI: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getPaymentmethod";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addRPAPI.action = "getPaymentmethod";
    addRPAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addRPAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.paymentType_payment = response;

      }
    });
  }


  getResellerPaymentdetails(data: any, customerid: any) {

    console.log("data---in list", data);
    console.log("customerid---in list", customerid);

    if (customerid !== '' && typeof customerid !== 'object') {
      this.custID = customerid;
    }
    console.log("customer id-assign in list---this.custID", this.custID)

    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getResellerPaymentDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "getResellerPaymentDetails";

    api_getReseller.reseller_id = this.custID;
    api_getReseller.off_set = list_data.offset;
    api_getReseller.limit_val = list_data.limit;
    //   api_getReseller.off_set = 50;
    //  api_getReseller.limit_val = 50;
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {

        this.referallAmountDetails = response.referral_amount_details;

        this.payoutAmountDetails = response.payout_amount_details;
        this.payCurrencyName = response.currencyName;
        this.resellerList = response.reseller_list;
        this.cust_password = response.reseller_base_info.cust_password;
        this.reseller_email = response.reseller_base_info.reseller_email;
        this.unpaid_amount = response.reseller_base_info.unpaid_amount;
        this.CurrencyTotalList = response.reseller_payment_summary.currencyTotal;
        this.CurrencyTotalAll = response.reseller_payment_summary.currency_total_amt.total_price;
        this.YearTotalList = response.reseller_payment_summary.yearTotal;
        console.log(response)
        this.paginationData = this.serverService.pagination({
          'offset': response.off_set,
          'total': response.total_cnt, 'page_limit': this.pageLimit
        });
        this.spinner.hide();


      } else {


        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  listDataInfo(list_data: any) {
    console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    // list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  EditResellerCommList(reseller_comm_id: any, reseller_id: any, i: any) {
    $("#faqhead" + i).modal("hide");
    this.spinner.show();
    this.reseller_comm_id = reseller_comm_id;
    this.reseller_id = reseller_id;
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/edit_resellercomm_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "edit_resellercomm_list";

    api_getReseller.reseller_comm_id = reseller_comm_id;
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {

        this.edit_resellercomm_list = response.edit_resellercomm_list;
        this.resellerPaymentForm.patchValue({
          'RP_billerName': response.edit_resellercomm_list.billerId,
          'RP_resellerName': response.edit_resellercomm_list.reseller_name,
          'RP_currencyName': response.edit_resellercomm_list.currencyId,
          'RP_commissionAmount': response.edit_resellercomm_list.commission_amt,
          'RP_remarks': response.edit_resellercomm_list.remarks,

        })
        this.spinner.hide();


      } else {


        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  UpdateResellerPayment() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/updateResellerComm";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "updateResellerComm";

    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.reseller_comm_id = this.reseller_comm_id;
    if (this.resellerPaymentForm.value.RP_billerName === null) {

      iziToast.warning({
        message: "Fill Biller Name",
        position: 'topRight'
      });
      return false;

    } else {
      api_getReseller.company = this.resellerPaymentForm.value.RP_billerName;
    }
    if (this.resellerPaymentForm.value.RP_resellerName === null) {

      iziToast.warning({
        message: "Fill Reseller Name",
        position: 'topRight'
      });
      return false;

    } else {
      api_getReseller.reseller_name = this.resellerPaymentForm.value.RP_resellerName;
    }
    if (this.reseller_id === null) {

      iziToast.warning({
        message: "Fill Reseller ID",
        position: 'topRight'
      });
      return false;

    } else {
      api_getReseller.reseller_id = this.reseller_id;
    }




    if (this.resellerPaymentForm.value.RP_currencyName === null) {

      iziToast.warning({
        message: "Fill Currency",
        position: 'topRight'
      });
      return false;

    } else {
      api_getReseller.currencyId = this.resellerPaymentForm.value.RP_currencyName;
    }


    api_getReseller.commission_amt = this.resellerPaymentForm.value.RP_commissionAmount;;
    api_getReseller.remarks = this.resellerPaymentForm.value.RP_remarks;;

    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {


        this.spinner.hide();
        $('#RP_ResellerPaymentID').modal('hide');
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });



      } else {


        iziToast.warning({
          message: "Update Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  saveResellerPayment() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/updateResellerComm";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "updateResellerComm";

    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');

    if (this.resellerPayment_addForm.value.RP_add_billerName === null) {

      iziToast.warning({
        message: "Fill Biller Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_getReseller.company = this.resellerPayment_addForm.value.RP_add_billerName;
    }
    if (this.ResellerName_Customer === null || this.ResellerName_Customer == undefined || this.ResellerName_Customer == 'undefined') {
      iziToast.warning({
        message: "Fill Reseller Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.reseller_name = this.ResellerName_Customer;
    }

    if (this.ResellerId_Customer === null || this.ResellerId_Customer == undefined || this.ResellerId_Customer == 'undefined') {
      iziToast.warning({
        message: "Fill Reseller Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.reseller_id = this.ResellerId_Customer;
    }




    if (this.resellerPayment_addForm.value.RP_add_currencyName === null) {

      iziToast.warning({
        message: "Fill Currency",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_getReseller.currencyId = this.resellerPayment_addForm.value.RP_add_currencyName;
    }
    if (this.resellerPayment_addForm.value.RP_add_commissionAmount === null) {

      iziToast.warning({
        message: "Fill commission Amount",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_getReseller.commission_amt = this.resellerPayment_addForm.value.RP_add_commissionAmount;
    }
   
    api_getReseller.remarks = this.resellerPayment_addForm.value.RP_add_remarks;;

    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {


        this.spinner.hide();
        $('#RP_AddResellerPaymentID').modal('hide');
        iziToast.success({
          message: "Reseller Payment Added Successfully",
          position: 'topRight'
        });



      } else {
        this.spinner.hide();

        iziToast.warning({
          message: "Save Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  deleteResellerPayment(reseller_comm_id: any, i: any) {

    $("#faqhead" + i).modal("hide");
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
        this.spinner.show();
        let api_req: any = new Object();
        let delete_resellerpayment_req: any = new Object();
        api_req.moduleType = "reseller";
        api_req.api_url = "reseller/delete_reseller_payment";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_resellerpayment_req.action = "delete_reseller_payment";
        delete_resellerpayment_req.reseller_comm_id = reseller_comm_id;
        delete_resellerpayment_req.user_id = this.user_ids;
        api_req.element_data = delete_resellerpayment_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response != '') {

            this.resellerPaymentList({});
            iziToast.success({
              message: " Reseller payment Deleted Successfully",
              position: 'topRight'
            });

          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  getResellerNames() {
    let api_req: any = new Object();
    let addRPAPI: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getResellerNames";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addRPAPI.action = "getResellerNames";
    addRPAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = addRPAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.RP_paymentNameList = response;
      }

    });
  }
  ResellerPayProcessEdit(reseller_comm_id: any, reseller_id: any, i: any) {
    $("#faqhead" + i).modal("hide");
    this.spinner.show();
    this.reseller_comm_id = reseller_comm_id;
    this.reseller_id = reseller_id;
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/get_reseller_payment_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "get_reseller_payment_list";

    api_getReseller.reseller_comm_id = reseller_comm_id;
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {


        this.resellerProcessPaymentIIForm.patchValue({
          'RP_pay_total': response.conversionRate,
          'RP_pay_paidAmount': response.paid_amt,
          'RP_pay_balance': response.bal_amt_str,
          'RP_pay_amount': response.bal_amt,
          'RP_pay_paymenttype': response.paid_details,
          'RP_pay_descr': response.paid_details,

          // 'RP_pay_descr':response.paid_details,

        })
        this.spinner.hide();


      } else {


        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }



  ResellerPaySharePermissionEdit(reseller_id: any, i: any) {

    $("#faqhead" + i).modal("hide");
    this.spinner.show();
    $('#RP_SharePermissionFormID').modal('show');
    this.ShowPermission_BillID = reseller_id;
    let api_req: any = new Object();
    let api_sharePer: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getResellerPermissionList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_sharePer.action = "getResellerPermissionList";

    api_sharePer.reseller_id = reseller_id;
    api_sharePer.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_sharePer;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {


        this.getResellerPermissionList = response.user_list;
        this.CheckBox_DynamicArrayList_invoiceShowPermission = response.access_userid.split(',').map(Number);
        this.CheckBox_DynamicArrayList_invoiceShowPermission = this.CheckBox_DynamicArrayList_invoiceShowPermission.filter((value: number) => value !== 0);
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_invoiceShowPermission)
        this.spinner.hide();


      } else {


        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);

      };
  }
  InvoiceShowCHK(data: any, event: any) {
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_invoiceShow_Value = data;
    this.Checkbox_value_invoiceShow = event.target.checked;
    console.log(this.Checkbox_value_invoiceShow)
    if (this.Checkbox_value_invoiceShow) {
      if (this.CheckBox_DynamicArrayList_invoiceShowPermission !== 0) {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.push(Number(data));
      }

      this.CheckBox_DynamicArrayList_invoiceShowPermission.join(',');
      this.CheckBox_DynamicArrayList_invoiceShowPermission.sort();
      console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_invoiceShowPermission.indexOf(data);
      console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission)
    }
    this.typeConvertionString_invoiceShowPermission = this.CheckBox_DynamicArrayList_invoiceShowPermission;

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoiceShowPermission)

  }
  ResellerPaySharePermissionUpdate() {
    this.spinner.show();
    let api_req: any = new Object();
    let quot_share_update_req: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/reseller_comm_shared_option_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_update_req.action = "reseller_comm_shared_option_update";
    quot_share_update_req.share_bill_parent_id = this.ShowPermission_BillID;
    quot_share_update_req.user_id = this.user_ids;
    quot_share_update_req.invoice_shared_user_id = this.typeConvertionString_invoiceShowPermission;
    api_req.element_data = quot_share_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.result == true) {
        iziToast.success({
          message: "Show Permission Updated successfully",
          position: 'topRight'
        });

        $('#RP_SharePermissionFormID').modal('hide');
        this.typeConvertionString_invoiceShowPermission = [];
      } else {
        $('#RP_SharePermissionFormID').modal('hide');
        // iziToast.warning({
        //   message: "Response Failed",
        //   position: 'topRight'
        // });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  landscapeEmailEdit(id: any, i: any) {
    $("#faqhead" + i).modal("hide");
    this.spinner.show();

    this.landscapeEmailForm.reset();
    this.landscapeEmail_Customer_ID = id;
    let api_req: any = new Object();
    let api_mail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_email_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mail_req.action = "customer_email_template";
    api_mail_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_mail_req.customerId = this.landscapeEmail_Customer_ID;
    api_req.element_data = api_mail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.spinner.hide();
        this.From_List = response.email_from_det;
        this.Template_List = response.crm_template_det;
        console.log("Landscape  Email Template_List", this.Template_List);

        this.landscapeEmailForm.patchValue({
          'landscapeEmail_From': response.email_from_det,
          'landscapeEmail_To': response.email_id,
          'landscapeEmail_Template': response.crm_template_det,
        });

        iziToast.success({
          message: "Email Details Displayed Successfully",
          position: 'topRight'
        });


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  RP_change(event: any) {
    this.resellerID_search = event.target.value;
    console.log("this.resellerID_search", this.resellerID_search)
  }
  searchResPay() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_search_req: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/resellercomm_search_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_search_req.action = "resellercomm_search_list";
    api_search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_search_req.reseller_id = this.resellerID_search;

    api_req.element_data = api_search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.reseller_name_list = response.reseller_name;
        $('#RP_searchResellerPaymentID').modal('hide');

      } else {
        iziToast.warning({
          message: "No Match",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  LandscapeEmailContentDropdown(event: any) {
    this.spinner.show();
    this.CRMTemplateID = event.target.value;
    console.log("template ID check", this.CRMTemplateID);
    let api_req: any = new Object();
    let api_mailContentDropdown_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/get_customer_authendication_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mailContentDropdown_req.action = "get_customer_authendication_details";
    api_mailContentDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_mailContentDropdown_req.customerId = this.landscapeEmail_Customer_ID;
    api_mailContentDropdown_req.template_id = this.CRMTemplateID;
    api_req.element_data = api_mailContentDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.landscapeEmailForm.patchValue({

          'landscapeEmail_Subject': response.crm_subject_name,
          'landscapeEmail_Message': response.crm_template_content,
        });


      } else {
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  sendLandscapeMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.emailFrom = $('#emailFromLandscape_RP').val();
    this.emailTo = $('#emailToLandscape_RP').val();
    this.subjectValue = $('#subjLandscape_RP').val();
    this.emailTemplate = $('#templateLandscape_RP').val();
    this.msg_id = tinymce.get('RP_tinyLandscapeEmailID').getContent();

    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_landscape_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "customer_landscape_mail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_email_req.customer_id = this.EmailCustomerContractID;
    api_email_req.emailFrom = this.emailFrom;
    if (this.emailFrom === null || this.emailFrom === '' || this.emailFrom === 'undefined' || this.emailFrom === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.emailTo = this.emailTo;
    if (this.emailTo === null || this.emailTo === '' || this.emailTo === 'undefined' || this.emailTo === undefined) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.emailSubject = this.subjectValue;
    api_email_req.emailTemplate = this.emailTemplate;
    if (this.emailTemplate === null || this.emailTemplate === '' || this.emailTemplate === 'undefined' || this.emailTemplate === undefined) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }

    api_email_req.emailContent = this.msg_id;
    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        $('#emailFromLandscape_RP').val('');
        $('#emailToLandscape_RP').val('');
        $('#subjLandscape_RP').val('');
        $('#templateLandscape_RP').val('');
        tinymce.activeEditor.setContent("");
        $("#RP_landscapeEmailFormId").modal("hide");
        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });
        // this.customerslist({});


      } else {
        $('#emailFromLandscape_RP').val('');
        $('#emailToLandscape_RP').val('');
        $('#subjLandscape_RP').val('');
        $('#templateLandscape_RP').val('');
        tinymce.activeEditor.setContent("");
        $("#RP_landscapeEmailFormId").modal("hide");
        Swal.close();
        iziToast.success({
          message: "Email Notification not Sent !!!!",
          position: 'topRight'
        });
        // this.customerslist({});
      }
      // this.customerslist({});
    }),
      (error: any) => {
        Swal.close();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  pdf(billId: any, i: any) {
    $("#faqhead" + i).modal("hide");
    var url = "https://erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    // var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }
  get_WFA_ResellerCommission(id: any, i: any) {
    this.CommissionType1 = [];
    this.billId_ResellerCommissionId = id;
    $("#faqhead" + i).modal("hide");
    // $("body").removeClass("modal-open");

    this.resellerCommissionForm.reset();


    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getResellerGrossAmount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "getResellerGrossAmount";
    api_resCommEdit.billId = this.billId_ResellerCommissionId;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response", response)
      this.spinner.hide();
      // this.CommissionType = response;
      this.resellercommissiontype = response.commission_type
      this.commissionGrossAmount = response.grossAmount;

      if (response != '') {
        this.resellercommissiontype2 = response;
        for (let i = 0; i < response.editcommList.length; i++) {
          var gh = response.editcommList[i].commIndex;
          this.resellercommissiontype1.push({ val: gh });
          console.log("this.resellercommissiontype1-inside loop", this.resellercommissiontype1);
        }
        console.log("this.resellercommissiontype1-outside loop", this.resellercommissiontype1);

        const formArray = new FormArray([]);
        for (let i = 0; i < response.editcommList.length; i++) {
          // this.resellercommissiontype1=response.editcommList[i].commIndex;
          // console.log("this.resellercommissiontype1",this.resellercommissiontype1);
          // console.log(response.editcommList[i].commission_type);
          // this.CommissionType = response[i].commission_type;


          // $('#CommissionType_'+i).val(response[i].commission_type)
          // this.CommissionType.push(response.editcommList[i].commission_type);
          var k = response.editcommList[i].commission_type;
          this.CommissionType1.push(k);
          console.log(this.CommissionType1);

          formArray.push(this.fb.group({
            "reseller_name": response.editcommList[i].reseller_name,
            "commission_type": response.editcommList[i].commission_type,
            "commission_value": response.editcommList[i].commission_value,
            "commission_amt": response.editcommList[i].commission_amt,
            "pdf_show": response.editcommList[i].pdf_show == 1 ? true : false,
            "reseller_comm_id": response.editcommList[i].reseller_comm_id,
            "reseller_id": response.editcommList[i].reseller_id,
            "billId": response.editcommList[i].billId,
            "grossAmount": response.editcommList[i].grossAmount,

          })
          );





        }
        console.log(this.CommissionType);


        console.log(formArray)
        this.resellerCommissionForm.setControl('addresses', formArray);
        console.log("this.addresses---end of edit", this.resellerCommissionForm.value.addresses)
        this.data_value = this.resellerCommissionForm.value.addresses;

      } else {


        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };

  }

  update_WFA_ResellerCommission() {


    // $("#faqhead" + i).modal("hide");
    // $("body").removeClass("modal-open");
    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/reseller_comm_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "reseller_comm_update";
    api_resCommEdit.billId = this.billId_ResellerCommissionId;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');

    this.addr = this.resellerCommissionForm.value.addresses;
    api_resCommEdit.billchild_values = this.addr;
    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#RP_ResellerCommissionFormId').modal('hide');


      if (response != '') {
        iziToast.success({
          message: "Reseller Payment Updated Successfully ",
          position: 'topRight'
        });

      } else {


        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };

  }

  saveMultipleResellerPayment() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_multiple_req: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/resellercomm_search_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_multiple_req.action = "resellercomm_search_list";
    api_multiple_req.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.multipleResellerPaymentForm.value.RP_multiple_amount == null) {

    }
    if (this.multipleResellerPaymentForm.value.RP_multiple_paymentType == null) {

    }
    if (this.multipleResellerPaymentForm.value.RP_multiple_Description == null) {

    }
    api_req.element_data = api_multiple_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {

        $('#RP_multipleResellerPaymentID').modal('hide');

      } else {
        iziToast.warning({
          message: "No Match",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }


}
