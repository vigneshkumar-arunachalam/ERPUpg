import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'
import { ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgZone } from '@angular/core';


	
@Component({
  selector: 'app-edit-didnum-cat-stock',
  templateUrl: './edit-didnum-cat-stock.component.html',
  styleUrls: ['./edit-didnum-cat-stock.component.css']
})
export class EditDIDNumCatStockComponent implements OnInit {

  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  productCategoryNameList: any;
  EditIDstock_inv_rpt_id: any;
  EditViewStatus: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');

    this.route.queryParams
      .subscribe(params => {
    this.ProductCategoryNameList();
    
        this.EditIDstock_inv_rpt_id = params['stock_inv_rpt_id'];
        this.EditViewStatus = params['didstatus'];
        console.log("receiving to edit",this.EditIDstock_inv_rpt_id );
        setTimeout(() => {
           this.viewEditList();
        }, 2000);
       
      }
      );

  }
  get addressControls() {
    return this.addPI_section2.get('addresses') as FormArray
  }
  addAddress(): void {

    // $('.date-value').val(this.currentDate);
    this.addresses = this.addPI_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  removeAddress(i: number) {
    this.addressControls.removeAt(i);
  }
  createAddress(): FormGroup {
    return this.fb.group({
      // customer_id:'',
      did_number_catalog_id: '',
      productcategory1: '',
      productcategory2: '',
      productcategory3: '',
      DIDNumColor1: '',
      DIDNumColor2: '',
      DIDNumColor3: '',
      DIDNumFontSize1: '',
      DIDNumFontSize2: '',
      DIDNumFontSize3: '',
      DIDNumCusColor1: '',
      DIDNumCusColor2: '',
      DIDNumCusColor3: '',
      DIDNumCusFontsize1: '',
      DIDNumCusFontsize2: '',
      DIDNumCusFontsize3: '',
    });
  }


  ProductCategoryNameList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "didcatelog_stock";
    api_req.api_url = "didcatelog_stock/didTrunckDropDown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "didcatelog_stock/didTrunckDropDown";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == 'success') {

        this.spinner.hide();
        this.productCategoryNameList = response.data;

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
  viewEditList() {
    this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "didcatelog_stock";
    api_req.api_url = "didcatelog_stock/viewEditList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "didcatelog_stock/viewEditList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.did_number_catalog_id = this.EditIDstock_inv_rpt_id;

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == 'success') {

        this.spinner.hide();
  

        const formArray = new FormArray([]);
      
             
          formArray.push(this.fb.group({
              "productcategory1": response.data.did_trunk_name_id_1,
             "DIDNumColor1": response.data.did_trunk_name_color_1,
             "DIDNumFontSize1": response.data.did_trunk_name_fontsize_1,
             "DIDNumCusColor1": response.data.cus_color_1,
             "DIDNumCusFontsize1": response.data.cus_fontsize_1,

              "productcategory2": response.data.did_trunk_name_id_2,
             "DIDNumColor2": response.data.did_trunk_name_color_2,
             "DIDNumFontSize2": response.data.did_trunk_name_fontsize_2,
             "DIDNumCusColor2": response.data.cus_color_2,
             "DIDNumCusFontsize2": response.data.cus_fontsize_2,

              "productcategory3": response.data.did_trunk_name_id_3,
             "DIDNumColor3": response.data.did_trunk_name_color_3,
             "DIDNumFontSize3": response.data.did_trunk_name_fontsize_3,
             "DIDNumCusColor3": response.data.cus_color_3,
             "DIDNumCusFontsize3": response.data.cus_fontsize_3,


             "did_number_catalog_id": response.data.did_number_catalog_id

          })

          );  

        this.addPI_section2.setControl('addresses', formArray);

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
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "didcatelog_stock";
    api_req.api_url = "didcatelog_stock/update"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "didcatelog_stock/update";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
     var addr = this.addPI_section2.value.addresses;

    for (let i = 0; i < addr.length; i++) {

      // console.log(addr[i].pd_quantity_txtbox1)
    //  addr[i].did_number_catalog_id = $('#pd_category1' + i).val();

      addr[i].did_trunk_name_id_1 = $('#pd_category1' + i).val();
      addr[i].did_trunk_name_color_1 = $('#pd_DIDNumColor1' + i).val();
      addr[i].did_trunk_name_fontsize_1 = $('#pd_DIDNumFontSize1' + i).val();
      addr[i].cus_color_1 = $('#pd_DIDNumCusColor1' + i).val();
      addr[i].cus_fontsize_1 = $('#pd_DIDNumCusFontsize1' + i).val();

      addr[i].did_trunk_name_id_2 = $('#pd_category2' + i).val();
      addr[i].did_trunk_name_color_2 = $('#pd_DIDNumColor2' + i).val();
      addr[i].did_trunk_name_fontsize_2 = $('#pd_DIDNumFontSize2' + i).val();
      addr[i].cus_color_2 = $('#pd_DIDNumCusColor2' + i).val();
      addr[i].cus_fontsize_2 = $('#pd_DIDNumCusFontsize2' + i).val();

      addr[i].did_trunk_name_id_3 = $('#pd_category3' + i).val();
      addr[i].did_trunk_name_color_3 = $('#pd_DIDNumColor3' + i).val();
      addr[i].did_trunk_name_fontsize_3 = $('#pd_DIDNumFontSize3' + i).val();
      addr[i].cus_color_3 = $('#pd_DIDNumCusColor3' + i).val();
      addr[i].cus_fontsize_3 = $('#pd_DIDNumCusFontsize3' + i).val();

    }


    api_mulInvpay.products = addr;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });
     
          this.router.navigate(['/DIDNumberCatalog']);
       

      } else {
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
  goBack() {
    this.router.navigate(['/DIDNumberCatalog']);
  }

}
