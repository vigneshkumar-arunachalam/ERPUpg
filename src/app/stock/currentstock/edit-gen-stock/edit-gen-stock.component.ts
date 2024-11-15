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
  selector: 'app-edit-gen-stock',
  templateUrl: './edit-gen-stock.component.html',
  styleUrls: ['./edit-gen-stock.component.css']
})
export class EditGenStockComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  productCategoryNameList: any;
  EditIDstock_inv_rpt_id: any;

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
      productcategory1: '',
      productcategory2: '',
      productcategory3: '',
      productColor1: '',
      productColor2: '',
      productColor3: '',
      productFontSize1: '',
      productFontSize2: '',
      productFontSize3: '',
      productQtyColor1: '',
      productQtyColor2: '',
      productQtyColor3: '',
      productQtyFontSize1: '',
      productQtyFontSize2: '',
      productQtyFontSize3: '',
    });
  }


  ProductCategoryNameList() {

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_category";
    api_req.api_url = "product_master/getProductCategory";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "getProductCategory";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == true) {

        this.spinner.hide();
        this.productCategoryNameList = response.product_category;

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

    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "product_current_stock";
    api_req.api_url = "product_current_stock/viewEditList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "viewEditList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.stock_inv_rpt_id = this.EditIDstock_inv_rpt_id;

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.spinner.hide();
      if (response.status == 'success') {

        this.spinner.hide();
  

        const formArray = new FormArray([]);
      
             
          formArray.push(this.fb.group({
              "productcategory1": response.data.category_id_1,
             "productColor1": response.data.category_color_1,
             "productFontSize1": response.data.category_fontsize_1,
             "productQtyColor1": response.data.qty_color_1,
             "productQtyFontSize1": response.data.qty_fontsize_1,

              "productcategory2": response.data.category_id_2,
             "productColor2": response.data.category_color_2,
             "productFontSize2": response.data.category_fontsize_2,
             "productQtyColor2": response.data.qty_color_2,
             "productQtyFontSize2": response.data.qty_fontsize_2,

              "productcategory3": response.data.category_id_3,
             "productColor3": response.data.category_color_3,
             "productFontSize3": response.data.category_fontsize_3,
             "productQtyColor3": response.data.qty_color_3,
             "productQtyFontSize3": response.data.qty_fontsize_3,

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

}
