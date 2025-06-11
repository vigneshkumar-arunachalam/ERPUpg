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
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-add-mul-inv-pay',
  templateUrl: './add-mul-inv-pay.component.html',
  styleUrls: ['./add-mul-inv-pay.component.css']
})
export class AddMulInvPayComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  cusID: any[] = [];
  currentDate: string;
  edit_array_pending: any = [];
  edit_array_netPayment: any = [];
  edit_array_balanceAmt: any = [];
  groupSelectCommonId_pending: any;
  checkbox_value_pending: any;
  searchResult_CustomerID_add: any;
  searchResult_CustomerName_add: any;
  Pay_Pending_list: any[] = [];
  Pay_Pending_list_show: boolean[] = new Array().fill(false);
  searchResult_add: any;
  keywordCompanyName_add = 'customerName';
  paymentType_payment: any;
  BalanceAmounttotal: any;
  InvoiceAmounttotal: any;
  incrementVariable: any = 0;
  CustomerIDUpdate: any;
  invAmtDropDown: any;
  customerDATAOverall: any;
  searchResult_item: any;
  savedI: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.PaymentMethodDefaultLoad();
  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    // $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
    this.edit_array_pending = [];
    this.Pay_Pending_list_show[this.savedI] = true;
    // this.Pay_Pending_list[this.savedI]=[];
    // this.incrementVariable++;


  }
  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      customer_name: '',
      paymentDate: [this.formatDate(new Date())],
      invoice_amt: '',
      bal_amount: '',
      paid_amt: '',
      payment_method: '',
      note: '',

      bill_id: '',

      net_payment: '',

    });
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  selectEventCustomer_add(item: any, i: any) {
    // console.log(item)
    this.searchResult_item = item;
    this.searchResult_CustomerID_add = item.customerId;
    this.searchResult_CustomerName_add = item.customerName.trim();
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.cusID[i] = item.customerId;
    //  console.log("this.cusID[i]", this.cusID[i])
    this.payment_pending_inv_list(i);

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
  selectAll_pending(event: any, i: any) {

    // Check if the event target is checked
    // console.log("jdhff", i);
    const isChecked1 = event.target.checked;
    // Reset both totals
    this.BalanceAmounttotal = 0;
    this.InvoiceAmounttotal = 0;

    // Reset edit_array_pending
    this.edit_array_pending = [];

    // Iterate over the Pay_Pending_list array
    this.Pay_Pending_list[i].forEach((list: any) => {
      // console.log("list", list)
      // Update the checkbox state for each item
      list.isChecked = isChecked1;

      // Update the edit_array_pending based on the isChecked status and performa_invoice
      if (isChecked1 == true && list.performa_invoice === 0) {
        this.edit_array_pending.push(list.billId);
        this.edit_array_netPayment.push(list.netPayment);
        this.edit_array_balanceAmt.push(list.balance_amt);
        // If it's checked and performa_invoice is 0, add balance_amt and netPayment to corresponding totals
        this.BalanceAmounttotal += list.balance_amt;
        this.InvoiceAmounttotal += list.netPayment;
      }
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single' + i);
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked1;
    });

    // console.log("Checkbox-all", this.edit_array_pending);
    // console.log("BalanceAmounttotal", this.BalanceAmounttotal);
    // console.log("InvoiceAmounttotal", this.InvoiceAmounttotal);
    $('#pd_invAmount_' + i).val(this.InvoiceAmounttotal);
    $('#pd_balAmount_' + i).val(this.BalanceAmounttotal);
    $('#pd_paidAmount_' + i).val(this.BalanceAmounttotal);

    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addressFormGroup = addressesArray.at(i) as FormGroup;
    addressFormGroup.patchValue({
      invoice_amt: this.InvoiceAmounttotal,
      bal_amount: this.BalanceAmounttotal,
      paid_amt: this.BalanceAmounttotal,
      bill_id: this.edit_array_pending,
    });


  }


  EditCHK_pending(billid: any, netPayment: any, balance_amt: any, event: any, i: any) {

    // console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_pending = billid;
    this.checkbox_value_pending = event.target.checked;
    //  console.log(this.checkbox_value_pending);

    // Check if data is not undefined
    if (billid !== undefined) {
      if (this.checkbox_value_pending) {
        // Check if data is not already in the array and is not undefined
        if (!this.edit_array_pending.includes(billid)) {
          this.edit_array_pending.push(billid);
          this.edit_array_netPayment.push(netPayment);
          this.edit_array_balanceAmt.push(balance_amt);
        }
      } else {
        const index = this.edit_array_pending.findIndex((el: any) => el === billid);
        if (index > -1) {
          this.edit_array_pending.splice(index, 1);
          this.edit_array_netPayment.splice(index, 1);
          this.edit_array_balanceAmt.splice(index, 1);
        }
      }

      // Recalculate BalanceAmounttotal and InvoiceAmounttotal based on the updated edit_array_pending

      this.BalanceAmounttotal = 0;
      this.InvoiceAmounttotal = 0;

      // Iterate over Pay_Pending_list and update totals for selected items
      this.Pay_Pending_list[i].forEach((list: any) => {
        if (this.edit_array_pending.includes(list.billId) && list.performa_invoice === 0) {
          this.BalanceAmounttotal += list.balance_amt;
          this.InvoiceAmounttotal += list.netPayment;
        }
      });

      console.log("Final Checkbox After checkbox selected list", this.edit_array_pending);
      // console.log("BalanceAmounttotal", this.BalanceAmounttotal);
      // console.log("InvoiceAmounttotal", this.InvoiceAmounttotal);

      $('#pd_invAmount_' + i).val(this.InvoiceAmounttotal);
      $('#pd_balAmount_' + i).val(this.BalanceAmounttotal);
      $('#pd_paidAmount_' + i).val(this.BalanceAmounttotal);

      const addressesArray = this.addPI_section2.get('addresses') as FormArray;
      const addressFormGroup = addressesArray.at(i) as FormGroup;
      addressFormGroup.patchValue({
        invoice_amt: this.InvoiceAmounttotal,
        bal_amount: this.BalanceAmounttotal,
        paid_amt: this.BalanceAmounttotal,
        bill_id: this.edit_array_pending,
      });

    }
  }


  payment_pending_inv_list(index: number) {
    const api_req = {
      moduleType: "multipleInvoicePayment",
      api_url: "multipleInvoicePayment/get_customer_id_payment_pending_inv_list",
      element_data: {
        user_id: localStorage.getItem("erp_c4c_user_id"),
        customer_name: this.searchResult_CustomerName_add, // Set appropriately
        customerId: this.searchResult_CustomerID_add, // Set appropriately
      }
    };

    this.serverService.sendServer(api_req).subscribe({
      next: (response: any) => {
        if (response.status === "true") {
          this.Pay_Pending_list[index] = response.data;
          this.Pay_Pending_list_show[index] = true;
        } else {
          iziToast.warning({ message: "No Data", position: 'topRight' });
        }
      },
      error: () => {
        iziToast.error({ message: "Server Error", position: 'topRight' });
      }
    });
  }


  clearSelection1(event: any, i: any) {
    console.log("i value", i)
     const addressesArray7 = this.addPI_section2.get('addresses') as FormArray;
    const addressFormGroup7 = addressesArray7.at(i) as FormGroup;
    addressFormGroup7.patchValue({
      bal_amount: '',
      net_payment: ''
    });
    // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID_add = '';
    this.searchResult_CustomerName_add = '';

    this.edit_array_pending = [];


    (this.addPI_section2.get('addresses') as FormArray).at(i).get('invoice_amt').reset();
    (this.addPI_section2.get('addresses') as FormArray).at(i).get('bal_amount').reset();
    (this.addPI_section2.get('addresses') as FormArray).at(i).get('paid_amt').reset();
   
    this.clearAddMulInvPay();
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.Pay_Pending_list_show[i] = false;
  }
  onFocusedCustomer_add(e: any) {
    // do something when input is focused
  }
  searchCustomerData_add(data: any) {
    // alert("hi");
    console.log("data", data);
    this.customerDATAOverall = data;
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

        // console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult_add = response.customer_names;
        // console.log("vignesh-advanced search result", this.searchResult_add);
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
  addPaymentEntry1(i: any) {



    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/addPaymentEntry"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "addPaymentEntry";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.customerId = this.addPI_section2.value.addresses[0].customer_name.customerId;
    api_mulInvpay.customerId = this.cusID[i];
    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    // Customize the 'api_mulInvpay' object with address data at index i
    const api_mulInvpay1: any = {
      invoice_amt: addressDataAtIndex.invoice_amt,
      paid_amt: addressDataAtIndex.paid_amt,
      payment_method: addressDataAtIndex.payment_method,
      note: addressDataAtIndex.note,
      paymentDate: addressDataAtIndex.paymentDate,
      bill_id: addressDataAtIndex.bill_id,
      net_payment: addressDataAtIndex.net_payment
    };

    // Ensure non-null values before sending
    if (!api_mulInvpay.paymentDate || !api_mulInvpay.invoice_amt || !api_mulInvpay.paid_amt) {
      console.error('Missing required values for address at index', i);
      return; // Skip sending if essential values are missing
    }




    // api_mulInvpay.values = api_mulInvpay1;
    api_mulInvpay.invoice_amt = addressDataAtIndex.invoice_amt;
    api_mulInvpay.paid_amt = addressDataAtIndex.paid_amt;
    api_mulInvpay.bal_amount = addressDataAtIndex.bal_amount;

    //  api_mulInvpay.invoice_amt = $('#pd_invAmount_' + i).val();
    // api_mulInvpay.paid_amt =  $('#pd_paidAmount_' + i).val();
    // api_mulInvpay.bal_amount=$('#pd_balAmount_' + i).val();

    var check = addressDataAtIndex.paymentDate;
    //  console.log("samu", check);
    if (check == '' || check == 'undefined' || check == undefined) {
      iziToast.error({
        message: "Payment Method Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_mulInvpay.payment_method = addressDataAtIndex.paymentDate;
    }

    api_mulInvpay.note = addressDataAtIndex.note;

    var originalDate = $('#pd_date_' + i).val();
    if (originalDate == '' || originalDate == 'undefined' || originalDate == undefined) {
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      var parts = originalDate.split("-");
      var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      api_mulInvpay.paymentDate = formattedDate;
    }



    //var invoice_amt = $('#pd_invAmount_' + i).val();
    var invoice_amt = parseFloat($('#pd_invAmount_' + i).val()).toFixed(2);
    //var bal_amount = $('#pd_balAmount_' + i).val();
    var bal_amount = parseFloat($('#pd_balAmount_' + i).val()).toFixed(2);
    // var paid_amt = $('#pd_paidAmount_' + i).val();
    var paid_amt = parseFloat($('#pd_paidAmount_' + i).val()).toFixed(2);
    var payment_method = $('#pd_paymenttype_' + i).val();
    var note = $('#pd_note_' + i).val();

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();

        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });

        this.router.navigate(['/multipleInvPayment']);

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
  addPaymentEntry(i: any) {

    this.savedI = i;

    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/addPaymentEntry"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "addPaymentEntry";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.customerId = this.addPI_section2.value.addresses[0].customer_name.customerId;
    api_mulInvpay.customerId = this.cusID[i];
    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    // Customize the 'api_mulInvpay' object with address data at index i
    const api_mulInvpay1: any = {
      invoice_amt: parseFloat(addressDataAtIndex.invoice_amt).toFixed(2),
      paid_amt: parseFloat(addressDataAtIndex.paid_amt).toFixed(2),
      payment_method: addressDataAtIndex.payment_method,
      bal_amount: parseFloat(addressDataAtIndex.bal_amount).toFixed(2),
      note: addressDataAtIndex.note,
      paymentDate: addressDataAtIndex.paymentDate,
      bill_id: addressDataAtIndex.bill_id,
      net_payment: addressDataAtIndex.net_payment
    };


    if (parseFloat(addressDataAtIndex.invoice_amt).toFixed(2) != 'NaN') {
      api_mulInvpay.invoice_amt = parseFloat(addressDataAtIndex.invoice_amt).toFixed(2);
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Invoice Amount Missing.Select Appropriate Customer",
        position: 'topRight'
      });
      return false;

    }
    if (parseFloat(addressDataAtIndex.paid_amt).toFixed(2) != 'NaN') {
      api_mulInvpay.paid_amt = parseFloat(addressDataAtIndex.paid_amt).toFixed(2);
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Paid Amount Missing.Select Appropriate Customer",
        position: 'topRight'
      });
      return false;

    }
    if (parseFloat(addressDataAtIndex.bal_amount).toFixed(2) != 'NaN') {
      api_mulInvpay.bal_amount = parseFloat(addressDataAtIndex.bal_amount).toFixed(2);
    } else {
      this.spinner.hide();
      iziToast.error({
        message: "Balance Amount Missing.Select Appropriate Customer",
        position: 'topRight'
      });
      return false;

    }


    // api_mulInvpay.bill_id = addressDataAtIndex.bill_id;
    api_mulInvpay.bill_id = this.edit_array_pending;
    api_mulInvpay.net_payment = this.edit_array_netPayment;
    api_mulInvpay.bal_amount = this.edit_array_balanceAmt;

    var check = addressDataAtIndex.payment_method;

    if (check == '' || check == 'undefined' || check == undefined) {
      iziToast.error({
        message: "Payment Method Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_mulInvpay.payment_method = addressDataAtIndex.payment_method;
    }

    api_mulInvpay.note = addressDataAtIndex.note;

    var originalDate = $('#pd_date_' + i).val();
    if (originalDate == '' || originalDate == 'undefined' || originalDate == undefined) {
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      var parts = originalDate.split("-");
      var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      api_mulInvpay.paymentDate = formattedDate;
    }

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        // this.mulInvPaymentList({});
        this.edit_array_pending = [];
        this.edit_array_netPayment = [];
        this.edit_array_balanceAmt = [];
        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        // this.payment_pending_inv_list(i);
        // this.router.navigate(['/multipleInvPayment']);
        // window.location.reload();

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Data Already Saved",
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
  clearAddMulInvPay() {
    // const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    // addressesArray.clear();
    this.addressControls.clear();
    this.edit_array_pending = [];
    this.addPI_section2.reset({
      addresses: [this.createAddress()]
    });
    this.addAddress()

    // this.clearSelection1({},{})

    // this.addPI_section2 = this.fb.group({
    //   addresses: this.fb.array([this.createAddress()])
    // });
  }
  mulInvPaymentList() {
    this.router.navigate(['/multipleInvPayment']);
  }



  InvoicetoProforma(id: any, index: number) {
    Swal.fire({
      title: 'Confirm Conversion',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, convert!'
    }).then((result) => {
      if (result.isConfirmed) {
        const api_req = {
          moduleType: "invoice",
          api_url: "invoice/proforma_convert_to_invoice",
          element_data: {
            action: "proforma_convert_to_invoice",
            user_id: localStorage.getItem('erp_c4c_user_id'),
            billId: id
          }
        };

        this.serverService.sendServer(api_req).subscribe({
          next: (response: any) => {
            if (response.status == true) {
              iziToast.success({ message: "Converted Successfully", position: 'topRight' });
              this.payment_pending_inv_list(index);
            } else {
              iziToast.warning({ message: "Conversion Failed", position: 'topRight' });
            }
          },
          error: () => {
            iziToast.error({ message: "Server Error", position: 'topRight' });
          }
        });
      }
    });
  }



  clearEditMulInv() {

    //  console.log("this.edit_array",this.edit_array)
    this.router.navigate(['/multipleInvPayment']);
  }
  selectEventCustomer_add1(item: any, i: any) {
    console.log(item)
    alert("coming1")

    this.searchResult_CustomerName_add = item;


  }
  searchCustomerData_add1(data: any) {
    // alert("hi");
    alert("coming2")
    console.log("data", data);

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

        // console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult_add = response.customer_names;
        // console.log("vignesh-advanced search result", this.searchResult_add);
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
  clearSelection2(event: any, i: any) {
    // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID_add = '';
    this.searchResult_CustomerName_add = '';


    this.Pay_Pending_list_show[i] = false;
  }

}
