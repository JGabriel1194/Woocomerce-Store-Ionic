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
   * Funcion para listar las categorias de todos los productos
   */
  listCategories():Observable<any>{
    return this.http.get('products/categories?');
  }
  
  /**
   * Funcion para listar productos por su categoria
   * @param id {String} - Recibe el id de la categoria
   */
  listProductsByCat(id: string, page:string):Observable<any>{
    return this.http.get(`products?category=${id}&page=${page}&`);
  }
  
  /**
   * Funcion para listar detalles del producto seleccionado
   * @param id {String} - Recibe id del producto
   */
  listProductId(id: string):Observable<any>{
    return this.http.get(`products/${id}?`)
  }

  /**
   * Funcion para buscar el producto por su nombre
   * @param name {String} - Recibe el nombre del producto a buscar
   */
  searchProducts(name: string){
    return this.http.get(`products?search=${name}&`);
  }
}
