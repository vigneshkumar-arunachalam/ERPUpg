import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
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
  userID:any;
  userName:any;
  loginDetails:any;
  role:any= [];
  constructor(private router: Router, private serverService: ServerService,private bnIdle: BnNgIdleService) { }

  ngOnInit(): void {
  
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      // 'company_name' : new FormControl(null,Validators.required)
    });

    // this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     console.log('session expired');
    //   }
    // });
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


  userLogin() {
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
        this.loginDetails=response;
        this.userID=response.userId;
        this.userName=response.firstName;
        this.role=response.role;


        localStorage.setItem('access_token','test')
        localStorage.setItem('login_status','1')
        localStorage.setItem('user_id',response.userId)
        localStorage.setItem('user_name',response.firstName)
        localStorage.setItem('role',response.role)
        localStorage.setItem('profile_image',response.profile_image)

        console.log("user id display",response.userId)
        console.log("user id display", this.userID)
        console.log("user name display", this.userName)
        console.log("user permission_role", this.role)
        // this.router.navigate(['/customernewall']);- whatever we need as home
        if(this.userID!=''){
        this.router.navigate(['/']);
      }
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
  AddQuotationGo() {
   


    // this.router.navigate(['/navbar'], { queryParams: { 
    //  userid: this.userID, 
    //   username: this.userName, 
    //   role_permission: this.role, 
    //    } });

   
  }
}
