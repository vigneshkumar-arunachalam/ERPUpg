import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;

@Component({
  selector: 'app-stock-didnumber-catalog',
  templateUrl: './stock-didnumber-catalog.component.html',
  styleUrls: ['./stock-didnumber-catalog.component.css']
})
export class StockDIDNumberCatalogComponent implements OnInit {
  //toggle nav
  activeSection: string | null = null;
  //pagination
  recordNotFound = false;
  pageLimit = 20;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  response_total_cnt: any;
  productCategoryList1: any;
  demo_did_numberList: any;
  didNameCount: any;
  didNumberCounts: any;
  nrsList: any;
  blocked_list:any;
  selectedIds_blocked: number[] = [];
  DIDDetailList: any;
  //DIDInvReserveForm
  DIDInvReserveForm:FormGroup;
  ResellerName_Customer: any;
  ResellerId_Customer: any;
  searchResult: any;
  DIDEntryID: any;
  constructor(private serverService: ServerService, private router: Router,
    private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) { }
    keywordResellerName = 'customerName';
  ngOnInit(): void {
    this.getDidCatalogDetailsList({});
    this.activeSection ='nrs1';
    this.releaseBlockedDidNumbers();
    this.getDidDetails();

  }
  toggleCollapse(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }
  toggleCollapse1(section: string): void {
    this.activeSection = section;
  }

  getDidCatalogDetailsList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "didCatalogue";
    api_req.api_url = "didCatalogue/getDidCatalogDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getDidCatalogDetails";
    api_postUPd.off_set = list_data.offset;
    api_postUPd.limit_val = list_data.limit;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.billerId = '';
    api_postUPd.search_text = '';
    api_postUPd.customer_id = '';
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();

        this.demo_did_numberList = response.demo_did_numberList;
        this.didNameCount = response.didNameCount;
        this.didNumberCounts = response.didNumberCounts;
        this.nrsList = response.nrsList;
        this.blocked_list=response.blocked_list;

        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
        $('#searchProductCategoryFormId').modal('hide');
      } else {
        // iziToast.warning({
        //   message: "Failed. Please try again",
        //   position: 'topRight'
        // });

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
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  
  toggleBlocked(did_entry_id: number, event: any) {
    if (event.target.checked) {
      this.selectedIds_blocked.push(did_entry_id);
    } else {
      this.selectedIds_blocked = this.selectedIds_blocked.filter(id => id !== did_entry_id);
    }
    console.log("this.selectedIds_blocked",this.selectedIds_blocked);
  }
  onRClick(didentryid:any){
    this.DIDEntryID=didentryid;
    $('#DIDInvReserve').modal('show');

  }
  releaseBlockedDidNumbers() {
    this.spinner.show();
 

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "didCatalogue";
    api_req.api_url = "didCatalogue/releaseBlockedDidNumbers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "releaseBlockedDidNumbers";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.did_entry_id = this.selectedIds_blocked;
  
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    
      if (response.status == true) {

        this.spinner.hide();
        iziToast.success({
          message: "Blocked DID numbers released successfully",
          position: 'topRight'
        });
        this.getDidCatalogDetailsList({});


      } else {
        // iziToast.warning({
        //   message: "Failed. Please try again",
        //   position: 'topRight'
        // });

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
  getDidDetails() {
    this.spinner.show();
 

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "didCatalogue";
    api_req.api_url = "didCatalogue/getDidDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getDidDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.did_entry_id = '';
    api_postUPd.billerId = '';
    api_postUPd.search_text = '';
    api_postUPd.customer_id = '';
  
  
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      if (response.status == true) {

        this.spinner.hide();
        this.DIDDetailList=response.DidNumbersList;


      } else {
        // iziToast.warning({
        //   message: "Failed. Please try again",
        //   position: 'topRight'
        // });

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
  onRadioSelect(did: any, selected: string): void {
    // Reset all
    did.none = '';
    did.bronze = '';
    did.silver = '';
    did.gold = '';
  
    // Set selected
    switch (selected) {
      case 'none': did.none = 4; break;
      case 'bronze': did.bronze = 1; break;
      case 'silver': did.silver = 2; break;
      case 'gold': did.gold = 3; break;
    }
  
    console.log(`DID ${did.did_entry_id} set to ${selected}`);
  }
  selectEventReseller(item: any) {
    this.ResellerName_Customer = item.customerName;
    this.ResellerId_Customer = item.customerId
    console.log(item.customerId)
    console.log(item.customerName)


    // do something with selected item
  }
  onFocusedReseller(e: any) {
    // do something when input is focused
    console.log(e)
  }
  searchResellerData(data: any) {



    this.spinner.show();
    let api_req: any = new Object();
    let api_searchReseData: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/reseller_name_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_searchReseData.action = "reseller_name_details";
    api_searchReseData.reseller_name = data;
    api_searchReseData.user_id = localStorage.getItem('erp_c4c_user_id');

    // api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_searchReseData;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.searchResult = response.reseller_list;


      } else {


        iziToast.warning({
          message: "No Match. Please try again",
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
  saveCustomer() {

    this.spinner.show();
    let api_req: any = new Object();
    let api_searchReseData: any = new Object();
    api_req.moduleType = "didCatalogue";
    api_req.api_url = "didCatalogue/addReserveCustomer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_searchReseData.action = "addReserveCustomer";

    api_searchReseData.user_id = localStorage.getItem('erp_c4c_user_id');
    api_searchReseData.did_entry_id =  this.DIDEntryID;
    api_searchReseData.customer_id = this.ResellerId_Customer ;
    // api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_searchReseData;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#DIDInvReserve').modal('hide');
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        


      } else {


        iziToast.warning({
          message: "No Match. Please try again",
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
 


}
