import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { BaseApiService } from '../../services/base-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newSongs: any = []
  param: object = {
    limit: 15,
    offset: 5
  };
  errorMessage: string = '';
  isloading: boolean = false;
  interval: any = {};
  token: string = "";

  constructor(private spotify: SpotifyService,
    private baseService: BaseApiService) {

    this.isloading = true;
  }

  doRequest(token: string) {
    this.spotify.getNewRelease(this.param, token).subscribe({
      next: data => {
        this.newSongs = data
        this.token = token
        // this.newSongs = [...data, token]
        this.isloading = false
        console.log(this.newSongs)
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  refreshToken() {
    this.baseService.UpdateToken().subscribe({
      next: (data: any) => {
        this.token = data['access_token'];
        this.doRequest(this.token)
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
