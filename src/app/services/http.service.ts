import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
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
    const headers = new HttpHeaders();
    const url = `${environment.apiUrl}${serviceName}consumer_key=${environment.consumerKey}&consumer_secret=${environment.consumerSecret}`
    const options = { headers: headers}
    return this.http.get<Categories>(url,options);
  }
}
