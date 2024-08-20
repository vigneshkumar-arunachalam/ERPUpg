import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';

declare var tinymce: any;

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.css']
})
export class PettyCashComponent implements OnInit {
  //advanced search
  searchPettyCashForm: FormGroup;
  searchResult: any;
  user_ids: string;
  searchResult_CustomerID: string;
  searchResult_CustomerName: string;
  searchBILLERID: any;
  edit_array_SearchBiller_Checkbox: any = [];
  CBV_BillerName_All: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  pettyCashListValue: any;
  biller_list: any;
  userList: any;
  searchPersonSelected: any;
  editPettyCashForm: FormGroup;
  editBillerList: any;
  typeList: any;
  response_total_cnt: any;
  searchTextInput: any;
  PC_BillerID: any;
  PC_TypeID: any;
  PC_editID: any;
  search: string='no';
  constructor(private serverService: ServerService, private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.pettyCashList({});
    this.pettyCashSearch();
    this.searchPettyCashForm = new FormGroup({
      'search_billerName': new FormControl(null),
      'searchText': new FormControl(null),
      'searchPerson': new FormControl(null),
    });
    this.editPettyCashForm = new FormGroup({
      'edit_date': new FormControl(null),
      'edit_biller': new FormControl(null),
      'edit_description': new FormControl(null),
      'edit_Type': new FormControl(null),
      'edit_Amount': new FormControl(null),

    });
  }
  sanitizeDescription(description: string): SafeHtml {
    // Replace newline characters with <br> tags
    const formattedDescription = description.replace(/\n/g, '<br>');
    // Return sanitized HTML
    return this.sanitizer.bypassSecurityTrustHtml(formattedDescription);
  }

  CustomerListQuickSearch(data: any) {

    this.searchTextInput = data.target.value;
    console.log("this.values", this.searchTextInput)
  }


  searchPettyCash() {
    $("#searchPettyCashFormId").modal("show");
  }
  usersCHK(billerId: any, event: any) {

  }

  searchBillerNameCHK(data: any, event: any) {
    this.searchBILLERID = data;
    console.log("this.edit_array_SearchBiller_Checkbox", this.edit_array_SearchBiller_Checkbox)
    console.log("this.searchBILLERID", this.searchBILLERID);
    this.CBV_BillerName_All = event.target.checked;
    if (this.CBV_BillerName_All) {
      if (!this.edit_array_SearchBiller_Checkbox) {
        this.edit_array_SearchBiller_Checkbox = [];
      }


      this.edit_array_SearchBiller_Checkbox.push(data);
      this.edit_array_SearchBiller_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_SearchBiller_Checkbox);
    }
    else {
      if (!Array.isArray(this.edit_array_SearchBiller_Checkbox)) {
        this.edit_array_SearchBiller_Checkbox = [];
      }
      // const index = this.edit_array_SearchBiller_Checkbox.findIndex((el: any) => el === data);
      const index = this.edit_array_SearchBiller_Checkbox.indexOf(data);
      if (index > -1) {
        this.edit_array_SearchBiller_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_SearchBiller_Checkbox)

    }

  }
  ChangeSearchPerson(event: any) {
    this.searchPersonSelected = event.target.value;

  }
  ChangeBillerDetails(event: any) {
    this.PC_BillerID = event.target.value;

  }
  ChangeTypeDetails(event: any) {
    this.PC_TypeID = event.target.value;
  }
  editPettyCash(pettyCashId: any) {
    this.spinner.show();
    this.PC_editID = pettyCashId;
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "pettycash/editPettyCash";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "pettycash/editPettyCash";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.pettyCashId = pettyCashId;

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#pettycashEditFormId').modal('show');
        this.editBillerList = response.biller;
        this.typeList = response.type;
        this.PC_BillerID=response.data[0].billerId;
        this.PC_TypeID=response.data[0].type;

        this.editPettyCashForm.patchValue({
          'edit_date': response.data[0].pattyCashDate,
          'edit_biller': response.data[0].billerId,
          'edit_description': response.data[0].description,
          'edit_Type': response.data[0].type,
          'edit_Amount': response.data[0].amount,
        });
        setTimeout(() => {
          this.editPettyCashForm.patchValue({
            'edit_biller': response.data[0].billerId,  
            'edit_Type': response.data[0].type,
          });
        }, 2000)
  

      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
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
        console.log("final error", error);
        
      };

  }
  pettyCashSearch() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "pettycash/getSearchData";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "pettycash/getSearchData";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.biller_list = response.biller;
        this.userList = response.user;
      } else {
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
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
  clearSearch() {
    this.searchPettyCashForm.controls['searchText'].reset();
    this.searchPettyCashForm.controls['searchPerson'].reset();

    this.searchTextInput = '';
    this.searchPersonSelected = '';
    this.edit_array_SearchBiller_Checkbox = [];
    $('#searchPettyCashFormId').modal('hide');
    this.pettyCashList({});
    this.pettyCashSearch();
  }
  clickChange(){
    this.search='yes';
  }
  pettyCashList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "pettycash/getPettyCashList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "pettycash/getPettyCashList";
    api_postUPd.off_set = list_data.offset;
    api_postUPd.limit_val = list_data.limit;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.search_txt = this.searchTextInput;
    api_postUPd.search_perosn = this.searchPersonSelected;
    api_postUPd.Search_BillerId = this.edit_array_SearchBiller_Checkbox;
    api_postUPd.search = this.search;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#searchPettyCashFormId').modal('hide');
        this.spinner.hide();
        this.pettyCashListValue = response.data;
        this.response_total_cnt = response.count;
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.count, 'page_limit': this.pageLimit });
      } else {
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
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
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  updatePettyCash() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "pettycash";
    api_req.api_url = "pettycash/updatePettyCash";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "pettycash/updatePettyCash";
    api_postUPd.pettyCashId =  this.PC_editID;
    if (this.PC_BillerID == null || this.PC_BillerID == '' || this.PC_BillerID == '0') {
      iziToast.error({
        message: "Biller ID Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.billerId = this.PC_BillerID;
    }
    
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.PC_TypeID == null || this.PC_TypeID == '' || this.PC_TypeID == '0') {
      iziToast.error({
        message: "Type Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.type = this.PC_TypeID;
    }

    if (this.editPettyCashForm.value.edit_description == null || this.editPettyCashForm.value.edit_description == '') {
      iziToast.error({
        message: "Description Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.description = this.editPettyCashForm.value.edit_description;
    }

    if (this.editPettyCashForm.value.edit_date == null || this.editPettyCashForm.value.edit_date == '') {
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
     
    api_postUPd.pattyCashDate = this.editPettyCashForm.value.edit_date;
    }

    if (this.editPettyCashForm.value.edit_Amount == null || this.editPettyCashForm.value.edit_Amount == '') {
      iziToast.error({
        message: "Amount Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
     
      api_postUPd.amount = this.editPettyCashForm.value.edit_Amount;
    }
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#pettycashEditFormId').modal('hide');
        this.pettyCashList({});
        this.spinner.hide();
        iziToast.success({
          message: "Petty Cash Details Updated Successfully",
          position: 'topRight'
        });
        
      } else {
        iziToast.warning({
          message: "Petty Cash List Loading Failed. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        if (error.status === 500) {
          iziToast.error({
            message: "Database error",
            position: 'topRight'
          });
        } else {
          iziToast.error({
            message: "Sorry, some server issue occurred. Please contact admin",
            position: 'topRight'
          });
       
        console.log("final error", error);
      };
    }
  }

  deletePettyCash(id: any) {

    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {
        this.spinner.show();
        let api_req: any = new Object();
        let delete_customer_req: any = new Object();
        api_req.moduleType = "pettycash";
        api_req.api_url = "pettycash/deletePettyCash";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_customer_req.action = "pettycash/deletePettyCash";
        delete_customer_req.user_id = localStorage.getItem('erp_c4c_user_id');
        delete_customer_req.pettyCashId = id;
        api_req.element_data = delete_customer_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          this.spinner.hide();
          if (response.status == true) {

            iziToast.success({
              message: "Petty Cash Details Deleted successfully",
              position: 'topRight'
            });
            this.pettyCashList({});
          } else {
            iziToast.warning({
              message: "Petty Cash Details not deleted. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }

}
