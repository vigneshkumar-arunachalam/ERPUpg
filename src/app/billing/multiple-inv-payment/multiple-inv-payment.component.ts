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
  public editMulInvGroupForm: FormGroup;
  public addresses: FormArray;
  public edit_addresses: FormArray;
  searchResult_CustomerID_add: any;
  searchResult_CustomerName_add: any;
  searchResult_add: any;
  keywordCompanyName_add = 'customerName';
  paymentType_payment: any;
  Pay_Pending_list: any[] = [];
  Pay_Pending_list_show: boolean[] = new Array().fill(false);
  currentDate: string;
  BalanceAmounttotal: any;
  InvoiceAmounttotal: any;
  incrementVariable: any = 0;
  CustomerIDUpdate: any;
  invAmtDropDown: any;
  abc: string;
  dropdownData: any[] = [];
  cusID: any[] = [];
  searchResult: any;
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  searchMulInvForm: FormGroup;
  response_total_cnt: any;
  customerNameData: any;
  variableCustomerData: any;
  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
    this.editMulInvGroupForm = this.fb.group({
      edit_addresses: this.fb.array([this.edit_createAddress()])
    });
  }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    var date = new Date();
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');






    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.mulInvPaymentList({});
    this.PaymentMethodDefaultLoad();
    this.searchMulInvForm = new FormGroup({
      'company_Name': new FormControl(null)
    })

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  get editaddressControls() {
    return this.editMulInvGroupForm.get('edit_addresses') as FormArray
  }


  addAddress(): void {

    $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
    this.edit_array_pending = [];
    // this.incrementVariable++;


  }
  editAddress(): void {
    $('.date-value').val(this.currentDate);
    this.edit_addresses = this.editMulInvGroupForm.get('edit_addresses') as FormArray;
    this.edit_addresses.push(this.edit_createAddress());
    // this.incrementVariable++;


  }


  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      customer_name: '',
      paymentDate: [new Date().toISOString()],
      invoice_amt: '',
      bal_amount: '',
      paid_amt: '',
      payment_method: '',
      note: '',

      bill_id: '',

      net_payment: '',

    });
  }
  edit_createAddress(): FormGroup {
    return this.fb.group({
      customer_name: '',
      customer_id: '',
      payment_child_id: '',
      invoice_no: '',
      paymentDate: '',
      invoice_amt: '',
      balance_amt: '',
      paid_amt: '',
      payment_method: '',
      note: '',
      processId: '',
      billid: ''

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
    // window.location.reload();
    // this.Pay_Pending_list = []
    // $('.date-value').val(this.currentDate);
    this.router.navigate(['/addMulInvPay']);


  }
  searchMulInvPayGroup() {

  }
  keysearch(event: any) {
    this.searchResult_CustomerName = event.target.value
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

    this.variableCustomerData = data;

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

        // console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.customer_names;
        // console.log("vignesh-advanced search result", this.searchResult);
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
  clearEditMulInv() {
    this.edit_array = [];
    //  console.log("this.edit_array",this.edit_array)
    this.mulInvPaymentList({})
  }
  editMulInvPayGroup() {
    this.spinner.show();
    console.log("this.edit_array", this.edit_array)

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/groupEdit"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "groupEdit";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    // getting result as ["2001","2002"],,, need value as [2001,2002]
    const paymentIdsStrings = this.edit_array;
    const paymentIdsNumbers = paymentIdsStrings.map((id: string) => parseInt(id));
    api_mulInvpay.paymentId = paymentIdsNumbers;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();

        $("#editMulInvPayId").modal("show");


        this.spinner.hide();

        const formArray = new FormArray([]);
        this.invAmtDropDown = [];

        for (let index = 0; index < response.length; index++) {
          this.CustomerIDUpdate = response[index].customerId;
          this.invAmtDropDown = response[index].invoiceNo;
          this.dropdownData[index] = response[index].invoiceNo;
          // console.log("this.dropdownData[index]", this.dropdownData[index]);
          // let billIds = response[index].invoiceNo.map((invoiceItem: any) => invoiceItem.billId);

          formArray.push(this.fb.group({
            "customer_name": response[index].customerName,
            "invoice_no": response[index].invoiceId,
            // "paymentDate": response[index].date ,

            "paymentDate": this.datePipe.transform(response[index].date, 'yyyy-MM-dd'),
            "invoice_amt": response[index].invoiceAmount,
            "balance_amt": response[index].balanceAmount,
            "paid_amt": response[index].paidAmount,
            "payment_method": response[index].paymentType,
            "note": response[index].note,

            "customer_id": response[index].customerId,
            "payment_child_id": response[index].payment_child_id,
            "processId": response[index].processId,
            // "billid": response[index].invoiceNo.length > 0 ? response[index].invoiceNo[index].billId : null,
            // "billid": response[index].invoiceNo && response[index].invoiceNo.length > 0 ? response[index].invoiceNo[index].billId : null,
            "billid": response[index].invoiceNo && response[index].invoiceNo.length > 0 ? response[index].invoiceNo[index]?.billId : null,


          })
          );
        }
        // for(let index1=0;index1<response.length;index1++){
        //   formArray.push(this.fb.group({

        //     "billid": response[index1].invoiceNo.length > 0 ? response[index1].invoiceNo[index1].billId : null,

        //   })
        //   );

        // }
        this.editMulInvGroupForm.setControl('edit_addresses', formArray);
        // console.log("this.editMulInvGroupForm", this.editMulInvGroupForm);

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Select Atleast 1 Group to Edit",
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
  editMulInvPayGroup1() {
    const paymentIdsStrings = this.edit_array;
    const paymentIdsNumbers = paymentIdsStrings.map((id: string) => parseInt(id));
    console.log("this.edit_array---length", this.edit_array.length)
    if (this.edit_array.length > 0) {
      this.router.navigate(['/editMulInvPay'], {
        queryParams: {
          paymentIdsNumbers: paymentIdsNumbers,
        }
      });

    } else {
      iziToast.warning({
        message: "Select Atleast 1 Group to Edit",
        position: 'topRight'
      });

    }


  }
  updateMulInvPayment() {
    this.spinner.show();

    let api_req: any = new Object();
    let addRPAPI: any = new Object();
    api_req.moduleType = "multipleInvoicePayment";
    api_req.api_url = "multipleInvoicePayment/groupUpdate";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addRPAPI.action = "groupUpdate";
    addRPAPI.user_id = localStorage.getItem('erp_c4c_user_id');
    addRPAPI.billchild_values = this.editMulInvGroupForm.value.edit_addresses;
    // var abc=  this.editMulInvGroupForm.value.edit_addresses.get('customer_name').value;
    //  var bg= (this.editMulInvGroupForm.get('edit_addresses') as FormArray).at(0).get('customer_name').value;
    //  console.log("bg",bg)
    //  alert(bg);
    //  return false;
    // alert(this.searchResult_CustomerID_add)
    // if (this.searchResult_CustomerID_add == '' || this.searchResult_CustomerID_add == 'undefined' || this.searchResult_CustomerID_add == undefined) {
    //   this.spinner.hide();
    //   iziToast.error({
    //     message: "Customer name missing",
    //     position: 'topRight'
    //   });
    //   return false;

    // }
    api_req.element_data = addRPAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response != '') {

        this.spinner.hide();
        $("#editMulInvPayId").modal("hide");
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        this.edit_array = [];
        this.mulInvPaymentList({});

      } else {
        this.spinner.hide();
        iziToast.warning({
          Message: "Update Failed",
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
  selectEventCustomer_add(item: any, i: any) {
    // console.log(item)
    this.searchResult_CustomerID_add = item.customerId;
    this.searchResult_CustomerName_add = item.customerName.trim();
     console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
     console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.cusID[i] = item.customerId;
    //  console.log("this.cusID[i]", this.cusID[i])
    this.payment_pending_inv_list(i);

  }

  clearSelection1(event: any, i: any) {
    // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID_add = '';
    this.searchResult_CustomerName_add = '';
    (this.addPI_section2.get('addresses') as FormArray).at(i).get('invoice_amt').reset();
    (this.addPI_section2.get('addresses') as FormArray).at(i).get('bal_amount').reset();
    (this.addPI_section2.get('addresses') as FormArray).at(i).get('paid_amt').reset();
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.Pay_Pending_list_show[i] = false;
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
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }

  removeAddress_edit(i: number) {


    var paymentChildID = this.editMulInvGroupForm.value.edit_addresses[i].payment_child_id;
    //vignesh- to delete id from array since paramesh not given api
    // console.log("paymentChildID",paymentChildID)
    // console.log("i",i)
    // console.log("this.edit_array---before slice",this.edit_array)



    // if (i > -1) {
    //   this.edit_array.splice(i, 1);
    // }
    console.log("this.edit_array---after slice", this.edit_array)

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
        const editAddresses = this.editMulInvGroupForm.get('edit_addresses') as FormArray;
        editAddresses.removeAt(i);
        // this.editContractGroupForm.value.edit_addresses.removeAt(i);
        let api_req: any = new Object();
        let api_ContDel_req: any = new Object();
        api_req.moduleType = "multipleInvoicePayment";
        api_req.api_url = "multipleInvoicePayment/child_details_deletion";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ContDel_req.action = "child_details_deletion";
        api_ContDel_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ContDel_req.payment_child_id = paymentChildID;
        api_req.element_data = api_ContDel_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.success == true) {

            this.spinner.hide();
            // this.edit_array = [];
            // $("#editMulInvPayId").modal("hide");

            iziToast.success({
              message: "Deleted successfully",
              position: 'topRight'
            });
            //  this.mulInvPaymentList({});
            this.editMulInvPayGroup();

            // this.contractList({});
          }
          else {
            this.spinner.hide();
          }
        });
      }
    })

  }
  deleteMulInvPayGroup() {
    if (this.edit_array.length == 0) {
      iziToast.error({
        message: "Select Atleast 1 Group to Delete",
        position: 'topRight'
      });
    } else {
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

          let inv_id: string[] = this.edit_array;

          // Convert strings to numbers
          let inv_id_numbers: number[] = inv_id.map(Number);

          // console.log(inv_id_numbers);

          api_singleDelete.inv_id = inv_id_numbers;
          api_req.element_data = api_singleDelete;

          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == "true") {
              this.edit_array = [];
              // console.log("array content after delete", this.edit_array)
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
      console.log("selected id-array",this.edit_array)
    });

    // Update the state of all checkboxes in the DOM
    const checkboxes = document.querySelectorAll('.checkbox-group__single input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });

    console.log("Checkbox-all", this.edit_array);
  }


  EditCHK(data: any, event: any) {

    //  console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value);

    // Check if data is not undefined
    if (data !== undefined) {
      if (this.checkbox_value) {
        // Check if data is not already in the array and is not undefined
        if (!this.edit_array.includes(data)) {
          this.edit_array.push(data);
        }
        // console.log("Final Checkbox After checkbox selected list", this.edit_array);
      } else {
        const index = this.edit_array.findIndex((el: any) => el === data);
        if (index > -1) {
          this.edit_array.splice(index, 1);
        }
        //  console.log("Final Checkbox After Deselected selected list", this.edit_array);
      }
    }
    console.log("Final Checkbox After checkbox selected list", this.edit_array);
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



  EditCHK_pending(data: any, event: any, i: any) {

    // console.log("List - CheckBox ID", data);
    this.groupSelectCommonId_pending = data;
    this.checkbox_value_pending = event.target.checked;
    //  console.log(this.checkbox_value_pending);

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
      this.Pay_Pending_list[i].forEach((list: any) => {
        if (this.edit_array_pending.includes(list.billId) && list.performa_invoice === 0) {
          this.BalanceAmounttotal += list.balance_amt;
          this.InvoiceAmounttotal += list.netPayment;
        }
      });

      // console.log("Final Checkbox After checkbox selected list", this.edit_array_pending);
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




  payment_pending_inv_list(i: any) {
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
      if (response.status == "true") {
        this.spinner.hide();

        this.Pay_Pending_list[i] = response.data;
        // this.Pay_Pending_list = response.data;
        this.Pay_Pending_list_show[i] = true;
        // console.log("this.Pay_Pending_list", this.Pay_Pending_list)
        this.cdr.detectChanges();
        $("#searchInvoiceFormId").modal("hide");

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "No Data",
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
  mulInvPaymentList123(data: any) {


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
    api_mulInvpay.search_txt = this.searchResult_CustomerName;
    api_mulInvpay.current_page = "";
    api_mulInvpay.customer_id = this.searchResult_CustomerID;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.mulInvPay_list = response.dataList;
        this.response_total_cnt = response.total_cnt;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $("#searchInvoiceFormId").modal("hide");
        $("#searchInvoiceFormId").modal("hide");
        $('#addMulInvPayId').modal('hide');

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
    api_mulInvpay.search_txt = this.searchResult_CustomerName;
    api_mulInvpay.current_page = "";
    api_mulInvpay.customer_id = this.searchResult_CustomerID;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
        this.spinner.hide();
        this.mulInvPay_list = response.dataList;
        this.response_total_cnt = response.total_cnt;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        $("#searchInvoiceFormId").modal("hide");
        $('#searchMulInvPayId').modal('hide');

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

  InvoicetoProforma(id: any, k: any) {

    console.log("k", k);

    Swal.fire({
      title: 'Are you sure to convert Proforma to Invoice?',
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
        api_req.api_url = "invoice/proforma_convert_to_invoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqProf.action = "proforma_convert_to_invoice";
        api_reqProf.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqProf.billId = id;

        api_req.element_data = api_reqProf;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            // this.payment_pending_inv_list(k);
            iziToast.success({
              message: "Invoice to Proforma converted Successfully",
              position: 'topRight'
            });

            this.searchCustomerDa();
            this.payment_pending_inv_list(k);

            // this.payment_pending_inv_list(k);
            // this.payment_pending_inv_list({});

            // payment_pending_inv_list(i: any)
          } else {
            iziToast.warning({
              message: "Invoice to Proforma not converted. Please try again",
              position: 'topRight'
            });
            this.payment_pending_inv_list({});
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
  searchCustomerDa() {


    if (this.variableCustomerData.length > 0) {
      // this.spinner.show();
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "customer";
      api_req.api_url = "customer/customer_name_search";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "customer_name_search";
      api_Search_req.user_id = this.user_ids;
      api_Search_req.customerName = this.variableCustomerData;
      api_req.element_data = api_Search_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

        // console.log("vignesh-customer_status response", response);
        // this.searchResult = response[0];
        this.searchResult = response.customer_names;
        // console.log("vignesh-advanced search result", this.searchResult);
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


    // const addressesArray7 = this.addPI_section2.get('addresses') as FormArray;
    // const addressFormGroup8 = addressesArray7.at(i) as FormGroup;
    // addressFormGroup8.patchValue({
    //   invoice_amt: invoice_amt,
    //   paymentDate: formattedDate,
    //   bal_amount: bal_amount,
    //   paid_amt: paid_amt,
    //   payment_method: payment_method,
    //   note: note
    // });



    // api_mulInvpay.values =this.addPI_section2.value.addresses;
    //  const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    //  const addressesData = addressesArray.value;

    //    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    // const addressesData = addressesArray.controls.map(control => control.value);
    //     api_mulInvpay.values =addressesData;

    // api_mulInvpay.bill_id = this.edit_array_pending;



    // var addr = this.addPI_section2.value.addresses;
    //  console.log("this.addPI_section2.value.addresses", this.addPI_section2.value.addresses)
    // for (let i = 0; i < addr.length; i++) {


    //   addr[i].customerId = $('#pd_company_Name_' + i).val();
    //   addr[i].paymentDate = $('#pd_date_' + i).val();
    //   addr[i].invoice_amt = $('#pd_invAmount_' + i).val();
    //   addr[i].bal_amount = $('#pd_balAmount_' + i).val();
    //   addr[i].paid_amt = $('#pd_paidAmount_' + i).val();
    //   addr[i].payment_method = $('#pd_paymenttype_' + i).val();
    //   addr[i].note = $('#pd_note_' + i).val();


    // }



    // for (let i = 0; i < addr.length; i++) {

    //   addr[i].customerId = this.addPI_section2.value.addresses.customer_name;
    //   addr[i].paymentDate = this.addPI_section2.value.addresses.paymentdate;
    //   addr[i].invoice_amt = this.addPI_section2.value.addresses.invoice_amt;
    //   addr[i].bal_amount =this.addPI_section2.value.addresses.bal_amount;
    //   addr[i].paid_amt = this.addPI_section2.value.addresses.paid_amt;
    //   addr[i].payment_method = this.addPI_section2.value.addresses.payment_method;
    //   addr[i].note = this.addPI_section2.value.addresses.note;


    // }
    // api_mulInvpay.values = addr;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        this.mulInvPay_list = response.dataList;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
        // $("#addMulInvPayId").modal("hide");

        // this.addresses.clear();
        // this.formGroupname.controls[‘formcontrolname’].reset();

        // this.addPI_section2.controls['customer_name'].reset();
        // this.addPI_section2.controls['invoice_amt'].reset();

        // this.addPI_section2.controls['bal_amount'].reset();
        // this.addPI_section2.controls['paid_amt'].reset();
        // this.addPI_section2.controls['payment_method'].reset();
        // this.addPI_section2.controls['note'].reset();
        //this.addPI_section2.controls['addresses'].at(i).get('customer_name').reset();


        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('customer_name').reset();
        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('invoice_amt').reset();
        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('bal_amount').reset();
        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('paid_amt').reset();
        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('payment_method').reset();
        // (this.addPI_section2.get('addresses') as FormArray).at(i).get('note').reset();


        //   this.InvoiceAmounttotal=0;
        //   this.BalanceAmounttotal=0;


        // $('#pd_invAmount_' + i).val(this.InvoiceAmounttotal);
        // $('#pd_balAmount_' + i).val(this.BalanceAmounttotal);
        // $('#pd_paidAmount_' + i).val(this.BalanceAmounttotal);

        // $('#pd_invAmount_' + i).val('');
        // $('#pd_paidAmount_' + i).val('');
        // $('#pd_balAmount_' + i).val('');
        // this.edit_array_pending = [];

        // this.Pay_Pending_list = []


        // this.mulInvPaymentList({});
        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
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
  addPaymentEntry(i: any) {



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

    // Ensure non-null values before sending
    //   if (!api_mulInvpay.paymentDate || !api_mulInvpay.invoice_amt || !api_mulInvpay.paid_amt) {
    //     console.error('Missing required values for address at index', i);
    //     return; // Skip sending if essential values are missing
    // }




    // api_mulInvpay.values = api_mulInvpay1;

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


    api_mulInvpay.bill_id = addressDataAtIndex.bill_id;


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
        this.mulInvPay_list = response.dataList;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
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


}
