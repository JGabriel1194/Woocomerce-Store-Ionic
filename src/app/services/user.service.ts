import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private email: string;
  user = {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    billing: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: ""
    },
    shipping: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: ""
    }
  };

  constructor(
    private http: HttpService
  ) { }

  loadUser(){
    return this.http.get(`customers?search=${this.user.email}&`)
  }
  /**
   * Enviar email de usuario
   * @param email 
   */
  setEmail(email){
    this.user.email = email;
  }

  /**
   * Obtener email de usuario
   */
  getEmail(){
    return this.user.email;
  }
}
