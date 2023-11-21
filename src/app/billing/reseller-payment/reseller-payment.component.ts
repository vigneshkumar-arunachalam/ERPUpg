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
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;


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
  RPBiller_list: any;
  RP_currencyList: any;
  //Reseller Just Payment
  resellerProcessPaymentIIForm: FormGroup;
  edit_resellercomm_list: any;
  reseller_comm_id: any;
  reseller_id: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.ResellerPaymentDefaultLoad();
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
    this.getCheckedItemList();

    this.resellerPaymentForm = new FormGroup({
      'RP_billerName': new FormControl(null,[Validators.required]),
      'RP_resellerName': new FormControl(null,[Validators.required]),
      'RP_currencyName': new FormControl(null,[Validators.required]),
      'RP_commissionAmount': new FormControl(null),
      'RP_remarks': new FormControl(null),

    });

    this.resellerProcessPaymentIIForm = new FormGroup({
      'RP_pay_date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'RP_pay_total': new FormControl(null),
      'RP_pay_paidAmount': new FormControl(null),
      'RP_pay_balance': new FormControl(null),
      'RP_pay_amount': new FormControl(null),
      'RP_pay_paymenttype': new FormControl(null)
    })

    this.doubleArray = [
      [{ id: 1, value: 'Elenor Anderson', isSelected: false },
      { id: 2, value: 'Caden Kunze', isSelected: true }],
      [{ id: 3, value: 'Ms. Hortense Zulauf', isSelected: true },
      { id: 4, value: 'Grady Reichert', isSelected: false }],
      [{ id: 5, value: 'Dejon Olson', isSelected: false },
      { id: 6, value: 'Jamir Pfannerstill', isSelected: false }]
    ]
  }
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
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


  resellerPaymentList(data: any) {

    this.spinner.show();

    var list_data = this.listDataInfo(data);
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
  listDataInfo(list_data: any) {
    console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
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
  
  getResellerPaymentdetails(customerid: any) {

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "reseller";
    api_req.api_url = "reseller/getResellerPaymentDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "getResellerPaymentDetails";

    api_getReseller.reseller_id = customerid;
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {

        this.referallAmountDetails = response.referral_amount_details;

        this.payoutAmountDetails = response.payout_amount_details;
        this.payCurrencyName = response.currencyName;
        this.resellerList = response.reseller_list;
        this.CurrencyTotalList = response.reseller_payment_summary.currencyTotal;
        this.CurrencyTotalAll = response.reseller_payment_summary.currency_total_amt.total_price;
        this.YearTotalList = response.reseller_payment_summary.yearTotal;
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
  EditResellerCommList(reseller_comm_id: any,reseller_id:any,i:any) {
    $("#faqhead" + i).modal("hide");
    this.spinner.show();
    this.reseller_comm_id=reseller_comm_id;
    this.reseller_id=reseller_id;
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

        this.edit_resellercomm_list=response.edit_resellercomm_list;
        this.resellerPaymentForm.patchValue({
          'RP_billerName':response.edit_resellercomm_list.billerId,
          'RP_resellerName':response.edit_resellercomm_list.reseller_name,
          'RP_currencyName':response.edit_resellercomm_list.currencyId,
          'RP_commissionAmount':response.edit_resellercomm_list.commission_amt,
          'RP_remarks':response.edit_resellercomm_list.remarks,

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
    if (this.resellerPaymentForm.value.RP_billerName=== null) {

      iziToast.warning({
        message: "Fill Biller Name",
        position: 'topRight'
      });
      return false;

    }else{
      api_getReseller.company = this.resellerPaymentForm.value.RP_billerName;
    }
    if (this.resellerPaymentForm.value.RP_resellerName=== null) {

      iziToast.warning({
        message: "Fill Reseller Name",
        position: 'topRight'
      });
      return false;

    }else{
      api_getReseller.reseller_name = this.resellerPaymentForm.value.RP_resellerName;
    }
    if (this.reseller_id=== null) {

      iziToast.warning({
        message: "Fill Reseller ID",
        position: 'topRight'
      });
      return false;

    }else{
      api_getReseller.reseller_id = this.reseller_id;
    }
   
   
  

    if (this.resellerPaymentForm.value.RP_currencyName=== null) {

      iziToast.warning({
        message: "Fill Currency",
        position: 'topRight'
      });
      return false;

    }else{
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

  deleteResellerPayment(reseller_comm_id: any,i:any) {
   
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
          if (response!='') {
          
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
  ResellerPayProcessEdit(reseller_comm_id: any,reseller_id:any,i:any) {
    $("#faqhead" + i).modal("hide");
    this.spinner.show();
    this.reseller_comm_id=reseller_comm_id;
    this.reseller_id=reseller_id;
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
          'RP_pay_total':response.conversionRate,
          'RP_pay_paidAmount':response.paid_amt,
          'RP_pay_balance':response.bal_amt_str,
          'RP_pay_amount':response.bal_amt,
          'RP_pay_paymenttype':response.paid_details,
          'RP_pay_descr':response.paid_details,

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

}
