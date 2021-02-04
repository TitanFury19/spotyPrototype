import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment'
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected spotiUrl = environment.httpUrl;
  protected tokenUrl = environment.httpUrlToken;
  private base_url: string = '';

  constructor(private http: HttpClient) {
    this.base_url = `${this.spotiUrl}`;
  }

  BaseApi(method: string, token: string, url?: string, params?: any, body?: any) {
    const param = new HttpParams({
      fromObject: params
    });
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.request(method, `${this.base_url}/${url}`, { responseType: "json", params: param, body, headers: header })
  };

  UpdateToken() {
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials')
    body.set('client_id', '359f966327b14299a21f16ad621feb56')
    body.set('client_secret', 'ae23f4dd617f4acd9c7974f243796745')

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }
    return this.http.post(this.tokenUrl, body.toString(), httpOptions)
  }

}



