import { Component, OnInit, ChangeDetectorRef,AfterViewInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import listPlugin from '@fullcalendar/list';
import { ServerService } from '../../services/server.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leavereq-final',
  templateUrl: './leavereq-final.component.html',
  styleUrls: ['./leavereq-final.component.css']
})

export class LeavereqFinalComponent implements OnInit, AfterViewInit{
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  user_ids: any;
  holidayForm: FormGroup;
  calendarOptions: CalendarOptions = {
    hiddenDays: [0], // Hide Sundays (0 = Sunday)
    dayHeaderFormat: { weekday: 'long' },
    plugins: [dayGridPlugin, interactionPlugin],

    initialView: 'dayGridMonth',
    events: [
      { title: 'Holiday', start: '2025-02-12', classNames: ['holiday-event'] },
      { title: 'Leave', start: '2025-02-15', classNames: ['leave-event'] },
      { title: 'Count', }
    ],
    // events: [] as EventInput[],
    editable: false,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.preventEmptyDateClick.bind(this),
    // eventClick: this.onEventClick.bind(this), 
    // dateClick: this.onDateClick.bind(this), 
    // displayEventTime: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    customButtons: {
      prev: {
        text: '<',
        click: () => {
          console.log('Previous button clicked');
         // this.prevMonth();
         const calendarApi = this.calendarComponent.getApi();
        calendarApi.prev();
        this.getLeaveRequestDetails();
        this.getHolidayList();
        }
      },
      next: {
        text: '>',
        click: () => {
          console.log('Next button clicked');
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.next();
          // this.nextMonth();
        }
      },
      today: {
        text: 'today',
        click: () => {
          console.log('Today button clicked');
        }
      }
    },
    datesSet: this.onDatesSet.bind(this),
  };
  showModal = false;
  selectedEvent: any = null;
  taskForm: FormGroup;
  eventDetails: any = { calendar_entries: [] };
  taskStatus = { OK: false, NOT_OK: false };
  monthVal: number = new Date().getMonth() + 1;
  yearVal: number = new Date().getFullYear();

  currentDate: string = new Date().toISOString().split('T')[0];
  nextDate: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  leaveCount: any;
  currentYearValue: number;
  policyDescription: any;
  annualLeave: any;
  balanceAnnualLeave: any;
  balanceMedicalLeave: any;
  carryForward: any;
  consumedAnnualLeave: any;
  consumedMedicalLeave: any;
  MedicalLeave: any;
  holidaysArray: any;
  silLeave: any;
  totalLeave: any;
  leaveBillerID: any;
  upcomingCarryForwadLeave: any;
  lastyearHolidaysArray: any;
  billerId: any;
  leaveCategory: any;
  LeaveType: any;
  leaveRequestForm: any;
  availableALCurrentMonth: any;
  TotalAL: any;
  balanceAL: any;
  consumedAL: any;
  balanceML: any;
  consumedML: any;
  TotalML: any;
  consumedLOP: any;
  pendingApproval: any;
  TotalAvailableLeave: any;
  leaveDataList: any;
  permissionCount: any;
  remainingPermi: number;
  today: string;
  medicalcert: any;
  holidaysCurrent: any;
  startLeave: any;
  EndDate: string;
  userLeaveDatas: any;
  countryList: any;
  countryListSG: any;
  countryListSGid: any;
  countryListMY: any;
  countryListMYid: any;
  countryListIND: any;
  countryListINDid: any;
  countryListPH: any;
  countryListPHid: any;
  countryListUSA: any;
  countryListUSAid: any;
  countryBillerID: any;
  assinedYear: number;
 


  constructor(private cd: ChangeDetectorRef,private spinner: NgxSpinnerService, private http: HttpClient, private serverService: ServerService, private datePipe: DatePipe) {
    this.taskForm = new FormGroup({
      taskStatus: new FormControl(''),
      notifyState: new FormControl(false),
      attachmentState: new FormControl(false),
      reason: new FormControl('')
    });
    this.today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }
 
  ngAfterViewInit(): void {
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      console.log('Calendar API:', calendarApi);
      // this.getLeaveRequestDetails();
      // this.getHolidayList();
    } else {
      console.log('Calendar component is not available');
    }

  }

  ngOnInit(): void {
    this.currentYearValue = new Date().getFullYear();
    console.log("this.currentYearValue", this.currentYearValue);
    this.assinedYear=this.currentYearValue; 
    this.leaveRequestForm = new FormGroup({
      'leaveType': new FormControl(null),
      'durationType': new FormControl(null),
      'startDate': new FormControl(this.today),
      'endDate': new FormControl(this.today),
      'medicalcert': new FormControl(null),
      'leaveReason': new FormControl(null),
    });
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
   // this.user_ids = 169;
   // this.getLeaveHolidayDetails();
     this.getLeaveRequestDetails();
     this.getHolidayList();
     this.getCountryList();
     this.getLeaveHolidayDetails();
    this.calendarOptions.hiddenDays = [0];
    // this.cd.detectChanges(); // Force Angular to update
 
  
   


  }
  prevMonth(calendar: any) {
    calendar.getApi().prev();
  }
  
  nextMonth(calendar: any) {
    calendar.getApi().next();
  }
  
  onEventClick(info: any) {
    alert('hi'); // When clicking on a leave event
  }

  onDateClick(info: any) {
    alert('hello'); // When clicking outside an event
  }

  onDatesSet(dateInfo: any) {
    console.log('View changed:', dateInfo.view.type);
    const startMonth = dateInfo.view.currentStart.getMonth() + 1;
    const startYear = dateInfo.view.currentStart.getFullYear();

    this.monthVal = startMonth;
    this.yearVal = startYear;


  }
  formatDate(dateString: string): string {
    if (!dateString) {
      console.error("Invalid or missing dateString:", dateString);
      return '';
    }

    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert from DD-MM-YYYY to YYYY-MM-DD
    } else {
      console.error("Invalid date format:", dateString);
      return '';
    }
  }
  leavetypechange(event: any) {
    this.medicalcert = event.target.value;

  }
  createLeave1(){
    this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/createLeave";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/createLeave";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.StartTime = this.startLeave;
    api_postUPd.EndTime = this.EndDate;
    api_postUPd.start_time = '00:00';
    api_postUPd.end_time = '00:00';

    api_postUPd.LeaveType = this.leaveRequestForm.value.leaveType;
    api_postUPd.LeaveCat = this.leaveRequestForm.value.durationType;
    api_postUPd.LeaveDesc = this.leaveRequestForm.value.leaveReason;
    api_postUPd.StartTime_value = this.startLeave;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
   
      if (response) {
        this.spinner.hide();

      } else {
        this.spinner.hide();
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
  getCountryList(){
    this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/getCountryList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "hr/getCountryList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
   
      if (response) {
        this.spinner.hide();
        this.countryListSG=response.biller[0].biller;
        this.countryListSGid=response.biller[0].biller_id;
        this.countryListMY=response.biller[1].biller;
        this.countryListMYid=response.biller[1].biller_id;
        this.countryListIND=response.biller[2].biller;
        this.countryListINDid=response.biller[2].biller_id;
        this.countryListPH=response.biller[3].biller;
        this.countryListPHid=response.biller[3].biller_id;
        this.countryListUSA=response.biller[3].biller;
        this.countryListUSAid=response.biller[3].biller_id;


      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Failed. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };



  }
  createLeave() {
    this.spinner.show();

    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('erp_c4c_user_id'));
    formData.append('api_url', 'hr/createLeave');
    formData.append('api_type', 'web');
    formData.append('access_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI'); // Replace with your access token
    formData.append('action', 'hr/createLeave');
    formData.append('StartTime', this.startLeave);
    formData.append('EndTime', this.EndDate);
    formData.append('start_time', '00:00');
    formData.append('end_time', '00:00');

    formData.append('LeaveType', this.leaveRequestForm.value.leaveType);
    formData.append('LeaveCat', this.leaveRequestForm.value.durationType);
    formData.append('LeaveDesc', this.leaveRequestForm.value.leaveReason);
    formData.append('StartTime_value', this.startLeave);

    

    $.ajax({
      type: 'POST',
     // url: 'https://erp1.cal4care.com/api/customer_contract/customer_contract_save',
      url: 'https://laravelapi.erp1.cal4care.com/api/hr/createLeave',

      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: (result: any) => {
        this.spinner.hide();
        if (result.status === true) {
      
          // this.contractList({});
          $("#leaveRequestFormId").modal("hide");
          Swal.fire({
            icon: 'success',
            title: 'Leave has been Saved',
            showConfirmButton: false,
            timer: 1200,
          });
        }else if(result.status === false){
          this.spinner.hide();
            iziToast.error({
            title: 'Error,Check Missing Field Values',
            message: 'Leave not Saved !',
            position:'topRight',
          });
        }
       
      },
      error: (err: any) => {
        this.spinner.hide();
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while saving the contract.',
        });
      }
    });
  }
  changeCountry(billerid:any){
    this.countryBillerID=billerid;
    console.log("this.countryBillerID",this.countryBillerID);
    this.getHolidayList();

  }
  handleDateSelect(selectInfo: any) {
    // alert("hi")
    this.startLeave = selectInfo.startStr;
    // const end = selectInfo.endStr;
    console.log("start-drag", this.startLeave);
    let endDate1 = new Date(selectInfo.endStr); // Convert string to Date object
    endDate1.setDate(endDate1.getDate() - 1); // Subtract 1 day
    this.EndDate = endDate1.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD format
    console.log('Adjusted End Date:', this.EndDate);
    $('#leaveRequestFormId').modal('show');
    this.leaveRequestForm.patchValue({
      'startDate': this.startLeave,
      'endDate': this.EndDate,
    })

    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/currenctDayLeave";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/currenctDayLeave";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.startDate = this.startLeave;
    sendMet_req.endDate = this.EndDate;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response) {
        this.leaveCategory = response.leavecat;
        this.LeaveType = response.leavetype;
        this.leaveDataList = response.leaveData;
        this.permissionCount = response.permissionCount;
        this.remainingPermi = 2 - this.permissionCount;

        this.availableALCurrentMonth = response.indLeaveDatas[0].available_al_current_month;

        this.TotalAL = response.indLeaveDatas[0].total_al;
        this.balanceAL = response.indLeaveDatas[0].balance_al;
        this.consumedAL = response.indLeaveDatas[0].consumed_al;

        this.balanceML = response.indLeaveDatas[0].balance_ml;
        this.consumedML = response.indLeaveDatas[0].consumed_ml;
        this.TotalML = response.indLeaveDatas[0].total_ml;

        this.consumedLOP = response.indLeaveDatas[0].consumed_lop;
        this.pendingApproval = response.indLeaveDatas[0].pending_approval;
        this.TotalAvailableLeave = response.indLeaveDatas[0].totalavailableLeave;



      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }



    

    

  }
  handleEventClick(arg: any) {
    // console.log("arg",arg)
 
  //  alert("hello-bottom-last")
    $('#leaveRequestFormId-2').modal('show');
    const currentDate = arg.event.start;
    console.log('Clicked event date:', currentDate);
    const formattedDate1 = currentDate?.toLocaleDateString();
    console.log('Formatted date:', formattedDate1);
    const formattedDate = currentDate ? currentDate.toISOString().split('T')[0] : '';
    console.log("currentDate", formattedDate)
    // alert(`Event: ${arg.event.title}`);
    this.selectedEvent = arg.event;

    const calendarTemplateId = this.selectedEvent.extendedProps.calendar_template_id;
    const eventDate = new Date(this.selectedEvent.start);
    const entryDate = eventDate.getDate();
    const entryMonth = eventDate.getMonth() + 1;
    const entryYear = eventDate.getFullYear();

    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/currenctDayLeaveHR";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/currenctDayLeaveHR";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.date = formattedDate1;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response) {
        this.leaveDataList = response.leaveData;
      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }





  }
  preventEmptyDateClick(arg: any) {
    //  console.log("arg",arg.dateStr);
    $('#leaveRequestFormId').modal('show');
    // const currentDate=arg.dateStr;
    const currentDate = new Date(arg.dateStr).toISOString().split('T')[0];
    console.log("currentDate", currentDate)
    //   alert(`You cannot apply for leave on ${arg.dateStr}`);

    // const events = this.calendarOptions.events as EventInput[];
    // const isEventDay = events.some((event) => event.start === arg.dateStr);
    //   console.log("isEventDay",isEventDay);

    // if (!isEventDay) {
    //   console.log('No events on this day.');
    // } else if (arg.dateStr === this.nextDate) {
    //   console.log('Next day is read-only.');
    // }

    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/currenctDayLeave";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/currenctDayLeave";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.date = currentDate;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response) {
        this.leaveCategory = response.leavecat;
        this.LeaveType = response.leavetype;
        this.leaveRequestForm.patchValue({
          'startDate': currentDate,
          'endDate': currentDate,
        })



      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }




  }
  getLeaveRequestDetails() {


    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/getLeaveRquest";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/getLeaveRquest";

    sendMet_req.user_id = this.user_ids;
    sendMet_req.month = this.monthVal;
    sendMet_req.year = this.yearVal;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.leaveCount = response.leaveCount;
        this.calendarOptions.events = response.leaveCount.map((item: { leave_count: any; leave_date: any; }) => ({
          title: `Leave: ${item.leave_count}`, // Display leave count in event title
          start: item.leave_date
        }));


        this.calendarOptions.hiddenDays = this.calendarOptions.hiddenDays.includes(0)
          ? this.calendarOptions.hiddenDays.filter(day => day !== 0)
          : [...this.calendarOptions.hiddenDays, 0];





      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  changeYear(year:any){
    this.assinedYear=year;
    console.log("this.assinedYear",this.assinedYear);
    this.getHolidayList();

  }
  getHolidayList() {
    $("#holidayFormId").modal("show");


    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/holidayList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/holidayList";
    sendMet_req.user_id = this.user_ids;
    if(!this.countryBillerID){
      sendMet_req.biller_id = '';
    }else{
      sendMet_req.biller_id = this.countryBillerID;
    }
   
    sendMet_req.year = this.assinedYear;
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.billerId = response.billerId;
        this.policyDescription = response.policy_description;
        this.annualLeave = response.annual_leave;
        this.balanceAnnualLeave = response.balance_annual_leave;
        this.balanceMedicalLeave = response.balance_medical_leave;

        this.carryForward = response.carry_forward;
        this.consumedAnnualLeave = response.consumed_annual_leave;
        this.consumedMedicalLeave = response.consumed_medical_leave;
        this.MedicalLeave = response.medical_leave;


        this.silLeave = response.sil_leave;
        this.totalLeave = response.total_leave;
        this.leaveBillerID = response.billerId;
        this.upcomingCarryForwadLeave = response.upcomingCarryForwadLeave;

        this.holidaysArray = response.holidays;
        this.lastyearHolidaysArray = response.last_year_holidays;

        this.userLeaveDatas=response.userleaveDatas;

      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  getLeaveHolidayDetails() {


    let api_req: any = new Object();
    let sendMet_req: any = new Object();
    api_req.moduleType = "hr";
    api_req.api_url = "hr/holidayListYear";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    sendMet_req.action = "hr/holidayListYear";

    sendMet_req.user_id = this.user_ids;
  
    api_req.element_data = sendMet_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.holidaysCurrent=response.holidays;
        if (response.status && response.holidays) {
          const formattedEvents = response.holidays.map((holiday: { description: any; date: string; }) => ({
            title: holiday.description,
            start: this.convertDateFormat(holiday.date), // Convert DD-MM-YYYY to YYYY-MM-DD
            classNames: ['holiday-event']
          }));

          this.calendarOptions = { ...this.calendarOptions, events: formattedEvents };
        } 


      }
      else {

        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  convertDateFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split('-'); 
    return `${year}-${month}-${day}`; // Rearrange to YYYY-MM-DD
  }

}

