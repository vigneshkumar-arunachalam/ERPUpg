import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-didinvoice',
  templateUrl: './didinvoice.component.html',
  styleUrls: ['./didinvoice.component.css']
})
export class DidinvoiceComponent implements OnInit {
  DID_list: any;
  biller_list: any;
  biller_temp: any;

  quotationSharedPerson_List: any;
  sharePermissionBillId: any;
  quotationSharedPerson_EditOnLoad_Values: any;
  quotationSharedPerson_List1: any;
  CheckBox_DynamicArrayList_quotationSharedPerson: any;
  quotationSharedResult: any;

  // invoice Share Permission
  SharePermission_BillerID: any;
  SharePermission: FormGroup;

  //list-checkbox all
  checkbox_value: any;
  edit_array: any = [];
  // set-Invoice-type-name

  setInvoiceType: FormGroup;
  InvoiceType_BillerID: any
  InvoiceTypeList: any;

  // invoice sending method 

  InvoiceSendingMethod: FormGroup;

  //term
  setTermCondition: FormGroup;
  TermDetailsList: any;
  TermCondition_BillerID: any;
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
   //auto complete search
   searchResult: any;
   searchResult_CustomerID: any;
   quotationId_new: any;
   searchResult_CustomerName: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //local storage
  user_ids:any;
  revenueTypeList:any;
  constructor(private serverService: ServerService, private router: Router) { }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    
    this.getInvoice({});
    this.yearsList = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    this.exportState_Radio = [
      { name: 'Local', selected: true, id: 1 },
      { name: 'Export', selected: false, id: 2 },
      { name: 'Zero Valid', selected: false, id: 3 },

    ];
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.setInvoiceType = new FormGroup({
      'setInvoice': new FormControl(null),

    });
    this.setTermCondition = new FormGroup({
      'setTerm': new FormControl(null),

    });

    this.InvoiceSendingMethod = new FormGroup({
      'setTerm': new FormControl(null),

    });

    this.SharePermission = new FormGroup({
      'share_permission': new FormControl(null),

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
  }

  getInvoice(data: any) {
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_DidList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_DidList.action = "invoice_list";
    api_DidList.user_id = localStorage.getItem("erp_c4c_user_id");
    api_DidList.off_set = list_data.offset;
    api_DidList.limit_val = list_data.limit;
    api_DidList.current_page = "";

    api_req.element_data = api_DidList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("PI list", response);
      if (response) {
        this.DID_list = response.proforma_details;

        this.biller_list = response.biller_details;
        this.revenueTypeList = response.revenue_list;

        console.log("proforma_details list", this.DID_list)
        console.log("this.biller_list", this.biller_list)

        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
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

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  addDidGo() {
    this.router.navigate(['/addDidInvoice'])
  }

  editDidGo(id: any) {
    var editbillID = id;
    this.router.navigate(['/editDidInvoice'])
    this.router.navigate(['/editDidInvoice'], {
      queryParams: {
        e_editBillID: editbillID,
      }
    });
  }


  setInvoiceTypeNameEdit(id: any) {
    this.InvoiceType_BillerID = id;

    let api_req: any = new Object();
    let api_invoiceTyp: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceTyp.action = "invoice_type_get";

    api_invoiceTyp.billId = id;
    api_invoiceTyp.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invoiceTyp;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.InvoiceTypeList = response.invoice_type_det;
        console.log("response.selected_invoice_type", response.selected_invoice_type)
        this.setInvoiceType.patchValue({
          'setInvoice': response.selected_invoice_type
        })

        iziToast.success({
          message: "Invoice Type Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
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

    let api_req: any = new Object();
    let api_invTypeUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invTypeUpdate.action = "invoice_type_update";
    api_invTypeUpdate.billId = this.InvoiceType_BillerID;
    api_invTypeUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_invTypeUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {


        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#setInvoiceTypeNameFormId').modal("hide");
      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
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
  setInvoiceTypeClear() {
    this.setInvoiceType.reset();
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
  recurring_onlyCHK(event: any) {
    this.CBV_recurring_only = event.target.checked;

  }
  dont_select_did_invoiceCHK(event: any) {
    this.CBV_dont_select_did_invoice = event.target.checked;

  }
  RevenueTypeWiseShowCHK(event: any) {
    this.CBV_RevenueTypeWiseShow = event.target.checked;
    console.log(" this.CBV_RevenueTypeWiseShow",  this.CBV_RevenueTypeWiseShow)
  }
  handleChange_RevenueTypeWiseShow(event: any){
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

      this.searchResult = response.customer_names;
      console.log("vignesh-advanced search result", this.searchResult);
      if (response.status = true) {
      }
    });
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }

  setTermsConditionEdit(id: any) {
    // this.setInvoiceType.reset();
    this.TermCondition_BillerID = id;

    let api_req: any = new Object();
    let api_insertProforma: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProforma.action = "terms_condition_get";

    api_insertProforma.billId = id;
    api_insertProforma.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_insertProforma;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.TermDetailsList = response.terms_details;
        this.setTermCondition.patchValue({
          'setTerm': response.selected_terms
        })

        iziToast.success({
          message: "Term Condition Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#settermsConditionFormId').modal("hide");
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

    let api_req: any = new Object();
    let api_insertProformaUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProformaUpdate.action = "terms_condition_update";
    api_insertProformaUpdate.billId = this.TermCondition_BillerID;
    api_insertProformaUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_insertProformaUpdate.terms_values = this.setTermCondition.value.setTerm;
    api_req.element_data = api_insertProformaUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {


        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#settermsConditionFormId').modal("hide");
      } else {

        $('#settermsConditionFormId').modal("hide");
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
    this.setTermCondition.reset();
  }


  invoiceSharedPersonEdit(billId: any) {
    this.sharePermissionBillId = billId;
    let api_req: any = new Object();
    let quot_share_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_shared_person"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_req.action = "invoice_shared_person";

    quot_share_req.billId = this.sharePermissionBillId;
    quot_share_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = quot_share_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {


        this.quotationSharedPerson_EditOnLoad_Values = response.access_userid;
        this.quotationSharedPerson_List = response.user_list;
        this.quotationSharedPerson_List1 = response.access_userid;
        this.quotationSharedResult = response.user_list;
        this.CheckBox_DynamicArrayList_quotationSharedPerson = response.access_userid.split(',');
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_quotationSharedPerson)

      }
      else {
        // $("#sharePerissionFormId").modal("hide");
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

  invoiceSharedPersonUpdate() {

    let api_req: any = new Object();
    let api_insertProformaUpdate: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_shared_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProformaUpdate.action = "invoice_shared_update";
    api_insertProformaUpdate.billId = this.SharePermission_BillerID;
    api_insertProformaUpdate.user_id = localStorage.getItem('erp_c4c_user_id');
    api_insertProformaUpdate.shared_user_id = this.SharePermission.value.share_permission;
    api_req.element_data = api_insertProformaUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {


        iziToast.success({
          message: "Share Permission Updated Successfully",
          position: 'topRight'

        });
        $('#settermsConditionFormId').modal("hide");
      } else {

        $('#settermsConditionFormId').modal("hide");
        iziToast.warning({
          message: " Share Permission not Updated. Please try again",
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
  EditCHK(billId: any, event: any) {
    console.log("List - CheckBox ID", billId);
    // this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array.push(billId);
      console.log("Final Checkbox After checkbox selected list", this.edit_array);

    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === billId)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }

}
