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
  selector: 'app-editsalaryentry',
  templateUrl: './editsalaryentry.component.html',
  styleUrls: ['./editsalaryentry.component.css']
})
export class EditsalaryentryComponent implements OnInit {


  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  productCategoryNameList: any;
  monthList: any;
  yearList: any;
  billerList: any;
  staffContributionList: any;
  userList: any;
  salaryIdEdit:any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.salaryDropDownList();
    this.ProductCategoryNameList();
    this.route.queryParams
    .subscribe(params => {
     // console.log("params output value", params);
      this.salaryIdEdit = params['salaryId'];
        console.log("this.salaryIdEdit",this.salaryIdEdit);
       this.editSalaryEntry();

    }
    );

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    // $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      billname: '',
      staffname: '',
      salarymonth: '',
      salaryyear: '',
      subcontribution1: '',
      subcontribution2: '',
      neutralcontribution1: '',
      neutralcontribution2: '',
      additionalcontribution1: '',
      additionalcontribution2: '',
      epfstatus: true,
      Contribution1SINDA: true,
      Contribution2SOCSO: '',
      workingdays: '',
      basicwages: '',
      employeeContr: '',
      employerContr: '',
      cpfwages: '',
      netpay: '',
      subcontribution1Amt: '',
      subcontribution2Amt: '',
      neutralcontribution1Amt: '',
      neutralcontribution2Amt: '',
      additionalcontribution1Amt: '',
      additionalcontribution2Amt: '',
      grossAmount: '',
    });
  }
  salaryDropDownList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/salaryDropDownList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/salaryDropDownList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.monthList=response.Month;
        this.yearList=response.Year;
        this.userList=response.user;
        this.billerList=response.biller;
        this.staffContributionList=response.staff_contribution;

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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

  ProductCategoryNameList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_master/getProductCategory";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getProductCategory";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.productCategoryNameList = response.product_category;

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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

  update(i: any) {


    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/update_salaryDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "hr/update_salaryDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    var addr = this.addPI_section2.value.addresses;

    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    for (let i = 0; i < addr.length; i++) {

      addr[i].billerId = addressDataAtIndex.billname;
      addr[i].user_ids = addressDataAtIndex.staffname;
      addr[i].salaryMonth = addressDataAtIndex.salarymonth;
      addr[i].salaryYear = addressDataAtIndex.salaryyear;

      addr[i].no_of_days = addressDataAtIndex.workingdays;
      addr[i].per_day_salary = addressDataAtIndex.basicwages;
      addr[i].grossAmount = addressDataAtIndex.grossAmount;


      addr[i].cpfAmount = addressDataAtIndex.epfstatus;
      addr[i].empEAmount = addressDataAtIndex.employeeContr;
      addr[i].empRAmount =addressDataAtIndex.employerContr;

      addr[i].other_contribution_id_1 = addressDataAtIndex.subcontribution1;
      addr[i].other_contribution_amt_1 = addressDataAtIndex.subcontribution1Amt;
      addr[i].other_contribution_id_2 = addressDataAtIndex.subcontribution2;
      addr[i].other_contribution_amt_2 = addressDataAtIndex.subcontribution2Amt;

      addr[i].neutral_contribution_id_1 = addressDataAtIndex.neutralcontribution1;
      addr[i].neutral_contribution_amt_1 = addressDataAtIndex.neutralcontribution1Amt;
      addr[i].neutral_contribution_id_2 = addressDataAtIndex.neutralcontribution2;
      addr[i].neutral_contribution_amt_2 = addressDataAtIndex.neutralcontribution2Amt;

      addr[i].add_contribution_id_1 = addressDataAtIndex.additionalcontribution1;
      addr[i].add_contribution_amt_1 = addressDataAtIndex.additionalcontribution1Amt;
      addr[i].add_contribution_id_2 = addressDataAtIndex.additionalcontribution2;
      addr[i].add_contribution_amt_2 = addressDataAtIndex.additionalcontribution2Amt;

      addr[i].staffNetAmount = addressDataAtIndex.netpay;

    }


    api_mulInvpay.products = addr;



    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.router.navigate(['/salaryEntry']);

        this.spinner.hide();
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });

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
  goBack() {
    this.router.navigate(['/salaryEntry']);
  }
  editSalaryEntry() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_editPI_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/edit_salaryDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPI_req.action = "hr/edit_salaryDetails";
    api_editPI_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_editPI_req.salaryId = this.salaryIdEdit;
    api_req.element_data = api_editPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.spinner.hide();

        const formArray = new FormArray([]);
        for (let index = 0; index < response.data.length; index++) {

          formArray.push(this.fb.group({
            "billname": response.data[index].billerId,
            "staffname": response.data[index].userId,
            "salarymonth": response.data[index].salaryMonth,

            "salaryyear": response.data[index].salaryYear_val,
            "subcontribution1": response.data[index].other_contribution_id_1,
            "subcontribution2": response.data[index].other_contribution_id_2,
            "subcontribution1Amt": response.data[index].other_contribution_amt_1,
            "subcontribution2Amt": response.data[index].other_contribution_amt_2,

            "neutralcontribution1": response.data[index].neutral_contribution_id_1,
            "neutralcontribution2": response.data[index].neutral_contribution_id_2,
            "additionalcontribution1": response.data[index].add_contribution_id_1,
            "additionalcontribution2": response.data[index].add_contribution_id_2,

            "epfstatus": response.data[index].empEAmountCheck,
            "Contribution1SINDA": response.data[index].otherContributionCheck1,
            "Contribution2SOCSO": response.data[index].otherContributionCheck2,

            "workingdays": response.data[index].no_of_days,
            "basicwages": response.data[index].per_day_salary,
            "employeeContr": response.data[index].empEAmount,
            "employerContr": response.data[index].empRAmount,

            "cpfwages": response.data[index].cpfAmount,
            "netpay": response.data[index].staffNetAmount,
          

            "neutralcontribution1Amt": response.data[index].neutral_contribution_amt_1,
            "neutralcontribution2Amt": response.data[index].neutral_contribution_amt_2,
            "additionalcontribution1Amt": response.data[index].add_contribution_amt_1,
            "additionalcontribution2Amt": response.data[index].add_contribution_amt_2,
            "grossAmount": response.data[index].grossAmount,

          })

          );
        }


      //  console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        iziToast.warning({
          message: "Not updated. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        }); this.spinner.hide();
       
        console.log(error);
      }

    this.spinner.hide();

  }

}
