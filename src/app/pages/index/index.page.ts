import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { Categories } from 'src/app/model/categories';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  categories: Observable<Categories>;
  products: Observable<any> = null;
  quantity: string;
  @Input() title: string;

  constructor(
    private productsService: ProductsService, 
    private loadingService: LoadingService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.loadingService.presentLoading('Cargando');
    this.loadCategories();
    this.cartService.loadStorage();
    this.quantity = this.cartService.updateBadge().toString();
  }

  /**
   * Funcion para actualizar la notificación
   */
  ionViewWillEnter() {
    this.cartService.loadStorage();
    this.quantity = this.cartService.updateBadge().toString();
  }

  /**
   * Funcion que carga todas la categorias existentes
   */
  loadCategories(){
    this.productsService.listCategories().subscribe(
      (res: any)=> {
        this.categories = res;
        if(this.categories){
          this.loadingService.dismissLoading();
        }
      }
    );
  }
  /**
   * Funcion para redirigir a la pagina de productos
   * @param id {String} - Recibe el id de la categoria seleccionada
   * @param name {String} - Recibe el nombre de la categoria seleccionada
   * @param count {String} - Recibe la cantidad de elementos existentes en esa categoria
   */
  pushProducts(id:string,name:string,count:string){
    this.router.navigate(['/products',id,name,count]);
  }

  clickProfile(){
    this.router.navigate(['/profile']);
  }
  /**
   * Funcion para buscar un producto
   * @param event {event} - Recibe un evento del cual extraeremos el value
   */
  searchProduct(event){
    if(event.target.value != ''){
      this.productsService.searchProducts(event.target.value).subscribe(
        (res: any) => {
          this.products = res;
        }
      )
    }else{
      this.products = null;
    }
  }

  /**
   * 
   * @param event 
   */
  clearSearch(event){
    this.products = null;
  }

  /**
   * 
   * @param id 
   */
  clickProduct(id:string){
    this.router.navigate(['/details',id]);
  }
  
  goCart(){
    this.router.navigate(['/cart']);
  }
}
