import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
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
declare var tinymce: any;
@Component({
  selector: 'app-erp-app-permission',
  templateUrl: './erp-app-permission.component.html',
  styleUrls: ['./erp-app-permission.component.css'],
})
export class ErpAppPermissionComponent implements OnInit {
  //pagination
  recordNotFound = false;
  recordNotFound_new = false;
  pageLimit = 100;
  paginationData: any = { info: 'hide' };
  offset_count = 0;

  //  list

  userId: any;
  user_id: any;
  erp_app_permission_list: any;
  normal_users_list: any;
  searchResult: any;
  erpAppUser: boolean = true;

  editData: FormGroup;
  editpopupList_header: any;
  editpopUpListCount: any;
  permissionsList: any;
  user: any;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('erp_c4c_user_id');

    this.getErpAppPermissionList({});

    this.http
      .get<any>(
        'https://laravelapi.erp1.cal4care.com/api/userAppPermission/getAppPermissions'
      )
      .subscribe((data: any) => {
        this.editpopupList_header = data.data;
        console.log('this.editpopupList_header', this.editpopupList_header);
      });

    this.editData = new FormGroup({
      erp_app_access: new FormControl(null),
      erp_customer_master: new FormControl(null),
      erp_quotation: new FormControl(null),
      erp_quotation_comment: new FormControl(null),
      erp_did_number: new FormControl(null),
      erp_crm: new FormControl(null),
      erp_crm_my_leads: new FormControl(null),
      erp_customer_approval: new FormControl(null),
      erp_3cx_api_credit: new FormControl(null),
      erp_trun_over: new FormControl(null),
      erp_invoice: new FormControl(null),
      erp_customer_profile: new FormControl(null),
      erp_not_assigned_ticket: new FormControl(null),
      erp_force_logout: new FormControl(null),
      erp_white_list_ip: new FormControl(null),
      erp_credit_manager: new FormControl(null),
      erp_stock_list: new FormControl(null),
      erp_manual_whitelist: new FormControl(null),
      erp_dc_ip: new FormControl(null),
    });

    this.permissionsList = [
      { key: 'app_acc', description: 'ERP App Access' },
      { key: 'cus_mas', description: 'ERP Customer Master' },
      { key: 'quot', description: 'ERP Quotation' },
      { key: 'quot_comm', description: 'ERP Quotation Comment' },
      { key: 'did_num', description: 'ERP DID Number' },
      { key: 'crm', description: 'ERP CRM' },
      { key: 'crm_my_lead', description: 'ERP CRM My Leads' },
      { key: 'cus_approval', description: 'ERP Customer Approval' },
      { key: 'api_credit', description: 'ERP API Credit' },
      { key: 'turn_over', description: 'ERP Turn Over' },
      { key: 'sale_inv', description: 'ERP Invoice' },
      { key: 'cust_pro', description: 'ERP Customer Profile' },
      { key: 'not_ass_ticket', description: 'ERP Not Assigned Ticket' },
      { key: 'force_logout', description: 'ERP Force Logout' },
      { key: 'white_ip', description: 'ERP White List IP' },
      { key: 'credit_manager', description: 'ERP Credit Manager' },
      { key: 'stock_list', description: 'ERP Stock List' },
      { key: 'manual_whitelist', description: 'ERP Manual Whitelist' },
      { key: 'dc_ip', description: 'ERP DC IP' },
    ];

    this.editpopUpListCount.forEach((user: { permissionsString: string }) => {
      // Initialize permissionsString if it doesn't exist
      if (!user.permissionsString) {
        user.permissionsString = '';
      }
    });
  }

  slectAll() {
    // alert("sjd");
    if ($('#selectAllQ').prop('checked')) {
      // this.isSelected= true;
      $('.invalidContacts').prop('checked', true);
    } else {
      // this.isSelected= false;

      $('.invalidContacts').prop('checked', false);
    }
  }
  slectunique() {
    $('#selectAllQ').prop('checked', false);
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
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type =
      list_data.order_by_type == undefined ? 'desc' : list_data.order_by_type;
    list_data.limit =
      list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  getErpAppPermissionList(data: any) {
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let TNapi_req: any = new Object();
    api_req.moduleType = 'userAppPermission';
    api_req.api_url = 'userAppPermission/getUserList';
    api_req.api_type = 'web';
    api_req.access_token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI';
    TNapi_req.action = 'getUserList';
    TNapi_req.user_id = this.userId;
    TNapi_req.offset = list_data.offset;
    TNapi_req.limit = list_data.limit;
    TNapi_req.search_txt = '';
    api_req.element_data = TNapi_req;

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == 'success') {
        this.erp_app_permission_list = response.data.ERP_app_users;
        this.normal_users_list = response.data.Normal_users;
        //  console.log(this.erp_app_permission_list);
        this.paginationData = this.serverService.pagination({
          offset: response.offset,
          total: response.total_records,
          page_limit: this.pageLimit,
        });

        this.recordNotFound =
          this.erp_app_permission_list.length == 0 ? true : false;
        this.recordNotFound_new =
          this.normal_users_list.length == 0 ? true : false;
      }
    });
  }

  erp_app_users() {
    // console.log(this.agent_detailss)
    this.erpAppUser = true;
  }

  normal_app_users() {
    this.erpAppUser = false;
    // console.log(this.agent_detailss)
  }

  editUnique(id: any) {
    let api_req: any = `{"moduleType":"userAppPermission","api_url":"userAppPermission/groupEdit","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"groupEdit","user_id": [${id}]}}`;

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.editpopUpListCount = response;

        // Convert the array into an object
        let agentData = this.editpopUpListCount[0].permissions.reduce(
          (acc: any, perm: any) => {
            return { ...acc, ...perm };
          },
          {}
        );

        // Now patch the form with correct values
        this.editData.patchValue({
          erp_app_access: agentData.app_acc || false,
          erp_customer_master: agentData.cus_mas || false,
          erp_quotation: agentData.quot || false,
          erp_quotation_comment: agentData.quot_comm || false,
          erp_did_number: agentData.did_num || false,
          erp_crm: agentData.crm || false,
          erp_crm_my_leads: agentData.crm_my_lead || false,
          erp_customer_approval: agentData.cus_approval || false,
          erp_3cx_api_credit: agentData.api_credit || false,
          erp_trun_over: agentData.turn_over || false,
          erp_invoice: agentData.sale_inv || false,
          erp_customer_profile: agentData.cust_pro || false,
          erp_not_assigned_ticket: agentData.not_ass_ticket || false,
          erp_force_logout: agentData.force_logout || false,
          erp_white_list_ip: agentData.white_ip || false,
          erp_credit_manager: agentData.credit_manager || false,
          erp_stock_list: agentData.stock_list || false,
          erp_manual_whitelist: agentData.manual_whitelist || false,
          erp_dc_ip: agentData.dc_ip || false,
        });

        this.user_id = this.editpopUpListCount[0].user_id;

        $('#edit_erp_app_perm').modal('show');
      } else {
        iziToast.warning({
          message: 'Data could not retrive. Please try again',
          position: 'topRight',
        });
      }
    });
  }

  EditAll() {
    let i = 0;
    let invalidContacts: string[] = [];
    $('.invalidContacts:checked').each(function (this: HTMLElement) {
      invalidContacts[i++] = $(this).val() as string;
    });
    console.log(invalidContacts);

    if (invalidContacts.length == 0) {
      iziToast.warning({
        message: 'Please Choose atleast 1 User',
        position: 'topRight',
      });

      return false;
    }
    let api_req: any = `{"moduleType":"userAppPermission","api_url":"userAppPermission/groupEdit","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"groupEdit","user_id": [${invalidContacts}]}}`;

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response != '') {
        this.editpopUpListCount = response;

        for (i = 0; i < response.length; i++) {
          // Convert the array into an object
          let agentData = this.editpopUpListCount[i].permissions.reduce(
            (acc: any, perm: any) => {
              return { ...acc, ...perm };
            },
            {}
          );
          // Now patch the form with correct values
          this.editData.patchValue({
            erp_app_access: agentData.app_acc || false,
            erp_customer_master: agentData.cus_mas || false,
            erp_quotation: agentData.quot || false,
            erp_quotation_comment: agentData.quot_comm || false,
            erp_did_number: agentData.did_num || false,
            erp_crm: agentData.crm || false,
            erp_crm_my_leads: agentData.crm_my_lead || false,
            erp_customer_approval: agentData.cus_approval || false,
            erp_3cx_api_credit: agentData.api_credit || false,
            erp_trun_over: agentData.turn_over || false,
            erp_invoice: agentData.sale_inv || false,
            erp_customer_profile: agentData.cust_pro || false,
            erp_not_assigned_ticket: agentData.not_ass_ticket || false,
            erp_force_logout: agentData.force_logout || false,
            erp_white_list_ip: agentData.white_ip || false,
            erp_credit_manager: agentData.credit_manager || false,
            erp_stock_list: agentData.stock_list || false,
            erp_manual_whitelist: agentData.manual_whitelist || false,
            erp_dc_ip: agentData.dc_ip || false,
          });
        }

        // this.user_id = this.editpopUpListCount[0].user_id;
        $('#edit_erp_app_perm').modal('show');
      } else {
        iziToast.warning({
          message: 'Data could not retrive. Please try again',
          position: 'topRight',
        });
      }
    });
  }

  isPermissionChecked(user: any, permissionCode: string): boolean {
    // Ensure permissionsString is defined (initialize it if necessary)
    const permissionsString = user.permissionsString || '';

    // Check if the permission is in the permissions array or permissionsString
    return (
      user.permissions.some((p: { [key: string]: any }) => p[permissionCode]) ||
      permissionsString.includes(permissionCode)
    );
  }

  onCheckboxChangeAsString(
    event: any,
    userIndex: number,
    permissionCode: string
  ) {
    const user = this.editpopUpListCount[userIndex];

    // Initialize permissionsString if it doesn't exist
    if (!user.permissionsString) {
      user.permissionsString = '';
    }

    // Handle permission logic when checkbox changes
    if (event.target.checked) {
      // Add permission to permissionsString if it's not already there
      if (!user.permissionsString.includes(permissionCode)) {
        user.permissionsString += `,${permissionCode}`;
      }

      // Also add permission to the permissions array
      user.permissions.push({ [permissionCode]: true });
    } else {
      // Remove permission from permissionsString
      user.permissionsString = user.permissionsString.replace(
        `,${permissionCode}`,
        ''
      );

      // Also remove permission from the permissions array
      const permissionIndex = user.permissions.findIndex(
        (permission: { [x: string]: boolean }) =>
          permission[permissionCode] === true
      );
      if (permissionIndex !== -1) {
        user.permissions.splice(permissionIndex, 1);
      }
    }

    // console.log('Updated permissionsString:', user.permissionsString);
    // console.log('Updated permissions array:', user.permissions);
  }

  updateErpAppPermission() {
    const usersData = this.editpopUpListCount.map(
      (user: {
        permissionsString: string;
        user_id: any;
        permissions: any[];
      }) => {
        // Initialize permissionsString if it doesn't exist
        if (!user.permissionsString) {
          user.permissionsString = '';
        }

        // Create an array for permissions
        const permissionsArray = [];

        // Add permissions that are initially true (from editpopUpListCount)
        user.permissions.forEach((permission) => {
          Object.keys(permission).forEach((key) => {
            if (permission[key] === true) {
              permissionsArray.push(key); // Add the permission code if it's true
            }
          });
        });

        // Add permissions that are checked (from permissionsString)
        const additionalPermissions = user.permissionsString
          .split(',')
          .filter((permission) => permission); // Remove any empty strings

        // Merge initial permissions and checked permissions
        permissionsArray.push(...additionalPermissions);

        // Remove duplicates if any (in case the permission was initially true and then checked)
        const uniquePermissions = Array.from(new Set(permissionsArray));

        // Remove permissions that are unchecked
        const finalPermissions = uniquePermissions.filter(
          (permissionCode) => permissionCode !== ''
        );

        return {
          user_id: user.user_id,
          permissions: finalPermissions, // Store the unique permissions
        };
      }
    );

    // console.log(usersData); 

    var userPermissionData = JSON.stringify(usersData);

    let api_req: any =
      '{"moduleType":"userAppPermission","api_url":"userAppPermission/groupUpdatePermissions","access_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI","element_data":{"action":"groupUpdatePermissions","users": ' +
      userPermissionData +
      '}}';

    // console.log('API Request Payload:', api_req);

    this.serverService.sendServerpath(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $('.invalidContacts').prop('checked', false);
        $('#edit_erp_app_perm').modal('hide');
        this.getErpAppPermissionList({});
        iziToast.success({
          message: 'Permissions updated successfully for users.',
          position: 'topRight',
        });
      } else {
        iziToast.warning({
          message: 'Data could not retrive. Please try again',
          position: 'topRight',
        });
      }
    });
  }
}
