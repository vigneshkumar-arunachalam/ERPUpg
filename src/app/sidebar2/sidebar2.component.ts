import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import data1 from '../../assets/json/Dev1.json';
import { Child, Subchild, menulist1 } from './billing.model';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component implements OnInit {
 

  public overallmenulist = data1;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.loadScript('../../assets/js/script.js');
    feather.replace();
    console.log("menu list details", this.overallmenulist);
    
  }
  handleSelectedMenu(id: number) {
    this.overallmenulist.forEach((element: { menuId: number; isActive: boolean; }) => {
      if (element.menuId == id) {
        element.isActive = !element.isActive;
      }
    })
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  change(id:any){
      console.log(id);
      this.router.navigate([id]);
  }

}
