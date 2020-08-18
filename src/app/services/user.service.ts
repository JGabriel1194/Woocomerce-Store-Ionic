import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpService
  ) { }

  /**
   * 
   * @param {String} email - Recibe el email del usuario 
   */
  loadUser(email: string){
    return this.http.get(`customers?search=${email}&`)
  }

  /**
   * Función para actualizar los datos de un cliente 
   * @param {String} id - Recibe el id del cliente 
   * @param {Object} data - Recibe los datos a actualizar del cliente
   */
  putData(id: string, data: any){
    return this.http.put(`customers/${id}?`,data);
  }

}
