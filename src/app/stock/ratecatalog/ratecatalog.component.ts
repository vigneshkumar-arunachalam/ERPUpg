import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from 'src/app/services/server.service';
import { HttpHeaders } from '@angular/common/http';
declare var $:any

@Component({
  selector: 'app-ratecatalog',
  templateUrl: './ratecatalog.component.html',
  styleUrls: ['./ratecatalog.component.css']
})
export class RatecatalogComponent implements OnInit {
  isAccordionOpen: boolean = false;
  isAccordionCancel: boolean = false; // Initially open
  billerCurrencyDetails: any[] = [];
  currencyList: any[] = []; 
  rateCatalogDetails: any[] = [];
  productList1: any[] = [];
  productList2: any[] = [];
  productList3: any[] = [];
  activeTab: string = 'Yealink';

  billerId: any[]=[];   
  currencyId: any = '';   
   
  constructor(public serverService: ServerService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getBillerCurrencyDetails();    
    this. getRateCatalogDetails({});
   
  }



  getBillerCurrencyDetails() 
  {
     
    const apiUrl = this.serverService.urlFinal +'rateCatalog/getBillerCurrencyDetails';
    const requestData = {
      moduleType: 'rateCatalog',
      api_url: 'rateCatalog/getBillerCurrencyDetails',
      api_type: 'web',
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', // Replace with valid token
      element_data: {
        action: 'getBillerCurrencyDetails',
        user_id: '39'
      }
    };
    
    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        console.log("Full API Response:", response);
        
        // Check if response is valid
        if (response && response.status === true) {
          if (response.billerList) {
            this.billerCurrencyDetails = response.billerList;
            console.log("Updated Biller List:", this.billerCurrencyDetails);
          } else {
            console.warn("No Biller List Found");
          }
  
          if (response.currencyList) {
            this.currencyList = response.currencyList;
            console.log("Updated Currency List:", this.currencyList);
          } else {
            console.warn("No Currency List Found");
          }
        } else {
          console.error('API Error - Invalid Response:', response);
        }
      },
      (error) => {
        console.error('API Request Failed:', error);
      }
    );
  
  }

  
  selectbiller(event:any,data:any){
    console.log("event",event);
    console.log("data",data);
    if (event.target.checked) {
    
      this.billerId.push(data);
    } else {
      
      this.billerId = this.billerId.filter( (id: any) => id !== data);
    }
    console.log("Selected Biller IDs:", this.billerId);

  }


  getRateCatalogDetails(data: any) {
    const apiUrl =this.serverService.urlFinal + 'rateCatalog/getRateCatalogDetails';
    var quick_search_one='';
    var quick_search_two ='';
    var quick_search_three ='';
    this.currencyId = $("#currency_id").val();

    // Get search input value
    const searchText = ($('#search_data').val() || '').toLowerCase();
    if (this.activeTab === 'Yealink') {
    quick_search_one=$('#search_val').val();
    quick_search_two ='';
    quick_search_three ='';

  } else if (this.activeTab === 'Htek') {
    quick_search_one='';
    quick_search_two =$('#search_val2').val();
    quick_search_three ='';

  } else if (this.activeTab === 'Beronet') {
    quick_search_one='';
    quick_search_two ='';
    quick_search_three =$('#search_val3').val();

  }

    const requestData = {
        moduleType: 'rateCatalog',
        api_url: 'rateCatalog/getRateCatalogDetails',
        api_type: 'web',
        access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI', // Replace with environment variable
        element_data: {
            action: 'getRateCatalogDetails',
            user_id: '39',
            search_text: searchText,
            billerId: this.billerId,
            currencyId: this.currencyId,
            quick_search_one:quick_search_one,
            quick_search_two :quick_search_two,
            quick_search_three :quick_search_three,    
        }
    };

    this.http.post(apiUrl, requestData).subscribe(
        (response: any) => {
            console.log("Full API Response:", response);

            if (response && response.status === true) {
                // Preserve original data before filtering
                this.productList1 = response.data.productList1;
                this.productList2 = response.data.productList2;
                this.productList3 = response.data.productList3;


                console.log("Filtered Product List (Yealink):", this.productList1);
                console.log("Filtered Product List (Htek):", this.productList2);
                console.log("Filtered Product List (Beronet):", this.productList3);

                // Close the accordion after search
                // this.isAccordionOpen = false;
            } else {
                console.warn("No productList data found");
            }
        },
        (error) => {
            console.error('API Request Failed:', error);
        }
    );
}



  


/*toggle button open */

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
}

/*toggle for close the cancel button*/

cancelAccordion() {
  this.isAccordionOpen = false; // Close the accordion
}


setActiveTab(tabName: string) {
  this.activeTab = tabName;
}




}
