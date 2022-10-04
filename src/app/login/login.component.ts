import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
declare var iziToast: any;
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  constructor(private router: Router,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      // 'company_name' : new FormControl(null,Validators.required)
    });
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  // userLogin() {
  //   if (this.loginForm.valid) {
  //     this.userLogins();
  //   } else {
  //     this.validateAllFields(this.loginForm);
  //   }
  // }

  userLogin() {
    // let api_req: any = new Object();
    // let api_ApproveStatusUpdate_req: any = new Object();
    // api_req.moduleType = "customer";
    // api_req.api_url = "customer_contract/customer_contract_approve_update";
    // api_req.api_type = "web";
    // api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    // api_ApproveStatusUpdate_req.action = "customer_contract_approve_update";
    // api_ApproveStatusUpdate_req.user_id = "2";
    // api_ApproveStatusUpdate_req.customer_contract_id = this.customerContractIDApproveStatus;
    // api_ApproveStatusUpdate_req.approve_status = this.checkbox_ApproveStatus;
    // api_req.element_data = api_ApproveStatusUpdate_req;


    Swal.fire('Authenticating');
    Swal.showLoading();
  
   
    let api_req: any = new Object();
    let loginFormapi_req: any = new Object();
    api_req.moduleType = 'login';
    api_req.api_url = 'login';

    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";

    loginFormapi_req.action = 'login_validate';
    loginFormapi_req.username = this.loginForm.value.username;
    loginFormapi_req.password = this.loginForm.value.password;
    api_req.element_data = loginFormapi_req;
    console.log("api req", api_req)
    console.log("loginFormapi_req",loginFormapi_req)
    // return false;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    
      console.log(response);
      if (response.status == 'true') {
        localStorage.setItem('access_token','test')
        localStorage.setItem('login_status','1')
        // this.router.navigate(['/customernewall']);- whatever we need as home
        this.router.navigate(['/']);
        Swal.close();
        iziToast.success({
          message: 'Logged In Sucessfully',
          position: 'topRight',
        });

       
      } else {
        Swal.close();
        iziToast.error({
          message: 'Invalid Login credentials',
          position: 'topRight',
        });
      }
    }),
      (error:any) => {
        console.log(error);
      }
   


  }
}
