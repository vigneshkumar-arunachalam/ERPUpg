import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProformaInvoiceComponent } from '../billing/proforma-invoice/proforma-invoice.component';



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
  pagesNameList: any;


  SelectPageListId: any;
  //autocomplete-customer name
  searchResultTest: any;
  CompanyName: any;
  searchResult: any;
  // Contract Details
  ContractDetailsForm: FormGroup;
  user_ids: any;
  searchResult_code: any;
  searchResult_DIDNumber: any;
  searchResult_LicenseNumber: any;
  PG_customerId: any;
  PG_customerName: any;
  PG_CustomerCode: any;
  PG_LicenseNum: any;
  PG_DIDNumber: any;

  proformaList: any;
  PI_list: any;
  dashboard = false;
  PI_list_send: any;
  customerContractlist: any;
  resellerList: any;
  resellerList_CurrencyName: any;
  resellerList_ResellerDiscount: any;
  resellerList_ResellerId: any;
  customercontractForm: FormGroup;
  testVariable: { id: number; name: string; }[];
  PageIDs: any;
  SelectPageList: any = [];
  addSelectPageListCheckboxID_array: any = [];
  pageList: any;
  selectAllCheckbox: any;
  deselectAllCheckbox: any;
  Quotation_list_send: any;
  Customer_list_send: any;
  Invoice_list_send: any;
contract_filter=false;
  PG_LicenseKey: any;
  PG_DIDNumbers: any;
  componentDynamic: any;
  constructor(private router: Router, private serverService: ServerService, private fb: FormBuilder, private spinner: NgxSpinnerService) {
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
  keywordCompanyCode = 'customerCode';
  keywordDIDNumber = 'did_numbers';
  keywordLicenseNumber = 'license_key';
  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.resellerList_CurrencyName ='SGD';
    this.resellerList_ResellerDiscount =0;
    this.resellerList_ResellerId ='Empty';
    this.addSelectPageListCheckboxID_array=["Customer New"];
    setTimeout(() => {
      this.userName = localStorage.getItem('user_name');
      this.userId = localStorage.getItem('erp_c4c_user_id');
      this.role_Permission = localStorage.getItem('role');
      this.user_ProfileImage = localStorage.getItem('profile_image');
    }, 2000);
    this.PageList();
    this.searchGlobalList();

    this.testVariable = [{ "id": 1, "name": "Credit Note" }, { "id": 2, "name": "Customer New" }, { "id": 3, "name": "Customer Project" }, { "id": 4, "name": " DID Number" }]
    console.log(this.testVariable)
    this.GlobalSearch = new FormGroup({
      'GS_SelectPage': new FormControl(null),
      'GS_CustomerCode': new FormControl(null),
      'GS_CustomerName': new FormControl(null),
      'GS_DIDNumber': new FormControl(null),
      'GS_LicenseNumber': new FormControl(null),

    });
    this.customercontractForm = new FormGroup({
      'colorCU': new FormControl(null),
    });
    this.ContractDetailsForm = new FormGroup({
      'contractColor': new FormControl(null),
    });
    
  }

  selectEventCustomer(item: any) {
    this.searchResultTest = item.customerName;
    this.PG_customerId = item.customerId;
    this.PG_customerName = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)

    this.CompanyName = item.customerName;
    // do something with selected item
  }

  onFocusedCustomer(e: any) {
 
    let api_req: any = new Object();
    let api_contract_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_contract";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_contract_req.action = "get_contract";
    api_contract_req.user_id = this.user_ids;
    api_contract_req.customer_id = this.PG_customerId;
    api_req.element_data = api_contract_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {
       
          this.contract_filter =  true;
                  console.log("response.customer_contract.color",response.customer_contract.color)
        
        this.customerContractlist = response.customer_contract;
        this.resellerList = response.reseller_info;
        this.resellerList_CurrencyName = response.reseller_info.currency_name;
        this.resellerList_ResellerDiscount = response.reseller_info.reseller_discount;
        this.resellerList_ResellerId = response.reseller_info.reseller_id;
        
        this.ContractDetailsForm.patchValue({
          'contractColor':'#'+response.customer_contract[0].color
        })

      } else {
        this.contract_filter =  false;
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
  CHKAll_BillerNameSelectAll(a: any) {

  }
  CHKAll_SelectPageSelectAll(event: any) {


    if (event.target.checked == true) {
      var checkAll_ID: any = [];
      console.log("this.SelectPageList", this.SelectPageList)

      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', true);
        //checkAll_ID.push(element.pageId); if id needs to be send or below line if u want to send names
        checkAll_ID.push(element.menu_name);

      });
      this.addSelectPageListCheckboxID_array = [];
      this.addSelectPageListCheckboxID_array = checkAll_ID;
      console.log("checkedID", checkAll_ID)
      console.log("this.addSelectPageListCheckboxID_array-Select All", this.addSelectPageListCheckboxID_array)
      this.PageIDs = this.addSelectPageListCheckboxID_array;
      console.log("this.PageIDs-Select All", this.PageIDs);
    } else {
      this.SelectPageList.forEach((element: any, index: any) => {
        $("#check-grp-SelectPage-" + index).prop('checked', false);
      });
      this.addSelectPageListCheckboxID_array = [];
      console.log("this.addSelectPageListCheckboxID_array-De Select All", this.addSelectPageListCheckboxID_array);
      this.PageIDs = this.addSelectPageListCheckboxID_array;
      console.log("this.PageIDs-De Select All", this.PageIDs);
    }

  }




  addSelectPageCHK(data: any, event: any) {
    console.log("Contract File Attachment Display - CheckBox ID", data);
    this.SelectPageListId = data;

    if (event.target.checked == true) {

      this.addSelectPageListCheckboxID_array.push(data);
      console.log("Final BillerName Checkbox After checkbox selected list", this.addSelectPageListCheckboxID_array);
    }
    else {
      const index = this.addSelectPageListCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.addSelectPageListCheckboxID_array.splice(index, 1);
      }
      console.log("Final BillerName Checkbox After Deselected selected list", this.addSelectPageListCheckboxID_array)

    }
    this.addSelectPageListCheckboxID_array.join(',');

  }



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);


  }
  QuickMail_Customer() {
    Swal.fire({
      title: 'Are you sure to Send?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let api_reqD1: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/customer_quick_mail";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_reqD1.action = "customer_quick_mail";
        api_reqD1.user_id = localStorage.getItem('erp_c4c_user_id');
        api_reqD1.customerId = this.PG_customerId;
        api_req.element_data = api_reqD1;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            this.spinner.hide();
            iziToast.success({
              message: "Quick Mail Sent Successfully",
              position: 'topRight'
            });

          } else {
            this.spinner.hide();
            iziToast.warning({
              message: "Quick Mail not Sent. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            this.spinner.hide();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error)
          };
      }
    })


  }
  searchGlobalList() {

    this.onFocusedCustomer({});
    // $('#ActionIdxx3').modal('show');

    let api_req: any = new Object();
    let api_schGlo_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/globalSearchAll";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_schGlo_req.action = "globalSearchAll";
    api_schGlo_req.user_id = this.user_ids;
    if (this.PG_customerId == '' || this.PG_customerId == 'undefined' || this.PG_customerId == undefined) {
      // iziToast.error({
      //   message: "Select Customer",
      //   position: 'topRight'
      // });
      return false;

    } else {
      api_schGlo_req.customer_id = this.PG_customerId;
    }


    api_schGlo_req.customer_name = this.PG_customerName;
    api_schGlo_req.customer_code = this.PG_CustomerCode;

    api_schGlo_req.license_number = this.PG_LicenseNum;
    api_schGlo_req.did_number = this.PG_DIDNumber;

    if (this.addSelectPageListCheckboxID_array == '' || this.addSelectPageListCheckboxID_array == 'undefined' || this.addSelectPageListCheckboxID_array == undefined) {
      iziToast.error({
        message: "Select Page ",
        position: 'topRight'
      });
      return false;
    } else {
      api_schGlo_req.pagename = this.addSelectPageListCheckboxID_array;
    }
    

    api_req.element_data = api_schGlo_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // $('#ActionIdxx2').modal('hide');
      console.log(" response--pagelist", response)
      if (response != '') {
        console.log("playboy",response.quotation_list)

        this.SelectPageList = response.menuList;
        this.pageList = response.menuList;
        this.componentDynamic=response.selected_menu;
      
        this.PI_list = response.proforma_details;
        this.PI_list_send = response.proforma_invoice_list.proforma_details;
        if(response.quotation_list!=0|| response.quotation_list!='0'){
          this.Quotation_list_send = response.quotation_list.quotation_details;
          this.serverService.global_search_quotation.next(JSON.stringify(this.Quotation_list_send));
        }else{
          
          console.log("quotation skipped")
        }
        
        console.log(this.Quotation_list_send);
        this.Customer_list_send = response.customer_list.customer_details;
        this.Invoice_list_send = response.invoice_list.proforma_details;
        console.log("without json stringfy,this.Customer_list_send",this.Customer_list_send);
        console.log("with json stringfy,this.Customer_list_send",JSON.stringify(this.Customer_list_send));
        this.dashboard = true;
        console.log(this.dashboard);
        console.log(" this.PI_list_send", this.PI_list_send)
        var api_req: any = '{"type":"hello","proformalist":this.PI_list_send}';
        this.serverService.global_search.next(JSON.stringify(this.PI_list_send));
        this.serverService.global_search_invoice.next(this.Invoice_list_send);
        this.serverService.global_search_customer.next(this.Customer_list_send);
        

        $('#ActionIdOutput').modal('show');
      



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
  gotoRoot(){

    $('#ActionIdxx2').modal('hide');
    // this.router.navigate(['/customernewall']);
    // window.location.reload();
  }
  closeModal() {
    this.PageList();
    $('#ActionIdOutput').modal('hide');
    setTimeout(() => {
      if(this.addSelectPageListCheckboxID_array[0] == "Credit Note"){
        $("#check-grp-SelectPage-0").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[1] == "Customer New"){
        $("#check-grp-SelectPage-1").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[2] == "Customer Project"){
        $("#check-grp-SelectPage-2").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[3] == "DID Number"){
        $("#check-grp-SelectPage-3").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[4] == "Invoice"){
        $("#check-grp-SelectPage-4").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[5] == "License Key New"){
        $("#check-grp-SelectPage-5").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[6] == "Prepaid Note"){
        $("#check-grp-SelectPage-6").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[7] == "Proforma Invoice"){
        $("#check-grp-SelectPage-7").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[8] == "Quotation New"){
        $("#check-grp-SelectPage-8").prop('checked', true);
      }
      if(this.addSelectPageListCheckboxID_array[9] == "Vs Provisioning"){
        $("#check-grp-SelectPage-9").prop('checked', true);
      }
      console.log("this.SelectPageList", this.addSelectPageListCheckboxID_array[0])
    }, 1000);


    // setTimeout(() => {
    //   this.addSelectPageCHK({},{});
    // }, 1000);
 
  }
  gotoCustomerMaster() {
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
        this.SelectPageList = response.menuList;
        console.log(" this.SelectPageList", this.SelectPageList)
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

  customerQuickMail() {


    let api_req: any = new Object();
    let api_quickMail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_quick_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quickMail_req.action = "customer_quick_mail";
    api_quickMail_req.user_id = this.user_ids;
    api_quickMail_req.customerId = this.PG_customerId;
    api_req.element_data = api_quickMail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response != '') {

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
  inpChanged_CodeData(data: any) {

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
    this.PG_CustomerCode = item;

    console.log(item)

  }

  inpChanged_DIDNumber(data: any) {

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
      this.onout_DIDNumber();
    });
  }

  onFocused_DIDNumber(e: any) {
    // do something when input is focused
    this.onout_DIDNumber();
  }

  selected_DIDNumber(item: any) {
    this.PG_DIDNumber = item;
    console.log(item)

  }

  inpChanged_LicenseNumber(data: any) {

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
      this.onout_LicenseNumber();

    });
  }

  onFocused_LicenseNumber(e: any) {
    // do something when input is focused
    this.onout_LicenseNumber();
  }
  onout_LicenseNumber() {

    let api_req: any = new Object();
    let api_LicenCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_license_number_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_LicenCode_req.action = "get_license_number_customer";
    api_LicenCode_req.user_id = this.user_ids;
    api_LicenCode_req.license_number = this.PG_LicenseNum;
    api_req.element_data = api_LicenCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.PG_customerId = response.customer_id;
      this.PG_customerName = response.customerName;
      this.PG_LicenseKey = response.license_key;

    });
  }
  onout_DIDNumber() {

    let api_req: any = new Object();
    let api_DIDCode_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "global/get_did_number_customer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_DIDCode_req.action = "get_did_number_customer";
    api_DIDCode_req.user_id = this.user_ids;
    api_DIDCode_req.did_number = this.PG_DIDNumber;
    api_req.element_data = api_DIDCode_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.PG_customerId = response.customer_id;
      this.PG_customerName = response.customerName;
      this.PG_DIDNumbers = response.did_numbers;

    });
  }


  selected_LicenseNumber(item: any) {
    this.PG_LicenseNum = item;
    console.log(item)
    this.onout_LicenseNumber();

  }
 
  EditCHK(i: any, k: any) {

  }
}
