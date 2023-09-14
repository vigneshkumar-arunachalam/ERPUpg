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
  user_ids:any;
  searchResult_code:any;
  searchResult_DIDNumber:any;
  searchResult_LicenseNumber:any;
  PG_customerId:any;
  PG_customerName:any;
  PG_CustomerCode:any;
  PG_LicenseNum:any;
  PG_DIDNumber:any;
  PageIDs:any;
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
  keywordCompanyCode='customerCode';
  keywordDIDNumber='did_numbers';
  keywordLicenseNumber='license_key';
  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    setTimeout(() => {
      this.userName = localStorage.getItem('user_name');
      this.userId = localStorage.getItem('erp_c4c_user_id');
      this.role_Permission = localStorage.getItem('role');
      this.user_ProfileImage = localStorage.getItem('profile_image');
    }, 2000);
    this.PageList();
    this.GlobalSearch = new FormGroup({
      'GS_SelectPage': new FormControl(null),
      'GS_CustomerCode': new FormControl(null),
      'GS_CustomerName': new FormControl(null),
      'GS_DIDNumber': new FormControl(null),
      'GS_LicenseNumber': new FormControl(null),

    });
  }
  selectEventCustomer(item: any) {
    this.searchResultTest = item.customerName;
    this.PG_customerId=item.customerId;
    this.PG_customerName=item.customerName;
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
        checkAll_ID.push(element.pageId);
      });
      this.addSelectPageListCheckboxID_array = [];
      this.addSelectPageListCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.addSelectPageListCheckboxID_array-Select All", this.addSelectPageListCheckboxID_array)
      this.PageIDs =this.addSelectPageListCheckboxID_array;
      console.log("this.PageIDs-Select All", this.PageIDs);
    } else {
      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', false);
      });
      this.addSelectPageListCheckboxID_array = [];
      console.log("this.addSelectPageListCheckboxID_array-De Select All", this.addSelectPageListCheckboxID_array);
      this.PageIDs =this.addSelectPageListCheckboxID_array;
      console.log("this.PageIDs-De Select All", this.PageIDs);
    }

  }
  addSelectPageCHK(data: any, event: any) {
    // console.log("Contract File Attachment Display - CheckBox ID", data);
    // this.SelectPageListId = data;
    // this.SelectPageList = event.target.checked;


    // if (this.SelectPageList) {

    //   this.addSelectPageListCheckboxID_array.push(data);
    //   this.addSelectPageListCheckboxID_array.join(',');
    //   console.log("Final BillerName Checkbox After checkbox selected list", this.addSelectPageListCheckboxID_array);
    // }
    // else {
    //   const index = this.addSelectPageListCheckboxID_array.findIndex((el: any) => el === data)
    //   if (index > -1) {
    //     this.addSelectPageListCheckboxID_array.splice(index, 1);
    //   }
    //   console.log("Final BillerName Checkbox After Deselected selected list", this.addSelectPageListCheckboxID_array)

    // }

  }
 


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);


  }
  searchGlobalList(){
   
    // $('#ActionIdxx3').modal('show');

    let api_req: any = new Object();
    let api_schGlo_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/globalSearchAll";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_schGlo_req.action = "globalSearchAll";
    api_schGlo_req.user_id = this.user_ids;
    if(this.PG_customerId=='' || this.PG_customerId=='undefined' || this.PG_customerId==undefined){
      iziToast.error({
        message: "Select Customer",
        position: 'topRight'
      });
      return false;
    
    }else{
      api_schGlo_req.customer_id = this.PG_customerId;
    }
  
    
    api_schGlo_req.customer_name = this.PG_customerName;
    api_schGlo_req.customer_code = this.PG_CustomerCode;
    
    api_schGlo_req.license_number = this.PG_LicenseNum;
    api_schGlo_req.did_number = this.PG_DIDNumber;
   
    if(this.PageIDs=='' || this.PageIDs=='undefined' || this.PageIDs==undefined){
      iziToast.error({
        message: "Select Page ",
        position: 'topRight'
      });
      return false;
    }else{
      api_schGlo_req.pagename =   this.PageIDs;
    }
  

    api_req.element_data = api_schGlo_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $('#ActionIdxx2').modal('hide');
      console.log(" response--pagelist", response)
      if (response != '') {
        this.SelectPageList =   response.menuList;
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
  gotoCustomerMaster(){
    $('#ActionIdxx3').modal('hide');
    this.router.navigate(['/customernewall']);
  

  }
  PageList() {


    let api_req: any = new Object();
    let api_page_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getMenuList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_page_req.action = "getMenuList";
    api_page_req.user_id = this.user_ids;
    api_req.element_data = api_page_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log(" response--pagelist", response)
      if (response != '') {
        this.SelectPageList =   response.menuList;
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
  searchCustomerData(data: any) {


    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getCustomerName";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log(" response", response)
      if (response != '') {
        this.searchResult = response.customerName;
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
  inpChanged_CodeData(data: any){

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getCustomerCode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getCustomerCode";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer code_status response", response);

      this.searchResult_code = response.customerCode;
      console.log("vignesh-advanced search result", this.searchResult_code);
     
    });
  }

  onFocused_CustomerCode(e: any) {
    // do something when input is focused
  }
 
  selected_CustomerCode(item: any) {
    this.PG_CustomerCode=item;
   
    console.log(item)

  }

  inpChanged_DIDNumber(data: any){

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getDidNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getDidNumber";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer code_status response", response);

      this.searchResult_DIDNumber = response.did_numbers;
      console.log("vignesh-advanced search result", this.searchResult_DIDNumber);
     
    });
  }

  onFocused_DIDNumber(e: any) {
    // do something when input is focused
  }
 
  selected_DIDNumber(item: any) {
   this.PG_DIDNumber=item;
    console.log(item)

  }
  
  inpChanged_LicenseNumber(data: any){

    let api_req: any = new Object();
    let api_comCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/getLicenseNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_comCode_req.action = "getLicenseNumber";
    api_comCode_req.user_id = this.user_ids;
    api_comCode_req.searchkey = data;
    api_req.element_data = api_comCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer code_status response", response);

      this.searchResult_LicenseNumber = response.license_key;
      console.log("vignesh-advanced search result", this.searchResult_LicenseNumber);
     
    });
  }

  onFocused_LicenseNumber(e: any) {
    // do something when input is focused
  }
 
  selected_LicenseNumber(item: any) {
 this.PG_LicenseNum=item;
    console.log(item)

  }
  getSelectedItems() {
    const selectedItems = this.SelectPageList.filter((item: { checked: any; }) => item.checked);
    const selectedIds = selectedItems.map((item: { pageId: any; }) => item.pageId);
    // this.addSelectPageListCheckboxID_array= selectedItems.map((item: { pageId: any; }) => item.pageId);
    const selectedNames = selectedItems.map((item: { menu_name: any; }) => item.menu_name);
    this.PageIDs =selectedItems.map((item: { pageId: any; }) => item.pageId);
    console.log('Selected Items:', selectedItems);
    console.log('Selected IDs:', selectedIds);
    // console.log('Selected IDs-based on selectall/deslect all:', this.addSelectPageListCheckboxID_array);
    console.log('Selected Names:', selectedNames);
  }
}
