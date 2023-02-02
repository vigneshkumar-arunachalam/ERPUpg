import { Component, HostListener } from '@angular/core';
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

  }

  ngOnInit(): void {
    //60 = 1 minute
    //3600= 1 hour
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        console.log('session expired after 900 seconds');
        this.router.navigateByUrl('/logout');
      }
    });

  }


  onActivate(event: any) {
    this.file_path = this.router.url;
    // console.log(this.router.url);
    if (localStorage.getItem('access_token')) {
      this.templateAuthView = false;

    }

    else {
      this.templateAuthView = true;
      this.router.navigate(['/login']);
    }
  }
}
