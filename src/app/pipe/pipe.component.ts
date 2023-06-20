import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {
  presentDate = new Date(); 
  currentDate=new Date();
  price : number = 20000;
  Fruits = ["Apple","Orange","Grapes","Mango","Kiwi","Pomegranate"]; 
  decimalNum1: number = 8.7589623; 
  decimalNum2: number = 5.43; 
  decimalNum3: number = 0.8178; 

  decimalvalue:any=[1,2,3]
  jsonData = { id: 'one', name: { username: 'user1' }} 
 


  constructor() { }

  ngOnInit(): void {
    
  }

}
