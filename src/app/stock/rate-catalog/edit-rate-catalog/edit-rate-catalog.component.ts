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
  selector: 'app-edit-rate-catalog',
  templateUrl: './edit-rate-catalog.component.html',
  styleUrls: ['./edit-rate-catalog.component.css']
})
export class EditRateCatalogComponent implements OnInit {

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

        this.EditIDstock_inv_rpt_id = params['stock_inv_catelog_id'];
        console.log("receiving to edit", this.EditIDstock_inv_rpt_id);
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
      stock_inv_catelog_id: '',
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
      productConvColor1: '',
      product10Color1: '',
      product20Color1: '',
      product30Color1: '',
      product40Color1: '',
      product50Color1: '',
      productConvColor2: '',
      product10Color2: '',
      product20Color2: '',
      product30Color2: '',
      product40Color2: '',
      product50Color2: '',
      productConvColor3: '',
      product10Color3: '',
      product20Color3: '',
      product30Color3: '',
      product40Color3: '',
      product50Color3: '',

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
    this.spinner.show();
    let api_req: any = new Object();
    let api_postUPd: any = new Object();
    api_req.moduleType = "inventory_catelog_stock";
    api_req.api_url = "inventory_catelog_stock/viewEditList";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_postUPd.action = "inventory_catelog_stock/viewEditList";
    api_postUPd.user_id = localStorage.getItem('erp_c4c_user_id');
    api_postUPd.stock_inv_catelog_id = this.EditIDstock_inv_rpt_id;

    api_req.element_data = api_postUPd;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
    
      if (response.status == 'success') {

        this.spinner.hide();


        const formArray = new FormArray([]);


        formArray.push(this.fb.group({
          "productcategory1": response.data.category_id_1,
          "productColor1": response.data.category_color_1,
          "productFontSize1": response.data.category_fontsize_1,
          "productQtyColor1": response.data.pur_color_1,
          "productQtyFontSize1": response.data.pur_fontsize_1,
          "productConvColor1": response.data.conv_color_1,
          "product10Color1": response.data.price_color_1_10,
          "product20Color1": response.data.price_color_1_20,
          "product30Color1": response.data.price_color_1_30,
          "product40Color1": response.data.price_color_1_40,
          "product50Color1": response.data.price_color_1_50,

          "productcategory2": response.data.category_id_2,
          "productColor2": response.data.category_color_2,
          "productFontSize2": response.data.category_fontsize_2,
          "productQtyColor2": response.data.pur_color_2,
          "productQtyFontSize2": response.data.pur_fontsize_2,
          "productConvColor2": response.data.conv_color_2,
          "product10Color2": response.data.price_color_2_10,
          "product20Color2": response.data.price_color_2_20,
          "product30Color2": response.data.price_color_2_30,
          "product40Color2": response.data.price_color_2_40,
          "product50Color2": response.data.price_color_2_50,

          "productcategory3": response.data.category_id_3,
          "productColor3": response.data.category_color_3,
          "productFontSize3": response.data.category_fontsize_3,
          "productQtyColor3": response.data.pur_color_3,
          "productQtyFontSize3": response.data.pur_fontsize_3,
          "productConvColor3": response.data.conv_color_3,
          "product10Color3": response.data.price_color_3_10,
          "product20Color3": response.data.price_color_3_20,
          "product30Color3": response.data.price_color_3_30,
          "product40Color3": response.data.price_color_3_40,
          "product50Color3": response.data.price_color_3_50,
          "stock_inv_catelog_id": response.data.stock_inv_catelog_id,

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
  update(i: any) {
    this.spinner.show();
    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "inventory_catelog_stock";
    api_req.api_url = "inventory_catelog_stock/update"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "inventory_catelog_stock/update";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");

    var addr = this.addPI_section2.value.addresses;


    for (let i = 0; i < addr.length; i++) {

      // console.log(addr[i].pd_quantity_txtbox1)
      // stock_inv_catelog_id
      // addr[i].stock_inv_catelog_id = $('#pd_stockInvCatelogId' + i).val();
      addr[i].category_id_1 = $('#pd_category1' + i).val();
      addr[i].category_color_1 = $('#pd_productColor1' + i).val();
      addr[i].category_fontsize_1 = $('#pd_productFontSize1' + i).val();
      addr[i].pur_color_1 = $('#pd_productQtyColor1' + i).val();
      addr[i].pur_fontsize_1 = $('#pd_productQtyFontSize1' + i).val();
      addr[i].conv_color_1 = $('#pd_productConvColor1' + i).val();
      addr[i].price_color_1_10 = $('#pd_product10Color1' + i).val();
      addr[i].price_color_1_20 = $('#pd_product20Color1' + i).val();
      addr[i].price_color_1_30 = $('#pd_product30Color1' + i).val();
      addr[i].price_color_1_40 = $('#pd_product40Color1' + i).val();
      addr[i].price_color_1_50 = $('#pd_product50Color1' + i).val();
      addr[i].category_id_2 = $('#pd_category2' + i).val();
      addr[i].category_color_2 = $('#pd_productColor2' + i).val();
      addr[i].category_fontsize_2 = $('#pd_productFontSize2' + i).val();
      addr[i].pur_color_2 = $('#pd_productQtyColor2' + i).val();
      addr[i].pur_fontsize_2 = $('#pd_productQtyFontSize2' + i).val();
      addr[i].conv_color_2 = $('#pd_productConvColor2' + i).val();
      addr[i].price_color_2_10 = $('#pd_product10Color2' + i).val();
      addr[i].price_color_2_20 = $('#pd_product20Color2' + i).val();
      addr[i].price_color_2_30 = $('#pd_product30Color2' + i).val();
      addr[i].price_color_2_40 = $('#pd_product40Color2' + i).val();
      addr[i].price_color_2_50 = $('#pd_product50Color2' + i).val();
      addr[i].category_id_3 = $('#pd_category3' + i).val();
      addr[i].category_color_3 = $('#pd_productColor3' + i).val();
      addr[i].category_fontsize_3 = $('#pd_productFontSize3' + i).val();
      addr[i].pur_color_3 = $('#pd_productQtyColor3' + i).val();
      addr[i].pur_fontsize_3 = $('#pd_productQtyFontSize3' + i).val();
      addr[i].conv_color_3 = $('#pd_productConvColor3' + i).val();
      addr[i].price_color_3_10 = $('#pd_product10Color3' + i).val();
      addr[i].price_color_3_20 = $('#pd_product20Color3' + i).val();
      addr[i].price_color_3_30 = $('#pd_product30Color3' + i).val();
      addr[i].price_color_3_40 = $('#pd_product40Color3' + i).val();
      addr[i].price_color_3_50 = $('#pd_product50Color3' + i).val();
    }


    api_mulInvpay.products = addr;

    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.spinner.hide();

        this.router.navigate(['/rateCatalog']);
        iziToast.success({
          message: "Updated Successfully",
          position: 'topRight'
        });

      } else {
        this.spinner.hide();
        this.router.navigate(['/rateCatalog']);
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
    this.router.navigate(['/rateCatalog']);
  }

}
