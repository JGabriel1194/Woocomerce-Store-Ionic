import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { Categories } from "../model/categories";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  products: any;
  constructor(private http: HttpService) { }
  /**
   * Listar las categorias de todos los productos
   */
  listCategories():Observable<any>{
    return this.http.get('products/categories?');
  }
  
  /**
   * Listar productos por su categoria
   * @param id 
   */
  listProductsByCat(id: string):Observable<any>{
    return this.http.get(`products?category=${id}&`);
  }
  
  /**
   * Listar detalles del producto seleccionado
   * @param id
   */
  listProductId(id: string):Observable<any>{
    return this.http.get(`products/${id}?`)
  }
}
