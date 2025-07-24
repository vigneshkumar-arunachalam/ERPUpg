import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { identity } from 'rxjs';


declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-deliverychallan',
  templateUrl: './deliverychallan.component.html',
  styleUrls: ['./deliverychallan.component.css']
})
export class DeliverychallanComponent implements OnInit {

  // public addDelivery_section: FormGroup;

  dcBillerList: any[] = [];
  dcBillerList1: any[] = [];
  selectedBillers: number[] = [];
  deliveryChallans: any[] = [];
  filteredChallans: any[] = [];
  searchTerm: string = "";
  //products: any[] = [{}];

  currentPage: number = 1;
  pageLimit: number = 25;
  totalPages: number = 0;
  storebillerid: any;

  dcDate: string = '';
  dcno: string = '';
  tinName: string = 'TIN Name';
  tinNo: string = '';
  cstName: string = 'CST Name';
  cstNo: string = '';
  selectedCompanyId: any;
  companyName: any;

  fieldErrors: any = {};

  deliveryData = {
    customerName: '',
    customerAddress1: '',
    customerAddress2: '',
    customerAddress3: '',
    dispatchThrough: '',
    reference: '',
    remarks: ''
  };

  products = [
    { name: '', quantity: '', description: '' }
  ];
 

searchResult: any[] = [];
keywordCustomerName = 'customerName';
deliveryData1: any;
value: string;
  store: any;
  editdeliverypar: any;
  editdeliverychild: any;
  edit_dcNo: any;
  edit_companyName: any;
  edit_dcDate: any;
  edit_gstNo: any;
  edit_regNo: any;
  edit_customerName: any;
  edit_address1: any;
  edit_address2: any;
  edit_address3: any;
  edit_dispatch: any;
  edit_reference: any;
  edit_customerAddress1: any;
  edit_customerAddress2: any;
  edit_customerAddress3: any;
  edit_billerId: any;

  edit_productName: any;
  edit_productQuantity: any;
  edit_productDescription: any;
  edit_deliveryData1: any;
  edit_customerId: any;
  edit_remarks: any;
  v: any;
  
  
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDcBillerList();
    this.getDeliveryChallanDetails();
    const today = new Date();
    this.dcDate = today.toISOString().split('T')[0];
  
    this.deliveryData1 = {
      customerName: '',
      address1: '',
      address2: '',
      address3: ''
    };
    this.editProduct();
     
  
  
  }


  addProduct() {
    this.products.push({ name: '', quantity: '', description: '' });
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
 
  }
 editProduct() {
    this.editdeliverychild.push({ name: '', quantity: '', description: '' });
  }


 

  onSubmitChallan() {
    this.fieldErrors = {}; 
    let hasError = false;
    console.log('test',this.deliveryData1.customerName);
    console.log('test1',this.selectedCompanyId);
    console.log('test2',this.dcno);
    console.log('test3',this.dcDate);
    console.log('test4',this.deliveryData1.address1);
    console.log('test5',this.products[0].name);
    console.log('test6',this.products[0].quantity);
    
    if (!this.selectedCompanyId) {
      this.fieldErrors.companyId = true;
      hasError = true;
    }
    if (!this.dcno) {
      this.fieldErrors.dcno = true;
      hasError = true;
    }
    if (!this.dcDate) {
      this.fieldErrors.dcDate = true;
      hasError = true;
    }
    if (!this.deliveryData1.customerName) {
      this.fieldErrors.customerName = true;
      hasError = true;
    }
    if (!this.deliveryData1.address1) {
      this.fieldErrors.address1 = true;
      hasError = true;
    }
    if (!this.products[0].name) {
      this.fieldErrors.productName = true;
      hasError = true;
    }
    if (!this.products[0].quantity) {
      this.fieldErrors.productQty = true;
      hasError = true;
    }
  
    if (hasError) {
      iziToast.error({
        title: 'Error',
        message: 'Please fill in all required fields.',
        position: 'topRight'
      });
      return;
    }
  
  
  
    const payload = {
      moduleType: "deliveryChallan",
      api_url: "deliveryChallan/createDeliveryChallan",
      api_type: "web",
      access_token: "",
      element_data: {
        action: "createDeliveryChallan",
        user_id: "39",  
        dcNo: this.dcno,
        dcDate: this.dcDate,
        billerId: this.selectedCompanyId,
        customerId: "",
        customerName: this.deliveryData1.customerName,
        customerAddress1: this.deliveryData1.address1,
        customerAddress2: this.deliveryData1.address2,
        customerAddress3: this.deliveryData1.address3,
        dispatchThrough: this.deliveryData1.dispatchThrough,
        tinNo: this.tinNo,
        cstNo: this.cstNo,
        reference: this.deliveryData1.reference,
        remarks: this.deliveryData1.remarks,
        signatureChk: "",
        product_value: this.products.map(p => ({
          productName: p.name,
          quantity: p.quantity,
          productDesc: p.description
        }))
      }
    };
  
    this.http.post('https://laravelapi.erp1.cal4care.com/api/deliveryChallan/createDeliveryChallan', payload)
      .subscribe({
        next: (res: any) => {
          iziToast.success({
            title: 'Success',
            message: 'Delivery Challan submitted successfully!',
            position: 'topRight'
          });
          console.log('API Success:', res);

          $('#popup1').modal('hide')

        },
        error: (err) => {
          iziToast.error({
            title: 'Error',
            message: 'An error occurred during submission.',
            position: 'topRight'
          });
          console.error('API Error:', err);
        }
      });
  }
  


  onCustomerInputChanged(keyword: any) {
    this.store = keyword;
  
    const payload = {
      moduleType: "base",
      api_url: "base/getCustomerList",
      api_type: "web",
      access_token: "",
      element_data: {
        action: "getCustomerList",
        user_id: 39,
        keyword: this.store
      }
    };
  
    this.http.post('https://laravelapi.erp1.cal4care.com/api/base/getCustomerList', payload)
      .subscribe(
        (res: any) => {
          console.log('API Response:', res);
          this.searchResult = res.data;
        },
        (err) => {
          console.error('API Error:', err);
        }
      );
  }
  


  onCustomerSelected(event: any) {
    this.deliveryData1.customerName = event.customerName;
    const customerId = event.customerId; // FIXED!
  
    const payload = {
      moduleType: "base",
      api_url: "base/getCustomerListiwithadderess",
      api_type: "web",
      access_token: "",  
      element_data: {
        action: "getCustomerListiwithadderess",
        user_id: 39,
        customerId: customerId
      }
    };
  
    this.http.post('https://laravelapi.erp1.cal4care.com/api/base/getCustomerListiwithadderess', payload)
      .subscribe(
        (res: any) => {
          console.log(' Address Response:', res);
          if (res.status && res.data) {
            this.deliveryData1.address1 = res.data.address1 || '';
            this.deliveryData1.address2 = res.data.address2 || '';
            this.deliveryData1.address3 = res.data.address3 || '';
          }
        },
        (err) => {
          console.error('Address Fetch Error:', err);
        }
      );
  }
  
  

  edit_onCustomerSelected(event: any) {
    this.edit_customerName = event.customerName;
    const customerId = event.customerId; // FIXED!
  
    const payload = {
      moduleType: "base",
      api_url: "base/getCustomerListiwithadderess",
      api_type: "web",
      access_token: "",  
      element_data: {
        action: "getCustomerListiwithadderess",
        user_id: 39,
        customerId: customerId
      }
    };
  
    this.http.post('https://laravelapi.erp1.cal4care.com/api/base/getCustomerListiwithadderess', payload)
      .subscribe(
        (res: any) => {
          console.log(' Address Response:', res);
          if (res.status && res.data) {
            this.edit_customerAddress1 = res.data.address1 || '';
            this.edit_customerAddress2 = res.data.address2 || '';
            this.edit_customerAddress3= res.data.address3|| '';
          }
        },
        (err) => {
          console.error('Address Fetch Error:', err);
        }
      );
  }
  
  


  getDcBillerList() {
    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getDcbillerList';
    const requestData = {
      moduleType: 'deliveryChallan',
      api_url: 'deliveryChallan/getDcbillerList',
      api_type: 'web',
      access_token: 'YOUR_ACCESS_TOKEN',
      element_data: {
        action: 'getDcbillerList',
        user_id: '39'
      }
    };

    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        if (response && response.billerList) {
          this.dcBillerList = response.billerList;
        } else {
          this.dcBillerList = [];
        }
      },
      (error) => {
        console.error("API Request Failed:", error);
      }
    );
  }

  selectBiller(event: any, billerId: number) {
    if (event.target.checked) {
      this.selectedBillers.push(billerId);
    } else {
      this.selectedBillers = this.selectedBillers.filter(id => id !== billerId);
    }
  }

  getDcBillerList1(billerId: any) {
    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getDcbillerList';
    const requestData = {
      moduleType: 'deliveryChallan',
      api_url: 'deliveryChallan/getDcbillerList',
      api_type: 'web',
      access_token: '',
      element_data: {
        action: 'getDcbillerList',
        user_id: '39',
        billerId: billerId
      }
    };

    this.http.post(apiUrl, requestData).subscribe((response: any) => {
      if (response && response.billerList) {
       
        this.dcBillerList1 = response.billerList;
        this.selectedCompanyId = response.billerId;
        this.cstName = response.cstName;
        this.dcno = response.dcno;
        this.tinNo = response.tinNo;
        this.cstNo = response.cstNo;
        this.tinName = response.tinName;
      }
    });
  }
  getDcBillerListEdit(billerId: any) {
    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getDcbillerList';
    const requestData = {
      moduleType: 'deliveryChallan',
      api_url: 'deliveryChallan/getDcbillerList',
      api_type: 'web',
      access_token: '',
      element_data: {
        action: 'getDcbillerList',
        user_id: '39',
        billerId: billerId
      }
    };

    this.http.post(apiUrl, requestData).subscribe((response: any) => {
      if (response && response.billerList) {
       
        this.dcBillerList1 = response.billerList;
        this.selectedCompanyId = response.billerId;
        this.cstName = response.cstName;
        this.edit_dcNo = response.dcno;
        this.tinNo = response.tinNo;
        this.cstNo = response.cstNo;
        this.tinName = response.tinName;
      }
    });
  }

  

  getDeliveryChallanDetails() {
    const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getDeliveryChallanDetails';
    const requestData = {
      moduleType: 'deliveryChallan',
      api_url: 'deliveryChallan/getDeliveryChallanDetails',
      api_type: 'web',
      access_token: 'YOUR_ACCESS_TOKEN',
      element_data: {
        action: 'getDeliveryChallanDetails',
        user_id: '39',
        
        search_txt: this.searchTerm,
        biller_id: this.selectedBillers.join(','),

        limit: this.pageLimit,
        offset: (this.currentPage - 1) * this.pageLimit
      }
    };

    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.deliveryChallans = response.data;
          this.filteredChallans = response.data;
          this.totalPages = Math.ceil(response.totalCount / this.pageLimit);
        } else {
          this.deliveryChallans = [];
          this.filteredChallans = [];
        }
      }, 
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteDeliveryChallan(dcId:any) {
    const dcIds=dcId;
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
        const apiUrl = 'https://laravelapi.erp1.cal4care.com/api/deliveryChallan/deleteDeliveryChallan';
        const requestData = {
          moduleType: "deliveryChallan",
          api_url: "deliveryChallan/deleteDeliveryChallan",
          api_type: "web",
          access_token: "your_token_here",
          element_data: {
            action: "deleteDeliveryChallan",
            user_id: localStorage.getItem('erp_c4c_user_id'),
            dcId: dcIds
          }
        };

        this.http.post(apiUrl, requestData).subscribe(
          (response: any) => {
            if (response.status === true) {
              iziToast.success({ message: "Successfully deleted", position: 'topRight' });
              setTimeout(() => this.getDeliveryChallanDetails(), 500);
              $('#actionpop').modal('hide')
            } else {
              iziToast.warning({
                message: "Sorry, No Matching Data",
                position: 'topRight'
              });
            }
          },
          (error) => console.error("Error deleting Delivery Challan:", error)
        );
      }
    });
  }

  selectedItem: any;
  selectedIndex: number;

  open_pop(id: any, index: any) {
    this.selectedItem = id;
    this.selectedIndex = index;
  }

  filterChallans() {
    this.filteredChallans = this.deliveryChallans.filter(challan =>
      challan.customerName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getDeliveryChallanDetails();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDeliveryChallanDetails();
    }
  }

  // addProduct() {
  //   this.products.push({});
  // }

  // removeProduct(index: number) {
  //   this.products.splice(index, 1);
  // }

  getevent(event: any) {
    this.storebillerid = event.target.value;
    this.selectedCompanyId = this.storebillerid;
    this.getDcBillerList1(this.storebillerid);
  }

  geteventBill(event: any) {
      
    this.storebillerid = event.target.value;
    this.selectedCompanyId = this.storebillerid;
    this.getDcBillerListEdit(this.storebillerid);
  }

  onAddButtonClick() {
    this.getDcBillerList1(this.storebillerid);  
  }

  // editcustomer(id:any)
  // {
    
  //   console.log("🤩🤩🤩DCIDveera",id);
  // }


  // editcustomer() {
  //  const dcId = this.selectedItem;
  //   console.log("Edits",dcId)
  //   const requestBody = {
  //     moduleType: "deliveryChallan",
  //     api_url: "deliveryChallan/getEditDeliveryChallan",
  //     api_type: "web",
  //     access_token: "",
  //     element_data: {
  //       action: "getEditDeliveryChallan",
  //       user_id: localStorage.getItem('erp_c4c_user_id'),
  //       dcId: dcId
  //     }
  //   };
  
  //   console.log(" Sending Request for DC ID:", dcId);
  
  //   this.http.post<any>('https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getEditDeliveryChallan', requestBody).subscribe(
  //     res => {
  //       console.log("Response received:", res);  
  
  //       if (res.status && res.data) {
          
  //         console.log("Data to fill form:", res.data);  
  //         this.editdeliverypar = res.data.dcparent;
  //         this.editdeliverychild = res.data.dcchild;
  //         // console.log("🤷‍♀️REspaonce veera:",this.editdeliverychild)
  //         // console.log("index:",this.editdeliverychild[0]);
  //         // this.edit_companyName = this.editdeliverypar.customerName;
  //         this.edit_billerId = this.editdeliverypar.billerId;
  //         this.edit_dcNo = this.editdeliverypar.dcNo;
  //         this.edit_dcDate = this.editdeliverypar.dcDate;
  //         this.edit_regNo = this.editdeliverypar.tinNo;
  //         this.edit_gstNo = this.editdeliverypar.cstNo;
  //         console.log("fdfdf",this.editdeliverypar.customerName);
  //         this.edit_customerName = this.editdeliverypar.customerName;
  //         this.edit_customerId = this.editdeliverypar.customerId;
  //         this.edit_remarks = this.editdeliverypar.remarks;
  //         console.log("hhs",this.edit_customerName);
          
  //         this.edit_customerAddress1= this.editdeliverypar.customerAddress1;
  //         this.edit_customerAddress2= this.editdeliverypar.customerAddress2;
  //         this.edit_customerAddress3= this.editdeliverypar.customerAddress3;
  //         this.edit_dispatch =  this.editdeliverypar.dispatchThrough;
  //         this.edit_reference= this.editdeliverypar.reference;
          

  //         // this.getDcBillerList1(this.edit_billerId);
  //         var len=res.data.dcchild;

  //         this.editdeliverychild = res.data.dcchild.map((child: any) => ({
  //           name: child.productName,
  //           quantity: child.qty,
  //           description: child.productDesc,
  //           dcId:child.dcId,
  //           dcChildId:child.dcChildId
  //         }));
          

  //        this.getDcBillerList1(this.edit_billerId);



  //       } else {
  //         console.warn("No data found or error in response");
  //       }
  //     },
  //     error => {
  //       console.error("API call failed:", error);
  //     }
  //   );
  // }

  

  editcustomer(challan: any) {
    $('#popedit').modal('show')
    const dcId = challan.dcId;  // get ID from the clicked challan
    this.selectedItem = dcId;   // store it as selected if you still use selectedItem
  
    console.log("Edits", dcId);
  
    const requestBody = {
      moduleType: "deliveryChallan",
      api_url: "deliveryChallan/getEditDeliveryChallan",
      api_type: "web",
      access_token: "",
      element_data: {
        action: "getEditDeliveryChallan",
        user_id: localStorage.getItem('erp_c4c_user_id'),
        dcId: dcId
      }
    };
  
    this.http.post<any>('https://laravelapi.erp1.cal4care.com/api/deliveryChallan/getEditDeliveryChallan', requestBody).subscribe(
      res => {
        if (res.status && res.data) {
          this.editdeliverypar = res.data.dcparent;
          this.editdeliverychild = res.data.dcchild;
  
          this.edit_billerId = this.editdeliverypar.billerId;
          this.edit_dcNo = this.editdeliverypar.dcNo;
          this.edit_dcDate = this.editdeliverypar.dcDate;
          this.edit_regNo = this.editdeliverypar.tinNo;
          this.edit_gstNo = this.editdeliverypar.cstNo;
          this.edit_customerName = this.editdeliverypar.customerName;
          this.edit_customerId = this.editdeliverypar.customerId;
          this.edit_remarks = this.editdeliverypar.remarks;
          this.edit_customerAddress1 = this.editdeliverypar.customerAddress1;
          this.edit_customerAddress2 = this.editdeliverypar.customerAddress2;
          this.edit_customerAddress3 = this.editdeliverypar.customerAddress3;
          this.edit_dispatch = this.editdeliverypar.dispatchThrough;
          this.edit_reference = this.editdeliverypar.reference;
  
          this.editdeliverychild = res.data.dcchild.map((child: any) => ({
            name: child.productName,
            quantity: child.qty,
            description: child.productDesc,
            dcId: child.dcId,
            dcChildId: child.dcChildId
          }));
  
          this.getDcBillerList1(this.edit_billerId);
        } else {
          console.warn("No data found or error in response");
        }
      },
      error => {
        console.error("API call failed:", error);
      }
    );
  }
  


  updateDeliveryChallan() {
    const requestBody = {
      moduleType: "deliveryChallan",
      api_url: "deliveryChallan/updateDeliveryChallan",
      api_type: "web",
      access_token: "",
      element_data: {
        action: "updateDeliveryChallan",
        user_id: "39",
        dcId: this.editdeliverypar.dcId,
        dcNo: this.edit_dcNo,
        dcDate: this.edit_dcDate,
        billerId: this.edit_billerId,
        customerId: this.edit_customerId,
        customerName: this.edit_customerName,
        customerAddress1: this.edit_customerAddress1,
        customerAddress2: this.edit_customerAddress2,
        customerAddress3: this.edit_customerAddress3,
        dispatchThrough: this.edit_dispatch,
        tinNo: this.editdeliverypar.tinNo || '',   
        cstNo: this.editdeliverypar.cstNo || '',  
        reference: this.edit_reference,
        remarks: this.edit_remarks,
        signatureChk: "1", 
        product_value: this.editdeliverychild.map((product: any) => ({
          dcChildId: product.dcChildId || '',  
          productName: product.name,
          quantity: product.quantity,
          productDesc: product.description
        }))
      }
    };
  
    console.log("Sending Update Request:", requestBody);
  
    this.http.post<any>('https://laravelapi.erp1.cal4care.com/api/deliveryChallan/updateDeliveryChallan', requestBody).subscribe(
      res => {
        console.log("Update Response:", res);
        if (res.status) {
          iziToast.success({ message: "Successfully updated", position: 'topRight' });
          setTimeout(() => this.getDeliveryChallanDetails(), 500);
          $('#popedit').modal('hide')

        } else {
                iziToast.warning({
                message: "Sorry, Not updated",
                position: 'topRight'
              });
        }
      },
      error => {
        console.error("Update API error:", error);

      }
    );
  }
  
  searchDeliveryChallanFromModal() {
    this.searchTerm = this.edit_customerName?.customerName || this.edit_customerName || '';
    console.log("Selected Billers:", this.selectedBillers);
    console.log("Search Term:", this.searchTerm);
  
    this.getDeliveryChallanDetails();

    $('#searchpop').modal('hide')
  }
  
  



  deleteProductRow(dcId:any,dcchildId:any,i:any) {

    console.log("dcId", dcId);
    console.log("dcChildId",dcchildId);
    console.log("index", i);
    const requestBody = {
      moduleType: "deliveryChallan",
      api_url: "deliveryChallan/deleteDeliveryChallanChildRow",
      api_type: "web",
      access_token: "",   
      element_data: {
        action: "deleteDeliveryChallanChildRow",
        user_id: "39",  
        dcId: dcId,   
        dcchildId: dcchildId,
        index:i
      }
    };
 
    this.http.post<any>('https://laravelapi.erp1.cal4care.com/api/deliveryChallan/deleteDeliveryChallanChildRow', requestBody)
    .subscribe(res => {
      if (res.status === true) {
        this.editdeliverychild.splice(i, 1);
        
      } else {
        console.error("Error deleting product:", res.message);
      }
    }, error => {
      console.error("API call failed:", error);
    });
  }


  // editremoveProduct(index: number) {
  //   // Get the dcId and dcchildId for the selected product
  //   const dcId = this.editdeliverypar.dcId;
  //   const dcchildId = this.editdeliverychild[index].dcchildId; // Ensure dcchildId exists in your data
  
  //   // Call the API to delete the product row from the backend
  //   this.deleteProductRow(dcId, dcchildId, index);
  // }
  
  

   editremoveProduct(index: number) {
     this.editdeliverychild.splice(index, 1);
     
    }

  
}
