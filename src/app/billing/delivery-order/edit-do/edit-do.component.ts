import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-edit-do',
  templateUrl: './edit-do.component.html',
  styleUrls: ['./edit-do.component.css']
})
export class EditDoComponent implements OnInit {

  public editDo_section1 :FormGroup;
  public editDo_section2 :FormGroup;

  // select footer 

  FooterDetails:any;
  radioSelectFooterChecked: boolean = false;

  // select extra logo

  bills_logo_id_radio: any;
  billsLogo_value: any;
  radioID_Logo: any;
  radio_Value_Export_logo:any;

  // warranty

  warranty_id_radio: any;
  warranty_value: any;
  warranty_Logo: any;
  radio_Value_warranty:any;

  // product details

  public addresses: FormArray;

  itre = 0;
  test: boolean[] = [];

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) 
  {
    this.editDo_section2 = this.fb.group({
      addresses: this.fb.array([this.editAddress_FormControl()])
    });

   }

  ngOnInit(): void {



    this.bills_logo_id_radio = [
      { name: 'IT Care', selected: false, id: 1 },
      { name: 'Calncall', selected: false, id: 2 },
      { name: 'DID Sg', selected: false, id: 3 },
      { name: 'Callcloud', selected: false, id: 4 },
      { name: 'Mrvoip', selected: false, id: 5 }
    ];

    this.warranty_id_radio = [
      { name: 'No Warranty', selected: false, id: 1 },
      { name: 'One Warranty ', selected: false, id: 2 },
      { name: 'Two Warranty', selected: false, id: 3 },
     
    ];

    this.editDo_section1 = new FormGroup({
      'companyName' : new FormControl(null),
      'e_selectFooter' : new FormControl(null),
      'dcNo' : new FormControl(null),
      'dcDate' : new FormControl(null),
      'customer_name' : new FormControl(null),
      'customerAddress1' : new FormControl(null),
      'customerAddress2' : new FormControl(null),
      'customerAddress3' : new FormControl(null),
      'kind_Attention' : new FormControl(null),
      'bills_logo_id' : new FormControl(null),
      'warranty_id' : new FormControl(null),
      'description_details_show_state' : new FormControl(null),
      'description_details' : new FormControl(null),
    })

  }

  selectFooter(selval: any) {
    $('#footer_' + selval).prop('checked', true);
  }

  handleChange(evt: any) {
    this.selectFooter("any");
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked = evt.target.checked;
    console.log("evt.target.checked global variable", this.radioSelectFooterChecked)
    console.log("radio button value", radioSelectFooter);
  }

  handleChange_EXTRALogo(data: any, evt: any) {

    this.radioID_Logo = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_Export_logo = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radio_Value_Export_logo);
    // console.log("radio button id value", xyz);
  }

  handleChange_warranty(data: any, evt: any) {

    this.radioID_Logo = data;
    console.log("evt", evt.target.checked)
    console.log("evt-value", evt.target.value)
    console.log("evt-id", evt.target.id)
    this.radio_Value_warranty = evt.target.value;
    // var xyz = id;
    console.log("radio button value", this.radio_Value_warranty);
    // console.log("radio button id value", xyz);
  }


  get addressControls() {
    return this.editDo_section2.get('addresses') as FormArray
  }

  editAddress(): void {
    this.addresses = this.editDo_section2.get('addresses') as FormArray;
    this.addresses.push(this.editAddress_FormControl());

    this.itre = this.itre + 1;
    console.log(this.addresses);
    console.log(this.itre);
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      console.log(this.test[index]);


    });
  }

  editAddress_FormControl(): FormGroup {
    return this.fb.group({
      prodName: '',
      quantity: '',
      desc: '',
     
    });
  }


  removeParticular(i: number) {
  

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
     

        console.log(i)
        console.log(this.addresses)
        this.addresses.removeAt(i);
        var addr = this.editDo_section2.value.addresses;
        var list_cnt = addr.length;
      }
    });
  }

  
  updateDO(){

  }


  goBack(){
    this.router.navigate(['/deliveryOrder']);
  }
}
