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
  resellerCommission_list1:any;
  reseller_name_list:any;
  doubleArray:any;
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

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.show();
   
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
    


    this.doubleArray=[
      [ { id: 1, value: 'Elenor Anderson', isSelected: false },
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
      if (response!= '') {
        
      this.referallAmountDetails=response.referral_amount_details;

      this.payoutAmountDetails=response.payout_amount_details;
      this.payCurrencyName=response.currencyName;
      this.resellerList=response.reseller_list;
      this.CurrencyTotalList=response.reseller_payment_summary.currencyTotal;
      this.CurrencyTotalAll=response.reseller_payment_summary.currency_total_amt.total_price;
      this.YearTotalList=response.reseller_payment_summary.yearTotal;
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
