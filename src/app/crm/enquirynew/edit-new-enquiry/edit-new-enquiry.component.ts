import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-edit-new-enquiry',
  templateUrl: './edit-new-enquiry.component.html',
  styleUrls: ['./edit-new-enquiry.component.css']
})
export class EditNewEnquiryComponent implements OnInit {
 
  public addEnquiry_section1: FormGroup;
  enquiryID:any;
  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.enquiryID = params['id'];
      console.log("this.enquiryID",this.enquiryID)
      
    });

    this.addEnquiry_section1=new FormGroup({
      'enquiryDate':new FormControl((new Date()).toISOString().substring(0, 10)),
      'billerName': new FormControl(null),
      'contactInfo':new FormControl(null),
      'email':new FormControl(null),
      'phoneNumber':new FormControl(null),
      'company':new FormControl(null),
      'country':new FormControl(null),
      'salesCode':new FormControl(null),
      'productName':new FormControl(null),
      'quantity':new FormControl(null),
      'followUpStatus':new FormControl(null),
      'toDoDate':new FormControl((new Date()).toISOString().substring(0,10)),
      'comments':new FormControl(null),


    });
  }

}
