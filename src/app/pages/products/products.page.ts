import { CategoriesService } from './../../services/categories.service';
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
  constructor(
    private activatedRoute: ActivatedRoute, 
    private categoriesService: CategoriesService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listProductsCategory();
  }

  listProductsCategory(){
    this.categoriesService.listProductsByCat(this.id).subscribe(
      (res: any)=>{
        this.products = res;
        console.log(this.products);
      }
    );
  }
}
