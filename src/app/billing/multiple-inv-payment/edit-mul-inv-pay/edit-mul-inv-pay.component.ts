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
  selector: 'app-edit-mul-inv-pay',
  templateUrl: './edit-mul-inv-pay.component.html',
  styleUrls: ['./edit-mul-inv-pay.component.css']
})
export class EditMulInvPayComponent implements OnInit {
  user_ids: string;
  paymentType_payment: any;
  public editMulInvGroupForm: FormGroup;
  public edit_addresses: FormArray;
  currentDate: any;
  searchResult_add: any;
  keywordCompanyName_add = 'customerName';
  searchResult_CustomerID_add: any;
  searchResult_CustomerName_add: any;
  cusID: any[] = [];
  Pay_Pending_list: any[] = [];
  Pay_Pending_list_show: boolean[] = new Array().fill(false);
  dropdownData: any[] = [];
  edit_array: any = [];
  invAmtDropDown: any;
  CustomerIDUpdate: any;
  paymentIdsNumbersID: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.editMulInvGroupForm = this.fb.group({
      edit_addresses: this.fb.array([this.edit_createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.PaymentMethodDefaultLoad();
    this.route.queryParams
    .subscribe(params => {
     // console.log("params output value", params);

      this.paymentIdsNumbersID = params['paymentIdsNumbers'];
 
     

      // console.log("edit biller id", this.editbillerID);
      // console.log("edit DID state id", this.editDIDStateID);
      // console.log("edit duplicate id", this.edit_Duplicate_ID);
      // console.log("edit searchFlag id", this.searchFlag);
      this.editMulInvPayGroup();

    }
    );
   

  }
  get editaddressControls() {
    return this.editMulInvGroupForm.get('edit_addresses') as FormArray
  }
  editAddress(): void {
    $('.date-value').val(this.currentDate);
    this.edit_addresses = this.editMulInvGroupForm.get('edit_addresses') as FormArray;
    this.edit_addresses.push(this.edit_createAddress());
    // this.incrementVariable++;


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
  selectEventCustomer_add(item: any, i: any) {
    // console.log(item)
    this.searchResult_CustomerID_add = item.customerId;
    this.searchResult_CustomerName_add = item.customerName.trim();
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.cusID[i] = item.customerId;
    //  console.log("this.cusID[i]", this.cusID[i])
    this.payment_pending_inv_list(i);

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

  clearSelection1(event: any, i: any) {
    // console.log("clear selection", event)
    // console.log("event.customerId",event.customerId)
    // console.log("event.customerName",event.customerName)
    this.searchResult_CustomerID_add = '';
    this.searchResult_CustomerName_add = '';
    (this.editMulInvGroupForm.get('edit_addresses') as FormArray).at(i).get('invoice_amt').reset();
    (this.editMulInvGroupForm.get('edit_addresses') as FormArray).at(i).get('bal_amount').reset();
    (this.editMulInvGroupForm.get('edit_addresses') as FormArray).at(i).get('paid_amt').reset();
    // console.log("AutoComplete-customer ID", this.searchResult_CustomerID_add)
    // console.log("AutoComplete-customer Name", this.searchResult_CustomerName_add)
    this.Pay_Pending_list_show[i] = false;
  }
  onFocusedCustomer_add(e: any) {
    // do something when input is focused
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
           // this.editMulInvPayGroup();
       

            // this.contractList({});
          }
          else {
            this.spinner.hide();
          }
        });
      }
    })

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
    api_mulInvpay.paymentId =  this.paymentIdsNumbersID;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response != '') {
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
        this.router.navigate(['/multipleInvPayment']);

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
  clearEditMulInv() {
    this.edit_array = [];
    //  console.log("this.edit_array",this.edit_array)
    this.router.navigate(['/multipleInvPayment']);
  }
 
  

}
