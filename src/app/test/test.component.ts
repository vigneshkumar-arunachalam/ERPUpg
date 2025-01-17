import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {
  public addresses: FormArray;
  public addressForm: FormGroup;
  items:any;
  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([ this.createAddress() ])
    });
  }
  

  ngOnInit(): void {
    this.items = [
      { id: 1, name: 'Item 1', checked: false },
      { id: 2, name: 'Item 2', checked: false },
      { id: 3, name: 'Item 3', checked: false },
      // Add more items as needed
    ];
 
  }
  ngAfterViewInit(): void {
    // Initialize DataTable
    ($('#example') as any).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      autoWidth: true
    });
  }


  get addressControls() {
 
    // return this.addressForm.get('addresses')['controls'];

    return this.addressForm.get('addresses') as FormArray

    // return (this.addressForm.controls.addresses as FormGroup).controls;
   
  }

  createAddress(): FormGroup {
    return this.fb.group({
      address: '',
      street: '',
      city: '',
      country: ''
    });
  }

  addAddress(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  logValue() {
    console.log(this.addresses.value);
  }
  getSelectedItems() {
    const selectedItems = this.items.filter((item: { checked: any; }) => item.checked);
    const selectedIds = selectedItems.map((item: { id: any; }) => item.id);
    console.log('Selected Items:', selectedItems);
    console.log('Selected IDs:', selectedIds);
  }
  
}
