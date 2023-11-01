import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-dup-invoice',
  templateUrl: './dup-invoice.component.html',
  styleUrls: ['./dup-invoice.component.css']
})
export class DupInvoiceComponent implements OnInit {

  //list
  PI_list: any;
  biller_list: any;
  biller_temp: any;
  invoicePermissionList: any
  invType_Search: any;
  response_total_cnt: any;
  suspend_state: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //advanced search
  searchInvoiceForm: FormGroup;
  searchBillerResult: any;
  groupSelect_searchId: any;
  quotationSearchCheckboxID_array: any = [];
  searchBillerNameList: any;
  searchBILLERID: any;
  edit_array_SearchBiller_Checkbox: any = [];
  edit_array_Years_Checkbox: any = [];
  CBV_Years_All: any;
  yearsList: any;
  exportState_Radio: any;
  searchOthers: any;
  CBV_BillerName_All: any;
  CBV_others_All: any;
  edit_array_others_Checkbox: any = [];
  CBV_recurring_only: any;
  CBV_dont_select_did_invoice: any;
  CBV_RevenueTypeWiseShow: any;
  revenueTypeWiseDropDownValue: any;
  commissionAmount_WFA: any;
  reseller_comm_id: any;
  //auto complete search
  searchResult: any;
  searchResult_CustomerID: any;
  quotationId_new: any;
  searchResult_CustomerName: any;
  //payment process
  processPaymentForm: FormGroup;
  isReadOnly: boolean = true;
  // Invoice Sending Method
  InvoiceSendingMethodForm: FormGroup;
  InvoiceSendingValue: any = 'None';
  //Invoice Show Permission
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
  taxAmtstate: any;


  //local storage
  user_ids: any;
  //invoice send to post
  invoiceSendingMethod_BillID: any;
  billId_InvoicePost: any;
  //process payment
  billID_processPayment: any;
  invoiceDetails_payment: any;
  paymentType_payment: any;
  paymentDetails_payment: any;

  // set-Invoice-type-name

  setInvoiceType: FormGroup;
  InvoiceType_BillerID: any
  InvoiceTypeList: any;
  //email-landscape

  emailForm: FormGroup;
  EmailQuotationID: any;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  Select_To_Type_radiobox_Value: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  email_groupMailList: any;

  edit_array_emailCC_Checkbox: any = [];
  quotation_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  FromEmailValue: any;
  Email_BillId: any;
  CBV_TemplateSelection: any;
  CBV_PDFLink: any;
  CBV_PaymentLink: any;
  //email-checkbox
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId: any;
  email_checkbox_value: any;
  checkbox_value: any;
  //recurring
  RecurringForm: FormGroup;
  recurringState: any;
  recurring_State_value: any;
  CBV_FixedChargeDt: any;
  CBV_UsageChargeDt: any;
  //coupon assign
  couponAssignForm: FormGroup;
  ResellerId_Customer: any;
  //file attachment
  fileAttach_quotationID: any;
  FileAttachmentForm: FormGroup;
  getFileAttachmentResult: any;
  myFiles: string[] = [];
  edit_array: any = [];
  checkbox_value_file: any;
  groupSelectCommonId: any;
  commonAttachmentID: any;
  checkboxAdding: any = [];


  //terms condition
  setTermConditionForm: FormGroup;
  TermDetailsList: any;
  TermCondition_BillerID: any;
  //recurring
  recurringDetails: any;
  reccuringDuration: any;
  recurringDetails_fixed_next_dt: any;
  recurringDetails_usage_next_dt: any;
  recuringStatus: any;
  recurring_BillerID: any;
  //revenue details
  RevenueDetails1Form: FormGroup;
  CBV_RevenueState: any;
  billId_invoiceRevenue: any;
  RevenuebillDetails: any;
  revenueTypeList: any;

  addQuotationInvoice_section2: FormGroup;
  billChildid_revenueChildListDetails: any;
  //delivery order
  DeliveryOrderForm: FormGroup;
  warrantyList: any;
  billerId_deliveryOrder: any;
  //set actual cost
  setActualCostForm: FormGroup;
  actualCost_quotationID: any;
  actualCost_ProductList: any;



  quotationChildID: any;
  quotationChildId_count: any;
  public addresses_actualCost: FormArray;
  setActualCost_FormGroup: FormGroup;
  test: boolean[] = [];
  itre = 0;
  //invoice type details
  InvoiceTypedetailsForm: FormGroup;
  //notes
  NotesForm: FormGroup;
  //reseller commission details
  ResellerCommissionForm: FormGroup;
  CBV_PdfShow: any;
  resellercommissiontype: any;
  commissionType_value: any;
  revenueChildListDetails: any;
  reseller_commissionState: any;
  //reseller commission
  // searchResult: any;
  ResellerName_Customer: any;
  resellerCommissionList: any;
  billId_ResellerCommissionId: any;
  CommissionType: any;
  radioSelected: any;
  radioSel: any;
  //reseller commission details-without form array
  withoutFormArrayResellerCommissionForm: FormGroup;
  commissionGrossAmount: any;

  //license details
  LicenseDetailsList: any;
  //invoice to quotation 
  addNewQuotationPopUpForm: FormGroup;
  enquiryFromList: any;
  quotationValidityList: any;
  templateNameList: any;
  isReadonly: boolean = true;
  quotationVersion = '1.0';
  billId_InvoicetoQuotation: any;
  //notes
  billId_notes: any;
  selected_billerId: any;

  datePipe: DatePipe = new DatePipe('en-US');
  transformDate: any;
  recurring_state_all: any;



  public addresses: FormArray;
  public addressForm: FormGroup;

  public revenueaddresses: FormArray;
  public revenueaddressForm: FormGroup;

  //permission-invoice
  invoicePermissionList_add: any;
  invoicePermissionList_Search: any;
  invoicePermissionList_all_invoice_show: any;
  invoicePermissionList_all_tax_billing: any;
  invoicePermissionList_comm_per: any;
  invoicePermissionList_date_filter_billing: any;
  invoicePermissionList_delete: any;
  invoicePermissionList_did_to_inv: any;
  invoicePermissionList_duplicate: any;
  invoicePermissionList_edit: any;
  invoicePermissionList_export_billing: any;
  invoicePermissionList_file_attach: any;
  invoicePermissionList_inv_recurring: any;
  invoicePermissionList_inv_to_do: any;
  invoicePermissionList_inv_to_pi: any;
  invoicePermissionList_inv_to_quotation: any;
  invoicePermissionList_inv_to_share: any;
  invoicePermissionList_invoice_alert: any;

  invoicePermissionList_list: any;
  invoicePermissionList_mail: any;
  invoicePermissionList_monthly_turn: any;
  invoicePermissionList_online_pay_link: any;
  invoicePermissionList_payment_process: any;
  invoicePermissionList_pdf_view: any;
  invoicePermissionList_sale_rep: any;
  invoicePermissionList_search: any;

  invoicePermissionList_sent_to_post: any;
  invoicePermissionList_set_invoice_revenue: any;
  invoicePermissionList_set_invoice_type: any;
  invoicePermissionList_set_prev_billing: any;
  invoicePermissionList_set_terms_condition: any;
  invoicePermissionList_sus_inv_list: any;
  invoicePermissionList_ten_day_per_billing: any;
  invoicePermissionList_inv_to_did: any;
  invoicePermissionList_set_actual_cost: any;
  //colors
  recurring_Status: any;
  billStatus: any;
  revenue_color: any;
  revenue_type_id: any;
  revenue_individual_state: any;
  share_access_state: any;
  postal_send_color: any;
  post_send_status: any;
  //email

  email_TemplateSelection: boolean = false;
  //suspend
  suspendList: any;
  groupSelectCommonId_suspend: any;
  checkbox_value_suspend: any;
  suspend_array: any = [];
  //chart-monthly income
  chart: any;
  chartOptions: any;
  //live data-line chart
  dataPoints: any[] = [];
  timeout: any = null;
  xValue: number = 1;
  yValue: number = 10;
  newDataCount: number = 10;
  chart1: any;
  testing = false;
  Global_search_filter = false;
  Global_search_filter_2: string;
  datavalue: any;
  constructor(private serverService: ServerService, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
    this.revenueaddressForm = this.fb.group({
      revenueaddresses: this.fb.array([this.createrevenueAddress()])
    });
    this.serverService.global_search_invoice.subscribe((val: any) => {
      console.log("before parse-global_search_invoice", val)    
      this.datavalue = val;
      this.getInvoice_Dup(this.datavalue)
      if (val != null || val != 'null') {
        this.Global_search_filter = true;

      } else if (val == null || val == 'null') {
        
        iziToast.warning({
          message: "No Invoice Data Found",
          position: 'topRight'
        });
        this.Global_search_filter_2 = 'emptylist';
      }
      else {
        this.Global_search_filter = false;

      }


    });
    $("body").removeClass("modal-open");
  }

  keywordResellerName = 'customerName';
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    this.getInvoice1({});
    this.commissionType_value = 1;
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.recurringState = [{ "id": 1, "name": "Active" }, { "id": 0, "name": "Inactive" }];
    this.resellercommissiontype = [{ "id": 1, "name": "Fixed", "selected": "false" }, { "id": 2, "name": "Percentage", "selected": "false" }, { "id": 4, "name": "None", "selected": "true" }];
    this.warrantyList = [{ "id": 1, "name": "No Warranty" }, { "id": 2, "name": "One Year Warranty" }, { "id": 3, "name": "Two Year Warranty" }]
    this.yearsList = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    this.exportState_Radio = [
      { name: 'Local', selected: true, id: 1 },
      { name: 'Export', selected: false, id: 2 },
      { name: 'Zero Valid', selected: false, id: 3 },

    ];
    // this.searchOthers = ["Remove Show All", "Deleted Invoice Show Regular", "Select Recuring Only", "	Select Previous Amt Show", "Don't Select DID Invoice", "	Revenue Type Wise Show"];
    this.searchOthers = ["Select Recuring Only", "Don't Select DID Invoice", "	Revenue Type Wise Show"];

    this.processPaymentForm = new FormGroup({
      'invoiceID': new FormControl(null),
      'toal': new FormControl(null),
      'biller': new FormControl(null),
      'paid': new FormControl(null),
      'customer': new FormControl(null),
      'owing': new FormControl(null),
      'amount': new FormControl(null),
      'date': new FormControl(null),
      'paymenttype': new FormControl(null),
      'note': new FormControl(null),
      'paymentDetails': new FormControl(null),

    });
    this.searchInvoiceForm = new FormGroup({
      'search_billerName': new FormControl(null),
      'company_Name': new FormControl(null),
      'years': new FormControl(null),
      'InvType': new FormControl(null),
      'others': new FormControl(null),
      'recurring_only': new FormControl(null),
      'dont_select_did_invoice': new FormControl(null),
      'RevenueTypeWiseShow': new FormControl(null),
      'revenueTypewiseCBKshow': new FormControl(null)

    });
    this.InvoiceSendingMethodForm = new FormGroup({
      'InvoiceSendingInput': new FormControl(null),
    });
    this.showPerissionForm = new FormGroup({
      'InvoiceSendingInput': new FormControl(null),
    });

    this.FileAttachmentForm = new FormGroup({
      'file': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),

    });
    this.RecurringForm = new FormGroup({
      'date': new FormControl(null),
      'recurring_state': new FormControl(null),
      'fixedChargeDtCBX': new FormControl(null),
      'usageChargeDuration': new FormControl(null),
      'fixedChargeDuration': new FormControl(null),
      'fixedChargeDt_value': new FormControl(null),
      'usageChargeDtCBX': new FormControl(null),
      'usageChargeDt_value': new FormControl(null),

    });
    this.couponAssignForm = new FormGroup({
      'couponCode': new FormControl(null),
    });
    this.setTermConditionForm = new FormGroup({
      'setTerm': new FormControl(null),
    });
    this.setInvoiceType = new FormGroup({
      'setInvoice': new FormControl(null)
    });
    this.RevenueDetails1Form = new FormGroup({
      'revenue': new FormControl(null),
      'Revenuestate': new FormControl(null)

    });
    this.DeliveryOrderForm = new FormGroup({
      'warranty': new FormControl(null),
    });

    this.InvoiceTypedetailsForm = new FormGroup({
      'invoiceType': new FormControl(null),
    });
    this.NotesForm = new FormGroup({
      'note': new FormControl(null),
    });
    this.setActualCostForm = new FormGroup({
      'txt_templateName': new FormControl(null),

    });
    this.ResellerCommissionForm = new FormGroup({
      'ResellerName': new FormControl(null),
      // 'CommissionType': new FormControl(null),
      'CommissionValue': new FormControl(null),
      'CommissionAmount': new FormControl(null),
      'PdfShow': new FormControl(null),

    });
    this.withoutFormArrayResellerCommissionForm = new FormGroup({
      'ResellerName_WFA': new FormControl(null),
      'CommissionType_WFA': new FormControl(null),
      'CommissionValue_WFA': new FormControl(null),
      'CommissionAmount_WFA': new FormControl(null),
      'PdfShow_WFA': new FormControl(null),
    });

    this.addNewQuotationPopUpForm = new FormGroup({
      'enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'enquirySubject_addPopUP': new FormControl(null, [Validators.required]),
      'quotationValidity_addPopUP': new FormControl(null, [Validators.required]),
      'version_enqForm_addPopUP': new FormControl(null, [Validators.required]),
      'templateName_addPopUP': new FormControl(null),
    });
    var date = new Date();
    this.transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');

    this.chartOptions = {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Market Capitalization of ACME Corp"
      },
      axisY: {
        labelFormatter: (e: any) => {
          var suffixes = ["", "K", "M", "B", "T"];

          var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
          if (order > suffixes.length - 1)
            order = suffixes.length - 1;

          var suffix = suffixes[order];
          return "$" + (e.value / Math.pow(1000, order)) + suffix;
        }
      },
      data: [{
        type: "line",
        xValueFormatString: "YYYY",
        yValueFormatString: "$#,###.##",
        dataPoints: [
          { x: new Date(1980, 0, 1), y: 2500582120 },
          { x: new Date(1981, 0, 1), y: 2318922620 },
          { x: new Date(1982, 0, 1), y: 2682595570 },
          { x: new Date(1983, 0, 1), y: 3319952630 },
          { x: new Date(1984, 0, 1), y: 3220180980 },
          { x: new Date(1985, 0, 1), y: 4627024630 },
          { x: new Date(1986, 0, 1), y: 6317198860 },
          { x: new Date(1987, 0, 1), y: 7653429640 },
          { x: new Date(1988, 0, 1), y: 9314027340 },
          { x: new Date(1989, 0, 1), y: 11377814830 },
          { x: new Date(1990, 0, 1), y: 9379751620 },
          { x: new Date(1991, 0, 1), y: 11185055410 },
          { x: new Date(1992, 0, 1), y: 10705343270 },
          { x: new Date(1993, 0, 1), y: 13764161445.9 },
          { x: new Date(1994, 0, 1), y: 14470193647.6 },
          { x: new Date(1995, 0, 1), y: 17087721440.6 },
          { x: new Date(1996, 0, 1), y: 19594314507.7 },
          { x: new Date(1997, 0, 1), y: 21708247148.4 },
          { x: new Date(1998, 0, 1), y: 25445271790 },
          { x: new Date(1999, 0, 1), y: 33492125981.9 },
          { x: new Date(2000, 0, 1), y: 30963463195.2 },
          { x: new Date(2001, 0, 1), y: 26815924144.7 },
          { x: new Date(2002, 0, 1), y: 22770427533.4 },
          { x: new Date(2003, 0, 1), y: 31253989239.5 },
          { x: new Date(2004, 0, 1), y: 36677497452.5 },
          { x: new Date(2005, 0, 1), y: 40439926591.3 },
          { x: new Date(2006, 0, 1), y: 49993998569.1 },
          { x: new Date(2007, 0, 1), y: 60305010382.7 },
          { x: new Date(2008, 0, 1), y: 32271465666.7 },
          { x: new Date(2009, 0, 1), y: 43959427666.5 },
          { x: new Date(2010, 0, 1), y: 50941861580.9 },
          { x: new Date(2011, 0, 1), y: 43956921719.4 },
          { x: new Date(2012, 0, 1), y: 50655765599.9 },
          { x: new Date(2013, 0, 1), y: 59629932862.7 },
          { x: new Date(2014, 0, 1), y: 62837256171.1 },
          { x: new Date(2015, 0, 1), y: 61894377981.9 },
          { x: new Date(2016, 0, 1), y: 64998472607.9 },
          { x: new Date(2017, 0, 1), y: 75233321687.8 },
          { x: new Date(2018, 0, 1), y: 68650476424.8 }
        ]
      }]
    }




  
  }
  // this.resellercommissiontype = [{ "id": 1, "name": "Fixed" ,"selected":"false"}, { "id": 2, "name": "Percentage" ,"selected":"false" }, { "id": 3, "name": "Itemwise" ,"selected":"false" }, { "id": 4, "name": "None"  ,"selected":"true"}];

  radioChecked(id: any, j: any) {
    // this.resellercommissiontype.forEach((item: { id: any; selected: boolean; })=>{
    //   alert(id)
    //   alert(item.id)
    //   if(item.id !== id){ 
    //      item.selected = false;
    //   }else{
    //      item.selected = true;
    //   } 
    //   if(item.id==undefined){
    //     alert("undefined")
    //   }
    // })
    // if(this.resellerCommissionList!=undefined&&this.resellerCommissionList!=null&&this.resellerCommissionList!='undefined'&&this.resellerCommissionList!='null'&&this.resellerCommissionList!=''){
    // this.resellerCommissionList.forEach((element: any) => {
    //   if(element.commission_type==id){
    //     // $("#CommissionType_"+)
    //     return true;
    //   }else{
    //     return false;
    //   }
    //   console.log(element.commission_type)
    // });
    for (var i = 0; i <= this.resellerCommissionList.length; i++) {
      for (var k = 0; k <= this.resellercommissiontype.length; k++) {

        console.log(this.resellerCommissionList);
        if (this.resellerCommissionList.commission_type == this.resellercommissiontype.id) {
          $("#CommissionType_" + i + "_" + k).val(this.resellerCommissionList.commission_type);
        }
      }
    }
    // }

  }

  onItemChange() {
    this.radioSel = this.resellercommissiontype.find((Item: { id: any; }) => Item.id === this.radioSelected);
  }
  radio_InvoiceSendingInput(event: any) {
    this.InvoiceSendingValue = event.target.value;
    console.log(this.InvoiceSendingValue)
  }
  radio_recurring(event: any) {
    this.recurring_State_value = event.target.id;
    console.log(this.recurring_State_value)

  }
  radio_commissionType(event: any) {
    this.commissionType_value = event.target.id;
    console.log("this.commissionType_value", this.commissionType_value);
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
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  CBF_PDFLink(event: any) {
    this.CBV_PDFLink = event.target.checked;
    console.log(this.CBV_PDFLink);
  }
  CBF_TemplateSelection(event: any) {
    this.CBV_TemplateSelection = event.target.checked;
    console.log(this.CBV_TemplateSelection);
  }
  CBF_PaymentLink(event: any) {
    this.CBV_PaymentLink = event.target.checked;
    console.log(this.CBV_PaymentLink);

  }
  CBF_FixedChargeDtFn(event: any) {
    this.CBV_FixedChargeDt = event.target.checked;
    console.log(this.CBV_FixedChargeDt);

  }
  CBF_UsageChargeDtFn(event: any) {
    this.CBV_UsageChargeDt = event.target.checked;
    console.log(this.CBV_UsageChargeDt);

  }
  CBF_RevenueStateFn(event: any) {
    this.CBV_RevenueState = event.target.checked;
    console.log(this.CBV_RevenueState)

  }
  CBF_PdfShow(event: any) {
    this.CBV_PdfShow = event.target.checked;

  }
  recurring_onlyCHK(event: any) {
    this.CBV_recurring_only = event.target.checked;

  }
  dont_select_did_invoiceCHK(event: any) {
    this.CBV_dont_select_did_invoice = event.target.checked;

  }
  RevenueTypeWiseShowCHK(event: any) {
    this.CBV_RevenueTypeWiseShow = event.target.checked;
    console.log(" this.CBV_RevenueTypeWiseShow", this.CBV_RevenueTypeWiseShow)
  }
  handleChange_RevenueTypeWiseShow(event: any) {
    this.revenueTypeWiseDropDownValue = event.target.value;
    console.log(" this.revenueTypeWiseDropDownValue", this.revenueTypeWiseDropDownValue)

  }
  selectEventCustomer(item: any) {
    console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

  }
  searchCustomerData(data: any) {

    if (data.length > 0) {
      // this.spinner.show();
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "customer";
      api_req.api_url = "customer/customer_name_search";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "customer_name_search";
      api_Search_req.user_id = this.user_ids;
      api_Search_req.customerName = data;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

        console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.customer_names;
        console.log("vignesh-advanced search result", this.searchResult);
        if (response! = null) {
          this.searchResult = response.customer_names;
          this.spinner.hide();
        }
        else {
          // iziToast.warning({
          //   message: "Sorry, No Matching Data",
          //   position: 'topRight'
          // });

        }
      });

    }


  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {

      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  yearsCHK(data: any, event: any) {
    this.CBV_Years_All = event.target.checked;
    if (this.CBV_Years_All) {

      this.edit_array_Years_Checkbox.push(data);
      this.edit_array_Years_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_Years_Checkbox);
    }
    else {
      const index = this.edit_array_Years_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_Years_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_Years_Checkbox)

    }

  }
  SearchOtherCheckAllCHK(data: any, event: any) {
    this.CBV_others_All = event.target.checked;
    if (this.CBV_others_All) {

      this.edit_array_others_Checkbox.push(data);
      this.edit_array_others_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_others_Checkbox);
    }
    else {
      const index = this.edit_array_others_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_others_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_others_Checkbox)

    }

  }
  addAddress(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  addrevenueAddress(): void {
    this.revenueaddresses = this.revenueaddressForm.get('revenueaddresses') as FormArray;
    this.revenueaddresses.push(this.createrevenueAddress());
  }
  createAddress(): FormGroup {
    return this.fb.group({
      ResellerName: '',
      CommissionType: '',
      CommissionValue: '',
      CommissionAmount: '',
      PdfShow: '',

    });
  }
  createrevenueAddress(): FormGroup {
    return this.fb.group({
      child_id: '',
      revenueType_child: '',
      revenueAmount_child: '',
      revenueProductName_child: '',
      revenueProductDesc_child: '',


    });
  }
  get addressControls() {
    return this.addressForm.get('addresses') as FormArray
  }
  get revenueaddressControls() {
    return this.revenueaddressForm.get('revenueaddresses') as FormArray
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
  removerevenueAddress(i: number) {
    this.revenueaddresses.removeAt(i);
  }
  keysearch(event: any) {
    this.searchResult_CustomerName = event.target.value
  }
  InvoiceShowCHK(data: any, event: any) {
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_invoiceShow_Value = data;
    this.Checkbox_value_invoiceShow = event.target.checked;
    console.log(this.Checkbox_value_invoiceShow)
    if (this.Checkbox_value_invoiceShow) {

      this.CheckBox_DynamicArrayList_invoiceShowPermission.push(Number(data));
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
    this.typeConvertionString_invoiceShowPermission = this.CheckBox_DynamicArrayList_invoiceShowPermission.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoiceShowPermission)

  }
  EditCHK_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value_file = event.target.checked;
    // console.log(this.checkbox_value_file)
    for (let i = 0; i <= this.getFileAttachmentResult.length; i++) {
      console.log(this.getFileAttachmentResult[i].quotation_pdf_add)
      // console.log(this.checkboxAdding)
      if (this.getFileAttachmentResult[i].quotation_pdf_add == '1') {
        this.checkboxAdding = this.getFileAttachmentResult[i].common_attachmentId;
        // console.log(this.checkboxAdding)
      }

    }

    console.log(this.checkboxAdding)
    if (this.checkbox_value_file) {
      this.checkboxAdding.push(data);
      console.log(this.checkboxAdding)
      this.edit_array.push(data);
      // this.edit_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array);
    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }

  dynamicChange(event: any) {

    console.log("event", event)

    this.invType_Search = event.target.value;
    console.log("invoice type search", this.invType_Search);
  }

  getInvoice1(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "invoice_list";
    api_quotationList.user_id = localStorage.getItem("erp_c4c_user_id");
    api_quotationList.Search_BillerId = this.edit_array_SearchBiller_Checkbox;
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.search_txt = this.searchResult_CustomerName;
    api_quotationList.years = this.edit_array_Years_Checkbox;
    api_quotationList.invoiceType = this.invType_Search;

    api_quotationList.recurring_only = this.CBV_recurring_only;
    api_quotationList.dont_select_did_invoice = this.CBV_dont_select_did_invoice;
    api_quotationList.revenue_typewise_show = this.CBV_RevenueTypeWiseShow;
    api_quotationList.revenue_typewise_showID = this.revenueTypeWiseDropDownValue;

    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.response_total_cnt = response.total_cnt
      console.log("PI list", response);
      if (response.total_cnt == 0) {
        // iziToast.warning({
        //   message: "Sorry, No Matching Data",
        //   position: 'topRight'
        // });
        $("#invsearchInvoiceFormIdDI").modal("hide");

      }
      if (response) {
        this.spinner.hide();
        this.PI_list = response.proforma_details;
        // this.recurring_Status = response.proforma_details[0].recuring_status;
        this.revenue_type_id = response.proforma_details[0].revenue_type_id;
        this.revenue_individual_state = response.proforma_details[0].revenue_individual_state;
        this.revenue_color = response.proforma_details[0].revenue_color;
        this.share_access_state = response.proforma_details[0].share_access_state;
        this.postal_send_color = response.proforma_details[0].postal_send_color;
        this.post_send_status = response.proforma_details[0].post_send_status;
        this.biller_list = response.biller_details;
        this.invoicePermissionList = response.invoice_permission_arr;
        this.invoicePermissionList_add = response.invoice_permission_arr.add;
        this.invoicePermissionList_Search = response.invoice_permission_arr.search;
        this.invoicePermissionList_all_invoice_show = response.invoice_permission_arr.all_invoice_show;
        this.invoicePermissionList_all_tax_billing = response.invoice_permission_arr.all_tax_billing;
        this.invoicePermissionList_comm_per = response.invoice_permission_arr.comm_per;
        this.invoicePermissionList_date_filter_billing = response.invoice_permission_arr.date_filter_billing;
        this.invoicePermissionList_delete = response.invoice_permission_arr.delete;
        this.invoicePermissionList_did_to_inv = response.invoice_permission_arr.did_to_inv;
        this.invoicePermissionList_duplicate = response.invoice_permission_arr.duplicate;
        this.invoicePermissionList_edit = response.invoice_permission_arr.edit;
        this.invoicePermissionList_export_billing = response.invoice_permission_arr.export_billing;
        this.invoicePermissionList_file_attach = response.invoice_permission_arr.file_attach;
        this.invoicePermissionList_inv_recurring = response.invoice_permission_arr.inv_recurring;
        this.invoicePermissionList_inv_to_do = response.invoice_permission_arr.inv_to_do;
        this.invoicePermissionList_inv_to_pi = response.invoice_permission_arr.inv_to_pi;
        this.invoicePermissionList_inv_to_quotation = response.invoice_permission_arr.inv_to_quotation;
        this.invoicePermissionList_inv_to_share = response.invoice_permission_arr.inv_to_share;
        this.invoicePermissionList_invoice_alert = response.invoice_permission_arr.invoice_alert;

        this.invoicePermissionList_list = response.invoice_permission_arr.list;
        this.invoicePermissionList_mail = response.invoice_permission_arr.mail;
        this.invoicePermissionList_monthly_turn = response.invoice_permission_arr.monthly_turn;
        this.invoicePermissionList_online_pay_link = response.invoice_permission_arr.online_pay_link;
        this.invoicePermissionList_payment_process = response.invoice_permission_arr.payment_process;
        this.invoicePermissionList_pdf_view = response.invoice_permission_arr.pdf_view;
        this.invoicePermissionList_sale_rep = response.invoice_permission_arr.sale_rep;
        this.invoicePermissionList_search = response.invoice_permission_arr.search;

        this.invoicePermissionList_sent_to_post = response.invoice_permission_arr.sent_to_post;
        this.invoicePermissionList_set_invoice_revenue = response.invoice_permission_arr.set_invoice_revenue;
        this.invoicePermissionList_set_invoice_type = response.invoice_permission_arr.set_invoice_type;
        this.invoicePermissionList_set_prev_billing = response.invoice_permission_arr.set_prev_billing;
        this.invoicePermissionList_set_terms_condition = response.invoice_permission_arr.set_terms_condition;
        this.invoicePermissionList_sus_inv_list = response.invoice_permission_arr.sus_inv_list;
        this.invoicePermissionList_ten_day_per_billing = response.invoice_permission_arr.ten_day_per_billing;
        this.revenueTypeList = response.revenue_list;
        this.taxAmtstate = response.proforma_details[0].taxAmtstate;

        this.edit_array_SearchBiller_Checkbox = response.selected_billerId;

        this.selected_billerId = response.selected_billerId;
        this.invoicePermissionList_inv_to_did
        this.invoicePermissionList_set_actual_cost


        for (var j = 0; j < response.proforma_details.length; j++) {

          this.reseller_commissionState = response.proforma_details[j].commission_state;
          this.recurring_state_all = response.proforma_details[j].recuring_status;
          console.log("this.reseller_commissionState", this.reseller_commissionState)
          this.suspend_state = response.proforma_details[j].suspend;
        }

        console.log("proforma_details list", this.PI_list)
        console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });


        $("#invsearchInvoiceFormIdDI").modal("hide");
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  getInvoice_Dup(data: any) {
    
        this.PI_list = data.proforma_details;
        // this.recurring_Status = data.proforma_details[0].recuring_status;
        this.revenue_type_id = data.proforma_details[0].revenue_type_id;
        this.revenue_individual_state = data.proforma_details[0].revenue_individual_state;
        this.revenue_color = data.proforma_details[0].revenue_color;
        this.share_access_state = data.proforma_details[0].share_access_state;
        this.postal_send_color = data.proforma_details[0].postal_send_color;
        this.post_send_status = data.proforma_details[0].post_send_status;
        this.biller_list = data.biller_details;
        this.invoicePermissionList = data.invoice_permission_arr;
        this.invoicePermissionList_add = data.invoice_permission_arr.add;
        this.invoicePermissionList_Search = data.invoice_permission_arr.search;
        this.invoicePermissionList_all_invoice_show = data.invoice_permission_arr.all_invoice_show;
        this.invoicePermissionList_all_tax_billing = data.invoice_permission_arr.all_tax_billing;
        this.invoicePermissionList_comm_per = data.invoice_permission_arr.comm_per;
        this.invoicePermissionList_date_filter_billing = data.invoice_permission_arr.date_filter_billing;
        this.invoicePermissionList_delete = data.invoice_permission_arr.delete;
        this.invoicePermissionList_did_to_inv = data.invoice_permission_arr.did_to_inv;
        this.invoicePermissionList_duplicate = data.invoice_permission_arr.duplicate;
        this.invoicePermissionList_edit = data.invoice_permission_arr.edit;
        this.invoicePermissionList_export_billing = data.invoice_permission_arr.export_billing;
        this.invoicePermissionList_file_attach = data.invoice_permission_arr.file_attach;
        this.invoicePermissionList_inv_recurring = data.invoice_permission_arr.inv_recurring;
        this.invoicePermissionList_inv_to_do = data.invoice_permission_arr.inv_to_do;
        this.invoicePermissionList_inv_to_pi = data.invoice_permission_arr.inv_to_pi;
        this.invoicePermissionList_inv_to_quotation = data.invoice_permission_arr.inv_to_quotation;
        this.invoicePermissionList_inv_to_share = data.invoice_permission_arr.inv_to_share;
        this.invoicePermissionList_invoice_alert = data.invoice_permission_arr.invoice_alert;

        this.invoicePermissionList_list = data.invoice_permission_arr.list;
        this.invoicePermissionList_mail = data.invoice_permission_arr.mail;
        this.invoicePermissionList_monthly_turn = data.invoice_permission_arr.monthly_turn;
        this.invoicePermissionList_online_pay_link = data.invoice_permission_arr.online_pay_link;
        this.invoicePermissionList_payment_process = data.invoice_permission_arr.payment_process;
        this.invoicePermissionList_pdf_view = data.invoice_permission_arr.pdf_view;
        this.invoicePermissionList_sale_rep = data.invoice_permission_arr.sale_rep;
        this.invoicePermissionList_search = data.invoice_permission_arr.search;

        this.invoicePermissionList_sent_to_post = data.invoice_permission_arr.sent_to_post;
        this.invoicePermissionList_set_invoice_revenue = data.invoice_permission_arr.set_invoice_revenue;
        this.invoicePermissionList_set_invoice_type = data.invoice_permission_arr.set_invoice_type;
        this.invoicePermissionList_set_prev_billing = data.invoice_permission_arr.set_prev_billing;
        this.invoicePermissionList_set_terms_condition = data.invoice_permission_arr.set_terms_condition;
        this.invoicePermissionList_sus_inv_list = data.invoice_permission_arr.sus_inv_list;
        this.invoicePermissionList_ten_day_per_billing = data.invoice_permission_arr.ten_day_per_billing;
        this.revenueTypeList = data.revenue_list;
        this.taxAmtstate = data.proforma_details[0].taxAmtstate;

        this.edit_array_SearchBiller_Checkbox = data.selected_billerId;

        this.selected_billerId = data.selected_billerId;
        this.invoicePermissionList_inv_to_did
        this.invoicePermissionList_set_actual_cost


        for (var j = 0; j < data.proforma_details.length; j++) {

          this.reseller_commissionState = data.proforma_details[j].commission_state;
          this.recurring_state_all = data.proforma_details[j].recuring_status;
          console.log("this.reseller_commissionState", this.reseller_commissionState)
          this.suspend_state = data.proforma_details[j].suspend;
        }

        console.log("proforma_details list", this.PI_list)
        console.log("this.biller_list", this.biller_list)
  }
  getInvoice(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "invoice_list";
    api_quotationList.user_id = localStorage.getItem("erp_c4c_user_id");
    api_quotationList.Search_BillerId = this.edit_array_SearchBiller_Checkbox;
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.search_txt = this.searchResult_CustomerName;
    api_quotationList.years = this.edit_array_Years_Checkbox;
    api_quotationList.invoiceType = this.invType_Search;

    api_quotationList.recurring_only = this.CBV_recurring_only;
    api_quotationList.dont_select_did_invoice = this.CBV_dont_select_did_invoice;
    api_quotationList.revenue_typewise_show = this.CBV_RevenueTypeWiseShow;
    api_quotationList.revenue_typewise_showID = this.revenueTypeWiseDropDownValue;

    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("PI list", response);
      this.response_total_cnt = response.total_cnt

      if (response.total_cnt == 0) {
        // iziToast.warning({
        //   message: "Sorry, No Matching Data",
        //   position: 'topRight'
        // });
        $("#invsearchInvoiceFormIdDI").modal("hide");

      }
      if (response) {
        this.spinner.hide();
        this.PI_list = response.proforma_details;
        // this.recurring_Status = response.proforma_details[0].recuring_status;
        this.revenue_type_id = response.proforma_details[0].revenue_type_id;
        this.revenue_individual_state = response.proforma_details[0].revenue_individual_state;
        this.taxAmtstate = response.proforma_details[0].taxAmtstate;
        this.revenue_color = response.proforma_details[0].revenue_color;
        this.share_access_state = response.proforma_details[0].share_access_state;
        this.postal_send_color = response.proforma_details[0].postal_send_color;
        this.post_send_status = response.proforma_details[0].post_send_status;
        // this.biller_list = response.biller_details;
        this.invoicePermissionList = response.invoice_permission_arr;
        this.invoicePermissionList_add = response.invoice_permission_arr.add;
        this.invoicePermissionList_Search = response.invoice_permission_arr.search;
        this.invoicePermissionList_all_invoice_show = response.invoice_permission_arr.all_invoice_show;
        this.invoicePermissionList_all_tax_billing = response.invoice_permission_arr.all_tax_billing;
        this.invoicePermissionList_comm_per = response.invoice_permission_arr.comm_per;
        this.invoicePermissionList_date_filter_billing = response.invoice_permission_arr.date_filter_billing;
        this.invoicePermissionList_delete = response.invoice_permission_arr.delete;
        this.invoicePermissionList_did_to_inv = response.invoice_permission_arr.did_to_inv;
        this.invoicePermissionList_duplicate = response.invoice_permission_arr.duplicate;
        this.invoicePermissionList_edit = response.invoice_permission_arr.edit;
        this.invoicePermissionList_export_billing = response.invoice_permission_arr.export_billing;
        this.invoicePermissionList_file_attach = response.invoice_permission_arr.file_attach;
        this.invoicePermissionList_inv_recurring = response.invoice_permission_arr.inv_recurring;
        this.invoicePermissionList_inv_to_do = response.invoice_permission_arr.inv_to_do;
        this.invoicePermissionList_inv_to_pi = response.invoice_permission_arr.inv_to_pi;
        this.invoicePermissionList_inv_to_quotation = response.invoice_permission_arr.inv_to_quotation;
        this.invoicePermissionList_inv_to_share = response.invoice_permission_arr.inv_to_share;
        this.invoicePermissionList_invoice_alert = response.invoice_permission_arr.invoice_alert;

        this.invoicePermissionList_list = response.invoice_permission_arr.list;
        this.invoicePermissionList_mail = response.invoice_permission_arr.mail;
        this.invoicePermissionList_monthly_turn = response.invoice_permission_arr.monthly_turn;
        this.invoicePermissionList_online_pay_link = response.invoice_permission_arr.online_pay_link;
        this.invoicePermissionList_payment_process = response.invoice_permission_arr.payment_process;
        this.invoicePermissionList_pdf_view = response.invoice_permission_arr.pdf_view;
        this.invoicePermissionList_sale_rep = response.invoice_permission_arr.sale_rep;
        this.invoicePermissionList_search = response.invoice_permission_arr.search;

        this.invoicePermissionList_sent_to_post = response.invoice_permission_arr.sent_to_post;
        this.invoicePermissionList_set_invoice_revenue = response.invoice_permission_arr.set_invoice_revenue;
        this.invoicePermissionList_set_invoice_type = response.invoice_permission_arr.set_invoice_type;
        this.invoicePermissionList_set_prev_billing = response.invoice_permission_arr.set_prev_billing;
        this.invoicePermissionList_set_terms_condition = response.invoice_permission_arr.set_terms_condition;
        this.invoicePermissionList_sus_inv_list = response.invoice_permission_arr.sus_inv_list;
        this.invoicePermissionList_ten_day_per_billing = response.invoice_permission_arr.ten_day_per_billing;
        this.revenueTypeList = response.revenue_list;

        this.edit_array_SearchBiller_Checkbox = response.selected_billerId;

        this.selected_billerId = response.selected_billerId;
        this.invoicePermissionList_inv_to_did
        this.invoicePermissionList_set_actual_cost

        for (var j = 0; j < response.proforma_details.length; j++) {

          this.reseller_commissionState = response.proforma_details[j].commission_state;
          this.suspend_state = response.proforma_details[j].suspend;
          this.recurring_state_all = response.proforma_details[j].recuring_status;
        }

        console.log("proforma_details list", this.PI_list)
        // console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });


        $("#invsearchInvoiceFormIdDI").modal("hide");
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  addPIGo() {
    this.router.navigate(['/AddInvoice'])
  }
  editPIGo(id: any, i: any, didState: any) {

    $("#ActionIdInvDup" + i).modal("hide");
    var editbillID = id;
    var editDIDState = didState;


    if (didState == '0') {
      this.router.navigate(['/EditInvoice'], {
        queryParams: {
          e_editBillID: editbillID,
          e_editDIDState: editDIDState
        }
      });
    }
    else {
      this.router.navigate(['/InvoiceEditDID'], {
        queryParams: {
          e_editBillID: editbillID,
          e_editDIDState: editDIDState
        }
      });

    }


    $("body").removeClass("modal-open");

  }

  duplicatePIGo(id: any, i: any, didState: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    var editDuplicateID = id;


    if (didState == '0') {

      this.router.navigate(['/EditInvoice'], {
        queryParams: {
          e_editDuplicateID: editDuplicateID,
          e_editDIDState: didState
        }
      });

    } else {

      this.router.navigate(['/InvoiceEditDID'], {
        queryParams: {
          e_editDuplicateID: editDuplicateID,
          e_editDIDState: didState
        }
      });

    }


    $("body").removeClass("modal-open");
  }
  clearSearch() {
    $("#invsearchInvoiceFormIdDI").modal("show");
  }
  suspendInvoiceGo() {
    $('#invsuspendInvoiceFormIdDI').modal('show');
    this.suspendInvoiceList();

  }
  suspendInvoiceList() {
    let api_req: any = new Object();
    let suspend_share_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/getSuspendInvoiceList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    suspend_share_req.action = "getSuspendInvoiceList";
    suspend_share_req.user_id = this.user_ids;
    api_req.element_data = suspend_share_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

        this.suspendList = response.suspendList;





      }
      else {

        iziToast.error({
          message: "Suspend - Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  invoiceSharPersonEdit(Id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.getInvoice1({});
    this.ShowPermission_BillID = Id;
    let api_req: any = new Object();
    let quot_share_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_shared_person";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_req.action = "invoice_shared_person";

    quot_share_req.user_id = this.user_ids;
    quot_share_req.billId = Id;
    api_req.element_data = quot_share_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {


        this.invoiceShowPermission_EditOnLoad_Values = response.access_userid;

        this.invoiceShowPermission_List = response.user_list;
        this.invoiceShowPermission_List1 = response.access_userid;
        this.invoiceShowResult = response.user_list;
        this.CheckBox_DynamicArrayList_invoiceShowPermission = response.access_userid.split(',').map(Number);
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_invoiceShowPermission)

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
      console.log("final error", error);
    }
  }
  invoiceSharPermissionUpdate() {
    let api_req: any = new Object();
    let quot_share_update_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_shared_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_update_req.action = "invoice_shared_update";
    quot_share_update_req.billId = this.ShowPermission_BillID;
    quot_share_update_req.user_id = this.user_ids;
    quot_share_update_req.shared_user_id = this.typeConvertionString_invoiceShowPermission;
    api_req.element_data = quot_share_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: "Share Permission Updated successfully",
          position: 'topRight'
        });

        $('#sharPerissionFormIdDI').modal('hide');
        this.typeConvertionString_invoiceShowPermission = [];
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
  deleteInvoice(billId: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/suspend_invoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "suspend_invoice";
        del_req.user_id = localStorage.getItem('erp_c4c_user_id');
        del_req.billId = billId;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Invoice Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            iziToast.warning({
              message: "Invoice Delete Failed",
              position: 'topRight'
            });
          }
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
    })
  }
  deletesuspendInvoice(billId: any) {

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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/deleteSuspendList";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "deleteSuspendList";
        del_req.billId = billId;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.suspendInvoiceList();
            iziToast.success({
              message: "Suspend Invoice Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.suspendInvoiceList();
            iziToast.warning({
              message: "Suspend Invoice Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.suspendInvoiceList();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }
  deleteAllsuspendInvoice() {
    if (this.suspend_array == '') {
      iziToast.error({
        message: "Select Atleast 1 Invoice to Delete",
        position: 'topRight'
      });
      return false;
    }

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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/deleteMultipleSuspendList";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "deleteMultipleSuspendList";
        del_req.billId = this.suspend_array;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.suspendInvoiceList();
            iziToast.success({
              message: "Suspend Invoice Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.suspendInvoiceList();
            iziToast.warning({
              message: "Suspend Invoice Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.suspendInvoiceList();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }
  selectAll(event: any) {

    if (event.target.checked == true) {

      this.suspendList.forEach((element: any, index: any) => {
        $("#check-grp-suspend-" + index).prop('checked', true);
      });
    } else {
      this.suspendList.forEach((element: any, index: any) => {
        $("#check-grp-suspend-" + index).prop('checked', false);
      });

    }

  }
  EditCHKAllSuspend(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_suspend = data;
    this.checkbox_value_suspend = event.target.checked;
    console.log(this.checkbox_value_suspend)
    if (this.checkbox_value_suspend) {

      this.suspend_array.push(data);
      this.suspend_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.suspend_array);
    }
    else {
      const index = this.suspend_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.suspend_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.suspend_array)

    }
  }
  getInvoice_Permission(id: any) {

    let api_req: any = new Object();
    let api_postPermission: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/getStatus";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postPermission.action = "getStatus";
    api_postPermission.billId = id;
    api_req.element_data = api_postPermission;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {

        this.reseller_commissionState = response.commission_state;
        this.recurring_Status = response.recuring_status;
        this.billStatus = response.billStatus;



      } else {


        iziToast.warning({
          message: "",
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
  getInvoice_Post(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.billId_InvoicePost = id;
    this.getInvoice1({});
    let api_req: any = new Object();
    let api_postED: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_invoice_send_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postED.action = "get_invoice_send_details";
    api_postED.billId = id;
    api_postED.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postED;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.InvoiceSendingMethodForm.patchValue({
          'InvoiceSendingInput': response.post_send_status

        })
        this.getInvoice1({});

      } else {


        iziToast.warning({
          message: "Invoice Send to post details not Updated. Please try again",
          position: 'topRight'
        });
        this.getInvoice1({});
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
  setInvoice_Post() {
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_send_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "invoice_send_details_update";
    api_postUPd.billId = this.billId_InvoicePost;
    api_postUPd.post_send_status = this.InvoiceSendingValue;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        iziToast.success({
          message: "Invoice Send to post details Successful. ",
          position: 'topRight'
        });
        $('#InvoiceSendingMethodFormIdDI').modal('hide');

      } else {


        iziToast.warning({
          message: "Invoice Send to post details not Updated. Please try again",
          position: 'topRight'
        });
        $('#InvoiceSendingMethodFormIdDI').modal('hide');
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
  InvoiceSendingMethodEdit(Id: any) {

    this.invoiceSendingMethod_BillID = Id;
    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/post_send_status_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "post_send_status_get";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.billId = Id;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.InvoiceSendingMethodForm.patchValue({
          'InvoiceSendingInput': response.post_status

        })


      }
      else {
        $("#InvoiceSendingMethodFormIdDI").modal("hide");
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
      console.log("final error", error);
    }

  }
  clearPaymentProcess() {

    this.processPaymentForm.value.reset();

    $("#amount").val('');
    $("#note").val('');
    $("#paytype").val('');
    $("#dateee").val('');
  }
  processPaymentEdit(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.spinner.show();
    this.billID_processPayment = id;
    let api_req: any = new Object();
    let api_processpaymentEdit: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "invoice/invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentEdit.action = "invoice_payment_details";

    api_processpaymentEdit.billId = id;
    api_processpaymentEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_processpaymentEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        this.invoiceDetails_payment = response.invoice_details;
        this.paymentType_payment = response.payment_type;
        this.paymentDetails_payment = response.payment_details;
        this.processPaymentForm.patchValue({
          'invoiceID': response.invoice_details[0].invoice_no,
          'toal': response.invoice_details[0].netPayment,
          'biller': response.invoice_details[0].billerName,
          'paid': response.paid_amount,
          'customer': response.invoice_details[0].customerName,
          'owing': response.owing_amount,
          'amount': response.owing_amount,

        })
        this.spinner.hide();

        this.getInvoice1({});
      } else {

        $('#processPaymentFormIdDI').modal("hide");
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
  processPaymentUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_processpaymentUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/proforma_invoice_payment_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentUpdate.action = "proforma_invoice_payment_update";

    api_processpaymentUpdate.billId = this.billID_processPayment;
    api_processpaymentUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.processPaymentForm.value.amount === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Amount Value missing",
        position: 'topRight'
      });

      return false;
    }

    api_processpaymentUpdate.amount = this.processPaymentForm.value.amount;
    api_processpaymentUpdate.paymentDate = this.processPaymentForm.value.date;
    api_processpaymentUpdate.payment_method = this.processPaymentForm.value.paymenttype;
    if (this.processPaymentForm.value.paymenttype === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      return false;
    }
    api_processpaymentUpdate.note = this.processPaymentForm.value.note;
    api_req.element_data = api_processpaymentUpdate;
    $("#processPaymentFormIdDI").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#processPaymentFormIdDI").removeAttr("disabled");
      if (response.status == true) {

        this.spinner.hide();
        $('#processPaymentFormIdDI').modal("hide");
        iziToast.success({
          message: "Payment Process Updated Successfully",
          position: 'topRight'

        });
        this.getInvoice1({});

      } else {
        this.spinner.hide();
        $('#processPaymentFormIdDI').modal("hide");
        iziToast.warning({
          message: "Payment Process not displayed. Please try again",
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
  getEmailDetails(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.email_TemplateSelection = false;
    $('#temp').val('');

    $('input:checkbox').removeAttr('checked');
    this.emailForm.reset();
    this.spinner.show();
    this.Email_BillId = id;
    let api_req: any = new Object();
    let api_emailDetails: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/send_invoice_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_emailDetails.action = "send_invoice_details";

    api_emailDetails.billId = id;
    api_emailDetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_emailDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.email_fromList = response.email_from_arr;
        this.email_groupMailList = response.group_mail;
        this.email_crmTemplateList = response.crm_template_list;
        this.email_cc_userList = response.cc_user;
        this.messageContent = response.invoice_content;
        this.mailContent = tinymce.get('tinyID').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({

          'tinyID': this.mailContent,
          'Subject_Content': response.subject,


        })
        if (this.Select_To_Type_radiobox_Value == 'finance') {
          this.emailForm.patchValue({
            'email_to': response.finance_email,
            'tinyID': this.mailContent,
          })
        }
        else {
          this.emailForm.patchValue({
            'email_to': response.company_email,
            'tinyID': this.mailContent,
          })
        }



        this.getInvoice1({});
      } else {

        $('#processPaymentFormIdDI').modal("hide");
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
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.getInvoice1({});
    tinymce.activeEditor.setContent("");
  }
  templateContentEmailDropdown(event: any) {
    this.quotation_Emailtemplate_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_email_quotation_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_email_quotation_template";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.quotation_id = this.EmailQuotationID
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content
      this.mailContent = tinymce.get('tinyID').setContent("<p>" + this.messageContent + "</p>");
      if (response != '') {
        this.emailForm.patchValue({

          'Subject_Content': response.crm_subject_name,

          'tinyID': this.mailContent,

        });

      }
      else {
        this.emailForm.patchValue({

          'email_template': '',

        });
      }


    });
  }

  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.FromEmailValue = $('#emailFrom').val();
    this.emailTo = $('#emailto').val();
    this.subjectValue = $('#subject').val();
    this.msg_id = tinymce.get('tinyID').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    var pdf_state = 0
    if (this.CBV_TemplateSelection == true || this.CBV_PDFLink == true || this.CBV_PaymentLink == true) {
      var pdf_state = 1;
      console.log("if condition if any checkbox selects", pdf_state)
    }
    else {
      var pdf_state = 0;
      console.log("if condition if none of checkbox selects", pdf_state)
    }


    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_details_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "invoice_details_sendmail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.billId = this.Email_BillId;

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.FromEmailValue === null || this.FromEmailValue === '' || this.FromEmailValue === 'undefined' || this.FromEmailValue === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.toEmailId = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    api_email_req.pdf_state = pdf_state;
    api_email_req.subject = this.subjectValue;
    if (this.subjectValue === null || this.subjectValue === '' || this.subjectValue === 'undefined' || this.subjectValue === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }
    api_email_req.message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      Swal.close();
      return false;

    }

    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

        $("#emailFormIdDI").modal("hide");
        this.getInvoice1({});

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#emailFormIdDI").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        this.getInvoice1({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        this.getInvoice1({});

      }
      Swal.close();
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  initTiny() {
    var richTextArea_id = 'richTextAreacreated';
    tinymce.init({
      selector: '#richTextAreacreated',
      height: 500,
      plugins: 'advlist autolink textcolor formatpainter lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste  wordcount autolink lists media table',
      toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | autoresize',
      paste_data_images: true,
      images_upload_url: 'upload.php',
      automatic_uploads: false,
      default_link_target: "_blank",
      extended_valid_elements: "a[href|target=_blank]",
      link_assume_external_targets: true,
      images_upload_handler: function (blobInfo: any, success: any, failure: any) {
        var xhr: any, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'upload.php');

        xhr.onload = function () {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.file_path != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.file_path);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
    });
    if (tinymce.editors.length > 0) {
      //  tinymce.execCommand('mceFocus', true, richTextArea_id );       
      tinymce.execCommand('mceRemoveEditor', true, richTextArea_id);
      tinymce.execCommand('mceAddEditor', true, richTextArea_id);
    }
  }
  pdf(billId: any) {

    var url = "https://erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    // var url = "https://laravelapi.erp1.cal4care.com/api/invoice/getBillpdf?billId=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }
  get_actualcost_details(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.spinner.show();
    let api_req: any = new Object();
    let api_invActCost: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_actualcost_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invActCost.action = "get_actualcost_details";
    api_invActCost.billId = id;
    api_invActCost.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invActCost;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.actualCost_ProductList = response.billChild_details;
        this.quotationChildId_count = this.actualCost_ProductList.length + 1;


      } else {


        iziToast.warning({
          message: "Actual Cost not Updated. Please try again",
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

  get_invoice_licence_details(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    let api_req: any = new Object();
    let api_invLicDet: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_invoice_licence_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invLicDet.action = "get_invoice_licence_details";
    api_invLicDet.billId = id;
    api_invLicDet.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invLicDet;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.LicenseDetailsList = response.license_details;


      } else {


        iziToast.warning({
          message: "License Details not Updated. Please try again",
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

  DuplicateInvoice(id: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_dup: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/duplicate_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dup.action = "duplicate_invoice";
    api_dup.billId = id;
    api_dup.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_dup;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {


        iziToast.success({
          message: "Duplicate created successfully",
          position: 'topRight'

        });

        this.getInvoice1({});

      } else {


        iziToast.warning({
          message: "Duplicate not Updated. Please try again",
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
  fileAttachmentEdit(ID: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    $('#file').val();
    $('#file').val('');

    this.myFiles = [];
    $("#invfileAttachmentFormIdDI").modal("show");
    // this.fileAttachContractID = fileAttachContractID;
    this.fileAttach_quotationID = ID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "invoice_attachment_details";
    fileattach_req.billId = this.fileAttach_quotationID;
    fileattach_req.user_id = this.user_ids;
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check  file attachment", response)
      this.getFileAttachmentResult = response.inv_attachment_details;
      // this.firstResult = response.phone_provision_det;
      // this.secondResult=response.contract_attachment_arr;
      if (response.status == true) {
        this.FileAttachmentForm.patchValue({
          // 'file': response.attachment_list.uploadFileName,
          'file': response.inv_attachment_details[0].uploadFileName,

        });
      }
    });


  }
  fileAttachmentUpdate() {

    // this.FileAttachmentForm.reset();
    //  var data = new FormData();
    Swal.fire('File Updating');
    Swal.showLoading();

    if (this.myFiles.length == 0) {
      Swal.close();
      iziToast.warning({
        message: "Attachment File Missing",
        position: 'topRight'
      });
    }

    if (this.myFiles.length > 0) {

      const data = new FormData();

      for (var i = 0; i < this.myFiles.length; i++) {
        data.append("invoice_attach_file[]", this.myFiles[i]);
      }
      for (var j = 0; j < this.edit_array.length; j++) {
        data.append("invoice_pdf_add[]", this.edit_array[j]);
      }

      data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
      data.append('billId', this.fileAttach_quotationID);
      // data.append('quotation_pdf_add[]',this.edit_array ); 
      data.append('action', "invoice_attachment_save");


      var self = this;
      $.ajax({
        type: 'POST',
        url: 'https://laravelapi.erp1.cal4care.com/api/invoice/invoice_attachment_save',


        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {

            self.getInvoice1({});
            console.log(result);
            Swal.close();
            $("#invfileAttachmentFormIdDI").modal("hide");
            this.edit_array = [];

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#invfileAttachmentFormIdDI").modal("hide");

            iziToast.warning({
              message: "File Attachment Update Failed",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#invfileAttachmentFormIdDI").modal("hide");
        }

      })


    }
  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  fileAttachmentClear() {
    this.FileAttachmentForm.reset();
  }
  fileAttachmentDelete(common_attachmentId: any) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {

        this.commonAttachmentID = common_attachmentId;
        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = "invoice";
        // api_req.api_url = "customer/delete_file_attachment";
        api_req.api_url = "invoice/invoice_attachment_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        fileattachDelete_req.action = "invoice_attachment_delete";
        fileattachDelete_req.common_attachmentId = this.commonAttachmentID;
        fileattachDelete_req.user_id = this.user_ids;
        fileattachDelete_req.billId = this.fileAttach_quotationID;
        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "File Attachment Deleted successfully",
              position: 'topRight'
            });

            $("#invfileAttachmentFormIdDI").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
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

  setTermsConditionEdit(id: any, i: any) {
    // this.setInvoiceType.reset();
    $("#ActionIdInvDup" + i).modal("hide");
    this.spinner.show();
    this.TermCondition_BillerID = id;

    let api_req: any = new Object();
    let api_insertProforma: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/terms_condition_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProforma.action = "terms_condition_get";

    api_insertProforma.billId = id;
    api_insertProforma.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_insertProforma;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.TermDetailsList = response.terms_details;
        this.setTermConditionForm.patchValue({
          'setTerm': response.selected_terms
        })



      } else {

        $('#invsettermsConditionFormIdDI').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not displayed. Please try again",
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
  setTermsConditionUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_insertProformaUpdate: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/terms_condition_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProformaUpdate.action = "terms_condition_update";
    api_insertProformaUpdate.billId = this.TermCondition_BillerID;
    api_insertProformaUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_insertProformaUpdate.terms_values = this.setTermConditionForm.value.setTerm;
    api_req.element_data = api_insertProformaUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {


        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#invsettermsConditionFormIdDI').modal("hide");
      } else {

        $('#invsettermsConditionFormIdDI').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not Updated. Please try again",
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
  setTermsConditionClear() {
    this.setTermConditionForm.reset();
  }
  paymentLink(paylink_id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");

    var url = "https://erp.cal4care.com/erp/pay_online.php?payment_through=aW52b2ljZQ==&payment=" + paylink_id;
    window.open(url, '_blank');
    console.log("url", url)
    // $('#pdfFormId').modal('hide');
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  RecurringEdit(id: any, i: any) {

    $("#ActionIdInvDup" + i).modal("hide");
    this.spinner.show();
    this.recurring_BillerID = id;
    this.getInvoice1({});
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reccuring_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "reccuring_details";

    api_recurring.billId = id;
    api_recurring.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        var date = response.reccuring_details.recured_date_show;
        console.log("date check", date)
        // $('#date123').val('01/01/1970');
        this.recurringDetails = response.reccuring_details;
        this.recurringDetails_fixed_next_dt = response.reccuring_details.fixed_next_dt;
        this.recurringDetails_usage_next_dt = response.reccuring_details.usage_next_dt;
        this.recuringStatus = response.reccuring_details.recuring_status;
        this.recurring_State_value = response.reccuring_details.recuring_status;

        this.reccuringDuration = response.reccuring_duration;
        this.TermDetailsList = response.terms_details;
        this.RecurringForm.patchValue({

          'date': response.reccuring_details.fixed_next_dt,
          'fixedChargeDuration': response.reccuring_details.fixed_duration,
          'fixedChargeDt_value': response.reccuring_details.fixed_next_dt,

          'usageChargeDuration': response.reccuring_details.usage_duration,
          'usageChargeDt_value': response.reccuring_details.usage_next_dt,

        })

        // $('#RecurringFormIdDI').modal("hide");
        this.getInvoice1({});

      } else {


        iziToast.warning({
          message: "Recurring Details not displayed. Please try again",
          position: 'topRight'
        });
        $('#RecurringFormIdDI').modal("hide");
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
  RecurringUpdate() {


    this.spinner.show();


    let api_req: any = new Object();
    let api_recurringUpd: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reccuring_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurringUpd.action = "update_reccuring_details";

    api_recurringUpd.billId = this.recurring_BillerID;

    api_recurringUpd.recured_date_new = this.RecurringForm.value.date;
    api_recurringUpd.recuring_new_rdo = this.recurring_State_value;
    api_recurringUpd.fixed_charge_chk = this.CBV_FixedChargeDt;
    api_recurringUpd.fixed_charge_dt = this.RecurringForm.value.fixedChargeDt_value;
    api_recurringUpd.rec_duration_fixed = this.RecurringForm.value.fixedChargeDuration;
    api_recurringUpd.usage_charge_chk = this.CBV_UsageChargeDt;
    api_recurringUpd.usage_charge_dt = this.RecurringForm.value.usageChargeDt_value;
    api_recurringUpd.rec_duration_monthly = this.RecurringForm.value.usageChargeDuration;

    api_req.element_data = api_recurringUpd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#RecurringFormIdDI').modal('hide');

      if (response.status == true) {
        iziToast.success({
          message: "Recurring Details Updated Successfully",
          position: 'topRight'
        });
        this.getInvoice1({});
      } else {
        iziToast.warning({
          message: "Check Response",
          position: 'topRight'
        });
        this.getInvoice1({});

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        this.getInvoice1({});
        console.log("final error", error);
      };


  }


  setPreviousDue(id: any, Status_variable: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to change Previous Due status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {

        // console.log("id", id)
        // var status;
        // if (Status_variable == 1) {
        //   Status_variable = 0;
        // } else {
        //   Status_variable = 1;
        // }
        Status_variable = !Status_variable;
        let api_req: any = new Object();
        let api_reqPreviousDue: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/previous_due_set_details";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqPreviousDue.action = "previous_due_set_details";
        api_reqPreviousDue.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqPreviousDue.billId = id;
        api_reqPreviousDue.previous_due_state = Status_variable;
        api_req.element_data = api_reqPreviousDue;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {


            iziToast.success({
              message: "Previous Due Set State changed Successfully",
              position: 'topRight'
            });
            this.getInvoice1({});
          } else {
            iziToast.warning({
              message: "Previous Due Set State not changed. Please try again",
              position: 'topRight'
            });
            this.getInvoice1({});
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
    })


  }
  InvoiceRevenueEdit(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.billId_invoiceRevenue = id;
    let api_req: any = new Object();
    let api_reqInvRe: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/revenue_details";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqInvRe.action = "revenue_details";
    api_reqInvRe.user_id = localStorage.getItem('erp_c4c_user_id');
    api_reqInvRe.billId = id;
    api_req.element_data = api_reqInvRe;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response)
      if (response.status == true) {
        // alert(response.bill_details[0].revenue_type_id)
        this.RevenuebillDetails = response.bill_details;
        // this.revenueTypeList = response.revenue_list;

        this.revenueChildListDetails = response.revenue_child_details;
        this.billChildid_revenueChildListDetails = response.revenue_child_details[0].billChildid;
        this.RevenueDetails1Form.patchValue({
          'revenue': response.bill_details[0].revenue_type_id,
          // 'Revenuestate': response.bill_details.revenue_individual_state,
        })
        const formArray = new FormArray([]);
        for (let index = 0; index < response.revenue_child_details.length; index++) {
          formArray.push(this.fb.group({
            "child_id": response.revenue_child_details[index].billChildid,
            "revenueAmount_child": response.revenue_child_details[index].revenue_amt,
            "revenueType_child": response.revenue_child_details[index].revenue_type_child_id,
            "revenueProductName_child": response.revenue_child_details[index].productName,
            "revenueProductDesc_child": response.revenue_child_details[index].productDesc,


          })



          );
        }
        console.log(formArray)
        this.revenueaddressForm.setControl('revenueaddresses', formArray);

      }
      else {
        iziToast.warning({
          message: "Check Response",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        console.log("network error", error);
        iziToast.error({
          message: "Network Error",
          position: 'topRight'
        });
      };

  }
  invoiceRevenueUpdate() {


    let api_req: any = new Object();
    let api_reqInvReUPD: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/revenue_details_update";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqInvReUPD.action = "revenue_details_update";
    api_reqInvReUPD.user_id = localStorage.getItem('erp_c4c_user_id');
    api_reqInvReUPD.billId = this.billId_invoiceRevenue;
    // api_reqInvReUPD.billChildid = this.billChildid_revenueChildListDetails;
    api_reqInvReUPD.revenue_type_id = this.RevenueDetails1Form.value.revenue;
    api_reqInvReUPD.revenue_individual_state = this.CBV_RevenueState;
    api_reqInvReUPD.values = this.revenueaddressForm.value.revenueaddresses;

    api_req.element_data = api_reqInvReUPD;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {

        iziToast.success({
          message: "Revenue Details Updated Successfully",
          position: 'topRight'
        });
        $('#InvInvoiceRevenueFormIdDI').modal("hide");


        this.getInvoice1({});
      }
      else {
        iziToast.warning({
          message: "Revenue Details not Updated Successfully",
          position: 'topRight'
        });
        $('#InvInvoiceRevenueFormIdDI').modal("hide");


        this.getInvoice1({});

      }
    }),
      (error: any) => {
        console.log("network error", error);
        iziToast.error({
          message: "Network Error",
          position: 'topRight'
        });
        $('#InvInvoiceRevenueFormIdDI').modal("hide");


        this.getInvoice1({});

      };

  }
  getNotes(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.billId_notes = id;
    let api_req: any = new Object();
    let api_reqNotes: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_notes_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqNotes.action = "invoice_notes_get";
    api_reqNotes.user_id = localStorage.getItem('erp_c4c_user_id');
    api_reqNotes.billId = id;
    api_req.element_data = api_reqNotes;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.NotesForm.patchValue({
          'note': response.bill_details[0].notes,
        })

      } else {
        iziToast.warning({
          message: "Check response",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        console.log("network error", error)
        iziToast.error({
          message: " Check response",
          position: 'topRight'
        });

      };
  }
  setNotes() {

    let api_req: any = new Object();
    let api_reqNoteUp: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_notes_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_reqNoteUp.user_id = localStorage.getItem('erp_c4c_user_id');
    api_reqNoteUp.billId = this.billId_notes;
    api_reqNoteUp.notes = this.NotesForm.value.note;
    api_req.element_data = api_reqNoteUp;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        iziToast.success({
          message: "Invoice Notes Updated Successfully",
          position: 'topRight'
        });
        $('#InvNotesFormIdDI').modal("hide");


        this.getInvoice1({});
      } else {

        iziToast.warning({
          message: "Invoice Notes not Updated. Check response",
          position: 'topRight'
        });
        $('#InvNotesFormIdDI').modal("hide");


        this.getInvoice1({});

      }
    }),
      (error: any) => {
        console.log("network error", error)
        iziToast.error({
          message: "Delivery Order not Updated. Check response",
          position: 'topRight'
        });
        $('#InvNotesFormIdDI').modal("hide");


        this.getInvoice1({});

      };




  }

  InvoicetoProforma(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to convert Invoice to Proforma?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {


        let api_req: any = new Object();
        let api_reqProf: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/invoice_to_proforma";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqProf.action = "invoice_to_proforma";
        api_reqProf.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqProf.billId = id;

        api_req.element_data = api_reqProf;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {


            iziToast.success({
              message: "Invoice to Proforma converted Successfully",
              position: 'topRight'
            });
            this.getInvoice1({});
          } else {
            iziToast.warning({
              message: "Invoice to Proforma not converted. Please try again",
              position: 'topRight'
            });
            this.getInvoice1({});
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
    })


  }
  DeliveryOrderEdit(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.billerId_deliveryOrder = id;
  }
  // DeliveryOrderUpdate() {
  //   this.spinner.show();
  //   let api_req: any = new Object();
  //   let api_reqDO: any = new Object();

  //   api_req.moduleType = "invoice";
  //   api_req.api_url = "invoice/invoice_to_delivery_order";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_reqDO.action = "invoice_to_delivery_order";
  //   api_reqDO.user_id = localStorage.getItem('erp_c4c_user_id');
  //   api_reqDO.billId = this.billerId_deliveryOrder;
  //   api_reqDO.warranty_type = this.DeliveryOrderForm.value.warranty;
  //   api_req.element_data = api_reqDO;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     if (response.status == true) {
  //       this.spinner.hide();

  //       iziToast.success({
  //         message: "Delivery Order Updated Successfully",
  //         position: 'topRight'
  //       });
  //       $('#InvDeliveryOrderFormIdDI').modal("hide");


  //       this.getInvoice1({});
  //     } else {
  //       iziToast.warning({
  //         message: "Delivery Order not Updated. Please try again",
  //         position: 'topRight'
  //       });
  //       $('#InvDeliveryOrderFormIdDI').modal("hide");
  //       this.getInvoice1({});
  //     }
  //   }),
  //     (error: any) => {
  //       iziToast.error({
  //         message: "Sorry, some server issue occur. Please contact admin",
  //         position: 'topRight'
  //       });
  //       console.log("final error", error);
  //     };
  // }
  DeliveryOrderUpdate() {
    Swal.fire({
      title: 'Are you sure to Change?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {


        let api_req: any = new Object();
        let api_reqDO: any = new Object();

        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/invoice_to_delivery_order";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqDO.action = "invoice_to_delivery_order";
        api_reqDO.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqDO.billId = this.billerId_deliveryOrder;
        api_reqDO.warranty_type = this.DeliveryOrderForm.value.warranty;
        api_req.element_data = api_reqDO;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "Delivery Order Updated Successfully",
              position: 'topRight'
            });
            $('#InvDeliveryOrderFormIdDI').modal("hide");


            this.getInvoice1({});

          } else {
            iziToast.warning({
              message: "Delivery Order not Updated. Please try again",
              position: 'topRight'
            });
            $('#InvDeliveryOrderFormIdDI').modal("hide");
            this.getInvoice1({});
          }
        }),
          (error: any) => {
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error)
          };
      }
    })


  }

  setInvoiceTypeNameEdit(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.spinner.show();
    this.InvoiceType_BillerID = id;

    let api_req: any = new Object();
    let api_invoiceTyp: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_type_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceTyp.action = "invoice_type_get";

    api_invoiceTyp.billId = id;
    api_invoiceTyp.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invoiceTyp;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.InvoiceTypeList = response.invoice_type_det;
        console.log("response.selected_invoice_type", response.selected_invoice_type)
        this.setInvoiceType.patchValue({
          'setInvoice': response.selected_invoice_type
        })



      } else {

        $('#invsetInvoiceTypeNameFormIdDI').modal("hide");
        iziToast.warning({
          message: "Invoice Type Details not displayed. Please try again",
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
  setInvoiceTypeNameUpdate() {


    this.spinner.show();
    let api_req: any = new Object();
    let api_invTypeUpdate: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_type_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invTypeUpdate.action = "invoice_type_update";
    api_invTypeUpdate.billId = this.InvoiceType_BillerID;
    api_invTypeUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_invTypeUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {


        iziToast.success({
          message: "Invoice Type Details Updated Successfully",
          position: 'topRight'

        });
        $('#invsetInvoiceTypeNameFormIdDI').modal("hide");
      } else {

        $('#invsetInvoiceTypeNameFormIdDI').modal("hide");
        iziToast.warning({
          message: "Invoice Type Details not Updated. Please try again",
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
  setInvoiceTypeClear() {
    this.setInvoiceType.reset();
  }
  // setLocaltoExport(id:any,export_state:any){

  //   let api_req:any=new Object();
  //   let api_reqLocEx:any=new Object();
  //   api_req.moduleType = "invoice";
  //   api_req.api_url = "invoice/local_to_export";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   api_reqLocEx.action = "local_to_export";
  //   api_reqLocEx.billId = id;
  //   api_reqLocEx.user_id = localStorage.getItem('erp_c4c_user_id');
  //   if(export_state==1){
  //     api_reqLocEx.export_state =2;
  //   }
  //   if(export_state==2){
  //     api_reqLocEx.export_state =3;
  //   }
  //   if(export_state==3){
  //     api_reqLocEx.export_state =1;
  //   }
  //   api_req.element_data = api_reqLocEx;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {

  //     if (response.status == true) {


  //       iziToast.success({
  //         message: "Local to Export status Updated Successfully",
  //         position: 'topRight'

  //       });

  //     } else {


  //       iziToast.warning({
  //         message: "Local to Export status not Updated. Please try again",
  //         position: 'topRight'
  //       });
  //     }
  //   }),
  //     (error: any) => {
  //       iziToast.error({
  //         message: "Sorry, some server issue occur. Please contact admin",
  //         position: 'topRight'
  //       });
  //       console.log("final error", error);
  //     };

  // }
  setLocaltoExport(id: any, export_state: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    Swal.fire({
      title: 'Are you sure to Change?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {
        this.getInvoice1({});
        let api_req: any = new Object();
        let api_reqLocEx: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/local_to_export";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqLocEx.action = "local_to_export";
        api_reqLocEx.billId = id;
        api_reqLocEx.user_id = localStorage.getItem('erp_c4c_user_id');
        if (export_state == 1) {
          api_reqLocEx.export_state = 2;
        }
        if (export_state == 2) {
          api_reqLocEx.export_state = 3;
        }
        if (export_state == 3) {
          api_reqLocEx.export_state = 1;
        }
        api_req.element_data = api_reqLocEx;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "Local to Export status Updated Successfully",
              position: 'topRight'

            });
            this.getInvoice1({});


          } else {
            iziToast.warning({
              message: "Local to Export status not Updated. Please try again",
              position: 'topRight'
            });
            this.getInvoice1({});
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  invoicetoQuotationEdit(id: any, i: any) {
    $("#ActionIdInvDup" + i).modal("hide");
    this.billId_InvoicetoQuotation = id;
    $("#InvInvoicetoQuotationFormIdDI").modal("show");
    // this.addNewQuotationPopUpForm.value.reset();
    let api_req: any = new Object();
    let add_newQuotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/create_popup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotation_req.action = "create_popup";
    add_newQuotation_req.user_id = this.user_ids;
    add_newQuotation_req.enquiry_from_id = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    add_newQuotation_req.quot_validity = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    add_newQuotation_req.quotationId = this.addNewQuotationPopUpForm.value.templateName_addPopUP;
    api_req.element_data = add_newQuotation_req;
    $("#InvInvoicetoQuotationFormIdDI").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#InvInvoicetoQuotationFormIdDI").removeAttr("disabled");
      console.log(response);

      console.log("pop up for add quotation", response);
      if (response != '') {
        this.enquiryFromList = response.enquiry_from;
        this.quotationValidityList = response.quot_validity;
        this.templateNameList = response.template_name_arr;
        console.log("EnquiryFormList", this.enquiryFromList)

        // $('#InvInvoicetoQuotationFormIdDI').modal('hide');
        //this.contactsList({});

      }

    });
  }

  invoicetoQuotationSave() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_invQuot: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_to_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invQuot.action = "invoice_to_quotation";
    api_invQuot.user_id = this.user_ids;
    api_invQuot.enquiry_from_id = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    api_invQuot.quot_validity = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    api_invQuot.quot_subject = this.addNewQuotationPopUpForm.value.enquirySubject_addPopUP;
    api_invQuot.billId = this.billId_InvoicetoQuotation;
    api_invQuot.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invQuot;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        iziToast.success({
          message: "Invoice to Quotation Conversion Successful",
          position: 'topRight'
        });
        $('#InvInvoicetoQuotationFormIdDI').modal('hide');


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

  InvoiceTypeDetailsUpdate() {

  }
  addNotes() {


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



    this.spinner.show();
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

        this.searchResult = response.reseller_list;


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

  get_WFA_ResellerCommission(id: any, i: any) {

    this.billId_ResellerCommissionId = id;
    $("#ActionIdInvDup" + i).modal("hide");
    // $("body").removeClass("modal-open");

    this.withoutFormArrayResellerCommissionForm.reset();


    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "get_reseller_commission_details";
    api_resCommEdit.billId = this.billId_ResellerCommissionId;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();

      this.commissionGrossAmount = response.grossAmount;

      if (response != '') {

        console.log("response-check", response.reseller_comm[0].commission_type);

        this.CommissionType = response.reseller_comm[0].commission_type;
        this.resellerCommissionList = response.reseller_comm;
        this.commissionGrossAmount = response.grossAmount;
        this.reseller_comm_id = response.reseller_comm[0].reseller_comm_id;

        this.withoutFormArrayResellerCommissionForm.patchValue({
          'ResellerName_WFA': response.reseller_comm[0].reseller_name,
          'CommissionType_WFA': response.reseller_comm[0].commission_type,
          'CommissionValue_WFA': response.reseller_comm[0].commission_value,
          'CommissionAmount_WFA': response.reseller_comm[0].commission_amt,
          'PdfShow_WFA': response.reseller_comm[0].pdf_show,

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
  getResellerCommission(id: any) {
    this.billId_ResellerCommissionId = id;
    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "get_reseller_commission_details";
    api_resCommEdit.billId = id;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        console.log("response-check", response.reseller_comm[0].commission_type);

        this.CommissionType = response.reseller_comm[0].commission_type;
        this.resellerCommissionList = response.reseller_comm;



        // if(this.resellerCommissionList!=undefined&&this.resellerCommissionList!=null&&this.resellerCommissionList!='undefined'&&this.resellerCommissionList!='null'&&this.resellerCommissionList!=''){
        // this.resellerCommissionList.forEach((element: any) => {
        //   if(element.commission_type==id){
        //     // $("#CommissionType_"+)
        //     return true;
        //   }else{
        //     return false;
        //   }
        //   console.log(element.commission_type)
        // });

        for (var i = 0; i <= this.resellerCommissionList.length - 1; i++) {
          for (var k = 0; k <= this.resellercommissiontype.length - 1; k++) {
            if (this.resellerCommissionList[i].commission_type == this.resellercommissiontype[k].id) {
              console.log("#CommissionType_" + i + "_" + k)
              console.log(this.resellercommissiontype[k].id)
              $("#CommissionType_" + i + "_" + k).val(this.resellercommissiontype[k].id);
            }
          }
          // }
        }
        // this.addressForm.patchValue({


        //   'ResellerName': response.reseller_comm[0].reseller_name,
        //   'CommissionType': response.reseller_comm[0].commission_type,
        //   'CommissionValue': response.reseller_comm[0].commission_value,
        //   'CommissionAmount': response.reseller_comm[0].commission_amt,
        //   'PdfShow': response.reseller_comm[0].pdf_show,



        // });
        console.log(this.addressControls.controls)
        const formArray = new FormArray([]);
        for (let index = 0; index < response.reseller_comm.length; index++) {
          this.radioSelected = response.reseller_comm[index].commission_value;
          formArray.push(this.fb.group({
            "ResellerName": response.reseller_comm[index].reseller_name,
            "CommissionType": response.reseller_comm[index].commission_type,
            // "CommissionType": response.reseller_comm[index].commission_type == 1 ? true : false,
            "CommissionValue": response.reseller_comm[index].commission_value,
            "CommissionAmount": response.reseller_comm[index].commission_amt,
            "PdfShow": response.reseller_comm[index].pdf_show == 1 ? true : false,



          })



          );
          for (var k = 0; k <= this.resellercommissiontype[index].length; k++) {
            $("#CommissionType_" + k).val(response.reseller_comm[index].commission_type)
          }


        }



        console.log(formArray)
        this.addressForm.setControl('addresses', formArray);


        for (let index = 0; index < response.reseller_comm.length; index++) {

          if (response.reseller_comm[index].pdf_show == 1) {

            $('#pdfshow' + [index]).prop('checked', true);



          }
        }




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
  set_WFA_ResellerCommission() {
    this.commissionAmount_WFA = $('#CommissionAmount_WFA_ID').val();

    this.spinner.show();
    let api_req: any = new Object();
    let api_resCommSave: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommSave.action = "update_reseller_commission_details";


    api_resCommSave.billId = this.billId_ResellerCommissionId;
    api_resCommSave.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.ResellerName_Customer == undefined || this.ResellerName_Customer == 'undefined' || this.ResellerName_Customer == '') {
      iziToast.error({
        message: "Reseller Name is not given",
        position: 'topRight'
      });
    } else {
      api_resCommSave.reseller_name = this.ResellerName_Customer;
    }

    api_resCommSave.reseller_id = this.ResellerId_Customer;
    if (this.commissionType_value == undefined || this.commissionType_value == 'undefined' || this.commissionType_value == '') {
      iziToast.error({
        message: "Customer Type is not given",
        position: 'topRight'
      });

    } else {
      api_resCommSave.commission_type = this.commissionType_value;
    }

    api_resCommSave.commission_value = this.withoutFormArrayResellerCommissionForm.value.CommissionValue_WFA;
    api_resCommSave.commission_amt = this.commissionAmount_WFA;
    api_resCommSave.reseller_comm_id = this.reseller_comm_id;

    api_resCommSave.pdf_show = this.withoutFormArrayResellerCommissionForm.value.PdfShow_WFA;


    api_req.element_data = api_resCommSave;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        iziToast.success({
          message: "Reseller Commission Details updated Successful",
          position: 'topRight'
        });
        $('#invwithoutFormArrayResellerCommissionFormIdDI').modal('hide');


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
        $('#invwithoutFormArrayResellerCommissionFormIdDI').modal('hide');
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        $('#invwithoutFormArrayResellerCommissionFormIdDI').modal('hide');
        console.log("final error", error);
      };


  }
  setResellerCommission() {


    this.spinner.show();
    let api_req: any = new Object();
    let api_resCommSave: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommSave.action = "update_reseller_commission_details";


    api_resCommSave.billId = this.billId_ResellerCommissionId;
    api_resCommSave.user_id = localStorage.getItem('erp_c4c_user_id');

    var addr = this.addressForm.value.addresses;

    api_resCommSave.values = addr;
    api_req.element_data = api_resCommSave;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        iziToast.success({
          message: "Reseller Commission Details updated Successful",
          position: 'topRight'
        });
        $('#InvResellerCommissionFormIdDI').modal('hide');


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
        $('#InvResellerCommissionFormIdDI').modal('hide');
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        $('#InvResellerCommissionFormIdDI').modal('hide');
        console.log("final error", error);
      };


  }
  setActualCostSave() {

    console.log(this.actualCost_ProductList);
    for (let k = 0, i = 1; k < this.actualCost_ProductList.length; k++, i++) {
      this.actualCost_ProductList[k].act_diff_amt = $('#act_diff_amt_' + i).val();
      this.actualCost_ProductList[k].actual_cost = $('#actual_cost_' + i).val();
      this.actualCost_ProductList[k].actual_net_tot = $('#actual_net_tot_' + i).val();
      this.actualCost_ProductList[k].actual_percentage = $('#actual_percentage_' + i).val();
      this.actualCost_ProductList[k].invisiable_state = $('#invisiable_state_' + i).val();
      this.actualCost_ProductList[k].qty = $('#product_qty_' + i).val();

      this.actualCost_ProductList[k].price = $('#product_rate_' + i).val();
      this.actualCost_ProductList[k].productDesc = $('#AP_productDescription_' + i).val();
      this.actualCost_ProductList[k].productName = $('#AP_productName_' + i).val();

      this.actualCost_ProductList[k].quotationChildId = $('#quotationChildId_' + i).val();
      if ($('#invisiable_state_' + i).val() == 0) {
        this.actualCost_ProductList[k].totat_amt = $('#product_rate_' + i).val();
      } else {
        this.actualCost_ProductList[k].totat_amt = $('#price_' + i).val();
      }

      this.actualCost_ProductList[k].unit = $('#product_unit' + i).val();

    }
    console.log(this.actualCost_ProductList);
    console.log("form array group", this.setActualCost_FormGroup.value.addresses_actualCost)
    let api_req: any = new Object();
    let actualCostUpdate_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_actualcost_quotation_value";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    actualCostUpdate_req.action = "update_actualcost_invoice_value";
    actualCostUpdate_req.user_id = this.user_ids;
    actualCostUpdate_req.quotationId = this.actualCost_quotationID;
    actualCostUpdate_req.values = this.actualCost_ProductList;
    api_req.element_data = actualCostUpdate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);


      console.log("set actual cost response", response);
      if (response.status == true) {
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

        $("#invsetActualCostIdDI").modal("hide");


      }

    });

  }
  get_actual_total() {
    var bill_cnt = $('#quotationChildId_count').val();
    console.log("bill_cnt", bill_cnt)
    let actual_cost, product_qty, product_rate, actual_net_tot, actual_percentage;
    let product_net_amt, act_diff_amt;
    let actual_cost_tot = 0;
    let actual_cost_net_tot = 0;
    let act_diff_amt_tot = 0;

    for (let i = 1; i < bill_cnt; i++) {
      if ($('#invisiable_state_' + i).val() == 0) {
        console.log('test');
        actual_cost = $('#actual_cost_' + i).val();
        product_qty = $('#product_qty_' + i).val();
        product_rate = $('#product_rate_' + i).val();
        product_net_amt = $('#product_net_amt_' + i).val();
        actual_percentage = $('#actual_percentage_' + i).val();
        console.log("product_rate", product_rate);
        console.log("actual_cost", actual_cost);
        console.log("actual_percentage", actual_percentage);
        console.log("product_qty", product_qty);
        console.log("product_net_amt", product_net_amt);
        if (actual_cost == '') {
          actual_cost = 0;
        }
        // break
        if (actual_percentage > 0) {
          actual_cost = (parseFloat(product_rate) * parseFloat(actual_percentage) / 100).toFixed(2);
          $('#actual_cost_' + i).val(actual_cost);
        }
        actual_net_tot = (parseFloat(product_qty) * parseFloat(actual_cost)).toFixed(2);
        console.log("actual_net_tot", actual_net_tot);
        act_diff_amt = (parseFloat(product_net_amt) - parseFloat(actual_net_tot)).toFixed(2);
        console.log("act_diff_amt", act_diff_amt);
        $('#act_diff_amt_' + i).val(act_diff_amt);
        $('#actual_net_tot_' + i).val(actual_net_tot);
        actual_cost_tot += parseFloat(actual_cost);
        actual_cost_net_tot += parseFloat(actual_net_tot);
        act_diff_amt_tot += parseFloat(act_diff_amt);
      } else {
        act_diff_amt_tot = act_diff_amt_tot - $('#price_' + i).val();
        $('#act_diff_amt_' + i).val(-$('#price_' + i).val());
      }
    }


    $('#actual_cost_tot').text(actual_cost_tot);
    $('#actual_net_tot').text(actual_cost_net_tot);
    $('#act_diff_amt_tot').text(act_diff_amt_tot);
  }

  clearFile() {
    $('#file').val();
    $('#file').val('');

  }


}



