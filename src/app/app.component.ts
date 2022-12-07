import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERPUpdate';

  public file_path: string = "";
  templateAuthView = false;
  constructor(private router: Router, private bnIdle: BnNgIdleService) {
    //pradeep
    if (localStorage.getItem('user_name') === null && localStorage.getItem('user_name')==  'undefined') {
      this.router.navigateByUrl('/login');
    }

  }
  ngOnDestroy() {
    localStorage.clear();
  }

  ngOnInit(): void {
    //60 = 1 minute
    this.bnIdle.startWatching(60).subscribe((res) => {
      if (res) {
        console.log('session expired');
        this.router.navigateByUrl('/logout');
      }
    });

  }

  onActivate(event: any) {
    this.file_path = this.router.url;
    console.log(this.router.url);
    if (localStorage.getItem('access_token')) {
      this.templateAuthView = false;
    }
    // else if(this.router.url == '/forgot-pwd'){
    //     this.router.navigate(['/forgot-pwd']);
    // }
    else {
      this.templateAuthView = true;
      this.router.navigate(['/login']);
    }
  }
}
