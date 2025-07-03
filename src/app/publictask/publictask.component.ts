import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,FormArray, AbstractControl,ValidatorFn, ValidationErrors } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
declare var iziToast: any;
@Component({
  selector: 'app-publictask',
  templateUrl: './publictask.component.html',
  styleUrls: ['./publictask.component.css']
})
export class PublictaskComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [] as EventInput[],
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.preventEmptyDateClick.bind(this),
    displayEventTime: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    datesSet: this.onDatesSet.bind(this),
  };
  showgeneratereport = false;
  showModal = false;
  selectedEvent: any = null;
  eventDetailsForm: FormGroup;
  eventDetails: any = { calendar_entries: [] };
  taskStatus = { OK: false, NOT_OK: false };
  dateVal : number =0;
  monthVal: number = new Date().getMonth() + 1;
  yearVal: number = new Date().getFullYear();
  currentDate: string = new Date().toISOString().split('T')[0];
  nextDate: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  generatereport: any;

  constructor(private http: HttpClient,private fb: FormBuilder,private serverService: ServerService, private spinner: NgxSpinnerService) {
    this.eventDetailsForm = this.fb.group({
      calendar_entries: this.fb.array([]) 
    });
}
  ngOnInit(): void {
    this.loadEvents();
  }
  onDatesSet(dateInfo: any) {
    const startMonth = dateInfo.view.currentStart.getMonth() + 1;
    const startYear = dateInfo.view.currentStart.getFullYear();

    this.monthVal = startMonth;
    this.yearVal = startYear;

    this.loadEvents();
  }

  loadEvents() {
    const apiUrl = this.serverService.urlFinal + 'publicTask/getPublicTaskList';
    const payload = {
      moduleType: 'publicTask',
      api_url: 'publicTask/getPublicTaskList',
      api_type: 'web',
      element_data: {
        action: 'publicTask',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        monval: this.monthVal,
        yearval: this.yearVal
      }
    };

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        if (response.status) {
          const events = response.calendarDatas
            .map((event: any) => ({
              title: event.calendar_template_name,
              start: this.formatDate(event.calendar_date),
              color: event.label_color_code || '#ff5555',
              calendar_template_id: event.calendar_template_id,
            }))
            .filter((event: any) => event.start <= this.currentDate); 

          this.calendarOptions.events = events;
        } else {
          console.error('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
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
  get calendarEntries(): FormArray {
    return this.eventDetailsForm.get('calendar_entries') as FormArray;
  }

  handleEventClick(arg: any) {
    this.selectedEvent = arg.event;
  
    const calendarTemplateId = this.selectedEvent.extendedProps.calendar_template_id;
    const eventDate = new Date(this.selectedEvent.start);
    const entryDate = eventDate.getDate();
    const entryMonth = eventDate.getMonth() + 1;
    const entryYear = eventDate.getFullYear();
    this.dateVal = entryDate;
    const apiUrl =this.serverService.urlFinal + 'publicTask/getCalendarEntryDetails';
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
          // Map the response data
          this.eventDetails = response;
          this.mapEventDetails(this.eventDetails.calendar_entries);
          this.showModal = true;
          this.generatereport = response.generate_state;
         
        } else {
          console.error('API response status is false');
        }
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
  
  mapEventDetails(entries: any[]) {
    const calendarEntries = this.calendarEntries;
    while (calendarEntries.length) {
      calendarEntries.removeAt(0);
    }
  
    entries.forEach((entry: any) => {
      console.log('work_status_yes', entry.work_status_yes); 
      const entryFormGroup = this.fb.group({
        attachment_state: [entry.attachment_state ?? 0],
        work_status_yes: [entry.work_status_yes === 1 ? 1 : 0],
        work_status_no: [entry.work_status_no === 1 ? 1 : 0], 
        notify_state: [entry.notify_state ?? 0],
        reason: [entry.reason ?? 'N/A'],
        calendar_template_child_id: [entry.calendar_template_child_id]
      }, { validators: [this.workStatusValidator()] });
  
      calendarEntries.push(entryFormGroup);
    });
  }
  
  onWorkStatusChange(entry: AbstractControl, selectedValue: number) {
    if (selectedValue === 1) {
 
      entry.patchValue({
        work_status_yes: 1,
        work_status_no: 0
      });
    } else {
   
      entry.patchValue({
        work_status_yes: 0,
        work_status_no: 1
      });
    }
  }
  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
    this.eventDetails = { calendar_entries: [] };  // Clear event details when modal closes
  }

 
onNotifyChange(event: Event, entry: AbstractControl) {
  const input = event.target as HTMLInputElement;
  entry.get('notify_state')?.setValue(input.checked ? 1 : 0);
}
workStatusValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const yes = group.get('work_status_yes')?.value;
    const no = group.get('work_status_no')?.value;

    if (yes === 1 || no === 1) {
      return null; // valid
    }

    return { workStatusRequired: true }; // invalid
  };
}
saveModal() {
  if (this.eventDetailsForm.invalid) {
    this.eventDetailsForm.markAllAsTouched();

    // Optional: Scroll to the first invalid row
    const firstInvalidIndex = this.calendarEntries.controls.findIndex(entry => entry.invalid);
    if (firstInvalidIndex !== -1) {
      const element = document.querySelectorAll('tbody tr')[firstInvalidIndex];
      element?.scrollIntoView({ behavior: 'smooth' });
    }

    iziToast.warning({
      message: 'Please select "Ok" or "Not Ok" for each task before saving.',
      position: 'topRight'
    });

    return;
  }
    // Collect form data for each entry
    this.spinner.show();
    const calendarEntriesData = this.calendarEntries.controls.map((entry: AbstractControl) => {
      return {
        calendar_template_child_id: entry.get('calendar_template_child_id').value,
        // work_status: [
        //   entry.get('work_status_yes').value === 1 ? 1 : 0,
        //   entry.get('work_status_no').value === 1 ? 1 : 0
        // ],
        work_status: entry.get('work_status_yes').value === 1 ? 1 : (entry.get('work_status_no').value === 1 ? 0 : null),
        notify_state: entry.get('notify_state').value,
        task_template_id: 88,
        attach_validate_state: entry.get('attachment_state').value,
        reason_validate_state: entry.get('reason')?.value ? 1 : 0,
        reason_details: entry.get('reason').value && entry.get('reason').value !== 'N/A' ? entry.get('reason').value : '0',
      };
    });

    // Construct the HttpParams for form data
    let params = new HttpParams()
      .set('cal_type', 'pub') // static cal_type as per requirement
      .set('entry_date', this.dateVal.toString()) 
      .set('entry_month', this.monthVal.toString())
      .set('entry_year', this.yearVal.toString())
      .set('calendar_template_id', this.selectedEvent?.extendedProps?.calendar_template_id.toString());
  
    // Add calendar entry data to HttpParams as a single array
    const calendarTemplateChildIds: number[] = [];
    const workStatuses: number[] = [];
    const notifyStates: number[] = [];
    const taskTemplateIds: number[] = [];
    const attachValidateStates: number[] = [];
    const reasonValidateStates: number[] = [];
    const reasonDetails: string[] = [];
  
    calendarEntriesData.forEach((entry) => {
      calendarTemplateChildIds.push(entry.calendar_template_child_id);
      workStatuses.push(entry.work_status);
      notifyStates.push(entry.notify_state);
      taskTemplateIds.push(entry.task_template_id);
      attachValidateStates.push(entry.attach_validate_state);
      reasonValidateStates.push(entry.reason_validate_state);
      reasonDetails.push(entry.reason_details);
    });
  
    // Add the arrays to the params
    params = params.set('calendar_template_child_id[]', calendarTemplateChildIds.join(','));
    params = params.set('work_status[]', workStatuses.join(','));
    params = params.set('notify_state[]', notifyStates.join(','));
    params = params.set('task_template_id[]', taskTemplateIds.join(','));
    params = params.set('attach_validate_state[]', attachValidateStates.join(','));
    params = params.set('reason_validate_state[]', reasonValidateStates.join(','));
    params = params.set('reason_details[]', reasonDetails.join(','));
       params = params.set('user_id', localStorage.getItem('erp_c4c_user_id'));
  
    console.log('Payload as form data:', params);
  
    const apiUrl = this.serverService.urlFinal + 'publicTask/addCalendarEntrys';
    
    // Make the HTTP POST request with form data (HttpParams)
    this.http.post(apiUrl, params).subscribe(
      (response: any) => {
            this.spinner.hide();
        if (response.status) {
           this.spinner.hide();
        //  console.log('Calendar entries saved successfully:', response);
          // if (this.generatereport === 0) {
          //   this.showgeneratereport = true;
          // } else {
          //   this.showgeneratereport = false;
          // }
          this.generatereport = response.generate_state;
           iziToast.success({
            message: "Calendar entries saved successfully",
            position: 'topRight'
          });

          this.showModal = false;  // Close the modal on success
        } else {
           this.spinner.hide();
          console.error('Failed to save calendar entries:', response);
          iziToast.warning({
            message: "Failed to save calendar entries",
            position: 'topRight'
          });

        }
      },
      (error) => {
         this.spinner.hide();
        console.error('Error saving calendar entries:', error);
        iziToast.warning({
            message: "Failed to save calendar entries",
            position: 'topRight'
          });
      }
    );
}
  generateEmailApprovalReport(calendarTemplateId: number, entryDate: number, entryMonth: number, entryYear: number) {
        this.spinner.show();
    const apiUrl = this.serverService.urlFinal + 'publicTask/generateEmailApprovalReport';
    const payload = {
      moduleType: 'publicTask',
      api_url: 'publicTask/generateEmailApprovalReport',
      api_type: 'web',
      element_data: {
        action: 'generateEmailApprovalReport',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        calendar_template_id: calendarTemplateId,
        entry_date: entryDate,
        entry_month: entryMonth,
        entry_year: entryYear,
      }
    };
    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
            this.spinner.hide();
        if (response.success === true  ) {
          console.log('Email approval report generated successfully:', response);
          this.showModal = false;
           iziToast.success({
            message: "Email approval report generated successfully",
            position: 'topRight'
          });
        } else {
              this.spinner.hide();
          console.error('Failed to generate email approval report:', response);
           iziToast.warning({
            message: "Failed to generate email approval report",
            position: 'topRight'
          });
        }
      },
      (error) => {
            this.spinner.hide();
        console.error('Error generating email approval report:', error);
         iziToast.warning({
            message: "Error generating email approval report",
            position: 'topRight'
          });
      }
    );
  }

  preventEmptyDateClick(arg: any) {
    const events = this.calendarOptions.events as EventInput[];
    const isEventDay = events.some((event) => event.start === arg.dateStr);

    // Prevent clicks for non-event days and read-only for the next day
    if (!isEventDay) {
      console.log('No events on this day.');
    } else if (arg.dateStr === this.nextDate) {
      console.log('Next day is read-only.');
    }
  }
}
