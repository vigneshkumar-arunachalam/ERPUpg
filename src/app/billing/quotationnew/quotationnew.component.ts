import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-quotationnew',
  templateUrl: './quotationnew.component.html',
  styleUrls: ['./quotationnew.component.css']
})
export class QuotationnewComponent implements OnInit {
  quotation_list: any;
  addNewQuotationPopUpForm: FormGroup;
  EnquiryFrom: FormGroup;
  enquiryFromList: any;
  templateNameList: any;
  // quotation_list:any=[];
  quotationValidityList: any = [];
  constructor(public serverService: ServerService, private router: Router) { }

  ngOnInit(): void {


    this.addNewQuotationPopUpForm = new FormGroup({
      'enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'enquirySubject_addPopUP': new FormControl(null),
      'quotationValidity_addPopUP': new FormControl(null),
      'version_enqForm_addPopUP': new FormControl(null),
      'templateName_addPopUP': new FormControl(null),
    });
    this.EnquiryFrom = new FormGroup({
      'enquiryForm': new FormControl(null),
      'enquirySubject': new FormControl(null),
      'quotationValidity': new FormControl(null),
      'version_enqForm': new FormControl(null),
      'templateName': new FormControl(null),
    });
    this.quotationList()
  }
  quotationList() {
    console.log("Quotation List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = "2";
    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("qoutation list", response);
      if (response) {
        this.quotation_list = response;
        console.log(this.quotation_list)
        // Swal.fire("Have a nice day!");  
        // Swal.fire({  
        //   position: 'top-end',  
        //   icon: 'success',  
        //   title: 'Your work has been saved',  
        //   showConfirmButton: false,  
        //   timer: 1500  
        // })
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
  addQuotationNew() {
    let api_req: any = new Object();
    let add_newQuotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/create_popup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotation_req.action = "create_popup";
    add_newQuotation_req.user_id = "2";
    add_newQuotation_req.enquiry_from_id = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    add_newQuotation_req.quot_validity = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    add_newQuotation_req.quotationId = this.addNewQuotationPopUpForm.value.templateName_addPopUP;
    api_req.element_data = add_newQuotation_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("pop up for add quotation", response);
      if (response != '') {
        this.enquiryFromList = response.enquiry_from;
        this.quotationValidityList = response.quot_validity;
        this.templateNameList = response.template_name_arr;
        console.log("hi", this.enquiryFromList)

        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  // deleteQuotation(id:any){

  //   let api_req: any = new Object();
  //  let delete_quotation_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/delete_quotation";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   delete_quotation_req.action = "delete_quotation";
  //   delete_quotation_req.quotationId=id;
  //   delete_quotation_req.user_id = "2";
  //   api_req.element_data = delete_quotation_req;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     console.log(response)

  //   //  alert("Deleted Sucessfully")
  //     if(response.status==true){
  //       this.quotationList() 

  //       Swal.fire({  
  //         title: 'Are you sure want to remove?',  
  //         icon: 'warning',  
  //         showCancelButton: true,  
  //         confirmButtonText: 'Yes',  
  //         cancelButtonText: 'No'  
  //       }).then((response:any) => {  
  //         if (response.value) {  
  //           Swal.fire(  
  //             'Deleted!' 

  //           )  
  //         } else if (response.dismiss === Swal.DismissReason.cancel) {  
  //           Swal.fire(  
  //             'Cancelled' 

  //           )  
  //         }  
  //       })  




  //   });


  //  }



  deleteQuotation(id: any) {
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

        let api_req: any = new Object();
        let delete_quotation_req: any = new Object();
        api_req.moduleType = "quotation";
        api_req.api_url = "quotation/delete_quotation";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_quotation_req.action = "delete_quotation";
        delete_quotation_req.quotationId = id;
        delete_quotation_req.user_id = "2";
        api_req.element_data = delete_quotation_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            window.location.reload();
            this.quotationList()
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Quotation Deleted successfully",
              position: 'topRight'
            });
            this.quotationList()
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }


  AddQuotationGo() {

    this.router.navigate(['/addquotationnew']);
    $('#addNewQuotationFormId').modal('hide');
  }
}
