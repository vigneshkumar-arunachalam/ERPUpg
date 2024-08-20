import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2';
declare var tinymce: any;

@Component({
  selector: 'app-gstreport',
  templateUrl: './gstreport.component.html',
  styleUrls: ['./gstreport.component.css']
})
export class GstreportComponent implements OnInit {
  monthReportList: any;
  monthReportTotal: any;
  export_stateList: any[];
  turnReportList: any;
  turnReportTotal: any;
  yearsList: any;
  YearsForm:FormGroup;
  yearsValue: any=2024;
  turnoverTotal: any;
  currentYear: any;
  gstReturnList: any;

  constructor(private serverService: ServerService, private router: Router, private datePipe: DatePipe,
    private spinner: NgxSpinnerService, private route: ActivatedRoute, private injector: Injector, private http: HttpClient) { }


  ngOnInit(): void {
    this.YearsForm=new FormGroup({
      'years': new FormControl(),
    })
    this.getYears();
    this.getGSTReports();
    this.export_stateList=[]
   
  }
  yearChange(event:any){
    this.yearsValue=event.target.value;
    this.getGSTReports();

  }
  getYears() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "getYears"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "getYears";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
      this.yearsList=response.years;
      
   
      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
  quarter1(searchData: any[]): any{
    alert("hi")
    console.log("within list",searchData)

    const queryParams = searchData.map(data => 
      `billerId=${data.billerId}&Fromdt=${data.Fromdt}&Todt=${data.Todt}&performaType=${data.performaType}&invoiceType=${data.invoiceType}`
    ).join('&');
    const href = `quarter1?${queryParams}`;
    console.log('Generated href:', href);  // Add this line to log the generated URL
    return href;

   // this.router.navigate(['/invoiceReportsOld'])
  }
  redirectToInvReport(monthData: any) {
    if (monthData.color === 'Yes') {
      // Check if it's a subtotal row
      const searchData = monthData.searchData;
      if (searchData.length > 0) {
        // Redirect based on searchData
        const firstSearchData = searchData[0]; // Assuming only one search data for simplicity
        // Redirect logic here
        console.log('Redirecting with searchData:', firstSearchData);
        const Fromdt = firstSearchData.Fromdt;
        console.log("Fromdt",Fromdt);
        const Todt = firstSearchData.Todt;
        console.log("Todt",Todt);
        const billerId = firstSearchData.billerId;
        console.log("billerId",billerId);
        const invoiceType = firstSearchData.invoiceType;
        console.log("invoiceType",invoiceType);
        const performaType = firstSearchData.performaType;
        console.log("performaType",performaType);
        const redirect_status = firstSearchData.redirect_status;
        console.log("redirect_status",redirect_status);
        this.router.navigate(['/invoiceReportsOld'], {
          queryParams: {
            params_all: JSON.stringify(firstSearchData),
            Fromdt:Fromdt,
            Todt:Todt,
            billerId:billerId,
            invoiceType:invoiceType,
            performaType:performaType,
            redirect_status:redirect_status

          }
        });
      }
    }
  }
  redirectToPurEntReport(monthData: any) {
    if (monthData.color === 'Yes') {
      // Check if it's a subtotal row
      const searchData = monthData.searchData;
      if (searchData.length > 0) {
        // Redirect based on searchData
        const firstSearchData = searchData[0]; // Assuming only one search data for simplicity
        // Redirect logic here
        console.log('Redirecting with searchData:', firstSearchData);
        const Fromdt = firstSearchData.Fromdt;
        console.log("Fromdt",Fromdt);
        const Todt = firstSearchData.Todt;
        console.log("Todt",Todt);
        const billerId = firstSearchData.billerId;
        console.log("billerId",billerId);
        const invoiceType = firstSearchData.invoiceType;
        console.log("invoiceType",invoiceType);
        const performaType = firstSearchData.performaType;
        console.log("performaType",performaType);
        const redirect_status = firstSearchData.redirect_status;
        console.log("redirect_status",redirect_status);
        this.router.navigate(['/purchaseentryreport'], {
          queryParams: {
            params_all: JSON.stringify(firstSearchData),
            Fromdt:Fromdt,
            Todt:Todt,
            billerId:billerId,
            invoiceType:invoiceType,
            performaType:performaType,
            redirect_status:redirect_status

          }
        });
      }
    }
  }
  generateUrl(searchData: any[],index: number): string {
  return ;
    console.log('searchData.length:', searchData.length);
    console.log('index:', index);

    if (searchData && searchData.length > index) {
      alert("true")
      const params = searchData[index];
      console.log("params",params);
      const Fromdt = params.fromdt;
      console.log("Fromdt",Fromdt);
      const Todt = params.todt;
      console.log("Todt",Todt);
      const billerId = params.billerId;
      const invoiceType = params.invoiceType;
      const performaType = params.performaType;
      this.router.navigate(['/invoiceReportsOld'], {
        queryParams: {
          params_all: JSON.stringify(params),
          Fromdt:Fromdt,
          Todt:Todt,
          billerId:billerId,
          invoiceType:invoiceType,
          performaType:performaType
        }
      });
      const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
      const url = `/details?${queryString}`;
      console.log('Generated URL:', url);
      return url;
    }
    return '#';
  }
  logSearchData() {
    this.monthReportList.forEach((item: { searchData: any; }) => {
      console.log('Item searchData:', item.searchData);
    });
  }

  getGSTReports() {
    this.spinner.show();

    let api_req: any = new Object();
    let api_mulInvpay: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "gstReports"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_mulInvpay.action = "gstReports";
    api_mulInvpay.user_id = localStorage.getItem("erp_c4c_user_id");
    api_mulInvpay.select_year = this.yearsValue;
    api_req.element_data = api_mulInvpay;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response !='') {
        this.spinner.hide();
      this.monthReportList=response.monthReport.monthlyData;
      this.monthReportTotal=response.monthReport.totals;
      this.turnReportList=response.turnOver.turnOverData;
      this.turnReportTotal=response.turnOver.turn_total;
      this.turnoverTotal=response.turnOver.turnoverTotalData[0];
      this.currentYear=response.currentYear;
      this.gstReturnList=response.gstr;
     // console.log("this.turnoverTotal",this.turnoverTotal);
      this.YearsForm.patchValue({
        'years':response.currentYear,
      })
      } else {
        this.spinner.hide();
        iziToast.warning({
          message: "List Loading Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        if (error.status === 500) {
          this.spinner.hide();
          iziToast.error({
            message: "Sorry, a server error(500) occurred. Please try again later.",
            position: 'topRight'
          });
        }
        this.spinner.hide();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }
 
 

}
