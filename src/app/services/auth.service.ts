import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService
  ) { }

  /**
   * Funcion para logear al usuario
   * @param data Recibe los datos del usuario
   */
  login(data: any){
    return this.http.login(data);
  }

  register(data: any){
    return this.http.post('customers?',data);
  }
}
