import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;

type TableData = {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  details: string;
  frequency: string;
  quantity: number;
};
interface Task {
  customer: string;
  taskName: string;
  additionalEmail: string;
  cusNotify: boolean;
  attStatus: boolean;
  attValiStatus: boolean;
  reaValiStatus: boolean;
  assignUser: string[];
  template: string;
}
interface TaskName {
  taskName: string;
}
interface EditTaskName {
  editTaskName: string;
}
interface Taskenty {
  hoursWise: string;
}


@Component({
  selector: 'app-calendar-template',
  templateUrl: './calendar-template.component.html',
  styleUrls: ['./calendar-template.component.css']
})
export class CalendarTemplateComponent implements OnInit {
  currentPage = 1;
  rowsPerPage = 10;
  searchText = '';
  calendarForm: FormGroup;
  calendarForm_edit: FormGroup;
  // pagination
  offset_count = 0;
  pageLimit = 50;
  recordNotFound = false;
  paginationData: any = { "info": "hide" };
  keywordCompanyName = 'customerName';
  sortColumn: keyof TableData = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  calender_list: any;
  response_total_cnt: any;
  off_set: any;
  customer_data: any;
  starting_from: any;
  duration: any;
  cale_userlist: any;
  cale_biller_list: any;
  cale_templates: any;
  get_color_code: any;
  cust_id: any;
  taskRecurring = false;
  oneTime = false;
  hoursWise = false;
  edit_taskRecurring = false;
  edit_oneTime = false;
  edit_hoursWise = false;
  formarray_values: string;
  taskForm: FormGroup;
  edit_taskForm: FormGroup;
  edit_temp_id: any;
  getColorCode: any;
  //email-checkbox
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId: any;
  email_checkbox_value: any;
  checkbox_value: any;
  edit_array_emailCC_Checkbox: any = [];
  //email-checkbox-edit
  groupSelect_emailCCIdEdit: any;
  edit_array_emailCC_CheckboxEdit: any = [];
  searchForm: FormGroup;


  constructor(private serverService: ServerService, public sanitizer: DomSanitizer,
    private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService, private http: HttpClient) {

  }

  // filteredData: TableData[] = [...this.data]; // Initialize with original data

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'calendarTempSearch': new FormControl(null)

    });

    this.taskForm = this.fb.group({
      tasks: this.fb.array([this.createTask()])
    });
    this.edit_taskForm = this.fb.group({
      edit_tasks: this.fb.array([]) // Initialize edit_tasks as an empty FormArray
    });
    const today = new Date().toISOString().substring(0, 10); // 'YYYY-MM-DD'
    this.calendarForm = this.fb.group({
      calendarName: ['', Validators.required],
      billerId: [''],
      reportToEmail: [''],
      starting_from: [''],
      supervisor_name: [''],
      short_name: [''],
      entry_date: [today, Validators.required],

      color_code: [''],
      recurring_value: [null],
      onetime_value: [''],
      calendar_hours_tasks: this.fb.array([this.createTaskEntry()]), // Initialize with one task
    });
    this.calendarForm_edit = this.fb.group({
      edit_calendarName: ['', Validators.required],
      edit_billerId: [''],
      edit_reportToEmail: [''],
      edit_starting_from: [''],
      edit_supervisor_name: [''],
      edit_short_name: [''],
      edit_entry_date: [''],
      edit_color_code: [''],
      edit_recurring_value: [''],
      edit_onetime_value: [''],
      edit_calendar_hours_tasks: this.fb.array([this.createTaskEntry()]), // Initialize with one task
    });
    this.calenderlist({});
    this.customerlist({});
    this.getCalendarTempDropDownList();
    this.getcolorcode();
    // Initialization logic if needed
    this.taskentrytype('Recurring');
  }
  // Create a task entry

  createTaskEntry(): FormGroup {
    const now = new Date();
    const formattedNow = this.formatDateTimeLocal(now);
    return this.fb.group({
      task_date_time: [formattedNow], // Store datetime-local input value
    });
  }
  formatDateTimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  editTaskEntry(): FormGroup {
    return this.fb.group({
      task_date_time: [''], // Store datetime-local input value
    });
  }
  createTask(): FormGroup {
    return this.fb.group({
      customer_id: [''],
      work_name: [''],
      tasks: this.fb.array([]), // This will hold the work_task_name array
      additional_email: [''],
      notify_state: [false],
      attachment_state: [false],
      attach_validate_state: [false],
      reason_validate_state: [false],
      assign_user_id: [[]],
      assign_template_id: ['']
    });
  }
  // Method to add a new task to the FormArray
  addEditTask() {
    return this.fb.group({
      edit_customer_id: ['', Validators.required],
      edit_temp_id: [''],
      edit_work_name: ['', Validators.required],
      edit_tasks: this.fb.array([]),  // Subtasks, initialized as an empty FormArray
      edit_additional_email: ['', Validators.email],
      edit_notify_state: [false],
      edit_attachment_state: [false],
      edit_attach_validate_state: [false],
      edit_reason_validate_state: [false],
      edit_assign_user_id: [[]],
      edit_assign_template_id: ['']
    });
  }
  // Retrieve the FormArray of task names
  getTasknameControls(task: AbstractControl): FormArray {
    return task.get('tasks') as FormArray;
  }
  geteditTasknameControls(task: AbstractControl): FormArray {
    const tasksArray = task.get('edit_tasks') as FormArray;
    return tasksArray ? tasksArray : this.fb.array([]);  // Return an empty FormArray if not initialized
  }

  // Getter for the task entries FormArray
  get taskEntries(): FormArray {
    return this.calendarForm.get('calendar_hours_tasks') as FormArray;
  }
  // Getter for the task entries FormArray
  get edit_taskEntries(): FormArray {
    return this.calendarForm_edit.get('edit_calendar_hours_tasks') as FormArray;
  }


  // tasks: Task[] = [
  //   {
  //     customer: '',
  //     taskName: '',
  //     additionalEmail: '',
  //     cusNotify: false,
  //     attStatus: false,
  //     attValiStatus: false,
  //     reaValiStatus: false,
  //     assignUser: ['CM'],
  //     template: 'Template 1'
  //   }
  // ];
  tasknames: TaskName[] = [];
  edittasknames: EditTaskName[] = [];
  taskentry: Taskenty[] = [
    {
      hoursWise: '',
    }
  ];

  get tasks(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }
  get edit_tasks() {
    return this.edit_taskForm.get('edit_tasks') as FormArray;
  }
  // Add a new task row
  addTask() {
    this.tasks.push(this.createTask());
  }
  editTask() {
    this.edit_tasks.push(this.addEditTask()); // Add a new task group to the FormArray
  }

  // Add a task name inside a task
  addTaskname(taskIndex: number): void {
    const task = this.tasks.at(taskIndex) as FormGroup;
    const tasknames = task.get('tasks') as FormArray;
    tasknames.push(this.fb.group({ work_task_name: '' }));
  }
  // Add task name dynamically to the form array
  editTaskname(taskIndex: number) {
    const task = this.edit_tasks.at(taskIndex) as FormGroup;
    const tasknames1 = task.get('edit_tasks') as FormArray;
    tasknames1.push(this.fb.group({ work_task_name: '', calendar_template_child_baby_id: '' }));
  }

  // Add a new task entry
  addTaskentry(): void {
    this.taskEntries.push(this.createTaskEntry());
  }
  // Add a new task entry
  edit_Taskentry(): void {
    this.edit_taskEntries.push(this.editTaskEntry());
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }
  removeEditTask(i: number) {
    const edit_temp_id = this.edit_tasks.at(i).get('edit_temp_id').value;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let get_req: any = new Object();
        api_req.moduleType = "calendar_template";
        api_req.api_url = "calendar_template/deleteCalendarTemplateChild"
        api_req.api_type = "web";


        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        get_req.action = "deleteCalendarTemplateChild";
        get_req.user_id = localStorage.getItem('erp_c4c_user_id');
        get_req.calendar_entries_child_id = edit_temp_id;
        api_req.element_data = get_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.spinner.hide();
            this.edit_tasks.removeAt(i); // Remove task at index 'i'
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Calendar Template Clild Deleted successfully",
              position: 'topRight'
            });
            // this.calenderlist({});

          } else {

          }
        }),
          (error: any) => {
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log(error);
          };
      }
    })
  }




  // Remove a specific task name from a task
  removeTaskname(taskIndex: number, tasknameIndex: number): void {
    const task = this.tasks.at(taskIndex) as FormGroup;
    const tasknames = task.get('tasks') as FormArray;
    if (tasknames.length >= 1) {
      tasknames.removeAt(tasknameIndex);
    }
  }
  // Remove task name from the form array
  removeEditTaskname(taskIndex: number, tasknameIndex: number): void {
    const task = this.edit_tasks.at(taskIndex) as FormGroup;
    const tasknames = task.get('edit_tasks') as FormArray;
    if (tasknames.length >= 1) {
      const edit_tempname_id = tasknames.at(tasknameIndex).get('calendar_template_child_baby_id').value;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          let api_req: any = new Object();
          let get_req: any = new Object();
          api_req.moduleType = "calendar_template";
          api_req.api_url = "calendar_template/deleteCalendarTemplateBaby"
          api_req.api_type = "web";


          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          get_req.action = "deleteCalendarTemplateBaby";
          get_req.user_id = localStorage.getItem('erp_c4c_user_id');
          get_req.calendar_template_child_baby_id = edit_tempname_id;
          api_req.element_data = get_req;
          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == true) {
              this.spinner.hide();
              tasknames.removeAt(tasknameIndex);
              // $("#fileAttachmentCustomerContractId").modal("hide");
              iziToast.success({
                message: " Calendar Template Clild Deleted successfully",
                position: 'topRight'
              });
              // this.calenderlist({});

            } else {

            }
          }),
            (error: any) => {
              iziToast.error({
                message: "Sorry, some server issue occur. Please contact admin",
                position: 'topRight'
              });
              console.log(error);
            };
        }
      })

    }
  }
  // Remove a task entry
  removetaskenty(index: number): void {
    if (this.taskEntries.length > 1) {
      this.taskEntries.removeAt(index);
    }
  }
  // Remove a task entry
  edit_removetaskenty(index: number): void {
    if (this.edit_taskEntries.length > 1) {
      this.edit_taskEntries.removeAt(index);
    }
  }

  taskentrytype(data: any) {
    if (data == 'Recurring') {
      this.taskRecurring = true;
      this.oneTime = false;
      this.hoursWise = false;
    }
    if (data == 'oneTime') {
      this.taskRecurring = false;
      this.oneTime = true;
      this.hoursWise = false;
    }
    if (data == 'hoursWise') {
      this.taskRecurring = false;
      this.oneTime = false;
      this.hoursWise = true;
    }

  }
  edit_taskentrytype(data: any) {
    if (data == 'Recurring') {
      this.edit_taskRecurring = true;
      this.edit_oneTime = false;
      this.edit_hoursWise = false;
    }
    if (data == 'oneTime') {
      this.edit_taskRecurring = false;
      this.edit_oneTime = true;
      this.edit_hoursWise = false;
    }
    if (data == 'hoursWise') {
      this.edit_taskRecurring = false;
      this.edit_oneTime = false;
      this.edit_hoursWise = true;
    }

  }



  selectEventCustomer(event: any) {
    console.log('Selected Customer:', event.customerId);
  }
  getcolorcode() {
    let api_req: any = new Object();
    api_req.api_url = 'base/getColorList';
    this.serverService.sendServergetdata(api_req).subscribe((response: any) => {
      // this.http.get<any>('https://erp1.cal4care.com/api/base/getColorList').subscribe((response: any) => {
      if (response.status == true) {
        this.get_color_code = response.data;
      }

    });
  }

  onFocusedCustomer(event: any) {
    console.log('Input Focused:', event);
  }

  onChangeSearchCustomer(val: string) {
    console.log(val)
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  getColor(color_code: any) {
    this.getColorCode = color_code;
    console.log("this.getColorCode", this.getColorCode);

  }


  edit_calender(data: any) {
    this.customerlist({});
    this.edit_temp_id = data;
    $('#edit_template').modal('show');
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/editCalendarTask"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "editCalendarTask";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.calendar_template_id = data;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        const calendarData = response.data[0];
        console.log(calendarData.child_data);
        this.edit_array_emailCC_CheckboxEdit = [...calendarData.assign_users_super];
        // Setting values to the form
        this.calendarForm_edit.patchValue({
          edit_calendarName: calendarData.calendar_template_name,
          edit_billerId: calendarData.billerId,
          edit_reportToEmail: calendarData.report_to_email,
          edit_starting_from: calendarData.starting_from_days,

          edit_short_name: calendarData.calendar_short_name,
          edit_entry_date: calendarData.calendar_entry_date,
          edit_color_code: calendarData.label_color_code,
          edit_recurring_value: calendarData.calendar_duration,
          edit_onetime_value: calendarData.onetime_date,
        });
        if (calendarData.calendar_type == 1) {
          $('#edPublic').prop('checked', true);
        } else if (calendarData.calendar_type == 2) {
          $('#edPersonal').prop('checked', true);
        }

        if (calendarData.alert_state == 1) {
          $('#edit_alart_stat').prop('checked', true);
        } else {
          $('#edit_alart_stat').prop('checked', false);
        }

        if (calendarData.calendar_entry_type == 1) {
          $('#edrecurring').prop('checked', true);
          this.edit_taskRecurring = true;
        } else if (calendarData.calendar_entry_type == 2) {
          $('#edoneTime').prop('checked', true);
          this.edit_oneTime = true;
        } else if (calendarData.calendar_entry_type == 3) {
          $('#hoursWise').prop('checked', true);
          this.edit_hoursWise = true;
        }
        // Setting child_data to FormArray
        const calendarHrTaskArray = this.calendarForm_edit.get('edit_calendar_hours_tasks') as FormArray;
        calendarHrTaskArray.clear(); // Clear existing tasks
        if (Array.isArray(calendarData.calendarHrTask)) {
          calendarData.calendarHrTask.forEach((child: { task_date_time: any }) => {
            const taskGroup = this.fb.group({
              edit_task_date_time: [child.task_date_time],
            });
            calendarHrTaskArray.push(taskGroup);
          });
        } else {
          console.warn('calendarHrTask is not an array or is undefined:', calendarData.calendarHrTask);
        }

        const editTasksArray = this.edit_taskForm.get('edit_tasks') as FormArray;
        editTasksArray.clear(); // Clear any existing data to avoid duplication

        if (calendarData && calendarData.child_data) {
          calendarData.child_data.forEach((child: any) => {

            // Create a new FormGroup for each task data
            const taskGroup = this.fb.group({
              edit_temp_id: [child.calendar_template_child_id], // Assuming customer_id is not part of the response
              edit_customer_id: [child.customer_id], // Assuming customer_id is not part of the response
              edit_work_name: [child.work_name || ''], // Mapping work_task_name from the response
              edit_tasks: this.fb.array([]), // Additional tasks (this can be expanded as needed)
              edit_additional_email: [child.additional_email || ''],
              edit_notify_state: [child.notify_state || false],
              edit_attachment_state: [child.attachment_state || false],
              edit_attach_validate_state: [child.attach_validate_state || false],
              edit_reason_validate_state: [child.reason_validate_state || false],
              edit_assign_user_id: [child.assign_users || []],
              edit_assign_template_id: [child.task_template_id] // Assuming template_id is not part of the response
            });

            // Add tasks (e.g., if there are sub-tasks)
            // Add tasks (e.g., if there are sub-tasks)
            if (child.edit_tasks && child.edit_tasks.length > 0) {
              const tasksArray = taskGroup.get('edit_tasks') as FormArray;

              // Loop through the tasks and add only the work_task_name
              child.edit_tasks.forEach((subtask: any) => {
                const subtaskGroup = this.fb.group({
                  work_task_name: [subtask.work_task_name || ''], // Set the work_task_name field
                  calendar_template_child_baby_id: [subtask.calendar_template_child_baby_id || ''] // Set the calendar_template_child_baby_id field
                });
                tasksArray.push(subtaskGroup);
              });
            }

            // Add the task group to the main edit_tasks FormArray
            editTasksArray.push(taskGroup);
          });
        }

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };


  }

  listDataInfo(list_data: any) {

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    list_data.order_by_name = list_data.order_by_name == undefined ? "contact.contact_id" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  calenderlist(data: any) {
    this.spinner.show();
    const searchText = typeof event === 'string' ? data : data.search_text || '';
    // Handle filtering or processing here
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/getCalendarTaskList"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getCalendarTaskList";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_txt = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        this.calender_list = response.data;
        this.response_total_cnt = response.totalCount;
        this.off_set = response.off_set;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        this.calender_list = [];
        this.response_total_cnt = 0;
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  calenderlist1(data: any) {

    const searchText = typeof event === 'string' ? data : data.search_text || '';
    // Handle filtering or processing here
    console.log('Search Text:', searchText);
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/getCalendarTaskList"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getCalendarTaskList";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.search_txt = list_data.search_text;
    get_req.off_set = list_data.offset;
    get_req.limit_val = list_data.limit;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        this.calender_list = response.data;
        this.response_total_cnt = response.totalCount;
        this.off_set = response.off_set;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.totalCount, 'page_limit': this.pageLimit });

      } else {
        this.spinner.hide();
        this.calender_list = [];
        this.response_total_cnt = 0;
        $('#searchContractId').modal('hide');
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }

  customerlist(data: any) {
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "base";
    api_req.api_url = "base/getCustomerList"
    api_req.api_type = "web";


    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getCustomerList";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    get_req.keyword = data;
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.customer_data = response.data;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }
  delete_calendertemp(data: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let get_req: any = new Object();
        api_req.moduleType = "calendar_template";
        api_req.api_url = "calendar_template/deleteCalendarTemplate"
        api_req.api_type = "web";


        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        get_req.action = "deleteCalendarTemplate";
        get_req.user_id = localStorage.getItem('erp_c4c_user_id');
        get_req.calendar_template_id = data;
        api_req.element_data = get_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.spinner.hide();
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Calendar Template Deleted successfully",
              position: 'topRight'
            });
            this.calenderlist({});

          } else {

          }
        }),
          (error: any) => {
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log(error);
          };
      }
    })
  }

  onSubmit() {
    var formdata = this.calendarForm.value;
    var formarrayvalue = this.taskForm.value;
    console.log('formdata', formdata);
    const onetimeDate = formdata.onetime_value;
    // Convert the ISO string to a Date object
    const dateObj = new Date(onetimeDate);
    // Format to "YYYY-MM-DD HH:mm:ss"
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`;
    // Ensure calendar_hours_tasks exists and is an array
    const task_hours_value = formdata.calendar_hours_tasks.map((task: any) => {
      if (task.task_date_time) {
        const [task_date, task_time] = task.task_date_time.split('T');
        return {
          task_date_time: `${task_date} ${task_time}:00`,
          task_date,
          task_time,
        };
      }
      return {
        task_date_time: '',
        task_date: '',
        task_time: '',
      };
    });
    console.log("task_hours_value-on submit", task_hours_value)
    this.spinner.show();
    this.formarray_values = "";
    // $('#addProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/insertCalendarTask";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "insertCalendarTask";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');

    var CalendarName = formdata.calendarName;
    if (CalendarName === null || CalendarName === '' || CalendarName === 'undefined' || CalendarName === undefined) {

      iziToast.warning({
        message: "Choose Calendar Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.calendar_template_name = formdata.calendarName;
    }
    api_postUPd.calendar_short_name = formdata.short_name;
    var billerId = formdata.billerId;
    if (billerId === null || billerId === '' || billerId === 'undefined' || billerId === undefined) {

      iziToast.warning({
        message: "Choose Biller Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.billerId = formdata.billerId;
    }

    var colorCode = formdata.color_code;
    if (colorCode === null || colorCode === '' || colorCode === 'undefined' || colorCode === undefined) {

      iziToast.warning({
        message: "Choose Color Code",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.colorCodes = formdata.color_code;
    }



    if ($('#Public').prop('checked')) {
      api_postUPd.calendar_type = '1';
    } else if ($('#Personal').prop('checked')) {
      api_postUPd.calendar_type = '2';
    } else {
      iziToast.warning({
        message: "Choose Calendar Type",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }


    var reportEmail = formdata.reportToEmail;
    if (reportEmail === null || reportEmail === '' || reportEmail === 'undefined' || reportEmail === undefined) {

      iziToast.warning({
        message: "Enter Report to Email",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.report_to_email = formdata.reportToEmail;
    }
    var entryDate = formdata.entry_date;
    if (entryDate === null || entryDate === '' || entryDate === 'undefined' || entryDate === undefined) {

      iziToast.warning({
        message: "Enter Entry Date",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.calendar_template_entry_date = formdata.entry_date;
    }

    var startFrom = formdata.starting_from;
    if (startFrom === null || startFrom === '' || startFrom === 'undefined' || startFrom === undefined) {

      iziToast.warning({
        message: "Choose Starting From",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.starting_from_days = formdata.starting_from;
    }


    if ($('#recurring').prop('checked')) {
      api_postUPd.calendar_entry_type = '1';


      var RecurrValue = formdata.recurring_value;
      if (RecurrValue === null || RecurrValue === '' || RecurrValue === 'undefined' || RecurrValue === undefined) {

        iziToast.warning({
          message: "Choose Recurring Value",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        api_postUPd.calendar_duration = formdata.recurring_value;
      }

      api_postUPd.onetime_date = '';
      api_postUPd.calendar_hours_tasks = [
        {
          task_date_time: '',
          task_date: '',
          task_time: '',
        },
      ];
    } else if ($('#oneTime').prop('checked')) {
      alert("one time")
      api_postUPd.calendar_entry_type = '2';
      api_postUPd.calendar_duration = '';
      var formattedDate1 = formdata.task_date_time;
      if (!formattedDate1 || formattedDate1.trim() === '') {

        iziToast.warning({
          message: "Choose One Time Value",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        api_postUPd.onetime_date = formattedDate;
      }

      api_postUPd.calendar_hours_tasks = [
        {
          task_date_time: '',
          task_date: '',
          task_time: '',
        },
      ];
    } else if ($('#hoursWise').prop('checked')) {
      api_postUPd.calendar_entry_type = '3';
      api_postUPd.calendar_duration = '';
      api_postUPd.onetime_date = '';


      if (task_hours_value === null || task_hours_value === '' || task_hours_value === 'undefined' || task_hours_value === undefined) {

        iziToast.warning({
          message: "Choose Hour Value",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;

      } else {
        api_postUPd.calendar_hours_tasks = task_hours_value;
      }

    }
    if ($('#alart_stat').prop('checked')) {
      api_postUPd.alart_stat = '1';
    } else {
      api_postUPd.alart_stat = '0';
    }

    if (!this.edit_array_emailCC_Checkbox || this.edit_array_emailCC_Checkbox.length === 0) {

      iziToast.warning({
        message: "Select Supervisor",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.supervisor_user_id = this.edit_array_emailCC_Checkbox;
    }

    if (formarrayvalue.tasks.length == 0) {

      iziToast.warning({
        message: "Enter Atleat 1 Task",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    }
    const taskArray = this.taskForm.get('tasks') as FormArray;
    const firstTaskGroup = taskArray.at(0) as FormGroup;
    const firstTaskValue = formarrayvalue.tasks[0];
    if (
      !firstTaskValue.customer_id ||
      !firstTaskValue.work_name ||

      !firstTaskValue.assign_user_id || firstTaskValue.assign_user_id.length === 0 ||
      !firstTaskValue.assign_template_id
    ) {
      iziToast.warning({
        message: "All fields in the first task are mandatory",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.calendar_template_children = formarrayvalue.tasks;
    }


    api_req.element_data = api_postUPd;
    console.log("api_req", api_req);
    // return false
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#addmore').modal('hide');
        this.calendarForm.reset();
        this.taskForm.reset();
        this.spinner.hide();
        this.calenderlist({});
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
      } else {
        iziToast.error({
          message: "Failed. Please try again",
          position: 'topRight'
        });
        $('#addmore').modal('hide');

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
  onupdate() {
    var formdata = this.calendarForm_edit.value;
    var formarrayvalue = this.edit_taskForm.value;
    console.log('formdata', formarrayvalue);
    const onetimeDate = formdata.edit_onetime_value;
    // Convert the ISO string to a Date object
    const dateObj = new Date(onetimeDate);
    // Format to "YYYY-MM-DD HH:mm:ss"
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`;
    // Ensure calendar_hours_tasks exists and is an array
    const task_hours_value = formdata.edit_calendar_hours_tasks.map((task: any) => {
      if (task.task_date_time) {
        const [task_date, task_time] = task.task_date_time.split('T');
        return {
          task_date_time: `${task_date} ${task_time}:00`,
          task_date,
          task_time,
        };
      }
      return {
        task_date_time: '',
        task_date: '',
        task_time: '',
      };
    });
    console.log("task_hours_value", task_hours_value)
    this.spinner.show();
    this.formarray_values = "";
    // $('#addProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/updateCalendarTask";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "updateCalendarTask";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.calendar_template_id = this.edit_temp_id;

    var CalendarName = formdata.edit_calendarName;
    if (CalendarName === null || CalendarName === '' || CalendarName === 'undefined' || CalendarName === undefined) {

      iziToast.warning({
        message: "Choose Calendar Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.calendar_template_name = formdata.edit_calendarName;
    }
    api_postUPd.calendar_short_name = formdata.edit_short_name;


    var billerId = formdata.edit_billerId;
    if (billerId === null || billerId === '' || billerId === 'undefined' || billerId === undefined) {

      iziToast.warning({
        message: "Choose Biller Name",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.billerId = formdata.edit_billerId;
    }

    var colorCode = formdata.edit_color_code;
    if (colorCode === null || colorCode === '' || colorCode === 'undefined' || colorCode === undefined) {

      iziToast.warning({
        message: "Choose Color Code",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.colorCodes = formdata.edit_color_code;
    }

    if ($('#edPublic').prop('checked')) {
      api_postUPd.calendar_type = '1';
    } else if ($('#edPersonal').prop('checked')) {
      api_postUPd.calendar_type = '2';
    } else {
      iziToast.warning({
        message: "Choose Calendar Type",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    }

    var reportEmail = formdata.edit_reportToEmail;
    if (reportEmail === null || reportEmail === '' || reportEmail === 'undefined' || reportEmail === undefined) {

      iziToast.warning({
        message: "Enter Report to Email",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.report_to_email = formdata.edit_reportToEmail;
    }
    api_postUPd.calendar_template_entry_date = formdata.edit_entry_date;

    var startFrom = formdata.edit_starting_from;
    if (startFrom === null || startFrom === '' || startFrom === 'undefined' || startFrom === undefined) {

      iziToast.warning({
        message: "Choose Starting From",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.starting_from_days = formdata.edit_starting_from;
    }

    if ($('#edrecurring').prop('checked')) {
      api_postUPd.calendar_entry_type = '1';
      api_postUPd.calendar_duration = formdata.edit_recurring_value;
      api_postUPd.onetime_date = '';
      api_postUPd.calendar_hours_tasks = [
        {
          task_date_time: '',
          task_date: '',
          task_time: '',
        },
      ];
    } else if ($('#edoneTime').prop('checked')) {
      api_postUPd.calendar_entry_type = '2';
      api_postUPd.calendar_duration = '';
      api_postUPd.onetime_date = formattedDate;
      api_postUPd.calendar_hours_tasks = [
        {
          task_date_time: '',
          task_date: '',
          task_time: '',
        },
      ];
    } else if ($('#edhoursWise').prop('checked')) {
      api_postUPd.calendar_entry_type = '3';
      api_postUPd.calendar_duration = '';
      api_postUPd.onetime_date = '';
      api_postUPd.calendar_hours_tasks = task_hours_value;
    }
    if ($('#edit_alart_stat').prop('checked')) {
      api_postUPd.alart_stat = '1';
    } else {
      api_postUPd.alart_stat = '0';
    }


    if (!this.edit_array_emailCC_CheckboxEdit || this.edit_array_emailCC_CheckboxEdit.length === 0) {

      iziToast.warning({
        message: "Select Supervisor",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.supervisor_user_id = this.edit_array_emailCC_CheckboxEdit;
    }



    if (formarrayvalue.edit_tasks.length == 0) {

      iziToast.warning({
        message: "Enter Atleat 1 Task",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;

    } else {
      api_postUPd.calendar_template_children = formarrayvalue.edit_tasks;
    }

    api_req.element_data = api_postUPd;
    console.log("api_req", api_req);
    // return false
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#edit_template').modal('hide');
        this.spinner.hide();
        this.calenderlist({});
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
      } else {
        iziToast.warning({
          message: "Failed. Please try again",
          position: 'topRight'
        });
        $('#edit_template').modal('hide');

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

  getCalendarTempDropDownList() {


    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "calendar_template";
    api_req.api_url = "calendar_template/getCalendarTempDropDownList"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "getCalendarTempDropDownList";
    get_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.starting_from = response.data.startingFrom;
        this.duration = response.data.duration;
        this.cale_userlist = response.data.userlist;
        this.cale_biller_list = response.data.biller_list;
        this.cale_templates = response.data.templates;

      } else {

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      };

  }

  // Sort the table by the selected column and order
  // sortTable(column: keyof TableData) {
  //   if (this.sortColumn === column) {
  //     this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortColumn = column;
  //     this.sortOrder = 'asc';
  //   }

  //   this.filteredData.sort((a, b) => {
  //     const valueA = a[column];
  //     const valueB = b[column];

  //     if (this.sortOrder === 'asc') {
  //       return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
  //     } else {
  //       return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
  //     }
  //   });
  // }
  formatDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value; // Value in yyyy-MM-ddTHH:mm format
    const [date, time] = value.split('T');
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year} ${time}`;
    console.log('Formatted Date:', formattedDate); // Use this formatted value
  }
  EditCHK_emailCC(data: any, event: any) {
    //  console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    //  console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  EditCHK_emailCC_Edit(data: any, event: any) {
    //  console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCIdEdit = data;
    this.checkbox_value = event.target.checked;
    //  console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_CheckboxEdit.push(data);
      this.edit_array_emailCC_CheckboxEdit.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_CheckboxEdit);
    }
    else {
      const index = this.edit_array_emailCC_CheckboxEdit.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_CheckboxEdit.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_CheckboxEdit)

    }
  }
  // Filter data based on search text
  // filterTable() {
  //   this.filteredData = this.data.filter(item =>
  //     Object.values(item).some(val =>
  //       val.toString().toLowerCase().includes(this.searchText.toLowerCase())
  //     )
  //   );
  //   this.changePage(1); // Reset to first page after filtering
  // }

  // Get paginated data for the current page

}
