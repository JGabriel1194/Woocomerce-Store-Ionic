import { LoadingService } from './../../services/loading.service';
import { ProductsService } from '../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
  quantity: String;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private loadigService: LoadingService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.catName = this.activatedRoute.snapshot.paramMap.get('name');
    this.count = parseInt(this.activatedRoute.snapshot.paramMap.get('count'));
    this.loadigService.presentLoading('Cargando');
    this.listProductsCategory();
    this.quantity = this.cartService.updateBadge().toString();
  }

  /**
   * Funcion para actualizar la notificación
   */
  ionViewWillEnter() {
    this.quantity = this.cartService.updateBadge().toString();
  }

  /**
   * Funcion para listar productos por su categoria
   */
  async listProductsCategory(){
    this.productsService.listProductsByCat(this.id,String(this.pages)).subscribe(
      (res: any)=>{
        this.products = res;
        if(this.products){
          this.loadigService.dismissLoading();
        }
        this.pages++;
      }
    );
  }

  /**
   * Funcion para cargar 10 productos más.
   * @param event 
   */
  async loadMoreProducts(event){
    setTimeout(()=>{
      event.target.complete();
      this.productsService.listProductsByCat(this.id,String(this.pages)).subscribe(
        (res: any)=>{
          this.products = this.products.concat(res);
          this.pages++;
        }
      );
      if(this.products.length >= this.count){
        event.target.disabled = true;
      }
    },5000)
  }

  /**
   * Funcion para navegar al detalle del producto.
   * @param id {String} - Recibe el id del producto
   */
  clickProduct(id:string){
    this.router.navigate(['/details',id]);
  }
  
}
