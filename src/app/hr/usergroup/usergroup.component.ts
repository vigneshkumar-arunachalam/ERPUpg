import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
  userForm: FormGroup;
  searchText: string = '';  
  userList: any[] = [];  
  selectAll: boolean = false;
  userGroups: { firstName: string, userId: number, selected: boolean }[] = [];
  userName: string = '';
  showAddModal = false;
  selectedUserId: number = 0;
  newUsers: string = '';
  showEditModal: boolean;
  group_name_list: any;
  group_select_list: any;
  currentPage: number = 1;
  totalItems: number = 0; 
  itemsPerPage: number = 10;
  totalPages: number = 0;
  constructor(private serverService: ServerService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      designations: this.fb.array([this.createUserControl()]),
    });
  }
 

  ngOnInit(): void {
    this.getUsersList();
    this.fetchUserGroups();
  }

  getUsersList(): void {
    const api_req: any = new Object();
    const api_userList_req: any = new Object();

    api_req.moduleType = 'hr';
    api_req.api_url = 'hr/userGroupList';
    api_req.api_type = 'web';
    api_req.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI'; 
    api_userList_req.action = 'hr/userGroupList';
    api_userList_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_userList_req.off_set = (this.currentPage - 1) * this.itemsPerPage;
    api_userList_req.limit_val =  this.itemsPerPage;
    api_userList_req.current_page =  this.currentPage;
    api_userList_req.search_text = this.searchText; 

    api_req.element_data = api_userList_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.status === true) {
          this.userList = response.data.map((user: any) => ({
            ...user,
            selected: false,  
          }));
          this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
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
  fetchUserGroups() {
    const apiRequest = {
      moduleType: "did_trunk_name",
      api_url: "hr/userGroupDropDownList",
      api_type: "web",
      access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI", 
      element_data: {
        action: "hr/userGroupDropDownList",
        user_id: localStorage.getItem('erp_c4c_user_id')
      }
    };

    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          this.userGroups = response.users.map((user: { userId: number, firstName: string }) => ({
            firstName: user.firstName,
            userId: user.userId,
            selected: false
          }));
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to load user groups.'
          });
        }
      },
      error => {
        console.error('Error fetching user groups:', error);
        iziToast.error({
          title: 'Error',
          message: 'Unable to fetch user groups.'
        });
      }
    );
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {  
      this.currentPage = page;
      this.getUsersList();  
    }
  }
  onSearchChange(): void {
    this.currentPage = 1;
    this.getUsersList();  
  }
  toggleSelectAll(): void {
    for (let user of this.userList) {
      user.selected = this.selectAll;  
    }
  }
  openAddModal() {
    this.showAddModal = true;
  }
  slectunique(){
    $("#selectAllQ").prop("checked",false)
    }
  closeAddModal() {
    this.showAddModal = false;
    this.newUsers = ''; 
  }
  closeEditModal(): void {
    this.showEditModal = false;
    this.newUsers = '';
    this.userGroups.forEach(group => group.selected = false);
  }

  get UserControls(): FormArray {
    return this.userForm.get('userList') as FormArray;
  }
  private createUserControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  clearForm(): void {
    this.userForm.reset(); 
    this.newUsers = ''; 
    this.userGroups.forEach(group => group.selected = false);
  } 
  saveUser(): void {
  
    if (!this.newUsers.trim()) {  
      iziToast.error({
        title: 'Error',
        message: 'User Name is required.'
      });
      return;
    }
  
    const selectedGroups = this.userGroups.filter(group => group.selected)
    .map(group => ({
      // hr_group_name: group.firstName,
      hr_group_name: this.newUsers.trim(),
      users: group.userId 
    }));

  if (selectedGroups.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please select at least one user group.'
    });
    return;
  }
    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/add_userGroup',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', 
      element_data: {
        action: 'hr/add_userGroup',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        products: selectedGroups 
      }
    };
  
    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          iziToast.success({
            title: 'Success',
            message: 'User and groups saved successfully!'
          });
          this.clearForm();
          this. closeAddModal();
          this.getUsersList();
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to save user and groups.'
          });
        }
      },
      error => {
        console.error('Error saving user and groups:', error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while saving.'
        });
      }
    );
  }
  UpdateUser(): void {
  
    // Log the group_name_list to debug if checkStatus is updated
  console.log('Group Name List:', this.group_name_list);

  const products = this.group_name_list.map((item: { userGroup: { hr_group_id: any; hr_group_name: any; }; users: any[]; }) => ({
    hr_group_id: item.userGroup.hr_group_id,
    hr_group_name: item.userGroup.hr_group_name,
    users: item.users
      .filter(user => user.checkStatus === true || user.checkStatus === 1)  // Only include users whose checkStatus is 1
      .map(user => user.userId)  // Include userId of selected users
      .join(',')  // Join them into a comma-separated string
  }));

  // Log the products for debugging
  console.log("Products to send:", products);
    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/update_userGroup',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', 
      element_data: {
        action: 'hr/update_userGroup',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        products: products 
      }
    };
  console.log("products",products);
  console.log("apiRequest",apiRequest);
    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          iziToast.success({
            title: 'Success',
            message: 'User and groups saved successfully!'
          });
          this.showEditModal = false;
          this.clearForm();
          this. closeEditModal();
          this.getUsersList();
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to save user and groups.'
          });
        }
      },
      error => {
        console.error('Error saving user and groups:', error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while saving.'
        });
      }
    );
  }
  openEditModal(userId: number): void {
    this.selectedUserId = userId;
    this.showEditModal = true;

  
  }
  
  groupEdit(): void {
    const selectedGroups = this.userList
    .filter(user => user.selected)
    .map(user => ({
      hr_group_name: user.hr_group_name,
      hr_group_id: user.hr_group_id
    }));

  console.log('Selected Groups:', selectedGroups);

  if (selectedGroups.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please select at least one group.'
    });
    return;
  }

  // Collect the IDs and names for further processing
  const selectedGroupIds = selectedGroups.map(group => group.hr_group_id).join(',');
  const selectedGroupNames = selectedGroups.map(group => group.hr_group_name).join(', ');

  console.log('Selected Group IDs:', selectedGroupIds);
  console.log('Selected Group Names:', selectedGroupNames);
  
    // API request object
    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/edit_userGroup',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'hr/edit_userGroup',
        user_id: localStorage.getItem('erp_c4c_user_id'), // Make sure this key is correct and exists
        hr_group_name: selectedGroupNames,  // Ensure newUsers is correctly populated
        hr_group_ids: selectedGroupIds
      }
    };
  
    console.log('API Request:', apiRequest);
  
    // Make the API request
    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response.status) {
          // $('#editUserName').val(response.)
          this.group_name_list = response.data;
          this.group_select_list = response.data;
          this.showEditModal = true;
        } else {
         
        }
      },
      (error) => {
        console.error('Error occurred while saving user group:', error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while saving.'
        });
      }
    );
  }
  
  onCheckboxChange(event: Event, group: any): void {
    const checkbox = event.target as HTMLInputElement;
    group.checkStatus = checkbox.checked ? 1 : 0;
  }
  
  
  deleteUser(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the designation: ${user.hr_group_name}?`,  // Display the group name dynamically
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
      const apiRequest = {
        moduleType: "hr",
        api_url: "hr/delete_userGroup",
        api_type: "web",
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI", 
        element_data: {
          action: "hr/delete_userGroup",
          user_id: localStorage.getItem("erp_c4c_user_id"),
          hr_group_id: user.hr_group_id
        }
      };
  
      this.serverService.sendServer(apiRequest).subscribe(
        (response: any) => {
          if (response.status) {
            iziToast.success({
              title: "Success",
              message: "User group deleted successfully!"
            });
            this.userList = this.userList.filter(d => d !== user); 
          } else {
            iziToast.error({
              title: "Error",
              message: "Failed to delete the user group."
            });
          }
        },
        (error) => {
          console.error("Error deleting user:", error);
          iziToast.error({
            title: "Error",
            message: "An error occurred while deleting the user."
          });
        }
      );
    }
   });
  }
  
  groupDelete() {
    const selectedGroups = this.userList.filter(user => user.selected);
  
    if (selectedGroups.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Please select at least one user group to delete."
      });
      return;
    }
  
    const groupIdsToDelete = selectedGroups.map(user => user.hr_group_id).join(',');
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the selected ${selectedGroups.length} user groups?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiRequest = {
          moduleType: "hr",
          api_url: "hr/delete_userGroup",
          api_type: "web",
          access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI",
          element_data: {
            action: "hr/delete_userGroup",
            user_id: localStorage.getItem("erp_c4c_user_id"),
            hr_group_id: groupIdsToDelete 
          }
        };
  
        this.serverService.sendServer(apiRequest).subscribe(
          (response: any) => {
            if (response.status) {
              iziToast.success({
                title: "Success",
                message: "Selected user groups deleted successfully!"
              });
              this.userList = this.userList.filter(user => !user.selected);
            } else {
              iziToast.error({
                title: "Error",
                message: "Failed to delete the user groups."
              });
            }
          },
          (error) => {
            console.error("Error deleting groups:", error);
            iziToast.error({
              title: "Error",
              message: "An error occurred while deleting the user groups."
            });
          }
        );
      }
    });
  }
  
  
}
