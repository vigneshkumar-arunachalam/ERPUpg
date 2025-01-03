import { Component,OnInit} from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publictask',
  templateUrl: './publictask.component.html',
  styleUrls: ['./publictask.component.css']
})
export class PublictaskComponent implements OnInit  {
  // Type calendarOptions.events as EventInput[] to make sure it's an array
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [] as EventInput[],  // Explicitly typed as EventInput[]
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.preventEmptyDateClick.bind(this),
    displayEventTime: false, // Optional: Hide event time
  };
  showModal = false;
  selectedEvent: any = null;
  selectedDate: string = ''; // Store the clicked date
  taskStatus = { OK: false, NOT_OK: false }; // Example task status tracking
  constructor(private http: HttpClient) {
    // Load events on component initialization
    this.loadEvents();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Method to load events from the API or use fallback
  loadEvents() {
    this.calendarOptions.events = [
      { title: 'Fallback Event 1', start: '2025-01-02', color: '#ff5555' },
      { title: 'Fallback Event 2', start: '2025-01-02', color: '#33cc99' },
      { title: 'Fallback Event 2', start: '2025-01-03', color: '#33cc99' },
    ];
  }

  // Handle event click
  handleEventClick(arg: any) {
    this.selectedEvent = arg.event; // Store selected event details
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;  // Clear selected event
  } 
  saveModal() {
    console.log('Task status:', this.taskStatus);
    this.showModal = false;
  }
  // Prevent clicks on empty dates
  preventEmptyDateClick(arg: any) {
    const events = this.calendarOptions.events as EventInput[]; // Ensure events is treated as EventInput[]
    const isEventDay = events.some((event) => event.start === arg.dateStr);

    if (!isEventDay) {
      console.log('No events on this day.');
    }
  }
}

