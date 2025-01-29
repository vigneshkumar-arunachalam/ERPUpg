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
  selector: 'app-editcontributionmaster',
  templateUrl: './editcontributionmaster.component.html',
  styleUrls: ['./editcontributionmaster.component.css']
})
export class EditcontributionmasterComponent implements OnInit {



  public addPI_section1: FormGroup;
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
  employeeAgeList: any;
  ContributionIdEdit: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
      this.ageDropDownList();
      this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.ageDropDownList();
 
    this.addPI_section1 = new FormGroup({
      'minimumWage': new FormControl(''),
      'maximumWage': new FormControl(''),
     
    });
    this.route.queryParams
    .subscribe(params => {
     // console.log("params output value", params);
      this.ContributionIdEdit = params['salaryId'];
        console.log("this.ContributionIdEdit",this.ContributionIdEdit);
       this.editContribution();

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
    
      employeeID: '',
      employeeAge: '',
      employeeWage: '',
      employerWage: '',
      TotalWage: '',

    });
  }
  ageDropDownList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/ageDropDownList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/ageDropDownList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.employeeAgeList=response.age;
       const maxwage= response.max_wage;
       const minwage= response.min_wage;
       $('#maximumWage_ConM').val(maxwage);
       $('#minimumWage_ConM').val(minwage);

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

 


  update() {


    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/updateContributionDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "hr/updateContributionDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.contribution_id= this.ContributionIdEdit;
    api_mulInvpay.min_wage = $('#minimumWage_ConM').val();
    api_mulInvpay.max_wage =    $('#maximumWage_ConM').val();
    var addr = this.addPI_section2.value.addresses;

    for (let i = 0; i < addr.length; i++) {
      addr[i].age = $('#employeeAge' + i).val();
      addr[i].employer = $('#employerWage' + i).val();
      addr[i].employee = $('#employeeWage' + i).val();
      addr[i].total = $('#TotalWage' + i).val();
      addr[i].id = $('#employeeID' + i).val();
    }


    api_mulInvpay.products = addr;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.router.navigate(['/contributionmaster']);

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
    this.router.navigate(['/contributionmaster']);
  }
   editContribution() {
  
      this.spinner.show();
      let api_req: any = new Object();
      let api_editPI_req: any = new Object();
      api_req.moduleType = "hr";
      api_req.api_url = "hr/editContributionDetails";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_editPI_req.action = "hr/editContributionDetails";
      api_editPI_req.user_id = localStorage.getItem('erp_c4c_user_id');
      api_editPI_req.contribution_id = this.ContributionIdEdit;
      api_req.element_data = api_editPI_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {
  
        if (response != '') {
          this.spinner.hide();
          console.log("response.data.length",response.data.length);
          const formArray = new FormArray([]);
          for (let index = 0; index < response.data.length; index++) {
  
            formArray.push(this.fb.group({
              "employeeAge": response.data[index].age,
              "employeeWage": response.data[index].employee,
              "employerWage": response.data[index].employer,
              "TotalWage": response.data[index].total,
              "employeeID": response.data[index].id,

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
