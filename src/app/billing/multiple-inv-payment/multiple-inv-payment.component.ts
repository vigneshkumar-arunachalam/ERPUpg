import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'
import { ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-multiple-inv-payment',
  templateUrl: './multiple-inv-payment.component.html',
  styleUrls: ['./multiple-inv-payment.component.css']
})
export class MultipleInvPaymentComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;

  //others
  result: any;
  user_ids: string;
  mulInvPay_list: any;
  // checkbox
  groupSelectCommonId: any;
  checkbox_value: any;
  edit_array: any = [];
  // inner checkbox
  groupSelectCommonId_pending: any;
  checkbox_value_pending: any;
  edit_array_pending: any = [];
  // form array
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  searchResult_CustomerID_add: any;
  searchResult_CustomerName_add: any;
  searchResult_add: any;
  keywordCompanyName_add = 'customerName';
  paymentType_payment: any;
  Pay_Pending_list: any;
  Pay_Pending_list_show: boolean = false;
  currentDate: string;
  BalanceAmounttotal: any;
  InvoiceAmounttotal: any;
  incrementVariable: any = 0;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    var date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
   

   
   
  

    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.mulInvPaymentList({});
    this.PaymentMethodDefaultLoad();

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }


  addAddress(): void {
    $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
    this.incrementVariable++;
 

  }


  createAddress(): FormGroup {
    return this.fb.group({
      pd_company_Name: '',
      pd_date: '',
      pd_invAmount: '',
      pd_balAmount: '',
      pd_paidAmount: '',
      pd_paymenttype: '',
      pd_note: ''

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
  addMulInvPay() {
     $('.date-value').val(this.currentDate);

  }
  editMulInvPayGroup() {

  }
  selectEventCustomer_add(item: any) {
    console.log(item)
    this.searchResult_CustomerID_add = item.customerId;
    this.searchResult_CustomerName_add = item.customerName.trim();
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.payment_pending_inv_list();

  }

  clearSelection1(event: any) {
    console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID_add = '';
    this.searchResult_CustomerName_add = '';
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.Pay_Pending_list_show = false;
  }
  onFocusedCustomer_add(e: any) {
    // do something when input is focused
  }
  searchCustomerData_add(data: any) {

    if (data.length > 0) {
      // this.spinner.show();
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "customer";
      api_req.api_url = "customer/customer_name_search";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "customer_name_search";
      api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
      api_Search_req.customerName = data;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

        console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult_add = response.customer_names;
        console.log("vignesh-advanced search result", this.searchResult_add);
        if (response! = null) {
          this.searchResult_add = response.customer_names;
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
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  deleteMulInvPayGroup() {
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
        this.spinner.show();
        let api_req: any = new Object();
        let api_singleDelete: any = new Object();
        api_req.moduleType = "multipleInvoicePayment";
        api_req.api_url = "multipleInvoicePayment/groupDeleteInvoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_singleDelete.action = "groupDeleteInvoice";
        api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');
        api_singleDelete.inv_id = this.edit_array;
        api_req.element_data = api_singleDelete;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            this.spinner.hide();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.mulInvPaymentList({});
          } else {
            this.spinner.hide();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.mulInvPaymentList({});
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
    })

  }

  deleteFile(id: any) {

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
        this.spinner.show();
        let api_req: any = new Object();
        let api_singleDelete: any = new Object();
        api_req.moduleType = "multipleInvoicePayment";
        api_req.api_url = "multipleInvoicePayment/singleDeleteInvoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_singleDelete.action = "singleDeleteInvoice";
        api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');
        api_singleDelete.inv_id = id;
        api_req.element_data = api_singleDelete;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            this.spinner.hide();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.mulInvPaymentList({});
          } else {
            this.spinner.hide();
            iziToast.success({
              message: "Deleted Successfully",
              position: 'topRight'
            });
            this.mulInvPaymentList({});
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
    })


  }
  // selectAll(event: any) {

  //   if (event.target.checked == true) {

  //     this.mulInvPay_list.forEach((element: any, index: any) => {
  //       $("#check-grp-mulInv" + index).prop('checked', true);
  //     });
  //   } else {
  //     this.mulInvPay_list.forEach((element: any, index: any) => {
  //       $("#check-grp-mulInv" + index).prop('checked', false);
  //     });

  //   }
  //   console.log("Checkbox-all", this.edit_array);

  // }
  selectAll(event: any) {
    // Check if the event target is checked
    const isChecked = event.target.checked;

    // Iterate over the mulInvPay_list array
    this.mulInvPay_list.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked;

      // If it's checked, add payment_entry_no to the edit_array
      if (isChecked) {
        if (!this.edit_array.includes(list.payment_entry_no)) {
          this.edit_array.push(list.payment_entry_no);
        }
      } else {
        // If it's unchecked, remove payment_entry_no from the edit_array
        const index = this.edit_array.findIndex((el: any) => el === list.payment_entry_no);
        if (index > -1) {
          this.edit_array.splice(index, 1);
        }
      }
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_array);
  }


  EditCHK(data: any, event: any) {

    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value);

    // Check if data is not undefined
    if (data !== undefined) {
      if (this.checkbox_value) {
        // Check if data is not already in the array and is not undefined
        if (!this.edit_array.includes(data)) {
          this.edit_array.push(data);
        }
        console.log("Final Checkbox After checkbox selected list", this.edit_array);
      } else {
        const index = this.edit_array.findIndex((el: any) => el === data);
        if (index > -1) {
          this.edit_array.splice(index, 1);
        }
        console.log("Final Checkbox After Deselected selected list", this.edit_array);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_array);
  }

  selectAll_pending(event: any) {

    // Check if the event target is checked
    const isChecked1 = event.target.checked;

    // Reset both totals
    this.BalanceAmounttotal = 0;
    this.InvoiceAmounttotal = 0;

    // Reset edit_array_pending
    this.edit_array_pending = [];

    // Iterate over the Pay_Pending_list array
    this.Pay_Pending_list.forEach((list: any) => {
      // Update the checkbox state for each item
      list.isChecked = isChecked1;

      // Update the edit_array_pending based on the isChecked status and performa_invoice
      if (isChecked1 && list.performa_invoice === 0) {
        this.edit_array_pending.push(list.billId);
        // If it's checked and performa_invoice is 0, add balance_amt and netPayment to corresponding totals
        this.BalanceAmounttotal += list.balance_amt;
        this.InvoiceAmounttotal += list.netPayment;
      }
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked1;
    });

    console.log("Checkbox-all", this.edit_array_pending);
    console.log("BalanceAmounttotal", this.BalanceAmounttotal);
    console.log("InvoiceAmounttotal", this.InvoiceAmounttotal);
    $('#pd_invAmount_' + this.incrementVariable).val(this.InvoiceAmounttotal);
    $('#pd_balAmount_' + this.incrementVariable).val(this.BalanceAmounttotal);
    $('#pd_paidAmount_' + this.incrementVariable).val(this.BalanceAmounttotal);
  }



  EditCHK_pending(data: any, event: any) {

    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_pending = data;
    this.checkbox_value_pending = event.target.checked;
    console.log(this.checkbox_value_pending);

    // Check if data is not undefined
    if (data !== undefined) {
      if (this.checkbox_value_pending) {
        // Check if data is not already in the array and is not undefined
        if (!this.edit_array_pending.includes(data)) {
          this.edit_array_pending.push(data);
        }
      } else {
        const index = this.edit_array_pending.findIndex((el: any) => el === data);
        if (index > -1) {
          this.edit_array_pending.splice(index, 1);
        }
      }

      // Recalculate BalanceAmounttotal and InvoiceAmounttotal based on the updated edit_array_pending

      this.BalanceAmounttotal = 0;
      this.InvoiceAmounttotal = 0;

      // Iterate over Pay_Pending_list and update totals for selected items
      this.Pay_Pending_list.forEach((list: any) => {
        if (this.edit_array_pending.includes(list.billId) && list.performa_invoice === 0) {
          this.BalanceAmounttotal += list.balance_amt;
          this.InvoiceAmounttotal += list.netPayment;
        }
      });

      console.log("Final Checkbox After checkbox selected list", this.edit_array_pending);
      console.log("BalanceAmounttotal", this.BalanceAmounttotal);
      console.log("InvoiceAmounttotal", this.InvoiceAmounttotal);

      $('#pd_invAmount_' + this.incrementVariable).val(this.InvoiceAmounttotal);
      $('#pd_balAmount_' + this.incrementVariable).val(this.BalanceAmounttotal);
      $('#pd_paidAmount_' + this.incrementVariable).val(this.BalanceAmounttotal);

    }
  }




  payment_pending_inv_list() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/get_customer_id_payment_pending_inv_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "get_customer_id_payment_pending_inv_list";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.customer_name = this.searchResult_CustomerName_add;
    api_mulInvpay.customerId = this.searchResult_CustomerID_add;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();

        this.Pay_Pending_list = response;
        this.Pay_Pending_list_show = true;
        console.log("this.Pay_Pending_list", this.Pay_Pending_list)

        $("#searchInvoiceFormId").modal("hide");

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
  mulInvPaymentList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/getInvoiceList"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getInvoiceList";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.off_set = list_data.offset;
    api_mulInvpay.limit_val = list_data.limit;
    api_mulInvpay.current_page = "";
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.mulInvPay_list = response.dataList;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $("#searchInvoiceFormId").modal("hide");

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
  listDataInfo(list_data: any) {

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  InvoicetoProforma(id: any) {

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
            this.payment_pending_inv_list();
          } else {
            iziToast.warning({
              message: "Invoice to Proforma not converted. Please try again",
              position: 'topRight'
            });
            this.payment_pending_inv_list();
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
  addPaymentEntry() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/addPaymentEntry"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "addPaymentEntry";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    var addr = this.addPI_section2.value.addresses;
    console.log("this.addPI_section2.value.addresses", this.addPI_section2.value.addresses)
    for (let i = 0; i < addr.length; i++) {


      addr[i].customerId = $('#pd_company_Name_' + i).val();
      addr[i].paymentDate = $('#pd_date_' + i).val();
      addr[i].invoice_amt = $('#pd_invAmount_' + i).val();
      addr[i].bal_amount = $('#pd_balAmount_' + i).val();
      addr[i].paid_amt = $('#pd_paidAmount_' + i).val();
      addr[i].payment_method = $('#pd_paymenttype_' + i).val();
      addr[i].note = $('#pd_note_' + i).val();


    }
    api_mulInvpay.values = addr;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.mulInvPay_list = response.dataList;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $("#searchInvoiceFormId").modal("hide");

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


}
