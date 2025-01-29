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
  title = 'ERP';
  code_val: any;
  uscode: any;
  read_state: number = 1;
  greeting: any = null;
  statusFlag:any;
  public file_path: string = "";
  templateAuthView = false;
  pageurl:any;
  constructor(private bnIdle: BnNgIdleService, private router: Router, private route: ActivatedRoute, private serverService: ServerService,public datepipe: DatePipe) {
    this.route.queryParams
      .subscribe(params => {
      //  console.log("params output value", params);
        this.code_val = params['code_val'];
        this.uscode = params['uscode'];
        this.pageurl = params['pageurl'];
        // console.log(this.code_val);
        // console.log(this.pageurl);
      }
      );
  }
  ngOnInit(): void {
    this.getGreetingList();
    //60 = 1 minute
    //900 = 15 minute
    //3600= 1 hour
    //1800= 30 minutes
    //86400=24 hours
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        localStorage.clear();
        this.templateAuthView = true;
      console.log('session expired after 60 seconds');
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
      //  console.log(currentDateTime);
        // this.router.navigateByUrl('/logout');
        this.router.navigate(['/login']);
      }else{
        let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
     //   console.log(currentDateTime);
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

  onActivate(event: any): any {
    this.file_path = this.router.url;
    if (this.router.url == '/login' ) {
        this.templateAuthView = true;
        localStorage.clear();
        return false;
    }
    // console.log(this.router.url);
    if (localStorage.getItem('access_token')) {
      $('#ActionIdOutput').modal('hide');
      $('#ActionIdxx2').modal('hide');
        this.templateAuthView = false;
      
    }
    else if (this.code_val != '' && this.code_val != undefined && this.code_val != 'undefined' && this.code_val != 'null' && this.code_val != null && this.uscode != '' && this.uscode != 'undefined' && this.uscode != undefined && this.uscode != 'null' && this.uscode != null) {
      localStorage.clear();
      this.templateAuthView == true
        this.router.navigate(['/login'],{queryParams:{code_val:this.code_val,uscode:this.uscode,pageurl:this.pageurl}});
        // this.router.navigate(['/login'],{queryParams:{code_val:this.code_val,uscode:this.uscode}});
      
   
    }
  
    else {
        this.router.navigate(['/login']);
        this.templateAuthView = true;
    }
    


  }
// below is the login code that worked on or before 11.07.2024 for onActivate(event:any)

  // onActivate(event: any) {
  //   this.file_path = this.router.url;
    
  // if (this.code_val != '' && this.code_val != undefined && this.code_val != 'undefined' && this.code_val != 'null' && this.code_val != null && this.uscode != '' && this.uscode != 'undefined' && this.uscode != undefined && this.uscode != 'null' && this.uscode != null) {
  //     localStorage.clear();
  //     this.templateAuthView == true
  //       this.router.navigate(['/login'],{queryParams:{code_val:this.code_val,uscode:this.uscode,pageurl:this.pageurl}});
   
  //   }else if (localStorage.getItem('access_token')) {
  //   $('#ActionIdOutput').modal('hide');
  //   $('#ActionIdxx2').modal('hide');
     
  //     this.templateAuthView = false;

  //   } else {
  //     this.templateAuthView = true;
  //     this.router.navigate(['/login']);
  //   }
    
  // }

  getGreetingList(): void {
    const api_req: any = new Object();
  
    api_req.moduleType = 'greetings';  
    api_req.api_url = 'greetings/getGreetingList';
    api_req.api_type = 'web'; 
    api_req.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI'; // Keep the token securely stored
    api_req.element_data = {
      action: 'getGreetingList', 
      user_id: localStorage.getItem('erp_c4c_user_id')
    };

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status === true) {
        const today = new Date().toISOString().split('T')[0]; 
        const greetingDates = response.dates;
        
        console.log(response);
        if (greetingDates.includes(today)) {
          
          this.read_state = response.read_state;
          if(this.read_state == 0){
           // alert(this.read_state);
            $('.read_state').modal('show');
          }
          this.greeting = {
            festival: response.festival,
            text: response.text,
            url: response.url
          };
        } else {
          console.log('Today is not a greeting date.');
        }
      } else {
        console.warn('No greetings found or an error occurred.');
       
      }
    },
    (error) => {
      console.error('Error occurred while fetching data:', error);
    });
  }
  updateGreetingStatus1(){
    $('.read_state').modal('hide');
  }

  updateGreetingStatus(): void {
    this.closeModal();
    this.read_state = 1;

    const api_req: any = {
      moduleType: 'updateUserNotifyStatus',
      api_url: 'greetings/updateUserNotifyStatus',
      api_type: 'web',
      access_token: 'your-secure-token', // Replace with your secure token
      element_data: {
        action: 'updateUserNotifyStatus',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        greeting_read: this.read_state,
      },
    };

    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        console.log('Greeting status updated:', response);
        // Close the modal using jQuery after the API call
       
      },
    
    );
  }
  closeModal(): void {
    // This will hide the modal
    // To hide the backdrop manually:
    $('.read_state').removeClass('show').css('display', 'none').attr('aria-hidden', 'true');
    $('.modal-backdrop').remove(); 

    

  }
  
 
}
