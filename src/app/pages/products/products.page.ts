import { LoadingService } from './../../services/loading.service';
import { ProductsService } from '../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: any[];
  id: string ;
  catName: string;
  count: number;
  pages: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private loadigService: LoadingService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.catName = this.activatedRoute.snapshot.paramMap.get('name');
    this.count = parseInt(this.activatedRoute.snapshot.paramMap.get('count'));
    this.loadigService.presentLoading('Cargando');
    this.listProductsCategory();
  }

  /**
   * Listar productos por el id de la categoria
   * @param id 
   */
  async listProductsCategory(){
    this.productsService.listProductsByCat(this.id,String(this.pages)).subscribe(
      (res: any)=>{
        this.products = res;
        if(this.products){
          this.loadigService.dismissLoading();
        }
        this.pages++;
        console.log(this.products);
      }
    );
  }

  async loadMoreProducts(event){
    setTimeout(()=>{
      event.target.complete();
      this.productsService.listProductsByCat(this.id,String(this.pages)).subscribe(
        (res: any)=>{
          this.products = this.products.concat(res);
          this.pages++;
          console.log(this.products);
        }
      );
      if(this.products.length >= this.count){
        event.target.disabled = true;
      }
    },5000)
  }
}
