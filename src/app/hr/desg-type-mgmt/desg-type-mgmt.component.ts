import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;

@Component({
  selector: 'app-desg-type-mgmt',
  templateUrl: './desg-type-mgmt.component.html',
  styleUrls: ['./desg-type-mgmt.component.css']
})
export class DesgTypeMgmtComponent implements OnInit {
  //designationdata: any;
  designationsForm: FormGroup;
  searchText: string = '';  
  designations: any[] = [];  
  selectAll: boolean = false;

  showAddModal = false;
  newDesignations: string[] = ['']; 
  showEditModal: boolean;
  constructor(private serverService: ServerService, private fb: FormBuilder) {
    this.designationsForm = this.fb.group({
      designations: this.fb.array([this.createDesignationControl()]),
    });
  }

  ngOnInit(): void {
    this.getDesignations();
  }

  getDesignations(): void {
    const api_req: any = new Object();
    const api_designation_req: any = new Object();

    api_req.moduleType = 'hr';
    api_req.api_url = 'hr/designationTypeList';
    api_req.api_type = 'web';
    api_req.access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';  // Store securely
    api_designation_req.action = 'hr/designationTypeList';
    api_designation_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_designation_req.off_set = 0;  // Adjust pagination if needed
    api_designation_req.limit_val = 50;
    api_designation_req.current_page = 1;
    api_designation_req.search_text = this.searchText;  // Pass search text

    api_req.element_data = api_designation_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.status === true) {
          // Initialize the designations with a 'selected' property
          this.designations = response.data.map((designation: any) => ({
            ...designation,
            selected: false,  // Add the 'selected' property to each designation
          }));
        } else {
          console.warn('No designations found or an error occurred.');
          this.designations = [];
        }
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
        this.designations = [];
      }
    );
  }

  onSearchChange(): void {
    this.getDesignations();  
  }
  // Toggles the selection of all designations
  toggleSelectAll(): void {
    for (let designation of this.designations) {
      designation.selected = this.selectAll;  // Set all 'selected' states to match 'selectAll'
    }
  }

  // Opens the modal to add a new designation group
  openAddModal() {
    this.showAddModal = true;
  }
 
  // Closes the modal and resets the fields
  closeEditModal() {
    this.showEditModal = false;
    this.newDesignations = ['']; // Reset to a single empty field
  }
  closeAddModal() {
    this.showAddModal = false;
    this.newDesignations = ['']; // Reset to a single empty field
  }

  get designationControls(): FormArray {
    return this.designationsForm.get('designations') as FormArray;
  }
  private createDesignationControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  // Adds a new input field for designation
  addDesignationField(): void {
    this.designationControls.push(this.createDesignationControl());
  }

  // Remove a designation field by index
  removeDesignationField(index: number): void {
    this.designationControls.removeAt(index);
  }

  clearForm(): void {
    this.designationsForm.reset(); 
    this.addDesignationField(); 
  }
  saveDesignations(): void {
    if (this.designationsForm.invalid) {
      iziToast.error({
        title: 'Error',
        message: 'Please ensure all fields are valid.',
      });
      return;
    }

    const designationData = this.designationControls.value.map((designation: { name: string; }) =>
      designation.name.trim()
    );

    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/add_designation',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'hr/add_designation',
        products: designationData.map((name: any) => ({
          designation_type_name: name,
        })),
      },
    };

    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          iziToast.success({
            title: 'Success',
            message: 'Designations saved successfully!',
          });
          this.getDesignations();
          this.closeAddModal();  // Close the modal after saving
          this.clearForm(); 
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to save designations.',
          });
        }
      },
      (error) => {
        console.error('Error saving designations:', error);
      }
    );
  }


  // Group edit functionality
  groupEdit(): void {
    const selectedDesignations = this.designations.filter((d) => d.selected);
  
    if (selectedDesignations.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please select at least one designation to edit.',
      });
      return;
    }
  
    // Generate a comma-separated list of designation IDs
    const designationIds = selectedDesignations.map((d) => d.designation_type_id).join(',');
  
    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/edit_designation',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'hr/edit_designation',
        user_id: localStorage.getItem('erp_c4c_user_id'),
        designation_type_id: designationIds,
      },
    };
  
    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          // Populate the form array with fetched data
          const designationsArray = this.fb.array([]);
          response.data.forEach((designation: any) => {
            designationsArray.push(
              this.fb.group({
                designation_type_id: [designation.designation_type_id],
                designation_type_name: [
                  designation.designation_type_name,
                  [Validators.required],
                ],
              })
            );
          });
          this.designationsForm.setControl('designations', designationsArray);
          this.showEditModal = true; // Open modal
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to load designations for editing.',
          });
        }
      },
     
    );
  }
  

  // Update designations
  updateDesignations(): void {
    if (this.designationsForm.invalid) {
      iziToast.error({
        title: 'Error',
        message: 'Please ensure all fields are valid.',
      });
      return;
    }

    const updatedDesignations = this.designationsForm.value.designations.map(
      (designation: any) => ({
        designation_type_id: designation.designation_type_id,
        designation_type_name: designation.designation_type_name.trim(),
      })
    );

    const apiRequest = {
      moduleType: 'hr',
      api_url: 'hr/update_designation',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'hr/update_designation',
        user_id: localStorage.getItem('erp_c4c_user_id'), 
        products: updatedDesignations,
      },
    };

    this.serverService.sendServer(apiRequest).subscribe(
      (response: any) => {
        if (response.status) {
          iziToast.success({
            title: 'Success',
            message: 'Designations updated successfully.',
          });
          this.showEditModal = false; // Close the modal
          this.getDesignations(); // Refresh the designations list
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Failed to update designations.',
          });
        }
      },
      (error) => {
        console.error('Error updating designations:', error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while updating designations.',
        });
      }
    );
  }  


  deleteDesignation(designation: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the designation: ${designation.designation_type_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
      console.log('Deleting designation:', designation);
  
      // Prepare API payload
      const apiRequest = {
        moduleType: 'hr',
        api_url: 'hr/delete_designation',
        api_type: 'web',
        access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', // Replace with a dynamic token
        element_data: {
          action: 'hr/delete_designation',
          user_id: localStorage.getItem('erp_c4c_user_id'),
          designation_type_id: designation.designation_type_id.toString(),
        },
      };
  
      // Send API request
      this.serverService.sendServer(apiRequest).subscribe(
        (response: any) => {
          if (response.status === true) {
            iziToast.success({
              title: 'Success',
              message: 'Designations saved successfully!',
            });
            this.designations = this.designations.filter(d => d.designation_type_id !== designation.designation_type_id);
          } else {
            iziToast.error({
              title: 'Error',
              message: 'Failed to delete the designation.',
            });
          }
        },
        (error) => {
          console.error('Error deleting designation:', error);
          alert('An error occurred while deleting the designation.');
        }
      );
    }
  });
  }
  
  groupDelete(): void {
    const selectedDesignations = this.designations.filter(d => d.selected);
  
    if (selectedDesignations.length > 0) {
      
      Swal.fire({
        title: 'Are you sure you want to delete the selected designations?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete them!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Deleting selected designations:', selectedDesignations);
  
        // Collect IDs of selected designations
        const designationIds = selectedDesignations.map(d => d.designation_type_id).join(',');
  
        // Prepare API payload
        const apiRequest = {
          moduleType: 'hr',
          api_url: 'hr/delete_designation',
          api_type: 'web',
          access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', // Replace with a dynamic token
          element_data: {
            action: 'hr/delete_designation',
            user_id: localStorage.getItem('erp_c4c_user_id'),
            designation_type_id: designationIds, // Comma-separated IDs
          },
        };
  
        // Send API request
        this.serverService.sendServer(apiRequest).subscribe(
          (response: any) => {
            if (response.status === true) {
              iziToast.success({
                title: 'Success',
                message: 'Selected designations deleted successfully!',
              });
              this.designations = this.designations.filter(d => !d.selected);
            } else {
              iziToast.error({
                title: 'Error',
                message: 'Failed to delete selected designation.',
              });
            }
          },
          (error) => {
            console.error('Error deleting selected designations:', error);
            alert('An error occurred while deleting selected designations.');
          }
        );
      }
    });
    } else {
      alert('No designations selected.');
    }
    
  }

  }


