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
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  userID: any;
  userName: any;
  loginDetails: any;
  role: any = [];
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
  code_val: any;
  uscode: any;
  page_url: any;
  paramesh_ipAddress: any;
  qr_unique:any;
  unixTimestamp: number;

  constructor(private router: Router, private route: ActivatedRoute, 
    private serverService: ServerService, private bnIdle: BnNgIdleService, 
    private spinner: NgxSpinnerService) {
    this.route.queryParams
      .subscribe(params => {
        // console.log("params output value", params);
        this.code_val = params['code_val'];
        this.uscode = params['uscode'];
        this.page_url = params['pageurl'];
        // console.log(this.code_val);
        // console.log(this.uscode);
        // console.log(this.page_url);
        if (this.code_val != '' && this.code_val != undefined && this.code_val != 'undefined' && this.code_val != 'null' && this.code_val != null && this.uscode != '' && this.uscode != 'undefined' && this.uscode != undefined && this.uscode != 'null' && this.uscode != null) {
          this.old_erp_login();
        }

      }
      );
    this.websocket = new WebSocket('wss://myscoket.mconnectapps.com:4006');
    // console.log("this.websocket",this.websocket)
    var s = this;
    // console.log('s', s);
    this.websocket.onopen = function (event: any) {
    //   console.log('socket connected');
    };
    this.websocket.onmessage = function (event: any) {
    //   console.log(event.data)
      s.getdatas = JSON.parse(event.data);
      console.log('socket detail', s.getdatas['0']);
      console.log(s.getdatas['0'])
      if (s.getdatas['0'].userId && s.getdatas['0'].unique_id_en) {
        if (localStorage.getItem('unique_id_en') == s.getdatas['0'].unique_id_en) {
          // s.qr_unique = s.getdatas['0'].unique_id_en;
          s.qrLogin();
        }
      //  this.websocket.onclose;
      }
      // if(s.getdatas.login_status=="login_successful"){
      //   s.qrLogin();
      // }

    };

    this.websocket.onerror = (event: any) => {
        this.spinner.hide();
        // console.log('error');
        // console.log(event.message);
      };
  
      this.websocket.onclose = (event: any) => {
        this.spinner.hide();
        // console.log('close');
      };

  }
  //  code_val=WXpSalgyOXNaR1Z5Y0E9PQ==&uscode=TXprPQ==


  ngOnInit(): void {

    this.getIPAddress();
    this.unixTimestamp = Math.floor(Date.now() / 1000);
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      verify_otp_ctrl: new FormControl(null),

    });
   this.subscribes('');

  }



  subscribes(val: any) {
    this.expired = false;
    if (val != '') this.count = 1;
    this.qrcodes();
    const source = interval(30000);
    this.subscription = source.subscribe((val) => this.qrcodes());
  }
  unsubscribe() {
    this.subscription.unsubscribe();
  }
 
  getIPAddress() {
   
    let api_req: any = new Object();
    let rc_api: any = new Object();
    api_req.moduleType = "getUniqueId";
    api_req.api_url = "getUniqueId";
    api_req.access_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    rc_api.action = "getUniqueId";
    api_req.element_data = rc_api;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.paramesh_ipAddress=response;
        // console.log(" this.paramesh_ipAddress", this.paramesh_ipAddress)

      } else {
        iziToast.warning({
          message: "update failed",
          position: 'topRight'
        });
      }

    }), (error: any) => {
      iziToast.error({
        message: "Error",
        position: 'topRight'
      });
    //   console.log("error",error)

    };

  }
  qrLogin() {
// console.log(this.qr_unique);
// console.log(this.paramesh_ipAddress);
// if(this.qr_unique!=this.paramesh_ipAddress){
// return false;
// }
    let api_req: any = new Object();
    let addAPI: any = new Object();
    api_req.moduleType = "login";
    api_req.api_url = "login_qrcode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "login_qrcode";
    addAPI.userId_encode = this.getdatas['0'].userId;

    addAPI.code_val = 'YzRjX2VycA==';
    api_req.element_data = addAPI;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#u_id").val(response.userId);
    //   console.log("response", response);
      this.loginDetails = response;
      this.userID = response.userId;
      this.userName = response.firstName;
      this.role = response.role;

    //   console.log($("#u_id").val());
      // return false;
      if ($("#u_id").val() != '') {
        localStorage.setItem('access_token', 'test')
        localStorage.setItem('login_status', '1')
        localStorage.setItem('erp_c4c_user_id', response.userId)
        localStorage.setItem('user_name', response.firstName)
        localStorage.setItem('role', response.role)
        localStorage.setItem('profile_image', response.profile_image)
        localStorage.setItem('payment_transaction_reports', response.payment_transaction_reports);

        // console.log("profile_image", alert);
        this.router.navigate(['/']);
      }

      if ($("#u_id").val() == 'undefined') {
        localStorage.clear();
        this.router.navigate(['/logout']);
      }

      // if (this.userID != '') {
      //   this.router.navigate(['/']);
      // }
      // if (this.userID == 'undefined') {
      //   localStorage.clear();
      //   this.router.navigate(['/logout']);
      // }

    });



  }
  old_erp_login() {
    let api_req: any = new Object();
    let addAPI: any = new Object();
    api_req.moduleType = "login";
    api_req.api_url = "login_olderp";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "login_olderp";
    addAPI.uscode = this.uscode;

    addAPI.code_val = this.code_val;
    api_req.element_data = addAPI;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      localStorage.setItem('access_token', 'test')
      localStorage.setItem('login_status', '1')
      localStorage.setItem('erp_c4c_user_id', response.userId)
      localStorage.setItem('user_name', response.firstName)
      localStorage.setItem('role', response.role)
      localStorage.setItem('profile_image', response.profile_image);
      localStorage.setItem('payment_transaction_reports', response.payment_transaction_reports);
    //  localStorage.setItem('payment_transaction_reports', response.payment_transaction_reports)
    //   console.log("profile_image", alert);
    //   console.log("olderp-login response", response)
      if (response.userId != '') {
        setTimeout(() => {
          var k = '{"data":"reload_profile_data"}';
          this.serverService.reload_profile.next(k);
          // var v = btoa(this.page_url);
        //   console.log('/' + this.page_url);
          // return false;
          this.router.navigate(['/' + this.page_url], { queryParams: { ids: btoa(response.userId) } });
          // this.router.navigate(['/'],{ queryParams: { ids: btoa(response.userId)}});
        }, 1000)
      }
      if (response.userId == 'undefined' || response.userId === null || response.userId == '') {
        localStorage.clear();
        this.router.navigate(['/logout']);
      }
    });
  }
  qrcodes() {
    // need api to get unique id from paramesh,,,, store unique id in seperate variable(local storage),,while scan local id from mobile app should equal this id
    this.count = ++this.count;

    if (this.count < 5) {
      this.level = 'M';
      this.width = 256;
      this.datas = uuidv4();
    //   console.log("unique id from angular", this.datas)
      localStorage.setItem('unique_id_en',this.datas);
      this.typess = "ERP_login";//btoa('erp');

      const data = 
        {
          type: this.typess,
          unique_id: this.datas,
          time:this.unixTimestamp
        }
      



      this.qrdata = JSON.stringify(data);

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


    let button_val = $('#send_otp_id').val();
    if (button_val == 'Send OTP') {
      api_req.api_url = 'login_otp';
    } else {
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
    // console.log("api req", api_req)
    // console.log("loginFormapi_req", loginFormapi_req)
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

      } else if (response.opt_status == 'false') {
        Swal.close();
        iziToast.error({
          message: 'Invalid OTP',
          position: 'topRight',
        });

      } else if (response.status == 'true') {
        Swal.close();
        this.loginDetails = response;
        this.userID = response.userId;
        this.userName = response.firstName;
        this.role = response.role;

        localStorage.setItem('access_token', 'test')
        localStorage.setItem('login_status', '1')
        localStorage.setItem('erp_c4c_user_id', response.userId)
        localStorage.setItem('user_name', response.firstName)
        localStorage.setItem('role', response.role)
        localStorage.setItem('profile_image', response.profile_image)
        localStorage.setItem('payment_transaction_reports', response.payment_transaction_reports)
        // console.log("profile_image", alert);


        if (this.userID != '') {
          Swal.close();
       
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

    }),
      (error: any) => {
        Swal.close();
        console.log(error);
      }

  }
  AddQuotationGo() {

  }
}