import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl, FormGroupName } from '@angular/forms';
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


import { ExcelExportService } from 'src/app/reports/invoicereportsold/excel-export.service';
import { FileDownloadService } from 'src/app/reports/invoicereportsold/file-download.service';

@Component({
  selector: 'app-staffpermissionreport',
  templateUrl: './staffpermissionreport.component.html',
  styleUrls: ['./staffpermissionreport.component.css']
})
export class StaffpermissionreportComponent implements OnInit {
  user_ids: string;
  leavetypeList: any;
  userList: any;
  user_hr_groupsList: any;
  attendanceForm: FormGroup;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
 
  LastDateSelected: any;
  dateArray: number[] = [];
  fromDateSelected: any;
  attendanceList: any ;
  groupedData: any = {};
  uniqueDates: string[] = [];
  ExcelReportList: any;
  ExcelReportLeaveList: any;
  address_AR: any;
  country_AR: any;
  createdDate_AR: any;
  location_AR: any;
  placeType_AR: any;
  timeField_AR: any;
  userID_AR: any;
  userName_AR: any;
  listShow: boolean=true;
  constructor(public serverService: ServerService,private fileDownloadService: FileDownloadService,
    private excelExportService: ExcelExportService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.attendanceDropDownList();

    // Get the current date
    const today = new Date();
    this.LastDateSelected = today.getDate();
    console.log("this.LastDateSelected", this.LastDateSelected);

    // Get the first day of the current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.attendanceForm = new FormGroup({
      'fromDate': new FormControl(this.datePipe.transform(firstDayOfMonth, 'yyyy-MM-dd')),
      'toDate': new FormControl(this.datePipe.transform(today, 'yyyy-MM-dd')),
      'leaveType': new FormControl(''),
      'country': new FormControl(''),
      'employee': new FormControl(''),
    });

    this.attendanceForm.get('fromDate')?.valueChanges.subscribe((date: string) => {
      if (date) {
        // Extract the day from the selected date
        const day = new Date(date).getDate(); // Returns the day (1-31)
        console.log('Selected Day:', day);
        this.fromDateSelected = day;
      }
      this.dateArray = Array.from(
        { length: this.LastDateSelected - this.fromDateSelected + 1 },
        (_, i) => this.fromDateSelected + i
      );
      console.log('Generated Date Array:', this.dateArray);
      this.attendanceReportList({});
    });

    this.attendanceForm.get('toDate')?.valueChanges.subscribe((date: string) => {
      if (date) {
        // Extract the day from the selected date
        const day = new Date(date).getDate(); // Returns the day (1-31)
        console.log('Selected Day:', day);
        this.LastDateSelected = day;
      }
      this.dateArray = Array.from({ length: this.LastDateSelected }, (_, i) => i + 1);
      console.log('Generated Date Array:', this.dateArray);
      this.attendanceReportList({});
    });

    this.dateArray = Array.from({ length: this.LastDateSelected }, (_, i) => i + 1);
    this.attendanceReportList({});
  }
countryDropDownList(event:any) {
this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendancCountryWiseUserList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendancCountryWiseUserList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.hr_group_id = event.target.value;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
    
        this.userList = response.user;
        this.attendanceReportList({});
    


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
  attendanceDropDownList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendanceDropDownList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendanceDropDownList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.leavetypeList = response.leavetype;
        this.userList = response.user;
        this.user_hr_groupsList = response.user_hr_groups;


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
  attendanceTime(id:any) {
    this.spinner.show();
    console.log("id",id);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendanceDetailsList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendanceDetailsList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.id = id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#attendanceFormId').modal('show');
        this.address_AR=response.data[0].address;
        this.country_AR=response.data[0].country;
        this.createdDate_AR=response.data[0].created_dt;
        this.location_AR=response.data[0].location;
        this.placeType_AR=response.data[0].place_type;
        this.timeField_AR=response.data[0].time_field;
        this.userID_AR=response.data[0].userId;
        this.userName_AR=response.data[0].username;
   

      } else {
        iziToast.warning({
          message: " Loading Failed. Please try again",
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
  attendanceReportCall() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendanceReporExceltList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendanceReporExceltList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.country = this.attendanceForm.value.country;
    api_postUPd.em = this.attendanceForm.value.employee;
    api_postUPd.from_dt = this.attendanceForm.value.fromDate;
    api_postUPd.to_dt = this.attendanceForm.value.toDate;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
   
        this.ExcelReportList = response.data;
        this.excelExportService.exportAsExcelFile(this.ExcelReportList, 'AttendanceReport');

      } else {
        iziToast.warning({
          message: " Loading Failed. Please try again",
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
  leaveReportCall() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendancePermissionExcelReportList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendancePermissionExcelReportList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
  

    api_postUPd.from_dt = this.attendanceForm.value.fromDate;
    api_postUPd.to_dt = this.attendanceForm.value.toDate;
    api_postUPd.country = this.attendanceForm.value.country;
    api_postUPd.leavetype = this.attendanceForm.value.leaveType;
    api_postUPd.em = this.attendanceForm.value.employee;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
   
        this.ExcelReportLeaveList = response.datas;
        this.excelExportService.exportAsExcelFile(this.ExcelReportLeaveList, 'ExcelReport');

      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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
  exportToExcel(): void {
    this.excelExportService.exportAsExcelFile(this.ExcelReportList, 'Sample');
  }
  
  attendanceReportList(data: any) {
    this.spinner.show();
   // var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/attendancePermissionReportList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/attendancePermissionReportList";
    // api_postUPd.off_set = list_data.offset;
    // api_postUPd.limit_val = list_data.limit;
    // api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_postUPd.search_txt = '';
    // api_postUPd.current_page = '';

    api_postUPd.from_dt = this.attendanceForm.value.fromDate;
    api_postUPd.to_dt = this.attendanceForm.value.toDate;
    api_postUPd.country = this.attendanceForm.value.country;
    api_postUPd.leavetype = this.attendanceForm.value.leaveType;
    api_postUPd.em = this.attendanceForm.value.employee;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.attendanceList = response.datas;
        if(response.datas==null){
          this.listShow=false;
        }
        // this.pettyCashListValue = response.data;
        // this.response_total_cnt = response.count;
        this.processData();
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      } else {
        iziToast.warning({
          message: " List Loading Failed. Please try again",
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
  // listDataInfo(list_data: any) {
    
  //   list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
  //   list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
  //   list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
  //   return list_data;
  // }
  processData() {
    if (!this.attendanceList || !Array.isArray(this.attendanceList)) {
      console.error('attendanceList is invalid or not an array');
      return;
    }

    // Extract unique dates and sort them
    this.uniqueDates = [...new Set(this.attendanceList.map(item => item.created_dt))].sort();

    // Group data by name and date
    this.groupedData = this.attendanceList.reduce((acc, item) => {
      if (item.name && item.created_dt) {
        if (!acc[item.name]) {
          acc[item.name] = {};
        }
        if (!acc[item.name][item.created_dt]) {
          acc[item.name][item.created_dt] = [];
        }

        // Push the entry instead of overwriting
        acc[item.name][item.created_dt].push({
          check_out_time: item.check_out_time || 'N/A',
          place_type: item.place_type || 'Unknown',
          id: item.id ,
        });
      }
      return acc;
    }, {} as { [key: string]: { [key: string]: any[] } });

    console.log('Processed Data:', this.groupedData);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
