import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  ProfileDetailsForm: FormGroup;
  userSignatureDetailsList:any;
  googleAuthentication:any;
  firstName:any;
  lastName:any;
  QRCode:any;
  ProfileImage:any;
  // file: File;
  file: string[] = [];
  // file = Array();
  //file
  signature_billerid: any = [];
  files_Signature: File[] = [];
  // files_Signature: any  = [];
  signature_billerName: any  = [];
  orignal_filename: any  = [];
  user_signature_id: any  = [];
  signature_filename:any  = [];
    
  constructor(private serverService: ServerService,private http: HttpClient, private fb: FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.ProfileDetails();
    this.ProfileDetailsForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'photo': new FormControl(null),
      'sign': new FormControl(null),
      'googleAuthenticator': new FormControl(null),
    
    });
  }
  ProfileDetails(){
    this.spinner.show();
    let api_req: any = new Object();
    let api_profDetails: any = new Object();
    api_req.moduleType = "common";
    api_req.api_url = "common/profile_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_profDetails.action = "profile_details";
    api_profDetails.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_profDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {
        
       this.firstName=response.user_details[0].firstName;
       this.lastName=response.user_details[0].lastName;
       this.ProfileImage=response.user_details[0].profile_image;

        this.userSignatureDetailsList=response.user_signature_details;
        this.googleAuthentication=response.user_details[0].google_secretcode;
       

        this.QRCode=response.qr_code;
        $('#qr_code_id').html(response.qr_code);

        this.ProfileDetailsForm.patchValue({
          'firstName': response.user_details[0].firstName,
          'lastName': response.user_details[0].lastName,
          

          // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
        });
       
        // iziToast.success({
        //   message: "Profile Details displayed successfully",
        //   position: 'topRight'

        // });

      } else {
        iziToast.warning({
          message: "Profile details not available for this Customer. Please try again",
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
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ProfileDetailsForm.patchValue({
        photo: file
      });
    }
  }
  UpdateProfileDetails(){
    this.spinner.show();

    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('erp_c4c_user_id'));
    formData.append('firstName', this.ProfileDetailsForm.value.firstName);
    formData.append('lastName', this.ProfileDetailsForm.value.lastName);
    const photoFile = this.ProfileDetailsForm.get('photo')?.value;
    if (photoFile) {
      formData.append('profile_image', photoFile);
    }else{
        iziToast.error({
          title: 'Error,Check Photo Format',
          message: 'Contract not Saved !',
          position:'topRight',
        });

      }
    
     
   
    // formData.append('billerId', this.signature_billerid);  
    // formData.append('billerName', this.signature_billerName);
    // formData.append('user_signature_id', this.user_signature_id);
    //  formData.append('signature_filename', this.files_Signature);
  
    // this.files_Signature.forEach((file, index) => {
    //   formData.append(`signature_filename_billerid_${this.signature_billerid}`, file);
    // });

    for (let i = 0; i < this.files_Signature.length; i++) {
      const file = this.files_Signature[i];
      const billerId = this.signature_billerid[i];
      const billerName = this.signature_billerName[i];
      const count=i;
      // formData.append(`signature_filename_${i}_billerid_${billerId}`, file);
      formData.append(`signature_filename_${i}`, file);
      formData.append(`billerId_${i}`, billerId);
      formData.append(`billerName_${i}`, billerName);
     
      // formData.append(`count_${i}`, count);
      //  formData.append('user_signature_id', this.user_signature_id);
    //  formData.append('signature_filename', this.files_Signature[i]);
    }

    formData.append('action', 'update_profile_details');
    $.ajax({
      type: 'POST',
      url:this.serverService.urlFinal + 'common/update_profile_details',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: (result: any) => {
        this.spinner.hide();
        if (result.status === true) {
        
        }else if(result.status === false){
          this.spinner.hide();
            iziToast.error({
            title: 'Error,Check Missing Field Values',
            message: 'Contract not Saved !',
            position:'topRight',
          });
        }
       
      },
      error: (err: any) => {
        this.spinner.hide();
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while saving the contract.',
        });
      }
    });

  }
  UpdateProfileDetails2(): void {

   
      const formData = new FormData();
      formData.append('firstName', this.ProfileDetailsForm.get('firstName')?.value);
      formData.append('lastName', this.ProfileDetailsForm.get('lastName')?.value);

      const photoFile = this.ProfileDetailsForm.get('photo')?.value;
      if (photoFile) {
        formData.append('profile_image', photoFile);
      }

      this.userSignatureDetailsList.forEach((signature: any, index: any) => {
        const signatureControl = this.ProfileDetailsForm.get(`signature${index}`);
        if (signatureControl?.value) {
          formData.append(`signature${index}`, signatureControl.value);
        }
      });
      formData.append('user_id', localStorage.getItem('erp_c4c_user_id'));
      formData.append('action', 'update_profile_details');
      // Simulate form submission (replace with actual API call)
      console.log('Form Data:', formData);
      
      // Perform API call
      // this.yourService.updateProfile(formData).subscribe(response => {
      //   console.log('Profile updated successfully', response);
      // }, error => {
      //   console.error('Error updating profile', error);
      // });
      $.ajax({
        type: 'POST',
        url: this.serverService.urlFinal +'common/update_profile_details',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: (result: any) => {
          this.spinner.hide();
          if (result.status === true) {
          
          }else if(result.status === false){
            this.spinner.hide();
              iziToast.error({
              title: 'Error,Check Missing Field Values',
              message: 'Contract not Saved !',
              position:'topRight',
            });
          }
         
        },
        error: (err: any) => {
          this.spinner.hide();
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while saving the contract.',
          });
        }
      });
     
  }
  showPreviewImage(all: any, event: any) {
  
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.ProfileDetailsForm.patchValue({
    //     photo: file
    //   });
    // }
       
   
    for (let i = 0; i < event.target.files.length; i++) {
      var file = event.target.files[i];

      if (!this.files_Signature.some(f => f.name === file.name && f.size === file.size)) {
        this.files_Signature.push(file);
      }
      console.log(this.files_Signature);
     
      this.signature_billerid.push(all.billerId);
      this.signature_billerName.push(all.billerName);
      this.orignal_filename.push(all.orignal_filename);
      this.signature_filename.push(all.signature_filename);
      this.user_signature_id.push(all.user_signature_id);
      console.log("push_billerid(signature)", this.signature_billerid);
      console.log("signature_billerName", this.signature_billerName);
      console.log("orignal_filename", this.orignal_filename);
      console.log("signature_filename", this.signature_filename);
      console.log("signature_filename", this.files_Signature);
      console.log("user_signature_id", this.user_signature_id);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  showPreviewImage1(billerId: number, event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.ProfileDetailsForm.patchValue({ [`signature${billerId}`]: file });
      this.ProfileDetailsForm.get(`signature${billerId}`)?.updateValueAndValidity();
    }
  }


  delete_sign(id: any) {
    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete_data(id);
      } else if (result.isDenied) {
        Swal.fire('No Changes');
      }
    })
  }

  delete_data(sign_id: any) {
    let api_req: any = new Object();
    let api_enableDisable: any = new Object();
    api_req.moduleType = "admin";
    api_req.api_url = "admin/user_signature_deleted"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_enableDisable.action = "user_signature_deleted";
    api_enableDisable.user_signature_id = sign_id;
    api_req.element_data = api_enableDisable;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Signature deleted successful',
          showConfirmButton: false,
          timer: 1500
        })
        this.ProfileDetails();
        
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Password Reset not Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });


  }
  google_auth() {
    var url = "https://www.authenticatorapi.com/pair.aspx?AppName=Erp&AppInfo=" + this.firstName + "&SecretCode=" +this.googleAuthentication + +"";
    window.open(url, '_blank');
    console.log("url", url)
  }
  GoogleAuthenticationValidation(){
   

      let api_req: any = new Object();
      let api_googleAuthVali: any = new Object();
      api_req.moduleType = "common";
      api_req.api_url = "common/google_auth_check";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_googleAuthVali.action = "google_auth_check";
      api_googleAuthVali.user_id = localStorage.getItem('erp_c4c_user_id');
      api_googleAuthVali.customerId = localStorage.getItem('erp_c4c_user_id');
      api_googleAuthVali.auth_code = localStorage.getItem('erp_c4c_user_id');
      api_req.element_data = api_googleAuthVali;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.status == true) {
          
         this.firstName=response.user_details[0].firstName;
         this.lastName=response.user_details[0].lastName;
          this.userSignatureDetailsList=response.user_signature_details;
          this.googleAuthentication=response.user_details[0].google_secretcode;
  
          this.ProfileDetailsForm.patchValue({
            'firstName': response.user_details[0].firstName,
            'lastName': response.user_details[0].lastName,
            
  
            // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
          });
          this.google_auth();
          iziToast.success({
            message: "Mconnect Partner Details displayed successfully",
            position: 'topRight'
  
          });
  
        } else {
          iziToast.warning({
            message: "Mconnect Partner details not available for this Customer. Please try again",
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
