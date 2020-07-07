import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpService } from "../services/http.service";
import { Categories } from "../model/categories";
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
  products: any;
  constructor(private http: HttpService) { }

  listCategories():Observable<Categories>{
    return this.http.get('/wp-json/wc/v3/products/categories?');
  }
  
  /**
   * Listar productos por su categoria
   * @param id 
   */
  listProductsByCat(id: string){
    return this.http.get(`/wp-json/wc/v3/products?category=${id}&`);
  }
}
