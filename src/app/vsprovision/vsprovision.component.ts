import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-vsprovision',
  templateUrl: './vsprovision.component.html',
  styleUrls: ['./vsprovision.component.css']
})
export class VsprovisionComponent implements OnInit {
  vsprovision_list: any;
  googleAuthentication_status: boolean = false;
  vsView: boolean;
  viewConnectionType: any;
  viewDate: any;
  viewTypeofPhone: any;
  viewMacAddress: any;
  viewDIDNO: any;
  viewLabelName: any;
  viewAccountName: any;
  viewUsername: any;
  viewPassword: any;
  //edit
  editVSProvisionForm: FormGroup;
  //add
  addVSProvisionForm: FormGroup;
  isReadOnly: boolean = false;
  radioSelected: boolean = false;
  DIDNoList: any;
  phoneTypeList: any;
  companyList: any;
  billerList: any;
  phoneEntryTypes: any;
  customerStatusEdit: number;
  phoneEntryType_ChangeValue: any;
  DIDNoSelect_ChangeValue: any;
  DIDNoList1: any;

  //bill code form array
  public addresses: FormArray;
  billCodeAddForm1: FormGroup;


  //primary code form array
  billCodeAddForm2: FormGroup;
  public addressesprimary: FormArray;


  //GoogleAuthentication
  GoogleAuthenticationForm: FormGroup;
  //comment
  commentFormGroup: FormGroup;
  customerIdComment: any;
  //file attachment
  fileAttach_quotationID: any;
  FileAttachmentForm: FormGroup;
  getFileAttachmentResult: any;
  myFiles: string[] = [];
  edit_array: any = [];
  checkbox_value_file: any;
  groupSelectCommonId: any;
  commonAttachmentID: any;
  checkboxAdding: any = [];
  customerIdFile: any;
  editDIDNoSelect: any;
  customerIdy: any;
  DIDNoSelect_EditValue: any;
  statusEdit: any;
  DIDStatusValue: any;
  //billcode edit
  public billcodeSection: FormGroup;
  public addresses1: FormArray;
  //primary edit
  public primaryEditSection: FormGroup;
  public addresses5: FormArray;
  // Search
  searchVSForm: FormGroup;
  searchResult_CustomerID: any;
  searchResult_CustomerName: any;
  searchResult: any;
  searchText_ID: any;
  searchText_Name: any;
  searchTextResult: any;
 



  constructor(private serverService: ServerService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.billCodeAddForm1 = this.fb.group({
      addresses: this.fb.array([this.addBillCode_FormControl()])
    });

    this.billCodeAddForm2 = this.fb.group({
      addressesprimary: this.fb.array([this.addBillCodePrimary_FormControl()])
    });
    this.billcodeSection = this.fb.group({
      addresses1: this.fb.array([this.createAddress1()])
    });
    this.primaryEditSection = this.fb.group({
      addresses5: this.fb.array([this.createAddress5()])
    });



  }
  keywordCompanyName = 'customerName';
  keywordSearchText = 'search_name';
  ngOnInit(): void {
  
    this.GoogleAuthenticationForm = new FormGroup({
      'google_AuthenticationCode': new FormControl(null),
    });
      
    const authDataRaw = localStorage.getItem('google_auth');
    if (authDataRaw) {
      const authData = JSON.parse(authDataRaw);
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - authData.timestamp) / 1000; // in seconds

      if (authData.status && elapsedTime < 600) {
        this.googleAuthentication_status = true;
        this.spinner.show();
        this.add_LoadData();         // Optional: if you want to preload data on reload
        this.vsprovisionList();      // Optional: preload VSP list
      } else {
        this.spinner.show();
        localStorage.removeItem('google_auth');
        this.googleAuthentication_status = false;
     
      }
    }
    // $('#GoogleAuthenticationVSPFormId').modal('show');

    this.add_LoadData();
    this.vsprovisionList();
    // this.customerStatusEdit=3;
    this.phoneEntryType_ChangeValue = 1;
    this.DIDNoSelect_ChangeValue = 1;
    this.addVSProvisionForm = new FormGroup({
      'connectionType': new FormControl(),
      'VSP_addBillerName': new FormControl(),
      'VSP_addCompanyName': new FormControl(),
      'VSP_addDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'VSP_addTypePhone': new FormControl(null),
      'VSP_addPhoneEntryType': new FormControl(null),

      // 'VSP_addPhoneEntryType': new FormControl(this.abc()),

      'VSP_addHostedPBX': new FormControl(null),
      'VSP_addReseller': new FormControl(null),
      'VSP_addSIPTrunk': new FormControl(null),
      'VSP_addMACAddress': new FormControl(null),
      'VSP_addDIDNo': new FormControl(null),
      'VSP_addLabelName': new FormControl(null),
      'VSP_addAccountName': new FormControl(null),
      'VSP_addUserName': new FormControl(null),
      'VSP_addPassword': new FormControl(null),
      'VSP_addMasterAccount': new FormControl(null),
      'VSP_addMasterPassword': new FormControl(null),
      'VSP_addDIDNoRange': new FormControl(null),
      'VSP_addAuto': new FormControl(null),
      'VSP_addManually': new FormControl(null),
      'VSP_addDIDNoSelect': new FormControl(null),

    });
    this.editVSProvisionForm = new FormGroup({

      'VSP_editBillerName': new FormControl(),
      'VSP_editCompanyName': new FormControl(),
      'VSP_editDate': new FormControl(),
      'VSP_editTypePhone': new FormControl(null),
      'VSP_editPhoneEntryType': new FormControl(null),

      // 'VSP_addPhoneEntryType': new FormControl(this.abc()),

      'VSP_editHostedPBX': new FormControl(null),
      'VSP_editReseller': new FormControl(null),
      'VSP_editSIPTrunk': new FormControl(null),
      'VSP_editMACAddress': new FormControl(null),
      'VSP_editDIDNo': new FormControl(null),
      'VSP_editLabelName': new FormControl(null),
      'VSP_editAccountName': new FormControl(null),
      'VSP_editUserName': new FormControl(null),
      'VSP_editPassword': new FormControl(null),
      'VSP_editMasterAccount': new FormControl(null),
      'VSP_editMasterPassword': new FormControl(null),
      'VSP_editDIDNoRange': new FormControl(null),
      'VSP_editAuto': new FormControl(null),
      'VSP_editManually': new FormControl(null),
      'VSP_editDIDNoSelect': new FormControl(null),
      'VSP_status': new FormControl(null),

    });
    this.commentFormGroup = new FormGroup({
      'username': new FormControl(null),
      'comments': new FormControl(null),
    });
    this.FileAttachmentForm = new FormGroup({
      'file': new FormControl(null),
    });
    this.searchVSForm = new FormGroup({
      'Vs_company_Name': new FormControl(null),
      'VS_searchText': new FormControl(null)

    })


  }
  get addressControls() {
    return this.billCodeAddForm1.get('addresses') as FormArray
  }

  addBillCode_FormControl(): FormGroup {
    return this.fb.group({

      billCodeName: '',
      bill_code_740: '',
      bill_code_kl: '',
      bill_code_750: '',
      bill_code_JP: '',
      bill_code_sg: '',
      bill_code_750_8: '',

    });

  }

  addBillCode(): void {

    this.addresses = this.billCodeAddForm1.get('addresses') as FormArray;
    this.addresses.push(this.addBillCode_FormControl());

  }



  removeBillCode(i: number) {
    this.addresses.removeAt(i);

  }



  get addressControlsprimary() {
    return this.billCodeAddForm2.get('addressesprimary') as FormArray
  }
  addBillCodePrimary_FormControl(): FormGroup {
    return this.fb.group({

      bill_code_740Pbx: '',
      bill_code_740Retail: '',
      bill_code_750Pbx: '',
      bill_code_750Retail: '',
      bill_code_sgPbx: '',
      bill_code_sgRetail: '',
      bill_code_klPbx: '',
      bill_code_klRetail: '',
      bill_code_JPPbx: '',
      bill_code_JPRetail: '',
      bill_code_Pbxlow: '',
      bill_code_PbxHigh: '',
      bill_code_Retaillow: '',
      bill_code_RetailHigh: '',
      customer_bill_code_id_pr: '',

    });

  }
  addBillCodePrimary(): void {

    this.addressesprimary = this.billCodeAddForm2.get('addressesprimary') as FormArray;
    this.addressesprimary.push(this.addBillCodePrimary_FormControl());

  }
  removeBillCodePrimary(i: number) {
    this.addressesprimary.removeAt(i);
  }

  addAddress1(): void {
    this.addresses1 = this.billcodeSection.get('addresses1') as FormArray;
    this.addresses1.push(this.createAddress1());
  }
  createAddress1(): FormGroup {
    return this.fb.group({
      e_billCodeName: '',
      e_bill_code_740: '',
      e_bill_code_kl: '',
      e_bill_code_750: '',
      e_bill_code_JP: '',
      e_bill_code_sg: '',
      e_bill_code_750_8: '',
    });
  }
  get addressControls1() {
    return this.billcodeSection.get('addresses1') as FormArray
  }
  removeBillCode1(i: number) {
    this.addresses1.removeAt(i);
  }


  addAddress5(): void {
    this.addresses5 = this.primaryEditSection.get('addresses5') as FormArray;
    this.addresses5.push(this.createAddress5());
  }
  createAddress5(): FormGroup {
    return this.fb.group({
      e_bill_code_740Pbx: '',
      e_bill_code_740Retail: '',
      e_bill_code_750Pbx: '',
      e_bill_code_750Retail: '',
      e_bill_code_sgPbx: '',
      e_bill_code_sgRetail: '',
      e_bill_code_klPbx: '',
      e_bill_code_klRetail: '',
      e_bill_code_JPPbx: '',
      e_bill_code_JPRetail: '',
      e_bill_code_Pbxlow: '',
      e_bill_code_PbxHigh: '',
      e_bill_code_Retaillow: '',
      e_bill_code_RetailHigh: '',
      e_customer_bill_code_id_pr: '',
    });
  }
  get addressControls5() {
    return this.primaryEditSection.get('addresses5') as FormArray
  }
  removeBillCode5(i: number) {
    this.addresses5.removeAt(i);
  }



  addVSProvisionGo() {
    $('#addVSProvisionFormId').modal('show');

  }
  searchVSProvisionGo() {
    $('#searchVSProvisionFormId').modal('show');
  }

  userPermission(phone_provision_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

        let api_req: any = new Object();
        let contractNameDelete_req: any = new Object();
        api_req.moduleType = "vsprovision";
        api_req.api_url = "vsprovision/provision_update_status";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        contractNameDelete_req.action = "vsprovision/provision_update_status";
        contractNameDelete_req.phone_provision_id = phone_provision_id;
        contractNameDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = contractNameDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: "Provision Updated successfully",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
          else {
            iziToast.error({
              message: "Provision not Updated ",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }

  deleteGuru(phone_provision_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {

        let api_req: any = new Object();
        let contractNameDelete_req: any = new Object();
        api_req.moduleType = "vsprovision";
        api_req.api_url = "vsprovision/deleteVSProvision";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        contractNameDelete_req.action = "vsprovision/deleteVSProvision";
        contractNameDelete_req.phone_provision_id = phone_provision_id;
        contractNameDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = contractNameDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: "Deleted successfully",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
          else {
            iziToast.error({
              message: "Delete Failed ",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }
  deleteAllVSP(customerID: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {

        let api_req: any = new Object();
        let contractNameDelete_req: any = new Object();
        api_req.moduleType = "vsprovision";
        api_req.api_url = "vsprovision/deleteVSProvisioncustomer";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        contractNameDelete_req.action = "vsprovision/deleteVSProvisioncustomer";
        contractNameDelete_req.customerId = customerID;
        contractNameDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        api_req.element_data = contractNameDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: "Deleted successfully",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
          else {
            iziToast.error({
              message: "Delete Failed ",
              position: 'topRight'
            });
            this.vsprovisionList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })

  }
  phoneEntryType_Change(event: any, phone_entry_type_id: any) {
    this.phoneEntryType_ChangeValue = phone_entry_type_id;
    console.log("this.phoneEntryType_ChangeValue", this.phoneEntryType_ChangeValue)

  }
  DIDNoSelect_Change(event: any, did_selection: any) {
    this.DIDNoSelect_ChangeValue = did_selection;
    console.log("this.DIDNoSelect_ChangeValue", this.DIDNoSelect_ChangeValue)

  }
  DIDNoSelect_Changeedit(event: any, did_selection: any) {
    this.DIDNoSelect_EditValue = did_selection;
    console.log("this.DIDNoSelect_EditValue", this.DIDNoSelect_EditValue)

  }
  DIDStatus_Change(event: any, did_selection: any) {
    this.DIDStatusValue = did_selection;
    console.log("this.DIDStatusValue", this.DIDStatusValue)

  }
  hosted_Change(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log('Radio button changed:', inputElement.value);
    this.radioSelected = true;
    // Add your logic here
  }
  clearHost() {

    this.radioSelected = false;
    this.addVSProvisionForm.reset();
  }
  abc() {
    const selectedEntry = this.phoneEntryTypes.find((x: { selected: string; }) => x.selected === "Yes")
    const selectedPhoneEntryType = selectedEntry ? selectedEntry.phone_entry_type_id : null;
    console.log("selectedPhoneEntryType", selectedPhoneEntryType)
    this.customerStatusEdit = selectedPhoneEntryType;
    console.log("this.customerStatusEdit", this.customerStatusEdit)
    return this.customerStatusEdit;
  }
  getDIDNo(event: any) {
    this.spinner.show();

    this.customerIdy = event.target.value;


    console.log("this.customerIdy", this.customerIdy)
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/getdidNos";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/getdidNos";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.customerId = this.customerIdy;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response.status == true) {
        this.DIDNoList1 = response.datas;


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  getDIDNo1(customerid: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/getdidNos";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/getdidNos";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.customerId = customerid;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response.status == true) {
        this.DIDNoList1 = response.datas;


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  ChangeBiller(event: any) {
    this.spinner.show();
    let billerIdy = event.target.value;
    console.log("billerIdy", billerIdy)
    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/getVSCustomers";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/getVSCustomers";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.billerId = billerIdy;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response.status == true) {
        this.companyList = response.cusData;


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  add_LoadData() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/vsprovisionMasters";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/vsprovisionMasters";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.billerId = null;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.billerList = response.biller;
        this.companyList = response.customer;
        this.phoneTypeList = response.phoneType;
        this.phoneTypeList = response.phoneType;
        this.phoneEntryTypes = response.entryType;
        this.DIDNoList = response.did_no_type;
        this.customerStatusEdit = response.default_entryType;
        this.statusEdit = response.statusData;
        // const selectedEntry=this.phoneEntryTypes.find((x: { selected: string; })=>x.selected==="Yes")
        // const selectedPhoneEntryType = selectedEntry ? selectedEntry.phone_entry_type_id : null;
        // console.log("selectedPhoneEntryType",selectedPhoneEntryType)
        // this.customerStatusEdit=selectedPhoneEntryType;
        // console.log("this.customerStatusEdit",this.customerStatusEdit)
        this.addVSProvisionForm.patchValue({
          'VSP_addBillerName': response.default_biller,
          'VSP_addTypePhone': response.default_phoneType,
          'VSP_addPhoneEntryType': response.default_entryType,
          'VSP_addDIDNoSelect': response.default_did_no_types,

        });

      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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

  edit(phone_provision_id: any) {
    this.spinner.show();
    $('#editVSProvisionFormId').modal('show');
    let api_req: any = new Object();
    let api_editPI_req: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/editVsProvisioning";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_editPI_req.action = "vsprovision/editVsProvisioning";
    api_editPI_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_editPI_req.phone_provision_id = phone_provision_id;
    api_req.element_data = api_editPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.spinner.hide();
        this.DIDNoSelect_EditValue = response.data.did_selection;
        this.customerIdy = response.data.customer_id;
        this.getDIDNo1(this.customerIdy);

        this.editVSProvisionForm.patchValue({
          'VSP_editBillerName': response.data.billerId,
          'VSP_editCompanyName': response.data.customer_id,
          'VSP_editDate': response.data.phone_provision_date,
          'VSP_editTypePhone': response.data.phone_type,
          'VSP_editPhoneEntryType': response.data.phone_entry_type,
          'VSP_editMACAddress': response.data.mac_address_1,

          'VSP_editLabelName': response.data.label_name_1,
          'VSP_editAccountName': response.data.account_name_1,

          'VSP_editDIDNoSelect': response.data.did_selection,
          'VSP_editDIDNoRange': response.data.did_no_range,
          'VSP_editDIDNo': response.data.did_name_1,

          'VSP_editUserName': response.data.username_1,
          'VSP_editPassword': response.data.password_1,
          'VSP_editMasterAccount': response.data.master_account,
          'VSP_editMasterPassword': response.data.master_password,
          'VSP_status': response.data.status,


          // 'VSP_editAuto': response.data.account_active_state,
          // 'VSP_editManually': response.data.account_active_state,
          //   'VSP_editHostedPBX': response.data.account_active_state,
          // 'VSP_editReseller': response.data.account_active_state,
          // 'VSP_editSIPTrunk': response.data.account_active_state,
        });
        const editaddresses = this.billcodeSection.get('addresses1') as FormArray;
        console.log("editaddresses", editaddresses); // Ensure it's at least 
        console.log(editaddresses.length); // Ensure it's at least 
        const formArray = new FormArray([]);
        for (let index = 0; index < response.billDatas.length; index++) {
          console.log("response.billDatas", response.billDatas)
          formArray.push(this.fb.group({
            "e_billCodeName": response.billDatas[index].bill_code_name,
            "e_bill_code_740": response.billDatas[index].bill_code_740,
            "e_bill_code_kl": response.billDatas[index].bill_code_kl,
            "e_bill_code_750": response.billDatas[index].bill_code_750,
            "e_bill_code_JP": response.billDatas[index].bill_code_jp,
            "e_bill_code_sg": response.billDatas[index].bill_code_sg,
            "e_bill_code_750_8": response.billDatas[index].bill_code_750_8,
          })
          );
        }
        //  console.log(formArray)
        this.billcodeSection.setControl('addresses1', formArray);
        console.log("addresses1-formArray", formArray)


        const editaddresses2 = this.primaryEditSection.get('addresses5') as FormArray;
        console.log("editaddresses2", editaddresses2); // Ensure it's at least 
        console.log(editaddresses2.length); // Ensure it's at least 
        const formArray2 = new FormArray([]);
        for (let index = 0; index < response.primaryDatas.length; index++) {
          console.log("response.billDatas", response.primaryDatas)
          formArray2.push(this.fb.group({
            "e_bill_code_740Pbx": response.primaryDatas[index].pbx_threshold_limit_740,
            "e_bill_code_740Retail": response.primaryDatas[index].primary_code_retail_740,
            "e_bill_code_750Pbx": response.primaryDatas[index].pbx_threshold_limit_750,
            "e_bill_code_750Retail": response.primaryDatas[index].primary_code_retail_750,
            "e_bill_code_sgPbx": response.primaryDatas[index].pbx_threshold_limit_sg,
            "e_bill_code_sgRetail": response.primaryDatas[index].primary_code_retail_sg,
            "e_bill_code_klPbx": response.primaryDatas[index].pbx_threshold_limit_kl,
            "e_bill_code_klRetail": response.primaryDatas[index].primary_code_retail_kl,
            "e_bill_code_JPPbx": response.primaryDatas[index].pbx_threshold_limit_740,
            "e_bill_code_JPRetail": response.primaryDatas[index].primary_code_retail_jp,
            "e_bill_code_Pbxlow": response.primaryDatas[index].low_credit,
            "e_bill_code_PbxHigh": response.primaryDatas[index].high_credit,
            "e_bill_code_Retaillow": response.primaryDatas[index].retail_low_credit,
            "e_bill_code_RetailHigh": response.primaryDatas[index].retail_high_credit,
            "e_customer_bill_code_id_pr": response.primaryDatas[index].customer_bill_code_id,
          })
          );
        }

        this.primaryEditSection.setControl('addresses5', formArray2);
        console.log("addresses1-formArray", formArray2)


      }
    }),
      (error: any) => {
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        }); this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      }

    this.spinner.hide();



  }
  updateVSProvision() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/updatevsprovision";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/updatevsprovision";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    var VSP_editBillerName = this.editVSProvisionForm.value.VSP_editBillerName;

    if (VSP_editBillerName == null || VSP_editBillerName == '' || VSP_editBillerName == '0') {
      iziToast.error({
        message: "Biller ID Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.billerId = this.editVSProvisionForm.value.VSP_editBillerName;
    }

    var VSP_editCompanyName = this.editVSProvisionForm.value.VSP_editCompanyName;
    if (VSP_editCompanyName == null || VSP_editCompanyName == '' || VSP_editCompanyName == '0') {
      iziToast.error({
        message: "Company Details Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.customer_id = this.editVSProvisionForm.value.VSP_editCompanyName;
    }

    var VSP_editDate = this.editVSProvisionForm.value.VSP_editDate;
    if (VSP_editDate == null || VSP_editDate == '' || VSP_editDate == '0') {
      iziToast.error({
        message: "Date Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.phone_provision_date = this.editVSProvisionForm.value.VSP_editDate;
    }




    api_getReseller.phone_type = this.editVSProvisionForm.value.VSP_editTypePhone;
    api_getReseller.phone_entry_type = this.editVSProvisionForm.value.VSP_editPhoneEntryType;
    var VSP_editMACAddress = this.editVSProvisionForm.value.VSP_editMACAddress;
    if (VSP_editMACAddress == null || VSP_editMACAddress == '' || VSP_editMACAddress == '0') {
      iziToast.error({
        message: "MAC Address Details Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.mac_address = this.editVSProvisionForm.value.VSP_editMACAddress;
    }
    api_getReseller.did_name_1 = this.editVSProvisionForm.value.VSP_editDIDNo;
    api_getReseller.DIDNoRange = this.editVSProvisionForm.value.VSP_editDIDNoRange;


    if (this.DIDNoSelect_EditValue != 1) {
      var VSP_editDIDNo = this.editVSProvisionForm.value.VSP_editDIDNo;
      if (VSP_editDIDNo == null || VSP_editDIDNo == '' || VSP_editDIDNo == '0') {
        iziToast.error({
          message: "DID Number Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;
      } else {
        api_getReseller.did_name_1 = this.editVSProvisionForm.value.VSP_editDIDNo;
      }
    } else {

      var VSP_editDIDNoRange = this.editVSProvisionForm.value.VSP_editDIDNoRange;
      if (VSP_editDIDNoRange == null || VSP_editDIDNoRange == '' || VSP_editDIDNoRange == '0') {
        iziToast.error({
          message: "DID Number Range Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;
      } else {
        api_getReseller.DIDNoRange = this.editVSProvisionForm.value.VSP_editDIDNoRange;
      }
    }


    api_getReseller.master_account = this.editVSProvisionForm.value.VSP_editMasterAccount;
    api_getReseller.master_password = this.editVSProvisionForm.value.VSP_editMasterPassword;

    var VSP_editLabelName = this.editVSProvisionForm.value.VSP_editLabelName;
    if (VSP_editLabelName == null || VSP_editLabelName == '' || VSP_editLabelName == '0') {
      iziToast.error({
        message: "Label Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.label_name_1 = this.editVSProvisionForm.value.VSP_editLabelName;
    }

    var VSP_editAccountName = this.editVSProvisionForm.value.VSP_editAccountName;
    if (VSP_editAccountName == null || VSP_editAccountName == '' || VSP_editAccountName == '0') {
      iziToast.error({
        message: "Account Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.account_name_1 = this.editVSProvisionForm.value.VSP_editAccountName;
    }

    var VSP_editUserName = this.editVSProvisionForm.value.VSP_editUserName;
    if (VSP_editUserName == null || VSP_editUserName == '' || VSP_editUserName == '0') {
      iziToast.error({
        message: "User Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {

      api_getReseller.username_1 = this.editVSProvisionForm.value.VSP_editUserName;
    }

    var VSP_editPassword = this.editVSProvisionForm.value.VSP_editPassword;
    if (VSP_editPassword == null || VSP_editPassword == '' || VSP_editPassword == '0') {
      iziToast.error({
        message: "Password Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {

      api_getReseller.password_1 = this.editVSProvisionForm.value.VSP_editPassword;
    }

    api_getReseller.DIDNoSelect = this.editVSProvisionForm.value.VSP_editDIDNoSelect;



    // section - 2

    var addr3 = this.billcodeSection.value.addresses1;
    for (let i = 0; i < addr3.length; i++) {
      addr3[i].billCodeName = $('#e_billCodeName' + i).val();
      addr3[i].bill_code_740 = $('#e_bill_code_740' + i).val();
      addr3[i].bill_code_kl = $('#e_bill_code_kl' + i).val();
      addr3[i].bill_code_750 = $('#e_bill_code_750' + i).val();
      addr3[i].bill_code_JP = $('#e_bill_code_JP' + i).val();
      addr3[i].bill_code_sg = $('#e_bill_code_sg' + i).val();
      addr3[i].bill_code_750_8 = $('#e_bill_code_750_8' + i).val();
    }
    api_getReseller.billcode_values = addr3;

    // section - 3
    var addr4 = this.primaryEditSection.value.addresses5;
    for (let i = 0; i < addr4.length; i++) {
      addr4[i].bill_code_740Pbx = $('#e_bill_code_740Pbx' + i).val();
      addr4[i].bill_code_740Retail = $('#e_bill_code_740Retail' + i).val();
      addr4[i].bill_code_750Pbx = $('#e_bill_code_750Pbx' + i).val();
      addr4[i].bill_code_750Retail = $('#e_bill_code_750Retail' + i).val();
      addr4[i].bill_code_sgPbx = $('#e_bill_code_sgPbx' + i).val();
      addr4[i].bill_code_sgRetail = $('#e_bill_code_sgRetail' + i).val();
      addr4[i].bill_code_klPbx = $('#e_bill_code_klPbx' + i).val();
      addr4[i].bill_code_klRetail = $('#e_bill_code_klRetail' + i).val();
      addr4[i].bill_code_JPPbx = $('#e_bill_code_JPPbx' + i).val();
      addr4[i].bill_code_JPRetail = $('#e_bill_code_JPRetail' + i).val();
      addr4[i].bill_code_Pbxlow = $('#e_bill_code_Pbxlow' + i).val();
      addr4[i].bill_code_PbxHigh = $('#e_bill_code_PbxHigh' + i).val();
      addr4[i].bill_code_Retaillow = $('#e_bill_code_Retaillow' + i).val();
      addr4[i].bill_code_RetailHigh = $('#e_bill_code_RetailHigh' + i).val();
      addr4[i].customer_bill_code_id_pr = $('#e_customer_bill_code_id_pr' + i).val();
    }
    api_getReseller.primarycode_values = addr4;


    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();

        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
        $('#editVSProvisionFormId').modal('hide');

      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Update Failed. Please try again",
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

  file(customerId: any) {
    this.spinner.show();
    $('#fileAttachmentFormId_vsp').modal('show');
    this.customerIdFile = customerId;

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/provision_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/provision_attachment_details";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.customerId = customerId;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {



      if (response.status == true) {
        this.spinner.hide();
        this.getFileAttachmentResult = response.inv_attachment_details;
        this.edit_array = this.getFileAttachmentResult
          .filter((file: { status: number; }) => file.status === 1)
          .map((file: { attachment_file_id: any; }) => file.attachment_file_id);
        console.log("this.edit_array", this.edit_array);


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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

  CommentsView(customerId: any) {
    this.spinner.show();
    $('#commentVSProvisionFormId').modal('show');
    this.customerIdComment = customerId;

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/getProvisionComments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/getProvisionComments";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.customerId = customerId;
    api_getReseller.vs_provisioning_command = this.commentFormGroup.value.comments;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response.status == true) {
        this.spinner.hide();
        this.commentFormGroup.patchValue({
          'username': response.userName,
          'comments': response.vs_provisioning_command,
        });




      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  saveComments() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/provision_comments";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/provision_comments";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.customerId = this.customerIdComment;
    api_getReseller.vs_provisioning_command = this.commentFormGroup.value.comments;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        iziToast.success({
          message: "Comments Saved Successfully",
          position: 'topRight'
        });
        $('#commentVSProvisionFormId').modal('hide');
      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  view(phone_provision_id: any) {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/viewProvision";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "viewProvision";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.phone_provision_id = phone_provision_id;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();
        this.viewConnectionType = response[0].phone_connection_type;
        this.viewDate = response[0].date;
        this.viewTypeofPhone = response[0].phone_type_name;
        this.viewMacAddress = response[0].mac_address;
        this.viewDIDNO = response[0].did_name_1;
        this.viewLabelName = response[0].label_name_1;
        this.viewAccountName = response[0].account_name_1;
        this.viewUsername = response[0].username_1;
        this.viewPassword = response[0].password_1;
        $('#viewVSProvisionFormId').modal('show');


      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  vsprovisionList() {
    $('#GoogleAuthenticationGuruFormId').modal('hide');
    $('#searchGuruFormId').modal('hide');

    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "soa";
    api_req.api_url = "vsprovision/vsProvisionList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/vsProvisionList";

    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    api_getReseller.search_text = this.searchText_Name;
    api_getReseller.customer_name = this.searchResult_CustomerName;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.spinner.hide();
      if (response != '') {
        this.vsprovision_list = response.data;
        if(response.data.length==0){
          this.vsView=true;
        }

        this.spinner.hide();
        $('#searchVSProvisionFormId').modal('hide');

      } else {


        iziToast.warning({
          message: "Details not displayed. Please try again",
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

  GoogleAuthenticationValidation() {

    this.spinner.show();

    let api_req: any = new Object();
    let api_googleAuthVali: any = new Object();
    api_req.moduleType = "guru";
    api_req.api_url = "vsprovision/google_auth_check";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_googleAuthVali.action = "vsprovision/google_auth_check";
    api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');

    api_googleAuthVali.auth_code = this.GoogleAuthenticationForm.value.google_AuthenticationCode;
    api_req.element_data = api_googleAuthVali;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        $(document).ready(function () {
          $("#showhide").show();
        });

        this.googleAuthentication_status = response.status;
        // Store status and timestamp in localStorage
        const authData = {
          status: true,
          timestamp: new Date().getTime()
        };
        localStorage.setItem('google_auth', JSON.stringify(authData));
        console.log(" this.googleAuthentication_status", this.googleAuthentication_status);
        if (this.googleAuthentication_status == true) {
          this.add_LoadData();
          this.vsprovisionList();
        }


        iziToast.success({
          message: "Google Authentication Success",
          position: 'topRight'

        });
        $('#GoogleAuthenticationVSPFormId').modal("hide");


      } else {

        // $('#GoogleAuthenticationVSPFormId').modal("hide");
        iziToast.warning({
          message: "Invalid Google Authentication. Please try again",
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

  saveVSProvision() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_getReseller: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/addvsprovision";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getReseller.action = "vsprovision/addvsprovision";
    api_getReseller.user_id = localStorage.getItem('erp_c4c_user_id');
    var VSP_addBillerName = this.addVSProvisionForm.value.VSP_addBillerName;
    if (VSP_addBillerName == null || VSP_addBillerName == '' || VSP_addBillerName == '0') {
      iziToast.error({
        message: "Biller ID Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.billerId = this.addVSProvisionForm.value.VSP_addBillerName;
    }

    var VSP_addCompanyName = this.addVSProvisionForm.value.VSP_addCompanyName;
    if (VSP_addCompanyName == null || VSP_addCompanyName == '' || VSP_addCompanyName == '0') {
      iziToast.error({
        message: "Company Details Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.customer_id = this.addVSProvisionForm.value.VSP_addCompanyName;
    }

    api_getReseller.phone_provision_date = this.addVSProvisionForm.value.VSP_addDate;
    api_getReseller.phone_type = this.addVSProvisionForm.value.VSP_addTypePhone;
    api_getReseller.phone_entry_type = this.addVSProvisionForm.value.VSP_addPhoneEntryType;

    var VSP_addMACAddress = this.addVSProvisionForm.value.VSP_addMACAddress;
    if (VSP_addMACAddress == null || VSP_addMACAddress == '' || VSP_addMACAddress == '0') {
      iziToast.error({
        message: "MAC Address Details Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.mac_address = this.addVSProvisionForm.value.VSP_addMACAddress;
    }


    api_getReseller.master_account = this.addVSProvisionForm.value.VSP_addMasterAccount;
    api_getReseller.master_password = this.addVSProvisionForm.value.VSP_addMasterPassword;
    if (this.DIDNoSelect_ChangeValue == 1) {
      var VSP_addDIDNo = this.addVSProvisionForm.value.VSP_addDIDNo;
      if (VSP_addDIDNo == null || VSP_addDIDNo == '' || VSP_addDIDNo == '0') {
        iziToast.error({
          message: "DID Number Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;
      } else {
        api_getReseller.did_name_1 = this.addVSProvisionForm.value.VSP_addDIDNo;
      }
    } else {

      var VSP_addDIDNoRange = this.addVSProvisionForm.value.VSP_addDIDNoRange;
      if (VSP_addDIDNoRange == null || VSP_addDIDNoRange == '' || VSP_addDIDNoRange == '0') {
        iziToast.error({
          message: "DID Number Range Missing",
          position: 'topRight'
        });
        this.spinner.hide();
        return false;
      } else {
        api_getReseller.DIDNoRange = this.addVSProvisionForm.value.VSP_addDIDNoRange;
      }
    }


    var VSP_addLabelName = this.addVSProvisionForm.value.VSP_addLabelName;
    if (VSP_addLabelName == null || VSP_addLabelName == '' || VSP_addLabelName == '0') {
      iziToast.error({
        message: "Label Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.label_name_1 = this.addVSProvisionForm.value.VSP_addLabelName;
    }

    var VSP_addAccountName = this.addVSProvisionForm.value.VSP_addAccountName;
    if (VSP_addAccountName == null || VSP_addAccountName == '' || VSP_addAccountName == '0') {
      iziToast.error({
        message: "Account Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {
      api_getReseller.account_name_1 = this.addVSProvisionForm.value.VSP_addAccountName;
    }

    var VSP_addUserName = this.addVSProvisionForm.value.VSP_addUserName;
    if (VSP_addUserName == null || VSP_addUserName == '' || VSP_addUserName == '0') {
      iziToast.error({
        message: "User Name Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {

      api_getReseller.username_1 = this.addVSProvisionForm.value.VSP_addUserName;
    }

    var VSP_addPassword = this.addVSProvisionForm.value.VSP_addPassword;
    if (VSP_addPassword == null || VSP_addPassword == '' || VSP_addPassword == '0') {
      iziToast.error({
        message: "Password Missing",
        position: 'topRight'
      });
      this.spinner.hide();
      return false;
    } else {

      api_getReseller.password_1 = this.addVSProvisionForm.value.VSP_addPassword;
    }


    api_getReseller.DIDNoSelect = this.addVSProvisionForm.value.VSP_addDIDNoSelect;



    // section - 2

    var addr1 = this.billCodeAddForm1.value.addresses;
    for (let i = 1; i < addr1.length; i++) {
      addr1[i].billCodeName = $('#billCodeName' + i).val();
      addr1[i].bill_code_740 = $('#bill_code_740_' + i).val();
      addr1[i].bill_code_kl = $('#bill_code_kl_' + i).val();
      addr1[i].bill_code_750 = $('#bill_code_750_' + i).val();
      addr1[i].bill_code_JP = $('#bill_code_JP_' + i).val();
      addr1[i].bill_code_sg = $('#bill_code_sg_' + i).val();
      addr1[i].bill_code_750_8 = $('#bill_code_750_8_' + i).val();
    }
    api_getReseller.billcode_values = addr1;


    // section - 3

    var addr2 = this.billCodeAddForm2.value.addressesprimary;
    for (let i = 1; i < addr2.length; i++) {
      addr2[i].bill_code_740Pbx = $('#bill_code_740Pbx_' + i).val();
      addr2[i].bill_code_740Retail = $('#bill_code_740Retail_' + i).val();
      addr2[i].bill_code_750Pbx = $('#bill_code_750Pbx_' + i).val();
      addr2[i].bill_code_750Retail = $('#bill_code_750Retail_' + i).val();
      addr2[i].bill_code_sgPbx = $('#bill_code_sgPbx_' + i).val();
      addr2[i].bill_code_sgRetail = $('#bill_code_sgRetail_' + i).val();
      addr2[i].bill_code_klPbx = $('#bill_code_klPbx_' + i).val();
      addr2[i].bill_code_klRetail = $('#bill_code_klRetail_' + i).val();
      addr2[i].bill_code_JPPbx = $('#bill_code_JP_' + i).val();
      addr2[i].bill_code_JPRetail = $('#bill_code_JP_' + i).val();
      addr2[i].bill_code_Pbxlow = $('#bill_code_Pbxlow_' + i).val();
      addr2[i].bill_code_PbxHigh = $('#bill_code_Pbxhigh_' + i).val();
      addr2[i].bill_code_Retaillow = $('#bill_code_Retaillow_' + i).val();
      addr2[i].bill_code_RetailHigh = $('#bill_code_Retailhigh_' + i).val();
      addr2[i].customer_bill_code_id_pr = $('#customer_bill_code_id_pr' + i).val();
    }
    api_getReseller.primarycode_values = addr2;
    api_req.element_data = api_getReseller;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.spinner.hide();
      if (response != '') {
        this.spinner.hide();

        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });
        $('#addVSProvisionFormId').modal('show');

      } else {

        this.spinner.hide();
        iziToast.warning({
          message: "Save Failed. Please try again",
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

  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);

    // Get the checkbox state (checked/unchecked)
    this.checkbox_value_file = event.target.checked;

    // Find the file object with the matching attachment_file_id
    const selectedFile = this.getFileAttachmentResult.find((file: { attachment_file_id: any; }) => file.attachment_file_id === data);

    // Check if the file exists and its status is 1
    if (selectedFile && selectedFile.status === 1) {
      if (this.checkbox_value_file) {
        // Add to edit_array if checked and not already added
        if (!this.edit_array.includes(data)) {
          this.edit_array.push(data);
        }
        console.log("Final Checkbox After Selection:", this.edit_array);
      } else {
        // Remove from edit_array if unchecked
        const index = this.edit_array.findIndex((el: any) => el === data);
        if (index > -1) {
          this.edit_array.splice(index, 1);
        }
        console.log("Final Checkbox After Deselection:", this.edit_array);
      }
    } else {
      console.log("File not found or status is not 1");
    }
  }
  fileAttachmentpdf(attachment_file_id: any, url: any) {
    window.open(url, '_blank');

  }


  fileAttachmentDelete(attachment_file_id: any) {
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

        this.commonAttachmentID = attachment_file_id;
        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = "vsprovision";
        // api_req.api_url = "customer/delete_file_attachment";
        api_req.api_url = "vsprovision/provision_attachment_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        fileattachDelete_req.action = "vsprovision/provision_attachment_delete";
        fileattachDelete_req.common_attachmentId = this.commonAttachmentID;
        fileattachDelete_req.user_id = localStorage.getItem('erp_c4c_user_id');
        fileattachDelete_req.attachment_file_id = attachment_file_id;
        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "File Attachment Deleted successfully",
              position: 'topRight'
            });

            $("#fileAttachmentFormId_vsp").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
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
  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  fileAttachmentUpdate() {

    // this.FileAttachmentForm.reset();
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
        data.append("invoice_attach_file[]", this.myFiles[i]);
      }
      for (var j = 0; j < this.edit_array.length; j++) {
        data.append("invoice_pdf_add[]", this.edit_array[j]);
      }

      data.append('user_id', localStorage.getItem('erp_c4c_user_id'));
      data.append('customer_id', this.customerIdFile);
      // data.append('quotation_pdf_add[]',this.edit_array ); 
      data.append('action', "provision_attachment");


      var self = this;
      $.ajax({
        type: 'POST',
        url: this.serverService.urlFinal + 'vsprovision/provision_attachment',


        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {

            self.vsprovisionList();
            console.log(result);
            Swal.close();
            $("#fileAttachmentFormId_vsp").modal("hide");
            this.edit_array = [];

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#fileAttachmentFormId_vsp").modal("hide");

            iziToast.warning({
              message: "File Attachment Update Failed",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#fileAttachmentFormId_vsp").modal("hide");
        }

      })


    }
  }
  clearFile() {
    $('#file123').val();
    $('#file123').val('');

  }
  selectEventCustomer(item: any) {
    //  console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "global";
    api_req.api_url = "vsprovision/getCustomerName";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "vsprovision/getCustomerName";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.searchkey = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      //  console.log("vignesh-customer_status response", response);

      this.searchResult = response.customerData;

      // console.log("vignesh-advanced search result", this.searchResult);
      if (response.status = true) {
      }
    });
  }
  clearSelection(event: any) {

    this.searchResult_CustomerID = '';
    this.searchResult_CustomerName = '';
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }

  selectSearchText(item: any) {
    //  console.log(item)
    this.searchText_ID = item.search_id;
    this.searchText_Name = item.search_name;
    console.log("AutoComplete-searchText_ID", this.searchText_ID)
    console.log("AutoComplete-searchText_Name", this.searchText_Name)

  }
  inputChangedSearchText(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "vsprovision";
    api_req.api_url = "vsprovision/search_text";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "vsprovision/search_text";
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.search_text = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.searchTextResult = response.data;
      }



    });
  }
  inputClearedSearchText(event: any) {

    this.searchText_ID = '';
    this.searchText_Name = '';
  }
  inputFocussedSearchText(e: any) {
    // do something when input is focused
  }
  ClearSearchList() {
    this.searchResult = '';
    this.searchTextResult = '';
    this.searchVSForm.reset();
    this.searchVSForm.controls['Vs_company_Name'].reset();
    this.searchVSForm.controls['VS_searchText'].reset();
  }



}
