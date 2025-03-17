import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-license-key-management',
  templateUrl: './license-key-management.component.html',
  styleUrls: ['./license-key-management.component.css']
})
export class LicenseKeyManagementComponent implements OnInit {
  licenseKey: any[] = [];
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 10;
  totalItems = 0;
  searchText = '';
  licenseKeyCount: number = 1;
  productCode: string = '';
  productName: string = '';
  hiddenLicenseKeys: string[] = [];
  hiddenProductCodes: string[] = [];
  hiddenProductNames: string[] = [];
  hiddenFieldsVisible: boolean = false;
  // Select All checkbox binding
  selectAll = false;
  showAddModal = false;
  isSubmitting: boolean = false;
  constructor(private serverService: ServerService,private http: HttpClient) {
 
  }

  ngOnInit(): void {
    this.getlicenseKey(); 
  }
  resetForm() {
    this.licenseKeyCount = 1;
    this.productCode = '';
    this.productName = '';
    this.hiddenLicenseKeys = [];
    this.hiddenProductCodes = [];
    this.hiddenProductNames = [];
    this.hiddenFieldsVisible = false;
  }
  openAddModal() {
    this.showAddModal = true;
    this.resetForm();
  }
  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  getlicenseKey(): void {
    const api_req: any = {
      moduleType: 'key',
      api_url: 'key/key_management_list',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
      element_data: {
        action: 'key/key_management_list',
        user_id: localStorage.getItem('erp_c4c_user_id'), 
        search_txt: this.searchText,
        limit: this.itemsPerPage,
        offset: (this.currentPage - 1) * this.itemsPerPage
      }
    };

    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        if (response.data) {
          this.licenseKey = response.data.map((licenseKey: any) => ({
            ...licenseKey,
            selected: false 
          }));
          this.totalItems = response.count;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        } else {
          console.warn('No licenseKey found or an error occurred.');
          this.licenseKey = [];
        }
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
        this.licenseKey = [];
      }
    );
  }

  toggleSelectAll() {
    this.licenseKey.forEach(item => {
      item.selected = this.selectAll; 
    });
  }

  onSearchChange() {
    this.currentPage = 1; 
    this.getlicenseKey();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getlicenseKey(); 
    }
  }
  getPages(): number[] {
    const pages: number[] = [];
    const pageRange = 2; 
    let startPage = Math.max(1, this.currentPage - pageRange);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + pageRange);


    if (this.currentPage <= pageRange) {
      endPage = Math.min(this.totalPages - 1, this.currentPage + pageRange);
    } else if (this.currentPage >= this.totalPages - pageRange) {
      startPage = Math.max(1, this.currentPage - pageRange);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onSubmit() {
  const apiRequestGet = {
    moduleType: 'key',
    api_url: 'key/get_license_key',
    api_type: 'web',
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
    element_data: {
      action: 'key/get_license_key',
      user_id: localStorage.getItem('erp_c4c_user_id'), 
      cnt_val: this.licenseKeyCount,
      p_code: this.productCode,
      p_name: this.productName
    }
  };
  this.serverService.sendServer(apiRequestGet).subscribe(

    (response: any) => {
      this.hiddenLicenseKeys = response.data.map((item: { license_key: any; }) => item.license_key);
      this.hiddenProductCodes = response.data.map((item: { product_code: any; }) => item.product_code);
      this.hiddenProductNames = response.data.map((item: { product_name: any; }) => item.product_name);

      // Make the hidden fields visible
      this.hiddenFieldsVisible = true;
      this.isSubmitting = true;
    },
    (error) => {
      console.error('Error fetching license key:', error);
    }
  );
}
saveLicensekey() {
  
  // Prepare the license key data from hidden fields
  const licenseKeyData = this.hiddenLicenseKeys.map((key, i) => ({
    license_key: key,
    product_code: this.hiddenProductCodes[i],
    product_name: this.hiddenProductNames[i]
  }));

  // API request to save the data
  const apiRequestAdd = {
    moduleType: 'key',
    api_url: 'key/license_key_group_addtion',
    api_type: 'web',
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI',
    element_data: {
      action: 'key/license_key_group_addtion',
      user_id: localStorage.getItem('erp_c4c_user_id'), 
      license_key_cnt: licenseKeyData
    }
  };

    this.serverService.sendServer(apiRequestAdd).subscribe(
    (response: any) => {
      console.log("License Key Added Successfully:", response);
      this.resetForm();
      this.showAddModal = false;
      this.getlicenseKey();
    },
  );
}


  getRepeatedFields() {
    return new Array(this.licenseKeyCount);
  }
}
