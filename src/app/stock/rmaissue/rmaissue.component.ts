import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var tinymce: any;
@Component({
  selector: 'app-rmaissue',
  templateUrl: './rmaissue.component.html',
  styleUrls: ['./rmaissue.component.css'],
})
export class RMAIssueComponent implements OnInit {
  //pagination
  recordNotFound = false;
  pageLimit = 10;
  paginationData: any = { info: 'hide' };
  offset_count = 0;

  // List

  userId: any;
  searchResult: any;
  rma_issue_list: any;

  // ADD
  add_ram_issue_form: FormGroup;
  add_company_name_list: any;
  add_customer_name_list: any[] = [];
  selectedCustomer: any;
  selectedCustomerId: any;
  selectedcustomerName: any;
  add_defaults_biller_id: any;
  add_generateRmaNumber: any;
  add_generateRmaNumber_id: any;
  add_serialNumber: any[] = [];
  add_product_category_list: any;
  add_product_name_list: any;
  add_problem_type_list: any;
  add_conclusion_appr_req_list: any;

  // edit

  edit_ram_issue_form: FormGroup;
  edit_product_name_list: any;
  edit_customer_name_list: any;
  edit_generateRmaNumber: any;
  edit_generateRmaNumber_id: any;
  edit_serialNumber: any[] = [];
  editselectedSerialNumber: any;
  selectedProductId: number | null = null;

  selectedSerialNumber: any;
  myFiles: any[] = [];
  fileInput!: HTMLInputElement;
  user_id: any;
  edit_product_name: any;
  fileUrl: any;

  //email
  emailForm: FormGroup;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  Select_To_Type_radiobox_Value: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  groupSelect_emailCCId: any;
  Rma_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  rma_issue_id: any;
  emailbillerName: any;
  getCustomerEmail: any;
  getCustomerEmailCompany: any;
  editRMAIssueId: any;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('erp_c4c_user_id');

    this.getRMAIssueListData({});
    this.getRmaDetails();
    this.add_ram_issue_form = new FormGroup({
      company_name: new FormControl(null),
      customer_name: new FormControl(null),
      customer_name_search: new FormControl(null),
      rma_case_no: new FormControl(null),
      rma_case_no_id: new FormControl(null),
      product_serial_no: new FormControl(null),
      product_serial_no_search: new FormControl(null),
      product_category: new FormControl(null),
      product_name: new FormControl(null),
      problem_type: new FormControl(null),
      fileAttachment: new FormControl(null),
      ramIssue_description: new FormControl(null),
      ramCause_description: new FormControl(null),
      conclusion_description: new FormControl(null),
      conclusion_appr_req: new FormControl(null),
    });
    this.edit_ram_issue_form = new FormGroup({
      edit_company_name: new FormControl(null),
      edit_customer_name: new FormControl(null),
      edit_customer_name_search: new FormControl(null),
      edit_rma_case_no: new FormControl(null),
      edit_rma_case_no_id: new FormControl(null),
      edit_product_serial_no: new FormControl(null),
      edit_product_serial_no_search: new FormControl(null),
      edit_product_category: new FormControl(null),
      edit_product_name: new FormControl(null),
      edit_problem_type: new FormControl(null),
      edit_fileAttachment: new FormControl(null),
      edit_ramIssue_description: new FormControl(null),
      edit_ramCause_description: new FormControl(null),
      edit_conclusion_description: new FormControl(null),
      edit_conclusion_appr_req: new FormControl(null),
    });

    this.emailForm = new FormGroup({
      email_From: new FormControl('', Validators.required),
      email_to: new FormControl('', Validators.required),
      email_template: new FormControl('', Validators.required),
      Subject_Content: new FormControl('', Validators.required),

      // 'email_pdfType': new FormControl(null, Validators.required),
    });
  }

  searchCustomerData(data: any) {
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = 'customer';
    api_req.api_url = 'customer/customer_name_search';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    api_Search_req.action = 'customer_name_search';
    api_Search_req.user_id = localStorage.getItem('erp_c4c_user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.searchResult = response.customer_names;
      if ((response.status = true)) {
      }
    });
  }

  listDataInfo(list_data: any) {
    // console.log(list_data)
    list_data.search_text =
      list_data.search_text == undefined ? '' : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type =
      list_data.order_by_type == undefined ? 'desc' : list_data.order_by_type;
    list_data.limit =
      list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  getRMAIssueListData(data: any) {
    this.spinner.show();

    var list_data = this.listDataInfo(data);
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getRmaList',
      api_type: 'web',
      element_data: {
        action: 'getRmaList',
        user_id: this.userId,
        off_set: list_data.offset,
        limit_val: list_data.limit,
        search_txt: list_data.search_text,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.rma_issue_list = response.data;
        this.paginationData = this.serverService.pagination({
          offset: response.off_set,
          total: response.total_count,
          page_limit: this.pageLimit,
        });

        this.recordNotFound = this.rma_issue_list.length == 0 ? true : false;

        this.spinner.hide();
      }
    });
  }

  getRmaDetails() {
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getRmaDetails',
      api_type: 'web',
      element_data: {
        action: 'getRmaDetails',
        user_id: this.userId,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.add_company_name_list = response.biller_list;
      this.add_defaults_biller_id = response.defaults_biller_id;
      this.add_product_category_list = response.categories;
      this.add_problem_type_list = response.problem_type;
      this.add_conclusion_appr_req_list = response.approval_request;

      // default company setup
      const defaultCompany = this.add_company_name_list.find(
        (company: { billerId: number }) =>
          company.billerId === this.add_defaults_biller_id
      );

      if (defaultCompany) {
        this.add_ram_issue_form.patchValue({
          company_name: defaultCompany.billerId, // Set default value
        });
      }
    });
  }

  getCustomerList(event: any) {
    let searchKey = event.target.value;
    var billerID = this.add_ram_issue_form.value.company_name;

    if (searchKey.length < 1) {
      this.add_customer_name_list = [];
      return;
    }
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/get_customer_name',
      api_type: 'web',
      element_data: {
        action: 'get_customer_name',
        user_id: this.userId,
        key_word: searchKey,
        billerId: billerID,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.customer_list && Array.isArray(response.customer_list)) {
        this.add_customer_name_list = response.customer_list.filter(
          (customer: { customerName: string }) =>
            customer.customerName
              .toLowerCase()
              .includes(searchKey.toLowerCase())
        );
      } else {
        this.add_customer_name_list = [];
      }
    });
  }

  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
    this.selectedCustomerId = customer.customerId;
    this.selectedcustomerName = customer.customerName;

    // Correctly set the values
    this.add_ram_issue_form.patchValue({
      customer_name: customer.customerName, // Set the actual name
      customer_name_search: customer.customerId, // Set the customer ID
    });
    this.getGenerateRmaNumber();

    // Clear the dropdown list
    this.add_customer_name_list = [];
  }

  getGenerateRmaNumber() {
    var billerID = this.add_ram_issue_form.value.company_name;
    var customer_name = this.add_ram_issue_form.value.customer_name;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/generateRmaNumber',
      api_type: 'web',
      element_data: {
        action: 'generateRmaNumber',
        user_id: this.userId,
        customer_name: customer_name,
        billerId: billerID,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.add_generateRmaNumber = response.rma_case_number;
      this.add_generateRmaNumber_id = response.customerId;
    });
  }

  getserialNumber(event: any) {
    let searchKey = event.target.value;

    if (searchKey.length < 1) {
      this.add_serialNumber = [];
      return;
    }

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getserialNumber',
      api_type: 'web',
      element_data: {
        action: 'getserialNumber',
        customer_id: this.add_generateRmaNumber_id,
        user_id: this.userId,
        serial_no: searchKey,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.data && Array.isArray(response.data)) {
        this.add_serialNumber = response.data.filter(
          (item: { product_serial_number: string }) =>
            item.product_serial_number
              .toLowerCase()
              .includes(searchKey.toLowerCase())
        );
      } else {
        this.add_serialNumber = [];
      }
    });
  }

  selectserialNo(serial: any) {
    this.selectedSerialNumber = serial;

    this.add_ram_issue_form.patchValue({
      product_serial_no: serial.product_serial_number,
    });

    // Clear the dropdown list
    this.add_serialNumber = [];
  }

  getProductsByCategorylist() {
    var product_category = this.add_ram_issue_form.value.product_category;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getProductsByCategory',
      api_type: 'web',
      element_data: {
        action: 'getProductsByCategory',
        user_id: this.userId,
        category_id: product_category,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.add_product_name_list = response.productList;
    });
  }

  AddRmaIssue() {
    $('#add_rma_issue_popup').modal('show');
      this.getRmaDetails();
  }

  fileAttachmentEventPE1(event: any) {
    if (event.target.files.length < 4) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    } else {
      iziToast.error({
        message:
          'Sorry, Maximum you can choose 3 files only. Please contact admin',
        position: 'topRight',
      });
    }
  }

  AddRmaIssue_new() {
    let company_name = this.add_ram_issue_form.value.company_name;
    let customer_name = this.add_ram_issue_form.value.customer_name;
    let product_serial_no = this.add_ram_issue_form.value.product_serial_no;
    let product_category = this.add_ram_issue_form.value.product_category;
    let product_name = this.add_ram_issue_form.value.product_name;
   let problem_type = this.add_ram_issue_form.value.problem_type

    if (
      company_name === '' ||
      company_name === null ||
      company_name === undefined ||
      company_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Company Name `,
        position: 'topRight',
      });

      return false;
    }
    if (
      customer_name === '' ||
      customer_name === null ||
      customer_name === undefined ||
      customer_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Enter Customer Name `,
        position: 'topRight',
      });

      return false;
    }
    if(product_serial_no === '' ||product_serial_no === null || product_serial_no === undefined || product_serial_no==='undefined'){

      iziToast.warning({
        message: `Please Enter Product Serial Number `,
        position: 'topRight',
      });

      return false;
    }
    if (
      product_category === '' ||
      product_category === null ||
      product_category === undefined ||
      product_category === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Product Category `,
        position: 'topRight',
      });

      return false;
    }
    if (
      product_name === '' ||
      product_name === null ||
      product_name === undefined ||
      product_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Product Name `,
        position: 'topRight',
      });

      return false;
    }
     if (
      problem_type === '' ||
      problem_type === null ||
      problem_type === undefined ||
      problem_type === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Problem Type `,
        position: 'topRight',
      });

      return false;
    }

    this.spinner.show();
    var data = new FormData();

    data.append('user_id', this.userId);
    data.append('customer_id', this.add_generateRmaNumber_id);
    data.append('customer_name', customer_name);
    data.append('billerId', company_name);
    data.append('rma_case_number', this.add_ram_issue_form.value.rma_case_no);
    data.append('rma_serial_number', product_serial_no);
    data.append('product_category_id', product_category);
    data.append('product_id', product_name);
    data.append('problem_type', this.add_ram_issue_form.value.problem_type);
    data.append(
      'issue_details',
      this.add_ram_issue_form.value.ramIssue_description
    );
    data.append(
      'cause_details',
      this.add_ram_issue_form.value.ramCause_description
    );
    data.append(
      'conclusion',
      this.add_ram_issue_form.value.conclusion_description
    );
    data.append(
      'conclusion_request',
      this.add_ram_issue_form.value.conclusion_appr_req
    );
    if (this.myFiles.length < 4) {
      for (let i = 0; i < this.myFiles.length; i++) {
        data.append('attachment_file[]', this.myFiles[i]);
      }
    }

    this.spinner.show();
    var self = this;
    $.ajax({
      type: 'POST',

      // url: 'https://erp1.cal4care.com/api/Rma/storeRmaIssue',
        url: this.serverService.urlFinal +'Rma/storeRmaIssue',
      //  url: "https://" + window.location.hostname + ":4003/api/v1.0/index_new.php",
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        // console.log('result', result);
        if (result.status == true || result.status == 'true') {
          $('#add_rma_issue_popup').modal('hide');
          self.getRMAIssueListData({});
          // console.log(result);
          self.add_ram_issue_form.reset();

          iziToast.success({
            message: 'RMA Issue Successfully Stored',
            position: 'topRight',
          });
          self.spinner.hide();
        } else {
          self.spinner.hide();

          iziToast.warning({
            message: 'RMA Issue details not Saved',
            position: 'topRight',
          });
        }
      },
      error: function (err: any) {
       // this.spinner.hide();
        console.log('err', err);
        iziToast.error({
          message: 'Server Side Error',
          position: 'topRight',
        });
      },
    });

    this.spinner.hide();
  }

  // ///////////////////////////////    EDIT Drop Down  ////////////////////////////////

  editgetCustomerList(event: any) {
    let searchKey = event.target.value.trim();
    let billerID = this.edit_ram_issue_form.get('edit_company_name')?.value;

    if (!searchKey) {
      this.edit_customer_name_list = [];
      return;
    }

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/get_customer_name',
      api_type: 'web',
      element_data: {
        action: 'get_customer_name',
        user_id: this.userId,
        key_word: searchKey,
        billerId: billerID,
      },
    };

    this.serverService.sendServerpath(requestObj).subscribe((response: any) => {
      if (response.customer_list && Array.isArray(response.customer_list)) {
        this.edit_customer_name_list = response.customer_list.filter(
          (customer: { customerName: string }) =>
            customer.customerName
              .toLowerCase()
              .includes(searchKey.toLowerCase())
        );
      } else {
        this.edit_customer_name_list = [];
      }
    });
  }

  editselectCustomer(customer: any) {
    this.edit_ram_issue_form.patchValue({
      edit_customer_name: customer.customerName, // Set customer name
      edit_customer_name_search: customer.customerId, // Set customer ID
    });

    this.edit_customer_name_list = []; // Clear dropdown list after selection
    this.editgetGenerateRmaNumber(); // Trigger related function
  }

  editgetGenerateRmaNumber() {
    var billerID = this.edit_ram_issue_form.value.edit_company_name;
    var customer_name = this.edit_ram_issue_form.value.edit_customer_name;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/generateRmaNumber',
      api_type: 'web',
      element_data: {
        action: 'generateRmaNumber',
        user_id: this.userId,
        customer_name: customer_name,
        billerId: billerID,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.edit_generateRmaNumber = response.rma_case_number;
      this.edit_generateRmaNumber_id = response.customerId;
    });
  }

  editgetserialNumber(event: any) {
    let searchKey = event.target.value.trim();

    if (!searchKey) {
      this.edit_serialNumber = [];
      return;
    }

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getserialNumber',
      api_type: 'web',
      element_data: {
        action: 'getserialNumber',
        customer_id: this.edit_generateRmaNumber_id,
        user_id: this.userId,
        serial_no: searchKey,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.data && Array.isArray(response.data)) {
        this.edit_serialNumber = response.data.filter(
          (item: { product_serial_number: string }) =>
            item.product_serial_number
              .toLowerCase()
              .includes(searchKey.toLowerCase())
        );
      } else {
        this.edit_serialNumber = [];
      }
    });
  }

  editselectserialNo(serial: any) {
    this.edit_ram_issue_form.patchValue({
      edit_product_serial_no: serial.product_serial_number, // Set product serial number
      edit_product_serial_no_search: serial.serial_id || '', // If serial_id exists, set it
    });

    this.edit_serialNumber = [];
  }

  edit_getProductsByCategorylist() {
    var product_category = this.edit_ram_issue_form.value.edit_product_category;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getProductsByCategory',
      api_type: 'web',
      element_data: {
        action: 'getProductsByCategory',
        user_id: this.userId,
        category_id: product_category,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      this.edit_product_name_list = response.productList;

      if (this.selectedProductId) {
        const matchingProduct = this.edit_product_name_list.find(
          (product: { productId: number }) =>
            product.productId === this.selectedProductId
        );

        if (matchingProduct) {
          this.edit_ram_issue_form.patchValue({
            edit_product_name: this.selectedProductId,
          });
        }
      }
    });
  }

  closeModal() {
    // Reset selected product when closing the modal
    this.selectedProductId = null;

    this.edit_ram_issue_form.reset();
  }

  editRmaIssue(id: any) {
    this.editRMAIssueId=id;
    this.spinner.show();

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/editRmaIssue',
      api_type: 'web',
      element_data: {
        action: 'editRmaIssue',
        user_id: this.userId,
        rma_issue_id: id,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        var userData = response.data;

        this.edit_ram_issue_form.patchValue({
          edit_company_name: userData.billerId,
          edit_customer_name: userData.customer_name,
          edit_rma_case_no: userData.rma_case_number,
          edit_product_serial_no: userData.rma_serial_number,
          edit_product_category: userData.product_category_id,
          edit_product_name: userData.product_id,
          edit_problem_type: userData.problem_type,
          edit_ramIssue_description: userData.issue_details,
          edit_ramCause_description: userData.cause_details,
          edit_conclusion_description: userData.conclusion,
          edit_conclusion_appr_req: userData.conclusion_request,
        });

        this.fileUrl = userData.attachment_file;
        this.user_id = userData.rma_issue_id;
        this.selectedProductId = userData.product_id;
        this.edit_getProductsByCategorylist();
        this.editgetGenerateRmaNumber();
        this.spinner.hide();
        $('#edit_rma_issue_popup').modal('show');
      }
    });
  }

  UpdateRmaIssue_new() {
    
    let company_name = this.edit_ram_issue_form.value.edit_company_name;
    let customer_name = this.edit_ram_issue_form.value.edit_customer_name;
    let product_serial_no =
      this.edit_ram_issue_form.value.edit_product_serial_no;
    let product_category = this.edit_ram_issue_form.value.edit_product_category;
    let product_name = this.edit_ram_issue_form.value.edit_product_name;

    if (
      company_name === '' ||
      company_name === null ||
      company_name === undefined ||
      company_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Company Name`,
        position: 'topRight',
      });

      return false;
    }
    if (
      customer_name === '' ||
      customer_name === null ||
      customer_name === undefined ||
      customer_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Enter Customer Name`,
        position: 'topRight',
      });

      return false;
    }
    if(product_serial_no === '' ||product_serial_no === null || product_serial_no === undefined || product_serial_no==='undefined'){

      iziToast.warning({
        message: `Please Enter Product Serial Number )`,
        position: 'topRight',
      });

      return false;
    }
    if (
      product_category === '' ||
      product_category === null ||
      product_category === undefined ||
      product_category === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Product Category`,
        position: 'topRight',
      });

      return false;
    }
    if (
      product_name === '' ||
      product_name === null ||
      product_name === undefined ||
      product_name === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Product Name`,
        position: 'topRight',
      });

      return false;
    }

    this.spinner.show();
    var data = new FormData();
    data.append('user_id', this.userId);
    data.append('customer_id', this.edit_generateRmaNumber_id);
    data.append('customer_name', customer_name);
    data.append('billerId', company_name);
    data.append(
      'rma_case_number',
      this.edit_ram_issue_form.value.edit_rma_case_no
    );
    data.append('rma_serial_number', product_serial_no);
    data.append('product_category_id', product_category);
    data.append('product_id', product_name);
    data.append('rma_issue_id',this.editRMAIssueId);
    data.append(
      'problem_type',
      this.edit_ram_issue_form.value.edit_problem_type
    );
    data.append(
      'issue_details',
      this.edit_ram_issue_form.value.edit_ramIssue_description
    );
    data.append(
      'cause_details',
      this.edit_ram_issue_form.value.edit_ramCause_description
    );
    data.append(
      'conclusion',
      this.edit_ram_issue_form.value.edit_conclusion_description
    );
    data.append(
      'conclusion_request',
      this.edit_ram_issue_form.value.edit_conclusion_appr_req
    );
    if (this.myFiles.length < 4) {
      for (let i = 0; i < this.myFiles.length; i++) {
        data.append('attachment_file[]', this.myFiles[i]);
      }
    }

    var self = this;
    $.ajax({
      type: 'POST',

       url:this.serverService.urlFinal + 'Rma/updateRmaIssue',
      //  url: 'https://erp1.cal4care.com/api/Rma/updateRmaIssue',
      //  url: "https://" + window.location.hostname + ":4003/api/v1.0/index_new.php",
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        // console.log('result', result);
        if (result.status == true || result.status == 'true') {
          $('#edit_rma_issue_popup').modal('hide');
          self.getRMAIssueListData({});
          // console.log(result);
          self.edit_ram_issue_form.reset();

          iziToast.success({
            message: 'RMA Issue Successfully Update',
            position: 'topRight',
          });
          self.spinner.hide();
        } else {
          self.spinner.hide();

          iziToast.warning({
            message: 'RMA Issue details not Saved',
            position: 'topRight',
          });
        }
      },
      error: function (err: any) {
        this.spinner.hide();
        console.log('err', err);
        iziToast.error({
          message: 'Server Side Error',
          position: 'topRight',
        });
      },
    });

    this.spinner.hide();
  }

  deleteRmaIssue(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        let requestObj = {
          moduleType: 'Rma',
          api_url: 'Rma/deleteRmaIssue',
          api_type: 'web',
          element_data: {
            action: 'deleteRmaIssue',
            user_id: this.userId,
            rma_issue_id: id,
          },
        };

        let api_req: any = JSON.parse(JSON.stringify(requestObj));

        this.serverService
          .sendServerpath(api_req)
          .subscribe((response: any) => {
            //console.log(response);
            if (response.status == true) {
              iziToast.success({
                message: 'RMA Issue deleted successfully',
                position: 'topRight',
              });
              this.getRMAIssueListData({});
            } else {
              iziToast.warning({
                message: 'RMA Issue not deleted, Please try again!',
                position: 'topRight',
              });
            }
          });
      }
    });
  }

  // /////////////////////////////////  mail .////////////////////////

  Email(id: any) {
    // this.emailForm.reset();
    $('#emailFrom').val('');
    $('#template').val('');
    $('#subject').val('');
    this.msg_id = '';
    tinymce.activeEditor.setContent('');
    $('#TextEditorId').modal('show');

    this.rma_issue_id = id;

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getEmailDatas',
      api_type: 'web',
      element_data: {
        action: 'getEmailDatas',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.email_fromList = response.fromEmails;
        this.email_crmTemplateList = response.rmaTemplateList;
        this.emailbillerName = response.billerName;
        this.getCustomerEmail = response.getCustomerEmail;
        this.getCustomerEmailCompany = response.getCustomerEmail.email;
        this.fileUrl = response.attachment;

        // this.emailForm.patchValue({

        //   'email_to': response.to_email,

        // });
      }
    });
  }

  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    if (this.Select_To_Type_radiobox_Value === 'company') {
      this.emailForm.patchValue({ email_to: this.getCustomerEmail.email });
    } else if (this.Select_To_Type_radiobox_Value === 'finance') {
      this.emailForm.patchValue({
        email_to: this.getCustomerEmail.finance_email,
      });
    }
  }

  templateContentEmailDropdown(event: any) {
    this.Rma_Emailtemplate_id = event.target.value;
    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/getTemplateData',
      api_type: 'web',
      element_data: {
        action: 'getTemplateData',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
        template_id: this.Rma_Emailtemplate_id,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      //  console.log("quotation-template Dropdown response", response)

      if ((response.status = true)) {
        this.messageContent = response.crm_template_content;
        this.mailContent = tinymce
          .get('tinyID_RMA')
          .setContent('<p>' + this.messageContent + '</p>');

        this.emailForm.patchValue({
          Subject_Content: response.crm_subject_name,

          tinyID_RMA: this.mailContent,
        });
      } else {
        this.emailForm.patchValue({
          email_template: '',
        });
      }
    });
  }

  sendMail() {
    let email_From = this.emailForm.value.email_From;
    let Subject_Content = this.emailForm.value.Subject_Content;
    let email_template = this.emailForm.value.email_template;
    let email_to_string = this.emailForm.value.email_to;
    let email_to = email_to_string.split(',');
    var message_contend = tinymce.get('tinyID_RMA').getContent();

    if (
      email_From === '' ||
      email_From === null ||
      email_From === undefined ||
      email_From === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select From )`,
        position: 'topRight',
      });

      return false;
    }
    if (
      email_to_string === '' ||
      email_to_string === null ||
      email_to_string === undefined ||
      email_to_string === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Enter To email )`,
        position: 'topRight',
      });

      return false;
    }
    if (
      email_template === '' ||
      email_template === null ||
      email_template === undefined ||
      email_template === 'undefined'
    ) {
      iziToast.warning({
        message: `Please Select Template )`,
        position: 'topRight',
      });

      return false;
    }

    this.spinner.show();

    let requestObj = {
      moduleType: 'Rma',
      api_url: 'Rma/sendRmaEmail',
      api_type: 'web',
      element_data: {
        action: 'sendRmaEmail',
        user_id: this.userId,
        rma_issue_id: this.rma_issue_id,
        template_id: email_template,
        crm_subject_name: Subject_Content,
        email_from: email_From,
        to_email: email_to,
        crm_template_content: message_contend,
        billerName: this.emailbillerName,
      },
    };

    let api_req: any = JSON.parse(JSON.stringify(requestObj));

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if ((response.status = true)) {
        iziToast.success({
          message: response.message,
          position: 'topRight',
        });
        $('#TextEditorId').modal('hide');
        this.getRMAIssueListData({});
        this.spinner.hide();
      }
    });
  }

  emailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.getRMAIssueListData({});
    tinymce.activeEditor.setContent('');
  }
}
