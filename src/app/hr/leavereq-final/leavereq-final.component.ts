import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import listPlugin from '@fullcalendar/list';
import { ServerService } from '../../services/server.service';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;
@Component({
  selector: 'app-leavereq-final',
  templateUrl: './leavereq-final.component.html',
  styleUrls: ['./leavereq-final.component.css']
})
export class LeavereqFinalComponent implements OnInit {
  user_ids: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    hiddenDays: [0], 
    initialView: 'dayGridMonth',
    events: [
      { title: 'Holiday', start: '2025-02-12',classNames: ['holiday-event']  },
      { title: 'Leave', start: '2025-02-15', classNames: ['leave-event']   },
      { title: 'Count',    }
    ],
    // events: [] as EventInput[],
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.preventEmptyDateClick.bind(this),
    displayEventTime: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
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

  constructor(private http: HttpClient,private serverService: ServerService) {
    this.taskForm = new FormGroup({
      taskStatus: new FormControl(''),
      notifyState: new FormControl(false),
      attachmentState: new FormControl(false),
      reason: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.getLeaveRequestDetails();
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
  handleEventClick(arg: any) {
    alert(`Event: ${arg.event.title}`);
    this.selectedEvent = arg.event;

    const calendarTemplateId = this.selectedEvent.extendedProps.calendar_template_id;
    const eventDate = new Date(this.selectedEvent.start);
    const entryDate = eventDate.getDate();
    const entryMonth = eventDate.getMonth() + 1;
    const entryYear = eventDate.getFullYear();

    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/publicTask/getCalendarEntryDetails';
    const payload = {
      moduleType: 'publicTask',
      api_url: 'publicTask/getCalendarEntryDetails',
      api_type: 'web',
      element_data: {
        action: 'getCalendarEntryDetails',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        calendar_template_id: calendarTemplateId,
        entry_date: entryDate,
        entry_month: entryMonth,
        entry_year: entryYear,
      }
    };

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        if (response.staus) {
          // Ensure the attachment_state is initialized to a default value if it's not present in the API response
          this.eventDetails = response;
          this.eventDetails.calendar_entries.forEach((entry: { attachment_state: number; work_status_yes: string; work_status_no: string; notify_state: number; reason: string; }) => {
            entry.attachment_state = entry.attachment_state || 0; // Set default if undefined
            entry.work_status_yes = entry.work_status_yes || '';  // Set default if undefined
            entry.work_status_no = entry.work_status_no || '';    // Set default if undefined
            entry.notify_state = entry.notify_state || 0;  // Set default if undefined
            entry.reason = entry.reason || '';  // Set default if undefined
          });

          this.showModal = true;
        } else {
          console.error('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
    preventEmptyDateClick(arg: any) {
      alert(`You cannot apply for leave on ${arg.dateStr}`);
    const events = this.calendarOptions.events as EventInput[];
    const isEventDay = events.some((event) => event.start === arg.dateStr);

    // Prevent clicks for non-event days and read-only for the next day
    if (!isEventDay) {
      console.log('No events on this day.');
    } else if (arg.dateStr === this.nextDate) {
      console.log('Next day is read-only.');
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
        this.leaveCount=response.leaveCount;
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

}
