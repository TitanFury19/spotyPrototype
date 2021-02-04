import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseApiService } from '../services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  public newList: any[] = []
  constructor(
    private http: HttpClient,
    private service: BaseApiService
  ) {

  }
  getNewRelease(param: object, token: string) {
    return this.service.BaseApi('GET', token, 'browse/new-releases', param).pipe(map((response: any) => {
      let releases: any[] = [];
      if (response && response['albums']) {
        response['albums'].items.map((item: any) => {
          releases.push(item)
        })
      }
      this.newList = releases;
      return this.newList
    }))
  };

  // const headers = new HttpHeaders({
  //   'Authorization': 'Bearer BQC3mhPBAjFW99nRbN83p6oc75QPN6rpHH58j1ahUWGeMoiK0yijEUIB633vBk8iKNJ0ykzDGQJ5dSIHLIw'
  // })
  // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20;offset=5', { headers })
  // .pipe(map((data:any) =>{
  //   return data['albums'].items
  // }))


  getArtist(termino: object, token: string) {
    return this.service.BaseApi('GET', token, 'search', termino).pipe(map((response: any) => {
      let artista: any[] = [];
      if (response && response['artists']) {
        response['artists'].items.map((item: any) => {
          artista.push(item)
        })
      }
      this.newList = artista;
      return this.newList
    }))

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQC3mhPBAjFW99nRbN83p6oc75QPN6rpHH58j1ahUWGeMoiK0yijEUIB633vBk8iKNJ0ykzDGQJ5dSIHLIw'
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&offset=10`, { headers: headers });
  };

  getArtistById(id: string, token: string) {
    return this.service.BaseApi('GET', token, `artists/${id}`)
  }

  getTopTracks(id: string, token: string) {
    return this.service.BaseApi('GET', token, `artists/${id}/top-tracks?country=us`)
  }
}
