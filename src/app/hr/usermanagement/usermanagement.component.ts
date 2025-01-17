import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  form: FormGroup;
  currentPage: number = 1;
  totalItems: number = 0; 
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchText: string = '';  
  userList: any[] = [];  
  constructor(private fb: FormBuilder,private serverService: ServerService) {
    // Initialize form group with form array
    this.form = this.fb.group({
      users: this.fb.array([this.createUser()]), // Start with one user form
    });
  }

  // Initial designation data

   // Create a user form group
   createUser(): FormGroup {
    return this.fb.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      department: ['', Validators.required],
      finNumber: ['', Validators.required],
      bankAccount: ['', Validators.required],
      address: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      epfStatus: [false],
      contribution1: [false],
      contribution2: [false],
      extNo: ['', Validators.required],
      sipUsername: ['', Validators.required],
      sipPassword: ['', Validators.required],
      shortName: ['', Validators.required],
      friendlyName: ['', Validators.required],
      designation: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      salaryAmt: ['', Validators.required],
      perDayAmt: ['', Validators.required],
      employerCpf: ['', Validators.required],
      employeeCpf: ['', Validators.required],
      subcontribution1: ['', Validators.required],
      subcontribution2: ['', Validators.required],
    });
  }

  // Getter for form array of users
  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }



  designations = [
  {  designation: 'CM', fname: 'CHOCKALINGAM',lname: 'MANIKANDAN', role: 'Management', email: 'cm@cal4care.com', phone: '6582986675' ,selected: false },
  {  designation: 'CD', fname: 'CHIDAMBARAM ',lname: 'DIPAAH', role: 'Management', email: 'narissa@cal4care.com.sg', phone: '+65 8298 6674',  selected: false },
  {  designation: 'RV', fname: 'Ravichandran ',lname: 'Vijay', role: 'Support', email: 'rv@cal4care.com.sg', phone: '+65 81896095',  selected: false },
];

  selectAll = false;
  showAddModal = false;
  newDesignations: string[] = ['']; 

  ngOnInit(): void {
    this.getUsersmgtList();
  }
  getUsersmgtList(): void {
    const api_req: any = {};
    const api_userList_req: any = {
      action: 'hr/userMgntList',
      user_id: localStorage.getItem('erp_c4c_user_id'),
      off_set: (this.currentPage - 1) * this.itemsPerPage,
      limit_val: this.itemsPerPage,
      current_page: this.currentPage,
      search_text: this.searchText,
    };
  
    api_req.moduleType = 'hr';
    api_req.api_url = 'hr/userMgntList';
    api_req.api_type = 'web';
    api_req.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_req.element_data = api_userList_req;
    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.userList = [];
  
          response.data.forEach((countryData: any) => {
            if (countryData.datas && Array.isArray(countryData.datas)) {
              countryData.datas.forEach((user: any) => {
                this.userList.push({
                  ...user,
                  selected: false,
                  country: countryData.Country, 
                });
              });
            }
          });
         
        } else {
          console.warn('No users found or an error occurred.');
          this.userList = [];
        }
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
        this.userList = [];
      }
    );
  }
  


  onSearchChange(): void {
    this.getUsersmgtList();  
  }

  toggleSelectAll() {
    this.designations.forEach((designation) => (designation.selected = this.selectAll));
  }

 
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addDesignationField() {
    this.newDesignations.push('');
  }

    addUser(): void {
      this.users.push(this.createUser());
    }

    // Remove a user form from the array
    removeUser(index: number): void {
      if (this.users.length > 1) {
        this.users.removeAt(index);
      }
    }
  
    // Submit form data
    onSubmit(): void {
      console.log(this.form.value);
    }
  // Removes a specific input field
  removeDesignationField(index: number) {
    this.newDesignations.splice(index, 1);
  }

  // Saves all new designations entered in the form
  saveDesignations() {
    this.newDesignations.forEach((designation) => {
      if (designation.trim()) {
        this.designations.push({
          fname: designation.trim(), selected: false,
          designation: '',
          role: '',
          email: '',
          phone: '',
          lname: ''
        });
      }
    });
    this.closeAddModal(); // Close modal after saving
  }

  // Deletes a specific designation
 
   deleteDesignation(userId: any): void {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
       
    
        // Prepare API payload
        const apiRequest = {
          moduleType: 'hr',
          api_url: 'hr/userForceLogout',
          api_type: 'web',
          access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', // Replace with a dynamic token
          element_data: {
            action: 'hr/userForceLogout',
            user_id: localStorage.getItem('erp_c4c_user_id'),
            user_ids: userId,
          },
        };
    
        // Send API request
        this.serverService.sendServer(apiRequest).subscribe(
          (response: any) => {
            if (response.status === true) {
              iziToast.success({
                title: 'Success',
                message: 'User Management details logout successfully!',
              });
              
            } else {
              iziToast.error({
                title: 'Error',
                message: 'Failed to Logout the User Management.',
              });
            }
          },
          (error) => {
            
            alert('An error occurred while Logout the User Management.');
          }
        );
      }
    });
    }

  // Group edit for selected designations
  groupEdit() {
    const selected = this.designations.filter((d) => d.selected);
    alert(`Group Edit for: ${selected.map((d) => d.fname).join(', ')}`);
  }

  // Group delete for selected designations
  groupDelete() {
    this.designations = this.designations.filter((d) => !d.selected);
  }
  
}
