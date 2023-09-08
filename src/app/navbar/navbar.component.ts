import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: any
  userId: any;
  role_Permission: any;
  user_ProfileImage: any;
  // Global search
  GlobalSearch: FormGroup;
  pagesNameList:any;
  SelectPageList: any;
  addSelectPageListCheckboxID_array: any = [];
  SelectPageListId:any;
  //autocomplete-customer name
  searchResultTest: any;
  CompanyName:any;
  searchResult: any;
  // Contract Details
  ContractDetailsForm:FormGroup;
  constructor(private router: Router, private serverService: ServerService,private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.serverService.reload_profile.subscribe((res: any) => {
      console.log(res);
      var kk = JSON.parse(res);
      console.log(kk)
      if (kk.data == 'reload_profile_data') {
        this.userName = localStorage.getItem('user_name');
        this.userId = localStorage.getItem('erp_c4c_user_id');
        this.role_Permission = localStorage.getItem('role');
        this.user_ProfileImage = localStorage.getItem('profile_image');
      }
    });

  }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    setTimeout(() => {
      this.userName = localStorage.getItem('user_name');
      this.userId = localStorage.getItem('erp_c4c_user_id');
      this.role_Permission = localStorage.getItem('role');
      this.user_ProfileImage = localStorage.getItem('profile_image');
    }, 2000);
    this.GlobalSearch = new FormGroup({
      'GS_SelectPage': new FormControl(null),
      'GS_CustomerCode': new FormControl(null),
      'GS_CustomerName': new FormControl(null),
      'GS_DIDNumber': new FormControl(null),
      'GS_LicenseNumber': new FormControl(null),

    });
    this.SelectPageList = [

      { permissionId: 101, permissionName: 'All Page' },
      { permissionId: 102, permissionName: 'Customer New' },
      { permissionId: 103, permissionName: 'Quotation New' },
      { permissionId: 109, permissionName: 'Proforma Invoice' },
      { permissionId: 134, permissionName: 'Invoice' },
      { permissionId: 101, permissionName: 'Credit Note' },
      { permissionId: 102, permissionName: 'Prepaid Note' },
      { permissionId: 103, permissionName: 'License Key New' },
      { permissionId: 109, permissionName: 'DID Number' },
      { permissionId: 134, permissionName: 'Customer Project' },
      { permissionId: 134, permissionName: 'Vs Provisioning' },

    ];

  }
  selectEventCustomer(item: any) {
    this.searchResultTest = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)

    this.CompanyName = item.customerName;
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
    console.log(e)
  }
  CHKAll_BillerNameSelectAll(a:any){

  }
  CHKAll_SelectPageSelectAll(event: any) {


    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      console.log("this.SelectPageList", this.SelectPageList)

      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', true);
        checkAll_ID.push(element.permissionId);
      });
      this.addSelectPageListCheckboxID_array = [];
      this.addSelectPageListCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.addSelectPageListCheckboxID_array-Select All", this.addSelectPageListCheckboxID_array)
    } else {
      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', false);

      });
      this.addSelectPageListCheckboxID_array = [];
      console.log("this.addSelectPageListCheckboxID_array-De Select All", this.addSelectPageListCheckboxID_array)

    }

  }
  addSelectPageCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    this.SelectPageListId = data;
    this.SelectPageList = event.target.checked;


    if (this.SelectPageList) {

      this.addSelectPageListCheckboxID_array.push(Number(data));
      this.addSelectPageListCheckboxID_array.join(',');
      console.log("Final BillerName Checkbox After checkbox selected list", this.addSelectPageListCheckboxID_array);
    }
    else {
      const index = this.addSelectPageListCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.addSelectPageListCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list", this.addSelectPageListCheckboxID_array)

    }

  }
 
  searchCustomerData(data: any) {


    this.searchResultTest = data
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_name_search";
    // api_req.api_url = "customer/cal/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
        this.searchResult = response.customer_names;
        console.log(" this.searchResult", this.searchResult)
      } else {
        Swal.close();
        iziToast.warning({
          message: "Response Failed",
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);


  }
}
