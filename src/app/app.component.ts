import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from './services/server.service';
import { DatePipe } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERPUpdate';
  code_val: any;
  uscode: any;
  public file_path: string = "";
  templateAuthView = false;
  pageurl:any;
  constructor(private bnIdle: BnNgIdleService, private router: Router, private route: ActivatedRoute, private serverService: ServerService,public datepipe: DatePipe) {
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.code_val = params['code_val'];
        this.uscode = params['uscode'];
        this.pageurl = params['pageurl'];
        console.log(this.code_val);
        console.log(this.pageurl);
      }
      );
  }
  ngOnInit(): void {
    //60 = 1 minute
    //900 = 15 minute
    //3600= 1 hour
    //1800= 30 minutes
    //86400=24 hours
    this.bnIdle.startWatching(86400).subscribe((res) => {
      if (res) {
        localStorage.clear();
        this.templateAuthView = true;
        console.log('session expired after half an hour 24 hours');
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
        console.log(currentDateTime);
        // this.router.navigateByUrl('/logout');
        this.router.navigate(['/login']);
      }else{
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
        console.log(currentDateTime);
      }
    });


  }
  // qrLogin(){


  //   let api_req: any = new Object();
  //   let addAPI: any = new Object();
  //   api_req.moduleType = "login";
  //   api_req.api_url = "login_qrcode";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   addAPI.action = "login_qrcode";
  //   addAPI.userId_encode = this.getdatas['0'].userId;

  //   addAPI.code_val = 'YzRjX2VycA==';
  //   api_req.element_data = addAPI;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {


  //     this.loginDetails=response;
  //     this.userID=response.userId;
  //     this.userName=response.firstName;
  //     this.role=response.role;



  //     localStorage.setItem('access_token','test')
  //     localStorage.setItem('login_status','1')
  //     localStorage.setItem('user_id',response.userId)
  //     localStorage.setItem('user_name',response.firstName)
  //     localStorage.setItem('role',response.role)
  //     localStorage.setItem('profile_image',response.profile_image)


  //     if(this.userID!=''){
  //         this.router.navigate(['/']);
  //     }
  //     if(this.userID=='undefined'){
  //       this.router.navigate(['/logout']);
  //     }

  //   });



  // }

  onActivate(event: any) {
    this.file_path = this.router.url;
    // console.log(this.router.url);
     if (this.code_val != '' && this.code_val != undefined && this.code_val != 'undefined' && this.code_val != 'null' && this.code_val != null && this.uscode != '' && this.uscode != 'undefined' && this.uscode != undefined && this.uscode != 'null' && this.uscode != null) {
      localStorage.clear();
      this.templateAuthView == false
        this.router.navigate(['/login'],{queryParams:{code_val:this.code_val,uscode:this.uscode,pageurl:this.pageurl}});
        // this.router.navigate(['/login'],{queryParams:{code_val:this.code_val,uscode:this.uscode}});
      
   
    }else if (localStorage.getItem('access_token')) {
      // $('#ActionIdOutput').modal('hide');
      // $("body").removeClass("modal-open");
      this.templateAuthView = false;

    } else {
      this.templateAuthView = true;
      this.router.navigate(['/login']);
    }
    
  }

}
