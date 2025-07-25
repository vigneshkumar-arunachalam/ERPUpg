import { Component, Input, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @Input() invoiceList: any[] = [];
  @Input() selectedPages: any[] = [];
  @Input() searchDataGlobal: any = '';
  @Input() globalSearchStatus: boolean = false;

  //list
  PI_list: any = [];
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
  setResellerRecurringForm: FormGroup;
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

  reccuringDuration: string[];
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
  resellerEnaChk: any;
  // searchResult: any;
  ResellerName_Customer: any;
  resellerCommissionList: any;
  billId_ResellerCommissionId: any;
  CommissionType: any;
  radioSelected: any;
  radioSel: any;
  //reseller commission details-without form array

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
  selected_billerId: any = [];

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
  PaymentProcessDatee: any;
  pipe: any;
  myFormattedDate: any;
  myFormattedDate1: any;
  paymentNotes: any;
  PP_paymentMethod: any;
  creditResponse: any;
  PP_PaymentProcessID: any;
  paymentDetails_paymentLength: any;
  testing = false;
  Global_search_filter = false;
  invoicePermissionList_suspend: any;
  search_values: any;
  search_values1 = 0;
  InvSearch_off_set: any;
  InvSearch_Search_BillerId: any;
  InvSearch_limit_val: any;
  InvSearch_search_txt: any;
  InvSearch_years: any;
  InvSearch_invoiceType: any;
  InvSearch_recurring_only: any;
  InvSearch_dont_select_did_invoice: any;
  InvSearch_revenue_typewise_show: any;
  InvSearch_revenue_typewise_showID: any;
  searchFlag: any;
  upd_searchName: any;
  upd_searchFlag: any;
  // reseller commission form
  resellerCommissionForm: any;
  public addresses_rc: FormArray;
  commlistall1: any = [];

  resellercommissiontype1: any = [];
  resellercommissiontype2: any;
  CommissionType1: any = [];
  CommissionType55: any = [];
  data_value: any;
  addr: any = []
  // new reseller commission details
  inv_resellerCommissionForm: FormGroup;
  changeCreditNoteValue: any;
  changePrepaidNoteValue: any;
  credit_note_id: any = 0;
  prepaid_id: any = 0;
  owingAmt: any;
  creditShowFlag: boolean = false;
  prepaidShowFlag: boolean = false;
  flg: boolean = false;
  years_id: any;
  yearsID: any;
  getSearch: boolean = false;
  showHi: boolean = false;
  SelectType_finance: any;
  SelectType_company: any;
  CBV_setResellerRecurring: any;
  recurringResller_BillerID: any;
  recuringStatus1: any;
  recurring_State_value1: any;
  recunxt: any;
  sstTaxForm: FormGroup;
  sstCheckbox: boolean = false;
  getsstTaxEditID: any;
  // e invoice
  eInvoiceForm: FormGroup;
  eInvoiceValue: boolean = false;
  geteInvoiceID: any;

  constructor(private cdr: ChangeDetectorRef, private serverService: ServerService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
    this.revenueaddressForm = this.fb.group({
      revenueaddresses: this.fb.array([this.createrevenueAddress()])
    });
    this.resellerCommissionForm = this.fb.group({
      addresses_rc: this.fb.array([this.createAddress_rc()])
    });
    this.serverService.invoice_search1.subscribe((val: any) => {
      // console.log(val)
      // alert(val.type)
      // if (val.type == "search girlfriend") {
      //   this.search_values1 == 1;
      //   console.log(this.search_values1)
      //   this.InvSearch_Search_BillerId = val.InvSearch_Search_BillerId;
      //     this.InvSearch_off_set = val.InvSearch_off_set;
      //     this.InvSearch_limit_val = val.InvSearch_limit_val;
      //     this.InvSearch_search_txt = val.InvSearch_search_txt;
      //     this.InvSearch_years = val.InvSearch_years;
      //     this.InvSearch_invoiceType = val.InvSearch_invoiceType;
      //     this.InvSearch_recurring_only = val.InvSearch_recurring_only;
      //     this.InvSearch_dont_select_did_invoice = val.InvSearch_dont_select_did_invoice;
      //     this.InvSearch_revenue_typewise_show = val.InvSearch_revenue_typewise_show;
      //     this.InvSearch_revenue_typewise_showID = val.InvSearch_revenue_typewise_showID;

      // }
    });
    // this.serverService.global_search_invoice.subscribe((val: any) => {
    //   console.log("before parse-global_search_invoice", val)

    //   if(typeof val === 'object'){
    //     k=JSON.stringify(val);
    //   }
    //   var k = JSON.parse(val);
    //   console.log("after parse-global_search_invoice", k)
    //   this.PI_list = k;
    //   if (k != '') {
    //     this.Global_search_filter = true;
    //   } else {
    //     this.Global_search_filter = false;
    //   }

    // });
    this.serverService.global_search_invoice.subscribe((val: any) => {
      // console.log("before parse-global_search_invoice", val);
      try {
        let jsonString: string;
        if (typeof val === 'object') {
          jsonString = JSON.stringify(val);
          //  console.log("stringify", k);
        } else if (typeof val === 'string') {
          jsonString = val;
          // console.log("string", k);
        } else {
          //  console.error("Invalid type received:", typeof val);
          return; // Exit early if the type is not recognized
        }
        var k = JSON.parse(jsonString);
        // console.log("after parse-global_search_invoice", k);
        if (!k) {
          this.PI_list = k;
        }
        // if (k != '') {
        //   this.Global_search_filter = true;
        // } else {
        //   this.Global_search_filter = false;
        // }
      } catch (error) {
        //   console.error("Error parsing JSON:", error);
        // Handle parsing error if needed
      }
    });
    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
  }

  keywordResellerName = 'customerName';
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    this.searchResult_CustomerName = '';
    this.PI_list = this.invoiceList;
    const searchParams = this.serverService.getSearchParams();
    if (searchParams && searchParams.companyName && this.selectedPages.includes('Invoice')) {
      this.searchResult_CustomerName = searchParams.companyName;

    } else {
      this.searchResult_CustomerName = '';
    }
    console.log("this.searchResultTest-from global search-invoice", this.searchResult_CustomerName);
    this.Select_To_Type_radiobox_Value = 'finance';

    this.commissionType_value = 4;
    // setTimeout(() => {
    //   this.commissionValueAutoFill({})
    // }, 2000);
    this.route.queryParams
      .subscribe(params => {
        // console.log("params output value", params);


        this.upd_searchName = params['upd_search_name'];


        this.upd_searchFlag = params['upd_searchFlag'];

        if (this.upd_searchFlag == 1) {

          this.searchResult_CustomerName = this.upd_searchName;
          this.search_values1 == 1
          this.getInvoice1({});
        }



      }
      );
    if (this.search_values1 == 1) {
      // alert("inside");
      //  this.getInvoice({});

    } else if (this.search_values1 == 0) {
      this.getInvoice1({});
    } else {
      // alert("outside");
      //   this.getInvoice1({});
    }
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.yearsAPI();
    this.recurringState = [{ "id": 1, "name": "Active" }, { "id": 0, "name": "Inactive" }];
    this.resellercommissiontype = [{ "id": 1, "name": "Fixed", "selected": "false" }, { "id": 2, "name": "Percentage", "selected": "false" }, { "id": 4, "name": "None", "selected": "true" }];
    this.warrantyList = [{ "id": 1, "name": "No Warranty" }, { "id": 2, "name": "One Year Warranty" }, { "id": 3, "name": "Two Year Warranty" }]
    // this.yearsList = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023","2024"]
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
      'date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'paymenttype': new FormControl(null),
      'paymenttype1': new FormControl(null),
      'paymenttype2': new FormControl(null),
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
    this.eInvoiceForm = new FormGroup({
      'eInvoice': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),

      'CBF_PDFLink': new FormControl(null),
      'CBF_TemplateSelection': new FormControl(null),
      'CBF_PaymentLink': new FormControl(null),


    });
    // this.setResellerRecurringForm = new FormGroup({
    //   'date': new FormControl(null),
    //   'recurring_state': new FormControl(null),
    //   'recurringDtCBX': new FormControl(null),
    //   'recurringDate': new FormControl(null),
    //   'recurringDuration': new FormControl(null),


    // });

    this.RecurringForm = new FormGroup({
      'date': new FormControl(null),
      'recurring_state': new FormControl(null),
      'fixedChargeDtCBX': new FormControl(null),
      'usageChargeDuration': new FormControl(null),
      'fixedChargeDuration': new FormControl(null),
      'fixedChargeDt_value': new FormControl(null),
      'usageChargeDtCBX': new FormControl(null),
      'usageChargeDt_value': new FormControl(null),


      'reseller_name': new FormControl(null),
      'commission_value': new FormControl(null),
      'commission_amt': new FormControl(null),
      'reseller_comm_id': new FormControl(null),

      'commIndex': new FormControl(null),
      'reseller_id': new FormControl(null),
      'billId': new FormControl(null),
      'grossAmount': new FormControl(null),
      'cbk_RCEnable': new FormControl(null),


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
    this.inv_resellerCommissionForm = new FormGroup({
      'reseller_name': new FormControl(null),
      'billChildid1': new FormControl(null),
      'commission_value': new FormControl(null),
      'commission_amt': new FormControl(null),
      'reseller_comm_id': new FormControl(null),
      'commIndex': new FormControl(null),
      'reseller_id': new FormControl(null),
      'billId': new FormControl(null),
      'grossAmount': new FormControl(null),
      'pdf_show': new FormControl(null),
      // 'rs_fromDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      // 'to_fromDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'date': new FormControl(null),
      'recurring_state': new FormControl(null),
      'recurringDtCBX': new FormControl(null),
      'recurringDate': new FormControl(null),
      'recurringDuration': new FormControl(null),
      'nextRecDt': new FormControl(null),
    });


    this.addNewQuotationPopUpForm = new FormGroup({
      'enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'enquirySubject_addPopUP': new FormControl(null, [Validators.required]),
      'quotationValidity_addPopUP': new FormControl(null, [Validators.required]),
      'version_enqForm_addPopUP': new FormControl(null, [Validators.required]),
      'templateName_addPopUP': new FormControl(null),
    });
    this.sstTaxForm = new FormGroup({
      'sstTax': new FormControl(null),
    });
    var date = new Date();
    this.transformDate = this.datePipe.transform(date, 'MM/dd/yyyy');



    // $('#dateee').val(this.transformDate);

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
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['invoiceList'] && changes['invoiceList'].currentValue && this.selectedPages.includes('Invoice')) {
  //     this.PI_list = changes['invoiceList'].currentValue;
  //   }
  // }
  ngOnChanges1(changes: SimpleChanges): void {
    const isCustomerNew = this.selectedPages.includes('Invoice');

    if (
      isCustomerNew &&
      changes['invoiceList'] &&
      changes['invoiceList'].currentValue &&
      this.globalSearchStatus // ✅ only assign if searchData is not empty
    ) {
      this.PI_list = changes['invoiceList'].currentValue;
    }

    // Optional: clear data if modal is closed and searchData is cleared
    if (

      isCustomerNew &&
      changes['searchDataGlobal'] &&
      changes['searchDataGlobal'].currentValue === ''
    ) {
     // alert("have to come");
      this.PI_list = [];
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    const isInvoicePage = this.selectedPages.includes('Invoice');

    if (
      isInvoicePage &&
      changes['invoiceList'] &&
      changes['invoiceList'].currentValue &&
      this.globalSearchStatus
    ) {
      this.PI_list = changes['invoiceList'].currentValue;
    }

    if (
      isInvoicePage &&
      changes['searchDataGlobal'] &&
      changes['searchDataGlobal'].currentValue === ''
    ) {
     // alert('have to come');
      this.PI_list = [];
      console.log("last PI Value", this.PI_list);
      this.cdr.detectChanges(); // ✅ Force UI to update
      this.searchResult_CustomerID = '';
      this.searchResult_CustomerName = '';
      this.getInvoice1({});
        this.getInvoice1({});
    }
  }




  get addressControls_rc() {
    return this.resellerCommissionForm.get('addresses_rc') as FormArray
  }

  addAddress_rc(): void {
    this.addresses_rc = this.resellerCommissionForm.get('addresses_rc') as FormArray;
    this.addresses_rc.push(this.createAddress_rc());
  }


  removeAddress_rc(i: number) {


    var pd_billchild_id = $('#billChildid1' + i).val();


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

        this.addresses_rc.removeAt(i);

        let api_req: any = new Object();
        let api_ProdAutoFill_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/deleteResellerComList";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ProdAutoFill_req.action = "deleteResellerComList";
        api_ProdAutoFill_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ProdAutoFill_req.reseller_comm_id = pd_billchild_id;
        api_req.element_data = api_ProdAutoFill_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          //  console.log("response", response);
          this.get_WFA_ResellerCommission({}, {});

        });



      }
    })

  }
  createAddress_rc(): FormGroup {

    return this.fb.group({
      billChildid1: '',
      commIndex: '',
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

        //   console.log(this.resellerCommissionList);
        if (this.resellerCommissionList.commission_type == this.resellercommissiontype.id) {
          $("#CommissionType_" + i + "_" + k).val(this.resellerCommissionList.commission_type);
        }
      }
    }
    // }

  }
  resellerChange(event: any) {
    // console.log("event.target.checked", event.target.checked);
    // this.resellerEnaChk = event.target.checked;
    if (event.target.checked == true) {
      this.resellerEnaChk = 1;
    } else {
      this.resellerEnaChk = 0;
    }
    // this.resellerEnaChk = !this.resellerEnaChk
  }

  onItemChange() {
    this.radioSel = this.resellercommissiontype.find((Item: { id: any; }) => Item.id === this.radioSelected);
  }
  radio_InvoiceSendingInput(event: any) {
    this.InvoiceSendingValue = event.target.value;
    //  console.log(this.InvoiceSendingValue)
  }
  radio_recurring(event: any) {
    this.recurring_State_value = event.target.id;
    //  console.log(this.recurring_State_value)

  }
  radio_commissionType(event: any) {

    this.commissionType_value = event.target.value;

    // console.log("this.commissionType_value", this.commissionType_value);

    if (this.commissionType_value == 1) {

      var commvalue = $('#CommissionValue_WFA_ID1_').val();
      // console.log("commvalue", commvalue)
      $('#CommissionAmount1_WFA_ID1_').val(commvalue);
      // console.log("$('#CommissionAmount1_WFA_ID1_' + index).val(commvalue)", $('#CommissionAmount1_WFA_ID1_').val())

    }
    if (this.commissionType_value == 2) {
      var commvalue = $('#CommissionValue_WFA_ID1_').val();
      var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(this.commissionGrossAmount) / 100).toFixed(2);

      $('#CommissionAmount1_WFA_ID1_').val(commvalue_Percentage);
      this.commissionAmount_WFA = $('#CommissionAmount1_WFA_ID1_').val();

    }
    if (this.commissionType_value == 4) {
      $('#CommissionValue_WFA_ID1_').val(0);
      $('#CommissionAmount1_WFA_ID1_').val(0);

    }

  }
  commissionValueAutoFill() {

    // if (this.commissionType_value == 1) {
    if (this.commissionType_value == 1) {

      var commvalue = $('#CommissionValue_WFA_ID1_').val();
      // console.log("commvalue", commvalue)
      $('#CommissionAmount1_WFA_ID1_').val(commvalue);

    }
    if (this.commissionType_value == 2) {
      var com1 = this.RecurringForm.value.commission_value;

      // alert(this.commissionType_value)
      var commvalue = $('#CommissionValue_WFA_ID1_').val();
      // alert(commvalue)


      // var k = this.commlistall1[0].grossAmount;

      var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(this.commissionGrossAmount) / 100).toFixed(2);
      // alert(commvalue_Percentage)
      //  console.log("this.commvalue_Percentage", commvalue_Percentage);
      $('#CommissionAmount1_WFA_ID1_').val(commvalue_Percentage);

    }
    if (this.commissionType_value == 4) {
      var commvalue_Percentage = '';
      // console.log("this.commvalue_Percentage", commvalue_Percentage);
      $('#CommissionAmount1_WFA_ID1_').val(commvalue_Percentage);

    }

  }
  radio_commissionType_formArray(event: any, index: any) {

    this.commissionType_value = event.target.value;
    const indexToUpdate = index; // Change this index according to your needs
    // console.log(indexToUpdate);
    // console.log("this.commissionType_value", this.commissionType_value);
    this.resellerCommissionForm.value.addresses_rc[indexToUpdate].commission_type = this.commissionType_value;
    this.addr = this.resellerCommissionForm.value.addresses_rc;
    //  console.log("this.commissionType_value", this.addr);
    for (let i = 0; i <= index; i++) {
      // console.log("this.commissionType_value", this.commissionType_value)
      if (this.commissionType_value == 1) {
        //  console.log("index", index)
        var commvalue = $('#CommissionValue_WFA_ID1_' + index).val();
        //  console.log("commvalue", commvalue)
        $('#CommissionAmount1_WFA_ID1_' + index).val(commvalue);
        //  console.log("$('#CommissionAmount1_WFA_ID1_' + index).val(commvalue)", $('#CommissionAmount1_WFA_ID1_' + index).val())
        this.resellerCommissionForm.value.addresses_rc[index].commission_amt = commvalue;
        //  console.log(this.resellerCommissionForm.value.addresses_rc[index].commvalue)
      }
      if (this.commissionType_value == 2) {
        var commvalue = $('#CommissionValue_WFA_ID1_' + index).val();
        var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(this.commissionGrossAmount) / 100).toFixed(2);

        $('#CommissionAmount1_WFA_ID1_' + index).val(commvalue_Percentage);
        this.commissionAmount_WFA = $('#CommissionAmount1_WFA_ID1_' + index).val();
        this.resellerCommissionForm.value.addresses_rc[index].commission_amt = commvalue_Percentage;
        //  console.log(this.resellerCommissionForm.value.addresses_rc[index].commission_amt)
      }
      if (this.commissionType_value == 4) {
        $('#CommissionValue_WFA_ID1_' + index).val('');
        $('#CommissionAmount1_WFA_ID1_' + index).val('');

      }
    }

    //  console.log($('#CommissionValue_WFA_ID1_' + index).val())

  }
  commissionValueAutoFill_formArray(h: any) {
    //  console.log(this.commlistall1)
    for (let i = 0; i <= this.commlistall1.length; i++) {
      // console.log(i)
      // console.log(h)
      // console.log("commlistall1[i].commission_typ", this.commlistall1[i].commission_type)
      // if (this.commissionType_value == 1) {
      if (this.commlistall1[i].commission_type == 1) {
        // console.log("index-autofill", h)
        var commvalue = $('#CommissionValue_WFA_ID1_' + h).val();
        // console.log("commvalue", commvalue)
        $('#CommissionAmount1_WFA_ID1_' + h).val(commvalue);
        // console.log("$('#CommissionAmount1_WFA_ID1_' + index).val(commvalue)", $('#CommissionAmount1_WFA_ID1_' + h).val())
        this.resellerCommissionForm.value.addresses_rc[h].commission_amt = commvalue;
        //  console.log(this.resellerCommissionForm.value.addresses_rc[h].commvalue)
      }
      if (this.commlistall1[i].commission_type == 2) {
        var com1 = this.resellerCommissionForm.value.commission_value;

        // alert(this.commissionType_value)
        var commvalue = $('#CommissionValue_WFA_ID1_' + h).val();
        // alert(commvalue)


        var k = this.commlistall1[h].grossAmount;

        var commvalue_Percentage = (parseFloat(commvalue) * parseFloat(k) / 100).toFixed(2);
        // alert(commvalue_Percentage)
        //  console.log("this.commvalue_Percentage", commvalue_Percentage);
        $('#CommissionAmount1_WFA_ID1_' + h).val(commvalue_Percentage);
        this.resellerCommissionForm.value.addresses_rc[h].commission_amt = commvalue_Percentage;
        // console.log(this.resellerCommissionForm.value.addresses_rc[h].commission_amt)
      }
      if (this.commlistall1[i].commission_type == 4) {




        var commvalue_Percentage = '';

        // console.log("this.commvalue_Percentage", commvalue_Percentage);
        $('#CommissionAmount1_WFA_ID1_' + h).val(commvalue_Percentage);
        this.resellerCommissionForm.value.addresses_rc[h].commission_amt = commvalue_Percentage;
        //  console.log(this.resellerCommissionForm.value.addresses_rc[h].commission_amt)
      }

    }

    // console.log($("#CommissionAmount1_WFA_ID1_0").val())

  }

  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    //  console.log(this.Select_To_Type_radiobox_Value);


    if (this.Select_To_Type_radiobox_Value == 'finance') {
      this.emailForm.patchValue({
        'email_to': this.SelectType_finance,
      })
    } else {
      this.emailForm.patchValue({
        'email_to': this.SelectType_company,
      })
    }
  }
  CBF_PDFLink(event: any) {
    this.CBV_PDFLink = event.target.checked;
    // console.log(this.CBV_PDFLink);
  }
  CBF_TemplateSelection(event: any) {
    this.CBV_TemplateSelection = event.target.checked;
    //  console.log(this.CBV_TemplateSelection);
  }
  CBF_PaymentLink(event: any) {
    this.CBV_PaymentLink = event.target.checked;
    //  console.log(this.CBV_PaymentLink);

  }
  CBF_FixedChargeDtFn(event: any) {
    this.CBV_FixedChargeDt = event.target.checked;
    //  console.log(this.CBV_FixedChargeDt);

  }
  CBF_UsageChargeDtFn(event: any) {
    this.CBV_UsageChargeDt = event.target.checked;
    //  console.log(this.CBV_UsageChargeDt);

  }
  CBF_RevenueStateFn(event: any) {
    this.CBV_RevenueState = event.target.checked;
    // console.log(this.CBV_RevenueState)

  }
  CBF_PdfShow(event: any) {
    this.CBV_PdfShow = event.target.checked;

  }
  recurring_onlyCHK(event: any) {
    this.CBV_recurring_only = event.target.checked;

  }
  CBF_setResellerRecurringDtFn(event: any) {
    this.CBV_setResellerRecurring = event.target.checked;

  }
  dont_select_did_invoiceCHK(event: any) {
    this.CBV_dont_select_did_invoice = event.target.checked;

  }
  RevenueTypeWiseShowCHK(event: any) {
    this.CBV_RevenueTypeWiseShow = event.target.checked;
    //  console.log(" this.CBV_RevenueTypeWiseShow", this.CBV_RevenueTypeWiseShow)
  }
  handleChange_RevenueTypeWiseShow(event: any) {
    this.revenueTypeWiseDropDownValue = event.target.value;
    // console.log(" this.revenueTypeWiseDropDownValue", this.revenueTypeWiseDropDownValue)

  }
  handleChange_eInvoice(event: any) {
    this.eInvoiceValue = event.target.checked;
    console.log(" this.revenueTypeWiseDropDownValue", this.eInvoiceValue)

  }
  clearSelection(event: any) {
    // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName)
  }
  selectEventCustomer(item: any) {
    // console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

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

        //   console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.customer_names;
        //  console.log("vignesh-advanced search result", this.searchResult);
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
    // console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    // console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      if (!this.edit_array_SearchBiller_Checkbox) {
        this.edit_array_SearchBiller_Checkbox = [];
      }


      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      // console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_SearchBiller_Checkbox)) {
        this.edit_array_SearchBiller_Checkbox = [];
      }
      // const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data);
      const index = this.edit_array_SearchBiller_Checkbox.indexOf(data);
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  yearsCHK(data: any, event: any) {
    this.CBV_Years_All = event.target.checked;
    this.yearsID = data;
    // console.log("this.edit_array_Years_Checkbox", this.edit_array_Years_Checkbox)
    // console.log("this.CBV_Years_All", this.CBV_Years_All)
    if (this.CBV_Years_All) {
      if (!this.edit_array_Years_Checkbox) {
        this.edit_array_Years_Checkbox = [];
      }
      this.edit_array_Years_Checkbox.push(data);
      this.edit_array_Years_Checkbox.join(',');
      //   console.log("Final Checkbox After checkbox selected list", this.edit_array_Years_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_Years_Checkbox)) {
        this.edit_array_Years_Checkbox = [];
      }
      const index = this.edit_array_Years_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_Years_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_Years_Checkbox)

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
    //  console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_invoiceShow_Value = data;
    this.Checkbox_value_invoiceShow = event.target.checked;
    // console.log(this.Checkbox_value_invoiceShow)
    if (this.Checkbox_value_invoiceShow) {

      this.CheckBox_DynamicArrayList_invoiceShowPermission.push(Number(data));
      this.CheckBox_DynamicArrayList_invoiceShowPermission.join(',');
      this.CheckBox_DynamicArrayList_invoiceShowPermission.sort();
      //   console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_invoiceShowPermission.indexOf(data);
      //   console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      }
      //   console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission)
    }
    this.typeConvertionString_invoiceShowPermission = this.CheckBox_DynamicArrayList_invoiceShowPermission.toString();

    //  console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoiceShowPermission)

  }
  EditCHK_emailCC(data: any, event: any) {
    //  console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    //  console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      //  console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  EditCHK(data: any, event: any) {
    // console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value_file = event.target.checked;
    // console.log(this.checkbox_value_file)
    for (let i = 0; i <= this.getFileAttachmentResult.length; i++) {
      //  console.log(this.getFileAttachmentResult[i].quotation_pdf_add)
      // console.log(this.checkboxAdding)
      if (this.getFileAttachmentResult[i].quotation_pdf_add == '1') {
        this.checkboxAdding = this.getFileAttachmentResult[i].common_attachmentId;
        // console.log(this.checkboxAdding)
      }

    }

    // console.log(this.checkboxAdding)
    if (this.checkbox_value_file) {
      this.checkboxAdding.push(data);
      //  console.log(this.checkboxAdding)
      this.edit_array.push(data);
      // this.edit_array.join(',');
      //  console.log("Final Checkbox After checkbox selected list", this.edit_array);
    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      //   console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }

  dynamicChange(event: any) {

    //  console.log("event", event)

    this.invType_Search = event.target.value;
    // console.log("invoice type search", this.invType_Search);
  }
  getSearch1() {

    this.getSearch = true;
  }

  getInvoice1(data: any) {
    // alert(2)
    // console.log("getinvoice1")

    // console.log("billerid", this.edit_array_SearchBiller_Checkbox);
    // console.log("this.edit_array_Years_Checkbox", this.edit_array_Years_Checkbox);
    if (this.isArray(this.edit_array_SearchBiller_Checkbox) == false) {
      this.edit_array_SearchBiller_Checkbox = this.convertTupleToArray(this.edit_array_SearchBiller_Checkbox); // Assign the result back to edit_array_SearchBiller_Checkbox
      //  console.log("after conversion to array", this.edit_array_SearchBiller_Checkbox)
    }
    //  alert("getInvoice-1")
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
    api_quotationList.getSearch = this.getSearch;


    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.response_total_cnt = response.total_cnt
      // console.log("PI list", response);
      if (response.total_cnt == 0) {
        // iziToast.warning({
        //   message: "Sorry, No Matching Data",
        //   position: 'topRight'
        // });
        $("#searchInvoiceFormId").modal("hide");

      }
      if (response) {
        this.spinner.hide();
        if (response.proforma_details == null) {
          //   iziToast.warning({
          //   message: "Sorry, No Matching Data",
          //   position: 'topRight'
          // });
        }
        this.PI_list = response.proforma_details;
        if (response.proforma_details != null) {
          this.PI_list.forEach((item: { showHi: boolean; }) => {
            item.showHi = false;
          });
        }
        this.searchFlag = response.searchFlag;
        // this.recurring_Status = response.proforma_details[0].recuring_status;

        if (response.proforma_details != null) {
          this.revenue_color = response.proforma_details[0].revenue_color;
          this.share_access_state = response.proforma_details[0].share_access_state;
          this.postal_send_color = response.proforma_details[0].postal_send_color;
          this.post_send_status = response.proforma_details[0].post_send_status;
          this.revenue_type_id = response.proforma_details[0].revenue_type_id;
          this.revenue_individual_state = response.proforma_details[0].revenue_individual_state;
          this.taxAmtstate = response.proforma_details[0].taxAmtstate;
        }

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
        this.invoicePermissionList_suspend = response.invoice_permission_arr.sus_inv_list;

        this.invoicePermissionList_sent_to_post = response.invoice_permission_arr.sent_to_post;
        this.invoicePermissionList_set_invoice_revenue = response.invoice_permission_arr.set_invoice_revenue;
        this.invoicePermissionList_set_invoice_type = response.invoice_permission_arr.set_invoice_type;
        this.invoicePermissionList_set_prev_billing = response.invoice_permission_arr.set_prev_billing;
        this.invoicePermissionList_set_terms_condition = response.invoice_permission_arr.set_terms_condition;
        this.invoicePermissionList_sus_inv_list = response.invoice_permission_arr.sus_inv_list;
        this.invoicePermissionList_ten_day_per_billing = response.invoice_permission_arr.ten_day_per_billing;
        this.revenueTypeList = response.revenue_list;



        if (response.selected_filtervalues[0].biller_ids != '') {
          this.selected_billerId = response.selected_billerId;
          this.edit_array_SearchBiller_Checkbox = this.selected_billerId.split(',');
          this.edit_array_SearchBiller_Checkbox = this.edit_array_SearchBiller_Checkbox.map((str: string) => parseInt(str, 10));
          this.edit_array_SearchBiller_Checkbox = this.selected_billerId.split(',').map((str: any) => parseInt(str, 10));
          //  console.log("changed value doubt", this.edit_array_SearchBiller_Checkbox);
          var check = this.isArray(this.edit_array_SearchBiller_Checkbox);
          //  console.log("check doubt", check)


        }
        if (response.selected_filtervalues[0].name_serach != '') {
          this.searchResult_CustomerName = response.selected_filtervalues[0].name_serach;
          this.searchInvoiceForm.patchValue({
            'company_Name': response.selected_filtervalues[0].name_serach
          })
        }
        // console.log("this.edit_array_SearchBiller_Checkbox-list complete", this.edit_array_SearchBiller_Checkbox);
        if (response.selected_filtervalues[0].year_filter != '') {
          this.years_id = response.selected_filtervalues[0].year_filter;
          this.edit_array_Years_Checkbox = this.years_id.split(',');
          this.edit_array_Years_Checkbox = this.edit_array_Years_Checkbox.map((str: string) => parseInt(str, 10));
          this.edit_array_Years_Checkbox = Array.from(new Set(this.edit_array_Years_Checkbox));
          //  console.log("this.edit_array_Years_Checkbox-after list load", this.edit_array_Years_Checkbox);
        }

        if (response.proforma_details != null) {
          for (var j = 0; j < response.proforma_details.length; j++) {

            this.reseller_commissionState = response.proforma_details[j].commission_state;
            this.recurring_state_all = response.proforma_details[j].recuring_status;
            //    console.log("this.reseller_commissionState", this.reseller_commissionState)
            this.suspend_state = response.proforma_details[j].suspend;
          }

        }


        // this.searchInvoiceForm.patchValue({
        //   'search_billerName':response.selected_filtervalues[0].biller_ids,
        //   'company_Name':response.selected_filtervalues[0].name_serach,
        //   'years':response.selected_filtervalues[0].year_filter,
        // });
        // console.log("proforma_details list", this.PI_list)
        // console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });


        $("#searchInvoiceFormId").modal("hide");
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
  convertTupleToArray(y: string): string[] {
    // Split the string by comma and filter out empty strings
    return y.split(',').filter(element => element.trim() !== '');
  }
  isArray(variable: any): boolean {
    return Array.isArray(variable);
  }

  getInvoice(data: any) {
    // alert(1)
    //  console.log("getinvoice")
    this.spinner.show();
    //  console.log("billerid", this.edit_array_SearchBiller_Checkbox);
    var da = this.edit_array_SearchBiller_Checkbox;
    //  console.log(this.isArray(this.edit_array_SearchBiller_Checkbox));

    if (this.isArray(this.edit_array_SearchBiller_Checkbox) == false) {
      this.edit_array_SearchBiller_Checkbox = this.convertTupleToArray(this.edit_array_SearchBiller_Checkbox); // Assign the result back to edit_array_SearchBiller_Checkbox
      // console.log("after conversion to array", this.edit_array_SearchBiller_Checkbox)
    }
    var list_data = this.listDataInfo(data);
    // console.log("getdata", this.edit_array_SearchBiller_Checkbox);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "invoice_list";
    api_quotationList.user_id = localStorage.getItem("erp_c4c_user_id");
    // alert("getInvoice")
    // alert(this.search_values1)
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
    api_quotationList.getSearch = this.getSearch;
    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("PI list", response);
      this.response_total_cnt = response.total_cnt;

      if (response.total_cnt == 0) {
        // iziToast.warning({
        //   message: "Sorry, No Matching Data",
        //   position: 'topRight'
        // });
        $("#searchInvoiceFormId").modal("hide");

      }
      if (response) {
        this.spinner.hide();
        if (response.proforma_details == null) {
          iziToast.warning({
            message: "Sorry, No Matching Data",
            position: 'topRight'
          });
        }
        this.PI_list = response.proforma_details;
        if (response.proforma_details != null) {
          this.PI_list.forEach((item: { showHi: boolean; }) => {
            item.showHi = false;
          });
        }

        this.searchFlag = response.searchFlag;
        // this.recurring_Status = response.proforma_details[0].recuring_status;
        if (response.proforma_details != null) {
          this.revenue_type_id = response.proforma_details[0].revenue_type_id;
          this.revenue_individual_state = response.proforma_details[0].revenue_individual_state;
          this.taxAmtstate = response.proforma_details[0].taxAmtstate;
          this.revenue_color = response.proforma_details[0].revenue_color;
          this.share_access_state = response.proforma_details[0].share_access_state;
          this.postal_send_color = response.proforma_details[0].postal_send_color;
          this.post_send_status = response.proforma_details[0].post_send_status;
        }

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

        //  console.log("this.edit_array_SearchBiller_Checkbox-getInvoice-list complete", this.edit_array_SearchBiller_Checkbox);

        if (response.proforma_details != null) {
          for (var j = 0; j < response.proforma_details.length; j++) {

            this.reseller_commissionState = response.proforma_details[j].commission_state;
            this.suspend_state = response.proforma_details[j].suspend;
            this.recurring_state_all = response.proforma_details[j].recuring_status;
          }
        }


        // console.log("proforma_details list", this.PI_list)
        // console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });

        // this.searchInvoiceForm.patchValue({
        //   'search_billerName':response.selected_filtervalues[0].biller_ids,
        //   'company_Name':response.selected_filtervalues[0].name_serach,
        //   'years':response.selected_filtervalues[0].year_filter,
        // });
        $("#searchInvoiceFormId").modal("hide");
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

    let api_reqs_invoice: any = {
      InvSearch_Search_BillerId: this.edit_array_SearchBiller_Checkbox,
      InvSearch_off_set: list_data.offset,
      InvSearch_limit_val: list_data.limit,
      InvSearch_search_txt: this.searchResult_CustomerName,
      InvSearch_years: this.edit_array_Years_Checkbox,
      InvSearch_invoiceType: this.invType_Search,
      InvSearch_recurring_only: this.CBV_recurring_only,
      InvSearch_dont_select_did_invoice: this.CBV_dont_select_did_invoice,
      InvSearch_revenue_typewise_show: this.CBV_RevenueTypeWiseShow,
      InvSearch_revenue_typewise_showID: this.revenueTypeWiseDropDownValue,
      type: "search girlfriend",
    };
    // api_reqs_invoice = JSON.stringify(api_reqs_invoice)
    this.serverService.invoice_search.next(api_reqs_invoice);
    //  console.log("sending api_reqs_invoice", api_reqs_invoice)


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

    $("#ActionId" + i).modal("hide");
    var editbillID = id;
    var editDIDState = didState;


    if (didState == '0') {
      this.router.navigate(['/EditInvoice'], {
        queryParams: {
          e_editBillID: editbillID,
          e_editDIDState: editDIDState,
          e_searchFlag: this.searchFlag
        }
      });
    }
    else {
      this.router.navigate(['/InvoiceEditDID'], {
        queryParams: {
          e_editBillID: editbillID,
          e_editDIDState: editDIDState,
          e_searchFlag: this.searchFlag
        }
      });

    }

    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");

  }

  duplicatePIGo(id: any, i: any, didState: any) {
    $("#ActionId" + i).modal("hide");
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

    $('.modal-backdrop').remove();
    $("body").removeClass("modal-open");
  }
  clearSearch() {
    $("#searchInvoiceFormId").modal("show");
  }
  suspendInvoiceGo() {
    $('#suspendInvoiceFormId').modal('show');
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
      //   console.log("final error", error);
    }

  }
  invoiceSharPersonEdit(Id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        //  console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_invoiceShowPermission)

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
      //  console.log("final error", error);
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

        $('#sharPerissionFormId_inv').modal('hide');
        $('#sharPerissionFormId_inv').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });
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
        //  console.log("final error", error);
      };
  }
  deleteInvoice(billId: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
            this.getInvoice1({});

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
            //  console.log("final error", error);
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
            //  console.log("final error", error);
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
            // console.log("final error", error);
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
    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_suspend = data;
    this.checkbox_value_suspend = event.target.checked;
    //  console.log(this.checkbox_value_suspend)
    if (this.checkbox_value_suspend) {

      this.suspend_array.push(data);
      this.suspend_array.join(',');
      //  console.log("Final Checkbox After checkbox selected list", this.suspend_array);
    }
    else {
      const index = this.suspend_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.suspend_array.splice(index, 1);
      }
      //  console.log("Final Checkbox After Deselected selected list", this.suspend_array)

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
        //   console.log("final error", error);
      };

  }
  getInvoice_Post(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        //  console.log("final error", error);
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
        $('#InvoiceSendingMethodFormId_inv').modal('hide');
        $('#InvoiceSendingMethodFormId_inv').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });

      } else {


        iziToast.warning({
          message: "Invoice Send to post details not Updated. Please try again",
          position: 'topRight'
        });
        $('#InvoiceSendingMethodFormId_inv').modal('hide');
        $('#InvoiceSendingMethodFormId_inv').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
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
        $("#InvoiceSendingMethodFormId_inv").modal("hide");
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
      //  console.log("final error", error);
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
    $("#invoiceID").val('');
    $("#toal").val('');
    $("#biller").val('');
    $("#paid").val('');
    $("#customer").val('');
    $("#owing").val('');
    $("#amount").val('');
    $("#note").val('');
    $("#paytype").val('');
    $('#paytype1').val('');
    $('#paytype2').val('');
    $("#dateee").val('');
    this.processPaymentForm.controls['paymenttype'].reset();
    this.processPaymentForm.reset();
    this.invoiceDetails_payment = [];
    this.paymentType_payment = [];
    this.paymentDetails_payment = [];



    $("#ActionId" + i).modal("hide");
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
      if (response != '') {
        this.invoiceDetails_payment = response.invoice_details;
        this.paymentType_payment = response.payment_type;
        this.paymentDetails_payment = response.payment_details;
        this.paymentDetails_paymentLength = response.payment_details.length;

        if (this.paymentDetails_payment == '') {
          $("#invoiceID").val('');
          $("#toal").val('');
          $("#biller").val('');
          $("#paid").val('');
          $("#customer").val('');
          $("#owing").val('');
          $("#amount").val('');
          $("#note").val('');

          $("#paytype").val('');
          $('#paytype1').val('');
          $('#paytype2').val('');
          $("#dateee").val('');
          this.processPaymentForm.controls['paymenttype'].reset();
          this.processPaymentForm.reset();
        }
        if (response.payment_details != '') {
          //  $("#dateee").val(response.invoice_details[0].billDate)
          this.paymentNotes = response.payment_details[0].notes;
          this.PP_PaymentProcessID = response.payment_details[0].processId;
          this.owingAmt = response.owing_amount;
          this.processPaymentForm.patchValue({

            // 'note': response.payment_details[0].notes,
            // 'date': response.payment_details[0].processDate,
            // 'paymenttype': response.payment_details[0].paymentMode,

          });
        }
        //  this.PaymentProcessDatee = response.invoice_details[0].billDate;
        const now = Date.now();
        // this.myFormattedDate = this.pipe.transform(now, 'short');
        // this.myFormattedDate1 = this.pipe.transform(this.PaymentProcessDatee, 'short');
        const date = new Date();
        const transformDate1 = this.datePipe.transform(date, 'yyyy-MM-dd');
        //  console.log("current date time", transformDate1)
        this.processPaymentForm.patchValue({
          'date': transformDate1,
          'invoiceID': response.invoice_details[0].invoice_no,
          'toal': response.invoice_details[0].netPayment,
          'biller': response.invoice_details[0].billerName,
          'paid': response.paid_amount,
          'customer': response.invoice_details[0].customerName,
          'owing': response.owing_amount,
          'amount': response.owing_amount,


        });

        this.spinner.hide();

        // this.getInvoice1({});
      } else {

        $('#processPaymentId_inv').modal("hide");

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
        //  console.log("final error", error);
      };
  }


  getEmailDetails(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
    if (id != undefined) {
      api_emailDetails.billId = id;
    } else {
      api_emailDetails.billId = '';
    }


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
        this.SelectType_finance = response.finance_email;
        this.SelectType_company = response.company_email;
        this.mailContent = tinymce.get('tinyID1_inv').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({

          'tinyID1_inv': this.mailContent,
          'Subject_Content': response.subject,


        })
        if (this.Select_To_Type_radiobox_Value == 'finance') {
          this.emailForm.patchValue({
            'email_to': response.finance_email,
            'tinyID1_inv': this.mailContent,
          })
        }
        else {
          this.emailForm.patchValue({
            'email_to': response.company_email,
            'tinyID1_inv': this.mailContent,
          })
        }



        this.getInvoice1({});
      } else {

        $('#processPaymentId_inv').modal("hide");
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
        //   console.log("final error", error);
      };
  }
  eInvoiceDetails(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.geteInvoiceID = id;
    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "einvoice";
    api_req.api_url = "einvoice/get_einvoice_status";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "get_einvoice_status";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.billId = this.geteInvoiceID;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.eInvoiceForm.patchValue({
          'eInvoice': response.einvoice_status
        });
      }
      else {
        $("#eInvoiceFormId_inv").modal("hide");
        $('.modal-backdrop').remove();
        $("body").removeClass("modal-open");
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
  eInvoiceDetailsUpdate() {


    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "einvoice";
    api_req.api_url = "einvoice/update_einvoice_status";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "update_einvoice_status";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.billId = this.geteInvoiceID;
    sendMet_req.einvoice_status = this.eInvoiceValue;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        $("#eInvoiceFormId_inv").modal("hide");
        $('.modal-backdrop').remove();
        $("body").removeClass("modal-open");
        this.eInvoiceForm.controls['eInvoice'].reset();
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

      }
      else {
        $("#eInvoiceFormId_inv").modal("hide");
        $('.modal-backdrop').remove();
        $("body").removeClass("modal-open");
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
  getsstTaxDetails(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.getsstTaxEditID = id;
    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_sst_tax";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "get_sst_tax";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.billId = this.getsstTaxEditID;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.sstTaxForm.patchValue({
          'sstTax': response.sst_tax
        });
      }
      else {
        $("#sstTaxFormId_inv").modal("hide");
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
  updateSST() {
    this.spinner.show();

    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_sst_tax";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "update_sst_tax";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.billId = this.getsstTaxEditID;
    sendMet_req.sst_tax = this.sstCheckbox;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.spinner.hide();
        $("#sstTaxFormId_inv").modal("hide");
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
      }
      else {
        this.spinner.hide();
        $("#sstTaxFormId_inv").modal("hide");
        iziToast.error({
          message: "Updated",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      //  console.log("final error", error);
    }

  }
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.getInvoice1({});
    tinymce.activeEditor.setContent("");
  }
  PP_PaymentMethod(event: any) {
    this.PP_paymentMethod = event.target.value;
    if (event.target.value == 7 || event.target.value == 8) {
      this.flg = true;
    }
    //  console.log("this.PP_paymentMethod", this.PP_paymentMethod)
    this.PP_PaymentMethodDropdown();
  }
  PP_PaymentMethodDropdown() {

    let api_req: any = new Object();
    let api_pay_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "invoice/get_credit_note_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_pay_req.action = "get_credit_note_details";
    api_pay_req.user_id = this.user_ids;
    api_pay_req.billId = this.billID_processPayment;

    api_pay_req.paytype_id = this.PP_paymentMethod;
    api_req.element_data = api_pay_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {



      if (response.status == true) {

        this.creditResponse = response.credit_note;
        if (response.credit_note.length > 0) {
          this.credit_note_id = response.credit_note[0].credit_note_id;
          this.prepaid_id = response.credit_note[0].prepaid_id;
        }



        //  console.log("this.creditResponse", this.creditResponse)
        this.spinner.hide();
      }
      else if (response.status == false) {
        this.processPaymentForm.patchValue({
          'amount': response.owing_amount,

        })
      }
      else {
        var bal_amt = $('#Owing').val()
        var vh = $('#amount').val();
        // alert(vh)
        var ff = this.processPaymentForm.value.amount;
        // alert(ff)
        // this.processPaymentForm.patchValue({
        //   'amount': $('#Owing').val(),

        // })



      }
    });




  }
  changeCreditNote(event: any) {
    this.changeCreditNoteValue = event.target.value;
    //  console.log(" this.changeCreditNoteValue", this.changeCreditNoteValue)
    this.creditShowFlag = true;

    this.spinner.show();
    let api_req: any = new Object();
    let credit_changeApi: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_credit_note_amount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    credit_changeApi.action = "get_credit_note_amount";
    credit_changeApi.user_id = localStorage.getItem('erp_c4c_user_id');
    credit_changeApi.credit_note_id = this.changeCreditNoteValue;
    api_req.element_data = credit_changeApi;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response !== undefined && response !== null && response !== '') {
        // $('#amount').val(response.c_amt);
        // var che11= $('#amount').val(response.c_amt);
        // console.log("che11",che11);

        this.processPaymentForm.patchValue({

          'amount': response.c_amt,

        });

        // var res = response;
        // var ow = $('#Owing').val();
        // if (parseFloat(ow) < parseFloat(res)) {


        //   this.processPaymentForm.patchValue({

        //     'amount': ow,

        //   });

        // } else {

        //   this.processPaymentForm.patchValue({

        //     'amount': $('#Owing').val(),


        //   });

        // }
        this.spinner.hide();




      } else {

        this.spinner.hide();



      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //   console.log("final error", error);

      };
  }
  changePrepaidNote(event: any) {
    this.changePrepaidNoteValue = event.target.value;
    //  console.log("this.changePrepaidNoteValue", this.changePrepaidNoteValue);
    this.prepaidShowFlag = true;
    this.spinner.show();
    let api_req: any = new Object();
    let prepaid_changeApi: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_prepaid_note_amount";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    prepaid_changeApi.action = "get_prepaid_note_amount";
    prepaid_changeApi.user_id = localStorage.getItem('erp_c4c_user_id');
    prepaid_changeApi.prepaid_id = this.changePrepaidNoteValue;
    api_req.element_data = prepaid_changeApi;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {

        this.processPaymentForm.patchValue({
          'amount': response.p_amt,
        });

        // var res = response;
        // var ow = $('#Owing').val();
        // if (parseFloat(ow) < parseFloat(res)) {
        //   this.processPaymentForm.patchValue({
        //     'amount': ow,
        //   });

        // } else {

        //   this.processPaymentForm.patchValue({
        //     'amount': res,
        //   });

        // }
        this.spinner.hide();

      } else {

        this.spinner.hide();
      }
    }),
      (error: any) => {

        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);

      };
  }
  clearPayProcess() {

    this.processPaymentForm.controls['toal'].reset();
    this.processPaymentForm.controls['biller'].reset();
    this.processPaymentForm.controls['paid'].reset();
    this.processPaymentForm.controls['customer'].reset();

    this.processPaymentForm.controls['owing'].reset();
    this.processPaymentForm.controls['amount'].reset();
    this.processPaymentForm.controls['note'].reset();
    this.processPaymentForm.controls['paymentDetails'].reset();
    this.processPaymentForm.controls['paymenttype'].reset();

    this.processPaymentForm.controls['paymenttype1'].reset();
    this.processPaymentForm.controls['paymenttype2'].reset();
    $('#amount').val('');
    this.flg = false;
  }
  processPaymentUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_processpaymentUpdate: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_payment_process";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentUpdate.action = "update_payment_process";
    api_processpaymentUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_processpaymentUpdate.bill_payment_process_id = this.billID_processPayment;
    if (this.processPaymentForm.value.paymenttype === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      return false;
    } else {
      api_processpaymentUpdate.payment_method = this.processPaymentForm.value.paymenttype;
    }
    api_processpaymentUpdate.paymentDate = this.processPaymentForm.value.date;



    if (this.processPaymentForm.value.amount === null) {
      this.spinner.hide();
      iziToast.error({
        message: "Amount Value missing",
        position: 'topRight'
      });

      return false;
    }

    api_processpaymentUpdate.total_bal_amount = 0;
    api_processpaymentUpdate.amount = this.processPaymentForm.value.amount;
    api_processpaymentUpdate.balAmt = this.processPaymentForm.value.owing;
    api_processpaymentUpdate.note = this.processPaymentForm.value.note;
    api_processpaymentUpdate.prepaid_id = this.prepaid_id;
    api_processpaymentUpdate.credit_note_id = this.credit_note_id;

    api_req.element_data = api_processpaymentUpdate;

    $("#processPaymentId_inv").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#processPaymentId_inv").removeAttr("disabled");
      if (response.status == true) {

        this.spinner.hide();
        $('#processPaymentId_inv').modal("hide");
        $('#amount').val('');
        this.processPaymentForm.reset();
        this.getInvoice1({});
        iziToast.success({
          message: "Payment Process Updated Successfully",
          position: 'topRight'

        });
        // this.getInvoice1({});

      } else {
        this.spinner.hide();
        $('#processPaymentId_inv').modal("hide");
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
        // console.log("final error", error);

      };
  }

  paymentProcessEditShow(i: any) {

    this.spinner.show();
    let api_req: any = new Object();
    let api_payprocessEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_edit_payment_process";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_payprocessEdit.action = "get_edit_payment_process";
    api_payprocessEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_payprocessEdit.processId = i;

    api_req.element_data = api_payprocessEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        // $('#note').val(response.payment_edit[0].notes);
        // $('#Paid').val(response.payment_edit[0].paidAmount);
        // $('#paytype').val(response.payment_edit[0].paymentMode);
        // $('#dateee').val(response.payment_edit[0].processDate_show);

        this.processPaymentForm.patchValue({
          'date': response.payment_edit[0].processDate_show,
          'amount': response.payment_edit[0].paidAmount,
          'paymenttype': response.payment_edit[0].paymentMode,
          'note': response.payment_edit[0].notes,
        });

      } else {
        this.spinner.hide();

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
        // console.log("final error", error);
      };

  }



  templateContentEmailDropdown(event: any) {
    this.quotation_Emailtemplate_id = event.target.value;
    // console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/get_email_invoice_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_email_invoice_template";
    api_quotationTemplateDropdown_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.billId = this.Email_BillId;
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content;
      this.mailContent = tinymce.get('tinyID1_inv').setContent("<p>" + this.messageContent + "</p>");
      $('#subject').val(response.crm_subject_name);
      $('#tinyID1_inv').val(this.mailContent);
      if (response != '') {
        this.emailForm.patchValue({

          // 'Subject_Content': response.crm_subject_name,

          // 'tinyID1_inv': this.mailContent,

        });

      }
      else {
        this.emailForm.patchValue({

          'email_template': '',

        });
      }


    });
  }
  handle__email_from(e: any) {
    // this.FromEmailValue =e.target.value;
  }
  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    // this.FromEmailValue = $('#emailFrom').val();
    this.FromEmailValue = this.emailForm.value.email_From;

    //  this.emailTo = $('#emailto').val();
    this.emailTo = this.emailForm.value.email_to;
    // this.subjectValue = $('#subject').val();
    this.subjectValue = this.emailForm.value.Subject_Content;
    this.msg_id = tinymce.get('tinyID1_inv').getContent();
    // console.log("msgid", this.msg_id)
    // console.log("email to", this.emailTo)
    // console.log("subject", this.subjectValue)
    var pdf_state = 0
    if (this.CBV_TemplateSelection == true || this.CBV_PDFLink == true || this.CBV_PaymentLink == true) {
      var pdf_state = 1;
      // console.log("if condition if any checkbox selects", pdf_state)
    }
    else {
      var pdf_state = 0;
      // console.log("if condition if none of checkbox selects", pdf_state)
    }


    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_details_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "invoice_details_sendmail";
    api_email_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_email_req.ccEmailId = this.edit_array_emailCC_Checkbox;
    api_email_req.billId = this.Email_BillId;

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.emailForm.value.email_From === null || this.emailForm.value.email_From === '' || this.emailForm.value.email_From === 'undefined' || this.emailForm.value.email_From === undefined) {

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
    this.emailForm.value.Subject_Content

    if (this.emailForm.value.Subject_Content === null || this.emailForm.value.Subject_Content === '' || this.emailForm.value.Subject_Content === 'undefined' || this.emailForm.value.Subject_Content === undefined) {

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
      //  console.log("response status", response.status);
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

        $("#emailFormId_inv").modal("hide");
        this.getInvoice1({});

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        $("#emailFormId_inv").modal("hide");
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
      //  console.log("final error", error);
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

    var url = this.serverService.urlFinal + "invoice/getBillpdf?billId=" + billId + "";

    window.open(url, '_blank');
    //  console.log("url", url)
  }
  dopdf(do_id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    var url = this.serverService.urlFinal + "deliveryorder/getDOpdfShow?deliveryId=" + do_id + "";
    window.open(url, '_blank');
    // console.log("url", url)
  }
  get_actualcost_details(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        //  console.log("final error", error);
      };

  }

  get_invoice_licence_details(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        // console.log("final error", error);
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
        //  console.log("final error", error);
      };
  }
  fileAttachmentEdit(ID: any, i: any) {
    $("#ActionId" + i).modal("hide");
    $('#file').val();
    $('#file').val('');

    this.myFiles = [];
    $("#fileAttachmentFormId_inv").modal("show");
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
      // console.log("check  file attachment", response)
      this.getFileAttachmentResult = response.inv_attachment_details;
      // this.firstResult = response.phone_provision_det;
      // this.secondResult=response.contract_attachment_arr;
      if (response.status == true) {
        if (response.inv_attachment_details[0]) {
          this.FileAttachmentForm.patchValue({
            // 'file': response.attachment_list.uploadFileName,
            'file': response.inv_attachment_details[0].uploadFileName,

          });

        }

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
        url: this.serverService.urlFinal + 'invoice/invoice_attachment_save',


        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {

            self.getInvoice1({});
            // console.log(result);
            Swal.close();
            $("#fileAttachmentFormId_inv").modal("hide");
            this.edit_array = [];

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#fileAttachmentFormId_inv").modal("hide");

            iziToast.warning({
              message: "File Attachment Update Failed",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          //  console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#fileAttachmentFormId_inv").modal("hide");
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

            $("#fileAttachmentFormId_inv").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            // console.log(error);
          };
      }
    })


  }

  setTermsConditionEdit(id: any, i: any) {
    // this.setInvoiceType.reset();
    $("#ActionId" + i).modal("hide");
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

        $('#settermsConditionFormId_inv').modal("hide");
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
        //  console.log("final error", error);
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
        $('#settermsConditionFormId_inv').modal("hide");
      } else {

        $('#settermsConditionFormId_inv').modal("hide");
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
        // console.log("final error", error);
      };

  }
  setTermsConditionClear() {
    this.setTermConditionForm.reset();
  }
  paymentLink(paylink_id: any, i: any) {
    $("#ActionId" + i).modal("hide");

    var url = "https://erp.cal4care.com/erp/pay_online.php?payment_through=aW52b2ljZQ==&payment=" + paylink_id;
    window.open(url, '_blank');
    // console.log("url", url)
    // $('#pdfFormId').modal('hide');
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  RecurringEdit(id: any, i: any) {

    $("#ActionId" + i).modal("hide");
    this.CommissionType55 = []
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
        // console.log("date check", date)
        // $('#date123').val('01/01/1970');
        this.recurringDetails = response.reccuring_details;
        this.recurringDetails_fixed_next_dt = response.reccuring_details.fixed_next_dt;
        this.recurringDetails_usage_next_dt = response.reccuring_details.usage_next_dt;
        this.recuringStatus = response.reccuring_details.recuring_status;
        this.recurring_State_value = response.reccuring_details.recuring_status;

        this.reccuringDuration = response.reccuring_duration;
        this.TermDetailsList = response.terms_details;
        this.commissionGrossAmount = response.reccuring_details.grossAmount;
        this.resellerEnaChk = response.reccuring_details.reseller_com_status;
        if (response.resellerComm != null) {
          var k = response.resellerComm.commission_type;
          this.commissionType_value = response.resellerComm.commission_type;
        }

        this.CommissionType55.push(k);
        //  console.log(this.CommissionType1);


        const patchData: any = {
          date: response.reccuring_details.recured_date_show,
          fixedChargeDuration: response.reccuring_details.fixed_duration,
          // fixedChargeDt_value: response.reccuring_details.fixed_next_dt,
          usageChargeDuration: response.reccuring_details.usage_duration,
          // usageChargeDt_value: response.reccuring_details.usage_next_dt,
          grossAmount: response.reccuring_details.grossAmount,
        };

        if (response.resellerComm != null) {
          patchData.reseller_name = response.resellerComm.reseller_name;
          patchData.commission_value = response.resellerComm.commission_value;
          patchData.commission_amt = response.resellerComm.commission_amt;
          patchData.reseller_comm_id = response.resellerComm.reseller_comm_id;
          patchData.reseller_id = response.resellerComm.reseller_id;
          patchData.cbk_RCEnable = response.reccuring_details.reseller_com_status === 1;
        }

        this.RecurringForm.patchValue(patchData);

        // $('#RecurringFormId_inv').modal("hide");
        this.getInvoice1({});

      } else {


        iziToast.warning({
          message: "Recurring Details not displayed. Please try again",
          position: 'topRight'
        });
        $('#RecurringFormId_inv').modal("hide");
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };


  }
  RecurringEditPE(id: any, i: any) {
    this.recuringStatus = '';
    $("#ActionId" + i).modal("hide");
    this.spinner.show();
    this.recurringResller_BillerID = id;
    this.getInvoice1({});
    let api_req: any = new Object();
    let api_recurring: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reseller_reccuring_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurring.action = "reseller_reccuring_details";

    api_recurring.billId = id;
    api_recurring.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_recurring;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        var date = response.reccuring_details.recured_date_show;
        //   console.log("date check", date)
        // $('#date123').val('01/01/1970');
        this.recurringDetails = response.reccuring_details;
        this.recunxt = response.reccuring_details.next_recurring_date
        this.recuringStatus1 = response.reccuring_details.recurring_state;
        this.recurring_State_value1 = response.reccuring_details.recurring_state;



        this.setResellerRecurringForm.patchValue({

          'date': response.reccuring_details.recured_date_new,
          'recurring_state': response.reccuring_details.recurring_state,
          'recurringDtCBX': response.reccuring_details.recurring_date_checkbox,

          'recurringDate': response.reccuring_details.recurring_date,
          'recurringDuration': response.reccuring_details.recurringDuration,

        })

        // $('#RecurringFormId_inv').modal("hide");
        this.getInvoice1({});

      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Recurring Details not displayed. Please try again",
          position: 'topRight'
        });
        $('#RecurringFormId_inv').modal("hide");
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //  console.log("final error", error);
      };


  }
  yearsAPI() {

    let api_req: any = new Object();
    let api_year: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/yearValueFilter";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_year.action = "yearValueFilter";
    api_year.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_year;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {

        this.yearsList = response;

      } else {




      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        //   console.log("final error", error);
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
    api_recurringUpd.usage_charge_dt = this.RecurringForm.value.usageChargeDt_value;
    api_recurringUpd.rec_duration_fixed = this.RecurringForm.value.fixedChargeDuration;
    api_recurringUpd.usage_charge_chk = this.CBV_UsageChargeDt;
    api_recurringUpd.usage_charge_dt = this.RecurringForm.value.usageChargeDt_value;
    api_recurringUpd.rec_duration_monthly = this.RecurringForm.value.usageChargeDuration;


    api_recurringUpd.reseller_com_status = this.RecurringForm.value.cbk_RCEnable;

    api_recurringUpd.reseller_name = this.RecurringForm.value.reseller_name;
    api_recurringUpd.reseller_id = this.RecurringForm.value.reseller_id;

    api_recurringUpd.commission_type = this.commissionType_value;

    api_recurringUpd.commission_value = this.RecurringForm.value.commission_value;
    api_recurringUpd.commission_amt = $('#CommissionAmount1_WFA_ID1_').val();
    $('#CommissionAmount1_WFA_ID1_').val();

    api_req.element_data = api_recurringUpd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#RecurringFormId_inv').modal('hide');
      $('#RecurringFormId_inv').on('hidden.bs.modal', () => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
      });

      if (response.status == true) {
        iziToast.success({
          message: "Recurring Details Updated Successfully",
          position: 'topRight'
        });
        this.getInvoice({});//added now
        this.getInvoice1({});
        // window.location.reload();
      } else {
        iziToast.warning({
          message: "Check Response",
          position: 'topRight'
        });
        this.getInvoice({});
        this.getInvoice1({});
        //  window.location.reload();

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        this.getInvoice({});
        this.getInvoice1({});
        window.location.reload();
        // console.log("final error", error);
      };


  }


  setPreviousDue(id: any, Status_variable: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
            //  console.log("final error", error);
          };
      }
    })


  }
  InvoiceRevenueEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
      // console.log(response)
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
        //  console.log(formArray)
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
        // console.log("network error", error);
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
        $('#InvoiceRevenueFormId_inv').modal("hide");


        this.getInvoice1({});
      }
      else {
        iziToast.warning({
          message: "Revenue Details not Updated Successfully",
          position: 'topRight'
        });
        $('#InvoiceRevenueFormId_inv').modal("hide");


        this.getInvoice1({});

      }
    }),
      (error: any) => {
        //  console.log("network error", error);
        iziToast.error({
          message: "Network Error",
          position: 'topRight'
        });
        $('#InvoiceRevenueFormId_inv').modal("hide");


        this.getInvoice1({});

      };

  }
  getNotes(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        // console.log("network error", error)
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
        $('#NotesFormId_inv').modal('hide');
        $('#NotesFormId_inv').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });




        this.getInvoice1({});
      } else {

        iziToast.warning({
          message: "Invoice Notes not Updated. Check response",
          position: 'topRight'
        });
        $('#NotesFormId_inv').modal("hide");


        this.getInvoice1({});

      }
    }),
      (error: any) => {
        // console.log("network error", error)
        iziToast.error({
          message: "Delivery Order not Updated. Check response",
          position: 'topRight'
        });
        $('#NotesFormId_inv').modal("hide");


        this.getInvoice1({});

      };




  }

  InvoicetoProforma(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
            //  console.log("final error", error);
          };
      }
    })


  }
  DeliveryOrderEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
  //       $('#DeliveryOrderFormId_inv').modal("hide");


  //       this.getInvoice1({});
  //     } else {
  //       iziToast.warning({
  //         message: "Delivery Order not Updated. Please try again",
  //         position: 'topRight'
  //       });
  //       $('#DeliveryOrderFormId_inv').modal("hide");
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
            $('#DeliveryOrderFormId_inv').modal("hide");


            this.getInvoice1({});

          } else {
            iziToast.warning({
              message: "Delivery Order not Updated. Please try again",
              position: 'topRight'
            });
            $('#DeliveryOrderFormId_inv').modal("hide");
            this.getInvoice1({});
          }
        }),
          (error: any) => {
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            //  console.log("final error", error)
          };
      }
    })


  }

  setInvoiceTypeNameEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
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
        //  console.log("response.selected_invoice_type", response.selected_invoice_type)
        this.setInvoiceType.patchValue({
          'setInvoice': response.selected_invoice_type
        })



      } else {

        $('#setInvoiceTypeNameFormId_inv').modal("hide");
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
        //  console.log("final error", error);
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
        $('#setInvoiceTypeNameFormId_inv').modal("hide");
      } else {

        $('#setInvoiceTypeNameFormId_inv').modal("hide");
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
        //  console.log("final error", error);
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
    $("#ActionId" + i).modal("hide");
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
            //  console.log(error);
          };
      }
    })


  }
  invoicetoQuotationEdit(id: any, i: any) {
    $("#ActionId" + i).modal("hide");
    this.billId_InvoicetoQuotation = id;
    $("#InvoicetoQuotationFormId_inv").modal("show");
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
    $("#InvoicetoQuotationFormId_inv").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#InvoicetoQuotationFormId_inv").removeAttr("disabled");
      //  console.log(response);

      //  console.log("pop up for add quotation", response);
      if (response != '') {
        this.enquiryFromList = response.enquiry_from;
        this.quotationValidityList = response.quot_validity;
        this.templateNameList = response.template_name_arr;
        //   console.log("EnquiryFormList", this.enquiryFromList)

        // $('#InvoicetoQuotationFormId_inv').modal('hide');
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
        $('#InvoicetoQuotationFormId_inv').modal('hide');
        $('#InvoicetoQuotationFormId_inv').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
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
        //  console.log("final error", error);
      };

  }

  InvoiceTypeDetailsUpdate() {

  }
  addNotes() {


  }

  selectEventReseller(item: any) {
    if (item) {
      this.ResellerName_Customer = item.customerName;
      this.ResellerId_Customer = item.customerId;

    }

    // console.log(item.customerId)
    // console.log(item.customerName)


    // do something with selected item
  }
  onFocusedReseller(e: any) {
    // do something when input is focused
    // console.log(e)
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
        //  console.log("final error", error);
      };

  }

  get_WFA_ResellerCommission(id: any, i: any) {

    this.RecurringEdit(id, i);
    this.CommissionType1 = [];
    this.billId_ResellerCommissionId = id;
    $("#ActionId" + i).modal("hide");
    // $("body").removeClass("modal-open");
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
      //  console.log("response", response)
      this.spinner.hide();
      // this.CommissionType = response;
      this.resellercommissiontype = response.commission_type
      this.commlistall1 = response.editcommList;

      if (response != '') {
        this.resellercommissiontype2 = response;
        this.ResellerName_Customer = response.editcommList[0].reseller_name;
        this.ResellerId_Customer = response.editcommList[0].reseller_id;
        this.recuringStatus1 = response.editcommList[0].recurring_state;

        for (let i = 0; i < response.editcommList.length; i++) {
          var gh = response.editcommList[i].commIndex;
          this.commissionGrossAmount = response.editcommList[i].grossAmount;
          this.resellercommissiontype1.push({ val: gh });
          // console.log("this.resellercommissiontype1-inside loop", this.resellercommissiontype1);
        }
        //  console.log("this.resellercommissiontype1-outside loop", this.resellercommissiontype1);

        const formArray = new FormArray([]);
        for (let i = 0; i < response.editcommList.length; i++) {

          var k = response.editcommList[i].commission_type;
          this.CommissionType1.push(k);
          //  console.log(this.CommissionType1);

          this.inv_resellerCommissionForm.patchValue({
            "billChildid1": response.editcommList[i].reseller_comm_id,
            "commIndex": response.editcommList[i].commIndex,
            "reseller_name": response.editcommList[i].reseller_name,
            "commission_type": response.editcommList[i].commission_type,
            "commission_value": response.editcommList[i].commission_value,
            "commission_amt": response.editcommList[i].commission_amt,
            "pdf_show": response.editcommList[i].pdf_show == 1 ? true : false,
            "reseller_comm_id": response.editcommList[i].reseller_comm_id,
            "reseller_id": response.editcommList[i].reseller_id,
            "billId": response.editcommList[i].billId,
            "grossAmount": response.editcommList[i].grossAmount,
            'date': response.editcommList[i].recured_date_new,
            'recurring_state': response.editcommList[i].recurring_state == 1 ? true : false,
            'recurringDtCBX': response.editcommList[i].recurring_date_checkbox,
            'recurringDate': response.editcommList[i].recurring_date,
            'recurringDuration': response.editcommList[i].recurring_duration,
            'nextRecDt': response.editcommList[i].next_recurring_date,



          });


        }
        // console.log(this.CommissionType);




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
        // console.log("final error", error);
      };


  }
  get_WFA_ResellerCommission_formarray(id: any, i: any) {
    this.CommissionType1 = [];
    this.billId_ResellerCommissionId = id;
    $("#ActionId" + i).modal("hide");
    // $("body").removeClass("modal-open");
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
      // console.log("response", response)
      this.spinner.hide();
      // this.CommissionType = response;
      this.resellercommissiontype = response.commission_type
      this.commlistall1 = response.editcommList;

      if (response != '') {
        this.resellercommissiontype2 = response;
        for (let i = 0; i < response.editcommList.length; i++) {
          var gh = response.editcommList[i].commIndex;
          this.commissionGrossAmount = response.editcommList[i].grossAmount;
          this.resellercommissiontype1.push({ val: gh });
          //  console.log("this.resellercommissiontype1-inside loop", this.resellercommissiontype1);
        }
        //  console.log("this.resellercommissiontype1-outside loop", this.resellercommissiontype1);

        const formArray = new FormArray([]);
        for (let i = 0; i < response.editcommList.length; i++) {

          var k = response.editcommList[i].commission_type;
          this.CommissionType1.push(k);
          //   console.log(this.CommissionType1);

          formArray.push(this.fb.group({
            "billChildid1": response.editcommList[i].reseller_comm_id,
            "commIndex": response.editcommList[i].commIndex,
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
        //  console.log(this.CommissionType);
        //  console.log(formArray)
        this.resellerCommissionForm.setControl('addresses_rc', formArray);
        // console.log("this.addresses---end of edit", this.resellerCommissionForm.value.addresses_rc)
        this.data_value = this.resellerCommissionForm.value.addresses_rc;

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
        //  console.log("final error", error);
      };


  }

  update_WFA_ResellerCommission() {

    this.spinner.show();


    // $("#faqhead" + i).modal("hide");
    // $("body").removeClass("modal-open");
    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "update_reseller_commission_details";
    api_resCommEdit.billId = this.billId_ResellerCommissionId;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');
    api_resCommEdit.commIndex = this.inv_resellerCommissionForm.value.commIndex;

    api_resCommEdit.commission_type = this.commissionType_value;
    api_resCommEdit.commission_value = $('#CommissionValue_WFA_ID1_').val();
    api_resCommEdit.commission_amt = $('#CommissionAmount1_WFA_ID1_').val();
    api_resCommEdit.pdf_show = this.inv_resellerCommissionForm.value.pdf_show;
    api_resCommEdit.reseller_comm_id = this.inv_resellerCommissionForm.value.reseller_comm_id;
    if (this.ResellerName_Customer == undefined || this.ResellerName_Customer == 'undefined' || this.ResellerName_Customer == 'null' || this.ResellerName_Customer == null || this.ResellerName_Customer == '') {
      this.spinner.hide();
      iziToast.error({
        message: "Reseller Name Missing",
        position: 'topRight'
      });
      return false;

    } else {
      api_resCommEdit.reseller_name = this.ResellerName_Customer;
    }

    api_resCommEdit.reseller_id = this.ResellerId_Customer;
    api_resCommEdit.grossAmount = this.inv_resellerCommissionForm.value.grossAmount;


    api_resCommEdit.recured_date_new = this.inv_resellerCommissionForm.value.date;
    api_resCommEdit.recurring_state = this.recurring_State_value;
    api_resCommEdit.recurring_date = this.inv_resellerCommissionForm.value.recurringDate;
    api_resCommEdit.recurring_date_checkbox = this.CBV_setResellerRecurring;
    api_resCommEdit.recurringDuration = this.inv_resellerCommissionForm.value.recurringDuration;
    api_resCommEdit.next_recurring_date = this.inv_resellerCommissionForm.value.nextRecDt;
    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#inv_ResellerCommissionFormId').modal('hide');
      $('#inv_ResellerCommissionFormId').on('hidden.bs.modal', () => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
      });

      if (response != '') {
        this.spinner.hide();
        this.getInvoice1({});
        iziToast.success({
          message: "Reseller Payment Updated Successfully ",
          position: 'topRight'
        });

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
        //   console.log("final error", error);
      };
    this.spinner.hide();

  }
  update_WFA_ResellerCommission_formArray() {

    // console.log("form array values- this.resellerCommissionForm.value.addresses_rc", this.resellerCommissionForm.value.addresses_rc)
    var addr1 = this.resellerCommissionForm.value.addresses_rc;
    // console.log("length", addr1.length)
    for (let i = 0; i < addr1.length; i++) {
      // console.log(i)
      // console.log(document.getElementById("CommissionAmount1_WFA_ID1_" + i).innerHTML)
      setTimeout(() => {
        // console.log(this.resellerCommissionForm.value.addresses_rc[i].commission_amt)
      }, 2000);

      // console.log("form array-reseller_name", this.resellerCommissionForm.value.addresses_rc[i].reseller_name.customerName);
      // console.log("form array-billChildid1", this.resellerCommissionForm.value.addresses_rc[i].billChildid1);
      // console.log("form array-CommissionType_", this.resellerCommissionForm.value.addresses_rc[i].CommissionType_);
      // console.log("form array-commission_value", this.resellerCommissionForm.value.addresses_rc[i].commission_value);
      // console.log("form array-commission_amt", this.resellerCommissionForm.value.addresses_rc[i].commission_amt);
      // console.log("form array-reseller_comm_id", this.resellerCommissionForm.value.addresses_rc[i].reseller_comm_id);
      // console.log("form array-commIndex", this.resellerCommissionForm.value.addresses_rc[i].commIndex);
      // console.log("form array-reseller_id", this.resellerCommissionForm.value.addresses_rc[i].reseller_id);
      // console.log("form array-billId", this.resellerCommissionForm.value.addresses_rc[i].billId);
      // console.log("form array-grossAmount", this.resellerCommissionForm.value.addresses_rc[i].grossAmount);
    }


    // $("#faqhead" + i).modal("hide");
    // $("body").removeClass("modal-open");
    let api_req: any = new Object();
    let api_resCommEdit: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/update_reseller_commission_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_resCommEdit.action = "update_reseller_commission_details";
    api_resCommEdit.billId = this.billId_ResellerCommissionId;
    api_resCommEdit.user_id = localStorage.getItem('erp_c4c_user_id');

    //  this.addr = this.resellerCommissionForm.value.addresses_rc;
    //  api_resCommEdit.billchild_values = this.addr;



    var addr1 = this.resellerCommissionForm.value.addresses_rc;
    // console.log("addr1-test-commission amount", $('#CommissionAmount1_WFA_ID1_0').val());
    // console.log("addr1-test-resellername", $('#reseller_name0').val());
    // return false;
    for (let i = 0; i < addr1.length - 1; i++) {


      // console.log("i value", i);
      addr1[i].billChildid1 = $('#billChildid1' + i).val();
      addr1[i].commIndex = $('#commIndex' + i).val();
      addr1[i].reseller_name = this.resellerCommissionForm.value.addresses_rc[i].reseller_name.customerName
      addr1[i].commission_type = $('#CommissionType_' + i).val();
      addr1[i].commission_value = $('#CommissionValue_WFA_ID1_' + i).val();

      addr1[i].commission_amt = $('#CommissionAmount1_WFA_ID1_' + i).val();
      addr1[i].pdf_show = $('#pdf_show' + i).val();
      addr1[i].reseller_comm_id = $('#reseller_comm_id' + i).val();
      addr1[i].reseller_id = $('#reseller_id' + i).val();
      addr1[i].billId = $('#billId' + i).val();
      addr1[i].grossAmount = $('#grossAmount' + i).val();
    }
    // console.log("addr1", addr1);

    api_resCommEdit.billchild_values = addr1;

    api_req.element_data = api_resCommEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#inv_ResellerCommissionFormId').modal('hide');
      $('#inv_ResellerCommissionFormId').on('hidden.bs.modal', () => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
      });


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
        //  console.log("final error", error);
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
        $('#ResellerCommissionFormId').modal('hide');
        $('#ResellerCommissionFormId').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "No Match. Please try again",
          position: 'topRight'
        });
        $('#ResellerCommissionFormId').modal('hide');
        $('#ResellerCommissionFormId').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });
      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        $('#ResellerCommissionFormId').modal('hide');
        $('#ResellerCommissionFormId').on('hidden.bs.modal', () => {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });
        //  console.log("final error", error);
      };


  }
  setActualCostSave() {

    // console.log(this.actualCost_ProductList);
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
    // console.log(this.actualCost_ProductList);
    // console.log("form array group", this.setActualCost_FormGroup.value.addresses_actualCost)
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
      // console.log(response);


      // console.log("set actual cost response", response);
      if (response.status == true) {
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

        $("#setActualCostId_inv").modal("hide");


      }

    });

  }
  get_actual_total() {
    var bill_cnt = $('#quotationChildId_count').val();
    // console.log("bill_cnt", bill_cnt)
    let actual_cost, product_qty, product_rate, actual_net_tot, actual_percentage;
    let product_net_amt, act_diff_amt;
    let actual_cost_tot = 0;
    let actual_cost_net_tot = 0;
    let act_diff_amt_tot = 0;

    for (let i = 1; i < bill_cnt; i++) {
      if ($('#invisiable_state_' + i).val() == 0) {
        // console.log('test');
        actual_cost = $('#actual_cost_' + i).val();
        product_qty = $('#product_qty_' + i).val();
        product_rate = $('#product_rate_' + i).val();
        product_net_amt = $('#product_net_amt_' + i).val();
        actual_percentage = $('#actual_percentage_' + i).val();
        // console.log("product_rate", product_rate);
        // console.log("actual_cost", actual_cost);
        // console.log("actual_percentage", actual_percentage);
        // console.log("product_qty", product_qty);
        // console.log("product_net_amt", product_net_amt);
        if (actual_cost == '') {
          actual_cost = 0;
        }
        // break
        if (actual_percentage > 0) {
          actual_cost = (parseFloat(product_rate) * parseFloat(actual_percentage) / 100).toFixed(2);
          $('#actual_cost_' + i).val(actual_cost);
        }
        actual_net_tot = (parseFloat(product_qty) * parseFloat(actual_cost)).toFixed(2);
        // console.log("actual_net_tot", actual_net_tot);
        act_diff_amt = (parseFloat(product_net_amt) - parseFloat(actual_net_tot)).toFixed(2);
        // console.log("act_diff_amt", act_diff_amt);
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
  showTooltip() {

    var tooltip = $('#tooltip').val();
    tooltip.style.visibility = "visible";
  }

  hideTooltip() {
    var tooltip = $('#tooltip').val();

    tooltip.style.visibility = "hidden";
  }


  setResellerRecurringUpdate() {
    this.spinner.show();


    let api_req: any = new Object();
    let api_recurringUpd: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reseller_recurring_set";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_recurringUpd.action = "reseller_recurring_set";

    api_recurringUpd.billId = 4567;

    api_recurringUpd.recured_date_new = this.setResellerRecurringForm.value.date;
    api_recurringUpd.recurring_state = this.setResellerRecurringForm.value.recurring_state;
    api_recurringUpd.recurring_date = this.setResellerRecurringForm.value.recurringDate;
    api_recurringUpd.recurring_date_checkbox = this.CBV_setResellerRecurring;
    api_recurringUpd.recurringDuration = this.setResellerRecurringForm.value.recurringDuration;


    api_req.element_data = api_recurringUpd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      $('#RecurringFormIdPE_inv').modal('hide');
      $('#RecurringFormIdPE_inv').on('hidden.bs.modal', () => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
      });

      if (response.status == true) {
        iziToast.success({
          message: "Set Reseller Recurring Details Updated Successfully",
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

        //  console.log("final error", error);
      };

  }
  handleChange_SSTax(event: any) {
    this.sstCheckbox = event.target.checked;
    // console.log("this.sstCheckbox", this.sstCheckbox);

  }
  clearInvSendingMethod() {
    $('#InvoiceSendingMethodFormId_inv').modal('hide');
  }
  clearInvSharePerm() {
    $('#sharPerissionFormId_inv').modal('hide');
  }
  clearProcessPay() {
    $('#processPaymentId_inv').modal('hide');
  }
  clearEmail() {
    $('#emailFormId_inv').modal('hide');
  }
  clearRecur() {
    $('#RecurringFormId_inv').modal('hide');

  }
  clearInvRecur() {
    $('#RecurringFormIdPE_inv').modal('hide');
  }
  clearCouponAss() {
    $('#couponAssignFormId').modal('hide');
  }
  clearInFileAtt() {
    $('#fileAttachmentFormId_inv').modal('hide');
  }
  clearSetTerms() {
    $('#settermsConditionFormId_inv').modal('hide');
  }
  clearInvRev() {
    $('#InvoiceRevenueFormId_inv').modal('hide');
  }
  clearDeliveryOrder() {
    $('#DeliveryOrderFormId_inv').modal('hide');
  }
  clearTypeName() {
    $('#setInvoiceTypeNameFormId_inv').modal('hide');
  }
  clearNotes() {
    $('#NotesFormId_inv').modal('hide');
  }
  clearReseComm() {
    $('#inv_ResellerCommissionFormId').modal('hide');
  }
  clearActCost() {
    $('#setActualCostId_inv').modal('hide');
  }
  clearLicenseDet() {
    $('#LicenseDetailsFormId_inv').modal('hide');
  }
  clearInvQuot() {
    $('#InvoicetoQuotationFormId_inv').modal('hide');
  }
  clearSearIv() {
    $('#searchInvoiceFormId').modal('hide');
  }
  clearSuspIv() {
    $('#suspendInvoiceFormId').modal('hide');
  }
  clearSSTTax() {
    $('#sstTaxFormId_inv').modal('hide');
  }
  clearEInvoice() {
    $('#eInvoiceFormId_inv').modal('hide');
  }
  clearAction(i: any) {
    $("#ActionId" + i).modal("hide");
  }

}


