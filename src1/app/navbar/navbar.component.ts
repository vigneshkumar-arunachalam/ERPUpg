import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:any
  userId:any;
  role_Permission:any;
  user_ProfileImage:any;
  constructor(private router:Router,private serverService: ServerService) {
    this.serverService.reload_profile.subscribe((res:any)=>{
      console.log(res);
      var kk = JSON.parse(res);
      console.log(kk)
      if(kk.data=='reload_profile_data'){
        this.userName=localStorage.getItem('user_name');
        this.userId=localStorage.getItem('erp_c4c_user_id');
        this.role_Permission=localStorage.getItem('role');
        this.user_ProfileImage=localStorage.getItem('profile_image');
      }
    })
   }

  ngOnInit(): void {
    setTimeout(() => {
      
    
    this.userName=localStorage.getItem('user_name');
    this.userId=localStorage.getItem('erp_c4c_user_id');
    this.role_Permission=localStorage.getItem('role');
    this.user_ProfileImage=localStorage.getItem('profile_image');
  }, 2000);
    // console.log("navigation menu, username",this.userName)
    // console.log("navigation menu, userid",this.userId)
    // console.log("navigation menu, role_permission",this.role_Permission)
    // console.log("navigation menu,  this.user_ProfileImage", this.user_ProfileImage)
   
  }
 
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

      
  }
}
