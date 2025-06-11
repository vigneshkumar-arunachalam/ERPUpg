import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-guru',
  templateUrl: './guru.component.html',
  styleUrls: ['./guru.component.css']
})
export class GuruComponent implements OnInit {
  guru_list: any;
  public addGuru_FormGroup: FormGroup;
  public editGuru_FormGroup: FormGroup;
  public guruForm: FormGroup;
  public addresses: FormArray;
  public editaddresses: FormArray;
  AccountType: any;
  billerDetails: any;
  searchResult_productName: any;
  searchResult_customerName: any;
  groupSelectgurudetailID: any;
  checkbox_value_guru: any;
  edit_array_guru: any = [];
  viewPwdGuru: any;
  viewUsername: any;
  viewWebpageURL: any;
  UserAccessGroup: any;
  guruShowPermission_List: any;
  //Invoice Show Permission
  showPerissionForm: FormGroup;
  checkbox_ID_SingleParameter_invoiceShow_Value: any;
  Checkbox_value_invoiceShow: any;
  CheckBox_DynamicArrayList_invoiceShowPermission: any = [];
  typeConvertionString_invoiceShowPermission: any;
  invoiceShowPermission_EditOnLoad_Values: any;
  invoiceShowPermission_List: any;
  invoiceShowPermission_List1: any;
  invoiceShowResult: any;
  ShowPermission_BillID: any;
  taxAmtstate: any;
  access_groupValue: any;
  guru_details_id: any;
  googleAuthentication_status: boolean = false;
  //GoogleAuthentication
  GoogleAuthenticationForm: FormGroup;
  // advance search
  searchGuruForm: FormGroup;
  guruSearchcustomerId: any;
  guruSearchcustomerName: any;

  constructor(private serverService: ServerService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.addGuru_FormGroup = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
    this.editGuru_FormGroup = this.fb.group({
      editaddresses: this.fb.array([this.editcreateAddress()])
    });
  }
  keyword_customerName = 'customerName';

  ngOnInit(): void {
    this.GoogleAuthenticationForm = new FormGroup({
      'google_AuthenticationCode': new FormControl(null),
    });
    $('#GoogleAuthenticationGuruFormId').modal('show');
    //this.guruList();




    this.guruForm = new FormGroup({
      'user': new FormControl(null),

    });

    this.searchGuruForm = new FormGroup({
      'customer_id_guru': new FormControl(null),
    });




  }
  get addressControls() {
    return this.addGuru_FormGroup.get('addresses') as FormArray
  }
  get editaddressControls() {
    return this.editGuru_FormGroup.get('editaddresses') as FormArray
  }
  createAddress(): FormGroup {
    return this.fb.group({
      billerId: '',

      customer_id: '',
      description: '',
      account_type: '',
      pwd_username: '',
      pwd_guru: '',
      webpage_url: '',
      special_per: '',
    });

  }
  editcreateAddress(): FormGroup {
    return this.fb.group({
      billerId: '',
          customerName:'',
      guru_details_id: '',
      customer_id: '',
      description: '',
      account_type: '',
      pwd_username: '',
      pwd_guru: '',
      webpage_url: '',
      special_per: '',
    });

  }

  addGuruGo() {
    $('#addGuruDetailsFormId').modal('show');

  }
  editGuruGo() {

    if (this.edit_array_guru.length === 0) {
      iziToast.error({
        message: "Select Atleast One Biller",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      this.spinner.show();

      let api_req: any = new Object();
      let api_getReseller: any = new Object();
      api_req.moduleType = "guru";
      api_req.api_url = "guru/get_guruDetails";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_getReseller.action = "guru/get_guruDetails";
      api_getReseller.guru_details_id = this.edit_array_guru;
      api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
      api_req.element_data = api_getReseller;

      this.serverService.sendServer(api_req).subscribe((response: any) => {

        this.spinner.hide();
        if (response != '') {


          this.spinner.hide();


          const formArray = new FormArray([]);
          if(response.data){
             for (let index = 0; index < response.data.length; index++) {
            // this.CustomerIDUpdate = response.edit_contract_details[index].customer_id,
            formArray.push(this.fb.group({
              "guru_details_id": response.data[index].guru_details_id,
              "billerId": response.data[index].billerId,
              "customer_id": response.data[index].customer_id,
              "customerName": response.data[index].customerName,
              "description": response.data[index].description,
              "account_type": response.data[index].account_type,
              "pwd_username": response.data[index].pwd_username,
              "pwd_guru": response.data[index].pwd_guru,
              "webpage_url": response.data[index].webpage_url,
              "special_per": response.data[index].special_per,

            })
            );

            // $('#pd_e_customername_txtbox_' + index).val(response.data[index].customer_id)
            // alert($('#pd_e_customername_txtbox_' + index).val(response.data[index].customer_id))
            // console.log("vv",$('#pd_e_customername_txtbox_' + index).val(response.data[index].customer_id))

            setTimeout(() => {
              $('#pd_e_customername_txtbox_' + index).val(response.data[index].customerName);
              $('#pd_e_customerID_txtbox_' + index).val(response.data[index].customer_id);
             // console.log("Set value for #pd_e_customername_txtbox_", index, $('#pd_e_customername_txtbox_' + index).val());
            }, 0);
          }

          }
         

         // console.log(formArray);

          this.editGuru_FormGroup.setControl('editaddresses', formArray);

         // console.log(this.editGuru_FormGroup);
          $('#editGuruDetailsFormId').modal('show');



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
        //  console.log("final error", error);
        };


    }


  }
  deleteGuru(guru_details_id: any) {

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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "guru";
        api_req.api_url = "guru/deleteSingleGuruDetails";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "guru/deleteSingleGuruDetails";
        del_req.guru_details_id = guru_details_id;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            this.guruList();
            iziToast.success({
              message: "Guru Details Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            this.guruList();
            iziToast.warning({
              message: "Guru Details Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            this.guruList();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
          //  console.log("final error", error);
          };
      }
    })
  }
  selectAll(event: any) {

    if (event.target.checked == true) {

      this.guru_list.forEach((element: any, index: any) => {
        $("#check-78" + index).prop('checked', true);
      });
    } else {
      this.guru_list.forEach((element: any, index: any) => {
        $("#check-78" + index).prop('checked', false);
      });

    }

  }
  userPermission(guru_details_id: any) {
    // this.GoogleAuthenticationValidation();
    this.spinner.show();
    this.guru_details_id = guru_details_id;
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/userAccessGroup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guru/userAccessGroup";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.guru_details_id = guru_details_id;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        $('#userAccessGuruDetailsFormId').modal('show');
        this.UserAccessGroup = response.user_access_group;
        this.guruShowPermission_List = response.userList;
        this.CheckBox_DynamicArrayList_invoiceShowPermission = response.selectedUser;
        this.guruForm.patchValue({
          'user': response.selected_access_group,

        });
        
        setTimeout(() => { 
          $('#userVVV').val(response.selected_access_group);
        }, 1000);
      
        // if (this.googleAuthentication_status == false) {

        // } else {
        //   $('#userAccessGuruDetailsFormId').modal('hide');
        // }
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
       // console.log("final error", error);
      };

  }
  userPermissionUpdate() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/updateUserAccessGroup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guru/updateUserAccessGroup";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.guru_details_id = this.guru_details_id;
    api_getReseller.access_userid = this.CheckBox_DynamicArrayList_invoiceShowPermission;
    api_getReseller.access_group = this.access_groupValue;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();

        iziToast.success({
          message: "Success",
          position: 'topRight'
        });
        this.guruForm.controls['user'].reset();
        $('#userAccessGuruDetailsFormId').modal('hide');



      } else {


        iziToast.warning({
          message: " Details not Updated. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
       // console.log("final error", error);
      };

  }


  GoogleAuthenticationValidation() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_googleAuthVali: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/google_auth_check";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_googleAuthVali.action = "guru/google_auth_check";
    api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');

    api_googleAuthVali.auth_code = this.GoogleAuthenticationForm.value.google_AuthenticationCode;
    api_req.element_data = api_googleAuthVali;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $(document).ready(function () {
          $("#showhide").show();
        });
        this.googleAuthentication_status = response.status;
       // console.log(" this.googleAuthentication_status", this.googleAuthentication_status);
        if (this.googleAuthentication_status == true) {
          this.guruList();
          this.getGuruBillers();
        }


        iziToast.success({
          message: "Google Authentication Success",
          position: 'topRight'

        });
        $('#GoogleAuthenticationGuruFormId').modal("hide");


      } else {

        // $('#GoogleAuthenticationGuruFormId').modal("hide");
        iziToast.warning({
          message: "Invalid Google Authentication. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
       // console.log("final error", error);
      };


  }


  guruUpdate() {
    this.spinner.show();
    let abc: any = []
   // console.log(this.editGuru_FormGroup.value)
    abc = this.editGuru_FormGroup.value
   // console.log("abc", abc)
    const index = abc.editaddresses.length;


   // console.log("index length", index)

    let api_req: any = new Object();
    let update_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "guru/update_guru_details"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    update_req.action = "guru/update_guru_details";
    update_req.user_id = localStorage.getItem('erp_c4c_user_id');
    // update_req.e_company_Name=this.customerIDJoin;

    // for(let i=0;i<index;i++){
    //   const hasNullcustomer_id = this.editGuru_FormGroup.value.editaddresses[index].customer_id;
    // if (hasNullcustomer_id===null || hasNullcustomer_id=='' ) {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Guru Detail Customer ID Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }

    // const hasNulldescription = this.editGuru_FormGroup.value.editaddresses[index].description;
    // if (hasNulldescription===null || hasNulldescription=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Description  Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }

    // const hasNullAccountType = this.editGuru_FormGroup.value.editaddresses[index].account_type;
    // if (hasNullAccountType===null || hasNullAccountType=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Account Type Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }

    // const hasNullpwdGuru = this.editGuru_FormGroup.value.editaddresses[index].pwd_guru;
    // if (hasNullpwdGuru===null || hasNullpwdGuru=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Password Guru Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }
    // const hasNullpwdUsername = this.editGuru_FormGroup.value.editaddresses[index].pwd_username;
    // if (hasNullpwdUsername===null || hasNullpwdUsername=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Password User Name Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }
    // const special_per = this.editGuru_FormGroup.value.editaddresses[index].special_per;
    // if (special_per===null || special_per=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Special Permission Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }
    // const webpage_url = this.editGuru_FormGroup.value.editaddresses[index].webpage_url;
    // if (webpage_url===null || webpage_url=='') {
    //   this.spinner.hide();
    //   iziToast.error({
    //     title: 'Web Page URL Null',
    //     message: 'Guru Detail not Saved !',
    //   });
    //   return false;
    // }

    // }

   // console.log("this.editGuru_FormGroup.value.editaddresses", this.editGuru_FormGroup.value.editaddresses)

    for (let i = 0; i < this.editGuru_FormGroup.value.editaddresses.length; i++) {
      if ($('#pd_e_billername_txtbox_' + i).val() == null || $('#pd_e_billername_txtbox_' + i).val() == '') {
        iziToast.error({
          message: "Biller Name Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;
      } else {
        this.editGuru_FormGroup.value.editaddresses[i].billerId = $('#pd_e_billername_txtbox_' + i).val();
      }

      if ($('#pd_e_customerID_txtbox_' + i).val() == null) {
        iziToast.error({
          message: "Customer Name Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].customerName = $('#pd_e_customername_txtbox_' + i).val();
        this.editGuru_FormGroup.value.editaddresses[i].customer_id = $('#pd_e_customerID_txtbox_' + i).val();
      }

      if ($('#pd_e_description_txtArea_' + i).val() == null || $('#pd_e_description_txtArea_' + i).val() == '') {
        iziToast.error({
          message: "Description Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].description = $('#pd_e_description_txtArea_' + i).val();
      }

      if ($('#pd_e_accountType_' + i).val() == null || $('#pd_e_accountType_' + i).val() == ''|| $('#pd_e_accountType_' + i).val() == '0' || $('#pd_e_accountType_' + i).val() == 0) {
        iziToast.error({
          message: "Account Type Missing",
          position: 'topRight'
        });
        this.spinner.hide();

        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].account_type = $('#pd_e_accountType_' + i).val();
      }

      if ($('#pd_e_username_' + i).val() == null || $('#pd_e_username_' + i).val() == '') {
        iziToast.error({
          message: "User Name Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].pwd_username = $('#pd_e_username_' + i).val();
      }
      if ($('#pd_e_guru_' + i).val() == null || $('#pd_e_guru_' + i).val() == '') {
        iziToast.error({
          message: "Password/Guru Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].pwd_guru = $('#pd_e_guru_' + i).val();
      }

      if ($('#pd_e_guru_' + i).val() == null || $('#pd_e_guru_' + i).val() == '') {
        iziToast.error({
          message: "URL Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].webpage_url = $('#pd_e_guru_' + i).val();
      }
      if ($('#pd_e_url_' + i).val() == null || $('#pd_e_url_' + i).val() == '') {
        iziToast.error({
          message: "URL Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        this.editGuru_FormGroup.value.editaddresses[i].webpage_url = $('#pd_e_url_' + i).val();
      }

      this.editGuru_FormGroup.value.editaddresses[i].special_per = $('#pd_e_s_perm_' + i).prop('checked');
    }
    update_req.values = this.editGuru_FormGroup.value.editaddresses;
    api_req.element_data = update_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

     // console.log("update response", response)

      if (response.status == true) {
        this.spinner.hide();
        this.edit_array_guru = [];
        this.guruList();
        this.editGuru_FormGroup.reset();
        iziToast.success({
          title: 'Success',
          message: 'Guru Details has been updated!',
        });

        this.guruList();
        $("#editGuruDetailsFormId").modal("hide");
      }
      else {
        this.spinner.hide();
        iziToast.error({
          title: 'Error',
          message: 'Guru Details has not been updated!',
        });
        $("#editGuruDetailsFormId").modal("hide");
      }

    });


  }
  searchGuruGo() {

    $("#searchGuruFormId").modal("show");
  }

  addAddress() {

    this.addresses = this.addGuru_FormGroup.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  cancelAddress() {

  }
  EditCHK(gurudetailID: any, event: any) {

    this.groupSelectgurudetailID = gurudetailID;
    this.checkbox_value_guru = event.target.checked;

    if (this.checkbox_value_guru) {

      this.edit_array_guru.push(gurudetailID);
      this.edit_array_guru.join(',');
    //  console.log("Final Checkbox After checkbox selected list", this.edit_array_guru);
    }
    else {

      const index = this.edit_array_guru.findIndex((el: any) => el === gurudetailID)
      if (index > -1) {
        this.edit_array_guru.splice(index, 1);
      }
     // console.log("Final Checkbox After Deselected selected list", this.edit_array_guru)

    }
  }
  guruList() {
    $('#GoogleAuthenticationGuruFormId').modal('hide');
    $('#searchGuruFormId').modal('hide');

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/guruDetailsList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guruDetailsList";
    if (this.guruSearchcustomerId == '' || this.guruSearchcustomerId == 'undefined' || this.guruSearchcustomerId == undefined) {
      api_getReseller.customerId = 'null';
    } else {

      api_getReseller.customerId = this.guruSearchcustomerId;
    }
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.guru_list = response.data;
        this.searchGuruForm.controls['customer_id_guru'].reset();
        this.guruSearchcustomerId = '';
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
      //  console.log("final error", error);
      };
  }
  getGuruBillers() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/getGuruBillers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guru/getGuruBillers";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.AccountType = response.account_type;
        this.billerDetails = response.biller;

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
      //  console.log("final error", error);
      };

  }
  view(guru_details_id: any) {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/viewGuruDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "guru/viewGuruDetails";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.guru_details_id = guru_details_id;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.viewPwdGuru = response.data.pwd_guru;
        this.viewUsername = response.data.pwd_username;
        this.viewWebpageURL = response.data.webpage_url;
        $('#viewGuruDetailsFormId').modal('show');

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
     //   console.log("final error", error);
      };

  }

  userChange(event: any) {
    this.access_groupValue = event.target.value;
  }

  InvoiceShowCHK(userId: any, event: any) {
  //  console.log("List - Checkbox ID", userId);
    this.checkbox_ID_SingleParameter_invoiceShow_Value = userId;
    this.Checkbox_value_invoiceShow = event.target.checked;
  //  console.log(this.Checkbox_value_invoiceShow)
    if (this.Checkbox_value_invoiceShow) {

      this.CheckBox_DynamicArrayList_invoiceShowPermission.push((userId));
      this.CheckBox_DynamicArrayList_invoiceShowPermission.join(',');
      this.CheckBox_DynamicArrayList_invoiceShowPermission.sort();
    //  console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_invoiceShowPermission.indexOf(userId);
   //   console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_invoiceShowPermission.splice(index, 1);
      }
    //  console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoiceShowPermission)
    }
    this.typeConvertionString_invoiceShowPermission = this.CheckBox_DynamicArrayList_invoiceShowPermission.toString();

  //  console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoiceShowPermission)

  }
  onFocusedCustomer(event: any) {

  }
  searchCustomerName(data: any) {
    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "guru/getCustomerName";
    api_SearchProd_req.user_id = localStorage.getItem('erp_c4c_user_id');

    api_SearchProd_req.searchkey = data;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // console.log("quotation/product_name_auto response", response);
      this.searchResult_customerName = response.customerName;

      // console.log("response.customerName", this.searchResult_customerName)

      if (response.status != '') {
        // this.productNameAutoFill();

      }

    });

  }
  selectEventCustomer(item: any, i: any) {
    // console.log("item", item)
    // console.log("item.customerName", item.customerName)
    // console.log("item.customerId", item.customerId)
    //  $('#pd_customername_txtbox_' + i).val(item.customerName)
    $('#pd_customername_txtbox_' + i).val(item.customerId)
    $('#pd_e_customername_txtbox_' + i).val(item.customerId)

  }
  selectEventCustomerGuru(item: any) {
    // console.log("item", item)
    // console.log("item.customerName", item.customerName)
    // console.log("item.customerId", item.customerId)
    //  $('#pd_customername_txtbox_' + i).val(item.customerName)
    this.guruSearchcustomerId = item.customerId;
    this.guruSearchcustomerName = item.customerName;
  }
  edit(i: any) {

  }
  deleteGroupGuruGo() {

    if (this.edit_array_guru.length === 0) {
      iziToast.error({
        message: "Select Atleast One Biller",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
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

          let api_req: any = new Object();
          let contractNameDelete_req: any = new Object();
          api_req.moduleType = "guru";
          api_req.api_url = "guru/deleteGuruDetails";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          contractNameDelete_req.action = "guru/deleteGuruDetails";
          contractNameDelete_req.guru_details_id = this.edit_array_guru;
          contractNameDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
          api_req.element_data = contractNameDelete_req;

          this.serverService.sendServer(api_req).subscribe((response: any) => {

            if (response.status == true) {
              // $("#fileAttachmentCustomerContractId").modal("hide");
              iziToast.success({
                message: "Deleted successfully",
                position: 'topRight'
              });
              this.edit_array_guru = [];
              this.guruList();
            }
            else {
              iziToast.error({
                message: "Delete not Updated ",
                position: 'topRight'
              });
              this.guruList();
            }
          }),
            (error: any) => {
             // console.log(error);
            };
        }
      })

    }



  }
  ChangePermission(guru_details_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

        let api_req: any = new Object();
        let contractNameDelete_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "guru/update_change_permission";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        contractNameDelete_req.action = "guru/update_change_permission";
        contractNameDelete_req.guru_details_id = guru_details_id;
        contractNameDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = contractNameDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: "Permission Updated successfully",
              position: 'topRight'
            });
            this.guruList();
          }
          else {
            iziToast.error({
              message: "Permission not Updated ",
              position: 'topRight'
            });
            this.guruList();
          }
        }),
          (error: any) => {
           // console.log(error);
          };
      }
    })


  }
  clearForm() {
    const addresses = this.addGuru_FormGroup.get('addresses') as FormArray;
    while (addresses.length) {
      addresses.removeAt(0);
    }
    addresses.reset();
    this.addGuru_FormGroup.reset();
    addresses.push(this.createAddress());
  }
  insertGuruDetails() {
    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "guru/insert_guru_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "guru/insert_guru_details";
    api_SearchProd_req.user_id = localStorage.getItem('erp_c4c_user_id');

    for (let i = 0; i < this.addGuru_FormGroup.value.addresses.length; i++) {
      if ($('#pd_billername_txtbox_' + i).val() == null || $('#pd_billername_txtbox_' + i).val() == '') {
        iziToast.error({
          message: "Biller Name Missing",
          position: 'topRight'
        });
        return false;
      } else {
        this.addGuru_FormGroup.value.addresses[i].billerId = $('#pd_billername_txtbox_' + i).val();
      }

      if ($('#pd_customername_txtbox_' + i).val() == null || $('#pd_customername_txtbox_' + i).val() == '') {
        iziToast.error({
          message: "Customer Name Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].customer_id = $('#pd_customername_txtbox_' + i).val();
      }

      if ($('#pd_description_txtArea_' + i).val() == null || $('#pd_description_txtArea_' + i).val() == '') {
        iziToast.error({
          message: "Description Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].description = $('#pd_description_txtArea_' + i).val();
      }

      if ($('#pd_accountType_' + i).val() == null || $('#pd_accountType_' + i).val() == '') {
        iziToast.error({
          message: "Account Type Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].account_type = $('#pd_accountType_' + i).val();
      }

      if ($('#pd_username_' + i).val() == null || $('#pd_username_' + i).val() == '') {
        iziToast.error({
          message: "User Name Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].pwd_username = $('#pd_username_' + i).val();
      }
      if ($('#pd_guru_' + i).val() == null || $('#pd_guru_' + i).val() == '') {
        iziToast.error({
          message: "Password/Guru Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].pwd_guru = $('#pd_guru_' + i).val();
      }

      if ($('#pd_url_' + i).val() == null || $('#pd_url_' + i).val() == '') {
        iziToast.error({
          message: "URL Missing",
          position: 'topRight'
        });
        return false;

      } else {
        this.addGuru_FormGroup.value.addresses[i].webpage_url = $('#pd_url_' + i).val();
      }


      this.addGuru_FormGroup.value.addresses[i].special_per = $('#pd_s_perm_' + i).prop('checked');
    }
    api_SearchProd_req.values = this.addGuru_FormGroup.value.addresses;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $('#addGuruDetailsFormId').modal('hide');

        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        const addresses = this.addGuru_FormGroup.get('addresses') as FormArray;
        while (addresses.length) {
          addresses.removeAt(0);
        }
        addresses.reset();
        this.addGuru_FormGroup.reset();
        this.guruList();
        this.clearForm();

      } else {
        iziToast.error({
          message: "Save Failed",
          position: 'topRight'
        });

      }

    });

  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  removeAddressedit(i: number) {

    // console.log('Attempting to remove address at index', i);
    // console.log('Form array:', this.editGuru_FormGroup);
    // console.log('Form array-customer contract id at particular index:',
    //   this.editGuru_FormGroup.value.editaddresses[i].guru_details_id);
    // var pd_billchild_id = $('#pd_billchild_id_' + i).val();
    var guru_details_id = this.editGuru_FormGroup.value.editaddresses[i].guru_details_id;


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
        const editAddresses = this.editGuru_FormGroup.get('editaddresses') as FormArray;
        editAddresses.removeAt(i);
        // this.editContractGroupForm.value.edit_addresses.removeAt(i);
        let api_req: any = new Object();
        let api_ContDel_req: any = new Object();
        api_req.moduleType = "guru";
        api_req.api_url = "guru/deleteSingleGuruDetails";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_ContDel_req.action = "guru/deleteSingleGuruDetails";
        api_ContDel_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_ContDel_req.guru_details_id = guru_details_id;
        api_req.element_data = api_ContDel_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.spinner.hide();
            //  this.edit_array = [];
            iziToast.success({
              message: " Guru Details Deleted successfully",
              position: 'topRight'
            });
            this.guruList();
          }
          else {
            this.spinner.hide();
          }
        });
      }
    })

  }

}

