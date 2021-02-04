import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { SpotifyService } from '../../services/spotify.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {
  artista: any = {};
  isLoading: boolean = false;
  token: string = "";
  tracks: any[] = [] ;
  id: any = {};
  errorMessage: string = "";
  
  constructor(private route: ActivatedRoute,
    private spotify: SpotifyService) {
    this.isLoading = true
    this.route.params.subscribe(params => {
      this.getArtistService(params['id'], params['idtoken']);
      this.getTopTracks(params['id'], params['idtoken']);
    })
  };

  getArtistService(id: string, token: string) {
    this.isLoading = true
    this.spotify.getArtistById(id, token).subscribe(response => {
      this.artista = response
      this.isLoading = false;
      console.log(response)
    })
  }

  getTopTracks(id: string, token: string) {
    this.spotify.getTopTracks(id, token).subscribe({
      next: (data: any) => {
        if (data && data['tracks']) {
          this.tracks = data['tracks'];
        } else {
          this.tracks = [];
        }
        console.log(data['tracks'])
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }



}
