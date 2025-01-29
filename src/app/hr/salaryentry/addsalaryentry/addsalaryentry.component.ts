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
  selector: 'app-addsalaryentry',
  templateUrl: './addsalaryentry.component.html',
  styleUrls: ['./addsalaryentry.component.css']
})
export class AddsalaryentryComponent implements OnInit {

  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  productCategoryNameList: any;
  monthList: any;
  yearList: any;
  billerList: any;
  staffContributionList: any;
  userList: any;
  //view
  isReadOnly: boolean = true;
  billerNameDefault: any;
  staffNameDefault: any;
  salaryMonthDefault: any;
  salaryYearDefault: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
      this.salaryDropDownList();
      this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.salaryDropDownList();
    this.ProductCategoryNameList();

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
      billname: this.billerNameDefault,
      staffname: this.staffNameDefault,
      salarymonth: this.salaryMonthDefault,
      salaryyear: this.salaryYearDefault,
      subcontribution1: '',
      subcontribution2: '',
      neutralcontribution1: '',
      neutralcontribution2: '',
      additionalcontribution1: '',
      additionalcontribution2: '',
      epfstatus: true,
      Contribution1SINDA: true,
      Contribution2SOCSO: false,
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
        this.billerNameDefault=response.default_biller;
        this.staffNameDefault=response.default_user;
        this.salaryMonthDefault=response.default_month;
        this.salaryYearDefault=response.default_year;


        // const formArray = new FormArray([]);

        // for (let index = 0; index < 1; index++) {

        //   formArray.push(this.fb.group({
         
        //     "billname": response.default_biller,
        //     "staffname": response.default_user,
        //     "salarymonth": response.default_month,
        //     "salaryyear": response.default_year,
        //     "subcontribution1": '',
        //     "subcontribution2": '',
        //     "neutralcontribution1": '',
        //     "neutralcontribution2": '',
        //     "additionalcontribution1": '',
        //     "additionalcontribution2": '',

        //   })

        //   );
        // }

        // this.addPI_section2.setControl('addresses', formArray);

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
  getCpfDetails(i:any) {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/getCpfDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/getCpfDetails";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.user_ids = localStorage.getItem('erp_c4c_user_id');

    const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    api_postUPd.billerId = addressDataAtIndex.billname; 
    api_postUPd.no_of_days = addressDataAtIndex.workingdays;
    api_postUPd.salaryMonth = addressDataAtIndex.salarymonth;
    api_postUPd.salaryYear = addressDataAtIndex.salaryyear;

    api_postUPd.con1 = addressDataAtIndex.Contribution1SINDA;
    api_postUPd.con2 = addressDataAtIndex.Contribution2SOCSO;
    api_postUPd.pf_status = addressDataAtIndex.epfstatus;
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        console.log("response.data.length",response.data.length);
        const formArray = new FormArray([]);

        for (let index = 0; index < response.data.length; index++) {

          formArray.push(this.fb.group({
         
            "subcontribution1": response.data[index].con1_id,
            "subcontribution2": response.data[index].con2_id,
            "subcontribution1Amt": response.data[index].con1_amt,
            "subcontribution2Amt": response.data[index].con2_amt,


            // "epfstatus": response.data[index].out_call_state == 1 ? true : false,
            // "Contribution1SINDA": response.data[index].dis_amt,
            // "Contribution2SOCSO": response.data[index].dis_type,

          
            "basicwages": response.data[index].per_day_salary,
            "employeeContr": response.data[index].employee_amt_str,
            "employerContr": response.data[index].employer_amt_str,

            "cpfwages": response.data[index].cpf_amt_str,
            "netpay": response.data[index].net_amt,


          })

          );
        }


      //  console.log(formArray)
        this.addPI_section2.setControl('addresses', formArray);
        

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

  save(i: any) {


    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/add_salaryDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "hr/add_salaryDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    // api_mulInvpay.customerId = this.addPI_section2.value.addresses[0].customer_name.customerId;

    // const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    // const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    // api_mulInvpay.category_id_1 = addressDataAtIndex.productcategory1;
    // api_mulInvpay.category_color_1 = addressDataAtIndex.productColor1;
    // api_mulInvpay.category_fontsize_1 = addressDataAtIndex.productFontSize1;
    // api_mulInvpay.qty_color_1 = addressDataAtIndex.productQtyColor1;
    // api_mulInvpay.qty_fontsize_1 = addressDataAtIndex.productQtyFontSize1;

    // api_mulInvpay.category_id_2 = addressDataAtIndex.productcategory2;
    // api_mulInvpay.category_color_2 = addressDataAtIndex.productColor2;
    // api_mulInvpay.category_fontsize_2 = addressDataAtIndex.productFontSize2;
    // api_mulInvpay.qty_color_2 = addressDataAtIndex.productQtyColor2;
    // api_mulInvpay.qty_fontsize_2 = addressDataAtIndex.productQtyFontSize2;

    // api_mulInvpay.category_id_3 = addressDataAtIndex.productcategory3;
    // api_mulInvpay.category_color_3 = addressDataAtIndex.productColor3;
    // api_mulInvpay.category_fontsize_3 = addressDataAtIndex.productFontSize3;
    // api_mulInvpay.qty_color_3 = addressDataAtIndex.productQtyColor3;
    // api_mulInvpay.qty_fontsize_3 = addressDataAtIndex.productQtyFontSize3;


    var addr = this.addPI_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      // console.log(addr[i].pd_quantity_txtbox1)
      addr[i].billerId = $('#pd_billname' + i).val();
      addr[i].user_ids = $('#pd_staffname' + i).val();
      addr[i].salaryMonth = $('#pd_salarymonth' + i).val();
      addr[i].salaryYear = $('#pd_salaryyear' + i).val();

      // addr[i].no_of_days = $('#pd_productQtyFontSize1' + i).val();
      // addr[i].per_day_salary = $('#pd_category2' + i).val();
      // addr[i].grossAmount = $('#pd_productColor2' + i).val();

      addr[i].cpfAmount = $('#pd_cpfwages' + i).val();
      addr[i].empEAmount = $('#pd_employeeContr' + i).val();
      addr[i].empRAmount = $('#pd_employerContr' + i).val();

      addr[i].other_contribution_id_1 = $('#pd_subcontribution1' + i).val();
      addr[i].other_contribution_amt_1 = $('#pd_productColor3' + i).val();

      addr[i].other_contribution_id_2 = $('#pd_subcontribution2' + i).val();
      addr[i].other_contribution_amt_2 = $('#pd_productQtyColor3' + i).val();

      addr[i].neutral_contribution_id_1 = $('#pd_neutralcontribution1' + i).val();
      addr[i].neutral_contribution_amt_1 = $('#pd_productQtyFontSize3' + i).val();

      addr[i].neutral_contribution_id_2 = $('#pd_neutralcontribution2' + i).val();
      addr[i].neutral_contribution_amt_2 = $('#pd_productQtyFontSize3' + i).val();

      addr[i].add_contribution_id_1 = $('#pd_additionalcontribution1' + i).val();
      addr[i].add_contribution_amt_1 = $('#pd_productQtyFontSize3' + i).val();

      addr[i].add_contribution_id_2 = $('#pd_additionalcontribution2' + i).val();
      addr[i].add_contribution_amt_2 = $('#pd_productQtyFontSize3' + i).val();
      addr[i].staffNetAmount = $('#pd_netpay' + i).val();

    }


    api_mulInvpay.products = addr;



    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.router.navigate(['/salaryEntry']);

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
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

}
