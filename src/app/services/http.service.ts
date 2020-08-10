import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient) {}

  /**
   * 
   * @param serviceName Nombre del servicio
   */
  get(serviceName: string){
    const url = `${environment.apiUrl}/wp-json/${environment.version}/${serviceName}consumer_key=${environment.consumerKey}&consumer_secret=${environment.consumerSecret}`
    
    return this.http.get(url);
  }

  /**
   * 
   * 
   * @param data - Datos a enviar
   */
  login(data: any){
    const url = `${environment.apiUrl}/wp-json/jwt-auth/v1/token`;
    return this.http.post(url,data);
  }

  /**
   * 
   * @param serviceName - Nombre del servicio
   * @param data - Datos a enviar
   */
  post(serviceName: string, data: any){
    const url = `${environment.apiUrl}/wp-json/${environment.version}/${serviceName}consumer_key=${environment.consumerKey}&consumer_secret=${environment.consumerSecret}`
    
    return this.http.post(url,data);
  }

  put(){

  }

  delete(){

  }

}
