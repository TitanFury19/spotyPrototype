import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../../services/base-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  token: string = ""
  errorMessage: string = ""
  interval: any = {}
  constructor(private baseService : BaseApiService) { }

  refreshToken() {
    this.baseService.UpdateToken().subscribe({
      next: (data: any) => {
        this.token = data['access_token'];
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }
  
  ngOnInit(): void {
    this.refreshToken();
    this.interval = setInterval(() => {
      this.refreshToken();
    }, 3500 * 1000);
  }
}
