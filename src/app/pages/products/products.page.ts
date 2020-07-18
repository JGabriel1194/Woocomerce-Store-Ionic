import { ProductsService } from '../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: any;
  id: string ;
  catName: string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.catName = this.activatedRoute.snapshot.paramMap.get('name');
    this.listProductsCategory(this.id);
  }

  /**
   * Listar productos por el id de la categoria
   * @param id 
   */
  listProductsCategory(id: string){
    this.productsService.listProductsByCat(id).subscribe(
      (res: any)=>{
        this.products = res;
        console.log(this.products);
      }
    );
  }
}
