import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { BaseApiService } from '../../services/base-api.service';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isloading: boolean = false
  token: any = {};
  artista: any = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private baseService: BaseApiService){
      this.route.paramMap.subscribe(params =>{
        this.token = params.get('idtoken')
      })
  }

  // refreshToken() {
  //   this.baseService.UpdateToken().subscribe(data => {
  //     console.log(data)
  //     this.token = data;
  //   })
  // }

  buscar(termino: string) {
    let busqueda = {
      q: termino,
      type: 'artist',
      market:'US',
      limit:25,
      offset: 10
    }
    if (busqueda.q && busqueda.q.indexOf(termino) >= 0) {
      this.isloading = true
      console.log(this.token)
      this.doRequest(busqueda, this.token)
    }
  }


  doRequest(busqueda:object, token:string){
    this.spotify.getArtist(busqueda, token)
    .subscribe({
      next: data => {
        this.artista = data
        this.isloading = false;
        console.log(this.artista)
      },
      error: error => {
        this.errorMessage = error.message;
        this.isloading = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
