import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;
import { HttpClient } from '@angular/common/http';
import { ExcelExportService } from '../reports/invoicereportsold/excel-export.service';
import { FileDownloadService } from '../reports/invoicereportsold/file-download.service';



@Component({
  selector: 'app-nx3233',
  templateUrl: './nx3233.component.html',
  styleUrls: ['./nx3233.component.css']
})
export class Nx3233Component implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;

  unassignList : any;
  assignlicensesWithKeysList : any;
  bulklicensesWithoutKeys: any;
  licensesInApproval : any;
  viewProductCategory: FormGroup;
  editProductCategory: FormGroup;
  addProductCategory: FormGroup;
  searchProductCategory: FormGroup;
  AssignCustomerFormGroup: FormGroup;
  AssignCustomerSingleFormGroup: FormGroup;
  addNotesFormGroup: FormGroup;
  response_total_cnt1: any;
  response_total_cnt2: any;
  response_total_cnt3: any;
  response_total_cnt4: any;
  editApprovalStatus: any;
  editproduct_category_id: any;
  //select all-assigned
  selectAllCheckbox = false;
  unpaid_status: boolean = false;
 
  selectedResellerCommIds_unpaid_all: any[] = [];
  selectedResellerCommIds_unpaid: any[] = [];
  //selectall-unassignesed
  selectAllCheckboxUnassigned=false;
   downloadUrl:any = 'https://laravelapi.erp1.cal4care.com/nx32samplecsv.csv';
  clickstatusValue: any=0;
  tempVariable: any;
  searchResultTest: any;
  searchResult: any;
  CompanyName: any;
  customerID: any;
  assignedCust: any;
  notesLicenseID: any;
  checkedValuesLicense: any;
  tempVariablePagination: any;
  saveStatus: boolean=true;
  constructor(private serverService: ServerService, private http: HttpClient,
    private excelExportService: ExcelExportService, private fileDownloadService: FileDownloadService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private spinner: NgxSpinnerService) 
    { 
      this.addPI_section2 = this.fb.group({
        addresses: this.fb.array([this.createAddress()])
      });
    }
 //file attachment
 fileAttach_quotationID: any;
 FileAttachmentForm: FormGroup;
 getFileAttachmentResult: any;
 myFiles: string[] = [];
 edit_array: any = [];
 checkbox_value: any;
 groupSelectCommonId: any;
 commonAttachmentID: any;
 checkboxAdding: any = [];
 keywordCompanyName = 'customerName';

  ngOnInit(): void {

    this.productCategoryList({});
    this.viewProductCategory = new FormGroup({
      'view_ProductCategoryCode': new FormControl(null),
      'view_ProductCategoryName': new FormControl(null),
      'view_PurchasePrice': new FormControl(null),
    });
    this.editProductCategory = new FormGroup({
      'edit_ProductCategoryCode': new FormControl(null),
      'edit_ProductCategoryName': new FormControl(null),
      'edit_PurchasePrice': new FormControl(null),
    });
    this.addProductCategory = new FormGroup({
      'add_ProductCategoryCode': new FormControl(null),
      'add_ProductCategoryName': new FormControl(null),
      'add_PurchasePrice': new FormControl(null),
    });
    this.searchProductCategory = new FormGroup({
      'search_ProductCategoryName': new FormControl(null),
    });
    this.FileAttachmentForm = new FormGroup({
      'file': new FormControl(null),

    });
    this.AssignCustomerFormGroup = new FormGroup({
      'customerAssign': new FormControl(null),

    });
    this.AssignCustomerSingleFormGroup = new FormGroup({
      'customerAssign': new FormControl(null),

    });
    this.addNotesFormGroup = new FormGroup({
      'addNote': new FormControl(null),

    });
    this.tempVariable=[];

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

     this.addresses = this.addPI_section2.get('addresses') as FormArray;
     this.addresses.push(this.createAddress());
   }
   removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
   createAddress(): FormGroup {
     return this.fb.group({
       // customer_id:'',
       SerialNumber: '',
       WANAddress: '',
       LANAddress1: '',
       LANAddress2: '',
       Order: '',
       ModelNumber: '',
    
     });
   }
   addSerialNumber(){
    $('#addSerialNoFormID').modal('show');
   }

  Notes(licenceID:any){
    this.notesLicenseID=licenceID;
    $('#addNotesFormID').modal('show');
  }
  AssignCustomerSingle(licenceID:any){
    this.checkedValuesLicense=licenceID;
    $('#addAssignCustomerFormID').modal('show');
  }
  clearSelection(event: any) {
      this.searchResult = '';
    this.customerID='';
  }
  assignCustomerSave_single(){

    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "nx32";
    api_req.api_url = "nx32/assignCustomer";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "assignCustomer";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');

    if(this.customerID=='' || this.customerID=='undefined' || this.customerID==undefined){
      iziToast.error({
        message: "Select Customer",
        position: 'topRight'
      });
      return false;
    }else{
      api_postUPd.customerId = this.customerID;
    }
    
    api_postUPd.checkedValues = this.checkedValuesLicense;
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        this.customerID='';
        this.assignedCust=response.assigned_customer;
        $('#addAssignCustomerFormID').modal('hide');
        this.spinner.hide();
        iziToast.success({
          message: "Successfully Assigned to" +"-"+ this.assignedCust,
          position: 'center'
        });
        this.productCategoryList({});
      

      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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
  
  
      this.searchResultTest = data
      let api_req: any = new Object();
      let api_Search_req: any = new Object();
      api_req.moduleType = "nx32";
      api_req.api_url = "nx32/getnx32CustomerList";
      // api_req.api_url = "customer/cal/customer_name_search";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_Search_req.action = "getnx32CustomerList";
      api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
      api_Search_req.keyword = data;
      api_req.element_data = api_Search_req;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
  
  
        if (response != '') {
          this.searchResult = response.data;
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
  selectEventCustomer(item: any) {
    this.searchResultTest = item.customerName;
    console.log(item.customerId)
    console.log(item.customerName)
    this.customerID=item.customerId;
    this.CompanyName = item.customerName;
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
    console.log(e)
  }
  uploadFile(){
    $('#fileAttachmentNX32FormId').modal('show');
  }
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
   fileAttachmentUpdate() {
     
      //  var data = new FormData();
      Swal.fire('File Updating');
      Swal.showLoading();
  
      if (this.myFiles.length == 0) {
        Swal.close();
        iziToast.warning({
          message: "Attachment File Missing",
          position: 'topRight'
        });
      }
  
      if (this.myFiles.length > 0) {
  
        const data = new FormData();
  
        for (var i = 0; i < this.myFiles.length; i++) {
          data.append("csv_file", this.myFiles[i]);
        }
        // data.append("csv_file", this.FileAttachmentForm.value.file);
        // for (var j = 0; j < this.edit_array.length; j++) {
        //   data.append("quotation_pdf_add[]", this.edit_array[j]);
        // }
  
        data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
     
        // data.append('quotation_pdf_add[]',this.edit_array ); 
        data.append('action', "uploadCSV");
  
  
        var self = this;
        $.ajax({
          type: 'POST',
          url: 'https://laravelapi.erp1.cal4care.com/api/nx32/uploadCSV',
          cache: false,
          contentType: false,
          processData: false,
          data: data,
          success: function (result: any) {
            if (result.status == true) {
              this.insertedRecords=result.inserted_records;
              self.productCategoryList({});
            //  console.log(result);
              Swal.close();
              $("#fileAttachmentNX32FormId").modal("hide");
              this.edit_array = [];
           
              this.myFiles=[];
              this.FileAttachmentForm.reset();
              console.log("myfiles length",this.myFiles.length);
                  if( this.insertedRecords==0){
                    this.myFiles=[];
                    iziToast.warning({
                      message: "Records already uploaded or Empty Record inserted",
                      position: 'topRight'
                    });
                  

                  }else{
                    this.myFiles=[];
                    this.FileAttachmentForm.reset();
                    iziToast.success({
                      message: this.insertedRecords + "-"+ "Records inserted successfully",
                      position: 'topRight'
                    });
                  
  }
             
            }
            else {
              this.myFiles=[];
              this.FileAttachmentForm.reset();
              Swal.close();
              $("#fileAttachmentNX32FormId").modal("hide");
  
              iziToast.warning({
                message: "File Attachment Update Failed",
                position: 'topRight'
              });
            }
          },
          error: function (err: any) {
            this.myFiles=[];
            this.FileAttachmentForm.reset();
            console.log("err", err)
            iziToast.error({
              message: "Server Side Error",
              position: 'topRight'
            });
            Swal.close();
            $("#fileAttachmentNX32FormId").modal("hide");
          }
  
        })
  
  
      }
    }
  
  downloadFile(){
   
    window.open(this.downloadUrl, '_blank');
  }
  
  addProdCatGo() {
   
    this.getProductCategoryCode();
  
  }
  searchProdCatGo() {
    $('#searchProductCategoryFormId').modal('show');
  }
  clickStatus(value:any){
    this.clickstatusValue=value;

  }
  selectAll() {
    alert("hi")
    console.log("coming")
    this.selectedResellerCommIds_unpaid_all = [];
    this.unpaid_status = !this.unpaid_status;
    console.log("assignlicensesWithKeysList",this.assignlicensesWithKeysList);

    this.assignlicensesWithKeysList.forEach((reseller: any) => {

      if (reseller.checkbox == 1 && this.selectAllCheckbox) {
        reseller.selected = true;
        this.selectedResellerCommIds_unpaid.push(reseller.license_id );
        this.selectedResellerCommIds_unpaid_all.push(reseller.refAmount);
        
      }
      else {
        reseller.selected = false;
        const indexOfId = this.selectedResellerCommIds_unpaid.indexOf(reseller.license_id );
        if (indexOfId > -1) {
          this.selectedResellerCommIds_unpaid.splice(indexOfId, 1);
          this.selectedResellerCommIds_unpaid_all.pop();
        }
      }
    });
    console.log("select all/deselect all",this.selectedResellerCommIds_unpaid);
    
  }
  selectAll_assignLicense() {
    this.selectedResellerCommIds_unpaid_all = [];
    this.selectedResellerCommIds_unpaid = [];

    if(this.clickstatusValue==0){
      this.tempVariable=this.unassignList;
    }else if(this.clickstatusValue==1){
      this.tempVariable=this.assignlicensesWithKeysList;
    }else if(this.clickstatusValue==2){
      this.tempVariable=this.bulklicensesWithoutKeys;
    }else{
      this.tempVariable=this.licensesInApproval;
    }
console.log("this.tempVariable",this.tempVariable);
    this.tempVariable.forEach((item: { selected: boolean; license_id: any; refAmount: any; }) => {
      item.selected = this.selectAllCheckbox; // Update each item's selected state

      if (item.selected) {
        this.selectedResellerCommIds_unpaid.push(item.license_id);
        this.selectedResellerCommIds_unpaid_all.push(item.refAmount);
      }
    });

    console.log('Select All/Deselect All:', this.selectedResellerCommIds_unpaid);
  }
  updateSelected_assignLicense(item: any) {
    if (item.selected) {
      // Add to selected arrays
      this.selectedResellerCommIds_unpaid.push(item.license_id);
      this.selectedResellerCommIds_unpaid_all.push(item.refAmount);
    } else {
      // Remove from selected arrays
      const index = this.selectedResellerCommIds_unpaid.indexOf(item.license_id);
      if (index > -1) {
        this.selectedResellerCommIds_unpaid.splice(index, 1);
        this.selectedResellerCommIds_unpaid_all.splice(index, 1);
      }
    }

    // Update master checkbox state
    this.selectAllCheckbox = this.tempVariable.every(
      (item: { selected: any; }) => item.selected
    );

    console.log('Updated Selection:', this.selectedResellerCommIds_unpaid);
  }
 

  productCategoryList(data: any) {
    this.spinner.show();
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "nx32";
    api_req.api_url = "nx32/getNx32SerialNumber";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "nx32/getNx32SerialNumber";
    api_postUPd.off_set = list_data.offset;
    api_postUPd.limit_val = list_data.limit;
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.current_page = '';
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.show();
      if (response.status == true) {
       
       
        this.spinner.hide();
        this.unassignList = response.unassignlicenses;
        this.assignlicensesWithKeysList   = response.assignlicensesWithKeys;
       // console.log("this.assignlicensesWithKeysList",)
        this.bulklicensesWithoutKeys = response.bulklicensesWithoutKeys;
        this.licensesInApproval = response.licensesInApproval;

        this.response_total_cnt1=response.unassigntotalLicenses;
        this.response_total_cnt2=response.assigntotalLicensesWithKeys;
        this.response_total_cnt3=response.bulktotalLicensesWithoutKeys;
        this.response_total_cnt4=response.totalLicensesInApproval;

        if(this.clickstatusValue==0){
          this.tempVariablePagination=response.unassigntotalLicenses;
        }else if(this.clickstatusValue==1){
          this.tempVariablePagination=response.assigntotalLicensesWithKeys;
        }else if(this.clickstatusValue==2){
          this.tempVariablePagination=response.bulktotalLicensesWithoutKeys;
        }else{
          this.tempVariablePagination=response.totalLicensesInApproval;
        }
  
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': this.tempVariablePagination, 'page_limit': this.pageLimit });

      } else {
        iziToast.warning({
          message: "Loading Failed. Please try again",
          position: 'topRight'
        });

      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, Request fetch failed",
          position: 'topRight'
        });
        
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
  assignNotesSave(){

    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "nx32";
    api_req.api_url = "nx32/update_notes";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "update_notes";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.message_template = this.addNotesFormGroup.value.addNote;;
    api_postUPd.notes_id = this.notesLicenseID;
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
     
        this.spinner.hide();
        $('#addNotesFormID').modal('hide');
        iziToast.success({
          message: "Successfully Saved",
          position: 'topRight'
        });
        this.productCategoryList({});
      

      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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

  assignCustomer(){
    if(this.selectedResellerCommIds_unpaid.length>0){
      $('#addAssignCustomerFormID').modal('show');
    }else{
      iziToast.error({
        message: "Choose Atleast 1",
        position: 'topRight'
      });
    }
  }

  assignCustomerSave(){

      this.spinner.show();

      let api_req: any = new Object();
      let api_postUPd: any = new Object();
      api_req.moduleType = "nx32";
      api_req.api_url = "nx32/assignCustomer";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_postUPd.action = "assignCustomer";
  
      api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
      api_postUPd.customerId = this.customerID;
     // api_postUPd.checkedValues = this.selectedResellerCommIds_unpaid;this.checkedValuesLicense
     api_postUPd.checkedValues = this.checkedValuesLicense;
      api_req.element_data = api_postUPd;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        this.spinner.hide();
        if (response.status == true) {
          this.assignedCust=response.assigned_customer;
          $('#addAssignCustomerFormID').modal('hide');
          this.spinner.hide();
          iziToast.success({
            message: "Successfully Assigned to" +"-"+ this.assignedCust,
            position: 'center'
          });
          this.AssignCustomerFormGroup.reset();
          this.productCategoryList({});
          
        
  
        } else {
          iziToast.warning({
            message: "Failed. Please try again",
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
  getProductCategoryCode() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_master/getProductCategoryCode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getProductCategoryCode";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#addProductCategoryFormId').modal('show');
        this.spinner.hide();
        this.addProductCategory.patchValue({
          'add_ProductCategoryCode': response.product_category_code,
          
        });

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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
  view(product_category_id: any) {
    this.spinner.show();
    $('#viewProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category_management";
    api_req.api_url = "viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_category_id = product_category_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.viewProductCategory.patchValue({
          'view_ProductCategoryCode': response.data.product_category_code,
          'view_ProductCategoryName': response.data.product_category_name,
          'view_PurchasePrice': response.data.purchase_rate_per,
        });

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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
  edit(product_category_id: any) {
    this.spinner.show();
    $('#editProductCategoryFormId').modal('show');
    this.editproduct_category_id=product_category_id;
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.product_category_id = product_category_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.editApprovalStatus=response.data.status;
        this.editProductCategory.patchValue({
          'edit_ProductCategoryCode': response.data.product_category_code,
          'edit_ProductCategoryName': response.data.product_category_name,
          'edit_PurchasePrice': response.data.purchase_rate_per,
        });

      } else {
        iziToast.warning({
          message: "Failed. Please try again",
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
  Add() {
    this.spinner.show();
    $('#addProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "insertProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "insertProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    if (this.addProductCategory.value.add_ProductCategoryCode == null || this.addProductCategory.value.add_ProductCategoryCode == '') {
      iziToast.error({
        message: "Category Code Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.product_category_code = this.addProductCategory.value.add_ProductCategoryCode;
    }

    if (this.addProductCategory.value.add_ProductCategoryName == null || this.addProductCategory.value.add_ProductCategoryName == '') {
      iziToast.error({
        message: "Category Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.product_category_name = this.addProductCategory.value.add_ProductCategoryName;
    }
   

    if (this.addProductCategory.value.add_PurchasePrice == null || this.addProductCategory.value.add_PurchasePrice == '') {
      iziToast.error({
        message: "Purchase Price Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_postUPd.purchase_rate_per = this.addProductCategory.value.add_PurchasePrice;
    }
   
   
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#addProductCategoryFormId').modal('hide');
        this.productCategoryList({});
      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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
  search() {
    this.spinner.show();
    $('#searchProductCategoryFormId').modal('show');
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "viewProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_postUPd.product_category_id = product_category_id;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        $('#searchProductCategoryFormId').modal('hide');

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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
  update() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "updateProductDetails";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "updateProductDetails";

    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    // api_postUPd.product_category_id = product_category_id;
    api_postUPd.product_category_code = this.editProductCategory.value.edit_ProductCategoryCode;
    api_postUPd.product_category_name = this.editProductCategory.value.edit_ProductCategoryName;
    api_postUPd.purchase_rate_per = this.editProductCategory.value.edit_PurchasePrice;
    api_postUPd.product_category_id = this.editproduct_category_id;
    api_postUPd.status =   this.editApprovalStatus;
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $('#editProductCategoryFormId').modal('hide');
        this.spinner.hide();
        this.productCategoryList({});

      } else {
        iziToast.warning({
          message: "View List Loading Failed. Please try again",
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
  groupDelete() {

    if(this.selectedResellerCommIds_unpaid.length>0){
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
          let api_singleDelete: any = new Object();
          api_req.moduleType = "nx32";
          api_req.api_url = "nx32/deleteSerialNumber";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_singleDelete.action = "deleteSerialNumber";
          api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');
    
          api_singleDelete.license_id = this.selectedResellerCommIds_unpaid;
          api_req.element_data = api_singleDelete;
    
          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == "true") {
            
              // console.log("array content after delete", this.edit_array)
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
            } else {
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
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
      })
          
        }else{
          iziToast.error({
            message: "Choose Atleast 1",
            position: 'topRight'
          });
        }

    }
  delete(license_id: any) {
    const arrayValue = [license_id];
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
          let api_singleDelete: any = new Object();
          api_req.moduleType = "nx32";
          api_req.api_url = "nx32/deleteSerialNumber";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_singleDelete.action = "deleteSerialNumber";
          api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');

          api_singleDelete.license_id = arrayValue;
          api_req.element_data = api_singleDelete;

          this.serverService.sendServer(api_req).subscribe((response: any) => {
            if (response.status == "true") {
            
              // console.log("array content after delete", this.edit_array)
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
            } else {
              this.spinner.hide();
              iziToast.success({
                message: "Deleted Successfully",
                position: 'topRight'
              });
              this.productCategoryList({});
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
      })

    }

    save() {
    //  alert("into save")
      this.spinner.show();
      let api_req: any = new Object();
      let api_mulInvpay: any = new Object();
      api_req.moduleType = "nx32";
      api_req.api_url = "nx32/addSerialNumber"
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_mulInvpay.action = "addSerialNumber";
      api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
      var addr = this.addPI_section2.value.addresses;
  
  
      for (let i = 0; i < addr.length; i++) {
      var serialnumber=  $('#pd_SerialNumber' + i).val();
      var ordernumber=  $('#pd_Order' + i).val();
      var modelnumber=  $('#pd_ModelNumber' + i).val();

      if(serialnumber!='' && serialnumber!=null){
        addr[i].serial_number = $('#pd_SerialNumber' + i).val();
      }else{
        this.saveStatus=false;
        this.spinner.hide();
        iziToast.error({
          message: "Serial Number Missing",
          position: 'topRight'
        });
      }
        // console.log(addr[i].pd_quantity_txtbox1)
     
        addr[i].mac_no1 = $('#pd_WANAddress' + i).val();
        addr[i].mac_no2 = $('#pd_LANAddress1' + i).val();
        addr[i].mac_no3 = $('#pd_LANAddress2' + i).val();
        if(ordernumber!='' && ordernumber!=null){
          addr[i].order_no = $('#pd_Order' + i).val();
        }else{
          this.saveStatus=false;
          this.spinner.hide();
          iziToast.error({
            message: "Order Number Missing",
            position: 'topRight'
          });
        }
        if(modelnumber!='' && modelnumber!=null){
          addr[i].model_no = $('#pd_ModelNumber' + i).val();
        }else{
          this.saveStatus=false;
          this.spinner.hide();
          // return false;
          iziToast.error({
            message: "Model Number Missing",
            position: 'topRight'
          });
        }
        
        
       
      }
  if( this.saveStatus==true){
    api_mulInvpay.nx_data = addr;
  }else
  {
    this.spinner.hide();
    return false;
  
  }
   
  
  
  
      api_req.element_data = api_mulInvpay;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
       // alert("into save-service")
        if (response.status == true) {
        //  alert("into save-service-true condition")
          this.spinner.hide();
          $('#addSerialNoFormID').modal('hide');
          
          iziToast.success({
            message: "Saved Successfully",
            position: 'topRight'
          });
          location.reload();
  
        } else if(response.status == 'errors'){
          this.spinner.hide();
          iziToast.warning({
            message: "Data Already Exists",
            position: 'topRight'
          });
        }else {
          this.spinner.hide();
          iziToast.warning({
            message: "Data Already Saved",
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


    AssignLicensetoSerial(license_id: any) {
      const arrayValue = [license_id];
        Swal.fire({
          title: 'Are you sure you want to Assign License to this Serial number?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Assign it!'
        }).then((result: any) => {
          if (result.value) {
            this.spinner.show();
            let api_req: any = new Object();
            let api_singleDelete: any = new Object();
            api_req.moduleType = "nx32";
            api_req.api_url = "nx32/assignLicense";
            api_req.api_type = "web";
            api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
            api_singleDelete.action = "assignLicense";
            api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');
  
            api_singleDelete.license_id = license_id;
            api_req.element_data = api_singleDelete;
  
            this.serverService.sendServer(api_req).subscribe((response: any) => {
              if (response.status == true) {
              
                // console.log("array content after delete", this.edit_array)
                this.spinner.hide();
                iziToast.success({
                  message: "License Assigned Successfully",
                  position: 'topRight'
                });
                this.productCategoryList({});
              } else {
                this.spinner.hide();
                iziToast.error({
                  message: "License Assign Failed",
                  position: 'topRight'
                });
               
                this.productCategoryList({});
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
        })
  
      }
      UnAssignCustomerSingle(license_id: any) {
        const arrayValue = [license_id];
          Swal.fire({
            title: 'Are you sure you want to Unassign Customer?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Un-Assign it!'
          }).then((result: any) => {
            if (result.value) {
              this.spinner.show();
              let api_req: any = new Object();
              let api_singleDelete: any = new Object();
              api_req.moduleType = "nx32";
              api_req.api_url = "nx32/unassignCustomer";
              api_req.api_type = "web";
              api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
              api_singleDelete.action = "unassignCustomer";
              api_singleDelete.user_id = localStorage.getItem('erp_c4c_user_id');
    
              api_singleDelete.license_id = license_id;
              api_req.element_data = api_singleDelete;
    
              this.serverService.sendServer(api_req).subscribe((response: any) => {
                if (response.status == true) {
                
                  // console.log("array content after delete", this.edit_array)
                  this.spinner.hide();
                  iziToast.success({
                    message: "Un- Assigned Successfully",
                    position: 'topRight'
                  });
                  this.productCategoryList({});
                } else {
                  this.spinner.hide();
                  iziToast.error({
                    message: "Customer Un-Assigned Failed",
                    position: 'topRight'
                  });
                 
                  this.productCategoryList({});
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
          })
    
        }


  


}
