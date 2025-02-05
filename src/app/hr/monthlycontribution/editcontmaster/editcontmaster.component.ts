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
  selector: 'app-editcontmaster',
  templateUrl: './editcontmaster.component.html',
  styleUrls: ['./editcontmaster.component.css']
})
export class EditcontmasterComponent implements OnInit {



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
    
      tot_wage: '',
      contribution: '',
      id:'',

    });
  }
  ageDropDownList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/monthlyDropDownList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/monthlyDropDownList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.employeeAgeList=response.wages;
      

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
    api_req.api_url = "hr/updateMonthlyContributionDetails"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "hr/updateMonthlyContributionDetails";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.contribution_id= this.ContributionIdEdit;

    var addr = this.addPI_section2.value.addresses;

    for (let i = 0; i < addr.length; i++) {
      addr[i].id = $('#contribution_id' + i).val();
      addr[i].contribution = $('#contribution' + i).val();
      addr[i].tot_wage = $('#tot_wage' + i).val();

    }


    api_mulInvpay.products = addr;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.router.navigate(['/monthlycontribution']);

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
    this.router.navigate(['/monthlycontribution']);
  }
   editContribution() {
  
      this.spinner.show();
      let api_req: any = new Object();
      let api_editPI_req: any = new Object();
      api_req.moduleType = "hr";
      api_req.api_url = "hr/editMonthlyContributionDetails";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_editPI_req.action = "hr/editMonthlyContributionDetails";
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
              "id": response.data[index].id,
              "contribution": response.data[index].contribution,
              "tot_wage": response.data[index].tot_wage,


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
