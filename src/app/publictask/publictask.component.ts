import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';

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
      right: 'dayGridMonth'
    },
    datesSet: this.onDatesSet.bind(this),
  };

  showModal = false;
  selectedEvent: any = null;
  taskStatus = { OK: false, NOT_OK: false };
  monthVal: number = new Date().getMonth() + 1;
  yearVal: number = new Date().getFullYear();

  currentDate: string = new Date().toISOString().split('T')[0];
  nextDate: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  constructor(private http: HttpClient) {}

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
    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/publicTask/getPublicTaskList';
    const payload = {
      moduleType: 'publicTask',
      api_url: 'publicTask/getPublicTaskList',
      api_type: 'web',
      element_data: {
        action: 'publicTask',
        user_id: '39',
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
            }))
            .filter((event: any) => event.start <= this.currentDate); // Up-to-date events only

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

  handleEventClick(arg: any) {
    this.selectedEvent = arg.event;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }

  saveModal() {
    console.log('Task status:', this.taskStatus);
    this.showModal = false;
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
