import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpService
  ) { }

  /**
   * Funcion para crear una nueva orden
   * @param data Recibe un objeto con datos del pedido
   */
  createOrder(data: any){
    return this.http.post(`orders?`,data);
  }

  /**
   * Funcion para filtrar las ordenes por su estado
   * @param state recibe el estado de la orden
   */
  loadOrderByState(state: string,email: string){
    return this.http.get(`orders?search=${email}&status=${state}&`);
  }
}
