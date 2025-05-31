import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServerService {


   public urlFinal = "https://laravelapi.erp1.cal4care.com/api/";
  // public urlFinal = "https://erp1.cal4care.com/api/";



 baseUrl = 'https://laravelapi.erp1.cal4care.com/api/';
  reload_profile: Subject<any> = new Subject();
  global_search: Subject<any> = new Subject();
  global_search_invoice: Subject<any> = new Subject();
  global_search_customer: Subject<any> = new Subject();
  global_search_quotation: Subject<any> = new Subject();
  callbackfun: Subject<any> = new Subject();
  closemodal: Subject<any> = new Subject();
  invoice_search: Subject<any> = new Subject();
  invoice_search1: Subject<any> = new Subject();
 


  constructor(private http: HttpClient) {

  }
  sendServer(postData: any) {


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = this.urlFinal + postData.api_url;
    //  let url = "https://erp1.cal4care.com/api/"+postData.api_url;

    // let url="http://127.0.0.1:8000/api/"+postData.api_url;

    let posting: any[] = postData;
    return this.http.post(url, posting, httpOptions);
  }

  sendServerMulInvPay(api_req: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers if required
    });

    return this.http.post(`${this.baseUrl}${api_req.api_url}`, api_req, { headers });

  }
  sendServergetdata(getData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    };
    let url = this.urlFinal + getData.api_url;
    // let url = "https://erp1.cal4care.com/api/" + getData.api_url;
    return this.http.get(url, httpOptions);
  }

  // sendServerpath(postData: any[]) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })

  //   };
  // }
  sendServerpath(postData: any) {
    try {
      // Convert JSON string to object if needed
      if (typeof postData === "string") {
        postData = JSON.parse(postData);
      }

      if (!postData.api_url) {
        console.error("Error: api_url is missing in postData!");
        return;
      }

      let url = this.urlFinal + postData.api_url;
      //   let url = "https://erp1.cal4care.com/api/" + postData.api_url;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.post(url, postData, httpOptions); // Ensure postData is sent as body
    } catch (error) {
      console.error("Error processing postData:", error);
    }
  }

  postFile(postData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = this.urlFinal + postData.api_url;
    // let url = "https://erp1.cal4care.com/api/" + postData.api_url;


    const formData: FormData = new FormData();

    formData.append('fileKey', postData, postData.name);
    let posting: any[] = postData;
    return this.http.post(url, posting, httpOptions);
  }
  sendServerpath1(postData: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    };
  }




  pagination(list_info: any) {

    var start, eu, next, back, limit, total_count, offset, last_val, last_final_val, current, pagination: any, btn_length;
    limit = list_info.page_limit;
    total_count = list_info.total;
    offset = list_info.offset;

    start = 0 + offset;

    eu = start - 0;
    if (total_count < start + 1 && total_count > 1) {

      eu = start - limit;
      start = eu;

    }
    current = eu + limit;
    back = eu - limit;
    next = eu + limit;
    last_val = Math.ceil(total_count / limit);
    last_final_val = (last_val - 1) * limit;
    pagination = { "info": "hide" };
    if (total_count > limit) {
      pagination.info = "show";
      pagination.start = 0;

      if (back >= 0) {
        pagination.back = back;
        pagination.backtab = "show";
      }
      else {
        pagination.backtab = "hide";
      }

      btn_length = 1;
      pagination.data = []
      for (var offset_count = 0; offset_count < total_count; offset_count = offset_count + limit) {

        if ((offset_count <= eu + (2 * limit)) && (offset_count >= eu - (2 * limit))) {

          if (offset_count != eu) {
            pagination.data.push({ "btn_length": btn_length, "offset_count": offset_count, "load": true });
          }
          else {
            pagination.data.push({ "btn_length": btn_length, "offset_count": offset_count, "load": false });
          }

        }
        btn_length = btn_length + 1;

      }
      if (current < total_count) {
        pagination.next = next;
        pagination.nexttab = "show";
      }
      else {
        pagination.nexttab = "hide";
      }
      pagination.end = last_final_val;

    }

    return pagination;
  }
}


