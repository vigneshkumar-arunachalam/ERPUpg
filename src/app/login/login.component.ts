import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
declare var iziToast: any;
declare var $: any;
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { interval, Subscription } from 'rxjs';
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
  otpstatus = false;

  expired = false;
  count: number = 1;
  subscription: Subscription;
  public qrdata: string;
  public level: string;
  public width: number;
  datas: any;
  typess: any;
  websocket: any;
  getdatas: any;

  constructor(private router: Router, private serverService: ServerService,private bnIdle: BnNgIdleService) {
    this.websocket = new WebSocket('wss://myscoket.mconnectapps.com:4067');
    var s = this;
    this.websocket.onopen = function (event:any) {
      console.log('socket connected');
    };
    this.websocket.onmessage = function (event:any) {
      s.getdatas = JSON.parse(event.data);
      s.userLogin();
    };

    this.websocket.onerror = function (event:any) {
      console.log('error');
      console.log(event.message);
    };
   }

  ngOnInit(): void {
  
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      verify_otp_ctrl: new FormControl(null),
      // otp: new FormControl(null, Validators.required),
      
    });
    this.subscribes('');
    // this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     console.log('session expired');
    //   }
    // });
  }
  subscribes(val:any) {
    this.expired = false;
    if (val != '') this.count = 1;
    this.qrcodes();
    const source = interval(30000);
    this.subscription = source.subscribe((val) => this.qrcodes());
  }
  unsubscribe() {
    this.subscription.unsubscribe();
  }
  qrcodes() {
    this.count = ++this.count;
    console.log(this.count);
    if (this.count < 5) {
      this.level = 'M';
      this.width = 256;
      this.datas = uuidv4();
      this.typess = btoa('erp');
      console.log(this.typess);
      // const data = [
      //   {
      //     type: this.typess,
      //     address: this.datas,
      //   },
      // ];
     
      const data = [
        {
          userId: this.typess,
          unique_id_en: this.datas,
        },
      ];

      this.qrdata = JSON.stringify(data);
      console.log(this.qrdata);
    } else {
      this.expired = true;
      this.unsubscribe();
    }
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
  //  api_req.api_url = 'login';

    let button_val = $('#send_otp_id').val();
    if(button_val=='Send OTP'){
        api_req.api_url = 'login_otp';
    }else{
        api_req.api_url = 'login';
        loginFormapi_req.auth_id = $('#auth_id').val();
        loginFormapi_req.verify_otp_code = this.loginForm.value.verify_otp_ctrl;
    }

    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";

    loginFormapi_req.action = 'login';
    loginFormapi_req.username = this.loginForm.value.username;
    loginFormapi_req.password = this.loginForm.value.password;
    api_req.element_data = loginFormapi_req;
    console.log("api req", api_req)
    console.log("loginFormapi_req",loginFormapi_req)
    // return false;

    this.serverService.sendServer(api_req).subscribe((response: any) => {




      if (response.opt_status == true) {


        
        Swal.close();
        iziToast.success({
          message: 'OTP Sent to Email',
          position: 'topRight',
        });

        this.otpstatus = true;
        $('#send_otp_id').val("Login");
        $('#auth_id').val(response.auth_id);

      }else if (response.opt_status == 'false') {
        Swal.close();
        iziToast.error({
          message: 'Invalid OTP',
          position: 'topRight',
        });

      }else if (response.status == 'true') {

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

      //   console.log("user id display",response.userId)
      //   console.log("user id display", this.userID)
      //   console.log("user name display", this.userName)
      //   console.log("user permission_role", this.role)
        
        // this.router.navigate(['/customernewall']);- whatever we need as home
        if(this.userID!=''){
            this.router.navigate(['/']);
        }
      
        Swal.close();
        iziToast.success({
          message: 'Logged In Successfully',
          position: 'topRight',
        });

       
      } else {
        Swal.close();
        iziToast.error({
          message: 'Invalid Login credentials',
          position: 'topRight',
        });
      }




    
      // console.log(response);
      // if (response.status == 'true') {
      //   this.loginDetails=response;
      //   this.userID=response.userId;
      //   this.userName=response.firstName;
      //   this.role=response.role;


      //   localStorage.setItem('access_token','test')
      //   localStorage.setItem('login_status','1')
      //   localStorage.setItem('user_id',response.userId)
      //   localStorage.setItem('user_name',response.firstName)
      //   localStorage.setItem('role',response.role)
      //   localStorage.setItem('profile_image',response.profile_image)

      //   console.log("user id display",response.userId)
      //   console.log("user id display", this.userID)
      //   console.log("user name display", this.userName)
      //   console.log("user permission_role", this.role)
      //   // this.router.navigate(['/customernewall']);- whatever we need as home
      //   if(this.userID!=''){
      //   this.router.navigate(['/']);
      // }
      //   Swal.close();
      //   iziToast.success({
      //     message: 'Logged In Sucessfully',
      //     position: 'topRight',
      //   });

       
      // } else {
      //   Swal.close();
      //   iziToast.error({
      //     message: 'Invalid Login credentials',
      //     position: 'topRight',
      //   });
      // }
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
