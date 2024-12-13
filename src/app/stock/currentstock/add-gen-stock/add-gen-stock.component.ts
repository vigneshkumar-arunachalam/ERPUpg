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
  selector: 'app-add-gen-stock',
  templateUrl: './add-gen-stock.component.html',
  styleUrls: ['./add-gen-stock.component.css']
})
export class AddGenStockComponent implements OnInit {
  public addPI_section2: FormGroup;
  public addresses: FormArray;
  user_ids: string;
  productCategoryNameList: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private zone: NgZone,
    private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.addPI_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.user_ids = localStorage.getItem('erp_c4c_user_id');
    this.ProductCategoryNameList();

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

  save(i: any) {


    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "product_current_stock";
    api_req.api_url = "product_current_stock/insert"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "insert";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    // api_mulInvpay.customerId = this.addPI_section2.value.addresses[0].customer_name.customerId;

    // const addressesArray = this.addPI_section2.get('addresses') as FormArray;
    // const addressDataAtIndex = addressesArray.at(i).value; // Get data at index i

    // api_mulInvpay.category_id_1 = addressDataAtIndex.productcategory1;
    // api_mulInvpay.category_color_1 = addressDataAtIndex.productColor1;
    // api_mulInvpay.category_fontsize_1 = addressDataAtIndex.productFontSize1;
    // api_mulInvpay.qty_color_1 = addressDataAtIndex.productQtyColor1;
    // api_mulInvpay.qty_fontsize_1 = addressDataAtIndex.productQtyFontSize1;

    // api_mulInvpay.category_id_2 = addressDataAtIndex.productcategory2;
    // api_mulInvpay.category_color_2 = addressDataAtIndex.productColor2;
    // api_mulInvpay.category_fontsize_2 = addressDataAtIndex.productFontSize2;
    // api_mulInvpay.qty_color_2 = addressDataAtIndex.productQtyColor2;
    // api_mulInvpay.qty_fontsize_2 = addressDataAtIndex.productQtyFontSize2;

    // api_mulInvpay.category_id_3 = addressDataAtIndex.productcategory3;
    // api_mulInvpay.category_color_3 = addressDataAtIndex.productColor3;
    // api_mulInvpay.category_fontsize_3 = addressDataAtIndex.productFontSize3;
    // api_mulInvpay.qty_color_3 = addressDataAtIndex.productQtyColor3;
    // api_mulInvpay.qty_fontsize_3 = addressDataAtIndex.productQtyFontSize3;


    var addr = this.addPI_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      // console.log(addr[i].pd_quantity_txtbox1)
      addr[i].category_id_1 = $('#pd_category1' + i).val();
      addr[i].category_color_1 = $('#pd_productColor1' + i).val();
      addr[i].category_fontsize_1 = $('#pd_productFontSize1' + i).val();
      addr[i].qty_color_1 = $('#pd_productQtyColor1' + i).val();
      addr[i].qty_fontsize_1 = $('#pd_productQtyFontSize1' + i).val();

      addr[i].category_id_2 = $('#pd_category2' + i).val();
      addr[i].category_color_2 = $('#pd_productColor2' + i).val();
      addr[i].category_fontsize_2 = $('#pd_productFontSize2' + i).val();
      addr[i].qty_color_2 = $('#pd_productQtyColor2' + i).val();
      addr[i].qty_fontsize_2 = $('#pd_productQtyFontSize2' + i).val();

      addr[i].category_id_3 = $('#pd_category3' + i).val();
      addr[i].category_color_3 = $('#pd_productColor3' + i).val();
      addr[i].category_fontsize_3 = $('#pd_productFontSize3' + i).val();
      addr[i].qty_color_3 = $('#pd_productQtyColor3' + i).val();
      addr[i].qty_fontsize_3 = $('#pd_productQtyFontSize3' + i).val();

    }


    api_mulInvpay.products = addr;



    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();
       
        this.router.navigate(['/CurrentStockMaster']);

        this.spinner.hide();
        iziToast.success({
          message: "Saved Successfully",
          position: 'topRight'
        });

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
    this.router.navigate(['/CurrentStockMaster']);
  }

}
