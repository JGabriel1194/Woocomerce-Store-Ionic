import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Categories } from '../model/categories';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param serviceName Nombre del servicio
   */
  get(serviceName: string){
    const url = `${environment.apiUrl}/wp-json/${environment.version}/${serviceName}consumer_key=${environment.consumerKey}&consumer_secret=${environment.consumerSecret}`
    
    return this.http.get(url);
  }
}
