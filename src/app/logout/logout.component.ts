import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   // localStorage.removeItem('user_id');
   localStorage.removeItem('unique_id_en');

    localStorage.clear();
  
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
