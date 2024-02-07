import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl,FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
declare var $:any;
declare var iziToast:any;
declare var tinymce:any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recurring-dateupdate',
  templateUrl: './recurring-dateupdate.component.html',
  styleUrls: ['./recurring-dateupdate.component.css']
})
export class RecurringDateupdateComponent implements OnInit {
  recurDateList: any;

  constructor(public serverService:ServerService,public sanitizer:DomSanitizer,
    private route:ActivatedRoute, private router:Router,private fb:FormBuilder,
    private bnIdle:BnNgIdleService,private spinner:NgxSpinnerService) {

   }

  ngOnInit(): void {
    this.recurringDateList();

  }
  recurringDateList(){
    // this.spinner.show();
    let api_req:any= new Object();
    let RDL_api_url:any=new Object();
    api_req.moduleType="recurring_checker_date_update";
    api_req.api_url="recurring_checker_date_update/get_recurring_listData";
    api_req.api_type="web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    RDL_api_url.action="get_recurring_listData";
    RDL_api_url.user_id=localStorage.getItem('erp_c4c_user_id');
    api_req.element_data=RDL_api_url;

    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response!=''){
        this.recurDateList=response.data;
      }else{

      }

    }),(error:any)=>{
        iziToast.error({
          message: "Error",
          position:"topRight"
        })
        console.log("error",error)


    }



  }

}
