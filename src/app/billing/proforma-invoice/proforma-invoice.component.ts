import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proforma-invoice',
  templateUrl: './proforma-invoice.component.html',
  styleUrls: ['./proforma-invoice.component.css']
})
export class ProformaInvoiceComponent implements OnInit {
  //list
  PI_list: any;
  biller_list: any;
  biller_temp: any;
  //list-checkbox all
  checkbox_value: any;
  edit_array: any = [];
  //dummy list
  user_list: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //payment process
  processPaymentForm: FormGroup;
  isReadOnly: boolean = true;
  //invoice type details
  invoiceTypeDetailsForm: FormGroup;
  //coupon assign
  couponAssignForm:FormGroup;
  //email-landscape
  emailForm: FormGroup;
  Select_To_Type_radiobox_Value: FormGroup;
  //email-checkbox
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId:any;
  email_checkbox_value:any;

  // set-Invoice-type-name

  setInvoiceType: FormGroup;
  InvoiceType_BillerID:any
  InvoiceTypeList:any;
  //term
  setTermCondition: FormGroup;
  TermDetailsList:any;
  TermCondition_BillerID:any;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.PIList({});
    this.processPaymentForm = new FormGroup({
      'invoiceID': new FormControl(null),
      'toal': new FormControl(null),
      'biller': new FormControl(null),
      'paid': new FormControl(null),
      'customer': new FormControl(null),
      'owing': new FormControl(null),
      'amount': new FormControl(null),
      'date': new FormControl(null),
      'paymenttype': new FormControl(null),
      'note': new FormControl(null),
      'paymentDetails': new FormControl(null),

    });
    this.invoiceTypeDetailsForm = new FormGroup({
      'paymenttype': new FormControl(null),
    });
    
    this.couponAssignForm = new FormGroup({
      'couponCode': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'email_from': new FormControl(null),
      'email_selectToType': new FormControl(null),
      'email_CCGroup': new FormControl(null),
      'email_subject': new FormControl(null),
      'email_message': new FormControl(null),
      'payment': new FormControl(null)
      });

    this.setInvoiceType = new FormGroup({
    'setInvoice' : new FormControl(null)
    });
        
    this.setTermCondition = new FormGroup({
      'setTerm' : new FormControl(null)
    });
  }

  PIList(data: any) {

    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/proforma_invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = localStorage.getItem("user_id");
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;

    // this.serverService.sendServer(api_req).subscribe((response: any) => {
    //   if (response != '') {

    //     this.PI_list = response;

    //   }

    // });
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("PI list", response);
      if (response) {
        this.PI_list = response.proforma_details;

        this.biller_list = response.biller_details;

        console.log("proforma_details list", this.PI_list)
        console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
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
  selectAll(event: any) {
    console.log(event.target.checked)
    if (event.target.checked == true) {

      this.PI_list.forEach((element: any, index: any) => {

        $("#check-grp1-" + index).prop('checked', true);
      });
    } else {
      this.PI_list.forEach((element: any, index: any) => {

        $("#check-grp1-" + index).prop('checked', false);
      });

    }

  }

  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    // this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array.push(data);
      console.log("Final Checkbox After checkbox selected list", this.edit_array);

    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }
  addPIGo() {
    this.router.navigate(['/AddPI'])
  }
  editPIGo(id: any) {
    var editbillID = id;
    this.router.navigate(['/EditPI'])

    this.router.navigate(['/EditPI'], {
      queryParams: {
        e_editBillID: editbillID,
      }
    });
  }
  radioChange_selectToType(event:any){
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  CHKGroup_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.email_checkbox_value = event.target.checked;
    console.log(this.email_checkbox_value)
    if (this.email_checkbox_value) {

      this.email_array_emailCC_Checkbox.push(data);
      this.email_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.email_array_emailCC_Checkbox);
    }
    else {
      const index = this.email_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.email_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.email_array_emailCC_Checkbox)

    }
  }

  paymentProcess(data:any){
    var list_payment = data;
    let api_req: any = new Object();
    let api_paymentPI_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_paymentPI_req.action = "invoice_payment_details";
    api_paymentPI_req.user_id = localStorage.getItem('user_id');
     api_paymentPI_req.billId = list_payment ;
    api_req.element_data = api_paymentPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if( response.status==true){
        // this.enquiryFromList = response.;
      }

    })
  }

  deleteInvoice(billId :any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

    
            iziToast.success({
              message: " Quotation Deleted Successfully",
              position: 'topRight'
            });
           
          
      
      }
    })

  }

  EmailEdit(a:any){
    
  }

  pdf(billId: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }

  showPerission(){

    alert("Are you sure you want to bill show permission?")
  }

  setInvoiceTypeNameEdit(id:any){
    this.InvoiceType_BillerID=id;
    
    let api_req: any = new Object();
    let api_invoiceTyp: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceTyp.action = "invoice_type_get";

    api_invoiceTyp.billId = id;
    api_invoiceTyp.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_invoiceTyp;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.InvoiceTypeList = response.invoice_type_det;
        console.log("response.selected_invoice_type",response.selected_invoice_type)
        this.setInvoiceType.patchValue({
          'setInvoice':response.selected_invoice_type
        })
       
        iziToast.success({
          message: "Invoice Type Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
        iziToast.warning({
          message: "Invoice Type Details not displayed. Please try again",
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
  setInvoiceTypeNameUpdate(){
    
    let api_req: any = new Object();
    let api_invTypeUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invTypeUpdate.action = "invoice_type_update";
    api_invTypeUpdate.billId =   this.InvoiceType_BillerID;
    api_invTypeUpdate.user_id = localStorage.getItem('user_id');
    api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_invTypeUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
      
       
        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#setInvoiceTypeNameFormId').modal("hide");
      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not Updated. Please try again",
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
  setInvoiceTypeClear(){
    this.setInvoiceType.reset();
  }


  setTermsConditionEdit(id:any){
    // this.setInvoiceType.reset();
    this.TermCondition_BillerID=id;
    
    let api_req: any = new Object();
    let api_insertProforma: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProforma.action = "terms_condition_get";

    api_insertProforma.billId = id;
    api_insertProforma.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_insertProforma;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.TermDetailsList = response.terms_details;
        this.setTermCondition.patchValue({
          'setTerm':response.selected_terms
        })
       
        iziToast.success({
          message: "Term Condition Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#settermsConditionFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not displayed. Please try again",
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
  setTermsConditionUpdate(){
    
    let api_req: any = new Object();
    let api_insertProformaUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProformaUpdate.action = "terms_condition_update";
    api_insertProformaUpdate.billId =   this.TermCondition_BillerID;
    api_insertProformaUpdate.user_id = localStorage.getItem('user_id');
    api_insertProformaUpdate.terms_values = this.setTermCondition.value.setTerm;
    api_req.element_data = api_insertProformaUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
      
       
        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#settermsConditionFormId').modal("hide");
      } else {

        $('#settermsConditionFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not Updated. Please try again",
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
  setTermsConditionClear(){
    this.setTermCondition.reset();
  }


}
